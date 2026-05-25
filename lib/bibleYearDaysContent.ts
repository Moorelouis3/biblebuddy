import type { BibleYearAudioDay } from "./bibleYearAudio";
import {
  BIBLE_YEAR_DAY_EIGHT_AUDIO,
  BIBLE_YEAR_DAY_FIVE_AUDIO,
  BIBLE_YEAR_DAY_FOUR_AUDIO,
  BIBLE_YEAR_DAY_ONE_AUDIO,
  BIBLE_YEAR_DAY_SEVEN_AUDIO,
  BIBLE_YEAR_DAY_SIX_AUDIO,
  BIBLE_YEAR_DAY_THREE_AUDIO,
  BIBLE_YEAR_DAY_TWO_AUDIO,
} from "./bibleYearAudio";
import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import {
  GENESIS_DAY_EIGHT_JUDGMENT_OF_SODOM_LESSON,
  GENESIS_DAY_FIVE_ABRAHAM_OBEDIENCE_LESSON,
  GENESIS_DAY_FOUR_NOAH_FLOOD_LESSON,
  GENESIS_DAY_ONE_CREATION_LESSON,
  GENESIS_DAY_SEVEN_COVENANT_PROMISE_LESSON,
  GENESIS_DAY_SIX_RESCUE_OF_LOT_LESSON,
  GENESIS_DAY_THREE_NOAH_ARK_LESSON,
  GENESIS_DAY_TWO_FALL_LESSON,
} from "./bibleYearDailyLessons";
import { BIBLE_YEAR_DAY_ONE_DEEP_NOTES } from "./bibleYearDayOneDeepNotes";
import { BIBLE_YEAR_DAY_ONE_DEEP_STUDY_SECTIONS, type BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";
import { BIBLE_YEAR_DAY_THREE_DEEP_NOTES, BIBLE_YEAR_DAY_THREE_DEEP_STUDY_SECTIONS } from "./bibleYearDayThreeDeepNotes";
import { BIBLE_YEAR_DAY_FOUR_DEEP_NOTES, BIBLE_YEAR_DAY_FOUR_DEEP_STUDY_SECTIONS } from "./bibleYearDayFourDeepNotes";
import { BIBLE_YEAR_DAY_FIVE_DEEP_NOTES, BIBLE_YEAR_DAY_FIVE_DEEP_STUDY_SECTIONS } from "./bibleYearDayFiveDeepNotes";
import { BIBLE_YEAR_DAY_SEVEN_DEEP_NOTES, BIBLE_YEAR_DAY_SEVEN_DEEP_STUDY_SECTIONS } from "./bibleYearDaySevenDeepNotes";
import { BIBLE_YEAR_DAY_SIX_DEEP_NOTES, BIBLE_YEAR_DAY_SIX_DEEP_STUDY_SECTIONS } from "./bibleYearDaySixDeepNotes";
import { BIBLE_YEAR_DAY_TWO_DEEP_NOTES, BIBLE_YEAR_DAY_TWO_DEEP_STUDY_SECTIONS } from "./fallOfManDeepNotes";
import type { GenesisBibleYearDay } from "./bibleInOneYearPlan";

export type BibleYearSummaryContent = {
  intro: string[];
  highlights: Array<[string, string]>;
  takeawayTitle?: string;
  takeaway: string;
  takeawaySupport: string;
  studyNotesCtaTitle?: string;
  studyNotesCtaBody?: string;
};

export type BibleYearDayContent = {
  lesson: BibleYearDailyLesson | null;
  audio: BibleYearAudioDay | null;
  studyNotesMarkdown: string | null;
  studyNotesSections: BibleYearDeepStudySection[] | null;
  summary: BibleYearSummaryContent;
  discussionPrompt: string;
};

const dayOneSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 1-2 introduces the world before sin, pain, and brokenness entered creation.",
    "These chapters show God bringing order out of darkness, creating life with purpose, and forming humanity in His image.",
    "Before anything was damaged, Scripture first shows us what God originally intended the world to be.",
  ],
  highlights: [
    ["✨", "God speaks into darkness and brings light."],
    ["🌍", "God shapes the world into a home filled with life and purpose."],
    ["👤", "Humanity is created in God's image with value, dignity, and meaning."],
    ["🌱", "Eden shows work, rest, freedom, boundaries, and relationship with God."],
    ["📖", "Creation reveals a God who brings order, beauty, and intentional design."],
  ],
  takeaway: "Before the damage of sin entered the story, God's design for creation was good, beautiful, ordered, and full of life.",
  takeawaySupport: "This helps us understand not only where humanity came from, but what we were originally created for.",
};

const dayTwoSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 3-4 shows what happens when trust in God breaks.",
    "These chapters explain why the world feels divided, painful, and heavy now: sin enters through distrust, then spreads into shame, blame, anger, and violence.",
    "But even when the story turns dark, God keeps speaking, covering, warning, and preserving hope.",
  ],
  highlights: [
    ["🐍", "The serpent questions God's word and makes distrust sound reasonable."],
    ["🍎", "Adam and Eve disobey, and shame, fear, hiding, and blame enter the story."],
    ["🌱", "God judges sin, but also gives the first promise that evil will not win forever."],
    ["💔", "Cain's anger shows sin spreading from the garden into the family."],
    ["✨", "Seth's birth shows hope continuing even after heartbreak and loss."],
  ],
  takeaway: "Sin spreads quickly when trust breaks, but God does not abandon His people.",
  takeawaySupport: "Day 2 helps us understand why humanity needs rescue, and why the first promise of victory over evil matters so much.",
};

