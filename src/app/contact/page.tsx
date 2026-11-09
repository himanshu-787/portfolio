import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        text="For internships, research collaboration or questions about my projects."
      />
      <div className="mx-auto flex max-w-5xl flex-wrap gap-3 px-6 py-8">
        <Button href={`mailto:${site.email}`}>Email me</Button>
        <Button href={site.linkedin} variant="outline">LinkedIn</Button>
        <Button href={site.github} variant="outline">GitHub</Button>
      </div>
      <p className="mx-auto max-w-5xl px-6 text-sm text-muted">
        A contact form with validation and spam protection is added in Phase 8.
      </p>
    </>
  );
}