import type { Project } from "@/lib/types";

// Titles/categories transcribed from .webby/visual-master/gd1-v1/pages/page-07.webp (grid) at
// 8x-12x zoom. GD10 re-QA round 3 corrected two transcription errors from round 2 ("Au Phú
// House" -> "An Phú Home", "Trang Canfia" -> "2024 Thời Trang Canifa") and confirmed the grid
// card #1 and the page-07 featured-case-study banner are both "The Maison" — do not unify it
// with the page-10 detail-template project below. Body-copy paragraphs beyond
// title/category/meta remain demo reconstructions (source card body text is below reliable
// legibility even at high zoom); see IMPLEMENTATION_RECEIPT.json confidenceNotes. All entries
// are demoOnly per CONTENT_TRUTH.json — never render as fact.
// Toàn bộ 14 dự án mẫu (demoOnly) đã bị xoá theo yêu cầu — mảng này để trống cho tới khi có dự
// án thật để đăng. KHÔNG chèn ảnh giao diện web của công ty khác (tìm trên Google hay bất kỳ
// nguồn nào) vào đây: một tấm ảnh nằm trong mục "Dự án đã triển khai" là lời khẳng định ngầm
// rằng Lạc Việt đã thực hiện nó — với công ty không phải khách hàng thật, đó là nhận vơ công
// sức người khác, không phải nội dung minh hoạ.
export const projects: Project[] = [];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Grid/filter-visible projects only — excludes detail-template-only fixtures. Deliberately
 * does NOT filter demoOnly: demo projects stay fully visible in the approved UI. Indexability is
 * a separate concern — see getIndexableProjects(). */
export function getVisibleProjects() {
  return projects.filter((p) => !p.hidden);
}

/** Projects eligible for sitemap/indexing: neither a direct-review-only fixture nor unverified
 * demo content. CONTENT_TRUTH.json marks every GĐ1 project name/result as demo unless verified,
 * and SEO_CONTRACT.json forbids demo preview data becoming indexed claims — so demo project
 * detail routes stay routable and visible but are withheld from the sitemap and marked noindex,
 * mirroring getIndexableArticles(). Returns an empty list by design until a project is verified
 * and flipped to demoOnly: false; no code change is needed at that point. */
export function getIndexableProjects() {
  return projects.filter((p) => !p.hidden && !p.demoOnly);
}
