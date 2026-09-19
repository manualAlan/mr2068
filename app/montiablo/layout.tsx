import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Jon Fraser for Montiablo 2068 | A capital that gives you more',
  description: 'Jon Fraser’s People’s Party plan for a connected, enterprising Montiablo. One network, room to build and government that answers to you.',
  icons: { icon: '/images/pp-logo.png?v=montiablo2068', shortcut: '/images/pp-logo.png?v=montiablo2068' },
};
export default function MontiabloLayout({children}: {children: React.ReactNode}) { return children; }
