import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alpex.sk";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ALPEX Autoservis Bratislava | Pneuservis, diagnostika a STK",
    template: "%s | ALPEX Autoservis Bratislava",
  },
  description:
    "Profesionálny autoservis ALPEX Group v Bratislave. Mechanické práce, pneuservis, elektrikárske opravy, diagnostika a spoľahlivá príprava vozidla na STK.",
  applicationName: "ALPEX Autoservis",
  keywords: [
    "autoservis Bratislava",
    "ALPEX autoservis",
    "pneuservis Bratislava",
    "diagnostika vozidiel",
    "príprava na STK",
    "mechanické práce",
    "elektrikárske práce auto",
    "Hrdličkova Bratislava",
  ],
  authors: [{ name: "ALPEX Group s. r. o." }],
  creator: "AEB Digital",
  publisher: "ALPEX Group s. r. o.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "/",
    siteName: "ALPEX Autoservis Bratislava",
    title: "ALPEX Autoservis Bratislava | Pneuservis, diagnostika a STK",
    description:
      "Autoservis v Bratislave s viac ako 20 rokmi skúseností. Mechanické práce, pneuservis, elektrikárske opravy a príprava na STK.",
    images: [
      {
        url: "/images/exterior-premio-doors.jpg",
        width: 1200,
        height: 630,
        alt: "Prevádzka ALPEX Group v Bratislave",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALPEX Autoservis Bratislava | Pneuservis, diagnostika a STK",
    description:
      "Mechanické práce, pneuservis, elektrikárske opravy a príprava na STK v Bratislave.",
    images: ["/images/exterior-premio-doors.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
