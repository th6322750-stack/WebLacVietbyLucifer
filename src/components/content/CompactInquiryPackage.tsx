"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { claimAttrsFor } from "@/lib/content-truth";
import type { Package } from "@/components/content/PricingCard";

/** Gói báo giá đơn lẻ — UI V6 §5.4.
 *
 * `PricingCard` là một FlipCard cao cố định 520px. Chiều cao đó tồn tại để bốn thẻ trong một
 * hàng thẳng mép nhau — hợp lý khi có bốn thẻ, vô lý khi chỉ có một: gói "Theo yêu cầu" đứng
 * một mình và để lại một khoảng trắng cao gần nửa màn hình bên dưới nội dung của nó.
 *
 * Thao tác lật cũng mất lý do khi chỉ có một gói. Lật là cách giấu chi tiết để giữ nhịp so sánh
 * giữa nhiều thẻ; không có gì để so sánh thì nó chỉ là một lớp che giữa khách và nút hành động.
 * Ở đây cam kết hiện thẳng, và CTA luôn nhìn thấy được mà không cần chạm lần nào.
 */
export function CompactInquiryPackage({
  pkg,
  commitments,
  onSelect,
}: {
  pkg: Package;
  commitments?: string[];
  onSelect: () => void;
}) {
  // Tối đa 4 dòng: panel này nằm ngang, và một cột tính năng dài hơn thế sẽ kéo cao cả panel
  // trở lại đúng vấn đề vừa sửa.
  const features = pkg.features.slice(0, 4);

  return (
    <div
      {...claimAttrsFor(pkg.demoOnly ? "demo" : "verified")}
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gold-500/25 bg-white shadow-sm"
    >
      {/* Desktop: ba vùng ngang. Mobile: xếp dọc và tự cao theo nội dung — không min-height. */}
      <div className="grid gap-6 p-6 md:grid-cols-12 md:items-center md:gap-8 md:p-8">
        <div className="md:col-span-4">
          <p className="text-eyebrow uppercase tracking-[0.14em] text-gold-700">{pkg.tag}</p>
          <h3 className="mt-2 font-heading text-h4-mobile text-ink-950 lg:text-h4-desktop">
            {pkg.plan}
          </h3>
          <p className="mt-2 text-small text-text-secondary">{pkg.description}</p>
        </div>

        <div className="md:col-span-3 md:border-l md:border-border md:pl-8">
          <p className="font-heading text-price text-gold-700 tabular-nums">{pkg.price}</p>
          {pkg.priceSuffix ? (
            <p className="mt-1 text-small text-text-muted">{pkg.priceSuffix}</p>
          ) : null}
        </div>

        <div className="md:col-span-5">
          <ul className="flex list-none flex-col gap-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-small text-text-secondary">
                <Icon name="check" size="inline" className="mt-0.5 shrink-0 text-gold-600" />
                {f}
              </li>
            ))}
          </ul>
          <Button className="mt-5 w-full" onClick={onSelect}>
            {pkg.ctaLabel}
          </Button>
        </div>
      </div>

      {commitments?.length ? (
        // Cam kết từng nằm ở MẶT SAU thẻ lật. Ở đây chúng hiện thẳng trong một dải chân panel:
        // đây là những gì khách được hứa, và bắt họ lật thẻ mới đọc được là một rào cản không
        // phục vụ ai.
        <div className="border-t border-border bg-ivory-50 px-6 py-5 md:px-8">
          <p className="text-eyebrow uppercase tracking-[0.14em] text-text-muted">Cam kết đi kèm</p>
          <ul className="mt-3 grid list-none gap-x-8 gap-y-2 md:grid-cols-2">
            {commitments.map((c) => (
              <li key={c} className="flex items-start gap-2 text-small text-text-secondary">
                <Icon name="circle-check" size="inline" className="mt-0.5 shrink-0 text-state-success" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
