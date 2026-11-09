import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { site } from "@/data/site";

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-accent">Hello, I&apos;m</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{site.name}</h1>
      <p className="mt-4 text-lg text-muted">{site.headline}</p>
      <p className="mt-6 max-w-2xl text-muted">{site.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/projects">View projects</Button>
        <Button href={site.github} variant="outline">GitHub</Button>
        <Button href="/contact" variant="ghost">Contact</Button>
      </div>
      <Card className="mt-16 max-w-md">
        <p className="font-mono text-xs text-accent">Design system check</p>
        <p className="mt-2 text-sm text-muted">If you can see this card, tokens and components work.</p>
      </Card>
    </section>
  );
}