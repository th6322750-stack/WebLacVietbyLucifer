import { randomUUID } from "node:crypto";
import { all, run, toBool, fromBool } from "../client";
import type { Lead, LeadInput, PreferredChannel } from "@/lib/types";

/** Every SQL statement touching leads lives here. Swapping the query engine means rewriting
 * this file and nothing else — proven true once already, moving from node:sqlite to Postgres.
 *
 * `status` and `note` are admin-only columns; they are not part of the public Lead contract,
 * so they are added on top rather than pushed into src/lib/types.ts, which the other agent's
 * public-site work also reads. */

export type LeadStatus = "new" | "contacted" | "won" | "lost";

export type LeadRow = Lead & { status: LeadStatus; note: string | null };

type DbRow = Record<string, unknown>;

function hydrate(r: DbRow): LeadRow {
  return {
    id: String(r.id),
    name: String(r.name),
    phone: String(r.phone),
    email: (r.email as string | null) ?? undefined,
    need: String(r.need),
    service: String(r.service),
    preferredChannel: r.preferred_channel as PreferredChannel,
    consent: toBool(r.consent),
    sourceRoute: String(r.source_route),
    utm: (r.utm as string | null) ?? undefined,
    referrer: (r.referrer as string | null) ?? undefined,
    createdAt: String(r.created_at),
    external_sync_status: r.external_sync_status as Lead["external_sync_status"],
    external_id: (r.external_id as string | null) ?? null,
    status: (r.status as LeadStatus) ?? "new",
    note: (r.note as string | null) ?? null,
  };
}

export async function insertLead(input: LeadInput): Promise<LeadRow> {
  const lead: LeadRow = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    // The row IS the record now, so it is stored the moment this returns. "synced" is the
    // honest value; the old local-file sink could only ever claim "pending".
    external_sync_status: "synced",
    external_id: null,
    status: "new",
    note: null,
  };
  await run(
    `INSERT INTO leads (id,name,phone,email,need,service,preferred_channel,consent,
       source_route,utm,referrer,created_at,external_sync_status,external_id,status,note)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,NULL,'new',NULL)`,
    [
      lead.id, lead.name, lead.phone, lead.email ?? null, lead.need, lead.service,
      lead.preferredChannel, fromBool(lead.consent), lead.sourceRoute, lead.utm ?? null,
      lead.referrer ?? null, lead.createdAt, lead.external_sync_status,
    ],
  );
  return lead;
}

export async function listLeads(opts: { status?: LeadStatus; q?: string; limit?: number } = {}): Promise<LeadRow[]> {
  const where: string[] = [];
  const args: unknown[] = [];
  if (opts.status) {
    where.push("status = ?");
    args.push(opts.status);
  }
  if (opts.q) {
    where.push("(name ILIKE ? OR phone ILIKE ? OR email ILIKE ? OR need ILIKE ?)");
    const like = `%${opts.q}%`;
    args.push(like, like, like, like);
  }
  args.push(opts.limit ?? 200);
  const sql =
    `SELECT * FROM leads ${where.length ? `WHERE ${where.join(" AND ")}` : ""}` +
    " ORDER BY created_at DESC LIMIT ?";
  return (await all<DbRow>(sql, args)).map(hydrate);
}

export async function countLeadsByStatus(): Promise<Record<LeadStatus | "total", number>> {
  const rows = await all<{ status: LeadStatus; n: number }>(
    "SELECT status, COUNT(*) AS n FROM leads GROUP BY status",
  );
  const out: Record<LeadStatus | "total", number> = {
    new: 0, contacted: 0, won: 0, lost: 0, total: 0,
  };
  for (const r of rows) {
    out[r.status] = Number(r.n);
    out.total += Number(r.n);
  }
  return out;
}

export async function updateLead(id: string, patch: { status?: LeadStatus; note?: string }): Promise<boolean> {
  const sets: string[] = [];
  const args: unknown[] = [];
  if (patch.status !== undefined) { sets.push("status = ?"); args.push(patch.status); }
  if (patch.note !== undefined) { sets.push("note = ?"); args.push(patch.note); }
  if (!sets.length) return false;
  args.push(id);
  const r = await run(`UPDATE leads SET ${sets.join(", ")} WHERE id = ?`, args);
  return r.changes > 0;
}
