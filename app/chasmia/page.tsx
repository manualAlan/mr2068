import Link from "next/link";
import { PlatformHeader } from "../platform/PlatformChrome";
import CandidateActions from "../components/CandidateActions";
import "./candidate-review.css";

const priorities = [
  { id: "homes", label: "Homes & independence", title: "A good job needs somewhere to come home to.", text: "Chasmia cannot attract investment and then leave people searching for a place to live. Housing, work and local services belong in one growth agreement.", details: [
    ["Build around the opportunity", "Seek a regional growth compact for homes near Chasberg’s employers, Lisieux’s institutions and Littlewoods’ connections. Identify suitable infill and public land, then agree water, power, school and transport capacity before construction. Publish sites and delivery schedules so a land announcement is not mistaken for a finished home."],
    ["A clear clock, a real decision", "Back the Alliance’s 120-day decision clock for complete growth-zone applications and 60 days for compliant infill using approved designs. Keep safety and environmental rules, with a fee refund and independent appeal when the deadline is missed. Track completions against the national goal of 50% more annual homes by 2072 than in 2068."],
    ["Security whether you rent or buy", "Support lasting rental contracts, portable deposits and enforceable repair standards. Limit shared ownership help to eligible households buying additional new homes, with published caps, income limits and resale terms. More supply comes first; public help should not push up the price of existing homes."]
  ]},
  { id: "industry", label: "Industry & investment", title: "Make more of what the world needs.", text: "Chasmia has the resources, factories and engineering culture to compete at the highest level. The next step is to turn more local inputs into high-value products here at home.", details: [
    ["A Chasberg advanced industry compact", "Bring manufacturers, training providers and infrastructure agencies around one published investment plan for green technology, aviation components and advanced industrial systems. Public support should be competitive, time-limited and tied to private investment, skilled jobs and independently reported results."],
    ["Turn resources into finished products", "Use open bidding for shared testing, processing and industrial facilities where a clear business case shows that smaller firms cannot provide them alone. Connect Chasmian producers to the Alliance’s immediate expensing proposal for qualifying machinery, software and clean equipment."],
    ["Keep the fundamentals competitive", "Protect Chasmia’s reputation for fiscal prudence and a predictable tax burden. Publish energy, freight, permitting and workforce constraints for major industrial zones, with a responsible agency and delivery date for every agreed improvement."]
  ]},
  { id: "maritime", label: "Shipbuilding & connections", title: "From Littlewoods to the world.", text: "Littlewoods can anchor a maritime economy that supports design, fabrication, repair and exports across Chasmia, not just activity at the water’s edge.", details: [
    ["A serious shipbuilding pipeline", "Give firms a transparent view of expected public vessel procurement and maintenance needs without promising work before competition. Break suitable contracts into packages that allow specialist Chasmian suppliers to bid, while keeping safety, cost and delivery standards firm."],
    ["Fix the links behind the port", "Publish a condition and capacity review of the road, rail, power and water links serving Littlewoods and Chasberg. Prioritize maintenance and bottlenecks that hold back several employers. Name the responsible authority, connection date and upkeep budget before construction begins. Digital contracts must report actual reliability, not only advertised speeds."],
    ["Help smaller exporters reach market", "Bring certification, customs and trade finance advice into one regional service connected to the Alliance’s proposed single customs window. Publish fees and processing times so a growing manufacturer can plan an export order with confidence."]
  ]},
  { id: "skills", label: "Learning, skills & research", title: "Turn a local strength into an open door.", text: "Lisieux’s universities, laboratories and computing expertise should connect to strong schools and respected technical routes across Chasmia. Opportunity needs a foundation as well as a frontier.", details: [
    ["Link research to Chasmian firms", "Create open partnerships between Lisieux institutions and employers working in AI, industrial computing, energy and advanced materials. Any public research agreement should publish its purpose, intellectual property terms and the additional investment it brings into Chasmia."],
    ["Build routes into skilled work", "Connect technical programs in manufacturing, shipbuilding, agriculture and computing to real equipment, placements and employer demand. Share apprenticeship administration so smaller firms can participate. Publish completion and employment outcomes, recognize prior learning and make qualifications portable when a career changes."],
    ["Start with the foundations", "Back clear standards in reading, writing and mathematics and give teachers more time to teach. Seek regional reporting on attendance, learning and next destinations, with context rather than crude rankings. Match college expansion to verified training funds and publish what each course costs before places are promised."]
  ]},
  { id: "interior", label: "Care & local communities", title: "A working region includes every community.", text: "The interior’s farms and post-industrial communities should share in Chasmia’s renewal. Public services need a practical route in, a clear standard and someone responsible when that standard is missed.", details: [
    ["Productive farms, resilient land", "Support practical adoption of precision irrigation, soil monitoring and modern farm equipment where it improves output or water use. Stewardship payments should buy measurable environmental gains without pushing productive family farms off the land."],
    ["Care with a route through the system", "Seek a funded district access plan connecting primary care, scheduled regional clinics and transport to appointments. Back same-day urgent primary care and routine appointments within seven days, phased only as staffing is verified. Publish waits that include people unable to book, and identify who arranges alternative care when a treatment guarantee is missed."],
    ["Measure who benefits from growth", "Report employment, earnings, business formation and infrastructure delivery by community, not only as a regional average. Use those results to target genuine access barriers while keeping grants competitive and subject to the same fiscal rules as the national program."]
  ]},
];

