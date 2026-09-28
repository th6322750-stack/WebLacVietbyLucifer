import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ContentBlock } from "@/content/service-registry";

/** "Phạm vi thực hiện" và "Bạn nhận bàn giao" trong một composition — UI V6 §5.3.
 *
 * Hai section rời trước đây render hai lưới card trắng giống nhau, nối tiếp hai lưới card trắng
 * khác của phần vấn đề/lợi ích — bốn lưới liền nhau là lý do chính khiến năm trang dịch vụ đọc
 * như một bảng dữ liệu. Ở đây chúng là hai danh sách trong một khối, vì "làm gì" và "nhận được
 * gì" là hai nửa của cùng một cam kết và người đọc so sánh chúng với nhau.
 *
 * Icon xuất hiện MỘT lần ở đầu mỗi nhóm, item dùng số thứ tự. Lặp cùng một icon `check` xuống
 * năm dòng không thêm thông tin nào — nó chỉ làm mắt phải bỏ qua năm lần.
 */
export function ScopeDeliveryPanel({
  scope,
  deliverables,
}: {
  scope?: ContentBlock[];
  deliverables?: ContentBlock[];
}) {
  const groups: { key: string; label: string; icon: IconName; items: ContentBlock[] }[] = [];
  if (scope?.length) groups.push({ key: "scope", label: "Phạm vi thực hiện", icon: "check", items: scope });
  if (deliverables?.length)
    groups.push({ key: "deliverables", label: "Bạn nhận bàn giao", icon: "package", items: deliverables });
  if (groups.length === 0) return null;

  return (
    <Section id="pham-vi-ban-giao">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Heading nằm cột trái và ở lại đó — người đọc lướt danh sách bên phải vẫn biết mình
              đang đọc phần nào mà không cần tiêu đề lặp lại giữa chừng. */}
          <div className="lg:col-span-4">
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Phạm vi" title="Công việc và kết quả bàn giao" />
              <p className="mt-4 max-w-editorial text-body text-text-secondary">
                Phạm vi được thống nhất trước khi bắt đầu, và những gì bạn nhận lại được ghi rõ
                ngay từ đầu.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-8">
            {/* Hai nhóm cạnh nhau ở desktop khi có đủ cả hai: xếp dọc làm section cao gần 900px
                chỉ để liệt kê tám dòng, và người đọc phải cuộn mới so được "làm gì" với "nhận
                gì" — trong khi đặt cạnh nhau chính là để so sánh. */}
            <div className={`grid gap-8 ${groups.length > 1 ? "md:grid-cols-2 md:gap-10" : ""}`}>
              {groups.map((group, groupIndex) => (
                <ScrollReveal
                  key={group.key}
                  direction="up"
                  distance={24}
                  duration={0.7}
                  delay={groupIndex * 120}
                >
                  <div>
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-ivory-50">
                        <Icon name={group.icon} size="card" className="text-gold-600" />
                      </span>
                      <p className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">
                        {group.label}
                      </p>
                    </div>
                    <ol className="mt-2 flex list-none flex-col divide-y divide-border pl-0">
                      {group.items.map((item, index) => (
                        <li key={item.title} className="flex items-start gap-4 py-4">
                          <span className="mt-0.5 w-6 shrink-0 font-heading text-small tabular-nums text-gold-600">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0">
                            <p className="text-body font-medium text-ink-950">{item.title}</p>
                            {item.body ? (
                              <p className="mt-1 text-small text-text-secondary">{item.body}</p>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
