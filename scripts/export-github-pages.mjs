import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const origin = process.env.EXPORT_ORIGIN ?? "http://localhost:3000";
const base = "/mr2068/";
const assetVersion = "20260918c";
const routes = [
  { source: "2068", output: "" },
  { source: "2068", output: "2068" },
  { source: "platform/mission-statement", output: "platform/mission-statement" },
  { source: "platform/housing", output: "platform/housing" },
  { source: "platform/healthcare", output: "platform/healthcare" },
  { source: "platform/civil-liberties", output: "platform/civil-liberties" },
  { source: "platform/foreign-policy", output: "platform/foreign-policy" },
  { source: "platform/defense", output: "platform/defense" },
  { source: "team", output: "team" },
  { source: "events", output: "events" },
  { source: "ambrosia", output: "ambrosia" },
];

await rm("docs", { recursive: true, force: true });
await mkdir("docs/assets", { recursive: true });
await cp("public/images", "docs/images", { recursive: true });
await cp("public/manifesto", "docs/manifesto", { recursive: true });
await mkdir("docs/video", { recursive: true });
await cp("public/video/caprica-2068-city.mp4", "docs/video/caprica-2068-city.mp4");

for (const route of routes) {
  const response = await fetch(`${origin}/${route.source}`);
  if (!response.ok) throw new Error(`Could not export /${route.source}: ${response.status}`);
  let html = await response.text();
  html = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, "")
    .replace(/href="\/app\/globals\.css"[^>]*>/g, `href="/assets/site.css?v=${assetVersion}">`)
    .replace(/(href|src)="\/(?!\/)/g, `$1="${base}`)
    .replaceAll(`href="${base}2068"`, `href="${base}"`)
    .replace("</body>", `<script src="${base}assets/site.js?v=${assetVersion}" defer></script></body>`);
  const directory = route.output ? `docs/${route.output}` : "docs";
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

  const campaignMenu = document.querySelector('.lca68-menu');
  const campaignScrim = document.querySelector('.lca68-menu-scrim');
  const campaignDrawer = document.querySelector('.lca68-drawer');
  const platformGroup = document.querySelector('.lca68-drawer-group');
  const platformTrigger = document.querySelector('.lca68-drawer-platform-trigger');
  const platformLauncher = document.querySelector('.lca68-platform-link');
  const setPlatformMenu = open => {
    platformGroup?.classList.toggle('is-expanded', open);
    platformTrigger?.setAttribute('aria-expanded', String(open));
  };
  const setCampaignMenu = (open, showPlatforms = false) => {
    campaignMenu?.classList.toggle('is-open', open);
    campaignScrim?.classList.toggle('is-open', open);
    campaignDrawer?.classList.toggle('is-open', open);
    campaignMenu?.setAttribute('aria-expanded', String(open));
    campaignMenu?.setAttribute('aria-label', open ? 'Close campaign menu' : 'Open campaign menu');
    campaignScrim?.setAttribute('tabindex', open ? '0' : '-1');
    campaignDrawer?.setAttribute('aria-hidden', String(!open));
    if (!open || showPlatforms) setPlatformMenu(open && showPlatforms);
  };
  campaignMenu?.addEventListener('click', () => setCampaignMenu(!campaignMenu.classList.contains('is-open')));
  campaignScrim?.addEventListener('click', () => setCampaignMenu(false));
  platformTrigger?.addEventListener('click', () => setPlatformMenu(!platformGroup?.classList.contains('is-expanded')));
  platformLauncher?.addEventListener('click', () => setCampaignMenu(true, true));
  campaignDrawer?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setCampaignMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setCampaignMenu(false);
  });

  const campaignVideo = document.querySelector('.lca68-video');
  const musicButton = document.querySelector('.lca68-music');
  const musicBars = musicButton?.querySelector('.lca68-music-bars');
  const musicLabel = musicButton?.querySelector('b');
  const updateMusic = muted => {
    musicBars?.classList.toggle('is-muted', muted);
    if (musicLabel) musicLabel.textContent = muted ? 'Music off' : 'Music on';
    musicButton?.setAttribute('aria-label', muted ? 'Turn background music on' : 'Turn background music off');
    musicButton?.setAttribute('aria-pressed', String(!muted));
  };
  musicButton?.addEventListener('click', async () => {
    if (!campaignVideo) return;
    campaignVideo.muted = !campaignVideo.muted;
    campaignVideo.volume = 0.65;
    updateMusic(campaignVideo.muted);
    if (!campaignVideo.muted) await campaignVideo.play();
  });
  if (campaignVideo) updateMusic(campaignVideo.muted);

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
