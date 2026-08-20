import Image from "next/image";
import Link from "next/link";
import type { ProjectPreview } from "@/content/route-fixtures";
import { assetPath } from "@/lib/assets";

/** Decorative route-specific preview card — see route-fixtures.ts. Links to the general
 * listing rather than a specific project detail page, since the caption is page-specific and
 * doesn't map 1:1 to any single project identity at every page it appears on. */
export function ProjectPreviewCard({
  preview,
  mobileRow = false,
}: {
  preview: ProjectPreview;
  /** MASTER PARITY V4: the 390 masters show a compact thumbnail row here, not a full card with
   * a 16:10 image on top — that treatment is what makes the mobile project sections run long. */
  mobileRow?: boolean;
}) {
  if (mobileRow) {
    return (
      <Link
        href="/du-an"
        data-demo-only={preview.demoOnly}
        className="group block rounded-md border border-border bg-white shadow-sm transition-[box-shadow,border-color] duration-fast ease-standard hover:border-gold-300 hover:shadow-md"
      >
        {/* mobile: thumbnail row */}
        <span className="flex items-center gap-3 p-3 sm:hidden">
          <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-sm bg-ivory-100">
            <Image src={assetPath(preview.coverAssetId)} alt={preview.title} fill sizes="80px" className="object-cover" />
          </span>
          <span className="min-w-0">
            <span className="block text-caption uppercase text-gold-700">{preview.category}</span>
            <span className="mt-0.5 line-clamp-2 block text-small font-medium text-ink-950">{preview.title}</span>
          </span>
        </span>

        {/* >= sm: the approved card */}
        <span className="hidden flex-col overflow-hidden sm:flex">
          <span className="relative block aspect-[16/10] w-full overflow-hidden bg-ivory-100">
            <Image
              src={assetPath(preview.coverAssetId)}
              alt={preview.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-normal ease-standard group-hover:scale-[1.02]"
            />
          </span>
          <span className="flex flex-1 flex-col p-5">
            <span className="text-caption uppercase text-gold-700">{preview.category}</span>
            <span className="mt-1 block text-card-h3-mobile lg:text-card-h3-desktop text-ink-950">{preview.title}</span>
          </span>
        </span>
      </Link>
    );
  }

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
        <h3 className="mt-1 text-card-h3-mobile lg:text-card-h3-desktop text-ink-950">{preview.title}</h3>
      </div>
    </Link>
  );
}
