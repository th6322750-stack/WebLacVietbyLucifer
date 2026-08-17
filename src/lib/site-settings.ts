export const siteSettings = {
  brandName: "Lạc Việt Media Agency",
  slogan: "Cần Kiệm Liêm Chính",
  domain: "lacvietmedia.com",
  canonicalOrigin: "https://lacvietmedia.com",
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

export const navLinks = [
  { href: "/website", label: "Website" },
  { href: "/support-mxh", label: "Support MXH" },
  { href: "/dich-vu-so", label: "Dịch vụ số" },
  { href: "/du-an", label: "Dự án" },
  { href: "/kien-thuc", label: "Kiến thức" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
] as const;

export const footerLinks = {
  brand: [
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: "/du-an", label: "Dự án" },
    { href: "/kien-thuc", label: "Kiến thức" },
  ],
  services: [
    { href: "/website", label: "Website doanh nghiệp" },
    { href: "/support-mxh", label: "Support mạng xã hội" },
    { href: "/dich-vu-so", label: "Dịch vụ số" },
  ],
  contact: [{ href: "/lien-he", label: "Liên hệ tư vấn" }],
} as const;
