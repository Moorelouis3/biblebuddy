import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

const generatedNumbersTenToTwentyFivePersonalSections = buildGeneratedPersonalSections({
  book: "Numbers",
  notes: NUMBERS_DEEP_NOTES,
  chapters: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  icon: "⛺",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "The Children Of Israel",
    "In The Wilderness",
    "As The LORD Commanded Moses",
    "Before The LORD",
    "The Congregation",
    "The Tabernacle Of The Congregation",
  ],
});

const day41SectionIcons = [
  "🎺", "☁️", "🧭", "🚶", "📣", "🔥", "🍞", "🪶", "👂", "🙏",
  "🌬️", "🧺", "🕊️", "👑", "💬", "🤍", "⛺", "🧑‍⚖️", "🔎", "🍇",
  "🌿", "🏞️", "🛡️", "😨", "✅", "📜", "🧱", "🌄", "🕯️", "👥",
  "🪨", "🗺️", "⚖️", "🕰️",
];

const day42SectionIcons = [
  "😭", "🛑", "🗣️", "🙌", "🔥", "🕊️", "⚔️", "🏜️", "📜", "🧎",
  "🌾", "🍷", "🧺", "🧵", "🔵", "🚨", "👥", "⛺", "🪨", "🌍",
  "⚖️", "🕳️", "🔥", "🧼", "🛡️", "🙏", "🌿", "👑", "📣", "🪔",
  "🍞", "✨", "🧭", "🔎", "📦", "✅", "💡", "🌙",
];

const day43SectionIcons = [
  "👑", "⛪", "🛡️", "🎁", "🌾", "🍞", "🧂", "💧", "🐄", "🔥",
  "🧼", "🕊️", "⛺", "🚪", "🪦", "🏜️", "💦", "🪨", "😡", "⚖️",
  "🐍", "🩹", "⚔️", "🏞️", "🎶", "🌊", "🗺️", "📍", "🛕", "🌄",
  "✅", "🧭",
];

const day44SectionIcons = [
  "👀", "😨", "📨", "🧙", "🛑", "🗣️", "🐴", "⚔️", "👁️", "⛰️",
  "🔥", "🙏", "🌅", "🕊️", "👑", "🚫", "💬", "📜", "🌟", "🏕️",
  "⚖️", "🧭", "✨", "🦁", "🌊", "🏞️", "🪔", "🔭", "🧱", "🛡️",
  "🍽️", "💔", "⚠️", "🧎", "🗡️", "🕯️", "✅", "📍", "🚨",
];

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function buildSectionIconByReference(chapters: number[], icons: string[]) {
  return new Map(
    generatedNumbersTenToTwentyFivePersonalSections
      .filter((section) => chapters.includes(section.chapter))
      .map((section, index) => [section.reference, icons[index % icons.length]])
  );
}

const sectionIconByReference = new Map([
  ...buildSectionIconByReference([10, 11, 12, 13], day41SectionIcons),
  ...buildSectionIconByReference([14, 15, 16, 17], day42SectionIcons),
  ...buildSectionIconByReference([18, 19, 20, 21], day43SectionIcons),
  ...buildSectionIconByReference([22, 23, 24, 25], day44SectionIcons),
]);

sectionIconByReference.set("Numbers 16:4-7", "🙇");

function polishNumbersTenToTwentyFiveSection(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number]) {
  const icon = sectionIconByReference.get(section.reference);
  if (!icon) return section;

  return {
    ...section,
    icon,
    title: `${icon} ${stripLeadingEmoji(section.title)}`,
  };
}

export const NUMBERS_10_25_PERSONAL_SECTIONS = generatedNumbersTenToTwentyFivePersonalSections.map(polishNumbersTenToTwentyFiveSection);
