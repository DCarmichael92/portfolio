import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost" | "secondary" | "destructive";
type Size = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  default:
    "bg-white/10 text-white hover:bg-white/15 border border-white/15",
  outline:
    "bg-transparent text-white border border-white/20 hover:bg-white/10",
  ghost:
    "bg-transparent text-white hover:bg-white/10 border border-transparent",
  secondary:
    "bg-emerald-600/90 text-white hover:bg-emerald-600 border border-emerald-500/50",
  destructive:
    "bg-rose-600/90 text-white hover:bg-rose-600 border border-rose-500/50",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 rounded-md px-3 text-xs",
  md: "h-10 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-xl px-5 text-base",
  icon: "h-10 w-10 rounded-lg p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex select-none items-center justify-center font-medium transition",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
