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
  Monitor,
  Lock,
  Headphones,
  Check,
  ChevronDown,
  Globe2,
  Award,
  Compass,
  Image as ImageIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ORIGINAL BRAND DATA & VERIFIED CONTENT (NO PRICING)
   ═══════════════════════════════════════════════════════════════ */

const heroRotatingWords = ["Ambition", "Brand", "People", "Vision", "Growth"];

const statsData = [
  { value: 3, suffix: "+", label: "NCR Cities", sub: "Delhi • Noida • Gurgaon" },
  { value: 15, suffix: "+", label: "Centres", sub: "Prime Commercial Belts" },
  { value: 250, suffix: "+", label: "Clients", sub: "Enterprises & Scaleups" },
  { value: 1, suffix: "M+", label: "Sq. Ft.", sub: "Of Managed Workspace" },
];

const workspaceSolutions = [
  {
    id: "managed-office",
    category: "enterprise",
    categoryLabel: "Enterprise",
    tag: "ENTERPRISE",
    title: "Managed Office",
    desc: "Customised workspace for Enterprise, MNCs & Unicorns with bespoke branding and private infrastructure.",
    badge: "Custom Turnkey",
    capacity: "50 – 500+ Seats",
    terms: "Custom Bespoke Layout",
    popular: true,
    icon: Building2,
    specs: [
      "Custom Brand Identity & Dedicated Reception",
      "Private Executive Boardrooms & Cabins",
      "Dedicated High-Speed Fiber & IT Security",
      "Complete Facility & Asset Management",
    ],
  },
  {
    id: "private-suites",
    category: "teams",
    categoryLabel: "Teams",
    tag: "TEAMS",
    title: "Private Suites",
    desc: "Fully-managed private cabins for teams, offering sound-insulated comfort and plug-and-play agility.",
    badge: "Instant Move-in",
    capacity: "4 – 40 Seats",
    terms: "Flexible Team Leases",
    popular: false,
    icon: Users,
    specs: [
      "Ergonomic Workstations & Storage",
      "Dedicated Access Control & Whiteboards",
      "Unlimited Barista Coffee & Pantry",
      "Complimentary Meeting Room Credits",
    ],
  },
  {
    id: "private-cabins",
    category: "executive",
    categoryLabel: "Leadership",
    tag: "EXECUTIVE",
    title: "Private Cabins",
    desc: "Fully-equipped space for directors and senior leadership, designed for privacy and high-stakes strategy.",
    badge: "Executive Class",
    capacity: "1 – 4 Leaders",
    terms: "Private Acoustic Suites",
    popular: false,
    icon: Award,
    specs: [
      "Italian Leather Executive Seating",
      "Private Consultation Table",
      "Acoustic Sound Isolation",
      "Priority Concierge & Guest Handling",
    ],
  },
  {
    id: "virtual-office",
    category: "flexible",
    categoryLabel: "Remote",
    tag: "REMOTE",
    title: "Virtual Office",
    desc: "Virtual HQ with zero overhead costs. Compliant documentation for GST registration and ROC filings.",
    badge: "GST & MCA Ready",
    capacity: "Virtual / Remote",
    terms: "Annual & Multi-Year Plans",
    popular: false,
    icon: Globe2,
    specs: [
      "Prestigious Delhi NCR Business Address",
      "NOC, Electricity Bill & Rent Agreement",
      "Courier & Mail Receiving Services",
      "Monthly Complimentary Day Passes",
    ],
  },
  {
    id: "on-demand",
    category: "flexible",
    categoryLabel: "Flexible",
    tag: "FLEXIBLE",
    title: "On-Demand & Day Pass",
    desc: "Meeting rooms, conference hubs & day passes on the go with state-of-the-art 4K video conferencing.",
    badge: "Hourly & Daily",
    capacity: "1 – 60 Pax",
    terms: "On-Demand Pay-per-Use",
    popular: false,
    icon: Monitor,
    specs: [
      "4K Polycom/Logitech AV Video Systems",
      "Interactive Digital Smart Boards",
      "High-Speed Wi-Fi & Technical Support",
      "Beverage & Catering Concierge",
    ],
  },
  {
    id: "custom-built",
    category: "enterprise",
    categoryLabel: "Bespoke",
    tag: "BESPOKE",
    title: "Custom Built HQ",
    desc: "Bespoke design and construction tailored specifically to your company's brand, culture, and workflow.",
    badge: "Build-To-Suit",
    capacity: "100 – 1000+ Seats",
    terms: "Turnkey Architecture",
    popular: false,
    icon: Compass,
    specs: [
      "Custom Interior Architecture & Layout",
      "Dedicated IT Server Rooms & Redundancy",
      "Exclusive Cafeteria & Breakout Lounge",
      "Tailored Commercial Agreement",
    ],
  },
];

const whyOnwardFeatures = [
  {
    num: "01",
    title: "Strategic Locations",
    desc: "Vibrant business centers across Delhi, Noida, and Gurgaon — positioned right at major metro stations and commercial arteries where opportunity lives.",
    icon: Compass,
    highlight: "2 mins from Metro stations",
  },
  {
    num: "02",
    title: "Built for Triumph",
    desc: "Every architectural element is crafted to fuel productivity, inspire creativity, eliminate downtime, and drive your team's business growth.",
    icon: Award,
    highlight: "100% Power & Fiber Redundancy",
  },
  {
    num: "03",
    title: "Beyond Ordinary",
    desc: "Futuristic technology, artisan coffee pantries, acoustic phone pods, and bespoke managed spaces that elevate how ambitious teams work.",
    icon: Sparkles,
    highlight: "Zero Setup & Maintenance Overhead",
  },
];