const fallbackHighlightIcons = ["📖", "👀", "🧭", "🌱", "✨"];

const dayThreeSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 5-7 follows the world after Eden as sin spreads through generations and violence fills the earth.",
    "The family line from Adam to Noah keeps repeating the reality of death, but Noah stands out as someone who walks with God in a corrupt world.",
    "Before the rain ever falls, these chapters show God warning, Noah obeying, and mercy being prepared inside the ark.",
  ],
  highlights: [
    ["🧬", "Genesis 5 traces Adam's family line and shows that death has entered every generation."],
    ["🚶", "Enoch and Noah show that people can still walk with God in a broken world."],
    ["🌍", "The earth becomes corrupt and violent, and God grieves over human wickedness."],
    ["🛠️", "Noah obeys God's instructions and builds the ark before the flood is visible."],
    ["🌧️", "Judgment begins, but God preserves Noah, his family, and the animals inside the ark."],
  ],
  takeaway: "Noah's story shows that faith is not just agreement with God; faith becomes obedience before everything makes sense.",
  takeawaySupport: "Day 3 helps us see both sides clearly: God takes evil seriously, but He also provides a way of rescue through mercy.",
};

const dayFourSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 8-10 shows what happens after the flood waters begin to go down.",
    "Noah waits, the ark rests, the dove brings back an olive leaf, and God leads Noah's family into a new beginning.",
    "But these chapters also show that even after judgment, the human heart still needs deeper rescue and lasting renewal.",
  ],
  highlights: [
    ["🌊", "God remembers Noah and causes the waters to recede from the earth."],
    ["🕊️", "The dove and olive leaf become a sign that life is returning after judgment."],
    ["🔥", "Noah's first major act after leaving the ark is worship."],
    ["🌈", "God gives the rainbow as a covenant sign that He will preserve the earth."],
    ["🌍", "The nations spread from Noah's family, but sin is still present in the new world."],
  ],
  takeaway: "The flood story does not end with destruction. It moves toward remembrance, restoration, worship, covenant, and a new beginning.",
  takeawaySupport: "Day 4 helps us see that God is faithful after the storm, but humanity still needs a greater rescue than Noah could bring.",
};

const dayFiveSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 11-13 moves from the pride of Babel into the beginning of Abram's story.",
    "At Babel, people try to build upward and make a name for themselves, but God calls Abram and promises to make his name great.",
    "These chapters show God beginning a rescue plan through one family, even while Abram is still learning how to trust.",
  ],
  highlights: [
    ["🏙️", "Babel shows humanity trying to create security and greatness apart from God."],
    ["🧬", "Genesis traces the family line toward Abram and narrows the story toward promise."],
    ["📣", "God calls Abram to leave what is familiar and follow Him by faith."],
    ["🌍", "God promises land, descendants, blessing, and blessing for all families of the earth."],
    ["⛺", "Abram obeys, builds altars, fails in fear, and keeps learning to trust God's promise."],
  ],
  takeaway: "God's promise is stronger than human pride, fear, and weakness.",
  takeawaySupport: "Day 5 helps us see the difference between trying to make a name for ourselves and receiving identity, purpose, and blessing from God.",
};

const daySixSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 14-15 shows Abram moving from public courage into private fear and honest questions.",
    "Abram rescues Lot, meets Melchizedek, refuses Sodom's reward, and then hears God speak directly to his fear.",
    "These chapters show that faith can be brave in battle and still need reassurance in the quiet place.",
  ],
  highlights: [
    ["⚔️", "War reaches Lot because of where he settled near Sodom."],
    ["🛡️", "Abram acts with courage and rescues Lot instead of leaving him behind."],
    ["👑", "Melchizedek blesses Abram, and Abram responds with honor and worship."],
    ["🚫", "Abram refuses Sodom's reward because he does not want blessing tied to corruption."],
    ["⭐", "God promises descendants like the stars, and Abram believes the LORD."],
  ],
  takeaway: "Faith trusts God in public action and private uncertainty.",
  takeawaySupport: "Day 6 helps us see that Abram's confidence does not come from kings, rewards, or circumstances, but from the God who makes and keeps covenant promises.",
};

const daySevenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 16-17 walks through waiting, shortcuts, pain, mercy, and covenant promise.",
    "Abram and Sarai try to force what God promised, and Hagar is caught in the brokenness that follows.",
    "But God sees Hagar, renames Abram and Sarai, gives the covenant sign, and promises Isaac by name.",
  ],
  highlights: [
    ["⏳", "Waiting exposes how hard it can be to trust God's timing."],
    ["💔", "Sarai and Abram's shortcut creates pain, conflict, and consequences."],
    ["👀", "God meets Hagar in the wilderness and shows that she is seen."],
    ["👑", "Abram becomes Abraham, and Sarai becomes Sarah as God speaks promise over their future."],
    ["✨", "God promises Isaac and makes clear that the covenant will continue by His power."],
  ],
  takeaway: "Human shortcuts cannot cancel God's covenant faithfulness.",
  takeawaySupport: "Day 7 helps us understand that God sees the wounded, corrects the waiting, and carries His promise forward even after human failure.",
};

