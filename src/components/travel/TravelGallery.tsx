"use client";

import Image from "next/image";
import places from "@/data/travel-places.json";
type Place = (typeof places)[number];

export function TravelGallery() {
  const list = (places as Place[]) ?? [];
  if (!list.length) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => {
        const hasImg = Array.isArray(p.images) && p.images.length > 0;
        return (
          <article
            key={p.slug}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
          >
            {hasImg && (
              <div className="relative" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className="mt-1 text-xs text-gray-400">
                {p.country} • {p.year} • {p.visits}×
              </div>
              {p.notes && <p className="mt-2 text-sm text-gray-300">{p.notes}</p>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
