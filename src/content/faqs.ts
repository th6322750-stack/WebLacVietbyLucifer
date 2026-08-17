import type { FAQ } from "@/lib/types";

export const faqs: FAQ[] = [
  // /website — 6 questions per approved master (page-04).
  {
    id: "website-thoi-gian",
    scope: "website",
    question: "Thời gian thiết kế website là bao lâu?",
    answer:
      "Tuỳ độ phức tạp, một website doanh nghiệp thường hoàn thành trong 2–4 tuần kể từ khi thống nhất nội dung và thiết kế.",
    order: 1,
  },
  {
    id: "website-tuy-chinh",
    scope: "website",
    question: "Tôi có được tuỳ chỉnh giao diện không?",
    answer: "Có. Giao diện được thiết kế riêng theo nhận diện thương hiệu của bạn, không dùng mẫu dựng sẵn cố định.",
    order: 2,
  },
  {
    id: "website-chuan-seo",
    scope: "website",
    question: "Website có chuẩn SEO không?",
    answer: "Có. Mọi website đều được tối ưu SEO on-page cơ bản ngay từ khi bàn giao.",
    order: 3,
  },
  {
    id: "website-quan-tri",
    scope: "website",
    question: "Tôi có thể tự quản trị nội dung không?",
    answer: "Có. Website được bàn giao kèm hướng dẫn quản trị nội dung để bạn tự cập nhật khi cần.",
    order: 4,
  },
  {
    id: "website-bao-tri",
    scope: "website",
    question: "Có hỗ trợ bảo trì sau bàn giao không?",
    answer: "Có. Lạc Việt Media hỗ trợ bảo trì và xử lý sự cố kỹ thuật sau bàn giao theo thoả thuận trong hợp đồng.",
    order: 5,
  },
  {
    id: "website-thanh-toan",
    scope: "website",
    question: "Hình thức thanh toán như thế nào?",
    answer: "Thanh toán theo tiến độ dự án, chi tiết cụ thể được thống nhất trong hợp đồng trước khi triển khai.",
    order: 6,
  },

  // /support-mxh — 6 questions per approved master (page-05).
  {
    id: "support-thoi-gian-phan-hoi",
    scope: "support-mxh",
    question: "Hỗ trợ xử lý sự cố tài khoản mất bao lâu?",
    answer: "Đội ngũ hỗ trợ tiếp nhận và phản hồi trong ngày làm việc, ưu tiên xử lý các sự cố ảnh hưởng vận hành.",
    order: 1,
  },
  {
    id: "support-nen-tang",
    scope: "support-mxh",
    question: "Lạc Việt Media hỗ trợ những nền tảng nào?",
    answer: "Facebook, TikTok, YouTube, Meta Business/Ads và các nền tảng mạng xã hội phổ biến khác theo nhu cầu.",
    order: 2,
  },
  {
    id: "support-cam-ket",
    scope: "support-mxh",
    question: "Có cam kết khôi phục thành công không?",
    answer: "Chúng tôi cam kết xử lý đúng chính sách nền tảng và tối ưu khả năng khôi phục, không hứa hẹn kết quả tuyệt đối.",
    order: 3,
  },
  {
    id: "support-chi-phi",
    scope: "support-mxh",
    question: "Chi phí hỗ trợ được tính như thế nào?",
    answer: "Chi phí tuỳ theo mức độ phức tạp của sự cố, được báo giá rõ ràng trước khi bắt đầu xử lý.",
    order: 4,
  },
  {
    id: "support-bao-mat",
    scope: "support-mxh",
    question: "Thông tin tài khoản của tôi có được bảo mật không?",
    answer: "Có. Chúng tôi chỉ truy cập trong phạm vi cần thiết để xử lý sự cố và không chia sẻ thông tin cho bên thứ ba.",
    order: 5,
  },
  {
    id: "support-lien-tuc",
    scope: "support-mxh",
    question: "Sau khi xử lý xong có được theo dõi tiếp không?",
    answer: "Có. Chúng tôi theo dõi ổn định sau xử lý và hỗ trợ nếu sự cố phát sinh lại trong thời gian bảo hành.",
    order: 6,
  },

  // /dich-vu-so — 4 questions per approved master (page-06).
  {
    id: "digital-tai-khoan-chinh-hang",
    scope: "dich-vu-so",
    question: "Tài khoản có chính hãng không?",
    answer: "Các gói cung cấp đều là tài khoản chính hãng hoặc được uỷ quyền hợp lệ, kèm hướng dẫn sử dụng rõ ràng.",
    order: 1,
  },
  {
    id: "digital-thoi-gian-giao",
    scope: "dich-vu-so",
    question: "Thời gian giao tài khoản mất bao lâu?",
    answer: "Hầu hết tài khoản được giao trong vòng vài giờ sau khi xác nhận thanh toán.",
    order: 2,
  },
  {
    id: "digital-tai-khoan-bao-hanh",
    scope: "dich-vu-so",
    question: "Tài khoản có được bảo hành không?",
    answer: "Có. Mỗi gói đều có thời hạn bảo hành tương ứng, được hỗ trợ nếu phát sinh lỗi trong thời gian sử dụng.",
    order: 3,
  },
  {
    id: "digital-ho-tro-su-dung",
    scope: "dich-vu-so",
    question: "Nếu gặp lỗi trong quá trình sử dụng thì sao?",
    answer: "Đội ngũ hỗ trợ sẽ đồng hành xử lý trong suốt thời gian sử dụng dịch vụ.",
    order: 4,
  },

  // /lien-he — 4 questions per approved master (page-12).
  {
    id: "lien-he-dich-vu",
    scope: "lien-he",
    question: "Lạc Việt Media Agency cung cấp những dịch vụ gì?",
    answer: "Website doanh nghiệp, support mạng xã hội và dịch vụ số/tài khoản — xem chi tiết tại từng trang dịch vụ.",
    order: 1,
  },
  {
    id: "lien-he-thoi-gian-phan-hoi",
    scope: "lien-he",
    question: "Thời gian phản hồi khi gửi thông tin là bao lâu?",
    answer: "Zalo và điện thoại thường có phản hồi nhanh nhất trong giờ hành chính; form liên hệ được xử lý trong ngày làm việc.",
    order: 2,
  },
  {
    id: "lien-he-chi-phi",
    scope: "lien-he",
    question: "Chi phí tư vấn ban đầu là bao nhiêu?",
    answer: "Miễn phí. Lạc Việt Media tư vấn miễn phí để hiểu đúng nhu cầu trước khi đề xuất giải pháp phù hợp.",
    order: 3,
  },
  {
    id: "lien-he-ho-tro",
    scope: "lien-he",
    question: "Tôi có được hỗ trợ nếu chưa rõ nhu cầu của mình?",
    answer: "Có. Đội ngũ tư vấn sẽ hỏi thêm để giúp bạn xác định đúng nhu cầu và dịch vụ phù hợp.",
    order: 4,
  },
];

export function getFaqsByScope(scope: string) {
  return faqs.filter((f) => f.scope === scope).sort((a, b) => a.order - b.order);
}
