import type { Service } from "@/lib/types";

// NGUỒN SEED CHO DATABASE, không còn là nguồn hiển thị. Giao diện (trang chủ, hub, menu, footer)
// đọc từ `src/content/service-registry.ts`. File này giữ lại vì `src/lib/db/migrate.ts` dùng nó
// để seed bảng services; khi repository layer thay thế được seed, file này nên biến mất hẳn
// thay vì tồn tại song song như một nguồn sự thật thứ hai.

// Demo pricing per .webby/CONTENT_TRUTH.json — priceMode "contact" until Lucifer verifies
// current production offers; DESIGN_SYSTEM.md 17: do not invent real prices.
export const services: Service[] = [
  {
    slug: "website-doanh-nghiep",
    category: "Website",
    title: "Website doanh nghiệp",
    summary:
      "Thiết kế và phát triển website chuyên nghiệp, chuẩn SEO, tối ưu tốc độ và chuyển đổi cho doanh nghiệp Việt.",
    ctaLabel: "Xem gói Website",
    href: "/website",
    icon: "monitor-smartphone",
    iconImage: "/assets/v5/services/website-doanh-nghiep.webp",
    features: [
      "Thiết kế riêng theo nhận diện thương hiệu",
      "Chuẩn SEO on-page & tốc độ tải trang",
      "Quản trị nội dung dễ dùng",
      "Bảo trì và hỗ trợ kỹ thuật sau bàn giao",
    ],
    priceMode: "contact",
  },
  {
    slug: "support-mang-xa-hoi",
    category: "Support MXH",
    title: "Support mạng xã hội",
    summary:
      "Hỗ trợ vận hành, khắc phục sự cố và phát triển các kênh mạng xã hội Facebook, TikTok, YouTube cho doanh nghiệp.",
    ctaLabel: "Xem dịch vụ Support MXH",
    href: "/support-mxh",
    icon: "messages-square",
    iconImage: "/assets/v5/services/support-mang-xa-hoi.webp",
    features: [
      "Xử lý sự cố tài khoản, trang, nhóm",
      "Tối ưu nội dung và tương tác",
      "Tư vấn chiến lược kênh",
      "Hỗ trợ nhanh theo yêu cầu",
    ],
    priceMode: "contact",
  },
  {
    slug: "dich-vu-so",
    category: "Dịch vụ số",
    title: "Dịch vụ số / tài khoản",
    summary:
      "Tư vấn và hỗ trợ các công cụ số phổ biến phục vụ vận hành: ChatGPT, Microsoft 365, Canva Pro và nhiều nền tảng khác.",
    ctaLabel: "Xem dịch vụ số",
    href: "/dich-vu-so",
    icon: "package",
    iconImage: "/assets/v5/services/dich-vu-so.webp",
    // "Tài khoản chính hãng/ủy quyền" đã bị gỡ (PHUONG_AN §6.3): đó là một tuyên bố về quan hệ
    // với nhà cung cấp — chính hãng, được uỷ quyền — mà repo không có bất kỳ bằng chứng nào, và
    // là loại câu có hệ quả pháp lý nếu sai. Thay bằng mô tả đúng việc thực sự làm.
    features: [
      "Tư vấn công cụ phù hợp nhu cầu",
      "Hướng dẫn sử dụng",
      "Hỗ trợ trong thời gian sử dụng",
    ],
    priceMode: "contact",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
