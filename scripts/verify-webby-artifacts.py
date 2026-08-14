#!/usr/bin/env python3
from __future__ import annotations
import argparse, hashlib, json, zipfile
from pathlib import Path

def sha256(path: Path) -> str:
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024), b''): h.update(chunk)
    return h.hexdigest()

def verify(path: Path, expected: str, label: str) -> None:
    actual=sha256(path)
    if actual.lower()!=expected.lower(): raise SystemExit(f'{label}_SHA256_FAIL {actual}')
    print(f'{label}_SHA256_PASS {actual}')

def main()->int:
    p=argparse.ArgumentParser(); p.add_argument('--root',default='.'); p.add_argument('--master'); p.add_argument('--assets'); p.add_argument('--extract',action='store_true'); a=p.parse_args()
    root=Path(a.root).resolve(); mi=json.loads((root/'.webby/MASTER_BINARY_AUTHORITY.json').read_text(encoding='utf-8')); ai=json.loads((root/'assets/PRODUCTION_ASSETS_AUTHORITY.json').read_text(encoding='utf-8'))
    if not a.master or not a.assets: raise SystemExit('Provide downloaded files using --master and --assets. Use the Drive URLs in the authority JSON files.')
    master=Path(a.master).resolve(); assets=Path(a.assets).resolve(); verify(master,mi['sha256'],'MASTER'); verify(assets,ai['sha256'],'ASSETS')
    if a.extract:
        for src,dest in [(master,root/'.webby/cache/master-snapshot'),(assets,root/'assets/production')]:
            dest.mkdir(parents=True,exist_ok=True)
            with zipfile.ZipFile(src) as z: z.extractall(dest)
            print(f'EXTRACT_PASS {dest}')
    return 0
if __name__=='__main__': raise SystemExit(main())
