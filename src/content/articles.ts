import type { Article } from "@/lib/types";

// Titles/categories transcribed from .webby/visual-master/gd1-v1/pages/page-08.webp (featured +
// grid) and page-11.webp (article-detail template) at 3x-8x zoom — GD10 re-QA round 2 required
// exact identities. Body paragraphs beyond title/category/meta/TOC headings are demo
// reconstructions (source card/body copy is below reliable legibility on this GD1 preview
// render at any zoom tried); see IMPLEMENTATION_RECEIPT.json for the confidence note.
//
// Known deviation: page-08's grid shows "SEO Onpage là gì? 15 yếu tố quan trọng cần tối ưu" as
// its SEO card; page-11's detail-page template mockup for the SEO article reads "10 yếu tố SEO
// quan trọng giúp website lên top Google" with its own exact 10-item TOC/meta. Unified to the
// page-11 identity for that slot (grid card + detail) for internally consistent navigation,
// same tradeoff as the /du-an project dataset — flagged for ChatGPT to confirm.
export const articles: Article[] = [
  {
    slug: "ai-trong-marketing-2024-xu-huong-ung-dung-va-co-hoi-cho-doanh-nghiep",
    title: "AI trong Marketing 2024: Xu hướng, ứng dụng và cơ hội cho doanh nghiệp",
    category: "AI",
    excerpt: "AI đang thay đổi cách doanh nghiệp tiếp cận khách hàng, tối ưu chiến dịch và tăng hiệu suất vận hành.",
    publishedAt: "2024-09-10",
    author: "Lạc Việt Media Agency",
    coverAssetId: "article-cover-01",
    readMinutes: 6,
    content: [
      {
        id: "xu-huong-ai-marketing",
        heading: "Xu hướng ứng dụng AI trong marketing",
        body: ["AI đang được ứng dụng rộng rãi từ cá nhân hoá nội dung đến tối ưu chiến dịch quảng cáo theo thời gian thực."],
      },
      {
        id: "co-hoi-cho-doanh-nghiep",
        heading: "Cơ hội cho doanh nghiệp vừa và nhỏ",
        body: ["Các công cụ AI phổ biến giúp doanh nghiệp nhỏ tiếp cận năng lực marketing vốn chỉ dành cho đội ngũ lớn."],
      },
    ],
  },
  {
    slug: "checklist-20-diem-quan-trong-khi-thiet-ke-website-doanh-nghiep",
    title: "Checklist 20 điểm quan trọng khi thiết kế Website doanh nghiệp",
    category: "Website",
    excerpt: "Một website hiệu quả cần đảm bảo nhiều yếu tố từ chuẩn SEO, tốc độ đến trải nghiệm người dùng.",
    publishedAt: "2024-08-20",
    author: "Lạc Việt Media Agency",
    coverAssetId: "article-cover-02",
    readMinutes: 5,
    content: [
      {
        id: "yeu-to-ky-thuat",
        heading: "Các yếu tố kỹ thuật cần kiểm tra",
        body: ["Tốc độ tải trang, chuẩn SEO on-page và khả năng hiển thị trên di động là ba yếu tố ưu tiên hàng đầu."],
      },
      {
        id: "yeu-to-noi-dung",
        heading: "Các yếu tố nội dung cần kiểm tra",
        body: ["Nội dung cần rõ ràng, đúng đối tượng và có lời kêu gọi hành động cụ thể ở mỗi trang quan trọng."],
      },
    ],
  },
  {
    slug: "7-cach-tang-follow-tiktok-thuc-chat-va-ben-vung-2024",
    title: "7 cách tăng follow TikTok thực chất và bền vững 2024",
    category: "TikTok",
    excerpt: "Tăng follow bền vững đến từ nội dung nhất quán và đúng insight khán giả, không chỉ từ mẹo tăng ảo.",
    publishedAt: "2024-08-05",
    author: "Lạc Việt Media Agency",
    coverAssetId: "article-cover-03",
    readMinutes: 4,
    content: [
      {
        id: "noi-dung-nhat-quan",
        heading: "Duy trì nội dung nhất quán",
        body: ["Một chủ đề rõ ràng và tần suất đăng đều đặn giúp kênh dễ được đề xuất hơn theo thời gian."],
      },
      {
        id: "tuong-tac-cong-dong",
        heading: "Chủ động tương tác với cộng đồng",
        body: ["Phản hồi bình luận và tận dụng xu hướng phù hợp thương hiệu giúp tăng khả năng tiếp cận tự nhiên."],
      },
    ],
  },
  {
    slug: "quang-cao-facebook-hieu-qua-huong-dan-cho-nguoi-moi-bat-dau",
    title: "Quảng cáo Facebook hiệu quả: Hướng dẫn cho người mới bắt đầu",
    category: "Facebook",
    excerpt: "Nắm vững các bước cơ bản giúp chiến dịch quảng cáo Facebook đầu tiên tránh những sai lầm phổ biến.",
    publishedAt: "2024-07-22",
    author: "Lạc Việt Media Agency",
    coverAssetId: "article-cover-04",
    readMinutes: 5,
    content: [
      {
        id: "xac-dinh-muc-tieu",
        heading: "Xác định đúng mục tiêu chiến dịch",
        body: ["Mỗi mục tiêu (nhận diện, chuyển đổi, tương tác) cần cách tối ưu quảng cáo khác nhau."],
      },
      {
        id: "toi-uu-ngan-sach",
        heading: "Tối ưu ngân sách và đối tượng",
        body: ["Thử nghiệm nhiều nhóm đối tượng nhỏ trước khi mở rộng ngân sách cho nhóm hiệu quả nhất."],
      },
    ],
  },
  {
    slug: "10-yeu-to-seo-quan-trong-giup-website-len-top-google",
    title: "10 yếu tố SEO quan trọng giúp website lên top Google",
    category: "SEO",
    excerpt: "Để website lên top Google không chỉ cần nội dung hay mà còn phải tối ưu nhiều yếu tố kỹ thuật và trải nghiệm người dùng. Dưới đây là 10 yếu tố quan trọng nhất bạn cần tập trung.",
    publishedAt: "2024-05-15",
    author: "Lạc Việt Media Agency",
    coverAssetId: "article-cover-05",
    readMinutes: 8,
    content: [
      { id: "nghien-cuu-tu-khoa", heading: "1. Nghiên cứu từ khóa", body: ["Xác định đúng bộ từ khoá mục tiêu là bước nền tảng trước khi tối ưu bất kỳ nội dung nào."] },
      { id: "toi-uu-onpage", heading: "2. Tối ưu Onpage", body: ["Tối ưu tiêu đề, mô tả, heading và cấu trúc URL theo đúng từ khoá mục tiêu của từng trang."] },
      { id: "noi-dung-chat-luong", heading: "3. Nội dung chất lượng", body: ["Nội dung cần giải quyết đúng nhu cầu tìm kiếm, đủ chi tiết và cập nhật thường xuyên."] },
      { id: "toi-uu-ky-thuat", heading: "4. Tối ưu kỹ thuật", body: ["Cấu trúc website rõ ràng, sitemap và robots.txt chuẩn giúp công cụ tìm kiếm thu thập dữ liệu hiệu quả hơn."] },
      { id: "toc-do-tai-trang", heading: "5. Tốc độ tải trang", body: ["Trang tải nhanh cải thiện trải nghiệm người dùng và là một yếu tố xếp hạng trực tiếp."] },
      { id: "mobile-friendly", heading: "6. Mobile Friendly", body: ["Giao diện phải hiển thị tốt trên di động vì phần lớn lượt tìm kiếm hiện nay đến từ thiết bị di động."] },
      { id: "backlink-chat-luong", heading: "7. Backlink chất lượng", body: ["Liên kết từ các nguồn uy tín, liên quan giúp tăng độ tin cậy của website trong mắt công cụ tìm kiếm."] },
      { id: "trai-nghiem-nguoi-dung", heading: "8. Trải nghiệm người dùng", body: ["Điều hướng rõ ràng và thời gian ở lại trang cao là tín hiệu tích cực cho thứ hạng dài hạn."] },
      { id: "seo-local", heading: "9. SEO Local", body: ["Với doanh nghiệp có địa điểm cụ thể, tối ưu thông tin địa phương giúp tăng khả năng hiển thị trong tìm kiếm khu vực."] },
      { id: "theo-doi-cai-thien", heading: "10. Theo dõi & cải thiện", body: ["Theo dõi số liệu định kỳ giúp phát hiện sớm vấn đề và liên tục cải thiện hiệu quả SEO."] },
    ],
  },
  {
    slug: "top-10-cong-cu-ai-ho-tro-marketing-tot-nhat-hien-nay",
    title: "Top 10 công cụ AI hỗ trợ Marketing tốt nhất hiện nay",
    category: "AI",
    excerpt: "Giúp bạn tiết kiệm thời gian và tối ưu hiệu suất, đây là những công cụ AI được nhiều marketer tin dùng.",
    publishedAt: "2024-07-01",
    author: "Lạc Việt Media Agency",
    coverAssetId: "article-cover-06",
    readMinutes: 6,
    content: [
      {
        id: "cong-cu-noi-dung",
        heading: "Công cụ hỗ trợ tạo nội dung",
        body: ["Các công cụ AI tạo nội dung giúp rút ngắn thời gian lên ý tưởng và bản thảo đầu tiên."],
      },
      {
        id: "cong-cu-phan-tich",
        heading: "Công cụ hỗ trợ phân tích dữ liệu",
        body: ["AI giúp tổng hợp và diễn giải dữ liệu chiến dịch nhanh hơn, hỗ trợ ra quyết định kịp thời."],
      },
    ],
  },
  {
    slug: "5-buoc-xay-dung-chien-luoc-marketing-hieu-qua-tu-a-z",
    title: "5 bước xây dựng chiến lược Marketing hiệu quả từ A-Z",
    category: "Marketing",
    excerpt: "Một chiến lược marketing hiệu quả cần đi từ mục tiêu rõ ràng đến đo lường kết quả cụ thể.",
    publishedAt: "2024-06-12",
    author: "Lạc Việt Media Agency",
    coverAssetId: "article-cover-07",
    readMinutes: 6,
    content: [
      {
        id: "xac-dinh-muc-tieu-chien-luoc",
        heading: "Xác định mục tiêu chiến lược",
        body: ["Mục tiêu cụ thể, đo lường được là nền tảng để xây dựng toàn bộ chiến lược phía sau."],
      },
      {
        id: "trien-khai-va-do-luong",
        heading: "Triển khai và đo lường",
        body: ["Theo dõi chỉ số định kỳ giúp điều chỉnh chiến lược kịp thời thay vì chờ đến cuối chiến dịch."],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
