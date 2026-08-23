import Link from "next/link";
import { ArrowIcon } from "../components";

const commitments = [
  {
    number: "01",
    label: "CLEAN WATER",
    title: "Water you can trust.",
    text: "Replace failing rural pipes, publish local test results and give every affected community a clear repair timetable.",
    points: ["A ten-year Ambrosia water renewal fund", "Public quality dashboards by water district", "Priority replacement for schools, clinics and farming towns"],
  },
  {
    number: "02",
    label: "FARMS AND EXPORTS",
    title: "More value stays here.",
    text: "Help farms invest, process more Ambrosian produce locally and move it reliably from field to market.",
    points: ["Modern cold-chain and farm-to-port links", "Simpler investment allowances for family farms", "An Ambrosia export office for Columbian markets"],
  },
  {
    number: "03",
    label: "ROADS AND CONNECTIONS",
    title: "No town left off the map.",
    text: "Repair the links between Auburne, Garrison, Strawberry and Meridian, while extending dependable digital service across rural Ambrosia.",
    points: ["A published rural road repair schedule", "Reliable broadband for farms and small towns", "Safer freight routes and regional bus connections"],
  },
  {
    number: "04",
    label: "THE NEXT GENERATION",
    title: "A future worth staying for.",
    text: "Bring practical training, attainable homes and new enterprise closer to the young people who want to build their lives in Ambrosia.",
    points: ["Employer-led agricultural and technical academies", "Homes in growing towns near jobs and services", "Start-up support for food, tourism and rural technology"],
  },
];

