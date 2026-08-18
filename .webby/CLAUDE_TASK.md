# CLAUDE TASK — PHA 2 FINAL ALL-IN-ONE IMPLEMENTATION

> Gate: **AUTHORIZED_PHA2_ALL_IN_ONE**.
> User explicitly approved PHA 1 on 2026-08-18 (`duyệt PHA1`). Implement once, self-review once, return one exact final HEAD, then STOP for ChatGPT QA. Do not split into more rounds unless a genuinely external/source blocker makes implementation impossible.

## Mandatory first action

Fetch and integrate the **exact latest remote HEAD** of `chatgpt/pha1-final-asset-freeze-91` into `claude/gd9-implementation-v1` / PR #5 before changing runtime code. Read all authority files below after integration. If the approval receipt does not say `USER_APPROVED_PHA2_AUTHORIZED`, STOP.

## Supreme authority order

1. `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf` — supreme visible UI authority.
2. `.webby/PHA1_FREEZE_RECEIPT.json` — user approval + PHA2 authorization.
3. `.webby/ASSET_COUNT_PLAN.json` — **91 assets = 38 raster + 53 vector**.
4. `.webby/asset-manifest.json` + `.webby/ASSET_MANIFEST_DELTA_91.json` — resolved inventory.
5. `.webby/ASSET_USAGE_MAP.json` — route/section/role asset mapping.
6. `.webby/TYPOGRAPHY_AUTHORITY.json` — `pha1-typography-v2`.
7. `.webby/TYPOGRAPHY_ROUTE_MATRIX.json`.
8. `.webby/TYPOGRAPHY_IMPLEMENTATION_MAP.json`.
9. `.webby/typography.json` — compact token mirror.
10. Existing implementation contracts / content truth / SEO contracts for all nonvisual behavior.

No older GD9/GD10 task text may override the authority above.

## A. Asset implementation — resolved 91 pack

- Preserve the immutable base 85.
- Add/use exactly the six PHA1 delta assets; no search, no generation, no redraw, no visual substitution.
- The three decorative SVGs are source-controlled canonical assets: `dong-son-ring`, `gold-divider`, `gold-noise`.
- The three added raster deliveries are exact approved-UI crops and are allowed despite the old no-Drive GĐ9 rule. **This is a narrow, user-approved exception only for these exact frozen files.**

If the three runtime raster files are not already present after authority integration, copy them only from the frozen Drive bundle identified in `.webby/PHA1_FREEZE_RECEIPT.json`, then verify the exact SHA-256 **before use and before commit**:

- `public/assets/cta/support-cta-device-shield-approved-crop.webp` → `291d5815ab0e7146fb81c0cba4b0ccd0545b2aa665a4b1faeeac02e54ed91665`
- `public/assets/cta/digital-cta-phoenix-approved-crop.webp` → `a4eeb0783d43d2dda392d128eec6dc6e1c3105d1395ba1f64570704c5d9e11f2`
- `public/assets/detail/project-detail-showcase-approved-crop.webp` → `019b5dc4e1ed5679668e1b9944399c7128a416e0607dc856ccf65aab2ef1549f`

Do not browse Drive for alternatives. Do not use any other file from Drive unless explicitly referenced by the frozen manifest.

`project-detail-showcase-approved-crop` is identity-bound to `item: demo-project-01`. It is `SOURCE_LIMITED_APPROVED_CROP` at 516×33 and **must not be upscaled or stretched into a fake 16:9 visual**. Adapt the section geometry to the approved visible source while preserving the required `visual-showcase` section; do not invent unseen below-fold content.

Implement exact mapping for:
- `/support-mxh` consultation CTA visual.
- `/dich-vu-so` final CTA phoenix + approved decorative motifs.
- `/du-an/[slug]` visual showcase.
- All other mapped decorative placements.

## B. Typography implementation — v2 authority

### Families
- Heading: **Noto Serif**, weights 600/700.
- Body/UI: **Inter**, weights 400/500/600/700.
- Deprecated: `Noto Serif Display + Be Vietnam Pro`.

