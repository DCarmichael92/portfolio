"use client";

import { useState } from "react";
import { TravelMap } from "@/components/travel/TravelMap";
import { TravelGallery } from "@/components/travel/TravelGallery";
import { TravelStats } from "@/components/travel/TravelStats";

const TABS = [
  { key: "map", label: "Map" },
  { key: "gallery", label: "Gallery" },
  { key: "stats", label: "Stats" }
] as const;

type TabKey = typeof TABS[number]["key"];

export default function TravelPage() {
  const [tab, setTab] = useState<TabKey>("map");

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Travel Adventures 🌎✈️</h1>
      <p className="mt-3 max-w-2xl text-gray-300">
        I love exploring new places, tasting new food, and seeing the world from different perspectives.
        Some trips were for fun, others were for service — all of them shaped me.
      </p>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full border px-3 py-1 text-sm ${
              tab === t.key ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "hover:bg-gray-100 dark:hover:bg-zinc-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="mt-8 space-y-6">
        {tab === "map" && <TravelMap />}
        {tab === "gallery" && <TravelGallery />}
        {tab === "stats" && <TravelStats />}
      </section>

      <p className="mt-10 text-center text-sm text-gray-400">
        More places coming soon — passport stays ready.
      </p>
    </main>
  );
}
