/** Central production-visibility policy — PHUONG_AN §7.1.
 *
 * Before this file, every page decided for itself whether a demo figure, an unverified
 * testimonial or a placeholder price was allowed on screen. That worked while there were three
 * routes and one person editing them; it does not survive a service registry that grows by
 * data, because the next route someone adds is the one that forgets the conditional.
 *
 * Four states, not two. The old boolean `demoOnly` could not tell apart "a number the system
 * itself can count" from "a number nobody has verified", and both ended up hedged with the same
 * disclaimer even though only one of them is a claim at all.
 */

export type ClaimState =
  /** Owner-confirmed against real evidence. Renders as fact. */
  | "verified"
  /** Derived from data the system itself holds — a count of published services, say. Not a
   *  marketing claim, so it needs no evidence and no disclosure. */
  | "system-derived"
  /** Illustrative content that is honest about being illustrative. Renders ONLY where the
   *  surrounding UI says so plainly — design concepts are the intended case. */
  | "demo"
  /** A claim about the world that nobody has backed: customer counts, satisfaction rates,
   *  testimonials, partner relationships. Never renders in production. */
  | "unverified";

export type TruthState = {
  published: boolean;
  claimState: ClaimState;
  /** ISO date. Required before a commercial claim may be treated as verified. */
  verifiedAt?: string | null;
  /** The sentence shown alongside `demo` content. Without one, demo content stays hidden. */
  disclosure?: string;
};

/** Anything carrying a truth state. Content modules spread `TruthState` into their own types. */
export type TruthBearing = TruthState;

/**
 * The single question every render path asks: may this appear to a real visitor?
 *
 * `preview` is for admin/QA surfaces that deliberately show unpublished and unverified content
 * so it can be reviewed before it goes live. It must never be reachable from a public route.
 */
export function isProductionVisible(value: TruthState, preview = false): boolean {
  if (!value.published) return false;
  if (preview) return true;

  switch (value.claimState) {
    case "verified":
    case "system-derived":
      return true;
    case "demo":
      // Demo content earns its place only by admitting what it is. A concept gallery with a
      // visible "Concept minh hoạ" line is fine; the same data with the disclosure dropped is
      // exactly how illustrative work turns into an implied client list.
      return Boolean(value.disclosure && value.disclosure.trim().length > 0);
    case "unverified":
      return false;
  }
}

/**
 * A stricter gate for claims that assert something about the outside world — that a named
 * person said this, that a company is a client, that an account is officially authorised, that
 * a price is real. `published` and a non-demo state are not enough here: there must be a
 * recorded verification date, because these are the claims that damage trust when wrong.
 */
export function isVerifiedCommercialClaim(value: TruthState): boolean {
  return value.published && value.claimState === "verified" && Boolean(value.verifiedAt);
}

/** Filter helper so call sites read as intent rather than as a predicate. */
export function productionVisible<T extends TruthState>(items: readonly T[], preview = false): T[] {
  return items.filter((item) => isProductionVisible(item, preview));
}

/** Filter helper for commercial claims — testimonials, trust marks, verified offers. */
export function verifiedOnly<T extends TruthState>(items: readonly T[]): T[] {
  return items.filter(isVerifiedCommercialClaim);
}

/** Markup attribute so tests can assert what shipped, the way `data-demo-only` already does. */
export function claimAttrs(value: TruthState): {
  "data-claim-state": ClaimState;
  "data-demo-only": "true" | "false";
} {
  return {
    "data-claim-state": value.claimState,
    // `data-demo-only` là marker cũ, có trước mô hình bốn trạng thái. Nó được GIỮ LẠI và suy ra
    // từ `claimState` chứ không bị bỏ, vì các bài kiểm thử và hợp đồng .webby đang đọc nó — bỏ
    // đi là làm hỏng chính lớp bảo vệ đã bắt được vài lỗi thật. Nhưng nó không còn được viết
    // độc lập ở đâu nữa: một chỗ tính, mọi chỗ đọc, nên hai marker không thể mâu thuẫn.
    "data-demo-only": value.claimState === "demo" ? "true" : "false",
  };
}

/** Dạng ngắn cho markup chỉ cần khai trạng thái, không có sẵn một `TruthState` đầy đủ. */
export function claimAttrsFor(state: ClaimState) {
  return claimAttrs({ published: true, claimState: state });
}

/** Shorthand for content that is simply true and needs no ceremony. */
export const SYSTEM_TRUTH: TruthState = { published: true, claimState: "system-derived" };
