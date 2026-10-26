"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactSection from "@/components/ContactSection";
import AutoSlider from "@/components/AutoSlider";
import HeroForm from "@/components/HeroForm";
import CityMicroMarketsMap from "@/components/CityMicroMarketsMap";
import type { CityData } from "@/data/locations";
import { getSeo } from "@/data/seo";

const whyChoose = [
  {
    title: "Enterprise-Ready Infrastructure",
    desc: "Premium workspaces backed by reliable technology infrastructure, security systems, and round-the-clock operational support.",
  },
  {
    title: "Multi-Location Scalability",
    desc: "Workspace solutions across the city's major business districts that support expansion and distributed team requirements.",
  },
  {
    title: "Privacy & Operational Support",
    desc: "Professionally managed office environments designed for confidentiality, workplace efficiency, and day-to-day business operations.",
  },
  {
    title: "Consistency Across Locations",
    desc: "A standardised workplace experience, amenities, and service delivery across every Onward centre in the city.",
  },
  {
    title: "Flexible Workspace Models",
    desc: "Solutions ranging from ready-to-move-in coworking desks to fully custom-built managed offices for larger teams.",
  },
];

export default function CityLocationsView({ city }: { city: CityData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openWhy, setOpenWhy] = useState<number | null>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPaused, setSliderPaused] = useState(false);

  useEffect(() => {
    if (sliderPaused) return;
    const timer = setInterval(() => {
      const el = sliderRef.current;
      if (!el || el.scrollWidth <= el.clientWidth + 4) return;
      const card = el.firstElementChild as HTMLElement | null;
      const step = card ? card.offsetWidth + 24 : el.clientWidth / 3;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, 1800);
    return () => clearInterval(timer);
  }, [sliderPaused]);
  const cityH1 = getSeo(`/${city.slug}`)?.h1 ?? city.h1;
  const { name: cityName, heroImage, heroDescription, contactDescription, areas, basePath } = city;

  const defaultFaqs = [
    {
      q: `What sets Onward Workspaces apart as a coworking space in ${cityName}?`,
      a: `Onward Workspaces isn't just a space; it's your dynamic hub for innovation in the heart of ${cityName}. Our coworking ecosystem blends style and substance, ensuring every workday is a step toward success.`,
    },
    {
      q: "What amenities can I expect at Onward Workspaces?",
      a: "From high-tech conference rooms to stylish lounges, our coworking spaces are equipped with modern amenities. Enjoy seamless connectivity, ergonomic furniture, and a vibrant community for networking.",
    },
    {
      q: "How does Onward Workspaces contribute to a collaborative work culture?",
      a: "Collaboration is in our DNA. Engage in networking events, workshops, and connect with a diverse community of professionals. Onward Workspaces is not just a space; it's a collaborative journey.",
    },
    {
      q: "Are there any special promotions for coworking space?",
      a: "We frequently offer special deals to make your Onward Workspaces experience even more rewarding. Connect with us to know more — your success deserves the best, at the best value.",
    },
  ];
  const faqs = city.faqs ?? defaultFaqs;

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20">
        {/* ━━━ PAGE BANNER (BALANCED PHOTO HERO WITH VISIBLE ONWARD BRANDING) ━━━ */}
        <section className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[540px] flex items-center py-14 sm:py-18 lg:py-22 overflow-hidden">
          <Image
            src={heroImage}
            alt={`Onward Workspaces ${cityName}`}
            fill
            priority
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-center">
              <div>
                <nav aria-label="Breadcrumb" className="mb-3">
                  <ol className="flex items-center gap-2 text-[11px] sm:text-xs text-white/70 font-medium uppercase tracking-wider">
                    <li>
                      <Link href="/" className="hover:text-white transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link href="/locations" className="hover:text-white transition-colors">
                        Locations
                      </Link>
                    </li>
                    <li>/</li>
                    <li className="text-white font-semibold">{cityName}</li>
                  </ol>
                </nav>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  {cityH1 ? (
                    <span className="text-white">{cityH1}</span>
                  ) : (
                    <>
                      <span className="text-white">Managed Office Space</span>{" "}
                      <span className="text-[#d4622b]">in {cityName}</span>
                    </>
                  )}
                </h1>
                <p className="mt-3 text-xs sm:text-sm lg:text-base text-white/90 max-w-2xl leading-relaxed font-normal">
                  {heroDescription}
                </p>
              </div>

              <div>
                <HeroForm />
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ INTERACTIVE MICRO-MARKETS MAP SECTION ━━━ */}
        <CityMicroMarketsMap city={city} />

        {/* ━━━ CENTRES (PHOTO GALLERY) ━━━ */}
        <section className="py-10 sm:py-12 lg:py-14 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-6 sm:mb-8">
              {!city.centresHeading && (
                <Reveal>
                  <span className="text-[#d4622b] text-xs sm:text-sm font-semibold tracking-widest uppercase">
                    {cityName} &middot; {areas.length} Centres
                  </span>
                </Reveal>
              )}
              <h2 className="mt-1.5 text-xl sm:text-3xl font-bold text-black tracking-tight">
                {city.centresHeading ?? `Centres in ${cityName}`}
              </h2>
            </div>

            {/* Desktop Slider */}
            <div className="hidden sm:block relative">
              <div
                ref={sliderRef}
                onMouseEnter={() => setSliderPaused(true)}
                onMouseLeave={() => setSliderPaused(false)}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`${basePath}/${area.slug}`}
                    className="group block snap-start shrink-0 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        src={area.img}
                        alt={area.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-black group-hover:text-[#d4622b] transition-colors">
                      {area.cardHeading ?? area.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-1">
                      {area.centres ? `${area.centres} ${area.centres === 1 ? "centre" : "centres"}` : `${area.type} · ${area.seats}`}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-[#d4622b] group-hover:text-black transition-colors">
                      {area.centres ? "View Micro Market" : "View Centre"} &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile AutoSlider */}
            <div className="sm:hidden">
              <AutoSlider interval={3500}>
                {areas.map((area) => (
                  <Link key={area.slug} href={`${basePath}/${area.slug}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                      <Image
                        src={area.img}
                        alt={area.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="pt-3">
                      <h3 className="text-base font-bold text-black group-hover:text-[#d4622b] transition-colors">
                        {area.cardHeading ?? area.name}
                      </h3>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mt-0.5">
                        {area.centres ? `${area.centres} ${area.centres === 1 ? "centre" : "centres"}` : `${area.type} · ${area.seats}`}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-[#d4622b]">
                        {area.centres ? "View Micro Market" : "View Centre"} &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </AutoSlider>
            </div>
          </div>
        </section>

        {/* ━━━ WHY CHOOSE ONWARD (STICKY IMAGE + ACCORDION) ━━━ */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#faf8f5] border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight max-w-4xl">
              {city.expect ? (
                city.expect.heading
              ) : (
                <>
                  Why Choose Onward for Your Workspace in{" "}
                  <span className="text-[#d4622b]">{cityName}</span>?
                </>
              )}
            </h2>

            <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden lg:sticky lg:top-28 shadow-md">
                <Image
                  src={city.whyChooseImage || heroImage}
                  alt={`Why Choose Onward ${cityName}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="divide-y divide-gray-200 border-t border-gray-200">
                {(city.expect?.items ?? whyChoose).map((item, i) => {
                  const isOpen = openWhy === i;
                  return (
                    <div key={item.title}>
                      <button
                        onClick={() => setOpenWhy(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer"
                      >
                        <span className="text-base sm:text-lg font-bold text-black">
                          {item.title}
                        </span>
                        <span className="shrink-0 text-xl font-light text-black leading-none">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      <motion.div
 initial={false}
 animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
 transition={{ duration: 0.3 }}
 aria-hidden={!isOpen}
 className="overflow-hidden"
 >
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pb-5 max-w-xl">
                              {item.desc}
                            </p>
                          </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ FAQ ━━━ */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-gray-200/80">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              {!city.faqs && (
              <Reveal>
                <span className="text-[#d4622b] text-xs sm:text-sm font-semibold tracking-widest uppercase">
                  Got Questions?
                </span>
              </Reveal>
              )}
              <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight">
                Frequently Asked Questions
              </h2>
              {!city.faqs && (
              <p className="mt-2 text-gray-600 text-xs sm:text-sm md:text-base">
                Everything you need to know about us.
              </p>
              )}
            </div>

            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-6 py-6 text-left"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-black">
                        {f.q}
                      </h3>
                      <span className="shrink-0 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-black">
                        {isOpen ? (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </span>
                    </button>
                    <motion.div
 initial={false}
 animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
 transition={{ duration: 0.3 }}
 aria-hidden={!isOpen}
 className="overflow-hidden"
 >
                          <p className="text-gray-600 text-base leading-relaxed pb-6">
                            {f.a}
                          </p>
                        </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ━━━ BOTTOM CTA (SHARED CONTACT FORM) ━━━ */}
        <ContactSection
          bgImage={heroImage}
          hideDirectContacts
          simpleForm
          {...(city.contactTitle
            ? { title: city.contactTitle, highlight: city.contactHighlight, description: city.contactBody }
            : {})}
        />
      </main>

      <Footer />
    </>
  );
}
