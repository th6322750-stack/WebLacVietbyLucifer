import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/conversion/ContactForm";
import { ContactChannelCard } from "@/components/conversion/ContactChannelCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { ContactQuestionCard } from "./ContactQuestionCard";
import { getFaqsByScope } from "@/content/faqs";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Liên hệ",
  description: "Liên hệ tư vấn miễn phí với Lạc Việt Media qua Zalo, Telegram hoặc để lại thông tin qua form.",
  path: "/lien-he",
});

// 5-step process per approved master (page-12) — not 3.
const processSteps = [
  { title: "Tiếp nhận thông tin", description: "Ghi nhận yêu cầu qua form hoặc kênh bạn thuận tiện nhất." },
  { title: "Liên hệ tư vấn", description: "Đội ngũ liên hệ lại để hiểu rõ mục tiêu của bạn." },
  { title: "Đề xuất giải pháp", description: "Xây dựng phương án và báo giá phù hợp." },
  { title: "Thống nhất triển khai", description: "Chốt phạm vi, thời gian và ngân sách cụ thể." },
  { title: "Đồng hành & tối ưu", description: "Triển khai và tiếp tục hỗ trợ sau khi bàn giao." },
];

export default function ContactPage() {
  const faqs = getFaqsByScope("lien-he");

  return (
    <>
      <PageHero
        eyebrow="Liên hệ – Nhận tư vấn"
        title={siteSettings.brandName}
        description="Chúng tôi luôn sẵn sàng lắng nghe và tư vấn giải pháp phù hợp nhất cho mục tiêu của bạn."
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

            {/* Channel set per .webby/ASSET_USAGE_MAP.json "/lien-he" (GD10 authority
                correction): brandMarks zalo/messenger/telegram + contactIcon icon-mail as the
                4th "fourthChannel: EMAIL PENDING_DISABLED" card. Messenger stays disabled
                since facebookUrl is still unconfirmed per CONTENT_TRUTH.json; Email is
                disabled for the same reason — productionEmail is TBD, never invented. */}
            <div id="contact-channels" className="flex flex-col gap-4">
              <ContactChannelCard brand="zalo" title="Zalo" value={siteSettings.zalo} href={`https://zalo.me/${siteSettings.zalo}`} />
              <ContactChannelCard brand="messenger" title="Facebook Messenger" value="Sắp cập nhật" disabled />
              <ContactChannelCard
                brand="telegram"
                title="Telegram"
                value={siteSettings.telegram}
                href={`https://t.me/${siteSettings.telegram.replace("@", "")}`}
              />
              <ContactChannelCard icon="mail" title="Email" value="Sắp cập nhật" disabled />
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
        <Container>
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Những câu hỏi phổ biến" align="center" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <FAQAccordion items={faqs} />
            <div id="secondary-contact-card">
              <ContactQuestionCard />
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="contact-final-cta" title="Sẵn sàng bứt phá cùng Lạc Việt?" />
    </>
  );
}
