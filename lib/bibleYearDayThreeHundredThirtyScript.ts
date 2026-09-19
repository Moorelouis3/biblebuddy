import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 330, written to the Day 1 standard.
 *
 * Second Corinthians 4 through 6: treasure carried in a cracked jar, a tent
 * that groans for something sturdier, the trade at the center of the whole
 * letter, and a plea not to waste grace already in hand. Six blocks across
 * three chapters.
 */

const secondCorinthiansFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 4:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const secondCorinthiansFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 5:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

const secondCorinthiansSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 6:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 330,
  title: "Treasure in Jars of Clay",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 330.", 700],
    ["Paul just told you the veil comes off in Christ. Now he tells you what carrying that looks like in a body that is falling apart.", 800],
    ["Treasure in a jar of clay. A tent that groans. A plea to stop wasting grace you already have.", 850],
    ["He lists what it actually cost him to preach this, and never once asks you to feel sorry for him.", 800],
    ["We are in Second Corinthians 4, 5, and 6.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    secondCorinthiansFour(1, 12, [
      "Therefore seeing we have this ministry, as we have received mercy, we faint not. He roots his endurance in mercy he was given, not toughness he built himself.",
      "Not walking in craftiness, nor handling the word of God deceitfully; but by manifestation of the truth commending ourselves to every man's conscience. The test of his ministry was never how impressive it sounded. It was whether the plain truth held up in someone else's conscience.",
      "We have this treasure in earthen vessels, that the excellency of the power may be of God, and not of us. The treasure is real. The jar was never meant to be the impressive part.",
      "Troubled on every side, yet not distressed; perplexed, but not in despair; persecuted, but not forsaken; cast down, but not destroyed. Four blows, and after every single one, the sentence keeps going.",
    ]),
    secondCorinthiansFour(13, 18, [
      "We having the same spirit of faith, according as it is written, I believed, and therefore have I spoken. He borrows a line from the Psalms to explain why he keeps talking even when it costs him.",
      "Though our outward man perish, yet the inward man is renewed day by day. Two clocks running in the same body, moving in opposite directions.",
      "Our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory. He does not deny the affliction. He just refuses to let it be the biggest thing in the room.",
      "While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal. Not a slogan. A daily decision about where he lets his eyes rest.",
    ]),
    secondCorinthiansFive(1, 10, [
      "We know that if our earthly house of this tabernacle were dissolved, we have a building of God, an house not made with hands, eternal in the heavens. He is honest that his body is a tent, not a house.",
      "For we walk by faith, not by sight. Buried in a parenthesis, easy to read past, and it is the hinge the whole passage turns on.",
      "Willing rather to be absent from the body, and to be present with the Lord. Wherefore we labour, that, whether present or absent, we may be accepted of him. Dying is not the finish line here. Pleasing him is, wherever that finds you.",
      "We must all appear before the judgment seat of Christ; that every one may receive the things done in his body, according to that he hath done, whether it be good or bad. He does not soften this to make anyone comfortable.",
    ]),
    secondCorinthiansFive(11, 21, [
      "The love of Christ constraineth us; because we thus judge, that if one died for all, then were all dead. Not fear driving him. Love doing the math on his behalf.",
      "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new. Not improved. New.",
      "God was in Christ, reconciling the world unto himself, not imputing their trespasses unto them; and hath committed unto us the word of reconciliation. He is not asking you to talk God into forgiving you. That part is already finished.",
      "He hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him. The trade at the center of the whole letter, said in one sentence.",
    ]),
    secondCorinthiansSix(1, 13, [
      "We then, as workers together with him, beseech you also that ye receive not the grace of God in vain. Behold, now is the accepted time; behold, now is the day of salvation. Grace can be received and then left sitting unused. He is begging them not to let that happen.",
      "In much patience, in afflictions, in necessities, in distresses, in stripes, in imprisonments, in tumults, in labours, in watchings, in fastings. He does not hide the cost of what he is describing.",
      "As sorrowful, yet alway rejoicing; as poor, yet making many rich; as having nothing, and yet possessing all things. He refuses to let the cost list be the only list.",
      "Our mouth is open unto you, our heart is enlarged. Ye are not straitened in us, but ye are straitened in your own bowels. He says plainly: I am not the one holding back here.",
    ]),
    secondCorinthiansSix(14, 18, [
      "Be ye not unequally yoked together with unbelievers: for what fellowship hath righteousness with unrighteousness? and what communion hath light with darkness? Less about who you marry than about which direction you are being pulled.",
      "What agreement hath the temple of God with idols? for ye are the temple of the living God. The reason the mismatch matters: something actually lives inside you now.",
      "Wherefore come out from among them, and be ye separate, saith the Lord, and touch not the unclean thing; and I will receive you. The separation is not about superiority. It is what makes room for him to receive you.",
      "And will be a Father unto you, and ye shall be my sons and daughters, saith the Lord Almighty. The whole appeal lands in a family, not a rulebook.",
    ]),
  ],
  closing: [
    ["So that is Day 330.", 700],
    ["A treasure carried in a jar of clay. A tent that groans for something sturdier.", 750],
    ["A trade where he who knew no sin became sin, so you could become the righteousness of God.", 800],
    ["And a plea, twice over, not to waste the grace already sitting in your hands.", 800],
    ["We walk by faith, not by sight.", 750],
    ["Tomorrow, Second Corinthians 7 through 9. A painful letter that finally did its work, and a chapter that is entirely about giving.", 850],
    ["For now, sit with what is not seen.", 800],
    ["The things which are seen are temporal.", 750],
    ["But the things which are not seen are eternal.", 1200],
  ],
};
