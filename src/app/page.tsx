"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Wifi,
  Coffee,
  Users,
  Building2,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Layers,
  Zap,
  Clock,
  Star,
  X,
  Sliders,
  Monitor,
  Lock,
  Headphones,
  Check,
  ChevronDown,
  Globe2,
  Flame,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA STRUCTURES & CONTENT
   ═══════════════════════════════════════════════════════════════ */

const dynamicRotatingWords = [
  "Enterprise HQs",
  "Private Suites",
  "High-Growth Teams",
  "Unicorn Founders",
];

const statsData = [
  { value: 15, suffix: "+", label: "Prime NCR Centres", desc: "Delhi • Noida • Gurgaon" },
  { value: 1, suffix: "M+", label: "Sq. Ft. Managed", desc: "Grade-A Workspaces" },
  { value: 250, suffix: "+", label: "Enterprise Brands", desc: "MNCs, Unicorns & Scaleups" },
  { value: 99, suffix: ".9%", label: "Power & Fiber SLA", desc: "Uninterrupted Uptime" },
];

const workspaceSolutions = [
  {
    id: "managed-hq",
    category: "enterprise",
    categoryLabel: "Enterprise HQ",
    title: "Managed Enterprise Office",
    subtitle: "Custom-built, fully branded private floorplates for 50–500+ seats.",
    tagline: "Bespoke Architecture",
    badge: "Most Popular for MNCs",
    specs: ["Custom Brand Identity", "Dedicated Biometric Access", "Private Boardrooms & Executive Cabins", "Tailored IT Infrastructure & Firewall"],
    pricing: "Custom Quote",
    popular: true,
    capacity: "50 – 500+ Desks",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "private-suite",
    category: "teams",
    categoryLabel: "Team Cabins",
    title: "Dedicated Private Suites",
    subtitle: "Lockable, acoustically isolated suites crafted for teams of 4–40.",
    tagline: "Plug & Play Agility",
    badge: "Zero Setup Cost",
    specs: ["Ergonomic Workstations", "Private Whiteboards & Smart TV", "Unlimited Barista Coffee & Pantry", "Complimentary Meeting Room Credits"],
    pricing: "From ₹9,999 / desk",
    popular: false,
    capacity: "4 – 40 Seats",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "executive-cabin",
    category: "executive",
    categoryLabel: "Leadership",
    title: "Executive Director Cabins",
    subtitle: "Prestigious corner suites for founders, C-suite executives, and partners.",
    tagline: "C-Level Prestige",
    badge: "Acoustic Isolation",
    specs: ["Italian Leather Seating", "Private Meeting Table", "High-Security Access Control", "Concierge Priority Support"],
    pricing: "From ₹24,999 / mo",
    popular: false,
    capacity: "1 – 4 Leaders",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coworking-desk",
    category: "flexible",
    categoryLabel: "Dedicated Desks",
    title: "Dedicated Coworking Desks",
    subtitle: "Your reserved high-productivity workstation in a vibrant community.",
    tagline: "Community & Focus",
    badge: "24/7 Access",
    specs: ["Ergonomic Task Chair & Lockers", "1Gbps Redundant Multi-ISP Wi-Fi", "Networking Events & Community App", "Free Printing & Scanning Access"],
    pricing: "From ₹7,499 / mo",
    popular: false,
    capacity: "1 – 10 Seats",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "virtual-office",
    category: "flexible",
    categoryLabel: "Virtual Address",
    title: "Virtual Office & GST Plan",
    subtitle: "Prime commercial business address with GST & MCA compliant documentation.",
    tagline: "Prestigious Compliance",
    badge: "Instant Registration",
    specs: ["Prime Delhi NCR Business Address", "Courier & Mail Handling Services", "Complimentary Day Pass Credits", "Dedicated Landline Answering"],
    pricing: "From ₹1,299 / mo",
    popular: false,
    capacity: "Virtual / Remote",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "conference-hub",
    category: "enterprise",
    categoryLabel: "On-Demand",
    title: "High-Tech Boardrooms & Events",
    subtitle: "State-of-the-art meeting rooms and amphitheaters with 4K AV conferencing.",
    tagline: "4K Hybrid Tech",
    badge: "Hourly & Full Day",
    specs: ["4K Polycom/Logitech AV Systems", "Wireless Casting & Digital Boards", "Catering & Beverage Concierge", "Flexible Seating from 6 to 80 Pax"],
    pricing: "From ₹799 / hr",
    popular: false,
    capacity: "6 – 80 Pax",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80",
  },
];

