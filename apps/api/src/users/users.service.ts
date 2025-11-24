import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcryptjs';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuditService } from '../audit/audit.service';
import { Prisma } from '@prisma/client';

function randomReferralCode(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private audit: AuditService) {}

  async register(dto: RegisterDto) {
    // Ensure phone is unique
    const existing = await this.prisma.user.findUnique({ where: { phone: dto.phone } });
    if (existing) throw new BadRequestException('Phone already registered');

    // Validate location
    if (!dto.localUnitId) throw new BadRequestException('Please select a Local Unit');
    const lu = await this.prisma.localUnit.findUnique({ where: { id: dto.localUnitId } });
    if (!lu) throw new BadRequestException('Invalid local unit');
    const localUnitId = lu.id;

    // Resolve referrer
    let referredByUserId: number | null = null;
    if (dto.referralCode) {
      const ref = await this.prisma.user.findUnique({ where: { referralCode: dto.referralCode } });
      if (!ref) throw new BadRequestException('Invalid referral code');
      referredByUserId = ref.id;
    }

    // Generate unique referral code
    let referralCode = randomReferralCode();
    for (let i = 0; i < 5; i++) {
      const clash = await this.prisma.user.findUnique({ where: { referralCode } });
      if (!clash) break;
      referralCode = randomReferralCode();
    }
    // One last check
    const finalClash = await this.prisma.user.findUnique({ where: { referralCode } });
    if (finalClash) throw new BadRequestException('Please retry: referral code generation conflict');

    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Generate unique memberId: PGP-######
    async function generateMemberId(): Promise<string> {
      for (let i = 0; i < 10; i++) {
        const n = Math.floor(Math.random() * 999999) + 1;
        const candidate = `PGP-${String(n).padStart(6, '0')}`;
        const clash = await this.prisma.user.findUnique({ where: { memberId: candidate } });
        if (!clash) return candidate;
      }
      // Fallback to timestamp-based unique
      return `PGP-${String(Date.now()).slice(-6)}`;
    }
    const memberId = await generateMemberId.call(this);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
        wardId: dto.wardId ?? undefined,
        localUnitId: localUnitId ?? undefined,
        referralCode,
        referredByUserId: referredByUserId ?? undefined,
        passwordHash,
        authUserId: dto.authUserId ?? undefined,
        memberId,
      },
      select: { id: true, name: true, phone: true, referralCode: true, referredByUserId: true, memberId: true },
    });

    return user;
  }

  async recruits(userId: number, take = 50) {
    const recruits = await this.prisma.user.findMany({
      where: { referredByUserId: userId },
      orderBy: { id: 'desc' },
      take,
      select: { id: true, name: true, phone: true, createdAt: true },
    });
    const total = await this.prisma.user.count({ where: { referredByUserId: userId } });
    return { total, recruits };
  }

  async recruitmentProgress(userId: number) {
    const [total, user] = await Promise.all([
      this.prisma.user.count({ where: { referredByUserId: userId } }),
      this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } }),
    ]);
    const role = user?.role ?? null;
    const hasTarget = role === 'CWCPresident' || role === 'CWCMember' || role === 'ExtendedMember';
    const target = hasTarget ? 20 : 0;
    const remaining = target > 0 ? Math.max(target - total, 0) : 0;
    return { role, total: hasTarget ? total : 0, target, remaining };
  }

  async summary(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        phone: true,
        role: true,
        ward: { select: { id: true, wardNumber: true, gp: { select: { id: true, name: true } } } },
        localUnit: { select: { id: true, name: true, type: true, vidhansabha: { select: { id: true, name: true, loksabha: { select: { id: true, name: true } } } } } },
        referralCode: true,
        memberId: true,
        photoUrl: true,
      },
    });
    if (!user) throw new BadRequestException('User not found');

    const recruitsCount = await this.prisma.user.count({ where: { referredByUserId: userId } });
    const votesCast = await this.prisma.vote.count({ where: { voterUserId: userId } });

    return { user, recruitsCount, votesCast };
  }

  async leaderboard(take = 20) {
    // Top referrers by recruit count
    const grouped = await this.prisma.user.groupBy({
      by: ['referredByUserId'],
      where: { referredByUserId: { not: null } },
      _count: { _all: true },
    });
    grouped.sort((a, b) => ((b._count?._all ?? 0) - (a._count?._all ?? 0)));
    const top = grouped.slice(0, take);
    const entries = await Promise.all(
      top.map(async (g) => {
        const u = g.referredByUserId
          ? await this.prisma.user.findUnique({ where: { id: g.referredByUserId }, select: { id: true, name: true, phone: true } })
          : null;
        return { user: u, recruits: g._count?._all ?? 0 };
      })
    );
    return entries.filter((e) => e.user);
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    // Only allow updating photoUrl for now
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        photoUrl: dto.photoUrl ?? undefined,
      },
      select: { id: true, name: true, memberId: true, photoUrl: true, role: true },
    });
    return updated;
  }

  async uploadProfilePhoto(userId: number, file: any) {
    if (!file) throw new BadRequestException('No file provided');
    const allowed = ['image/jpeg', 'image/png'];
    if (!allowed.includes(file.mimetype)) throw new BadRequestException('Only JPG/PNG are allowed');
    if (file.size > 2 * 1024 * 1024) throw new BadRequestException('Max file size is 2MB');

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!serviceKey) throw new InternalServerErrorException('Storage not configured');
    const jwksUrl = process.env.SUPABASE_JWKS_URL || '';
    const url = new URL(jwksUrl || '');
    if (!url.origin) throw new InternalServerErrorException('Supabase base URL not configured');
    const supabaseBase = `${url.protocol}//${url.host}`; // https://<project>.supabase.co
    const bucket = process.env.SUPABASE_PHOTOS_BUCKET || 'profile-photos';

    const ext = file.mimetype.includes('png') ? 'png' : 'jpg';
    const objectPath = `users/${userId}-${Date.now()}.${ext}`;

    const uploadRes = await fetch(`${supabaseBase}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': file.mimetype,
        'x-upsert': 'true',
      },
      body: file.buffer,
    });
    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new InternalServerErrorException(`Upload failed: ${errText}`);
    }

    const publicUrl = `${supabaseBase}/storage/v1/object/public/${encodeURIComponent(bucket)}/${objectPath}`;

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { photoUrl: publicUrl },
      select: { id: true, photoUrl: true },
    });
    return { photoUrl: updated.photoUrl };
  }

  async adminSearchUsers(q: string, take = 20) {
    const where: any = q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { phone: { contains: q, mode: 'insensitive' } },
            { memberId: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {};
    return this.prisma.user.findMany({ where, take, orderBy: { id: 'desc' }, select: { id: true, name: true, phone: true, role: true, memberId: true } });
  }

  async adminUpdateRole(userId: number, newRole: string, actorUserId: number, reason: string) {
    if (!reason) throw new BadRequestException('Reason is required');
    const updated = await this.prisma.user.update({ where: { id: userId }, data: { role: newRole as any }, select: { id: true, name: true, phone: true, role: true, memberId: true } });
    await this.audit.log({
      actorUserId,
      action: 'ADMIN_UPDATE_ROLE',
      entityType: 'User',
      entityId: String(userId),
      reason,
      metadata: { newRole },
    });
    return updated;
  }

  async adminPromoteToRole(userId: number, target: 'PPC' | 'SSP', actorUserId: number, reason: string) {
    if (!reason) throw new BadRequestException('Reason is required');
    const targetRole = target === 'PPC' ? 'PPC' : 'SSP';
    const updated = await this.prisma.user.update({ where: { id: userId }, data: { role: targetRole as any }, select: { id: true, name: true, phone: true, role: true, memberId: true } });
    await this.audit.log({
      actorUserId,
      action: `ADMIN_PROMOTE_TO_${target}`,
      entityType: 'User',
      entityId: String(userId),
      reason,
    });
    return updated;
  }
}
