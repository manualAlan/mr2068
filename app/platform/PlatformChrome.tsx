import Link from "next/link";
import CampaignMenu from "../2068/CampaignMenu";
import { FocusArea } from "./platform-data";

export function PlatformHeader() {
  return (
    <header className="p68-header">
      <CampaignMenu />
      <Link className="p68-header-wordmark" href="/2068" aria-label="Alliance home">ALLIANCE</Link>
      <span aria-hidden="true" />
    </header>
  );
}

export function PlatformHero({ image, imagePosition, title, statement }: {
  image: string; imagePosition?: string; title: string; statement: string;
}) {
  return (
    <section className="p68-hero">
      <img src={image} alt="" style={{ objectPosition: imagePosition }} />
      <div className="p68-hero-shade" />
      <div className="p68-hero-copy"><h1>{title}</h1><span>{statement}</span></div>
    </section>
  );
}

export function PlatformFooter() {
  return (
    <footer className="p68-footer campaign-footer">
      <div className="campaign-footer-identity"><Link href="/2068" aria-label="Alliance home"><img src="/images/lca-logo.svg" alt="Alliance" width="142" height="72" /></Link><p>Freedom to build.</p></div>
      <a className="campaign-footer-manifesto" href="/manifesto/caprica-freedom-to-build-2068.pdf" target="_blank" rel="noreferrer">The full manifesto <span aria-hidden="true">↗</span><small>OUR PROGRAMME FOR 2068 · PDF</small></a>
      <span className="campaign-copyright">© 2068 Robert Bluespan</span>
    </footer>
  );
}

export function PolicyPageShell({ area, children }: { area: FocusArea; children: React.ReactNode }) {
  return (
    <div className="p68-root mission68-root">
      <PlatformHeader />
      <main>
        <PlatformHero image={area.image} imagePosition={area.imagePosition} title={area.title} statement={area.statement} />
        <section className="p68-body"><div className="p68-policy-content">{children}</div></section>
      </main>
      <PlatformFooter />
    </div>
  );
}
