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
      data-cursor-text="Xem chi tiết"
      onClick={() => track({ name: "project_open", props: { projectSlug: project.slug, demoOnly: project.demoOnly } })}
      className="group flex flex-col overflow-hidden rounded-xl border border-gold-500/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory-100">
        {project.heroAssetId ? (
          <Image
            src={assetPath(project.heroAssetId)}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-pill bg-ivory-100 px-2 py-1 text-caption font-medium text-text-secondary">
          {project.category}
        </span>
        <h3 className="mt-2 font-heading text-card-h3-mobile text-ink-950 transition-colors duration-200 group-hover:text-gold-700 lg:text-card-h3-desktop">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-small text-text-secondary">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-gold-700 transition-colors group-hover:text-gold-600">
          Xem chi tiết
          <Icon name="arrow-right" size="inline" className="transition-transform duration-fast ease-standard group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
