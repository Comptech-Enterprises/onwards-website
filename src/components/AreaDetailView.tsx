import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import AmenitiesTicker from "@/components/AmenitiesTicker";
import ContactSection from "@/components/ContactSection";
import type { AreaDetail, CityData } from "@/data/locations";

export default function AreaDetailView({ city, area }: { city: CityData; area: AreaDetail }) {
  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-20">
        {/* ━━━ PAGE BANNER (FULL-BLEED PHOTO HERO) ━━━ */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <Image
            src={area.img}
            alt={`Onward Workspaces ${area.name}`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs text-white/70 font-medium uppercase tracking-wider">
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
                <li>
                  <Link href={city.basePath} className="hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-semibold">{area.name}</li>
              </ol>
            </nav>

            <span className="text-[#d4622b] text-sm font-semibold tracking-widest uppercase">
              {area.type}
            </span>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
              Onward Workspaces {area.name}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
              {area.description}
            </p>
          </div>
        </section>

        {/* ━━━ AREA DETAILS ━━━ */}
        <section className="py-14 lg:py-16 bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-x-12 gap-y-6 pb-10 border-b border-gray-200">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Address</p>
                <p className="mt-1.5 text-base font-medium text-black">{area.address}</p>
              </div>
              <div className="pl-12 border-l border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Connectivity</p>
                <p className="mt-1.5 text-base font-medium text-black">{area.transit}</p>
              </div>
              <div className="pl-12 border-l border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Capacity</p>
                <p className="mt-1.5 text-base font-medium text-black">{area.seats}</p>
              </div>
            </div>

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
                className="inline-flex items-center gap-2 bg-[#d4622b] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#b8501f] transition-all shadow-md"
              >
                Book a Tour &rarr;
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* ━━━ GALLERY ━━━ */}
        <section className="py-14 lg:py-16 bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-black">
              Gallery
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {area.gallery.map((src, i) => (
                <Reveal key={`${src}-${i}`} delay={i * 0.05}>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
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

        <AmenitiesTicker />

        {/* ━━━ BOTTOM CTA (SHARED CONTACT FORM) ━━━ */}
        <ContactSection
          bgImage={area.img}
          title={`Find your Onward space in ${area.name}`}
          highlight={area.name}
          description={`Book a tour of Onward Workspaces ${area.name} and see the ${area.highlight.toLowerCase()} for yourself.`}
          hideDirectContacts
          simpleForm
        />
      </main>

      <Footer />
    </>
  );
}
