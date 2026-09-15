import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 215, written to the Day 1 standard.
 *
 * Isaiah 58-60: the fast God actually chose versus the one people perform,
 * then a full confession of sin so complete God's own arm brings salvation
 * because no intercessor stood up, closing on a forsaken city told to rise
 * and shine. Seven blocks across three chapters (57 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 215,
  title: "True Worship and Future Glory",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 215.", 700],
    ["Yesterday God asked who was watching the flock. Today he asks what your fasting actually is.", 800],
    ["Sackcloth and ashes on one side. Feeding somebody hungry on the other. Only one of those gets called a fast he chose.", 850],
    ["Then two chapters later a whole city that was forsaken gets told to get up, because the light on it isn't the sun anymore.", 850],
    ["We are in Isaiah 58, 59, and 60.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(58, 1, 7, [
      "Cry aloud, spare not, lift up thy voice like a trumpet, and shew my people their transgression. Not a gentle correction. He tells the prophet to shout it.",
      "Wherefore have we fasted, say they, and thou seest not?... Behold, in the day of your fast ye find pleasure, and exact all your labours. Their own complaint, answered by describing what they were actually doing on fast days.",
      "Is it such a fast that I have chosen? a day for a man to afflict his soul?... is it to bow down his head as a bulrush? He describes their whole ritual, then asks if that's really what he asked for.",
      "Is not this the fast that I have chosen? to loose the bands of wickedness... let the oppressed go free... deal thy bread to the hungry... cover him... hide not thyself from thine own flesh. The real fast, and it never once mentions skipping a meal.",
    ]),
    g(58, 8, 14, [
      "Then shall thy light break forth as the morning... thou shalt cry, and he shall say, Here I am. The prayers that went unanswered a few verses back get answered here, once the fasting turns into justice.",
      "If thou draw out thy soul to the hungry... then shall thy light rise in obscurity, and thy darkness be as the noonday. Feeding someone else is what turns your own darkness to noon.",
      "Thou shalt be called, The repairer of the breach, The restorer of paths to dwell in. Not a title for God here. A title for the person who does the verses just before it.",
      "If thou turn away thy foot from the sabbath... call the sabbath a delight... I will cause thee to ride upon the high places of the earth. The sabbath gets the same treatment as the fast. Stop performing it. Start delighting in it.",
    ]),
    g(59, 1, 8, [
      "Behold, the LORD'S hand is not shortened, that it cannot save; neither his ear heavy, that it cannot hear. He opens by ruling out the excuse before anyone can reach for it.",
      "Your iniquities have separated between you and your God, and your sins have hid his face from you, that he will not hear. The silence people blamed on God gets traced straight back to them.",
      "Your hands are defiled with blood... your lips have spoken lies... they hatch cockatrice' eggs, and weave the spider's web. Two images for the same thing. What they build only holds poison or falls apart.",
      "The way of peace they know not... whosoever goeth therein shall not know peace. Not punishment handed down from outside. Just what those roads already lead to.",
    ]),
    g(59, 9, 15, [
      "Therefore is judgment far from us... we wait for light, but behold obscurity. The people finally speak, and admit the darkness is theirs.",
      "We grope for the wall like the blind... we stumble at noonday as in the night. Broad daylight, and still blind.",
      "Our transgressions are multiplied before thee, and our sins testify against us... we know them. No excuse offered this time. Just the list, owned.",
      "Truth is fallen in the street, and equity cannot enter... he that departeth from evil maketh himself a prey. Refusing evil doesn't even protect you anymore in a place this broken.",
    ]),
    g(59, 16, 21, [
      "He saw that there was no man, and wondered that there was no intercessor: therefore his arm brought salvation unto him. Nobody stepped up to stand in the gap, so he stood in it himself.",
      "He put on righteousness as a breastplate, and an helmet of salvation... the garments of vengeance for clothing. God arming himself, in armor language, because no one else would.",
      "So shall they fear the name of the LORD from the west... the Spirit of the LORD shall lift up a standard against him. Even the enemy flood gets met by a standard raised against it.",
      "The Redeemer shall come to Zion, and unto them that turn from transgression in Jacob... my spirit... my words... shall not depart out of thy mouth... from henceforth and for ever. A promise that reaches past everyone listening, into children not born yet.",
    ]),
    g(60, 1, 14, [
      "Arise, shine; for thy light is come, and the glory of the LORD is risen upon thee. Not build the light yourself. Just get up, because it's already here.",
      "The Gentiles shall come to thy light, and kings to the brightness of thy rising... thy sons shall come from far. The city once told to shine now watches the whole world walk toward it.",
      "The multitude of camels shall cover thee... they shall bring gold and incense; and they shall shew forth the praises of the LORD. Trade routes turned into a procession of worship.",
      "The sons of strangers shall build up thy walls... for in my wrath I smote thee, but in my favour have I had mercy on thee. The very city that was struck is rebuilt by the outsiders it used to fear.",
    ]),
    g(60, 15, 22, [
      "Whereas thou hast been forsaken and hated, so that no man went through thee, I will make thee an eternal excellency, a joy of many generations. Named honestly first. Forsaken, hated, empty streets. Then reversed.",
      "Violence shall no more be heard in thy land... thou shalt call thy walls Salvation, and thy gates Praise. Even the walls and gates get new names to match what's true now.",
      "The sun shall be no more thy light by day... the LORD shall be unto thee an everlasting light... the days of thy mourning shall be ended. Not a brighter sun. A different light source entirely, one mourning can't outlast.",
      "A little one shall become a thousand, and a small one a strong nation: I the LORD will hasten it in his time. The chapter ends on speed, after everything before it took generations to arrive.",
    ]),
  ],
  closing: [
    ["So that is Day 215.", 700],
    ["Is not this the fast that I have chosen? Loose the bands of wickedness. Feed the hungry. Cover the naked. Nothing about skipping a meal.", 800],
    ["Then a whole confession. We grope for the wall like the blind. We stumble at noonday as in the night. Broad daylight, and still blind.", 800],
    ["He saw that there was no man, and wondered that there was no intercessor. So his own arm brought salvation, because nobody else would stand in the gap.", 850],
    ["And a city that was forsaken and hated, with nobody walking its streets, gets told arise, shine, because its light has come.", 850],
    ["Tomorrow, Isaiah 61 through 63. Good news, and a day of vengeance in the very same breath.", 850],
    ["For now, sit with the line that answers the whole day.", 800],
    ["Then shalt thou call, and the LORD shall answer.", 800],
    ["Thou shalt cry, and he shall say, Here I am.", 1200],
  ],
};
