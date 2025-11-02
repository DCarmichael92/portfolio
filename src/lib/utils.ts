

// Minimal className joiner (no deps)
export function cn(...parts: Array<string | null | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

