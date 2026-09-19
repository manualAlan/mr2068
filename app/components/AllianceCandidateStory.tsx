import Link from 'next/link';
import { PlatformHeader, PlatformFooter } from '../platform/PlatformChrome';

export type CandidateChapter = { label: string; title: string; intro: string; points: [string, string][] };
export type CandidateStory = {
  name: string; region: string; portrait: string; hero: string; heroAlt: string;
  eyebrow: string; headline: string; accent: string; deck: string;
  belief: string; introduction: string[]; chapters: CandidateChapter[];
  promise: string; eventHref: string; eventLabel: string; theme: string;
  featureImage?: string; featureAlt?: string;
};

export default function AllianceCandidateStory({ story }: { story: CandidateStory }) {
 return <div className={`story68 story68-${story.theme}`}>
  <a className="campaign-skip" href="#candidate-main">Skip to content</a><PlatformHeader/>
  <main id="candidate-main">
   <section className="story-hero"><img src={story.hero} alt={story.heroAlt} fetchPriority="high"/><div className="story-hero-shade"/><div className="story-hero-copy"><p>{story.eyebrow}</p><h1>{story.headline}<br/><em>{story.accent}</em></h1><span>{story.deck}</span><a href="#plan">Explore the 2068 plan ↓</a></div></section>
   <nav className="candidate-localbar" aria-label={`${story.name} campaign`}><a href="#candidate">Meet {story.name.split(' ')[0]}</a><a href="#plan">The local plan</a><a href="#commitment">The commitment</a></nav>
   <section className="story-intro story-width" id="candidate"><figure><img src={story.portrait} alt={story.name}/><figcaption><strong>{story.name}</strong><span>Candidate for {story.region} MP</span></figcaption></figure><div><p className="story-label">A personal belief</p><h2>{story.belief}</h2>{story.introduction.map(p=><p key={p}>{p}</p>)}<span className="story-signature">{story.name.split(' ')[0]}</span></div></section>
   {story.featureImage && <section className="story-feature"><img src={story.featureImage} alt={story.featureAlt ?? ''} loading="lazy"/><p>{story.promise}</p></section>}
   <section className="story-plan story-width" id="plan"><div className="story-plan-head"><p className="story-label">{story.region} · 2068 to 2072</p><h2>The things that should<br/><em>change in everyday life.</em></h2><p>A regional programme tied to the Alliance’s national commitments. Open each proposal for the delivery test behind it.</p></div>{story.chapters.map((chapter,index)=><article className="story-chapter" id={`chapter-${index+1}`} key={chapter.label}><div><p className="story-label">0{index+1} / {chapter.label}</p><h3>{chapter.title}</h3><p>{chapter.intro}</p></div><div>{chapter.points.map(([title,body])=><details key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</div></article>)}</section>
   <section className="story-commit" id="commitment"><div className="story-width"><p className="story-label">The standard I set for myself</p><h2>{story.promise}</h2><div><p>I will hold regular constituency sessions across the region, publish a quarterly account of these commitments and tell you which institution is responsible when progress stalls.</p><p>I will put costs, funding and long term maintenance beside every major proposal. You should be able to judge the work, not just hear the announcement.</p></div></div></section>
   <section className="story-invite story-width"><p className="story-label">Bring your question</p><h2>Politics should begin<br/><em>with a conversation.</em></h2><p>Tell us what would make it easier to build a good life where you live.</p><div><Link href={story.eventHref}>Find the next campaign event ↗</Link><Link href="/platform/mission-statement/">What the Alliance believes ↗</Link></div></section>
  </main><PlatformFooter/>
 </div>;
}
