import Link from "next/link";
import type { CandidateStory, CandidateChapter } from "../components/AllianceCandidateStory";
import CandidateActions from "../components/CandidateActions";
import { PlatformHeader, PlatformFooter } from "../platform/PlatformChrome";
import "./pagi-review.css";

const housing: CandidateChapter = {
  label: "Homes & independence", title: "Room to put down roots.",
  intro: "A good job and a place to live should be part of the same conversation. Make room in our towns, with the services a growing community needs.",
  points: [
    ["Service the land. Then build.", "Seek a regional growth compact that identifies suitable infill, water capacity, schools and transport together. Publish sites and the next decision for each, with funded maintenance. Kalahooska should contribute to the Alliance’s goal of 50% more annual home completions by 2072, against the verified 2068 total, while respecting flood safety and valuable habitat."],
    ["A decision people can plan around", "Apply the national 120-day clock to complete growth-zone applications and 60 days to compliant infill using approved designs. Give smaller builders a fair route to bid. A missed deadline should bring a fee refund and an independent appeal, never permission to bypass safety."],
    ["A dependable rental. A careful route to ownership.", "Back lasting rental contracts, portable deposits and enforceable repair standards. Reserve capped shared ownership support for eligible households buying additional new homes, with clear income limits and resale terms. Help should create a home, not simply inflate the price of an existing one."],
  ],
};
const services: CandidateChapter = {
  label: "Skills & public services", title: "A future here needs more than a job.",
  intro: "A training place you can reach. A clinic that answers. Good schools and clean water. These are the foundations of a town people choose to call home.",
  points: [
    ["Train for the work being built", "Agree paid pathways in forestry, engineering, care and construction with employers and colleges. Share apprenticeship administration so small firms can take part. Publish course completion and next destinations, and verify equipment, placements and funding before promising additional places."],
    ["Care with a clear way in", "Join up primary care, visiting clinics and patient transport. Phase the national same-day urgent primary-care standard and seven-day routine appointment standard with verified staffing. Publish waits that include people unable to book, and a contact for stalled referrals. Back the national funded respite offer for unpaid caregivers."],
    ["Make the basics visible", "Report water tests and repair schedules by service area. Support strong reading and mathematics standards, with room for teachers to teach. Public reporting should explain the funding, the progress and the support still needed, while protecting individual records."],
  ],
};
const policyPaths = ["housing", "economy", "infrastructure", "education", "civil-liberties"];

