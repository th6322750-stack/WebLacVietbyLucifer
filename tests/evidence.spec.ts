import { test, type Page } from "@playwright/test";

// .webby/qa/PLAYWRIGHT_CAPTURE_PLAN.json evidencePathSuggestion (commit folder finalized
// once the implementation branch is created — see IMPLEMENTATION_RECEIPT.json).
const EVIDENCE_DIR = ".webby/implementation/evidence/gd9-implementation-v1";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

const ROUTES: Record<string, string> = {
  home: "/",
  website: "/website",
  "support-mxh": "/support-mxh",
  "dich-vu-so": "/dich-vu-so",
  "du-an": "/du-an",
  "du-an-slug": "/du-an/website-bat-dong-san-an-phat",
  "kien-thuc": "/kien-thuc",
  "kien-thuc-slug": "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  "gioi-thieu": "/gioi-thieu",
  "lien-he": "/lien-he",
};

async function disableAnimationsAndWait(page: Page) {
  await page.addStyleTag({
    content: `*, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }`,
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");

  // `networkidle` alone is NOT sufficient for a fullPage screenshot: next/image lazy-loads
  // below-the-fold images, so they have not even begun fetching when the network goes idle, and
  // `fullPage: true` then races their decode. That produced non-deterministic evidence — captures
  // of /du-an and /kien-thuc at mobile width intermittently showed a blank hero. Scroll the whole
  // page to trigger every lazy load, wait for all images to finish decoding, then return to top.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  // Gate on decodable pixels, not on `complete`. Next 15.5 leaves `complete === false` on a
  // lazy next/image whose srcset candidate is still settling even after the bitmap is available
  // (observed on the footer logo: complete=false, naturalWidth=256), which would hang forever.
  // naturalWidth > 0 is the property that actually matters for a screenshot; decode() below is
  // the real paint gate. Bounded so one stuck image degrades the wait instead of failing the run.
  await page
    .waitForFunction(() => Array.from(document.images).every((img) => img.naturalWidth > 0), undefined, {
      timeout: 15000,
    })
    .catch(() => undefined);
  // `complete` only means "fetched" — the bitmap may still be undecoded when the screenshot is
  // taken, which left the logo and hero regions intermittently unpainted. decode() resolves only
  // once the image is ready to paint. Each decode is raced against a short cap: a lazy image that
  // is scrolled back out of view can leave decode() pending forever (Next 15.5 footer logo), and
  // one such image must not stall the whole capture.
  await page.evaluate(
    (capMs) =>
      Promise.all(
        Array.from(document.images).map((img) =>
          Promise.race([
            img.decode().catch(() => undefined),
            new Promise((resolve) => setTimeout(resolve, capMs)),
          ]),
        ),
      ),
    3000,
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))));
}

for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
  test.describe(`default state @ ${viewportName}`, () => {
    for (const [routeName, path] of Object.entries(ROUTES)) {
      test(`${routeName}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(path);
        await disableAnimationsAndWait(page);
        await page.screenshot({
          path: `${EVIDENCE_DIR}/${viewportName}/${routeName}--default.png`,
          fullPage: true,
        });
      });
    }

    test("404", async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/this-route-does-not-exist");
      await disableAnimationsAndWait(page);
      await page.screenshot({ path: `${EVIDENCE_DIR}/${viewportName}/404--default.png`, fullPage: true });
    });
  });
}

test.describe("interactive states", () => {
  test("mobile-menu-open @ mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto("/");
    await page.getByRole("button", { name: "Mở menu" }).click();
    await disableAnimationsAndWait(page);
    await page.screenshot({ path: `${EVIDENCE_DIR}/mobile/states--mobile-menu-open.png` });
  });

  for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
    test(`consultation-modal @ ${viewportName}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.getByRole("button", { name: "Nhận tư vấn" }).first().click();
      await disableAnimationsAndWait(page);
      await page.screenshot({ path: `${EVIDENCE_DIR}/${viewportName}/states--consultation-modal.png` });
    });
  }

  test("faq-open @ desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/website");
    const question = page.locator('[id^="faq-button-"]').first();
    await question.scrollIntoViewIfNeeded();
    await question.click();
    await disableAnimationsAndWait(page);
    await page.screenshot({ path: `${EVIDENCE_DIR}/desktop/states--faq-open.png` });
  });

  test("form-success @ desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/lien-he");
    const form = page.locator("#contact-form");
    await form.getByLabel("Họ tên").fill("Nguyễn Văn A");
    await form.getByLabel("Số điện thoại").fill("0912345678");
    await form.getByLabel(/Nhu cầu/).selectOption({ index: 1 });
    await form.getByLabel(/Dịch vụ quan tâm/).selectOption({ index: 1 });
    await form.getByLabel(/Tôi đồng ý/).check();
    await form.getByRole("button", { name: "Gửi yêu cầu tư vấn" }).click();
    await form.getByText("Đã gửi yêu cầu thành công").waitFor();
    await disableAnimationsAndWait(page);
    await page.screenshot({ path: `${EVIDENCE_DIR}/desktop/states--form-success.png` });
  });

  test("form-error @ desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/lien-he");
    const form = page.locator("#contact-form");
    await form.getByLabel("Họ tên").fill("A");
    await form.getByLabel("Số điện thoại").fill("123");
    await form.getByRole("button", { name: "Gửi yêu cầu tư vấn" }).click();
    await form.getByRole("alert").first().waitFor();
    await disableAnimationsAndWait(page);
    await page.screenshot({ path: `${EVIDENCE_DIR}/desktop/states--form-error.png` });
  });

  test("focus-visible @ desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await disableAnimationsAndWait(page);
    await page.screenshot({ path: `${EVIDENCE_DIR}/desktop/states--focus-visible.png` });
  });

  test("loading @ desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    // Deterministic loading frame: hold the /api/leads response open in this test only —
    // no artificial delay is added to the production route itself.
    await page.route("**/api/leads", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.goto("/lien-he");
    const form = page.locator("#contact-form");
    await form.getByLabel("Họ tên").fill("Nguyễn Văn A");
    await form.getByLabel("Số điện thoại").fill("0912345678");
    await form.getByLabel(/Nhu cầu/).selectOption({ index: 1 });
    await form.getByLabel(/Dịch vụ quan tâm/).selectOption({ index: 1 });
    await form.getByLabel(/Tôi đồng ý/).check();

    const submitButton = form.getByRole("button", { name: /Gửi yêu cầu tư vấn|Đang gửi/ });
    await submitButton.click();
    await form.getByRole("button", { name: "Đang gửi..." }).waitFor();

    await page.addStyleTag({
      content: `*, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }`,
    });
    await page.screenshot({ path: `${EVIDENCE_DIR}/desktop/states--loading.png` });
  });
});
