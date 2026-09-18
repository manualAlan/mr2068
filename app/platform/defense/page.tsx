import type { Metadata } from "next";
import BeliefPage from "../BeliefPage";

export const metadata: Metadata = { title: "Ready when it matters | Alliance 2068" };

export default function Page() {
  return <BeliefPage slug="defense" />;
}
