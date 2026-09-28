import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/** Honest admin state when the content database is not configured or temporarily unavailable. */
export function AdminDataUnavailable({ title = "Chưa kết nối được dữ liệu quản trị" }: { title?: string }) {
  return (
    <section data-testid="admin-data-unavailable" role="alert" className="admin-panel px-6 py-16 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#fff6e7] text-[#b07a12]">
        <Icon name="server" size="feature" />
      </span>
      <h1 className="mt-5 font-heading text-[22px] font-bold text-[#08265a]">{title}</h1>
      <p className="mx-auto mt-3 max-w-xl text-[13px] leading-6 text-[#5a6b85]">
        Khu vực quản trị vẫn hoạt động, nhưng kho dữ liệu chưa sẵn sàng. Hãy cấu hình
        <code className="mx-1 rounded bg-[#f1f5fb] px-1.5 py-0.5 text-[12px] text-[#08265a]">DATABASE_URL</code>
        rồi tải lại trang để xem và cập nhật nội dung.
      </p>
      <Link href="/admin" className="admin-action admin-action-primary mt-6">
        <Icon name="arrow-left" size="inline" />
        Về tổng quan quản trị
      </Link>
    </section>
  );
}
