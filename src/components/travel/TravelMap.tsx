"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { project } from "./utils";
import placesData from "@/data/travel-places.json";
import { Lightbox } from "./Lightbox";

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

  useEffect(() => {
    function update() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width || 1200;
      setSize({ w, h: w / 2 });
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
        className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur"
        style={{ height: size.h }}
        aria-label="World map with visited locations"
      >
        {/* simple stylized background */}
        <svg className="absolute inset-0" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`}>
          <rect width="100%" height="100%" fill="#0b0f14" />
          <g stroke="#9ca3af" strokeOpacity="0.15">
            {Array.from({ length: 11 }).map((_, k) => {
              const lon = -150 + k * 30;
              const { x: x1 } = project(80, lon, size.w, size.h);
              const { x: x2 } = project(-80, lon, size.w, size.h);
              return <line key={`m${lon}`} x1={x1} y1={size.h * 0.1} x2={x2} y2={size.h * 0.9} />;
            })}
            {[-60, -30, 0, 30, 60].map((lat) => {
              const { y } = project(lat, 0, size.w, size.h);
              return <line key={`p${lat}`} x1={size.w * 0.05} y1={y} x2={size.w * 0.95} y2={y} />;
            })}
          </g>
        </svg>

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

      {/* Lightbox only if active has images */}
      <Lightbox
        open={!!active && Array.isArray(active.images) && active.images.length > 0}
        onClose={() => setActive(null)}
        title={active ? `${active.name} — ${active.country}` : ""}
        images={active?.images ?? []}
      />
    </>
  );
}
