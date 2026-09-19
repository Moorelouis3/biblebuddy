/**
 * Canonical YouTube video ID per Bible in One Year day, for the Study Notes
 * blog series (2026-09-19). This is the ONLY place a Study Notes article is
 * allowed to get a video ID from - never guess one, never reuse a different
 * day's video, and never add an ID here without a real, confirmed video.
 *
 * As of 2026-09-19 no Bible in One Year day has a YouTube video wired into
 * the codebase (confirmed against docs/BIBLE_YEAR_AGENT_AUDIT.md and
 * lib/bibleYearAudio.ts - only plumbing exists, no real video IDs). Many of
 * the ~75 recorded videos are still private ahead of their release date and
 * are tracked outside this repo. Louis adds a day's entry here once its
 * video is public (or otherwise safe to link), keeping the private video's
 * privacy setting untouched - this file never changes YouTube itself.
 *
 * A day with no entry here simply ships its Study Notes article without a
 * video embed. See docs/BIBLE_YEAR_STUDY_NOTES_WRITER_AGENT.md Step 5.
 */
export const BIBLE_YEAR_DAY_YOUTUBE_VIDEOS: Record<number, string> = {};

export function getBibleYearDayYoutubeVideoId(day: number): string | null {
  return BIBLE_YEAR_DAY_YOUTUBE_VIDEOS[day] || null;
}
