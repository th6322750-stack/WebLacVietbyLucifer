# CLAUDE TASK — WEBBY v3.1 GĐ9 IMPLEMENTATION HANDOFF

> Current gate: **implementation marker is open, but a final release hold remains until ChatGPT supplies a SUCCESS marker-true release workflow for the exact latest remote HEAD.**

This repository is prepared under canonical `webbyLucifer` **v3.1.0**, pinned to commit `b805dfdab336ff3942c68bb0e20a9edb0a047a18`.

User approvals recorded in Git:
- Visual V1: `DUYỆT GIAO DIỆN V1` → `.webby/USER_VISUAL_APPROVAL.json`
- Integrated asset set: `DUYỆT ASSET V3.1` → `.webby/USER_ASSET_APPROVAL_V31.json`

## Mandatory repository / branch

- Repository: `th6322750-stack/WebLacVietbyLucifer`
- Handoff branch: `chatgpt/webby-v3.1-implementation-ready`
- Task mode: `NEW_REDESIGN`
- Transport mode: `GIT`

Do **not** switch to an older handoff branch. Do **not** retrieve implementation assets from Google Drive or any other external source.

## Release gate before coding

Before touching implementation code:

1. `git fetch origin`
2. Checkout/reset exactly to the final HEAD supplied by ChatGPT for `origin/chatgpt/webby-v3.1-implementation-ready`.
3. Read `.webby/UI_SETUP_COMPLETE`; it must say `UI_SETUP_COMPLETE=true` and `implementationAuthorized=true`.
4. Read `.webby/HANDOFF.json`, `.webby/WEBBY_LOCK.json`, `.webby/PROJECT_STATE.yaml`, and both user approval receipts.
5. Confirm ChatGPT supplied a final release workflow run with `conclusion=success` whose `head_sha` equals the exact checked-out HEAD.
6. If any SHA/state differs, **STOP and report the exact finding**. Do not infer readiness from an older run.

Candidate validation already passed on `c5ed5bb8e0f6b92b08061e53464a8b0a9a2603be` (run `31992347483`), but that is not the final implementation HEAD; the final marker-true release run is authoritative for handoff.

## Active authority order

1. `.webby/HANDOFF.json`
2. `.webby/WEBBY_LOCK.json`
3. `.webby/asset-manifest.json` and `.webby/ASSET_USAGE_MAP.json`
4. `.webby/PROJECT_STATE.yaml`
5. Approved visual authority:
   - `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`
   - `.webby/visual-master/gd1-v1/pages/`
   - `.webby/MASTER_INDEX.json`
   - `.webby/ROUTE_IMPLEMENTATION_MAP.json`
6. Design/spec contracts: tokens, typography, responsive, interactions, component map, section/placement maps, motion FEEL contract
7. Content/data/backend/SEO/analytics/accessibility/QA contracts

The approved PDF SHA-256 is `f015b20da10eb50862eec6bc9acc7668c02cd2746e31f29bdd73596319b60c4f`.

## Asset rules

- The v3.1 logical asset set contains **84 assets**.
- Runtime assets are already materialized under `public/assets` and are mapped by `.webby/asset-manifest.json`.
- Use the exact `destinationPath` for every asset. Do not search, generate, redraw, replace, or substitute assets.
- Generic visible icons must use the pinned icon inventory.
- Identity-bearing brand marks must use the exact mapped brand assets.
- Canonical Lạc Việt logo source: `assets/production/brand/lac-viet-logo-source.png`. Never redraw, vectorize, recolor, restyle, or replace it unless the user explicitly approves a new revision.
- Google Drive is review/archive only and is not an implementation dependency.

## GĐ9 — Implementation

When and only when the final release gate is proven on the exact HEAD, implement the approved website as one v3.1 implementation phase. The work includes:

- visual/frontend reconstruction of all approved routes and responsive states;
- UX, navigation, modal, forms, FAQ, TOC, filters, keyboard/focus and accessibility behavior;
- data/backend adapters and content truth rules;
- SEO and analytics contracts;
- tests, build and Playwright evidence.

Do not redesign approved V1 to make implementation easier. Do not measure raster screenshots to invent geometry; use deterministic spec/manifest values.

## Motion ownership

- ChatGPT owns **Motion FEEL** in `.webby/MOTION_FEEL_CONTRACT.json`.
- Claude owns **Motion MECHANISM**.
- If a mechanism would create a material global behavior surface (for example global wheel/touch/key interception, browser-scroll replacement, global smooth-scroll engine or similar), report it before applying it broadly.

## Critical finding rule

If implementation exposes a security, data-integrity, architecture, impossible-spec, missing-authority or other critical blocking issue, report the narrow finding immediately. Do not silently expand scope into an unauthorized broad audit or redesign.

## Required handback

Run the project build/test suite and capture Playwright evidence according to `.webby/qa/PLAYWRIGHT_CAPTURE_PLAN.json`, including desktop 1440 and mobile 390 plus required UI states. Create `.webby/implementation/IMPLEMENTATION_RECEIPT.json` with commands, results, routes, screenshots and known gaps.

Commit implementation on a dedicated implementation branch and open a **Draft PR**. **Do not merge.** Return the branch, PR and evidence to ChatGPT for final visual/contract QA and user acceptance.
