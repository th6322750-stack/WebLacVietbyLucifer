import { redirect } from "next/navigation";
import { findConcept } from "@/content/industry-showcase";

/** Chuyển hướng chi tiết dự án cũ — PHUONG_AN §5.
 *
 * Danh mục "dự án" cũ đã được thay bằng concept taxonomy; giữ hai bộ dữ liệu song song là cách
 * chắc chắn nhất để chúng lệch nhau. Slug nào trùng concept thì tới thẳng concept đó, còn lại
 * về gallery — người theo link cũ vẫn thấy nội dung gần nhất thay vì trang 404.
 */
export default async function LegacyProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(findConcept(slug) ? `/website/concept/${slug}` : "/website/concept");
}

/** Bất kỳ slug nào cũng phải chạy được để redirect, kể cả slug không còn tồn tại. */
export const dynamicParams = true;
