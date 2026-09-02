import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";

export function IconButton({
  icon,
  label,
  onDark = false,
  className = "",
  ...rest
}: {
  icon: IconName;
  label: string;
  onDark?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={label}
      className={`inline-flex min-h-touch min-w-touch items-center justify-center rounded-sm transition-colors duration-fast ease-standard ${
        onDark
          ? "text-white hover:bg-white/10"
          : "text-ink-900 hover:bg-ink-950/5"
      } ${className}`}
      {...rest}
    >
      <Icon name={icon} size="default" />
    </button>
  );
}
