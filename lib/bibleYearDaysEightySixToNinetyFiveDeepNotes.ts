import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

type DaySection = {
  reference: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  heading: string;
  summary: string;
  teaching: readonly string[];
};

function makeLesson(dayNumber: number, title: string, reference: string, sections: readonly DaySection[], opening: string[], closing: string[]): BibleYearDailyLesson {
  return {
    dayNumber,
    title,
    reference,
    estimatedListenTime: "20-30 min",
    opening,
    sections: sections.map((section) => ({
      heading: section.heading,
      verseBlock: {
        reference: section.reference,
        chapter: section.chapter,
        startVerse: section.startVerse,
        endVerse: section.endVerse,
      },
      teaching: [...section.teaching],
    })),
    closing,
  };
}

function makeDeepNotes(title: string, chapters: string[], intro: string[], sections: readonly DaySection[], closing: string[]) {
  return `## Bible Reader Chapters Covered

${chapters.map((chapter) => `- ${chapter}`).join("\n")}

## Chapter Introduction

${intro.join("\n\n")}

## Study Notes

${sections.map((section) => `${section.reference} - ${section.heading}\n\n${section.teaching.join("\n\n")}`).join("\n\n")}

## Application & Reflection

${closing.join("\n\n")}

The big idea is this: ${title} helps the reader follow the kingdom story with clear attention to God, covenant, wisdom, sin, mercy, and the need for faithful leadership.`;
}

function makeStudySections(sections: readonly DaySection[]): BibleYearDeepStudySection[] {
  return sections.map((section) => ({
    reference: section.reference,
    title: section.heading,
    icon: "book",
    summary: section.summary,
    markdown: `## ${section.reference}

${section.teaching.join("\n\n")}

## What This Means

This section should be read slowly.

The kingdom story is not just listing events.

It is teaching the reader how leadership, worship, sin, wisdom, and covenant promises shape the people of God.`,
  }));
}

