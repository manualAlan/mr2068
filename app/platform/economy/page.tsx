import type { Metadata } from "next";
import BeliefPage from "../BeliefPage";

export const metadata: Metadata = { title: "Back the next good idea | Alliance 2068" };

export default function Page() {
  return <BeliefPage slug="economy" />;
}
