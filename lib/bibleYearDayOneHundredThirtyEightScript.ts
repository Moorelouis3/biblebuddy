import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 138, written to the Day 1 standard.
 *
 * Psalms 28-30: a desperate cry that turns into praise, a thunderstorm
 * treated as the literal voice of God, and a psalm that names the exact
 * moment grief flipped into dancing. Psalm 28 splits where it turns from
 * complaint to praise; Psalm 29 stays whole since the thunder refrain only
 * works read straight through; Psalm 30 splits at its own turning point.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 138,
  title: "Help, Strength, and Joy",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 138. Yesterday ended on an instruction to keep waiting.", 750],
    ["Today answers what waiting on God actually sounds like from the inside.", 800],
    ["Psalm twenty-eight is a man afraid God has gone quiet on him.", 750],
    ["Psalm twenty-nine treats an actual thunderstorm as God's own voice, out loud, over the water.", 800],
    ["And Psalm thirty names the exact night grief turned into dancing.", 800],
    ["We are in Psalms 28 through 30.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(28, 1, 5, [
      "Unto thee will I cry, O LORD my rock; be not silent to me: lest, if thou be silent to me, I become like them that go down into the pit. He is not afraid of an enemy here. He is afraid of God's silence itself, like silence is its own kind of danger.",
      "Hear the voice of my supplications, when I cry unto thee, when I lift up my hands toward thy holy oracle. Lifting the hands toward the oracle, the innermost place of the temple, was a physical gesture aimed at a specific direction, not a vague feeling.",
      "Draw me not away with the wicked... which speak peace to their neighbours, but mischief is in their hearts. He is not describing enemies who are openly hostile. He is describing people who sound friendly while planning harm.",
      "Give them according to their deeds... he shall destroy them, and not build them up. This is a hard, plain request for justice, asked directly, with no softening. The psalm does not pretend he does not want this.",
    ]),
    g(28, 6, 9, [
      "Blessed be the LORD, because he hath heard the voice of my supplications. No transition sentence explains the shift. Between one verse and the next, the fear of silence turns into certainty that he was heard.",
      "The LORD is my strength and my shield; my heart trusted in him, and I am helped: therefore my heart greatly rejoiceth; and with my song will I praise him. Trust came first, in the sentence. Help and rejoicing follow it, in that order.",
      "The LORD is their strength, and he is the saving strength of his anointed. He moves from his own private rescue straight to the king's, without pausing to explain the connection.",
      "Save thy people, and bless thine inheritance: feed them also, and lift them up for ever. The very last thing he asks for is not for himself. A psalm that opened begging not to be left in silence ends asking God to carry everyone else too.",
    ]),
    g(29, 1, 11, [
      "Give unto the LORD, O ye mighty, give unto the LORD glory and strength. This is addressed to the mighty ones, not to Israel. Even powerful beings are told what they owe God.",
      "The voice of the LORD is upon the waters: the God of glory thundereth... The voice of the LORD is powerful; the voice of the LORD is full of majesty. Seven times in this psalm, thunder is called God's actual voice, not a comparison to it.",
      "The voice of the LORD breaketh the cedars... He maketh them also to skip like a calf; Lebanon and Sirion like a young unicorn. Cedars of Lebanon were some of the largest, most solid trees known in that world. The storm makes entire mountain ranges look like they are jumping.",
      "The LORD sitteth upon the flood; yea, the LORD sitteth King for ever. The LORD will give strength unto his people; the LORD will bless his people with peace. After eleven verses of a storm loud enough to snap cedars, the very last word of the psalm is peace.",
    ]),
    g(30, 1, 6, [
      "I will extol thee, O LORD; for thou hast lifted me up, and hast not made my foes to rejoice over me. O LORD my God, I cried unto thee, and thou hast healed me. The psalm opens already looking backward at something finished, not still in the middle of it.",
      "O LORD, thou hast brought up my soul from the grave: thou hast kept me alive, that I should not go down to the pit. This is not vague gratitude. He is naming the specific thing he believes God pulled him back from.",
      "Sing unto the LORD, O ye saints of his, and give thanks at the remembrance of his holiness. For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning. This line gets remembered more than almost any other in the Psalms, and here it sits in the middle of an actual testimony, not as a stand-alone slogan.",
      "And in my prosperity I said, I shall never be moved. He admits, plainly, that comfort made him overconfident. The psalm does not hide this as a flaw. It states it as fact, right before explaining what happened next.",
    ]),
    g(30, 7, 12, [
      "LORD, by thy favour thou hast made my mountain to stand strong: thou didst hide thy face, and I was troubled. The very security he had just bragged about turned out to depend entirely on God's favor, the moment that favor felt withdrawn.",
      "I cried to thee, O LORD; and unto the LORD I made supplication. What profit is there in my blood, when I go down to the pit? Shall the dust praise thee? shall it declare thy truth? He argues with God using his own potential death as the argument. A dead man cannot praise anyone.",
      "Hear, O LORD, and have mercy upon me: LORD, be thou my helper. Thou hast turned for me my mourning into dancing: thou hast put off my sackcloth, and girded me with gladness. Sackcloth was worn specifically for mourning. Taking it off and putting on something else is described as something God did to him, not something he decided on his own.",
      "To the end that my glory may sing praise to thee, and not be silent. O LORD my God, I will give thanks unto thee for ever. The psalm that started by praising a finished rescue ends promising to keep praising forever, past the point where the story even needs telling anymore.",
    ]),
  ],
  closing: [
    ["So that is Day 138.", 700],
    ["A cry afraid of silence, a storm that speaks, and grief that ends up dancing.", 800],
    ["Notice where the turn happens in each one.", 700],
    ["Psalm twenty-eight turns the moment he decides he has been heard, before anything outside him changes.", 850],
    ["Psalm thirty turns after he already admits his own comfort had made him careless.", 800],
    ["Weeping may endure for a night, but joy cometh in the morning.", 800],
    ["That line only means something because the psalm shows you the actual night first.", 800],
    ["Tomorrow, Psalms 31 through 33. A prayer spoken from an actual crisis, an honest confession, and a psalm built entirely on trust.", 850],
    ["For now, hold on to the morning.", 750],
    ["It is coming. It is not here yet. Hold on anyway.", 1200],
  ],
};
