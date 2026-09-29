"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CityData, AreaDetail } from "@/data/locations";

interface WorkspaceUnit {
  id: string;
  badge: "MANAGED OFFICE" | "COWORKING" | "ENTERPRISE SUITE";
  category: "managed" | "coworking";
  title: string;
  tagline: string;
  seats: string;
  transit: string;
  img: string;
  slug: string;
}

// Generate workspace offerings based on area metadata
function getWorkspacesForArea(area: AreaDetail, basePath: string): WorkspaceUnit[] {
  const isBoth =
    area.type.toLowerCase().includes("managed") &&
    area.type.toLowerCase().includes("coworking");
  const isManagedOnly =
    area.type.toLowerCase().includes("managed") && !isBoth;
  const isCoworkingOnly =
    area.type.toLowerCase().includes("coworking") && !isBoth;

  if (isBoth) {
    return [
      {
        id: `${area.slug}-managed`,
        badge: "MANAGED OFFICE",
        category: "managed",
        title: `Onward ${area.name} — Managed Office`,
        tagline: "Enterprise workspace for growing teams.",
        seats: area.seats || "500+ Seats",
        transit: area.transit || "3 mins from Harkesh Nagar Okhla Metro",
        img: area.img,
        slug: area.slug,
      },
      {
        id: `${area.slug}-coworking`,
        badge: "COWORKING",
        category: "coworking",
        title: `Onward ${area.name} — Coworking Space`,
        tagline: "Flexible desks and collaborative zones for agile teams.",
        seats: "250+ Desks",
        transit: area.transit || "3 mins from Metro Station",
        img: area.gallery?.[0] || area.img,
        slug: area.slug,
      },
    ];
  }

  if (isManagedOnly) {
    return [
      {
        id: `${area.slug}-managed`,
        badge: "MANAGED OFFICE",
        category: "managed",
        title: `Onward ${area.name} — Managed Office`,
        tagline: "Custom-fitted enterprise floors with dedicated management.",
        seats: area.seats || "400+ Seats",
        transit: area.transit || "Near Metro Station",
        img: area.img,
        slug: area.slug,
      },
    ];
  }

  // Coworking only
  return [
    {
      id: `${area.slug}-coworking`,
      badge: "COWORKING",
      category: "coworking",
      title: `Onward ${area.name} — Coworking Space`,
      tagline: "Dynamic community hub with premium shared amenities.",
      seats: area.seats || "350+ Seats",
      transit: area.transit || "Near Metro Station",
      img: area.img,
      slug: area.slug,
    },
  ];
}

// Normalized coordinates (0 - 100 percentage) for micro-markets within their respective city map
const cityPinCoords: Record<string, Record<string, { x: number; y: number }>> = {
  delhi: {
    "connaught-place": { x: 48, y: 22 },
    "janakpuri": { x: 18, y: 48 },
    "okhla-phase-2": { x: 50, y: 68 },
    "okhla-phase-3": { x: 68, y: 58 },
    "mohan-cooperative": { x: 58, y: 82 },
  },
  noida: {
    "sector-4": { x: 28, y: 32 },
    "sector-126": { x: 58, y: 54 },
    "sector-132": { x: 74, y: 76 },
  },
  gurgaon: {
    "udyog-vihar": { x: 35, y: 30 },
    "mg-road": { x: 58, y: 48 },
    "sohna-road": { x: 68, y: 76 },
  },
};

