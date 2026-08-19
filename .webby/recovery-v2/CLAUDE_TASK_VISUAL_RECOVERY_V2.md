# CLAUDE TASK — FINAL VISUAL RECOVERY V2 — ALL IN ONE

> **AUTHORIZED BY USER:** Reconstruct the implementation against the already-approved master in one complete pass. This is not a redesign.
>
> **STOP CONDITION:** when code + Vercel evidence are complete, return one exact final HEAD and STOP for ChatGPT visual QA. Do not create Round 6/7/8 style micro-fix loops yourself.

## Mandatory first action

1. Start from the current PR #5 head.
2. Merge/fetch the exact ChatGPT recovery authority branch/commit supplied in the PR handoff comment.
3. Read, in this exact order:
   1. `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`
   2. `.webby/recovery-v2/MASTER_ROUTE_RECOVERY_AUDIT.md`
   3. `.webby/recovery-v2/VISUAL_RECOVERY_AUTHORITY_V2.json`
   4. `.webby/recovery-v2/RECOVERY_ASSET_MANIFEST_V2.json`
   5. existing typography v2 / content truth / SEO / interaction contracts
4. If the recovery authority files are absent, STOP.

## Asset operation — mechanical only, no visual decisions by Claude

The Git authority contains:
- `.webby/recovery-v2/RECOVERY_ASSET_MANIFEST_V2.json` — exact locked crop rectangles, dimensions and raw-pixel SHA-256.
- `.webby/recovery-v2/produce_recovery_assets_v2.py` — deterministic crop producer.

**Narrow source transport authorized by this recovery receipt:** use only the already-frozen
`LacVietMedia_PHA1_FinalAssetFreeze_91_v2.zip` bundle and only its
`04_FINAL_UI_REFERENCE/ui-000.png ... ui-010.png` files. Do not browse Drive or use any other
file. The script verifies every source SHA before cropping.

Extract that `04_FINAL_UI_REFERENCE/` directory, then run:

```bash
python .webby/recovery-v2/produce_recovery_assets_v2.py \
  --source-dir /path/to/04_FINAL_UI_REFERENCE \
  --repo-root .
```

It must print `RECOVERY_ASSET_PRODUCTION_PASS 45/45` and write only to:
`public/assets/recovery-v2/**`

Verification is **raw RGB pixel SHA + dimensions**, so no encoder-version ambiguity is accepted.

- 30 entries replace the visual bytes/logical role of existing raster IDs.
- 15 entries are new route-specific logical IDs.
- old logical asset count 91 is superseded; resolved count is **106**.
- keep unchanged: Support CTA crop, Digital CTA crop, Project Detail 516×33 showcase crop, `dong-son-ring`, `gold-divider`, `gold-noise`.
- do not browse Drive.
- do not use image search/generation.
- do not re-crop differently.
- do not AI upscale.
- do not preserve old schematic hero/project/article/detail assets for compatibility if the recovery mapping replaces them.

Update `src/lib/assets.ts` so the semantic logical IDs point to the recovery-v2 runtime files.

## Global visual rebuild

1. **Header/footer**
   - use `lac-viet-logo-horizontal-approved`; square logo is not the global lockup.
   - desktop nav order and gold active line exactly match master.
   - mobile drawer must match state master; no Home hero rendered inside drawer.

2. **Typography**
   - retain approved Noto Serif + Inter v2.
   - restore exact gold spans and line-break intent from the master.
   - no whole-H1-white simplification where the master has gold words.

3. **Geometry**
   - desktop 1440 must be wide/compact like master.
   - mobile 390 must follow the actual mobile column of ui-000..ui-009.
   - do not solve responsive behavior by stacking all desktop cards at full width.
   - process components become connected horizontal timelines on desktop.

4. **Do not preserve current structure merely because tests pass.**
   The current Vercel is visually invalid. The master is supreme.

## Route implementation

Execute every route exactly from `MASTER_ROUTE_RECOVERY_AUDIT.md`.

Critical structural changes:
- `/`: route-specific Home project/article previews; correct phoenix; 6-step timeline.
- `/website`: correct device; 4 package cards; 2-column desktop FAQ; 6-step timeline.
- `/support-mxh`: correct shield hero; 4 platform/service cards; 6 issues; 5-step timeline.
- `/dich-vu-so`: correct phoenix; 4 product cards/prices; 4-step timeline.
- `/du-an`: exact 12 recovered covers in 4×3 desktop grid + recovered featured-case visual.
- `/kien-thuc`: correct desk hero; 1 featured + 6 recovered latest articles.
- `/gioi-thieu`: only approved top composition + 3 principles + 4-service ecosystem; remove invented brand-value section.
- `/du-an/[slug]`: correct device; **tabbed single content pane**, not 5 long stacked sections; source-limited 516×33 showcase with minimal surrounding geometry.
- `/kien-thuc/[slug]`: immediate desktop 3-column editorial layout; purple SEO image; no full-width gold-chart hero.
- `/lien-he`: hero proof row + phoenix; desktop intro-left/form-right; 4 channel cards; 5-step timeline.
- `/404`: rebuild as dark/gold state from ui-010.

## Interaction-state evidence — fix the old false positives

Evidence tests must assert the state is visible inside the screenshot viewport:
- mobile menu open
- consultation modal desktop/mobile
- FAQ open
- form success
- form error
- loading
- focus-visible

Success and error screenshots must not have identical SHA. FAQ screenshot must actually contain the expanded FAQ region.

## Verification

Run:
1. `tsc --noEmit`
2. `eslint .`
3. `next build`
4. full functional Playwright
5. asset SHA verification for every recovery pack runtime file
6. no unauthorized raster IDs/files
7. visual evidence from **live Vercel preview**, not localhost:
   - 11 full-page desktop screenshots @1440
   - 11 full-page mobile screenshots @390
   - 8 state screenshots
8. `await document.fonts.ready`, trigger lazy images, await `naturalWidth`, await `decode()`
9. create a new comparison board where:
   - desktop Vercel is compared against desktop master column
   - mobile Vercel is compared against **mobile master column**, never repeated desktop master
10. self-review all 30 PNGs against the approved master before handback.

## Final handback

- push one final code/evidence result to PR #5
- keep PR Draft / OPEN / unmerged
- deploy a fresh Vercel Preview from the final HEAD
- report:
  - recovery authority commit integrated
  - exact code/evidence commit
  - exact final PR HEAD
  - Vercel preview URL
  - typecheck/lint/build results
  - functional count
  - 30/30 evidence count
  - recovery asset checksum `N/N PASS`
  - comparison board path
- then **STOP**.
