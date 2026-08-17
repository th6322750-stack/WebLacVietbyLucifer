import type { Project } from "@/lib/types";

// Titles/categories transcribed from .webby/visual-master/gd1-v1/pages/page-07.webp (grid) at
// 8x-12x zoom. GD10 re-QA round 3 corrected two transcription errors from round 2 ("Au Phú
// House" -> "An Phú Home", "Trang Canfia" -> "2024 Thời Trang Canifa") and confirmed the grid
// card #1 and the page-07 featured-case-study banner are both "The Maison" — do not unify it
// with the page-10 detail-template project below. Body-copy paragraphs beyond
// title/category/meta remain demo reconstructions (source card body text is below reliable
// legibility even at high zoom); see IMPLEMENTATION_RECEIPT.json confidenceNotes. All entries
// are demoOnly per CONTENT_TRUTH.json — never render as fact.
export const projects: Project[] = [
  {
    slug: "website-bat-dong-san-the-maison",
    title: "Website Bất Động Sản The Maison",
    category: "Website",
    summary: "Website bất động sản chuẩn trải nghiệm cao cấp, giúp khách hàng tìm kiếm và khám phá dự án dễ dàng hơn.",
    demoOnly: true,
    heroAssetId: "project-cover-01",
    solution: "Thiết kế trải nghiệm cao cấp từ UX chiến lược, thiết kế UI/UX đến vận hành trưng bày dự án trực tuyến.",
    resultMetrics: [
      { value: "+165%", label: "Khách hàng truy cập" },
      { value: "+70%", label: "Thời gian trên trang" },
      { value: "+30%", label: "Tương tác" },
      { value: "35%", label: "Chi phí quảng cáo" },
    ],
    technology: ["Next.js", "Trải nghiệm cao cấp"],
  },
  {
    slug: "chien-dich-social-media-chuoi-cafe-lumi",
    title: "Chiến dịch Social Media Chuỗi Cafe LUMI",
    category: "Social",
    summary: "Xây dựng và vận hành nội dung mạng xã hội cho chuỗi cafe LUMI, tập trung tăng độ nhận diện và lượng khách ghé chi nhánh.",
    demoOnly: true,
    heroAssetId: "project-cover-02",
    solution: "Lên kế hoạch nội dung theo chủ đề từng tuần, tối ưu định dạng video ngắn và tương tác cộng đồng.",
    results: ["Tăng đáng kể lượt tương tác và lượt theo dõi kênh", "Tần suất đăng bài đều đặn theo lịch nội dung"],
    technology: ["Content calendar", "Short-form video"],
  },
  {
    slug: "digital-marketing-nha-khoa-viet-smile",
    title: "Digital Marketing Nha Khoa Việt Smile",
    category: "Digital Services",
    summary: "Triển khai chiến dịch digital marketing tổng thể cho hệ thống nha khoa Việt Smile, tối ưu chuyển đổi từ quảng cáo.",
    demoOnly: true,
    heroAssetId: "project-cover-03",
    solution: "Tối ưu landing page đặt lịch khám, phân bổ ngân sách quảng cáo theo từng chi nhánh.",
    results: ["Tăng số lượng khách hàng đặt lịch qua kênh online"],
    technology: ["Google Ads", "Landing page tối ưu chuyển đổi"],
  },
  {
    slug: "landing-page-khoa-hoc-master-ux",
    title: "Landing Page Khoá học Master UX",
    category: "Landing Page",
    summary: "Landing page tuyển sinh cho khoá học Master UX, tối ưu tỷ lệ chuyển đổi đăng ký.",
    demoOnly: true,
    heroAssetId: "project-cover-04",
    solution: "Thiết kế một trang tập trung vào lộ trình học và lời chứng thực học viên, rút gọn form đăng ký.",
    results: ["Tỷ lệ chuyển đổi cao hơn mức trung bình ngành"],
    technology: ["Next.js", "Form tối ưu chuyển đổi"],
  },
  {
    slug: "website-noi-that-an-phu-home",
    title: "Website Nội Thất An Phú Home",
    category: "Website",
    summary: "Website showroom nội thất An Phú Home, tối ưu trải nghiệm duyệt sản phẩm và tra cứu mẫu.",
    demoOnly: true,
    heroAssetId: "project-cover-05",
    solution: "Tối ưu trải nghiệm người dùng với bộ lọc sản phẩm trực quan và gallery tải nhanh.",
    results: ["Tăng thời gian ở lại trang và số sản phẩm được xem mỗi lượt truy cập"],
    technology: ["Next.js", "Image optimization"],
  },
  {
    slug: "thiet-ke-ui-ux-ung-dung-finevast",
    title: "Thiết kế UI/UX Ứng dụng Finevast",
    category: "UI/UX",
    summary: "Thiết kế giao diện và trải nghiệm người dùng cho ứng dụng quản lý tài chính cá nhân Finevast.",
    demoOnly: true,
    heroAssetId: "project-cover-06",
    solution: "Giao diện thân thiện, tối ưu hành trình người dùng qua các bước quản lý tài chính chính.",
    results: ["Tăng tỷ lệ hoàn tất các luồng giao dịch chính trong ứng dụng"],
    technology: ["Figma", "Design system riêng"],
  },
  {
    slug: "seo-tong-the-evie-smart",
    title: "SEO Tổng Thể Evie Smart",
    category: "Digital Services",
    summary: "Triển khai SEO tổng thể cho thương hiệu thiết bị thông minh Evie Smart.",
    demoOnly: true,
    heroAssetId: "project-cover-07",
    solution: "Tối ưu kỹ thuật, nội dung theo bộ từ khoá mục tiêu và xây dựng hệ thống liên kết nội bộ.",
    results: ["Cải thiện thứ hạng cho nhóm từ khoá mục tiêu", "Tăng lượng truy cập tự nhiên"],
    technology: ["SEO kỹ thuật", "Tối ưu nội dung"],
  },
  {
    slug: "chien-dich-tet-2024-thoi-trang-canifa",
    title: "Chiến dịch Tết 2024 Thời Trang Canifa",
    category: "Social",
    summary: "Chiến dịch nội dung mùa Tết 2024 cho thương hiệu thời trang Canifa trên mạng xã hội.",
    demoOnly: true,
    heroAssetId: "project-cover-08",
    solution: "Xây dựng bộ nội dung chủ đề Tết đồng bộ trên các kênh, kết hợp ưu đãi giới hạn thời gian.",
    results: ["Tăng lượt tương tác trong giai đoạn cao điểm mùa Tết"],
    technology: ["Content theo mùa vụ"],
  },
  {
    slug: "website-resort-lakeside-retreat",
    title: "Website Resort Lakeside Retreat",
    category: "Website",
    summary: "Website đặt phòng cho khu nghỉ dưỡng Lakeside Retreat, tối ưu trải nghiệm tìm và đặt phòng.",
    demoOnly: true,
    heroAssetId: "project-cover-09",
    solution: "Tối ưu luồng đặt phòng, hiển thị rõ tiện ích và hình ảnh khu nghỉ dưỡng.",
    results: ["Tăng số lượt đặt phòng trực tuyến"],
    technology: ["Next.js", "Booking flow tối ưu"],
  },
  {
    slug: "landing-page-san-pham-saas-bioflow",
    title: "Landing Page Sản phẩm SaaS - BioFlow",
    category: "Landing Page",
    summary: "Landing page ra mắt sản phẩm SaaS BioFlow, tập trung vào chuyển đổi đăng ký thử nghiệm.",
    demoOnly: true,
    heroAssetId: "project-cover-10",
    solution: "Trình bày rõ giá trị sản phẩm theo từng nhóm khách hàng, tối ưu CTA đăng ký dùng thử.",
    results: ["Tỷ lệ chuyển đổi đăng ký dùng thử tăng đáng kể"],
    technology: ["Next.js", "A/B testing CTA"],
  },
  {
    slug: "thiet-ke-ui-ux-ung-dung-healthcare",
    title: "Thiết kế UI/UX Ứng dụng HealthCare",
    category: "UI/UX",
    summary: "Thiết kế giao diện ứng dụng theo dõi sức khoẻ cá nhân HealthCare, ưu tiên rõ ràng và dễ dùng.",
    demoOnly: true,
    heroAssetId: "project-cover-11",
    solution: "Đơn giản hoá luồng nhập liệu sức khoẻ hàng ngày, trực quan hoá dữ liệu theo dõi.",
    results: ["Tăng tần suất người dùng cập nhật dữ liệu hàng ngày"],
    technology: ["Figma", "Data visualization"],
  },
  {
    slug: "quang-cao-google-ads-ecom-shinlala",
    title: "Quảng cáo Google Ads Ecom - Shinlala",
    category: "Digital Services",
    summary: "Vận hành chiến dịch Google Ads cho sàn thương mại điện tử thời trang Shinlala.",
    demoOnly: true,
    heroAssetId: "project-cover-12",
    solution: "Tối ưu nhóm quảng cáo theo danh mục sản phẩm, kiểm soát chi phí trên mỗi đơn hàng.",
    results: ["Giảm chi phí quảng cáo trên mỗi đơn hàng", "Tăng doanh thu từ kênh quảng cáo"],
    technology: ["Google Ads", "Theo dõi chuyển đổi"],
  },
  // Detail-template fixture only (page-10) — resolvable by slug for /du-an/[slug] evidence,
  // deliberately `hidden` from the /du-an grid/filters per GD10 re-QA round 3 item 2: the
  // approved master keeps this as a distinct detail-page identity from "The Maison" above.
  // It carries no project cover of its own — see the detailVisualAssetId note below.
  {
    slug: "website-bat-dong-san-an-phat",
    title: "Website Bất Động Sản An Phát",
    category: "Website",
    summary: "An Phát là sàn giao dịch bất động sản với hàng trăm dự án và sản phẩm, phục vụ nhu cầu tìm kiếm nhà ở đa dạng của khách hàng.",
    demoOnly: true,
    hidden: true,
    // No heroAssetId: this fixture never appears in a grid, and project-cover-01 is
    // identity-bound to demo-project-01 (The Maison) — borrowing it leaked that identity into
    // this route's visual-showcase (GD10 re-QA round 4, R4-01). ASSET_USAGE_MAP.json maps this
    // route's detail visual to project-detail-device-master, the only non-identity-bound
    // DETAIL_VISUAL available for /du-an/[slug].
    detailVisualAssetId: "project-detail-device-master",
    durationLabel: "20 ngày",
    completedLabel: "05/2024",
    challenge: "Website cũ tải chậm, giao diện cũ, khó quản lý và không tối ưu trên di động, khiến khách hàng khó tìm kiếm sản phẩm phù hợp.",
    solution: "Thiết kế lại giao diện hiện đại, sang trọng; xây dựng tìm kiếm nâng cao với bộ lọc thông minh; tối ưu tốc độ tải và chuẩn SEO; quản trị nội dung dễ dàng và linh hoạt hơn.",
    resultMetrics: [
      { value: "+68%", label: "Tăng lượng truy cập" },
      { value: "+45%", label: "Tăng tỷ lệ chuyển đổi" },
      { value: "-40%", label: "Giảm tỷ lệ thoát trang" },
    ],
    technology: ["Next.js", "Bộ lọc tìm kiếm nâng cao", "SEO on-page"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Grid/filter-visible projects only — excludes detail-template-only fixtures. */
export function getVisibleProjects() {
  return projects.filter((p) => !p.hidden);
}
