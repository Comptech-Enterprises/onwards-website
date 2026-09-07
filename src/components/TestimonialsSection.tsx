"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import SpotlightCard from "./SpotlightCard";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  tenure: string;
  seats: string;
  rating: number;
  text: string;
  highlightWords: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "dangal-games",
    name: "Varun Puri",
    role: "Founder",
    company: "Dangal Games",
    metric: "Scaled from 15 → 120 seats",
    tenure: "3+ Years Client",
    seats: "120+ Desks",
    rating: 5,
    text: "Onward has been a game-changer for our team. The flexibility to scale seamlessly and the hospitality standards have made it the perfect office space for our high-velocity growth journey.",
    highlightWords: "game-changer for our team",
  },
  {
    id: "aramex",
    name: "Abhinay Nagwekar",
    role: "Procurement Lead",
    company: "Aramex Logistics",
    metric: "Zero facility downtime",
    tenure: "Enterprise Partner",
    seats: "85+ Desks",
    rating: 5,
    text: "Onward exceeded all our corporate expectations. Meticulously designed spaces, enterprise-grade IT infrastructure, and unwavering operational support make them our undisputed workspace choice.",
    highlightWords: "exceeded all our corporate expectations",
  },
  {
    id: "thermax",
    name: "Prasenjit Das Gupta",
    role: "Head Commercial",
    company: "Thermax Ltd.",
    metric: "100% turnkey setup in 10 days",
    tenure: "Strategic Client",
    seats: "60+ Desks",
    rating: 5,
    text: "Transitioning to Onward was by far our best decision. The vibrant environment fosters cross-team collaboration while offering our leadership the executive privacy they need.",
    highlightWords: "by far our best decision",
  },
];

