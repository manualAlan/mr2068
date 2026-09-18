import type { Metadata } from "next";
import BeliefPage from "../BeliefPage";

export const metadata: Metadata = { title: "Someone should answer | Alliance 2068" };

export default function Page() {
  return <BeliefPage slug="healthcare" />;
}
