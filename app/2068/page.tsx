import Link from "next/link";
import CampaignMenu from "./CampaignMenu";
import Lca68HeroMedia from "./Lca68HeroMedia";
import PlatformLauncher from "./PlatformLauncher";
import { PlatformFooter } from "../platform/PlatformChrome";
import PriorityExplorer from "./PriorityExplorer";

export default function Campaign2068Home() {
  return (
    <div className="build68-home">
      <a className="campaign-skip" href="#home-beliefs">Skip to our beliefs</a>
      <main>
        <section className="lca68-page" aria-labelledby="lca68-title">
          <div className="lca68-media"><Lca68HeroMedia /></div>
          <header className="lca68-header">
            <CampaignMenu />
            <Link className="lca68-wordmark" href="/2068" aria-label="Alliance home"><strong>ALLIANCE</strong></Link>
            <span aria-hidden="true" />
          </header>
          <div className="lca68-statement">
            <h1 id="lca68-title">Freedom<br /><em>to build.</em></h1>
            <p className="build68-deck">Your life. Your ideas. Your future.</p>
            <PlatformLauncher />
          </div>
          <div className="build68-hero-base">
            <img src="/images/lca-logo.svg" alt="Alliance" width="130" height="64" />
            <a href="#home-beliefs">What we believe <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="build68-intro campaign-width" id="home-beliefs">
          <p className="campaign-label">OUR CONVICTION</p>
          <div>
            <h2>A country is built<br />by its <em>people.</em></h2>
            <div className="build68-intro-copy">
              <p>You have an idea of the life you want. Government should respect that. A place of your own, a business worth starting, a future you can plan without asking permission at every turn.</p>
              <p>We believe in free enterprise because nobody has a monopoly on a good idea. In sound finances because promises should last. And in liberty because your life belongs to you.</p>
              <p>We conserve what makes a free country work: independent institutions, secure property and the trust to plan ahead. We build what lets it prosper: homes, productive businesses, modern infrastructure and excellent education. That is the Alliance’s purpose in government.</p>
              <Link className="campaign-text-link" href="/platform/mission-statement">Read our mission statement <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <PriorityExplorer />

        <section className="build68-feature">
          <figure><img src="/images/belief-discovery.jpg" alt="A researcher working carefully with samples in a laboratory" loading="lazy" width="3000" height="2000" /></figure>
          <div className="build68-feature-copy">
            <p className="campaign-label">THE CONFIDENCE TO TRY</p>
            <h2>The next good idea<br />could be <em>yours.</em></h2>
            <p>Someone takes a chance. A new company opens. A discovery finds a use. That is how a country moves forward.</p>
            <p>Our job is to make the ground beneath that ambition dependable: fair rules, good infrastructure and an open door to the world.</p>
            <Link className="campaign-text-link" href="/platform/economy">How we back enterprise <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="build68-invitation campaign-width">
          <div><p className="campaign-label">COME AS YOU ARE</p><h2>You don’t have to<br />agree with us<br /><em>to join in.</em></h2></div>
          <div className="build68-invitation-copy"><p>A campaign should make room for questions. Meet the people standing for the Alliance, challenge an idea, tell us what matters where you live.</p><Link className="campaign-text-link" href="/events">Find an event <span aria-hidden="true">↗</span></Link><Link className="campaign-text-link" href="/team">Meet our candidates <span aria-hidden="true">↗</span></Link></div>
        </section>
      </main>
      <PlatformFooter />
    </div>
  );
}
