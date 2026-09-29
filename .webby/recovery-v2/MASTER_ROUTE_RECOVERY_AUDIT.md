# LẠC VIỆT MEDIA — MASTER → ASSET/LAYOUT RECOVERY AUDIT V2

**Status:** `PHA1_VISUAL_RECOVERY_V2_LOCKED_FOR_IMPLEMENTATION`  
**Nature:** reconstruction of the already-approved master, **NOT a visual redesign**.  
**Supreme visible authority:** `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`  
**Locked SHA-256:** `f015b20da10eb50862eec6bc9acc7668c02cd2746e31f29bdd73596319b60c4f`

The previous `91 asset / base85 immutable` assumption is **superseded for visual raster content**. Final Vercel QA proved the old hero/project/article/detail raster set does not represent the approved master. Do not patch the current look with CSS around those wrong rasters.

The recovery pack contains **45 exact source-limited master crops**:
- **30 replacements** of existing logical raster IDs.
- **15 new logical IDs** needed because Home and Website use route-specific preview images that are NOT the `/du-an` project grid, and Home uses article previews that are NOT the `/kien-thuc` grid.
- resolved logical asset count after additions: **106**.
- no AI regeneration, no visual substitution, no invented continuation.
- the existing frozen Support CTA crop, Digital CTA crop, Project Detail 516×33 showcase strip and three decorative SVGs remain valid and are reused unchanged.

## Global corrections — apply before route work

| Area | Approved master | Recovery action |
|---|---|---|
| Header/Footer logo | Horizontal `LẠC VIỆT — MEDIA AGENCY` lockup | Use `lac-viet-logo-horizontal-approved`; stop using the square mark as the global header/footer identity |
| Hero raster language | Actual phoenix/device/shield/desk visuals visible in master | Replace the schematic ring/block/card rasters with recovery assets |
| Gold emphasis | Gold is part of H1 composition, not optional decoration | Preserve exact gold spans/line breaks from master; do not render whole H1 white |
| Desktop density | Compact, wide compositions with horizontal timelines and multi-column sections | Do not turn each visual item into oversized stacked cards |
| Mobile authority | Every route has a **real mobile composition in the approved source** | Do not derive mobile by simply stacking the desktop DOM; use the mobile column in the master |
| Process | Thin connected horizontal timeline on desktop; compact sequential mobile treatment | Replace large standalone process cards |
| Footer mobile | Black accordion footer | Preserve the compact accordion composition |
| Demo content | Remains visibly present but tagged/non-indexed per content truth | No visual disclaimer added unless master shows it |
| Quality | Exact source crop beats a prettier substitute | Do not search/generate/re-draw. Slight normal responsive scaling is allowed; no AI/fake upscale claims |

---

## 11-route recovery table

### 1) `/` — Trang chủ — master page 3 / `ui-000`

**Required asset map**
- header/footer: `lac-viet-logo-horizontal-approved`
- hero: `home-hero-master`
- social proof faces: `social-proof-avatar-strip-approved`
- home project row: `home-project-preview-01..04` (**not** `project-cover-01..04`)
- home knowledge row: `home-article-preview-01..04` (**not** `article-cover-01..04`)

**Desktop section order / composition**
1. black sticky header: horizontal logo + `Trang chủ / Dịch vụ / Dự án / Kiến thức / Giới thiệu / Liên hệ / Nhận tư vấn`
2. black two-column hero: left eyebrow + `LẠC VIỆT / MEDIA AGENCY` with the second line gold; body; three compact proof items; two CTAs; avatar strip + `200+` + stars; right large gold phoenix
3. white services: centered heading + **3** service cards
4. project showcase: **4** image cards in one row
5. black metric strip: `200+ / 350+ / 4+ / 99%`
6. **6-step connected horizontal process**: Tiếp nhận → Đề xuất → Thực hiện → Kiểm tra & QA → Bàn giao → Hỗ trợ
7. **3 testimonial cards**
8. **4 knowledge cards**
9. thin ivory CTA strip
10. black multi-column footer

**Mobile**
- compact black hero, horizontal logo + hamburger; phoenix becomes a small supporting visual instead of a desktop-sized block
- full-width primary/secondary CTA
- services as three compact list cards
- project carousel/one-card viewport
- metrics as compact dark vertical block
- process/testimonials/knowledge remain compact, not huge desktop-card stacks
- black accordion footer

**Current Vercel blockers to remove:** schematic hero, square logo, wrong home preview assets, excess vertical mobile length, hero/type emphasis drift.

---

### 2) `/website` — master page 4 / `ui-001`

**Required asset map**
- hero: `website-hero-master`
- project row: `website-project-preview-01..04`

**Desktop**
1. black hero: H1 `Thiết kế Website` + gold `chuẩn đẹp – hiệu quả cho doanh nghiệp`; real laptop + phone visual; three trust items; two CTAs
2. suitable-business row: **6 icon cards**
3. pricing: **4 packages**, third highlighted
4. black benefit strip: **5 columns**
5. project previews: **4 cards** using Website-specific previews
6. **6-step horizontal connected process**
7. FAQ: **two columns / 8 compact rows**
8. black CTA with compass motif
9. footer

