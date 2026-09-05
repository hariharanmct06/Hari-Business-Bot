import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'HARI BUSINESS BOT - Your AI Marketing Partner',
  description: 'Create advertisements, social media content, WhatsApp messages and marketing campaigns in seconds with HARI BUSINESS BOT.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#090d16] text-gray-100 antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
