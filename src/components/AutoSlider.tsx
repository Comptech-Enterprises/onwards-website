"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AutoSliderProps {
  children: React.ReactNode[];
  interval?: number;
  dotColor?: "light" | "dark";
  className?: string;
  slideClassName?: string;
  showArrows?: boolean;
}

export default function AutoSlider({
  children,
  interval = 3500,
  dotColor = "light",
  className = "",
  slideClassName = "w-full flex-shrink-0 px-1 sm:px-2",
  showArrows = false,
}: AutoSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const total = children.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
    }, interval);
    return () => clearInterval(timer);
  }, [paused, total, interval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setCurrent((p) => (diff > 0 ? (p + 1) % total : (p - 1 + total) % total));
    }
    setPaused(false);
  };

  const handlePrev = () => {
    setCurrent((p) => (p - 1 + total) % total);
    setPaused(false);
  };

  const handleNext = () => {
    setCurrent((p) => (p + 1) % total);
    setPaused(false);
  };

  if (total === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <div
        className="overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          ref={trackRef}
          className="flex items-stretch"
          animate={{ x: `${-current * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children.map((child, i) => (
            <div key={i} className={slideClassName}>
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Pagination & Navigation Controls (Underneath the card, zero obstruction) */}
      {total > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          {showArrows && (
            <button
              type="button"
              aria-label="Previous slide"
              onClick={handlePrev}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#d4622b] hover:text-[#d4622b] shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 -translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div className="flex items-center gap-1.5">
            {children.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => {
                  setCurrent(i);
                  setPaused(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === i
                    ? "w-6 bg-[#d4622b]"
                    : `w-1.5 ${
                        dotColor === "dark" ? "bg-white/40" : "bg-gray-300 hover:bg-gray-400"
                      }`
                }`}
              />
            ))}
          </div>

          {showArrows && (
            <button
              type="button"
              aria-label="Next slide"
              onClick={handleNext}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#d4622b] hover:text-[#d4622b] shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
