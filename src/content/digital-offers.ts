import type { TruthState } from "@/lib/content-truth";
import { isProductionVisible } from "@/lib/content-truth";
import type { BrandName } from "@/components/ui/BrandMark";

/** Gói dịch vụ số — PHUONG_AN §7.4.
 *
 * Dữ liệu này trước đây nằm thẳng trong `/dich-vu-so/page.tsx` dưới dạng mảng chữ với cờ
 * `demoOnly: true`, nhưng cờ đó không nối vào bất cứ thứ gì: cả bốn thẻ vẫn render đầy đủ giá
 * và cam kết. Nói cách khác trang đang chạy trên production công bố "Từ 199.000đ/tháng",
 * "Bảo hành 24/7", "Bản quyền chính hãng" như thể là giá và cam kết thật, trong khi chính dữ
 * liệu tự khai đó là số minh hoạ.
 *
 * Ở đây `claimState` quyết định việc hiển thị chứ không phải một dòng chữ nhỏ ở cuối section.
 * Bốn gói dưới đây là `unverified`, nên `visibleDigitalOffers()` trả về mảng rỗng và section tự
 * biến mất. Chúng được giữ lại nguyên vẹn — không xoá — để khi chủ sở hữu xác nhận giá và phạm
 * vi bảo hành thật thì việc mở lại là sửa `claimState` và điền `verifiedAt`, không phải viết
 * lại dữ liệu từ đầu.
 */
export type DigitalOffer = TruthState & {
  brand: BrandName;
  name: string;
  /** Giá hiển thị. Chỉ được render khi `claimState` cho phép — xem `visibleDigitalOffers()`. */
  price: string;
  features: string[];
};

export const digitalOffers: DigitalOffer[] = [
  {
    brand: "openai-chatgpt",
    name: "ChatGPT Plus",
    price: "Từ 199.000đ/tháng",
    // "Bảo hành 24/7" và "Hàng đầu thị trường" đã bị gỡ khỏi dữ liệu chứ không chỉ bị ẩn:
    // một cái là cam kết dịch vụ không ai vận hành, một cái là tuyên bố thứ hạng không đo được.
    // Giữ chúng lại trong dữ liệu chỉ để chờ ngày "publish nhầm" là tự đặt bẫy cho chính mình.
    features: ["Hỗ trợ thiết lập ban đầu", "Hỗ trợ trong thời gian sử dụng"],
    published: true,
    claimState: "unverified",
  },
  {
    brand: "youtube",
    name: "YouTube Premium",
    price: "Từ 79.000đ/tháng",
    features: ["Không quảng cáo", "Nghe nhạc nền"],
    published: true,
    claimState: "unverified",
  },
  {
    brand: "microsoft",
    name: "Microsoft 365",
    price: "Từ 349.000đ/tháng",
    features: ["Đầy đủ ứng dụng", "Dung lượng đám mây"],
    published: true,
    claimState: "unverified",
  },
  {
    brand: "canva",
    name: "Canva Pro",
    price: "Từ 89.000đ/tháng",
    features: ["Đầy đủ tính năng", "Hỗ trợ nhanh chóng"],
    published: true,
    claimState: "unverified",
  },
];

/** Gói được phép hiện trên production. Rỗng cho tới khi có xác minh — và section gọi hàm này
 *  phải tự ẩn khi rỗng thay vì hiện tiêu đề trên một lưới trống. */
export function visibleDigitalOffers(preview = false): DigitalOffer[] {
  return digitalOffers.filter((offer) => isProductionVisible(offer, preview));
}
