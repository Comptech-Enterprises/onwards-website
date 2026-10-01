"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import RotatingPhotoStack from "@/components/RotatingPhotoStack";

/* ━━━ 1. HERO ROTATING KEYWORDS ━━━ */
const heroWords = [
  { word: "Scale.", highlight: "Built for Enterprise" },
  { word: "Execution.", highlight: "75-Day Turnkey Delivery" },
  { word: "Community.", highlight: "425+ Thriving Businesses" },
  { word: "Heart.", highlight: "Human-First Hospitality" },
];


/* ━━━ 3. INTERACTIVE VALUES LIST ━━━ */
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

/* ━━━ 4. LIFE AT ONWARD SLIDER ITEMS ━━━ */
const lifeStories = [
  {
    title: "Reflection is part of the process",
    desc: "Sometimes the most breakthrough ideas happen over a cup of artisan coffee, not inside a boardroom. We build spacious breakout lounges, green outdoor terraces, and contemplative focus pods so your team can step away, recalibrate, and come back sharper.",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719861.webp",
    tag: "Mindful Spaces",
  },
  {
    title: "A curated physical library & book lounges",
    desc: "We are high-tech, but we cherish the analog world of literature and timeless design. Our centres feature community book shelves curated with top business, design, and philosophy reads that belong to every single member.",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720474.webp",
    tag: "Knowledge & Growth",
  },
  {
    title: "We celebrate every team milestone",
    desc: "From Friday community socials and festive celebrations to founders' fireside chats and product launch parties, Onward is an energizing ecosystem where achievements are celebrated together.",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720553.webp",
    tag: "Community Culture",
  },
  {
    title: "We stay active & wellness-oriented",
    desc: "Wellness isn't an afterthought. With on-campus gaming zones, yoga sessions, ergonomic standing desks, and partnerships with local fitness studios, staying energized is part of daily life at Onward.",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720620.webp",
    tag: "Active Life",
  },
  {
    title: "Enterprise scaling without logistical headache",
    desc: "Need 20 seats today and 200 next quarter? Our modular enterprise suites scale dynamically with your hiring velocity so your real estate never bottlenecks your ambition.",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790526.webp",
    tag: "Seamless Scaling",
  },
];

