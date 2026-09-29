import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourcePage, type ResourceSection } from "@/components/content/ResourcePage";
import { pageMetadata } from "@/lib/seo";

const policies: Record<
  string,
  { title: string; description: string; sections: ResourceSection[] }
> = {
  "thanh-toan": {
    title: "Chính sách thanh toán",
    description: "Nguyên tắc trao đổi và xác nhận thanh toán cho dịch vụ số của Lạc Việt.",
    sections: [
      { title: "Xác nhận trước khi triển khai", body: "Phạm vi, đầu ra, mốc bàn giao và chi phí được thống nhất bằng văn bản trước khi bắt đầu.", icon: "calendar" },
      { title: "Thanh toán theo tiến độ", body: "Các mốc thanh toán được ghi rõ trong báo giá hoặc hợp đồng của từng dự án; không áp dụng một lịch chung cho mọi nhu cầu.", icon: "credit-card" },
      { title: "Đối soát", body: "Mọi thay đổi phạm vi hoặc chi phí phát sinh chỉ thực hiện sau khi hai bên xác nhận lại.", icon: "check" },
    ],
  },
  "van-chuyen-va-giao-nhan": {
    title: "Chính sách vận chuyển và giao nhận",
    description: "Cách Lạc Việt bàn giao sản phẩm số, tài khoản và tài liệu cho khách hàng.",
    sections: [
      { title: "Dịch vụ số, bàn giao số", body: "Website, tài liệu và hướng dẫn được bàn giao qua kênh trực tuyến đã thống nhất; không có vận chuyển hàng hoá mặc định.", icon: "send" },
      { title: "Quyền truy cập", body: "Quyền quản trị, tên miền, hosting và tài khoản liên quan được kiểm kê và bàn giao theo phạm vi đã chốt.", icon: "lock-keyhole" },
      { title: "Xác nhận hoàn tất", body: "Hai bên kiểm tra đầu ra theo checklist trước khi xác nhận từng mốc bàn giao.", icon: "check" },
    ],
  },
  "bao-mat-thong-tin": {
    title: "Chính sách bảo mật thông tin",
    description: "Nguyên tắc xử lý thông tin bạn gửi khi trao đổi và sử dụng dịch vụ.",
    sections: [
      { title: "Thông tin được sử dụng để tư vấn", body: "Thông tin liên hệ và nội dung yêu cầu được dùng để phản hồi, lập phương án và hỗ trợ đúng nhu cầu bạn gửi.", icon: "shield-check" },
      { title: "Không tự ý mở rộng phạm vi", body: "Lạc Việt không dùng dữ liệu bạn cung cấp để tạo các tuyên bố, hồ sơ khách hàng hoặc nội dung marketing khi chưa có xác nhận phù hợp.", icon: "lock-keyhole" },
      { title: "Trao đổi an toàn", body: "Không gửi mật khẩu qua tin nhắn công khai. Khi cần quyền truy cập, hai bên thống nhất kênh và cách bàn giao riêng.", icon: "messages-square" },
    ],
  },
  "xu-ly-khieu-nai": {
    title: "Chính sách xử lý khiếu nại",
    description: "Quy trình tiếp nhận, rà soát và phản hồi khi bạn cần hỗ trợ về phạm vi đã thống nhất.",
    sections: [
      { title: "Tiếp nhận", body: "Gửi nội dung cần rà soát qua Zalo hoặc Telegram, kèm đường dẫn, mốc bàn giao và thông tin liên quan.", icon: "messages-square" },
      { title: "Rà soát theo bằng chứng", body: "Lạc Việt kiểm tra yêu cầu với checklist, báo giá hoặc hợp đồng thay vì phỏng đoán nguyên nhân.", icon: "search" },
      { title: "Phương án xử lý", body: "Kết quả rà soát sẽ nêu rõ phần thuộc phạm vi, phần cần bổ sung và bước tiếp theo để hai bên xác nhận.", icon: "target" },
    ],
  },
  "bao-hanh": {
    title: "Chính sách bảo hành",
    description: "Nguyên tắc hỗ trợ sau bàn giao đối với phần việc đã được xác nhận.",
    sections: [
      { title: "Phạm vi bảo hành", body: "Thời hạn và hạng mục hỗ trợ được ghi cụ thể trong báo giá hoặc hợp đồng của dự án.", icon: "shield-check" },
      { title: "Tiếp nhận lỗi", body: "Gửi mô tả, ảnh hoặc video lỗi và môi trường xảy ra để đội ngũ tái hiện đúng vấn đề.", icon: "circle-alert" },
      { title: "Ngoài phạm vi", body: "Thay đổi nội dung, nền tảng hoặc yêu cầu mới sau bàn giao được tách thành hạng mục bổ sung nếu cần.", icon: "package" },
    ],
  },
  "doi-tra-va-hoan-tien": {
    title: "Chính sách đổi trả và hoàn tiền",
    description: "Nguyên tắc xử lý khi phạm vi dịch vụ số cần điều chỉnh hoặc dừng lại.",
    sections: [
      { title: "Trao đổi trước khi bắt đầu", body: "Nếu có điểm chưa rõ, hãy yêu cầu làm rõ phạm vi và đầu ra trước khi xác nhận triển khai.", icon: "messages-square" },
      { title: "Điều chỉnh phạm vi", body: "Thay đổi được đối soát theo phần việc đã thực hiện và phần việc còn lại, sau đó xác nhận phương án mới bằng văn bản.", icon: "calendar" },
      { title: "Xử lý theo thoả thuận", body: "Mọi hoàn trả hoặc điều chỉnh chi phí được thực hiện theo điều khoản đã ký của dự án, không áp dụng một công thức chung.", icon: "credit-card" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) return {};
  return pageMetadata({
    title: policy.title,
    description: policy.description,
    path: `/chinh-sach/${slug}`,
    // These are the public framework pages; owner-specific legal text must be reviewed before
    // they become indexable claims.
    noindex: true,
  });
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();
  return (
    <ResourcePage
      eyebrow="Chính sách & minh bạch"
      title={policy.title}
      description={policy.description}
      sections={policy.sections}
      notice="Đây là khung thông tin vận hành hiện tại. Điều khoản áp dụng cho từng dự án được xác nhận trong báo giá hoặc hợp đồng trước khi triển khai."
      ctaTitle="Cần xác nhận chính sách cho dự án của bạn?"
    />
  );
}
