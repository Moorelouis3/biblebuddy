import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 365, written to the Day 1 standard.
 *
 * Revelation 20-22: Satan bound and then destroyed, the great white throne,
 * and then the new heaven, new earth, and the city that comes down to live
 * with people. Seven blocks, closing the entire 365-day plan.
 */

const rev = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Revelation ${chapter}:${startVerse}-${endVerse}`,
  book: "revelation",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 365,
  title: "Final Judgment and New Creation",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 365. The last day.", 750],
    ["Satan goes into the lake of fire. Every book gets opened in front of a great white throne. And then heaven comes down and moves in with people.", 900],
    ["The garden you started this whole year in gets shut behind two people who cannot go back. The city you finish it in has a gate that never shuts.", 850],
    ["This is Revelation 20 through 22. The last three chapters in the whole Bible.", 800],
    ["A judgment, a wedding city, and a river.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    rev(20, 1, 6, [
      "An angel comes down with the key to the bottomless pit and a great chain, lays hold of the dragon, that old serpent, the Devil and Satan, and binds him a thousand years.",
      "Not destroyed. Bound. Shut in and sealed so he cannot deceive the nations again until the thousand years are finished.",
      "Then thrones, and people given the right to judge, the souls of everyone killed for holding to the word of God and refusing the mark of the beast. They live and reign with Christ a thousand years. This, John says, is the first resurrection.",
      "Blessed and holy is the one who has a part in it. The second death has no power over them.",
    ]),
    rev(20, 7, 15, [
      "When the thousand years end, Satan is let loose one more time, and goes straight back to what he has always done. He deceives the nations, called here Gog and Magog, and gathers them for war, numberless as sand on a shore.",
      "They surround the camp of God's people and the beloved city, and fire falls from heaven and ends it before a single blow lands. The one who did the deceiving is thrown into the lake of fire with the beast and the false prophet, tormented day and night forever.",
      "Then a great white throne, and the one sitting on it, and earth and sky simply have no place left to stand.",
      "Books are opened, and one more book, the book of life. The dead are judged by what is written. Anyone not found in that book goes into the lake of fire. Revelation calls it the second death.",
    ]),
    rev(21, 1, 8, [
      "John sees a new heaven and a new earth, because the first ones have passed away, and the sea, which this whole book has used as a picture of chaos, is gone too.",
      "The holy city, new Jerusalem, comes down out of heaven from God, dressed like a bride. And a loud voice from the throne says the line the whole Bible has been walking toward. Behold, the tabernacle of God is with men, and he will dwell with them.",
      "He will wipe away every tear. No more death, sorrow, crying, or pain, because the old order of things has passed away. Behold, I make all things new, he says, and tells John to write it down, because it is faithful and true.",
      "Then a warning in the same breath as the promise. Water from the fountain of life is free to the thirsty. But the cowardly, the unbelieving, and everyone who never let go of what these chapters have been condemning, get the lake of fire too. The invitation and the warning are both real.",
    ]),
    rev(21, 9, 21, [
      "An angel carries John away to show him the bride, the Lamb's wife, and what he sees is a city. The holy city, coming down out of heaven, glowing like a rare jewel, jasper clear as crystal.",
      "It has a great high wall with twelve gates, named for the twelve tribes of Israel, and twelve foundations, named for the twelve apostles of the Lamb. The oldest story and the newest one, carved into the same wall.",
      "It is measured as a perfect cube, twelve thousand furlongs on every side, the same shape as the Most Holy Place in the old temple, except now the whole city is that room.",
      "The wall is jasper, the city itself pure gold, clear as glass, and each of the twelve gates is a single pearl. Everything anyone has ever fought a war over is just building material here.",
    ]),
    rev(21, 22, 27, [
      "John looks for the temple and there is not one. The Lord God Almighty and the Lamb are the temple. Nothing stands between the people and God anymore, because nothing needs to.",
      "No sun, no moon, because the glory of God lights it and the Lamb is its lamp. The nations of those who are saved walk by that light, and bring their honor into it.",
      "Its gates are never shut, because there is no night there, and nothing left to shut them against.",
      "But not everyone walks in. Nothing that defiles enters, nor anyone who does what is detestable or false. Only those written in the Lamb's book of life. The gate stays open, and it still matters who you are when you reach it.",
    ]),
    rev(22, 1, 5, [
      "The angel shows John a river, clear as crystal, coming out of the throne of God and of the Lamb. Down the middle of the street stands the tree of life, bearing twelve kinds of fruit, one for every month.",
      "Its leaves are for the healing of the nations. The last time a tree like this showed up in the Bible, two people were cut off from it by a sword of flame. Here it stands wide open, and its leaves are medicine, not a weapon.",
      "There is no more curse. The one thing pronounced over the ground back in Genesis is simply gone. God's throne is there, his servants serve him, and they see his face. His name is on their foreheads instead of a mark from the beast.",
      "No night, no need of a lamp or the sun, because the Lord God gives them light, and they reign forever and ever.",
    ]),
    rev(22, 6, 21, [
      "The angel tells John these words are faithful and true, and that God sent him to show his servants what must shortly happen. John is so overwhelmed he falls down to worship the angel, and gets stopped cold a second time in this book. Do not. Worship God.",
      "Then Jesus speaks directly. Behold, I come quickly. Blessed is the one who keeps the words of this prophecy. And unlike Daniel, John is told not to seal up this book, because the time is near.",
      "He calls himself Alpha and Omega, the beginning and the end, and pronounces one blessing on everyone who washes their robes, so they have the right to the tree of life and can enter the city through the gates.",
      "The Spirit and the bride both say, Come. Let the one who hears say, Come. Let the thirsty come. Whoever wants it, let them take the water of life freely. Then a warning not to add to this book or take away from it, one last Behold, I come quickly, and the last line in the whole Bible. The grace of the Lord Jesus be with you all.",
    ]),
  ],
  closing: [
    ["So that is Day 365.", 700],
    ["A judgment nobody could talk their way out of. A city with your name already carved into a gate. And a tree that used to be guarded by a sword, now planted in the middle of the street with its leaves reaching over the wall.", 900],
    ["Genesis started with two people locked out of a garden because of what they touched. Revelation ends with a whole city thrown open because of what the Lamb did.", 850],
    ["Death itself, the last enemy this story ever names, goes into the lake of fire along with everything that ever served it.", 800],
    ["And the last words anyone speaks in the entire Bible are an invitation, not a warning. Let the one who is thirsty come. Let whoever wants it take the water of life freely.", 900],
    ["That is the whole story, front to back. God making a place for people, people wrecking it, and God building it back bigger than it was, with a door that never shuts.", 900],
    ["Three hundred sixty five days of Scripture come down to one line, said twice.", 800],
    ["I come quickly.", 750],
    ["Even so, come.", 1200],
  ],
};
