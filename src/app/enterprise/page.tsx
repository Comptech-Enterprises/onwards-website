"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

/* ━━━ ANIMATION HELPERS ━━━ */
const ease = [0.22, 0.8, 0.2, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
};

function CountUp({ target, duration = 1.5, prefix = "", suffix = "" }: { target: number; duration?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

/* ━━━ DATA ━━━ */

const problems = [
  {
    id: "01",
    step: "01 / 04",
    title: "Rigid commitments",
    headline: "Your lease doesn't move. Your business does.",
    desc: "Lease cycles run for years. Headcount shifts, teams relocate and plans change — but the lease stays the same. You pay for 80 seats whether you need 50 or 105.",
  },
  {
    id: "02",
    step: "02 / 04",
    title: "Operational burden",
    headline: "Eight side jobs. None of them is your business.",
    desc: "Fit-outs, vendors and facilities need constant management. Your team ends up running an office instead of the business.",
  },
  {
    id: "03",
    step: "03 / 04",
    title: "Heavy upfront capital",
    headline: "Before day one comes all the spend.",
    desc: "Approvals, contractors and timelines come before day one, and so does the spend. Setup is slow, complex and expensive.",
  },
  {
    id: "04",
    step: "04 / 04",
    title: "Ongoing financial risk",
    headline: "Five invoices. One liability that never ends.",
    desc: "Rent, maintenance, insurance and utilities arrive as separate payments. The liability stays with you for the full term, even when your needs change.",
  },
];

const compareRows = [
  { label: "Term", trad: "Multi-year lock-in", onward: "Flexible terms that scale with your team" },
  { label: "Operations", trad: "You manage vendors and facilities", onward: "Our on-site team runs operations" },
  { label: "Setup", trad: "Your capital, your contractors", onward: "Tailor-made fit-out delivered by Onward" },
  { label: "Billing", trad: "Rent, CAM, insurance and utilities billed separately", onward: "One cheque: one all-inclusive monthly invoice" },
];

const benefits = [
  {
    title: "Flexibility & agility",
    desc: "Terms that scale with your team. Add or release seats as plans, markets and headcount change.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 14h26M26 8l6 6-6 6M34 26H8M14 20l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Streamlined operations",
    desc: "Maintenance, housekeeping and admin support are run by our on-site team. Your people stay on the work, not the office.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 10h6M8 20h6M8 30h6M20 10h12M20 20h12M20 30h12" />
      </svg>
    ),
  },
  {
    title: "Cost-effectiveness",
    desc: "One all-inclusive invoice covers rent, CAM, insurance and operating costs. No separate cheques, no fit-out capex.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="14" /><path d="M14 13h12M14 18h12M16 13c6 0 7 7 0 7h-1l8 8" />
      </svg>
    ),
  },
  {
    title: "Enhanced productivity",
    desc: "Tailor-made fit-outs and ready-to-use floors mean your team moves into a space built to work in.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4L9 22h10l-2 14 14-19H21z" />
      </svg>
    ),
  },
  {
    title: "Brand image",
    desc: "Meet clients, investors and partners in well-designed offices at business addresses across Delhi NCR.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 34V12l12-6 12 6v22M4 34h32M15 34V24h10v10M15 15h2M23 15h2" />
      </svg>
    ),
  },
  {
    title: "Networking",
    desc: "Sit alongside other growing companies. Introductions, partnerships and referrals come with the address.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="9" r="5" /><circle cx="9" cy="30" r="5" /><circle cx="31" cy="30" r="5" />
        <path d="M17 13l-5 12M23 13l5 12M14 31h12" />
      </svg>
    ),
  },
];

const operationalTasks = [
  "Vendor negotiations", "Contractor snagging", "Facility repairs", "Housekeeping",
  "Visitor management", "Furniture sourcing", "Utility billing", "Compliance renewals",
];

