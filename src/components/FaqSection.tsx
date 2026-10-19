"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-gray-200/80">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-black">{f.q}</h3>
                  <span className="shrink-0 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-black">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M20 12H4" : "M12 4v16m8-8H4"} />
                    </svg>
                  </span>
                </button>
                <motion.div
 initial={false}
 animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
 transition={{ duration: 0.3 }}
 aria-hidden={!isOpen}
 className="overflow-hidden"
 >
                      <p className="text-gray-600 text-base leading-relaxed pb-6">{f.a}</p>
                    </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
