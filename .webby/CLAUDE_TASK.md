# CLAUDE TASK — MASTER PARITY RECOVERY V4 — FINAL ALL-IN-ONE UI PASS

> Gate: **AUTHORIZED** only after integrating the exact latest HEAD of `chatgpt/pha1-asset-production-v3-hd` and confirming `.webby/MASTER_PARITY_RECOVERY_SPEC_V4.json` has `status: LOCKED_FOR_IMPLEMENTATION`.
>
> Supreme visual authority: `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`.
>
> This is a **UI/layout/composition recovery pass**, not an asset-production pass.

## Goal
Rebuild the current PR #5 implementation so the 11 approved routes at **Desktop 1440** and **Mobile 390**, plus the 8 required interaction states, match the approved master composition rather than merely sharing the same style.

Allowed visual difference: browser/font rasterization and anti-aliasing only. No intentional redesign.

## Mandatory first actions
1. Start from current PR #5 HEAD `c785c1e8bd1764b37433d32535526481f2a5351f` or a legitimate newer PR head if it advanced after this handoff.
2. Confirm PR #5 remains Draft / open / unmerged.
3. Integrate the **exact latest HEAD** of `chatgpt/pha1-asset-production-v3-hd` before touching runtime code.
4. Read, in this order:
   - `.webby/MASTER_PARITY_RECOVERY_SPEC_V4.json`
   - `.webby/MASTER_PARITY_AUDIT_V4.md`
   - `.webby/section-map.json`
   - `.webby/visual-contract.json`
   - `.webby/placement-map.json`
   - `.webby/TYPOGRAPHY_AUTHORITY.json`
   - `.webby/FIDELITY_REPLACEMENT_MANIFEST_V3.json`
5. If the V4 spec status is not `LOCKED_FOR_IMPLEMENTATION`, STOP.

## Authority order
1. Approved GD1 PDF master — visible form is supreme.
2. `MASTER_PARITY_RECOVERY_SPEC_V4.json` — exact recovery requirements.
3. `section-map.json` — required section inventory/order when the master crop does not show the full below-fold composition.
4. Typography + asset authorities.
5. Existing runtime implementation.

The existing runtime is **not** authority when it conflicts with the master/spec.

## Locked asset rule
The V3 HD/4K asset set is locked for this pass.

- Do not image-search.
- Do not generate replacement images.
- Do not substitute or rename/remap asset authority.
- Do not reintroduce V2/PHA1 reference crops.
- Keep exact production asset identities already integrated.

Fix **how assets are composed in UI**, not their identity.

## P0 — Fix shared structural root causes FIRST
Before route-by-route tuning, fix the causes that are making every page drift:

### P0.1 Route-specific hero composition
The existing generic `PageHero` / Home pattern constrains major visuals with a universal small cap. Remove the one-size-fits-all visual cap and create route-specific hero composition variants matching each master: phoenix, device mockup, shield/social visual, knowledge still-life, etc.

### P0.2 Section spacing
Do not use one universal `xl:py-24` normal-section spacing. The current interpretation creates excessive page height. Replace with route/section-specific master-derived spacing. `sectionGapPx` is a composition interval, not mandatory 96px top + 96px bottom on every section.

### P0.3 Route-specific CTA geometry
Do not use one universal tall centered `FinalCta` for every route. Implement compact horizontal/light/dark/decorated CTA variants as shown in the approved master.

### P0.4 Explicit mobile compositions
390px is a separately approved visual composition. Do not simply stack all desktop cards/sections into one column. Follow the exact mobile rules in the V4 spec, including initial item counts, compact list variants, load-more behavior and accordion footer.

### P0.5 Header/footer/state primitives
Match master header dimensions/navigation geometry and compact footer rhythm. The mobile menu state must show the actual approved navigation sheet, never page hero content.

## P1 — Desktop 1440
Implement every route in `.webby/MASTER_PARITY_RECOVERY_SPEC_V4.json`:

- `/`
- `/website`
- `/support-mxh`
- `/dich-vu-so`
- `/du-an`
- `/kien-thuc`
- `/gioi-thieu`
- `/du-an/[slug]`
- `/kien-thuc/[slug]`
- `/lien-he`
- `/404`

For each route, match:
- hero scale/placement;
- visible section order;
- item counts;
- grid/list density;
- light/ivory/dark band order;
- typography hierarchy/line-wrap intent;
- card proportions;
- CTA/footer height and rhythm.

Do not move on from a route until a 1440 screenshot visually follows the master composition.

## P2 — Mobile 390
Treat every route as its own approved mobile composition. Critical examples from the locked spec:

- Home: hero → 3 compact services → **1** featured project → compact metrics → compact CTA → accordion footer. Do not dump desktop process/testimonials/articles into the default mobile composition.
- Projects: initial **4** cards → `Xem thêm dự án` → featured case → compact metrics → CTA/footer. Do not render all 12 immediately.
- Knowledge: featured article + compact latest-content rows, not three giant desktop cards.
- Article detail: inline/collapsible TOC; no desktop side rails.

Implement all remaining mobile route rules exactly as specified.

## P3 — 8 interaction states
Recapture and verify:
1. mobile-menu-open @390
2. consultation-modal @1440
3. consultation-modal @390
4. faq-open @1440
5. form-success @1440
6. form-error @1440
7. loading @1440
8. focus-visible @1440

The screenshot itself must prove the state. Success/error must remain visibly different. Loading remains deterministic in test only; no production delay.

## Verification
After the complete UI pass, run:
- `tsc --noEmit`
- `eslint .`
- production `next build`
- full functional Playwright suite
- asset/reference-only guards already present
- no horizontal page scroll at 390

Then deploy a **fresh Vercel Preview from the exact final HEAD**.

Capture from that live preview:
- 11 desktop full-page @1440
- 11 mobile full-page @390
- 8 state screenshots
- total = **30 screenshots**

Use the existing font/image settling gates (`document.fonts.ready`, lazy scroll, naturalWidth/decode).

## Mandatory comparison board
Create a fresh `MASTER | VERCEL` board using:
- the real desktop master column;
- the real mobile master column;
- the live Vercel screenshots from the exact final HEAD.

The board header MUST print:
- exact final PR HEAD;
- exact Vercel preview URL;
- exact authority HEAD integrated.

Do not reuse the stale board stamped with `bb159e37...`.

## Self-review gate
Automated tests passing does **not** mean visual parity passing.

Before handback, manually review all 30 images against the approved master. If any route is still visibly using generic hero/CTA/mobile stacking instead of the master composition, fix it before handback.

## Handback
Return only when the all-in-one pass is complete:
- exact authority HEAD integrated;
- exact final PR/code/evidence HEAD;
- fresh Vercel Preview URL;
- typecheck/lint/build/functional counts;
- 30/30 evidence paths;
- comparison board path;
- concise list of any remaining visual blocker, if one truly cannot be resolved from existing authority.

Keep PR #5 Draft / open / unmerged.

Then **STOP for ChatGPT Final Visual QA + user acceptance**. Do not start spontaneous Round 2/3 polishing after handback.
