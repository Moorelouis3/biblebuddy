export type AppThemeId = "light" | "dark" | "blue" | "gold" | "purple" | "red" | "green" | "pink";

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
  background: "#F5F7FA",
  surface: "#FFFFFF",
  surfaceSoft: "#F3F4F6",
  card: "#FFFFFF",
  cardBorder: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6B7280",
  accent: "#4A9B6F",
  accentSoft: "#EEF7F1",
  button: "#4A9B6F",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#2563EB",
  navInactive: "#6B7280",
  progressTrack: "#E5E7EB",
  progressFill: "#4A9B6F",
};

export const darkTheme: AppTheme = {
  id: "dark",
  name: "Dark",
  isLocked: false,
  unlockRequirement: null,
  background: "#172033",
  surface: "#111827",
  surfaceSoft: "#22304A",
  card: "#162033",
  cardBorder: "#2A3A55",
  textPrimary: "#F9FAFB",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  accent: "#3B82F6",
  accentSoft: "#1D4ED8",
  button: "#2563EB",
  buttonText: "#FFFFFF",
  navBackground: "#172033",
  navActive: "#3B82F6",
  navInactive: "#94A3B8",
  progressTrack: "#334155",
  progressFill: "#3B82F6",
};

export const blueTheme: AppTheme = {
  id: "blue",
  name: "Blue",
  isLocked: false,
  unlockRequirement: null,
  background: "#EAF3FF",
  surface: "#F8FBFF",
  surfaceSoft: "#DBEAFE",
  card: "#FFFFFF",
  cardBorder: "#BFDBFE",
  textPrimary: "#102A43",
  textSecondary: "#334E68",
  textMuted: "#627D98",
  accent: "#2563EB",
  accentSoft: "#DBEAFE",
  button: "#2563EB",
  buttonText: "#FFFFFF",
  navBackground: "#EAF3FF",
  navActive: "#1D4ED8",
  navInactive: "#627D98",
  progressTrack: "#D6E4FF",
  progressFill: "#2563EB",
};

export const goldTheme: AppTheme = {
  id: "gold",
  name: "Gold",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF3D6",
  surface: "#FFFCF3",
  surfaceSoft: "#FDECC8",
  card: "#FFFFFF",
  cardBorder: "#F1D39A",
  textPrimary: "#33240A",
  textSecondary: "#614A19",
  textMuted: "#92733C",
  accent: "#B7791F",
  accentSoft: "#FEF3C7",
  button: "#B7791F",
  buttonText: "#FFFFFF",
  navBackground: "#FFF3D6",
  navActive: "#B7791F",
  navInactive: "#92733C",
  progressTrack: "#F6E2B8",
  progressFill: "#D8AA57",
};

export const purpleTheme: AppTheme = {
  id: "purple",
  name: "Purple",
  isLocked: false,
  unlockRequirement: null,
  background: "#F3EAFF",
  surface: "#FBF8FF",
  surfaceSoft: "#EDE2FF",
  card: "#FFFFFF",
  cardBorder: "#D8C1FF",
  textPrimary: "#261447",
  textSecondary: "#4C3575",
  textMuted: "#7C68A6",
  accent: "#7C3AED",
  accentSoft: "#EDE9FE",
  button: "#7C3AED",
  buttonText: "#FFFFFF",
  navBackground: "#F3EAFF",
  navActive: "#7C3AED",
  navInactive: "#7C68A6",
  progressTrack: "#E4D7FF",
  progressFill: "#7C3AED",
};

export const redTheme: AppTheme = {
  id: "red",
  name: "Red",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF0F0",
  surface: "#FFF8F8",
  surfaceSoft: "#FEE2E2",
  card: "#FFFFFF",
  cardBorder: "#FECACA",
  textPrimary: "#3B0A0A",
  textSecondary: "#7F1D1D",
  textMuted: "#B45353",
  accent: "#DC2626",
  accentSoft: "#FEE2E2",
  button: "#DC2626",
  buttonText: "#FFFFFF",
  navBackground: "#FFF0F0",
  navActive: "#DC2626",
  navInactive: "#B45353",
  progressTrack: "#FAD1D1",
  progressFill: "#DC2626",
};

export const greenTheme: AppTheme = {
  id: "green",
  name: "Green",
  isLocked: false,
  unlockRequirement: null,
  background: "#ECFDF3",
  surface: "#F7FFF9",
  surfaceSoft: "#DCFCE7",
  card: "#FFFFFF",
  cardBorder: "#BBF7D0",
  textPrimary: "#052E16",
  textSecondary: "#166534",
  textMuted: "#4D7C5B",
  accent: "#16A34A",
  accentSoft: "#DCFCE7",
  button: "#16A34A",
  buttonText: "#FFFFFF",
  navBackground: "#ECFDF3",
  navActive: "#16A34A",
  navInactive: "#4D7C5B",
  progressTrack: "#CFF4DA",
  progressFill: "#16A34A",
};

export const pinkTheme: AppTheme = {
  id: "pink",
  name: "Pink",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF0F7",
  surface: "#FFF8FB",
  surfaceSoft: "#FCE7F3",
  card: "#FFFFFF",
  cardBorder: "#FBCFE8",
  textPrimary: "#3B0A24",
  textSecondary: "#831843",
  textMuted: "#A65374",
  accent: "#DB2777",
  accentSoft: "#FCE7F3",
  button: "#DB2777",
  buttonText: "#FFFFFF",
  navBackground: "#FFF0F7",
  navActive: "#DB2777",
  navInactive: "#A65374",
  progressTrack: "#F8D2E5",
  progressFill: "#DB2777",
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
];

export const APP_THEME_BY_ID = new Map(APP_THEMES.map((theme) => [theme.id, theme]));
export const APP_THEME_STORAGE_KEY = "bb:app-theme";

export function normalizeAppThemeId(value: unknown): AppThemeId {
  return APP_THEME_BY_ID.has(value as AppThemeId) ? (value as AppThemeId) : "light";
}

export function getAppTheme(value: unknown): AppTheme {
  return APP_THEME_BY_ID.get(normalizeAppThemeId(value)) ?? lightTheme;
}

export function applyAppThemeToDocument(themeId: AppThemeId) {
  if (typeof document === "undefined") return;
  const theme = getAppTheme(themeId);
  const root = document.documentElement;
  root.dataset.bbTheme = theme.id;

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
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.textPrimary);
}
