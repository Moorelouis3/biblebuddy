import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 274, written to the Day 1 standard.
 *
 * Zechariah's night visions continue: a courtroom where the high priest
 * stands in filthy clothes with the accuser waiting, a lampstand that never
 * runs dry, and a flying scroll and a flying basket that carry sin itself
 * out of the land. Six blocks across Zechariah 3, 4, and 5.
 */

const zechariahThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 3:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const zechariahFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 4:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const zechariahFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 5:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 274,
  title: "Cleansing, Spirit, and Wickedness Removed",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 274. God interrupts a construction project with visions.", 800],
    ["First a courtroom, with the high priest standing in filthy clothes and the accuser waiting to pounce.", 800],
    ["Then a lampstand that never runs dry, and a scroll flying through the sky big enough to swallow a house.", 850],
    ["By the end, wickedness itself gets boxed up, weighted down, and shipped out of the country.", 850],
    ["We are in Zechariah 3 through 5.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    zechariahThree(1, 5, [
      "Joshua the high priest is standing before the angel of the Lord, and Satan is standing right beside him to resist him. This is a courtroom, and Joshua is the one on trial.",
      "And he is dressed for the part. Filthy garments. Whatever the accusation is, the clothes already look guilty.",
      "But God does not argue the case. He just rebukes Satan, because he has chosen Jerusalem. Is not this a brand plucked out of the fire. Already half burned, already rescued, not because Joshua earned it.",
      "So the filthy garments come off, and God says it himself. I have caused thine iniquity to pass from thee. Joshua does not clean himself up. Someone else does it to him, and then sets a clean turban on his head.",
    ]),
    zechariahThree(6, 10, [
      "Once he is clean, Joshua gets a charge, not a vacation. Walk in my ways, keep my charge, and you will judge my house and keep my courts. Grace put him back in the job, not out of it.",
      "God calls Joshua and the priests around him men wondered at. They are a living sign of something bigger coming. I will bring forth my servant the BRANCH.",
      "Then a stone with seven eyes, engraved by God's own hand, and a promise that lands hard. I will remove the iniquity of that land in one day. Not gradually. One day, one act, done.",
      "And after all that courtroom weight, the vision ends on the quietest picture in the chapter. Every man calling his neighbor under his own vine and fig tree. Ordinary peace, after the trial is over.",
    ]),
    zechariahFour(1, 7, [
      "The angel has to wake Zechariah up again, like a man being roused out of sleep, just to show him a lampstand of solid gold with seven lamps and two olive trees standing beside it.",
      "The trees feed the lamps straight through golden pipes. No priest has to keep refilling the oil by hand. The light runs on a supply nobody in the room controls.",
      "Zechariah asks what it means, and the answer is the line that outlives the whole book. This is the word of the Lord unto Zerubbabel, saying, not by might, nor by power, but by my spirit, saith the Lord of hosts.",
      "Then whatever mountain of opposition has been sitting in front of this rebuilding project gets addressed directly. Who art thou, O great mountain. Before Zerubbabel thou shalt become a plain. Spoken flat, not shouted.",
    ]),
    zechariahFour(8, 14, [
      "The hands of Zerubbabel have laid the foundation of this house, God says, and his hands shall also finish it. The man who started it gets to be the one who finishes it. That is the promise, plain.",
      "Then a question aimed straight at anyone standing there unimpressed. Who hath despised the day of small things? A modest foundation, next to Solomon's ruined temple, still counts. Small is not the same as unwatched.",
      "Zerubbabel will be seen holding the plumb line himself, and those watching are called the eyes of the Lord, which run to and fro through the whole earth. The small tool in his hand is connected to something that sees everything.",
      "Last, the two olive trees get named. The two anointed ones, that stand by the Lord of the whole earth. A king's line and a priest's line, feeding the same lamp, neither one running the show alone.",
    ]),
    zechariahFive(1, 4, [
      "Zechariah looks up and sees a flying scroll, twenty cubits by ten. The same measurements as the porch of Solomon's temple. This curse is sized to the house of God on purpose.",
      "This is the curse that goeth forth over the face of the whole earth, the angel says, and it names two specific sins. Everyone that stealeth, and everyone that sweareth falsely by my name.",
      "So the new temple does not exempt anyone standing near it. Grace just finished cleaning the high priest. This vision makes sure nobody reads that as sin no longer mattering.",
      "And the curse does not strike all at once. It enters the house of the guilty and remains there, and shall consume it with the timber thereof and the stones thereof. Sin left alone eats a house slowly, from the inside.",
    ]),
    zechariahFive(5, 11, [
      "Next comes an ephah, an ordinary grain basket, the kind used every day at the market. Except this one has a lid of lead, and something is sitting inside it.",
      "The angel opens it just enough to show Zechariah what it is. This is wickedness, he says, and pushes it back down and drops the lead weight on the mouth of it. Sealed, not destroyed. Held down.",
      "Then two women with wings like a stork lift the whole basket up between earth and heaven and carry it away. Wind under their wings, wickedness inside the box.",
      "Zechariah asks where they are taking it, and the answer closes a circle that started way back in Genesis. To build it an house in the land of Shinar. Babylon, the same ground Babel was built on. Wickedness is not destroyed here. It is sent home.",
    ]),
  ],
  closing: [
    ["So that is Day 274.", 700],
    ["A high priest stood in filthy clothes with the accuser waiting, and God did not argue the case. He just changed the clothes.", 800],
    ["A brand plucked out of the fire, Joshua is called. Rescued, then put right back to work.", 800],
    ["Then a lampstand that runs on oil nobody has to pour, and the line underneath it. Not by might, nor by power, but by my spirit.", 850],
    ["Zerubbabel gets told the mountain in front of him becomes a plain, and the hands that laid the foundation get to finish the job.", 850],
    ["Then the mood turns. A flying scroll sized to the temple itself, carrying a curse for thieves and liars. Grace was never a reason to stop caring what people do.", 850],
    ["And last, wickedness gets sealed under lead in a basket and flown out to Shinar. Sent back to where Babel started.", 850],
    ["Tomorrow, Zechariah 6 through 8. A king who is also a priest, and a city that finally gets called faithful.", 850],
    ["For now, hold on to the lampstand.", 800],
    ["Not by might, nor by power, but by my spirit.", 1200],
  ],
};
