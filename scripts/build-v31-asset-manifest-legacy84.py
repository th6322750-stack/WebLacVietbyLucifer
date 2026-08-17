#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
RASTER_META=ROOT/'.webby/RASTER_ASSET_METADATA.json'
VECTOR_SUMS=ROOT/'.webby/VECTOR_SHA256SUMS.txt'
MANIFEST=ROOT/'.webby/asset-manifest.json'
USAGE_MAP=ROOT/'.webby/ASSET_USAGE_MAP.json'
PUBLIC=ROOT/'public/assets'

UI_ICON_IDS=[
'menu','close','chevron-down','chevron-right','arrow-right','arrow-left','external-link','check','circle-check','circle-alert',
'star','user','users','briefcase','shield-check','percent','globe','messages-square','package','badge-check','clock','calendar','target','mail','phone',
'map-pin','send','monitor-smartphone','building','code','palette','headset','shopping-bag','credit-card','lightbulb','search','filter','lock-keyhole','sparkles','award'
]
BRANDS=['facebook','tiktok','meta','youtube','openai-chatgpt','microsoft','canva','zalo','messenger','telegram']
BRAND_ITEM={
'facebook':'Facebook','tiktok':'TikTok','meta':'Meta','youtube':'YouTube','openai-chatgpt':'OpenAI','microsoft':'Microsoft','canva':'Canva','zalo':'Zalo','messenger':'Messenger','telegram':'Telegram'
}

def sha256(path:Path)->str:
    h=hashlib.sha256()
    with path.open('rb') as f:
        for c in iter(lambda:f.read(1024*1024),b''): h.update(c)
    return h.hexdigest()

def ensure_parent(p:Path): p.parent.mkdir(parents=True,exist_ok=True)

def copy_exact(src:Path,dst:Path):
    ensure_parent(dst); shutil.copy2(src,dst)
    if sha256(src)!=sha256(dst): raise SystemExit(f'copy hash mismatch: {src} -> {dst}')

def parse_vector_sums():
    out={}
    for line in VECTOR_SUMS.read_text().splitlines():
        h,path=line.split(None,1); out[path.strip()]=h
    return out

def presentation(role:str):
    if role=='HERO': return {'objectFit':'cover','objectPosition':'center','desktopAspect':'16:9','mobileCrop':'declared by route composition; no pixel measurement'}
    if role=='PROJECT_COVER': return {'objectFit':'cover','objectPosition':'center','aspect':'16:10'}
    if role=='NEWS_COVER': return {'objectFit':'cover','objectPosition':'center','aspect':'16:9'}
    if role=='AVATAR': return {'objectFit':'cover','objectPosition':'center','aspect':'1:1','shape':'circle when used as avatar'}
    if role=='LOGO': return {'objectFit':'contain','objectPosition':'center','preserveAspectRatio':True}
    if role=='ICON': return {'display':'inline vector','strokeOrFill':'use source semantics; UI icons inherit currentColor where source permits'}
    return {'objectFit':'contain','objectPosition':'center'}

def runtime_path_for_raster(e):
    aid=e['id']; role=e['role']
    if role=='HERO': return f'public/assets/hero/{aid}.webp'
    if role=='PROJECT_COVER': return f'public/assets/projects/{aid}.webp'
    if role=='NEWS_COVER': return f'public/assets/articles/{aid}.webp'
    if role=='AVATAR': return f'public/assets/avatars/{aid}.webp'
    if role=='LOGO': return 'public/assets/brand/lac-viet-logo.webp'
    return f'public/assets/detail/{aid}.webp'

