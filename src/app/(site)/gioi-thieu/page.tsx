import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/content/ServiceCard";
import { FinalCta } from "@/components/layout/FinalCta";
import { assetPath } from "@/lib/assets";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Giới thiệu",
  description: `Tìm hiểu về ${siteSettings.brandName} — đối tác số toàn diện cho doanh nghiệp Việt Nam.`,
  path: "/gioi-thieu",
});

const brandValues: { icon: IconName; label: string; description: string }[] = [
  { icon: "shield-check", label: "Tin cậy", description: "Cam kết đúng phạm vi và tiến độ đã thống nhất." },
  { icon: "sparkles", label: "Tận tâm", description: "Đồng hành cùng khách hàng từ tư vấn đến hỗ trợ sau bàn giao." },
  { icon: "target", label: "Hiệu quả", description: "Giải pháp tập trung vào mục tiêu kinh doanh thực tế." },
];

// 3 principles per approved master (page-09): Liêm + Chính are one combined item, not two.
const principles: { word: string; meaning: string; icon: IconName }[] = [
  { word: "Cần", meaning: "Làm việc tận tâm, chăm chỉ, luôn nỗ lực hơn mỗi ngày.", icon: "clock" },
  { word: "Kiệm", meaning: "Tối ưu chi phí, tối ưu thời gian, mang lại giá trị xứng đáng.", icon: "package" },
  { word: "Liêm Chính", meaning: "Minh bạch, trung thực, đặt lợi ích khách hàng lên hàng đầu.", icon: "shield-check" },
];

// 4-card ecosystem per approved master — not 3; adds a consulting/strategy card with its
// own icon so no card reuses another's icon.
const ecosystem: { title: string; description: string; icon: IconName; href: string }[] = [
  { title: "Thiết kế Website", description: "Web doanh nghiệp, landing page, booking, web app...", icon: "monitor-smartphone", href: "/website" },
  { title: "Support Mạng Xã Hội", description: "Hỗ trợ khôi phục, bảo mật, phát triển kênh Facebook, TikTok...", icon: "messages-square", href: "/support-mxh" },
  { title: "Dịch vụ số", description: "Cung cấp tài khoản, phần mềm và dịch vụ số uy tín, giá tốt.", icon: "package", href: "/dich-vu-so" },
  { title: "Tư vấn & Chiến lược", description: "Tư vấn giải pháp số, marketing, xây dựng thương hiệu online.", icon: "lightbulb", href: "/lien-he" },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />

      <Container className="py-4">
        <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]} />
      </Container>

      <section id="about-hero">
        <Container className="grid items-center gap-10 py-6 md:py-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-eyebrow uppercase text-gold-700">Giới thiệu</p>
            <h1 className="mt-3 text-h1-mobile lg:text-h1-desktop text-ink-950">{siteSettings.brandName}</h1>
            <p className="mt-5 max-w-editorial text-body-lg text-text-secondary">
              Chúng tôi là đối tác số toàn diện, đồng hành cùng doanh nghiệp Việt trong hành
              trình xây dựng và vận hành hiện diện số — từ website, mạng xã hội đến các công
              cụ số cần thiết cho công việc hàng ngày.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image src={assetPath("about-bird-master")} alt={siteSettings.brandName} fill priority className="object-cover" />
          </div>
        </Container>
      </section>

      <Section id="brand-values" tone="ivory">
        <Container>
          <SectionHeading eyebrow="Giá trị cốt lõi" title="Điều chúng tôi theo đuổi" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {brandValues.map((v) => (
              <div key={v.label} className="flex flex-col items-center gap-3 rounded-md border border-border bg-white p-6 text-center shadow-sm">
                <Icon name={v.icon} size="feature" className="text-gold-600" />
                <h3 className="text-h4-mobile text-ink-950">{v.label}</h3>
                <p className="text-small text-text-secondary">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="service-ecosystem">
        <Container>
          <SectionHeading eyebrow="Hệ sinh thái dịch vụ" title="Chúng tôi cung cấp giải pháp toàn diện cho cá nhân & doanh nghiệp" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.map((s) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} ctaLabel="Xem chi tiết" href={s.href} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="brand-story" tone="ivory">
        <Container width="editorial">
          <SectionHeading eyebrow="Câu chuyện thương hiệu" title={`Vì sao là "${siteSettings.brandName}"`} />
          <p className="mt-4 text-body-lg text-text-secondary">
            Tên gọi Lạc Việt gắn với cội nguồn văn hoá Việt Nam — biểu tượng chim Lạc và trống
            đồng trong bộ nhận diện là lời nhắc về gốc rễ đó, đặt trong một hình ảnh hiện đại,
            gọn gàng và dễ tiếp cận cho doanh nghiệp hôm nay.
          </p>
          <p className="mt-4 text-body-lg text-text-secondary">
            Khẩu hiệu <span className="font-semibold text-ink-950">“{siteSettings.slogan}”</span> là
            kim chỉ nam cho cách chúng tôi làm việc với từng khách hàng.
          </p>
        </Container>
      </Section>

      <Section id="principles">
        <Container>
          <SectionHeading eyebrow={siteSettings.slogan} title="Ba nguyên tắc làm việc" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.word} className="flex items-start gap-4 rounded-md border border-border bg-white p-6 shadow-sm">
                <Icon name={p.icon} size="feature" className="mt-1 shrink-0 text-gold-600" />
                <div>
                  <p className="text-h4-mobile font-heading text-ink-950">{p.word}</p>
                  <p className="mt-1 text-small text-text-secondary">{p.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta sourceComponent="about-final-cta" />
    </>
  );
}
