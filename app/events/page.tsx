import { events } from "../data";
import { BulletinForm, EventPageNavigator, RegisterButton, RegistrationForm, VolunteerForm } from "./EventActions";
import { PlatformFooter, PlatformHeader } from "../platform/PlatformChrome";

export default function Events(){return <div className="events68-root"><PlatformHeader/><EventPageNavigator/><main>
 <section className="events68-hero"><img src="/images/events/events-hero.jpg" alt="Audience gathered for a public forum"/><div className="events68-hero-shade"/><div className="events68-hero-copy"><h1>Events</h1><p>Across Caprica, in the rooms where decisions become real.</p></div></section>
 <section className="events68-list" id="upcoming"><header className="events68-heading"><span>UPCOMING / 2068</span><h2>Meet us where<br/>Caprica lives.</h2></header><div className="events68-grid">
  {events.map((event,index)=><article className={`events68-card events68-card-${index+1}`} id={event.slug} key={event.title}><figure><img src={event.image} alt={event.place} style={{objectPosition:event.imagePosition}}/></figure><div className="events68-card-copy"><div className="events68-meta"><time><strong>{event.day}</strong><span>{event.month}<br/>{event.time}</span></time><span>{event.type}</span></div><h3>{event.title}</h3><p className="events68-place">{event.place}</p><p className="events68-description">{event.description}</p><RegisterButton event={event.slug}/></div></article>)}
 </div></section>
 <section className="events68-register" id="register"><div className="events68-register-copy"><span>COME INTO THE ROOM</span><h2>Reserve a seat.<br/>Bring a question.</h2><p>Every public event includes an open-question session. Registration is free.</p></div><RegistrationForm/></section>
 <section className="events68-community"><div className="events68-panel" id="updates"><span>FIELD BULLETIN</span><h2>Stay close to the campaign.</h2><BulletinForm/></div><div className="events68-panel" id="volunteer"><span>TAKE PART</span><h2>Help in your part of Caprica.</h2><VolunteerForm/></div></section>
 </main><PlatformFooter/></div>}
