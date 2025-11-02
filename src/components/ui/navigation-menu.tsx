// Zero-dependency shim for shadcn/ui NavigationMenu.
// Exports the same component names so existing imports keep working.
// Behavior: simple responsive nav with hoverable dropdown containers.
// No Radix, no class-variance-authority.

import * as React from "react";
import { cn } from "@/lib/utils";

type DivProps = React.ComponentProps<"div">;
type UlProps = React.ComponentProps<"ul">;
type LiProps = React.ComponentProps<"li">;
type ButtonProps = React.ComponentProps<"button">;
type LinkProps = React.ComponentProps<"a">;

export const NavigationMenu = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      {...props}
    />
  )
);
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = React.forwardRef<HTMLUListElement, UlProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
);
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = React.forwardRef<HTMLLIElement, LiProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("group relative", className)} {...props} />
  )
);
NavigationMenuItem.displayName = "NavigationMenuItem";

export const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-white/15 px-3 py-1.5 text-sm",
        "bg-white/5 hover:bg-white/10 transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        className
      )}
      {...props}
    >
      {children}
      <span aria-hidden className="i inline-block translate-y-px">▾</span>
    </button>
  )
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    // Shown/hidden can be controlled by parent; default to visible-on-hover if placed after Trigger inside a .group
    <div
      ref={ref}
      className={cn(
        "absolute left-0 top-full z-50 mt-2 min-w-[12rem] overflow-hidden rounded-lg",
        "border border-white/15 bg-black/70 backdrop-blur p-2",
        "hidden group-hover:block",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuLink.displayName = "NavigationMenuLink";

// Helper to mimic shadcn API; returns trigger button classes.
export function navigationMenuTriggerStyle(extra?: string) {
  return cn(
    "inline-flex items-center gap-1 rounded-md border border-white/15 px-3 py-1.5 text-sm",
    "bg-white/5 hover:bg-white/10 transition",
    extra
  );
}
