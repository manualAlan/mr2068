import type { Metadata } from "next";
import BeliefPage from "../BeliefPage";

export const metadata: Metadata = { title: "A place to call yours | Alliance 2068" };

export default function Page() {
  return <BeliefPage slug="housing" />;
}
