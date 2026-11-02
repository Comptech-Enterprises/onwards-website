"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { CityData } from "@/data/locations";

const CityMicroMarketsMap = dynamic(
  () => import("@/components/CityMicroMarketsMap"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-[#b44512] border-t-transparent animate-spin" />
          <span className="text-xs text-gray-500 font-medium">Loading Map...</span>
        </div>
      </div>
    ),
  }
);

export default function LazyCityMicroMarketsMap({ city }: { city: CityData }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    let idleId: number | undefined;

    const load = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        idleId = (window as Window).requestIdleCallback(() => setInView(true), {
          timeout: 2500,
        });
      } else {
        setInView(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (idleId && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as Window).cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <div ref={ref} className="min-h-[400px]">
      {inView ? <CityMicroMarketsMap city={city} /> : null}
    </div>
  );
}
