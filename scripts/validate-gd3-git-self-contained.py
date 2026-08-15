#!/usr/bin/env python3
"""Strict no-network validator for the Lucifer-approved GĐ3 Git handoff."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
APPROVED_PDF_SHA = "f015b20da10eb50862eec6bc9acc7668c02cd2746e31f29bdd73596319b60c4f"
ORIGINAL_LOGO_SHA = "b8d4682cc216e662d8cb32968329b7a4f24ee9a89c3191653dafafe338181504"
LOSSLESS_LOGO_SHA = "8d7b16902ff157857e11a736ba4b7ef1157085906048d4ffdb6cc2d0df6da7c0"
PDF_PATH = Path(".webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf")
SOURCE_LOGO_PATH = Path("assets/production/brand/lac-viet-logo-source.png")
LOSSLESS_LOGO_PATH = Path("assets/production/brand/lac-viet-logo-canonical-lossless.webp")


def fail(message: str) -> None:
    print(f"FAIL_GD3_GIT_SELF_CONTAINED: {message}", file=sys.stderr)
    raise SystemExit(1)


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def load_json(rel: str):
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing {rel}")
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as exc:
        fail(f"invalid JSON {rel}: {exc}")


def require_file(rel: str) -> Path:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing required file {rel}")
    return p


def map_manifest_path(source_path: str) -> Path:
    if source_path.startswith("visual/"):
        return ROOT / ".webby/visual-master/gd1-v1/pages" / source_path.split("/", 1)[1]
    if source_path.startswith("assets/"):
        return ROOT / "assets/production" / source_path.split("/", 1)[1]
    fail(f"unsupported manifest path {source_path}")
    raise AssertionError


def assert_sha(rel: Path, expected: str) -> None:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing {rel.as_posix()}")
    got = sha256(path)
    if got != expected:
        fail(f"SHA mismatch {rel.as_posix()}: {got} != {expected}")


def validate(require_ready: bool) -> None:
    required_contracts = [
        ".webby/IMPLEMENTATION_CONTRACT.json",
        ".webby/DATA_BACKEND_CONTRACT.json",
        ".webby/CONTENT_TRUTH.json",
        ".webby/SEO_CONTRACT.json",
        ".webby/ANALYTICS_CONTRACT.json",
        ".webby/ACCESSIBILITY_CONTRACT.json",
        ".webby/QA_ACCEPTANCE.json",
        ".webby/HANDOFF.json",
        ".webby/WEBBY_LOCK.json",
        ".webby/PROJECT_STATE.yaml",
        ".webby/CLAUDE_TASK.md",
        ".webby/USER_VISUAL_APPROVAL.json",
        ".webby/MASTER_INDEX.json",
        ".webby/MASTER_BINARY_AUTHORITY.json",
        ".webby/ROUTE_IMPLEMENTATION_MAP.json",
        ".webby/asset-manifest.json",
        ".webby/asset-catalog.json",
    ]
    for rel in required_contracts:
        require_file(rel)

    manifest = load_json(".webby/GIT_BINARY_MANIFEST.json")
    if manifest.get("implementationRequiresGoogleDrive") is not False:
        fail("binary manifest still requires Google Drive")
    if manifest.get("approvedPdfSha256") != APPROVED_PDF_SHA:
        fail("binary manifest approved PDF SHA is wrong")
    if manifest.get("canonicalOriginalLogoPngSha256") != ORIGINAL_LOGO_SHA:
        fail("binary manifest canonical original logo SHA is wrong")
    if manifest.get("productionLogoSha256") != LOSSLESS_LOGO_SHA:
        fail("binary manifest production lossless logo SHA is wrong")
    entries = manifest.get("entries") or []
    if len(entries) != 37:
        fail(f"expected 37 manifest binary entries, found {len(entries)}")

    visual_entries = 0
    asset_entries = 0
    for entry in entries:
        source = entry.get("path")
        expected_sha = entry.get("sha256")
        expected_bytes = entry.get("bytes")
        target = map_manifest_path(source)
        if not target.is_file():
            fail(f"manifest target missing: {target.relative_to(ROOT)}")
        if target.stat().st_size != expected_bytes:
            fail(f"byte-size mismatch {target.relative_to(ROOT)}")
        got = sha256(target)
        if got != expected_sha:
            fail(f"manifest SHA mismatch {target.relative_to(ROOT)}: {got} != {expected_sha}")
        if source.startswith("visual/"):
            visual_entries += 1
        else:
            asset_entries += 1
    if visual_entries != 14 or asset_entries != 23:
        fail(f"manifest split wrong: visual={visual_entries}, assets={asset_entries}")

    assert_sha(PDF_PATH, APPROVED_PDF_SHA)
    if (ROOT / PDF_PATH).stat().st_size != 1_385_542:
        fail("approved PDF byte size is not 1,385,542")
    assert_sha(SOURCE_LOGO_PATH, ORIGINAL_LOGO_SHA)
    assert_sha(LOSSLESS_LOGO_PATH, LOSSLESS_LOGO_SHA)

    master_index = load_json(".webby/MASTER_INDEX.json")
    if master_index.get("approvedPdf", {}).get("sha256") != APPROVED_PDF_SHA:
        fail("MASTER_INDEX approved PDF SHA mismatch")
    pages = master_index.get("pages") or []
    if len(pages) != 14:
        fail(f"MASTER_INDEX expected 14 pages, found {len(pages)}")
    page_by_number = {}
    for page in pages:
        number = page.get("page")
        rel = Path(page.get("path", ""))
        if number in page_by_number:
            fail(f"duplicate MASTER_INDEX page {number}")
        page_by_number[number] = page
        p = ROOT / rel
        if not p.is_file():
            fail(f"MASTER_INDEX page missing: {rel}")
        if sha256(p) != page.get("sha256"):
            fail(f"MASTER_INDEX SHA mismatch: {rel}")
        if p.stat().st_size != page.get("bytes"):
            fail(f"MASTER_INDEX size mismatch: {rel}")

    routes = load_json(".webby/ROUTE_IMPLEMENTATION_MAP.json")
    if routes.get("approvedPdfSha256") != APPROVED_PDF_SHA:
        fail("ROUTE_IMPLEMENTATION_MAP approved PDF SHA mismatch")
    if routes.get("shared", {}).get("implementationRequiresGoogleDrive") is not False:
        fail("route map still requires Google Drive")
    route_map = routes.get("routes") or {}
    if len(route_map) != 11:
        fail(f"expected 11 implementation routes, found {len(route_map)}")
    for route, spec in route_map.items():
        number = spec.get("masterPage")
        if number not in page_by_number:
            fail(f"route {route} references unknown page {number}")
        master = page_by_number[number]
        if spec.get("masterPath") != master.get("path"):
            fail(f"route {route} masterPath mismatch")
        if spec.get("masterSha256") != master.get("sha256"):
            fail(f"route {route} masterSha256 mismatch")
        if not (ROOT / spec["masterPath"]).is_file():
            fail(f"route {route} master file missing")

    authority = load_json(".webby/MASTER_BINARY_AUTHORITY.json")
    if authority.get("status") != "GIT_SELF_CONTAINED":
        fail("MASTER_BINARY_AUTHORITY is not GIT_SELF_CONTAINED")
    if authority.get("implementationRequiresGoogleDrive") is not False:
        fail("MASTER_BINARY_AUTHORITY requires Google Drive")
    if authority.get("approvedPdf", {}).get("path") != PDF_PATH.as_posix():
        fail("MASTER_BINARY_AUTHORITY PDF path mismatch")
    if authority.get("approvedPdf", {}).get("sha256") != APPROVED_PDF_SHA:
        fail("MASTER_BINARY_AUTHORITY PDF SHA mismatch")

    asset_manifest = load_json(".webby/asset-manifest.json")
    if asset_manifest.get("binaryManifest") != ".webby/GIT_BINARY_MANIFEST.json":
        fail("asset-manifest binary authority is not Git manifest")
    assets = asset_manifest.get("assets") or []
    if not assets or assets[0].get("implementationRequiresGoogleDrive") is not False:
        fail("asset-manifest still requires Google Drive")

    approval = load_json(".webby/USER_VISUAL_APPROVAL.json")
    approval_text = json.dumps(approval, ensure_ascii=False)
    if "DUYỆT GIAO DIỆN V1" not in approval_text or "USER_APPROVED_FINAL" not in approval_text:
        fail("user visual approval receipt is missing final approval evidence")

    if require_ready:
        marker = require_file(".webby/UI_SETUP_COMPLETE").read_text(encoding="utf-8")
        state = require_file(".webby/PROJECT_STATE.yaml").read_text(encoding="utf-8")
        handoff = load_json(".webby/HANDOFF.json")
        lock = load_json(".webby/WEBBY_LOCK.json")
        if "UI_SETUP_COMPLETE=true" not in marker:
            fail("release marker UI_SETUP_COMPLETE is not true")
        if "implementationAuthorized=true" not in marker:
            fail("release marker implementationAuthorized is not true")
        if "uiSetupComplete: true" not in state:
            fail("PROJECT_STATE uiSetupComplete is not true")
        if "authorized: true" not in state:
            fail("PROJECT_STATE implementation authorization is not true")
        if handoff.get("uiSetupComplete") is not True or handoff.get("implementationAuthorized") is not True:
            fail("HANDOFF does not authorize implementation")
        if handoff.get("implementationRequiresGoogleDrive") is not False:
            fail("HANDOFF requires Google Drive")
        if lock.get("implementationRequiresGoogleDrive") is not False:
            fail("WEBBY_LOCK requires Google Drive")

    print("PASS_GD3_GIT_SELF_CONTAINED")
    print(f"binary_entries={len(entries)}")
    print(f"visual_masters={visual_entries}")
    print(f"production_assets={asset_entries}")
    print(f"approved_pdf_sha256={APPROVED_PDF_SHA}")
    print(f"canonical_logo_source_sha256={ORIGINAL_LOGO_SHA}")
    print(f"release_ready_check={str(require_ready).lower()}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--require-ready", action="store_true", help="also require the final UI_SETUP_COMPLETE release state")
    args = parser.parse_args()
    validate(args.require_ready)
