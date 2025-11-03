"use client";

import Image from "next/image";

type Hobby = { name: string; blurb: string; image?: string };

export function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      {hobby.image && (
        // Fixed visual size for all cards: 4:3 frame
        <div className="relative" style={{ aspectRatio: "4 / 3" }}>
          {/* object-cover keeps the frame consistent (may crop edges slightly) */}
          <Image
            src={hobby.image}
            alt={hobby.name}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{hobby.name}</h3>
        <p className="mt-1 text-sm text-gray-300">{hobby.blurb}</p>
      </div>
    </article>
  );
}
