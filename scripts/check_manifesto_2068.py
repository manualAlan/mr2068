"""Check the rendered manifesto's text, navigation, geometry and unique imagery."""
from pathlib import Path
import json
from pypdf import PdfReader
from manifesto_2068_content import PAGES

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / 'tmp/pdfs/manifesto-2068'
PDF = ROOT / 'output/pdf/Caprica_Freedom_to_Build_2068_Manifesto.pdf'
reader = PdfReader(PDF)
text = '\n'.join(page.extract_text() for page in reader.pages)
assert len(reader.pages) == 33
assert len(PAGES) == 22 and all(len(p['entries']) == 6 for p in PAGES)
for removed in ['Prime Minister', 'OUR DELIVERY CONTRACT', 'Deadlines, public measures',
                '72%', '\u2014', '\u2013', '\u2011']:
    assert removed not in text, f'Unexpected old copy or dash: {removed}'
for required in ['69%', '65%', '2072', 'Party Co-leader', '2068',
                 "People's Party", 'Avenir Caprica', 'Moderate Reform',
                 'four months', 'nonemergency']:
    assert required in text, f'Missing required context: {required}'

layout = json.loads((AUDIT / 'layout.json').read_text())
for i, a in enumerate(layout):
    assert a['x'] >= 0 and a['x'] + a['w'] <= 595.28 + .1
    assert a['y'] >= 0 and a['y'] + a['h'] < 841.89
    for b in layout[i+1:]:
        if a['page'] != b['page']:
            continue
        ix = min(a['x']+a['w'], b['x']+b['w']) - max(a['x'], b['x'])
        iy = min(a['y']+a['h'], b['y']+b['h']) - max(a['y'], b['y'])
        assert not (ix > .5 and iy > .5), f"Overlapping text on page {a['page']}"

photos = json.loads((AUDIT / 'photo-usage.json').read_text())
assert len(photos) == len({p['sha256'] for p in photos})
assert all(p['effective_dpi'] >= 180 for p in photos)
sources = json.loads((ROOT / 'assets/manifesto-2068/sources.json').read_text())
sourced_files = {s['file'] for s in sources['images']}
assert all(p['portrait'] or p['file'] in sourced_files for p in photos)

page_map = json.loads((AUDIT / 'page-map.json').read_text())
assert len(page_map) == 33
for key, expected in {'next-chapter':3, 'part-0':7, 'part-1':16, 'part-2':27,
                      'housing':8, 'work':11, 'health':20}.items():
    assert page_map[key] == expected, f'Incorrect printed navigation: {key}'
links = [annotation.get_object() for p in reader.pages for annotation in p.get('/Annots', [])]
assert len(links) == 11
for link in links:
    if '/Dest' in link:
        assert any(link['/Dest'][0] == page.indirect_reference for page in reader.pages)
    else:
        assert link['/A']['/URI'].startswith('https://manualalan.github.io/mr2068/')

print(f'PASS: {len(reader.pages)} pages, {len(PAGES)} policy topics, '
      f'{len(layout)} text blocks without overlap, {len(photos)} unique photos, '
      f'{len(links)} valid internal or campaign links. Visual review is still required.')
