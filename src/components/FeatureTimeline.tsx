"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const features = [
  {
    num: "01",
    title: "Strategic Locations",
    desc: "Vibrant business centers across Delhi, Noida, and Gurgaon — right where opportunity lives.",
    perks: ["Direct Metro Connectivity", "Prime CBD Addresses", "24/7 Valet & Parking"],
  },
  {
    num: "02",
    title: "Built for Triumph",
    desc: "Every element crafted to fuel productivity, inspire creativity, and drive your team forward.",
    perks: ["Ergonomic Herman Miller Seating", "Acoustic Phone Booths", "Ultra-Fast 1Gbps Fiber"],
  },
  {
    num: "03",
    title: "Beyond Ordinary",
    desc: "Futuristic tech, premium amenities, and tailor-made workspaces that amplify how you work.",
    perks: ["Smart Access & Facial ID", "Gourmet Cafeterias", "Event & Wellness Lounges"],
  },
];

export default function FeatureTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-6">
      {features.map((f, i) => {
        const isActive = activeStep === i;
        return (
          <motion.div
            key={f.num}
            onClick={() => setActiveStep(i)}
            onMouseEnter={() => setActiveStep(i)}
            className={`p-7 rounded-3xl border transition-all duration-500 cursor-pointer ${
              isActive
                ? "bg-white border-[#d4622b]/40 shadow-[0_15px_40px_-10px_rgba(212,98,43,0.15)]"
                : "bg-transparent border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="flex gap-6 items-start">
              <span
                className={`text-4xl font-extrabold transition-colors shrink-0 leading-none ${
                  isActive ? "text-[#d4622b]" : "text-gray-200"
                }`}
              >
                {f.num}
              </span>
              <div className="flex-1">
                <h3
                  className={`text-2xl font-bold transition-colors ${
                    isActive ? "text-[#1a1a2e]" : "text-gray-500"
                  }`}
                >
                  {f.title}
                </h3>
                <p className="mt-2.5 text-gray-500 leading-relaxed max-w-lg text-[15px]">
                  {f.desc}
                </p>
                <motion.div
                  animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-4">
                    {f.perks.map((p) => (
                      <span
                        key={p}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-[#d4622b]/10 text-[#d4622b] border border-[#d4622b]/20 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4622b]" />
                        {p}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
