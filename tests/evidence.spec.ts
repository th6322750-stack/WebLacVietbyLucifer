import { test, type Page } from "@playwright/test";

// .webby/qa/PLAYWRIGHT_CAPTURE_PLAN.json evidencePathSuggestion (commit folder finalized
// once the implementation branch is created — see IMPLEMENTATION_RECEIPT.json).
// EVIDENCE_DIR override lets a capture round target a dedicated folder (e.g. a live-preview
// QA round) without moving the default local-run evidence path.
const EVIDENCE_DIR = process.env.EVIDENCE_DIR ?? ".webby/implementation/evidence/gd9-implementation-v1";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

const WIDE_DESKTOP = { width: 1920, height: 1080 } as const;

// Cập nhật 2026-09-08 cho vòng review PHUONG_AN. Hai thay đổi:
//
//  - Bỏ "du-an-slug" (/du-an/website-bat-dong-san-an-phat). Route đó giờ là redirect sang
//    /website/concept, nên chụp nó chỉ ra ảnh của trang đích — một tấm bằng chứng nói dối về
//    thứ nó đang chụp.
//  - Thêm mọi route mới. Trang không có trong danh sách này thì không có ảnh, và không có ảnh
//    thì vòng review sẽ bỏ sót đúng những trang vừa đổi nhiều nhất.
const ROUTES: Record<string, string> = {
  home: "/",
  "dich-vu": "/dich-vu",
  "dich-vu-google-business-profile": "/dich-vu/google-business-profile",
  "dich-vu-quang-cao-da-kenh": "/dich-vu/quang-cao-da-kenh",
  "dich-vu-seo-tong-the": "/dich-vu/seo-tong-the",
  "dich-vu-nhan-dien-thuong-hieu": "/dich-vu/nhan-dien-thuong-hieu",
  "dich-vu-domain-hosting-email": "/dich-vu/domain-hosting-email",
  "dich-vu-website-bat-dong-san": "/dich-vu/website-bat-dong-san",
  "dich-vu-seo-google-maps": "/dich-vu/seo-google-maps",
  "dich-vu-quang-cao-google-ads": "/dich-vu/quang-cao-google-ads",
  "dich-vu-quang-cao-facebook-ads": "/dich-vu/quang-cao-facebook-ads",
  "dich-vu-quang-cao-zalo-ads": "/dich-vu/quang-cao-zalo-ads",
  "dich-vu-marketing-bat-dong-san": "/dich-vu/marketing-bat-dong-san",
  "du-an-preview": "/du-an/preview",
  website: "/website",
  "website-concept": "/website/concept",
  "website-concept-loc": "/website/concept?industry=N%E1%BB%99i%20th%E1%BA%A5t",
  "website-concept-slug": "/website/concept/noi-that-an-loc",
  "support-mxh": "/support-mxh",
  "support-mxh-meta-business": "/support-mxh/meta-business",
  "support-mxh-facebook": "/support-mxh/facebook",
  "support-mxh-tiktok": "/support-mxh/tiktok",
  "support-mxh-bao-mat": "/support-mxh/bao-mat-khoi-phuc",
  "dich-vu-so": "/dich-vu-so",
  "kien-thuc": "/kien-thuc",
  "kien-thuc-slug": "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  "gioi-thieu": "/gioi-thieu",
  "lien-he": "/lien-he",
};

async function gotoForEvidence(page: Page, path: string, expectedStatus = 200) {
  // ScrollReveal decides whether to render its first visible frame during mount. Setting reduced
  // motion before navigation makes the evidence deterministic and prevents full-page captures
  // from recording transparent, not-yet-observed sections.
  await page.emulateMedia({ reducedMotion: "reduce" });
  const response = await page.goto(path);
  if (!response) throw new Error(`Không nhận được HTTP response khi mở ${path}`);
  if (response.status() !== expectedStatus) {
    throw new Error(`Ảnh QA không hợp lệ: ${path} trả HTTP ${response.status()}, cần ${expectedStatus}`);
  }
}

