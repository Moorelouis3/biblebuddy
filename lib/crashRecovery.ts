"use client";

import { supabase } from "./supabaseClient";

/**
 * Shared by app/error.tsx and app/global-error.tsx.
 *
 * The most common crash after a deploy is a stale page asking for a code
 * chunk that no longer exists. A reload fixes it, so we do that silently
 * once, and only show the error screen if it happens again right after.
 */

const RELOAD_KEY = "bb-crash-auto-reload-at";

export function isStaleChunkError(error: Error) {
  const text = `${error?.name || ""} ${error?.message || ""}`;
  return /ChunkLoadError|Loading chunk|Loading CSS chunk|Failed to load chunk|dynamically imported module|Importing a module script failed|error loading dynamically/i.test(
    text,
  );
}

/** True when we reloaded for the caller (so it should render nothing). */
export function tryAutoReload(error: Error) {
  if (!isStaleChunkError(error)) return false;
  try {
    const last = Number(window.sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 60_000) return false;
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

export async function reportCrash(error: Error & { digest?: string }, boundary: "page" | "global", autoReloaded = false) {
  try {
    let token = "";
    try {
      token = (await supabase.auth.getSession()).data.session?.access_token || "";
    } catch {
      // Signed out or storage blocked - report anonymously.
    }
    await fetch("/api/bug-reports/crash", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
        digest: error?.digest,
        page: window.location.pathname + window.location.search,
        boundary,
        autoReloaded,
      }),
      keepalive: true,
    });
  } catch {
    // Reporting must never make a crash worse.
  }
}