**Mobile**
- hero text first; device image below; three trust icons remain compact
- suitable businesses 2×3
- four pricing cards compact/stacked
- dark benefits as list, not giant cards
- project previews as compact rows/cards
- FAQ compact accordion

**Remove:** schematic device art, oversized card spacing, one-column desktop FAQ, project images borrowed from `/du-an`.

---

### 3) `/support-mxh` — master page 5 / `ui-002`

**Required asset map**
- hero: `support-hero-master`
- client strip: `support-client-logo-strip`
- lead CTA visual: existing `support-cta-device-shield-approved-crop`
- dark texture: existing `gold-noise`
- platform marks: Facebook / TikTok / Meta; fourth service icon `icon-shield-check`

**Desktop**
1. black hero: headline with gold `CHÍNH CHỦ – AN TOÀN – HIỆU QUẢ`; four compact trust points; two CTAs; social proof; right shield + platform visual
2. **4 service cards**
3. **6 common-issue cards**
4. dark why-us strip: **5 items**
5. **5-step horizontal process**
6. client-logo strip
7. dark 4-metric strip
8. FAQ **2 columns**
9. ivory support-lead CTA with device/shield image
10. black final CTA
11. footer

**Mobile**
- hero is text-led; no giant shield occupying the first viewport
- trust items, CTA, social proof compact
- service/issues as compact stacked rows
- support request card and final CTA remain visibly distinct

**Remove:** wrong schematic hero, any YouTube service card, oversized vertical stacks.

---

### 4) `/dich-vu-so` — master page 6 / `ui-003`

**Required asset map**
- hero: `digital-hero-master`
- product brand marks: ChatGPT / YouTube / Microsoft / Canva
- final CTA: existing `digital-cta-phoenix-approved-crop`
- motifs: existing `dong-son-ring` + `gold-noise`

**Desktop**
1. black hero: gold `TÀI KHOẢN & DỊCH VỤ SỐ`; white `UY TÍN – AN TOÀN – NHANH CHÓNG`; four proof items; right phoenix
2. **4 service-category cards**
3. **4 featured product cards with prices**
4. black why-us strip: **4 items**
5. **4-step horizontal process**
6. 4 trust metrics on white
7. FAQ two-column + support card
8. black final CTA with phoenix at right
9. footer

**Mobile**
- compact hero; phoenix moves below proof items
- categories stacked
- product cards remain recognizable with brand logo + price
- process represented by four compact numbered steps

**Remove:** schematic hero/card imagery, missing visual brand hierarchy.

---

### 5) `/du-an` — master page 7 / `ui-004`

**Required asset map**
- hero: `projects-hero-master`
- grid: corrected `project-cover-01..12`
- featured case: `project-featured-case-master`

**Desktop**
1. black hero: `Dự án` white + `tiêu biểu` gold; three proof metrics; right phoenix
2. horizontal filter chips
3. **12 projects, 4 columns × 3 rows**
4. load-more CTA
5. black featured-case banner: left building visual, right title/copy, four metrics, CTA
6. ivory next-project CTA with light phoenix motif
7. footer

**Mobile**
- title/intro + compact phoenix + metrics inside hero
- horizontally scrollable filter chips
- project cards in a compact single-column list with correct real thumbnails
- black featured case remains a compact card, then dark metric block
- ivory CTA, accordion footer

**Remove:** all schematic grid thumbnails, oversized mobile cards, generic hero blocks.

---

### 6) `/kien-thuc` — master page 8 / `ui-005`

**Required asset map**
- hero: `knowledge-hero-master`
- featured article: `article-cover-01`
- latest grid: `article-cover-02..07`

**Desktop**
1. black hero: gold `Kiến thức`; right desk/laptop/book/lightbulb visual
2. category chips
3. featured article: large image left + title/excerpt/meta right
4. latest articles: **3 columns × 2 rows**
5. load-more
6. dark newsletter horizontal card
7. dark consultation CTA
8. footer

**Mobile**
- text-led hero + desk visual below
- horizontal chips
- one featured card
- latest articles become compact thumbnail/text rows, not desktop cards simply stacked
- newsletter + consultation CTA remain compact

**Remove:** schematic hero, wrong covers, excess blank section height.

---

### 7) `/gioi-thieu` — master page 9 / `ui-006`

**Required asset map**
- `about-bird-master`

**Approved visible composition**
1. black global header
2. breadcrumb on ivory
3. **light two-column hero**: left `Giải pháp số được xây dựng bằng Cần Kiệm Liêm Chính` with `Cần Kiệm Liêm Chính` gold; intro; right light phoenix
4. the three principles **Cần / Kiệm / Liêm Chính** integrated directly under the hero
5. service ecosystem: **4 compact cards** — Website / Support Mạng Xã Hội / Dịch vụ số / Tư vấn & Chiến lược
6. standard footer may follow; **do not invent extra brand-value sections**

