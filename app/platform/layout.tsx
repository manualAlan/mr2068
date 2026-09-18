import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platforms | Alliance 2068",
  description: "The Liberal-Conservative Alliance platform for Caprica's 2068 election.",
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return children;
}
