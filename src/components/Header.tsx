"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

const navLinks = ["Home", "About", "Team", "Locations", "Blog", "Contact"];

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (alwaysSolid) return;
    const sh = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", sh);
    return () => window.removeEventListener("scroll", sh);
  }, [alwaysSolid]);

  const linkHref = (l: string) => {
    if (l === "Team") return "/team";
    if (l === "Blog") return "/blog";
    return `/#${l.toLowerCase()}`;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/30 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <a href="/" id="header-logo" className="flex items-center gap-3 group">
          <Image
            src="/onward-logo.png"
            alt="Onward Workspaces"
            width={38}
            height={38}
            className="w-9 h-9 object-contain group-hover:rotate-6 transition-transform"
            priority
          />
          <div className="leading-none">
            <span className="text-xl font-bold tracking-tight text-white">
              Onward
            </span>
            <span className="block text-[9px] tracking-[0.25em] text-white/70">
              WORKSPACES
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l}
              href={linkHref(l)}
              className="relative text-sm font-medium text-white/90 hover:text-white transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#d4622b] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <MagneticButton
            href="/#contact"
            className="hidden lg:inline-flex items-center gap-2 bg-[#d4622b] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#b8501f] transition-all shadow-md group"
          >
            <span>Get Started</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </MagneticButton>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden">
            <div className="w-7 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white transition-all origin-center ${
                  mobileMenu ? "rotate-45 translate-y-[9px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all ${
                  mobileMenu ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all origin-center ${
                  mobileMenu ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((l) => (
                <a
                  key={l}
                  href={linkHref(l)}
                  onClick={() => setMobileMenu(false)}
                  className="block text-gray-700 font-medium text-lg"
                >
                  {l}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setMobileMenu(false)}
                className="block bg-[#d4622b] text-white text-center py-3.5 rounded-full font-semibold"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
