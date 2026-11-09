import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { roles } from "@/data/experience";
import { achievements } from "@/data/home";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Experience and achievements" />
      <div className="mx-auto max-w-5xl space-y-4 px-6 py-8">
        {roles.map((r) => (
          <Card key={r.role}>
            <p className="font-mono text-xs text-muted">{r.period}</p>
            <h2 className="mt-1 text-lg font-semibold">{r.role}</h2>
            <p className="text-sm text-accent">{r.org}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              {r.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Card>
        ))}
        <h2 className="pt-8 text-xl font-semibold">Achievements</h2>
        {achievements.map((a) => (
          <Card key={a.title}>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted">{a.detail}</p>
          </Card>
        ))}
      </div>
    </>
  );
}