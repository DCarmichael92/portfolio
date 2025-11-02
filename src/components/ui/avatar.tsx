// Zero-dependency Avatar shim to avoid @radix-ui/react-avatar.
// Usage-compatible with shadcn's Avatar, AvatarImage, AvatarFallback.
import * as React from "react";

type DivProps = React.ComponentProps<"div"> & { asChild?: boolean };

export function Avatar({ className = "", style, children, ...props }: DivProps) {
  return (
    <div
      className={`inline-flex h-10 w-10 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

type ImgProps = React.ComponentProps<"img">;
export function AvatarImage({ className = "", alt = "Avatar", ...props }: ImgProps) {
  return (
    <img
      alt={alt}
      className={`h-full w-full object-cover ${className}`}
      loading="lazy"
      {...props}
      onError={(e) => {
        // Hide broken images so fallback shows
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

type FallbackProps = React.ComponentProps<"div">;
export function AvatarFallback({ className = "", children, ...props }: FallbackProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center text-xs text-gray-300 ${className}`}
      {...props}
    >
      {children ?? "?"}
    </div>
  );
}