const hubServices = [
  { label: "Managed Offices", icon: "M4 6h16v12H4z M8 6V4h8v2", angle: 0 },
  { label: "Coworking Spaces", icon: "M12 4v16 M4 12h16 M6 6l12 12 M18 6L6 18", angle: 60 },
  { label: "Custom Fit-outs", icon: "M3 21h18 M5 21V7l7-4 7 4v14 M9 21v-6h6v6", angle: 120 },
  { label: "Facility Management", icon: "M12 2L2 7v13h20V7L12 2z M8 12h8 M8 16h8", angle: 180 },
  { label: "Flexible Terms", icon: "M6 14h26M26 8l6 6-6 6M34 26H8M14 20l-6 6 6 6", angle: 240 },
  { label: "Single Billing", icon: "M9 5H2v14h20V5h-7 M9 5V3h6v2 M12 10v4 M10 12h4", angle: 300 },
];

/* ━━━ INTERACTIVE SEAT GRID ━━━ */
function SeatGrid() {
  const LEASE = 80;
  const [team, setTeam] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !animated) {
      setAnimated(true);
      setTeam(80);
      const timer = setTimeout(() => setTeam(50), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, animated]);

  const gap = team <= LEASE ? LEASE - team : team - LEASE;
  const gapLabel = team <= LEASE ? "empty seats, still paid for" : "seats short, need a second lease";

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between gap-4 mb-3">
        <label className="text-sm font-bold text-[#1a1a2e]">Your team</label>
        <span className="text-lg font-bold text-[#d4622b] tabular-nums">{team} people</span>
      </div>
      <input
        type="range" min={20} max={110} step={5} value={team}
        onChange={(e) => setTeam(+e.target.value)}
        className="w-full accent-[#d4622b] h-7 cursor-pointer"
      />
      <div className="flex flex-wrap gap-2 mt-3">
        {[{ label: "Team shrinks to 50", val: 50 }, { label: "As planned, 80", val: 80 }, { label: "Team grows to 105", val: 105 }].map((p) => (
          <button
            key={p.val}
            onClick={() => setTeam(p.val)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              team === p.val
                ? "bg-[#d4622b] border-[#d4622b] text-white"
                : "border-gray-300 text-gray-500 hover:border-[#d4622b]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-5 mb-3">
        <span className="font-bold text-[#1a1a2e]">Your lease:</span> 80 seats, fixed
      </p>
      <div className="grid grid-cols-16 gap-1">
        {Array.from({ length: LEASE }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-[3px] transition-all duration-300 ${
              i < team
                ? "bg-[#d4622b] border border-[#d4622b]"
                : "border border-dashed border-gray-300"
            }`}
          />
        ))}
      </div>
      {team > LEASE && (
        <div className="grid grid-cols-16 gap-1 mt-2">
          {Array.from({ length: Math.min(30, team - LEASE) }).map((_, i) => (
            <div key={i} className="aspect-square rounded-[3px] border border-dashed border-[#d4622b] animate-pulse" />
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-400">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#d4622b]" />In use</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm border border-dashed border-gray-300" />Empty, still paid</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm border border-dashed border-[#d4622b]" />Doesn&apos;t fit</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="border border-gray-200 rounded-xl p-4">
          <span className="block text-3xl font-bold tabular-nums text-[#1a1a2e]">80</span>
          <span className="text-xs text-gray-400 mt-1 block">seats on lease</span>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <span className="block text-3xl font-bold text-[#d4622b] tabular-nums">{gap}</span>
          <span className="text-xs text-gray-400 mt-1 block">{gapLabel}</span>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <span className="block text-3xl font-bold tabular-nums text-[#1a1a2e]">{team}</span>
          <span className="text-xs text-gray-400 mt-1 block">billed with Onward</span>
        </div>
      </div>
    </div>
  );
}

/* ━━━ PROBLEM STEP VISUAL ━━━ */
function ProblemVisual({ idx }: { idx: number }) {
  if (idx === 0) return <SeatGrid />;

  if (idx === 1) {
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Work that lands on your team</p>
        <div className="grid grid-cols-2 gap-2.5">
          {operationalTasks.map((task, i) => (
            <motion.div
              key={task}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl font-bold text-sm text-[#1a1a2e] hover:border-[#d4622b] transition-colors"
            >
              <span className="w-4 h-4 rounded-full border-2 border-[#d4622b] shrink-0" />
              {task}
            </motion.div>
          ))}
        </div>
        <div className="flex items-baseline gap-4 mt-5 flex-wrap">
          <span className="text-5xl sm:text-6xl font-bold text-[#d4622b]">8</span>
          <span className="text-gray-500">side jobs, none of them your business.</span>
        </div>
      </div>
    );
  }

  if (idx === 2) {
    const steps = [
      { label: "Approvals", sub: "Landlord sign-offs", cost: "Deposits" },
      { label: "Contractors", sub: "Quotes, timelines", cost: "Payments" },
      { label: "Fit-out", sub: "Weeks on site", cost: "Capex" },
      { label: "Day one", sub: "Team moves in", highlight: true },
    ];
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">The road to day one</p>
        <div className="relative">
          <div className="hidden sm:block absolute left-[12.5%] right-[12.5%] top-2 h-1 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-[#d4622b] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: [0.22, 0.8, 0.2, 1] }}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.3, duration: 0.5 }}
                className={`relative border rounded-xl p-4 text-sm font-bold ${
                  s.highlight
                    ? "bg-[#d4622b] border-[#d4622b] text-white"
                    : "border-gray-200 text-[#1a1a2e]"
                }`}
              >
                <div className="hidden sm:block absolute left-1/2 -top-7 w-4 h-4 -ml-2 rounded-full bg-[#d4622b]" />
                {s.label}
                <span className="block font-normal text-xs mt-1 opacity-60">{s.sub}</span>
                {s.cost && <span className="block text-xs text-[#d4622b] font-bold mt-2">{s.cost}</span>}
              </motion.div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400">Everything before day one is spend with nothing to show.</p>
      </div>
    );
  }

  const bills = ["Rent", "CAM", "Insurance", "Operating costs", "Maintenance"];
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">What arrives separately</p>
      <div className="flex flex-wrap gap-2.5">
        {bills.map((b, i) => (
          <motion.div
            key={b}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="border border-dashed border-gray-300 rounded-xl px-4 py-3 font-bold text-sm text-[#1a1a2e]"
          >
            {b}
            <span className="block font-normal text-xs text-gray-400 mt-0.5">{i < 3 ? "Fixed" : "Variable"}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex h-4 rounded-full overflow-hidden border border-gray-200">
          <motion.div
            className="bg-[#d4622b]"
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
          />
          <div className="flex-1 border-l-2 border-dashed border-gray-300" />
        </div>
        <div className="flex mt-2 text-xs text-gray-400 gap-3">
          <span className="w-[40%] text-[#d4622b]">Needs change here</span>
          <span>Liability stays until lease ends</span>
        </div>
      </div>
    </div>
  );
}

/* ━━━ HUB SECTION ━━━ */
function ServicesHub() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">Everything under one roof</span>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
              One partner. Six capabilities.
            </h2>
            <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
              Everything a traditional office requires from dozens of vendors, Onward delivers as one.
            </p>
          </div>
        </Reveal>

        <div ref={ref} className="relative mt-16 sm:mt-24">
          {/* Desktop: radial layout */}
          <div className="hidden lg:block relative mx-auto" style={{ width: 700, height: 700 }}>
            {/* Center logo */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-[#faf8f5] border-2 border-gray-200 flex items-center justify-center z-10 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease }}
            >
              <Image
                src="/onward-logo-dark.webp"
                alt="Onward"
                width={120}
                height={30}
                className="w-22 h-auto object-contain"
              />
            </motion.div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 700">
              {hubServices.map((s, i) => {
                const rad = (s.angle - 90) * (Math.PI / 180);
                const x = 350 + 230 * Math.cos(rad);
                const y = 350 + 230 * Math.sin(rad);
                return (
                  <motion.path
                    key={i}
                    d={`M350,350 L${x},${y}`}
                    stroke="#e5e7eb"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Service nodes */}
            {hubServices.map((s, i) => {
              const rad = (s.angle - 90) * (Math.PI / 180);
              const x = 350 + 230 * Math.cos(rad);
              const y = 350 + 230 * Math.sin(rad);
              return (
                <motion.div
                  key={s.label}
                  className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 group cursor-default"
                  style={{ left: x, top: y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#faf8f5] border-2 border-gray-200 flex items-center justify-center group-hover:border-[#d4622b] group-hover:bg-white transition-all shadow-sm">
                    <svg className="w-7 h-7 text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#1a1a2e] text-center whitespace-nowrap">{s.label}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile/tablet: grid layout */}
          <div className="lg:hidden">
            <motion.div
              className="flex items-center justify-center mb-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease }}
            >
              <div className="w-28 h-28 rounded-full bg-[#faf8f5] border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <Image
                  src="/onward-logo-dark.webp"
                  alt="Onward"
                  width={100}
                  height={25}
                  className="w-20 h-auto object-contain"
                />
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {hubServices.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={scaleIn}
                  custom={i}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-200 bg-[#faf8f5] hover:border-[#d4622b] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#d4622b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#1a1a2e] text-center">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━ COMPARE SECTION ━━━ */
function CompareSection() {
  const [mode, setMode] = useState<"trad" | "onward">("trad");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [autoSwitched, setAutoSwitched] = useState(false);

  useEffect(() => {
    if (isInView && !autoSwitched) {
      const timer = setTimeout(() => {
        setMode("onward");
        setAutoSwitched(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [isInView, autoSwitched]);

  const isOnward = mode === "onward";

  return (
    <section id="compare" className="py-20 sm:py-28 lg:py-36 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">The answer</span>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
              One cheque solution.
            </h2>
            <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
              A traditional office means coordinating dozens of parties. Onward brings all of it under one agreement.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex border-2 border-[#1a1a2e] rounded-full p-1 gap-1">
            <motion.button
              onClick={() => setMode("trad")}
              className={`px-5 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
                !isOnward ? "bg-[#1a1a2e] text-white" : "text-[#1a1a2e]"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              Traditional lease
            </motion.button>
            <motion.button
              onClick={() => { setMode("onward"); setAutoSwitched(true); }}
              className={`px-5 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
                isOnward ? "bg-[#d4622b] text-white" : "text-[#1a1a2e]"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              With Onward
            </motion.button>
          </div>
        </motion.div>

        {/* KPI flip cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={scaleIn} custom={0} className="border-2 border-gray-200 rounded-3xl p-8 sm:p-10 bg-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Parties you coordinate</h3>
            <div className="relative h-[1.1em] overflow-hidden text-6xl sm:text-8xl font-black mt-4">
              <motion.span
                className="absolute left-0 text-[#1a1a2e]"
                animate={{ y: isOnward ? "-100%" : "0%", opacity: isOnward ? 0 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
              >
                50-60
              </motion.span>
              <motion.span
                className="absolute left-0 text-[#d4622b]"
                animate={{ y: isOnward ? "0%" : "100%", opacity: isOnward ? 1 : 0 }}
                transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
              >
                1
              </motion.span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={isOnward ? "onward-p" : "trad-p"}
                className="mt-4 text-sm text-gray-500 min-h-[3em] leading-relaxed"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {isOnward
                  ? "Onward. One agreement and one point of contact."
                  : "Landlord, vendors and your own site staff, all reporting to you."}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          <motion.div variants={scaleIn} custom={1} className="border-2 border-gray-200 rounded-3xl p-8 sm:p-10 bg-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Cheques each month</h3>
            <div className="relative h-[1.1em] overflow-hidden text-6xl sm:text-8xl font-black mt-4">
              <motion.span
                className="absolute left-0 text-[#1a1a2e]"
                animate={{ y: isOnward ? "-100%" : "0%", opacity: isOnward ? 0 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
              >
                5
              </motion.span>
              <motion.span
                className="absolute left-0 text-[#d4622b]"
                animate={{ y: isOnward ? "0%" : "100%", opacity: isOnward ? 1 : 0 }}
                transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
              >
                1
              </motion.span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={isOnward ? "onward-c" : "trad-c"}
                className="mt-4 text-sm text-gray-500 min-h-[3em] leading-relaxed"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {isOnward
                  ? "One cheque covers everything, on a single all-inclusive monthly invoice."
                  : "Rent, CAM, insurance, operating costs and fit-out, each billed on its own."}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          className="border-2 border-gray-200 rounded-3xl overflow-hidden mt-5 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="hidden sm:grid grid-cols-[140px_1fr_1fr] bg-gray-50/80">
            <div className="p-5" />
            <div className="p-5 text-xs font-bold uppercase tracking-wider text-gray-400">Traditional lease</div>
            <div className="p-5 text-xs font-bold uppercase tracking-wider text-gray-400">With Onward</div>
          </div>
          {compareRows.map((row, i) => (
            <motion.div
              key={row.label}
              variants={fadeUp}
              custom={i}
              className="grid grid-cols-1 sm:grid-cols-[140px_1fr_1fr] border-t border-gray-200"
            >
              <div className="p-5 text-xs font-bold uppercase tracking-wider text-gray-400">{row.label}</div>
              <div className={`p-5 text-sm transition-all duration-400 ${!isOnward ? "bg-gray-50 font-bold" : "opacity-50"}`}>
                <span className="sm:hidden font-bold text-gray-400 text-xs">Traditional: </span>{row.trad}
              </div>
              <div className={`p-5 text-sm transition-all duration-400 ${isOnward ? "bg-[#d4622b] text-white font-bold" : "opacity-50"}`}>
                <span className="sm:hidden font-bold text-gray-400 text-xs">Onward: </span>{row.onward}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ━━━ BIG STATS ━━━ */
function StatsStrip() {
  return (
    <section className="py-16 sm:py-20 bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { value: 14, suffix: "+", label: "Centres across Delhi NCR" },
            { value: 5000, suffix: "+", label: "Seats under management" },
            { value: 200, suffix: "+", label: "Enterprise clients served" },
            { value: 98, suffix: "%", label: "Client retention rate" },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i} className="text-center">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#d4622b]">
                <CountUp target={stat.value} suffix={stat.suffix} duration={1.5} />
              </span>
              <p className="mt-2 text-sm text-white/60 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ━━━ PAGE ━━━ */
export default function EnterprisePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroImgScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20">
        {/* ━━━ HERO BANNER ━━━ */}
        <section ref={heroRef} className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[560px] flex items-center py-16 sm:py-20 lg:py-24 overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: heroImgScale }}>
            <Image
              src="/images/redesigned/about-us/crafting-workspaces-1st-section/1.webp"
              alt="Onward Enterprise workspace"
              fill
              priority
              className="object-cover object-[center_30%]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.nav
              aria-label="Breadcrumb"
              className="mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ol className="flex items-center gap-2 text-[11px] sm:text-xs text-white/70 font-medium uppercase tracking-wider flex-wrap">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-white font-semibold">Enterprise</li>
              </ol>
            </motion.nav>

            <motion.h1
              className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.8, 0.2, 1] }}
            >
              Run your business.{" "}
              <span className="text-[#d4622b]">We run the office.</span>
            </motion.h1>
            <motion.p
              className="mt-5 text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Fully managed offices for growing companies across Delhi NCR. One agreement, one cheque, built around your team.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8531f] text-white text-sm font-bold px-7 py-4 rounded-full transition-colors cursor-pointer shadow-md"
              >
                Get in touch <span>&rarr;</span>
              </button>
              <a
                href="#compare"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:border-white text-sm font-bold px-7 py-4 rounded-full transition-colors"
              >
                See how it compares
              </a>
            </motion.div>
          </div>
        </section>

        {/* ━━━ GLANCE STRIP ━━━ */}
        <section className="bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 sm:py-12">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="text-center sm:text-left" variants={fadeUp} custom={0}>
                <span className="text-5xl sm:text-6xl font-black text-[#d4622b] tracking-tight leading-none">
                  <CountUp target={14} duration={1.2} />
                </span>
                <p className="mt-1 text-gray-500 text-sm">centres across Delhi NCR</p>
              </motion.div>
              {["Tailor-made fit-outs, delivered by us", "Flexible terms that scale with your team", "One cheque, one all-inclusive invoice"].map((item, i) => (
                <motion.div key={item} variants={fadeUp} custom={i + 1} className="relative pl-5 py-2 border-l-2 border-[#d4622b] text-sm font-bold text-[#1a1a2e]">
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ━━━ THE PROBLEM — Numbered vertical steps ━━━ */}
        <section id="problems" className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-white via-[#fff9f5] to-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
                <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">The problem</span>
                <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
                  Why traditional offices hold enterprises back
                </h2>
                <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Four things a conventional corporate lease asks of you.
                </p>
              </div>
            </Reveal>

            <div className="space-y-20 sm:space-y-32">
              {problems.map((p, idx) => (
                <motion.div
                  key={p.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
                    idx % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease }}
                >
                  {/* Text side */}
                  <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="text-[#d4622b] text-xs font-bold tracking-widest uppercase">{p.step}</span>
                    <h3 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-black text-[#1a1a2e] tracking-tight leading-tight">
                      {p.headline}
                    </h3>
                    <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
                      {p.desc}
                    </p>
                  </div>

                  {/* Visual side */}
                  <div className={`bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <ProblemVisual idx={idx} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ HUB — Onward logo centre, services radial ━━━ */}
        <ServicesHub />

        {/* ━━━ BIG STATS ━━━ */}
        <StatsStrip />

        {/* ━━━ COMPARE ━━━ */}
        <CompareSection />

        {/* ━━━ BENEFITS ━━━ */}
        <section id="benefits" className="py-20 sm:py-28 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">The payoff</span>
                <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
                  What changes with Onward
                </h2>
                <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Six things that change when your office becomes one agreement and one cheque.
                </p>
              </div>
            </Reveal>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14 sm:mt-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-[#faf8f5] border border-gray-200 rounded-3xl p-7 flex flex-col gap-4 hover:border-[#d4622b]/40 transition-colors duration-300 h-full group"
                >
                  <motion.span
                    className="text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                  >
                    {b.icon}
                  </motion.span>
                  <h3 className="text-xl font-bold text-[#1a1a2e] tracking-tight">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ━━━ CONTACT ━━━ */}
        <section id="contact" className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-tl from-[#f5ddd0] via-[#fff7f2] to-white text-[#1a1a2e] overflow-hidden">
          <motion.div
            className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">Enterprise enquiries</span>
                <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
                  Get in touch.
                </h2>
                <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                  Tell us your team size and preferred location. We will match you to the right workspace within 24 hours.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={1} className="flex flex-wrap gap-3 mt-8">
                <motion.a
                  href="mailto:info@onwardworkspaces.com?subject=Enterprise%20enquiry"
                  className="inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8531f] text-white text-sm font-bold px-7 py-4 rounded-full transition-colors shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Email us
                </motion.a>
                <motion.a
                  href="tel:+919910668152"
                  className="inline-flex items-center gap-2 border-2 border-[#1a1a2e] text-[#1a1a2e] hover:border-[#d4622b] hover:text-[#d4622b] text-sm font-bold px-7 py-4 rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Call us
                </motion.a>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} custom={2} className="space-y-3">
              <motion.div
                className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 rounded-2xl px-6 py-5 bg-white/60"
                whileHover={{ x: 4, borderColor: "#d4622b", transition: { duration: 0.2 } }}
              >
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">Email</span>
                  <span className="block text-lg font-bold text-[#1a1a2e] break-all">info@onwardworkspaces.com</span>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 rounded-2xl px-6 py-5 bg-white/60"
                whileHover={{ x: 4, borderColor: "#d4622b", transition: { duration: 0.2 } }}
              >
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">Phone</span>
                  <span className="block text-lg font-bold text-[#1a1a2e]">+91 99106 68152</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
