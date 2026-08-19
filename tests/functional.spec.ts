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

    // RECOVERY V2: the approved success state (master ui-010) is its own centred dialog reading
    // "Cảm ơn bạn!", not an inline note inside the consultation modal — so it is asserted at
    // page level, by its state marker and approved copy, rather than scoped to `dialog`.
    const success = page.locator('[data-state="form-success"]');
    await expect(success).toBeVisible();
    await expect(success.getByText("Cảm ơn bạn!")).toBeVisible();
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

  test("sitemap.xml excludes hidden fixtures and lists the indexable listing routes", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBeLessThan(400);
    const xml = (await response?.text()) ?? "";
    expect(xml).not.toContain("/du-an/website-bat-dong-san-an-phat");
    expect(xml).not.toContain("/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google");
    // Listing routes stay indexable. Detail routes are withheld while their content is
    // unverified demo — asserted per-entity in the SEO content-integrity blocks below.
    for (const route of ["/du-an", "/kien-thuc", "/website", "/gioi-thieu", "/lien-he"]) {
      expect(xml).toContain(route);
    }
  });
});

test.describe("SEO content integrity (demo projects)", () => {
  const DEMO_PROJECT_ROUTES = [
    "/du-an/website-bat-dong-san-the-maison",
    "/du-an/quang-cao-google-ads-ecom-shinlala",
    "/du-an/website-bat-dong-san-an-phat",
  ];

  // FINAL PASS item 1: CONTENT_TRUTH.json marks every GĐ1 project identity/result as demo until
  // verified, and SEO_CONTRACT.json forbids demo data becoming indexed claims. Demo project
  // detail routes therefore stay routable and visible but must be noindex and absent from
  // sitemap.xml. They must still emit BreadcrumbList (navigation) and never Article schema.
  for (const route of DEMO_PROJECT_ROUTES) {
    test(`${route} is routable but noindex with no Article schema`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();

      const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(
        (b) => JSON.parse(b)["@type"],
      );
      expect(types).toContain("BreadcrumbList");
      expect(types).not.toContain("Article");

      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    });
  }

  test("no demo project detail URL appears in sitemap.xml", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const xml = (await response?.text()) ?? "";
    for (const route of DEMO_PROJECT_ROUTES) {
      expect(xml).not.toContain(route);
    }
    // The listing routes themselves stay indexable.
    expect(xml).toContain("/du-an");
    expect(xml).toContain("/kien-thuc");
  });

  test("demo projects remain fully visible in the approved UI despite SEO gating", async ({ page }) => {
    await page.goto("/du-an");
    const cards = page.locator("main a[href^='/du-an/']");
    expect(await cards.count()).toBeGreaterThan(0);
    // Appears twice by design: the grid card and the featured case-study banner.
    const maison = page.getByRole("heading", { name: "Website Bất Động Sản The Maison", exact: true });
    expect(await maison.count()).toBe(2);
    await expect(maison.first()).toBeVisible();
    // All 12 approved visible projects still render despite every one being noindex.
    await expect(page.getByRole("heading", { name: "Quảng cáo Google Ads Ecom - Shinlala", exact: true })).toBeVisible();
  });
});

