import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactSection from "@/components/ContactSection";
import AutoSlider from "@/components/AutoSlider";
import AreaWorkspacesSelector from "@/components/AreaWorkspacesSelector";
import type { CityData, AreaDetail } from "@/data/locations";

export default function AreaDetailView({ city, area }: { city: CityData; area: AreaDetail }) {
  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20">
        {/* ━━━ 1. HERO BANNER ━━━ */}
        <section className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[500px] flex items-center py-14 sm:py-18 lg:py-22 overflow-hidden">
          <Image
            src={area.heroBanner || area.img}
            alt={`Onward Workspaces ${area.name}`}
            fill
            priority
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex items-center gap-2 text-[11px] sm:text-xs text-white/70 font-medium uppercase tracking-wider">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/locations" className="hover:text-white transition-colors">Locations</Link></li>
                <li>/</li>
                <li><Link href={city.basePath} className="hover:text-white transition-colors">{city.name}</Link></li>
                <li>/</li>
                <li className="text-white font-semibold">{area.name}</li>
              </ol>
            </nav>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-white">Onward in</span>{" "}
              <span className="text-[#d4622b]">{area.name}</span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm lg:text-base text-white/90 max-w-2xl leading-relaxed font-normal">
              {area.description}
            </p>
          </div>
        </section>

        {/* ━━━ 2. WORKSPACE SELECTOR (FILTER PILLS + SLIDER) ━━━ */}
        <AreaWorkspacesSelector area={area} cityBasePath={city.basePath} />

        {/* ━━━ 3. CLIENTS AT THIS CENTRE ━━━ */}
        {area.clients && area.clients.length > 0 && (
          <section className="py-12 bg-white border-b border-gray-200/80">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <Reveal>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">
                  Community &amp; Clients
                </span>
                <h2 className="mt-1 mb-8 text-xl sm:text-3xl font-bold text-[#1a1a2e] tracking-tight">
                  Trusted by Teams at {area.name}
                </h2>
              </Reveal>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {area.clients.map((logoSrc, idx) => (
                  <Reveal key={`${logoSrc}-${idx}`} delay={idx * 0.05}>
                    <div className="px-6 py-4 rounded-2xl bg-[#faf8f5] border border-gray-200/80 flex items-center justify-center h-20 min-w-[140px] hover:border-[#d4622b] transition-colors">
                      <Image
                        src={logoSrc}
                        alt={`${area.name} client ${idx + 1}`}
                        width={120}
                        height={40}
                        className="max-h-10 w-auto object-contain"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}



        {/* ━━━ 4. GALLERY ━━━ */}
        {area.gallery && area.gallery.length > 0 && (
          <section className="py-14 lg:py-18 bg-[#faf8f5] border-b border-gray-200/80 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
              <Reveal>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d4622b]">Gallery</span>
                <h2 className="mt-1 text-2xl sm:text-4xl font-black text-[#1a1a2e] tracking-tight">
                  Inside {area.name}
                </h2>
              </Reveal>
            </div>
            <AutoSlider
              interval={3000}
              showArrows
              slideClassName="w-[75%] sm:w-[45%] lg:w-[32%] flex-shrink-0 px-2"
            >
              {area.gallery.map((src, i) => (
                <div key={`${src}-${i}`} className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={src}
                    alt={`${area.name} gallery ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              ))}
            </AutoSlider>
          </section>
        )}

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