const DAY_86_SECTIONS: DaySection[] = [
  {
    reference: "1 Kings 16:1-6",
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    heading: "Then the Word of the LORD Came to Jehu",
    summary: "1 Kings 16:1-6 focuses on then the word of the lord came to jehu inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 16:1-6 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"Then the Word of the LORD Came to Jehu the Son of Hanani Against Baasha\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 16:7-12",
    chapter: 16,
    startVerse: 7,
    endVerse: 12,
    heading: "Also by the Hand of the Prophet Jehu",
    summary: "1 Kings 16:7-12 focuses on also by the hand of the prophet jehu inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 16:7-12 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"Also by the Hand of the Prophet Jehu the Son of Hanani Came the Word of the LORD Against Baasha\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 16:13-18",
    chapter: 16,
    startVerse: 13,
    endVerse: 18,
    heading: "For All the Sins of Baasha",
    summary: "1 Kings 16:13-18 focuses on for all the sins of baasha inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 16:13-18 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"🏙️ For All the Sins of Baasha\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 16:19-24",
    chapter: 16,
    startVerse: 19,
    endVerse: 24,
    heading: "For His Sins Which He Sinned in Doing Evil",
    summary: "1 Kings 16:19-24 focuses on for his sins which he sinned in doing evil inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 16:19-24 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"For His Sins Which He Sinned in Doing Evil in the Sight of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 16:25-30",
    chapter: 16,
    startVerse: 25,
    endVerse: 30,
    heading: "Omri Wrought Evil in the Eyes of the LORD",
    summary: "1 Kings 16:25-30 focuses on omri wrought evil in the eyes of the lord inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 16:25-30 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"But Omri Wrought Evil in the Eyes of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 16:31-34",
    chapter: 16,
    startVerse: 31,
    endVerse: 34,
    heading: "It Came to Pass",
    summary: "1 Kings 16:31-34 focuses on it came to pass inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 16:31-34 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 17:1-6",
    chapter: 17,
    startVerse: 1,
    endVerse: 6,
    heading: "Elijah the Tishbite",
    summary: "1 Kings 17:1-6 focuses on elijah the tishbite inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 17:1-6 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"Elijah the Tishbite\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 17:7-12",
    chapter: 17,
    startVerse: 7,
    endVerse: 12,
    heading: "It Came to Pass After a While",
    summary: "1 Kings 17:7-12 focuses on it came to pass after a while inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 17:7-12 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"It Came to Pass After a While\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 17:13-18",
    chapter: 17,
    startVerse: 13,
    endVerse: 18,
    heading: "Elijah Said unto Her",
    summary: "1 Kings 17:13-18 focuses on elijah said unto her inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 17:13-18 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"Elijah Said unto Her\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 17:19-24",
    chapter: 17,
    startVerse: 19,
    endVerse: 24,
    heading: "He Said unto Her",
    summary: "1 Kings 17:19-24 focuses on he said unto her inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 17:19-24 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"He Said unto Her\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 18:1-6",
    chapter: 18,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass After Many Days",
    summary: "1 Kings 18:1-6 focuses on it came to pass after many days inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 18:1-6 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"It Came to Pass After Many Days\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 18:7-12",
    chapter: 18,
    startVerse: 7,
    endVerse: 12,
    heading: "As Obadiah Was in the Way",
    summary: "1 Kings 18:7-12 focuses on as obadiah was in the way inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 18:7-12 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"As Obadiah Was in the Way\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 18:13-18",
    chapter: 18,
    startVerse: 13,
    endVerse: 18,
    heading: "Was It Not Told My Lord What I Did",
    summary: "1 Kings 18:13-18 focuses on was it not told my lord what i did inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 18:13-18 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"Was It Not Told My Lord What I Did When Jezebel Slew the Prophets of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 18:19-24",
    chapter: 18,
    startVerse: 19,
    endVerse: 24,
    heading: "Now Therefore Send",
    summary: "1 Kings 18:19-24 focuses on now therefore send inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 18:19-24 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"⚠️ Now Therefore Send\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 18:25-30",
    chapter: 18,
    startVerse: 25,
    endVerse: 30,
    heading: "Elijah Said unto the Prophets of Baal",
    summary: "1 Kings 18:25-30 focuses on elijah said unto the prophets of baal inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 18:25-30 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"Elijah Said unto the Prophets of Baal\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 18:31-36",
    chapter: 18,
    startVerse: 31,
    endVerse: 36,
    heading: "Elijah Took Twelve Stones",
    summary: "1 Kings 18:31-36 focuses on elijah took twelve stones inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 18:31-36 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"Elijah Took Twelve Stones\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 18:37-42",
    chapter: 18,
    startVerse: 37,
    endVerse: 42,
    heading: "That This People May Know That Thou Art",
    summary: "1 Kings 18:37-42 focuses on that this people may know that thou art inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 18:37-42 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"That This People May Know That Thou Art the LORD God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 18:43-46",
    chapter: 18,
    startVerse: 43,
    endVerse: 46,
    heading: "Said to His Servant",
    summary: "1 Kings 18:43-46 focuses on said to his servant inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 18:43-46 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"Said to His Servant\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 19:1-6",
    chapter: 19,
    startVerse: 1,
    endVerse: 6,
    heading: "Ahab Told Jezebel All That Elijah Had Done",
    summary: "1 Kings 19:1-6 focuses on ahab told jezebel all that elijah had done inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 19:1-6 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"🗡️ Ahab Told Jezebel All That Elijah Had Done\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 19:7-12",
    chapter: 19,
    startVerse: 7,
    endVerse: 12,
    heading: "The Angel of the LORD Came Again the Second",
    summary: "1 Kings 19:7-12 focuses on the angel of the lord came again the second inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 19:7-12 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"The Angel of the LORD Came Again the Second Time\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 19:13-18",
    chapter: 19,
    startVerse: 13,
    endVerse: 18,
    heading: "It Was So",
    summary: "1 Kings 19:13-18 focuses on it was so inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 19:13-18 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"It Was So\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 19:19-21",
    chapter: 19,
    startVerse: 19,
    endVerse: 21,
    heading: "So He Departed Thence",
    summary: "1 Kings 19:19-21 focuses on so he departed thence inside elijah confronts idolatry.",
    teaching: [
      "Read 1 Kings 19:19-21 as a focused part of Elijah Confronts Idolatry.",
      "The section begins with \"🛡️ So He Departed Thence\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_87_SECTIONS: DaySection[] = [
  {
    reference: "1 Kings 20:1-6",
    chapter: 20,
    startVerse: 1,
    endVerse: 6,
    heading: "Ben-hadad the King of Syria Gathered All His Host",
    summary: "1 Kings 20:1-6 focuses on ben-hadad the king of syria gathered all his host inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 20:1-6 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Ben-hadad the King of Syria Gathered All His Host Together\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 20:7-12",
    chapter: 20,
    startVerse: 7,
    endVerse: 12,
    heading: "Then the King of Israel Called All the Elders",
    summary: "1 Kings 20:7-12 focuses on then the king of israel called all the elders inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 20:7-12 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Then the King of Israel Called All the Elders of the Land\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 20:13-18",
    chapter: 20,
    startVerse: 13,
    endVerse: 18,
    heading: "There Came a Prophet unto Ahab King of Israel",
    summary: "1 Kings 20:13-18 focuses on there came a prophet unto ahab king of israel inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 20:13-18 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"There Came a Prophet unto Ahab King of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 20:19-24",
    chapter: 20,
    startVerse: 19,
    endVerse: 24,
    heading: "So These Young Men of the Princes",
    summary: "1 Kings 20:19-24 focuses on so these young men of the princes inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 20:19-24 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"🏙️ So These Young Men of the Princes of the Provinces Came Out of the City\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 20:25-30",
    chapter: 20,
    startVerse: 25,
    endVerse: 30,
    heading: "Number Thee an Army",
    summary: "1 Kings 20:25-30 focuses on number thee an army inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 20:25-30 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Number Thee an Army\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 20:31-36",
    chapter: 20,
    startVerse: 31,
    endVerse: 36,
    heading: "His Servants Said unto Him",
    summary: "1 Kings 20:31-36 focuses on his servants said unto him inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 20:31-36 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"His Servants Said unto Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 20:37-42",
    chapter: 20,
    startVerse: 37,
    endVerse: 42,
    heading: "Then He Found Another Man",
    summary: "1 Kings 20:37-42 focuses on then he found another man inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 20:37-42 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Then He Found Another Man\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 20:43",
    chapter: 20,
    startVerse: 43,
    endVerse: 43,
    heading: "The King of Israel Went to His House Heavy",
    summary: "1 Kings 20:43 focuses on the king of israel went to his house heavy inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 20:43 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"The King of Israel Went to His House Heavy and Displeased\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 21:1-6",
    chapter: 21,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass After These Things",
    summary: "1 Kings 21:1-6 focuses on it came to pass after these things inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 21:1-6 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"It Came to Pass After These Things\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 21:7-12",
    chapter: 21,
    startVerse: 7,
    endVerse: 12,
    heading: "Jezebel His Wife Said unto Him",
    summary: "1 Kings 21:7-12 focuses on jezebel his wife said unto him inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 21:7-12 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Jezebel His Wife Said unto Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 21:13-18",
    chapter: 21,
    startVerse: 13,
    endVerse: 18,
    heading: "There Came in Two Men",
    summary: "1 Kings 21:13-18 focuses on there came in two men inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 21:13-18 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"There Came in Two Men\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 21:19-24",
    chapter: 21,
    startVerse: 19,
    endVerse: 24,
    heading: "Thou Shalt Speak unto Him",
    summary: "1 Kings 21:19-24 focuses on thou shalt speak unto him inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 21:19-24 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Thou Shalt Speak unto Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 21:25-29",
    chapter: 21,
    startVerse: 25,
    endVerse: 29,
    heading: "There Was None Like unto Ahab",
    summary: "1 Kings 21:25-29 focuses on there was none like unto ahab inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 21:25-29 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"But There Was None Like unto Ahab\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:1-6",
    chapter: 22,
    startVerse: 1,
    endVerse: 6,
    heading: "They Continued Three Years Without War Between Syria",
    summary: "1 Kings 22:1-6 focuses on they continued three years without war between syria inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:1-6 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"🗡️ They Continued Three Years Without War Between Syria and Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:7-12",
    chapter: 22,
    startVerse: 7,
    endVerse: 12,
    heading: "Is There Not Here a Prophet of the LORD",
    summary: "1 Kings 22:7-12 focuses on is there not here a prophet of the lord inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:7-12 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Is There Not Here a Prophet of the LORD Besides\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:13-18",
    chapter: 22,
    startVerse: 13,
    endVerse: 18,
    heading: "The Messenger Was Gone to Call Micaiah Spake",
    summary: "1 Kings 22:13-18 focuses on the messenger was gone to call micaiah spake inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:13-18 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"🗡️ The Messenger That Was Gone to Call Micaiah Spake unto Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:19-24",
    chapter: 22,
    startVerse: 19,
    endVerse: 24,
    heading: "Hear Thou Therefore the Word of the LORD",
    summary: "1 Kings 22:19-24 focuses on hear thou therefore the word of the lord inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:19-24 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Hear Thou Therefore the Word of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:25-30",
    chapter: 22,
    startVerse: 25,
    endVerse: 30,
    heading: "Thou Shalt See in That Day",
    summary: "1 Kings 22:25-30 focuses on thou shalt see in that day inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:25-30 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"⛰️ Thou Shalt See in That Day\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:31-36",
    chapter: 22,
    startVerse: 31,
    endVerse: 36,
    heading: "The King of Syria Commanded His Thirty and Two",
    summary: "1 Kings 22:31-36 focuses on the king of syria commanded his thirty and two inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:31-36 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"But the King of Syria Commanded His Thirty and Two Captains That Had Rule Over His Chariots\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:37-42",
    chapter: 22,
    startVerse: 37,
    endVerse: 42,
    heading: "So the King Died",
    summary: "1 Kings 22:37-42 focuses on so the king died inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:37-42 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"So the King Died\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:43-48",
    chapter: 22,
    startVerse: 43,
    endVerse: 48,
    heading: "He Walked in All the Ways of Asa His",
    summary: "1 Kings 22:43-48 focuses on he walked in all the ways of asa his inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:43-48 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"He Walked in All the Ways of Asa His Father\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Kings 22:49-53",
    chapter: 22,
    startVerse: 49,
    endVerse: 53,
    heading: "Then Said Ahaziah the Son of Ahab unto Jehoshaphat",
    summary: "1 Kings 22:49-53 focuses on then said ahaziah the son of ahab unto jehoshaphat inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 1 Kings 22:49-53 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Then Said Ahaziah the Son of Ahab unto Jehoshaphat\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 1:1-6",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    heading: "Then Moab Rebelled Against Israel After the Death",
    summary: "2 Kings 1:1-6 focuses on then moab rebelled against israel after the death inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 2 Kings 1:1-6 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"Then Moab Rebelled Against Israel After the Death of Ahab\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 1:7-12",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    heading: "He Said unto Them",
    summary: "2 Kings 1:7-12 focuses on he said unto them inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 2 Kings 1:7-12 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"He Said unto Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 1:13-18",
    chapter: 1,
    startVerse: 13,
    endVerse: 18,
    heading: "He Sent Again a Captain of the Third Fifty",
    summary: "2 Kings 1:13-18 focuses on he sent again a captain of the third fifty inside ahab's fall and elijah's final warnings.",
    teaching: [
      "Read 2 Kings 1:13-18 as a focused part of Ahab's Fall and Elijah's Final Warnings.",
      "The section begins with \"⛰️ He Sent Again a Captain of the Third Fifty with His Fifty\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_88_SECTIONS: DaySection[] = [
  {
    reference: "2 Kings 2:1-6",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass",
    summary: "2 Kings 2:1-6 focuses on it came to pass inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 2:1-6 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 2:7-12",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    heading: "Fifty Men of the Sons of the Prophets Went",
    summary: "2 Kings 2:7-12 focuses on fifty men of the sons of the prophets went inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 2:7-12 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"Fifty Men of the Sons of the Prophets Went\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 2:13-18",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    heading: "He Took Up Also the Mantle of Elijah",
    summary: "2 Kings 2:13-18 focuses on he took up also the mantle of elijah inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 2:13-18 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"He Took Up Also the Mantle of Elijah That Fell from Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 2:19-24",
    chapter: 2,
    startVerse: 19,
    endVerse: 24,
    heading: "The Men of the City Said unto Elisha",
    summary: "2 Kings 2:19-24 focuses on the men of the city said unto elisha inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 2:19-24 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"🏙️ The Men of the City Said unto Elisha\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 2:25",
    chapter: 2,
    startVerse: 25,
    endVerse: 25,
    heading: "He Went from Thence to Mount Carmel",
    summary: "2 Kings 2:25 focuses on he went from thence to mount carmel inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 2:25 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"He Went from Thence to Mount Carmel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 3:1-6",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    heading: "Now Jehoram the Son of Ahab Began to Reign",
    summary: "2 Kings 3:1-6 focuses on now jehoram the son of ahab began to reign inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 3:1-6 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"Now Jehoram the Son of Ahab Began to Reign Over Israel in Samaria the Eighteenth Year of Jehoshaphat King of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 3:7-12",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    heading: "He Went and Sent to Jehoshaphat the King",
    summary: "2 Kings 3:7-12 focuses on he went and sent to jehoshaphat the king inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 3:7-12 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"He Went and Sent to Jehoshaphat the King of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 3:13-18",
    chapter: 3,
    startVerse: 13,
    endVerse: 18,
    heading: "Elisha Said unto the King of Israel",
    summary: "2 Kings 3:13-18 focuses on elisha said unto the king of israel inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 3:13-18 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"Elisha Said unto the King of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 3:19-24",
    chapter: 3,
    startVerse: 19,
    endVerse: 24,
    heading: "Ye Shall Smite Every Fenced City",
    summary: "2 Kings 3:19-24 focuses on ye shall smite every fenced city inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 3:19-24 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"🏙️ Ye Shall Smite Every Fenced City\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 3:25-27",
    chapter: 3,
    startVerse: 25,
    endVerse: 27,
    heading: "They Beat Down the Cities",
    summary: "2 Kings 3:25-27 focuses on they beat down the cities inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 3:25-27 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"🗡️ They Beat Down the Cities\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 4:1-6",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    heading: "Now There Cried a Certain Woman of the Wives",
    summary: "2 Kings 4:1-6 focuses on now there cried a certain woman of the wives inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 4:1-6 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"⚠️ Now There Cried a Certain Woman of the Wives of the Sons of the Prophets unto Elisha\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 4:7-12",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    heading: "Then She Came and Told the Man of God",
    summary: "2 Kings 4:7-12 focuses on then she came and told the man of god inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 4:7-12 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"Then She Came and Told the Man of God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 4:13-18",
    chapter: 4,
    startVerse: 13,
    endVerse: 18,
    heading: "He Said unto Him",
    summary: "2 Kings 4:13-18 focuses on he said unto him inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 4:13-18 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"He Said unto Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 4:19-24",
    chapter: 4,
    startVerse: 19,
    endVerse: 24,
    heading: "He Said unto His Father",
    summary: "2 Kings 4:19-24 focuses on he said unto his father inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 4:19-24 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"He Said unto His Father\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 4:25-30",
    chapter: 4,
    startVerse: 25,
    endVerse: 30,
    heading: "So She Went and Came unto the Man",
    summary: "2 Kings 4:25-30 focuses on so she went and came unto the man inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 4:25-30 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"So She Went and Came unto the Man of God to Mount Carmel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 4:31-36",
    chapter: 4,
    startVerse: 31,
    endVerse: 36,
    heading: "Gehazi Passed on Before Them",
    summary: "2 Kings 4:31-36 focuses on gehazi passed on before them inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 4:31-36 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"Gehazi Passed on Before Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 4:37-42",
    chapter: 4,
    startVerse: 37,
    endVerse: 42,
    heading: "Then She Went",
    summary: "2 Kings 4:37-42 focuses on then she went inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 4:37-42 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"⚠️ Then She Went in\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 4:43-44",
    chapter: 4,
    startVerse: 43,
    endVerse: 44,
    heading: "His Servitor Said",
    summary: "2 Kings 4:43-44 focuses on his servitor said inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 4:43-44 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"His Servitor Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 5:1-6",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    heading: "Captain of the Host of the King of Syria",
    summary: "2 Kings 5:1-6 focuses on captain of the host of the king of syria inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 5:1-6 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"Captain of the Host of the King of Syria\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 5:7-12",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    heading: "It Came to Pass",
    summary: "2 Kings 5:7-12 focuses on it came to pass inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 5:7-12 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 5:13-18",
    chapter: 5,
    startVerse: 13,
    endVerse: 18,
    heading: "His Servants Came Near",
    summary: "2 Kings 5:13-18 focuses on his servants came near inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 5:13-18 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"🗡️ His Servants Came Near\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 5:19-24",
    chapter: 5,
    startVerse: 19,
    endVerse: 24,
    heading: "He Said unto Him",
    summary: "2 Kings 5:19-24 focuses on he said unto him inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 5:19-24 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"He Said unto Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 5:25-27",
    chapter: 5,
    startVerse: 25,
    endVerse: 27,
    heading: "He Went in",
    summary: "2 Kings 5:25-27 focuses on he went in inside elisha's ministry begins.",
    teaching: [
      "Read 2 Kings 5:25-27 as a focused part of Elisha's Ministry Begins.",
      "The section begins with \"But He Went in\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_89_SECTIONS: DaySection[] = [
  {
    reference: "2 Kings 6:1-6",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    heading: "The Sons of the Prophets Said unto Elisha",
    summary: "2 Kings 6:1-6 focuses on the sons of the prophets said unto elisha inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 6:1-6 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"The Sons of the Prophets Said unto Elisha\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 6:7-12",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    heading: "Therefore Said He",
    summary: "2 Kings 6:7-12 focuses on therefore said he inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 6:7-12 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Therefore Said He\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 6:13-18",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    heading: "Go and Spy Where He Is",
    summary: "2 Kings 6:13-18 focuses on go and spy where he is inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 6:13-18 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"⛰️ Go and Spy Where He Is\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 6:19-24",
    chapter: 6,
    startVerse: 19,
    endVerse: 24,
    heading: "Elisha Said unto Them",
    summary: "2 Kings 6:19-24 focuses on elisha said unto them inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 6:19-24 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Elisha Said unto Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 6:25-30",
    chapter: 6,
    startVerse: 25,
    endVerse: 30,
    heading: "There Was a Great Famine in Samaria",
    summary: "2 Kings 6:25-30 focuses on there was a great famine in samaria inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 6:25-30 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"There Was a Great Famine in Samaria\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 6:31-33",
    chapter: 6,
    startVerse: 31,
    endVerse: 33,
    heading: "Then He Said",
    summary: "2 Kings 6:31-33 focuses on then he said inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 6:31-33 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Then He Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 7:1-6",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    heading: "Then Elisha Said",
    summary: "2 Kings 7:1-6 focuses on then elisha said inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 7:1-6 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Then Elisha Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 7:7-12",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    heading: "Wherefore They Arose and Fled in the Twilight",
    summary: "2 Kings 7:7-12 focuses on wherefore they arose and fled in the twilight inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 7:7-12 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Wherefore They Arose and Fled in the Twilight\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 7:13-18",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    heading: "One of His Servants Answered and Said",
    summary: "2 Kings 7:13-18 focuses on one of his servants answered and said inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 7:13-18 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"One of His Servants Answered and Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 7:19-20",
    chapter: 7,
    startVerse: 19,
    endVerse: 20,
    heading: "That Lord Answered the Man of God",
    summary: "2 Kings 7:19-20 focuses on that lord answered the man of god inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 7:19-20 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"That Lord Answered the Man of God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 8:1-6",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    heading: "Then Spake Elisha unto the Woman",
    summary: "2 Kings 8:1-6 focuses on then spake elisha unto the woman inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 8:1-6 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Then Spake Elisha unto the Woman\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 8:7-12",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    heading: "Elisha Came to Damascus",
    summary: "2 Kings 8:7-12 focuses on elisha came to damascus inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 8:7-12 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Elisha Came to Damascus\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 8:13-18",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    heading: "Is Thy Servant a Dog",
    summary: "2 Kings 8:13-18 focuses on is thy servant a dog inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 8:13-18 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Is Thy Servant a Dog\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 8:19-24",
    chapter: 8,
    startVerse: 19,
    endVerse: 24,
    heading: "Yet the LORD Would Not Destroy Judah for David",
    summary: "2 Kings 8:19-24 focuses on yet the lord would not destroy judah for david inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 8:19-24 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Yet the LORD Would Not Destroy Judah for David His Servant’s Sake\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 8:25-29",
    chapter: 8,
    startVerse: 25,
    endVerse: 29,
    heading: "In the Twelfth Year of Joram the Son",
    summary: "2 Kings 8:25-29 focuses on in the twelfth year of joram the son inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 8:25-29 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"In the Twelfth Year of Joram the Son of Ahab King of Israel Did Ahaziah the Son of Jehoram King of Judah Begin to Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 9:1-6",
    chapter: 9,
    startVerse: 1,
    endVerse: 6,
    heading: "Elisha the Prophet Called One of the Children",
    summary: "2 Kings 9:1-6 focuses on elisha the prophet called one of the children inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 9:1-6 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Elisha the Prophet Called One of the Children of the Prophets\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 9:7-12",
    chapter: 9,
    startVerse: 7,
    endVerse: 12,
    heading: "Thou Shalt Smite the House of Ahab Thy Master",
    summary: "2 Kings 9:7-12 focuses on thou shalt smite the house of ahab thy master inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 9:7-12 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Thou Shalt Smite the House of Ahab Thy Master\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 9:13-18",
    chapter: 9,
    startVerse: 13,
    endVerse: 18,
    heading: "Then They Hasted",
    summary: "2 Kings 9:13-18 focuses on then they hasted inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 9:13-18 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"🗡️ Then They Hasted\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 9:19-24",
    chapter: 9,
    startVerse: 19,
    endVerse: 24,
    heading: "Then He Sent Out a Second on Horseback",
    summary: "2 Kings 9:19-24 focuses on then he sent out a second on horseback inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 9:19-24 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Then He Sent Out a Second on Horseback\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 9:25-30",
    chapter: 9,
    startVerse: 25,
    endVerse: 30,
    heading: "Then Said Jehu to Bidkar His Captain",
    summary: "2 Kings 9:25-30 focuses on then said jehu to bidkar his captain inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 9:25-30 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"Then Said Jehu to Bidkar His Captain\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 9:31-36",
    chapter: 9,
    startVerse: 31,
    endVerse: 36,
    heading: "As Jehu Entered in at the Gate",
    summary: "2 Kings 9:31-36 focuses on as jehu entered in at the gate inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 9:31-36 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"As Jehu Entered in at the Gate\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 9:37",
    chapter: 9,
    startVerse: 37,
    endVerse: 37,
    heading: "The Carcase of Jezebel Shall Be as Dung Upon",
    summary: "2 Kings 9:37 focuses on the carcase of jezebel shall be as dung upon inside rescue, siege, and jehu's judgment.",
    teaching: [
      "Read 2 Kings 9:37 as a focused part of Rescue, Siege, and Jehu's Judgment.",
      "The section begins with \"The Carcase of Jezebel Shall Be as Dung Upon the Face of the Field in the Portion of Jezreel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_90_SECTIONS: DaySection[] = [
  {
    reference: "2 Kings 10:1-6",
    chapter: 10,
    startVerse: 1,
    endVerse: 6,
    heading: "Ahab Had Seventy Sons in Samaria",
    summary: "2 Kings 10:1-6 focuses on ahab had seventy sons in samaria inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 10:1-6 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"🏙️ Ahab Had Seventy Sons in Samaria\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 10:7-12",
    chapter: 10,
    startVerse: 7,
    endVerse: 12,
    heading: "It Came to Pass",
    summary: "2 Kings 10:7-12 focuses on it came to pass inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 10:7-12 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 10:13-18",
    chapter: 10,
    startVerse: 13,
    endVerse: 18,
    heading: "Jehu Met with the Brethren of Ahaziah King",
    summary: "2 Kings 10:13-18 focuses on jehu met with the brethren of ahaziah king inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 10:13-18 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"Jehu Met with the Brethren of Ahaziah King of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 10:19-24",
    chapter: 10,
    startVerse: 19,
    endVerse: 24,
    heading: "Now Therefore Call unto Me All the Prophets",
    summary: "2 Kings 10:19-24 focuses on now therefore call unto me all the prophets inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 10:19-24 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"Now Therefore Call unto Me All the Prophets of Baal\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 10:25-30",
    chapter: 10,
    startVerse: 25,
    endVerse: 30,
    heading: "It Came to Pass",
    summary: "2 Kings 10:25-30 focuses on it came to pass inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 10:25-30 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 10:31-36",
    chapter: 10,
    startVerse: 31,
    endVerse: 36,
    heading: "Jehu Took No Heed to Walk in the Law",
    summary: "2 Kings 10:31-36 focuses on jehu took no heed to walk in the law inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 10:31-36 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"But Jehu Took No Heed to Walk in the Law of the LORD God of Israel with All His Heart\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 11:1-6",
    chapter: 11,
    startVerse: 1,
    endVerse: 6,
    heading: "When Athaliah the Mother of Ahaziah Saw That Her",
    summary: "2 Kings 11:1-6 focuses on when athaliah the mother of ahaziah saw that her inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 11:1-6 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"When Athaliah the Mother of Ahaziah Saw That Her Son Was Dead\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 11:7-12",
    chapter: 11,
    startVerse: 7,
    endVerse: 12,
    heading: "Two Parts of All You That Go Forth",
    summary: "2 Kings 11:7-12 focuses on two parts of all you that go forth inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 11:7-12 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"Two Parts of All You That Go Forth on the Sabbath\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 11:13-18",
    chapter: 11,
    startVerse: 13,
    endVerse: 18,
    heading: "When Athaliah Heard the Noise of the Guard",
    summary: "2 Kings 11:13-18 focuses on when athaliah heard the noise of the guard inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 11:13-18 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"When Athaliah Heard the Noise of the Guard and of the People\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 11:19-21",
    chapter: 11,
    startVerse: 19,
    endVerse: 21,
    heading: "He Took the Rulers Over Hundreds",
    summary: "2 Kings 11:19-21 focuses on he took the rulers over hundreds inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 11:19-21 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"He Took the Rulers Over Hundreds\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 12:1-6",
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    heading: "In the Seventh Year of Jehu Jehoash Began",
    summary: "2 Kings 12:1-6 focuses on in the seventh year of jehu jehoash began inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 12:1-6 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"In the Seventh Year of Jehu Jehoash Began to Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 12:7-12",
    chapter: 12,
    startVerse: 7,
    endVerse: 12,
    heading: "Then King Jehoash Called for Jehoiada the Priest",
    summary: "2 Kings 12:7-12 focuses on then king jehoash called for jehoiada the priest inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 12:7-12 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"Then King Jehoash Called for Jehoiada the Priest\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 12:13-18",
    chapter: 12,
    startVerse: 13,
    endVerse: 18,
    heading: "Howbeit There Were Not Made for the House",
    summary: "2 Kings 12:13-18 focuses on howbeit there were not made for the house inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 12:13-18 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"Howbeit There Were Not Made for the House of the LORD Bowls of Silver\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 12:19-21",
    chapter: 12,
    startVerse: 19,
    endVerse: 21,
    heading: "The Rest of the Acts of Joash",
    summary: "2 Kings 12:19-21 focuses on the rest of the acts of joash inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 12:19-21 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"⚠️ The Rest of the Acts of Joash\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 13:1-6",
    chapter: 13,
    startVerse: 1,
    endVerse: 6,
    heading: "In the Three and Twentieth Year of Joash",
    summary: "2 Kings 13:1-6 focuses on in the three and twentieth year of joash inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 13:1-6 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"In the Three and Twentieth Year of Joash the Son of Ahaziah King of Judah Jehoahaz the Son of Jehu Began to Reign Over Israel in Samaria\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 13:7-12",
    chapter: 13,
    startVerse: 7,
    endVerse: 12,
    heading: "Neither Did He Leave of the People to Jehoahaz",
    summary: "2 Kings 13:7-12 focuses on neither did he leave of the people to jehoahaz inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 13:7-12 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"Neither Did He Leave of the People to Jehoahaz but Fifty Horsemen\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 13:13-18",
    chapter: 13,
    startVerse: 13,
    endVerse: 18,
    heading: "Joash Slept with His Fathers",
    summary: "2 Kings 13:13-18 focuses on joash slept with his fathers inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 13:13-18 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"Joash Slept with His Fathers\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 13:19-24",
    chapter: 13,
    startVerse: 19,
    endVerse: 24,
    heading: "The Man of God Was Wroth with Him",
    summary: "2 Kings 13:19-24 focuses on the man of god was wroth with him inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 13:19-24 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"The Man of God Was Wroth with Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 13:25",
    chapter: 13,
    startVerse: 25,
    endVerse: 25,
    heading: "Jehoash the Son of Jehoahaz Took Again Out",
    summary: "2 Kings 13:25 focuses on jehoash the son of jehoahaz took again out inside jehu's reform and israel's decline.",
    teaching: [
      "Read 2 Kings 13:25 as a focused part of Jehu's Reform and Israel's Decline.",
      "The section begins with \"Jehoash the Son of Jehoahaz Took Again Out of the Hand of Ben-hadad the Son of Hazael the Cities\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_91_SECTIONS: DaySection[] = [
  {
    reference: "2 Kings 14:1-6",
    chapter: 14,
    startVerse: 1,
    endVerse: 6,
    heading: "In the Second Year of Joash Son of Jehoahaz",
    summary: "2 Kings 14:1-6 focuses on in the second year of joash son of jehoahaz inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 14:1-6 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"In the Second Year of Joash Son of Jehoahaz King of Israel Reigned Amaziah the Son of Joash King of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 14:7-12",
    chapter: 14,
    startVerse: 7,
    endVerse: 12,
    heading: "He Slew of Edom in the Valley of Salt",
    summary: "2 Kings 14:7-12 focuses on he slew of edom in the valley of salt inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 14:7-12 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"He Slew of Edom in the Valley of Salt Ten Thousand\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 14:13-18",
    chapter: 14,
    startVerse: 13,
    endVerse: 18,
    heading: "Jehoash King of Israel Took Amaziah King of Judah",
    summary: "2 Kings 14:13-18 focuses on jehoash king of israel took amaziah king of judah inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 14:13-18 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"Jehoash King of Israel Took Amaziah King of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 14:19-24",
    chapter: 14,
    startVerse: 19,
    endVerse: 24,
    heading: "Now They Made a Conspiracy Against Him in Jerusalem",
    summary: "2 Kings 14:19-24 focuses on now they made a conspiracy against him in jerusalem inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 14:19-24 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"🏙️ Now They Made a Conspiracy Against Him in Jerusalem\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 14:25-29",
    chapter: 14,
    startVerse: 25,
    endVerse: 29,
    heading: "He Restored the Coast of Israel from the Entering",
    summary: "2 Kings 14:25-29 focuses on he restored the coast of israel from the entering inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 14:25-29 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"⚠️ He Restored the Coast of Israel from the Entering of Hamath unto the Sea of the Plain\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 15:1-6",
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    heading: "In the Twenty and Seventh Year of Jeroboam King",
    summary: "2 Kings 15:1-6 focuses on in the twenty and seventh year of jeroboam king inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 15:1-6 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"In the Twenty and Seventh Year of Jeroboam King of Israel Began Azariah Son of Amaziah King of Judah to Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 15:7-12",
    chapter: 15,
    startVerse: 7,
    endVerse: 12,
    heading: "So Azariah Slept with His Fathers",
    summary: "2 Kings 15:7-12 focuses on so azariah slept with his fathers inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 15:7-12 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"🏙️ So Azariah Slept with His Fathers\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 15:13-18",
    chapter: 15,
    startVerse: 13,
    endVerse: 18,
    heading: "Shallum the Son of Jabesh Began to Reign",
    summary: "2 Kings 15:13-18 focuses on shallum the son of jabesh began to reign inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 15:13-18 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"Shallum the Son of Jabesh Began to Reign in the Nine and Thirtieth Year of Uzziah King of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 15:19-24",
    chapter: 15,
    startVerse: 19,
    endVerse: 24,
    heading: "Pul the King of Assyria Came Against the Land",
    summary: "2 Kings 15:19-24 focuses on pul the king of assyria came against the land inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 15:19-24 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"Pul the King of Assyria Came Against the Land\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 15:25-30",
    chapter: 15,
    startVerse: 25,
    endVerse: 30,
    heading: "Pekah the Son of Remaliah",
    summary: "2 Kings 15:25-30 focuses on pekah the son of remaliah inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 15:25-30 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"⛰️ But Pekah the Son of Remaliah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 15:31-36",
    chapter: 15,
    startVerse: 31,
    endVerse: 36,
    heading: "The Rest of the Acts of Pekah",
    summary: "2 Kings 15:31-36 focuses on the rest of the acts of pekah inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 15:31-36 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"🗡️ The Rest of the Acts of Pekah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 15:37-38",
    chapter: 15,
    startVerse: 37,
    endVerse: 38,
    heading: "In Those Days the LORD Began to Send Against",
    summary: "2 Kings 15:37-38 focuses on in those days the lord began to send against inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 15:37-38 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"In Those Days the LORD Began to Send Against Judah Rezin the King of Syria\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 16:1-6",
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    heading: "In the Seventeenth Year of Pekah the Son",
    summary: "2 Kings 16:1-6 focuses on in the seventeenth year of pekah the son inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 16:1-6 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"In the Seventeenth Year of Pekah the Son of Remaliah Ahaz the Son of Jotham King of Judah Began to Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 16:7-12",
    chapter: 16,
    startVerse: 7,
    endVerse: 12,
    heading: "So Ahaz Sent Messengers to Tiglath-pileser King of Assyria",
    summary: "2 Kings 16:7-12 focuses on so ahaz sent messengers to tiglath-pileser king of assyria inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 16:7-12 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"So Ahaz Sent Messengers to Tiglath-pileser King of Assyria\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 16:13-18",
    chapter: 16,
    startVerse: 13,
    endVerse: 18,
    heading: "He Burnt His Burnt Offering and His Meat Offering",
    summary: "2 Kings 16:13-18 focuses on he burnt his burnt offering and his meat offering inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 16:13-18 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"⛰️ He Burnt His Burnt Offering and His Meat Offering\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 16:19-20",
    chapter: 16,
    startVerse: 19,
    endVerse: 20,
    heading: "Now the Rest of the Acts of Ahaz Which",
    summary: "2 Kings 16:19-20 focuses on now the rest of the acts of ahaz which inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 16:19-20 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"Now the Rest of the Acts of Ahaz Which He Did\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 17:1-6",
    chapter: 17,
    startVerse: 1,
    endVerse: 6,
    heading: "In the Twelfth Year of Ahaz King of Judah",
    summary: "2 Kings 17:1-6 focuses on in the twelfth year of ahaz king of judah inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 17:1-6 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"In the Twelfth Year of Ahaz King of Judah Began Hoshea the Son of Elah to Reign in Samaria Over Israel Nine Years\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 17:7-12",
    chapter: 17,
    startVerse: 7,
    endVerse: 12,
    heading: "For So It Was",
    summary: "2 Kings 17:7-12 focuses on for so it was inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 17:7-12 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"For So It Was\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 17:13-18",
    chapter: 17,
    startVerse: 13,
    endVerse: 18,
    heading: "Yet the LORD Testified Against Israel",
    summary: "2 Kings 17:13-18 focuses on yet the lord testified against israel inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 17:13-18 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"Yet the LORD Testified Against Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 17:19-24",
    chapter: 17,
    startVerse: 19,
    endVerse: 24,
    heading: "Also Judah Kept Not the Commandments of the LORD",
    summary: "2 Kings 17:19-24 focuses on also judah kept not the commandments of the lord inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 17:19-24 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"Also Judah Kept Not the Commandments of the LORD Their God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 17:25-30",
    chapter: 17,
    startVerse: 25,
    endVerse: 30,
    heading: "So It Was at the Beginning of Their Dwelling",
    summary: "2 Kings 17:25-30 focuses on so it was at the beginning of their dwelling inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 17:25-30 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"So It Was at the Beginning of Their Dwelling There\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 17:31-36",
    chapter: 17,
    startVerse: 31,
    endVerse: 36,
    heading: "The Avites Made Nibhaz and Tartak",
    summary: "2 Kings 17:31-36 focuses on the avites made nibhaz and tartak inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 17:31-36 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"The Avites Made Nibhaz and Tartak\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 17:37-41",
    chapter: 17,
    startVerse: 37,
    endVerse: 41,
    heading: "Which He Wrote for You",
    summary: "2 Kings 17:37-41 focuses on which he wrote for you inside israel falls to assyria.",
    teaching: [
      "Read 2 Kings 17:37-41 as a focused part of Israel Falls to Assyria.",
      "The section begins with \"Which He Wrote for You\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_92_SECTIONS: DaySection[] = [
  {
    reference: "2 Kings 18:1-6",
    chapter: 18,
    startVerse: 1,
    endVerse: 6,
    heading: "Now It Came to Pass in the Third Year",
    summary: "2 Kings 18:1-6 focuses on now it came to pass in the third year inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 18:1-6 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Now It Came to Pass in the Third Year of Hoshea Son of Elah King of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 18:7-12",
    chapter: 18,
    startVerse: 7,
    endVerse: 12,
    heading: "The LORD Was with Him",
    summary: "2 Kings 18:7-12 focuses on the lord was with him inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 18:7-12 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"The LORD Was with Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 18:13-18",
    chapter: 18,
    startVerse: 13,
    endVerse: 18,
    heading: "Now in the Fourteenth Year of King Hezekiah Did",
    summary: "2 Kings 18:13-18 focuses on now in the fourteenth year of king hezekiah did inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 18:13-18 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Now in the Fourteenth Year of King Hezekiah Did Sennacherib King of Assyria Come Up Against All the Fenced Cities of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 18:19-24",
    chapter: 18,
    startVerse: 19,
    endVerse: 24,
    heading: "Rab-shakeh Said unto Them",
    summary: "2 Kings 18:19-24 focuses on rab-shakeh said unto them inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 18:19-24 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Rab-shakeh Said unto Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 18:25-30",
    chapter: 18,
    startVerse: 25,
    endVerse: 30,
    heading: "Am I Now Come Up Without the LORD Against",
    summary: "2 Kings 18:25-30 focuses on am i now come up without the lord against inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 18:25-30 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Am I Now Come Up Without the LORD Against This Place to Destroy It\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 18:31-36",
    chapter: 18,
    startVerse: 31,
    endVerse: 36,
    heading: "Hearken Not to Hezekiah",
    summary: "2 Kings 18:31-36 focuses on hearken not to hezekiah inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 18:31-36 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Hearken Not to Hezekiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 18:37",
    chapter: 18,
    startVerse: 37,
    endVerse: 37,
    heading: "Then Came Eliakim the Son of Hilkiah",
    summary: "2 Kings 18:37 focuses on then came eliakim the son of hilkiah inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 18:37 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Then Came Eliakim the Son of Hilkiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 19:1-6",
    chapter: 19,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass",
    summary: "2 Kings 19:1-6 focuses on it came to pass inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 19:1-6 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 19:7-12",
    chapter: 19,
    startVerse: 7,
    endVerse: 12,
    heading: "I Will Send a Blast Upon Him",
    summary: "2 Kings 19:7-12 focuses on i will send a blast upon him inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 19:7-12 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"I Will Send a Blast Upon Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 19:13-18",
    chapter: 19,
    startVerse: 13,
    endVerse: 18,
    heading: "Where Is the King of Hamath",
    summary: "2 Kings 19:13-18 focuses on where is the king of hamath inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 19:13-18 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Where Is the King of Hamath\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 19:19-24",
    chapter: 19,
    startVerse: 19,
    endVerse: 24,
    heading: "O LORD Our God",
    summary: "2 Kings 19:19-24 focuses on o lord our god inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 19:19-24 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"O LORD Our God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 19:25-30",
    chapter: 19,
    startVerse: 25,
    endVerse: 30,
    heading: "Hast Thou Not Heard Long Ago How I Have",
    summary: "2 Kings 19:25-30 focuses on hast thou not heard long ago how i have inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 19:25-30 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"⚠️ Hast Thou Not Heard Long Ago How I Have Done It\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 19:31-36",
    chapter: 19,
    startVerse: 31,
    endVerse: 36,
    heading: "For Out of Jerusalem Shall Go Forth a Remnant",
    summary: "2 Kings 19:31-36 focuses on for out of jerusalem shall go forth a remnant inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 19:31-36 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"🏙️ For Out of Jerusalem Shall Go Forth a Remnant\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 19:37",
    chapter: 19,
    startVerse: 37,
    endVerse: 37,
    heading: "It Came to Pass",
    summary: "2 Kings 19:37 focuses on it came to pass inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 19:37 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 20:1-6",
    chapter: 20,
    startVerse: 1,
    endVerse: 6,
    heading: "In Those Days Was Hezekiah Sick unto Death",
    summary: "2 Kings 20:1-6 focuses on in those days was hezekiah sick unto death inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 20:1-6 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"🏙️ In Those Days Was Hezekiah Sick unto Death\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 20:7-12",
    chapter: 20,
    startVerse: 7,
    endVerse: 12,
    heading: "Take a Lump of Figs",
    summary: "2 Kings 20:7-12 focuses on take a lump of figs inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 20:7-12 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"🗡️ Take a Lump of Figs\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 20:13-18",
    chapter: 20,
    startVerse: 13,
    endVerse: 18,
    heading: "Hezekiah Hearkened unto Them",
    summary: "2 Kings 20:13-18 focuses on hezekiah hearkened unto them inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 20:13-18 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Hezekiah Hearkened unto Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 20:19-21",
    chapter: 20,
    startVerse: 19,
    endVerse: 21,
    heading: "Then Said Hezekiah unto Isaiah",
    summary: "2 Kings 20:19-21 focuses on then said hezekiah unto isaiah inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 20:19-21 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Then Said Hezekiah unto Isaiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 21:1-6",
    chapter: 21,
    startVerse: 1,
    endVerse: 6,
    heading: "Manasseh Was Twelve Years Old When He Began",
    summary: "2 Kings 21:1-6 focuses on manasseh was twelve years old when he began inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 21:1-6 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Manasseh Was Twelve Years Old When He Began to Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 21:7-12",
    chapter: 21,
    startVerse: 7,
    endVerse: 12,
    heading: "He Set a Graven Image of the Grove",
    summary: "2 Kings 21:7-12 focuses on he set a graven image of the grove inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 21:7-12 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"He Set a Graven Image of the Grove That He Had Made in the House\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 21:13-18",
    chapter: 21,
    startVerse: 13,
    endVerse: 18,
    heading: "I Will Stretch Over Jerusalem the Line of Samaria",
    summary: "2 Kings 21:13-18 focuses on i will stretch over jerusalem the line of samaria inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 21:13-18 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"🏙️ I Will Stretch Over Jerusalem the Line of Samaria\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 21:19-24",
    chapter: 21,
    startVerse: 19,
    endVerse: 24,
    heading: "Amon Was Twenty and Two Years Old When He",
    summary: "2 Kings 21:19-24 focuses on amon was twenty and two years old when he inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 21:19-24 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Amon Was Twenty and Two Years Old When He Began to Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 21:25-26",
    chapter: 21,
    startVerse: 25,
    endVerse: 26,
    heading: "Now the Rest of the Acts of Amon Which",
    summary: "2 Kings 21:25-26 focuses on now the rest of the acts of amon which inside hezekiah's faith and manasseh's evil.",
    teaching: [
      "Read 2 Kings 21:25-26 as a focused part of Hezekiah's Faith and Manasseh's Evil.",
      "The section begins with \"Now the Rest of the Acts of Amon Which He Did\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_93_SECTIONS: DaySection[] = [
  {
    reference: "2 Kings 22:1-6",
    chapter: 22,
    startVerse: 1,
    endVerse: 6,
    heading: "Josiah Was Eight Years Old When He Began",
    summary: "2 Kings 22:1-6 focuses on josiah was eight years old when he began inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 22:1-6 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"Josiah Was Eight Years Old When He Began to Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 22:7-12",
    chapter: 22,
    startVerse: 7,
    endVerse: 12,
    heading: "Howbeit There Was No Reckoning Made with Them",
    summary: "2 Kings 22:7-12 focuses on howbeit there was no reckoning made with them inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 22:7-12 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"🗡️ Howbeit There Was No Reckoning Made with Them of the Money That Was Delivered into Their Hand\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 22:13-18",
    chapter: 22,
    startVerse: 13,
    endVerse: 18,
    heading: "Enquire of the LORD for Me",
    summary: "2 Kings 22:13-18 focuses on enquire of the lord for me inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 22:13-18 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"Enquire of the LORD for Me\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 22:19-20",
    chapter: 22,
    startVerse: 19,
    endVerse: 20,
    heading: "Because Thine Heart Was Tender",
    summary: "2 Kings 22:19-20 focuses on because thine heart was tender inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 22:19-20 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"Because Thine Heart Was Tender\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 23:1-6",
    chapter: 23,
    startVerse: 1,
    endVerse: 6,
    heading: "The King Sent",
    summary: "2 Kings 23:1-6 focuses on the king sent inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 23:1-6 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"The King Sent\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 23:7-12",
    chapter: 23,
    startVerse: 7,
    endVerse: 12,
    heading: "He Brake Down the Houses of the Sodomites",
    summary: "2 Kings 23:7-12 focuses on he brake down the houses of the sodomites inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 23:7-12 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"He Brake Down the Houses of the Sodomites\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 23:13-18",
    chapter: 23,
    startVerse: 13,
    endVerse: 18,
    heading: "The High Places Were Before Jerusalem",
    summary: "2 Kings 23:13-18 focuses on the high places were before jerusalem inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 23:13-18 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"🏙️ The High Places That Were Before Jerusalem\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 23:19-24",
    chapter: 23,
    startVerse: 19,
    endVerse: 24,
    heading: "All the Houses Also of the High Places Were",
    summary: "2 Kings 23:19-24 focuses on all the houses also of the high places were inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 23:19-24 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"All the Houses Also of the High Places That Were in the Cities of Samaria\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 23:25-30",
    chapter: 23,
    startVerse: 25,
    endVerse: 30,
    heading: "Like unto Him Was There No King Before Him",
    summary: "2 Kings 23:25-30 focuses on like unto him was there no king before him inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 23:25-30 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"Like unto Him Was There No King Before Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 23:31-36",
    chapter: 23,
    startVerse: 31,
    endVerse: 36,
    heading: "Jehoahaz Was Twenty and Three Years Old When He",
    summary: "2 Kings 23:31-36 focuses on jehoahaz was twenty and three years old when he inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 23:31-36 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"Jehoahaz Was Twenty and Three Years Old When He Began to Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 23:37",
    chapter: 23,
    startVerse: 37,
    endVerse: 37,
    heading: "He Did That Which Was Evil in the Sight",
    summary: "2 Kings 23:37 focuses on he did that which was evil in the sight inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 23:37 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"He Did That Which Was Evil in the Sight of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 24:1-6",
    chapter: 24,
    startVerse: 1,
    endVerse: 6,
    heading: "In His Days Nebuchadnezzar King of Babylon Came Up",
    summary: "2 Kings 24:1-6 focuses on in his days nebuchadnezzar king of babylon came up inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 24:1-6 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"In His Days Nebuchadnezzar King of Babylon Came Up\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 24:7-12",
    chapter: 24,
    startVerse: 7,
    endVerse: 12,
    heading: "The King of Egypt Came Not Again Any More",
    summary: "2 Kings 24:7-12 focuses on the king of egypt came not again any more inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 24:7-12 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"The King of Egypt Came Not Again Any More Out of His Land\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 24:13-18",
    chapter: 24,
    startVerse: 13,
    endVerse: 18,
    heading: "He Carried Out Thence All the Treasures",
    summary: "2 Kings 24:13-18 focuses on he carried out thence all the treasures inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 24:13-18 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"He Carried Out Thence All the Treasures of the House of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 24:19-20",
    chapter: 24,
    startVerse: 19,
    endVerse: 20,
    heading: "He Did That Which Was Evil in the Sight",
    summary: "2 Kings 24:19-20 focuses on he did that which was evil in the sight inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 24:19-20 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"He Did That Which Was Evil in the Sight of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 25:1-6",
    chapter: 25,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass in the Ninth Year",
    summary: "2 Kings 25:1-6 focuses on it came to pass in the ninth year inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 25:1-6 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"It Came to Pass in the Ninth Year of His Reign\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 25:7-12",
    chapter: 25,
    startVerse: 7,
    endVerse: 12,
    heading: "They Slew the Sons of Zedekiah Before His Eyes",
    summary: "2 Kings 25:7-12 focuses on they slew the sons of zedekiah before his eyes inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 25:7-12 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"They Slew the Sons of Zedekiah Before His Eyes\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 25:13-18",
    chapter: 25,
    startVerse: 13,
    endVerse: 18,
    heading: "The Pillars of Brass Were in the House",
    summary: "2 Kings 25:13-18 focuses on the pillars of brass were in the house inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 25:13-18 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"The Pillars of Brass That Were in the House of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 25:19-24",
    chapter: 25,
    startVerse: 19,
    endVerse: 24,
    heading: "Out of the City He Took an Officer Was",
    summary: "2 Kings 25:19-24 focuses on out of the city he took an officer was inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 25:19-24 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"🗡️ Out of the City He Took an Officer That Was Set Over the Men of War\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Kings 25:25-30",
    chapter: 25,
    startVerse: 25,
    endVerse: 30,
    heading: "It Came to Pass in the Seventh Month",
    summary: "2 Kings 25:25-30 focuses on it came to pass in the seventh month inside josiah's reform and judah's fall.",
    teaching: [
      "Read 2 Kings 25:25-30 as a focused part of Josiah's Reform and Judah's Fall.",
      "The section begins with \"But It Came to Pass in the Seventh Month\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_94_SECTIONS: DaySection[] = [
  {
    reference: "1 Chronicles 1:1-6",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    heading: "Adam, Sheth, Enosh",
    summary: "1 Chronicles 1:1-6 focuses on adam, sheth, enosh inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:1-6 as a focused part of The Family Line of God's People.",
      "The section begins with \"Adam, Sheth, Enosh\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 1:7-12",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    heading: "The Sons of Javan",
    summary: "1 Chronicles 1:7-12 focuses on the sons of javan inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:7-12 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Javan\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 1:13-18",
    chapter: 1,
    startVerse: 13,
    endVerse: 18,
    heading: "Canaan Begat Zidon His Firstborn",
    summary: "1 Chronicles 1:13-18 focuses on canaan begat zidon his firstborn inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:13-18 as a focused part of The Family Line of God's People.",
      "The section begins with \"Canaan Begat Zidon His Firstborn\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 1:19-24",
    chapter: 1,
    startVerse: 19,
    endVerse: 24,
    heading: "Unto Eber Were Born Two Sons",
    summary: "1 Chronicles 1:19-24 focuses on unto eber were born two sons inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:19-24 as a focused part of The Family Line of God's People.",
      "The section begins with \"Unto Eber Were Born Two Sons\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 1:25-30",
    chapter: 1,
    startVerse: 25,
    endVerse: 30,
    heading: "Eber, Peleg, Reu",
    summary: "1 Chronicles 1:25-30 focuses on eber, peleg, reu inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:25-30 as a focused part of The Family Line of God's People.",
      "The section begins with \"Eber, Peleg, Reu\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 1:31-36",
    chapter: 1,
    startVerse: 31,
    endVerse: 36,
    heading: "These Are the Sons of Ishmael",
    summary: "1 Chronicles 1:31-36 focuses on these are the sons of ishmael inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:31-36 as a focused part of The Family Line of God's People.",
      "The section begins with \"These Are the Sons of Ishmael\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 1:37-42",
    chapter: 1,
    startVerse: 37,
    endVerse: 42,
    heading: "The Sons of Reuel",
    summary: "1 Chronicles 1:37-42 focuses on the sons of reuel inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:37-42 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Reuel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 1:43-48",
    chapter: 1,
    startVerse: 43,
    endVerse: 48,
    heading: "Now These Are the Kings That Reigned",
    summary: "1 Chronicles 1:43-48 focuses on now these are the kings that reigned inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:43-48 as a focused part of The Family Line of God's People.",
      "The section begins with \"Now These Are the Kings That Reigned in the Land of Edom Before Any King Reigned Over the Children of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 1:49-54",
    chapter: 1,
    startVerse: 49,
    endVerse: 54,
    heading: "When Shaul Was Dead",
    summary: "1 Chronicles 1:49-54 focuses on when shaul was dead inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 1:49-54 as a focused part of The Family Line of God's People.",
      "The section begins with \"When Shaul Was Dead\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:1-6",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    heading: "These Are the Sons of Israel",
    summary: "1 Chronicles 2:1-6 focuses on these are the sons of israel inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:1-6 as a focused part of The Family Line of God's People.",
      "The section begins with \"These Are the Sons of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:7-12",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    heading: "The Sons of Carmi",
    summary: "1 Chronicles 2:7-12 focuses on the sons of carmi inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:7-12 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Carmi\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:13-18",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    heading: "Jesse Begat His Firstborn Eliab",
    summary: "1 Chronicles 2:13-18 focuses on jesse begat his firstborn eliab inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:13-18 as a focused part of The Family Line of God's People.",
      "The section begins with \"Jesse Begat His Firstborn Eliab\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:19-24",
    chapter: 2,
    startVerse: 19,
    endVerse: 24,
    heading: "When Azubah Was Dead",
    summary: "1 Chronicles 2:19-24 focuses on when azubah was dead inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:19-24 as a focused part of The Family Line of God's People.",
      "The section begins with \"When Azubah Was Dead\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:25-30",
    chapter: 2,
    startVerse: 25,
    endVerse: 30,
    heading: "The Sons of Jerahmeel the Firstborn of Hezron Were",
    summary: "1 Chronicles 2:25-30 focuses on the sons of jerahmeel the firstborn of hezron were inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:25-30 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Jerahmeel the Firstborn of Hezron Were\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:31-36",
    chapter: 2,
    startVerse: 31,
    endVerse: 36,
    heading: "The Sons of Appaim",
    summary: "1 Chronicles 2:31-36 focuses on the sons of appaim inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:31-36 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Appaim\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:37-42",
    chapter: 2,
    startVerse: 37,
    endVerse: 42,
    heading: "Zabad Begat Ephlal",
    summary: "1 Chronicles 2:37-42 focuses on zabad begat ephlal inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:37-42 as a focused part of The Family Line of God's People.",
      "The section begins with \"⛰️ Zabad Begat Ephlal\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:43-48",
    chapter: 2,
    startVerse: 43,
    endVerse: 48,
    heading: "The Sons of Hebron",
    summary: "1 Chronicles 2:43-48 focuses on the sons of hebron inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:43-48 as a focused part of The Family Line of God's People.",
      "The section begins with \"🏙️ The Sons of Hebron\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:49-54",
    chapter: 2,
    startVerse: 49,
    endVerse: 54,
    heading: "She Bare Also Shaaph the Father of Madmannah",
    summary: "1 Chronicles 2:49-54 focuses on she bare also shaaph the father of madmannah inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:49-54 as a focused part of The Family Line of God's People.",
      "The section begins with \"⛰️ She Bare Also Shaaph the Father of Madmannah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 2:55",
    chapter: 2,
    startVerse: 55,
    endVerse: 55,
    heading: "The Families of the Scribes Which Dwelt at Jabez",
    summary: "1 Chronicles 2:55 focuses on the families of the scribes which dwelt at jabez inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 2:55 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Families of the Scribes Which Dwelt at Jabez\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 3:1-6",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    heading: "Now These Were the Sons of David",
    summary: "1 Chronicles 3:1-6 focuses on now these were the sons of david inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 3:1-6 as a focused part of The Family Line of God's People.",
      "The section begins with \"Now These Were the Sons of David\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 3:7-12",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    heading: "Nogah, and Nepheg,",
    summary: "1 Chronicles 3:7-12 focuses on nogah, and nepheg, inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 3:7-12 as a focused part of The Family Line of God's People.",
      "The section begins with \"Nogah, and Nepheg, and\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 3:13-18",
    chapter: 3,
    startVerse: 13,
    endVerse: 18,
    heading: "Ahaz His Son",
    summary: "1 Chronicles 3:13-18 focuses on ahaz his son inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 3:13-18 as a focused part of The Family Line of God's People.",
      "The section begins with \"Ahaz His Son\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 3:19-24",
    chapter: 3,
    startVerse: 19,
    endVerse: 24,
    heading: "The Sons of Pedaiah Were",
    summary: "1 Chronicles 3:19-24 focuses on the sons of pedaiah were inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 3:19-24 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Pedaiah Were\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 4:1-6",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    heading: "The Sons of Judah",
    summary: "1 Chronicles 4:1-6 focuses on the sons of judah inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 4:1-6 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 4:7-12",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    heading: "The Sons of Helah Were",
    summary: "1 Chronicles 4:7-12 focuses on the sons of helah were inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 4:7-12 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Helah Were\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 4:13-18",
    chapter: 4,
    startVerse: 13,
    endVerse: 18,
    heading: "The Sons of Kenaz",
    summary: "1 Chronicles 4:13-18 focuses on the sons of kenaz inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 4:13-18 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of Kenaz\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 4:19-24",
    chapter: 4,
    startVerse: 19,
    endVerse: 24,
    heading: "The Sons of His Wife Hodiah the Sister",
    summary: "1 Chronicles 4:19-24 focuses on the sons of his wife hodiah the sister inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 4:19-24 as a focused part of The Family Line of God's People.",
      "The section begins with \"The Sons of His Wife Hodiah the Sister of Naham\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 4:25-30",
    chapter: 4,
    startVerse: 25,
    endVerse: 30,
    heading: "Shallum His Son",
    summary: "1 Chronicles 4:25-30 focuses on shallum his son inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 4:25-30 as a focused part of The Family Line of God's People.",
      "The section begins with \"Shallum His Son\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 4:31-36",
    chapter: 4,
    startVerse: 31,
    endVerse: 36,
    heading: "These Were Their Cities unto the Reign of David",
    summary: "1 Chronicles 4:31-36 focuses on these were their cities unto the reign of david inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 4:31-36 as a focused part of The Family Line of God's People.",
      "The section begins with \"These Were Their Cities unto the Reign of David\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 4:37-42",
    chapter: 4,
    startVerse: 37,
    endVerse: 42,
    heading: "Ziza the Son of Shiphi",
    summary: "1 Chronicles 4:37-42 focuses on ziza the son of shiphi inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 4:37-42 as a focused part of The Family Line of God's People.",
      "The section begins with \"Ziza the Son of Shiphi\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 4:43",
    chapter: 4,
    startVerse: 43,
    endVerse: 43,
    heading: "They Smote the Rest of the Amalekites Were Escaped",
    summary: "1 Chronicles 4:43 focuses on they smote the rest of the amalekites were escaped inside the family line of god's people.",
    teaching: [
      "Read 1 Chronicles 4:43 as a focused part of The Family Line of God's People.",
      "The section begins with \"🗡️ They Smote the Rest of the Amalekites That Were Escaped\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_95_SECTIONS: DaySection[] = [
  {
    reference: "1 Chronicles 5:1-6",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    heading: "Now the Sons of Reuben the Firstborn of Israel",
    summary: "1 Chronicles 5:1-6 focuses on now the sons of reuben the firstborn of israel inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 5:1-6 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Now the Sons of Reuben the Firstborn of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 5:7-12",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    heading: "His Brethren by Their Families",
    summary: "1 Chronicles 5:7-12 focuses on his brethren by their families inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 5:7-12 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"⛰️ His Brethren by Their Families\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 5:13-18",
    chapter: 5,
    startVerse: 13,
    endVerse: 18,
    heading: "Their Brethren of the House of Their Fathers Were",
    summary: "1 Chronicles 5:13-18 focuses on their brethren of the house of their fathers were inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 5:13-18 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Their Brethren of the House of Their Fathers Were\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 5:19-24",
    chapter: 5,
    startVerse: 19,
    endVerse: 24,
    heading: "They Made War with the Hagarites",
    summary: "1 Chronicles 5:19-24 focuses on they made war with the hagarites inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 5:19-24 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🗡️ They Made War with the Hagarites\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 5:25-26",
    chapter: 5,
    startVerse: 25,
    endVerse: 26,
    heading: "They Transgressed Against the God of Their Fathers",
    summary: "1 Chronicles 5:25-26 focuses on they transgressed against the god of their fathers inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 5:25-26 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"They Transgressed Against the God of Their Fathers\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:1-6",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    heading: "The Sons of Levi",
    summary: "1 Chronicles 6:1-6 focuses on the sons of levi inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:1-6 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"The Sons of Levi\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:7-12",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    heading: "Meraioth Begat Amariah",
    summary: "1 Chronicles 6:7-12 focuses on meraioth begat amariah inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:7-12 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Meraioth Begat Amariah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:13-18",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    heading: "Shallum Begat Hilkiah",
    summary: "1 Chronicles 6:13-18 focuses on shallum begat hilkiah inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:13-18 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Shallum Begat Hilkiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:19-24",
    chapter: 6,
    startVerse: 19,
    endVerse: 24,
    heading: "The Sons of Merari",
    summary: "1 Chronicles 6:19-24 focuses on the sons of merari inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:19-24 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🛡️ The Sons of Merari\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:25-30",
    chapter: 6,
    startVerse: 25,
    endVerse: 30,
    heading: "The Sons of Elkanah",
    summary: "1 Chronicles 6:25-30 focuses on the sons of elkanah inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:25-30 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"The Sons of Elkanah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:31-36",
    chapter: 6,
    startVerse: 31,
    endVerse: 36,
    heading: "These Are They Whom David Set Over the Service",
    summary: "1 Chronicles 6:31-36 focuses on these are they whom david set over the service inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:31-36 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"These Are They Whom David Set Over the Service of Song in the House of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:37-42",
    chapter: 6,
    startVerse: 37,
    endVerse: 42,
    heading: "The Son of Tahath",
    summary: "1 Chronicles 6:37-42 focuses on the son of tahath inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:37-42 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🗡️ The Son of Tahath\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:43-48",
    chapter: 6,
    startVerse: 43,
    endVerse: 48,
    heading: "The Son of Jahath",
    summary: "1 Chronicles 6:43-48 focuses on the son of jahath inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:43-48 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"The Son of Jahath\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:49-54",
    chapter: 6,
    startVerse: 49,
    endVerse: 54,
    heading: "Aaron and His Sons Offered Upon the Altar",
    summary: "1 Chronicles 6:49-54 focuses on aaron and his sons offered upon the altar inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:49-54 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"But Aaron and His Sons Offered Upon the Altar of the Burnt Offering\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:55-60",
    chapter: 6,
    startVerse: 55,
    endVerse: 60,
    heading: "They Gave Them Hebron in the Land of Judah",
    summary: "1 Chronicles 6:55-60 focuses on they gave them hebron in the land of judah inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:55-60 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🏙️ They Gave Them Hebron in the Land of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:61-66",
    chapter: 6,
    startVerse: 61,
    endVerse: 66,
    heading: "Unto the Sons of Kohath",
    summary: "1 Chronicles 6:61-66 focuses on unto the sons of kohath inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:61-66 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Unto the Sons of Kohath\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:67-72",
    chapter: 6,
    startVerse: 67,
    endVerse: 72,
    heading: "They Gave unto Them",
    summary: "1 Chronicles 6:67-72 focuses on they gave unto them inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:67-72 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"They Gave unto Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:73-78",
    chapter: 6,
    startVerse: 73,
    endVerse: 78,
    heading: "Ramoth with Her Suburbs",
    summary: "1 Chronicles 6:73-78 focuses on ramoth with her suburbs inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:73-78 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"⚠️ Ramoth with Her Suburbs\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 6:79-81",
    chapter: 6,
    startVerse: 79,
    endVerse: 81,
    heading: "Kedemoth Also with Her Suburbs",
    summary: "1 Chronicles 6:79-81 focuses on kedemoth also with her suburbs inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 6:79-81 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Kedemoth Also with Her Suburbs\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 7:1-6",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    heading: "Now the Sons of Issachar Were",
    summary: "1 Chronicles 7:1-6 focuses on now the sons of issachar were inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 7:1-6 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🗡️ Now the Sons of Issachar Were\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 7:7-12",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    heading: "The Sons of Bela",
    summary: "1 Chronicles 7:7-12 focuses on the sons of bela inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 7:7-12 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"The Sons of Bela\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 7:13-18",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    heading: "The Sons of Naphtali",
    summary: "1 Chronicles 7:13-18 focuses on the sons of naphtali inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 7:13-18 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"The Sons of Naphtali\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 7:19-24",
    chapter: 7,
    startVerse: 19,
    endVerse: 24,
    heading: "The Sons of Shemidah Were",
    summary: "1 Chronicles 7:19-24 focuses on the sons of shemidah were inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 7:19-24 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🛡️ The Sons of Shemidah Were\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 7:25-30",
    chapter: 7,
    startVerse: 25,
    endVerse: 30,
    heading: "Rephah Was His Son",
    summary: "1 Chronicles 7:25-30 focuses on rephah was his son inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 7:25-30 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Rephah Was His Son\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 7:31-36",
    chapter: 7,
    startVerse: 31,
    endVerse: 36,
    heading: "The Sons of Beriah",
    summary: "1 Chronicles 7:31-36 focuses on the sons of beriah inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 7:31-36 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"The Sons of Beriah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 7:37-40",
    chapter: 7,
    startVerse: 37,
    endVerse: 40,
    heading: "Shamma and Shilshah",
    summary: "1 Chronicles 7:37-40 focuses on shamma and shilshah inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 7:37-40 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🗡️ Shamma and Shilshah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 8:1-6",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    heading: "Now Benjamin Begat Bela His Firstborn",
    summary: "1 Chronicles 8:1-6 focuses on now benjamin begat bela his firstborn inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 8:1-6 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🗡️ Now Benjamin Begat Bela His Firstborn\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 8:7-12",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    heading: "He Removed Them",
    summary: "1 Chronicles 8:7-12 focuses on he removed them inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 8:7-12 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"He Removed Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 8:13-18",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    heading: "Who Were Heads of the Fathers of the Inhabitants",
    summary: "1 Chronicles 8:13-18 focuses on who were heads of the fathers of the inhabitants inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 8:13-18 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"🏙️ Who Were Heads of the Fathers of the Inhabitants of Aijalon\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 8:19-24",
    chapter: 8,
    startVerse: 19,
    endVerse: 24,
    heading: "Jakim, and Zichri,",
    summary: "1 Chronicles 8:19-24 focuses on jakim, and zichri, inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 8:19-24 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"⛰️ Jakim, and Zichri, and\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 8:25-30",
    chapter: 8,
    startVerse: 25,
    endVerse: 30,
    heading: "The Sons of Shashak",
    summary: "1 Chronicles 8:25-30 focuses on the sons of shashak inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 8:25-30 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"The Sons of Shashak\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 8:31-36",
    chapter: 8,
    startVerse: 31,
    endVerse: 36,
    heading: "Gedor, and Ahio,",
    summary: "1 Chronicles 8:31-36 focuses on gedor, and ahio, inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 8:31-36 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Gedor, and Ahio, and\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 8:37-40",
    chapter: 8,
    startVerse: 37,
    endVerse: 40,
    heading: "Moza Begat Binea",
    summary: "1 Chronicles 8:37-40 focuses on moza begat binea inside tribes, genealogies, and identity.",
    teaching: [
      "Read 1 Chronicles 8:37-40 as a focused part of Tribes, Genealogies, and Identity.",
      "The section begins with \"Moza Begat Binea\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

export const KINGS_CHRONICLES_DAY_EIGHTY_SIX_ELIJAH_CONFRONTS_IDOLATRY_LESSON = makeLesson(
  86,
  "Elijah Confronts Idolatry",
  "1 Kings 16-19",
  DAY_86_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Kings 16-19.",
    "Elijah Confronts Idolatry shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 86 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_EIGHTY_SEVEN_AHABS_FALL_AND_ELIJAHS_FINAL_WARNINGS_LESSON = makeLesson(
  87,
  "Ahab's Fall and Elijah's Final Warnings",
  "1 Kings 20-22; 2 Kings 1",
  DAY_87_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Kings 20-22; 2 Kings 1.",
    "Ahab's Fall and Elijah's Final Warnings shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 87 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_EIGHTY_EIGHT_ELISHAS_MINISTRY_BEGINS_LESSON = makeLesson(
  88,
  "Elisha's Ministry Begins",
  "2 Kings 2-5",
  DAY_88_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Kings 2-5.",
    "Elisha's Ministry Begins shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 88 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_EIGHTY_NINE_RESCUE_SIEGE_AND_JEHUS_JUDGMENT_LESSON = makeLesson(
  89,
  "Rescue, Siege, and Jehu's Judgment",
  "2 Kings 6-9",
  DAY_89_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Kings 6-9.",
    "Rescue, Siege, and Jehu's Judgment shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 89 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_NINETY_JEHUS_REFORM_AND_ISRAELS_DECLINE_LESSON = makeLesson(
  90,
  "Jehu's Reform and Israel's Decline",
  "2 Kings 10-13",
  DAY_90_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Kings 10-13.",
    "Jehu's Reform and Israel's Decline shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 90 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_NINETY_ONE_ISRAEL_FALLS_TO_ASSYRIA_LESSON = makeLesson(
  91,
  "Israel Falls to Assyria",
  "2 Kings 14-17",
  DAY_91_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Kings 14-17.",
    "Israel Falls to Assyria shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 91 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_NINETY_TWO_HEZEKIAHS_FAITH_AND_MANASSEHS_EVIL_LESSON = makeLesson(
  92,
  "Hezekiah's Faith and Manasseh's Evil",
  "2 Kings 18-21",
  DAY_92_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Kings 18-21.",
    "Hezekiah's Faith and Manasseh's Evil shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 92 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_NINETY_THREE_JOSIAHS_REFORM_AND_JUDAHS_FALL_LESSON = makeLesson(
  93,
  "Josiah's Reform and Judah's Fall",
  "2 Kings 22-25",
  DAY_93_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Kings 22-25.",
    "Josiah's Reform and Judah's Fall shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 93 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_NINETY_FOUR_THE_FAMILY_LINE_OF_GODS_PEOPLE_LESSON = makeLesson(
  94,
  "The Family Line of God's People",
  "1 Chronicles 1-4",
  DAY_94_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Chronicles 1-4.",
    "The Family Line of God's People shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 94 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const KINGS_CHRONICLES_DAY_NINETY_FIVE_TRIBES_GENEALOGIES_AND_IDENTITY_LESSON = makeLesson(
  95,
  "Tribes, Genealogies, and Identity",
  "1 Chronicles 5-8",
  DAY_95_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Chronicles 5-8.",
    "Tribes, Genealogies, and Identity shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 95 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const BIBLE_YEAR_DAY_86_DEEP_NOTES = makeDeepNotes(
  "Elijah Confronts Idolatry",
  [
  "1 Kings 16",
  "1 Kings 17",
  "1 Kings 18",
  "1 Kings 19"
],
  [
    "Day 86 covers 1 Kings 16-19.",
    "Elijah Confronts Idolatry belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_86_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_87_DEEP_NOTES = makeDeepNotes(
  "Ahab's Fall and Elijah's Final Warnings",
  [
  "1 Kings 20",
  "1 Kings 21",
  "1 Kings 22",
  "2 Kings 1"
],
  [
    "Day 87 covers 1 Kings 20-22; 2 Kings 1.",
    "Ahab's Fall and Elijah's Final Warnings belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_87_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_88_DEEP_NOTES = makeDeepNotes(
  "Elisha's Ministry Begins",
  [
  "2 Kings 2",
  "2 Kings 3",
  "2 Kings 4",
  "2 Kings 5"
],
  [
    "Day 88 covers 2 Kings 2-5.",
    "Elisha's Ministry Begins belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_88_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_89_DEEP_NOTES = makeDeepNotes(
  "Rescue, Siege, and Jehu's Judgment",
  [
  "2 Kings 6",
  "2 Kings 7",
  "2 Kings 8",
  "2 Kings 9"
],
  [
    "Day 89 covers 2 Kings 6-9.",
    "Rescue, Siege, and Jehu's Judgment belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_89_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_90_DEEP_NOTES = makeDeepNotes(
  "Jehu's Reform and Israel's Decline",
  [
  "2 Kings 10",
  "2 Kings 11",
  "2 Kings 12",
  "2 Kings 13"
],
  [
    "Day 90 covers 2 Kings 10-13.",
    "Jehu's Reform and Israel's Decline belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_90_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_91_DEEP_NOTES = makeDeepNotes(
  "Israel Falls to Assyria",
  [
  "2 Kings 14",
  "2 Kings 15",
  "2 Kings 16",
  "2 Kings 17"
],
  [
    "Day 91 covers 2 Kings 14-17.",
    "Israel Falls to Assyria belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_91_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_92_DEEP_NOTES = makeDeepNotes(
  "Hezekiah's Faith and Manasseh's Evil",
  [
  "2 Kings 18",
  "2 Kings 19",
  "2 Kings 20",
  "2 Kings 21"
],
  [
    "Day 92 covers 2 Kings 18-21.",
    "Hezekiah's Faith and Manasseh's Evil belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_92_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_93_DEEP_NOTES = makeDeepNotes(
  "Josiah's Reform and Judah's Fall",
  [
  "2 Kings 22",
  "2 Kings 23",
  "2 Kings 24",
  "2 Kings 25"
],
  [
    "Day 93 covers 2 Kings 22-25.",
    "Josiah's Reform and Judah's Fall belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_93_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_94_DEEP_NOTES = makeDeepNotes(
  "The Family Line of God's People",
  [
  "1 Chronicles 1",
  "1 Chronicles 2",
  "1 Chronicles 3",
  "1 Chronicles 4"
],
  [
    "Day 94 covers 1 Chronicles 1-4.",
    "The Family Line of God's People belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_94_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_95_DEEP_NOTES = makeDeepNotes(
  "Tribes, Genealogies, and Identity",
  [
  "1 Chronicles 5",
  "1 Chronicles 6",
  "1 Chronicles 7",
  "1 Chronicles 8"
],
  [
    "Day 95 covers 1 Chronicles 5-8.",
    "Tribes, Genealogies, and Identity belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_95_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_86_DEEP_STUDY_SECTIONS = makeStudySections(DAY_86_SECTIONS);
export const BIBLE_YEAR_DAY_87_DEEP_STUDY_SECTIONS = makeStudySections(DAY_87_SECTIONS);
export const BIBLE_YEAR_DAY_88_DEEP_STUDY_SECTIONS = makeStudySections(DAY_88_SECTIONS);
export const BIBLE_YEAR_DAY_89_DEEP_STUDY_SECTIONS = makeStudySections(DAY_89_SECTIONS);
export const BIBLE_YEAR_DAY_90_DEEP_STUDY_SECTIONS = makeStudySections(DAY_90_SECTIONS);
export const BIBLE_YEAR_DAY_91_DEEP_STUDY_SECTIONS = makeStudySections(DAY_91_SECTIONS);
export const BIBLE_YEAR_DAY_92_DEEP_STUDY_SECTIONS = makeStudySections(DAY_92_SECTIONS);
export const BIBLE_YEAR_DAY_93_DEEP_STUDY_SECTIONS = makeStudySections(DAY_93_SECTIONS);
export const BIBLE_YEAR_DAY_94_DEEP_STUDY_SECTIONS = makeStudySections(DAY_94_SECTIONS);
export const BIBLE_YEAR_DAY_95_DEEP_STUDY_SECTIONS = makeStudySections(DAY_95_SECTIONS);
