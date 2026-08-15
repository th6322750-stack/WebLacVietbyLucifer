# CLAUDE TASK — GĐ4/GĐ5/GĐ6 AUTHORIZED AFTER PREFLIGHT PASS

Lucifer approved GĐ1 V1 with the exact statement **`DUYỆT GIAO DIỆN V1`**. This branch is the Git-self-contained implementation handoff.

## Mandatory checkout and preflight

Use repository `th6322750-stack/WebLacVietbyLucifer`, branch `chatgpt/gd3-git-self-contained-v1`.

Before changing implementation code, run from a fresh checkout:

```bash
python scripts/reconstruct-git-self-contained.py
python scripts/validate-gd3-git-self-contained.py --require-ready
```

Both commands must PASS. If either fails, STOP and report the exact path/hash. Do not fetch substitutes from Google Drive or elsewhere.

## Authority order

1. Exact approved PDF: `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`
2. Route/page masters: `.webby/visual-master/gd1-v1/pages/`
3. `.webby/MASTER_INDEX.json` and `.webby/ROUTE_IMPLEMENTATION_MAP.json`
4. GĐ2 design-system files: tokens, typography, responsive, interactions, component map
5. Content/implementation/backend/SEO/analytics/accessibility/QA contracts

The PDF SHA-256 is `f015b20da10eb50862eec6bc9acc7668c02cd2746e31f29bdd73596319b60c4f`.

Canonical original logo: `assets/production/brand/lac-viet-logo-source.png`. Never redraw, vectorize, recolor, restyle, or replace it unless Lucifer explicitly approves a new revision.

## Execution

### GĐ4 — Static frontend / visual reconstruction
Reconstruct all approved routes and sections. Match V1 structure, hierarchy, typography, spacing, imagery, color, component composition and responsive intent. Do not redesign to make implementation easier.

### GĐ5 — UX / interactions / accessibility
Implement mobile navigation, consultation modal, forms and validation states, FAQ, article TOC, filters/load-more where specified, focus handling, keyboard behavior, reduced motion and accessibility contracts. Preserve approved visual treatment.

### GĐ6 — Backend / data / SEO / analytics
Implement the contracts in `.webby/DATA_BACKEND_CONTRACT.json`, `.webby/CONTENT_TRUTH.json`, `.webby/SEO_CONTRACT.json` and `.webby/ANALYTICS_CONTRACT.json`. Do not publish demo project names, metrics, testimonials or pricing as verified production facts.

## Required handback evidence

Run the project/build/test suite and capture Playwright evidence according to `.webby/qa/PLAYWRIGHT_CAPTURE_PLAN.json`, including desktop 1440 and mobile 390 plus required UI states. Create `.webby/implementation/IMPLEMENTATION_RECEIPT.json` documenting commands, results, routes, screenshots and known gaps.

Commit implementation to an implementation branch and open a **Draft PR**. Do not merge. Stop and return the branch/PR/evidence to ChatGPT for GĐ7 visual QA against the approved V1 master.
