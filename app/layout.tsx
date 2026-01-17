import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AppShell from "@/components/AppShell";
import { Analytics } from "@vercel/analytics/react"; // ✅ ADD THIS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bible Buddy",
  description: "Your guided Bible reading companion",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BibleBuddy",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: "Bible Buddy – Free Bible Study App",
    description: "Read and understand the Bible with guided reading plans, highlights, and study tools.",
    type: "website",
    url: "https://mybiblebuddy.net",
    images: [
      {
        url: "https://mybiblebuddy.net/banner.png",
        width: 1200,
        height: 630,
        alt: "Bible Buddy – Free Bible Study App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Buddy – Free Bible Study App",
    description: "Read and understand the Bible with guided reading plans, highlights, and study tools.",
    images: ["https://mybiblebuddy.net/banner.png"],
  },
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3367331224607676"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Your full app shell */}
        <AppShell>{children}</AppShell>

        {/* ✅ VERCEL ANALYTICS */}
        <Analytics />
      </body>
    </html>
  );
}
