import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { experiencePreview, achievements } from "@/data/home";

export default function ExperiencePreview() {
  return (
    <Section eyebrow="03 / Background" title="Experience and achievements">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          {experiencePreview.map((e) => (
            <Card key={e.role}>
              <p className="font-mono text-xs text-muted">{e.period}</p>
              <h3 className="mt-1 font-semibold">{e.role}</h3>
              <p className="text-sm text-accent">{e.org}</p>
              <p className="mt-2 text-sm text-muted">{e.text}</p>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          {achievements.map((a) => (
            <Card key={a.title}>
              <h3 className="font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted">{a.detail}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <Button href="/experience" variant="outline">Full experience</Button>
      </div>
    </Section>
  );
}