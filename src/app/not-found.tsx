import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/lib/site-settings";
import { assetPath, assetSize } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false, follow: false },
};

/** Approved 404 state (recovery audit §11, master ui-010 "404 NOT FOUND" panel): a dark
 * charcoal full-state composition with an oversized gold 404, white headline, short grey
 * message and a gold "Quay về trang chủ" button over a subtle dark texture. The previous
 * ivory-page-with-black-title treatment was not the approved authority. */
export default function NotFound() {
  return (
    <>
      <header className="flex h-16 items-center bg-ink-950 lg:h-[76px]">
        <Container>
          <Link href="/" aria-label={`${siteSettings.brandName} — Trang chủ`}>
            <Image
              src={assetPath("lac-viet-logo-horizontal-approved")}
              alt={siteSettings.brandName}
              width={assetSize("lac-viet-logo-horizontal-approved").width}
              height={assetSize("lac-viet-logo-horizontal-approved").height}
              priority
              className="h-8 w-auto lg:h-10"
            />
          </Link>
        </Container>
      </header>

      <main id="main-content" data-state="404" className="relative isolate bg-ink-950">
        {/* Subtle dark texture behind the state, as in the approved panel. Decorative only. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${assetPath("gold-noise")})` }}
        />
        <Container className="relative flex flex-col items-center gap-4 py-20 text-center md:py-30">
          <Icon name="circle-alert" size="feature" className="text-gold-500" />
          <p className="font-heading text-[64px] leading-none text-gold-500 md:text-[96px]">404</p>
          <h1 className="text-detail-h1-mobile lg:text-detail-h1-desktop text-white">
            Không tìm thấy trang
          </h1>
          <p className="mx-auto max-w-editorial text-body-lg text-white/70">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
          <Button href="/" variant="primary" className="mt-2">
            Quay về trang chủ
            <Icon name="arrow-right" size="inline" />
          </Button>
        </Container>
      </main>

      <SiteFooter minimal />
    </>
  );
}
