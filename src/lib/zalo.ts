import { siteSettings } from "@/lib/site-settings";

/** Một nơi duy nhất dựng URL Zalo — PHUONG_AN §7.5.
 *
 * Trước đây `https://zalo.me/${siteSettings.zalo}` được viết lại ở năm chỗ: provider tư vấn,
 * DirectZaloLink, footer, trang liên hệ và repository dự án. Số điện thoại thì đúng là lấy từ
 * một nguồn, nhưng cách dựng link thì không — nên thêm tham số theo dõi, đổi sang link rút gọn
 * hay chuyển sang Zalo OA đều là năm lần sửa, và lần thứ năm luôn là lần bị quên.
 */
export function zaloUrl(): string {
  return `https://zalo.me/${siteSettings.zalo}`;
}

/** Thuộc tính bắt buộc cho mọi liên kết Zalo mở tab mới.
 *
 * `noopener` không phải chi tiết trang trí: thiếu nó, trang vừa mở giữ tham chiếu
 * `window.opener` tới trang của mình và có thể điều hướng nó đi nơi khác. Gom vào đây để không
 * còn phụ thuộc vào việc từng call site có nhớ viết đủ hay không. */
export const ZALO_LINK_ATTRS = {
  target: "_blank",
  rel: "noreferrer noopener",
} as const;
