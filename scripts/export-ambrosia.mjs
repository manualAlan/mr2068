// Scoped export: preserve all other pages and their unpublished changes.
import { mkdir, writeFile } from 'node:fs/promises';
const origin = process.env.EXPORT_ORIGIN || 'http://localhost:3000';
const base = '/mr2068/';
for (const route of (process.env.EXPORT_ROUTES?.split(',') || ['ambrosia', 'chasmia', 'montiablo', 'myrati', 'team', 'events'])) {
  const response = await fetch(`${origin}/${route}/`);
  if (!response.ok) throw new Error(`${route} returned ${response.status}`);
  const html = (await response.text())
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, '')
    .replace(/<link\b[^>]*href="\/app\/(?:globals|campaign-2068)\.css(?:\?[^"]*)?"[^>]*>/gi, '')
    .replace('</head>', '<link rel="stylesheet" href="/assets/site.css?v=myrati-2068-v1"></head>')
    .replace(/(href|src|poster)="\/(?!\/)/g, `$1="${base}`)
    .replace('</body>', `<script src="${base}assets/site.js?v=20260918d" defer></script></body>`);
  await mkdir(`docs/${route}`, { recursive: true });
  await writeFile(`docs/${route}/index.html`, html);
}
const styles = await Promise.all(['globals.css', 'campaign-2068.css'].map(async file => {
  const result = await fetch(`${origin}/app/${file}`, { headers: { Accept: 'text/css,*/*;q=0.1' } });
  if (!result.ok) throw new Error(`Stylesheet ${file}: ${result.status}`);
  return result.text();
}));
await writeFile('docs/assets/site.css', styles.join('\n').replace(/url\(\s*(['"]?)\/(?!\/)([^)'"\s]+)\1\s*\)/g, (_, quote, path) => `url(${quote}${base}${path}${quote})`));
console.log('Exported the regional campaigns, team links and shared styles.');
