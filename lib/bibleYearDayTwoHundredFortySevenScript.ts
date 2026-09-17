import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 247, written to the Day 1 standard.
 *
 * Ezekiel 31-33 is a heavier reading - a felled cedar, a dragon on a tour of
 * a crowded grave, then Ezekiel's whole assignment changes into a watchman's.
 * Seven blocks, each kept inside its own chapter, consolidated to keep the
 * runtime in line with a three-chapter day.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 247,
  title: "Watchman, Judgment, and Accountability",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 247. One more tree, one more fall, and then Ezekiel's whole job changes.", 750],
    ["Pharaoh gets compared to a cedar so tall that even Eden's own trees were jealous of it. You already know where this is going.", 800],
    ["Then the dragon from a few days ago shows back up, caught in a net this time, on a tour of a very crowded grave.", 800],
    ["And after all of it, God turns to Ezekiel and says: you are a watchman now. Somebody's life is on your silence.", 850],
    ["We are in Ezekiel 31 through 33.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(31, 1, 18, [
      "Ezekiel asks Pharaoh a question before answering it for him. Whom art thou like in thy greatness? Then reaches for Assyria, a cedar so tall that all the fowls of heaven made their nests in his boughs, and under his shadow dwelt all great nations.",
      "Even the cedars in the garden of God could not hide him. Eden's own trees envied this one. But notice the root of it - his root was by great waters. The greatness was watered, not earned.",
      "Because thou hast lifted up thyself in height... his branches are fallen, and all the people of the earth are gone down from his shadow, and have left him. The shade everyone depended on just disappears, and nobody stays to mourn it.",
      "And the last line removes any doubt which tree this really is. This is Pharaoh and all his multitude, saith the Lord GOD. Egypt just watched its own funeral, dressed up as someone else's.",
    ]),
    ez(32, 1, 10, [
      "The tree is gone. Now the picture changes completely - thou art as a whale in the seas... troubledst the waters with thy feet, and fouledst their rivers. Not majestic anymore. A predator that ruins its own water just by moving through it.",
      "So God fishes again, the way He did back in chapter 29. I will spread out my net over thee with a company of many people. Not one nation this time. Many, working together to haul him up.",
      "Then he is left exactly where the earlier dragon oracle left him. Cast forth upon the open field... the fowls of the heaven remain upon thee. The same ending, because it is the same pride.",
      "And this time the sky itself reacts. I will cover the heaven, and make the stars thereof dark... the moon shall not give her light. Egypt's fall is written as big as creation itself going dark.",
    ]),
    ez(32, 11, 16, [
      "The sword of the king of Babylon shall come upon thee. No more parable. A name, an army, a direct sentence.",
      "By the swords of the mighty will I cause thy multitude to fall - and then a strange kind of quiet afterward. The rivers shall run like oil, because there is finally no one left to trouble the water.",
      "Then shall they know that I am the LORD runs through here too, same as the last two chapters. Whatever else this book is doing, it keeps circling back to that one line.",
      "The daughters of the nations shall lament her, even for Egypt, and for all her multitude. Even the funeral song is communal. Egypt does not grieve alone.",
    ]),
    ez(32, 17, 32, [
      "Ezekiel takes Pharaoh on a tour of the grave, and it is crowded. Asshur is there and all her company... Elam and all her multitude... Meshech, Tubal, and all her multitude. Empire after empire, already down there waiting.",
      "Every one of them gets the same three words attached. Slain by the sword. Terror that used to reach whole nations, reduced to one repeated line.",
      "And there is a detail that stings worse than the sword did. They have laid their swords under their heads, but their iniquities shall be upon their bones. Even buried with their weapons, they cannot be buried with their guilt.",
      "Pharaoh shall see them, and shall be comforted over all his multitude. Not comfort like healing. Comfort like finally admitting misery loves company. He is not special. Everyone he ever feared is already there.",
    ]),
    ez(33, 1, 20, [
      "Ezekiel gets a new job description, built on a picture everyone in that room already understood. A city posts a watchman. He sees the sword coming. He blows the trumpet.",
      "If he blows it and people ignore it, his blood shall be upon his own head. But if the watchman sees it and stays silent, his blood will I require at the watchman's hand. The warning is the whole job. Nothing else.",
      "Then God says why He even bothers warning anyone. As I live... I have no pleasure in the death of the wicked; but that the wicked turn from his way and live. Not eager to punish. Working to avoid it.",
      "And He closes the loophole both ways. The righteousness of the righteous shall not deliver him... none of his sins that he hath committed shall be mentioned unto him. No one coasts on an old record, good or bad. Today's choice is what gets judged.",
    ]),
    ez(33, 21, 33, [
      "One that had escaped out of Jerusalem came unto me, saying, The city is smitten. Everything Ezekiel had been warning about for years finally arrives as one plain sentence from a refugee.",
      "And the handful left in the ruins are already rewriting the story. Abraham was one, and he inherited the land: but we are many; the land is given us for inheritance. Survival gets mistaken for merit.",
      "God answers with exactly what they are still doing. Ye eat with the blood... ye defile every one his neighbour's wife: and shall ye possess the land? Same sins that emptied the land the first time, spoken by the ones standing in the wreckage.",
      "Then the chapter turns on Ezekiel himself. Thou art unto them as a very lovely song... they hear thy words, but they do them not. They love how he sounds. They just will not do what he says - until the day it happens, and then they will know a prophet has been among them.",
    ]),
  ],
  closing: [
    ["So that is Day 247.", 700],
    ["Assyria was a cedar so tall every nation nested in its shade - until pride cut it down, and Pharaoh got handed the same story with his own name stapled to the end.", 800],
    ["Then Pharaoh becomes a sea monster this time, netted, dumped in a field, and given a tour of a grave already full of empires who thought they were different.", 850],
    ["Asshur. Elam. Meshech and Tubal. Edom. Every sword laid under every head, and every iniquity still resting on the bones underneath it.", 800],
    ["And then Ezekiel gets handed the watchman's job. Blow the trumpet, or the silence is yours to answer for.", 850],
    ["God says the quiet part plainly. He takes no pleasure in anyone's death. He just wants the turn.", 800],
    ["By the end of the chapter, Jerusalem has actually fallen, and the survivors are already rewriting why they still deserve to be standing there.", 850],
    ["Tomorrow, Ezekiel 34 through 36. Shepherds get judged, and God promises Israel something better than any of them ever gave.", 850],
    ["For now, sit with what God told His own watchman.", 750],
    ["I have no pleasure in the death of the wicked.", 1200],
  ],
};
