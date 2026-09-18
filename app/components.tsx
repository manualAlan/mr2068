"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function ArrowIcon() { return <span className="arrow" aria-hidden="true">→</span>; }

export function Header() {
  const [open,setOpen]=useState(false);
  const path=usePathname();
  const links=[
    ['https://manualalan.github.io/mr2068/manifesto/caprica-new-future-2064.pdf','Manifesto'],
    ['/platform/mission-statement','Our plan'],
    ['/team','Candidates'],
    ['/events','Events'],
  ];
  return <header className="site-header">
    <div className="header-inner wrap">
      <Link className="brand" href="/" aria-label="LCA alliance home"><img src="/images/lca-logo.svg" alt="LCA" /></Link>
      <nav className={open?'nav open':'nav'} aria-label="Main navigation">
        {links.map(([href,label])=><Link className={path===href?'active':''} href={href} key={href} onClick={()=>setOpen(false)}>{label}</Link>)}
        <Link className="nav-cta" href="/events#volunteer" onClick={()=>setOpen(false)}>Get involved <ArrowIcon /></Link>
      </nav>
      <button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><span></span><span></span></button>
    </div>
  </header>
}

export function Footer(){return <footer className="footer"><div className="wrap footer-grid">
  <div className="footer-brand"><img src="/images/lca-logo.svg" alt="LCA"/><p>Three parties.<br/>One way forward.</p></div>
  <div><p className="footer-label">Explore</p><Link href="/platform/mission-statement">Our plan</Link><Link href="/team">Candidates</Link><Link href="/events">Events</Link></div>
  <div><p className="footer-label">Take part</p><Link href="/events#volunteer">Volunteer</Link><Link href="/events#updates">Campaign updates</Link><Link href="/platform#alliance">About the alliance</Link></div>
  <div className="footer-note"><p>A shared campaign for all of Caprica.</p><span>Authorized by the LCA electoral alliance, Montiablo.</span></div>
 </div></footer>}
