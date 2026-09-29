import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { SupportSignatureVisual } from "@/components/layout/SupportSignatureVisual";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import { FinalCta } from "@/components/layout/FinalCta";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import {
  findSupportService,
  supportServiceSlugs,
  relatedSupportServices,
} from "@/content/support-services";
import { isProductionVisible } from "@/lib/content-truth";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

/** Trang chi tiết từng nhóm support MXH — PHUONG_AN §7.4.
 *
 * Điểm khác biệt duy nhất đáng nói so với `/dich-vu/[slug]`: section "Phạm vi không bao gồm" là
 * BẮT BUỘC, không phải tuỳ chọn. Với các dịch vụ còn lại, thiếu một section chỉ là thiếu nội
 * dung. Với dịch vụ khôi phục tài khoản, không nói rõ giới hạn chính là để khách tự hiểu rằng
 * kết quả được bảo đảm — trong khi quyết định cuối cùng thuộc về nền tảng. Kiểu `SupportService`
 * bắt buộc trường `limits`, nên không thể publish một trang thiếu nó.
 */

export function generateStaticParams() {
  return supportServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findSupportService(slug);
  if (!service) {
    return pageMetadata({ title: "Support mạng xã hội", description: "", path: `/support-mxh/${slug}` });
  }
  return pageMetadata({
    title: `${service.title} | Lạc Việt Media`,
    description: `${service.description} Trao đổi phạm vi rõ ràng, đúng quy trình của nền tảng.`,
    path: `/support-mxh/${service.slug}`,
  });
}

