import Image from "next/image";
import Link from "next/link";
import type { ArticlePreview } from "@/content/route-fixtures";
import { assetPath } from "@/lib/assets";
import { formatDate } from "@/lib/format";

/** Decorative article preview — see route-fixtures.ts. Links to the general knowledge listing
 * rather than a specific article page (no full article record backs these captions).
 *
 * `rail` is the compact 80x48 thumbnail row used in the /kien-thuc/[slug] sticky rail.
 * `card` is the approved Home "Kiến thức mới nhất" composition: image on top, then title and
 * date, four across on desktop. */
export function ArticlePreviewCard({
  preview,
  variant = "rail",
}: {
  preview: ArticlePreview;
  variant?: "rail" | "card";
}) {
  if (variant === "card") {
    return (
      <Link
        href="/kien-thuc"
        data-demo-only={preview.demoOnly}
        className="group flex flex-col overflow-hidden rounded-md border border-border bg-white shadow-sm"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={assetPath(preview.coverAssetId)}
            alt={preview.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="line-clamp-2 text-card-h3-mobile lg:text-card-h3-desktop font-heading text-ink-950 group-hover:text-gold-700">
            {preview.title}
          </p>
          <p className="mt-auto text-article-meta text-text-muted">{formatDate(preview.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/kien-thuc"
      // See ArticleCard — demo state in markup, no visual badge (R5-01 point 3).
      data-demo-only={preview.demoOnly}
      className="flex items-center gap-3 group"
    >
      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-sm">
        <Image src={assetPath(preview.coverAssetId)} alt={preview.title} fill className="object-cover" />
      </div>
      <div>
        <p className="line-clamp-2 text-small font-medium text-ink-950 group-hover:text-gold-700">{preview.title}</p>
        <p className="text-article-meta text-text-muted">{formatDate(preview.publishedAt)}</p>
      </div>
    </Link>
  );
}
