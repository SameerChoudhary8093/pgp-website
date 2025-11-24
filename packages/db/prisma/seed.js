// Prisma seed for People's Green Party sample data
// Run with: npm --workspace packages/db run prisma:seed

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const gps = [
    { name: 'Aarya Gram Panchayat' },
    { name: 'Bhavya Gram Panchayat' },
    { name: 'Chirag Gram Panchayat' },
  ];

  for (const gp of gps) {
    const createdGp = await prisma.gramPanchayat.upsert({
      where: { name: gp.name },
      update: {},
      create: { name: gp.name },
    });

    const wardData = Array.from({ length: 10 }).map((_, i) => ({
      wardNumber: i + 1,
      gpId: createdGp.id,
    }));

    await prisma.ward.createMany({ data: wardData, skipDuplicates: true });
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
