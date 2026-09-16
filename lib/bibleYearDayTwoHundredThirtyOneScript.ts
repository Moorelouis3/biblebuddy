import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 231, written to the Day 1 standard.
 *
 * Jeremiah 40-42: Nebuzaradan sets Jeremiah free and lets him choose his own
 * path; Gedaliah governs the remnant well for a short while and is warned,
 * and refuses to believe it; Ishmael murders him at his own table and then
 * slaughters eighty mourners into an old pit; Johanan rescues the survivors
 * but drifts toward Egypt out of fear; and the remnant asks Jeremiah for a
 * word from God while already planning to ignore it. Six blocks across
 * three chapters (56 verses), no gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 231,
  title: "The Remnant After the Fall",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 231. The city is gone, but the story is not over.", 750],
    ["A remnant is left in the land, and for a short while, under a good governor, it actually looks like it might be okay.", 800],
    ["Then one man with royal blood and a grudge ends that in an afternoon.", 800],
    ["By the end of the day, the same people who begged God for direction have already decided to ignore whatever answer He gives them.", 850],
    ["We are in Jeremiah 40, 41, and 42.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(40, 1, 6, [
      "Nebuzaradan finds Jeremiah in chains among the captives being marched to Babylon, at Ramah, and personally sets him free.",
      "Then a Babylonian captain says something no king of Judah ever said to Jeremiah. The LORD thy God pronounced this evil, and now he hath done it, because ye have sinned against the LORD. The enemy understands the message better than the people who heard it their whole lives.",
      "He gives Jeremiah an actual choice. Come to Babylon and I will look well unto thee, or stay. All the land is before thee: whither it seemeth good and convenient for thee to go, thither go.",
      "Jeremiah chooses to stay. He goes to Gedaliah at Mizpah and settles in among whatever is left of his own people.",
    ]),
    g(40, 7, 16, [
      "Word gets out that Babylon has left a governor over what is left of the land, and the scattered captains come in to Gedaliah at Mizpah to see for themselves.",
      "Gedaliah tells them exactly what to do. Fear not to serve the Chaldeans: dwell in the land, and serve the king of Babylon, and it shall be well with you. Go back to your towns. Gather the wine and the fruit and the oil, and live.",
      "Jews scattered in Moab, Ammon, and Edom hear the same news and start coming home, gathering in wine and summer fruit in abundance. For a moment it actually looks like recovery.",
      "Then Johanan warns Gedaliah, privately, that the king of Ammon has sent a man named Ishmael to kill him, and offers to deal with it quietly so no one even knows. Gedaliah refuses to believe a word of it. Thou speakest falsely of Ishmael.",
    ]),
    g(41, 1, 10, [
      "Ishmael comes to Mizpah with ten men, sits down and eats bread with Gedaliah at his own table, then gets up and kills him with the sword. The governor Babylon trusted, and the warning he refused to hear, both end at the same meal.",
      "The next day, before word has even gotten out, eighty men arrive from the north, mourning, beards shaved and clothes torn, carrying offerings for the temple. Ishmael goes out weeping to meet them, which is the only reason they follow him inside.",
      "He slaughters them into an old pit that King Asa dug generations earlier, sparing only ten who bargain for their lives with stores of wheat and barley and oil hidden in a field. A grief offering walks straight into a massacre.",
      "Then he rounds up everyone left at Mizpah, including the king's own daughters, and starts marching them toward Ammon.",
    ]),
    g(41, 11, 18, [
      "Johanan and the other captains hear what happened and go after him, catching up at the great waters in Gibeon.",
      "The moment the captives see Johanan, they turn and run to him instead. Ishmael slips away with only eight men left, and disappears into Ammon.",
      "So Johanan is left holding the whole rescued remnant. Soldiers, women, children. And the fear that takes over is not about Ishmael anymore. It is about what Babylon will do once they hear their handpicked governor is dead.",
      "They start moving toward Egypt, stopping to camp near Bethlehem, running from Babylon's revenge instead of trusting the God who already told them what to do.",
    ]),
    g(42, 1, 6, [
      "Johanan, the captains, and the people, small and great together, come to Jeremiah and ask him to pray for them, to show them the way they should walk and the thing they should do.",
      "Jeremiah agrees to bring it to God.",
      "And they make a vow before he has even asked. The LORD be a true and faithful witness between us, if we do not even according to all things for the which the LORD thy God shall send thee to us. Whether it be good or evil, we will obey.",
      "It sounds like real surrender. Watch what happens the moment the answer actually arrives.",
    ]),
    g(42, 7, 22, [
      "Ten days later the answer comes, and it could not be plainer. Stay in this land, and I will build you and not pull you down. I am with you to save you and deliver you from the king of Babylon, of whom you are afraid.",
      "Then the other half of it. If you say, we will not dwell in this land, and go instead into Egypt where you think you will see no war and feel no hunger — the sword you are running from will find you there, and the famine will follow you the whole way, and you will die in the place you ran to for safety.",
      "Then Jeremiah says the thing they do not want to hear about themselves. Ye dissembled in your hearts, when ye sent me unto the LORD your God, saying, Pray for us. He is not guessing. He knows they had already decided.",
      "They asked for a word with their minds already made up to ignore it if they did not like it. That is the whole chapter, and it is most of this book. Not that God stayed silent. That people asked for an answer they never intended to obey.",
    ]),
  ],
  closing: [
    ["So that is Day 231.", 700],
    ["A governor who wanted peace, murdered at his own dinner table by the man he refused to believe was dangerous.", 800],
    ["Eighty mourners walking straight into a pit because someone met them with tears instead of a sword.", 800],
    ["And a remnant that begged God for direction, swore to obey whatever He said, and then did the opposite the moment they did not like the answer.", 850],
    ["God's actual offer was staggering. Stay, and I will build you, not tear you down.", 800],
    ["They chose Egypt instead, running from a sword by walking straight toward it.", 800],
    ["Tomorrow, Jeremiah 43 through 45. That choice plays out, and Jeremiah does not stop speaking.", 850],
    ["For now, sit with the vow they broke before God even answered it.", 800],
    ["Whether it be good or evil, we will obey.", 750],
    ["They meant it right up until it cost them something.", 1200],
  ],
};
