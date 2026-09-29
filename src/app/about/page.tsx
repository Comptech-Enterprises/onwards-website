"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";
import AutoSlider from "@/components/AutoSlider";

/* ━━━ THE IDEAL WORKSPACE AS A SOLUTION (3-STEP PROCESS) ━━━ */
const workspaceSteps = [
  {
    step: "01",
    title: "Lease",
    desc: "We identify and secure the right building for your business. Onward holds and manages the landlord lease, so you don't have to.",
  },
  {
    step: "02",
    title: "Design & Build",
    desc: "Built to your brief, or delivered through our proven standards. Custom offices, designed and delivered in under 75 days.",
  },
  {
    step: "03",
    title: "Operations",
    desc: "From day one to daily operations, we handle it all. Your team focuses on work — we take care of everything else.",
  },
];

/* ━━━ MISSION, VISION & VALUES ━━━ */
const missionVisionValues = [
  {
    title: "Mission",
    desc: "Driven by a passion for excellence, our mission is to empower individuals and businesses to reach their full potential. We believe that by fostering a dynamic and supportive work environment, we can inspire creativity, productivity, and growth.",
    bg: "from-[#1a1a2e] to-[#252542]",
    tag: "OUR PURPOSE",
  },
  {
    title: "Vision",
    desc: "Our vision is to be the premier destination for professionals seeking a dynamic and vibrant coworking community, where innovation, productivity, and growth are limitless.",
    bg: "from-[#d4622b] to-[#b8501f]",
    tag: "OUR ASPIRATION",
  },
];

