import type { Metadata, Viewport } from "next";
import "./globals.css";

import AppShell from "@/components/AppShell";
import { SmokeDeleteEffect } from "@/components/SmokeDeleteEffect";
import { PostSuccessEffect } from "@/components/PostSuccessEffect";
import { AppToast } from "@/components/AppToast";
import { PointsPop } from "@/components/PointsPop";
import GlobalCreditFeedback from "@/components/GlobalCreditFeedback";
import { GlobalAudioPlayerProvider } from "@/components/GlobalAudioPlayer";
import { Analytics } from "@vercel/analytics/react"; // ✅ ADD THIS
// redeploy trigger

const siteUrl = new URL("https://www.mybiblebuddy.net");
const socialPreviewImage = new URL("/NewNewNewBanner.png", siteUrl).toString();
const socialTitle = "Bible Buddy, making Bible study easier...";
const socialDescription = "Bible Buddy, making Bible study easier...";
const socialImageAlt = "Bible Buddy, making Bible study easier...";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: socialTitle,
  description: socialDescription,
  alternates: {
    canonical: siteUrl.toString(),
  },
  icons: {
    icon: "/TherealiconforBB.png",
    apple: "/TherealiconforBB.png",
    shortcut: "/TherealiconforBB.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BibleBuddy",
  },
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    type: "website",
    url: siteUrl.toString(),
    siteName: "Bible Buddy",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialPreviewImage],
  },
  other: {
    "og:image:secure_url": socialPreviewImage,
    "twitter:image:alt": socialImageAlt,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#061322",
};

const appThemeFirstPaintScript = `
(function () {
  try {
    var themeId = window.localStorage.getItem("bb:app-theme") === "dark" ? "dark" : "light";
    var palettes = {
      light: {
        background: "#F7FAFC", surface: "#FFFFFF", surfaceSoft: "#EEF4F8", card: "#FFFFFF", cardBorder: "#D8E3EC",
        textPrimary: "#101827", textSecondary: "#334155", textMuted: "#64748B", accent: "#2F7FE8", accentSoft: "#E6F1FF",
        button: "#2F7FE8", buttonText: "#FFFFFF", navBackground: "#FFFFFF", navActive: "#2F7FE8", navInactive: "#64748B",
        progressTrack: "#D8E3EC", progressFill: "#2F7FE8"
      },
      dark: {
        background: "#07111F", surface: "#0D1826", surfaceSoft: "#132234", card: "#0F1C2B", cardBorder: "#23344A",
        textPrimary: "#F8FAFC", textSecondary: "#CBD5E1", textMuted: "#94A3B8", accent: "#5DD6FF", accentSoft: "#123348",
        button: "#5DD6FF", buttonText: "#06101D", navBackground: "#0B1725", navActive: "#5DD6FF", navInactive: "#94A3B8",
        progressTrack: "#26364B", progressFill: "#5DD6FF"
      }
    };
    var root = document.documentElement;
    var style = root.style;
    var palette = palettes[themeId];
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

    root.dataset.bbTheme = themeId;
    delete root.dataset.bbSkin;
    delete root.dataset.bbBasicSkin;

    try {
      Object.keys(window.localStorage).forEach(function (key) {
        if (/skin|basic-skin|premium-skin/i.test(key)) {
          window.localStorage.removeItem(key);
        }
      });
    } catch (storageError) {}

    Object.keys(vars).forEach(function (key) {
      style.setProperty(vars[key], palette[key]);
    });
    style.removeProperty("--bb-skin-bg-image");
    style.removeProperty("--bb-skin-bg-image-mobile");
    style.removeProperty("--bb-skin-bg-image-desktop");
    style.removeProperty("--bb-skin-glow");
    style.removeProperty("--bb-skin-warm-glow");
    style.setProperty("--bb-reader-bg", palette.card);
    style.setProperty("--bb-reader-surface", palette.surface);
    style.setProperty("--bb-reader-border", palette.cardBorder);
    style.setProperty("--bb-reader-text", palette.textPrimary);
    style.setProperty("--bb-reader-secondary", palette.textSecondary);
    style.setProperty("--bb-reader-muted", palette.textMuted);
    style.setProperty("--background", palette.background);
    style.setProperty("--foreground", palette.textPrimary);
    root.style.backgroundColor = palette.background;
    if (document.body) document.body.style.backgroundColor = palette.background;
    var themeMeta = document.querySelector('meta[name="theme-color"]') || document.createElement("meta");
    themeMeta.setAttribute("name", "theme-color");
    themeMeta.setAttribute("content", palette.background);
    if (!themeMeta.parentNode) document.head.appendChild(themeMeta);
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: appThemeFirstPaintScript }}
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
            <GlobalAudioPlayerProvider>
              <AppShell>{children}</AppShell>
            </GlobalAudioPlayerProvider>
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
