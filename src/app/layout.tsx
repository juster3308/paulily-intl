import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PAULILY — Crafted for the Discerning',
  description: 'Where Eastern artistry meets uncompromising quality. PAULILY — premium bag manufacturer for wholesale and B2B partners worldwide.',
  keywords: 'PAULILY, luxury bags, wholesale bags, B2B bags, Chinese craftsmanship, premium leather bags, bag manufacturer',
  openGraph: {
    title: 'PAULILY — Crafted for the Discerning',
    description: 'Where Eastern artistry meets uncompromising quality.',
    url: 'https://paulily.com',
    siteName: 'PAULILY',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-p-black bg-p-pure-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}