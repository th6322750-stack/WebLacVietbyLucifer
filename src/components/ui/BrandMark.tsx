import Image from "next/image";

export type BrandName =
  | "facebook"
  | "tiktok"
  | "meta"
  | "youtube"
  | "openai-chatgpt"
  | "microsoft"
  | "canva"
  | "zalo"
  | "messenger"
  | "telegram"
  | "verified";

const LABELS: Record<BrandName, string> = {
  facebook: "Facebook",
  tiktok: "TikTok",
  meta: "Meta",
  youtube: "YouTube",
  "openai-chatgpt": "ChatGPT",
  microsoft: "Microsoft",
  canva: "Canva",
  zalo: "Zalo",
  messenger: "Messenger",
  telegram: "Telegram",
  verified: "Tài khoản đã xác minh",
};

/** Official brand marks render at native color/shape — never recolored or substituted. */
export function BrandMark({
  name,
  size = 24,
  className = "",
}: {
  name: BrandName;
  size?: number;
  className?: string;
}) {
  // The official marks are NOT all square — measured from their viewBoxes: Facebook is 1:1,
  // TikTok 352x399 (taller), Meta 256x171 (much wider). Passing `size` as both width and height
  // squashed the non-square ones. `object-contain` inside a fixed square box scales each mark to
  // fit and centres it, so every logo keeps its real proportions and they still line up as a set.
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/assets/brands/brand-${name}.svg`}
        alt={LABELS[name]}
        width={size}
        height={size}
        className="max-h-full max-w-full object-contain"
      />
    </span>
  );
}
