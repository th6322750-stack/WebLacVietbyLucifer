import Image from "next/image";

/** Cảnh Việt Nam ở hero trang chủ — 25 lớp rời, dựng theo bản production do bên thiết kế giao.
 *
 * Khác hẳn bộ 34 lớp trước: bản này đi kèm TOẠ ĐỘ cho từng mảnh (phần trăm của khung
 * 1672×941), nên mỗi vật thể đặt đúng chỗ và động riêng được — cờ gợn sóng, chim thở, sen nở,
 * đèn thành phố nhấp nháy, dải sáng trôi, bóng nước dập dềnh.
 *
 * Thứ tự trong mảng CHÍNH LÀ thứ tự chồng lớp. Ba nhóm, từ dưới lên:
 *   fx    — ánh sáng nền, hoà trộn cộng sáng
 *   refl  — bóng lộn ngược dưới mặt nước, có mặt nạ mờ dần và làm nhoè
 *   main  — vật thể đặc
 *
 * Bản gốc là một trang HTML rời với ảnh nhúng base64 (3,4MB). Ở đây ảnh tách ra thành file để
 * trình duyệt cache được và Next tối ưu được, còn toạ độ với hoạt ảnh giữ nguyên.
 */

type Layer = {
  id: string;
  /** Toạ độ và kích thước, phần trăm khung 1672×941. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Kích thước thật của file, để giữ tỷ lệ. */
  nw: number;
  nh: number;
  kind: "fx" | "refl" | "main";
  /** Độ mờ cố định của lớp. */
  o?: number;
  blur?: number;
  alt?: string;
};

const LAYERS: Layer[] = [
  // ── Ánh sáng nền ───────────────────────────────────────────────────────────────────────
  // Đã bỏ ribbonA, ribbonB, pwave: ba dải sáng cong này quét sang tận nửa trái, vắt ngang đúng
  // dòng "200+ khách hàng đã tin tưởng Lạc Việt". Bản gốc cắt mờ chúng bằng mặt nạ nhưng vẫn
  // còn thấy rõ trên nền đen.
  { id: "floor", x: 0, y: 74.389, w: 100, h: 34.431, nw: 1100, nh: 517, kind: "fx", o: 0.4 },
  { id: "grid", x: -7.177, y: 70.67, w: 114.833, h: 48.672, nw: 1100, nh: 733, kind: "fx", o: 0.54 },
  { id: "haze", x: 52.632, y: 53.135, w: 47.847, h: 33.156, nw: 1100, nh: 500, kind: "fx", o: 0.28 },
  { id: "ripple", x: 41.866, y: 76.514, w: 59.809, h: 25.399, nw: 1100, nh: 381, kind: "fx", o: 0.52 },
  { id: "lotusglow", x: 45.455, y: 74.389, w: 57.416, h: 24.973, nw: 1100, nh: 375, kind: "fx", o: 0.38 },
  { id: "sparkle", x: 0, y: 0, w: 100, h: 95.962, nw: 1100, nh: 1444, kind: "fx", o: 0.26 },
  { id: "ringglow", x: 59.211, y: 80.765, w: 33.493, h: 17.641, nw: 896, nh: 266, kind: "fx", o: 0.72 },

  // ── Bóng dưới nước ─────────────────────────────────────────────────────────────────────
  { id: "r_pedestal", x: 61.005, y: 95.537, w: 29.306, h: 12.115, nw: 784, nh: 363, kind: "refl", o: 0.42, blur: 2.2 },
  { id: "r_lotusL", x: 48.923, y: 90.436, w: 7.177, h: 7.014, nw: 192, nh: 151, kind: "refl", o: 0.62, blur: 0.8 },
  { id: "r_lotusC", x: 56.1, y: 83.422, w: 6.28, h: 6.27, nw: 168, nh: 136, kind: "refl", o: 0.56, blur: 0.8 },
  { id: "r_lotusR", x: 89.414, y: 90.755, w: 10.467, h: 10.521, nw: 280, nh: 227, kind: "refl", o: 0.66, blur: 0.8 },

  // ── Vật thể ────────────────────────────────────────────────────────────────────────────
  { id: "skyline", x: 53.529, y: 48.353, w: 47.249, h: 28.905, nw: 1100, nh: 435, kind: "main" },
  { id: "bridge", x: 23.923, y: 60.043, w: 28.11, h: 16.897, nw: 752, nh: 255, kind: "main" },
  // Bản đồ phóng to 28% quanh chính tâm cũ (53.828, 35.229) nên không xê dịch vị trí trong
  // bố cục, chỉ nở ra.
  { id: "map", x: 46.555, y: 15.302, w: 14.546, h: 39.855, nw: 304, nh: 469, kind: "main",
    alt: "Bản đồ Việt Nam" },
  { id: "flag", x: 73.923, y: 14.665, w: 25.598, h: 27.099, nw: 684, nh: 407, kind: "main",
    alt: "Quốc kỳ Việt Nam" },
  { id: "pole_shaft", x: 73.385, y: 13.815, w: 0.419, h: 62.168, nw: 11, nh: 936, kind: "main" },
  { id: "pole_ball", x: 72.667, y: 12.009, w: 1.555, h: 2.976, nw: 41, nh: 44, kind: "main" },
  { id: "pedestal", x: 61.005, y: 71.413, w: 29.306, h: 24.123, nw: 784, nh: 363, kind: "main" },
  { id: "hero", x: 66.089, y: 28.905, w: 19.737, h: 46.44, nw: 528, nh: 699, kind: "main",
    alt: "Chim Lạc trên trống đồng Đông Sơn" },
  { id: "lotusL", x: 48.923, y: 80.446, w: 7.177, h: 9.989, nw: 192, nh: 151, kind: "main" },
  { id: "lotusC", x: 56.1, y: 74.389, w: 6.28, h: 9.033, nw: 168, nh: 136, kind: "main" },
  { id: "lotusR", x: 89.414, y: 75.664, w: 10.467, h: 15.09, nw: 280, nh: 227, kind: "main" },
];

