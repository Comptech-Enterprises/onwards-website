"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import BlogShareButtons from "./BlogShareButtons";

export interface PostDetailData {
  title: string;
  desc: string;
  titleShort?: string;
  banner?: string;
  createdAt?: string;
  author?: string;
}

export interface SidebarPost {
  title: string;
  desc: string;
  author: string;
  date: string;
  img: string;
  href: string;
}

interface BlogArticleViewAltProps {
  post: PostDetailData;
  relatedPosts: SidebarPost[];
  nextPost?: SidebarPost;
}

export default function BlogArticleViewAlt({
  post,
  relatedPosts,
  nextPost,
}: BlogArticleViewAltProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [selectedTeamSize, setSelectedTeamSize] = useState<string | null>(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        setReadingProgress(
          Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)))
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ━━━ READING PROGRESS LINE ━━━ */}
      <div className="fixed top-20 left-0 right-0 h-1 bg-transparent z-40">
        <div
          className="h-full bg-[#d4622b] transition-all duration-100 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] relative overflow-hidden">
        {/* ━━━ CINEMATIC FULL-WIDTH HERO HEADER ━━━ */}
        <section className="relative pt-32 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-white to-[#faf8f5] border-b border-gray-200/70">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
              <ol className="inline-flex items-center gap-2 text-xs text-gray-500 font-medium bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200/80 shadow-sm">
                <li>
                  <a href="/" className="hover:text-[#d4622b] transition-colors">
                    Home
                  </a>
                </li>
                <li>/</li>
                <li>
                  <a href="/blog" className="hover:text-[#d4622b] transition-colors">
                    Blog
                  </a>
                </li>
                <li>/</li>
                <li className="text-[#d4622b] font-semibold">Magazine View</li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-bold tracking-tight text-[#1a1a2e] leading-[1.18] max-w-3xl mx-auto">
              {post.title}
            </h1>

            {post.titleShort && post.titleShort !== post.title && (
              <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
                {post.titleShort}
              </p>
            )}

            {/* Author Byline Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4622b] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  {post.author ? post.author.slice(0, 2).toUpperCase() : "OW"}
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm text-[#1a1a2e]">
                    {post.author || "Onward Team"}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Workspace Editorial
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline text-gray-300">&bull;</span>
              <span>{post.createdAt || "Published Recently"}</span>

              <span className="hidden sm:inline text-gray-300">&bull;</span>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#d4622b] font-semibold border border-orange-200/60">
                5 min read
              </span>

              <span className="hidden sm:inline text-gray-300">&bull;</span>
              <BlogShareButtons title={post.title} />
            </div>
          </div>

          {/* Full-width Hero Visual */}
          {post.banner && (
            <div className="max-w-5xl mx-auto px-6 lg:px-8 mt-12">
              <div className="relative aspect-[21/10] rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(26,26,46,0.12)] border border-gray-200/90 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.banner}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </section>

        {/* ━━━ CENTER-FOCUSED EDITORIAL READING COLUMN ━━━ */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 sm:py-20 relative">
          {/* Floating Left Reading Rail (Desktop) */}
          <aside className="hidden xl:flex flex-col items-center gap-4 fixed left-8 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-gray-200 shadow-md">
            <div className="text-[11px] font-mono font-bold text-[#d4622b]">
              {readingProgress}%
            </div>
            <div className="w-1 h-16 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="w-full bg-[#d4622b] transition-all duration-100"
                style={{ height: `${readingProgress}%` }}
              />
            </div>
            <div className="w-full h-px bg-gray-200 my-1" />
            <a
              href="/blog"
              title="Back to Blog"
              className="w-8 h-8 rounded-full bg-gray-50 hover:bg-[#d4622b] hover:text-white text-gray-600 flex items-center justify-center transition-colors text-xs font-bold"
            >
              &larr;
            </a>
          </aside>

          {/* Article Container */}
          <article className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-12 lg:p-14 shadow-[0_8px_30px_-12px_rgba(26,26,46,0.06)]">
            {/* Lead Executive Excerpt */}
            <div className="mb-10 pb-8 border-b border-gray-100">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-normal text-justify">
                {post.titleShort ||
                  "Discover the principles, strategies, and operational frameworks powering modern high-growth teams across Delhi NCR's most strategic business hubs."}
              </p>
            </div>

            {/* Main Rich Content */}
            <div
              className="blog-article-content"
              dangerouslySetInnerHTML={{ __html: post.desc }}
            />

            {/* ━━━ INTERACTIVE WORKSPACE SELECTOR WIDGET ━━━ */}
            <div className="my-14 p-8 rounded-3xl bg-[#faf8f5] border border-gray-200 text-center relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4622b] block mb-2">
                Interactive Workspace Recommendation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">
                How large is your team?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Select your team size to view our recommended configuration across Okhla, Mohan Estate &amp; Noida.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {[
                  { label: "1 – 5 Desks", type: "Dedicated Desks" },
                  { label: "5 – 25 Desks", type: "Private Team Cabin" },
                  { label: "25 – 100+ Desks", type: "Custom Managed Suite" },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    onClick={() => setSelectedTeamSize(tier.label)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                      selectedTeamSize === tier.label
                        ? "bg-[#d4622b] text-white shadow-md shadow-[#d4622b]/20 scale-105"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-[#d4622b] hover:text-[#d4622b]"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {selectedTeamSize && (
                <div className="mt-6 pt-6 border-t border-gray-200/80 max-w-md mx-auto">
                  <p className="text-xs text-gray-600 mb-3">
                    Recommended for {selectedTeamSize}:{" "}
                    <strong className="text-[#1a1a2e]">
                      {selectedTeamSize === "1 – 5 Desks"
                        ? "Dynamic Dedicated Desks with 24/7 access & meeting credits"
                        : selectedTeamSize === "5 – 25 Desks"
                        ? "Furnished Private Cabin with executive privacy & high-speed Wi-Fi"
                        : "Turnkey Enterprise Managed Suite with custom branding & layout"}
                    </strong>
                  </p>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#d4622b] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
                  >
                    <span>Check Availability</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              )}
            </div>

            {/* Author Bio Box */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#d4622b] text-white font-bold flex items-center justify-center text-xl shrink-0 shadow-sm">
                {post.author ? post.author.slice(0, 2).toUpperCase() : "OW"}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[#1a1a2e] text-base">
                  {post.author || "Onward Workspaces Editorial"}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                  Onward Workspaces curates actionable perspectives on commercial
                  real estate, agile facility scaling, and workplace culture
                  across Delhi NCR.
                </p>
              </div>
            </div>

            {/* Bottom Sharing & Back Button */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#d4622b] hover:text-[#b8501f] transition-colors"
              >
                <span>&larr;</span>
                <span>Back to Journal</span>
              </a>
              <BlogShareButtons title={post.title} />
            </div>
          </article>

          {/* ━━━ NEXT ARTICLE PANORAMIC CARD ━━━ */}
          {nextPost && (
            <div className="mt-12">
              <a
                href={nextPost.href}
                className="group block rounded-3xl bg-white border border-gray-200/90 p-7 sm:p-8 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(212,98,43,0.18)] hover:border-[#d4622b]/40 transition-all duration-300"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4622b] block mb-2">
                  Up Next &rarr;
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors line-clamp-2">
                      {nextPost.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {nextPost.author} &bull; {nextPost.date}
                    </p>
                  </div>
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={nextPost.img}
                      alt={nextPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* ━━━ MORE RELATED STORIES ━━━ */}
          <section className="mt-16 pt-12 border-t border-gray-200/80">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] mb-6 text-center">
              More Insights from Onward
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedPosts.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-[#d4622b]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-3 border border-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-2 block">
                    {item.date}
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#faf8f5] text-gray-400 py-10 sm:py-14 border-t border-gray-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 sm:gap-12 mb-12 sm:mb-16">
            <div className="col-span-2 sm:col-span-4 lg:col-span-1">
              <a href="/" className="flex items-center gap-3 mb-5 group">
                <Image
                  src="/onward-logo.png"
                  alt="Onward Workspaces"
                  width={38}
                  height={38}
                  className="w-9 h-9 object-contain group-hover:rotate-6 transition-transform"
                />
                <div className="leading-none">
                  <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">
                    Onward
                  </span>
                  <span className="block text-[9px] text-gray-400 tracking-[0.25em]">
                    WORKSPACES
                  </span>
                </div>
              </a>
              <p className="text-sm leading-relaxed max-w-xs text-gray-500 font-normal">
                Premium coworking spaces built around your brand, ambition, and
                people.
              </p>
            </div>
            {[
              {
                title: "Solutions",
                links: [
                  "Managed Office",
                  "Private Suites",
                  "Virtual Office",
                  "On-Demand",
                  "Custom Built",
                ],
              },
              {
                title: "Locations",
                links: ["Delhi", "Noida", "Gurgaon", "All Locations"],
              },
              {
                title: "Company",
                links: [
                  "About Us",
                  "Blog",
                  "Careers",
                  "Enterprise",
                  "Contact",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[#1a1a2e] font-semibold text-sm mb-4 sm:mb-5 uppercase tracking-wider">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href={
                          l === "Blog"
                            ? "/blog"
                            : l === "About Us"
                            ? "/#about"
                            : l === "Contact"
                            ? "/#contact"
                            : "#"
                        }
                        className="text-gray-500 hover:text-[#d4622b] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Onward Workspaces. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#d4622b] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#d4622b] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