/* ━━━ 5. LEADERSHIP TEAM WITH EXPANDABLE BIO DRAWERS ━━━ */
const teamMembers = [
  {
    name: "Suvrat Jain",
    role: "Founder & CEO",
    bio: "Suvrat leads Onward Workspaces with a vision to eliminate the inefficiencies of conventional corporate leasing. Combining sharp real estate acumen with human-first hospitality, he has spearheaded Onward's expansion across Delhi NCR, hosting Fortune 500 enterprises, unicorns, and fast-scaling tech companies.",
    initials: "SJ",
    email: "suvrat@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Aakash Sharma",
    role: "Head of Expansion & Portfolio",
    bio: "Aakash oversees real estate acquisitions, strategic landlord partnerships, and multi-city hub launches. He ensures that every Onward location occupies prime transit-connected corridors adjacent to major metro arteries and business districts.",
    initials: "AS",
    email: "aakash@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rhea Sen",
    role: "Lead Architect & Spatial Design",
    bio: "Rhea orchestrates Onward's design philosophy—balancing ergonomic acoustics, biophilic elements, natural daylight optimization, and custom enterprise branding. Her team delivers bespoke turnkey office floors in under 75 days.",
    initials: "RS",
    email: "rhea@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Vikram Malhotra",
    role: "Head of Member Experience",
    bio: "Vikram leads our community curation, concierge services, and enterprise client relations. His mission is to ensure that every team member entering an Onward space experiences seamless hospitality and effortless workday flow.",
    initials: "VM",
    email: "vikram@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pooja Verma",
    role: "Chief Technology & Operations Officer",
    bio: "Pooja drives building automation, IoT access control, redundant high-capacity fiber networks, and 24/7 IT uptime for hundreds of technology and financial enterprise clients.",
    initials: "PV",
    email: "pooja@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Nitin Mehra",
    role: "Director of Enterprise Solutions",
    bio: "Nitin works directly with enterprise CFOs, CXOs, and real estate heads to structure flexible managed office agreements that optimize CAPEX, reduce real estate liability, and accommodate hyper-fast team growth.",
    initials: "NM",
    email: "nitin@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AboutPage() {
  /* Life Carousel state */
  const [lifeIdx, setLifeIdx] = useState(0);

  /* Active value accordion state */
  const [activeValue, setActiveValue] = useState<string>("excellence");

  /* Scroll hooks for 5 scattered photos parallax */
  const welcomeRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: welcomeProgress } = useScroll({
    target: welcomeRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(welcomeProgress, [0, 1], [25, -30]);
  const y2 = useTransform(welcomeProgress, [0, 1], [40, -45]);
  const y3 = useTransform(welcomeProgress, [0, 1], [15, -20]);
  const y4 = useTransform(welcomeProgress, [0, 1], [35, -40]);
  const y5 = useTransform(welcomeProgress, [0, 1], [20, -25]);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] text-[#1a1a2e] min-h-screen overflow-x-hidden pt-20">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. HERO: CLEAN EDITORIAL HEADLINE, STORY & KEY METRICS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative overflow-hidden border-b border-gray-200/80 bg-white pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="hidden xl:block absolute top-[30%] right-0 w-[620px] z-0">
            <RotatingPhotoStack />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb + Tag */}
            <div className="mb-5">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                  <li>
                    <Link href="/" className="hover:text-[#d4622b] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-gray-900">About Us</li>
                </ol>
              </nav>
            </div>

            {/* Giant Editorial Headline */}
            <div className="max-w-5xl mb-12 sm:mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1a1a2e] tracking-tight leading-[1.04]"
              >
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="block"
                >
                  Crafting Workspaces.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="block text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  Built Around Ambition.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="block text-gray-300 hover:text-gray-500 transition-colors duration-300"
                >
                  Brand &amp; People.
                </motion.span>
              </motion.h1>
            </div>

            {/* Story Description & CTAs */}
            <div className="pt-8 sm:pt-10">
              <div className="max-w-3xl">
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
                  Established in 2019, Onward Workspaces is a Delhi-based coworking company built to eliminate the rigidities of conventional commercial leases. We recognized that thriving enterprises and fast-growing teams require more than just square footage — they need intelligent environments that nurture company culture, elevate team productivity, and accommodate hyper-fast scaling.
                </p>
                <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
                  Today, Onward manages premium workspace hubs across Delhi, Noida, and Gurugram, hosting hundreds of thriving businesses ranging from venture-backed startups and unicorns to established multinational corporations.
                </p>

                {/* Action Buttons */}
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
                  <Link
                    href="/locations/delhi"
                    className="text-[#1a1a2e] font-bold text-sm hover:text-[#d4622b] transition-colors inline-flex items-center gap-1.5 py-2"
                  >
                    Explore Locations &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. SCATTERED 5-PHOTO WELCOME GALLERY (EXACT BRILEAN COMPOSITION)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={welcomeRef}
          className="relative min-h-[90vh] sm:min-h-[100vh] bg-white py-16 sm:py-24 overflow-hidden border-b border-gray-200/80 flex items-center justify-center"
        >
          <div className="relative w-full max-w-7xl mx-auto h-[680px] sm:h-[780px] lg:h-[860px] flex items-center justify-center">

            {/* ── Photo 1: Top Left (Wide Landscape - Team Group) ── */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[8%] sm:top-[10%] lg:top-[12%] left-[4%] sm:left-[6%] lg:left-[8%] w-44 sm:w-64 lg:w-80 aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-black/5 z-10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_24%)] transition-transform duration-500 hover:scale-[1.02]"
            >
              <Image
                src="https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719810.webp"
                alt="Onward collaborative team"
                fill
                sizes="(max-width: 768px) 180px, 320px"
                className="object-cover"
              />
            </motion.div>

            {/* ── Photo 2: Top Right (Portrait - Outdoor/Reading) ── */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[4%] sm:top-[6%] lg:top-[8%] right-[6%] sm:right-[10%] lg:right-[14%] w-28 sm:w-40 lg:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-black/5 z-10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_28%)] transition-transform duration-500 hover:scale-[1.02]"
            >
              <Image
                src="https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720474.webp"
                alt="Mindful reading library"
                fill
                sizes="(max-width: 768px) 120px, 200px"
                className="object-cover"
              />
            </motion.div>

            {/* ── Photo 3: Center Top (Portrait - Table Activity, directly above text) ── */}
            <motion.div
              style={{ y: y3 }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[16%] sm:top-[18%] lg:top-[20%] left-1/2 -translate-x-1/2 w-28 sm:w-36 lg:w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-black/5 z-10 transition-transform duration-500 hover:scale-[1.02]"
            >
              <Image
                src="https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720403.webp"
                alt="Team breakout collaboration"
                fill
                sizes="(max-width: 768px) 120px, 180px"
                className="object-cover"
              />
            </motion.div>

            {/* ── Center Welcome Text ── */}
            <div className="relative z-20 text-center max-w-xl sm:max-w-2xl px-4 my-auto select-none pt-24 sm:pt-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-light text-[#1a1a2e] tracking-tight leading-[1.12]">
                  Whatever brought you to this page, <span className="font-normal text-[#1a1a2e]">welcome.</span>
                </h2>

                {/* Scroll Down Button */}
                <div className="mt-6 sm:mt-7 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      const nextSection = document.getElementById("values-section");
                      nextSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                    aria-label="Scroll down to core values"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 hover:border-[#1a1a2e] hover:bg-black/5 flex items-center justify-center text-[#1a1a2e] transition-all duration-300 shadow-xs cursor-pointer group"
                  >
                    <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* ── Photo 4: Bottom Left (Portrait - Member Standing) ── */}
            <motion.div
              style={{ y: y4 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[6%] sm:bottom-[8%] lg:bottom-[10%] left-[8%] sm:left-[14%] lg:left-[18%] w-28 sm:w-36 lg:w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-black/5 z-10 [mask-image:linear-gradient(to_top,transparent_0%,black_28%)] transition-transform duration-500 hover:scale-[1.02]"
            >
              <Image
                src="https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/about/1790662449490.webp"
                alt="Community member"
                fill
                sizes="(max-width: 768px) 120px, 180px"
                className="object-cover"
              />
            </motion.div>

            {/* ── Photo 5: Bottom Center / Mid-Right (Landscape - Team Life) ── */}
            <motion.div
              style={{ y: y5 }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[8%] sm:bottom-[10%] lg:bottom-[12%] left-[42%] sm:left-[45%] lg:left-[48%] -translate-x-[20%] w-44 sm:w-60 lg:w-72 aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-black/5 z-10 transition-transform duration-500 hover:scale-[1.02]"
            >
              <Image
                src="https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720553.webp"
                alt="Team milestones & active life"
                fill
                sizes="(max-width: 768px) 180px, 290px"
                className="object-cover"
              />
            </motion.div>

          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. "OUR VALUES" INTERACTIVE ACCORDION LIST (EXACT BRILEAN STYLE)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="values-section" className="py-24 sm:py-32 bg-white border-b border-gray-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1a1a2e] text-center tracking-tight mb-14 sm:mb-20">
              Our values
            </h2>

            {/* Values Interactive Rows */}
            <div className="max-w-4xl mx-auto border-t border-gray-200">
              {valuesList.map((val) => {
                const isActive = activeValue === val.id;
                return (
                  <div
                    key={val.id}
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
                          {/* Left Column: Icon + Title in Orange */}
                          <div className="md:col-span-6 flex items-center gap-4 sm:gap-5">
                            <div className="shrink-0">
                              {val.icon}
                            </div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#d4622b] leading-tight">
                              {val.title}
                            </h3>
                          </div>

                          {/* Right Column: Description */}
                          <div className="md:col-span-6">
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                              {val.desc}
                            </p>
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
                );
              })}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. "LIFE AT ONWARD" SWIPER / STORY CAROUSEL (LIGHT THEME)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-20 sm:py-28 bg-[#faf8f5] text-[#1a1a2e] relative overflow-hidden border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">
                  Culture &amp; Environment
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#1a1a2e] tracking-tight mt-1">
                  Life at Onward
                </h2>
              </div>

              {/* Slider Arrows Navigation */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLifeIdx((prev) => (prev > 0 ? prev - 1 : lifeStories.length - 1))}
                  className="w-12 h-12 rounded-full border border-gray-300 bg-white hover:border-[#d4622b] hover:bg-[#d4622b] text-[#1a1a2e] hover:text-white shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95"
                  aria-label="Previous story"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setLifeIdx((prev) => (prev < lifeStories.length - 1 ? prev + 1 : 0))}
                  className="w-12 h-12 rounded-full border border-gray-300 bg-white hover:border-[#d4622b] hover:bg-[#d4622b] text-[#1a1a2e] hover:text-white shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95"
                  aria-label="Next story"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slider Content: Big Photo on Left, Synced Story on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Photo Viewport */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lifeStories[lifeIdx].img}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={lifeStories[lifeIdx].img}
                        alt={lifeStories[lifeIdx].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                        {lifeStories[lifeIdx].tag}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bullet Indicators */}
                <div className="flex items-center gap-2 mt-4">
                  {lifeStories.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLifeIdx(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === lifeIdx ? "w-8 bg-[#d4622b]" : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Synced Story Card */}
              <div className="lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lifeStories[lifeIdx].title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xl"
                  >
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b] block mb-2">
                      Story 0{lifeIdx + 1} / 0{lifeStories.length}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a1a2e] tracking-tight">
                      {lifeStories[lifeIdx].title}
                    </h3>
                    <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {lifeStories[lifeIdx].desc}
                    </p>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-semibold">Experience it in person</span>
                      <Link
                        href="/#contact"
                        className="text-xs font-bold text-[#d4622b] hover:text-[#b8501f] transition-colors inline-flex items-center gap-1.5"
                      >
                        Book a Day Pass &rarr;
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. BRILEAN-STYLE TEAM SECTION WITH EXPANDABLE BIO DRAWERS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-20 sm:py-28 bg-[#faf8f5] border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">
                The Minds Behind Onward
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1a1a2e] tracking-tight mt-1">
                Our Present and Future
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                Meet the passionate real estate strategists, architects, and community leaders driving our mission every day.
              </p>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Clean Avatar / Visual Placeholder Box */}
                    <div className="relative aspect-[4/3] w-full bg-[#f5efe6] border-b border-gray-200/60 flex flex-col items-center justify-center overflow-hidden">
                      {/* Avatar Initials Badge */}
                      <div className="w-20 h-20 rounded-2xl bg-white border border-[#e5dcd0] shadow-xs flex items-center justify-center text-[#d4622b] font-bold text-2xl tracking-wider group-hover:scale-105 transition-transform duration-300">
                        {member.initials}
                      </div>

                      {/* Bottom Role Tag */}
                      <div className="absolute bottom-3 left-4 right-4 z-10 flex justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a2e] bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-gray-200/80 shadow-xs">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    {/* Name & Role Title */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500 mt-1">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            6. BOTTOM CTA
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-20 sm:py-24 bg-white text-center border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4622b] block mb-2">
              Join the Network
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1a1a2e] tracking-tight">
              Ready to elevate your workspace?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              Book a walkthrough of our centres across Delhi, Noida, or Gurugram and let our team curate your ideal office layout.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                href="/#contact"
                className="w-full sm:w-auto bg-[#d4622b] hover:bg-[#b8501f] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base shadow-xl transition-all"
              >
                Book a Free Tour & Day Pass
              </MagneticButton>
              <Link
                href="/locations"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm sm:text-base border border-gray-300 hover:border-[#1a1a2e] text-[#1a1a2e] bg-white transition-all shadow-xs"
              >
                View All Micro-Markets
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
