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
  //
  // Ba câu trả lời đầu đã được viết lại (PHUONG_AN §7.4). Bản cũ hứa ba thứ mà repo không có
  // bằng chứng nào và trang cũng không thực hiện được: tài khoản "chính hãng hoặc được uỷ quyền
  // hợp lệ" (tuyên bố quan hệ với nhà cung cấp), giao "trong vòng vài giờ sau khi xác nhận
  // thanh toán" (một SLA, kèm một luồng thanh toán không tồn tại trên site), và "mỗi gói đều có
  // thời hạn bảo hành tương ứng" (cam kết bảo hành không ai vận hành). FAQ là nơi khách đọc kỹ
  // nhất trước khi quyết định, nên đây đúng là chỗ ít được phép phóng đại nhất.
  {
    id: "digital-tai-khoan-chinh-hang",
    scope: "dich-vu-so",
    question: "Tài khoản được cung cấp như thế nào?",
    answer: "Mỗi nhu cầu được trao đổi trực tiếp qua Zalo để thống nhất phạm vi, hình thức cung cấp và chi phí trước khi triển khai.",
    order: 1,
  },
  {
    id: "digital-thoi-gian-giao",
    scope: "dich-vu-so",
    question: "Thời gian bàn giao mất bao lâu?",
    answer: "Thời gian bàn giao phụ thuộc vào từng công cụ và phạm vi sử dụng, được thống nhất cụ thể khi trao đổi qua Zalo.",
    order: 2,
  },
  {
    id: "digital-tai-khoan-bao-hanh",
    scope: "dich-vu-so",
    question: "Nếu tài khoản phát sinh vấn đề thì xử lý ra sao?",
    answer: "Phạm vi và thời gian hỗ trợ được thống nhất trong quá trình trao đổi, trước khi bạn quyết định sử dụng dịch vụ.",
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
