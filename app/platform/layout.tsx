import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What we believe | Alliance 2068",
  description: "Freedom, enterprise and a country that works. What the Alliance believes, and how we will put it into practice.",
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return children;
}
