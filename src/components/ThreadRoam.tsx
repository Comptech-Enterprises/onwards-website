"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * A thin orange thread that winds through the wrapped zone as the user
 * scrolls, with the Onward core-node riding the leading tip. Purely
 * decorative — click-through, sits above content.
 */

const VB_W = 1440;
const VB_H = 1600;

// Wide left↔right sweeps down through the zone, C1-continuous (each
// segment's outgoing control mirrors the next segment's incoming control)
// so the thread has no visible kinks.
const THREAD_PATH = `M 120 10
  C 500 120, 1320 180, 1320 320
  C 1320 460, 200 500, 200 640
  C 200 780, 1320 820, 1320 960
  C 1320 1100, 200 1140, 200 1280
  C 200 1400, 720 1480, 720 1598`;

export default function ThreadRoam({ children }: { children: ReactNode }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ["start 80%", "end end"],
  });

  const drawn = scrollYProgress;

  const nx = useMotionValue(120);
  const ny = useMotionValue(10);

  const updateNode = (f: number) => {
    const el = pathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    const clf = Math.max(0.0001, Math.min(f, 1));
    const p = el.getPointAtLength(L * clf);
    nx.set(p.x);
    ny.set(p.y);
  };

  useMotionValueEvent(drawn, "change", updateNode);
  useEffect(() => {
    updateNode(drawn.get());
    const onResize = () => updateNode(drawn.get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const left = useTransform(nx, (v) => `${(v / VB_W) * 100}%`);
  const top = useTransform(ny, (v) => `${(v / VB_H) * 100}%`);
  const nodeOpacity = useTransform(drawn, [0, 0.01, 1], [0, 1, 1]);

  return (
    <div ref={zoneRef} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-hidden"
      >
        <svg
          className="h-full w-full [filter:drop-shadow(0_0_4px_rgba(212,98,43,0.35))]"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="threadGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#d4622b" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          <motion.path
            ref={pathRef}
            d={THREAD_PATH}
            stroke="url(#threadGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: drawn, opacity: 0.45 }}
          />
        </svg>

        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left, top, opacity: nodeOpacity }}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[#d4622b] [filter:drop-shadow(0_0_8px_rgba(212,98,43,0.8))]" />
        </motion.div>
      </div>

      {children}
    </div>
  );
}
