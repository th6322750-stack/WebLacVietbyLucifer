import type { TruthState } from "@/lib/content-truth";
import { isProductionVisible } from "@/lib/content-truth";
import type { BrandName } from "@/components/ui/BrandMark";
import type { IconName } from "@/components/ui/Icon";
import type { ContentBlock, ServiceProcessStep } from "@/content/service-registry";

/** Dịch vụ support mạng xã hội — PHUONG_AN §7.4.
 *
 * Bốn nhóm này trước đây là một mảng chữ nằm trong `/support-mxh/page.tsx`, không có slug, không
 * có route riêng, nên mỗi nhóm chỉ tồn tại dưới dạng bốn gạch đầu dòng trong một tấm thẻ. Khách
 * đang gặp đúng sự cố đó không có chỗ nào để đọc kỹ hơn, và Google không có trang nào để xếp
 * hạng cho truy vấn cụ thể ("khôi phục fanpage bị khoá").
 *
 * PHẠM VI LÀ PHẦN KHÔNG ĐƯỢC PHÓNG ĐẠI Ở ĐÂY. Không dịch vụ nào dưới đây hứa khôi phục thành
 * công, hứa thời gian, hay ngụ ý có kênh nội bộ với nền tảng — vì quyết định cuối cùng luôn
 * thuộc về Meta/TikTok, không thuộc về Lạc Việt. Mỗi mục vì thế có `limits`: những điều dịch vụ
 * KHÔNG làm, hiển thị ngay trên trang chi tiết chứ không giấu trong điều khoản.
 */
export type SupportService = TruthState & {
  slug: string;
  brand?: BrandName;
  icon?: IconName;
  /** Vật thể signature V7 cho hero trang chi tiết (ASSET_BOARD_UI_V7). Optional để component
   *  không vỡ nếu một record tương lai chưa có ảnh — lúc đó nó rơi về visual CSS cũ. */
  visualAssetId?: string;
  title: string;
  /** Câu ngắn cho thẻ ở trang tổng. */
  description: string;
  /** Gạch đầu dòng trên thẻ. */
  bullets: string[];
  /** Mở đầu trang chi tiết. */
  intro: string;
  symptoms?: ContentBlock[];
  scope?: ContentBlock[];
  /** Ranh giới dịch vụ. Bắt buộc — xem chú thích đầu file. */
  limits: string[];
  process?: ServiceProcessStep[];
  relatedSlugs?: string[];
};

/** Quy trình dùng chung cho cả bốn nhóm: khác biệt nằm ở phạm vi, không nằm ở cách làm việc. */
const SHARED_PROCESS: ServiceProcessStep[] = [
  { title: "Tiếp nhận", description: "Mô tả tình trạng kênh và những gì đã thử qua Zalo." },
  { title: "Đánh giá", description: "Xác định nguyên nhân và khả năng xử lý trong phạm vi hợp lệ." },
  { title: "Thống nhất phạm vi", description: "Chốt rõ việc sẽ làm và chi phí trước khi bắt đầu." },
  { title: "Thực hiện", description: "Triển khai theo đúng quy trình mà nền tảng cho phép." },
  { title: "Bàn giao & hướng dẫn", description: "Bàn giao kết quả kèm hướng dẫn phòng ngừa tái diễn." },
];

const SHARED_LIMITS = [
  "Không can thiệp vào hệ thống của nền tảng và không hứa chắc chắn khôi phục được.",
  "Không xử lý các trường hợp vi phạm chính sách nền tảng hoặc liên quan đến tài khoản không thuộc quyền sở hữu của bạn.",
  "Kết quả và thời gian phụ thuộc vào quyết định của nền tảng, được trao đổi rõ trước khi bắt đầu.",
];

