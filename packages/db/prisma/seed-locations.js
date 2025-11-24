/*
 Usage:
   node prisma/seed-locations.js /absolute/path/to/locations.csv
 CSV format (no quotes/commas inside fields, UTF-8):
   district,gp,wardNumber
   Jaipur,Some GP,1
   Jaipur,Some GP,2
 Idempotent: upserts District(name), GramPanchayat(districtId,name), Ward(gpId,wardNumber)
*/

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function parseCsvSimple(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const header = lines[0].split(',').map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim());
    if (cols.length !== header.length) continue;
    const row = {};
    header.forEach((h, idx) => (row[h] = cols[idx]));
    rows.push(row);
  }
  return rows;
}

async function main() {
  const fileArg = process.argv[2];
  if (!fileArg) {
    console.error('Provide CSV path: node prisma/seed-locations.js /path/file.csv');
    process.exit(1);
  }
  const csvPath = path.resolve(fileArg);
  if (!fs.existsSync(csvPath)) {
    console.error('File not found:', csvPath);
    process.exit(1);
  }
  const text = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCsvSimple(text);
  console.log(`Parsed ${rows.length} rows`);

  // Cache maps to avoid redundant queries
  const districtCache = new Map(); // name -> id
  const gpCache = new Map(); // `${districtId}:${name}` -> id

  for (const row of rows) {
    const districtName = String(row.district || '').trim();
    const gpName = String(row.gp || '').trim();
    const wardNumber = parseInt(String(row.wardNumber || '0'), 10);

    if (!districtName || !gpName || !wardNumber) {
      console.warn('Skipping invalid row:', row);
      continue;
    }

    // Upsert district by name
    let districtId = districtCache.get(districtName);
    if (!districtId) {
      const d = await prisma.district.upsert({
        where: { name: districtName },
        update: {},
        create: { name: districtName },
      });
      districtId = d.id;
      districtCache.set(districtName, districtId);
      console.log('District upserted:', districtName, districtId);
    }

    // Upsert GP by composite (districtId, name)
    const gpKey = `${districtId}:${gpName}`;
    let gpId = gpCache.get(gpKey);
    if (!gpId) {
      const g = await prisma.gramPanchayat.upsert({
        where: { districtId_name: { districtId, name: gpName } },
        update: {},
        create: { name: gpName, districtId },
      });
      gpId = g.id;
      gpCache.set(gpKey, gpId);
      console.log('GP upserted:', gpName, gpId);
    }

    // Upsert Ward by (gpId, wardNumber)
    const existing = await prisma.ward.findFirst({ where: { gpId, wardNumber } });
    if (existing) {
      // no-op
    } else {
      await prisma.ward.create({ data: { gpId, wardNumber } });
      console.log('Ward created:', gpId, wardNumber);
    }
  }

  console.log('Import completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
