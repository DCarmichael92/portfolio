"use client";

import { useEffect } from "react";
import Image from "next/image";

export function Lightbox({
  open,
  onClose,
  title,
  images,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}) {
  // if no images, don’t render a lightbox
  if (!open || !images?.length) return null;

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur p-4 overflow-y-auto"
      onClick={onClose}
      aria-modal
      role="dialog"
    >
      <div className="mx-auto max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="rounded border border-white/20 px-3 py-1 text-sm hover:bg-white/10" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, i) => (
            <div key={i} className="relative h-56 overflow-hidden rounded-xl">
              <Image src={src} alt={`${title} ${i + 1}`} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
