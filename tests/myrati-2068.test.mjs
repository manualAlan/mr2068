import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
const html = await readFile(new URL('../docs/myrati/index.html', import.meta.url),'utf8');
test('Myrati keeps JB and MR with an inclusive 2068 platform', () => {
 assert.match(html,/JB Stoner/);
 assert.match(html,/Moderate Reform/);
 assert.match(html,/mr-logo\.png/);
 assert.match(html,/1,200 annual student scholarships/);
 assert.doesNotMatch(html,/Edelstein|hideout|capture-group|2064|—/);
 assert.equal((html.match(/<details>/g)||[]).length,12);
 const images=[...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m=>m[1]).filter(s=>!s.includes('logo'));
 assert.equal(images.length,5);
 assert.equal(new Set(images).size,5);
});
test('Myrati links, event anchors and assets resolve',async()=>{
 for(const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(value.startsWith('#')) assert.ok(html.includes(`id="${value.slice(1)}"`),value);
  if(!value.startsWith('/mr2068/')) continue;
  const url=new URL(value,'https://example.test');
  let path=url.pathname.slice('/mr2068/'.length);
  if(!path||path.endsWith('/'))path+='index.html';
  else if(!path.split('/').at(-1).includes('.'))path+='/index.html';
  const file=new URL(`../docs/${path}`,import.meta.url);
  await access(file);
  if(url.hash)assert.ok((await readFile(file,'utf8')).includes(`id="${url.hash.slice(1)}"`),value);
 }
});
