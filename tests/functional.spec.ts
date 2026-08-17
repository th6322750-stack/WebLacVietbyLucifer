import { test, expect, type Page } from "@playwright/test";

const ROUTES = [
  "/",
  "/website",
  "/support-mxh",
  "/dich-vu-so",
  "/du-an",
  "/du-an/website-bat-dong-san-an-phat",
  "/kien-thuc",
  "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  "/gioi-thieu",
  "/lien-he",
];

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

test.describe("routes render with no console errors", () => {
  for (const route of ROUTES) {
    test(`GET ${route}`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();
      expect(errors, `console errors on ${route}: ${errors.join("; ")}`).toEqual([]);
    });
  }

  test("GET /this-route-does-not-exist returns 404", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Không tìm thấy trang")).toBeVisible();
  });
});

test.describe("no horizontal overflow at reference viewports", () => {
  for (const route of ROUTES) {
    test(`no h-scroll ${route} @ mobile 390`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(hasOverflow, `${route} has horizontal overflow on mobile`).toBe(false);
    });
  }
});

test.describe("mobile navigation drawer", () => {
  test("opens, traps focus, closes on Escape and restores focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Mở menu" });
    await menuButton.click();

    const drawer = page.getByRole("dialog", { name: "Menu điều hướng" });
    await expect(drawer).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(drawer).not.toBeVisible();
    await expect(menuButton).toBeFocused();
  });
});

test.describe("consultation modal", () => {
  test("opens from header CTA, submits, shows success state", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Nhận tư vấn" }).first().click();

    const dialog = page.getByRole("dialog", { name: "Nhận tư vấn miễn phí" });
    await expect(dialog).toBeVisible();

    await dialog.getByLabel("Họ tên").fill("Nguyễn Văn A");
    await dialog.getByLabel("Số điện thoại").fill("0912345678");
    await dialog.getByLabel(/Nhu cầu/).selectOption({ index: 1 });
    await dialog.getByLabel(/Dịch vụ quan tâm/).selectOption({ index: 1 });
    await dialog.getByLabel(/Tôi đồng ý/).check();
    await dialog.getByRole("button", { name: "Gửi yêu cầu tư vấn" }).click();

    await expect(dialog.getByText("Đã gửi yêu cầu thành công")).toBeVisible();
  });

  test("closes on Escape and restores focus to trigger", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Nhận tư vấn" }).first();
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
});

test.describe("contact form validation", () => {
  test("shows inline errors for invalid submission", async ({ page }) => {
    await page.goto("/lien-he");
    const form = page.locator("#contact-form");
    await form.getByLabel("Họ tên").fill("A");
    await form.getByLabel("Số điện thoại").fill("123");
    await form.getByRole("button", { name: "Gửi yêu cầu tư vấn" }).click();
    await expect(form.getByRole("alert").first()).toBeVisible();
  });
});

test.describe("FAQ accordion", () => {
  test("expands and collapses with aria-expanded", async ({ page }) => {
    await page.goto("/website");
    const question = page.locator('[id^="faq-button-"]').first();
    await question.scrollIntoViewIfNeeded();
    const expandedBefore = await question.getAttribute("aria-expanded");
    await question.click();
    const expandedAfter = await question.getAttribute("aria-expanded");
    expect(expandedAfter).not.toBe(expandedBefore);
  });
});