async function disableAnimationsAndWait(page: Page) {
  await page.addStyleTag({
    content: `*, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }`,
  });
  await page.evaluate(() => document.fonts.ready);
  // Next's image optimizer may keep a background request alive on a cold cache. Network-idle is
  // only a best-effort settling hint here; the bounded naturalWidth/decode gates below are the
  // authoritative check that pixels are actually ready for capture.
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);

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
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);
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
        await gotoForEvidence(page, path);
        await disableAnimationsAndWait(page);
        await page.screenshot({
          path: `${EVIDENCE_DIR}/${viewportName}/${routeName}--default.png`,
          fullPage: true,
        });
      });
    }

    test("404", async ({ page }) => {
      await page.setViewportSize(viewport);
      await gotoForEvidence(page, "/this-route-does-not-exist", 404);
      await disableAnimationsAndWait(page);
      await page.screenshot({ path: `${EVIDENCE_DIR}/${viewportName}/404--default.png`, fullPage: true });
    });
  });
}

/** An interaction-state capture must prove the state is inside the screenshot viewport. */
async function expectStateVisibleInViewport(page: Page, selector: string) {
  const el = page.locator(selector).first();
  await el.waitFor({ state: "visible" });
  // The settle helper returns the page to scroll-top, which can push an in-flow state (the
  // expanded FAQ panel sits ~3700px down) back out of the capture area. Bring it into view
  // before measuring; for fixed overlays this is a no-op.
  await el.scrollIntoViewIfNeeded();
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(null))));
  const box = await el.boundingBox();
  const viewport = page.viewportSize();
  if (!box || !viewport) throw new Error(`state ${selector}: no bounding box / viewport`);
  const visible =
    box.y < viewport.height && box.y + box.height > 0 && box.x < viewport.width && box.x + box.width > 0;
  if (!visible) {
    throw new Error(
      `state ${selector} is outside the capture viewport (box y=${box.y} h=${box.height}, viewport h=${viewport.height})`,
    );
  }
}

