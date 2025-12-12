import Link from "next/link";
import React from "react";
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Trophy, 
  HandHeart, 
  Globe, 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Facebook, 
  Instagram, 
  X, // Twitter
  ArrowRight
} from 'lucide-react';

// --- Mock Data ---

const visionCards = [
  {
    icon: Trophy,
    title: "We will achieve victory through a strategy of knowledge.",
    desc: "Building a stronger future begins with providing access to information and learning opportunities. By encouraging critical thinking."
  },
  {
    icon: HandHeart,
    title: "Your small donation will ultimately prove to be a boon for change.",
    desc: "Even the smallest contribution helps support meaningful initiatives that uplift communities. When individuals participate, the collective strength grows."
  },
  {
    icon: Globe,
    title: "We will grow stronger! We will struggle, fight, and win till end!",
    desc: "Strength comes from unity, resilience, and a shared commitment to progress. Challenges become easier to overcome when we stand together."
  },
  {
    icon: Leaf,
    title: "Save the environment now! Increase collective sensitivity today!",
    desc: "Protecting nature requires awareness, responsibility, and timely action from every individual. By embracing sustainable habits."
  }
];

const stats = [
  { number: "35K+", label: "Working Volunteers", sub: "People dedicated to driving impactful change across all major regions." },
  { number: "60K+", label: "Explored Rajasthan Cities", sub: "Expanding our reach across the state through continuous field efforts." },
  { number: "32%+", label: "Private & Domestic Land", sub: "Promoting sustainable green development within urban residential zones." },
  { number: "1.2 Lakh+", label: "People Engaged", sub: "Communities actively participating in our initiatives commitment." },
];

