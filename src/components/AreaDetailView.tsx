import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import ContactSection from "@/components/ContactSection";
import type { AreaDetail, CityData } from "@/data/locations";

export default function AreaDetailView({ city, area }: { city: CityData; area: AreaDetail }) {
  const mapQuery = encodeURIComponent(`${area.address}, ${city.name}, India`);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20">
        {/* ━━━ 1. TOPIC HEADING ━━━ */}
        <section className="bg-white border-b border-gray-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                <li><Link href="/" className="hover:text-[#d4622b] transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/locations" className="hover:text-[#d4622b] transition-colors">Locations</Link></li>
                <li>/</li>
                <li><Link href={city.basePath} className="hover:text-[#d4622b] transition-colors">{city.name}</Link></li>
                <li>/</li>
                <li className="text-gray-900">{area.name}</li>
              </ol>
            </nav>

            <span className="text-[#d4622b] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              {area.type}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black text-[#1a1a2e] tracking-tight leading-[1.08]">
              Onward in {area.name}
            </h1>
            <p className="mt-4 text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl">
              {area.description}
            </p>
          </div>
        </section>

        {/* ━━━ 2. MICRO-MARKET OVERVIEW + IMAGE + DETAILS ━━━ */}
        <section className="bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 sm:py-14">
            {/* Micro-market overview card */}
            <div className="bg-[#f6f1e8] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#e8dfd2] mb-6 sm:mb-8">
              <span className="text-[#d4622b] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Micro-Market Overview
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#d4622b] mt-1">
                {area.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                {area.type.toLowerCase().includes("managed") && area.type.toLowerCase().includes("coworking")
                  ? "2 centres · 1 Managed Office + 1 Coworking"
                  : area.type.toLowerCase().includes("managed")
                    ? "1 centre · Managed Office"
                    : "1 centre · Coworking"}
              </p>
              <div className="mt-4 pt-4 border-t border-[#e8dfd2]/80">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Workspace Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.type.toLowerCase().includes("managed") && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#d4622b] text-white">
                      Managed Office
                    </span>
                  )}
                  {area.type.toLowerCase().includes("coworking") && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#d4622b] text-white">
                      Coworking
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Wide hero image */}
            <Reveal>
              <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
                <Image
                  src={area.img}
                  alt={`Onward Workspaces ${area.name}`}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <span className="inline-block bg-[#d4622b] text-white text-[10px] sm:text-xs font-bold tracking-wider px-3 py-1.5 rounded-full uppercase shadow-md">
                    {area.type}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Details row below image */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <Reveal delay={0.05}>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Address</p>
                  <p className="text-sm sm:text-base font-medium text-[#1a1a2e]">{area.address}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Connectivity</p>
                  <p className="text-sm sm:text-base font-medium text-[#1a1a2e]">{area.transit}</p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Capacity</p>
                  <p className="text-sm sm:text-base font-medium text-[#1a1a2e]">{area.seats}</p>
                </div>
              </Reveal>
            </div>

            {/* Feature tags + CTA */}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {area.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs font-medium bg-[#faf8f5] text-gray-600 px-3 py-1.5 rounded-full border border-gray-200"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <MagneticButton
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-[#d4622b] text-white px-7 py-3.5 rounded-full font-bold hover:bg-[#b8501f] transition-all shadow-md text-sm sm:text-base"
                >
                  Schedule a Visit
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ━━━ 3. GALLERY ━━━ */}
        <section className="py-14 lg:py-18 bg-[#faf8f5] border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">Inside the Space</span>
              <h2 className="mt-1 mb-8 text-2xl sm:text-4xl font-black text-[#1a1a2e] tracking-tight">
                Gallery
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {area.gallery.map((src, i) => (
                <Reveal key={`${src}-${i}`} delay={i * 0.05}>
                  <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={src}
                      alt={`${area.name} gallery ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ 4. LOCATION MAP ━━━ */}
        <section className="py-14 lg:py-18 bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-4xl font-black text-[#1a1a2e] tracking-tight">
                  Location
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  {area.address}, {city.name}, India
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-lg">
                <iframe
                  title={`${area.name} location map`}
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ━━━ 5. CONTACT FORM ━━━ */}
        <ContactSection
          bgImage={area.img}
          title={`Find your space in ${city.name}`}
          highlight={city.name}
          description={`Book a tour of Onward Workspaces ${area.name} and see the ${area.highlight.toLowerCase()} for yourself.`}
          hideDirectContacts
          simpleForm
        />
      </main>

      <Footer />
    </>
  );
}
