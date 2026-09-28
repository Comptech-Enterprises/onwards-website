"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";
import SpringCounter from "@/components/SpringCounter";

/* ━━━ TABULAR STATS DATA ━━━ */
const stats = [
  { value: 9, suffix: "", label: "CITIES", footnote: "*As of March, 2026" },
  { value: 11.46, suffix: "", label: "MN SQ FT", decimals: 2 },
  { value: 425, suffix: "+", label: "ENTERPRISE CLIENTS" },
  { value: 80, suffix: "+", label: "CENTRES" },
];

/* ━━━ 4 CORE PILLARS (AUTHENTIC ONWARD CONTENT) ━━━ */
const corePillars = [
  {
    title: "Prime Locations",
    tag: "CONNECTIVITY",
    desc: "We’re in the most prime business locations across Delhi NCR — which makes commuting to Onward a cake walk, be it via the metro or your vehicle.",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Maximum Flexibility",
    tag: "AGILITY",
    desc: "Do you go to the office only once or twice a week? Then why pay rent for the whole month when you can book even by the day with our flexible plans.",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Transparent Affordability",
    tag: "VALUE",
    desc: "You may have a hundred things to worry about, but our plans aren't one of them. Check our competitive pricing that starts as low as Rs. 4,000/- per month.",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Enterprise Services & IT",
    tag: "INFRASTRUCTURE",
    desc: "Secure Business Grade IT Infrastructure with on-site IT support and high-speed dedicated lines to keep your business connected and on the go, always.",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

/* ━━━ MISSION, VISION & VALUES ━━━ */
const missionVisionValues = [
  {
    title: "Mission",
    subtitle: "Empowering Modern Teams",
    desc: "To provide dynamic, tech-enabled, and hospitality-powered workspaces that foster innovation, seamless collaboration, and sustainable growth for enterprises, startups, and professionals across India.",
    bg: "from-[#1a1a2e] to-[#252542]",
    tag: "OUR PURPOSE",
  },
  {
    title: "Vision",
    subtitle: "Pioneering Flexible Work",
    desc: "To be India's most trusted and progressive managed workspace network, transforming commercial real estate into high-performing, connected ecosystems where ambition takes flight.",
    bg: "from-[#d4622b] to-[#b8501f]",
    tag: "OUR ASPIRATION",
  },
  {
    title: "Core Values",
    subtitle: "Integrity & Excellence",
    desc: "We are anchored by customer obsession, uncompromising architectural quality, continuous innovation, transparent partnerships, and community-driven excellence.",
    bg: "from-[#22242a] to-[#16171b]",
    tag: "OUR ETHOS",
  },
];

/* ━━━ DUMMY TEAM DATA (PLACEHOLDERS) ━━━ */
const teamMembers = [
  {
    name: "Suvrat Jain",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur steering Onward's strategic growth, real estate portfolio, and corporate partnerships across Delhi NCR.",
    initials: "SJ",
    accent: "#d4622b",
    gradient: "from-[#1a1a2e] via-[#242638] to-[#d4622b]/30",
  },
  {
    name: "Aakash Sharma",
    role: "Head of Operations & Expansion",
    bio: "Oversees daily hub performance, facility operations, and seamless member onboarding across all 15+ centres.",
    initials: "AS",
    accent: "#3b82f6",
    gradient: "from-[#1a1a2e] via-[#1e293b] to-[#3b82f6]/25",
  },
  {
    name: "Rhea Sen",
    role: "Director of Enterprise Client Solutions",
    bio: "Partners with Fortune 500 MNCs and unicorn startups to curate bespoke, turnkey enterprise office floors.",
    initials: "RS",
    accent: "#10b981",
    gradient: "from-[#1a1a2e] via-[#1c2e28] to-[#10b981]/25",
  },
  {
    name: "Vikram Malhotra",
    role: "Lead Architect & Workspace Design",
    bio: "Directs interior spatial planning, ergonomic acoustics, biophilic design, and custom brand architectural builds.",
    initials: "VM",
    accent: "#8b5cf6",
    gradient: "from-[#1a1a2e] via-[#272138] to-[#8b5cf6]/25",
  },
  {
    name: "Pooja Verma",
    role: "Head of Member Experience & Community",
    bio: "Curates networking events, brand partnerships, and community-building programs for our 425+ corporate clients.",
    initials: "PV",
    accent: "#f59e0b",
    gradient: "from-[#1a1a2e] via-[#2e261f] to-[#f59e0b]/25",
  },
  {
    name: "Nitin Mehra",
    role: "Chief Technology & Infrastructure Officer",
    bio: "Ensures enterprise-grade cybersecurity, dual-ISP fiber redundancy, IoT building automation, and seamless 24/7 IT uptime.",
    initials: "NM",
    accent: "#06b6d4",
    gradient: "from-[#1a1a2e] via-[#162a32] to-[#06b6d4]/25",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-24 pb-20">
        {/* ━━━ HERO SECTION ━━━ */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#16171a] text-white">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')",
            }}
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#16171a]/80 via-[#16171a]/95 to-[#16171a]" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#d4622b] text-xs font-semibold uppercase tracking-widest mb-6"
            >
              About Onward Workspaces
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight"
            >
              Crafting Workspaces Built Around Ambition, Brand &amp; People
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Onward Workspaces transforms conventional commercial real estate into high-performing, hospitality-powered office ecosystems tailored for ambitious enterprises across Delhi NCR.
            </motion.p>

            {/* Tabular Stats Strip */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-14 lg:mt-20 w-full max-w-5xl mx-auto text-left"
            >
              <div className="rounded-2xl sm:rounded-none bg-black/20 backdrop-blur-md border border-white/15 sm:border-x-0 sm:border-y sm:border-white/15 p-6 sm:py-8 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0">
                {stats.map((s, idx) => (
                  <div
                    key={s.label}
                    className={`flex flex-col justify-start text-left ${
                      idx === 0
                        ? "pr-4 sm:pr-6"
                        : idx === 2
                        ? "border-t md:border-t-0 border-white/10 pt-4 md:pt-0 md:border-l md:border-white/15 md:pl-6 lg:pl-10"
                        : idx === 1
                        ? "border-l border-white/15 pl-6 lg:pl-10"
                        : "border-t md:border-t-0 border-white/10 pt-4 md:pt-0 border-l border-white/15 pl-6 lg:pl-10"
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-none">
                      <SpringCounter
                        target={s.value}
                        suffix={s.suffix}
                        decimals={s.decimals}
                        className="tabular-nums font-light sm:font-normal"
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-semibold tracking-wider text-gray-300 uppercase mt-3">
                      {s.label}
                    </div>
                    {s.footnote && (
                      <div className="text-[10px] text-white/50 font-normal mt-1 tracking-normal">
                        {s.footnote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ━━━ SECTION 1: WHO WE ARE & OUR GENESIS ━━━ */}
        <section className="py-20 lg:py-28 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <Reveal>
                  <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                    Our Genesis
                  </span>
                </Reveal>
                <AnimatedHeading
                  text="Where Vision Meets Purpose"
                  highlight="Purpose"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mt-2 leading-tight"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
                    Founded with a bold vision to eliminate the rigidities of conventional commercial leases, Onward Workspaces emerged as a response to the evolving dynamics of modern work. We recognized that thriving enterprises and fast-growing teams require more than just square footage — they need intelligent environments that nurture company culture, elevate team productivity, and accommodate hyper-fast scaling.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
                    Today, Onward manages premium workspace hubs across Delhi, Noida, and Gurugram, hosting hundreds of thriving businesses ranging from venture-backed startups and unicorns to established multinational corporations.
                  </p>
                </Reveal>

                <div className="mt-8 flex items-center gap-6">
                  <MagneticButton
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-[#d4622b] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#b8501f] transition-all shadow-md"
                  >
                    <span>Schedule a Visit</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </MagneticButton>
                  <Link
                    href="/locations"
                    className="text-[#1a1a2e] font-semibold text-sm hover:text-[#d4622b] transition-colors inline-flex items-center gap-1"
                  >
                    Explore Locations &rarr;
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                    alt="Onward Workspaces Interior"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#d4622b]">
                      Onward Experience
                    </span>
                    <h3 className="text-xl font-bold mt-1">
                      Bespoke Interiors Tailored to Brand Identity
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ SECTION 2: WHO WE ARE (THE 4 CORE PILLARS FROM ONWARD WEBSITE) ━━━ */}
        <section className="py-20 lg:py-28 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  Who We Are?
                </span>
              </Reveal>
              <AnimatedHeading
                text="The Onward Advantage"
                highlight="Advantage"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mt-2"
              />
              <Reveal delay={0.1}>
                <p className="mt-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                  We built Onward around the four fundamental requirements of modern businesses: prime location, agility, affordability, and reliable infrastructure.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {corePillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="h-full bg-[#faf8f5] rounded-3xl p-8 border border-gray-200 shadow-sm hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.3)] transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#d4622b]/10 flex items-center justify-center mb-6 group-hover:bg-[#d4622b] group-hover:text-white transition-colors duration-300">
                        {p.icon}
                      </div>
                      <span className="text-[10px] font-bold text-[#d4622b] uppercase tracking-widest block mb-1">
                        {p.tag}
                      </span>
                      <h3 className="text-xl font-bold text-black mb-3">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ SECTION 3: MISSION, VISION & CORE VALUES ━━━ */}
        <section className="py-20 lg:py-24 bg-[#faf8f5] border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  Our Foundations
                </span>
              </Reveal>
              <AnimatedHeading
                text="Mission, Vision & Core Values"
                highlight="Core Values"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missionVisionValues.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div
                    className={`h-full rounded-3xl p-8 sm:p-10 text-white bg-gradient-to-br ${v.bg} shadow-xl flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-300`}
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
                        {v.tag}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-2 text-white">
                        {v.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#d4622b] uppercase tracking-wider mb-4">
                        {v.subtitle}
                      </p>
                      <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ SECTION 4: MEET OUR TEAM (DUMMY TEAM PLACEHOLDERS & DESCRIPTIONS) ━━━ */}
        <section className="py-20 lg:py-28 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  The Minds Behind Onward
                </span>
              </Reveal>
              <AnimatedHeading
                text="Meet Our Team"
                highlight="Our Team"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mt-2"
              />
              <Reveal delay={0.1}>
                <p className="mt-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                  Passionate industry leaders, architects, and community curators dedicated to empowering your workspace journey every single day.
                </p>
              </Reveal>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <Reveal key={member.name} delay={idx * 0.08}>
                  <div className="bg-[#faf8f5] rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Stylized Avatar Placeholder Frame */}
                      <div className={`relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                        {/* Subtle pattern grid overlay */}
                        <div
                          className="absolute inset-0 opacity-15 pointer-events-none"
                          style={{
                            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                            backgroundSize: "16px 16px",
                          }}
                        />

                        {/* Monogram Silhouette Badge */}
                        <div className="relative flex flex-col items-center justify-center text-center z-10">
                          <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold tracking-widest shadow-xl group-hover:scale-105 group-hover:border-[#d4622b] transition-all duration-300">
                            {member.initials}
                          </div>
                        </div>

                        {/* Role pill badge */}
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Info & Bio */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-black group-hover:text-[#d4622b] transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#d4622b] mt-0.5 mb-3">
                          {member.role}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <span className="inline-flex items-center text-xs font-semibold text-[#d4622b] group-hover:underline">
                        Onward Leadership &rarr;
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ SECTION 5: FOUNDER & LEADERSHIP MESSAGE ━━━ */}
        <section className="py-20 lg:py-24 bg-[#faf8f5] border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-[#1a1a2e] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#d4622b]/10 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
                <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#d4622b]/40 shadow-xl mb-6 bg-gradient-to-br from-[#16171b] via-[#232635] to-[#d4622b]/30 flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl font-bold tracking-widest shadow-2xl">
                      SJ
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Suvrat Jain
                  </h3>
                  <span className="text-[#d4622b] text-sm font-semibold uppercase tracking-wider mt-1">
                    Founder &amp; CEO, Onward Workspaces
                  </span>
                </div>

                <div className="lg:col-span-7">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#d4622b]">
                    Leadership Ethos
                  </span>
                  <blockquote className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed italic">
                    &ldquo;Workplaces should inspire creativity and energize people every single morning. At Onward, we don&apos;t just lease desks — we cultivate dynamic corporate environments where ambitious teams feel empowered to do the best work of their lives.&rdquo;
                  </blockquote>
                  <p className="mt-6 text-gray-400 text-sm sm:text-base leading-relaxed">
                    Under Suvrat&apos;s leadership, Onward Workspaces has grown exponentially across the National Capital Region, setting benchmarks in enterprise customization, tech-driven building operations, and collaborative member experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ SECTION 6: BOTTOM CTA ━━━ */}
        <section className="py-20 bg-white text-center border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
                Ready to Experience Onward?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Take a complimentary tour of our premium centres across Delhi, Noida, or Gurugram and find the perfect space for your team.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <MagneticButton
                href="/#contact"
                className="bg-[#d4622b] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b8501f] transition-all shadow-lg"
              >
                Book a Free Day Pass
              </MagneticButton>
              <Link
                href="/locations"
                className="px-8 py-4 rounded-full font-semibold border border-gray-300 text-gray-700 hover:border-[#d4622b] hover:text-[#d4622b] bg-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                View All Centres
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[#faf8f5] text-gray-500 pt-16 pb-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Onward Workspaces. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/about" className="hover:text-[#d4622b] transition-colors">About</Link>
              <Link href="/locations" className="hover:text-[#d4622b] transition-colors">Locations</Link>
              <Link href="/team" className="hover:text-[#d4622b] transition-colors">Team</Link>
              <Link href="/blog" className="hover:text-[#d4622b] transition-colors">Blog</Link>
              <Link href="/#contact" className="hover:text-[#d4622b] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
