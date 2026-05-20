import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atmosphere – Your Digital Identity',
  description:
    'Build a powerful profile page that works as your personal website, storefront, and content hub.',
  openGraph: {
    title: 'Atmosphere',
    description: 'Your digital identity, amplified.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' },
          }}
        />
      </body>
    </html>
  );
}
