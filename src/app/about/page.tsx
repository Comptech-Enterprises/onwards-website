"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import RotatingPhotoStack from "@/components/RotatingPhotoStack";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";

/* ━━━ DATA ━━━ */

const valuesList = [
  {
    id: "excellence",
    title: "A commitment to excellence",
    desc: "Every decision at Onward is guided by intentional design, transparent operations and dependable service. This is the standard every client can expect from us, from start-ups to global enterprises.",
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
                  <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      Crafting Workspaces.
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    >
                      Built Around Ambition.
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
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
                Established in 2019, Onward Workspaces is a Delhi-based workspace company created to move businesses beyond the limitations of conventional commercial leases. We recognised that growing organisations need more than square footage. They need well-designed environments that strengthen company culture, support team productivity and allow the business to scale with confidence.</p>
              <p className="mt-4 text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed text-justify">
                Today, Onward Workspaces operates premium coworking and managed office centres across Delhi, Noida and Gurgaon. Our clients range from venture-backed start-ups to established multinational corporations, including Fortune 500 companies, and each is supported by a single accountable team, from setup through daily operations.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8501f] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md transition-all"
                >
                  <span>Schedule a visit</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. WHAT WE DO — CITY SKYLINE BG + 3 STEP CARDS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[#faf8f5] border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight leading-[1.12]">
                  The ideal workspace as a <span className="text-[#d4622b]">solution</span>
                </h2>
              </ScrollReveal>
            </div>

            {/* Numbered circles with animated connecting bar */}
            <div className="hidden sm:flex items-center justify-center mb-10 max-w-2xl mx-auto">
              {workspaceSolutionSteps.map((step, idx) => (
                <div key={step.step} className="flex items-center flex-1 last:flex-none">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-[#1a1a2e] text-white font-bold text-base flex items-center justify-center shadow-md shrink-0"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.3, ease: [0.22, 0.8, 0.2, 1] }}
                  >
                    {step.step}
                  </motion.div>
                  {idx < workspaceSolutionSteps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-200 mx-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#d4622b]"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 + idx * 0.3, ease: [0.22, 0.8, 0.2, 1] }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 3 Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {workspaceSolutionSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.15, ease: [0.22, 0.8, 0.2, 1] }}
                  className={`bg-white p-6 sm:p-8 h-full text-center ${idx < workspaceSolutionSteps.length - 1 ? "sm:border-r border-b sm:border-b-0 border-gray-200" : ""}`}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
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


        {/* 5. CONTACT FORM (same as home) */}
        <ContactSection bgImage="https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/top-section-hero-image-managed-office-space-in-delhi.webp" />

        {/* 6. FAQ */}
        <FaqSection
          faqs={[
            { q: "How do I enquire about Onward Workspaces?", a: "Share your requirements using the enquiry form and request a proposal from the Onward Workspaces team." },
            { q: "Can I compare locations before deciding?", a: "Yes. Ask for a shortlist based on city, team size, preferred budget and availability." },
            { q: "Are prices and terms the same everywhere?", a: "No. Fees, inclusions, deposits and contract conditions should be confirmed for each location or solution." },
            { q: "Can I arrange a visit or consultation?", a: "Request a site visit or consultation with the sales team to discuss the next steps." },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
