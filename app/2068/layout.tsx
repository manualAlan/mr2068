import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alliance 2068 | Freedom to build",
  description: "We believe in the people who build Caprica. Discover the Alliance's beliefs, candidates and campaign for 2068.",
};

export default function Campaign2068Layout({ children }: { children: React.ReactNode }) {
  return children;
}
