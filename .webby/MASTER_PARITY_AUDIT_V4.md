# MASTER PARITY AUDIT V4 — DRAFT FOR USER REVIEW

**Status:** `DRAFT_FOR_USER_REVIEW_NO_CLAUDE_IMPLEMENTATION`

**Implementation gate:** `CLOSED`

**Supreme visual authority:** `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`

**Reference viewports:** Desktop `1440px`, Mobile `390px`

**Current implementation PR:** #5, `claude/gd9-implementation-v1`

**Current implementation HEAD audited:** `c785c1e8bd1764b37433d32535526481f2a5351f`

**Asset posture:** V3 HD/4K fidelity assets are treated as locked. This audit is about UI/layout/composition, not re-rendering assets.

---

## 1. Acceptance definition

The target is not “same style” or “close enough”. The target is **master parity**:

- same visible section order;
- same section density and relative heights;
- same hero composition and asset scale/placement;
- same card counts and grid/list treatment at each reference viewport;
- same dark/ivory/light band order;
- same typography hierarchy, line wrapping intent and emphasis;
- same CTA geometry and footer rhythm;
- same mobile composition, including viewport-specific content reduction/condensation where the master shows it;
- same interaction-state presentation.

Allowed difference: browser/font rasterization and anti-aliasing only. No intentional redesign is allowed without a new user-approved visual revision.

---

## 2. Current evidence dimensions

The latest full-page evidence is materially taller than the approved mobile compositions on several routes:

| Route | Desktop current | Mobile current |
|---|---:|---:|
| `/` | 1440×4714 | 390×8555 |
| `/website` | 1440×4987 | 390×7930 |
| `/support-mxh` | 1440×5316 | 390×7168 |
| `/dich-vu-so` | 1440×4402 | 390×6427 |
| `/du-an` | 1440×3672 | 390×7785 |
| `/kien-thuc` | 1440×3618 | 390×4641 |
| `/gioi-thieu` | 1440×2804 | 390×3955 |
| `/du-an/[slug]` | 1440×3463 | 390×4486 |
| `/kien-thuc/[slug]` | 1440×3232 | 390×3891 |
| `/lien-he` | 1440×3599 | 390×5002 |

The extreme mobile heights are not a cosmetic issue; they show that desktop content is being stacked rather than reproducing the master’s mobile composition.

---

## 3. Confirmed implementation root causes

### RC-01 — Generic hero template destroys route-specific master composition

`src/components/layout/PageHero.tsx` currently forces a generic two-column layout and constrains the visual with:

- `lg:grid-cols-2`
- `sizes="(min-width: 1024px) 40vw, 60vw"`
- `className="h-auto w-[60%] max-w-[390px] lg:w-full"`

The Home custom hero repeats the same `max-w-[390px]` pattern.

This directly explains the current “small image inside a dark box” result. In the master, the phoenix/device/shield/still-life artwork is a major hero focal element, often occupying roughly half of the hero composition.

**Required recovery:** route-specific hero variants. Do not keep one universal visual-size cap.

### RC-02 — Global Section spacing is interpreted as per-edge padding

`src/components/ui/Section.tsx` uses `py-12 md:py-16 xl:py-24` for every normal section. At desktop, `py-24` means 96px on the top **and** 96px on the bottom. This turns a nominal section gap into ~192px of vertical whitespace between content boundaries.

`.webby/placement-map.json` defines `sectionGapPx.desktop = 96` and `sectionGapPx.mobile = 56` as composition spacing, not 96/56 on both edges of every section.

**Required recovery:** stop using one universal `py-24`; use route/section-specific spacing and interpret the gap token as the total visual interval between adjacent section content blocks.

### RC-03 — Generic FinalCta is much larger than master CTA strips

`src/components/layout/FinalCta.tsx` applies `py-12 md:py-16 xl:py-24`, centered copy and an optional visual capped at `max-w-[320px]` to all routes.

The approved master uses several CTA geometries: compact horizontal strips, smaller black/gold bands, and route-specific compositions. The current generic component creates large black blocks and materially changes page rhythm.