### Global code targets
- `src/app/layout.tsx`: use `Noto_Serif` + `Inter` via `next/font/google`; expose `--font-heading` and `--font-body`; subsets latin + vietnamese; `display: swap`.
- `tailwind.config.ts`: map the font variables and emit the full approved typography token set.
- `src/app/globals.css`: body resolves to body font; heading elements/components resolve to heading font. No ad-hoc route font families.

### Token safety rule
**Do not rebuild Tailwind `fontSize` from `semanticRoles` alone.** Emit the union required by `.webby/TYPOGRAPHY_AUTHORITY.json` + `.webby/typography.json` and keep any referenced compatibility token until same-commit zero-usage proof.

Mandatory semantics:
- `caption` = Inter 12 / 1.5 / 500.
- `structuralH3` = Noto Serif 28 desktop / 24 mobile / 700.
- `cardH3` = Noto Serif 22 desktop / 20 mobile / 700.
- legacy `h4` aliases `cardH3` during migration.
- `bodyXL` remains a compatibility token until repo-wide zero usage is proven.

Use `.webby/TYPOGRAPHY_IMPLEMENTATION_MAP.json` exactly for component roles, including ContactForm, NewsletterForm, TestimonialCard, ProcessSteps, ConsultationProvider, ContactChannelCard and Chip. No component-level guessing.

Use `.webby/TYPOGRAPHY_ROUTE_MATRIX.json` for all 11 route hero roles. Preserve approved line breaks/casing/gold emphasis as closely as the visible master requires.

## C. Visual correction pass

Because typography and asset mapping visibly change the site, do one deliberate site-wide visual correction pass against the approved PDF at both reference widths:

- desktop: 1440
- mobile: 390

Do not redesign. Do not reorder/delete approved sections. Do not compensate for a mismatch by inventing assets or copy.

Check at minimum:
- header/logo/nav/button geometry
- hero line breaks, heading weight, eyebrow/body alignment
- section vertical rhythm
- compact card titles vs structural H3
- Support CTA
- Digital CTA
- project detail showcase
- forms/modal/contact channels
- footer
- 404 and required interaction states

## D. Regression guards

Add/keep hard guards for the silent Tailwind failure class. At minimum prove these referenced utilities emit valid CSS/computed typography:

- `text-caption`
- `text-h4-mobile`
- `text-h4-desktop`
- `text-body-xl`

More generally, fail if **any referenced typography utility** has no emitted CSS/computed typography.

For visual evidence, wait for:

`await document.fonts.ready`

and retain the existing image-load/decode settling logic before screenshots.

## E. Nonvisual contracts

Preserve the already-fixed SEO/content integrity behavior:
- demo projects/articles remain visible/routable for preview but noindex and excluded from sitemap/indexing surfaces as previously ruled.
- demo articles do not emit factual Article JSON-LD.
- pending contacts remain disabled; do not invent production facts.
- no secrets, console errors, broken routes, horizontal overflow or accessibility regressions.

Do not reopen already-closed product/content decisions unless the new authority directly conflicts.

## F. Required verification — one final pass

Run all of the following after implementation:

1. TypeScript typecheck.
2. ESLint.
3. Production build; all static routes must succeed.
4. Full functional Playwright suite.
5. Typography utility-emission regression guard.
6. Full visual evidence recapture at 1440 + 390 for the complete committed evidence set, because the visible font/asset geometry changed.
7. Verify all three added runtime raster SHA-256 values.
8. Verify no unauthorized asset IDs/files were introduced.
9. Verify `document.fonts.ready` and image decode gates precede screenshot capture.
10. Self-review final diff against the PHA1 authority and fix objective defects in the same pass before reporting.

## Final deliverable

Keep PR #5 **Draft / OPEN / unmerged**.

Post one final report containing:
- exact authority HEAD integrated
- exact code/evidence commit SHA(s)
- exact final PR HEAD SHA
- typecheck/lint/build counts
- functional test count
- visual evidence count
- typography emission-guard result
- three raster checksum results
- any truly external blocker, if one remains

Then **STOP** for one ChatGPT final QA. Do not start Round 6/7/8 style follow-up work on your own.
