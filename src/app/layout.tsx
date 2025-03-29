import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SessionWrapper from "@/components/session-wrapper";
import { ReactNode } from "react";
import { satoshi } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AggieSeek",
  description:
    "Track courses at Texas A&M University and get notified when seats open. Add your courses and forget about them!",
  keywords: "aggieseek, aggie, seek, aggie seek, aggies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${satoshi.className} antialiased`}>
          {children}
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </body>
      </SessionWrapper>
    </html>
  );
}
