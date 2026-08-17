#!/usr/bin/env python3
from pathlib import Path
import hashlib,shutil,fitz
R=Path(__file__).resolve().parents[1]; P=R/".webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf"; PS="f015b20da10eb50862eec6bc9acc7668c02cd2746e31f29bdd73596319b60c4f"; S="a398f0f6002f3c71f13770c3cdcf9854f14887ff2cf2acd4fc3c46b59c9d8691"
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(P)==PS
m=R/"assets/production/masters/raster/client-logos/support-client-logo-strip.png"; d=R/"assets/production/delivery/raster/client-logos/support-client-logo-strip.png"; r=R/"public/assets/client-logos/support-client-logo-strip.png"
for p in (m,d,r): p.parent.mkdir(parents=True,exist_ok=True)
doc=fitz.open(P); pix=doc[4].get_pixmap(matrix=fitz.Matrix(12,12),clip=fitz.Rect(264.6,255.96,405.0,261.72),alpha=False); pix.save(m); doc.close(); assert (pix.width,pix.height)==(1685,70) and sha(m)==S
shutil.copy2(m,d); shutil.copy2(m,r); assert sha(d)==S and sha(r)==S; print("PASS_APPROVED_PDF_SUPPORT_CLIENT_LOGO_STRIP "+S)
