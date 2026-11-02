import Image from "next/image";
import Link from "next/link";
import HeroWordRotator from "./HeroWordRotator";
import HeroVideo from "./HeroVideo";

const stats = [
  { value: "3+", label: "CITIES" },
  { value: "1+", label: "MILLION SQ FT" },
  { value: "250+", label: "CLIENTS" },
  { value: "15+", label: "CENTRES" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
        <Image
          src="https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/home-page/gallery/1.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <HeroVideo />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 sm:pt-36 pb-10 sm:pb-12 text-center flex flex-col items-center justify-center flex-1 my-auto">
        <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center w-full my-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-white leading-tight tracking-tight text-center px-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            Workspace built around{" "}
            <HeroWordRotator />
          </h1>

          <p className="mt-3 sm:mt-6 text-xs sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto text-center leading-relaxed px-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            Enterprise-grade workspaces across Delhi NCR, delivered with speed, transparency and operational reliability.
          </p>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#d4622b] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-base md:text-lg font-semibold hover:bg-[#b8501f] transition-colors shadow-[0_0_40px_rgba(212,98,43,0.25)]"
            >
              Schedule a Site Visit
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full border-t border-white/15 bg-black/25 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/15">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center text-center py-3 md:py-0 px-3 sm:px-6 ${
                  idx >= 2 ? "border-t border-white/15 md:border-t-0 pt-4 md:pt-0" : ""
                }`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-none text-center">
                  <span className="tabular-nums font-light sm:font-normal">{s.value}</span>
                </div>
                <div className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-white/80 uppercase mt-2 text-center">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
