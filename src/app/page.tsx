"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Building2,
  Users,
  Award,
  Globe2,
  Phone,
  Mail,
  MapPin,
  Coffee,
  Wifi,
  ShieldCheck,
  Headphones,
  Zap,
  Sparkles,
  ChevronDown,
  X,
  Star,
  Clock,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   HUMAN-CRAFTED BRAND DATA & AUTHENTIC CONTENT
   ═══════════════════════════════════════════════════════════════ */

const workspaceSpaces = [
  {
    id: "suites",
    title: "Private Team Suites",
    forWhom: "Best for teams of 4 to 40 people",
    description:
      "Move in tomorrow, lock your door, and focus on your work. Fully furnished with ergonomic seating, private storage, and dedicated access control.",
    icon: Users,
    tag: "Move in Same Day",
    highlights: [
      "Acoustic sound-insulated glass partition",
      "Ergonomic mesh chairs & private storage pedestals",
      "Dedicated high-speed Wi-Fi network with VLAN",
      "Complimentary meeting room credits included",
    ],
  },
  {
    id: "managed",
    title: "Custom Managed Floors",
    forWhom: "Best for growing companies (50 to 500+ desks)",
    description:
      "Your own branded office without the headaches of commercial leases, interior designers, or facility management. Delivered turnkey in 3 to 4 weeks.",
    icon: Building2,
    tag: "Turnkey Architecture",
    highlights: [
      "Custom branded reception and executive boardrooms",
      "Dedicated IT server hall with dual ISP redundancy",
      "Private manager cabins, pantry, and breakout nooks",
      "Full daily housekeeping, security, and maintenance",
    ],
  },
  {
    id: "cabins",
    title: "Executive Director Cabins",
    forWhom: "Best for founders, directors & senior partners",
    description:
      "Quiet, dignified acoustic suites designed for leadership strategy, client negotiations, and deep confidential work.",
    icon: Award,
    tag: "Private Leadership",
    highlights: [
      "Premium Italian leather executive seating",
      "Private discussion and meeting table",
      "Double-glazed acoustic isolation",
      "Priority guest concierge and beverage service",
    ],
  },
  {
    id: "virtual",
    title: "Virtual Office & GST Registration",
    forWhom: "Best for remote teams & branch offices",
    description:
      "A prestigious Delhi NCR commercial business address for company incorporation, GST filing, bank verification, and courier handling.",
    icon: Globe2,
    tag: "100% Compliant",
    highlights: [
      "Complete documentation: Registered Rent Agreement & NOC",
      "Compliant with GST Department & ROC requirements",
      "Courier and official correspondence receiving & scanning",
      "Monthly complimentary day passes to work from any centre",
    ],
  },
];

