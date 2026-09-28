import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { PageJumpNav } from "@/components/layout/PageJumpNav";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { WebsiteHeroCta } from "./WebsiteInteractive";
import { IndustryGallery } from "./IndustryGallery";
import { industryShowcase, CONCEPT_DISCLOSURE } from "@/content/industry-showcase";
import { getFaqsByScope } from "@/content/faqs";
import { pricingGroups, websitePackageCommitments } from "@/content/pricing";
import { PricingTabs } from "@/components/content/PricingTabs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Thiết kế website doanh nghiệp | Lạc Việt Media",
  description:
    "Thiết kế và phát triển website doanh nghiệp chuyên nghiệp, chuẩn SEO, tối ưu tốc độ và chuyển đổi.",
  path: "/website",
});

// 6 industries per approved master (page-04). Labels AND the supporting line under each are
// transcribed from the master crop at 3x zoom — three labels were previously wrong ("Doanh
// nghiệp nhỏ & vừa", "Dịch vụ, sự kiện", "Doanh nghiệp, phi lợi nhuận") and the description
// line was missing entirely. Icons come from the pinned inventory; the master's art is
// line-work that has no exact match there, so the closest pinned semantic icon is used.
const industries: { icon: IconName; label: string; description: string }[] = [
  { icon: "briefcase", label: "Doanh nghiệp vừa & nhỏ", description: "Xây dựng thương hiệu chuyên nghiệp, tăng uy tín." },
  { icon: "shopping-bag", label: "Cửa hàng, bán lẻ", description: "Bán hàng online hiệu quả, quản lý đơn hàng dễ dàng." },
  { icon: "building", label: "Bất động sản", description: "Giới thiệu dự án, thu hút khách hàng tiềm năng." },
  { icon: "headset", label: "Dịch vụ, tư vấn", description: "Tạo niềm tin, tăng tỉ lệ chuyển đổi khách hàng." },
  { icon: "award", label: "Giáo dục, đào tạo", description: "Tuyển sinh online, quản lý khóa học hiệu quả." },
  { icon: "shield-check", label: "Bệnh viện, phòng khám", description: "Tăng uy tín, dễ dàng đặt lịch hẹn và tư vấn." },
];

// 5 benefits per approved master — not 4.
const benefits: { icon: IconName; label: string }[] = [
  { icon: "badge-check", label: "Tăng uy tín thương hiệu" },
  { icon: "target", label: "Tối ưu chuyển đổi" },
  { icon: "percent", label: "Nền tảng SEO bền vững" },
  { icon: "shield-check", label: "Bảo mật & ổn định" },
  { icon: "headset", label: "Bàn giao – đào tạo" },
];