export default function CityMicroMarketsMap({ city }: { city: CityData }) {
  const { name: cityName, slug: citySlug, areas, basePath } = city;

  const [selectedSlug, setSelectedSlug] = useState<string>(areas[0]?.slug || "");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "managed" | "coworking">("all");
  const [isSliderExpanded, setIsSliderExpanded] = useState<boolean>(true);
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const coordsMap = cityPinCoords[citySlug] || {};

  const activeArea = useMemo(
    () => areas.find((a) => a.slug === selectedSlug) || areas[0],
    [areas, selectedSlug]
  );

  // All workspaces for the selected area
  const allWorkspaces = useMemo(() => {
    if (!activeArea) return [];
    return getWorkspacesForArea(activeArea, basePath);
  }, [activeArea, basePath]);

  const managedCount = useMemo(
    () => allWorkspaces.filter((w) => w.category === "managed").length,
    [allWorkspaces]
  );
  const coworkingCount = useMemo(
    () => allWorkspaces.filter((w) => w.category === "coworking").length,
    [allWorkspaces]
  );

  // Filtered workspaces based on selected category pill
  const filteredWorkspaces = useMemo(() => {
    if (activeFilter === "managed") {
      return allWorkspaces.filter((w) => w.category === "managed");
    }
    if (activeFilter === "coworking") {
      return allWorkspaces.filter((w) => w.category === "coworking");
    }
    return allWorkspaces;
  }, [allWorkspaces, activeFilter]);

  // Handle micro-market selection
  const handleSelectArea = (slug: string) => {
    setSelectedSlug(slug);
    setActiveFilter("all");
    setSliderIndex(0);
    setIsSliderExpanded(true);
  };

  // Handle filter tab click
  const handleFilterClick = (filter: "all" | "managed" | "coworking") => {
    setActiveFilter(filter);
    setSliderIndex(0);
    setIsSliderExpanded(true);
  };

  // Slider navigation
  const handlePrevSlide = () => {
    if (filteredWorkspaces.length <= 1) return;
    setSliderIndex((prev) => (prev === 0 ? filteredWorkspaces.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (filteredWorkspaces.length <= 1) return;
    setSliderIndex((prev) => (prev === filteredWorkspaces.length - 1 ? 0 : prev + 1));
  };

  const currentWorkspace = filteredWorkspaces[sliderIndex] || filteredWorkspaces[0];

  // Helper text for centre composition
  const centreSummaryText = useMemo(() => {
    if (!activeArea) return "";
    const total = allWorkspaces.length;
    const parts: string[] = [];
    if (managedCount > 0) parts.push(`${managedCount} Managed Office`);
    if (coworkingCount > 0) parts.push(`${coworkingCount} Coworking`);
    return `${total} ${total === 1 ? "centre" : "centres"} · ${parts.join(" + ")}`;
  }, [activeArea, allWorkspaces.length, managedCount, coworkingCount]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#faf8f5] border-t border-gray-200/80">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[#d4622b] text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Micro-Markets in {cityName}
            </span>
            <h2 className="mt-1 text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] tracking-tight">
              Pick a micro-market <br className="hidden sm:inline" />
              <span className="text-[#d4622b]">to see its workspaces.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#d4622b]" />
              {areas.length} Prime Commercial Hubs
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* ━━━━ LEFT COLUMN: INTERACTIVE MAP CANVAS ━━━━ */}
          <div className="lg:col-span-5 xl:col-span-5 bg-[#f6f1e8] rounded-3xl p-6 sm:p-8 xl:p-10 border border-[#e8dfd2] relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[440px] sm:min-h-[540px] lg:sticky lg:top-24">
            {/* Top Map Header */}
            <div className="relative z-20 mb-4">
              <p className="text-base sm:text-lg font-bold text-[#1a1a2e] leading-tight">
                Pick a micro-market
              </p>
              <p className="text-xs sm:text-sm text-gray-600 font-normal">
                to see its workspaces.
              </p>
            </div>

            {/* Ambient Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-6xl sm:text-8xl font-black tracking-widest text-[#1a1a2e]/[0.04] uppercase">
                {cityName}
              </span>
            </div>

            {/* Subtle Map Grid Curve Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none stroke-[#e3d7c6] opacity-70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M -50,140 Q 200,80 500,180 T 1000,120"
                fill="none"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M -50,300 Q 250,240 600,360 T 1000,300"
                fill="none"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M 120,-30 Q 180,220 140,560"
                fill="none"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M 380,-30 Q 340,280 400,560"
                fill="none"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Interactive Location Pins */}
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[380px] z-10 my-4">
              {areas.map((area) => {
                const coords = coordsMap[area.slug] || { x: 50, y: 50 };
                const isSelected = selectedSlug === area.slug;
                const isHovered = hoveredSlug === area.slug;
                const areaWorkspaces = getWorkspacesForArea(area, basePath);
                const countText = `${areaWorkspaces.length} ${
                  areaWorkspaces.length === 1 ? "centre" : "centres"
                }`;

                return (
                  <div
                    key={area.slug}
                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    onClick={() => handleSelectArea(area.slug)}
                    onMouseEnter={() => setHoveredSlug(area.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                  >
                    {/* Pulse Ring for Selected Pin */}
                    {isSelected && (
                      <>
                        <span className="absolute -inset-3 rounded-full bg-[#d4622b]/25 animate-ping" />
                        <span className="absolute -inset-2 rounded-full bg-[#d4622b]/35" />
                      </>
                    )}

                    {/* Dot Core */}
                    <div
                      className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? "w-4.5 h-4.5 bg-[#d4622b] ring-4 ring-[#d4622b]/20 shadow-md scale-110"
                          : "w-3.5 h-3.5 bg-[#d4622b]/80 group-hover:bg-[#d4622b] group-hover:scale-125"
                      }`}
                    />

                    {/* Pin Label */}
                    <div
                      className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-200 ${
                        isSelected
                          ? "text-[#d4622b] font-bold text-xs sm:text-sm drop-shadow-xs"
                          : "text-gray-700 font-semibold text-[11px] sm:text-xs group-hover:text-[#d4622b]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-md border border-gray-200/50 shadow-2xs">
                        <span>{area.name}</span>
                        {isSelected && (
                          <span className="text-[9px] bg-[#d4622b] text-white px-1.5 py-0.2 rounded font-bold">
                            {countText}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ━━━━ RIGHT COLUMN: LEVEL 2 (FILTERS) + LEVEL 3 (EXPANDABLE SLIDER) ━━━━ */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            {/* LEVEL 2: SELECTED MICRO-MARKET FILTER HEADER */}
            {activeArea && (
              <div className="bg-[#f6f1e8] rounded-3xl p-6 sm:p-8 xl:p-9 border border-[#e8dfd2] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#d4622b]">
                      {activeArea.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                      {centreSummaryText}
                    </p>
                  </div>

                  {!isSliderExpanded && (
                    <button
                      onClick={() => setIsSliderExpanded(true)}
                      className="text-xs font-bold text-[#d4622b] hover:underline self-start sm:self-auto cursor-pointer"
                    >
                      Show Workspaces &darr;
                    </button>
                  )}
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 mt-5">
                  {/* All Button */}
                  <button
                    onClick={() => handleFilterClick("all")}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      activeFilter === "all"
                        ? "bg-[#d4622b] text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/80"
                    }`}
                  >
                    <span>All</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        activeFilter === "all"
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {allWorkspaces.length}
                    </span>
                  </button>

                  {/* Managed Button */}
                  {managedCount > 0 && (
                    <button
                      onClick={() => handleFilterClick("managed")}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                        activeFilter === "managed"
                          ? "bg-[#d4622b] text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/80"
                      }`}
                    >
                      <span>Managed</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          activeFilter === "managed"
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {managedCount}
                      </span>
                    </button>
                  )}

                  {/* Coworking Button */}
                  {coworkingCount > 0 && (
                    <button
                      onClick={() => handleFilterClick("coworking")}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                        activeFilter === "coworking"
                          ? "bg-[#d4622b] text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/80"
                      }`}
                    >
                      <span>Coworking</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          activeFilter === "coworking"
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {coworkingCount}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* LEVEL 3: EXPANDABLE VERTICAL CARD SLIDER */}
            <AnimatePresence>
              {isSliderExpanded && currentWorkspace && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#ede4d7] rounded-3xl p-6 sm:p-8 xl:p-9 border border-[#ded3c3] relative shadow-sm">
                    {/* Close Button on top-left (matching reference image) */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setIsSliderExpanded(false)}
                        title="Close slider"
                        aria-label="Close slider"
                        className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      {filteredWorkspaces.length > 1 && (
                        <span className="text-xs font-semibold text-gray-500">
                          {sliderIndex + 1} of {filteredWorkspaces.length} options
                        </span>
                      )}
                    </div>

                    {/* Workspace Card */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md">
                      {/* Card Image with Badge */}
                      <div className="relative aspect-[16/9] lg:aspect-[21/10] w-full bg-gray-900 overflow-hidden">
                        <Image
                          src={currentWorkspace.img}
                          alt={currentWorkspace.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                        {/* Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-block bg-[#d4622b] text-white text-[10px] sm:text-xs font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-md">
                            {currentWorkspace.badge}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                          <div className="space-y-3 flex-1">
                            <h4 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] leading-snug">
                              {currentWorkspace.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                              {currentWorkspace.tagline}
                            </p>

                            {/* Metadata Icons Row */}
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-gray-600">
                              <div className="flex items-center gap-1.5 font-medium">
                                <svg
                                  className="w-4 h-4 text-gray-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                  />
                                </svg>
                                <span>{currentWorkspace.seats}</span>
                              </div>

                              <div className="flex items-center gap-1.5 font-medium">
                                <svg
                                  className="w-4 h-4 text-gray-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                                <span>{currentWorkspace.transit}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Circular CTA Button */}
                          <Link
                            href={`${basePath}/${currentWorkspace.slug}`}
                            aria-label={`View ${currentWorkspace.title}`}
                            className="w-12 h-12 rounded-full bg-[#1a1a2e] hover:bg-[#d4622b] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 shrink-0 self-end sm:self-auto"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Slider Bottom Controls: [<]  ● ·  [>] */}
                    {filteredWorkspaces.length > 1 && (
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                          onClick={handlePrevSlide}
                          aria-label="Previous workspace"
                          className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center transition-colors border border-gray-200 shadow-xs cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-1.5">
                          {filteredWorkspaces.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSliderIndex(idx)}
                              aria-label={`Go to slide ${idx + 1}`}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                idx === sliderIndex
                                  ? "bg-[#d4622b] w-4"
                                  : "bg-gray-400/60 hover:bg-gray-500 w-2"
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={handleNextSlide}
                          aria-label="Next workspace"
                          className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center transition-colors border border-gray-200 shadow-xs cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
