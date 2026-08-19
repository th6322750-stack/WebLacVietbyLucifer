# CLAUDE TASK — V3 FIDELITY REPLACEMENT RE-INTEGRATION — FINAL TARGETED PASS

> Gate: **AUTHORIZED** by `.webby/V3_FIDELITY_REPLACEMENT_QUEUE.json` status `REPLACEMENTS_RENDERED_DRIVE_UPLOADED_READY_FOR_CLAUDE_REINTEGRATION`.
> The approved PDF remains supreme visual authority.

## Scope
Do **not** redesign or reopen the V3 implementation. The current PR #5 implementation is already complete. This pass only replaces the 15 logical fidelity assets (16 PNG files because Knowledge Hero has 4K + runtime FHD), then rebuilds, redeploys, and recaptures evidence.

## Mandatory first action
1. Start from current PR #5 HEAD `3638d17008e2dbb53aa8fd67d3f6b653c65dce29` or newer if the user/PR has legitimately advanced.
2. Confirm PR #5 is Draft/open/unmerged.
3. Integrate exact latest HEAD of `chatgpt/pha1-asset-production-v3-hd`.
4. Read `.webby/V3_FIDELITY_REPLACEMENT_QUEUE.json`, `.webby/FIDELITY_REPLACEMENT_MANIFEST_V3.json`, and `.webby/FIDELITY_REPLACEMENT_DRIVE_RECEIPT_V3.json`.
5. If the queue status is not `REPLACEMENTS_RENDERED_DRIVE_UPLOADED_READY_FOR_CLAUDE_REINTEGRATION`, STOP.

## Drive source
Root folder:
`https://drive.google.com/drive/folders/1U6B_eBAsE3qJEmrR0EhgDzCaMjJ9UQho`

Use only:
- `project/` — 8 PNG
- `article/` — 6 PNG
- `hero/knowledge-hero-master-4k.png`
- `runtime/hero/knowledge-hero-fhd.png`
- `FIDELITY_REPLACEMENT_MANIFEST_V3.json`

Do not use anything under internal/debug folders or any `REFERENCE_ONLY` source.

## Re-integration rule
- Verify SHA256 of all 16 downloaded files against `.webby/FIDELITY_REPLACEMENT_MANIFEST_V3.json` **before copying**.
- Replace bytes only at the exact existing stable runtime/source paths expected by V3.
- Do not rename aliases, change route mapping, regenerate, search, substitute, crop from PDF, or redesign layout.
- Preserve lossless PNG sources. Keep the already user-approved WebP runtime serving strategy only where the current implementation already applies it; do not alter source bytes.
- `404-background` is not part of this replacement pass.

## Verification
Run once after re-integration:
- `tsc --noEmit`
- `eslint .`
- `next build`
- full functional Playwright
- 16/16 replacement SHA256 PASS
- no reference-only bytes reachable at runtime
- deploy a fresh Vercel Preview
- capture 11 desktop full-page @1440 + 11 mobile full-page @390 + 8 valid states = 30 screenshots
- await `document.fonts.ready`, lazy-scroll, image naturalWidth/decode settling
- success/error states must be visibly different and have different SHA
- create fresh MASTER | VERCEL comparison board using actual mobile master

## Handback
Return:
- exact authority HEAD integrated
- exact final code/evidence HEAD
- fresh Vercel Preview URL
- typecheck/lint/build/test counts
- `16/16 replacement SHA256 PASS`
- `30/30 evidence PASS`
- comparison board path

Keep PR #5 Draft/open/unmerged. Then **STOP for ChatGPT final QA**.
