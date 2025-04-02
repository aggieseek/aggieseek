import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SessionWrapper from "@/components/session-wrapper";
import { ReactNode } from "react";
import { satoshi } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";

const title = "AggieSeek";
const description =
  "Track courses at Texas A&M University and get notified when seats open. Add your courses and forget about them!";
export const metadata: Metadata = {
  metadataBase: new URL("https://aggieseek.net"),
  title,
  description,
  keywords:
    "aggieseek, aggie, seek, aggie seek, aggies, track, track course, track courses, track course availability, tracker, course tracker, aggie tracker, class tracker, tamu, tamu class tracker, tamu course, tamu course tracker",
  openGraph: {
    title,
    description,
    url: "https://aggieseek.net",
    images: [
      {
        url: "/images/og-image.png",
        secureUrl: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AggieSeek Banner",
      },
    ],
    type: "website",
    siteName: "AggieSeek",
  },
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
          <Toaster position="top-right" />
          <SpeedInsights />
          <Analytics />
        </body>
      </SessionWrapper>
    </html>
  );
}
