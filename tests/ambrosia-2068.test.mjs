import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';
const html = await readFile(new URL('../docs/ambrosia/index.html', import.meta.url), 'utf8');
test('Ambrosia has one coherent 2068 campaign and twelve policy commitments', () => {
  assert.match(html, /AMBROSIA 2068/);
  assert.match(html, /build here/);
  assert.match(html, /68% of GDP/);
  assert.doesNotMatch(html, /2064|—/);
  assert.equal((html.match(/<details>/g) || []).length, 12);
  assert.match(html, /pp-logo\.png/);
  assert.match(html, /People’s Party · Ambrosia · 2068/);
  assert.doesNotMatch(html, /stands for Moderate Reform|MODERATE REFORM<\/figcaption>/);
  assert.doesNotMatch(html, /type="module"|\/app\/.*\.tsx/);
  assert.match(html, /assets\/site\.js/);
});
test('all local links and assets exist, including fragment destinations', async () => {
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (value.startsWith('#')) {
      assert.ok(html.includes(`id="${value.slice(1)}"`), value);
    } else if (value.startsWith('/mr2068/')) {
      const url = new URL(value, 'https://example.test');
      let path = url.pathname.slice('/mr2068/'.length);
      if (!path || path.endsWith('/')) path += 'index.html';
      else if (!path.split('/').at(-1).includes('.')) path += '/index.html';
      await access(new URL(`../docs/${path}`, import.meta.url));
      if (url.hash) {
        const destination = await readFile(new URL(`../docs/${path}`, import.meta.url), 'utf8');
        assert.ok(destination.includes(`id="${url.hash.slice(1)}"`), value);
      }
    }
  }
});
