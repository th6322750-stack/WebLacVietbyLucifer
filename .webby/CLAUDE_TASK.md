# CLAUDE TASK — WEBBY v3.1 GD10 TARGETED FIX

> Current gate: **AUTHORIZED_GD10_TARGETED_FIX**. PR #5 already contains GĐ9; do not restart or redesign.

Canonical webbyLucifer: v3.1.0 at `b805dfdab336ff3942c68bb0e20a9edb0a047a18`.

## Mandatory first action
Fetch and integrate the **exact latest remote HEAD** of `chatgpt/webby-v3.1-implementation-ready` into `claude/gd9-implementation-v1`, then read `.webby/GD10_AUTHORITY_CORRECTION_RECEIPT.json` and `.webby/ASSET_USAGE_MAP.json`. If the corrected base is absent, STOP.

## Corrected authority
- **85 assets** = 35 raster + 50 vector. The original 84 remains the historical user-approved baseline; asset #85 is an exact source extract from the already approved V1 PDF page 5, not a new visual revision.
- Use `support-client-logo-strip` at `public/assets/client-logos/support-client-logo-strip.png` exactly for the Support client-logo row. It is DEMO_ONLY; show a nearby disclaimer that it is V1 demo/illustration, not a verified client list. Never substitute platform logos.
- `/lien-he` approved channel order is Zalo / Messenger / Telegram / Email. `productionEmail` remains TBD, so Email must be disabled / `Sắp cập nhật` with `icon-mail`; never invent an email.

## Remaining targeted fixes
1. Transcribe exact project demo identities/copy from approved PDF page 7; do not guess unreadable text; keep `demoOnly=true`.
2. Make `/du-an/[slug]` match the approved demo case-study identity/meta/results. `Dịch vụ` is the actual demo service label; demo status stays in badge/disclaimer.
3. Match exact V1 knowledge/article identities/copy. `/kien-thuc` uses the V1 AI-in-Marketing featured article; `/kien-thuc/[slug]` matches the V1 SEO article.
4. Rebuild `/gioi-thieu` hero/principle hierarchy to the V1 `Cần Kiệm Liêm Chính` composition.
5. Match exact V1 hero copy on `/support-mxh`, `/dich-vu-so`, `/kien-thuc`, `/lien-he`; no paraphrase.
6. Use `support-client-logo-strip` instead of the platform-logo substitution.
7. Replace phone as the fourth contact card with pending-disabled Email + `icon-mail`.
8. Fix invalid/non-token opacity modifiers such as `text-white/76` and audit the changed UI for the same regression class.
9. Update `.webby/implementation/IMPLEMENTATION_RECEIPT.json` to final fixed HEAD/evidence truth.

Run typecheck, lint, production build, Playwright functional + evidence at 1440/390 including loading; render the exact pinned PDF SHA for comparison. Keep PR #5 Draft, do not merge, return the new exact HEAD and STOP for ChatGPT re-QA.
