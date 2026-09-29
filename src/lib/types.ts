// Mirrors .webby/DATA_BACKEND_CONTRACT.json entity definitions.

export type PriceMode = "fixed" | "from" | "contact" | "hidden";

export type Service = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  ctaLabel: string;
  href: string;
  icon: string;
  /** Full-colour illustration shown instead of the plain line icon, e.g. "/assets/v5/services/x.webp". */
  iconImage?: string;
  features?: string[];
  priceMode?: PriceMode;
  priceVnd?: number;
  heroAssetId?: string;
  faqIds?: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  demoOnly: boolean;
  heroAssetId?: string;
  /** Large detail-route visual, separate from the grid cover. `heroAssetId` is an
   * identity-bound PROJECT_COVER belonging to exactly one project, so a detail-only fixture
   * must never borrow another project's cover here — it carries its own ASSET_USAGE_MAP-mapped
   * DETAIL_VISUAL instead (GD10 re-QA round 4, R4-01). */
  detailVisualAssetId?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  technology?: string[];
  galleryAssetIds?: string[];
  durationLabel?: string;
  completedLabel?: string;
  resultMetrics?: { value: string; label: string }[];
  /** Resolvable by slug (detail page) but excluded from grid/filter listings — used when the
   * approved master shows a distinct listing identity vs. detail-template identity for what
   * would otherwise collide on the same asset. */
  hidden?: boolean;
};

export type ArticleSection = {
  id: string;
  heading: string;
  body: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: ArticleSection[];
  publishedAt: string;
  author: string;
  /** Required, mirroring Project["demoOnly"]. Every current fixture's body is a demo
   * reconstruction rather than verified editorial content, so it must not become factual
   * structured data or an indexed claim (SEO_CONTRACT.json contentIntegrity + "Article on
   * factual knowledge articles" only). Gates Article JSON-LD, noindex, and sitemap inclusion
   * (GD10 re-QA round 5, R5-01). Set to false only once the body is verified. */
  demoOnly: boolean;
  coverAssetId?: string;
  readMinutes?: number;
  seoTitle?: string;
  seoDescription?: string;
  /** See Project["hidden"] — same rationale, same pattern. */
  hidden?: boolean;
};

export type FAQ = {
  id: string;
  scope: string;
  question: string;
  answer: string;
  order: number;
};

export type PreferredChannel = "phone" | "zalo" | "telegram";

export type LeadInput = {
  name: string;
  phone: string;
  need: string;
  service: string;
  preferredChannel: PreferredChannel;
  consent: boolean;
  sourceRoute: string;
  email?: string;
  utm?: string;
  referrer?: string;
};

export type Lead = LeadInput & {
  id: string;
  createdAt: string;
  external_sync_status: "pending" | "synced" | "failed";
  external_id: string | null;
};

export type SubscriberInput = {
  email: string;
  consent: boolean;
  sourceRoute?: string;
};

export type Subscriber = SubscriberInput & {
  id: string;
  createdAt: string;
  external_sync_status: "pending" | "synced" | "failed";
  external_id: string | null;
};
