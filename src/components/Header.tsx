"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const prefetchedImages = new Set<string>();
function prefetchBanner(url?: string) {
  if (!url || typeof window === "undefined" || prefetchedImages.has(url)) return;
  prefetchedImages.add(url);
  const img = new (window as any).Image();
  img.src = `/_next/image?url=${encodeURIComponent(url)}&w=1200&q=75`;
}

const locationsData = [
  {
    name: "Delhi",
    href: "/delhi",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/top-section-hero-image-managed-office-space-in-delhi.webp",
  },
  {
    name: "Noida",
    href: "/noida",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/top-section-hero-image-managed-office-space-in-noida.webp",
  },
  {
    name: "Gurgaon",
    href: "/gurgaon",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/top-section-hero-image-managed-office-space-in-gurgaon.webp",
  },
];

const solutionsData = [
  {
    name: "Managed Office",
    href: "/offices/managed-office-space-in-delhi",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/managed-office.webp",
  },
  {
    name: "Private Suites",
    href: "/offices/private-suites-in-delhi",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/private-suites.webp",
  },
  {
    name: "Private Cabins",
    href: "/offices/private-cabins-in-delhi",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/private-cabins.webp",
  },
  {
    name: "Virtual Office",
    href: "/offices/virtual-office-in-delhi",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/virtual-office.webp",
  },
  {
    name: "Meeting Rooms & Day Passes",
    href: "/offices/meeting-rooms-in-delhi/day-passes-in-delhi",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/on-demand.webp",
  },
  {
    name: "Custom Built",
    href: "/offices/custom-built-in-delhi",
    banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/custom-built.webp",
  },
];

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleSolutionsEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-[slideDown_0.6s_cubic-bezier(0.22,1,0.36,1)_both] ${
        scrolled || locationsOpen || solutionsOpen
          ? "bg-black/25 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Brand Logo */}
        <Link href="/" id="header-logo" className="flex items-center group py-1 shrink-0">
          <Image
            src="/onward-logo-white.webp"
            alt="Onward Workspaces"
            width={160}
            height={36}
            className="h-8 sm:h-9 w-auto object-contain group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop Navigation Links — centered */}
        <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
          <Link
            href="/"
            className="relative text-sm font-medium text-white/90 hover:text-white transition-colors py-3"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="relative text-sm font-medium text-white/90 hover:text-white transition-colors py-3"
          >
            About Us
          </Link>

          {/* Locations Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`relative inline-flex items-center gap-1.5 text-sm font-medium py-3 transition-colors cursor-default ${
                locationsOpen ? "text-[#d4622b]" : "text-white/90 hover:text-white"
              }`}
            >
              <span>Locations</span>
              <button
                type="button"
                onClick={() => setLocationsOpen((v) => !v)}
                className="cursor-pointer p-1"
                aria-label="Toggle locations menu"
              >
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
              </button>
            </span>

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
                        onMouseEnter={() => prefetchBanner(loc.banner)}
                        onTouchStart={() => prefetchBanner(loc.banner)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/10 transition-colors group text-sm font-medium text-gray-200 hover:text-white"
                      >
                        <span className="group-hover:text-[#b44512] transition-colors font-medium">
                          {loc.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Our Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleSolutionsEnter}
            onMouseLeave={handleSolutionsLeave}
          >
            <span
              className={`relative inline-flex items-center gap-1.5 text-sm font-medium py-3 transition-colors cursor-default ${
                solutionsOpen ? "text-[#d4622b]" : "text-white/90 hover:text-white"
              }`}
            >
              <span>Our Solutions</span>
              <button
                type="button"
                onClick={() => setSolutionsOpen((v) => !v)}
                className="cursor-pointer p-1"
                aria-label="Toggle solutions menu"
              >
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    solutionsOpen ? "rotate-180 text-[#d4622b]" : "text-white/70"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </span>

            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute -left-4 top-full mt-2 w-52 rounded-2xl bg-[#1c1d22]/95 backdrop-blur-2xl border border-white/15 p-2 shadow-2xl overflow-hidden z-50 text-white"
                >
                  <div className="space-y-1">
                    {solutionsData.map((sol) => (
                      <Link
                        key={sol.name}
                        href={sol.href}
                        onClick={() => setSolutionsOpen(false)}
                        onMouseEnter={() => prefetchBanner(sol.banner)}
                        onTouchStart={() => prefetchBanner(sol.banner)}
                        className="flex items-center px-3.5 py-2.5 rounded-xl hover:bg-white/10 transition-colors group text-sm font-medium text-gray-200 hover:text-white"
                      >
                        <span className="group-hover:text-[#b44512] transition-colors font-medium">
                          {sol.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/enterprise"
            className="relative text-sm font-medium text-white/90 hover:text-white transition-colors py-3"
          >
            Enterprise
          </Link>
        </nav>

        {/* Right — Phone + Enquire Now + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+919217304534"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +91 92173 04534
          </a>

          <MagneticButton
            href="/contact-us"
            className="hidden lg:inline-flex items-center gap-2 bg-[#c24f1c] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#a84114] transition-all shadow-md group"
          >
            <span>Enquire Now</span>
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
                className="block text-white font-medium text-base hover:text-[#d4622b] py-2"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenu(false)}
                className="block text-white font-medium text-base hover:text-[#d4622b] py-2"
              >
                About Us
              </Link>

              {/* Mobile Locations Accordion (ONLY dropdown) */}
              <div>
                <button
                  onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                  className="w-full flex items-center justify-between text-white font-medium text-base py-2"
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
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#b44512]/50">
                    {locationsData.map((loc) => (
                      <Link
                        key={loc.name}
                        href={loc.href}
                        onClick={() => setMobileMenu(false)}
                        onTouchStart={() => prefetchBanner(loc.banner)}
                        className="block text-xs sm:text-sm text-gray-200 hover:text-[#b44512] py-2"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Solutions Accordion */}
              <div>
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="w-full flex items-center justify-between text-white font-medium text-base py-2"
                >
                  <span>Our Solutions</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      mobileSolutionsOpen ? "rotate-180 text-[#b44512]" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileSolutionsOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#b44512]/50">
                    {solutionsData.map((sol) => (
                      <Link
                        key={sol.name}
                        href={sol.href}
                        onClick={() => setMobileMenu(false)}
                        onTouchStart={() => prefetchBanner(sol.banner)}
                        className="block text-xs sm:text-sm text-gray-200 hover:text-[#b44512] py-2"
                      >
                        {sol.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/enterprise"
                onClick={() => setMobileMenu(false)}
                className="block text-white font-medium text-base hover:text-[#d4622b] py-2"
              >
                Enterprise
              </Link>

              <a
                href="tel:+919217304534"
                className="flex items-center gap-2 text-white font-medium text-base hover:text-[#d4622b] py-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +91 92173 04534
              </a>

              <div className="pt-2">
                <Link
                  href="/contact-us"
                  onClick={() => setMobileMenu(false)}
                  className="block bg-[#d4622b] text-white text-center py-2.5 rounded-full text-sm font-semibold hover:bg-[#b8501f] transition-colors shadow-md"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
