import { neon } from "@neondatabase/serverless";
import { SCHEMA, ADDED_COLUMNS } from "./schema";

/** Postgres via Neon's serverless driver — one dependency, chosen for Vercel specifically.
 *
 * Was `node:sqlite` writing to a local file. Vercel's filesystem is read-only at runtime, so
 * that engine cannot survive deployment there — see the "Vercel SQLite writes fail" incident.
 * Neon's driver talks HTTP rather than holding a TCP connection open, which is what makes it
 * work from a serverless function that may cold-start on every request; a normal `pg` pool
 * would exhaust Postgres' connection limit under Vercel's concurrency model.
 *
 * The query helpers below (`all`, `one`, `run`) keep the same shape the SQLite call sites used
 * — `.run()` still resolves to `{ changes }`, mirroring `DatabaseSync`'s result — so porting a
 * repository file is a mechanical rewrite of placeholders and adding `await`, not a redesign.
 */

function connectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is missing. Set it in .env.local (Neon project → Connection string) and in " +
        "the Vercel project's environment variables — the app refuses to guess a database.",
    );
  }
  return url;
}

// fullResults: true so every call returns { rows, rowCount, command } instead of a bare row
// array — rowCount is what lets `run()` below report how many rows an UPDATE/DELETE touched,
// the same thing DatabaseSync's `.run().changes` reported.
let sql: ReturnType<typeof neon<false, true>> | null = null;

function client() {
  if (sql) return sql;
  sql = neon(connectionString(), { fullResults: true });
  return sql;
}

let schemaReady: Promise<void> | null = null;

/** Applies the schema once per server instance, not once per request.
 *
 * `CREATE TABLE IF NOT EXISTS` is idempotent, so calling this on every cold start costs one
 * round trip and nothing on a warm one — this guard exists to skip that round trip while the
 * instance is warm, not for correctness. */
async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = client();
      // Neon's serverless driver runs one statement per call; SCHEMA is many `CREATE TABLE`
      // statements in one string, so it is split and applied one at a time.
      for (const stmt of SCHEMA.split(";").map((s) => s.trim()).filter(Boolean)) {
        await db.query(stmt);
      }
      for (const c of ADDED_COLUMNS) {
        const { rows: cols } = await db.query(
          "SELECT column_name FROM information_schema.columns WHERE table_name = $1",
          [c.table],
        );
        if (!(cols as { column_name: string }[]).some((x) => x.column_name === c.column)) {
          await db.query(c.ddl);
        }
      }
    })();
  }
  return schemaReady;
}

/** Rewrites `?` placeholders to Postgres' `$1, $2, ...` in call order.
 *
 * Kept so every repository file could carry over its existing SQL strings unchanged — the
 * SQLite dialect and the Postgres one agree on everything else used here (CREATE TABLE IF NOT
 * EXISTS, REFERENCES, partial unique indexes, ON CONFLICT). Placeholder syntax was the one real
 * difference, so it is handled centrally instead of by hand in thirty call sites. */
function toPgPlaceholders(text: string): string {
  let n = 0;
  return text.replace(/\?/g, () => `$${++n}`);
}

export async function all<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  await ensureSchema();
  const { rows } = await client().query(toPgPlaceholders(text), params);
  return rows as T[];
}

export async function one<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T | null> {
  const rows = await all<T>(text, params);
  return rows[0] ?? null;
}

/** Mirrors `DatabaseSync.prepare().run()`'s result shape, so a repository call site that used
 * to read `.changes` needs no change beyond `await`. */
export async function run(text: string, params: unknown[] = []): Promise<{ changes: number }> {
  await ensureSchema();
  const { rowCount } = await client().query(toPgPlaceholders(text), params);
  return { changes: rowCount ?? 0 };
}

/** Arrays and nested objects are stored as JSON in TEXT columns. At this scale — a few dozen
 * content rows — normalising them into child tables would add joins and migrations for no
 * gain. Unchanged from the SQLite version; this was never engine-specific. */
export function toJson(v: unknown): string | null {
  return v === undefined || v === null ? null : JSON.stringify(v);
}

export function fromJson<T>(v: unknown, fallback: T): T {
  if (typeof v !== "string" || v.length === 0) return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

/** Booleans are still stored as 0/1 INTEGER, matching the SQLite schema exactly, rather than
 * switched to Postgres' native BOOLEAN. Every repository call site already does
 * `fromBool(x)`/`toBool(x)` at the JS boundary, so keeping the wire format identical means the
 * schema and every INSERT/UPDATE statement need zero changes for this — only the placeholder
 * syntax and sync-to-async conversion do. */
export const toBool = (v: unknown): boolean => v === 1 || v === true || v === "1";
export const fromBool = (v: boolean | undefined): number => (v ? 1 : 0);
