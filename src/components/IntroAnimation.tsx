"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OnwardLogo from "./OnwardLogo";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"draw" | "crossfade" | "settle" | "done">("draw");
  const [targetOffset, setTargetOffset] = useState<{ x: number; y: number }>({ x: 0, y: -200 });

  // Handle scroll lock during animation
  useEffect(() => {
    if (phase === "done") return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "0";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const prevent = (e: Event) => e.preventDefault();
    const preventKeys = (e: KeyboardEvent) => {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];
      if (scrollKeys.includes(e.key)) e.preventDefault();
    };
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("keydown", preventKeys);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [phase]);

  // Phase timers
  useEffect(() => {
    // 1. After 1350ms (stroke draw complete), transition to crossfade
    const t1 = setTimeout(() => {
      setPhase("crossfade");
    }, 1350);

    // 2. After 2150ms (crossfade complete), calculate target pos & transition to settle
    const t2 = setTimeout(() => {
      const headerLogo = document.getElementById("header-logo");
      if (headerLogo) {
        const rect = headerLogo.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const logoCenterX = rect.left + rect.width / 2;
        const logoCenterY = rect.top + rect.height / 2;
        setTargetOffset({
          x: logoCenterX - centerX,
          y: logoCenterY - centerY,
        });
      }
      setPhase("settle");
    }, 2150);

    // 3. After 2950ms (settle complete), mark done and notify parent
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isCrossfade = phase === "crossfade" || phase === "settle";
  const isSettle = phase === "settle";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#faf8f5] overflow-hidden select-none pointer-events-none"
      initial={{ opacity: 1 }}
      animate={isSettle ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient background glow & subtle grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d4622b22 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#d4622b]/10 blur-3xl" />
      </div>

      {/* Stage Container */}
      <div className="relative flex items-center justify-center">
        {/* Phase 1: Desk SVG Drawing */}
        <motion.div
          className="absolute flex flex-col items-center justify-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={
            isCrossfade
              ? { opacity: 0, scale: 0.65, y: 10 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="130"
            height="130"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="introDeskGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#d4622b" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Desk Surface */}
            <motion.path
              d="M 10 60 H 90"
              stroke="url(#introDeskGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
            />

            {/* Desk Left Leg */}
            <motion.path
              d="M 20 60 V 86"
              stroke="url(#introDeskGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Desk Right Leg */}
            <motion.path
              d="M 80 60 V 86"
              stroke="url(#introDeskGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Desk Stretcher Bar */}
            <motion.path
              d="M 20 76 H 80"
              stroke="url(#introDeskGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.55 }}
            />

            {/* Stand Base */}
            <motion.path
              d="M 40 60 H 60"
              stroke="url(#introDeskGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Stand Neck */}
            <motion.path
              d="M 50 60 V 52"
              stroke="url(#introDeskGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.6 }}
            />

            {/* Monitor Screen Frame */}
            <motion.path
              d="M 32 28 H 68 C 70.2 28 72 29.8 72 32 V 52 C 72 54.2 70.2 56 68 56 H 32 C 29.8 56 28 54.2 28 52 V 32 C 28 29.8 29.8 28 32 28 Z"
              stroke="url(#introDeskGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.75, ease: "easeInOut", delay: 0.65 }}
            />

            {/* Desk Lamp Arch */}
            <motion.path
              d="M 16 60 V 46 C 16 40 22 38 26 40"
              stroke="url(#introDeskGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Coffee Cup */}
            <motion.path
              d="M 82 60 V 51 H 87 V 60 Z"
              stroke="url(#introDeskGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.85 }}
            />
          </svg>

          {/* Subtitle text */}
          <motion.span
            className="mt-4 text-xs font-bold tracking-[0.25em] text-[#d4622b] uppercase"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Crafting Space
          </motion.span>
        </motion.div>

        {/* Phase 2 & 3: Onward Logo Crossfade & Glide to Navbar */}
        <motion.div
          className="absolute flex items-center gap-3 origin-center whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.75, x: 0, y: 0 }}
          animate={
            isSettle
              ? {
                  opacity: 1,
                  scale: 0.72,
                  x: targetOffset.x,
                  y: targetOffset.y,
                }
              : isCrossfade
              ? { opacity: 1, scale: 1, x: 0, y: 0 }
              : { opacity: 0, scale: 0.75, x: 0, y: 0 }
          }
          transition={
            isSettle
              ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <OnwardLogo size={54} color="#d4622b" />

          <div className="leading-none text-left">
            <motion.span
              className="text-2xl font-bold tracking-tight block"
              animate={isSettle ? { color: "#ffffff" } : { color: "#1a1a2e" }}
              transition={{ duration: 0.6 }}
            >
              Onward
            </motion.span>
            <motion.span
              className="block text-[9.5px] tracking-[0.25em] font-bold"
              animate={isSettle ? { color: "rgba(255,255,255,0.7)" } : { color: "#d4622b" }}
              transition={{ duration: 0.6 }}
            >
              WORKSPACES
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
