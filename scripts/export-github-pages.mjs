import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const origin = process.env.EXPORT_ORIGIN ?? "http://localhost:3000";
const base = "/mr-party-2064/";
const assetVersion = "20260822a";
const routes = ["", "platform", "team", "events", "ambrosia"];

await rm("docs", { recursive: true, force: true });
await mkdir("docs/assets", { recursive: true });
await cp("public/images", "docs/images", { recursive: true });
await cp("public/manifesto", "docs/manifesto", { recursive: true });

for (const route of routes) {
  const response = await fetch(`${origin}/${route}`);
  if (!response.ok) throw new Error(`Could not export /${route}: ${response.status}`);
  let html = await response.text();
  html = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, "")
    .replace(/href="\/app\/globals\.css"[^>]*>/g, `href="/assets/site.css?v=${assetVersion}">`)
    .replace(/(href|src)="\/(?!\/)/g, `$1="${base}`)
    .replace("</body>", `<script src="${base}assets/site.js?v=${assetVersion}" defer></script></body>`);
  const directory = route ? `docs/${route}` : "docs";
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}

const cssResponse = await fetch(`${origin}/app/globals.css`, {
  headers: { Accept: "text/css,*/*;q=0.1" },
});
if (!cssResponse.ok) throw new Error(`Could not export styles: ${cssResponse.status}`);
const css = (await cssResponse.text())
  .replaceAll("url('/images/", `url('${base}images/`)
  .replaceAll('url("/images/', `url("${base}images/`);
await writeFile("docs/assets/site.css", css);

const client = `
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  menu?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menu.setAttribute('aria-expanded', String(open));
  });

  const requestedEvent = new URLSearchParams(location.search).get('event');
  const eventSelect = document.querySelector('.register-form select');
  if (requestedEvent && eventSelect) eventSelect.value = requestedEvent;

  document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (form.classList.contains('register-form')) {
      form.innerHTML = '<div class="form-success"><span>YOU’RE ON THE LIST</span><h3>See you there.</h3><p>Your place has been reserved in this campaign preview.</p></div>';
    } else if (form.classList.contains('volunteer-form')) {
      form.innerHTML = '<div class="form-success compact-success"><span>WELCOME TO THE TEAM</span><h3>You’re in.</h3><p>Your local LCA organizer would follow up from the live campaign system.</p></div>';
    } else {
      form.innerHTML = '<strong>SUBSCRIBED</strong><span>The next field bulletin would land in your inbox.</span>';
    }
  }));

  if (location.hash) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({block:'start'}));
});
`;
await writeFile("docs/assets/site.js", client);
await writeFile("docs/.nojekyll", "");
console.log("GitHub Pages edition exported to docs/");
