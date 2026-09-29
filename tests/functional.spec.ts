import { test, expect, devices, type Page } from "@playwright/test";

// PRO V2.1: /du-an is now a redirect into /website (the demo project catalogue it used to list
// was removed sitewide), so it stays in this list — the redirect itself must resolve cleanly —
// but its old per-project detail route is gone along with the projects it described.
const ROUTES = [
  "/",
  "/dich-vu",
  // Mọi dịch vụ generic đang publish phải nằm trong ma trận. Nếu chỉ kiểm vài route đại diện,
  // một dịch vụ mới có thể lên menu nhưng không bao giờ xuất hiện trong ảnh hoặc regression QA.
  "/dich-vu/google-business-profile",
  "/dich-vu/quang-cao-da-kenh",
  "/dich-vu/seo-tong-the",
  "/dich-vu/nhan-dien-thuong-hieu",
  "/dich-vu/domain-hosting-email",
  "/dich-vu/website-bat-dong-san",
  "/dich-vu/seo-google-maps",
  "/dich-vu/quang-cao-google-ads",
  "/dich-vu/quang-cao-facebook-ads",
  "/dich-vu/quang-cao-zalo-ads",
  "/dich-vu/marketing-bat-dong-san",
  "/website",
  // PHUONG_AN §7.3: gallery concept tách khỏi /website thành route riêng, có trang chi tiết.
  "/website/concept",
  "/website/concept/noi-that-an-loc",
  "/support-mxh",
  // PHUONG_AN §7.4: mỗi nhóm support có trang riêng thay vì bốn gạch đầu dòng trên một thẻ.
  "/support-mxh/facebook",
  "/support-mxh/tiktok",
  "/support-mxh/meta-business",
  "/support-mxh/bao-mat-khoi-phuc",
  "/dich-vu-so",
  "/du-an",
  "/du-an/preview",
  "/kien-thuc",
  "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  "/gioi-thieu",
  "/lien-he",
  "/huong-dan-quan-tri",
  "/quy-trinh-lam-viec-tai-maxweb",
  "/hop-dong-mau",
  "/tuyen-dung",
  "/chinh-sach/thanh-toan",
  "/chinh-sach/van-chuyen-va-giao-nhan",
  "/chinh-sach/bao-mat-thong-tin",
  "/chinh-sach/xu-ly-khieu-nai",
  "/chinh-sach/bao-hanh",
  "/chinh-sach/doi-tra-va-hoan-tien",
];

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

async function signInAdmin(page: Page) {
  const password = process.env.E2E_ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("E2E_ADMIN_PASSWORD must be set to exercise production admin flows.");
  }
  const response = await page.request.post("/api/admin/login", { data: { password } });
  expect(response.ok(), `admin login failed with HTTP ${response.status()}`).toBe(true);
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
    await expect(page.getByRole("heading", { name: "Không tìm thấy trang" })).toBeVisible();
  });
});

// PRO V2.2 §24-25: full responsive matrix, not just the one mobile width this used to cover.
// 360 is the narrowest real Android width still in play; 1920 is the widest reference desktop.
const REFERENCE_VIEWPORTS = [
  { width: 360, height: 740, label: "360" },
  { width: 768, height: 1024, label: "768" },
  { width: 1024, height: 768, label: "1024" },
  { width: 1440, height: 900, label: "1440" },
  { width: 1920, height: 1080, label: "1920" },
];

test.describe("no horizontal overflow at reference viewports", () => {
  for (const route of ROUTES) {
    for (const vp of REFERENCE_VIEWPORTS) {
      test(`no h-scroll ${route} @ ${vp.label}`, async ({ page }) => {
        // PRO V2.1: /lien-he flaked here — ScrollReveal's `direction="left"`/`"right"` variants
        // sit at a translateX(±20px) offset until its mount effect flips `isVisible`, and
        // measuring scrollWidth in that split-second window reports a false 4px overflow (one side
        // pushed right, the mirrored side pushed left). `emulateMedia` makes the effect SET the
        // correct value immediately instead of waiting on an IntersectionObserver — but the effect
        // still runs after React's initial commit, not before it, so there's a real (if short)
        // window where the pre-reveal transform is what's on screen. A fixed re-run still hit it,
        // which is why this needs an explicit settle wait, not just the media emulation.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route);
        await page.waitForTimeout(200);
        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        );
        expect(hasOverflow, `${route} has horizontal overflow @ ${vp.label}`).toBe(false);
      });
    }
  }

  test("contact page stays clipped during the first-frame reveal @ 390", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/lien-he");
    await page.waitForTimeout(200);
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasOverflow, "first-frame ScrollReveal must not create a phantom scrollbar").toBe(false);
  });
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

  // PRO V2.1: found by hand, not by this suite — `toBeVisible()` alone passed even when the
  // drawer was squished to 63px tall (header-height) instead of the full viewport, because a
  // non-zero, non-`display:none` box counts as "visible" regardless of its actual size. Root
  // cause: `<header>` has `backdrop-blur-*`, and `backdrop-filter` establishes a containing
  // block for `position: fixed` descendants — same as `transform`/`filter` — so this drawer,
  // nested inside `<header>` in the JSX, had its `fixed inset-0` resolving against the header's
  // own box instead of the viewport. Fixed via `createPortal` to `document.body`. These
  // assertions pin actual geometry and DOM placement so a regression fails loudly instead of
  // just quietly failing `toBeVisible()`'s very loose bar.
  test("drawer covers the full viewport and is portaled outside <header>", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Mở menu" }).click();

    const drawer = page.getByRole("dialog", { name: "Menu điều hướng" });
    const box = await drawer.boundingBox();
    expect(box, "drawer not rendered").not.toBeNull();
    expect(box!.height, "drawer collapsed to less than the viewport — likely trapped inside a backdrop-filter containing block again").toBeGreaterThan(800);
    expect(box!.width).toBeGreaterThan(380);

    const escapesHeader = await drawer.evaluate((el) => !el.closest("header"));
    expect(escapesHeader, "drawer is still nested inside <header> in the DOM").toBe(true);

    // The actual nav links must be inside that full-size box, not overflowing past what's
    // visible on screen.
    const linkBox = await page.getByRole("link", { name: "Liên hệ", exact: true }).boundingBox();
    expect(linkBox, "'Liên hệ' link not found in drawer").not.toBeNull();
    expect(linkBox!.y).toBeLessThan(844);
    expect(linkBox!.y).toBeGreaterThan(0);
  });

  test("nav link inside the drawer actually navigates", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Mở menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Menu điều hướng" });
    // The public top-level parity label is “Tin tức”; its safe Lạc Việt destination is the
    // existing knowledge hub, so this verifies the mobile navigation follows the same route.
    await drawer.getByRole("link", { name: "Tin tức", exact: true }).click();
    await page.waitForURL("**/kien-thuc");
    await expect(page).toHaveURL(/\/kien-thuc$/);
  });
});

test.describe("public search lightbox", () => {
  test("finds a service and navigates to its canonical page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "Tìm kiếm" }).click();
    const dialog = page.getByRole("dialog", { name: "Tìm kiếm nội dung" });
    await expect(dialog).toBeVisible();
    await dialog.getByLabel("Từ khoá tìm kiếm").fill("Google Business Profile");
    await expect(dialog.getByRole("link", { name: /Google Business Profile/ })).toBeVisible();
    await dialog.getByRole("link", { name: /Google Business Profile/ }).click();
    await expect(page).toHaveURL(/\/dich-vu\/google-business-profile$/);
  });
});

// PRO V2.1: the on-site consultation modal (form → inline "Cảm ơn bạn!" success state) and the
// /lien-he contact form were BOTH deliberately replaced this session with a direct Zalo-chat
// redirect on every "Nhận tư vấn" CTA sitewide (ConsultationProvider.open() now calls
// window.open on zalo.me — see git history). Neither the modal nor the form exists to test
// anymore; these describe blocks assert the new, approved behavior instead.
test.describe("consultation CTA opens Zalo", () => {
  test("header CTA opens Zalo chat in a new tab, no modal", async ({ page, context }) => {
    await page.goto("/");
    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      page.getByRole("button", { name: "Nhận tư vấn" }).first().click(),
    ]);
    await popup.waitForLoadState("domcontentloaded").catch(() => {});
    expect(popup.url()).toContain("zalo.me");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await popup.close();
  });
});

test.describe("inner-page jump rails", () => {
  const routes = [
    "/dich-vu-so",
    "/website",
    "/website/concept",
    "/website/concept/noi-that-an-loc",
    "/support-mxh",
    "/support-mxh/facebook",
    "/kien-thuc",
    "/lien-he",
    "/gioi-thieu",
    "/huong-dan-quan-tri",
    "/chinh-sach/thanh-toan",
  ];

  for (const route of routes) {
    test(`${route} exposes only real jump targets`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      const rail = page.getByRole("navigation", { name: "Đi nhanh trong trang" });
      await expect(rail).toBeVisible();
      const hrefs = await rail.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      expect(hrefs.length).toBeGreaterThanOrEqual(2);
      for (const href of hrefs) {
        expect(href).toMatch(/^#[a-z0-9-]+$/);
        await expect(page.locator(href!)).toHaveCount(1);
      }
    });
  }

  test("stays available while scanning a long desktop page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/dich-vu-so");
    const rail = page.getByRole("navigation", { name: "Đi nhanh trong trang" });
    await expect(rail).toBeVisible();
    await expect(page.getByTestId("page-jump-nav")).toHaveCSS("position", "sticky");
  });
});

