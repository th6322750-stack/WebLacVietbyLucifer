import { articles, getIndexableArticles } from "@/content/articles";
import { industryShowcase } from "@/content/industry-showcase";
import { genericServiceSlugs, findService } from "@/content/service-registry";
import { supportServiceSlugs, findSupportService } from "@/content/support-services";
import { siteSettings } from "@/lib/site-settings";

export type SeoAuditStatus = "pass" | "warning" | "blocked";

export type SeoAuditRow = {
  path: string;
  kind: "page" | "service" | "support" | "concept" | "article";
  title: string;
  description: string;
  indexable: boolean;
  structuredData: string[];
  titleLength: number;
  descriptionLength: number;
  status: SeoAuditStatus;
  issues: string[];
};

export type SeoAuditResult = {
  rows: SeoAuditRow[];
  summary: {
    total: number;
    indexable: number;
    pass: number;
    warnings: number;
    blocked: number;
    noindex: number;
  };
};

const PAGE_DEFINITIONS: Array<{
  path: string;
  title: string;
  description: string;
  structuredData: string[];
}> = [
  {
    path: "/",
    title: `${siteSettings.brandName} — Website, Support MXH & Dịch vụ số`,
    description: "Lạc Việt Media Agency thiết kế website doanh nghiệp, hỗ trợ mạng xã hội và cung cấp dịch vụ số cho doanh nghiệp Việt Nam.",
    structuredData: ["Organization", "WebSite"],
  },
  {
    path: "/dich-vu",
    title: "Dịch vụ Lạc Việt Media | Website, SEO & Support MXH",
    description: "Toàn bộ dịch vụ Lạc Việt Media: thiết kế website, hỗ trợ mạng xã hội và các giải pháp số cho doanh nghiệp.",
    structuredData: ["BreadcrumbList"],
  },
  {
    path: "/website",
    title: "Thiết kế website doanh nghiệp | Lạc Việt Media",
    description: "Thiết kế và phát triển website doanh nghiệp chuyên nghiệp, chuẩn SEO, tối ưu tốc độ và chuyển đổi.",
    structuredData: ["BreadcrumbList"],
  },
  {
    path: "/website/concept",
    title: "Concept giao diện website theo ngành | Lạc Việt Media",
    description: "Bộ concept giao diện website theo từng lĩnh vực — minh hoạ phong cách thiết kế Lạc Việt Media có thể triển khai.",
    structuredData: ["BreadcrumbList"],
  },
  {
    path: "/support-mxh",
    title: "Support mạng xã hội | Lạc Việt Media",
    description: "Hỗ trợ vận hành, khắc phục sự cố và phát triển kênh Facebook, TikTok, YouTube cho doanh nghiệp.",
    structuredData: ["BreadcrumbList"],
  },
  {
    path: "/dich-vu-so",
    title: "Dịch vụ số & tài khoản doanh nghiệp | Lạc Việt Media",
    description: "Cung cấp và hỗ trợ tài khoản, công cụ số: ChatGPT, Microsoft 365, Canva Pro và nhiều nền tảng khác.",
    structuredData: ["BreadcrumbList"],
  },
  {
    path: "/kien-thuc",
    title: "Kiến thức website, SEO & marketing | Lạc Việt Media",
    description: "Bài viết chia sẻ kiến thức về website, mạng xã hội và công cụ số cho doanh nghiệp.",
    structuredData: ["BreadcrumbList"],
  },
  {
    path: "/gioi-thieu",
    title: "Giới thiệu Lạc Việt Media Agency",
    description: `Tìm hiểu về ${siteSettings.brandName} — đối tác số toàn diện cho doanh nghiệp Việt Nam.`,
    structuredData: ["Organization", "BreadcrumbList"],
  },
  {
    path: "/lien-he",
    title: "Liên hệ tư vấn | Lạc Việt Media",
    description: "Liên hệ tư vấn miễn phí với Lạc Việt Media qua Zalo hoặc Telegram để nhận phương án phù hợp.",
    structuredData: ["BreadcrumbList"],
  },
  {
    path: "/quy-trinh-lam-viec-tai-maxweb",
    title: "Quy trình làm việc | Lạc Việt Media",
    description: "Quy trình tiếp nhận, đề xuất, triển khai, kiểm tra và bàn giao của Lạc Việt Media, từ trao đổi đầu tiên đến sau bàn giao.",
    structuredData: ["BreadcrumbList"],
  },
];