/* ━━━ CORE VALUES (REAL ONWARD WORKSPACES CONTENT) ━━━ */
const coreValues = [
  {
    title: "Customer always comes first",
    desc: "We are committed to bringing together elements that help companies scale and make our members happy.",
  },
  {
    title: "No cutting corners",
    desc: "Our members only deserve the best. That's the reason we focus so much on quality & precision in our every offering.",
  },
  {
    title: "Uninterrupted services",
    desc: "Keeping our members on the go is what we strive for. Hence, we offer uninterrupted services & complete support.",
  },
  {
    title: "Honesty",
    desc: "We abide by the quote — Secret of every successful relationship is transparency. You will experience the same in our every interaction & action.",
  },
  {
    title: "Dignity & Respect",
    desc: "When you associate with us, you become a part of our family where the bonds are made with utmost respect, dignity, integrity, compassion, and thoughtfulness.",
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
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20 pb-20">
        {/* ━━━ SECTION 1: ABOUT US + GENESIS (CLUBBED) ━━━ */}
        <section className="bg-white border-b border-gray-200/80 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <li>
                  <Link href="/" className="hover:text-[#d4622b] transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-800 font-semibold">About Us</li>
              </ol>
            </nav>

            <Reveal>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                About Us
              </span>
            </Reveal>

            <div className="mt-3 font-bold tracking-tight leading-[1.05] sm:leading-[0.95]">
              <AnimatedHeading
                as="h1"
                text="Crafting Workspaces."
                className="block text-2xl sm:text-4xl md:text-5xl lg:text-7xl"
                delay={0}
              />
              <AnimatedHeading
                text="Built Around Ambition."
                className="block text-2xl sm:text-4xl md:text-5xl lg:text-7xl"
                textClassName="text-gray-400"
                delay={0.15}
              />
              <AnimatedHeading
                text="Brand & People."
                className="block text-2xl sm:text-4xl md:text-5xl lg:text-7xl"
                textClassName="text-gray-300"
                delay={0.3}
              />
            </div>

            <div className="mt-8 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <Reveal delay={0.1}>
                  <p className="text-gray-600 text-xs sm:text-base lg:text-lg leading-relaxed text-justify">
                    Established in 2019, Onward Workspaces is a Delhi-based coworking company built to eliminate the rigidities of conventional commercial leases. We recognized that thriving enterprises and fast-growing teams require more than just square footage — they need intelligent environments that nurture company culture, elevate team productivity, and accommodate hyper-fast scaling.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-base lg:text-lg leading-relaxed text-justify">
                    Today, Onward manages premium workspace hubs across Delhi, Noida, and Gurugram, hosting hundreds of thriving businesses ranging from venture-backed startups and unicorns to established multinational corporations.
                  </p>
                </Reveal>

                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-6">
                  <MagneticButton
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#d4622b] text-white px-4 py-2.5 sm:px-7 sm:py-3.5 rounded-full font-semibold hover:bg-[#b8501f] transition-all shadow-md text-xs sm:text-sm md:text-base whitespace-nowrap"
                  >
                    <span>Schedule a Visit</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </MagneticButton>
                  <Link
                    href="/locations"
                    className="text-[#1a1a2e] font-semibold text-xs sm:text-sm hover:text-[#d4622b] transition-colors inline-flex items-center gap-1 whitespace-nowrap py-2"
                  >
                    Explore Locations &rarr;
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                  <Image
                    src="https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/about/1790662449490.webp"
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

        {/* ━━━ SECTION 2: THE IDEAL WORKSPACE AS A SOLUTION ━━━ */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <Image
            src="https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/about/1790662449896.webp"
            alt="Onward Workspaces skyline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Reveal>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
                  What We Do
                </span>
              </Reveal>
              <AnimatedHeading
                text="The Ideal Workspace as a Solution"
                highlight="Solution"
                className="text-2xl sm:text-4xl lg:text-5xl mt-2"
                textClassName="text-white"
              />
            </div>

            <div className="relative">
              <div className="hidden sm:block absolute top-5 left-[16.66%] right-[16.66%] h-px bg-white/20" />
              {/* Desktop 3-col grid */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-8">
                {workspaceSteps.map((s) => (
                  <Reveal key={s.step} delay={Number(s.step) * 0.05}>
                    <div className="relative flex flex-col items-center text-center rounded-2xl bg-white/95 backdrop-blur-sm border border-white/20 px-6 py-8 shadow-xl h-full">
                      <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-[#d4622b] text-[#d4622b] flex items-center justify-center text-sm font-bold">
                        {s.step}
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-black">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs">
                        {s.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Mobile AutoSlider */}
              <div className="sm:hidden">
                <AutoSlider interval={3500} dotColor="dark">
                  {workspaceSteps.map((s) => (
                    <div key={s.step} className="relative flex flex-col items-center text-center rounded-2xl bg-white/95 backdrop-blur-sm border border-white/20 px-5 py-6 shadow-xl">
                      <div className="relative z-10 w-8 h-8 rounded-full bg-white border-2 border-[#d4622b] text-[#d4622b] flex items-center justify-center text-xs font-bold">
                        {s.step}
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-black">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-gray-600 text-xs leading-relaxed max-w-xs">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </AutoSlider>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ SECTION 3: MISSION, VISION & CORE VALUES ━━━ */}
        <section className="py-14 sm:py-20 lg:py-24 bg-[#faf8f5] border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
              <Reveal>
                <span className="text-[#d4622b] text-xs sm:text-sm font-semibold tracking-widest uppercase">
                  Our Foundations
                </span>
              </Reveal>
              <AnimatedHeading
                text="Mission & Vision"
                highlight="Vision"
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black mt-2"
              />
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-8">
              {missionVisionValues.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div
                    className={`h-full rounded-3xl p-8 sm:p-10 text-white bg-gradient-to-br ${v.bg} shadow-xl flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-300`}
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
                        {v.tag}
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

            {/* Mobile AutoSlider */}
            <div className="md:hidden">
              <AutoSlider interval={4000}>
                {missionVisionValues.map((v) => (
                  <div
                    key={v.title}
                    className={`rounded-2xl p-5 text-white bg-gradient-to-br ${v.bg} shadow-lg flex flex-col justify-between min-h-[190px]`}
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                        {v.tag}
                      </span>
                      <h3 className="text-lg font-bold mt-1.5 mb-2 text-white">
                        {v.title}
                      </h3>
                      <p className="text-white/90 text-xs leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </AutoSlider>
            </div>
          </div>
        </section>

        {/* ━━━ SECTION 3B: OUR CORE VALUES (REAL ONWARD WORKSPACES CONTENT) ━━━ */}
        <section className="py-14 sm:py-20 lg:py-24 bg-[#faf8f5] border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-8 sm:mb-14">
              <Reveal>
                <span className="text-[#d4622b] text-xs sm:text-sm font-semibold tracking-widest uppercase">
                  Our Ethos
                </span>
              </Reveal>
              <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold text-black">
                Our Core Values
              </h2>
            </div>

            <div className="border-t border-gray-200">
              {coreValues.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-1.5 lg:gap-10 py-5 sm:py-8 border-b border-gray-200">
                    <span className="lg:col-span-1 text-xs sm:text-sm font-semibold text-[#d4622b]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="lg:col-span-5 text-lg sm:text-2xl lg:text-3xl font-bold text-black leading-snug">
                      {v.title}
                    </h3>
                    <p className="lg:col-span-6 text-gray-600 text-xs sm:text-base leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ SECTION 4: MEET OUR TEAM (DUMMY TEAM PLACEHOLDERS & DESCRIPTIONS) ━━━ */}
        <section className="py-14 sm:py-20 lg:py-28 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
              <Reveal>
                <span className="text-[#d4622b] text-xs sm:text-sm font-semibold tracking-widest uppercase">
                  The Minds Behind Onward
                </span>
              </Reveal>
              <AnimatedHeading
                text="Meet Our Team"
                highlight="Our Team"
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black mt-2"
              />
              <Reveal delay={0.1}>
                <p className="mt-3 text-gray-600 text-xs sm:text-base lg:text-lg leading-relaxed">
                  Passionate industry leaders, architects, and community curators dedicated to empowering your workspace journey every single day.
                </p>
              </Reveal>
            </div>

            {/* Desktop Team Members Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <Reveal key={member.name} delay={idx * 0.08}>
                  <div className="bg-[#faf8f5] rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:border-[#d4622b] hover:shadow-[0_12px_30px_-12px_rgba(212,98,43,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group h-full">
                    <div>
                      {/* Stylized Avatar Placeholder Frame */}
                      <div className={`relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                        <div
                          className="absolute inset-0 opacity-15 pointer-events-none"
                          style={{
                            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                            backgroundSize: "16px 16px",
                          }}
                        />
                        <div className="relative flex flex-col items-center justify-center text-center z-10">
                          <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold tracking-widest shadow-xl group-hover:scale-105 group-hover:border-[#d4622b] transition-all duration-300">
                            {member.initials}
                          </div>
                        </div>
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
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Mobile Team AutoSlider */}
            <div className="sm:hidden">
              <AutoSlider interval={3500}>
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="bg-[#faf8f5] rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                      <div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                      />
                      <div className="w-14 h-14 rounded-xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg font-bold tracking-widest shadow-lg">
                        {member.initials}
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between z-10">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                          {member.role}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold text-black">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#d4622b] mt-0.5 mb-1.5">
                        {member.role}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </AutoSlider>
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

      <Footer />
    </>
  );
}
