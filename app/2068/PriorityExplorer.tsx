"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";

const priorities = [
 {label:"A home of your own",topic:"Housing & independence",title:"More homes. More choice. More independence.",text:"Build enough homes for people to settle, move and put down roots. Give planning decisions a deadline, renters dependable agreements and eligible households a limited route into ownership that adds new homes.",measure:"50% more annual home completions by 2072",basis:"Compared with the verified 2068 total. Schools, water and transport planned alongside growth.",href:"housing",link:"How we make room for homes",connection:"Infrastructure must be ready when the keys arrive.",related:"infrastructure"},
 {label:"Room for a good idea",topic:"Enterprise & productive work",title:"Make it easier to start. Make it worthwhile to grow.",text:"Open a business through one clear process. Let firms compete for customers, investment and public contracts. Connect equipment investment and practical training so better productivity becomes better work.",measure:"Register a straightforward business in one day",basis:"With clear fees, proportionate checks and competition rules that apply to established firms too.",href:"economy",link:"Our plan for enterprise",connection:"Practical skills turn investment into opportunity.",related:"education"},
 {label:"Connections that work",topic:"Infrastructure & development",title:"A growing country needs dependable foundations.",text:"Reliable power, clean water, useful transport and strong digital connections make private ambition possible. Publish project schedules, costs and the name of the authority responsible for delivery.",measure:"A published national investment pipeline by 2069",basis:"Independent appraisal, construction milestones and maintenance funded from the beginning.",href:"infrastructure",link:"The infrastructure plan",connection:"Better connections open sites for new homes.",related:"housing"},
 {label:"Services you can rely on",topic:"Education & healthcare",title:"Know what to expect. See what improves.",text:"Strong reading and mathematics, respected technical training and healthcare you can reach. Give professionals room to do their jobs, and publish the funding, staffing and results the public should expect.",measure:"Clear standards, funded capacity, visible results",basis:"School progress and course outcomes. Actual appointment and treatment waits, including people unable to book.",href:"healthcare",link:"The healthcare commitments",connection:"Explore the education and skills plan.",related:"education"},
 {label:"Freedom with firm foundations",topic:"Liberty & accountable government",title:"Your rights are permanent. Public power is accountable.",text:"Equal treatment before the law. Secure property rights. Open procurement. Independent courts and disciplined finances. Government should be capable enough to act and accountable for every power it uses.",measure:"68% gross debt now. A 65% goal for 2072.",basis:"Under normal economic conditions. Keep the separate net debt ceiling clear and disclose public guarantees.",href:"civil-liberties",link:"How we protect your freedom",connection:"See the fiscal rules behind our economic plan.",related:"economy"},
];

export default function PriorityExplorer(){
 const [selected,setSelected]=useState(0);
 const tabs=useRef<(HTMLButtonElement|null)[]>([]);
 const onKey=(event:KeyboardEvent<HTMLButtonElement>,index:number)=>{
  const keys=["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"];
  if(!keys.includes(event.key))return;
  event.preventDefault();
  const next=event.key==="Home"?0:event.key==="End"?priorities.length-1:(index+(event.key==="ArrowLeft"||event.key==="ArrowUp"?-1:1)+priorities.length)%priorities.length;
  setSelected(next);tabs.current[next]?.focus();
 };
 return <section className="build68-priorities" id="priorities" aria-labelledby="priorities-title">
  <div className="campaign-width">
   <div className="priority-heading"><div><p className="campaign-label">THE ALLIANCE PLAN · 2068 TO 2072</p><h2 id="priorities-title">Five priorities.<br/><em>One purpose.</em></h2></div><p>The freedom to build a good life. <br/>Choose a priority to see the commitment <br/>and the policy that makes it possible.</p></div>
   <div className="priority-explorer"><div className="priority-tabs" role="tablist" aria-label="Our five priorities" aria-orientation="vertical">{priorities.map((p,index)=><button key={p.href} id={`priority-tab-${index}`} ref={node=>{tabs.current[index]=node}} role="tab" type="button" aria-selected={selected===index} aria-controls={`priority-panel-${index}`} tabIndex={selected===index?0:-1} onClick={()=>setSelected(index)} onKeyDown={event=>onKey(event,index)}><span>0{index+1}</span><strong>{p.label}</strong><span aria-hidden="true">→</span></button>)}</div>
    {/* Keep every panel in the HTML so the GitHub Pages client can switch them without React. */}
    {priorities.map((item,index)=><div key={item.href} className="priority-panel" id={`priority-panel-${index}`} role="tabpanel" hidden={selected!==index} tabIndex={0} aria-labelledby={`priority-tab-${index}`}><div className="priority-topic"><span>{item.topic}</span><span>0{index+1} / 05</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="priority-measure"><strong>{item.measure}</strong><p>{item.basis}</p></div><Link className="campaign-text-link" href={`/platform/${item.href}`}>{item.link}<span aria-hidden="true">↗</span></Link><Link className="priority-connection" href={`/platform/${item.related}`}>{item.connection}<span aria-hidden="true">→</span></Link></div>)}
   </div>
  </div>
 </section>;
}
