import type { ButtonHTMLAttributes } from "react";

export function Chip({
  active = false,
  className = "",
  children,
  ...rest
}: {
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex min-h-touch shrink-0 items-center rounded-pill border px-4 text-chip transition-colors duration-fast ease-standard ${
        // MASTER PARITY V4: the approved filter row is white pills with an active chip filled
        // in brand gold and dark text — not a black active chip.
        active
          ? "border-gold-500 bg-gold-metallic font-semibold text-ink-950"
          : "border-border bg-white text-text-secondary hover:border-gold-300 hover:text-text-primary"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
