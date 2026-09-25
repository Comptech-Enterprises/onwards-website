"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface BlogPost {
  title: string;
  desc: string;
  author: string;
  date: string;
  img: string;
  href: string;
}

interface BlogClientProps {
  posts: BlogPost[];
}

const CATEGORIES = [
  "All",
  "Delhi NCR",
  "Coworking",
  "Productivity",
  "Enterprise",
  "Design & Trends",
] as const;

type Category = (typeof CATEGORIES)[number];

function getPostCategory(post: BlogPost): Category {
  const text = `${post.title} ${post.desc}`.toLowerCase();
  if (
    text.includes("delhi") ||
    text.includes("noida") ||
    text.includes("okhla") ||
    text.includes("mohan estate") ||
    text.includes("gurgaon")
  ) {
    return "Delhi NCR";
  }
  if (
    text.includes("enterprise") ||
    text.includes("corporate") ||
    text.includes("bootstrap") ||
    text.includes("vc funding")
  ) {
    return "Enterprise";
  }
  if (
    text.includes("productivity") ||
    text.includes("amenities") ||
    text.includes("focus") ||
    text.includes("meeting room") ||
    text.includes("dedicated desk")
  ) {
    return "Productivity";
  }
  if (
    text.includes("trend") ||
    text.includes("design") ||
    text.includes("architecture") ||
    text.includes("green") ||
    text.includes("sustainable")
  ) {
    return "Design & Trends";
  }
  return "Coworking";
}

const POSTS_PER_PAGE = 9;

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Categorized post list
  const enrichedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      category: getPostCategory(post),
    }));
  }, [posts]);

  // Filtered by search and category
  const filteredPosts = useMemo(() => {
    return enrichedPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [enrichedPosts, selectedCategory, searchQuery]);

  // Featured post is the first post
  const featuredPost = enrichedPosts[0];

  // Paginated cards for the grid
  const gridPosts = useMemo(() => {
    const source =
      selectedCategory === "All" && searchQuery.trim() === ""
        ? filteredPosts.slice(1)
        : filteredPosts;

    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return source.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage, selectedCategory, searchQuery]);

  const totalFilteredForGrid =
    selectedCategory === "All" && searchQuery.trim() === ""
      ? Math.max(0, filteredPosts.length - 1)
      : filteredPosts.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalFilteredForGrid / POSTS_PER_PAGE)
  );

  const handleCategoryChange = (cat: Category) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="relative overflow-hidden bg-[#faf8f5] min-h-screen text-[#1a1a2e]">
      {/* Subtle warm atmospheric ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4622b]/5 via-[#f59e0b]/5 to-transparent blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* ━━━ EDITORIAL HERO HEADER ━━━ */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a1a2e] leading-[1.15]"
          >
            Ideas, Insights &amp;{" "}
            <span className="text-[#d4622b]">Workspace Innovation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
          >
            Explore perspectives on flexible workspaces, enterprise scaling,
            commercial real estate trends, and the future of work across Delhi
            NCR.
          </motion.p>
        </div>

        {/* ━━━ FEATURED STORY ━━━ */}
        {selectedCategory === "All" && searchQuery.trim() === "" && featuredPost && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 lg:mb-20"
          >
            <div className="group rounded-3xl bg-white border border-gray-200/90 shadow-[0_10px_35px_-15px_rgba(26,26,46,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(212,98,43,0.15)] hover:border-[#d4622b]/40 transition-all duration-300 overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Visual Image */}
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredPost.img}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Story Meta & Content */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-500 font-medium mb-3">
                      <span className="font-bold text-[#d4622b]">
                        {featuredPost.author}
                      </span>
                      <span>&bull;</span>
                      <span>{featuredPost.date}</span>
                    </div>

                    <a href={featuredPost.href} className="group/link block">
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] leading-tight group-hover/link:text-[#d4622b] transition-colors">
                        {featuredPost.title}
                      </h2>
                    </a>

                    <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify font-normal">
                      {featuredPost.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href={featuredPost.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#d4622b] hover:text-[#b8501f] transition-colors group/btn"
                    >
                      <span>Read Article</span>
                      <span className="transition-transform group-hover/btn:translate-x-1">
                        &rarr;
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ━━━ CATEGORY PILLS & SEARCH ━━━ */}
        <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200/80">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-100/70"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#d4622b] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white border border-gray-200 text-sm text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:border-[#d4622b] focus:ring-2 focus:ring-[#d4622b]/15 shadow-sm transition-all"
            />
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center rounded-full bg-gray-100"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Matches Status */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-8 font-medium">
          <div>
            Showing{" "}
            <span className="font-bold text-[#1a1a2e]">
              {gridPosts.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1a1a2e]">
              {totalFilteredForGrid}
            </span>{" "}
            articles
            {selectedCategory !== "All" && (
              <span> in &ldquo;{selectedCategory}&rdquo;</span>
            )}
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>

          <div className="text-gray-400 hidden sm:block">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* ━━━ ARTICLE CARDS GRID ━━━ */}
        {gridPosts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8">
            <h3 className="text-xl font-bold text-[#1a1a2e]">
              No articles match your search
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your keywords or browse all categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#d4622b] text-white text-xs font-bold hover:bg-[#b8501f] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {gridPosts.map((post, idx) => (
                <motion.article
                  layout
                  key={post.href + idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  whileHover={{ y: -5 }}
                  className="group rounded-3xl bg-white border border-gray-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-[0_6px_24px_-10px_rgba(26,26,46,0.06)] hover:shadow-[0_18px_40px_-12px_rgba(212,98,43,0.15)] hover:border-[#d4622b]/40 transition-all duration-300"
                >
                  <div>
                    {/* Visual Card Image */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-5 border border-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.img}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2.5">
                      <span className="font-semibold text-[#d4622b]">
                        {post.author}
                      </span>
                      <span className="font-medium">{post.date}</span>
                    </div>

                    {/* Title */}
                    <a href={post.href} className="block group/link">
                      <h3 className="font-bold text-[#1a1a2e] text-base sm:text-lg leading-snug group-hover/link:text-[#d4622b] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </a>

                    {/* Description Paragraph (Justified) */}
                    <p className="mt-2.5 text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 font-normal text-justify">
                      {post.desc}
                    </p>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="pt-4 mt-5 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href={post.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4622b] group-hover:text-[#b8501f] transition-colors"
                    >
                      <span>Read Article</span>
                      <span className="transition-transform group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ━━━ PAGINATION CONTROLS ━━━ */}
        {totalPages > 1 && (
          <div className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white text-xs font-semibold text-[#1a1a2e] hover:border-[#d4622b] hover:text-[#d4622b] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-[#1a1a2e]"
            >
              &larr; Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => {
                return (
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - currentPage) <= 2
                );
              })
              .map((page, idx, arr) => {
                const prevPage = arr[idx - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                  <div key={page} className="flex items-center gap-2">
                    {showEllipsis && (
                      <span className="px-1 text-gray-400 text-xs">&hellip;</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-full text-xs font-semibold transition-all ${
                        currentPage === page
                          ? "bg-[#d4622b] text-white shadow-sm shadow-[#d4622b]/20"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-[#1a1a2e]"
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white text-xs font-semibold text-[#1a1a2e] hover:border-[#d4622b] hover:text-[#d4622b] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-[#1a1a2e]"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
