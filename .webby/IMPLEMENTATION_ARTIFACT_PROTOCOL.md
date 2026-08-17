# webbyLucifer v3.1 implementation artifact protocol

Status: **ACTIVE v3.1**.

The implementation handoff is self-contained in Git on `chatgpt/webby-v3.1-implementation-ready`. Google Drive is review/archive only and is not an implementation dependency.

## Runtime asset authority

- `.webby/asset-manifest.json` — 84 logical assets and exact `destinationPath` mappings.
- `.webby/ASSET_USAGE_MAP.json` — route/component usage mapping.
- `public/assets` — materialized runtime files.
- `assets/production/masters` — authoritative high-resolution raster masters.
- `assets/production/vectors` — pinned UI/brand vectors.
- `assets/production/brand/lac-viet-logo-source.png` — canonical logo source.

## Visual authority

- `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`
- `.webby/visual-master/gd1-v1/pages/`
- `.webby/MASTER_INDEX.json`
- `.webby/ROUTE_IMPLEMENTATION_MAP.json`

## Gate

Claude must not code until `.webby/UI_SETUP_COMPLETE` reports both `UI_SETUP_COMPLETE=true` and `implementationAuthorized=true`, and the final canonical v3.1 validator passes on the same latest remote HEAD.

Do not retrieve substitute assets, redraw the logo, redesign approved V1, infer missing icons, or use Drive to fill perceived gaps. If an active Git authority file/path/hash fails validation, stop and report the exact finding.
