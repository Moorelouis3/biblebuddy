import type { Metadata, Viewport } from "next";
import "./globals.css";

import AppShell from "@/components/AppShell";
import { SmokeDeleteEffect } from "@/components/SmokeDeleteEffect";
import { PostSuccessEffect } from "@/components/PostSuccessEffect";
import { AppToast } from "@/components/AppToast";
import { PointsPop } from "@/components/PointsPop";
import GlobalCreditFeedback from "@/components/GlobalCreditFeedback";
import { Analytics } from "@vercel/analytics/react"; // ✅ ADD THIS
import { PREMIUM_SKIN_STORAGE_KEY, PREMIUM_SKINS } from "@/lib/premiumSkins";
// redeploy trigger

export const metadata: Metadata = {
  title: "Bible Buddy",
  description: "Your guided Bible reading companion",
  icons: {
    icon: "/newericon.png",
    apple: "/newericon.png",
    shortcut: "/newericon.png",
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

const premiumSkinFirstPaintPayload = Object.fromEntries(
  PREMIUM_SKINS.map((skin) => [
    skin.id,
    {
      desktopBackgroundImage: skin.desktopBackgroundImage,
      mobileBackgroundImage: skin.mobileBackgroundImage,
      palette: skin.palette,
    },
  ]),
);

const premiumSkinFirstPaintScript = `
(function () {
  try {
    var skins = ${JSON.stringify(premiumSkinFirstPaintPayload)};
    var skinId = window.localStorage && window.localStorage.getItem(${JSON.stringify(PREMIUM_SKIN_STORAGE_KEY)});
    var skin = skins[skinId];
    if (!skin) return;

    var root = document.documentElement;
    var style = root.style;
    var palette = skin.palette;
    var prefersMobile = window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
    var bg = prefersMobile ? skin.mobileBackgroundImage : skin.desktopBackgroundImage;
    var vars = {
      background: "--bb-background",
      surface: "--bb-surface",
      surfaceSoft: "--bb-surface-soft",
      card: "--bb-card",
      cardBorder: "--bb-card-border",
      textPrimary: "--bb-text-primary",
      textSecondary: "--bb-text-secondary",
      textMuted: "--bb-text-muted",
      accent: "--bb-accent",
      accentSoft: "--bb-accent-soft",
      button: "--bb-button",
      buttonText: "--bb-button-text",
      navBackground: "--bb-nav-background",
      navActive: "--bb-nav-active",
      navInactive: "--bb-nav-inactive",
      progressTrack: "--bb-progress-track",
      progressFill: "--bb-progress-fill"
    };

    root.dataset.bbSkin = skinId;
    root.dataset.bbTheme = window.localStorage.getItem("bb:app-theme") || "light";
    style.setProperty("--bb-skin-bg-image", 'url("' + bg + '")');
    style.setProperty("--bb-skin-bg-image-mobile", 'url("' + skin.mobileBackgroundImage + '")');
    style.setProperty("--bb-skin-bg-image-desktop", 'url("' + skin.desktopBackgroundImage + '")');

    Object.keys(vars).forEach(function (key) {
      style.setProperty(vars[key], palette[key]);
    });
    style.setProperty("--bb-reader-bg", palette.card);
    style.setProperty("--bb-reader-surface", palette.surface);
    style.setProperty("--bb-reader-border", palette.cardBorder);
    style.setProperty("--bb-reader-text", palette.textPrimary);
    style.setProperty("--bb-reader-secondary", palette.textSecondary);
    style.setProperty("--bb-reader-muted", palette.textMuted);
    style.setProperty("--background", palette.background);
    style.setProperty("--foreground", palette.textPrimary);

    var preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = bg;
    preload.fetchPriority = "high";
    document.head.appendChild(preload);
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          id="bb-premium-skin-first-paint"
          dangerouslySetInnerHTML={{ __html: premiumSkinFirstPaintScript }}
        />
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
