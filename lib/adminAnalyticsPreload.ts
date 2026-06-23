"use client";

export type AdminAnalyticsWindow = "today" | "yesterday" | "24h" | "7d" | "30d" | "90d" | "this_month" | "lifetime";

type CacheEntry<T> = {
  data: T | null;
  error: string | null;
  updatedAt: number;
  promise: Promise<T> | null;
};

const analyticsCache = new Map<AdminAnalyticsWindow, CacheEntry<unknown>>();
const overviewAnalyticsCache = new Map<AdminAnalyticsWindow, CacheEntry<unknown>>();
const CACHE_TTL_MS = 60 * 1000;

function getEntry(windowKey: AdminAnalyticsWindow, mode: "full" | "overview" = "full") {
  const cache = mode === "overview" ? overviewAnalyticsCache : analyticsCache;
  let entry = cache.get(windowKey);
  if (!entry) {
    entry = { data: null, error: null, updatedAt: 0, promise: null };
    cache.set(windowKey, entry);
  }
  return entry;
}

export function getCachedAdminAnalytics<T>(windowKey: AdminAnalyticsWindow) {
  const entry = analyticsCache.get(windowKey);
  return entry?.data ? (entry.data as T) : null;
}

export function getCachedAdminAnalyticsOverview<T>(windowKey: AdminAnalyticsWindow) {
  const entry = overviewAnalyticsCache.get(windowKey);
  return entry?.data ? (entry.data as T) : null;
}

export async function loadAdminAnalytics<T>(
  windowKey: AdminAnalyticsWindow,
  token: string,
  options: { force?: boolean; mode?: "full" | "overview" } = {},
) {
  const mode = options.mode || "full";
  const entry = getEntry(windowKey, mode);
  const isFresh = entry.data && Date.now() - entry.updatedAt < CACHE_TTL_MS;

  if (!options.force && isFresh) return entry.data as T;
  if (!options.force && entry.promise) return entry.promise as Promise<T>;

  const params = new URLSearchParams({ window: windowKey });
  if (mode === "overview") params.set("mode", "overview");
  const promise = fetch(`/api/admin/onboarding-analytics?${params.toString()}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (response) => {
      const json = (await response.json()) as T & { error?: string };
      if (!response.ok) throw new Error(json.error || "Could not load analytics.");
      entry.data = json;
      entry.error = null;
      entry.updatedAt = Date.now();
      return json;
    })
    .catch((error) => {
      entry.error = error instanceof Error ? error.message : "Could not load analytics.";
      throw error;
    })
    .finally(() => {
      if (entry.promise === promise) entry.promise = null;
    });

  entry.promise = promise;
  return promise;
}

export function preloadAdminAnalytics(windowKey: AdminAnalyticsWindow, token: string) {
  return loadAdminAnalytics(windowKey, token).catch(() => null);
}
