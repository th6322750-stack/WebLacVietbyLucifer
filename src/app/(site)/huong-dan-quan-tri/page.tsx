import { ResourcePage } from "@/components/content/ResourcePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hướng dẫn quản trị",
  description: "Các bước cơ bản để tiếp nhận, cập nhật và vận hành tài sản số sau bàn giao.",
  path: "/huong-dan-quan-tri",
  noindex: true,
});

export default function AdminGuidePage() {
  return (
    <ResourcePage
      eyebrow="Hướng dẫn & hỗ trợ"
      title="Hướng dẫn quản trị"
      description="Nắm các việc cần kiểm tra sau khi nhận bàn giao website, tên miền, hosting và kênh số."
      notice="Hướng dẫn chi tiết sẽ được điều chỉnh theo nền tảng và cấu hình thực tế của từng dự án."
      sections={[
        { title: "Kiểm tra quyền sở hữu", body: "Xác nhận email quản trị, tên miền, hosting và các tài khoản tích hợp đều thuộc quyền kiểm soát của bạn.", icon: "lock-keyhole" },
        { title: "Cập nhật nội dung", body: "Bắt đầu từ các mục cơ bản như thông tin liên hệ, dịch vụ, hình ảnh và bài viết; giữ bản sao trước khi chỉnh sửa lớn.", icon: "monitor-smartphone" },
        { title: "Theo dõi vận hành", body: "Kiểm tra biểu mẫu, liên kết, tốc độ tải và thông báo lỗi định kỳ để phát hiện vấn đề sớm.", icon: "trending-up" },
        { title: "Yêu cầu hỗ trợ", body: "Gửi đường dẫn, mô tả lỗi và ảnh chụp màn hình qua kênh liên hệ để đội ngũ có đủ bối cảnh xử lý.", icon: "headset" },
      ]}
      ctaTitle="Cần hướng dẫn theo đúng hệ thống của bạn?"
    />
  );
}
