import { all, one, run, toJson, fromJson, toBool, fromBool } from "../client";
import type { ClaimState, TruthState } from "@/lib/content-truth";
import { isProductionVisible } from "@/lib/content-truth";

/** Repository cho các bảng mang trạng thái sự thật — PHUONG_AN §7.6.
 *
 * Điểm chung của năm bảng dưới đây không phải hình dạng dữ liệu mà là LUẬT: không dòng nào được
 * hiện ra ngoài nếu chưa qua `isProductionVisible`. Vì thế mọi hàm đọc công khai ở đây đều lọc
 * sẵn, và cách duy nhất để lấy dữ liệu chưa duyệt là truyền `includeUnpublished` một cách có ý
 * thức — dùng cho admin.
 *
 * Nói cách khác: quên gọi bộ lọc không thể là nguyên nhân rò rỉ nữa, vì bộ lọc nằm trong hàm
 * đọc chứ không nằm ở phía người gọi. Đó chính là cách `demoOnly` đã thất bại — cờ thì có,
 * nhưng việc kiểm tra cờ lại là trách nhiệm của từng component, và một component quên là đủ.
 */

const CLAIM_STATES: readonly ClaimState[] = ["verified", "system-derived", "demo", "unverified"];

/** Đọc `claim_state` từ DB. Giá trị lạ (dữ liệu cũ, sửa tay, migration hỏng) bị hạ xuống
 *  'unverified' thay vì được tin — hướng an toàn duy nhất là ẩn đi. */
export function parseClaimState(value: unknown): ClaimState {
  const s = String(value ?? "");
  return (CLAIM_STATES as readonly string[]).includes(s) ? (s as ClaimState) : "unverified";
}

type DbRow = Record<string, unknown>;

function hydrateTruth(r: DbRow): TruthState {
  return {
    published: toBool(r.published),
    claimState: parseClaimState(r.claim_state),
    verifiedAt: (r.verified_at as string | null) ?? null,
    disclosure: (r.disclosure as string | null) ?? undefined,
  };
}

/** Bốn tham số truth theo đúng thứ tự các câu INSERT/UPDATE bên dưới dùng. */
function truthParams(t: TruthState): unknown[] {
  return [fromBool(t.published), t.claimState, t.verifiedAt ?? null, t.disclosure ?? null];
}

// ── pricing_packages ────────────────────────────────────────────────────────────────────────

export type PricingPackageRow = TruthState & {
  id: string;
  groupId: string;
  plan: string;
  priceLabel: string;
  priceVnd?: number;
  description?: string;
  features: string[];
  featured: boolean;
  sortOrder: number;
};

function hydratePricing(r: DbRow): PricingPackageRow {
  return {
    ...hydrateTruth(r),
    id: String(r.id),
    groupId: String(r.group_id),
    plan: String(r.plan),
    priceLabel: String(r.price_label),
    priceVnd: r.price_vnd == null ? undefined : Number(r.price_vnd),
    description: (r.description as string | null) ?? undefined,
    features: fromJson<string[]>(r.features, []),
    featured: toBool(r.featured),
    sortOrder: Number(r.sort_order),
  };
}

export async function listPricingPackages(
  opts: { groupId?: string; includeUnpublished?: boolean } = {},
): Promise<PricingPackageRow[]> {
  const where: string[] = [];
  const params: unknown[] = [];
  if (opts.groupId) {
    params.push(opts.groupId);
    where.push(`group_id = $${params.length}`);
  }
  const sql =
    "SELECT * FROM pricing_packages" +
    (where.length ? ` WHERE ${where.join(" AND ")}` : "") +
    " ORDER BY sort_order ASC, created_at ASC";
  const rows = (await all<DbRow>(sql, params)).map(hydratePricing);
  return opts.includeUnpublished ? rows : rows.filter((r) => isProductionVisible(r));
}

export async function upsertPricingPackage(row: PricingPackageRow): Promise<void> {
  const now = new Date().toISOString();
  await run(
    `INSERT INTO pricing_packages
      (id,group_id,plan,price_label,price_vnd,description,features,featured,
       published,claim_state,verified_at,disclosure,sort_order,created_at,updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     ON CONFLICT (id) DO UPDATE SET
       group_id=$2, plan=$3, price_label=$4, price_vnd=$5, description=$6, features=$7,
       featured=$8, published=$9, claim_state=$10, verified_at=$11, disclosure=$12,
       sort_order=$13, updated_at=$15`,
    [
      row.id, row.groupId, row.plan, row.priceLabel, row.priceVnd ?? null,
      row.description ?? null, toJson(row.features), fromBool(row.featured),
      ...truthParams(row), row.sortOrder, now, now,
    ],
  );
}

