# CLAUDE TASK — GĐ4 Implementation

**STATUS: BLOCKED — DO NOT START GĐ4.**

The previous GĐ3 readiness claim was revoked after repository verification found missing production assets and missing approved route render files. Claude must not implement any route until `.webby/HANDOFF.json` is explicitly changed to `UI_SETUP_COMPLETE` by ChatGPT after a successful final validator pass against the actual GitHub tree.

When GĐ4 is later authorized, read in order:
1. `.webby/HANDOFF.json`
2. `.webby/WEBBY_LOCK.json`
3. `.webby/visual-handoff/routes.json` and every mapped route render
4. `.webby/tokens.json`, `typography.json`, `responsive.json`, `interactions.json`
5. `.webby/visual-contract.json`, `component-map.json`, `route-map.json`, `asset-manifest.json`
6. `assets/`

Implementation rules after authorization:
- Reconstruct visible UI from approved renders; do not redesign.
- Original logo only.
- Use Noto Serif Display + Be Vietnam Pro.
- Use `#D4AF37` brand gold, ivory/white content surfaces and charcoal hero/header/footer.
- Mobile-first responsive; QA references 1440 and 390.
- Demo metrics/testimonials/project claims must be labelled/demo or replaced with verified real data before production.
- Prefer reusable components and semantic accessible HTML.
- After each implementation milestone create `.webby/implementation/IMPLEMENTATION_RECEIPT.json` with consumed uiCommit/uiRevision, implementation commit, routes, build/tests and blockers.
- Do not merge PR.
