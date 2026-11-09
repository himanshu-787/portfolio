import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Technical skills"
        text="Tools and methods I have used in projects, grouped by area."
      />
      <div className="mx-auto grid max-w-5xl gap-4 px-6 py-8 md:grid-cols-2">
        {skillGroups.map((g) => (
          <Card key={g.category}>
            <h2 className="font-semibold">{g.category}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="rounded bg-bg px-2 py-1 font-mono text-xs text-muted">{s}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}