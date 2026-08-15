#!/usr/bin/env python3
"""Clone-only reconstruction preflight.

The final GĐ3 package is materialized directly in Git. This script performs no
network access and never downloads from Drive. Its job is to prove a fresh
clone already contains the implementation masters and assets Claude needs.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / ".webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf"
PAGES = ROOT / ".webby/visual-master/gd1-v1/pages"
ASSETS = ROOT / "assets/production"
MANIFEST = ROOT / ".webby/GIT_BINARY_MANIFEST.json"
LOGO_SOURCE = ASSETS / "brand/lac-viet-logo-source.png"

required = [PDF, PAGES, ASSETS, MANIFEST, LOGO_SOURCE]
missing = [str(p.relative_to(ROOT)) for p in required if not p.exists()]
if missing:
    print("FAIL_GIT_SELF_CONTAINED: missing required Git-resident paths:", file=sys.stderr)
    for item in missing:
        print(f"  - {item}", file=sys.stderr)
    raise SystemExit(1)

pages = sorted(PAGES.glob("page-*.webp"))
assets = sorted(ASSETS.rglob("*.webp"))
if len(pages) != 14:
    raise SystemExit(f"FAIL_GIT_SELF_CONTAINED: expected 14 visual masters, found {len(pages)}")
if len(assets) != 23:
    raise SystemExit(f"FAIL_GIT_SELF_CONTAINED: expected 23 production WebP assets, found {len(assets)}")

print("PASS_GIT_SELF_CONTAINED")
print("mode=already-materialized-in-git")
print("network_required=false")
print(f"approved_pdf={PDF.relative_to(ROOT)}")
print(f"visual_master_count={len(pages)}")
print(f"production_webp_asset_count={len(assets)}")
print(f"canonical_logo_source={LOGO_SOURCE.relative_to(ROOT)}")
