import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { roles, education } from "@/data/experience";
import { achievements, researchInterests } from "@/data/home";

export type Chunk = { id: string; title: string; url: string; text: string };

const ROOT = process.cwd();
let cache: Chunk[] | null = null;

function cleanMdx(md: string): string {
  return md
    .replace(/<Pending>(.*?)<\/Pending>/g, "(pending: $1)")
    .replace(/<Pending\s*\/>/g, "(pending)")
    .replace(/<\/?[A-Z][^>]*>/g, "") // other custom components
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Splits on "## " headings; text before the first heading is the overview.
function splitSections(md: string): { heading: string; body: string }[] {
  const parts = md.split(/^## /m);
  const out: { heading: string; body: string }[] = [];
  parts.forEach((part, i) => {
    if (i === 0) {
      if (part.trim()) out.push({ heading: "Overview", body: part });
      return;
    }
    const nl = part.indexOf("\n");
    out.push({ heading: part.slice(0, nl).trim(), body: part.slice(nl + 1) });
  });
  return out.filter((s) => s.body.trim().length > 20);
}

async function readDir(dir: string): Promise<{ slug: string; raw: string }[]> {
  try {
    const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".mdx"));
    return await Promise.all(
      files.map(async (f) => ({
        slug: f.replace(/\.mdx$/, ""),
        raw: await fs.readFile(path.join(dir, f), "utf8"),
      }))
    );
  } catch {
    return [];
  }
}

export async function getChunks(): Promise<Chunk[]> {
  if (cache) return cache;
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    title: `About ${site.name}`,
    url: "/about",
    text: `${site.name}. ${site.headline}. ${site.tagline} Degree: ${education.degree} at ${education.school}, ${education.period}. Coursework: ${education.coursework.join(", ")}. Research interests: ${researchInterests.join(", ")}.`,
  });

  chunks.push({
    id: "contact",
    title: "Contact",
    url: "/contact",
    text: `Contact ${site.name} through the contact form on this site or by email at ${site.email}. GitHub: ${site.github}. LinkedIn: ${site.linkedin}.`,
  });

  for (const g of skillGroups) {
    chunks.push({
      id: `skills-${g.category}`,
      title: `Skills: ${g.category}`,
      url: "/skills",
      text: `${g.category}: ${g.items.join(", ")}.`,
    });
  }

  for (const r of roles) {
    chunks.push({
      id: `role-${r.role}`,
      title: `${r.role}, ${r.org}`,
      url: "/experience",
      text: `${r.role} at ${r.org} (${r.period}). ${r.points.join(" ")}`,
    });
  }

  chunks.push({
    id: "achievements",
    title: "Achievements",
    url: "/experience",
    text: achievements.map((a) => `${a.title}: ${a.detail}.`).join(" "),
  });

  for (const p of projects) {
    chunks.push({
      id: `project-${p.slug}`,
      title: p.title,
      url: `/projects/${p.slug}`,
      text: `${p.title} (${p.year}, status: ${p.status}). ${p.summary} Technologies: ${p.tags.join(", ")}.${p.highlight ? ` Reported result: ${p.highlight}.` : ""}`,
    });
  }

  for (const { slug, raw } of await readDir(path.join(ROOT, "content", "projects"))) {
    const title = projects.find((p) => p.slug === slug)?.title ?? slug;
    for (const s of splitSections(cleanMdx(raw))) {
      chunks.push({
        id: `case-${slug}-${s.heading}`,
        title: `${title}: ${s.heading}`,
        url: `/projects/${slug}`,
        text: s.body.trim(),
      });
    }
  }

  for (const { slug, raw } of await readDir(path.join(ROOT, "content", "blog"))) {
    const { data, content } = matter(raw);
    if (data.draft && process.env.NODE_ENV === "production") continue;
    const title = String(data.title ?? slug);
    for (const s of splitSections(cleanMdx(content))) {
      chunks.push({
        id: `blog-${slug}-${s.heading}`,
        title: `${title}: ${s.heading}`,
        url: `/blog/${slug}`,
        text: s.body.trim(),
      });
    }
  }

  cache = chunks;
  return chunks;
}