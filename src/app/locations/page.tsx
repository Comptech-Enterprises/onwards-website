"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/* ━━━ LOCATION NEAR YOU (REAL ONWARD WORKSPACES DELHI CONTENT) ━━━ */
const delhiAreas = [
  {
    name: "Okhla Phase 2",
    desc: "A bustling hub of creativity and innovation, blending industrial vibrancy with modern design.",
  },
  {
    name: "Mohan Estate",
    desc: "A serene retreat amidst lush greenery, where the balance between focus and relaxation is seamless.",
  },
  {
    name: "Okhla Phase 3",
    desc: "An innovation-centric locality home to IT companies, creative agencies, and research institutions.",
  },
  {
    name: "Connaught Place",
    desc: "State-of-the-art designs with easy metro accessibility, built for teams of all sizes.",
  },
];

/* ━━━ AMENITIES (REAL ONWARD WORKSPACES CONTENT) ━━━ */
const amenities = [
  {
    title: "Fully Equipped Meeting Room",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
      </svg>
    ),
  },
  {
    title: "Flexibility",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "State-of-the-art Infrastructure",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Small Contracts",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "IT Services & Support",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Functional Layout",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
];

/* ━━━ FAQ (REAL ONWARD WORKSPACES CONTENT) ━━━ */
const faqs = [
  {
    q: "What sets Onward Workspaces apart as a coworking space in Delhi NCR?",
    a: "Onward Workspaces isn't just a space; it's your dynamic hub for innovation in the heart of Delhi NCR. Our coworking ecosystem blends style and substance, ensuring every workday is a step toward success.",
  },
  {
    q: "What amenities can I expect at Onward Workspaces?",
    a: "From high-tech conference rooms to stylish lounges, our coworking spaces are equipped with modern amenities. Enjoy seamless connectivity, ergonomic furniture, and a vibrant community for networking.",
  },
  {
    q: "How does Onward Workspaces contribute to a collaborative work culture?",
    a: "Collaboration is in our DNA. Engage in networking events, workshops, and connect with a diverse community of professionals. Onward Workspaces is not just a space; it's a collaborative journey.",
  },
  {
    q: "Are there any special promotions for coworking space?",
    a: "We frequently offer special deals to make your Onward Workspaces experience even more rewarding. Connect with us to know more — your success deserves the best, at the best value.",
  },
];

const delhiHubs = allHubs.filter((hub) => hub.city === "Delhi");

function LocationsContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20">
        {/* ━━━ PAGE BANNER (BREADCRUMB + TITLE) ━━━ */}
        <section className="bg-white border-b border-gray-200/80 py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <li>
                  <Link href="/" className="hover:text-[#d4622b] transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/locations" className="hover:text-[#d4622b] transition-colors">
                    Locations
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-800 font-semibold">Delhi</li>
              </ol>
            </nav>

            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
              Managed Office Space
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight">
              Premium Coworking Space in Delhi
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
              Discover the best coworking spaces in Delhi with state-of-the-art design and easy metro accessibility &mdash; built and designed for teams of every size.
            </p>
          </div>
        </section>

        {/* ━━━ LOCATION NEAR YOU (DELHI AREAS) ━━━ */}
        <section className="py-16 lg:py-20 bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  Location Near You
                </span>
              </Reveal>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-black">
                Delhi Areas We Serve
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {delhiAreas.map((area, i) => (
                <Reveal key={area.name} delay={i * 0.06}>
                  <div className="h-full bg-[#faf8f5] rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-base font-bold text-black mb-2">
                      {area.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {area.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ CENTRES IN DELHI (CONTENT-LED, MINIMAL IMAGERY) ━━━ */}
        <section className="py-16 lg:py-20 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  Delhi &middot; {delhiHubs.length} Centres
                </span>
              </Reveal>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-black">
                Centres in Delhi
              </h2>
            </div>

            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {delhiHubs.map((hub, idx) => (
                <motion.div
                  key={hub.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-8 group"
                >
                  <div className="lg:col-span-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4622b]">
                      {hub.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-black mt-1 group-hover:text-[#d4622b] transition-colors">
                      {hub.name}
                    </h3>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {hub.address}. {hub.highlight}. {hub.transit}.
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                      {hub.features.map((f) => (
                        <span key={f} className="text-xs text-gray-500">
                          &bull; {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2">
                    <div className="text-left lg:text-right">
                      <div className="text-2xl font-light text-black leading-none">
                        {hub.seats.replace(/\D/g, "")}
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mt-1">
                        Capacity
                      </div>
                    </div>
                    <MagneticButton
                      href="/#contact"
                      className="text-sm font-semibold text-[#d4622b] hover:text-black transition-colors whitespace-nowrap"
                    >
                      View Centre &rarr;
                    </MagneticButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ AMENITIES (REAL ONWARD WORKSPACES CONTENT) ━━━ */}
        <section className="py-20 lg:py-24 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  What&apos;s Included
                </span>
              </Reveal>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
                Amenities
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              {amenities.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.06}>
                  <div className="flex flex-col items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-gray-200 flex items-center justify-center">
                      {a.icon}
                    </div>
                    <p className="text-sm font-semibold text-black leading-snug">
                      {a.title}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
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

        {/* ━━━ FAQ (REAL ONWARD WORKSPACES CONTENT) ━━━ */}
        <section className="py-20 lg:py-24 bg-white border-t border-gray-200/80">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  Got Questions?
                </span>
              </Reveal>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-gray-600 text-base sm:text-lg">
                Everything you need to know about us.
              </p>
            </div>

            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-lg sm:text-xl font-bold text-black">
                        {f.q}
                      </span>
                      <span className="shrink-0 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-black">
                        {isOpen ? (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 text-base leading-relaxed pb-6">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
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
  return <LocationsContent />;
}
