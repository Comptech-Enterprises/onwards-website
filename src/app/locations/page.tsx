"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";
import StrategicLocationsMap from "@/components/StrategicLocationsMap";

interface HubDetail {
  id: string;
  name: string;
  city: "Delhi" | "Noida" | "Gurugram";
  tag: string;
  address: string;
  seats: string;
  transit: string;
  metroLine: string;
  highlight: string;
  features: string[];
  img: string;
}

const allHubs: HubDetail[] = [
  // ━━━ DELHI HUBS ━━━
  {
    id: "cp",
    name: "Connaught Place",
    city: "Delhi",
    tag: "CBD Landmark",
    address: "Outer Circle & Barakhamba Road, Connaught Place, New Delhi",
    seats: "550+ Desks",
    transit: "2 min walk to Rajiv Chowk Metro",
    metroLine: "Blue & Yellow Lines",
    highlight: "Enterprise Floors, Executive Boardrooms & Private Suites",
    features: ["Valet Parking", "24/7 Access", "Executive Boardrooms", "Cafeteria Lounge"],
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "nehru-place",
    name: "Nehru Place",
    city: "Delhi",
    tag: "Financial District",
    address: "International Trade Tower, Nehru Place, South Delhi",
    seats: "380+ Desks",
    transit: "1 min to Nehru Place Metro Station",
    metroLine: "Violet & Magenta Lines",
    highlight: "High-Speed Tech Labs & Dedicated Cabins",
    features: ["High-Speed Fiber", "Soundproof Booths", "Event Arena", "Concierge"],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "saket",
    name: "Saket Business District",
    city: "Delhi",
    tag: "South Delhi Core",
    address: "District Centre Saket, adjacent to Select Citywalk, New Delhi",
    seats: "320+ Desks",
    transit: "Walking distance to Malviya Nagar & Saket Metro",
    metroLine: "Yellow Line",
    highlight: "Executive Suites, Creative Studios & Premium Lounges",
    features: ["Retail Vicinity", "Wellness Room", "Ergonomic Chairs", "Meeting Credits"],
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "okhla",
    name: "Okhla Phase 2",
    city: "Delhi",
    tag: "Industrial & Innovation Hub",
    address: "Okhla Industrial Area Phase II, South Delhi",
    seats: "450+ Desks",
    transit: "3 min to Harkesh Nagar Okhla Metro",
    metroLine: "Violet Line",
    highlight: "Scalable Enterprise Campuses & Turnkey Layouts",
    features: ["Large Team Suites", "Loading Bay", "High-Power Backup", "Gaming Zone"],
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "mohan-cooperative",
    name: "Mohan Cooperative",
    city: "Delhi",
    tag: "Mathura Road Corridor",
    address: "Mohan Cooperative Industrial Estate, Mathura Road, New Delhi",
    seats: "400+ Desks",
    transit: "Direct Access from Mohan Estate Metro",
    metroLine: "Violet Line",
    highlight: "Grand Atrium Offices & Logistics-Connected Suites",
    features: ["National Highway Access", "Ample Parking", "Dedicated Server Room", "Terrace Garden"],
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80",
  },

  // ━━━ NOIDA HUBS ━━━
  {
    id: "noida-62",
    name: "Noida Sector 62",
    city: "Noida",
    tag: "IT & Tech Park",
    address: "Sector 62 Institutional Area, Noida",
    seats: "600+ Desks",
    transit: "Sector 62 Metro Station & NH-24 / Delhi-Meerut Expressway",
    metroLine: "Blue Line",
    highlight: "Unicorn Campuses, Collaborative Labs & Training Suites",
    features: ["Auditorium Access", "Cafeteria Food Court", "24/7 Security", "EV Chargers"],
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "noida-16",
    name: "Noida Sector 16",
    city: "Noida",
    tag: "Corporate Tower",
    address: "Sector 16 Corporate Hub, Direct DND Link, Noida",
    seats: "420+ Desks",
    transit: "1 min to Sector 16 Metro Station & DND Flyway",
    metroLine: "Blue Line",
    highlight: "High-Rise Glass Offices Overlooking Delhi-Noida Skyline",
    features: ["DND Highway Proximity", "Executive Lounge", "4K Video Walls", "Priority Parking"],
    img: "https://images.unsplash.com/photo-1380769/pexels-photo-380769.jpeg?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "noida-126",
    name: "Noida Sector 126",
    city: "Noida",
    tag: "Expressway Tech Corridor",
    address: "Noida-Greater Noida Expressway, Sector 126, Noida",
    seats: "480+ Desks",
    transit: "Direct Expressway Ramp & Okhla Bird Sanctuary Metro",
    metroLine: "Magenta Line",
    highlight: "Custom-Fitted MNC Headquarters & High-Growth Pods",
    features: ["Green Certified", "Multi-Cuisine Cafe", "Dual High-Speed ISP", "Podcast Studio"],
    img: "https://images.unsplash.com/photo-1181396/pexels-photo-1181396.jpeg?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "noida-132",
    name: "Noida Sector 132",
    city: "Noida",
    tag: "Enterprise Expressway",
    address: "Sector 132 Expressway Commercial Hub, Noida",
    seats: "520+ Desks",
    transit: "Noida Expressway Arterial & Sector 137 Metro",
    metroLine: "Aqua Line",
    highlight: "Sprawling Enterprise Floors with Bespoke Branding",
    features: ["Dedicated Entrance", "Private Breakout Zones", "Biometric Turnstiles", "Creche Facility"],
    img: "https://images.unsplash.com/photo-1181534/pexels-photo-1181534.jpeg?auto=format&fit=crop&w=1000&q=80",
  },

  // ━━━ GURUGRAM HUBS ━━━
  {
    id: "cyber-city",
    name: "DLF Cyber City",
    city: "Gurugram",
    tag: "Millennium City Core",
    address: "DLF CyberHub & Cyber City Phase II, Gurugram",
    seats: "700+ Desks",
    transit: "Direct Rapid Metro Station & NH-48 Access",
    metroLine: "Rapid Metro & Yellow Line",
    highlight: "Prestige Corporate Suites for Global Tech Giants",
    features: ["Direct CyberHub Skywalk", "Premium Reception", "24/7 Power Backup", "Barista Coffee Bar"],
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "golf-course-rd",
    name: "Golf Course Road",
    city: "Gurugram",
    tag: "Ultra-Luxury Corridor",
    address: "Golf Course Road, Sector 54, Gurugram",
    seats: "450+ Desks",
    transit: "Sector 54 Rapid Metro Station",
    metroLine: "Rapid Metro",
    highlight: "Five-Star Executive Suites for Partners & C-Suite Leaders",
    features: ["Private Terrace", "Concierge Butler Service", "Acoustic Phone Booths", "Valet"],
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "sohna-road",
    name: "Sohna Road",
    city: "Gurugram",
    tag: "Growth Corridor",
    address: "Subhash Chowk, Sohna Road, Gurugram",
    seats: "380+ Desks",
    transit: "Subhash Chowk Junction & Direct Elevated Corridor",
    metroLine: "Huda City Centre Connection",
    highlight: "Flexible Team Suites with Collaborative Open Commons",
    features: ["Ample Open Parking", "Recreation Area", "Flexible Lease Terms", "High-Speed WiFi"],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "udyog-vihar",
    name: "Udyog Vihar",
    city: "Gurugram",
    tag: "Strategic Arterial Hub",
    address: "Udyog Vihar Phase IV, Adjacent to Cyber City & NH-48, Gurugram",
    seats: "500+ Desks",
    transit: "5 min to IndusInd Bank Cyber City Metro & NH-48",
    metroLine: "Rapid Metro",
    highlight: "Independent Enterprise Buildings & Tailored Layouts",
    features: ["Direct Airport Link (IGI 15 min)", "Dedicated Server Labs", "Custom Signage", "Cafeteria"],
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
  },
];

