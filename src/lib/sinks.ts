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

async function appendJsonArray<T>(file: string, record: T): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const existing = await readJsonArray<T>(file);
  existing.push(record);
  await writeFile(file, JSON.stringify(existing, null, 2), "utf8");
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
    await appendJsonArray(this.file, lead);
    return lead;
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
    await appendJsonArray(this.file, subscriber);
    return subscriber;
  }
}

export const leadSink: LeadSink = new LocalFileLeadSink();
export const subscriberSink: SubscriberSink = new LocalFileSubscriberSink();
