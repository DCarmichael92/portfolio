"use client"; // Client component because we use React state for filtering.

import projects from "@/data/projects.json";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/ProjectCard";
import { useState } from "react";

const TABS = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "in-progress", label: "In-Progress" },
] as const;

type TabKey = typeof TABS[number]["key"];

export default function ProjectsPage() {
  const [tab, setTab] = useState<TabKey>("all");
  const filtered = (projects as Project[]).filter((p) => (tab === "all" ? true : p.status === tab));

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Projects</h1>

      <div className="mt-6 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`rounded-full border px-3 py-1 text-sm ${
              t.key === tab ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "hover:bg-gray-100 dark:hover:bg-zinc-900"
            }`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </section>
    </main>
  );
}
