import type { TruthState } from "@/lib/content-truth";
import { isProductionVisible } from "@/lib/content-truth";
import type { TrustRelationship } from "@/lib/db/repositories/truth";

/** KHU CHỪA SẴN CHO BẰNG CHỨNG NĂNG LỰC.
 *
 * Maxweb dựng hồ sơ năng lực thành ba khối trên trang chủ: một dải số liệu ("3000 khách hàng &
 * đối tác", "5500 dự án hoàn thành", "N năm kinh nghiệm"), một khối cảm nhận khách hàng, và một
 * dải logo "Đối tác & Khách hàng tiêu biểu". Lạc Việt làm đúng cấu trúc đó — nhưng ba mảng dưới
 * đây CỐ Ý ĐỂ TRỐNG cho tới khi có bằng chứng.
 *
 * Ba khối tương ứng trên trang chủ tự ẩn khi mảng của nó rỗng, nên hôm nay trang không hiện một
 * tiêu đề trên khoảng trắng. Điền vào là ba khối tự xuất hiện đúng chỗ đã định — không phải sửa
 * bố cục.
 *
 * ─── VÌ SAO LÀ FILE NÀY CHỨ KHÔNG PHẢI DATABASE ────────────────────────────────────────────
 *
 * Sáu bảng ở `db/schema.ts` (metrics, testimonials, trust_marks…) mới là kho lưu trữ lâu dài.
 * Nhưng `db/client.ts` NÉM LỖI khi thiếu `DATABASE_URL`, và trang chủ hiện là trang tĩnh dựng
 * lúc build — nối thẳng vào DB sẽ làm `next build` chết trên bất kỳ máy hoặc CI nào không có
 * biến đó, đổi một trang tĩnh thành trang động, và thêm một truy vấn vào đường render của trang
 * đông khách nhất. Ba mảng tĩnh này giữ trang chủ nguyên trạng tĩnh và an toàn khi build.
 *
 * Khi chuyển sang đọc DB: chỉ cần đổi ba hàm `visible*()` ở cuối file, giữ nguyên kiểu dữ liệu.
 * Ba component trên trang chủ không phải sửa gì.
 *
 * ─── ĐIỀN NHƯ THẾ NÀO ──────────────────────────────────────────────────────────────────────
 *
 * KHÔNG chỉ thêm dòng vào mảng rồi thôi. Mỗi mục phải mang `claimState`:
 *
 *   "verified"  — đã có bằng chứng (hợp đồng, hoá đơn, kết xuất analytics, văn bản đồng ý).
 *                 Ghi thêm `verifiedAt`. Đây là trạng thái DUY NHẤT hợp lệ cho cảm nhận khách
 *                 hàng và cho logo gắn nhãn "khách hàng" hoặc "đối tác".
 *   "demo"      — minh hoạ; BẮT BUỘC có `disclosure` và câu đó sẽ HIỆN cho khách đọc.
 *   "unverified" — không bao giờ hiện, kể cả `published: true`.
 */

// ── Dải số liệu — tương ứng "3000 / 5500 / N năm" của Maxweb ────────────────────────────────

export type ProofMetric = TruthState & {
  id: string;
  /** Con số như muốn hiển thị, ví dụ "48" hoặc "3 năm". */
  valueLabel: string;
  label: string;
  /** Con số này có được từ đâu. 'estimated' KHÔNG BAO GIỜ được coi là đã xác minh — một ước
   *  lượng đã làm tròn lên vẫn là ước lượng, dù ai đã duyệt nó. */
  method?: "measured" | "counted" | "estimated";
  measuredAt?: string;
};

/** TRỐNG CÓ CHỦ Ý. Bốn con số cũ (200+ khách hàng, 1000+ dự án, 4+ năm, 99% hài lòng) đã bị gỡ
 *  ngày 2026-09-07 vì chính dữ liệu tự khai là minh hoạ. Đừng chép lại chúng vào đây. */
