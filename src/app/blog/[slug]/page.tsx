import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import BlogArticleView from "@/components/BlogArticleView";
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
      <BlogArticleView
        post={post}
        relatedPosts={relatedPosts}
        sidebarPosts={sidebarPosts}
      />
    </>
  );
}
