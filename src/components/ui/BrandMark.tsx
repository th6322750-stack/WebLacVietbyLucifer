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
  | "telegram";

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
  return (
    <Image
      src={`/assets/brands/brand-${name}.svg`}
      alt={LABELS[name]}
      width={size}
      height={size}
      className={className}
    />
  );
}
