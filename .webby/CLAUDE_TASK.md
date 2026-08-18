# CLAUDE TASK — PHA 2 ALL-IN-ONE HANDOFF (GATED)

> Current gate: **DO NOT IMPLEMENT YET**.
> User has NOT approved final Asset + Typography authority. Do not modify implementation, PR #5, or runtime code until the user explicitly sends `DUYỆT ASSET + GIAO DIỆN` / equivalent final PHA 1 approval.

## PHA 1 authority that supersedes all older GD9/GD10 task text

1. `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf` — supreme visible UI authority.
2. `.webby/ASSET_COUNT_PLAN.json` — resolved asset count **91 = 38 raster + 53 vector**.
3. `.webby/ASSET_MANIFEST_DELTA_91.json` + base `.webby/asset-manifest.json` — resolved asset inventory; no guessing/substitution.
4. `.webby/ASSET_USAGE_MAP.json` — exact route/section/role asset mapping.
5. `.webby/TYPOGRAPHY_AUTHORITY.json` — **pha1-typography-v2**, exact families, semantic roles, compatibility tokens and emission guard.
6. `.webby/TYPOGRAPHY_ROUTE_MATRIX.json` — route-specific hero/global typography v2.
7. `.webby/TYPOGRAPHY_IMPLEMENTATION_MAP.json` — exact source files/components that consume typography roles.
8. `.webby/typography.json` — compact v2 mirror + explicit Tailwind token map.

## Typography authority

- Heading family: **Noto Serif**, weights 600/700.
- Body/UI family: **Inter**, weights 400/500/600/700.
- Previous `Noto Serif Display + Be Vietnam Pro` authority is deprecated for visual match.
- Use `next/font/google`; do not introduce local/custom/substitute font files.
- `src/app/layout.tsx`: load `Noto_Serif` + `Inter`, expose `--font-heading` / `--font-body`.
- `src/app/globals.css`: body → body font; heading elements → heading font.
- Use `.webby/TYPOGRAPHY_IMPLEMENTATION_MAP.json` for the exact component role map; no component-level guessing.
- Use `.webby/TYPOGRAPHY_ROUTE_MATRIX.json` for all 11 route hero roles; no route-level guessing.

### A — caption is resolved and mandatory

- `caption` is a first-class semantic role: **Inter 12px / 1.5 / 500 / 0**.
- Existing `text-caption` usages MUST continue to emit CSS.
- **Do not rebuild `theme.fontSize` from `semanticRoles` alone.** The emitted token set is the union defined by `.webby/TYPOGRAPHY_AUTHORITY.json` + `.webby/typography.json`.
- Preserve compatibility utilities (`h3`, `h4`, `body-xl`) until their source usages are migrated and zero-usage is proven in the same commit.
- Add a regression guard that fails when any referenced typography utility has no generated CSS/computed typography. Minimum explicit cases: `text-caption`, `text-h4-mobile`, `text-h4-desktop`, `text-body-xl`.

### B — card title sizing is resolved

- True structural H3: **28 desktop / 24 mobile**.
- Compact card H3: **22 desktop / 20 mobile**, Noto Serif 700.
- Legacy `h4` intentionally aliases the compact `cardH3` metrics during migration.
- Project/article/service/pricing/process compact card titles use `cardH3`, not structural H3.

### C — component map is complete for the reported gaps

The map now explicitly includes:
- `ContactForm` → formLabel/formControl/cardH3/body/small/button
- `NewsletterForm` → formLabel/formControl/caption/small/body/button
- `TestimonialCard` → body/small/caption
- `ProcessSteps` → stepNumber/cardH3/small
- `ConsultationProvider` → cardH3/small
- `ContactChannelCard` → small/body
- `Chip` → chip

`bodyXL` is no longer an ambiguous orphan semantic role: it is a **reserved compatibility token** and must remain emitted until a repo-wide zero-usage proof allows removal.

## Visual QA rules after implementation is authorized

- Wait for `document.fonts.ready` before every evidence capture.
- Computed heading family must resolve to `Noto Serif`; body/UI must resolve to `Inter`.
- Synthetic weights and visual-QA fallbacks are forbidden.
- Line-break drift from the approved master is a blocker.
- Because the family/weights visibly change, recapture the full evidence set at 1440 and 390 after PHA 2.

## Asset authority

- Resolved pack: **91 assets**, not historical 85.
- Claude must not search, generate, redraw or substitute image/vector assets.
- Three added raster sources are exact approved-UI crops; three decorative SVGs are source-controlled canonical files.

## When the user approves PHA 1

ChatGPT will replace this gate with one PHA 2 ALL-IN-ONE implementation instruction. Claude then implements asset + typography + visual corrections together, runs typecheck/lint/build/full functional/evidence at 1440 and 390, reports one exact final HEAD, and STOPs for ChatGPT final QA.

Until that explicit approval: **STOP.**
