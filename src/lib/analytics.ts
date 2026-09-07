// .webby/ANALYTICS_CONTRACT.json: fixed event vocabulary, never send PII (phone/email/message).
export type AnalyticsEvent =
  | { name: "consultation_open"; props: { sourceRoute: string; sourceComponent: string } }
  | { name: "lead_submit_start"; props: { sourceRoute: string; service: string } }
  | {
      name: "lead_submit_success";
      props: { sourceRoute: string; service: string; preferredChannel: string };
    }
  | { name: "lead_submit_error"; props: { sourceRoute: string; errorClass: string } }
  | { name: "contact_channel_click"; props: { channel: string; sourceRoute: string } }
  | { name: "newsletter_submit_start"; props: { sourceRoute: string } }
  | { name: "newsletter_submit_success"; props: { sourceRoute: string } }
  | { name: "newsletter_submit_error"; props: { sourceRoute: string; errorClass: string } }
  | { name: "service_click"; props: { serviceSlug: string; sourceRoute: string } }
  | { name: "project_open"; props: { projectSlug: string; demoOnly: boolean } }
  | { name: "article_open"; props: { articleSlug: string; category: string } }
  | { name: "filter_change"; props: { route: string; filter: string } };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Provider-agnostic analytics sink. `window.gtag` only exists once GoogleAnalytics has loaded
 * gtag.js. Every call site passes the fixed event shape from ANALYTICS_CONTRACT.json.
 *
 * `transport_type: "beacon"` is not a nicety here, it is the whole reason the most valuable
 * event survives. The consultation CTA calls track() and then immediately `window.open()`s a
 * Zalo chat; the new tab takes focus, gtag's default transport never gets to flush, and
 * `consultation_open` was silently lost every single time a visitor actually converted.
 * Verified on production: blocking the popup made the event send, allowing it made it vanish.
 * `navigator.sendBeacon` exists precisely for this — the request is handed to the browser and
 * survives the page being backgrounded or unloaded.
 */
export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event.props);
  }
  window.dispatchEvent(new CustomEvent("lacviet:analytics", { detail: event }));
  window.gtag?.("event", event.name, { ...event.props, transport_type: "beacon" });
}
