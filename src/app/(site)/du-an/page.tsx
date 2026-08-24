import { redirect } from "next/navigation";

/** "Dự án" gộp về /website theo yêu cầu (2026-08-24): gallery giao diện web giờ sống trong tab
 * "Dịch vụ" > "Thiết kế website" thay vì một mục riêng trên menu chính. Trang này giữ lại làm
 * lối chuyển hướng — link cũ, bookmark cũ, hay kết quả tìm kiếm cũ trỏ tới /du-an vẫn tới đúng
 * chỗ thay vì gặp trang 404. */
export default function ProjectsPage() {
  redirect("/website");
}
