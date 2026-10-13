"use client";

import { useEffect } from "react";
import { isExternalUrl, isNativeApp, openExternal } from "@/lib/nativeApp";

// Inside the native app, links that leave Bible Buddy (and target=_blank links,
// which a WebView cannot open as a new tab) open in the system browser sheet
// instead of replacing the app. Does nothing on the web.
export default function NativeExternalLinks() {
  useEffect(() => {
    if (!isNativeApp()) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const rawHref = anchor.getAttribute("href") || "";
      if (/^(mailto|tel|sms):/i.test(rawHref.trim())) return;
      const href = anchor.href;
      if (!/^https?:/i.test(href)) return;
      if (isExternalUrl(href)) {
        event.preventDefault();
        openExternal(href);
        return;
      }
      // Same-site link that asks for a new tab: keep it inside the app.
      if (anchor.target === "_blank") {
        event.preventDefault();
        window.location.assign(href);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
