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

  // Keep a 2:1 aspect responsive
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

  // Build graticule lines every 30 degrees
  const graticule = useMemo(() => {
    const lines: JSX.Element[] = [];
    // Meridians
    for (let lon = -150; lon <= 150; lon += 30) {
      const { x: x1 } = project( 80, lon, size.w, size.h);
      const { x: x2 } = project(-80, lon, size.w, size.h);
      lines.push(
        <line key={`m${lon}`} x1={x1} y1={size.h * 0.1} x2={x2} y2={size.h * 0.9} stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
      );
    }
    // Parallels
    for (let lat = -60; lat <= 60; lat += 30) {
      const { y } = project(lat, 0, size.w, size.h);
      lines.push(
        <line key={`p${lat}`} x1={size.w * 0.05} y1={y} x2={size.w * 0.95} y2={y} stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
      );
    }
    return lines;
  }, [size.w, size.h]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur"
        style={{ height: size.h }}
        aria-label="World map with visited locations"
      >
        {/* Inline SVG map background (stylized graticule + glow) */}
        <svg
          className="absolute inset-0"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="g" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.2)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          {/* base */}
          <rect width="100%" height="100%" fill="#0b0f14" />
          {/* soft cloud glow */}
          <ellipse cx={size.w*0.3} cy={size.h*0.2} rx={size.w*0.4} ry={size.h*0.4} fill="url(#g)" />
          <ellipse cx={size.w*0.8} cy={size.h*0.15} rx={size.w*0.3} ry={size.h*0.3} fill="url(#g)" />
          <ellipse cx={size.w*0.5} cy={size.h*0.8} rx={size.w*0.5} ry={size.h*0.35} fill="url(#g)" />
          {/* graticule */}
          <g stroke="#9ca3af">{graticule}</g>
          {/* title watermark */}
          <text x={16} y={24} fill="#9ca3af" fillOpacity="0.35" fontSize="14">World (equirectangular)</text>
        </svg>

        {/* Pins */}
        {places.map((p) => {
          const { x, y } = project(p.lat, p.lng, size.w, size.h);
          return (
            <button
              key={p.slug}
              title={`${p.name} (${p.visits}×)`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
              onClick={() => setActive(p)}
            >
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-200/40 shadow" />
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 text-xs text-gray-400">Click a green dot to open photos and details.</div>

      {/* Lightbox with placeholders (until you add real URLs) */}
      <Lightbox
        open={!!active}
        onClose={() => setActive(null)}
        title={active ? `${active.name} — ${active.country}` : ""}
        images={[]} // keep empty -> placeholder grid in Lightbox
      />
    </>
  );
}
