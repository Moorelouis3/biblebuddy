"use client";

import { useCallback, useEffect, useRef } from "react";
import { isNativeApp } from "@/lib/nativeApp";

/**
 * Reload the app when the website it is showing has moved on without it.
 *
 * The store app is a WKWebView pointed at mybiblebuddy.net. A deploy is
 * supposed to arrive the moment it lands, and it does not: iOS caches the HTML
 * document, the cached document names the previous build's JavaScript, and
 * quitting the app does not clear it. On 2026-10-17 that cost most of a day -
 * two fixes shipped, neither reached the phone, and nothing on the phone could
 * say why.
 *
 * NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA is baked into this bundle when it is
 * built, so a stale bundle carries a stale value. /api/build-id says what is
 * actually live. When they disagree the bundle is old, and a reload with a
 * cache-busting parameter is the only thing that fixes it from in here.
 *
 * Native only. A browser refreshes itself and the stakes are lower.
 */

const CHECK_KEY = "bb:last-stale-reload";
/** Never twice in five minutes, whatever happens. A reload loop is worse. */
const RELOAD_COOLDOWN_MS = 5 * 60 * 1000;

export default function StaleBuildReloader() {
  const checking = useRef(false);

  const check = useCallback(async () => {
    if (!isNativeApp() || checking.current) return;
    const mine = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
    // Nothing to compare against (a local build, or the system variables are
    // not exposed): do nothing rather than guess.
    if (!mine) return;

    checking.current = true;
    try {
      const response = await fetch(`/api/build-id?t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return;
      const { id } = await response.json();
      if (!id || id === "dev" || id === mine) return;

      try {
        const last = Number(window.localStorage.getItem(CHECK_KEY) || 0);
        if (Date.now() - last < RELOAD_COOLDOWN_MS) return;
        window.localStorage.setItem(CHECK_KEY, String(Date.now()));
      } catch {
        // Blocked storage: one reload is still better than a stale app, and
        // the cooldown is the only thing lost.
      }

      // The query string is what makes iOS fetch the document again rather
      // than hand back the one it has.
      const url = new URL(window.location.href);
      url.searchParams.set("v", String(Date.now()));
      window.location.replace(url.toString());
    } catch {
      // Offline, or the route is not there yet. Leave the app alone.
    } finally {
      checking.current = false;
    }
  }, []);

  useEffect(() => {
    void check();
    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [check]);

  return null;
}
