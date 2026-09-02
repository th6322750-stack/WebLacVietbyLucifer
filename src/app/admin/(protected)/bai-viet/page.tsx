import type { Metadata } from "next";
import { listArticles } from "@/lib/db/repositories/articles";
import { ArticleManager } from "./ArticleManager"; export const metadata: Metadata = { title: "Bài viết" };
export const dynamic = "force-dynamic";
export default async function AdminArticlesPage() {
  return <ArticleManager initial={await listArticles({ includeUnpublished: true })} />;
}
