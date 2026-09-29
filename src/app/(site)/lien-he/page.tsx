import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import { PageSignatureAsset } from "@/components/layout/PageSignatureAsset";
import { ContactChannelCard } from "@/components/conversion/ContactChannelCard";
import { DirectZaloLink } from "@/components/conversion/DirectZaloLink";
import { zaloUrl } from "@/lib/zalo";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { ContactQuestionCard } from "./ContactQuestionCard";
import { getFaqsByScope } from "@/content/faqs";
import { siteSettings } from "@/lib/site-settings";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Liên hệ tư vấn | Lạc Việt Media",
  description: "Liên hệ tư vấn miễn phí với Lạc Việt Media qua Zalo hoặc Telegram để nhận phương án phù hợp.",
  path: "/lien-he",
});

// 5-step process per approved master (page-12) — not 3.
const processSteps = [
  { title: "Tiếp nhận thông tin", description: "Ghi nhận yêu cầu qua Zalo hoặc kênh bạn thuận tiện nhất." },
  { title: "Liên hệ tư vấn", description: "Đội ngũ liên hệ lại để hiểu rõ mục tiêu của bạn." },
  { title: "Đề xuất giải pháp", description: "Xây dựng phương án và báo giá phù hợp." },
  { title: "Thống nhất triển khai", description: "Chốt phạm vi, thời gian và ngân sách cụ thể." },
  { title: "Đồng hành & tối ưu", description: "Triển khai và tiếp tục hỗ trợ sau khi bàn giao." },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  const faqs = getFaqsByScope("lien-he");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Liên hệ", path: "/lien-he" },
        ])}
      />
      <PageHero
        heroRole="heroDisplay"
        eyebrow="Liên hệ – Nhận tư vấn"
        breadcrumbs={<Breadcrumbs onDark items={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]} />}
        title={
          <>
            LẠC VIỆT
            <br />
            <span className="text-gold-500">MEDIA AGENCY</span>
          </>
        }
        description="Chúng tôi luôn sẵn sàng lắng nghe và tư vấn giải pháp phù hợp nhất cho mục tiêu của bạn."
        // PRO V2.2 §9: `imageAssetId` never actually rendered anything — PageHero's visual slot
        // only checks `heroSlot`/`heroImage`, not this prop (see its own comment) — so the right
        // column was silently empty on desktop this whole time. `heroSlot` is the real hook.
        heroSlot={
          <PageSignatureAsset
            assetId="v7-page-contact"
            priority
            className="mx-auto w-[220px] lg:w-[360px]"
          />
        }
        proofItems={[
          // Do not publish a response-time promise until an owner-approved SLA exists.
          // The contact page still communicates the available channel without inventing a number.
          { icon: "clock", title: "Phản hồi theo lượt", note: "Trong giờ làm việc" },
          { icon: "messages-square", title: "Tư vấn miễn phí", note: "Giải pháp phù hợp" },
          { icon: "lock-keyhole", title: "Bảo mật thông tin", note: "Xử lý cẩn trọng" },
        ]}
      />

      <PageJumpNav
        items={[
          { href: "#consultation-section", label: "Nhận tư vấn" },
          { href: "#quick-channels", label: "Kênh liên hệ" },
          { href: "#contact-process", label: "Quy trình" },
          { href: "#faq", label: "Câu hỏi" },
        ]}
      />

      <Section id="consultation-section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal direction="left" distance={20} duration={0.6} className="h-full">
              <div id="contact-intro">
                <SectionHeading eyebrow="Nhận tư vấn" title="Bạn cần hỗ trợ điều gì?" />
                <p className="mt-4 text-body-lg text-text-secondary">
                  Nhắn Zalo cho đội ngũ Lạc Việt Media để được tư vấn giải pháp phù hợp với nhu cầu
                  và ngân sách của bạn.
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
            </ScrollReveal>

            <ScrollReveal direction="right" distance={20} duration={0.6} delay={100} className="h-full">
              {/* Form thay bằng nút Zalo trực tiếp: một cuộc trò chuyện chuyển đổi khách hàng
                  tốt hơn một biểu mẫu chờ gọi lại, và bớt được một bước nhập liệu. */}
              <div
                id="contact-form"
                className="flex h-full flex-col items-center justify-center gap-6 rounded-2xl border border-gold-500/20 bg-white p-10 text-center shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-xl"
              >
                <span className="grid size-16 place-items-center rounded-full bg-gold-500/10 text-gold-600">
                  <Icon name="messages-square" size="feature" />
                </span>
                <div>
                  <h3 className="text-card-h3-mobile lg:text-card-h3-desktop font-heading text-ink-950">
                    Nhắn Zalo, tư vấn ngay
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">
                    Bấm nút bên dưới để trò chuyện trực tiếp với Lạc Việt Media trên Zalo — không
                    cần điền form, không cần chờ gọi lại.
                  </p>
                </div>
                <DirectZaloLink
                  sourceComponent="lien-he-primary-zalo"
                  className="inline-flex min-h-touch items-center gap-2 rounded-pill bg-gold-500 px-6 py-3 text-button font-semibold text-ink-950 transition-colors hover:bg-gold-600"
                >
                  <Icon name="messages-square" size="inline" />
                  Nhắn tin qua Zalo
                </DirectZaloLink>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section id="quick-channels" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Liên hệ nhanh" title="Kết nối với chúng tôi qua các kênh sau" align="center" />
          </ScrollReveal>
          {/* Hai tầng, không phải bốn ô ngang hàng. Trước đây hai kênh dùng được và hai kênh
              "Sắp cập nhật" có cùng kích thước và trọng lượng, nên hàng card đọc như một sản
              phẩm làm dở — trong khi thực tế là hai kênh chính đang hoạt động tốt. */}
          <div id="contact-channels" className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                brand: "zalo" as const,
                title: "Zalo Official",
                description: "Nhắn tin nhanh qua Zalo để được hỗ trợ ngay.",
                ctaLabel: "Nhắn trên Zalo",
                value: siteSettings.zalo,
                href: zaloUrl(),
              },
              {
                brand: "telegram" as const,
                title: "Telegram",
                description: "Trao đổi nhanh và bảo mật qua Telegram.",
                ctaLabel: "Nhắn trên Telegram",
                value: siteSettings.telegram,
                href: `https://t.me/${siteSettings.telegram.replace("@", "")}`,
              },
            ].map((c, idx) => (
              <ScrollReveal key={c.title} direction="up" distance={20} duration={0.6} delay={idx * 100}>
                <ContactChannelCard {...c} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-white px-5 py-4">
            <p className="text-eyebrow uppercase tracking-[0.14em] text-text-muted">
              Kênh đang cập nhật
            </p>
            {/* Chữ giữ đủ tương phản để đọc được; chỉ trọng lượng thị giác giảm. Làm mờ đến mức
                khó đọc là biến một thông tin thật thành một vệt xám vô nghĩa. */}
            <ul className="mt-2 flex list-none flex-wrap gap-x-6 gap-y-1">
              {["Facebook Messenger", "Email"].map((name) => (
                <li key={name} className="flex items-center gap-2 text-small text-text-secondary">
                  <Icon name="clock" size="inline" className="shrink-0 text-text-muted" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section id="contact-process">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Quy trình làm việc" title="Điều gì xảy ra sau khi bạn bắt đầu trao đổi?" align="center" />
          </ScrollReveal>
          <div className="mt-10">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={150}>
              <ProcessSteps steps={processSteps} />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section id="faq">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Câu hỏi thường gặp" title="Những câu hỏi phổ biến" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:gap-8 lg:grid-cols-[1fr_320px]">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={100}>
              <FAQAccordion items={faqs} columns={2} />
            </ScrollReveal>
            <div id="secondary-contact-card">
              <ScrollReveal direction="up" distance={24} duration={0.7} delay={200}>
                <ContactQuestionCard />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta variant="strip" sourceComponent="contact-final-cta" title="Sẵn sàng bứt phá cùng Lạc Việt?" />
    </>
  );
}
