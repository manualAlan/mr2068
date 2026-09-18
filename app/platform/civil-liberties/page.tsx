import { PolicyPageShell, PolicyProgramme } from "../PlatformChrome";
import { getFocusArea } from "../platform-data";

const area = getFocusArea("civil-liberties")!;

export default function CivilLibertiesPage() {
  return (
    <PolicyPageShell area={area}>
      <PolicyProgramme
        kicker="LIBERTY / LAW / ACCOUNTABILITY"
        title="The state must be capable—and remain under law."
        introduction="Security powers are sometimes necessary. Unreviewable power never is. The Alliance will protect free expression, privacy, equal law and due process while giving democratic institutions the transparency needed to earn trust."
        pillars={[
          { title: "Enact the Nuremberg Act", text: "Put intelligence and national-security powers behind clear statutory limits, independent warrants and personal accountability.", commitments: ["Judicial authorization for intrusive surveillance", "A legally protected intelligence inspector with audit access", "Criminal penalties for deliberate unlawful targeting"] },
          { title: "Sunlight by default", text: "Secrecy must be justified case by case, not inherited as an administrative habit.", commitments: ["Annual public reporting on warrants, errors and retention", "Automatic review dates for every classified programme", "A strengthened right to information with enforceable deadlines"] },
          { title: "Free citizens online", text: "Digital life should not become a permissioned space governed by invisible state pressure.", commitments: ["No general identity requirement for lawful online speech", "Warrants for access to private communications", "A right to challenge automated public-sector decisions"] },
          { title: "Equal law", text: "Rights belong to people, not factions, offices or majorities.", commitments: ["Independent review of emergency powers after 60 days", "Legal aid focused on liberty, housing and family cases", "One civil standard protecting belief, speech and peaceful association"] },
        ]}
      />
    </PolicyPageShell>
  );
}
