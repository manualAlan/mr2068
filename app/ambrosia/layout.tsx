import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alistair for Ambrosia 2068 | A future you can build here",
  description: "Alistair Foulke-McKeon’s Moderate Reform campaign for clean water, strong farms and a future young Ambrosians can choose.",
  icons: {
    icon: [{ url: "/images/mr-logo.png?v=mr-ambrosia-2068", type: "image/png" }],
    shortcut: "/images/mr-logo.png?v=mr-ambrosia-2068",
    apple: "/images/mr-logo.png?v=mr-ambrosia-2068",
  },
};

export default function AmbrosiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
