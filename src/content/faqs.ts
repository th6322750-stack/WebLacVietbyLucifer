import type { FAQ } from "@/lib/types";

export const faqs: FAQ[] = [
  {
    id: "website-thoi-gian",
    scope: "website",
    question: "Thời gian hoàn thành một website mất bao lâu?",
    answer:
      "Tuỳ độ phức tạp, một website doanh nghiệp thường hoàn thành trong 2–4 tuần kể từ khi thống nhất nội dung và thiết kế.",
    order: 1,
  },
  {
    id: "website-bao-tri",
    scope: "website",
    question: "Sau khi bàn giao có được hỗ trợ bảo trì không?",
    answer: "Có. Lạc Việt Media hỗ trợ bảo trì và xử lý sự cố kỹ thuật sau bàn giao theo thoả thuận trong hợp đồng.",
    order: 2,
  },
  {
    id: "website-noi-dung",
    scope: "website",
    question: "Tôi có thể tự cập nhật nội dung website không?",
    answer: "Có. Website được bàn giao kèm hướng dẫn quản trị nội dung để bạn tự cập nhật khi cần.",
    order: 3,
  },
  {
    id: "support-thoi-gian-phan-hoi",
    scope: "support-mxh",
    question: "Thời gian phản hồi khi có sự cố mạng xã hội là bao lâu?",
    answer: "Đội ngũ hỗ trợ tiếp nhận và phản hồi trong ngày làm việc, ưu tiên xử lý các sự cố ảnh hưởng vận hành.",
    order: 1,
  },
  {
    id: "support-nen-tang",
    scope: "support-mxh",
    question: "Lạc Việt Media hỗ trợ những nền tảng nào?",
    answer: "Facebook, TikTok, YouTube và các nền tảng mạng xã hội phổ biến khác theo nhu cầu của doanh nghiệp.",
    order: 2,
  },
  {
    id: "digital-tai-khoan-chinh-hang",
    scope: "dich-vu-so",
    question: "Các tài khoản, công cụ số có phải hàng chính hãng không?",
    answer: "Các gói cung cấp đều là tài khoản chính hãng hoặc được uỷ quyền hợp lệ, kèm hướng dẫn sử dụng rõ ràng.",
    order: 1,
  },
  {
    id: "digital-ho-tro-su-dung",
    scope: "dich-vu-so",
    question: "Nếu gặp lỗi trong quá trình sử dụng thì sao?",
    answer: "Đội ngũ hỗ trợ sẽ đồng hành xử lý trong suốt thời gian sử dụng dịch vụ.",
    order: 2,
  },
  {
    id: "lien-he-hinh-thuc",
    scope: "lien-he",
    question: "Tôi nên liên hệ qua kênh nào là nhanh nhất?",
    answer: "Zalo và điện thoại thường có phản hồi nhanh nhất trong giờ hành chính; bạn cũng có thể để lại thông tin qua form.",
    order: 1,
  },
  {
    id: "lien-he-tu-van-mien-phi",
    scope: "lien-he",
    question: "Tư vấn ban đầu có mất phí không?",
    answer: "Không. Lạc Việt Media tư vấn miễn phí để hiểu đúng nhu cầu trước khi đề xuất giải pháp phù hợp.",
    order: 2,
  },
];

export function getFaqsByScope(scope: string) {
  return faqs.filter((f) => f.scope === scope).sort((a, b) => a.order - b.order);
}
