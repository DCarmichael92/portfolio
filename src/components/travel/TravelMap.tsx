// src/components/travel/TravelMap.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import placesData from "@/data/travel-places.json";
import { Lightbox } from "./Lightbox";

/** Parse the viewBox from an SVG string (e.g., "0 0 2000 1000") */
function parseViewBox(svgText: string) {
  const m = svgText.match(/viewBox=["']\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*["']/i);
  if (!m) return { minX: 0, minY: 0, width: 2000, height: 1000 }; // fallback 2:1
  const [, minX, minY, width, height] = m.map(Number) as unknown as [string, number, number, number, number];
  return { minX, minY, width, height };
}

/** Equirectangular (Plate Carrée) projection using the SVG viewBox width/height */
function project(lat: number, lon: number, width: number, height: number) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
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
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [vb, setVb] = useState<{ minX: number; minY: number; width: number; height: number } | null>(null);
  const [active, setActive] = useState<Place | null>(null);

  const places = useMemo(() => placesData as Place[], []);

  // Load the SVG once (from /public/maps/world-map.svg), parse viewBox
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/maps/world-map.svg");
        const text = await res.text();
        if (cancelled) return;
        setSvgMarkup(text);
        setVb(parseViewBox(text));
      } catch {
        // fallback if fetch fails
        setSvgMarkup(null);
        setVb({ minX: 0, minY: 0, width: 2000, height: 1000 });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const box = vb ?? { minX: 0, minY: 0, width: 2000, height: 1000 };

  return (
    <>
      {/* Responsive wrapper: SVG scales via viewBox, pins stay aligned */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">
        <div className="relative" style={{ aspectRatio: `${box.width}/${box.height}` }}>
          <svg
            viewBox={`${box.minX} ${box.minX} ${box.width} ${box.height}`}
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="World map with visited locations"
          >
            <defs>
              {/* ocean gradient */}
              <linearGradient id="ocean" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#0b1220" />
                <stop offset="100%" stopColor="#0a0f1a" />
              </linearGradient>
              {/* punch-up filter for the embedded SVG map */}
              <filter id="landPunch">
                <feComponentTransfer>
                  <feFuncR type="linear" slope="1.15" />
                  <feFuncG type="linear" slope="1.15" />
                  <feFuncB type="linear" slope="1.15" />
                </feComponentTransfer>
                <feGaussianBlur stdDeviation="0.3" result="blur" />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="blur" />
                </feMerge>
              </filter>
              {/* subtle grid pattern for graticule */}
              <pattern id="graticule" width={box.width / 12} height={box.height / 6} patternUnits="userSpaceOnUse">
                <path d={`M ${box.width / 12} 0 V ${box.height}`} stroke="#9ca3af" strokeOpacity="0.12" strokeWidth="1" />
                <path d={`M 0 ${box.height / 6} H ${box.width}`} stroke="#9ca3af" strokeOpacity="0.12" strokeWidth="1" />
              </pattern>
            </defs>

            {/* ocean background */}
            <rect x={box.minX} y={box.minY} width={box.width} height={box.height} fill="url(#ocean)" />

            {/* graticule */}
            <rect x={box.minX} y={box.minY} width={box.width} height={box.height} fill="url(#graticule)" />

            {/* embed your uploaded SVG map as an <image>, full viewBox */}
            {svgMarkup ? (
              <image
                href="/maps/world-map.svg"
                x={box.minX}
                y={box.minY}
                width={box.width}
                height={box.height}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  filter:
                    "contrast(1.25) brightness(1.18) saturate(1.1) drop-shadow(0 0 2px rgba(255,255,255,0.25))",
                }}
              />
            ) : null}

            {/* pins layer */}
            <g>
              {places.map((p) => {
                const hasImgs = Array.isArray(p.images) && p.images.length > 0;
                const { x, y } = project(p.lat, p.lng, box.width, box.height);

                return (
                  <g key={p.slug} transform={`translate(${x}, ${y})`}>
                    {/* clickable hit area */}
                    <a onClick={() => hasImgs && setActive(p)} style={{ cursor: hasImgs ? "pointer" : "default" }}>
                      {/* outer ring */}
                      <circle
                        r={5}
                        fill={hasImgs ? "#34d399" : "#9ca3af"}
                        stroke={hasImgs ? "rgba(167, 243, 208, 0.6)" : "rgba(209, 213, 219, 0.5)"}
                        strokeWidth={3}
                      />
                      {/* center dot */}
                      <circle r={2} fill="#0b1220" />
                      {/* label on large screens */}
                      <text
                        x={8}
                        y={4}
                        fontSize={12}
                        fill="rgba(255,255,255,0.85)"
                        style={{ userSelect: "none" }}
                        className="hidden md:inline"
                      >
                        {p.name}
                      </text>
                    </a>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Lightbox only when we have images */}
      <Lightbox
        open={!!active && Array.isArray(active?.images) && active.images.length > 0}
        onClose={() => setActive(null)}
        title={active ? `${active.name} — ${active.country}` : ""}
        images={active?.images ?? []}
      />
    </>
  );
}
