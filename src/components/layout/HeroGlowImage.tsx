import Image from "next/image";

/** Ảnh hero được render trên nền đen tuyệt đối.
 *
 * File không có kênh trong suốt. Có hai cách ghép nó lên hero, và chúng cho kết quả khác nhau
 * ở chỗ BẦU SAO phía sau:
 *
 *  - `blend` bật: hoà trộn `screen`. Đen là phần tử trung tính của phép cộng ánh sáng nên biến
 *    mất, phần vàng cộng thẳng lên nền — nhưng sao phía sau cũng xuyên qua vùng tối của tranh.
 *  - `blend` tắt (mặc định): nền đen của chính tranh che sao lại, cho vùng ảnh một khoảng tối
 *    sạch. Mép được làm mờ dần nên không thấy khung chữ nhật.
 *
 * Cả hai cách đều KHÔNG sửa file gốc — chỉ là cách hợp thành ở phía trình duyệt.
 *
 * `bleed` cho ảnh rộng hơn cột chứa nó và tràn sang trái, để vệt sáng chạy tới dưới phần chữ.
 * Ảnh được đặt tuyệt đối nên chiều cao hero do khung bọc quyết định, không bị tranh kéo cao lên.
 */
export function HeroGlowImage({
  src,
  alt,
  width,
  height,
  blend = false,
  feather = false,
  bleed,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Dùng `screen` thay vì để nền đen của tranh che sao. */
  blend?: boolean;
  /** Làm mờ dần bốn mép. Chỉ cần khi tranh bị cắt cụt ở biên khung — ảnh có kênh trong suốt
   * sạch thì bật lên chỉ tổ làm tối mất phần rìa. */
  feather?: boolean;
  /** Bề rộng tràn (đơn vị vw) và chiều cao khung bọc tính vào bố cục (px). */
  bleed?: { width: string; box: number };
  className?: string;
}) {
  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      sizes={bleed ? "100vw" : "(min-width: 1024px) 46vw, 90vw"}
      className={`h-auto ${feather ? "hero-feather" : ""} ${blend ? "mix-blend-screen" : ""} ${
        bleed ? "absolute right-0 top-1/2 max-w-none -translate-y-1/2" : "w-full"
      } ${className}`}
      style={bleed ? { width: bleed.width } : undefined}
    />
  );

  if (!bleed) return img;
  return (
    <span className="relative block w-full" style={{ height: bleed.box }}>
      {img}
    </span>
  );
}
