"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Clock,
  CheckCircle2,
  Lock,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   PREVIOUS & HUMAN-CRAFTED BRAND DATA
   ═══════════════════════════════════════════════════════════════ */

const workspaceSpaces = [
  {
    num: "01",
    id: "suites",
    title: "Private Team Suites",
    forWhom: "Crafted for focused teams of 4 to 40",
    description:
      "Acoustically treated, lockable private suites designed to foster deep collaboration and team identity without external noise.",
    icon: Users,
    badge: "Same-Day Move In",
    image: "/spaces/private-suite.jpg",
    placeholderBg: "from-amber-900/20 to-orange-950/40",
    highlights: [
      "Double-glazed acoustic glass partitions (42dB sound reduction)",
      "Ergonomic mesh seating & private lockable pedestals",
      "Dedicated high-speed Wi-Fi with isolated private VLAN",
      "Complimentary monthly 4K boardroom & meeting credits",
    ],
  },
  {
    num: "02",
    id: "managed",
    title: "Custom Managed Floors",
    forWhom: "Bespoke headquarters for 50 to 500+ desks",
    description:
      "Your own branded commercial floorplate designed, built, and managed end-to-end. Zero upfront construction CAPEX, delivered in 3 to 4 weeks.",
    icon: Building2,
    badge: "Turnkey Architecture",
    image: "/spaces/managed-office.jpg",
    placeholderBg: "from-blue-950/30 to-indigo-950/40",
    highlights: [
      "Custom branded reception, director cabins & team pods",
      "Dedicated IT server hall with dual active multi-ISP fiber",
      "Private executive cafeteria, pantry & wellness nooks",
      "Comprehensive daily housekeeping, security & maintenance",
    ],
  },
  {
    num: "03",
    id: "cabins",
    title: "Executive Director Cabins",
    forWhom: "Private sanctuaries for founders & counsel",
    description:
      "Quiet, dignified executive offices tailored for strategic thinking, high-stakes client negotiations, and private leadership discussions.",
    icon: Award,
    badge: "Leadership Class",
    image: "/spaces/director-cabin.jpg",
    placeholderBg: "from-stone-900/30 to-amber-950/40",
    highlights: [
      "Supple Italian leather seating & private discussion table",
      "Acoustic double-glazed privacy with sound-dampened door",
      "White-glove guest concierge and premium beverage service",
      "24/7 dedicated biometric suite access",
    ],
  },
  {
    num: "04",
    id: "virtual",
    title: "Virtual Office & GST Registration",
    forWhom: "Prestigious presence for remote & hybrid firms",
    description:
      "A legally certified Grade-A Delhi NCR commercial business address for company incorporation, GST filing, and official mail handling.",
    icon: Globe2,
    badge: "100% MCA & ROC Compliant",
    image: "/spaces/virtual-office.jpg",
    placeholderBg: "from-emerald-950/30 to-teal-950/40",
    highlights: [
      "Complete documentation: Registered Rent Agreement & Landlord NOC",
      "Fully compliant with GST Department & ROC requirements",
      "Courier & parcel receiving with instant digital scan notifications",
      "Monthly complimentary day passes to work from any centre",
    ],
  },
];

