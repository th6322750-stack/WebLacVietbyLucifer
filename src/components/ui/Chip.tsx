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
        active
          ? "border-gold-500 bg-ink-950 text-white"
          : "border-border text-text-secondary hover:border-gold-300 hover:text-text-primary"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
