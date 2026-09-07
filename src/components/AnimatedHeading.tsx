"use client";

import { motion, type Variants } from "framer-motion";

type Props = {
  text: string;
  highlight?: string; // words rendered in the gradient
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const word: Variants = {
  hidden: { y: "115%" },
  show: {
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const clean = (w: string) => w.replace(/[.,—!?]/g, "").toLowerCase();

/**
 * Heading whose words rise into place from a clipped baseline.
 * `highlight` words render in the brand gradient.
 */
export default function AnimatedHeading({
  text,
  highlight = "",
  className = "",
  delay = 0,
  as = "h2",
}: Props) {
  const words = text.split(" ");
  const hi = new Set(
    highlight
      .split(" ")
      .map((w) => clean(w.trim()))
      .filter(Boolean),
  );

  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="me-[0.28em] inline-flex overflow-hidden pb-[0.15em] align-bottom last:me-0"
        >
          <motion.span
            variants={word}
            className={`inline-block ${hi.has(clean(w)) ? "text-gradient font-bold" : ""}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
