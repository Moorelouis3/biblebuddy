"use client";

import {
  getPremiumSkin,
  normalizePremiumSkinId,
  PREMIUM_SKINS,
  type PremiumSkinId,
} from "./premiumSkins";

const CACHE_PREFIX = "bb:perf-cache:v1:";
const ACTIVE_IMAGE_CACHE = new Set<string>();

type CachedPayload<T> = {
  cachedAt: number;
  ttlMs: number;
  value: T;
};

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readPerformanceCache<T>(key: string): T | null {
  if (!canUseBrowserStorage()) return null;
  try {
    const raw = window.localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload<T>;
    if (!parsed || Date.now() - parsed.cachedAt > parsed.ttlMs) {
      window.localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
}

export function writePerformanceCache<T>(key: string, value: T, ttlMs = 1000 * 60 * 60 * 12) {
  if (!canUseBrowserStorage()) return;
  try {
    window.localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify({
      cachedAt: Date.now(),
      ttlMs,
      value,
    }));
  } catch {
    // Storage can be full on mobile. Cache misses are fine; app data still loads from Supabase.
  }
}

export function scheduleIdleWork(callback: () => void, timeout = 1500) {
  if (typeof window === "undefined") return;
  const idleCallback = window.requestIdleCallback;
  if (typeof idleCallback === "function") {
    idleCallback(callback, { timeout });
    return;
  }
  window.setTimeout(callback, Math.min(timeout, 500));
}

export function preloadImage(src: string | null | undefined, priority: "high" | "low" = "low") {
  if (!src || typeof window === "undefined" || ACTIVE_IMAGE_CACHE.has(src)) return;
  ACTIVE_IMAGE_CACHE.add(src);
  const image = new Image();
  image.decoding = "async";
  image.loading = priority === "high" ? "eager" : "lazy";
  image.src = src;
}

export function preloadActiveSkinAssets(skinId: PremiumSkinId | string | null | undefined) {
  const skin = getPremiumSkin(normalizePremiumSkinId(skinId));
  if (!skin) return;

  const prefersMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  preloadImage(prefersMobile ? skin.mobileBackgroundImage : skin.desktopBackgroundImage, "high");

  scheduleIdleWork(() => {
    preloadImage(skin.thumbnailImage, "low");
    preloadImage(prefersMobile ? skin.desktopBackgroundImage : skin.mobileBackgroundImage, "low");
  }, 2200);
}

export function preloadStoreSkinThumbnails() {
  scheduleIdleWork(() => {
    PREMIUM_SKINS.forEach((skin) => {
      preloadImage(skin.thumbnailImage, "low");
    });
  }, 900);
}

export function shouldReduceVisualEffects() {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = window.navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  const saveData = nav.connection?.saveData === true;
  const slowConnection = /2g/.test(nav.connection?.effectiveType || "");
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory <= 4;
  return reducedMotion || saveData || slowConnection || lowMemory;
}

export function syncPerformanceModeToDocument() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.bbPerfReduce = shouldReduceVisualEffects() ? "true" : "false";
  root.dataset.bbAppHidden = document.visibilityState === "hidden" ? "true" : "false";
}
