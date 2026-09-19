import type { Metadata } from "next";
import BeliefPage from "../BeliefPage";

export const metadata: Metadata = {
  title: "A country that works | Alliance 2068",
  description: "The Alliance plan for dependable energy, transport, water and digital connections, with published schedules and independently tested costs.",
};

export default function Page() {
  return <BeliefPage slug="infrastructure" />;
}