def build_raster_assets():
    data=json.loads(RASTER_META.read_text())
    result=[]
    for e in data['entries']:
        aid=e['id']; role=e['role']; cls=e['classification']
        src=ROOT/e['delivery']['path']; dest_rel=runtime_path_for_raster(e); dest=ROOT/dest_rel
        copy_exact(src,dest)
        master=e['master']
        item=e.get('item')
        identity_required=bool(item) and cls in {'BRAND','DEMO','EDITORIAL'}
        live='ALLOWED'
        if cls=='DEMO' or role=='AVATAR': live='DEMO_ONLY'
        if cls=='EDITORIAL': live='DEMO_ONLY'
        m={
          'id':aid,'classification':cls,'role':role,'item':item,'identityRequired':identity_required,'authoritative':True,
          'master':{
            'qualityClass':master['qualityClass'],'fileName':master['path'],'format':master['format'],
            'width':master['width'],'height':master['height'],'sha256':master['sha256'],
            'nativeOrAuthoritativeHighRes':master['nativeOrAuthoritativeHighRes'],'derivedFromLowRes':master['derivedFromLowRes']
          },
          'delivery':[{
            'usage':'default','fileName':dest.name,'destinationPath':dest_rel,'runtimeSourceType':'PROJECT_PATH','runtimeSource':None,
            'width':e['delivery']['width'],'height':e['delivery']['height'],'format':e['delivery']['format'],'byteSize':dest.stat().st_size,
            'maxWeight':2_500_000 if role=='HERO' else 1_500_000,'transparent': True if role=='LOGO' else False,'sha256':sha256(dest)
          }],
          'allowedUsage':['default'],'presentationByUsage':{'default':presentation(role)},
          'priority':'above-fold' if role=='HERO' else ('high' if role in {'LOGO','PROJECT_COVER'} else 'lazy'),
          'livePolicy':live,
          'mustNot':[]
        }
        if aid=='lac-viet-logo-canonical':
            m['master']['qualityException']='Exact 480x480 Lucifer-approved identity source; quality-class dimension exception. Never upscale/redraw/vectorize as a new authority.'
            m['mustNot']=['redraw','vectorize','fake-upscale','recolor','replace without Lucifer approval']
        if live=='DEMO_ONLY': m['mustNot'].append('present as verified production fact/client/person')
        result.append(m)
    return result

def build_vector_assets():
    sums=parse_vector_sums(); result=[]
    for name in UI_ICON_IDS:
        aid=f'icon-{name}'; src_rel=f'assets/production/vectors/ui/{aid}.svg'; src=ROOT/src_rel
        if not src.exists(): raise SystemExit(f'missing UI icon: {src_rel}')
        if sums.get(src_rel)!=sha256(src): raise SystemExit(f'vector checksum mismatch {src_rel}')
        dest_rel=f'public/assets/icons/{aid}.svg'; dest=ROOT/dest_rel; copy_exact(src,dest)
        result.append({
          'id':aid,'classification':'DECORATIVE','role':'ICON','item':None,'identityRequired':False,'authoritative':True,
          'master':{'qualityClass':'VECTOR','fileName':src_rel,'format':'svg','width':24,'height':24,'sha256':sha256(src),'nativeOrAuthoritativeHighRes':True,'derivedFromLowRes':False},
          'delivery':[{'usage':'default','fileName':dest.name,'destinationPath':dest_rel,'runtimeSourceType':'PROJECT_PATH','runtimeSource':None,'width':24,'height':24,'format':'svg','byteSize':dest.stat().st_size,'maxWeight':32_768,'transparent':True,'sha256':sha256(dest)}],
          'allowedUsage':['default'],'presentationByUsage':{'default':presentation('ICON')},'priority':'high','livePolicy':'ALLOWED',
          'mustNot':['substitute with Unicode/ad-hoc CSS/different icon library export']
        })
    for slug in BRANDS:
        aid=f'brand-{slug}'; src_rel=f'assets/production/vectors/brands/{aid}.svg'; src=ROOT/src_rel
        if not src.exists(): raise SystemExit(f'missing brand vector: {src_rel}')
        if sums.get(src_rel)!=sha256(src): raise SystemExit(f'vector checksum mismatch {src_rel}')
        dest_rel=f'public/assets/brands/{aid}.svg'; dest=ROOT/dest_rel; copy_exact(src,dest)
        must=['do not distort','do not substitute with a visually similar mark']
        if slug=='openai-chatgpt': must += ['follow https://openai.com/brand/ usage guidance','do not imply OpenAI endorsement']
        result.append({
          'id':aid,'classification':'AUTHENTIC','role':'LOGO','item':BRAND_ITEM[slug],'identityRequired':True,'authoritative':True,
          'master':{'qualityClass':'VECTOR','fileName':src_rel,'format':'svg','width':24,'height':24,'sha256':sha256(src),'nativeOrAuthoritativeHighRes':True,'derivedFromLowRes':False},
          'delivery':[{'usage':'default','fileName':dest.name,'destinationPath':dest_rel,'runtimeSourceType':'PROJECT_PATH','runtimeSource':None,'width':24,'height':24,'format':'svg','byteSize':dest.stat().st_size,'maxWeight':65_536,'transparent':True,'sha256':sha256(dest)}],
          'allowedUsage':['default'],'presentationByUsage':{'default':presentation('LOGO')},'priority':'high','livePolicy':'ALLOWED','mustNot':must
        })
    return result

