import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { education } from "@/data/experience";
import { researchInterests } from "@/data/home";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="About me" />
      <Section title="Introduction">
        <p className="max-w-2xl text-muted">
          I am a B.Tech Computer Science and Engineering student at IIIT Raichur (graduating 2027).
          I build machine learning systems across deep learning, privacy-preserving and federated
          learning, edge deployment and LLM-based agents, and I evaluate each with clear metrics.
          {/* [CONFIRM] edit this paragraph in your own voice */}
        </p>
      </Section>
      <Section title="Education">
        <Card>
          <p className="font-mono text-xs text-muted">{education.period}</p>
          <h3 className="mt-1 font-semibold">{education.degree}</h3>
          <p className="text-sm text-accent">{education.school}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {education.coursework.map((c) => (
              <li key={c} className="rounded bg-bg px-2 py-1 text-xs text-muted">{c}</li>
            ))}
          </ul>
        </Card>
      </Section>
      <Section title="Research interests">
        <ul className="flex flex-wrap gap-2">
          {researchInterests.map((r) => (
            <li key={r} className="rounded-full border border-line px-3 py-1 text-sm text-muted">{r}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}