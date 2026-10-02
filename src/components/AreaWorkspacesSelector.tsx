"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AreaDetail } from "@/data/locations";
import { getWorkspacesForArea } from "@/data/workspaces";
import type { WorkspaceUnit } from "@/data/workspaces";
import AutoSlider from "@/components/AutoSlider";
export type { WorkspaceUnit } from "@/data/workspaces";
export { getWorkspacesForArea } from "@/data/workspaces";

function WorkspaceCard({ ws, area, cityBasePath }: { ws: WorkspaceUnit; area: AreaDetail; cityBasePath?: string }) {
  const centreHref = cityBasePath ? `${cityBasePath}/${area.slug}/${ws.category}` : undefined;

  const inner = (
    <>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={ws.img}
          alt={ws.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
      <h3 className="mt-4 text-lg font-bold text-black group-hover:text-[#d4622b] transition-colors">
        {ws.title}
      </h3>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-1">
        {ws.badge} &middot; {ws.seats}
      </p>
      <span className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-[#d4622b] group-hover:text-black transition-colors">
        View Centre &rarr;
      </span>
    </>
  );

  if (centreHref) {
    return (
      <Link href={centreHref} className="group block">
        {inner}
      </Link>
    );
  }
  return <div className="group">{inner}</div>;
}

export default function AreaWorkspacesSelector({ area, cityBasePath }: { area: AreaDetail; cityBasePath?: string }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "managed" | "coworking">("all");

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
  };

  const centreSummaryText = useMemo(() => {
    const total = allWorkspaces.length;
    const parts: string[] = [];
    if (managedCount > 0) parts.push(`${managedCount} Managed Office`);
    if (coworkingCount > 0) parts.push(`${coworkingCount} Coworking`);
    return `${total} ${total === 1 ? "centre" : "centres"} · ${parts.join(" + ")}`;
  }, [allWorkspaces.length, managedCount, coworkingCount]);

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

        {/* Cards: static grid if <=2 on desktop, auto-scroll if more */}
        {filteredWorkspaces.length <= 2 ? (
          <>
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredWorkspaces.map((ws) => (
                <WorkspaceCard key={ws.id} ws={ws} area={area} cityBasePath={cityBasePath} />
              ))}
            </div>
            <div className="sm:hidden">
              <AutoSlider interval={3500}>
                {filteredWorkspaces.map((ws) => (
                  <WorkspaceCard key={ws.id} ws={ws} area={area} cityBasePath={cityBasePath} />
                ))}
              </AutoSlider>
            </div>
          </>
        ) : (
          <AutoSlider
            interval={3500}
            showArrows
            slideClassName="w-[85%] sm:w-[48%] lg:w-[32%] flex-shrink-0 px-2"
          >
            {filteredWorkspaces.map((ws) => (
              <WorkspaceCard key={ws.id} ws={ws} area={area} cityBasePath={cityBasePath} />
            ))}
          </AutoSlider>
        )}
      </div>
    </section>
  );
}
