import { ResourcePage } from "@/components/content/ResourcePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tuyển dụng",
  description: "Cơ hội hợp tác và tuyển dụng tại Lạc Việt Media Agency.",
  path: "/tuyen-dung",
  noindex: true,
});

export default function RecruitmentPage() {
  return (
    <ResourcePage
      eyebrow="Lạc Việt Media Agency"
      title="Tuyển dụng & hợp tác"
      description="Chúng tôi luôn cởi mở với những người muốn cùng xây dựng sản phẩm số tử tế, rõ ràng và hữu ích."
      notice="Hiện chưa công bố vị trí tuyển dụng cụ thể. Khi có nhu cầu phù hợp, thông tin vị trí, hình thức làm việc và cách ứng tuyển sẽ được cập nhật tại đây."
      sections={[
        { title: "Thiết kế & nội dung", body: "Cộng tác theo dự án cho UI, hình ảnh, nội dung website và hệ thống thương hiệu.", icon: "palette" },
        { title: "Kỹ thuật & vận hành", body: "Cùng xây dựng, kiểm thử và duy trì các sản phẩm web an toàn, dễ quản trị.", icon: "code" },
        { title: "Tinh thần làm việc", body: "Ưu tiên sự minh bạch, chủ động, tôn trọng phạm vi và chịu trách nhiệm với đầu ra.", icon: "shield-check" },
        { title: "Cách kết nối", body: "Gửi giới thiệu ngắn về năng lực và lĩnh vực bạn muốn hợp tác qua kênh liên hệ của Lạc Việt.", icon: "messages-square" },
      ]}
      ctaTitle="Muốn hợp tác cùng Lạc Việt?"
    />
  );
}