export default function PagiCampaign({ story }: { story: CandidateStory }) {
  const chapters = [housing, story.chapters[0], story.chapters[1], services, story.chapters[2]];
  return <div className="pagi68">
    <a className="campaign-skip" href="#pagi-main">Skip to content</a>
    <PlatformHeader />
    <main id="pagi-main">
      <section className="pagi-hero">
        <div className="pagi-hero-copy"><p className="campaign-label">Kalahooska · Alliance 2068</p><h1>Rooted here.<br/><em>Ready <br/>to grow.</em></h1><p>A livelihood. A home.<br/>A stronger town around you.</p><a href="#plan" className="pagi-link">The Kalahooska plan <span aria-hidden="true">↓</span></a><div className="pagi-candidate-line"><strong>Rupert Pagi Shaw</strong><span>Candidate for Kalahooska MP</span></div></div>
        <figure><img src={story.hero} alt={story.heroAlt} fetchPriority="high"/><figcaption>Our future starts with what we value.</figcaption></figure>
      </section>
      <nav className="candidate-localbar" aria-label="Kalahooska campaign"><a href="#candidate">Meet Rupert</a><a href="#plan">The local plan</a><a href="#commitment">The public test</a><a href="#take-part">Take part</a></nav>

      <section className="pagi-intro pagi-width" id="candidate">
        <figure><img src={story.portrait} alt="Rupert Pagi Shaw" width="912" height="1136" loading="lazy"/><figcaption>RUPERT PAGI SHAW <span>KALAHOOSKA · 2068</span></figcaption></figure>
        <div><p className="campaign-label">The case I am making</p><h2>Growth should leave a place <em>stronger than it found it.</em></h2>{story.introduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<p>People should be free to build, invest and make a living. Government’s job is to keep the rules fair, the connections working and the public accounts open. That is the kind of growth I will argue for in Parliament.</p><span className="pagi-signature">Rupert</span></div>
      </section>

      <section className="pagi-value" aria-labelledby="pagi-value-title"><div className="pagi-width">
        <div className="pagi-value-heading"><p className="campaign-label">A working landscape. A living economy.</p><h2 id="pagi-value-title">More than a resource.<br/><em>The start of something.</em></h2></div>
        <figure><img src="/images/candidate-review/kalahooska/timber-architecture.jpg" alt="A contemporary timber office building with a boardwalk and planted grounds" width="2400" height="1416" loading="lazy"/><figcaption>Design, processing and construction can keep more of timber’s value close to its source.</figcaption></figure>
        <div className="pagi-value-path"><article><span>01 / RENEW THE SOURCE</span><h3>A forest with a future.</h3><p>Independent inventories, sustainable harvests and funded restoration. Keep the natural foundation of the economy healthy.</p></article><article><span>02 / MAKE MORE HERE</span><h3>Let enterprise add value.</h3><p>Equipment, skills and fair competition can turn raw timber into finished products. Invest where demand supports the business case.</p></article><article><span>03 / BUILD A LIFE</span><h3>A town that shares the gain.</h3><p>Homes, local suppliers and dependable services let more people take part. Judge investment by the place it helps create.</p></article></div>
      </div></section>

      <section className="pagi-plan pagi-width" id="plan">
        <header><p className="campaign-label">The Kalahooska compact / 2068 to 2072</p><h2>Keep our character.<br/><em>Expand our possibilities.</em></h2><p>Five connected commitments. A local program built on the Alliance’s national priorities, with the practical detail open to scrutiny.</p></header>
        <nav className="pagi-plan-index" aria-label="Kalahooska policy chapters">{chapters.map((chapter, index) => <a key={chapter.label} href={`#pagi-policy-${index}`}><span>0{index + 1}</span>{chapter.label}<span aria-hidden="true">↓</span></a>)}</nav>
        {chapters.map((chapter, index) => <article className="pagi-policy" id={`pagi-policy-${index}`} key={chapter.label}><div><p className="campaign-label">0{index + 1} / {chapter.label}</p><h3>{chapter.title}</h3><p>{chapter.intro}</p><Link className="pagi-link" href={`/platform/${policyPaths[index]}`}>The national commitment <span aria-hidden="true">↗</span></Link></div><div className="pagi-details">{chapter.points.map(([title, body], detailIndex) => <details key={title} open={detailIndex === 0}><summary>{title}<span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</div></article>)}
      </section>

      <section className="pagi-connections"><figure><img src={story.featureImage} alt={story.featureAlt} width="2200" height="1649" loading="lazy"/></figure><div><p className="campaign-label">The everyday test</p><h2>The last mile<br/><em>is someone’s home.</em></h2><p>A road is a school journey, a delivery route and the way to a medical appointment. Maintenance deserves the same attention as a new project.</p><p>I will seek a published condition audit and a funded repair schedule, starting with safety and the risk of communities being cut off. Residents should be able to see the responsible authority and the next milestone.</p><a className="pagi-link" href="#pagi-policy-2">Read the connections plan <span aria-hidden="true">↑</span></a></div></section>

      <section className="pagi-account pagi-width" id="commitment"><div><p className="campaign-label">A mandate with limits. A record you can read.</p><h2>Local power.<br/><em>Public answers.</em></h2><p>An MP cannot sign every road contract or run every clinic. Rupert’s role would be to secure agreements, scrutinize spending and bring unresolved local problems into Parliament.</p></div><div className="pagi-account-record"><article><span>THE FIRST REQUEST</span><h3>Put the decisions in one place.</h3><p>Seek a regional compact listing the housing sites, service capacity, forest plans and essential connections needing decisions. Each entry should name its authority and funding source.</p></article><article><span>THE REGULAR ACCOUNT</span><h3>Report progress each quarter.</h3><p>Separate proposals from funded work and completed projects. Publish delays and the next action, not just a list of announcements. Protect private constituent casework.</p></article><article><span>THE NONNEGOTIABLE RULE</span><h3>No favored firms. No hidden bill.</h3><p>Open contracts, independent audit and usable appeals. Resource revenues should build lasting assets; essential services need dependable funding, not a wager on next year’s receipts.</p></article></div></section>

      <section className="pagi-invite" id="take-part"><div className="pagi-width"><div><p className="campaign-label">Bring the view from your town</p><h2>Kalahooska’s future<br/><em>belongs in the room.</em></h2><p>Which connection cannot be relied on? What keeps a local firm from growing? Where would new homes make sense? Bring the question only someone who lives here would ask.</p></div><div className="pagi-invite-actions"><Link className="pagi-button" href="/events#upcoming">Find an Alliance conversation <span aria-hidden="true">↗</span></Link><Link className="pagi-link" href="/2068#priorities">Our shared national priorities <span aria-hidden="true">↗</span></Link><CandidateActions name="Rupert Pagi Shaw" region="Kalahooska" commitments={["More homes in serviced towns, dependable renting and limited support for additional new homes.", "Sustainable forestry, local processing and fair opportunities for smaller firms.", "Published road maintenance, reliable digital access and practical transport connections.", "Training connected to employers and healthcare access backed by verified staffing.", "Accountable regional powers, open contracts and quarterly progress reports."]}/></div></div></section>
    </main><PlatformFooter />
  </div>;
}
