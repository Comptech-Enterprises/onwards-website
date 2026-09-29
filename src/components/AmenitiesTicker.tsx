"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const amenities = [
  {
    title: "High-Speed Internet Access",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M4.929 12.9a11 11 0 0114.142 0M1.5 9.5a15.5 15.5 0 0121 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Unlimited Coffee & Water",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h13a3 3 0 010 6h-1M4 10v6a3 3 0 003 3h6a3 3 0 003-3v-6M4 10V7h13v3M8 3v2M11 3v2M14 3v2" />
      </svg>
    ),
  },
  {
    title: "Daily Housekeeping Services",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3l6 6-9.5 9.5a3 3 0 01-2 1l-3.5.5.5-3.5a3 3 0 011-2L15 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21h5" />
      </svg>
    ),
  },
  {
    title: "Dedicated IT Assistance",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
  {
    title: "Easy Printing Solutions",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3h12v6M6 18H4a1 1 0 01-1-1v-5a1 1 0 011-1h16a1 1 0 011 1v5a1 1 0 01-1 1h-2M6 14h12v7H6v-7z" />
      </svg>
    ),
  },
  {
    title: "Ample Parking Space",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16V8h4a3 3 0 010 6H9" />
      </svg>
    ),
  },
  {
    title: "Shared Breakout Lounges",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 18v-6a4 4 0 014-4h8a4 4 0 014 4v6M2 18h20M4 18v2M20 18v2" />
      </svg>
    ),
  },
  {
    title: "Bookable Meeting Rooms",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="8" cy="8" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3 3 0 010 5.9M18 20c0-2.5-1.5-4.7-3.7-5.6" />
      </svg>
    ),
  },
  {
    title: "In-House Café Access",
    icon: (
      <svg className="w-6 h-6 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V10l2-6h12l2 6v11M4 10h16M9 21v-6h6v6" />
      </svg>
    ),
  },
];

export default function AmenitiesTicker() {
  return (
    <section className="py-20 lg:py-24 bg-white border-t border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <Reveal>
            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
              What&apos;s Included
            </span>
          </Reveal>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
            Amenities
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...amenities, ...amenities].map((a, i) => (
            <div
              key={`${a.title}-${i}`}
              className="shrink-0 w-44 flex flex-col items-center justify-center gap-3 text-center bg-[#f2f7f7] rounded-2xl py-8 px-4"
            >
              <div className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                {a.icon}
              </div>
              <p className="text-sm font-semibold text-black leading-snug">
                {a.title}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
