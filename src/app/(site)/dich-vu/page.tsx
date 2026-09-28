import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/layout/FinalCta";
import { ServiceDirectory } from "@/components/content/ServiceDirectory";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Dịch vụ Lạc Việt Media | Website, SEO & Support MXH",
  description:
    "Toàn bộ dịch vụ Lạc Việt Media: thiết kế website, hỗ trợ mạng xã hội và các giải pháp số cho doanh nghiệp.",
  path: "/dich-vu",
});

/** Hub dịch vụ — UI V6 §6.2.
 *
 * Bản trước map `servicesByGroup()` thành một `Section` cho mỗi group: tám dải nền xen kẽ, phần
 * lớn chỉ chứa một card nằm lệch trái, trang cao 6.437px. Giờ là một danh bạ ba trụ cột trong
 * hai section, và số cột của mỗi row theo số dịch vụ thật (xem `ServiceDirectory`).
 */

/** Ba câu mô tả đúng cách làm việc đã có ở các trang dịch vụ. Không thêm cam kết mới nào. */
const howToChoose: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "target",
    title: "Bắt đầu từ mục tiêu",
    body: "Nói rõ điều bạn muốn đạt được trước, thay vì chọn sẵn một gói dịch vụ.",
  },
  {
    icon: "badge-check",
    title: "Chốt phạm vi",
    body: "Thống nhất chính xác việc sẽ làm và chi phí trước khi bắt đầu triển khai.",
  },
  {
    icon: "package",
    title: "Thống nhất đầu ra",
    body: "Biết trước bạn sẽ nhận lại những gì khi kết thúc, và hỗ trợ tiếp theo ra sao.",
  },
];

export default function ServiceHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, { name: "Dịch vụ", path: "/dich-vu" }])} />
      <PageHero
        eyebrow="Dịch vụ"
        breadcrumbs={<Breadcrumbs onDark items={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ" }]} />}
        title="Dịch vụ Lạc Việt Media"
        description="Chọn theo mục tiêu bạn đang cần giải quyết. Mỗi dịch vụ đều bắt đầu bằng một cuộc trao đổi để hiểu đúng nhu cầu trước khi đề xuất phương án."
      />

      <Section id="chon-theo-muc-tieu" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Chọn theo mục tiêu" title="Bạn đang cần giải quyết điều gì?" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["#xay-nen-tang", "Xây nền tảng số", "Website, landing page, tên miền và email."],
              ["#quang-cao", "Tìm khách bằng quảng cáo", "Chọn kênh theo mục tiêu và ngân sách."],
              ["#seo-hien-dien", "Tăng hiện diện tìm kiếm", "SEO, nội dung và Google Maps."],
              ["#thuong-hieu-van-hanh", "Chuẩn hoá thương hiệu", "Nhận diện, support và vận hành kênh."],
            ].map(([href, title, body], index) => (
              <ScrollReveal key={href} direction="up" distance={16} duration={0.55} delay={index * 80}>
                <a href={href} className="group block h-full rounded-2xl border border-gold-500/20 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-500/45 hover:shadow-md">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">{title}</span>
                    <Icon name="arrow-right" size="inline" className="shrink-0 text-gold-600 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-2 block text-small leading-relaxed text-text-secondary">{body}</span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <ServiceDirectory />

      <Section id="cach-chon" tone="ivory">
        <Container>
          <ScrollReveal direction="up" distance={20} duration={0.6}>
            <SectionHeading eyebrow="Cách chọn" title="Chưa rõ nên bắt đầu từ đâu?" align="center" />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {howToChoose.map((item, index) => (
              <ScrollReveal key={item.title} direction="up" distance={20} duration={0.6} delay={index * 100}>
                <div className="flex h-full items-start gap-3">
                  <Icon name={item.icon} size="card" className="mt-0.5 shrink-0 text-gold-600" />
                  <div className="min-w-0">
                    <p className="font-heading text-card-h3-mobile text-ink-950 lg:text-card-h3-desktop">
                      {item.title}
                    </p>
                    <p className="mt-1 text-small text-text-secondary">{item.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta
        variant="strip"
        sourceComponent="service-hub-final-cta"
        title="Chưa rõ dịch vụ nào phù hợp?"
        description="Nhắn Zalo để trao đổi nhu cầu và nhận phương án phù hợp."
      />
    </>
  );
}
