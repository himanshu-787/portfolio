import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FocusAreas from "@/components/home/FocusAreas";
import ExperiencePreview from "@/components/home/ExperiencePreview";
import ContactCta from "@/components/home/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <FocusAreas />
      <ExperiencePreview />
      <ContactCta />
    </>
  );
}