**Required recovery:** CTA variants keyed by route/master, not one universal block.

### RC-04 — Mobile is treated as desktop stacked vertically

The current Home at 390px renders service cards, four project cards, metrics, six-step process, testimonials, four article cards, generic CTA and footer. The master Home mobile shows a deliberately condensed composition: hero, three compact service rows, **one** featured project, compact metrics, compact CTA, accordion footer. The desktop-only process/testimonial/latest-knowledge presentation is not present in the approved mobile column.

The same pattern appears on `/du-an`: current mobile renders all 12 project cards; the master shows four project cards followed by a load-more control, featured case, metrics, project CTA and footer.

**Required recovery:** explicit viewport composition contracts. `390px` is not merely a breakpoint; it is a separately approved visual composition.

### RC-05 — Evidence/state capture is not trustworthy for mobile menu

The stored `states--mobile-menu-open.png` visually contains the Home hero under a close button instead of the approved navigation menu list. However the current `SiteHeader.tsx` source contains an opaque full-screen navigation drawer. This is a source/evidence contradiction and means the state evidence must be recaptured and verified after recovery, not blindly reused.

### RC-06 — Board metadata is stale by one evidence/receipt commit

The uploaded QA Board prints PR HEAD `bb159e37...`, while GitHub PR #5 currently resolves to `c785c1e8...`. The code difference is not the main visual cause, but the final comparison board must always print the exact audited/deployed HEAD.

---

## 4. Route-by-route MASTER → CURRENT → EXACT RECOVERY

### `/` — Home — SEVERITY: BLOCKER

**Desktop master:** large phoenix is the dominant right-side hero visual; compact three-service section; four project previews; dark metrics strip; compact process/testimonial/knowledge rows; compact black/gold CTA; compact footer.

**Current:** hero phoenix is reduced to a small framed visual; service cards and lower sections are vertically over-expanded; generic CTA/footer band is much taller.

**Desktop recovery:** restore large phoenix scale and relative position; compress service/cards/section spacing to master proportions; keep 4 project cards and 4 metrics; match the master’s six-step process geometry; reduce testimonial/article rows to master height; replace generic CTA with Home-specific compact CTA.

**Mobile master:** hero; 3 compact service rows; **1 featured project**; compact 4-metric dark card; compact consultation CTA; accordion footer.

**Mobile recovery:** at 390, do not render the desktop process/testimonials/latest-knowledge blocks in the default composition; show one featured project, not four; match master accordion footer and CTA placement exactly.

### `/website` — SEVERITY: BLOCKER

**Desktop master:** large laptop+phone hero composition; six industry-fit items; **4 pricing/package cards**; compact dark benefit strip; 4 project previews; horizontal process; FAQ; compact route CTA/footer.

**Current:** primary content inventory is closer than earlier rounds, but hero device is too small; package/benefit/process/FAQ sections are too tall; generic CTA dominates the bottom.

**Recovery:** make hero device roughly the master’s visual share; preserve 4 packages; compress industry/package/project/process/FAQ geometry; use master dark strip and compact CTA.

**Mobile master:** hero with visible device mockup; 2-column compact industry-fit grid; 4 package cards in compact vertical treatment; dark benefit band; compact project list; process; FAQ; compact CTA; accordion footer.

**Mobile recovery:** use dedicated compact card/list variants instead of desktop cards stretched to one column.

### `/support-mxh` — SEVERITY: BLOCKER

**Desktop master:** shield + Facebook/TikTok/Meta visual is large; 4 support-platform cards; compact issue icons; dark why-us strip; compact 5-step process; trust/client strip; metrics; FAQ; light urgent-support CTA with device/shield; dark impact CTA/footer.

**Current:** hero shield is small; individual sections are expanded into large full-width bands; trust/metrics/FAQ/CTA rhythm is much longer than master.

**Recovery:** restore large shield/social hero; compact all service/issue/process/trust/metrics regions; preserve master ordering; urgent-support CTA must be a compact horizontal light card, not a tall section; final dark CTA/footer must match master height.

**Mobile master:** compact stacked platform/support rows and issue rows; the long desktop card grid is transformed into a narrow list-based composition; CTA/footer remain compact.

