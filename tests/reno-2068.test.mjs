import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import test from 'node:test';
const html=await readFile(new URL('../docs/reno/index.html',import.meta.url),'utf8');
test('Reno has a distinct MR 2068 campaign and faithful candidate biography',()=>{
 for(const term of ['Roberto Libero','constitutional law','defense attorney','parliamentary sovereignty','Moderate Reform','CATA','2068','Romeu Zema']) assert.ok(html.includes(term),term);
 assert.doesNotMatch(html,/<(?:ul|ol)(?:\s|>)|2064|—|Photography &amp; credits/);
 assert.match(html,/A good life/);
 assert.match(html,/mr-logo\.png/);
 for(const id of ['your-time','your-home','your-economy','your-confidence','your-government','roberto','join']) assert.ok(html.includes(`id="${id}"`),id);
 const pictures=[...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m=>m[1]).filter(p=>!p.includes('logo'));
 assert.equal(pictures.length,5);
 assert.equal(new Set(pictures).size,pictures.length);
});
test('Reno links and assets resolve in the published export',async()=>{
 for(const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(value.startsWith('#')) assert.ok(html.includes(`id="${value.slice(1)}"`),value);
  if(!value.startsWith('/mr2068/'))continue;
  const url=new URL(value,'https://example.test');
  let path=url.pathname.slice('/mr2068/'.length);
  if(!path||path.endsWith('/'))path+='index.html';
  else if(!path.split('/').at(-1).includes('.'))path+='/index.html';
  const file=new URL(`../docs/${path}`,import.meta.url);
  await access(file);
  if(url.hash)assert.ok((await readFile(file,'utf8')).includes(`id="${url.hash.slice(1)}"`),value);
 }
 const team=await readFile(new URL('../docs/team/index.html',import.meta.url),'utf8');
 assert.match(team,/href="\/mr2068\/roberto-libero\/?"[^>]+id="libero"/);
});
