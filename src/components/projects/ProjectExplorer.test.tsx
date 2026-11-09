import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProjectExplorer from "./ProjectExplorer";
import type { Project } from "@/data/projects";

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

const sample: Project[] = [
  { slug: "one", title: "Alpha Project", summary: "Uses federated learning.", status: "Completed", year: "2025", tags: ["TensorFlow"], featured: true },
  { slug: "two", title: "Beta Project", summary: "Deep learning on grids.", status: "In progress", year: "2026", tags: ["PyTorch"], featured: false },
];

describe("ProjectExplorer", () => {
  it("shows every project initially", () => {
    render(<ProjectExplorer projects={sample} />);
    expect(screen.getByText("Alpha Project")).toBeInTheDocument();
    expect(screen.getByText("Beta Project")).toBeInTheDocument();
  });

  it("filters by search text", async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={sample} />);
    await user.type(screen.getByLabelText("Search projects"), "federated");
    expect(screen.getByText("Alpha Project")).toBeInTheDocument();
    expect(screen.queryByText("Beta Project")).not.toBeInTheDocument();
  });

  it("filters by tag and can reset", async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={sample} />);
    await user.click(screen.getByRole("button", { name: "PyTorch" }));
    expect(screen.queryByText("Alpha Project")).not.toBeInTheDocument();
    expect(screen.getByText("Beta Project")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("Alpha Project")).toBeInTheDocument();
  });

  it("shows a message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={sample} />);
    await user.type(screen.getByLabelText("Search projects"), "zzzzz");
    expect(screen.getByText("No projects match your search.")).toBeInTheDocument();
  });
});