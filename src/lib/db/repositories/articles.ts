import { all, one, run, toJson, fromJson, toBool, fromBool } from "../client";
import type { Article, ArticleSection } from "@/lib/types";

export type ArticleRow = Article & { published: boolean; sortOrder: number; updatedAt: string };

type DbRow = Record<string, unknown>;

function hydrate(r: DbRow): ArticleRow {
  return {
    slug: String(r.slug),
    title: String(r.title),
    category: String(r.category),
    excerpt: String(r.excerpt),
    content: fromJson<ArticleSection[]>(r.content, []),
    publishedAt: String(r.published_at),
    author: String(r.author),
    demoOnly: toBool(r.demo_only),
    published: toBool(r.published),
    sortOrder: Number(r.sort_order),
    updatedAt: String(r.updated_at),
  } as ArticleRow;
}

export async function listArticles(opts: { includeUnpublished?: boolean } = {}): Promise<ArticleRow[]> {
  const sql =
    "SELECT * FROM articles" +
    (opts.includeUnpublished ? "" : " WHERE published = 1") +
    " ORDER BY sort_order ASC, published_at DESC";
  return (await all<DbRow>(sql)).map(hydrate);
}

export async function getArticle(slug: string): Promise<ArticleRow | null> {
  const r = await one<DbRow>("SELECT * FROM articles WHERE slug = ?", [slug]);
  return r ? hydrate(r) : null;
}

export async function upsertArticle(a: Partial<ArticleRow> & { slug: string }): Promise<void> {
  const now = new Date().toISOString();
  const existing = await getArticle(a.slug);
  const m = { ...(existing ?? {}), ...a } as ArticleRow;

  if (existing) {
    await run(
      `UPDATE articles SET title=?,category=?,excerpt=?,content=?,published_at=?,author=?,
         demo_only=?,published=?,sort_order=?,updated_at=? WHERE slug=?`,
      [
        m.title, m.category, m.excerpt, toJson(m.content), m.publishedAt, m.author,
        fromBool(m.demoOnly), fromBool(m.published ?? true), m.sortOrder ?? 0, now, a.slug,
      ],
    );
    return;
  }

  await run(
    `INSERT INTO articles (slug,title,category,excerpt,content,published_at,author,demo_only,
       published,sort_order,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      a.slug, m.title ?? "", m.category ?? "", m.excerpt ?? "", toJson(m.content ?? []),
      m.publishedAt ?? now.slice(0, 10), m.author ?? "Lạc Việt Media",
      fromBool(m.demoOnly ?? true), fromBool(m.published ?? true), m.sortOrder ?? 999, now, now,
    ],
  );
}

export async function deleteArticle(slug: string): Promise<boolean> {
  const r = await run("DELETE FROM articles WHERE slug = ?", [slug]);
  return r.changes > 0;
}
