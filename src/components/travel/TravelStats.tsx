import places from "@/data/travel-places.json";
import { stats } from "./utils";

export function TravelStats() {
  const s = stats(places as { visits: number; name?: string }[]);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="text-sm text-gray-400">Places Visited</div>
        <div className="text-2xl font-semibold">{s.visited}</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="text-sm text-gray-400">Total Trips</div>
        <div className="text-2xl font-semibold">{s.totalVisits}</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="text-sm text-gray-400">Most Visited</div>
        <div className="text-2xl font-semibold">{(s.mostVisited as any)?.name ?? "—"}</div>
      </div>
    </div>
  );
}
