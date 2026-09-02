#!/usr/bin/env python3
"""Produce exact source-limited visual recovery PNG assets from frozen approved UI references.

Claude is not allowed to choose crops or modify pixels. This script verifies the exact frozen
ui-000..ui-010 source files, applies ChatGPT-locked crop rectangles, writes PNGs, and verifies
dimensions + SHA256 of raw RGB pixel bytes against RECOVERY_ASSET_MANIFEST_V2.json.

Usage:
  python .webby/recovery-v2/produce_recovery_assets_v2.py \
      --source-dir /path/to/extracted/04_FINAL_UI_REFERENCE \
      --repo-root .

The source directory must come only from the previously frozen
LacVietMedia_PHA1_FinalAssetFreeze_91_v2.zip bundle.
"""
from __future__ import annotations
import argparse, hashlib, json, pathlib
from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
MANIFEST = HERE / "RECOVERY_ASSET_MANIFEST_V2.json"

SOURCE_SHA = {'ui-000.png': 'af3e0dc159015ec4d699a0ed383cfe660dbefe5097b935973140d16bf3748357', 'ui-001.png': '92b601b721f3b8994c37b8254ab274e8ce4069763e9b6756a1a4d573d115be58', 'ui-002.png': '54c781b3ed5735a102881153bf59b8a5c83a20ae4d9270763c707d4b19d25078', 'ui-003.png': 'dbd5f3ff65da787f1b50d66a1e839a2e1e3ffab67383b78a0481d41ab1f5b015', 'ui-004.png': 'fed6e8fd28ea646d0a3f5d0ab1f993be3917f891344e51537d9da7017d25b2d3', 'ui-005.png': 'cc423157c6303629baf41148c5e464c760ec31e06db1fecee3334fa2a38656ee', 'ui-006.png': '78a2e35309994ea4895ea15d5d5d0d5a66551474e2eee19894391a78f11c4415', 'ui-007.png': 'adf3d68d98187167f400aca71f8798e87952a392181cbf20d391064e98cfbe30', 'ui-008.png': '538048bff008879a18606a2a7a7571b302a287feca8adaaed8ce1ef0d0cee69a', 'ui-009.png': '64b9f4c88d584449915504e8d09135697fc8ba5c9498f1c8b230caddf32349ad', 'ui-010.png': 'fd029233cb675967d3ba4b6beb54bb3ca6c83b153883aa6126827bfd6bbd6655'}

def sha256_file(path: pathlib.Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def pixel_sha_rgb(im: Image.Image) -> str:
    return hashlib.sha256(im.convert("RGB").tobytes()).hexdigest()

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source-dir", required=True)
    ap.add_argument("--repo-root", default=".")
    args = ap.parse_args()
    source_dir = pathlib.Path(args.source_dir).resolve()
    repo_root = pathlib.Path(args.repo_root).resolve()
    obj = json.loads(MANIFEST.read_text(encoding="utf-8"))

    failures = []
    for name, expected in SOURCE_SHA.items():
        p = source_dir / name
        if not p.exists():
            failures.append(f"missing source {p}")
            continue
        got = sha256_file(p)
        if got != expected:
            failures.append(f"{name}: source SHA mismatch expected {expected} got {got}")
    if failures:
        print("RECOVERY_SOURCE_VERIFY_FAIL")
        for f in failures:
            print(" -", f)
        return 1

    produced = 0
    for rec in obj["assets"]:
        ui_index = rec["sourceApprovedRoutePage"] - 3
        source = source_dir / f"ui-{ui_index:03d}.png"
        im = Image.open(source).convert("RGB")
        x1, y1, x2, y2 = rec["sourceCrop"]
        crop = im.crop((x1, y1, x2, y2))
        if crop.size != (rec["nativeWidth"], rec["nativeHeight"]):
            failures.append(f'{rec["id"]}: size {crop.size} != {(rec["nativeWidth"], rec["nativeHeight"])}')
            continue
        got_pixel = pixel_sha_rgb(crop)
        if got_pixel != rec["pixelSha256RGB"]:
            failures.append(f'{rec["id"]}: pixel SHA mismatch expected {rec["pixelSha256RGB"]} got {got_pixel}')
            continue
        dest = repo_root / rec["runtimeDestination"]
        dest.parent.mkdir(parents=True, exist_ok=True)
        crop.save(dest, format="PNG", optimize=False)
        disk = Image.open(dest).convert("RGB")
        if pixel_sha_rgb(disk) != rec["pixelSha256RGB"]:
            failures.append(f'{rec["id"]}: disk pixel SHA mismatch')
            continue
        produced += 1

    if failures:
        print("RECOVERY_ASSET_PRODUCTION_FAIL")
        for f in failures:
            print(" -", f)
        return 1

    print(f"RECOVERY_ASSET_PRODUCTION_PASS {produced}/{len(obj['assets'])}")
    print(repo_root / "public" / "assets" / "recovery-v2")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