def usage_map():
    return {
      'schemaVersion':1,'protocolVersion':'3.1.0','rule':'Exact asset IDs only; no array-index guessing or visual substitution.',
      'shared':{
        'logo':'lac-viet-logo-canonical',
        'uiIcons':[f'icon-{x}' for x in UI_ICON_IDS],
        'brandMarks':[f'brand-{x}' for x in BRANDS],
        'demoAvatars':[f'demo-avatar-{i:02d}' for i in range(1,5)]
      },
      'routes':{
        '/':{'hero':'home-hero-master','featuredProjects':[f'project-cover-{i:02d}' for i in range(1,5)],'knowledge':[f'article-cover-{i:02d}' for i in range(1,5)]},
        '/website':{'hero':'website-hero-master','projects':[f'project-cover-{i:02d}' for i in range(1,5)]},
        '/support-mxh':{'hero':'support-hero-master','brandMarks':['brand-facebook','brand-tiktok','brand-meta','brand-youtube']},
        '/dich-vu-so':{'hero':'digital-hero-master','brandMarks':['brand-openai-chatgpt','brand-youtube','brand-microsoft','brand-canva']},
        '/du-an':{'hero':'projects-hero-master','projects':[f'project-cover-{i:02d}' for i in range(1,13)]},
        '/kien-thuc':{'hero':'knowledge-hero-master','articles':[f'article-cover-{i:02d}' for i in range(1,8)]},
        '/gioi-thieu':{'detail':'about-bird-master'},
        '/du-an/[slug]':{'detail':'project-detail-device-master','relatedProjects':[f'project-cover-{i:02d}' for i in range(1,5)]},
        '/kien-thuc/[slug]':{'detail':'article-seo-hero-master','relatedArticles':[f'article-cover-{i:02d}' for i in range(1,4)]},
        '/lien-he':{'hero':'contact-hero-master','brandMarks':['brand-zalo','brand-messenger','brand-telegram'],'contactIcon':'icon-phone'},
        '/404':{'icons':['icon-circle-alert','icon-arrow-left']}
      }
    }

def main():
    raster=build_raster_assets(); vectors=build_vector_assets(); assets=raster+vectors
    if len(raster)!=34 or len(vectors)!=50 or len(assets)!=84: raise SystemExit(f'bad counts raster={len(raster)} vectors={len(vectors)} all={len(assets)}')
    ids=[a['id'] for a in assets]
    if len(ids)!=len(set(ids)): raise SystemExit('duplicate asset IDs')
    icons=[{'id':f'icon-{x}','required':True,'sourceInApprovedUI':'approved V1 UI / shared component-state inventory','notes':'Pinned Lucide exact SVG export; semantic ID fixed.'} for x in UI_ICON_IDS]
    manifest={
      'version':3,'protocolVersion':'3.1.0','uiRevision':4,
      'assetStore':{'transportMode':'GIT','folderRef':None,'accessProofStatus':'NOT_REQUIRED','verifiedForSessionId':None,'sessionVerifiedAt':None},
      'qualityPolicy':{
        'rasterMasterMinimum':'FHD_CLASS','heroPreferred':'4K_CLASS','allowLowResUpscaleAsAuthority':False,'allowLowResPatchwork':False,
        'logoIdentityException':'Exact approved 480x480 canonical logo is allowed as identity authority and must not be fake-upscaled/redrawn.',
        'vectorSourcesLock':'.webby/VECTOR_SOURCE_LOCK.json','rasterMetadata':'.webby/RASTER_ASSET_METADATA.json'
      },
      'iconInventory':icons,'assets':assets
    }
    MANIFEST.write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n')
    USAGE_MAP.write_text(json.dumps(usage_map(),indent=2,ensure_ascii=False)+'\n')
    print('PASS_V31_ASSET_MANIFEST')
    print('assets=84 raster=34 vector=50 icons=40 brands=10')
    print('runtime_root=public/assets')

if __name__=='__main__': main()
