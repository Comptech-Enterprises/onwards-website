import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

      <Footer />
    </>
  );
}
