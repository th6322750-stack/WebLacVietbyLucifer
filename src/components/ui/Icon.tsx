const SIZE_MAP = {
  inline: 16,
  default: 20,
  card: 24,
  feature: 32,
} as const;

export type IconSize = keyof typeof SIZE_MAP;

// Pinned icon inventory only (.webby/ICON_INVENTORY_PLAN.json). Do not pass an id
// outside that inventory: there is no fallback glyph generation by design.
export type IconName =
  | "menu"
  | "close"
  | "chevron-down"
  | "chevron-right"
  | "arrow-right"
  | "arrow-left"
  | "external-link"
  | "check"
  | "circle-check"
  | "circle-alert"
  | "star"
  | "user"
  | "users"
  | "briefcase"
  | "shield-check"
  | "percent"
  | "globe"
  | "messages-square"
  | "package"
  | "badge-check"
  | "clock"
  | "calendar"
  | "target"
  | "mail"
  | "phone"
  | "map-pin"
  | "send"
  | "monitor-smartphone"
  | "building"
  | "code"
  | "palette"
  | "headset"
  | "shopping-bag"
  | "credit-card"
  | "lightbulb"
  | "search"
  | "filter"
  | "lock-keyhole"
  | "sparkles"
  | "award";

/**
 * Renders a pinned Lucide SVG (public/assets/icons) as a CSS mask so `currentColor`
 * (via Tailwind text-* classes) drives icon color without redrawing/substituting the asset.
 */
export function Icon({
  name,
  size = "default",
  className = "",
}: {
  name: IconName;
  size?: IconSize;
  className?: string;
}) {
  const px = SIZE_MAP[size];
  const url = `/assets/icons/icon-${name}.svg`;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        width: px,
        height: px,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
