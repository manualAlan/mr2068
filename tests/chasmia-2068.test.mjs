import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../docs/chasmia/index.html', import.meta.url), 'utf8');

test('Chasmia is a coherent 2068 campaign with twelve detailed commitments', () => {
  assert.match(html, /CHASMIA 2068/);
  assert.match(html, /Build the/);
  assert.match(html, /HARRY BALLS/);
  assert.doesNotMatch(html, /Richard Balls|2064|—/);
  assert.equal((html.match(/<details>/g) || []).length, 12);
  assert.match(html, /mr-logo\.png/);
});

test('Chasmia local assets and fragment links resolve', async () => {
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (value.startsWith('#')) assert.ok(html.includes(`id="${value.slice(1)}"`), value);
    if (!value.startsWith('/mr2068/')) continue;
    const url = new URL(value, 'https://example.test');
    let path = url.pathname.slice('/mr2068/'.length);
    if (!path || path.endsWith('/')) path += 'index.html';
    else if (!path.split('/').at(-1).includes('.')) path += '/index.html';
    await access(new URL(`../docs/${path}`, import.meta.url));
    if (url.hash) {
      const target = await readFile(new URL(`../docs/${path}`, import.meta.url), 'utf8');
      assert.ok(target.includes(`id="${url.hash.slice(1)}"`), value);
    }
  }
});