function makeRow(input: Omit<SeoAuditRow, "titleLength" | "descriptionLength" | "status" | "issues">): SeoAuditRow {
  const titleLength = input.title.trim().length;
  const descriptionLength = input.description.trim().length;
  const issues: string[] = [];
  if (!input.title.trim()) issues.push("Thiếu SEO title");
  else if (input.indexable && (titleLength < 25 || titleLength > 70)) issues.push(`SEO title ${titleLength} ký tự (khuyến nghị 25–70)`);
  if (!input.description.trim()) issues.push("Thiếu meta description");
  else if (input.indexable && (descriptionLength < 70 || descriptionLength > 170)) issues.push(`Meta description ${descriptionLength} ký tự (khuyến nghị 70–170)`);

  const status: SeoAuditStatus = !input.indexable
    ? "pass"
    : !input.title.trim() || !input.description.trim()
      ? "blocked"
      : issues.length
        ? "warning"
        : "pass";
  return { ...input, titleLength, descriptionLength, status, issues };
}

export function runSeoAudit(): SeoAuditResult {
  const rows: SeoAuditRow[] = PAGE_DEFINITIONS.map((page) => makeRow({ ...page, kind: "page", indexable: true }));

  for (const slug of genericServiceSlugs()) {
    const service = findService(slug);
    if (!service) continue;
    rows.push(makeRow({
      path: `/dich-vu/${service.slug}`,
      kind: "service",
      title: `${service.title} | Lạc Việt Media`,
      description: service.summary,
      indexable: true,
      structuredData: ["BreadcrumbList"],
    }));
  }

  for (const slug of supportServiceSlugs()) {
    const service = findSupportService(slug);
    if (!service) continue;
    rows.push(makeRow({
      path: `/support-mxh/${service.slug}`,
      kind: "support",
      title: `${service.title} | Lạc Việt Media`,
      description: `${service.description} Trao đổi phạm vi rõ ràng, đúng quy trình của nền tảng.`,
      indexable: true,
      structuredData: ["BreadcrumbList"],
    }));
  }

  for (const concept of industryShowcase) {
    rows.push(makeRow({
      path: `/website/concept/${concept.slug}`,
      kind: "concept",
      title: `${concept.title} — Concept website | Lạc Việt Media`,
      description: concept.summary ?? `Concept ${concept.title}: giao diện website ngành ${concept.industry}, minh hoạ phong cách thiết kế, không phải dự án đã triển khai.`,
      indexable: true,
      structuredData: ["BreadcrumbList"],
    }));
  }

  for (const article of articles) {
    const indexable = getIndexableArticles().some((item) => item.slug === article.slug);
    rows.push(makeRow({
      path: `/kien-thuc/${article.slug}`,
      kind: "article",
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      indexable,
      structuredData: indexable ? ["Article", "BreadcrumbList"] : ["BreadcrumbList"],
    }));
  }

  const indexableRows = rows.filter((row) => row.indexable);
  const titleCounts = new Map<string, number>();
  const descriptionCounts = new Map<string, number>();
  for (const row of indexableRows) {
    titleCounts.set(row.title.trim().toLocaleLowerCase(), (titleCounts.get(row.title.trim().toLocaleLowerCase()) ?? 0) + 1);
    descriptionCounts.set(row.description.trim().toLocaleLowerCase(), (descriptionCounts.get(row.description.trim().toLocaleLowerCase()) ?? 0) + 1);
  }
  for (const row of indexableRows) {
    if (row.title && (titleCounts.get(row.title.trim().toLocaleLowerCase()) ?? 0) > 1) row.issues.push("Trùng SEO title với URL khác");
    if (row.description && (descriptionCounts.get(row.description.trim().toLocaleLowerCase()) ?? 0) > 1) row.issues.push("Trùng meta description với URL khác");
    if (row.issues.length && row.status === "pass") row.status = "warning";
  }

  return {
    rows,
    summary: {
      total: rows.length,
      indexable: indexableRows.length,
      pass: rows.filter((row) => row.status === "pass" && row.indexable).length,
      warnings: rows.filter((row) => row.status === "warning").length,
      blocked: rows.filter((row) => row.status === "blocked").length,
      noindex: rows.filter((row) => !row.indexable).length,
    },
  };
}
