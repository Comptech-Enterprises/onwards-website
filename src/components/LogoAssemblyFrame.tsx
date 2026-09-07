"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import OnwardLogo from "./OnwardLogo";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

/**
 * Hyperframe Brand Showcase where scrolling lines assemble
 * directly into the Onward SVG logo emblem.
 */
export default function LogoAssemblyFrame() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const strokeProgress = useTransform(smoothProgress, [0, 0.75], [0, 1]);
  const dotProgress = useTransform(smoothProgress, [0.65, 1], [0, 1]);
  const glowOpacity = useTransform(smoothProgress, [0.7, 1], [0, 1]);
  const cardScale = useTransform(smoothProgress, [0, 1], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 lg:py-36 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#d4622b]/15 blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#d4622b]" />
              The Onward Identity
              <span className="w-8 h-px bg-[#d4622b]" />
            </span>
          </Reveal>
          <AnimatedHeading
            text="Lines converge. Vision takes shape."
            highlight="Vision takes shape."
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-4 leading-tight"
          />
          <Reveal delay={0.2}>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Every detail is engineered with momentum — pointing up and forward,
              anchored by a community that drives progress.
            </p>
          </Reveal>
        </div>

        {/* Hyperframe Stage Card */}
        <motion.div
          style={{ scale: cardScale }}
          className="relative max-w-4xl mx-auto rounded-[2.5rem] bg-white border border-gray-200/80 p-8 sm:p-14 lg:p-16 shadow-[0_30px_100px_-20px_rgba(212,98,43,0.12)] overflow-hidden group"
        >
          {/* Subtle Grid texture inside frame */}
          <div
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212,98,43,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,98,43,.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Corner frame decorative accents */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-[#d4622b]/40 rounded-tl-sm" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-[#d4622b]/40 rounded-tr-sm" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-[#d4622b]/40 rounded-bl-sm" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-[#d4622b]/40 rounded-br-sm" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Animated SVG Logo Assembly Canvas */}
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 shrink-0">
              {/* Rotating outer compass ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#d4622b]/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-[#d4622b]/10"
              />

              {/* Core SVG animated Onward Logo */}
              <div className="relative z-10 drop-shadow-[0_10px_25px_rgba(212,98,43,0.3)]">
                <OnwardLogo
                  size={180}
                  animated={true}
                  strokeProgress={strokeProgress}
                  dotProgress={dotProgress}
                />
              </div>

              {/* Glowing aura when assembled */}
              <motion.div
                style={{ opacity: glowOpacity }}
                className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#d4622b]/20 to-[#f59e0b]/20 blur-xl pointer-events-none"
              />
            </div>

            {/* Narrative copy block */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4622b]/10 border border-[#d4622b]/20 text-[#d4622b] text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4622b] animate-pulse" />
                Momentum Vector &bull; Origin 2024
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] leading-snug">
                The Forward Arc &bull; The Central Community
              </h3>

              <p className="text-gray-500 leading-relaxed">
                The Onward mark merges the dynamic <span className="text-[#d4622b] font-semibold">90&deg; momentum curve</span> representing endless scalability with the <span className="text-[#d4622b] font-semibold">central nucleus</span> representing our collaborative community.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#faf8f5] p-4 rounded-2xl border border-gray-100">
                  <div className="text-2xl font-bold text-[#d4622b]">99.8%</div>
                  <div className="text-xs text-gray-500 mt-1">Uptime & Connectivity</div>
                </div>
                <div className="bg-[#faf8f5] p-4 rounded-2xl border border-gray-100">
                  <div className="text-2xl font-bold text-[#d4622b]">100%</div>
                  <div className="text-xs text-gray-500 mt-1">Managed & Bespoke</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
