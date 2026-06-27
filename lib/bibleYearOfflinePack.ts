export const BIBLE_YEAR_OFFLINE_TEXT_PACK_KEY = "bb:bible-year-offline-text-pack";
export const BIBLE_YEAR_OFFLINE_WIFI_ONLY_KEY = "bb:bible-year-offline-wifi-only";

export function cacheBibleYearOfflineTextPack() {
  return null;
}

export function clearLegacyBibleYearOfflineStorage() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(BIBLE_YEAR_OFFLINE_TEXT_PACK_KEY);
    window.localStorage.removeItem(BIBLE_YEAR_OFFLINE_WIFI_ONLY_KEY);
  } catch {
    // Ignore storage cleanup issues.
  }
}
