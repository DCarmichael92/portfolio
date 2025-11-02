"use client";

import { useEffect } from "react";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export function Lightbox({
  open,
  onClose,
  title,
  images
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

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
          <button onClick={onClose} className="rounded border border-white/20 px-3 py-1 text-sm hover:bg-white/10">
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Show placeholders now; when you add real URLs, map them here */}
          {(images?.length ? images : Array.from({ length: 6 }).fill("")).map((_, i) => (
            <PlaceholderImage key={i} label="Image coming" aspect="4/3" />
          ))}
        </div>
      </div>
    </div>
  );
}
