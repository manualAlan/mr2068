import type { Metadata } from "next";
import BeliefPage from "../BeliefPage";

export const metadata: Metadata = {
  title: "Strong beginnings. Open futures | Alliance 2068",
  description: "The Alliance plan for strong school foundations, practical skills, independent research and education funding judged by results.",
};

export default function Page() {
  return <BeliefPage slug="education" />;
}