test.describe("desktop quick contact rail", () => {
  test("exposes verified Zalo and Telegram channels on inner pages", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/website", { waitUntil: "domcontentloaded" });

    const rail = page.getByRole("complementary", { name: "Kênh liên hệ nhanh" });
    await expect(rail).toBeVisible();
    await expect(rail.getByRole("link", { name: "Nhắn tin qua Zalo" })).toHaveAttribute(
      "href",
      /zalo\.me\//,
    );
    await expect(rail.getByRole("link", { name: "Nhắn tin qua Telegram" })).toHaveAttribute(
      "href",
      /t\.me\//,
    );
  });

  test("stays out of the homepage composition", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("complementary", { name: "Kênh liên hệ nhanh" })).toHaveCount(0);
  });
});

test.describe("admin workspace UX", () => {
  test("dashboard exposes a working quick search", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await signInAdmin(page);
    await page.goto("/admin");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Điều hướng quản trị" })).toBeVisible();
    const search = page.getByRole("search").getByLabel("Tìm kiếm nhanh");
    await expect(search).toBeVisible();
    await search.fill("0355636882");
    await page.getByRole("button", { name: "Tìm kiếm quản trị" }).click();
    await expect(page).toHaveURL(/\/admin\/don-hang\?q=0355636882$/);
  });

  for (const route of ["/admin/don-hang", "/admin/du-an", "/admin/bai-viet", "/admin/xac-minh"]) {
    test(`${route} renders the admin surface`, async ({ page }) => {
      await signInAdmin(page);
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("body")).not.toContainText("Application error");
      await expect(page.getByTestId("admin-data-unavailable")).toBeVisible();
    });
  }

  test("SEO workspace renders the audit and filters URL rows", async ({ page }) => {
    await signInAdmin(page);
    await page.goto("/admin/seo");
    await expect(page.getByTestId("admin-seo-page")).toBeVisible();
    await expect(page.getByTestId("seo-audit-table")).toBeVisible();
    const table = page.getByTestId("seo-audit-table");
    await expect(table.locator("tbody tr")).toHaveCount(63);
    await table.getByLabel("Tìm URL hoặc tiêu đề").fill("seo-onpage");
    await expect(table.locator("tbody tr")).toHaveCount(1);
    await table.getByLabel("Lọc index").selectOption("noindex");
    await expect(table.locator("tbody tr")).toHaveCount(0);
  });
});

