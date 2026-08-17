import type { Service } from "@/lib/types";

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
      "Cung cấp và hỗ trợ các tài khoản, công cụ số phổ biến: ChatGPT, Microsoft 365, Canva Pro và nhiều nền tảng khác.",
    ctaLabel: "Xem dịch vụ số",
    href: "/dich-vu-so",
    icon: "package",
    features: ["Tài khoản chính hãng/ủy quyền", "Hướng dẫn sử dụng", "Hỗ trợ trong thời gian sử dụng"],
    priceMode: "contact",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
