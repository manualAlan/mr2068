import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
const html = await readFile(new URL('../docs/montiablo/index.html', import.meta.url), 'utf8');
test('Montiablo has Jon, PP branding, twelve commitments and six distinct photographs', () => {
  assert.match(html, /Jon Fraser/);
  assert.match(html, /People’s Party/);
  assert.match(html, /pp-logo\.png/);
  assert.doesNotMatch(html, /Ronan|2064|—/);
  assert.equal((html.match(/<details>/g) || []).length, 12);
  const photos = [...html.matchAll(/<img[^>]+src="([^"]+\/montiablo\/[^"]+)"/g)].map(m => m[1]);
  assert.equal(photos.length, 6);
  assert.equal(new Set(photos).size, 6);
});
test('Montiablo assets and local links resolve, including other-page anchors', async () => {
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (value.startsWith('#')) assert.ok(html.includes(`id="${value.slice(1)}"`), value);
    if (!value.startsWith('/mr2068/')) continue;
    const url = new URL(value, 'https://example.test');
    let path = url.pathname.slice('/mr2068/'.length);
    if (!path || path.endsWith('/')) path += 'index.html';
    else if (!path.split('/').at(-1).includes('.')) path += '/index.html';
    const file = new URL(`../docs/${path}`, import.meta.url);
    await access(file);
    if (url.hash) assert.ok((await readFile(file,'utf8')).includes(`id="${url.hash.slice(1)}"`), value);
  }
});
