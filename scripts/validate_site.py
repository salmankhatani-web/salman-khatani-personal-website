"""Dependency-free structural and SEO regression checks for every public page."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse, unquote
from collections import Counter
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://salman-khatani-personal-website.salmankhatani.workers.dev/'
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links=[]; self.ids=[]; self.assets=[]; self.meta=[]; self.canonical=[]
        self.schemas=[]; self.h1=[]; self.title=''; self.images=[]; self.stack=[]; self.errors=[]
        self.schema_text=None; self.heading_text=None; self.title_text=None
        self.feed(text)
        if self.stack: self.errors.append('Unclosed tags: '+str(self.stack))
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag not in VOID: self.stack.append(tag)
        if a.get('id'): self.ids.append(a['id'])
        if tag=='meta': self.meta.append(a)
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a['href'])
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='link' and a.get('rel')=='stylesheet': self.assets.append(a.get('href',''))
        if tag=='script' and a.get('src'): self.assets.append(a['src'])
        if tag=='img': self.images.append(a);self.assets.append(a.get('src',''))
        if tag=='script' and a.get('type')=='application/ld+json': self.schema_text=''
        if tag=='h1': self.heading_text=''
        if tag=='title': self.title_text=''
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag,attrs)
        if tag not in VOID: self.handle_endtag(tag)
    def handle_endtag(self, tag):
        if tag in VOID: return
        if self.stack and self.stack[-1]==tag: self.stack.pop()
        else: self.errors.append('Misnested closing tag: '+tag)
        if tag=='script' and self.schema_text is not None:
            try: self.schemas.append(json.loads(self.schema_text))
            except json.JSONDecodeError as exc: self.errors.append('Invalid JSON-LD: '+str(exc))
            self.schema_text=None
        if tag=='h1' and self.heading_text is not None:
            self.h1.append(' '.join(self.heading_text.split()));self.heading_text=None
        if tag=='title': self.title=self.title_text or '';self.title_text=None
    def handle_data(self,data):
        if self.schema_text is not None: self.schema_text+=data
        if self.heading_text is not None: self.heading_text+=data
        if self.title_text is not None: self.title_text+=data

def contains(old,new):
    """Existing schema properties/relationships must survive; additions are allowed."""
    if isinstance(old,dict): return isinstance(new,dict) and all(k in new and contains(v,new[k]) for k,v in old.items())
    if isinstance(old,list): return isinstance(new,list) and all(any(contains(v,w) for w in new) for v in old)
    return old==new

def metadata(items):
    return {x.get('name',x.get('property','charset')):x.get('content',x.get('charset')) for x in items if x.get('name')!='theme-color'}

def check():
    errors=[]; pages={p.relative_to(ROOT).as_posix():Page(p.read_text()) for p in ROOT.rglob('index.html') if not {'.git','dist','node_modules','.wrangler'} & set(p.relative_to(ROOT).parts)}
    baseline=json.loads((ROOT/'docs/seo-baseline.json').read_text())
    all_links=set(); total=0
    for name,p in pages.items():
        errors.extend(f'{name}: {e}' for e in p.errors)
        if len(p.h1)!=1: errors.append(f'{name}: requires one H1')
        if len(p.canonical)!=1: errors.append(f'{name}: requires one canonical')
        if not p.title: errors.append(f'{name}: missing title')
        if 'description' not in metadata(p.meta): errors.append(f'{name}: missing description')
        duplicates=[key for key,n in Counter(p.ids).items() if n>1]
        if duplicates: errors.append(f'{name}: duplicate IDs {duplicates}')
        for img in p.images:
            if 'alt' not in img: errors.append(f'{name}: image missing alt')
            if 'width' not in img or 'height' not in img: errors.append(f'{name}: image has no intrinsic dimensions')
        current=urljoin(BASE,name.removesuffix('index.html'))
        for link in p.links+p.assets:
            total+=1; url=urljoin(current,link);q=urlparse(url)
            if link in p.links: all_links.add(url)
            if q.netloc!=urlparse(BASE).netloc: continue
            target=unquote(q.path).lstrip('/')
            if not Path(target).suffix: target+='index.html'
            if not (ROOT/target).is_file(): errors.append(f'{name}: missing target {link}');continue
            if q.fragment and target in pages and unquote(q.fragment) not in pages[target].ids: errors.append(f'{name}: missing fragment {link}')
    for name,old in baseline['pages'].items():
        if name not in pages: errors.append('Lost URL: '+name);continue
        new=pages[name]
        for label,before,after in [('title',old['title'],new.title),('metadata',metadata(old['meta']),metadata(new.meta)),('canonical',old['canonical'],new.canonical),('H1',old['h1'],new.h1)]:
            if before!=after: errors.append(f'{name}: {label} regression')
        if not contains(old['schema'],new.schemas): errors.append(f'{name}: schema relationship regression')
        current=urljoin(BASE,name.removesuffix('index.html'))
        for link in old['links']:
            url=urljoin(current,link)
            if urlparse(url).netloc!=urlparse(BASE).netloc and url not in all_links: errors.append('Lost external source link: '+url)
    for name in ['robots.txt']:
        if (ROOT/name).read_text()!=baseline['infrastructure'][name]: errors.append(name+' changed')
    for line in baseline['infrastructure']['llms.txt'].splitlines():
        if 'https://' in line and line not in (ROOT/'llms.txt').read_text(): errors.append('Lost llms reference: '+line)
    oldlocs={e.text for e in ET.fromstring(baseline['infrastructure']['sitemap.xml']).iter() if e.tag.endswith('loc')}
    newlocs={e.text for e in ET.parse(ROOT/'sitemap.xml').iter() if e.tag.endswith('loc')}
    if not oldlocs<=newlocs: errors.append('Lost sitemap URLs')
    for url in newlocs:
        target=urlparse(url).path.lstrip('/')+'index.html'
        if target not in pages: errors.append('Sitemap URL missing: '+url)
    for name in ['index.html','research/index.html']:
        text=(ROOT/name).read_text()
        if 'Work in Progress' not in text or 'Version 0.1' not in text: errors.append(name+': missing research status')
    if errors: raise SystemExit('\n'.join(sorted(set(errors))))
    print(f'PASS: {len(pages)} pages; {total} links/assets; {len(oldlocs)} original sitemap URLs retained; metadata, H1s and all existing schema properties preserved.')
    print('PASS: external source links retained; robots unchanged; llms references retained; PAFRI development status explicit.')

if __name__=='__main__': check()
