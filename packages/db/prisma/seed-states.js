const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Comprehensive State Hierarchy for Frontend Map (All India)...');

    // This map must match the one in `apps/web/src/app/join/location_utils.ts`
    const stateMap = {
        "Andhra Pradesh": ["Araku", "Srikakulam", "Vizianagaram", "Visakhapatnam", "Anakapalli", "Kakinada", "Amalapuram", "Rajahmundry", "Narsapuram", "Eluru", "Machilipatnam", "Vijayawada", "Guntur", "Narasaraopet", "Bapatla", "Ongole", "Nandyal", "Kurnool", "Anantapur", "Hindupur", "Kadapa", "Nellore", "Tirupati", "Rajampet", "Chittoor"],
        "Arunachal Pradesh": ["Arunachal West", "Arunachal East"],
        "Assam": ["Karimganj", "Silchar", "Autonomous District", "Dhubri", "Kokrajhar", "Barpeta", "Gauhati", "Mangaldoi", "Tezpur", "Nowgong", "Kaliabor", "Jorhat", "Dibrugarh", "Lakhimpur"],
        "Bihar": ["Valmiki Nagar", "Paschim Champaran", "Purvi Champaran", "Sheohar", "Sitamarhi", "Madhubani", "Jhanjharpur", "Supaul", "Araria", "Kishanganj", "Katihar", "Purnia", "Madhepura", "Darbhanga", "Muzaffarpur", "Vaishali", "Gopalganj", "Siwan", "Maharajganj", "Saran", "Hajipur", "Ujiarpur", "Samastipur", "Begusarai", "Khagaria", "Bhagalpur", "Banka", "Munger", "Nalanda", "Patna Sahib", "Pataliputra", "Arrah", "Buxar", "Sasaram", "Karakat", "Jahanabad", "Aurangabad", "Gaya", "Nawada", "Jamui"],
        "Chhattisgarh": ["Sarguja", "Raigarh", "Janjgir-Champa", "Korba", "Bilaspur", "Rajnandgaon", "Durg", "Raipur", "Mahasamund", "Bastar", "Kanker"],
        "Goa": ["North Goa", "South Goa"],
        "Gujarat": ["Kutch", "Banaskantha", "Patan", "Mahesana", "Sabarkantha", "Gandhinagar", "Ahmedabad East", "Ahmedabad West", "Surendranagar", "Rajkot", "Porbandar", "Jamnagar", "Junagadh", "Amreli", "Bhavnagar", "Anand", "Kheda", "Panchmahal", "Dahod", "Vadodara", "Chhota Udaipur", "Bharuch", "Bardoli", "Surat", "Navsari", "Valsad"],
        "Haryana": ["Ambala", "Kurukshetra", "Sirsa", "Hisar", "Karnal", "Sonipat", "Rohtak", "Bhiwani-Mahendragarh", "Gurgaon", "Faridabad"],
        "Himachal Pradesh": ["Kangra", "Mandi", "Hamirpur", "Shimla"],
        "Jharkhand": ["Rajmahal", "Dumka", "Godda", "Chatra", "Kodarma", "Giridih", "Dhanbad", "Ranchi", "Jamshedpur", "Singhbhum", "Khunti", "Lohardaga", "Palamau", "Hazaribagh"],
        "Karnataka": ["Chikkodi", "Belgaum", "Bagalkot", "Bijapur", "Gulbarga", "Raichur", "Bidar", "Koppal", "Bellary", "Haveri", "Dharwad", "Uttara Kannada", "Davangere", "Shimoga", "Udupi Chikmagalur", "Hassan", "Dakshina Kannada", "Chitradurga", "Tumkur", "Mandya", "Mysore", "Chamarajanagar", "Bangalore Rural", "Bangalore North", "Bangalore Central", "Bangalore South", "Chikkballapur", "Kolar"],
        "Kerala": ["Kasaragod", "Kannur", "Vatakara", "Wayanad", "Kozhikode", "Malappuram", "Ponnani", "Palakkad", "Alathur", "Thrissur", "Chalakudy", "Ernakulam", "Idukki", "Kottayam", "Alappuzha", "Mavelikkara", "Pathanamthitta", "Kollam", "Attingal", "Thiruvananthapuram"],
        "Madhya Pradesh": ["Morena", "Bhind", "Gwalior", "Guna", "Sagar", "Tikamgarh", "Damoh", "Khajuraho", "Satna", "Rewa", "Sidhi", "Shahdol", "Jabalpur", "Mandla", "Balaghat", "Chhindwara", "Hoshangabad", "Vidisha", "Bhopal", "Rajgarh", "Dewas", "Ujjain", "Mandsour", "Ratlam", "Dhar", "Indore", "Khargone", "Khandwa", "Betul"],
        "Maharashtra": ["Nandurbar", "Dhule", "Jalgaon", "Raver", "Buldhana", "Akola", "Amravati", "Wardha", "Ramtek", "Nagpur", "Bhandara-Gondiya", "Gadchiroli-Chimur", "Chandrapur", "Yavatmal-Washim", "Hingoli", "Nanded", "Parbhani", "Maval", "Pune", "Baramati", "Shirur", "Ahmednagar", "Shirdi", "Beed", "Osmanabad", "Latur", "Solapur", "Madha", "Sangli", "Satara", "Ratnagiri-Sindhudurg", "Kolhapur", "Hatkanangle", "Nashik", "Dindori", "Palghar", "Bhiwandi", "Kalyan", "Thane", "Mumbai North", "Mumbai North West", "Mumbai North East", "Mumbai North Central", "Mumbai South Central", "Mumbai South", "Raigad"],
        "Manipur": ["Inner Manipur", "Outer Manipur"],
        "Meghalaya": ["Shillong", "Tura"],
        "Mizoram": ["Mizoram"],
        "Nagaland": ["Nagaland"],
        "Odisha": ["Bargarh", "Sundargarh", "Sambalpur", "Keonjhar", "Mayurbhanj", "Balasore", "Bhadrak", "Jajpur", "Dhenkanal", "Bolangir", "Kalahandi", "Nabarangpur", "Kandhamal", "Cuttack", "Kendrapara", "Jagatsinghpur", "Puri", "Bhubaneswar", "Aska", "Berhampur", "Koraput"],
        "Punjab": ["Gurdaspur", "Amritsar", "Khadoor Sahib", "Jalandhar", "Hoshiarpur", "Anandpur Sahib", "Ludhiana", "Fatehgarh Sahib", "Faridkot", "Ferozepur", "Bathinda", "Sangrur", "Patiala"],
        "Rajasthan": ["Ganganagar", "Bikaner", "Churu", "Jhunjhunu", "Sikar", "Jaipur Rural", "Jaipur", "Alwar", "Bharatpur", "Karauli-Dholpur", "Dausa", "Tonk-Sawai Madhopur", "Ajmer", "Nagaur", "Pali", "Jodhpur", "Barmer", "Jalore", "Udaipur", "Banswara", "Chittorgarh", "Rajsamand", "Bhilwara", "Kota", "Jhalawar-Baran"],
        "Sikkim": ["Sikkim"],
        "Tamil Nadu": ["Thiruvallur", "Chennai North", "Chennai South", "Chennai Central", "Sriperumbudur", "Kancheepuram", "Arakkonam", "Vellore", "Krishnagiri", "Dharmapuri", "Tiruvannamalai", "Arani", "Viluppuram", "Kallakurichi", "Salem", "Namakkal", "Erode", "Tiruppur", "Nilgiris", "Coimbatore", "Pollachi", "Dindigul", "Karur", "Tiruchirappalli", "Perambalur", "Cuddalore", "Chidambaram", "Mayiladuthurai", "Nagapattinam", "Thanjavur", "Sivaganga", "Madurai", "Theni", "Virudhunagar", "Ramanathapuram", "Thoothukkudi", "Tenkasi", "Tirunelveli", "Kanyakumari"],
        "Telangana": ["Adilabad", "Peddapalle", "Karimnagar", "Nizamabad", "Zahirabad", "Medak", "Malkajgiri", "Secunderabad", "Hyderabad", "Chevella", "Mahbubnagar", "Nagarkurnool", "Nalgonda", "Bhongir", "Warangal", "Mahabubabad", "Khammam"],
        "Tripura": ["Tripura West", "Tripura East"],
        "Uttar Pradesh": ["Saharanpur", "Kairana", "Muzaffarnagar", "Bijnor", "Nagina", "Moradabad", "Rampur", "Sambhal", "Amroha", "Meerut", "Baghpat", "Ghaziabad", "Gautam Buddha Nagar", "Bulandshahr", "Aligarh", "Hathras", "Mathura", "Agra", "Fatehpur Sikri", "Firozabad", "Mainpuri", "Etah", "Badaun", "Aonla", "Bareilly", "Pilibhit", "Shahjahanpur", "Kheri", "Dhaurahra", "Sitapur", "Hardoi", "Misrikh", "Unnao", "Mohanlalganj", "Lucknow", "Rae Bareli", "Amethi", "Sultanpur", "Pratapgarh", "Farrukhabad", "Etawah", "Kannauj", "Kanpur", "Akbarpur", "Jalaun", "Jhansi", "Hamirpur", "Banda", "Fatehpur", "Kaushambi", "Phulpur", "Allahabad", "Barabanki", "Faizabad", "Ambedkar Nagar", "Bahraich", "Kaiserganj", "Shrawasti", "Gonda", "Domariyaganj", "Basti", "Sant Kabir Nagar", "Maharajganj", "Gorakhpur", "Kushi Nagar", "Deoria", "Bansgaon", "Lalganj", "Azamgarh", "Ghosi", "Salempur", "Ballia", "Jaunpur", "Machhlishahr", "Ghazipur", "Chandauli", "Varanasi", "Bhadohi", "Mirzapur", "Robertsganj"],
        "Uttarakhand": ["Tehri Garhwal", "Garhwal", "Almora", "Nainital-Udhamsingh Nagar", "Haridwar"],
        "West Bengal": ["Cooch Behar", "Alipurduars", "Jalpaiguri", "Darjeeling", "Raiganj", "Balurghat", "Maldaha Uttar", "Maldaha Dakshin", "Jangipur", "Baharampur", "Murshidabad", "Krishnanagar", "Ranaghat", "Bongaon", "Barrackpore", "Dum Dum", "Barasat", "Basirhat", "Jaynagar", "Mathurapur", "Diamond Harbour", "Jadavpur", "Kolkata Dakshin", "Kolkata Uttar", "Howrah", "Uluberia", "Sreerampur", "Hooghly", "Arambag", "Tamluk", "Kanthi", "Ghatal", "Jhargram", "Medinipur", "Purulia", "Bankura", "Bishnupur", "Bardhaman Purba", "Bardhaman-Durgapur", "Asansol", "Bolpur", "Birbhum"],
        "Delhi": ["Chandni Chowk", "North East Delhi", "East Delhi", "New Delhi", "North West Delhi", "West Delhi", "South Delhi"],
        "Jammu and Kashmir": ["Baramulla", "Srinagar", "Anantnag-Rajouri", "Udhampur", "Jammu"],
        "Ladakh": ["Ladakh"],
        "Lakshadweep": ["Lakshadweep"],
        "Puducherry": ["Puducherry"],
        "Andaman and Nicobar Islands": ["Andaman and Nicobar Islands"],
        "Chandigarh": ["Chandigarh"],
        "Dadra and Nagar Haveli and Daman and Diu": ["Daman & Diu", "Dadra and Nagar Haveli"]
    };

    const TOTAL_STATES = Object.keys(stateMap).length;
    let processedCount = 0;

    for (const [state, loksabhas] of Object.entries(stateMap)) {
        processedCount++;
        console.log(`[${processedCount}/${TOTAL_STATES}] Processing state: ${state}`);
        for (const lName of loksabhas) {
            // Upsert Loksabha
            const loksabha = await prisma.loksabha.upsert({
                where: { name: lName },
                update: {},
                create: { name: lName },
            });

            // Skip Vidhansabhas/LocalUnits generation if already exists to save time?
            // For now, let's just do a quick check or simple upsert.
            // Generate minimal sample Vidhansabhas (1 per Loksabha) to keep seed fast
            // In a real scenario, this would be thousands of records.
            const vidhansabhas = [`${lName} Assembly`];

            for (const vName of vidhansabhas) {
                const vidhansabha = await prisma.vidhansabha.upsert({
                    where: { loksabhaId_name: { loksabhaId: loksabha.id, name: vName } },
                    update: {},
                    create: { name: vName, loksabhaId: loksabha.id },
                });

                // Seed 1 Local Unit (Ward)
                const wardName = `Ward 1`;
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
