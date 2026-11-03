"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function ContactPageClient() {
  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-24 sm:pt-28">
        {/* ━━━ BREADCRUMB ━━━ */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-2 relative z-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
              <li>
                <Link href="/" className="hover:text-[#d4622b] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-[#d4622b] font-semibold">Contact Us</li>
            </ol>
          </nav>
        </div>

        {/* ━━━ THE CONTACT FORM (SAME AS HOMEPAGE WITH ALL FEATURES) ━━━ */}
        <div className="-mt-8 sm:-mt-10">
          <ContactSection
            bgImage="https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/top-section-hero-image-managed-office-space-in-delhi.webp"
          />
        </div>

        <Footer />
      </main>
    </>
  );
}
