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

interface BlogArticleViewProps {
  post: PostDetailData;
  relatedPosts: SidebarPost[];
  sidebarPosts: SidebarPost[];
}

export default function BlogArticleView({
  post,
  relatedPosts,
  sidebarPosts,
}: BlogArticleViewProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Process HTML to inject IDs into headings and extract Table of Contents
  const { processedHtml, headings } = useMemo(() => {
    let index = 0;
    const extracted: { id: string; text: string }[] = [];

    const replaced = post.desc.replace(
      /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi,
      (match, level, attrs, innerText) => {
        const clean = innerText
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .trim();
        if (!clean) return match;

        const id = `heading-${index++}-${clean
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;

        extracted.push({ id, text: clean });

        return `<h${level} id="${id}" class="scroll-mt-28 group relative flex items-center gap-2"${attrs}><span>${innerText}</span><a href="#${id}" class="opacity-0 group-hover:opacity-100 text-[#d4622b] text-sm ml-1.5 transition-opacity" title="Direct link">#</a></h${level}>`;
      }
    );

    return { processedHtml: replaced, headings: extracted };
  }, [post.desc]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        setReadingProgress(
          Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for highlighting active heading in TOC
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileTocOpen(false);
    }
  };

  return (
    <>
      {/* ━━━ READING PROGRESS BAR ━━━ */}
      <div className="fixed top-20 left-0 right-0 h-1 bg-transparent z-40">
        <div
          className="h-full bg-[#d4622b] transition-all duration-100 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-28 pb-20 relative overflow-hidden">
        {/* Subtle ambient atmospheric background glows */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[#d4622b]/5 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* ━━━ BREADCRUMBS ━━━ */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-gray-500 font-medium">
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
              <li className="text-gray-800 font-semibold truncate max-w-xs sm:max-w-md">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* ━━━ ARTICLE HEADER ━━━ */}
          <header className="max-w-4xl mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1a2e] leading-[1.2]">
              {post.title}
            </h1>

            {post.titleShort && post.titleShort !== post.title && (
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                {post.titleShort}
              </p>
            )}

            {/* Author Meta Row */}
            <div className="mt-6 pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#d4622b] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {post.author ? post.author.slice(0, 2).toUpperCase() : "OW"}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1a1a2e]">
                    {post.author || "Onward Team"}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span>{post.createdAt || "Workspace Perspectives"}</span>
                    <span>&bull;</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

              {/* Share icons */}
              <BlogShareButtons title={post.title} />
            </div>
          </header>

          {/* ━━━ FEATURED BANNER IMAGE ━━━ */}
          {post.banner && (
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100 mb-12 border border-gray-200/80 shadow-[0_10px_35px_-15px_rgba(26,26,46,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.banner}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* ━━━ MOBILE TOC DRAWER TRIGGER (Visible on small screens) ━━━ */}
          {headings.length > 2 && (
            <div className="lg:hidden mb-8">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full py-3 px-5 rounded-2xl bg-white border border-gray-200 flex items-center justify-between text-xs font-bold text-[#1a1a2e] shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4622b]" />
                  <span>On This Page ({headings.length} Topics)</span>
                </span>
                <span>{mobileTocOpen ? "▲" : "▼"}</span>
              </button>

              {mobileTocOpen && (
                <div className="mt-2 p-4 bg-white rounded-2xl border border-gray-200 shadow-lg space-y-2">
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => scrollToSection(h.id)}
                      className={`block w-full text-left text-xs py-1.5 px-3 rounded-lg ${
                        activeHeadingId === h.id
                          ? "bg-[#d4622b]/10 text-[#d4622b] font-bold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {h.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ━━━ MAIN ARTICLE BODY & STICKY SIDEBAR ━━━ */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Content Column */}
            <article className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/90 p-7 sm:p-10 lg:p-12 shadow-[0_8px_30px_-12px_rgba(26,26,46,0.06)]">
              {/* Executive Summary / Key Takeaways Box */}
              <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-[#faf8f5] border-l-4 border-[#d4622b] shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4622b] mb-2.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Key Takeaways</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  In this comprehensive overview, we explore how flexible
                  coworking infrastructure empowers modern enterprises with agile
                  scaling, high-velocity networking, and cost efficiency across
                  Delhi NCR.
                </p>
              </div>

              {/* Main Article Content */}
              <div
                className="blog-article-content"
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />

              {/* In-Article Workspace Breakout CTA */}
              <div className="my-12 p-7 sm:p-8 rounded-2xl bg-[#1a1a2e] text-white relative overflow-hidden shadow-lg border border-gray-800">
                <div className="pointer-events-none absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#d4622b]/25 blur-3xl" />
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#d4622b] block mb-1.5">
                    Workspace Solutions
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Looking for a dedicated office tailored to your team?
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mb-5 text-left font-normal">
                    Onward Workspaces offers custom-built enterprise suites,
                    private cabins, and flexible desks with enterprise-grade IT,
                    meeting rooms, and turnkey setup.
                  </p>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-[#d4622b] hover:bg-[#b8501f] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-colors shadow-sm"
                  >
                    <span>Schedule a Private Tour</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#faf8f5] p-6 rounded-2xl border border-gray-200/70">
                <div className="w-14 h-14 rounded-full bg-[#d4622b] text-white font-bold flex items-center justify-center text-lg shrink-0 shadow-sm">
                  {post.author ? post.author.slice(0, 2).toUpperCase() : "OW"}
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] text-base">
                    Published by {post.author || "Onward Team"}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed font-normal">
                    Sharing market insights, workplace design best practices,
                    and flexible real estate trends for modern enterprises
                    across Delhi NCR.
                  </p>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4622b] hover:text-[#b8501f] transition-colors"
                >
                  &larr; Back to all articles
                </a>
                <BlogShareButtons title={post.title} />
              </div>
            </article>

            {/* Right Sticky Sidebar (Accompanies reader through whole scroll) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Sticky Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4622b] mb-4 pb-3 border-b border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-[#d4622b] animate-pulse" />
                    <span>Table of Contents</span>
                  </div>
                  <nav className="space-y-1 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
                    {headings.map((h) => {
                      const isActive = activeHeadingId === h.id;
                      return (
                        <button
                          key={h.id}
                          onClick={() => scrollToSection(h.id)}
                          className={`w-full text-left text-xs py-2 px-3 rounded-xl transition-all block leading-snug ${
                            isActive
                              ? "bg-[#d4622b]/10 text-[#d4622b] font-bold border-l-2 border-[#d4622b]"
                              : "text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50 font-normal"
                          }`}
                        >
                          {h.text}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Consultation / Book a Tour CTA */}
              <div className="bg-[#1a1a2e] text-white rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-lg border border-gray-800">
                <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#d4622b]/20 blur-2xl" />
                <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest block mb-2">
                  Visit Onward
                </span>
                <h3 className="text-lg font-bold leading-snug">
                  Experience Our Workspaces in Person
                </h3>
                <p className="mt-2 text-xs text-gray-300 leading-relaxed font-normal">
                  Tour our premium centers across Delhi, Mohan Estate, Okhla &amp;
                  Noida. Customized setup for teams of 1 to 500+ desks.
                </p>
                <a
                  href="/#contact"
                  className="mt-5 inline-flex items-center justify-center w-full bg-[#d4622b] hover:bg-[#b8501f] text-white font-semibold text-xs py-2.5 px-5 rounded-full transition-colors shadow-md"
                >
                  Schedule a Walkthrough &rarr;
                </a>
              </div>

              {/* Recent Stories Widget */}
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-sm">
                <h3 className="font-bold text-sm text-[#1a1a2e] mb-4 pb-3 border-b border-gray-100">
                  Recent Publications
                </h3>
                <div className="space-y-3.5">
                  {sidebarPosts.map((sp) => (
                    <a
                      key={sp.href}
                      href={sp.href}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="w-14 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sp.img}
                          alt={sp.title}
                          className="w-full h-full object-cover group-hover/item:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#1a1a2e] group-hover/item:text-[#d4622b] transition-colors line-clamp-2 leading-snug">
                          {sp.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-0.5 block">
                          {sp.date}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-sm">
                <h3 className="font-bold text-sm text-[#1a1a2e] mb-3 pb-3 border-b border-gray-100">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Delhi NCR",
                    "Coworking",
                    "Productivity",
                    "Enterprise",
                    "Design & Trends",
                  ].map((topic) => (
                    <a
                      key={topic}
                      href="/blog"
                      className="px-3 py-1 rounded-full bg-gray-100 hover:bg-[#d4622b]/10 hover:text-[#d4622b] text-xs font-semibold text-gray-600 transition-colors"
                    >
                      {topic}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* ━━━ RELATED STORIES ━━━ */}
          <section className="mt-20 pt-16 border-t border-gray-200/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest block mb-1">
                  More From The Journal
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
                  Related Articles
                </h2>
              </div>
              <a
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#d4622b] hover:text-[#b8501f] transition-colors"
              >
                <span>View all articles</span>
                <span>&rarr;</span>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group rounded-3xl bg-white border border-gray-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-[0_18px_40px_-12px_rgba(212,98,43,0.15)] hover:border-[#d4622b]/40 transition-all duration-300"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      <span className="font-semibold text-[#d4622b]">
                        {item.author}
                      </span>{" "}
                      &bull; {item.date}
                    </div>
                    <h3 className="font-bold text-base text-[#1a1a2e] group-hover:text-[#d4622b] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#d4622b]">
                    <span>Read Article</span>
                    <span className="transition-transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ━━━ FOOTER ━━━ */}
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
