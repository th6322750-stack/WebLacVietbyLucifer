import type { IconName } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import { FinalCta } from "@/components/layout/FinalCta";

export type ResourceSection = {
  title: string;
  body: string;
  icon?: IconName;
};

/** Shared layout for the reference site's support, policy and recruitment pages.
 *
 * The copy is intentionally operational rather than legalistic: it tells the visitor what is
 * currently true and points to a consultation when a contract-specific decision is required.
 * This keeps old Maxweb links useful without inventing a legal entity, SLA, payment gateway or
 * vendor relationship that the owner has not verified yet.
 */
export function ResourcePage({
  eyebrow,
  title,
  description,
  sections,
  notice,
  ctaTitle = "Cần trao đổi cụ thể hơn?",
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: ResourceSection[];
  notice?: string;
  ctaTitle?: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        breadcrumbs={<Breadcrumbs onDark items={[{ label: "Trang chủ", href: "/" }, { label: title }]} />}
        title={title}
        description={description}
      />

      <PageJumpNav
        items={[
          ...sections.map((section, index) => ({ href: `#resource-section-${index + 1}`, label: section.title })),
          { href: "#resource-scope", label: "Phạm vi" },
        ]}
      />

      <Section id="resource-content">
        <Container width="editorial">
          {notice ? (
            <div className="mb-8 flex items-start gap-3 rounded-2xl border border-gold-500/25 bg-gold-500/10 p-5 text-small text-text-secondary">
              <Icon name="circle-alert" size="default" className="mt-0.5 shrink-0 text-gold-600" />
              <p>{notice}</p>
            </div>
          ) : null}
          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((section, index) => (
              <article id={`resource-section-${index + 1}`} key={section.title} className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/45 hover:shadow-md">
                {section.icon ? (
                  <span className="mb-4 grid size-10 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-700">
                    <Icon name={section.icon} size="default" />
                  </span>
                ) : null}
                <h2 className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">{section.title}</h2>
                <p className="mt-3 text-body text-text-secondary">{section.body}</p>
              </article>
            ))}
          </div>
          <div id="resource-scope" className="mt-12 scroll-mt-24 rounded-2xl border border-gold-500/20 bg-ivory-100/70 p-6 md:p-8">
            <SectionHeading
              eyebrow="Lưu ý"
              title="Phạm vi được chốt theo từng nhu cầu"
              description="Mỗi dự án có hiện trạng, quyền truy cập và đầu ra khác nhau. Lạc Việt sẽ xác nhận phạm vi, chi phí và mốc bàn giao trước khi bắt đầu."
            />
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="resource-page-final-cta" title={ctaTitle} />
    </>
  );
}
