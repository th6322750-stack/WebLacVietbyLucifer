import type { TruthState } from "@/lib/content-truth";
import type { Package } from "@/components/content/PricingCard";

/** Pricing packages — PHUONG_AN §7.2.4.
 *
 * Lifted out of `/website/page.tsx` so the homepage, the Website landing and any future service
 * detail can all read the same numbers. A price duplicated across three files is a price that
 * eventually disagrees with itself.
 *
 * The four Website prices were confirmed by Lucifer on 2026-08-21 as real selling prices; that
 * confirmation is what `claimState: "verified"` and `verifiedAt` record. Nothing here may be
 * copied from a competitor's table: struck-through "original" prices, savings percentages,
 * delivery times, lifetime warranties and free-hosting bonuses are that company's commitments,
 * and inventing our own version is exactly what CONTENT_TRUTH.json forbids.
 */

export type PricingGroup = TruthState & {
  id: string;
  /** Tab label. */
  label: string;
  /** Optional line under the tab explaining what this mode means. */
  intro?: string;
  packages: Package[];
};

/** Sorted cheapest first: a comparison table is scanned in one direction and the numbers have to
 *  go that way. */
export const websitePackages: Package[] = [
  {
    plan: "Landing page",
    demoOnly: false as const,
    tag: "Khởi động nhanh",
    description: "Phù hợp chiến dịch quảng cáo, giới thiệu sản phẩm/dịch vụ.",
    price: "Từ 1.590.000đ",
    features: ["1 trang chuyển đổi cao", "Tối ưu tốc độ tải", "Tích hợp form thu lead"],
    ctaLabel: "Nhận báo giá landing",
  },
  {
    plan: "Website doanh nghiệp",
    demoOnly: false as const,
    tag: "Hiện diện chuyên nghiệp",
    description: "Phù hợp doanh nghiệp cần hiện diện website chuyên nghiệp.",
    price: "Từ 4.500.000đ",
    features: ["Thiết kế theo mẫu tối ưu", "Tối đa 5 trang nội dung", "Chuẩn SEO cơ bản"],
    ctaLabel: "Tư vấn gói doanh nghiệp",
  },
  {
    plan: "Website bán hàng",
    demoOnly: false as const,
    tag: "Phổ biến nhất",
    description: "Phù hợp doanh nghiệp cần bán hàng trực tuyến đầy đủ tính năng.",
    // "Giỏ hàng & thanh toán" is a feature Lạc Việt builds INTO a customer's website. It is not
    // a checkout on this marketing site — see PHUONG_AN §4.
    price: "Từ 8.900.000đ",
    features: ["Giỏ hàng & thanh toán", "Quản trị sản phẩm", "Tối ưu SEO nâng cao", "Hỗ trợ ưu tiên"],
    ctaLabel: "Xây web bán hàng",
    featured: true,
  },
];

/** Shown on the back of every website package card. These lines are the approved website
 * commitments already documented in `src/content/faqs.ts`; keeping them beside the shared
 * pricing data prevents the homepage and the Website landing from drifting apart. */
export const websitePackageCommitments = [
  "Thiết kế riêng theo nhận diện thương hiệu, không dùng mẫu dựng sẵn",
  "Tối ưu SEO on-page cơ bản ngay khi bàn giao",
  "Bàn giao kèm hướng dẫn tự quản trị nội dung",
  "Hỗ trợ bảo trì và xử lý sự cố sau bàn giao theo hợp đồng",
  "Thanh toán theo tiến độ dự án",
];

export const websiteCustomPackages: Package[] = [
  {
    plan: "Website theo yêu cầu",
    demoOnly: false as const,
    tag: "Theo phạm vi",
    description:
      "Phù hợp hệ thống phức tạp, tích hợp nhiều dịch vụ riêng. Phạm vi được xác định sau khi trao đổi nhu cầu.",
    price: "Từ 9.500.000đ",
    features: ["Kiến trúc tuỳ chỉnh", "Tích hợp hệ thống/API riêng", "Đội ngũ đồng hành dài hạn"],
    ctaLabel: "Trao đổi giải pháp",
  },
];

export const pricingGroups: PricingGroup[] = [
  {
    id: "website-package",
    label: "Theo gói",
    intro: "Ba gói chuẩn hoá, phạm vi rõ ràng ngay từ đầu.",
    packages: websitePackages,
    published: true,
    claimState: "verified",
    verifiedAt: "2026-08-21",
  },
  {
    id: "website-custom",
    label: "Theo yêu cầu",
    intro: "Dành cho hệ thống cần tích hợp riêng; phạm vi và chi phí thống nhất sau khi tư vấn.",
    packages: websiteCustomPackages,
    published: true,
    claimState: "verified",
    verifiedAt: "2026-08-21",
  },
];

/** Every package across all groups, for the Website landing's flat 4-card layout. */
export const allWebsitePackages: Package[] = [...websitePackages, ...websiteCustomPackages];

export function pricingGroupsFor(pricingGroupId: string | undefined): PricingGroup[] {
  if (pricingGroupId !== "website") return [];
  return pricingGroups.filter((g) => g.published);
}
