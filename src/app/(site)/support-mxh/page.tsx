import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { ShieldOrbit } from "@/components/layout/ShieldOrbit";
import { ServiceCard } from "@/components/content/ServiceCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { MetricStrip } from "@/components/content/MetricStrip";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { SupportHeroCta } from "./SupportInteractive";
import { getFaqsByScope } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Support mạng xã hội",
  description:
    "Hỗ trợ vận hành, khắc phục sự cố và phát triển kênh Facebook, TikTok, YouTube cho doanh nghiệp.",
  path: "/support-mxh",
});

import { BrandName } from "@/components/ui/BrandMark";

// 4 service cards per approved master (page-05) — one per platform + strategy consulting.
const supportServices: {
  brand?: BrandName;
  icon?: IconName;
  title: string;
  description: string;
  bullets: string[];
}[] = [
  {
    brand: "facebook",
    title: "Facebook Support",
    description: "Khắc phục lỗi trang, tài khoản quảng cáo bị hạn chế hoặc khoá.",
    bullets: [
      "Khôi phục tài khoản cá nhân",
      "Khôi phục Fanpage bị khóa",
      "Gỡ hạn chế, checkpoint",
      "Hỗ trợ vấn đề đăng nhập",
    ],
  },
  {
    brand: "tiktok",
    title: "TikTok Support",
    description: "Xử lý sự cố tài khoản, video bị hạn chế hiển thị.",
    bullets: [
      "Khôi phục tài khoản TikTok",
      "Mở khóa tài khoản bị cấm",
      "Gỡ hạn chế tương tác",
      "Hỗ trợ vấn đề đăng nhập",
    ],
  },
  {
    brand: "meta",
    title: "Meta Business / Ads Support",
    description: "Quản lý và khắc phục sự cố Meta Business Suite, tài khoản quảng cáo.",
    bullets: [
      "Khôi phục Trình quản lý BM",
      "Gỡ hạn chế tài khoản quảng cáo",
      "Xác minh doanh nghiệp",
      "Hỗ trợ thanh toán & hoá đơn",
    ],
  },
  {
    // Was a gold shield icon; replaced with the blue verified badge at Lucifer's request, since
    // this card is about getting an account verified and recovered rather than security in the
    // abstract.
    brand: "verified",
    // Title transcribed from the master crop; the previous wording was not the approved text.
    title: "Tư vấn bảo mật & Khôi phục hợp lệ",
    description: "Tư vấn bảo mật và khôi phục quyền sở hữu hợp lệ cho kênh của bạn.",
    bullets: [
      "Tư vấn bảo mật tài khoản",
      "Hướng dẫn lấy lại quyền sở hữu",
      "Bảo vệ kênh trước rủi ro",
      "Đào tạo & hướng dẫn sử dụng",
    ],
  },
];

// 6 issues per approved master. Labels and the supporting line are transcribed from the master
// crop — the previous labels were paraphrases and the description line was missing.
const commonIssues: { icon: IconName; label: string; description: string }[] = [
  { icon: "lock-keyhole", label: "Tài khoản bị khóa / vô hiệu hóa", description: "Không thể đăng nhập hoặc tài khoản bị vô hiệu hóa." },
  { icon: "circle-alert", label: "Mất quyền truy cập", description: "Không còn email, số điện thoại hoặc xác thực 2 lớp." },
  { icon: "shield-check", label: "Page bị gỡ / hạn chế", description: "Fanpage bị gỡ hoặc giảm tương tác." },
  { icon: "users", label: "BM / Ads bị hạn chế", description: "Tài khoản quảng cáo hoặc BM bị vô hiệu hóa." },
  { icon: "target", label: "Bị checkpoint / xác minh", description: "Liên tục yêu cầu xác minh danh tính." },
  { icon: "messages-square", label: "Khác", description: "Các vấn đề khác liên quan đến mạng xã hội." },
];

// 5 icons per approved master — not 3.
const whyUs: { icon: IconName; label: string }[] = [
  { icon: "clock", label: "Phản hồi trong ngày làm việc" },
  { icon: "badge-check", label: "Đúng chính sách nền tảng" },
  { icon: "shield-check", label: "An toàn – bảo mật" },
  { icon: "headset", label: "Hỗ trợ tận tâm" },
  { icon: "users", label: "Đội ngũ nhiều kinh nghiệm thực tế" },
];

