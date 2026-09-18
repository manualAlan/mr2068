import Link from "next/link";
import CampaignMenu from "./CampaignMenu";
import Lca68HeroMedia from "./Lca68HeroMedia";

export default function Campaign2068Home() {
  return (
    <main className="lca68-page">
      <div className="lca68-media">
        <Lca68HeroMedia />
      </div>

      <header className="lca68-header">
        <CampaignMenu />
        <Link className="lca68-wordmark" href="/2068" aria-label="LCA 2068 home">
          <strong>ALLIANCE</strong>
        </Link>
        <span className="lca68-cycle">CAPRICA / 2068</span>
      </header>

      <section className="lca68-statement" aria-labelledby="lca68-title">
        <p>THE LIBERAL-CONSERVATIVE ALLIANCE</p>
        <h1 id="lca68-title">IT’S TIME<br />TO BUILD.</h1>
        <Link className="lca68-platform-link" href="/platform">
          <span>Check out our Platforms</span>
          <i aria-hidden="true" />
        </Link>
      </section>

      <footer className="lca68-footer">
        <div className="lca68-footer-brand">
          <img src="/images/lca-logo.svg" alt="Liberal-Conservative Alliance" />
          <p>A freer, safer, more capable Caprica.</p>
        </div>
        <p className="lca68-copyright">© 2068 Alan</p>
      </footer>
    </main>
  );
}
