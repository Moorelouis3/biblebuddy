/**
 * Canonical YouTube video ID per Bible in One Year day, for the Study Notes
 * blog series (2026-09-19). This is the ONLY place a Study Notes article is
 * allowed to get a video ID from - never guess one, never reuse a different
 * day's video, and never add an ID here without a real, confirmed video.
 *
 * Days 1 to 21 were supplied by Louis on 2026-09-19, as youtu.be links, one
 * per day, matching that day's reading. Later days get added here as their
 * videos become public - this file never changes YouTube itself, and a day
 * with no entry simply ships its Study Notes article without a video embed.
 * See docs/BIBLE_YEAR_STUDY_NOTES_WRITER_AGENT.md Step 5.
 */
export const BIBLE_YEAR_DAY_YOUTUBE_VIDEOS: Record<number, string> = {
  1: "1wRif5Zra2s", // Genesis 1-2
  2: "1ceR_Nn_x58", // Genesis 3-4
  3: "aG3IOGs2hz0", // Genesis 5-7
  4: "jcVdSxU0E7s", // Genesis 8-10
  5: "JPW36TCVhtU", // Genesis 11-13
  6: "7i8eVjS0ESw", // Genesis 14-15
  7: "n5fKqKuxJcw", // Genesis 16-17
  8: "x882zcRZT7Q", // Genesis 18-20
  9: "NHkocFpzed0", // Genesis 21-24
  10: "cZvcyl8l8_M", // Genesis 25-27
  11: "2Gx1NpSWAbI", // Genesis 28-29
  12: "x-6iaNFojw8", // Genesis 30-31
  13: "EWdVSNDoLwI", // Genesis 32-33
  14: "knFEzw1P34Q", // Genesis 34-36
  15: "q3Aw1Ccs_Mo", // Genesis 37-38
  16: "O2zE76hOqPk", // Genesis 39-40
  17: "Ltp-DCEYpbs", // Genesis 41-42
  18: "cRHd9mhtepE", // Genesis 43-44
  19: "4ZOAzUvEN-w", // Genesis 45-46
  20: "G5YSJZcIT-4", // Genesis 47-48
  21: "M7Y3D1tUiuY", // Genesis 49-50
};

export function getBibleYearDayYoutubeVideoId(day: number): string | null {
  return BIBLE_YEAR_DAY_YOUTUBE_VIDEOS[day] || null;
}