const locationsByCity = {
  delhi: {
    name: "Delhi",
    blurb: "Flagship central hubs with immediate access to Violet, Magenta, and Blue line metro stations.",
    hubs: [
      {
        id: "delhi-okhla-2",
        name: "Okhla Phase II (Flagship HQ)",
        metro: "2 min walk from Harkesh Nagar Okhla Metro",
        metroLine: "Violet Line",
        lineColor: "bg-purple-600 text-white",
        address: "Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020",
        size: "45,000 sq.ft campus",
        image: "/locations/okhla-phase-2.jpg",
        perks: ["Flagship Lounge", "Café Terrace", "Ample Car Parking", "EV Charging"],
      },
      {
        id: "delhi-okhla-3",
        name: "Okhla Phase III",
        metro: "3 min from NSIC Okhla Metro",
        metroLine: "Magenta Line",
        lineColor: "bg-pink-600 text-white",
        address: "B-216, Okhla Phase III, New Delhi, 110020",
        size: "38,000 sq.ft",
        image: "/locations/okhla-phase-3.jpg",
        perks: ["Tech Corridor", "Soundproof Cabins", "Quiet Phone Pods"],
      },
      {
        id: "delhi-mohan",
        name: "Mohan Cooperative",
        metro: "1 min walk from Mohan Estate Metro",
        metroLine: "Violet Line",
        lineColor: "bg-purple-600 text-white",
        address: "Mathura Road, Mohan Cooperative Industrial Estate, New Delhi",
        size: "60,000 sq.ft",
        image: "/locations/mohan-cooperative.jpg",
        perks: ["Large Floorplates", "Event Auditorium", "Green Terraces"],
      },
      {
        id: "delhi-cp",
        name: "Connaught Place",
        metro: "Direct from Rajiv Chowk Interchange",
        metroLine: "Yellow & Blue Line",
        lineColor: "bg-amber-600 text-white",
        address: "Outer Circle, Connaught Place, Central Delhi",
        size: "25,000 sq.ft",
        image: "/locations/connaught-place.jpg",
        perks: ["Central CBD Address", "Executive Cabins", "Steps to Cafes"],
      },
    ],
  },
  gurgaon: {
    name: "Gurgaon",
    blurb: "Prime corporate corridors adjacent to DLF CyberHub and major expressways.",
    hubs: [
      {
        id: "gurgaon-cybercity",
        name: "DLF Cyber City",
        metro: "2 min from Cyber City Rapid Metro",
        metroLine: "Rapid Metro",
        lineColor: "bg-blue-600 text-white",
        address: "DLF Cyber City, Sector 24, Gurugram, Haryana",
        size: "55,000 sq.ft",
        image: "/locations/dlf-cybercity.jpg",
        perks: ["CyberHub Adjacent", "Sky Lounge", "Dedicated Leased Line"],
      },
      {
        id: "gurgaon-udyog",
        name: "Udyog Vihar Phase IV",
        metro: "5 min from Shankar Chowk",
        metroLine: "CyberHub Corridor",
        lineColor: "bg-indigo-600 text-white",
        address: "Plot 304, Udyog Vihar Phase-IV, Gurugram",
        size: "40,000 sq.ft",
        image: "/locations/udyog-vihar.jpg",
        perks: ["Startup Cluster", "24/7 Access", "Conference Center"],
      },
      {
        id: "gurgaon-golfcourse",
        name: "Golf Course Extension Road",
        metro: "Sector 55-56 Rapid Metro",
        metroLine: "Rapid Metro",
        lineColor: "bg-blue-600 text-white",
        address: "Golf Course Extension Road, Sector 65, Gurugram",
        size: "32,000 sq.ft",
        image: "/locations/golf-course-ext.jpg",
        perks: ["Premium Business Corridor", "EV Charging", "Wellness Deck"],
      },
    ],
  },
  noida: {
    name: "Noida",
    blurb: "Institutional campuses across prime expressway and metro belts.",
    hubs: [
      {
        id: "noida-sec62",
        name: "Sector 62 IT Hub",
        metro: "3 min from Electronic City Metro",
        metroLine: "Blue Line",
        lineColor: "bg-blue-700 text-white",
        address: "C-Block, Institutional Area, Sector 62, Noida",
        size: "50,000 sq.ft",
        image: "/locations/noida-sector-62.jpg",
        perks: ["IT District", "Spacious Cafeteria", "Enterprise Floorplates"],
      },
      {
        id: "noida-sec16",
        name: "Sector 16 Metro Belt",
        metro: "1 min walk from Sector 16 Metro",
        metroLine: "Blue Line",
        lineColor: "bg-blue-700 text-white",
        address: "Film City Marg, Sector 16, Noida",
        size: "30,000 sq.ft",
        image: "/locations/noida-sector-16.jpg",
        perks: ["Film City Belt", "Instant Move-in", "Direct Metro Access"],
      },
      {
        id: "noida-sec132",
        name: "Sector 132 Expressway",
        metro: "Expressway Corporate Park",
        metroLine: "Expressway Corridor",
        lineColor: "bg-emerald-700 text-white",
        address: "Expressway Corporate Park, Sector 132, Noida",
        size: "65,000 sq.ft",
        image: "/locations/noida-sector-132.jpg",
        perks: ["Mega Campus", "Green Surroundings", "Executive Boardrooms"],
      },
    ],
  },
};

