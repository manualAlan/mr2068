import Link from 'next/link';
import { PlatformHeader, PlatformFooter } from '../platform/PlatformChrome';

export type CandidateChapter = { label: string; title: string; intro: string; points: [string, string][] };
export type CandidateStory = {
  name: string; region: string; portrait: string; hero: string; heroAlt: string;
  eyebrow: string; headline: string; accent: string; deck: string;
  belief: string; introduction: string[]; chapters: CandidateChapter[];
  promise: string; eventHref: string; eventLabel: string; theme: string;
  featureImage?: string; featureAlt?: string;
  planTitle?: string; planIntro?: string; commitmentCopy?: string[];
  invitationTitle?: string; invitationCopy?: string;
};

export default function AllianceCandidateStory({ story }: { story: CandidateStory }) {
 return <div className={`story68 story68-${story.theme}`}>
  <a className="campaign-skip" href="#candidate-main">Skip to content</a><PlatformHeader/>
  <main id="candidate-main">
   <section className="story-hero"><img src={story.hero} alt={story.heroAlt} fetchPriority="high"/><div className="story-hero-shade"/><div className="story-hero-copy"><p>{story.eyebrow}</p><h1>{story.headline}<br/><em>{story.accent}</em></h1><span>{story.deck}</span><a href="#plan">Explore the 2068 plan ↓</a></div></section>
   <nav className="candidate-localbar" aria-label={`${story.name} campaign`}><a href="#candidate">Meet {story.name.split(' ')[0]}</a><a href="#plan">The local plan</a><a href="#commitment">The commitment</a></nav>
   <section className="story-intro story-width" id="candidate"><figure><img src={story.portrait} alt={story.name}/><figcaption><strong>{story.name}</strong><span>Candidate for {story.region} MP</span></figcaption></figure><div><p className="story-label">A personal belief</p><h2>{story.belief}</h2>{story.introduction.map(p=><p key={p}>{p}</p>)}<span className="story-signature">{story.name.split(' ')[0]}</span></div></section>
   {story.featureImage && <section className="story-feature"><img src={story.featureImage} alt={story.featureAlt ?? ''} loading="lazy"/><p>{story.promise}</p></section>}
   <section className="story-plan story-width" id="plan"><div className="story-plan-head"><p className="story-label">{story.region} · 2068 to 2072</p><h2>{story.planTitle ?? 'The next chapter starts here.'}</h2><p>{story.planIntro ?? 'A regional program tied to the Alliance’s national commitments.'}</p></div><nav className="story-chapter-index" aria-label="Local policy chapters">{story.chapters.map((chapter,index)=><a href={`#chapter-${index+1}`} key={chapter.label}><span>0{index+1}</span>{chapter.label}<span aria-hidden="true">↓</span></a>)}</nav>{story.chapters.map((chapter,index)=><article className="story-chapter" id={`chapter-${index+1}`} key={chapter.label}><div><p className="story-label">0{index+1} / {chapter.label}</p><h3>{chapter.title}</h3><p>{chapter.intro}</p></div><div>{chapter.points.map(([title,body],pointIndex)=><details key={title} open={pointIndex===0}><summary>{title}<span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</div></article>)}</section>
   <section className="story-commit" id="commitment"><div className="story-width"><p className="story-label">The standard I set for myself</p><h2>{story.promise}</h2><div>{(story.commitmentCopy ?? ['I will publish a quarterly account of these commitments, with costs, funding and the institution responsible for the next decision.']).map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></div></section>
   <section className="story-invite story-width"><p className="story-label">Bring your question</p><h2>{story.invitationTitle ?? 'Politics begins with a conversation.'}</h2><p>{story.invitationCopy ?? 'Tell us what would make it easier to build a good life where you live.'}</p><div><Link href={story.eventHref}>{story.eventLabel} <span aria-hidden="true">↗</span></Link><Link href="/platform/mission-statement/">What the Alliance believes <span aria-hidden="true">↗</span></Link></div></section>
  </main><PlatformFooter/>
 </div>;
}
