"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroWords = ["Ambition", "Brand", "People", "Vision"];

export default function HeroWordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % heroWords.length), 2200);
    return () => clearInterval(id);
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
