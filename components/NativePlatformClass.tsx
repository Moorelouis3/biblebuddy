"use client";

import { useEffect } from "react";
import { isNativeApp } from "@/lib/nativeApp";

/**
 * Marks the document as running inside the iOS/Android shell (Louis,
 * 2026-10-13).
 *
 * Everything about the safe area hangs off this one class. Doing it per page
 * did not work: the shell header paid the top inset, and every page that
 * renders without the shell - the blog, articles, onboarding, anything with
 * shouldHideShellChrome - paid nothing, so headings and close buttons sat
 * under the clock and the battery. See globals.css for the rules.
 *
 * It is a class on <html> rather than a media query because there is no CSS
 * way to ask "am I in the app": env(safe-area-inset-top) is non-zero on a
 * notched phone in Safari too, and the website must keep its normal layout
 * there.
 */
export default function NativePlatformClass() {
  useEffect(() => {
    if (!isNativeApp()) return;
    const root = document.documentElement;
    root.classList.add("bb-native");
    return () => {
      root.classList.remove("bb-native");
    };
  }, []);

  return null;
}
