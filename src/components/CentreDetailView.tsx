"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactSection from "@/components/ContactSection";
import type { CityData, AreaDetail } from "@/data/locations";
import type { WorkspaceUnit } from "@/data/workspaces";

export default function CentreDetailView({
  city,
  area,
  centre,
}: {
  city: CityData;
  area: AreaDetail;
  centre: WorkspaceUnit;
}) {
  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20">
        {/* 1. HERO BANNER */}
        <section className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[500px] flex items-center py-14 sm:py-18 lg:py-22 overflow-hidden">
          <Image
            src={centre.img}
            alt={centre.title}
            fill
            priority
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex items-center gap-2 text-[11px] sm:text-xs text-white/70 font-medium uppercase tracking-wider flex-wrap">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/locations" className="hover:text-white transition-colors">Locations</Link></li>
                <li>/</li>
                <li><Link href={city.basePath} className="hover:text-white transition-colors">{city.name}</Link></li>
                <li>/</li>
                <li><Link href={`${city.basePath}/${area.slug}`} className="hover:text-white transition-colors">{area.name}</Link></li>
                <li>/</li>
                <li className="text-white font-semibold">{centre.badge}</li>
              </ol>
            </nav>

            <span className="inline-block bg-[#d4622b] text-white text-[10px] sm:text-xs font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-md">
              {centre.badge}
            </span>
            <h1 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
              {centre.title}
            </h1>
            <p className="mt-3 text-xs sm:text-sm lg:text-base text-white/90 max-w-2xl leading-relaxed font-normal">
              {centre.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-5 mt-5 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-1.5 font-medium">
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{centre.seats}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{centre.transit}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{area.address}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HIGHLIGHTS & FEATURES */}
        <section className="py-12 sm:py-16 bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">Why This Centre</span>
              <h2 className="mt-1 mb-3 text-2xl sm:text-4xl font-black text-[#1a1a2e] tracking-tight">
                {area.highlight}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
                {area.description}
              </p>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {area.features.map((feature, i) => (
                <Reveal key={feature} delay={i * 0.05}>
                  <div className="bg-[#f6f1e8] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#e8dfd2]">
                    <div className="w-8 h-8 rounded-lg bg-[#d4622b]/10 flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-[#d4622b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1a1a2e]">{feature}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. GALLERY */}
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
                      alt={`${centre.title} gallery ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CONTACT FORM */}
        <ContactSection
          bgImage={centre.img}
          title={`Book a tour at ${area.name}`}
          highlight={area.name}
          description={`Visit ${centre.title} and experience the ${area.highlight.toLowerCase()} for yourself.`}
          hideDirectContacts
          simpleForm
        />
      </main>

      <Footer />
    </>
  );
}
