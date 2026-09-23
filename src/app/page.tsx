"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import { IntroAnimation } from "@/components/IntroAnimation";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";
import SpotlightCard from "@/components/SpotlightCard";
import SpringCounter from "@/components/SpringCounter";
import FeatureTimeline from "@/components/FeatureTimeline";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import {
  brandPartners,
  DpWorldLogo,
  ClarksonsLogo,
  ThermaxGridLogo,
  OpraahLogo,
  SageLogo,
  TvsSupplyChainLogo,
  newsMediaOutlets,
} from "@/components/BrandLogos";

/* ═══════════════════════════════════════════
   PRIMITIVES & MARQUEE
   ═══════════════════════════════════════════ */

function Marquee({
  children,
  speed = 30,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

function AutoSlider({
  children,
  interval = 3000,
  className = "",
  dotColor = "light",
}: {
  children: React.ReactNode[];
  interval?: number;
  className?: string;
  dotColor?: "light" | "dark";
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = children.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % total),
      interval,
    );
    return () => clearInterval(timer);
  }, [paused, total, interval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50)
      setCurrent((p) =>
        diff > 0 ? (p + 1) % total : (p - 1 + total) % total,
      );
    setPaused(false);
  };

  return (
    <div className={className || "md:hidden"}>
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          ref={trackRef}
          className="flex"
          animate={{ x: `${-current * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children.map((child, i) => (
            <div key={i} className="w-full flex-shrink-0 px-2">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              setPaused(false);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === i
                ? "w-8 bg-[#d4622b]"
                : `w-1.5 ${
                    dotColor === "dark" ? "bg-white/30" : "bg-gray-300"
                  }`
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const heroWords = ["Ambition", "Brand", "People", "Vision"];

const heroVideoSlides = [
  {
    id: 1,
    label: "Co-Working Floor",
    location: "Connaught Place, Delhi",
    grad: ["#fff7f3", "#ffe4d0", "#ffd0b0"],
    accentColor: "#d4622b",
    videoSrc: "",
  },
  {
    id: 2,
    label: "Private Suites",
    location: "Cyber City, Gurgaon",
    grad: ["#f0f4f8", "#dde6f0", "#c8d8e8"],
    accentColor: "#1a1a2e",
    videoSrc: "",
  },
  {
    id: 3,
    label: "The Boardroom",
    location: "Nehru Place, Delhi",
    grad: ["#fdf6ec", "#f7e8cf", "#f0d8ae"],
    accentColor: "#d4622b",
    videoSrc: "",
  },
  {
    id: 4,
    label: "Commons & Lounge",
    location: "Sector 62, Noida",
    grad: ["#f5f5f0", "#eaeae0", "#ddddd0"],
    accentColor: "#6b7280",
    videoSrc: "",
  },
];

const stats = [
  { value: 3, suffix: "+", label: "Cities", sub: "and growing" },
  { value: 15, suffix: "+", label: "Centres", sub: "across NCR" },
  { value: 250, suffix: "+", label: "Clients", sub: "trusted us" },
  { value: 1, suffix: "M+", label: "Sq. Ft.", sub: "of workspace" },
];

const solutions = [
  {
    title: "Managed Office",
    desc: "Customised workspace for Enterprise, MNCs & Unicorns with dedicated access & branding.",
    tag: "ENTERPRISE",
    features: ["Dedicated Entrance", "Custom Layout & IT", "24/7 Access"],
    img: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Private Suites",
    desc: "Fully-managed private cabins for high-velocity teams of 10 to 100+ members.",
    tag: "TEAMS",
    features: ["Ergonomic Seating", "Soundproof Cabins", "Meeting Credits"],
    img: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Private Cabins",
    desc: "Fully-equipped executive space crafted specifically for partners and directors.",
    tag: "EXECUTIVE",
    features: ["Executive Furniture", "Private Lounge", "Concierge Service"],
    img: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Virtual Office",
    desc: "Prestigious CBD business address with mail handling & zero overhead costs.",
    tag: "REMOTE",
    features: ["GST Registration", "Mail Forwarding", "Day Pass Access"],
    img: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "On-Demand",
    desc: "Boardrooms, meeting suites & flexible day passes on the go across NCR.",
    tag: "FLEXIBLE",
    features: ["Instant Booking", "4K Video Conference", "Unlimited Beverage"],
    img: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Custom Built",
    desc: "End-to-end bespoke interior architecture tailored to your company identity.",
    tag: "BESPOKE",
    features: ["Architect-Led Design", "Brand Aesthetics", "Turnkey Build"],
    img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const cities = [
  {
    name: "Delhi" as const,
    hubs: [
      {
        spot: "Connaught Place",
        tag: "CBD Prime",
        seats: "450+ Desks",
        transit: "2 min to CP Metro",
        highlight: "Private Suites & Enterprise Floors",
      },
      {
        spot: "Nehru Place",
        tag: "Financial District",
        seats: "320+ Desks",
        transit: "1 min to Metro",
        highlight: "Dedicated Cabins & High-Speed Labs",
      },
      {
        spot: "Saket",
        tag: "South Delhi Hub",
        seats: "280+ Desks",
        transit: "Walking to Select Citywalk",
        highlight: "Executive Suites & Boardrooms",
      },
    ],
  },
  {
    name: "Noida" as const,
    hubs: [
      {
        spot: "Sector 62",
        tag: "Tech Zone",
        seats: "500+ Desks",
        transit: "Sector 62 Metro Station",
        highlight: "IT Campuses & Collaborative Zones",
      },
      {
        spot: "Sector 16",
        tag: "Corporate Tower",
        seats: "380+ Desks",
        transit: "Direct DND Flyway Access",
        highlight: "Metro Linked High-Rise Offices",
      },
      {
        spot: "Sector 132",
        tag: "Expressway Campus",
        seats: "420+ Desks",
        transit: "Noida-Gr. Noida Expressway",
        highlight: "Green Certified Custom Workspaces",
      },
    ],
  },
  {
    name: "Gurgaon" as const,
    hubs: [
      {
        spot: "Cyber City",
        tag: "DLF CyberHub",
        seats: "600+ Desks",
        transit: "Rapid Metro Station",
        highlight: "Unicorn & MNC Custom HQs",
      },
      {
        spot: "Golf Course Rd",
        tag: "Ultra Luxury",
        seats: "400+ Desks",
        transit: "Sector 54 Rapid Metro",
        highlight: "High-End Executive Suites",
      },
      {
        spot: "Sohna Road",
        tag: "Growth Corridor",
        seats: "350+ Desks",
        transit: "Subhash Chowk Junction",
        highlight: "Scalable Team Suites & Lounges",
      },
    ],
  },
];

const gallerySlides = [
  {
    title: "Open Collaboration",
    location: "Connaught Place, Delhi",
    tag: "Co-Working Floor",
    grad: ["#fff3ec", "#ffe4d0", "#ffd0b0"],
    shape: "#d4622b",
  },
  {
    title: "Private Executive Suites",
    location: "Cyber City, Gurgaon",
    tag: "Managed Office",
    grad: ["#f0f4f8", "#dde6f0", "#c8d8e8"],
    shape: "#1a1a2e",
  },
  {
    title: "The Boardroom",
    location: "Nehru Place, Delhi",
    tag: "Meeting Suites",
    grad: ["#fdf6ec", "#f7e8cf", "#f0d8ae"],
    shape: "#d4622b",
  },
  {
    title: "Commons & Lounge",
    location: "Sector 62, Noida",
    tag: "Common Areas",
    grad: ["#f5f5f0", "#eaeae0", "#ddddd0"],
    shape: "#6b7280",
  },
  {
    title: "Focus Pods",
    location: "Golf Course Rd, Gurgaon",
    tag: "Private Cabins",
    grad: ["#fef3ed", "#fce4d4", "#f9d5bb"],
    shape: "#d4622b",
  },
];

const logos = [
  "Dangal Games",
  "Aramex",
  "Thermax",
  "Razorpay",
  "InnovateLabs",
  "GlobalSoft",
  "TechCorp",
  "NexGen",
];

/* ═══════════════════════════════════════════
   HERO VIDEO CAROUSEL
   ═══════════════════════════════════════════ */

function HeroVideoCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const total = heroVideoSlides.length;

  useEffect(() => {
    const t = setInterval(() => {
      setPrev(current);
      setCurrent((p) => (p + 1) % total);
    }, 4500);
    return () => clearInterval(t);
  }, [current, total]);

  const slide = heroVideoSlides[current];

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slide.videoSrc ? (
            <video
              src={slide.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            /* Placeholder gradient until real video added */
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 30% 40%, ${slide.grad[1]} 0%, ${slide.grad[0]} 60%, ${slide.grad[0]} 100%)`,
              }}
            >
              {/* Ken-Burns inner glow */}
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: `radial-gradient(circle at 60% 50%, ${slide.accentColor}30 0%, transparent 65%)`,
                }}
              />
              {/* Dot grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD COMPONENTS
   ═══════════════════════════════════════════ */

function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = gallerySlides.length;
  const interval = 3000;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setCurrent((p) => (p + 1) % total);
    }, interval);
    return () => clearInterval(t);
  }, [paused, total, interval]);

  const slide = gallerySlides[current];

  const slideVariants = {
    enter: (d: number) => ({ x: `${d * 100}%`, opacity: 1 }),
    center: { x: "0%", opacity: 1 },
    exit: (d: number) => ({ x: `${d * -100}%`, opacity: 1 }),
  };
  const parallaxVariants = {
    enter: (d: number) => ({ x: `${d * 30}%` }),
    center: { x: "0%" },
    exit: (d: number) => ({ x: `${d * -30}%` }),
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main slider viewport */}
      <div className="relative overflow-hidden rounded-none lg:rounded-3xl mx-0 lg:mx-8 lg:max-w-7xl lg:mx-auto" style={{ height: 520 }}>
        <AnimatePresence custom={dir} mode="sync" initial={false}>
          <motion.div
            key={current}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Parallax inner layer */}
            <motion.div
              key={`inner-${current}`}
              custom={dir}
              variants={parallaxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#faf8f5]"
            >
              {/* Decorative geometric shapes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" fill="none">
                <circle cx="900" cy="100" r="220" stroke="#d4622b" strokeOpacity="0.08" strokeWidth="80" />
                <circle cx="900" cy="100" r="120" stroke="#d4622b" strokeOpacity="0.06" strokeWidth="40" />
                <rect x="80" y="300" width="200" height="200" rx="40" fill="#d4622b" fillOpacity="0.04" />
                <rect x="120" y="340" width="120" height="120" rx="24" fill="#d4622b" fillOpacity="0.05" />
                <line x1="0" y1="200" x2="1200" y2="200" stroke="#d4622b" strokeOpacity="0.04" strokeWidth="1" />
                <line x1="0" y1="320" x2="1200" y2="320" stroke="#d4622b" strokeOpacity="0.04" strokeWidth="1" />
                <line x1="400" y1="0" x2="400" y2="520" stroke="#d4622b" strokeOpacity="0.04" strokeWidth="1" />
                <line x1="800" y1="0" x2="800" y2="520" stroke="#d4622b" strokeOpacity="0.04" strokeWidth="1" />
              </svg>

              {/* Central illustration — floating building */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="opacity-15"
                >
                  <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                    <rect x="40" y="60" width="100" height="100" rx="8" fill="#d4622b" />
                    <rect x="55" y="40" width="70" height="25" rx="4" fill="#d4622b" />
                    <rect x="65" y="25" width="50" height="18" rx="3" fill="#d4622b" />
                    <rect x="55" y="80" width="20" height="20" rx="3" fill="white" fillOpacity="0.6" />
                    <rect x="85" y="80" width="20" height="20" rx="3" fill="white" fillOpacity="0.6" />
                    <rect x="115" y="80" width="20" height="20" rx="3" fill="white" fillOpacity="0.6" />
                    <rect x="55" y="110" width="20" height="20" rx="3" fill="white" fillOpacity="0.6" />
                    <rect x="85" y="110" width="20" height="20" rx="3" fill="white" fillOpacity="0.6" />
                    <rect x="115" y="110" width="20" height="20" rx="3" fill="white" fillOpacity="0.6" />
                    <rect x="72" y="140" width="36" height="20" rx="4" fill="white" fillOpacity="0.5" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom caption area */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 flex items-end justify-between">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-[#1a1a2e]">{slide.title}</h3>
                <p className="mt-1 text-sm text-gray-500 font-medium">{slide.location}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-5xl font-black text-[#1a1a2e]/10 leading-none">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <div className="text-xs text-gray-400 mt-1">/ {String(total).padStart(2, "0")}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

const enterpriseTestimonials = [
  {
    id: "varun-puri",
    name: "Varun Puri",
    role: "Founder | Dangal Games",
    metric: "Scaled 15 → 120 seats",
    seats: "120+ Desks",
    rating: 5,
    shortQuote:
      "I'm thrilled to share how Onward Workspaces has been a game-changer for our team. As the founder and CEO, finding the perfect office space was crucial for our growth journey. And I...",
    fullQuote:
      "I'm thrilled to share how Onward Workspaces has been a game-changer for our team. As the founder and CEO, finding the perfect office space was crucial for our growth journey. And Onward Workspaces delivered on every front, providing an exceptional environment for our team to thrive.",
    logo: (
      <svg viewBox="0 0 42 48" className="w-11 h-12 shrink-0 drop-shadow-sm" fill="none">
        <path
          d="M21 2L39 7.5V23C39 34.5 31 43.5 21 46.5C11 43.5 3 34.5 3 23V7.5L21 2Z"
          fill="#0c1e4a"
          stroke="#1b2e61"
          strokeWidth="1.5"
        />
        <text
          x="21"
          y="29"
          textAnchor="middle"
          fill="white"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="0.5px"
        >
          DG
        </text>
      </svg>
    ),
  },
  {
    id: "abhinay-nagwekar",
    name: "Abhinay Nagwekar",
    role: "Senior Procurement Leader | Aramex",
    metric: "Zero facility downtime",
    seats: "85+ Desks",
    rating: 5,
    shortQuote:
      "Finding the right workspace for our team was crucial, and Onward Workspaces exceeded all expectations. From their meticulously designed spaces to their unwavering support, they've ...",
    fullQuote:
      "Finding the right workspace for our team was crucial, and Onward Workspaces exceeded all expectations. From their meticulously designed spaces to their unwavering support, they've been an integral partner in our ongoing success and corporate expansion.",
    logo: (
      <div className="h-10 px-2 py-1 flex items-center shrink-0 rounded-lg bg-red-50/50 border border-red-100/60">
        <span className="font-black text-xl tracking-tight text-[#E31837] italic font-sans">
          aramex
        </span>
      </div>
    ),
  },
  {
    id: "prasenjit-das-gupta",
    name: "Prasenjit Das Gupta",
    role: "Head Commercial Heating Projects | Thermax",
    metric: "Turnkey setup in 10 days",
    seats: "60+ Desks",
    rating: 5,
    shortQuote:
      "Transitioning our team to Onward Workspaces was one of the best decisions we made. The environment they've cultivated is not only conducive to productivity but also fosters collabo...",
    fullQuote:
      "Transitioning our team to Onward Workspaces was one of the best decisions we made. The environment they've cultivated is not only conducive to productivity but also fosters collaboration, energy, and comfort across all our working teams. The hospitality and infrastructure are second to none.",
    logo: (
      <div className="flex flex-col items-center justify-center shrink-0 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
        <svg viewBox="0 0 32 24" className="h-5 w-auto" fill="none">
          <rect x="0" y="0" width="32" height="6.5" rx="0.5" fill="#E31837" />
          <rect x="5.5" y="6.5" width="7" height="17.5" rx="0.5" fill="#E31837" />
          <rect x="19.5" y="6.5" width="7" height="17.5" rx="0.5" fill="#E31837" />
        </svg>
        <span className="text-[7px] font-black text-[#111827] tracking-wider mt-0.5">
          THERMAX
        </span>
      </div>
    ),
  },
];

function TrustedLeadersSection() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#faf8f5] border-t border-gray-200/70 relative overflow-hidden">
      {/* Ambient background glows matching website theme */}
      <div className="pointer-events-none absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#d4622b]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#d4622b]/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-14 sm:mb-16">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#d4622b]" /> Testimonials <span className="w-6 h-px bg-[#d4622b]" />
            </span>
          </Reveal>
          <AnimatedHeading
            text="Trusted by Enterprise Leaders"
            highlight="Enterprise Leaders"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3 md:whitespace-nowrap"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto xl:max-w-none xl:whitespace-nowrap">
              These success stories showcase the real impact of our coworking spaces and services, providing valuable insights into how we can support your business needs &amp; aspirations.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {enterpriseTestimonials.map((t) => {
            const isExpanded = !!expanded[t.id];
            return (
              <div
                key={t.id}
                className="bg-white rounded-3xl border border-gray-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_-12px_rgba(26,26,46,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(212,98,43,0.18)] hover:border-[#d4622b]/40 hover:-translate-y-1.5 transition-all duration-300 relative group"
              >
                <div>
                  {/* Top card header: 5 stars rating */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-[#d4622b] fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal text-justify">
                    &ldquo;{isExpanded ? t.fullQuote : t.shortQuote}&rdquo;
                    <button
                      type="button"
                      onClick={() => toggleExpand(t.id)}
                      className="ml-2 font-semibold text-[#d4622b] hover:text-[#b8501f] transition-colors inline-flex items-center gap-0.5 text-xs group/btn"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                      <span className="transition-transform group-hover/btn:translate-x-0.5">&rarr;</span>
                    </button>
                  </p>
                </div>

                {/* Author row */}
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100">
                  {t.logo}
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#1a1a2e] text-sm sm:text-base leading-snug group-hover:text-[#d4622b] transition-colors">
                      {t.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 font-normal leading-snug mt-0.5 truncate">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const enterpriseBrands = [
  { name: "DP World", Logo: DpWorldLogo },
  { name: "Clarksons", Logo: ClarksonsLogo },
  { name: "Thermax", Logo: ThermaxGridLogo },
  { name: "Opraah", Logo: OpraahLogo },
  { name: "Sage", Logo: SageLogo },
  { name: "TVS Supply Chain Solutions", Logo: TvsSupplyChainLogo },
];

function EnterprisesSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#faf8f5] border-t border-gray-200/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-14">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#d4622b]" /> Enterprise Network <span className="w-6 h-px bg-[#d4622b]" />
            </span>
          </Reveal>
          <AnimatedHeading
            text="Enterprises using onward Workspaces"
            highlight="onward Workspaces"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3 md:whitespace-nowrap"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-center md:whitespace-nowrap">
              Elevate your workspace experience and be part of a movement that redefines success
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-stretch max-w-6xl mx-auto">
          {enterpriseBrands.map((brand) => (
            <div
              key={brand.name}
              title={brand.name}
              className="px-6 py-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_8px_24px_-16px_rgba(26,26,46,0.18)] hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-[78px] group cursor-default"
            >
              <brand.Logo className="h-7 sm:h-8 w-auto max-w-[125px] object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsMediaSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#faf8f5] border-t border-gray-200/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#d4622b]" /> Press &amp; Recognition <span className="w-6 h-px bg-[#d4622b]" />
            </span>
          </Reveal>
          <AnimatedHeading
            text="Featured in News & Media"
            highlight="News & Media"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-center">
              We understand that selecting the right co-working space is a crucial decision. We&apos;re here to help you make an informed choice and tailor our offerings to meet your specific needs.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Infinite Smooth Scrolling Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 z-10 bg-gradient-to-r from-[#faf8f5] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 z-10 bg-gradient-to-l from-[#faf8f5] to-transparent" />

        <motion.div
          className="flex w-max gap-5 sm:gap-6 items-center py-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].flatMap((_, r) =>
            newsMediaOutlets.map((outlet, i) => (
              <div
                key={`media-outlet-${r}-${outlet.name}-${i}`}
                title={outlet.name}
                className="shrink-0 px-8 py-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_8px_24px_-16px_rgba(26,26,46,0.18)] hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center min-w-[170px] h-[78px] group cursor-default"
              >
                <outlet.Logo className="h-7 sm:h-8 w-auto max-w-[135px] object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
            )),
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionCard({ sol }: { sol: (typeof solutions)[number] }) {
  return (
    <SpotlightCard className="h-full min-h-[360px] cursor-pointer group relative overflow-hidden border border-gray-200 bg-white hover:border-[#d4622b] transition-all duration-500 flex flex-col justify-between">
      {/* Top Image Container with zoom & gradient overlay */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          style={{ backgroundImage: `url(${sol.img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Card Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors duration-300">
            {sol.title}
          </h3>
          <p className="mt-2.5 text-gray-500 text-sm leading-relaxed">
            {sol.desc}
          </p>

          {/* Silversquare-style info reveal badges */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1.5">
              {sol.features.map((feat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-[11px] font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md group-hover:bg-[#d4622b]/10 group-hover:text-[#d4622b] transition-colors duration-300"
                >
                  &bull; {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Silversquare "Know more →" bottom CTA row */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors duration-300">
            Know more
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 group-hover:bg-[#d4622b] group-hover:text-white transition-all duration-300 flex items-center justify-center">
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

function LocationCard({
  hub,
  city,
}: {
  hub: (typeof cities)[number]["hubs"][number];
  city: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer group"
    >
      {/* Illustration area */}
      <div className="relative h-44 bg-gradient-to-br from-[#fff7f3] to-[#faf8f5] flex items-center justify-center overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #d4622b22 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* Soft glow blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#d4622b]/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />

        {/* Bouncing pin */}
        <div className="relative flex flex-col items-center z-10">
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Pin body */}
            <div className="w-12 h-12 rounded-full bg-[#d4622b] shadow-[0_8px_24px_rgba(212,98,43,0.35)] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </motion.div>

          {/* Pin shadow — shrinks/grows as pin bounces */}
          <motion.div
            animate={{ scaleX: [1, 0.6, 1], opacity: [0.25, 0.1, 0.25] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-1.5 w-6 h-1.5 rounded-full bg-[#d4622b] blur-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tag & City */}
        <span className="text-[10px] font-bold tracking-widest text-[#d4622b] uppercase">
          {hub.tag} &bull; {city}
        </span>

        <h3 className="mt-1 text-lg font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors duration-300">
          {hub.spot}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
          <svg className="w-3 h-3 shrink-0 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {hub.transit}
        </div>

        <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">{hub.highlight}</p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#d4622b]">Book a Tour</span>
          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-7 h-7 rounded-full bg-[#d4622b]/10 flex items-center justify-center text-[#d4622b] group-hover:bg-[#d4622b] group-hover:text-white transition-colors duration-300"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  const [heroWord, setHeroWord] = useState(0);
  const [activeCity, setActiveCity] = useState<"Delhi" | "Noida" | "Gurgaon">("Delhi");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);


  // Hero Mouse Parallax with Multi-Layer Springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const orb1X = useTransform(sx, [-0.5, 0.5], [-45, 45]);
  const orb1Y = useTransform(sy, [-0.5, 0.5], [-35, 35]);
  const orb2X = useTransform(sx, [-0.5, 0.5], [50, -50]);
  const orb2Y = useTransform(sy, [-0.5, 0.5], [40, -40]);
  const gridX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const gridY = useTransform(sy, [-0.5, 0.5], [18, -18]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  useEffect(() => {
    const wt = setInterval(
      () => setHeroWord((p) => (p + 1) % heroWords.length),
      2200,
    );
    return () => clearInterval(wt);
  }, []);

  return (
    <>
      <Header />
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}


      {/* ━━━ HERO — FULL-BLEED BACKGROUND VIDEO CAROUSEL ━━━ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden"
        id="home"
      >
        {/* Background video */}
        <video
          src="/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />

        {/* Cinematic overlay — navy tint + vignette */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[#1a1a2e]/70" />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 45%, transparent 0%, rgba(15,15,30,0.35) 55%, rgba(10,10,20,0.75) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-[1] bg-gradient-to-t from-[#0a0a15] to-transparent" />

        {introComplete && (
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16"
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] font-bold text-white leading-[1.15] sm:leading-[1.05] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
              <div className="overflow-hidden">
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
                  Workspace built
                </motion.div>
              </div>
              <div className="overflow-visible sm:overflow-hidden">
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}>
                  around{" "}
                  <span className="relative inline-block">
                    <AnimatePresence mode="wait">
                      <motion.span key={heroWord} initial={{ y: 40, opacity: 0, rotateX: -40 }} animate={{ y: 0, opacity: 1, rotateX: 0 }} exit={{ y: -40, opacity: 0, rotateX: 40 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="inline-block text-[#d4622b]" style={{ transformOrigin: "bottom" }}>
                        {heroWords[heroWord]}
                      </motion.span>
                    </AnimatePresence>
                    <motion.span className="absolute -bottom-2 left-0 h-1 bg-[#d4622b] rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 1, duration: 0.8 }} />
                  </span>
                </motion.div>
              </div>
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-8 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
              Premium coworking spaces across Delhi NCR. Designed for teams that refuse to settle for ordinary.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }} className="mt-10 flex flex-col sm:flex-row gap-4">
              <MagneticButton href="#contact" className="inline-flex items-center justify-center bg-[#d4622b] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#b8501f] transition-colors shadow-[0_0_40px_rgba(212,98,43,0.25)]">
                Book a Tour
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </MagneticButton>
              <a href="tel:9910668152" className="inline-flex items-center justify-center gap-3 text-white hover:text-[#d4622b] px-8 py-4 rounded-full border border-white/30 hover:border-[#d4622b]/60 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all shadow-sm">
                <svg className="w-5 h-5 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                +91 9910668152
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7 }} className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden shadow-sm border border-white/20">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-md p-5 sm:p-6 text-center group hover:bg-white/20 transition-colors">
                  <div className="text-2xl sm:text-3xl font-bold text-[#d4622b]"><SpringCounter target={s.value} suffix={s.suffix} /></div>
                  <div className="text-white/90 text-xs mt-1 font-medium">{s.label}</div>
                  <div className="text-white/60 text-[10px] mt-0.5 group-hover:text-[#d4622b] transition-colors">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        )}

        {/* Scroll indicator */}
        {introComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-6 right-8 flex flex-col items-center gap-2 z-10">
          <span className="text-gray-400 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-6 bg-gradient-to-b from-[#d4622b]/50 to-transparent" />
        </motion.div>
        )}
      </section>


      {/* ━━━ SECTION 2: BRAND LOGOS TICKER ━━━ */}
      <section className="relative py-14 bg-[#faf8f5] overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-10 px-6">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4622b] font-bold">
            In Good Company
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#1a1a2e] tracking-tight">
            Trusted by 250+ teams
          </h2>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#faf8f5] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#faf8f5] to-transparent" />

        <motion.div
          className="flex w-max gap-4 whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].flatMap((_, r) =>
            brandPartners.map((partner, i) => (
              <div
                key={`logo-ticker-${r}-${partner.name}-${i}`}
                className="shrink-0 px-8 py-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_8px_24px_-16px_rgba(26,26,46,0.2)] hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.3)] transition-all flex items-center justify-center min-w-[170px] h-[74px] group"
                title={partner.name}
              >
                <partner.Logo className="h-7 sm:h-8 w-auto max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
            )),
          )}
        </motion.div>
      </section>

      {/* ━━━ SOLUTIONS — 3D SPOTLIGHT BENTO GRID ━━━ */}
      <section id="solutions" className="py-16 lg:py-20 bg-[#faf8f5] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Reveal>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
                <span className="w-6 h-px bg-[#d4622b]" /> Solutions
                <span className="w-6 h-px bg-[#d4622b]" />
              </span>
            </Reveal>
            <AnimatedHeading
              text="Office Space Solutions"
              highlight="Solutions"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3 leading-tight"
            />
            <Reveal delay={0.2}>
              <p className="mt-4 text-gray-500 text-lg leading-relaxed">
                Flexible office solutions aligned with your business needs and
                growth trajectory.
              </p>
            </Reveal>
          </div>

          {/* Desktop — continuous auto-scrolling slider, no controls */}
          <div className="hidden md:block relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#faf8f5] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#faf8f5] to-transparent" />
            <motion.div
              className="flex w-max gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[...solutions, ...solutions].map((sol, i) => (
                <div key={`${sol.title}-${i}`} className="w-[360px] shrink-0">
                  <SolutionCard sol={sol} />
                </div>
              ))}
            </motion.div>
          </div>
          {/* Mobile auto-slider */}
          <AutoSlider interval={3500}>
            {solutions.map((sol) => (
              <SolutionCard key={sol.title} sol={sol} />
            ))}
          </AutoSlider>
        </div>
      </section>

      {/* ━━━ OUR TOP LOCATIONS IN DELHI NCR ━━━ */}
      <section
        id="locations"
        className="py-20 lg:py-24 bg-white relative overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight">
              Our Top Locations in Delhi NCR
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl mx-auto">
              Begin your path to success with Onward Workspaces in Delhi NCR. Our strategically located facilities ensure unparalleled convenience, accessibility, and excellence for your workspace needs
            </p>
          </div>

          {/* 3 City Cards (Delhi, Noida, Gurugram) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Delhi */}
            <div
              className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80"
                  alt="Delhi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="py-5 text-center bg-white border-t border-gray-100">
                <h3 className="text-xl font-bold text-[#111827] tracking-tight group-hover:text-[#d4622b] transition-colors">
                  Delhi
                </h3>
              </div>
            </div>

            {/* Noida */}
            <div
              className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80"
                  alt="Noida"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="py-5 text-center bg-white border-t border-gray-100">
                <h3 className="text-xl font-bold text-[#111827] tracking-tight group-hover:text-[#d4622b] transition-colors">
                  Noida
                </h3>
              </div>
            </div>

            {/* Gurugram */}
            <div
              className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                  alt="Gurugram"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="py-5 text-center bg-white border-t border-gray-100">
                <h3 className="text-xl font-bold text-[#111827] tracking-tight group-hover:text-[#d4622b] transition-colors">
                  Gurugram
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ GALLERY ━━━ */}
      <section className="py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-14 text-center">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#d4622b]" /> Gallery
              <span className="w-6 h-px bg-[#d4622b]" />
            </span>
          </Reveal>
          <AnimatedHeading
            text="Explore Our Workspace Gallery"
            highlight="Workspace Gallery"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3 md:whitespace-nowrap"
          />
        </div>
        <GallerySlider />
      </section>

      {/* ━━━ TRUSTED BY ENTERPRISE LEADERS ━━━ */}
      <TrustedLeadersSection />

      {/* ━━━ ENTERPRISES USING ONWARD WORKSPACES ━━━ */}
      <EnterprisesSection />

      {/* ━━━ NEWS & MEDIA TICKER ━━━ */}
      <NewsMediaSection />

      {/* ━━━ CONTACT SECTION WITH SCROLLING PARALLAX ━━━ */}
      <ContactSection />

      {/* ━━━ FOOTER (SEQUEL.CO STYLE) ━━━ */}
      <footer className="bg-[#faf8f5] text-gray-500 pt-14 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 sm:gap-12 mb-12">
            <div className="col-span-2 sm:col-span-4 lg:col-span-1">
              <a href="#" className="flex items-center gap-3 mb-5 group">
                <Image
                  src="/onward-logo.png"
                  alt="Onward Workspaces"
                  width={38}
                  height={38}
                  className="w-9 h-9 object-contain group-hover:rotate-6 transition-transform"
                />
                <div className="leading-none">
                  <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">
                    Onward
                  </span>
                  <span className="block text-[9px] text-gray-400 tracking-[0.25em]">
                    WORKSPACES
                  </span>
                </div>
              </a>
              <p className="text-sm leading-relaxed max-w-xs text-gray-500">
                Premium coworking spaces built around your brand, ambition, and people across Delhi NCR.
              </p>
            </div>
            {[
              {
                title: "Solutions",
                links: [
                  "Managed Office",
                  "Private Suites",
                  "Virtual Office",
                  "On-Demand",
                  "Custom Built",
                ],
              },
              {
                title: "Locations",
                links: ["Delhi", "Noida", "Gurgaon", "All Locations"],
              },
              {
                title: "Company",
                links: [
                  "About Us",
                  "Blog",
                  "Careers",
                  "Enterprise",
                  "Contact",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[#1a1a2e] font-semibold text-xs mb-5 uppercase tracking-widest">
                  {col.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href={l === "Blog" ? "/blog" : "#"}
                        className="text-gray-500 hover:text-[#d4622b] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Onward Workspaces. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-gray-500 hover:text-[#d4622b] transition-colors"
                  >
                    {l}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
