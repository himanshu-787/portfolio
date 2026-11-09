import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Card className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted">{project.year}</span>
          <span
            className={
              project.status === "In progress"
                ? "rounded-full border border-accent/40 px-2 py-0.5 font-mono text-xs text-accent"
                : "rounded-full border border-line px-2 py-0.5 font-mono text-xs text-muted"
            }
          >
            {project.status}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{project.summary}</p>
        {project.highlight && (
          <p className="mt-3 text-sm text-fg">{project.highlight}</p>
        )}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded bg-bg px-2 py-1 font-mono text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>
      </Card>
    </Link>
  );
}