export default function AmbrosiaCampaign() {
  return <div className="ambrosia-shell"><header className="mr-campaign-header">
    <div className="wrap mr-header-inner">
      <Link className="mr-campaign-brand" href="/ambrosia" aria-label="Moderate Reform, Alistair for Ambrosia"><img src="/images/mr-logo.png" alt="MR"/><span>ALISTAIR<br/>FOR AMBROSIA</span></Link>
      <nav aria-label="Ambrosia campaign navigation"><a href="#plan">Our plan</a><a href="#about">Meet Alistair</a><Link href="/events?event=ambrosia-roundtable#register">Events</Link><Link className="mr-alliance-link" href="/">LCA alliance <ArrowIcon/></Link></nav>
    </div>
  </header><main className="ambrosia-page">
    <section className="ambrosia-hero">
      <div className="ambrosia-hero-grid wrap">
        <div className="ambrosia-hero-copy">
          <p className="ambrosia-party">MODERATE REFORM <span>·</span> AMBROSIA</p>
          <p className="ambrosia-coordinate">AMBROSIA / DISTRICT SIGNAL 2064</p>
          <h1>Rooted here.<br/><em>Ready for what’s next.</em></h1>
          <p className="ambrosia-dek">Alistair Foulke-McKeon has a practical plan for clean water, strong farms and a future young Ambrosians can choose.</p>
          <div className="button-row">
            <a className="button button-white" href="#plan">See the Ambrosia plan <ArrowIcon/></a>
            <Link className="text-link light-link" href="/events?event=ambrosia-roundtable#register">Meet Alistair <ArrowIcon/></Link>
          </div>
        </div>
        <div className="ambrosia-portrait">
          <img src="/images/alistair.png" alt="Alistair Foulke-McKeon, Moderate Reform candidate for Ambrosia"/>
          <div className="ambrosia-id"><span>ALISTAIR FOULKE-MCKEON</span><strong>FOR AMBROSIA</strong></div>
        </div>
      </div>
      <div className="ambrosia-word" aria-hidden="true">AMBROSIA</div>
    </section>

    <section className="ambrosia-status">
      <div className="wrap"><span>CAMPAIGN STATUS</span><b>ONLINE</b><i></i><strong>FARMS</strong><strong>WATER</strong><strong>HOME</strong><em>MR / AMBROSIA 2064</em></div>
    </section>

    <section className="ambrosia-intro wrap section-pad">
      <div>
        <p className="eyebrow">WHY HE IS RUNNING</p>
        <h2>Ambrosia should be a place to build a life, not leave one behind.</h2>
      </div>
      <div className="ambrosia-intro-copy">
        <p className="lead">Eighty percent rural, vital to Caprica’s food supply and full of communities that know how to make things last, Ambrosia deserves government that notices what works here.</p>
        <p>Alistair is standing to renew the basics, clean water, dependable roads, thriving farms and services within reach, while opening new doors for the next generation in Auburne, Garrison, Strawberry, Meridian and every rural community between them.</p>
        <blockquote>“We do not need to turn Ambrosia into somewhere else. We need to give our own communities the confidence and connections to succeed.”</blockquote>
      </div>
    </section>

    <section className="ambrosia-region">
      <div className="ambrosia-region-photo"><img src="/images/farm.jpg" alt="Working farmland across rural Ambrosia"/><span>MOUNT AMBROSIA BASIN / 06:42</span></div>
      <div className="ambrosia-region-copy">
        <p className="eyebrow light">THE REGION</p>
        <h2>Farm country.<br/>Forward country.</h2>
        <p>From the established centers of Auburne and Garrison to fast-growing Strawberry and Meridian, Ambrosia’s future depends on making rural strength count. Agriculture remains the economic foundation, but better infrastructure, local processing, tourism around Mount Ambrosia and new rural enterprise can create a broader base.</p>
        <div className="ambrosia-stats">
          <div><strong>80%</strong><span>RURAL LANDMASS</span></div>
          <div><strong>04</strong><span>KEY GROWTH CENTERS</span></div>
          <div><strong>01</strong><span>SHARED AMBITION</span></div>
        </div>
      </div>
    </section>

    <section className="ambrosia-plan section-pad" id="plan">
      <div className="wrap">
        <div className="section-head"><div><p className="eyebrow">THE AMBROSIA COMPACT</p><h2>Four jobs.<br/>No excuses.</h2></div><p>Specific commitments shaped around the pressures Ambrosian families, farms and towns face now.</p></div>
        <div className="ambrosia-plan-grid">
          {commitments.map(item => <article data-node={item.number} key={item.number}>
            <div className="ambrosia-plan-top"><span>{item.number}</span><b>{item.label}</b></div>
            <h3>{item.title}</h3><p>{item.text}</p>
            <ul>{item.points.map(point=><li key={point}>{point}</li>)}</ul>
          </article>)}
        </div>
      </div>
    </section>

    <section className="ambrosia-story wrap section-pad" id="about">
      <div className="ambrosia-story-photo"><img src="/images/alistair.png" alt="Alistair Foulke-McKeon"/><span>PUBLIC SERVICE / LISTEN FIRST</span></div>
      <div className="ambrosia-story-copy">
        <p className="eyebrow">MEET ALISTAIR</p>
        <h2>A local inheritance. A public duty.</h2>
        <p>Born at St. Joseph’s Hospital in Auburne, Montiablo, Alistair spent his formative years on the Foulke family estate in the Ambrosian countryside. The grandson of former President and Prime Minister Darjeeling Foulke, he grew up with public life close at hand, but with rural Ambrosia as home.</p>
        <p>An avid baseball player, he pitched and played right field through high school, helping his team reach the regional summer tournament quarter-finals. He later studied international relations at the University of Auburne and played a year of college baseball before concentrating on his degree.</p>
        <p>After university, Alistair joined the Foulke Institute and remained active in local politics, first through the National Party and later Moderate Reform. He married Elizabeth McKeon in 2034 and adopted the surname Foulke-McKeon. In 2040, Ambrosians elected him from the Country Liberal Party list.</p>
        <div className="ambrosia-timeline"><span><b>2034</b> Married Elizabeth McKeon</span><span><b>2040</b> First elected for Ambrosia</span><span><b>2064</b> Moderate Reform candidate</span></div>
      </div>
    </section>

    <section className="ambrosia-proof">
      <div className="wrap ambrosia-proof-grid">
        <div className="ambrosia-proof-copy"><p className="eyebrow light">A REPRESENTATIVE WHO SHOWS UP</p><h2>Politics done face to face.</h2><p>Alistair’s campaign is built around working sessions, town meetings and direct answers. Not every disagreement disappears, but every community deserves to be heard before decisions are made.</p><Link className="button button-white" href="/events?event=ambrosia-roundtable#register">Reserve your place <ArrowIcon/></Link></div>
        <figure><img src="/images/alistair.png" alt="Alistair Foulke-McKeon, Moderate Reform candidate for Ambrosia"/><figcaption>AMBROSIA CAMPAIGN PORTRAIT / 2064</figcaption></figure>
      </div>
    </section>

    <section className="ambrosia-actions wrap section-pad">
      <div><p className="eyebrow">THIS CAMPAIGN RUNS ON LOCAL ENERGY</p><h2>Help Alistair win Ambrosia.</h2></div>
      <div className="ambrosia-action-links"><Link className="button button-dark" href="/events#volunteer">Volunteer in Ambrosia <ArrowIcon/></Link><Link className="button button-outline" href="/events#updates">Get campaign updates <ArrowIcon/></Link></div>
    </section>

  </main><footer className="mr-campaign-footer"><div className="wrap">
    <div className="mr-footer-brand"><img src="/images/mr-logo.png" alt="Moderate Reform"/><p>Alistair Foulke-McKeon<br/><strong>for Ambrosia</strong></p></div>
    <div className="mr-footer-links"><a href="#plan">Ambrosia plan</a><a href="#about">Meet Alistair</a><Link href="/events#volunteer">Volunteer</Link><Link href="/">LCA alliance</Link></div>
    <p className="mr-footer-authorized">Authorized by Moderate Reform, Ambrosia.<br/>CAMPAIGN TRANSMISSION / 2064</p>
  </div></footer></div>;
}
