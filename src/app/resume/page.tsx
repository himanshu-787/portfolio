import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { roles, education } from "@/data/experience";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <>
      <PageHeader eyebrow="Resume" title="Resume" />
      <div className="mx-auto max-w-5xl px-6">
        <Button href="/resume.pdf">Download PDF</Button>
      </div>
      <Section title="Education">
        <p className="font-semibold">{education.degree}</p>
        <p className="text-sm text-muted">{education.school}, {education.period}</p>
      </Section>
      <Section title="Experience">
        <ul className="space-y-2 text-sm text-muted">
          {roles.map((r) => (
            <li key={r.role}>
              <span className="text-fg">{r.role}</span>, {r.org} ({r.period})
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}