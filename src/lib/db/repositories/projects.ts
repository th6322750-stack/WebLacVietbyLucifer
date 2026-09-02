import { all, one, run, toJson, fromJson, toBool, fromBool } from "../client";
import type { Project } from "@/lib/types";

export type ProjectRow = Project & {
  published: boolean;
  sortOrder: number;
  updatedAt: string;
  /** Live demo the client can click through to. Empty means "no demo yet" and the public card
   * falls back to the Zalo link — see resolveProjectLink(). */
  demoUrl?: string;
};

type DbRow = Record<string, unknown>;

function hydrate(r: DbRow): ProjectRow {
  return {
    slug: String(r.slug),
    title: String(r.title),
    category: String(r.category),
    summary: String(r.summary),
    demoOnly: toBool(r.demo_only),
    heroAssetId: (r.hero_asset_id as string | null) ?? undefined,
    detailVisualAssetId: (r.detail_visual_asset_id as string | null) ?? undefined,
    challenge: (r.challenge as string | null) ?? undefined,
    solution: (r.solution as string | null) ?? undefined,
    results: fromJson<string[] | undefined>(r.results, undefined),
    technology: fromJson<string[] | undefined>(r.technology, undefined),
    galleryAssetIds: fromJson<string[] | undefined>(r.gallery_asset_ids, undefined),
    durationLabel: (r.duration_label as string | null) ?? undefined,
    completedLabel: (r.completed_label as string | null) ?? undefined,
    resultMetrics: fromJson<Project["resultMetrics"]>(r.result_metrics, undefined),
    demoUrl: (r.demo_url as string | null) ?? undefined,
    hidden: toBool(r.hidden),
    published: toBool(r.published),
    sortOrder: Number(r.sort_order),
    updatedAt: String(r.updated_at),
  };
}

export async function listProjects(opts: { includeUnpublished?: boolean } = {}): Promise<ProjectRow[]> {
  const sql =
    "SELECT * FROM projects" +
    (opts.includeUnpublished ? "" : " WHERE published = 1") +
    " ORDER BY sort_order ASC, created_at ASC";
  return (await all<DbRow>(sql)).map(hydrate);
}

export async function getProject(slug: string): Promise<ProjectRow | null> {
  const r = await one<DbRow>("SELECT * FROM projects WHERE slug = ?", [slug]);
  return r ? hydrate(r) : null;
}

export async function upsertProject(p: Partial<ProjectRow> & { slug: string }): Promise<void> {
  const now = new Date().toISOString();
  const existing = await getProject(p.slug);
  const m = { ...(existing ?? {}), ...p } as ProjectRow;

  if (existing) {
    await run(
      `UPDATE projects SET title=?,category=?,summary=?,demo_only=?,hero_asset_id=?,
         detail_visual_asset_id=?,challenge=?,solution=?,results=?,technology=?,
         gallery_asset_ids=?,duration_label=?,completed_label=?,result_metrics=?,
         demo_url=?,hidden=?,published=?,sort_order=?,updated_at=? WHERE slug=?`,
      [
        m.title, m.category, m.summary, fromBool(m.demoOnly), m.heroAssetId ?? null,
        m.detailVisualAssetId ?? null, m.challenge ?? null, m.solution ?? null, toJson(m.results),
        toJson(m.technology), toJson(m.galleryAssetIds), m.durationLabel ?? null,
        m.completedLabel ?? null, toJson(m.resultMetrics), m.demoUrl?.trim() || null,
        fromBool(m.hidden), fromBool(m.published ?? true), m.sortOrder ?? 0, now, p.slug,
      ],
    );
    return;
  }

  await run(
    `INSERT INTO projects (slug,title,category,summary,demo_only,hero_asset_id,
       detail_visual_asset_id,challenge,solution,results,technology,gallery_asset_ids,
       duration_label,completed_label,result_metrics,demo_url,hidden,published,sort_order,
       created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      p.slug, m.title ?? "", m.category ?? "", m.summary ?? "", fromBool(m.demoOnly ?? true),
      m.heroAssetId ?? null, m.detailVisualAssetId ?? null, m.challenge ?? null, m.solution ?? null,
      toJson(m.results), toJson(m.technology), toJson(m.galleryAssetIds), m.durationLabel ?? null,
      m.completedLabel ?? null, toJson(m.resultMetrics), m.demoUrl?.trim() || null,
      fromBool(m.hidden), fromBool(m.published ?? true), m.sortOrder ?? 999, now, now,
    ],
  );
}

export async function deleteProject(slug: string): Promise<boolean> {
  const r = await run("DELETE FROM projects WHERE slug = ?", [slug]);
  return r.changes > 0;
}

export async function reorderProjects(slugs: string[]): Promise<void> {
  await Promise.all(slugs.map((s, i) => run("UPDATE projects SET sort_order = ? WHERE slug = ?", [i, s])));
}

/** Where a project card should send the visitor.
 *
 * A demo URL when the project has one; otherwise a Zalo chat, because sending someone to a
 * dead link is worse than sending them to a conversation. Lucifer's rule: Zalo is the default. */
export function resolveProjectLink(p: { demoUrl?: string }, zalo: string): { href: string; isDemo: boolean } {
  const demo = p.demoUrl?.trim();
  if (demo) return { href: demo, isDemo: true };
  return { href: `https://zalo.me/${zalo}`, isDemo: false };
}
