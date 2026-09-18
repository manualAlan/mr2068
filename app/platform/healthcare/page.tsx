import { PolicyPageShell, PolicyProgramme } from "../PlatformChrome";
import { getFocusArea } from "../platform-data";

const area = getFocusArea("healthcare")!;

export default function HealthcarePage() {
  return (
    <PolicyPageShell area={area}>
      <PolicyProgramme
        kicker="ACCESS / OUTCOMES / CHOICE"
        title="Universal care that respects the patient’s time."
        introduction="Capricans should not have to choose between universal access and a service that answers. We will keep care available to all while funding treatment around the patient, publishing outcomes and using every qualified provider able to help."
        pillars={[
          { title: "The 72-hour guarantee", text: "Every patient seeking non-emergency primary care will receive an appointment or clinical call within 72 hours.", commitments: ["Alternative-provider reimbursement when the guarantee is missed", "Same-day urgent hubs in every health region", "One booking record across primary, urgent and hospital care"] },
          { title: "Waiting lists people can see", text: "A queue hidden from the public is a promise nobody can enforce.", commitments: ["Weekly waiting-time and cancellation dashboards", "Choice of another public or accredited provider after the limit", "Regional recovery contracts paid for completed treatment"] },
          { title: "More care, fewer bottlenecks", text: "Let clinicians work at the top of their licence and make Caprica the best island system in which to practise.", commitments: ["Expanded prescribing and referral roles for qualified nurses", "Fast recognition for trusted overseas qualifications", "Retention bonuses targeted to shortage specialties and islands"] },
          { title: "Mental health before crisis", text: "Young people deserve help before distress becomes an emergency.", commitments: ["Walk-in youth mental-health services in every major region", "A ten-day first-assessment standard for under-25s", "Independent measurement of recovery, not only contacts delivered"] },
        ]}
      />
    </PolicyPageShell>
  );
}
