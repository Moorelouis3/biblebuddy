export type AppThemeId = "light" | "dark" | "blue" | "gold" | "purple" | "red" | "green" | "pink" | "orange" | "gray" | "black";

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
  isLocked: boolean;
  unlockRequirement: string | null;
};

export const lightTheme: AppTheme = {
  id: "light",
  name: "Light",
  isLocked: false,
  unlockRequirement: null,
  background: "#F1F7FF",
  surface: "#FFFFFF",
  surfaceSoft: "#E3F1FC",
  card: "#FFFFFF",
  cardBorder: "#BDDDF3",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6B7280",
  accent: "#2F8FD0",
  accentSoft: "#DDF0FF",
  button: "#2F8FD0",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#2F8FD0",
  navInactive: "#6B7280",
  progressTrack: "#CFE6F8",
  progressFill: "#2F8FD0",
};

export const darkTheme: AppTheme = {
  id: "dark",
  name: "Dark",
  isLocked: false,
  unlockRequirement: null,
  background: "#121A29",
  surface: "#182236",
  surfaceSoft: "#202D43",
  card: "#182236",
  cardBorder: "#2B3A52",
  textPrimary: "#F9FAFB",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  accent: "#4D8DFF",
  accentSoft: "#243F6D",
  button: "#4D8DFF",
  buttonText: "#FFFFFF",
  navBackground: "#172033",
  navActive: "#4D8DFF",
  navInactive: "#94A3B8",
  progressTrack: "#334155",
  progressFill: "#4D8DFF",
};

export const blueTheme: AppTheme = {
  id: "blue",
  name: "Blue",
  isLocked: false,
  unlockRequirement: null,
  background: "#EEF7FF",
  surface: "#FFFFFF",
  surfaceSoft: "#DFF0FF",
  card: "#FFFFFF",
  cardBorder: "#B7DAF2",
  textPrimary: "#102A43",
  textSecondary: "#334E68",
  textMuted: "#627D98",
  accent: "#2F8FD0",
  accentSoft: "#DDF0FF",
  button: "#2F8FD0",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#2F8FD0",
  navInactive: "#627D98",
  progressTrack: "#CFE6F8",
  progressFill: "#2F8FD0",
};

export const goldTheme: AppTheme = {
  id: "gold",
  name: "Gold",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF7E5",
  surface: "#FFFFFF",
  surfaceSoft: "#FFE9B8",
  card: "#FFFFFF",
  cardBorder: "#E1C06C",
  textPrimary: "#33240A",
  textSecondary: "#614A19",
  textMuted: "#92733C",
  accent: "#C98715",
  accentSoft: "#FFE9B8",
  button: "#C98715",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#C98715",
  navInactive: "#92733C",
  progressTrack: "#F3D48E",
  progressFill: "#C98715",
};

export const purpleTheme: AppTheme = {
  id: "purple",
  name: "Purple",
  isLocked: false,
  unlockRequirement: null,
  background: "#F6F0FF",
  surface: "#FFFFFF",
  surfaceSoft: "#EBDDFF",
  card: "#FFFFFF",
  cardBorder: "#CAB1F3",
  textPrimary: "#261447",
  textSecondary: "#4C3575",
  textMuted: "#7C68A6",
  accent: "#8758D8",
  accentSoft: "#EBDDFF",
  button: "#8758D8",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#8758D8",
  navInactive: "#7C68A6",
  progressTrack: "#D9C5FA",
  progressFill: "#8758D8",
};

export const redTheme: AppTheme = {
  id: "red",
  name: "Red",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF1F1",
  surface: "#FFFFFF",
  surfaceSoft: "#FFE0DD",
  card: "#FFFFFF",
  cardBorder: "#F2AAA3",
  textPrimary: "#3B0A0A",
  textSecondary: "#7F1D1D",
  textMuted: "#B45353",
  accent: "#E5544A",
  accentSoft: "#FFE0DD",
  button: "#E5544A",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#E5544A",
  navInactive: "#B45353",
  progressTrack: "#F7BEB9",
  progressFill: "#E5544A",
};

export const greenTheme: AppTheme = {
  id: "green",
  name: "Green",
  isLocked: false,
  unlockRequirement: null,
  background: "#EEFBF3",
  surface: "#FFFFFF",
  surfaceSoft: "#DCF6E6",
  card: "#FFFFFF",
  cardBorder: "#A8E2BE",
  textPrimary: "#052E16",
  textSecondary: "#166534",
  textMuted: "#4D7C5B",
  accent: "#23A85D",
  accentSoft: "#DCF6E6",
  button: "#23A85D",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#23A85D",
  navInactive: "#4D7C5B",
  progressTrack: "#BCECCB",
  progressFill: "#23A85D",
};