// 5-step process per approved master — not 3.
const processSteps = [
  { title: "Tiếp nhận yêu cầu", description: "Ghi nhận chi tiết tình trạng và thời điểm phát sinh." },
  { title: "Phân tích & tư vấn", description: "Rà soát chính sách và lịch sử hoạt động liên quan." },
  { title: "Triển khai hỗ trợ", description: "Thực hiện khắc phục theo đúng quy trình nền tảng." },
  { title: "Cập nhật tiến độ", description: "Thông báo tiến độ xử lý rõ ràng, minh bạch." },
  { title: "Bàn giao & hướng dẫn", description: "Bàn giao kết quả và hướng dẫn phòng tránh tái diễn." },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function SupportMxhPage() {
  const faqs = getFaqsByScope("support-mxh");

  return (
    <>
      <PageHero
        heroSlot={<ShieldOrbit className="w-full max-w-[640px]" />}
        eyebrow="Support MXH"
        breadcrumbs={
          <Breadcrumbs
            onDark
            items={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ" }, { label: "Hỗ trợ mạng xã hội" }]}
          />
        }
        // Master page 5 splits the H1: the first line white, the promise line gold.
        title={
          <>
            HỖ TRỢ MẠNG XÃ HỘI
            <br />
            <span className="text-gold-500">CHÍNH CHỦ – AN TOÀN – HIỆU QUẢ</span>
          </>
        }
        // Four icon proof items, transcribed from the approved hero.
        proofItems={[
          { icon: "badge-check", title: "Xử lý chính chủ", note: "Theo quan hệ trực tiếp" },
          { icon: "clock", title: "Theo quy trình", note: "Làm việc với hệ thống chính thức" },
          { icon: "lock-keyhole", title: "Bảo mật tuyệt đối", note: "Không lưu mật khẩu" },
          { icon: "target", title: "Tỉ lệ thành công cao", note: "Tối ưu thời gian & chi phí" },
        ]}
        description="Hỗ trợ Facebook, TikTok, Business & Ads theo quy trình chính thống. Đồng hành cùng bạn khắc phục và phát triển kênh bền vững."
        imageAssetId="support-hero-master"
        imageAlt="Support mạng xã hội Lạc Việt Media"
        cta={<SupportHeroCta />}
      />

      <Section id="support-service-grid">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Dịch vụ" title="Chúng tôi hỗ trợ toàn diện các nền tảng mạng xã hội phổ biến" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportServices.map((s, idx) => (
              <ScrollReveal key={s.title} direction="up" distance={24} duration={0.7} delay={idx * 120}>
                <ServiceCard
                  mobileRow
                  bullets={s.bullets}
                  brand={s.brand}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  ctaLabel="Xem chi tiết"
                  href="/lien-he"
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="common-issues-grid" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Sự cố thường gặp" title="Bạn đang gặp phải vấn đề nào?" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-6">
            {commonIssues.map((item, idx) => (
              <ScrollReveal key={item.label} direction="up" distance={20} duration={0.6} delay={idx * 80}>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-gold-500/20 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-md md:p-5">
                  <Icon name={item.icon} size="feature" className="text-gold-600" />
                  <p className="mt-1 text-small font-semibold text-ink-950">{item.label}</p>
                  <p className="text-caption leading-snug text-text-secondary">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="why-lac-viet" tone="dark" texture>
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading onDark eyebrow="Vì sao chọn Lạc Việt Media Agency" title="Nhanh – Rõ ràng – Hỗ trợ tận tâm" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((item, idx) => (
              <ScrollReveal key={item.label} direction="up" distance={20} duration={0.6} delay={idx * 100}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <Icon name={item.icon} size="feature" className="text-gold-300" />
                  <p className="text-body text-white/85">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="support-process" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Quy trình" title="5 bước hỗ trợ chuyên nghiệp" align="center" />
          </ScrollReveal>
          <div className="mt-10">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={150}>
              <ProcessSteps steps={processSteps} />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section id="support-metrics" tone="dark" texture>
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.7}>
            <MetricStrip
              onDark
              metrics={[
                { value: "200+", label: "Khách hàng đã hỗ trợ", demoOnly: true },
                { value: "98%", label: "Tỷ lệ khôi phục thành công", demoOnly: true },
                { value: "24/7", label: "Hỗ trợ liên tục", demoOnly: true },
                { value: "100%", label: "Bảo mật thông tin", demoOnly: true },
              ]}
            />
          </ScrollReveal>
        </Container>
      </Section>

      <Section id="faq" tone="ivory">
        <Container width="editorial">
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp về dịch vụ support MXH" align="center" />
          </ScrollReveal>
          <div className="mt-10">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={100}>
              <FAQAccordion items={faqs} columns={2} />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="support-impact-cta" defaultService="Support mạng xã hội" />
    </>
  );
}
