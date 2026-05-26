export const BIBLE_YEAR_AUDIO_BUCKET = "tts-audio";

export type BibleYearAudioDay = {
  dayNumber: number;
  title: string;
  storagePath: string;
  apiSrc: string;
  estimatedDuration: string;
  videoSrc?: string;
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
  videoSrc: "https://player.mediadelivery.net/play/618103/e810870b-c3f6-4289-b74d-263113afede9",
};

export const BIBLE_YEAR_DAY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 2,
  title: "Day 2 - The Fall of Man",
  storagePath: getBibleYearAudioStoragePath(2),
  apiSrc: getBibleYearAudioApiSrc(2),
  estimatedDuration: "about 15 min",
  videoSrc: "https://player.mediadelivery.net/play/618103/1fd36998-1fbe-43fb-a171-51eab4c04b07",
};

export const BIBLE_YEAR_DAY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 3,
  title: "Day 3 - Noah Builds the Ark",
  storagePath: getBibleYearAudioStoragePath(3),
  apiSrc: getBibleYearAudioApiSrc(3),
  estimatedDuration: "about 15 min",
  videoSrc: "https://player.mediadelivery.net/play/618103/3f4903b2-44ba-41a6-9908-3156a850b988",
};

export const BIBLE_YEAR_DAY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 4,
  title: "Day 4 - Life After the Flood",
  storagePath: getBibleYearAudioStoragePath(4),
  apiSrc: getBibleYearAudioApiSrc(4),
  estimatedDuration: "about 16 min",
  videoSrc: "https://player.mediadelivery.net/play/618103/bbf2431c-ff5f-4bdd-a299-0dd0bc8322b8",
};

export const BIBLE_YEAR_DAY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 5,
  title: "Day 5 - The Obedience of Abraham",
  storagePath: getBibleYearAudioStoragePath(5),
  apiSrc: getBibleYearAudioApiSrc(5),
  estimatedDuration: "about 15 min",
  videoSrc: "https://player.mediadelivery.net/play/618103/8b18e4fe-f63b-49db-a771-f5fd7e109878",
};

export const BIBLE_YEAR_DAY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 6,
  title: "Day 6 - The Rescue of Lot",
  storagePath: getBibleYearAudioStoragePath(6),
  apiSrc: getBibleYearAudioApiSrc(6),
  estimatedDuration: "about 16 min",
  videoSrc: "https://player.mediadelivery.net/play/618103/03e286dc-21e2-4748-8190-e525c83c4597",
};

export const BIBLE_YEAR_DAY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 7,
  title: "Day 7 - The Covenant Promise",
  storagePath: getBibleYearAudioStoragePath(7),
  apiSrc: getBibleYearAudioApiSrc(7),
  videoSrc: "https://player.mediadelivery.net/play/618103/3888ca02-171e-4ce6-96b2-b58f1541f340",
  estimatedDuration: "about 14 min",
};

export const BIBLE_YEAR_DAY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 8,
  title: "Day 8 - Sodom and Gomorrah",
  storagePath: getBibleYearAudioStoragePath(8),
  apiSrc: getBibleYearAudioApiSrc(8),
  estimatedDuration: "about 20 min",
};

export const BIBLE_YEAR_DAY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 9,
  title: "Day 9 - Abraham's Test and Legacy",
  storagePath: getBibleYearAudioStoragePath(9),
  apiSrc: getBibleYearAudioApiSrc(9),
  estimatedDuration: "about 16 min",
};

export const BIBLE_YEAR_DAY_TEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 10,
  title: "Day 10 - Covenant Through Isaac",
  storagePath: getBibleYearAudioStoragePath(10),
  apiSrc: getBibleYearAudioApiSrc(10),
  estimatedDuration: "about 20 min",
};

export const BIBLE_YEAR_DAY_ELEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 11,
  title: "Day 11 - Jacob's Journey Begins",
  storagePath: getBibleYearAudioStoragePath(11),
  apiSrc: getBibleYearAudioApiSrc(11),
  estimatedDuration: "about 16 min",
};

export const BIBLE_YEAR_DAY_TWELVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 12,
  title: "Day 12 - Jacob Leaves Laban",
  storagePath: getBibleYearAudioStoragePath(12),
  apiSrc: getBibleYearAudioApiSrc(12),
  estimatedDuration: "about 16 min",
};

export const BIBLE_YEAR_DAY_THIRTEEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 13,
  title: "Day 13 - Jacob Wrestles With God",
  storagePath: getBibleYearAudioStoragePath(13),
  apiSrc: getBibleYearAudioApiSrc(13),
  estimatedDuration: "about 16 min",
};

export const BIBLE_YEAR_DAY_FOURTEEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 14,
  title: "Day 14 - Jacob Returns to Bethel",
  storagePath: getBibleYearAudioStoragePath(14),
  apiSrc: getBibleYearAudioApiSrc(14),
  estimatedDuration: "about 18 min",
};
