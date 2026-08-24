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
// Concept đa ngành minh hoạ — cùng nguồn ảnh với /du-an (xem industry-showcase.ts). Đây là
// concept trình bày phong cách thiết kế, không phải dự án đã triển khai cho khách hàng thật.
export const homeProjectShowcase: ProjectPreview[] = [
  { title: "Nội Thất An Lộc", category: "Nội thất", coverAssetId: "du-an-industry-01", demoOnly: true },
  { title: "Trung tâm tiếng Anh EnglishHub", category: "Giáo dục", coverAssetId: "du-an-industry-02", demoOnly: true },
  { title: "Phòng gym IronFit", category: "Thể thao", coverAssetId: "du-an-industry-03", demoOnly: true },
  { title: "Resort Blue Sand", category: "Du lịch", coverAssetId: "du-an-industry-04", demoOnly: true },
  { title: "Công ty luật LexPro", category: "Pháp lý", coverAssetId: "du-an-industry-05", demoOnly: true },
  { title: "Showroom ô tô điện EV Motors", category: "Ô tô", coverAssetId: "du-an-industry-06", demoOnly: true },
  { title: "Nông sản sạch", category: "Nông sản", coverAssetId: "du-an-industry-07", demoOnly: true },
  { title: "Nền tảng tuyển dụng Việc Tốt", category: "Tuyển dụng", coverAssetId: "du-an-industry-08", demoOnly: true },
  { title: "Nhà thông minh SmartHome", category: "Công nghệ", coverAssetId: "du-an-industry-09", demoOnly: true },
  { title: "Bán vé sự kiện Eventix", category: "Sự kiện", coverAssetId: "du-an-industry-10", demoOnly: true },
];

// Home page-03 "Kiến thức mới nhất" row — again a route-specific image set in the master, not
// the /kien-thuc article covers.
export const homeArticleShowcase: ArticlePreview[] = [
  { title: "10 yếu tố SEO quan trọng giúp website lên top Google", publishedAt: "2026-05-15", coverAssetId: "home-article-preview-01", demoOnly: true },
  { title: "Cách bảo mật Facebook hiệu quả tránh bị khóa tài khoản", publishedAt: "2026-05-10", coverAssetId: "home-article-preview-02", demoOnly: true },
  { title: "Kinh nghiệm xây dựng kênh TikTok hiệu quả từ A–Z", publishedAt: "2026-05-08", coverAssetId: "home-article-preview-03", demoOnly: true },
  { title: "Top công cụ AI hữu ích cho doanh nghiệp năm 2024", publishedAt: "2026-05-05", coverAssetId: "home-article-preview-04", demoOnly: true },
];

