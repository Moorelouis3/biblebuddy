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
  return `/api/tts/bible-year/day/${dayNumber}?v=day-${padDay(dayNumber)}-audio-v15`;
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
  title: "Day 8 - Sodom and Gomorrah",
  storagePath: getBibleYearAudioStoragePath(8),
  apiSrc: getBibleYearAudioApiSrc(8),
  estimatedDuration: "about 20 min",
};

export const BIBLE_YEAR_DAY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 9,
  title: "Day 9 - Abraham's Legacy",
  storagePath: getBibleYearAudioStoragePath(9),
  apiSrc: getBibleYearAudioApiSrc(9),
  estimatedDuration: "about 16 min",
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
  estimatedDuration: "30-35 min",
};

export const BIBLE_YEAR_DAY_FOURTEEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 14,
  title: "Day 14 - Jacob's Family and Esau's Line",
  storagePath: getBibleYearAudioStoragePath(14),
  apiSrc: getBibleYearAudioApiSrc(14),
  estimatedDuration: "40-45 min",
};

export const BIBLE_YEAR_DAY_FIFTEEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 15,
  title: "Day 15 - Joseph Is Betrayed",
  storagePath: getBibleYearAudioStoragePath(15),
  apiSrc: getBibleYearAudioApiSrc(15),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_SIXTEEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 16,
  title: "Day 16 - Joseph in Egypt",
  storagePath: getBibleYearAudioStoragePath(16),
  apiSrc: getBibleYearAudioApiSrc(16),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_SEVENTEEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 17,
  title: "Day 17 - Joseph Rises to Power",
  storagePath: getBibleYearAudioStoragePath(17),
  apiSrc: getBibleYearAudioApiSrc(17),
  estimatedDuration: "40-45 min",
};

export const BIBLE_YEAR_DAY_EIGHTEEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 18,
  title: "Day 18 - Judah Stands in the Gap",
  storagePath: getBibleYearAudioStoragePath(18),
  apiSrc: getBibleYearAudioApiSrc(18),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_NINETEEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 19,
  title: "Day 19 - Joseph Reveals Himself",
  storagePath: getBibleYearAudioStoragePath(19),
  apiSrc: getBibleYearAudioApiSrc(19),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_AUDIO: BibleYearAudioDay = {
  dayNumber: 20,
  title: "Day 20 - Jacob Blesses Joseph's Sons",
  storagePath: getBibleYearAudioStoragePath(20),
  apiSrc: getBibleYearAudioApiSrc(20),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 21,
  title: "Day 21 - Genesis Ends With Hope",
  storagePath: getBibleYearAudioStoragePath(21),
  apiSrc: getBibleYearAudioApiSrc(21),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 22,
  title: "Day 22 - God Hears Israel's Cry",
  storagePath: getBibleYearAudioStoragePath(22),
  apiSrc: getBibleYearAudioApiSrc(22),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 23,
  title: "Day 23 - Pharaoh Resists God's Word",
  storagePath: getBibleYearAudioStoragePath(23),
  apiSrc: getBibleYearAudioApiSrc(23),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 24,
  title: "Day 24 - Passover and Deliverance",
  storagePath: getBibleYearAudioStoragePath(24),
  apiSrc: getBibleYearAudioApiSrc(24),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 25,
  title: "Day 25 - Through the Sea and Into the Wilderness",
  storagePath: getBibleYearAudioStoragePath(25),
  apiSrc: getBibleYearAudioApiSrc(25),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 26,
  title: "Day 26 - Water, Battle, and the Ten Commandments",
  storagePath: getBibleYearAudioStoragePath(26),
  apiSrc: getBibleYearAudioApiSrc(26),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 27,
  title: "Day 27 - Covenant Law and Covenant Blood",
  storagePath: getBibleYearAudioStoragePath(27),
  apiSrc: getBibleYearAudioApiSrc(27),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 28,
  title: "Day 28 - The Tabernacle and Priesthood Begin",
  storagePath: getBibleYearAudioStoragePath(28),
  apiSrc: getBibleYearAudioApiSrc(28),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_TWENTY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 29,
  title: "Day 29 - Consecration and the Golden Calf",
  storagePath: getBibleYearAudioStoragePath(29),
  apiSrc: getBibleYearAudioApiSrc(29),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_THIRTY_AUDIO: BibleYearAudioDay = {
  dayNumber: 30,
  title: "Day 30 - God's Presence and Renewed Obedience",
  storagePath: getBibleYearAudioStoragePath(30),
  apiSrc: getBibleYearAudioApiSrc(30),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_THIRTY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 31,
  title: "Day 31 - The Tabernacle Is Finished",
  storagePath: getBibleYearAudioStoragePath(31),
  apiSrc: getBibleYearAudioApiSrc(31),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_THIRTY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 32,
  title: "Day 32 - Offerings and Atonement",
  storagePath: getBibleYearAudioStoragePath(32),
  apiSrc: getBibleYearAudioApiSrc(32),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_THIRTY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 33,
  title: "Day 33 - Guilt, Consecration, and Priests",
  storagePath: getBibleYearAudioStoragePath(33),
  apiSrc: getBibleYearAudioApiSrc(33),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_THIRTY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 34,
  title: "Day 34 - Worship, Holiness, and Clean Living",
  storagePath: getBibleYearAudioStoragePath(34),
  apiSrc: getBibleYearAudioApiSrc(34),
  estimatedDuration: "30-35 min",
};

export const BIBLE_YEAR_DAY_THIRTY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 35,
  title: "Day 35 - Cleansing and the Day of Atonement",
  storagePath: getBibleYearAudioStoragePath(35),
  apiSrc: getBibleYearAudioApiSrc(35),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_THIRTY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 36,
  title: "Day 36 - Holy Living Before a Holy God",
  storagePath: getBibleYearAudioStoragePath(36),
  apiSrc: getBibleYearAudioApiSrc(36),
  estimatedDuration: "35-40 min",
};