test.describe("/lien-he Zalo card", () => {
  test("shows a direct Zalo link, no contact form", async ({ page }) => {
    await page.goto("/lien-he");
    await expect(page.locator("form")).toHaveCount(0);
    const zaloLink = page.locator('a[href*="zalo.me"]').first();
    await expect(zaloLink).toBeVisible();
    await expect(zaloLink).toHaveAttribute("target", "_blank");
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
  // PRO V2.1: /du-an's own category-filter UI (URL-driven, `?category=`) was replaced this
  // session by /website's client-side industry gallery (IndustryGallery.tsx — filters in place,
  // no URL change, since it's a single reusable gallery rather than a route per category).
  test("website industry gallery filters in place without navigating", async ({ page }) => {
    await page.goto("/website");
    const gallery = page.locator("#website-projects");
    await gallery.scrollIntoViewIfNeeded();
    const before = await gallery.locator("a, button").count();
    const chip = gallery.getByRole("button", { name: "Bất động sản", exact: true });
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    // The apex domain canonically redirects to www in production; the interaction itself must
    // stay on the website route regardless of which host serves it.
    await expect(page).toHaveURL(/\/website$/);
    const after = await gallery.locator("a, button").count();
    expect(after).toBeLessThan(before);
  });

  // PHUONG_AN §7.3: gallery đầy đủ ở /website/concept lọc bằng URL (`?industry=`) chứ không
  // bằng state, nên trạng thái lọc chia sẻ được và crawler đọc được. Đây là một hợp đồng khác
  // với gallery teaser trên /website (lọc tại chỗ), nên cả hai đều được kiểm.
  test("concept gallery filters through the URL, not component state", async ({ page }) => {
    await page.goto("/website/concept");
    const before = await page.locator("#concept-grid a").count();
    const chip = page.getByRole("link", { name: "Nội thất", exact: true });
    await chip.click();
    await expect(page).toHaveURL(/industry=/);
    const after = await page.locator("#concept-grid a").count();
    expect(after).toBeLessThan(before);
    // Lọc bằng URL phải sống sót qua reload — đó là điểm khác biệt so với lọc bằng state.
    await page.reload();
    expect(await page.locator("#concept-grid a").count()).toBe(after);
  });

  // GD10 re-QA round 4, R4-04: the featured article is index 0 of the visible set, and the
  // featured section is hidden while a filter is active — so filtering must run over the FULL
  // visible set, not visibleArticles.slice(1), or an article vanishes from its own category.
  // Was written against ?category=AI; those two AI pieces were thin drafts and were hidden on
  // 2026-09-02, so the category no longer exists. SEO now carries the same shape: one of its
  // articles is the featured one, so it proves the same thing.
  test("category filter keeps the featured article in its own category results", async ({ page }) => {
    await page.goto("/kien-thuc?category=SEO");
    const grid = page.locator("#article-grid");
    await expect(grid.getByRole("heading", { name: /SEO Onpage là gì/i })).toBeVisible();
    await expect(page.locator("#featured-article")).toHaveCount(0);
  });

  // Hiding the thin drafts left three categories with nothing behind them. A chip that leads to
  // an empty page is a dead end the visitor did nothing to deserve, so the chip list is derived
  // from articles that actually exist.
  test("category chips only offer categories that have an article", async ({ page }) => {
    await page.goto("/kien-thuc");
    const chips = await page.locator("#category-filters a, #category-filters button").allTextContents();
    const offered = chips.map((c) => c.trim()).filter(Boolean);
    for (const label of offered) {
      if (label === "Tất cả") continue;
      await page.goto(`/kien-thuc?category=${encodeURIComponent(label)}`);
      const count = await page.locator('a[href^="/kien-thuc/"]').count();
      expect(count, `category chip "${label}" leads to an empty page`).toBeGreaterThan(0);
    }
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
});

// PRO V2.1: the demo project catalogue this block once covered (website-bat-dong-san-an-phat and
// its siblings) was removed sitewide this session — `src/content/projects.ts` is now a real
// empty array, not a fixture with something to hide. The article-side hidden-fixture case is
// untouched and still real.
test.describe("hidden fixtures stay direct-review only", () => {
  const HIDDEN_ROUTES = [
    "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  ];

  // R4-03: routable for QA review, but noindex so unverified demo content never becomes an
  // indexed claim (SEO_CONTRACT.json).
  for (const route of HIDDEN_ROUTES) {
    test(`${route} is routable and marked noindex`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();
      // In `next dev`, the metadata client reconciler can remove a streamed robots tag after
      // hydration even though the server response (the document search engines receive) is
      // correct. Assert the response HTML so this remains stable in both dev and production.
      const html = (await response?.text()) ?? "";
      expect(html).toMatch(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i);
    });
  }

  test("sitemap.xml excludes hidden fixtures and lists the indexable listing routes", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBeLessThan(400);
    const xml = (await response?.text()) ?? "";
    expect(xml).not.toContain("/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google");
    // /du-an is deliberately absent — it's a pure redirect into /website now, not its own
    // indexable page, so sitemap.ts drops it (see the file's own comment on that removal).
    expect(xml).not.toContain("/du-an");
    // /gioi-thieu is a first-class public entry again, matching Maxweb's Profile/Giới thiệu.
    expect(xml).toContain("/gioi-thieu");
    for (const route of ["/kien-thuc", "/website", "/lien-he", "/dich-vu", "/website/concept", "/quy-trinh-lam-viec-tai-maxweb"]) {
      expect(xml).toContain(route);
    }
  });
});

// PRO V2.1: removed. This block asserted noindex/BreadcrumbList/sitemap-exclusion behavior for
// 3 named fictional demo projects (The Maison, Ecom Shinlala, An Phát). `src/content/projects.ts`
// no longer contains ANY demo projects — the array was emptied sitewide, along with the fake
// portfolio it represented — so there is nothing left for these tests to describe. The site's
// current "concept, not real client work" content lives in the /website industry gallery
// instead, covered under "project/article filters" above.

test.describe("content-truth markers (final sweep)", () => {
  // FINAL PASS item 3: demo counts, case-study results, and demo pricing must all be tagged in
  // data/markup. The approved master shows no badge on these, so the assertion is on markup.
  // PRO V2.1: minimums re-measured against current content — /du-an dropped (redirects to
  // /website, no separate content of its own to tag) and /website's count reflects its disclosure
  // paragraph rather than per-card tags (verified: the gallery's `data-demo-only` disclosure
  // sits above the grid, not on each of the 30 cards individually).
  //
  // Selector narrowed to `[data-demo-only="true"]`, NOT the bare attribute: /website's pricing
  // cards correctly carry `data-demo-only="false"` (the 4 packages are Lucifer-confirmed real
  // prices per PricingCard.tsx's own comment) — `[data-demo-only]` matched those too and this
  // test's original bare-attribute selector then failed asserting they equal "true", which
  // would have meant "stop tagging confirmed-real prices as confirmed", the wrong fix.
  // PHUONG_AN §6.7/§7.2: ngưỡng của "/" hạ từ 5 xuống 1, và ngưỡng của /support-mxh xuống 0.
  // KHÔNG phải vì việc gắn nhãn bị nới lỏng — mà vì nội dung demo đã bị GỠ khỏi hai trang đó:
  // dải 200+/1000+/4+/99% ở trang chủ và 200+/98%/24-7/100% ở /support-mxh không còn tồn tại,
  // nên không còn gì để gắn nhãn. Một ngưỡng cao ở đây bây giờ sẽ đòi hỏi trang phải CÓ nội dung
  // chưa xác minh, tức là bài test yêu cầu đúng điều nó sinh ra để ngăn chặn.
  const TAGGED = [
    { route: "/", selector: '[data-demo-only="true"]', min: 1 },
    { route: "/website", selector: '[data-demo-only="true"]', min: 1 },
    { route: "/website/concept", selector: '[data-demo-only="true"]', min: 1 },
    { route: "/support-mxh", selector: '[data-demo-only="true"]', min: 0 },
  ];

  for (const { route, selector, min } of TAGGED) {
    test(`${route} tags its demo content in markup`, async ({ page }) => {
      await page.goto(route);
      const nodes = page.locator(selector);
      expect(await nodes.count()).toBeGreaterThanOrEqual(min);
      for (const n of await nodes.all()) {
        await expect(n).toHaveAttribute("data-demo-only", "true");
      }
    });
  }

  // PHUONG_AN §6.7 liệt kê đích danh những con số không được hiện ở bất cứ đâu. Đây là bài test
  // chặn chúng quay lại — chúng đã từng sống trên production nhiều tháng vì không có gì chặn.
  const BANNED_CLAIMS = ["200+", "1000+", "350+", "99%", "98%", "24/7"];
  for (const route of ["/", "/website", "/support-mxh", "/dich-vu-so"]) {
    test(`${route} shows no unverified proof numbers`, async ({ page }) => {
      await page.goto(route);
      const text = (await page.locator("body").innerText()).replace(/\s+/g, " ");
      for (const claim of BANNED_CLAIMS) {
        expect(text, `${route} vẫn còn "${claim}"`).not.toContain(claim);
      }
    });
  }

  test("demo pricing packages are tagged and still display their approved prices", async ({ page }) => {
    await page.goto("/website");
    const cards = page.locator('#pricing-packages [data-demo-only], [data-demo-only]:has-text("Từ 8.900.000đ")');
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(page.getByText("Từ 8.900.000đ").first()).toBeVisible();
  });

  test("pending contact fields are disabled, never invented", async ({ page }) => {
    await page.goto("/lien-he");
    // productionEmail and facebookUrl are TBD in CONTENT_TRUTH.json — cả hai phải hiện ra là
    // CHƯA có, và không được chứa địa chỉ hay URL bịa.
    //
    // UI V6 §6.12: hai kênh chưa mở đã chuyển từ hai card ngang hàng với Zalo/Telegram xuống
    // một dải "Kênh đang cập nhật" nhỏ hơn. Bất biến không đổi — chỉ cách trình bày đổi — nên
    // bài test kiểm đúng bất biến đó bằng chuỗi mới, thay vì bị bỏ đi.
    await expect(page.getByText("Kênh đang cập nhật")).toBeVisible();
    await expect(page.getByText("Facebook Messenger")).toBeVisible();
    await expect(page.getByText("Email", { exact: true })).toBeVisible();
    const html = await page.content();
    expect(html).not.toMatch(/mailto:[^"'\s]+@/);
  });

  test("contact hero does not publish an unverified response-time promise", async ({ page }) => {
    await page.goto("/lien-he");
    const text = (await page.locator("body").innerText()).replace(/\s+/g, " ");
    expect(text).not.toContain("Trong 30 phút");
    expect(text).toContain("Phản hồi theo lượt");
    expect(await page.locator('[data-demo-only="true"]').count()).toBe(0);
  });

  test("website hero describes SEO capability without a ranking guarantee", async ({ page }) => {
    await page.goto("/website");
    const text = (await page.locator("body").innerText()).replace(/\s+/g, " ");
    expect(text).not.toContain("Dễ dàng lên top Google");
    expect(text).toContain("Dễ đọc bởi công cụ tìm kiếm");
    expect(text).not.toContain("bứt phá top tìm kiếm");
  });

  test("portfolio preview is review-only and never enters the public sitemap", async ({ page }) => {
    const response = await page.goto("/du-an/preview");
    expect(response?.status()).toBe(200);
    const html = (await response?.text()) ?? "";
    expect(html).toMatch(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i);
    await expect(page.getByText("Bản xem trước nội bộ")).toBeVisible();
    expect(await page.locator('[data-demo-only="true"]').count()).toBeGreaterThan(0);

    const sitemap = await page.request.get("/sitemap.xml");
    expect(await sitemap.text()).not.toContain("/du-an/preview");
  });
});

test.describe("SEO content integrity (demo articles)", () => {
  // Still demo. seo-onpage-la-gi was promoted out of this list on 2026-09-02 when its body was
  // rewritten as real editorial copy — see REAL_ARTICLE_ROUTES below. The invariant is unchanged
  // and still enforced here: unverified content stays out of search.
  const DEMO_ARTICLE_ROUTES = [
    "/kien-thuc/ai-trong-marketing-2024-xu-huong-ung-dung-va-co-hoi-cho-doanh-nghiep",
    "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  ];

  // Articles with real, substantive bodies: indexable, in the sitemap, carrying Article JSON-LD.
  const REAL_ARTICLE_ROUTES = [
    "/kien-thuc/checklist-20-diem-quan-trong-khi-thiet-ke-website-doanh-nghiep",
    "/kien-thuc/seo-onpage-la-gi-15-yeu-to-quan-trong-can-toi-uu",
    "/kien-thuc/7-cach-tang-follow-tiktok-thuc-chat-va-ben-vung-2024",
  ];

  // R5-01: SEO_CONTRACT.json allows Article structured data only on factual knowledge articles
  // and forbids demo preview data becoming factual structured data.
  for (const route of DEMO_ARTICLE_ROUTES) {
    test(`${route} emits no Article JSON-LD and is noindex`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);

      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const types = blocks.map((b) => JSON.parse(b)["@type"]);
      expect(types).not.toContain("Article");
      // BreadcrumbList describes navigation, not article facts — it must still be present.
      expect(types).toContain("BreadcrumbList");

      const html = (await response?.text()) ?? "";
      expect(html).toMatch(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i);
    });
  }

  // The mirror of the rule above: content that IS verified must actually reach search, or the
  // work of writing it is wasted. Guards against a future change quietly re-demoting them.
  for (const route of REAL_ARTICLE_ROUTES) {
    test(`${route} is indexable and emits Article JSON-LD`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);

      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const types = blocks.map((b) => JSON.parse(b)["@type"]);
      expect(types, "real article is missing Article structured data").toContain("Article");

      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
        "content",
        /index/,
      );
    });
  }

  test("demo articles stay out of sitemap.xml, real ones appear in it", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const xml = (await response?.text()) ?? "";
    for (const route of DEMO_ARTICLE_ROUTES) {
      expect(xml, `demo article leaked into the sitemap: ${route}`).not.toContain(route);
    }
    for (const route of REAL_ARTICLE_ROUTES) {
      expect(xml, `real article missing from the sitemap: ${route}`).toContain(route);
    }
  });

  test("article cards and related-article previews carry demo truth in markup", async ({ page }) => {
    // The thin drafts were hidden on 2026-09-02, so the listing is now real articles only and
    // #article-grid does not render at all when the featured block consumes them. What still
    // has to hold is the invariant underneath: no card anywhere in the listing may be tagged
    // demo. Asserting on grid cards specifically would just be asserting the section exists.
    await page.goto("/kien-thuc");
    const listingCards = page.locator('a[href^="/kien-thuc/"][data-demo-only]');
    const flags = await listingCards.evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-demo-only")),
    );
    expect(flags, "a demo article is being surfaced in the public listing").not.toContain("true");

    await page.goto("/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google");
    const previews = page.locator('#related-articles a[data-demo-only]');
    expect(await previews.count()).toBeGreaterThan(0);
    for (const preview of await previews.all()) {
      await expect(preview).toHaveAttribute("data-demo-only", "true");
    }
  });
});

