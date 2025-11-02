import certs from "@/data/certifications.json";

export function Certs() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {(certs as { name: string; short?: string }[]).map((c) => (
        <span
          key={c.name}
          className="rounded-full border border-white/15 px-3 py-1 text-xs"
          title={c.name}
        >
          {c.short ? `${c.name} (${c.short})` : c.name}
        </span>
      ))}
    </div>
  );
}
