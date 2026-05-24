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
  background: "#F7F9FC",
  surface: "#FFFFFF",
  surfaceSoft: "#F1F6FB",
  card: "#FFFFFF",
  cardBorder: "#E4ECF5",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6B7280",
  accent: "#6FA8CF",
  accentSoft: "#EEF7FF",
  button: "#6FA8CF",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#6FA8CF",
  navInactive: "#6B7280",
  progressTrack: "#E5E7EB",
  progressFill: "#6FA8CF",
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
  accent: "#93B7E5",
  accentSoft: "#263B59",
  button: "#93B7E5",
  buttonText: "#FFFFFF",
  navBackground: "#172033",
  navActive: "#93B7E5",
  navInactive: "#94A3B8",
  progressTrack: "#334155",
  progressFill: "#93B7E5",
};

export const blueTheme: AppTheme = {
  id: "blue",
  name: "Blue",
  isLocked: false,
  unlockRequirement: null,
  background: "#F2F8FE",
  surface: "#FFFFFF",
  surfaceSoft: "#EEF6FD",
  card: "#FFFFFF",
  cardBorder: "#D7E8F6",
  textPrimary: "#102A43",
  textSecondary: "#334E68",
  textMuted: "#627D98",
  accent: "#6FA8CF",
  accentSoft: "#EEF7FF",
  button: "#6FA8CF",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#6FA8CF",
  navInactive: "#627D98",
  progressTrack: "#E3EEF7",
  progressFill: "#6FA8CF",
};

export const goldTheme: AppTheme = {
  id: "gold",
  name: "Gold",
  isLocked: false,
  unlockRequirement: null,
  background: "#FCF7EC",
  surface: "#FFFFFF",
  surfaceSoft: "#FFF4D9",
  card: "#FFFFFF",
  cardBorder: "#ECDDBF",
  textPrimary: "#33240A",
  textSecondary: "#614A19",
  textMuted: "#92733C",
  accent: "#C69A4A",
  accentSoft: "#FFF4D9",
  button: "#C69A4A",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#C69A4A",
  navInactive: "#92733C",
  progressTrack: "#F6E2B8",
  progressFill: "#C69A4A",
};

export const purpleTheme: AppTheme = {
  id: "purple",
  name: "Purple",
  isLocked: false,
  unlockRequirement: null,
  background: "#F8F4FD",
  surface: "#FFFFFF",
  surfaceSoft: "#F1EBFA",
  card: "#FFFFFF",
  cardBorder: "#E1D6F2",
  textPrimary: "#261447",
  textSecondary: "#4C3575",
  textMuted: "#7C68A6",
  accent: "#9A7BC7",
  accentSoft: "#F1EBFA",
  button: "#9A7BC7",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#9A7BC7",
  navInactive: "#7C68A6",
  progressTrack: "#E4D7FF",
  progressFill: "#9A7BC7",
};

export const redTheme: AppTheme = {
  id: "red",
  name: "Red",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF6F5",
  surface: "#FFFFFF",
  surfaceSoft: "#FCEBE8",
  card: "#FFFFFF",
  cardBorder: "#F2D2CD",
  textPrimary: "#3B0A0A",
  textSecondary: "#7F1D1D",
  textMuted: "#B45353",
  accent: "#D9877E",
  accentSoft: "#FCEBE8",
  button: "#D9877E",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#D9877E",
  navInactive: "#B45353",
  progressTrack: "#FAD1D1",
  progressFill: "#D9877E",
};

export const greenTheme: AppTheme = {
  id: "green",
  name: "Green",
  isLocked: false,
  unlockRequirement: null,
  background: "#F3FAF5",
  surface: "#FFFFFF",
  surfaceSoft: "#EAF6ED",
  card: "#FFFFFF",
  cardBorder: "#D1E7D5",
  textPrimary: "#052E16",
  textSecondary: "#166534",
  textMuted: "#4D7C5B",
  accent: "#78B88B",
  accentSoft: "#EAF6ED",
  button: "#78B88B",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#78B88B",
  navInactive: "#4D7C5B",
  progressTrack: "#CFF4DA",
  progressFill: "#78B88B",
};

export const pinkTheme: AppTheme = {
  id: "pink",
  name: "Pink",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF6FA",
  surface: "#FFFFFF",
  surfaceSoft: "#FBEAF2",
  card: "#FFFFFF",
  cardBorder: "#EFD3E0",
  textPrimary: "#3B0A24",
  textSecondary: "#831843",
  textMuted: "#A65374",
  accent: "#D783A7",
  accentSoft: "#FBEAF2",
  button: "#D783A7",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#D783A7",
  navInactive: "#A65374",
  progressTrack: "#F8D2E5",
  progressFill: "#D783A7",
};

export const orangeTheme: AppTheme = {
  id: "orange",
  name: "Orange",
  isLocked: false,
  unlockRequirement: null,
  background: "#FFF8F1",
  surface: "#FFFFFF",
  surfaceSoft: "#FDEEDF",
  card: "#FFFFFF",
  cardBorder: "#EFCFB3",
  textPrimary: "#3B1707",
  textSecondary: "#9A3412",
  textMuted: "#B85C2B",
  accent: "#D99A68",
  accentSoft: "#FDEEDF",
  button: "#D99A68",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#D99A68",
  navInactive: "#B85C2B",
  progressTrack: "#FDD8B6",
  progressFill: "#D99A68",
};

export const grayTheme: AppTheme = {
  id: "gray",
  name: "Gray",
  isLocked: false,
  unlockRequirement: null,
  background: "#F7F7F6",
  surface: "#FAFAFA",
  surfaceSoft: "#F0F1F2",
  card: "#FFFFFF",
  cardBorder: "#E0E2E5",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6B7280",
  accent: "#87909A",
  accentSoft: "#F0F1F2",
  button: "#87909A",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#87909A",
  navInactive: "#6B7280",
  progressTrack: "#E5E7EB",
  progressFill: "#87909A",
};

export const blackTheme: AppTheme = {
  id: "black",
  name: "Black",
  isLocked: false,
  unlockRequirement: null,
  background: "#F7F7F6",
  surface: "#FFFFFF",
  surfaceSoft: "#EFEFEE",
  card: "#FFFFFF",
  cardBorder: "#DDDDDA",
  textPrimary: "#050505",
  textSecondary: "#1F1F1F",
  textMuted: "#5A5A5A",
  accent: "#3F4145",
  accentSoft: "#EFEFEE",
  button: "#3F4145",
  buttonText: "#FFFFFF",
  navBackground: "#FFFFFF",
  navActive: "#3F4145",
  navInactive: "#5A5A5A",
  progressTrack: "#D4D4D4",
  progressFill: "#3F4145",
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
  if (root.dataset.bbSkin && root.dataset.bbSkin !== "none") return;

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
