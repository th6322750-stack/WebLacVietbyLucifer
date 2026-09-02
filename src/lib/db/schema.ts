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
];
