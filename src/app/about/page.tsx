"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

/* ━━━ 1. HERO ROTATING KEYWORDS ━━━ */
const heroWords = [
  { word: "Scale.", highlight: "Built for Enterprise" },
  { word: "Execution.", highlight: "75-Day Turnkey Delivery" },
  { word: "Community.", highlight: "425+ Thriving Businesses" },
  { word: "Heart.", highlight: "Human-First Hospitality" },
];


/* ━━━ 3. INTERACTIVE ACCORDION VALUES ━━━ */
const valuesList = [
  {
    id: "excellence",
    title1: "A commitment",
    title2: "to excellence",
    desc: "We love building and we are obsessed with crafting spaces that make teams happier, healthier, and distinctly more productive. From sound-dampening acoustic design to high-speed dual-ISP fiber lines, every detail is engineered with uncompromising precision.",
    icon: (
      <svg className="w-8 h-8 text-[#d4622b]" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M20 8v24M8 20h24M12 12l16 16M28 12L12 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "wellness",
    title1: "Work-life &",
    title2: "human wellness",
    desc: "We are human-centric to the core. Our workspaces integrate abundant natural biophilic greenery, ergonomic posture seating, dedicated breakout lounges, mother care rooms, and meditation corners. We believe true productivity flows from balanced well-being.",
    icon: (
      <svg className="w-8 h-8 text-[#d4622b]" viewBox="0 0 40 40" fill="none">
        <path d="M20 32s-12-7.5-12-16a8 8 0 0116-2.5A8 8 0 0132 16c0 8.5-12 16-12 16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="20" cy="16" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "quality",
    title1: "Continuous quality",
    title2: "improvement",
    desc: "Our spaces are never static. We continuously gather member feedback, optimize energy consumption with IoT building automation, upgrade shared technology, and refresh layouts so that your team always works in a state-of-the-art environment.",
    icon: (
      <svg className="w-8 h-8 text-[#d4622b]" viewBox="0 0 40 40" fill="none">
        <path d="M20 6v6m0 16v6M6 20h6m16 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M20 15v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "transparency",
    title1: "Radical honesty &",
    title2: "client dignity",
    desc: "No hidden CAM charges, no utility surprises, and no cutting corners. When you partner with Onward, you join a community grounded in transparency, integrity, respect, and mutual growth across every single touchpoint.",
    icon: (
      <svg className="w-8 h-8 text-[#d4622b]" viewBox="0 0 40 40" fill="none">
        <path d="M20 4L7 10v10c0 9 5.5 14.5 13 16 7.5-1.5 13-7 13-16V10L20 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 19l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/about/1790662449490.webp",
  },
  {
    name: "Aakash Sharma",
    role: "Head of Expansion & Portfolio",
    bio: "Aakash oversees real estate acquisitions, strategic landlord partnerships, and multi-city hub launches. He ensures that every Onward location occupies prime transit-connected corridors adjacent to major metro arteries and business districts.",
    initials: "AS",
    email: "aakash@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790382.webp",
  },
  {
    name: "Rhea Sen",
    role: "Lead Architect & Spatial Design",
    bio: "Rhea orchestrates Onward's design philosophy—balancing ergonomic acoustics, biophilic elements, natural daylight optimization, and custom enterprise branding. Her team delivers bespoke turnkey office floors in under 75 days.",
    initials: "RS",
    email: "rhea@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613882593.webp",
  },
  {
    name: "Vikram Malhotra",
    role: "Head of Member Experience",
    bio: "Vikram leads our community curation, concierge services, and enterprise client relations. His mission is to ensure that every team member entering an Onward space experiences seamless hospitality and effortless workday flow.",
    initials: "VM",
    email: "vikram@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613882635.webp",
  },
  {
    name: "Pooja Verma",
    role: "Chief Technology & Operations Officer",
    bio: "Pooja drives building automation, IoT access control, redundant high-capacity fiber networks, and 24/7 IT uptime for hundreds of technology and financial enterprise clients.",
    initials: "PV",
    email: "pooja@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613882693.webp",
  },
  {
    name: "Nitin Mehra",
    role: "Director of Enterprise Solutions",
    bio: "Nitin works directly with enterprise CFOs, CXOs, and real estate heads to structure flexible managed office agreements that optimize CAPEX, reduce real estate liability, and accommodate hyper-fast team growth.",
    initials: "NM",
    email: "nitin@onwardworkspaces.com",
    linkedin: "https://www.linkedin.com/",
    img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790614051010.webp",
  },
];

/* ━━━ INTERACTIVE CANVAS SPHERE PARTICLES (HERO 3D ANIMATION) ━━━ */
import ThreeDCardCarousel from "@/components/ThreeDCardCarousel";

const galleryColLeft = [
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719810.webp", aspect: "aspect-[16/10]", alt: "Onward collaborative lounge" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720474.webp", aspect: "aspect-[3/4]", alt: "Curated reading library" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720403.webp", aspect: "aspect-[16/10]", alt: "Ergonomic workstations" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/about/1790662449490.webp", aspect: "aspect-[3/4]", alt: "Community member" },
];

const galleryColCenter = [
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790287.webp", aspect: "aspect-[3/4]", alt: "Executive boardroom" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720553.webp", aspect: "aspect-[16/10]", alt: "Team outdoor celebration" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790526.webp", aspect: "aspect-[3/4]", alt: "Private enterprise suite" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790610.webp", aspect: "aspect-[16/10]", alt: "Collaborative design studio" },
];

const galleryColRight = [
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613881869.webp", aspect: "aspect-[3/4]", alt: "Sunlit cafe lounge" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719861.webp", aspect: "aspect-[16/10]", alt: "Breakout lounge" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790382.webp", aspect: "aspect-[3/4]", alt: "Brainstorming studio" },
  { src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720620.webp", aspect: "aspect-[16/10]", alt: "Wellness active zone" },
];

export default function AboutPage() {
  /* Life Carousel state */
  const [lifeIdx, setLifeIdx] = useState(0);

  /* Team member bio drawer state */
  const [expandedTeamMember, setExpandedTeamMember] = useState<string | null>(null);

  /* Scroll hooks for sticky welcome multi-column flowing parallax */
  const welcomeRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: welcomeProgress } = useScroll({
    target: welcomeRef,
    offset: ["start end", "end start"],
  });

  const colLeftY = useTransform(welcomeProgress, [0, 1], ["12%", "-38%"]);
  const colCenterY = useTransform(welcomeProgress, [0, 1], ["-6%", "-52%"]);
  const colRightY = useTransform(welcomeProgress, [0, 1], ["18%", "-32%"]);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] text-[#1a1a2e] min-h-screen overflow-x-hidden pt-20">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. HERO: HEADLINE ON LEFT + COMPACT 3D CARDS AT TOP RIGHT
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative overflow-hidden border-b border-gray-200/80 bg-white pt-10 pb-14 sm:pt-14 sm:pb-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Row Grid: Headline on Left, 3D Rotating Cylinder on Top Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-10 sm:mb-12">
              {/* Left Column: Breadcrumb + Tag + Giant Headline */}
              <div className="lg:col-span-7 flex flex-col justify-center">
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

                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-3"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4622b]/10 text-[#d4622b] text-xs font-bold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4622b] animate-pulse" />
                    About Us
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight leading-[1.04]"
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

              {/* Right Column (TOP RIGHT): Compact 3D Card Carousel */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
                <ThreeDCardCarousel />
              </div>
            </div>

            {/* Bottom Row Grid: Story Description & CTAs on Left, Metrics on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border-t border-gray-100 pt-8 sm:pt-10">
              <div className="lg:col-span-7">
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed text-justify">
                  Established in 2019, Onward Workspaces is a Delhi-based coworking company built to eliminate the rigidities of conventional commercial leases. We recognized that thriving enterprises and fast-growing teams require more than just square footage — they need intelligent environments that nurture company culture, elevate team productivity, and accommodate hyper-fast scaling.
                </p>
                <p className="mt-4 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed text-justify">
                  Today, Onward manages premium workspace hubs across Delhi, Noida, and Gurugram, hosting hundreds of thriving businesses ranging from venture-backed startups and unicorns to established multinational corporations.
                </p>

                {/* Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <MagneticButton
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8501f] text-white px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <span>Schedule a Visit</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </MagneticButton>
                  <Link
                    href="/locations/delhi"
                    className="text-[#1a1a2e] font-bold text-xs sm:text-sm hover:text-[#d4622b] transition-colors inline-flex items-center gap-1.5 py-2"
                  >
                    Explore Locations &rarr;
                  </Link>
                </div>
              </div>

              {/* Right Side: Key Metric Badges */}
              <div className="lg:col-span-5 grid grid-cols-3 gap-3 bg-[#faf8f5] p-5 sm:p-6 rounded-2xl border border-[#e8dfd2]">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-[#d4622b]">11+</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase mt-1 block">NCR Centres</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-[#1a1a2e]">75 Days</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase mt-1 block">Turnkey Build</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-[#d4622b]">425+</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase mt-1 block">Enterprises</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. FLOWING WELCOME GALLERY: MULTI-COLUMN STREAM WITH ENTRY/EXIT FADE
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={welcomeRef}
          className="relative min-h-[170vh] sm:min-h-[200vh] bg-[#faf8f5] py-20 overflow-hidden border-b border-gray-200/80"
        >
          {/* Top & Bottom Smooth Gradient Fade Masks */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#faf8f5] via-[#faf8f5]/80 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/80 to-transparent pointer-events-none z-20" />

          {/* Sticky Center Welcome Card */}
          <div className="sticky top-28 sm:top-36 z-30 max-w-4xl mx-auto px-4 text-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/95 backdrop-blur-md border border-[#e8dfd2] rounded-3xl p-6 sm:p-10 shadow-2xl inline-block max-w-2xl pointer-events-auto"
            >
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b] block mb-2">
                Our Community &amp; Spaces
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1a1a2e] tracking-tight leading-tight">
                Whatever brought you to this page, <span className="text-[#d4622b]">welcome.</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
                Discover the collaborative spaces, community events, and daily moments where hundreds of companies build their future.
              </p>

              {/* Scroll Down Arrow */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const nextSection = document.getElementById("values-section");
                    nextSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-label="Scroll down to core values"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 bg-white hover:border-[#d4622b] hover:bg-[#d4622b] text-[#1a1a2e] hover:text-white shadow-sm flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Flowing 3-Column Parallax Photo Tracks with Entry/Exit Fade Mask */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 h-full">
              
              {/* Column 1: Left Stream */}
              <motion.div style={{ y: colLeftY }} className="flex flex-col gap-6 sm:gap-8">
                {galleryColLeft.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/90 shadow-lg bg-white ${img.aspect} group`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                ))}
              </motion.div>

              {/* Column 2: Center Stream (Visible on Desktop) */}
              <motion.div style={{ y: colCenterY }} className="hidden lg:flex flex-col gap-6 sm:gap-8 pt-20">
                {galleryColCenter.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/90 shadow-lg bg-white ${img.aspect} group`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                ))}
              </motion.div>

              {/* Column 3: Right Stream */}
              <motion.div style={{ y: colRightY }} className="flex flex-col gap-6 sm:gap-8 pt-10 sm:pt-14">
                {galleryColRight.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/90 shadow-lg bg-white ${img.aspect} group`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. CORE VALUES: NORMAL EQUAL-HEIGHT CARDS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="values-section" className="py-20 sm:py-28 bg-[#faf8f5] border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">
                Our Guiding Principles
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1a1a2e] tracking-tight mt-1">
                Our Core Values
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600">
                How our founding ethos and standards shape daily building operations and enterprise partnerships.
              </p>
            </div>

            {/* Core Values Normal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {valuesList.map((val, idx) => (
                <div
                  key={val.id}
                  className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-[#d4622b]/40 hover:-translate-y-1 transition-all duration-300 group h-full"
                >
                  <div>
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-gray-100 flex items-center justify-center text-[#d4622b] group-hover:scale-110 transition-transform duration-300">
                      {val.icon}
                    </div>

                    {/* Header Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight mt-5 mb-3 text-[#1a1a2e]">
                      <span>{val.title1}</span>{" "}
                      <span className="text-[#d4622b] block sm:inline">{val.title2}</span>
                    </h3>

                    {/* Full Description text */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                      {val.desc}
                    </p>
                  </div>

                  {/* Bottom Index Badge */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#d4622b] transition-colors">
                      Pillar 0{idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#d4622b]/40 group-hover:bg-[#d4622b] transition-colors" />
                  </div>
                </div>
              ))}
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
              {teamMembers.map((member) => {
                const isExpanded = expandedTeamMember === member.name;
                return (
                  <div
                    key={member.name}
                    className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Photo Container with Expand/Collapse Icon */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                        <Image
                          src={member.img}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Top-Right Expand/Collapse Button */}
                        <button
                          type="button"
                          onClick={() => setExpandedTeamMember(isExpanded ? null : member.name)}
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1a1a2e]/90 hover:bg-[#d4622b] text-white flex items-center justify-center shadow-lg transition-colors z-20"
                          aria-label={isExpanded ? `Close ${member.name} bio` : `Expand ${member.name} bio`}
                        >
                          <span className="text-lg font-bold leading-none">{isExpanded ? "✕" : "+"}</span>
                        </button>

                        {/* Bottom Tag */}
                        <div className="absolute bottom-3 left-4 right-4 z-10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Name & Socials */}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">
                              {member.name}
                            </h3>
                            <p className="text-xs font-semibold text-gray-500 mt-0.5">
                              {member.role}
                            </p>
                          </div>

                          {/* Social Icons */}
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`mailto:${member.email}`}
                              aria-label={`Email ${member.name}`}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#d4622b] text-gray-700 hover:text-white flex items-center justify-center transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </a>
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`LinkedIn of ${member.name}`}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#d4622b] text-gray-700 hover:text-white flex items-center justify-center transition-colors"
                            >
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                              </svg>
                            </a>
                          </div>
                        </div>

                        {/* Expandable Bio Drawer */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="mt-4 pt-3 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed">
                                {member.bio}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
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
