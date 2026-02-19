export type FeatureTourKey =
  | "dashboard"
  | "bible"
  | "guided_studies"
  | "bible_references"
  | "bible_trivia"
  | "notes"
  | "chat_widget"
  | "bible_study_hub";

export type FeatureToursState = Record<FeatureTourKey, boolean>;

export const DEFAULT_FEATURE_TOURS: FeatureToursState = {
  dashboard: false,
  bible: false,
  guided_studies: false,
  bible_references: false,
  bible_trivia: false,
  notes: false,
  chat_widget: false,
  bible_study_hub: false,
};

export function normalizeFeatureTours(raw: unknown): FeatureToursState {
  if (!raw || typeof raw !== "object") {
    return { ...DEFAULT_FEATURE_TOURS };
  }

  const source = raw as Partial<Record<FeatureTourKey, unknown>> & {
    bible_reference?: unknown;
  };

  return {
    dashboard: source.dashboard === true,
    bible: source.bible === true,
    guided_studies: source.guided_studies === true,
    bible_references:
      source.bible_references === true || source.bible_reference === true,
    bible_trivia: source.bible_trivia === true,
    notes: source.notes === true,
    chat_widget: source.chat_widget === true,
    bible_study_hub: source.bible_study_hub === true,
  };
}