### `/dich-vu-so` — SEVERITY: BLOCKER

**Desktop master:** large phoenix hero; 4 compact category tiles; 4 featured products with real brand logos/pricing; dark why-us band; 4-step purchase process; compact trust metrics; FAQ + support card; compact decorated black/gold CTA; footer.

**Current:** content inventory is close, but phoenix is too small and most sections are oversized. Generic CTA still consumes too much height.

**Recovery:** route-specific large phoenix hero, compact product cards/why-us/process/metrics/FAQ, master-sized decorated CTA.

**Mobile master:** hero + phoenix; compact category list; featured products are compact vertical cards; dark proof band; compact process/metrics; FAQ/support; compact CTA/footer.

### `/du-an` — SEVERITY: BLOCKER ON MOBILE, MAJOR ON DESKTOP

**Desktop master:** phoenix hero with proof metrics; compact filter chips; **12 projects in a dense 4-column grid**; dark featured case-study card; compact light project CTA; footer.

**Current desktop:** 12 assets are now visually faithful and 4-column grid is correct, but hero visual is too small; card grid/filters have too much empty vertical spacing; featured-case and final CTA are too large.

**Desktop recovery:** keep 12 cards/assets, change only composition/spacing; restore large phoenix and compact featured-case/CTA geometry.

**Mobile master:** hero; filter chips; **first 4 project cards**; `Xem thêm dự án` control; featured case card; compact 2×2 metrics; light project CTA; accordion footer.

**Current mobile:** all 12 cards are rendered immediately, producing 7785px full-page height.

**Mobile recovery:** initial mobile composition must show 4 cards and load-more; do not dump 12 desktop cards into one column.

### `/kien-thuc` — SEVERITY: BLOCKER

**Desktop master:** large 3D still-life hero; compact filter row; featured article with large left image + right copy; 6 latest-article cards in a dense grid; load-more; compact newsletter; compact service CTA; footer.

**Current:** new Knowledge asset is visually appropriate but is tiny inside hero; featured area and cards are oversized; only 3 large latest cards are visible in the current composition; newsletter/service CTA are much larger than master.

**Desktop recovery:** enlarge hero still-life; restore dense six-card latest grid and master feature proportions; retain load-more; compact newsletter and CTA.

**Mobile master:** hero; chips; featured article card; latest content as **compact list rows (approximately six visible items)**; load-more; newsletter; service CTA; accordion footer.

**Current mobile:** 3 very large article cards.

**Mobile recovery:** use a mobile article-row component; do not reuse desktop card proportions.

### `/gioi-thieu` — SEVERITY: MAJOR

Page 9 is an approved preview of the upper composition; below-fold sections are controlled by `section-map.json`.

**Master visible area:** light page; title block left, large gold bird right; three values aligned in one compact row; four service-ecosystem cards.

**Current:** generally closer than dark service routes, but bird style/scale/position and text proportions differ; values and service cards are larger; below-fold story + generic CTA create a much longer composition.

**Recovery:** match visible upper composition pixel-wise; below the visual crop preserve required `brand-story`, `principles`, `final-cta`, `site-footer` from section-map, but keep them visually subordinate and consistent with master density rather than inventing large new sections.

**Mobile:** master shows hero + bird, then Cần/Kiệm/Liêm Chính in compact vertical rows followed by service ecosystem. Match that ordering/density.

### `/du-an/[slug]` — SEVERITY: BLOCKER

Page 10 visibly specifies the case-study above-the-fold composition.

**Desktop master:** breadcrumb; large title/copy left; **large laptop+phone mockup right**; 4 compact meta items; tabs; overview left + result metrics in one compact card right; the top of `Giao diện website` begins immediately below.

**Current:** device mockup is much smaller; there is excessive whitespace between hero/meta/tabs; result metrics are stacked as three separate cards; `Giao diện website` becomes a huge black full-width section; related projects and generic CTA add major vertical expansion.

