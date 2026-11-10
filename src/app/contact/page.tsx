import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/contact/ContactForm";
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
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="max-w-xl">
          <ContactForm />
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href={`mailto:${site.email}`} variant="outline">Email directly</Button>
          <Button href={site.linkedin} variant="outline">LinkedIn</Button>
          <Button href={site.github} variant="outline">GitHub</Button>
        </div>
      </div>
    </>
  );
}