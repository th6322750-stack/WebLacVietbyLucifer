import Image from "next/image";

/** Hero /dich-vu-so — 14 lớp rời xếp chồng thành một cảnh động.
 *
 * ChatGPT render toàn cảnh trên khung 1600×2000 rồi xuất từng bộ phận thành file riêng, cùng
 * khung cùng toạ độ. Mỗi lớp được cắt sát viền để giảm dung lượng, nên vị trí gốc phải lưu lại
 * dưới dạng phần trăm của khung — xếp lại đúng chỗ, mà file thì nhỏ hơn 84%.
 *
 * Thứ tự trong mảng CHÍNH LÀ thứ tự chồng lớp, từ sau ra trước. Đổi thứ tự là đổi cảnh.
 *
 * Không dùng z-index: các lớp là anh em ruột theo đúng thứ tự tài liệu nên đã chồng đúng rồi,
 * thêm z-index chỉ tạo một hệ trật tự thứ hai để về sau tự mâu thuẫn với chính nó.
 */

type Layer = {
  id: string;
  /** Vị trí và bề rộng tính theo phần trăm khung 1600×2000 gốc. */
  x: number;
  y: number;
  w: number;
  /** Kích thước thật của file, để Next.js giữ đúng tỷ lệ và không gây nhảy bố cục. */
  nw: number;
  nh: number;
  alt?: string;
  /** Lớp hiệu ứng CSS và các biến điều khiển riêng của mảnh này. */
  fx?: string;
  vars?: Record<string, string>;
};

const LAYERS: Layer[] = [
  // Nền: hạt sáng và dải sáng nằm dưới cùng, chỉ dao động độ mờ.
  { id: "14_ambient_glow_particles", x: 1.312, y: 14.75, w: 97.188, nw: 972, nh: 959,
    fx: "dvs-shimmer", vars: { "--dur": "7.5s", "--lo": ".45", "--hi": ".95" } },
  { id: "12_gold_light_trails", x: 1.375, y: 15.9, w: 97.312, nw: 973, nh: 891,
    fx: "dvs-shimmer", vars: { "--dur": "5.2s", "--delay": "-1.6s", "--lo": ".62", "--hi": "1" } },

  // Bệ đỡ và bóng đổ: đứng yên, đây là điểm tựa thị giác của cả cảnh.
  { id: "01_pedestal_shadow", x: 9.5, y: 72.4, w: 72.562, nw: 726, nh: 232 },

  // Quả cầu nằm sau điện thoại.
  { id: "05_golden_globe", x: 3.812, y: 36.45, w: 34.312, nw: 343, nh: 282, fx: "dvs-globe" },

  // Điện thoại: trục của bố cục, chỉ trôi rất nhẹ để không kéo mắt khỏi phần chữ bên trái.
  { id: "02_phone_blank_screen", x: 37.688, y: 15.55, w: 45, nw: 450, nh: 562,
    alt: "Điện thoại hiển thị các dịch vụ số của Lạc Việt Media",
    fx: "dvs-float", vars: { "--dur": "9s", "--rise": "6px" } },

  // Sáu vật thể vệ tinh, mỗi cái một nhịp lệch nhau.
  { id: "06_ai_chip_circuitry", x: 13.562, y: 21.5, w: 28.062, nw: 281, nh: 261,
    fx: "dvs-float", vars: { "--dur": "6.4s", "--delay": "-0.8s", "--rise": "14px" } },
  // PRO V2.1 §48: rise was 12px — double the phone's 6px despite both being Tier B (medallion is
  // Tier A, lowest; phone+shield are the next tier up, meant to move similarly since they sit at
  // comparable visual weight either side of the medallion).
  { id: "04_security_shield", x: 15.313, y: 43.7, w: 22.938, nw: 229, nh: 257,
    fx: "dvs-float", vars: { "--dur": "7.2s", "--delay": "-2.1s", "--rise": "7px" } },
  { id: "07_cloud_upload", x: 67, y: 7.1, w: 30.5, nw: 305, nh: 201,
    fx: "dvs-float", vars: { "--dur": "6.8s", "--delay": "-1.4s", "--rise": "15px" } },
  { id: "08_verified_id_card", x: 74.875, y: 27.95, w: 21.75, nw: 218, nh: 171,
    fx: "dvs-float", vars: { "--dur": "7.6s", "--delay": "-3.2s", "--rise": "11px" } },

  // Đồng hồ đo: mặt trôi cùng cả cụm, kim quay riêng bên trong nên phải lồng hai lớp.
  { id: "09_gauge_face", x: 75.062, y: 43.7, w: 19.75, nw: 198, nh: 179,
    fx: "dvs-float", vars: { "--dur": "6.1s", "--delay": "-0.4s", "--rise": "10px" } },
  { id: "10_gauge_needle", x: 82.25, y: 45.45, w: 8.562, nw: 86, nh: 86, fx: "dvs-needle" },

  { id: "11_wallet_crown_coin", x: 59.375, y: 54, w: 31.875, nw: 319, nh: 327,
    fx: "dvs-float", vars: { "--dur": "8.1s", "--delay": "-2.7s", "--rise": "9px" } },

  // Khối lập phương phủ lên trên cùng để cảnh có chiều sâu trước–sau.
  { id: "13_floating_gold_cubes", x: 9.438, y: 10.9, w: 85.125, nw: 851, nh: 968, fx: "dvs-drift" },

  // Huy hiệu thương hiệu đứng trước tất cả — đây là thứ phải nhìn thấy đầu tiên.
  { id: "03_lac_viet_medallion", x: 29.125, y: 52.55, w: 31.5, nw: 315, nh: 323,
    alt: "Huy hiệu chim Lạc — Lạc Việt Media Agency", fx: "dvs-breathe" },
];

export function HeroDigitalStack({ className = "" }: { className?: string }) {
  return (
    <div className={`dvs-stage ${className}`}>
      {LAYERS.map((l) => (
        <span
          key={l.id}
          className={`dvs-layer ${l.fx ?? ""}`}
          style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`, ...l.vars }}
          /* Chỉ hai lớp mang nội dung có nghĩa; phần còn lại là trang trí nên ẩn khỏi trình
             đọc màn hình thay vì đọc ra mười hai cái tên file. */
          aria-hidden={l.alt ? undefined : true}
        >
          <Image
            src={`/assets/v5/hero-dvs/${l.id}.webp`}
            alt={l.alt ?? ""}
            width={l.nw}
            height={l.nh}
            priority={l.id === "02_phone_blank_screen" || l.id === "03_lac_viet_medallion"}
            sizes="(min-width: 1024px) 30vw, 80vw"
          />
        </span>
      ))}
    </div>
  );
}
