import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 146, written to the Day 1 standard.
 *
 * Psalms 52-54: a man who trusts his own cruelty, a fool who has decided
 * nobody is watching, and a prayer for rescue while the danger is still
 * real. Three very short psalms, five blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 146,
  title: "God Sustains the Faithful",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 146. Psalms 52 through 54.", 700],
    ["A boastful man who trusts his own cruelty.", 750],
    ["A fool who has decided nobody is watching.", 800],
    ["And a prayer for rescue while the danger is still real.", 850],
    ["Short psalms today, but the same question runs under all three. What happens when you build your life on something that cannot hold you up.", 800],
    ["We are in Psalms 52, 53, and 54.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(52, 1, 5, [
      "Why boastest thou thyself in mischief, O mighty man? the goodness of God endureth continually. He is bragging about the damage he can do. The psalm answers with one plain fact. God is still good, whether this man notices or not.",
      "Thy tongue deviseth mischiefs, like a sharp razor, working deceitfully. A razor is precise. This is not a man who lies by accident. He is skilled at it.",
      "Thou lovest evil more than good, and lying rather than to speak righteousness. Not weak in one weak moment. He genuinely prefers the wrong thing.",
      "God shall likewise destroy thee for ever, pluck thee out of thy dwelling place, and root thee out of the land of the living. The razor cuts other people for a season. It never once cuts God.",
    ]),
    g(52, 6, 9, [
      "The righteous also shall see, and fear, and shall laugh at him. Not cruel laughter. The kind that comes from finally watching someone face what they built.",
      "Lo, this is the man that made not God his strength, but trusted in the abundance of his riches. That is the whole diagnosis in one sentence. He built his life on something that cannot hold weight.",
      "But I am like a green olive tree in the house of God. Against a man rooted out of the land of the living, one image answers him. A tree, planted, still growing, right where God lives.",
      "I will praise thee for ever, because thou hast done it. Not because life is easy. Because God has already acted, and that is enough to build a life on.",
    ]),
    g(53, 1, 6, [
      "The fool hath said in his heart, there is no God. Not a philosopher making an argument. Someone deciding there is no one watching, so nothing he does actually matters.",
      "God looks down from heaven to see if there were any that did understand, that did seek God. And the report comes back. Every one of them is gone back, no, not one. Total, not partial.",
      "Have the workers of iniquity no knowledge, who eat up my people as they eat bread? Cruelty here is described as casual as a meal. That is how normal it has become to them.",
      "Oh that the salvation of Israel were come out of Zion. The psalm ends the only place it can. Not with better people. With a rescue that has to come from outside.",
    ]),
    g(54, 1, 4, [
      "Save me, O God, by thy name, and judge me by thy strength. He is not asking God to fight for him out of pity. He is asking God to act like Himself.",
      "For strangers are risen up against me, and oppressors seek after my soul. Real danger, named plainly. No metaphor here.",
      "They have not set God before them. That is the diagnosis of the whole attack. Not that his enemies are strong. That God is not in the room for them at all.",
      "Behold, God is mine helper: the Lord is with them that uphold my soul. Stated flatly, present tense, before the danger has actually passed.",
    ]),
    g(54, 5, 7, [
      "He shall reward evil unto mine enemies: cut them off in thy truth. He leaves the reckoning to God's truth, not his own hand.",
      "I will freely sacrifice unto thee. Freely, meaning nobody made him. Before the rescue is even finished, gratitude is already moving.",
      "For he hath delivered me out of all trouble. Past tense now. Somewhere between the opening cry and this line, the danger became a memory.",
      "Mine eye hath seen his desire upon mine enemies. Not gloating. Just naming that the fear from the opening verses did not get the last word.",
    ]),
  ],
  closing: [
    ["So that is Day 146.", 700],
    ["A razor tongue, a fool's verdict, and a prayer answered before the danger even ended.", 750],
    ["Psalm 52 says a life built on cruelty gets pulled up by the root, however strong it looks today.", 800],
    ["Psalm 53 says the fool is not the one who doubts. It is the one who decided nobody is watching.", 800],
    ["And Psalm 54 shows what it sounds like to trust God's name before you have the proof.", 850],
    ["Tomorrow, Psalms 55 through 57. Betrayal from someone close, real fear, and a plea for mercy in the middle of it.", 850],
    ["For now, hold on to the tree.", 800],
    ["Planted. Still growing.", 750],
    ["Right where God lives.", 1200],
  ],
};
