"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"draw" | "settle" | "done">("draw");
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

  // Phase sequence & timing
  useEffect(() => {
    // 1. At 1250ms: Onward Logo stroke draw complete, calculate navbar position & glide
    const t1 = setTimeout(() => {
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
    }, 1250);

    // 2. At 2100ms: Settle complete, reveal header & unlock scroll
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isSettle = phase === "settle";
  const cornerD = "M 22 26 H 62 C 75.25 26 86 36.75 86 50 V 82";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#faf8f5] overflow-hidden select-none pointer-events-none"
      initial={{ opacity: 1 }}
      animate={isSettle ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient background glow & subtle grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d4622b22 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4622b]/15 blur-3xl w-[450px] h-[450px]" />
      </div>

      {/* Stage Container */}
      <div className="relative flex items-center justify-center">
        {/* Onward Logo Construction & Glide to Navbar */}
        <motion.div
          className="absolute flex flex-col sm:flex-row items-center gap-4 sm:gap-6 origin-center whitespace-nowrap"
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={
            isSettle
              ? {
                  opacity: 1,
                  scale: 0.28,
                  x: targetOffset.x,
                  y: targetOffset.y,
                }
              : { opacity: 1, scale: 1, x: 0, y: 0 }
          }
          transition={
            isSettle
              ? { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {/* Animated Onward Logo Mark SVG (160px x 160px) */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible shrink-0 drop-shadow-[0_12px_32px_rgba(212,98,43,0.22)]"
          >
            <defs>
              <linearGradient id="onwardDrawGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#d4622b" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Logo Arm Vector Line Stroke Construction */}
            <motion.path
              d={cornerD}
              stroke="url(#onwardDrawGrad)"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            />

            {/* Logo Inner Core Dot Pop */}
            <motion.circle
              cx="36"
              cy="64"
              r="14"
              fill="url(#onwardDrawGrad)"
              className="origin-[36px_64px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
            />
          </svg>

          {/* Brand Typography */}
          <div className="leading-none text-center sm:text-left">
            <motion.span
              className="text-4xl sm:text-6xl font-black tracking-tight block"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isSettle
                  ? { opacity: 1, y: 0, color: "#ffffff" }
                  : { opacity: 1, y: 0, color: "#1a1a2e" }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Onward
            </motion.span>
            <motion.span
              className="block text-xs sm:text-base tracking-[0.3em] font-bold mt-1"
              initial={{ opacity: 0, y: 8 }}
              animate={
                isSettle
                  ? { opacity: 1, y: 0, color: "rgba(255,255,255,0.7)" }
                  : { opacity: 1, y: 0, color: "#d4622b" }
              }
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              WORKSPACES
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
