import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alistair for Ambrosia 2068 | A future you can build here",
  description: "Alistair Foulke-McKeon’s People’s Party campaign for clean water, strong farms and a future young Ambrosians can choose.",
  icons: {
    icon: [{ url: "/images/pp-logo.png?v=pp-ambrosia-2068", type: "image/png" }],
    shortcut: "/images/pp-logo.png?v=pp-ambrosia-2068",
    apple: "/images/pp-logo.png?v=pp-ambrosia-2068",
  },
};

export default function AmbrosiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
