import Link from "next/link";
import { Header, Footer, ArrowIcon } from "./components";
import { candidates, priorities, events } from "./data";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy wrap">
            <h1>Make room<br />for tomorrow.</h1>
            <p className="hero-dek">A confident Caprica: easier to build in, safer to live in, and ready to lead in Columbia.</p>
            <div className="button-row">
              <Link className="button button-white" href="/platform">Explore our plan <ArrowIcon /></Link>
              <Link className="text-link light-link" href="/team">Meet the LCA team <ArrowIcon /></Link>
            </div>
          </div>
          <div className="hero-portrait">
            <img src="/images/alan.png" alt="Alan Bluespan III, LCA candidate for Vice President" />
            <div className="candidate-tag"><span>Alan Bluespan III</span><strong>For Vice President</strong></div>
          </div>
          <div className="hero-mark">LCA</div>
          <div className="hero-hud" aria-hidden="true"><span>LAT 32.704</span><span>LONG 117.161</span><i></i><strong>FORWARD VECTOR</strong></div>
        </section>

        <section className="campaign-rail" aria-label="Campaign signal">
          <div className="wrap"><span>LCA / ALLIANCE CAMPAIGN</span><strong>Three parties</strong><i></i><strong>One way forward</strong><em>LIVE SIGNAL 2064</em></div>
        </section>

        <section className="signal-panel wrap">
          <div className="signal-word">MOVE</div>
          <div className="signal-copy"><span>THE LCA AGREEMENT</span><h2>Different roots.<br/>Shared direction.</h2><p>Three parties have chosen common purpose over old dividing lines. Together, we will clear the obstacles, protect the rules and let Caprica move.</p></div>
          <div className="signal-orbit" aria-hidden="true"><i></i><b>LCA</b></div>
        </section>

        <section className="intro wrap section-pad">
          <div>
            <p className="eyebrow">A PRACTICAL CHOICE</p>
            <h2>Caprica works best<br />when Capricans can.</h2>
          </div>
          <div className="intro-copy">
            <p className="lead">LCA brings three parties together around a practical program for government, built on what works and focused on what Capricans share.</p>
            <p>Our alliance will protect the institutions that keep us free, unlock private initiative, and make sure every region can share in Caprica’s next chapter.</p>
            <Link className="text-link" href="/platform">Read the full platform <ArrowIcon /></Link>
          </div>
        </section>

        <section className="priorities section-pad">
          <div className="wrap">
            <div className="section-head">
            <div><p className="eyebrow">OUR PRIORITIES</p><h2>Eight missions. One direction.</h2></div>
              <p>Clear promises for a country that is ready to move.</p>
            </div>
            <div className="priority-grid">
              {priorities.map((item, i) => (
                <article className="priority-card" key={item.title}>
                  <span className="priority-number">0{i + 1}</span>
                  <div className="priority-photo"><img src={item.image} alt="" /></div>
                  <h3>{item.title}</h3>
                  <p>{item.short}</p>
                  <Link href={`/platform#${item.slug}`} aria-label={`Learn more about ${item.title}`}><ArrowIcon /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-split">
          <div className="feature-photo"><img src="/images/rail.jpg" alt="A passenger train crossing a bridge through a mountainous region" /></div>
          <div className="feature-copy">
            <p className="eyebrow light">BUILD CAPRICA</p>
            <h2>One country.<br />Every region connected.</h2>
            <p>Fast approvals. Reliable rail, ports and power. Local decisions made closer to the people they affect.</p>
            <Link className="button button-white" href="/platform#build">See the infrastructure plan <ArrowIcon /></Link>
          </div>
        </section>

        <section className="team-preview wrap section-pad">
          <div className="section-head">
            <div><p className="eyebrow">YOUR LCA TEAM</p><h2>Local voices.<br />Shared purpose.</h2></div>
            <Link className="text-link" href="/team">Meet every candidate <ArrowIcon /></Link>
          </div>
          <div className="portrait-strip">
            {candidates.map((person) => (
              <Link className="portrait-card" href={`/team#${person.slug}`} key={person.name}>
                <div className="portrait-img"><img src={person.image} alt={person.name} /></div>
                <p>{person.region}</p><h3>{person.name}</h3><span>Meet {person.first} <ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="events-home section-pad">
          <div className="wrap">
            <div className="section-head light-head">
              <div><p className="eyebrow light">ON THE ROAD</p><h2>Come and meet us.</h2></div>
              <Link className="text-link light-link" href="/events">View all events <ArrowIcon /></Link>
            </div>
            <div className="event-list">
              {events.map((event) => <Link className="event-row" href={`/events?event=${event.slug}#register`} aria-label={`Register for ${event.title}`} key={event.title}>
                <time><strong>{event.day}</strong><span>{event.month}</span></time>
                <div><p>{event.type}</p><h3>{event.title}</h3><span>{event.place}</span></div>
                <span className="event-row-arrow" aria-hidden="true"><ArrowIcon /></span>
              </Link>)}
            </div>
          </div>
        </section>

        <section className="field-notes wrap section-pad">
          <div className="section-head"><div><p className="eyebrow">FROM THE CAMPAIGN</p><h2>Ideas in motion.</h2></div><p>Short reads from the places and people shaping our plan.</p></div>
          <div className="note-grid">
            <article className="note-card note-lead"><div><span>CHASMIA / INDUSTRY</span><h3>The comeback is already being built.</h3><p>Inside the workshops pairing old industrial skill with new maritime technology.</p><Link href="/platform#build">Read the field note <ArrowIcon/></Link></div></article>
            <article className="note-card"><span>AMBROSIA / WATER</span><h3>Clean water is not a slogan. It is the basic deal.</h3><p>Alistair’s three-step plan for transparent standards, local delivery and long-term renewal.</p><Link href="/ambrosia">Explore Alistair’s campaign <ArrowIcon/></Link></article>
            <article className="note-card"><span>MYRATI / AUTONOMY</span><h3>Decisions should make the crossing.</h3><p>JB Stoner on putting more authority, and more of tourism’s returns, in Myratian hands.</p><Link href="/team#stoner">Meet JB <ArrowIcon/></Link></article>
          </div>
        </section>

        <section className="join wrap section-pad">
          <div><p className="eyebrow">THIS IS YOUR CAMPAIGN</p><h2>Help move Caprica forward.</h2></div>
          <div className="join-actions"><Link className="button button-dark" href="/events#volunteer">Volunteer <ArrowIcon /></Link><Link className="button button-outline" href="/events#updates">Get campaign updates <ArrowIcon /></Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
