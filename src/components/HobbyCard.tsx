"use client";

import { PlaceholderImage } from "@/components/PlaceholderImage";

type Hobby = { name: string; blurb: string; image?: string };

export function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="relative">
        <PlaceholderImage label={hobby.name || "Image coming"} aspect="4/3" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{hobby.name}</h3>
        <p className="mt-1 text-sm text-gray-300">{hobby.blurb}</p>
      </div>
    </article>
  );
}
