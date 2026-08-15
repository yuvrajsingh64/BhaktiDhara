import type { Metadata } from 'next';
import { Anek_Devanagari, JetBrains_Mono, Familjen_Grotesk } from 'next/font/google';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';

// Anek Devanagari for display Hindi text
const anekDevanagari = Anek_Devanagari({
  subsets: ['devanagari', 'latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '700', '800'],
});

// JetBrains Mono for timestamps and labels
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

const familjenGrotesk = Familjen_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BhaktiDhara — an always-on devotional radio',
  description: 'Pull up a seat at BhaktiDhara: an always-on radio playing bhajans, aartis & mantras over an illustrated temple, with a live count of everyone listening.',
  authors: [{ name: 'BhaktiDhara' }],
  keywords: 'bhajans, aartis, mantras, devotional music, bhakti, kirtan, spiritual music, Indian devotional, radio',
  openGraph: {
    title: 'BhaktiDhara — an always-on devotional radio',
    description: 'Pull up a seat at BhaktiDhara: an always-on radio playing bhajans, aartis & mantras over an illustrated temple.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#2b1a12',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${anekDevanagari.variable} ${jetbrainsMono.variable} ${familjenGrotesk.variable}`}>
      <body className="bg-shade text-sand font-body antialiased">
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}
