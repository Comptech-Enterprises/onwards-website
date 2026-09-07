"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type HubLocation = {
  id: string;
  name: string;
  city: "Delhi" | "Noida" | "Gurgaon";
  x: number; // percentage in viewBox (0 - 100)
  y: number;
  seats: string;
  type: string;
};

const HUBS: HubLocation[] = [
  // Delhi
  { id: "cp", name: "Connaught Place", city: "Delhi", x: 48, y: 38, seats: "450+ Seats", type: "Enterprise HQ" },
  { id: "np", name: "Nehru Place", city: "Delhi", x: 55, y: 52, seats: "320+ Seats", type: "Tech Hub" },
  { id: "sk", name: "Saket", city: "Delhi", x: 51, y: 64, seats: "280+ Seats", type: "Executive Suites" },
  
  // Gurgaon
  { id: "cc", name: "Cyber City", city: "Gurgaon", x: 26, y: 68, seats: "600+ Seats", type: "Global Flagship" },
  { id: "gc", name: "Golf Course Rd", city: "Gurgaon", x: 22, y: 78, seats: "400+ Seats", type: "Luxury Suites" },
  { id: "sr", name: "Sohna Road", city: "Gurgaon", x: 30, y: 88, seats: "350+ Seats", type: "Innovation Hub" },
  
  // Noida
  { id: "s62", name: "Sector 62", city: "Noida", x: 76, y: 44, seats: "500+ Seats", type: "Tech Campus" },
  { id: "s16", name: "Sector 16", city: "Noida", x: 70, y: 56, seats: "380+ Seats", type: "Metro Linked" },
  { id: "s132", name: "Sector 132", city: "Noida", x: 80, y: 72, seats: "420+ Seats", type: "Expressway Hub" },
];

export default function NetworkMap({ activeCity }: { activeCity: "Delhi" | "Noida" | "Gurgaon" }) {
  const [hoveredHub, setHoveredHub] = useState<HubLocation | null>(null);

  const activeHubs = HUBS.filter((h) => h.city === activeCity);

  return (
    <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto rounded-3xl bg-[#1a1a2e] border border-gray-800 p-6 overflow-hidden shadow-2xl">
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,98,43,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,98,43,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient background glow for active city */}
      <motion.div
        animate={{
          x: activeCity === "Delhi" ? "0%" : activeCity === "Gurgaon" ? "-30%" : "30%",
          y: activeCity === "Delhi" ? "-10%" : "20%",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#d4622b]/20 blur-[100px] pointer-events-none"
      />

      {/* SVG Network Lines & Radar Nodes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="netLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4622b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Metro / Intercity Connection Arteries */}
        <motion.path
          d="M 26 68 L 48 38 L 76 44 L 80 72 L 70 56 L 55 52 L 51 64 L 22 78 L 30 88"
          stroke="url(#netLineGrad)"
          strokeWidth="0.4"
          strokeDasharray="1.5 1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Triangle connection of active city hubs */}
        {activeHubs.length >= 3 && (
          <motion.polygon
            points={`${activeHubs[0].x},${activeHubs[0].y} ${activeHubs[1].x},${activeHubs[1].y} ${activeHubs[2].x},${activeHubs[2].y}`}
            fill="rgba(212, 98, 43, 0.08)"
            stroke="#d4622b"
            strokeWidth="0.6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </svg>

      {/* Hub Interactive Markers */}
      {HUBS.map((hub) => {
        const isActive = hub.city === activeCity;
        return (
          <div
            key={hub.id}
            style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            onMouseEnter={() => setHoveredHub(hub)}
            onMouseLeave={() => setHoveredHub(null)}
          >
            {/* Outer radar pulse */}
            {isActive && (
              <motion.div
                animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-2 rounded-full bg-[#d4622b]/40 pointer-events-none"
              />
            )}

            {/* Core Node */}
            <motion.div
              animate={{
                scale: isActive ? 1.2 : 0.85,
                backgroundColor: isActive ? "#d4622b" : "#4b5563",
                borderColor: isActive ? "#ffffff" : "#374151",
              }}
              className="relative w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>

            {/* Label below node */}
            <div
              className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide transition-colors ${
                isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
              }`}
            >
              {hub.name}
            </div>
          </div>
        );
      })}

      {/* Hub Detail Tooltip Card */}
      <AnimatePresence>
        {hoveredHub && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              left: `${Math.min(Math.max(hoveredHub.x, 20), 80)}%`,
              top: `${Math.max(hoveredHub.y - 18, 12)}%`,
            }}
            className="pointer-events-none absolute -translate-x-1/2 z-30 bg-[#121224]/95 border border-[#d4622b]/50 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl text-white w-48"
          >
            <div className="flex items-center justify-between text-[10px] text-[#d4622b] font-bold tracking-wider uppercase">
              <span>{hoveredHub.city}</span>
              <span>{hoveredHub.seats}</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">{hoveredHub.name}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{hoveredHub.type}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Footer HUD */}
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-800/80 pt-3 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d4622b] animate-pulse" />
          <span>Active NCR Coverage: <strong className="text-white">{activeCity} Cluster</strong></span>
        </div>
        <div className="hidden sm:block text-gray-400">
          <span>High-Speed Transit &bull; 100% Redundant Power</span>
        </div>
      </div>
    </div>
  );
}
