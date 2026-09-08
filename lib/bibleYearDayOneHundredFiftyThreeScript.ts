import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 153, written to the Day 1 standard.
 *
 * Psalms 73-75: a man who nearly lost his footing envying the wicked, a
 * nation begging God not to forget them while their temple burns, and a
 * short thanksgiving that finally does the math on who really gets
 * exalted. Six blocks across the three psalms.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 153,
  title: "Worship When Life Feels Unfair",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 153. Psalms 73 through 75.", 700],
    ["A man who watched evil people coast through life and nearly lost his footing over it.", 750],
    ["A nation watching its own temple burn, asking God how long He plans to stay silent.", 800],
    ["And an answer that says the wicked's rise was never really about their own strength.", 800],
    ["Envy, ruin, and then the actual math behind who really gets exalted.", 700],
    ["We are in Psalms 73, 74, and 75.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(73, 1, 14, [
      "Truly God is good to Israel, even to such as are of a clean heart. But as for me, my feet were almost gone; my steps had well nigh slipped. Asaph states the conclusion before he admits how close he came to losing it, a confession built right into his opening line.",
      "For I was envious at the foolish, when I saw the prosperity of the wicked... their strength is firm. He names the exact trigger. Not doubt about whether God exists, just watching people who mock God do just fine.",
      "They are not in trouble as other men... pride compasseth them about as a chain... They set their mouth against the heavens, and their tongue walketh through the earth. He describes people who insult God openly and pay no visible price for it. That is what nearly took his feet out from under him.",
      "Verily I have cleansed my heart in vain, and washed my hands in innocency. For all the day long have I been plagued, and chastened every morning. He puts his own daily suffering right next to their comfort. The math looks backwards, and he says so out loud.",
    ]),
    g(73, 15, 28, [
      "If I say, I will speak thus; behold, I should offend against the generation of thy children. He almost said all of this out loud to other people, then caught himself, worried it would wreck someone else's faith too.",
      "Until I went into the sanctuary of God; then understood I their end. Surely thou didst set them in slippery places: thou castedst them down into destruction. The turn happens in worship, not in an argument he wins. He finally sees where the wicked's road actually ends.",
      "Nevertheless I am continually with thee: thou hast holden me by my right hand. Thou shalt guide me with thy counsel, and afterward receive me to glory. Even at his worst moment of envy, he was never actually let go. That is the part he had not noticed.",
      "Whom have I in heaven but thee?... My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever... it is good for me to draw near to God. He ends back where he started, but now it is earned. Nearness to God, not fairness, becomes the whole answer.",
    ]),
    g(74, 1, 11, [
      "O God, why hast thou cast us off for ever? why doth thine anger smoke against the sheep of thy pasture? The mood shifts hard, from one man's private envy to a whole nation watching its own temple burn.",
      "Lift up thy feet unto the perpetual desolations... they have cast fire into thy sanctuary, they have defiled by casting down the dwelling place of thy name to the ground. This is not poetry. The temple has been physically wrecked and set on fire.",
      "We see not our signs: there is no more any prophet: neither is there among us any that knoweth how long. The worst part is not just the ruin. It is not knowing whether God is even still speaking, or how long this will last.",
      "Why withdrawest thou thy hand, even thy right hand? pluck it out of thy bosom. He asks God to stop holding back, in the most physical language he can find. Pull your hand out of your own robe and act.",
    ]),
    g(74, 12, 17, [
      "For God is my King of old, working salvation in the midst of the earth. In the middle of despair he pivots to memory, reciting what God has already done before asking for anything new.",
      "Thou didst divide the sea by thy strength: thou brakest the heads of the dragons in the waters... gavest him to be meat to the people. The exodus and the sea monsters of myth are both placed under God's power. Not just history, but total control over chaos itself.",
      "Thou didst cleave the fountain and the flood: thou driedst up mighty rivers. The day is thine, the night also is thine... thou hast prepared the light and the sun. Water, sun, day, and night, everything the enemy currently controls in the ruined temple, God actually owns at a cosmic level.",
      "Thou hast set all the borders of the earth: thou hast made summer and winter. Even the seasons are named as God's handiwork. Nothing about the world's order is actually in question here, only Israel's present situation.",
    ]),
    g(74, 18, 23, [
      "Remember this, that the enemy hath reproached, O LORD, and that the foolish people have blasphemed thy name. The memory of God's power turns back into an argument. Remember what you have done, now remember what is being said about you.",
      "O deliver not the soul of thy turtledove unto the multitude of the wicked: forget not the congregation of thy poor for ever. He calls Israel God's turtledove, small, defenseless, easily caught, and asks God not to let it go.",
      "Have respect unto the covenant: for the dark places of the earth are full of the habitations of cruelty. He does not appeal to Israel's goodness. He appeals to the covenant God made, and to how bad things actually are on the ground.",
      "Arise, O God, plead thine own cause... Forget not the voice of thine enemies. The last line is not really about Israel's rescue. It is about God's own name being mocked, and that is the case he wants God to fight.",
    ]),
    g(75, 1, 10, [
      "Unto thee, O God, do we give thanks, unto thee do we give thanks: for that thy name is near thy wondrous works declare. Psalm 75 answers Psalm 74's ruins with thanksgiving before anything is visibly fixed yet.",
      "When I shall receive the congregation I will judge uprightly... I bear up the pillars of it. God speaks in his own voice mid-psalm, claiming responsibility for holding the whole earth together, not just Israel's temple.",
      "I said unto the fools, Deal not foolishly... For promotion cometh neither from the east, nor from the west, nor from the south. But God is the judge: he putteth down one, and setteth up another. This directly answers Psalm 73's problem. The wicked's rise was never actually about their own strength.",
      "For in the hand of the LORD there is a cup... the dregs thereof, all the wicked of the earth shall wring them out, and drink them. But I will declare for ever... All the horns of the wicked also will I cut off; but the horns of the righteous shall be exalted. The prosperity Asaph envied in Psalm 73 gets its expiration date here. A cup that runs out, horns that get cut down.",
    ]),
  ],
  closing: [
    ["So that is Day 153.", 700],
    ["A man whose feet almost slipped watching the wicked prosper, a nation begging God not to forget them, and a psalm that finally does the math out loud.", 800],
    ["Psalm 73 says the turn does not come from arguing yourself out of envy. It comes from walking back into God's presence.", 800],
    ["Psalm 74 says you can name the wreckage honestly and still remind God, and yourself, of everything He has already done.", 850],
    ["And Psalm 75 says every rise the wicked seem to earn on their own has an expiration date God already set.", 850],
    ["Asaph started this day ready to say his cleansed hands were wasted. He ends it holding God's hand instead.", 800],
    ["Tomorrow, Psalms 76 through 78. God's power on display, and Israel's long, stubborn memory.", 850],
    ["For now, hold on to the line that turned everything.", 750],
    ["It is good for me to draw near to God.", 800],
    ["That was the whole answer, the whole time.", 1200],
  ],
};
