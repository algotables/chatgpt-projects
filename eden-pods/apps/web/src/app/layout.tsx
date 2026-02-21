import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eden Pods',
  description: 'Throw-and-grow food forest tracker.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="mx-auto min-h-screen max-w-md p-3">{children}</body>
    </html>
  );
}
