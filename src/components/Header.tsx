"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const locationsData = [
  { name: "Delhi", href: "/locations?city=Delhi" },
  { name: "Noida", href: "/locations?city=Noida" },
  { name: "Gurgaon", href: "/locations?city=Gurugram" },
];

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (alwaysSolid) return;
    const sh = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", sh);
    return () => window.removeEventListener("scroll", sh);
  }, [alwaysSolid]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLocationsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setLocationsOpen(false);
    }, 150);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || locationsOpen
          ? "bg-black/25 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Brand Logo */}
        <Link href="/" id="header-logo" className="flex items-center gap-3 group">
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
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="relative text-sm font-medium text-white/90 hover:text-white transition-colors py-2"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="relative text-sm font-medium text-white/90 hover:text-white transition-colors py-2"
          >
            About Us
          </Link>

          {/* Locations Dropdown (ONLY dropdown in header - Delhi, Noida, Gurgaon) */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/locations"
              className={`relative inline-flex items-center gap-1.5 text-sm font-medium py-2 transition-colors ${
                locationsOpen ? "text-[#d4622b]" : "text-white/90 hover:text-white"
              }`}
            >
              <span>Locations</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  locationsOpen ? "rotate-180 text-[#d4622b]" : "text-white/70"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <AnimatePresence>
              {locationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute -left-4 top-full mt-2 w-48 rounded-2xl bg-[#1c1d22]/95 backdrop-blur-2xl border border-white/15 p-2 shadow-2xl overflow-hidden z-50 text-white"
                >
                  <div className="space-y-1">
                    {locationsData.map((loc) => (
                      <Link
                        key={loc.name}
                        href={loc.href}
                        onClick={() => setLocationsOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/10 transition-colors group text-sm font-medium text-gray-200 hover:text-white"
                      >
                        <span className="group-hover:text-[#d4622b] transition-colors font-medium">
                          {loc.name}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#d4622b] group-hover:translate-x-0.5 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/team"
            className="relative text-sm font-medium text-white/90 hover:text-white transition-colors py-2"
          >
            Team
          </Link>

          <Link
            href="/blog"
            className="relative text-sm font-medium text-white/90 hover:text-white transition-colors py-2"
          >
            Blog
          </Link>
        </nav>

        {/* Right CTA Button & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <MagneticButton
            href="/#contact"
            className="hidden lg:inline-flex items-center gap-2 bg-[#d4622b] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#b8501f] transition-all shadow-md group"
          >
            <span>Book a Tour</span>
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

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden p-2 rounded-lg text-white hover:text-[#d4622b] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-white transition-all origin-center ${
                  mobileMenu ? "rotate-45 translate-y-[9px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-all ${
                  mobileMenu ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-all origin-center ${
                  mobileMenu ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ━━━ MOBILE NAVIGATION ━━━ */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#16171a]/98 backdrop-blur-2xl border-t border-white/10 overflow-y-auto max-h-[85vh] shadow-2xl text-white"
          >
            <div className="px-6 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenu(false)}
                className="block text-white font-semibold text-lg hover:text-[#d4622b]"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenu(false)}
                className="block text-white font-semibold text-lg hover:text-[#d4622b]"
              >
                About Us
              </Link>

              {/* Mobile Locations Accordion (ONLY dropdown) */}
              <div>
                <button
                  onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                  className="w-full flex items-center justify-between text-white font-semibold text-lg py-1"
                >
                  <span>Locations</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      mobileLocationsOpen ? "rotate-180 text-[#d4622b]" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileLocationsOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#d4622b]/50">
                    {locationsData.map((loc) => (
                      <Link
                        key={loc.name}
                        href={loc.href}
                        onClick={() => setMobileMenu(false)}
                        className="block text-sm text-gray-200 hover:text-[#d4622b] py-1"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/team"
                onClick={() => setMobileMenu(false)}
                className="block text-white font-semibold text-lg hover:text-[#d4622b]"
              >
                Team
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileMenu(false)}
                className="block text-white font-semibold text-lg hover:text-[#d4622b]"
              >
                Blog
              </Link>

              <div className="pt-4">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenu(false)}
                  className="block bg-[#d4622b] text-white text-center py-3.5 rounded-full font-semibold hover:bg-[#b8501f] transition-colors shadow-md"
                >
                  Book a Tour
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
