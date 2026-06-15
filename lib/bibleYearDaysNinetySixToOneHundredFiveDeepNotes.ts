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

const DAY_96_SECTIONS: DaySection[] = [
  {
    reference: "1 Chronicles 9:1-6",
    chapter: 9,
    startVerse: 1,
    endVerse: 6,
    heading: "So All Israel Were Reckoned by Genealogies",
    summary: "1 Chronicles 9:1-6 focuses on so all israel were reckoned by genealogies inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 9:1-6 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"So All Israel Were Reckoned by Genealogies\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 9:7-12",
    chapter: 9,
    startVerse: 7,
    endVerse: 12,
    heading: "Of the Sons of Benjamin",
    summary: "1 Chronicles 9:7-12 focuses on of the sons of benjamin inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 9:7-12 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And of the Sons of Benjamin\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 9:13-18",
    chapter: 9,
    startVerse: 13,
    endVerse: 18,
    heading: "Their Brethren",
    summary: "1 Chronicles 9:13-18 focuses on their brethren inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 9:13-18 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And Their Brethren\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 9:19-24",
    chapter: 9,
    startVerse: 19,
    endVerse: 24,
    heading: "Shallum the Son of Kore",
    summary: "1 Chronicles 9:19-24 focuses on shallum the son of kore inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 9:19-24 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And Shallum the Son of Kore\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 9:25-30",
    chapter: 9,
    startVerse: 25,
    endVerse: 30,
    heading: "Their Brethren",
    summary: "1 Chronicles 9:25-30 focuses on their brethren inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 9:25-30 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And Their Brethren\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 9:31-36",
    chapter: 9,
    startVerse: 31,
    endVerse: 36,
    heading: "One of the Levites",
    summary: "1 Chronicles 9:31-36 focuses on one of the levites inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 9:31-36 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"One of the Levites\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 9:37-42",
    chapter: 9,
    startVerse: 37,
    endVerse: 42,
    heading: "Mikloth Begat Shimeam",
    summary: "1 Chronicles 9:37-42 focuses on mikloth begat shimeam inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 9:37-42 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And Mikloth Begat Shimeam\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 9:43-44",
    chapter: 9,
    startVerse: 43,
    endVerse: 44,
    heading: "Moza Begat Binea",
    summary: "1 Chronicles 9:43-44 focuses on moza begat binea inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 9:43-44 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And Moza Begat Binea\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 10:1-6",
    chapter: 10,
    startVerse: 1,
    endVerse: 6,
    heading: "Now the Philistines Fought Against Israel",
    summary: "1 Chronicles 10:1-6 focuses on now the philistines fought against israel inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 10:1-6 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"Now the Philistines Fought Against Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 10:7-12",
    chapter: 10,
    startVerse: 7,
    endVerse: 12,
    heading: "When All the Men of Israel Were",
    summary: "1 Chronicles 10:7-12 focuses on when all the men of israel were inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 10:7-12 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And When All the Men of Israel That Were in the Valley Saw That They Fled\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 10:13-14",
    chapter: 10,
    startVerse: 13,
    endVerse: 14,
    heading: "So Saul Died for His Transgression Which He Committed",
    summary: "1 Chronicles 10:13-14 focuses on so saul died for his transgression which he committed inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 10:13-14 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"So Saul Died for His Transgression Which He Committed Against the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 11:1-6",
    chapter: 11,
    startVerse: 1,
    endVerse: 6,
    heading: "Then All Israel Gathered Themselves to David unto Hebron",
    summary: "1 Chronicles 11:1-6 focuses on then all israel gathered themselves to david unto hebron inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 11:1-6 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"🏙️ Then All Israel Gathered Themselves to David unto Hebron\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 11:7-12",
    chapter: 11,
    startVerse: 7,
    endVerse: 12,
    heading: "David Dwelt in the Castle",
    summary: "1 Chronicles 11:7-12 focuses on david dwelt in the castle inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 11:7-12 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And David Dwelt in the Castle\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 11:13-18",
    chapter: 11,
    startVerse: 13,
    endVerse: 18,
    heading: "He Was with David at Pas-dammim",
    summary: "1 Chronicles 11:13-18 focuses on he was with david at pas-dammim inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 11:13-18 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"He Was with David at Pas-dammim\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 11:19-24",
    chapter: 11,
    startVerse: 19,
    endVerse: 24,
    heading: "My God Forbid It Me",
    summary: "1 Chronicles 11:19-24 focuses on my god forbid it me inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 11:19-24 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"My God Forbid It Me\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 11:25-30",
    chapter: 11,
    startVerse: 25,
    endVerse: 30,
    heading: "He Was Honourable Among the Thirty",
    summary: "1 Chronicles 11:25-30 focuses on he was honourable among the thirty inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 11:25-30 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"He Was Honourable Among the Thirty\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 11:31-36",
    chapter: 11,
    startVerse: 31,
    endVerse: 36,
    heading: "Ithai the Son of Ribai of Gibeah",
    summary: "1 Chronicles 11:31-36 focuses on ithai the son of ribai of gibeah inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 11:31-36 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"Ithai the Son of Ribai of Gibeah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 11:37-42",
    chapter: 11,
    startVerse: 37,
    endVerse: 42,
    heading: "Hezro the Carmelite",
    summary: "1 Chronicles 11:37-42 focuses on hezro the carmelite inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 11:37-42 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"Hezro the Carmelite\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 11:43-47",
    chapter: 11,
    startVerse: 43,
    endVerse: 47,
    heading: "Hanan the Son of Maachah",
    summary: "1 Chronicles 11:43-47 focuses on hanan the son of maachah inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 11:43-47 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"Hanan the Son of Maachah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 12:1-6",
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    heading: "Now These Are They That Came to David",
    summary: "1 Chronicles 12:1-6 focuses on now these are they that came to david inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 12:1-6 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"Now These Are They That Came to David to Ziklag\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 12:7-12",
    chapter: 12,
    startVerse: 7,
    endVerse: 12,
    heading: "The Sons of Jeroham of Gedor",
    summary: "1 Chronicles 12:7-12 focuses on the sons of jeroham of gedor inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 12:7-12 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"The Sons of Jeroham of Gedor\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 12:13-18",
    chapter: 12,
    startVerse: 13,
    endVerse: 18,
    heading: "Jeremiah the Tenth",
    summary: "1 Chronicles 12:13-18 focuses on jeremiah the tenth inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 12:13-18 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"Jeremiah the Tenth\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 12:19-24",
    chapter: 12,
    startVerse: 19,
    endVerse: 24,
    heading: "There Fell Some of Manasseh to David",
    summary: "1 Chronicles 12:19-24 focuses on there fell some of manasseh to david inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 12:19-24 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And There Fell Some of Manasseh to David\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 12:25-30",
    chapter: 12,
    startVerse: 25,
    endVerse: 30,
    heading: "Of the Children of Simeon",
    summary: "1 Chronicles 12:25-30 focuses on of the children of simeon inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 12:25-30 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"Of the Children of Simeon\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 12:31-36",
    chapter: 12,
    startVerse: 31,
    endVerse: 36,
    heading: "Of the Half Tribe of Manasseh Eighteen Thousand",
    summary: "1 Chronicles 12:31-36 focuses on of the half tribe of manasseh eighteen thousand inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 12:31-36 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And of the Half Tribe of Manasseh Eighteen Thousand\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 12:37-40",
    chapter: 12,
    startVerse: 37,
    endVerse: 40,
    heading: "On the Other Side of Jordan",
    summary: "1 Chronicles 12:37-40 focuses on on the other side of jordan inside return, saul, and david's supporters.",
    teaching: [
      "Read 1 Chronicles 12:37-40 as a focused part of Return, Saul, and David's Supporters.",
      "The section begins with \"And on the Other Side of Jordan\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_97_SECTIONS: DaySection[] = [
  {
    reference: "1 Chronicles 13:1-6",
    chapter: 13,
    startVerse: 1,
    endVerse: 6,
    heading: "David Consulted with the Captains of Thousands and Hundreds",
    summary: "1 Chronicles 13:1-6 focuses on david consulted with the captains of thousands and hundreds inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 13:1-6 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"And David Consulted with the Captains of Thousands and Hundreds\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 13:7-12",
    chapter: 13,
    startVerse: 7,
    endVerse: 12,
    heading: "They Carried the Ark of God in a New",
    summary: "1 Chronicles 13:7-12 focuses on they carried the ark of god in a new inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 13:7-12 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"And They Carried the Ark of God in a New Cart Out of the House of Abinadab\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 13:13-14",
    chapter: 13,
    startVerse: 13,
    endVerse: 14,
    heading: "So David Brought Not the Ark Home to Himself",
    summary: "1 Chronicles 13:13-14 focuses on so david brought not the ark home to himself inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 13:13-14 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"So David Brought Not the Ark Home to Himself to the City of David\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 14:1-6",
    chapter: 14,
    startVerse: 1,
    endVerse: 6,
    heading: "Now Hiram King of Tyre Sent Messengers to David",
    summary: "1 Chronicles 14:1-6 focuses on now hiram king of tyre sent messengers to david inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 14:1-6 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"Now Hiram King of Tyre Sent Messengers to David\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 14:7-12",
    chapter: 14,
    startVerse: 7,
    endVerse: 12,
    heading: "When the Philistines Heard That David Was Anointed King",
    summary: "1 Chronicles 14:7-12 focuses on when the philistines heard that david was anointed king inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 14:7-12 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"And When the Philistines Heard That David Was Anointed King Over All Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 14:13-17",
    chapter: 14,
    startVerse: 13,
    endVerse: 17,
    heading: "The Philistines Yet Again Spread Themselves Abroad",
    summary: "1 Chronicles 14:13-17 focuses on the philistines yet again spread themselves abroad inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 14:13-17 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"And the Philistines Yet Again Spread Themselves Abroad in the Valley\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 15:1-6",
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    heading: "David Made Him Houses in the City of David",
    summary: "1 Chronicles 15:1-6 focuses on david made him houses in the city of david inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 15:1-6 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"And David Made Him Houses in the City of David\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 15:7-12",
    chapter: 15,
    startVerse: 7,
    endVerse: 12,
    heading: "Of the Sons of Gershom",
    summary: "1 Chronicles 15:7-12 focuses on of the sons of gershom inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 15:7-12 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"Of the Sons of Gershom\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 15:13-18",
    chapter: 15,
    startVerse: 13,
    endVerse: 18,
    heading: "For Because Ye Did It Not at the First",
    summary: "1 Chronicles 15:13-18 focuses on for because ye did it not at the first inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 15:13-18 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"For Because Ye Did It Not at the First\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 15:19-24",
    chapter: 15,
    startVerse: 19,
    endVerse: 24,
    heading: "So the Singers",
    summary: "1 Chronicles 15:19-24 focuses on so the singers inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 15:19-24 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"So the Singers\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 15:25-29",
    chapter: 15,
    startVerse: 25,
    endVerse: 29,
    heading: "The Elders of Israel",
    summary: "1 Chronicles 15:25-29 focuses on the elders of israel inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 15:25-29 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"And the Elders of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 16:1-6",
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    heading: "So They Brought the Ark of God",
    summary: "1 Chronicles 16:1-6 focuses on so they brought the ark of god inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 16:1-6 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"So They Brought the Ark of God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 16:7-12",
    chapter: 16,
    startVerse: 7,
    endVerse: 12,
    heading: "Then on That Day David Delivered First This Psalm",
    summary: "1 Chronicles 16:7-12 focuses on then on that day david delivered first this psalm inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 16:7-12 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"Then on That Day David Delivered First This Psalm to Thank the LORD into the Hand of Asaph and His Brethren\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 16:13-18",
    chapter: 16,
    startVerse: 13,
    endVerse: 18,
    heading: "O Ye Seed of Israel His Servant",
    summary: "1 Chronicles 16:13-18 focuses on o ye seed of israel his servant inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 16:13-18 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"O Ye Seed of Israel His Servant\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 16:19-24",
    chapter: 16,
    startVerse: 19,
    endVerse: 24,
    heading: "When Ye Were but Few",
    summary: "1 Chronicles 16:19-24 focuses on when ye were but few inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 16:19-24 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"When Ye Were but Few\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 16:25-30",
    chapter: 16,
    startVerse: 25,
    endVerse: 30,
    heading: "For Great Is the LORD",
    summary: "1 Chronicles 16:25-30 focuses on for great is the lord inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 16:25-30 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"For Great Is the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 16:31-36",
    chapter: 16,
    startVerse: 31,
    endVerse: 36,
    heading: "Let the Heavens Be Glad",
    summary: "1 Chronicles 16:31-36 focuses on let the heavens be glad inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 16:31-36 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"Let the Heavens Be Glad\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 16:37-42",
    chapter: 16,
    startVerse: 37,
    endVerse: 42,
    heading: "So He Left There Before the Ark",
    summary: "1 Chronicles 16:37-42 focuses on so he left there before the ark inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 16:37-42 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"So He Left There Before the Ark of the Covenant of the LORD Asaph and His Brethren\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 16:43",
    chapter: 16,
    startVerse: 43,
    endVerse: 43,
    heading: "All the People Departed Every Man to His House",
    summary: "1 Chronicles 16:43 focuses on all the people departed every man to his house inside the ark comes to jerusalem.",
    teaching: [
      "Read 1 Chronicles 16:43 as a focused part of The Ark Comes to Jerusalem.",
      "The section begins with \"And All the People Departed Every Man to His House\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_98_SECTIONS: DaySection[] = [
  {
    reference: "1 Chronicles 17:1-6",
    chapter: 17,
    startVerse: 1,
    endVerse: 6,
    heading: "Now It Came to Pass",
    summary: "1 Chronicles 17:1-6 focuses on now it came to pass inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 17:1-6 as a focused part of David's Covenant and Victories.",
      "The section begins with \"Now It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 17:7-12",
    chapter: 17,
    startVerse: 7,
    endVerse: 12,
    heading: "Now Therefore Thus Shalt Thou Say unto My Servant",
    summary: "1 Chronicles 17:7-12 focuses on now therefore thus shalt thou say unto my servant inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 17:7-12 as a focused part of David's Covenant and Victories.",
      "The section begins with \"Now Therefore Thus Shalt Thou Say unto My Servant David\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 17:13-18",
    chapter: 17,
    startVerse: 13,
    endVerse: 18,
    heading: "I Will Be His Father",
    summary: "1 Chronicles 17:13-18 focuses on i will be his father inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 17:13-18 as a focused part of David's Covenant and Victories.",
      "The section begins with \"I Will Be His Father\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 17:19-24",
    chapter: 17,
    startVerse: 19,
    endVerse: 24,
    heading: "For Thy Servant’s Sake",
    summary: "1 Chronicles 17:19-24 focuses on for thy servant’s sake inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 17:19-24 as a focused part of David's Covenant and Victories.",
      "The section begins with \"For Thy Servant’s Sake\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 17:25-27",
    chapter: 17,
    startVerse: 25,
    endVerse: 27,
    heading: "O My God",
    summary: "1 Chronicles 17:25-27 focuses on o my god inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 17:25-27 as a focused part of David's Covenant and Victories.",
      "The section begins with \"O My God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 18:1-6",
    chapter: 18,
    startVerse: 1,
    endVerse: 6,
    heading: "Now After This It Came to Pass",
    summary: "1 Chronicles 18:1-6 focuses on now after this it came to pass inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 18:1-6 as a focused part of David's Covenant and Victories.",
      "The section begins with \"Now After This It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 18:7-12",
    chapter: 18,
    startVerse: 7,
    endVerse: 12,
    heading: "David Took the Shields of Gold Were",
    summary: "1 Chronicles 18:7-12 focuses on david took the shields of gold were inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 18:7-12 as a focused part of David's Covenant and Victories.",
      "The section begins with \"And David Took the Shields of Gold That Were on the Servants of Hadarezer\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 18:13-17",
    chapter: 18,
    startVerse: 13,
    endVerse: 17,
    heading: "He Put Garrisons in Edom",
    summary: "1 Chronicles 18:13-17 focuses on he put garrisons in edom inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 18:13-17 as a focused part of David's Covenant and Victories.",
      "The section begins with \"And He Put Garrisons in Edom\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 19:1-6",
    chapter: 19,
    startVerse: 1,
    endVerse: 6,
    heading: "Now It Came to Pass After This",
    summary: "1 Chronicles 19:1-6 focuses on now it came to pass after this inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 19:1-6 as a focused part of David's Covenant and Victories.",
      "The section begins with \"Now It Came to Pass After This\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 19:7-12",
    chapter: 19,
    startVerse: 7,
    endVerse: 12,
    heading: "So They Hired Thirty and Two Thousand Chariots",
    summary: "1 Chronicles 19:7-12 focuses on so they hired thirty and two thousand chariots inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 19:7-12 as a focused part of David's Covenant and Victories.",
      "The section begins with \"So They Hired Thirty and Two Thousand Chariots\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 19:13-18",
    chapter: 19,
    startVerse: 13,
    endVerse: 18,
    heading: "Be of Good Courage",
    summary: "1 Chronicles 19:13-18 focuses on be of good courage inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 19:13-18 as a focused part of David's Covenant and Victories.",
      "The section begins with \"Be of Good Courage\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 19:19",
    chapter: 19,
    startVerse: 19,
    endVerse: 19,
    heading: "When the Servants of Hadarezer Saw That They Were",
    summary: "1 Chronicles 19:19 focuses on when the servants of hadarezer saw that they were inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 19:19 as a focused part of David's Covenant and Victories.",
      "The section begins with \"And When the Servants of Hadarezer Saw That They Were Put to the Worse Before Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 20:1-6",
    chapter: 20,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass",
    summary: "1 Chronicles 20:1-6 focuses on it came to pass inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 20:1-6 as a focused part of David's Covenant and Victories.",
      "The section begins with \"And It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 20:7-8",
    chapter: 20,
    startVerse: 7,
    endVerse: 8,
    heading: "When He Defied Israel",
    summary: "1 Chronicles 20:7-8 focuses on when he defied israel inside david's covenant and victories.",
    teaching: [
      "Read 1 Chronicles 20:7-8 as a focused part of David's Covenant and Victories.",
      "The section begins with \"But When He Defied Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_99_SECTIONS: DaySection[] = [
  {
    reference: "1 Chronicles 21:1-6",
    chapter: 21,
    startVerse: 1,
    endVerse: 6,
    heading: "Satan Stood Up Against Israel",
    summary: "1 Chronicles 21:1-6 focuses on satan stood up against israel inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 21:1-6 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"And Satan Stood Up Against Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 21:7-12",
    chapter: 21,
    startVerse: 7,
    endVerse: 12,
    heading: "God Was Displeased with This Thing",
    summary: "1 Chronicles 21:7-12 focuses on god was displeased with this thing inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 21:7-12 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"And God Was Displeased with This Thing\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 21:13-18",
    chapter: 21,
    startVerse: 13,
    endVerse: 18,
    heading: "David Said unto Gad",
    summary: "1 Chronicles 21:13-18 focuses on david said unto gad inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 21:13-18 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"And David Said unto Gad\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 21:19-24",
    chapter: 21,
    startVerse: 19,
    endVerse: 24,
    heading: "David Went Up at the Saying of Gad",
    summary: "1 Chronicles 21:19-24 focuses on david went up at the saying of gad inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 21:19-24 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"And David Went Up at the Saying of Gad\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 21:25-30",
    chapter: 21,
    startVerse: 25,
    endVerse: 30,
    heading: "So David Gave to Ornan for the Place Six",
    summary: "1 Chronicles 21:25-30 focuses on so david gave to ornan for the place six inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 21:25-30 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"So David Gave to Ornan for the Place Six Hundred Shekels of Gold by Weight\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 22:1-6",
    chapter: 22,
    startVerse: 1,
    endVerse: 6,
    heading: "Then David Said",
    summary: "1 Chronicles 22:1-6 focuses on then david said inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 22:1-6 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"Then David Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 22:7-12",
    chapter: 22,
    startVerse: 7,
    endVerse: 12,
    heading: "David Said to Solomon",
    summary: "1 Chronicles 22:7-12 focuses on david said to solomon inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 22:7-12 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"And David Said to Solomon\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 22:13-18",
    chapter: 22,
    startVerse: 13,
    endVerse: 18,
    heading: "Then Shalt Thou Prosper",
    summary: "1 Chronicles 22:13-18 focuses on then shalt thou prosper inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 22:13-18 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"Then Shalt Thou Prosper\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 22:19",
    chapter: 22,
    startVerse: 19,
    endVerse: 19,
    heading: "Now Set Your Heart and Your Soul to Seek",
    summary: "1 Chronicles 22:19 focuses on now set your heart and your soul to seek inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 22:19 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"Now Set Your Heart and Your Soul to Seek the LORD Your God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 23:1-6",
    chapter: 23,
    startVerse: 1,
    endVerse: 6,
    heading: "So When David Was Old and Full of Days",
    summary: "1 Chronicles 23:1-6 focuses on so when david was old and full of days inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 23:1-6 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"So When David Was Old and Full of Days\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 23:7-12",
    chapter: 23,
    startVerse: 7,
    endVerse: 12,
    heading: "Of the Gershonites Were",
    summary: "1 Chronicles 23:7-12 focuses on of the gershonites were inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 23:7-12 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"Of the Gershonites Were\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 23:13-18",
    chapter: 23,
    startVerse: 13,
    endVerse: 18,
    heading: "The Sons of Amram",
    summary: "1 Chronicles 23:13-18 focuses on the sons of amram inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 23:13-18 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"The Sons of Amram\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 23:19-24",
    chapter: 23,
    startVerse: 19,
    endVerse: 24,
    heading: "Of the Sons of Hebron",
    summary: "1 Chronicles 23:19-24 focuses on of the sons of hebron inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 23:19-24 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"🏙️ Of the Sons of Hebron\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 23:25-30",
    chapter: 23,
    startVerse: 25,
    endVerse: 30,
    heading: "For David Said",
    summary: "1 Chronicles 23:25-30 focuses on for david said inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 23:25-30 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"For David Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 23:31-32",
    chapter: 23,
    startVerse: 31,
    endVerse: 32,
    heading: "To Offer All Burnt Sacrifices unto the LORD",
    summary: "1 Chronicles 23:31-32 focuses on to offer all burnt sacrifices unto the lord inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 23:31-32 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"And to Offer All Burnt Sacrifices unto the LORD in the Sabbaths\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 24:1-6",
    chapter: 24,
    startVerse: 1,
    endVerse: 6,
    heading: "Now These Are the Divisions of the Sons",
    summary: "1 Chronicles 24:1-6 focuses on now these are the divisions of the sons inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 24:1-6 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"Now These Are the Divisions of the Sons of Aaron\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 24:7-12",
    chapter: 24,
    startVerse: 7,
    endVerse: 12,
    heading: "Now the First Lot Came Forth to Jehoiarib",
    summary: "1 Chronicles 24:7-12 focuses on now the first lot came forth to jehoiarib inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 24:7-12 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"Now the First Lot Came Forth to Jehoiarib\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 24:13-18",
    chapter: 24,
    startVerse: 13,
    endVerse: 18,
    heading: "The Thirteenth to Huppah",
    summary: "1 Chronicles 24:13-18 focuses on the thirteenth to huppah inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 24:13-18 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"The Thirteenth to Huppah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 24:19-24",
    chapter: 24,
    startVerse: 19,
    endVerse: 24,
    heading: "These Were the Orderings of Them in Their Service",
    summary: "1 Chronicles 24:19-24 focuses on these were the orderings of them in their service inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 24:19-24 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"These Were the Orderings of Them in Their Service to Come into the House of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 24:25-30",
    chapter: 24,
    startVerse: 25,
    endVerse: 30,
    heading: "The Brother of Michah Was Isshiah",
    summary: "1 Chronicles 24:25-30 focuses on the brother of michah was isshiah inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 24:25-30 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"The Brother of Michah Was Isshiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 24:31",
    chapter: 24,
    startVerse: 31,
    endVerse: 31,
    heading: "These Likewise Cast Lots Over Against Their Brethren",
    summary: "1 Chronicles 24:31 focuses on these likewise cast lots over against their brethren inside the temple site and priestly order.",
    teaching: [
      "Read 1 Chronicles 24:31 as a focused part of The Temple Site and Priestly Order.",
      "The section begins with \"These Likewise Cast Lots Over Against Their Brethren the Sons of Aaron in the Presence of David the King\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_100_SECTIONS: DaySection[] = [
  {
    reference: "1 Chronicles 25:1-6",
    chapter: 25,
    startVerse: 1,
    endVerse: 6,
    heading: "Moreover David and the Captains of the Host Separated",
    summary: "1 Chronicles 25:1-6 focuses on moreover david and the captains of the host separated inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 25:1-6 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"🗡️ Moreover David and the Captains of the Host Separated to the Service of the Sons of Asaph\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 25:7-12",
    chapter: 25,
    startVerse: 7,
    endVerse: 12,
    heading: "So the Number of Them",
    summary: "1 Chronicles 25:7-12 focuses on so the number of them inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 25:7-12 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"So the Number of Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 25:13-18",
    chapter: 25,
    startVerse: 13,
    endVerse: 18,
    heading: "The Sixth to Bukkiah",
    summary: "1 Chronicles 25:13-18 focuses on the sixth to bukkiah inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 25:13-18 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"The Sixth to Bukkiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 25:19-24",
    chapter: 25,
    startVerse: 19,
    endVerse: 24,
    heading: "The Twelfth to Hashabiah",
    summary: "1 Chronicles 25:19-24 focuses on the twelfth to hashabiah inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 25:19-24 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"The Twelfth to Hashabiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 25:25-30",
    chapter: 25,
    startVerse: 25,
    endVerse: 30,
    heading: "The Eighteenth to Hanani",
    summary: "1 Chronicles 25:25-30 focuses on the eighteenth to hanani inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 25:25-30 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"The Eighteenth to Hanani\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 25:31",
    chapter: 25,
    startVerse: 31,
    endVerse: 31,
    heading: "The Four and Twentieth to Romamti-ezer",
    summary: "1 Chronicles 25:31 focuses on the four and twentieth to romamti-ezer inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 25:31 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"The Four and Twentieth to Romamti-ezer\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 26:1-6",
    chapter: 26,
    startVerse: 1,
    endVerse: 6,
    heading: "Concerning the Divisions of the Porters",
    summary: "1 Chronicles 26:1-6 focuses on concerning the divisions of the porters inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 26:1-6 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"Concerning the Divisions of the Porters\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 26:7-12",
    chapter: 26,
    startVerse: 7,
    endVerse: 12,
    heading: "The Sons of Shemaiah",
    summary: "1 Chronicles 26:7-12 focuses on the sons of shemaiah inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 26:7-12 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"The Sons of Shemaiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 26:13-18",
    chapter: 26,
    startVerse: 13,
    endVerse: 18,
    heading: "They Cast Lots",
    summary: "1 Chronicles 26:13-18 focuses on they cast lots inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 26:13-18 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"And They Cast Lots\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 26:19-24",
    chapter: 26,
    startVerse: 19,
    endVerse: 24,
    heading: "These Are the Divisions of the Porters Among",
    summary: "1 Chronicles 26:19-24 focuses on these are the divisions of the porters among inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 26:19-24 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"These Are the Divisions of the Porters Among the Sons of Kore\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 26:25-30",
    chapter: 26,
    startVerse: 25,
    endVerse: 30,
    heading: "His Brethren by Eliezer",
    summary: "1 Chronicles 26:25-30 focuses on his brethren by eliezer inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 26:25-30 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"And His Brethren by Eliezer\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 26:31-32",
    chapter: 26,
    startVerse: 31,
    endVerse: 32,
    heading: "Among the Hebronites Was Jerijah the Chief",
    summary: "1 Chronicles 26:31-32 focuses on among the hebronites was jerijah the chief inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 26:31-32 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"🏙️ Among the Hebronites Was Jerijah the Chief\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 27:1-6",
    chapter: 27,
    startVerse: 1,
    endVerse: 6,
    heading: "Now the Children of Israel After Their Number",
    summary: "1 Chronicles 27:1-6 focuses on now the children of israel after their number inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 27:1-6 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"Now the Children of Israel After Their Number\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 27:7-12",
    chapter: 27,
    startVerse: 7,
    endVerse: 12,
    heading: "The Fourth Captain for the Fourth Month Was Asahel",
    summary: "1 Chronicles 27:7-12 focuses on the fourth captain for the fourth month was asahel inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 27:7-12 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"The Fourth Captain for the Fourth Month Was Asahel the Brother of Joab\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 27:13-18",
    chapter: 27,
    startVerse: 13,
    endVerse: 18,
    heading: "The Tenth Captain for the Tenth Month Was Maharai",
    summary: "1 Chronicles 27:13-18 focuses on the tenth captain for the tenth month was maharai inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 27:13-18 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"The Tenth Captain for the Tenth Month Was Maharai the Netophathite\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 27:19-24",
    chapter: 27,
    startVerse: 19,
    endVerse: 24,
    heading: "Ishmaiah the Son of Obadiah",
    summary: "1 Chronicles 27:19-24 focuses on ishmaiah the son of obadiah inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 27:19-24 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"Ishmaiah the Son of Obadiah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 27:25-30",
    chapter: 27,
    startVerse: 25,
    endVerse: 30,
    heading: "Over the King’s Treasures Was Azmaveth the Son",
    summary: "1 Chronicles 27:25-30 focuses on over the king’s treasures was azmaveth the son inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 27:25-30 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"And Over the King’s Treasures Was Azmaveth the Son of Adiel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 27:31-34",
    chapter: 27,
    startVerse: 31,
    endVerse: 34,
    heading: "Over the Flocks Was Jaziz the Hagerite",
    summary: "1 Chronicles 27:31-34 focuses on over the flocks was jaziz the hagerite inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 27:31-34 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"And Over the Flocks Was Jaziz the Hagerite\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 28:1-6",
    chapter: 28,
    startVerse: 1,
    endVerse: 6,
    heading: "David Assembled All the Princes of Israel",
    summary: "1 Chronicles 28:1-6 focuses on david assembled all the princes of israel inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 28:1-6 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"And David Assembled All the Princes of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 28:7-12",
    chapter: 28,
    startVerse: 7,
    endVerse: 12,
    heading: "Moreover I Will Establish His Kingdom for Ever",
    summary: "1 Chronicles 28:7-12 focuses on moreover i will establish his kingdom for ever inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 28:7-12 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"Moreover I Will Establish His Kingdom for Ever\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 28:13-18",
    chapter: 28,
    startVerse: 13,
    endVerse: 18,
    heading: "Also for the Courses of the Priests",
    summary: "1 Chronicles 28:13-18 focuses on also for the courses of the priests inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 28:13-18 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"Also for the Courses of the Priests and the Levites\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 28:19-21",
    chapter: 28,
    startVerse: 19,
    endVerse: 21,
    heading: "The LORD Made Me Understand in Writing by His",
    summary: "1 Chronicles 28:19-21 focuses on the lord made me understand in writing by his inside worship teams and temple plans.",
    teaching: [
      "Read 1 Chronicles 28:19-21 as a focused part of Worship Teams and Temple Plans.",
      "The section begins with \"The LORD Made Me Understand in Writing by His Hand Upon Me\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_101_SECTIONS: DaySection[] = [
  {
    reference: "1 Chronicles 29:1-6",
    chapter: 29,
    startVerse: 1,
    endVerse: 6,
    heading: "Furthermore David the King Said unto All the Congregation",
    summary: "1 Chronicles 29:1-6 focuses on furthermore david the king said unto all the congregation inside david's offering and solomon's temple.",
    teaching: [
      "Read 1 Chronicles 29:1-6 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"Furthermore David the King Said unto All the Congregation\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 29:7-12",
    chapter: 29,
    startVerse: 7,
    endVerse: 12,
    heading: "Gave for the Service of the House of God",
    summary: "1 Chronicles 29:7-12 focuses on gave for the service of the house of god inside david's offering and solomon's temple.",
    teaching: [
      "Read 1 Chronicles 29:7-12 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"And Gave for the Service of the House of God of Gold Five Thousand Talents and Ten Thousand Drams\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 29:13-18",
    chapter: 29,
    startVerse: 13,
    endVerse: 18,
    heading: "We Thank Thee",
    summary: "1 Chronicles 29:13-18 focuses on we thank thee inside david's offering and solomon's temple.",
    teaching: [
      "Read 1 Chronicles 29:13-18 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"We Thank Thee\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 29:19-24",
    chapter: 29,
    startVerse: 19,
    endVerse: 24,
    heading: "Give unto Solomon My Son a Perfect Heart",
    summary: "1 Chronicles 29:19-24 focuses on give unto solomon my son a perfect heart inside david's offering and solomon's temple.",
    teaching: [
      "Read 1 Chronicles 29:19-24 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"And Give unto Solomon My Son a Perfect Heart\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "1 Chronicles 29:25-30",
    chapter: 29,
    startVerse: 25,
    endVerse: 30,
    heading: "The LORD Magnified Solomon Exceedingly in the Sight",
    summary: "1 Chronicles 29:25-30 focuses on the lord magnified solomon exceedingly in the sight inside david's offering and solomon's temple.",
    teaching: [
      "Read 1 Chronicles 29:25-30 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"And the LORD Magnified Solomon Exceedingly in the Sight of All Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 1:1-6",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    heading: "Solomon the Son of David Was Strengthened in His",
    summary: "2 Chronicles 1:1-6 focuses on solomon the son of david was strengthened in his inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 1:1-6 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"And Solomon the Son of David Was Strengthened in His Kingdom\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 1:7-12",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    heading: "In That Night Did God Appear unto Solomon",
    summary: "2 Chronicles 1:7-12 focuses on in that night did god appear unto solomon inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 1:7-12 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"In That Night Did God Appear unto Solomon\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 1:13-17",
    chapter: 1,
    startVerse: 13,
    endVerse: 17,
    heading: "Then Solomon Came from His Journey to the High",
    summary: "2 Chronicles 1:13-17 focuses on then solomon came from his journey to the high inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 1:13-17 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"🏙️ Then Solomon Came from His Journey to the High Place That Was at Gibeon to Jerusalem\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 2:1-6",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    heading: "Solomon Determined to Build an House for the Name",
    summary: "2 Chronicles 2:1-6 focuses on solomon determined to build an house for the name inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 2:1-6 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"And Solomon Determined to Build an House for the Name of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 2:7-12",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    heading: "Send Me Now Therefore a Man Cunning to Work",
    summary: "2 Chronicles 2:7-12 focuses on send me now therefore a man cunning to work inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 2:7-12 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"Send Me Now Therefore a Man Cunning to Work in Gold\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 2:13-18",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    heading: "Now I Have Sent a Cunning Man",
    summary: "2 Chronicles 2:13-18 focuses on now i have sent a cunning man inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 2:13-18 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"And Now I Have Sent a Cunning Man\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 3:1-6",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    heading: "Then Solomon Began to Build the House",
    summary: "2 Chronicles 3:1-6 focuses on then solomon began to build the house inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 3:1-6 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"Then Solomon Began to Build the House of the LORD at Jerusalem in Mount Moriah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 3:7-12",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    heading: "He Overlaid Also the House",
    summary: "2 Chronicles 3:7-12 focuses on he overlaid also the house inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 3:7-12 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"He Overlaid Also the House\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 3:13-17",
    chapter: 3,
    startVerse: 13,
    endVerse: 17,
    heading: "The Wings of These Cherubims Spread Themselves Forth Twenty",
    summary: "2 Chronicles 3:13-17 focuses on the wings of these cherubims spread themselves forth twenty inside david's offering and solomon's temple.",
    teaching: [
      "Read 2 Chronicles 3:13-17 as a focused part of David's Offering and Solomon's Temple.",
      "The section begins with \"The Wings of These Cherubims Spread Themselves Forth Twenty Cubits\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_102_SECTIONS: DaySection[] = [
  {
    reference: "2 Chronicles 4:1-6",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    heading: "Moreover He Made an Altar of Brass",
    summary: "2 Chronicles 4:1-6 focuses on moreover he made an altar of brass inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 4:1-6 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Moreover He Made an Altar of Brass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 4:7-12",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    heading: "He Made Ten Candlesticks of Gold According to Their",
    summary: "2 Chronicles 4:7-12 focuses on he made ten candlesticks of gold according to their inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 4:7-12 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"And He Made Ten Candlesticks of Gold According to Their Form\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 4:13-18",
    chapter: 4,
    startVerse: 13,
    endVerse: 18,
    heading: "Four Hundred Pomegranates on the Two Wreaths",
    summary: "2 Chronicles 4:13-18 focuses on four hundred pomegranates on the two wreaths inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 4:13-18 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"And Four Hundred Pomegranates on the Two Wreaths\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 4:19-22",
    chapter: 4,
    startVerse: 19,
    endVerse: 22,
    heading: "Solomon Made All the Vessels Were for the House",
    summary: "2 Chronicles 4:19-22 focuses on solomon made all the vessels were for the house inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 4:19-22 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"And Solomon Made All the Vessels That Were for the House of God\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 5:1-6",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    heading: "Thus All the Work That Solomon Made",
    summary: "2 Chronicles 5:1-6 focuses on thus all the work that solomon made inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 5:1-6 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Thus All the Work That Solomon Made for the House of the LORD Was Finished\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 5:7-12",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    heading: "The Priests Brought in the Ark of the Covenant",
    summary: "2 Chronicles 5:7-12 focuses on the priests brought in the ark of the covenant inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 5:7-12 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"And the Priests Brought in the Ark of the Covenant of the LORD unto His Place\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 5:13-14",
    chapter: 5,
    startVerse: 13,
    endVerse: 14,
    heading: "It Came Even to Pass",
    summary: "2 Chronicles 5:13-14 focuses on it came even to pass inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 5:13-14 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"It Came Even to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 6:1-6",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    heading: "Then Said Solomon",
    summary: "2 Chronicles 6:1-6 focuses on then said solomon inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 6:1-6 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Then Said Solomon\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 6:7-12",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    heading: "Now It Was in the Heart of David My",
    summary: "2 Chronicles 6:7-12 focuses on now it was in the heart of david my inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 6:7-12 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Now It Was in the Heart of David My Father to Build an House for the Name of the LORD God of Israel\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 6:13-18",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    heading: "For Solomon Had Made a Brasen Scaffold",
    summary: "2 Chronicles 6:13-18 focuses on for solomon had made a brasen scaffold inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 6:13-18 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"For Solomon Had Made a Brasen Scaffold\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 6:19-24",
    chapter: 6,
    startVerse: 19,
    endVerse: 24,
    heading: "Have Respect Therefore to the Prayer of Thy Servant",
    summary: "2 Chronicles 6:19-24 focuses on have respect therefore to the prayer of thy servant inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 6:19-24 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Have Respect Therefore to the Prayer of Thy Servant\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 6:25-30",
    chapter: 6,
    startVerse: 25,
    endVerse: 30,
    heading: "Then Hear Thou from the Heavens",
    summary: "2 Chronicles 6:25-30 focuses on then hear thou from the heavens inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 6:25-30 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Then Hear Thou from the Heavens\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 6:31-36",
    chapter: 6,
    startVerse: 31,
    endVerse: 36,
    heading: "That They May Fear Thee",
    summary: "2 Chronicles 6:31-36 focuses on that they may fear thee inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 6:31-36 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"That They May Fear Thee\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 6:37-42",
    chapter: 6,
    startVerse: 37,
    endVerse: 42,
    heading: "Yet If They Bethink Themselves in the Land Whither",
    summary: "2 Chronicles 6:37-42 focuses on yet if they bethink themselves in the land whither inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 6:37-42 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Yet If They Bethink Themselves in the Land Whither They Are Carried Captive\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 7:1-6",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    heading: "Now When Solomon Had Made an End of Praying",
    summary: "2 Chronicles 7:1-6 focuses on now when solomon had made an end of praying inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 7:1-6 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Now When Solomon Had Made an End of Praying\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 7:7-12",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    heading: "Moreover Solomon Hallowed the Middle of the Court Was",
    summary: "2 Chronicles 7:7-12 focuses on moreover solomon hallowed the middle of the court was inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 7:7-12 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"Moreover Solomon Hallowed the Middle of the Court That Was Before the House of the LORD\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 7:13-18",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    heading: "If I Shut Up Heaven That There Be No",
    summary: "2 Chronicles 7:13-18 focuses on if i shut up heaven that there be no inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 7:13-18 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"If I Shut Up Heaven That There Be No Rain\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 7:19-22",
    chapter: 7,
    startVerse: 19,
    endVerse: 22,
    heading: "If Ye Turn Away",
    summary: "2 Chronicles 7:19-22 focuses on if ye turn away inside temple dedication and god's glory.",
    teaching: [
      "Read 2 Chronicles 7:19-22 as a focused part of Temple Dedication and God's Glory.",
      "The section begins with \"But If Ye Turn Away\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_103_SECTIONS: DaySection[] = [
  {
    reference: "2 Chronicles 8:1-6",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass at the End of Twenty",
    summary: "2 Chronicles 8:1-6 focuses on it came to pass at the end of twenty inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 8:1-6 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And It Came to Pass at the End of Twenty Years\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 8:7-12",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    heading: "As for All the People Were Left",
    summary: "2 Chronicles 8:7-12 focuses on as for all the people were left inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 8:7-12 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"As for All the People That Were Left of the Hittites\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 8:13-18",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    heading: "Even After a Certain Rate Every Day",
    summary: "2 Chronicles 8:13-18 focuses on even after a certain rate every day inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 8:13-18 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"Even After a Certain Rate Every Day\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 9:1-6",
    chapter: 9,
    startVerse: 1,
    endVerse: 6,
    heading: "When the Queen of Sheba Heard of the Fame",
    summary: "2 Chronicles 9:1-6 focuses on when the queen of sheba heard of the fame inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 9:1-6 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And When the Queen of Sheba Heard of the Fame of Solomon\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 9:7-12",
    chapter: 9,
    startVerse: 7,
    endVerse: 12,
    heading: "Happy Are Thy Men",
    summary: "2 Chronicles 9:7-12 focuses on happy are thy men inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 9:7-12 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"Happy Are Thy Men\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 9:13-18",
    chapter: 9,
    startVerse: 13,
    endVerse: 18,
    heading: "Now the Weight of Gold That Came to Solomon",
    summary: "2 Chronicles 9:13-18 focuses on now the weight of gold that came to solomon inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 9:13-18 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"Now the Weight of Gold That Came to Solomon in One Year Was Six Hundred and Threescore and Six Talents of Gold\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 9:19-24",
    chapter: 9,
    startVerse: 19,
    endVerse: 24,
    heading: "Twelve Lions Stood There on the One Side",
    summary: "2 Chronicles 9:19-24 focuses on twelve lions stood there on the one side inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 9:19-24 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And Twelve Lions Stood There on the One Side and on the Other Upon the Six Steps\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 9:25-30",
    chapter: 9,
    startVerse: 25,
    endVerse: 30,
    heading: "Solomon Had Four Thousand Stalls for Horses and Chariots",
    summary: "2 Chronicles 9:25-30 focuses on solomon had four thousand stalls for horses and chariots inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 9:25-30 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And Solomon Had Four Thousand Stalls for Horses and Chariots\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 9:31",
    chapter: 9,
    startVerse: 31,
    endVerse: 31,
    heading: "Solomon Slept with His Fathers",
    summary: "2 Chronicles 9:31 focuses on solomon slept with his fathers inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 9:31 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And Solomon Slept with His Fathers\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 10:1-6",
    chapter: 10,
    startVerse: 1,
    endVerse: 6,
    heading: "Rehoboam Went to Shechem",
    summary: "2 Chronicles 10:1-6 focuses on rehoboam went to shechem inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 10:1-6 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"🏙️ And Rehoboam Went to Shechem\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 10:7-12",
    chapter: 10,
    startVerse: 7,
    endVerse: 12,
    heading: "They Spake unto Him",
    summary: "2 Chronicles 10:7-12 focuses on they spake unto him inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 10:7-12 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And They Spake unto Him\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 10:13-18",
    chapter: 10,
    startVerse: 13,
    endVerse: 18,
    heading: "The King Answered Them Roughly",
    summary: "2 Chronicles 10:13-18 focuses on the king answered them roughly inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 10:13-18 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And the King Answered Them Roughly\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 10:19",
    chapter: 10,
    startVerse: 19,
    endVerse: 19,
    heading: "Israel Rebelled Against the House of David unto This",
    summary: "2 Chronicles 10:19 focuses on israel rebelled against the house of david unto this inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 10:19 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And Israel Rebelled Against the House of David unto This Day\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 11:1-6",
    chapter: 11,
    startVerse: 1,
    endVerse: 6,
    heading: "When Rehoboam Was Come to Jerusalem",
    summary: "2 Chronicles 11:1-6 focuses on when rehoboam was come to jerusalem inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 11:1-6 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"🏙️ And When Rehoboam Was Come to Jerusalem\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 11:7-12",
    chapter: 11,
    startVerse: 7,
    endVerse: 12,
    heading: "Which Are in Judah and in Benjamin Fenced Cities",
    summary: "2 Chronicles 11:7-12 focuses on which are in judah and in benjamin fenced cities inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 11:7-12 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"Which Are in Judah and in Benjamin Fenced Cities\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 11:13-18",
    chapter: 11,
    startVerse: 13,
    endVerse: 18,
    heading: "The Priests and the Levites Were in All Israel",
    summary: "2 Chronicles 11:13-18 focuses on the priests and the levites were in all israel inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 11:13-18 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"And the Priests and the Levites That Were in All Israel Resorted to Him Out of All Their Coasts\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 11:19-23",
    chapter: 11,
    startVerse: 19,
    endVerse: 23,
    heading: "Which Bare Him Children",
    summary: "2 Chronicles 11:19-23 focuses on which bare him children inside solomon's reign and the divided kingdom.",
    teaching: [
      "Read 2 Chronicles 11:19-23 as a focused part of Solomon's Reign and the Divided Kingdom.",
      "The section begins with \"Which Bare Him Children\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_104_SECTIONS: DaySection[] = [
  {
    reference: "2 Chronicles 12:1-6",
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass",
    summary: "2 Chronicles 12:1-6 focuses on it came to pass inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 12:1-6 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"And It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 12:7-12",
    chapter: 12,
    startVerse: 7,
    endVerse: 12,
    heading: "When the LORD Saw That They Humbled Themselves",
    summary: "2 Chronicles 12:7-12 focuses on when the lord saw that they humbled themselves inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 12:7-12 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"And When the LORD Saw That They Humbled Themselves\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 12:13-16",
    chapter: 12,
    startVerse: 13,
    endVerse: 16,
    heading: "So King Rehoboam Strengthened Himself in Jerusalem",
    summary: "2 Chronicles 12:13-16 focuses on so king rehoboam strengthened himself in jerusalem inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 12:13-16 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"So King Rehoboam Strengthened Himself in Jerusalem\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 13:1-6",
    chapter: 13,
    startVerse: 1,
    endVerse: 6,
    heading: "Now in the Eighteenth Year of King Jeroboam Began",
    summary: "2 Chronicles 13:1-6 focuses on now in the eighteenth year of king jeroboam began inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 13:1-6 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"Now in the Eighteenth Year of King Jeroboam Began Abijah to Reign Over Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 13:7-12",
    chapter: 13,
    startVerse: 7,
    endVerse: 12,
    heading: "There Are Gathered unto Him Vain Men",
    summary: "2 Chronicles 13:7-12 focuses on there are gathered unto him vain men inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 13:7-12 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"And There Are Gathered unto Him Vain Men\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 13:13-18",
    chapter: 13,
    startVerse: 13,
    endVerse: 18,
    heading: "Jeroboam Caused an Ambushment to Come About Behind Them",
    summary: "2 Chronicles 13:13-18 focuses on jeroboam caused an ambushment to come about behind them inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 13:13-18 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"But Jeroboam Caused an Ambushment to Come About Behind Them\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 13:19-22",
    chapter: 13,
    startVerse: 19,
    endVerse: 22,
    heading: "Abijah Pursued After Jeroboam",
    summary: "2 Chronicles 13:19-22 focuses on abijah pursued after jeroboam inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 13:19-22 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"And Abijah Pursued After Jeroboam\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 14:1-6",
    chapter: 14,
    startVerse: 1,
    endVerse: 6,
    heading: "So Abijah Slept with His Fathers",
    summary: "2 Chronicles 14:1-6 focuses on so abijah slept with his fathers inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 14:1-6 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"So Abijah Slept with His Fathers\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 14:7-12",
    chapter: 14,
    startVerse: 7,
    endVerse: 12,
    heading: "Therefore He Said unto Judah",
    summary: "2 Chronicles 14:7-12 focuses on therefore he said unto judah inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 14:7-12 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"Therefore He Said unto Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 14:13-15",
    chapter: 14,
    startVerse: 13,
    endVerse: 15,
    heading: "Asa and the People Were with Him Pursued Them",
    summary: "2 Chronicles 14:13-15 focuses on asa and the people were with him pursued them inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 14:13-15 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"And Asa and the People That Were with Him Pursued Them unto Gerar\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 15:1-6",
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    heading: "The Spirit of God Came Upon Azariah the Son",
    summary: "2 Chronicles 15:1-6 focuses on the spirit of god came upon azariah the son inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 15:1-6 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"And the Spirit of God Came Upon Azariah the Son of Oded\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 15:7-12",
    chapter: 15,
    startVerse: 7,
    endVerse: 12,
    heading: "Be Ye Strong Therefore",
    summary: "2 Chronicles 15:7-12 focuses on be ye strong therefore inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 15:7-12 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"Be Ye Strong Therefore\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 15:13-18",
    chapter: 15,
    startVerse: 13,
    endVerse: 18,
    heading: "That Whosoever Would Not Seek the LORD God",
    summary: "2 Chronicles 15:13-18 focuses on that whosoever would not seek the lord god inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 15:13-18 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"That Whosoever Would Not Seek the LORD God of Israel Should Be Put to Death\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 15:19",
    chapter: 15,
    startVerse: 19,
    endVerse: 19,
    heading: "There Was No More War unto the Five",
    summary: "2 Chronicles 15:19 focuses on there was no more war unto the five inside kings, reform, and returning to god.",
    teaching: [
      "Read 2 Chronicles 15:19 as a focused part of Kings, Reform, and Returning to God.",
      "The section begins with \"And There Was No More War unto the Five and Thirtieth Year of the Reign of Asa\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

const DAY_105_SECTIONS: DaySection[] = [
  {
    reference: "2 Chronicles 16:1-6",
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    heading: "In the Six and Thirtieth Year of the Reign",
    summary: "2 Chronicles 16:1-6 focuses on in the six and thirtieth year of the reign inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 16:1-6 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"In the Six and Thirtieth Year of the Reign of Asa Baasha King of Israel Came Up Against Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 16:7-12",
    chapter: 16,
    startVerse: 7,
    endVerse: 12,
    heading: "At That Time Hanani the Seer Came to Asa",
    summary: "2 Chronicles 16:7-12 focuses on at that time hanani the seer came to asa inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 16:7-12 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And at That Time Hanani the Seer Came to Asa King of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 16:13-14",
    chapter: 16,
    startVerse: 13,
    endVerse: 14,
    heading: "Asa Slept with His Fathers",
    summary: "2 Chronicles 16:13-14 focuses on asa slept with his fathers inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 16:13-14 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And Asa Slept with His Fathers\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 17:1-6",
    chapter: 17,
    startVerse: 1,
    endVerse: 6,
    heading: "Jehoshaphat His Son Reigned in His Stead",
    summary: "2 Chronicles 17:1-6 focuses on jehoshaphat his son reigned in his stead inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 17:1-6 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And Jehoshaphat His Son Reigned in His Stead\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 17:7-12",
    chapter: 17,
    startVerse: 7,
    endVerse: 12,
    heading: "Also in the Third Year of His Reign He",
    summary: "2 Chronicles 17:7-12 focuses on also in the third year of his reign he inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 17:7-12 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"Also in the Third Year of His Reign He Sent to His Princes\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 17:13-18",
    chapter: 17,
    startVerse: 13,
    endVerse: 18,
    heading: "He Had Much Business in the Cities of Judah",
    summary: "2 Chronicles 17:13-18 focuses on he had much business in the cities of judah inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 17:13-18 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And He Had Much Business in the Cities of Judah\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 17:19",
    chapter: 17,
    startVerse: 19,
    endVerse: 19,
    heading: "These Waited on the King",
    summary: "2 Chronicles 17:19 focuses on these waited on the king inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 17:19 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"These Waited on the King\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 18:1-6",
    chapter: 18,
    startVerse: 1,
    endVerse: 6,
    heading: "Now Jehoshaphat Had Riches and Honour in Abundance",
    summary: "2 Chronicles 18:1-6 focuses on now jehoshaphat had riches and honour in abundance inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 18:1-6 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"Now Jehoshaphat Had Riches and Honour in Abundance\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 18:7-12",
    chapter: 18,
    startVerse: 7,
    endVerse: 12,
    heading: "The King of Israel Said unto Jehoshaphat",
    summary: "2 Chronicles 18:7-12 focuses on the king of israel said unto jehoshaphat inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 18:7-12 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And the King of Israel Said unto Jehoshaphat\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 18:13-18",
    chapter: 18,
    startVerse: 13,
    endVerse: 18,
    heading: "Micaiah Said",
    summary: "2 Chronicles 18:13-18 focuses on micaiah said inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 18:13-18 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And Micaiah Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 18:19-24",
    chapter: 18,
    startVerse: 19,
    endVerse: 24,
    heading: "The LORD Said",
    summary: "2 Chronicles 18:19-24 focuses on the lord said inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 18:19-24 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And the LORD Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 18:25-30",
    chapter: 18,
    startVerse: 25,
    endVerse: 30,
    heading: "Then the King of Israel Said",
    summary: "2 Chronicles 18:25-30 focuses on then the king of israel said inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 18:25-30 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"Then the King of Israel Said\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 18:31-34",
    chapter: 18,
    startVerse: 31,
    endVerse: 34,
    heading: "It Came to Pass",
    summary: "2 Chronicles 18:31-34 focuses on it came to pass inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 18:31-34 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And It Came to Pass\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 19:1-6",
    chapter: 19,
    startVerse: 1,
    endVerse: 6,
    heading: "Jehoshaphat the King of Judah Returned to His House",
    summary: "2 Chronicles 19:1-6 focuses on jehoshaphat the king of judah returned to his house inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 19:1-6 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"And Jehoshaphat the King of Judah Returned to His House in Peace to Jerusalem\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  },
  {
    reference: "2 Chronicles 19:7-11",
    chapter: 19,
    startVerse: 7,
    endVerse: 11,
    heading: "Wherefore Now Let the Fear of the LORD Be",
    summary: "2 Chronicles 19:7-11 focuses on wherefore now let the fear of the lord be inside asa, jehoshaphat, and trust.",
    teaching: [
      "Read 2 Chronicles 19:7-11 as a focused part of Asa, Jehoshaphat, and Trust.",
      "The section begins with \"Wherefore Now Let the Fear of the LORD Be Upon You\" and keeps the reader close to the Bible's own wording.",
      "The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.",
      "Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section."
    ]
  }
];

export const CHRONICLES_DAY_NINETY_SIX_RETURN_SAUL_AND_DAVIDS_SUPPORTERS_LESSON = makeLesson(
  96,
  "Return, Saul, and David's Supporters",
  "1 Chronicles 9-12",
  DAY_96_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Chronicles 9-12.",
    "Return, Saul, and David's Supporters shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 96 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_NINETY_SEVEN_THE_ARK_COMES_TO_JERUSALEM_LESSON = makeLesson(
  97,
  "The Ark Comes to Jerusalem",
  "1 Chronicles 13-16",
  DAY_97_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Chronicles 13-16.",
    "The Ark Comes to Jerusalem shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 97 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_NINETY_EIGHT_DAVIDS_COVENANT_AND_VICTORIES_LESSON = makeLesson(
  98,
  "David's Covenant and Victories",
  "1 Chronicles 17-20",
  DAY_98_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Chronicles 17-20.",
    "David's Covenant and Victories shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 98 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_NINETY_NINE_THE_TEMPLE_SITE_AND_PRIESTLY_ORDER_LESSON = makeLesson(
  99,
  "The Temple Site and Priestly Order",
  "1 Chronicles 21-24",
  DAY_99_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Chronicles 21-24.",
    "The Temple Site and Priestly Order shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 99 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_ONE_HUNDRED_WORSHIP_TEAMS_AND_TEMPLE_PLANS_LESSON = makeLesson(
  100,
  "Worship Teams and Temple Plans",
  "1 Chronicles 25-28",
  DAY_100_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Chronicles 25-28.",
    "Worship Teams and Temple Plans shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 100 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_ONE_HUNDRED_ONE_DAVIDS_OFFERING_AND_SOLOMONS_TEMPLE_LESSON = makeLesson(
  101,
  "David's Offering and Solomon's Temple",
  "1 Chronicles 29; 2 Chronicles 1-3",
  DAY_101_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Chronicles 29; 2 Chronicles 1-3.",
    "David's Offering and Solomon's Temple shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 101 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_ONE_HUNDRED_TWO_TEMPLE_DEDICATION_AND_GODS_GLORY_LESSON = makeLesson(
  102,
  "Temple Dedication and God's Glory",
  "2 Chronicles 4-7",
  DAY_102_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Chronicles 4-7.",
    "Temple Dedication and God's Glory shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 102 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_ONE_HUNDRED_THREE_SOLOMONS_REIGN_AND_THE_DIVIDED_KINGDOM_LESSON = makeLesson(
  103,
  "Solomon's Reign and the Divided Kingdom",
  "2 Chronicles 8-11",
  DAY_103_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Chronicles 8-11.",
    "Solomon's Reign and the Divided Kingdom shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 103 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_ONE_HUNDRED_FOUR_KINGS_REFORM_AND_RETURNING_TO_GOD_LESSON = makeLesson(
  104,
  "Kings, Reform, and Returning to God",
  "2 Chronicles 12-15",
  DAY_104_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Chronicles 12-15.",
    "Kings, Reform, and Returning to God shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 104 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const CHRONICLES_DAY_ONE_HUNDRED_FIVE_ASA_JEHOSHAPHAT_AND_TRUST_LESSON = makeLesson(
  105,
  "Asa, Jehoshaphat, and Trust",
  "2 Chronicles 16-19",
  DAY_105_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Chronicles 16-19.",
    "Asa, Jehoshaphat, and Trust shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 105 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const BIBLE_YEAR_DAY_96_DEEP_NOTES = makeDeepNotes(
  "Return, Saul, and David's Supporters",
  [
  "1 Chronicles 9",
  "1 Chronicles 10",
  "1 Chronicles 11",
  "1 Chronicles 12"
],
  [
    "Day 96 covers 1 Chronicles 9-12.",
    "Return, Saul, and David's Supporters belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_96_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_97_DEEP_NOTES = makeDeepNotes(
  "The Ark Comes to Jerusalem",
  [
  "1 Chronicles 13",
  "1 Chronicles 14",
  "1 Chronicles 15",
  "1 Chronicles 16"
],
  [
    "Day 97 covers 1 Chronicles 13-16.",
    "The Ark Comes to Jerusalem belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_97_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_98_DEEP_NOTES = makeDeepNotes(
  "David's Covenant and Victories",
  [
  "1 Chronicles 17",
  "1 Chronicles 18",
  "1 Chronicles 19",
  "1 Chronicles 20"
],
  [
    "Day 98 covers 1 Chronicles 17-20.",
    "David's Covenant and Victories belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_98_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_99_DEEP_NOTES = makeDeepNotes(
  "The Temple Site and Priestly Order",
  [
  "1 Chronicles 21",
  "1 Chronicles 22",
  "1 Chronicles 23",
  "1 Chronicles 24"
],
  [
    "Day 99 covers 1 Chronicles 21-24.",
    "The Temple Site and Priestly Order belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_99_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_100_DEEP_NOTES = makeDeepNotes(
  "Worship Teams and Temple Plans",
  [
  "1 Chronicles 25",
  "1 Chronicles 26",
  "1 Chronicles 27",
  "1 Chronicles 28"
],
  [
    "Day 100 covers 1 Chronicles 25-28.",
    "Worship Teams and Temple Plans belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_100_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_101_DEEP_NOTES = makeDeepNotes(
  "David's Offering and Solomon's Temple",
  [
  "1 Chronicles 29",
  "2 Chronicles 1",
  "2 Chronicles 2",
  "2 Chronicles 3"
],
  [
    "Day 101 covers 1 Chronicles 29; 2 Chronicles 1-3.",
    "David's Offering and Solomon's Temple belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_101_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_102_DEEP_NOTES = makeDeepNotes(
  "Temple Dedication and God's Glory",
  [
  "2 Chronicles 4",
  "2 Chronicles 5",
  "2 Chronicles 6",
  "2 Chronicles 7"
],
  [
    "Day 102 covers 2 Chronicles 4-7.",
    "Temple Dedication and God's Glory belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_102_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_103_DEEP_NOTES = makeDeepNotes(
  "Solomon's Reign and the Divided Kingdom",
  [
  "2 Chronicles 8",
  "2 Chronicles 9",
  "2 Chronicles 10",
  "2 Chronicles 11"
],
  [
    "Day 103 covers 2 Chronicles 8-11.",
    "Solomon's Reign and the Divided Kingdom belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_103_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_104_DEEP_NOTES = makeDeepNotes(
  "Kings, Reform, and Returning to God",
  [
  "2 Chronicles 12",
  "2 Chronicles 13",
  "2 Chronicles 14",
  "2 Chronicles 15"
],
  [
    "Day 104 covers 2 Chronicles 12-15.",
    "Kings, Reform, and Returning to God belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_104_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_105_DEEP_NOTES = makeDeepNotes(
  "Asa, Jehoshaphat, and Trust",
  [
  "2 Chronicles 16",
  "2 Chronicles 17",
  "2 Chronicles 18",
  "2 Chronicles 19"
],
  [
    "Day 105 covers 2 Chronicles 16-19.",
    "Asa, Jehoshaphat, and Trust belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_105_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_96_DEEP_STUDY_SECTIONS = makeStudySections(DAY_96_SECTIONS);
export const BIBLE_YEAR_DAY_97_DEEP_STUDY_SECTIONS = makeStudySections(DAY_97_SECTIONS);
export const BIBLE_YEAR_DAY_98_DEEP_STUDY_SECTIONS = makeStudySections(DAY_98_SECTIONS);
export const BIBLE_YEAR_DAY_99_DEEP_STUDY_SECTIONS = makeStudySections(DAY_99_SECTIONS);
export const BIBLE_YEAR_DAY_100_DEEP_STUDY_SECTIONS = makeStudySections(DAY_100_SECTIONS);
export const BIBLE_YEAR_DAY_101_DEEP_STUDY_SECTIONS = makeStudySections(DAY_101_SECTIONS);
export const BIBLE_YEAR_DAY_102_DEEP_STUDY_SECTIONS = makeStudySections(DAY_102_SECTIONS);
export const BIBLE_YEAR_DAY_103_DEEP_STUDY_SECTIONS = makeStudySections(DAY_103_SECTIONS);
export const BIBLE_YEAR_DAY_104_DEEP_STUDY_SECTIONS = makeStudySections(DAY_104_SECTIONS);
export const BIBLE_YEAR_DAY_105_DEEP_STUDY_SECTIONS = makeStudySections(DAY_105_SECTIONS);
