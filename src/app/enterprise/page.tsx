"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA DEFINITIONS (MATCHING ONWARD ENTERPRISE COPY)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const CAPABILITY_DETAILS = [
  {
    id: 1,
    num: "01",
    title: "Space and address",
    desc: "Offices at prime business addresses across Delhi NCR, on one agreement. No leasing agent and no separate dealings with property owners.",
    replaces: ["Leasing agent", "Building / property"],
    groups: ["v", "d"],
    labelPos: { left: "2.2%", top: "80.15%" },
    side: "l",
  },
  {
    id: 2,
    num: "02",
    title: "Fit-out and furniture",
    desc: "Tailor-made fit-outs and ready-to-use floors, custom-built and fully furnished to match your brand and team workflow.",
    replaces: ["Furniture retailer", "Labor contractor"],
    groups: ["v"],
    labelPos: { left: "2.2%", top: "47.06%" },
    side: "l",
  },
  {
    id: 3,
    num: "03",
    title: "Site management",
    desc: "Our dedicated on-site community and operations team runs the floor seamlessly, eliminating internal management overhead.",
    replaces: ["Site manager", "Floor manager"],
    groups: ["s"],
    labelPos: { left: "2.2%", top: "14.71%" },
    side: "l",
  },
  {
    id: 4,
    num: "04",
    title: "Daily office services",
    desc: "Housekeeping, high-speed enterprise IT, utilities, facility upkeep, and administrative concierge support are completely handled.",
    replaces: ["Service staff", "Office managers"],
    groups: ["s"],
    labelPos: { left: "78.8%", top: "47.06%" },
    side: "r",
  },
  {
    id: 5,
    num: "05",
    title: "One point of contact",
    desc: "Your leadership works with a single strategic partner instead of coordinating and negotiating with dozens of disparate vendors.",
    replaces: ["Vendor coordinators", "Procurement overhead"],
    groups: ["s"],
    labelPos: { left: "78.8%", top: "14.71%" },
    side: "r",
  },
  {
    id: 6,
    num: "06",
    title: "One cheque",
    desc: "Rent, CAM, electricity, internet, security, and facility operations arrive in a single unified, predictable monthly invoice.",
    replaces: ["Separate bills from every party"],
    groups: ["s", "v", "d"],
    labelPos: { left: "78.8%", top: "80.15%" },
    side: "r",
  },
];

const BENEFITS_DATA = [
  {
    id: 1,
    title: "Flexibility and agility",
    desc: "Terms that scale with your team. Add or release seats as plans, markets and headcount change.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-full h-full stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
        <path d="M8 16h32M8 32h32" />
        <circle cx="18" cy="16" r="5" className="fill-current/20" />
        <circle cx="32" cy="32" r="5" className="fill-current/20" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Streamlined operations",
    desc: "Maintenance, housekeeping and admin support are run by our on-site team. Your people stay on the work, not the office.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-full h-full stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
        <path d="M9 13l4 4 7-8M9 25l4 4 7-8M9 37l4 4 7-8M27 14h13M27 26h13M27 38h13" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Cost-effectiveness",
    desc: "One all-inclusive invoice covers rent, CAM, insurance and operating costs. No separate cheques, no fit-out capex.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-full h-full stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
        <path d="M13 10h22M13 19h22M17 10h5c8 0 12 4 12 9.5S30 29 22 29h-5l15 12" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Enhanced productivity",
    desc: "Tailor-made fit-outs and ready-to-use floors mean your team moves into a space built to work in.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-full h-full stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
        <path d="M6 36l12-12 8 8 16-18" />
        <path d="M32 14h10v10" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Brand image",
    desc: "Meet clients, investors and partners in well-designed offices at business addresses across Delhi NCR.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-full h-full stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
        <path d="M10 42V12l14-7 14 7v30M5 42h38M18 18h4M26 18h4M18 26h4M26 26h4M20 42v-8h8v8" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Networking",
    desc: "Sit alongside other growing companies. Introductions, partnerships and referrals come with the address.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-full h-full stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
        <circle cx="24" cy="11" r="5" />
        <circle cx="10" cy="36" r="5" />
        <circle cx="38" cy="36" r="5" />
        <path d="M21 16l-7 15M27 16l7 15M15 37h18" />
      </svg>
    ),
  },
];

const TASKS_LIST = [
  "Vendor negotiations",
  "Contractor snagging",
  "Facility repairs",
  "Housekeeping",
  "Visitor management",
  "Furniture sourcing",
  "Utility billing",
  "Compliance renewals",
];

const ROAD_STEPS = [
  { title: "Approvals", sub: "Sign-offs", cost: "Deposits" },
  { title: "Contractors", sub: "Quotes, timelines", cost: "Contractor fees" },
  { title: "Fit-out build", sub: "Weeks on site", cost: "Fit-out capex" },
  { title: "Day one", sub: "Team moves in", cost: "" },
];

