// src/app/travel/page.tsx
import Image from "next/image";

const photos: { src: string; alt: string }[] = [
  { src: "/images/travel/me-in-monaco.jpg", alt: "South of France. Take me back!" },
  { src: "/images/travel/nice-france-1.jpg", alt: "The Beach View in Nice was PERFECT" },
  { src: "/images/travel/nice-france-friends.jpeg", alt: "Cheers!" },
  { src: "/images/travel/nice-france-3.jpg", alt: "Taking my drone shots from Afghanistan to France" },
  { src: "/images/travel/nice-france-4.jpg", alt: "Cool Sign in France.. idk" },
  { src: "/images/travel/nice-france-5.jpg", alt: "Cool Street" },
  { src: "/images/travel/monaco-f1-track.jpeg", alt: "Monaco F1 track" },
  { src: "/images/travel/monaco-nikki-beach.webp", alt: "Nikki Beach Monaco" },
  { src: "/images/travel/monaco-friends-1.jpeg", alt: "Monaco with friends" },
  // add more local travel images here…
];

export const metadata = {
  title: "Travel | Devin Carmichael",
  description: "A few snapshots from places I’ve visited.",
};

export default function TravelPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Travel</h1>
      <p className="mt-2 max-w-2xl text-gray-300">
        A few photos from trips that keep me curious and grounded.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <figure
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
          >
            {/* For next/image with fill, wrapper must be relative and sized */}
            <div className="relative" style={{ aspectRatio: "4/3" }}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover"
                priority={i < 2}
              />
            </div>
            <figcaption className="p-3 text-sm text-gray-300">{p.alt}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
