import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProjectExplorer from "@/components/projects/ProjectExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        text="Machine learning, privacy-preserving AI, edge deployment and LLM systems."
      />
      <div className="mx-auto max-w-5xl px-6 py-8">
        <ProjectExplorer projects={projects} />
      </div>
    </>
  );
}