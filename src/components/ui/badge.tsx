import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const styles =
    variant === "outline"
      ? "border border-white/20 text-white/90"
      : "bg-white/10 border border-white/10 text-white";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs",
        styles,
        className
      )}
      {...props}
    />
  );
}
