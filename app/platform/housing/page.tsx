import { PolicyPageShell, PolicyProgramme } from "../PlatformChrome";
import { getFocusArea } from "../platform-data";

const area = getFocusArea("housing")!;

export default function HousingPage() {
  return (
    <PolicyPageShell area={area}>
      <PolicyProgramme
        kicker="HOMES / OWNERSHIP / INFRASTRUCTURE"
        title="Build enough homes to make independence possible."
        introduction="Housing scarcity is not inevitable. It is the accumulated result of slow permissions, infrastructure that arrives too late and a system that rewards delay. The Alliance will restore a presumption in favour of building where transport, jobs and services already exist."
        pillars={[
          { title: "A planning clock", text: "Certainty is the first building material. Complete applications in growth zones will receive a decision within 120 days.", commitments: ["Pre-zoned housing capacity around rapid-transit stations", "One digital application across planning, water and transport", "Published reasons—and an automatic appeal—for every missed deadline"] },
          { title: "Infrastructure before scarcity", text: "National and local government will agree ten-year growth compacts that connect homes to water, power and mobility.", commitments: ["A revolving Infrastructure Capacity Fund", "Transparent developer contributions tied to delivered works", "Land-value gains shared with the communities enabling growth"] },
          { title: "A route into ownership", text: "Lower costs by increasing supply, then help working households convert stable rent into a deposit of their own.", commitments: ["Portable lifetime housing accounts for deposits and retirement", "Shared-equity places capped by income and home value", "More long-term rental contracts with clear, enforceable rights"] },
          { title: "Build better", text: "A modern construction market should reward speed, quality and lower lifetime costs—not political connections.", commitments: ["Pattern-book approvals for safe, high-quality designs", "Open standards for modular and low-carbon construction", "Public land released through competitive, time-limited tenders"] },
        ]}
      />
    </PolicyPageShell>
  );
}
