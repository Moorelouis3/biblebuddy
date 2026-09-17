import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 244, written to the Day 1 standard.
 *
 * Ezekiel 22-24 closes out the indictment before the siege itself lands: the
 * bloody city named again, two sisters instead of one this time, and then a
 * date written down and a private grief Ezekiel is forbidden to show. Six
 * blocks, each kept inside its own chapter.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 244,
  title: "The Bloody City and the Sign",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 244. The phrase 'bloody city' gets used twice today, about the same city.", 750],
    ["First for what Jerusalem has become: bribery, incest, the fatherless and the stranger crushed by the people who were supposed to protect them.", 800],
    ["Then a marriage allegory even worse than yesterday's. Two sisters this time, not one, both married to God, both chasing the same lovers.", 800],
    ["And then something changes. God has Ezekiel write down today's actual date, because the siege starts today. Not a warning anymore.", 850],
    ["That same day, Ezekiel's own wife dies, and he is told not to cry.", 900],
    ["We are in Ezekiel 22 through 24.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(22, 1, 16, [
      "God tells Ezekiel to judge 'the bloody city' and show her every abomination out loud, no summarizing allowed.",
      "The list names exactly who got hurt. Father and mother set light by, the stranger oppressed, the fatherless and the widow vexed. The powerful preying on the very people they existed to protect.",
      "It gets uglier close to home too. A man defiles his neighbor's wife, another his daughter-in-law, another his own sister, his father's daughter. The boundaries that hold a family together are gone from the inside.",
      "Bribes taken to shed blood, usury and extortion squeezing neighbors dry, and one line that names the root of all of it. Thou hast forgotten me, saith the Lord God.",
    ]),
    ez(22, 17, 31, [
      "God calls the whole house of Israel dross - the worthless scrap left over when silver gets refined out of ore.",
      "So He gathers them into Jerusalem the way scrap metal gets gathered into a furnace, and says plainly what happens next. I will melt you.",
      "Then He names who failed at their actual jobs. Priests violate the law instead of keeping it. Princes act like wolves tearing prey instead of shepherds. Prophets daub the cracks with untempered mortar - plastering over danger with comfort that was never true.",
      "And the verse that should stop you. I sought for a man among them, that should make up the hedge, and stand in the gap... but I found none. Not one person left to intercede.",
    ]),
    ez(23, 1, 27, [
      "Two sisters, daughters of one mother. Aholah is Samaria, Aholibah is Jerusalem. Both were mine, God says. Both bore children to Him. Both played the harlot with the same nations.",
      "Aholah dotes on Assyria's captains and horsemen, so God hands her straight into the hand of the very lovers she chased. Delivered into exactly what she wanted.",
      "Aholibah watches her sister judged for this and does not learn. She was more corrupt in her inordinate love than she - the warning example did not slow her down at all.",
      "She goes further than her sister ever did. She sees Chaldean men painted on a wall and dotes on the picture, then sends messengers to bring the real thing. Longing that no longer even needs anything real to attach to.",
    ]),
    ez(23, 28, 49, [
      "God says He will hand her to the very lovers she is now sick of, and strip her bare of the jewels He gave her. The exposure itself is the sentence - what she did in secret gets undone in public.",
      "Thou shalt drink of thy sister's cup deep and large. Not a separate punishment. The same cup, and she drinks all of it.",
      "The indictment stacks two things together on purpose - blood and idols - then adds the worst count of all. They caused their own sons to pass through the fire, to devour them.",
      "And on the very same day they did this, they walked into God's own sanctuary to worship, like nothing had happened. The sentence: stoned, cut down by sword, houses burned, so that ye shall know that I am the Lord God.",
    ]),
    ez(24, 1, 14, [
      "God tells Ezekiel to write down this exact date, because the king of Babylon set himself against Jerusalem this same day. Not a future threat anymore. It is happening as Ezekiel writes it.",
      "Then the parable. Set on a pot, fill it with the choice meat, build the fire under it, make it boil well. Jerusalem, being cooked down to nothing.",
      "Woe to the bloody city - the phrase comes back, and this time with a detail. Her blood was set on top of a rock instead of covered with dust. Spilled in the open, not even hidden.",
      "I have purged thee, and thou wast not purged. Every previous attempt at cleaning her failed, so the cleaning stops and the fury simply runs its course instead.",
    ]),
    ez(24, 15, 27, [
      "The same day, God tells Ezekiel his wife will die, and forbids the normal grief. No crying, no mourning, no covering his lips. Get dressed and go back to work the next morning.",
      "He obeys, and that evening his wife dies exactly as he was told. The text moves past it in one flat line - the same flatness God demanded of him in front of everyone.",
      "The people ask why he isn't grieving. His answer: what is happening in his own body is about to happen to their whole city - the sanctuary, the sons and daughters they love, gone the same way, with no time left to mourn properly either.",
      "The one thing held out past all of it: when the day finally comes, Ezekiel's mouth opens again and he speaks. The silence was never permanent. It was timed to the judgment.",
    ]),
  ],
  closing: [
    ["So that is Day 244.", 700],
    ["A bloody city named in full - bribery, incest, the fatherless and the stranger crushed by the very people meant to guard them.", 800],
    ["And nobody left to stand in the gap for any of it. Not one intercessor found.", 800],
    ["Two sisters this time, not one. Aholah judged first, and Aholibah watched it happen and went further anyway, all the way to loving a painting on a wall.", 850],
    ["The worst count against them both: children sent through the fire, then a walk into God's own house the same day, like nothing happened.", 850],
    ["Then a date, written down on purpose, because the siege was no longer a warning. It was that day.", 800],
    ["And Ezekiel's own grief got taken from him, so his life could say what his mouth was being held back from saying.", 850],
    ["Tomorrow, Ezekiel 25 through 27. Judgment turns outward, onto the nations, starting with Tyre.", 850],
    ["For now, hold on to the empty gap.", 750],
    ["God found no one to stand in it, so He put Ezekiel's own life there instead.", 1200],
  ],
};
