"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactSection from "@/components/ContactSection";

/* ━━━ DATA ━━━ */

const problems = [
  {
    id: "01",
    title: "Rigid commitments",
    desc: "Lease cycles run for years. Your business moves faster. Headcount shifts, teams relocate and plans change, but the lease stays the same.",
  },
  {
    id: "02",
    title: "Operational burden",
    desc: "Fit-outs, vendors and facilities need constant management. Your team ends up running an office instead of the business.",
  },
  {
    id: "03",
    title: "Heavy upfront capital",
    desc: "Approvals, contractors and timelines come before day one, and so does the spend. Setup is slow, complex and expensive.",
  },
  {
    id: "04",
    title: "Ongoing financial risk",
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
        <span className="font-bold text-[#1a1a2e]">Your lease:</span> 80 seats, fixed · Each square = one seat
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
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#d4622b]" />Seat in use</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm border border-dashed border-gray-300" />Empty, still paid for</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm border border-dashed border-[#d4622b]" />Does not fit your lease</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        <div className="border border-gray-200 rounded-xl p-4">
          <span className="block text-3xl font-bold tabular-nums text-[#1a1a2e]">80</span>
          <span className="text-xs text-gray-400 mt-1 block">seats you pay for on a lease</span>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <span className="block text-3xl font-bold text-[#d4622b] tabular-nums">{gap}</span>
          <span className="text-xs text-gray-400 mt-1 block">{gapLabel}</span>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <span className="block text-3xl font-bold tabular-nums text-[#1a1a2e]">{team}</span>
          <span className="text-xs text-gray-400 mt-1 block">seats billed with Onward</span>
        </div>
      </div>
    </div>
  );
}