export const pinkTheme: AppTheme = {
  id: "pink",
  name: "Pink",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF0F7",
  surface: "#FFFFFF",
  surfaceSoft: "#FFE0EF",
  card: "#FFFFFF",
  cardBorder: "#F2AECE",
  textPrimary: "#3B0A24",
  textSecondary: "#831843",
  textMuted: "#A65374",
  accent: "#DD3C8E",
  accentSoft: "#FFE0EF",
  button: "#DD3C8E",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#DD3C8E",
  navInactive: "#A65374",
  progressTrack: "#F7B9D6",
  progressFill: "#DD3C8E",
};

export const orangeTheme: AppTheme = {
  id: "orange",
  name: "Orange",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF4EA",
  surface: "#FFFFFF",
  surfaceSoft: "#FFE3C9",
  card: "#FFFFFF",
  cardBorder: "#F0B987",
  textPrimary: "#3B1707",
  textSecondary: "#9A3412",
  textMuted: "#B85C2B",
  accent: "#E4742F",
  accentSoft: "#FFE3C9",
  button: "#E4742F",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#E4742F",
  navInactive: "#B85C2B",
  progressTrack: "#F9C59B",
  progressFill: "#E4742F",
};

export const grayTheme: AppTheme = {
  id: "gray",
  name: "Gray",
  isLocked: false,
  unlockRequirement: null,
  background: "#F7F7F6",
  surface: "#FAFAFA",
  surfaceSoft: "#E8EBEF",
  card: "#FFFFFF",
  cardBorder: "#CCD2DA",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6B7280",
  accent: "#6B7684",
  accentSoft: "#E8EBEF",
  button: "#6B7684",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#6B7684",
  navInactive: "#6B7280",
  progressTrack: "#E5E7EB",
  progressFill: "#6B7684",
};

export const blackTheme: AppTheme = {
  id: "black",
  name: "Black",
  isLocked: false,
  unlockRequirement: null,
  background: "#F7F7F6",
  surface: "#FFFFFF",
  surfaceSoft: "#E6E6E4",
  card: "#FFFFFF",
  cardBorder: "#C8C8C4",
  textPrimary: "#050505",
  textSecondary: "#1F1F1F",
  textMuted: "#5A5A5A",
  accent: "#202327",
  accentSoft: "#E6E6E4",
  button: "#202327",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#202327",
  navInactive: "#5A5A5A",
  progressTrack: "#D4D4D4",
  progressFill: "#202327",
};

export const APP_THEMES: AppTheme[] = [
  lightTheme,
  darkTheme,
  blueTheme,
  goldTheme,
  purpleTheme,
  redTheme,
  greenTheme,
  pinkTheme,
  orangeTheme,
  grayTheme,
  blackTheme,
];

export const APP_THEME_BY_ID = new Map(APP_THEMES.map((theme) => [theme.id, theme]));
export const APP_THEME_STORAGE_KEY = "bb:app-theme";
export const APP_THEME_STORAGE_TIMESTAMP_KEY = "bb:app-theme-updated-at";
export const APP_THEME_PENDING_SYNC_KEY = "bb:app-theme-pending-sync";
export const APP_THEME_PENDING_SYNC_MS = 90 * 1000;

export function normalizeAppThemeId(value: unknown): AppThemeId {
  return APP_THEME_BY_ID.has(value as AppThemeId) ? (value as AppThemeId) : "light";
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
      window.localStorage.getItem(APP_THEME_STORAGE_KEY) ||
      window.localStorage.getItem("bb:dashboard-theme"),
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
  window.localStorage.setItem("bb:dashboard-theme", normalizedThemeId);
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
  if (
    (root.dataset.bbSkin && root.dataset.bbSkin !== "none") ||
    (root.dataset.bbBasicSkin && root.dataset.bbBasicSkin !== "none")
  ) {
    return;
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
  root.style.setProperty("--bb-reader-bg", theme.card);
  root.style.setProperty("--bb-reader-surface", theme.surface);
  root.style.setProperty("--bb-reader-border", theme.cardBorder);
  root.style.setProperty("--bb-reader-text", theme.textPrimary);
  root.style.setProperty("--bb-reader-secondary", theme.textSecondary);
  root.style.setProperty("--bb-reader-muted", theme.textMuted);
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.textPrimary);
}
