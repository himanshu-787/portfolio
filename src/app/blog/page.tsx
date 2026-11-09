import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import PostCard from "@/components/blog/PostCard";
import { cn } from "@/lib/utils";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on machine learning, privacy-preserving AI and engineering.",
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const all = await getAllPosts();
  const categories = Array.from(new Set(all.map((p) => p.category))).sort();
  const posts = category ? all.filter((p) => p.category === category) : all;

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1 font-mono text-xs transition",
      active
        ? "border-accent bg-accent text-bg"
        : "border-line text-muted hover:border-accent hover:text-accent"
    );

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Technical notes"
        text="Short write-ups on things I have built or studied."
      />
      <div className="mx-auto max-w-5xl px-6 py-8">
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <Link href="/blog" className={chip(!category)}>All</Link>
            {categories.map((c) => (
              <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`} className={chip(category === c)}>
                {c}
              </Link>
            ))}
          </div>
        )}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        {posts.length === 0 && <p className="mt-8 text-muted">No posts yet.</p>}
      </div>
    </>
  );
}