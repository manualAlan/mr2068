import type { Metadata } from "next";
import { PolicyPageShell } from "../PlatformChrome";
import { getFocusArea } from "../platform-data";

export const metadata: Metadata = { title: "What we believe | Alliance 2068" };
const area = getFocusArea("mission-statement")!;

export default function MissionStatementPage() {
  return (
    <PolicyPageShell area={area}>
      <article className="p68-letter">
        <p className="p68-letter-mark">AN OPEN LETTER TO ALL CAPRICANS</p>
        <h2>I believe in what<br /><em>we can become.</em></h2>
        <p className="p68-salutation">Fellow Capricans,</p>
        <p>I believe the best thing a government can give people is the confidence to get on with their own lives. To put down roots. To try an idea. To say what they think, even when the people in charge would rather not hear it.</p>
        <p>That belief is why the Alliance exists. We trust people with their own ambitions. We believe a business should succeed because it serves its customers well, not because its owner knows a minister. And we believe that keeping a promise matters more than finding a clever way to announce it.</p>
        <p>Caprica has a remarkable opportunity. We stand at the western edge of Columbia, facing the Twin Strait and looking towards Albeuman. We can be Columbia’s gateway to the world, and the world’s gateway to Columbia. Our size does not have to set the limits of our ambition.</p>
        <p>But a successful country has to feel successful in ordinary life. A first salary should open possibilities. A family should be able to find a home. A person who is ill should know where to turn. An entrepreneur should spend more time finding customers than chasing forms.</p>
        <p>This takes a government that knows its responsibilities. Keep the law fair. Keep the streets safe. Look after the public finances. Build the infrastructure and education that let talent travel further. Then leave room for people to surprise us.</p>
        <p>Abroad, I want Caprica to be a country others can count on. Open to trade, steady with our friends and careful with the lives of those who serve. We should have the confidence to talk to people we disagree with, and the judgment to know which commitments we can keep.</p>
        <p>I am asking you to judge us by the opportunities we open and the promises we keep. Question us. Expect an answer. The future of this country is too important to leave to people who all agree with one another.</p>
        <p className="p68-letter-closing">We have the talent. We have the opportunity.<br />Let’s give ourselves the freedom to build.</p>
        <div className="p68-signature"><img src="/images/robert-bluespan-signature.png" alt="Robert Bluespan signature" width="220" height="54" /><strong>Robert Bluespan</strong><span>Party Co-leader</span></div>
      </article>
    </PolicyPageShell>
  );
}