const everydayInclusions = [
  {
    icon: Wifi,
    title: "1Gbps Redundant Multi-ISP Fiber",
    desc: "Dual active enterprise connections with instant automated failover so you never drop a client presentation or live call.",
  },
  {
    icon: Coffee,
    title: "Artisanal Barista Roastery",
    desc: "Freshly ground single-origin coffees, artisanal espresso blends, and organic teas brewed fresh all day long.",
  },
  {
    icon: Headphones,
    title: "Acoustic Zoom & Call Pods",
    desc: "Soundproof booths engineered for confidential 1-on-1 calls, investor pitches, and private conversations.",
  },
  {
    icon: Zap,
    title: "Zero-Downtime Power Grid",
    desc: "Heavy-duty dual generator sets and industrial online UPS systems ensuring zero-second cutover backup.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Smart Biometrics & CCTV",
    desc: "Touchless biometric entry, round-the-clock trained concierge staff, and comprehensive HD security coverage.",
  },
  {
    icon: Sparkles,
    title: "Meticulous Daily Housekeeping",
    desc: "Spotlessly cleaned workstations, fresh washrooms, and responsive on-site community managers.",
  },
];

const clientBrands = [
  "Dangal Games",
  "Aramex",
  "Thermax",
  "Razorpay",
  "InnovateLabs",
  "GlobalSoft",
  "TechCorp",
  "NexGen AI",
];

const customerStories = [
  {
    quote:
      "Onward has been a genuine partner in our expansion. The offices are impeccable, the internet is flawless, and our team genuinely looks forward to coming in every morning.",
    author: "Varun Puri",
    role: "Founder",
    company: "Dangal Games",
  },
  {
    quote:
      "The metro proximity and professional front-desk hospitality made relocating our regional team to Onward effortless. It just works.",
    author: "Abhinay Nagwekar",
    role: "Procurement Lead",
    company: "Aramex",
  },
  {
    quote:
      "Whenever clients visit us at Onward, the impression is always exceptional. The design aesthetic, boardroom tech, and attentive staff make running our enterprise seamless.",
    author: "Prasenjit Das Gupta",
    role: "Head Commercial",
    company: "Thermax",
  },
];

