import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ContentBlock } from "@/content/service-registry";

/** "Khi nào dịch vụ này phù hợp?" — UI V6 §5.2.
 *
 * Thay hai section "Vấn đề thường gặp" và "Lợi ích", vốn render thành hai lưới card trắng
 * giống hệt nhau nối tiếp. Hai lưới đó không sai về nội dung, nhưng chúng làm mất chính quan hệ
 * giữa hai vế: vấn đề và lợi ích là hai đầu của cùng một câu, không phải hai danh mục ngang
 * hàng. Đặt cạnh nhau trong một split, tương phản tối/sáng làm việc đó thay cho một tiêu đề.
 *
 * Khi chỉ có một vế dữ liệu, layout tự thành một cột hoàn chỉnh — không để lại nửa trang trống.
 */
export function ServiceDecisionPanel({
  problems,
  benefits,
}: {
  problems?: ContentBlock[];
  benefits?: ContentBlock[];
}) {
  const hasProblems = Boolean(problems?.length);
  const hasBenefits = Boolean(benefits?.length);
  if (!hasProblems && !hasBenefits) return null;

  const split = hasProblems && hasBenefits;

  return (
    <Section id="phu-hop" tone="ivory">
      <Container>
        <ScrollReveal direction="up" distance={20} duration={0.6}>
          <SectionHeading eyebrow="Phù hợp" title="Khi nào dịch vụ này phù hợp?" />
        </ScrollReveal>

        <div
          className={`mt-10 grid gap-6 ${split ? "lg:grid-cols-12" : ""}`}
        >
          {hasProblems ? (
            // dark-emphasis: đây là block nhấn mạnh duy nhất của trang. Vấn đề là thứ khách
            // nhận ra mình đang gặp, nên nó cần đọc trước lợi ích chứ không cùng trọng lượng.
            <ScrollReveal
              direction="up"
              distance={24}
              duration={0.7}
              className={split ? "lg:col-span-5" : ""}
            >
              <div className="h-full rounded-2xl bg-ink-950 p-6 lg:p-8">
                <p className="text-eyebrow uppercase tracking-[0.14em] text-gold-300">
                  Dấu hiệu thường gặp
                </p>
                <ul className="mt-5 flex list-none flex-col gap-4">
                  {problems!.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <Icon
                        name="circle-alert"
                        size="card"
                        className="mt-px shrink-0 text-gold-300/70"
                      />
                      <div className="min-w-0">
                        <p className="text-body font-medium text-white">{item.title}</p>
                        {item.body ? (
                          <p className="mt-1 text-small text-white/65">{item.body}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ) : null}

          {hasBenefits ? (
            <ScrollReveal
              direction="up"
              distance={24}
              duration={0.7}
              delay={split ? 120 : 0}
              className={split ? "lg:col-span-7" : ""}
            >
              <div className="h-full lg:pl-2">
                <p className="text-eyebrow uppercase tracking-[0.14em] text-text-muted">
                  Bạn nhận được
                </p>
                {/* List có divider, không phải lưới card. Bốn dòng ngắn trong bốn thẻ nền trắng
                    là bốn khung viền quanh bốn câu — viền không thêm nghĩa gì ở đây. */}
                <ul className="mt-5 flex list-none flex-col divide-y divide-border">
                  {benefits!.map((item) => (
                    <li key={item.title} className="flex items-start gap-3 py-4 first:pt-0">
                      <Icon
                        name="circle-check"
                        size="card"
                        className="mt-px shrink-0 text-state-success"
                      />
                      <div className="min-w-0">
                        <p className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">
                          {item.title}
                        </p>
                        {item.body ? (
                          <p className="mt-1 text-body text-text-secondary">{item.body}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
