import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patrick Cutter for Chasmia 2068 | Build the next Chasmia",
  description: "Patrick Cutter’s Moderate Reform campaign for advanced industry, skilled work and stronger communities across Chasmia.",
  icons: {
    icon: [{ url: "/images/mr-logo.png?v=mr-chasmia-2068", type: "image/png" }],
    shortcut: "/images/mr-logo.png?v=mr-chasmia-2068",
    apple: "/images/mr-logo.png?v=mr-chasmia-2068",
  },
};

export default function ChasmiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
