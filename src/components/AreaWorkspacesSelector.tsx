"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { AreaDetail } from "@/data/locations";

export interface WorkspaceUnit {
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

export function getWorkspacesForArea(area: AreaDetail, basePath: string = "/locations"): WorkspaceUnit[] {
  const isBoth =
    area.type.toLowerCase().includes("managed") &&
    area.type.toLowerCase().includes("coworking");
  const isManagedOnly =
    area.type.toLowerCase().includes("managed") && !isBoth;

  if (isBoth) {
    return [
      {
        id: `${area.slug}-managed`,
        badge: "MANAGED OFFICE",
        category: "managed",
        title: `Onward ${area.name} — Managed Office`,
        tagline: "Enterprise workspace for growing teams.",
        seats: area.seats || "500+ Seats",
        transit: area.transit || "3 min from Harkesh Nagar Okhla Metro",
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
        transit: area.transit || "3 min from Metro Station",
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

export default function AreaWorkspacesSelector({ area }: { area: AreaDetail }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "managed" | "coworking">("all");
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const allWorkspaces = useMemo(() => getWorkspacesForArea(area), [area]);

  const managedCount = useMemo(
    () => allWorkspaces.filter((w) => w.category === "managed").length,
    [allWorkspaces]
  );
  const coworkingCount = useMemo(
    () => allWorkspaces.filter((w) => w.category === "coworking").length,
    [allWorkspaces]
  );

  const filteredWorkspaces = useMemo(() => {
    if (activeFilter === "managed") {
      return allWorkspaces.filter((w) => w.category === "managed");
    }
    if (activeFilter === "coworking") {
      return allWorkspaces.filter((w) => w.category === "coworking");
    }
    return allWorkspaces;
  }, [allWorkspaces, activeFilter]);

  const handleFilterClick = (filter: "all" | "managed" | "coworking") => {
    setActiveFilter(filter);
    setSliderIndex(0);
    setIsExpanded(true);
  };

  const handlePrevSlide = () => {
    if (filteredWorkspaces.length <= 1) return;
    setSliderIndex((prev) => (prev === 0 ? filteredWorkspaces.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (filteredWorkspaces.length <= 1) return;
    setSliderIndex((prev) => (prev === filteredWorkspaces.length - 1 ? 0 : prev + 1));
  };

  const currentWorkspace = filteredWorkspaces[sliderIndex] || filteredWorkspaces[0];

  const centreSummaryText = useMemo(() => {
    const total = allWorkspaces.length;
    const parts: string[] = [];
    if (managedCount > 0) parts.push(`${managedCount} Managed Office`);
    if (coworkingCount > 0) parts.push(`${coworkingCount} Coworking`);
    return `${total} ${total === 1 ? "centre" : "centres"} · ${parts.join(" + ")}`;
  }, [allWorkspaces.length, managedCount, coworkingCount]);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-[#faf8f5] border-b border-gray-200/80">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ━━━━ LEFT COLUMN: LEVEL 2 AREA & CATEGORY FILTER CARD ━━━━ */}
          <div className="lg:col-span-5 xl:col-span-5 bg-[#f6f1e8] rounded-3xl p-6 sm:p-8 xl:p-9 border border-[#e8dfd2] shadow-xs flex flex-col justify-between min-h-[260px] lg:sticky lg:top-24">
            <div>
              <span className="text-[#d4622b] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                Micro-Market Overview
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d4622b] mt-1">
                {area.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1.5">
                {centreSummaryText}
              </p>
            </div>

            {/* Filter Pill Buttons */}
            <div className="mt-6 pt-5 border-t border-[#e8dfd2]/80">
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Filter by Workspace Type
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
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
          </div>

          {/* ━━━━ RIGHT COLUMN: LEVEL 3 WORKSPACE CARD PREVIEW / SLIDER ━━━━ */}
          <div className="lg:col-span-7 xl:col-span-7">
            {currentWorkspace && (
              <div className="bg-[#ede4d7] rounded-3xl p-6 sm:p-8 xl:p-9 border border-[#ded3c3] relative shadow-sm">
                {/* Top Row: Slide Counter */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#d4622b] uppercase tracking-wider">
                    Available Centre
                  </span>

                  {filteredWorkspaces.length > 1 && (
                    <span className="text-xs font-semibold text-gray-600 bg-white/60 px-2.5 py-1 rounded-full border border-black/5">
                      {sliderIndex + 1} of {filteredWorkspaces.length} options
                    </span>
                  )}
                </div>

                {/* Workspace Card */}
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md">
                  {/* Photo with Badge */}
                  <div className="relative aspect-[16/9] lg:aspect-[21/10] w-full bg-gray-900 overflow-hidden">
                    <Image
                      src={currentWorkspace.img}
                      alt={currentWorkspace.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />

                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-[#d4622b] text-white text-[10px] sm:text-xs font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-md">
                        {currentWorkspace.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                      <div className="space-y-3 flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] leading-snug">
                          {currentWorkspace.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                          {currentWorkspace.tagline}
                        </p>

                        {/* Metadata Icons */}
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

                      {/* Right Circular CTA Button (Scrolls to Tour/Contact Form) */}
                      <button
                        onClick={scrollToContact}
                        aria-label={`Book tour for ${currentWorkspace.title}`}
                        className="w-12 h-12 rounded-full bg-[#1a1a2e] hover:bg-[#d4622b] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 shrink-0 self-end sm:self-auto cursor-pointer"
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
                      </button>
                    </div>
                  </div>
                </div>

                {/* Slider Bottom Controls */}
                {filteredWorkspaces.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={handlePrevSlide}
                      aria-label="Previous workspace"
                      className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center transition-colors border border-gray-200 shadow-2xs cursor-pointer"
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
                      className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center transition-colors border border-gray-200 shadow-2xs cursor-pointer"
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
