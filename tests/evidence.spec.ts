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
  "du-an-slug": "/du-an/website-noi-that-phuong-nam",
  "kien-thuc": "/kien-thuc",
  "kien-thuc-slug": "/kien-thuc/5-dau-hieu-website-doanh-nghiep-can-nang-cap",
  "gioi-thieu": "/gioi-thieu",
  "lien-he": "/lien-he",
};

async function disableAnimationsAndWait(page: Page) {
  await page.addStyleTag({
    content: `*, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }`,
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
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
});
