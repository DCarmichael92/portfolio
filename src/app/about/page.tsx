// About page with personal section, hobby image grid, and travel chips.
import hobbies from "@/data/hobbies.json";
import travel from "@/data/travel.json";
import { HobbyCard } from "@/components/HobbyCard";

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">About</h1>

      {/* Personal section */}
      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-medium">A bit about me</h2>
          <ul className="mt-3 space-y-2 text-gray-200 text-sm">
            <li>Married for 2 years.</li>
            <li>We have <strong>2 cats</strong> and not a single regret.</li>
            <li>“Best uncle in the world” — according to my nieces.</li>
            <li>I love trying new restaurants and a good <strong>happy hour margarita</strong>.</li>
          </ul>

          <h3 className="mt-6 text-sm font-medium text-gray-300">Where I’m based</h3>
          <p className="text-sm text-gray-400">Washington, D.C • Open to Cloud / Software / DevSecOps roles</p>

          <div className="mt-6 space-x-4 text-sm">
            <a className="underline" href="mailto:devin.a.carmichael@gmail.com">
              Email
            </a>
            <a
              className="underline"
              href="https://www.linkedin.com/in/devin-carmichael"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="underline"
              href="https://github.com/DCarmichael92"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Travel section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-medium">Places I’ve been</h2>
          <p className="mt-1 text-sm text-gray-400">
            Travel keeps me curious and grounded. A few favorites:
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(travel as string[]).map((loc) => (
              <span
                key={loc}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-200"
              >
                {loc}
              </span>
            ))}
          </div>

          {/* Optional: banner image for travel */}
          <div className="mt-5 overflow-hidden rounded-xl">
            <img
              src="https://source.unsplash.com/featured/1200x400?airplane,window,clouds"
              alt="Travel banner"
              className="h-36 w-full object-cover opacity-90"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Hobby cards */}
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
