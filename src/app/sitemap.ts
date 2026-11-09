import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const pages = ["", "/about", "/skills", "/projects", "/research", "/experience", "/blog", "/resume", "/contact", "/assistant"];
  const posts = await getAllPosts();

  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}