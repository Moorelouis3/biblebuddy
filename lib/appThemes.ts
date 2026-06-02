export type AppThemeId = "light" | "dark";

export type AppThemeTokens = {
  background: string;
  surface: string;
  surfaceSoft: string;
  card: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  button: string;
  buttonText: string;
  navBackground: string;
  navActive: string;
  navInactive: string;
  progressTrack: string;
  progressFill: string;
};

export type AppTheme = AppThemeTokens & {
  id: AppThemeId;
  name: string;
  isLocked: false;
  unlockRequirement: null;
};

export const lightTheme: AppTheme = {
  id: "light",
  name: "Light",
  isLocked: false,
  unlockRequirement: null,
  background: "#F7FAFC",
  surface: "#FFFFFF",
  surfaceSoft: "#EEF4F8",
  card: "#FFFFFF",
  cardBorder: "#D8E3EC",
  textPrimary: "#101827",
  textSecondary: "#334155",
  textMuted: "#64748B",
  accent: "#0056FD",
  accentSoft: "#EAF2FF",
  button: "#0056FD",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#0056FD",
  navInactive: "#64748B",
  progressTrack: "#D8E3EC",
  progressFill: "#0056FD",
};

export const darkTheme: AppTheme = {
  id: "dark",
  name: "Dark",
  isLocked: false,
  unlockRequirement: null,
  background: "#07111F",
  surface: "#0D1826",
  surfaceSoft: "#132234",
  card: "#0F1C2B",
  cardBorder: "#23344A",
  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  accent: "#5DD6FF",
  accentSoft: "#123348",
  button: "#5DD6FF",
  buttonText: "#06101D",
  navBackground: "#0B1725",
  navActive: "#5DD6FF",
  navInactive: "#94A3B8",
  progressTrack: "#26364B",
  progressFill: "#5DD6FF",
};

export const APP_THEMES: AppTheme[] = [lightTheme, darkTheme];
export const APP_THEME_BY_ID = new Map(APP_THEMES.map((theme) => [theme.id, theme]));
export const APP_THEME_STORAGE_KEY = "bb:app-theme";
export const APP_THEME_STORAGE_TIMESTAMP_KEY = "bb:app-theme-updated-at";
export const APP_THEME_PENDING_SYNC_KEY = "bb:app-theme-pending-sync";
export const APP_THEME_PENDING_SYNC_MS = 90 * 1000;

export function normalizeAppThemeId(value: unknown): AppThemeId {
  return value === "dark" ? "dark" : "light";
}

export function getAppTheme(value: unknown): AppTheme {
  return APP_THEME_BY_ID.get(normalizeAppThemeId(value)) ?? lightTheme;
}

export function getAppThemeStorageKey(userId: string | null | undefined) {
  return userId ? `${APP_THEME_STORAGE_KEY}:${userId}` : APP_THEME_STORAGE_KEY;
}

export function getAppThemeStorageTimestampKey(userId: string | null | undefined) {
  return userId ? `${APP_THEME_STORAGE_TIMESTAMP_KEY}:${userId}` : APP_THEME_STORAGE_TIMESTAMP_KEY;
}

export function getAppThemePendingSyncKey(userId: string | null | undefined) {
  return userId ? `${APP_THEME_PENDING_SYNC_KEY}:${userId}` : APP_THEME_PENDING_SYNC_KEY;
}

export function readCachedAppTheme(userId: string | null | undefined): AppThemeId {
  if (typeof window === "undefined") return "light";
  return normalizeAppThemeId(
    (userId ? window.localStorage.getItem(getAppThemeStorageKey(userId)) : null) ||
      window.localStorage.getItem(APP_THEME_STORAGE_KEY),
  );
}

export function readCachedAppThemeUpdatedAtMs(userId: string | null | undefined) {
  if (typeof window === "undefined") return 0;
  const raw =
    (userId ? window.localStorage.getItem(getAppThemeStorageTimestampKey(userId)) : null) ||
    window.localStorage.getItem(APP_THEME_STORAGE_TIMESTAMP_KEY);
  const updatedAt = Number(raw);
  return Number.isFinite(updatedAt) ? updatedAt : 0;
}

export function readPendingAppThemeSync(userId: string | null | undefined) {
  if (typeof window === "undefined" || !userId) return null;
  const raw = window.localStorage.getItem(getAppThemePendingSyncKey(userId));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { themeId?: unknown; startedAt?: unknown };
    const themeId = normalizeAppThemeId(parsed.themeId);
    const startedAt = Number(parsed.startedAt);
    if (!Number.isFinite(startedAt)) return null;
    if (Date.now() - startedAt > APP_THEME_PENDING_SYNC_MS) {
      window.localStorage.removeItem(getAppThemePendingSyncKey(userId));
      return null;
    }
    return { themeId, startedAt };
  } catch {
    window.localStorage.removeItem(getAppThemePendingSyncKey(userId));
    return null;
  }
}

