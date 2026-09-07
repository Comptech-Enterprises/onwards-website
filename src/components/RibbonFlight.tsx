"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

/**
 * The Onward Flight & Logo Assembly System.
 *
 * A high-energy dynamic ribbon flight that travels through the wrapped zones.
 * As you scroll down, the lines trace through the page and converge directly into
 * drawing the Onward SVG logo emblem.
 */

const VB_W = 1440;
const VB_H = 3400;

// Dynamic flight path with energetic curves and corkscrews leading into the center logo dock
const FLIGHT_PATH = `M 1250 20
  C 1120 180, 240 280, 240 520
  C 240 760, 1240 880, 1240 1140
  C 1240 1420, 200 1540, 200 1840
  C 200 2140, 1220 2280, 1220 2560
  C 1220 2820, 380 2920, 720 3100
  C 780 3130, 840 3180, 840 3240
  C 840 3300, 780 3340, 720 3340`;

export default function RibbonFlight({ children }: { children: ReactNode }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ["start 80%", "end end"],
  });

  const drawn = scrollYProgress;

  // Arrow position & heading angle
  const px = useMotionValue(1250);
  const py = useMotionValue(20);
  const angle = useMotionValue(0);

  // Smooth banking spring for aerodynamic feel
  const smoothAngle = useSpring(angle, { stiffness: 180, damping: 20 });

  const updatePlane = (f: number) => {
    const el = pathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    const clf = Math.max(0.0001, Math.min(f, 1));
    const p = el.getPointAtLength(L * clf);

    // Sample direction of travel from point behind tip
    const back = el.getPointAtLength(Math.max(0, L * clf - 2));
    px.set(p.x);
    py.set(p.y);

    // ViewBox to screen conversion for accurate visual tangent angle
    const svg = el.ownerSVGElement;
    const scaleX = svg && svg.clientWidth ? svg.clientWidth / VB_W : 1;
    const scaleY = svg && svg.clientHeight ? svg.clientHeight / VB_H : 1;
    const dx = (p.x - back.x) * scaleX;
    const dy = (p.y - back.y) * scaleY;
    angle.set((Math.atan2(dy, dx) * 180) / Math.PI);
  };

  useMotionValueEvent(drawn, "change", updatePlane);

  useEffect(() => {
    updatePlane(drawn.get());
    const onResize = () => updatePlane(drawn.get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const left = useTransform(px, (v) => `${(v / VB_W) * 100}%`);
  const top = useTransform(py, (v) => `${(v / VB_H) * 100}%`);
  const planeOpacity = useTransform(drawn, [0, 0.005, 1], [0, 1, 1]);

  return (
    <div ref={zoneRef} className="relative">
      {/* Flight overlay layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-hidden"
      >
        <svg
          className="h-full w-full [filter:drop-shadow(0_0_8px_rgba(212,98,43,0.4))]"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="onwardFlightGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d4622b" />
              <stop offset="40%" stopColor="#ea580c" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d4622b" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background wider glow trail */}
          <motion.path
            d={FLIGHT_PATH}
            stroke="url(#onwardFlightGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.25"
            style={{ pathLength: drawn }}
          />

          {/* Foreground sharp drawing line */}
          <motion.path
            ref={pathRef}
            d={FLIGHT_PATH}
            stroke="url(#onwardFlightGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ pathLength: drawn, opacity: 0.85 }}
          />
        </svg>

        {/* Onward Chevron Navigator riding the line */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left, top, opacity: planeOpacity }}
        >
          <motion.div
            style={{ rotate: smoothAngle }}
            className="[filter:drop-shadow(0_0_12px_rgba(212,98,43,0.9))]"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4622b] to-[#ea580c] text-white shadow-xl border border-white/40">
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-2xl bg-[#d4622b] animate-ping opacity-25" />
              {/* Onward chevron arrow */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 24 28 H 60 C 72 28 82 38 82 50 V 82"
                  stroke="#ffffff"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="36" cy="64" r="14" fill="#ffffff" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {children}
    </div>
  );
}
