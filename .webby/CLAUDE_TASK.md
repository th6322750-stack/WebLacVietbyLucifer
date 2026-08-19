# CLAUDE TASK — PHA2 FINAL VISUAL IMPLEMENTATION V3 HD/4K — ALL IN ONE

> Gate: **AUTHORIZED** by `.webby/V3_HD_4K_AUTHORITY.json` status `V3_ASSET_FREEZE_COMPLETE_CLAUDE_AUTHORIZED`.
> This V3 authority supersedes every V2 low-resolution raster/crop runtime rule. The approved PDF remains supreme visible authority.

## Mandatory first action
1. Start from the current PR #5 head and verify it is Draft/open/unmerged.
2. Integrate the exact latest remote HEAD of `chatgpt/pha1-asset-production-v3-hd`.
3. Read `.webby/V3_HD_4K_AUTHORITY.json` completely, then the approved PDF, typography v2, content-truth, SEO and interaction contracts.
4. If the V3 authority status is not `V3_ASSET_FREEZE_COMPLETE_CLAUDE_AUTHORIZED`, STOP.

## Binary acquisition
Use only the Google Drive root/shards and exact SHA256 values embedded in `.webby/V3_HD_4K_AUTHORITY.json.drive`. Download the production shards, verify every exact shard SHA256 before extraction, then copy only the mapped production files. `05_REFERENCE_ONLY.zip` is inspection-only: **nothing inside it may be copied to `public/` or served at runtime**.

## Asset implementation
- Put V3 production binaries under a clear repo path such as `public/assets/v3/**`; preserve PNG/SVG source quality.
- Map semantic logical IDs through `.webby/V3_HD_4K_AUTHORITY.json.aliases` and `sourceSets`.
- Heroes: 4K masters + lossless FHD variants. Choose responsively; no lossy re-encode.
- Project/article cards: FHD 1920×1080 production masters.
- Detail visual: 2K/4K with lossless FHD delivery where supplied.
- Global header/footer/mobile: `lac-viet-logo-horizontal-approved.svg`; use mark-only SVG only where the master actually uses mark-only.
- Replace the three old tiny CTA/showcase crop bytes with the V3 FHD replacements mapped under the same semantic IDs.
- Existing true vector icons/brand/decorative assets remain valid.
- **No V2 low-res crop fallback, no image search, no image generation, no visual substitution.**

## Visual implementation
Rebuild against the approved desktop **and actual mobile** compositions. Do not preserve current page geometry because tests pass. Match the master: gold text spans, compact vertical rhythm, horizontal timeline process treatment on desktop, correct imagery, correct detail skeletons, Contact composition, and dark/gold 404.

## Quality/performance rule
Source quality is non-negotiable. Do not compress away detail. If a 4K master is excessive for a viewport, use the supplied lossless FHD variant or create a deterministic **downscaled lossless** derivative from the V3 master. Never use a reference crop as a performance fallback.

## Verification — one final pass
- `tsc --noEmit`
- `eslint .`
- `next build`
- full functional Playwright
- all production shard SHA256 checks PASS
- verify no reference-only raster is reachable from runtime
- live Vercel: 11 full-page desktop screenshots @1440 + 11 full-page mobile screenshots @390 + 8 valid state screenshots
- `await document.fonts.ready`, lazy-scroll, `naturalWidth`, and image `decode()` before evidence capture
- success/error screenshot SHA must differ and each state must be visibly present
- create a MASTER | VERCEL board where mobile compares against the **actual mobile master**, never desktop reused as mobile
- self-review every route before handback

## Handback
Keep PR #5 Draft/open/unmerged. Deploy a fresh Vercel Preview. Return exact V3 authority HEAD integrated, exact code/evidence HEAD, Vercel URL, typecheck/lint/build/test counts, shard checksum PASS count, 30/30 evidence count and comparison-board path, then **STOP** for ChatGPT final visual QA.

No older GD9/GD10/PHA2/recovery-v2 task text may override V3.