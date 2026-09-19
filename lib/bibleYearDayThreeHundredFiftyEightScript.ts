import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 358, written to the Day 1 standard.
 *
 * Three short books that do not sound alike: a warm personal letter to
 * Gaius, Jude's hard warning about men who twisted grace into license, and
 * the opening of Revelation, where John turns around and sees the risen
 * Christ. Five blocks across the three books.
 */

const thirdJohnOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `3 John 1:${startVerse}-${endVerse}`,
  book: "3 john",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const jude = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jude 1:${startVerse}-${endVerse}`,
  book: "jude",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const revelationOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Revelation 1:${startVerse}-${endVerse}`,
  book: "revelation",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 358,
  title: "Truth, Contending, and the Risen Christ",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 358.", 700],
    ["Three short books today, and they do not sound alike at all.", 800],
    ["First a warm letter to a friend named Gaius. Then Jude, writing hard against men who twisted grace into an excuse.", 850],
    ["Then John, exiled on an island called Patmos, turns around and sees someone he thought he already knew.", 850],
    ["And falls down like a dead man.", 1150],
    ["3 John, Jude, and Revelation 1.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    thirdJohnOne(1, 14, [
      "John writes to a friend, Gaius, and opens with something almost tender. He prays that Gaius prospers and stays healthy, just as his soul already prospers.",
      "Other believers keep coming back with the same report. Gaius is faithful, he walks in the truth, and he takes in traveling teachers who go out for the sake of the Name, taking nothing from outsiders.",
      "Then the letter turns. John mentions a man named Diotrephes, who loves being first, refuses to welcome John's people, spreads malicious talk about them, and even throws out anyone in the church who tries to help them.",
      "John's answer to all that pettiness is one plain line. Do not imitate what is evil, imitate what is good. Whoever does good belongs to God. Whoever does evil has not seen God at all. Then he holds up Demetrius, well spoken of by everyone, and by the truth itself.",
    ]),
    jude(1, 16, [
      "Jude, brother of James, writes to people called and kept by Jesus Christ. He says he meant to write about the salvation they all share, but something more urgent came up.",
      "Certain men have slipped in unnoticed, Jude says, turning God's grace into a license to do whatever they want, and denying Jesus Christ as their only master and Lord. Contend for the faith, Jude says. Fight for it.",
      "He reaches back for warnings his readers already know. God rescued a people out of Egypt and later destroyed the ones who did not believe. Angels who left their assigned place are held in chains for judgment. Sodom and Gomorrah stand as an example, consumed by fire.",
      "These men Jude is warning about are like that, he says. Dreamers who defile everything they touch, who go the way of Cain, chase Balaam's reward, and perish the way Korah did, in his rebellion against God.",
    ]),
    jude(17, 25, [
      "Remember what the apostles told you, Jude says. They warned you scoffers would come in the last days, living only for their own desires. This is exactly who they are, people who cause division, ruled by instinct, without the Spirit.",
      "But Jude turns straight from warning to instruction. Build yourselves up in your most holy faith. Pray in the Holy Spirit. Keep yourselves in God's love, while you wait for the mercy of Jesus Christ that leads to eternal life.",
      "And he is careful about how to treat the people being pulled toward these teachers. Have mercy on some who doubt. Save others by snatching them out of the fire. And be careful, hating even the sin that has touched their lives.",
      "Then Jude closes with one of the highest lines in the whole New Testament. To the one who can keep you from falling, and present you faultless before his glory with great joy, to the only God our Savior, be glory and majesty, power and authority, before all time, now, and forever.",
    ]),
    revelationOne(1, 8, [
      "Revelation opens by naming exactly what it is. The revelation of Jesus Christ, given to him by God, to show his servants what must soon happen, sent through an angel to John.",
      "John says whoever reads this out loud is blessed, and whoever hears it and keeps what is written in it, because the time is near. Then he writes to seven churches in Asia, grace and peace from the one who is, who was, and who is coming.",
      "He describes Jesus in three moves. The faithful witness. The firstborn from the dead. The ruler of the kings of the earth. The one who loved us, and freed us from our sins with his own blood.",
      "Look, he is coming with the clouds, John writes, and every eye will see him, even the ones who pierced him, and every nation will mourn because of him. I am the Alpha and the Omega, says the Lord God, the one who is, who was, and who is coming, the Almighty.",
    ]),
    revelationOne(9, 20, [
      "John says he was on the island of Patmos because of God's word and the testimony of Jesus, and on the Lord's day he heard a voice behind him, loud as a trumpet.",
      "He turns to see the voice, and sees someone standing among seven golden lampstands, dressed in a robe down to his feet, hair white like wool, eyes like blazing fire, feet like polished bronze, and a voice like rushing water.",
      "Out of his mouth comes a sharp two-edged sword, and his face shines like the sun at full strength. When John sees him, he falls at his feet like a dead man.",
      "And the one standing there puts his hand on John and says, do not be afraid. I am the first and the last, the living one. I was dead, and look, I am alive forever, and I hold the keys of death and the grave.",
    ]),
  ],
  closing: [
    ["So that's Day 358.", 700],
    ["A faithful friend, a church bully, a fight worth having, and a vision that drops John flat on his face.", 800],
    ["Gaius shows you what steady faithfulness looks like when nobody is watching. Diotrephes shows you what loving first place does to a church.", 850],
    ["Jude shows you that grace was never a license, and that some things are worth contending for, hard.", 800],
    ["And then John, who once leaned on Jesus at a dinner table, sees him now in full glory and cannot stand up.", 850],
    ["Tomorrow, Revelation 2 through 4. Letters to seven real churches, then a door standing open in heaven.", 850],
    ["For now, hold what he said next, after telling John not to be afraid.", 750],
    ["I am the first and the last, and I am alive for evermore.", 900],
    ["Fear not.", 1200],
  ],
};