function buildFallbackSummary(day: GenesisBibleYearDay): BibleYearSummaryContent {
  const pieces = day.summary
    .split(",")
    .map((piece) => piece.trim().replace(/[.?!]+$/, ""))
    .filter(Boolean)
    .slice(0, 5);
  const highlights = (pieces.length ? pieces : [day.title, day.reference, "the main movement of the passage"]).map((piece, index) => [
    fallbackHighlightIcons[index % fallbackHighlightIcons.length],
    `${piece.charAt(0).toUpperCase()}${piece.slice(1)}.`,
  ] as [string, string]);

  return {
    intro: [
      `${day.reference} continues the Bible in One Year journey with ${day.title.toLowerCase()}.`,
      day.summary,
      "This quick summary helps you understand what is happening in the passage before you move into trivia or deeper study.",
    ],
    highlights,
    takeaway: `${day.title} helps us follow the story of Scripture one clear step at a time.`,
    takeawaySupport: "The goal is simple: understand the main events, remember the key movement, and keep building the Bible story day by day.",
  };
}

export const BIBLE_YEAR_DAY_CONTENT: Partial<Record<number, Omit<BibleYearDayContent, "summary"> & { summary?: BibleYearSummaryContent }>> = {
  1: {
    lesson: GENESIS_DAY_ONE_CREATION_LESSON,
    audio: BIBLE_YEAR_DAY_ONE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_ONE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_ONE_DEEP_STUDY_SECTIONS,
    summary: dayOneSummary,
    discussionPrompt: "What stands out to you about the world God originally created?",
  },
  2: {
    lesson: GENESIS_DAY_TWO_FALL_LESSON,
    audio: BIBLE_YEAR_DAY_TWO_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWO_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWO_DEEP_STUDY_SECTIONS,
    summary: dayTwoSummary,
    discussionPrompt: "Where do you see the effects of broken trust in Genesis 3-4?",
  },
  3: {
    lesson: GENESIS_DAY_THREE_NOAH_ARK_LESSON,
    audio: BIBLE_YEAR_DAY_THREE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THREE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THREE_DEEP_STUDY_SECTIONS,
    summary: dayThreeSummary,
    discussionPrompt: "What stands out to you about Noah's obedience before the rain begins?",
  },
  4: {
    lesson: GENESIS_DAY_FOUR_NOAH_FLOOD_LESSON,
    audio: BIBLE_YEAR_DAY_FOUR_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FOUR_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FOUR_DEEP_STUDY_SECTIONS,
    summary: dayFourSummary,
    discussionPrompt: "What stands out to you about life beginning again after the flood?",
  },
  5: {
    lesson: GENESIS_DAY_FIVE_ABRAHAM_OBEDIENCE_LESSON,
    audio: BIBLE_YEAR_DAY_FIVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIVE_DEEP_STUDY_SECTIONS,
    summary: dayFiveSummary,
    discussionPrompt: "What stands out to you about Abram leaving what was familiar?",
  },
  6: {
    lesson: GENESIS_DAY_SIX_RESCUE_OF_LOT_LESSON,
    audio: BIBLE_YEAR_DAY_SIX_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIX_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIX_DEEP_STUDY_SECTIONS,
    summary: daySixSummary,
    discussionPrompt: "What stands out to you about Abram's courage and trust in Genesis 14-15?",
  },
  7: {
    lesson: GENESIS_DAY_SEVEN_COVENANT_PROMISE_LESSON,
    audio: BIBLE_YEAR_DAY_SEVEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVEN_DEEP_STUDY_SECTIONS,
    summary: daySevenSummary,
    discussionPrompt: "What stands out to you about waiting on God's promise?",
  },
  8: {
    lesson: GENESIS_DAY_EIGHT_JUDGMENT_OF_SODOM_LESSON,
    audio: BIBLE_YEAR_DAY_EIGHT_AUDIO,
    studyNotesMarkdown: null,
    studyNotesSections: null,
    discussionPrompt: "What stands out to you about Abraham's intercession and Lot's rescue?",
  },
};

export function getBibleYearDayContent(day: GenesisBibleYearDay): BibleYearDayContent {
  const content = BIBLE_YEAR_DAY_CONTENT[day.dayNumber];
  return {
    lesson: content?.lesson ?? null,
    audio: content?.audio ?? null,
    studyNotesMarkdown: content?.studyNotesMarkdown ?? null,
    studyNotesSections: content?.studyNotesSections ?? null,
    summary: content?.summary ?? buildFallbackSummary(day),
    discussionPrompt: content?.discussionPrompt ?? `What stood out to you from ${day.title}?`,
  };
}
