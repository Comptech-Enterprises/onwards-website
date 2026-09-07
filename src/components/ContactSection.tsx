"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import SpotlightCard from "./SpotlightCard";

const solutionsList = [
  "Managed Office",
  "Private Suites",
  "Virtual Office",
  "Enterprise HQ",
  "Custom Built",
];

const directContacts = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    ),
    label: "Direct Phone",
    value: "+91 9910668152",
    href: "tel:9910668152",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    ),
    label: "Email Enquiries",
    value: "info@onwardworkspaces.com",
    href: "mailto:info@onwardworkspaces.com",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    ),
    label: "Headquarters",
    value: "Delhi NCR, India",
    href: "#locations",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedSolution, setSelectedSolution] = useState(solutionsList[0]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  // Multi-plane scrolling parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Parallax transform layers
  const orb1Y = useTransform(smoothProgress, [0, 1], [-120, 120]);
  const orb2Y = useTransform(smoothProgress, [0, 1], [100, -100]);
  const floatingBadge1Y = useTransform(smoothProgress, [0, 1], [80, -80]);
  const floatingBadge2Y = useTransform(smoothProgress, [0, 1], [-60, 60]);
  const formOffset = useTransform(smoothProgress, [0, 1], [40, -40]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-[#faf8f5] overflow-hidden"
    >
      {/* ━━━ PARALLAX AMBIENT BACKGROUND GLOWS ━━━ */}
      <motion.div
        style={{ y: orb1Y }}
        className="pointer-events-none absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-[#d4622b]/10 blur-[130px]"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="pointer-events-none absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-[#f59e0b]/10 blur-[140px]"
      />

      {/* Subtle blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,98,43,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,98,43,.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ━━━ LEFT COLUMN: BRAND NARRATIVE & DIRECT REACH (STICKY) ━━━ */}
          <div className="relative md:sticky md:top-28">
            {/* Floating Parallax Trust Badge 1 */}
            <motion.div
              style={{ y: floatingBadge1Y }}
              className="hidden xl:flex absolute -top-12 -left-8 z-20 items-center gap-2.5 bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-[#1a1a2e]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4622b] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4622b]" />
              </span>
              <span>⚡ Instant Tour Scheduling</span>
            </motion.div>

            <Reveal>
              <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="w-6 h-px bg-[#d4622b]" /> Get in Touch
              </span>
            </Reveal>

            <AnimatedHeading
              text="Ready to move forward with Onward?"
              highlight="forward with Onward?"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mt-4 leading-[1.1] tracking-tight"
            />

            <Reveal delay={0.2}>
              <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-lg">
                Whether you need a bespoke enterprise floor for 500+ or a private
                cabin for your executive team, our workspace specialists will
                curate the perfect solution within 24 hours.
              </p>
            </Reveal>

            {/* Direct Contact Cards */}
            <div className="mt-10 space-y-4">
              {directContacts.map((item, i) => (
                <Reveal key={item.label} delay={0.1 * i + 0.3}>
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-[#d4622b]/40 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#faf8f5] border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-[#d4622b] group-hover:text-white group-hover:border-[#d4622b] transition-all duration-300 text-[#d4622b]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-[#1a1a2e] font-bold mt-0.5 group-hover:text-[#d4622b] transition-colors">
                        {item.value}
                      </div>
                    </div>
                    <div className="text-gray-300 group-hover:text-[#d4622b] group-hover:translate-x-1 transition-all">
                      &rarr;
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>

            {/* Floating Parallax Trust Badge 2 */}
            <motion.div
              style={{ y: floatingBadge2Y }}
              className="hidden lg:inline-flex mt-8 items-center gap-2 px-4 py-2 rounded-full bg-[#d4622b]/10 border border-[#d4622b]/20 text-[#d4622b] text-xs font-bold"
            >
              <span>🔒 100% Direct Management &bull; Zero Brokerage Fees</span>
            </motion.div>
          </div>

          {/* ━━━ RIGHT COLUMN: 3D SPOTLIGHT PARALLAX FORM STAGE ━━━ */}
          <motion.div style={{ y: formOffset }} className="relative">
            <SpotlightCard className="p-8 sm:p-10 lg:p-12 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl rounded-[2.5rem]">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center space-y-5"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#d4622b]/15 text-[#d4622b] flex items-center justify-center text-3xl font-bold shadow-inner">
                      ✓
                    </div>
                    <h3 className="text-3xl font-bold text-[#1a1a2e]">
                      Tour Request Received!
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. An Onward workspace advisor
                      will contact you shortly to confirm your visit.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#d4622b] text-white hover:bg-[#b8501f] transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                        1. Select Workspace Category
                      </span>
                      {/* Interactive Solution Chips with layoutId */}
                      <div className="flex flex-wrap gap-2">
                        {solutionsList.map((sol) => {
                          const isSelected = selectedSolution === sol;
                          return (
                            <button
                              key={sol}
                              type="button"
                              onClick={() => setSelectedSolution(sol)}
                              className="relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200"
                            >
                              {isSelected && (
                                <motion.div
                                  layoutId="contactPill"
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                  }}
                                  className="absolute inset-0 rounded-xl bg-[#d4622b] shadow-md"
                                />
                              )}
                              <span
                                className={`relative z-10 ${
                                  isSelected
                                    ? "text-white"
                                    : "text-gray-600 hover:text-[#d4622b]"
                                }`}
                              >
                                {sol}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                        2. Your Contact Details
                      </span>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-gray-500 block mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:border-[#d4622b] focus:bg-white transition-all shadow-inner text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-500 block mb-1.5">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:border-[#d4622b] focus:bg-white transition-all shadow-inner text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 block mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:border-[#d4622b] focus:bg-white transition-all shadow-inner text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 block mb-1.5">
                          Team Size (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 15-50 Desks"
                          className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:border-[#d4622b] focus:bg-white transition-all shadow-inner text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500 block mb-1.5">
                        Requirements or Specific Location
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your timeline, preferred location, or special amenities..."
                        className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl px-4 py-3 text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:border-[#d4622b] focus:bg-white transition-all shadow-inner text-sm resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#d4622b] to-[#ea580c] text-white py-4 rounded-xl font-bold text-base hover:shadow-[0_10px_30px_rgba(212,98,43,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <span>Processing Tour Request...</span>
                      ) : (
                        <>
                          <span>Schedule a Tour &amp; Get Pricing</span>
                          <span>&rarr;</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
