"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  { label: "Platform", href: "/platform" },
  { label: "Candidates", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Merchandise", href: "https://www.etsy.com/market/campaign_merchandise", external: true },
  { label: "Manifesto" },
  { label: "Contact" },
];

export default function CampaignMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <button
        className={open ? "lca68-menu is-open" : "lca68-menu"}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close campaign menu" : "Open campaign menu"}
        aria-expanded={open}
        aria-controls="lca68-campaign-menu"
      >
        <span />
        <span />
      </button>

      <button
        className={open ? "lca68-menu-scrim is-open" : "lca68-menu-scrim"}
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close campaign menu"
        tabIndex={open ? 0 : -1}
      />

      <aside
        className={open ? "lca68-drawer is-open" : "lca68-drawer"}
        id="lca68-campaign-menu"
        aria-hidden={!open}
      >
        <div className="lca68-drawer-heading">
          <span>LCA / 2068</span>
          <p>Navigate the campaign</p>
        </div>
        <nav aria-label="2068 campaign navigation">
          {menuItems.map((item, index) => item.href ? (
            item.external ? (
              <a href={item.href} target="_blank" rel="noreferrer" key={item.label} onClick={() => setOpen(false)}>
                <small>0{index + 1}</small><span>{item.label}</span><i aria-hidden="true">↗</i>
              </a>
            ) : (
              <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>
                <small>0{index + 1}</small><span>{item.label}</span><i aria-hidden="true">→</i>
              </Link>
            )
          ) : (
            <span className="lca68-drawer-placeholder" aria-disabled="true" key={item.label}>
              <small>0{index + 1}</small><span>{item.label}</span><em>Coming soon</em>
            </span>
          ))}
        </nav>
        <p className="lca68-drawer-note">Liberal-Conservative Alliance<br />Caprican election cycle 2068</p>
      </aside>
    </>
  );
}