// Concept đa ngành minh hoạ — cùng nguồn ảnh với /du-an (xem industry-showcase.ts). Đây là
// concept trình bày phong cách thiết kế, không phải dự án đã triển khai cho khách hàng thật.
export const websiteProjectShowcase: ProjectPreview[] = [
  { title: "Nội Thất An Lộc", category: "Nội thất", coverAssetId: "du-an-industry-01", demoOnly: true },
  { title: "Trung tâm tiếng Anh EnglishHub", category: "Giáo dục", coverAssetId: "du-an-industry-02", demoOnly: true },
  { title: "Phòng gym IronFit", category: "Thể thao", coverAssetId: "du-an-industry-03", demoOnly: true },
  { title: "Resort Blue Sand", category: "Du lịch", coverAssetId: "du-an-industry-04", demoOnly: true },
  { title: "Công ty luật LexPro", category: "Pháp lý", coverAssetId: "du-an-industry-05", demoOnly: true },
  { title: "Showroom ô tô điện EV Motors", category: "Ô tô", coverAssetId: "du-an-industry-06", demoOnly: true },
  { title: "Nông sản sạch", category: "Nông sản", coverAssetId: "du-an-industry-07", demoOnly: true },
  { title: "Nền tảng tuyển dụng Việc Tốt", category: "Tuyển dụng", coverAssetId: "du-an-industry-08", demoOnly: true },
  { title: "Nhà thông minh SmartHome", category: "Công nghệ", coverAssetId: "du-an-industry-09", demoOnly: true },
  { title: "Bán vé sự kiện Eventix", category: "Sự kiện", coverAssetId: "du-an-industry-10", demoOnly: true },
  { title: "Nội Thất An Gia", category: "Nội thất", coverAssetId: "du-an-industry-11", demoOnly: true },
  { title: "English Master", category: "Giáo dục", coverAssetId: "du-an-industry-12", demoOnly: true },
  { title: "Nha khoa SmileCare", category: "Nha khoa", coverAssetId: "du-an-industry-13", demoOnly: true },
  { title: "Bất động sản Homeland Việt", category: "Bất động sản", coverAssetId: "du-an-industry-14", demoOnly: true },
  { title: "Du lịch GoTravel", category: "Du lịch", coverAssetId: "du-an-industry-15", demoOnly: true },
  { title: "Phòng khám MediCare Plus", category: "Y tế", coverAssetId: "du-an-industry-16", demoOnly: true },
  { title: "TechZone Công nghệ", category: "Công nghệ", coverAssetId: "du-an-industry-17", demoOnly: true },
  { title: "Nhà hàng Food House", category: "Nhà hàng", coverAssetId: "du-an-industry-18", demoOnly: true },
  { title: "Bella Spa", category: "Làm đẹp", coverAssetId: "du-an-industry-19", demoOnly: true },
  { title: "Eventix Sự kiện", category: "Sự kiện", coverAssetId: "du-an-industry-20", demoOnly: true },
  { title: "TechNext Doanh nghiệp công nghệ", category: "Công nghệ", coverAssetId: "du-an-industry-21", demoOnly: true },
  { title: "Lunea Thời trang", category: "Thời trang", coverAssetId: "du-an-industry-22", demoOnly: true },
  { title: "Gia An Bất động sản", category: "Bất động sản", coverAssetId: "du-an-industry-23", demoOnly: true },
  { title: "Phòng khám Phúc An", category: "Y tế", coverAssetId: "du-an-industry-24", demoOnly: true },
  { title: "EduPro Giáo dục online", category: "Giáo dục", coverAssetId: "du-an-industry-25", demoOnly: true },
  { title: "Lan Viên Nhà hàng", category: "Nhà hàng", coverAssetId: "du-an-industry-26", demoOnly: true },
  { title: "VietTrip Du lịch", category: "Du lịch", coverAssetId: "du-an-industry-27", demoOnly: true },
  { title: "PowerZone Fitness Gym", category: "Thể thao", coverAssetId: "du-an-industry-28", demoOnly: true },
  { title: "Minh Trí Luật pháp", category: "Pháp lý", coverAssetId: "du-an-industry-29", demoOnly: true },
  { title: "Lumiere Spa Làm đẹp", category: "Làm đẹp", coverAssetId: "du-an-industry-30", demoOnly: true },
];

// ASSET_USAGE_MAP.json "/du-an/[slug]".relatedProjects — deterministic preview set, not
// derived from the current project's category (GD10 re-QA round 3 item 7).
// Dự án mẫu đã xoá theo yêu cầu — mảng để trống cho tới khi có dự án thật.
export const relatedProjectPreview: ProjectPreview[] = [];

// ASSET_USAGE_MAP.json "/kien-thuc/[slug]".relatedArticles — approved page-11 visible labels,
// rendered as static preview cards (GD10 re-QA round 3 item 6): "do not require three
// additional full article records."
// `demoOnly` is required and pinned to literal `true` for the same reason as ProjectPreview
// above. Round 4 left these untagged pending a scope decision; ChatGPT re-QA round 5 (R5-01)
// resolved it: tag the article previews AND the main Article dataset in one consistent pass.
export type ArticlePreview = { title: string; publishedAt: string; coverAssetId: string; demoOnly: true };

export const seoArticleRelatedPreview: ArticlePreview[] = [
  { title: "Cách tối ưu tốc độ website đúng cách", publishedAt: "2026-06-10", coverAssetId: "article-cover-01", demoOnly: true },
  { title: "Checklist SEO Onpage cho người mới bắt đầu", publishedAt: "2026-06-06", coverAssetId: "article-cover-02", demoOnly: true },
  { title: "Google Core Update là gì và ảnh hưởng thế nào?", publishedAt: "2026-06-01", coverAssetId: "article-cover-03", demoOnly: true },
];
