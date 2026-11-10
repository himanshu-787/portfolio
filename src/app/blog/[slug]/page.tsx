import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostCard from "@/components/blog/PostCard";
import JsonLd from "@/components/seo/JsonLd";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { mdxOptions } from "@/lib/mdx";
import { formatDate, getAllPosts, getPost, getRelated } from "@/lib/blog";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: ["/opengraph-image"],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getRelated(post, await getAllPosts());

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          keywords: post.tags.join(", "),
          url: `${site.url.replace(/\/$/, "")}/blog/${post.slug}`,
          author: { "@type": "Person", name: site.name },
        }}
      />
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft size={16} /> All posts
      </Link>

      <p className="mt-8 font-mono text-sm text-accent">
        {formatDate(post.date)} · {post.readingMinutes} min read · {post.category}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
      {post.description && <p className="mt-6 text-lg text-muted">{post.description}</p>}

      {post.tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li key={t} className="rounded bg-surface px-2 py-1 font-mono text-xs text-muted">{t}</li>
          ))}
        </ul>
      )}

      {post.headings.length > 1 && (
        <nav aria-label="Table of contents" className="mt-8 rounded-xl border border-line bg-surface p-5">
          <p className="font-mono text-xs text-accent">On this page</p>
          <ol className="mt-2 space-y-1 text-sm">
            {post.headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="text-muted hover:text-fg">{h.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <hr className="mt-10 border-line" />

      <div className="case-study">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold">Related posts</h2>
          <div className="mt-4 grid gap-4">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}