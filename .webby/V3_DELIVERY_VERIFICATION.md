# V3 DELIVERY VERIFICATION — HD/4K ASSET FREEZE

Status: **PASS — READY FOR CLAUDE HANDOFF**

Canonical visual/runtime authority remains `.webby/V3_HD_4K_AUTHORITY.json`. The approved PDF remains the supreme visible UI authority.

## Drive root

`https://drive.google.com/drive/folders/1IX_CRKRLlFB0n2kSCk8f-pGsRxipj5im`

## Binary delivery verification

Verified on 2026-08-19 against the connected Google Drive folder listings and the local frozen shard manifest:

- 10/10 declared shards are present on Drive.
- Every Drive shard byte size exactly matches `DRIVE_SHARD_MANIFEST_V3.json`.
- Every local shard SHA-256 exactly matches the frozen manifest hash before handoff.
- Total frozen shard bytes: `486710536` bytes (~464.16 MiB).
- Production shards excluding `05_REFERENCE_ONLY.zip` and `06_AUTHORITY_QA.zip`: `484101341` bytes (~461.68 MiB).
- 50 semantic aliases resolve to 38 unique production targets; **38/38 unique targets are physically present in the production shards**.
- `05_REFERENCE_ONLY.zip` is inspection-only and MUST NOT be served at runtime.
- Drive SHA-256 must be re-verified by Claude after each download and before extraction; Drive listing verifies byte size, not content hash.

## Shards

1. `01_HERO_A_4K_FHD.zip` — 62,235,674 bytes
2. `01_HERO_B_4K_FHD.zip` — 62,235,686 bytes
3. `01_HERO_C_4K_FHD.zip` — 62,235,698 bytes
4. `01_HERO_D_4K_FHD.zip` — 62,235,680 bytes
5. `02_PROJECT_FHD.zip` — 80,913,450 bytes
6. `03_ARTICLE_FHD.zip` — 43,568,778 bytes
7. `04A_DETAIL.zip` — 80,230,900 bytes
8. `04B_CTA_BRAND_SHARED.zip` — 30,445,475 bytes
9. `05_REFERENCE_ONLY.zip` — 1,687,487 bytes
10. `06_AUTHORITY_QA.zip` — 921,708 bytes

## Production quality verified in the frozen shards

- Hero masters: 3840×2160 PNG, with 1920×1080 lossless runtime variants.
- Project covers: 12 × 1920×1080 PNG + 1 featured project visual at 1920×1080.
- Article covers: 7 × 1920×1080 PNG.
- Project detail device: 3840×2160 + 1920×1080 runtime variant.
- Article detail SEO visual: 2560×1440 + 1920×1080 runtime variant.
- CTA replacements: 1920×1080 PNG.
- Global logo: SVG vector.
- Strip assets use native wide-strip geometry rather than fake 16:9 canvases; they are sized above their approved display footprint.
- No V2 master/PDF crop is authorized as runtime bytes.

## Handoff rule

Claude must integrate the latest HEAD of `chatgpt/pha1-asset-production-v3-hd`, read `.webby/V3_HD_4K_AUTHORITY.json` and `.webby/CLAUDE_TASK.md`, then use Drive only for the exact frozen shards embedded in the V3 authority. No browsing for alternatives, no image search/generation/substitution, no lossy re-encode, and no `REFERENCE_ONLY` runtime use.
