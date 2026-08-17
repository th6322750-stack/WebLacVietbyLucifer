import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/conversion/ContactForm";
import { ContactChannelCard } from "@/components/conversion/ContactChannelCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { getFaqsByScope } from "@/content/faqs";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Liên hệ",
  description: "Liên hệ tư vấn miễn phí với Lạc Việt Media qua Zalo, Telegram hoặc để lại thông tin qua form.",
  path: "/lien-he",
});

const processSteps = [
  { title: "Để lại thông tin", description: "Điền form hoặc nhắn tin qua kênh bạn thuận tiện nhất." },
  { title: "Tư vấn nhu cầu", description: "Đội ngũ liên hệ lại để hiểu rõ mục tiêu của bạn." },
  { title: "Đề xuất giải pháp", description: "Nhận phương án và báo giá phù hợp." },
];

export default function ContactPage() {
  const faqs = getFaqsByScope("lien-he");

  return (
    <>
      <PageHero
        eyebrow="Liên hệ"
        title="Sẵn sàng lắng nghe nhu cầu của bạn"
        description="Để lại thông tin hoặc liên hệ trực tiếp qua Zalo, Telegram — Lạc Việt Media sẽ phản hồi trong thời gian sớm nhất."
        imageAssetId="contact-hero-master"
        imageAlt="Liên hệ Lạc Việt Media"
      />

      <Section id="consultation-section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div id="contact-form" className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="Nhận tư vấn" title="Điền thông tin để được liên hệ" />
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div id="contact-channels" className="flex flex-col gap-4">
              <ContactChannelCard brand="zalo" title="Zalo" value={siteSettings.zalo} href={`https://zalo.me/${siteSettings.zalo}`} />
              <ContactChannelCard
                brand="telegram"
                title="Telegram"
                value={siteSettings.telegram}
                href={`https://t.me/${siteSettings.telegram.replace("@", "")}`}
              />
              <ContactChannelCard icon="phone" title="Điện thoại" value={siteSettings.zalo} href={`tel:${siteSettings.zalo}`} />
              <ContactChannelCard brand="facebook" title="Facebook" value="Sắp cập nhật" disabled />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="contact-process" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="Điều gì xảy ra sau khi bạn liên hệ" align="center" />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section id="faq">
        <Container width="editorial">
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp trước khi liên hệ" align="center" />
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </Section>

      <Section id="secondary-contact-card" tone="ivory">
        <Container>
          <div className="flex flex-col items-center gap-3 rounded-lg border border-gold-300/60 bg-white p-8 text-center shadow-sm">
            <Icon name="map-pin" size="feature" className="text-gold-600" />
            <h3 className="text-h4-mobile text-ink-950">Địa chỉ văn phòng</h3>
            <p className="max-w-editorial text-body text-text-secondary">
              Thông tin địa chỉ văn phòng sẽ được cập nhật sau khi xác nhận với Lạc Việt Media.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="contact-final-cta" />
    </>
  );
}
