import { events } from "../data";
import type { Metadata } from "next";
import { CalendarLink } from "./EventActions";
import { PlatformFooter, PlatformHeader } from "../platform/PlatformChrome";

export const metadata: Metadata = { title: "Come with a question | Alliance events 2068", description: "Meet the Alliance across Caprica. Find a public conversation near you and save the date." };

export default function Events() {
  return (
    <div className="events68-root">
      <PlatformHeader />
      <main>
        <section className="events68-hero">
          <img src="/images/events/events-hero.jpg" alt="Audience gathered for a public forum" />
          <div className="events68-hero-shade" />
          <div className="events68-hero-copy">
            <h1>Events</h1>
            <p>Come with a question.</p>
          </div>
        </section>

        <section className="events68-list" id="upcoming">
          <header className="events68-heading">
            <span>ACROSS CAPRICA</span>
            <h2>A campaign should<br />be a conversation.</h2>
          </header>
          <div className="events68-grid">
            {events.map((event, index) => (
              <article className={`events68-card events68-card-${index + 1}`} id={event.slug} key={event.slug}>
                <figure>
                  <img src={event.image} alt={event.place} style={{ objectPosition: event.imagePosition }} />
                </figure>
                <div className="events68-card-copy">
                  <div className="events68-meta">
                    <time>
                      <strong>{event.day}</strong>
                      <span>{event.month} 2068<br />{event.time}</span>
                    </time>
                    <span>{event.type}</span>
                  </div>
                  <h3>{event.title}</h3>
                  <p className="events68-place">{event.place}</p>
                  <p className="events68-description">{event.description}</p>
                  <CalendarLink event={event} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="events68-register" id="register">
          <div className="events68-register-copy" id="volunteer">
            <span>COME INTO THE ROOM</span>
            <h2>Questions<br />welcome.</h2>
          </div>
          <div className="events68-register-copy" id="updates">
            <p>Meet the people standing for your area. Tell us what is working, what needs to change and what you want to build in your part of Caprica.</p>
            <p><strong>Registration details will be announced here.</strong></p>
            <p>You can save an event to your calendar now. Times are shown in the local time of each venue.</p>
          </div>
        </section>
      </main>
      <PlatformFooter />
    </div>
  );
}
