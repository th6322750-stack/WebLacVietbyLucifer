// Mirrors .webby/DATA_BACKEND_CONTRACT.json entity definitions.

export type PriceMode = "fixed" | "from" | "contact" | "hidden";

export type Service = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  ctaLabel: string;
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
  challenge?: string;
  solution?: string;
  results?: string[];
  technology?: string[];
  galleryAssetIds?: string[];
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
  coverAssetId?: string;
  readMinutes?: number;
  seoTitle?: string;
  seoDescription?: string;
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
