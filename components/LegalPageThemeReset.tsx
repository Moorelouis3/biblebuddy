"use client";

import { useEffect, useLayoutEffect } from "react";

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const PUBLIC_LIGHT_THEME = {
  background: "#F5F7FA",
  surface: "#FFFFFF",
  surfaceSoft: "#F3F4F6",
  card: "#FFFFFF",
  cardBorder: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6B7280",
  accent: "#7BAFD4",
  accentSoft: "#EAF5FF",
  button: "#7BAFD4",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#2563EB",
  navInactive: "#6B7280",
  progressTrack: "#E5E7EB",
  progressFill: "#7BAFD4",
};

export default function LegalPageThemeReset() {
  useBrowserLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const previousTheme = root.dataset.bbTheme;
    const previousRootBackground = root.style.backgroundColor;
    const previousBodyBackground = body.style.backgroundColor;
    const previousBackground = root.style.getPropertyValue("--background");
    const previousRootBackgroundImage = root.style.backgroundImage;
    const previousBodyBackgroundImage = body.style.backgroundImage;
    const previousTokens = Object.fromEntries(
      Object.keys(PUBLIC_LIGHT_THEME).map((token) => {
        const cssName = `--bb-${token.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
        return [cssName, root.style.getPropertyValue(cssName)];
      }),
    );

    root.classList.add("bb-legal-page-active");
    body.classList.add("bb-legal-page-active");
    delete root.dataset.bbSkin;
    delete root.dataset.bbBasicSkin;
    root.dataset.bbTheme = "light";
    root.style.setProperty("--background", PUBLIC_LIGHT_THEME.background);
    Object.entries(PUBLIC_LIGHT_THEME).forEach(([token, value]) => {
      const cssName = `--bb-${token.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
      root.style.setProperty(cssName, value);
    });
    root.style.backgroundColor = PUBLIC_LIGHT_THEME.background;
    root.style.backgroundImage = "none";
    body.style.backgroundColor = PUBLIC_LIGHT_THEME.background;
    body.style.backgroundImage = "none";

    return () => {
      root.classList.remove("bb-legal-page-active");
      body.classList.remove("bb-legal-page-active");

      if (previousTheme) {
        root.dataset.bbTheme = previousTheme;
      } else {
        delete root.dataset.bbTheme;
      }

      root.style.setProperty("--background", previousBackground);
      Object.entries(previousTokens).forEach(([cssName, value]) => {
        root.style.setProperty(cssName, value);
      });
      root.style.backgroundColor = previousRootBackground;
      root.style.backgroundImage = previousRootBackgroundImage;
      body.style.backgroundColor = previousBodyBackground;
      body.style.backgroundImage = previousBodyBackgroundImage;
    };
  }, []);

  return null;
}
