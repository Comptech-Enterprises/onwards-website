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

const workspaceSolutionSteps = [
  {
    step: "01",
    label: "PHASE 01",
    title: "Lease",
    desc: "We identify and secure the right building for your business. Onward holds and manages the landlord lease, so you don't have to.",
    highlights: ["Prime Asset Sourcing", "Landlord Negotiations", "Zero Direct Lease Risk"],
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    step: "02",
    label: "PHASE 02",
    title: "Design & Build",
    desc: "Built to your brief, or delivered through our proven standards. Custom offices, designed and delivered in under 75 days.",
    highlights: ["Turnkey 75-Day Delivery", "Bespoke Spatial Architecture", "Ergonomic & Tech Fit-Out"],
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    step: "03",
    label: "PHASE 03",
    title: "Operations",
    desc: "From day one to daily operations, we handle it all. Your team focuses on work — we take care of everything else.",
    highlights: ["Day-1 Move-in Ready", "24/7 Facility Management", "Hospitality & IT Support"],
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
  { src: "/images/redesigned/about-us/second-section/1.webp", aspect: "aspect-[16/10]", w: "w-[30%]" },
  { src: "/images/redesigned/about-us/second-section/2.webp", aspect: "aspect-[3/4]", w: "w-[22%]" },
  { src: "/images/redesigned/about-us/second-section/9.webp", aspect: "aspect-[3/4]", w: "w-[22%]" },
];
const welcomeRow2 = [
  { src: "/images/redesigned/about-us/second-section/10.webp", aspect: "aspect-[3/4]", w: "w-[22%]" },
  { src: "/images/redesigned/about-us/second-section/11.webp", aspect: "aspect-[16/10]", w: "w-[30%]" },
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
            3. THE IDEAL WORKSPACE AS A SOLUTION (LIGHT THEME CONNECTED BENTO)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-20 sm:py-28 lg:py-32 bg-[#faf8f5] text-[#1a1a2e] border-b border-gray-200/80 relative overflow-hidden">
          {/* Subtle warm ambient background glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#d4622b]/5 blur-[140px]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Area */}
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
              <ScrollReveal>
                <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                  End-to-End Enterprise Delivery
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight leading-[1.12] mt-3">
                  The ideal workspace as a{" "}
                  <span className="text-[#d4622b]">solution.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="mt-4 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
                  From securing prime commercial real estate to bespoke design and seamless daily facility operations — we take care of the entire lifecycle.
                </p>
              </ScrollReveal>
            </div>

            {/* 3 Connected Bento Cards with Step Pills & Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative items-stretch">
              {workspaceSolutionSteps.map((step, idx) => (
                <ScrollReveal key={step.step} delay={idx * 0.12} className="h-full">
                  <div className="h-full bg-white rounded-3xl p-7 sm:p-9 border border-gray-200/90 shadow-[0_8px_30px_-12px_rgba(26,26,46,0.08)] hover:shadow-[0_20px_45px_-12px_rgba(212,98,43,0.18)] hover:border-[#d4622b]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative">
                    {/* Top Row: Phase Pill + Icon */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-[#1a1a2e] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                            {step.step}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4622b] bg-[#d4622b]/10 px-3 py-1 rounded-full">
                            {step.label}
                          </span>
                        </div>
                        <div className="w-11 h-11 rounded-2xl bg-[#faf8f5] border border-gray-200/70 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#d4622b]/10 transition-all duration-300">
                          {step.icon}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] tracking-tight group-hover:text-[#d4622b] transition-colors mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>

                    {/* Bottom Feature Tags */}
                    <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-2">
                      {step.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4622b] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. VALUES — with background sweep + scroll reveals
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