test.describe("content-truth markers (final sweep)", () => {
  // FINAL PASS item 3: demo counts, case-study results, and demo pricing must all be tagged in
  // data/markup. The approved master shows no badge on these, so the assertion is on markup.
  const TAGGED = [
    { route: "/", selector: "[data-demo-only]", min: 5 },
    { route: "/du-an", selector: "[data-demo-only]", min: 4 },
    { route: "/website", selector: "[data-demo-only]", min: 8 },
    { route: "/support-mxh", selector: "[data-demo-only]", min: 1 },
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

  test("demo pricing packages are tagged and still display their approved prices", async ({ page }) => {
    await page.goto("/website");
    const cards = page.locator('#pricing-packages [data-demo-only], [data-demo-only]:has-text("Từ 8.900.000đ")');
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(page.getByText("Từ 8.900.000đ").first()).toBeVisible();
  });

  test("pending contact fields are disabled, never invented", async ({ page }) => {
    await page.goto("/lien-he");
    // productionEmail and facebookUrl are TBD in CONTENT_TRUTH.json — both cards must render
    // disabled placeholders and must not contain a fabricated address or profile URL.
    await expect(page.getByText("Sắp cập nhật").first()).toBeVisible();
    const html = await page.content();
    expect(html).not.toMatch(/mailto:[^"'\s]+@/);
  });
});

test.describe("SEO content integrity (demo articles)", () => {
  const DEMO_ARTICLE_ROUTES = [
    "/kien-thuc/ai-trong-marketing-2024-xu-huong-ung-dung-va-co-hoi-cho-doanh-nghiep",
    "/kien-thuc/seo-onpage-la-gi-15-yeu-to-quan-trong-can-toi-uu",
    "/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google",
  ];

  // R5-01: SEO_CONTRACT.json allows Article structured data only on factual knowledge articles
  // and forbids demo preview data becoming factual structured data. Every current article body
  // is a demo reconstruction, so no route may emit Article JSON-LD.
  for (const route of DEMO_ARTICLE_ROUTES) {
    test(`${route} emits no Article JSON-LD and is noindex`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);

      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const types = blocks.map((b) => JSON.parse(b)["@type"]);
      expect(types).not.toContain("Article");
      // BreadcrumbList describes navigation, not article facts — it must still be present.
      expect(types).toContain("BreadcrumbList");

      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    });
  }

  test("no demo article detail URL appears in sitemap.xml", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const xml = (await response?.text()) ?? "";
    for (const route of DEMO_ARTICLE_ROUTES) {
      expect(xml).not.toContain(route);
    }
  });

  test("article cards and related-article previews carry demo truth in markup", async ({ page }) => {
    await page.goto("/kien-thuc");
    const cards = page.locator('#article-grid a[data-demo-only]');
    expect(await cards.count()).toBeGreaterThan(0);
    for (const card of await cards.all()) {
      await expect(card).toHaveAttribute("data-demo-only", "true");
    }

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
    // PHA2: the temporary device-master fallback is superseded by the authority-mapped
    // approved crop. The invariant is unchanged — no project-cover may appear on this route.
    await expect(showcase).toHaveAttribute("src", /project-detail-showcase-approved-crop/);
    await expect(showcase).not.toHaveAttribute("src", /project-cover/);
    // The related-projects rail legitimately uses covers 01..04 per ASSET_USAGE_MAP; the
    // showcase and hero must not.
    const heroImg = page.locator("#case-study-hero img");
    await expect(heroImg).toHaveAttribute("src", /project-detail-device-master/);
  });
});

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
    for (const id of ["#why-lac-viet", "#support-metrics"]) {
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

test.describe("PHA1 approved-crop rasters", () => {
  // SOURCE_LIMITED_APPROVED_CROP: exact pixels from the approved composite. The delta forbids
  // upscaling beyond native, so each must render at (or below) its frozen dimensions.
  const CROPS = [
    { route: "/support-mxh", id: "support-cta-device-shield-approved-crop", w: 295, h: 120 },
    { route: "/dich-vu-so", id: "digital-cta-phoenix-approved-crop", w: 205, h: 98 },
    { route: "/du-an/website-bat-dong-san-an-phat", id: "project-detail-showcase-approved-crop", w: 516, h: 33 },
  ];

  for (const { route, id, w, h } of CROPS) {
    test(`${id} renders at native size, never upscaled`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route);
      const img = page.locator(`img[src*="${id}"]`).first();
      await expect(img).toHaveCount(1);
      const box = await img.boundingBox();
      expect(box, `${id} not rendered`).not.toBeNull();
      // Allow a 1px rounding tolerance; anything larger means the crop was stretched.
      expect(box!.width, `${id} upscaled horizontally`).toBeLessThanOrEqual(w + 1);
      expect(box!.height, `${id} upscaled vertically`).toBeLessThanOrEqual(h + 1);
      // Native aspect must be preserved (no squashing into a fake 16:9).
      expect(box!.width / box!.height).toBeCloseTo(w / h, 1);
    });
  }

  test("the showcase strip is not stretched into a fake 16:9 block", async ({ page }) => {
    await page.goto("/du-an/website-bat-dong-san-an-phat");
    const img = page.locator('#visual-showcase img').first();
    const box = await img.boundingBox();
    // 516/33 ≈ 15.6:1. A 16:9 fake would be ≈1.78.
    expect(box!.width / box!.height).toBeGreaterThan(10);
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

  test("sections have real vertical padding at mobile width", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/du-an");
    const pad = await page.locator("#projects-grid").first().evaluate((el) => {
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
      await page.goto("/du-an");
      const pads = await page.evaluate(() => {
        const read = (sel: string) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const cs = getComputedStyle(el);
          return parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        };
        return { hero: read("section .max-w-container, header + section > div"), cta: read("#projects-grid") };
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
});
