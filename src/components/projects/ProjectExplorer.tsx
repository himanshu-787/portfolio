"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesTag = !tag || p.tags.includes(tag);
      const matchesQuery =
        !q || `${p.title} ${p.summary} ${p.tags.join(" ")}`.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [projects, query, tag]);

  return (
    <div>
      <label htmlFor="project-search" className="sr-only">Search projects</label>
      <input
        id="project-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects..."
        className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {[null, ...allTags].map((t) => (
          <button
            key={t ?? "all"}
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-xs transition",
              tag === t
                ? "border-accent bg-accent text-bg"
                : "border-line text-muted hover:border-accent hover:text-accent"
            )}
          >
            {t ?? "All"}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-muted">No projects match your search.</p>
      )}
    </div>
  );
}