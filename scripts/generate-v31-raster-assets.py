#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import math
import random
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
MASTER_ROOT = ROOT / "assets/production/masters/raster"
DELIVERY_ROOT = ROOT / "assets/production/delivery/raster"
META_PATH = ROOT / ".webby/RASTER_ASSET_METADATA.json"

INK = "#0B0B0B"
INK2 = "#111111"
GOLD = "#D4AF37"
GOLD2 = "#B8891F"
GOLD_LIGHT = "#F0CF73"
IVORY = "#FCFAF6"
IVORY2 = "#F7F2E8"
TEXT = "#171717"
MUTED = "#655F56"
BORDER = "#E6DED0"
WHITE = "#FFFFFF"


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def ensure_dirs() -> None:
    MASTER_ROOT.mkdir(parents=True, exist_ok=True)
    DELIVERY_ROOT.mkdir(parents=True, exist_ok=True)


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def gold_grid(draw: ImageDraw.ImageDraw, w: int, h: int, step: int = 150, alpha_color="#2A2416"):
    for x in range(0, w + 1, step):
        draw.line((x, 0, x, h), fill=alpha_color, width=1)
    for y in range(0, h + 1, step):
        draw.line((0, y, w, y), fill=alpha_color, width=1)


def radial_drum(draw: ImageDraw.ImageDraw, cx: int, cy: int, radius: int, rings: int = 7):
    for i in range(rings):
        r = int(radius * (i + 1) / rings)
        color = GOLD if i in {rings - 1, rings - 3} else "#5D4B20"
        width = max(2, radius // 170)
        draw.ellipse((cx-r, cy-r, cx+r, cy+r), outline=color, width=width)
    rays = 24
    for i in range(rays):
        a = 2 * math.pi * i / rays
        r1 = radius * 0.22
        r2 = radius * 0.92
        x1, y1 = cx + math.cos(a) * r1, cy + math.sin(a) * r1
        x2, y2 = cx + math.cos(a) * r2, cy + math.sin(a) * r2
        draw.line((x1, y1, x2, y2), fill="#5D4B20", width=max(2, radius//220))
    draw.ellipse((cx-radius*0.12, cy-radius*0.12, cx+radius*0.12, cy+radius*0.12), outline=GOLD_LIGHT, width=max(3, radius//120))


def browser_mock(draw: ImageDraw.ImageDraw, box, accent=GOLD, dark=False, seed=0):
    x0,y0,x1,y1 = map(int, box)
    bg = "#171717" if dark else WHITE
    line = "#343434" if dark else "#E8E1D7"
    rounded(draw, (x0,y0,x1,y1), max(20,(x1-x0)//40), bg, outline=line, width=max(2,(x1-x0)//400))
    bar_h = max(36,(y1-y0)//11)
    draw.line((x0, y0+bar_h, x1, y0+bar_h), fill=line, width=max(2,(x1-x0)//500))
    dot_r = max(5,(x1-x0)//180)
    for j,c in enumerate(("#D96C5F","#D5A94B","#66A86D")):
        cx=x0+bar_h//2+j*dot_r*3
        cy=y0+bar_h//2
        draw.ellipse((cx-dot_r,cy-dot_r,cx+dot_r,cy+dot_r),fill=c)
    rng=random.Random(seed)
    content_top=y0+bar_h+max(24,(y1-y0)//18)
    left=x0+max(28,(x1-x0)//20)
    right=x1-max(28,(x1-x0)//20)
    width=right-left
    hero_h=max(70,(y1-y0)//4)
    rounded(draw,(left,content_top,right,content_top+hero_h),max(12,width//80),"#1B1B1B" if dark else "#F4EFE6")
    draw.rectangle((left,content_top,left+width*0.42,content_top+hero_h),fill=accent)
    cards_y=content_top+hero_h+max(22,(y1-y0)//22)
    gap=max(14,width//50)
    card_w=(width-gap*2)//3
    for i in range(3):
        cx0=left+i*(card_w+gap)
        rounded(draw,(cx0,cards_y,cx0+card_w,y1-max(28,(y1-y0)//18)),max(10,card_w//20),"#202020" if dark else "#FBF8F1",outline=line,width=2)
        img_h=(y1-cards_y)*0.36
        draw.rectangle((cx0,cards_y,cx0+card_w,cards_y+img_h),fill=["#31270F","#2A2F36","#2E231A"][i%3])
        for k in range(3):
            yy=int(cards_y+img_h+20+k*18)
            ww=int(card_w*(0.72-rng.random()*0.18))
            draw.rounded_rectangle((cx0+18,yy,cx0+18+ww,yy+7),radius=3,fill="#786F63" if dark else "#D8CEC0")


def device_stack(draw: ImageDraw.ImageDraw, w: int, h: int, seed=0):
    x0=int(w*0.56); y0=int(h*0.22); x1=int(w*0.93); y1=int(h*0.78)
    browser_mock(draw,(x0,y0,x1,y1),GOLD,dark=True,seed=seed)
    phone_w=int(w*0.11); phone_h=int(h*0.46)
    px0=int(w*0.78); py0=int(h*0.46)
    rounded(draw,(px0,py0,px0+phone_w,py0+phone_h),phone_w//8,"#0F0F0F",outline=GOLD2,width=max(3,w//900))
    rounded(draw,(px0+phone_w*0.08,py0+phone_w*0.16,px0+phone_w*0.92,py0+phone_h-phone_w*0.12),phone_w//12,"#FAF6ED")
    draw.rectangle((px0+phone_w*0.12,py0+phone_w*0.22,px0+phone_w*0.88,py0+phone_h*0.35),fill=GOLD)
    for i in range(4):
        yy=py0+phone_h*0.43+i*phone_h*0.095
        draw.rounded_rectangle((px0+phone_w*0.16,yy,px0+phone_w*(0.77 if i%2==0 else 0.62),yy+phone_h*0.025),radius=4,fill="#CBBFAE")


def base_hero(kind: str, seed: int) -> Image.Image:
    w,h=3840,2160
    img=Image.new("RGB",(w,h),INK)
    d=ImageDraw.Draw(img)
    gold_grid(d,w,h,180,"#211C13")
    # left reading zone stays intentionally quiet
    d.rectangle((0,0,int(w*0.52),h),fill=INK)
    rng=random.Random(seed)
    for _ in range(22):
        x=rng.randint(int(w*0.5),w)
        y=rng.randint(0,h)
        r=rng.randint(2,8)
        d.ellipse((x-r,y-r,x+r,y+r),fill="#5F512C")
    if kind=="home":
        radial_drum(d,int(w*0.77),int(h*0.5),int(h*0.39),8)
        for i in range(3):
            x=int(w*(0.62+i*0.07)); y=int(h*(0.37+i*0.11))
            rounded(d,(x,y,x+int(w*0.18),y+int(h*0.12)),28,"#141414",outline="#5D4B20",width=3)
            d.rectangle((x+30,y+30,x+int(w*0.055),y+int(h*0.09)),fill=GOLD if i==0 else GOLD2)
    elif kind=="website":
        device_stack(d,w,h,seed)
        radial_drum(d,int(w*0.84),int(h*0.27),int(h*0.16),5)
    elif kind=="support":
        cx,cy=int(w*0.76),int(h*0.52)
        nodes=[]
        for i in range(9):
            a=2*math.pi*i/9
            rr=int(h*(0.16 if i%2 else 0.29))
            x=int(cx+math.cos(a)*rr); y=int(cy+math.sin(a)*rr)
            nodes.append((x,y))
            d.line((cx,cy,x,y),fill="#5D4B20",width=4)
            r=int(h*0.045)
            d.ellipse((x-r,y-r,x+r,y+r),fill="#151515",outline=GOLD2,width=5)
            d.ellipse((x-r//3,y-r//3,x+r//3,y+r//3),fill=GOLD if i%3==0 else GOLD_LIGHT)
        r=int(h*0.08); d.ellipse((cx-r,cy-r,cx+r,cy+r),fill=GOLD,outline=GOLD_LIGHT,width=6)
    elif kind=="digital":
        for i in range(4):
            x=int(w*(0.61+i*0.055)); y=int(h*(0.25+i*0.12)); ww=int(w*0.24); hh=int(h*0.17)
            rounded(d,(x,y,x+ww,y+hh),32,"#141414",outline="#6A5723",width=4)
            d.ellipse((x+45,y+45,x+125,y+125),fill=GOLD if i%2==0 else GOLD2)
            for k in range(3):
                yy=y+55+k*32
                d.rounded_rectangle((x+160,yy,x+ww-50-(k*45),yy+12),radius=6,fill="#6D6042")
    elif kind=="projects":
        for row in range(2):
            for col in range(2):
                x=int(w*(0.58+col*0.18)); y=int(h*(0.2+row*0.34)); ww=int(w*0.16); hh=int(h*0.28)
                browser_mock(d,(x,y,x+ww,y+hh),GOLD if (row+col)%2==0 else GOLD2,dark=False,seed=seed+row*2+col)
    elif kind=="knowledge":
        for i in range(3):
            x=int(w*(0.61+i*0.07)); y=int(h*(0.24+i*0.14)); ww=int(w*0.23); hh=int(h*0.30)
            rounded(d,(x,y,x+ww,y+hh),28,IVORY,outline="#6B5831",width=3)
            d.rectangle((x,y,x+ww,y+int(hh*0.47)),fill=["#2C2418","#44351B","#262C31"][i])
            d.rectangle((x+36,y+int(hh*0.57),x+int(ww*0.72),y+int(hh*0.60)),fill=GOLD2)
            for k in range(3):
                yy=y+int(hh*(0.68+k*0.075)); d.rectangle((x+36,yy,x+int(ww*(0.78-k*0.08)),yy+10),fill="#BFB5A6")
    elif kind=="contact":
        cx=int(w*0.76)
        for i in range(5):
            x=int(w*(0.59 if i%2==0 else 0.69)); y=int(h*(0.22+i*0.135)); ww=int(w*(0.24 if i%2==0 else 0.20)); hh=int(h*0.09)
            rounded(d,(x,y,x+ww,y+hh),hh//2,"#161616",outline=GOLD2,width=4)
            d.ellipse((x+30,y+hh*0.28,x+30+hh*0.44,y+hh*0.72),fill=GOLD)
            d.rounded_rectangle((x+int(hh*0.9),y+int(hh*0.34),x+ww-int(hh*0.35),y+int(hh*0.44)),radius=5,fill="#65583A")
        radial_drum(d,cx,int(h*0.5),int(h*0.38),6)
    return img


def project_cover(idx:int) -> Image.Image:
    w,h=1920,1200
    palettes=[("#F7F2E8",GOLD),("#0F1720","#D7B25A"),("#EFE9DE","#80634C"),("#F8F8F6","#1F6F65"),("#111111",GOLD),("#F4EFE7","#A54D3D")]
    bg,accent=palettes[(idx-1)%len(palettes)]
    img=Image.new("RGB",(w,h),bg); d=ImageDraw.Draw(img)
    # presentation board / environment
    for x in range(0,w,160): d.line((x,0,x,h),fill="#E5DED2" if bg[1] in "FfEe" else "#1F252B",width=1)
    for y in range(0,h,160): d.line((0,y,w,y),fill="#E5DED2" if bg[1] in "FfEe" else "#1F252B",width=1)
    x0=180+(idx%3)*35; y0=150+(idx%4)*20; x1=w-170; y1=h-140
    browser_mock(d,(x0,y0,x1,y1),accent,dark=bg in {"#0F1720","#111111"},seed=100+idx)
    # accent slabs for distinct identity
    d.polygon([(80,h*0.78),(w*0.34,h*0.58),(w*0.39,h),(80,h)],fill=accent)
    return img


def article_cover(idx:int) -> Image.Image:
    w,h=1920,1080
    img=Image.new("RGB",(w,h),IVORY if idx%2 else INK2); d=ImageDraw.Draw(img)
    dark=idx%2==0
    fg=GOLD if dark else GOLD2
    line="#3A321E" if dark else "#DED4C5"
    for x in range(0,w,120): d.line((x,0,x,h),fill=line,width=1)
    for y in range(0,h,120): d.line((0,y,w,y),fill=line,width=1)
    cx=int(w*(0.67 if idx%3 else 0.62)); cy=int(h*0.50)
    radial_drum(d,cx,cy,int(h*0.34),6)
    # editorial paper / search card
    x0=int(w*0.12); y0=int(h*0.17); ww=int(w*0.42); hh=int(h*0.66)
    rounded(d,(x0,y0,x0+ww,y0+hh),34,"#151515" if dark else WHITE,outline=fg,width=4)
    d.rectangle((x0,y0,x0+ww,y0+int(hh*0.12)),fill=fg)
    for k in range(7):
        yy=y0+int(hh*(0.22+k*0.09)); length=ww*(0.76-(k%3)*0.09)
        d.rounded_rectangle((x0+55,yy,x0+55+length,yy+14),radius=7,fill="#6A604B" if dark else "#D2C6B4")
    return img


def detail_visual(kind:str) -> Image.Image:
    w,h=1920,1080
    img=Image.new("RGB",(w,h),IVORY); d=ImageDraw.Draw(img)
    if kind=="about":
        radial_drum(d,int(w*0.68),int(h*0.5),int(h*0.38),8)
        # exact canonical logo shown inside source-safe native bounds, never enlarged over 480px
        logo_path=ROOT/"assets/production/brand/lac-viet-logo-source.png"
        if logo_path.exists():
            logo=Image.open(logo_path).convert("RGBA")
            max_side=420
            logo.thumbnail((max_side,max_side),Image.Resampling.LANCZOS)
            img.paste(logo,(int(w*0.68-logo.width/2),int(h*0.5-logo.height/2)),logo)
        d.rectangle((140,180,650,195),fill=GOLD)
        for i in range(6): d.rounded_rectangle((140,260+i*75,620-i*25,275+i*75),radius=7,fill="#D7CCBB")
    elif kind=="project":
        browser_mock(d,(170,130,1750,910),GOLD,dark=False,seed=777)
        rounded(d,(1250,470,1590,1030),50,"#101010",outline=GOLD,width=5)
        rounded(d,(1280,520,1560,980),38,"#FAF6ED")
        d.rectangle((1310,560,1530,700),fill=GOLD)
    elif kind=="seo":
        img=Image.new("RGB",(w,h),INK); d=ImageDraw.Draw(img)
        gold_grid(d,w,h,120,"#211C13")
        rounded(d,(180,180,1740,900),40,"#141414",outline="#5D4B20",width=4)
        rounded(d,(280,280,1640,400),60,"#0D0D0D",outline=GOLD,width=5)
        d.ellipse((330,315,380,365),outline=GOLD_LIGHT,width=6)
        d.line((370,355,405,385),fill=GOLD_LIGHT,width=6)
        for i,height in enumerate((0.25,0.42,0.35,0.56,0.72,0.61,0.82)):
            x=350+i*160; y0=790; y1=int(y0-height*360)
            rounded(d,(x,y1,x+80,y0),18,GOLD if i in {4,6} else GOLD2)
    return img


def avatar(idx:int) -> Image.Image:
    w=h=1920
    bg=["#E9DCC7","#DCE5E1","#E4DDD7","#E6E0CF"][idx-1]
    skin=["#C98E68","#A96F52","#D3A07D","#B77B5E"][idx-1]
    hair=["#2C211B","#171717","#3B281F","#222222"][idx-1]
    shirt=[GOLD2,"#355B63","#7B4F42","#4E4B35"][idx-1]
    img=Image.new("RGB",(w,h),bg); d=ImageDraw.Draw(img)
    # non-photoreal demo portrait; deliberately not a real-person identity
    d.ellipse((480,250,1440,1210),fill=skin)
    d.pieslice((450,150,1470,1120),180,360,fill=hair)
    d.ellipse((720,600,790,670),fill="#2B211E"); d.ellipse((1130,600,1200,670),fill="#2B211E")
    d.arc((800,670,1120,920),20,160,fill="#7B4E42",width=24)
    d.polygon([(340,1920),(520,1190),(1400,1190),(1580,1920)],fill=shirt)
    # frame accents
    d.ellipse((120,120,1800,1800),outline=GOLD,width=28)
    return img


def fit_delivery(img:Image.Image, target:tuple[int,int]) -> Image.Image:
    tw,th=target
    iw,ih=img.size
    scale=max(tw/iw,th/ih)
    nw,nh=int(iw*scale),int(ih*scale)
    r=img.resize((nw,nh),Image.Resampling.LANCZOS)
    left=(nw-tw)//2; top=(nh-th)//2
    return r.crop((left,top,left+tw,top+th))


def save_asset(asset_id:str, group:str, img:Image.Image, quality_class:str, delivery_size:tuple[int,int], classification:str, role:str, item:str|None=None, notes:str|None=None):
    mdir=MASTER_ROOT/group; ddir=DELIVERY_ROOT/group
    mdir.mkdir(parents=True,exist_ok=True); ddir.mkdir(parents=True,exist_ok=True)
    mp=mdir/f"{asset_id}.webp"; dp=ddir/f"{asset_id}.webp"
    img.save(mp,"WEBP",quality=96,method=6)
    delivery=fit_delivery(img,delivery_size)
    delivery.save(dp,"WEBP",quality=86,method=6)
    return {
        "id":asset_id,"classification":classification,"role":role,"item":item,
        "master":{"path":str(mp.relative_to(ROOT)),"width":img.width,"height":img.height,"format":"webp","qualityClass":quality_class,"sha256":sha256(mp),"bytes":mp.stat().st_size,"nativeOrAuthoritativeHighRes":True,"derivedFromLowRes":False},
        "delivery":{"path":str(dp.relative_to(ROOT)),"width":delivery.width,"height":delivery.height,"format":"webp","sha256":sha256(dp),"bytes":dp.stat().st_size,"runtimeSourceType":"PROJECT_PATH"},
        "notes":notes
    }


def main():
    ensure_dirs()
    entries=[]
    heroes=[("home-hero-master","home"),("website-hero-master","website"),("support-hero-master","support"),("digital-hero-master","digital"),("projects-hero-master","projects"),("knowledge-hero-master","knowledge"),("contact-hero-master","contact")]
    for i,(aid,kind) in enumerate(heroes,1):
        entries.append(save_asset(aid,"hero",base_hero(kind,300+i),"4K_CLASS",(1920,1080),"DECORATIVE","HERO",notes="Native 3840x2160 deterministic artwork; low-res legacy WebP not used as source."))
    for i in range(1,13):
        aid=f"project-cover-{i:02d}"
        entries.append(save_asset(aid,"projects",project_cover(i),"FHD_CLASS",(1280,800),"DEMO","PROJECT_COVER",item=f"demo-project-{i:02d}",notes="Demo-only visual identity; must not be presented as a real client claim."))
    for i in range(1,8):
        aid=f"article-cover-{i:02d}"
        entries.append(save_asset(aid,"articles",article_cover(i),"FHD_CLASS",(1280,720),"EDITORIAL","NEWS_COVER",item=f"demo-article-{i:02d}",notes="Editorial/demo content artwork."))
    entries.append(save_asset("about-bird-master","detail",detail_visual("about"),"FHD_CLASS",(1280,720),"DECORATIVE","DETAIL_VISUAL",notes="Uses exact canonical source logo at <=420px inside a native FHD composition; logo is not redrawn or enlarged beyond source-safe bounds."))
    entries.append(save_asset("project-detail-device-master","detail",detail_visual("project"),"FHD_CLASS",(1280,720),"DEMO","DETAIL_VISUAL",notes="Demo device mockup."))
    entries.append(save_asset("article-seo-hero-master","detail",detail_visual("seo"),"FHD_CLASS",(1280,720),"EDITORIAL","DETAIL_VISUAL",notes="Editorial SEO/analytics artwork."))
    for i in range(1,5):
        aid=f"demo-avatar-{i:02d}"
        entries.append(save_asset(aid,"avatars",avatar(i),"FHD_CLASS",(512,512),"DEMO","AVATAR",item=f"demo-avatar-{i:02d}",notes="Non-photoreal fictional demo avatar; not a real customer/person claim."))
    # exact pre-existing canonical logo = 34th raster logical asset; quality exception is explicit
    logo_master=ROOT/"assets/production/brand/lac-viet-logo-source.png"
    logo_delivery=ROOT/"assets/production/brand/lac-viet-logo-canonical-lossless.webp"
    if not logo_master.exists() or not logo_delivery.exists():
        raise SystemExit("canonical logo source/delivery missing")
    li=Image.open(logo_master)
    ld=Image.open(logo_delivery)
    entries.append({
        "id":"lac-viet-logo-canonical","classification":"BRAND","role":"LOGO","item":"Lac Viet Media Agency",
        "master":{"path":str(logo_master.relative_to(ROOT)),"width":li.width,"height":li.height,"format":"png","qualityClass":"FHD_CLASS","sha256":sha256(logo_master),"bytes":logo_master.stat().st_size,"nativeOrAuthoritativeHighRes":True,"derivedFromLowRes":False,"qualityException":"Exact Lucifer-approved 480x480 identity source. Never fake-upscale/redraw/vectorize; display within source-safe bounds."},
        "delivery":{"path":str(logo_delivery.relative_to(ROOT)),"width":ld.width,"height":ld.height,"format":"webp","sha256":sha256(logo_delivery),"bytes":logo_delivery.stat().st_size,"runtimeSourceType":"PROJECT_PATH"},
        "notes":"Canonical identity authority exception."
    })
    if len(entries)!=34:
        raise SystemExit(f"expected 34 raster logical assets, got {len(entries)}")
    payload={"schemaVersion":1,"protocolVersion":"3.1.0","generator":"scripts/generate-v31-raster-assets.py","sourcePolicy":"NATIVE_DETERMINISTIC_GENERATION; NO_LOW_RES_UPSCALE_AS_AUTHORITY","logicalRasterAssetCount":34,"generatedNewRasterAssetCount":33,"entries":entries}
    META_PATH.write_text(json.dumps(payload,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("PASS_RASTER_GENERATION")
    print("logicalRasterAssetCount=34")
    print("generatedNewRasterAssetCount=33")
    print("hero4K=7")
    print("fhdNew=26")

if __name__=="__main__":
    main()
