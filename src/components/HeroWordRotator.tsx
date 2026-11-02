"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroWords = ["Ambition", "Brand", "People", "Vision"];

export default function HeroWordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Delay first rotation by 5s so initial paint and Core Web Vitals LCP are recorded on initial render
    const timeout = setTimeout(() => {
      setIndex((p) => (p + 1) % heroWords.length);
      const id = setInterval(() => setIndex((p) => (p + 1) % heroWords.length), 2600);
      return () => clearInterval(id);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="relative inline-grid text-left align-baseline">
      <span aria-hidden className="invisible col-start-1 row-start-1">Ambition</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -35, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="col-start-1 row-start-1 text-[#d4622b]"
        >
          {heroWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