test.describe("interactive states", () => {
  test("mobile-menu-open @ mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoForEvidence(page, "/");
    await page.getByRole("button", { name: "Mở menu" }).click();
    await disableAnimationsAndWait(page);
    await expectStateVisibleInViewport(page, '[data-state="mobile-menu-open"][role="dialog"]');
    await page.screenshot({ path: `${EVIDENCE_DIR}/mobile/states--mobile-menu-open.png` });
  });

  test("mobile-services-accordion @ mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoForEvidence(page, "/");
    await page.getByRole("button", { name: "Mở menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Menu điều hướng" });
    const services = drawer.getByRole("button", { name: "Dịch vụ", exact: true });
    await services.click();
    await disableAnimationsAndWait(page);
    await expectStateVisibleInViewport(page, '[data-state="mobile-menu-open"][role="dialog"]');
    await page.screenshot({ path: `${EVIDENCE_DIR}/mobile/states--mobile-services-top.png` });

    // Cuộn tới CTA cuối drawer, không phải link "Tất cả dịch vụ" vốn đã nằm sẵn trong
    // viewport. Nếu dùng link đó, hai ảnh top/bottom sẽ giống hệt nhau và không chứng minh
    // được phần cuối menu có thể tiếp cận trên màn hình thấp.
    const consultationCta = drawer.getByRole("button", { name: "Nhận tư vấn", exact: true });
    await consultationCta.scrollIntoViewIfNeeded();
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(null))));
    await page.screenshot({ path: `${EVIDENCE_DIR}/mobile/states--mobile-services-bottom.png` });
  });

  for (const [viewportName, viewport] of [
    ["desktop", VIEWPORTS.desktop],
    ["desktop-wide", WIDE_DESKTOP],
  ] as const) {
    test(`service-mega-menu @ ${viewportName}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await gotoForEvidence(page, "/");
      await page.getByRole("button", { name: "Dịch vụ", exact: true }).click();
      await disableAnimationsAndWait(page);
      await expectStateVisibleInViewport(page, "#service-mega-menu");
      await page.screenshot({ path: `${EVIDENCE_DIR}/${viewportName}/states--service-mega-menu.png` });
    });
  }

  test("pricing-custom @ desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await gotoForEvidence(page, "/");
    await page.getByRole("tab", { name: "Theo yêu cầu" }).click();
    await disableAnimationsAndWait(page);
    await expectStateVisibleInViewport(page, '[role="tabpanel"]:not([hidden])');
    await page.screenshot({ path: `${EVIDENCE_DIR}/desktop/states--pricing-custom.png` });
  });

  test("faq-open @ desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await gotoForEvidence(page, "/website");
    // The first FAQ is open by default, so clicking IT would collapse the accordion and the
    // capture would show no expanded region at all. Open a currently-closed question instead.
    const question = page.locator('[id^="faq-button-"][aria-expanded="false"]').first();
    await question.scrollIntoViewIfNeeded();
    await question.click();
    await disableAnimationsAndWait(page);
    // Must contain the EXPANDED panel, not merely the collapsed FAQ list.
    await expectStateVisibleInViewport(page, '[data-state="faq-open"] [role="region"]');
    await page.screenshot({ path: `${EVIDENCE_DIR}/desktop/states--faq-open.png` });
  });

  test("focus-visible @ desktop", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await gotoForEvidence(page, "/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await disableAnimationsAndWait(page);
    await page.screenshot({ path: `${EVIDENCE_DIR}/desktop/states--focus-visible.png` });
  });

  // ── Trạng thái UI V6 (2026-09-08) ────────────────────────────────────────────────────────
  //
  // Sáu ảnh dưới đây chụp đúng những gì §13.5 yêu cầu xem: hai đầu của nút xem thêm, hai trạng
  // thái của sticky CTA, cue cuộn của bộ lọc, và bản reduced-motion.

  test("concept-load-more-before @ mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoForEvidence(page, "/website/concept");
    // Full-page capture không tự kích hoạt IntersectionObserver/lazy images ở mọi section.
    // Settle trước để ảnh "before" ghi đúng 8 card đang hiển thị, không phải 3 card cộng một
    // khoảng trắng giả do các card dưới chưa từng đi qua viewport.
    await disableAnimationsAndWait(page);
    await page.screenshot({
      path: `${EVIDENCE_DIR}/mobile/states--concept-load-more-before.png`,
      fullPage: true,
    });
  });

  test("concept-load-more-after @ mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoForEvidence(page, "/website/concept");
    await page.getByRole("button", { name: /xem thêm concept/i }).click();
    await disableAnimationsAndWait(page);
    await page.screenshot({
      path: `${EVIDENCE_DIR}/mobile/states--concept-load-more-after.png`,
      fullPage: true,
    });
  });

  test("concept-filter-scroll-cue @ mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoForEvidence(page, "/website/concept");
    await expectStateVisibleInViewport(page, '[aria-label="Lọc theo lĩnh vực"]');
    await page.screenshot({ path: `${EVIDENCE_DIR}/mobile/states--concept-filter-cue.png` });
  });

  test("sticky-cta-visible @ mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoForEvidence(page, "/website");
    // Settle trước vì helper luôn trả trang về scroll-top. Cuộn sau đó mới giữ đúng state
    // sticky trong ảnh viewport.
    await disableAnimationsAndWait(page);
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForFunction(
      () => document.querySelector('[data-testid="sticky-mobile-cta"]')?.getAttribute("data-state") === "visible",
    );
    await expectStateVisibleInViewport(page, '[data-testid="sticky-mobile-cta"][data-state="visible"]');
    await page.screenshot({ path: `${EVIDENCE_DIR}/mobile/states--sticky-cta-visible.png` });
  });

  test("sticky-cta-hidden-at-footer @ mobile", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoForEvidence(page, "/website");
    await disableAnimationsAndWait(page);
    // Cuộn tới CTA cuối trang: capsule phải tự biến mất ở đây, đó là chính lỗi phải sửa.
    await page.evaluate(() => document.querySelector("[data-final-cta]")?.scrollIntoView());
    await page.waitForFunction(
      () => document.querySelector('[data-testid="sticky-mobile-cta"]')?.getAttribute("data-state") === "hidden",
    );
    await page.screenshot({ path: `${EVIDENCE_DIR}/mobile/states--sticky-cta-at-footer.png` });
  });

  test("service-detail-reduced-motion @ desktop", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(VIEWPORTS.desktop);
    await gotoForEvidence(page, "/dich-vu/seo-tong-the");
    await page.screenshot({
      path: `${EVIDENCE_DIR}/desktop/states--service-reduced-motion.png`,
      fullPage: true,
    });
  });
});
