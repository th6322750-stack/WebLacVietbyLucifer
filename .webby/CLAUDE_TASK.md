# CLAUDE TASK — PHA 2 ALL-IN-ONE HANDOFF (GATED)

> Current gate: **DO NOT IMPLEMENT YET**.
> User has NOT approved final Asset + Typography authority. Do not modify implementation, PR #5, or runtime code until the user explicitly sends `DUYỆT ASSET + GIAO DIỆN` / equivalent final PHA 1 approval.

## PHA 1 authority that supersedes all older GD9/GD10 task text

1. `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf` — supreme visible UI authority.
2. `.webby/ASSET_COUNT_PLAN.json` — resolved asset count **91 = 38 raster + 53 vector**.
3. `.webby/ASSET_MANIFEST_DELTA_91.json` + base `.webby/asset-manifest.json` — resolved asset inventory; no guessing/substitution.
4. `.webby/ASSET_USAGE_MAP.json` — exact route/section/role asset mapping.
5. `.webby/TYPOGRAPHY_AUTHORITY.json` — exact typography families and semantic tokens.
6. `.webby/TYPOGRAPHY_ROUTE_MATRIX.json` — route-specific hero typography.
7. `.webby/TYPOGRAPHY_IMPLEMENTATION_MAP.json` — exact source files/components that consume each typography role.
8. `.webby/typography.json` — compact typography token mirror.

## Typography authority

- Heading family: **Noto Serif**, weights 600/700.
- Body/UI family: **Inter**, weights 400/500/600/700.
- Previous `Noto Serif Display + Be Vietnam Pro` authority is **deprecated for visual match**.
- Use `next/font/google`; do not introduce local/custom/substitute font files.
- `src/app/layout.tsx`: load `Noto_Serif` + `Inter`, expose `--font-heading` / `--font-body`.
- `tailwind.config.ts`: map font families and semantic type tokens to the new authority.
- `src/app/globals.css`: body → body font; h1–h4 → heading font.
- Use `.webby/TYPOGRAPHY_IMPLEMENTATION_MAP.json` for exact component roles (SiteHeader nav, PageHero hero roles, SectionHeading H2, cards, pricing, metrics, buttons, breadcrumbs, footer, FAQ/TOC/filter).
- Use `.webby/TYPOGRAPHY_ROUTE_MATRIX.json` for all 11 route hero roles; no route-level guessing.
- Visual screenshot capture MUST wait for `document.fonts.ready`.
- Computed heading family must resolve to `Noto Serif`; body/UI must resolve to `Inter`.
- Line-break drift from the approved master is a blocker even when family is correct.
- Synthetic weights and fallback fonts at visual QA are forbidden.

## Asset authority

- Resolved pack: **91 assets**, not the historical 85.
- Claude must not search, generate, redraw or substitute image/vector assets.
- The three added raster sources are exact approved-UI crops, not AI-generated replacements.
- The three decorative SVGs are source-controlled canonical files.

## When the user approves PHA 1

ChatGPT will replace this gate with a single PHA 2 ALL-IN-ONE implementation instruction. Claude then implements asset + typography + visual corrections together, runs typecheck/lint/build/full functional/evidence at 1440 and 390, reports one exact final HEAD, and STOPs for ChatGPT final QA.

Until that explicit approval: **STOP.**