function LocationsContent() {
  const searchParams = useSearchParams();
  const [selectedCity, setSelectedCity] = useState<"All" | "Delhi" | "Noida" | "Gurugram">("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam) {
      const normalized = cityParam.toLowerCase();
      if (normalized === "delhi") setSelectedCity("Delhi");
      else if (normalized === "noida") setSelectedCity("Noida");
      else if (normalized === "gurugram" || normalized === "gurgaon") setSelectedCity("Gurugram");
    }
  }, [searchParams]);

  const filteredHubs = allHubs.filter((hub) => {
    const matchesCity = selectedCity === "All" || hub.city === selectedCity;
    const matchesSearch =
      hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.transit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <>
      <Header />

      {/* ━━━ HERO SECTION (FULL BLEED MERGED WITH HEADER) ━━━ */}
      <section className="relative pt-36 sm:pt-40 pb-16 sm:pb-20 lg:pb-24 bg-[#16171a] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#16171a]/80 via-[#16171a]/95 to-[#16171a]" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#d4622b] text-xs font-semibold uppercase tracking-widest mb-6"
            >
              Strategic NCR Network
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight"
            >
              Premium Workspaces Across Delhi, Noida &amp; Gurugram
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Explore 15+ premier centres in Delhi NCR&apos;s most sought-after business districts. Designed with unmatched transit connectivity and enterprise hospitality.
            </motion.p>

            {/* City Selector Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {(["All", "Delhi", "Noida", "Gurugram"] as const).map((c) => {
                const isSelected = selectedCity === c;
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedCity(c)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isSelected
                        ? "bg-[#d4622b] text-white shadow-[0_4px_20px_rgba(212,98,43,0.35)] scale-105"
                        : "bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 border border-white/15"
                    }`}
                  >
                    {c === "All" ? "All Locations (15+)" : `${c} Centres`}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e]">
          {/* ━━━ FILTER & SEARCH BAR ━━━ */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search by area, metro, landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-[#faf8f5] text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b] focus:ring-2 focus:ring-[#d4622b]/20 transition-all"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              Showing <span className="font-bold text-[#1a1a2e]">{filteredHubs.length}</span> centres matching your filter
            </div>
          </div>
        </section>

        {/* ━━━ LOCATION HUBS GRID ━━━ */}
        <section className="py-16 lg:py-20 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {filteredHubs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 max-w-xl mx-auto p-8">
                <p className="text-lg font-bold text-[#1a1a2e]">No locations found</p>
                <p className="text-sm text-gray-500 mt-2">Try clearing your search query or selecting &quot;All Locations&quot;.</p>
                <button
                  onClick={() => {
                    setSelectedCity("All");
                    setSearchQuery("");
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#d4622b] text-white text-sm font-semibold hover:bg-[#b8501f]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHubs.map((hub, idx) => (
                  <motion.div
                    key={hub.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:border-[#d4622b]/60 hover:shadow-[0_16px_40px_-15px_rgba(212,98,43,0.2)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        <Image
                          src={hub.img}
                          alt={hub.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#1a1a2e] backdrop-blur-md shadow-sm">
                            {hub.tag} &bull; {hub.city}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-xl font-bold leading-snug drop-shadow-sm">
                            {hub.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6">
                        <div className="flex items-start gap-2 text-xs text-gray-500 mb-3">
                          <svg className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="line-clamp-2">{hub.address}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100 mb-4">
                          <svg className="w-4 h-4 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{hub.transit}</span>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed mb-4">
                          {hub.highlight}
                        </p>

                        {/* Feature Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                          {hub.features.map((f, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md"
                            >
                              &bull; {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom CTA */}
                    <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Capacity: <span className="font-bold text-[#1a1a2e]">{hub.seats}</span>
                      </div>
                      <MagneticButton
                        href="/#contact"
                        className="bg-[#d4622b] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#b8501f] transition-all shadow-sm"
                      >
                        Book a Tour &rarr;
                      </MagneticButton>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ━━━ STRATEGIC LOCATIONS NEURAL MAP SECTION ━━━ */}
        <section className="py-20 lg:py-28 bg-[#faf8f5] text-[#1a1a2e] relative overflow-hidden border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  Connected Arteries
                </span>
              </Reveal>
              <AnimatedHeading
                text="Interactive NCR Strategic Map"
                highlight="Strategic Map"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mt-2"
              />
              <Reveal delay={0.1}>
                <p className="mt-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                  Click on any interactive node to inspect connectivity and instant transit details.
                </p>
              </Reveal>
            </div>

            <StrategicLocationsMap />
          </div>
        </section>

        {/* ━━━ BOTTOM CTA ━━━ */}
        <section className="py-20 bg-white border-t border-gray-200 text-center">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
                Can&apos;t Find Your Preferred Location?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                We build bespoke, turnkey enterprise office floors tailored to your exact location preferences across Delhi NCR.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <MagneticButton
                href="/#contact"
                className="bg-[#d4622b] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b8501f] transition-all shadow-lg"
              >
                Inquire for Custom Built
              </MagneticButton>
              <a
                href="tel:9910668152"
                className="px-8 py-4 rounded-full font-semibold border border-gray-300 text-gray-700 hover:border-[#d4622b] hover:text-[#d4622b] bg-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Call: +91 9910668152
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[#faf8f5] text-gray-500 pt-16 pb-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Onward Workspaces. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/about" className="hover:text-[#d4622b] transition-colors">About</Link>
              <Link href="/locations" className="hover:text-[#d4622b] transition-colors">Locations</Link>
              <Link href="/team" className="hover:text-[#d4622b] transition-colors">Team</Link>
              <Link href="/blog" className="hover:text-[#d4622b] transition-colors">Blog</Link>
              <Link href="/#contact" className="hover:text-[#d4622b] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function LocationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5]" />}>
      <LocationsContent />
    </Suspense>
  );
}
