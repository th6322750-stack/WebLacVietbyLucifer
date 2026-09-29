import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  publishedServices,
  serviceHref,
  type ServiceDefinition,
  type ServiceGroup,
} from "@/content/service-registry";

/** Danh bạ dịch vụ theo trụ cột — UI V6 §5.7.
 *
 * `/dich-vu` trước đây map mỗi group thành một `Section` riêng: tám dải nền ivory/light xen kẽ,
 * và vì phần lớn group chỉ có đúng một dịch vụ, mỗi dải là một card nằm lệch trái bỏ trống hai
 * phần ba bề ngang. Trang cao 6.437px để nói tám điều.
 *
 * Trụ cột thay cho group vì đó là cách khách phân loại nhu cầu, không phải cách hệ thống phân
 * loại dữ liệu. Group của registry giữ nguyên — chúng mịn hơn và là nguồn dữ liệu; ánh xạ sang
 * trụ cột nằm trong một bảng typed ngay dưới đây, không rải điều kiện trong JSX.
 *
 * Bảng này cũng là nguồn cho mega menu (`src/lib/navigation.ts`), nên menu và hub không bao giờ
 * phân loại cùng một dịch vụ theo hai kiểu. Mở thêm dịch vụ chỉ cần gán `group`.
 *
 * 2026-09-09: tách từ ba lên bốn trụ cột khi mở thêm sáu dịch vụ — `performance` đã đủ dày để
 * đứng riêng thành cột "Quảng cáo" thay vì gộp chung vào "Tăng trưởng".
 */

export type Pillar = {
  id: string;
  label: string;
  intro: string;
  groups: ServiceGroup[];
};

export const SERVICE_PILLARS: Pillar[] = [
  {
    id: "xay-nen-tang",
    label: "Website & Hạ tầng",
    intro:
      "Những thứ doanh nghiệp cần có trước tiên: website đúng nhận diện, tên miền và email đứng tên mình.",
    groups: ["website", "infrastructure"],
  },
  {
    id: "quang-cao",
    label: "Quảng cáo",
    intro:
      "Đưa ngân sách tới đúng người đang tìm mua, và đo được mỗi liên hệ thực sự tốn bao nhiêu.",
    groups: ["performance"],
  },
  {
    id: "seo-hien-dien",
    label: "SEO & Hiện diện",
    intro:
      "Để khách tìm thấy mình khi họ chủ động tìm — trên Google tìm kiếm và trên bản đồ quanh khu vực.",
    groups: ["seo-content", "local-presence"],
  },
  {
    id: "thuong-hieu-van-hanh",
    label: "Thương hiệu & Vận hành",
    intro:
      "Nhận diện đồng bộ trên mọi kênh, và giữ cho kênh chạy ổn định sau khi mọi thứ đã lên.",
    groups: ["creative-media", "social-support", "automation-tools"],
  },
];

function servicesForPillar(pillar: Pillar, all: ServiceDefinition[]): ServiceDefinition[] {
  return all.filter((s) => pillar.groups.includes(s.group));
}

export function ServiceDirectory() {
  // `publishedServices()` đã lọc sẵn `policyClass: "excluded"` và mọi mục chưa publish, nên
  // không có đường nào để một dịch vụ bị loại theo chính sách lọt vào đây.
  const all = publishedServices();
  const pillars = SERVICE_PILLARS.map((p) => ({ ...p, services: servicesForPillar(p, all) })).filter(
    (p) => p.services.length > 0,
  );
  if (pillars.length === 0) return null;

  return (
    <>
      {/* Anchor rail: mỗi trụ cột là một đích nhảy thật trên trang này. Ở mobile nó cuộn ngang
          và có dải mờ ở mép phải làm tín hiệu còn nội dung bên ngoài khung. */}
      <Section id="service-rail" compact tone="ivory">
        <Container>
          <nav aria-label="Nhóm dịch vụ" className="relative">
            <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
              <ul className="flex w-max list-none gap-2 md:w-auto md:flex-wrap md:justify-center">
                {pillars.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      className="inline-flex min-h-touch items-center whitespace-nowrap rounded-pill border border-gold-500/25 bg-white px-4 py-2 text-chip font-medium text-text-secondary transition-colors duration-normal ease-standard hover:border-gold-500/50 hover:text-gold-700"
                    >
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ivory-100 to-transparent md:hidden"
            />
          </nav>
        </Container>
      </Section>

      {/* Mọi row trong MỘT section, ngăn bằng divider — không phải một section cho mỗi nhóm.
          Nền đổi tám lần trên một trang danh bạ làm mỗi nhóm trông như một trang riêng. */}
      <Section id="service-directory">
        <Container>
          <div className="flex flex-col divide-y divide-border">
            {pillars.map((pillar, pillarIndex) => (
              <div
                key={pillar.id}
                id={pillar.id}
                className="grid gap-6 py-10 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-10 lg:py-12"
                style={{ scrollMarginTop: "96px" }}
              >
                <div className="lg:col-span-4">
                  <ScrollReveal direction="up" distance={20} duration={0.6}>
                    <p className="text-eyebrow uppercase tracking-[0.14em] text-gold-700">
                      Trụ cột {pillarIndex + 1}
                    </p>
                    <h2 className="mt-2 font-heading text-h3-mobile text-ink-950 lg:text-h3-desktop">
                      {pillar.label}
                    </h2>
                    <p className="mt-3 max-w-editorial text-body text-text-secondary">
                      {pillar.intro}
                    </p>
                  </ScrollReveal>
                </div>

                <div className="lg:col-span-8">
                  {/* Số cột theo số dịch vụ thật. Một dịch vụ thì panel chiếm đủ vùng 8 cột
                      thay vì co lại thành một card lẻ bên trái — đó chính là lỗi P0. */}
                  <ul
                    className={`grid list-none gap-4 ${
                      pillar.services.length === 1 ? "" : "md:grid-cols-2"
                    }`}
                  >
                    {pillar.services.map((service, index) => (
                      <li key={service.slug}>
                        <ScrollReveal
                          direction="up"
                          distance={20}
                          duration={0.6}
                          // Stagger tối đa 4 (§8): danh sách dài hơn không được tạo một chuỗi
                          // delay nối tiếp khiến mục cuối xuất hiện sau cả giây.
                          delay={Math.min(index, 3) * 90}
                          className="h-full"
                        >
                          <ServiceRow service={service} />
                        </ScrollReveal>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/** Một dịch vụ. Toàn bộ hàng là một link — không đặt `<button>` bên trong `<a>`, và không để
 *  vùng click chỉ là mấy chữ CTA cuối card. */
function ServiceRow({ service }: { service: ServiceDefinition }) {
  return (
    <Link
      href={serviceHref(service)}
      className="group flex h-full items-start gap-4 rounded-2xl border border-gold-500/20 bg-white p-5 shadow-sm transition-all duration-300 ease-standard hover:border-gold-500/45 hover:shadow-md"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-ivory-50">
        <Icon name={service.icon} size="card" className="text-gold-600" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-card-h3-mobile text-ink-950 transition-colors duration-fast group-hover:text-gold-700 lg:text-card-h3-desktop">
          {service.title}
        </span>
        <span className="mt-1.5 block text-small text-text-secondary">{service.summary}</span>
      </span>
      <Icon
        name="chevron-right"
        size="inline"
        className="mt-1 shrink-0 text-text-muted transition-transform duration-fast group-hover:translate-x-0.5 group-hover:text-gold-700"
      />
    </Link>
  );
}