// PRO V2.1 §11/12: the mobile crop (see homepage) only has room for the monument cluster, not
// the full establishing shot. Kept: the layers the brief names explicitly (map, flag, chim Lạc,
// pedestal + its glow ring, ambient sparkle/lotus-glow). Dropped: skyline, bridge, the two lotus
// flowers off to either side, and every `refl` layer — reflections only read as "water" next to
// the bridge/floor they reflect off, which are themselves dropped, so keeping them would just be
// duplicate ghosts of the bird and pedestal with no visible water to justify them.
const MOBILE_LAYER_IDS = new Set([
  "map", "flag", "pole_shaft", "pole_ball", "pedestal", "hero", "ringglow", "lotusglow", "sparkle",
]);

export function HeroVietnamScene({ className = "", mobile = false }: { className?: string; mobile?: boolean }) {
  const layers = mobile ? LAYERS.filter((l) => MOBILE_LAYER_IDS.has(l.id)) : LAYERS;
  return (
    <div className={`vn-stage ${className}`}>
      {layers.map((l) => (
        <div
          key={l.id}
          id={`w_${l.id}`}
          className={`vn-lw vn-${l.kind}`}
          aria-hidden={l.alt ? undefined : true}
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            width: `${l.w}%`,
            height: `${l.h}%`,
            opacity: l.o,
          }}
        >
          <Image
            id={`vn_${l.id}`}
            src={`/assets/v5/hero/vn/${l.id}.webp`}
            alt={l.alt ?? ""}
            width={l.nw}
            height={l.nh}
            // PRO V2.1 perf: Lighthouse's actual LCP-element trace named `sparkle` (not hero/
            // flag/pedestal) — it's a near-full-canvas overlay (w:100%, h:96%), so by sheer
            // painted area Chrome picks it as "largest contentful paint" even though it's a
            // decorative fx layer. Left lazy, that made the whole hero's LCP wait behind a
            // deferred fetch. Added to priority based on that measurement, not a guess.
            priority={l.id === "hero" || l.id === "flag" || l.id === "pedestal" || l.id === "sparkle"}
            sizes="100vw"
            style={l.blur ? { filter: `blur(${l.blur}px)` } : undefined}
          />
        </div>
      ))}

      {/* Bộ lọc làm lá cờ gợn sóng. Nhiễu fractal đẩy lệch từng điểm ảnh, và chính baseFrequency
          cũng được animate nên nếp gấp chạy chứ không đứng yên. Phải nằm trong DOM, CSS không
          tự khai báo được thứ này. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="flagWarp" x="-12%" y="-12%" width="124%" height="124%">
          {/* Bản gốc animate luôn baseFrequency — mỗi khung phải sinh lại toàn bộ nhiễu fractal,
              đây là thứ đắt nhất trong cả cảnh. Để tĩnh: nếp gấp vẫn còn, còn chuyển động của
              lá cờ do phép xoay ở vnFlagSway lo, mà phép xoay thì miễn phí. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.016" numOctaves={2} seed={7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="17" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
}
