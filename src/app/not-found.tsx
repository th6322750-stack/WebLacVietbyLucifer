import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/lib/site-settings";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <header className="flex h-16 items-center bg-ink-950 lg:h-[76px]">
        <Container>
          <Link href="/" aria-label={`${siteSettings.brandName} — Trang chủ`}>
            <Image
              src="/assets/brand/lac-viet-logo.webp"
              alt={siteSettings.brandName}
              width={160}
              height={40}
              priority
              className="h-9 w-auto lg:h-11"
            />
          </Link>
        </Container>
      </header>

      <main id="main-content" data-state="404">
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-32">
          <Icon name="circle-alert" size="feature" className="text-gold-600" />
          <div>
            <p className="text-eyebrow uppercase text-gold-700">404</p>
            <h1 className="mt-3 text-h1-mobile lg:text-h1-desktop text-ink-950">
              Không tìm thấy trang
            </h1>
            <p className="mx-auto mt-4 max-w-editorial text-body-lg text-text-secondary">
              Trang bạn tìm không tồn tại hoặc đã được di chuyển. Hãy quay lại trang chủ để
              tiếp tục khám phá dịch vụ của {siteSettings.brandName}.
            </p>
          </div>
          <Button href="/" variant="primary">
            <Icon name="arrow-left" size="inline" />
            Về trang chủ
          </Button>
        </Container>
      </main>

      <SiteFooter minimal />
    </>
  );
}
