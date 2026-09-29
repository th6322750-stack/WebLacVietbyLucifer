import { ResourcePage } from "@/components/content/ResourcePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hợp đồng mẫu",
  description: "Thông tin về cách nhận và rà soát mẫu hợp đồng theo phạm vi dịch vụ.",
  path: "/hop-dong-mau",
  noindex: true,
});

export default function ContractTemplatePage() {
  return (
    <ResourcePage
      eyebrow="Hướng dẫn & hỗ trợ"
      title="Hợp đồng mẫu"
      description="Mẫu tham khảo được điều chỉnh theo loại dịch vụ, hiện trạng và đầu ra của từng dự án."
      notice="Lạc Việt không phát hành một mẫu hợp đồng chung áp dụng cho mọi trường hợp. Vui lòng trao đổi để nhận bản phù hợp và được giải thích từng điều khoản trước khi ký."
      sections={[
        { title: "Phạm vi & đầu ra", body: "Mô tả rõ hạng mục thực hiện, phần không bao gồm và tiêu chí nghiệm thu.", icon: "target" },
        { title: "Quyền sở hữu & truy cập", body: "Ghi nhận chủ thể đứng tên tên miền, hosting, tài khoản và tài sản bàn giao.", icon: "lock-keyhole" },
        { title: "Chi phí & tiến độ", body: "Các mốc thanh toán, thời gian và thay đổi phạm vi được ghi theo dự án cụ thể.", icon: "credit-card" },
        { title: "Hỗ trợ sau bàn giao", body: "Nêu thời hạn, kênh tiếp nhận và giới hạn hỗ trợ để hai bên có cùng kỳ vọng.", icon: "headset" },
      ]}
      ctaTitle="Nhận mẫu phù hợp với dự án của bạn"
    />
  );
}
