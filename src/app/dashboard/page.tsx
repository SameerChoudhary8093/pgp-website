"use client";

import React, { useState } from 'react';
import Link from "next/link";
import {
  Copy,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  X, // Twitter icon
  User,
  Menu
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LanguageProvider, useLanguage } from '../../components/LanguageContext';

// --- Types ---
interface Member {
  id: string;
  name: { en: string; hi: string };
  role: 'Worker' | 'Member';
  avatar: string; // URL
}

// --- Mock Data ---
// Names translated for demonstration
const currentUser = {
  name: { en: "Dr. Sudhanshu Sharma", hi: "डॉ. सुधांशु शर्मा" },
  id: "PGP-MEM-0639",
  role: 'Worker' as const,
  ward: { en: "Ward 10 – Bani Park, Jaipur", hi: "वार्ड 10 - बनी पार्क, जयपुर" },
  avatar: "/Shudhanshu.svg"
};

const recruitsList: Member[] = [
  { id: '1', name: { en: 'Vikram Chauhan', hi: 'विक्रम चौहान' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=vikram' },
  { id: '2', name: { en: 'Misthi Sharma', hi: 'मिष्टी शर्मा' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=misthi' },
  { id: '3', name: { en: 'Vikrant Singh', hi: 'विक्रांत सिंह' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=vikrant' },
  { id: '4', name: { en: 'Shreya Ghosal', hi: 'श्रेया घोषाल' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=shreya' },
  { id: '5', name: { en: 'Raghav Mehta', hi: 'राघव मेहता' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=raghav' },
  { id: '6', name: { en: 'Devesh Yadav', hi: 'देवेश यादव' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=devesh' },
  { id: '7', name: { en: 'Rohit Chauhan', hi: 'रोहित चौहान' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=rohit' },
  { id: '8', name: { en: 'Amit Bansal', hi: 'अमित बंसल' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=amit' },
  { id: '9', name: { en: 'Rajat Yadav', hi: 'रजत यादव' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=rajat' },
  { id: '10', name: { en: 'Sushma Singh', hi: 'सुषमा सिंह' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=sushma' },
  { id: '11', name: { en: 'Shobha Jha', hi: 'शोभा झा' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=shobha' },
  { id: '12', name: { en: 'Mahima Singh', hi: 'महिमा सिंह' }, role: 'Member', avatar: 'https://i.pravatar.cc/150?u=mahima' },
];

// --- Components ---

const MemberIdCard = () => {
  const { t, language } = useLanguage();
  const currentLang = language as 'en' | 'hi'; // ensuring type safety

  const roleLabel = currentUser.role === 'Worker' ? t.dashboard.roles.worker : t.dashboard.roles.member;

  return (
    <div className="w-full lg:w-[388px] h-auto lg:h-[419px] bg-white rounded-[8px] p-[24px] pt-[20px] flex flex-col gap-[16px] border border-[#B9D3C4] shadow-[0px_4px_20px_0px_#0000001A]">
      <h2 className="text-[20px] font-bold text-[#04330B] font-['Familjen_Grotesk'] leading-[26px]">
        {t.dashboard.memberCardTitle}
      </h2>

      {/* Photo */}
      <div className="w-full h-[200px] overflow-hidden rounded-[8px] bg-gray-100">
        <img
          src={currentUser.avatar}
          alt={currentUser.name[currentLang]}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Details Grid */}
      <div className="flex flex-col gap-[12px] text-[14px]">
        <div className="flex justify-between items-center h-[22px]">
          <span className="text-[#587E67] font-semibold font-['Familjen_Grotesk']">{t.dashboard.name}</span>
          <span className="text-[#04330B] font-bold font-['Familjen_Grotesk'] text-right">{currentUser.name[currentLang]}</span>
        </div>
        <div className="flex justify-between items-center h-[22px]">
          <span className="text-[#587E67] font-semibold font-['Familjen_Grotesk']">{t.dashboard.membershipId}</span>
          <span className="text-[#04330B] font-bold font-['Familjen_Grotesk'] text-right">{currentUser.id}</span>
        </div>
        <div className="flex justify-between items-center h-[22px]">
          <span className="text-[#587E67] font-semibold font-['Familjen_Grotesk']">{t.dashboard.role}</span>
          <span className="text-[#04330B] font-bold font-['Familjen_Grotesk'] text-right">{roleLabel}</span>
        </div>
        <div className="flex justify-between items-start h-auto">
          <span className="text-[#587E67] font-semibold font-['Familjen_Grotesk'] shrink-0">{t.dashboard.ward}</span>
          <span className="text-[#04330B] font-bold font-['Familjen_Grotesk'] text-right break-words max-w-[200px]">{currentUser.ward[currentLang]}</span>
        </div>
      </div>
    </div>
  );
};

const RecruitsPanel = () => {
  const { t, language } = useLanguage();
  const currentLang = language as 'en' | 'hi';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText("ADMINCODE");
    }
  };

  return (
    <div className="w-full lg:w-[892px] h-auto lg:h-[420px] bg-white rounded-[8px] p-[24px] pt-[20px] pb-[20px] flex flex-col gap-[20px] border border-[#B9D3C4] shadow-[0px_4px_20px_0px_#0000001A]">
      {/* Top Section: Header & QR */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-3/4 flex flex-col gap-[12px]">
          <h2 className="text-[24px] font-bold text-[#04330B] font-['Familjen_Grotesk'] leading-[30px]">{t.dashboard.recruitsTitle}</h2>

          <div className="flex items-center gap-2 h-[22px]">
            <span className="text-[#587E67] font-semibold font-['Familjen_Grotesk'] text-[16px]">{t.dashboard.referralCode}</span>
            <span className="text-[#04330B] font-bold font-['Familjen_Grotesk'] text-[16px]">ADMINCODE</span>
            <button
              onClick={handleCopy}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              title={t.dashboard.copy}
            >
              <img src="/CopiedIcon.svg" alt="Copy" className="w-[18px] h-[18px]" />
            </button>
          </div>

          <p className="text-[14px] text-[#587E67] font-semibold font-['Familjen_Grotesk'] leading-[18px]">
            {t.dashboard.target}
          </p>

          {/* Progress Bar */}
          <div className="relative w-full max-w-[500px] h-[32px] bg-[#C6E0D1] rounded-[8px] overflow-hidden flex items-center">
            <div className="absolute left-0 top-0 h-full bg-[#65A27F] w-[57%]"></div>
            <span className="relative z-10 pl-3 text-[14px] font-bold text-white font-['Familjen_Grotesk']">12/21</span>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="mt-4 md:mt-0 flex-shrink-0 w-[134px] h-[134px] p-[8px] opacity-80 border border-dashed border-[#0D5229]">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=118x118&data=Example"
            alt="QR Code"
            className="w-[118px] h-[118px]"
          />
        </div>
      </div>

      {/* Recruited Members Grid */}
      <div className="w-full flex flex-col gap-[16px]">
        <h3 className="text-[16px] font-bold text-[#04330B] font-['Familjen_Grotesk']">{t.dashboard.recruitedMembers}</h3>
        <div className="w-full h-[180px] overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {recruitsList.map((recruit) => {
            const recruitRoleLabel = recruit.role === 'Worker' ? t.dashboard.roles.worker : t.dashboard.roles.member;
            return (
              <div key={recruit.id} className="flex items-center gap-[12px]">
                <img
                  src={recruit.avatar}
                  alt={recruit.name[currentLang]}
                  className="w-[40px] h-[40px] rounded-[8px] object-cover bg-gray-200"
                />
                <div className="flex flex-col">
                  <span className="font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#04330B]">{recruit.name[currentLang]}</span>
                  <span className="font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#587E67]">{recruitRoleLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Main Layout Content ---
const DashboardContent = () => {
  const { t } = useLanguage();

  const dashboardLinks = [
    { name: t.nav.dashboard, href: '/dashboard' },
    { name: t.nav.election, href: '/election' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pt-[104px] overflow-x-hidden">

      {/* Navbar with showProfileButton=true and isDashboard=true */}
      <Navbar links={dashboardLinks} showAuthButtons={false} showProfileButton={true} isDashboard={true} />

      <main className="w-full max-w-[1320px] mx-auto flex flex-col items-center">
        {/* Main Content Container - 1320x420, Gap 40px */}
        <div className="w-full flex flex-col lg:flex-row gap-[40px] justify-center px-4 lg:px-0">

          {/* Left Column: Member Card (388px) */}
          <MemberIdCard />

          {/* Right Column: Recruits Panel (892px) */}
          <RecruitsPanel />

        </div>

        {/* Removed the empty spacer div as requested */}
      </main>

      <Footer />
    </div>
  );
};

export default function Dashboard() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
}