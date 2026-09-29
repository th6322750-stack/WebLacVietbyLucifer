import Image from "next/image";
import { assetPath, assetSize } from "@/lib/assets";

/** Ảnh signature cho hero — dùng chung cho /kien-thuc, /lien-he, /gioi-thieu (V7 §6).
 *
 * Server Component, không state, không listener. Ba trang này chỉ cần một tấm ảnh đặt đúng chỗ;
 * `KnowledgeNetwork` và `ConsultationNetwork` mà nó thay thế là hai composition SVG/CSS riêng
 * cho hai trang, nên gộp về một component vừa bỏ được hai file vừa làm ba hero nhất quán.
 *
 * `blendOnBlack` tồn tại vì một lý do rất cụ thể: `v7-page-about-values` là RGB nền đen chứ
 * không phải RGBA (ngoại lệ duy nhất trong bộ V7, xem asset board §3). Đặt thẳng lên nền đen
 * thì vẫn thấy một hình vuông đen hơi khác tông; `mix-blend-lighten` làm nền của ảnh biến mất
 * vào nền trang vì đen là phần tử trung tính của phép lấy sáng hơn. Đây cũng là cách
 * `HeroVisual` đã xử lý cùng vấn đề, nên không phát minh cơ chế mới.
 *
 * KHÔNG dùng CSS filter để tách nền: filter chạy trên toàn bộ vùng ảnh mỗi khung hình và vẫn
 * không cho ra alpha thật — nó chỉ làm ảnh bạc màu.
 */
export function PageSignatureAsset({
  assetId,
  priority = false,
  blendOnBlack = false,
  className = "",
}: {
  assetId: string;
  priority?: boolean;
  /** Bật cho ảnh RGB nền đen. Chỉ đúng khi phía sau thực sự là nền đen. */
  blendOnBlack?: boolean;
  className?: string;
}) {
  const size = assetSize(assetId);

  return (
    // `overflow-hidden`: với ảnh nền đen, đây là thứ chặn mép hình vuông tràn ra ngoài khung
    // khi blend không phủ hết.
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <Image
        src={assetPath(assetId)}
        alt=""
        width={size.width}
        height={size.height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        // Khớp với khổ render lớn nhất của component này (360px ở /kien-thuc và /lien-he;
        // /gioi-thieu nhỏ hơn). Khai rộng hơn thực tế làm Next chọn candidate to hơn cần thiết.
        // Trần 560px theo asset board; native 1254px nên không bao giờ upscale.
        sizes="(min-width: 1024px) 360px, 240px"
        className={`h-auto w-full object-contain ${blendOnBlack ? "mix-blend-lighten" : ""}`}
      />
    </div>
  );
}
