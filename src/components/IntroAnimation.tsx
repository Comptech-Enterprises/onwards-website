"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import OnwardLogo from "./OnwardLogo";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"typing" | "pause" | "zoom" | "done">("typing");
  const [charIndex, setCharIndex] = useState(0);

  const topText = "ONWARD";
  const bottomLeft = "WORK";
  const bottomRight = "SPACES";
  const fullLength = topText.length + 1 + bottomLeft.length + 1 + bottomRight.length;

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const prevent = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") return;
    if (charIndex >= fullLength) {
      const t = setTimeout(() => setPhase("pause"), 50);
      return () => clearTimeout(t);
    }
    const delay = charIndex === 0 ? 350 : charIndex === topText.length ? 250 : 65;
    const t = setTimeout(() => setCharIndex((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [charIndex, phase, fullLength]);

  useEffect(() => {
    if (phase !== "pause") return;
    const t = setTimeout(() => setPhase("zoom"), 500);
    return () => clearTimeout(t);
  }, [phase]);

  const handleZoomComplete = useCallback(() => {
    if (phase === "zoom") {
      setPhase("done");
      onComplete();
    }
  }, [phase, onComplete]);

  const topVisible = Math.min(charIndex, topText.length);
  const bottomStart = topText.length + 1;
  const bottomChars = Math.max(0, charIndex - bottomStart);
  const bottomLeftVisible = Math.min(bottomChars, bottomLeft.length);
  const logoVisible = bottomChars > bottomLeft.length;
  const bottomRightStart = bottomLeft.length + 1;
  const bottomRightVisible = Math.max(0, bottomChars - bottomRightStart);

  const showCursor = phase === "typing";
  const isZooming = phase === "zoom";

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#faf8f5] overflow-hidden select-none"
      initial={{ opacity: 1 }}
      animate={isZooming ? { opacity: [1, 1, 0] } : { opacity: 1 }}
      transition={
        isZooming
          ? { duration: 1.6, times: [0, 0.6, 1], ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.2 }
      }
      style={{ pointerEvents: isZooming ? "none" : "auto" }}
    >
      <div className="relative text-center px-4">
        <motion.div
          className="font-sans font-black text-[#1a1a2e] text-center leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 12vw, 11rem)" }}
          animate={isZooming ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span>{topText.slice(0, topVisible)}</span>
          {showCursor && charIndex <= topText.length && (
            <span className="animate-blink border-r-[3px] border-[#1a1a2e] ml-0.5">&nbsp;</span>
          )}
        </motion.div>

        {charIndex > topText.length && (
          <div
            className="mt-2 sm:mt-4 flex items-center justify-center font-sans font-black text-[#1a1a2e] tracking-[0.18em] sm:tracking-[0.25em]"
            style={{ fontSize: "clamp(1.2rem, 4.5vw, 4.2rem)" }}
          >
            <motion.span
              animate={isZooming ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {bottomLeft.slice(0, bottomLeftVisible)}
            </motion.span>

            {logoVisible && (
              <motion.span
                className="inline-flex items-center justify-center origin-center"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={
                  isZooming
                    ? { scale: [1, 4, 8], opacity: [1, 1, 0] }
                    : { scale: 1, opacity: 1 }
                }
                transition={
                  isZooming
                    ? { duration: 1.6, times: [0, 0.5, 1], ease: [0.22, 1, 0.36, 1] }
                    : { duration: 1.5, ease: [0.05, 0.7, 0.1, 1] }
                }
                onAnimationComplete={isZooming ? handleZoomComplete : undefined}
              >
                <OnwardLogo size="1em" className="w-[1em] h-[1em] mx-[0.05em]" />
              </motion.span>
            )}

            <motion.span
              animate={isZooming ? { opacity: 0, x: 30 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {bottomRight.slice(0, bottomRightVisible)}
            </motion.span>

            {showCursor && charIndex > topText.length && (
              <span className="animate-blink border-r-[3px] border-[#1a1a2e] ml-0.5">&nbsp;</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
