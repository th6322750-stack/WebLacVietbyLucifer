// Route-specific decorative preview fixtures — GD10 re-QA round 3 items 3 & 4.
//
// The approved master reuses the same 4 raster covers (project-cover-01..04) across multiple
// mockup pages with different, page-specific captions (home page-03 vs. website page-04) that
// don't match any single canonical project identity 1:1. ChatGPT's re-QA explicitly authorized
// these as standalone "preview fixtures" — no new assets required, no full Project records
// needed. They link to the general /du-an listing rather than a specific project detail page,
// since no single project entity matches a fixture's caption at every page it appears on.
export type ProjectPreview = { title: string; category: string; coverAssetId: string };

// Home page-03 "Một số dự án chúng tôi đã thực hiện" labels.
export const homeProjectShowcase: ProjectPreview[] = [
  { title: "Website Bất Động Sản", category: "Bất động sản", coverAssetId: "project-cover-01" },
  { title: "Website Nội Thất", category: "Nội thất", coverAssetId: "project-cover-02" },
  { title: "Website Giáo Dục", category: "Giáo dục", coverAssetId: "project-cover-03" },
  { title: "Landing Page Dịch Vụ", category: "Landing Page", coverAssetId: "project-cover-04" },
];

// /website page-04 "Một số website chúng tôi đã thực hiện" labels.
export const websiteProjectShowcase: ProjectPreview[] = [
  { title: "An Phát Real Estate", category: "Website Bất động sản", coverAssetId: "project-cover-01" },
  { title: "GreenMart Vietnam", category: "Website Bán hàng", coverAssetId: "project-cover-02" },
  { title: "Isuu Education", category: "Website Giáo dục", coverAssetId: "project-cover-03" },
  { title: "Dr. Wellness Clinic", category: "Website Y tế", coverAssetId: "project-cover-04" },
];

// ASSET_USAGE_MAP.json "/du-an/[slug]".relatedProjects — deterministic preview set, not
// derived from the current project's category (GD10 re-QA round 3 item 7).
export const relatedProjectPreview: ProjectPreview[] = [
  { title: "Website Bất Động Sản The Maison", category: "Website", coverAssetId: "project-cover-01" },
  { title: "Chiến dịch Social Media Chuỗi Cafe LUMI", category: "Social", coverAssetId: "project-cover-02" },
  { title: "Digital Marketing Nha Khoa Việt Smile", category: "Digital Services", coverAssetId: "project-cover-03" },
  { title: "Landing Page Khoá học Master UX", category: "Landing Page", coverAssetId: "project-cover-04" },
];

// ASSET_USAGE_MAP.json "/kien-thuc/[slug]".relatedArticles — approved page-11 visible labels,
// rendered as static preview cards (GD10 re-QA round 3 item 6): "do not require three
// additional full article records."
export type ArticlePreview = { title: string; publishedAt: string; coverAssetId: string };

export const seoArticleRelatedPreview: ArticlePreview[] = [
  { title: "Cách tối ưu tốc độ website đúng cách", publishedAt: "2024-06-10", coverAssetId: "article-cover-01" },
  { title: "Checklist SEO Onpage cho người mới bắt đầu", publishedAt: "2024-06-06", coverAssetId: "article-cover-02" },
  { title: "Google Core Update là gì và ảnh hưởng thế nào?", publishedAt: "2024-06-01", coverAssetId: "article-cover-03" },
];
