import type { Metadata } from "next";
import "./globals.css";
import "./campaign-2068.css";

export const metadata: Metadata = {
  title: "Alliance 2068 | Freedom to build",
  description: "A home of your own. Room for a good idea. The Alliance believes in a free, enterprising and confident Caprica.",
  icons: {
    icon: [{ url: "/images/lca-logo.svg?v=lca-2068", type: "image/svg+xml" }],
    shortcut: "/images/lca-logo.svg?v=lca-2068",
    apple: "/images/lca-logo.svg?v=lca-2068",
  },
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