const committeeMembers = [
  { name: "Dr. Sudhanshu", role: "President", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
  { name: "Bhanwar Lal Nayak", role: "Vice President", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
  { name: "Naseem Ansari", role: "Vice President", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
  { name: "Adv. Kapil", role: "Gen. Secretary", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Er. Gaurav", role: "Secretary", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { name: "Dr. Tanmay", role: "Gen. Secretary", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  { name: "Satish Nagpal", role: "Pradesh Adhyaksh Rajasthan", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400" },
  { name: "Dr. Hari Singh Chauhan", role: "Vice President", img: "https://images.unsplash.com/photo-1618077553760-44ec800a6c6e?auto=format&fit=crop&q=80&w=400" },
];

// --- Reusable Components ---

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-50 border-b border-gray-100">
    <div className="flex flex-col items-center leading-none cursor-pointer">
      <img src="/PGPlogo.svg" alt="PGP Logo" className="w-[114px] h-[60px] object-cover" />
    </div>
    <div className="hidden lg:flex gap-8 items-center text-sm font-medium text-gray-600">
      {['Home', 'About', 'Constitution', 'Donate', 'Declaration'].map((link) => (
        <a key={link} href="#" className="hover:text-green-700 transition-colors">{link}</a>
      ))}
    </div>
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-gray-300 rounded overflow-hidden h-8">
        <button className="px-2 text-xs font-medium hover:bg-gray-50 h-full">हि</button>
        <div className="w-px h-full bg-gray-300"></div>
        <button className="px-2 text-xs font-bold bg-green-50 text-green-800 h-full">En</button>
      </div>
      <Link href="/join">
        <button className="px-5 py-1.5 bg-green-900 text-white text-sm font-medium rounded hover:bg-green-800">Join Us</button>
      </Link>
      <button className="px-5 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50">Login</button>
    </div>
  </nav>
);

const SectionHeader = ({ title, sub }: { title: string, sub?: string }) => (
  <div className="text-center mb-12 max-w-3xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-4">{title}</h2>
    {sub && <p className="text-gray-500 text-sm md:text-base">{sub}</p>}
  </div>
);

// --- Main Page Component ---

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="w-full flex justify-center px-4 py-12 lg:py-20">
        <div className="relative w-[1320px] h-[502px] flex gap-4">
          {/* Left: Text + big bottom image */}
          <div className="flex flex-col justify-start w-[703px]">
            <div className="pr-6">
              <h1 className="text-4xl lg:text-5xl font-bold [Familjen Grotesk,] text-[#04330B] leading-tight mb-4">
                Catalyzing innovation
                <br className="hidden lg:block" />
                for a better future
              </h1>
              <p className="text-[#587E67] text-lg mb-6 max-w-md">
                Committed to sustainable progress and transformative ideas.
              </p>
            </div>

            <div className="mt-auto w-[703px] h-[246px] rounded-[8px] overflow-hidden shadow-lg">
              <img
                src="/hero1.svg"
                alt="Crowd"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: 4 images grid */}
          <div className="w-[601px] flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-[291px] h-[256px] rounded-[8px] overflow-hidden shadow-md">
                <img
                  src="/hero2.svg"
                  alt="Meeting"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-[278px] h-[230px] rounded-[8px] overflow-hidden shadow-md">
                <img
                  src="/hero3.svg"
                  alt="Community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-[291px] h-[222px] rounded-[8px] overflow-hidden shadow-md">
                <img
                  src="/hero4.svg"
                  alt="Group"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-[278px] h-[246px] rounded-[8px] overflow-hidden shadow-md">
                <img
                  src="/hero5.svg"
                  alt="Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISION FOR BETTER TOMORROW (Cards) */}
      <section className="bg-[#ffffff] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="Our Vision for a Better Tomorrow" 
            sub="Advocating for change, fostering growth, and ensuring a prosperous and just society." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-60 justify-items-center">
            {visionCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white w-[360px] h-[364px] p-6 rounded-[8px] border border-[color:var(--Border-Primary)] flex flex-col"
              >
                <div className="w-10 h-10 mb-4 text-[#0B6B39]">
                  <card.icon size={32} strokeWidth={1.5} />
                </div>
                
                {/* 
                   UPDATED HEADING:
                   Width: 312px | Height: 90px | Font: Familjen Grotesk | Weight: 600
                   Size: 24px | Line-Height: 30px | Letter-spacing: -0.3px | Color: #04330B
                */}
                <h3 className="font-['Familjen_Grotesk'] w-[312px] h-[90px] text-[#04330B] font-semibold text-[24px] leading-[30px] tracking-[-0.3px] mb-3">
                  {card.title}
                </h3>
                
                {/* 
                   UPDATED DESCRIPTION:
                   Width: 312px | Height: 154px | Font: Familjen Grotesk | Weight: 600
                   Size: 16px | Line-Height: 22px | Letter-spacing: -0.3px | Color: #587E67
                */}
                <p className="font-['Familjen_Grotesk'] w-[312px] h-[154px] text-[#587E67] font-semibold text-[16px] leading-[22px] tracking-[-0.3px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 mt-8 text-[#587E67]">
             <p className="text-sm">Now the people's PGP will defeat the dishonest.</p>
             <div className="flex gap-2">
                <button className="p-2 border border-[#B9D3C4] rounded-[10px] text-[#04330B] hover:bg-white hover:text-green-700 transition"><ChevronLeft size={16} /></button>
                <button className="p-2 border border-[#B9D3C4] rounded-[10px] text-[#04330B] hover:bg-white hover:text-green-700 transition"><ChevronRight size={16} /></button>
             </div>
          </div>
        </div>
      </section>

     {/* 3. OUR VISION (Overlapping Layout) */}
      <section className="py-16 lg:py-24 px-6 max-w-[1440px] mx-auto">
        
        {/* Header Text */}
        <div className="mb-12 max-w-3xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#04330B] mb-4 font-['Familjen_Grotesk']">
            Our Vision
          </h2>
          <p className="text-[#587E67] text-lg font-medium leading-relaxed max-w-2xl">
            Together, we can make Rajasthan a model of sustainable development 
            and ecological harmony. Join our green movement today.
          </p>
        </div>

        {/* Overlapping Content Container */}
        <div className="relative w-full flex flex-col lg:block">
          
          {/* Left: Large Blue Image Background */}
          {/* This sits on the left and takes up about 75% of the width on desktop */}
          <div className="w-full lg:w-[75%] h-[500px] lg:h-[600px] rounded-[20px] overflow-hidden relative z-0">
            
            {/* The Image */}
            <img 
              src="/VisionImage.svg" 
              alt="Audience in blue light" 
              className="w-[920px] h-[500px] object-cover"
            />
          </div>

          {/* Right: Floating Cards */}
          {/* On Desktop: Absolute positioned to the right, vertically centered */}
          <div className="w-full lg:w-[636px] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 z-20 flex flex-col gap-[24px] mt-8 lg:mt-0 px-4 lg:px-0">
            
            {[
              { 
                title: "New farming capable farmer", 
                desc: "Assist patients in recovering from injuries and surgeries." 
              },
              { 
                title: "Sustainable Use and Conservation of Natural Resources", 
                desc: "Ensuring balanced development while protecting nature." 
              },
              { 
                title: "Control Over Population Growth", 
                desc: "Ensuring a Balanced Future Through Population Control." 
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white w-[636px] h-[116px] border border-gray-200 rounded-[8px] p-[20px] pt-[24px] pb-[24px] hover:border-green-200 transition-all cursor-pointer"
              >
                <h3 className="text-xl lg:text-2xl font-bold text-[#04330B] mb-2 font-['Familjen_Grotesk']">
                  {item.title}
                </h3>
                <p className="text-[#587E67] text-base font-medium">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 border border-[#04330B] rounded-[8px] text-[#04330B] font-semibold text-sm hover:bg-[#04330B] hover:text-white transition-colors">
            View More
          </button>
        </div>

      </section>

      {/* 4. MEET YOUR IDEOLOGICAL LEADER */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-4xl lg:text-4xl font-bold text-[#04330B] font-['Familjen_Grotesk'] mb-2">
              Meet Your Ideological Leader
            </h2>
            <p className="text-[#587E67] font-medium text-lg mb-8">
              The Face of Change, The Voice of the People.
            </p>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#04330B] mb-2 font-['Familjen_Grotesk']">
                “The Green Talks with Dr. Sudhanshu.”
              </h3>
              <p className="text-[#587E67] font-medium">
                – Dr. Sudhanshu Sharma, President
              </p>
            </div>

            <p className="text-[#587E67] text-[15px] leading-relaxed mb-8 text-justify font-medium">
              Dr. Sudhanshu is an Indian academician, politician, green activist, and climate change scientist. 
              He is the co-founder of Suresh Gyan Vihar University, one of the NAAC 'A+' graded universities in 
              Rajasthan. He also served as the founding First Vice-President of Suresh Gyan Vihar University 
              between 2008–2010. In 2011, he founded the Bharatiya People's Green Party, based in 
              Rajasthan, as its national president. The party is affiliated with the Naya Rajasthan think-tank 
              and promotes the formation of a people's green zone.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
               <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-green-800 hover:bg-green-50 transition-colors">
                 <Facebook size={18} />
               </button>
               <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-green-800 hover:bg-green-50 transition-colors">
                 <Instagram size={18} />
               </button>
               <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-green-800 hover:bg-green-50 transition-colors">
                 <X size={18} />
               </button>
            </div>
          </div>

          {/* Right Image - Cutout Style */}
          <div className="flex-1 flex justify-center lg:justify-end">
            {/* Note: In a real scenario, use a transparent PNG (cutout) of the person here. 
                I'm using a placeholder but styling it to look clean. */}
            <img 
              src="/leaderimage.svg" 
              alt="Dr Sudhanshu Sharma" 
              className="w-full max-w-md h-auto object-contain drop-shadow-xl" 
            />
          </div>

        </div>
      </section>

      {/* 5. IMPACT STATS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#04330B] font-['Familjen_Grotesk'] mb-4">
              Our Growing Impact Across Rajasthan
            </h2>
            <p className="text-[#587E67] font-medium max-w-3xl">
              Together, we can make Rajasthan a model of sustainable development and ecological harmony. Join our green movement today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                number: "35K+", 
                label: "Working Volunteers", 
                sub: "People dedicated to driving impactful change across all major regions." 
              },
              { 
                number: "60K+", 
                label: "Explored Rajasthan Cities", 
                sub: "Expanding our reach across the state through continuous field efforts." 
              },
              { 
                number: "32%+", 
                label: "Private & Domestic Land", 
                sub: "Promoting sustainable green development within urban residential zones." 
              },
              { 
                number: "1.2 Lakh+", 
                label: "People Engaged", 
                sub: "Communities actively participating in our initiatives commitment." 
              },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-[12px] border border-gray-200 hover:border-green-200 hover:shadow-md transition-all h-full"
              >
                <h3 className="text-4xl font-bold text-[#04330B] mb-3 font-['Familjen_Grotesk']">
                  {stat.number}
                </h3>
                <h4 className="text-lg font-bold text-[#04330B] mb-3 font-['Familjen_Grotesk']">
                  {stat.label}
                </h4>
                <p className="text-[#587E67] text-sm font-medium leading-relaxed">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEWS AND PUBLICATIONS (Exact Column Layout) */}
      <section className="w-full flex justify-center px-4 py-16">
        <div className="relative w-[1320px] h-[600px] ">

          <div className="mb-12 max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#04330B] mb-4 font-['Familjen_Grotesk']">
              News and Publications
            </h2>
            <p className="text-[#587E67] text-lg font-medium">
              Stay updated with the party’s latest statements and announcements.
            </p>
          </div>
          
          {/* Image 1 */}
          <div className="absolute w-[244px] h-[280px] top-[320px] left-[0px]  rounded-[8px] overflow-hidden">
            <img src="/news1.svg" alt="Gallery 1" className="w-full h-full object-cover" />
          </div>
          
          {/* Image 2 */}
          <div className="absolute w-[245px] h-[188px] top-[240px] left-[268px]  rounded-[8px] overflow-hidden">
            <img src="/news2.svg" alt="Gallery 2" className="w-full h-full object-cover" />
          </div>
          
          {/* Image 3 */}
          <div className="absolute w-[245px] h-[148px] top-[452px] left-[268px] rounded-[8px] overflow-hidden">
            <img src="/news3.svg" alt="Gallery 3" className="w-full h-full object-cover" />
          </div>
          
          {/* Image 4 */}
          <div className="absolute w-[245px] h-[141px] top-[160px] left-[537px] rounded-[8px] overflow-hidden">
            <img src="/news4.svg" alt="Gallery 4" className="w-full h-full object-cover" />
          </div>
          
          {/* Image 5 */}
          <div className="absolute w-[245px] h-[275px] top-[325px] left-[537px]   rounded-[8px] overflow-hidden">
            <img src="/news5.svg" alt="Gallery 5" className="w-full h-full object-cover" />
          </div>
          
          {/* Image 6 */}
          <div className="absolute w-[245px] h-[350px] top-[80px] left-[806px]   rounded-[8px] overflow-hidden">
            <img src="/news6.svg" alt="Gallery 6" className="w-full h-full object-cover" />
          </div>
          
          {/* Image 7 */}
          <div className="absolute w-[245px] h-[146px] top-[454px] left-[806px]   rounded-[8px] overflow-hidden">
            <img src="/news7.svg" alt="Gallery 7" className="w-full h-full object-cover" />
          </div>
          
          {/* Image 8 */}
          <div className="absolute w-[245px] h-[178px] top-[0px] left-[1075px]   rounded-[8px] overflow-hidden">
            <img src="/news8.svg" alt="Gallery 8" className="w-full h-full object-cover" />
          </div>
          
          {/* Image 9 */}
          <div className="absolute w-[245px] h-[398px] top-[202px] left-[1075px]  rounded-[8px] overflow-hidden">
            <img src="/news9.svg" alt="Gallery 9" className="w-full h-full object-cover" />
          </div>
          
        </div>
      </section>

      {/* 7. COMMITTEE MEMBERS (Exact Card Layout) */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#04330B] mb-4 font-['Familjen_Grotesk']">
              Meet Our Committee Members
            </h2>
            <p className="text-[#587E67] text-sm md:text-base font-medium">
              Dedicated leaders working together to guide our vision for a sustainable future.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { 
                name: "Dr. Sudhanshu", 
                role: "President", 
                img: "/leaderimage.svg",
                showSocials: true 
              },
              { 
                name: "Bhanwar Lal Nayak", 
                role: "Vice President", 
                img: "/Bhanwar.png" 
              },
              { 
                name: "Naseem Ansari", 
                role: "Vice President", 
                img: "/nassem.png" 
              },
              { 
                name: "Adv. Kapil", 
                role: "Gen. Secretary", 
                img: "/kapil.png" 
              },
              { 
                name: "Er. Gaurav", 
                role: "Secretary", 
                img: "/Gaurav.png" 
              },
              { 
                name: "Dr. Tanmay", 
                role: "Gen. Secretary", 
                img: "/Tanmay.png" 
              },
              { 
                name: "Satish Nagpal", 
                role: "Pradesh Adhyaksh Rajasthan", 
                img: "/satish.png" 
              },
              { 
                name: "Dr. Hari Singh Chauhan", 
                role: "Vice President", 
                img: "/Hari.png" 
              },
            ].map((member, idx) => (
              /* CARD CONTAINER: 312px Width, 322px Height, 1px Border, 8px Radius, 20px Padding */
              <div 
                key={idx} 
                className="w-[312px] h-[322px] bg-white border border-[#E5E7EB] rounded-[8px] p-[20px] flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                
                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-[#04330B] font-bold text-[20px] leading-tight font-['Familjen_Grotesk'] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#587E67] text-[14px] font-medium">
                    {member.role}
                  </p>
                </div>

                {/* IMAGE CONTAINER: 272px Width, 226px Height, 8px Radius */}
                <div className="w-[272px] h-[226px] relative rounded-[8px] overflow-hidden bg-gray-100">
                  
                  {/* The Image */}
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Gradient Overlay: Linear Gradient as requested */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)' }}
                  ></div>

                  {/* Social Icons (Only for first card as per reference, or conditional) */}
                  {member.showSocials && (
                    <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                      <button className="w-7 h-7 bg-white rounded-[4px] flex items-center justify-center text-[#04330B] hover:bg-green-50">
                        <Facebook size={14} />
                      </button>
                      <button className="w-7 h-7 bg-white rounded-[4px] flex items-center justify-center text-[#04330B] hover:bg-green-50">
                        <Instagram size={14} />
                      </button>
                      <button className="w-7 h-7 bg-white rounded-[4px] flex items-center justify-center text-[#04330B] hover:bg-green-50">
                        <X size={14} />
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-2.5 border border-[#D1D5DB] rounded-[8px] bg-white text-[#374151] text-sm font-semibold hover:border-[#04330B] hover:text-[#04330B] transition-colors">
              View More
            </button>
          </div>

        </div>
      </section>

      

      {/* 8. FOOTER */}
      <footer className="text-white py-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-6">
            <div className="flex flex-col items-start leading-none">
            <img src="/PGPlogo.svg"/>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <Linkedin size={18} className="text-green-900 cursor-pointer"/>
                <Facebook size={18} className="text-green-900 cursor-pointer"/>
                <Instagram size={18} className="text-green-900 cursor-pointer"/>
                <X size={18} className="text-green-900 cursor-pointer"/>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-gray-900">Useful Links</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>Home</li>
              <li>About</li>
              <li>Constitution</li>
              <li>Join Us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-gray-900">Additional Links</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>Audit Report and Information About Donation</li>
              <li>ECI Disclosure</li>
              <li>Declaration about criminal antecedents...</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-gray-900">Contact Us</h4>
            <div className="space-y-4 text-xs text-gray-600">
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-green-800 shrink-0" />
                <p>Ham Badlenge Bhawan, 02 Mission Compound, Ajmer Puliya, Jaipur, Rajasthan</p>
              </div>
              <div className="flex gap-3 items-start">
                <Phone size={16} className="text-green-800 shrink-0" />
                <div><p>9521627701</p><p>9950008786</p></div>
              </div>
              <div className="flex gap-3 items-start">
                <Mail size={16} className="text-green-800 shrink-0" />
                <p>joinus@peoplesgreen.org</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}