"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building2,
  Users,
  Award,
  Globe2,
  Monitor,
  Compass,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Wifi,
  Coffee,
  Lock,
  Headphones,
  Zap,
  Star,
  X,
  Check,
  Clock,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ORIGINAL VERIFIED BRAND ARCHITECTURE DATA
   ═══════════════════════════════════════════════════════════════ */

const workspaceFormats = [
  {
    id: "managed",
    code: "01",
    title: "Managed Enterprise HQ",
    subtitle: "Turnkey Floorplate Built-to-Suit",
    capacity: "50 – 500+ Workstations",
    commitment: "Custom Corporate Leases",
    tag: "CUSTOM ENTERPRISE",
    icon: Building2,
    summary:
      "A dedicated, brand-customized private office floor with private reception, IT server room, executive cabins, and bespoke hospitality services.",
    highlights: [
      "Custom brand interior identity & signage",
      "Private executive boardrooms & director cabins",
      "Dedicated multi-ISP 1Gbps fiber with failover",
      "Zero CAPEX — end-to-end facility management",
    ],
    details: {
      moveIn: "3–4 Weeks Custom Delivery",
      power: "100% Dual Generator Redundancy",
      access: "24/7 Dedicated Biometrics",
    },
  },
  {
    id: "suites",
    code: "02",
    title: "Private Team Suites",
    subtitle: "Sound-Insulated Dedicated Office",
    capacity: "4 – 40 Team Members",
    commitment: "Agile Team Contracts",
    tag: "PLUG & PLAY TEAMS",
    icon: Users,
    summary:
      "Fully-managed private lockable suites crafted for high-performance engineering, product, and consulting teams wanting agility with zero friction.",
    highlights: [
      "Ergonomic workstations with private storage",
      "Acoustic glass isolation & private whiteboards",
      "Unlimited artisanal barista coffee & tea pantry",
      "Complimentary meeting & conference credits",
    ],
    details: {
      moveIn: "Same Day Move-in Ready",
      power: "100% Online UPS + DG Backup",
      access: "Biometric Suite Access",
    },
  },
  {
    id: "cabins",
    code: "03",
    title: "Executive Director Cabins",
    subtitle: "Private Leadership Office Suite",
    capacity: "1 – 4 Leaders",
    commitment: "Flexible Executive Terms",
    tag: "LEADERSHIP CLASS",
    icon: Award,
    summary:
      "Prestigious private sound-isolated cabins crafted for corporate leaders, founders, and legal counsel requiring privacy, elegance, and comfort.",
    highlights: [
      "Italian leather executive chairs & discussion nook",
      "Sound-damped acoustic privacy glass",
      "Priority guest handling & concierge support",
      "High-speed private Wi-Fi VLAN",
    ],
    details: {
      moveIn: "Immediate Availability",
      power: "Zero-Downtime SLA",
      access: "24/7 Private Access",
    },
  },
  {
    id: "virtual",
    code: "04",
    title: "Virtual Office & GST Compliance",
    subtitle: "Official Delhi NCR Business Address",
    capacity: "Remote & Hybrid Firms",
    commitment: "Annual Compliance Term",
    tag: "MCA & ROC COMPLIANT",
    icon: Globe2,
    summary:
      "A legally certified commercial address for company incorporation, GST registration, bank account opening, and corporate mail handling.",
    highlights: [
      "NOC, Electricity Bill & Rent Agreement provided",
      "Compliant with GST Department & ROC filings",
      "Courier & parcel receiving with digital logging",
      "Monthly complimentary day passes across NCR",
    ],
    details: {
      moveIn: "Documentation in 24 Hours",
      power: "Digital Mail Portal",
      access: "NCR Pass Integration",
    },
  },
  {
    id: "ondemand",
    code: "05",
    title: "4K Boardrooms & Event Spaces",
    subtitle: "Smart Meeting Hubs by the Hour",
    capacity: "4 – 60 Pax",
    commitment: "Hourly & Daily Pay-per-Use",
    tag: "HYBRID COLLABORATION",
    icon: Monitor,
    summary:
      "State-of-the-art hybrid meeting hubs equipped with 4K video conferencing, smart touch presentation displays, and beverage concierge.",
    highlights: [
      "Polycom & Logitech 4K hybrid AV systems",
      "Interactive smart touch digital whiteboards",
      "High-speed dedicated Wi-Fi & technical support",
      "Artisanal coffee & catering on demand",
    ],
    details: {
      moveIn: "Instant App/Web Booking",
      power: "High-Def Polycom Video",
      access: "Dedicated Concierge",
    },
  },
  {
    id: "bespoke",
    code: "06",
    title: "Build-To-Suit Campus",
    subtitle: "Custom Architecture & Development",
    capacity: "100 – 1000+ Desks",
    commitment: "Long-Term Enterprise Partnership",
    tag: "BESPOKE ARCHITECTURE",
    icon: Compass,
    summary:
      "Turnkey development of whole standalone buildings and enterprise wings tailored from shell to finish to your enterprise specifications.",
    highlights: [
      "Architectural planning aligned to corporate branding",
      "Dedicated cafeteria, wellness zone, and IT server hall",
      "Tier-1 infrastructure & power redundancy",
      "Optimized operational expense framework",
    ],
    details: {
      moveIn: "Tailored Project Timeline",
      power: "Dedicated Substation / DG",
      access: "Turnstile Security Gates",
    },
  },
];

