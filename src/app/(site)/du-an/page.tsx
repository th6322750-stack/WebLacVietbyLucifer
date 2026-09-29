import { redirect } from "next/navigation";

/** "Dự án" gộp về gallery concept theo PHUONG_AN §5.
 *
 * Trước đây trỏ về `/website`; giờ có route gallery riêng nên đưa thẳng tới đó — link cũ,
 * bookmark cũ và kết quả tìm kiếm cũ tới đúng nội dung thay vì phải tự tìm tiếp một cấp nữa.
 * Giữ redirect thay vì xoá route: 404 một URL đã từng được index là mất traffic không cần thiết.
 */
export default function ProjectsPage() {
  redirect("/website/concept");
}
