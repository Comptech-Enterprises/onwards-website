"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Check,
  Lock,
  Menu,
  Plus,
  Minus,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   AUTHENTIC ONWARD WORKSPACES DATA
   ═══════════════════════════════════════════════════════════════ */

const workspaceSpaces = [
  {
    num: "01",
    id: "suites",
    title: "Private Team Suites",
    forWhom: "Teams of 4 to 50 members",
    description:
      "Fully furnished, lockable private offices with premium acoustic glass partitions, private storage, and dedicated boardroom credits.",
    icon: Users,
    badge: "Immediate Move-In",
    image: "/spaces/private-suite.jpg",
    features: [
      "Sound-insulated 42dB double-glazed glass",
      "Ergonomic mesh chairs & lockable pedestals",
      "High-speed dedicated Wi-Fi & private LAN",
      "Complimentary monthly meeting room credits",
    ],
  },
  {
    num: "02",
    id: "managed",
    title: "Custom Managed Floors",
    forWhom: "Enterprises of 50 to 500+ desks",
    description:
      "Custom-designed and operated private floorplates built to your brand specifications. Zero capital expenditure, delivered turnkey in 30 days.",
    icon: Building2,
    badge: "Bespoke Enterprise",
    image: "/spaces/managed-office.jpg",
    features: [
      "Custom reception, director cabins & team bays",
      "Dedicated server room with dual active ISP",
      "Private executive cafeteria & pantry",
      "Complete facility management & daily upkeep",
    ],
  },
  {
    num: "03",
    id: "cabins",
    title: "Executive Director Cabins",
    forWhom: "Founders, CXOs & Consultants",
    description:
      "Quiet, prestigious private offices equipped with executive Italian leather seating, private discussion tables, and concierge beverage service.",
    icon: Award,
    badge: "Executive Class",
    image: "/spaces/director-cabin.jpg",
    features: [
      "Acoustic sound dampening & private entry",
      "Dedicated high-speed connectivity",
      "White-glove reception guest service",
      "24/7 smart biometric access",
    ],
  },
  {
    num: "04",
    id: "virtual",
    title: "Virtual Office & GST Registration",
    forWhom: "Remote & Expanding Companies",
    description:
      "A legally compliant Prime Commercial Address in Delhi NCR for company incorporation, GST filing, and business mailing with official documentation.",
    icon: Globe2,
    badge: "100% ROC & GST Compliant",
    image: "/spaces/virtual-office.jpg",
    features: [
      "Registered Rent Agreement & Owner NOC",
      "Utility Bill for GST & ROC filing",
      "Mail & courier handling with digital alerts",
      "Complimentary day passes to work from any hub",
    ],
  },
];

