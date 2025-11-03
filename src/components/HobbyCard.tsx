"use client";
import Image from "next/image";

type Hobby = { name: string; blurb: string; image?: string };

export function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      {hobby.image && (
        <div className="p-0">
          <Image
            src={hobby.image}
            alt={hobby.name}
            width={800}          // explicit size avoids layout issues
            height={600}
            className="h-auto w-full object-cover" // scales nicely
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
