import { randomUUID } from "node:crypto";
import { all, one, run, toBool, fromBool } from "../client";
import type { Subscriber, SubscriberInput } from "@/lib/types";

type DbRow = Record<string, unknown>;

function hydrate(r: DbRow): Subscriber {
  return {
    id: String(r.id),
    email: String(r.email),
    consent: toBool(r.consent),
    sourceRoute: (r.source_route as string | null) ?? undefined,
    createdAt: String(r.created_at),
    external_sync_status: r.external_sync_status as Subscriber["external_sync_status"],
    external_id: (r.external_id as string | null) ?? null,
  };
}

/** Idempotent on email, matching the behaviour the file sink had: subscribing twice returns the
 * original record rather than creating a duplicate or erroring. */
export async function insertSubscriber(input: SubscriberInput): Promise<Subscriber> {
  const existing = await one<DbRow>("SELECT * FROM subscribers WHERE lower(email) = lower(?)", [input.email]);
  if (existing) return hydrate(existing);

  const sub: Subscriber = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    external_sync_status: "synced",
    external_id: null,
  };
  await run(
    `INSERT INTO subscribers (id,email,consent,source_route,created_at,external_sync_status,external_id)
     VALUES (?,?,?,?,?,?,NULL)`,
    [sub.id, sub.email, fromBool(sub.consent), sub.sourceRoute ?? null, sub.createdAt, sub.external_sync_status],
  );
  return sub;
}

export async function listSubscribers(limit = 500): Promise<Subscriber[]> {
  const rows = await all<DbRow>("SELECT * FROM subscribers ORDER BY created_at DESC LIMIT ?", [limit]);
  return rows.map(hydrate);
}
