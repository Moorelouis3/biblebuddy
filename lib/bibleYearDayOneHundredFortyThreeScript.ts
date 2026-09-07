import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 143, written to the Day 1 standard.
 *
 * Psalms 43-45: Psalm 43 finishes the prayer Psalm 42 left mid-sentence, Psalm
 * 44 is a national lament that refuses to explain its own suffering as
 * punishment, and Psalm 45 is a royal wedding song whose sixth verse gets
 * quoted straight about Jesus in Hebrews 1. Six blocks across three chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 143,
  title: "Hope, Victory, and the King",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 143. Three psalms today, and they do not agree with each other.", 750],
    ["One keeps asking why God feels far away.", 800],
    ["One says we did nothing wrong, and we are still losing.", 800],
    ["One is a wedding song that turns out to be about a king who never stops reigning.", 850],
    ["We are in Psalms 43 through 45.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(43, 1, 5, [
      "This is the same prayer from yesterday, still going. Chapter break, not a new thought. Psalm 42 stopped mid-sentence and 43 just keeps talking.",
      "Judge me, O God, and plead my cause. He wants God to argue his case for him, because he cannot win it himself.",
      "Thou art the God of my strength: why dost thou cast me off? He calls God his strength and asks why God abandoned him, in the same breath. Both feel true to him right now.",
      "Then he does what he did yesterday. He talks to his own soul. Why art thou cast down? Hope in God. He is not waiting to feel better before he obeys. He is ordering himself to hope.",
    ]),
    g(44, 1, 8, [
      "New psalm, and a new voice. This one speaks as we, not I. The whole nation praying together.",
      "We have heard with our ears, O God, our fathers have told us. This generation never saw the conquest of Canaan themselves. They only have the story, passed down.",
      "They got not the land in possession by their own sword, neither did their own arm save them: but thy right hand, and thine arm. Every win their fathers ever had gets credited to God, not to the army.",
      "In God we boast all the day long. Right now, before anything goes wrong in this psalm, that is the confession. Remember it. It matters for what is coming.",
    ]),
    g(44, 9, 16, [
      "Then the psalm turns hard. But thou hast cast off, and put us to shame. The same God who won every battle for their fathers is now silent while they lose.",
      "Thou hast given us like sheep appointed for meat, and hast scattered us among the heathen. They are being slaughtered and scattered, and they do not understand why.",
      "Thou sellest thy people for nought, and dost not increase thy wealth by their price. Not even for a price. God let this happen for nothing they can see.",
      "Thou makest us a reproach to our neighbours, a scorn and a derision. Losing is hard enough. Losing while everyone around you laughs is worse.",
    ]),
    g(44, 17, 26, [
      "Here is the part that makes this psalm hard to explain away. All this is come upon us; yet have we not forgotten thee, neither have we dealt falsely in thy covenant.",
      "This is not a confession of sin. It is the opposite. They are saying we did not do anything to deserve this, and God, you know it. Thou knowest the secrets of the heart.",
      "The Bible does not always explain suffering as punishment. Sometimes the honest prayer is just, I do not know why, and I have not stopped being faithful.",
      "Awake, why sleepest thou, O Lord? Arise, cast us not off for ever. Arise for our help, and redeem us for thy mercies' sake. They end not with an answer, but with a demand rooted in who they still believe God is.",
    ]),
    g(45, 1, 9, [
      "New psalm, total change of mood. This is a wedding song for a king. My heart is inditing a good matter... my tongue is the pen of a ready writer. The writer is so full of it he says his own tongue is just the pen.",
      "Thou art fairer than the children of men: grace is poured into thy lips. Gird thy sword upon thy thigh... ride prosperously because of truth and meekness and righteousness. Beauty and a sword and gentleness, all on the same king.",
      "Then one line jumps straight out of the poem. Thy throne, O God, is for ever and ever. This was written for an Israelite king, and it calls him God. Hebrews later takes this verse and applies it, word for word, to Jesus.",
      "Thou lovest righteousness, and hatest wickedness: therefore God, thy God, hath anointed thee with the oil of gladness above thy fellows. The oil is a reward for what he already loved before he ever wore a crown.",
    ]),
    g(45, 10, 17, [
      "Now the psalm turns to the bride. Hearken, O daughter... forget also thine own people, and thy father's house. She is asked to leave everything she has known for this king.",
      "So shall the king greatly desire thy beauty: for he is thy Lord; and worship thou him. Marriage here is pictured as covenant loyalty, not just romance.",
      "The king's daughter is all glorious within: her clothing is of wrought gold. Her worth is named as inward first, then the gold gets added on top of it.",
      "Instead of thy fathers shall be thy children, whom thou mayest make princes in all the earth. I will make thy name to be remembered in all generations. That promise outlives everyone in the room.",
    ]),
  ],
  closing: [
    ["So that is Day 143.", 700],
    ["A prayer still going from yesterday. A nation asking why faithfulness did not stop the losing. A king whose throne gets called eternal.", 800],
    ["Psalm 43 does not wait to feel better before it hopes. It orders itself to.", 800],
    ["Psalm 44 refuses the easy answer. Not every hard season is punishment. Sometimes the honest prayer is just, we have not forgotten you, so why does it feel like you forgot us.", 850],
    ["And Psalm 45 hands you a king so much bigger than the poem that the Bible later just quotes it straight about Jesus.", 850],
    ["Tomorrow, Psalms 46 through 48. God as a very present help, right in the middle of the earth being removed.", 850],
    ["For now, sit with the refrain from today.", 800],
    ["Why art thou cast down, O my soul?", 750],
    ["Hope in God: for I shall yet praise him.", 1200],
  ],
};
