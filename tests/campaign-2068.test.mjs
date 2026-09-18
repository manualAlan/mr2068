import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

// Run after npm run export:pages. These checks inspect the deliverable GitHub
// Pages serves; they do not require a browser, a server, or the build worker.
const docsRoot = new URL("../docs/", import.meta.url);
const siteBase = "/mr2068/";
const policyRoutes = [
  "platform/mission-statement",
  "platform/economy",
  "platform/housing",
  "platform/healthcare",
  "platform/civil-liberties",
  "platform/foreign-policy",
  "platform/defense",
];
const routes = ["", "2068", ...policyRoutes, "events", "team"];

const namedEntities = {
  amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ",
  rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', ndash: "–", mdash: "—",
};

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith("#")) {
      const hexadecimal = code[1].toLowerCase() === "x";
      const point = Number.parseInt(code.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    }
    return namedEntities[code.toLowerCase()] ?? entity;
  });
}

function visibleText(html) {
  return decodeEntities(html
    .replace(/<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]*>/g, " "))
    .normalize("NFKC")
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function attribute(tag, name) {
  const result = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"));
  return result ? decodeEntities(result[2]) : undefined;
}

async function page(route) {
  const path = route ? `${route}/index.html` : "index.html";
  try {
    return await readFile(new URL(path, docsRoot), "utf8");
  } catch (error) {
    assert.fail(`Cannot read docs/${path}. Run npm run export:pages after the new pages are ready. ${error.message}`);
  }
}

