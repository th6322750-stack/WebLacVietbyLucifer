import type { TruthState } from "@/lib/content-truth";
import type { IconName } from "@/components/ui/Icon";

/** Service registry — PHUONG_AN §7.2 / §13.2.
 *
 * The old `services.ts` was a flat list of exactly three items, and the homepage grid was built
 * around that number. The spec's requirement is the opposite: adding a service must be a data
 * edit, never a layout edit. So this registry carries everything nav, homepage, the hub and the
 * generic detail template need, and every consumer derives its shape from the data.
 *
 * `policyClass` is the part that is not cosmetic. Maxweb's catalogue includes review-selling and
 * review-removal services; those are recorded here as `excluded` so they cannot be published by
 * editing a boolean somewhere else. An excluded service never reaches a publish flow at all.
 */

export type ServiceGroup =
  | "website"
  | "social-support"
  | "performance"
  | "seo-content"
  | "local-presence"
  | "creative-media"
  | "infrastructure"
  | "automation-tools";

export const SERVICE_GROUP_LABELS: Record<ServiceGroup, string> = {
  website: "Website & Landing Page",
  // Nhóm riêng cho support kênh. Trước đây "Support mạng xã hội" bị xếp vào nhóm
  // `performance` ("Quảng cáo đa kênh") — hồi đó không ai thấy vì chỉ có 2 dịch vụ publish và
  // tiêu đề nhóm chưa render ở đâu cả. Từ khi mega menu hiện tiêu đề nhóm, nó thành ra công bố
  // rằng khôi phục tài khoản là một hình thức quảng cáo. Hai việc khác hẳn nhau, và đặt nhầm
  // nhóm làm khách tìm sai chỗ.
  "social-support": "Hỗ trợ kênh mạng xã hội",
  performance: "Quảng cáo đa kênh",
  "seo-content": "SEO & Nội dung",
  "local-presence": "Google Business Profile & Local",
  "creative-media": "Thiết kế thương hiệu & Media",
  infrastructure: "Domain, Hosting & Email",
  "automation-tools": "Công cụ số & Automation",
};

/** Order groups appear in nav and on the hub. Not alphabetical — this is the order the business
 *  wants a visitor to read them in. */
export const SERVICE_GROUP_ORDER: ServiceGroup[] = [
  "website",
  "social-support",
  "local-presence",
  "performance",
  "seo-content",
  "creative-media",
  "infrastructure",
  "automation-tools",
];

export type ContentBlock = { title: string; body?: string };
export type ServiceProcessStep = { title: string; description: string };
export type ServicePageFamily =
  | "local-presence"
  | "paid-media"
  | "website-industry"
  | "integrated-growth"
  | "seo-content"
  | "brand-system"
  | "infrastructure";
export type ServiceModule = ContentBlock & { icon?: IconName; bullets?: string[] };
export type ServiceModuleGroup = { title: string; intro?: string; items: ServiceModule[] };
export type ServiceJourneyStep = { title: string; description: string; output?: string };
export type ServiceCostFactor = { title: string; body: string };

export type ServiceDefinition = TruthState & {
  slug: string;
  group: ServiceGroup;
  title: string;
  summary: string;
  /** Set only for services that have their own hand-built landing. Everything else is rendered
   *  by `/dich-vu/[slug]` from the blocks below. */
  href?: string;
  routeMode: "generic" | "specialized";
  featuredOnHome: boolean;
  /** Publish và "có mặt trong menu" là hai quyết định khác nhau. Dịch vụ số đang chạy thật trên
   *  production (route sống, có thẻ ở trang chủ) nhưng bị rút khỏi menu theo quyết định
   *  2026-09-02. Gộp hai việc đó vào một cờ `published` sẽ buộc phải chọn giữa "gỡ khỏi trang
   *  chủ" và "trả lại vào menu" — không cái nào là điều đã được quyết. */
  navHidden?: boolean;
  navOrder: number;
  icon: IconName;
  iconImage?: string;
  /** Ảnh minh hoạ trong thẻ dịch vụ. Ba thẻ trên trang chủ dùng bộ V7 (obsidian–champagne
   *  gold) từ 2026-09-09, thay ba minh hoạ V5 màu xanh/hồng vốn lệch hẳn với ngôn ngữ hero.
   *  ServiceCard giữ nguyên khung 96px desktop / 64px mobile và `object-contain`. */
  /** Vật thể signature V6 cho hero trang chi tiết. Chỉ dùng ở hero hoặc feature panel rộng —
   *  asset phức tạp thu xuống 24-48px sẽ thành một vệt nhoè. */
  visualAssetId?: string;
  /** Ảnh minh hoạ bổ sung cho lớp chiều sâu của trang generic. */
  depthAssetId?: string;
  features?: string[];
  problems?: ContentBlock[];
  benefits?: ContentBlock[];
  scope?: ContentBlock[];
  deliverables?: ContentBlock[];
  process?: ServiceProcessStep[];
  pricingGroupId?: string;
  faqScope?: string;
  relatedSlugs?: string[];
  pageFamily?: ServicePageFamily;
  audiences?: ContentBlock[];
  serviceModes?: ServiceModule[];
  capabilityGroups?: ServiceModuleGroup[];
  customerJourney?: ServiceJourneyStep[];
  measurement?: ContentBlock[];
  requirements?: ContentBlock[];
  limits?: ContentBlock[];
  costFactors?: ServiceCostFactor[];
  /** `excluded` never enters a publish flow. `conditional` needs owner evidence before
   *  `published` may be set true. */
  policyClass: "allowed" | "conditional" | "excluded";
};

/** Resolved link for a service, whichever route mode it uses. */
export function serviceHref(service: ServiceDefinition): string {
  return service.href ?? `/dich-vu/${service.slug}`;
}

