import type { ReactNode } from "react";
import { assetPath } from "@/lib/assets";

export function SectionEyebrow({
  children,
  onDark = false,
}: {
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <p
      className={`text-eyebrow uppercase ${onDark ? "text-gold-300" : "text-gold-700"}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleClassName,
  description,
  onDark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  /** Overrides the H2 type size for sections the design sets smaller than the default scale. */
  titleClassName?: string;
  description?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? <SectionEyebrow onDark={onDark}>{eyebrow}</SectionEyebrow> : null}
      <h2
        className={`mt-3 ${titleClassName ?? "text-h2-mobile lg:text-h2-desktop"} ${
          onDark ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-editorial text-body-lg ${
            align === "center" ? "mx-auto" : ""
          } ${onDark ? "text-white/75" : "text-text-secondary"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Section ornament using the approved `gold-divider` vector (ASSET_USAGE_MAP shared.decorative).
 * Kept as a semantic <hr>; the asset is drawn as a centered background so it degrades to a plain
 * rule if the image is unavailable. Not auto-inserted into any approved layout — the master does
 * not show a divider at a verifiable placement, and adding one would be a redesign. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <hr
      className={`h-2 border-0 bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${assetPath("gold-divider")})` }}
    />
  );
}
