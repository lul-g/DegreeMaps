import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/app/globals.css';
import { Providers } from './providers';
import QueryWrapper from './QueryWrapper';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/b6798fcdf3.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <QueryWrapper>
          <Providers>{children}</Providers>
        </QueryWrapper>
      </body>
    </html>
  );
}
