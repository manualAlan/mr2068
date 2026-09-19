import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "David Cutter for Chasmia 2068 | Make it here. Build a life here.",
  description: "David Cutter’s Moderate Reform campaign for better work, room to build and a future close to home. Explore the Chasmia plan for 2068.",
  icons: {
    icon: [{ url: "/images/mr-logo.png?v=mr-chasmia-2068", type: "image/png" }],
    shortcut: "/images/mr-logo.png?v=mr-chasmia-2068",
    apple: "/images/mr-logo.png?v=mr-chasmia-2068",
  },
};

export default function ChasmiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
