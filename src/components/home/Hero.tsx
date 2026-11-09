import Button from "@/components/ui/Button";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 sm:pt-32">
      <p className="font-mono text-sm text-accent">Hello, I&apos;m</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{site.name}</h1>
      <p className="mt-4 text-lg text-muted">{site.headline}</p>
      <p className="mt-6 max-w-2xl text-muted">{site.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/projects">View projects</Button>
        <Button href="/resume.pdf" variant="outline">Resume</Button>
        <Button href={site.github} variant="ghost">GitHub</Button>
        <Button href={site.linkedin} variant="ghost">LinkedIn</Button>
      </div>
    </section>
  );
}