"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type SpringCounterProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

/**
 * Spring-physics rolling counter with organic deceleration.
 */
export default function SpringCounter({
  target,
  suffix = "",
  prefix = "",
}: SpringCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

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
      setDisplayValue(Math.floor(latest));
    });
  }, [springVal]);

  return (
    <span ref={ref} className="tabular-nums font-bold">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
