"use client";

import { useState, useMemo } from "react";
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
    if (activeFilter === "managed") return allWorkspaces.filter((w) => w.category === "managed");
    if (activeFilter === "coworking") return allWorkspaces.filter((w) => w.category === "coworking");
    return allWorkspaces;
  }, [allWorkspaces, activeFilter]);

  const handleFilterClick = (filter: "all" | "managed" | "coworking") => {
    setActiveFilter(filter);
    setSliderIndex(0);
  };

  const handlePrev = () => {
    if (filteredWorkspaces.length <= 1) return;
    setSliderIndex((p) => (p === 0 ? filteredWorkspaces.length - 1 : p - 1));
  };

  const handleNext = () => {
    if (filteredWorkspaces.length <= 1) return;
    setSliderIndex((p) => (p === filteredWorkspaces.length - 1 ? 0 : p + 1));
  };

  const current = filteredWorkspaces[sliderIndex] || filteredWorkspaces[0];

  const centreSummaryText = useMemo(() => {
    const total = allWorkspaces.length;
    const parts: string[] = [];
    if (managedCount > 0) parts.push(`${managedCount} Managed Office`);
    if (coworkingCount > 0) parts.push(`${coworkingCount} Coworking`);
    return `${total} ${total === 1 ? "centre" : "centres"} · ${parts.join(" + ")}`;
  }, [allWorkspaces.length, managedCount, coworkingCount]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 sm:py-14 bg-[#faf8f5] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Micro-market overview card */}
        <div className="bg-[#f6f1e8] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#e8dfd2] mb-6 sm:mb-8">
          <span className="text-[#d4622b] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            Micro-Market Overview
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#d4622b] mt-1">
            {area.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            {centreSummaryText}
          </p>
          <div className="mt-4 pt-4 border-t border-[#e8dfd2]/80">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
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
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
              activeFilter === "all" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
            }`}>
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
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeFilter === "managed" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
              }`}>
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
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeFilter === "coworking" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
              }`}>
                {coworkingCount}
              </span>
            </button>
          )}
            </div>
          </div>
        </div>

        {/* Full-width workspace card */}
        {current && (
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md">
            {/* Photo with badge */}
            <div className="relative aspect-[21/9] w-full bg-gray-900 overflow-hidden">
              <Image
                src={current.img}
                alt={current.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-[#d4622b] text-white text-[10px] sm:text-xs font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-md">
                  {current.badge}
                </span>
              </div>
            </div>

            {/* Card body */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] leading-snug">
                    {current.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {current.tagline}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{current.seats}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{current.transit}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={scrollToContact}
                  aria-label={`Book tour for ${current.title}`}
                  className="w-12 h-12 rounded-full bg-[#1a1a2e] hover:bg-[#d4622b] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 shrink-0 self-end sm:self-auto cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Slider controls */}
        {filteredWorkspaces.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={handlePrev} aria-label="Previous" className="w-8 h-8 rounded-lg bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center border border-gray-200 shadow-2xs cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-1.5">
              {filteredWorkspaces.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSliderIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === sliderIndex ? "bg-[#d4622b] w-4" : "bg-gray-400/60 hover:bg-gray-500 w-2"
                  }`}
                />
              ))}
            </div>
            <button onClick={handleNext} aria-label="Next" className="w-8 h-8 rounded-lg bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center border border-gray-200 shadow-2xs cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