export const serviceRegistry: ServiceDefinition[] = [
  // ── Published today: the three pillars that already have real landings ───────────────
  {
    slug: "website-doanh-nghiep",
    group: "website",
    title: "Thiết kế website",
    summary:
      "Website doanh nghiệp, landing page và website bán hàng — thiết kế theo nhận diện, chuẩn SEO on-page và tối ưu tốc độ.",
    href: "/website",
    routeMode: "specialized",
    featuredOnHome: true,
    navOrder: 10,
    icon: "monitor-smartphone",
    iconImage: "/assets/v7/home-service-cards/home-service-website.png",
    features: [
      "Thiết kế riêng theo nhận diện thương hiệu",
      "Chuẩn SEO on-page và tốc độ tải trang",
      "Quản trị nội dung dễ dùng",
      "Bàn giao và hỗ trợ theo thoả thuận",
    ],
    pricingGroupId: "website",
    faqScope: "website",
    relatedSlugs: ["support-mang-xa-hoi"],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-08-14",
    policyClass: "allowed",
  },
  {
    slug: "support-mang-xa-hoi",
    group: "social-support",
    title: "Support mạng xã hội",
    summary:
      "Hỗ trợ vận hành và xử lý sự cố kênh Facebook, TikTok, YouTube cho doanh nghiệp — trong phạm vi hợp lệ của từng nền tảng.",
    href: "/support-mxh",
    routeMode: "specialized",
    featuredOnHome: true,
    navOrder: 20,
    icon: "messages-square",
    iconImage: "/assets/v7/home-service-cards/home-service-support.png",
    features: [
      "Xử lý sự cố tài khoản, trang, nhóm",
      "Tối ưu nội dung và tương tác",
      "Tư vấn chiến lược kênh",
      "Hỗ trợ theo yêu cầu",
    ],
    faqScope: "support-mxh",
    relatedSlugs: ["website-doanh-nghiep"],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-08-14",
    policyClass: "allowed",
  },
  {
    slug: "dich-vu-so",
    group: "automation-tools",
    title: "Dịch vụ số",
    summary:
      "Tư vấn công cụ số phù hợp nhu cầu vận hành của doanh nghiệp và hỗ trợ trong quá trình sử dụng.",
    href: "/dich-vu-so",
    routeMode: "specialized",
    // Ẩn khỏi menu theo quyết định 2026-09-02, nhưng vẫn nằm trong Solutions ở trang chủ và
    // trong hub /dich-vu — đó là hiện trạng production, không phải một thay đổi.
    featuredOnHome: true,
    navHidden: true,
    navOrder: 90,
    icon: "package",
    iconImage: "/assets/v7/home-service-cards/home-service-digital.png",
    features: [
      "Tư vấn công cụ phù hợp nhu cầu",
      "Hỗ trợ trong quá trình sử dụng",
      "Trao đổi phương án qua Zalo",
    ],
    faqScope: "dich-vu-so",
    published: true,
    // Điều từng khiến mục này là "unverified" là câu "Tài khoản chính hãng/ủy quyền" — một
    // tuyên bố về quan hệ với nhà cung cấp mà repo không có bằng chứng nào. Câu đó đã bị thay
    // bằng mô tả trung tính, nên phần copy hiện tại không còn claim nào cần chứng minh.
    // `verifiedAt` ghi đúng ngày rà lại câu chữ — KHÔNG phải ngày chủ sở hữu xác nhận phạm vi
    // dịch vụ; việc đó vẫn còn nằm trong danh sách blocker.
    claimState: "verified",
    verifiedAt: "2026-09-07",
    policyClass: "conditional",
  },

  // ── Mở bán 2026-09-08 sau khi chủ sở hữu xác nhận Lạc Việt triển khai được cả năm dịch vụ.
  //
  // Điều được xác nhận là NĂNG LỰC TRIỂN KHAI, nên nội dung dưới đây chỉ mô tả phạm vi công
  // việc và thứ được bàn giao. Không mục nào hứa thứ hạng, doanh số, thời gian Google duyệt hay
  // tỷ lệ uptime: những thứ đó do nền tảng và ngân sách của khách quyết định, không do Lạc Việt
  // quyết định, nên hứa là hứa hộ người khác. Đây cũng là ranh giới đã áp cho support MXH.
  {
    slug: "google-business-profile",
    group: "local-presence",
    title: "Google Business Profile",
    summary:
      "Thiết lập và tối ưu hồ sơ doanh nghiệp trên Google, hỗ trợ quy trình xác minh và quản trị thông tin hiển thị.",
    visualAssetId: "v6-service-google-business-profile",
    depthAssetId: "v9-service-google-business-profile",
    pageFamily: "local-presence",
    routeMode: "generic",
    featuredOnHome: false,
    navOrder: 30,
    icon: "map-pin",
    features: [
      "Thiết lập và chuẩn hoá hồ sơ",
      "Hỗ trợ quy trình xác minh của Google",
      "Hướng dẫn tự quản trị sau bàn giao",
    ],
    problems: [
      {
        title: "Khách tìm trên Maps nhưng không thấy doanh nghiệp",
        body: "Chưa có hồ sơ, hoặc hồ sơ tồn tại nhưng chưa xác minh nên bị hạn chế hiển thị.",
      },
      {
        title: "Thông tin hiển thị sai",
        body: "Giờ mở cửa, địa chỉ hoặc số điện thoại trên Google khác với thực tế, khách đến nhầm giờ.",
      },
      {
        title: "Mất quyền quản trị hồ sơ",
        body: "Hồ sơ do nhân sự cũ hoặc một bên thứ ba lập, doanh nghiệp không vào sửa được.",
      },
    ],
    benefits: [
      {
        title: "Tăng khả năng được tìm thấy quanh khu vực",
        body: "Hồ sơ đầy đủ danh mục, khu vực phục vụ và mô tả đúng ngành nghề.",
      },
      {
        title: "Thông tin nhất quán",
        body: "Tên, địa chỉ, số điện thoại thống nhất giữa Google, website và các kênh khác.",
      },
      {
        title: "Tự cập nhật được về sau",
        body: "Bàn giao quyền quản trị kèm hướng dẫn, không phụ thuộc vào bên làm dịch vụ.",
      },
    ],
    scope: [
      { title: "Thiết lập hồ sơ doanh nghiệp", body: "Tạo mới hoặc tiếp nhận hồ sơ đã có." },
      { title: "Hỗ trợ quy trình xác minh của Google", body: "Chuẩn bị thông tin và giấy tờ theo yêu cầu." },
      { title: "Chuẩn hoá thông tin, danh mục, khu vực phục vụ" },
      { title: "Bổ sung ảnh và mô tả", body: "Sắp xếp ảnh đại diện, ảnh bìa và phần giới thiệu." },
      { title: "Hướng dẫn quản trị hồ sơ sau bàn giao" },
    ],
    deliverables: [
      { title: "Hồ sơ đã thiết lập đầy đủ", body: "Thông tin, danh mục, khu vực phục vụ và ảnh." },
      { title: "Quyền quản trị chuyển về doanh nghiệp" },
      { title: "Tài liệu hướng dẫn cập nhật", body: "Cách sửa giờ mở cửa, thêm ảnh, trả lời đánh giá." },
    ],
    process: [
      { title: "Khảo sát hiện trạng", description: "Kiểm tra hồ sơ hiện có và thông tin doanh nghiệp." },
      { title: "Chuẩn hoá thông tin", description: "Thống nhất tên, địa chỉ, danh mục và mô tả." },
      { title: "Hỗ trợ xác minh", description: "Đồng hành theo quy trình xác minh chính thức của Google." },
      { title: "Hoàn thiện hồ sơ", description: "Bổ sung ảnh, mô tả và các mục còn thiếu." },
      { title: "Bàn giao & hướng dẫn", description: "Bàn giao quyền quản trị và hướng dẫn cập nhật." },
    ],
    relatedSlugs: ["website-doanh-nghiep", "seo-tong-the"],
    audiences: [
      { title: "Doanh nghiệp mới mở", body: "Cần một hồ sơ Google đúng thông tin ngay từ đầu." },
      { title: "Cửa hàng đang vận hành", body: "Muốn sửa thông tin sai, bổ sung quyền quản trị hoặc chuẩn hoá nhiều điểm chạm." },
    ],
    serviceModes: [
      { title: "Thiết lập & tiếp nhận", body: "Tạo mới hoặc tiếp nhận hồ sơ cũ, kiểm tra quyền sở hữu và trạng thái xác minh." },
      { title: "Tối ưu hiện diện", body: "Chuẩn hoá danh mục, khu vực, ảnh, mô tả và thông tin liên hệ." },
      { title: "Duy trì theo chu kỳ", body: "Lập nhịp cập nhật, phản hồi đánh giá và theo dõi thay đổi từ dữ liệu thật." },
    ],
    capabilityGroups: [
      {
        title: "Nền hồ sơ & quyền sở hữu",
        intro: "Để doanh nghiệp kiểm soát đúng tài sản số của mình.",
        items: [
          { title: "Kiểm tra trạng thái hồ sơ", body: "Xác định hồ sơ trùng, chưa xác minh hoặc đang do bên khác quản trị.", icon: "map-pin" },
          { title: "Chuẩn hoá thông tin cốt lõi", body: "Tên, địa chỉ, điện thoại, giờ mở cửa và danh mục được thống nhất.", icon: "check" },
        ],
      },
      {
        title: "Tín hiệu để khách hành động",
        intro: "Biến hồ sơ thành điểm chạm rõ ràng, không chỉ là một địa chỉ.",
        items: [
          { title: "Ảnh & mô tả theo nhu cầu", body: "Sắp xếp hình ảnh và nội dung để khách hiểu mình cung cấp gì.", icon: "palette" },
          { title: "Hướng dẫn vận hành", body: "Bàn giao cách cập nhật, đăng tin và trả lời đánh giá hợp lệ.", icon: "headset" },
        ],
      },
    ],
    customerJourney: [
      { title: "Kiểm tra điểm xuất phát", description: "Đối chiếu hồ sơ, quyền truy cập và thông tin doanh nghiệp hiện có.", output: "Báo cáo hiện trạng" },
      { title: "Chuẩn hoá dữ liệu", description: "Chốt tên, địa chỉ, danh mục, khu vực và bộ ảnh được phép dùng.", output: "Bộ thông tin chuẩn" },
      { title: "Hoàn thiện hồ sơ", description: "Cập nhật các mục cần thiết và hỗ trợ quy trình xác minh chính thức.", output: "Hồ sơ đã tối ưu" },
      { title: "Bàn giao nhịp duy trì", description: "Hướng dẫn người phụ trách tự cập nhật và theo dõi dữ liệu về sau.", output: "Checklist vận hành" },
    ],
    measurement: [
      { title: "Tính nhất quán NAP", body: "Tên, địa chỉ và số điện thoại khớp giữa hồ sơ, website và điểm chạm liên quan." },
      { title: "Tương tác hồ sơ", body: "Lượt gọi, chỉ đường và truy cập website theo dữ liệu Google cho phép truy cập." },
      { title: "Độ đầy đủ hồ sơ", body: "Các trường thông tin, ảnh, danh mục và khu vực đã thống nhất được hoàn thiện." },
    ],
    requirements: [
      { title: "Thông tin pháp lý cơ bản", body: "Tên doanh nghiệp, địa chỉ hoạt động và giấy tờ theo yêu cầu xác minh." },
      { title: "Người đại diện phối hợp", body: "Một đầu mối có quyền xác nhận thông tin và nhận bàn giao." },
    ],
    limits: [
      { title: "Không cam kết vị trí cố định", body: "Kết quả phụ thuộc truy vấn, vị trí người tìm, đối thủ và quyết định của Google." },
      { title: "Không tạo đánh giá giả", body: "Chỉ hướng dẫn thu thập và phản hồi đánh giá hợp lệ." },
    ],
    costFactors: [
      { title: "Số lượng địa điểm", body: "Một hồ sơ đơn lẻ khác với hệ thống nhiều địa điểm cần quy trình đồng bộ." },
      { title: "Mức độ phục hồi quyền truy cập", body: "Hồ sơ mất quyền hoặc trùng hồ sơ cần thêm thời gian đối chiếu và phối hợp." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-08",
    policyClass: "allowed",
  },
  {
    slug: "quang-cao-da-kenh",
    group: "performance",
    title: "Quảng cáo đa kênh",
    // Từ 2026-09-09 mục này là CỬA VÀO, không phải một dịch vụ ngang hàng với ba trang nền
    // tảng bên dưới: người đã biết mình cần Google Ads sẽ vào thẳng trang đó, còn người chưa
    // biết chọn kênh nào thì vào đây. `relatedSlugs` vì thế trỏ xuống cả ba.
    summary:
      "Chưa rõ nên chạy kênh nào? Tư vấn chọn nền tảng theo mục tiêu và ngân sách, rồi triển khai trên đúng kênh phù hợp.",
    visualAssetId: "v6-service-omnichannel-ads",
    depthAssetId: "v9-service-omnichannel-ads",
    pageFamily: "paid-media",
    routeMode: "generic",
    featuredOnHome: false,
    navOrder: 40,
    icon: "trending-up",
    features: [
      "Tư vấn kênh phù hợp mục tiêu",
      "Thiết lập và vận hành chiến dịch",
      "Báo cáo theo chu kỳ thống nhất",
    ],
    problems: [
      {
        title: "Không biết nên chạy kênh nào",
        body: "Mỗi nền tảng hợp với một kiểu nhu cầu khác nhau, chọn sai là tiêu ngân sách vào sai người.",
      },
      {
        title: "Đã chạy nhưng không đo được gì",
        body: "Không gắn theo dõi chuyển đổi nên không biết đơn hàng đến từ chiến dịch nào.",
      },
      {
        title: "Tài khoản quảng cáo vướng hạn chế",
        body: "Chiến dịch dừng giữa chừng, không rõ vi phạm ở đâu.",
      },
    ],
    benefits: [
      {
        title: "Nhắm chọn theo nhóm khách mục tiêu",
        body: "Kênh và cách nhắm chọn theo mục tiêu cụ thể, không rải đều cho đủ mặt.",
      },
      {
        title: "Đo được kết quả",
        body: "Gắn theo dõi chuyển đổi từ đầu để biết chi phí thực cho mỗi liên hệ.",
      },
      {
        title: "Biết rõ tiền đi đâu",
        body: "Báo cáo theo chu kỳ đã thống nhất, số liệu lấy thẳng từ nền tảng.",
      },
    ],
    scope: [
      { title: "Tư vấn kênh phù hợp mục tiêu", body: "Chọn nền tảng theo nhu cầu và ngân sách thực tế." },
      { title: "Thiết lập và cấu hình chiến dịch", body: "Cấu trúc chiến dịch, nhắm chọn và ngân sách." },
      { title: "Gắn theo dõi chuyển đổi", body: "Cài đặt đo lường trên website trước khi chạy." },
      { title: "Theo dõi và tối ưu trong quá trình chạy" },
      { title: "Báo cáo theo chu kỳ thống nhất" },
    ],
    deliverables: [
      { title: "Chiến dịch đã thiết lập và chạy", body: "Trong tài khoản thuộc quyền sở hữu của doanh nghiệp." },
      { title: "Theo dõi chuyển đổi hoạt động" },
      { title: "Báo cáo định kỳ", body: "Chi phí, lượt tiếp cận và số liên hệ ghi nhận được." },
    ],
    process: [
      { title: "Xác định mục tiêu", description: "Làm rõ kết quả mong muốn và ngân sách dự kiến." },
      { title: "Đề xuất kênh & phương án", description: "Chọn nền tảng và cách triển khai phù hợp." },
      { title: "Thiết lập đo lường", description: "Gắn theo dõi chuyển đổi trước khi chạy đồng nào." },
      { title: "Chạy & tối ưu", description: "Theo dõi và điều chỉnh trong suốt chiến dịch." },
      { title: "Báo cáo", description: "Tổng hợp kết quả theo chu kỳ đã thống nhất." },
    ],
    relatedSlugs: ["quang-cao-google-ads", "quang-cao-facebook-ads", "quang-cao-zalo-ads"],
    audiences: [
      { title: "Chưa biết chọn kênh", body: "Có mục tiêu kinh doanh nhưng chưa rõ nên bắt đầu từ Google, Facebook hay Zalo." },
      { title: "Đang chạy nhiều kênh", body: "Cần gom cách đo lường, tài khoản và nhịp báo cáo về cùng một phương án." },
    ],
    serviceModes: [
      { title: "Chẩn đoán kênh", body: "Đọc mục tiêu, khách hàng và ngân sách để chọn kênh có lý do rõ ràng." },
      { title: "Thiết lập chiến dịch", body: "Cấu hình tài khoản, nhóm quảng cáo, ngân sách và tracking theo phạm vi." },
      { title: "Vận hành & tối ưu", body: "Theo dõi dữ liệu nền tảng, điều chỉnh có kiểm soát và báo cáo theo chu kỳ." },
      { title: "Audit & bàn giao", body: "Rà soát tài khoản đang chạy, chỉ ra điểm cần sửa và bàn giao checklist." },
    ],
    capabilityGroups: [
      {
        title: "Chọn đúng kênh trước khi chạy",
        intro: "Ngân sách được đặt vào kênh có vai trò rõ trong hành trình khách hàng.",
        items: [
          { title: "Bản đồ mục tiêu", body: "Phân biệt nhu cầu tìm chủ động, tạo nhu cầu và tái tiếp cận.", icon: "target" },
          { title: "Ma trận kênh", body: "So sánh nền tảng theo tệp khách, định dạng và dữ liệu sẵn có.", icon: "trending-up" },
        ],
      },
      {
        title: "Đo lường & vận hành",
        intro: "Mỗi thay đổi đều có lý do và được đọc lại bằng dữ liệu thật.",
        items: [
          { title: "Tracking chuyển đổi", body: "Kiểm tra điểm rơi từ quảng cáo về website hoặc kênh liên hệ.", icon: "circle-check" },
          { title: "Báo cáo dễ quyết định", body: "Tách số liệu nền tảng, chi phí và tín hiệu liên hệ thực tế.", icon: "package" },
        ],
      },
    ],
    customerJourney: [
      { title: "Chốt mục tiêu", description: "Xác định khách cần tiếp cận và hành động muốn nhận được.", output: "Brief mục tiêu" },
      { title: "Chọn kênh & phạm vi", description: "Đề xuất vai trò từng kênh, ngân sách và điều kiện cần chuẩn bị.", output: "Bản đồ kênh" },
      { title: "Thiết lập đo lường", description: "Kiểm tra landing page, tài khoản và điểm ghi nhận chuyển đổi.", output: "Checklist tracking" },
      { title: "Chạy, đọc, điều chỉnh", description: "Theo dõi theo chu kỳ, ghi rõ giả thuyết và thay đổi đã thực hiện.", output: "Báo cáo vận hành" },
    ],
    measurement: [
      { title: "Chi phí theo kênh", body: "Đọc ngân sách và lượt phân phối từ từng nền tảng đã chọn." },
      { title: "Tín hiệu chuyển đổi", body: "Ghi nhận form, cuộc gọi hoặc tin nhắn khi tracking hoạt động đúng." },
      { title: "Chất lượng dữ liệu", body: "Đối chiếu số nền tảng với dữ liệu website và kênh tiếp nhận." },
    ],
    requirements: [
      { title: "Mục tiêu và ưu tiên kinh doanh", body: "Một hành động chính cần tối ưu trong mỗi giai đoạn." },
      { title: "Tài khoản thuộc doanh nghiệp", body: "Quyền truy cập quảng cáo và tracking do chủ sở hữu cấp, không dùng tài khoản trung gian." },
      { title: "Trang đích & nội dung", body: "Thông tin sản phẩm, ưu đãi và trang nhận liên hệ phải sẵn sàng." },
    ],
    limits: [
      { title: "Không cam kết số đơn hoặc ROAS", body: "Kết quả phụ thuộc thị trường, ngân sách, offer, nền tảng và cách xử lý lead." },
      { title: "Không né chính sách nền tảng", body: "Tài khoản và nội dung phải tuân thủ chính sách quảng cáo hiện hành." },
    ],
    costFactors: [
      { title: "Số kênh & số chiến dịch", body: "Mỗi kênh có cấu trúc, tracking và nhịp tối ưu riêng." },
      { title: "Mức độ chuẩn bị nội dung", body: "Landing page, video, banner và biến thể thông điệp ảnh hưởng khối lượng triển khai." },
      { title: "Nhịp vận hành", body: "Audit một lần, setup ban đầu và vận hành định kỳ có phạm vi khác nhau." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-08",
    policyClass: "allowed",
  },
  {
    slug: "seo-tong-the",
    group: "seo-content",
    title: "SEO & Nội dung",
    summary:
      "Tối ưu kỹ thuật, nội dung on-page và cấu trúc thông tin để website tiếp cận đúng nhu cầu tìm kiếm.",
    visualAssetId: "v6-service-seo-content",
    depthAssetId: "v9-service-seo-content",
    pageFamily: "seo-content",
    routeMode: "generic",
    featuredOnHome: false,
    navOrder: 50,
    icon: "search",
    features: [
      "Kiểm tra kỹ thuật và tốc độ",
      "Tối ưu on-page và cấu trúc nội dung",
      "Kế hoạch nội dung theo nhóm nhu cầu",
    ],
    problems: [
      {
        title: "Website có nhưng không ai tìm thấy",
        body: "Không có trang nào trả lời đúng câu khách thực sự gõ vào Google.",
      },
      {
        title: "Trang tải chậm, cấu trúc rối",
        body: "Google khó đọc, khách vào rồi thoát trước khi trang hiện xong.",
      },
      {
        title: "Viết bài đều nhưng không ra kết quả",
        body: "Nội dung không bám theo nhu cầu tìm kiếm nào cụ thể.",
      },
    ],
    benefits: [
      {
        title: "Nội dung bám đúng nhu cầu tìm kiếm",
        body: "Mỗi trang trả lời một nhóm câu hỏi cụ thể thay vì nói chung chung.",
      },
      {
        title: "Nền kỹ thuật sạch",
        body: "Cấu trúc thẻ, tốc độ tải và metadata đúng chuẩn ngay từ đầu.",
      },
      {
        title: "Biết đang đứng ở đâu",
        body: "Báo cáo hiện trạng trước khi làm, để so được thay đổi về sau.",
      },
    ],
    scope: [
      { title: "Kiểm tra kỹ thuật và tốc độ", body: "Rà soát lỗi lập chỉ mục, tốc độ tải và hiển thị trên di động." },
      { title: "Nghiên cứu nhóm nhu cầu tìm kiếm", body: "Xác định khách thực sự gõ gì khi cần dịch vụ của bạn." },
      { title: "Tối ưu on-page và cấu trúc nội dung", body: "Tiêu đề, mô tả, phân cấp heading và liên kết nội bộ." },
      { title: "Kế hoạch nội dung theo nhóm nhu cầu" },
    ],
    deliverables: [
      { title: "Báo cáo hiện trạng", body: "Danh sách vấn đề kỹ thuật kèm mức độ ưu tiên." },
      { title: "Danh sách nhóm nhu cầu tìm kiếm", body: "Kèm trang đích tương ứng cho từng nhóm." },
      { title: "Kế hoạch nội dung", body: "Chủ đề, thứ tự triển khai và trang cần bổ sung." },
    ],
    process: [
      { title: "Kiểm tra hiện trạng", description: "Rà soát kỹ thuật, nội dung và cấu trúc hiện có." },
      { title: "Nghiên cứu nhu cầu tìm kiếm", description: "Xác định nhóm truy vấn đáng ưu tiên." },
      { title: "Đề xuất kế hoạch", description: "Thống nhất phạm vi và thứ tự triển khai." },
      { title: "Triển khai tối ưu", description: "Sửa kỹ thuật và hoàn thiện nội dung on-page." },
      { title: "Theo dõi & điều chỉnh", description: "Đo lại theo chu kỳ và điều chỉnh kế hoạch." },
    ],
    relatedSlugs: ["website-doanh-nghiep", "google-business-profile"],
    audiences: [
      { title: "Website đã có nhưng tăng trưởng chậm", body: "Cần biết vấn đề nằm ở kỹ thuật, cấu trúc hay nội dung." },
      { title: "Đội nội dung cần một hệ thống", body: "Muốn có bản đồ chủ đề và thứ tự triển khai thay vì viết theo cảm tính." },
    ],
    serviceModes: [
      { title: "Audit & roadmap", body: "Rà soát kỹ thuật, nội dung và lập thứ tự ưu tiên có thể triển khai." },
      { title: "Nền tảng on-page", body: "Sửa cấu trúc trang, metadata, heading, liên kết nội bộ và trải nghiệm đọc." },
      { title: "Hệ thống nội dung", body: "Xây nhóm chủ đề, trang đích và lịch nội dung theo nhu cầu tìm kiếm." },
      { title: "Theo dõi định kỳ", body: "Đọc dữ liệu Search Console, ghi nhận thay đổi và điều chỉnh kế hoạch." },
    ],
    capabilityGroups: [
      {
        title: "Nền kỹ thuật & cấu trúc",
        intro: "Giúp công cụ tìm kiếm đọc đúng và người dùng tìm được thứ họ cần.",
        items: [
          { title: "Rà soát crawl & index", body: "Kiểm tra lỗi cản trở việc đọc, lập chỉ mục và phân phối trang.", icon: "search" },
          { title: "Tối ưu trải nghiệm trang", body: "Ưu tiên tốc độ, cấu trúc và hiển thị di động trong phạm vi kiểm soát.", icon: "monitor-smartphone" },
        ],
      },
      {
        title: "Nội dung theo nhu cầu",
        intro: "Mỗi trang có một vai trò rõ trong hành trình tìm hiểu của khách.",
        items: [
          { title: "Bản đồ chủ đề", body: "Gom truy vấn thành nhóm nhu cầu và gắn với trang đích phù hợp.", icon: "package" },
          { title: "Biên tập on-page", body: "Làm rõ tiêu đề, mô tả, heading và liên kết giữa các trang.", icon: "sparkles" },
        ],
      },
    ],
    customerJourney: [
      { title: "Đọc hiện trạng", description: "Thu thập dữ liệu kỹ thuật, nội dung và truy vấn đang có.", output: "Báo cáo audit" },
      { title: "Xếp thứ tự ưu tiên", description: "Chọn các việc tác động trực tiếp đến khả năng đọc và nhu cầu khách.", output: "Roadmap SEO" },
      { title: "Tối ưu & xuất bản", description: "Sửa nền tảng, hoàn thiện trang đích và triển khai nội dung theo nhóm.", output: "Danh sách trang đã xử lý" },
      { title: "Đo & học lại", description: "Theo dõi dữ liệu, ghi nhận trang có tín hiệu và điều chỉnh kế hoạch.", output: "Báo cáo chu kỳ" },
    ],
    measurement: [
      { title: "Lập chỉ mục & lỗi kỹ thuật", body: "Đối chiếu dữ liệu Search Console và công cụ kiểm tra trong phạm vi truy cập." },
      { title: "Hiển thị & lượt truy cập", body: "Theo dõi impressions, clicks và nhóm truy vấn từ dữ liệu thật." },
      { title: "Độ phủ chủ đề", body: "Kiểm tra mỗi nhóm nhu cầu đã có trang đích phù hợp hay chưa." },
    ],
    requirements: [
      { title: "Quyền truy cập website", body: "CMS, hosting hoặc repo theo phần việc cần triển khai." },
      { title: "Search Console & Analytics", body: "Nếu có sẵn, dữ liệu giúp audit và đo lường sát hơn." },
      { title: "Danh sách dịch vụ ưu tiên", body: "Chốt nhóm sản phẩm, khu vực và khách hàng muốn tiếp cận trước." },
    ],
    limits: [
      { title: "Không cam kết vị trí hoặc thời gian lên top", body: "Thứ hạng phụ thuộc thuật toán, đối thủ, lịch sử website và nhu cầu tìm kiếm." },
      { title: "Không mua liên kết rác", body: "Chỉ xây nội dung và cấu trúc trong phạm vi có thể kiểm soát." },
    ],
    costFactors: [
      { title: "Quy mô website", body: "Số lượng template, URL và ngôn ngữ quyết định khối lượng audit." },
      { title: "Mức độ kỹ thuật cần xử lý", body: "Website cũ, nhiều lỗi hoặc nền tảng đặc thù cần thêm thời gian phối hợp." },
      { title: "Sản lượng nội dung", body: "Audit, brief, biên tập và xuất bản định kỳ là các phạm vi khác nhau." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-08",
    policyClass: "allowed",
  },
  {
    slug: "nhan-dien-thuong-hieu",
    group: "creative-media",
    title: "Thiết kế nhận diện thương hiệu",
    summary: "Logo, bộ nhận diện cơ bản và ấn phẩm truyền thông đồng bộ với định hướng thương hiệu.",
    visualAssetId: "v6-service-brand-identity",
    depthAssetId: "v9-service-brand-identity",
    pageFamily: "brand-system",
    routeMode: "generic",
    featuredOnHome: false,
    navOrder: 60,
    icon: "sparkles",
    features: [
      "Logo và bộ nhận diện cơ bản",
      "Quy chuẩn màu sắc, font chữ",
      "Ấn phẩm truyền thông đồng bộ",
    ],
    problems: [
      {
        title: "Mỗi nơi một kiểu",
        body: "Logo trên fanpage, website và card visit không khớp nhau về màu và tỷ lệ.",
      },
      {
        title: "Không có file gốc",
        body: "Chỉ còn ảnh JPG nền trắng, in ra bị vỡ, không đổi được nền.",
      },
      {
        title: "Mỗi lần làm ấn phẩm là làm lại từ đầu",
        body: "Không có quy chuẩn nên ai thiết kế cũng ra một phong cách khác.",
      },
    ],
    benefits: [
      {
        title: "Nhận diện nhất quán ở mọi nơi",
        body: "Cùng một bộ màu, font và cách dùng logo trên mọi kênh.",
      },
      {
        title: "Có file gốc để dùng lâu dài",
        body: "File vector in được mọi khổ, không phụ thuộc vào bên thiết kế.",
      },
      {
        title: "Người sau làm tiếp được",
        body: "Quy chuẩn viết rõ để bất kỳ ai thiết kế cũng ra đúng phong cách.",
      },
    ],
    scope: [
      { title: "Trao đổi định hướng thương hiệu", body: "Ngành nghề, khách hàng mục tiêu và cảm giác muốn tạo ra." },
      { title: "Thiết kế logo", body: "Đề xuất phương án và chỉnh sửa theo góp ý." },
      { title: "Bộ nhận diện cơ bản", body: "Bảng màu, font chữ và quy tắc sử dụng logo." },
      { title: "Ấn phẩm truyền thông", body: "Card visit, ảnh bìa mạng xã hội và mẫu bài đăng." },
    ],
    deliverables: [
      { title: "File logo gốc", body: "Định dạng vector kèm các phiên bản dùng cho nền sáng và nền tối." },
      { title: "Tài liệu quy chuẩn nhận diện", body: "Mã màu, tên font và quy tắc dùng logo." },
      { title: "Bộ ấn phẩm đã thiết kế", body: "Kèm file gốc để chỉnh sửa về sau." },
    ],
    process: [
      { title: "Trao đổi định hướng", description: "Làm rõ thương hiệu muốn được nhìn nhận thế nào." },
      { title: "Đề xuất phương án", description: "Trình bày các hướng thiết kế để chọn." },
      { title: "Hoàn thiện", description: "Chỉnh sửa theo góp ý cho tới khi thống nhất." },
      { title: "Mở rộng bộ nhận diện", description: "Áp phương án đã chọn lên các ấn phẩm." },
      { title: "Bàn giao file gốc", description: "Bàn giao toàn bộ file kèm tài liệu quy chuẩn." },
    ],
    relatedSlugs: ["website-doanh-nghiep", "quang-cao-da-kenh"],
    audiences: [
      { title: "Thương hiệu mới", body: "Cần một hệ thống nhận diện đủ gọn để bắt đầu dùng nhất quán." },
      { title: "Doanh nghiệp đang làm lại", body: "Muốn gom logo, màu, font và ấn phẩm về cùng một ngôn ngữ." },
    ],
    serviceModes: [
      { title: "Identity starter", body: "Logo, màu, font và bộ file cơ bản cho giai đoạn khởi động." },
      { title: "Brand system", body: "Quy chuẩn sử dụng để đội ngũ và đối tác làm tiếp không lệch hướng." },
      { title: "Campaign toolkit", body: "Mẫu ấn phẩm và biến thể dùng cho website, mạng xã hội và bán hàng." },
    ],
    capabilityGroups: [
      {
        title: "Lõi nhận diện",
        intro: "Một nền tảng đủ rõ để thương hiệu được nhận ra ở mọi điểm chạm.",
        items: [
          { title: "Định hướng hình ảnh", body: "Chốt cảm giác, đối tượng và bối cảnh thương hiệu cần xuất hiện.", icon: "lightbulb" },
          { title: "Logo & màu chủ đạo", body: "Thiết kế phiên bản dùng được trên nền sáng, nền tối và kích thước nhỏ.", icon: "sparkles" },
        ],
      },
      {
        title: "Ứng dụng & bàn giao",
        intro: "Không dừng ở logo; hệ thống phải dùng được ngay trong công việc hằng ngày.",
        items: [
          { title: "Quy chuẩn dễ tra", body: "Mã màu, font, khoảng thở và quy tắc dùng logo được ghi rõ.", icon: "package" },
          { title: "Bộ mẫu truyền thông", body: "Áp dụng lên các ấn phẩm ưu tiên để đội ngũ bắt đầu dùng ngay.", icon: "palette" },
        ],
      },
    ],
    customerJourney: [
      { title: "Thu thập định hướng", description: "Hiểu ngành, khách hàng, đối thủ và cảm giác thương hiệu muốn tạo ra.", output: "Creative brief" },
      { title: "Chọn hướng thiết kế", description: "Trình bày các hướng hình ảnh để người quyết định chọn một đường đi rõ ràng.", output: "Direction board" },
      { title: "Xây hệ thống", description: "Hoàn thiện logo, màu, font và các quy tắc áp dụng theo phạm vi.", output: "Brand kit" },
      { title: "Áp dụng & bàn giao", description: "Đưa nhận diện vào các ấn phẩm ưu tiên và bàn giao file gốc.", output: "Bộ file sử dụng" },
    ],
    measurement: [
      { title: "Độ nhất quán điểm chạm", body: "Kiểm tra logo, màu, font và cách trình bày giữa website, social và ấn phẩm." },
      { title: "Khả năng sử dụng lại", body: "Đội ngũ có thể tìm đúng file, đúng phiên bản và tự làm tiếp hay chưa." },
      { title: "Độ bao phủ ứng dụng", body: "Các điểm chạm ưu tiên đã có mẫu hoặc quy tắc đủ rõ để triển khai." },
    ],
    requirements: [
      { title: "Người quyết định cuối", body: "Một đầu mối gom phản hồi và chốt hướng thiết kế." },
      { title: "Tài liệu thương hiệu hiện có", body: "Logo cũ, hình ảnh, màu đang dùng và các ví dụ doanh nghiệp thấy phù hợp." },
    ],
    limits: [
      { title: "Không thay thế chiến lược thương hiệu", body: "Bộ nhận diện cụ thể hoá định hướng đã thống nhất, không tự tạo định vị kinh doanh." },
      { title: "Số vòng chỉnh sửa theo phạm vi", body: "Mỗi gói cần chốt số vòng và số ứng dụng trước khi bắt đầu." },
    ],
    costFactors: [
      { title: "Mức độ phát triển hệ thống", body: "Logo starter, brand guideline và toolkit chiến dịch có khối lượng khác nhau." },
      { title: "Số điểm chạm cần áp dụng", body: "Website, social, văn phòng phẩm và ấn phẩm bán hàng được tính theo phạm vi." },
      { title: "Độ phức tạp của tài sản cũ", body: "Có hoặc không có file gốc, nhiều phiên bản sai lệch sẽ ảnh hưởng thời gian chuẩn hoá." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-08",
    policyClass: "allowed",
  },
  {
    slug: "domain-hosting-email",
    group: "infrastructure",
    title: "Domain, Hosting & Email",
    summary: "Tư vấn và hỗ trợ thiết lập tên miền, hosting và email doanh nghiệp cho website.",
    visualAssetId: "v6-service-domain-hosting-email",
    depthAssetId: "v9-service-domain-hosting-email",
    pageFamily: "infrastructure",
    routeMode: "generic",
    featuredOnHome: false,
    navOrder: 70,
    icon: "server",
    features: [
      "Tư vấn tên miền và hosting phù hợp",
      "Thiết lập email theo tên miền",
      "Cài đặt SSL và bản ghi DNS",
    ],
    problems: [
      {
        title: "Vẫn dùng Gmail cá nhân để liên hệ khách",
        body: "Thiếu chuyên nghiệp, và khi nhân sự nghỉ thì mất luôn hộp thư.",
      },
      {
        title: "Không biết tên miền đang đứng tên ai",
        body: "Bên làm web cũ đăng ký hộ, doanh nghiệp không có quyền quản trị.",
      },
      {
        title: "Website báo không an toàn",
        body: "SSL hết hạn hoặc chưa cài, trình duyệt cảnh báo khách trước khi vào.",
      },
    ],
    benefits: [
      {
        title: "Tên miền đứng tên doanh nghiệp",
        body: "Quyền sở hữu rõ ràng, không phụ thuộc vào bên làm dịch vụ.",
      },
      {
        title: "Email theo tên miền riêng",
        body: "Địa chỉ dạng ten@congty.com cho từng người trong đội.",
      },
      {
        title: "Cấu hình đúng ngay từ đầu",
        body: "SSL, bản ghi DNS và email được thiết lập và kiểm tra trước khi bàn giao.",
      },
    ],
    scope: [
      { title: "Tư vấn tên miền", body: "Chọn tên miền và đăng ký đứng tên doanh nghiệp." },
      { title: "Tư vấn hosting phù hợp", body: "Theo quy mô website và lượng truy cập dự kiến." },
      { title: "Thiết lập email theo tên miền", body: "Tạo hộp thư cho từng thành viên." },
      { title: "Cài đặt SSL và bản ghi DNS" },
      { title: "Hướng dẫn quản trị sau bàn giao" },
    ],
    deliverables: [
      { title: "Tên miền và hosting đứng tên doanh nghiệp", body: "Kèm thông tin đăng nhập quản trị." },
      { title: "Email theo tên miền đã hoạt động" },
      { title: "Tài liệu cấu hình", body: "Bản ghi DNS, hạn tên miền và nơi gia hạn." },
    ],
    process: [
      { title: "Khảo sát nhu cầu", description: "Quy mô website, số hộp thư cần dùng." },
      { title: "Đề xuất phương án", description: "Tên miền, gói hosting và chi phí duy trì." },
      { title: "Đăng ký & thiết lập", description: "Đăng ký đứng tên doanh nghiệp và cấu hình." },
      { title: "Kiểm tra", description: "Kiểm tra SSL, email gửi nhận và trỏ tên miền." },
      { title: "Bàn giao & hướng dẫn", description: "Bàn giao quyền quản trị kèm tài liệu cấu hình." },
    ],
    relatedSlugs: ["website-doanh-nghiep", "google-business-profile"],
    audiences: [
      { title: "Doanh nghiệp mới bắt đầu", body: "Cần tên miền, website và email thuộc quyền sở hữu của mình." },
      { title: "Đang chuyển nhà cung cấp", body: "Muốn di chuyển an toàn mà không mất mail, DNS hoặc quyền quản trị." },
    ],
    serviceModes: [
      { title: "Thiết lập mới", body: "Đăng ký, cấu hình và ghi nhận quyền sở hữu ngay từ đầu." },
      { title: "Di chuyển & khôi phục", body: "Kiểm kê tài khoản, DNS, hộp thư và chuyển đổi theo checklist." },
      { title: "Bảo trì định kỳ", body: "Theo dõi hạn gia hạn, SSL, bản ghi và người có quyền truy cập." },
    ],
    capabilityGroups: [
      {
        title: "Quyền sở hữu & an toàn",
        intro: "Hạ tầng số phải đứng tên doanh nghiệp và có đường lui khi nhân sự thay đổi.",
        items: [
          { title: "Kiểm kê tài khoản", body: "Xác định nhà cung cấp, chủ thể thanh toán và người đang giữ quyền.", icon: "server" },
          { title: "DNS & SSL rõ ràng", body: "Ghi nhận bản ghi, thời hạn và cách khôi phục khi có sự cố.", icon: "lock-keyhole" },
        ],
      },
      {
        title: "Email & vận hành",
        intro: "Mỗi thành viên dùng được email ổn định, người quản trị biết phải sửa ở đâu.",
        items: [
          { title: "Hộp thư theo tên miền", body: "Tạo đúng số lượng, cấu hình gửi nhận và bàn giao quyền quản trị.", icon: "mail" },
          { title: "Tài liệu bàn giao", body: "Lưu thông tin gia hạn, DNS, SSL và các điểm cần kiểm tra sau này.", icon: "package" },
        ],
      },
    ],
    customerJourney: [
      { title: "Kiểm kê hiện trạng", description: "Xác định tên miền, hosting, DNS, SSL, email và quyền truy cập đang có.", output: "Bản đồ hạ tầng" },
      { title: "Chốt phương án sở hữu", description: "Thống nhất nhà cung cấp, người đứng tên, số hộp thư và cách sao lưu.", output: "Phương án hạ tầng" },
      { title: "Cấu hình & kiểm tra", description: "Thiết lập bản ghi, SSL, email và kiểm tra gửi nhận trước khi chuyển giao.", output: "Checklist nghiệm thu" },
      { title: "Bàn giao & nhắc hạn", description: "Giao quyền quản trị, tài liệu cấu hình và lịch gia hạn cần nhớ.", output: "Sổ tay vận hành" },
    ],
    measurement: [
      { title: "Tính đúng của DNS", body: "Bản ghi trỏ đúng dịch vụ và thay đổi được ghi nhận trong tài liệu bàn giao." },
      { title: "SSL & trạng thái bảo mật", body: "Website mở an toàn, chứng chỉ còn hạn và có người phụ trách gia hạn." },
      { title: "Khả năng gửi nhận email", body: "Kiểm tra các hộp thư chính và cấu hình cơ bản trong phạm vi đã thống nhất." },
    ],
    requirements: [
      { title: "Thông tin chủ thể đứng tên", body: "Tên doanh nghiệp, email quản trị và thông tin thanh toán theo nhà cung cấp." },
      { title: "Danh sách người dùng", body: "Số hộp thư, bí danh và người cần nhận quyền quản trị." },
      { title: "Quyền truy cập hiện có", body: "Tài khoản registrar, hosting, email hoặc đầu mối nhà cung cấp cũ nếu có." },
    ],
    limits: [
      { title: "Không kiểm soát gián đoạn từ nhà cung cấp", body: "Sự cố hạ tầng bên thứ ba cần được xử lý theo SLA của họ." },
      { title: "Không lưu giữ mật khẩu thay khách", body: "Quyền truy cập được bàn giao trực tiếp cho chủ sở hữu và người phụ trách." },
    ],
    costFactors: [
      { title: "Số hộp thư & người dùng", body: "Tạo mới, phân quyền và di chuyển nhiều hộp thư cần phạm vi khác nhau." },
      { title: "Mức độ phức tạp DNS", body: "Nhiều dịch vụ cùng dùng một tên miền cần kiểm kê và kiểm tra kỹ hơn." },
      { title: "Di chuyển dữ liệu", body: "Giữ mail cũ, đổi nhà cung cấp hoặc khôi phục quyền sẽ tăng khối lượng phối hợp." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-08",
    policyClass: "allowed",
  },

  // ── Mở bán 2026-09-09 sau khi chủ sở hữu xác nhận triển khai được toàn bộ nhóm dịch vụ này.
  //
  // Sáu mục dưới đây tách theo ĐÚNG truy vấn khách gõ: người cần chạy Google Ads không tìm
  // "quảng cáo đa kênh", họ gõ "chạy quảng cáo Google Ads". `quang-cao-da-kenh` giữ vai trò cửa
  // vào cho người chưa biết chọn kênh nào, và liên kết xuống ba trang nền tảng cụ thể.
  //
  // Ranh giới giống toàn bộ phần còn lại của site: mô tả phạm vi công việc và thứ được bàn
  // giao. Không trang nào hứa thứ hạng, số đơn, chi phí mỗi khách hay ROAS — những thứ đó do
  // nền tảng, ngân sách và thị trường quyết định, không do Lạc Việt quyết định.
  {
    slug: "website-bat-dong-san",
    group: "website",
    title: "Thiết kế website bất động sản",
    summary:
      "Website dự án và sàn giao dịch bất động sản: trang dự án, bộ lọc căn hộ, form nhận thông tin và tối ưu cho khách tìm kiếm nhà đất.",
    routeMode: "generic",
    featuredOnHome: false,
    pageFamily: "website-industry",
    visualAssetId: "v8-service-website-real-estate",
    navOrder: 15,
    icon: "monitor-smartphone",
    features: [
      "Trang dự án và danh sách sản phẩm",
      "Bộ lọc theo giá, diện tích, khu vực",
      "Tối ưu cho khách tìm trên di động",
    ],
    problems: [
      {
        title: "Khách xem dự án trên điện thoại rồi bỏ đi",
        body: "Ảnh nặng, bảng giá không đọc được ở khổ nhỏ, không có nút liên hệ trong tầm ngón tay.",
      },
      {
        title: "Không lọc được sản phẩm",
        body: "Khách phải cuộn qua hàng chục căn để tìm đúng khoảng giá và diện tích mình cần.",
      },
      {
        title: "Mỗi dự án lại dựng một trang rời",
        body: "Không quản trị được tập trung, nội dung cũ không ai gỡ, dự án đã bán vẫn còn hiện.",
      },
    ],
    benefits: [
      {
        title: "Khách tìm được đúng sản phẩm",
        body: "Bộ lọc theo giá, diện tích, khu vực và tình trạng bán.",
      },
      {
        title: "Đọc tốt trên điện thoại",
        body: "Phần lớn khách bất động sản xem lần đầu trên di động, nên bố cục dựng từ khổ nhỏ lên.",
      },
      {
        title: "Tự cập nhật dự án",
        body: "Thêm, sửa, ẩn dự án và căn hộ sau bàn giao không cần gọi kỹ thuật.",
      },
    ],
    scope: [
      { title: "Thiết kế giao diện theo nhận diện", body: "Màu sắc, font và hình ảnh theo thương hiệu chủ đầu tư hoặc sàn." },
      { title: "Trang dự án và trang sản phẩm", body: "Cấu trúc dự án → phân khu → sản phẩm, kèm thư viện ảnh." },
      { title: "Bộ lọc và tìm kiếm", body: "Lọc theo giá, diện tích, số phòng, khu vực và tình trạng." },
      { title: "Form nhận thông tin khách", body: "Đặt ở vị trí khách thực sự bấm, không chỉ ở chân trang." },
      { title: "Tối ưu SEO on-page và tốc độ tải" },
    ],
    deliverables: [
      { title: "Website hoàn chỉnh trên tên miền của bạn" },
      { title: "Quyền quản trị nội dung", body: "Tự thêm sửa dự án, sản phẩm và bài viết." },
      { title: "Tài liệu hướng dẫn quản trị" },
    ],
    process: [
      { title: "Khảo sát", description: "Số lượng dự án, loại sản phẩm và cách bạn đang bán." },
      { title: "Đề xuất cấu trúc", description: "Thống nhất sơ đồ trang và bộ lọc cần có." },
      { title: "Thiết kế giao diện", description: "Dựng giao diện theo nhận diện và chỉnh theo góp ý." },
      { title: "Lập trình & nhập liệu", description: "Phát triển chức năng và đưa dự án đầu tiên lên." },
      { title: "Bàn giao & hướng dẫn", description: "Bàn giao quyền quản trị kèm tài liệu." },
    ],
    pricingGroupId: "website",
    faqScope: "website",
    relatedSlugs: ["marketing-bat-dong-san", "website-doanh-nghiep"],
    serviceModes: [
      { title: "Landing page một dự án", body: "Tập trung một dự án, một nhóm sản phẩm và một hành động liên hệ rõ ràng." },
      { title: "Website nhiều dự án", body: "Quản lý danh sách dự án, phân khu và sản phẩm trong một nền tảng." },
      { title: "Website đăng tin môi giới", body: "Tổ chức tin đăng theo khu vực, loại sản phẩm và trạng thái." },
      { title: "Website thương hiệu cá nhân", body: "Xây uy tín cá nhân với hồ sơ, sản phẩm và nội dung chuyên môn." },
    ],
    capabilityGroups: [
      { title: "Khách hàng sử dụng", items: [
        { title: "Tìm kiếm và lọc", body: "Lọc theo khu vực, khoảng giá, diện tích và số phòng." },
        { title: "Trang dự án rõ ràng", body: "Từ tổng quan đến mặt bằng, thư viện ảnh và thông tin liên hệ." },
        { title: "Luồng nhận thông tin", body: "CTA và form xuất hiện tại điểm khách đã đủ thông tin để hỏi." },
      ] },
      { title: "Đội ngũ quản trị", items: [
        { title: "Quản lý sản phẩm", body: "Thêm, sửa, ẩn sản phẩm và cập nhật trạng thái sau bàn giao." },
        { title: "Quản lý nội dung", body: "Tự cập nhật dự án, bài viết và thông tin tư vấn." },
        { title: "Theo dõi nguồn liên hệ", body: "Gắn nhãn nguồn để đội kinh doanh tiếp nhận đúng ngữ cảnh." },
      ] },
    ],
    customerJourney: [
      { title: "Tìm theo nhu cầu", description: "Khách chọn khu vực, khoảng giá hoặc loại sản phẩm." },
      { title: "Lọc danh sách", description: "Bộ lọc rút gọn danh sách về đúng lựa chọn phù hợp." },
      { title: "Xem chi tiết", description: "Trang dự án trình bày thông tin, hình ảnh và trạng thái." },
      { title: "Để lại thông tin", description: "Khách chọn gọi, nhắn hoặc gửi form tại điểm quyết định.", output: "Liên hệ có ngữ cảnh" },
    ],
    requirements: [
      { title: "Danh sách dự án và sản phẩm", body: "Tên, khu vực, thuộc tính, hình ảnh và trạng thái cần hiển thị." },
      { title: "Quy tắc công bố thông tin", body: "Nội dung pháp lý, giá và chính sách do chủ sở hữu cung cấp." },
    ],
    limits: [
      { title: "Không tự tạo dữ liệu dự án", body: "Website chỉ hiển thị thông tin và hình ảnh đã được chủ sở hữu duyệt." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-09",
    policyClass: "allowed",
  },
  {
    slug: "seo-google-maps",
    group: "local-presence",
    title: "SEO Google Maps",
    summary:
      "Tối ưu hồ sơ và tín hiệu địa phương để doanh nghiệp xuất hiện khi khách tìm dịch vụ quanh khu vực mình.",
    routeMode: "generic",
    featuredOnHome: false,
    pageFamily: "local-presence",
    visualAssetId: "v8-service-seo-google-maps",
    navOrder: 35,
    icon: "globe",
    features: [
      "Tối ưu hồ sơ và danh mục",
      "Chuẩn hoá thông tin trên các trang niêm yết",
      "Báo cáo hiển thị theo chu kỳ",
    ],
    problems: [
      {
        title: "Đối thủ cùng phố hiện trước mình",
        body: "Hồ sơ của họ đầy đủ hơn: đúng danh mục, đủ ảnh, có mô tả và giờ mở cửa.",
      },
      {
        title: "Thông tin không thống nhất giữa các nơi",
        body: "Tên, địa chỉ và số điện thoại khác nhau giữa Google, website và các trang niêm yết.",
      },
      {
        title: "Không biết khách tìm bằng từ nào",
        body: "Hồ sơ mô tả theo cách doanh nghiệp tự gọi, không theo cách khách gõ tìm.",
      },
    ],
    benefits: [
      {
        title: "Hồ sơ đầy đủ và đúng danh mục",
        body: "Đúng ngành nghề, khu vực phục vụ, giờ mở cửa và ảnh thật.",
      },
      {
        title: "Thông tin nhất quán ở mọi nơi",
        body: "Cùng một tên, địa chỉ, số điện thoại trên Google, website và các trang niêm yết.",
      },
      {
        title: "Đo được thay đổi",
        body: "Số liệu hiển thị và lượt tương tác lấy thẳng từ Google Business Profile.",
      },
    ],
    scope: [
      { title: "Rà soát hiện trạng hồ sơ", body: "Danh mục, thông tin, ảnh và các mục còn thiếu." },
      { title: "Nghiên cứu từ khoá địa phương", body: "Xác định cách khách trong khu vực thực sự gõ tìm." },
      { title: "Tối ưu hồ sơ và mô tả", body: "Viết lại mô tả, chuẩn hoá danh mục và khu vực phục vụ." },
      { title: "Chuẩn hoá thông tin trên các trang niêm yết" },
      { title: "Hướng dẫn duy trì", body: "Cách đăng cập nhật, trả lời đánh giá và giữ hồ sơ sống." },
    ],
    deliverables: [
      { title: "Báo cáo hiện trạng và việc đã tối ưu" },
      { title: "Danh sách từ khoá địa phương theo nhóm nhu cầu" },
      { title: "Báo cáo hiển thị định kỳ", body: "Số liệu lấy từ Google Business Profile." },
    ],
    process: [
      { title: "Rà soát", description: "Kiểm tra hồ sơ hiện có và vị trí đang hiển thị." },
      { title: "Nghiên cứu từ khoá", description: "Xác định nhóm truy vấn địa phương đáng ưu tiên." },
      { title: "Đề xuất kế hoạch", description: "Thống nhất phạm vi và thứ tự triển khai." },
      { title: "Tối ưu", description: "Hoàn thiện hồ sơ và chuẩn hoá thông tin." },
      { title: "Theo dõi & báo cáo", description: "Đo lại theo chu kỳ đã thống nhất." },
    ],
    relatedSlugs: ["google-business-profile", "seo-tong-the"],
    serviceModes: [
      { title: "Rà soát hiện trạng", body: "Tìm điểm thiếu trong hồ sơ, danh mục, ảnh và thông tin địa phương." },
      { title: "Tối ưu tín hiệu địa phương", body: "Chuẩn hoá tên, địa chỉ, số điện thoại và nội dung theo khu vực." },
      { title: "Duy trì và theo dõi", body: "Lập nhịp cập nhật, đo hiển thị và ghi nhận thay đổi theo chu kỳ." },
    ],
    customerJourney: [
      { title: "Khách tìm quanh khu vực", description: "Truy vấn gắn với dịch vụ, địa điểm hoặc nhu cầu gần đó." },
      { title: "Hồ sơ xuất hiện", description: "Thông tin nhất quán giúp khách hiểu đúng doanh nghiệp." },
      { title: "Khách xem và liên hệ", description: "CTA, cuộc gọi hoặc chỉ đường trở thành tín hiệu cần theo dõi." },
      { title: "Đo và cập nhật", description: "Đối chiếu dữ liệu theo chu kỳ, không suy diễn thành cam kết thứ hạng.", output: "Báo cáo hiện trạng" },
    ],
    measurement: [
      { title: "Hiển thị theo truy vấn địa phương", body: "Theo dõi nhóm truy vấn và khu vực đã thống nhất." },
      { title: "Lượt tương tác hồ sơ", body: "Số liệu lấy từ Google Business Profile khi tài khoản cho phép truy cập." },
      { title: "Tính nhất quán thông tin", body: "Kiểm tra tên, địa chỉ và số điện thoại giữa các điểm chạm." },
    ],
    limits: [
      { title: "Không cam kết vị trí cố định", body: "Thứ hạng phụ thuộc truy vấn, vị trí người tìm, đối thủ và quyết định của Google." },
      { title: "Không bán hoặc tạo đánh giá giả", body: "Chỉ hướng dẫn quy trình phản hồi và thu thập đánh giá hợp lệ." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-09",
    policyClass: "allowed",
  },
  {
    slug: "quang-cao-google-ads",
    group: "performance",
    title: "Quảng cáo Google Ads",
    summary:
      "Thiết lập và vận hành chiến dịch Google Search, Display và Performance Max trên tài khoản thuộc quyền sở hữu của bạn.",
    routeMode: "generic",
    featuredOnHome: false,
    pageFamily: "paid-media",
    visualAssetId: "v8-service-google-ads",
    navOrder: 41,
    icon: "target",
    features: [
      "Nghiên cứu từ khoá và nhắm chọn",
      "Thiết lập theo dõi chuyển đổi",
      "Tối ưu và báo cáo theo chu kỳ",
    ],
    problems: [
      {
        title: "Ngân sách hết mà không có khách",
        body: "Từ khoá quá rộng, quảng cáo hiện cho người chỉ đang tìm hiểu chứ chưa có nhu cầu mua.",
      },
      {
        title: "Không biết đơn hàng đến từ đâu",
        body: "Chưa gắn theo dõi chuyển đổi, nên mọi con số trong tài khoản đều là lượt bấm chứ không phải khách.",
      },
      {
        title: "Tài khoản bị hạn chế giữa chiến dịch",
        body: "Vướng chính sách quảng cáo mà không rõ nội dung nào bị đánh dấu.",
      },
    ],
    benefits: [
      {
        title: "Chỉ trả tiền cho người đang tìm mua",
        body: "Từ khoá và nhắm chọn theo mức độ sẵn sàng, không rải rộng cho đủ lượt hiển thị.",
      },
      {
        title: "Biết chi phí thật cho mỗi liên hệ",
        body: "Theo dõi chuyển đổi gắn từ đầu, trước khi chạy đồng nào.",
      },
      {
        title: "Tài khoản đứng tên bạn",
        body: "Dữ liệu và lịch sử tối ưu thuộc về bạn, không mất khi đổi bên chạy.",
      },
    ],
    scope: [
      { title: "Nghiên cứu từ khoá và đối thủ", body: "Xác định truy vấn có nhu cầu mua thật." },
      { title: "Thiết lập theo dõi chuyển đổi", body: "Cài đo lường trên website trước khi bật chiến dịch." },
      { title: "Dựng cấu trúc chiến dịch", body: "Nhóm quảng cáo, mẫu quảng cáo và tiện ích mở rộng." },
      { title: "Tối ưu trong quá trình chạy", body: "Loại từ khoá không hiệu quả, điều chỉnh giá thầu và mẫu." },
      { title: "Báo cáo theo chu kỳ thống nhất" },
    ],
    deliverables: [
      { title: "Chiến dịch chạy trong tài khoản của bạn" },
      { title: "Theo dõi chuyển đổi hoạt động" },
      { title: "Báo cáo định kỳ", body: "Chi phí, lượt bấm và số liên hệ ghi nhận được." },
    ],
    process: [
      { title: "Xác định mục tiêu", description: "Kết quả mong muốn và ngân sách dự kiến." },
      { title: "Nghiên cứu & đề xuất", description: "Từ khoá, cấu trúc chiến dịch và cách đo." },
      { title: "Thiết lập đo lường", description: "Gắn theo dõi chuyển đổi trước khi chạy." },
      { title: "Chạy & tối ưu", description: "Theo dõi và điều chỉnh trong suốt chiến dịch." },
      { title: "Báo cáo", description: "Tổng hợp kết quả theo chu kỳ đã thống nhất." },
    ],
    relatedSlugs: ["quang-cao-da-kenh", "website-doanh-nghiep"],
    serviceModes: [
      { title: "Search", body: "Tiếp cận truy vấn có ý định tìm hiểu hoặc mua rõ ràng." },
      { title: "Display", body: "Mở rộng độ phủ bằng hình ảnh và thông điệp theo nhóm đối tượng." },
      { title: "Performance Max", body: "Phân phối trên hệ sinh thái Google theo mục tiêu và dữ liệu được phép dùng." },
    ],
    customerJourney: [
      { title: "Truy vấn", description: "Xác định nhóm từ khoá và mức độ sẵn sàng của người tìm." },
      { title: "Mẫu quảng cáo", description: "Thông điệp khớp với nhu cầu và trang đích tương ứng." },
      { title: "Trang đích", description: "Khách đọc, gọi, nhắn hoặc gửi form trong luồng đã chuẩn bị." },
      { title: "Đo chuyển đổi", description: "Ghi nhận hành động đã định nghĩa rồi mới tối ưu.", output: "Báo cáo theo chu kỳ" },
    ],
    requirements: [
      { title: "Tài khoản thuộc doanh nghiệp", body: "Tài khoản quảng cáo, dữ liệu và lịch sử tối ưu không chuyển sang bên thứ ba." },
      { title: "Mục tiêu và ngân sách", body: "Cần thống nhất mục tiêu, khu vực, sản phẩm và ngân sách dự kiến." },
    ],
    costFactors: [
      { title: "Ngân sách media", body: "Khoản trả cho nền tảng tách biệt với phí triển khai và tối ưu." },
      { title: "Độ phức tạp chiến dịch", body: "Số nhóm sản phẩm, khu vực và cách đo ảnh hưởng khối lượng thiết lập." },
      { title: "Mức sẵn sàng của landing", body: "Trang đích và theo dõi đã có hay cần thiết lập từ đầu." },
    ],
    limits: [
      { title: "Không cam kết CPL, ROAS hoặc số liên hệ", body: "Kết quả phụ thuộc nền tảng, thị trường, ngân sách, nội dung và trang đích." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-09",
    policyClass: "allowed",
  },
  {
    slug: "quang-cao-facebook-ads",
    group: "performance",
    title: "Quảng cáo Facebook Ads",
    summary:
      "Thiết lập và vận hành chiến dịch Facebook, Instagram và Messenger trên Business Manager thuộc quyền sở hữu của bạn.",
    routeMode: "generic",
    featuredOnHome: false,
    pageFamily: "paid-media",
    visualAssetId: "v8-service-facebook-ads",
    navOrder: 42,
    icon: "users",
    features: [
      "Nhắm chọn theo nhóm khách hàng",
      "Thiết lập Pixel và chuyển đổi",
      "Tối ưu và báo cáo theo chu kỳ",
    ],
    problems: [
      {
        title: "Bài quảng cáo nhiều tương tác nhưng không ra đơn",
        body: "Tối ưu cho lượt thích và bình luận thay vì cho tin nhắn hoặc đơn hàng.",
      },
      {
        title: "Chưa gắn Pixel",
        body: "Không đo được ai đã vào website, nên không nhắm lại được nhóm đã quan tâm.",
      },
      {
        title: "Tài khoản quảng cáo bị vô hiệu hoá",
        body: "Chiến dịch dừng đột ngột, không rõ vướng chính sách nào.",
      },
    ],
    benefits: [
      {
        title: "Tối ưu cho kết quả thật",
        body: "Chiến dịch nhắm vào tin nhắn hoặc đơn hàng, không nhắm vào lượt tương tác.",
      },
      {
        title: "Nhắm lại người đã quan tâm",
        body: "Pixel và tệp đối tượng cho phép tiếp cận lại nhóm đã xem sản phẩm.",
      },
      {
        title: "Tài sản quảng cáo đứng tên bạn",
        body: "Business Manager, Pixel và tệp đối tượng thuộc về doanh nghiệp.",
      },
    ],
    scope: [
      { title: "Rà soát cấu trúc Business Manager", body: "Phân quyền trang, Pixel và tài khoản quảng cáo." },
      { title: "Thiết lập Pixel và sự kiện chuyển đổi" },
      { title: "Dựng chiến dịch và nhóm đối tượng", body: "Nhắm chọn theo nhu cầu, khu vực và hành vi." },
      { title: "Tối ưu trong quá trình chạy", body: "Thử mẫu quảng cáo, điều chỉnh đối tượng và ngân sách." },
      { title: "Báo cáo theo chu kỳ thống nhất" },
    ],
    deliverables: [
      { title: "Chiến dịch chạy trong Business Manager của bạn" },
      { title: "Pixel và sự kiện chuyển đổi hoạt động" },
      { title: "Báo cáo định kỳ", body: "Chi phí, lượt tiếp cận và số tin nhắn hoặc đơn ghi nhận được." },
    ],
    process: [
      { title: "Xác định mục tiêu", description: "Kết quả mong muốn và ngân sách dự kiến." },
      { title: "Rà soát tài sản", description: "Kiểm tra Business Manager, trang và Pixel hiện có." },
      { title: "Thiết lập đo lường", description: "Gắn Pixel và sự kiện trước khi chạy." },
      { title: "Chạy & tối ưu", description: "Thử mẫu và điều chỉnh trong suốt chiến dịch." },
      { title: "Báo cáo", description: "Tổng hợp kết quả theo chu kỳ đã thống nhất." },
    ],
    relatedSlugs: ["quang-cao-da-kenh", "support-mang-xa-hoi"],
    serviceModes: [
      { title: "Tin nhắn", body: "Tối ưu chiến dịch cho hội thoại có ngữ cảnh thay vì chỉ lấy tương tác." },
      { title: "Lead form", body: "Thu thập thông tin theo trường dữ liệu đã thống nhất với đội tư vấn." },
      { title: "Chuyển đổi website", body: "Đo hành động trên trang khi Pixel và sự kiện được thiết lập đúng." },
    ],
    customerJourney: [
      { title: "Xác định tệp", description: "Chọn nhóm khách, khu vực và tín hiệu quan tâm cần tiếp cận." },
      { title: "Thử nội dung", description: "Đưa nhiều giả thuyết sáng tạo vào cùng một khung đo." },
      { title: "Ghi nhận hành động", description: "Theo dõi tin nhắn, form hoặc sự kiện website đã định nghĩa." },
      { title: "Tối ưu có căn cứ", description: "Đọc dữ liệu rồi điều chỉnh đối tượng, mẫu và ngân sách.", output: "Báo cáo minh bạch" },
    ],
    requirements: [
      { title: "Business Manager thuộc doanh nghiệp", body: "Trang, Pixel, tài khoản quảng cáo và tệp đối tượng cần có quyền truy cập rõ ràng." },
      { title: "Mục tiêu và nội dung", body: "Cần thống nhất mục tiêu, sản phẩm, khu vực và tài nguyên sáng tạo." },
    ],
    limits: [
      { title: "Không cam kết duyệt hoặc doanh số", body: "Nền tảng có thể hạn chế tài khoản; kết quả còn phụ thuộc ngân sách, nội dung và thị trường." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-09",
    policyClass: "allowed",
  },
  {
    slug: "quang-cao-zalo-ads",
    group: "performance",
    title: "Quảng cáo Zalo Ads",
    summary:
      "Thiết lập và vận hành quảng cáo Zalo — tin tài trợ, Zalo Official Account và form đăng ký — cho khách hàng trong nước.",
    routeMode: "generic",
    featuredOnHome: false,
    pageFamily: "paid-media",
    visualAssetId: "v8-service-zalo-ads",
    navOrder: 43,
    icon: "send",
    features: [
      "Nhắm chọn theo khu vực và độ tuổi",
      "Dẫn khách về Zalo OA hoặc website",
      "Báo cáo theo chu kỳ thống nhất",
    ],
    problems: [
      {
        title: "Khách hàng chủ yếu dùng Zalo nhưng chưa khai thác",
        body: "Toàn bộ ngân sách đổ vào Google và Facebook, bỏ trống kênh khách đang nhắn tin hằng ngày.",
      },
      {
        title: "Chạy tin tài trợ nhưng không ai nhắn lại",
        body: "Nội dung và nhắm chọn chưa khớp với nhu cầu của nhóm nhận tin.",
      },
      {
        title: "Chưa có Zalo OA để nhận khách",
        body: "Quảng cáo dẫn về số cá nhân, không quản lý được hội thoại khi khách tăng.",
      },
    ],
    benefits: [
      {
        title: "Tiếp cận đúng kênh khách đang dùng",
        body: "Zalo là nơi phần lớn khách trong nước trao đổi mua bán hằng ngày.",
      },
      {
        title: "Khách nhắn thẳng, không qua form",
        body: "Hội thoại bắt đầu ngay trong Zalo, ít bước hơn so với điền biểu mẫu.",
      },
      {
        title: "Quản lý được hội thoại",
        body: "Zalo OA cho phép nhiều người trực và không lẫn vào tin nhắn cá nhân.",
      },
    ],
    scope: [
      { title: "Thiết lập hoặc rà soát Zalo OA", body: "Thông tin, ảnh, nút hành động và phân quyền trực." },
      { title: "Dựng chiến dịch quảng cáo", body: "Tin tài trợ, form đăng ký hoặc dẫn về website." },
      { title: "Nhắm chọn theo khu vực và nhóm khách" },
      { title: "Tối ưu trong quá trình chạy", body: "Thử nội dung và điều chỉnh nhắm chọn." },
      { title: "Báo cáo theo chu kỳ thống nhất" },
    ],
    deliverables: [
      { title: "Chiến dịch chạy trên tài khoản của bạn" },
      { title: "Zalo OA đã thiết lập và phân quyền" },
      { title: "Báo cáo định kỳ", body: "Chi phí, lượt tiếp cận và số hội thoại ghi nhận được." },
    ],
    process: [
      { title: "Xác định mục tiêu", description: "Kết quả mong muốn và ngân sách dự kiến." },
      { title: "Chuẩn bị kênh nhận", description: "Thiết lập hoặc chuẩn hoá Zalo OA trước khi chạy." },
      { title: "Dựng chiến dịch", description: "Nội dung, nhắm chọn và ngân sách." },
      { title: "Chạy & tối ưu", description: "Thử nội dung và điều chỉnh trong suốt chiến dịch." },
      { title: "Báo cáo", description: "Tổng hợp kết quả theo chu kỳ đã thống nhất." },
    ],
    relatedSlugs: ["quang-cao-da-kenh", "support-mang-xa-hoi"],
    serviceModes: [
      { title: "Tin tài trợ", body: "Đưa thông điệp tới nhóm khách theo khu vực và đặc điểm đã thống nhất." },
      { title: "Dẫn về Zalo OA", body: "Bắt đầu hội thoại trong OA thay vì đẩy khách vào tài khoản cá nhân." },
      { title: "Form hoặc website", body: "Chọn điểm nhận thông tin phù hợp với cách đội tư vấn xử lý lead." },
    ],
    customerJourney: [
      { title: "Quảng cáo", description: "Thông điệp và nhóm nhận tin được chuẩn bị theo mục tiêu." },
      { title: "OA, form hoặc website", description: "Khách đi vào điểm nhận đã thống nhất trước khi chạy." },
      { title: "Hội thoại", description: "Đội phụ trách tiếp nhận câu hỏi và thông tin có ngữ cảnh." },
      { title: "Bàn giao lead", description: "Ghi nhận nguồn và trạng thái xử lý theo quy ước.", output: "Báo cáo theo chu kỳ" },
    ],
    requirements: [
      { title: "Zalo OA và phân quyền", body: "Thông tin, ảnh, nút hành động và người trực cần sẵn sàng trước khi chạy." },
      { title: "Kịch bản tiếp nhận", body: "Thống nhất ai nhận hội thoại và cách ghi nhận nguồn liên hệ." },
    ],
    limits: [
      { title: "Hiệu quả phụ thuộc nền tảng", body: "Phạm vi tiếp cận và xét duyệt phụ thuộc nội dung, ngân sách và chính sách Zalo." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-09",
    policyClass: "allowed",
  },
  {
    slug: "marketing-bat-dong-san",
    group: "performance",
    title: "Marketing bất động sản",
    summary:
      "Gói triển khai cho dự án và sàn bất động sản: website dự án, quảng cáo đa kênh, nội dung và SEO cho truy vấn nhà đất theo khu vực.",
    routeMode: "generic",
    featuredOnHome: false,
    pageFamily: "integrated-growth",
    visualAssetId: "v8-service-real-estate-marketing",
    navOrder: 45,
    icon: "building",
    features: [
      "Trang dự án và luồng nhận thông tin khách",
      "Quảng cáo theo khu vực và nhu cầu",
      "Nội dung và SEO cho truy vấn nhà đất",
    ],
    problems: [
      {
        title: "Chạy quảng cáo nhưng khách không đúng nhu cầu",
        body: "Nhận được nhiều liên hệ hỏi cho biết, ít người thực sự trong khoảng giá của dự án.",
      },
      {
        title: "Mỗi kênh làm một kiểu",
        body: "Website, fanpage và quảng cáo nói ba thông điệp khác nhau về cùng một dự án.",
      },
      {
        title: "Không ai tìm thấy dự án trên Google",
        body: "Không có trang nào trả lời đúng truy vấn dạng “căn hộ [khu vực] giá [khoảng]”.",
      },
    ],
    benefits: [
      {
        title: "Một thông điệp trên mọi kênh",
        body: "Website, quảng cáo và nội dung nói cùng một câu về dự án.",
      },
      {
        title: "Nội dung bám truy vấn nhà đất",
        body: "Trang theo khu vực và khoảng giá — đúng cách khách gõ tìm.",
      },
      {
        title: "Đo được nguồn khách",
        body: "Biết liên hệ đến từ kênh nào, để dồn ngân sách vào kênh đang hiệu quả.",
      },
    ],
    scope: [
      { title: "Xây trang dự án", body: "Cấu trúc dự án, sản phẩm và luồng nhận thông tin khách." },
      { title: "Nghiên cứu truy vấn theo khu vực", body: "Xác định cách khách tìm nhà đất tại từng địa bàn." },
      { title: "Nội dung và SEO on-page", body: "Trang theo khu vực, khoảng giá và loại sản phẩm." },
      { title: "Quảng cáo đa kênh", body: "Google, Facebook và Zalo theo mục tiêu và ngân sách." },
      { title: "Theo dõi nguồn khách và báo cáo" },
    ],
    deliverables: [
      { title: "Trang dự án hoạt động trên tên miền của bạn" },
      { title: "Kế hoạch nội dung theo khu vực và khoảng giá" },
      { title: "Báo cáo nguồn khách định kỳ" },
    ],
    process: [
      { title: "Khảo sát dự án", description: "Loại sản phẩm, khoảng giá và nhóm khách mục tiêu." },
      { title: "Đề xuất phương án", description: "Kênh, nội dung và cách đo, kèm chi phí từng phần." },
      { title: "Xây nền tảng", description: "Dựng trang dự án và gắn theo dõi trước khi chạy." },
      { title: "Triển khai & tối ưu", description: "Chạy quảng cáo và bổ sung nội dung theo kết quả." },
      { title: "Báo cáo", description: "Tổng hợp nguồn khách theo chu kỳ đã thống nhất." },
    ],
    relatedSlugs: ["website-bat-dong-san", "quang-cao-da-kenh"],
    serviceModes: [
      { title: "Website dự án", body: "Nơi giữ thông tin dự án, sản phẩm, khu vực và điểm liên hệ." },
      { title: "Quảng cáo đa kênh", body: "Đưa thông điệp tới nhóm khách theo mục tiêu và ngân sách." },
      { title: "SEO và nội dung", body: "Trả lời truy vấn nhà đất theo khu vực, loại sản phẩm và khoảng giá." },
      { title: "Theo dõi nguồn khách", body: "Ghi nhận nguồn liên hệ để đội kinh doanh tiếp nhận đúng ngữ cảnh." },
    ],
    customerJourney: [
      { title: "Nhìn thấy dự án", description: "Khách bắt gặp thông điệp từ quảng cáo hoặc nhu cầu tìm kiếm." },
      { title: "Lọc theo nhu cầu", description: "Trang dự án giúp chọn khu vực, khoảng giá và loại sản phẩm." },
      { title: "Để lại liên hệ", description: "Khách gọi, nhắn hoặc gửi form tại điểm đã đủ thông tin." },
      { title: "Đội bán hàng tiếp nhận", description: "Nguồn và trạng thái được ghi nhận theo quy ước.", output: "Báo cáo nguồn khách" },
    ],
    requirements: [
      { title: "Thông tin dự án được duyệt", body: "Pháp lý, sản phẩm, khu vực, khoảng giá và hình ảnh do chủ sở hữu cung cấp." },
      { title: "Đầu mối nhận lead", body: "Cần xác định người tiếp nhận và cách phản hồi sau khi khách liên hệ." },
    ],
    limits: [
      { title: "Không cam kết số lead hoặc giao dịch", body: "Kết quả phụ thuộc thị trường, ngân sách, sản phẩm, nội dung và quy trình bán hàng." },
    ],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-09",
    policyClass: "allowed",
  },

  // ── Excluded by policy. Present so the decision is recorded in code rather than remembered:
  //    a future editor looking for "why don't we sell reviews" finds the answer here. ──────
  {
    slug: "ban-danh-gia-google-maps",
    group: "local-presence",
    title: "Bán đánh giá Google Maps",
    summary: "Không triển khai.",
    routeMode: "generic",
    featuredOnHome: false,
    navOrder: 999,
    icon: "circle-check",
    published: false,
    claimState: "unverified",
    policyClass: "excluded",
  },
  {
    slug: "ban-review-tripadvisor",
    group: "local-presence",
    title: "Bán review Tripadvisor",
    summary: "Không triển khai.",
    routeMode: "generic",
    featuredOnHome: false,
    navOrder: 999,
    icon: "circle-check",
    published: false,
    claimState: "unverified",
    policyClass: "excluded",
  },
  {
    slug: "go-danh-gia-xau",
    group: "local-presence",
    title: "Gỡ đánh giá xấu",
    summary: "Không triển khai.",
    routeMode: "generic",
    featuredOnHome: false,
    navOrder: 999,
    icon: "circle-check",
    published: false,
    claimState: "unverified",
    policyClass: "excluded",
  },
];

/** Services safe to show anywhere public. Excluded policy class can never appear, whatever its
 *  publish flag says — that is the point of encoding it rather than relying on discipline. */
export function publishedServices(): ServiceDefinition[] {
  return serviceRegistry
    .filter((s) => s.policyClass !== "excluded" && s.published)
    .sort((a, b) => a.navOrder - b.navOrder);
}

/** Homepage grid. Derived, so the grid size follows the data. */
export function homeServices(): ServiceDefinition[] {
  return publishedServices().filter((s) => s.featuredOnHome);
}

/** Hub `/dich-vu`, grouped. Groups with nothing published are omitted entirely rather than
 *  rendering an empty heading. */
export function servicesByGroup(): { group: ServiceGroup; label: string; services: ServiceDefinition[] }[] {
  const published = publishedServices();
  return SERVICE_GROUP_ORDER.map((group) => ({
    group,
    label: SERVICE_GROUP_LABELS[group],
    services: published.filter((s) => s.group === group),
  })).filter((entry) => entry.services.length > 0);
}

/** Services that `/dich-vu/[slug]` is allowed to render. Specialized routes are excluded so the
 *  generic template never shadows a hand-built landing. */
export function genericServiceSlugs(): string[] {
  return publishedServices()
    .filter((s) => s.routeMode === "generic")
    .map((s) => s.slug);
}

export function findService(slug: string): ServiceDefinition | undefined {
  return serviceRegistry.find((s) => s.slug === slug && s.policyClass !== "excluded");
}