const locationsByCity = {
  delhi: {
    name: "Delhi",
    blurb: "Prime business hubs right next to Violet, Magenta, and Blue line metro stations.",
    hubs: [
      {
        name: "Okhla Phase II (Flagship HQ)",
        metro: "2 min walk from Harkesh Nagar Okhla Metro",
        address: "Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020",
        size: "45,000 sq.ft campus",
        perks: ["Flagship Lounge", "Café Terrace", "Ample Car Parking"],
      },
      {
        name: "Okhla Phase III",
        metro: "3 min from NSIC Okhla Metro",
        address: "B-216, Okhla Phase III, New Delhi, 110020",
        size: "38,000 sq.ft",
        perks: ["Tech Corridor", "Soundproof Cabins", "Quiet Pods"],
      },
      {
        name: "Mohan Cooperative",
        metro: "1 min walk from Mohan Estate Metro",
        address: "Mathura Road, Mohan Cooperative Industrial Estate, New Delhi",
        size: "60,000 sq.ft",
        perks: ["Large Floorplates", "Event Auditorium", "Green Terraces"],
      },
      {
        name: "Connaught Place",
        metro: "Rajiv Chowk Metro Interchange",
        address: "Outer Circle, Connaught Place, Central Delhi",
        size: "25,000 sq.ft",
        perks: ["Central CBD Address", "Executive Cabins", "Walk to Cafes"],
      },
    ],
  },
  gurgaon: {
    name: "Gurgaon",
    blurb: "Positioned right next to DLF CyberHub and major expressways for effortless client visits.",
    hubs: [
      {
        name: "DLF Cyber City",
        metro: "2 min from IndusInd Cyber City Rapid Metro",
        address: "DLF Cyber City, Sector 24, Gurugram, Haryana",
        size: "55,000 sq.ft",
        perks: ["CyberHub Adjacent", "Sky Lounge", "Dedicated Leased Line"],
      },
      {
        name: "Udyog Vihar Phase IV",
        metro: "5 min from Shankar Chowk",
        address: "Plot 304, Udyog Vihar Phase-IV, Gurugram",
        size: "40,000 sq.ft",
        perks: ["Startup Cluster", "24/7 Access", "Conference Center"],
      },
      {
        name: "Golf Course Extension Road",
        metro: "Sector 55-56 Rapid Metro",
        address: "Golf Course Extension Road, Sector 65, Gurugram",
        size: "32,000 sq.ft",
        perks: ["Premium Business Corridor", "EV Charging", "Wellness Deck"],
      },
    ],
  },
  noida: {
    name: "Noida",
    blurb: "Modern institutional campuses across prime expressway and metro belts.",
    hubs: [
      {
        name: "Sector 62 IT Hub",
        metro: "3 min from Electronic City Metro",
        address: "C-Block, Institutional Area, Sector 62, Noida",
        size: "50,000 sq.ft",
        perks: ["IT District", "Spacious Cafeteria", "Enterprise Floorplates"],
      },
      {
        name: "Sector 16 Metro Belt",
        metro: "1 min walk from Sector 16 Metro",
        address: "Film City Marg, Sector 16, Noida",
        size: "30,000 sq.ft",
        perks: ["Film City Belt", "Instant Move-in", "Direct Metro Access"],
      },
      {
        name: "Sector 132 Expressway",
        metro: "Noida-Greater Noida Expressway",
        address: "Expressway Corporate Park, Sector 132, Noida",
        size: "65,000 sq.ft",
        perks: ["Mega Campus", "Green Surroundings", "Executive Boardrooms"],
      },
    ],
  },
};

const everydayInclusions = [
  {
    icon: Wifi,
    title: "1Gbps Multi-ISP Internet",
    desc: "Dual active fiber lines with automatic failover so you never drop a video call or demo.",
  },
  {
    icon: Coffee,
    title: "Real Barista Coffee & Teas",
    desc: "Freshly roasted artisanal coffees and organic teas, always available and completely unlimited.",
  },
  {
    icon: Headphones,
    title: "Soundproof Phone Pods",
    desc: "Private acoustic booths for taking important 1-on-1 calls, investor pitches, or confidential chats.",
  },
  {
    icon: Zap,
    title: "100% Power Backup",
    desc: "Dual generator sets and industrial online UPS systems with zero-second cutover lag.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Biometric Access",
    desc: "Secure, touchless biometric entry and round-the-clock on-site security teams.",
  },
  {
    icon: Sparkles,
    title: "Daily Housekeeping & Care",
    desc: "Spotlessly cleaned workstations, clean washrooms, and community managers ready to help you.",
  },
];

const customerStories = [
  {
    quote:
      "Onward has been a genuine partner in our growth. The offices are clean, the internet never goes down, and our team loves coming into work here every morning.",
    author: "Varun Puri",
    role: "Founder",
    company: "Dangal Games",
  },
  {
    quote:
      "The metro connectivity and professional environment made moving our regional operations to Onward an easy decision. Everything just works.",
    author: "Abhinay Nagwekar",
    role: "Procurement Lead",
    company: "Aramex",
  },
  {
    quote:
      "When clients visit us at Onward, the impression is always top-notch. The hospitality, the meeting rooms, and the staff make running our business effortless.",
    author: "Prasenjit Das Gupta",
    role: "Head Commercial",
    company: "Thermax",
  },
];

