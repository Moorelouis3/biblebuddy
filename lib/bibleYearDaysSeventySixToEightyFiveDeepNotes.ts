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

const DAY_76_SECTIONS: DaySection[] = [
  {
    reference: "1 Samuel 31:1-6",
    chapter: 31,
    startVerse: 1,
    endVerse: 6,
    heading: "Now the Philistines Fought Against Israel",
    summary: "1 Samuel 31:1-6 follows now the philistines fought against israel as part of saul falls and david's kingdom begins.",
    teaching: [
      "1 Samuel 31:1-6 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Now the Philistines Fought Against Israel brings the listener into conflict where sin, courage, fear, and consequence become visible.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Samuel 31:7-12",
    chapter: 31,
    startVerse: 7,
    endVerse: 12,
    heading: "When the Men of Israel Were on the Other",
    summary: "1 Samuel 31:7-12 follows when the men of israel were on the other as part of saul falls and david's kingdom begins.",
    teaching: [
      "1 Samuel 31:7-12 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "When the Men of Israel Were on the Other gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Samuel 31:13",
    chapter: 31,
    startVerse: 13,
    endVerse: 13,
    heading: "They Took Their Bones",
    summary: "1 Samuel 31:13 follows they took their bones as part of saul falls and david's kingdom begins.",
    teaching: [
      "1 Samuel 31:13 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "They Took Their Bones gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 1:1-6",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    heading: "Now It Came to Pass After the Death",
    summary: "2 Samuel 1:1-6 follows now it came to pass after the death as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 1:1-6 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Now It Came to Pass After the Death names sorrow directly, so the listener can feel the weight of what has happened.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 1:7-12",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    heading: "When He Looked Behind Him",
    summary: "2 Samuel 1:7-12 follows when he looked behind him as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 1:7-12 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "When He Looked Behind Him gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 1:13-18",
    chapter: 1,
    startVerse: 13,
    endVerse: 18,
    heading: "David Said unto the Young Man That Told Him",
    summary: "2 Samuel 1:13-18 follows david said unto the young man that told him as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 1:13-18 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "David Said unto the Young Man That Told Him follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 1:19-24",
    chapter: 1,
    startVerse: 19,
    endVerse: 24,
    heading: "The Beauty of Israel Is Slain Upon Thy High",
    summary: "2 Samuel 1:19-24 follows the beauty of israel is slain upon thy high as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 1:19-24 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "The Beauty of Israel Is Slain Upon Thy High names sorrow directly, so the listener can feel the weight of what has happened.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 1:25-27",
    chapter: 1,
    startVerse: 25,
    endVerse: 27,
    heading: "How Are the Mighty Fallen in the Midst",
    summary: "2 Samuel 1:25-27 follows how are the mighty fallen in the midst as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 1:25-27 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "How Are the Mighty Fallen in the Midst names sorrow directly, so the listener can feel the weight of what has happened.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 2:1-6",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass After This",
    summary: "2 Samuel 2:1-6 follows it came to pass after this as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 2:1-6 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "It Came to Pass After This gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 2:7-12",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    heading: "Therefore Now Let Your Hands Be Strengthened",
    summary: "2 Samuel 2:7-12 follows therefore now let your hands be strengthened as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 2:7-12 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Therefore Now Let Your Hands Be Strengthened gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 2:13-18",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    heading: "Joab the Son of Zeruiah",
    summary: "2 Samuel 2:13-18 follows joab the son of zeruiah as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 2:13-18 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Joab the Son of Zeruiah follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 2:19-24",
    chapter: 2,
    startVerse: 19,
    endVerse: 24,
    heading: "Asahel Pursued After Abner",
    summary: "2 Samuel 2:19-24 follows asahel pursued after abner as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 2:19-24 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Asahel Pursued After Abner follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 2:25-30",
    chapter: 2,
    startVerse: 25,
    endVerse: 30,
    heading: "The Children of Benjamin Gathered Themselves Together After Abner",
    summary: "2 Samuel 2:25-30 follows the children of benjamin gathered themselves together after abner as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 2:25-30 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "The Children of Benjamin Gathered Themselves Together After Abner follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 2:31-32",
    chapter: 2,
    startVerse: 31,
    endVerse: 32,
    heading: "The Servants of David Had Smitten of Benjamin",
    summary: "2 Samuel 2:31-32 follows the servants of david had smitten of benjamin as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 2:31-32 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "The Servants of David Had Smitten of Benjamin follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 3:1-6",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    heading: "Now There Was Long War Between the House",
    summary: "2 Samuel 3:1-6 follows now there was long war between the house as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 3:1-6 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Now There Was Long War Between the House brings the listener into conflict where sin, courage, fear, and consequence become visible.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 3:7-12",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    heading: "Saul Had a Concubine",
    summary: "2 Samuel 3:7-12 follows saul had a concubine as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 3:7-12 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Saul Had a Concubine follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 3:13-18",
    chapter: 3,
    startVerse: 13,
    endVerse: 18,
    heading: "I Will Make a League with Thee",
    summary: "2 Samuel 3:13-18 follows i will make a league with thee as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 3:13-18 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Will Make a League with Thee gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 3:19-24",
    chapter: 3,
    startVerse: 19,
    endVerse: 24,
    heading: "Abner Also Spake in the Ears of Benjamin",
    summary: "2 Samuel 3:19-24 follows abner also spake in the ears of benjamin as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 3:19-24 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Abner Also Spake in the Ears of Benjamin follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 3:25-30",
    chapter: 3,
    startVerse: 25,
    endVerse: 30,
    heading: "Thou Knowest Abner the Son of Ner",
    summary: "2 Samuel 3:25-30 follows thou knowest abner the son of ner as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 3:25-30 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "Thou Knowest Abner the Son of Ner follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 3:31-36",
    chapter: 3,
    startVerse: 31,
    endVerse: 36,
    heading: "David Said to Joab",
    summary: "2 Samuel 3:31-36 follows david said to joab as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 3:31-36 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "David Said to Joab follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 3:37-39",
    chapter: 3,
    startVerse: 37,
    endVerse: 39,
    heading: "For All the People",
    summary: "2 Samuel 3:37-39 follows for all the people as part of saul falls and david's kingdom begins.",
    teaching: [
      "2 Samuel 3:37-39 belongs inside Saul Falls and David's Kingdom Begins, but this section has its own focused movement.",
      "For All the People gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_77_SECTIONS: DaySection[] = [
  {
    reference: "2 Samuel 4:1-6",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    heading: "When Saul’s Son Heard That Abner Was Dead",
    summary: "2 Samuel 4:1-6 follows when saul’s son heard that abner was dead as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 4:1-6 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "When Saul’s Son Heard That Abner Was Dead follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 4:7-12",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    heading: "For When They Came into the House",
    summary: "2 Samuel 4:7-12 follows for when they came into the house as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 4:7-12 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "For When They Came into the House gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 5:1-6",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    heading: "Then Came All the Tribes of Israel to David",
    summary: "2 Samuel 5:1-6 follows then came all the tribes of israel to david as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 5:1-6 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "Then Came All the Tribes of Israel to David follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 5:7-12",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    heading: "Nevertheless David Took the Strong Hold of Zion",
    summary: "2 Samuel 5:7-12 follows nevertheless david took the strong hold of zion as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 5:7-12 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "Nevertheless David Took the Strong Hold of Zion follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 5:13-18",
    chapter: 5,
    startVerse: 13,
    endVerse: 18,
    heading: "David Took Him More Concubines",
    summary: "2 Samuel 5:13-18 follows david took him more concubines as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 5:13-18 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "David Took Him More Concubines follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 5:19-24",
    chapter: 5,
    startVerse: 19,
    endVerse: 24,
    heading: "David Enquired of the LORD",
    summary: "2 Samuel 5:19-24 follows david enquired of the lord as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 5:19-24 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "David Enquired of the LORD keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 5:25",
    chapter: 5,
    startVerse: 25,
    endVerse: 25,
    heading: "David Did So",
    summary: "2 Samuel 5:25 follows david did so as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 5:25 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "David Did So follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 6:1-6",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    heading: "David Gathered Together All the Chosen Men of Israel",
    summary: "2 Samuel 6:1-6 follows david gathered together all the chosen men of israel as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 6:1-6 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "David Gathered Together All the Chosen Men of Israel follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 6:7-12",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    heading: "The Anger of the LORD Was Kindled Against Uzzah",
    summary: "2 Samuel 6:7-12 follows the anger of the lord was kindled against uzzah as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 6:7-12 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "The Anger of the LORD Was Kindled Against Uzzah keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 6:13-18",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    heading: "It Was So",
    summary: "2 Samuel 6:13-18 follows it was so as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 6:13-18 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "It Was So gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 6:19-23",
    chapter: 6,
    startVerse: 19,
    endVerse: 23,
    heading: "He Dealt Among All the People",
    summary: "2 Samuel 6:19-23 follows he dealt among all the people as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 6:19-23 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "He Dealt Among All the People gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 7:1-6",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass",
    summary: "2 Samuel 7:1-6 follows it came to pass as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 7:1-6 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "It Came to Pass gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 7:7-12",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    heading: "In All the Places Wherein I Have Walked",
    summary: "2 Samuel 7:7-12 follows in all the places wherein i have walked as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 7:7-12 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "In All the Places Wherein I Have Walked gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 7:13-18",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    heading: "He Shall Build an House for My Name",
    summary: "2 Samuel 7:13-18 follows he shall build an house for my name as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 7:13-18 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "He Shall Build an House for My Name gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 7:19-24",
    chapter: 7,
    startVerse: 19,
    endVerse: 24,
    heading: "This Was Yet a Small Thing in Thy Sight",
    summary: "2 Samuel 7:19-24 follows this was yet a small thing in thy sight as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 7:19-24 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "This Was Yet a Small Thing in Thy Sight gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 7:25-29",
    chapter: 7,
    startVerse: 25,
    endVerse: 29,
    heading: "O LORD God",
    summary: "2 Samuel 7:25-29 follows o lord god as part of david's throne and god's promise.",
    teaching: [
      "2 Samuel 7:25-29 belongs inside David's Throne and God's Promise, but this section has its own focused movement.",
      "LORD God keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_78_SECTIONS: DaySection[] = [
  {
    reference: "2 Samuel 8:1-6",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    heading: "After This It Came to Pass",
    summary: "2 Samuel 8:1-6 follows after this it came to pass as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 8:1-6 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "After This It Came to Pass gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 8:7-12",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    heading: "David Took the Shields of Gold Were",
    summary: "2 Samuel 8:7-12 follows david took the shields of gold were as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 8:7-12 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "David Took the Shields of Gold Were follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 8:13-18",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    heading: "David Gat Him a Name When He Returned",
    summary: "2 Samuel 8:13-18 follows david gat him a name when he returned as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 8:13-18 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "David Gat Him a Name When He Returned follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 9:1-6",
    chapter: 9,
    startVerse: 1,
    endVerse: 6,
    heading: "Is There Yet Any That Is Left",
    summary: "2 Samuel 9:1-6 follows is there yet any that is left as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 9:1-6 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "Is There Yet Any That Is Left gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 9:7-12",
    chapter: 9,
    startVerse: 7,
    endVerse: 12,
    heading: "David Said unto Him",
    summary: "2 Samuel 9:7-12 follows david said unto him as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 9:7-12 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "David Said unto Him follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 9:13",
    chapter: 9,
    startVerse: 13,
    endVerse: 13,
    heading: "So Mephibosheth Dwelt in Jerusalem",
    summary: "2 Samuel 9:13 follows so mephibosheth dwelt in jerusalem as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 9:13 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "So Mephibosheth Dwelt in Jerusalem anchors the scene in a real place where the kingdom story moves forward.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 10:1-6",
    chapter: 10,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass After This",
    summary: "2 Samuel 10:1-6 follows it came to pass after this as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 10:1-6 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "It Came to Pass After This gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 10:7-12",
    chapter: 10,
    startVerse: 7,
    endVerse: 12,
    heading: "When David Heard of It",
    summary: "2 Samuel 10:7-12 follows when david heard of it as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 10:7-12 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "When David Heard of It follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 10:13-18",
    chapter: 10,
    startVerse: 13,
    endVerse: 18,
    heading: "Joab Drew Nigh",
    summary: "2 Samuel 10:13-18 follows joab drew nigh as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 10:13-18 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "Joab Drew Nigh follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 10:19",
    chapter: 10,
    startVerse: 19,
    endVerse: 19,
    heading: "When All the Kings Were Servants to Hadarezer Saw",
    summary: "2 Samuel 10:19 follows when all the kings were servants to hadarezer saw as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 10:19 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "When All the Kings Were Servants to Hadarezer Saw focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 11:1-6",
    chapter: 11,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass",
    summary: "2 Samuel 11:1-6 follows it came to pass as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 11:1-6 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "It Came to Pass gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 11:7-12",
    chapter: 11,
    startVerse: 7,
    endVerse: 12,
    heading: "When Uriah Was Come unto Him",
    summary: "2 Samuel 11:7-12 follows when uriah was come unto him as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 11:7-12 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "When Uriah Was Come unto Him gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 11:13-18",
    chapter: 11,
    startVerse: 13,
    endVerse: 18,
    heading: "When David Had Called Him",
    summary: "2 Samuel 11:13-18 follows when david had called him as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 11:13-18 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "When David Had Called Him follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 11:19-24",
    chapter: 11,
    startVerse: 19,
    endVerse: 24,
    heading: "Charged the Messenger",
    summary: "2 Samuel 11:19-24 follows charged the messenger as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 11:19-24 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "Charged the Messenger gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 11:25-27",
    chapter: 11,
    startVerse: 25,
    endVerse: 27,
    heading: "Then David Said unto the Messenger",
    summary: "2 Samuel 11:25-27 follows then david said unto the messenger as part of david's victories and david's sin.",
    teaching: [
      "2 Samuel 11:25-27 belongs inside David's Victories and David's Sin, but this section has its own focused movement.",
      "Then David Said unto the Messenger follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_79_SECTIONS: DaySection[] = [
  {
    reference: "2 Samuel 12:1-6",
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    heading: "The LORD Sent Nathan unto David",
    summary: "2 Samuel 12:1-6 follows the lord sent nathan unto david as part of consequences in david's house.",
    teaching: [
      "2 Samuel 12:1-6 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "The LORD Sent Nathan unto David keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 12:7-12",
    chapter: 12,
    startVerse: 7,
    endVerse: 12,
    heading: "Nathan Said to David",
    summary: "2 Samuel 12:7-12 follows nathan said to david as part of consequences in david's house.",
    teaching: [
      "2 Samuel 12:7-12 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Nathan Said to David follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 12:13-18",
    chapter: 12,
    startVerse: 13,
    endVerse: 18,
    heading: "David Said unto Nathan",
    summary: "2 Samuel 12:13-18 follows david said unto nathan as part of consequences in david's house.",
    teaching: [
      "2 Samuel 12:13-18 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "David Said unto Nathan follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 12:19-24",
    chapter: 12,
    startVerse: 19,
    endVerse: 24,
    heading: "When David Saw That His Servants Whispered",
    summary: "2 Samuel 12:19-24 follows when david saw that his servants whispered as part of consequences in david's house.",
    teaching: [
      "2 Samuel 12:19-24 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "When David Saw That His Servants Whispered follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 12:25-30",
    chapter: 12,
    startVerse: 25,
    endVerse: 30,
    heading: "He Sent by the Hand of Nathan the Prophet",
    summary: "2 Samuel 12:25-30 follows he sent by the hand of nathan the prophet as part of consequences in david's house.",
    teaching: [
      "2 Samuel 12:25-30 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "He Sent by the Hand of Nathan the Prophet gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 12:31",
    chapter: 12,
    startVerse: 31,
    endVerse: 31,
    heading: "He Brought Forth the People Were Therein",
    summary: "2 Samuel 12:31 follows he brought forth the people were therein as part of consequences in david's house.",
    teaching: [
      "2 Samuel 12:31 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "He Brought Forth the People Were Therein gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 13:1-6",
    chapter: 13,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass After This",
    summary: "2 Samuel 13:1-6 follows it came to pass after this as part of consequences in david's house.",
    teaching: [
      "2 Samuel 13:1-6 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "It Came to Pass After This gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 13:7-12",
    chapter: 13,
    startVerse: 7,
    endVerse: 12,
    heading: "Then David Sent Home to Tamar",
    summary: "2 Samuel 13:7-12 follows then david sent home to tamar as part of consequences in david's house.",
    teaching: [
      "2 Samuel 13:7-12 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Then David Sent Home to Tamar follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 13:13-18",
    chapter: 13,
    startVerse: 13,
    endVerse: 18,
    heading: "Whither Shall I Cause My Shame to Go",
    summary: "2 Samuel 13:13-18 follows whither shall i cause my shame to go as part of consequences in david's house.",
    teaching: [
      "2 Samuel 13:13-18 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Whither Shall I Cause My Shame to Go gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 13:19-24",
    chapter: 13,
    startVerse: 19,
    endVerse: 24,
    heading: "Tamar Put Ashes on Her Head",
    summary: "2 Samuel 13:19-24 follows tamar put ashes on her head as part of consequences in david's house.",
    teaching: [
      "2 Samuel 13:19-24 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Tamar Put Ashes on Her Head gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 13:25-30",
    chapter: 13,
    startVerse: 25,
    endVerse: 30,
    heading: "The King Said to Absalom",
    summary: "2 Samuel 13:25-30 follows the king said to absalom as part of consequences in david's house.",
    teaching: [
      "2 Samuel 13:25-30 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "The King Said to Absalom focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 13:31-36",
    chapter: 13,
    startVerse: 31,
    endVerse: 36,
    heading: "Then the King Arose",
    summary: "2 Samuel 13:31-36 follows then the king arose as part of consequences in david's house.",
    teaching: [
      "2 Samuel 13:31-36 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Then the King Arose focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 13:37-39",
    chapter: 13,
    startVerse: 37,
    endVerse: 39,
    heading: "Absalom Fled",
    summary: "2 Samuel 13:37-39 follows absalom fled as part of consequences in david's house.",
    teaching: [
      "2 Samuel 13:37-39 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Absalom Fled follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 14:1-6",
    chapter: 14,
    startVerse: 1,
    endVerse: 6,
    heading: "Now Joab the Son of Zeruiah Perceived",
    summary: "2 Samuel 14:1-6 follows now joab the son of zeruiah perceived as part of consequences in david's house.",
    teaching: [
      "2 Samuel 14:1-6 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Now Joab the Son of Zeruiah Perceived follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 14:7-12",
    chapter: 14,
    startVerse: 7,
    endVerse: 12,
    heading: "The Whole Family Is Risen Against Thine Handmaid",
    summary: "2 Samuel 14:7-12 follows the whole family is risen against thine handmaid as part of consequences in david's house.",
    teaching: [
      "2 Samuel 14:7-12 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "The Whole Family Is Risen Against Thine Handmaid gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 14:13-18",
    chapter: 14,
    startVerse: 13,
    endVerse: 18,
    heading: "The Woman Said",
    summary: "2 Samuel 14:13-18 follows the woman said as part of consequences in david's house.",
    teaching: [
      "2 Samuel 14:13-18 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "The Woman Said gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 14:19-24",
    chapter: 14,
    startVerse: 19,
    endVerse: 24,
    heading: "The King Said",
    summary: "2 Samuel 14:19-24 follows the king said as part of consequences in david's house.",
    teaching: [
      "2 Samuel 14:19-24 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "The King Said focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 14:25-30",
    chapter: 14,
    startVerse: 25,
    endVerse: 30,
    heading: "In All Israel There Was None to Be So",
    summary: "2 Samuel 14:25-30 follows in all israel there was none to be so as part of consequences in david's house.",
    teaching: [
      "2 Samuel 14:25-30 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "In All Israel There Was None to Be So gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 14:31-33",
    chapter: 14,
    startVerse: 31,
    endVerse: 33,
    heading: "Then Joab Arose",
    summary: "2 Samuel 14:31-33 follows then joab arose as part of consequences in david's house.",
    teaching: [
      "2 Samuel 14:31-33 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Then Joab Arose follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 15:1-6",
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass After This",
    summary: "2 Samuel 15:1-6 follows it came to pass after this as part of consequences in david's house.",
    teaching: [
      "2 Samuel 15:1-6 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "It Came to Pass After This gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 15:7-12",
    chapter: 15,
    startVerse: 7,
    endVerse: 12,
    heading: "It Came to Pass After Forty Years",
    summary: "2 Samuel 15:7-12 follows it came to pass after forty years as part of consequences in david's house.",
    teaching: [
      "2 Samuel 15:7-12 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "It Came to Pass After Forty Years gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 15:13-18",
    chapter: 15,
    startVerse: 13,
    endVerse: 18,
    heading: "There Came a Messenger to David",
    summary: "2 Samuel 15:13-18 follows there came a messenger to david as part of consequences in david's house.",
    teaching: [
      "2 Samuel 15:13-18 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "There Came a Messenger to David follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 15:19-24",
    chapter: 15,
    startVerse: 19,
    endVerse: 24,
    heading: "Then Said the King to Ittai the Gittite",
    summary: "2 Samuel 15:19-24 follows then said the king to ittai the gittite as part of consequences in david's house.",
    teaching: [
      "2 Samuel 15:19-24 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "Then Said the King to Ittai the Gittite focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 15:25-30",
    chapter: 15,
    startVerse: 25,
    endVerse: 30,
    heading: "The King Said unto Zadok",
    summary: "2 Samuel 15:25-30 follows the king said unto zadok as part of consequences in david's house.",
    teaching: [
      "2 Samuel 15:25-30 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "The King Said unto Zadok focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 15:31-36",
    chapter: 15,
    startVerse: 31,
    endVerse: 36,
    heading: "One Told David",
    summary: "2 Samuel 15:31-36 follows one told david as part of consequences in david's house.",
    teaching: [
      "2 Samuel 15:31-36 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "One Told David follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 15:37",
    chapter: 15,
    startVerse: 37,
    endVerse: 37,
    heading: "So Hushai David’s Friend Came into the City",
    summary: "2 Samuel 15:37 follows so hushai david’s friend came into the city as part of consequences in david's house.",
    teaching: [
      "2 Samuel 15:37 belongs inside Consequences in David's House, but this section has its own focused movement.",
      "So Hushai David’s Friend Came into the City follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_80_SECTIONS: DaySection[] = [
  {
    reference: "2 Samuel 16:1-6",
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    heading: "When David Was a Little Past the Top",
    summary: "2 Samuel 16:1-6 follows when david was a little past the top as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 16:1-6 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "When David Was a Little Past the Top follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 16:7-12",
    chapter: 16,
    startVerse: 7,
    endVerse: 12,
    heading: "Thus Said Shimei When He Cursed",
    summary: "2 Samuel 16:7-12 follows thus said shimei when he cursed as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 16:7-12 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Thus Said Shimei When He Cursed gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 16:13-18",
    chapter: 16,
    startVerse: 13,
    endVerse: 18,
    heading: "His Men Went by the Way",
    summary: "2 Samuel 16:13-18 follows his men went by the way as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 16:13-18 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "His Men Went by the Way gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 16:19-23",
    chapter: 16,
    startVerse: 19,
    endVerse: 23,
    heading: "Whom Should I Serve",
    summary: "2 Samuel 16:19-23 follows whom should i serve as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 16:19-23 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Whom Should I Serve gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 17:1-6",
    chapter: 17,
    startVerse: 1,
    endVerse: 6,
    heading: "Moreover Ahithophel Said unto Absalom",
    summary: "2 Samuel 17:1-6 follows moreover ahithophel said unto absalom as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 17:1-6 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Moreover Ahithophel Said unto Absalom follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 17:7-12",
    chapter: 17,
    startVerse: 7,
    endVerse: 12,
    heading: "Hushai Said unto Absalom",
    summary: "2 Samuel 17:7-12 follows hushai said unto absalom as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 17:7-12 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Hushai Said unto Absalom follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 17:13-18",
    chapter: 17,
    startVerse: 13,
    endVerse: 18,
    heading: "If He Be Gotten into a City",
    summary: "2 Samuel 17:13-18 follows if he be gotten into a city as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 17:13-18 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "If He Be Gotten into a City gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 17:19-24",
    chapter: 17,
    startVerse: 19,
    endVerse: 24,
    heading: "The Woman Took",
    summary: "2 Samuel 17:19-24 follows the woman took as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 17:19-24 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "The Woman Took gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 17:25-29",
    chapter: 17,
    startVerse: 25,
    endVerse: 29,
    heading: "Absalom Made Amasa Captain of the Host Instead",
    summary: "2 Samuel 17:25-29 follows absalom made amasa captain of the host instead as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 17:25-29 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Absalom Made Amasa Captain of the Host Instead follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 18:1-6",
    chapter: 18,
    startVerse: 1,
    endVerse: 6,
    heading: "David Numbered the People Were with Him",
    summary: "2 Samuel 18:1-6 follows david numbered the people were with him as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 18:1-6 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "David Numbered the People Were with Him follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 18:7-12",
    chapter: 18,
    startVerse: 7,
    endVerse: 12,
    heading: "Where the People of Israel Were Slain Before",
    summary: "2 Samuel 18:7-12 follows where the people of israel were slain before as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 18:7-12 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Where the People of Israel Were Slain Before names sorrow directly, so the listener can feel the weight of what has happened.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 18:13-18",
    chapter: 18,
    startVerse: 13,
    endVerse: 18,
    heading: "Otherwise I Should Have Wrought Falsehood Against Mine Own",
    summary: "2 Samuel 18:13-18 follows otherwise i should have wrought falsehood against mine own as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 18:13-18 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Otherwise I Should Have Wrought Falsehood Against Mine Own gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 18:19-24",
    chapter: 18,
    startVerse: 19,
    endVerse: 24,
    heading: "Then Said Ahimaaz the Son of Zadok",
    summary: "2 Samuel 18:19-24 follows then said ahimaaz the son of zadok as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 18:19-24 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Then Said Ahimaaz the Son of Zadok gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 18:25-30",
    chapter: 18,
    startVerse: 25,
    endVerse: 30,
    heading: "The Watchman Cried",
    summary: "2 Samuel 18:25-30 follows the watchman cried as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 18:25-30 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "The Watchman Cried gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 18:31-33",
    chapter: 18,
    startVerse: 31,
    endVerse: 33,
    heading: "My Lord the King",
    summary: "2 Samuel 18:31-33 follows my lord the king as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 18:31-33 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "My Lord the King keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 19:1-6",
    chapter: 19,
    startVerse: 1,
    endVerse: 6,
    heading: "It Was Told Joab",
    summary: "2 Samuel 19:1-6 follows it was told joab as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 19:1-6 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "It Was Told Joab follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 19:7-12",
    chapter: 19,
    startVerse: 7,
    endVerse: 12,
    heading: "Now Therefore Arise",
    summary: "2 Samuel 19:7-12 follows now therefore arise as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 19:7-12 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Now Therefore Arise gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 19:13-18",
    chapter: 19,
    startVerse: 13,
    endVerse: 18,
    heading: "Say Ye to Amasa",
    summary: "2 Samuel 19:13-18 follows say ye to amasa as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 19:13-18 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Say Ye to Amasa gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 19:19-24",
    chapter: 19,
    startVerse: 19,
    endVerse: 24,
    heading: "Said unto the King",
    summary: "2 Samuel 19:19-24 follows said unto the king as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 19:19-24 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Said unto the King focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 19:25-30",
    chapter: 19,
    startVerse: 25,
    endVerse: 30,
    heading: "It Came to Pass",
    summary: "2 Samuel 19:25-30 follows it came to pass as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 19:25-30 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "It Came to Pass gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 19:31-36",
    chapter: 19,
    startVerse: 31,
    endVerse: 36,
    heading: "Barzillai the Gileadite Came Down from Rogelim",
    summary: "2 Samuel 19:31-36 follows barzillai the gileadite came down from rogelim as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 19:31-36 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Barzillai the Gileadite Came Down from Rogelim gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 19:37-42",
    chapter: 19,
    startVerse: 37,
    endVerse: 42,
    heading: "Let Thy Servant",
    summary: "2 Samuel 19:37-42 follows let thy servant as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 19:37-42 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "Let Thy Servant gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 19:43",
    chapter: 19,
    startVerse: 43,
    endVerse: 43,
    heading: "The Men of Israel Answered the Men of Judah",
    summary: "2 Samuel 19:43 follows the men of israel answered the men of judah as part of absalom's rebellion and david's grief.",
    teaching: [
      "2 Samuel 19:43 belongs inside Absalom's Rebellion and David's Grief, but this section has its own focused movement.",
      "The Men of Israel Answered the Men of Judah gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_81_SECTIONS: DaySection[] = [
  {
    reference: "2 Samuel 20:1-6",
    chapter: 20,
    startVerse: 1,
    endVerse: 6,
    heading: "There Happened to Be There a Man of Belial",
    summary: "2 Samuel 20:1-6 follows there happened to be there a man of belial as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 20:1-6 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "There Happened to Be There a Man of Belial gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 20:7-12",
    chapter: 20,
    startVerse: 7,
    endVerse: 12,
    heading: "There Went Out After Him Joab’s Men",
    summary: "2 Samuel 20:7-12 follows there went out after him joab’s men as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 20:7-12 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "There Went Out After Him Joab’s Men follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 20:13-18",
    chapter: 20,
    startVerse: 13,
    endVerse: 18,
    heading: "When He Was Removed Out of the Highway",
    summary: "2 Samuel 20:13-18 follows when he was removed out of the highway as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 20:13-18 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "When He Was Removed Out of the Highway gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 20:19-24",
    chapter: 20,
    startVerse: 19,
    endVerse: 24,
    heading: "I Am One of Them That Are Peaceable",
    summary: "2 Samuel 20:19-24 follows i am one of them that are peaceable as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 20:19-24 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Am One of Them That Are Peaceable gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 20:25-26",
    chapter: 20,
    startVerse: 25,
    endVerse: 26,
    heading: "Sheva Was Scribe",
    summary: "2 Samuel 20:25-26 follows sheva was scribe as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 20:25-26 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Sheva Was Scribe gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 21:1-6",
    chapter: 21,
    startVerse: 1,
    endVerse: 6,
    heading: "Then There Was a Famine in the Days",
    summary: "2 Samuel 21:1-6 follows then there was a famine in the days as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 21:1-6 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Then There Was a Famine in the Days gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 21:7-12",
    chapter: 21,
    startVerse: 7,
    endVerse: 12,
    heading: "The King Spared Mephibosheth",
    summary: "2 Samuel 21:7-12 follows the king spared mephibosheth as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 21:7-12 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "The King Spared Mephibosheth focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 21:13-18",
    chapter: 21,
    startVerse: 13,
    endVerse: 18,
    heading: "He Brought Up from Thence the Bones of Saul",
    summary: "2 Samuel 21:13-18 follows he brought up from thence the bones of saul as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 21:13-18 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "He Brought Up from Thence the Bones of Saul follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 21:19-22",
    chapter: 21,
    startVerse: 19,
    endVerse: 22,
    heading: "There Was Again a Battle in Gob",
    summary: "2 Samuel 21:19-22 follows there was again a battle in gob as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 21:19-22 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "There Was Again a Battle in Gob brings the listener into conflict where sin, courage, fear, and consequence become visible.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:1-6",
    chapter: 22,
    startVerse: 1,
    endVerse: 6,
    heading: "David Spake unto the LORD the Words of This",
    summary: "2 Samuel 22:1-6 follows david spake unto the lord the words of this as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:1-6 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "David Spake unto the LORD the Words of This keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:7-12",
    chapter: 22,
    startVerse: 7,
    endVerse: 12,
    heading: "In My Distress I Called Upon the LORD",
    summary: "2 Samuel 22:7-12 follows in my distress i called upon the lord as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:7-12 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "In My Distress I Called Upon the LORD keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:13-18",
    chapter: 22,
    startVerse: 13,
    endVerse: 18,
    heading: "Through the Brightness Before Him Were Coals of Fire",
    summary: "2 Samuel 22:13-18 follows through the brightness before him were coals of fire as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:13-18 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Through the Brightness Before Him Were Coals of Fire gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:19-24",
    chapter: 22,
    startVerse: 19,
    endVerse: 24,
    heading: "They Prevented Me in the Day of My Calamity",
    summary: "2 Samuel 22:19-24 follows they prevented me in the day of my calamity as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:19-24 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "They Prevented Me in the Day of My Calamity gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:25-30",
    chapter: 22,
    startVerse: 25,
    endVerse: 30,
    heading: "Therefore the LORD Hath Recompensed Me According to My",
    summary: "2 Samuel 22:25-30 follows therefore the lord hath recompensed me according to my as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:25-30 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Therefore the LORD Hath Recompensed Me According to My keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:31-36",
    chapter: 22,
    startVerse: 31,
    endVerse: 36,
    heading: "As for God",
    summary: "2 Samuel 22:31-36 follows as for god as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:31-36 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "As for God keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:37-42",
    chapter: 22,
    startVerse: 37,
    endVerse: 42,
    heading: "Thou Hast Enlarged My Steps Under Me",
    summary: "2 Samuel 22:37-42 follows thou hast enlarged my steps under me as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:37-42 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Thou Hast Enlarged My Steps Under Me gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:43-48",
    chapter: 22,
    startVerse: 43,
    endVerse: 48,
    heading: "Then Did I Beat Them as Small",
    summary: "2 Samuel 22:43-48 follows then did i beat them as small as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:43-48 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Then Did I Beat Them as Small gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 22:49-51",
    chapter: 22,
    startVerse: 49,
    endVerse: 51,
    heading: "That Bringeth Me Forth from Mine Enemies",
    summary: "2 Samuel 22:49-51 follows that bringeth me forth from mine enemies as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 22:49-51 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "That Bringeth Me Forth from Mine Enemies gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 23:1-6",
    chapter: 23,
    startVerse: 1,
    endVerse: 6,
    heading: "Now These Be the Last Words of David",
    summary: "2 Samuel 23:1-6 follows now these be the last words of david as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 23:1-6 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Now These Be the Last Words of David follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 23:7-12",
    chapter: 23,
    startVerse: 7,
    endVerse: 12,
    heading: "The Man That Shall Touch Them Must Be Fenced",
    summary: "2 Samuel 23:7-12 follows the man that shall touch them must be fenced as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 23:7-12 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "The Man That Shall Touch Them Must Be Fenced gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 23:13-18",
    chapter: 23,
    startVerse: 13,
    endVerse: 18,
    heading: "Three of the Thirty Chief Went Down",
    summary: "2 Samuel 23:13-18 follows three of the thirty chief went down as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 23:13-18 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Three of the Thirty Chief Went Down gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 23:19-24",
    chapter: 23,
    startVerse: 19,
    endVerse: 24,
    heading: "Was He Not Most Honourable of Three",
    summary: "2 Samuel 23:19-24 follows was he not most honourable of three as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 23:19-24 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Was He Not Most Honourable of Three gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 23:25-30",
    chapter: 23,
    startVerse: 25,
    endVerse: 30,
    heading: "Shammah the Harodite",
    summary: "2 Samuel 23:25-30 follows shammah the harodite as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 23:25-30 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Shammah the Harodite gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 23:31-36",
    chapter: 23,
    startVerse: 31,
    endVerse: 36,
    heading: "Abi-albon the Arbathite",
    summary: "2 Samuel 23:31-36 follows abi-albon the arbathite as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 23:31-36 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Abi-albon the Arbathite gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 23:37-39",
    chapter: 23,
    startVerse: 37,
    endVerse: 39,
    heading: "Zelek the Ammonite",
    summary: "2 Samuel 23:37-39 follows zelek the ammonite as part of david's later reign and mighty men.",
    teaching: [
      "2 Samuel 23:37-39 belongs inside David's Later Reign and Mighty Men, but this section has its own focused movement.",
      "Zelek the Ammonite gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_82_SECTIONS: DaySection[] = [
  {
    reference: "2 Samuel 24:1-6",
    chapter: 24,
    startVerse: 1,
    endVerse: 6,
    heading: "Again the Anger of the LORD Was Kindled Against",
    summary: "2 Samuel 24:1-6 follows again the anger of the lord was kindled against as part of david's census and solomon's wisdom.",
    teaching: [
      "2 Samuel 24:1-6 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Again the Anger of the LORD Was Kindled Against keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 24:7-12",
    chapter: 24,
    startVerse: 7,
    endVerse: 12,
    heading: "Came to the Strong Hold of Tyre",
    summary: "2 Samuel 24:7-12 follows came to the strong hold of tyre as part of david's census and solomon's wisdom.",
    teaching: [
      "2 Samuel 24:7-12 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Came to the Strong Hold of Tyre gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 24:13-18",
    chapter: 24,
    startVerse: 13,
    endVerse: 18,
    heading: "So Gad Came to David",
    summary: "2 Samuel 24:13-18 follows so gad came to david as part of david's census and solomon's wisdom.",
    teaching: [
      "2 Samuel 24:13-18 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "So Gad Came to David follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 24:19-24",
    chapter: 24,
    startVerse: 19,
    endVerse: 24,
    heading: "According to the Saying of Gad",
    summary: "2 Samuel 24:19-24 follows according to the saying of gad as part of david's census and solomon's wisdom.",
    teaching: [
      "2 Samuel 24:19-24 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "According to the Saying of Gad gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "2 Samuel 24:25",
    chapter: 24,
    startVerse: 25,
    endVerse: 25,
    heading: "David Built There an Altar unto the LORD",
    summary: "2 Samuel 24:25 follows david built there an altar unto the lord as part of david's census and solomon's wisdom.",
    teaching: [
      "2 Samuel 24:25 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "David Built There an Altar unto the LORD keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:1-6",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    heading: "Now King David Was Old",
    summary: "1 Kings 1:1-6 follows now king david was old as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:1-6 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Now King David Was Old focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:7-12",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    heading: "He Conferred with Joab the Son of Zeruiah",
    summary: "1 Kings 1:7-12 follows he conferred with joab the son of zeruiah as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:7-12 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "He Conferred with Joab the Son of Zeruiah follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:13-18",
    chapter: 1,
    startVerse: 13,
    endVerse: 18,
    heading: "Get Thee in unto King David",
    summary: "1 Kings 1:13-18 follows get thee in unto king david as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:13-18 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Get Thee in unto King David focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:19-24",
    chapter: 1,
    startVerse: 19,
    endVerse: 24,
    heading: "He Hath Slain Oxen",
    summary: "1 Kings 1:19-24 follows he hath slain oxen as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:19-24 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "He Hath Slain Oxen names sorrow directly, so the listener can feel the weight of what has happened.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:25-30",
    chapter: 1,
    startVerse: 25,
    endVerse: 30,
    heading: "For He Is Gone Down This Day",
    summary: "1 Kings 1:25-30 follows for he is gone down this day as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:25-30 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "For He Is Gone Down This Day gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:31-36",
    chapter: 1,
    startVerse: 31,
    endVerse: 36,
    heading: "Then Bath-sheba Bowed with Her Face to the Earth",
    summary: "1 Kings 1:31-36 follows then bath-sheba bowed with her face to the earth as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:31-36 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Then Bath-sheba Bowed with Her Face to the Earth gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:37-42",
    chapter: 1,
    startVerse: 37,
    endVerse: 42,
    heading: "As the LORD Hath Been with My Lord",
    summary: "1 Kings 1:37-42 follows as the lord hath been with my lord as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:37-42 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "As the LORD Hath Been with My Lord keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:43-48",
    chapter: 1,
    startVerse: 43,
    endVerse: 48,
    heading: "Said to Adonijah",
    summary: "1 Kings 1:43-48 follows said to adonijah as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:43-48 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Said to Adonijah gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 1:49-53",
    chapter: 1,
    startVerse: 49,
    endVerse: 53,
    heading: "All the Guests Were with Adonijah Were Afraid",
    summary: "1 Kings 1:49-53 follows all the guests were with adonijah were afraid as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 1:49-53 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "All the Guests Were with Adonijah Were Afraid gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 2:1-6",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    heading: "Now the Days of David Drew Nigh That He",
    summary: "1 Kings 2:1-6 follows now the days of david drew nigh that he as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 2:1-6 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Now the Days of David Drew Nigh That He follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 2:7-12",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    heading: "Shew Kindness unto the Sons of Barzillai the Gileadite",
    summary: "1 Kings 2:7-12 follows shew kindness unto the sons of barzillai the gileadite as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 2:7-12 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Shew Kindness unto the Sons of Barzillai the Gileadite gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 2:13-18",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    heading: "Adonijah the Son of Haggith Came to Bath-sheba",
    summary: "1 Kings 2:13-18 follows adonijah the son of haggith came to bath-sheba as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 2:13-18 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Adonijah the Son of Haggith Came to Bath-sheba gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 2:19-24",
    chapter: 2,
    startVerse: 19,
    endVerse: 24,
    heading: "Bath-sheba Therefore Went unto King Solomon",
    summary: "1 Kings 2:19-24 follows bath-sheba therefore went unto king solomon as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 2:19-24 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Bath-sheba Therefore Went unto King Solomon focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 2:25-30",
    chapter: 2,
    startVerse: 25,
    endVerse: 30,
    heading: "King Solomon Sent by the Hand of Benaiah",
    summary: "1 Kings 2:25-30 follows king solomon sent by the hand of benaiah as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 2:25-30 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "King Solomon Sent by the Hand of Benaiah focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 2:31-36",
    chapter: 2,
    startVerse: 31,
    endVerse: 36,
    heading: "The King Said unto Him",
    summary: "1 Kings 2:31-36 follows the king said unto him as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 2:31-36 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "The King Said unto Him focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 2:37-42",
    chapter: 2,
    startVerse: 37,
    endVerse: 42,
    heading: "For It Shall Be",
    summary: "1 Kings 2:37-42 follows for it shall be as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 2:37-42 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "For It Shall Be gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 2:43-46",
    chapter: 2,
    startVerse: 43,
    endVerse: 46,
    heading: "Why Then Hast Thou Not Kept the Oath",
    summary: "1 Kings 2:43-46 follows why then hast thou not kept the oath as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 2:43-46 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Why Then Hast Thou Not Kept the Oath gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 3:1-6",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    heading: "Solomon Made Affinity with Pharaoh King of Egypt",
    summary: "1 Kings 3:1-6 follows solomon made affinity with pharaoh king of egypt as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 3:1-6 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Solomon Made Affinity with Pharaoh King of Egypt focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 3:7-12",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    heading: "O LORD My God",
    summary: "1 Kings 3:7-12 follows o lord my god as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 3:7-12 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "LORD My God keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 3:13-18",
    chapter: 3,
    startVerse: 13,
    endVerse: 18,
    heading: "I Have Also Given Thee That Which Thou Hast",
    summary: "1 Kings 3:13-18 follows i have also given thee that which thou hast as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 3:13-18 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "Have Also Given Thee That Which Thou Hast gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 3:19-24",
    chapter: 3,
    startVerse: 19,
    endVerse: 24,
    heading: "This Woman’s Child Died in the Night",
    summary: "1 Kings 3:19-24 follows this woman’s child died in the night as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 3:19-24 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "This Woman’s Child Died in the Night gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 3:25-28",
    chapter: 3,
    startVerse: 25,
    endVerse: 28,
    heading: "The King Said",
    summary: "1 Kings 3:25-28 follows the king said as part of david's census and solomon's wisdom.",
    teaching: [
      "1 Kings 3:25-28 belongs inside David's Census and Solomon's Wisdom, but this section has its own focused movement.",
      "The King Said focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_83_SECTIONS: DaySection[] = [
  {
    reference: "1 Kings 4:1-6",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    heading: "So King Solomon Was King Over All Israel",
    summary: "1 Kings 4:1-6 follows so king solomon was king over all israel as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 4:1-6 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "So King Solomon Was King Over All Israel focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 4:7-12",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    heading: "Solomon Had Twelve Officers Over All Israel",
    summary: "1 Kings 4:7-12 follows solomon had twelve officers over all israel as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 4:7-12 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "Solomon Had Twelve Officers Over All Israel gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 4:13-18",
    chapter: 4,
    startVerse: 13,
    endVerse: 18,
    heading: "The Son of Geber",
    summary: "1 Kings 4:13-18 follows the son of geber as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 4:13-18 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "The Son of Geber gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 4:19-24",
    chapter: 4,
    startVerse: 19,
    endVerse: 24,
    heading: "Geber the Son of Uri Was in the Country",
    summary: "1 Kings 4:19-24 follows geber the son of uri was in the country as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 4:19-24 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "Geber the Son of Uri Was in the Country gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 4:25-30",
    chapter: 4,
    startVerse: 25,
    endVerse: 30,
    heading: "Israel Dwelt Safely",
    summary: "1 Kings 4:25-30 follows israel dwelt safely as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 4:25-30 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "Israel Dwelt Safely gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 4:31-34",
    chapter: 4,
    startVerse: 31,
    endVerse: 34,
    heading: "For He Was Wiser Than All Men",
    summary: "1 Kings 4:31-34 follows for he was wiser than all men as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 4:31-34 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "For He Was Wiser Than All Men gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 5:1-6",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    heading: "Hiram King of Tyre Sent His Servants unto Solomon",
    summary: "1 Kings 5:1-6 follows hiram king of tyre sent his servants unto solomon as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 5:1-6 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "Hiram King of Tyre Sent His Servants unto Solomon focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 5:7-12",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    heading: "It Came to Pass",
    summary: "1 Kings 5:7-12 follows it came to pass as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 5:7-12 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "It Came to Pass gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 5:13-18",
    chapter: 5,
    startVerse: 13,
    endVerse: 18,
    heading: "King Solomon Raised a Levy Out of All Israel",
    summary: "1 Kings 5:13-18 follows king solomon raised a levy out of all israel as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 5:13-18 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "King Solomon Raised a Levy Out of All Israel focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 6:1-6",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass in the Four Hundred",
    summary: "1 Kings 6:1-6 follows it came to pass in the four hundred as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 6:1-6 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "It Came to Pass in the Four Hundred gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 6:7-12",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    heading: "When It Was in Building",
    summary: "1 Kings 6:7-12 follows when it was in building as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 6:7-12 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "When It Was in Building gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 6:13-18",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    heading: "I Will Dwell Among the Children of Israel",
    summary: "1 Kings 6:13-18 follows i will dwell among the children of israel as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 6:13-18 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "Will Dwell Among the Children of Israel gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 6:19-24",
    chapter: 6,
    startVerse: 19,
    endVerse: 24,
    heading: "The Oracle He Prepared in the House Within",
    summary: "1 Kings 6:19-24 follows the oracle he prepared in the house within as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 6:19-24 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "The Oracle He Prepared in the House Within gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 6:25-30",
    chapter: 6,
    startVerse: 25,
    endVerse: 30,
    heading: "The Other Cherub Was Ten Cubits",
    summary: "1 Kings 6:25-30 follows the other cherub was ten cubits as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 6:25-30 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "The Other Cherub Was Ten Cubits gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 6:31-36",
    chapter: 6,
    startVerse: 31,
    endVerse: 36,
    heading: "For the Entering of the Oracle He Made Doors",
    summary: "1 Kings 6:31-36 follows for the entering of the oracle he made doors as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 6:31-36 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "For the Entering of the Oracle He Made Doors gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 6:37-38",
    chapter: 6,
    startVerse: 37,
    endVerse: 38,
    heading: "In the Fourth Year Was the Foundation",
    summary: "1 Kings 6:37-38 follows in the fourth year was the foundation as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 6:37-38 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "In the Fourth Year Was the Foundation gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:1-6",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    heading: "Solomon Was Building His Own House Thirteen Years",
    summary: "1 Kings 7:1-6 follows solomon was building his own house thirteen years as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:1-6 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "Solomon Was Building His Own House Thirteen Years gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:7-12",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    heading: "Then He Made a Porch for the Throne Where",
    summary: "1 Kings 7:7-12 follows then he made a porch for the throne where as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:7-12 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "Then He Made a Porch for the Throne Where focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:13-18",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    heading: "King Solomon Sent",
    summary: "1 Kings 7:13-18 follows king solomon sent as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:13-18 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "King Solomon Sent focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:19-24",
    chapter: 7,
    startVerse: 19,
    endVerse: 24,
    heading: "The Chapiters Were Upon the Top of the Pillars",
    summary: "1 Kings 7:19-24 follows the chapiters were upon the top of the pillars as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:19-24 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "The Chapiters Were Upon the Top of the Pillars gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:25-30",
    chapter: 7,
    startVerse: 25,
    endVerse: 30,
    heading: "It Stood Upon Twelve Oxen",
    summary: "1 Kings 7:25-30 follows it stood upon twelve oxen as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:25-30 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "It Stood Upon Twelve Oxen gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:31-36",
    chapter: 7,
    startVerse: 31,
    endVerse: 36,
    heading: "The Mouth of It Within the Chapiter",
    summary: "1 Kings 7:31-36 follows the mouth of it within the chapiter as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:31-36 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "The Mouth of It Within the Chapiter gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:37-42",
    chapter: 7,
    startVerse: 37,
    endVerse: 42,
    heading: "After This Manner He Made the Ten Bases",
    summary: "1 Kings 7:37-42 follows after this manner he made the ten bases as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:37-42 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "After This Manner He Made the Ten Bases gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:43-48",
    chapter: 7,
    startVerse: 43,
    endVerse: 48,
    heading: "The Ten Bases",
    summary: "1 Kings 7:43-48 follows the ten bases as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:43-48 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "The Ten Bases gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 7:49-51",
    chapter: 7,
    startVerse: 49,
    endVerse: 51,
    heading: "The Candlesticks of Pure Gold",
    summary: "1 Kings 7:49-51 follows the candlesticks of pure gold as part of solomon's wisdom and temple preparations.",
    teaching: [
      "1 Kings 7:49-51 belongs inside Solomon's Wisdom and Temple Preparations, but this section has its own focused movement.",
      "The Candlesticks of Pure Gold gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_84_SECTIONS: DaySection[] = [
  {
    reference: "1 Kings 8:1-6",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    heading: "Then Solomon Assembled the Elders of Israel",
    summary: "1 Kings 8:1-6 follows then solomon assembled the elders of israel as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:1-6 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Then Solomon Assembled the Elders of Israel gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:7-12",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    heading: "For the Cherubims Spread Forth Their Two Wings Over",
    summary: "1 Kings 8:7-12 follows for the cherubims spread forth their two wings over as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:7-12 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "For the Cherubims Spread Forth Their Two Wings Over gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:13-18",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    heading: "I Have Surely Built Thee an House to Dwell",
    summary: "1 Kings 8:13-18 follows i have surely built thee an house to dwell as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:13-18 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Have Surely Built Thee an House to Dwell gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:19-24",
    chapter: 8,
    startVerse: 19,
    endVerse: 24,
    heading: "Nevertheless Thou Shalt Not Build the House",
    summary: "1 Kings 8:19-24 follows nevertheless thou shalt not build the house as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:19-24 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Nevertheless Thou Shalt Not Build the House gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:25-30",
    chapter: 8,
    startVerse: 25,
    endVerse: 30,
    heading: "LORD God of Israel",
    summary: "1 Kings 8:25-30 follows lord god of israel as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:25-30 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "LORD God of Israel keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:31-36",
    chapter: 8,
    startVerse: 31,
    endVerse: 36,
    heading: "If Any Man Trespass Against His Neighbour",
    summary: "1 Kings 8:31-36 follows if any man trespass against his neighbour as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:31-36 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "If Any Man Trespass Against His Neighbour gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:37-42",
    chapter: 8,
    startVerse: 37,
    endVerse: 42,
    heading: "If There Be in the Land Famine",
    summary: "1 Kings 8:37-42 follows if there be in the land famine as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:37-42 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "If There Be in the Land Famine gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:43-48",
    chapter: 8,
    startVerse: 43,
    endVerse: 48,
    heading: "Hear Thou in Heaven Thy Dwelling Place",
    summary: "1 Kings 8:43-48 follows hear thou in heaven thy dwelling place as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:43-48 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Hear Thou in Heaven Thy Dwelling Place gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:49-54",
    chapter: 8,
    startVerse: 49,
    endVerse: 54,
    heading: "Then Hear Thou Their Prayer",
    summary: "1 Kings 8:49-54 follows then hear thou their prayer as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:49-54 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Then Hear Thou Their Prayer gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:55-60",
    chapter: 8,
    startVerse: 55,
    endVerse: 60,
    heading: "Blessed All the Congregation of Israel with a Loud",
    summary: "1 Kings 8:55-60 follows blessed all the congregation of israel with a loud as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:55-60 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Blessed All the Congregation of Israel with a Loud gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 8:61-66",
    chapter: 8,
    startVerse: 61,
    endVerse: 66,
    heading: "Let Your Heart Therefore Be Perfect with the LORD",
    summary: "1 Kings 8:61-66 follows let your heart therefore be perfect with the lord as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 8:61-66 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Let Your Heart Therefore Be Perfect with the LORD keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 9:1-6",
    chapter: 9,
    startVerse: 1,
    endVerse: 6,
    heading: "It Came to Pass",
    summary: "1 Kings 9:1-6 follows it came to pass as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 9:1-6 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "It Came to Pass gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 9:7-12",
    chapter: 9,
    startVerse: 7,
    endVerse: 12,
    heading: "Then Will I Cut Off Israel Out",
    summary: "1 Kings 9:7-12 follows then will i cut off israel out as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 9:7-12 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Then Will I Cut Off Israel Out gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 9:13-18",
    chapter: 9,
    startVerse: 13,
    endVerse: 18,
    heading: "What Cities Are These Which Thou Hast Given Me",
    summary: "1 Kings 9:13-18 follows what cities are these which thou hast given me as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 9:13-18 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "What Cities Are These Which Thou Hast Given Me gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 9:19-24",
    chapter: 9,
    startVerse: 19,
    endVerse: 24,
    heading: "All the Cities of Store That Solomon Had",
    summary: "1 Kings 9:19-24 follows all the cities of store that solomon had as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 9:19-24 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "All the Cities of Store That Solomon Had gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 9:25-28",
    chapter: 9,
    startVerse: 25,
    endVerse: 28,
    heading: "Three Times in a Year Did Solomon Offer Burnt",
    summary: "1 Kings 9:25-28 follows three times in a year did solomon offer burnt as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 9:25-28 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Three Times in a Year Did Solomon Offer Burnt gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 10:1-6",
    chapter: 10,
    startVerse: 1,
    endVerse: 6,
    heading: "When the Queen of Sheba Heard of the Fame",
    summary: "1 Kings 10:1-6 follows when the queen of sheba heard of the fame as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 10:1-6 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "When the Queen of Sheba Heard of the Fame gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 10:7-12",
    chapter: 10,
    startVerse: 7,
    endVerse: 12,
    heading: "Howbeit I Believed Not the Words",
    summary: "1 Kings 10:7-12 follows howbeit i believed not the words as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 10:7-12 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Howbeit I Believed Not the Words gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 10:13-18",
    chapter: 10,
    startVerse: 13,
    endVerse: 18,
    heading: "King Solomon Gave unto the Queen of Sheba All",
    summary: "1 Kings 10:13-18 follows king solomon gave unto the queen of sheba all as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 10:13-18 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "King Solomon Gave unto the Queen of Sheba All focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 10:19-24",
    chapter: 10,
    startVerse: 19,
    endVerse: 24,
    heading: "The Throne Had Six Steps",
    summary: "1 Kings 10:19-24 follows the throne had six steps as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 10:19-24 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "The Throne Had Six Steps focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 10:25-29",
    chapter: 10,
    startVerse: 25,
    endVerse: 29,
    heading: "They Brought Every Man His Present",
    summary: "1 Kings 10:25-29 follows they brought every man his present as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 10:25-29 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "They Brought Every Man His Present gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 11:1-6",
    chapter: 11,
    startVerse: 1,
    endVerse: 6,
    heading: "King Solomon Loved Many Strange Women",
    summary: "1 Kings 11:1-6 follows king solomon loved many strange women as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 11:1-6 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "King Solomon Loved Many Strange Women focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 11:7-12",
    chapter: 11,
    startVerse: 7,
    endVerse: 12,
    heading: "Then Did Solomon Build an High Place for Chemosh",
    summary: "1 Kings 11:7-12 follows then did solomon build an high place for chemosh as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 11:7-12 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Then Did Solomon Build an High Place for Chemosh gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 11:13-18",
    chapter: 11,
    startVerse: 13,
    endVerse: 18,
    heading: "Howbeit I Will Not Rend Away All the Kingdom",
    summary: "1 Kings 11:13-18 follows howbeit i will not rend away all the kingdom as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 11:13-18 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Howbeit I Will Not Rend Away All the Kingdom focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 11:19-24",
    chapter: 11,
    startVerse: 19,
    endVerse: 24,
    heading: "Hadad Found Great Favour in the Sight of Pharaoh",
    summary: "1 Kings 11:19-24 follows hadad found great favour in the sight of pharaoh as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 11:19-24 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Hadad Found Great Favour in the Sight of Pharaoh gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 11:25-30",
    chapter: 11,
    startVerse: 25,
    endVerse: 30,
    heading: "He Was an Adversary to Israel All the Days",
    summary: "1 Kings 11:25-30 follows he was an adversary to israel all the days as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 11:25-30 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "He Was an Adversary to Israel All the Days gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 11:31-36",
    chapter: 11,
    startVerse: 31,
    endVerse: 36,
    heading: "He Said to Jeroboam",
    summary: "1 Kings 11:31-36 follows he said to jeroboam as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 11:31-36 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "He Said to Jeroboam gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 11:37-42",
    chapter: 11,
    startVerse: 37,
    endVerse: 42,
    heading: "I Will Take Thee",
    summary: "1 Kings 11:37-42 follows i will take thee as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 11:37-42 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Will Take Thee gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 11:43",
    chapter: 11,
    startVerse: 43,
    endVerse: 43,
    heading: "Solomon Slept with His Fathers",
    summary: "1 Kings 11:43 follows solomon slept with his fathers as part of temple glory and solomon's fall.",
    teaching: [
      "1 Kings 11:43 belongs inside Temple Glory and Solomon's Fall, but this section has its own focused movement.",
      "Solomon Slept with His Fathers gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

const DAY_85_SECTIONS: DaySection[] = [
  {
    reference: "1 Kings 12:1-6",
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    heading: "Rehoboam Went to Shechem",
    summary: "1 Kings 12:1-6 follows rehoboam went to shechem as part of the kingdom divides.",
    teaching: [
      "1 Kings 12:1-6 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Rehoboam Went to Shechem gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 12:7-12",
    chapter: 12,
    startVerse: 7,
    endVerse: 12,
    heading: "They Spake unto Him",
    summary: "1 Kings 12:7-12 follows they spake unto him as part of the kingdom divides.",
    teaching: [
      "1 Kings 12:7-12 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "They Spake unto Him gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 12:13-18",
    chapter: 12,
    startVerse: 13,
    endVerse: 18,
    heading: "The King Answered the People Roughly",
    summary: "1 Kings 12:13-18 follows the king answered the people roughly as part of the kingdom divides.",
    teaching: [
      "1 Kings 12:13-18 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "The King Answered the People Roughly focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 12:19-24",
    chapter: 12,
    startVerse: 19,
    endVerse: 24,
    heading: "So Israel Rebelled Against the House of David",
    summary: "1 Kings 12:19-24 follows so israel rebelled against the house of david as part of the kingdom divides.",
    teaching: [
      "1 Kings 12:19-24 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "So Israel Rebelled Against the House of David follows a person whose choices shape the wider kingdom story.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 12:25-30",
    chapter: 12,
    startVerse: 25,
    endVerse: 30,
    heading: "Then Jeroboam Built Shechem in Mount Ephraim",
    summary: "1 Kings 12:25-30 follows then jeroboam built shechem in mount ephraim as part of the kingdom divides.",
    teaching: [
      "1 Kings 12:25-30 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Then Jeroboam Built Shechem in Mount Ephraim gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 12:31-33",
    chapter: 12,
    startVerse: 31,
    endVerse: 33,
    heading: "He Made an House of High Places",
    summary: "1 Kings 12:31-33 follows he made an house of high places as part of the kingdom divides.",
    teaching: [
      "1 Kings 12:31-33 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "He Made an House of High Places gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 13:1-6",
    chapter: 13,
    startVerse: 1,
    endVerse: 6,
    heading: "There Came a Man of God Out of Judah",
    summary: "1 Kings 13:1-6 follows there came a man of god out of judah as part of the kingdom divides.",
    teaching: [
      "1 Kings 13:1-6 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "There Came a Man of God Out of Judah keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 13:7-12",
    chapter: 13,
    startVerse: 7,
    endVerse: 12,
    heading: "The King Said unto the Man of God",
    summary: "1 Kings 13:7-12 follows the king said unto the man of god as part of the kingdom divides.",
    teaching: [
      "1 Kings 13:7-12 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "The King Said unto the Man of God keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 13:13-18",
    chapter: 13,
    startVerse: 13,
    endVerse: 18,
    heading: "He Said unto His Sons",
    summary: "1 Kings 13:13-18 follows he said unto his sons as part of the kingdom divides.",
    teaching: [
      "1 Kings 13:13-18 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "He Said unto His Sons gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 13:19-24",
    chapter: 13,
    startVerse: 19,
    endVerse: 24,
    heading: "So He Went Back with Him",
    summary: "1 Kings 13:19-24 follows so he went back with him as part of the kingdom divides.",
    teaching: [
      "1 Kings 13:19-24 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "So He Went Back with Him gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 13:25-30",
    chapter: 13,
    startVerse: 25,
    endVerse: 30,
    heading: "Men Passed by",
    summary: "1 Kings 13:25-30 follows men passed by as part of the kingdom divides.",
    teaching: [
      "1 Kings 13:25-30 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Men Passed by gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 13:31-34",
    chapter: 13,
    startVerse: 31,
    endVerse: 34,
    heading: "It Came to Pass",
    summary: "1 Kings 13:31-34 follows it came to pass as part of the kingdom divides.",
    teaching: [
      "1 Kings 13:31-34 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "It Came to Pass gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 14:1-6",
    chapter: 14,
    startVerse: 1,
    endVerse: 6,
    heading: "At That Time Abijah the Son of Jeroboam Fell",
    summary: "1 Kings 14:1-6 follows at that time abijah the son of jeroboam fell as part of the kingdom divides.",
    teaching: [
      "1 Kings 14:1-6 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "At That Time Abijah the Son of Jeroboam Fell gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 14:7-12",
    chapter: 14,
    startVerse: 7,
    endVerse: 12,
    heading: "Thus Saith the LORD God of Israel",
    summary: "1 Kings 14:7-12 follows thus saith the lord god of israel as part of the kingdom divides.",
    teaching: [
      "1 Kings 14:7-12 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Thus Saith the LORD God of Israel keeps the LORD's authority in view while people make difficult choices.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 14:13-18",
    chapter: 14,
    startVerse: 13,
    endVerse: 18,
    heading: "All Israel Shall Mourn for Him",
    summary: "1 Kings 14:13-18 follows all israel shall mourn for him as part of the kingdom divides.",
    teaching: [
      "1 Kings 14:13-18 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "All Israel Shall Mourn for Him gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 14:19-24",
    chapter: 14,
    startVerse: 19,
    endVerse: 24,
    heading: "The Rest of the Acts of Jeroboam",
    summary: "1 Kings 14:19-24 follows the rest of the acts of jeroboam as part of the kingdom divides.",
    teaching: [
      "1 Kings 14:19-24 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "The Rest of the Acts of Jeroboam gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 14:25-30",
    chapter: 14,
    startVerse: 25,
    endVerse: 30,
    heading: "It Came to Pass in the Fifth Year",
    summary: "1 Kings 14:25-30 follows it came to pass in the fifth year as part of the kingdom divides.",
    teaching: [
      "1 Kings 14:25-30 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "It Came to Pass in the Fifth Year gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 14:31",
    chapter: 14,
    startVerse: 31,
    endVerse: 31,
    heading: "Rehoboam Slept with His Fathers",
    summary: "1 Kings 14:31 follows rehoboam slept with his fathers as part of the kingdom divides.",
    teaching: [
      "1 Kings 14:31 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Rehoboam Slept with His Fathers gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 15:1-6",
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    heading: "Now in the Eighteenth Year of King Jeroboam",
    summary: "1 Kings 15:1-6 follows now in the eighteenth year of king jeroboam as part of the kingdom divides.",
    teaching: [
      "1 Kings 15:1-6 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Now in the Eighteenth Year of King Jeroboam focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 15:7-12",
    chapter: 15,
    startVerse: 7,
    endVerse: 12,
    heading: "Now the Rest of the Acts of Abijam",
    summary: "1 Kings 15:7-12 follows now the rest of the acts of abijam as part of the kingdom divides.",
    teaching: [
      "1 Kings 15:7-12 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Now the Rest of the Acts of Abijam gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 15:13-18",
    chapter: 15,
    startVerse: 13,
    endVerse: 18,
    heading: "Also Maachah His Mother",
    summary: "1 Kings 15:13-18 follows also maachah his mother as part of the kingdom divides.",
    teaching: [
      "1 Kings 15:13-18 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Also Maachah His Mother gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 15:19-24",
    chapter: 15,
    startVerse: 19,
    endVerse: 24,
    heading: "There Is a League Between Me",
    summary: "1 Kings 15:19-24 follows there is a league between me as part of the kingdom divides.",
    teaching: [
      "1 Kings 15:19-24 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "There Is a League Between Me gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 15:25-30",
    chapter: 15,
    startVerse: 25,
    endVerse: 30,
    heading: "Nadab the Son of Jeroboam Began to Reign Over",
    summary: "1 Kings 15:25-30 follows nadab the son of jeroboam began to reign over as part of the kingdom divides.",
    teaching: [
      "1 Kings 15:25-30 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Nadab the Son of Jeroboam Began to Reign Over focuses on royal authority and the question of faithful leadership.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  },
  {
    reference: "1 Kings 15:31-34",
    chapter: 15,
    startVerse: 31,
    endVerse: 34,
    heading: "Now the Rest of the Acts of Nadab",
    summary: "1 Kings 15:31-34 follows now the rest of the acts of nadab as part of the kingdom divides.",
    teaching: [
      "1 Kings 15:31-34 belongs inside The Kingdom Divides, but this section has its own focused movement.",
      "Now the Rest of the Acts of Nadab gives the listener the main phrase to watch while this section is read.",
      "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
      "Before moving on, help the listener understand what the phrase means and why it changes the story."
    ]
  }
];

export const SAMUEL_KINGS_DAY_SEVENTY_SIX_SAUL_FALLS_AND_DAVIDS_KINGDOM_BEGINS_LESSON = makeLesson(
  76,
  "Saul Falls and David's Kingdom Begins",
  "1 Samuel 31; 2 Samuel 1-3",
  DAY_76_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Samuel 31; 2 Samuel 1-3.",
    "Saul Falls and David's Kingdom Begins shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 76 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_SEVENTY_SEVEN_DAVIDS_THRONE_AND_GODS_PROMISE_LESSON = makeLesson(
  77,
  "David's Throne and God's Promise",
  "2 Samuel 4-7",
  DAY_77_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Samuel 4-7.",
    "David's Throne and God's Promise shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 77 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_SEVENTY_EIGHT_DAVIDS_VICTORIES_AND_DAVIDS_SIN_LESSON = makeLesson(
  78,
  "David's Victories and David's Sin",
  "2 Samuel 8-11",
  DAY_78_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Samuel 8-11.",
    "David's Victories and David's Sin shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 78 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_SEVENTY_NINE_CONSEQUENCES_IN_DAVIDS_HOUSE_LESSON = makeLesson(
  79,
  "Consequences in David's House",
  "2 Samuel 12-15",
  DAY_79_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Samuel 12-15.",
    "Consequences in David's House shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 79 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_EIGHTY_ABSALOMS_REBELLION_AND_DAVIDS_GRIEF_LESSON = makeLesson(
  80,
  "Absalom's Rebellion and David's Grief",
  "2 Samuel 16-19",
  DAY_80_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Samuel 16-19.",
    "Absalom's Rebellion and David's Grief shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 80 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_EIGHTY_ONE_DAVIDS_LATER_REIGN_AND_MIGHTY_MEN_LESSON = makeLesson(
  81,
  "David's Later Reign and Mighty Men",
  "2 Samuel 20-23",
  DAY_81_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Samuel 20-23.",
    "David's Later Reign and Mighty Men shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 81 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_EIGHTY_TWO_DAVIDS_CENSUS_AND_SOLOMONS_WISDOM_LESSON = makeLesson(
  82,
  "David's Census and Solomon's Wisdom",
  "2 Samuel 24; 1 Kings 1-3",
  DAY_82_SECTIONS,
  [
    "Today we continue the Bible in One Year with 2 Samuel 24; 1 Kings 1-3.",
    "David's Census and Solomon's Wisdom shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 82 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_EIGHTY_THREE_SOLOMONS_WISDOM_AND_TEMPLE_PREPARATIONS_LESSON = makeLesson(
  83,
  "Solomon's Wisdom and Temple Preparations",
  "1 Kings 4-7",
  DAY_83_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Kings 4-7.",
    "Solomon's Wisdom and Temple Preparations shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 83 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_EIGHTY_FOUR_TEMPLE_GLORY_AND_SOLOMONS_FALL_LESSON = makeLesson(
  84,
  "Temple Glory and Solomon's Fall",
  "1 Kings 8-11",
  DAY_84_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Kings 8-11.",
    "Temple Glory and Solomon's Fall shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 84 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const SAMUEL_KINGS_DAY_EIGHTY_FIVE_THE_KINGDOM_DIVIDES_LESSON = makeLesson(
  85,
  "The Kingdom Divides",
  "1 Kings 12-15",
  DAY_85_SECTIONS,
  [
    "Today we continue the Bible in One Year with 1 Kings 12-15.",
    "The Kingdom Divides shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.",
  ],
  [
    "Day 85 reminds us that kings change, but the LORD still rules over His people.",
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);

export const BIBLE_YEAR_DAY_76_DEEP_NOTES = makeDeepNotes(
  "Saul Falls and David's Kingdom Begins",
  [
  "1 Samuel 31",
  "2 Samuel 1",
  "2 Samuel 2",
  "2 Samuel 3"
],
  [
    "Day 76 covers 1 Samuel 31; 2 Samuel 1-3.",
    "Saul Falls and David's Kingdom Begins belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_76_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_77_DEEP_NOTES = makeDeepNotes(
  "David's Throne and God's Promise",
  [
  "2 Samuel 4",
  "2 Samuel 5",
  "2 Samuel 6",
  "2 Samuel 7"
],
  [
    "Day 77 covers 2 Samuel 4-7.",
    "David's Throne and God's Promise belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_77_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_78_DEEP_NOTES = makeDeepNotes(
  "David's Victories and David's Sin",
  [
  "2 Samuel 8",
  "2 Samuel 9",
  "2 Samuel 10",
  "2 Samuel 11"
],
  [
    "Day 78 covers 2 Samuel 8-11.",
    "David's Victories and David's Sin belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_78_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_79_DEEP_NOTES = makeDeepNotes(
  "Consequences in David's House",
  [
  "2 Samuel 12",
  "2 Samuel 13",
  "2 Samuel 14",
  "2 Samuel 15"
],
  [
    "Day 79 covers 2 Samuel 12-15.",
    "Consequences in David's House belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_79_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_80_DEEP_NOTES = makeDeepNotes(
  "Absalom's Rebellion and David's Grief",
  [
  "2 Samuel 16",
  "2 Samuel 17",
  "2 Samuel 18",
  "2 Samuel 19"
],
  [
    "Day 80 covers 2 Samuel 16-19.",
    "Absalom's Rebellion and David's Grief belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_80_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_81_DEEP_NOTES = makeDeepNotes(
  "David's Later Reign and Mighty Men",
  [
  "2 Samuel 20",
  "2 Samuel 21",
  "2 Samuel 22",
  "2 Samuel 23"
],
  [
    "Day 81 covers 2 Samuel 20-23.",
    "David's Later Reign and Mighty Men belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_81_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_82_DEEP_NOTES = makeDeepNotes(
  "David's Census and Solomon's Wisdom",
  [
  "2 Samuel 24",
  "1 Kings 1",
  "1 Kings 2",
  "1 Kings 3"
],
  [
    "Day 82 covers 2 Samuel 24; 1 Kings 1-3.",
    "David's Census and Solomon's Wisdom belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_82_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_83_DEEP_NOTES = makeDeepNotes(
  "Solomon's Wisdom and Temple Preparations",
  [
  "1 Kings 4",
  "1 Kings 5",
  "1 Kings 6",
  "1 Kings 7"
],
  [
    "Day 83 covers 1 Kings 4-7.",
    "Solomon's Wisdom and Temple Preparations belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_83_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_84_DEEP_NOTES = makeDeepNotes(
  "Temple Glory and Solomon's Fall",
  [
  "1 Kings 8",
  "1 Kings 9",
  "1 Kings 10",
  "1 Kings 11"
],
  [
    "Day 84 covers 1 Kings 8-11.",
    "Temple Glory and Solomon's Fall belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_84_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_85_DEEP_NOTES = makeDeepNotes(
  "The Kingdom Divides",
  [
  "1 Kings 12",
  "1 Kings 13",
  "1 Kings 14",
  "1 Kings 15"
],
  [
    "Day 85 covers 1 Kings 12-15.",
    "The Kingdom Divides belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.",
  ],
  DAY_85_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);

export const BIBLE_YEAR_DAY_76_DEEP_STUDY_SECTIONS = makeStudySections(DAY_76_SECTIONS);
export const BIBLE_YEAR_DAY_77_DEEP_STUDY_SECTIONS = makeStudySections(DAY_77_SECTIONS);
export const BIBLE_YEAR_DAY_78_DEEP_STUDY_SECTIONS = makeStudySections(DAY_78_SECTIONS);
export const BIBLE_YEAR_DAY_79_DEEP_STUDY_SECTIONS = makeStudySections(DAY_79_SECTIONS);
export const BIBLE_YEAR_DAY_80_DEEP_STUDY_SECTIONS = makeStudySections(DAY_80_SECTIONS);
export const BIBLE_YEAR_DAY_81_DEEP_STUDY_SECTIONS = makeStudySections(DAY_81_SECTIONS);
export const BIBLE_YEAR_DAY_82_DEEP_STUDY_SECTIONS = makeStudySections(DAY_82_SECTIONS);
export const BIBLE_YEAR_DAY_83_DEEP_STUDY_SECTIONS = makeStudySections(DAY_83_SECTIONS);
export const BIBLE_YEAR_DAY_84_DEEP_STUDY_SECTIONS = makeStudySections(DAY_84_SECTIONS);
export const BIBLE_YEAR_DAY_85_DEEP_STUDY_SECTIONS = makeStudySections(DAY_85_SECTIONS);
