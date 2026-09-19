import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 360, written to the Day 1 standard.
 *
 * Revelation 5-7: a sealed scroll nobody can open, the Lamb who takes it, the
 * four horsemen and the seals that follow, then a pause to seal God's people
 * before a multitude too big to count stands in white. Six blocks.
 */

const rev = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Revelation ${chapter}:${startVerse}-${endVerse}`,
  book: "revelation",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 360,
  title: "The Lamb, the Scroll, and the Redeemed",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 360.", 700],
    ["A scroll sealed shut with seven seals, and nobody in heaven or on earth strong enough to open it.", 800],
    ["Then it opens, and everything after that changes.", 850],
    ["War, famine, death, an earthquake that moves every mountain. And underneath all of it, a multitude nobody can count, standing in white.", 900],
    ["Revelation 5 through 7.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    rev(5, 1, 7, [
      "John sees a scroll in the right hand of the one on the throne, sealed with seven seals, and a strong angel calls out with a loud voice. Who is worthy to open the scroll and break its seals?",
      "Nobody answers. Not in heaven, not on earth, not under the earth. Nobody is found who can even look inside it. John breaks down and weeps, hard, because it seems like the scroll will just stay shut forever.",
      "Then one of the elders stops him. Do not weep, he says. Behold, the Lion of the tribe of Judah, the Root of David, has prevailed to open the scroll.",
      "John turns to see a lion. What he sees instead is a Lamb, standing as though it had been slain. The most powerful being in the room looks like the thing that was killed.",
    ]),
    rev(5, 8, 14, [
      "The Lamb takes the scroll, and the four living creatures and the twenty-four elders fall down in front of him, holding harps and golden bowls full of incense, which John says are the prayers of God's people.",
      "They sing something new. Worthy are you to take the scroll and open its seals, because you were slain, and you purchased people for God with your blood, from every tribe and language and people and nation.",
      "Then the number widens past counting. Ten thousand times ten thousand, and thousands of thousands of angels, all saying it with one voice. Worthy is the Lamb who was slain, to receive power and riches and wisdom and strength and honor and glory and blessing.",
      "Then every creature in heaven, on earth, under the earth, and in the sea, all of them together, say the same blessing to the one on the throne and to the Lamb, forever. This is the biggest chorus in the whole Bible, and it is singing about someone who died.",
    ]),
    rev(6, 1, 8, [
      "The Lamb opens the first seal, and a white horse rides out, its rider carrying a bow, given a crown, riding out to conquer.",
      "The second seal opens a red horse, and its rider is allowed to take peace from the earth, so that people kill each other. The third opens a black horse, its rider holding a pair of scales, and a voice announces a day's wages will barely buy a day's bread.",
      "The fourth seal opens a pale horse, and its rider's name is Death, with the grave riding right behind him. Together they are given power over a quarter of the earth, to kill by war, famine, plague, and wild animals.",
      "Conquest, war, scarcity, death. Four riders, four seals, and nothing has happened yet that God did not already know was written in the scroll.",
    ]),
    rev(6, 9, 17, [
      "The fifth seal opens on souls under the altar, people killed for holding on to God's word and their testimony. They cry out, how long, Master, holy and true, before you judge and avenge our blood?",
      "They are given white robes and told to rest a little longer, until the number of their fellow servants who will be killed the same way is complete. Even martyrs have to wait on God's timing.",
      "The sixth seal opens on an earthquake. The sun goes black, the moon turns like blood, stars fall, and the sky itself is rolled back like a scroll. Every mountain and island is shaken out of place.",
      "And every kind of person, kings, generals, the rich, the powerful, slaves, free men, runs to hide in caves, begging the rocks to fall on them rather than face the one on the throne. The great day of his wrath has come, they say, and who can stand?",
    ]),
    rev(7, 1, 8, [
      "Before anything else happens, four angels hold back the four winds of the earth so nothing can be harmed yet. Another angel rises from the east, carrying the seal of the living God, and calls out to wait.",
      "Do not harm the earth, the sea, or the trees, he says, until we have marked the servants of our God on their foreheads.",
      "John hears the number sealed. A hundred and forty-four thousand, twelve thousand from each of the twelve tribes of Israel, named one by one.",
      "In the middle of horsemen and earthquakes and terrified kings, God stops to count and mark his own people first. Judgment does not move until they are sealed.",
    ]),
    rev(7, 9, 17, [
      "Then John sees something no one could count. A great multitude from every nation, tribe, people, and language, standing before the throne and the Lamb, dressed in white robes, palm branches in their hands.",
      "They cry out together. Salvation belongs to our God who sits on the throne, and to the Lamb. And every angel, elder, and living creature falls on their face and worships, saying amen to it.",
      "One elder asks John who these people in white are, and where they came from. John admits he does not know. The elder answers, these are the ones who came out of the great tribulation, and washed their robes white in the blood of the Lamb.",
      "So this is where they end up. Never hungry again, never thirsty again, no sun beating down on them anymore. The Lamb himself will shepherd them to springs of living water, and God will wipe away every tear from their eyes.",
    ]),
  ],
  closing: [
    ["So that's Day 360.", 700],
    ["A sealed scroll, four horsemen, an earthquake that moves mountains, and a multitude too big to count.", 800],
    ["The whole thing turns on one image. John looks for a lion and gets a Lamb, still bearing the marks of being killed.", 850],
    ["Every seal that opens is real. War is real. Famine is real. The wait under that altar is real.", 850],
    ["And before any of it lands, God stops the story to mark and count his own people, one tribe at a time.", 850],
    ["By the end of it, the ones who went through the worst of it are standing in white, and God himself is wiping their tears away.", 850],
    ["Tomorrow, Revelation 8 through 10. Trumpets, and a scroll John is told to eat.", 850],
    ["For now, hold on to the elder's answer.", 750],
    ["These are the ones who came through the great tribulation.", 750],
    ["And washed their robes white in the blood of the Lamb.", 1200],
  ],
};
