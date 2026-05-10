export type FeatureTourKey =
  | "dashboard"
  | "bible"
  | "bible_chapter_main"
  | "bible_chapter_tools"
  | "bible_buddy_tv"
  | "guided_studies"
  | "devotional_day"
  | "bible_year_day"
  | "bible_references"
  | "bible_trivia"
  | "notes"
  | "chat_widget"
  | "bible_study_hub"
  | "dashboard_swipe_hint";

export type FeatureToursState = Record<FeatureTourKey, boolean>;
export const CURRENT_IN_APP_ONBOARDING_VERSION = 3;

type FeatureToursRecord = Partial<Record<FeatureTourKey, unknown>> & {
  bible_reference?: unknown;
  onboarding_version?: unknown;
};

export const DEFAULT_FEATURE_TOURS: FeatureToursState = {
  dashboard: false,
  bible: false,
  bible_chapter_main: false,
  bible_chapter_tools: false,
  bible_buddy_tv: false,
  guided_studies: false,
  devotional_day: false,
  bible_year_day: false,
  bible_references: false,
  bible_trivia: false,
  notes: false,
  chat_widget: false,
  bible_study_hub: false,
  dashboard_swipe_hint: false,
};

export function buildPersistedFeatureTours(
  state: Partial<FeatureToursState> = {}
): FeatureToursState & { onboarding_version: number } {
  return {
    ...DEFAULT_FEATURE_TOURS,
    ...state,
    onboarding_version: CURRENT_IN_APP_ONBOARDING_VERSION,
  };
}

export function normalizeFeatureTours(raw: unknown): FeatureToursState {
  if (!raw || typeof raw !== "object") {
    return { ...DEFAULT_FEATURE_TOURS };
  }

  const source = raw as FeatureToursRecord;

  if (source.onboarding_version !== CURRENT_IN_APP_ONBOARDING_VERSION) {
    return { ...DEFAULT_FEATURE_TOURS };
  }

  return {
    dashboard: source.dashboard === true,
    bible: source.bible === true,
    bible_chapter_main: source.bible_chapter_main === true,
    bible_chapter_tools: source.bible_chapter_tools === true,
    bible_buddy_tv: source.bible_buddy_tv === true,
    guided_studies: source.guided_studies === true,
    devotional_day: source.devotional_day === true,
    bible_year_day: source.bible_year_day === true,
    bible_references:
      source.bible_references === true || source.bible_reference === true,
    bible_trivia: source.bible_trivia === true,
    notes: source.notes === true,
    chat_widget: source.chat_widget === true,
    bible_study_hub: source.bible_study_hub === true,
    dashboard_swipe_hint: source.dashboard_swipe_hint === true,
  };
}
