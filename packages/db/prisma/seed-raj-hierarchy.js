const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Rajasthan Hierarchy...');

    // 1. Seed Loksabhas
    const loksabhas = [
        { name: 'Jaipur' },
        { name: 'Jodhpur' },
        { name: 'Udaipur' },
        { name: 'Kota' },
        { name: 'Bikaner' }
    ];

    for (const l of loksabhas) {
        const loksabha = await prisma.loksabha.upsert({
            where: { name: l.name },
            update: {},
            create: { name: l.name },
        });
        console.log(`Loksabha: ${loksabha.name}`);

        // 2. Seed Vidhansabhas for each
        const vidhansabhas = [];
        if (l.name === 'Jaipur') vidhansabhas.push('Civil Lines', 'Malviya Nagar', 'Kishanpole', 'Adarsh Nagar');
        if (l.name === 'Jodhpur') vidhansabhas.push('Sardarpura', 'Soorsagar', 'Jodhpur City');
        if (l.name === 'Udaipur') vidhansabhas.push('Udaipur City', 'Udaipur Rural');
        if (l.name === 'Kota') vidhansabhas.push('Kota North', 'Kota South');
        if (l.name === 'Bikaner') vidhansabhas.push('Bikaner East', 'Bikaner West');

        for (const vName of vidhansabhas) {
            const vidhansabha = await prisma.vidhansabha.upsert({
                where: { loksabhaId_name: { loksabhaId: loksabha.id, name: vName } },
                update: {},
                create: { name: vName, loksabhaId: loksabha.id },
            });
            console.log(`  -> Vidhansabha: ${vidhansabha.name}`);

            // 3. Seed LocalUnits (Wards/GPs) for each Vidhansabha
            // Create Ward 1 to Ward 5
            for (let i = 1; i <= 5; i++) {
                const wardName = `Ward ${i}`;
                await prisma.localUnit.upsert({
                    where: { vidhansabhaId_name_type: { vidhansabhaId: vidhansabha.id, name: wardName, type: 'Ward' } },
                    update: {},
                    create: {
                        name: wardName,
                        type: 'Ward',
                        vidhansabhaId: vidhansabha.id
                    }
                });
            }
            console.log(`     -> Seeded 5 Wards`);
        }
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