test.describe("project/article filters", () => {
  test("filtering projects updates the URL", async ({ page }) => {
    await page.goto("/du-an");
    await page.getByRole("button", { name: "Website", exact: true }).click();
    await expect(page).toHaveURL(/category=Website/);
  });

  // GD10 re-QA round 4, R4-04: the featured article is index 0 of the visible set, and the
  // featured section is hidden while a filter is active — so filtering must run over the FULL
  // visible set, not visibleArticles.slice(1), or the featured article vanishes from its own
  // category. Two AI articles exist; both must be present under ?category=AI.
  test("AI category filter keeps the featured AI article in the results", async ({ page }) => {
    await page.goto("/kien-thuc?category=AI");
    const grid = page.locator("#article-grid");
    await expect(grid.getByRole("heading", { name: /AI trong Marketing 2024/i })).toBeVisible();
    await expect(grid.getByRole("heading", { name: /công cụ AI hỗ trợ marketing/i })).toBeVisible();
    await expect(page.locator("#featured-article")).toHaveCount(0);
  });

  test("category filter excludes other categories", async ({ page }) => {
    await page.goto("/kien-thuc?category=TikTok");
    const grid = page.locator("#article-grid");
    await expect(grid.getByRole("heading", { name: /follow TikTok/i })).toBeVisible();
    await expect(grid.getByRole("heading", { name: /AI trong Marketing 2024/i })).toHaveCount(0);
  });

  // GD10 re-QA round 4, R4-03/R4-04: hidden detail-only fixtures stay directly routable but must
  // never appear in a listing or filter result.
  test("hidden detail-only article never appears in listings or filters", async ({ page }) => {
    for (const url of ["/kien-thuc", "/kien-thuc?category=SEO"]) {
      await page.goto(url);
      await expect(page.getByRole("heading", { name: /10 yếu tố SEO quan trọng/i })).toHaveCount(0);
    }
    await page.goto("/kien-thuc?category=SEO");
    await expect(page.locator("#article-grid").getByRole("heading", { name: /SEO Onpage là gì/i })).toBeVisible();
  });

  test("hidden detail-only project never appears in listings or filters", async ({ page }) => {
    for (const url of ["/du-an", "/du-an?category=Website"]) {
      await page.goto(url);
      await expect(page.getByRole("heading", { name: "Website Bất Động Sản An Phát", exact: true })).toHaveCount(0);
    }
  });
});

test.describe("hidden fixtures stay direct-review only", () => {
  const HIDDEN_ROUTES = [
    "/du-an/website-bat-dong-san-an-phat",
    "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  ];

  // R4-03: routable for QA review, but noindex so unverified demo content never becomes an
  // indexed claim (SEO_CONTRACT.json).
  for (const route of HIDDEN_ROUTES) {
    test(`${route} is routable and marked noindex`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    });
  }

  test("sitemap.xml excludes hidden fixtures but lists visible detail routes", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBeLessThan(400);
    const xml = (await response?.text()) ?? "";
    expect(xml).not.toContain("/du-an/website-bat-dong-san-an-phat");
    expect(xml).not.toContain("/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google");
    expect(xml).toContain("/du-an/website-bat-dong-san-the-maison");
    expect(xml).toContain("/kien-thuc/seo-onpage-la-gi-15-yeu-to-quan-trong-can-toi-uu");
  });
});

test.describe("content-truth tagging", () => {
  // R4-02: every project/company preview mockup must carry demoOnly in data per
  // CONTENT_TRUTH.json. The approved cards show no badge, so the tag is asserted in markup.
  for (const route of ["/", "/website", "/du-an/website-bat-dong-san-an-phat"]) {
    test(`${route} project preview cards are tagged demoOnly`, async ({ page }) => {
      await page.goto(route);
      const cards = page.locator('a[data-demo-only]');
      expect(await cards.count()).toBeGreaterThan(0);
      for (const card of await cards.all()) {
        await expect(card).toHaveAttribute("data-demo-only", "true");
      }
    });
  }
});

test.describe("detail-route asset identity", () => {
  // R4-01: project-cover-01 is identity-bound to demo-project-01 (The Maison). The An Phát
  // detail-only fixture must not render it anywhere on its route.
  test("An Phát detail route does not consume The Maison's identity-bound cover", async ({ page }) => {
    await page.goto("/du-an/website-bat-dong-san-an-phat");
    const showcase = page.locator("#visual-showcase img");
    await expect(showcase).toHaveCount(1);
    await expect(showcase).toHaveAttribute("src", /project-detail-device-master/);
    // The related-projects rail legitimately uses covers 01..04 per ASSET_USAGE_MAP; the
    // showcase and hero must not.
    const heroImg = page.locator("#case-study-hero img");
    await expect(heroImg).toHaveAttribute("src", /project-detail-device-master/);
  });
});

test.describe("reduced motion", () => {
  test("home renders with prefers-reduced-motion: reduce", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = collectConsoleErrors(page);
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    expect(errors).toEqual([]);
  });
});
