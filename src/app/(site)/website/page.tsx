import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FinalCta } from "@/components/layout/FinalCta";
import { WebsiteHeroCta, WebsitePackages } from "./WebsiteInteractive";
import { IndustryGallery } from "./IndustryGallery";
import { industryShowcase } from "@/content/industry-showcase";
import { getFaqsByScope } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website doanh nghiệp",
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
  { icon: "percent", label: "Chuẩn SEO – bứt phá top tìm kiếm" },
  { icon: "shield-check", label: "Bảo mật & ổn định" },
  { icon: "headset", label: "Bàn giao – đào tạo" },
];

// 6-step process per approved master — not 4.
/** Shown on the BACK of every pricing card.
 *
 * Every line is lifted from an answer already approved in src/content/faqs.ts (scope "website"),
 * not written fresh — these are commitments to a customer, and the ones the business has already
 * put in writing are the only ones this file is entitled to repeat:
 *
 *   "Giao diện được thiết kế riêng theo nhận diện thương hiệu của bạn, không dùng mẫu dựng sẵn"
 *   "Mọi website đều được tối ưu SEO on-page cơ bản ngay từ khi bàn giao"
 *   "Website được bàn giao kèm hướng dẫn quản trị nội dung để bạn tự cập nhật"
 *   "Lạc Việt Media hỗ trợ bảo trì và xử lý sự cố kỹ thuật sau bàn giao theo thoả thuận"
 *   "Thanh toán theo tiến độ dự án, chi tiết thống nhất trong hợp đồng"
 *
 * Per-package delivery times are deliberately absent: faqs.ts gives one figure for a business
 * website (2-4 tuần) and nothing for the other three, and guessing the rest would be inventing
 * a promise.
 */
const packageCommitments = [
  "Thiết kế riêng theo nhận diện thương hiệu, không dùng mẫu dựng sẵn",
  "Tối ưu SEO on-page cơ bản ngay khi bàn giao",
  "Bàn giao kèm hướng dẫn tự quản trị nội dung",
  "Hỗ trợ bảo trì và xử lý sự cố sau bàn giao theo hợp đồng",
  "Thanh toán theo tiến độ dự án",
];

const processSteps = [
  { title: "Tư vấn & khảo sát", description: "Tìm hiểu mục tiêu kinh doanh và đối tượng khách hàng." },
  { title: "Đề xuất giải pháp", description: "Xây dựng phương án phù hợp ngân sách và thời gian." },
  { title: "Thiết kế giao diện", description: "Xây dựng giao diện riêng theo nhận diện thương hiệu." },
  { title: "Lập trình & tối ưu", description: "Phát triển và tối ưu hiệu năng, chuẩn SEO." },
  { title: "Kiểm thử và bàn giao", description: "Kiểm thử kỹ trước khi bàn giao chính thức." },
  { title: "Hỗ trợ & bảo trì", description: "Đồng hành hỗ trợ kỹ thuật sau bàn giao." },
];

