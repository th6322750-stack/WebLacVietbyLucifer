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
        heroRole="heroDisplay"
        eyebrow="Liên hệ – Nhận tư vấn"
        title={
          <>
            LẠC VIỆT
            <br />
            <span className="text-gold-500">MEDIA AGENCY</span>
          </>
        }
        description="Chúng tôi luôn sẵn sàng lắng nghe và tư vấn giải pháp phù hợp nhất cho mục tiêu của bạn."
        imageAssetId="contact-hero-master"
        imageAlt="Liên hệ Lạc Việt Media"
        // Transcribed from the approved master hero (page 12).
        proofItems={[
          { icon: "clock", title: "Phản hồi nhanh", note: "Trong 30 phút" },
          { icon: "messages-square", title: "Tư vấn miễn phí", note: "Giải pháp phù hợp" },
          { icon: "lock-keyhole", title: "Bảo mật thông tin", note: "Cam kết tuyệt đối" },
        ]}
      />

      <Section id="consultation-section">
        <Container>
          {/* RECOVERY V2 (audit §10, master ui-009): desktop is intro/checklist on the LEFT and
              the form on the RIGHT. The previous form-left + narrow channel-rail composition is
              explicitly listed for removal; channels are now their own 4-equal-card row below. */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div id="contact-intro">
              <SectionHeading eyebrow="Nhận tư vấn" title="Bạn cần hỗ trợ điều gì?" />
              <p className="mt-4 text-body-lg text-text-secondary">
                Để lại thông tin, đội ngũ Lạc Việt Media sẽ liên hệ tư vấn giải pháp phù hợp với
                nhu cầu và ngân sách của bạn.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  "Tư vấn miễn phí, không ràng buộc",
                  "Phản hồi trong giờ làm việc",
                  "Báo giá minh bạch theo đúng phạm vi",
                  "Đồng hành hỗ trợ sau bàn giao",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-body text-text-secondary">
                    <Icon name="circle-check" size="default" className="mt-px shrink-0 text-state-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="contact-form" className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* Channel set per .webby/ASSET_USAGE_MAP.json "/lien-he" (GD10 authority correction):
          brandMarks zalo/messenger/telegram + contactIcon icon-mail as the 4th
          "fourthChannel: EMAIL PENDING_DISABLED" card. Messenger stays disabled since
          facebookUrl is still unconfirmed per CONTENT_TRUTH.json; Email is disabled for the
          same reason — productionEmail is TBD, never invented.
          RECOVERY V2: four EQUAL cards in a row, not a narrow sidebar rail. */}
      <Section id="quick-channels" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Liên hệ nhanh" title="Kết nối với chúng tôi qua các kênh sau" align="center" />
          <div id="contact-channels" className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <ContactChannelCard
              brand="zalo"
              title="Zalo Official"
              description="Nhắn tin nhanh qua Zalo để được hỗ trợ ngay."
              ctaLabel="Nhắn trên Zalo"
              value={siteSettings.zalo}
              href={`https://zalo.me/${siteSettings.zalo}`}
            />
            <ContactChannelCard
              brand="messenger"
              title="Facebook Messenger"
              description="Chat trực tiếp qua Fanpage Lạc Việt Media Agency."
              value="Sắp cập nhật"
              disabled
            />
            <ContactChannelCard
              brand="telegram"
              title="Telegram"
              description="Trao đổi nhanh và bảo mật qua Telegram."
              ctaLabel="Nhắn trên Telegram"
              value={siteSettings.telegram}
              href={`https://t.me/${siteSettings.telegram.replace("@", "")}`}
            />
            <ContactChannelCard
              icon="mail"
              title="Email"
              description="Gửi yêu cầu chi tiết qua email để chúng tôi phản hồi."
              value="Sắp cập nhật"
              disabled
            />
          </div>
        </Container>
      </Section>

      <Section id="contact-process">
        <Container>
          <SectionHeading eyebrow="Quy trình làm việc" title="Điều gì sẽ xảy ra sau khi bạn gửi thông tin?" align="center" />
          <div className="mt-10">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section id="faq">
        <Container>
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Những câu hỏi phổ biến" align="center" />
          <div className="mt-8 grid gap-5 md:gap-8 lg:grid-cols-[1fr_320px]">
            <FAQAccordion items={faqs} columns={2} />
            <div id="secondary-contact-card">
              <ContactQuestionCard />
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta variant="strip" sourceComponent="contact-final-cta" title="Sẵn sàng bứt phá cùng Lạc Việt?" />
    </>
  );
}