const AUTOPLAY_DURATION = 6000;

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [[activeIdx, dir], setSlideState] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  // Parallax on section scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
  });

  const threadDrawProgress = useTransform(smoothProgress, [0.1, 0.7], [0, 1]);
  const ambientGlowY = useTransform(smoothProgress, [0, 1], [-60, 60]);

  const goTo = useCallback((newIdx: number, direction?: number) => {
    const total = testimonialsData.length;
    const targetIdx = (newIdx + total) % total;
    const d = direction ?? (targetIdx >= activeIdx ? 1 : -1);
    setSlideState([targetIdx, d]);
    setPulseKey((p) => p + 1);
  }, [activeIdx]);

  // Autoplay cycle
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goTo(activeIdx + 1, 1);
    }, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [activeIdx, isPaused, goTo]);

  const current = testimonialsData[activeIdx];
  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const slideVariants: Variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 60 : -60,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -60 : 60,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-[#faf8f5] overflow-hidden"
    >
      {/* ━━━ BACKGROUND AMBIENT GLOWS ━━━ */}
      <motion.div
        style={{ y: ambientGlowY }}
        className="pointer-events-none absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full bg-[#d4622b]/8 blur-[140px]"
      />
      <motion.div
        style={{ y: ambientGlowY }}
        className="pointer-events-none absolute bottom-1/4 -right-32 w-[550px] h-[550px] rounded-full bg-[#f59e0b]/8 blur-[140px]"
      />

      {/* ━━━ ANIMATED CONNECTING SVG THREAD CANVAS ━━━ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-0"
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            {/* Main thread gradient */}
            <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4622b" stopOpacity="0.2" />
              <stop offset="35%" stopColor="#d4622b" stopOpacity="0.8" />
              <stop offset="65%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e8855a" stopOpacity="0.3" />
            </linearGradient>

            {/* Glowing neon pulse filter */}
            <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="14" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Energy bead gradient */}
            <radialGradient id="beadGlow">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d4622b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background thread shadow / diffuse aura */}
          <motion.path
            d="M 120 180 C 400 120, 320 440, 720 380 C 1120 320, 1020 680, 1380 640"
            stroke="url(#threadGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#threadGlow)"
            opacity="0.3"
            style={{ pathLength: threadDrawProgress }}
          />

          {/* Primary sharp flowing thread line */}
          <motion.path
            id="mainThreadPath"
            d="M 120 180 C 400 120, 320 440, 720 380 C 1120 320, 1020 680, 1380 640"
            stroke="url(#threadGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 8"
            className="animate-thread-flow"
            style={{ pathLength: threadDrawProgress }}
          />

          {/* Secondary harmonic resonance thread */}
          <motion.path
            d="M 100 210 C 450 150, 300 480, 750 420 C 1180 360, 980 720, 1420 680"
            stroke="#d4622b"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="4 12"
            fill="none"
          />

          {/* Live Energy Pulses Traveling Along Thread */}
          <motion.circle
            r="4.5"
            fill="url(#beadGlow)"
            filter="url(#threadGlow)"
            className="opacity-90"
          >
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M 120 180 C 400 120, 320 440, 720 380 C 1120 320, 1020 680, 1380 640"
            />
          </motion.circle>

          <motion.circle
            r="3"
            fill="#ffffff"
            filter="url(#threadGlow)"
            className="opacity-75"
          >
            <animateMotion
              dur="6s"
              begin="3s"
              repeatCount="indefinite"
              path="M 120 180 C 400 120, 320 440, 720 380 C 1120 320, 1020 680, 1380 640"
            />
          </motion.circle>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ━━━ SECTION HEADER WITH THREAD ANCHOR ━━━ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4622b]/10 border border-[#d4622b]/20 mb-4">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4622b] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4622b]" />
                </span>
                <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest">
                  Verified Client Stories
                </span>
              </div>
            </Reveal>

            <AnimatedHeading
              text="Leaders trust Onward"
              highlight="trust Onward"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-[1.1] tracking-tight"
            />

            <Reveal delay={0.15}>
              <p className="mt-4 text-gray-500 text-lg leading-relaxed">
                Over 12,000+ executives and high-growth founders power their
                daily operations across Onward’s premium network.
              </p>
            </Reveal>
          </div>

          {/* Next / Previous Controls */}
          <Reveal delay={0.25}>
            <div className="flex items-center gap-3 self-start md:self-end">
              <button
                aria-label="Previous Testimonial"
                onClick={() => goTo(activeIdx - 1, -1)}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm text-[#1a1a2e] flex items-center justify-center hover:border-[#d4622b] hover:text-[#d4622b] hover:shadow-md transition-all group"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform font-bold text-lg">
                  &larr;
                </span>
              </button>

              <button
                aria-label="Next Testimonial"
                onClick={() => goTo(activeIdx + 1, 1)}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm text-[#1a1a2e] flex items-center justify-center hover:border-[#d4622b] hover:text-[#d4622b] hover:shadow-md transition-all group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform font-bold text-lg">
                  &rarr;
                </span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* ━━━ MAIN TESTIMONIAL STAGE WITH INTERACTIVE THREAD NODES ━━━ */}
        <div
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ━━━ LEFT COLUMN: INTERCONNECTED LEADER NODES (THREAD TRACK) ━━━ */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5 relative">
              {/* Vertical connecting line linking the cards */}
              <div className="hidden sm:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#d4622b]/40 via-[#f59e0b]/30 to-transparent -z-10" />

              {testimonialsData.map((item, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => goTo(idx, idx >= activeIdx ? 1 : -1)}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 relative border ${
                      isActive
                        ? "bg-white border-[#d4622b]/40 shadow-[0_12px_36px_rgba(212,98,43,0.12)]"
                        : "bg-white/60 hover:bg-white/90 border-gray-200/80 hover:border-gray-300"
                    }`}
                  >
                    {/* Active highlight pill background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeLeaderBorder"
                        className="absolute -inset-px rounded-2xl border-2 border-[#d4622b] pointer-events-none"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <div className="flex items-center gap-4">
                      {/* Thread Node / Avatar with Pulse */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-br from-[#d4622b] to-[#f59e0b] text-white shadow-md shadow-[#d4622b]/30 scale-105"
                              : "bg-[#faf8f5] text-gray-600 border border-gray-200"
                          }`}
                        >
                          {initials(item.name)}
                        </div>

                        {/* Energetic pulse node when active */}
                        {isActive && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4622b] opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#d4622b] border-2 border-white" />
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`font-bold text-base truncate transition-colors ${
                              isActive ? "text-[#1a1a2e]" : "text-gray-700"
                            }`}
                          >
                            {item.name}
                          </h4>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                              isActive
                                ? "bg-[#d4622b]/10 text-[#d4622b]"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {item.seats}
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                          {item.role}, {item.company}
                        </p>

                        <div className="flex items-center gap-2 mt-2 text-[11px] font-medium text-emerald-600">
                          <span>✓</span>
                          <span>{item.metric}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Autoplay Progress Indicator */}
            <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {isPaused ? "Paused on hover" : "Auto-cycling testimonials"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#1a1a2e]">
                <span>0{activeIdx + 1}</span>
                <span className="text-gray-300">/</span>
                <span>0{testimonialsData.length}</span>
              </div>
            </div>
          </div>

          {/* ━━━ RIGHT COLUMN: SHOWCASE SPOTLIGHT QUOTE STAGE ━━━ */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_16px_48px_rgba(0,0,0,0.04)] flex flex-col justify-between relative overflow-hidden">
              {/* Decorative giant quote watermark */}
              <div className="absolute top-6 right-8 text-8xl font-serif text-[#d4622b]/10 select-none pointer-events-none leading-none">
                &ldquo;
              </div>

              {/* Glowing thread injection wave from the left */}
              <motion.div
                key={`pulse-${pulseKey}`}
                initial={{ opacity: 0.8, scaleX: 0 }}
                animate={{ opacity: 0, scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4622b] via-[#f59e0b] to-transparent origin-left pointer-events-none"
              />

              <div>
                {/* 5-Star Rating & Trust Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i, duration: 0.3 }}
                        className="w-5 h-5 text-[#d4622b] fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                    <span className="ml-2 text-xs font-bold text-gray-500">
                      5.0 Verified Rating
                    </span>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
                    <span>🛡️ Verified Onward Member</span>
                  </span>
                </div>

                {/* Animated Quote Text */}
                <div className="relative min-h-[160px] sm:min-h-[140px] flex items-center">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={current.id}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#1a1a2e] leading-relaxed tracking-tight">
                        &ldquo;{current.text}&rdquo;
                      </blockquote>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Leader Meta Info Footer */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4622b] to-[#f59e0b] flex items-center justify-center text-white text-lg font-bold shadow-md shadow-[#d4622b]/20">
                    {initials(current.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1a1a2e]">
                      {current.name}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium">
                      {current.role} &bull;{" "}
                      <span className="text-[#d4622b] font-semibold">
                        {current.company}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 bg-[#faf8f5] sm:bg-transparent px-4 py-2 sm:p-0 rounded-xl">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
                    Partnership
                  </span>
                  <span className="text-sm font-bold text-[#1a1a2e]">
                    {current.tenure}
                  </span>
                </div>
              </div>

              {/* Active Autoplay Progress Line at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                {!isPaused && (
                  <motion.div
                    key={activeIdx}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: AUTOPLAY_DURATION / 1000,
                      ease: "linear",
                    }}
                    className="h-full bg-gradient-to-r from-[#d4622b] to-[#f59e0b] origin-left"
                  />
                )}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
