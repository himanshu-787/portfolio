export default function PageHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="mx-auto max-w-5xl px-6 pb-4 pt-20">
      <p className="font-mono text-sm text-accent">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      {text && <p className="mt-4 max-w-2xl text-muted">{text}</p>}
    </header>
  );
}