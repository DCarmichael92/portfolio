// Experience timeline with vertical axis to feel like a deployment history.
import experience from "@/data/experience.json";
import type { Experience } from "@/types";

export default function ExperiencePage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Experience</h1>
      <ol className="relative mt-10 space-y-10 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-white/15">
        {(experience as Experience[]).map((job) => (
          <li key={`${job.company}-${job.role}`} className="relative pl-10">
            <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            <div className="text-sm text-gray-400">
              {job.start}–{job.end ?? "Present"} • {job.location ?? "Remote"}
            </div>
            <h2 className="mt-1 text-xl font-medium">
              {job.role} — {job.company}
            </h2>
            <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-gray-200">
              {job.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            {job.tech && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-300">
                {job.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </main>
  );
}
