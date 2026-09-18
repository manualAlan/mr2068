"use client";

import Link from "next/link";
import { FocusEvent, useEffect, useState } from "react";

const platformLinks = [
  { label: "Mission Statement", href: "/platform/mission-statement" },
  { label: "Housing", href: "/platform/housing" },
  { label: "Healthcare", href: "/platform/healthcare" },
  { label: "Civil Liberties", href: "/platform/civil-liberties" },
  { label: "Foreign Policy", href: "/platform/foreign-policy" },
  { label: "Defense", href: "/platform/defense" },
];

const menuItems = [
  { label: "Candidates", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Merchandise", href: "https://www.etsy.com/market/campaign_merchandise", external: true },
  { label: "Manifesto" },
  { label: "Contact" },
];

export default function CampaignMenu() {
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    setPlatformOpen(false);
  };

  const closePlatformOnBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPlatformOpen(false);
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const openPlatforms = () => {
      setOpen(true);
      setPlatformOpen(true);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("lca:open-platforms", openPlatforms);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("lca:open-platforms", openPlatforms);
    };
  }, []);

  return (
    <>
      <button
        className={open ? "lca68-menu is-open" : "lca68-menu"}
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          if (open) setPlatformOpen(false);
        }}
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
        onClick={closeMenu}
        aria-label="Close campaign menu"
        tabIndex={open ? 0 : -1}
      />

      <aside
        className={open ? "lca68-drawer is-open" : "lca68-drawer"}
        id="lca68-campaign-menu"
        aria-hidden={!open}
      >
        <div className="lca68-drawer-heading">
          <span>ALLIANCE</span>
          <p>Navigate the campaign</p>
        </div>
        <nav aria-label="Campaign navigation">
          <div
            className={platformOpen ? "lca68-drawer-group is-expanded" : "lca68-drawer-group"}
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={() => setPlatformOpen(false)}
            onFocus={() => setPlatformOpen(true)}
            onBlur={closePlatformOnBlur}
          >
            <div className="lca68-drawer-primary">
              <button
                className="lca68-drawer-platform-trigger"
                type="button"
                aria-label="Show platform focus areas"
                aria-expanded={platformOpen}
                onClick={() => setPlatformOpen((value) => !value)}
              >
                <small>01</small><span>Platform</span><i aria-hidden="true">+</i>
              </button>
            </div>
            <div className="lca68-drawer-submenu" aria-label="Platform focus areas">
              {platformLinks.map((item) => (
                <Link href={item.href} key={item.href} onClick={closeMenu} tabIndex={platformOpen ? 0 : -1}>
                  <span>{item.label}</span><i aria-hidden="true">→</i>
                </Link>
              ))}
            </div>
          </div>
          {menuItems.map((item, index) => item.href ? (
            item.external ? (
              <a href={item.href} target="_blank" rel="noreferrer" key={item.label} onClick={closeMenu}>
                <small>0{index + 2}</small><span>{item.label}</span><i aria-hidden="true">↗</i>
              </a>
            ) : (
              <Link href={item.href} key={item.label} onClick={closeMenu}>
                <small>0{index + 2}</small><span>{item.label}</span><i aria-hidden="true">→</i>
              </Link>
            )
          ) : (
            <span className="lca68-drawer-placeholder" aria-disabled="true" key={item.label}>
              <small>0{index + 2}</small><span>{item.label}</span><em>Coming soon</em>
            </span>
          ))}
        </nav>
        <p className="lca68-drawer-note">Liberal-Conservative Alliance</p>
      </aside>
    </>
  );
}
