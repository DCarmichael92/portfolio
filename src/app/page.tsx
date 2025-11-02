// Home page with a "cloud workspace" hero and featured projects.
import projects from "@/data/projects.json";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/ProjectCard";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  const featured = (projects as Project[]).slice(0, 2);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <Hero />

      <section className="mt-10">
        <h2 className="text-2xl font-medium">Featured Work</h2>
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
