import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import BlogShareButtons from "@/components/BlogShareButtons";
import { blogPosts } from "@/data/blogPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.href.replace("/blog/", ""),
  }));
}

async function fetchPostData(slug: string) {
  // 1. Try local API on port 8083 (timeout after 1.5s to never block build)
  try {
    const res = await fetch(
      `http://127.0.0.1:8083/blog/title?title=${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(1500),
      }
    );
    if (res.ok) {
      const json = await res.json();
      if (json?.statusCode === 200 && json?.data) {
        return {
          title: json.data.title || "",
          desc: json.data.desc || "",
          titleShort: json.data.titleShort || "",
          banner: json.data.banner || json.data.image || "",
          createdAt: json.data.createdAt
            ? new Date(json.data.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "",
          author: "Onward Team",
          seo: json.data.seo || "",
        };
      }
    }
  } catch {
    // If backend is not accessible, fall back smoothly
  }

  // 2. Fallback to bundled dataset
  const local = blogPosts.find(
    (p) => p.href.endsWith(slug) || p.href === `/blog/${slug}`
  );
  if (local) {
    return {
      title: local.title,
      desc: `
        <p>${local.desc}</p>
        <h4>Transforming Modern Work in Delhi NCR</h4>
        <p>In today's fast-evolving business landscape, having access to an agile, high-performing workspace is essential for team productivity and enterprise agility. Onward Workspaces offers turnkey, fully managed office environments designed around flexibility, high-speed IT infrastructure, and premium hospitality standards.</p>
        <h4>Key Benefits for Modern Teams</h4>
        <ul>
          <li><strong>Zero Setup Downtime:</strong> Walk into a fully configured enterprise workspace with complete IT, power backup, and ergonomics.</li>
          <li><strong>Prime Strategic Locations:</strong> Centers in Mohan Estate, Okhla Phase 2, South Delhi, and Noida with immediate metro connectivity.</li>
          <li><strong>Scalable Membership Models:</strong> Seamlessly adjust your desk footprint as your headcount expands.</li>
        </ul>
        <p>Whether you need private enterprise suites, on-demand meeting rooms, or dynamic coworking setups, Onward delivers the infrastructure your company needs to thrive.</p>
      `,
      titleShort: local.desc,
      banner: local.img,
      createdAt: local.date,
      author: local.author,
      seo: "",
    };
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostData(slug);

  if (!post) {
    return {
      title: "Article Not Found | Onward Workspaces",
    };
  }

  return {
    title: `${post.title} | Onward Workspaces`,
    description: post.titleShort || post.title,
    openGraph: {
      title: post.title,
      description: post.titleShort || post.title,
      images: post.banner ? [post.banner] : [],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPostData(slug);

  if (!post) {
    notFound();
  }

  // Related posts from same dataset excluding current
  const relatedPosts = blogPosts
    .filter((p) => !p.href.endsWith(slug))
    .slice(0, 3);

  // Recent posts for the sidebar
  const sidebarPosts = blogPosts
    .filter((p) => !p.href.endsWith(slug))
    .slice(3, 7);

  return (
    <>
      <Header alwaysSolid />

      <main className="bg-[#faf8f5] min-h-screen text-[#1a1a2e] pt-28 pb-20 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-[#d4622b]/5 via-[#f59e0b]/5 to-transparent blur-[140px]" />

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

            {/* Author & Publication Meta Bar */}
            <div className="mt-6 pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#d4622b] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {post.author
                    ? post.author.slice(0, 2).toUpperCase()
                    : "OW"}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1a1a2e]">
                    {post.author || "Onward Team"}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span>{post.createdAt || "Workspace Perspectives"}</span>
                    <span>&bull;</span>
                    <span>4 min read</span>
                  </div>
                </div>
              </div>

              {/* Share buttons */}
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

          {/* ━━━ MAIN ARTICLE BODY & SIDEBAR ━━━ */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Content Column */}
            <article className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/90 p-7 sm:p-10 lg:p-12 shadow-[0_8px_30px_-12px_rgba(26,26,46,0.06)]">
              <div
                className="blog-article-content"
                dangerouslySetInnerHTML={{ __html: post.desc }}
              />

              {/* Author Bio Box */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#faf8f5] p-6 rounded-2xl border border-gray-200/70">
                <div className="w-14 h-14 rounded-full bg-[#d4622b] text-white font-bold flex items-center justify-center text-lg shrink-0 shadow-sm">
                  {post.author
                    ? post.author.slice(0, 2).toUpperCase()
                    : "OW"}
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] text-base">
                    Published by {post.author || "Onward Team"}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                    Sharing market insights, workplace design best practices,
                    and flexible real estate trends for modern enterprises
                    across Delhi NCR.
                  </p>
                </div>
              </div>

              {/* Bottom Share Bar */}
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

            {/* Right Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
              {/* Consultation / Book a Tour CTA */}
              <div className="bg-[#1a1a2e] text-white rounded-3xl p-7 sm:p-8 relative overflow-hidden shadow-lg border border-gray-800">
                <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#d4622b]/20 blur-2xl" />
                <span className="text-[#d4622b] text-xs font-bold uppercase tracking-widest block mb-2">
                  Visit Onward
                </span>
                <h3 className="text-xl font-bold leading-snug">
                  Experience Our Workspaces in Person
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Tour our premium centers across Delhi, Mohan Estate, Okhla &amp;
                  Noida. Customized setup for teams of 1 to 500+ desks.
                </p>
                <a
                  href="/#contact"
                  className="mt-6 inline-flex items-center justify-center w-full bg-[#d4622b] hover:bg-[#b8501f] text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-full transition-colors shadow-md"
                >
                  Schedule a Walkthrough &rarr;
                </a>
              </div>

              {/* Recent Stories Widget */}
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-sm">
                <h3 className="font-bold text-base text-[#1a1a2e] mb-4 pb-3 border-b border-gray-100">
                  Recent Publications
                </h3>
                <div className="space-y-4">
                  {sidebarPosts.map((sp) => (
                    <a
                      key={sp.href}
                      href={sp.href}
                      className="flex items-start gap-3.5 group/item"
                    >
                      <div className="w-16 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
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
                        <span className="text-[11px] text-gray-400 mt-1 block">
                          {sp.date}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-sm">
                <h3 className="font-bold text-base text-[#1a1a2e] mb-3 pb-3 border-b border-gray-100">
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
              <p className="text-sm leading-relaxed max-w-xs text-gray-500">
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