/* ━━━ PROBLEM PANEL CONTENT ━━━ */
function ProblemPanel({ idx }: { idx: number }) {
  const problem = problems[idx];

  if (idx === 0) {
    return (
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] tracking-tight">{problem.title}</h3>
        <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">{problem.desc}</p>
        <div className="mt-6 pt-5 border-t border-gray-200">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Try it: change your team size</p>
          <SeatGrid />
        </div>
      </div>
    );
  }

  if (idx === 1) {
    return (
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] tracking-tight">{problem.title}</h3>
        <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">{problem.desc}</p>
        <div className="mt-6 pt-5 border-t border-gray-200">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Work that lands on your team</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {operationalTasks.map((task, i) => (
              <motion.div
                key={task}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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
            <span className="text-gray-500">side jobs, and none of them is your business.</span>
          </div>
        </div>
      </div>
    );
  }

  if (idx === 2) {
    const steps = [
      { label: "Approvals", sub: "Landlord and authority sign-offs", cost: "Spend: deposits" },
      { label: "Contractors", sub: "Quotes, contracts, timelines", cost: "Spend: contractor payments" },
      { label: "Fit-out build", sub: "Weeks of work on site", cost: "Spend: fit-out capex" },
      { label: "Day one", sub: "Your team finally moves in", highlight: true },
    ];
    return (
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] tracking-tight">{problem.title}</h3>
        <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">{problem.desc}</p>
        <div className="mt-6 pt-5 border-t border-gray-200">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">The road to day one</p>
          <div className="relative">
            <div className="hidden sm:block absolute left-[12.5%] right-[12.5%] top-2 h-1 bg-gray-200 rounded-full">
              <motion.div
                className="h-full bg-[#d4622b] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: [0.22, 0.8, 0.2, 1] }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-8 sm:pt-8">
              {steps.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.3, duration: 0.5 }}
                  className={`relative border rounded-xl p-4 text-sm font-bold ${
                    s.highlight
                      ? "bg-[#d4622b] border-[#d4622b] text-white"
                      : "border-gray-200 text-[#1a1a2e]"
                  }`}
                >
                  <div className="hidden sm:block absolute left-1/2 -top-7 w-4 h-4 -ml-2 rounded-full bg-[#d4622b] border-2 border-[#d4622b]" />
                  {s.label}
                  <span className="block font-normal text-xs mt-1 opacity-60">{s.sub}</span>
                  {s.cost && <span className="block text-xs text-[#d4622b] font-bold mt-2">{s.cost}</span>}
                </motion.div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400">Everything before day one is spend and effort with nothing to show for it yet.</p>
        </div>
      </div>
    );
  }

  const bills = ["Rent", "CAM", "Insurance", "Operating costs", "Maintenance"];
  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] tracking-tight">{problem.title}</h3>
      <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">{problem.desc}</p>
      <div className="mt-6 pt-5 border-t border-gray-200">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">What arrives separately</p>
        <div className="flex flex-wrap gap-2.5">
          {bills.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
              animate={{ width: "40%" }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
            />
            <div className="flex-1 border-l-2 border-dashed border-gray-300" />
          </div>
          <div className="flex mt-2 text-xs text-gray-400 gap-3">
            <span className="w-[40%] text-[#d4622b]">Your needs change here</span>
            <span>You still carry the liability until the lease ends</span>
          </div>
        </div>
      </div>
    </div>
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
    <section id="compare" className="py-16 sm:py-24 lg:py-28 bg-[#faf8f5] border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <Reveal>
          <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">The answer</span>
          <h2 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
            One cheque solution.
          </h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
            One contract. One invoice. A traditional office means coordinating the landlord, a leasing agent, contractors, furniture suppliers and facility teams. Onward brings all of it under one agreement.
          </p>
        </Reveal>

        <div className="inline-flex border-2 border-[#1a1a2e] rounded-full p-1 gap-1 mt-6">
          <button
            onClick={() => setMode("trad")}
            className={`px-5 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
              !isOnward ? "bg-[#1a1a2e] text-white" : "text-[#1a1a2e]"
            }`}
          >
            Traditional lease
          </button>
          <button
            onClick={() => { setMode("onward"); setAutoSwitched(true); }}
            className={`px-5 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
              isOnward ? "bg-[#d4622b] text-white" : "text-[#1a1a2e]"
            }`}
          >
            With Onward
          </button>
        </div>

        {/* KPI flip cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="border-2 border-gray-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Parties you coordinate</h3>
            <div className="relative h-[1.1em] overflow-hidden text-5xl sm:text-7xl font-bold mt-4">
              <span className={`absolute left-0 transition-all duration-700 ${isOnward ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"} text-[#1a1a2e]`}>
                50-60
              </span>
              <span className={`absolute left-0 transition-all duration-700 ${isOnward ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} text-[#d4622b]`}>
                1
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500 min-h-[3em]">
              {isOnward
                ? "Onward. One agreement and one point of contact."
                : "Landlord, vendors and your own site staff, all reporting to you."}
            </p>
          </div>
          <div className="border-2 border-gray-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Cheques you write each month</h3>
            <div className="relative h-[1.1em] overflow-hidden text-5xl sm:text-7xl font-bold mt-4">
              <span className={`absolute left-0 transition-all duration-700 ${isOnward ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"} text-[#1a1a2e]`}>
                5
              </span>
              <span className={`absolute left-0 transition-all duration-700 ${isOnward ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} text-[#d4622b]`}>
                1
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500 min-h-[3em]">
              {isOnward
                ? "One cheque covers everything, on a single all-inclusive monthly invoice."
                : "Rent, CAM, insurance, operating costs and fit-out, each billed on its own."}
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="border-2 border-gray-200 rounded-2xl overflow-hidden mt-4">
          <div className="hidden sm:grid grid-cols-[140px_1fr_1fr] bg-gray-50">
            <div className="p-4" />
            <div className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400">Traditional lease</div>
            <div className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400">With Onward</div>
          </div>
          {compareRows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[140px_1fr_1fr] border-t border-gray-200">
              <div className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400">{row.label}</div>
              <div className={`p-4 text-sm transition-all duration-400 ${!isOnward ? "bg-gray-50 font-bold" : "opacity-50"}`}>
                <span className="sm:hidden font-bold text-gray-400 text-xs">Traditional: </span>{row.trad}
              </div>
              <div className={`p-4 text-sm transition-all duration-400 ${isOnward ? "bg-[#d4622b] text-white font-bold" : "opacity-50"}`}>
                <span className="sm:hidden font-bold text-gray-400 text-xs">Onward: </span>{row.onward}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━ PAGE ━━━ */
export default function EnterprisePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [userTouched, setUserTouched] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const isTabsInView = useInView(tabsRef, { amount: 0.3 });

  useEffect(() => {
    if (!isTabsInView || userTouched) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % problems.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [isTabsInView, userTouched]);

  const handleTabClick = useCallback((idx: number) => {
    setUserTouched(true);
    setActiveTab(idx);
  }, []);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20">
        {/* ━━━ HERO BANNER ━━━ */}
        <section className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[520px] flex items-center py-14 sm:py-18 lg:py-22 overflow-hidden">
          <Image
            src="/images/redesigned/about-us/crafting-workspaces-1st-section/1.webp"
            alt="Onward Enterprise workspace"
            fill
            priority
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex items-center gap-2 text-[11px] sm:text-xs text-white/70 font-medium uppercase tracking-wider flex-wrap">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-white font-semibold">Enterprise</li>
              </ol>
            </nav>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Run your business.{" "}
              <span className="text-[#d4622b]">We run the office.</span>
            </h1>
            <p className="mt-4 text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
              Fully managed offices for growing companies across Delhi NCR. One agreement, one cheque, built around your team.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8531f] text-white text-sm font-bold px-6 py-3.5 rounded-full transition-colors cursor-pointer shadow-md"
              >
                Get in touch <span>&rarr;</span>
              </button>
              <a
                href="#compare"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:border-white hover:text-white text-sm font-bold px-6 py-3.5 rounded-full transition-colors"
              >
                See how it compares
              </a>
            </div>
          </div>
        </section>

        {/* ━━━ GLANCE STRIP ━━━ */}
        <section className="bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 items-center">
              <div className="text-center sm:text-left">
                <span className="text-5xl sm:text-6xl font-bold text-[#d4622b] tracking-tight leading-none">14</span>
                <p className="mt-1 text-gray-500 text-sm">centres across Delhi NCR</p>
              </div>
              {["Tailor-made fit-outs, delivered by us", "Flexible terms that scale with your team", "One cheque, one all-inclusive invoice"].map((item) => (
                <div key={item} className="relative pl-5 py-2 border-l-2 border-[#d4622b] text-sm font-bold text-[#1a1a2e]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ THE PROBLEM ━━━ */}
        <section id="problems" className="relative py-16 sm:py-24 lg:py-28 bg-gradient-to-br from-white via-[#fff7f2] to-[#f5ddd0] text-[#1a1a2e] overflow-hidden" ref={tabsRef}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">The problem</span>
              <h2 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
                Why traditional offices hold enterprises back
              </h2>
              <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
                Four things a conventional corporate lease asks of you. Each one plays out below.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] gap-6 lg:gap-10 mt-10 sm:mt-14 items-start">
              {/* Tabs */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-0">
                {problems.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handleTabClick(idx)}
                    className={`relative text-left flex items-center gap-3 px-4 py-5 lg:border-t border border-gray-200 lg:border-x-0 rounded-xl lg:rounded-none transition-all cursor-pointer overflow-hidden ${
                      activeTab === idx
                        ? "bg-white/60 text-[#1a1a2e]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <span className={`text-2xl font-bold tracking-tight transition-colors ${activeTab === idx ? "text-[#d4622b]" : ""}`}>
                      {p.id}
                    </span>
                    <span className="font-bold text-sm sm:text-base">{p.title}</span>
                    {activeTab === idx && !userTouched && (
                      <motion.span
                        className="absolute bottom-0 left-0 h-[3px] bg-[#d4622b]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 9, ease: "linear" }}
                        key={`progress-${idx}`}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Panel */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/70 border border-gray-200 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
              >
                <ProblemPanel idx={activeTab} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ━━━ COMPARE ━━━ */}
        <CompareSection />

        {/* ━━━ BENEFITS ━━━ */}
        <section id="benefits" className="py-16 sm:py-24 lg:py-28 bg-gray-50 border-t border-gray-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">The payoff</span>
              <h2 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
                What changes for your enterprise with Onward
              </h2>
              <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
                Six things that change when your office becomes one agreement and one cheque.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 sm:mt-14">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.06}>
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-1.5 hover:border-[#d4622b]/40 transition-all duration-300 h-full group">
                    <span className="text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">{b.icon}</span>
                    <h3 className="text-xl font-bold text-[#1a1a2e] tracking-tight">{b.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ CONTACT ━━━ */}
        <section id="contact" className="relative py-16 sm:py-24 lg:py-28 bg-gradient-to-tl from-[#f5ddd0] via-[#fff7f2] to-white text-[#1a1a2e]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-end">
            <div>
              <Reveal>
                <span className="text-[#d4622b] text-xs sm:text-sm font-bold tracking-widest uppercase">Enterprise enquiries</span>
                <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight">
                  Get in touch.
                </h2>
                <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                  Tell us your team size and preferred location. We will match you to the right workspace within 24 hours.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href="mailto:info@onwardworkspaces.com?subject=Enterprise%20enquiry"
                    className="inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8531f] text-white text-sm font-bold px-6 py-3.5 rounded-full transition-colors shadow-md"
                  >
                    Email us
                  </a>
                  <a
                    href="tel:+919910668152"
                    className="inline-flex items-center gap-2 border-2 border-[#1a1a2e] text-[#1a1a2e] hover:border-[#d4622b] hover:text-[#d4622b] text-sm font-bold px-6 py-3.5 rounded-full transition-colors"
                  >
                    Call us
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white/60">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">Email</span>
                    <span className="block text-lg font-bold text-[#1a1a2e] break-all">info@onwardworkspaces.com</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white/60">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">Phone</span>
                    <span className="block text-lg font-bold text-[#1a1a2e]">+91 99106 68152</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
