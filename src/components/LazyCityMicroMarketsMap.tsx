"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { CityData } from "@/data/locations";

const CityMicroMarketsMap = dynamic(
  () => import("@/components/CityMicroMarketsMap"),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-[#c24f1c] border-t-transparent animate-spin" />
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[400px]">
      {inView ? <CityMicroMarketsMap city={city} /> : null}
    </div>
  );
}
