import type { Lead } from "@/lib/types";

/** Side-channel notification for a new lead: one row appended to a Google Sheet, one message
 * sent to a Telegram chat.
 *
 * Deliberately best-effort and fire-and-forget. The lead is already safely in Postgres by the
 * time this runs (see sinks.ts) — that write is the one that must succeed, because it is the
 * only copy of a request from a real person. Sheets and Telegram are convenience, not the
 * record of truth, so:
 *
 *  - a missing env var skips that one channel silently (logged, not thrown)
 *  - a failed request skips that one channel silently (logged, not thrown)
 *  - the caller never awaits this in a way that could delay or fail the customer's response
 *
 * Google Sheets goes through an Apps Script Web App rather than the Sheets API, on purpose:
 * the API needs a Google Cloud service account (a JSON key file, an IAM setup, sharing the
 * sheet with a robot email) — all of that for one thing, appending a row. A Web App bound to
 * the sheet does the same job with one URL and no credentials to manage on this end. Setup:
 *
 *   1. Open the target Google Sheet → Extensions → Apps Script.
 *   2. Replace the contents with GOOGLE_APPS_SCRIPT below and Deploy → New deployment →
 *      type "Web app", execute as yourself, access "Anyone".
 *   3. Copy the deployment URL into GOOGLE_SHEETS_WEBHOOK_URL.
 */
export const GOOGLE_APPS_SCRIPT = `
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var d = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(d.createdAt), d.name, d.phone, d.email || "", d.need, d.service,
    d.preferredChannel, d.sourceRoute, d.id,
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
`.trim();

const CHANNEL_LABEL: Record<string, string> = {
  phone: "Điện thoại",
  zalo: "Zalo",
  telegram: "Telegram",
  messenger: "Messenger",
  email: "Email",
  website: "Website",
};

async function appendToSheet(lead: Lead): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) console.warn("[leads/notify] Google Sheets webhook returned", res.status);
  } catch (err) {
    console.warn("[leads/notify] Google Sheets webhook failed", err);
  }
}

async function sendTelegram(lead: Lead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = [
    "📩 <b>Yêu cầu tư vấn mới</b>",
    `👤 ${esc(lead.name)} — <a href="tel:${lead.phone}">${lead.phone}</a>`,
    lead.email ? `✉️ ${esc(lead.email)}` : null,
    `🛠️ ${esc(lead.service)}`,
    lead.need ? `📝 ${esc(lead.need)}` : null,
    `💬 Muốn liên hệ qua: ${CHANNEL_LABEL[lead.preferredChannel] ?? esc(lead.preferredChannel)}`,
    `🔗 Từ trang: ${esc(lead.sourceRoute)}`,
  ].filter((l): l is string => l !== null);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) console.warn("[leads/notify] Telegram API returned", res.status, await res.text());
  } catch (err) {
    console.warn("[leads/notify] Telegram send failed", err);
  }
}

export async function notifyNewLead(lead: Lead): Promise<void> {
  await Promise.all([appendToSheet(lead), sendTelegram(lead)]);
}
