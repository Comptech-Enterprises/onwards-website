"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactSection from "@/components/ContactSection";
import AmenitiesTicker from "@/components/AmenitiesTicker";
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
            src={centre.bannerImg || centre.img}
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

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
              {centre.title}
            </h1>
            <p className="mt-3 text-xs sm:text-sm lg:text-base text-white/90 max-w-2xl leading-relaxed font-normal">
              {centre.tagline}
            </p>

          </div>
        </section>

        {/* 2. INFO STRIP */}
        <section className="bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">Address</span>
                <p className="mt-1 text-sm sm:text-base font-medium text-[#1a1a2e]">{area.address}</p>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">Connectivity</span>
                <p className="mt-1 text-sm sm:text-base font-medium text-[#1a1a2e]">{centre.transit}</p>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">Capacity</span>
                <p className="mt-1 text-sm sm:text-base font-medium text-[#1a1a2e]">{centre.seats}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mt-6 pt-6 border-t border-gray-200/80">
              {area.features.map((feature) => (
                <span key={feature} className="px-4 py-2 rounded-full text-xs font-semibold text-gray-700 bg-white border border-gray-200">
                  {feature}
                </span>
              ))}
            </div>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-6 inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8531f] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors cursor-pointer shadow-md"
            >
              Get Started <span>&rarr;</span>
            </button>
          </div>
        </section>



        {/* 4. LOCATION MAP */}
        {area.mapEmbed && (
          <section className="py-14 lg:py-18 bg-white border-b border-gray-200/80">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <Reveal>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">Location</span>
                <h2 className="mt-1 mb-8 text-2xl sm:text-4xl font-black text-[#1a1a2e] tracking-tight">
                  Find Us Here
                </h2>
              </Reveal>
              <div className="rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm">
                <iframe
                  src={area.mapEmbed}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${area.name} location map`}
                />
              </div>
            </div>
          </section>
        )}

        {/* 5. AMENITIES */}
        <AmenitiesTicker />

        {/* 6. CONTACT FORM */}
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
