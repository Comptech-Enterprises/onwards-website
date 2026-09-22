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
      className="relative py-20 lg:py-28 bg-[#faf8f5] overflow-hidden"
    >
      {/* ━━━ PARALLAX AMBIENT BACKGROUND GLOWS ━━━ */}
      <motion.div
        style={{ y: orb1Y }}
        className="pointer-events-none absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-[#d4622b]/10 blur-[130px]"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="pointer-events-none absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-[#d4622b]/10 blur-[140px]"
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
          <div className="relative md:sticky md:top-28 min-w-0">
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
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-[#1a1a2e] font-bold mt-0.5 break-words group-hover:text-[#d4622b] transition-colors">
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

            {/* Social Links */}
            <Reveal delay={0.1 * directContacts.length + 0.3}>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-center text-[#d4622b] hover:bg-[#d4622b] hover:text-white hover:border-[#d4622b] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-center text-[#d4622b] hover:bg-[#d4622b] hover:text-white hover:border-[#d4622b] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </Reveal>

          </div>

          {/* ━━━ RIGHT COLUMN: 3D SPOTLIGHT PARALLAX FORM STAGE ━━━ */}
          <motion.div style={{ y: formOffset }} className="relative min-w-0">
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
                        Your Contact Details
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
