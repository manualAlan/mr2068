import { PolicyPageShell } from "../PlatformChrome";
import { getFocusArea } from "../platform-data";

const area = getFocusArea("mission-statement")!;

export default function MissionStatementPage() {
  return (
    <PolicyPageShell area={area}>
      <article className="p68-letter">
        <p className="p68-letter-mark">AN OPEN LETTER TO ALL CAPRICANS</p>
        <h2>The Alliance mission statement</h2>
        <p className="p68-salutation">Fellow Capricans,</p>
        <p>Caprica is an island nation at the western edge of the Columbian continent, facing the Twin Strait and looking west towards Albeuman. Our geography gives us a great national opportunity: to become Columbia’s gateway to the world, and the world’s gateway to Columbia.</p>
        <p>We have faith in the talent of our people and confidence in what an ambitious, outward-looking nation can achieve. Our vision is a Caprica where enterprise flourishes, investment is welcomed and ideas become industries—a small nation with a keystone role in the global economy, connecting countries and creating opportunities far beyond our shores.</p>
        <p>Our mission is to place national development at the heart of government. We will champion an open, pro-business economy, backed by modern infrastructure, excellent education, scientific ambition and institutions that command trust. We want every generation to inherit greater opportunities, and every citizen to share in the country’s progress.</p>
        <p>Abroad, we will work with partners across Columbia and the wider world to advance peace through cooperation and prosperity through trade, investment and discovery. We believe Caprica can become a country others depend upon, whose success contributes to their own.</p>
        <p>With purpose in government, confidence in enterprise and faith in our people, we will build a nation equal to that ambition.</p>
        <div className="p68-signature">
          <img src="/images/alan-bluespan-signature.png" alt="Alan Bluespan signature" />
          <strong>Alan Bluespan</strong>
          <span>Party Co-chair</span>
        </div>
      </article>
    </PolicyPageShell>
  );
}
