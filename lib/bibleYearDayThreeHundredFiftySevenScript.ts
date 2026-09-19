import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 357, written to the Day 1 standard.
 *
 * 1 John 4-5 gives the two-word definition ("God is love") and the test that
 * follows from it, then 2 John repeats the same command to one specific
 * church. Six blocks: three across chapter 4, two across chapter 5, one for
 * the short letter.
 */

const firstJohnFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 John 4:${startVerse}-${endVerse}`,
  book: "1 john",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const firstJohnFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 John 5:${startVerse}-${endVerse}`,
  book: "1 john",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

const secondJohnOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 John 1:${startVerse}-${endVerse}`,
  book: "2 john",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 357,
  title: "Love, Truth, and Assurance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 357.", 700],
    ["Yesterday John drew the line. Love your brother, or you are still in the dark.", 750],
    ["Today he tells you why that line matters. Love is not a feeling you wait to catch. It is proof of where you actually stand.", 850],
    ["He also warns you that not every spirit calling itself Christian actually is. Test them.", 800],
    ["God is love.", 1100],
    ["1 John 4 and 5, then a short letter to a church John calls the elect lady.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    firstJohnFour(1, 6, [
      "John stops everything to say this first. Do not believe every spirit. Test them, because plenty of false prophets have already gone out into the world.",
      "Here is the test he gives. Every spirit that confesses Jesus Christ has come in the flesh is from God. Every spirit that will not confess that is not, and that is the spirit of the antichrist John already warned them about.",
      "You have already overcome them, John tells his readers. Little children, the one in you is greater than the one in the world.",
      "That line is worth carrying by itself, whatever you are up against today. The one in you is greater than the one in the world.",
    ]),
    firstJohnFour(7, 12, [
      "Love one another, John says, because love comes from God, and everyone who loves is born of God and knows God.",
      "Then he defines it so there is no room to argue. God is love. Not God is loving. God is love, in his very nature.",
      "And here is the proof, John says. Not that we loved God, but that he loved us, and sent his Son as the payment for our sins, while we were not loving him back at all.",
      "No one has ever seen God, John says. But if we love one another, God lives in us, and his love is made complete in us. Love is how the invisible God becomes visible.",
    ]),
    firstJohnFour(13, 21, [
      "We know we live in him and he in us, John says, because he has given us his Spirit, and because we have seen for ourselves that the Father sent the Son to save the world.",
      "Then the line that undoes a lot of quiet fear. There is no fear in love. Perfect love casts fear out, because fear has torment in it, and the one who is afraid has not been made perfect in love.",
      "We love him, John says, because he loved us first. Not because we worked our way into it. He moved first, every time.",
      "And the test comes back one more time, sharper. If you say you love God and hate your brother, you are a liar, because if you cannot love the brother you can see, you cannot love the God you cannot see.",
    ]),
    firstJohnFive(1, 12, [
      "Whoever believes Jesus is the Christ is born of God, John says, and whoever loves the Father loves his children too. That is just how it works.",
      "His commandments are not heavy, John says, because whatever is born of God overcomes the world. And here is what does the overcoming. Not willpower. Faith.",
      "John names the witnesses. The Spirit, the water, and the blood, and the three agree. God has testified about his Son, and whoever believes carries that testimony inside him.",
      "Whoever has the Son has life, John says. Whoever does not have the Son does not have life. He does not soften that line at all.",
    ]),
    firstJohnFive(13, 21, [
      "John tells them exactly why he wrote all this. So that you will know you have eternal life. Not hope for it, not guess at it. Know it.",
      "And here is the confidence that comes with knowing. If we ask anything according to his will, he hears us, and if he hears us, we already have what we asked for.",
      "He mentions a sin that leads to death, and one that does not, without drawing every line for us. Whoever is born of God does not keep on sinning, because Jesus keeps him, and the evil one cannot touch him.",
      "The whole world lies under the sway of the evil one, John says, but we know the Son of God has come and given us understanding. Then the last line of the letter. Little children, keep yourselves from idols.",
    ]),
    secondJohnOne(1, 13, [
      "John writes to a woman he calls the elect lady, and to her children, people he loves in the truth, and not only him but everyone who knows the truth.",
      "It was a joy, he says, to find her children walking in the truth, just as the Father commanded. Then he repeats the command he has repeated the whole time. Love one another.",
      "But he warns her plainly. Many deceivers have gone out into the world, people who will not confess Jesus Christ came in the flesh. That is the deceiver, John says. That is the antichrist.",
      "Watch yourselves, John says, so you do not lose what you have worked for. And if anyone comes teaching something other than this, do not take them into your house or wish them well. Welcoming them means sharing in what they are doing.",
    ]),
  ],
  closing: [
    ["So that's Day 357.", 700],
    ["A test for spirits, a definition of God that only takes two words, and a warning about who you let through your door.", 800],
    ["John keeps circling back to the same center. Love is not a mood. It is proof.", 800],
    ["Proof that you belong to God. Proof that you know him. Proof, even, that you have already overcome.", 800],
    ["And when fear shows up instead of love, John does not tell you to fake confidence. He tells you love, grown all the way up, pushes fear back out the door.", 850],
    ["Tomorrow, 3 John, Jude, and the opening of Revelation. Two short letters, then John sees something that stops him cold.", 850],
    ["For now, hold onto the shortest line John wrote.", 750],
    ["Perfect love casts out fear.", 900],
    ["God is love.", 1200],
  ],
};
