import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import BlogClient from "@/components/BlogClient";
import { blogPosts } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Blog & Workspace Insights | Onward Workspaces",
  description:
    "Explore trends, perspectives, and insights on coworking spaces, private suites, and commercial real estate across Delhi NCR from Onward Workspaces.",
};

export default function BlogPage() {
  return (
    <>
      <Header alwaysSolid />
      <main>
        <BlogClient posts={blogPosts} />
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
