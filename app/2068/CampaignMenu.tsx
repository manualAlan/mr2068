"use client";

import Link from "next/link";
import { FocusEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";

const platformLinks = [
  { label: "Mission Statement", href: "/platform/mission-statement" },
  { label: "Economics & Enterprise", href: "/platform/economy" },
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
  { label: "Manifesto", href: "/manifesto/caprica-freedom-to-build-2068.pdf", external: true },
  { label: "Contact" },
];

export default function CampaignMenu() {
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const platformRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    setPlatformOpen(false);
  };

  const closePlatformOnBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPlatformOpen(false);
  };

  const handlePlatformKeys = (event: ReactKeyboardEvent<HTMLElement>) => {
    if ((event.key === "ArrowDown" || event.key === "ArrowRight") && event.target === platformRef.current) {
      event.preventDefault();
      setPlatformOpen(true);
      requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLAnchorElement>(".lca68-drawer-submenu a")?.focus());
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPlatformOpen(false);
      platformRef.current?.focus();
    }
  };

  useEffect(() => {
    const openPlatforms = () => {
      setOpen(true);
      setPlatformOpen(true);
    };
    window.addEventListener("lca:open-platforms", openPlatforms);
    return () => {
      window.removeEventListener("lca:open-platforms", openPlatforms);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => platformRef.current?.focus({ preventScroll: true }));

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        setPlatformOpen(false);
      }
      if (event.key !== "Tab") return;
      const drawerControls = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])
        .filter((element) => element.tabIndex >= 0 && !element.closest("[inert]"));
      const controls = [menuRef.current, ...drawerControls].filter((element): element is HTMLElement => element !== null);
      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = document.activeElement as HTMLElement;
      if (event.shiftKey && (active === first || !controls.includes(active))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (active === last || !controls.includes(active))) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeys);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeys);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={menuRef}
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
        tabIndex={-1}
      />

      <aside
        ref={drawerRef}
        className={open ? "lca68-drawer is-open" : "lca68-drawer"}
        id="lca68-campaign-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Campaign navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="lca68-drawer-heading">
          <span>ALLIANCE</span>
          <p>Freedom to build.</p>
        </div>
        <nav aria-label="Campaign navigation">
          <div
            className={platformOpen ? "lca68-drawer-group is-expanded" : "lca68-drawer-group"}
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={(event) => {
              if (!event.currentTarget.contains(document.activeElement)) setPlatformOpen(false);
            }}
            onBlur={closePlatformOnBlur}
          >
            <div className="lca68-drawer-primary">
              <button
                ref={platformRef}
                className="lca68-drawer-platform-trigger"
                type="button"
                aria-label="Show platform focus areas"
                aria-expanded={platformOpen}
                aria-controls="lca68-platform-submenu"
                onKeyDown={handlePlatformKeys}
                onClick={() => setPlatformOpen((value) => !value)}
              >
                <span>Platform</span><i aria-hidden="true">+</i>
              </button>
            </div>
            <div className="lca68-drawer-submenu" id="lca68-platform-submenu" aria-label="Platform focus areas" aria-hidden={!platformOpen} inert={!platformOpen}>
              {platformLinks.map((item) => (
                <Link href={item.href} key={item.href} onClick={closeMenu} onKeyDown={handlePlatformKeys} tabIndex={platformOpen ? 0 : -1}>
                  <span>{item.label}</span><i aria-hidden="true">→</i>
                </Link>
              ))}
            </div>
          </div>
          {menuItems.map((item) => item.href ? (
            item.external ? (
              <a href={item.href} target="_blank" rel="noreferrer" key={item.label} onClick={closeMenu}>
                <span>{item.label}</span><i aria-hidden="true">↗</i>
              </a>
            ) : (
              <Link href={item.href} key={item.label} onClick={closeMenu}>
                <span>{item.label}</span><i aria-hidden="true">→</i>
              </Link>
            )
          ) : (
            <span className="lca68-drawer-placeholder" aria-disabled="true" key={item.label}>
              <span>{item.label}</span><em>Coming soon</em>
            </span>
          ))}
        </nav>
        <p className="lca68-drawer-note">ALLIANCE / CAPRICA 2068</p>
      </aside>
    </>
  );
}
