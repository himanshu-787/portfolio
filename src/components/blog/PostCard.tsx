import Link from "next/link";
import Card from "@/components/ui/Card";
import { formatDate, type PostMeta } from "@/lib/blog";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card>
        <p className="font-mono text-xs text-muted">
          {formatDate(post.date)} · {post.readingMinutes} min read · {post.category}
        </p>
        <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
        <p className="mt-2 text-sm text-muted">{post.description}</p>
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li key={t} className="rounded bg-bg px-2 py-1 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Link>
  );
}