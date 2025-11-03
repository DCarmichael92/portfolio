"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

export default function Carousel({
  slides,
  interval = 4000,
  className = "",
  aspect = "16/9",
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
  aspect?: `${number}/${number}` | string;
}) {
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);
  const count = slides.length;

  const go = (next: number) => setI((prev) => (next + count) % count);
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  // autoplay
  useEffect(() => {
    if (count <= 1) return;
    timer.current && window.clearInterval(timer.current);
    timer.current = window.setInterval(next, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, count, interval]);

  // keyboard arrows
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const items = useMemo(() => slides, [slides]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur ${className}`}
      style={{ aspectRatio: aspect }}
      onMouseEnter={() => timer.current && window.clearInterval(timer.current)}
      onMouseLeave={() => (timer.current = window.setInterval(next, interval))}
    >
      {items.map((s, idx) => (
        <div
          key={idx}
          aria-hidden={idx !== i}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* controls */}
      {count > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1 text-white hover:bg-black/60"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1 text-white hover:bg-black/60"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {items.map((_, idx) => (
              <span
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => go(idx)}
                className={`h-2 w-2 cursor-pointer rounded-full ${
                  idx === i ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