// ── testimonials ────────────────────────────────────────────────────────────────────────────

export type TestimonialRow = TruthState & {
  id: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  quote: string;
  serviceSlug?: string;
  avatarAssetId?: string;
  sortOrder: number;
};

function hydrateTestimonial(r: DbRow): TestimonialRow {
  return {
    ...hydrateTruth(r),
    id: String(r.id),
    authorName: String(r.author_name),
    authorRole: (r.author_role as string | null) ?? undefined,
    company: (r.company as string | null) ?? undefined,
    quote: String(r.quote),
    serviceSlug: (r.service_slug as string | null) ?? undefined,
    avatarAssetId: (r.avatar_asset_id as string | null) ?? undefined,
    sortOrder: Number(r.sort_order),
  };
}

export async function listTestimonials(
  opts: { includeUnpublished?: boolean } = {},
): Promise<TestimonialRow[]> {
  const rows = (
    await all<DbRow>("SELECT * FROM testimonials ORDER BY sort_order ASC, created_at ASC")
  ).map(hydrateTestimonial);
  if (opts.includeUnpublished) return rows;
  // Testimonial là lời của một người thật, gắn với tên và nơi làm việc của họ. Ngoài luật
  // hiển thị chung, nó còn cần bằng chứng đã ghi nhận — đăng một lời khen "minh hoạ" kèm tên
  // người là bịa ra phát ngôn của người khác, không phải là trưng bày thiết kế.
  const visible = rows.filter((r) => isProductionVisible(r) && r.claimState === "verified");
  return withEvidence("testimonial", visible);
}

// ── metrics ─────────────────────────────────────────────────────────────────────────────────

export type MetricMethod = "measured" | "counted" | "estimated";

export type MetricRow = TruthState & {
  id: string;
  scope: string;
  label: string;
  valueLabel: string;
  method?: MetricMethod;
  measuredAt?: string;
  sortOrder: number;
};

function hydrateMetric(r: DbRow): MetricRow {
  const method = String(r.method ?? "");
  return {
    ...hydrateTruth(r),
    id: String(r.id),
    scope: String(r.scope),
    label: String(r.label),
    valueLabel: String(r.value_label),
    method: (["measured", "counted", "estimated"] as const).includes(method as MetricMethod)
      ? (method as MetricMethod)
      : undefined,
    measuredAt: (r.measured_at as string | null) ?? undefined,
    sortOrder: Number(r.sort_order),
  };
}

export async function listMetrics(
  opts: { scope?: string; includeUnpublished?: boolean } = {},
): Promise<MetricRow[]> {
  const params: unknown[] = [];
  let sql = "SELECT * FROM metrics";
  if (opts.scope) {
    params.push(opts.scope);
    sql += ` WHERE scope = $${params.length}`;
  }
  sql += " ORDER BY sort_order ASC, created_at ASC";
  const rows = (await all<DbRow>(sql, params)).map(hydrateMetric);
  if (opts.includeUnpublished) return rows;
  // Một con số 'estimated' không bao giờ được coi là đã xác minh, dù ai đã bấm nút duyệt. Đây là
  // ràng buộc trong code chứ không phải một quy ước: "200+ khách hàng" hiện trên production suốt
  // nhiều tháng chính là vì quy ước bằng lời không chặn được gì.
  return rows.filter(
    (r) => isProductionVisible(r) && !(r.claimState === "verified" && r.method === "estimated"),
  );
}

// ── trust_marks ─────────────────────────────────────────────────────────────────────────────

/** Quan hệ giữa Lạc Việt và tổ chức trên logo. Xem chú thích cột `relationship` trong schema. */
export type TrustRelationship = "platform-used" | "certified-partner" | "client" | "media-mention";

/** Ba loại quan hệ này tuyên bố một mối liên hệ hai chiều, nên phải có bằng chứng lưu lại mới
 *  được hiện. 'platform-used' chỉ nói "chúng tôi làm việc trên nền tảng này" nên không cần. */
export const RELATIONSHIPS_NEEDING_EVIDENCE: readonly TrustRelationship[] = [
  "certified-partner",
  "client",
  "media-mention",
];

export type TrustMarkRow = TruthState & {
  id: string;
  name: string;
  logoAssetId?: string;
  relationship: TrustRelationship;
  evidenceId?: string;
  sortOrder: number;
};

