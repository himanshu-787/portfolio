import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, children, className }: Props) {
  return (
    <section id={id} className={cn("mx-auto max-w-5xl px-6 py-16", className)}>
      {eyebrow && <p className="font-mono text-sm text-accent">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}