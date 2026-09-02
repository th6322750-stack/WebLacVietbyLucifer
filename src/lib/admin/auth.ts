import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/** Session auth with no new dependency.
 *
 * A signed cookie rather than a stored session: the value is `expiry.signature`, where the
 * signature is HMAC-SHA256 over the expiry using ADMIN_SESSION_SECRET. Nothing to persist,
 * nothing to clean up, and a tampered cookie fails the HMAC.
 *
 * Lucifer's plan is one owner now, customer accounts later (.webby/ADMIN_PLAN.md §9). When that
 * lands this becomes a lookup against admin_users, which is why the table already exists —
 * the cookie will carry a user id instead of just an expiry.
 *
 * DEVELOPMENT BYPASS: signing in is skipped while running locally, at Lucifer's request. It is
 * keyed to NODE_ENV rather than an env flag ON PURPOSE — a flag can be set on the server by
 * accident and would leave a production admin wide open, whereas `next build` always sets
 * production and there is no switch to get wrong. In production the password is always required.
 */

/** True only under `next dev`. Never true in a production build. */
export const AUTH_BYPASSED = process.env.NODE_ENV !== "production";

export const SESSION_COOKIE = "lv_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short. Set it in .env.local — the admin refuses " +
        "to sign sessions with a weak or absent key rather than pretending to be protected.",
    );
  }
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Constant-time compare so a wrong password cannot be narrowed down by timing. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate, expected);
}

export function issueToken(): string {
  const expiry = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${expiry}.${sign(expiry)}`;
}

export function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  if (!safeEqual(signature, sign(expiry))) return false;
  return Number(expiry) > Date.now();
}

export async function isSignedIn(): Promise<boolean> {
  if (AUTH_BYPASSED) return true;
  const jar = await cookies();
  try {
    return isTokenValid(jar.get(SESSION_COOKIE)?.value);
  } catch {
    // A missing secret must read as "not signed in", never as "signed in".
    return false;
  }
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
  secure: process.env.NODE_ENV === "production",
};

export function suggestSecret(): string {
  return randomBytes(32).toString("hex");
}
