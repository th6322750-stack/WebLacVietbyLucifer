import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { assetPath } from "@/lib/assets";

export function TestimonialCard({
  quote,
  name,
  role,
  avatarAssetId,
}: {
  quote: string;
  name: string;
  role: string;
  avatarAssetId: string;
}) {
  return (
    <figure className="flex h-full flex-col rounded-md border border-border bg-white p-6 shadow-sm">
      <div className="flex gap-0.5 text-gold-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size="inline" className="text-gold-500" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-body text-text-secondary">“{quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Image
          src={assetPath(avatarAssetId)}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-small font-semibold text-ink-950">{name}</p>
          <p className="text-caption text-text-muted">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
