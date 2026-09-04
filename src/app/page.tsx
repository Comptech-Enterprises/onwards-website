"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
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
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Plus,
  Minus,
  Check,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const stepTime = 16;
    const steps = 1200 / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function InfiniteMarquee({ children, speed = 28 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap flex select-none">
      <motion.div
        className="flex gap-16 shrink-0 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ─── WIRE ANIMATION: adapted for light hero background ─── */
function HeroWire() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8965A" stopOpacity="0" />
            <stop offset="25%" stopColor="#B8965A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D4AA65" stopOpacity="1" />
            <stop offset="75%" stopColor="#B8965A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B8965A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="darkPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0" />
            <stop offset="35%" stopColor="#0A0A0A" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#B8965A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
          </linearGradient>
          <filter id="wireGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary static track */}
        <path
          d="M -120 220 C 220 70, 420 560, 700 280 C 940 60, 1140 570, 1400 260 C 1490 150, 1560 380, 1660 220"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth="1.5"
          strokeDasharray="5 9"
        />
        {/* Primary gold pulse */}
        <motion.path
          d="M -120 220 C 220 70, 420 560, 700 280 C 940 60, 1140 570, 1400 260 C 1490 150, 1560 380, 1660 220"
          stroke="url(#goldPulse)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#wireGlow)"
          strokeDasharray="210 1100"
          animate={{ strokeDashoffset: [1310, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Secondary static track */}
        <path
          d="M -60 460 C 260 640, 560 130, 820 460 C 1040 700, 1260 200, 1520 440 C 1590 520, 1630 340, 1680 400"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
        />
        {/* Secondary dark-gold pulse */}
        <motion.path
          d="M -60 460 C 260 640, 560 130, 820 460 C 1040 700, 1260 200, 1520 440 C 1590 520, 1630 340, 1680 400"
          stroke="url(#darkPulse)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#wireGlow)"
          strokeDasharray="170 1000"
          animate={{ strokeDashoffset: [1170, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
        />

        {/* Third faint track */}
        <path
          d="M 200 80 C 480 240, 660 520, 960 180 C 1160 -20, 1340 440, 1580 160"
          stroke="rgba(184,150,90,0.08)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />

        {/* Node beacons — using rect diamonds to avoid SVG circle r bug */}
        {[
          { cx: 700, cy: 280 },
          { cx: 820, cy: 460 },
          { cx: 1400, cy: 260 },
        ].map((node, i) => (
          <motion.g
            key={i}
            animate={{ opacity: [0.9, 0.1, 0.9] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: "easeInOut" }}
          >
            <rect
              x={node.cx - 4}
              y={node.cy - 4}
              width="8"
              height="8"
              fill="#B8965A"
              transform={`rotate(45 ${node.cx} ${node.cy})`}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ─── SUBTLE MESH for light sections ─── */
function SectionMesh() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a0a_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const workspaceSpaces = [
  {
    num: "01",
    title: "Private Team Suites",
    forWhom: "Teams of 4 to 50 members",
    description:
      "Fully furnished, lockable private offices with premium acoustic glass partitions, private storage, and dedicated boardroom credits. Move in within 24 hours.",
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
    title: "Executive Director Cabins",
    forWhom: "Founders, CXOs & Consultants",
    description:
      "Quiet, prestigious private offices with executive Italian leather seating, private discussion tables, and concierge beverage service.",
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
    title: "Virtual Office & GST Address",
    forWhom: "Remote & Expanding Companies",
    description:
      "A legally compliant prime commercial address in Delhi NCR for company incorporation, GST filing, and business mailing with full official documentation.",
    icon: Globe2,
    badge: "100% ROC & GST Compliant",
    image: "/spaces/virtual-office.jpg",
    features: [
      "Registered Rent Agreement & Owner NOC",
      "Utility Bill for GST & ROC filing",
      "Mail & courier handling with digital alerts",
      "Complimentary day passes across all hubs",
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
        name: "Okhla Phase II — Flagship HQ",
        metro: "2 min from Harkesh Nagar Okhla Metro",
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
        amenities: ["Enterprise Floors", "Conference Auditorium", "Green Terraces"],
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
        amenities: ["Premium Corridor", "EV Charging", "Wellness Nooks"],
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
        amenities: ["Film City Belt", "Metro Direct", "Plug & Play"],
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
  { icon: Wifi, title: "Enterprise Internet", desc: "Dual active 1Gbps multi-ISP with automatic failover. Zero downtime guaranteed." },
  { icon: Coffee, title: "Barista Coffee & Teas", desc: "Freshly brewed espresso, artisan blends, green teas, and infused water. All day, every day." },
  { icon: Headphones, title: "Soundproof Call Booths", desc: "Private acoustic pods for focused calls, pitches, and confidential conversations." },
  { icon: Zap, title: "100% Power Backup", desc: "Dual DG sets with seamless online UPS. Uninterrupted productivity, always." },
  { icon: ShieldCheck, title: "Biometric Access & CCTV", desc: "24/7 secure entry, trained on-site security, and complete HD monitoring across all floors." },
  { icon: Sparkles, title: "Daily Housekeeping", desc: "Meticulous sanitisation, daily upkeep, and on-site hospitality managers." },
];

const clientBrands = [
  "Dangal Games", "Aramex", "Thermax", "Razorpay", "InnovateLabs", "GlobalSoft", "TechCorp", "NexGen AI",
];

const clientTestimonials = [
  {
    quote: "Onward has been a fantastic workplace partner. The locations are right by the metro, the facilities are spotless, and the team handles everything seamlessly so we can focus entirely on growing our business.",
    author: "Varun Puri",
    role: "Founder",
    company: "Dangal Games",
  },
  {
    quote: "Relocating our regional team to Onward's Okhla hub was completely smooth. Move-in took 24 hours, internet is lightning fast, and client meetings in their boardroom always leave a strong impression.",
    author: "Abhinay Nagwekar",
    role: "Procurement Lead",
    company: "Aramex",
  },
  {
    quote: "Whenever clients or partners visit us at Onward, the impression is always top-notch. Polite staff, great coffee, and billing that is completely transparent — no surprises, ever.",
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
    a: "Select your preferred Onward centre in Delhi, Gurgaon, or Noida, and experience working from our workspace with your team for 2 full consecutive days. Complete access to high-speed fiber Wi-Fi, ergonomic workstations, private phone pods, and our barista coffee bar — with zero credit card or upfront deposit required.",
  },
  {
    id: 2,
    category: "Move-In & Leases",
    categoryLabel: "MOVE-IN READY",
    q: "How quickly can my team move in?",
    a: "Private Suites and Executive Cabins are 100% plug-and-play and ready for same-day move-in or within 24 hours of agreement signing. For custom enterprise managed floorplates (50 to 500+ desks), our in-house design and projects team delivers bespoke branded spaces in 3 to 4 weeks.",
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
    a: "No. Everything is consolidated into a single transparent monthly invoice — electricity, central air-conditioning, high-speed fiber, daily housekeeping, 24/7 security, and unlimited beverages. One number, no surprises.",
  },
  {
    id: 5,
    category: "Pricing & Amenities",
    categoryLabel: "CROSS-LOCATION ACCESS",
    q: "Can our team use meeting rooms across other Onward locations?",
    a: "Yes. All members receive complimentary monthly meeting room credits that can be reserved across any of our 15+ centres in Delhi, Gurgaon, and Noida — whenever you need to host a client meeting or interview in another part of town.",
  },
  {
    id: 6,
    category: "Move-In & Leases",
    categoryLabel: "AGREEMENT TERMS",
    q: "What are the lock-in periods and security deposit terms?",
    a: "We offer flexible agreement terms tailored to your stage of growth. Private suites start from flexible short-term options with minimal security deposit. For bespoke custom floors, agreements range from 1 to 3 years with standard commercial terms.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   OFFICE PHOTO PLACEHOLDER — dark premium style
   ═══════════════════════════════════════════════════════════════ */

function OfficePhoto({
  src,
  alt,
  className = "aspect-[4/3]",
  icon: Icon = Building2,
}: {
  src?: string;
  alt: string;
  className?: string;
  icon?: React.ElementType;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#EDEBE7] flex items-center justify-center group ${className}`}>
      {src && !err ? (
        <img src={src} alt={alt} onError={() => setErr(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#EDEBE7] gap-3">
          <div className="w-14 h-14 rounded-full border border-[#B8965A]/40 flex items-center justify-center text-[#B8965A]">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-semibold tracking-[0.12em] text-[#B8965A]/70 uppercase">{alt}</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<"delhi" | "gurgaon" | "noida">("delhi");
  const [activeHubIndex, setActiveHubIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>("All Topics");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formLocation, setFormLocation] = useState("Okhla Phase II, Delhi");
  const [formTeamSize, setFormTeamSize] = useState("1–10 Desks");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Schedule a Tour");
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const openBookingModal = (title?: string, trial = false) => {
    if (title) setModalTitle(title);
    setIsFreeTrial(trial);
    setModalSubmitted(false);
    setIsModalOpen(true);
    setMobileNavOpen(false);
  };

  const currentCityHubs = locationsByCity[selectedCity].hubs;
  const activeHub = currentCityHubs[activeHubIndex] || currentCityHubs[0];

  const filteredFaqs = selectedFaqCategory === "All Topics"
    ? faqs
    : faqs.filter((f) => f.category === selectedFaqCategory);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] antialiased selection:bg-[#B8965A] selection:text-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ━━━ SCROLL PROGRESS BAR ━━━ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#B8965A] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* ━━━ NAVIGATION ━━━ */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/96 backdrop-blur-md relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #ffffff 10%, #B8965A 45%, #ffffff 90%, transparent)' }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 flex items-center justify-center">
              <img src="/onward-logo.png" alt="Onward" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-[15px] font-black text-[#0A0A0A] tracking-[0.08em] leading-none">
                ONWARD
              </div>
              <div className="text-[8px] font-semibold text-[#B8965A] tracking-[0.2em] uppercase leading-none mt-0.5">
                WORKSPACES
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#444]">
            {[
              { href: "#spaces", label: "Workspace Formats" },
              { href: "#locations", label: "Locations" },
              { href: "#amenities", label: "Amenities" },
              { href: "#clients", label: "Clients" },
              { href: "#faq", label: "FAQ" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#0A0A0A] transition-colors relative py-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#0A0A0A] after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919910668152"
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0A0A0A] border border-black/15 px-3.5 py-2 rounded hover:bg-black/5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 99106 68152</span>
            </a>
            <button
              onClick={() => openBookingModal("Schedule a Tour", false)}
              className="bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white px-4 py-2 text-[12px] font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              Schedule a Tour
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl border border-black/10 text-[#0A0A0A] hover:bg-black/5"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-black/8 px-5 py-5 overflow-hidden"
            >
              <div className="space-y-1">
                {[
                  { href: "#spaces", label: "Workspace Formats" },
                  { href: "#locations", label: "Locations" },
                  { href: "#amenities", label: "Amenities" },
                  { href: "#clients", label: "Clients" },
                  { href: "#faq", label: "FAQ" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="block py-2.5 text-[14px] font-medium text-[#0A0A0A] border-b border-black/6 last:border-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <a href="tel:+919910668152"
                  className="flex-1 text-center py-2.5 text-[13px] font-semibold border border-black/15 rounded-xl">
                  Call Us
                </a>
                <button
                  onClick={() => openBookingModal("Schedule a Tour", true)}
                  className="flex-1 bg-[#0A0A0A] text-white py-2.5 text-[13px] font-semibold rounded-xl"
                >
                  Book a Tour
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ━━━ HERO ━━━ */}
      <section id="home" className="relative bg-[#F8F7F5] pt-24 pb-0 overflow-hidden min-h-screen flex flex-col">

        <HeroWire />

        <div className="flex-1 flex items-center relative z-10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full py-24 sm:py-32">

            <FadeUp delay={0.05}>
              <p className="text-[13px] text-[#B8965A] font-medium tracking-wide mb-6">
                Delhi · Gurgaon · Noida
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-[56px] sm:text-[72px] lg:text-[92px] font-black text-[#0A0A0A] leading-[1.0] tracking-[-0.03em] mb-8 max-w-4xl">
                Your team deserves
                <br />
                <em className="not-italic text-[#B8965A]">a better office.</em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                <p className="text-[17px] text-[#666] leading-[1.7] max-w-lg">
                  Managed offices and coworking across 15+ metro-connected locations.
                  Move in within 24 hours — no CAPEX, no hidden bills.
                </p>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <button
                    onClick={() => openBookingModal("Schedule a Tour", false)}
                    className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-6 py-3 text-[14px] font-semibold rounded-xl hover:bg-[#222] transition-colors"
                  >
                    Schedule a Tour <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openBookingModal("2-Day Free Trial", true)}
                    className="text-[13px] text-[#888] hover:text-[#0A0A0A] transition-colors text-left underline underline-offset-4 decoration-black/20"
                  >
                    Or try free for 2 days →
                  </button>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>

        {/* Stats — part of hero, understated */}
        <div className="relative z-10 border-t border-black/8 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6">
            <div className="flex flex-wrap gap-8 sm:gap-14">
              {[
                { value: 15, suffix: "+", label: "locations across NCR" },
                { value: 500, suffix: "+", label: "companies" },
                { value: 250, suffix: "K", label: "sq.ft managed" },
                { value: 10, suffix: "+", label: "years operating" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  <span className="text-[28px] sm:text-[32px] font-black text-[#0A0A0A] leading-none tracking-tight">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[13px] text-[#999]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ━━━ SPACES — editorial numbered list ━━━ */}
      <section id="spaces" className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <FadeUp>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 pb-8 border-b border-black/8">
              <h2 className="text-[40px] sm:text-[54px] font-black text-[#0A0A0A] tracking-tight leading-[1.05]">
                Four ways to work
                <br />at Onward.
              </h2>
              <p className="text-[15px] text-[#777] max-w-xs leading-relaxed">
                Every format comes fully furnished and managed — just move in.
              </p>
            </div>
          </FadeUp>

          <div className="divide-y divide-black/8">
            {workspaceSpaces.map((space, i) => {
              const Icon = space.icon;
              const isOpen = activeSpaceIndex === i;
              return (
                <FadeUp key={space.num} delay={i * 0.05}>
                  <div>
                    <button
                      className="w-full py-7 flex items-center justify-between gap-6 text-left group"
                      onClick={() => setActiveSpaceIndex(isOpen ? -1 : i)}
                    >
                      <div className="flex items-center gap-6 sm:gap-10">
                        <span className="text-[13px] font-medium text-[#B8965A] tabular-nums w-6 flex-shrink-0">
                          {space.num}
                        </span>
                        <div>
                          <h3 className="text-[20px] sm:text-[24px] font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#B8965A] transition-colors">
                            {space.title}
                          </h3>
                          <p className="text-[13px] text-[#999] mt-0.5">{space.forWhom}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-[#999] group-hover:text-[#0A0A0A] transition-colors">
                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-10 pl-12 sm:pl-20 grid sm:grid-cols-2 gap-8">
                            <div>
                              <OfficePhoto
                                alt={space.title}
                                className="aspect-[4/3] mb-5"
                                icon={Icon}
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <p className="text-[15px] text-[#555] leading-[1.8] mb-6">
                                {space.description}
                              </p>
                              <ul className="space-y-2 mb-7">
                                {space.features.map((f) => (
                                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#444]">
                                    <span className="text-[#B8965A] mt-0.5 flex-shrink-0">—</span>
                                    {f}
                                  </li>
                                ))}
                              </ul>
                              <button
                                onClick={() => openBookingModal(space.title, false)}
                                className="self-start inline-flex items-center gap-2 text-[13px] font-semibold text-[#0A0A0A] underline underline-offset-4 hover:text-[#B8965A] transition-colors"
                              >
                                Enquire about this space <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ LOCATIONS ━━━ */}
      <section id="locations" className="bg-[#F8F7F5] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <FadeUp>
            <div className="mb-14">
              <h2 className="text-[40px] sm:text-[54px] font-black text-[#0A0A0A] tracking-tight leading-[1.05] mb-4">
                15+ locations,<br />all metro-connected.
              </h2>
              <div className="flex gap-2 mt-8">
                {(Object.keys(locationsByCity) as Array<keyof typeof locationsByCity>).map((city) => (
                  <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setActiveHubIndex(0); }}
                    className={`px-5 py-2 text-[13px] font-semibold transition-all capitalize border rounded-full ${
                      selectedCity === city
                        ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                        : "bg-white text-[#555] border-black/12 hover:border-black/30"
                    }`}
                  >
                    {locationsByCity[city].name}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Hub list */}
            <div className="lg:col-span-2 space-y-1">
              {currentCityHubs.map((hub, idx) => (
                <button
                  key={hub.id}
                  onClick={() => setActiveHubIndex(idx)}
                  className={`w-full text-left py-4 px-5 border-l-2 transition-all ${
                    activeHubIndex === idx
                      ? "border-[#B8965A] bg-white"
                      : "border-transparent hover:border-black/15 hover:bg-white/60"
                  }`}
                >
                  <div className={`text-[15px] font-semibold mb-0.5 ${activeHubIndex === idx ? "text-[#0A0A0A]" : "text-[#555]"}`}>
                    {hub.name}
                  </div>
                  <div className="text-[12px] text-[#999]">{hub.size} · {hub.metroLine}</div>
                </button>
              ))}
            </div>

            {/* Hub detail */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white"
                >
                  <OfficePhoto
                    alt={activeHub.name}
                    className="aspect-[16/9]"
                    icon={MapPin}
                  />
                  <div className="p-7">
                    <h3 className="text-[20px] font-bold text-[#0A0A0A] mb-1">{activeHub.name}</h3>
                    <p className="text-[13px] text-[#B8965A] font-medium mb-3">{activeHub.metro}</p>
                    <p className="text-[13px] text-[#777] mb-5">{activeHub.address}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeHub.amenities.map((a) => (
                        <span key={a} className="text-[12px] text-[#555] border border-black/10 px-3 py-1 rounded-full">{a}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => openBookingModal(activeHub.name, false)}
                      className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-5 py-2.5 text-[13px] font-semibold rounded-xl hover:bg-[#222] transition-colors"
                    >
                      Book a Visit <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* ━━━ AMENITIES — clean list, no cards ━━━ */}
      <section id="amenities" className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <FadeUp>
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-[40px] sm:text-[54px] font-black text-[#0A0A0A] tracking-tight leading-[1.05] mb-4">
                  Everything included.
                  <br />
                  One monthly bill.
                </h2>
                <p className="text-[16px] text-[#777] leading-relaxed">
                  No hidden electricity, no AC charges, no maintenance overhead.
                  Just one transparent invoice, every month.
                </p>
              </div>

              <div className="border-t border-black/8">
                {everydayAmenities.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <ScaleReveal key={item.title} delay={i * 0.05}>
                      <div className="flex items-start gap-5 py-5 border-b border-black/6">
                        <Icon className="w-4.5 h-4.5 text-[#B8965A] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[15px] font-semibold text-[#0A0A0A]">{item.title}</p>
                          <p className="text-[13px] text-[#888] mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </ScaleReveal>
                  );
                })}
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ━━━ SOCIAL PROOF — one big quote + brands ━━━ */}
      <section id="clients" className="bg-[#F8F7F5] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <FadeUp>
            <blockquote className="mb-16">
              <p className="text-[28px] sm:text-[38px] lg:text-[46px] font-black text-[#0A0A0A] leading-[1.2] tracking-tight max-w-4xl mb-8">
                "Onward handles everything seamlessly so we can focus entirely on growing our business."
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-px h-10 bg-[#B8965A]" />
                <div>
                  <p className="text-[15px] font-bold text-[#0A0A0A]">Varun Puri</p>
                  <p className="text-[13px] text-[#888]">Founder, Dangal Games</p>
                </div>
              </footer>
            </blockquote>
          </FadeUp>

          <div className="border-t border-black/8 pt-12">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#AAA] uppercase mb-7">Also trusted by</p>
            <InfiniteMarquee speed={35}>
              {clientBrands.map((brand) => (
                <span key={brand} className="text-[17px] font-bold text-[#0A0A0A]/18 tracking-tight flex-shrink-0">
                  {brand}
                </span>
              ))}
            </InfiniteMarquee>
          </div>

          {/* Other testimonials understated */}
          <div className="mt-14 grid sm:grid-cols-2 gap-8 pt-10 border-t border-black/6">
            {clientTestimonials.slice(1).map((t) => (
              <FadeUp key={t.author}>
                <p className="text-[15px] text-[#666] leading-[1.75] mb-4 italic">"{t.quote}"</p>
                <p className="text-[13px] font-semibold text-[#0A0A0A]">{t.author}</p>
                <p className="text-[12px] text-[#999]">{t.role}, {t.company}</p>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ FAQ ━━━ */}
      <section id="faq" className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <FadeUp>
            <h2 className="text-[40px] sm:text-[54px] font-black text-[#0A0A0A] tracking-tight leading-[1.05] mb-14">
              Common questions.
            </h2>
          </FadeUp>

          <div className="border-t border-black/10 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={faq.id} className="border-b border-black/8">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-6 text-left"
                >
                  <span className="text-[16px] font-semibold text-[#0A0A0A] leading-snug">{faq.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-[#999]">
                    {openFaqIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 text-[15px] text-[#666] leading-[1.8]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ CONTACT ━━━ */}
      <section id="contact" className="bg-[#F8F7F5] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            <FadeUp>
              <div>
                <h2 className="text-[40px] sm:text-[54px] font-black text-[#0A0A0A] tracking-tight leading-[1.05] mb-6">
                  Come see it
                  for yourself.
                </h2>
                <p className="text-[16px] text-[#777] leading-relaxed mb-10">
                  Walk in to any of our centres without an appointment. Or let us know and we'll have someone ready for you.
                </p>
                <div className="space-y-4">
                  <a href="tel:+919910668152" className="flex items-center gap-3 text-[15px] font-semibold text-[#0A0A0A] hover:text-[#B8965A] transition-colors">
                    <Phone className="w-4 h-4 text-[#B8965A]" />
                    +91 99106 68152
                  </a>
                  <a href="mailto:hello@onwardworkspaces.com" className="flex items-center gap-3 text-[15px] font-semibold text-[#0A0A0A] hover:text-[#B8965A] transition-colors">
                    <Mail className="w-4 h-4 text-[#B8965A]" />
                    hello@onwardworkspaces.com
                  </a>
                  <div className="flex items-start gap-3 text-[15px] text-[#777]">
                    <MapPin className="w-4 h-4 text-[#B8965A] mt-0.5 flex-shrink-0" />
                    E-44/3, Okhla Phase II, New Delhi 110020
                  </div>
                </div>
              </div>
            </FadeUp>

            <ScaleReveal delay={0.1}>
              {isFormSubmitted ? (
                <div className="bg-white p-10 flex flex-col items-start justify-center min-h-[340px]">
                  <div className="w-10 h-10 border border-[#B8965A] rounded-xl flex items-center justify-center text-[#B8965A] mb-5">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="text-[22px] font-black text-[#0A0A0A] mb-2">We'll be in touch.</h3>
                  <p className="text-[15px] text-[#777]">Expect a call within 2 hours.</p>
                </div>
              ) : (
                <form
                  className="bg-white p-8 sm:p-10 space-y-5"
                  onSubmit={(e) => { e.preventDefault(); setIsFormSubmitted(true); }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-[#999] mb-1.5">Name</label>
                      <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)}
                        className="w-full border border-black/12 rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#999] mb-1.5">Phone</label>
                      <input type="tel" required value={formPhone} onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full border border-black/12 rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                        placeholder="+91" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#999] mb-1.5">Email</label>
                    <input type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full border border-black/12 rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                      placeholder="work@company.com" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-[#999] mb-1.5">Preferred Location</label>
                      <select value={formLocation} onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full border border-black/12 rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#0A0A0A] transition-colors bg-white">
                        <option>Okhla Phase II, Delhi</option>
                        <option>Okhla Phase III, Delhi</option>
                        <option>Mohan Cooperative, Delhi</option>
                        <option>Connaught Place, Delhi</option>
                        <option>DLF Cyber City, Gurgaon</option>
                        <option>Udyog Vihar, Gurgaon</option>
                        <option>Sector 62, Noida</option>
                        <option>Sector 16, Noida</option>
                        <option>Sector 132 Expressway, Noida</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#999] mb-1.5">Team Size</label>
                      <select value={formTeamSize} onChange={(e) => setFormTeamSize(e.target.value)}
                        className="w-full border border-black/12 rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#0A0A0A] transition-colors bg-white">
                        <option>1–10 Desks</option>
                        <option>10–25 Desks</option>
                        <option>25–50 Desks</option>
                        <option>50–100 Desks</option>
                        <option>100+ Desks</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit"
                    className="w-full bg-[#0A0A0A] hover:bg-[#222] text-white py-3.5 text-[14px] font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                    Request a Tour <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-[#CCC] text-center">We respond within 2 hours.</p>
                </form>
              )}
            </ScaleReveal>

          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="py-14 sm:py-18" style={{ background: 'linear-gradient(to bottom, #F8F7F5 0%, #fdf4e8 40%, #f5e6cc 100%)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mb-12 pb-10" style={{ borderBottom: '1px solid', borderImage: 'linear-gradient(to right, transparent, #B8965A 50%, transparent) 1' }}>
            <div className="flex items-center gap-3">
              <img src="/onward-logo.png" alt="Onward" className="w-7 h-7 object-contain" />
              <div>
                <p className="text-[13px] font-black text-[#0A0A0A] tracking-[0.08em]">ONWARD</p>
                <p className="text-[8px] text-[#B8965A] tracking-[0.2em] uppercase">WORKSPACES</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-8">
              {["Workspace Formats", "Locations", "Amenities", "FAQ"].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`}
                  className="text-[13px] text-[#888] hover:text-[#B8965A] transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a href="tel:+919910668152" className="text-[13px] text-[#777] hover:text-[#B8965A] transition-colors">+91 99106 68152</a>
              <a href="mailto:hello@onwardworkspaces.com" className="text-[13px] text-[#777] hover:text-[#B8965A] transition-colors">hello@onwardworkspaces.com</a>
              <span className="text-[13px] text-[#AAA]">Okhla Phase II, New Delhi 110020</span>
            </div>
            <p className="text-[12px] text-[#BBB]">© 2025 Onward Workspaces</p>
          </div>
        </div>
      </footer>

      {/* ━━━ BOOKING MODAL ━━━ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-md"
            >
              <div className="px-8 py-6 border-b border-black/8 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[#B8965A] font-medium mb-0.5">
                    {isFreeTrial ? "2-Day Free Trial" : "Book a Tour"}
                  </p>
                  <p className="text-[17px] font-bold text-[#0A0A0A]">{modalTitle}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-[#AAA] hover:text-[#0A0A0A] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalSubmitted ? (
                <div className="px-8 py-12 text-center">
                  <Check className="w-8 h-8 text-[#B8965A] mx-auto mb-4" />
                  <h3 className="text-[20px] font-black text-[#0A0A0A] mb-2">We'll be in touch.</h3>
                  <p className="text-[14px] text-[#777] mb-7">Expect a call within 2 hours.</p>
                  <button onClick={() => setIsModalOpen(false)}
                    className="w-full bg-[#0A0A0A] text-white py-3 text-[13px] font-semibold rounded-xl">Close</button>
                </div>
              ) : (
                <form className="px-8 py-7 space-y-4"
                  onSubmit={(e) => { e.preventDefault(); setModalSubmitted(true); }}>
                  {[
                    { label: "Name", type: "text", placeholder: "Your name" },
                    { label: "Phone", type: "tel", placeholder: "+91" },
                    { label: "Email", type: "email", placeholder: "work@company.com" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-[11px] font-medium text-[#999] mb-1.5">{field.label}</label>
                      <input type={field.type} required placeholder={field.placeholder}
                        className="w-full border border-black/12 rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#0A0A0A] transition-colors" />
                    </div>
                  ))}
                  <button type="submit"
                    className="w-full bg-[#0A0A0A] hover:bg-[#222] text-white py-3 text-[13px] font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 mt-2">
                    {isFreeTrial ? "Claim Free Trial" : "Request a Tour"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
