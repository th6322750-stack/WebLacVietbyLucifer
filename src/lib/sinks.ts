import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Lead, LeadInput, Subscriber, SubscriberInput } from "./types";

// .webby/DATA_BACKEND_CONTRACT.json: provider-agnostic sink abstractions. This default
// implementation persists to a local JSON file (gitignored, no secrets) so the public
// form contract (/api/leads, /api/newsletter) never has to change when a real CRM/email
// provider adapter is swapped in later — only these two functions change.
export interface LeadSink {
  save(input: LeadInput): Promise<Lead>;
}

export interface SubscriberSink {
  save(input: SubscriberInput): Promise<Subscriber>;
}

const DATA_DIR = path.join(process.cwd(), "data");

async function readJsonArray<T>(file: string): Promise<T[]> {
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

/** Serverless hosts (Vercel/Lambda) give the app a read-only filesystem, so the local-file sink
 * cannot persist there. Rather than returning a 500 and breaking the approved form flow, the
 * write is attempted and its success reported honestly to the caller — a record that could not
 * be persisted is marked `external_sync_status: "failed"` and logged loudly. It is NEVER reported
 * as stored when it was not. A real CRM/email adapter replaces this per DATA_BACKEND_CONTRACT. */
async function tryAppendJsonArray<T>(file: string, record: T): Promise<boolean> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    const existing = await readJsonArray<T>(file);
    existing.push(record);
    await writeFile(file, JSON.stringify(existing, null, 2), "utf8");
    return true;
  } catch (error) {
    console.warn(
      `[sinks] Local file persistence unavailable (${path.basename(file)}). ` +
        "Expected on a read-only serverless filesystem — the record is NOT stored. " +
        "Configure a real CRM/email adapter before production use.",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

class LocalFileLeadSink implements LeadSink {
  private file = path.join(DATA_DIR, "leads.json");

  async save(input: LeadInput): Promise<Lead> {
    const lead: Lead = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      external_sync_status: "pending",
      external_id: null,
    };
    const persisted = await tryAppendJsonArray(this.file, lead);
    return persisted ? lead : { ...lead, external_sync_status: "failed" };
  }
}

class LocalFileSubscriberSink implements SubscriberSink {
  private file = path.join(DATA_DIR, "subscribers.json");

  async save(input: SubscriberInput): Promise<Subscriber> {
    const existing = await readJsonArray<Subscriber>(this.file);
    const already = existing.find((s) => s.email.toLowerCase() === input.email.toLowerCase());
    if (already) return already;

    const subscriber: Subscriber = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      external_sync_status: "pending",
      external_id: null,
    };
    const persisted = await tryAppendJsonArray(this.file, subscriber);
    return persisted ? subscriber : { ...subscriber, external_sync_status: "failed" };
  }
}

export const leadSink: LeadSink = new LocalFileLeadSink();
export const subscriberSink: SubscriberSink = new LocalFileSubscriberSink();