**Recovery:** scale device to master; tighten hero/meta/tabs; metrics must use the master combined result-card geometry; visual-showcase starts at master density. Below the visible master crop, preserve required related-project/final CTA sections but keep them compact and do not change the approved above-fold architecture.

**Mobile master:** title/meta first, large device visual, tabs, overview; do not introduce desktop-scale dark blocks.

### `/kien-thuc/[slug]` — SEVERITY: MAJOR

Page 11 visibly specifies a desktop 3-column article frame.

**Desktop master:** narrow sticky TOC left; center title/meta/intro/SEO hero; compact right related rail + consultation card. The three columns are visually balanced and the article hero is smaller than current.

**Current:** structurally 3-column, but center title/image and overall spacing are much larger; right rail/TOC proportions differ; long article body increases whitespace before generic CTA.

**Recovery:** match master column widths, title width/line breaks, hero image scale and rail dimensions. Preserve article body content from contract, but typography rhythm should continue the master proportions. CTA/footer must remain compact.

**Mobile master:** breadcrumb/title/meta/hero/intro then an inline/collapsible `Mục lục`; no desktop side rails.

### `/lien-he` — SEVERITY: BLOCKER

**Desktop master:** large phoenix contact hero with proof bullets; consultation copy + form in a compact two-column block; 4 compact contact-channel cards; 5-step compact process; FAQ + secondary contact; compact black/gold final CTA; footer.

**Current:** hero phoenix is tiny; hero bullets/proof are missing from the same composition; form area and subsequent sections are much taller; final CTA is a large generic black section.

**Recovery:** restore hero asset scale and approved proof/bullet composition; tighten form and channel cards; compact five-step process and FAQ; use contact-specific CTA geometry.

**Mobile master:** hero with large phoenix and proof bullets; form immediately below; contact channels as compact rows; 5-step list; FAQ; secondary contact; compact footer. Match this exact narrow composition.

### `/404` — SEVERITY: MAJOR

**Master state:** dark centered 404 treatment, gold `404`, white message, short description, gold home button; no large extra decorative page architecture.

**Current:** visually closer than previous versions, but final acceptance must compare the actual 404 state against page-13 state crop and remove any header/footer or spacing not visible in the approved state treatment.

---

## 5. Interaction-state audit

| State | Status | Required action |
|---|---|---|
| Mobile menu open | **FAIL / evidence contradiction** | Approved state is a real nav list drawer. Re-capture after implementation and verify menu labels are visibly present. |
| Consultation modal desktop | MAJOR | Current modal functionally works; size, spacing, title/form geometry must match page-13 state card. |
| Consultation modal mobile | MAJOR | Must be approved mobile drawer/full-height presentation, not a scaled desktop modal. |
| Form success | MINOR/MAJOR | Match approved centered white card, green status icon, exact button/spacing. |
| Form error | MINOR/MAJOR | Match approved centered white card, red icon, exact button/spacing. |
| FAQ open | MAJOR | Evidence should frame the approved accordion state rather than an arbitrary full section crop. |
| Loading | CLOSE | Spinner card is conceptually correct; match master card size/position/background treatment. |
| 404 | MAJOR | Match page-13 404 state exactly. |
| Focus/hover | MAJOR | Gold/outline focus treatment must match state board; capture the actual focused control, not merely a default page frame. |

---

## 6. Locked implementation strategy — NOT YET AUTHORIZED

When the user approves this audit, the recovery task should require Claude to:

1. leave all V3 HD/4K asset bytes untouched;
2. replace generic hero behavior with route-specific master variants;
3. reinterpret section spacing correctly and remove universal `py-24` overexpansion;
4. create route-specific CTA variants;
5. create 390px viewport composition rules, including mobile-only compact/list components and content-count limits from the master;
6. correct detail-page above-fold geometry before touching below-fold polish;
7. recapture **fresh** 11×desktop + 11×mobile + 8 states from the final Vercel deployment;
8. generate a MASTER|VERCEL board that prints the exact final Git HEAD;
9. STOP for ChatGPT QA; no self-declared visual PASS.

**Do not send Claude this file as an implementation authorization yet.** The implementation gate remains CLOSED until user acceptance of the recovery specification.