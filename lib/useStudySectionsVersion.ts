"use client";

import { useSyncExternalStore } from "react";
import { getStudySectionsVersion, subscribeToStudySections } from "./bibleReaderStudyNotesLazy";

/**
 * Draw again whenever a chapter's study notes arrive.
 *
 * Call it once in any component that reads getBibleReaderStudySections from
 * lib/bibleReaderStudyNotesLazy (or anything built on it, like
 * getBibleYearDayContent) while rendering. In the browser that lookup
 * answers [] for a chapter whose file is still on its way; this is what
 * brings the component back when the file lands.
 *
 * It lives in its own file because the lazy module is also imported by
 * server routes, and a file with a React hook in it cannot be.
 */
export function useStudySectionsVersion() {
  return useSyncExternalStore(subscribeToStudySections, getStudySectionsVersion, () => 0);
}