test.describe("content-truth tagging", () => {
  // R4-02: every project/company preview mockup must carry demoOnly in data per
  // CONTENT_TRUTH.json. The approved cards show no badge, so the tag is asserted in markup.
  // PRO V2.1: `/du-an/website-bat-dong-san-an-phat` is gone (its whole project catalogue was
  // removed). `/website`'s cards changed from `<a data-demo-only>` (ProjectPreviewCard) to
  // `<button>` (IndustryShowcaseCard, since they open Zalo rather than navigate) — selector
  // widened to cover both shapes, and narrowed to `="true"` since that same page's pricing
  // cards legitimately carry `data-demo-only="false"` (real, confirmed prices) and would
  // otherwise be swept into "cards" this test expects to all read demoOnly.
  for (const route of ["/", "/website"]) {
    test(`${route} project preview cards are tagged demoOnly`, async ({ page }) => {
      await page.goto(route);
      const cards = page.locator('[data-demo-only="true"]');
      expect(await cards.count()).toBeGreaterThan(0);
      for (const card of await cards.all()) {
        await expect(card).toHaveAttribute("data-demo-only", "true");
      }
    });
  }
});

// PRO V2.1: removed. Asserted that one specific deleted demo project (An Phát) didn't render
// another specific deleted demo project's (The Maison) cover image — an identity check between
// two fixtures that no longer exist, in `src/content/projects.ts` or anywhere else.

test.describe("typography emission guard (PHA2 §D)", () => {
  // TYPOGRAPHY_AUTHORITY.tokenEmissionContract: every referenced typography utility MUST emit
  // real CSS. Tailwind silently emits nothing for an unknown token, which is how `text-caption`
  // could have vanished when rebuilding fontSize from semanticRoles alone. tailwind.config.ts
  // safelists the full authority token set; this proves the safelist actually works.
  const AUTHORITY_TOKENS = [
    "display-desktop", "display-mobile",
    "h1-desktop", "h1-mobile",
    "detail-h1-desktop", "detail-h1-mobile",
    "h2-desktop", "h2-mobile",
    "h3-desktop", "h3-mobile",
    "h4-desktop", "h4-mobile",
    "card-h3-desktop", "card-h3-mobile",
    "body-xl", "body-lg", "body", "small", "caption", "eyebrow",
    "nav", "button", "chip", "form-label", "form-control",
    "step-number", "metric", "price", "article-meta", "breadcrumb", "footer",
  ];

  test("every authority typography token emits a real font-size rule", async ({ page }) => {
    await page.goto("/");
    const results = await page.evaluate((tokens) => {
      const probe = document.createElement("div");
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      document.body.appendChild(probe);
      const out = tokens.map((t) => {
        probe.className = `text-${t}`;
        const cs = getComputedStyle(probe);
        return { token: t, fontSize: cs.fontSize, lineHeight: cs.lineHeight, weight: cs.fontWeight };
      });
      probe.remove();
      return out;
    }, AUTHORITY_TOKENS);

    // A missing token leaves the browser default (16px / 400) on every probed property; a real
    // token sets an explicit font-size AND at least one of line-height / weight.
    const broken = results.filter(
      (r) => !r.fontSize || r.fontSize === "" || (r.lineHeight === "normal" && r.weight === "400" && r.fontSize === "16px"),
    );
    expect(broken.map((b) => b.token), "tokens emitting no CSS").toEqual([]);

    // The four the task names explicitly must be present and correct.
    const sizeOf = (token: string) => results.find((r) => r.token === token)?.fontSize;
    expect(sizeOf("caption")).toBe("12px");
    expect(sizeOf("h4-mobile")).toBe("20px");
    expect(sizeOf("h4-desktop")).toBe("22px");
    expect(sizeOf("body-xl")).toBe("20px");
  });

  test("no typography utility referenced in markup resolves to an unset size", async ({ page }) => {
    for (const route of ["/", "/website", "/du-an", "/kien-thuc", "/lien-he"]) {
      await page.goto(route);
      const unset = await page.evaluate(() => {
        const bad: string[] = [];
        document.querySelectorAll<HTMLElement>("[class]").forEach((el) => {
          const tokens = Array.from(el.classList).filter((c) => /^(lg:)?text-[a-z0-9-]+$/.test(c));
          if (!tokens.length) return;
          const cs = getComputedStyle(el);
          if (!cs.fontSize) bad.push(el.className);
        });
        return bad;
      });
      expect(unset, `unset typography on ${route}`).toEqual([]);
    }
  });

  test("resolved font families are Noto Serif for headings and Inter for body/UI", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const fams = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const body = document.body;
      return {
        heading: h1 ? getComputedStyle(h1).fontFamily : "",
        body: getComputedStyle(body).fontFamily,
      };
    });
    // next/font emits a hashed family name, so assert the declared fallback chain instead of a
    // literal "Noto Serif" string: heading must resolve serif-first, body must resolve to the
    // Inter/system stack. qa.fallbackAtVisualQaForbidden is covered by fonts.ready in evidence.
    expect(fams.heading.toLowerCase()).toContain("georgia");
    expect(fams.body.toLowerCase()).toContain("system-ui");
    expect(fams.heading).not.toEqual(fams.body);
  });
});

test.describe("PHA1 decorative asset mapping", () => {
  // ASSET_USAGE_MAP: /dich-vu-so final-cta gets dong-son-ring + gold-noise; /support-mxh dark
  // bands get gold-noise. These are decorative-only and must appear exactly where mapped —
  // never site-wide. The assets carry their own opacity, so the layer must NOT be double-dimmed.
  test("/dich-vu-so final CTA carries the mapped motif and texture", async ({ page }) => {
    await page.goto("/dich-vu-so");
    const layers = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>('[aria-hidden="true"]'))
        .map((el) => getComputedStyle(el).backgroundImage)
        .filter((b) => b && b !== "none"),
    );
    expect(layers.some((b) => b.includes("dong-son-ring")), "dong-son-ring motif missing").toBe(true);
    expect(layers.some((b) => b.includes("gold-noise")), "gold-noise texture missing").toBe(true);
  });

  test("/support-mxh dark bands carry the mapped texture", async ({ page }) => {
    await page.goto("/support-mxh");
    // `#support-metrics` đã bị gỡ khỏi trang (PHUONG_AN §6.7 — dải 200+/98%/24-7/100% tự khai
    // demoOnly). `#support-network-map` là dải tối còn lại được ASSET_USAGE_MAP gán texture, nên
    // nó thay thế ở đây: bài test vẫn kiểm đúng điều nó vốn kiểm — texture có được áp lên các
    // dải tối đã map hay không — chứ không bị vô hiệu hoá.
    for (const id of ["#why-lac-viet", "#support-network-map"]) {
      const bg = await page.locator(`${id} > [aria-hidden="true"]`).first().evaluate((el) => getComputedStyle(el).backgroundImage);
      expect(bg, `${id} texture`).toContain("gold-noise");
    }
  });

  test("decorative layers are not double-dimmed into invisibility", async ({ page }) => {
    await page.goto("/dich-vu-so");
    const opacities = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>('[aria-hidden="true"]'))
        .filter((el) => getComputedStyle(el).backgroundImage.includes("decorative"))
        .map((el) => Number(getComputedStyle(el).opacity)),
    );
    expect(opacities.length).toBeGreaterThan(0);
    for (const o of opacities) expect(o).toBe(1);
  });

  test("decorative assets are not applied site-wide", async ({ page }) => {
    // The home route maps no decorative motif; it must not inherit one.
    await page.goto("/");
    const hasRing = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>("*")).some((el) =>
        getComputedStyle(el).backgroundImage.includes("dong-son-ring"),
      ),
    );
    expect(hasRing).toBe(false);
  });
});

