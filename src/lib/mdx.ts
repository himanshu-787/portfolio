import fs from "node:fs/promises";
import path from "node:path";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

// Shared by case studies and the blog.
// Order matters: Katex runs before highlight so math blocks are not treated as code.
export const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [rehypeHighlight, { ignoreMissing: true }],
    ],
  },
};

export async function getCaseStudySource(slug: string): Promise<string | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null; // blocks path tricks like ../
  const file = path.join(process.cwd(), "content", "projects", `${slug}.mdx`);
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null; // no case study written yet
  }
}