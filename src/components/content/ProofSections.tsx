import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { assetPath } from "@/lib/assets";
import { claimAttrsFor } from "@/lib/content-truth";
import {
  visibleProofMetrics,
  visibleTestimonials,
  trustMarksByRelationship,
} from "@/content/proof";

/** Ba khối bằng chứng năng lực — cùng cấu trúc Maxweb dùng trên trang chủ của họ.
 *
 * Cả ba tự ẩn khi chưa có dữ liệu, nên hôm nay trang chủ không hiện một tiêu đề trên khoảng
 * trắng. Điền vào `src/content/proof.ts` là chúng tự xuất hiện đúng chỗ đã định.
 *
 * Điểm khác Maxweb nằm ở chỗ khó thấy nhất mà lại quan trọng nhất: họ gộp mọi logo dưới một
 * tiêu đề "Đối tác & Khách hàng tiêu biểu"; ở đây logo được gom theo quan hệ thật, nên một
 * nền tảng mà mình chỉ thao tác trên đó không bao giờ đứng dưới chữ "đối tác".
 */

/** Dải số liệu. Tương ứng "3000 khách hàng / 5500 dự án / N năm kinh nghiệm". */
export function ProofMetricStrip({ onDark = false }: { onDark?: boolean }) {
  const metrics = visibleProofMetrics();
  if (metrics.length === 0) return null;

  // Class Tailwind PHẢI viết đủ chữ. `lg:grid-cols-${n}` là chuỗi nội suy — Tailwind quét mã
  // nguồn tĩnh nên không bao giờ sinh ra class đó, và lưới sẽ âm thầm không có cột nào ở
  // desktop mà không báo lỗi gì. Đúng cái bẫy REPLACE mode của dự án này.
  const cols =
    metrics.length === 1
      ? "lg:grid-cols-1"
      : metrics.length === 2
        ? "lg:grid-cols-2"
        : metrics.length === 3
          ? "lg:grid-cols-3"
          : "lg:grid-cols-4";

  return (
    <div
      className={`mt-10 grid gap-6 border-t pt-8 sm:grid-cols-2 ${cols} ${
        onDark ? "border-white/10" : "border-border"
      }`}
    >
      {metrics.map((m) => (
        <div key={m.id} className="text-center" {...claimAttrsFor(m.claimState)}>
          <p
            className={`font-heading text-metric tabular-nums ${onDark ? "text-gold-300" : "text-gold-700"}`}
          >
            {m.valueLabel}
          </p>
          <p className={`mt-1 text-small ${onDark ? "text-white/70" : "text-text-secondary"}`}>
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Cảm nhận khách hàng. Tương ứng "Khách Hàng Nói Về Chúng Tôi?". */
export function TestimonialsSection() {
  const items = visibleTestimonials();
  if (items.length === 0) return null;

  return (
    <Section id="cam-nhan-khach-hang" tone="ivory">
      <Container>
        <ScrollReveal direction="up" distance={20} duration={0.6}>
          <SectionHeading eyebrow="Cảm nhận" title="Khách hàng nói gì về chúng tôi" align="center" />
        </ScrollReveal>
        <div
          className={`mt-10 grid gap-6 ${
            items.length === 1 ? "mx-auto max-w-editorial" : items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {items.map((t, index) => (
            <ScrollReveal key={t.id} direction="up" distance={24} duration={0.7} delay={index * 120}>
              <figure
                className="flex h-full flex-col gap-4 rounded-2xl border border-gold-500/20 bg-white p-6 shadow-sm"
                {...claimAttrsFor(t.claimState)}
              >
                {/* `messages-square`, không phải `star`: sao ngụ ý một điểm đánh giá, mà đây là
                    lời kể chứ không phải phiếu chấm — và một ngôi sao cạnh lời khen là bước đầu
                    tiên dẫn tới AggregateRating bịa. Bộ icon hiện có cũng không có dấu ngoặc kép. */}
                <Icon name="messages-square" size="feature" className="text-gold-500/50" />
                <blockquote className="flex-1 text-body text-text-secondary">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="border-t border-border pt-4">
                  <p className="font-heading text-card-h3-mobile text-ink-950">{t.authorName}</p>
                  {t.authorRole || t.company ? (
                    <p className="mt-0.5 text-small text-text-muted">
                      {[t.authorRole, t.company].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Logo. Tương ứng "Đối Tác & Khách Hàng Tiêu Biểu", nhưng gom theo quan hệ thật. */
export function TrustMarksSection() {
  const groups = trustMarksByRelationship();
  if (groups.length === 0) return null;

  return (
    <Section id="doi-tac-khach-hang">
      <Container>
        <ScrollReveal direction="up" distance={20} duration={0.6}>
          <SectionHeading eyebrow="Đồng hành" title="Khách hàng và nền tảng chúng tôi làm việc" align="center" />
        </ScrollReveal>
        <div className="mt-10 flex flex-col gap-10">
          {groups.map((group) => (
            <div key={group.relationship}>
              {/* Tiêu đề riêng cho từng nhóm. Đây chính là chỗ Maxweb gộp làm một và nói sai:
                  một logo nền tảng đứng dưới chữ "đối tác" là tuyên bố một quan hệ không có. */}
              <p className="text-center text-eyebrow uppercase tracking-[0.14em] text-text-muted">
                {group.label}
              </p>
              <ul className="mt-5 flex list-none flex-wrap items-center justify-center gap-x-10 gap-y-6">
                {group.marks.map((mark) => (
                  <li key={mark.id} {...claimAttrsFor(mark.claimState)}>
                    {mark.logoAssetId ? (
                      <Image
                        src={assetPath(mark.logoAssetId)}
                        alt={mark.name}
                        width={140}
                        height={48}
                        loading="lazy"
                        className="h-10 w-auto object-contain opacity-70 transition-opacity duration-normal hover:opacity-100"
                      />
                    ) : (
                      // Chưa có logo thì hiện tên. Tốt hơn một ô trống, và không cần chờ có
                      // file ảnh mới đưa được một khách hàng đã đồng ý lên trang.
                      <span className="text-body font-medium text-text-secondary">{mark.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
