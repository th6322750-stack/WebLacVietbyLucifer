import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import {
  listPricingPackages,
  listTestimonials,
  listMetrics,
  listTrustMarks,
  listDigitalOffers,
  countPendingVerification,
  RELATIONSHIPS_NEEDING_EVIDENCE,
  type TrustMarkRow,
} from "@/lib/db/repositories/truth";
import { uploadAdapterStatus } from "@/lib/uploads/adapter";
import type { ClaimState } from "@/lib/content-truth";
import { isProductionVisible } from "@/lib/content-truth";
import { VerifyRow } from "./VerifyRow";
import { AdminDataUnavailable } from "@/components/admin/AdminDataUnavailable";

export const metadata: Metadata = { title: "Xác minh & xuất bản" };
export const dynamic = "force-dynamic";

/** Bảng điều khiển xác minh — PHUONG_AN §7.6.
 *
 * Trang này tồn tại vì một lý do cụ thể: trước đây không có chỗ nào trong hệ thống trả lời được
 * câu "trên production đang có tuyên bố nào chưa ai kiểm chứng?". Câu trả lời nằm rải trong các
 * file .ts dưới dạng `demoOnly: true`, và cách duy nhất để biết là đọc từng file. Kết quả là
 * "200+ khách hàng" và bảng giá dịch vụ số sống trên production nhiều tháng.
 *
 * Mỗi hàng hiển thị đúng ba điều: nội dung là gì, trạng thái sự thật của nó, và nó CÓ đang hiện
 * ra ngoài hay không — cột cuối tính bằng chính `isProductionVisible` mà trang công khai dùng,
 * chứ không phải bằng một cách suy diễn riêng ở đây. Hai chỗ suy diễn khác nhau về cùng một câu
 * hỏi là cách chắc chắn nhất để bảng điều khiển nói dối người đọc nó.
 */
