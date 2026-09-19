import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 329, written to the Day 1 standard.
 *
 * Second Corinthians 1 through 3: Paul writes from the other side of
 * something that nearly killed him, explains a painful letter he does not
 * regret, and lands on a covenant written on hearts instead of stone. Six
 * blocks across three chapters.
 */

const secondCorinthiansOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 1:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const secondCorinthiansTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 2:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const secondCorinthiansThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 3:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 329,
  title: "Comfort and New Covenant Ministry",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 329.", 700],
    ["Paul is writing this one from the other side of something that nearly killed him.", 800],
    ["He does not open with theology. He opens with why he can still comfort anyone at all.", 800],
    ["Then he moves from a painful letter he does not regret sending, to a covenant written on hearts instead of stone.", 850],
    ["We are in Second Corinthians 1, 2, and 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    secondCorinthiansOne(1, 11, [
      "Blessed be God, the Father of mercies, and the God of all comfort, who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble. The comfort was never just for him. It was always meant to pass through him to somebody else.",
      "We were pressed out of measure, above strength, insomuch that we despaired even of life. Paul does not dress up how bad Asia was. He says plainly he thought he was going to die.",
      "We had the sentence of death in ourselves, that we should not trust in ourselves, but in God which raiseth the dead. The point of the suffering, as he reads it after the fact, was to stop him trusting his own strength.",
      "Whatever comfort you've been given was not just for you to keep. Somebody near you is about to need exactly the comfort you already survived long enough to receive.",
    ]),
    secondCorinthiansOne(12, 24, [
      "Our rejoicing is this, the testimony of our conscience, that in simplicity and godly sincerity we have had our conversation in the world. Paul defends himself, but not by claiming he was impressive. By claiming he was honest.",
      "He'd changed his travel plans and some in Corinth read it as flakiness. Did I use lightness? he asks. Was it with me yea yea, and nay nay? He takes the accusation seriously enough to answer it directly.",
      "All the promises of God in him are yea, and in him Amen. Whatever else shifts around Paul's own itinerary, the promises themselves never waver. Every one of them lands on Christ.",
      "Not for that we have dominion over your faith, but are helpers of your joy: for by faith ye stand. He describes his own authority as help, not control. He is not the one holding them up.",
    ]),
    secondCorinthiansTwo(1, 11, [
      "Out of much affliction and anguish of heart I wrote unto you with many tears; not that ye should be grieved, but that ye might know the love which I have more abundantly unto you. He explains a hard letter he sent, and the reason was never to wound them.",
      "Someone in the church had caused real grief, and the church disciplined him. Now Paul says stop. Sufficient to such a man is this punishment, which was inflicted of many. Enough is enough.",
      "Ye ought rather to forgive him, and comfort him, lest perhaps such a one should be swallowed up with overmuch sorrow. The discipline had a goal. Once it's reached that goal, holding on longer just drowns the person it was supposed to restore.",
      "Lest Satan should get an advantage of us: for we are not ignorant of his devices. Refusing to forgive, Paul says plainly, is its own trap. It doesn't protect the church. It just gives the enemy new ground.",
    ]),
    secondCorinthiansTwo(12, 17, [
      "When I came to Troas to preach Christ's gospel, a door was opened unto me of the Lord. I had no rest in my spirit, because I found not Titus my brother. An open door, and Paul still could not settle, because he was too worried about a friend to walk through it.",
      "Now thanks be unto God, which always causeth us to triumph in Christ. Even the detour becomes something he can thank God for, once he says it out loud.",
      "To the one we are the savour of death unto death, and to the other the savour of life unto life. The same message lands completely differently depending on who receives it. That was never Paul's failure to fix.",
      "Who is sufficient for these things? He asks the question and does not rush past it with a confident answer. He just names how heavy the work actually is.",
    ]),
    secondCorinthiansThree(1, 11, [
      "Ye are our epistle written in our hearts, known and read of all men. He tells the Corinthians their own changed lives are the only credential he needs. Not a letter of recommendation. Them.",
      "Written not with ink, but with the Spirit of the living God; not in tables of stone, but in fleshy tables of the heart. He reaches straight back to Moses coming down Sinai with two stone tablets, and says something different is being written now, somewhere else.",
      "The letter killeth, but the spirit giveth life. A rule can tell you exactly where you failed without giving you a single ounce of power to do differently.",
      "If the ministration of death, written and engraven in stones, was glorious, so that the children of Israel could not stedfastly behold the face of Moses for the glory of his countenance — how shall not the ministration of the spirit be rather glorious? Moses came down so bright they couldn't look at him, and even that was the lesser glory.",
    ]),
    secondCorinthiansThree(12, 18, [
      "Moses put a vail over his face, that the children of Israel could not stedfastly look to the end of that which is abolished. He covered the fading glory rather than let them watch it fade.",
      "Even unto this day, when Moses is read, the vail is upon their heart. Nevertheless when it shall turn to the Lord, the vail shall be taken away. The problem was never the reading. It was what stood between them and what the reading pointed to.",
      "Now the Lord is that Spirit: and where the Spirit of the Lord is, there is liberty. Not a longer list of rules. Room to breathe.",
      "We all, with open face beholding as in a glass the glory of the Lord, are changed into the same image from glory to glory. Not a single moment. A slow change, from looking.",
    ]),
  ],
  closing: [
    ["So that is Day 329.", 700],
    ["A man who nearly died in Asia, and turned it into comfort for you.", 750],
    ["A letter he regretted grieving them with, but never regretted sending.", 800],
    ["And a face Moses had to cover, next to a face nobody needs to cover anymore.", 800],
    ["We are not sufficient of ourselves to think any thing as of ourselves. Our sufficiency is of God.", 850],
    ["Tomorrow, Second Corinthians 4 through 6. Treasure carried in jars of clay.", 850],
    ["For now, sit with the veil that comes off.", 800],
    ["Where the Spirit of the Lord is, there is liberty.", 750],
    ["Changed from glory to glory.", 1200],
  ],
};