export const supportServices: SupportService[] = [
  {
    slug: "facebook",
    brand: "facebook",
    visualAssetId: "v7-support-facebook",
    title: "Facebook Support",
    description: "Khắc phục lỗi trang, tài khoản quảng cáo bị hạn chế hoặc khoá.",
    bullets: [
      "Khôi phục tài khoản cá nhân",
      "Khôi phục Fanpage bị khóa",
      "Gỡ hạn chế, checkpoint",
      "Hỗ trợ vấn đề đăng nhập",
    ],
    intro:
      "Hỗ trợ xử lý các sự cố phổ biến trên Facebook cho tài khoản và fanpage thuộc quyền sở hữu của bạn, theo đúng quy trình khiếu nại mà nền tảng cung cấp.",
    symptoms: [
      { title: "Fanpage bị khoá hoặc hạn chế", body: "Trang không đăng bài được, mất quyền quản trị hoặc bị ẩn khỏi tìm kiếm." },
      { title: "Tài khoản dính checkpoint", body: "Bị yêu cầu xác minh danh tính và không đăng nhập lại được." },
      { title: "Tài khoản quảng cáo bị hạn chế", body: "Không chạy được chiến dịch, thanh toán bị từ chối." },
    ],
    scope: [
      { title: "Rà soát nguyên nhân", body: "Xác định trang/tài khoản vướng chính sách nào trước khi khiếu nại." },
      { title: "Chuẩn bị hồ sơ khiếu nại", body: "Hướng dẫn chuẩn bị giấy tờ và thông tin nền tảng yêu cầu." },
      { title: "Theo dõi tiến trình", body: "Đồng hành cho tới khi có kết quả phản hồi từ nền tảng." },
    ],
    limits: SHARED_LIMITS,
    process: SHARED_PROCESS,
    relatedSlugs: ["meta-business", "bao-mat-khoi-phuc"],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-07",
  },
  {
    slug: "tiktok",
    brand: "tiktok",
    visualAssetId: "v7-support-tiktok",
    title: "TikTok Support",
    description: "Xử lý sự cố tài khoản, video bị hạn chế hiển thị.",
    bullets: [
      "Khôi phục tài khoản TikTok",
      "Mở khóa tài khoản bị cấm",
      "Gỡ hạn chế tương tác",
      "Hỗ trợ vấn đề đăng nhập",
    ],
    intro:
      "Hỗ trợ xử lý sự cố tài khoản TikTok thuộc quyền sở hữu của bạn — từ đăng nhập, hạn chế hiển thị đến khiếu nại khi tài khoản bị khoá.",
    symptoms: [
      { title: "Tài khoản bị khoá", body: "Không đăng nhập được hoặc nhận thông báo vi phạm cộng đồng." },
      { title: "Video bị hạn chế hiển thị", body: "Lượt tiếp cận giảm đột ngột, video không lên đề xuất." },
      { title: "Mất quyền truy cập", body: "Đổi số điện thoại, mất email đăng ký hoặc bị chiếm tài khoản." },
    ],
    scope: [
      { title: "Rà soát tình trạng kênh", body: "Xác định nguyên nhân hạn chế trước khi gửi khiếu nại." },
      { title: "Hướng dẫn khiếu nại", body: "Chuẩn bị nội dung và giấy tờ theo đúng biểu mẫu nền tảng." },
      { title: "Tư vấn phòng ngừa", body: "Điều chỉnh cách vận hành kênh để giảm rủi ro tái diễn." },
    ],
    limits: SHARED_LIMITS,
    process: SHARED_PROCESS,
    relatedSlugs: ["facebook", "bao-mat-khoi-phuc"],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-07",
  },
  {
    slug: "meta-business",
    brand: "meta",
    visualAssetId: "v7-support-meta-business",
    title: "Meta Business / Ads Support",
    description: "Quản lý và khắc phục sự cố Meta Business Suite, tài khoản quảng cáo.",
    bullets: [
      "Khôi phục Trình quản lý BM",
      "Gỡ hạn chế tài khoản quảng cáo",
      "Xác minh doanh nghiệp",
      "Hỗ trợ thanh toán & hoá đơn",
    ],
    intro:
      "Hỗ trợ doanh nghiệp xử lý sự cố ở tầng Business Manager và tài khoản quảng cáo — nơi một hạn chế nhỏ có thể làm dừng toàn bộ hoạt động bán hàng.",
    symptoms: [
      { title: "Business Manager bị vô hiệu hoá", body: "Mất quyền truy cập vào toàn bộ tài sản quảng cáo." },
      { title: "Tài khoản quảng cáo bị hạn chế", body: "Chiến dịch dừng đột ngột giữa mùa bán hàng." },
      { title: "Vướng xác minh doanh nghiệp", body: "Hồ sơ bị từ chối nhiều lần mà không rõ lý do." },
    ],
    scope: [
      { title: "Kiểm tra cấu trúc tài sản", body: "Rà soát phân quyền BM, page, pixel và tài khoản quảng cáo." },
      { title: "Hỗ trợ hồ sơ xác minh", body: "Hướng dẫn chuẩn bị giấy tờ doanh nghiệp đúng yêu cầu." },
      { title: "Xử lý vấn đề thanh toán", body: "Rà soát phương thức thanh toán và hoá đơn bị treo." },
    ],
    limits: SHARED_LIMITS,
    process: SHARED_PROCESS,
    relatedSlugs: ["facebook", "bao-mat-khoi-phuc"],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-07",
  },
  {
    slug: "bao-mat-khoi-phuc",
    // Was a gold shield icon; replaced with the blue verified badge at Lucifer's request, since
    // this card is about getting an account verified and recovered rather than security in the
    // abstract.
    brand: "verified",
    visualAssetId: "v7-support-verified",
    // Title transcribed from the master crop; the previous wording was not the approved text.
    title: "Tư vấn bảo mật & Khôi phục hợp lệ",
    description: "Tư vấn bảo mật và khôi phục quyền sở hữu hợp lệ cho kênh của bạn.",
    bullets: [
      "Tư vấn bảo mật tài khoản",
      "Hướng dẫn lấy lại quyền sở hữu",
      "Bảo vệ kênh trước rủi ro",
      "Đào tạo & hướng dẫn sử dụng",
    ],
    intro:
      "Tư vấn cách bảo vệ kênh và lấy lại quyền sở hữu hợp lệ — dành cho tài sản số mà bạn chứng minh được là của mình.",
    symptoms: [
      { title: "Mất quyền quản trị", body: "Nhân sự cũ rời đi và giữ lại quyền admin của page hoặc BM." },
      { title: "Kênh có dấu hiệu bị xâm nhập", body: "Đăng nhập lạ, nội dung đăng ngoài ý muốn." },
      { title: "Chưa có quy trình bảo mật", body: "Cả đội dùng chung một tài khoản, không có xác thực hai lớp." },
    ],
    scope: [
      { title: "Rà soát rủi ro hiện tại", body: "Kiểm tra phân quyền, thiết bị đăng nhập và phương thức xác thực." },
      { title: "Khôi phục quyền sở hữu hợp lệ", body: "Hướng dẫn quy trình chứng minh quyền sở hữu với nền tảng." },
      { title: "Đào tạo vận hành an toàn", body: "Hướng dẫn đội ngũ quy tắc phân quyền và xác thực hai lớp." },
    ],
    limits: [
      ...SHARED_LIMITS,
      "Không hỗ trợ truy cập tài khoản khi bạn không chứng minh được quyền sở hữu hợp lệ.",
    ],
    process: SHARED_PROCESS,
    relatedSlugs: ["facebook", "meta-business"],
    published: true,
    claimState: "verified",
    verifiedAt: "2026-09-07",
  },
];

export function visibleSupportServices(preview = false): SupportService[] {
  return supportServices.filter((s) => isProductionVisible(s, preview));
}

export function findSupportService(slug: string): SupportService | undefined {
  return supportServices.find((s) => s.slug === slug);
}

export function supportServiceSlugs(): string[] {
  return visibleSupportServices().map((s) => s.slug);
}

export function relatedSupportServices(slug: string): SupportService[] {
  const service = findSupportService(slug);
  if (!service) return [];
  return (service.relatedSlugs ?? [])
    .map(findSupportService)
    .filter((s): s is SupportService => Boolean(s && isProductionVisible(s)));
}
