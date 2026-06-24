import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PAULILY CMS Studio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
