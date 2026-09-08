"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";
import SpotlightCard from "@/components/SpotlightCard";
import SpringCounter from "@/components/SpringCounter";
import FeatureTimeline from "@/components/FeatureTimeline";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";

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
    size: "lg",
  },
  {
    title: "Private Suites",
    desc: "Fully-managed private cabins for high-velocity teams of 10 to 100+ members.",
    tag: "TEAMS",
    size: "sm",
  },
  {
    title: "Private Cabins",
    desc: "Fully-equipped executive space crafted specifically for partners and directors.",
    tag: "EXECUTIVE",
    size: "sm",
  },
  {
    title: "Virtual Office",
    desc: "Prestigious CBD business address with mail handling & zero overhead costs.",
    tag: "REMOTE",
    size: "md",
  },
  {
    title: "On-Demand",
    desc: "Boardrooms, meeting suites & flexible day passes on the go across NCR.",
    tag: "FLEXIBLE",
    size: "md",
  },
  {
    title: "Custom Built",
    desc: "End-to-end bespoke interior architecture tailored to your company identity.",
    tag: "BESPOKE",
    size: "lg",
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

  const goTo = (i: number) => {
    setDir(i > current ? 1 : -1);
    setCurrent(i);
  };
  const prev = () => { setDir(-1); setCurrent((p) => (p - 1 + total) % total); };
  const next = () => { setDir(1); setCurrent((p) => (p + 1) % total); };

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
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${slide.grad[0]} 0%, ${slide.grad[1]} 50%, ${slide.grad[2]} 100%)`,
              }}
            >
              {/* Dot grid */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle, ${slide.shape}33 1.5px, transparent 1.5px)`,
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Decorative geometric shapes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" fill="none">
                <circle cx="900" cy="100" r="220" stroke={slide.shape} strokeOpacity="0.08" strokeWidth="80" />
                <circle cx="900" cy="100" r="120" stroke={slide.shape} strokeOpacity="0.06" strokeWidth="40" />
                <rect x="80" y="300" width="200" height="200" rx="40" fill={slide.shape} fillOpacity="0.04" />
                <rect x="120" y="340" width="120" height="120" rx="24" fill={slide.shape} fillOpacity="0.05" />
                <line x1="0" y1="200" x2="1200" y2="200" stroke={slide.shape} strokeOpacity="0.04" strokeWidth="1" />
                <line x1="0" y1="320" x2="1200" y2="320" stroke={slide.shape} strokeOpacity="0.04" strokeWidth="1" />
                <line x1="400" y1="0" x2="400" y2="520" stroke={slide.shape} strokeOpacity="0.04" strokeWidth="1" />
                <line x1="800" y1="0" x2="800" y2="520" stroke={slide.shape} strokeOpacity="0.04" strokeWidth="1" />
              </svg>

              {/* Central illustration — floating building */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="opacity-15"
                >
                  <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                    <rect x="40" y="60" width="100" height="100" rx="8" fill={slide.shape} />
                    <rect x="55" y="40" width="70" height="25" rx="4" fill={slide.shape} />
                    <rect x="65" y="25" width="50" height="18" rx="3" fill={slide.shape} />
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

            {/* Bottom caption overlay */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#d4622b] uppercase bg-white/70 px-2.5 py-1 rounded-full">
                  {slide.tag}
                </span>
                <h3 className="mt-2 text-3xl lg:text-4xl font-bold text-[#1a1a2e]">{slide.title}</h3>
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

      {/* Controls row */}
      <div className="mt-6 px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {gallerySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2 bg-[#d4622b]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="hidden sm:block flex-1 mx-8 h-px bg-gray-200 relative overflow-hidden rounded-full">
          <motion.div
            key={current}
            className="absolute inset-y-0 left-0 bg-[#d4622b] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: paused ? undefined : "100%" }}
            transition={{ duration: interval / 1000, ease: "linear" }}
          />
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-2 items-center">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#d4622b] hover:text-[#d4622b] transition-all hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-[#d4622b] flex items-center justify-center text-white hover:bg-[#b8501f] transition-all hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function SolutionCard({ sol }: { sol: (typeof solutions)[number] }) {
  return (
    <SpotlightCard className="p-8 h-full min-h-[240px] cursor-pointer group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#d4622b] bg-[#d4622b]/10 border border-[#d4622b]/20 px-3 py-1 rounded-full">
            {sol.tag}
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#d4622b] group-hover:text-white transition-colors duration-300 shadow-sm">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
        <h3 className="mt-6 text-2xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors duration-300">
          {sol.title}
        </h3>
        <p className="mt-3 text-gray-500 leading-relaxed text-sm">
          {sol.desc}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-[#d4622b] text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        Explore Specifications &rarr;
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

        {/* Seats pill — top right */}
        <span className="absolute top-3 right-3 text-[10px] font-bold text-[#d4622b] bg-white border border-[#d4622b]/20 px-2.5 py-1 rounded-full shadow-sm">
          {hub.seats}
        </span>

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
  const [heroWord, setHeroWord] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
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
    const sh = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", sh);
    return () => {
      clearInterval(wt);
      window.removeEventListener("scroll", sh);
    };
  }, []);

  return (
    <>
      {/* ━━━ NAV ━━━ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100/50"
            : "bg-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/onward-logo.png"
              alt="Onward Workspaces"
              width={38}
              height={38}
              className="w-9 h-9 object-contain group-hover:rotate-6 transition-transform"
              priority
            />
            <div className="leading-none">
              <span className="text-xl font-bold tracking-tight text-[#1a1a2e]">
                Onward
              </span>
              <span className="block text-[9px] tracking-[0.25em] text-gray-400">
                WORKSPACES
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {["Home", "About", "Solutions", "Locations", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-[#d4622b]"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticButton
              href="#contact"
              className="hidden lg:flex bg-[#d4622b] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#b8501f] transition-colors shadow-md"
            >
              Get Started
            </MagneticButton>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden"
            >
              <div className="w-7 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-gray-800 transition-all origin-center ${
                    mobileMenu ? "rotate-45 translate-y-[9px]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-gray-800 transition-all ${
                    mobileMenu ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-gray-800 transition-all origin-center ${
                    mobileMenu ? "-rotate-45 -translate-y-[9px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {["Home", "About", "Solutions", "Locations", "Contact"].map(
                  (l) => (
                    <a
                      key={l}
                      href={`#${l.toLowerCase()}`}
                      onClick={() => setMobileMenu(false)}
                      className="block text-gray-700 font-medium text-lg"
                    >
                      {l}
                    </a>
                  ),
                )}
                <a
                  href="#contact"
                  onClick={() => setMobileMenu(false)}
                  className="block bg-[#d4622b] text-white text-center py-3.5 rounded-full font-semibold"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ━━━ HERO — FULL-BLEED BACKGROUND VIDEO CAROUSEL ━━━ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden"
        id="home"
      >
        {/* Background carousel */}
        <div className="absolute inset-0 z-0">
          <HeroVideoCarousel />
        </div>

        {/* White blend — left and right edges */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white/95 via-white/40 to-white/70" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16"
        >
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="inline-flex items-center gap-3 bg-[#d4622b]/5 border border-[#d4622b]/15 rounded-full px-5 py-2 mb-10 shadow-sm">
              <span className="w-2 h-2 bg-[#d4622b] rounded-full animate-pulse" />
              <span className="text-[#d4622b] text-sm font-semibold">2 Day Free Trial Available</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] font-bold text-[#1a1a2e] leading-[1.05] tracking-tight">
              <div className="overflow-hidden">
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
                  Workspace built
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}>
                  around{" "}
                  <span className="relative inline-block">
                    <AnimatePresence mode="wait">
                      <motion.span key={heroWord} initial={{ y: 40, opacity: 0, rotateX: -40 }} animate={{ y: 0, opacity: 1, rotateX: 0 }} exit={{ y: -40, opacity: 0, rotateX: 40 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="inline-block text-gradient" style={{ transformOrigin: "bottom" }}>
                        {heroWords[heroWord]}
                      </motion.span>
                    </AnimatePresence>
                    <motion.span className="absolute -bottom-2 left-0 h-1 bg-[#d4622b] rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 1, duration: 0.8 }} />
                  </span>
                </motion.div>
              </div>
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-8 text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed">
              Premium coworking spaces across Delhi NCR. Designed for teams that refuse to settle for ordinary.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }} className="mt-10 flex flex-col sm:flex-row gap-4">
              <MagneticButton href="#contact" className="inline-flex items-center justify-center bg-[#d4622b] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#b8501f] transition-colors shadow-[0_0_40px_rgba(212,98,43,0.25)]">
                Book a Tour
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </MagneticButton>
              <a href="tel:9910668152" className="inline-flex items-center justify-center gap-3 text-gray-600 hover:text-[#d4622b] px-8 py-4 rounded-full border border-gray-200 hover:border-[#d4622b]/30 bg-white/60 backdrop-blur-sm transition-all shadow-sm">
                <svg className="w-5 h-5 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                +91 9910668152
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7 }} className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200/60 rounded-2xl overflow-hidden shadow-sm">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 text-center group hover:bg-white transition-colors">
                  <div className="text-2xl sm:text-3xl font-bold text-[#d4622b]"><SpringCounter target={s.value} suffix={s.suffix} /></div>
                  <div className="text-gray-600 text-xs mt-1 font-medium">{s.label}</div>
                  <div className="text-gray-400 text-[10px] mt-0.5 group-hover:text-[#d4622b]/70 transition-colors">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-6 right-8 flex flex-col items-center gap-2 z-10">
          <span className="text-gray-400 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-6 bg-gradient-to-b from-[#d4622b]/50 to-transparent" />
        </motion.div>
      </section>

      {/* ━━━ SOLUTIONS — 3D SPOTLIGHT BENTO GRID ━━━ */}
      <section id="solutions" className="py-24 lg:py-32 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                  <span className="w-6 h-px bg-[#d4622b]" /> Solutions
                </span>
              </Reveal>
              <AnimatedHeading
                text="Space that fits your ambition"
                highlight="your ambition"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3 leading-tight"
              />
            </div>
            <Reveal delay={0.2}>
              <p className="text-gray-500 max-w-md text-lg">
                Flexible office solutions aligned with your business needs and
                growth trajectory.
              </p>
            </Reveal>
          </div>

          {/* Desktop 3D Tilt Spotlight grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, i) => (
              <Reveal
                key={sol.title}
                delay={i * 0.07}
                className={sol.size === "lg" ? "lg:col-span-1" : ""}
              >
                <SolutionCard sol={sol} />
              </Reveal>
            ))}
          </div>
          {/* Mobile auto-slider */}
          <AutoSlider interval={3500}>
            {solutions.map((sol) => (
              <SolutionCard key={sol.title} sol={sol} />
            ))}
          </AutoSlider>
        </div>
      </section>

      {/* ━━━ FEATURES — INTERACTIVE PROGRESS TIMELINE ━━━ */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                  <span className="w-6 h-px bg-[#d4622b]" /> Why Onward
                </span>
              </Reveal>
              <AnimatedHeading
                text="Not just a desk. A launchpad."
                highlight="A launchpad."
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3 leading-tight"
              />
              <Reveal delay={0.25}>
                <p className="mt-6 text-gray-500 text-lg leading-relaxed">
                  We don&apos;t rent space. We build environments where
                  ambitious teams do their life&apos;s work.
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <MagneticButton
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-8 bg-[#d4622b] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b8501f] transition-colors shadow-md"
                >
                  See it for yourself
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>
              </Reveal>
            </div>

            <div>
              <FeatureTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ LOCATIONS & INTERACTIVE NCR MAP ━━━ */}
      <section
        id="locations"
        className="py-24 lg:py-32 bg-[#faf8f5] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <Reveal>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                Locations
              </span>
            </Reveal>
            <AnimatedHeading
              text="Find us everywhere you need"
              highlight="everywhere"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3"
            />
          </div>

          {/* City Selector Floating Pills */}
          <div className="flex justify-center mb-14">
            <div className="inline-flex p-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
              {cities.map((c) => {
                const isActive = activeCity === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setActiveCity(c.name)}
                    className="relative px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCityPill"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-full bg-[#d4622b] shadow-[0_4px_20px_rgba(212,98,43,0.35)]"
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isActive
                          ? "text-white font-bold"
                          : "text-gray-600 hover:text-[#d4622b]"
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location Center Cards with Staggered Animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.05 },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.2 },
                },
              }}
              className="hidden sm:grid sm:grid-cols-3 gap-6"
            >
              {cities
                .find((c) => c.name === activeCity)
                ?.hubs.map((hub) => (
                  <motion.div
                    key={hub.spot}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                      exit: {
                        opacity: 0,
                        y: -20,
                        scale: 0.95,
                        transition: { duration: 0.2 },
                      },
                    }}
                  >
                    <LocationCard hub={hub} city={activeCity} />
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Mobile auto-slider */}
          <AutoSlider interval={3500} className="sm:hidden" dotColor="light">
            {(cities.find((c) => c.name === activeCity)?.hubs || []).map(
              (hub) => (
                <LocationCard key={hub.spot} hub={hub} city={activeCity} />
              ),
            )}
          </AutoSlider>
        </div>
      </section>

      {/* ━━━ GALLERY ━━━ */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
              <span className="w-6 h-px bg-[#d4622b]" /> Gallery
            </span>
          </Reveal>
          <AnimatedHeading
            text="See the space crafted for you"
            highlight="crafted for you"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3"
          />
        </div>
        <GallerySlider />
      </section>

      {/* ━━━ TESTIMONIALS SECTION WITH THREAD ANIMATION ━━━ */}
      <TestimonialsSection />

      {/* ━━━ LOGO MARQUEE ━━━ */}
      <section className="py-16 bg-white border-y border-gray-100">
        <Marquee speed={25}>
          {logos.map((l) => (
            <span
              key={l}
              className="text-2xl font-bold text-gray-300 tracking-wider whitespace-nowrap hover:text-[#d4622b] transition-colors"
            >
              {l}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ━━━ CONTACT SECTION WITH SCROLLING PARALLAX ━━━ */}
      <ContactSection />

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[#faf8f5] text-gray-400 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
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
              <p className="text-sm leading-relaxed">
                Premium coworking spaces built around your brand, ambition, and
                people.
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
                <h4 className="text-[#1a1a2e] font-semibold text-sm mb-5 uppercase tracking-wider">
                  {col.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="hover:text-[#d4622b] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; 2024 Onward Workspaces. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="hover:text-[#d4622b] transition-colors"
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
