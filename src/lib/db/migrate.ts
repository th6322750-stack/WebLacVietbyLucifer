import { one, run, toJson, fromBool } from "./client";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";
import { services } from "@/content/services";
import { faqs } from "@/content/faqs";

/** Seeds the tables from the existing src/content/*.ts fixtures.
 *
 * ONE-WAY AND NON-DESTRUCTIVE. Rows are written with ON CONFLICT DO NOTHING, so re-running never
 * overwrites an edit made in the admin — an admin edit always wins over the fixture. The .ts
 * files stay in the repo as the reference copy until Lucifer confirms the database is correct;
 * nothing is deleted here.
 *
 * Returns how many rows each table GAINED, so a second run legitimately reports all zeros.
 */
export async function seedFromFixtures(): Promise<Record<string, number>> {
  const now = new Date().toISOString();
  const seeded: Record<string, number> = {};
  const count = async (t: string) => {
    const r = await one<{ n: string }>(`SELECT COUNT(*) AS n FROM ${t}`);
    return Number(r?.n ?? 0);
  };

  const before = {
    projects: await count("projects"),
    articles: await count("articles"),
    services: await count("services"),
    faqs: await count("faqs"),
  };

  for (const [i, r] of projects.entries()) {
    await run(
      `INSERT INTO projects
        (slug,title,category,summary,demo_only,hero_asset_id,detail_visual_asset_id,challenge,
         solution,results,technology,gallery_asset_ids,duration_label,completed_label,
         result_metrics,hidden,published,sort_order,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?,?,?)
       ON CONFLICT (slug) DO NOTHING`,
      [
        r.slug, r.title, r.category, r.summary, fromBool(r.demoOnly), r.heroAssetId ?? null,
        r.detailVisualAssetId ?? null, r.challenge ?? null, r.solution ?? null, toJson(r.results),
        toJson(r.technology), toJson(r.galleryAssetIds), r.durationLabel ?? null,
        r.completedLabel ?? null, toJson(r.resultMetrics), fromBool(r.hidden), i, now, now,
      ],
    );
  }

  for (const [i, r] of articles.entries()) {
    const x = r as typeof r & { coverAssetId?: string; heroAssetId?: string; readMinutes?: number };
    await run(
      `INSERT INTO articles
        (slug,title,category,excerpt,content,published_at,author,demo_only,cover_asset_id,
         hero_asset_id,read_minutes,published,sort_order,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,1,?,?,?)
       ON CONFLICT (slug) DO NOTHING`,
      [
        r.slug, r.title, r.category, r.excerpt, toJson(r.content), r.publishedAt, r.author,
        fromBool(r.demoOnly), x.coverAssetId ?? null, x.heroAssetId ?? null,
        x.readMinutes ?? null, i, now, now,
      ],
    );
  }

  for (const [i, r] of services.entries()) {
    await run(
      `INSERT INTO services
        (slug,category,title,summary,cta_label,href,icon,features,price_mode,price_vnd,
         hero_asset_id,faq_ids,sort_order,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
       ON CONFLICT (slug) DO NOTHING`,
      [
        r.slug, r.category, r.title, r.summary, r.ctaLabel, r.href, r.icon, toJson(r.features),
        r.priceMode ?? null, r.priceVnd ?? null, r.heroAssetId ?? null, toJson(r.faqIds), i, now, now,
      ],
    );
  }

  for (const r of faqs) {
    await run(
      `INSERT INTO faqs (id,scope,question,answer,sort_order,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?)
       ON CONFLICT (id) DO NOTHING`,
      [r.id, r.scope, r.question, r.answer, r.order ?? 0, now, now],
    );
  }

  seeded.projects = (await count("projects")) - before.projects;
  seeded.articles = (await count("articles")) - before.articles;
  seeded.services = (await count("services")) - before.services;
  seeded.faqs = (await count("faqs")) - before.faqs;

  return seeded;
}
