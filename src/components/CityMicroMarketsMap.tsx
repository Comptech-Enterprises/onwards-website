"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CityData } from "@/data/locations";
import {
  delhiBoundaryPath,
  nerveArteries1,
  nerveArteries2,
  nerveArteries3,
  backgroundNerves,
} from "./StrategicLocationsMap";

interface CityMapPin {
  x: number;
  y: number;
  labelPos?: "left" | "right";
  subtext?: string;
}

interface CityMapConfig {
  viewBox: string;
  pins: Record<string, CityMapPin>;
  watermark: string;
  tagline: string;
  watermarkPos: { x: number; y: number };
  scale: {
    titleSize: number;
    subSize: number;
    dotRadius: number;
    crosshairLen: number;
    pulseMax: number;
    watermarkTitle: number;
    watermarkSub: number;
  };
}

const cityMapConfigs: Record<string, CityMapConfig> = {
  delhi: {
    viewBox: "-60 40 880 480",
    pins: {
      "connaught-place": { x: 421.5, y: 167.0, labelPos: "right", subtext: "Central Business Dist." },
      "janakpuri": { x: 80.0, y: 310.0, labelPos: "right", subtext: "West Delhi Commercial" },
      "okhla-phase-2": { x: 535.0, y: 410.0, labelPos: "left", subtext: "South Delhi Tech Hub" },
      "okhla-phase-3": { x: 558.0, y: 388.0, labelPos: "right", subtext: "Enterprise District" },
      "mohan-cooperative": { x: 600.0, y: 453.6, labelPos: "right", subtext: "Industrial Corridor" },
    },
    watermark: "DELHI",
    tagline: "METRO ARTERIAL MATRIX",
    watermarkPos: { x: 780, y: 480 },
    scale: {
      titleSize: 11.5,
      subSize: 9,
      dotRadius: 4.2,
      crosshairLen: 9.5,
      pulseMax: 17,
      watermarkTitle: 13,
      watermarkSub: 9,
    },
  },
  noida: {
    viewBox: "460 220 480 280",
    pins: {
      "sector-4": { x: 605.0, y: 320.0, labelPos: "right", subtext: "Institutional Core" },
      "sector-126": { x: 677.1, y: 385.3, labelPos: "right", subtext: "Tech & Corporate Dist." },
      "sector-132": { x: 754.3, y: 468.2, labelPos: "right", subtext: "Expressway Campus" },
    },
    watermark: "NOIDA",
    tagline: "EXPRESSWAY TECH CORRIDOR",
    watermarkPos: { x: 900, y: 475 },
    scale: {
      titleSize: 7,
      subSize: 5.5,
      dotRadius: 3,
      crosshairLen: 6.5,
      pulseMax: 12,
      watermarkTitle: 8.5,
      watermarkSub: 5.5,
    },
  },
  gurgaon: {
    viewBox: "20 380 420 270",
    pins: {
      "udyog-vihar": { x: 139.3, y: 475.5, labelPos: "right", subtext: "Adjacent Cyber City" },
      "mg-road": { x: 230.0, y: 535.0, labelPos: "right", subtext: "CBD Retail & Tech" },
      "sohna-road": { x: 295.0, y: 645.0, labelPos: "right", subtext: "Southern Peripheral Core" },
    },
    watermark: "GURUGRAM",
    tagline: "CYBER CITY & ARTERIALS",
    watermarkPos: { x: 400, y: 620 },
    scale: {
      titleSize: 6.5,
      subSize: 5.2,
      dotRadius: 2.8,
      crosshairLen: 6,
      pulseMax: 11,
      watermarkTitle: 8,
      watermarkSub: 5.2,
    },
  },
};

