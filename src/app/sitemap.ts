import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/site-settings";
import { getIndexableArticles } from "@/content/articles";
import { genericServiceSlugs } from "@/content/service-registry";
import { industryShowcase } from "@/content/industry-showcase";
import { supportServiceSlugs } from "@/content/support-services";

// Route tĩnh. `/dich-vu-so` ẩn khỏi MENU nhưng vẫn publish và vẫn có lối vào từ trang chủ và
// hub /dich-vu, nên nó thuộc về sitemap. `/gioi-thieu` được mở lại cùng điều hướng parity và
// trở thành route indexable; các trang chính sách khung vẫn noindex cho tới khi owner duyệt.
const STATIC_ROUTES = [
  "/",
  "/dich-vu",
  "/website",
  "/website/concept",
  "/support-mxh",
  "/dich-vu-so",
  "/kien-thuc",
  "/gioi-thieu",
  "/ho-so-nang-luc",
  "/lien-he",
  "/quy-trinh-lam-viec-tai-maxweb",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteSettings.canonicalOrigin;
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${origin}${path}`,
    lastModified: new Date(),
  }));

  // Dịch vụ dùng template chung. Danh sách lấy từ registry nên một dịch vụ được publish là tự
  // vào sitemap, và một dịch vụ bị gỡ publish (hoặc bị loại theo chính sách) tự rơi ra.
  const serviceEntries = genericServiceSlugs().map((slug) => ({
    url: `${origin}/dich-vu/${slug}`,
    lastModified: new Date(),
  }));

  // Từng nhóm support MXH giờ có trang riêng, mỗi trang trả lời một truy vấn cụ thể ("khôi
  // phục fanpage bị khoá") thay vì dồn hết vào một landing.
  const supportEntries = supportServiceSlugs().map((slug) => ({
    url: `${origin}/support-mxh/${slug}`,
    lastModified: new Date(),
  }));

  // Concept giao diện: đây là nội dung minh hoạ thật sự tồn tại và có ích khi tìm kiếm ("mẫu
  // website nhà hàng"), khác hẳn với các "dự án" cũ vốn là danh tính khách hàng chưa xác minh.
  // Trang chi tiết concept không mang schema Product/Review nào nên không có claim nào để sai.
  const conceptEntries = industryShowcase.map((concept) => ({
    url: `${origin}/website/concept/${concept.slug}`,
    lastModified: new Date(),
  }));

  // `/du-an/*` đã chuyển thành redirect sang concept — không đưa URL redirect vào sitemap.
  const articleEntries = getIndexableArticles().map((a) => ({
    url: `${origin}/kien-thuc/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...supportEntries,
    ...conceptEntries,
    ...articleEntries,
  ];
}
