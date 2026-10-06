"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { solutions, type Solution } from "@/data/solutions";

const ease = [0.22, 0.8, 0.2, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
};

const cityCards = [
  {
    name: "Delhi",
    href: "/locations/delhi",
    img: "/images/redesigned/home-page/top-cities-in-delhi-ncr/delhi.webp",
  },
  {
    name: "Noida",
    href: "/locations/noida",
    img: "/images/redesigned/home-page/top-cities-in-delhi-ncr/noida.webp",
  },
  {
    name: "Gurugram",
    href: "/locations/gurgaon",
    img: "/images/redesigned/home-page/top-cities-in-delhi-ncr/gurgaon.webp",
  },
];

export default function SolutionPageView({
  sol,
}: {
  sol: Solution;
  cityCards?: { name: string; href: string; img: string; centres: number }[];
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e]">
        {/* ━━━ 1. BANNER ━━━ */}
        <section ref={heroRef} className="relative overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
            <Image
              src={sol.img}
              alt={sol.title}
              fill
              priority
              className="object-cover scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 lg:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4622b] mb-3"
            >
              Office Space Solution
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white max-w-3xl"
            >
              {sol.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="mt-5 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed"
            >
              {sol.tagline}
            </motion.p>
          </div>
        </section>

        {/* ━━━ 2. SEE LOCATIONS ━━━ */}
        <section className="py-16 sm:py-20 lg:py-28 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-10 sm:mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="text-[#d4622b] text-xs sm:text-sm font-semibold tracking-widest uppercase">
                Our Locations
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#1a1a2e] tracking-tight">
                Top Cities in Delhi NCR
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                Begin your path to success with Onward Workspaces across Delhi, Noida, and Gurugram.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-6 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {cityCards.map((city, i) => (
                <motion.div key={city.name} custom={i} variants={scaleIn}>
                  <Link href={city.href} className="group block">
                    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        <Image
                          src={city.img}
                          alt={city.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="py-5 text-center bg-white border-t border-gray-100">
                        <h3 className="text-xl font-bold text-[#1a1a2e] tracking-tight group-hover:text-[#d4622b] transition-colors">
                          {city.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ━━━ 3. CTA + RELATED SOLUTION ━━━ */}
        <section className="py-20 lg:py-28 bg-[#1a1a2e] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left — CTA text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <motion.h2
                  variants={fadeUp}
                  custom={0}
                  className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
                >
                  Revolutionise Your Workspace.
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mt-5 text-base text-white/60 max-w-lg leading-relaxed"
                >
                  Whether you have questions about membership options, need assistance with technical aspects, or want to explore customisation possibilities for your workspace, our experts are here to provide you with personalised guidance and solutions.
                </motion.p>
                <motion.div variants={fadeUp} custom={2}>
                  <Link
                    href="/#contact"
                    className="mt-7 inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8531f] text-white font-bold px-8 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wider"
                  >
                    Let&apos;s Connect
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right — related solution card */}
              {(() => {
                const idx = solutions.findIndex((s) => s.slug === sol.slug);
                const other = solutions[(idx + 1) % solutions.length];
                if (!other) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease }}
                  >
                    <Link href={`/solutions/${other.slug}`} className="group block bg-white/5 border border-white/10 rounded-2xl p-7 sm:p-8 hover:bg-white/8 transition-colors">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#d4622b] transition-colors">
                        {other.title}
                      </h3>
                      <p className="mt-3 text-sm text-white/50 leading-relaxed line-clamp-3">
                        {other.desc}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d4622b] group-hover:gap-3 transition-all">
                        Read More <span>&rarr;</span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ━━━ 4. CONTACT FORM ━━━ */}
        <ContactSection
          title={`Get in touch about ${sol.title}`}
          highlight={sol.title}
          description="Whether you have questions about membership options, need assistance with technical aspects, or want to explore customisation possibilities for your workspace, our experts are here to help."
          hideDirectContacts
        />
      </main>

      <Footer />
    </>
  );
}