const ncrLocationsData = {
  delhi: {
    city: "Delhi",
    subtitle: "Capital city hubs with direct connectivity to Violet, Magenta & Blue Metro lines.",
    centres: [
      {
        name: "Okhla Phase II (Flagship HQ)",
        metro: "2 mins from Harkesh Nagar Okhla Metro",
        address: "Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020",
        sqft: "45,000+ sq.ft",
        tags: ["Flagship Centre", "Metro Adjacent", "Enterprise Wing", "Café Terrace"],
      },
      {
        name: "Okhla Phase III",
        metro: "3 mins from NSIC Okhla Metro",
        address: "B-216, Okhla Phase III, New Delhi, 110020",
        sqft: "38,000+ sq.ft",
        tags: ["Tech Corridor", "Private Suites", "Gaming Lounge"],
      },
      {
        name: "Mohan Cooperative",
        metro: "1 min walk from Mohan Estate Metro",
        address: "Mathura Road, Mohan Cooperative Industrial Estate, New Delhi",
        sqft: "60,000+ sq.ft",
        tags: ["Large Format Campus", "Ample Parking", "Auditorium"],
      },
      {
        name: "Connaught Place",
        metro: "Rajiv Chowk Interchange",
        address: "Outer Circle, Connaught Place, Central Delhi",
        sqft: "25,000+ sq.ft",
        tags: ["Central CBD", "Executive Cabins", "Prestigious Address"],
      },
    ],
  },
  gurgaon: {
    city: "Gurgaon",
    subtitle: "Millennium City corporate nerve centres near DLF CyberHub & Expressway.",
    centres: [
      {
        name: "DLF Cyber City",
        metro: "2 mins from IndusInd Cyber City Rapid Metro",
        address: "DLF Cyber City, Sector 24, Gurugram, Haryana",
        sqft: "55,000+ sq.ft",
        tags: ["Fortune 500 Hub", "High-Speed Fiber", "Rooftop Lounge"],
      },
      {
        name: "Udyog Vihar Phase IV",
        metro: "5 mins from Shankar Chowk / CyberHub",
        address: "Plot 304, Udyog Vihar Phase-IV, Gurugram",
        sqft: "40,000+ sq.ft",
        tags: ["Startup Cluster", "24/7 Security", "Podcast Studio"],
      },
      {
        name: "Golf Course Extension",
        metro: "Sector 55-56 Rapid Metro",
        address: "Golf Course Extension Road, Sector 65, Gurugram",
        sqft: "32,000+ sq.ft",
        tags: ["Ultra Premium", "Wellness Pods", "EV Charging"],
      },
    ],
  },
  noida: {
    city: "Noida",
    subtitle: "High-tech institutional hubs along prime expressway and metro corridors.",
    centres: [
      {
        name: "Sector 62 IT Hub",
        metro: "3 mins from Electronic City Metro",
        address: "C-Block, Institutional Area, Sector 62, Noida",
        sqft: "50,000+ sq.ft",
        tags: ["IT Park", "Enterprise Floorplates", "Cafeteria"],
      },
      {
        name: "Sector 16 Metro Corridor",
        metro: "1 min walk from Sector 16 Metro",
        address: "Film City Marg, Sector 16, Noida",
        sqft: "30,000+ sq.ft",
        tags: ["Media Hub", "Turnkey Cabins", "Instant Commute"],
      },
      {
        name: "Sector 132 Expressway",
        metro: "Noida-Greater Noida Expressway",
        address: "Expressway Corporate Park, Sector 132, Noida",
        sqft: "65,000+ sq.ft",
        tags: ["Mega Campus", "Green Architecture", "Executive Suites"],
      },
    ],
  },
};

const enterpriseAmenities = [
  {
    icon: Wifi,
    title: "1Gbps Redundant Multi-ISP Fiber",
    desc: "High-speed enterprise lines with dual active failover, dedicated VLANs, and firewall security.",
  },
  {
    icon: Headphones,
    title: "Soundproof Acoustic Zoom Pods",
    desc: "Studio-grade isolated booths designed for crystal-clear confidential client and investor calls.",
  },
  {
    icon: Coffee,
    title: "Unlimited Barista Coffee & Teas",
    desc: "Freshly roasted artisanal coffees, herbal teas, micro-kitchens, and healthy snacking stations.",
  },
  {
    icon: Lock,
    title: "24/7 AI Biometric & CCTV Security",
    desc: "Touchless biometric facial turnstiles, round-the-clock security personnel, and full CCTV coverage.",
  },
  {
    icon: Monitor,
    title: "4K Hybrid Boardrooms & AV",
    desc: "Polycom 4K studio cameras, digital interactive whiteboards, and seamless wireless casting.",
  },
  {
    icon: Zap,
    title: "100% Dual Power Backup",
    desc: "Heavy-duty dual diesel generator sets and industrial online UPS guaranteeing 0-second blackout downtime.",
  },
];

const workspaceGalleryPlaceholders = [
  { title: "Executive Lounge & Café", category: "Hospitality", tag: "Gallery 01", icon: Coffee },
  { title: "Private Team Suite", category: "Workspaces", tag: "Gallery 02", icon: Users },
  { title: "4K Hybrid Boardroom", category: "Meeting Hubs", tag: "Gallery 03", icon: Monitor },
  { title: "Director Private Cabin", category: "Executive", tag: "Gallery 04", icon: Award },
  { title: "Collaboration Deck", category: "Community", tag: "Gallery 05", icon: Layers },
  { title: "Reception & Concierge", category: "Campus", tag: "Gallery 06", icon: Building2 },
];

const clientLogos = [
  "Dangal Games",
  "Aramex",
  "Thermax",
  "Razorpay",
  "InnovateLabs",
  "GlobalSoft",
  "TechCorp",
  "NexGen AI",
];

const testimonialsData = [
  {
    name: "Varun Puri",
    role: "Founder",
    company: "Dangal Games",
    text: "Onward has been a game-changer for our team. The perfect office space for our growth journey across Delhi NCR.",
    rating: 5,
  },
  {
    name: "Abhinay Nagwekar",
    role: "Procurement Lead",
    company: "Aramex",
    text: "Onward exceeded all expectations — meticulously designed spaces with unwavering support and high-speed infrastructure.",
    rating: 5,
  },
  {
    name: "Prasenjit Das Gupta",
    role: "Head Commercial",
    company: "Thermax",
    text: "Transitioning to Onward was our best decision. The environment fosters real collaboration and impressive client impressions.",
    rating: 5,
  },
];