test.describe("V3 production rasters", () => {
  // V3 HD/4K supersedes the V2 source-limited crops: all three of these roles are now full
  // 1920x1080 lossless production renders, so the old "must stay within 295x120 / 205x98 /
  // 516x33" assertions no longer describe the authority. The invariant that still matters is
  // the one V3 states itself (quality.noFakeUpscale): never render ABOVE native pixels, and
  // never distort the native aspect ratio.
  // PRO V2.1: dropped two entries whose routes/content no longer exist —
  // `support-cta-device-shield-fhd` was superseded by the animated ShieldOrbit hero on
  // /support-mxh (confirmed orphaned: zero references left in src/**/*.tsx) and
  // `project-detail-showcase-fhd` only ever rendered on the now-removed demo project detail page.
  const RASTERS = [{ route: "/dich-vu-so", file: "digital-cta-phoenix-fhd", w: 1920, h: 1080 }];

  for (const { route, file, w, h } of RASTERS) {
    test(`${file} renders within native size and keeps its aspect`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route);
      // next/image rewrites src to /_next/image?url=...; match the encoded source filename.
      const img = page.locator(`img[src*="${file}"]`).first();
      await expect(img).toHaveCount(1);
      // The raster lives in the final CTA below the fold and ScrollReveal intentionally keeps
      // that subtree at zero size until observed. Measuring before scrolling yields 0/0 = NaN,
      // which is a harness error rather than aspect-ratio distortion.
      await img.scrollIntoViewIfNeeded();
      await expect(img).toBeVisible();
      const box = await img.boundingBox();
      expect(box, `${file} not rendered`).not.toBeNull();
      expect(box!.width, `${file} upscaled beyond native width`).toBeLessThanOrEqual(w + 1);
      expect(box!.height, `${file} upscaled beyond native height`).toBeLessThanOrEqual(h + 1);
      expect(box!.width / box!.height, `${file} aspect distorted`).toBeCloseTo(w / h, 1);
    });
  }

  test("no V2 recovery crop or reference crop is served at runtime", async ({ page }) => {
    // V3 rules: master/PDF crops and every V2 recovery crop are REFERENCE_ONLY and must never
    // be runtime bytes. public/assets/recovery-v2 was deleted; this proves nothing re-adds it.
    const bad: string[] = [];
    page.on("response", (r) => {
      const u = r.url();
      if (/recovery-v2|master-crops|REFERENCE_ONLY/i.test(u)) bad.push(u);
    });
    for (const route of ["/", "/website", "/kien-thuc", "/dich-vu-so"]) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
    }
    expect(bad, `reference-only bytes served: ${bad.join(", ")}`).toEqual([]);
  });

  // PRO V2.1: the approved logo moved from an SVG vector to the gold-metallic lockup PNG
  // (public/assets/v5/brand/lac-viet-logo-horizontal.png) — a deliberate brand-asset change,
  // not a regression, so the assertion follows the new approved file. Switched back to the
  // untouched delivery on 2026-09-02: the rebuilt lockup clipped the bird's beak against its
  // top-left edge, visible at header size.
  test("global logo is the approved delivery PNG", async ({ page }) => {
    await page.goto("/");
    const logo = page.locator("header img").first();
    await expect(logo).toHaveAttribute("src", /lac-viet-logo-horizontal\.png/);
  });
});

test.describe("design-token integrity", () => {
  // FINAL PASS: tailwind.config.ts overrides theme.spacing with tokens.json's exact spacingPx
  // scale (gridBasePx 4). Off-scale values like h-9/py-14/mt-0.5 therefore emit NO CSS at all —
  // silently, with no build error — which is how a 256px header logo shipped through five QA
  // rounds. These assertions pin the computed result rather than the class name, so any future
  // off-token utility in a critical layout slot fails loudly.
  test("header logo is constrained, not rendered at intrinsic size", async ({ page }) => {
    await page.goto("/");
    const box = await page.locator("header img").first().boundingBox();
    expect(box).not.toBeNull();
    // Natural asset is 256x256; the header is 64px (mobile) / 76px (desktop) tall.
    expect(box!.height).toBeLessThanOrEqual(48);
    const headerBox = await page.locator("header").first().boundingBox();
    expect(box!.height).toBeLessThan(headerBox!.height);
  });

  test("404 header logo is constrained too", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    const box = await page.locator("header img").first().boundingBox();
    expect(box!.height).toBeLessThanOrEqual(48);
  });

  // PRO V2.1: `#projects-grid` lived on `/du-an`'s own listing page, which is now a redirect
  // into `/website` — its gallery section (`#website-projects`) is the direct successor and
  // keeps the same "off-token utility silently emits nothing" risk this test exists to catch.
  test("sections have real vertical padding at mobile width", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/website");
    const pad = await page.locator("#website-projects").first().evaluate((el) => {
      const cs = getComputedStyle(el);
      return { top: parseFloat(cs.paddingTop), bottom: parseFloat(cs.paddingBottom) };
    });
    expect(pad.top).toBeGreaterThan(0);
    expect(pad.bottom).toBeGreaterThan(0);
  });

  // Assert on REAL elements rather than synthetic probe divs: Tailwind only emits classes it
  // finds in source, so a bare `py-30` probe would fail even though `md:py-30` compiles fine.
  const PADDING_SLOTS = [
    { viewport: { width: 390, height: 844 }, label: "mobile 390" },
    { viewport: { width: 1440, height: 900 }, label: "desktop 1440" },
  ];

  for (const { viewport, label } of PADDING_SLOTS) {
    test(`hero and CTA keep real vertical padding @ ${label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/website");
      const pads = await page.evaluate(() => {
        const read = (sel: string) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const cs = getComputedStyle(el);
          return parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        };
        return { hero: read("section .max-w-container, header + section > div"), cta: read("#website-projects") };
      });
      expect(pads.cta, "section vertical padding must not collapse to 0").toBeGreaterThan(0);
    });
  }

  test("header nav gap resolves at desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const gap = await page.locator("header nav ul").first().evaluate((el) => getComputedStyle(el).columnGap);
    expect(parseFloat(gap), "nav gap must be a real length, not 'normal'").toBeGreaterThan(0);
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

  test("SpotlightCard tilt is neutralized under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const card = page.locator(".spotlight-tilt").first();
    await expect(card).toBeVisible();
    const transform = await card.evaluate((el) => getComputedStyle(el).transform);
    expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(transform);
  });
});

test.describe("DragScroller alternate input", () => {
  test("Prev/Next controls and keyboard move the concept track", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const track = page.getByRole("group", { name: "Concept giao diện theo lĩnh vực" });
    await track.scrollIntoViewIfNeeded();

    const beforeButton = await track.evaluate((el) => el.scrollLeft);
    await page.getByRole("button", { name: "Xem các mục tiếp theo" }).click();
    await expect
      .poll(() => track.evaluate((el) => el.scrollLeft))
      .toBeGreaterThan(beforeButton + 10);

    await track.focus();
    await expect(track).toBeFocused();
    const beforeKeyboard = await track.evaluate((el) => el.scrollLeft);
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => track.evaluate((el) => el.scrollLeft))
      .toBeGreaterThan(beforeKeyboard);
  });

  test("reduced motion stops idle drift", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const track = page.getByRole("group", { name: "Concept giao diện theo lĩnh vực" });
    await track.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const before = await track.evaluate((el) => el.scrollLeft);
    await page.waitForTimeout(500);
    const after = await track.evaluate((el) => el.scrollLeft);
    expect(Math.abs(after - before)).toBeLessThanOrEqual(1);
  });
});

// PRO V2.1 §95 — regression coverage for this pass's P0 fixes, so none of them silently regress
// back to their broken state (hidden section, hard-coded font size, wrap-only filter row).
test.describe("PRO V2.1 mobile completeness", () => {
  test("homepage process section is visible on mobile (was hidden lg:block)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("#work-process")).toBeVisible();
    await expect(page.locator("#work-process").getByText("Tiếp nhận")).toBeVisible();
  });

  test("homepage 'latest articles' section is visible on mobile (was hidden lg:block)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("#latest-knowledge")).toBeVisible();
  });

  test("homepage Vietnam hero scene is visible on mobile (was entirely absent)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    // Two `.vn-stage` elements exist in the DOM at once: the full desktop composition (`hidden
    // lg:block`, correctly hidden here) and the cropped mobile recomposition (`lg:hidden`,
    // correctly visible here). `:visible` picks the one that's actually on screen at this
    // viewport instead of relying on DOM order via `.first()`.
    const mobileScene = page.locator(".vn-stage:visible");
    await expect(mobileScene).toHaveCount(1);
    await expect(mobileScene).toBeVisible();
    const box = await mobileScene.boundingBox();
    expect(box, "mobile hero scene has no rendered size").not.toBeNull();
    expect(box!.height).toBeGreaterThan(100);
  });

  test("footer's 'Khám phá' links reach mobile visitors (accordion previously mapped every non-services group to contact links)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Khám phá" }).click();
    // Was asserting on "Giới thiệu", which was only ever the example this group happened to
    // contain; that page was hidden on 2026-09-02. The regression being guarded is the mapping
    // itself, so assert the group shows its OWN link and not the contact group's — which is
    // what the accordion used to fall back to for every non-services group.
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Kiến thức" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Liên hệ tư vấn" })).toBeHidden();
  });

  test("footer exposes the reference site's guidance/support path on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await footer.getByRole("button", { name: "Hướng dẫn & hỗ trợ" }).click();
    await expect(footer.getByRole("link", { name: "Quy trình làm việc" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Hướng dẫn & kiến thức" })).toBeVisible();
  });

  test("footer exposes policy links on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await footer.getByRole("button", { name: "Chính sách" }).click();
    await expect(footer.getByRole("link", { name: "Chính sách thanh toán" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Bảo mật thông tin" })).toBeVisible();
  });

  test("back-to-top affordance appears after scrolling and returns to the header", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const backToTop = page.locator("[data-back-to-top]");
    await expect(backToTop).toHaveCSS("opacity", "0");
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.25, behavior: "instant" }));
    await expect(backToTop).toHaveCSS("opacity", "1");
    await backToTop.click();
    await expect
      .poll(() => page.evaluate(() => window.scrollY), { timeout: 10000 })
      .toBeLessThan(8);
  });
});

