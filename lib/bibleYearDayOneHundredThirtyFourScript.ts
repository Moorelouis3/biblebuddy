import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 134, written to the Day 1 standard.
 *
 * Psalms 16-18: a refuge psalm that ends up preached centuries later as a
 * resurrection promise, a prayer to be kept like the apple of an eye, and
 * David's own fifty-verse account of an earthquake-sized rescue - the
 * longest single chapter in the run so far. Psalm 18 is consolidated into
 * three blocks with shorter teaching per block, the way Day 9 handled its
 * heaviest reading, so the chapter's own length carries the runtime instead
 * of getting doubled by commentary.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 134,
  title: "Refuge, Resurrection Hope, and Deliverance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 134. Yesterday ended on the words never moved.", 750],
    ["Today that turns into something bigger. A refuge, and then a hint that not even the grave is the last word.", 800],
    ["Psalm sixteen ends with a line the apostles later preach as a promise about the resurrection.", 850],
    ["Psalm seventeen asks to be kept like the apple of an eye.", 800],
    ["And Psalm eighteen is David's own account of an earthquake-sized rescue, the longest song we have read yet.", 850],
    ["We are in Psalms 16 through 18.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(16, 1, 11, [
      "Preserve me, O God: for in thee do I put my trust. The LORD is the portion of mine inheritance and of my cup: thou maintainest my lot. Portion, cup, and lot were all words for a person's measured-out share in life. David says his whole share is God, not property.",
      "The lines are fallen unto me in pleasant places; yea, I have a goodly heritage. Lines were the cords used to measure out land. His measured-out share turned out good, and he credits the one who did the measuring.",
      "I have set the LORD always before me: because he is at my right hand, I shall not be moved. That phrase again, never moved, this time chosen on purpose instead of just survived.",
      "For thou wilt not leave my soul in hell; neither wilt thou suffer thine Holy One to see corruption. Thou wilt shew me the path of life. David is speaking about his own hope here, but this exact verse gets preached centuries later about someone greater than David, whose body did not stay in a grave.",
    ]),
    g(17, 1, 7, [
      "Hear the right, O LORD, attend unto my cry, give ear unto my prayer, that goeth not out of feigned lips. Feigned means false. He is asking to be heard because he is not lying, and he wants that checked.",
      "Thou hast proved mine heart; thou hast visited me in the night; thou hast tried me, and shalt find nothing. Visited in the night pictures God testing him in the hours nobody else is watching, not just in public.",
      "I have called upon thee, for thou wilt hear me, O God: incline thine ear unto me, and hear my speech. Confidence stated before the answer arrives, the same shape as Psalm thirteen's turn yesterday.",
      "Shew thy marvellous lovingkindness, O thou that savest by thy right hand them which put their trust in thee. Marvellous is not decoration here. It names lovingkindness as something that should genuinely astonish a person.",
    ]),
    g(17, 8, 15, [
      "Keep me as the apple of the eye, hide me under the shadow of thy wings. The apple of the eye is the pupil, the most protected, most sensitive part of the body. That is the level of care he is asking for.",
      "Like as a lion that is greedy of his prey, and as it were a young lion lurking in secret places. The same lion image from Psalms 7 and 10, back again. This danger keeps wearing the same face across these prayers.",
      "From men of the world, which have their portion in this life, and whose belly thou fillest with thy hid treasure. Their whole reward is limited to right now. That line sets up the next one on purpose.",
      "As for me, I will behold thy face in righteousness: I shall be satisfied, when I awake, with thy likeness. Against a portion limited to this life, David sets a hope that reaches past it. When I awake picks up the same thread Psalm sixteen just opened.",
    ]),
    g(18, 1, 15, [
      "I will love thee, O LORD, my strength. The LORD is my rock, and my fortress, and my deliverer... my buckler, and the horn of my salvation, and my high tower. This psalm's own heading says David wrote it the day the Lord delivered him from Saul and all his enemies. Seven pictures of protection in two verses.",
      "In my distress I called upon the LORD, and cried unto my God: he heard my voice out of his temple. Then the earth shakes, smoke and fire pour out, and God rides down on a cherub, on the wings of the wind. The whole created world reacts to one man's cry being answered.",
      "The channels of waters were seen, and the foundations of the world were discovered at thy rebuke, O LORD. This is not calm language. David describes his rescue the way you would describe an earthquake, because that is the size it felt like from inside it.",
    ]),
    g(18, 16, 35, [
      "He sent from above, he took me, he drew me out of many waters. He brought me forth also into a large place; he delivered me, because he delighted in me. Delighted in me comes before any mention of David's own righteousness, not after.",
      "The LORD rewarded me according to my righteousness; according to the cleanness of my hands hath he recompensed me. Read next to Psalm fourteen's claim that nobody is good, this describes David keeping faith through one specific trial, not sinless perfection.",
      "With the merciful thou wilt shew thyself merciful... with the froward thou wilt shew thyself froward. Froward means stubborn and contrary. God is pictured meeting each person in the same posture they bring toward him.",
      "For thou wilt light my candle: the LORD my God will enlighten my darkness. One small, personal image, a lit lamp, tucked into the middle of a psalm about earthquakes and battle.",
    ]),
    g(18, 36, 50, [
      "Thou hast enlarged my steps under me, that my feet did not slip. I have pursued mine enemies, and overtaken them... I did cast them out as the dirt in the streets. This section is violent because David's actual wars were violent. The psalm does not soften that.",
      "The LORD liveth; and blessed be my rock; and let the God of my salvation be exalted. After forty-nine verses, this might be the plainest line in the whole psalm. Not a metaphor. Just, he is alive.",
      "Great deliverance giveth he to his king; and sheweth mercy to his anointed, to David, and to his seed for evermore. For evermore reaches past David himself, toward a king still to come from his line.",
      "Three chapters, one thread running under all of them: a portion that outlasts the grave, an apple of the eye kept under God's wing, and a deliverance loud enough to shake the hills.",
    ]),
  ],
  closing: [
    ["So that is Day 134.", 700],
    ["A portion that outlasts the grave, an apple of the eye kept under God's wing, and a rescue loud enough to shake the hills.", 800],
    ["Notice the shape underneath all three psalms. David is never protecting himself. He is being kept.", 800],
    ["Preserve me. Keep me. He drew me out of many waters. Every verb belongs to God, not to David.", 850],
    ["And that line in Psalm sixteen, about the Holy One not seeing corruption, outgrew David a long time ago. It became a promise about someone else.", 850],
    ["Tomorrow, Psalms 19 through 21. Creation preaching without words, Scripture praised in nine different ways, and a king who gets everything he asked for.", 850],
    ["For now, hold on to Psalm eighteen's plainest line.", 800],
    ["The LORD liveth.", 750],
    ["Not a metaphor. Just true.", 1200],
  ],
};
