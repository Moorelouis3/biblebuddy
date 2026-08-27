import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 11, written to the Day 1 standard.
 *
 * Genesis 28-29 is the turn of Jacob's story: he leaves home with nothing,
 * meets God in open country before he has repented of anything, and then has
 * his own trick played back on him in the dark. Six blocks, matching Day 10.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ELEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 11,
  title: "Jacob Meets God at Bethel",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 11. Jacob is running.", 750],
    ["He got the blessing. He also got a brother who wants him dead.", 800],
    ["So he leaves with nothing. No wives, no flocks, no servants. Just the road.", 800],
    ["And somewhere out in open country, with a stone under his head, God shows up.", 900],
    ["Not to correct him. Not yet.", 1000],
    ["We are in Genesis 28 and 29. A stairway, a vow, a well, and a wedding that goes very wrong.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(28, 1, 9, [
      "Isaac calls Jacob in and blesses him again. This time with his eyes open, and on purpose.",
      "Go to Paddan Aram. Find a wife from your mother's family. And take the blessing of Abraham with you.",
      "So what Jacob stole in the dark gets handed to him in daylight anyway. The promise was never actually at risk.",
      "And Esau, watching all this, goes and marries into Ishmael's family to try to please his parents. Still trying to earn a place in his own home.",
    ]),
    g(28, 10, 15, [
      "Jacob leaves Beersheba toward Haran, and when the sun goes down he stops in an empty place and puts a stone under his head.",
      "That detail is the whole picture. The heir of the promise, sleeping on the ground, with a rock for a pillow.",
      "And he dreams of a stairway set on the earth with the top of it reaching heaven, and angels going up and down on it.",
      "Then God stands above it and speaks. And listen to what He does not say. No rebuke. No conditions. I am with you. I will keep you wherever you go. I will not leave you until I have done what I promised.",
    ]),
    g(28, 16, 22, [
      "Jacob wakes up and says one of the most honest lines in Genesis. Surely the Lord is in this place, and I did not know it.",
      "He had been running for days through country he thought was empty. God had been there the whole time.",
      "So he takes the stone he slept on, stands it up, pours oil over it, and calls the place Bethel. House of God.",
      "Then he makes a vow, and it is very Jacob. If God will be with me, and keep me, and give me bread to eat and clothes to wear, then the Lord will be my God. Still negotiating. God had already promised all of it, for free.",
    ]),
    g(29, 1, 14, [
      "Jacob comes to a well with a heavy stone over the mouth of it, and shepherds sitting around waiting for everyone to gather before it can be moved.",
      "Then Rachel arrives with her father's sheep, and Jacob rolls that stone off by himself and waters the flock.",
      "And he kisses her, and lifts up his voice, and weeps. This is a man who has been alone a long way from home.",
      "Laban runs out to meet him. Surely you are my bone and my flesh. Which sounds warm. Watch what he does with it.",
    ]),
    g(29, 15, 30, [
      "Laban asks what his wages should be, and Jacob says seven years for Rachel. And Genesis says they seemed to him but a few days, for the love he had for her.",
      "Then the wedding night comes. And in the morning, behold, it was Leah.",
      "Sit with that. The man who dressed up as his brother to fool his blind father has now been fooled in the dark by a bride he could not see.",
      "And when he protests, Laban says the quiet part out loud. It is not done in our country to give the younger before the firstborn. The younger before the firstborn. Exactly what Jacob did to Esau, handed back to him by a stranger.",
    ]),
    g(29, 31, 35, [
      "And here Genesis does something you should not miss. It stops following Jacob and starts following Leah.",
      "When the Lord saw that Leah was hated, He opened her womb. God moves toward the one nobody chose.",
      "You can hear her whole marriage in the names she gives. Reuben, the Lord has looked on my affliction. Simeon, the Lord has heard that I am hated. Levi, now this time my husband will be joined to me.",
      "And then the fourth one. Judah. This time I will praise the Lord. She stops asking her husband to love her, and just praises God. And that is the son the Messiah comes through.",
    ]),
  ],
  closing: [
    ["So that is Day 11.", 700],
    ["A stone for a pillow, a stairway into heaven, and a wedding in the dark.", 700],
    ["Jacob spent his whole life grabbing at things he had already been promised.", 800],
    ["And the first thing God says to him, out in the middle of nowhere, is I am with you.", 800],
    ["Not once he has cleaned himself up. While he is still running from what he did.", 850],
    ["And Leah, unloved and unchosen, is the one God sees. Judah comes from her. So does Jesus.", 850],
    ["Tomorrow, Genesis 30 and 31. Jacob and Laban spend twenty years trying to outsmart each other.", 850],
    ["For now, sit with Jacob's line.", 800],
    ["Surely the Lord is in this place.", 750],
    ["And I did not know it.", 1200],
  ],
};
