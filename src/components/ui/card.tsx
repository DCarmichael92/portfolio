// Minimal Card with a built-in glass style (no @apply needed)
import * as React from "react";

const glass =
  "rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-5";

export function Card({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`${glass} ${className}`} {...props} />;
}

export function CardHeader({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`p-5 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.ComponentProps<"h3">) {
  return <h3 className={`text-lg font-semibold leading-tight ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`p-5 pt-0 ${className}`} {...props} />;
}
