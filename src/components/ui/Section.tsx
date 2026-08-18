import type { ReactNode } from "react";
import { assetPath } from "@/lib/assets";

export function Section({
  id,
  tone = "light",
  compact = false,
  className = "",
  texture = false,
  children,
}: {
  id?: string;
  tone?: "light" | "dark" | "ivory";
  /** Use for auxiliary bands (meta rows, tab nav) that shouldn't take full section spacing. */
  compact?: boolean;
  className?: string;
  /** Applies the approved `gold-noise` vector as a subtle dark-gold texture. Enabled only where
   * ASSET_USAGE_MAP maps it (e.g. /support-mxh dark bands) — never applied site-wide. */
  texture?: boolean;
  children: ReactNode;
}) {
  const toneClass =
    tone === "dark"
      ? "bg-ink-950 text-white"
      : tone === "ivory"
        ? "bg-ivory-100"
        : "bg-ivory-50";
  const spacingClass = compact ? "py-6 md:py-8" : "py-12 md:py-16 xl:py-24";
  return (
    <section id={id} className={`${spacingClass} ${toneClass} ${texture ? "relative" : ""} ${className}`}>
      {texture ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: `url(${assetPath("gold-noise")})`, backgroundRepeat: "repeat" }}
        />
      ) : null}
      {texture ? <div className="relative">{children}</div> : children}
    </section>
  );
}
