import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft size={16} /> All projects
      </Link>

      <p className="mt-8 font-mono text-sm text-accent">
        {project.year} · {project.status}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
      <p className="mt-6 text-lg text-muted">{project.summary}</p>

      {project.highlight && (
        <Card className="mt-8">
          <p className="font-mono text-xs text-accent">Reported result</p>
          <p className="mt-1">{project.highlight}</p>
        </Card>
      )}

      <ul className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li key={t} className="rounded bg-surface px-2 py-1 font-mono text-xs text-muted">{t}</li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted">
        A full case study (problem, method, experiments, results, limitations) is added in Phase 6.
      </p>

      {project.github && (
        <div className="mt-6">
          <Button href={project.github} variant="outline">View on GitHub</Button>
        </div>
      )}
    </article>
  );
}
