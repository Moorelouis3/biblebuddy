import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 361, written to the Day 1 standard.
 *
 * Revelation 8-10: the seventh seal opens into silence, then seven trumpets,
 * four of them landing fast, a fifth loosing locusts from the pit, a sixth
 * loosing an army at the Euphrates, and then a pause while John eats a
 * scroll that is sweet going down and bitter once it settles. Six blocks.
 */

const rev = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Revelation ${chapter}:${startVerse}-${endVerse}`,
  book: "revelation",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 361,
  title: "Trumpets and the Little Scroll",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 361.", 700],
    ["Silence in heaven, and then seven trumpets start sounding, one at a time, and each one breaks something.", 800],
    ["Fire, a burning mountain, a poisoned river, a sky gone dark. Then locusts that do not even come to kill.", 850],
    ["In the middle of all of it, John is handed a small scroll and told to eat it.", 900],
    ["Revelation 8 through 10.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    rev(8, 1, 6, [
      "When the seventh seal breaks open, heaven does not explode. It goes quiet. Silence, for about half an hour, before anything else happens.",
      "An angel stands at the altar with a golden censer, and the smoke of incense rises up mixed with the prayers of God's people, straight up in front of the throne.",
      "Then that same angel fills the censer with fire off that altar and throws it down to the earth. Thunder, lightning, and an earthquake follow it down.",
      "The prayers go up first. The judgment comes down second. That order is not an accident.",
    ]),
    rev(8, 7, 13, [
      "The first angel sounds, and hail and fire mixed with blood fall, and a third of the trees and all the green grass burn up.",
      "The second angel sounds, and something like a mountain on fire is thrown into the sea, and a third of the sea turns to blood, killing a third of everything living in it.",
      "The third angel sounds, and a star called Wormwood falls and poisons a third of the rivers and springs. People die from water that used to keep them alive.",
      "The fourth angel sounds, and a third of the sun, moon, and stars go dark. Then an angel flies overhead shouting one word three times. Woe, woe, woe. The worst three trumpets are still coming.",
    ]),
    rev(9, 1, 12, [
      "The fifth angel sounds, and a star falls to open the bottomless pit, and smoke pours out of it like a furnace, thick enough to blot out the sun.",
      "Out of that smoke come locusts that act nothing like locusts. They are told to leave the grass and the trees alone and go only after people who do not carry God's seal.",
      "They cannot kill. They can only torment, like a scorpion sting, for five months, and Revelation says people will want to die during those months, and death will not come.",
      "These locusts have a king, the angel of the pit, and his name is given twice, in Hebrew and in Greek. Abaddon. Apollyon. Destruction, whichever language you say it in.",
    ]),
    rev(9, 13, 21, [
      "The sixth angel sounds, and a voice from the golden altar tells him to release four angels bound at the Euphrates, kept ready for this exact hour, day, month, and year.",
      "They lead an army of two hundred million, and a third of mankind dies from fire, smoke, and brimstone pouring out of the horses' mouths.",
      "That is a third of every person alive, gone in one trumpet, and Revelation does not slow down to grieve it. It just keeps counting.",
      "And the survivors do not repent. Not of worshipping idols that cannot see, hear, or walk. Not of murder, sorcery, sexual sin, or theft. Judgment this size did not soften a single heart.",
    ]),
    rev(10, 1, 7, [
      "A mighty angel comes down wrapped in a cloud, a rainbow over his head, face like the sun, feet like pillars of fire, holding a little scroll open in his hand.",
      "He plants one foot on the sea and one on the land and shouts like a lion roaring, and seven thunders answer him.",
      "John starts to write down what the thunders said, and a voice from heaven stops him. Seal it up. Some things get shown and never explained.",
      "Then the angel raises his hand and swears there will be no more delay. When the seventh trumpet sounds, the mystery of God finishes exactly the way he told the prophets it would.",
    ]),
    rev(10, 8, 11, [
      "The voice tells John to go take the little scroll from the angel's hand, and the angel tells him to eat it.",
      "It will be sweet in your mouth, he says, and bitter in your stomach. John eats it, and both halves of that come true, in that order.",
      "Sweet going down, because it is God's word. Bitter once it settles, because of what that word says is coming.",
      "Then he is told what the scroll was for. You must prophesy again, about many peoples, nations, languages, and kings. Taking it in was never the end of the assignment.",
    ]),
  ],
  closing: [
    ["So that's Day 361.", 700],
    ["Seven trumpets, and by the sixth one, a third of the earth is burned, a third of the sea is dead, and a third of mankind is gone.", 850],
    ["Every judgment in this chapter starts at the same altar the prayers went up from.", 800],
    ["The locusts cannot even kill. They can only make people wish they could die, which might be worse.", 850],
    ["And after all of that, humanity still does not repent. Not once. That is its own kind of judgment.", 850],
    ["Then John eats a scroll that is sweet going in and bitter once it is down, and is told the job is not over. Prophesy again.", 850],
    ["Tomorrow, Revelation 11 through 13. Two witnesses, a dragon, and a beast out of the sea.", 850],
    ["For now, hold on to that scroll.", 750],
    ["Sweet in the mouth.", 700],
    ["Bitter in the stomach.", 1200],
  ],
};
