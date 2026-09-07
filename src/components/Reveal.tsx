"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  blur?: boolean;
  from?: "up" | "down" | "left" | "right";
};

/** Scroll-triggered reveal — fade + rise + soft blur with cinematic easing. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 32,
  once = true,
  blur = true,
  from = "up",
}: RevealProps) {
  const offset: Record<string, { x?: number; y?: number }> = {
    up: { y },
    down: { y: -y },
    left: { x: y },
    right: { x: -y },
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset[from],
      filter: blur ? "blur(8px)" : "blur(0px)",
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
