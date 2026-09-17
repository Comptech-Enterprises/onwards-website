"use client";

import { useState } from "react";
import BlogArticleView, {
  PostDetailData,
  SidebarPost,
} from "./BlogArticleView";
import BlogArticleViewAlt from "./BlogArticleViewAlt";

interface BlogDetailDualViewProps {
  post: PostDetailData;
  relatedPosts: SidebarPost[];
  sidebarPosts: SidebarPost[];
  nextPost?: SidebarPost;
  postIndex: number;
}

export default function BlogDetailDualView({
  post,
  relatedPosts,
  sidebarPosts,
  nextPost,
  postIndex,
}: BlogDetailDualViewProps) {
  // Odd index = Design 2 (New Magazine design)
  // Even index = Design 1 (Current Sidebar & TOC design)
  const defaultDesign = postIndex % 2 === 1 ? 2 : 1;
  const [activeDesign, setActiveDesign] = useState<1 | 2>(defaultDesign);

  return (
    <>
      {activeDesign === 1 ? (
        <BlogArticleView
          post={post}
          relatedPosts={relatedPosts}
          sidebarPosts={sidebarPosts}
        />
      ) : (
        <BlogArticleViewAlt
          post={post}
          relatedPosts={relatedPosts}
          nextPost={nextPost}
        />
      )}

      {/* Floating Design Preview Switcher Pill */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-[#1a1a2e]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl border border-white/15 flex items-center gap-2.5">
          <span className="text-[11px] font-bold text-gray-300 hidden sm:inline">
            Active Layout:
          </span>
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full text-xs">
            <button
              onClick={() => setActiveDesign(1)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                activeDesign === 1
                  ? "bg-[#d4622b] text-white shadow-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              1. Sidebar &amp; TOC {postIndex % 2 === 0 ? "(Default)" : ""}
            </button>
            <button
              onClick={() => setActiveDesign(2)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                activeDesign === 2
                  ? "bg-[#d4622b] text-white shadow-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              2. Magazine View {postIndex % 2 === 1 ? "(Default)" : ""}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
