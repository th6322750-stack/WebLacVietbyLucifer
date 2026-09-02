import { test } from "@playwright/test";

/** The V3 masters are lossless PNGs (1920x1080 cards at ~6.2 MB, 3840x2160 heroes at ~24.9 MB),
 * so Next's image optimizer does genuine CPU work the first time each variant is requested.
 * /du-an alone asks for 12 covers plus a 4K hero.
 *
 * Without this warm-up, several parallel workers hit those cold variants at once, the optimizer
 * queues, and navigations time out — failures that look like product defects but are purely
 * cold-cache contention. Requesting the heavy routes once, serially, populates the optimizer
 * cache so the real suite measures the product instead of the transcoder. */
test("warm the image optimizer cache", async ({ page }) => {
  test.setTimeout(300_000);
  const heavy = [
    "/",
    "/du-an",
    "/kien-thuc",
    "/website",
    "/support-mxh",
    "/dich-vu-so",
    "/gioi-thieu",
    "/lien-he",
    "/du-an/website-bat-dong-san-an-phat",
    "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  ];
  for (const route of heavy) {
    await page.goto(route, { waitUntil: "load", timeout: 120_000 });
    // Pull every lazy variant into the cache too, not just the above-the-fold ones.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => requestAnimationFrame(() => r(null)));
      }
    });
    await page.waitForLoadState("networkidle", { timeout: 120_000 }).catch(() => undefined);
  }
});
