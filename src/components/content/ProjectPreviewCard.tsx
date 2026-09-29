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
  mobileRow?: boolean;
}) {
  if (mobileRow) {
    return (
      <Link
        href="/website"
        data-demo-only={preview.demoOnly}
        data-cursor-text="Xem dự án"
        className="group block rounded-xl border border-gold-500/20 bg-white shadow-sm transition-all duration-300 hover:border-gold-500/50 hover:shadow-lg"
      >
        {/* mobile: thumbnail row */}
        <span className="flex items-center gap-3 p-3 sm:hidden">
          <span className="relative block h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-ivory-100">
            <Image
              src={assetPath(preview.coverAssetId)}
              alt={preview.title}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-caption font-semibold uppercase text-gold-700">{preview.category}</span>
            <span className="mt-0 line-clamp-2 block text-small font-medium text-ink-950">{preview.title}</span>
          </span>
        </span>

        {/* >= sm: the luxury card */}
        <span className="hidden flex-col overflow-hidden sm:flex">
          <span className="relative block aspect-[16/10] w-full overflow-hidden bg-ivory-100">
            <Image
              src={assetPath(preview.coverAssetId)}
              alt={preview.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <span className="flex flex-1 flex-col p-5">
            <span className="text-caption font-semibold uppercase text-gold-700">{preview.category}</span>
            <span className="mt-1 block font-heading text-card-h3-mobile text-ink-950 transition-colors duration-200 group-hover:text-gold-700 lg:text-card-h3-desktop">
              {preview.title}
            </span>
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/website"
      data-demo-only={preview.demoOnly}
      data-cursor-text="Xem dự án"
      className="group flex flex-col overflow-hidden rounded-xl border border-gold-500/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory-100">
        <Image
          src={assetPath(preview.coverAssetId)}
          alt={preview.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-caption font-semibold uppercase text-gold-700">{preview.category}</span>
        <h3 className="mt-1 font-heading text-card-h3-mobile text-ink-950 transition-colors duration-200 group-hover:text-gold-700 lg:text-card-h3-desktop">
          {preview.title}
        </h3>
      </div>
    </Link>
  );
}