const locationsByCity = {
  delhi: {
    name: "Delhi",
    blurb: "Prime central and South Delhi commercial hubs with walking distance to Violet, Magenta, and Blue line metro stations.",
    hubs: [
      {
        id: "delhi-okhla-2",
        name: "Okhla Phase II (Flagship HQ)",
        metro: "2 min walk from Harkesh Nagar Okhla Metro",
        metroLine: "Violet Line",
        address: "Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020",
        size: "45,000 sq.ft Campus",
        image: "/locations/okhla-phase-2.jpg",
        amenities: ["Flagship Cafeteria", "Terrace Lounge", "EV Charging", "Ample Parking"],
      },
      {
        id: "delhi-okhla-3",
        name: "Okhla Phase III",
        metro: "3 min from NSIC Okhla Metro",
        metroLine: "Magenta Line",
        address: "B-216, Okhla Phase III, New Delhi, 110020",
        size: "38,000 sq.ft",
        image: "/locations/okhla-phase-3.jpg",
        amenities: ["Tech Corridor", "Soundproof Cabins", "Quiet Call Pods"],
      },
      {
        id: "delhi-mohan",
        name: "Mohan Cooperative",
        metro: "1 min walk from Mohan Estate Metro",
        metroLine: "Violet Line",
        address: "Mathura Road, Mohan Cooperative Industrial Estate, New Delhi",
        size: "60,000 sq.ft",
        image: "/locations/mohan-cooperative.jpg",
        amenities: ["Large Enterprise Floors", "Conference Auditorium", "Green Terraces"],
      },
      {
        id: "delhi-cp",
        name: "Connaught Place",
        metro: "Direct from Rajiv Chowk Interchange",
        metroLine: "Yellow & Blue Line",
        address: "Outer Circle, Connaught Place, Central Delhi",
        size: "25,000 sq.ft",
        image: "/locations/connaught-place.jpg",
        amenities: ["Central CBD Address", "Executive Cabins", "Steps to Restaurants"],
      },
    ],
  },
  gurgaon: {
    name: "Gurgaon",
    blurb: "High-demand business districts near DLF CyberHub, NH-8, and major corporate corridors.",
    hubs: [
      {
        id: "gurgaon-cybercity",
        name: "DLF Cyber City",
        metro: "2 min from Cyber City Rapid Metro",
        metroLine: "Rapid Metro",
        address: "DLF Cyber City, Sector 24, Gurugram, Haryana",
        size: "55,000 sq.ft",
        image: "/locations/dlf-cybercity.jpg",
        amenities: ["CyberHub Adjacent", "Sky Lounge", "Dedicated Fiber"],
      },
      {
        id: "gurgaon-udyog",
        name: "Udyog Vihar Phase IV",
        metro: "5 min from Shankar Chowk",
        metroLine: "Cyber Corridor",
        address: "Plot 304, Udyog Vihar Phase-IV, Gurugram",
        size: "40,000 sq.ft",
        image: "/locations/udyog-vihar.jpg",
        amenities: ["Startup Hub", "24/7 Access", "Conference Center"],
      },
      {
        id: "gurgaon-golfcourse",
        name: "Golf Course Extension Road",
        metro: "Sector 55-56 Rapid Metro",
        metroLine: "Rapid Metro",
        address: "Golf Course Extension Road, Sector 65, Gurugram",
        size: "32,000 sq.ft",
        image: "/locations/golf-course-ext.jpg",
        amenities: ["Premium Commercial Corridor", "EV Charging", "Wellness Nooks"],
      },
    ],
  },
  noida: {
    name: "Noida",
    blurb: "Established corporate parks across Sector 62 IT corridor, Sector 16, and Noida-Greater Noida Expressway.",
    hubs: [
      {
        id: "noida-sec62",
        name: "Sector 62 IT Hub",
        metro: "3 min from Electronic City Metro",
        metroLine: "Blue Line",
        address: "C-Block, Institutional Area, Sector 62, Noida",
        size: "50,000 sq.ft",
        image: "/locations/noida-sector-62.jpg",
        amenities: ["IT Corridor", "Large Cafeteria", "Enterprise Floorplates"],
      },
      {
        id: "noida-sec16",
        name: "Sector 16 Metro Belt",
        metro: "1 min walk from Sector 16 Metro",
        metroLine: "Blue Line",
        address: "Film City Marg, Sector 16, Noida",
        size: "30,000 sq.ft",
        image: "/locations/noida-sector-16.jpg",
        amenities: ["Film City Belt", "Direct Metro Connectivity", "Plug & Play"],
      },
      {
        id: "noida-sec132",
        name: "Sector 132 Expressway",
        metro: "Expressway Corporate Park",
        metroLine: "Expressway",
        address: "Expressway Corporate Park, Sector 132, Noida",
        size: "65,000 sq.ft",
        image: "/locations/noida-sector-132.jpg",
        amenities: ["Large Campus", "Green Surroundings", "Boardroom Facilities"],
      },
    ],
  },
};

