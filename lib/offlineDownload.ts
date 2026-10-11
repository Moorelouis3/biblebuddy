/**
 * "Save this for offline" (Louis, 2026-10-11).
 *
 * public/service-worker.js has handled a CACHE_BIBLE_YEAR_OFFLINE message
 * since September - it opens the runtime and media caches and adds whatever
 * URLs it is given. Nothing in the app has ever sent that message. The
 * feature was built on one side only and has been dead code since.
 *
 * This is the other side. Pages you have already visited are cached
 * automatically by the worker's network-first strategy; this is for the
 * deliberate act of taking a day's reading and its audio onto the plane with
 * you before you leave the house.
 *
 * Audio matters most here. A Bible in One Year day is twenty minutes of mp3,
 * and streaming that on a commute is exactly when the connection is worst.
 */

type OfflineBundle = {
  /** Pages and API responses: the day's reading, its notes. */
  urls?: string[];
  /** Audio and video. Cached separately so it can be cleared on its own. */
  mediaUrls?: string[];
};

/** Whether the worker is there to talk to. */
export async function offlineDownloadAvailable(): Promise<boolean> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return false;
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    return Boolean(registration?.active);
  } catch {
    return false;
  }
}

/**
 * Hand a bundle to the service worker to cache.
 *
 * Resolves as soon as the worker has been told, NOT when the download
 * finishes - postMessage is one-way. The worker does the fetching inside
 * event.waitUntil, so it keeps going after the page navigates away, which is
 * the behaviour you want for twenty minutes of audio.
 *
 * Returns false when there is no worker to ask, so the caller can leave the
 * button out rather than showing one that does nothing.
 */
export async function downloadForOffline(bundle: OfflineBundle): Promise<boolean> {
  const urls = (bundle.urls ?? []).filter(Boolean);
  const mediaUrls = (bundle.mediaUrls ?? []).filter(Boolean);
  if (!urls.length && !mediaUrls.length) return false;

  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return false;
  try {
    // `ready` rather than `controller`: on the very first visit the worker is
    // installed but not yet controlling the page, and controller is null.
    const registration = await navigator.serviceWorker.ready;
    const worker = registration.active;
    if (!worker) return false;
    worker.postMessage({ type: "CACHE_BIBLE_YEAR_OFFLINE", urls, mediaUrls });
    return true;
  } catch (error) {
    console.warn("[OFFLINE] could not start download:", error);
    return false;
  }
}

/**
 * Drop everything saved for offline.
 *
 * Clears the media cache only - the pages you have read stay, because those
 * cost almost nothing and losing them would make the app feel broken on a
 * bad connection. This is the "free up space" action.
 */
export async function clearOfflineDownloads(): Promise<boolean> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return false;
  try {
    const registration = await navigator.serviceWorker.ready;
    const worker = registration.active;
    if (!worker) return false;
    worker.postMessage({ type: "CLEAR_BIBLE_YEAR_OFFLINE" });
    return true;
  } catch {
    return false;
  }
}

/** Roughly how much has been saved, for a "free up space" line in settings. */
export async function offlineDownloadSizeMb(): Promise<number | null> {
  if (typeof caches === "undefined") return null;
  try {
    const keys = await caches.keys();
    let bytes = 0;
    for (const key of keys.filter((k) => k.startsWith("biblebuddy-media-"))) {
      const cache = await caches.open(key);
      for (const request of await cache.keys()) {
        const response = await cache.match(request);
        const length = response?.headers.get("content-length");
        if (length) bytes += Number(length) || 0;
      }
    }
    return Math.round((bytes / (1024 * 1024)) * 10) / 10;
  } catch {
    return null;
  }
}
