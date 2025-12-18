"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LanguageProvider, useLanguage } from '../../components/LanguageContext';

// --- Table Component ---
const ElectionTable = () => {
    const { t } = useLanguage();

    const data = Array(5).fill({
        name: "XYZ Elections",
        candidates: 312,
        start: "21-10-2025",
        end: "31-10-2025",
        status: "Ongoing",
        vote: "Voted"
    });

    return (
        <div className="overflow-hidden border border-gray-200 rounded-xl mt-6">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-white border-b border-gray-200 text-gray-500 font-semibold">
                    <tr>
                        <th className="px-6 py-4">{t.election.table.sno}</th>
                        <th className="px-6 py-4">{t.election.table.name}</th>
                        <th className="px-6 py-4 text-center">{t.election.table.candidates}</th>
                        <th className="px-6 py-4">{t.election.table.startDate}</th>
                        <th className="px-6 py-4">{t.election.table.endDate}</th>
                        <th className="px-6 py-4">{t.election.table.status}</th>
                        <th className="px-6 py-4">{t.election.table.vote}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row, idx) => (
                        <tr key={idx} className={`${idx === 1 ? 'bg-green-50/30' : 'bg-white'} hover:bg-gray-50 transition-colors`}>
                            <td className="px-6 py-5 font-bold text-gray-800">{idx + 1}</td>
                            <td className="px-6 py-5 font-semibold text-gray-800">{row.name}</td>
                            <td className="px-6 py-5 text-center font-bold text-gray-800">{row.candidates}</td>
                            <td className="px-6 py-5 font-bold text-gray-800">{row.start}</td>
                            <td className="px-6 py-5 font-bold text-gray-800">{row.end}</td>
                            <td className="px-6 py-5 font-semibold text-gray-800">{row.status}</td>
                            <td className="px-6 py-5 font-semibold text-gray-800">{idx === 1 ? t.election.table.notVoted : t.election.table.voted}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- Main Page Component ---
const ElectionPageContent = () => {
    const { t } = useLanguage();

    const dashboardLinks = [
        { name: t.nav.dashboard, href: '/dashboard' },
        { name: t.nav.election, href: '/election' }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 pt-[104px] overflow-x-hidden">
            <Navbar links={dashboardLinks} showAuthButtons={false} showProfileButton={true} isDashboard={true} />

            <main className="max-w-[1320px] mx-auto px-4 lg:px-0">

                {/* HERO SECTION (Matches Home Page Layout exactly) */}
                <section className="w-full flex justify-center mt-[12px]">
                    <div className="w-full relative flex flex-col lg:flex-row">

                        {/* Header Text - Left Column */}
                        <div className="flex flex-col w-full lg:w-[703px] shrink-0 lg:justify-between">
                            <div className="flex flex-col gap-[12px] lg:gap-[16px] w-full mb-[24px] lg:mb-0">
                                <h1 className="font-['Familjen_Grotesk'] font-semibold text-[32px] md:text-[40px] lg:text-[64px] leading-[1.1] lg:leading-[72px] tracking-[-0.3px] text-[#04330B]">
                                    {t.election.title}
                                </h1>
                                <p className="font-['Familjen_Grotesk'] font-semibold text-[16px] lg:text-[20px] leading-[24px] tracking-[-0.3px] text-[#587E67] max-w-[476px]">
                                    {t.election.subtitle}
                                </p>
                            </div>

                            <div className="w-full h-[200px] lg:h-[342px] rounded-[8px] overflow-hidden bg-gray-100">
                                <img src="/herosection/hero1.svg" alt="Hero 1" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="hidden lg:block w-[34px] shrink-0"></div>

                        {/* Middle Column Images */}
                        <div className="flex flex-col w-full lg:w-[291px] shrink-0 gap-[16px] lg:gap-[24px] mt-[16px] lg:mt-0">
                            <div className="w-full h-[200px] lg:h-[256px] rounded-[8px] overflow-hidden bg-gray-100">
                                <img src="/herosection/hero2.svg" alt="Hero 2" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full h-[200px] lg:h-[222px] rounded-[8px] overflow-hidden bg-gray-100 hidden lg:block">
                                <img src="/herosection/hero3.svg" alt="Hero 3" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="hidden lg:block w-[24px] shrink-0"></div>

                        {/* Right Column Images */}
                        <div className="flex flex-col w-full lg:w-[278px] shrink-0 gap-[24px] mt-[16px] lg:mt-0 hidden lg:flex">
                            <div className="w-full h-[230px] rounded-[8px] overflow-hidden bg-gray-100">
                                <img src="/herosection/hero4.svg" alt="Hero 4" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full h-[246px] rounded-[8px] overflow-hidden bg-gray-100">
                                <img src="/herosection/hero5.svg" alt="Hero 5" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Election Table Section */}
                <section className="mt-[60px] lg:mt-[120px] w-full max-w-[1320px] mx-auto flex flex-col gap-[40px]">
                    <h2 className="text-4xl font-extrabold text-[#0D2F22] mb-3">{t.election.tableTitle}</h2>
                    <p className="text-gray-500 font-medium text-lg">{t.election.tableSubtitle}</p>

                    <div className="mt-8 flex items-center">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                            {t.election.selectYear} <ChevronDown size={16} />
                        </button>
                    </div>

                    <ElectionTable />
                </section>

                {/* Adding spacing before footer */}
                <div className="h-[60px]" />
            </main>

            <Footer />
        </div>
    );
};

export default function ElectionPage() {
    return (
        <LanguageProvider>
            <ElectionPageContent />
        </LanguageProvider>
    );
}