const everydayAmenities = [
  {
    icon: Wifi,
    title: "High-Speed Enterprise Internet",
    desc: "Dual active 1Gbps multi-ISP connections with automatic failover for zero disruption.",
  },
  {
    icon: Coffee,
    title: "Unlimited Barista Coffee & Teas",
    desc: "Freshly brewed artisan coffee, espresso blends, green teas, and infused water all day.",
  },
  {
    icon: Headphones,
    title: "Soundproof Calling Booths",
    desc: "Private acoustic pods for focused video calls, sales pitches, and confidential conversations.",
  },
  {
    icon: Zap,
    title: "100% DG Power Backup",
    desc: "Heavy-duty dual generator sets with seamless online UPS for non-stop productivity.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Biometric Access & CCTV",
    desc: "Round-the-clock secure entry, trained on-site security, and complete HD monitoring.",
  },
  {
    icon: Sparkles,
    title: "Daily Housekeeping & Upkeep",
    desc: "Meticulous sanitization, daily trash removal, and on-site hospitality managers.",
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

const clientTestimonials = [
  {
    quote:
      "Onward has been a fantastic workplace partner. The locations are right by the metro, the facilities are spotless, and the team handles everything seamlessly so we can focus 100% on growing our business.",
    author: "Varun Puri",
    role: "Founder",
    company: "Dangal Games",
  },
  {
    quote:
      "Relocating our regional team to Onward's Okhla hub was completely smooth. Move-in took 24 hours, internet is lightning fast, and client meetings in their boardroom always leave a strong impression.",
    author: "Abhinay Nagwekar",
    role: "Procurement Lead",
    company: "Aramex",
  },
  {
    quote:
      "Whenever clients or partners visit us at Onward, the impression is always top-notch. The staff is polite and attentive, the coffee is great, and monthly billing is completely transparent.",
    author: "Prasenjit Das Gupta",
    role: "Head Commercial",
    company: "Thermax",
  },
];

const faqCategories = ["All Topics", "Trial Pass", "Move-In & Leases", "GST & Legal", "Pricing & Amenities"];

const faqs = [
  {
    id: 1,
    category: "Trial Pass",
    categoryLabel: "2-DAY TRIAL",
    q: "How does the 2-Day Free Trial Pass work?",
    a: "Select your preferred Onward centre in Delhi, Gurgaon, or Noida, and come experience working from our workspace with your team for 2 full consecutive days. You will have complete access to high-speed fiber Wi-Fi, ergonomic workstations, private phone pods, and our barista coffee bar with zero credit card or upfront deposit required.",
  },
  {
    id: 2,
    category: "Move-In & Leases",
    categoryLabel: "MOVE-IN READY",
    q: "How quickly can my team move into a Private Suite?",
    a: "Private Suites and Executive Cabins are 100% plug-and-play furnished and ready for same-day move-in or within 24 hours of agreement signing. For custom enterprise managed floorplates (50 to 500+ desks), our in-house design and projects team delivers bespoke branded spaces in 3 to 4 weeks.",
  },
  {
    id: 3,
    category: "GST & Legal",
    categoryLabel: "GST & ROC",
    q: "What documentation is provided for Virtual Office & GST registration?",
    a: "We provide complete legal paperwork including a registered Rent Agreement, NOC from the property owner, and the latest commercial Electricity Bill. These documents are 100% compliant with GST Department registration, ROC company incorporation, and MCA bank account setup.",
  },
  {
    id: 4,
    category: "Pricing & Amenities",
    categoryLabel: "TRANSPARENT BILLING",
    q: "Are there any hidden electricity, AC, or maintenance overheads?",
    a: "No. Everything is consolidated into a single transparent monthly membership invoice. This includes all utilities: electricity, central air-conditioning, high-speed fiber internet, daily housekeeping, 24/7 security, and unlimited beverages.",
  },
  {
    id: 5,
    category: "Pricing & Amenities",
    categoryLabel: "BOARDROOM CREDITS",
    q: "Can our team use meeting rooms across other Onward locations?",
    a: "Yes. All members receive complimentary monthly meeting room credits that can be reserved across any of our 15+ centres in Delhi, Gurgaon, and Noida whenever you need to host a client meeting or interview in another part of town.",
  },
  {
    id: 6,
    category: "Move-In & Leases",
    categoryLabel: "AGREEMENT TERMS",
    q: "What are the lock-in periods and security deposit terms?",
    a: "We offer flexible agreement terms tailored to your stage of growth. For private suites, terms start from flexible short-term options with minimal security deposit. For bespoke custom floors, agreements range from 1 to 3 years with standard commercial terms.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   IMAGE PLACEHOLDER COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function WorkplacePhoto({
  src,
  alt,
  className = "aspect-[16/10]",
  icon: Icon = Building2,
  badge,
}: {
  src?: string;
  alt: string;
  className?: string;
  icon?: any;
  badge?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center ${className}`}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#d9531e] shadow-sm mb-2">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-700">{alt}</span>
        </div>
      )}

      {badge && (
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
          {badge}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT: AUTHENTIC CLASSIC WORKSPACE PORTAL UX
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<"delhi" | "gurgaon" | "noida">("delhi");
  const [activeHubIndex, setActiveHubIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>("All Topics");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Spaces Slider Ref
  const spacesSliderRef = useRef<HTMLDivElement>(null);

  // Tour Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formLocation, setFormLocation] = useState("Okhla Phase II, Delhi");
  const [formTeamSize, setFormTeamSize] = useState("1-10 Desks");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Quick Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Okhla Phase II (Flagship HQ)");
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const openBookingModal = (title?: string, trial = false) => {
    if (title) setModalTitle(title);
    setIsFreeTrial(trial);
    setModalSubmitted(false);
    setIsModalOpen(true);
    setMobileNavOpen(false);
  };

  const scrollSpaces = (direction: "left" | "right") => {
    if (spacesSliderRef.current) {
      spacesSliderRef.current.scrollBy({
        left: direction === "right" ? 360 : -360,
        behavior: "smooth",
      });
    }
  };

  const currentCityHubs = locationsByCity[selectedCity].hubs;
  const activeHub = currentCityHubs[activeHubIndex] || currentCityHubs[0];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-[#d9531e] selection:text-white">
      
      {/* ━━━ TOP UTILITY BAR (PHONE • LOCATIONS • PASS ANNOUNCEMENT) ━━━ */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-4 text-slate-300">
            <a href="tel:+919910668152" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#d9531e]" />
              <span className="font-semibold">+91 9910668152</span>
            </a>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-400">Delhi • Gurgaon • Noida (15+ Prime Metro Hubs)</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium text-[11px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Complimentary 2-Day Workspace Trial Pass</span>
            </div>
            <button
              onClick={() => openBookingModal("All NCR Hubs", true)}
              className="bg-[#d9531e] hover:bg-[#c24614] text-white px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors"
            >
              Claim Pass
            </button>
          </div>

        </div>
      </div>

      {/* ━━━ CLASSIC FULL-WIDTH HEADER ━━━ */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shadow-2xs">
              <img
                src="/onward-logo.png"
                alt="Onward Workspaces"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                ONWARD
              </div>
              <div className="text-[9px] font-bold text-[#d9531e] tracking-[0.2em] uppercase">
                WORKSPACES
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#spaces" className="hover:text-[#d9531e] transition-colors">
              Workspace Formats
            </a>
            <a href="#locations" className="hover:text-[#d9531e] transition-colors">
              Locations & Metro
            </a>
            <a href="#amenities" className="hover:text-[#d9531e] transition-colors">
              Amenities
            </a>
            <a href="#clients" className="hover:text-[#d9531e] transition-colors">
              Clients
            </a>
            <a href="#faq" className="hover:text-[#d9531e] transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[#d9531e] transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Group */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919910668152"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d9531e]" />
              <span>Call Us</span>
            </a>

            <button
              onClick={() => openBookingModal(undefined, false)}
              className="bg-[#d9531e] hover:bg-[#c24614] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Schedule a Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-md">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
              <a href="#spaces" onClick={() => setMobileNavOpen(false)} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                Workspace Formats
              </a>
              <a href="#locations" onClick={() => setMobileNavOpen(false)} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                Locations & Metro
              </a>
              <a href="#amenities" onClick={() => setMobileNavOpen(false)} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                Amenities
              </a>
              <a href="#clients" onClick={() => setMobileNavOpen(false)} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                Clients
              </a>
              <a href="#faq" onClick={() => setMobileNavOpen(false)} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 col-span-2">
                Frequently Asked Questions
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <a href="tel:+919910668152" className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#d9531e]" />
                <span>+91 9910668152</span>
              </a>
              <button
                onClick={() => openBookingModal(undefined, true)}
                className="bg-[#d9531e] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                Claim Free Pass
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ━━━ HERO SECTION WITH EMBEDDED REAL-ESTATE LEAD CAPTURE FORM ━━━ */}
      <section id="home" className="relative bg-slate-50 border-b border-slate-200 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#d9531e]">
                <span className="w-2 h-2 rounded-full bg-[#d9531e] animate-pulse" />
                <span>Premium Managed Offices & Coworking Across Delhi NCR</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Fully Managed Workspaces Designed for <span className="text-[#d9531e]">Focus & Team Growth</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Move into ready-to-use private suites, custom managed floors, or shared workspaces across Delhi, Gurgaon, and Noida. Handpicked locations under 2 minutes from major metro stations with zero construction CAPEX.
              </p>

              {/* Trust Value Points */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#d9531e] shrink-0" />
                  <span>15+ Prime Metro-Connected Hubs</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#d9531e] shrink-0" />
                  <span>100% Dual DG Power & 1Gbps Fiber</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#d9531e] shrink-0" />
                  <span>Same-Day Move-In Ready</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#d9531e] shrink-0" />
                  <span>Zero Hidden Maintenance Overheads</span>
                </div>
              </div>

              {/* Stat Counters */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">15+</div>
                  <div className="text-xs text-slate-500 font-medium">NCR Hubs</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">250+</div>
                  <div className="text-xs text-slate-500 font-medium">Active Teams</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1M+</div>
                  <div className="text-xs text-slate-500 font-medium">Sq. Ft. Managed</div>
                </div>
              </div>

            </div>

            {/* Right Column: High-Converting Embedded Lead Form Box */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-lg">
                
                <div className="border-b border-slate-100 pb-4 mb-5">
                  <div className="inline-block text-[11px] font-extrabold text-[#d9531e] uppercase tracking-wider mb-1">
                    Book A Tour Or Free Trial
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Experience Onward Firsthand</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your details below and our on-site team will confirm your visit.
                  </p>
                </div>

                {!isFormSubmitted ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsFormSubmitted(true);
                    }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e] focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="vikram@company.com"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e] focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="+91 9910668152"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Location</label>
                        <select
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e] focus:bg-white"
                        >
                          <option value="Okhla Phase II, Delhi">Okhla Phase II (Delhi)</option>
                          <option value="Okhla Phase III, Delhi">Okhla Phase III (Delhi)</option>
                          <option value="Mohan Cooperative, Delhi">Mohan Cooperative (Delhi)</option>
                          <option value="Connaught Place, Delhi">Connaught Place (Delhi)</option>
                          <option value="DLF Cyber City, Gurgaon">DLF Cyber City (Gurgaon)</option>
                          <option value="Udyog Vihar, Gurgaon">Udyog Vihar (Gurgaon)</option>
                          <option value="Sector 62, Noida">Sector 62 IT Hub (Noida)</option>
                          <option value="Sector 16, Noida">Sector 16 (Noida)</option>
                          <option value="Sector 132, Noida">Sector 132 Expressway (Noida)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Team Size</label>
                        <select
                          value={formTeamSize}
                          onChange={(e) => setFormTeamSize(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e] focus:bg-white"
                        >
                          <option value="1-4 Desks">1 - 4 Desks</option>
                          <option value="5-15 Desks">5 - 15 Desks</option>
                          <option value="16-50 Desks">16 - 50 Desks</option>
                          <option value="50+ Custom Floor">50+ Custom Floor</option>
                          <option value="Virtual Office">Virtual Office / GST</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-[#d9531e] hover:bg-[#c24614] text-white font-bold text-xs sm:text-sm rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>Claim Free 2-Day Pass & Book Tour</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>Zero Spam. 100% Confidential.</span>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">Thank you, {formName || "there"}!</h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                      Your tour request for <span className="font-semibold text-slate-800">{formLocation}</span> has been received. Our team will reach out at <span className="font-semibold text-slate-800">{formPhone}</span> to confirm your slot.
                    </p>
                    <button
                      onClick={() => setIsFormSubmitted(false)}
                      className="text-xs font-bold text-[#d9531e] hover:underline pt-2"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ WORKSPACE FORMATS SECTION ━━━ */}
      <section id="spaces" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#d9531e] uppercase tracking-wider block mb-1">
                Workspace Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Designed for Teams of Every Size
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                From private team cabins to custom 500-seat enterprise floorplates.
              </p>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => scrollSpaces("left")}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                aria-label="Previous spaces"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSpaces("right")}
                className="p-2.5 rounded-lg bg-[#d9531e] hover:bg-[#c24614] text-white transition-colors"
                aria-label="Next spaces"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Slider Track */}
          <div
            ref={spacesSliderRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 cursor-grab active:cursor-grabbing"
          >
            {workspaceSpaces.map((space) => {
              const Icon = space.icon;
              return (
                <div
                  key={space.id}
                  className="w-[300px] sm:w-[360px] flex-shrink-0 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#d9531e] hover:shadow-md transition-all group"
                >
                  <div>
                    {/* Visual Preview */}
                    <WorkplacePhoto
                      src={space.image}
                      alt={space.title}
                      icon={Icon}
                      badge={space.badge}
                      className="aspect-[16/10] mb-4"
                    />

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#d9531e]">{space.num}</span>
                      <span className="text-[11px] font-semibold text-slate-500">{space.forWhom}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#d9531e] transition-colors">
                      {space.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {space.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      {space.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#d9531e] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Available at all 15+ hubs</span>
                    <button
                      onClick={() => openBookingModal(space.title)}
                      className="text-xs font-bold text-[#d9531e] hover:text-[#c24614] flex items-center gap-1"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ LOCATIONS SECTION WITH CITY TABS ━━━ */}
      <section id="locations" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#d9531e] uppercase tracking-wider block mb-1">
                Strategic NCR Locations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Walk to Work from Major Metro Stations
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {locationsByCity[selectedCity].blurb}
              </p>
            </div>

            {/* City Tabs */}
            <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-2xs self-start sm:self-auto">
              {(["delhi", "gurgaon", "noida"] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setActiveHubIndex(0);
                  }}
                  className={`px-5 py-2 rounded-md text-xs font-bold capitalize transition-all ${
                    selectedCity === city
                      ? "bg-[#d9531e] text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Location Explorer */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Hub Cards List */}
            <div className="lg:col-span-7 space-y-4">
              {currentCityHubs.map((hub, idx) => {
                const isActive = activeHubIndex === idx;
                return (
                  <div
                    key={hub.id}
                    onMouseEnter={() => setActiveHubIndex(idx)}
                    onClick={() => setActiveHubIndex(idx)}
                    className={`p-6 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "bg-white border-[#d9531e] shadow-md"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#d9531e]" />
                        <h3 className="text-base font-bold text-slate-900">{hub.name}</h3>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                        {hub.size}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#d9531e]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{hub.metro}</span>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                      {hub.address}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {hub.amenities.map((item) => (
                        <span key={item} className="text-[11px] font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Click to view location</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookingModal(hub.name);
                        }}
                        className="text-xs font-bold text-[#d9531e] hover:text-[#c24614] flex items-center gap-1"
                      >
                        <span>Schedule Walkthrough</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Preview Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-[#d9531e] uppercase tracking-wider block">
                      Centre Preview
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">{activeHub.name}</h4>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open for Visits
                  </span>
                </div>

                <WorkplacePhoto
                  src={activeHub.image}
                  alt={activeHub.name}
                  badge={activeHub.size}
                  className="aspect-[16/11]"
                />

                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Metro Transit</span>
                    <span className="text-[#d9531e] font-bold">{activeHub.metro}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Full Address</span>
                    <span className="text-slate-700 font-semibold truncate max-w-[200px]">{activeHub.address}</span>
                  </div>
                </div>

                <button
                  onClick={() => openBookingModal(activeHub.name)}
                  className="w-full py-3 bg-slate-900 hover:bg-[#d9531e] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Book a Tour at {activeHub.name.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ━━━ EVERYDAY AMENITIES / INCLUSIONS ━━━ */}
      <section id="amenities" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#d9531e] uppercase tracking-wider block mb-1">
              Everything Included
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Enterprise Amenities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Consolidated into a single transparent monthly membership with zero surprise bills.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {everydayAmenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={amenity.title}
                  className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#d9531e] mb-4 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{amenity.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{amenity.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-slate-400">
                    Standard at all 15+ hubs
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ CLIENT BRANDS & TESTIMONIALS ━━━ */}
      <section id="clients" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#d9531e] uppercase tracking-wider block mb-1">
              Trusted by Fast-Growing Companies
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Where Leading Teams Operate
            </h2>
          </div>

          {/* Client Logos Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 mb-12">
            {clientBrands.map((brand) => (
              <span key={brand} className="text-xs sm:text-sm font-bold tracking-widest text-slate-600 uppercase">
                {brand}
              </span>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {clientTestimonials.map((story) => (
              <div
                key={story.author}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-3 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {story.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{story.author}</div>
                    <div className="text-[11px] text-slate-500">{story.role}, {story.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ 2-COLUMN SPLIT KNOWLEDGE HUB & FAQ ━━━ */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Knowledge Hub Sticky Header & Category Filter */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#d9531e] uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200 mb-3">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Help & Knowledge Base</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Everything you need to know about team leases, move-in timelines, GST legal paperwork, and complimentary passes.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Filter by Topic
                </span>
                <div className="flex flex-wrap gap-2">
                  {faqCategories.map((category) => {
                    const count = category === "All Topics"
                      ? faqs.length
                      : faqs.filter((f) => f.category === category).length;
                    const isActive = selectedFaqCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedFaqCategory(category);
                          setOpenFaqIndex(0);
                        }}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                          isActive
                            ? "bg-[#d9531e] text-white shadow-xs scale-102"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                        }`}
                      >
                        <span>{category}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive ? "bg-white/20 text-white" : "bg-white text-slate-500 border border-slate-200"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Concierge Help Box */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <MessageSquare className="w-4 h-4 text-[#d9531e]" />
                  <span>Have a customized requirement?</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Speak directly with our workspace advisors to discuss custom floorplate buildouts or schedule private site walkthroughs.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="tel:+919910668152"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 transition-colors shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d9531e]" />
                    <span>+91 9910668152</span>
                  </a>
                  <button
                    onClick={() => openBookingModal(undefined, false)}
                    className="text-xs font-bold text-[#d9531e] hover:underline"
                  >
                    Schedule Tour →
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Modern Expandable Accordion List */}
            <div className="lg:col-span-7 space-y-3.5">
              {(selectedFaqCategory === "All Topics"
                ? faqs
                : faqs.filter((f) => f.category === selectedFaqCategory)
              ).map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "bg-slate-50 border-slate-300 border-l-4 border-l-[#d9531e] shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 group"
                    >
                      <div className="space-y-1.5 pr-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${
                          isOpen
                            ? "bg-orange-100 text-[#d9531e] border-orange-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {faq.categoryLabel}
                        </span>
                        <h3 className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
                          isOpen ? "text-slate-900" : "text-slate-800 group-hover:text-[#d9531e]"
                        }`}>
                          {faq.q}
                        </h3>
                      </div>

                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        isOpen
                          ? "bg-[#d9531e] text-white border-[#d9531e]"
                          : "bg-slate-100 text-slate-600 border-slate-200 group-hover:bg-[#d9531e] group-hover:text-white group-hover:border-[#d9531e]"
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/70 font-normal">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ━━━ CONTACT & FOOTER ━━━ */}
      <footer id="contact" className="bg-slate-900 text-slate-400 py-14 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img src="/onward-logo.png" alt="Onward Logo" className="w-8 h-8" />
                <div>
                  <span className="text-lg font-bold text-white tracking-tight">ONWARD</span>
                  <span className="block text-[8px] text-slate-400 tracking-widest uppercase">WORKSPACES</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Grade-A managed coworking spaces and enterprise floorplates across Delhi, Gurgaon, and Noida.
              </p>
              <div className="mt-3 text-xs font-semibold text-[#d9531e]">
                ONWARD COWORKX PRIVATE LIMITED
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Workspace Formats</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#spaces" className="hover:text-[#d9531e] transition-colors">Private Team Suites</a></li>
                <li><a href="#spaces" className="hover:text-[#d9531e] transition-colors">Custom Managed Floors</a></li>
                <li><a href="#spaces" className="hover:text-[#d9531e] transition-colors">Executive Director Cabins</a></li>
                <li><a href="#spaces" className="hover:text-[#d9531e] transition-colors">Virtual Office & GST Registration</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Key Hubs</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#locations" className="hover:text-[#d9531e] transition-colors">Okhla Phase II & III, Delhi</a></li>
                <li><a href="#locations" className="hover:text-[#d9531e] transition-colors">Mohan Cooperative, Delhi</a></li>
                <li><a href="#locations" className="hover:text-[#d9531e] transition-colors">Connaught Place, Delhi</a></li>
                <li><a href="#locations" className="hover:text-[#d9531e] transition-colors">DLF Cyber City, Gurgaon</a></li>
                <li><a href="#locations" className="hover:text-[#d9531e] transition-colors">Sector 62 & 16, Noida</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Direct Contact</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020
              </p>
              <div className="space-y-1 font-semibold text-white">
                <a href="tel:+919910668152" className="block hover:text-[#d9531e]">+91 9910668152</a>
                <a href="mailto:info@onwardworkspaces.com" className="block text-slate-400 hover:text-white">info@onwardworkspaces.com</a>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-500">
            <p>&copy; {new Date().getFullYear()} Onward Workspaces (Onward Coworkx Pvt. Ltd.). All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-[#d9531e] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#d9531e] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#d9531e] transition-colors">GST Compliance</a>
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
              className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-7 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!modalSubmitted ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#d9531e] uppercase tracking-wider">
                      {isFreeTrial ? "2-Day Free Trial Pass" : "Schedule a Tour"}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      {isFreeTrial ? "Claim Your Free 2-Day Trial" : `Visit ${modalTitle}`}
                    </h3>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setModalSubmitted(true);
                    }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9910668152"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date</label>
                        <input
                          type="date"
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Time Slot</label>
                        <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#d9531e]">
                          <option>10:00 AM - 12:00 PM</option>
                          <option>12:00 PM - 02:00 PM</option>
                          <option>02:00 PM - 04:00 PM</option>
                          <option>04:00 PM - 06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#d9531e] hover:bg-[#c24614] text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
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
                  <h3 className="text-xl font-bold text-slate-900">Request Received!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Thank you. Our community manager will call you shortly to confirm your visit time.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg mt-2"
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
