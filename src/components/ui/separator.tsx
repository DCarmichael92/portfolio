import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

/**
 * Zero-dependency Separator shim (replaces @radix-ui/react-separator).
 * - Matches common props (orientation, decorative, className)
 * - Renders an accessible separator role with sensible defaults
 */
export function Separator({
  orientation = "horizontal",
  decorative = false,
  className,
  ...props
}: SeparatorProps) {
  const isVertical = orientation === "vertical";
  return (
    <div
      role="separator"
      aria-orientation={isVertical ? "vertical" : "horizontal"}
      aria-hidden={decorative ? true : undefined}
      className={cn(
        "bg-white/15",
        isVertical ? "mx-2 h-6 w-px" : "my-3 h-px w-full",
        className
      )}
      {...props}
    />
  );
}
