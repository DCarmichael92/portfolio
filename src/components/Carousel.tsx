"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

export default function Carousel({
  slides,
  interval = 4000,
  className = "",
  heightClass = "h-56 md:h-72 lg:h-80", // smaller default
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
  /** Tailwind height classes applied to the container */
  heightClass?: string;
}) {
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);
  const count = slides.length;

  const go = (next: number) => setI((prev) => (next + count) % count);
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  useEffect(() => {
    if (count <= 1) return;
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(next, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, count, interval]);

  if (!slides?.length) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur ${heightClass} ${className}`}
      onMouseEnter={() => timer.current && window.clearInterval(timer.current!)}
      onMouseLeave={() => (timer.current = window.setInterval(next, interval))}
    >
      {/* Slides */}
      {slides.map((s, idx) => (
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

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1 text-white hover:bg-black/60"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1 text-white hover:bg-black/60"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => go(idx)}
                className={`h-1.5 w-1.5 cursor-pointer rounded-full ${
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
