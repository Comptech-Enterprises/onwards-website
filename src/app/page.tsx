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
import StrategicLocationsMap from "@/components/StrategicLocationsMap";
import {
  brandPartners,
  DpWorldLogo,
  ClarksonsLogo,
  ThermaxGridLogo,
  OpraahLogo,
  SageLogo,
  TvsSupplyChainLogo,
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

const whyChoose = [
  { title: "Strategically Positioned", desc: "Our locations are strategically positioned in vibrant business centers, guaranteeing that you are constantly at the heart of opportunities.", icon: "M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
  { title: "Culture of Triumph", desc: "Step into a space where every element is meticulously designed to elevate you to new heights, crafted to empower you on your journey to greatness.", icon: "M8 21h8m-4-4v4m-5-18h10v5a5 5 0 01-10 0V3zm10 2h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3" },
  { title: "Amenities Beyond Ordinary", desc: "Immerse yourself in a world of cutting-edge facilities, from futuristic tech to tailor-made workspaces, all designed to amplify your workflow.", icon: "M13 2L4 14h7l-1 8 9-12h-7l1-8z" },
];

const newsMediaItems = [
  { name: "ABP Live", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022006545.webp", href: "https://news.abplive.com/business/india-premium-housing-market-nri-investment-slowdown-west-asia-tensions-anarock-q1-2026-report-1843884" },
  { name: "News18", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022006623.webp", href: "https://www.news18.com/amp/agency-feeds/onward-workspaces-leases-1-65-lakh-sq-ft-to-accenture-in-noida-9988325.html" },
  { name: "Moneycontrol", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022006633.webp", href: "https://www.moneycontrol.com/news/business/quick-recovery-lingering-doubts-noida-labour-unrest-tests-investor-trust-13889510.html" },
  { name: "NDTV", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022006641.webp", href: "https://www.ndtv.com/india-news/urban-india-modern-housing-societies-integrated-townships-real-estate-luxury-city-life-11625443/amp/1" },
  { name: "Indian Retailer", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022006742.webp", href: "https://www.indianretailer.com/article/retail-business/retail-trends/5-coworking-brands-changing-way-india-works-connects-and" },
  { name: "Times of India", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022006664.webp", href: "https://timesofindia.indiatimes.com/real-estate/news/why-flexible-workspaces-are-becoming-a-key-asset-class-in-indias-commercial-real-estate/articleshow/130857915.cms" },
  { name: "PTI News", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022006714.webp", href: "https://www.ptinews.com/story/business/onward-workspaces-leases-1-65-lakh-sq-ft-to-accenture-in-noida/3483678" },
  { name: "Realty Plus", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022006922.webp", href: "https://www.rprealtyplus.com/news-views/why-indias-smartest-offices-are-now-built-to-be-shared-126088.html" },
  { name: "Outlook India", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022323187.webp", href: "https://www.outlookindia.com/announcements/news-media-wire/from-capital-gains-to-cash-flow" },
  { name: "Sugermint", img: "https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1786022323207.webp", href: "https://sugermint.com/interview-suvrat-jain-onward-workspaces/" },
];

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

const cityCards = [
  {
    name: "Delhi",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Noida",
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Gurugram",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
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
      <div className="relative overflow-hidden rounded-none lg:rounded-3xl mx-0 lg:mx-8 lg:max-w-7xl lg:mx-auto h-[380px] sm:h-[460px] lg:h-[520px]">
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
            <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-8 pb-5 sm:pb-8 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#1a1a2e] leading-snug">{slide.title}</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500 font-medium">{slide.location}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a2e]/10 leading-none">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">/ {String(total).padStart(2, "0")}</div>
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
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
              Testimonials
            </span>
          </Reveal>
          <AnimatedHeading
            text="Trusted by Enterprise Leaders"
            highlight="Enterprise Leaders"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600 mt-2"
          />
          <Reveal delay={0.1}>
            <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-center">
              These success stories showcase the real impact of our coworking spaces and services, providing valuable insights into how we can support your business needs &amp; aspirations.
            </p>
          </Reveal>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {enterpriseTestimonials.map((t) => {
            const isExpanded = !!expanded[t.id];
            return (
              <div
                key={t.id}
                className="bg-white rounded-3xl border border-gray-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_-12px_rgba(26,26,46,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(212,98,43,0.18)] hover:border-[#d4622b]/40 hover:-translate-y-1.5 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-[#d4622b] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal text-justify">
                    &ldquo;{isExpanded ? t.fullQuote : t.shortQuote}&rdquo;
                    <button type="button" onClick={() => toggleExpand(t.id)} className="ml-2 font-semibold text-[#d4622b] hover:text-[#b8501f] transition-colors inline-flex items-center gap-0.5 text-xs group/btn">
                      {isExpanded ? "Read Less" : "Read More"}
                      <span className="transition-transform group-hover/btn:translate-x-0.5">&rarr;</span>
                    </button>
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100">
                  {t.logo}
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#1a1a2e] text-sm sm:text-base leading-snug">{t.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 font-normal leading-snug mt-0.5 truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Mobile auto-slider */}
        <div className="md:hidden">
          <AutoSlider interval={4000}>
            {enterpriseTestimonials.map((t) => {
              const isExpanded = !!expanded[t.id];
              return (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl border border-gray-200/90 p-7 flex flex-col justify-between shadow-[0_8px_30px_-12px_rgba(26,26,46,0.1)]"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-[#d4622b] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal text-justify">
                      &ldquo;{isExpanded ? t.fullQuote : t.shortQuote}&rdquo;
                      <button type="button" onClick={() => toggleExpand(t.id)} className="ml-2 font-semibold text-[#d4622b] inline-flex items-center gap-0.5 text-xs">
                        {isExpanded ? "Read Less" : "Read More"}<span>&rarr;</span>
                      </button>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100">
                    {t.logo}
                    <div className="min-w-0">
                      <h4 className="font-bold text-[#1a1a2e] text-sm leading-snug">{t.name}</h4>
                      <p className="text-xs text-gray-500 font-normal leading-snug mt-0.5 truncate">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </AutoSlider>
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
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
              Enterprise Network
            </span>
          </Reveal>
          <AnimatedHeading
            text="Enterprises using Onward Workspaces"
            highlight="Onward Workspaces"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600 mt-2"
          />
          <Reveal delay={0.1}>
            <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-center">
              Elevate your workspace experience and be part of a movement that redefines success
            </p>
          </Reveal>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 items-stretch max-w-6xl mx-auto">
          {enterpriseBrands.map((brand) => (
            <div
              key={brand.name}
              title={brand.name}
              className="px-4 sm:px-6 py-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_8px_24px_-16px_rgba(26,26,46,0.18)] hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-[72px] sm:h-[78px] group cursor-default"
            >
              <brand.Logo className="h-6 sm:h-8 w-auto max-w-[110px] sm:max-w-[125px] object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
          ))}
        </div>
        {/* Mobile auto-slider */}
        <div className="sm:hidden">
          <AutoSlider interval={2500}>
            {enterpriseBrands.map((brand) => (
              <div
                key={brand.name}
                title={brand.name}
                className="px-6 py-6 rounded-2xl bg-white border border-gray-200/90 shadow-[0_8px_24px_-16px_rgba(26,26,46,0.18)] flex items-center justify-center h-[90px]"
              >
                <brand.Logo className="h-8 w-auto max-w-[140px] object-contain" />
              </div>
            ))}
          </AutoSlider>
        </div>
      </div>
    </section>
  );
}

function NewsMediaSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#faf8f5] border-t border-gray-200/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
              Press &amp; Recognition
            </span>
          </Reveal>
          <AnimatedHeading
            text="News & Media"
            highlight="Media"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600 mt-2"
          />
          <Reveal delay={0.1}>
            <p className="mt-3 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto text-center">
              We understand that selecting the right co-working space is a crucial decision.{" "}
              <br className="hidden md:inline" />
              We&apos;re here to help you make an informed choice and tailor our offerings to meet your specific needs.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Infinite Smooth Scrolling Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-44 z-10 bg-gradient-to-r from-[#faf8f5] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-44 z-10 bg-gradient-to-l from-[#faf8f5] to-transparent" />

        <motion.div
          className="flex w-max gap-4 sm:gap-6 items-center py-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].flatMap((_, r) =>
            newsMediaItems.map((item, i) => (
              <a
                key={`media-${r}-${item.name}-${i}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                className="shrink-0 px-6 sm:px-8 py-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_8px_24px_-16px_rgba(26,26,46,0.18)] hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center min-w-[150px] sm:min-w-[170px] h-[72px] sm:h-[78px] group"
              >
                <img src={item.img} alt={item.name} className="h-6 sm:h-8 w-auto max-w-[120px] sm:max-w-[135px] object-contain transition-transform duration-300 group-hover:scale-105" />
              </a>
            )),
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionCard({ sol }: { sol: (typeof solutions)[number] }) {
  return (
    <SpotlightCard className="h-full min-h-[360px] cursor-pointer group relative overflow-hidden border border-gray-200 bg-white transition-all duration-500 flex flex-col justify-between">
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
          <h3 className="text-2xl font-bold text-black">
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
              className="w-4 h-4"
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



export default function Home() {
  const [introComplete] = useState(true);
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

      {/* ━━━ HERO — FULL-BLEED BACKGROUND VIDEO CAROUSEL ━━━ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden"
        id="home"
      >
        {/* Background static image — light coworking space */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')" }}
        />

        {/* Overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 sm:py-24 text-center flex flex-col items-center justify-center"
        >
          <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-white leading-tight tracking-tight text-center px-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              Workspace built around{" "}
              <span className="relative inline-grid text-left align-baseline">
                <span aria-hidden className="invisible col-start-1 row-start-1">Ambition</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroWord}
                    initial={{ y: 35, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -35, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="col-start-1 row-start-1 text-[#d4622b]"
                  >
                    {heroWords[heroWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto text-center leading-relaxed px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
            >
              Premium coworking spaces across Delhi NCR. Designed for teams that refuse to settle for ordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4"
            >
              <MagneticButton
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#d4622b] text-white px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#b8501f] transition-colors shadow-[0_0_40px_rgba(212,98,43,0.25)]"
              >
                Book a Tour
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </MagneticButton>
              <a
                href="tel:9910668152"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white hover:text-[#d4622b] px-8 py-3.5 sm:py-4 rounded-full border border-white/30 hover:border-[#d4622b]/60 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all shadow-sm text-base sm:text-lg font-semibold"
              >
                <svg className="w-5 h-5 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                +91 9910668152
              </a>
            </motion.div>

            {/* ━━━ STATS STRIP ON TOP OF HERO IMAGE ━━━ */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-16 sm:mt-20 lg:mt-24 w-full max-w-5xl mx-auto"
            >
              <div className="rounded-2xl sm:rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-300/60">
                {stats.map((s) => (
                  <div key={s.label} className="py-3 sm:py-2 text-center px-3">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d4622b]">
                      <SpringCounter target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-[#1a1a2e] text-xs sm:text-sm mt-1 font-bold">{s.label}</div>
                    <div className="text-gray-700 text-[10px] sm:text-xs mt-0.5 font-semibold">{s.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-6 right-8 hidden lg:flex flex-col items-center gap-2 z-10">
          <span className="text-white/60 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-6 bg-gradient-to-b from-[#d4622b] to-transparent" />
        </motion.div>
      </section>

      {/* ━━━ SOLUTIONS — 3D SPOTLIGHT BENTO GRID ━━━ */}
      <section id="solutions" className="py-16 lg:py-20 bg-[#faf8f5] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Reveal>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
                Solutions
              </span>
            </Reveal>
            <AnimatedHeading
              text="Office Space Solutions"
              highlight="Solutions"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600 mt-2 leading-tight"
            />
            <Reveal delay={0.2}>
              <p className="mt-3 text-gray-700 text-base sm:text-lg leading-relaxed">
                Flexible office solutions aligned with your business needs and
                growth trajectory.
              </p>
            </Reveal>
          </div>

          {/* Manual horizontal scroll */}
          <div className="flex gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {solutions.map((sol) => (
              <div key={sol.title} className="w-[85%] sm:w-[340px] lg:w-[360px] shrink-0 snap-start">
                <SolutionCard sol={sol} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ WHY CHOOSE US ━━━ */}
      <section id="why-choose-us" className="py-16 lg:py-20 bg-white border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto text-center mb-12 max-w-4xl">
            <Reveal>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
                Why Choose Us
              </span>
            </Reveal>
            <AnimatedHeading
              text="Revolutionise Your Workspace."
              highlight="Workspace."
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600 mt-2 leading-tight"
            />
            <Reveal delay={0.2}>
              <p className="mt-3 text-gray-700 text-base sm:text-lg leading-relaxed">
                Whether you have questions about membership options, need assistance with technical aspects, or want to explore customization possibilities for your workspace, our experts are here to provide you with personalized guidance and solutions.
              </p>
            </Reveal>
          </div>
          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {whyChoose.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1}>
                <div className="h-full min-w-0 rounded-3xl bg-[#faf8f5] border border-gray-200/80 p-8 hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.3)] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#d4622b]/10 flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon} /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 break-words">{w.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Mobile auto-slider */}
          <div className="md:hidden">
            <AutoSlider interval={3500}>
              {whyChoose.map((w) => (
                <div key={w.title} className="h-full min-w-0 rounded-3xl bg-[#faf8f5] border border-gray-200/80 p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#d4622b]/10 flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon} /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">{w.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </AutoSlider>
          </div>
        </div>
      </section>

      {/* ━━━ OUR TOP CITIES IN DELHI NCR ━━━ */}
      <section
        className="py-16 lg:py-20 bg-white relative overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <Reveal>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
                NCR Presence
              </span>
            </Reveal>
            <AnimatedHeading
              text="Our Top Cities in Delhi NCR"
              highlight="Delhi NCR"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600 mt-2"
            />
            <Reveal delay={0.1}>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Begin your path to success with Onward Workspaces across Delhi, Noida, and Gurugram.
              </p>
            </Reveal>
          </div>

          {/* Desktop — 3 City Cards (Delhi, Noida, Gurugram) */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {cityCards.map((city) => (
              <div
                key={city.name}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={city.img}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="py-5 text-center bg-white border-t border-gray-100">
                  <h3 className="text-xl font-bold text-[#111827] tracking-tight group-hover:text-[#d4622b] transition-colors">
                    {city.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile — auto-slider */}
          <AutoSlider interval={3500}>
            {cityCards.map((city) => (
              <div
                key={city.name}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={city.img}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-5 text-center bg-white border-t border-gray-100">
                  <h3 className="text-xl font-bold text-[#111827] tracking-tight">
                    {city.name}
                  </h3>
                </div>
              </div>
            ))}
          </AutoSlider>
        </div>
      </section>

      {/* ━━━ STRATEGIC LOCATIONS SECTION (LIGHT THEME SEAMLESS NERVE MAP) ━━━ */}
      <section
        id="locations"
        className="py-20 lg:py-28 bg-[#faf8f5] text-[#1a1a2e] relative overflow-hidden border-t border-gray-200/80"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <StrategicLocationsMap />
        </div>
      </section>

      {/* ━━━ ENTERPRISES USING ONWARD WORKSPACES ━━━ */}
      <EnterprisesSection />

      {/* ━━━ GALLERY ━━━ */}
      <section className="py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-10 sm:mb-12 text-center">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
              Gallery
            </span>
          </Reveal>
          <AnimatedHeading
            text="Explore Our Workspace Gallery"
            highlight="Workspace Gallery"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600 mt-2"
          />
        </div>
        <GallerySlider />
      </section>

      {/* ━━━ CONTACT SECTION WITH SCROLLING PARALLAX ━━━ */}
      <ContactSection />

      {/* ━━━ TRUSTED BY ENTERPRISE LEADERS ━━━ */}
      <TrustedLeadersSection />

      {/* ━━━ NEWS & MEDIA TICKER ━━━ */}
      <NewsMediaSection />

      {/* ━━━ FOOTER (CLEAN LIGHT THEME) ━━━ */}
      <footer className="bg-[#faf8f5] text-gray-500 pt-16 pb-10 border-t border-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 items-start">
            {/* Logo + Bio */}
            <div className="lg:col-span-5">
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
              <p className="text-sm leading-relaxed text-gray-500 max-w-sm">
                Premium coworking spaces built around your brand, ambition, and people across Delhi NCR.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs text-gray-500">
                <div>
                  <span className="font-semibold text-[#1a1a2e] block">Direct Phone:</span>
                  <a href="tel:9910668152" className="hover:text-[#d4622b] transition-colors">+91 9910668152</a>
                </div>
                <div>
                  <span className="font-semibold text-[#1a1a2e] block">Email:</span>
                  <a href="mailto:info@onwardworkspaces.com" className="hover:text-[#d4622b] transition-colors">info@onwardworkspaces.com</a>
                </div>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
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
                          className="relative inline-block text-[#1a1a2e] hover:text-[#d4622b] transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#d4622b] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Onward Workspaces. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="relative inline-block text-[#1a1a2e] hover:text-[#d4622b] transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#d4622b] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
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