const locationHubs = {
  delhi: {
    city: "Delhi",
    description: "Capital city hubs strategically connected to Magenta, Violet & Blue Metro lines.",
    centres: [
      {
        name: "Okhla Phase II",
        metro: "2 mins from Harkesh Nagar Okhla Metro",
        address: "D-184, Okhla Industrial Area, Phase-II, New Delhi",
        sqft: "45,000+ sq.ft",
        tags: ["Metro Adjacent", "Enterprise Floorplates", "Gaming Lounge"],
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Okhla Phase III",
        metro: "3 mins from NSIC Okhla Metro",
        address: "B-216, Okhla Phase III, New Delhi",
        sqft: "38,000+ sq.ft",
        tags: ["Tech Cluster", "Private Suites", "Café Terrace"],
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Mohan Cooperative",
        metro: "1 min from Mohan Estate Metro",
        address: "Mathura Road, Mohan Cooperative Industrial Estate, New Delhi",
        sqft: "60,000+ sq.ft",
        tags: ["Large Format HQ", "Ample Parking", "Auditorium"],
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Connaught Place",
        metro: "Rajiv Chowk Interchange",
        address: "Outer Circle, Connaught Place, Central Delhi",
        sqft: "25,000+ sq.ft",
        tags: ["Central CBD", "Executive Cabins", "VIP Boardrooms"],
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  gurgaon: {
    city: "Gurgaon",
    description: "Corporate nerve center in Millennium City near DLF CyberHub & Expressway.",
    centres: [
      {
        name: "Cyber City / DLF",
        metro: "2 mins from IndusInd Cyber City Rapid Metro",
        address: "DLF Cyber City, Sector 24, Gurugram",
        sqft: "55,000+ sq.ft",
        tags: ["Fortune 500 Corridor", "Dedicated High-Speed Fiber", "Rooftop Deck"],
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Udyog Vihar Phase IV",
        metro: "5 mins from Shankar Chowk / CyberHub",
        address: "Plot 304, Udyog Vihar Phase-IV, Gurugram",
        sqft: "40,000+ sq.ft",
        tags: ["Startup Hub", "24/7 Security", "Podcast Studio"],
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Golf Course Extension",
        metro: "Sector 55-56 Rapid Metro",
        address: "Golf Course Ext Rd, Sector 65, Gurugram",
        sqft: "32,000+ sq.ft",
        tags: ["Ultra Premium", "Wellness Zone", "EV Charging"],
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  noida: {
    city: "Noida",
    description: "High-tech expressway corridors with seamless connectivity to Central Delhi.",
    centres: [
      {
        name: "Sector 62 IT Hub",
        metro: "Electronic City Metro Station (3 mins)",
        address: "C-Block, Institutional Area, Sector 62, Noida",
        sqft: "50,000+ sq.ft",
        tags: ["IT Park", "MNC Floorplates", "Artisan Cafeteria"],
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Sector 16 Metro Corridor",
        metro: "1 min walk from Sector 16 Metro",
        address: "Film City Marg, Sector 16, Noida",
        sqft: "30,000+ sq.ft",
        tags: ["Media Hub", "Turnkey Cabins", "Zero Commute Delay"],
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Sector 132 Expressway",
        metro: "Noida-Greater Noida Expressway",
        address: "Expressway Corporate Park, Sector 132, Noida",
        sqft: "65,000+ sq.ft",
        tags: ["Mega Campus", "Green Building", "Executive Suites"],
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
};

const enterpriseAmenities = [
  {
    icon: Wifi,
    title: "1Gbps Redundant Fiber",
    desc: "Dual-ISP enterprise lines with automatic failover and dedicated firewall protection.",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Headphones,
    title: "Acoustic Zoom & Call Pods",
    desc: "Studio-engineered soundproof phone booths for uninterrupted client and investor calls.",
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Coffee,
    title: "Artisan Barista & Pantry",
    desc: "Unlimited organic coffees, gourmet herbal teas, micro-kitchens, and healthy snacking stations.",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Lock,
    title: "24/7 Biometric Security",
    desc: "AI facial recognition turnstiles, 360° HD surveillance, and smart access cards for your team.",
    accent: "from-purple-500/20 to-indigo-500/10",
  },
  {
    icon: Monitor,
    title: "4K Hybrid Boardrooms",
    desc: "Interactive touch display boards, Polycom 4K studio cameras, and automated booking.",
    accent: "from-rose-500/20 to-pink-500/10",
  },
  {
    icon: Zap,
    title: "100% Power Redundancy",
    desc: "Tier-3 dual diesel generator backup + industrial online UPS ensuring 0-second blackout downtime.",
    accent: "from-yellow-500/20 to-amber-500/10",
  },
];

const testimonialsData = [
  {
    name: "Varun Puri",
    role: "Founder & CEO",
    company: "Dangal Games",
    quote: "Onward transformed how our 120-person engineering and product team operates. The seamless IT infrastructure, acoustic cabins, and vibrant environment gave us the agility to scale rapidly across NCR.",
    rating: 5,
    seats: "120 Seats Managed",
  },
  {
    name: "Abhinay Nagwekar",
    role: "Head of Procurement & Infra",
    company: "Aramex India",
    quote: "Switching our regional headquarters to Onward Workspaces was the best strategic real estate decision. Zero setup headaches, 100% uptime, and meticulous hospitality for our leadership team.",
    rating: 5,
    seats: "Enterprise Wing",
  },
  {
    name: "Prasenjit Das Gupta",
    role: "Head Commercial Operations",
    company: "Thermax Limited",
    quote: "The strategic location near the metro, top-tier meeting facilities, and transparent terms made Onward an easy choice. Our clients and leadership are always impressed when they visit.",
    rating: 5,
    seats: "Custom Corporate Floor",
  },
];

const enterpriseLogos = [
  "Dangal Games",
  "Aramex",
  "Thermax",
  "Razorpay",
  "InnovateLabs",
  "GlobalSoft Technologies",
  "NexGen AI",
  "FinVeda Capital",
];

const faqItems = [
  {
    q: "How fast can my team move into an Onward Workspace?",
    a: "For Private Suites and Dedicated Desks, you can move in immediately within 24 hours. For custom-built Enterprise Managed Offices (50–500+ seats), our design and build team delivers bespoke turnkeys in 3 to 5 weeks.",
  },
  {
    q: "What is included in the monthly workspace membership fee?",
    a: "Everything is covered in one consolidated invoice: ergonomic furniture, 1Gbps redundant internet, electricity & 100% power backup, daily housekeeping, security, unlimited barista coffee & tea, reception services, and meeting room credits.",
  },
  {
    q: "Can I get GST and MCA company registration documents for a Virtual Office?",
    a: "Yes. Our Virtual Office packages provide complete legal documentation including Rent Agreement, NOC, and Electricity Bill for GST registration, ROC filings, and bank account opening in Delhi NCR.",
  },
  {
    q: "Do you offer flexible lease terms instead of 3-year lock-ins?",
    a: "Yes! We offer flexible tenures ranging from monthly rolling passes to 6-month, 1-year, or multi-year enterprise managed agreements with zero hidden maintenance charges.",
  },
  {
    q: "How can I book a free physical tour of the centres?",
    a: "You can click any 'Book a Tour' button on this page, choose your preferred hub and date, or directly call our team at +91 9910668152 to schedule an executive walkthrough with complimentary day-pass access.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   HELPER ANIMATION PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

function RevealMotion({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CounterNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const steps = 60;
    const stepVal = target / steps;
    const intervalTime = duration / steps;
    const timer = setInterval(() => {
      start += stepVal;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);
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
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSolutionCategory, setActiveSolutionCategory] = useState<string>("all");
  const [activeCityTab, setActiveCityTab] = useState<"delhi" | "gurgaon" | "noida">("delhi");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Space Estimator State
  const [teamSize, setTeamSize] = useState<number>(25);
  const [estimatorCity, setEstimatorCity] = useState<string>("Delhi");
  const [workspaceType, setWorkspaceType] = useState<"managed" | "private" | "desk">("managed");

  // Tour Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectedHub, setModalSelectedHub] = useState("Okhla Phase II, Delhi");
  const [bookingStep, setBookingStep] = useState<"form" | "success">("form");

  // Horizontal Solutions Slider Ref & Drag State
  const solutionsTrackRef = useRef<HTMLDivElement>(null);
  const [solutionScrollProgress, setSolutionScrollProgress] = useState(0);

  // Horizontal Locations Slider Ref
  const locationsTrackRef = useRef<HTMLDivElement>(null);

  // Scroll hero animation
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroContainerRef, offset: ["start start", "end start"] });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // Dynamic Word Switcher & Scroll Event
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % dynamicRotatingWords.length);
    }, 2500);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(wordTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filtered Solutions
  const filteredSolutions = useMemo(() => {
    if (activeSolutionCategory === "all") return workspaceSolutions;
    return workspaceSolutions.filter((s) => s.category === activeSolutionCategory);
  }, [activeSolutionCategory]);

  // Solution Track Horizontal Scroll listener
  const handleSolutionScroll = () => {
    if (solutionsTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = solutionsTrackRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setSolutionScrollProgress(Math.min(Math.max(progress, 0), 1));
    }
  };

  const scrollSolutions = (direction: "left" | "right") => {
    if (solutionsTrackRef.current) {
      const offset = 420;
      solutionsTrackRef.current.scrollBy({
        left: direction === "right" ? offset : -offset,
        behavior: "smooth",
      });
    }
  };

  const scrollLocations = (direction: "left" | "right") => {
    if (locationsTrackRef.current) {
      const offset = 380;
      locationsTrackRef.current.scrollBy({
        left: direction === "right" ? offset : -offset,
        behavior: "smooth",
      });
    }
  };

  // Estimated Calculations
  const calculatedSpecs = useMemo(() => {
    let sqft = teamSize * 70;
    if (workspaceType === "managed") sqft = teamSize * 85;
    if (workspaceType === "desk") sqft = teamSize * 45;

    const cabins = Math.max(1, Math.floor(teamSize / 10));
    const meetingRooms = Math.max(1, Math.floor(teamSize / 18));
    const phonePods = Math.max(1, Math.floor(teamSize / 12));

    return {
      sqft: sqft.toLocaleString(),
      cabins,
      meetingRooms,
      phonePods,
      estMonthly: (teamSize * (workspaceType === "managed" ? 11500 : workspaceType === "private" ? 9500 : 7500)).toLocaleString(),
    };
  }, [teamSize, workspaceType]);

  const openBookingModal = (hubName?: string) => {
    if (hubName) setModalSelectedHub(hubName);
    setBookingStep("form");
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-[#ea580c] selection:text-white font-sans relative overflow-x-hidden">
      
      {/* ━━━ AMBIENT HYPERFRAME GLOW OVERLAYS ━━━ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#ea580c]/12 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] bg-[#f97316]/8 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-[#c2410c]/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 hyper-grid opacity-30" />
      </div>

      {/* ━━━ TOP FLOATING DYNAMIC ISLAND NAVIGATION ━━━ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300"
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-5 sm:px-7 py-3 flex items-center justify-between ${
            scrolled
              ? "bg-[#0c101b]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
              : "bg-[#0f1422]/60 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#9a3412] p-0.5 shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center">
                <img src="/onward-logo.png" alt="Onward Logo" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#ea580c] transition-colors">
                  Onward
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#ea580c]/20 text-[#f97316] border border-[#ea580c]/30">
                  DEMO HQ
                </span>
              </div>
              <span className="block text-[10px] tracking-[0.25em] text-slate-400 font-medium -mt-0.5">
                WORKSPACES
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#solutions" className="hover:text-[#ea580c] transition-colors flex items-center gap-1.5">
              <span>Solutions</span>
              <span className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded-full">6</span>
            </a>
            <a href="#estimator" className="hover:text-[#ea580c] transition-colors flex items-center gap-1.5">
              <span>Space Calculator</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-ping" />
            </a>
            <a href="#locations" className="hover:text-[#ea580c] transition-colors">
              NCR Hubs
            </a>
            <a href="#amenities" className="hover:text-[#ea580c] transition-colors">
              Enterprise Specs
            </a>
            <a href="#reviews" className="hover:text-[#ea580c] transition-colors">
              Clients
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919910668152"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>+91 9910668152</span>
            </a>

            <button
              onClick={() => openBookingModal()}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(234,88,12,0.35)] hover:shadow-[0_0_35px_rgba(234,88,12,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Book Free Tour</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <div className="w-5 h-4 flex flex-col justify-between"><span className="w-full h-0.5 bg-white rounded-full"/><span className="w-3/4 h-0.5 bg-white rounded-full"/><span className="w-full h-0.5 bg-white rounded-full"/></div>}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-2 p-5 rounded-2xl bg-[#0c101b]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-4"
            >
              <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                {[
                  { name: "Solutions", href: "#solutions" },
                  { name: "Space Calculator", href: "#estimator" },
                  { name: "NCR Hubs", href: "#locations" },
                  { name: "Amenities", href: "#amenities" },
                  { name: "Testimonials", href: "#reviews" },
                  { name: "Contact", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-white/5 text-slate-200 hover:bg-[#ea580c]/20 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookingModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold text-center text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Workspace Tour
                </button>
                <a
                  href="tel:+919910668152"
                  className="w-full py-2.5 rounded-xl bg-white/5 text-slate-300 font-semibold text-center text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
                  Call Support: +91 9910668152
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ━━━ HERO SECTION (HYPERFRAME SPLIT SCREEN) ━━━ */}
      <section
        id="home"
        ref={heroContainerRef}
        className="relative pt-32 sm:pt-40 pb-20 lg:pb-32 z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold Headline & CTAs */}
            <div className="lg:col-span-7 space-y-8">
              <RevealMotion delay={0.1}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ea580c]" />
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    Premium Managed & Coworking Offices in Delhi NCR
                  </span>
                </div>
              </RevealMotion>

              <RevealMotion delay={0.2}>
                <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white leading-[1.08]">
                  Architected for{" "}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-[#fb923c] to-[#f97316]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroIndex}
                        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                        transition={{ duration: 0.45 }}
                        className="inline-block"
                      >
                        {dynamicRotatingWords[heroIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <br />
                  that refuse to settle.
                </h1>
              </RevealMotion>

              <RevealMotion delay={0.3}>
                <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                  Turnkey private suites, custom-managed enterprise floorplates, and vibrant coworking hubs across prime locations in Delhi, Noida, and Gurgaon. Equipped with Tier-1 infrastructure and zero setup overhead.
                </p>
              </RevealMotion>

              {/* Action Buttons */}
              <RevealMotion delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => openBookingModal()}
                    className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(234,88,12,0.4)] hover:shadow-[0_0_50px_rgba(234,88,12,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Schedule an Executive Tour</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#estimator"
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 font-semibold text-sm transition-all"
                  >
                    <Sliders className="w-4 h-4 text-[#ea580c]" />
                    <span>Calculate Space & Budget</span>
                  </a>
                </div>
              </RevealMotion>

              {/* Trust Micro-Metrics */}
              <RevealMotion delay={0.5}>
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
                    <span>Zero Brokerage & Setup Cost</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
                    <span>100% Power & Fiber SLA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ea580c]" />
                    <span>2-Day Free Trial Available</span>
                  </div>
                </div>
              </RevealMotion>
            </div>

            {/* Right Column: Hyperframe Interactive Visual Showcase */}
            <motion.div
              style={{ y: heroParallaxY }}
              className="lg:col-span-5 relative"
            >
              <RevealMotion delay={0.35}>
                <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
                  
                  {/* Glassmorphic Card Body */}
                  <div className="rounded-[22px] bg-[#0c111e]/90 backdrop-blur-xl border border-white/10 p-6 space-y-6 overflow-hidden relative">
                    
                    {/* Floating Glow Inside Card */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#ea580c]/20 rounded-full blur-[80px] pointer-events-none" />

                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ea580c]/15 border border-[#ea580c]/30 flex items-center justify-center text-[#ea580c]">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Okhla Phase II Campus</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#ea580c]" /> New Delhi • Metro Connected
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ● 98.4% Occupancy
                      </span>
                    </div>

                    {/* Image Mockup with Badge Overlay */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] group">
                      <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                        alt="Onward Managed Workspace"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />

                      {/* Floating Inset Badge */}
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0b0f19]/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-[#ea580c]" />
                          <span className="font-semibold text-white">Executive Suite 402</span>
                        </div>
                        <span className="text-[#ea580c] font-bold">Available Now</span>
                      </div>
                    </div>

                    {/* Interactive Live Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-lg font-extrabold text-[#ea580c]">1Gbps</div>
                        <div className="text-[10px] text-slate-400">Fiber Speed</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-lg font-extrabold text-white">24/7</div>
                        <div className="text-[10px] text-slate-400">Bio Access</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-lg font-extrabold text-emerald-400">Grade A</div>
                        <div className="text-[10px] text-slate-400">Facility</div>
                      </div>
                    </div>

                    {/* Quick Action Button inside preview */}
                    <button
                      onClick={() => openBookingModal("Okhla Phase II, Delhi")}
                      className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#ea580c] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <span>Explore this Centre Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </RevealMotion>
            </motion.div>
          </div>

          {/* Bottom Stats Strip with Animated Numbers */}
          <div className="mt-16 sm:mt-24 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {statsData.map((stat, i) => (
                <RevealMotion key={stat.label} delay={0.1 * i}>
                  <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#ea580c]/30 transition-colors group">
                    <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#ea580c]">
                      <CounterNumber target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-bold text-white mt-1">{stat.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stat.desc}</div>
                  </div>
                </RevealMotion>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ HORIZONTAL WORKSPACE SOLUTIONS SLIDER ━━━ */}
      <section id="solutions" className="py-24 sm:py-32 relative z-10 bg-[#090d16] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* Section Header with Category Tabs & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5" />
                Flexible Workspace Configurations
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Designed for your team&apos;s <span className="text-[#ea580c]">momentum.</span>
              </h2>
            </div>

            {/* Navigation Buttons for Horizontal Scroll */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollSolutions("left")}
                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-colors active:scale-95"
                aria-label="Previous solution"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSolutions("right")}
                className="w-12 h-12 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-colors active:scale-95"
                aria-label="Next solution"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
            {[
              { id: "all", label: "All Formats" },
              { id: "enterprise", label: "Enterprise & Managed HQ" },
              { id: "teams", label: "Private Team Suites" },
              { id: "executive", label: "Executive Cabins" },
              { id: "flexible", label: "Coworking & Virtual" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSolutionCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeSolutionCategory === tab.id
                    ? "bg-[#ea580c] text-white shadow-[0_0_20px_rgba(234,88,12,0.35)]"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Horizontal Drag/Scroll Track */}
          <div
            ref={solutionsTrackRef}
            onScroll={handleSolutionScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 pt-2 -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
          >
            {filteredSolutions.map((sol) => (
              <div
                key={sol.id}
                className="w-[340px] sm:w-[400px] flex-shrink-0 rounded-3xl bg-[#0d121f] border border-white/10 hover:border-[#ea580c]/50 p-6 flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(234,88,12,0.15)] relative overflow-hidden"
              >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#ea580c]/5 rounded-full blur-[60px] group-hover:bg-[#ea580c]/15 transition-all duration-500" />

                <div>
                  {/* Top Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5">
                    <img
                      src={sol.image}
                      alt={sol.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-transparent to-transparent opacity-70" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0b0e17]/80 backdrop-blur-md text-[#ea580c] border border-[#ea580c]/30">
                        {sol.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      {sol.capacity}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="text-[11px] font-bold text-[#ea580c] uppercase tracking-widest mb-1">
                    {sol.tagline}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {sol.subtitle}
                  </p>

                  {/* Spec Checklist */}
                  <div className="mt-5 space-y-2.5 pt-4 border-t border-white/5">
                    {sol.specs.map((spec) => (
                      <div key={spec} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-medium">Pricing</span>
                    <span className="text-sm font-extrabold text-white">{sol.pricing}</span>
                  </div>

                  <button
                    onClick={() => openBookingModal(sol.title)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#ea580c] text-white text-xs font-bold transition-all group-hover:shadow-[0_0_20px_rgba(234,88,12,0.35)]"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Scroll Track Bar */}
          <div className="mt-6 flex items-center gap-4 max-w-xs mx-auto">
            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ea580c] transition-all duration-150"
                style={{ width: `${Math.max(15, solutionScrollProgress * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold text-slate-400">Swipe to explore</span>
          </div>
        </div>
      </section>

      {/* ━━━ INTERACTIVE SPACE & PRICING ESTIMATOR ━━━ */}
      <section id="estimator" className="py-24 sm:py-32 relative z-10 bg-[#07090e]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <RevealMotion>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-3">
                <Sliders className="w-3.5 h-3.5" />
                Interactive Workspace Estimator
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Calculate your ideal <span className="text-[#ea580c]">floorplate</span> & budget.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-4">
                Slide your team size to view recommended area footprint, cabin requirements, meeting zones, and estimated turnkey package.
              </p>
            </RevealMotion>
          </div>

          {/* Interactive Calculator Box */}
          <RevealMotion delay={0.2}>
            <div className="rounded-3xl bg-[#0e1322] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ea580c]/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="grid lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Column: Interactive Controls */}
                <div className="lg:col-span-6 space-y-8">
                  
                  {/* Slider: Team Size */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#ea580c]" /> Team Size
                      </label>
                      <span className="text-xl font-extrabold text-[#ea580c] px-3 py-1 rounded-xl bg-[#ea580c]/10 border border-[#ea580c]/20">
                        {teamSize} Members
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={150}
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ea580c]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-medium">
                      <span>1 Seat (Founder)</span>
                      <span>50 Seats (Growth)</span>
                      <span>150+ Seats (Enterprise)</span>
                    </div>
                  </div>

                  {/* Workspace Format Selector */}
                  <div>
                    <label className="text-sm font-bold text-white block mb-3">
                      Workspace Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: "managed", label: "Managed HQ", desc: "Custom Private Floor" },
                        { id: "private", label: "Private Suite", desc: "Lockable Cabin" },
                        { id: "desk", label: "Dedicated Desks", desc: "Shared Floor" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setWorkspaceType(type.id as any)}
                          className={`p-3 rounded-2xl text-left border transition-all ${
                            workspaceType === type.id
                              ? "bg-[#ea580c]/15 border-[#ea580c] text-white shadow-[0_0_20px_rgba(234,88,12,0.2)]"
                              : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{type.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{type.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* City Hub Selector */}
                  <div>
                    <label className="text-sm font-bold text-white block mb-3">
                      Preferred NCR City
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {["Delhi", "Gurgaon", "Noida"].map((city) => (
                        <button
                          key={city}
                          onClick={() => setEstimatorCity(city)}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                            estimatorCity === city
                              ? "bg-white/15 border-white/30 text-white"
                              : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Dynamic Live Estimate Blueprint */}
                <div className="lg:col-span-6 rounded-2xl bg-[#090c16] border border-white/10 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Architectural Recommendation</span>
                      <h4 className="text-lg font-bold text-white">Estimated Layout for {teamSize} Pax</h4>
                    </div>
                    <span className="text-xs font-bold text-[#ea580c] bg-[#ea580c]/10 px-3 py-1 rounded-full">
                      {estimatorCity}
                    </span>
                  </div>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/5 text-center">
                      <div className="text-xs text-slate-400">Estimated Area</div>
                      <div className="text-base font-extrabold text-white mt-1">{calculatedSpecs.sqft} sq.ft</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 text-center">
                      <div className="text-xs text-slate-400">Private Cabins</div>
                      <div className="text-base font-extrabold text-white mt-1">{calculatedSpecs.cabins} Cabins</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 text-center">
                      <div className="text-xs text-slate-400">Meeting Rooms</div>
                      <div className="text-base font-extrabold text-white mt-1">{calculatedSpecs.meetingRooms} Hubs</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 text-center">
                      <div className="text-xs text-slate-400">Phone Pods</div>
                      <div className="text-base font-extrabold text-white mt-1">{calculatedSpecs.phonePods} Pods</div>
                    </div>
                  </div>

                  {/* Perks Checklist */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Includes 1Gbps Redundant Tier-1 Fiber & Wi-Fi 6</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Unlimited Artisanal Espresso, Green Teas & Pantry Supplies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Dedicated Housekeeping, Biometric Control & Reception Support</span>
                    </div>
                  </div>

                  {/* Estimate CTA */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400">Estimated Turnkey Package</span>
                      <div className="text-xl font-extrabold text-[#ea580c]">
                        ₹{calculatedSpecs.estMonthly} <span className="text-xs text-slate-400 font-normal">/ month (approx)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openBookingModal(`Custom ${teamSize}-Seat Plan in ${estimatorCity}`)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold text-xs shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Lock In Custom Proposal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </RevealMotion>

        </div>
      </section>

      {/* ━━━ HORIZONTAL LOCATION HUBS NAVIGATOR ━━━ */}
      <section id="locations" className="py-24 sm:py-32 relative z-10 bg-[#090d16] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5" />
                Strategic NCR Connectivity
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Our Prime Hubs across <span className="text-[#ea580c]">Delhi NCR.</span>
              </h2>
            </div>

            {/* City Tabs & Arrows */}
            <div className="flex items-center gap-4">
              <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
                {(["delhi", "gurgaon", "noida"] as const).map((cityKey) => (
                  <button
                    key={cityKey}
                    onClick={() => setActiveCityTab(cityKey)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      activeCityTab === cityKey
                        ? "bg-[#ea580c] text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {cityKey}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollLocations("left")}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10"
                  aria-label="Previous location"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollLocations("right")}
                  className="w-10 h-10 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center"
                  aria-label="Next location"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Subtitle Description */}
          <p className="text-slate-400 text-sm mb-8 max-w-2xl">
            {locationHubs[activeCityTab].description}
          </p>

          {/* Horizontal Track of Centres */}
          <div
            ref={locationsTrackRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
          >
            {locationHubs[activeCityTab].centres.map((centre) => (
              <div
                key={centre.name}
                className="w-[320px] sm:w-[360px] flex-shrink-0 rounded-3xl bg-[#0e1322] border border-white/10 hover:border-[#ea580c]/40 p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl"
              >
                <div>
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4">
                    <img
                      src={centre.image}
                      alt={centre.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1322] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{centre.rating} Rating</span>
                    </div>

                    <div className="absolute bottom-3 right-3 text-[10px] font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded">
                      {centre.sqft}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#ea580c] transition-colors">
                    {centre.name}
                  </h3>

                  <div className="mt-2 text-xs text-[#f97316] font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{centre.metro}</span>
                  </div>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {centre.address}
                  </p>

                  {/* Highlights Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {centre.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Open for Tours</span>
                  <button
                    onClick={() => openBookingModal(`${centre.name}, ${locationHubs[activeCityTab].city}`)}
                    className="flex items-center gap-1 text-xs font-bold text-[#ea580c] hover:text-white transition-colors"
                  >
                    <span>Schedule Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ ENTERPRISE SPECS & AMENITIES BENTO GRID ━━━ */}
      <section id="amenities" className="py-24 sm:py-32 relative z-10 bg-[#07090e]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <RevealMotion>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Enterprise Infrastructure
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Built to elevate <span className="text-[#ea580c]">focus & productivity.</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-4">
                Engineered with enterprise grade power redundancy, studio acoustic isolation, and premium hospitality.
              </p>
            </RevealMotion>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseAmenities.map((amenity, i) => {
              const IconComp = amenity.icon;
              return (
                <RevealMotion key={amenity.title} delay={0.08 * i}>
                  <div className="h-full rounded-3xl bg-[#0c101d] border border-white/10 p-8 flex flex-col justify-between group hover:border-[#ea580c]/40 transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(234,88,12,0.15)] relative overflow-hidden">
                    <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br ${amenity.accent} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ea580c] group-hover:scale-110 transition-transform mb-6">
                        <IconComp className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">
                        {amenity.title}
                      </h3>

                      <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                        {amenity.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                      <span>Enterprise Grade Inclusion</span>
                      <Check className="w-3.5 h-3.5 text-[#ea580c]" />
                    </div>
                  </div>
                </RevealMotion>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ CLIENT LOGOS & TESTIMONIALS ━━━ */}
      <section id="reviews" className="py-24 relative z-10 bg-[#090d16] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14 text-center">
          <RevealMotion>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-[#ea580c]" />
              Trusted by 250+ Enterprise Leaders
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Real stories from high-growth founders.
            </h2>
          </RevealMotion>
        </div>

        {/* Enterprise Logos Marquee */}
        <div className="mb-16 overflow-hidden whitespace-nowrap opacity-60">
          <motion.div
            className="inline-flex gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[...enterpriseLogos, ...enterpriseLogos].map((logo, idx) => (
              <span key={idx} className="text-xl font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
                {logo}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-3 gap-6">
          {testimonialsData.map((t, idx) => (
            <RevealMotion key={t.name} delay={0.1 * idx}>
              <div className="h-full rounded-3xl bg-[#0e1322] border border-white/10 p-8 flex flex-col justify-between group hover:border-[#ea580c]/30 transition-all">
                <div>
                  <div className="flex items-center gap-1 mb-6 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ea580c] to-[#9a3412] flex items-center justify-center text-white font-extrabold text-sm">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-[#ea580c] font-medium">{t.role}, {t.company}</div>
                    <div className="text-[10px] text-slate-400">{t.seats}</div>
                  </div>
                </div>
              </div>
            </RevealMotion>
          ))}
        </div>
      </section>

      {/* ━━━ INTERACTIVE FAQ ACCORDION ━━━ */}
      <section className="py-24 sm:py-32 relative z-10 bg-[#07090e]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <RevealMotion>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                Everything you need to know about leases, onboarding, and workspace amenities.
              </p>
            </RevealMotion>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0c101c] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white text-base hover:text-[#ea580c] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180 text-[#ea580c]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CONTACT & TOUR BOOKING SECTION ━━━ */}
      <section id="contact" className="py-24 sm:py-32 relative z-10 bg-[#090d16] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 text-[#ea580c] text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                Schedule a Visit
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Ready to upgrade your workspace?
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect with our commercial leasing team for a tailored workspace walkthrough, floor plans, and instant pricing proposals.
              </p>

              <div className="space-y-4 pt-4">
                <a
                  href="tel:+919910668152"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ea580c]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Leasing Line</div>
                    <div className="text-base font-bold text-white">+91 9910668152</div>
                  </div>
                </a>

                <a
                  href="mailto:info@onwardworkspaces.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ea580c]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Official Correspondence</div>
                    <div className="text-base font-bold text-white">info@onwardworkspaces.com</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Consultation Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#0e1322] border border-white/10 p-8 sm:p-10 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Book an On-Site Hub Tour</h3>
                <p className="text-xs text-slate-400 mb-6">Receive a complimentary day pass and coffee with your consultation.</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingStep("success");
                    setIsModalOpen(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ea580c] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1.5">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ea580c] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ea580c] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1.5">Preferred Centre</label>
                      <select
                        className="w-full bg-[#0d111b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ea580c] transition-colors"
                      >
                        <option value="Okhla Phase II, Delhi">Okhla Phase II (Delhi)</option>
                        <option value="Okhla Phase III, Delhi">Okhla Phase III (Delhi)</option>
                        <option value="Mohan Cooperative, Delhi">Mohan Cooperative (Delhi)</option>
                        <option value="Connaught Place, Delhi">Connaught Place (Central Delhi)</option>
                        <option value="Cyber City, Gurgaon">DLF Cyber City (Gurgaon)</option>
                        <option value="Udyog Vihar, Gurgaon">Udyog Vihar (Gurgaon)</option>
                        <option value="Sector 62, Noida">Sector 62 (Noida)</option>
                        <option value="Sector 16, Noida">Sector 16 (Noida)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1.5">Team Size & Specific Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 35 workstations, 2 director cabins, need move-in next month..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ea580c] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold text-sm shadow-[0_0_30px_rgba(234,88,12,0.35)] hover:shadow-[0_0_45px_rgba(234,88,12,0.5)] transition-all duration-300"
                  >
                    Confirm Tour Reservation
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[#05070a] border-t border-white/10 py-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/onward-logo.png" alt="Onward Logo" className="w-8 h-8 object-contain" />
                <div>
                  <span className="text-base font-bold text-white">Onward Workspaces</span>
                  <span className="block text-[9px] tracking-[0.2em] text-slate-500 font-semibold">DELHI NCR</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Premium managed and coworking environments across Delhi, Noida, and Gurgaon. Fueling innovation, enterprise productivity, and community.
              </p>
              <div className="text-xs text-[#ea580c] font-semibold flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> +91 9910668152
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-[11px]">Solutions</h5>
              <ul className="space-y-2.5">
                <li><a href="#solutions" className="hover:text-[#ea580c] transition-colors">Managed Office</a></li>
                <li><a href="#solutions" className="hover:text-[#ea580c] transition-colors">Private Suites</a></li>
                <li><a href="#solutions" className="hover:text-[#ea580c] transition-colors">Executive Cabins</a></li>
                <li><a href="#solutions" className="hover:text-[#ea580c] transition-colors">Virtual Office & GST</a></li>
                <li><a href="#solutions" className="hover:text-[#ea580c] transition-colors">Meeting Rooms</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-[11px]">NCR Locations</h5>
              <ul className="space-y-2.5">
                <li><a href="#locations" className="hover:text-[#ea580c] transition-colors">Okhla Phase II & III</a></li>
                <li><a href="#locations" className="hover:text-[#ea580c] transition-colors">Mohan Cooperative</a></li>
                <li><a href="#locations" className="hover:text-[#ea580c] transition-colors">Connaught Place</a></li>
                <li><a href="#locations" className="hover:text-[#ea580c] transition-colors">Cyber City Gurgaon</a></li>
                <li><a href="#locations" className="hover:text-[#ea580c] transition-colors">Noida Sector 62 & 16</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-[11px]">Company</h5>
              <ul className="space-y-2.5">
                <li><a href="#home" className="hover:text-[#ea580c] transition-colors">About Us</a></li>
                <li><a href="#estimator" className="hover:text-[#ea580c] transition-colors">Space Calculator</a></li>
                <li><a href="#amenities" className="hover:text-[#ea580c] transition-colors">Enterprise SLA</a></li>
                <li><a href="#reviews" className="hover:text-[#ea580c] transition-colors">Member Reviews</a></li>
                <li><a href="#contact" className="hover:text-[#ea580c] transition-colors">Book a Tour</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>&copy; 2025 Onward Workspaces. All rights reserved. Demo Redesign Build.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">GST Compliance</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ━━━ INTERACTIVE BOOKING MODAL ━━━ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0e1322] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingStep === "form" ? (
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1">
                      Schedule Executive Visit
                    </div>
                    <h3 className="text-2xl font-bold text-white">Book a Tour: {modalSelectedHub}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Select your preferred date & time. Our leasing director will host you with complimentary barista coffee.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingStep("success");
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ea580c]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ea580c]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9910668152"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ea580c]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Preferred Date</label>
                        <input
                          type="date"
                          required
                          className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ea580c]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Time Slot</label>
                        <select className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ea580c]">
                          <option>10:00 AM - 12:00 PM</option>
                          <option>12:00 PM - 02:00 PM</option>
                          <option>02:00 PM - 04:00 PM</option>
                          <option>04:00 PM - 06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold text-sm shadow-lg hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all"
                    >
                      Confirm Tour Booking
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Tour Scheduled!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you! Your walkthrough request for <strong className="text-white">{modalSelectedHub}</strong> has been confirmed. Our team will contact you shortly with calendar invites and directions.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
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

