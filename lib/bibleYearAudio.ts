export const BIBLE_YEAR_AUDIO_BUCKET = "tts-audio";

export type BibleYearAudioDay = {
  dayNumber: number;
  title: string;
  storagePath: string;
  apiSrc: string;
  estimatedDuration: string;
};

function padDay(dayNumber: number) {
  return String(dayNumber).padStart(3, "0");
}

export function getBibleYearAudioStoragePath(dayNumber: number) {
  const day = padDay(dayNumber);
  return `bible-in-one-year/day-${day}/day-${day}-audio.mp3`;
}

export function getBibleYearAudioApiSrc(dayNumber: number) {
  return `/api/tts/bible-year/day/${dayNumber}?v=day-${padDay(dayNumber)}-audio-v12`;
}

export const BIBLE_YEAR_DAY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 1,
  title: "Day 1 - Creation of the World",
  storagePath: getBibleYearAudioStoragePath(1),
  apiSrc: getBibleYearAudioApiSrc(1),
  estimatedDuration: "about 18 min",
};

export const BIBLE_YEAR_DAY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 2,
  title: "Day 2 - The Fall of Man",
  storagePath: getBibleYearAudioStoragePath(2),
  apiSrc: getBibleYearAudioApiSrc(2),
  estimatedDuration: "about 15 min",
};

export const BIBLE_YEAR_DAY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 3,
  title: "Day 3 - Noah Builds the Ark",
  storagePath: getBibleYearAudioStoragePath(3),
  apiSrc: getBibleYearAudioApiSrc(3),
  estimatedDuration: "about 15 min",
};

export const BIBLE_YEAR_DAY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 4,
  title: "Day 4 - Life After the Flood",
  storagePath: getBibleYearAudioStoragePath(4),
  apiSrc: getBibleYearAudioApiSrc(4),
  estimatedDuration: "about 16 min",
};

export const BIBLE_YEAR_DAY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 5,
  title: "Day 5 - The Obedience of Abraham",
  storagePath: getBibleYearAudioStoragePath(5),
  apiSrc: getBibleYearAudioApiSrc(5),
  estimatedDuration: "about 15 min",
};

export const BIBLE_YEAR_DAY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 6,
  title: "Day 6 - The Rescue of Lot",
  storagePath: getBibleYearAudioStoragePath(6),
  apiSrc: getBibleYearAudioApiSrc(6),
  estimatedDuration: "about 16 min",
};

export const BIBLE_YEAR_DAY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 7,
  title: "Day 7 - The Covenant Promise",
  storagePath: getBibleYearAudioStoragePath(7),
  apiSrc: getBibleYearAudioApiSrc(7),
  estimatedDuration: "about 14 min",
};

export const BIBLE_YEAR_DAY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 8,
  title: "Day 8 - The Judgment of Sodom",
  storagePath: getBibleYearAudioStoragePath(8),
  apiSrc: getBibleYearAudioApiSrc(8),
  estimatedDuration: "about 19 min",
};
