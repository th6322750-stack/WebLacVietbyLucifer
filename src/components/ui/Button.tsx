import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

// TYPOGRAPHY_AUTHORITY defines a single `button` role (14 / 1.2 / 600) regardless of size —
// only the box geometry changes per size, not the label type.
const SIZE_CLASS: Record<Size, string> = {
  sm: "h-10 px-4 text-button",
  md: "h-12 px-6 text-button",
  lg: "h-[52px] px-8 text-button",
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "bg-gold-metallic text-ink-950 font-semibold shadow-sm hover:shadow-md hover:-translate-y-[2px] active:translate-y-0 active:shadow-sm btn-gold-shimmer",
  secondary:
    "bg-ink-950 text-white border border-ink-950 hover:bg-ink-800 hover:-translate-y-[2px] active:translate-y-0",
  outline:
    "border border-ink-900 text-ink-900 hover:bg-ink-950/5 hover:-translate-y-[2px] active:translate-y-0 data-[on-dark=true]:border-gold-500 data-[on-dark=true]:text-gold-300 data-[on-dark=true]:hover:bg-gold-500/10",
  ghost: "text-ink-900 hover:bg-ink-950/5",
};

// PRO V2 (2026-08-25): rounded-sm (10px) → rounded-button (12px, brief's "10-14, không pill
// toàn bộ") and lift bumped 1px→2px on every variant but ghost (ghost stays flat — a lift on a
// borderless text link reads as a glitch, not affordance). duration-normal (240ms) sits inside
// the brief's 250-400ms hover-transition band.
const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-body transition-[transform,box-shadow,background-color] duration-normal ease-standard min-h-touch min-w-touch disabled:opacity-48 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    onDark = false,
    className = "",
    children,
    ...rest
  } = props;
  const cls = `${base} ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <Link href={href} className={cls} data-on-dark={onDark} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cls}
      data-on-dark={onDark}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