export const proofMetrics: ProofMetric[] = [];

// ── Cảm nhận khách hàng — tương ứng "Khách Hàng Nói Về Chúng Tôi?" ──────────────────────────

export type Testimonial = TruthState & {
  id: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  quote: string;
  serviceSlug?: string;
};

/** TRỐNG CÓ CHỦ Ý.
 *
 * Đây là khối cần cẩn trọng nhất trong ba khối. Một lời khen gắn tên và nơi làm việc của một
 * người có thật, mà người đó chưa đồng ý, là bịa ra phát ngôn của người khác — khác hẳn với
 * trưng bày một concept thiết kế có gắn nhãn minh hoạ. Vì vậy `claimState: "demo"` KHÔNG hợp lệ
 * ở đây: chỉ "verified" kèm văn bản đồng ý mới được hiện. */
export const testimonials: Testimonial[] = [];

// ── Logo — tương ứng "Đối Tác & Khách Hàng Tiêu Biểu" ───────────────────────────────────────

export type TrustMark = TruthState & {
  id: string;
  name: string;
  logoAssetId?: string;
  /** Quan hệ thật sự. Đây là trường quan trọng nhất của khối này. */
  relationship: TrustRelationship;
};

/** TRỐNG CÓ CHỦ Ý.
 *
 * Maxweb gộp chung dưới một tiêu đề "Đối tác & Khách hàng tiêu biểu". Lạc Việt tách bằng
 * `relationship`, vì gộp là chỗ dễ nói sai nhất trên toàn trang: dán logo Meta, Google, TikTok
 * lên rồi để khách tự hiểu là "đối tác" vừa mất uy tín khi bị hỏi lại, vừa có rủi ro pháp lý.
 *
 *   "platform-used"     — nền tảng chúng ta thao tác trên đó. Đúng cho gần như mọi logo lớn.
 *                         Không cần bằng chứng, nhưng KHÔNG được hiện dưới chữ "đối tác".
 *   "certified-partner" — có chứng nhận đối tác thật. Cần bằng chứng.
 *   "client"            — khách hàng đã ký. Cần bằng chứng VÀ sự đồng ý nêu tên.
 *   "media-mention"     — báo chí có nhắc tới. Cần đường dẫn bài viết.
 */
export const trustMarks: TrustMark[] = [];

// ── Bộ lọc hiển thị ─────────────────────────────────────────────────────────────────────────

export function visibleProofMetrics(): ProofMetric[] {
  return proofMetrics.filter(
    (m) => isProductionVisible(m) && !(m.claimState === "verified" && m.method === "estimated"),
  );
}

/** Chỉ "verified". Xem chú thích ở `testimonials`. */
export function visibleTestimonials(): Testimonial[] {
  return testimonials.filter((t) => isProductionVisible(t) && t.claimState === "verified");
}

export function visibleTrustMarks(): TrustMark[] {
  return trustMarks.filter((t) => isProductionVisible(t));
}

/** Gom logo theo quan hệ để mỗi nhóm có tiêu đề nói đúng bản chất, thay vì một tiêu đề
 *  "Đối tác & Khách hàng" phủ lên tất cả. */
export const TRUST_GROUP_LABELS: Record<TrustRelationship, string> = {
  "platform-used": "Nền tảng chúng tôi làm việc",
  "certified-partner": "Đối tác có chứng nhận",
  client: "Khách hàng",
  "media-mention": "Báo chí nhắc tới",
};

export function trustMarksByRelationship(): { relationship: TrustRelationship; label: string; marks: TrustMark[] }[] {
  const visible = visibleTrustMarks();
  const order: TrustRelationship[] = ["client", "certified-partner", "media-mention", "platform-used"];
  return order
    .map((relationship) => ({
      relationship,
      label: TRUST_GROUP_LABELS[relationship],
      marks: visible.filter((m) => m.relationship === relationship),
    }))
    .filter((g) => g.marks.length > 0);
}
