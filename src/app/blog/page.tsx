import type { Metadata } from "next";
import Header from "@/components/Header";
import { blogPosts } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Blog | Onward Workspaces",
  description: "Insights on coworking, flexible offices, and workspace design from Onward Workspaces.",
};

export default function BlogPage() {
  return (
    <>
      <Header alwaysSolid />
      <main className="bg-[#faf8f5] min-h-screen">
        {/* Banner */}
        <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog-banner.png"
            alt="Blog"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a1a2e]/70" />
          <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-8 pb-10 max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Blog</h1>
            <nav className="mt-2 text-sm text-white/70">
              <a href="/" className="hover:text-[#f59e0b] transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <span className="text-white">Blog</span>
            </nav>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <a
                  key={i}
                  href={post.href}
                  className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#d4622b]/40 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.img}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="font-semibold text-[#d4622b]">{post.author}</span>
                      <em className="not-italic">{post.date}</em>
                    </div>
                    <h4 className="mt-2 font-bold text-[#1a1a2e] leading-snug group-hover:text-[#d4622b] transition-colors">
                      {post.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {post.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
