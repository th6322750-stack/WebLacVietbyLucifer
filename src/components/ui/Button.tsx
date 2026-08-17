import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-10 px-4 text-small",
  md: "h-12 px-6 text-body",
  lg: "h-[52px] px-8 text-body-lg",
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "bg-gold-metallic text-ink-950 font-semibold shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 active:shadow-sm",
  secondary:
    "bg-ink-950 text-white border border-ink-950 hover:bg-ink-800",
  outline:
    "border border-ink-900 text-ink-900 hover:bg-ink-950/5 data-[on-dark=true]:border-gold-500 data-[on-dark=true]:text-gold-300 data-[on-dark=true]:hover:bg-gold-500/10",
  ghost: "text-ink-900 hover:bg-ink-950/5",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-body transition-[transform,box-shadow,background-color] duration-fast ease-standard min-h-touch min-w-touch disabled:opacity-48 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";

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
