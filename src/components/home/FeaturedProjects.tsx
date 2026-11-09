import ProjectCard from "@/components/projects/ProjectCard";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section eyebrow="01 / Work" title="Featured projects">
      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <div className="mt-8">
        <Button href="/projects" variant="outline">All projects</Button>
      </div>
    </Section>
  );
}