import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import { ShieldOrbit } from "@/components/layout/ShieldOrbit";
import { ServiceCard } from "@/components/content/ServiceCard";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { SupportHeroCta } from "./SupportInteractive";
import { getFaqsByScope } from "@/content/faqs";
import { visibleSupportServices } from "@/content/support-services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Support mạng xã hội | Lạc Việt Media",
  description:
    "Hỗ trợ vận hành, khắc phục sự cố và phát triển kênh Facebook, TikTok, YouTube cho doanh nghiệp.",
  path: "/support-mxh",
});

import { BrandMark } from "@/components/ui/BrandMark";

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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Support mạng xã hội", path: "/support-mxh" },
        ])}
      />
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
          { icon: "lock-keyhole", title: "Bảo mật thông tin", note: "Không lưu mật khẩu" },
          { icon: "target", title: "Minh bạch phạm vi", note: "Nêu rõ điều kiện xử lý" },
        ]}
        description="Hỗ trợ Facebook, TikTok, Business & Ads theo quy trình chính thống. Đồng hành cùng bạn khắc phục và phát triển kênh bền vững."
        imageAssetId="support-hero-master"
        imageAlt="Support mạng xã hội Lạc Việt Media"
        cta={<SupportHeroCta />}
      />

      <PageJumpNav
        items={[
          { href: "#support-network-map", label: "Mạng lưới" },
          { href: "#support-service-grid", label: "Dịch vụ" },
          { href: "#common-issues-grid", label: "Sự cố thường gặp" },
          { href: "#support-process", label: "Quy trình" },
          { href: "#faq", label: "Câu hỏi" },
        ]}
      />

      {/* PRO V2.2 §6: a signature section right after the hero so the page doesn't drop straight
          from ShieldOrbit into a plain card grid — "kéo ngôn ngữ hero xuống body." Deliberately
          NOT a second orbit (brief explicitly says not to on this page): a static platform row
          (same 6 real brand marks ShieldOrbit already orbits, just laid flat) plus a condensed
          5-stage flow strip. The full titled process further down the page already covers this
          in detail — this is the compact, glanceable version, not a duplicate. */}
      <Section id="support-network-map" tone="dark" texture>
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              onDark
              eyebrow="Mạng lưới hỗ trợ"
              title="Bảo vệ và hỗ trợ trên các nền tảng bạn đang dùng"
              align="center"
            />
          </ScrollReveal>
          <ScrollReveal direction="up" distance={20} duration={0.7} delay={100}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {(["facebook", "tiktok", "meta", "messenger", "youtube", "zalo"] as const).map((brand) => (
                <li
                  key={brand}
                  className="flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-4 py-2"
                >
                  <BrandMark name={brand} size={20} />
                  <span className="text-small capitalize text-white/80">{brand}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={20} duration={0.7} delay={200}>
            <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
              {["Nhận yêu cầu", "Xác minh", "Xử lý", "Bảo vệ", "Bàn giao"].map((stage, idx, arr) => (
                <li key={stage} className="flex items-center gap-2">
                  <span className="rounded-pill border border-gold-500/30 bg-gold-500/10 px-3 py-1.5 text-caption font-semibold uppercase tracking-wide text-gold-300">
                    {String(idx + 1).padStart(2, "0")} · {stage}
                  </span>
                  {idx < arr.length - 1 ? (
                    <Icon name="chevron-right" size="inline" className="text-white/30" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </Container>
      </Section>

      <Section id="support-service-grid">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Dịch vụ" title="Chúng tôi hỗ trợ toàn diện các nền tảng mạng xã hội phổ biến" align="center" />
          </ScrollReveal>
          {/* CTA "Xem chi tiết" trước đây trỏ về /lien-he — nút nói một đằng, đi một nẻo. Giờ
              mỗi nhóm có trang riêng ở /support-mxh/[slug], nơi ghi rõ cả phạm vi lẫn giới hạn
              của dịch vụ. */}
          <div className="mt-8 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleSupportServices().map((service, idx) => (
              <ScrollReveal key={service.slug} direction="up" distance={24} duration={0.7} delay={idx * 120}>
                <ServiceCard
                  mobileRow
                  bullets={service.bullets}
                  brand={service.brand}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  ctaLabel="Xem chi tiết"
                  href={`/support-mxh/${service.slug}`}
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
          {/* §6.5: giữ 2 cột ở mobile, chỉ rút khoảng cách nội bộ — padding và gap nhỏ hơn,
              body text KHÔNG giảm (§7 cấm hạ dưới 16px để ép vừa chiều cao). */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
            {commonIssues.map((item, idx) => (
              <ScrollReveal key={item.label} direction="up" distance={20} duration={0.6} delay={Math.min(idx, 3) * 80}>
                <div className="flex h-full flex-col items-center gap-1.5 rounded-xl border border-gold-500/20 bg-white p-3 text-center shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-md md:p-5 md:hover:-translate-y-1">
                  <Icon name={item.icon} size="card" className="text-gold-600" />
                  <p className="text-small font-semibold text-ink-950">{item.label}</p>
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
          {/* Divider row thay cho năm ô rời: năm nhãn ngắn dàn đều trên một hàng rộng để lại
              quá nhiều khoảng trống giữa các mục, và ở mobile chúng thành năm dòng đơn độc. */}
          {/* Mobile 2 cột (mục thứ năm trọn hàng cuối) thay vì năm hàng đơn độc — năm nhãn ngắn
              xếp dọc chiếm hơn 700px cho khoảng 60 chữ. */}
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-5 lg:gap-0">
            {whyUs.map((item, idx) => (
              <ScrollReveal key={item.label} direction="up" distance={20} duration={0.6} delay={Math.min(idx, 3) * 100} className={idx === 4 ? "col-span-2 lg:col-span-1" : undefined}>
                <div className="flex h-full flex-col items-center gap-2 text-center lg:border-l lg:border-white/10 lg:px-4 lg:first:border-l-0">
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

      {/* Dải "support-metrics" đã bị gỡ (PHUONG_AN §6.7): 200+ khách hàng / 98% tỷ lệ khôi phục
          / 24/7 hỗ trợ / 100% bảo mật. Cả bốn đều tự khai `demoOnly` trong chính dữ liệu của
          nó. Hai con số giữa còn nguy hiểm hơn phần còn lại: "98% tỷ lệ khôi phục thành công"
          là cam kết kết quả cho một việc mà quyết định cuối cùng thuộc về Meta/TikTok chứ không
          thuộc về Lạc Việt, và "100% bảo mật" thì không ai trên đời cam kết được. */}

      {/* Process phía trên đã là ivory; hai section ivory liền nhau đọc thành một khối dài
          không có mép. Đổi sang nền sáng để tách nhịp. */}
      <Section id="faq">
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
