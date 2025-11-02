// Simple, styled placeholder block for future images.
// Usage: <PlaceholderImage label="Golf" aspect="4/3" />
export function PlaceholderImage({
  label = "Image coming",
  aspect = "4/3", // e.g., "4/3", "16/9", "1/1"
  className = ""
}: { label?: string; aspect?: `${number}/${number}` | string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 ${className}`}
      style={{ aspectRatio: aspect }}
      aria-label={`${label} placeholder`}
      role="img"
    >
      {/* subtle grid */}
      <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0v24" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#p)" />
      </svg>

      {/* center mark */}
      <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />

      {/* label */}
      <div className="absolute inset-x-0 bottom-0 bg-black/40 p-2 text-center text-xs text-gray-200">
        {label || "Image coming"}
      </div>
    </div>
  );
}
