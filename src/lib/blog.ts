import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};

export type Heading = { id: string; text: string };
export type Post = PostMeta & { content: string; headings: Heading[] };

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function extractHeadings(content: string): Heading[] {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  for (const match of withoutCode.matchAll(/^##\s+(.+)$/gm)) {
    const text = match[1].replace(/[`*_]/g, "").trim();
    headings.push({ id: slugger.slug(text), text });
  }
  return headings;
}

function parse(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  if (!data.title || !data.date) {
    throw new Error(`Blog post "${slug}" needs "title" and "date" in its frontmatter.`);
  }
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date,
    category: String(data.category ?? "General"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    content,
    headings: extractHeadings(content),
  };
}

const isHidden = (p: PostMeta) => p.draft && process.env.NODE_ENV === "production";

export async function getAllPosts(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    return [];
  }
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const slug = f.replace(/\.mdx$/, "");
        return parse(slug, await fs.readFile(path.join(BLOG_DIR, f), "utf8"));
      })
  );
  return posts.filter((p) => !isHidden(p)).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null; // blocks path tricks like ../
  try {
    const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const post = parse(slug, raw);
    return isHidden(post) ? null : post;
  } catch {
    return null;
  }
}

export function getRelated(current: Post, all: Post[], limit = 2): Post[] {
  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      post: p,
      score:
        (p.category === current.category ? 2 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}