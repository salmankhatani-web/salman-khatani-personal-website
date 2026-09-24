from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote
ROOT = Path(__file__).resolve().parent.parent

class Checker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.images = [], set(), []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'a' and 'href' in a: self.links.append(a['href'])
        if tag == 'img': self.images.append(a)

c = Checker()
c.feed((ROOT / 'index.html').read_text(encoding='utf-8'))
missing = []
for a in c.images:
    if not a.get('alt'): missing.append('Image missing alt text: ' + str(a.get('src')))
    if a.get('src', '').startswith('assets/') and not (ROOT / unquote(a['src'])).is_file():
        if a['src'] != 'assets/portrait.webp':
            missing.append('Missing image file: ' + a['src'])
        else:
            print('NOTICE: Professional portrait not yet uploaded; typographic fallback remains visible')
for link in c.links:
    if link.startswith('#') and link[1:] not in c.ids:
        missing.append('Missing internal anchor: ' + link)
assert not missing, '\n'.join(missing)
assert len(c.images) <= 1, 'Unexpected photo dependency'
assert len(c.ids) > 3, 'Unexpectedly small page'
print(f'PASS: portrait-ready site; {len(c.links)} links inspected; {len(c.ids)} anchors present')
