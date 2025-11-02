// Lightweight badge for tech tags and statuses.
import * as React from "react";

export function Badge({ className = "", ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium border-white/15 bg-white/10 " +
        className
      }
      {...props}
    />
  );
}
