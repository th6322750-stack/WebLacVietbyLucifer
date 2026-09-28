/** Table definitions, applied on demand and safe to re-run. Postgres (Neon).
 *
 * Shapes are taken straight from src/lib/types.ts so the admin never has to reconcile two
 * different ideas of what a Project is. Columns the site does not have yet — `published`,
 * `sort_order`, and leads' `status`/`note` — exist because the admin needs them: something has
 * to hold "draft vs live", "this order on the grid", and "already called this person".
 *
 * This is the MARKETING project's half of a schema that used to include the shop too — the
 * shop, its customers, and its orders moved to their own project and their own Neon database
 * (lacvietmedia-shop), split out on 2026-08-23 so the two sites deploy and scale independently.
 * `admin_users` is the one table both projects still declare identically — the auth mechanism
 * it backs is duplicated infrastructure, not shared data.
 */
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS projects (
  slug                    TEXT PRIMARY KEY,
  title                   TEXT NOT NULL,
  category                TEXT NOT NULL,
  summary                 TEXT NOT NULL,
  demo_only               INTEGER NOT NULL DEFAULT 1,
  hero_asset_id           TEXT,
  detail_visual_asset_id  TEXT,
  challenge               TEXT,
  solution                TEXT,
  results                 TEXT,
  technology              TEXT,
  gallery_asset_ids       TEXT,
  duration_label          TEXT,
  completed_label         TEXT,
  result_metrics          TEXT,
  demo_url                TEXT,
  hidden                  INTEGER NOT NULL DEFAULT 0,
  published               INTEGER NOT NULL DEFAULT 1,
  sort_order              INTEGER NOT NULL DEFAULT 0,
  created_at              TEXT NOT NULL,
  updated_at              TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
  slug            TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  category        TEXT NOT NULL,
  excerpt         TEXT NOT NULL,
  content         TEXT NOT NULL,
  published_at    TEXT NOT NULL,
  author          TEXT NOT NULL,
  demo_only       INTEGER NOT NULL DEFAULT 1,
  cover_asset_id  TEXT,
  hero_asset_id   TEXT,
  read_minutes    INTEGER,
  seo_title       TEXT,
  seo_description TEXT,
  published       INTEGER NOT NULL DEFAULT 1,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS services (
  slug           TEXT PRIMARY KEY,
  category       TEXT NOT NULL,
  title          TEXT NOT NULL,
  summary        TEXT NOT NULL,
  cta_label      TEXT NOT NULL,
  href           TEXT NOT NULL,
  icon           TEXT NOT NULL,
  features       TEXT,
  price_mode     TEXT,
  price_vnd      INTEGER,
  hero_asset_id  TEXT,
  faq_ids        TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS faqs (
  id          TEXT PRIMARY KEY,
  scope       TEXT NOT NULL,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id                    TEXT PRIMARY KEY,
  name                  TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  email                 TEXT,
  need                  TEXT NOT NULL,
  service               TEXT NOT NULL,
  preferred_channel     TEXT NOT NULL,
  consent               INTEGER NOT NULL DEFAULT 0,
  source_route          TEXT NOT NULL,
  utm                   TEXT,
  referrer              TEXT,
  created_at            TEXT NOT NULL,
  external_sync_status  TEXT NOT NULL DEFAULT 'pending',
  external_id           TEXT,
  status                TEXT NOT NULL DEFAULT 'new',
  note                  TEXT
);
CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx  ON leads (status);

CREATE TABLE IF NOT EXISTS subscribers (
  id                    TEXT PRIMARY KEY,
  email                 TEXT NOT NULL UNIQUE,
  consent               INTEGER NOT NULL DEFAULT 0,
  source_route          TEXT,
  created_at            TEXT NOT NULL,
  external_sync_status  TEXT NOT NULL DEFAULT 'pending',
  external_id           TEXT
);

CREATE TABLE IF NOT EXISTS assets (
  id           TEXT PRIMARY KEY,
  path         TEXT NOT NULL,
  width        INTEGER,
  height       INTEGER,
  has_alpha    INTEGER,
  kind         TEXT,
  alt          TEXT,
  sha256       TEXT,
  uploaded_at  TEXT NOT NULL
);

-- ── PHUONG_AN §7.6 ────────────────────────────────────────────────────────────────────────
--
-- Bốn cột 'published' / 'claim_state' / 'verified_at' / 'disclosure' lặp lại ở mọi bảng dưới
-- đây một cách có chủ ý. Chúng phản chiếu đúng kiểu 'TruthState' trong src/lib/content-truth.ts,
-- nên một dòng dữ liệu tự mang theo trạng thái sự thật của nó thay vì phải tra ở nơi khác.
--
-- Vì sao không dùng một cột boolean 'demo_only' như các bảng cũ: boolean chỉ trả lời được
-- "có phải demo không", trong khi câu hỏi thực sự có bốn đáp án — đã xác minh, do hệ thống suy
-- ra, minh hoạ (được hiện NẾU có disclosure), và chưa xác minh (không bao giờ được hiện). Chính
-- vì thiếu bậc thứ tư mà bốn thẻ dịch vụ số vẫn hiện giá minh hoạ trên production: dữ liệu tự
-- khai 'demoOnly: true' nhưng không có gì trong hệ thống coi cờ đó là lệnh cấm hiển thị.
--
-- 'claim_state' KHÔNG có DEFAULT. Chèn một dòng mà quên khai trạng thái sự thật của nó phải là
-- một lỗi ngay lúc ghi, không phải một mặc định im lặng — mặc định nào cũng sai: 'verified' thì
-- xuất bản thứ chưa ai kiểm, 'unverified' thì giấu mất thứ đã kiểm rồi.

CREATE TABLE IF NOT EXISTS pricing_packages (
  id             TEXT PRIMARY KEY,
  group_id       TEXT NOT NULL,
  plan           TEXT NOT NULL,
  price_label    TEXT NOT NULL,
  price_vnd      INTEGER,
  description    TEXT,
  features       TEXT,
  featured       INTEGER NOT NULL DEFAULT 0,
  published      INTEGER NOT NULL DEFAULT 0,
  claim_state    TEXT NOT NULL,
  verified_at    TEXT,
  disclosure     TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS pricing_packages_group_idx ON pricing_packages (group_id, sort_order);

CREATE TABLE IF NOT EXISTS testimonials (
  id             TEXT PRIMARY KEY,
  author_name    TEXT NOT NULL,
  author_role    TEXT,
  company        TEXT,
  quote          TEXT NOT NULL,
  service_slug   TEXT,
  avatar_asset_id TEXT,
  published      INTEGER NOT NULL DEFAULT 0,
  claim_state    TEXT NOT NULL,
  verified_at    TEXT,
  disclosure     TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS metrics (
  id             TEXT PRIMARY KEY,
  scope          TEXT NOT NULL,
  label          TEXT NOT NULL,
  value_label    TEXT NOT NULL,
  -- Cách con số được tạo ra. 'measured' = đo từ hệ thống thật; 'counted' = đếm tay từ hồ sơ;
  -- 'estimated' = ước lượng. Không có giá trị nào nghĩa là "nghe hợp lý", và một metric
  -- 'estimated' thì 'claim_state' không bao giờ được là 'verified'.
  method         TEXT,
  measured_at    TEXT,
  published      INTEGER NOT NULL DEFAULT 0,
  claim_state    TEXT NOT NULL,
  verified_at    TEXT,
  disclosure     TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS trust_marks (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  logo_asset_id  TEXT,
  -- Bảng phân loại quan hệ. Đây là cột quan trọng nhất của bảng này: dán logo Meta/Google lên
  -- trang rồi để khách tự hiểu là "đối tác" là loại tuyên bố sai vừa mất uy tín vừa có rủi ro
  -- pháp lý. 'platform-used' = nền tảng chúng ta thao tác trên đó (mặc định đúng cho gần như
  -- mọi logo), 'certified-partner' = có chứng nhận đối tác thật, 'client' = khách hàng đã ký,
  -- 'media-mention' = báo chí có nhắc tới. Ba giá trị sau BẮT BUỘC có bằng chứng trong
  -- verification_evidence.
  relationship   TEXT NOT NULL,
  evidence_id    TEXT,
  published      INTEGER NOT NULL DEFAULT 0,
  claim_state    TEXT NOT NULL,
  verified_at    TEXT,
  disclosure     TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS digital_offers (
  id             TEXT PRIMARY KEY,
  brand          TEXT NOT NULL,
  name           TEXT NOT NULL,
  price_label    TEXT NOT NULL,
  price_vnd      INTEGER,
  features       TEXT,
  published      INTEGER NOT NULL DEFAULT 0,
  claim_state    TEXT NOT NULL,
  verified_at    TEXT,
  disclosure     TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

-- Bằng chứng đứng sau một tuyên bố. Tách thành bảng riêng chứ không nhét vào một cột ghi chú:
-- "đã xác minh" mà không nói được xác minh bằng gì thì không khác gì chưa xác minh, và người
-- xác minh sáu tháng sau sẽ không nhớ nổi hôm đó họ đã nhìn thấy cái gì.
CREATE TABLE IF NOT EXISTS verification_evidence (
  id             TEXT PRIMARY KEY,
  -- Dòng dữ liệu được chứng minh: ('testimonial','t_123'), ('metric','m_7')...
  subject_type   TEXT NOT NULL,
  subject_id     TEXT NOT NULL,
  -- 'contract' | 'invoice' | 'screenshot' | 'analytics-export' | 'written-consent' | 'other'
  kind           TEXT NOT NULL,
  note           TEXT,
  asset_id       TEXT,
  source_url     TEXT,
  verified_by    TEXT NOT NULL,
  verified_at    TEXT NOT NULL,
  created_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS verification_evidence_subject_idx
  ON verification_evidence (subject_type, subject_id);

CREATE TABLE IF NOT EXISTS admin_users (
  id             TEXT PRIMARY KEY,
  email          TEXT NOT NULL UNIQUE,
  password_hash  TEXT NOT NULL,
  role           TEXT NOT NULL DEFAULT 'owner',
  created_at     TEXT NOT NULL,
  last_login_at  TEXT
);
`;

/** CREATE TABLE IF NOT EXISTS never alters a table that already exists, so a column added after
 * the first run would silently be missing on any database created before it. Postgres does
 * support `ADD COLUMN IF NOT EXISTS` directly, but the check is kept in JS (against
 * information_schema, see db/client.ts) rather than relied on, so the same list works
 * unchanged if the engine ever changes again. */
export const ADDED_COLUMNS: { table: string; column: string; ddl: string }[] = [
  { table: "projects", column: "demo_url", ddl: "ALTER TABLE projects ADD COLUMN demo_url TEXT" },
  { table: "articles", column: "cover_asset_id", ddl: "ALTER TABLE articles ADD COLUMN cover_asset_id TEXT" },
  { table: "articles", column: "seo_title", ddl: "ALTER TABLE articles ADD COLUMN seo_title TEXT" },
  { table: "articles", column: "seo_description", ddl: "ALTER TABLE articles ADD COLUMN seo_description TEXT" },

  // PHUONG_AN §7.6. Bảng `services` có từ trước khi mô hình sự thật tồn tại, nên nó chỉ có
  // `sort_order` mà không có cách nào ghi "mục này đã publish chưa" hay "ai xác minh, ngày nào".
  // Thêm mới thay vì tạo bảng khác: dữ liệu dịch vụ đã nằm ở đây rồi, và hai bảng dịch vụ song
  // song là đúng thứ vừa gây ra rắc rối cho menu điều hướng.
  //
  // `claim_state` ở đây PHẢI có DEFAULT (khác các bảng mới ở trên) vì ALTER TABLE ADD COLUMN
  // trên bảng đã có dữ liệu cần một giá trị cho các dòng cũ. 'unverified' là mặc định an toàn
  // duy nhất: dòng cũ bị ẩn cho tới khi có người thực sự xác minh, chứ không phải được xuất bản
  // vì im lặng.
  { table: "services", column: "published", ddl: "ALTER TABLE services ADD COLUMN published INTEGER NOT NULL DEFAULT 0" },
  { table: "services", column: "claim_state", ddl: "ALTER TABLE services ADD COLUMN claim_state TEXT NOT NULL DEFAULT 'unverified'" },
  { table: "services", column: "verified_at", ddl: "ALTER TABLE services ADD COLUMN verified_at TEXT" },
  { table: "services", column: "disclosure", ddl: "ALTER TABLE services ADD COLUMN disclosure TEXT" },
  { table: "services", column: "group_id", ddl: "ALTER TABLE services ADD COLUMN group_id TEXT" },
  { table: "services", column: "policy_class", ddl: "ALTER TABLE services ADD COLUMN policy_class TEXT NOT NULL DEFAULT 'conditional'" },
  { table: "services", column: "nav_hidden", ddl: "ALTER TABLE services ADD COLUMN nav_hidden INTEGER NOT NULL DEFAULT 0" },
  { table: "services", column: "featured_on_home", ddl: "ALTER TABLE services ADD COLUMN featured_on_home INTEGER NOT NULL DEFAULT 0" },
];
