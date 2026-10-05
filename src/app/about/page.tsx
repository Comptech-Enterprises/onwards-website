"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import RotatingPhotoStack from "@/components/RotatingPhotoStack";

/* ━━━ DATA ━━━ */

const valuesList = [
  {
    id: "excellence",
    title: "A commitment to excellence",
    desc: "We love building and we are all rather obsessed with making things better. This is what every client, big or small, can expect from us—from enterprise to Web3 innovators.",
    icon: (
      <svg className="w-10 h-10 text-[#d4622b]" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="14" cy="25" r="6" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="26" cy="25" r="6" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="20" cy="21" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "wellness",
    title: "Work-life & personal wellness",
    desc: "We are human-centric to the core. Our workspaces integrate abundant natural biophilic greenery, ergonomic posture seating, dedicated breakout lounges, mother care rooms, and meditation corners. We believe true productivity flows from balanced well-being.",
    icon: (
      <svg className="w-10 h-10 text-[#d4622b]" viewBox="0 0 40 40" fill="none">
        <path d="M20 32s-12-7.5-12-16a8 8 0 0116-2.5A8 8 0 0132 16c0 8.5-12 16-12 16z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="20" cy="16" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "quality",
    title: "Continuous quality improvement",
    desc: "Our spaces are never static. We continuously gather member feedback, optimize energy consumption with IoT building automation, upgrade shared technology, and refresh layouts so that your team always works in a state-of-the-art environment.",
    icon: (
      <svg className="w-10 h-10 text-[#d4622b]" viewBox="0 0 40 40" fill="none">
        <path d="M20 6v6m0 16v6M6 20h6m16 0h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="2.2" />
        <path d="M20 15v5l3 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "transparency",
    title: "Radical honesty & client dignity",
    desc: "No hidden CAM charges, no utility surprises, and no cutting corners. When you partner with Onward, you join a community grounded in transparency, integrity, respect, and mutual growth across every single touchpoint.",
    icon: (
      <svg className="w-10 h-10 text-[#d4622b]" viewBox="0 0 40 40" fill="none">
        <path d="M20 5L8 11v9c0 8.5 5 13.5 12 15 7-1.5 12-6.5 12-15v-9L20 5z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M15 19l4 4 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const whatWeDoSteps = [
  {
    step: "01",
    title: "Lease",
    tagline: "Location & Risk Mitigation",
    desc: "We identify and secure the right building for your business. Onward holds and manages the landlord lease, so you don't have to.",
    badge: "Zero Lease Liability",
    points: ["Tailored location scouting", "Onward holds the master lease", "Flexible terms without Capex lock-in"],
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Design & Build",
    tagline: "Turnkey Bespoke Architecture",
    desc: "Built to your brief, or delivered through our proven standards. Custom offices, designed and delivered in under 75 days.",
    badge: "Under 75-Day Delivery",
    points: ["Custom branded interiors & layouts", "Ergonomic & biophilic design", "Complete turnkey execution"],
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Operations",
    tagline: "End-to-End Managed Hospitality",
    desc: "From day one to daily operations, we handle it all. Your team focuses on work — we take care of everything else.",
    badge: "100% Worry-Free Facilities",
    points: ["On-site community & IT management", "Artisan cafeterias & daily housekeeping", "Enterprise security & IoT controls"],
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const teamMembers = [
  { name: "Suvrat Jain", role: "Founder & CEO", initials: "SJ" },
  { name: "Aakash Sharma", role: "Head of Expansion & Portfolio", initials: "AS" },
  { name: "Rhea Sen", role: "Lead Architect & Spatial Design", initials: "RS" },
  { name: "Vikram Malhotra", role: "Head of Member Experience", initials: "VM" },
  { name: "Pooja Verma", role: "Chief Technology & Operations Officer", initials: "PV" },
  { name: "Nitin Mehra", role: "Director of Enterprise Solutions", initials: "NM" },
];

const welcomeRow1 = [
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719810.webp", aspect: "aspect-[16/10]", w: "w-[30%]" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720474.webp", aspect: "aspect-[3/4]", w: "w-[22%]" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720403.webp", aspect: "aspect-[3/4]", w: "w-[22%]" },
];
const welcomeRow2 = [
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/about/1790662449490.webp", aspect: "aspect-[3/4]", w: "w-[22%]" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720553.webp", aspect: "aspect-[16/10]", w: "w-[30%]" },
];

/* ━━━ WELCOME PHOTO ━━━ */
function WelcomePhoto({ src, aspect, w, progress, enterStart, enterEnd }: {
  src: string; aspect: string; w: string;
  progress: import("framer-motion").MotionValue<number>;
  enterStart: number; enterEnd: number;
}) {
  const opacity = useTransform(progress, [enterStart, enterEnd, 0.88, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [enterStart, enterEnd], [40, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className={`relative ${w} ${aspect} rounded-2xl overflow-hidden shadow-lg border border-black/5 shrink-0`}
    >
      <Image src={src} alt="Onward Workspaces" fill sizes="(max-width:768px) 180px, 320px" className="object-cover" />
    </motion.div>
  );
}

/* ━━━ SCROLL-REVEAL ━━━ */
function ScrollReveal({ children, className = "", delay = 0, y = 60 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState<string>("excellence");

  /* ═══════════════════════════════════════════════════════════
     HERO DESCRIPTION: scroll-linked slide-up reveal (Brilean pattern).
     Hidden initially, slides up + fades in as user scrolls.
  ═══════════════════════════════════════════════════════════ */
  const { scrollY } = useScroll();
  const descOpacity = useTransform(scrollY, [30, 120], [0, 1]);
  const descY = useTransform(scrollY, [30, 120], [50, 0]);

  /* ═══════════════════════════════════════════════════════════
     WELCOME: Sticky text + scroll-scrubbed staggered photo reveals (Brilean pattern).
     Text starts at top, scrolls to center as photos appear.
  ═══════════════════════════════════════════════════════════ */
  const welcomeWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: welcomeProgress } = useScroll({
    target: welcomeWrapperRef,
    offset: ["start start", "end end"],
  });
  const welcomeTextOp = useTransform(welcomeProgress, [0, 0.85, 1], [1, 1, 0]);
  const welcomeTextScale = useTransform(welcomeProgress, [0, 0.85, 1], [1, 1, 0.97]);

  /* ═══════════════════════════════════════════════════════════
     SECTION BG SWEEP: dark background sweeps left-to-right
     at the values section transition (like Brilean).
  ═══════════════════════════════════════════════════════════ */
  const sweepRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sweepProgress } = useScroll({
    target: sweepRef,
    offset: ["start center", "start start"],
  });
  const sweepX = useTransform(sweepProgress, [0, 1], ["100%", "0%"]);

  /* Values section */
  const valuesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: valuesProgress } = useScroll({ target: valuesRef, offset: ["start end", "end start"] });
  const valuesHeadY = useTransform(valuesProgress, [0, 0.3], [60, 0]);
  const valuesHeadOp = useTransform(valuesProgress, [0, 0.25], [0, 1]);

  /* What We Do parallax & right-to-left stacked scroll animation */
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: whatWeDoProgress } = useScroll({
    target: whatWeDoRef,
    offset: ["start end", "end start"],
  });
  const whatWeDoHeadY = useTransform(whatWeDoProgress, [0, 0.25], [40, 0]);
  const whatWeDoHeadOp = useTransform(whatWeDoProgress, [0, 0.2], [0, 1]);

  /* Right-to-left stacked slide-in transforms */
  const card1X = useTransform(whatWeDoProgress, [0.04, 0.32], [140, 0]);
  const card2X = useTransform(whatWeDoProgress, [0.1, 0.38], [260, 0]);
  const card3X = useTransform(whatWeDoProgress, [0.16, 0.44], [380, 0]);

  const card1Rotate = useTransform(whatWeDoProgress, [0.04, 0.32], [4, 0]);
  const card2Rotate = useTransform(whatWeDoProgress, [0.1, 0.38], [3, 0]);
  const card3Rotate = useTransform(whatWeDoProgress, [0.16, 0.44], [1, 0]);

  const card1Op = useTransform(whatWeDoProgress, [0.04, 0.22], [0.3, 1]);
  const card2Op = useTransform(whatWeDoProgress, [0.1, 0.28], [0.3, 1]);
  const card3Op = useTransform(whatWeDoProgress, [0.16, 0.34], [0.3, 1]);

  const card1Y = useTransform(whatWeDoProgress, [0, 1], [40, -30]);
  const card2Y = useTransform(whatWeDoProgress, [0, 1], [80, -60]);
  const card3Y = useTransform(whatWeDoProgress, [0, 1], [30, -20]);
  const lineFill = useTransform(whatWeDoProgress, [0.15, 0.6], ["0%", "100%"]);
  const decorY = useTransform(whatWeDoProgress, [0, 1], [-80, 80]);

  /* Team */
  const teamRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: teamProgress } = useScroll({ target: teamRef, offset: ["start end", "end start"] });
  const teamHeadY = useTransform(teamProgress, [0, 0.3], [50, 0]);
  const teamHeadOp = useTransform(teamProgress, [0, 0.25], [0, 1]);

  /* CTA */
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaScale = useTransform(ctaProgress, [0, 0.4], [0.92, 1]);
  const ctaOp = useTransform(ctaProgress, [0, 0.35], [0, 1]);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] text-[#1a1a2e] min-h-screen pt-20">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. HERO — CLEAN FULLY RESPONSIVE EDITORIAL HERO
            No sticky pinning, no text collisions, 100% fluid across all screens.
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative overflow-hidden bg-white border-b border-gray-200/80 pt-12 pb-16 sm:pt-16 sm:pb-24">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                <li><Link href="/" className="hover:text-[#d4622b] transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-gray-900">About Us</li>
              </ol>
            </nav>

            {/* Top Row Grid: Headline on Left, 3D Photo Circle on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10 sm:mb-14">
              {/* Left Column: Line-by-Line Masked Slide-Up Headline */}
              <div className="lg:col-span-7 xl:col-span-8">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1a1a2e] tracking-tight leading-[1.06]">
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      Crafting Workspaces.
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    >
                      Built Around Ambition.
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-gray-300 hover:text-gray-500 transition-colors duration-300"
                    >
                      Brand &amp; People.
                    </motion.span>
                  </span>
                </h1>
              </div>

              {/* Right Column: 3D Rotating Photo Ring (large on desktop, progressively smaller on mobile) */}
              <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center lg:justify-end overflow-visible">
                <div className="w-full max-w-[360px] sm:max-w-[420px] h-[240px] sm:h-[280px] md:h-[320px] lg:h-[340px] flex items-center justify-center">
                  <RotatingPhotoStack />
                </div>
              </div>
            </div>

            {/* Story Description & Action CTAs — slides up from bottom on scroll (Brilean pattern) */}
            <motion.div
              style={{ opacity: descOpacity, y: descY }}
              className="border-t border-gray-100 pt-8 sm:pt-10 max-w-4xl"
            >
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed text-justify">
                Established in 2019, Onward Workspaces is a Delhi-based coworking company built to eliminate the rigidities of conventional commercial leases. We recognized that thriving enterprises and fast-growing teams require more than just square footage — they need intelligent environments that nurture company culture, elevate team productivity, and accommodate hyper-fast scaling.
              </p>
              <p className="mt-4 text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed text-justify">
                Today, Onward manages premium workspace hubs across Delhi, Noida, and Gurugram, hosting hundreds of thriving businesses ranging from venture-backed startups and unicorns to established multinational corporations.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8501f] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md transition-all"
                >
                  <span>Schedule a Visit</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </MagneticButton>
                <Link href="/locations/delhi" className="text-[#1a1a2e] font-bold text-sm hover:text-[#d4622b] transition-colors inline-flex items-center gap-1.5 py-2">
                  Explore Locations &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. WELCOME — STICKY TEXT + STAGGERED PHOTO REVEALS (Brilean pattern)
            Text stays pinned while photos slowly appear around it on scroll.
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div ref={welcomeWrapperRef} className="relative bg-white border-b border-gray-200/80" style={{ height: "300vh" }}>
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex items-center justify-center">
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-30 pointer-events-none" />
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-30 pointer-events-none" />
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 sm:gap-12">
              {/* Row 1: 3 photos */}
              <div className="flex w-full justify-between items-end gap-3 sm:gap-6">
                {welcomeRow1.map((photo, i) => (
                  <WelcomePhoto key={photo.src} {...photo} progress={welcomeProgress}
                    enterStart={0.02 + i * 0.05} enterEnd={0.12 + i * 0.05} />
                ))}
              </div>

              {/* Sticky centered welcome text */}
              <motion.div style={{ scale: welcomeTextScale, opacity: welcomeTextOp }}
                className="z-20 text-center max-w-xl sm:max-w-2xl px-4 select-none my-2 sm:my-4">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-3">Who We Are</p>
                <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-light text-[#1a1a2e] tracking-tight leading-[1.12]">
                  Whatever brought you to this page, <span className="font-normal text-[#1a1a2e]">welcome.</span>
                </h2>
                <div className="mt-6 flex justify-center">
                  <svg className="w-8 h-8 text-gray-400" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="16" cy="16" r="14" />
                    <path d="M11 14l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>

              {/* Row 2: 2 photos */}
              <div className="flex w-full justify-center items-start gap-[12%] sm:gap-[16%]">
                {welcomeRow2.map((photo, i) => (
                  <WelcomePhoto key={photo.src} {...photo} progress={welcomeProgress}
                    enterStart={0.15 + i * 0.06} enterEnd={0.25 + i * 0.06} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. VALUES — with background sweep + scroll reveals
            Dark bg sweeps from right on entrance (Brilean pattern).
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section ref={sweepRef} id="values-section" className="relative overflow-hidden">
          {/* Background sweep overlay */}
          <motion.div
            style={{ x: sweepX }}
            className="absolute inset-0 bg-white z-0"
          />

          <div ref={valuesRef} className="relative z-10 py-24 sm:py-32 bg-white border-b border-gray-200/80">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                style={{ y: valuesHeadY, opacity: valuesHeadOp }}
                className="text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1a1a2e] text-center tracking-tight mb-14 sm:mb-20"
              >
                Our values
              </motion.h2>

              <div className="max-w-4xl mx-auto border-t border-gray-200">
                {valuesList.map((val, idx) => {
                  const isActive = activeValue === val.id;
                  return (
                    <ScrollReveal key={val.id} delay={idx * 0.08} y={30}>
                      <div
                        onClick={() => setActiveValue(val.id)}
                        onMouseEnter={() => setActiveValue(val.id)}
                        className="border-b border-gray-200 transition-colors cursor-pointer select-none"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isActive ? (
                            <motion.div
                              key="active"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="py-10 sm:py-14 px-2 sm:px-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                            >
                              <div className="md:col-span-6 flex items-center gap-4 sm:gap-5">
                                <motion.div
                                  initial={{ rotate: -20, scale: 0 }}
                                  animate={{ rotate: 0, scale: 1 }}
                                  transition={{ duration: 0.4, ease: "backOut" }}
                                  className="shrink-0"
                                >
                                  {val.icon}
                                </motion.div>
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#d4622b] leading-tight">
                                  {val.title}
                                </h3>
                              </div>
                              <div className="md:col-span-6">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{val.desc}</p>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="inactive"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="py-8 sm:py-10 text-center"
                            >
                              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-[#1a1a2e] hover:text-[#d4622b] transition-colors inline-block">
                                {val.title}
                              </h3>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. WHAT WE DO — THE IDEAL WORKSPACE AS A SOLUTION (PARALLAX)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section ref={whatWeDoRef} className="py-24 sm:py-32 bg-[#faf8f5] text-[#1a1a2e] relative overflow-hidden border-b border-gray-200/80">
          {/* Subtle Ambient Parallax Background Orbs */}
          <motion.div
            style={{ y: decorY }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#d4622b]/5 blur-3xl pointer-events-none z-0"
          />
          <motion.div
            style={{ y: decorY }}
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#d4622b]/5 blur-3xl pointer-events-none z-0"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Parallax Section Header */}
            <motion.div style={{ y: whatWeDoHeadY, opacity: whatWeDoHeadOp }} className="max-w-3xl mb-14 sm:mb-20">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight leading-[1.08]">
                The ideal workspace as a solution
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                A seamless three-phase framework designed to eliminate the friction of enterprise real estate — from identifying the right building to custom architecture and daily managed operations.
              </p>
            </motion.div>

            {/* Desktop Connected Sequence Tracker with Scroll-Linked Line Fill */}
            <div className="hidden lg:block mb-12">
              <div className="grid grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                {/* Background Connecting Track */}
                <div className="absolute top-5 left-[12%] right-[12%] h-[3px] bg-gray-200 rounded-full z-0 overflow-hidden">
                  {/* Animated Dynamic Scroll Fill */}
                  <motion.div
                    style={{ width: lineFill }}
                    className="h-full bg-gradient-to-r from-[#d4622b] via-[#e5733f] to-[#d4622b] rounded-full"
                  />
                </div>
                {whatWeDoSteps.map((step) => (
                  <div key={step.step} className="flex flex-col items-center gap-2 relative z-10">
                    <span className="w-11 h-11 rounded-full bg-white border-2 border-[#d4622b] text-[#d4622b] font-black text-sm flex items-center justify-center shadow-md">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 bg-[#faf8f5] px-2.5 py-0.5 rounded-md border border-gray-200/60 shadow-xs">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Process Cards with Right-to-Left Stacked Parallax Entrance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {whatWeDoSteps.map((step, idx) => {
                const cardY = idx === 0 ? card1Y : idx === 1 ? card2Y : card3Y;
                const cardX = idx === 0 ? card1X : idx === 1 ? card2X : card3X;
                const cardRotate = idx === 0 ? card1Rotate : idx === 1 ? card2Rotate : card3Rotate;
                const cardOp = idx === 0 ? card1Op : idx === 1 ? card2Op : card3Op;

                return (
                  <motion.div
                    key={step.title}
                    style={{ x: cardX, y: cardY, rotate: cardRotate, opacity: cardOp }}
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm hover:shadow-2xl hover:border-[#d4622b]/50 transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden will-change-transform"
                  >
                    {/* Top gradient glow on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d4622b] via-[#e5733f] to-[#f28e2b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Top Row: Icon + Large Step Number */}
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#d4622b]/10 text-[#d4622b] flex items-center justify-center group-hover:bg-[#d4622b] group-hover:text-white transition-all duration-300 shadow-xs">
                          {step.icon}
                        </div>
                        <span className="text-4xl sm:text-5xl font-black text-gray-200 group-hover:text-[#d4622b]/30 transition-colors duration-300">
                          {step.step}
                        </span>
                      </div>

                      {/* Step Tagline */}
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4622b] block mb-1">
                        Phase {step.step} &bull; {step.tagline}
                      </span>

                      {/* Step Title */}
                      <h3 className="text-2xl sm:text-3xl font-black text-[#1a1a2e] tracking-tight group-hover:text-[#d4622b] transition-colors duration-300 mb-3">
                        {step.title}
                      </h3>

                      {/* Main Description */}
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 font-normal">
                        {step.desc}
                      </p>

                      {/* Key Value Points */}
                      <ul className="space-y-2.5 pt-4 border-t border-gray-100 mb-6">
                        {step.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                            <svg className="w-4 h-4 text-[#d4622b] shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Highlight Badge */}
                    <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a1a2e] bg-[#faf8f5] px-3.5 py-1.5 rounded-full border border-gray-200/80 group-hover:border-[#d4622b]/30 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4622b]" />
                        {step.badge}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. TEAM — staggered scroll reveals
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section ref={teamRef} className="py-20 sm:py-28 bg-[#faf8f5] border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div style={{ y: teamHeadY, opacity: teamHeadOp }} className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">The Minds Behind Onward</span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1a1a2e] tracking-tight mt-1">Our Present and Future</h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Meet the passionate real estate strategists, architects, and community leaders driving our mission every day.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {teamMembers.map((member, idx) => (
                <ScrollReveal key={member.name} delay={idx * 0.1} y={50}>
                  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                    <div>
                      <div className="relative aspect-[4/3] w-full bg-[#f5efe6] border-b border-gray-200/60 flex flex-col items-center justify-center overflow-hidden">
                        <div className="w-20 h-20 rounded-2xl bg-white border border-[#e5dcd0] shadow-xs flex items-center justify-center text-[#d4622b] font-bold text-2xl tracking-wider group-hover:scale-110 transition-transform duration-500">{member.initials}</div>
                        <div className="absolute bottom-3 left-4 right-4 z-10 flex justify-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a2e] bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-gray-200/80 shadow-xs">{member.role}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">{member.name}</h3>
                        <p className="text-xs font-semibold text-gray-500 mt-1">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            6. BOTTOM CTA — scale-up reveal
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section ref={ctaRef} className="py-20 sm:py-24 bg-white text-center border-t border-gray-200">
          <motion.div style={{ scale: ctaScale, opacity: ctaOp }} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4622b] block mb-2">Join the Network</span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1a1a2e] tracking-tight">Ready to elevate your workspace?</h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">Book a walkthrough of our centres across Delhi, Noida, or Gurugram and let our team curate your ideal office layout.</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton href="/#contact" className="w-full sm:w-auto bg-[#d4622b] hover:bg-[#b8501f] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base shadow-xl transition-all">
                  Book a Free Tour & Day Pass
                </MagneticButton>
                <Link href="/locations" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm sm:text-base border border-gray-300 hover:border-[#1a1a2e] text-[#1a1a2e] bg-white transition-all shadow-xs">
                  View All Micro-Markets
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
