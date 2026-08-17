import Image from "next/image";
import Link from "next/link";
import type { ProjectPreview } from "@/content/route-fixtures";
import { assetPath } from "@/lib/assets";

/** Decorative route-specific preview card — see route-fixtures.ts. Links to the general
 * listing rather than a specific project detail page, since the caption is page-specific and
 * doesn't map 1:1 to any single project identity at every page it appears on. */
export function ProjectPreviewCard({ preview }: { preview: ProjectPreview }) {
  return (
    <Link
      href="/du-an"
      // Demo state is carried in data/markup, not as a badge: the approved page-03/page-04
      // preview cards show no badge, and re-QA round 4 (R4-02) required tagging without
      // redesigning the card.
      data-demo-only={preview.demoOnly}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-fast ease-standard hover:-translate-y-[3px] hover:border-gold-300 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory-100">
        <Image
          src={assetPath(preview.coverAssetId)}
          alt={preview.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-normal ease-standard group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-caption uppercase text-gold-700">{preview.category}</span>
        <h3 className="mt-1 text-h4-mobile text-ink-950">{preview.title}</h3>
      </div>
    </Link>
  );
}
