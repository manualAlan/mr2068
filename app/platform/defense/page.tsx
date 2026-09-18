import { PolicyPageShell, PolicyProgramme } from "../PlatformChrome";
import { getFocusArea } from "../platform-data";

const area = getFocusArea("defense")!;

export default function DefensePage() {
  return (
    <PolicyPageShell area={area}>
      <PolicyProgramme
        kicker="SEA / AIR / MOBILITY"
        title="An island force designed around the map."
        introduction="Caprica does not need the largest military in Columbia. It needs the force most able to keep hostile power away from its shores, reinforce CU partners and move decisively when deterrence fails."
        pillars={[
          { title: "Command the approaches", text: "The navy will become the senior service for an island nation dependent on open water.", commitments: ["More submarines, escorts and unmanned maritime patrols", "Distributed anti-ship and air-defense batteries", "A protected logistics network across Caprican ports"] },
          { title: "Own the air picture", text: "A stronger air force will connect surveillance, air defense and long-range mobility.", commitments: ["Persistent maritime patrol and airborne early warning", "Hardened and dispersed operating bases", "Strategic lift for national and CU contingencies"] },
          { title: "A smaller elite army", text: "Shift from mass formations to a mobile force able to deploy quickly across islands, ports and allied territory.", commitments: ["Lean expeditionary brigades with integrated drones", "Larger trained reserves and faster mobilization", "Protected communications down to small-unit level"] },
          { title: "Buy readiness, not announcements", text: "Procurement will be judged by equipment available for deployment and crews trained to use it.", commitments: ["A ten-year funded capability plan", "Quarterly readiness reporting to Parliament", "Open competition with sovereign maintenance capacity"] },
        ]}
      />
    </PolicyPageShell>
  );
}
