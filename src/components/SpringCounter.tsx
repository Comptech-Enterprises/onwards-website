"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type SpringCounterProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

/**
 * Spring-physics rolling counter with organic deceleration and optional decimals.
 */
export default function SpringCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "tabular-nums font-normal",
}: SpringCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState<string | number>(
    decimals > 0 ? (0).toFixed(decimals) : 0,
  );

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 45,
    damping: 18,
    mass: 0.8,
  });

  useEffect(() => {
    if (inView) {
      motionVal.set(target);
    }
  }, [inView, motionVal, target]);

  useEffect(() => {
    return springVal.on("change", (latest) => {
      if (decimals > 0) {
        setDisplayValue(latest.toFixed(decimals));
      } else {
        setDisplayValue(Math.floor(latest));
      }
    });
  }, [springVal, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

