import { Icon } from "@/components/ui/Icon";
import { FlipCard } from "@/components/content/FlipCard";
import { PopButton } from "@/components/ui/PopButton";

/** Thẻ giá hai mặt.
 *
 * Mặt trước: thứ khách quét mắt — tên gói, nhãn phân khúc, giá, đối tượng phù hợp, tính năng.
 * Mặt sau: cam kết của doanh nghiệp và nút hành động. Hai mặt không lặp lại nhau.
 *
 * MẶT TRƯỚC XẾP THEO HÀNG — bốn thẻ đứng cạnh nhau thì mỗi hàng (giá, mô tả, từng tính năng)
 * phải cùng chiều cao trên cả bốn thẻ. Bản đầu dùng `border-t` để đánh dấu ranh giới mỗi hàng,
 * nhưng bảy đường kẻ xếp chồng trông như một tấm phiếu bị gạch sọc — bỏ hết, chỉ giữ khoảng
 * đệm để mắt vẫn phân biệt được từng khối mà không rối.
 *
 * Căn hàng không dùng subgrid được: hai mặt thẻ đều `position: absolute` bên trong khung lật, tức
 * chúng không còn là ô của lưới cha nữa. Nên mỗi khối phía trên giữ sẵn một số dòng cố định —
 * tên gói 2 dòng, mô tả 3 dòng, và luôn phát ra đủ số hàng tính năng của gói dài nhất. Đo lại
 * sau khi sửa: bốn giá lệch nhau 1px, trước đó là 37px.
 *
 * Đơn vị `lh` = chiều cao một dòng của chính phần tử đó, nên chỗ giữ tự co giãn khi cỡ chữ đổi
 * ở màn hình nhỏ. Đặt px cứng sẽ sai ngay tại điểm ngắt.
 *
 * Không có gì ở đây được bịa ra. Cam kết lấy nguyên từ src/content/faqs.ts. Thời gian bàn giao
 * và điều khoản bảo hành theo từng gói vẫn vắng mặt cho tới khi Lucifer cung cấp — đó là lời hứa
 * với khách hàng, không phải thứ một component được phép tự nghĩ ra (CONTENT_TRUTH.json).
 */

export type Package = {
  plan: string;
  /** Nhãn phân khúc dưới tên gói. Cách gọi, không phải cam kết. */
  tag: string;
  description: string;
  /** Chuỗi hiển thị nguyên văn, ví dụ "Từ 8.900.000đ". */
  price: string;
  priceSuffix?: string;
  features: string[];
  /** Chữ trên nút, mỗi gói một hành động cụ thể thay vì "Chọn gói này" dùng chung. */
  ctaLabel: string;
  featured?: boolean;
  /** Bắt buộc: CONTENT_TRUTH.json — giá chưa xác nhận thì phải đánh dấu demo. */
  demoOnly: boolean;
};

/** Số hàng tính năng mọi thẻ đều phải phát ra. Gói ít hơn để hàng trống, nhờ vậy đường kẻ và
 * dòng cuối của bốn thẻ vẫn trùng nhau. Trùng với gói dài nhất trong bảng giá website. */
const FEATURE_ROWS = 4;

export function PricingCard({
  plan,
  tag,
  description,
  price,
  priceSuffix,
  features,
  commitments,
  ctaLabel,
  featured = false,
  onSelect,
  demoOnly,
}: Package & {
  /** Hiện ở mặt sau. Phải là câu chữ doanh nghiệp đã duyệt — xem packageCommitments. */
  commitments?: string[];
  onSelect?: () => void;
}) {
  const surface = featured
    ? "bg-ink-950 text-white ring-1 ring-gold-500/40"
    : "border border-border bg-white";

  const front = (
    <div className={`flex h-full flex-col gap-3 px-4 py-4 md:px-5 ${surface}`}>
      <div>
        <h3
          className={`min-h-[2lh] font-heading text-card-h3-mobile lg:text-card-h3-desktop ${
            featured ? "text-white" : "text-ink-950"
          }`}
        >
          {plan}
        </h3>
        <span
          className={`mt-2 inline-flex w-fit rounded-pill px-3 py-1 text-caption font-semibold uppercase tracking-wide ${
            featured ? "bg-gold-metallic text-ink-950" : "bg-ivory text-text-secondary"
          }`}
        >
          {tag}
        </span>
      </div>

      <div>
        <p className={`font-heading text-price ${featured ? "text-gold-300" : "text-gold-700"}`}>
          {price}
          {priceSuffix ? (
            <span className={`font-body text-small ${featured ? "text-white/60" : "text-text-muted"}`}>
              {" "}
              {priceSuffix}
            </span>
          ) : null}
        </p>
        {/* "Từ" đã hàm ý giá khởi điểm; nói rõ ra để không ai hiểu nhầm là giá trọn gói. */}
        <p className={`mt-1 text-caption ${featured ? "text-white/55" : "text-text-muted"}`}>
          Giá khởi điểm, báo giá theo phạm vi thực tế
        </p>
      </div>

      <p className={`min-h-[3lh] text-small ${featured ? "text-white/75" : "text-text-secondary"}`}>
        {description}
      </p>

      <div className="flex flex-col gap-2">
        {Array.from({ length: FEATURE_ROWS }, (_, i) =>
          features[i] ? (
            <span
              key={i}
              className={`flex items-start gap-2 text-small ${
                featured ? "text-white/90" : "text-text-secondary"
              }`}
            >
              <Icon
                name="check"
                size="inline"
                className={`mt-px shrink-0 ${featured ? "text-gold-300" : "text-gold-600"}`}
              />
              {features[i]}
            </span>
          ) : (
            /* Hàng giữ chỗ: gói này ít tính năng hơn gói dài nhất. Bỏ đi thì dòng chân của thẻ
               tụt lên so với ba thẻ kia. */
            <span key={i} className="block min-h-[1lh] text-small" aria-hidden="true" />
          ),
        )}
      </div>

      <p className={`mt-auto text-caption ${featured ? "text-white/55" : "text-text-muted"}`}>
        Di chuột hoặc chạm để xem cam kết →
      </p>
    </div>
  );

  const muted = featured ? "text-white/75" : "text-text-secondary";
  const label = featured ? "text-gold-300" : "text-gold-700";

  const back = (
    <div className={`flex h-full flex-col p-4 md:p-5 ${surface}`}>
      {/* Không phải h3: tên gói đã là một tiêu đề ở mặt trước rồi, và trình đọc màn hình thấy
          CẢ HAI mặt — `backface-visibility` chỉ giấu về mặt hình ảnh, không loại khỏi cây trợ
          năng. Để hai h3 trùng tên thì mỗi gói bị đọc thành hai đề mục. */}
      <p className={`text-caption font-semibold uppercase tracking-wide ${label}`}>{plan}</p>

      {commitments && commitments.length > 0 ? (
        <>
          <p className={`mt-3 text-caption font-semibold ${featured ? "text-white" : "text-ink-950"}`}>
            Cam kết
          </p>
          <ul className="mt-1 flex flex-col gap-1">
            {commitments.map((c) => (
              <li key={c} className={`flex items-start gap-2 text-caption ${muted}`}>
                <Icon name="badge-check" size="inline" className={`mt-px shrink-0 ${label}`} />
                {c}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="mt-auto flex justify-center pt-3">
        <PopButton onClick={onSelect}>{ctaLabel}</PopButton>
      </div>
    </div>
  );

  return (
    <div data-demo-only={demoOnly}>
      <FlipCard front={front} back={back} height="min-h-[520px]" />
    </div>
  );
}