export default function CityMicroMarketsMap({ city }: { city: CityData }) {
  const { name: cityName, slug: citySlug, areas, basePath } = city;

  // By default, no popup is open until the user clicks on a location pin
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const mapConfig = cityMapConfigs[citySlug] || cityMapConfigs.delhi;

  const activeArea = useMemo(() => {
    if (!selectedSlug) return null;
    return areas.find((a) => a.slug === selectedSlug) || null;
  }, [areas, selectedSlug]);

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-[#faf8f5] border-t border-gray-200/80">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="mb-5 sm:mb-6">
          <span className="text-[#d4622b] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
            Micro-Markets in {cityName}
          </span>
          <h2 className="mt-0.5 text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a1a2e] tracking-tight">
            Pick a micro-market <span className="text-[#d4622b]">to explore its workspaces.</span>
          </h2>
        </div>

        {/* ━━━━ BALANCED FULL-WIDTH VECTOR SVG MAP CANVAS ━━━━ */}
        <div className="w-full bg-[#f6f1e8] rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#e8dfd2] relative overflow-hidden shadow-xs flex flex-col justify-between h-[420px] sm:h-[470px] lg:h-[520px] max-h-[540px]">
          {/* Top Bar inside Map */}
          <div className="relative z-20 mb-1 flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#1a1a2e] leading-tight">
                {cityName} Transit & Commercial Nerve Map
              </p>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Click any pin to inspect the hub and navigate to its spaces
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-gray-200 text-[11px] font-semibold text-gray-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4622b] animate-pulse" />
              {areas.length} Hubs Available
            </span>
          </div>

          {/* Full-Width SVG Map Container */}
          <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden select-none">
            <svg
              viewBox={mapConfig.viewBox}
              className="w-full h-full object-contain"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Orange Pin Ripple Radial Gradient */}
                <radialGradient id="cityMapFullHaloOrange" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d4622b" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#d4622b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#d4622b" stopOpacity="0" />
                </radialGradient>

                {/* Glowing filter for nerves */}
                <filter id="cityMapFullNerveGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. Background Capillary Road Network */}
              <path
                d={backgroundNerves}
                fill="none"
                stroke="#ddd6cb"
                strokeWidth="0.65"
                opacity={0.9}
              />

              {/* 2. Animated Pulsing Neural Arteries */}
              <motion.path
                d={nerveArteries1}
                fill="none"
                stroke="#1a1a2e"
                strokeWidth="1.1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{
                  pathLength: [0, 1],
                  opacity: [0, 0.85, 0.35],
                }}
                viewport={{ once: false }}
                transition={{
                  duration: 2.2,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 3.2,
                }}
                filter="url(#cityMapFullNerveGlow)"
              />

              <motion.path
                d={nerveArteries2}
                fill="none"
                stroke="#d4622b"
                strokeWidth="1.3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{
                  pathLength: [0, 1],
                  opacity: [0, 0.95, 0.45],
                }}
                viewport={{ once: false }}
                transition={{
                  duration: 2.5,
                  delay: 0.5,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 3.2,
                }}
                filter="url(#cityMapFullNerveGlow)"
              />

              <motion.path
                d={nerveArteries3}
                fill="none"
                stroke="#1a1a2e"
                strokeWidth="1.1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{
                  pathLength: [0, 1],
                  opacity: [0, 0.85, 0.35],
                }}
                viewport={{ once: false }}
                transition={{
                  duration: 2.6,
                  delay: 0.9,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 3.2,
                }}
                filter="url(#cityMapFullNerveGlow)"
              />

              {/* 3. Delhi State Boundary Outline */}
              <motion.path
                d={delhiBoundaryPath}
                fill="none"
                stroke="#8c8273"
                strokeWidth="1.3"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* 4. Plotted Hub Pins for Current City */}
              {areas.map((area, i) => {
                const pin = mapConfig.pins[area.slug] || { x: 50, y: 50, labelPos: "right" };
                const isSelected = activeArea?.slug === area.slug;
                const isHovered = hoveredSlug === area.slug;
                const isLeft = pin.labelPos === "left";
                const countText = `${area.seats} · ${area.type}`;

                const crosshair = mapConfig.scale.crosshairLen;
                const dotR = isSelected
                  ? mapConfig.scale.dotRadius * 1.45
                  : isHovered
                  ? mapConfig.scale.dotRadius * 1.3
                  : mapConfig.scale.dotRadius;

                return (
                  <g
                    key={area.slug}
                    onClick={() => setSelectedSlug((prev) => (prev === area.slug ? null : area.slug))}
                    onMouseEnter={() => setHoveredSlug(area.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    className="cursor-pointer group"
                  >
                    {/* Crosshair Targeting Lines */}
                    <line
                      x1={pin.x - crosshair}
                      y1={pin.y}
                      x2={pin.x + crosshair}
                      y2={pin.y}
                      stroke={isSelected ? "#d4622b" : "#1a1a2e"}
                      strokeWidth={isSelected ? 1.5 : 1}
                      strokeOpacity={isSelected || isHovered ? 1 : 0.45}
                    />
                    <line
                      x1={pin.x}
                      y1={pin.y - crosshair}
                      x2={pin.x}
                      y2={pin.y + crosshair}
                      stroke={isSelected ? "#d4622b" : "#1a1a2e"}
                      strokeWidth={isSelected ? 1.5 : 1}
                      strokeOpacity={isSelected || isHovered ? 1 : 0.45}
                    />

                    {/* Radiating Radar Ripple */}
                    <motion.circle
                      cx={pin.x}
                      cy={pin.y}
                      animate={{
                        r: isSelected
                          ? [mapConfig.scale.dotRadius, mapConfig.scale.pulseMax * 1.3]
                          : isHovered
                          ? [mapConfig.scale.dotRadius, mapConfig.scale.pulseMax * 1.1]
                          : [mapConfig.scale.dotRadius, mapConfig.scale.pulseMax * 0.75],
                        opacity: isSelected ? [1, 0] : isHovered ? [0.95, 0] : [0.55, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: isSelected ? 1.8 : 2.2,
                        ease: "easeOut",
                        delay: (i * 0.35) % 1.5,
                      }}
                      fill="none"
                      stroke={isSelected ? "#d4622b" : "#d4622b"}
                      strokeWidth={isSelected ? 1.6 : 1.2}
                    />

                    {/* Radial Glow Halo */}
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={isSelected ? mapConfig.scale.pulseMax * 1.4 : isHovered ? mapConfig.scale.pulseMax * 1.2 : mapConfig.scale.pulseMax * 0.8}
                      fill="url(#cityMapFullHaloOrange)"
                      opacity={isSelected ? 0.9 : 0.6}
                    />

                    {/* Solid Center Dot */}
                    <motion.circle
                      cx={pin.x}
                      cy={pin.y}
                      r={dotR}
                      fill={isSelected ? "#d4622b" : "#1a1a2e"}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 2 : 1.5}
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 350 }}
                    />

                    {/* Micro-market Name + Subtitle Label */}
                    <text
                      x={isLeft ? pin.x - crosshair - 5 : pin.x + crosshair + 5}
                      y={pin.y - 2}
                      textAnchor={isLeft ? "end" : "start"}
                      className="font-bold select-none cursor-pointer transition-colors"
                      fill={isSelected || isHovered ? "#d4622b" : "#1a1a2e"}
                      style={{
                        fontSize: `${mapConfig.scale.titleSize}px`,
                        paintOrder: "stroke fill",
                        stroke: "#f6f1e8",
                        strokeWidth: 3,
                        strokeLinejoin: "round",
                      }}
                      fontFamily="inherit"
                    >
                      <tspan x={isLeft ? pin.x - crosshair - 5 : pin.x + crosshair + 5} dy="0">
                        {area.name}
                      </tspan>
                      <tspan
                        x={isLeft ? pin.x - crosshair - 5 : pin.x + crosshair + 5}
                        dy={mapConfig.scale.titleSize + 1}
                        fill={isSelected ? "#d4622b" : isHovered ? "#d4622b" : "#6b7280"}
                        style={{
                          fontSize: `${mapConfig.scale.subSize}px`,
                          fontWeight: isSelected ? 700 : 600,
                          stroke: "#f6f1e8",
                          strokeWidth: 2,
                        }}
                      >
                        {pin.subtext || countText}
                      </tspan>
                    </text>
                  </g>
                );
              })}

              {/* 5. Bottom Right Typography Watermarks */}
              <text
                x={mapConfig.watermarkPos.x}
                y={mapConfig.watermarkPos.y}
                textAnchor="end"
                className="font-bold fill-[#1a1a2e]/15 tracking-[0.28em] uppercase select-none pointer-events-none"
                style={{ fontSize: `${mapConfig.scale.watermarkTitle}px` }}
                fontFamily="inherit"
              >
                {mapConfig.watermark}
              </text>
              <text
                x={mapConfig.watermarkPos.x}
                y={mapConfig.watermarkPos.y + mapConfig.scale.watermarkSub + 3}
                textAnchor="end"
                className="font-semibold fill-[#6b7280]/40 tracking-[0.2em] uppercase select-none pointer-events-none"
                style={{ fontSize: `${mapConfig.scale.watermarkSub}px` }}
                fontFamily="inherit"
              >
                {mapConfig.tagline}
              </text>
            </svg>
          </div>

          {/* ━━━━ COMPACT FLOATING LOCATION POPUP BOX (OPENS ONLY ON PIN CLICK) ━━━━ */}
          <AnimatePresence mode="wait">
            {activeArea && (
              <motion.div
                key={activeArea.slug}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 max-w-[300px] sm:max-w-[340px] bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-[#e8dfd2] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-between gap-2.5 sm:gap-3"
              >
                {/* Location Info & Thumbnail Link */}
                <Link
                  href={`${basePath}/${activeArea.slug}`}
                  className="flex items-center gap-2.5 flex-1 min-w-0 group cursor-pointer"
                >
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200 shadow-2xs">
                    <Image
                      src={activeArea.img}
                      alt={activeArea.name}
                      fill
                      sizes="48px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold tracking-wider text-[#d4622b] uppercase block truncate">
                      {activeArea.type}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors truncate leading-tight">
                      {activeArea.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 truncate mt-0.5">
                      {activeArea.seats} · {activeArea.transit}
                    </p>
                  </div>
                </Link>

                {/* Compact Arrow CTA Navigation Button */}
                <Link
                  href={`${basePath}/${activeArea.slug}`}
                  aria-label={`Go to ${activeArea.name} page`}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1a1a2e] hover:bg-[#d4622b] text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 shrink-0 group/btn"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                {/* Dismiss Button */}
                <button
                  type="button"
                  onClick={() => setSelectedSlug(null)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close popup"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