const ROAD_CAPTIONS = [
  "Everything before day one is spend, with nothing to use yet.",
  "Approvals first: you pay security deposits and sign-off agreements.",
  "Then contractors: quotes, timelines, and advance payments.",
  "Then the build: weeks of fit-out work and upfront capex.",
  "Only now can your team move in and start working.",
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOPIC 1: INTERACTIVE SEAT GRID COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TopicSeatGrid() {
  const LEASE_SEATS = 80;
  const MAX_OVER = 30;
  const [teamSize, setTeamSize] = useState(50);

  const diff = teamSize - LEASE_SEATS;
  const isUnder = teamSize <= LEASE_SEATS;
  const gapCount = Math.abs(diff);

  const caption =
    teamSize < LEASE_SEATS
      ? `${gapCount} desks sit empty, and you still pay for all 80.`
      : teamSize === LEASE_SEATS
      ? "You lease 80 seats and have 80 people. It fits."
      : `${gapCount} people have no desk. The traditional lease cannot stretch.`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
      className="flex flex-col min-h-[480px] bg-[#fbf8f1] border border-[#d8cdb7] rounded-[24px] p-4 sm:p-6 shadow-[0_24px_50px_-34px_rgba(60,40,10,0.35)] hover:shadow-[0_32px_60px_-24px_rgba(212,98,43,0.25)] transition-shadow"
    >
      <div className="flex justify-between items-center gap-2 mb-4">
        <span className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#655d4e] font-bold">
          Try it: change your team size
        </span>
      </div>

      <div className="grid gap-2.5 mb-5">
        <div className="flex justify-between items-baseline gap-3 flex-wrap">
          <label htmlFor="team-slider" className="font-bold text-sm text-[#1c1813]">
            Your team
          </label>
          <span className="font-bold text-[#d4622b] text-base sm:text-lg tabular-nums">
            {teamSize} people
          </span>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setTeamSize((v) => Math.max(20, v - 5))}
            aria-label="Remove 5 people"
            className="w-10 h-10 rounded-full border-[1.5px] border-[#d8cdb7] bg-transparent text-[#1c1813] font-bold text-xl flex items-center justify-center cursor-pointer hover:bg-[#d4622b] hover:border-[#d4622b] hover:text-white transition-all shrink-0"
          >
            &minus;
          </motion.button>
          <input
            id="team-slider"
            type="range"
            min={20}
            max={110}
            step={5}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full accent-[#d4622b] h-7 cursor-pointer"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setTeamSize((v) => Math.min(110, v + 5))}
            aria-label="Add 5 people"
            className="w-10 h-10 rounded-full border-[1.5px] border-[#d8cdb7] bg-transparent text-[#1c1813] font-bold text-xl flex items-center justify-center cursor-pointer hover:bg-[#d4622b] hover:border-[#d4622b] hover:text-white transition-all shrink-0"
          >
            +
          </motion.button>
        </div>
      </div>

      {/* Grid container */}
      <div className="relative border-[1.5px] border-dashed border-[#d8cdb7] rounded-[14px] px-3 pt-6 pb-3 mt-1.5 bg-[#fbf8f1]">
        <b className="absolute -top-2.5 left-3.5 px-2 bg-[#fbf8f1] text-[11px] tracking-[0.14em] uppercase text-[#655d4e]">
          Your lease: 80 seats
        </b>
        <div className="grid grid-cols-16 gap-1 sm:gap-1.5">
          {Array.from({ length: LEASE_SEATS }).map((_, i) => {
            const inUse = i < teamSize;
            return (
              <motion.span
                key={i}
                initial={false}
                animate={{ scale: inUse ? [0.8, 1] : 1 }}
                transition={{ duration: 0.2 }}
                className={`aspect-square rounded-[3px] transition-all duration-300 ${
                  inUse
                    ? "bg-[#d4622b] border border-[#d4622b]"
                    : "border-[1.5px] border-dashed border-[#a89d86] bg-transparent"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Overflow grid if team > 80 */}
      {teamSize > LEASE_SEATS && (
        <div className="grid grid-cols-16 gap-1 sm:gap-1.5 mt-2.5 animate-fadeIn">
          {Array.from({ length: Math.min(MAX_OVER, teamSize - LEASE_SEATS) }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="aspect-square rounded-[3px] border-[1.5px] border-dashed border-[#d4622b] bg-transparent"
            />
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3.5 text-xs text-[#655d4e]">
        <span className="inline-flex items-center gap-2">
          <i className="w-3.5 h-3.5 rounded-[4px] bg-[#d4622b]" />
          In use
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="w-3.5 h-3.5 rounded-[4px] border-[1.5px] border-dashed border-[#655d4e]" />
          Empty, still paid for
        </span>
        {teamSize > LEASE_SEATS && (
          <span className="inline-flex items-center gap-2">
            <i className="w-3.5 h-3.5 rounded-[4px] border-[1.5px] border-dashed border-[#d4622b]" />
            Over your lease
          </span>
        )}
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
        <motion.div whileHover={{ y: -3, scale: 1.02 }} className="border border-[#d8cdb7] rounded-[14px] p-3.5 bg-white/50 backdrop-blur-sm">
          <b className="block text-2xl sm:text-3xl font-black text-[#1c1813] tabular-nums leading-none">
            80
          </b>
          <span className="block mt-2 text-xs text-[#655d4e]">seats on a lease</span>
        </motion.div>
        <motion.div whileHover={{ y: -3, scale: 1.02 }} className="border border-[#d8cdb7] rounded-[14px] p-3.5 bg-white/50 backdrop-blur-sm">
          <b className="block text-2xl sm:text-3xl font-black text-[#d4622b] tabular-nums leading-none">
            {gapCount}
          </b>
          <span className="block mt-2 text-xs text-[#655d4e]">
            {isUnder ? "empty, still paid for" : "seats short"}
          </span>
        </motion.div>
        <motion.div whileHover={{ y: -3, scale: 1.02 }} className="border border-[#d8cdb7] rounded-[14px] p-3.5 bg-white/50 backdrop-blur-sm">
          <b className="block text-2xl sm:text-3xl font-black text-[#1c1813] tabular-nums leading-none">
            {teamSize}
          </b>
          <span className="block mt-2 text-xs text-[#655d4e]">seats billed with Onward</span>
        </motion.div>
      </div>

      <p className="mt-auto px-3.5 py-3 rounded-[12px] bg-[#d4622b]/10 text-[#1c1813] text-xs sm:text-sm font-bold min-h-[3.2em] flex items-center">
        {caption}
      </p>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOPIC 2: OPERATIONAL TASKS GAUGE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TopicTasksGauge() {
  const [activeTasksCount, setActiveTasksCount] = useState(8);

  const focusPct = Math.round(100 - activeTasksCount * 7.5);
  const strokeOffset = activeTasksCount * 7.5;

  const caption =
    activeTasksCount < 3
      ? "The jobs start landing on your team, one by one."
      : activeTasksCount < 8
      ? "More piles up: facility repairs, vendor billing, and compliance renewals."
      : "Eight side jobs, and none of them is your core business.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
      className="flex flex-col min-h-[480px] bg-[#fbf8f1] border border-[#d8cdb7] rounded-[24px] p-4 sm:p-6 shadow-[0_24px_50px_-34px_rgba(60,40,10,0.35)] hover:shadow-[0_32px_60px_-24px_rgba(212,98,43,0.25)] transition-shadow"
    >
      <div className="flex justify-between items-center gap-2 mb-4">
        <span className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#655d4e] font-bold">
          Extra work for your team (illustrative)
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 mb-4">
        <motion.div whileHover={{ scale: 1.08 }} className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#d8cdb7" strokeWidth="9" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#d4622b"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={strokeOffset}
              style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.34, 1.3, 0.64, 1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <b className="text-xl sm:text-2xl font-black text-[#1c1813] leading-none tabular-nums">
              {focusPct}%
            </b>
            <span className="text-[10px] tracking-[0.1em] uppercase text-[#655d4e] mt-0.5">
              Focus
            </span>
          </div>
        </motion.div>

        <div>
          <b className="block text-3xl sm:text-5xl font-black text-[#d4622b] tabular-nums leading-none">
            {activeTasksCount}
          </b>
          <span className="block mt-1.5 text-xs sm:text-sm text-[#655d4e] max-w-[28ch]">
            side jobs added to your team&apos;s daily agenda
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {TASKS_LIST.map((task, idx) => {
          const isOff = idx >= activeTasksCount;
          return (
            <motion.button
              key={task}
              whileHover={{ scale: isOff ? 1 : 1.03, x: isOff ? 0 : 2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setActiveTasksCount(idx + 1)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] border font-bold text-xs sm:text-sm text-left transition-all duration-300 cursor-pointer ${
                isOff
                  ? "opacity-20 border-[#d8cdb7] text-[#655d4e] translate-x-2"
                  : "border-[#d8cdb7] bg-white text-[#1c1813] hover:border-[#d4622b] shadow-sm"
              }`}
            >
              <i className="w-3.5 h-3.5 rounded-full border-2 border-[#d4622b] shrink-0" />
              <span>{task}</span>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-auto px-3.5 py-3 rounded-[12px] bg-[#d4622b]/10 text-[#1c1813] text-xs sm:text-sm font-bold min-h-[3.2em] flex items-center">
        {caption}
      </p>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOPIC 3: ROAD TO DAY ONE STEPPER COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TopicRoadToDayOne() {
  const [activeStep, setActiveStep] = useState(3);

  const fillFrac = activeStep < 0 ? 0 : activeStep / 3;
  const spendWidth = `${fillFrac * 100}%`;
  const workWidth = activeStep === 3 ? "25%" : "0%";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
      className="flex flex-col min-h-[480px] bg-[#fbf8f1] border border-[#d8cdb7] rounded-[24px] p-4 sm:p-6 shadow-[0_24px_50px_-34px_rgba(60,40,10,0.35)] hover:shadow-[0_32px_60px_-24px_rgba(212,98,43,0.25)] transition-shadow"
    >
      <div className="flex justify-between items-center gap-2 mb-4">
        <span className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#655d4e] font-bold">
          The road to day one &middot; tap any step
        </span>
      </div>

      <div className="relative grid grid-rows-4 gap-2.5 pl-9 my-1">
        <div className="absolute left-2 top-7 bottom-7 w-1 bg-[#d8cdb7] rounded-full overflow-hidden">
          <div
            className="w-full bg-[#d4622b] transition-all duration-500 origin-top"
            style={{ height: `${fillFrac * 100}%` }}
          />
        </div>

        {ROAD_STEPS.map((step, idx) => {
          const isOff = idx > activeStep;
          const isGo = idx === 3 && activeStep === 3;
          return (
            <motion.button
              key={step.title}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`relative grid grid-cols-[1fr_auto] items-center px-3.5 py-2.5 rounded-[12px] border text-left font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                isGo
                  ? "bg-[#d4622b] border-[#d4622b] text-white shadow-md"
                  : isOff
                  ? "opacity-35 border-[#d8cdb7] text-[#655d4e] bg-transparent"
                  : "border-[#d4622b] bg-white text-[#1c1813] shadow-sm"
              }`}
            >
              <div
                className={`absolute -left-[35px] top-1/2 -mt-2 w-4 h-4 rounded-full transition-colors duration-300 ${
                  isOff
                    ? "bg-[#f8f4ea] border-2 border-[#d8cdb7]"
                    : "bg-[#d4622b] border-2 border-[#d4622b]"
                }`}
              />
              <div>
                <span>{step.title}</span>
                <small
                  className={`block text-[11px] font-normal mt-0.5 ${
                    isGo ? "text-white/80" : "text-[#655d4e]"
                  }`}
                >
                  {step.sub}
                </small>
              </div>
              {step.cost && (
                <span
                  className={`text-[11px] font-bold self-center whitespace-nowrap transition-opacity duration-300 ${
                    isOff ? "opacity-0" : "text-[#d4622b]"
                  }`}
                >
                  {step.cost}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="grid gap-2.5 my-4">
        <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[104px_1fr] gap-3 items-center text-xs text-[#655d4e]">
          <span>Money spent</span>
          <div className="h-2.5 rounded-full bg-[#d8cdb7] overflow-hidden">
            <i
              className="block h-full bg-[#d4622b] rounded-full transition-all duration-500"
              style={{ width: spendWidth }}
            />
          </div>
        </div>
        <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[104px_1fr] gap-3 items-center text-xs text-[#655d4e]">
          <span>Team working</span>
          <div className="h-2.5 rounded-full bg-[#d8cdb7] overflow-hidden">
            <i
              className="block h-full bg-[#d4622b] rounded-full transition-all duration-500"
              style={{ width: workWidth, marginLeft: activeStep === 3 ? "75%" : "0%" }}
            />
          </div>
        </div>
      </div>

      <p className="mt-auto px-3.5 py-3 rounded-[12px] bg-[#d4622b]/10 text-[#1c1813] text-xs sm:text-sm font-bold min-h-[3.2em] flex items-center">
        {ROAD_CAPTIONS[activeStep + 1] || ROAD_CAPTIONS[0]}
      </p>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOPIC 4: SEPARATE BILLS LEDGER COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TopicSeparateBills() {
  const ledgerRows = [
    { name: "Rent", variable: false },
    { name: "CAM", variable: false },
    { name: "Insurance", variable: false },
    { name: "Operating costs", variable: true },
    { name: "Maintenance", variable: true },
  ];

  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
      className="flex flex-col min-h-[480px] bg-[#fbf8f1] border border-[#d8cdb7] rounded-[24px] p-4 sm:p-6 shadow-[0_24px_50px_-34px_rgba(60,40,10,0.35)] hover:shadow-[0_32px_60px_-24px_rgba(212,98,43,0.25)] transition-shadow"
    >
      <div className="flex justify-between items-center gap-2 mb-4">
        <span className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#655d4e] font-bold">
          What arrives separately every month
        </span>
      </div>

      <div className="grid gap-2.5 my-1">
        {ledgerRows.map((row, ri) => (
          <div
            key={row.name}
            className="grid grid-cols-[80px_1fr] sm:grid-cols-[104px_1fr] gap-3 items-center text-xs sm:text-sm font-bold"
          >
            <span className="text-[#1c1813]">{row.name}</span>
            <div className="grid grid-cols-12 justify-items-center items-center min-h-[18px]">
              {Array.from({ length: 12 }).map((_, c) => {
                const size = row.variable ? 8 + ((c * 5 + ri * 3) % 7) * 1.3 : 11;
                return (
                  <motion.i
                    key={c}
                    whileHover={{ scale: 1.5 }}
                    className="rounded-full bg-[#d4622b] block transition-transform duration-300 cursor-pointer"
                    style={{ width: `${size}px`, height: `${size}px` }}
                  />
                );
              })}
            </div>
          </div>
        ))}
        {/* Months labels */}
        <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[104px_1fr] gap-3 items-center text-xs">
          <span />
          <div className="grid grid-cols-12 justify-items-center items-center">
            {months.map((m, mi) => (
              <i key={mi} className="not-italic text-[10px] text-[#8a8070] font-normal">
                {m}
              </i>
            ))}
          </div>
        </div>
      </div>

      {/* Term timeline bar */}
      <div className="mt-5 mb-4">
        <div className="flex h-4 rounded-full overflow-hidden border border-[#d8cdb7]">
          <div className="w-[40%] bg-[#d4622b]" />
          <div
            className="w-[60%] border-l-2 border-dashed border-[#1c1813]"
            style={{
              background:
                "repeating-linear-gradient(135deg, rgba(212,98,43,0.35) 0 6px, transparent 6px 12px)",
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#655d4e] mt-2 gap-3">
          <span className="w-[40%] text-[#d4622b] font-bold">Your needs change here</span>
          <span className="w-[60%] text-right">You still owe the rest of the term</span>
        </div>
      </div>

      <p className="mt-auto px-3.5 py-3 rounded-[12px] bg-[#d4622b]/10 text-[#1c1813] text-xs sm:text-sm font-bold min-h-[3.2em] flex items-center">
        Rent, maintenance, insurance and utilities arrive as separate payments. The liability stays with you for the full term.
      </p>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CAPABILITY WEB SECTION (INTERACTIVE SVG NODE MAP)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CapabilityWebSection() {
  const [activeCap, setActiveCap] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const webScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  // Auto advance capability unless user is hovering/interacting
  useEffect(() => {
    if (isLocked) return;
    const interval = setInterval(() => {
      setActiveCap((prev) => (prev % 6) + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, [isLocked]);

  const currentDetail = CAPABILITY_DETAILS[activeCap - 1] || CAPABILITY_DETAILS[0];

  return (
    <section
      ref={sectionRef}
      id="partner"
      className="relative py-20 sm:py-28 lg:py-36 bg-white border-y border-[#e2e2e2] overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(#e2e2e2 1.2px, transparent 1.2px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* Parallax ambient background glow orb */}
      <motion.div
        style={{ y: sectionY, scale: webScale }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#d4622b]/5 via-transparent to-[#ff9a73]/5 pointer-events-none blur-3xl"
      />

      <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-10 sm:mb-14"
        >
          <p className="text-xs tracking-[0.16em] uppercase font-bold text-[#d4622b] mb-3">
            One partner
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0b0b0b] tracking-tight leading-none">
            One partner. Six capabilities.
          </h2>
          <p className="mt-4 text-[#585858] text-base sm:text-lg max-w-2xl">
            Everything a traditional office requires from dozens of separate vendors, Onward delivers as one cohesive solution.
          </p>
        </motion.div>

        {/* Desktop Interactive Diagram with Parallax Zoom */}
        <motion.div
          style={{ scale: webScale }}
          onMouseEnter={() => setIsLocked(true)}
          onMouseLeave={() => setIsLocked(false)}
          className="hidden md:block relative aspect-[1100/680] max-w-[1100px] mx-auto border border-[#e2e2e2] rounded-[28px] bg-white/95 backdrop-blur-md p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]"
        >
          <svg
            viewBox="0 0 1100 680"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Pulsing Concentric Radar Rings in Center */}
            <circle
              cx="550"
              cy="340"
              r="240"
              fill="none"
              stroke="#d4622b"
              strokeOpacity="0.08"
              strokeWidth="1.5"
              className="animate-ping origin-[550px_340px]"
              style={{ animationDuration: "6s" }}
            />

            {/* 3 Overlapping Venn circles */}
            <circle
              cx="550"
              cy="215"
              r="172"
              fill={currentDetail.groups.includes("s") ? "rgba(212,98,43,0.08)" : "none"}
              stroke={currentDetail.groups.includes("s") ? "#d4622b" : "#585858"}
              strokeOpacity={currentDetail.groups.includes("s") ? 1 : 0.35}
              strokeWidth={currentDetail.groups.includes("s") ? 2.2 : 1.4}
              strokeDasharray={currentDetail.groups.includes("s") ? undefined : "4 4"}
              className="transition-all duration-500"
            />
            <circle
              cx="435"
              cy="410"
              r="172"
              fill={currentDetail.groups.includes("v") ? "rgba(212,98,43,0.08)" : "none"}
              stroke={currentDetail.groups.includes("v") ? "#d4622b" : "#585858"}
              strokeOpacity={currentDetail.groups.includes("v") ? 1 : 0.35}
              strokeWidth={currentDetail.groups.includes("v") ? 2.2 : 1.4}
              strokeDasharray={currentDetail.groups.includes("v") ? undefined : "4 4"}
              className="transition-all duration-500"
            />
            <circle
              cx="665"
              cy="410"
              r="172"
              fill={currentDetail.groups.includes("d") ? "rgba(212,98,43,0.08)" : "none"}
              stroke={currentDetail.groups.includes("d") ? "#d4622b" : "#585858"}
              strokeOpacity={currentDetail.groups.includes("d") ? 1 : 0.35}
              strokeWidth={currentDetail.groups.includes("d") ? 2.2 : 1.4}
              strokeDasharray={currentDetail.groups.includes("d") ? undefined : "4 4"}
              className="transition-all duration-500"
            />

            {/* Connecting dashed lead lines to buttons */}
            <g className="transition-all duration-400">
              {/* 03 Site management (Top Left) */}
              <path
                d="M232,100 H268 L496,138"
                fill="none"
                stroke={activeCap === 3 ? "#d4622b" : "#585858"}
                strokeWidth={activeCap === 3 ? 2.2 : 1.2}
                strokeDasharray={activeCap === 3 ? undefined : "4 5"}
                strokeOpacity={activeCap === 3 ? 1 : 0.35}
              />
              <circle cx="496" cy="138" r={activeCap === 3 ? 5 : 3.5} fill={activeCap === 3 ? "#d4622b" : "#585858"} />

              {/* 02 Fit-out & furniture (Mid Left) */}
              <path
                d="M232,320 H268 L298,478"
                fill="none"
                stroke={activeCap === 2 ? "#d4622b" : "#585858"}
                strokeWidth={activeCap === 2 ? 2.2 : 1.2}
                strokeDasharray={activeCap === 2 ? undefined : "4 5"}
                strokeOpacity={activeCap === 2 ? 1 : 0.35}
              />
              <circle cx="298" cy="478" r={activeCap === 2 ? 5 : 3.5} fill={activeCap === 2 ? "#d4622b" : "#585858"} />

              {/* 01 Space and address (Bottom Left) */}
              <path
                d="M232,545 H268 L298,507"
                fill="none"
                stroke={activeCap === 1 ? "#d4622b" : "#585858"}
                strokeWidth={activeCap === 1 ? 2.2 : 1.2}
                strokeDasharray={activeCap === 1 ? undefined : "4 5"}
                strokeOpacity={activeCap === 1 ? 1 : 0.35}
              />
              <circle cx="298" cy="507" r={activeCap === 1 ? 5 : 3.5} fill={activeCap === 1 ? "#d4622b" : "#585858"} />

              {/* 05 One point of contact (Top Right) */}
              <path
                d="M868,100 H832 L622,108"
                fill="none"
                stroke={activeCap === 5 ? "#d4622b" : "#585858"}
                strokeWidth={activeCap === 5 ? 2.2 : 1.2}
                strokeDasharray={activeCap === 5 ? undefined : "4 5"}
                strokeOpacity={activeCap === 5 ? 1 : 0.35}
              />
              <circle cx="622" cy="108" r={activeCap === 5 ? 5 : 3.5} fill={activeCap === 5 ? "#d4622b" : "#585858"} />

              {/* 04 Daily office services (Mid Right) */}
              <path
                d="M868,320 H832 L603,175"
                fill="none"
                stroke={activeCap === 4 ? "#d4622b" : "#585858"}
                strokeWidth={activeCap === 4 ? 2.2 : 1.2}
                strokeDasharray={activeCap === 4 ? undefined : "4 5"}
                strokeOpacity={activeCap === 4 ? 1 : 0.35}
              />
              <circle cx="603" cy="175" r={activeCap === 4 ? 5 : 3.5} fill={activeCap === 4 ? "#d4622b" : "#585858"} />

              {/* 06 One cheque (Bottom Right) */}
              <path
                d="M868,545 H832 L590,334"
                fill="none"
                stroke={activeCap === 6 ? "#d4622b" : "#585858"}
                strokeWidth={activeCap === 6 ? 2.2 : 1.2}
                strokeDasharray={activeCap === 6 ? undefined : "4 5"}
                strokeOpacity={activeCap === 6 ? 1 : 0.35}
              />
              <circle cx="590" cy="334" r={activeCap === 6 ? 5 : 3.5} fill={activeCap === 6 ? "#d4622b" : "#585858"} />
            </g>

            {/* Group Header Labels */}
            <text x="550" y="84" textAnchor="middle" className="font-bold text-[12px] tracking-[0.18em] fill-[#585858]">
              STAFF
            </text>
            <text x="360" y="442" textAnchor="middle" className="font-bold text-[12px] tracking-[0.18em] fill-[#585858]">
              VENDORS
            </text>
            <text x="740" y="442" textAnchor="middle" className="font-bold text-[12px] tracking-[0.18em] fill-[#585858]">
              DEVELOPER
            </text>

            {/* Staff Roles */}
            <text x="550" y="108" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 5 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Corporate leadership</text>
            <text x="550" y="127" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 3 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Site manager</text>
            <text x="550" y="146" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 3 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Floor manager</text>
            <text x="550" y="165" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 4 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Service staff</text>
            <text x="550" y="184" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 4 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Office managers</text>

            {/* Vendor Roles */}
            <text x="360" y="468" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 2 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Furniture retailer</text>
            <text x="360" y="487" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 2 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Labor contractor</text>
            <text x="360" y="506" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 1 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Leasing agent</text>

            {/* Developer Roles */}
            <text x="740" y="468" textAnchor="middle" className={`text-[13px] transition-all duration-300 ${activeCap === 1 ? "fill-[#d4622b] font-bold" : "fill-[#0b0b0b] opacity-40"}`}>Building / property</text>

            {/* Center ONWARD Logo Emblem */}
            <g transform="translate(530 314) scale(0.156)" fill="#d4622b">
              <path d="M38 0H220A36 36 0 0 1 256 36V218A37.5 37.5 0 0 1 181 218V112A36 36 0 0 0 145 76H38A38 38 0 0 1 38 0Z" />
              <circle cx="77" cy="189" r="50" />
            </g>
          </svg>

          {/* 6 Capability Interactive Buttons with Zoom Hover */}
          {CAPABILITY_DETAILS.map((cap) => {
            const isActive = activeCap === cap.id;
            return (
              <motion.button
                key={cap.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setActiveCap(cap.id)}
                onMouseEnter={() => setActiveCap(cap.id)}
                style={{ left: cap.labelPos.left, top: cap.labelPos.top }}
                className={`absolute w-[19%] -translate-y-1/2 flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-[16px] text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-2 border-[#d4622b] bg-[#d4622b]/10 scale-105 shadow-[0_14px_30px_-15px_rgba(212,98,43,0.7)]"
                    : "border-[1.5px] border-dashed border-[#585858] bg-white hover:border-[#d4622b]"
                }`}
              >
                <i className={`text-xs font-bold tracking-wider not-italic shrink-0 ${isActive ? "text-[#d4622b]" : "text-[#585858]"}`}>
                  {cap.num}
                </i>
                <b className="text-xs lg:text-sm font-bold text-[#0b0b0b] leading-tight">
                  {cap.title}
                </b>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Desktop Detail Card with Scale Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDetail.id}
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="hidden md:grid grid-cols-[auto_1fr_auto] gap-5 items-center max-w-[900px] mx-auto mt-6 p-6 border-[1.5px] border-[#e2e2e2] rounded-[24px] bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]"
          >
            <i className="text-4xl font-black text-[#d4622b] not-italic leading-none">
              {currentDetail.num}
            </i>
            <div>
              <h3 className="text-xl font-bold text-[#0b0b0b] tracking-tight">
                {currentDetail.title}
              </h3>
              <p className="mt-1 text-[#585858] text-sm leading-relaxed max-w-[54ch]">
                {currentDetail.desc}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 max-w-[240px]">
              <em className="not-italic text-[10px] font-bold tracking-[0.12em] uppercase text-[#585858]">
                Replaces
              </em>
              <div className="flex flex-wrap gap-1.5">
                {currentDetail.replaces.map((r) => (
                  <span
                    key={r}
                    className="text-xs px-2.5 py-1 rounded-full border border-[#e2e2e2] text-[#585858] line-through decoration-[#d4622b] bg-[#f4f4f4]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile / Tablet Card Fallback with Stagger Zoom */}
        <div className="md:hidden grid grid-cols-1 gap-3.5 mt-6">
          {CAPABILITY_DETAILS.map((cap, i) => (
            <motion.article
              key={cap.id}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 border border-[#e2e2e2] rounded-[18px] bg-white shadow-sm"
            >
              <i className="not-italic text-xs font-bold tracking-wider text-[#d4622b] block mb-1">
                {cap.num}
              </i>
              <h3 className="text-lg font-bold text-[#0b0b0b]">{cap.title}</h3>
              <p className="mt-1.5 text-sm text-[#585858] leading-relaxed">{cap.desc}</p>
              <div className="mt-3 pt-3 border-t border-[#e2e2e2]">
                <em className="not-italic text-[10px] font-bold tracking-wider uppercase text-[#585858] block mb-1.5">
                  Replaces
                </em>
                <div className="flex flex-wrap gap-1.5">
                  {cap.replaces.map((r) => (
                    <span
                      key={r}
                      className="text-xs px-2.5 py-0.5 rounded-full border border-[#e2e2e2] text-[#585858] line-through decoration-[#d4622b] bg-[#f4f4f4]"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN ENTERPRISE PAGE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function EnterprisePage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [compareMode, setCompareMode] = useState<"trad" | "onward">("trad");
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  // Parallax Scroll Hooks for Hero & Sections
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOrbScale = useTransform(heroScroll, [0, 1], [1, 1.4]);
  const heroOrbY = useTransform(heroScroll, [0, 1], [0, 120]);

  // Problems Section Parallax
  const problemsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: problemsScroll } = useScroll({
    target: problemsRef,
    offset: ["start end", "end start"],
  });
  const problemsGlowY = useTransform(problemsScroll, [0, 1], [-60, 60]);
  const problemsScale = useTransform(problemsScroll, [0, 0.5, 1], [0.96, 1, 0.98]);

  // Compare Section Parallax
  const compareRef = useRef<HTMLElement>(null);
  const { scrollYProgress: compareScroll } = useScroll({
    target: compareRef,
    offset: ["start end", "end start"],
  });
  const compareY = useTransform(compareScroll, [0, 1], [40, -40]);

  // Benefits Section Parallax
  const benefitsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: benefitsScroll } = useScroll({
    target: benefitsRef,
    offset: ["start end", "end start"],
  });
  const benefitsScale = useTransform(benefitsScroll, [0, 0.4, 1], [0.94, 1, 0.98]);

  // Copy helper with feedback
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  }, []);

  const selectedBenefit = hoveredBenefit
    ? BENEFITS_DATA.find((b) => b.id === hoveredBenefit)
    : null;

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-white text-[#0b0b0b] pt-20 overflow-hidden">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. HERO SECTION
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={heroRef}
          className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#faf8f5] via-white to-white border-b border-[#e2e2e2] overflow-hidden"
        >
          {/* Animated Background Parallax Light Orb */}
          <motion.div
            style={{ y: heroOrbY, scale: heroOrbScale }}
            className="absolute right-[-10%] top-[-10%] w-[600px] h-[600px] rounded-full bg-radial from-[#d4622b]/15 via-[#ff9a73]/5 to-transparent blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div style={{ y: heroTextY }}>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs tracking-[0.16em] uppercase font-bold text-[#d4622b] mb-4"
              >
                Onward for Enterprise
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.8, 0.2, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0b0b0b] tracking-tight leading-[1.05] max-w-[18ch]"
              >
                Run your business.{" "}
                <em className="not-italic text-[#d4622b]">We run the office.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6 text-[#585858] text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl"
              >
                Fully managed offices for growing companies across Delhi NCR. One agreement, one cheque, built around your team.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-[#d4622b] text-white hover:bg-[#b8531f] transition-colors shadow-lg cursor-pointer"
                >
                  Get in touch
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="#compare"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-[1.5px] border-[#0b0b0b] text-[#0b0b0b] hover:border-[#d4622b] hover:text-[#d4622b] transition-colors cursor-pointer"
                >
                  See how it compares
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. THE PROBLEM: WHY TRADITIONAL OFFICES HOLD ENTERPRISES BACK
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={problemsRef}
          id="problems"
          className="relative py-20 sm:py-28 lg:py-36 bg-[#efe8da] text-[#1c1813] border-b border-[#d8cdb7] overflow-hidden"
        >
          {/* Parallax ambient glow */}
          <motion.div
            style={{ y: problemsGlowY, scale: problemsScale }}
            className="absolute -right-20 top-1/4 w-[600px] h-[600px] rounded-full bg-radial from-[#d4622b]/20 to-transparent blur-3xl pointer-events-none"
          />

          <motion.div style={{ scale: problemsScale }} className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 sm:mb-16">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs tracking-[0.16em] uppercase font-bold text-[#c93a10] mb-3"
              >
                The problem
              </motion.p>
              {/* Corner bracket framed headline with zoom effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative inline-block py-6 pr-6 sm:py-8 sm:pr-10"
              >
                <i className="absolute left-0 top-0 w-3.5 h-3.5 border-t-[1.5px] border-l-[1.5px] border-[#9b917d]" />
                <i className="absolute right-0 top-0 w-3.5 h-3.5 border-t-[1.5px] border-r-[1.5px] border-[#9b917d]" />
                <i className="absolute left-0 bottom-0 w-3.5 h-3.5 border-b-[1.5px] border-l-[1.5px] border-[#9b917d]" />
                <i className="absolute right-0 bottom-0 w-3.5 h-3.5 border-b-[1.5px] border-r-[1.5px] border-[#9b917d]" />
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1c1813] tracking-tight leading-tight">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1c1813] mr-3 align-middle animate-pulse" />
                  Why traditional offices <em className="not-italic text-[#d4622b]">hold enterprises back</em>
                </h2>
              </motion.div>
              <p className="mt-4 text-[#655d4e] text-base sm:text-xl max-w-2xl">
                A conventional corporate lease asks four things of you.
              </p>
            </div>

            {/* Two column interactive pin rail */}
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-14 items-start">
              {/* Sticky Rail Navigator */}
              <nav aria-label="Problems navigation" className="sticky top-28 hidden lg:grid pl-4 border-l-[1.5px] border-dashed border-[#d8cdb7]">
                {[
                  { id: 0, num: "01", label: "Rigid commitments" },
                  { id: 1, num: "02", label: "Operational burden" },
                  { id: 2, num: "03", label: "Heavy upfront capital" },
                  { id: 3, num: "04", label: "Ongoing financial risk" },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 4 }}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`relative text-left py-4 border-b border-[#d8cdb7] font-bold text-base transition-colors duration-300 cursor-pointer ${
                        isActive ? "text-[#c93a10]" : "text-[#655d4e] hover:text-[#1c1813]"
                      }`}
                    >
                      <small className="block text-[11px] tracking-[0.14em] uppercase text-[#655d4e] mb-0.5">
                        {item.num}
                      </small>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeRailBorder"
                          className="absolute left-0 bottom-[-1px] w-full h-[2px] bg-[#d4622b]"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Mobile Tabs */}
              <div className="flex lg:hidden overflow-x-auto gap-2 pb-2">
                {["01 Commitments", "02 Burden", "03 Capital", "04 Risk"].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      activeTab === idx
                        ? "bg-[#d4622b] text-white shadow-md"
                        : "bg-white/60 text-[#1c1813] border border-[#d8cdb7]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Topic Visual & Details */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.35fr] gap-8 items-center">
                {/* Text explanation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 0.8, 0.2, 1] }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-[#c93a10]/10 text-[#c93a10] text-xs font-bold tracking-wider mb-4">
                      {`0${activeTab + 1}`}
                    </span>
                    {activeTab === 0 && (
                      <>
                        <h3 className="text-2xl sm:text-4xl font-black text-[#1c1813] tracking-tight leading-tight">
                          Lease cycles run for years. Your business moves faster.
                        </h3>
                        <p className="mt-4 text-[#655d4e] text-base leading-relaxed">
                          Headcount shifts, teams relocate and plans change, but the lease stays the same. You pay for 80 seats whether you need 50 or 105.
                        </p>
                        <p className="mt-5 text-[#1c1813] font-bold text-sm sm:text-base flex items-center gap-3">
                          <span className="w-5 h-[2px] bg-[#d4622b] shrink-0" />
                          The traditional lease cannot shrink or grow with you.
                        </p>
                      </>
                    )}
                    {activeTab === 1 && (
                      <>
                        <h3 className="text-2xl sm:text-4xl font-black text-[#1c1813] tracking-tight leading-tight">
                          Your team ends up running an office instead of the business.
                        </h3>
                        <p className="mt-4 text-[#655d4e] text-base leading-relaxed">
                          Fit-outs, vendors and facilities need constant management. Someone has to chase vendors, fix repairs, order furniture and renew licences.
                        </p>
                        <p className="mt-5 text-[#1c1813] font-bold text-sm sm:text-base flex items-center gap-3">
                          <span className="w-5 h-[2px] bg-[#d4622b] shrink-0" />
                          Time spent on the office is time not spent on the business.
                        </p>
                      </>
                    )}
                    {activeTab === 2 && (
                      <>
                        <h3 className="text-2xl sm:text-4xl font-black text-[#1c1813] tracking-tight leading-tight">
                          Approvals, contractors and timelines come before day one, and so does the spend.
                        </h3>
                        <p className="mt-4 text-[#655d4e] text-base leading-relaxed">
                          Setup is slow, complex and expensive. You pay a lot before anyone sits down, and your team cannot work there until it is done.
                        </p>
                        <p className="mt-5 text-[#1c1813] font-bold text-sm sm:text-base flex items-center gap-3">
                          <span className="w-5 h-[2px] bg-[#d4622b] shrink-0" />
                          Big spend now, nothing to use until day one.
                        </p>
                      </>
                    )}
                    {activeTab === 3 && (
                      <>
                        <h3 className="text-2xl sm:text-4xl font-black text-[#1c1813] tracking-tight leading-tight">
                          Rent, maintenance, insurance and utilities arrive as separate payments.
                        </h3>
                        <p className="mt-4 text-[#655d4e] text-base leading-relaxed">
                          The liability stays with you for the full term, even when your needs change. If your plans change, the lease still binds you.
                        </p>
                        <p className="mt-5 text-[#1c1813] font-bold text-sm sm:text-base flex items-center gap-3">
                          <span className="w-5 h-[2px] bg-[#d4622b] shrink-0" />
                          You carry the entire financial risk until the lease ends.
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Interactive Visual Cards with Zoom transitions */}
                <div>
                  {activeTab === 0 && <TopicSeatGrid />}
                  {activeTab === 1 && <TopicTasksGauge />}
                  {activeTab === 2 && <TopicRoadToDayOne />}
                  {activeTab === 3 && <TopicSeparateBills />}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. THE ANSWER: ONE CHEQUE SOLUTION
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section ref={compareRef} id="compare" className="relative py-20 sm:py-28 lg:py-36 bg-white border-b border-[#e2e2e2] overflow-hidden">
          <motion.div style={{ y: compareY }} className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-left mb-10"
            >
              <p className="text-xs tracking-[0.16em] uppercase font-bold text-[#d4622b] mb-3">
                The answer
              </p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0b0b0b] tracking-tight leading-tight">
                One cheque solution.
              </h2>
              <p className="mt-4 text-[#585858] text-base sm:text-lg max-w-3xl leading-relaxed">
                One contract. One invoice. A traditional office means coordinating the landlord, a leasing agent, contractors, furniture suppliers and facility teams. Onward brings all of it under one agreement.
              </p>

              {/* Mode Toggle Switch */}
              <div className="inline-flex border-[1.5px] border-[#0b0b0b] rounded-full p-1 gap-1 mt-6">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => setCompareMode("trad")}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    compareMode === "trad" ? "bg-[#0b0b0b] text-white shadow-md" : "text-[#0b0b0b]"
                  }`}
                >
                  Traditional lease
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => setCompareMode("onward")}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    compareMode === "onward" ? "bg-[#d4622b] text-white shadow-md" : "text-[#0b0b0b]"
                  }`}
                >
                  With Onward
                </motion.button>
              </div>
            </motion.div>

            {/* KPI Cards with Parallax Zoom Entrance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="border-[1.5px] border-[#e2e2e2] rounded-[24px] p-6 sm:p-8 bg-[#faf9f5] shadow-sm"
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#585858]">
                  Parties you coordinate
                </h3>
                <div className="text-5xl sm:text-7xl font-black text-[#0b0b0b] my-3 leading-none overflow-hidden h-[1.1em] relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={compareMode}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`block absolute ${compareMode === "trad" ? "text-[#0b0b0b]" : "text-[#d4622b]"}`}
                    >
                      {compareMode === "trad" ? "50-60" : "1"}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="text-sm text-[#585858] min-h-[2.8em]">
                  {compareMode === "trad"
                    ? "Landlord, vendors, maintenance contractors and your own site staff, all reporting to you."
                    : "Onward. One agreement, one dedicated team, and one single point of contact."}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="border-[1.5px] border-[#e2e2e2] rounded-[24px] p-6 sm:p-8 bg-[#faf9f5] shadow-sm"
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#585858]">
                  Cheques you write each month
                </h3>
                <div className="text-5xl sm:text-7xl font-black text-[#0b0b0b] my-3 leading-none overflow-hidden h-[1.1em] relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={compareMode}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`block absolute ${compareMode === "trad" ? "text-[#0b0b0b]" : "text-[#d4622b]"}`}
                    >
                      {compareMode === "trad" ? "5" : "1"}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="text-sm text-[#585858] min-h-[2.8em]">
                  {compareMode === "trad"
                    ? "Rent, CAM, insurance, operating costs and fit-out, each billed on its own schedule."
                    : "One cheque covers everything, delivered on a single all-inclusive monthly invoice."}
                </p>
              </motion.div>
            </div>

            {/* Bills Consolidation Visual Strip */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="border-[1.5px] border-[#e2e2e2] rounded-[24px] p-6 sm:p-8 mt-4 bg-white shadow-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#585858] mb-4">
                Bills each month
              </h3>
              <div className="relative min-h-[84px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {compareMode === "trad" ? (
                    <motion.div
                      key="trad-bills"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 w-full"
                    >
                      {["Rent", "CAM", "Insurance", "Operating costs", "Fit-out"].map((item) => (
                        <div
                          key={item}
                          className="border-[1.5px] border-dashed border-[#585858] rounded-[14px] p-3 text-center bg-[#faf9f5]"
                        >
                          <b className="block text-sm font-bold text-[#0b0b0b]">{item}</b>
                          <small className="block text-[11px] text-[#585858] mt-0.5">separate bill</small>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="onward-bill"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                      className="bg-[#d4622b] text-white rounded-[16px] px-8 py-4 font-bold text-center shadow-xl"
                    >
                      <b className="text-lg block">One cheque</b>
                      <small className="block text-xs font-normal text-white/90 mt-0.5">
                        rent, CAM, insurance, operating costs & fit-out included
                      </small>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Comparison Table */}
            <div className="border-[1.5px] border-[#e2e2e2] rounded-[24px] overflow-hidden mt-4 shadow-sm">
              <div className="hidden sm:grid grid-cols-[140px_1fr_1fr] bg-[#f4f4f4] border-b border-[#e2e2e2]">
                <div className="p-4" />
                <div className="p-4 text-xs font-bold uppercase tracking-wider text-[#585858]">
                  Traditional lease
                </div>
                <div className="p-4 text-xs font-bold uppercase tracking-wider text-[#585858]">
                  With Onward
                </div>
              </div>

              {[
                {
                  key: "Term",
                  trad: "Multi-year lock-in",
                  onward: "Flexible terms that scale with your team",
                },
                {
                  key: "Operations",
                  trad: "You manage vendors and facilities",
                  onward: "Our on-site team runs operations",
                },
                {
                  key: "Setup",
                  trad: "Your capital, your contractors",
                  onward: "Tailor-made fit-out delivered by Onward",
                },
                {
                  key: "Billing",
                  trad: "Rent, CAM, insurance and utilities billed separately",
                  onward: "One cheque: one all-inclusive monthly invoice",
                },
              ].map((row, i) => (
                <motion.div
                  key={row.key}
                  whileHover={{ backgroundColor: "rgba(212, 98, 43, 0.02)" }}
                  className={`grid grid-cols-1 sm:grid-cols-[140px_1fr_1fr] border-t border-[#e2e2e2] ${
                    i === 0 ? "border-t-0" : ""
                  }`}
                >
                  <div className="p-4 font-bold text-xs uppercase tracking-wider text-[#585858] bg-[#faf9f5] sm:bg-transparent">
                    {row.key}
                  </div>
                  <div
                    className={`p-4 text-sm transition-all duration-300 ${
                      compareMode === "trad" ? "bg-[#f4f4f4] font-bold text-[#0b0b0b]" : "opacity-40 text-[#585858]"
                    }`}
                  >
                    <span className="sm:hidden font-bold text-[#585858] text-xs">Traditional: </span>
                    {row.trad}
                  </div>
                  <div
                    className={`p-4 text-sm transition-all duration-300 ${
                      compareMode === "onward"
                        ? "bg-[#d4622b] text-white font-bold"
                        : "opacity-40 text-[#585858]"
                    }`}
                  >
                    <span className="sm:hidden font-bold text-[#585858] text-xs">Onward: </span>
                    {row.onward}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. CAPABILITY WEB SECTION
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <CapabilityWebSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. WHAT CHANGES FOR YOUR ENTERPRISE WITH ONWARD
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={benefitsRef}
          id="benefits"
          className="relative py-20 sm:py-28 lg:py-36 bg-[#f4f4f4] border-b border-[#e2e2e2] overflow-hidden"
        >
          <motion.div style={{ scale: benefitsScale }} className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left mb-10"
            >
              <p className="text-xs tracking-[0.16em] uppercase font-bold text-[#d4622b] mb-3">
                The payoff
              </p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0b0b0b] tracking-tight leading-tight">
                What changes for your enterprise with Onward
              </h2>
              <p className="mt-4 text-[#585858] text-base sm:text-lg max-w-2xl leading-relaxed">
                Six things change when your office becomes one agreement and one cheque.
              </p>
            </motion.div>

            {/* 6 Icons Grid with Zoom & Rotate Physics */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3.5">
              {BENEFITS_DATA.map((ben, i) => {
                const isSelected = hoveredBenefit === ben.id;
                return (
                  <motion.button
                    key={ben.id}
                    initial={{ opacity: 0, scale: 0.88, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.12, rotate: -3 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onMouseEnter={() => setHoveredBenefit(ben.id)}
                    onFocus={() => setHoveredBenefit(ben.id)}
                    onClick={() => setHoveredBenefit(ben.id)}
                    className={`aspect-square flex items-center justify-center p-3 rounded-[24px] border-[1.5px] transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-[#d4622b] bg-[#d4622b] text-white -translate-y-2 shadow-[0_20px_40px_-15px_rgba(212,98,43,0.5)]"
                        : "border-[#e2e2e2] bg-white text-[#0b0b0b] hover:border-[#d4622b] shadow-sm"
                    }`}
                  >
                    <span className="w-10 h-10 sm:w-12 sm:h-12 block">
                      {ben.icon}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Detail Dynamic Panel with Zoom Reveal */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBenefit?.id || "empty"}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="mt-6 min-h-[118px] flex items-center p-6 sm:p-8 border-[1.5px] border-[#e2e2e2] rounded-[24px] bg-white shadow-sm"
              >
                {selectedBenefit ? (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0b0b0b] tracking-tight">
                      {selectedBenefit.title}
                    </h3>
                    <p className="mt-1.5 text-[#585858] text-sm sm:text-base leading-relaxed max-w-3xl">
                      {selectedBenefit.desc}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#585858] text-sm sm:text-base">
                      Hover or tap any icon above to see what changes for your organization.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            6. ENTERPRISE ENQUIRIES: GET IN TOUCH (STANDARD FORM)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ContactSection
          title="Enterprise enquiries: Get in touch."
          highlight="Get in touch."
          description="Tell us your team size and preferred location. We will match you to the right workspace within 24 hours."
        />
      </main>

      <Footer />
    </>
  );
}
