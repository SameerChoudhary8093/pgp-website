/*
 Import script for PartyData/master_data_v3_FINAL.csv
 Columns: LoksabhaName,VidhansabhaName,LocalUnitName,LocalUnitType
 Usage:
   DATABASE_URL=postgresql://<user>@localhost:5432/pgp node packages/db/prisma/import-master-localunits.js PartyData/master_data_v3_FINAL.csv
 Idempotent: uses upserts with composite unique constraints.
*/

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function mapLocalUnitType(csvType) {
  const t = String(csvType || '').trim();
  if (t.toLowerCase() === 'ward') return 'Ward';
  if (t.toLowerCase() === 'gram panchayat') return 'GramPanchayat';
  throw new Error(`Unknown LocalUnitType: ${csvType}`);
}

function toTitleCase(input) {
  const s = String(input || '').trim().toLowerCase().replace(/\s+/g, ' ');
  return s
    .split(' ')
    .map((w) => w.split('-').map((p) => (p ? p[0].toUpperCase() + p.slice(1) : p)).join('-'))
    .join(' ');
}

async function main() {
  const fileArg = process.argv[2];
  if (!fileArg) {
    console.error('Provide CSV path: node packages/db/prisma/import-master-localunits.js PartyData/master_data_v3_FINAL.csv');
    process.exit(1);
  }
  const csvPath = path.resolve(fileArg);
  if (!fs.existsSync(csvPath)) {
    console.error('File not found:', csvPath);
    process.exit(1);
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(csvPath, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  let lineNo = 0;
  let imported = 0;
  let skipped = 0;
  const seen = new Set();
  const dupRows = [];

  // Simple caches to reduce DB lookups
  const lokCache = new Map(); // name -> id
  const vidCache = new Map(); // `${loksabhaId}:${name}` -> id

  for await (const line of rl) {
    lineNo++;
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Expect header on first line
    if (lineNo === 1) {
      const header = trimmed.split(',').map((s) => s.trim());
      if (
        header.length !== 4 ||
        header[0] !== 'LoksabhaName' ||
        header[1] !== 'VidhansabhaName' ||
        header[2] !== 'LocalUnitName' ||
        header[3] !== 'LocalUnitType'
      ) {
        throw new Error('Unexpected header format in CSV');
      }
      continue;
    }

    const parts = trimmed.split(',');
    if (parts.length !== 4) {
      skipped++;
      if (skipped < 5) console.warn('Skipping malformed row at', lineNo, trimmed);
      continue;
    }

    let [loksabhaName, vidhansabhaName, localUnitName, localUnitType] = parts.map((s) => s.trim());
    if (!loksabhaName || !vidhansabhaName || !localUnitName || !localUnitType) {
      skipped++;
      continue;
    }

    const cleanedLok = toTitleCase(loksabhaName);
    const cleanedVid = toTitleCase(vidhansabhaName);
    const cleanedLu = toTitleCase(localUnitName);

    let type;
    try {
      type = mapLocalUnitType(localUnitType);
    } catch (e) {
      skipped++;
      if (skipped < 5) console.warn('Skipping due to type error at', lineNo, e.message);
      continue;
    }

    const key = `${cleanedLok}|${cleanedVid}|${cleanedLu}|${type}`;
    if (seen.has(key)) {
      dupRows.push({ loksabhaName, vidhansabhaName, localUnitName, localUnitType, cleanedLok, cleanedVid, cleanedLu, type });
      continue;
    }
    seen.add(key);

    try {
      // Upsert Loksabha
      let lokId = lokCache.get(cleanedLok);
      if (!lokId) {
        const lok = await prisma.loksabha.upsert({
          where: { name: cleanedLok },
          update: {},
          create: { name: cleanedLok },
          select: { id: true },
        });
        lokId = lok.id;
        lokCache.set(cleanedLok, lokId);
      }

      // Upsert Vidhansabha by composite (loksabhaId, name)
      const vidKey = `${lokId}:${cleanedVid}`;
      let vidId = vidCache.get(vidKey);
      if (!vidId) {
        const vid = await prisma.vidhansabha.upsert({
          where: { loksabhaId_name: { loksabhaId: lokId, name: cleanedVid } },
          update: {},
          create: { name: cleanedVid, loksabhaId: lokId },
          select: { id: true },
        });
        vidId = vid.id;
        vidCache.set(vidKey, vidId);
      }

      // Merge with existing local unit case-insensitively to avoid duplicates
      const existing = await prisma.localUnit.findFirst({
        where: { vidhansabhaId: vidId, type, name: { equals: cleanedLu, mode: 'insensitive' } },
        select: { id: true, name: true },
      });
      if (existing) {
        if (existing.name !== cleanedLu) {
          await prisma.localUnit.update({ where: { id: existing.id }, data: { name: cleanedLu } });
        }
      } else {
        await prisma.localUnit.create({ data: { vidhansabhaId: vidId, name: cleanedLu, type } });
      }

      imported++;
      if (imported % 2000 === 0) console.log(`Imported ${imported} rows...`);
    } catch (err) {
      console.error('Error at line', lineNo, err?.message || err);
      throw err;
    }
  }

  if (dupRows.length > 0) {
    const outPath = path.resolve(path.dirname(csvPath), 'rejected_duplicates.csv');
    const header = 'LoksabhaName,VidhansabhaName,LocalUnitName,LocalUnitType,CleanedLoksabhaName,CleanedVidhansabhaName,CleanedLocalUnitName\n';
    const rows = dupRows.map((r) => [r.loksabhaName, r.vidhansabhaName, r.localUnitName, r.localUnitType, r.cleanedLok, r.cleanedVid, r.cleanedLu].join(','));
    fs.writeFileSync(outPath, header + rows.join('\n'));
    console.log('Rejected duplicate rows after cleaning:', dupRows.length);
    console.log('Written to', outPath);
  }

  console.log('Import completed.');
  console.log('Imported rows:', imported);
  console.log('Skipped rows:', skipped);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