async function assertLocalAsset(rawUrl, context, route = "") {
  if (/^(?:data:|https?:|\/\/|#)/i.test(rawUrl)) return;
  const url = new URL(rawUrl, `https://manualalan.github.io${siteBase}${route ? `${route}/` : ""}`);
  assert.ok(url.pathname.startsWith(siteBase), `${context}: asset escapes ${siteBase}: ${rawUrl}`);
  const relativePath = decodeURIComponent(url.pathname.slice(siteBase.length));
  const file = new URL(relativePath, docsRoot);
  assert.ok(file.href.startsWith(docsRoot.href), `${context}: asset escapes docs/: ${rawUrl}`);
  const info = await stat(file).catch(() => null);
  assert.ok(info?.isFile() && info.size > 0, `${context}: missing or empty asset ${relativePath}`);
}

for (const route of routes) {
  test(`exported /${route} is a complete Alliance page`, async () => {
    const html = await page(route);
    assert.match(html, /<!doctype html>/i);
    assert.match(html, /<main\b/i);
    assert.match(html, /<h1\b/i);
    assert.doesNotMatch(html, /Internal Server Error|__vite_error_overlay__/i);
    const text = visibleText(html);
    assert.doesNotMatch(text, /PLATFORM\s*\/\s*0?\d\b/i, "Old platform number labels should be gone");
    assert.doesNotMatch(text, /Moderate Reform Party|People['’]s Party|Avenir Caprica|three[ -]party coalition|coalition partners/i,
      "The current campaign should present one Alliance identity");
    assert.doesNotMatch(text, /Stability and Growth Pact|Cutter Doctrine/i);

    const stylesheetTags = [...html.matchAll(/<link\b[^>]*>/gi)]
      .map(([tag]) => tag)
      .filter((tag) => attribute(tag, "rel") === "stylesheet");
    assert.equal(stylesheetTags.length, 1, "Export should use one combined stylesheet");
    assert.match(attribute(stylesheetTags[0], "href") ?? "", /^\/mr2068\/assets\/site\.css(?:\?|$)/);
    const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map(([tag]) => attribute(tag, "src"));
    assert.equal(scripts.length, 1, "Development scripts should be replaced by the static client");
    assert.match(scripts[0] ?? "", /^\/mr2068\/assets\/site\.js(?:\?|$)/);

    const urls = new Set();
    for (const [tag] of html.matchAll(/<(?:img|script|source|video|link)\b[^>]*>/gi)) {
      for (const name of ["src", "poster", "href"]) {
        const value = attribute(tag, name);
        if (value) urls.add(value);
      }
    }
    for (const value of urls) await assertLocalAsset(value, `/${route || ""}`, route);
  });
}

test("every page keeps Platform as an accessible category button with economy beneath it", async () => {
  for (const route of routes) {
    const html = await page(route);
    const trigger = [...html.matchAll(/<button\b[^>]*>/gi)]
      .map(([tag]) => tag)
      .find((tag) => /\blca68-drawer-platform-trigger\b/.test(attribute(tag, "class") ?? ""));
    assert.ok(trigger, `/${route}: missing Platform category button`);
    assert.equal(attribute(trigger, "aria-controls"), "lca68-platform-submenu");
    assert.equal(attribute(trigger, "aria-expanded"), "false");
    assert.match(html, /href=["']\/mr2068\/platform\/economy\/?["']/);
    for (const [tag, body] of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
      assert.notEqual(visibleText(body), "Platform", `/${route}: Platform must not be a page link`);
      assert.doesNotMatch(attribute(tag, "href") ?? "", /^\/mr2068\/platform\/?(?:[?#].*)?$/);
    }
    const drawer = html.match(/<aside\b[^>]*id=["']lca68-campaign-menu["'][^>]*>/i)?.[0];
    assert.ok(drawer, `/${route}: missing shared campaign drawer`);
    assert.equal(attribute(drawer, "aria-hidden"), "true");
    assert.match(drawer, /\binert(?:\s|=|>)/i);
  }
});

test("policy details retain the campaign's named commitments", async () => {
  const expectations = {
    "platform/housing": [/50% more homes by 2072/i, /120 days/i, /60 days/i],
    "platform/healthcare": [/seven days/i, /14 days/i, /no extra charge/i],
    "platform/civil-liberties": [/Nuremberg Act/i, /judicial approval/i, /encryption backdoors/i],
    "platform/foreign-policy": [/The Bluespan Doctrine/i, /Kaoqing Communique/i, /OURS/, /Kerevan/i, /Oshmit/i],
    "platform/defense": [/stronger navy and air force/i, /smaller.{0,30}army/i, /CU partners/i],
    "platform/economy": [/20% earnings credit/i, /20,000 aurums/i, /net debt ceiling below 70%/i, /correction plan/i],
    "platform/mission-statement": [/Alan Bluespan/i],
  };
  for (const [route, commitments] of Object.entries(expectations)) {
    const text = visibleText(await page(route));
    for (const commitment of commitments) assert.match(text, commitment, `/${route}: missing ${commitment}`);
  }
});

test("fonts and CSS images resolve within the GitHub Pages base path", async () => {
  const css = await readFile(new URL("assets/site.css", docsRoot), "utf8");
  const urls = [...css.matchAll(/url\(\s*(["']?)([^)'"\s]+)\1\s*\)/g)].map((match) => match[2]);
  assert.ok(urls.some((url) => /\/fonts\/.+\.(?:woff2?|ttf|otf)(?:[?#]|$)/i.test(url)), "Expected a self-hosted campaign font");
  for (const url of new Set(urls)) await assertLocalAsset(url, "site.css");
});

test("the current manifesto is exported as a real PDF", async () => {
  const pdf = await readFile(new URL("manifesto/caprica-freedom-to-build-2068.pdf", docsRoot));
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
  const html = await page("");
  assert.match(html, /href=["']\/mr2068\/manifesto\/caprica-freedom-to-build-2068\.pdf["']/);
});

test("the exported client preserves keyboard focus and submenu state", async () => {
  const client = await readFile(new URL("assets/site.js", docsRoot), "utf8");
  assert.match(client, /event\.key\s*===\s*['"]Escape['"]/);
  assert.match(client, /event\.key\s*!==\s*['"]Tab['"]/);
  assert.match(client, /event\.shiftKey/);
  assert.match(client, /first\?\.focus\(\)/);
  assert.match(client, /last\?\.focus\(\)/);
  assert.match(client, /platformTrigger\?\.focus\(\{\s*preventScroll:\s*true\s*\}\)/);
  assert.match(client, /returnFocus\.focus\(\{\s*preventScroll:\s*true\s*\}\)/);
  assert.match(client, /toggleAttribute\(['"]inert['"]/);
  assert.match(client, /link\.tabIndex\s*=\s*open\s*\?\s*0\s*:\s*-1/);
  assert.match(client, /document\.body\.style\.overflow\s*=\s*['"]hidden['"]/);
  assert.match(client, /addEventListener\(['"]mouseenter['"]/);
});

test("the export includes motion controls and respects reduced motion", async () => {
  const client = await readFile(new URL("assets/site.js", docsRoot), "utf8");
  assert.match(client, /querySelector\(['"]\.lca68-motion['"]\)/);
  assert.match(client, /matchMedia\(['"]\(prefers-reduced-motion: reduce\)['"]\)/);
  assert.match(client, /campaignVideo\.autoplay\s*=\s*false/);
  assert.match(client, /campaignVideo\.pause\(\)/);
  assert.match(client, /campaignVideo\.muted\s*=\s*true/);
  assert.match(client, /Play background video/);
  assert.match(client, /Pause background video/);
  assert.doesNotMatch(client, /form\.innerHTML|Your place has been reserved|SUBSCRIBED/);
});

test("event actions download calendar entries instead of claiming a reservation", async () => {
  const html = await page("events");
  assert.doesNotMatch(html, /<form\b/i);
  const calendarLinks = [...html.matchAll(/<a\b[^>]*>/gi)]
    .map(([tag]) => ({ href: attribute(tag, "href"), download: attribute(tag, "download") }))
    .filter(({ href }) => href?.startsWith("data:text/calendar;"));
  assert.ok(calendarLinks.length > 0, "Expected event calendar downloads");
  for (const { href, download } of calendarLinks) {
    assert.match(download ?? "", /-2068\.ics$/);
    const calendar = decodeURIComponent(href.slice(href.indexOf(",") + 1)).replace(/\r\n /g, "");
    assert.match(calendar, /^BEGIN:VCALENDAR\r\n/);
    assert.match(calendar, /\r\nDTSTART:2068\d{4}T\d{6}\r\n/);
    assert.match(calendar, /\r\nLOCATION:.+\r\n/);
    assert.match(calendar, /END:VEVENT\r\nEND:VCALENDAR\r\n$/);
  }
});