// 4 packages. PRICES ARE STILL demoOnly — see .webby/CONTENT_TRUTH.json.
//
// Positioned deliberately UNDER the competitor bảng giá Lucifer supplied, at his instruction:
//
//   gói                 họ            mình         rẻ hơn
//   Landing Page        1.888.000     1.590.000    16%
//   Doanh nghiệp        5.000.000     4.500.000    10%
//   Bán hàng           10.000.000     8.900.000    11%
//   Theo yêu cầu     từ 10.000.000  từ 9.500.000    5%
//
// CONFIRMED BY LUCIFER 2026-08-21 as real selling prices, so demoOnly is now false. The flag is
// not decoration: CONTENT_TRUTH.json treats unverified figures as demo, and a price shown to a
// customer as real when nobody has agreed to honour it is a commitment the site cannot make.
//
// Sorted cheapest first. The old order put the 4.5tr package before the 1.59tr one, so the price
// row did not read in any direction — a comparison table is scanned left to right and the numbers
// have to go one way.
//
// The competitor layout Lucifer supplied also carries a struck-through "original" price with a
// savings percentage, a per-package delivery time, a five-year warranty line, and a free-hosting
// bonus. NONE of those are reproduced here: they are that company's commitments, and inventing
// our own version of them is exactly what CONTENT_TRUTH.json forbids. `tag` and `ctaLabel` are
// positioning copy, which is a different thing from a promise.
const packages = [
  {
    plan: "Landing page",
    demoOnly: false as const,
    tag: "Khởi động nhanh",
    description: "Phù hợp chiến dịch quảng cáo, giới thiệu sản phẩm/dịch vụ.",
    price: "Từ 1.590.000đ",
    features: ["1 trang chuyển đổi cao", "Tối ưu tốc độ tải", "Tích hợp form thu lead"],
    ctaLabel: "Nhận báo giá landing",
  },
  {
    plan: "Website doanh nghiệp",
    demoOnly: false as const,
    tag: "Hiện diện chuyên nghiệp",
    description: "Phù hợp doanh nghiệp cần hiện diện website chuyên nghiệp.",
    price: "Từ 4.500.000đ",
    features: ["Thiết kế theo mẫu tối ưu", "Tối đa 5 trang nội dung", "Chuẩn SEO cơ bản"],
    ctaLabel: "Tư vấn gói doanh nghiệp",
  },
  {
    plan: "Website bán hàng",
    demoOnly: false as const,
    tag: "Phổ biến nhất",
    description: "Phù hợp doanh nghiệp cần bán hàng trực tuyến đầy đủ tính năng.",
    price: "Từ 8.900.000đ",
    features: ["Giỏ hàng & thanh toán", "Quản trị sản phẩm", "Tối ưu SEO nâng cao", "Hỗ trợ ưu tiên"],
    ctaLabel: "Xây web bán hàng",
    featured: true,
  },
  {
    plan: "Website theo yêu cầu",
    demoOnly: false as const,
    tag: "Theo phạm vi",
    description: "Phù hợp hệ thống phức tạp, tích hợp nhiều dịch vụ riêng.",
    price: "Từ 9.500.000đ",
    features: ["Kiến trúc tuỳ chỉnh", "Tích hợp hệ thống/API riêng", "Đội ngũ đồng hành dài hạn"],
    ctaLabel: "Trao đổi giải pháp",
  },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function WebsitePage() {
  const faqs = getFaqsByScope("website");

  return (
    <>
      <PageHero
        // flipX: the devices are shot facing right, i.e. away from the copy. Mirrored, they
        // face into it and the hero reads as one composition instead of two halves.
        heroImage={{
          assetId: "v5-website-devices",
          alt: "Website doanh nghiệp hiển thị trên laptop và điện thoại",
          flipX: true,
        }}
        eyebrow="Dịch vụ / Website"
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
          { icon: "search", title: "Chuẩn SEO – Tốc độ cao", note: "Dễ dàng lên top Google" },
          { icon: "shield-check", title: "Bảo mật – Ổn định", note: "Vận hành an toàn" },
        ]}
        imageAssetId="website-hero-master"
        imageAlt="Website doanh nghiệp Lạc Việt Media"
        cta={<WebsiteHeroCta />}
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
          <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((item, idx) => (
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

      <Section id="website-packages" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Gói dịch vụ" title="Chọn gói phù hợp nhu cầu của bạn" align="center" />
          </ScrollReveal>
          <ScrollReveal direction="up" distance={24} duration={0.7} delay={100}>
            <WebsitePackages packages={packages} commitments={packageCommitments} />
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
            <p className="mx-auto mt-3 max-w-editorial text-center text-small text-text-muted" data-demo-only="true">
              Concept minh hoạ phong cách thiết kế theo từng ngành, không phải dự án đã triển khai
              cho khách hàng cụ thể. Chọn ngành để lọc, bấm vào ảnh để nhận tư vấn qua Zalo.
            </p>
          </ScrollReveal>
          <IndustryGallery items={industryShowcase} />
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
