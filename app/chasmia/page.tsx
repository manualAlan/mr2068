import Link from "next/link";

const priorities = [
  { id: "industry", label: "Industry & investment", title: "Make more of what the world needs.", text: "Chasmia has the resources, factories and engineering culture to compete at the highest level. The next step is to turn more local inputs into high value products here at home.", details: [
    ["A Chasberg advanced industry compact", "Bring manufacturers, training providers and infrastructure agencies around one published investment plan for green technology, aviation components and advanced industrial systems. Public support should be competitive, time limited and tied to private investment, skilled jobs and independently reported results."],
    ["Turn resources into finished products", "Use open bidding for shared testing, processing and industrial facilities where a clear business case shows that smaller firms cannot provide them alone. Connect Chasmian producers to the Alliance’s immediate expensing proposal for qualifying machinery, software and clean equipment."],
    ["Keep the fundamentals competitive", "Protect Chasmia’s reputation for fiscal prudence and a predictable tax burden. Publish energy, freight, permitting and workforce constraints for major industrial zones, with a responsible agency and delivery date for every agreed improvement."]
  ]},
  { id: "skills", label: "Skills, research & AI", title: "Give talent a reason to come, and a reason to stay.", text: "Lisieux is already a center for universities, laboratories and computing. That success should open doors for young Chasmians and bring skilled people back to the region.", details: [
    ["Link research to Chasmian firms", "Create open partnerships between Lisieux institutions and employers working in AI, industrial computing, energy and advanced materials. Any public research agreement should publish its purpose, intellectual property terms and the additional investment it brings into Chasmia."],
    ["Build routes into skilled work", "Expand employer designed technical programs in manufacturing, shipbuilding, agriculture and computing. Share apprenticeship administration so smaller firms can participate. Under the Alliance program, eligible people under 25 will receive a suitable work, training or apprenticeship offer within 90 days after four months outside employment or education."],
    ["Welcome Chasmians home", "Publish hard to fill occupations and connect returning residents to employers, housing information and recognition of qualifications. Recruitment incentives should be focused on genuine shortages and reviewed against retention after two years."]
  ]},
  { id: "maritime", label: "Shipbuilding & connections", title: "From Littlewoods to the world.", text: "Littlewoods can anchor a maritime economy that supports design, fabrication, repair and exports across Chasmia, not just activity at the water’s edge.", details: [
    ["A serious shipbuilding pipeline", "Give firms a transparent view of expected public vessel procurement and maintenance needs without promising work before competition. Break suitable contracts into packages that allow specialist Chasmian suppliers to bid, while keeping safety, cost and delivery standards firm."],
    ["Fix the freight links behind the port", "Publish a condition and capacity review of the road, rail and utility links serving Littlewoods and Chasberg. Prioritize maintenance and bottlenecks that hold back several employers, then show capital costs and future upkeep before construction begins."],
    ["Help smaller exporters reach market", "Bring certification, customs and trade finance advice into one regional service connected to the Alliance’s proposed single customs window. Publish fees and processing times so a growing manufacturer can plan an export order with confidence."]
  ]},
  { id: "interior", label: "Interior & communities", title: "Growth that reaches beyond the big hubs.", text: "The interior’s farms and post-industrial communities should share in Chasmia’s renewal. Distance must not decide whether a family can reach work, care or a dependable connection.", details: [
    ["Productive farms, resilient land", "Support practical adoption of precision irrigation, soil monitoring and modern farm equipment where it improves output or water use. Stewardship payments should buy measurable environmental gains without pushing productive family farms off the land."],
    ["Homes and services that keep pace", "Seek regional growth agreements that join new homes to water, transport, schools and jobs, in line with the Alliance housing program. Coordinate transport around work and healthcare appointments, keep assisted booking available and identify specialist services that can be delivered through scheduled regional clinics."],
    ["Measure who benefits from growth", "Report employment, earnings, business formation and infrastructure delivery by community, not only as a regional average. Use those results to target genuine access barriers while keeping grants competitive and subject to the same fiscal rules as the national program."]
  ]},
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
    <header className="amb68-header">
      <Link className="amb68-brand" href="/chasmia/" aria-label="David Cutter for Chasmia home"><img src="/images/mr-logo.png" alt="Moderate Reform" width="68" height="42"/><span>DAVID CUTTER<br/><small>CHASMIA 2068</small></span></Link>
      <nav aria-label="Chasmia campaign"><a href="#plan">Our plan</a><a href="#about">Meet David</a><a href="#take-part">Get involved</a><Link href="/">The Alliance <span aria-hidden="true">↗</span></Link></nav>
    </header>
    <main id="chasmia-main">
      <section className="cutter-hero">
        <div className="cutter-hero-copy">
          <p className="campaign-label">David Cutter · Moderate Reform · 2068</p>
          <h1>Make it<br/>here.<br/><em>Build a<br/>life here.</em></h1>
          <p className="cutter-hero-dek">The skill. The ambition. The place we call home.<br/>Let’s put Chasmia’s next chapter in your hands.</p>
          <a className="cutter-button" href="#plan">Let’s build the next Chasmia <span aria-hidden="true">↓</span></a>
        </div>
        <div className="cutter-hero-visual">
          <figure><img src="/images/chasmia/david-welcome.jpg" alt="David Cutter greeting people on a local visit" fetchPriority="high"/></figure>
          <div className="cutter-nameplate"><span>YOUR VOICE FOR CHASMIA</span><strong>David<br/><em>Cutter.</em></strong><a href="#about">Meet your candidate <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
      <div className="cutter-promisebar" aria-label="Campaign priorities"><span>Better work.</span><span>Room to build.</span><span>A future close to home.</span></div>

      <section className="cutter-opening campaign-width">
        <div className="cutter-region-mark"><img src="/images/chasmia/chasmian-flag.jpg" alt="Flag of Chasmia" width="120" height="80" loading="lazy"/><p className="campaign-label">The next Chasmia<br/>starts with us</p></div>
        <h2>We have the talent.<br/>Let’s give it <em>every chance.</em></h2>
        <div className="cutter-opening-columns"><p>We know how to make things in Chasmia. We work the land, build ships, solve hard problems and turn raw materials into something the world needs. That is a strength worth backing.</p><p>Now the next generation deserves its chance: a paid way into a trade, a business that can take its next order, a good home within reach of work. David Cutter’s plan connects our region’s ambition to the life you want to build.</p></div>
      </section>

      <section className="cutter-places campaign-width" aria-labelledby="places-title">
        <div className="cutter-section-heading"><div><p className="campaign-label">One region. A world of possibility.</p><h2 id="places-title">Look what we<br/><em>can build together.</em></h2></div><p>From our workshops to our laboratories, from the coast to the interior, Chasmia’s strengths belong in the same plan.</p></div>
        <div className="cutter-place-grid">{places.map((p,i)=><a className="cutter-place" key={p.name} href={`#${p.target}`}><figure><img src={`/images/chasmia/${p.image}`} alt={p.alt} loading="lazy"/><span className="cutter-place-num">0{i+1}</span></figure><div><p className="campaign-label">{p.name}</p><h3>{p.line}</h3><p>{p.copy}</p><span className="cutter-place-link">Explore the plan <span aria-hidden="true">↗</span></span></div></a>)}</div>
      </section>

      <section className="cutter-payoff">
        <div className="campaign-width"><p className="campaign-label">A bigger economy. A better everyday life.</p><h2>Your first opportunity.<br/>Your next good idea.<br/><em>Your future here.</em></h2>
          <div className="cutter-payoff-grid"><article><span>01 / STARTING OUT</span><h3>A skill. A paycheck. A way in.</h3><p>Paid apprenticeships with local employers, practical technical training and an offer of work or learning for eligible young people. Talent should have somewhere to go.</p><a href="#skills">Open the door <span aria-hidden="true">↗</span></a></article><article><span>02 / BUILDING SOMETHING</span><h3>Take the next order.</h3><p>Help a workshop invest in better equipment, make room for a growing firm and connect smaller suppliers to larger contracts. Let enterprise do what it does best.</p><a href="#industry">Back local ambition <span aria-hidden="true">↗</span></a></article><article><span>03 / PUTTING DOWN ROOTS</span><h3>Make a life close to home.</h3><p>Homes near jobs, services people can reach and reliable connections between our towns. Growth should make everyday life easier across the region.</p><a href="#interior">Strengthen our communities <span aria-hidden="true">↗</span></a></article></div>
        </div>
      </section>

      <section className="amb68-plan campaign-width" id="plan">
        <div className="cutter-section-heading"><div><p className="campaign-label">The plan / 2068 to 2072</p><h2>Big ambition.<br/><em>Practical steps.</em></h2></div><p>Here is how we turn opportunity into something real. Each commitment sets out the action, the safeguards and the national policy behind it.</p></div>
        <nav className="amb68-plan-index" aria-label="Policy topics">{priorities.map(p=><a key={p.id} href={`#${p.id}`}>{p.label}<span aria-hidden="true">↓</span></a>)}</nav>
        {priorities.map((p,i)=><article className="amb68-policy" id={p.id} key={p.id}><div className="amb68-policy-intro"><p className="campaign-label">0{i+1} / {p.label}</p><h3>{p.title}</h3><p>{p.text}</p></div><div className="belief-accordions">{p.details.map(([heading,body])=><details key={heading}><summary>{heading}<span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</div></article>)}
      </section>

      <section className="cutter-journey campaign-width">
        <p className="campaign-label">Built on Chasmia’s strengths</p><h2>A region that changed.<br/><em>A future worth choosing.</em></h2>
        <div className="cutter-journey-grid"><article><span>OUR FOUNDATIONS</span><h3>We powered a nation.</h3><p>Mining, oil, farming and heavy industry built Chasmia’s economy. Dependence on extraction also exposed communities to downturns and pushed too many young people to seek opportunity elsewhere.</p></article><article><span>OUR REBIRTH</span><h3>We found new possibilities.</h3><p>The AI and resource boom of the late 2020s and 2030s helped finance a wider transformation. Research, advanced manufacturing and commercial shipbuilding grew alongside our established strengths.</p></article><article><span>OUR NEXT CHAPTER</span><h3>Make success last.</h3><p>Predictable taxes and prudent finances helped attract people and capital. Now better skills, homes and infrastructure must turn that momentum into lasting progress for every community.</p></article></div>
      </section>

      <section className="cutter-about" id="about"><figure><img src="/images/chasmia/david-community.jpg" alt="David Cutter taking part in a community health check" loading="lazy"/></figure><div><p className="campaign-label">Meet David Cutter</p><h2>Ambitious for Chasmia.<br/><em>Grounded in what matters.</em></h2><p>David is the son of Patrick and Evelyn Cutter and Erica’s older brother. He became involved in politics while studying at the University of Ambarino, where he joined the CLA and Moderate Reform.</p><p>After graduation, he worked in the engineering industry. He now works as a news journalist at the Caprican Herald, bringing a background in both industry and reporting to his next chapter in public life.</p><p>David plans to succeed his father when Patrick retires. His own case for Chasmia centers on skilled work, investment and the chance for the next generation to build a life here, standing with Moderate Reform within the Liberal-Conservative Alliance.</p><div className="cutter-signoff">David Cutter<span>MODERATE REFORM · CHASMIA</span></div><Link className="campaign-text-link" href="/team/#patrick">Meet the Alliance team <span aria-hidden="true">↗</span></Link></div></section>

      <section className="cha68-choice" id="choice"><div className="campaign-width"><p className="campaign-label">Chasmia’s choice</p><div className="cha68-choice-grid"><div><h2>Keep our<br/><em>future moving.</em></h2><p>At this election, ask Harry Balls and David Cutter the same questions. Who has a plan for the next job, the next investment and the next generation? Who will show you how it is paid for?</p></div><div className="cutter-choice-list"><p>David’s answer:</p><ol><li><strong>Back the people who make things.</strong><span>Investment, apprenticeships and a route to new markets.</span></li><li><strong>Make room for a good life.</strong><span>Homes, connections and services that keep up with growth.</span></li><li><strong>Put the promises on the record.</strong><span>Named responsibilities, published costs and quarterly progress.</span></li></ol></div></div></div></section>

      <section className="amb68-alliance campaign-width"><p className="campaign-label">Local ambition. A shared national plan.</p><div><h2>Freedom to build.<br/><em>The confidence to begin.</em></h2><p>Chasmia’s priorities connect to the Alliance’s commitments on homes, enterprise, training and accountable government. Major projects must pass independent appraisal, account for maintenance and fit the national fiscal framework. A strong region and a strong Caprica go together.</p><a className="campaign-text-link" href="/manifesto/caprica-freedom-to-build-2068.pdf" target="_blank" rel="noreferrer">Read our 2068 manifesto · PDF <span aria-hidden="true">↗</span></a></div></section>

      <section className="cutter-action" id="take-part"><div className="campaign-width"><p className="campaign-label">Let’s make this our moment</p><h2>Chasmia can.<br/><em>Let’s build it.</em></h2><div className="cutter-action-bottom"><p>Bring your ideas. Bring your questions. Join David and local employers for a conversation about industry, skills and the future of our region.</p><Link className="cutter-button" href="/events/#chasmia-future">Meet David in Littlewoods <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
    <footer className="amb68-footer campaign-width"><Link className="amb68-brand" href="/chasmia/"><img src="/images/mr-logo.png" alt="Moderate Reform" width="68" height="42"/><span>DAVID CUTTER<br/><small>FOR CHASMIA · 2068</small></span></Link><p>Moderate Reform · Liberal-Conservative Alliance</p><Link className="campaign-text-link" href="/">The national campaign <span aria-hidden="true">↗</span></Link></footer>
    <details className="cutter-photo-notes campaign-width"><summary>Photography credits</summary><p>David Seymour photography from <a href="https://www.act.org.nz/people/david-seymour" target="_blank" rel="noreferrer">ACT</a>, used as the face claim for fictional candidate David Cutter. Industry photographs: <a href="https://unsplash.com/photos/yPtnTO8f1Lo">Georgia Mashford</a>, <a href="https://unsplash.com/photos/fS6oRcdiIis">Kelly Chiang</a> and <a href="https://unsplash.com/photos/4ZornyPnGlA">Daniel Miksha</a> on Unsplash. Place imagery illustrates the fictional region.</p></details>
  </div>;
}
