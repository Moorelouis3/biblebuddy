import type { Metadata, Viewport } from "next";
import "./globals.css";

import AppShell from "@/components/AppShell";
import { SmokeDeleteEffect } from "@/components/SmokeDeleteEffect";
import { PostSuccessEffect } from "@/components/PostSuccessEffect";
import { AppToast } from "@/components/AppToast";
import { PointsPop } from "@/components/PointsPop";
import GlobalCreditFeedback from "@/components/GlobalCreditFeedback";
import { Analytics } from "@vercel/analytics/react"; // ✅ ADD THIS
// redeploy trigger

export const metadata: Metadata = {
  title: "Bible Buddy",
  description: "Your guided Bible reading companion",
  icons: {
    icon: "/louis/newiconlouis.png",
    apple: "/louis/newiconlouis.png",
    shortcut: "/louis/newiconlouis.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BibleBuddy",
  },
  openGraph: {
    title: "Bible Buddy – Free Bible Study App",
    description: "Read and understand the Bible with guided reading plans, highlights, and study tools.",
    type: "website",
    url: "https://mybiblebuddy.net",
    images: [
      {
        url: "https://mybiblebuddy.net/updatebanner2026.png",
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
    images: ["https://mybiblebuddy.net/updatebanner2026.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
        className="antialiased bg-gray-50"
        suppressHydrationWarning
      >
        {/* Responsive bottom padding for banner - applied to main content */}
        <div className="flex flex-col min-h-screen w-full">
          <div className="flex-1 w-full">
            <AppShell>{children}</AppShell>
          </div>
        </div>
        <SmokeDeleteEffect />
        <PostSuccessEffect />
        <AppToast />
        <PointsPop />
        <GlobalCreditFeedback />
        {/* ✅ VERCEL ANALYTICS */}
        <Analytics />
      </body>
    </html>
  );
}
