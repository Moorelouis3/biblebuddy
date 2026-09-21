"use client";

import { useEffect } from "react";
import { isNativeApp } from "@/lib/nativeApp";

const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3367331224607676";

// Loads Google AdSense on every web page. Skipped inside the native (App
// Store / Play Store) apps, which are ad-free. Moved out of <head> in
// app/layout.tsx on 2026-09-21 so the layout can stay static.
export default function AdSenseScript() {
  useEffect(() => {
    if (isNativeApp()) return;
    if (document.querySelector(`script[src="${ADSENSE_SRC}"]`)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = ADSENSE_SRC;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
}
