// src/app/about/page.tsx
import Image from "next/image";
import hobbies from "@/data/hobbies.json";
import travel from "@/data/travel.json";
import { HobbyCard } from "@/components/HobbyCard";
import Carousel from "@/components/Carousel";

export default function AboutPage() {
  const slides = [
    { src: "/images/hobbies/golf-course.jpeg", alt: "Scenic golf course" },
    { src: "/images/hobbies/5k-run-medals.jpg", alt: "Rocky Run 5K finisher medals" },
    { src: "/images/cats/2-cats.jpeg", alt: "Two cats relaxing on a bed" },
    { src: "/images/family/happy-hour.jpg", alt: "Dinner by the water" },
    { src: "/images/travel/me-in-monaco.jpg", alt: "Monaco waterfront" },
    { src: "/images/travel/nice-france-1.jpg", alt: "Nice, France coast" },
  ];

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="mt-2 max-w-2xl text-gray-300">
        Golf, running, family time, and travel keep me balanced and curious.
      </p>

      {/* Smaller carousel */}
      <div className="mt-6">
        <Carousel slides={slides} heightClass="h-48 md:h-64 lg:h-72" />
      </div>

      {/* Personal + Travel */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Personal */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-medium">A bit about me</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-200">
            <li>Married for 2 years.</li>
            <li>We have <strong>2 cats</strong> and not a single regret.</li>
            <li>“Best uncle in the world” — according to my nieces.</li>
            <li>I love trying new restaurants and a solid happy hour margarita.</li>
          </ul>

          <h3 className="mt-6 text-sm font-medium text-gray-300">Where I’m based</h3>
          <p className="text-sm text-gray-400">
            Washington, D.C. • Open to Cloud / Software / DevSecOps roles
          </p>

          <div className="mt-6 space-x-4 text-sm">
            <a className="underline" href="mailto:devin.a.carmichael@gmail.com">Email</a>
            <a className="underline" href="https://www.linkedin.com/in/devin-carmichael" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="underline" href="https://github.com/DCarmichael92" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        {/* Travel */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-medium">Places I’ve been</h2>
          <p className="mt-1 text-sm text-gray-400">Travel keeps me curious and grounded. A few favorites:</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(travel as string[]).map((loc) => (
              <span key={loc} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-200">
                {loc}
              </span>
            ))}
          </div>

          {/* Local banner, smaller height */}
          <div className="mt-5 relative h-32 md:h-40 overflow-hidden rounded-xl">
            <Image
              src="/images/travel/nice-france-1.jpg"
              alt="Coastal view in Nice, France"
              width={1600}
              height={533} // ≈ 3:1 aspect
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Hobbies (image only when provided) */}
      <section className="mt-10">
        <h2 className="text-xl font-medium">Hobbies</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(hobbies as { name: string; blurb: string; image?: string }[]).map((h) => (
            <HobbyCard key={h.name} hobby={h} />
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-10">
        <h2 className="text-xl font-medium">Education</h2>
        <p className="mt-2 text-gray-300">
          B.S. in Software Engineering, Western Governors University — expected June 2026
        </p>
      </section>
    </main>
  );
}
