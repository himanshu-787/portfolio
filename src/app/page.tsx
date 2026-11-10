import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FocusAreas from "@/components/home/FocusAreas";
import ExperiencePreview from "@/components/home/ExperiencePreview";
import ContactCta from "@/components/home/ContactCta";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          url: site.url,
          description: site.tagline,
          affiliation: { "@type": "CollegeOrUniversity", name: "IIIT Raichur" },
          sameAs: [site.github, site.linkedin],
        }}
      />
      <Hero />
      <FeaturedProjects />
      <FocusAreas />
      <ExperiencePreview />
      <ContactCta />
    </>
  );
}