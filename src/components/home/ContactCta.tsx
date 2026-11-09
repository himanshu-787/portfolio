import Button from "@/components/ui/Button";
import { site } from "@/data/site";

export default function ContactCta() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="rounded-xl border border-line bg-surface p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold sm:text-3xl">Looking for an AI/ML internship</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          I am open to internships and collaborations in machine learning and applied AI.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/contact">Get in touch</Button>
          <Button href={`mailto:${site.email}`} variant="outline">Email me</Button>
        </div>
      </div>
    </section>
  );
}