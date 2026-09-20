import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";

// Exercise the actual GitHub Pages deliverable, whose client runs without React.
// Run npm run export:pages before this suite.
const docsRoot = new URL("../docs/", import.meta.url);
const expectedPolicies = ["housing", "economy", "infrastructure", "healthcare", "civil-liberties"];
const expectedRelated = ["infrastructure", "education", "housing", "education", "economy"];

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1];
}

function markup(html) {
  const tabs = [...html.matchAll(/<button\b[^>]*role="tab"[^>]*>/g)].map(([tag]) => tag);
  const matches = [...html.matchAll(/<div\b[^>]*role="tabpanel"[^>]*>/g)];
  const panels = matches.map((match, index) => ({
    tag: match[0],
    content: html.slice(match.index, matches[index + 1]?.index ?? html.indexOf("</section>", match.index)),
  }));
  return { tabs, panels };
}

// A small DOM fixture: do not reimplement the selection behavior being tested.
// Event handlers below come directly from the exported assets/site.js.
function runClient(client, tags) {
  const documentEvents = new Map();
  const document = {
    activeElement: null,
    body: { style: {} },
    addEventListener(type, listener) { documentEvents.set(type, listener); },
    querySelector() { return null; },
    querySelectorAll(selector) { return selector === ".priority-explorer" ? [explorer] : []; },
  };
  function element(tag) {
    const attrs = new Map([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
    const listeners = new Map();
    return {
      id: attrs.get("id"),
      hidden: /\shidden(?:=|\s|>)/.test(tag),
      tabIndex: Number(attrs.get("tabindex") ?? 0),
      getAttribute(name) { return attrs.get(name) ?? null; },
      setAttribute(name, value) { attrs.set(name, value); },
      addEventListener(type, listener) { listeners.set(type, listener); },
      focus() { document.activeElement = this; },
      dispatch(type, key) {
        const event = { key, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
        listeners.get(type)?.(event);
        return event;
      },
    };
  }
  const tabs = tags.tabs.map(element);
  const panels = tags.panels.map(({ tag }) => element(tag));
  const explorer = {
    querySelectorAll(selector) {
      if (selector === '[role="tab"]') return tabs;
      if (selector === '[role="tabpanel"]') return panels;
      return [];
    },
  };
  runInNewContext(client, { document, location: { hash: "" }, requestAnimationFrame: (callback) => callback() });
  assert.ok(documentEvents.has("DOMContentLoaded"), "The static client must register its initializer");
  documentEvents.get("DOMContentLoaded")();
  return { document, tabs, panels };
}

function assertSelection({ tabs, panels }, expected) {
  assert.deepEqual(tabs.map((tab) => tab.getAttribute("aria-selected")),
    tabs.map((_, index) => String(index === expected)), "Exactly the chosen tab is selected");
  assert.deepEqual(tabs.map((tab) => tab.tabIndex),
    tabs.map((_, index) => index === expected ? 0 : -1), "Only the selected tab is in the tab order");
  assert.deepEqual(panels.map((panel) => !panel.hidden),
    panels.map((_, index) => index === expected), "The previous panel closes when another opens");
}

for (const route of ["", "2068/"]) {
  const file = new URL(`${route}index.html`, docsRoot);
  test(`/${route} exports all five priorities with only the first expanded`, async () => {
    const { tabs, panels } = markup(await readFile(file, "utf8"));
    assert.equal(tabs.length, 5);
    assert.equal(panels.length, 5, "Static HTML needs all five panels, not just the React initial selection");
    tabs.forEach((tab, index) => {
      assert.equal(attribute(tab, "id"), `priority-tab-${index}`);
      assert.equal(attribute(tab, "aria-controls"), `priority-panel-${index}`);
      assert.equal(attribute(tab, "aria-selected"), String(index === 0));
      assert.equal(attribute(tab, "tabindex"), index === 0 ? "0" : "-1");
    });
    panels.forEach(({ tag, content }, index) => {
      assert.equal(attribute(tag, "id"), `priority-panel-${index}`);
      assert.equal(attribute(tag, "aria-labelledby"), `priority-tab-${index}`);
      assert.equal(/\shidden(?:=|\s|>)/.test(tag), index !== 0);
      assert.match(content, /<h3>[^<]+<\/h3>/, "Each priority retains its own heading");
      const links = [...content.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
      assert.deepEqual(links, [
        `/mr2068/platform/${expectedPolicies[index]}`,
        `/mr2068/platform/${expectedRelated[index]}`,
      ], "Both policy links must retain the GitHub Pages base path");
    });
  });

  test(`/${route} static client switches every priority and supports keyboard navigation`, async () => {
    const [html, client] = await Promise.all([
      readFile(file, "utf8"), readFile(new URL("assets/site.js", docsRoot), "utf8"),
    ]);
    const fixture = runClient(client, markup(html));
    assert.equal(fixture.tabs.length, 5);
    assertSelection(fixture, 0);
    for (const index of [1, 2, 3, 4, 0, 4, 4, 2]) {
      fixture.tabs[index].dispatch("click");
      assertSelection(fixture, index);
    }
    for (const [from, key, to] of [
      [2, "ArrowDown", 3], [3, "ArrowRight", 4], [4, "ArrowDown", 0],
      [0, "ArrowUp", 4], [4, "ArrowLeft", 3], [3, "Home", 0], [0, "End", 4],
    ]) {
      fixture.tabs[from].dispatch("click");
      const event = fixture.tabs[from].dispatch("keydown", key);
      assert.equal(event.defaultPrevented, true, `${key} must not scroll the page`);
      assertSelection(fixture, to);
      assert.equal(fixture.document.activeElement, fixture.tabs[to], `${key} moves focus to the selected priority`);
    }
    const event = fixture.tabs[4].dispatch("keydown", "Tab");
    assert.equal(event.defaultPrevented, false, "Ordinary Tab navigation stays native");
    assertSelection(fixture, 4);
  });
}
