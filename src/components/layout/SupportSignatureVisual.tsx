import Image from "next/image";
import { BrandMark, type BrandName } from "@/components/ui/BrandMark";
import { Icon, type IconName } from "@/components/ui/Icon";
import { assetPath, assetSize } from "@/lib/assets";

/** Hero visual cho trang support từng nền tảng.
 *
 * V6 dựng khối này hoàn toàn bằng CSS — brand mark ở tâm, hai vòng orbit, ba icon quanh nó — vì
 * lúc đó chưa có asset. V7 có bốn vật thể render riêng cho bốn nhóm, nên khi có `assetId` thì
 * vật thể là lớp chính và **toàn bộ orbit/icon CSS bị bỏ**: giữ cả hai là hai hệ hình chồng
 * nhau, và ba icon vàng nằm đè lên một vật thể vàng thì không đọc ra gì cả.
 *
 * Nhánh CSS cũ vẫn còn làm fallback. Nó không phải mã chết: `visualAssetId` là optional trong
 * `SupportService`, nên một nhóm support thêm sau mà chưa có ảnh vẫn render được hero thay vì
 * để lỗ trống. Bốn record đang publish đều đã có ID.
 */
export function SupportSignatureVisual({
  assetId,
  brand,
  title,
  priority = false,
  orbitIcons = ["shield-check", "headset", "badge-check"],
}: {
  assetId?: string;
  brand?: BrandName;
  title: string;
  priority?: boolean;
  orbitIcons?: IconName[];
}) {
  if (assetId) {
    const size = assetSize(assetId);
    return (
      <div
        className="relative mx-auto w-[240px] lg:w-[380px]"
        role="img"
        aria-label={`Minh hoạ dịch vụ ${title}`}
      >
        {/* Một quầng vàng rất nhẹ phía sau, không thêm glow mạnh (board §7). */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(216,169,78,0.14),transparent_62%)]"
        />
        <Image
          src={assetPath(assetId)}
          alt=""
          aria-hidden="true"
          width={size.width}
          height={size.height}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1024px) 380px, 240px"
          className="relative h-auto w-full object-contain"
        />
        {/* BrandMark thật làm badge nhỏ ở góc — logo nền tảng phải là logo thật, không phải một
            hình do AI vẽ ra. Đặt ở góc dưới để không che vật thể. */}
        {brand ? (
          <span className="absolute bottom-1 right-1 grid size-10 place-items-center rounded-full border border-white/10 bg-ink-950/85 lg:size-12">
            <BrandMark name={brand} size={22} />
          </span>
        ) : null}
      </div>
    );
  }

  // ── Fallback CSS (V6) khi record chưa có asset ────────────────────────────────────────
  const radius = 42; // phần trăm so với cạnh khung

  return (
    <div
      className="relative mx-auto aspect-square w-[220px] lg:w-[300px]"
      role="img"
      aria-label={`Minh hoạ dịch vụ ${title}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(216,169,78,0.16),transparent_62%)]"
      />
      <span aria-hidden="true" className="absolute inset-[6%] rounded-full border border-white/10" />
      <span aria-hidden="true" className="absolute inset-[24%] rounded-full border border-gold-500/20" />

      <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] lg:size-24">
        {brand ? <BrandMark name={brand} size={52} /> : null}
      </span>

      {orbitIcons.map((icon, index) => {
        // Bắt đầu từ -90° (đỉnh) rồi chia đều — ba icon ở 12h, 4h, 8h.
        const angle = (-90 + (360 / orbitIcons.length) * index) * (Math.PI / 180);
        const left = 50 + radius * Math.cos(angle);
        const top = 50 + radius * Math.sin(angle);
        return (
          <span
            key={icon}
            aria-hidden="true"
            className="absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold-500/25 bg-ink-950"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <Icon name={icon} size="inline" className="text-gold-300" />
          </span>
        );
      })}
    </div>
  );
}
