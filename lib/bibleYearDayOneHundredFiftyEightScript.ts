import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 158, written to the Day 1 standard.
 *
 * Psalms 88-90: the darkest, most unresolved prayer in the whole book, the
 * Davidic covenant sung and then mourned in the same psalm, and Moses
 * staring straight at how short a life actually is. Eighty-seven verses
 * across three chapters is the heaviest reading in a long stretch, so this
 * day uses the full seven-block ceiling with wider verse ranges per block.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 158,
  title: "Darkness, Covenant, and Numbering Days",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 158. Psalms 88 through 90.", 700],
    ["Fair warning up front. Psalm 88 is the darkest prayer in the whole book, and it never gets resolved.", 800],
    ["Then Psalm 89 sings about God's promise to David for thirty-seven verses, and spends the rest asking where that promise went.", 850],
    ["And Moses closes it out by staring straight at how short a life actually is.", 800],
    ["Three heavy chapters. Worth sitting with slowly.", 750],
    ["We are in Psalms 88, 89, and 90.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(88, 1, 9, [
      "O LORD God of my salvation, I have cried day and night before thee. That is the whole plot of this psalm in one line, and it does not change for eighteen verses.",
      "My soul is full of troubles, and my life draweth nigh unto the grave. This is written by someone who feels closer to dead than alive.",
      "Thou hast laid me in the lowest pit, in darkness, in the deeps. He puts the darkness directly on God. Not on circumstances. On God.",
      "I am shut up, and I cannot come forth. No exit is named anywhere in this psalm yet. Keep that in mind as we keep reading.",
    ]),
    g(88, 10, 18, [
      "Wilt thou shew wonders to the dead? Shall thy lovingkindness be declared in the grave? He is arguing that God should rescue him now, because a dead man cannot praise him later.",
      "LORD, why castest thou off my soul? why hidest thou thy face from me? Straight questions, and the text gives no answer.",
      "And then the last verse. Lover and friend hast thou put far from me, and mine acquaintance into darkness. That is where Psalm 88 ends. In the dark. No turn toward hope.",
      "This is the only psalm in the whole book that ends this way. Scripture leaves it standing, unresolved, because some prayers really do end like this, and it does not stop being prayer.",
    ]),
    g(89, 1, 18, [
      "I will sing of the mercies of the LORD for ever. After Psalm 88's silence, this psalm opens by singing, loudly, on purpose.",
      "I have made a covenant with my chosen, I have sworn unto David my servant. God states, in his own words, a specific promise to a specific man.",
      "Thou rulest the raging of the sea: when the waves thereof arise, thou stillest them. The same God who made that promise also controls the ocean. The size of the claim matches the size of the God making it.",
      "Justice and judgment are the habitation of thy throne: mercy and truth shall go before thy face. Whatever this God does, these four things travel with him.",
    ]),
    g(89, 19, 37, [
      "I have found David my servant; with my holy oil have I anointed him. God narrates choosing David like it already happened, spoken generations before it does.",
      "If his children forsake my law, and walk not in my judgments... then will I visit their transgression with the rod. Real consequences for real failure, built in up front, not sprung as a surprise later.",
      "Nevertheless my lovingkindness will I not utterly take from him, nor suffer my faithfulness to fail. Discipline is allowed. Cancellation is not.",
      "Once have I sworn by my holiness that I will not lie unto David. His seed shall endure for ever. That is the strongest oath language in the psalm. Watch what happens to it next.",
    ]),
    g(89, 38, 45, [
      "But thou hast cast off and abhorred, thou hast been wroth with thine anointed. One word flips the entire psalm. But.",
      "Thou hast made void the covenant of thy servant: thou hast profaned his crown by casting it to the ground. The psalm accuses God, by name, of breaking the very promise it just spent thirty-seven verses praising.",
      "Thou hast broken down all his hedges; thou hast brought his strong holds to ruin. This is not a private disappointment. It reads like a kingdom actually collapsing.",
      "Thou hast covered him with shame. However this psalm gets written, it is written from inside a real national disaster, not a theory.",
    ]),
    g(89, 46, 52, [
      "How long, LORD? wilt thou hide thyself for ever? shall thy wrath burn like fire? The question Psalm 88 never got to ask directly, this psalm asks straight to God's face.",
      "Lord, where are thy former lovingkindnesses, which thou swarest unto David in thy truth? He is not questioning whether the promise exists. He is asking where it went.",
      "And then, after forty-eight verses of complaint, the last line. Blessed be the LORD for evermore. Amen, and Amen.",
      "That line closes an entire section of the Psalms, not just this song. But it lands here anyway, right after the hardest question in the chapter, and nobody removed it.",
    ]),
    g(90, 1, 17, [
      "This whole psalm is credited to Moses, the oldest prayer in the book by far. LORD, thou hast been our dwelling place in all generations. Before the mountains were even formed, this was already true.",
      "A thousand years in thy sight are but as yesterday when it is past. Moses sets human life next to that, and the days of our years are threescore years and ten. Seventy years against a thousand that feels like one day.",
      "So teach us to number our days, that we may apply our hearts unto wisdom. That is the request the whole psalm has been building toward. Not more days. A clearer head about the ones he has.",
      "Establish thou the work of our hands upon us; yea, the work of our hands establish thou it. He says it twice, like he really means it. Whatever gets done with a short life, he wants it to actually last.",
    ]),
  ],
  closing: [
    ["So that is Day 158.", 700],
    ["A prayer that ends in the dark. A song that turns into a complaint. And an old man doing the math on how little time anyone gets.", 800],
    ["Psalm 88 never resolves. It just stops, mid-darkness, and Scripture leaves it there on purpose.", 800],
    ["Psalm 89 shows you can believe a promise completely and still ask God hard questions about where it went.", 850],
    ["And Psalm 90 does not try to talk you out of how short life is. It just asks God to make what is left count.", 850],
    ["Tomorrow, Psalms 91 through 93. Refuge, and the Lord reigning over everything that felt so uncertain today.", 850],
    ["For now, hold on to the one line Moses says twice, like he means it twice as much.", 800],
    ["Establish thou the work of our hands.", 800],
    ["Whatever gets done with a short life, make it last.", 1200],
  ],
};
