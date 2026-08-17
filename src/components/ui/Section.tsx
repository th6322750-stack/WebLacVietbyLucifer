import type { ReactNode } from "react";

export function Section({
  id,
  tone = "light",
  compact = false,
  className = "",
  children,
}: {
  id?: string;
  tone?: "light" | "dark" | "ivory";
  /** Use for auxiliary bands (meta rows, tab nav) that shouldn't take full section spacing. */
  compact?: boolean;
  className?: string;
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
    <section id={id} className={`${spacingClass} ${toneClass} ${className}`}>
      {children}
    </section>
  );
}