**Mobile**
- breadcrumb, headline, intro, phoenix, then the three principle rows and ecosystem cards
- no duplicate `Tin cậy / Tận tâm / Hiệu quả` section

---

### 8) `/du-an/website-bat-dong-san-an-phat` — master page 10 / `ui-007`

**Required asset map**
- device: `project-detail-device-master`
- showcase: existing `project-detail-showcase-approved-crop` (516×33 source-limited exact strip)

**Desktop**
1. black global header + breadcrumb
2. light two-column hero: exact An Phát title/copy/meta on left, real estate laptop+phone on right
3. sticky/horizontal tabs: Tổng quan / Vấn đề / Giải pháp / Kết quả / Công nghệ
4. **single tab content pane**, not five stacked full-height sections
5. default visible pane = overview text at left + result metrics `+68% / +45% / -40%` at right
6. `GIAO DIỆN WEBSITE` begins immediately below; render the approved 516×33 strip **without a giant empty black container**
7. no invented continuation below the source strip

**Mobile**
- title/meta first, device image, horizontal tab scroller, one content pane
- never stack all tab panels vertically

**Remove:** schematic device, giant stacked problem/solution/result/technology sections, oversized black showcase void.

---

### 9) `/kien-thuc/10-yeu-to-seo-quan-trong-giup-website-len-top-google` — master page 11 / `ui-008`

**Required asset map**
- main article image: `article-seo-hero-master`

**Desktop**
1. black global header + breadcrumb
2. **3-column article layout starts immediately**
   - left: sticky 10-item TOC
   - center: title + author/date/read-time + intro + purple SEO image
   - right: 3 related compact previews + gold consultation card
3. no full-width dark/graphic hero above the article
4. keep content width/density close to master

**Mobile**
- title/meta, purple SEO image, intro
- TOC becomes collapsible/in-flow control
- right rail content moves below compactly

**Remove:** gold chart full-width hero and delayed 3-column layout.

---

### 10) `/lien-he` — master page 12 / `ui-009`

**Required asset map**
- hero: `contact-hero-master`
- channel marks: Zalo / Messenger / Telegram / Email

**Desktop**
1. black hero: left title `LẠC VIỆT / MEDIA AGENCY` with gold emphasis + copy + **3 proof items**; right phoenix
2. white main section: **intro/checklist on left + form on right**
3. quick channels: **4 equal cards**
4. hotline/support-hours slim row
5. **5-step horizontal process**
6. FAQ: **two-column FAQ + separate ask-more card**
7. black final CTA
8. footer

**Mobile**
- black hero text + three proof rows + phoenix below
- form
- channel list
- vertical five-step process
- FAQ + ask-more card
- final CTA/footer

**Remove:** form-left/channel-rail desktop composition, schematic orbital hero, missing hero proof row.

---

### 11) `/404` — state authority page 13 / `ui-010`

Use the dedicated `404 NOT FOUND` state panel in the approved state strip:
- dark charcoal/black full-state composition
- large gold `404`
- white `Không tìm thấy trang`
- short white/gray message
- gold `Quay về trang chủ` button
- subtle dark background image/texture
- horizontal brand lockup where header identity is shown

**Do not use** the current large ivory page with black title as the visual authority.

---

## Required interaction-state corrections

The final QA evidence previously produced false positives. Fix the product **and** the capture assertions.

1. **Mobile menu**: black drawer with horizontal logo, close icon, `Trang chủ / Dịch vụ / Dự án / Kiến thức / Giới thiệu / Liên hệ`, gold CTA at bottom. It must not render the Home hero inside the drawer.
2. **Consultation modal**: centered white popup on desktop, rounded top/bottom-sheet style on mobile; form fields visible.
3. **Success state**: actual white success dialog with green check + `Cảm ơn bạn!` + button.
4. **Error state**: actual white error dialog with red icon + `Có lỗi xảy ra!` + retry button.
5. **FAQ open**: screenshot must visibly include the expanded FAQ content.
6. **Loading**: dark loading panel with gold circular spinner + `Đang tải...`.
7. **Hover/focus**: gold default/hover and dotted/outlined focus-visible treatment as approved.
8. Evidence test must assert the target state DOM is **inside the screenshot viewport** before capture. Two state files with identical SHA are a hard failure.

## Acceptance gate after Claude implementation

A pass requires:
- exact route/section order above
- correct recovered raster assets and horizontal logo
- no old schematic hero/project/article/detail rasters visible
- desktop 1440 and mobile 390 full-page screenshots
- mobile compared against the **mobile composition in `ui-000..ui-009`**, not against repeated desktop imagery
- all 8 state screenshots show the requested state
- no duplicate SHA among success/error/FAQ/loading unless visually expected (it is not)
- typecheck/lint/build functional tests pass
- PR remains Draft/unmerged until user approval
