import { PolicyPageShell, PolicyProgramme } from "../PlatformChrome";
import { getFocusArea } from "../platform-data";

const area = getFocusArea("foreign-policy")!;

export default function ForeignPolicyPage() {
  return (
    <PolicyPageShell area={area}>
      <PolicyProgramme
        kicker="THE BLUESPAN DOCTRINE"
        title="Open to the world. Clear about our interests."
        introduction="Caprican foreign policy will be liberal in purpose and realist in method: defending the republic, keeping the sea lanes open and sustaining reliable partners without turning every injustice abroad into an unlimited military mission."
        pillars={[
          { title: "A stronger Columbian Union", text: "Caprica prospers when the CU is secure, competitive and able to act together where interests genuinely converge.", commitments: ["Complete the CU market in services and digital trade", "Mutual resilience plans for energy, medicines and critical technology", "Collective defense commitments that are specific and funded"] },
          { title: "Gateway Caprica", text: "Use our ports, law, finance and geography to connect Columbia with Albeuman and the wider world.", commitments: ["Trusted-trader corridors through Caprican ports", "Commercial diplomacy focused on investment and market access", "Open-science and student agreements with reliable partners"] },
          { title: "Peace through balance", text: "Diplomacy works best when commitments are credible and objectives are limited.", commitments: ["No open-ended wars of political conversion", "Support territorial integrity, including Kerevan’s restoration", "Keep Oshmit isolated from weapons and dual-use supply chains"] },
          { title: "Build on the Kaoqing Communique", text: "Normalization with OURS showed that persistent diplomacy can reduce danger without surrendering principle.", commitments: ["A permanent Twin Strait crisis hotline", "Maritime deconfliction and incident-reporting rules", "Parliamentary votes for deployments beyond immediate defense"] },
        ]}
      />
    </PolicyPageShell>
  );
}
