import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactSection from "@/components/ContactSection";
import AreaWorkspacesSelector from "@/components/AreaWorkspacesSelector";
import type { CityData, AreaDetail } from "@/data/locations";

export default function AreaDetailView({ city, area }: { city: CityData; area: AreaDetail }) {
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

        {/* ━━━ 2. WORKSPACE SELECTOR (FILTER PILLS + SLIDER) ━━━ */}
        <AreaWorkspacesSelector area={area} />

        {/* ━━━ 4. GALLERY ━━━ */}
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
