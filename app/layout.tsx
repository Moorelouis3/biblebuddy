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
import { PREMIUM_SKINS } from "@/lib/premiumSkins";
import { FLAME_COSMETIC_BY_ID, PREMIUM_SKIN_FLAME_BY_ID } from "@/lib/flameCosmetics";
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
    icon: "/newericon.png",
    apple: "/newericon.png",
    shortcut: "/newericon.png",
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

const premiumSkinFirstPaintPayload = Object.fromEntries(
  PREMIUM_SKINS.map((skin) => [
    skin.id,
    {
      desktopBackgroundImage: skin.desktopBackgroundImage,
      mobileBackgroundImage: skin.mobileBackgroundImage,
      hasImageBackground: skin.hasImageBackground !== false,
      palette: skin.palette,
    },
  ]),
);

const premiumSkinFirstPaintFlames = PREMIUM_SKIN_FLAME_BY_ID;
const premiumSkinFirstPaintFlameColors = Object.fromEntries(FLAME_COSMETIC_BY_ID.entries());

const premiumSkinFirstPaintScript = `
(function () {
  try {
    var skins = ${JSON.stringify(premiumSkinFirstPaintPayload)};
    var skinFlames = ${JSON.stringify(premiumSkinFirstPaintFlames)};
    var flameColors = ${JSON.stringify(premiumSkinFirstPaintFlameColors)};
    var skinId = window.localStorage.getItem("bb:premium-skin");
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
    if (skinFlames[skinId]) {
      var flameId = skinFlames[skinId];
      var flame = flameColors[flameId];
      window.localStorage.setItem("bb:active-streak-flame", flameId);
      if (flame) {
        window.localStorage.setItem("bb:active-streak-flame-colors", JSON.stringify(flame));
        root.dataset.bbStreakFlame = flameId;
        style.setProperty("--bb-active-flame-light", flame.light);
        style.setProperty("--bb-active-flame-main", flame.main);
        style.setProperty("--bb-active-flame-dark", flame.dark);
      }
    }
    if (skin.hasImageBackground === false) {
      style.setProperty("--bb-skin-bg-image", "none");
      style.setProperty("--bb-skin-bg-image-mobile", "none");
      style.setProperty("--bb-skin-bg-image-desktop", "none");
    } else {
      style.setProperty("--bb-skin-bg-image", 'url("' + bg + '")');
      style.setProperty("--bb-skin-bg-image-mobile", 'url("' + skin.mobileBackgroundImage + '")');
      style.setProperty("--bb-skin-bg-image-desktop", 'url("' + skin.desktopBackgroundImage + '")');
    }

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
    root.style.backgroundColor = palette.background;
    if (document.body) document.body.style.backgroundColor = palette.background;
    var themeMeta = document.querySelector('meta[name="theme-color"]') || document.createElement("meta");
    themeMeta.setAttribute("name", "theme-color");
    themeMeta.setAttribute("content", palette.background);
    if (!themeMeta.parentNode) document.head.appendChild(themeMeta);

    if (skin.hasImageBackground !== false) {
      var preload = document.createElement("link");
      preload.rel = "preload";
      preload.as = "image";
      preload.href = bg;
      preload.fetchPriority = "high";
      document.head.appendChild(preload);
    }
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
