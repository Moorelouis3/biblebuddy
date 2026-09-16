import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 237, written to the Day 1 standard.
 *
 * A new prophet, a new book, same exile. Ezekiel opens with the strangest
 * vision in the Old Testament, then narrows fast into a call that is mostly
 * about how badly this is going to go. Six blocks across three chapters
 * (65 verses), no gaps.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 237,
  title: "Ezekiel Sees God's Glory",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 237. New book, new prophet, same river of exiles sitting in Babylon.", 750],
    ["Ezekiel is a priest with no temple to serve in. And one day, by a canal called Chebar, the sky opens.", 800],
    ["What he sees does not fit neatly into words. Wheels inside wheels. Wings. A throne made of fire.", 800],
    ["Then God hands him a job nobody would want, and tells him plainly how it is going to go.", 800],
    ["We are in Ezekiel 1 through 3.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(1, 1, 14, [
      "Ezekiel is a captive by the river Chebar when the heavens were opened, and I saw visions of God. A priest with no temple gets shown something bigger than any building could hold.",
      "Out of a whirlwind and a great cloud comes the likeness of four living creatures, each with four faces - a man, a lion, an ox, an eagle - and four wings. Nothing about this is small or tame.",
      "Their wings were joined one to another; they turned not when they went; they went every one straight forward. Whatever this is, it moves with total unity. No hesitation, no wrong turns.",
      "And the living creatures ran and returned as the appearance of a flash of lightning. Ezekiel is reaching for the fastest, brightest thing he knows and it still barely covers it.",
    ]),
    ez(1, 15, 28, [
      "Beside the creatures, one wheel upon the earth, and their appearance was as it were a wheel in the middle of a wheel. A wheel that can move in any direction without turning - engineering no one on earth had.",
      "Their rings were full of eyes round about them four. And the spirit of the living creature was in the wheels. This entire structure is alive and it is watching. Nothing about it is mechanical or dead.",
      "Above it all, the likeness of a throne, as the appearance of a sapphire stone: and upon the likeness of the throne was the likeness as the appearance of a man above upon it. After twenty-six verses of creatures and wheels and fire, the vision finally arrives at a person seated above it.",
      "This was the appearance of the likeness of the glory of the LORD. And when I saw it, I fell upon my face. Ezekiel does not analyze it. He hits the ground. That is the only response the text records.",
    ]),
    ez(2, 1, 10, [
      "Then a voice: Son of man, stand upon thy feet, and I will speak unto thee. And the spirit entered into me... and set me upon my feet. God does not leave him face down. He puts him back up before He speaks.",
      "I send thee to the children of Israel, to a rebellious nation that hath rebelled against me. Not to a foreign people who might listen. To his own people, who already have a track record of not listening.",
      "Be not afraid of them, neither be afraid of their words, though briers and thorns be with thee, and thou dost dwell among scorpions. God warns him up front that this assignment will hurt before it tells him it will work.",
      "Then a hand holds out a scroll, written within and without, and there was written therein lamentations, and mourning, and woe. Before Ezekiel speaks a single word, he is shown exactly what kind of message this is going to be.",
    ]),
    ez(3, 1, 11, [
      "Son of man, eat that thou findest; eat this roll, and go speak unto the house of Israel. The message is not just handed to him. He has to take it into his own body first.",
      "Then did I eat it; and it was in my mouth as honey for sweetness. The scroll is full of lamentations and woe, and it still tastes sweet going down. Obeying God and carrying hard news are not opposites here.",
      "For thou art not sent to a people of a strange speech and of an hard language... Surely, had I sent thee to them, they would have hearkened unto thee. God tells him plainly that strangers would have listened faster than his own people will.",
      "So God does not send him unprepared. Behold, I have made thy face strong against their faces. As an adamant harder than flint have I made thy forehead. He is armored before he is sent, not after he gets hurt.",
    ]),
    ez(3, 12, 15, [
      "Then the spirit took me up, and I heard behind me a voice of a great rushing, saying, Blessed be the glory of the LORD from his place. The vision does not just end. It lifts him and carries him somewhere else entirely.",
      "So the spirit lifted me up, and took me away, and I went in bitterness, in the heat of my spirit; but the hand of the LORD was strong upon me. This is not a man who feels calm and ready. He is angry and overwhelmed, carried forward anyway.",
      "Then I came to them of the captivity at Tel-abib... and I sat where they sat, and remained there astonished among them seven days. Before he says one word of the message, he just sits with his own people in silence for a full week.",
      "That week matters. Even a prophet with a scroll from heaven needs time before he can open his mouth to the people he loves and tell them the truth.",
    ]),
    ez(3, 16, 27, [
      "After seven days, the word of the LORD came: Son of man, I have made thee a watchman unto the house of Israel... give them warning from me. A watchman's whole job is to see danger coming and say something before it arrives.",
      "When I say unto the wicked, Thou shalt surely die; and thou givest him not warning... his blood will I require at thine hand. If Ezekiel stays silent and someone dies unwarned, God holds the silence against him, not just the sin.",
      "But if thou warn the wicked, and he turn not from his wickedness... thou hast delivered thy soul. The responsibility is narrower than it sounds. Warn honestly, and what the other person does with it is no longer on him.",
      "Then, strangely, God says He will make Ezekiel's tongue cleave to the roof of his mouth, that thou shalt be dumb. The man just given the hardest speaking assignment in the book is about to go silent until God says otherwise.",
    ]),
  ],
  closing: [
    ["So that is Day 237.", 700],
    ["A vision so far outside ordinary language that all Ezekiel can do, at first, is fall on his face.", 800],
    ["Then God stands him up, hands him a scroll full of grief, and tells him it will taste like honey anyway.", 800],
    ["He is armored before he is sent. Face strong, forehead like flint. Not because the mission gets easier, but because he does not go out unprepared.", 850],
    ["And even a man carried by wind and glory still needs seven silent days before he can open his mouth.", 850],
    ["A watchman is not responsible for whether people listen. Only for whether he warned them.", 800],
    ["Tomorrow, Ezekiel 4 through 6. God has Ezekiel act out Jerusalem's coming siege with his own body.", 850],
    ["For now, sit with what happened the moment Ezekiel actually saw it.", 800],
    ["This was the appearance of the likeness of the glory of the LORD.", 750],
    ["And when I saw it, I fell upon my face.", 1200],
  ],
};