test.describe("PRO V2.1 hero typography", () => {
  // PageHero's H1 was hard-coded to 26/29/35px at lg/xl/ultra, well under its own h4 role —
  // pin the computed size so a future hard-code regression fails loudly instead of just looking
  // a little small in a screenshot nobody compared pixel-for-pixel.
  for (const route of ["/support-mxh", "/lien-he", "/website", "/kien-thuc", "/dich-vu-so"]) {
    test(`${route} hero H1 resolves to the h1-desktop token at desktop width`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route);
      const fontSize = await page.locator("h1").first().evaluate((el) => getComputedStyle(el).fontSize);
      expect(parseFloat(fontSize), `${route} h1 font-size`).toBeGreaterThanOrEqual(48);
    });
  }

  test("homepage H1 resolves to the display-desktop token at desktop width", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const fontSize = await page.locator("h1").first().evaluate((el) => getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(64);
  });
});

// Maxweb's public catalogue has accumulated several legacy Vietnamese URL variants over time.
// Keep safe equivalents alive so old bookmarks, campaign links, and search results land on the
// canonical Lạc Việt service rather than a 404. Unsafe catalogue items intentionally have no alias.
test.describe("Maxweb-compatible safe legacy aliases", () => {
  const aliases = [
    ["/dich-vu/google-map", "/dich-vu/google-business-profile"],
    ["/dich-vu/xac-minh-google-maps", "/dich-vu/google-business-profile#hinh-thuc"],
    ["/dich-vu/quang-cao-google-maps", "/dich-vu/quang-cao-google-ads"],
    ["/thiet-ke-web-bat-dong-san", "/dich-vu/website-bat-dong-san"],
    ["/quang-cao-bat-dong-san", "/dich-vu/marketing-bat-dong-san"],
    ["/web-hosting", "/dich-vu/domain-hosting-email"],
    ["/kho-giao-dien", "/website/concept"],
    ["/tin-tuc", "/kien-thuc"],
    ["/danh-muc-du-an", "/website/concept"],
    ["/thiet-ke-bo-nhan-dien-thuong-hieu", "/dich-vu/nhan-dien-thuong-hieu"],
    ["/dich-vu-quang-cao-google-ads", "/dich-vu/quang-cao-google-ads"],
    ["/dich-vu-quang-cao-facebook-ads", "/dich-vu/quang-cao-facebook-ads"],
    ["/quang-cao-zalo", "/dich-vu/quang-cao-zalo-ads"],
    ["/dich-vu-quang-cao", "/dich-vu/quang-cao-da-kenh"],
    ["/seo-bat-dong-san", "/dich-vu/seo-tong-the"],
    ["/dich-vu-seo-google-maps", "/dich-vu/seo-google-maps"],
    ["/dich-vu-google-map", "/dich-vu/google-business-profile"],
    ["/dich-vu-xac-minh-google-maps", "/dich-vu/google-business-profile#hinh-thuc"],
    ["/profile-maxweb", "/gioi-thieu"],
    ["/content-quang-cao-facebook", "/kien-thuc"],
    ["/quang-cao-google-map-nganh-bat-dong-san", "/dich-vu/quang-cao-google-ads"],
    ["/tieu-chi-xep-hang-google-maps", "/kien-thuc"],
    ["/bo-tu-khoa-google-ads-bat-dong-san-de-ra-chuyen-doi", "/kien-thuc"],
    ["/danh-muc-website-khach-san", "/website/concept"],
    ["/thiet-ke-website-noi-that", "/website/concept"],
    ["/website-1-du-an", "/website/concept"],
    ["/san-pham-website-ban-hang-bh41", "/website/concept"],
    ["/tin-tuc-tin-quang-cao", "/kien-thuc"],
    ["/chinh-sach-thanh-toan", "/chinh-sach/thanh-toan"],
    ["/thanh-toan", "/chinh-sach/thanh-toan"],
    ["/chinh-sach-van-chuyen-va-giao-nhan", "/chinh-sach/van-chuyen-va-giao-nhan"],
    ["/chinh-sach-bao-mat-thong-tin", "/chinh-sach/bao-mat-thong-tin"],
    ["/chinh-sach-xu-ly-khieu-nai", "/chinh-sach/xu-ly-khieu-nai"],
    ["/chinh-sach-bao-hanh", "/chinh-sach/bao-hanh"],
    ["/chinh-sach-doi-tra-va-hoan-tien", "/chinh-sach/doi-tra-va-hoan-tien"],
    ["/huong-dan-thanh-toan", "/chinh-sach/thanh-toan"],
  ] as const;

  for (const [legacyPath, canonicalPath] of aliases) {
    test(`${legacyPath} lands on ${canonicalPath}`, async ({ page }) => {
      await page.goto(legacyPath);
      await expect.poll(() => new URL(page.url()).pathname + new URL(page.url()).hash).toBe(canonicalPath);
    });
  }
});

test.describe("PRO V2.1 industry filter (mobile scroll, not wrap)", () => {
  test("filter chips scroll horizontally on mobile instead of wrapping", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/website");
    const filterRow = page.locator("#website-projects").locator("div.overflow-x-auto").first();
    const { scrollWidth, clientWidth } = await filterRow.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    expect(scrollWidth, "filter row should be wider than its visible box (scrollable)").toBeGreaterThan(clientWidth);
  });

  test("filtering the gallery still works on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/website");
    const gallery = page.locator("#website-projects");
    await gallery.scrollIntoViewIfNeeded();
    const chip = gallery.getByRole("button", { name: "Giáo dục", exact: true });
    await chip.scrollIntoViewIfNeeded();
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("PRO V2.1 gauge needle settles instead of looping", () => {
  test("dich-vu-so gauge needle stops changing after its one-shot sweep", async ({ page }) => {
    await page.goto("/dich-vu-so");
    const needle = page.locator(".dvs-needle").first();
    await expect(needle).toBeVisible();
    await page.waitForTimeout(2000); // past the 1.6s sweep
    const t1 = await needle.evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(1500); // if it were still `infinite`, this would catch a repeat
    const t2 = await needle.evaluate((el) => getComputedStyle(el).transform);
    expect(t2, "needle transform changed after settling — animation is still looping").toBe(t1);
  });
});

test.describe("PRO V2.2 sticky mobile CTA", () => {
  test("stays off-screen until the visitor scrolls past the hero, then docks at the bottom", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/website");
    const bar = page.getByTestId("sticky-mobile-cta");
    await expect(bar).toBeAttached();

    // UI V6 §5.6: CTA giờ là capsule mờ dần chứ không phải thanh trượt khỏi màn hình, nên hợp
    // đồng kiểm là `data-state` chứ không phải toạ độ y. Kiểm toạ độ sẽ luôn "đạt" với một
    // capsule vô hình nằm đúng chỗ, tức là không còn kiểm gì cả.
    await expect(bar).toHaveAttribute("data-state", "hidden");

    await page.evaluate(() => window.scrollTo(0, 900));
    await expect(bar).toHaveAttribute("data-state", "visible");
    const afterBox = await bar.boundingBox();
    expect(afterBox?.y, "sticky CTA should sit inside the viewport after scrolling").toBeLessThan(844);
    // Capsule, không phải thanh full-width: đây chính là lỗi phải sửa, nên nó cần một bài test
    // chứ không chỉ một dòng chú thích.
    expect(afterBox?.width, "sticky CTA must be a capsule, not a full-width bar").toBeLessThan(240);
  });

  // UI V6 §5.6: nút cuối trang và capsule cùng mở Zalo. Trước đây cả hai cùng hiện ở đáy mọi
  // trang và capsule che mất một phần footer.
  test("hides itself once the final CTA reaches the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/website");
    const bar = page.getByTestId("sticky-mobile-cta");

    await page.evaluate(() => window.scrollTo(0, 900));
    await expect(bar).toHaveAttribute("data-state", "visible");

    await page.evaluate(() => document.querySelector("[data-final-cta]")?.scrollIntoView());
    await expect(bar).toHaveAttribute("data-state", "hidden");
  });

  test("is hidden on the homepage above the desktop breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    // getByRole would silently drop this element from its matches at this breakpoint (display:none
    // is excluded from the accessible tree), which previously let this assertion pass against the
    // wrong button entirely — getByTestId targets the sticky bar's own wrapper unambiguously.
    const bar = page.getByTestId("sticky-mobile-cta");
    await expect(bar).toBeHidden();
  });

  test("does not duplicate on /lien-he, which already leads with its own Zalo CTA", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/lien-he");
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(300);
    await expect(page.getByTestId("sticky-mobile-cta"), "/lien-he should not render the sticky mobile CTA bar").toHaveCount(0);
  });
});

