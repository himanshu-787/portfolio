import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { researchInterests } from "@/data/home";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research"
        text="Areas I work in and the project reports behind them."
      />
      <Section title="Interests">
        <ul className="flex flex-wrap gap-2">
          {researchInterests.map((r) => (
            <li key={r} className="rounded-full border border-line px-3 py-1 text-sm text-muted">{r}</li>
          ))}
        </ul>
      </Section>
      <Section title="Research projects">
        <ul className="space-y-3">
          {projects.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="text-fg hover:text-accent">
                {p.title}
              </Link>
              <span className="ml-2 font-mono text-xs text-muted">{p.status}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}