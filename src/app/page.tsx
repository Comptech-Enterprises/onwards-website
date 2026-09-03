"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════ */

function RevealText({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 120;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

function AutoSlider({ children, interval = 3000, className = "", dotColor = "light" }: { children: React.ReactNode[]; interval?: number; className?: string; dotColor?: "light" | "dark" }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = children.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % total), interval);
    return () => clearInterval(timer);
  }, [paused, total, interval]);

  const handleTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; setPaused(true); };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) setCurrent((p) => diff > 0 ? (p + 1) % total : (p - 1 + total) % total);
    setPaused(false);
  };

  return (
    <div className={className || "md:hidden"}>
      <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <motion.div
          ref={trackRef}
          className="flex"
          animate={{ x: `${-current * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children.map((child, i) => (
            <div key={i} className="w-full flex-shrink-0 px-2">{child}</div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {children.map((_, i) => (
          <button key={i} onClick={() => { setCurrent(i); setPaused(false); }} className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? "w-8 bg-[#d4622b]" : `w-1.5 ${dotColor === "dark" ? "bg-white/30" : "bg-gray-300"}`}`} />
        ))}
      </div>
    </div>
  );
}

function MagneticButton({ children, className = "", href = "#" }: { children: React.ReactNode; className?: string; href?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }, [x, y]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const heroWords = ["Ambition", "Brand", "People", "Vision"];

const stats = [
  { value: 3, suffix: "+", label: "Cities", sub: "and growing" },
  { value: 15, suffix: "+", label: "Centres", sub: "across NCR" },
  { value: 250, suffix: "+", label: "Clients", sub: "trusted us" },
  { value: 1, suffix: "M+", label: "Sq. Ft.", sub: "of workspace" },
];

const solutions = [
  { title: "Managed Office", desc: "Customised workspace for Enterprise, MNCs & Unicorns", tag: "ENTERPRISE", size: "lg" },
  { title: "Private Suites", desc: "Fully-managed private cabins for teams", tag: "TEAMS", size: "sm" },
  { title: "Private Cabins", desc: "Fully-equipped space for directors", tag: "EXECUTIVE", size: "sm" },
  { title: "Virtual Office", desc: "Virtual HQ with zero overhead costs", tag: "REMOTE", size: "md" },
  { title: "On-Demand", desc: "Meeting rooms & day pass on the go", tag: "FLEXIBLE", size: "md" },
  { title: "Custom Built", desc: "Bespoke design tailored to your brand", tag: "BESPOKE", size: "lg" },
];

const features = [
  { num: "01", title: "Strategic Locations", desc: "Vibrant business centers across Delhi, Noida, and Gurgaon — right where opportunity lives." },
  { num: "02", title: "Built for Triumph", desc: "Every element crafted to fuel productivity, inspire creativity, and drive your team forward." },
  { num: "03", title: "Beyond Ordinary", desc: "Futuristic tech, premium amenities, and tailor-made workspaces that amplify how you work." },
];

const cities = [
  { name: "Delhi", spots: ["Connaught Place", "Nehru Place", "Saket"] },
  { name: "Noida", spots: ["Sector 62", "Sector 16", "Sector 132"] },
  { name: "Gurgaon", spots: ["Cyber City", "Golf Course Rd", "Sohna Road"] },
];

const testimonials = [
  { name: "Varun Puri", role: "Founder, Dangal Games", text: "Onward has been a game-changer for our team. The perfect office space for our growth journey." },
  { name: "Abhinay Nagwekar", role: "Procurement Lead, Aramex", text: "Onward exceeded all expectations — meticulously designed spaces with unwavering support." },
  { name: "Prasenjit Das Gupta", role: "Head Commercial, Thermax", text: "Transitioning to Onward was our best decision. The environment fosters real collaboration." },
];

const logos = ["Dangal Games", "Aramex", "Thermax", "Razorpay", "InnovateLabs", "GlobalSoft", "TechCorp", "NexGen"];

/* ═══════════════════════════════════════════
   CARD COMPONENTS (extracted for reuse in grid + slider)
   ═══════════════════════════════════════════ */

function SolutionCard({ sol }: { sol: typeof solutions[number] }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-3xl p-8 h-full min-h-[220px] cursor-pointer group overflow-hidden border border-gray-100 hover:border-[#d4622b]/20 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(212,98,43,0.15)]"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4622b]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-[3] transition-transform duration-700" />
      <span className="relative text-[10px] font-bold tracking-[0.2em] text-[#d4622b] bg-[#d4622b]/8 px-3 py-1 rounded-full">{sol.tag}</span>
      <h3 className="relative mt-6 text-2xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors duration-300">{sol.title}</h3>
      <p className="relative mt-3 text-gray-500 leading-relaxed">{sol.desc}</p>
      <div className="relative mt-6 flex items-center gap-2 text-[#d4622b] text-sm font-semibold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        Explore <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className="relative p-8 rounded-3xl bg-[#faf8f5] border border-gray-100 h-full group hover:border-[#d4622b]/20 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(212,98,43,0.1)]">
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, j) => (
          <svg key={j} className="w-4 h-4 text-[#d4622b]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
      </div>
      <p className="text-gray-600 leading-relaxed text-[15px]">&ldquo;{t.text}&rdquo;</p>
      <div className="mt-8 flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4622b] to-[#e8855a] flex items-center justify-center text-white font-bold text-sm">{t.name.split(" ").map(n => n[0]).join("")}</div>
        <div>
          <div className="font-semibold text-[#1a1a2e] text-sm">{t.name}</div>
          <div className="text-gray-400 text-xs">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function LocationCard({ spot, city, delay }: { spot: string; city: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="text-gray-400 text-xs mt-2 block">Image Placeholder</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">{spot}</h3>
        <p className="text-gray-400 text-sm">{city}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const [heroWord, setHeroWord] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCity, setActiveCity] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const wt = setInterval(() => setHeroWord((p) => (p + 1) % heroWords.length), 2200);
    const sh = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", sh);
    return () => { clearInterval(wt); window.removeEventListener("scroll", sh); };
  }, []);

  return (
    <>
      {/* ━━━ NAV ━━━ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg" : "bg-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2.5 group">
            <img src="/onward-logo.png" alt="Onward" className="w-9 h-9 group-hover:rotate-6 transition-transform" />
            <div className="leading-none">
              <span className="text-xl font-bold tracking-tight text-[#1a1a2e]">Onward</span>
              <span className="block text-[9px] tracking-[0.25em] text-gray-400">WORKSPACES</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {["Home", "About", "Solutions", "Locations", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-gray-600 transition-colors hover:text-[#d4622b]">
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticButton href="#contact" className="hidden lg:flex bg-[#d4622b] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#b8501f] transition-colors">
              Get Started
            </MagneticButton>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden">
              <div className="w-7 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-gray-800 transition-all origin-center ${mobileMenu ? "rotate-45 translate-y-[9px]" : ""}`} />
                <span className={`block h-0.5 bg-gray-800 transition-all ${mobileMenu ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-gray-800 transition-all origin-center ${mobileMenu ? "-rotate-45 -translate-y-[9px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {["Home", "About", "Solutions", "Locations", "Contact"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium text-lg">{l}</a>
                ))}
                <a href="#contact" onClick={() => setMobileMenu(false)} className="block bg-[#d4622b] text-white text-center py-3.5 rounded-full font-semibold">Get Started</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ━━━ HERO ━━━ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-white overflow-hidden" id="home">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.4]">
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(212,98,43,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,98,43,.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
        </div>

        {/* Floating orbs */}
        <motion.div animate={{ y: [-20, 20, -20], x: [-10, 15, -10] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 right-[15%] w-72 h-72 bg-[#d4622b]/10 rounded-full blur-[100px]" />
        <motion.div animate={{ y: [20, -20, 20], x: [10, -15, 10] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-1/4 left-[10%] w-96 h-96 bg-[#d4622b]/5 rounded-full blur-[120px]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-[#d4622b]/5 border border-[#d4622b]/10 rounded-full px-5 py-2 mb-10"
            >
              <span className="w-2 h-2 bg-[#d4622b] rounded-full animate-pulse" />
              <span className="text-[#d4622b] text-sm font-medium">2 Day Free Trial Available</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#1a1a2e] leading-[1.05] tracking-tight">
              <div className="overflow-hidden">
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
                  Workspace built
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}>
                  around{" "}
                  <span className="relative inline-block">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroWord}
                        initial={{ y: 40, opacity: 0, rotateX: -40 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        exit={{ y: -40, opacity: 0, rotateX: 40 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="inline-block text-[#d4622b]"
                        style={{ transformOrigin: "bottom" }}
                      >
                        {heroWords[heroWord]}
                      </motion.span>
                    </AnimatePresence>
                    <motion.span
                      className="absolute -bottom-2 left-0 h-1 bg-[#d4622b] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </span>
                </motion.div>
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-8 text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed"
            >
              Premium coworking spaces across Delhi NCR. Designed for teams that refuse to settle for ordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton href="#contact" className="inline-flex items-center justify-center bg-[#d4622b] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#b8501f] transition-colors shadow-[0_0_40px_rgba(212,98,43,0.25)]">
                Book a Tour
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </MagneticButton>
              <a href="tel:9910668152" className="inline-flex items-center justify-center gap-3 text-gray-500 hover:text-[#d4622b] px-8 py-4 rounded-full border border-gray-200 hover:border-[#d4622b]/30 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                +91 9910668152
              </a>
            </motion.div>
          </div>

          {/* Stats strip at bottom of hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-6 sm:p-8 text-center group hover:bg-[#faf8f5] transition-colors">
                <div className="text-3xl sm:text-4xl font-bold text-[#d4622b]">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-gray-600 text-sm mt-1">{s.label}</div>
                <div className="text-gray-400 text-xs mt-0.5 group-hover:text-[#d4622b]/60 transition-colors">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-8 bg-gradient-to-b from-[#d4622b]/40 to-transparent" />
        </motion.div>
      </section>

      {/* ━━━ SOLUTIONS — BENTO GRID ━━━ */}
      <section id="solutions" className="py-24 lg:py-32 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <FadeUp>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">Solutions</span>
              </FadeUp>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3 leading-tight">
                <RevealText>Space that fits</RevealText>
                <br />
                <RevealText delay={0.15}>your ambition</RevealText>
              </h2>
            </div>
            <FadeUp delay={0.3}>
              <p className="text-gray-500 max-w-md text-lg">Flexible office solutions aligned with your business needs and growth trajectory.</p>
            </FadeUp>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((sol, i) => (
              <FadeUp key={sol.title} delay={i * 0.08} className={sol.size === "lg" ? "lg:col-span-1" : ""}>
                <SolutionCard sol={sol} />
              </FadeUp>
            ))}
          </div>
          {/* Mobile auto-slider */}
          <AutoSlider interval={3500}>
            {solutions.map((sol) => (
              <SolutionCard key={sol.title} sol={sol} />
            ))}
          </AutoSlider>
        </div>
      </section>

      {/* ━━━ FEATURES — NUMBERED LIST ━━━ */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <FadeUp>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">Why Onward</span>
              </FadeUp>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3 leading-tight">
                <RevealText>Not just a desk.</RevealText>
                <br />
                <RevealText delay={0.15}>A launchpad.</RevealText>
              </h2>
              <FadeUp delay={0.3}>
                <p className="mt-6 text-gray-500 text-lg leading-relaxed">We don&apos;t rent space. We build environments where ambitious teams do their life&apos;s work.</p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <MagneticButton href="#contact" className="inline-flex items-center gap-2 mt-8 bg-[#d4622b] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b8501f] transition-colors">
                  See it for yourself
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </MagneticButton>
              </FadeUp>
            </div>

            <div className="space-y-0">
              {features.map((f, i) => (
                <FadeUp key={f.num} delay={i * 0.15}>
                  <div className="group py-10 border-b border-gray-100 last:border-0 cursor-pointer">
                    <div className="flex gap-6 items-start">
                      <span className="text-5xl font-bold text-[#d4622b]/10 group-hover:text-[#d4622b]/30 transition-colors shrink-0 leading-none">{f.num}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors">{f.title}</h3>
                        <p className="mt-3 text-gray-500 leading-relaxed max-w-md">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ LOCATIONS ━━━ */}
      <section id="locations" className="py-24 lg:py-32 bg-[#faf8f5] relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-[#d4622b]/[0.04] rounded-full" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] border border-[#d4622b]/[0.04] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <FadeUp>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">Locations</span>
            </FadeUp>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3">
              <RevealText>Find us everywhere</RevealText>
            </h2>
          </div>

          <div className="flex justify-center gap-2 mb-14">
            {cities.map((c, i) => (
              <motion.button
                key={c.name}
                onClick={() => setActiveCity(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCity === i
                    ? "bg-[#d4622b] text-white shadow-[0_0_30px_rgba(212,98,43,0.2)]"
                    : "text-gray-500 hover:text-[#d4622b] border border-gray-200 hover:border-[#d4622b]/30"
                }`}
              >
                {c.name}
              </motion.button>
            ))}
          </div>

          {/* Desktop grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="hidden sm:grid sm:grid-cols-3 gap-5"
            >
              {cities[activeCity].spots.map((spot, i) => (
                <LocationCard key={spot} spot={spot} city={cities[activeCity].name} delay={i * 0.12} />
              ))}
            </motion.div>
          </AnimatePresence>
          {/* Mobile auto-slider */}
          <AutoSlider interval={3000} className="sm:hidden" dotColor="light">
            {cities[activeCity].spots.map((spot) => (
              <LocationCard key={spot} spot={spot} city={cities[activeCity].name} delay={0} />
            ))}
          </AutoSlider>
        </div>
      </section>

      {/* ━━━ GALLERY — PLACEHOLDER STRIP ━━━ */}
      <section className="py-24 lg:py-32 bg-[#faf8f5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14">
          <FadeUp>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">Gallery</span>
          </FadeUp>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3">
            <RevealText>See the space</RevealText>
          </h2>
        </div>
        <div className="flex gap-4 px-6">
          {[...Array(6)].map((_, i) => (
            <FadeUp key={i} delay={i * 0.08} className="shrink-0">
              <motion.div
                whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                className={`${i % 3 === 0 ? "w-80 h-96" : i % 3 === 1 ? "w-64 h-80" : "w-72 h-72"} bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center cursor-pointer overflow-hidden group`}
              >
                <div className="text-gray-400 text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.8"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                  <span className="text-xs">Workspace {i + 1}</span>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ━━━ TESTIMONIALS ━━━ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            </FadeUp>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-3">
              <RevealText>Leaders trust Onward</RevealText>
            </h2>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.12}>
                <TestimonialCard t={t} />
              </FadeUp>
            ))}
          </div>
          {/* Mobile auto-slider */}
          <AutoSlider interval={4000}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </AutoSlider>
        </div>
      </section>

      {/* ━━━ LOGO MARQUEE ━━━ */}
      <section className="py-16 bg-[#faf8f5] border-y border-gray-100">
        <Marquee speed={25}>
          {logos.map((l) => (
            <span key={l} className="text-2xl font-bold text-gray-300/60 tracking-wider whitespace-nowrap">{l}</span>
          ))}
        </Marquee>
      </section>

      {/* ━━━ CONTACT ━━━ */}
      <section id="contact" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4622b]/5 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-16 lg:gap-24">
            <div>
              <FadeUp>
                <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">Contact</span>
              </FadeUp>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mt-3 leading-tight">
                <RevealText>Ready to move</RevealText>
                <br />
                <RevealText delay={0.15}>forward?</RevealText>
              </h2>
              <FadeUp delay={0.3}>
                <p className="mt-6 text-gray-500 text-lg leading-relaxed">Transform your work life. Fill in the form and our team will reach out within 24 hours.</p>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="mt-10 space-y-6">
                  {[
                    { icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", label: "Phone", value: "+91 9910668152" },
                    { icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", label: "Email", value: "info@onwardworkspaces.com" },
                    { icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", label: "Address", value: "Delhi NCR, India" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#d4622b]/30 transition-colors">
                        <svg className="w-5 h-5 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider">{item.label}</div>
                        <div className="text-[#1a1a2e] mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.2}>
              <form onSubmit={(e) => e.preventDefault()} className="bg-[#faf8f5] border border-gray-200 rounded-3xl p-8 lg:p-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] placeholder:text-gray-300 focus:outline-none focus:border-[#d4622b]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Email</label>
                    <input type="email" placeholder="john@company.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] placeholder:text-gray-300 focus:outline-none focus:border-[#d4622b]/50 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Phone</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] placeholder:text-gray-300 focus:outline-none focus:border-[#d4622b]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Solution</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-400 focus:outline-none focus:border-[#d4622b]/50 transition-colors">
                    <option value="">Select a solution</option>
                    {solutions.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Message</label>
                  <textarea placeholder="Tell us about your requirements..." rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] placeholder:text-gray-300 focus:outline-none focus:border-[#d4622b]/50 transition-colors resize-none" />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#d4622b] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#b8501f] transition-colors shadow-[0_0_40px_rgba(212,98,43,0.2)]"
                >
                  Send Message
                </motion.button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[#faf8f5] text-gray-400 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <a href="#" className="flex items-center gap-2.5 mb-5">
                <img src="/onward-logo.png" alt="Onward" className="w-9 h-9" />
                <div className="leading-none">
                  <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">Onward</span>
                  <span className="block text-[9px] text-gray-400 tracking-[0.25em]">WORKSPACES</span>
                </div>
              </a>
              <p className="text-sm leading-relaxed">Premium coworking spaces built around your brand, ambition, and people.</p>
            </div>
            {[
              { title: "Solutions", links: ["Managed Office", "Private Suites", "Virtual Office", "On-Demand", "Custom Built"] },
              { title: "Locations", links: ["Delhi", "Noida", "Gurgaon", "All Locations"] },
              { title: "Company", links: ["About Us", "Blog", "Careers", "Enterprise", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[#1a1a2e] font-semibold text-sm mb-5 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((l) => <li key={l}><a href="#" className="hover:text-[#d4622b] transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; 2024 Onward Workspaces. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
                <a key={l} href="#" className="hover:text-[#d4622b] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
