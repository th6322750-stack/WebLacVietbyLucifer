import { publishedServices, serviceHref } from "@/content/service-registry";
import { SERVICE_PILLARS } from "@/components/content/ServiceDirectory";

/** Điều hướng sinh từ service registry — PHUONG_AN §7.2.
 *
 * Trước đây `serviceMenu` là một mảng hai phần tử viết tay trong site-settings, tách rời khỏi
 * dữ liệu dịch vụ. Hệ quả: publish một dịch vụ mới là hai lần sửa ở hai file, và quên một lần
 * thì dịch vụ có trang nhưng không có lối vào — hoặc tệ hơn, có lối vào nhưng trang chưa
 * publish. Ở đây menu là hàm của registry, nên hai trạng thái đó không thể lệch nhau nữa.
 *
 * Registry đã lọc sẵn `policyClass: "excluded"` trong `publishedServices()`, nên các dịch vụ bị
 * loại theo chính sách không thể lọt vào menu bằng cách bật một cờ ở chỗ khác.
 */

export type NavServiceItem = {
  href: string;
  label: string;
  summary: string;
};

export type NavServiceGroup = {
  /** Định danh trụ cột (ví dụ "xay-nen-tang"), dùng làm key và neo. KHÔNG phải `ServiceGroup`
   *  của registry: menu gom theo trụ cột, xem `serviceNavGroups()`. */
  id: string;
  label: string;
  items: NavServiceItem[];
};

export type NavLink =
  | { href: string; label: string; groups?: undefined }
  | { href: null; label: string; groups: NavServiceGroup[] };

/** Dịch vụ trong menu, gom theo TRỤ CỘT chứ không theo `group` của registry.
 *
 * `group` là phân loại nội bộ và rất mịn — bảy nhóm cho bảy dịch vụ, tức mỗi nhóm đúng một mục.
 * Render thẳng ra menu thì được bảy tiêu đề, mỗi tiêu đề một link: đọc như một danh sách tiêu
 * đề chứ không phải một danh bạ dịch vụ, và mắt phải nhảy bảy lần để tìm một thứ.
 *
 * Trụ cột là cách khách phân loại nhu cầu (dựng nền tảng / tăng trưởng / vận hành), và nó dùng
 * CHUNG một nguồn với `/dich-vu` — nên menu và hub không bao giờ nói hai kiểu về cùng một dịch
 * vụ, và thêm dịch vụ mới chỉ cần gán `group`, không phải sửa cả hai chỗ.
 */
export function serviceNavGroups(): NavServiceGroup[] {
  const published = publishedServices().filter((s) => !s.navHidden);
  return SERVICE_PILLARS.map((pillar) => ({
    id: pillar.id,
    label: pillar.label,
    items: published
      .filter((s) => pillar.groups.includes(s.group))
      .map((s) => ({ href: serviceHref(s), label: s.title, summary: s.summary })),
  })).filter((entry) => entry.items.length > 0);
}

/** Danh sách phẳng — dùng cho footer và cho việc xác định route hiện tại có thuộc nhánh dịch vụ
 *  hay không. */
export function serviceNavItems(): NavServiceItem[] {
  return publishedServices()
    .filter((s) => !s.navHidden)
    .map((s) => ({
    href: serviceHref(s),
    label: s.title,
    summary: s.summary,
  }));
}

/** Route hiện tại có nằm trong nhánh dịch vụ không (kể cả hub `/dich-vu`). */
export function isServiceRoute(pathname: string): boolean {
  if (pathname === "/dich-vu" || pathname.startsWith("/dich-vu/")) return true;
  return serviceNavItems().some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
}

/** Menu chính — giữ các điểm vào cấp cao tương ứng với catalogue Maxweb. Nội dung của các hub
 *  vẫn là dữ liệu Lạc Việt (concept/kiến thức), không sao chép danh tính dự án hoặc tuyên bố
 *  chưa xác minh từ site tham chiếu. */
export function mainNavLinks(): NavLink[] {
  return [
    { href: "/", label: "Trang chủ" },
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: null, label: "Dịch vụ", groups: serviceNavGroups() },
    { href: "/ho-so-nang-luc", label: "Hồ sơ năng lực" },
    { href: "/kho-giao-dien", label: "Kho giao diện" },
    { href: "/tin-tuc", label: "Tin tức" },
    { href: "/lien-he", label: "Liên hệ" },
  ];
}

/** Link footer. Cột dịch vụ đọc từ đúng nguồn dữ liệu với header. */
export function footerNav() {
  return {
    services: [
      ...serviceNavItems().map(({ href, label }) => ({ href, label })),
      { href: "/dich-vu", label: "Tất cả dịch vụ" },
    ],
    brand: [
      { href: "/gioi-thieu", label: "Giới thiệu" },
      { href: "/ho-so-nang-luc", label: "Hồ sơ năng lực" },
      { href: "/du-an", label: "Dự án" },
      { href: "/kho-giao-dien", label: "Kho giao diện" },
      { href: "/tin-tuc", label: "Tin tức" },
      { href: "/website/concept", label: "Concept giao diện" },
      { href: "/kien-thuc", label: "Kiến thức" },
    ],
    support: [
      { href: "/#work-process", label: "Quy trình làm việc" },
      { href: "/huong-dan-quan-tri", label: "Hướng dẫn quản trị" },
      { href: "/huong-dan-thanh-toan", label: "Hướng dẫn thanh toán" },
      { href: "/hop-dong-mau", label: "Hợp đồng mẫu" },
      { href: "/tuyen-dung", label: "Tuyển dụng & hợp tác" },
      { href: "/kien-thuc", label: "Hướng dẫn & kiến thức" },
      { href: "/lien-he", label: "Gửi yêu cầu hỗ trợ" },
    ],
    policies: [
      { href: "/chinh-sach/thanh-toan", label: "Chính sách thanh toán" },
      { href: "/chinh-sach/van-chuyen-va-giao-nhan", label: "Vận chuyển & giao nhận" },
      { href: "/chinh-sach/bao-mat-thong-tin", label: "Bảo mật thông tin" },
      { href: "/chinh-sach/xu-ly-khieu-nai", label: "Xử lý khiếu nại" },
      { href: "/chinh-sach/bao-hanh", label: "Bảo hành" },
      { href: "/chinh-sach/doi-tra-va-hoan-tien", label: "Đổi trả & hoàn tiền" },
    ],
    contact: [{ href: "/lien-he", label: "Liên hệ tư vấn" }],
  };
}
