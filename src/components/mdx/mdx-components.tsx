import Image from "next/image";

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="my-6 rounded-xl border border-line bg-surface p-5">
      {title && <p className="font-mono text-xs text-accent">{title}</p>}
      <div className="mt-1 text-sm">{children}</div>
    </aside>
  );
}

// Honest placeholder for data you do not have yet.
export function Pending({ children }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded border border-dashed border-line px-2 py-0.5 font-mono text-xs text-muted">
      Pending{children ? `: ${children}` : ""}
    </span>
  );
}

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={700}
        className="h-auto w-full rounded-xl border border-line"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = { Callout, Pending, Figure };