const simpleFaqs = [
  {
    category: "2-DAY TRIAL",
    q: "How does the 2-Day Free Trial work and who is eligible?",
    a: "It's simple: choose any Onward location in Delhi, Gurgaon, or Noida, and come experience the space with your team for 2 full consecutive days at zero cost. You will have full access to high-speed fiber Wi-Fi, private workstations, meeting rooms, and our barista coffee bar with zero credit card required.",
  },
  {
    category: "MOVE-IN READY",
    q: "How quickly can our team move into a Private Suite?",
    a: "Private Suites and Executive Cabins are 100% plug-and-play furnished. Your team can move in on the same day or within 24 hours of completing verification. For custom-built managed offices (50 to 500+ desks), we deliver bespoke branded floorplates in 3 to 4 weeks.",
  },
  {
    category: "GST & ROC",
    q: "What documentation is provided for Virtual Office & GST registration?",
    a: "We provide complete, legally certified paperwork including a registered Rent Agreement, NOC from the property owner, and the latest commercial Electricity Bill. These are 100% compliant with GST Department registration, ROC company incorporation, and MCA bank verification.",
  },
  {
    category: "TRANSPARENCY",
    q: "Are there any hidden maintenance or utility charges?",
    a: "None whatsoever. Everything is consolidated into a single transparent monthly membership invoice: ergonomic workstations, high-speed fiber internet, electricity, air conditioning, daily housekeeping, security, and unlimited beverages.",
  },
  {
    category: "BOARDROOMS",
    q: "Can we use meeting rooms across different locations?",
    a: "Yes. All members receive monthly meeting room credits that can be reserved across any of our 15+ centres in Delhi, Gurgaon, and Noida whenever you need to host a meeting in another part of town.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   PREVIOUS GENTLE SCROLL REVEAL HELPER
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
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   IMAGE PLACEHOLDER COMPONENT WITH GRACEFUL FALLBACK
   ═══════════════════════════════════════════════════════════════ */

function ArchitecturalImage({
  src,
  alt,
  className = "aspect-[16/10]",
  icon: Icon = Building2,
  badgeText,
}: {
  src?: string;
  alt: string;
  className?: string;
  icon?: any;
  badgeText?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#f0eae1] border border-[#ede8e1] flex items-center justify-center group ${className}`}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#faf8f5] to-[#ece5dc] relative">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#ede8e1] flex items-center justify-center text-[#d4622b] shadow-2xs mb-2 group-hover:scale-108 transition-transform">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-[#1a1a2e]">{alt}</span>
        </div>
      )}

      {badgeText && (
        <div className="absolute top-3 left-3 bg-[#1a1a2e]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
          {badgeText}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT: HUMAN, PRECIOUS & ATTRACTIVE
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [selectedCity, setSelectedCity] = useState<"delhi" | "gurgaon" | "noida">("delhi");
  const [activeStickyHubIndex, setActiveStickyHubIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  // Spaces Slider Ref
  const spacesSliderRef = useRef<HTMLDivElement>(null);

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

  const scrollSpaces = (direction: "left" | "right") => {
    if (spacesSliderRef.current) {
      spacesSliderRef.current.scrollBy({
        left: direction === "right" ? 380 : -380,
        behavior: "smooth",
      });
    }
  };

  const currentCityHubs = locationsByCity[selectedCity].hubs;
  const activeHub = currentCityHubs[activeStickyHubIndex] || currentCityHubs[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a2e] font-sans antialiased selection:bg-[#d4622b] selection:text-white pb-20 overflow-x-hidden">
      
      {/* ━━━ TOP ANNOUNCEMENT BANNER (FREE PASS PROMO) ━━━ */}
      {showTopBanner && (
        <div className="bg-[#1a1a2e] text-white text-xs py-2 px-4 border-b border-gray-800 relative z-50 transition-all">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-gray-300 font-medium">
                Complimentary Pass: Experience working from any of our 15+ Delhi, Gurgaon & Noida hubs for 2 days.
              </span>
              <button
                onClick={() => openBooking("All NCR Centres", true)}
                className="hidden sm:inline-flex items-center gap-1 font-bold text-[#d4622b] hover:text-amber-400 underline underline-offset-2 ml-1"
              >
                <span>Claim Free Pass</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openBooking("All NCR Centres", true)}
                className="sm:hidden font-bold text-[#d4622b] underline text-[11px]"
              >
                Claim Pass
              </button>
              <button
                onClick={() => setShowTopBanner(false)}
                className="text-gray-400 hover:text-white p-0.5 rounded transition-colors"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ━━━ REFINED PRECIOUS HEADER ━━━ */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          showTopBanner ? "top-[37px]" : "top-0"
        } ${
          scrolled
            ? "bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#ede8e1] py-3 shadow-2xs"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#ede8e1] flex items-center justify-center shadow-2xs group-hover:border-[#d4622b]/40 transition-colors p-1.5">
              <img
                src="/onward-logo.png"
                alt="Onward Workspaces"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="leading-none">
              <span className={`text-lg font-bold tracking-tight transition-colors ${
                scrolled ? "text-[#1a1a2e]" : "text-white drop-shadow-xs"
              } group-hover:text-[#d4622b]`}>
                Onward
              </span>
              <span className="block text-[8px] font-bold tracking-[0.2em] text-[#d4622b] uppercase mt-0.5">
                Workspaces
              </span>
            </div>
          </a>

          {/* Minimalist Navigation */}
          <nav className={`hidden md:flex items-center gap-8 text-xs font-semibold ${
            scrolled ? "text-gray-600" : "text-gray-200"
          }`}>
            <a href="#spaces" className="hover:text-[#d4622b] transition-colors">
              Our Spaces
            </a>
            <a href="#locations" className="hover:text-[#d4622b] transition-colors">
              Centres & Commutes
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

          {/* Contact & CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919910668152"
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors shadow-2xs ${
                scrolled
                  ? "bg-white border-[#ede8e1] text-gray-700 hover:border-[#d4622b]/40"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#d4622b]" />
              <span>+91 9910668152</span>
            </a>

            <button
              onClick={() => openBooking(undefined, true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-xs hover:scale-102 active:scale-98 ${
                scrolled
                  ? "bg-[#d4622b] text-white hover:bg-[#b8501f]"
                  : "bg-white text-[#1a1a2e] hover:bg-gray-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Try 2 Days Free</span>
            </button>
          </div>

        </div>
      </header>

      {/* ━━━ HERO SECTION (WITH EDITORIAL BACKGROUND IMAGE SUPPORT) ━━━ */}
      <section
        id="home"
        className="relative pt-36 sm:pt-44 pb-24 border-b border-[#ede8e1] overflow-hidden bg-[#1a1a2e]"
      >
        {/* Customizable Hero Background Image with Editorial Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-0 opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/hero-bg.jpg'), linear-gradient(135deg, #1a1a2e 0%, #2d2621 100%)",
          }}
        />
        
        {/* Warm Ambient Vignette Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/95 via-[#1a1a2e]/85 to-[#1a1a2e]/70 -z-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10 text-white">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Human Story & Typography */}
            <div className="lg:col-span-7 space-y-6">
              
              <SoftReveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-gray-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#d4622b] animate-pulse" />
                  <span className="text-amber-400 font-bold">Delhi • Gurgaon • Noida</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300 font-normal">Metro-Connected Workspaces</span>
                </div>
              </SoftReveal>

              <SoftReveal delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
                  Workspaces crafted for{" "}
                  <span className="font-serif italic font-normal text-amber-300">uninterrupted clarity</span>{" "}
                  and ambition.
                </h1>
              </SoftReveal>

              <SoftReveal delay={0.14}>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-xl">
                  Private team suites, custom managed floors, and meeting spaces across Delhi NCR — all hand-picked within a 2-minute walk from major metro lines. No setup headaches, zero surprise utility bills.
                </p>
              </SoftReveal>

              {/* Action Buttons */}
              <SoftReveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => openBooking(undefined, false)}
                    className="px-6 py-3.5 rounded-full bg-[#d4622b] text-white font-semibold text-xs sm:text-sm hover:bg-[#b8501f] transition-all flex items-center gap-2 shadow-lg hover:scale-102 active:scale-98"
                  >
                    <span>Schedule a Visit & Grab Coffee</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openBooking(undefined, true)}
                    className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm transition-colors shadow-2xs"
                  >
                    <span>Claim Free 2-Day Pass</span>
                  </button>
                </div>
              </SoftReveal>

              {/* Metric Highlights */}
              <SoftReveal delay={0.26}>
                <div className="pt-6 border-t border-gray-700/80 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-xs text-gray-400 mt-0.5">NCR Metro Hubs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">250+</div>
                    <div className="text-xs text-gray-400 mt-0.5">Growing Teams</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">1M+</div>
                    <div className="text-xs text-gray-400 mt-0.5">Sq. Ft. Managed</div>
                  </div>
                </div>
              </SoftReveal>

            </div>

            {/* Right Column: Architectural Showcase Vignette */}
            <div className="lg:col-span-5">
              <SoftReveal delay={0.18}>
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-7 shadow-2xl space-y-5 text-white">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-white">Okhla Flagship Campus</span>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                      45,000 sq.ft
                    </span>
                  </div>

                  {/* Architectural Blueprint Stamp */}
                  <div className="aspect-[16/10] rounded-2xl bg-black/30 border border-white/15 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-400 shadow-2xs mb-3 group-hover:scale-108 transition-transform">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-sm text-white">Private Suites & Managed Floors</div>
                    <div className="text-xs text-gray-300 mt-0.5">2 min walk from Harkesh Nagar Okhla Metro</div>
                  </div>

                  {/* Curated Space Features */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1 text-[11px] text-gray-200">
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
                      <Coffee className="w-3.5 h-3.5 text-amber-400" />
                      <span>Barista Roastery</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
                      <Headphones className="w-3.5 h-3.5 text-amber-400" />
                      <span>Acoustic Zoom Pods</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>100% Dual DG Backup</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>24/7 Smart Access</span>
                    </div>
                  </div>

                  {/* Direct Tour Trigger */}
                  <button
                    onClick={() => openBooking("Okhla Phase II (Flagship HQ)")}
                    className="w-full py-3 rounded-full bg-[#d4622b] hover:bg-[#b8501f] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Tour this Flagship Hub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                </div>
              </SoftReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ OUR SPACES: "DESIGNED FOR HOW REAL TEAMS BUILD" (HORIZONTAL IMAGE SLIDER) ━━━ */}
      <section id="spaces" className="py-20 sm:py-28 bg-white border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SoftReveal>
                <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                  Curated Formats
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">
                  Designed for how real teams build.
                </h2>
                <p className="text-sm text-gray-500 mt-2 font-normal max-w-xl">
                  Whether you need a sound-insulated 4-person suite or a 200-desk custom headquarters, every format is delivered turnkey with zero friction.
                </p>
              </SoftReveal>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => scrollSpaces("left")}
                className="w-10 h-10 rounded-full bg-[#faf8f5] border border-[#ede8e1] flex items-center justify-center text-gray-700 hover:text-[#d4622b] hover:border-[#d4622b]/40 transition-colors shadow-2xs active:scale-95"
                aria-label="Previous spaces"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSpaces("right")}
                className="w-10 h-10 rounded-full bg-[#d4622b] text-white flex items-center justify-center hover:bg-[#b8501f] transition-colors shadow-2xs active:scale-95"
                aria-label="Next spaces"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Drag/Scroll Spaces Carousel */}
          <div
            ref={spacesSliderRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
          >
            {workspaceSpaces.map((space, idx) => {
              const Icon = space.icon;
              return (
                <div
                  key={space.id}
                  className="w-[320px] sm:w-[380px] flex-shrink-0 rounded-3xl bg-[#faf8f5] border border-[#ede8e1] p-6 sm:p-7 flex flex-col justify-between hover:border-[#d4622b]/40 hover:bg-white hover:shadow-xs transition-all group"
                >
                  <div>
                    {/* Space Image Placeholder Preview */}
                    <ArchitecturalImage
                      src={space.image}
                      alt={space.title}
                      icon={Icon}
                      badgeText={space.badge}
                      className="aspect-[16/10] mb-5 shadow-2xs"
                    />

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#d4622b]">{space.num}</span>
                      <span className="text-[11px] font-semibold text-gray-500">{space.forWhom}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
                      {space.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed font-normal">
                      {space.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-gray-200/60 space-y-2">
                      {space.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d4622b] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Ready across 15+ hubs</span>
                    <button
                      onClick={() => openBooking(space.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4622b] hover:text-[#b8501f]"
                    >
                      <span>Inquire About Format</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ LOCATIONS SECTION (TEXT ON LEFT, STICKY SCROLLING IMAGE ON RIGHT) ━━━ */}
      <section id="locations" className="py-20 sm:py-28 bg-[#faf8f5] border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          {/* Section Header & City Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <SoftReveal>
                <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                  Strategic Hubs
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">
                  Locations made for effortless commutes.
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-md font-normal">
                  {locationsByCity[selectedCity].blurb}
                </p>
              </SoftReveal>
            </div>

            {/* City Tabs */}
            <div className="flex bg-white p-1 rounded-full border border-[#ede8e1] shadow-2xs self-start sm:self-auto">
              {(["delhi", "gurgaon", "noida"] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setActiveStickyHubIndex(0);
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold capitalize transition-all ${
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

          {/* Sticky Scrolling 2-Column Container */}
          <div className="grid lg:grid-cols-12 gap-10 items-start relative">
            
            {/* Left Column: Location Cards List (Scrolls Normally) */}
            <div className="lg:col-span-7 space-y-6">
              {currentCityHubs.map((hub, idx) => {
                const isActive = activeStickyHubIndex === idx;
                return (
                  <div
                    key={hub.id}
                    onMouseEnter={() => setActiveStickyHubIndex(idx)}
                    onClick={() => setActiveStickyHubIndex(idx)}
                    className={`p-7 sm:p-8 rounded-3xl transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? "bg-white border-[#d4622b] shadow-md scale-[1.01]"
                        : "bg-white/70 border-[#ede8e1] hover:border-gray-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#d4622b]" />
                        <h3 className="text-base sm:text-lg font-bold text-[#1a1a2e]">{hub.name}</h3>
                      </div>
                      <span className="text-[11px] font-semibold text-gray-600 bg-[#faf8f5] px-2.5 py-0.5 rounded-md border border-gray-200">
                        {hub.size}
                      </span>
                    </div>

                    <div className="mt-3.5 flex items-center gap-2 text-xs font-semibold text-[#d4622b]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{hub.metro}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${hub.lineColor}`}>
                        {hub.metroLine}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {hub.address}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {hub.perks.map((p) => (
                        <span key={p} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#faf8f5] text-gray-700 border border-gray-200">
                          {p}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">Click to inspect view</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBooking(hub.name);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4622b] hover:text-[#b8501f]"
                      >
                        <span>Schedule Walkthrough</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Image Container (Pins on scroll, changes image smoothly, then scrolls away) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHub.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl bg-white border border-[#ede8e1] p-6 shadow-md space-y-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-[10px] font-bold text-[#d4622b] uppercase tracking-wider block">
                        Live Preview
                      </span>
                      <h4 className="text-base font-bold text-[#1a1a2e] mt-0.5">{activeHub.name}</h4>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Open for Visits
                    </span>
                  </div>

                  {/* Sticky Image Preview */}
                  <ArchitecturalImage
                    src={activeHub.image}
                    alt={activeHub.name}
                    className="aspect-[16/11] shadow-2xs"
                    badgeText={activeHub.size}
                  />

                  {/* Proximity Highlights */}
                  <div className="p-3.5 rounded-2xl bg-[#faf8f5] border border-[#ede8e1] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-700 font-semibold">
                      <span className="text-gray-500">Metro Transit</span>
                      <span className="text-[#d4622b] font-bold">{activeHub.metro}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700 font-semibold">
                      <span className="text-gray-500">Commute Belt</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${activeHub.lineColor}`}>
                        {activeHub.metroLine}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openBooking(activeHub.name)}
                    className="w-full py-3 rounded-full bg-[#1a1a2e] hover:bg-[#d4622b] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Book a Tour at {activeHub.name.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ━━━ CRAFT & HOSPITALITY (WHAT'S INCLUDED) ━━━ */}
      <section id="inclusions" className="py-20 sm:py-28 bg-white border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SoftReveal>
              <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                Everyday Inclusions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">
                Everything taken care of. Zero headaches.
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-normal">
                Consolidated into a single transparent monthly invoice with zero surprise overheads.
              </p>
            </SoftReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {everydayInclusions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <SoftReveal key={item.title} delay={0.05 * idx}>
                  <div className="p-7 rounded-3xl bg-[#faf8f5] border border-[#ede8e1] flex flex-col justify-between h-full hover:border-[#d4622b]/30 transition-all">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-white border border-[#ede8e1] flex items-center justify-center text-[#d4622b] mb-4 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#1a1a2e]">{item.title}</h3>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed font-normal">{item.desc}</p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-gray-200/60 text-[11px] font-semibold text-gray-400">
                      Standard at all 15+ centres
                    </div>
                  </div>
                </SoftReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ COMMUNITY STORIES & CLIENT BRANDS ━━━ */}
      <section id="stories" className="py-20 sm:py-24 bg-[#faf8f5] border-b border-[#ede8e1]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <SoftReveal>
              <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                Trusted by Founders
              </span>
              <h2 className="text-3xl font-bold text-[#1a1a2e] tracking-tight">
                Where great teams grow.
              </h2>
            </SoftReveal>
          </div>

          {/* Client Logos Ribbon */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50">
            {clientBrands.map((brand) => (
              <span key={brand} className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
                {brand}
              </span>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {customerStories.map((story, idx) => (
              <SoftReveal key={story.author} delay={0.08 * idx}>
                <div className="p-8 rounded-3xl bg-white border border-[#ede8e1] flex flex-col justify-between h-full shadow-2xs">
                  <div>
                    <div className="flex gap-1 mb-4 text-[#d4622b]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#d4622b]" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic font-normal">
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

      {/* ━━━ COMMON QUESTIONS (FAQ) ━━━ */}
      <section id="faq" className="py-20 sm:py-28 bg-white border-b border-[#ede8e1]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <SoftReveal>
              <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                Common Inquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                Clear, straightforward answers about team leases, move-in timelines, and GST filings.
              </p>
            </SoftReveal>
          </div>

          <div className="space-y-3.5">
            {simpleFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <SoftReveal key={faq.q} delay={0.04 * idx}>
                  <div
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? "bg-[#faf8f5] border-[#d4622b]/50 shadow-2xs"
                        : "bg-[#faf8f5] border-[#ede8e1] hover:border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#1a1a2e] hover:text-[#d4622b] transition-colors"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] font-extrabold text-[#d4622b] bg-white px-2 py-0.5 rounded border border-gray-200">
                          {faq.category}
                        </span>
                        <div className="text-sm font-bold text-[#1a1a2e] mt-1">{faq.q}</div>
                      </div>

                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isOpen
                          ? "bg-[#d4622b] text-white border-[#d4622b] rotate-180"
                          : "bg-white text-gray-500 border-gray-200"
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
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
                          <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-3 font-normal">
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

      {/* ━━━ DROP BY FOR A VISIT & HELPLINE ━━━ */}
      <section id="contact" className="py-20 sm:py-28 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <SoftReveal>
                <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block">
                  Drop By For A Visit
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] leading-tight">
                  Come see the space and grab a coffee with us.
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  We would love to show you around any of our Delhi, Gurgaon, or Noida centres. Share your details and our team will get in touch to confirm a time that suits you best.
                </p>

                <div className="space-y-3 pt-3">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#ede8e1] shadow-2xs">
                    <MapPin className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Registered Flagship Campus</span>
                      Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020
                    </div>
                  </div>

                  <a
                    href="tel:+919910668152"
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors shadow-2xs"
                  >
                    <Phone className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Direct Phone Line</span>
                      +91 9910668152
                    </div>
                  </a>

                  <a
                    href="mailto:info@onwardworkspaces.com"
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors shadow-2xs"
                  >
                    <Mail className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Direct Email</span>
                      info@onwardworkspaces.com
                    </div>
                  </a>
                </div>
              </SoftReveal>
            </div>

            {/* Visit Form */}
            <div className="lg:col-span-7">
              <SoftReveal delay={0.15}>
                <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#ede8e1] shadow-xs">
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">Book a Walkthrough or Free Pass</h3>
                  <p className="text-xs text-gray-500 mb-6">No payment info needed. We&apos;ll confirm your visit over phone.</p>

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
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Target Centre</label>
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
                      Confirm Walkthrough Request
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
              <p className="text-xs text-gray-400 leading-relaxed font-normal">
                Thoughtfully crafted workspaces across Delhi NCR for teams that love getting things done.
              </p>
              <div className="mt-3 text-xs font-semibold text-[#d4622b]">
                ONWARD COWORKX PRIVATE LIMITED
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Spaces</h4>
              <ul className="space-y-2 text-xs font-normal">
                <li><a href="#spaces" className="hover:text-[#d4622b] transition-colors">Private Team Suites</a></li>
                <li><a href="#spaces" className="hover:text-[#d4622b] transition-colors">Custom Managed Floors</a></li>
                <li><a href="#spaces" className="hover:text-[#d4622b] transition-colors">Executive Cabins</a></li>
                <li><a href="#spaces" className="hover:text-[#d4622b] transition-colors">Virtual Office & GST</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Centres</h4>
              <ul className="space-y-2 text-xs font-normal">
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Okhla Phase II & III</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Mohan Cooperative</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Connaught Place</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">DLF Cyber City Gurgaon</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Sector 62 & 16 Noida</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Get In Touch</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-3 font-normal">
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

      {/* ━━━ FLOATING CONCIERGE CAPSULE DOCK ━━━ */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className="bg-[#1a1a2e]/90 backdrop-blur-md text-white border border-gray-700/60 rounded-full px-5 py-2.5 shadow-2xl flex items-center gap-4 pointer-events-auto text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-gray-200 hidden sm:inline">15+ NCR Hubs Open Today</span>
          </div>

          <div className="h-3.5 w-px bg-gray-600 hidden sm:block" />

          <button
            onClick={() => openBooking(undefined, true)}
            className="px-3.5 py-1.5 rounded-full bg-[#d4622b] hover:bg-[#b8501f] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>2-Day Free Pass</span>
          </button>

          <button
            onClick={() => openBooking(undefined, false)}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
          >
            Schedule Tour
          </button>
        </div>
      </div>

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
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e]">We&apos;ve received your request!</h3>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed font-normal">
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
