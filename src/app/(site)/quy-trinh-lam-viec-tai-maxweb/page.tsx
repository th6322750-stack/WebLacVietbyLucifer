import { ResourcePage } from "@/components/content/ResourcePage";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Quy trình làm việc | Lạc Việt Media",
  description: "Quy trình tiếp nhận, đề xuất, triển khai, kiểm tra và bàn giao của Lạc Việt Media, từ trao đổi đầu tiên đến sau bàn giao.",
  path: "/quy-trinh-lam-viec-tai-maxweb",
});

export default function WorkProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, { name: "Quy trình làm việc", path: "/quy-trinh-lam-viec-tai-maxweb" }])} />
      <ResourcePage
        eyebrow="Hướng dẫn & hỗ trợ"
        title="Quy trình làm việc"
        description="Một lộ trình rõ ràng giúp bạn biết điều gì xảy ra từ lần trao đổi đầu tiên đến sau bàn giao."
        sections={[
        { title: "1. Tiếp nhận", body: "Ghi nhận mục tiêu, hiện trạng, người phụ trách và các quyền truy cập cần thiết.", icon: "messages-square" },
        { title: "2. Đề xuất", body: "Đề xuất cấu trúc, phạm vi, đầu ra, mốc thời gian và chi phí để hai bên cùng rà soát.", icon: "target" },
        { title: "3. Triển khai", body: "Thực hiện theo phạm vi đã xác nhận, cập nhật các điểm cần duyệt trong quá trình làm.", icon: "code" },
        { title: "4. Kiểm tra & QA", body: "Rà soát nội dung, responsive, liên kết, biểu mẫu và các điều kiện bàn giao.", icon: "badge-check" },
        { title: "5. Bàn giao", body: "Bàn giao sản phẩm, tài liệu, quyền truy cập và hướng dẫn vận hành theo checklist.", icon: "send" },
        { title: "6. Đồng hành", body: "Tiếp nhận câu hỏi hoặc sự cố sau bàn giao theo điều khoản đã thống nhất.", icon: "headset" },
        ]}
        ctaTitle="Bắt đầu bằng một yêu cầu cụ thể"
      />
    </>
  );
}
