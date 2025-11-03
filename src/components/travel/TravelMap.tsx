"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import placesData from "@/data/travel-places.json";
import { Lightbox } from "./Lightbox";

/** Equirectangular projection (lat, lng) -> (x,y) */
function project(lat: number, lng: number, w: number, h: number) {
  // Clamp latitude to avoid NaN
  const clampedLat = Math.max(-89.999, Math.min(89.999, lat));
  const x = ((lng + 180) / 360) * w;
  const y = ((90 - clampedLat) / 180) * h;
  return { x, y };
}

type Place = {
  slug: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  year: number;
  visits: number;
  images: string[];
  notes?: string;
};

export function TravelMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1200, h: 600 });
  const [active, setActive] = useState<Place | null>(null);
  const places = useMemo(() => placesData as Place[], []);

  // Keep a 2:1 aspect ratio responsive to width
  useEffect(() => {
    function update() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width || 1200;
      setSize({ w, h: Math.round(w / 2) });
    }
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60"
        style={{ height: size.h }}
        aria-label="World map with visited locations"
      >
        {/* SVG background (your uploaded map) */}
        <img
          src="/maps/world-map.svg"
          alt="World map"
          className="absolute inset-0 h-full w-full object-contain md:object-cover opacity-95"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Optional subtle glow overlay for cloud vibe */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-[10%] h-[60%] w-[40%] rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute right-[10%] top-[5%] h-[50%] w-[35%] rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute left-[30%] bottom-[5%] h-[55%] w-[45%] rounded-full bg-indigo-400/10 blur-3xl" />
        </div>

        {/* Pins */}
        {places.map((p) => {
          const { x, y } = project(p.lat, p.lng, size.w, size.h);
          const hasImgs = Array.isArray(p.images) && p.images.length > 0;
          return (
            <button
              key={p.slug}
              title={`${p.name}${hasImgs ? ` (${p.visits}×)` : ""}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
              onClick={() => hasImgs && setActive(p)}
              aria-disabled={!hasImgs}
            >
              <span
                className={`inline-block h-3 w-3 rounded-full ring-2 shadow ${
                  hasImgs ? "bg-emerald-400 ring-emerald-200/40" : "bg-gray-500 ring-gray-300/30"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox only when we have images */}
      <Lightbox
        open={!!active && Array.isArray(active.images) && active.images.length > 0}
        onClose={() => setActive(null)}
        title={active ? `${active.name} — ${active.country}` : ""}
        images={active?.images ?? []}
      />
    </>
  );
}