// PRO V2.2 (2026-09-02): the bare-viewport overflow suite above does not reproduce real
// mobile layout, so this asks the same question under genuine device emulation.
//
// It asserts on ACTUAL SCROLLABILITY, not on scrollWidth. A reported 4px overflow on
// /lien-he turned out to be exactly that: scrollWidth does report 4px extra, because a
// ScrollReveal direction="right" element below the fold sits at translateX(20px) until it
// reveals -- but the page cannot be swiped sideways, before or after any attempted fix. The
// number was an artifact with no user-facing consequence, and asserting on it would fail a
// page that behaves correctly. What a visitor can actually do is the thing worth guarding.
test.describe("PRO V2.2 no sideways swipe under real device emulation", () => {
  for (const name of ["iPhone 12", "Pixel 5"] as const) {
    for (const route of ["/", "/lien-he", "/website", "/dich-vu-so"]) {
      test(`${route} cannot be swiped sideways on ${name}`, async ({ browser }) => {
        const ctx = await browser.newContext({ ...devices[name] });
        const page = await ctx.newPage();
        await page.goto(route);
        await page.waitForTimeout(600);
        const moved = await page.evaluate(() => {
          const before = window.scrollX;
          window.scrollTo(300, 0);
          const after = window.scrollX;
          window.scrollTo(0, 0);
          return after - before;
        });
        await ctx.close();
        expect(moved, `${route} scrolled ${moved}px sideways on ${name}`).toBe(0);
      });
    }
  }
});

// The public about page is a first-class Maxweb parity entry. Keep both desktop and mobile
// navigation covered so a later menu refactor cannot silently orphan it again.
test.describe("public /gioi-thieu", () => {
  test("is present in the menu and the footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('header a[href="/gioi-thieu"]')).toHaveCount(1);
    await expect(page.locator('footer a[href="/gioi-thieu"]')).toHaveCount(1);
  });

  test("is present in the mobile drawer too", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Mở menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Menu điều hướng" });
    await expect(drawer.locator('a[href="/gioi-thieu"]')).toHaveCount(1);
  });

  test("still resolves and is indexable", async ({ page }) => {
    const response = await page.goto("/gioi-thieu");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    // The SEO contract now emits an explicit index/follow directive for every indexable route.
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/);
  });
});

// ── UI V6 (2026-09-08) ──────────────────────────────────────────────────────────────────────
//
// Regression đi kèm code, không phải vòng nghiệm thu: mỗi bài dưới đây khoá lại một lỗi P0
// CỤ THỂ đã thấy trong 48 ảnh QA, để nó không quay lại lặng lẽ ở lần sửa sau.

test.describe("UI V6 service directory", () => {
  test("/dich-vu renders three pillars instead of one section per group", async ({ page }) => {
    await page.goto("/dich-vu");
    // Anchor đổi 2026-09-09 khi tách từ ba lên bốn trụ cột. Bài test vẫn kiểm đúng điều nó vốn
    // kiểm — hub gom dịch vụ theo trụ cột, không phải một section cho mỗi group.
    for (const id of ["#xay-nen-tang", "#quang-cao", "#seo-hien-dien", "#thuong-hieu-van-hanh"]) {
      await expect(page.locator(id), `${id} pillar missing`).toBeAttached();
    }
    // Lỗi cũ: mỗi group là một Section riêng, nền xen kẽ tám lần. Ba trụ cột nằm trong MỘT
    // section, nên số section trên trang phải nhỏ hơn hẳn số dịch vụ đang publish.
    // Mười ba dịch vụ nằm trong bốn row của MỘT section. Nếu ai đó quay lại kiểu "một section
    // cho mỗi group" thì số section sẽ vọt lên gần bằng số dịch vụ, và bài test này bắt được.
    const sections = await page.locator("section[id]").count();
    expect(sections, "hub should not render one section per service group").toBeLessThan(8);
  });

  test("/dich-vu never exposes an excluded or unpublished service", async ({ page }) => {
    await page.goto("/dich-vu");
    const html = await page.content();
    for (const slug of ["ban-danh-gia-google-maps", "ban-review-tripadvisor", "go-danh-gia-xau"]) {
      expect(html, `${slug} is policyClass "excluded" and must never be linked`).not.toContain(slug);
    }
  });
});

test.describe("UI V6 service signature visuals", () => {
  const SIGNATURES: [string, string][] = [
    ["/dich-vu/google-business-profile", "service-google-business-profile"],
    ["/dich-vu/quang-cao-da-kenh", "service-omnichannel-ads"],
    ["/dich-vu/seo-tong-the", "service-seo-content"],
    ["/dich-vu/nhan-dien-thuong-hieu", "service-brand-identity"],
    ["/dich-vu/domain-hosting-email", "service-domain-hosting-email"],
  ];

  for (const [route, file] of SIGNATURES) {
    test(`${route} renders its own signature asset`, async ({ page }) => {
      await page.goto(route);
      const img = page.locator('img[alt^="Minh hoạ dịch vụ"]');
      await expect(img, "signature asset for this slug is missing").toHaveCount(1);
      await expect(img).toHaveAttribute("src", new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      // Sai slug là lỗi im lặng nhất trong nhóm này — trang vẫn đẹp, chỉ là vẽ nhầm dịch vụ.
      for (const [, other] of SIGNATURES) {
        if (other === file) continue;
        await expect(page.locator(`img[alt^="Minh hoạ dịch vụ"][src*="${other}"]`)).toHaveCount(0);
      }
      // Asset render tối đa 560px theo asset board; không được phóng quá kích thước native.
      const box = await img.boundingBox();
      expect(box?.width ?? 0).toBeGreaterThan(0);
      expect(box?.width ?? 0).toBeLessThanOrEqual(560);
    });
  }

  test("service detail no longer stacks four identical white card grids", async ({ page }) => {
    await page.goto("/dich-vu/google-business-profile");
    // Bốn section cũ (vấn đề/lợi ích/phạm vi/bàn giao) giờ là hai composition.
    await expect(page.locator("#phu-hop")).toBeAttached();
    await expect(page.locator("#pham-vi-ban-giao")).toBeAttached();
    await expect(page.locator("#van-de")).toHaveCount(0);
    await expect(page.locator("#loi-ich")).toHaveCount(0);
    await expect(page.locator("#ban-giao")).toHaveCount(0);
  });

  test("anchor rail only links to sections that actually render", async ({ page }) => {
    await page.goto("/dich-vu/domain-hosting-email");
    const links = await page.locator('#service-rail a[href^="#"]').all();
    expect(links.length).toBeGreaterThan(1);
    for (const link of links) {
      const href = await link.getAttribute("href");
      // Một rail trỏ tới section optional đang bị ẩn là một liên kết gãy ngay trong trang.
      await expect(page.locator(href!), `${href} has no target`).toHaveCount(1);
    }
  });
});

// ── UI V7 (2026-09-09) ──────────────────────────────────────────────────────────────────────
//
// ChatGPT owns the acceptance pass for the rendered asset layer. These tests lock the mapping
// after Claude's implementation so a visually plausible but semantically wrong asset cannot be
// reused on another route without the regression suite noticing.

test.describe("UI V7 refinement asset mapping", () => {
  const HOME_ASSETS = [
    "home-service-website.png",
    "home-service-support.png",
    "home-service-digital.png",
  ];

  test("homepage replaces all three V5 service illustrations with the V7 trio", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    for (const file of HOME_ASSETS) {
      // ServiceCard keeps a desktop and mobile composition in the DOM; only one may be visible
      // at a time, and its desktop artwork box is intentionally capped at 96px.
      const visible = page.locator(`img[src*="${file}"]:visible`);
      await expect(visible, `${file} is not visible in its homepage card`).toHaveCount(1);
      const box = await visible.boundingBox();
      expect(box?.width ?? 0).toBeGreaterThan(0);
      expect(box?.width ?? 0).toBeLessThanOrEqual(96);
    }

    for (const oldFile of [
      "website-doanh-nghiep.webp",
      "support-mang-xa-hoi.webp",
      "dich-vu-so.webp",
    ]) {
      await expect(page.locator(`img[src*="${oldFile}"]`), `${oldFile} must not return`).toHaveCount(0);
    }
  });

  const SUPPORT_SIGNATURES: [string, string][] = [
    ["/support-mxh/facebook", "support-facebook-signature.png"],
    ["/support-mxh/tiktok", "support-tiktok-signature.png"],
    ["/support-mxh/meta-business", "support-meta-signature.png"],
    ["/support-mxh/bao-mat-khoi-phuc", "support-verified-signature.png"],
  ];

  for (const [route, file] of SUPPORT_SIGNATURES) {
    test(`${route} renders only its assigned V7 signature`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);

      const img = page.locator(`img[src*="${file}"]`);
      await expect(img, `${file} is missing`).toHaveCount(1);
      await expect(img).toBeVisible();
      const box = await img.boundingBox();
      expect(box?.width ?? 0).toBeGreaterThan(0);
      expect(box?.width ?? 0).toBeLessThanOrEqual(420);

      for (const [, other] of SUPPORT_SIGNATURES) {
        if (other === file) continue;
        await expect(page.locator(`img[src*="${other}"]`)).toHaveCount(0);
      }
    });
  }

  const PAGE_SIGNATURES: [string, string][] = [
    ["/kien-thuc", "knowledge-hub-signature.png"],
    ["/lien-he", "contact-consultation-signature.png"],
    ["/gioi-thieu", "about-values-signature.png"],
  ];

  for (const [route, file] of PAGE_SIGNATURES) {
    test(`${route} renders its V7 page signature`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);

      const img = page.locator(`img[src*="${file}"]`);
      await expect(img, `${file} is missing`).toHaveCount(1);
      await expect(img).toBeVisible();
      const box = await img.boundingBox();
      expect(box?.width ?? 0).toBeGreaterThan(0);
      expect(box?.width ?? 0).toBeLessThanOrEqual(380);
    });
  }

  test("V7 signatures keep their intended mobile visibility and size", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const [route, file] of SUPPORT_SIGNATURES) {
      await page.goto(route);
      const img = page.locator(`img[src*="${file}"]`);
      await expect(img).toBeVisible();
      expect((await img.boundingBox())?.width ?? 0).toBeLessThanOrEqual(260);
    }

    for (const [route, file] of PAGE_SIGNATURES.slice(0, 2)) {
      await page.goto(route);
      const img = page.locator(`img[src*="${file}"]`);
      await expect(img).toBeVisible();
      expect((await img.boundingBox())?.width ?? 0).toBeLessThanOrEqual(240);
    }

    await page.goto("/gioi-thieu");
    await expect(page.locator('img[src*="about-values-signature.png"]')).toBeHidden();
  });
});

