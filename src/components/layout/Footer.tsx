import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <div className="flex gap-5">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a>
          <a href={`mailto:${site.email}`} className="hover:text-fg">Email</a>
        </div>
      </div>
    </footer>
  );
}