export function shouldPreferCachedAppTheme(userId: string | null | undefined, authoritativeThemeId: AppThemeId) {
  if (typeof window === "undefined" || !userId) return false;
  const cachedThemeId = readCachedAppTheme(userId);
  if (cachedThemeId === authoritativeThemeId) return false;
  const pendingSync = readPendingAppThemeSync(userId);
  return Boolean(pendingSync && pendingSync.themeId === cachedThemeId);
}

export function cacheAppThemeForUser(userId: string | null | undefined, themeId: AppThemeId, options: { markSelected?: boolean } = {}) {
  if (typeof window === "undefined") return;
  const normalizedThemeId = normalizeAppThemeId(themeId);
  if (userId) window.localStorage.setItem(getAppThemeStorageKey(userId), normalizedThemeId);
  window.localStorage.setItem(APP_THEME_STORAGE_KEY, normalizedThemeId);
  if (options.markSelected) {
    const updatedAt = String(Date.now());
    if (userId) window.localStorage.setItem(getAppThemeStorageTimestampKey(userId), updatedAt);
    window.localStorage.setItem(APP_THEME_STORAGE_TIMESTAMP_KEY, updatedAt);
    if (userId) {
      window.localStorage.setItem(getAppThemePendingSyncKey(userId), JSON.stringify({ themeId: normalizedThemeId, startedAt: Number(updatedAt) }));
    }
  }
}

export function isIncomingAppThemeOlderThanCache(userId: string | null | undefined, selectedAt: string | null | undefined) {
  if (typeof window === "undefined" || !userId || !selectedAt) return false;
  const pendingSync = readPendingAppThemeSync(userId);
  if (!pendingSync) return false;
  const incomingSelectedAtMs = Date.parse(selectedAt);
  if (!Number.isFinite(incomingSelectedAtMs)) return false;
  const cachedUpdatedAtMs = readCachedAppThemeUpdatedAtMs(userId);
  return cachedUpdatedAtMs > incomingSelectedAtMs;
}

export function clearPendingAppThemeSync(userId: string | null | undefined, themeId?: AppThemeId) {
  if (typeof window === "undefined" || !userId) return;
  const pendingSync = readPendingAppThemeSync(userId);
  if (!themeId || pendingSync?.themeId === themeId) {
    window.localStorage.removeItem(getAppThemePendingSyncKey(userId));
  }
}

export function applyAppThemeToDocument(themeId: AppThemeId) {
  if (typeof document === "undefined") return;
  const theme = getAppTheme(themeId);
  const root = document.documentElement;
  root.dataset.bbTheme = theme.id;
  delete root.dataset.bbSkin;
  delete root.dataset.bbBasicSkin;
  if (typeof window !== "undefined") {
    try {
      Object.keys(window.localStorage).forEach((key) => {
        if (/skin|basic-skin|premium-skin/i.test(key)) {
          window.localStorage.removeItem(key);
        }
      });
    } catch {}
  }

  const variableMap: Record<keyof AppThemeTokens, string> = {
    background: "--bb-background",
    surface: "--bb-surface",
    surfaceSoft: "--bb-surface-soft",
    card: "--bb-card",
    cardBorder: "--bb-card-border",
    textPrimary: "--bb-text-primary",
    textSecondary: "--bb-text-secondary",
    textMuted: "--bb-text-muted",
    accent: "--bb-accent",
    accentSoft: "--bb-accent-soft",
    button: "--bb-button",
    buttonText: "--bb-button-text",
    navBackground: "--bb-nav-background",
    navActive: "--bb-nav-active",
    navInactive: "--bb-nav-inactive",
    progressTrack: "--bb-progress-track",
    progressFill: "--bb-progress-fill",
  };

  (Object.keys(variableMap) as Array<keyof AppThemeTokens>).forEach((key) => {
    root.style.setProperty(variableMap[key], theme[key]);
  });

  root.style.removeProperty("--bb-skin-bg-image");
  root.style.removeProperty("--bb-skin-bg-image-mobile");
  root.style.removeProperty("--bb-skin-bg-image-desktop");
  root.style.removeProperty("--bb-skin-glow");
  root.style.removeProperty("--bb-skin-warm-glow");
  root.style.setProperty("--bb-reader-bg", theme.card);
  root.style.setProperty("--bb-reader-surface", theme.surface);
  root.style.setProperty("--bb-reader-border", theme.cardBorder);
  root.style.setProperty("--bb-reader-text", theme.textPrimary);
  root.style.setProperty("--bb-reader-secondary", theme.textSecondary);
  root.style.setProperty("--bb-reader-muted", theme.textMuted);
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.textPrimary);
}
