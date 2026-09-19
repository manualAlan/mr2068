import type { Metadata } from 'next';
export const metadata: Metadata = {
 title: 'JB Stoner for Myrati 2068 | Our island. Our future.',
 description: 'Proud of Myrati. Open to tomorrow. JB Stoner’s Moderate Reform plan for island opportunity, stronger connections and a fair hearing for every community.',
 icons: { icon:'/images/mr-logo.png?v=myrati2068', shortcut:'/images/mr-logo.png?v=myrati2068' },
};
export default function MyratiLayout({children}:{children:React.ReactNode}) {return children;}
