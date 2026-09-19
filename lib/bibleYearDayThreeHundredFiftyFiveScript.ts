import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 355, written to the Day 1 standard.
 *
 * Peter's second letter turns from suffering to danger from the inside:
 * false teachers, scoffers who mock the promise of Christ's return, and a
 * charge to keep growing while you wait. Six blocks across 2 Peter 1-3.
 */

const secondPeterOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Peter 1:${startVerse}-${endVerse}`,
  book: "2 peter",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const secondPeterTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Peter 2:${startVerse}-${endVerse}`,
  book: "2 peter",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const secondPeterThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Peter 3:${startVerse}-${endVerse}`,
  book: "2 peter",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 355,
  title: "Remember Truth and Await the Day",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 355.", 700],
    ["Peter writes a second letter, and this time the danger isn't outside the church. It's inside it.", 800],
    ["False teachers are coming, he says. People who'll deny the Lord who bought them, and drag others down with them.", 850],
    ["And scoffers will show up too, laughing at the idea that Jesus is even coming back at all.", 800],
    ["Peter's answer to both isn't panic. It's remembering what's already true, and growing while you wait.", 850],
    ["2 Peter 1, 2, and 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    secondPeterOne(1, 11, [
      "Peter opens by telling his readers they've obtained faith just as precious as his own. Not a lesser tier. The same standing, through the same righteousness of God.",
      "God's given you everything you need for life and godliness, Peter says, through great and precious promises, so you can share in his own nature and escape the corruption that lust builds in the world.",
      "Then he lays out a ladder. Add virtue to your faith. Knowledge to virtue. Self-control to knowledge. Patience, godliness, brotherly kindness, and finally love, each one built on the one before it.",
      "Have these in abundance, Peter says, and you won't be idle or unproductive. Lack them, and you're blind, unable to see anything past what's right in front of you, and you've forgotten you were ever cleaned from your old sins.",
    ]),
    secondPeterOne(12, 21, [
      "Peter says he'll keep reminding them of this, even though they already know it, because he knows he's about to die, the way Jesus told him he would.",
      "And he wants them to remember it isn't a story he made up. We were eyewitnesses of his majesty, Peter says, on the mountain, when a voice came from the excellent glory itself. This is my beloved Son, in whom I am well pleased.",
      "That's not secondhand information. Peter was standing there. And beyond that voice, he says, you have an even more sure word of prophecy, like a light shining in a dark place until the day breaks and the morning star rises in your own heart.",
      "No prophecy came from a man's own idea, Peter says. Holy men spoke as the Holy Ghost carried them along. The word didn't originate with people. It came through them.",
    ]),
    secondPeterTwo(1, 11, [
      "Just as false prophets rose up among Israel, Peter warns, false teachers will rise up among you. They'll quietly smuggle in destructive heresies, even denying the Lord who bought them, and bring swift destruction on themselves.",
      "Many will follow their shameful ways, Peter says, and because of them the way of truth will get spoken against. In their greed they'll use made-up words to exploit you for money. Their judgment has been waiting a long time, and it isn't sleeping.",
      "God didn't spare the angels who sinned, Peter says. He threw them down and chained them in darkness, waiting for judgment. He didn't spare the ancient world either, but he did save Noah, a preacher of righteousness, one of only eight people, when he brought the flood on the ungodly.",
      "He turned Sodom and Gomorrah to ashes as a warning to anyone who'd live that way later, but he pulled righteous Lot out first, a man whose soul was tormented daily by the filthy conduct all around him. The Lord knows how to rescue the godly and how to hold the unjust for judgment.",
    ]),
    secondPeterTwo(12, 22, [
      "Peter calls these teachers brute beasts, born only to be caught and destroyed, mouthing off about things they don't even understand. They'll perish in their own corruption, the same way the animals they're compared to do.",
      "They count it pleasure to feast in broad daylight, Peter says. Spots and blemishes, sitting at your table while they deceive you, eyes full of adultery, unable to stop sinning, seducing anyone unstable enough to be caught.",
      "They've left the straight road and wandered off, Peter says, following the path of Balaam, who loved the money that came from doing wrong, until a donkey spoke with a man's voice and stopped the prophet's madness.",
      "They're wells with no water, clouds blown along by a storm, promising freedom while they themselves are slaves to corruption. It would have been better, Peter says, never to have known the way of righteousness than to know it and turn back. Like a dog returning to its own vomit, or a washed pig heading straight back to the mud.",
    ]),
    secondPeterThree(1, 9, [
      "This is Peter's second letter now, written to stir up their honest thinking by reminding them again of what the prophets said and what the apostles commanded.",
      "Know this first, Peter says. Scoffers will come in the last days, mocking, chasing their own desires, asking where the promise of his coming even is, since everything looks exactly like it always has since the world began.",
      "They deliberately forget, Peter says, that the heavens existed long ago and the earth was formed out of water and by water, and that the world back then was destroyed when it was flooded with that same water. The heavens and earth now are being kept by that same word, saved for fire, reserved for judgment.",
      "But don't miss this one thing, Peter says. With the Lord, one day is like a thousand years, and a thousand years like one day. The Lord isn't slow about his promise the way some people call it slow. He's patient, not wanting anyone to perish, wanting everyone to reach repentance.",
    ]),
    secondPeterThree(10, 18, [
      "The day of the Lord will come like a thief, Peter says. The heavens will pass away with a roar, the elements will melt in the heat, and the earth and everything done on it will be laid bare.",
      "Since everything is going to be dissolved like that, Peter asks, what kind of people should you be? Holy, godly, looking for and hurrying toward the coming of that day, waiting for new heavens and a new earth, where righteousness actually lives.",
      "So be diligent, Peter says, to be found by him in peace, without spot, blameless. And count the Lord's patience as what it is, salvation, the same way Paul wrote to you, even though some of what Paul wrote is hard to follow, and untaught, unstable people twist it, the way they twist the rest of Scripture, to their own destruction.",
      "Knowing this ahead of time, Peter says, be on guard, so you don't get carried off by the error of the lawless and lose your own footing. Instead, keep growing in grace and in the knowledge of our Lord and Savior Jesus Christ. To him be glory, both now and forever.",
    ]),
  ],
  closing: [
    ["So that's Day 355.", 700],
    ["False teachers smuggling in heresies, a donkey stopping a prophet's madness, and scoffers laughing at the idea Jesus is coming back at all.", 850],
    ["Peter doesn't answer any of it with fear. He answers it with memory. Remember what you were told. Remember what you've already seen.", 850],
    ["And underneath the warnings sits one of the most patient lines in the whole New Testament. The Lord isn't slow. He's giving people time to repent.", 850],
    ["A day is like a thousand years to him. What feels like delay to you isn't delay to him at all.", 800],
    ["Tomorrow, 1 John 1 through 3. John writes about walking in the light, and what it actually looks like to love the way God loves.", 850],
    ["For now, carry the ladder Peter built.", 750],
    ["Add to your faith virtue. To virtue, knowledge. To knowledge, self-control. All the way to love.", 850],
    ["Grow in grace, and in the knowledge of him.", 1200],
  ],
};
