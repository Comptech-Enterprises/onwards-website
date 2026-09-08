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
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "dangal-games",
    name: "Varun Puri",
    role: "Founder",
    company: "Dangal Games",
    metric: "Scaled 15 → 120 seats",
    tenure: "3+ Years Client",
    seats: "120+ Desks",
    rating: 5,
    text: "Onward has been a game-changer for our team. The flexibility to scale seamlessly and the hospitality standards have made it the perfect office space for our high-velocity growth journey.",
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
  },
  {
    id: "thermax",
    name: "Prasenjit Das Gupta",
    role: "Head Commercial",
    company: "Thermax Ltd.",
    metric: "Turnkey setup in 10 days",
    tenure: "Strategic Client",
    seats: "60+ Desks",
    rating: 5,
    text: "Transitioning to Onward was by far our best decision. The vibrant environment fosters cross-team collaboration while offering our leadership the executive privacy they need.",
  },
];

const AUTOPLAY_DURATION = 6000;

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [[activeIdx, dir], setSlideState] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  const threadPathLength = useTransform(smoothProgress, [0, 1], [0.2, 1]);

  const goTo = useCallback((newIdx: number, direction?: number) => {
    const total = testimonialsData.length;
    const targetIdx = (newIdx + total) % total;
    const d = direction ?? (targetIdx >= activeIdx ? 1 : -1);
    setSlideState([targetIdx, d]);
  }, [activeIdx]);

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

  const quoteVariants: Variants = {
    enter: (d: number) => ({
      opacity: 0,
      y: d > 0 ? 20 : -20,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (d: number) => ({
      opacity: 0,
      y: d > 0 ? -20 : 20,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-36 bg-[#faf8f5] overflow-hidden"
    >
      {/* ━━━ AMBIENT BACKGROUND GLOWS ━━━ */}
      <div className="pointer-events-none absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#d4622b]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#f59e0b]/5 blur-[120px]" />

      {/* ━━━ SOLID, SMOOTH DECORATIVE SVG THREAD (NO BLINKING) ━━━ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-0"
      >
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="solidThreadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4622b" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#d4622b" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d4622b" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <motion.path
            d="M 60 140 C 350 80, 480 320, 720 280 C 960 240, 1150 560, 1380 500"
            stroke="url(#solidThreadGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: threadPathLength }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ━━━ SECTION HEADER ━━━ */}
        <div className="max-w-2xl mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4622b]/10 border border-[#d4622b]/20 mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#d4622b]" />
              <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest">
                Client Testimonials
              </span>
            </div>
          </Reveal>

          <AnimatedHeading
            text="Leaders trust Onward"
            highlight="trust Onward"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-tight tracking-tight"
          />

          <Reveal delay={0.1}>
            <p className="mt-3.5 text-gray-500 text-base sm:text-lg leading-relaxed">
              Discover how India's fastest-growing enterprises and modern teams scale effortlessly across our workspaces.
            </p>
          </Reveal>
        </div>

        {/* ━━━ UNIFIED ADJACENT STAGE (GRID 5 / 7 COLS) ━━━ */}
        <div
          className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ━━━ LEFT COLUMN: LEADER SELECTOR LIST ━━━ */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {testimonialsData.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => goTo(idx, idx >= activeIdx ? 1 : -1)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 relative border flex items-center justify-between gap-4 ${
                    isActive
                      ? "bg-white border-[#d4622b] shadow-sm shadow-[#d4622b]/5 ring-1 ring-[#d4622b]/20"
                      : "bg-white/70 hover:bg-white border-gray-200/80 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#d4622b] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {initials(item.name)}
                    </div>

                    <div className="min-w-0">
                      <h4
                        className={`font-bold text-sm sm:text-base truncate transition-colors ${
                          isActive ? "text-[#1a1a2e]" : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 truncate mt-0.5 font-medium">
                        {item.role} &bull;{" "}
                        <span className={isActive ? "text-[#d4622b] font-semibold" : "text-gray-500"}>
                          {item.company}
                        </span>
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium text-emerald-600 truncate">
                        <span>✓</span>
                        <span className="truncate">{item.metric}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        isActive
                          ? "bg-[#d4622b]/10 text-[#d4622b]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.seats}
                    </span>

                    <span
                      className={`text-sm font-bold transition-all ${
                        isActive
                          ? "text-[#d4622b] translate-x-0 opacity-100"
                          : "text-gray-300 -translate-x-1 opacity-0"
                      }`}
                    >
                      &rarr;
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ━━━ RIGHT COLUMN: ADJACENT SHOWCASE STAGE ━━━ */}
          <div className="lg:col-span-7">
            <div className="h-full bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 lg:p-12 shadow-sm flex flex-col justify-between relative overflow-hidden">
              {/* TOP ROW: Stars, verified badge & Prev/Next controls */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-[#d4622b] fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500 hidden sm:inline">
                    5.0 Verified Experience
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    aria-label="Previous Testimonial"
                    onClick={() => goTo(activeIdx - 1, -1)}
                    className="w-9 h-9 rounded-full border border-gray-200 bg-[#faf8f5] text-[#1a1a2e] flex items-center justify-center hover:border-[#d4622b] hover:text-[#d4622b] transition-colors"
                  >
                    &larr;
                  </button>
                  <button
                    aria-label="Next Testimonial"
                    onClick={() => goTo(activeIdx + 1, 1)}
                    className="w-9 h-9 rounded-full border border-gray-200 bg-[#faf8f5] text-[#1a1a2e] flex items-center justify-center hover:border-[#d4622b] hover:text-[#d4622b] transition-colors"
                  >
                    &rarr;
                  </button>
                </div>
              </div>

              {/* MIDDLE ROW: Quote Text with Smooth Directional Fade */}
              <div className="py-8 min-h-[170px] flex items-center">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={current.id}
                    custom={dir}
                    variants={quoteVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <blockquote className="text-xl sm:text-2xl lg:text-2.5xl font-medium text-[#1a1a2e] leading-relaxed">
                      &ldquo;{current.text}&rdquo;
                    </blockquote>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* BOTTOM ROW: Author meta + partnership status */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#d4622b] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {initials(current.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1a1a2e]">
                      {current.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">
                      {current.role}, <span className="text-[#d4622b] font-semibold">{current.company}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                    Partnership
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1a1a2e] mt-0.5">
                    {current.tenure}
                  </div>
                </div>
              </div>

              {/* Bottom Subtle Progress Bar */}
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
                    className="h-full bg-[#d4622b] origin-left"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
