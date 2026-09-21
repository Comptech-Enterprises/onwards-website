"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"desk" | "logo" | "settle" | "done">("desk");
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
    // 1. At 1100ms: Desk draw complete, transition to BIG LOGO construction phase
    const t1 = setTimeout(() => {
      setPhase("logo");
    }, 1100);

    // 2. At 2250ms: Big logo construction complete, calculate navbar position & glide
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
    }, 2250);

    // 3. At 3150ms: Settle complete, reveal header & unlock scroll
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isLogoPhase = phase === "logo" || phase === "settle";
  const isSettle = phase === "settle";

  const cornerD = "M 22 26 H 62 C 75.25 26 86 36.75 86 50 V 82";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden select-none pointer-events-none"
      initial={{ opacity: 1 }}
      animate={isSettle ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Stage Container */}
      <div className="relative flex items-center justify-center">
        {/* Step 1: Flat Solid Desk SVG Line-Draw (170px x 170px) */}
        <motion.div
          className="absolute flex flex-col items-center justify-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={
            isLogoPhase
              ? { opacity: 0, scale: 0.5, y: 15 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="170"
            height="170"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Desk Surface */}
            <motion.path
              d="M 10 60 H 90"
              stroke="#d4622b"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.05 }}
            />

            {/* Desk Left Leg */}
            <motion.path
              d="M 20 60 V 86"
              stroke="#d4622b"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Desk Right Leg */}
            <motion.path
              d="M 80 60 V 86"
              stroke="#d4622b"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Desk Stretcher Bar */}
            <motion.path
              d="M 20 76 H 80"
              stroke="#d4622b"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.45 }}
            />

            {/* Stand Base */}
            <motion.path
              d="M 40 60 H 60"
              stroke="#d4622b"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Stand Neck */}
            <motion.path
              d="M 50 60 V 52"
              stroke="#d4622b"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Monitor Screen Frame */}
            <motion.path
              d="M 32 28 H 68 C 70.2 28 72 29.8 72 32 V 52 C 72 54.2 70.2 56 68 56 H 32 C 29.8 56 28 54.2 28 52 V 32 C 28 29.8 29.8 28 32 28 Z"
              stroke="#d4622b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.55 }}
            />

            {/* Desk Lamp Arch */}
            <motion.path
              d="M 16 60 V 46 C 16 40 22 38 26 40"
              stroke="#d4622b"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeInOut", delay: 0.7 }}
            />

            {/* Coffee Cup */}
            <motion.path
              d="M 82 60 V 51 H 87 V 60 Z"
              stroke="#d4622b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: "easeInOut", delay: 0.75 }}
            />
          </svg>

          {/* Subtitle text */}
          <motion.span
            className="mt-4 text-xs font-bold tracking-[0.3em] text-[#d4622b] uppercase"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Enterprise Workspaces
          </motion.span>
        </motion.div>

        {/* Step 2 & 3: Flat Solid BIG Logo Construction (170px) & Glide to Navbar */}
        {isLogoPhase && (
          <motion.div
            className="absolute flex flex-col sm:flex-row items-center gap-4 sm:gap-6 origin-center whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.85, x: 0, y: 0 }}
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
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {/* BIG Animated Onward Logo Mark SVG (170px x 170px) */}
            <svg
              width="170"
              height="170"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible shrink-0"
            >
              {/* Big Logo Arm Vector Construction */}
              <motion.path
                d={cornerD}
                stroke="#d4622b"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              />

              {/* Big Logo Inner Core Dot Pop */}
              <motion.circle
                cx="36"
                cy="64"
                r="14"
                fill="#d4622b"
                className="origin-[36px_64px]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
              />
            </svg>

            {/* Big Brand Typography */}
            <div className="leading-none text-center sm:text-left">
              <motion.span
                className="text-4xl sm:text-6xl font-black tracking-tight block"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isSettle
                    ? { opacity: 1, y: 0, color: "#ffffff" }
                    : { opacity: 1, y: 0, color: "#000000" }
                }
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                Onward
              </motion.span>
              <motion.span
                className="block text-xs sm:text-base tracking-[0.3em] font-bold mt-1"
                initial={{ opacity: 0, y: 8 }}
                animate={
                  isSettle
                    ? { opacity: 1, y: 0, color: "rgba(255,255,255,0.8)" }
                    : { opacity: 1, y: 0, color: "#d4622b" }
                }
                transition={{ duration: 0.5, delay: 0.38 }}
              >
                WORKSPACES
              </motion.span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