// 6-step process per approved master — not 4.
const processSteps = [
  { title: "Tư vấn & khảo sát", description: "Tìm hiểu mục tiêu kinh doanh và đối tượng khách hàng." },
  { title: "Đề xuất giải pháp", description: "Xây dựng phương án phù hợp ngân sách và thời gian." },
  { title: "Thiết kế giao diện", description: "Xây dựng giao diện riêng theo nhận diện thương hiệu." },
  { title: "Lập trình & tối ưu", description: "Phát triển và tối ưu hiệu năng, chuẩn SEO." },
  { title: "Kiểm thử và bàn giao", description: "Kiểm thử kỹ trước khi bàn giao chính thức." },
  { title: "Hỗ trợ & bảo trì", description: "Đồng hành hỗ trợ kỹ thuật sau bàn giao." },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { claimAttrsFor } from "@/lib/content-truth";

export default function WebsitePage() {
  const faqs = getFaqsByScope("website");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Website doanh nghiệp", path: "/website" },
        ])}
      />
      <PageHero
        // flipX: the devices are shot facing right, i.e. away from the copy. Mirrored, they
        // face into it and the hero reads as one composition instead of two halves.
        heroImage={{
          assetId: "v5-website-devices",
          alt: "Website doanh nghiệp hiển thị trên laptop và điện thoại",
          flipX: true,
        }}
        eyebrow="Dịch vụ / Website"
        breadcrumbs={
          <Breadcrumbs
            onDark
            items={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ" }, { label: "Thiết kế website" }]}
          />
        }
        title={
          <>
            Thiết kế Website
            <br />
            {/* PRO V2.1: at the restored h1-desktop size this phrase wrapped mid-word
                ("CHUẨN ĐẸP – HIỆU" / "QUẢ") instead of at the two-descriptor boundary — an
                explicit break keeps "hiệu quả" together as its own line at every width. */}
            <span className="text-v5-gold">
              chuẩn đẹp –<br />
              hiệu quả
            </span>
            <br />
            <span className="text-v5-gold">cho doanh nghiệp</span>
          </>
        }
        description="Lạc Việt tạo ra những website chuyên nghiệp, chuẩn SEO, tối ưu trải nghiệm người dùng và chuyển đổi — giúp doanh nghiệp bứt phá xây dựng thương hiệu vững chắc trên môi trường số."
        proofItems={[
          { icon: "target", title: "Thiết kế chuẩn UX/UI", note: "Trải nghiệm mượt mà" },
          { icon: "search", title: "Cấu trúc SEO – Tốc độ tốt", note: "Dễ đọc bởi công cụ tìm kiếm" },
          { icon: "shield-check", title: "Bảo mật – Ổn định", note: "Vận hành an toàn" },
        ]}
        imageAssetId="website-hero-master"
        imageAlt="Website doanh nghiệp Lạc Việt Media"
        cta={<WebsiteHeroCta />}
      />

      <PageJumpNav
        items={[
          { href: "#industry-fit-grid", label: "Phù hợp với" },
          { href: "#website-packages", label: "Gói website" },
          { href: "#website-projects", label: "Concept" },
          { href: "#website-process", label: "Quy trình" },
          { href: "#faq", label: "Câu hỏi" },
        ]}
      />

      <Section id="industry-fit-grid">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading
              eyebrow="Dịch vụ website phù hợp với"
              title="Doanh nghiệp ở mọi quy mô, mọi lĩnh vực"
              align="center"
            />
            <p className="mx-auto mt-3 max-w-editorial text-center text-body text-text-secondary">
              Dù bạn là startup, doanh nghiệp vừa và nhỏ hay thương hiệu lớn, chúng tôi đều có giải
              pháp website phù hợp với mục tiêu và ngân sách của bạn.
            </p>
          </ScrollReveal>
          {/* Mobile: hàng ngang icon + chữ, padding nhỏ hơn. Sáu ô căn giữa có mô tả hai dòng
              ở 390px chiếm gần một màn hình rưỡi cho một lưới vốn chỉ để nói "hợp với ngành nào".
              Stagger giới hạn 4 (§8) — sáu delay nối tiếp làm ô cuối xuất hiện chậm thấy rõ. */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
            {industries.map((item, idx) => (
              <ScrollReveal key={item.label} direction="up" distance={20} duration={0.6} delay={Math.min(idx, 3) * 80}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-gold-500/20 bg-white p-3 shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-md md:flex-col md:items-center md:p-5 md:text-center md:hover:-translate-y-1">
                  {/* `size` prop, không phải class: Icon đặt width/height bằng inline style nên
                      mọi class kích thước đều thua. */}
                  <Icon name={item.icon} size="card" className="shrink-0 text-gold-600" />
                  <div className="min-w-0">
                    <p className="text-small font-semibold text-ink-950 md:mt-1">{item.label}</p>
                    <p className="mt-0.5 text-caption leading-snug text-text-secondary">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="website-packages" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Gói dịch vụ" title="Chọn gói phù hợp nhu cầu của bạn" align="center" />
          </ScrollReveal>
          {/* PHUONG_AN §6.5: hai chế độ báo giá tách bằng tab thay vì bốn thẻ ngang hàng —
              "Theo yêu cầu" không cùng loại với ba gói chuẩn hoá, xếp chung khiến khách so sánh
              nhầm một thứ vốn không so sánh được. */}
          <ScrollReveal direction="up" distance={24} duration={0.7} delay={100}>
            <PricingTabs
              groups={pricingGroups}
              commitments={websitePackageCommitments}
              sourceComponent="website-packages"
            />
          </ScrollReveal>
        </Container>
      </Section>

      <Section id="benefit-strip" tone="dark">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading onDark eyebrow="Lợi ích khi tạo website cùng Lạc Việt" title="Tạo nền tảng số vững chắc – bứt phá tăng trưởng" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-2 gap-5 md:gap-8 md:grid-cols-3 lg:grid-cols-5">
            {benefits.map((b, idx) => (
              <ScrollReveal key={b.label} direction="up" distance={20} duration={0.6} delay={idx * 100}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <Icon name={b.icon} size="feature" className="text-gold-300" />
                  <p className="text-small text-white/85">{b.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="website-projects">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Concept đa ngành" title="Một số giao diện web theo từng lĩnh vực" align="center" />
            {/* Câu mô tả cũ hứa "bấm vào ảnh để nhận tư vấn qua Zalo" — thẻ concept giờ dẫn sang
                trang chi tiết, nên câu đó đã sai. Disclosure lấy từ một hằng số dùng chung để
                trang chủ, gallery và trang chi tiết không trôi khỏi nhau. */}
            <p
              className="mx-auto mt-3 max-w-editorial text-center text-small text-text-muted"
              {...claimAttrsFor("demo")}
            >
              {CONCEPT_DISCLOSURE} Chọn ngành để lọc, bấm vào ảnh để xem chi tiết concept.
            </p>
          </ScrollReveal>
          <IndustryGallery items={industryShowcase} />
          <div className="mt-10 flex justify-center">
            <Link
              href="/website/concept"
              className="inline-flex min-h-touch items-center gap-2 rounded-pill border border-gold-500/30 bg-white px-6 py-3 text-button font-semibold text-gold-700 transition-colors duration-normal ease-standard hover:border-gold-500/60 hover:bg-ivory-100"
            >
              Xem toàn bộ concept theo lĩnh vực
              <Icon name="arrow-right" size="inline" />
            </Link>
          </div>
        </Container>
      </Section>

      <Section id="website-process" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Quy trình" title="Quy trình triển khai website" align="center" />
          </ScrollReveal>
          <div className="mt-10">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={150}>
              <ProcessSteps steps={processSteps} />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section id="faq">
        <Container width="editorial">
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Câu hỏi thường gặp" title="Giải đáp về dịch vụ website" align="center" />
          </ScrollReveal>
          <div className="mt-10">
            <ScrollReveal direction="up" distance={24} duration={0.7} delay={100}>
              <FAQAccordion items={faqs} columns={2} />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <FinalCta variant="strip" sourceComponent="website-final-cta" defaultService="Website doanh nghiệp" />
    </>
  );
}
