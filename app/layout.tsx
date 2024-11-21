import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "AggieSeek",
  description: "Track courses at Texas A&M University and get notified when seats open. Add your courses and forget about them!",
  keywords: "aggieseek, aggie, seek, aggie seek, aggies"
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={ `${ inter.className } antialiased` }
    >
    { children }
    <SpeedInsights/>
    <Analytics/>
    </body>
    </html>
  );
}