export default async function SupportServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findSupportService(slug);
  if (!service || !isProductionVisible(service)) notFound();

  const related = relatedSupportServices(service.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: "Support mạng xã hội", path: "/support-mxh" },
        { name: service.title, path: `/support-mxh/${service.slug}` },
      ])} />

      <PageHero
        eyebrow="Support mạng xã hội"
        breadcrumbs={
          <Breadcrumbs
            onDark
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Support mạng xã hội", href: "/support-mxh" },
              { label: service.title },
            ]}
          />
        }
        title={service.title}
        description={service.intro}
        heroSlot={
          <SupportSignatureVisual
            assetId={service.visualAssetId}
            brand={service.brand}
            title={service.title}
            priority
          />
        }
      />

      <PageJumpNav
        items={[
          ...(service.symptoms?.length || service.scope?.length
            ? [{ href: "#dau-hieu-pham-vi", label: "Dấu hiệu & phạm vi" }]
            : []),
          { href: "#gioi-han", label: "Giới hạn" },
          ...(service.process?.length ? [{ href: "#quy-trinh", label: "Quy trình" }] : []),
          ...(related.length > 0 ? [{ href: "#dich-vu-lien-quan", label: "Liên quan" }] : []),
        ]}
      />

      {/* Dấu hiệu và phạm vi vào một split: đó là "bạn đang gặp gì" và "chúng tôi làm gì với
          nó" — hai vế của một câu, không phải hai danh mục ngang hàng. Hai lưới ba cột giống
          hệt nhau nối tiếp là thứ làm bốn trang support đọc như nhau.
          `limits` KHÔNG gộp vào đây: nó phải giữ khối riêng, xem chú thích bên dưới. */}
      {service.symptoms?.length || service.scope?.length ? (
        <Section id="dau-hieu-pham-vi" tone="ivory">
          <Container>
            <div
              className={`grid gap-8 ${
                service.symptoms?.length && service.scope?.length ? "lg:grid-cols-12 lg:gap-10" : ""
              }`}
            >
              {service.symptoms?.length ? (
                <ScrollReveal
                  direction="up"
                  distance={24}
                  duration={0.7}
                  className={service.scope?.length ? "lg:col-span-5" : ""}
                >
                  <div className="h-full rounded-2xl bg-ink-950 p-6 lg:p-8">
                    <p className="text-eyebrow uppercase tracking-[0.14em] text-gold-300">
                      Khi nào bạn cần hỗ trợ
                    </p>
                    <ul className="mt-5 flex list-none flex-col gap-4">
                      {service.symptoms.map((item) => (
                        <li key={item.title} className="flex items-start gap-3">
                          <Icon name="circle-alert" size="card" className="mt-px shrink-0 text-gold-300/70" />
                          <div className="min-w-0">
                            <p className="text-body font-medium text-white">{item.title}</p>
                            {item.body ? <p className="mt-1 text-small text-white/65">{item.body}</p> : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ) : null}

              {service.scope?.length ? (
                <ScrollReveal
                  direction="up"
                  distance={24}
                  duration={0.7}
                  delay={service.symptoms?.length ? 120 : 0}
                  className={service.symptoms?.length ? "lg:col-span-7" : ""}
                >
                  <div className="h-full lg:pl-2">
                    <SectionHeading eyebrow="Phạm vi" title="Chúng tôi làm những gì" />
                    <ul className="mt-5 flex list-none flex-col divide-y divide-border">
                      {service.scope.map((item) => (
                        <li key={item.title} className="flex items-start gap-3 py-4 first:pt-0">
                          <Icon name="circle-check" size="card" className="mt-px shrink-0 text-state-success" />
                          <div className="min-w-0">
                            <p className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">
                              {item.title}
                            </p>
                            {item.body ? <p className="mt-1 text-body text-text-secondary">{item.body}</p> : null}
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
      ) : null}

      {/* Không bọc trong điều kiện: `limits` là trường bắt buộc của kiểu dữ liệu. Đặt NGAY SAU
          phạm vi, cùng trọng lượng thị giác — không phải chữ mờ ở chân trang. */}
      <Section id="gioi-han">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              eyebrow="Minh bạch"
              title="Phạm vi không bao gồm"
              description="Nói rõ từ đầu để bạn quyết định đúng, thay vì phát hiện ra giữa chừng."
            />
          </ScrollReveal>
          {/* Viền vàng, không phải đỏ cảnh báo: đây là thông tin để khách quyết định đúng, không
              phải một lỗi. Đỏ làm khối này đọc như một cảnh báo nguy hiểm và khách sẽ bỏ qua. */}
          <ul className="mt-8 grid list-none gap-3 rounded-2xl border border-gold-500/30 bg-ivory-50 p-6 md:grid-cols-2 md:gap-x-8">
            {service.limits.map((limit) => (
              <li key={limit} className="flex items-start gap-3">
                <Icon name="circle-alert" size="card" className="mt-px shrink-0 text-gold-600" />
                <span className="text-body text-text-secondary">{limit}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {service.process?.length ? (
        <Section id="quy-trinh">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Quy trình" title="Cách chúng tôi xử lý" align="center" />
            </ScrollReveal>
            <div className="mt-10">
              <ScrollReveal direction="up" distance={24} duration={0.7} delay={120}>
                <ProcessSteps steps={service.process} />
              </ScrollReveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section id="dich-vu-lien-quan" tone="ivory">
          <Container>
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <SectionHeading eyebrow="Có thể bạn cần" title="Dịch vụ support liên quan" />
            </ScrollReveal>
            <ul className="mt-6 flex list-none flex-col divide-y divide-border">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/support-mxh/${item.slug}`}
                    className="group flex items-center gap-4 py-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-white">
                      {item.brand ? <BrandMark name={item.brand} size={22} /> : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-card-h3-mobile text-ink-950 transition-colors duration-fast group-hover:text-gold-700">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-small text-text-secondary">{item.description}</span>
                    </span>
                    <Icon name="chevron-right" size="inline" className="shrink-0 text-text-muted transition-transform duration-fast group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <FinalCta
        sourceComponent={`support-${service.slug}-final-cta`}
        defaultService={service.title}
        title={`Cần hỗ trợ ${service.title}?`}
        description="Nhắn Zalo để trao đổi tình trạng kênh và nhận phương án phù hợp."
        secondaryHref="/support-mxh"
        secondaryLabel="Xem tất cả dịch vụ support"
      />
    </>
  );
}

export const dynamicParams = false;
