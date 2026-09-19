import { candidates } from "../data";
import type { Metadata } from "next";
import Link from "next/link";
import { PlatformFooter, PlatformHeader } from "../platform/PlatformChrome";

export const metadata: Metadata = { title: "Our candidates | Alliance 2068", description: "Meet the people standing for the Alliance across Caprica." };

export default function Team(){return <div className="team68-root"><a className="campaign-skip" href="#candidates">Skip to candidates</a><PlatformHeader/><main id="candidates">
 <header className="team68-heading"><h1>Candidates</h1><p>Select a portrait to learn more about each candidate.</p></header>
 <section className="team68-grid" aria-label="Alliance candidates">
  {candidates.map((candidate)=>{
   const href=candidate.campaignSite ?? "/2068";
   const external=href.startsWith("http");
   return <Link className="team68-card" href={href} id={candidate.slug} key={candidate.name} target={external?"_blank":undefined} rel={external?"noreferrer":undefined} aria-label={`Visit ${candidate.name}'s campaign website`}><figure><img src={candidate.image} alt={candidate.name}/></figure><h2>{candidate.name}</h2></Link>;
  })}
 </section>
 </main><PlatformFooter copyright="© 2068 Alliance"/></div>}
