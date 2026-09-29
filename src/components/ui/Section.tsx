import type { ReactNode } from "react";
import { assetPath } from "@/lib/assets";

/** MASTER PARITY V4 / P0-SECTION-SPACING.
 *
 * Every section previously used `py-12 md:py-16 xl:py-24`, i.e. 96px top AND 96px bottom at
 * desktop. `placement-map.sectionGap` is a composition interval between sections, not padding
 * on both edges of each one, so the universal value doubled the master's rhythm and inflated
 * every page well beyond the approved height.
 *
 * `density` replaces it with master-derived steps. `normal` is the new default and is
 * deliberately tighter than the old value; `roomy` exists for the few bands the master really
 * does give extra air; `band` is for compact strips (metrics, trust rows); `compact` is
 * unchanged for auxiliary rows. */
const DENSITY_CLASS = {
  compact: "py-6 md:py-8",
  band: "py-8 md:py-10",
  normal: "py-10 md:py-12 xl:py-12",
  roomy: "py-12 md:py-16 xl:py-20",
} as const;

export type SectionDensity = keyof typeof DENSITY_CLASS;

export function Section({
  id,
  tone = "light",
  compact = false,
  density,
  className = "",
  texture = false,
  children,
}: {
  id?: string;
  tone?: "light" | "dark" | "ivory";
  /** Use for auxiliary bands (meta rows, tab nav) that shouldn't take full section spacing. */
  compact?: boolean;
  /** Master-derived vertical rhythm. Defaults to `normal`; `compact` still wins for back-compat. */
  density?: SectionDensity;
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
  const spacingClass = DENSITY_CLASS[compact ? "compact" : (density ?? "normal")];
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
