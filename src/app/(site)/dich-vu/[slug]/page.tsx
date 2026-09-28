import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/layout/FinalCta";
import { ServiceSignatureVisual } from "@/components/layout/ServiceSignatureVisual";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { PricingTabs } from "@/components/content/PricingTabs";
import { ServiceDecisionPanel } from "@/components/content/ServiceDecisionPanel";
import { ScopeDeliveryPanel } from "@/components/content/ScopeDeliveryPanel";
import { ServiceDepthSections } from "@/components/content/ServiceDepthSections";
import {
  findService,
  genericServiceSlugs,
  serviceHref,
  SERVICE_GROUP_LABELS,
  type ServiceDefinition,
} from "@/content/service-registry";
import { pricingGroupsFor } from "@/content/pricing";
import { getFaqsByScope } from "@/content/faqs";
import { isProductionVisible } from "@/lib/content-truth";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

/** Trang chi tiết dịch vụ dùng chung — UI V6 §6.3 (trước đó PHUONG_AN §7.2.2 / §13.4).
 *
 * Bản trước render bốn lưới card trắng liên tiếp — vấn đề → lợi ích → phạm vi → bàn giao —
 * giống hệt nhau ở cả năm dịch vụ. Nội dung thì đủ, nhưng nhìn vào thì năm trang là một bảng
 * dữ liệu lặp năm lần, và cái phân biệt chúng chỉ là chữ.
 *
 * Ba thay đổi của V6: hero mang vật thể signature riêng theo slug; bốn lưới gộp thành hai
 * composition có phân cấp thật; và một anchor rail chỉ liệt kê những phần THỰC SỰ được render —
 * mọi section ở đây đều optional, nên một rail viết tay sẽ trỏ tới neo không tồn tại ngay khi
 * một dịch vụ thiếu dữ liệu.
 */

