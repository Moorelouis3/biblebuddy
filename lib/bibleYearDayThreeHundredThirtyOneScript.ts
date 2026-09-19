import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 331, written to the Day 1 standard.
 *
 * Second Corinthians 7 through 9: the painful letter that finally did its
 * work, godly sorrow set against the sorrow of the world, and two chapters
 * that turn the whole letter toward a collection for people Paul's readers
 * have never met. Six blocks across three chapters.
 */

const secondCorinthiansSeven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 7:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 7,
  startVerse,
  endVerse,
  teaching,
});

const secondCorinthiansEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 8:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 8,
  startVerse,
  endVerse,
  teaching,
});

const secondCorinthiansNine = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 9:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 9,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 331,
  title: "Repentance and Generosity",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 331.", 700],
    ["Remember the painful letter Paul mentioned back on Day 329, the one he said he did not regret sending?", 800],
    ["Today you get to see what it actually did. Titus comes back with news, and Paul cannot stop talking about his relief.", 850],
    ["Then, without much warning, the letter turns toward money. Toward people in Jerusalem his readers have never met.", 800],
    ["We are in Second Corinthians 7, 8, and 9.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    secondCorinthiansSeven(1, 7, [
      "Having therefore these promises, dearly beloved, let us cleanse ourselves from all filthiness of the flesh and spirit, perfecting holiness in the fear of God. He turns the big promises of chapter six straight into something practical to do with them.",
      "We have wronged no man, we have corrupted no man, we have defrauded no man. He clears his own name plainly before he says anything else.",
      "Without were fightings, within were fears. He does not pretend Macedonia was calm. Trouble outside him, dread inside him, at the same time.",
      "Nevertheless God, that comforteth those that are cast down, comforted us by the coming of Titus. The comfort did not come as a feeling. It came as a person walking through the door.",
    ]),
    secondCorinthiansSeven(8, 16, [
      "Though I made you sorry with a letter, I do not repent, though I did repent. He is honest that he second-guessed sending it, and glad now that he did.",
      "Godly sorrow worketh repentance to salvation not to be repented of: but the sorrow of the world worketh death. Same feeling, sorrow, and it can lead to two completely different places.",
      "What carefulness it wrought in you, yea, what clearing of yourselves, yea, what indignation, yea, what fear, yea, what vehement desire, yea, what zeal. Real repentance is not quiet. It shows up as energy, not just as a mood.",
      "I rejoice therefore that I have confidence in you in all things. He ends the whole hard subject not with a lecture but with plain relief.",
    ]),
    secondCorinthiansEight(1, 9, [
      "We do you to wit of the grace of God bestowed on the churches of Macedonia: how that in a great trial of affliction the abundance of their joy and their deep poverty abounded unto the riches of their liberality. Poor people, hard-pressed people, giving anyway. He calls that grace, not willpower.",
      "Beyond their power they were willing of themselves, praying us with much intreaty that we would receive the gift. Nobody had to talk them into it. They had to be talked into being allowed to give.",
      "First gave their own selves to the Lord, and unto us by the will of God. The money was never the first gift. It just proved the first gift had already happened.",
      "Ye know the grace of our Lord Jesus Christ, that, though he was rich, yet for your sakes he became poor, that ye through his poverty might be rich. Every appeal for generosity in this letter is standing on top of this one sentence.",
    ]),
    secondCorinthiansEight(10, 24, [
      "As there was a readiness to will, so there may be a performance also out of that which ye have. He does not shame them for starting. He just asks them to finish what they already started a year ago.",
      "If there be first a willing mind, it is accepted according to that a man hath, and not according to that he hath not. Nobody is measured against what they do not have.",
      "As it is written, He that had gathered much had nothing over; and he that had gathered little had no lack. He reaches back to the manna in the wilderness, where hoarding and scraping by both ended up even.",
      "He is not sending Titus alone. He sends brothers alongside him, providing for honest things, not only in the sight of the Lord, but also in the sight of men. He guards the money as carefully as he guards the gospel.",
    ]),
    secondCorinthiansNine(1, 8, [
      "I know the forwardness of your mind, for which I boast of you to them of Macedonia. He has already been bragging about them to other churches, before he knows how this chapter will land.",
      "He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully. Not a formula for getting rich. A description of how seed has always worked.",
      "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver. The amount is never the point of this verse. The face you give it with is.",
      "God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work. The giving does not drain them. He argues it is exactly what keeps the supply moving.",
    ]),
    secondCorinthiansNine(9, 15, [
      "As it is written, He hath dispersed abroad; he hath given to the poor: his righteousness remaineth for ever. He quotes a Psalm about generosity outlasting the giver.",
      "He that ministereth seed to the sower both minister bread for your food, and multiply your seed sown. The God who feeds them is the same God who multiplies what they let go of.",
      "The administration of this service not only supplieth the want of the saints, but is abundant also by many thanksgivings unto God. Strangers in Jerusalem will end up thanking God because of money that started in Corinth.",
      "Thanks be unto God for his unspeakable gift. After two chapters about a collection, he ends on a gift he never has to ask anyone to give, because it has already been given to him.",
    ]),
  ],
  closing: [
    ["So that is Day 331.", 700],
    ["A painful letter that finally did what it was meant to do.", 750],
    ["Godly sorrow that leads somewhere, next to a worldly sorrow that just leads to death.", 800],
    ["And two whole chapters about money that keep circling back to one man who became poor so you could become rich.", 850],
    ["Every man according as he purposeth in his heart, so let him give. Not grudgingly, or of necessity. For God loveth a cheerful giver.", 850],
    ["Tomorrow, Second Corinthians 10 through 12. Paul defends himself against people trying to discredit him, and lands on a weakness he refuses to hide.", 850],
    ["For now, sit with the gift nobody had to be talked into.", 800],
    ["He was rich, yet for your sakes he became poor.", 750],
    ["That through his poverty you might be rich.", 1200],
  ],
};