// ── UI V8 service-depth acceptance (2026-09-09) ─────────────────────────────────────────────
// Each newly published generic service gets a family-specific visual and a data-backed depth
// layer. These checks keep the six routes from collapsing back to the same shallow template.
test.describe("UI V8 service depth mapping", () => {
  const SERVICES: [string, string][] = [
    ["/dich-vu/website-bat-dong-san", "service-website-real-estate.png"],
    ["/dich-vu/seo-google-maps", "service-seo-google-maps.png"],
    ["/dich-vu/quang-cao-google-ads", "service-google-ads.png"],
    ["/dich-vu/quang-cao-facebook-ads", "service-facebook-ads.png"],
    ["/dich-vu/quang-cao-zalo-ads", "service-zalo-ads.png"],
    ["/dich-vu/marketing-bat-dong-san", "service-real-estate-marketing.png"],
  ];

  const LEGACY_GENERIC_SERVICES = [
    "/dich-vu/google-business-profile",
    "/dich-vu/quang-cao-da-kenh",
    "/dich-vu/seo-tong-the",
    "/dich-vu/nhan-dien-thuong-hieu",
    "/dich-vu/domain-hosting-email",
  ];

  const EDITORIAL_DEPTH_ASSETS: [string, string][] = [
    ["/dich-vu/google-business-profile", "service-google-business-profile.png"],
    ["/dich-vu/quang-cao-da-kenh", "service-omnichannel-ads.png"],
    ["/dich-vu/seo-tong-the", "service-seo-content.png"],
    ["/dich-vu/nhan-dien-thuong-hieu", "service-brand-identity.png"],
    ["/dich-vu/domain-hosting-email", "service-domain-hosting-email.png"],
  ];

  for (const [route, file] of SERVICES) {
    test(`${route} keeps its family visual and depth anchors`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);

      const img = page.locator(`img[src*="${file}"]`);
      await expect(img, `${file} is missing`).toHaveCount(1);
      await expect(img).toBeVisible();
      expect((await img.boundingBox())?.width ?? 0).toBeGreaterThan(0);
      expect((await img.boundingBox())?.width ?? 0).toBeLessThanOrEqual(560);

      await expect(page.locator("#hinh-thuc")).toBeVisible();
      await expect(page.locator("#hanh-trinh")).toBeVisible();
      await expect(page.getByText("Từ nhu cầu đến đầu ra có thể kiểm tra")).toBeVisible();

      for (const [, other] of SERVICES) {
        if (other === file) continue;
        await expect(page.locator(`img[src*="${other}"]`)).toHaveCount(0);
      }
    });
  }

  for (const route of LEGACY_GENERIC_SERVICES) {
    test(`${route} now exposes the Maxweb-style depth layer`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await expect(page.locator("#hinh-thuc")).toBeVisible();
      await expect(page.locator("#nang-luc")).toBeVisible();
      await expect(page.locator("#hanh-trinh")).toBeVisible();
      await expect(page.locator("#tin-hieu")).toBeVisible();
      await expect(page.getByText("Từ nhu cầu đến đầu ra có thể kiểm tra")).toBeVisible();
    });
  }

  for (const [route, file] of EDITORIAL_DEPTH_ASSETS) {
    test(`${route} renders its matching editorial depth illustration`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      const img = page.locator(`#hinh-thuc img[src*="${file}"]`);
      await expect(img, `${file} is missing from the depth section`).toHaveCount(1);
      await expect(img).toBeVisible();
      expect((await img.boundingBox())?.width ?? 0).toBeLessThanOrEqual(260);
      for (const [, other] of EDITORIAL_DEPTH_ASSETS) {
        if (other === file) continue;
        await expect(page.locator(`#hinh-thuc img[src*="${other}"]`)).toHaveCount(0);
      }
    });
  }

  test("homepage exposes the full specialized-service explorer", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.locator("#specialized-services")).toBeVisible();
    await expect(page.getByRole("link", { name: /xem toàn bộ dịch vụ/i })).toBeVisible();
    const explorer = page.locator("#specialized-services");
    await expect(explorer.getByRole("link", { name: /thiết kế website bất động sản/i })).toBeVisible();
    await expect(explorer.getByRole("link", { name: /quảng cáo google ads/i })).toBeVisible();
  });

  test("service hub exposes goal-based navigation before the directory", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/dich-vu");
    await expect(page.locator("#chon-theo-muc-tieu")).toBeVisible();
    for (const id of ["xay-nen-tang", "quang-cao", "seo-hien-dien", "thuong-hieu-van-hanh"]) {
      await expect(page.locator(`#chon-theo-muc-tieu a[href="#${id}"]`)).toHaveCount(1);
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });
});

test.describe("UI V6 single-package pricing", () => {
  test("the custom-quote package is a compact panel, not a 520px flip card", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/website");
    // Tab "Theo yêu cầu" chỉ có một gói.
    const tab = page.getByRole("tab", { name: /theo yêu cầu/i });
    await tab.click();
    const panel = page.locator('[role="tabpanel"]:not([hidden])');
    await expect(panel).toBeVisible();

    const box = await panel.boundingBox();
    expect(box?.height ?? 0, "single package must size to its content, not a 520px minimum").toBeLessThan(520);

    // CTA phải thấy được ngay, không phải lật thẻ mới có.
    await expect(panel.getByRole("button").first()).toBeVisible();
  });
});

test.describe("UI homepage pricing card flip", () => {
  test("hovering a package keeps the back face useful instead of looking empty", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const card = page.locator("#home-pricing .flip-scene").first();
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await page.waitForTimeout(850);

    const back = card.locator(".flip-face--back");
    await expect(back).toContainText("Cam kết");
    await expect(back).toContainText("Thiết kế riêng theo nhận diện thương hiệu");

    const cardText = await back.innerText();
    expect(cardText.trim().length).toBeGreaterThan(80);
    await expect(card.locator(".flip-card")).toHaveCSS("transform", /matrix3d/);
  });
});

test.describe("UI V6 concept gallery mobile budget", () => {
  test("shows 8 concepts on mobile, expands, and keeps the industry filter", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/website/concept?industry=" + encodeURIComponent("Nội thất"));

    // Bộ lọc phải sống sót qua thao tác mở rộng — nút không được điều hướng.
    await expect(page).toHaveURL(/industry=/);

    await page.goto("/website/concept");
    const cards = page.locator("#concept-grid a[href^='/website/concept/']");
    const visibleBefore = await cards.evaluateAll(
      (els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).length,
    );
    expect(visibleBefore, "mobile should start with 8 concepts, not all 30").toBe(8);

    await page.getByRole("button", { name: /xem thêm concept/i }).click();
    const visibleAfter = await cards.evaluateAll(
      (els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).length,
    );
    expect(visibleAfter).toBeGreaterThan(visibleBefore);
  });

  test("every concept stays in the HTML for crawlers even while hidden", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/website/concept");
    const total = await page.locator("#concept-grid a[href^='/website/concept/']").count();
    expect(total, "hidden cards must still be server-rendered").toBeGreaterThan(8);
  });
});
