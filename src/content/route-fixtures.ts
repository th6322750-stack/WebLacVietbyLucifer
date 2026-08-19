// Route-specific decorative preview fixtures — GD10 re-QA round 3 items 3 & 4.
//
// The approved master reuses the same 4 raster covers (project-cover-01..04) across multiple
// mockup pages with different, page-specific captions (home page-03 vs. website page-04) that
// don't match any single canonical project identity 1:1. ChatGPT's re-QA explicitly authorized
// these as standalone "preview fixtures" — no new assets required, no full Project records
// needed. They link to the general /du-an listing rather than a specific project detail page,
// since no single project entity matches a fixture's caption at every page it appears on.
// `demoOnly` is required and pinned to the literal `true`: every one of these captions is a
// GĐ1 project/company mockup, which CONTENT_TRUTH.json requires be "tag[ged] in data as
// demoOnly=true". Typing it as `true` rather than `boolean` makes it impossible to add a
// preview fixture that silently claims to be a verified client (GD10 re-QA round 4, R4-02).
// The approved master's preview cards carry no demo badge (verified against page-03/page-04 at
// 14x zoom), so this stays a data/markup-level tag and does not change the card visual.
export type ProjectPreview = { title: string; category: string; coverAssetId: string; demoOnly: true };

// Home page-03 "Một số dự án tiêu biểu" labels.
//
// RECOVERY V2: these use `home-project-preview-01..04`, NOT `project-cover-01..04`. The
// recovery authority is explicit that Home's preview row is a route-specific image set in the
// approved master and only looked like the /du-an grid because the old mapping borrowed those
// covers (VISUAL_RECOVERY_AUTHORITY_V2.supersedes).
export const homeProjectShowcase: ProjectPreview[] = [
  { title: "Website Bất Động Sản", category: "Bất động sản", coverAssetId: "home-project-preview-01", demoOnly: true },
  { title: "Website Nội Thất", category: "Nội thất", coverAssetId: "home-project-preview-02", demoOnly: true },
  { title: "Website Giáo Dục", category: "Giáo dục", coverAssetId: "home-project-preview-03", demoOnly: true },
  { title: "Landing Page Dịch Vụ", category: "Landing Page", coverAssetId: "home-project-preview-04", demoOnly: true },
];

// Home page-03 "Kiến thức mới nhất" row — again a route-specific image set in the master, not
// the /kien-thuc article covers.
export const homeArticleShowcase: ArticlePreview[] = [
  { title: "10 yếu tố SEO quan trọng giúp website lên top Google", publishedAt: "2024-05-15", coverAssetId: "home-article-preview-01", demoOnly: true },
  { title: "Cách bảo mật Facebook hiệu quả tránh bị khóa tài khoản", publishedAt: "2024-05-10", coverAssetId: "home-article-preview-02", demoOnly: true },
  { title: "Kinh nghiệm xây dựng kênh TikTok hiệu quả từ A–Z", publishedAt: "2024-05-08", coverAssetId: "home-article-preview-03", demoOnly: true },
  { title: "Top công cụ AI hữu ích cho doanh nghiệp năm 2024", publishedAt: "2024-05-05", coverAssetId: "home-article-preview-04", demoOnly: true },
];

// /website page-04 "Một số website chúng tôi đã thực hiện" labels.
// RECOVERY V2: route-specific `website-project-preview-01..04`.
export const websiteProjectShowcase: ProjectPreview[] = [
  { title: "An Phát Real Estate", category: "Website Bất động sản", coverAssetId: "website-project-preview-01", demoOnly: true },
  { title: "GreenMart Vietnam", category: "Website Bán hàng", coverAssetId: "website-project-preview-02", demoOnly: true },
  { title: "Isuu Education", category: "Website Giáo dục", coverAssetId: "website-project-preview-03", demoOnly: true },
  { title: "Dr. Wellness Clinic", category: "Website Y tế", coverAssetId: "website-project-preview-04", demoOnly: true },
];

// ASSET_USAGE_MAP.json "/du-an/[slug]".relatedProjects — deterministic preview set, not
// derived from the current project's category (GD10 re-QA round 3 item 7).
export const relatedProjectPreview: ProjectPreview[] = [
  { title: "Website Bất Động Sản The Maison", category: "Website", coverAssetId: "project-cover-01", demoOnly: true },
  { title: "Chiến dịch Social Media Chuỗi Cafe LUMI", category: "Social", coverAssetId: "project-cover-02", demoOnly: true },
  { title: "Digital Marketing Nha Khoa Việt Smile", category: "Digital Services", coverAssetId: "project-cover-03", demoOnly: true },
  { title: "Landing Page Khoá học Master UX", category: "Landing Page", coverAssetId: "project-cover-04", demoOnly: true },
];

// ASSET_USAGE_MAP.json "/kien-thuc/[slug]".relatedArticles — approved page-11 visible labels,
// rendered as static preview cards (GD10 re-QA round 3 item 6): "do not require three
// additional full article records."
// `demoOnly` is required and pinned to literal `true` for the same reason as ProjectPreview
// above. Round 4 left these untagged pending a scope decision; ChatGPT re-QA round 5 (R5-01)
// resolved it: tag the article previews AND the main Article dataset in one consistent pass.
export type ArticlePreview = { title: string; publishedAt: string; coverAssetId: string; demoOnly: true };

export const seoArticleRelatedPreview: ArticlePreview[] = [
  { title: "Cách tối ưu tốc độ website đúng cách", publishedAt: "2024-06-10", coverAssetId: "article-cover-01", demoOnly: true },
  { title: "Checklist SEO Onpage cho người mới bắt đầu", publishedAt: "2024-06-06", coverAssetId: "article-cover-02", demoOnly: true },
  { title: "Google Core Update là gì và ảnh hưởng thế nào?", publishedAt: "2024-06-01", coverAssetId: "article-cover-03", demoOnly: true },
];