const faqItems = [
  {
    q: "How does the 2-Day Free Trial work?",
    a: "You and your core team can experience working out of any Onward Workspace for 2 full days at zero cost. Enjoy high-speed fiber, meeting room access, and barista coffee to feel the environment before making a decision.",
  },
  {
    q: "How fast can we move our team into an Onward Workspace?",
    a: "Private Suites and Dedicated Desks are plug-and-play ready for immediate same-day or 24-hour move-in. Custom-built Managed Offices (50 to 500+ desks) are delivered in 3 to 4 weeks.",
  },
  {
    q: "What documentation is provided for Virtual Office & GST registration?",
    a: "We provide complete, legally verified documentation including Rent Agreement, NOC from landlord, and latest Electricity Bill compliant with GST Department, ROC, and MCA bank verification.",
  },
  {
    q: "What amenities are included in the monthly membership?",
    a: "Everything is consolidated into one transparent invoice: ergonomic furniture, 1Gbps multi-ISP internet, 100% power backup, daily sanitization & housekeeping, receptionist services, and unlimited tea & coffee.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   3D WIREFRAME, INFLOW STREAM & HYPERFRAME ANIMATION ENGINES
   ═══════════════════════════════════════════════════════════════ */

/* 1. 3D Interactive Isometric Wiring & Inflow Canvas */
function InflowWireGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Inflow particle wires
    const wiresCount = 18;
    const wires: Array<{
      x: number;
      speed: number;
      length: number;
      offset: number;
      color: string;
      width: number;
      amplitude: number;
      frequency: number;
    }> = [];

    for (let i = 0; i < wiresCount; i++) {
      wires.push({
        x: (width / wiresCount) * i + (Math.random() * 60 - 30),
        speed: 0.8 + Math.random() * 1.6,
        length: 120 + Math.random() * 220,
        offset: Math.random() * height,
        color: i % 3 === 0 ? "rgba(212, 98, 43, " : i % 2 === 0 ? "rgba(26, 26, 46, " : "rgba(232, 133, 90, ",
        width: 1 + Math.random() * 1.5,
        amplitude: 15 + Math.random() * 30,
        frequency: 0.003 + Math.random() * 0.005,
      });
    }

    // 3D Isometric Nodes
    const gridSpacing = 90;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Draw subtle isometric background wireframe mesh
      ctx.strokeStyle = "rgba(212, 98, 43, 0.04)";
      ctx.lineWidth = 1;

      for (let x = -width; x < width * 2; x += gridSpacing) {
        ctx.beginPath();
        // 30 degree isometric diagonal wires
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height * 0.8, height);
        ctx.stroke();

        ctx.beginPath();
        // Opposite diagonal wires
        ctx.moveTo(x, 0);
        ctx.lineTo(x - height * 0.8, height);
        ctx.stroke();
      }

      // Draw Inflow Streaming Energy Pulses (coming from top to bottom)
      wires.forEach((w) => {
        w.offset = (w.offset + w.speed) % (height + w.length);

        const gradient = ctx.createLinearGradient(
          w.x,
          w.offset - w.length,
          w.x,
          w.offset
        );
        gradient.addColorStop(0, `${w.color}0)`);
        gradient.addColorStop(0.7, `${w.color}0.4)`);
        gradient.addColorStop(1, `${w.color}0.9)`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = w.width;

        // Draw sinusoidal wire flow
        const startY = Math.max(0, w.offset - w.length);
        const endY = Math.min(height, w.offset);

        ctx.moveTo(w.x + Math.sin(startY * w.frequency + time) * w.amplitude, startY);

        for (let y = startY + 10; y <= endY; y += 10) {
          const currentX = w.x + Math.sin(y * w.frequency + time) * w.amplitude;
          ctx.lineTo(currentX, y);
        }
        ctx.stroke();

        // Glowing pulse head
        if (w.offset <= height) {
          const headX = w.x + Math.sin(w.offset * w.frequency + time) * w.amplitude;
          ctx.beginPath();
          ctx.arc(headX, w.offset, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#d4622b";
          ctx.shadowColor = "#d4622b";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}

/* 2. Rotating 3D Hyperframe Wireframe Polyhedron */
function Floating3DCage({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size, perspective: 800 }}>
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 180],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Wireframe Cube Faces */}
        {[
          { transform: `translateZ(${size / 2}px)` },
          { transform: `rotateY(180deg) translateZ(${size / 2}px)` },
          { transform: `rotateY(90deg) translateZ(${size / 2}px)` },
          { transform: `rotateY(-90deg) translateZ(${size / 2}px)` },
          { transform: `rotateX(90deg) translateZ(${size / 2}px)` },
          { transform: `rotateX(-90deg) translateZ(${size / 2}px)` },
        ].map((face, idx) => (
          <div
            key={idx}
            style={face}
            className="absolute inset-0 border border-[#d4622b]/30 bg-[#d4622b]/[0.03] backdrop-blur-[1px] rounded-lg"
          >
            {/* Corner Node Dots */}
            <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#d4622b] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-xs" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#d4622b] rounded-full translate-x-1/2 -translate-y-1/2 shadow-xs" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#d4622b] rounded-full -translate-x-1/2 translate-y-1/2 shadow-xs" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#d4622b] rounded-full translate-x-1/2 translate-y-1/2 shadow-xs" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* 3. Interactive 3D Architectural Wireframe Model (Hero Showcase) */
function Architectural3DVisual({ onExploreClick }: { onExploreClick: () => void }) {
  const [activeFloor, setActiveFloor] = useState<1 | 2 | 3>(2);

  return (
    <div className="relative rounded-3xl p-6 bg-white border border-[#ede8e1] shadow-[0_20px_60px_-15px_rgba(212,98,43,0.14)] overflow-hidden">
      
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-extrabold text-[#1a1a2e] uppercase tracking-wider">
            3D Hyperframe Live Topology
          </span>
        </div>
        
        {/* Tier Selector */}
        <div className="flex bg-[#faf8f5] p-1 rounded-xl border border-gray-200 text-[11px] font-bold text-gray-500">
          {[
            { id: 1, label: "L1: Lounge & Café" },
            { id: 2, label: "L2: Private Suites" },
            { id: 3, label: "L3: Boardrooms" },
          ].map((floor) => (
            <button
              key={floor.id}
              onClick={() => setActiveFloor(floor.id as any)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeFloor === floor.id
                  ? "bg-[#d4622b] text-white shadow-xs"
                  : "hover:text-[#1a1a2e]"
              }`}
            >
              {floor.label.split(":")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Isometric Viewport Container */}
      <div className="relative h-[280px] sm:h-[320px] bg-gradient-to-b from-[#faf8f5] to-[#f5f0eb] rounded-2xl border border-gray-200/80 flex items-center justify-center overflow-hidden">
        
        {/* Background Radial Radar Ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border border-[#d4622b]/15 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="w-48 h-48 border border-dashed border-[#d4622b]/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          <div className="w-32 h-32 border border-[#d4622b]/25 rounded-full" />
        </div>

        {/* 3D Isometric Stacking Platform */}
        <div
          className="relative w-64 h-48 transition-transform duration-700"
          style={{
            transform: "rotateX(60deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Level 1: Ground Floor / Café Deck */}
          <motion.div
            animate={{
              translateZ: activeFloor === 1 ? 40 : 0,
              opacity: activeFloor === 1 ? 1 : 0.45,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-2xl border-2 border-gray-400 bg-white/70 backdrop-blur-sm shadow-md flex items-center justify-center"
          >
            {/* Grid Floor Lines */}
            <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-1 opacity-30">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border border-gray-500/40 rounded-xs" />
              ))}
            </div>
            <span className="text-[10px] font-extrabold text-gray-700 bg-white px-2 py-0.5 rounded-full border shadow-xs -rotate-45">
              L1: Barista Café & Hot Desks
            </span>
          </motion.div>

          {/* Level 2: Private Team Suites */}
          <motion.div
            animate={{
              translateZ: activeFloor === 2 ? 70 : 35,
              opacity: activeFloor === 2 ? 1 : 0.6,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-2xl border-2 border-[#d4622b] bg-white/80 backdrop-blur-md shadow-xl flex items-center justify-center"
          >
            <div className="absolute inset-2 grid grid-cols-3 grid-rows-2 gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border border-[#d4622b]/40 bg-[#d4622b]/10 rounded-sm flex items-center justify-center"
                >
                  <span className="w-1 h-1 bg-[#d4622b] rounded-full animate-ping" />
                </div>
              ))}
            </div>
            <span className="relative text-[10px] font-extrabold text-[#d4622b] bg-white px-2.5 py-1 rounded-full border border-[#d4622b]/30 shadow-xs -rotate-45">
              L2: Sound-Insulated Team Cabins
            </span>
          </motion.div>

          {/* Level 3: Executive Boardrooms */}
          <motion.div
            animate={{
              translateZ: activeFloor === 3 ? 105 : 70,
              opacity: activeFloor === 3 ? 1 : 0.45,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-2xl border-2 border-[#1a1a2e] bg-white/75 backdrop-blur-sm shadow-md flex items-center justify-center"
          >
            <div className="absolute inset-3 border border-dashed border-[#1a1a2e]/40 rounded-lg flex items-center justify-center">
              <span className="text-[10px] font-extrabold text-[#1a1a2e] bg-white px-2 py-0.5 rounded-full border shadow-xs -rotate-45">
                L3: 4K Hybrid Boardroom
              </span>
            </div>
          </motion.div>

          {/* Inflow Fiber Wire Laser Pulse */}
          <motion.div
            animate={{
              translateZ: [0, 110, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#d4622b] shadow-[0_0_20px_#d4622b]"
          />
        </div>

        {/* Floating Telemetry Badges */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 text-[10px] font-bold text-gray-700 shadow-xs">
          <span className="text-[#d4622b]">⚡ Multi-ISP Inflow:</span> 1.0 Gbps Sync
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 text-[10px] font-bold text-emerald-600 shadow-xs">
          ● Dual Generator Online (0s Failover)
        </div>
      </div>

      {/* Specs Strip */}
      <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#faf8f5] rounded-2xl mt-4 border border-gray-100 text-center">
        <div>
          <div className="text-xs font-extrabold text-[#d4622b]">Turnkey</div>
          <div className="text-[10px] text-gray-500">Modular Fit-out</div>
        </div>
        <div>
          <div className="text-xs font-extrabold text-[#1a1a2e]">Acoustic</div>
          <div className="text-[10px] text-gray-500">Sound-Isolated</div>
        </div>
        <div>
          <div className="text-xs font-extrabold text-emerald-600">Grade-A</div>
          <div className="text-[10px] text-gray-500">Verified Campus</div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onExploreClick}
        className="w-full mt-3 py-3 rounded-xl bg-[#1a1a2e] hover:bg-[#d4622b] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors duration-300"
      >
        <span>Schedule Live Physical Inspection</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
}

/* 4. Elegant Placeholder with Wireframe Geometric Grid */
function ElegantPlaceholder({
  title,
  subtitle,
  icon: Icon = ImageIcon,
  className = "aspect-[16/10]",
}: {
  title?: string;
  subtitle?: string;
  icon?: any;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-br from-[#faf8f5] via-[#f5f0eb] to-[#ede8e1] border border-gray-200/80 flex flex-col items-center justify-center p-6 text-center overflow-hidden group ${className}`}
    >
      {/* Dynamic Wireframe Grid Accent */}
      <div className="absolute inset-0 light-grid opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-28 h-28 bg-[#d4622b]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

      {/* Inflow laser wire line across bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4622b]/40 to-transparent group-hover:via-[#d4622b] transition-all" />

      {/* Icon Badge with 3D Ring */}
      <div className="relative w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-center text-[#d4622b] group-hover:scale-110 group-hover:border-[#d4622b]/40 transition-all duration-300 mb-3">
        <Icon className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#d4622b] rounded-full animate-ping opacity-75" />
      </div>

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
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════ */

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const steps = 40;
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
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSolutionTab, setActiveSolutionTab] = useState("all");
  const [activeCityTab, setActiveCityTab] = useState<"delhi" | "gurgaon" | "noida">("delhi");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Tour Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectedHub, setModalSelectedHub] = useState("Okhla Phase II, Delhi");
  const [isTrialRequest, setIsTrialRequest] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Horizontal Scroll Track Refs
  const solutionsTrackRef = useRef<HTMLDivElement>(null);
  const [solutionScrollProgress, setSolutionScrollProgress] = useState(0);
  const locationsTrackRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  // Hero Parallax Scroll
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Dynamic Word Interval & Scroll Listener
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % heroRotatingWords.length);
    }, 2400);

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter Solutions
  const filteredSolutions = useMemo(() => {
    if (activeSolutionTab === "all") return workspaceSolutions;
    return workspaceSolutions.filter((s) => s.category === activeSolutionTab);
  }, [activeSolutionTab]);

  // Solution Track Horizontal Scroll listener
  const handleSolutionScroll = () => {
    if (solutionsTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = solutionsTrackRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setSolutionScrollProgress(Math.min(Math.max(progress, 0), 1));
    }
  };

  const scrollTrack = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right", offset = 420) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "right" ? offset : -offset,
        behavior: "smooth",
      });
    }
  };

  const openBookingModal = (hubName?: string, isTrial = false) => {
    if (hubName) setModalSelectedHub(hubName);
    setIsTrialRequest(isTrial);
    setBookingSuccess(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a2e] font-sans relative overflow-x-hidden selection:bg-[#d4622b] selection:text-white">
      
      {/* ━━━ BACKGROUND AMBIENT GLOW & 3D ISOMETRIC INFLOW WIRE CANVAS ━━━ */}
      <InflowWireGrid />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-[#d4622b]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-[#d4622b]/4 rounded-full blur-[150px]" />
        <div className="absolute inset-0 light-grid opacity-60" />
      </div>

      {/* ━━━ HEADER / NAVIGATION ━━━ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-[#ede8e1] shadow-sm py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/onward-logo.png"
              alt="Onward Workspaces"
              className="w-10 h-10 object-contain group-hover:rotate-6 transition-transform duration-300"
            />
            <div className="leading-none">
              <span className="text-xl font-extrabold tracking-tight text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
                Onward
              </span>
              <span className="block text-[9px] font-bold tracking-[0.25em] text-gray-400 mt-0.5">
                WORKSPACES
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-9 text-sm font-semibold text-gray-600">
            <a href="#solutions" className="hover:text-[#d4622b] transition-colors">
              Solutions
            </a>
            <a href="#about" className="hover:text-[#d4622b] transition-colors">
              Why Onward
            </a>
            <a href="#locations" className="hover:text-[#d4622b] transition-colors">
              Locations
            </a>
            <a href="#amenities" className="hover:text-[#d4622b] transition-colors">
              Amenities
            </a>
            <a href="#gallery" className="hover:text-[#d4622b] transition-colors">
              Gallery
            </a>
            <a href="#reviews" className="hover:text-[#d4622b] transition-colors">
              Testimonials
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3.5">
            <a
              href="tel:+919910668152"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-[#d4622b] bg-white border border-gray-200 px-3.5 py-2.5 rounded-full shadow-xs hover:border-[#d4622b]/30 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4622b]" />
              <span>+91 9910668152</span>
            </a>

            <button
              onClick={() => openBookingModal(undefined, true)}
              className="inline-flex items-center gap-2 bg-[#d4622b] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-[0_4px_20px_rgba(212,98,43,0.25)] hover:bg-[#b8501f] hover:shadow-[0_8px_25px_rgba(212,98,43,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Free 2-Day Trial</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 shadow-xs"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <div className="w-5 h-4 flex flex-col justify-between"><span className="w-full h-0.5 bg-gray-800 rounded-full"/><span className="w-3/4 h-0.5 bg-gray-800 rounded-full"/><span className="w-full h-0.5 bg-gray-800 rounded-full"/></div>}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {[
                  { label: "Solutions", href: "#solutions" },
                  { label: "Why Onward", href: "#about" },
                  { label: "Locations", href: "#locations" },
                  { label: "Amenities", href: "#amenities" },
                  { label: "Gallery", href: "#gallery" },
                  { label: "Testimonials", href: "#reviews" },
                  { label: "Contact Us", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-800 font-semibold text-base hover:text-[#d4622b] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}

                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openBookingModal(undefined, true);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#d4622b] text-white font-bold text-center text-sm shadow-md"
                  >
                    Request Free 2-Day Trial
                  </button>
                  <a
                    href="tel:+919910668152"
                    className="w-full py-3 rounded-full bg-[#faf8f5] text-gray-700 font-bold text-center text-xs flex items-center justify-center gap-2 border border-gray-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d4622b]" />
                    Call: +91 9910668152
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ━━━ HERO SECTION ━━━ */}
      <section
        id="home"
        ref={heroRef}
        className="relative pt-32 sm:pt-40 pb-20 lg:pb-32 z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Authentic Brand Headline */}
            <div className="lg:col-span-7 space-y-8">
              
              <FadeUp delay={0.1}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#ede8e1] shadow-xs">
                  <span className="w-2.5 h-2.5 bg-[#d4622b] rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-[#d4622b] tracking-wide uppercase">
                    2 Day Free Trial Available
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-extrabold text-[#1a1a2e] leading-[1.08] tracking-tight">
                  Workspace built <br />
                  around{" "}
                  <span className="relative inline-block text-[#d4622b]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroWordIndex}
                        initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -35, filter: "blur(4px)" }}
                        transition={{ duration: 0.4 }}
                        className="inline-block"
                      >
                        {heroRotatingWords[heroWordIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-[#d4622b]/20 rounded-full" />
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.3}>
                <p className="text-base sm:text-xl text-gray-600 max-w-xl leading-relaxed">
                  Premium managed offices and coworking spaces across Delhi NCR. Designed for ambitious teams and enterprise leaders who refuse to settle for ordinary.
                </p>
              </FadeUp>

              {/* Action Buttons */}
              <FadeUp delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => openBookingModal(undefined, false)}
                    className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#d4622b] text-white font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(212,98,43,0.3)] hover:bg-[#b8501f] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Book a Tour</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:9910668152"
                    className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white hover:bg-gray-50 text-[#1a1a2e] font-bold text-sm sm:text-base border border-gray-200 hover:border-[#d4622b]/40 shadow-xs transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#d4622b]" />
                    <span>+91 9910668152</span>
                  </a>
                </div>
              </FadeUp>

              {/* Micro-Features Strip */}
              <FadeUp delay={0.5}>
                <div className="pt-6 border-t border-gray-200/80 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4622b]" />
                    <span>Prime Metro Locations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4622b]" />
                    <span>Zero Setup & Brokerage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4622b]" />
                    <span>100% Power & Fiber Redundancy</span>
                  </div>
                </div>
              </FadeUp>

            </div>

            {/* Right Column: Hero Visual Showcase (3D Architectural Wireframe Hyperframe) */}
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="lg:col-span-5 relative"
            >
              <FadeUp delay={0.35}>
                <Architectural3DVisual onExploreClick={() => openBookingModal("Okhla Phase II (Flagship HQ)")} />
              </FadeUp>
            </motion.div>

          </div>

          {/* Stats Bar */}
          <div className="mt-16 sm:mt-24 pt-10 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {statsData.map((stat, i) => (
                <FadeUp key={stat.label} delay={0.1 * i}>
                  <div className="p-6 rounded-2xl bg-white border border-[#ede8e1] text-center group hover:border-[#d4622b]/30 hover:shadow-md transition-all duration-300">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#d4622b]">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-bold text-[#1a1a2e] mt-1">{stat.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ━━━ HORIZONTAL WORKSPACE SOLUTIONS SLIDER ━━━ */}
      <section id="solutions" className="py-24 sm:py-32 bg-[#f5f0eb]/60 border-y border-[#ede8e1] relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <FadeUp>
                <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#d4622b]/10 inline-block mb-3">
                  Workspace Solutions
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a2e] tracking-tight">
                  Space that fits your <span className="text-[#d4622b]">ambition.</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-xl">
                  Flexible office solutions aligned with your business needs, team size, and growth trajectory.
                </p>
              </FadeUp>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollTrack(solutionsTrackRef, "left")}
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-[#1a1a2e] flex items-center justify-center border border-gray-200 shadow-xs transition-all active:scale-95"
                aria-label="Previous solution"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTrack(solutionsTrackRef, "right")}
                className="w-12 h-12 rounded-full bg-[#d4622b] hover:bg-[#b8501f] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(212,98,43,0.3)] transition-all active:scale-95"
                aria-label="Next solution"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
            {[
              { id: "all", label: "All Solutions" },
              { id: "enterprise", label: "Enterprise Managed" },
              { id: "teams", label: "Private Team Suites" },
              { id: "executive", label: "Executive Cabins" },
              { id: "flexible", label: "Virtual & On-Demand" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSolutionTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeSolutionTab === tab.id
                    ? "bg-[#d4622b] text-white shadow-sm"
                    : "bg-white text-gray-600 hover:text-[#1a1a2e] border border-gray-200 hover:border-[#d4622b]/30"
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
                className="w-[330px] sm:w-[390px] flex-shrink-0 rounded-3xl bg-white border border-[#ede8e1] hover:border-[#d4622b]/40 p-6 flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(212,98,43,0.12)]"
              >
                <div>
                  {/* Placeholder Card */}
                  <ElegantPlaceholder
                    title={sol.title}
                    subtitle={sol.capacity}
                    icon={sol.icon}
                    className="aspect-[16/10] mb-5"
                  />

                  {/* Title & Description */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-[#d4622b]/10 text-[#d4622b]">
                      {sol.tag}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{sol.badge}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors mt-2">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {sol.desc}
                  </p>

                  {/* Spec List */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-gray-100">
                    {sol.specs.map((spec) => (
                      <div key={spec} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#d4622b] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Configuration</span>
                    <span className="text-xs font-bold text-[#1a1a2e]">{sol.terms}</span>
                  </div>

                  <button
                    onClick={() => openBookingModal(sol.title)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#faf8f5] group-hover:bg-[#d4622b] text-[#1a1a2e] group-hover:text-white border border-gray-200 group-hover:border-[#d4622b] text-xs font-bold transition-all duration-300"
                  >
                    <span>Explore Space</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex items-center gap-4 max-w-xs mx-auto">
            <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#d4622b] transition-all duration-200"
                style={{ width: `${Math.max(20, solutionScrollProgress * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-gray-400">Drag / Swipe horizontally</span>
          </div>

        </div>
      </section>

      {/* ━━━ WHY ONWARD — NUMBERED SPEC LIST ━━━ */}
      <section id="about" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Sticky Column with Floating 3D Hyperframe */}
            <div className="lg:sticky lg:top-32 space-y-6 relative">
              <FadeUp>
                <div className="flex items-center justify-between">
                  <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#d4622b]/10 inline-block">
                    Why Onward
                  </span>
                  <Floating3DCage size={55} className="hidden sm:flex opacity-70" />
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1a1a2e] mt-3 leading-tight tracking-tight">
                  Not just a desk.<br />
                  <span className="text-[#d4622b]">A launchpad.</span>
                </h2>
                <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-md">
                  We don&apos;t just rent space. We build environments where ambitious teams do their life&apos;s best work.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => openBookingModal(undefined, false)}
                    className="inline-flex items-center gap-2 bg-[#d4622b] text-white px-8 py-4 rounded-full font-bold text-sm shadow-[0_8px_25px_rgba(212,98,43,0.25)] hover:bg-[#b8501f] transition-all"
                  >
                    <span>See it for yourself</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </FadeUp>
            </div>

            {/* Right Numbered Specs */}
            <div className="space-y-0">
              {whyOnwardFeatures.map((f, i) => (
                <FadeUp key={f.num} delay={i * 0.15}>
                  <div className="group py-10 border-b border-gray-200 last:border-0">
                    <div className="flex gap-6 items-start">
                      <span className="text-5xl font-black text-[#d4622b]/20 group-hover:text-[#d4622b] transition-colors shrink-0 leading-none">
                        {f.num}
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
                          {f.title}
                        </h3>
                        <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                          {f.desc}
                        </p>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#d4622b]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{f.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ HORIZONTAL NCR LOCATIONS SLIDER ━━━ */}
      <section id="locations" className="py-24 sm:py-32 bg-[#faf8f5] border-y border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <FadeUp>
                <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#d4622b]/10 inline-block mb-3">
                  Strategic Locations
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a2e] tracking-tight">
                  Find us across <span className="text-[#d4622b]">Delhi NCR.</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                  {ncrLocationsData[activeCityTab].subtitle}
                </p>
              </FadeUp>
            </div>

            {/* City Selector Pills & Arrows */}
            <div className="flex items-center gap-3">
              <div className="flex p-1 rounded-full bg-white border border-gray-200 shadow-xs">
                {(["delhi", "gurgaon", "noida"] as const).map((city) => (
                  <button
                    key={city}
                    onClick={() => setActiveCityTab(city)}
                    className={`px-5 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                      activeCityTab === city
                        ? "bg-[#d4622b] text-white shadow-xs"
                        : "text-gray-600 hover:text-[#1a1a2e]"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollTrack(locationsTrackRef, "left")}
                  className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 text-[#1a1a2e] flex items-center justify-center border border-gray-200"
                  aria-label="Previous centre"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTrack(locationsTrackRef, "right")}
                  className="w-10 h-10 rounded-full bg-[#d4622b] hover:bg-[#b8501f] text-white flex items-center justify-center"
                  aria-label="Next centre"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Track of Centres */}
          <div
            ref={locationsTrackRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
          >
            {ncrLocationsData[activeCityTab].centres.map((centre) => (
              <div
                key={centre.name}
                className="w-[320px] sm:w-[370px] flex-shrink-0 rounded-3xl bg-white border border-[#ede8e1] hover:border-[#d4622b]/40 p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl"
              >
                <div>
                  {/* Location Placeholder Graphic */}
                  <ElegantPlaceholder
                    title={centre.name}
                    subtitle={centre.sqft}
                    icon={Building2}
                    className="aspect-[16/10] mb-4"
                  />

                  <h3 className="text-lg font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
                    {centre.name}
                  </h3>

                  <div className="mt-2 text-xs font-semibold text-[#d4622b] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{centre.metro}</span>
                  </div>

                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    {centre.address}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {centre.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-[#faf8f5] text-gray-600 border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">Open for Visits</span>
                  <button
                    onClick={() => openBookingModal(centre.name)}
                    className="flex items-center gap-1 text-xs font-bold text-[#d4622b] hover:text-[#b8501f] transition-colors"
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

      {/* ━━━ ENTERPRISE AMENITIES BENTO GRID ━━━ */}
      <section id="amenities" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeUp>
              <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#d4622b]/10 inline-block mb-3">
                Enterprise Standards
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a2e] tracking-tight">
                Designed for peak <span className="text-[#d4622b]">productivity.</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-3">
                Every Onward center is engineered to eliminate operational friction and keep your team performing at their highest potential.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseAmenities.map((amenity, i) => {
              const Icon = amenity.icon;
              return (
                <FadeUp key={amenity.title} delay={0.08 * i}>
                  <div className="h-full rounded-3xl bg-[#faf8f5] border border-[#ede8e1] p-8 flex flex-col justify-between group hover:border-[#d4622b]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#d4622b] group-hover:scale-110 transition-transform mb-6 shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
                        {amenity.title}
                      </h3>

                      <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                        {amenity.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-2 text-xs font-bold text-gray-500 group-hover:text-[#d4622b] transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4622b]" />
                      <span>Standard Across All NCR Centres</span>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━ WORKSPACE VISUAL GALLERY (HORIZONTAL SLIDER WITH PLACEHOLDERS) ━━━ */}
      <section id="gallery" className="py-24 sm:py-32 bg-[#faf8f5] border-y border-[#ede8e1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <FadeUp>
              <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#d4622b]/10 inline-block mb-3">
                Campus Gallery
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a2e] tracking-tight">
                See the space in <span className="text-[#d4622b]">action.</span>
              </h2>
            </FadeUp>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTrack(galleryTrackRef, "left")}
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 text-[#1a1a2e] flex items-center justify-center border border-gray-200"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTrack(galleryTrackRef, "right")}
              className="w-10 h-10 rounded-full bg-[#d4622b] hover:bg-[#b8501f] text-white flex items-center justify-center"
              aria-label="Next gallery image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Gallery Track */}
        <div
          ref={galleryTrackRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing"
        >
          {workspaceGalleryPlaceholders.map((g, i) => (
            <div
              key={i}
              className="w-[300px] sm:w-[360px] flex-shrink-0 rounded-3xl overflow-hidden bg-white border border-gray-200 group cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500 p-4"
            >
              <ElegantPlaceholder
                title={g.title}
                subtitle={`${g.category} • ${g.tag}`}
                icon={g.icon}
                className="aspect-[4/3]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ CLIENT TESTIMONIALS & LOGO MARQUEE ━━━ */}
      <section id="reviews" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14 text-center">
          <FadeUp>
            <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#d4622b]/10 inline-block mb-3">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a2e] tracking-tight">
              Leaders trust <span className="text-[#d4622b]">Onward.</span>
            </h2>
          </FadeUp>
        </div>

        {/* Logo Ticker */}
        <div className="mb-16 overflow-hidden whitespace-nowrap opacity-60">
          <motion.div
            className="inline-flex gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <span key={idx} className="text-xl font-bold tracking-widest text-gray-400 hover:text-gray-800 transition-colors uppercase">
                {logo}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-3 gap-6">
          {testimonialsData.map((t, idx) => (
            <FadeUp key={t.name} delay={0.1 * idx}>
              <div className="h-full rounded-3xl bg-[#faf8f5] border border-[#ede8e1] p-8 flex flex-col justify-between group hover:border-[#d4622b]/30 hover:bg-white hover:shadow-lg transition-all">
                <div>
                  <div className="flex gap-1 mb-6 text-[#d4622b]">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#d4622b]" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200/60 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4622b] to-[#e8855a] flex items-center justify-center text-white font-bold text-sm">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1a2e] text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ━━━ FAQ ACCORDION ━━━ */}
      <section className="py-24 bg-[#faf8f5] border-t border-[#ede8e1]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e]">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm mt-3">
                Everything you need to know about flexible leases, free trial, and onboarding.
              </p>
            </FadeUp>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#ede8e1] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#1a1a2e] text-base hover:text-[#d4622b] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180 text-[#d4622b]" : ""
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
                      <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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

      {/* ━━━ CONTACT & CONSULTATION SECTION ━━━ */}
      <section id="contact" className="py-24 sm:py-32 bg-white border-t border-[#ede8e1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <FadeUp>
                <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#d4622b]/10 inline-block">
                  Get In Touch
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a2e] leading-tight mt-3">
                  Ready to move <br />
                  <span className="text-[#d4622b]">forward?</span>
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mt-4">
                  Transform your work life. Fill in the form and our commercial real estate team will reach out within 24 hours with custom floor plans and information.
                </p>

                <div className="space-y-4 pt-6">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf8f5] border border-[#ede8e1]">
                    <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-[#d4622b] flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase">Headquarters</div>
                      <div className="text-sm font-bold text-[#1a1a2e] mt-0.5">
                        Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020
                      </div>
                    </div>
                  </div>

                  <a
                    href="tel:9910668152"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf8f5] border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-[#d4622b] flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase">Direct Line</div>
                      <div className="text-sm font-bold text-[#1a1a2e] mt-0.5">+91 9910668152</div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@onwardworkspaces.com"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf8f5] border border-[#ede8e1] hover:border-[#d4622b]/40 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-[#d4622b] flex items-center justify-center shrink-0 shadow-xs">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase">Official Email</div>
                      <div className="text-sm font-bold text-[#1a1a2e] mt-0.5">info@onwardworkspaces.com</div>
                    </div>
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.2}>
                <div className="rounded-3xl bg-[#faf8f5] border border-[#ede8e1] p-8 sm:p-10 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">Request Consultation or Free Trial</h3>
                  <p className="text-xs text-gray-500 mb-6">Schedule a physical walkthrough or claim your 2-day team trial pass.</p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingSuccess(true);
                      setIsModalOpen(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Vikram Sharma"
                          className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1.5">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@company.com"
                          className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9910668152"
                          className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1.5">Preferred Centre</label>
                        <select className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b] transition-colors">
                          <option value="Okhla Phase II, Delhi">Okhla Phase II (Delhi Flagship)</option>
                          <option value="Okhla Phase III, Delhi">Okhla Phase III (Delhi)</option>
                          <option value="Mohan Cooperative, Delhi">Mohan Cooperative (Delhi)</option>
                          <option value="Connaught Place, Delhi">Connaught Place (Delhi)</option>
                          <option value="Cyber City, Gurgaon">DLF Cyber City (Gurgaon)</option>
                          <option value="Udyog Vihar, Gurgaon">Udyog Vihar Phase IV (Gurgaon)</option>
                          <option value="Sector 62, Noida">Sector 62 (Noida)</option>
                          <option value="Sector 16, Noida">Sector 16 (Noida)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-600 block mb-1.5">Message / Requirements</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your team size, target move-in date, or custom layout requirements..."
                        className="w-full bg-white border border-[#ede8e1] rounded-xl px-4 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#d4622b] text-white font-bold text-base shadow-[0_8px_25px_rgba(212,98,43,0.3)] hover:bg-[#b8501f] transition-all"
                    >
                      Submit Tour & Trial Request
                    </button>
                  </form>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[#1a1a2e] text-gray-400 py-20 border-t border-gray-800 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div>
              <a href="#" className="flex items-center gap-2.5 mb-5">
                <img src="/onward-logo.png" alt="Onward" className="w-9 h-9" />
                <div className="leading-none">
                  <span className="text-xl font-extrabold text-white tracking-tight">Onward</span>
                  <span className="block text-[9px] text-gray-400 tracking-[0.25em]">WORKSPACES</span>
                </div>
              </a>
              <p className="text-sm leading-relaxed text-gray-400">
                Premium coworking spaces built around your brand, ambition, and people.
              </p>
              <div className="mt-4 text-xs font-semibold text-[#d4622b]">
                ONWARD COWORKX PRIVATE LIMITED
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5">Solutions</h4>
              <ul className="space-y-3">
                <li><a href="#solutions" className="hover:text-[#d4622b] transition-colors">Managed Office</a></li>
                <li><a href="#solutions" className="hover:text-[#d4622b] transition-colors">Private Suites</a></li>
                <li><a href="#solutions" className="hover:text-[#d4622b] transition-colors">Private Cabins</a></li>
                <li><a href="#solutions" className="hover:text-[#d4622b] transition-colors">Virtual Office</a></li>
                <li><a href="#solutions" className="hover:text-[#d4622b] transition-colors">On-Demand & Event Hubs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5">NCR Locations</h4>
              <ul className="space-y-3">
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Okhla Phase II & III</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Mohan Cooperative</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Connaught Place</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">DLF Cyber City Gurgaon</a></li>
                <li><a href="#locations" className="hover:text-[#d4622b] transition-colors">Noida Sector 62 & 16</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5">Contact & Support</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020
              </p>
              <div className="space-y-1.5 font-semibold text-white">
                <div>+91 9910668152</div>
                <div className="text-gray-400">info@onwardworkspaces.com</div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Onward Workspaces (Onward Coworkx Pvt. Ltd.). All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#d4622b] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#d4622b] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#d4622b] transition-colors">GST Compliance</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ━━━ TOUR BOOKING / TRIAL MODAL ━━━ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ede8e1] p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!bookingSuccess ? (
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider">
                      {isTrialRequest ? "2-Day Free Trial Pass" : "Schedule a Tour"}
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#1a1a2e] mt-1">
                      {isTrialRequest ? "Claim Your 2-Day Free Trial" : `Visit ${modalSelectedHub}`}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Experience our workspaces with complimentary barista coffee and high-speed Wi-Fi.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingSuccess(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9910668152"
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Preferred Date</label>
                        <input
                          type="date"
                          required
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Time Window</label>
                        <select className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#d4622b]">
                          <option>10:00 AM - 12:00 PM</option>
                          <option>12:00 PM - 02:00 PM</option>
                          <option>02:00 PM - 04:00 PM</option>
                          <option>04:00 PM - 06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#d4622b] text-white font-bold text-sm shadow-md hover:bg-[#b8501f] transition-all"
                    >
                      {isTrialRequest ? "Claim Free 2-Day Trial" : "Confirm Tour Reservation"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1a1a2e]">Request Confirmed!</h3>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                    Thank you! Our leasing team has received your request. We will contact you at your phone number with calendar confirmation and directions.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#1a1a2e] text-white font-semibold text-xs"
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



