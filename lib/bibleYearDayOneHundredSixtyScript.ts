import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 160, written to the Day 1 standard.
 *
 * Psalms 94-96: a long complaint about injustice that refuses to end in
 * despair, a call to worship that will not let singing replace listening,
 * and a song that widens out from one nation to the whole earth. Forty-seven
 * verses across three chapters, so this day uses the full seven-block ceiling.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 160,
  title: "Justice and Worship",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 160. Psalms 94 through 96.", 700],
    ["Yesterday you were hiding in a secret place, listening to God reign over the loudest waters there are.", 800],
    ["Today the psalm asks the harder question first. If God reigns, why do the wicked keep getting away with it?", 850],
    ["And then it answers by singing anyway.", 900],
    ["We are in Psalms 94, 95, and 96.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(94, 1, 11, [
      "O LORD God, to whom vengeance belongeth, shew thyself. This psalm opens by asking God to actually act, not just to exist somewhere out of sight.",
      "How long shall the wicked triumph? They slay the widow and the stranger, and murder the fatherless. The psalm names exactly who is being hurt, on purpose. Not abstract sin. Real victims.",
      "Yet they say, The LORD shall not see, neither shall the God of Jacob regard it. That is the actual belief behind most cruelty. Not that God does not exist. That God is not watching closely enough to matter.",
      "He that planted the ear, shall he not hear? he that formed the eye, shall he not see? The psalm answers with a question nobody can win. The one who built your ability to notice things notices everything.",
    ]),
    g(94, 12, 19, [
      "Blessed is the man whom thou chastenest, O LORD, and teachest him out of thy law. In the middle of asking God to judge other people, the psalm suddenly turns and calls correction a blessing when it lands on you.",
      "For the LORD will not cast off his people, neither will he forsake his inheritance. After eleven verses of watching evil win, this is the actual anchor. Not that evil never happens. That God does not leave.",
      "Unless the LORD had been my help, my soul had almost dwelt in silence. He admits how close he came to giving up entirely. That line only works because it is honest.",
      "When I said, My foot slippeth; thy mercy, O LORD, held me up. Not before the slip. During it. The help arrives exactly when it is needed, not a step earlier.",
    ]),
    g(94, 20, 23, [
      "Shall the throne of iniquity have fellowship with thee, which frameth mischief by a law? This names something specific. Injustice dressed up as legal, official, on the books.",
      "They gather themselves together against the soul of the righteous, and condemn the innocent blood. The psalm does not soften what is actually happening to real people.",
      "But the LORD is my defence; and my God is the rock of my refuge. One short verse turns the whole psalm from complaint to trust, without pretending the danger is gone.",
      "And he shall bring upon them their own iniquity, and shall cut them off in their own wickedness. Justice here is not a new punishment invented for them. It is their own wickedness landing back on them.",
    ]),
    g(95, 1, 6, [
      "O come, let us sing unto the LORD: let us make a joyful noise to the rock of our salvation. After Psalm 94's long complaint, this psalm just starts singing. No transition explained.",
      "For the LORD is a great God, and a great King above all gods. In his hand are the deep places of the earth: the strength of the hills is his also. The praise is not vague. It reaches all the way down into the ground itself.",
      "The sea is his, and he made it: and his hands formed the dry land. Everything under your feet and everything you cannot see the bottom of belongs to the same maker.",
      "O come, let us worship and bow down: let us kneel before the LORD our maker. Singing turns into kneeling. The psalm moves from what you say to what your body does.",
    ]),
    g(95, 7, 11, [
      "For he is our God; and we are the people of his pasture, and the sheep of his hand. Then, in the very same breath, the psalm turns from worship to warning.",
      "To day if ye will hear his voice, harden not your heart, as in the provocation. It names a specific old failure and puts it right next to today, like it could happen again.",
      "Forty years long was I grieved with this generation... they have not known my ways. An entire generation missed the point of the wilderness, not from a lack of evidence, but because their hearts hardened one small refusal at a time.",
      "Unto whom I sware in my wrath that they should not enter into my rest. Worship that never turns into obedience is not finished worship. The psalm will not let singing stand in for listening.",
    ]),
    g(96, 1, 9, [
      "O sing unto the LORD a new song: sing unto the LORD, all the earth. Not a song for one nation. This one widens to everyone alive.",
      "Declare his glory among the heathen, his wonders among all people. The praise is not meant to stay private. It is meant to travel to people who have never heard it.",
      "For all the gods of the nations are idols: but the LORD made the heavens. That is the whole argument in one sentence. Other gods are made things. This one made the thing everything else is made in.",
      "O worship the LORD in the beauty of holiness: fear before him, all the earth. Beauty and fear sit in the same line on purpose. This is not a tame kind of worship.",
    ]),
    g(96, 10, 13, [
      "Say among the heathen that the LORD reigneth. This is the same claim Psalm 93 already made. Now it becomes something to announce, not just something to believe privately.",
      "Let the heavens rejoice, and let the earth be glad; let the sea roar, and the fulness thereof. Every part of creation gets invited into the celebration, not just the people singing.",
      "Let the field be joyful, and all that is therein: then shall all the trees of the wood rejoice. Even the ground and the trees get a voice in this psalm. Nothing gets left out of the joy.",
      "For he cometh, for he cometh to judge the earth. Said twice on purpose. The same judgment that felt so far off at the start of Psalm 94 is now something the whole earth can look forward to.",
    ]),
  ],
  closing: [
    ["So that is Day 160.", 700],
    ["A hard question about injustice, a call to come and worship, and a song that widens out to the whole earth.", 800],
    ["Psalm 94 never pretends the wicked are not winning for a while. It just refuses to believe that is the end of the story.", 800],
    ["Psalm 95 will not let singing replace listening. Worship that does not soften your heart is not finished yet.", 850],
    ["And Psalm 96 sends the good news out past the one nation singing it. Even the trees get a line in this one.", 850],
    ["Tomorrow, Psalms 97 through 99. The Holy King keeps reigning, and this time the whole earth is asked to tremble and rejoice at once.", 850],
    ["For now, hold on to the ending of Psalm 96.", 800],
    ["For he cometh.", 750],
    ["Said twice, because it was worth saying twice.", 1200],
  ],
};
