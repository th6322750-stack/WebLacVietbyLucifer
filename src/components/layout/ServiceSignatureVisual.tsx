import Image from "next/image";
import { assetPath, assetSize } from "@/lib/assets";

/** Vật thể signature cho hero trang dịch vụ — UI V6 §5.1.
 *
 * Server Component có chủ ý. Cả khối này là ảnh tĩnh cộng vài lớp trang trí bằng CSS thuần; kéo
 * nó thành Client Component chỉ để cho ảnh trôi lên xuống 8px là đánh đổi một mảng JS cho một
 * hiệu ứng mà CSS làm được — và trên trang dịch vụ thì JS đó nằm chắn trước nội dung.
 *
 * Chuyển động: một `translateY` chậm và một glow đổi opacity, cả hai định nghĩa trong
 * `globals.css` và tự tắt dưới `prefers-reduced-motion`. Không animate `filter` (buộc trình
 * duyệt vẽ lại từng khung ở kích thước này), không xoay, không nghiêng theo chuột.
 */
export function ServiceSignatureVisual({
  assetId,
  title,
  priority = false,
  className = "",
}: {
  assetId: string;
  /** Tên dịch vụ, dùng cho alt. Vật thể mang nghĩa cho dịch vụ nên nó không phải hoàn toàn
   *  trang trí — nhưng alt cũng không nhồi từ khoá. */
  title: string;
  priority?: boolean;
  className?: string;
}) {
  const size = assetSize(assetId);

  return (
    <div
      className={`relative mx-auto flex w-full max-w-[300px] items-center justify-center lg:max-w-[520px] ${className}`}
    >
      {/* Ba lớp trang trí, tất cả `aria-hidden`: một quầng vàng rất nhẹ và hai vòng line mảnh.
          Không phải bốn lớp — thêm nữa là quầng bắt đầu cạnh tranh với chính vật thể. */}
      <span
        aria-hidden="true"
        className="v6-signature-glow pointer-events-none absolute inset-0 rounded-full"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full border border-gold-500/12"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[22%] rounded-full border border-gold-500/8"
      />

      <Image
        src={assetPath(assetId)}
        alt={`Minh hoạ dịch vụ ${title}`}
        width={size.width}
        height={size.height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        // 560px là trần trong asset board. Native nhỏ nhất là 1254px nên không bao giờ upscale.
        sizes="(min-width: 1024px) 520px, 300px"
        className="v6-signature-float relative h-auto w-full object-contain"
      />
    </div>
  );
}
