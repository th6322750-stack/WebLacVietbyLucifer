import type { Article } from "@/lib/types";

export const articles: Article[] = [
  {
    slug: "5-dau-hieu-website-doanh-nghiep-can-nang-cap",
    title: "5 dấu hiệu website doanh nghiệp cần nâng cấp",
    category: "Website",
    excerpt:
      "Website tải chậm, không tối ưu di động hay không có kênh chuyển đổi rõ ràng là những dấu hiệu bạn không nên bỏ qua.",
    publishedAt: "2026-06-02",
    author: "Đội ngũ Lạc Việt Media",
    coverAssetId: "article-cover-01",
    readMinutes: 5,
    content: [
      {
        id: "toc-do-tai-trang",
        heading: "Tốc độ tải trang chậm",
        body: [
          "Website tải trên 3 giây có nguy cơ mất phần lớn khách truy cập trước khi họ kịp xem nội dung.",
          "Nguyên nhân thường gặp là hình ảnh chưa tối ưu và mã nguồn nặng nề tích tụ qua thời gian.",
        ],
      },
      {
        id: "khong-toi-uu-di-dong",
        heading: "Trải nghiệm di động chưa tốt",
        body: [
          "Phần lớn khách hàng Việt Nam truy cập website từ điện thoại. Giao diện không co giãn tốt sẽ khiến khách rời đi ngay.",
        ],
      },
      {
        id: "thieu-kenh-chuyen-doi",
        heading: "Thiếu kênh chuyển đổi rõ ràng",
        body: [
          "Một website hiệu quả cần có lời kêu gọi hành động rõ ràng và quy trình để lại thông tin đơn giản, không quá 5 trường.",
        ],
      },
    ],
  },
  {
    slug: "toi-uu-fanpage-tang-tuong-tac-tu-nhien",
    title: "Tối ưu fanpage để tăng tương tác tự nhiên",
    category: "Support MXH",
    excerpt: "Tương tác tự nhiên đến từ nội dung đúng đối tượng và tần suất đăng bài hợp lý, không chỉ từ quảng cáo.",
    publishedAt: "2026-06-10",
    author: "Đội ngũ Lạc Việt Media",
    coverAssetId: "article-cover-02",
    readMinutes: 4,
    content: [
      {
        id: "xac-dinh-doi-tuong",
        heading: "Xác định đúng đối tượng mục tiêu",
        body: ["Nội dung đúng người xem luôn tạo tương tác tốt hơn nội dung phủ rộng nhưng không rõ đối tượng."],
      },
      {
        id: "tan-suat-dang-bai",
        heading: "Duy trì tần suất đăng bài hợp lý",
        body: ["Đăng đều đặn theo lịch giúp thuật toán ưu tiên hiển thị nội dung của trang tới nhiều người theo dõi hơn."],
      },
    ],
  },
  {
    slug: "khi-nao-nen-dung-cong-cu-ai-cho-doanh-nghiep-nho",
    title: "Khi nào nên dùng công cụ AI cho doanh nghiệp nhỏ",
    category: "Dịch vụ số",
    excerpt: "Công cụ AI có thể tiết kiệm thời gian đáng kể nếu doanh nghiệp chọn đúng công cụ và đúng quy trình áp dụng.",
    publishedAt: "2026-06-18",
    author: "Đội ngũ Lạc Việt Media",
    coverAssetId: "article-cover-03",
    readMinutes: 6,
    content: [
      {
        id: "chon-dung-cong-cu",
        heading: "Chọn đúng công cụ cho từng nhu cầu",
        body: ["Không phải công cụ AI nào cũng phù hợp với mọi quy trình — nên bắt đầu từ nhu cầu cụ thể của đội ngũ."],
      },
      {
        id: "dao-tao-doi-ngu",
        heading: "Đào tạo đội ngũ sử dụng đúng cách",
        body: ["Hiệu quả của công cụ số phụ thuộc nhiều vào việc đội ngũ được hướng dẫn sử dụng bài bản."],
      },
    ],
  },
  {
    slug: "quy-trinh-thiet-ke-website-tai-lac-viet-media",
    title: "Quy trình thiết kế website tại Lạc Việt Media",
    category: "Website",
    excerpt: "Từ khảo sát nhu cầu đến bàn giao — quy trình rõ ràng giúp dự án website đúng tiến độ và đúng kỳ vọng.",
    publishedAt: "2026-06-25",
    author: "Đội ngũ Lạc Việt Media",
    coverAssetId: "article-cover-04",
    readMinutes: 5,
    content: [
      {
        id: "khao-sat-nhu-cau",
        heading: "Khảo sát nhu cầu và mục tiêu",
        body: ["Bước đầu tiên luôn là hiểu rõ mục tiêu kinh doanh và đối tượng khách hàng của doanh nghiệp."],
      },
      {
        id: "thiet-ke-va-phat-trien",
        heading: "Thiết kế và phát triển",
        body: ["Giao diện được thiết kế riêng, sau đó phát triển và kiểm thử kỹ trước khi bàn giao."],
      },
    ],
  },
  {
    slug: "cach-xu-ly-khi-tai-khoan-quang-cao-bi-khoa",
    title: "Cách xử lý khi tài khoản quảng cáo bị khoá",
    category: "Support MXH",
    excerpt: "Tài khoản quảng cáo bị khoá không hiếm gặp — điều quan trọng là xử lý đúng quy trình để khôi phục nhanh nhất.",
    publishedAt: "2026-07-02",
    author: "Đội ngũ Lạc Việt Media",
    coverAssetId: "article-cover-05",
    readMinutes: 4,
    content: [
      {
        id: "kiem-tra-nguyen-nhan",
        heading: "Kiểm tra nguyên nhân bị khoá",
        body: ["Xem thông báo chính sách vi phạm là bước đầu tiên trước khi gửi yêu cầu xem xét lại."],
      },
      {
        id: "khoi-phuc-tai-khoan",
        heading: "Quy trình khôi phục tài khoản",
        body: ["Chuẩn bị đầy đủ giấy tờ xác minh và tuân thủ đúng hướng dẫn của nền tảng để tăng khả năng được khôi phục."],
      },
    ],
  },
  {
    slug: "seo-co-ban-cho-website-doanh-nghiep-vua-va-nho",
    title: "SEO cơ bản cho website doanh nghiệp vừa và nhỏ",
    category: "Website",
    excerpt: "Không cần ngân sách lớn, doanh nghiệp vừa và nhỏ vẫn có thể cải thiện thứ hạng tìm kiếm với vài bước cơ bản.",
    publishedAt: "2026-07-09",
    author: "Đội ngũ Lạc Việt Media",
    coverAssetId: "article-cover-06",
    readMinutes: 6,
    content: [
      {
        id: "toi-uu-tieu-de-mo-ta",
        heading: "Tối ưu tiêu đề và mô tả trang",
        body: ["Mỗi trang nên có tiêu đề và mô tả riêng, phản ánh đúng nội dung để cải thiện tỉ lệ nhấp từ kết quả tìm kiếm."],
      },
      {
        id: "toc-do-va-trai-nghiem",
        heading: "Tốc độ tải và trải nghiệm người dùng",
        body: ["Công cụ tìm kiếm ưu tiên các trang tải nhanh và mang lại trải nghiệm tốt trên di động."],
      },
    ],
  },
  {
    slug: "lua-chon-goi-cong-cu-so-phu-hop-quy-mo-doanh-nghiep",
    title: "Lựa chọn gói công cụ số phù hợp quy mô doanh nghiệp",
    category: "Dịch vụ số",
    excerpt: "Doanh nghiệp nhỏ và đội nhóm lớn cần những gói công cụ số khác nhau — chọn đúng quy mô giúp tối ưu chi phí.",
    publishedAt: "2026-07-16",
    author: "Đội ngũ Lạc Việt Media",
    coverAssetId: "article-cover-07",
    readMinutes: 5,
    content: [
      {
        id: "danh-gia-nhu-cau-thuc-te",
        heading: "Đánh giá nhu cầu thực tế của đội ngũ",
        body: ["Trước khi chọn gói, nên liệt kê rõ số lượng người dùng và tính năng thực sự cần thiết."],
      },
      {
        id: "toi-uu-chi-phi-dai-han",
        heading: "Tối ưu chi phí dài hạn",
        body: ["Gói phù hợp quy mô giúp tránh lãng phí ngân sách cho các tính năng không sử dụng tới."],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