export default async function VerificationPage() {
  let pricing: Awaited<ReturnType<typeof listPricingPackages>>;
  let testimonials: Awaited<ReturnType<typeof listTestimonials>>;
  let metrics: Awaited<ReturnType<typeof listMetrics>>;
  let trustMarks: Awaited<ReturnType<typeof listTrustMarks>>;
  let offers: Awaited<ReturnType<typeof listDigitalOffers>>;
  let pending: Awaited<ReturnType<typeof countPendingVerification>>;
  let upload: Awaited<ReturnType<typeof uploadAdapterStatus>>;
  try {
    [pricing, testimonials, metrics, trustMarks, offers, pending, upload] = await Promise.all([
      listPricingPackages({ includeUnpublished: true }),
      listTestimonials({ includeUnpublished: true }),
      listMetrics({ includeUnpublished: true }),
      listTrustMarks({ includeUnpublished: true }),
      listDigitalOffers({ includeUnpublished: true }),
      countPendingVerification(),
      uploadAdapterStatus(),
    ]);
  } catch {
    return <AdminDataUnavailable title="Chưa thể tải bảng xác minh" />;
  }

  const totalPending = Object.values(pending).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-[22px] font-bold text-[#08265a]">Xác minh &amp; xuất bản</h1>
          <p className="mt-1 text-[13px] text-[#5a6b85]">
            Mọi tuyên bố hiển thị trên website đều phải đi qua đây. Không có bằng chứng thì không
            xuất bản — hoặc xuất bản kèm ghi chú minh hoạ rõ ràng.
          </p>
        </div>
        <span className="rounded-pill bg-[#eef3fb] px-4 py-2 text-[12px] font-semibold text-[#08265a]">
          {totalPending} mục chưa xuất bản hoặc chưa xác minh
        </span>
      </header>

      {/* Cảnh báo hạ tầng: nếu kho tải lên không dùng được thì ảnh bằng chứng vừa tải lên sẽ
          biến mất, và người duyệt sẽ không biết cho tới lúc cần xem lại. */}
      {upload.ok ? null : (
        <div className="flex items-start gap-3 rounded-xl border border-[#f0c36b] bg-[#fff8e8] p-4">
          <Icon name="circle-alert" size="card" className="mt-px shrink-0 text-[#b07a12]" />
          <div className="text-[13px] text-[#6b4e10]">
            <p className="font-semibold">Kho tải lên chưa sẵn sàng ({upload.adapter})</p>
            <p className="mt-1">{upload.detail}</p>
          </div>
        </div>
      )}

      <VerifySection
        title="Bảng giá"
        table="pricing_packages"
        subjectType="pricing"
        rows={pricing.map((r) => ({
          id: r.id,
          label: `${r.plan} — ${r.priceLabel}`,
          meta: r.groupId,
          claimState: r.claimState,
          verifiedAt: r.verifiedAt ?? null,
          live: isProductionVisible(r),
        }))}
      />

      <VerifySection
        title="Cảm nhận khách hàng"
        table="testimonials"
        subjectType="testimonial"
        note="Cần văn bản đồng ý của người được trích dẫn. Đăng lời khen minh hoạ kèm tên người là bịa phát ngôn, không phải trưng bày thiết kế."
        rows={testimonials.map((r) => ({
          id: r.id,
          label: r.quote.slice(0, 80) + (r.quote.length > 80 ? "…" : ""),
          meta: [r.authorName, r.company].filter(Boolean).join(" · "),
          claimState: r.claimState,
          verifiedAt: r.verifiedAt ?? null,
          live: isProductionVisible(r) && r.claimState === "verified",
        }))}
      />

      <VerifySection
        title="Số liệu"
        table="metrics"
        subjectType="metric"
        note="Số liệu 'ước lượng' không bao giờ được coi là đã xác minh, dù đã bấm duyệt."
        rows={metrics.map((r) => ({
          id: r.id,
          label: `${r.valueLabel} — ${r.label}`,
          meta: [r.scope, r.method ?? "chưa khai cách đo"].join(" · "),
          claimState: r.claimState,
          verifiedAt: r.verifiedAt ?? null,
          live: isProductionVisible(r) && !(r.claimState === "verified" && r.method === "estimated"),
        }))}
      />

      <VerifySection
        title="Logo & quan hệ"
        table="trust_marks"
        subjectType="trust_mark"
        note="Chỉ 'nền tảng đang dùng' là không cần bằng chứng. 'Đối tác', 'khách hàng' và 'báo chí nhắc tới' đều cần."
        rows={trustMarks.map((r) => ({
          id: r.id,
          label: r.name,
          meta: RELATIONSHIP_LABELS[r.relationship],
          claimState: r.claimState,
          verifiedAt: r.verifiedAt ?? null,
          live:
            isProductionVisible(r) &&
            (!RELATIONSHIPS_NEEDING_EVIDENCE.includes(r.relationship) || Boolean(r.evidenceId)),
        }))}
      />

      <VerifySection
        title="Gói dịch vụ số"
        table="digital_offers"
        subjectType="pricing"
        rows={offers.map((r) => ({
          id: r.id,
          label: `${r.name} — ${r.priceLabel}`,
          meta: r.brand,
          claimState: r.claimState,
          verifiedAt: r.verifiedAt ?? null,
          live: isProductionVisible(r),
        }))}
      />
    </div>
  );
}

const RELATIONSHIP_LABELS: Record<TrustMarkRow["relationship"], string> = {
  "platform-used": "Nền tảng đang dùng",
  "certified-partner": "Đối tác có chứng nhận",
  client: "Khách hàng",
  "media-mention": "Báo chí nhắc tới",
};

type Row = {
  id: string;
  label: string;
  meta: string;
  claimState: ClaimState;
  verifiedAt: string | null;
  live: boolean;
};

function VerifySection({
  title,
  table,
  subjectType,
  note,
  rows,
}: {
  title: string;
  table: string;
  subjectType: string;
  note?: string;
  rows: Row[];
}) {
  return (
    <section className="rounded-2xl border border-[#dfe6f0] bg-white">
      <div className="border-b border-[#eef2f8] px-5 py-4">
        <h2 className="font-heading text-[15px] font-bold text-[#08265a]">{title}</h2>
        {note ? <p className="mt-1 text-[12px] text-[#5a6b85]">{note}</p> : null}
      </div>

      {rows.length === 0 ? (
        // Bảng rỗng là trạng thái ĐÚNG hôm nay, không phải lỗi: chưa có bằng chứng nào được ghi
        // nhận, nên chưa có gì để duyệt. Nói rõ điều đó thay vì hiện một bảng trống khó hiểu.
        <p className="px-5 py-6 text-[13px] text-[#5a6b85]">
          Chưa có mục nào. Bảng này rỗng cho tới khi nội dung được nhập vào cơ sở dữ liệu.
        </p>
      ) : (
        <ul className="divide-y divide-[#eef2f8]">
          {rows.map((row) => (
            <VerifyRow key={row.id} row={row} table={table} subjectType={subjectType} />
          ))}
        </ul>
      )}
    </section>
  );
}