const simpleFaqs = [
  {
    q: "How does the 2-Day Free Trial work?",
    a: "It's simple: pick any Onward location in Delhi, Gurgaon, or Noida, and come work here with your core team for 2 full days. You will get fast Wi-Fi, desk space, barista coffee, and meeting room access with zero commitment or payment info required.",
  },
  {
    q: "How fast can we move in?",
    a: "Private Suites and Executive Cabins are ready for move-in today or within 24 hours. For larger custom-built managed offices (50 to 500+ desks), we tailor and deliver the entire space in 3 to 4 weeks.",
  },
  {
    q: "What documentation do you provide for GST and company registration?",
    a: "We provide complete, legally certified paperwork including a registered Rent Agreement, NOC from the building owner, and the latest commercial Electricity Bill. These are 100% compliant with GST, ROC, and MCA bank verification.",
  },
  {
    q: "Are there any hidden maintenance or utility charges?",
    a: "No. Everything is consolidated into a single transparent monthly membership invoice: furniture, high-speed internet, electricity, air conditioning, daily housekeeping, security, and unlimited beverages.",
  },
  {
    q: "Can we book meeting rooms across different locations?",
    a: "Yes. All members receive monthly meeting room credits that can be used across any of our 15+ centres in Delhi, Gurgaon, and Noida whenever you need to host a meeting in another part of town.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   GENTLE SCROLL REVEAL HELPER
   ═══════════════════════════════════════════════════════════════ */

function SoftReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HUMAN WEBSITE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<"delhi" | "gurgaon" | "noida">("delhi");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  // Booking Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Okhla Phase II (Flagship HQ)");
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBooking = (title?: string, trial = false) => {
    if (title) setModalTitle(title);
    setIsFreeTrial(trial);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a2e] font-sans antialiased selection:bg-[#d4622b] selection:text-white">
      
      {/* ━━━ CLEAN HUMAN HEADER ━━━ */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#ede8e1] py-3 shadow-2xs"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <img
              src="/onward-logo.png"
              alt="Onward Workspaces"
              className="w-8 h-8 object-contain"
            />
            <div className="leading-none">
              <span className="text-lg font-bold tracking-tight text-[#1a1a2e]">Onward</span>
              <span className="block text-[8px] font-semibold tracking-widest text-[#d4622b] uppercase mt-0.5">
                Workspaces
              </span>
            </div>
          </a>

          {/* Simple Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#spaces" className="hover:text-[#d4622b] transition-colors">
              Our Spaces
            </a>
            <a href="#locations" className="hover:text-[#d4622b] transition-colors">
              Locations
            </a>
            <a href="#inclusions" className="hover:text-[#d4622b] transition-colors">
              What&apos;s Included
            </a>
            <a href="#stories" className="hover:text-[#d4622b] transition-colors">
              Community
            </a>
            <a href="#faq" className="hover:text-[#d4622b] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Contact & CTA */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919910668152"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-[#ede8e1] px-3.5 py-2 rounded-full hover:border-[#d4622b]/40 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4622b]" />
              <span>+91 9910668152</span>
            </a>

            <button
              onClick={() => openBooking(undefined, true)}
              className="inline-flex items-center gap-1.5 bg-[#d4622b] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#b8501f] transition-colors shadow-xs"
            >
              <span>Try 2 Days Free</span>
            </button>
          </div>

        </div>
      </header>

      {/* ━━━ HUMAN HERO SECTION ━━━ */}
      <section id="home" className="pt-32 sm:pt-40 pb-20 border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="max-w-3xl space-y-6">
            
            <SoftReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#ede8e1] text-xs font-medium text-gray-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#d4622b]" />
                <span>Delhi • Gurgaon • Noida</span>
              </div>
            </SoftReveal>

            <SoftReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl font-bold text-[#1a1a2e] tracking-tight leading-[1.15]">
                Workspaces where teams actually{" "}
                <span className="text-[#d4622b] underline decoration-[#d4622b]/30 decoration-wavy underline-offset-4">
                  love coming to work.
                </span>
              </h1>
            </SoftReveal>

            <SoftReveal delay={0.15}>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl font-normal">
                Quiet private team suites, custom managed floors, and meeting rooms across Delhi NCR — all hand-picked within a 2-minute walk from major metro stations. No setup headaches, no hidden charges.
              </p>
            </SoftReveal>

            {/* Direct Action Buttons */}
            <SoftReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openBooking(undefined, false)}
                  className="px-6 py-3.5 rounded-full bg-[#d4622b] text-white font-semibold text-sm hover:bg-[#b8501f] transition-all flex items-center gap-2 shadow-xs"
                >
                  <span>Schedule a Visit & Grab Coffee</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openBooking(undefined, true)}
                  className="px-5 py-3.5 rounded-full bg-white border border-[#ede8e1] text-gray-800 font-semibold text-sm hover:border-[#d4622b] transition-colors"
                >
                  <span>Claim a Free 2-Day Pass</span>
                </button>
              </div>
            </SoftReveal>

            {/* Genuine Trust Strip */}
            <SoftReveal delay={0.25}>
              <div className="pt-8 border-t border-[#ede8e1] grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-2xl font-bold text-[#1a1a2e]">15+</div>
                  <div className="text-xs text-gray-500 mt-0.5">Metro-Connected Centres</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1a1a2e]">250+</div>
                  <div className="text-xs text-gray-500 mt-0.5">Startups & MNC Teams</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1a1a2e]">1M+</div>
                  <div className="text-xs text-gray-500 mt-0.5">Sq. Ft. Managed Space</div>
                </div>
              </div>
            </SoftReveal>

          </div>

        </div>
      </section>

      {/* ━━━ OUR SPACES (CLEAR & PURPOSE-DRIVEN) ━━━ */}
      <section id="spaces" className="py-20 sm:py-24 bg-white border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="max-w-2xl mb-14">
            <SoftReveal>
              <span className="text-xs font-semibold text-[#d4622b] uppercase tracking-wider block mb-1">
                Our Spaces
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">
                Choose the right setup for your team.
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Whether you are a 4-person product squad or a 200-person enterprise, we have ready spaces that scale with you.
              </p>
            </SoftReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {workspaceSpaces.map((space, idx) => {
              const Icon = space.icon;
              return (
                <SoftReveal key={space.id} delay={0.08 * idx}>
                  <div className="p-7 sm:p-8 rounded-3xl bg-[#faf8f5] border border-[#ede8e1] flex flex-col justify-between h-full hover:border-[#d4622b]/40 hover:bg-[#faf8f5]/80 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-white border border-[#ede8e1] flex items-center justify-center text-[#d4622b] shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white text-gray-600 border border-[#ede8e1]">
                          {space.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#1a1a2e]">{space.title}</h3>
                      <div className="text-xs font-semibold text-[#d4622b] mt-0.5">{space.forWhom}</div>
                      
                      <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                        {space.description}
                      </p>

                      <div className="mt-5 pt-4 border-t border-gray-200/70 space-y-2">
                        {space.highlights.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-xs text-gray-700">
                            <Check className="w-3.5 h-3.5 text-[#d4622b] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 pt-4 border-t border-gray-200/70 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">Available across all hubs</span>
                      <button
                        onClick={() => openBooking(space.title)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4622b] hover:text-[#b8501f]"
                      >
                        <span>Inquire About Space</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </SoftReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ LOCATIONS (DESIGNED FOR PAINLESS COMMUTES) ━━━ */}
      <section id="locations" className="py-20 sm:py-24 bg-[#faf8f5] border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <SoftReveal>
                <span className="text-xs font-semibold text-[#d4622b] uppercase tracking-wider block mb-1">
                  Centres & Commutes
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">
                  Locations made for easy mornings.
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-md">
                  {locationsByCity[selectedCity].blurb}
                </p>
              </SoftReveal>
            </div>

            {/* City Tabs */}
            <div className="flex bg-white p-1 rounded-full border border-[#ede8e1] shadow-2xs self-start sm:self-auto">
              {(["delhi", "gurgaon", "noida"] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                    selectedCity === city
                      ? "bg-[#d4622b] text-white shadow-2xs"
                      : "text-gray-600 hover:text-[#1a1a2e]"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Hub Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationsByCity[selectedCity].hubs.map((hub, idx) => (
              <SoftReveal key={hub.name} delay={0.06 * idx}>
                <div className="p-6 rounded-3xl bg-white border border-[#ede8e1] flex flex-col justify-between h-full hover:border-[#d4622b]/40 hover:shadow-xs transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-xs font-bold text-[#1a1a2e]">{hub.name}</span>
                      <span className="text-[10px] font-medium text-gray-500 bg-[#faf8f5] px-2 py-0.5 rounded-md border border-gray-200">
                        {hub.size}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#d4622b]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{hub.metro}</span>
                    </div>

                    <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                      {hub.address}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {hub.perks.map((p) => (
                        <span key={p} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#faf8f5] text-gray-600 border border-gray-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Open for Visits</span>
                    <button
                      onClick={() => openBooking(hub.name)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#d4622b] hover:text-[#b8501f]"
                    >
                      <span>Book a Tour</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </SoftReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ WHAT'S ACTUALLY INCLUDED (ZERO HASSLE) ━━━ */}
      <section id="inclusions" className="py-20 sm:py-24 bg-white border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SoftReveal>
              <span className="text-xs font-semibold text-[#d4622b] uppercase tracking-wider block mb-1">
                Everyday Inclusions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">
                Everything taken care of. Zero headaches.
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                All included in your single monthly membership invoice with zero surprise utility bills.
              </p>
            </SoftReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {everydayInclusions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <SoftReveal key={item.title} delay={0.06 * idx}>
                  <div className="p-6 sm:p-7 rounded-3xl bg-[#faf8f5] border border-[#ede8e1] flex flex-col justify-between h-full">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#ede8e1] flex items-center justify-center text-[#d4622b] mb-4 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#1a1a2e]">{item.title}</h3>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-200/60 text-[11px] font-semibold text-gray-400">
                      Standard at all 15+ centres
                    </div>
                  </div>
                </SoftReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ STORIES FROM REAL TEAMS ━━━ */}
      <section id="stories" className="py-20 bg-[#faf8f5] border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <SoftReveal>
              <span className="text-xs font-semibold text-[#d4622b] uppercase tracking-wider block mb-1">
                From Our Community
              </span>
              <h2 className="text-3xl font-bold text-[#1a1a2e] tracking-tight">
                Hear what teams say about working here.
              </h2>
            </SoftReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {customerStories.map((story, idx) => (
              <SoftReveal key={story.author} delay={0.08 * idx}>
                <div className="p-7 rounded-3xl bg-white border border-[#ede8e1] flex flex-col justify-between h-full shadow-2xs">
                  <div>
                    <div className="flex gap-1 mb-4 text-[#d4622b]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#d4622b]" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1a1a2e] text-white font-bold text-xs flex items-center justify-center">
                      {story.author[0]}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1a1a2e]">{story.author}</div>
                      <div className="text-[10px] text-gray-500">{story.role}, {story.company}</div>
                    </div>
                  </div>
                </div>
              </SoftReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ HONEST, PLAIN-ENGLISH FAQ ━━━ */}
      <section id="faq" className="py-20 sm:py-24 bg-white border-b border-[#ede8e1]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <SoftReveal>
              <span className="text-xs font-semibold text-[#d4622b] uppercase tracking-wider block mb-1">
                Common Questions
              </span>
              <h2 className="text-3xl font-bold text-[#1a1a2e] tracking-tight">
                Frequently Asked Questions
              </h2>
            </SoftReveal>
          </div>

          <div className="space-y-3">
            {simpleFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <SoftReveal key={faq.q} delay={0.05 * idx}>
                  <div className="rounded-2xl bg-[#faf8f5] border border-[#ede8e1] overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#1a1a2e] hover:text-[#d4622b] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#d4622b]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-200/60 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SoftReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ COME DROP BY / CONTACT SECTION ━━━ */}
      <section id="contact" className="py-20 sm:py-24 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <SoftReveal>
                <span className="text-xs font-semibold text-[#d4622b] uppercase tracking-wider block">
                  Drop By For A Visit
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] leading-tight">
                  Come see the space and have a coffee with us.
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We would love to show you around any of our Delhi, Gurgaon, or Noida centres. Drop your details and our team will get in touch to confirm a time that suits you.
                </p>

                <div className="space-y-3 pt-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#ede8e1]">
                    <MapPin className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Registered Flagship HQ</span>
                      Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020
                    </div>
                  </div>

                  <a
                    href="tel:+919910668152"
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Direct Phone Line</span>
                      +91 9910668152
                    </div>
                  </a>

                  <a
                    href="mailto:info@onwardworkspaces.com"
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Email Us</span>
                      info@onwardworkspaces.com
                    </div>
                  </a>
                </div>
              </SoftReveal>
            </div>

            {/* Clean Visit Form */}
            <div className="lg:col-span-7">
              <SoftReveal delay={0.15}>
                <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#ede8e1] shadow-2xs">
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">Book a Walkthrough or Free Trial</h3>
                  <p className="text-xs text-gray-500 mb-6">No credit card needed. We&apos;ll confirm your visit over phone.</p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsSubmitted(true);
                      setIsModalOpen(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Vikram Sharma"
                          className="w-full bg-[#faf8f5] border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@company.com"
                          className="w-full bg-[#faf8f5] border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9910668152"
                          className="w-full bg-[#faf8f5] border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Target Location</label>
                        <select className="w-full bg-[#faf8f5] border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]">
                          <option value="Okhla Phase II, Delhi">Okhla Phase II (Delhi Flagship)</option>
                          <option value="Okhla Phase III, Delhi">Okhla Phase III (Delhi)</option>
                          <option value="Mohan Cooperative, Delhi">Mohan Cooperative (Delhi)</option>
                          <option value="Connaught Place, Delhi">Connaught Place (Central Delhi)</option>
                          <option value="DLF Cyber City, Gurgaon">DLF Cyber City (Gurgaon)</option>
                          <option value="Udyog Vihar, Gurgaon">Udyog Vihar Phase IV (Gurgaon)</option>
                          <option value="Sector 62, Noida">Sector 62 IT Hub (Noida)</option>
                          <option value="Sector 16, Noida">Sector 16 Metro Belt (Noida)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Tell us about your team</label>
                      <textarea
                        rows={3}
                        placeholder="Team size, target move-in date, or any specific requirements..."
                        className="w-full bg-[#faf8f5] border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#d4622b] text-white font-semibold text-xs hover:bg-[#b8501f] transition-all shadow-xs"
                    >
                      Confirm Visit Request
                    </button>
                  </form>
                </div>
              </SoftReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[#1a1a2e] text-gray-400 py-16 text-xs">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/onward-logo.png" alt="Onward Logo" className="w-8 h-8" />
                <div>
                  <span className="text-lg font-bold text-white tracking-tight">Onward</span>
                  <span className="block text-[8px] text-gray-400 tracking-widest uppercase">Workspaces</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Thoughtfully crafted workspaces across Delhi NCR for teams that love getting things done.
              </p>
              <div className="mt-3 text-xs font-semibold text-[#d4622b]">
                ONWARD COWORKX PRIVATE LIMITED
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Spaces</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#spaces" className="hover:text-[#d4622b] transition-colors">Private Team Suites</a></li>
                <li><a href="#spaces" className="hover:text-[#d4622b] transition-colors">Custom Managed Floors</a></li>
                <li><a href="#spaces" className="hover:text-[#d4622b] transition-colors">Executive Cabins</a></li>
                <li><a href="#spaces" className="hover:text-[#d4622b] transition-colors">Virtual Office & GST</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Centres</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Okhla Phase II & III</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Mohan Cooperative</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Connaught Place</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">DLF Cyber City Gurgaon</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Sector 62 & 16 Noida</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Get In Touch</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020
              </p>
              <div className="space-y-1 font-semibold text-white">
                <div>+91 9910668152</div>
                <div className="text-gray-400">info@onwardworkspaces.com</div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-gray-500">
            <p>&copy; {new Date().getFullYear()} Onward Workspaces (Onward Coworkx Pvt. Ltd.). All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-[#d4622b] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#d4622b] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#d4622b] transition-colors">GST Compliance</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ━━━ TOUR / TRIAL MODAL ━━━ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ede8e1] p-7 shadow-xl overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#d4622b] uppercase tracking-wider">
                      {isFreeTrial ? "2-Day Free Trial" : "Schedule a Tour"}
                    </span>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mt-0.5">
                      {isFreeTrial ? "Claim Your 2-Day Trial Pass" : `Visit ${modalTitle}`}
                    </h3>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsSubmitted(true);
                    }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9910668152"
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Preferred Date</label>
                        <input
                          type="date"
                          required
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Time Slot</label>
                        <select className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]">
                          <option>10:00 AM - 12:00 PM</option>
                          <option>12:00 PM - 02:00 PM</option>
                          <option>02:00 PM - 04:00 PM</option>
                          <option>04:00 PM - 06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#d4622b] text-white font-bold text-xs hover:bg-[#b8501f] transition-all"
                    >
                      {isFreeTrial ? "Claim Free 2-Day Pass" : "Confirm Tour Reservation"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e]">We&apos;ve received your request!</h3>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                    Thank you. Our community team will call you shortly to confirm your visit time and give you directions.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 rounded-full bg-[#1a1a2e] text-white font-semibold text-xs mt-2"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
