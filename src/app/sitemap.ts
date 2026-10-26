import type { MetadataRoute } from "next";
import { delhiCity, gurgaonCity, noidaCity } from "@/data/locations";
import { getWorkspacesForArea } from "@/data/workspaces";
import { solutions } from "@/data/solutions";
import { blogPosts } from "@/data/blogPosts";

const BASE_URL = "https://onwardworkspaces.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  function addUrl(
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number,
    lastModified: Date = now
  ) {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const url = cleanPath === "/" ? BASE_URL : `${BASE_URL}${cleanPath}`;
    if (seenUrls.has(url)) return;
    seenUrls.add(url);

    entries.push({
      url,
      lastModified,
      changeFrequency,
      priority,
    });
  }

  // 1. Core Pages
  addUrl("/", "daily", 1.0);
  addUrl("/about", "monthly", 0.8);
  addUrl("/enterprise", "monthly", 0.8);
  addUrl("/team", "monthly", 0.7);
  addUrl("/blog", "daily", 0.9);

  // 2. City Hub Pages
  const cities = [delhiCity, gurgaonCity, noidaCity];
  for (const city of cities) {
    addUrl(`/${city.slug}`, "weekly", 0.9);

    // Areas & Workspace Centres
    for (const area of city.areas) {
      addUrl(`/${city.slug}/${area.slug}`, "weekly", 0.8);

      const workspaces = getWorkspacesForArea(area);
      for (const ws of workspaces) {
        addUrl(`/${city.slug}/${area.slug}/${ws.centreKey}`, "weekly", 0.8);
      }
    }
  }

  // 3. Solutions / Offices Pages
  for (const sol of solutions) {
    addUrl(`/offices/${sol.path}`, "weekly", 0.8);
  }

  // 4. Blog Posts
  for (const post of blogPosts) {
    const postDate = post.date ? new Date(post.date) : now;
    const validDate = isNaN(postDate.getTime()) ? now : postDate;
    addUrl(post.href, "monthly", 0.7, validDate);
  }

  return entries;
}
