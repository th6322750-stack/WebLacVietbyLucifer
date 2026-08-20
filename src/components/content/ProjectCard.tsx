"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { assetPath } from "@/lib/assets";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/du-an/${project.slug}`}
      data-demo-only={project.demoOnly}
      onClick={() => track({ name: "project_open", props: { projectSlug: project.slug, demoOnly: project.demoOnly } })}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-fast ease-standard hover:-translate-y-[3px] hover:border-gold-300 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory-100">
        {project.heroAssetId ? (
          <Image
            src={assetPath(project.heroAssetId)}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-normal ease-standard group-hover:scale-[1.02]"
          />
        ) : null}
        {/* MASTER PARITY V4: the approved grid card carries NO visible "Dự án mẫu" badge over
            the image. Demo state stays machine-readable via data-demo-only on the link, which is
            what CONTENT_TRUTH asks for ("tag it in data"), without redesigning the card. */}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-pill bg-ivory-100 px-2.5 py-1 text-caption text-text-secondary">
          {project.category}
        </span>
        <h3 className="mt-2 text-card-h3-mobile lg:text-card-h3-desktop text-ink-950">{project.title}</h3>
        <p className="mt-2 flex-1 text-small text-text-secondary">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-gold-700">
          Xem chi tiết
          <Icon name="arrow-right" size="inline" className="transition-transform duration-fast ease-standard group-hover:translate-x-px" />
        </span>
      </div>
    </Link>
  );
}
