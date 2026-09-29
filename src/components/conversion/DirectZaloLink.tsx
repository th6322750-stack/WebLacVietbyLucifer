"use client";

import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { zaloUrl, ZALO_LINK_ATTRS } from "@/lib/zalo";

/** Liên kết Zalo dạng thẻ `<a>` thật.
 *
 * Khác với `useConsultation().open()` — vốn là một `<button>` gọi `window.open` — component này
 * dùng cho những chỗ mà một liên kết mới đúng ngữ nghĩa: khách bấm giữa chuột để mở tab mới,
 * chuột phải để sao chép địa chỉ, và trình đọc màn hình công bố "liên kết" chứ không phải "nút".
 * Một `window.open` từ button làm mất cả ba việc đó.
 *
 * `href` giờ là tuỳ chọn và mặc định lấy từ `zaloUrl()`; call site chỉ truyền khi thật sự cần
 * một địa chỉ khác. `sourceComponent` giúp phân biệt các nút Zalo trong cùng một trang khi đọc
 * báo cáo analytics — trước đây mọi lượt bấm chỉ ghi được `sourceRoute`.
 */
export function DirectZaloLink({
  href,
  className,
  sourceComponent,
  children,
}: {
  href?: string;
  className: string;
  sourceComponent?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <a
      href={href ?? zaloUrl()}
      {...ZALO_LINK_ATTRS}
      onClick={() =>
        track({
          name: "contact_channel_click",
          props: { channel: "zalo", sourceRoute: pathname, sourceComponent },
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
