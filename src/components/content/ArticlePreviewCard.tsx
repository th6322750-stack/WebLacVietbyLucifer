import Image from "next/image";
import Link from "next/link";
import type { ArticlePreview } from "@/content/route-fixtures";
import { assetPath } from "@/lib/assets";
import { formatDate } from "@/lib/format";

/** Decorative related-article preview — see route-fixtures.ts. Links to the general knowledge
 * listing rather than a specific article page (no full article record backs these captions). */
export function ArticlePreviewCard({ preview }: { preview: ArticlePreview }) {
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
