import { ConsultationProvider } from "@/components/conversion/ConsultationProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationProvider>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-sm focus-visible:bg-white focus-visible:px-4 focus-visible:py-2 focus-visible:text-ink-950"
      >
        Bỏ qua để đến nội dung chính
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </ConsultationProvider>
  );
}
