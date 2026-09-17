import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 242, written to the Day 1 standard.
 *
 * Ezekiel 16-18 is the heaviest reading in a while - 119 verses across three
 * chapters, headlined by the long marriage allegory in chapter 16. Six blocks,
 * teaching trimmed to fit the runtime ceiling: the chapter is not abridged,
 * the commentary is.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 242,
  title: "Sin, Responsibility, and Life",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 242. Today the whole relationship gets told as one story.", 750],
    ["An abandoned baby, raised by God into a queen, who turns around and sells herself to everyone who passes by.", 800],
    ["Worse than any prostitute in the story, because she pays the men instead of being paid.", 800],
    ["And then a chapter that throws out an old excuse. You are not doomed by your father's sin.", 800],
    ["We are in Ezekiel 16 through 18.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(16, 1, 14, [
      "In the day thou wast born... none eye pitied thee... but thou wast cast out in the open field, to the loathing of thy person, in the day that thou wast born. An abandoned newborn, left to die exposed.",
      "When I passed by thee, and saw thee polluted in thine own blood, I said unto thee, Live. Still bloody, still unwanted, and that is the word God speaks over her first.",
      "She grows up, and I spread my skirt over thee... I sware unto thee, and entered into a covenant with thee... and thou becamest mine. A covering, an oath, a marriage.",
      "Then the gifts. Fine linen, silk, jewelry, a crown, fine flour and honey and oil. Thou wast exceeding beautiful... it was perfect through my comeliness, which I had put upon thee. The beauty was never originally hers.",
    ]),
    ez(16, 15, 34, [
      "Thou didst trust in thine own beauty, and playedst the harlot because of thy renown. The beauty God gave her becomes the thing she uses against Him.",
      "She takes the very gold and clothing He gave her and makes idols out of it, even offering her own sons and daughters to them.",
      "She chases Egypt, then Assyria, then Babylon, one after another, and Genesis-style repetition makes sure you feel how relentless it is.",
      "Then the line that flips the whole comparison. A normal harlot gets paid. Thou givest thy gifts to all thy lovers... no hire is given unto thee. She is the one paying. Worse than the thing she is being compared to.",
    ]),
    ez(16, 35, 63, [
      "The judgment is described in the era's own law for a broken marriage. Exposed, stripped, stoned. Because thou hast not remembered the days of thy youth.",
      "Then the family gets named outright. Older sister Samaria, younger sister Sodom. Sodom's actual sin, spelled out here: pride, fulness of bread, and abundance of idleness, neither did she strengthen the hand of the poor and needy. Not what you probably assumed.",
      "And the gut punch. Thou hast justified thy sisters in all thine abominations. She made Sodom look righteous by comparison.",
      "Then, with no transition and no way she earned it: I will remember my covenant with thee in the days of thy youth, and I will establish unto thee an everlasting covenant. Restoration and shame sitting in the same sentence, on purpose.",
    ]),
    ez(17, 1, 24, [
      "A riddle. A great eagle comes to Lebanon, crops the top of a cedar, and carries it to a land of traffic. That is a king, carried off to a far country.",
      "The eagle plants a seed of the land, which grows into a low, spreading vine. A puppet king, set up to stay small and stay put.",
      "The vine's fatal move: it bends its own roots toward a second eagle, reaching for water it did not need. The chapter names this plainly. He despised the oath by breaking the covenant. Political scheming, called what it actually is.",
      "Then the pivot nobody expects. God takes his own tender twig and plants it on a high mountain, and it becomes the tree every kind of bird nests in. The high tree brought down, the low tree exalted.",
    ]),
    ez(18, 1, 20, [
      "An old proverb, quoted so it can be struck down. The fathers have eaten sour grapes, and the children's teeth are set on edge. The idea that you are doomed by your parents' guilt.",
      "Instead, a specific list. A man who restores the pledge, gives bread to the hungry, covers the naked, refuses to charge the poor interest, judges fairly. He shall surely live.",
      "Same family, violent son who does none of it. He shall not live... his blood shall be upon him. Then that son's own son, who watches his father and refuses to follow. He shall not die for the iniquity of his father.",
      "The rule, stated flat out twice so it cannot be missed. The soul that sinneth, it shall die. The son shall not bear the iniquity of the father, neither shall the father bear the iniquity of the son.",
    ]),
    ez(18, 21, 32, [
      "The offer, stated plainly. A wicked man who turns from every sin he has committed and starts doing what is right shall surely live, he shall not die. None of it held against him.",
      "God's own question, asked directly. Have I any pleasure at all that the wicked should die... and not that he should return from his ways, and live? Not a God looking for an excuse to punish.",
      "The warning has teeth both ways too. A righteous man who turns and does evil loses the credit of everything he used to be. Nobody gets to coast on a reputation.",
      "The closing command, repeated because it is the whole point of the chapter. Make you a new heart and a new spirit... turn yourselves, and live ye.",
    ]),
  ],
  closing: [
    ["So that is Day 242.", 700],
    ["An abandoned baby, raised into royalty, who took the gifts God gave her and used them to chase everyone but Him.", 800],
    ["Worse than a prostitute, the text says. Because she is the one who paid.", 800],
    ["Sodom's actual sin gets named along the way. Pride, plenty of bread, and refusing to help the poor. Not what you probably assumed.", 850],
    ["And right after the worst accusation in the whole chapter, God says He will remember the covenant anyway.", 800],
    ["Then Ezekiel 18 throws out the old excuse. The soul that sinneth, it shall die. Not the father's sin landing on the child.", 850],
    ["Every verdict in that chapter can still be turned. Turn yourselves, and live ye. That is not a threat. It is God asking a question and answering it Himself.", 850],
    ["Tomorrow, Ezekiel 19 through 21. A lament, and a sword that does not stop moving.", 850],
    ["For now, sit with the question God asks.", 750],
    ["Have I any pleasure at all that the wicked should die?", 1200],
  ],
};
