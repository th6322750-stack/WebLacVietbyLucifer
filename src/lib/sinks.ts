import { after } from "next/server";
import type { Lead, LeadInput, Subscriber, SubscriberInput } from "./types";

/** .webby/DATA_BACKEND_CONTRACT.json: provider-agnostic sink abstractions, so the public form
 * contract (/api/leads, /api/newsletter) never changes when the backend does — "only these two
 * functions change".
 *
 * This is that swap, twice over now. The original implementation appended to a JSON file under
 * data/, which cannot work on a read-only serverless filesystem — on Vercel every write failed,
 * the record was honestly marked `external_sync_status: "failed"`, and the lead was lost. That
 * became SQLite (data/lacviet.db), which has the same problem for the same reason: Vercel's
 * filesystem. Records now go to Postgres (Neon), reachable over HTTP instead of a local file, so
 * the backend can actually live where the app runs. Both earlier implementations are in git
 * history if either is ever wanted back.
 */
export interface LeadSink {
  save(input: LeadInput): Promise<Lead>;
}

export interface SubscriberSink {
  save(input: SubscriberInput): Promise<Subscriber>;
}

/** Imported lazily so the database client is only pulled in when a form is actually submitted,
 * and never dragged into a client bundle by a stray import of this module. */
class DbLeadSink implements LeadSink {
  async save(input: LeadInput): Promise<Lead> {
    const { insertLead } = await import("./db/repositories/leads");
    const lead = await insertLead(input);
    // `after()`, not a bare unawaited promise: on Vercel the function's execution can be frozen
    // the moment the response is sent, which would kill a plain fire-and-forget call before the
    // Sheets/Telegram requests finish. `after()` keeps the instance alive for this specific
    // callback without making the customer wait for it — the response still returns immediately.
    after(async () => {
      const { notifyNewLead } = await import("./leads/notify");
      await notifyNewLead(lead);
    });
    return lead;
  }
}

class DbSubscriberSink implements SubscriberSink {
  async save(input: SubscriberInput): Promise<Subscriber> {
    const { insertSubscriber } = await import("./db/repositories/subscribers");
    return insertSubscriber(input);
  }
}

export const leadSink: LeadSink = new DbLeadSink();
export const subscriberSink: SubscriberSink = new DbSubscriberSink();
