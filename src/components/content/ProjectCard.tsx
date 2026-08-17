"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { assetPath } from "@/lib/assets";
import { track } from "@/lib/analytics";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/du-an/${project.slug}`}
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
        {project.demoOnly ? (
          <span className="absolute left-3 top-3 rounded-pill bg-ink-950/80 px-2.5 py-1 text-caption uppercase text-white">
            Dự án mẫu
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-caption uppercase text-gold-700">{project.category}</span>
        <h3 className="mt-1.5 text-h4-mobile text-ink-950">{project.title}</h3>
        <p className="mt-2 flex-1 text-small text-text-secondary">{project.summary}</p>
      </div>
    </Link>
  );
}
