import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 210, written to the Day 1 standard.
 *
 * Isaiah 43-45 pivots from argument to proof: God names Cyrus by name more
 * than a century before his birth, framed on both sides by the idol satire
 * (44:9-20) and the widening invitation to "all the ends of the earth"
 * (45:22). Seven blocks to keep the runtime in line with a dense, three-
 * chapter reading.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 210,
  title: "God Redeems and Names Cyrus",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 210.", 700],
    ["Isaiah just spent three chapters saying no idol can predict anything. Today God does the opposite. He names a king before that king is even born.", 850],
    ["In between, there's a workshop scene that might be the most pointed satire in the whole Bible - a man burns half a log for supper and bows down to the other half.", 850],
    ["And by the end, God says every knee will bow to Him. Not just Israel's.", 800],
    ["We are in Isaiah 43, 44, and 45.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(43, 1, 13, [
      "Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine. Not a general blessing. A name spoken directly, the way you'd claim something that already belongs to you.",
      "The promise isn't rescue from trouble. It's presence inside it. When thou passest through the waters, I will be with thee, and when thou walkest through the fire, thou shalt not be burned. Not around it. Through it.",
      "Then God calls His own people as witnesses, the blind people that have eyes and the deaf that have ears, put on the stand for what they've actually seen Him do.",
      "Before me there was no God formed, neither shall there be after me. Every other claim on the throne has to fit inside a timeline. His doesn't.",
    ]),
    g(43, 14, 28, [
      "I am the LORD, your Holy One, the creator of Israel, your King, which maketh a way in the sea, and a path in the mighty waters. He's not just recalling the Exodus. He's about to do a new one.",
      "Remember ye not the former things, neither consider the things of old. Behold, I will do a new thing; now it shall spring forth. God asks Israel to stop replaying the last miracle long enough to notice this one.",
      "Then the tone flips hard. Thou hast not called upon me, O Jacob; but thou hast been weary of me, O Israel. He lists exactly what they didn't bring Him, sacrifices skipped, offerings withheld.",
      "And still: I, even I, am he that blotteth out thy transgressions for mine own sake, and will not remember thy sins. The forgiveness is announced before any repentance is mentioned. That's not the usual order.",
    ]),
    g(44, 1, 8, [
      "Fear not, O Jacob, my servant. Same word as before, now paired with a flood image. I will pour water upon him that is thirsty, and floods upon the dry ground; I will pour my spirit upon thy seed.",
      "I am the first, and I am the last; and beside me there is no God. He says it flatly, no argument attached, because by now He's already made the argument three times over.",
      "Fear ye not, neither be afraid: have not I told thee from that time, and have declared it? Is there a God beside me? He's daring anyone in the room to name a rival with an actual track record.",
      "Ye are even my witnesses. Same word as chapter 43. Not spectators. People called to testify, under their own name, to what they've watched happen.",
    ]),
    g(44, 9, 20, [
      "Then the scene turns into a workshop. The smith worketh in the coals... yea, he is hungry, and his strength faileth: he drinketh no water, and is faint. Exhausted, making something that will end up needing him more than he needs it.",
      "A carpenter chooses a tree, plants an ash and lets the rain nourish it, then cuts it down and splits it in two. Half becomes firewood to warm himself and bake bread. The other half becomes a god he falls down before.",
      "He roasteth roast, and is satisfied... and the residue thereof he maketh a god, even his graven image. Same log. One half feeds him supper, the other half he prays to for rescue.",
      "None considereth in his heart... shall I fall down to the stock of a tree? Isaiah doesn't argue theology here. He just describes the process slowly enough that the absurdity makes its own case.",
    ]),
    g(44, 21, 28, [
      "Remember these, O Jacob and Israel; for thou art my servant... thou shalt not be forgotten of me. Right after the workshop scene, God says the opposite is true of Him. He remembers.",
      "I have blotted out, as a thick cloud, thy transgressions... return unto me; for I have redeemed thee. The debt is already handled. The returning is the response to that, not the price of it.",
      "Sing, O ye heavens; for the LORD hath done it... break forth into singing, ye mountains. Creation itself gets called to celebrate a redemption Isaiah's own generation hasn't lived to see yet.",
      "Then the line that stops you. That saith of Cyrus, He is my shepherd, and shall perform all my pleasure... even saying to Jerusalem, Thou shalt be built. Cyrus wouldn't be born for more than a century. Isaiah writes his name down anyway.",
    ]),
    g(45, 1, 13, [
      "Thus saith the LORD to his anointed, to Cyrus... I will loose the loins of kings, to open before him the two leaved gates; and the gates shall not be shut. God calls a pagan king His anointed and promises to open real city gates ahead of his army.",
      "I girded thee, though thou hast not known me. Cyrus never worshipped Israel's God. He's used anyway, named, for Jacob my servant's sake, and Israel mine elect.",
      "I form the light, and create darkness: I make peace, and create evil: I the LORD do all these things. Not a claim that God causes sin. A claim that nothing, light or dark, peace or disaster, sits outside His authority.",
      "Woe unto him that striveth with his Maker! Shall the clay say to him that fashioneth it, What makest thou? After naming a king who never asked to be used this way, God turns to anyone tempted to argue with how He runs things.",
    ]),
    g(45, 14, 25, [
      "Foreign nations are pictured coming to Israel in chains, saying, Surely God is in thee; and there is none else. Not conquest. Recognition, finally arriving from the outside.",
      "Verily thou art a God that hidest thyself, O God of Israel, the Saviour. Even the confession admits He's often hard to see. That doesn't cancel out everything else just said about Him.",
      "Look unto me, and be ye saved, all the ends of the earth: for I am God, and there is none else. The invitation widens here, past Israel. Every end of the earth gets the same offer.",
      "I have sworn by myself... that unto me every knee shall bow, every tongue shall swear. A line Paul later quotes about Jesus. Isaiah didn't know that yet. He just wrote down what God swore on Himself.",
    ]),
  ],
  closing: [
    ["So that is Day 210.", 700],
    ["Three chapters, one target from every angle. I am the LORD, and there is none else.", 750],
    ["An idol gets built from a scrap of the same log that cooked someone's dinner. That's what Isaiah lines up against a God who names a king before that king is even born.", 850],
    ["Cyrus never knew Israel's God. He's used anyway, called by name, for a people he'd never met.", 800],
    ["And by the end, the promise stops being just for Jacob. Look unto me, and be ye saved, all the ends of the earth.", 800],
    ["Every knee, every tongue. Paul later says that's about Jesus. Isaiah wrote it down first.", 800],
    ["Tomorrow, Isaiah 46 through 48. The idols get carried on tired shoulders, and God carries His people instead.", 850],
    ["For now, remember the log.", 800],
    ["Half firewood, half god, all wood.", 750],
    ["And remember who actually carries who.", 1200],
  ],
};
