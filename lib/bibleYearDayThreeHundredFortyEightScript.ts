import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 348, written to the Day 1 standard.
 *
 * Hebrews 3-5: the writer argues Jesus is greater than Moses, then turns
 * that into a hard warning about the wilderness generation who heard God's
 * voice and still refused to believe him, then closes with Jesus as a high
 * priest who suffered his way into the job and a rebuke for readers who are
 * still stuck on milk. Six blocks across three chapters.
 */

const hebrewsThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 3:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 4:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 5:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 348,
  title: "Jesus Greater Than Moses and Priesthood",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 348.", 700],
    ["Hebrews keeps building the case it opened with. Jesus is greater than everything Israel trusted before him.", 800],
    ["Yesterday it was greater than angels. Today it's greater than Moses, and greater than the whole priesthood system.", 800],
    ["There's a hard warning buried in the middle of this too. About a generation that heard God's own voice and still said no.", 850],
    ["Hebrews 3 through 5.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hebrewsThree(1, 6, [
      "Consider Jesus, the writer says. Not just admire him from a distance. Look straight at him, the way you'd look at someone you're about to follow into something.",
      "Moses was faithful too, faithful as a servant inside God's house. But the one who builds a house gets more honor than the house itself. Jesus built it.",
      "So Moses served inside the house. Jesus is a son over his own house. And that house is you, the writer says, if you hold on to the hope you started with.",
      "That's the whole argument in six verses. Moses was great. Jesus is the one Moses was always working for.",
    ]),
    hebrewsThree(7, 19, [
      "Then the writer quotes an old psalm, and it turns into a warning. Today, if you hear his voice, do not harden your heart, the way that generation did in the wilderness.",
      "Your fathers tested me and watched what I did for forty years, God says, and I was still grieved by that generation. They kept going astray in their hearts. They never learned my ways.",
      "So I swore in my anger, they will not enter my rest. A whole generation walked out of Egypt and died in the desert without ever getting there.",
      "Push each other, the writer says, every single day, while it's still called Today, so none of you gets hardened by sin's lies. They couldn't get in. Not because God changed his mind. Because they wouldn't believe him.",
    ]),
    hebrewsFour(1, 10, [
      "So the promise of entering God's rest is still open. Which means it's possible to fall short of it, the writer warns, the same way that generation did.",
      "The message reached them too, but it did nothing for them, because they didn't mix what they heard with faith. Hearing it wasn't the problem. Believing it was.",
      "God rested on the seventh day, the writer points out, and yet a rest still remains open, because the ones who first heard about it never went in. Even after they entered the land, another day stayed open for someone else.",
      "There remains a rest for God's people, then. And whoever enters it rests from his own work, the same way God rested from his.",
    ]),
    hebrewsFour(11, 16, [
      "So work hard to get into that rest, the writer says. Don't fall the same way that generation fell.",
      "And here's why nothing gets past God. His word is alive, sharper than any two-edged sword, cutting deep enough to split soul from spirit, joint from marrow. It reads the thoughts and intentions of your heart. Nothing hides from it.",
      "Every single thing is exposed and laid bare in front of the one we answer to. No creature is hidden from his sight.",
      "But then the turn. We have a great high priest who's gone into heaven itself, Jesus the Son of God. He's not someone who can't relate to your weakness. He was tempted in every way you are, and never sinned. So come boldly to the throne of grace. You'll find mercy there, and help exactly when you need it.",
    ]),
    hebrewsFive(1, 10, [
      "Every high priest gets pulled from among the people, to represent people, offering gifts and sacrifices for sin. He can deal gently with the ignorant and those who wander, because he's weak too, and has to offer for his own sin, not just theirs.",
      "Nobody grabs that job for himself. You get called to it, the way Aaron was. Christ didn't promote himself to high priest either. God said to him, You are my Son, today I have become your Father. And in another place, You are a priest forever, in the line of Melchizedek.",
      "While he was here in the flesh, he prayed and pleaded, with loud crying and tears, to the one who could save him from death, and he was heard because of his reverence. Even as a Son, he learned obedience through what he suffered.",
      "Once he was made complete, he became the source of eternal salvation for everyone who obeys him. Named by God as high priest, in the line of Melchizedek.",
    ]),
    hebrewsFive(11, 14, [
      "There's a lot more to say about this, the writer says, about Melchizedek especially, but it's hard to explain, because you've gotten slow to listen.",
      "By now you should be teaching other people. Instead you need someone to go back over the basics with you, the first things about God's word, all over again. You need milk, not solid food.",
      "Anyone still living on milk doesn't know yet how to live right. He's still a baby.",
      "Solid food is for people who are grown, people who've trained themselves through practice to tell good from evil. That's the whole rebuke in four verses. Growth isn't optional.",
    ]),
  ],
  closing: [
    ["So that's Day 348.", 700],
    ["A priest greater than Moses, a rest that's still open, a word sharp enough to cut soul from spirit, and a rebuke about staying on milk too long.", 850],
    ["The line worth keeping is the warning. Harden not your heart today. Not someday. Today.", 800],
    ["That generation heard God's voice in the wilderness and still said no, for forty years, until they died without ever reaching what was promised them.", 850],
    ["But right after that warning comes an invitation. Come boldly to the throne of grace. Because the high priest sitting there was tempted in every way you are, and never sinned.", 900],
    ["That's the shape of this whole letter so far. Warning, then mercy. Fear God's voice enough to actually listen to it, then run to him anyway.", 900],
    ["Tomorrow, Hebrews 6 through 8. Better hope, better covenant.", 850],
    ["For now, carry the line about the word of God.", 800],
    ["Sharper than any two-edged sword.", 750],
    ["Nothing about you is hidden from it.", 1200],
  ],
};
