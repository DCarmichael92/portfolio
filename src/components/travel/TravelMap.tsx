// src/components/travel/TravelMap.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import placesData from "@/data/travel-places.json";
import { Lightbox } from "./Lightbox";

/** Try to read the viewBox from the SVG file; defaults to 2048x1024 (2:1) */
function parseViewBox(svgText: string) {
  const m = svgText.match(
    /viewBox=["']\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*["']/i
  );
  if (!m) return { minX: 0, minY: 0, width: 2048, height: 1024 };
  const [, a, b, c, d] = m;
  const minX = parseFloat(a);
  const minY = parseFloat(b);
  const width = parseFloat(c);
  const height = parseFloat(d);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return { minX: 0, minY: 0, width: 2048, height: 1024 };
  }
  return { minX, minY, width, height };
}

/**
 * Equirectangular (Plate Carrée) projection.
 * We include a calibration window so you can nudge alignment if your SVG
 * has padding/margins or isn’t exactly -180..180 / -90..90.
 */
function projector({
  width,
  height,
  lonMin = -180,
  lonMax = 180,
  latMin = -90,
  latMax = 90,
  dx = 0,
  dy = 0,
}: {
  width: number;
  height: number;
  lonMin?: number;
  lonMax?: number;
  latMin?: number;
  latMax?: number;
  dx?: number; // extra pixel offset X
  dy?: number; // extra pixel offset Y
}) {
  const lonSpan = lonMax - lonMin;
  const latSpan = latMax - latMin;
  return (lat: number, lon: number) => {
    const x = ((lon - lonMin) / lonSpan) * width + dx;
    const y = ((latMax - lat) / latSpan) * height + dy;
    return { x, y };
  };
}

type Place = {
  slug: string;
  name: string;
  country: string;
  lat: number; // latitude  -90..90
  lng: number; // longitude -180..180
  year: number;
  visits: number;
  images: string[];
  notes?: string;
};

export function TravelMap() {
  const [vb, setVb] = useState<{ minX: number; minY: number; width: number; height: number }>({
    minX: 0,
    minY: 0,
    width: 2048,
    height: 1024,
  });
  const [svgReady, setSvgReady] = useState(false);
  const [active, setActive] = useState<Place | null>(null);
  const places = useMemo(() => placesData as Place[], []);

  // 1) Read the SVG viewBox so our pins share the exact same coordinate space
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/maps/world-map.svg");
        const text = await res.text();
        if (cancelled) return;
        const parsed = parseViewBox(text);
        setVb(parsed);
        setSvgReady(true);
      } catch {
        // use defaults
        setSvgReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) Calibration: tweak if any region looks slightly off on your SVG.
  // Most maps won't need changes. If Europe or the poles look shifted,
  // adjust lonMin/lonMax/latMin/latMax or add dx/dy (in pixels).
  const calibration = {
    lonMin: -180,
    lonMax: 180,
    latMin: -90,
    latMax: 90,
    dx: 0,
    dy: 0,
  };

  const project = projector({
    width: vb.width,
    height: vb.height,
    ...calibration,
  });

  // 3) Visual constants
  const oceanTop = "#0b1220";
  const oceanBottom = "#0a0f1a";

  return (
    <>
      {/* Responsive wrapper preserves aspect ratio based on the map viewBox */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10">
        <div className="relative" style={{ aspectRatio: `${vb.width}/${vb.height}` }}>
          <svg
            viewBox={`${vb.minX} ${vb.minY} ${vb.width} ${vb.height}`}
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="World map with visited locations"
          >
            <defs>
              {/* Ocean gradient */}
              <linearGradient id="ocean-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={oceanTop} />
                <stop offset="100%" stopColor={oceanBottom} />
              </linearGradient>

              {/* Graticule pattern (lat/lon lines) */}
              <pattern
                id="graticule"
                patternUnits="userSpaceOnUse"
                width={vb.width / 12}
                height={vb.height / 6}
              >
                <path
                  d={`M ${vb.width / 12} 0 V ${vb.height}`}
                  stroke="#9ca3af"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
                <path
                  d={`M 0 ${vb.height / 6} H ${vb.width}`}
                  stroke="#9ca3af"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* Ocean + subtle graticule */}
            <rect
              x={vb.minX}
              y={vb.minY}
              width={vb.width}
              height={vb.height}
              fill="url(#ocean-grad)"
            />
            <rect
              x={vb.minX}
              y={vb.minY}
              width={vb.width}
              height={vb.height}
              fill="url(#graticule)"
            />

            {/* Your uploaded map drawn as an <image> so we keep its original vector styling */}
            {svgReady && (
              <image
                href="/maps/world-map.svg"
                x={vb.minX}
                y={vb.minY}
                width={vb.width}
                height={vb.height}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  // Gentle clarity boost so coasts/lines pop over the ocean
                  filter:
                    "contrast(1.2) brightness(1.12) saturate(1.05) drop-shadow(0 0 1.5px rgba(255,255,255,0.2))",
                }}
              />
            )}

            {/* Pins */}
            <g>
              {places.map((p) => {
                const { x, y } = project(p.lat, p.lng);
                const hasImgs = Array.isArray(p.images) && p.images.length > 0;

                return (
                  <g key={p.slug} transform={`translate(${x}, ${y})`}>
                    {/* Clickable area */}
                    <a
                      onClick={() => hasImgs && setActive(p)}
                      style={{ cursor: hasImgs ? "pointer" : "default" }}
                    >
                      {/* outer ring */}
                      <circle
                        r={5}
                        fill={hasImgs ? "#34d399" : "#9ca3af"}
                        stroke={hasImgs ? "rgba(167,243,208,0.55)" : "rgba(209,213,219,0.5)"}
                        strokeWidth={3}
                      />
                      {/* center */}
                      <circle r={2} fill="#0b1220" />
                      {/* label (desktop only to reduce clutter) */}
                      <text
                        x={8}
                        y={4}
                        fontSize={12}
                        fill="rgba(255,255,255,0.88)"
                        className="hidden md:inline"
                        style={{ userSelect: "none" }}
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

      {/* Lightbox for photos (only when they exist) */}
      <Lightbox
        open={!!active && Array.isArray(active?.images) && active.images.length > 0}
        onClose={() => setActive(null)}
        title={active ? `${active.name} — ${active.country}` : ""}
        images={active?.images ?? []}
      />
    </>
  );
}
