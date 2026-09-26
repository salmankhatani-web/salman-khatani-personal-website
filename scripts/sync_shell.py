"""Regenerate shared shell fragments. No runtime or package dependencies."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parent.parent
for path in ROOT.rglob('index.html'):
    relative=path.relative_to(ROOT)
    if {'dist','node_modules','.wrangler','.git'} & set(relative.parts): continue
    prefix='../'*(len(relative.parts)-1)
    text=path.read_text()
    for name in ['header','footer']:
        fragment=(ROOT/'components'/f'{name}.html').read_text().strip()
        def rewrite(match):
            href=match.group(1)
            if re.match(r'[a-z]+:',href): return match.group(0)
            route=href.removeprefix('./')
            current=relative.as_posix().removesuffix('index.html')
            active=' aria-current="page"' if name=='header' and route==current else ''
            return f'href="{prefix+route if prefix+route else "./"}"{active}'
        fragment=re.sub(r'href="([^"]*)"',rewrite,fragment)
        text=re.sub(r'<'+name+r' class="site-'+name+r'".*?</'+name+'>',lambda _:fragment,text,flags=re.S)
    path.write_text(text)
print('Shared header and footer synchronized.')
