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
   PROBLEMS SECTION WITH SCROLL-SCRUBBED STORY ENGINE
   Exact replica of Onward Enterprise HTML Animation Engine
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ProblemsSection() {
  const [team, setTeam] = useState(50);
  const [activeTab, setActiveTab] = useState(0);

  const TOPICS = [
    {
      num: "01",
      railLabel: "Rigid commitments",
      title: "You sign for years. Your team changes every few months.",
      desc: "A lease fixes how many seats you pay for. Hire more people and you run out of room. Lose a few and you keep paying for empty desks.",
      key: "The traditional lease cannot shrink or grow with you.",
    },
    {
      num: "02",
      railLabel: "Operational burden",
      title: "Your own team ends up running the office.",
      desc: "Someone has to chase vendors, fix repairs, order furniture and renew licences. That someone is usually your staff, who have real work to do.",
      key: "Time spent on the office is time not spent on the business.",
    },
    {
      num: "03",
      railLabel: "Heavy upfront capital",
      title: "You pay a lot before anyone sits down.",
      desc: "You get approvals, hire contractors and build the interiors first. All of it costs money, and your team cannot work there until it is done.",
      key: "Big spend now, nothing to use until day one.",
    },
    {
      num: "04",
      railLabel: "Ongoing financial risk",
      title: "Many bills, and you owe all of them.",
      desc: "Rent, maintenance charges, insurance and running costs arrive separately, every month. If your plans change, the lease still binds you.",
      key: "You carry the risk until the lease ends.",
    },
  ];

  const LEASE = 80;
  const MAXOVER = 30;

  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pframeRef = useRef<HTMLDivElement>(null);

  const topicRefs = useRef<(HTMLElement | null)[]>([]);
  const txtRefs = useRef<(HTMLDivElement | null)[]>([]);
  const vcRefs = useRef<(HTMLDivElement | null)[]>([]);
  const capRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const garcRef = useRef<SVGCircleElement | null>(null);
  const gpctRef = useRef<HTMLElement | null>(null);
  const cntRef = useRef<HTMLElement | null>(null);
  const fillbRef = useRef<HTMLDivElement | null>(null);
  const spendBRef = useRef<HTMLElement | null>(null);
  const workBRef = useRef<HTMLElement | null>(null);
  const termARef = useRef<HTMLDivElement | null>(null);
  const termBRef = useRef<HTMLDivElement | null>(null);
  const termLRef = useRef<HTMLDivElement | null>(null);

  const timersRef = useRef<[NodeJS.Timeout[], NodeJS.Timeout[], NodeJS.Timeout[], NodeJS.Timeout[]]>([[], [], [], []]);
  const awayRef = useRef<boolean[]>([false, false, false, false]);
  const playingRef = useRef<boolean[]>([false, false, false, false]);
  const activeRef = useRef<number>(-1);

  const setCap = useCallback((i: number, txt: string) => {
    const c = capRefs.current[i];
    if (!c || c.textContent === txt) return;
    c.textContent = txt;
    c.classList.remove("swap");
    void c.offsetWidth;
    c.classList.add("swap");
  }, []);

  const s1 = useCallback((k: number) => {
    if (!storyRef.current) return;
    const ts = storyRef.current.querySelectorAll<HTMLElement>("#t1 .task");
    ts.forEach((t, j) => {
      t.classList.toggle("off", j >= k);
    });
    if (k > 0 && ts[k - 1]) {
      const t = ts[k - 1];
      t.classList.add("hit");
      setTimeout(() => t.classList.remove("hit"), 600);
    }
    if (cntRef.current) cntRef.current.textContent = String(k);
    if (garcRef.current) garcRef.current.style.strokeDashoffset = String(k * 7.5);
    if (gpctRef.current) gpctRef.current.textContent = Math.round(100 - k * 7.5) + "%";
    setCap(
      1,
      k < 3
        ? "The jobs start landing on your team, one by one."
        : k < 8
        ? "More piles up: repairs, billing, renewals."
        : "Eight side jobs, and none of them is your real work."
    );
  }, [setCap]);

  const s2 = useCallback((n: number) => {
    if (!storyRef.current) return;
    const f = n < 0 ? 0 : n / 3;
    const stps = storyRef.current.querySelectorAll<HTMLElement>("#t2 .stp");
    stps.forEach((x, q) => {
      x.classList.toggle("off", q > n);
      if (q === 3) x.classList.toggle("go", n === 3);
    });
    if (fillbRef.current) fillbRef.current.style.transform = `scaleY(${f})`;
    if (spendBRef.current) spendBRef.current.style.width = `${f * 100}%`;
    if (workBRef.current) workBRef.current.style.width = n === 3 ? "25%" : "0%";
    setCap(2, ROAD_CAPTIONS[n + 1] || ROAD_CAPTIONS[0]);
  }, [setCap]);

  const s3 = useCallback((n: number, ta: boolean, tb: boolean) => {
    if (!storyRef.current) return;
    const dots = storyRef.current.querySelectorAll<HTMLElement>("#t3 .dots i");
    dots.forEach((d) => {
      const c = Number(d.getAttribute("data-c"));
      d.classList.toggle("off", c >= n);
    });
    if (termARef.current) termARef.current.classList.toggle("off", !ta);
    if (termBRef.current) termBRef.current.classList.toggle("off", !tb);
    if (termLRef.current) termLRef.current.classList.toggle("off", !tb);
    setCap(
      3,
      tb
        ? "Plans change, but the bills and the commitment carry on."
        : n >= 7
        ? "The same five come back next month, and the next."
        : "Every month, five separate bills arrive."
    );
  }, [setCap]);

  const stopT = useCallback((i: number) => {
    timersRef.current[i].forEach(clearTimeout);
    timersRef.current[i] = [];
  }, []);

  const at = useCallback((i: number, ms: number, fn: () => void) => {
    timersRef.current[i].push(setTimeout(fn, ms));
  }, []);

  const resetState = useCallback((i: number) => {
    if (i === 1) s1(0);
    if (i === 2) s2(-1);
    if (i === 3) s3(0, false, false);
  }, [s1, s2, s3]);

  const toAway = useCallback((i: number) => {
    if (awayRef.current[i]) return;
    awayRef.current[i] = true;
    playingRef.current[i] = false;
    stopT(i);
    resetState(i);
  }, [stopT, resetState]);

  const toPlay = useCallback((i: number) => {
    awayRef.current[i] = false;
    if (playingRef.current[i]) return;
    playingRef.current[i] = true;
    stopT(i);
    if (i === 1) {
      for (let k = 1; k <= 8; k++) {
        ((kVal) => at(1, 150 + kVal * 260, () => s1(kVal)))(k);
      }
    } else if (i === 2) {
      for (let n = 0; n < 4; n++) {
        ((nVal) => at(2, 200 + nVal * 750, () => s2(nVal)))(n);
      }
    } else if (i === 3) {
      for (let c = 1; c <= 12; c++) {
        ((cVal) => at(3, 300 + cVal * 210, () => s3(cVal, false, false)))(c);
      }
      at(3, 3300, () => {
        s3(12, true, false);
        setCap(3, "Your plans change here.");
      });
      at(3, 4900, () => {
        s3(12, true, true);
      });
    }
  }, [at, stopT, s1, s2, s3, setCap]);

  useEffect(() => {
    const pframe = pframeRef.current;
    if (pframe) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      io.observe(pframe);
    }

    const story = storyRef.current;
    const pin = pinRef.current;
    const rail = railRef.current;
    const glow = glowRef.current;
    if (!story || !pin || !rail) return;

    const mqS = window.matchMedia("(min-width: 861px) and (min-height: 620px)");
    const N = 4;
    const STK = 84;
    let ticking = false;

    function clamp(x: number, lo: number, hi: number) {
      return Math.max(lo, Math.min(hi, x));
    }

    function setActive(idx: number) {
      if (idx === activeRef.current) return;
      activeRef.current = idx;
      setActiveTab(idx);
      if (glow) {
        glow.style.setProperty("--gt", `${180 + idx * 90}px`);
      }
    }

    function frame() {
      ticking = false;
      if (!story || !pin || !rail) return;
      const vh = window.innerHeight;
      const sr = story.getBoundingClientRect();
      const scrub = mqS.matches;
      story.classList.toggle("scrub", scrub);

      let pick = 0;
      if (scrub) {
        const total = Math.max(1, story.offsetHeight - pin.offsetHeight);
        const p = clamp((STK - sr.top) / total, 0, 1);
        const pos = clamp((p - 0.02) / 0.94, 0, 1) * (N - 1);
        const enter = clamp((vh - sr.top) / (vh * 0.25), 0, 1);
        rail.style.setProperty("--prog", (pos / (N - 1)).toFixed(3));
        pick = Math.round(pos);

        for (let i = 0; i < N; i++) {
          let d = pos - i;
          if ((i === 0 && d < 0) || (i === N - 1 && d > 0)) d = 0;
          const ad = Math.abs(d);
          let o = clamp((0.5 - ad) / 0.2, 0, 1) * enter;
          if (i === 0 && pos < 0.25 && enter > 0.3) {
            o = Math.max(o, enter);
          }
          const dd = clamp(d, -1, 1);

          const tx = txtRefs.current[i];
          const vc = vcRefs.current[i];
          const topic = topicRefs.current[i];

          if (tx) {
            tx.style.opacity = o.toFixed(3);
            tx.style.transform = `translateY(${(-dd * 44 + (1 - enter) * 26).toFixed(1)}px)`;
          }
          if (vc) {
            vc.style.opacity = o.toFixed(3);
            vc.style.transform = `translateY(${(-dd * 64 + (1 - enter) * 44).toFixed(1)}px)`;
          }
          if (topic) {
            topic.style.visibility = o < 0.02 ? "hidden" : "visible";
            topic.style.pointerEvents = o > 0.5 ? "auto" : "none";
          }

          if (ad >= 0.5 || enter < 0.3 || sr.bottom < vh * 0.1) {
            toAway(i);
          } else if (ad < 0.3 && enter > 0.6 && sr.top < vh * 0.5) {
            toPlay(i);
          }
        }
      } else {
        for (let i = 0; i < N; i++) {
          const topic = topicRefs.current[i];
          const tx = txtRefs.current[i];
          const vc = vcRefs.current[i];
          if (!topic || !tx || !vc) continue;

          const r = topic.getBoundingClientRect();
          const e = clamp((vh * 0.95 - r.top) / (vh * 0.3), 0, 1);
          tx.style.opacity = e.toFixed(3);
          tx.style.transform = `translateY(${((1 - e) * 26).toFixed(1)}px)`;
          vc.style.opacity = e.toFixed(3);
          vc.style.transform = `translateY(${((1 - e) * 44).toFixed(1)}px)`;
          topic.style.visibility = "visible";
          topic.style.pointerEvents = "auto";

          const cr = vc.getBoundingClientRect();
          if (cr.top > vh * 0.98 || cr.bottom < 0) {
            toAway(i);
          } else if (e > 0.85 && cr.top < vh * 0.62 && cr.bottom > vh * 0.38) {
            toPlay(i);
          }
        }
      }
      setActive(pick);
    }

    function req() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    }

    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    if (mqS.addEventListener) mqS.addEventListener("change", req);

    resetState(1);
    resetState(2);
    resetState(3);
    req();

    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      if (mqS.removeEventListener) mqS.removeEventListener("change", req);
      [0, 1, 2, 3].forEach(stopT);
    };
  }, [toAway, toPlay, resetState, stopT]);

  const handleRailClick = (i: number) => {
    const story = storyRef.current;
    const pin = pinRef.current;
    if (!story || !pin) return;
    const mqS = window.matchMedia("(min-width: 861px) and (min-height: 620px)");
    let y: number;
    if (mqS.matches) {
      const sr = story.getBoundingClientRect();
      const total = Math.max(1, story.offsetHeight - pin.offsetHeight);
      y = window.scrollY + sr.top - 84 + ((i / 3) * 0.88 + 0.06) * total;
    } else {
      const topic = topicRefs.current[i];
      if (topic) {
        y = window.scrollY + topic.getBoundingClientRect().top - 90;
      } else {
        y = window.scrollY;
      }
    }
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const gapCount = Math.abs(team - LEASE);
  const isUnder = team <= LEASE;

  return (
    <section id="problems" ref={sectionRef} className="inv sec">
      <style>{`
        #problems {
          overflow: visible;
          --inv-bg: #efe8da;
          --inv-fg: #1c1813;
          --inv-muted: #655d4e;
          --inv-line: #d8cdb7;
          --inv-surface: #f8f4ea;
          --ot: #c93a10;
          --orange: #d4622b;
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
          background: var(--inv-bg);
          color: var(--inv-fg);
          padding-block: clamp(40px, 6vw, 80px);
          border-bottom: 1px solid var(--inv-line);
        }
        #problems .wrap { max-width: 1180px; margin-inline: auto; padding-inline: clamp(16px, 4vw, 32px); }
        #problems .sec-head { margin-bottom: clamp(24px, 4vw, 40px); }
        #problems .eyebrow { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; color: var(--ot); margin-bottom: 8px; }
        #problems .sec-head h2 { font-size: clamp(28px, 3.8vw, 52px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; color: var(--inv-fg); }
        #problems .sec-head h2 em { font-style: normal; color: var(--orange); }
        #problems .lede { margin-top: 14px; font-size: clamp(16px, 1.4vw, 18px); color: var(--inv-muted); max-width: 50ch; line-height: 1.5; }

        /* framed headline: corner brackets draw in */
        #problems .frame { position: relative; max-width: max-content; padding: clamp(24px, 3.2vw, 44px) 0; }
        #problems .frame > i { position: absolute; width: 14px; height: 14px; border: 1.5px solid #9b917d; transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1); }
        #problems .frame > i:nth-of-type(1) { left: 0; top: 0; border-right: 0; border-bottom: 0; }
        #problems .frame > i:nth-of-type(2) { right: 0; top: 0; border-left: 0; border-bottom: 0; }
        #problems .frame > i:nth-of-type(3) { left: 0; bottom: 0; border-right: 0; border-top: 0; }
        #problems .frame > i:nth-of-type(4) { right: 0; bottom: 0; border-left: 0; border-top: 0; }
        #problems .frame:not(.in) > i { opacity: 0; }
        #problems .frame:not(.in) > i:nth-of-type(1) { transform: translate(18px, 18px); }
        #problems .frame:not(.in) > i:nth-of-type(2) { transform: translate(-18px, 18px); }
        #problems .frame:not(.in) > i:nth-of-type(3) { transform: translate(18px, -18px); }
        #problems .frame:not(.in) > i:nth-of-type(4) { transform: translate(-18px, -18px); }

        #problems .dot { display: inline-block; width: 0.22em; height: 0.22em; border-radius: 50%; background: #1c1813; margin-right: 0.35em; vertical-align: 0.25em; animation: pulseDot 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        @keyframes pulseDot { 50% { transform: scale(1.6); opacity: 0.55; } }

        /* Story layout */
        #problems .story { position: relative; }
        #problems .pin { display: grid; grid-template-columns: minmax(0, 230px) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: start; }
        #problems .glow { display: block; position: absolute; right: -10%; top: var(--gt, 200px); width: min(560px, 56vw); aspect-ratio: 1; margin-top: -280px; border-radius: 50%; background: radial-gradient(closest-side, rgba(212, 98, 43, 0.18), rgba(212, 98, 43, 0)); filter: blur(24px); pointer-events: none; transition: top 1.4s var(--ease); }
        #problems .rail { position: sticky; top: max(96px, calc(50vh - 170px)); display: grid; padding-left: 22px; z-index: 1; }
        #problems .rail::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; border-left: 1.5px dashed var(--inv-line); }
        #problems .rail::after { content: ""; position: absolute; left: 0; top: 0; width: 1.5px; height: calc(var(--prog, 0) * 100%); background: var(--orange); transition: height 0.25s linear; }
        #problems .rl { all: unset; box-sizing: border-box; cursor: pointer; display: block; position: relative; padding: 16px 0; border-bottom: 1px solid var(--inv-line); color: var(--inv-muted); font-weight: 700; font-size: 16px; letter-spacing: -0.01em; transition: color 0.4s var(--ease); }
        #problems .rl small { display: block; font-size: 11px; letter-spacing: 0.14em; margin-bottom: 2px; color: var(--inv-muted); text-transform: uppercase; }
        #problems .rl::after { content: ""; position: absolute; left: 0; bottom: -1px; height: 2px; width: 100%; background: var(--orange); transform: scaleX(0); transform-origin: left; transition: transform 0.6s var(--ease); }
        #problems .rl:hover { color: var(--inv-fg); }
        #problems .rl[aria-current="true"] { color: var(--orange); }
        #problems .rl[aria-current="true"]::after { transform: scaleX(1); }
        #problems .rl:focus-visible { outline: 3px solid var(--orange); outline-offset: 4px; }

        #problems .topics { display: grid; gap: clamp(40px, 8vh, 90px); min-width: 0; position: relative; z-index: 1; }
        #problems .topic { scroll-margin-top: 100px; }
        #problems .tin { display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: clamp(24px, 3.4vw, 52px); align-items: center; }

        #problems .story.scrub { height: calc(100vh + 150vh); }
        #problems .story.scrub .pin { position: sticky; top: 84px; height: calc(100vh - 104px); min-height: 580px; align-items: center; }
        #problems .story.scrub .rail { position: relative; top: auto; }
        #problems .story.scrub .topics { display: grid; gap: 0; height: 100%; align-items: center; }
        #problems .story.scrub .topic { grid-area: 1 / 1; align-self: center; will-change: opacity, transform; }

        #problems .ttxt { min-width: 0; }
        #problems .pl { display: inline-block; padding: 5px 11px; border-radius: 999px; background: rgba(201, 58, 16, 0.10); color: var(--ot); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; }
        #problems .topic h3 { font-size: clamp(26px, 3vw, 42px); line-height: 1.1; letter-spacing: -0.04em; font-weight: 800; margin-top: 16px; color: #1c1813; }
        #problems .topic .txt { margin-top: 14px; color: var(--inv-muted); font-size: clamp(15px, 1.2vw, 17px); line-height: 1.55; max-width: 36ch; }
        #problems .topic .key { margin-top: 20px; font-weight: 700; font-size: 15px; max-width: 36ch; display: flex; gap: 10px; align-items: baseline; color: #1c1813; }
        #problems .topic .key::before { content: ""; flex: none; width: 20px; height: 2px; background: var(--orange); transform: translateY(-4px); }

        #problems .vcard { overflow: hidden; display: flex; flex-direction: column; min-height: 490px; background: #fbf8f1; border: 1px solid var(--inv-line); border-radius: 22px; padding: clamp(18px, 2vw, 26px); min-width: 0; box-shadow: 0 24px 50px -34px rgba(60, 40, 10, 0.35); transition: border-color 0.5s var(--ease), transform 0.7s var(--ease); }
        #problems .topic.act .vcard { border-color: rgba(201, 58, 16, 0.5); }
        #problems .vtop { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 14px; }
        #problems .vl { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--inv-muted); font-weight: 700; }
        #problems .cap { margin-top: auto; padding: 12px 14px; border-radius: 12px; background: rgba(201, 58, 16, 0.08); color: var(--inv-fg); font-size: 14px; font-weight: 700; min-height: 3.2em; display: flex; align-items: center; }
        #problems .cap.swap { animation: sharp 0.6s var(--ease) both; }
        @keyframes sharp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

        /* 01 seat grid */
        #problems .ctl { display: grid; gap: 10px; margin-bottom: 16px; }
        #problems .stepper { display: flex; align-items: center; gap: 12px; }
        #problems .sbtn { flex: none; width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--inv-line); background: transparent; color: var(--inv-fg); font: 700 20px/1 inherit; display: grid; place-items: center; cursor: pointer; transition: background 0.3s var(--ease), border-color 0.3s var(--ease), color 0.3s var(--ease), transform 0.2s var(--ease); }
        #problems .sbtn:hover { background: var(--orange); border-color: var(--orange); color: #fff; }
        #problems .sbtn:active { transform: scale(0.92); }
        #problems .stepper .range { flex: 1; min-width: 0; }
        #problems .ctl-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
        #problems .ctl label { font-weight: 700; font-size: 14px; }
        #problems .rv { font-weight: 700; color: var(--orange); font-variant-numeric: tabular-nums; font-size: 18px; }
        #problems .range { width: 100%; accent-color: var(--orange); height: 26px; margin: 0; cursor: pointer; }
        #problems .lease { position: relative; border: 1.5px dashed var(--inv-line); border-radius: 14px; padding: 22px 10px 10px; margin-top: 4px; }
        #problems .lease > b { position: absolute; top: -9px; left: 12px; padding: 0 8px; background: #fbf8f1; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--inv-muted); }
        #problems .seats, #problems .over { display: grid; grid-template-columns: repeat(16, minmax(0, 1fr)); gap: 4px; }
        #problems .over { margin-top: 8px; }
        #problems .seat { aspect-ratio: 1; border-radius: 3px; border: 1.5px dashed #a89d86; background: transparent; transition: background 0.35s var(--ease), border-color 0.35s var(--ease), transform 0.35s var(--ease); }
        #problems .seat.on { background: var(--orange); border: 1.5px solid var(--orange); }
        #problems .seat.x { border: 1.5px dashed var(--orange); visibility: hidden; }
        #problems .seat.x.vis { visibility: visible; animation: popIn 0.35s var(--ease) both; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        #problems .legend { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 12px; font-size: 12px; color: var(--inv-muted); }
        #problems .legend span { display: inline-flex; align-items: center; gap: 6px; }
        #problems .sw { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
        #problems .tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 14px; margin-bottom: 14px; }
        #problems .stat { border: 1px solid var(--inv-line); border-radius: 12px; padding: 12px; background: rgba(255, 255, 255, 0.4); }
        #problems .stat b { display: block; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.04em; line-height: 1; font-variant-numeric: tabular-nums; color: #1c1813; }
        #problems .stat span { display: block; margin-top: 6px; font-size: 12px; color: var(--inv-muted); }
        #problems .stat.hot b { color: var(--orange); }

        /* 02 tasks */
        #problems .gtop { display: flex; align-items: center; gap: 18px; margin-bottom: 14px; }
        #problems .gauge { position: relative; flex: none; width: 104px; height: 104px; }
        #problems .gauge svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        #problems .gauge circle { fill: none; stroke-width: 9; stroke-linecap: round; }
        #problems .gbg { stroke: var(--inv-line); }
        #problems .garc { stroke: var(--orange); stroke-dasharray: 100; stroke-dashoffset: 60; transition: stroke-dashoffset 0.7s cubic-bezier(0.34, 1.3, 0.64, 1); }
        #problems .gnum { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
        #problems .gnum b { font-size: 24px; letter-spacing: -0.04em; line-height: 1; font-variant-numeric: tabular-nums; color: #1c1813; }
        #problems .gnum span { font-size: 10px; color: var(--inv-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }
        #problems .gtxt { min-width: 0; }
        #problems .gtxt b { display: block; font-size: clamp(36px, 4.5vw, 50px); letter-spacing: -0.05em; line-height: 1; color: var(--orange); font-variant-numeric: tabular-nums; }
        #problems .gtxt span { display: block; margin-top: 4px; font-size: 13px; color: var(--inv-muted); max-width: 30ch; }
        #problems .tasks { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-bottom: 14px; }
        #problems .task { display: flex; align-items: center; gap: 10px; padding: 9px 11px; border: 1px solid var(--inv-line); border-radius: 10px; font-weight: 700; font-size: 13px; background: #fff; color: #1c1813; transition: opacity 0.5s var(--ease), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s var(--ease), background 0.6s var(--ease); }
        #problems .task i { flex: none; width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--orange); }
        #problems .task.off { opacity: 0; transform: translateX(40px) scale(0.92); }
        #problems .task.hit { border-color: var(--orange); background: rgba(255, 77, 28, 0.14); }

        /* 03 road to day one */
        #problems .road { position: relative; display: grid; grid-auto-rows: 54px; gap: 8px; padding-left: 34px; margin-top: 6px; }
        #problems .track { position: absolute; left: 8px; top: 27px; bottom: 27px; width: 4px; background: var(--inv-line); border-radius: 2px; overflow: hidden; }
        #problems .fillb { width: 100%; height: 100%; background: var(--orange); transform-origin: top; transition: transform 0.5s linear; }
        #problems button.stp { font: inherit; text-align: left; color: inherit; background: #fff; cursor: pointer; width: 100%; }
        #problems .stp { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 10px; align-items: center; border: 1px solid var(--orange); border-radius: 11px; padding: 0 12px; align-content: center; font-weight: 700; font-size: 14px; transition: opacity 0.5s var(--ease), border-color 0.5s var(--ease), background 0.3s var(--ease); }
        #problems .stp::before { content: ""; box-sizing: border-box; position: absolute; left: -33px; top: 50%; width: 16px; height: 16px; margin-top: -8px; border-radius: 50%; background: var(--orange); border: 3px solid var(--orange); transition: background 0.3s var(--ease) 0.3s, border-color 0.3s var(--ease) 0.3s; }
        #problems .stp small { grid-column: 1; display: block; font-weight: 400; color: var(--inv-muted); font-size: 11px; margin-top: 1px; }
        #problems .stp .cost { grid-column: 2; grid-row: 1 / span 2; text-align: right; font-weight: 700; font-size: 11px; color: var(--orange); white-space: nowrap; transition: opacity 0.5s var(--ease); }
        #problems .stp.go { background: var(--orange); border-color: var(--orange); color: #fff; }
        #problems .stp.go small { color: rgba(255, 255, 255, 0.85); }
        #problems .stp.off { opacity: 0.35; background: transparent; border-color: var(--inv-line); }
        #problems .stp.off::before { background: #f8f4ea; border-color: var(--inv-line); }
        #problems .stp.off .cost { opacity: 0; }
        #problems .bars2 { display: grid; gap: 8px; margin-top: 14px; margin-bottom: 14px; }
        #problems .b2 { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 10px; align-items: center; font-size: 12px; color: var(--inv-muted); }
        #problems .b2t { height: 9px; border-radius: 5px; background: var(--inv-line); overflow: hidden; }
        #problems .b2t i { display: block; height: 100%; border-radius: 5px; background: linear-gradient(90deg, var(--orange), #ff9a73, var(--orange)); background-size: 200% 100%; animation: shim 2.4s linear infinite; transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes shim { to { background-position: -200% 0; } }
        #problems #spendB { width: 100%; }
        #problems #workB { width: 25%; margin-left: 75%; }

        /* 04 separate bills */
        #problems .ledger { display: grid; gap: 8px; margin-top: 4px; }
        #problems .lr { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 10px; align-items: center; font-size: 13px; font-weight: 700; }
        #problems .lr > span { color: var(--inv-fg); }
        #problems .dots, #problems .dots2 { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); justify-items: center; align-items: center; min-height: 16px; }
        #problems .dots i { width: var(--s, 11px); height: var(--s, 11px); border-radius: 50%; background: var(--orange); transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s var(--ease); }
        #problems .lr[data-v="1"] .dots i { opacity: 0.85; }
        #problems .dots i.off { transform: scale(0); opacity: 0; }
        #problems .dots2 i { font-style: normal; font-weight: 400; font-size: 10px; color: #8a8070; }
        #problems .term { margin-top: 20px; margin-bottom: 14px; }
        #problems .term-bar { display: flex; height: 16px; border-radius: 8px; overflow: hidden; border: 1px solid var(--inv-line); }
        #problems .term-a { width: 40%; background: var(--orange); transition: width 1.3s var(--ease); }
        #problems .term-b { width: 60%; border-left: 2px dashed var(--inv-fg); background: repeating-linear-gradient(135deg, rgba(212, 98, 43, 0.35) 0 6px, transparent 6px 12px); transition: opacity 0.8s var(--ease); }
        #problems .term-a.off { width: 0; }
        #problems .term-b.off { opacity: 0; }
        #problems .term-l { display: flex; margin-top: 6px; font-size: 12px; color: var(--inv-muted); gap: 10px; }
        #problems .term-l span { transition: opacity 0.6s var(--ease); }
        #problems .term-l span:first-child { flex: 0 0 40%; color: var(--orange); font-weight: 700; }
        #problems .term-l.off span { opacity: 0; }

        @media (max-width: 860px) {
          #problems .pin { grid-template-columns: minmax(0, 1fr); }
          #problems .rail, #problems .glow { display: none; }
          #problems .tin { grid-template-columns: minmax(0, 1fr); }
          #problems .topics { gap: 48px; }
          #problems .tasks { grid-template-columns: minmax(0, 1fr); }
          #problems .tiles { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">The problem</p>
          <div className="frame pframe" id="pframe" ref={pframeRef}>
            <i></i><i></i><i></i><i></i>
            <h2>
              <span className="dot" aria-hidden="true"></span>
              Why traditional offices <em>hold enterprises back</em>
            </h2>
          </div>
          <p className="lede">A conventional corporate lease asks four things of you.</p>
        </div>

        <div className="story" id="story" ref={storyRef}>
          <div className="glow" id="glow" ref={glowRef} aria-hidden="true" />
          <div className="pin" id="pin" ref={pinRef}>
            {/* Sticky Navigation Rail */}
            <nav className="rail" id="rail" ref={railRef} aria-label="Problems navigation">
              {TOPICS.map((t, idx) => (
                <button
                  key={t.num}
                  className="rl"
                  type="button"
                  aria-current={activeTab === idx ? "true" : undefined}
                  onClick={() => handleRailClick(idx)}
                >
                  <small>{t.num}</small>
                  {t.railLabel}
                </button>
              ))}
            </nav>

            <div className="topics">
              {/* TOPIC 01: SEAT GRID */}
              <article
                className={`topic ${activeTab === 0 ? "act" : ""}`}
                id="t0"
                ref={(el) => {
                  topicRefs.current[0] = el;
                }}
              >
                <div className="tin">
                  <div
                    className="ttxt"
                    ref={(el) => {
                      txtRefs.current[0] = el;
                    }}
                  >
                    <span className="pl">01</span>
                    <h3>{TOPICS[0].title}</h3>
                    <p className="txt">{TOPICS[0].desc}</p>
                    <p className="key">{TOPICS[0].key}</p>
                  </div>
                  <div
                    className="vcard"
                    ref={(el) => {
                      vcRefs.current[0] = el;
                    }}
                  >
                    <div className="vtop">
                      <span className="vl">Try it: change your team size</span>
                    </div>
                    <div className="ctl">
                      <div className="ctl-row">
                        <label htmlFor="teamRange">Your team</label>
                        <span className="rv" id="rVal">{team} people</span>
                      </div>
                      <div className="stepper">
                        <button
                          className="sbtn"
                          type="button"
                          id="dec"
                          aria-label="Remove 5 people"
                          onClick={() => setTeam((v) => Math.max(20, v - 5))}
                        >
                          &minus;
                        </button>
                        <input
                          className="range"
                          type="range"
                          id="teamRange"
                          min={20}
                          max={110}
                          step={5}
                          value={team}
                          onChange={(e) => setTeam(Number(e.target.value))}
                        />
                        <button
                          className="sbtn"
                          type="button"
                          id="inc"
                          aria-label="Add 5 people"
                          onClick={() => setTeam((v) => Math.min(110, v + 5))}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="lease">
                      <b>Your lease: 80 seats</b>
                      <div className="seats" id="seats" aria-hidden="true">
                        {Array.from({ length: LEASE }).map((_, i) => {
                          const inUse = i < team;
                          const delayMs = (i % 16) * 10 + Math.floor(i / 16) * 14;
                          const animDelayMs = (i % 16) * 110 + Math.floor(i / 16) * 140;
                          return (
                            <span
                              key={i}
                              className={`seat ${inUse ? "on" : ""}`}
                              style={{
                                transitionDelay: `${delayMs}ms`,
                                animationDelay: `${animDelayMs}ms`,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="over" id="over" aria-hidden="true">
                      {Array.from({ length: MAXOVER }).map((_, i) => {
                        const isVis = i < Math.max(0, team - LEASE);
                        return (
                          <span
                            key={i}
                            className={`seat x ${isVis ? "vis" : ""}`}
                          />
                        );
                      })}
                    </div>

                    <div className="legend">
                      <span><i className="sw" style={{ background: "var(--orange)" }} />In use</span>
                      <span><i className="sw" style={{ border: "1.5px dashed var(--inv-muted)" }} />Empty, still paid for</span>
                      <span><i className="sw" style={{ border: "1.5px dashed var(--orange)" }} />Over your lease</span>
                    </div>

                    <div className="tiles">
                      <div className="stat"><b>80</b><span>seats on a lease</span></div>
                      <div className="stat hot">
                        <b id="sGap">{gapCount}</b>
                        <span id="sGapL">{isUnder ? "empty, still paid for" : "seats short"}</span>
                      </div>
                      <div className="stat"><b id="sOnw">{team}</b><span>seats billed with Onward</span></div>
                    </div>

                    <p className="cap" id="cap0" ref={(el) => { capRefs.current[0] = el; }}>
                      {team < LEASE
                        ? `${gapCount} desks sit empty, and you still pay for all 80.`
                        : team === LEASE
                        ? "You lease 80 seats and have 80 people. It fits."
                        : `${gapCount} people have no desk. The lease cannot stretch.`}
                    </p>
                  </div>
                </div>
              </article>

              {/* TOPIC 02: OPERATIONAL BURDEN */}
              <article
                className={`topic ${activeTab === 1 ? "act" : ""}`}
                id="t1"
                ref={(el) => {
                  topicRefs.current[1] = el;
                }}
              >
                <div className="tin">
                  <div
                    className="ttxt"
                    ref={(el) => {
                      txtRefs.current[1] = el;
                    }}
                  >
                    <span className="pl">02</span>
                    <h3>{TOPICS[1].title}</h3>
                    <p className="txt">{TOPICS[1].desc}</p>
                    <p className="key">{TOPICS[1].key}</p>
                  </div>
                  <div
                    className="vcard"
                    ref={(el) => {
                      vcRefs.current[1] = el;
                    }}
                  >
                    <div className="vtop">
                      <span className="vl">Extra work for your team (illustrative)</span>
                    </div>
                    <div className="gtop">
                      <div className="gauge" id="gauge">
                        <svg viewBox="0 0 120 120" aria-hidden="true">
                          <circle className="gbg" cx="60" cy="60" r="50" />
                          <circle className="garc" id="garc" ref={garcRef} cx="60" cy="60" r="50" pathLength="100" />
                        </svg>
                        <div className="gnum">
                          <b id="gpct" ref={gpctRef}>100%</b>
                          <span>focus</span>
                        </div>
                      </div>
                      <div className="gtxt">
                        <b id="cnt" ref={cntRef}>0</b>
                        <span>side jobs added to your team&#8217;s day</span>
                      </div>
                    </div>

                    <div className="tasks">
                      {TASKS_LIST.map((task) => (
                        <div key={task} className="task off">
                          <i></i>{task}
                        </div>
                      ))}
                    </div>

                    <p className="cap" id="cap1" ref={(el) => { capRefs.current[1] = el; }}>
                      Each job lands on your team.
                    </p>
                  </div>
                </div>
              </article>

              {/* TOPIC 03: ROAD TO DAY ONE */}
              <article
                className={`topic ${activeTab === 2 ? "act" : ""}`}
                id="t2"
                ref={(el) => {
                  topicRefs.current[2] = el;
                }}
              >
                <div className="tin">
                  <div
                    className="ttxt"
                    ref={(el) => {
                      txtRefs.current[2] = el;
                    }}
                  >
                    <span className="pl">03</span>
                    <h3>{TOPICS[2].title}</h3>
                    <p className="txt">{TOPICS[2].desc}</p>
                    <p className="key">{TOPICS[2].key}</p>
                  </div>
                  <div
                    className="vcard"
                    ref={(el) => {
                      vcRefs.current[2] = el;
                    }}
                  >
                    <div className="vtop">
                      <span className="vl">The road to day one &middot; tap any step</span>
                    </div>
                    <div className="road">
                      <div className="track"><div className="fillb" id="fillb" ref={fillbRef}></div></div>
                      {ROAD_STEPS.map((step, idx) => (
                        <button
                          key={step.title}
                          type="button"
                          className={`stp off ${idx === 3 ? "go" : ""}`}
                          onClick={() => {
                            stopT(2);
                            s2(idx);
                          }}
                        >
                          {step.title}
                          <small>{step.sub}</small>
                          {step.cost && <span className="cost">{step.cost}</span>}
                        </button>
                      ))}
                    </div>

                    <div className="bars2">
                      <div className="b2">
                        <span>Money spent</span>
                        <div className="b2t"><i id="spendB" ref={spendBRef} style={{ width: "0%" }}></i></div>
                      </div>
                      <div className="b2">
                        <span>Team working</span>
                        <div className="b2t"><i id="workB" ref={workBRef} style={{ width: "0%" }}></i></div>
                      </div>
                    </div>

                    <p className="cap" id="cap2" ref={(el) => { capRefs.current[2] = el; }}>
                      Everything before day one is spend with nothing to show for it.
                    </p>
                  </div>
                </div>
              </article>

              {/* TOPIC 04: ONGOING FINANCIAL RISK */}
              <article
                className={`topic ${activeTab === 3 ? "act" : ""}`}
                id="t3"
                ref={(el) => {
                  topicRefs.current[3] = el;
                }}
              >
                <div className="tin">
                  <div
                    className="ttxt"
                    ref={(el) => {
                      txtRefs.current[3] = el;
                    }}
                  >
                    <span className="pl">04</span>
                    <h3>{TOPICS[3].title}</h3>
                    <p className="txt">{TOPICS[3].desc}</p>
                    <p className="key">{TOPICS[3].key}</p>
                  </div>
                  <div
                    className="vcard"
                    ref={(el) => {
                      vcRefs.current[3] = el;
                    }}
                  >
                    <div className="vtop">
                      <span className="vl">What arrives separately</span>
                    </div>
                    <div className="ledger" id="ledger">
                      {[
                        { name: "Rent", v: false },
                        { name: "CAM", v: false },
                        { name: "Insurance", v: false },
                        { name: "Operating costs", v: true },
                        { name: "Maintenance", v: true },
                      ].map((row, ri) => (
                        <div key={row.name} className="lr" data-v={row.v ? "1" : "0"}>
                          <span>{row.name}</span>
                          <div className="dots">
                            {Array.from({ length: 12 }).map((_, c) => {
                              const s = row.v ? (8 + ((c * 5 + ri * 3) % 7) * 1.3).toFixed(1) + "px" : "11px";
                              return (
                                <i
                                  key={c}
                                  data-c={c}
                                  className="off"
                                  style={{ "--s": s } as React.CSSProperties}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                      <div className="lr mo">
                        <span></span>
                        <div className="dots2">
                          {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, mi) => (
                            <i key={mi}>{m}</i>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="term">
                      <div className="term-bar">
                        <div className="term-a off" ref={termARef}></div>
                        <div className="term-b off" ref={termBRef}></div>
                      </div>
                      <div className="term-l off" ref={termLRef}>
                        <span>Your needs change here</span>
                        <span>You still owe the rest of the term</span>
                      </div>
                    </div>

                    <p className="cap" id="cap3" ref={(el) => { capRefs.current[3] = el; }}>
                      Five bills, and a commitment that runs to the end of the term.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
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

        {/* Mobile / Tablet Interactive Horizontal Slider */}
        <div className="md:hidden mt-6">
          {/* Slider Container */}
          <div
            id="cap-mobile-slider"
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CAPABILITY_DETAILS.map((cap) => (
              <article
                key={cap.id}
                className="w-[85vw] max-w-[360px] shrink-0 snap-center p-6 border border-[#e2e2e2] rounded-[22px] bg-white shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#d4622b] uppercase">
                      Capability {cap.num}
                    </span>
                    <span className="text-[11px] font-bold text-[#585858] bg-[#f4f4f4] px-2 py-0.5 rounded-full">
                      {cap.num}/06
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0b0b0b] tracking-tight mt-1">{cap.title}</h3>
                  <p className="mt-2 text-sm text-[#585858] leading-relaxed">{cap.desc}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#e2e2e2]">
                  <em className="not-italic text-[10px] font-bold tracking-wider uppercase text-[#585858] block mb-2">
                    Replaces
                  </em>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.replaces.map((r) => (
                      <span
                        key={r}
                        className="text-xs px-2.5 py-1 rounded-full border border-[#e2e2e2] text-[#585858] line-through decoration-[#d4622b] bg-[#f4f4f4]"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Swipe indicator hint & dots */}
          <div className="flex items-center justify-between mt-3 px-1">
            <span className="text-xs text-[#585858] font-medium flex items-center gap-1">
              <span>&larr;</span> Swipe to explore <span>&rarr;</span>
            </span>
            <div className="flex gap-1.5">
              {CAPABILITY_DETAILS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    const el = document.getElementById("cap-mobile-slider");
                    if (el) {
                      const card = el.children[i] as HTMLElement;
                      if (card) {
                        el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
                      }
                    }
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-[#d8cdb7] hover:bg-[#d4622b] transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN ENTERPRISE PAGE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function EnterprisePage() {
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

      <main className="bg-white text-[#0b0b0b] pt-20">
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
        <ProblemsSection />

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
