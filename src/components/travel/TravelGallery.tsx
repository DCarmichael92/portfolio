"use client";

import places from "@/data/travel-places.json";
import { PlaceholderImage } from "@/components/PlaceholderImage";
type Place = (typeof places)[number];

export function TravelGallery() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {(places as Place[]).map((p) => (
        <article
          key={p.slug}
          className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="relative">
            <PlaceholderImage label={p.name} aspect="4/3" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <div className="mt-1 text-xs text-gray-400">
              {p.country} • {p.year} • {p.visits}×
            </div>
            {p.notes && <p className="mt-2 text-sm text-gray-300">{p.notes}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
