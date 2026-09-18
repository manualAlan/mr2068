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
  image: string;
  imagePosition?: string;
  title: string;
  statement: string;
}) {
  return (
    <section className="p68-hero">
      <img src={image} alt="" style={{ objectPosition: imagePosition }} />
      <div className="p68-hero-shade" />
      <div className="p68-hero-copy">
        <h1>{title}</h1>
        <span>{statement}</span>
      </div>
    </section>
  );
}

export function PlatformFooter() {
  return (
    <footer className="p68-footer">
      <Link href="/2068"><strong>ALLIANCE</strong></Link>
      <p>A freer, safer, more capable Caprica.</p>
      <span>© 2068 Alan</span>
    </footer>
  );
}

export function PolicyPageShell({ area, children }: { area: FocusArea; children: React.ReactNode }) {
  return (
    <div className="p68-root">
      <PlatformHeader />
      <main>
        <PlatformHero
          image={area.image}
          imagePosition={area.imagePosition}
          title={area.title}
          statement={area.statement}
        />
        <section className="p68-body">
          <div className="p68-policy-content">{children}</div>
        </section>
      </main>
      <PlatformFooter />
    </div>
  );
}

export type PolicyPillar = {
  title: string;
  text: string;
  commitments: string[];
};

export function PolicyProgramme({ kicker, title, introduction, pillars }: {
  kicker: string;
  title: string;
  introduction: string;
  pillars: PolicyPillar[];
}) {
  return (
    <article className="p68-programme">
      <p className="p68-kicker">{kicker}</p>
      <h2>{title}</h2>
      <p className="p68-programme-intro">{introduction}</p>
      <div className="p68-pillar-grid">
        {pillars.map((pillar, index) => (
          <section key={pillar.title}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
            <ul>{pillar.commitments.map((commitment) => <li key={commitment}>{commitment}</li>)}</ul>
          </section>
        ))}
      </div>
    </article>
  );
}
