"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";
import SpringCounter from "@/components/SpringCounter";

const stats = [
  { value: 9, suffix: "", label: "CITIES", footnote: "*As of March, 2026" },
  { value: 11.46, suffix: "", label: "MN SQ FT", decimals: 2 },
  { value: 425, suffix: "+", label: "ENTERPRISE CLIENTS" },
  { value: 80, suffix: "+", label: "CENTRES" },
];

const pillars = [
  {
    title: "Prime Strategic Locations",
    desc: "Positioned in Delhi NCR's most iconic central business districts and tech corridors — ensuring your commute is seamless whether via metro express lines or major arterial highways.",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      </svg>
    ),
  },
  {
    title: "Unprecedented Flexibility",
    desc: "From dynamic single-day passes and hybrid team suites to full-floor custom enterprise headquarters, scale desk counts up or down effortlessly as your business accelerates.",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Transparent & Accessible",
    desc: "Zero hidden maintenance fees or unexpected overheads. Transparent plans starting as low as ₹4,000/month with predictable all-inclusive utility billing and dedicated concierge support.",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Enterprise Grade IT & Security",
    desc: "Bank-grade high-speed dedicated leased lines, dual ISP failovers, biometric & RFID access controls, round-the-clock CCTV surveillance, and 24/7 on-site technical support.",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const coreValues = [
  {
    title: "Mission",
    subtitle: "Empowering Growth",
    desc: "To deliver agile, premium, and design-led workspaces that eliminate operational frictions and empower startups, SMEs, and Fortune 500 enterprises to thrive.",
    bg: "from-[#1a1a2e] to-[#252542]",
  },
  {
    title: "Vision",
    subtitle: "Setting Global Standards",
    desc: "To redefine the commercial workspace experience across India by establishing a seamless network of connected, intelligent, and sustainable corporate ecosystems.",
    bg: "from-[#d4622b] to-[#b8501f]",
  },
  {
    title: "Values",
    subtitle: "Excellence & Hospitality",
    desc: "We stand on relentless customer obsession, uncompromised design integrity, proactive community curation, and transparent, ethical partnership standards.",
    bg: "from-[#22242a] to-[#16171b]",
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
              Onward Workspaces transforms real estate into vibrant business launchpads. We empower high-growth teams with turnkey, hospitality-driven managed offices across Delhi NCR.
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
                    <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase mt-2">
                      {s.label}
                    </div>
                    {s.footnote && (
                      <div className="text-[10px] text-white/50 font-normal mt-2.5 tracking-normal">
                        {s.footnote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ━━━ OUR STORY & GENESIS ━━━ */}
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
                    Founded with a vision to eliminate the conventional rigidities of commercial leases, Onward Workspaces emerged as a response to the evolving nature of modern work. We recognized that enterprises and growing ventures require more than just square footage — they need intelligent environments that foster culture, boost team productivity, and accommodate hyper-fast scaling.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
                    Today, Onward manages premium workspace hubs across Delhi, Noida, and Gurugram, hosting hundreds of thriving businesses ranging from venture-backed startups and unicorns to established multinational enterprises.
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

        {/* ━━━ MISSION, VISION & VALUES ━━━ */}
        <section className="py-20 lg:py-24 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  Our Pillars
                </span>
              </Reveal>
              <AnimatedHeading
                text="Mission, Vision & Core Values"
                highlight="Core Values"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreValues.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div
                    className={`h-full rounded-3xl p-8 sm:p-10 text-white bg-gradient-to-br ${v.bg} shadow-xl flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-300`}
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
                        {v.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-4 text-white">
                        {v.title}
                      </h3>
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

        {/* ━━━ WHY ONWARD: THE 4 PILLARS ━━━ */}
        <section className="py-20 lg:py-28 bg-[#faf8f5] border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  Why Choose Onward
                </span>
              </Reveal>
              <AnimatedHeading
                text="Built for Today's High-Velocity Teams"
                highlight="High-Velocity Teams"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mt-2"
              />
              <Reveal delay={0.1}>
                <p className="mt-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                  Every detail of our infrastructure is engineered to remove operational friction so you can focus entirely on accelerating growth.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="h-full bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.3)] transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#d4622b]/10 flex items-center justify-center mb-6">
                        {p.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">
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

        {/* ━━━ FOUNDER & LEADERSHIP MESSAGE ━━━ */}
        <section className="py-20 lg:py-24 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-[#1a1a2e] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#d4622b]/10 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
                <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#d4622b]/40 shadow-xl mb-6">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                      alt="Suvrat Jain - Founder & CEO"
                      fill
                      className="object-cover"
                    />
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

        {/* ━━━ BOTTOM CTA ━━━ */}
        <section className="py-20 bg-[#faf8f5] text-center">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
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
                className="px-8 py-4 rounded-full font-semibold border border-gray-300 text-gray-700 hover:border-[#d4622b] hover:text-[#d4622b] bg-white transition-all shadow-sm"
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