const deliveryTests = [
  { title: "Before approval", text: "A named authority, a clear need, a cost range and a source of funding. Major capital projects must include maintenance and an independent appraisal." },
  { title: "While work happens", text: "Quarterly milestones, contract changes and reasons for delay. Count completed homes, working connections and finished training, not press releases." },
  { title: "When it falls short", text: "A correction plan and a route to challenge the decision. Protect lawful ownership, equal treatment and private casework throughout." },
];

export default function ChasmiaCampaign() {
  const places = [
    { name: "Chasberg", line: "Make the next breakthrough.", copy: "Advanced manufacturing. Better equipment. Skilled work that pays.", image: "skilled-work.jpg", alt: "A skilled welder working with metal in a workshop", target: "industry" },
    { name: "Lisieux", line: "Turn an idea into an industry.", copy: "Research, AI and a route from the classroom to a career.", image: "research.jpg", alt: "A researcher using a microscope in a laboratory", target: "skills" },
    { name: "Littlewoods", line: "Build for a world of opportunity.", copy: "Ships, suppliers and stronger connections to global markets.", image: "maritime.jpg", alt: "A container ship and cranes at a working port", target: "maritime" },
    { name: "The interior", line: "Keep our communities growing.", copy: "Productive farms. Reachable services. A future close to home.", image: "david-farms.jpg", alt: "David Cutter visiting a farm", target: "interior" },
  ];
  return <div className="amb68-root cha68-root cutter68">
    <a className="campaign-skip" href="#chasmia-main">Skip to content</a>
    <PlatformHeader/><nav className="candidate-localbar" aria-label="Chasmia campaign"><a href="#plan">Our plan</a><a href="#about">Meet David</a><a href="#take-part">Get involved</a></nav>
    <main id="chasmia-main">
      <section className="cutter-hero">
        <div className="cutter-hero-copy">
          <p className="campaign-label">David Cutter · Moderate Reform · 2068</p>
          <h1>Make it<br/>here.<br/><em>Build a<br/>life here.</em></h1>
          <p className="cutter-hero-dek">Homes close to good work. Firms free to compete. Connections that turn Chasmia’s skill into a better everyday life.</p>
          <a className="cutter-button" href="#plan">Explore David’s plan <span aria-hidden="true">↓</span></a>
          <p className="cutter-candidate-note">A new candidate. A practical case for the next chapter.</p>
        </div>
        <div className="cutter-hero-visual">
          <figure><img src="/images/chasmia/david-welcome.jpg" alt="David Cutter greeting people on a local visit" fetchPriority="high"/></figure>
          <div className="cutter-nameplate"><span>YOUR VOICE FOR CHASMIA</span><strong>David<br/><em>Cutter.</em></strong><a href="#about">Meet your candidate <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
      <div className="cutter-promisebar" aria-label="Campaign priorities"><span>Better work.</span><span>Room to build.</span><span>A future close to home.</span></div>

      <section className="cutter-opening campaign-width">
        <div className="cutter-region-mark"><p className="campaign-label">The next Chasmia starts with us</p><img src="/images/chasmia/chasmian-flag.jpg" alt="Flag of Chasmia" width="54" height="36" loading="lazy"/></div>
        <h2>We have the talent.<br/>Let’s give it <em>every chance.</em></h2>
        <div className="cutter-opening-columns"><p>We know how to make things in Chasmia. We work the land, build ships, solve hard problems and turn raw materials into something the world needs. That is a strength worth backing.</p><p>The next step should be within reach: a paid way into a trade, a business that can take its next order, a good home close to work. David Cutter’s plan connects our region’s ambition to the life you want to build.</p></div>
      </section>

      <section className="cutter-places campaign-width" aria-labelledby="places-title">
        <div className="cutter-section-heading"><div><p className="campaign-label">One region. A world of possibility.</p><h2 id="places-title">Look what we<br/><em>can build together.</em></h2></div><p>From our workshops to our laboratories, from the coast to the interior, Chasmia’s strengths belong in the same plan.</p></div>
        <div className="cutter-place-grid">{places.map((p,i)=><a className="cutter-place" key={p.name} href={`#${p.target}`}><figure><img src={`/images/chasmia/${p.image}`} alt={p.alt} loading="lazy"/><span className="cutter-place-num">0{i+1}</span></figure><div><p className="campaign-label">{p.name}</p><h3>{p.line}</h3><p>{p.copy}</p><span className="cutter-place-link">Explore the plan <span aria-hidden="true">↗</span></span></div></a>)}</div>
      </section>

      <section className="cutter-payoff cutter-build-sequence">
        <div className="campaign-width"><p className="campaign-label">The Chasmia build sequence</p><h2>Make the whole<br/><em>plan work.</em></h2><p className="cutter-sequence-intro">An industrial announcement is only a beginning. Each part has to connect to the next.</p>
          <div className="cutter-payoff-grid"><article><span>01 / MAKE ROOM</span><h3>A home near the opportunity.</h3><p>Agree land and service capacity together. Give people dependable renting and a limited route to ownership that adds homes.</p><a href="#homes">Start with housing <span aria-hidden="true">↗</span></a></article><article><span>02 / OPEN THE DOOR</span><h3>Let the next firm compete.</h3><p>Equipment, practical skills and open contracts. Public support must unlock investment, not protect a favored business.</p><a href="#industry">Back enterprise <span aria-hidden="true">↗</span></a></article><article><span>03 / CONNECT THE WORK</span><h3>Power. Freight. A working link.</h3><p>Turn investment into usable capacity, with connection dates and maintenance funded from the start.</p><a href="#maritime">Build the connections <span aria-hidden="true">↗</span></a></article></div>
        </div>
      </section>

      <section className="amb68-plan campaign-width" id="plan">
        <div className="cutter-section-heading"><div><p className="campaign-label">The plan / 2068 to 2072</p><h2>Big ambition.<br/><em>Practical steps.</em></h2></div><p>Here is how we turn opportunity into something real. Each commitment sets out the action, the safeguards and the national policy behind it.</p></div>
        <nav className="amb68-plan-index" aria-label="Policy topics">{priorities.map(p=><a key={p.id} href={`#${p.id}`}>{p.label}<span aria-hidden="true">↓</span></a>)}</nav>
        {priorities.map((p,i)=><article className="amb68-policy" id={p.id} key={p.id}><div className="amb68-policy-intro"><p className="campaign-label">0{i+1} / {p.label}</p><h3>{p.title}</h3><p>{p.text}</p></div><div className="belief-accordions">{p.details.map(([heading,body], detailIndex)=><details key={heading} open={detailIndex === 0}><summary>{heading}<span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</div></article>)}
      </section>

      <section className="cutter-delivery campaign-width" aria-labelledby="cutter-delivery-title"><div className="cutter-section-heading"><div><p className="campaign-label">The public delivery ledger</p><h2 id="cutter-delivery-title">Put the work<br/><em>on the record.</em></h2></div><p>David is seeking a mandate, not claiming these results. His job would be to pursue agreements, scrutinize spending and report progress. Delivery stays with the named public authority.</p></div><ol>{deliveryTests.map((test)=><li key={test.title}><h3>{test.title}</h3><p>{test.text}</p></li>)}</ol><p className="cutter-delivery-rule">The funding rule: recurring promises need recurring revenue or verified savings. National gross debt is 68% of GDP in 2068; 65% by 2072 is the Alliance’s proposed goal under normal conditions, not a forecast.</p></section>

      <section className="cutter-journey campaign-width">
        <p className="campaign-label">Built on Chasmia’s strengths</p><h2>A region that changed.<br/><em>A future worth choosing.</em></h2>
        <div className="cutter-journey-grid"><article><span>OUR FOUNDATIONS</span><h3>We powered a nation.</h3><p>Mining, oil, farming and heavy industry built Chasmia’s economy. Dependence on extraction also exposed communities to downturns and pushed too many young people to seek opportunity elsewhere.</p></article><article><span>OUR REBIRTH</span><h3>We found new possibilities.</h3><p>The AI and resource boom of the late 2020s and 2030s helped finance a wider transformation. Research, advanced manufacturing and commercial shipbuilding grew alongside our established strengths.</p></article><article><span>OUR NEXT CHAPTER</span><h3>Make success last.</h3><p>Predictable taxes and prudent finances helped attract people and capital. Now better skills, homes and infrastructure must turn that momentum into lasting progress for every community.</p></article></div>
      </section>

      <section className="cutter-about" id="about"><figure><img src="/images/chasmia/david-community.jpg" alt="David Cutter taking part in a community health check" loading="lazy"/></figure><div><p className="campaign-label">Meet David Cutter</p><h2>Ambitious for Chasmia.<br/><em>Grounded in what matters.</em></h2><p>David is the son of Patrick and Evelyn Cutter and Erica’s older brother. He became involved in politics while studying at the University of Ambarino, where he joined the CLA and Moderate Reform.</p><p>After graduation, he worked in the engineering industry. He now works as a news journalist at the Caprican Herald, bringing a background in both industry and reporting to his next chapter in public life.</p><p>David plans to succeed his father when Patrick retires. Standing with Moderate Reform within the Liberal-Conservative Alliance, he is making his own case: skilled work, competitive firms and homes that let people share in Chasmia’s growth.</p><div className="cutter-signoff">David Cutter<span>MODERATE REFORM · CHASMIA</span></div><Link className="campaign-text-link" href="/team/#david">Meet the Alliance team <span aria-hidden="true">↗</span></Link></div></section>

      <section className="cha68-choice" id="choice"><div className="campaign-width"><p className="campaign-label">Chasmia’s choice</p><div className="cha68-choice-grid"><div><h2>Ambition that<br/><em>answers to you.</em></h2><p>Ask Harry Balls and David Cutter the same questions: what will change, who can deliver it and what happens if the plan slips? A serious candidate should welcome the test.</p></div><div className="cutter-choice-list"><p>David’s answer:</p><ol><li><strong>Open opportunity, not special favors.</strong><span>Competitive contracts, clear rules and a fair chance for a new firm.</span></li><li><strong>Build a place people can choose.</strong><span>Homes, skilled work and services that make independence practical.</span></li><li><strong>Keep government within its limits.</strong><span>Lawful ownership, private lives and usable appeals when decisions go wrong.</span></li></ol></div></div></div></section>

      <section className="amb68-alliance campaign-width"><p className="campaign-label">Local ambition. A shared national plan.</p><div><h2>Freedom to build.<br/><em>The confidence to begin.</em></h2><p>Homes, enterprise, dependable infrastructure, effective services and government under law. Chasmia’s proposals bring those Alliance priorities together around our region’s strengths.</p><nav className="cutter-national-links" aria-label="Related Alliance commitments"><Link href="/platform/housing">Homes</Link><Link href="/platform/economy">Enterprise</Link><Link href="/platform/infrastructure">Infrastructure</Link><Link href="/platform/education">Education</Link><Link href="/platform/healthcare">Care</Link><Link href="/platform/civil-liberties">Rights</Link></nav><a className="campaign-text-link" href="/manifesto/caprica-freedom-to-build-2068.pdf" target="_blank" rel="noreferrer">Read our 2068 manifesto · PDF <span aria-hidden="true">↗</span></a></div></section>

      <section className="cutter-action" id="take-part"><div className="campaign-width"><p className="campaign-label">Let’s make this our moment</p><h2>Chasmia can.<br/><em>Let’s build it.</em></h2><div className="cutter-action-bottom"><p>Bring your ideas. Bring your questions. Join David and local employers for a conversation about industry, skills and the future of our region.</p><Link className="cutter-button" href="/events/#chasmia-future">Meet David in Littlewoods <span aria-hidden="true">↗</span></Link></div><CandidateActions name="David Cutter" region="Chasmia" commitments={["More homes near jobs, with funded water, power, schools and transport.", "Competitive investment and open contracts for Chasmian firms.", "Published connection dates for Littlewoods and Chasberg.", "Practical training and reachable care with transparent funding.", "Quarterly delivery reporting, lawful ownership and equal treatment."]}/></div></section>
    </main>
    <footer className="amb68-footer campaign-width"><Link className="amb68-brand" href="/david-cutter/"><img src="/images/mr-logo.png" alt="Moderate Reform" width="68" height="42"/><span>DAVID CUTTER<br/><small>FOR CHASMIA · 2068</small></span></Link><p>Moderate Reform · Liberal-Conservative Alliance</p><Link className="campaign-text-link" href="/">The national campaign <span aria-hidden="true">↗</span></Link></footer>
    <details className="cutter-photo-notes campaign-width"><summary>Photography credits</summary><p>David Seymour photography from <a href="https://www.act.org.nz/people/david-seymour" target="_blank" rel="noreferrer">ACT</a>, used as the face claim for fictional candidate David Cutter. Industry photographs: <a href="https://unsplash.com/photos/yPtnTO8f1Lo">Georgia Mashford</a>, <a href="https://unsplash.com/photos/fS6oRcdiIis">Kelly Chiang</a> and <a href="https://unsplash.com/photos/4ZornyPnGlA">Daniel Miksha</a> on Unsplash. Place imagery illustrates the fictional region.</p></details>
  </div>;
}
