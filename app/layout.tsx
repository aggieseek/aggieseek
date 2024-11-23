import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SessionWrapper from "@/components/session-wrapper";
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "AggieSeek",
  description: "Track courses at Texas A&M University and get notified when seats open. Add your courses and forget about them!",
  keywords: "aggieseek, aggie, seek, aggie seek, aggies"
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <SessionWrapper>
      <body
        className={ `${ inter.className } antialiased` }
      >
      { children }
      <SpeedInsights/>
      <Analytics/>
      </body>
    </SessionWrapper>
    </html>
  );
}