export function generateStaticParams() {
  return genericServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return pageMetadata({ title: "Dịch vụ", description: "", path: `/dich-vu/${slug}` });
  return pageMetadata({
    title: `${service.title} | Lạc Việt Media`,
    description: service.summary,
    path: `/dich-vu/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findService(slug);

  // A service that is unpublished, excluded by policy, or hand-built elsewhere must not be
  // reachable through this generic route.
  if (!service || service.routeMode !== "generic" || !isProductionVisible(service)) notFound();

  const pricingGroups = pricingGroupsFor(service.pricingGroupId).filter((g) => isProductionVisible(g));
  const faqs = service.faqScope ? getFaqsByScope(service.faqScope) : [];
  const related = (service.relatedSlugs ?? [])
    .map(findService)
    .filter((s): s is ServiceDefinition => Boolean(s && isProductionVisible(s)))
    .slice(0, 3);

  const hasDecision = Boolean(service.problems?.length || service.benefits?.length);
  const hasScope = Boolean(service.scope?.length || service.deliverables?.length);

  const railItems = [
    hasDecision && { href: "#phu-hop", label: "Khi nào phù hợp" },
    hasScope && { href: "#pham-vi-ban-giao", label: "Phạm vi & bàn giao" },
    service.serviceModes?.length ? { href: "#hinh-thuc", label: "Hình thức" } : null,
    service.capabilityGroups?.length ? { href: "#nang-luc", label: "Năng lực" } : null,
    service.customerJourney?.length ? { href: "#hanh-trinh", label: "Hành trình" } : null,
    service.measurement?.length || service.requirements?.length || service.limits?.length
      ? { href: "#tin-hieu", label: "Chuẩn bị & đo lường" }
      : null,
    service.costFactors?.length ? { href: "#yeu-to-chi-phi", label: "Yếu tố chi phí" } : null,
    service.process?.length ? { href: "#quy-trinh", label: "Quy trình" } : null,
    pricingGroups.length > 0 && { href: "#bang-gia", label: "Chi phí" },
    faqs.length > 0 && { href: "#faq", label: "Câu hỏi" },
  ].filter((x): x is { href: string; label: string } => Boolean(x));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Dịch vụ", path: "/dich-vu" },
          { name: service.title, path: `/dich-vu/${service.slug}` },
        ])}
      />
      <PageHero
        eyebrow={SERVICE_GROUP_LABELS[service.group]}
        breadcrumbs={
          <Breadcrumbs
            onDark
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Dịch vụ", href: "/dich-vu" },
              { label: service.title },
            ]}
          />
        }
        title={service.title}
        description={service.summary}
        heroSlot={
          service.visualAssetId ? (
            <ServiceSignatureVisual assetId={service.visualAssetId} title={service.title} priority />
          ) : undefined
        }
      />

      {railItems.length > 1 ? (
        <Section id="service-rail" compact tone="ivory">
          <Container>
            <nav aria-label="Nội dung trang" className="relative">
              <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
                <ul className="flex w-max list-none gap-2 md:w-auto md:flex-wrap">
                  {railItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="inline-flex min-h-touch items-center whitespace-nowrap rounded-pill border border-gold-500/25 bg-white px-4 py-2 text-chip font-medium text-text-secondary transition-colors duration-normal ease-standard hover:border-gold-500/50 hover:text-gold-700"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ivory-100 to-transparent md:hidden"
              />
            </nav>
          </Container>
        </Section>
      ) : null}

      <ServiceDecisionPanel problems={service.problems} benefits={service.benefits} />

      <ScopeDeliveryPanel scope={service.scope} deliverables={service.deliverables} />

      <ServiceDepthSections service={service} />

      {service.process?.length ? (
        <Section id="quy-trinh" tone="ivory">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Quy trình" title="Cách chúng tôi triển khai" align="center" />
            </ScrollReveal>
            <div className="mt-8 lg:mt-10">
              <ScrollReveal direction="up" distance={24} duration={0.7} delay={120}>
                <ProcessSteps steps={service.process} />
              </ScrollReveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {pricingGroups.length > 0 ? (
        <Section id="bang-gia">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Chi phí" title="Mức đầu tư tham khảo" align="center" />
            </ScrollReveal>
            <PricingTabs groups={pricingGroups} sourceComponent={`service-${service.slug}-pricing`} />
          </Container>
        </Section>
      ) : null}

      {faqs.length > 0 ? (
        <Section id="faq" tone="ivory">
          <Container width="editorial">
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Câu hỏi thường gặp" title="Những câu hỏi phổ biến" align="center" />
            </ScrollReveal>
            <div className="mt-8">
              <FAQAccordion items={faqs} columns={2} />
            </div>
          </Container>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section id="dich-vu-lien-quan">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Có thể bạn cần" title="Dịch vụ liên quan" />
            </ScrollReveal>
            {/* Row gọn thay cho lưới card: đây là lối rẽ sang trang khác, không phải một bản
                tóm tắt thứ hai của dịch vụ đó. Cũng bỏ luôn cảnh một card đứng lẻ trong lưới
                ba cột khi dịch vụ chỉ có một mục liên quan. */}
            <ul className="mt-6 flex list-none flex-col divide-y divide-border">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={serviceHref(item)}
                    className="group flex items-center gap-4 py-4 transition-colors duration-fast"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-ivory-50">
                      <Icon name={item.icon} size="card" className="text-gold-600" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-card-h3-mobile text-ink-950 transition-colors duration-fast group-hover:text-gold-700">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-small text-text-secondary">
                        {item.summary}
                      </span>
                    </span>
                    <Icon
                      name="chevron-right"
                      size="inline"
                      className="shrink-0 text-text-muted transition-transform duration-fast group-hover:translate-x-0.5 group-hover:text-gold-700"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <FinalCta
        variant="strip"
        sourceComponent={`service-${service.slug}-final-cta`}
        title={`Cần tư vấn về ${service.title}?`}
        description="Nhắn Zalo để trao đổi nhu cầu và nhận phương án phù hợp."
        secondaryHref="/dich-vu"
        secondaryLabel="Xem tất cả dịch vụ"
      />
    </>
  );
}

/** Only registry slugs resolve here; anything else is a 404 rather than a rendered shell. */
export const dynamicParams = false;
