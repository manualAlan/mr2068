type CalendarEvent = {
  slug: string;
  day: string;
  month: string;
  time: string;
  title: string;
  place: string;
  description: string;
};

const months: Record<string, string> = {
  JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
  JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};

function calendarText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function foldCalendarLine(value: string) {
  const encoder = new TextEncoder();
  let folded = "";
  let length = 0;
  for (const character of value) {
    const bytes = encoder.encode(character).length;
    if (length + bytes > 75) {
      folded += "\r\n ";
      length = 1;
    }
    folded += character;
    length += bytes;
  }
  return folded;
}

export function eventCalendarHref(event: CalendarEvent) {
  const date = `2068${months[event.month]}${event.day.padStart(2, "0")}`;
  const time = event.time.replace(":", "");
  const description = `${event.description}\nStarts at ${event.time}, local venue time.\nRegistration details will be announced on the campaign events page.`;
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Alliance//Caprica Campaign 2068//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.slug}-2068@alliance.caprica`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART:${date}T${time}00`,
    `SUMMARY:${calendarText(event.title)}`,
    `LOCATION:${calendarText(event.place)}`,
    `DESCRIPTION:${calendarText(description)}`,
    `URL:https://manualalan.github.io/mr2068/events/#${event.slug}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].map(foldCalendarLine).join("\r\n") + "\r\n";

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendar)}`;
}

export function CalendarLink({ event }: { event: CalendarEvent }) {
  return (
    <a className="register-link" href={eventCalendarHref(event)} download={`${event.slug}-2068.ics`}>
      Save the date <span className="arrow" aria-hidden="true">↓</span>
    </a>
  );
}