export const BIBLE_YEAR_DAY_THIRTY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 37,
  title: "Day 37 - Priests, Feasts, and Sacred Order",
  storagePath: getBibleYearAudioStoragePath(37),
  apiSrc: getBibleYearAudioApiSrc(37),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_THIRTY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 38,
  title: "Day 38 - Jubilee, Covenant, and Israel Counted",
  storagePath: getBibleYearAudioStoragePath(38),
  apiSrc: getBibleYearAudioApiSrc(38),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_THIRTY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 39,
  title: "Day 39 - Camp Order and Purity",
  storagePath: getBibleYearAudioStoragePath(39),
  apiSrc: getBibleYearAudioApiSrc(39),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_AUDIO: BibleYearAudioDay = {
  dayNumber: 40,
  title: "Day 40 - Blessing, Dedication, and Passover",
  storagePath: getBibleYearAudioStoragePath(40),
  apiSrc: getBibleYearAudioApiSrc(40),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 41,
  title: "Day 41 - Journey, Complaints, and Spies",
  storagePath: getBibleYearAudioStoragePath(41),
  apiSrc: getBibleYearAudioApiSrc(41),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 42,
  title: "Day 42 - Rebellion and God's Chosen Priesthood",
  storagePath: getBibleYearAudioStoragePath(42),
  apiSrc: getBibleYearAudioApiSrc(42),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 43,
  title: "Day 43 - Provision, Judgment, and the Bronze Serpent",
  storagePath: getBibleYearAudioStoragePath(43),
  apiSrc: getBibleYearAudioApiSrc(43),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 44,
  title: "Day 44 - Balaam, Blessing, and Compromise",
  storagePath: getBibleYearAudioStoragePath(44),
  apiSrc: getBibleYearAudioApiSrc(44),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 45,
  title: "Day 45 - A New Generation Counted",
  storagePath: getBibleYearAudioStoragePath(45),
  apiSrc: getBibleYearAudioApiSrc(45),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 46,
  title: "Day 46 - Vows, Victory, and the Journey Reviewed",
  storagePath: getBibleYearAudioStoragePath(46),
  apiSrc: getBibleYearAudioApiSrc(46),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 47,
  title: "Day 47 - Land Boundaries and Moses Looks Back",
  storagePath: getBibleYearAudioStoragePath(47),
  apiSrc: getBibleYearAudioApiSrc(47),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 48,
  title: "Day 48 - Remembering the Journey and the Covenant",
  storagePath: getBibleYearAudioStoragePath(48),
  apiSrc: getBibleYearAudioApiSrc(48),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FORTY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 49,
  title: "Day 49 - Love God and Remember Grace",
  storagePath: getBibleYearAudioStoragePath(49),
  apiSrc: getBibleYearAudioApiSrc(49),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_AUDIO: BibleYearAudioDay = {
  dayNumber: 50,
  title: "Day 50 - Covenant Loyalty From the Heart",
  storagePath: getBibleYearAudioStoragePath(50),
  apiSrc: getBibleYearAudioApiSrc(50),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 51,
  title: "Day 51 - Worship, Justice, and Leadership",
  storagePath: getBibleYearAudioStoragePath(51),
  apiSrc: getBibleYearAudioApiSrc(51),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 52,
  title: "Day 52 - Prophets, Cities, and Justice",
  storagePath: getBibleYearAudioStoragePath(52),
  apiSrc: getBibleYearAudioApiSrc(52),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 53,
  title: "Day 53 - Everyday Faithfulness",
  storagePath: getBibleYearAudioStoragePath(53),
  apiSrc: getBibleYearAudioApiSrc(53),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 54,
  title: "Day 54 - Blessing, Curse, and Covenant Renewal",
  storagePath: getBibleYearAudioStoragePath(54),
  apiSrc: getBibleYearAudioApiSrc(54),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 55,
  title: "Day 55 - Choose Life and Receive Moses' Blessing",
  storagePath: getBibleYearAudioStoragePath(55),
  apiSrc: getBibleYearAudioApiSrc(55),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 56,
  title: "Day 56 - Moses Dies and Joshua Leads",
  storagePath: getBibleYearAudioStoragePath(56),
  apiSrc: getBibleYearAudioApiSrc(56),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 57,
  title: "Day 57 - Memorial Stones, Jericho, and Achan",
  storagePath: getBibleYearAudioStoragePath(57),
  apiSrc: getBibleYearAudioApiSrc(57),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 58,
  title: "Day 58 - Conquest and Covenant Obedience",
  storagePath: getBibleYearAudioStoragePath(58),
  apiSrc: getBibleYearAudioApiSrc(58),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_FIFTY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 59,
  title: "Day 59 - The Land Is Distributed",
  storagePath: getBibleYearAudioStoragePath(59),
  apiSrc: getBibleYearAudioApiSrc(59),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_AUDIO: BibleYearAudioDay = {
  dayNumber: 60,
  title: "Day 60 - Inheritance for the Tribes",
  storagePath: getBibleYearAudioStoragePath(60),
  apiSrc: getBibleYearAudioApiSrc(60),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 61,
  title: "Day 61 - Refuge, Rest, and Joshua's Warning",
  storagePath: getBibleYearAudioStoragePath(61),
  apiSrc: getBibleYearAudioApiSrc(61),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 62,
  title: "Day 62 - Covenant Choice and Israel's Drift",
  storagePath: getBibleYearAudioStoragePath(62),
  apiSrc: getBibleYearAudioApiSrc(62),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 63,
  title: "Day 63 - Deborah, Gideon, and Deliverance",
  storagePath: getBibleYearAudioStoragePath(63),
  apiSrc: getBibleYearAudioApiSrc(63),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 64,
  title: "Day 64 - Gideon's Failure and Jephthah's Vow",
  storagePath: getBibleYearAudioStoragePath(64),
  apiSrc: getBibleYearAudioApiSrc(64),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 65,
  title: "Day 65 - Samson Begins His Troubled Calling",
  storagePath: getBibleYearAudioStoragePath(65),
  apiSrc: getBibleYearAudioApiSrc(65),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 66,
  title: "Day 66 - Samson Falls and Israel Unravels",
  storagePath: getBibleYearAudioStoragePath(66),
  apiSrc: getBibleYearAudioApiSrc(66),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 67,
  title: "Day 67 - Civil War and Ruth's Loyal Love",
  storagePath: getBibleYearAudioStoragePath(67),
  apiSrc: getBibleYearAudioApiSrc(67),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 68,
  title: "Day 68 - Redemption and Samuel's Birth",
  storagePath: getBibleYearAudioStoragePath(68),
  apiSrc: getBibleYearAudioApiSrc(68),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SIXTY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 69,
  title: "Day 69 - Samuel Hears God and the Ark Is Taken",
  storagePath: getBibleYearAudioStoragePath(69),
  apiSrc: getBibleYearAudioApiSrc(69),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_AUDIO: BibleYearAudioDay = {
  dayNumber: 70,
  title: "Day 70 - Israel Asks for a King",
  storagePath: getBibleYearAudioStoragePath(70),
  apiSrc: getBibleYearAudioApiSrc(70),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 71,
  title: "Day 71 - Saul's Rise and Early Failure",
  storagePath: getBibleYearAudioStoragePath(71),
  apiSrc: getBibleYearAudioApiSrc(71),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 72,
  title: "Day 72 - Saul Is Rejected and David Appears",
  storagePath: getBibleYearAudioStoragePath(72),
  apiSrc: getBibleYearAudioApiSrc(72),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 73,
  title: "Day 73 - David Flees From Saul",
  storagePath: getBibleYearAudioStoragePath(73),
  apiSrc: getBibleYearAudioApiSrc(73),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 74,
  title: "Day 74 - David Spares Saul",
  storagePath: getBibleYearAudioStoragePath(74),
  apiSrc: getBibleYearAudioApiSrc(74),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 75,
  title: "Day 75 - David in Exile",
  storagePath: getBibleYearAudioStoragePath(75),
  apiSrc: getBibleYearAudioApiSrc(75),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 76,
  title: "Day 76 - Saul Falls and David's Kingdom Begins",
  storagePath: getBibleYearAudioStoragePath(76),
  apiSrc: getBibleYearAudioApiSrc(76),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 77,
  title: "Day 77 - David's Throne and God's Promise",
  storagePath: getBibleYearAudioStoragePath(77),
  apiSrc: getBibleYearAudioApiSrc(77),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 78,
  title: "Day 78 - David's Victories and David's Sin",
  storagePath: getBibleYearAudioStoragePath(78),
  apiSrc: getBibleYearAudioApiSrc(78),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_SEVENTY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 79,
  title: "Day 79 - Consequences in David's House",
  storagePath: getBibleYearAudioStoragePath(79),
  apiSrc: getBibleYearAudioApiSrc(79),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_AUDIO: BibleYearAudioDay = {
  dayNumber: 80,
  title: "Day 80 - Absalom's Rebellion and David's Grief",
  storagePath: getBibleYearAudioStoragePath(80),
  apiSrc: getBibleYearAudioApiSrc(80),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 81,
  title: "Day 81 - David's Later Reign and Mighty Men",
  storagePath: getBibleYearAudioStoragePath(81),
  apiSrc: getBibleYearAudioApiSrc(81),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 82,
  title: "Day 82 - David's Census and Solomon's Wisdom",
  storagePath: getBibleYearAudioStoragePath(82),
  apiSrc: getBibleYearAudioApiSrc(82),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 83,
  title: "Day 83 - Solomon's Wisdom and Temple Preparations",
  storagePath: getBibleYearAudioStoragePath(83),
  apiSrc: getBibleYearAudioApiSrc(83),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 84,
  title: "Day 84 - Temple Glory and Solomon's Fall",
  storagePath: getBibleYearAudioStoragePath(84),
  apiSrc: getBibleYearAudioApiSrc(84),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 85,
  title: "Day 85 - The Kingdom Divides",
  storagePath: getBibleYearAudioStoragePath(85),
  apiSrc: getBibleYearAudioApiSrc(85),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 86,
  title: "Day 86 - Elijah Confronts Idolatry",
  storagePath: getBibleYearAudioStoragePath(86),
  apiSrc: getBibleYearAudioApiSrc(86),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 87,
  title: "Day 87 - Ahab's Fall and Elijah's Final Warnings",
  storagePath: getBibleYearAudioStoragePath(87),
  apiSrc: getBibleYearAudioApiSrc(87),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 88,
  title: "Day 88 - Elisha's Ministry Begins",
  storagePath: getBibleYearAudioStoragePath(88),
  apiSrc: getBibleYearAudioApiSrc(88),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_EIGHTY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 89,
  title: "Day 89 - Rescue, Siege, and Jehu's Judgment",
  storagePath: getBibleYearAudioStoragePath(89),
  apiSrc: getBibleYearAudioApiSrc(89),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_AUDIO: BibleYearAudioDay = {
  dayNumber: 90,
  title: "Day 90 - Jehu's Reform and Israel's Decline",
  storagePath: getBibleYearAudioStoragePath(90),
  apiSrc: getBibleYearAudioApiSrc(90),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 91,
  title: "Day 91 - Israel Falls to Assyria",
  storagePath: getBibleYearAudioStoragePath(91),
  apiSrc: getBibleYearAudioApiSrc(91),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 92,
  title: "Day 92 - Hezekiah's Faith and Manasseh's Evil",
  storagePath: getBibleYearAudioStoragePath(92),
  apiSrc: getBibleYearAudioApiSrc(92),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 93,
  title: "Day 93 - Josiah's Reform and Judah's Fall",
  storagePath: getBibleYearAudioStoragePath(93),
  apiSrc: getBibleYearAudioApiSrc(93),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 94,
  title: "Day 94 - The Family Line of God's People",
  storagePath: getBibleYearAudioStoragePath(94),
  apiSrc: getBibleYearAudioApiSrc(94),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 95,
  title: "Day 95 - Tribes, Genealogies, and Identity",
  storagePath: getBibleYearAudioStoragePath(95),
  apiSrc: getBibleYearAudioApiSrc(95),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_SIX_AUDIO: BibleYearAudioDay = {
  dayNumber: 96,
  title: "Day 96 - Return, Saul, and David's Supporters",
  storagePath: getBibleYearAudioStoragePath(96),
  apiSrc: getBibleYearAudioApiSrc(96),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_SEVEN_AUDIO: BibleYearAudioDay = {
  dayNumber: 97,
  title: "Day 97 - The Ark Comes to Jerusalem",
  storagePath: getBibleYearAudioStoragePath(97),
  apiSrc: getBibleYearAudioApiSrc(97),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_EIGHT_AUDIO: BibleYearAudioDay = {
  dayNumber: 98,
  title: "Day 98 - David's Covenant and Victories",
  storagePath: getBibleYearAudioStoragePath(98),
  apiSrc: getBibleYearAudioApiSrc(98),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_NINETY_NINE_AUDIO: BibleYearAudioDay = {
  dayNumber: 99,
  title: "Day 99 - The Temple Site and Priestly Order",
  storagePath: getBibleYearAudioStoragePath(99),
  apiSrc: getBibleYearAudioApiSrc(99),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_ONE_HUNDRED_AUDIO: BibleYearAudioDay = {
  dayNumber: 100,
  title: "Day 100 - Worship Teams and Temple Plans",
  storagePath: getBibleYearAudioStoragePath(100),
  apiSrc: getBibleYearAudioApiSrc(100),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_ONE_HUNDRED_ONE_AUDIO: BibleYearAudioDay = {
  dayNumber: 101,
  title: "Day 101 - David's Offering and Solomon's Temple",
  storagePath: getBibleYearAudioStoragePath(101),
  apiSrc: getBibleYearAudioApiSrc(101),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWO_AUDIO: BibleYearAudioDay = {
  dayNumber: 102,
  title: "Day 102 - Temple Dedication and God's Glory",
  storagePath: getBibleYearAudioStoragePath(102),
  apiSrc: getBibleYearAudioApiSrc(102),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THREE_AUDIO: BibleYearAudioDay = {
  dayNumber: 103,
  title: "Day 103 - Solomon's Reign and the Divided Kingdom",
  storagePath: getBibleYearAudioStoragePath(103),
  apiSrc: getBibleYearAudioApiSrc(103),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FOUR_AUDIO: BibleYearAudioDay = {
  dayNumber: 104,
  title: "Day 104 - Kings, Reform, and Returning to God",
  storagePath: getBibleYearAudioStoragePath(104),
  apiSrc: getBibleYearAudioApiSrc(104),
  estimatedDuration: "20-30 min",
};

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIVE_AUDIO: BibleYearAudioDay = {
  dayNumber: 105,
  title: "Day 105 - Asa, Jehoshaphat, and Trust",
  storagePath: getBibleYearAudioStoragePath(105),
  apiSrc: getBibleYearAudioApiSrc(105),
  estimatedDuration: "20-30 min",
};
