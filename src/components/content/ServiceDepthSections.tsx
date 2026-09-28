import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageSignatureAsset } from "@/components/layout/PageSignatureAsset";
import type { ServiceDefinition } from "@/content/service-registry";

/** Family-aware decision modules for generic service pages.
 *
 * The old detail template stopped after problem/scope/process. These sections add the parts that
 * make a service page useful before a visitor contacts the agency: available modes, capability
 * map, customer journey, measurement/requirements and explicit limits. Every block is data-led,
 * so a service without verified content simply omits that block instead of receiving filler.
 */
export function ServiceDepthSections({ service }: { service: ServiceDefinition }) {
  const hasModes = Boolean(service.serviceModes?.length);
  const hasCapabilities = Boolean(service.capabilityGroups?.length);
  const hasJourney = Boolean(service.customerJourney?.length);
  const hasSignals = Boolean(service.measurement?.length || service.requirements?.length || service.limits?.length);
  const hasCost = Boolean(service.costFactors?.length);

  return (
    <>
      {hasModes ? (
        <Section id="hinh-thuc" tone="ivory">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end lg:gap-12">
              <ScrollReveal direction="up" distance={20} duration={0.6}>
                <SectionHeading
                  eyebrow={service.pageFamily === "paid-media" ? "Chọn hình thức triển khai" : "Các hướng triển khai"}
                  title="Một nhu cầu, nhiều cách bắt đầu"
                  description="Chọn đúng phạm vi ngay từ đầu để phương án, chi phí và đầu ra không bị nhập nhằng."
                />
              </ScrollReveal>
              {service.depthAssetId ? (
                <ScrollReveal direction="up" distance={20} duration={0.6} className="mx-auto w-full max-w-[220px] lg:max-w-[240px]">
                  <PageSignatureAsset assetId={service.depthAssetId} className="rounded-3xl bg-ivory-100/70 p-2 shadow-[0_20px_50px_-28px_rgba(16,16,16,0.55)]" />
                </ScrollReveal>
              ) : null}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {service.serviceModes!.map((item, index) => (
                <ScrollReveal key={item.title} direction="up" distance={20} duration={0.6} delay={Math.min(index, 3) * 90}>
                  <article className="group h-full rounded-2xl border border-gold-500/20 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/45 hover:shadow-md">
                    <span className="grid size-10 place-items-center rounded-xl bg-ink-950 text-gold-300">
                      <Icon name={item.icon ?? "sparkles"} size="inline" />
                    </span>
                    <h3 className="mt-5 font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">{item.title}</h3>
                    {item.body ? <p className="mt-2 text-small leading-relaxed text-text-secondary lg:text-body">{item.body}</p> : null}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {hasCapabilities ? (
        <Section id="nang-luc">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading
                eyebrow="Năng lực trong phạm vi"
                title="Những phần khách hàng thực sự sử dụng"
                description="Tách phần dành cho người xem và phần dành cho đội ngũ quản trị để dễ hình dung giá trị bàn giao."
              />
            </ScrollReveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {service.capabilityGroups!.map((group, groupIndex) => (
                <ScrollReveal key={group.title} direction="up" distance={20} duration={0.6} delay={Math.min(groupIndex, 3) * 100}>
                  <div className="h-full rounded-2xl border border-border bg-ivory-50 p-6 lg:p-7">
                    <h3 className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">{group.title}</h3>
                    {group.intro ? <p className="mt-2 text-small text-text-secondary">{group.intro}</p> : null}
                    <ul className="mt-5 list-none divide-y divide-border">
                      {group.items.map((item) => (
                        <li key={item.title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                          <Icon name={item.icon ?? "circle-check"} size="inline" className="mt-0.5 shrink-0 text-gold-600" />
                          <span>
                            <span className="block font-medium text-ink-950">{item.title}</span>
                            {item.body ? <span className="mt-1 block text-small leading-relaxed text-text-secondary">{item.body}</span> : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {hasJourney ? (
        <Section id="hanh-trinh" tone="dark">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading
                eyebrow="Hành trình khách hàng"
                title="Từ nhu cầu đến đầu ra có thể kiểm tra"
                description="Mỗi bước có một điểm bàn giao rõ ràng, để đội ngũ biết mình đang làm gì và khách biết tiếp theo sẽ nhận được gì."
                onDark
                align="center"
              />
            </ScrollReveal>
            <ol className="relative mt-10 grid list-none gap-4 lg:grid-cols-4 lg:gap-0">
              {service.customerJourney!.map((step, index) => (
                <li key={step.title} className="relative lg:px-5 lg:first:pl-0 lg:last:pr-0">
                  <ScrollReveal direction="up" distance={20} duration={0.6} delay={Math.min(index, 3) * 100}>
                    <div className="h-full border-l border-gold-500/35 pl-5 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-6">
                      <span className="grid size-9 place-items-center rounded-full border border-gold-400/50 bg-ink-900 font-heading text-small text-gold-300 lg:absolute lg:-top-4 lg:left-5 lg:size-8">{index + 1}</span>
                      <h3 className="font-heading text-card-h3-mobile text-white lg:text-card-h3-desktop">{step.title}</h3>
                      <p className="mt-2 text-small leading-relaxed text-white/65">{step.description}</p>
                      {step.output ? <p className="mt-4 text-eyebrow uppercase tracking-[0.14em] text-gold-300">Đầu ra · {step.output}</p> : null}
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      ) : null}

      {hasSignals ? (
        <Section id="tin-hieu" tone="ivory">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
              <ScrollReveal direction="up" distance={20} duration={0.6} className="lg:col-span-4">
                <SectionHeading eyebrow="Minh bạch trước khi bắt đầu" title="Điều cần chuẩn bị và cách đo" />
              </ScrollReveal>
              <div className="space-y-8 lg:col-span-8">
                {service.measurement?.length ? <SignalList title="Tín hiệu theo dõi" items={service.measurement} icon="trending-up" /> : null}
                {service.requirements?.length ? <SignalList title="Đầu vào cần có" items={service.requirements} icon="package" /> : null}
                {service.limits?.length ? <SignalList title="Giới hạn cần biết" items={service.limits} icon="shield-check" tone="dark" /> : null}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {hasCost ? (
        <Section id="yeu-to-chi-phi">
          <Container width="editorial">
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Chi phí phụ thuộc vào" title="Những yếu tố cần thống nhất trước khi báo giá" align="center" />
            </ScrollReveal>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {service.costFactors!.map((item) => (
                <article key={item.title} className="rounded-2xl border border-gold-500/20 bg-ivory-50 p-5">
                  <h3 className="font-heading text-card-h3-mobile text-ink-950">{item.title}</h3>
                  <p className="mt-2 text-small leading-relaxed text-text-secondary">{item.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

function SignalList({ title, items, icon, tone = "light" }: { title: string; items: NonNullable<ServiceDefinition["measurement"]>; icon: "trending-up" | "package" | "shield-check"; tone?: "light" | "dark" }) {
  return (
    <div className={`rounded-2xl border p-6 lg:p-7 ${tone === "dark" ? "border-gold-500/25 bg-ink-950 text-white" : "border-border bg-white"}`}>
      <div className="flex items-center gap-3">
        <span className={`grid size-10 place-items-center rounded-xl ${tone === "dark" ? "bg-gold-500/15 text-gold-300" : "bg-ivory-50 text-gold-600"}`}>
          <Icon name={icon} size="inline" />
        </span>
        <h3 className={`font-heading text-card-h3-mobile lg:text-card-h3-desktop ${tone === "dark" ? "text-white" : "text-ink-950"}`}>{title}</h3>
      </div>
      <ul className="mt-5 list-none divide-y divide-border/70">
        {items.map((item) => (
          <li key={item.title} className="py-4 first:pt-0 last:pb-0">
            <p className={`font-medium ${tone === "dark" ? "text-white" : "text-ink-950"}`}>{item.title}</p>
            {item.body ? <p className={`mt-1 text-small leading-relaxed ${tone === "dark" ? "text-white/65" : "text-text-secondary"}`}>{item.body}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
