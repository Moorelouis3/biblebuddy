export const BIBLE_YEAR_AUDIO_BUCKET = "tts-audio";

export type BibleYearAudioDay = {
  dayNumber: number;
  title: string;
  storagePath: string;
  apiSrc: string;
  estimatedDuration: string;
  videoSrc?: string;
};

export function getYouTubeVideoId(value: string | null | undefined) {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/").filter(Boolean)[0] || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/").filter(Boolean)[1] || null;
      }
      return parsed.searchParams.get("v");
    }
  } catch {
    const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]+)/);
    return match?.[1] || null;
  }
  return null;
}

export function getBibleYearVideoEmbedSrc(videoSrc: string | null | undefined) {
  if (!videoSrc) return null;
  const youtubeVideoId = getYouTubeVideoId(videoSrc);
  if (youtubeVideoId) {
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });
    return `https://www.youtube.com/embed/${youtubeVideoId}?${params.toString()}`;
  }
  return `${videoSrc}${videoSrc.includes("?") ? "&" : "?"}autoplay=true&muted=false&preload=true&responsive=true`;
}

function padDay(dayNumber: number) {
  return String(dayNumber).padStart(3, "0");
}

export function getBibleYearAudioStoragePath(dayNumber: number) {
  const day = padDay(dayNumber);
  return `bible-in-one-year/day-${day}/day-${day}-audio.mp3`;
}

export function getBibleYearAudioApiSrc(dayNumber: number) {
  return `/api/tts/bible-year/day/${dayNumber}?v=day-${padDay(dayNumber)}-audio-v13`;
}

export const BIBLE_YEAR_DAY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 1,
  title: "Day 1 - Creation of the World",
  storagePath: getBibleYearAudioStoragePath(1),
  apiSrc: getBibleYearAudioApiSrc(1),
  estimatedDuration: "about 18 min",
  videoSrc: "https://youtu.be/ZvP93hHvwuU",
};

export const BIBLE_YEAR_DAY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 2,
  title: "Day 2 - The Fall of Man",
  storagePath: getBibleYearAudioStoragePath(2),
  apiSrc: getBibleYearAudioApiSrc(2),
  estimatedDuration: "about 15 min",
  videoSrc: "https://youtu.be/sfEGArkD0So",
};

export const BIBLE_YEAR_DAY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 3,
  title: "Day 3 - Noah Builds the Ark",
  storagePath: getBibleYearAudioStoragePath(3),
  apiSrc: getBibleYearAudioApiSrc(3),
  estimatedDuration: "about 15 min",
  videoSrc: "https://youtu.be/amOnjZfgJhs",
};

export const BIBLE_YEAR_DAY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 4,
  title: "Day 4 - Life After the Flood",
  storagePath: getBibleYearAudioStoragePath(4),
  apiSrc: getBibleYearAudioApiSrc(4),
  estimatedDuration: "about 16 min",
  videoSrc: "https://youtu.be/tLF7kqVs6cs",
};

export const BIBLE_YEAR_DAY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 5,
  title: "Day 5 - The Obedience of Abraham",
  storagePath: getBibleYearAudioStoragePath(5),
  apiSrc: getBibleYearAudioApiSrc(5),
  estimatedDuration: "about 15 min",
  videoSrc: "https://youtu.be/KA_2mq-pTyw",
};

export const BIBLE_YEAR_DAY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 6,
  title: "Day 6 - The Rescue of Lot",
  storagePath: getBibleYearAudioStoragePath(6),
  apiSrc: getBibleYearAudioApiSrc(6),
  estimatedDuration: "about 16 min",
  videoSrc: "https://youtu.be/KLyXhiLfrlE",
};

export const BIBLE_YEAR_DAY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 7,
  title: "Day 7 - The Covenant Promise",
  storagePath: getBibleYearAudioStoragePath(7),
  apiSrc: getBibleYearAudioApiSrc(7),
  videoSrc: "https://youtu.be/gJg3pwT8zVs",
  estimatedDuration: "about 14 min",
};

export const BIBLE_YEAR_DAY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 8,
  title: "Day 8 - Sodom and Gomorrah",
  storagePath: getBibleYearAudioStoragePath(8),
  apiSrc: getBibleYearAudioApiSrc(8),
  estimatedDuration: "about 20 min",
  videoSrc: "https://youtu.be/vMmUiWwJQAo",
};

export const BIBLE_YEAR_DAY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 9,
  title: "Day 9 - Abraham's Legacy",
  storagePath: getBibleYearAudioStoragePath(9),
  apiSrc: getBibleYearAudioApiSrc(9),
  estimatedDuration: "about 16 min",
  videoSrc: "https://youtu.be/XbROY7Gvkco",
};

export const BIBLE_YEAR_DAY_TEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 10,
  title: "Day 10 - Covenant Through Isaac",
  storagePath: getBibleYearAudioStoragePath(10),
  apiSrc: getBibleYearAudioApiSrc(10),
  estimatedDuration: "about 35 min",
};

export const BIBLE_YEAR_DAY_ELEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 11,
  title: "Day 11 - Jacob Meets God at Bethel",
  storagePath: getBibleYearAudioStoragePath(11),
  apiSrc: getBibleYearAudioApiSrc(11),
  estimatedDuration: "about 35 min",
};

export const BIBLE_YEAR_DAY_TWELVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 12,
  title: "Day 12 - Jacob Leaves Laban",
  storagePath: getBibleYearAudioStoragePath(12),
  apiSrc: getBibleYearAudioApiSrc(12),
  estimatedDuration: "about 40 min",
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
