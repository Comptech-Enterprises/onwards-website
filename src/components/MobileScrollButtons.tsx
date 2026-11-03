"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export default function MobileScrollButtons({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-x-6 sm:gap-y-10 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none"
      >
        {children}
      </div>

      {(canLeft || canRight) && (
        <div className="sm:hidden flex items-center justify-center gap-4 mt-3">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            disabled={!canLeft}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center cursor-pointer active:scale-95 transition-all disabled:opacity-30 disabled:cursor-default"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            disabled={!canRight}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center cursor-pointer active:scale-95 transition-all disabled:opacity-30 disabled:cursor-default"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
