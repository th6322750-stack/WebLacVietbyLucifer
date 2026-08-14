# CLAUDE TASK — GĐ4/GĐ5/GĐ6 ZERO-GUESSWORK IMPLEMENTATION

**USER VISUAL APPROVAL IS FINAL FOR V1.** Lucifer approved the complete GĐ1 package with the statement `DUYỆT GIAO DIỆN V1` on 2026-08-14T21:49:00+07:00. Read `.webby/USER_VISUAL_APPROVAL.json` before implementation.

**DO NOT START unless `.webby/PROJECT_STATE.yaml` on the active hardening revision says `implementation.authorized: true`, `.webby/UI_SETUP_COMPLETE` names the same handoff/uiCommit, and `.webby/USER_VISUAL_APPROVAL.json` is present with `USER_APPROVED_FINAL`.**

## Mandatory preflight
1. Read `.webby/HANDOFF.json`, `.webby/WEBBY_LOCK.json`, and `.webby/USER_VISUAL_APPROVAL.json`; reject stale/mismatched state.
2. Run the canonical webby validator when available.
3. Run `python scripts/reconstruct-webby-artifacts.py --root . --extract`; SHA verification MUST pass for both master snapshot and production assets.
4. Read `.webby/MASTER_INDEX.json`; `LacVietMedia_GD1_UI_Approved_v1.pdf` is the supreme visible-UI authority for V1.
5. For each route, load only its entry in `.webby/ROUTE_IMPLEMENTATION_MAP.json`, corresponding visual pointer/master page, required assets, shared tokens/components, and non-visible contracts.

## Hard rules
- Build semantic responsive HTML/components; NEVER use the screenshot/PDF as a page image, whole-page canvas, or visual cheat.
- Zero intentional visual deviation: no redesign, section deletion/reorder, replacement logo/font/color/spacing, or simplified mobile composition.
- Original Lucifer-supplied logo is authoritative.
- Demo projects/articles/metrics/testimonials/prices remain `demoOnly` until factual approval.
- If material UI is ambiguous in both master and contract, create a `.webby/requests/` blocker; do not invent it.
- Framework/backend architecture is Claude-owned, but architecture may not trade away approved UI, accessibility, performance, security, data shape, or behavior.
- Any material visual change requires a new ChatGPT-owned UI revision and new Lucifer approval.
- No secrets in repo/client bundle. Do not merge PR.

## Phase order
GĐ4 static visual parity → GĐ5 UX/states/accessibility → GĐ6 backend/data/SEO/analytics → Playwright evidence → implementation receipt → ChatGPT GĐ7 QA.

## Mandatory contracts
Read: `IMPLEMENTATION_CONTRACT.json`, `DATA_BACKEND_CONTRACT.json`, `CONTENT_TRUTH.json`, `SEO_CONTRACT.json`, `ANALYTICS_CONTRACT.json`, `ACCESSIBILITY_CONTRACT.json`, `QA_ACCEPTANCE.json`, `section-map.json`, `placement-map.json`, `asset-catalog.json`.

## Handoff back to ChatGPT
Create `.webby/implementation/IMPLEMENTATION_RECEIPT.json` from the template with exact consumed uiCommit/uiRevision, implementation commit, routes/components, build/tests, artifact reconstruction result, Playwright screenshots at 1440 and 390, required state captures, and blockers. Visual acceptance is ChatGPT-owned.
