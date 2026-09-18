import { PlatformFooter, PlatformHeader } from "./PlatformChrome";
import { beliefStories } from "./beliefs-content";
import { getFocusArea } from "./platform-data";

export default function BeliefPage({ slug }: { slug: string }) {
  const story = beliefStories[slug];
  const area = getFocusArea(slug)!;
  const split = slug === "economy" || slug === "healthcare";
  return (
    <div className={`belief-root belief-${slug}`}>
      <a className="campaign-skip" href="#belief-content">Skip to our beliefs</a>
      <PlatformHeader />
      <main>
        <section className={`belief-hero ${split ? "belief-hero-split" : "belief-hero-wide"}`} aria-labelledby="belief-title">
          <figure><img src={area.image} alt={area.alt ?? ""} style={{ objectPosition: area.imagePosition }} fetchPriority="high" /></figure>
          <div className="belief-hero-copy">
            <p className="campaign-label">{story.label}</p>
            <h1 id="belief-title">{story.headline.map((line, index) => index === 0 ? <span key={line}>{line}</span> : <em key={line}> {line}</em>)}</h1>
            <p className="belief-standfirst">{story.standfirst}</p>
          </div>
          <a className="belief-scroll" href="#belief-content" aria-label={`Read our beliefs on ${story.label.toLowerCase()}`}>↓</a>
        </section>
        <article id="belief-content">
          <section className="belief-opening campaign-width">
            <p className="campaign-label">WHAT WE BELIEVE</p>
            <div><h2>{story.opening}</h2><div className="belief-prose">{story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
          </section>
          <section className="belief-statement" aria-label="Our conviction">
            <p>{story.pullQuote}</p>
            {slug === "defense" && <img className="belief-airlift" src="/images/belief-airlift.png" alt="Caprican military transport aircraft" loading="lazy" width="1536" height="1024" />}
          </section>
          <section className="belief-principles campaign-width" aria-label="The principles behind our policy">
            {story.principles.map((principle) => <div className="belief-principle" key={principle.title}><h3>{principle.title}</h3><p>{principle.text}</p></div>)}
          </section>
          <section className="belief-details campaign-width">
            <div className="belief-details-intro"><p className="campaign-label">BELIEF INTO ACTION</p><h2>{story.detailTitle}</h2><p>Convictions matter when they change what happens. Here is where we start.</p></div>
            <div className="belief-accordions">{story.details.map((detail, index) => <details key={detail.title} open={index === 0}><summary>{detail.title}<span aria-hidden="true">+</span></summary><p>{detail.text}</p></details>)}</div>
          </section>
          <section className="belief-closing campaign-width"><h2>{story.closing}</h2><a className="campaign-text-link" href="/manifesto/caprica-freedom-to-build-2068.pdf" target="_blank" rel="noreferrer">Read the full manifesto <span aria-hidden="true">↗</span></a></section>
        </article>
      </main>
      <PlatformFooter />
    </div>
  );
}