function hydrateTrustMark(r: DbRow): TrustMarkRow {
  const rel = String(r.relationship);
  return {
    ...hydrateTruth(r),
    id: String(r.id),
    name: String(r.name),
    logoAssetId: (r.logo_asset_id as string | null) ?? undefined,
    // Giá trị lạ được hạ xuống 'platform-used' — tuyên bố yếu nhất trong bảng phân loại.
    relationship: (
      ["platform-used", "certified-partner", "client", "media-mention"] as const
    ).includes(rel as TrustRelationship)
      ? (rel as TrustRelationship)
      : "platform-used",
    evidenceId: (r.evidence_id as string | null) ?? undefined,
    sortOrder: Number(r.sort_order),
  };
}

export async function listTrustMarks(
  opts: { includeUnpublished?: boolean } = {},
): Promise<TrustMarkRow[]> {
  const rows = (
    await all<DbRow>("SELECT * FROM trust_marks ORDER BY sort_order ASC, created_at ASC")
  ).map(hydrateTrustMark);
  if (opts.includeUnpublished) return rows;
  const visible = rows.filter((r) => isProductionVisible(r));
  const needsEvidence = visible.filter((r) =>
    RELATIONSHIPS_NEEDING_EVIDENCE.includes(r.relationship),
  );
  const ok = visible.filter((r) => !RELATIONSHIPS_NEEDING_EVIDENCE.includes(r.relationship));
  return [...ok, ...(await withEvidence("trust_mark", needsEvidence))].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

// ── digital_offers ──────────────────────────────────────────────────────────────────────────

export type DigitalOfferRow = TruthState & {
  id: string;
  brand: string;
  name: string;
  priceLabel: string;
  priceVnd?: number;
  features: string[];
  sortOrder: number;
};

function hydrateDigitalOffer(r: DbRow): DigitalOfferRow {
  return {
    ...hydrateTruth(r),
    id: String(r.id),
    brand: String(r.brand),
    name: String(r.name),
    priceLabel: String(r.price_label),
    priceVnd: r.price_vnd == null ? undefined : Number(r.price_vnd),
    features: fromJson<string[]>(r.features, []),
    sortOrder: Number(r.sort_order),
  };
}

export async function listDigitalOffers(
  opts: { includeUnpublished?: boolean } = {},
): Promise<DigitalOfferRow[]> {
  const rows = (
    await all<DbRow>("SELECT * FROM digital_offers ORDER BY sort_order ASC, created_at ASC")
  ).map(hydrateDigitalOffer);
  return opts.includeUnpublished ? rows : rows.filter((r) => isProductionVisible(r));
}

// ── verification_evidence ───────────────────────────────────────────────────────────────────

export type EvidenceKind =
  | "contract"
  | "invoice"
  | "screenshot"
  | "analytics-export"
  | "written-consent"
  | "other";

export type EvidenceSubjectType = "testimonial" | "metric" | "trust_mark" | "service" | "pricing";

export type VerificationEvidence = {
  id: string;
  subjectType: EvidenceSubjectType;
  subjectId: string;
  kind: EvidenceKind;
  note?: string;
  assetId?: string;
  sourceUrl?: string;
  verifiedBy: string;
  verifiedAt: string;
};

function hydrateEvidence(r: DbRow): VerificationEvidence {
  return {
    id: String(r.id),
    subjectType: String(r.subject_type) as EvidenceSubjectType,
    subjectId: String(r.subject_id),
    kind: String(r.kind) as EvidenceKind,
    note: (r.note as string | null) ?? undefined,
    assetId: (r.asset_id as string | null) ?? undefined,
    sourceUrl: (r.source_url as string | null) ?? undefined,
    verifiedBy: String(r.verified_by),
    verifiedAt: String(r.verified_at),
  };
}

export async function listEvidence(
  subjectType: EvidenceSubjectType,
  subjectId: string,
): Promise<VerificationEvidence[]> {
  return (
    await all<DbRow>(
      "SELECT * FROM verification_evidence WHERE subject_type = $1 AND subject_id = $2 ORDER BY verified_at DESC",
      [subjectType, subjectId],
    )
  ).map(hydrateEvidence);
}

export async function recordEvidence(evidence: VerificationEvidence): Promise<void> {
  await run(
    `INSERT INTO verification_evidence
      (id,subject_type,subject_id,kind,note,asset_id,source_url,verified_by,verified_at,created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     ON CONFLICT (id) DO NOTHING`,
    [
      evidence.id, evidence.subjectType, evidence.subjectId, evidence.kind,
      evidence.note ?? null, evidence.assetId ?? null, evidence.sourceUrl ?? null,
      evidence.verifiedBy, evidence.verifiedAt, new Date().toISOString(),
    ],
  );
}

/** Giữ lại những dòng thực sự có bằng chứng đã ghi nhận.
 *
 * Một truy vấn cho cả lô, không phải một truy vấn cho mỗi dòng: hàm này chạy trên đường render
 * trang công khai, và N+1 truy vấn ở đó là cách chắc chắn để biến một luật đúng thành một luật
 * mà người sau sẽ tìm cách vòng qua vì nó chậm. */
async function withEvidence<T extends { id: string }>(
  subjectType: EvidenceSubjectType,
  rows: T[],
): Promise<T[]> {
  if (rows.length === 0) return rows;
  const placeholders = rows.map((_, i) => `$${i + 2}`).join(",");
  const found = await all<{ subject_id: string }>(
    `SELECT DISTINCT subject_id FROM verification_evidence
      WHERE subject_type = $1 AND subject_id IN (${placeholders})`,
    [subjectType, ...rows.map((r) => r.id)],
  );
  const have = new Set(found.map((r) => String(r.subject_id)));
  return rows.filter((r) => have.has(r.id));
}

/** Duyệt xuất bản một dòng. Dùng chung cho mọi bảng ở trên nên luồng duyệt chỉ có MỘT chỗ để
 *  đọc và để sửa.
 *
 * Không nhận `claimState` từ phía gọi: trạng thái được suy ra từ việc CÓ hay KHÔNG có bằng
 * chứng. Nếu người duyệt tự chọn được "verified" thì cột đó chỉ ghi lại ý kiến của họ, chứ
 * không ghi lại sự thật nào — và đó đúng là thứ mô hình này sinh ra để thay thế. */
export async function publishWithVerification(opts: {
  table: "pricing_packages" | "testimonials" | "metrics" | "trust_marks" | "digital_offers";
  id: string;
  subjectType: EvidenceSubjectType;
  verifiedBy: string;
  evidence?: Omit<VerificationEvidence, "id" | "subjectType" | "subjectId" | "verifiedBy">;
  /** Bắt buộc khi không có bằng chứng: dòng vẫn hiện được nhưng phải nói rõ đây là minh hoạ. */
  disclosure?: string;
}): Promise<{ claimState: ClaimState; published: boolean }> {
  const now = new Date().toISOString();

  if (opts.evidence) {
    await recordEvidence({
      id: `ev_${opts.subjectType}_${opts.id}_${Date.now()}`,
      subjectType: opts.subjectType,
      subjectId: opts.id,
      verifiedBy: opts.verifiedBy,
      ...opts.evidence,
    });
  }

  const existing = await listEvidence(opts.subjectType, opts.id);
  const claimState: ClaimState = existing.length > 0 ? "verified" : opts.disclosure ? "demo" : "unverified";
  // Không bằng chứng và cũng không disclosure thì không có gì để hiện — ghi lại trạng thái
  // nhưng để `published` là false, thay vì xuất bản một tuyên bố trống.
  const published = claimState !== "unverified";

  await run(
    `UPDATE ${opts.table}
        SET published = $1, claim_state = $2, verified_at = $3, disclosure = $4, updated_at = $5
      WHERE id = $6`,
    [
      fromBool(published),
      claimState,
      claimState === "verified" ? now : null,
      opts.disclosure ?? null,
      now,
      opts.id,
    ],
  );

  return { claimState, published };
}

/** Gỡ xuất bản. Luôn dùng được, không cần điều kiện gì — rút một tuyên bố xuống phải dễ hơn
 *  đưa nó lên. */
export async function unpublish(
  table: "pricing_packages" | "testimonials" | "metrics" | "trust_marks" | "digital_offers",
  id: string,
): Promise<void> {
  await run(`UPDATE ${table} SET published = 0, updated_at = $1 WHERE id = $2`, [
    new Date().toISOString(),
    id,
  ]);
}

/** Đếm số dòng đang chờ duyệt ở mỗi bảng — dùng cho bảng điều khiển admin. */
export async function countPendingVerification(): Promise<Record<string, number>> {
  const tables = ["pricing_packages", "testimonials", "metrics", "trust_marks", "digital_offers"];
  const out: Record<string, number> = {};
  for (const t of tables) {
    const r = await one<{ n: string }>(
      `SELECT COUNT(*) AS n FROM ${t} WHERE claim_state IN ('unverified','demo') OR published = 0`,
    );
    out[t] = Number(r?.n ?? 0);
  }
  return out;
}
