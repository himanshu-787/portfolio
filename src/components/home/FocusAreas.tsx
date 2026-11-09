import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { focusAreas, researchInterests } from "@/data/home";

export default function FocusAreas() {
  return (
    <Section eyebrow="02 / Focus" title="Technical focus and research interests">
      <div className="grid gap-4 sm:grid-cols-2">
        {focusAreas.map((a) => (
          <Card key={a.title}>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="mt-2 text-sm text-muted">{a.text}</p>
          </Card>
        ))}
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {researchInterests.map((r) => (
          <li key={r} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
            {r}
          </li>
        ))}
      </ul>
    </Section>
  );
}