const ncrHubsData = {
  delhi: {
    city: "Delhi",
    subtitle: "Capital central hubs with immediate access to Violet, Magenta & Blue metro lines.",
    centres: [
      {
        id: "okhla-2",
        name: "Okhla Phase II (Flagship HQ)",
        area: "45,000+ sq.ft",
        metro: "2 min walk from Harkesh Nagar Okhla Metro",
        address: "Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020",
        tags: ["Flagship Centre", "Enterprise Wing", "Café Terrace", "Ample Parking"],
      },
      {
        id: "okhla-3",
        name: "Okhla Phase III",
        area: "38,000+ sq.ft",
        metro: "3 min from NSIC Okhla Metro",
        address: "B-216, Okhla Phase III, New Delhi, 110020",
        tags: ["Tech Corridor", "Private Suites", "Quiet Pods"],
      },
      {
        id: "mohan",
        name: "Mohan Cooperative",
        area: "60,000+ sq.ft",
        metro: "1 min walk from Mohan Estate Metro",
        address: "Mathura Road, Mohan Cooperative Industrial Estate, New Delhi",
        tags: ["Large Campus", "Auditorium", "Green Terraces"],
      },
      {
        id: "cp",
        name: "Connaught Place",
        area: "25,000+ sq.ft",
        metro: "Rajiv Chowk Metro Interchange",
        address: "Outer Circle, Connaught Place, Central Delhi",
        tags: ["Central CBD", "Executive Suites", "Prestigious Pin"],
      },
    ],
  },
  gurgaon: {
    city: "Gurgaon",
    subtitle: "Millennium City corporate corridors near DLF CyberHub and major expressways.",
    centres: [
      {
        id: "cybercity",
        name: "DLF Cyber City",
        area: "55,000+ sq.ft",
        metro: "2 min from IndusInd Cyber City Rapid Metro",
        address: "DLF Cyber City, Sector 24, Gurugram, Haryana",
        tags: ["Fortune 500 Hub", "High-Speed Fiber", "Sky Lounge"],
      },
      {
        id: "udyog",
        name: "Udyog Vihar Phase IV",
        area: "40,000+ sq.ft",
        metro: "5 min from Shankar Chowk / CyberHub",
        address: "Plot 304, Udyog Vihar Phase-IV, Gurugram",
        tags: ["Startup Hub", "24/7 Biometrics", "Podcast Booth"],
      },
      {
        id: "golfcourse",
        name: "Golf Course Extension Road",
        area: "32,000+ sq.ft",
        metro: "Sector 55-56 Rapid Metro",
        address: "Golf Course Extension Road, Sector 65, Gurugram",
        tags: ["Ultra Premium", "Wellness Pods", "EV Charging"],
      },
    ],
  },
  noida: {
    city: "Noida",
    subtitle: "High-tech institutional campuses across prime expressway and metro belts.",
    centres: [
      {
        id: "sec62",
        name: "Sector 62 IT Hub",
        area: "50,000+ sq.ft",
        metro: "3 min from Electronic City Metro",
        address: "C-Block, Institutional Area, Sector 62, Noida",
        tags: ["IT Park", "Enterprise Floorplates", "Cafeteria"],
      },
      {
        id: "sec16",
        name: "Sector 16 Metro Belt",
        area: "30,000+ sq.ft",
        metro: "1 min walk from Sector 16 Metro",
        address: "Film City Marg, Sector 16, Noida",
        tags: ["Media District", "Turnkey Cabins", "Instant Commute"],
      },
      {
        id: "sec132",
        name: "Sector 132 Expressway",
        area: "65,000+ sq.ft",
        metro: "Noida-Greater Noida Expressway",
        address: "Expressway Corporate Park, Sector 132, Noida",
        tags: ["Mega Campus", "Green Architecture", "Executive Suites"],
      },
    ],
  },
};

const enterpriseSpecs = [
  {
    num: "01",
    title: "1Gbps Redundant Multi-ISP Fiber",
    desc: "Dual active enterprise internet connections with auto-failover, private VLAN configuration, and hardware firewall security.",
    icon: Wifi,
  },
  {
    num: "02",
    title: "Sound-Insulated Acoustic Zoom Pods",
    desc: "Private acoustic booths designed for confidential investor calls, hybrid client meetings, and uninterrupted focus.",
    icon: Headphones,
  },
  {
    num: "03",
    title: "Unlimited Artisanal Barista Coffee",
    desc: "Freshly brewed artisan coffees, organic herbal teas, micro-kitchens, and healthy snacking stations on every floor.",
    icon: Coffee,
  },
  {
    num: "04",
    title: "24/7 AI Biometric & CCTV Security",
    desc: "Touchless biometric access control, round-the-clock trained security personnel, and continuous high-definition CCTV coverage.",
    icon: Lock,
  },
  {
    num: "05",
    title: "4K Hybrid Boardrooms & Polycom AV",
    desc: "Polycom 4K studio cameras, interactive touch whiteboards, and seamless wireless presentation casting.",
    icon: Monitor,
  },
  {
    num: "06",
    title: "100% Dual Power Redundancy",
    desc: "Heavy-duty dual generator sets with zero-second online UPS cutover ensuring uninterrupted workday productivity.",
    icon: Zap,
  },
];

