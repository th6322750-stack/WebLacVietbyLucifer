export const siteSettings = {
  brandName: "Lạc Việt Media Agency",
  // Deliberately not rendered anywhere (removed from footer, homepage hero, and /gioi-thieu
  // 2026-08-25 per explicit request). Left as data, not a call to bring it back.
  slogan: "Cần Kiệm Liêm Chính",
  // Real production domain as of 2026-08-24 (lacvietmedia.com never resolved — dead domain
  // left over from before this one was registered). Sitemap/robots/canonical URLs all derive
  // from this, so a stale value here was actively pointing crawlers at a domain that's down.
  //
  // 2026-09-02: must be the WWW form. The apex 308-redirects to www, so canonicalising on the
  // apex pointed every canonical URL, sitemap entry and OG tag at a redirect rather than at the
  // 200. Verified by request, not by assumption: https://lacviet.media -> 308 ->
  // https://www.lacviet.media/. Whichever host answers 200 is the one that belongs here.
  domain: "www.lacviet.media",
  canonicalOrigin: "https://www.lacviet.media",
  zalo: "0355636882",
  telegram: "@lucifer_dvmxh",
  // Pending confirmation from Lucifer (CONTENT_TRUTH.json "pending"). Not rendered as a
  // live outbound link until a real URL is supplied — see FacebookLink component.
  facebookUrl: null as string | null,
  // Contact details shown in GĐ1 mockups are unverified per CONTENT_TRUTH.json and must
  // not be presented as confirmed production facts until Lucifer verifies them.
  productionEmail: null as string | null,
  streetAddress: null as string | null,
  servicePriority: [
    "Website doanh nghiệp",
    "Support mạng xã hội",
    "Dịch vụ số / tài khoản",
  ],
} as const;

// Matches approved V1 header: Trang chủ, Dịch vụ (dropdown), Dự án, Kiến thức,
// Giới thiệu, Liên hệ — see .webby/visual-master/gd1-v1/pages/page-03..13.
//
// "Dịch vụ số" ẩn khỏi menu theo yêu cầu — trang /dich-vu-so vẫn còn nguyên, chỉ không còn lối
// vào từ menu Dịch vụ hay footer (cả hai đều đọc từ mảng này).
export const serviceMenu = [
  { href: "/website", label: "Thiết kế website" },
  { href: "/support-mxh", label: "Support mạng xã hội" },
] as const;

// "Dự án" bỏ khỏi menu — gallery giao diện web dồn hết về trang /website (tab "Dịch vụ" >
// "Thiết kế website"), /du-an giờ chỉ còn redirect sang đó cho link cũ không gãy.
export const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: null, label: "Dịch vụ", children: serviceMenu },
  { href: "/kien-thuc", label: "Kiến thức" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

export const footerLinks = {
  brand: [
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: "/kien-thuc", label: "Kiến thức" },
  ],
  services: serviceMenu,
  contact: [{ href: "/lien-he", label: "Liên hệ tư vấn" }],
} as const;