const campusGalleryItems = [
  { title: "Executive Lounge & Café", tag: "HOSPITALITY", icon: Coffee, desc: "Artisanal espresso bar & casual breakout terrace." },
  { title: "Soundproof Team Cabin", tag: "WORKSPACES", icon: Users, desc: "Acoustically isolated private team suites." },
  { title: "4K Hybrid Boardroom", tag: "MEETING HUBS", icon: Monitor, desc: "Polycom AV conferencing for hybrid boards." },
  { title: "Director Executive Suite", tag: "LEADERSHIP", icon: Award, desc: "Italian leather executive seating & meeting nook." },
  { title: "Collaboration Deck", tag: "COMMUNITY", icon: Building2, desc: "Naturally lit collaboration and breakout spaces." },
  { title: "Concierge Welcome Reception", tag: "CAMPUS", icon: Compass, desc: "Professional front-desk hospitality and guest handling." },
];

const verifiedTestimonials = [
  {
    name: "Varun Puri",
    role: "Founder",
    company: "Dangal Games",
    text: "Onward has been a cornerstone in our expansion journey. The strategic locations and seamless operations let our team focus 100% on product development.",
  },
  {
    name: "Abhinay Nagwekar",
    role: "Procurement Lead",
    company: "Aramex",
    text: "Meticulously maintained facilities with unwavering infrastructure support. Onward consistently exceeds our enterprise expectations across NCR.",
  },
  {
    name: "Prasenjit Das Gupta",
    role: "Head Commercial",
    company: "Thermax",
    text: "Transitioning our regional office to Onward was an outstanding decision. The professional environment leaves a lasting impression on our visiting clients.",
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

const faqCategories = [
  { id: "all", label: "All Questions" },
  { id: "trial", label: "2-Day Free Trial" },
  { id: "virtual", label: "Virtual Office & GST" },
  { id: "managed", label: "Managed Enterprise" },
  { id: "inclusions", label: "Inclusions & Amenities" },
];

const faqAccordion = [
  {
    category: "trial",
    categoryLabel: "2-DAY TRIAL",
    q: "How does the 2-Day Free Trial work and who is eligible?",
    a: "You and your core team can experience working out of any Onward center in Delhi, Gurgaon, or Noida for 2 consecutive days at zero cost. You will have full access to high-speed redundant Wi-Fi, ergonomic workstations, meeting room facilities, and our artisanal barista coffee bar with zero credit card required.",
  },
  {
    category: "trial",
    categoryLabel: "MOVE-IN",
    q: "How quickly can our team move into a Private Suite or Dedicated Cabin?",
    a: "Private Suites and Executive Cabins are 100% plug-and-play furnished. Your team can move in on the same day or within 24 hours of completing verification. Custom-built Managed Offices (50 to 500+ desks) are delivered in 3 to 4 weeks with bespoke branding and layout.",
  },
  {
    category: "virtual",
    categoryLabel: "GST & ROC",
    q: "What documentation is provided for Virtual Office & GST registration?",
    a: "We provide complete, legally certified commercial documentation including a registered Rent Agreement, NOC from the property owner, and the latest commercial Electricity Bill. These documents are 100% compliant with GST Department registration, ROC company incorporation, and MCA bank verification.",
  },
  {
    category: "virtual",
    categoryLabel: "COMPLIANCE",
    q: "How does corporate courier handling and digital mail scanning work for Virtual Offices?",
    a: "Our front-desk concierge receives and logs all incoming mail, legal notices, and courier parcels. You receive an instant digital notification with scanned envelopes, and parcels can be forwarded to your preferred residential or corporate address upon request.",
  },
  {
    category: "managed",
    categoryLabel: "ENTERPRISE HQ",
    q: "Can we customize the office layout, private reception, and IT server infrastructure?",
    a: "Yes. For our Managed Enterprise and Build-to-Suit clients, our architectural team designs custom floorplans featuring your brand colours, dedicated reception desk, private executive cabins, dedicated server room with multi-ISP fiber lines, and private biometric turnstiles.",
  },
  {
    category: "managed",
    categoryLabel: "INFRASTRUCTURE",
    q: "What are your power and internet uptime guarantees?",
    a: "All Onward centers operate on enterprise Grade-A infrastructure featuring dual active multi-ISP fiber connections with automated failover, industrial online UPS systems, and heavy-duty dual generator sets providing 100% power and zero-second cutover backup.",
  },
  {
    category: "inclusions",
    categoryLabel: "INCLUSIONS",
    q: "What services are included in the single consolidated monthly membership?",
    a: "Everything is covered in a single transparent monthly invoice: ergonomic furniture, high-speed fiber internet, 100% electricity and power backup, daily sanitization and housekeeping, front-desk concierge, mail handling, unlimited barista roastery coffee and teas, and monthly complimentary boardroom credits.",
  },
  {
    category: "inclusions",
    categoryLabel: "BOARDROOMS",
    q: "How do meeting room bookings and 4K video conferencing credits work?",
    a: "Members receive monthly complimentary credits to reserve our 4K hybrid boardrooms equipped with Polycom studio cameras and smart digital whiteboards. Additional hours can be booked seamlessly on-demand.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   ARCHITECTURAL PLACEHOLDER COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function ArchitecturalPlaceholder({
  title,
  subtitle,
  icon: Icon = Building2,
  className = "aspect-[16/10]",
}: {
  title?: string;
  subtitle?: string;
  icon?: any;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl bg-[#faf8f5] border border-[#ede8e1] flex flex-col items-center justify-center p-6 text-center overflow-hidden group transition-all duration-300 hover:border-[#d4622b]/40 ${className}`}
    >
      <div className="absolute inset-0 light-grid opacity-30 pointer-events-none" />

      {/* Architectural Icon Stamp */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative w-12 h-12 rounded-xl bg-white border border-[#ede8e1] flex items-center justify-center text-[#d4622b] shadow-xs mb-2.5"
      >
        <Icon className="w-5 h-5" />
      </motion.div>

      {title && (
        <div className="relative font-bold text-sm text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
          {title}
        </div>
      )}
      {subtitle && (
        <div className="relative text-[11px] font-medium text-gray-500 mt-0.5">
          {subtitle}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATION REVEAL HELPERS
   ═══════════════════════════════════════════════════════════════ */

function FadeReveal({
  children,
  delay = 0,
  yOffset = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const steps = 35;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT: TOTALLY NEW 2025 ARCHITECTURAL LAYOUT
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [activeFormatIndex, setActiveFormatIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState<"delhi" | "gurgaon" | "noida">("delhi");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState("all");
  const [scrolled, setScrolled] = useState(false);

  // Booking Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState("Okhla Phase II Flagship, Delhi");
  const [isTrialBooking, setIsTrialBooking] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  // Horizontal Scroll Track Refs
  const hubsSliderRef = useRef<HTMLDivElement>(null);
  const gallerySliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeFormat = workspaceFormats[activeFormatIndex];

  const scrollTrack = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "right" ? 360 : -360,
        behavior: "smooth",
      });
    }
  };

  const triggerBooking = (targetName?: string, trial = false) => {
    if (targetName) setModalTarget(targetName);
    setIsTrialBooking(trial);
    setBookingDone(false);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a2e] font-sans antialiased selection:bg-[#d4622b] selection:text-white pb-24 overflow-x-hidden">
      
      {/* ━━━ LUXURY ARCHITECTURAL TOP BAR WITH SMOOTH ENTRY ━━━ */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#ede8e1] shadow-xs py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Brand Mark */}
          <a href="#home" className="flex items-center gap-3 group">
            <motion.img
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              src="/onward-logo.png"
              alt="Onward Workspaces"
              className="w-8 h-8 object-contain"
            />
            <div className="leading-none">
              <span className="text-lg font-extrabold tracking-tight text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
                Onward
              </span>
              <span className="block text-[8px] font-bold tracking-[0.22em] text-[#d4622b] mt-0.5">WORKSPACES</span>
            </div>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-600">
            <a href="#dossier" className="hover:text-[#d4622b] transition-colors">Workspace Portfolio</a>
            <a href="#hubs" className="hover:text-[#d4622b] transition-colors">NCR Centres</a>
            <a href="#specs" className="hover:text-[#d4622b] transition-colors">Enterprise Specs</a>
            <a href="#gallery" className="hover:text-[#d4622b] transition-colors">Campus Walk</a>
            <a href="#trust" className="hover:text-[#d4622b] transition-colors">Clients</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <a
              href="tel:+919910668152"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-[#ede8e1] px-3 py-2 rounded-full hover:border-[#d4622b]/40 transition-all shadow-2xs hover:scale-102 active:scale-98"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4622b]" />
              <span>+91 9910668152</span>
            </a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => triggerBooking(undefined, true)}
              className="inline-flex items-center gap-1.5 bg-[#d4622b] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#b8501f] transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Claim 2-Day Trial</span>
            </motion.button>
          </div>

        </div>
      </motion.nav>

      {/* ━━━ HERO: MONUMENTAL ARCHITECTURAL HEADER WITH STAGGERED ENTRANCE ━━━ */}
      <section id="home" className="pt-28 sm:pt-36 pb-16 border-b border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="grid lg:grid-cols-12 gap-10 items-end pb-12 border-b border-[#ede8e1]">
            
            {/* Left Headline with Staggered Fade Up */}
            <div className="lg:col-span-8 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce7dc] text-[#d4622b] text-[11px] font-bold uppercase tracking-wider"
              >
                <span className="w-2 h-2 rounded-full bg-[#d4622b] animate-pulse" />
                <span>Delhi NCR Managed Offices & Coworking</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1a1a2e] tracking-tight leading-[1.05]"
              >
                Workspace Built <br />
                Around Your{" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-[#d4622b] inline-block"
                >
                  Ambition.
                </motion.span>
              </motion.h1>
            </div>

            {/* Right Subtitle & Buttons */}
            <div className="lg:col-span-4 space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-sm text-gray-600 leading-relaxed font-normal"
              >
                Grade-A enterprise offices, private acoustic suites, and MCA-compliant virtual spaces across Delhi, Gurgaon, and Noida.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => triggerBooking(undefined, false)}
                  className="px-6 py-3 rounded-full bg-[#1a1a2e] text-white font-bold text-xs hover:bg-[#d4622b] transition-colors flex items-center gap-2 shadow-xs"
                >
                  <span>Schedule Centre Tour</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => triggerBooking(undefined, true)}
                  className="px-5 py-3 rounded-full bg-white border border-[#ede8e1] text-gray-700 font-bold text-xs hover:border-[#d4622b] transition-colors shadow-2xs"
                >
                  <span>Request Free 2-Day Trial</span>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Staggered Metrics Ribbon with Live Counting Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {[
              { val: 3, suffix: "+ Cities", desc: "Delhi • Gurgaon • Noida" },
              { val: 15, suffix: "+ Centres", desc: "Metro-Connected Locations" },
              { val: 250, suffix: "+ Clients", desc: "Startups to MNCs" },
              { val: 1, suffix: "M+ Sq. Ft.", desc: "Managed Grade-A Footprint" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-4 rounded-2xl bg-white border border-[#ede8e1] flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="w-2 h-8 rounded-full bg-[#d4622b]/20 flex items-center justify-center">
                  <div className="w-2 h-3 rounded-full bg-[#d4622b]" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-[#1a1a2e]">
                    <StatCounter target={stat.val} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] text-gray-500">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ SECTION 1: INTERACTIVE SPLIT WORKSPACE DOSSIER (STAGGERED ENTRANCE) ━━━ */}
      <section id="dossier" className="py-20 sm:py-24 bg-white border-b border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <FadeReveal>
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                Workspace Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
                Select your team format.
              </h2>
              <p className="text-sm text-gray-500 mt-1.5">
                Click any workspace format below to inspect specifications, capacity options, and move-in terms.
              </p>
            </div>
          </FadeReveal>

          {/* Split Interactive Matrix Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Format Selector List with Animated Stagger */}
            <div className="lg:col-span-5 space-y-2.5">
              {workspaceFormats.map((wf, idx) => {
                const isSelected = activeFormatIndex === idx;
                const Icon = wf.icon;
                return (
                  <FadeReveal key={wf.id} delay={0.05 * idx} yOffset={15}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setActiveFormatIndex(idx)}
                      className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? "bg-[#faf8f5] border-[#d4622b] shadow-xs text-[#1a1a2e]"
                          : "bg-white border-[#ede8e1] text-gray-600 hover:border-gray-300 hover:bg-[#faf8f5]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`text-xs font-extrabold ${isSelected ? "text-[#d4622b]" : "text-gray-400"}`}>
                          {wf.code}
                        </span>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${isSelected ? "bg-[#d4622b] text-white" : "bg-[#faf8f5] text-gray-500"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#1a1a2e]">{wf.title}</div>
                          <div className="text-[11px] text-gray-500">{wf.capacity}</div>
                        </div>
                      </div>

                      <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isSelected ? "text-[#d4622b] translate-x-1" : "text-gray-300"}`} />
                    </motion.button>
                  </FadeReveal>
                );
              })}
            </div>

            {/* Right Column: Dynamic Architectural Inspector Card with Smooth Morph */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFormat.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl bg-[#faf8f5] border border-[#ede8e1] p-6 sm:p-8 space-y-6 shadow-xs"
                >
                  
                  {/* Inspector Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#ede8e1]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4622b] bg-white px-2.5 py-1 rounded-full border border-gray-200 shadow-2xs">
                        {activeFormat.tag}
                      </span>
                      <h3 className="text-2xl font-extrabold text-[#1a1a2e] mt-2">{activeFormat.title}</h3>
                      <div className="text-xs text-gray-500 mt-0.5">{activeFormat.subtitle}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-[#1a1a2e]">{activeFormat.capacity}</div>
                      <div className="text-[11px] text-gray-500">{activeFormat.commitment}</div>
                    </div>
                  </div>

                  {/* Visual Blueprint Graphic */}
                  <ArchitecturalPlaceholder
                    title={activeFormat.title}
                    subtitle={`${activeFormat.capacity} • ${activeFormat.commitment}`}
                    icon={activeFormat.icon}
                    className="aspect-[16/8]"
                  />

                  {/* Summary & Feature List */}
                  <div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                      {activeFormat.summary}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-gray-200/60">
                      {activeFormat.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <Check className="w-3.5 h-3.5 text-[#d4622b] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Metadata Strip */}
                  <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-white border border-[#ede8e1] text-center text-[11px] shadow-2xs">
                    <div>
                      <div className="text-gray-400 font-medium">Timeline</div>
                      <div className="font-bold text-[#1a1a2e] mt-0.5">{activeFormat.details.moveIn}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 font-medium">Power SLA</div>
                      <div className="font-bold text-emerald-700 mt-0.5">{activeFormat.details.power}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 font-medium">Security</div>
                      <div className="font-bold text-[#1a1a2e] mt-0.5">{activeFormat.details.access}</div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-gray-500">Available across all NCR hubs</span>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => triggerBooking(activeFormat.title)}
                      className="px-6 py-3 rounded-full bg-[#d4622b] text-white font-bold text-xs hover:bg-[#b8501f] transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <span>Inquire for this Format</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ━━━ SECTION 2: NCR HUBS & COMMUTE MATRIX (HORIZONTAL SLIDER) ━━━ */}
      <section id="hubs" className="py-20 sm:py-24 bg-[#faf8f5] border-b border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <FadeReveal>
              <div>
                <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                  Strategic NCR Belts
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
                  Explore our centres.
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-lg">
                  {ncrHubsData[selectedCity].subtitle}
                </p>
              </div>
            </FadeReveal>

            {/* City Switcher Tabs & Slider Arrows */}
            <div className="flex items-center gap-3">
              <div className="flex p-1 rounded-full bg-white border border-[#ede8e1] shadow-xs">
                {(["delhi", "gurgaon", "noida"] as const).map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                      selectedCity === city
                        ? "bg-[#d4622b] text-white shadow-xs"
                        : "text-gray-600 hover:text-[#1a1a2e]"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => scrollTrack(hubsSliderRef, "left")}
                  className="w-9 h-9 rounded-full bg-white border border-[#ede8e1] flex items-center justify-center text-gray-700 hover:text-[#d4622b] shadow-2xs"
                  aria-label="Previous centre"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => scrollTrack(hubsSliderRef, "right")}
                  className="w-9 h-9 rounded-full bg-[#d4622b] text-white flex items-center justify-center hover:bg-[#b8501f] shadow-2xs"
                  aria-label="Next centre"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Horizontal Drag/Scroll Hubs Track with Card Hover Lift */}
          <div
            ref={hubsSliderRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
          >
            {ncrHubsData[selectedCity].centres.map((centre, i) => (
              <motion.div
                key={centre.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="w-[300px] sm:w-[350px] flex-shrink-0 rounded-3xl bg-white border border-[#ede8e1] p-6 flex flex-col justify-between hover:border-[#d4622b]/40 transition-all shadow-xs"
              >
                <div>
                  <ArchitecturalPlaceholder
                    title={centre.name}
                    subtitle={centre.area}
                    icon={Building2}
                    className="aspect-[16/10] mb-4"
                  />

                  <h3 className="text-base font-bold text-[#1a1a2e]">{centre.name}</h3>

                  <div className="mt-1.5 text-xs font-semibold text-[#d4622b] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{centre.metro}</span>
                  </div>

                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">{centre.address}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {centre.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#faf8f5] text-gray-600 border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400">Open for Visits</span>
                  <button
                    onClick={() => triggerBooking(centre.name)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#d4622b] hover:text-[#b8501f] transition-colors"
                  >
                    <span>Schedule Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ SECTION 3: ENTERPRISE SPECS EDITORIAL GRID (STAGGERED ENTRANCE) ━━━ */}
      <section id="specs" className="py-20 sm:py-24 bg-white border-b border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <FadeReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                Enterprise Specifications
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
                Crafted for uninterrupted focus.
              </h2>
            </div>
          </FadeReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseSpecs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <FadeReveal key={spec.num} delay={0.08 * idx} yOffset={20}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-7 rounded-3xl bg-[#faf8f5] border border-[#ede8e1] flex flex-col justify-between h-full hover:border-[#d4622b]/30 transition-all shadow-2xs hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-2xl font-black text-[#d4622b]/30">{spec.num}</span>
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#ede8e1] flex items-center justify-center text-[#d4622b] shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[#1a1a2e]">{spec.title}</h3>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{spec.desc}</p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-gray-200/60 text-[11px] font-bold text-gray-400">
                      Standard Across All 15+ NCR Hubs
                    </div>
                  </motion.div>
                </FadeReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ SECTION 4: CAMPUS GALLERY WALK (HORIZONTAL SLIDER) ━━━ */}
      <section id="gallery" className="py-20 sm:py-24 bg-[#faf8f5] border-b border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <FadeReveal>
            <div>
              <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
                Campus Environments
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
                Curated facilities.
              </h2>
            </div>
          </FadeReveal>

          <div className="flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => scrollTrack(gallerySliderRef, "left")}
              className="w-9 h-9 rounded-full bg-white border border-[#ede8e1] flex items-center justify-center text-gray-700 hover:text-[#d4622b] shadow-2xs"
              aria-label="Previous gallery slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => scrollTrack(gallerySliderRef, "right")}
              className="w-9 h-9 rounded-full bg-[#d4622b] text-white flex items-center justify-center hover:bg-[#b8501f] shadow-2xs"
              aria-label="Next gallery slide"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Horizontal Track with Staggered Elements */}
        <div
          ref={gallerySliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
        >
          {campusGalleryItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="w-[280px] sm:w-[330px] flex-shrink-0 rounded-3xl bg-white border border-[#ede8e1] p-5 shadow-xs hover:border-[#d4622b]/40 transition-all"
            >
              <ArchitecturalPlaceholder
                title={item.title}
                subtitle={item.tag}
                icon={item.icon}
                className="aspect-[4/3] mb-3.5"
              />
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ━━━ SECTION 5: CLIENT TRUST & PRESS REVIEWS ━━━ */}
      <section id="trust" className="py-20 bg-white border-b border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12 text-center">
          <FadeReveal>
            <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block mb-1">
              Enterprise Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
              Trusted by founders & leaders.
            </h2>
          </FadeReveal>
        </div>

        {/* Client Marquee Strip */}
        <div className="mb-14 overflow-hidden whitespace-nowrap opacity-60">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="inline-flex gap-14"
          >
            {[...clientBrands, ...clientBrands].map((brand, idx) => (
              <span key={idx} className="text-sm sm:text-base font-extrabold tracking-widest text-gray-400 uppercase">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-3 gap-6">
          {verifiedTestimonials.map((t, idx) => (
            <FadeReveal key={idx} delay={0.1 * idx} yOffset={20}>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-7 rounded-3xl bg-[#faf8f5] border border-[#ede8e1] flex flex-col justify-between h-full shadow-2xs hover:shadow-xs"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-[#d4622b]">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#d4622b]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1a1a2e] text-white font-bold text-xs flex items-center justify-center">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#1a1a2e]">{t.name}</div>
                    <div className="text-[10px] text-gray-500">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            </FadeReveal>
          ))}
        </div>
      </section>

      {/* ━━━ SECTION 6: ELEVATED KNOWLEDGE BASE & FAQ (INTERACTIVE CATEGORIZED SPLIT) ━━━ */}
      <section id="faq" className="py-20 sm:py-28 bg-[#faf8f5] border-b border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <FadeReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ede8e1] shadow-2xs text-[#d4622b] text-[10px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3 text-[#d4622b]" />
                <span>Knowledge Base & Advisory</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a2e] tracking-tight">
                Clear answers for <span className="text-[#d4622b]">clear decisions.</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl">
                Everything you need to know about flexible team leases, GST compliance, bespoke buildouts, and our zero-cost 2-day trial pass.
              </p>
            </FadeReveal>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
            {faqCategories.map((cat) => {
              const isActive = activeFaqCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveFaqCategory(cat.id);
                    setOpenFaq(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#d4622b] text-white shadow-xs"
                      : "bg-white text-gray-600 hover:text-[#1a1a2e] border border-[#ede8e1] hover:border-gray-300"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* 2-Column Split Architectural Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Advisory Concierge Callout Block */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <FadeReveal delay={0.1}>
                <div className="rounded-3xl bg-white border border-[#ede8e1] p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#faf8f5] border border-[#ede8e1] flex items-center justify-center text-[#d4622b] shadow-2xs">
                    <Headphones className="w-5 h-5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#d4622b] uppercase tracking-wider block">
                      Dedicated Concierge
                    </span>
                    <h3 className="text-lg font-bold text-[#1a1a2e] mt-1">
                      Have a unique team requirement?
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed font-normal">
                      Our commercial real estate advisors can prepare custom floorplans, enterprise IT topologies, and bespoke lease proposals within 24 hours.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                    <button
                      onClick={() => triggerBooking(undefined, true)}
                      className="w-full py-3 rounded-full bg-[#d4622b] text-white font-bold text-xs hover:bg-[#b8501f] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Claim Free 2-Day Pass</span>
                    </button>

                    <a
                      href="tel:+919910668152"
                      className="w-full py-2.5 rounded-full bg-[#faf8f5] text-gray-700 font-semibold text-xs flex items-center justify-center gap-2 border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#d4622b]" />
                      <span>Direct: +91 9910668152</span>
                    </a>
                  </div>

                  <div className="pt-2 flex items-center gap-4 text-[10px] font-bold text-gray-400">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#d4622b]" />
                      <span>Zero Brokerage</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#d4622b]" />
                      <span>MCA & GST Verified</span>
                    </div>
                  </div>
                </div>
              </FadeReveal>
            </div>

            {/* Right Column: Categorized Interactive Accordion Cards */}
            <div className="lg:col-span-8 space-y-3.5">
              {(activeFaqCategory === "all"
                ? faqAccordion
                : faqAccordion.filter((f) => f.category === activeFaqCategory)
              ).map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <FadeReveal key={item.q} delay={0.04 * idx} yOffset={12}>
                    <div
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? "bg-white border-[#d4622b] shadow-xs"
                          : "bg-white border-[#ede8e1] hover:border-gray-300"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-start justify-between gap-4 transition-colors group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-[#faf8f5] text-[#d4622b] border border-gray-200">
                              {item.categoryLabel}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors leading-snug">
                            {item.q}
                          </h4>
                        </div>

                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isOpen
                            ? "bg-[#d4622b] text-white border-[#d4622b] rotate-180"
                            : "bg-[#faf8f5] text-gray-500 border-[#ede8e1] group-hover:border-gray-300"
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 font-normal">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeReveal>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ━━━ SECTION 7: DIRECT INQUIRY & CONSULTATION ━━━ */}
      <section id="contact" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <FadeReveal>
                <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider block">
                  Direct Leasing & Visits
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] leading-tight">
                  Request a physical tour or 2-day team trial.
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Connect with our commercial advisory team for bespoke floor plans, lease structuring, and private hub visits across Delhi, Gurgaon, and Noida.
                </p>

                <div className="space-y-3 pt-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf8f5] border border-[#ede8e1]">
                    <MapPin className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Registered Flagship HQ</span>
                      Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020
                    </div>
                  </div>

                  <a
                    href="tel:+919910668152"
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf8f5] border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Direct Line</span>
                      +91 9910668152
                    </div>
                  </a>

                  <a
                    href="mailto:info@onwardworkspaces.com"
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf8f5] border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-[#1a1a2e] block">Official Email</span>
                      info@onwardworkspaces.com
                    </div>
                  </a>
                </div>
              </FadeReveal>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7">
              <FadeReveal delay={0.15}>
                <div className="p-8 sm:p-10 rounded-3xl bg-[#faf8f5] border border-[#ede8e1] shadow-xs">
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">Book Tour or Claim Free Trial</h3>
                  <p className="text-xs text-gray-500 mb-6">Receive calendar confirmation and centre directions within 24 hours.</p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingDone(true);
                      setModalOpen(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Vikram Sharma"
                          className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@company.com"
                          className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9910668152"
                          className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Target Hub</label>
                        <select className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]">
                          <option value="Okhla Phase II, Delhi">Okhla Phase II (Flagship HQ, Delhi)</option>
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
                      <label className="text-xs font-bold text-gray-700 block mb-1">Requirements & Team Size</label>
                      <textarea
                        rows={3}
                        placeholder="Specify your team size, expected move-in date, or layout preferences..."
                        className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-2.5 text-xs text-[#1a1a2e] focus:outline-none focus:border-[#d4622b] resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#d4622b] text-white font-bold text-xs hover:bg-[#b8501f] transition-all shadow-xs"
                    >
                      Submit Booking & Trial Request
                    </motion.button>
                  </form>
                </div>
              </FadeReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[#1a1a2e] text-gray-400 py-16 text-xs border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/onward-logo.png" alt="Onward Logo" className="w-8 h-8" />
                <div>
                  <span className="text-lg font-bold text-white tracking-tight">Onward</span>
                  <span className="block text-[8px] text-gray-400 tracking-[0.2em]">WORKSPACES</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Premium managed workspaces crafted around your ambition, brand, and team growth.
              </p>
              <div className="mt-3 text-xs font-bold text-[#d4622b]">
                ONWARD COWORKX PRIVATE LIMITED
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Formats</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#dossier" className="hover:text-[#d4622b] transition-colors">Managed Office</a></li>
                <li><a href="#dossier" className="hover:text-[#d4622b] transition-colors">Private Suites</a></li>
                <li><a href="#dossier" className="hover:text-[#d4622b] transition-colors">Executive Cabins</a></li>
                <li><a href="#dossier" className="hover:text-[#d4622b] transition-colors">Virtual Office</a></li>
                <li><a href="#dossier" className="hover:text-[#d4622b] transition-colors">4K Boardrooms</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">NCR Hubs</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hubs" className="hover:text-[#d4622b] transition-colors">Okhla Phase II & III</a></li>
                <li><a href="#hubs" className="hover:text-[#d4622b] transition-colors">Mohan Cooperative</a></li>
                <li><a href="#hubs" className="hover:text-[#d4622b] transition-colors">Connaught Place</a></li>
                <li><a href="#hubs" className="hover:text-[#d4622b] transition-colors">DLF Cyber City Gurgaon</a></li>
                <li><a href="#hubs" className="hover:text-[#d4622b] transition-colors">Sector 62 & 16 Noida</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Headquarters</h4>
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

      {/* ━━━ FLOATING 2025 CONCIERGE DOCK (WITH ENTRY ANIMATION) ━━━ */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        <div className="bg-[#1a1a2e]/90 backdrop-blur-md text-white border border-gray-700/60 rounded-full px-5 py-2.5 shadow-2xl flex items-center gap-4 pointer-events-auto text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-gray-200 hidden sm:inline">15+ NCR Hubs Open</span>
          </div>

          <div className="h-3.5 w-px bg-gray-600 hidden sm:block" />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => triggerBooking(undefined, true)}
            className="px-3.5 py-1.5 rounded-full bg-[#d4622b] hover:bg-[#b8501f] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>2-Day Free Trial</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => triggerBooking(undefined, false)}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
          >
            Book Tour
          </motion.button>
        </div>
      </motion.div>

      {/* ━━━ TOUR / TRIAL MODAL ━━━ */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ede8e1] p-7 shadow-xl overflow-hidden"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!bookingDone ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#d4622b] uppercase tracking-wider">
                      {isTrialBooking ? "2-Day Free Pass" : "Centre Visit"}
                    </span>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mt-0.5">
                      {isTrialBooking ? "Claim 2-Day Team Trial" : `Visit ${modalTarget}`}
                    </h3>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingDone(true);
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

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#d4622b] text-white font-bold text-xs hover:bg-[#b8501f] transition-all shadow-xs"
                    >
                      {isTrialBooking ? "Claim Free 2-Day Pass" : "Confirm Tour Reservation"}
                    </motion.button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e]">Request Received!</h3>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                    Thank you! Our leasing team has received your request and will confirm your visit time via phone.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
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





