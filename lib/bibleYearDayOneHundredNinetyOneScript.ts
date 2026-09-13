import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 191, written to the Day 1 standard.
 *
 * Ecclesiastes 6-8: a man with everything who can't taste his own food,
 * the house of mourning over the house of feasting, a search for wisdom
 * that comes back bitter, and counsel for surviving under a king's power.
 * Six blocks across three chapters, the middle one long enough to need
 * three of them on its own.
 */

const eccl = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ecclesiastes ${chapter}:${startVerse}-${endVerse}`,
  book: "ecclesiastes",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 191,
  title: "Better Is the End of a Thing",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 191.", 650],
    ["Ecclesiastes 6 through 8.", 700],
    ["A rich man who can't taste his own food. A house of mourning that teaches more than a house of feasting.", 800],
    ["And a search for wisdom that comes back bitter, from a man honest enough to tell you exactly what it cost him.", 800],
    ["We are in Ecclesiastes 6, 7, and 8.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    eccl(6, 1, 12, [
      "There is an evil which I have seen under the sun, and it is common among men: A man to whom God hath given riches, wealth, and honour, so that he wanteth nothing for his soul of all that he desireth, yet God giveth him not power to eat thereof, but a stranger eateth it. He names something specific here. A man with everything he could want, who somehow can't actually use any of it. That's the evil. Not poverty. Possession without the ability to enjoy it.",
      "If a man beget an hundred children, and live many years... and his soul be not filled with good, and also that he have no burial; I say, that an untimely birth is better than he. One of the bleakest verses in the whole book. A hundred children and a long life aren't enough to outweigh a soul that was never satisfied.",
      "All the labour of man is for his mouth, and yet the appetite is not filled. For what hath the wise more than the fool? Every mouth needs feeding, wise or foolish, and neither one gets to stop needing it. The advantage he keeps claiming for wisdom keeps shrinking the closer he looks at it.",
      "Who knoweth what is good for man in this life... For who can tell a man what shall be after him under the sun? He closes the chapter naming two things nobody gets to know. What's actually good for you while you're alive, and what happens to any of it once you're gone.",
    ]),
    eccl(7, 1, 14, [
      "A good name is better than precious ointment; and the day of death than the day of one's birth. A genuine shock line to open on. Not that death is good, but that by the end of a life, at least there's a name behind it, which is more than a newborn has yet.",
      "It is better to go to the house of mourning, than to go to the house of feasting: for that is the end of all men; and the living will lay it to his heart. He's not against joy. He's saying grief teaches something a party never will, because a funeral tells you the truth about where everyone is headed.",
      "Better is the end of a thing than the beginning thereof: and the patient in spirit is better than the proud in spirit. Be not hasty in thy spirit to be angry: for anger resteth in the bosom of fools. Patience gets named directly as wisdom here. Anger doesn't just visit a fool. It moves in and stays.",
      "In the day of prosperity be joyful, but in the day of adversity consider: God also hath set the one over against the other, to the end that man should find nothing after him. Good days and hard days are both handed to you on purpose, he says, specifically so you can't chart the future from either one.",
    ]),
    eccl(7, 15, 22, [
      "All things have I seen in the days of my vanity: there is a just man that perisheth in his righteousness, and there is a wicked man that prolongeth his life in his wickedness. He states it flatly. Living right doesn't guarantee a long life, and living wrong doesn't guarantee a short one.",
      "Be not righteous over much; neither make thyself over wise: why shouldest thou destroy thyself? Be not over much wicked, neither be thou foolish: why shouldest thou die before thy time? This isn't permission to sin a little. It's a warning against a brittle, self-destroying perfectionism that snaps under its own weight.",
      "It is good that thou shouldest take hold of this; yea, also from this withdraw not thine hand: for he that feareth God shall come forth of them all. Fearing God, not managing your own righteousness score, is what he says actually holds a person together.",
      "For there is not a just man upon earth, that doeth good, and sinneth not. Also take no heed unto all words that are spoken; lest thou hear thy servant curse thee. Nobody gets to stand above reproach, including you. Listen too closely to what people say behind your back and you'll eventually hear your own faults come back at you.",
    ]),
    eccl(7, 23, 29, [
      "All this have I proved by wisdom: I said, I will be wise; but it was far from me. That which is far off, and exceeding deep, who can find it out? The man with more wisdom than anyone alive reports that wisdom itself kept slipping out of his reach.",
      "I applied mine heart to know, and to search, and to seek out wisdom, and the reason of things, and to know the wickedness of folly, even of foolishness and madness. His search wasn't casual curiosity. He went looking specifically at what makes people go wrong.",
      "And I find more bitter than death the woman, whose heart is snares and nets... one man among a thousand have I found; but a woman among all those have I not found. This is Solomon describing his own search, out of his own life. A man with seven hundred wives and three hundred concubines, telling you exactly what he went looking for and exactly what he never found. It's his bitterness on the page, not a verdict on every woman who ever lived.",
      "Lo, this only have I found, that God hath made man upright; but they have sought out many inventions. After all that searching, this is where he lands. People weren't built broken. They went looking for trouble on their own, the same way he just admitted he did.",
    ]),
    eccl(8, 1, 9, [
      "Who is as the wise man? and who knoweth the interpretation of a thing? a man's wisdom maketh his face to shine, and the boldness of his face shall be changed. Wisdom gets described here as something visible. It changes how a person's face actually looks.",
      "I counsel thee to keep the king's commandment, and that in regard of the oath of God... Where the word of a king is, there is power: and who may say unto him, What doest thou? He's writing to people who live under kings they didn't choose and can't argue with. This is survival counsel, not an endorsement of every king's character.",
      "There is no man that hath power over the spirit to retain the spirit; neither hath he power in the day of death: and there is no discharge in that war; neither shall wickedness deliver those that are given to it. No one holds onto their own last breath by force of will. No amount of scheming buys a soldier out of that particular war.",
      "There is a time wherein one man ruleth over another to his own hurt. He's watched power get used in ways that damage the person holding it, not just the person under it.",
    ]),
    eccl(8, 10, 17, [
      "And so I saw the wicked buried... and they were forgotten in the city where they had so done: this is also vanity. Because sentence against an evil work is not executed speedily, therefore the heart of the sons of men is fully set in them to do evil. He names the mechanism directly. Slow justice doesn't read as mercy to the people watching. It reads as permission.",
      "Though a sinner do evil an hundred times, and his days be prolonged, yet surely I know that it shall be well with them that fear God... But it shall not be well with the wicked. He states his own conviction plainly, even while admitting the evidence in front of him doesn't always look like it.",
      "Then I commended mirth, because a man hath no better thing under the sun, than to eat, and to drink, and to be merry: for that shall abide with him of his labour the days of his life. Same answer as before, in the middle of a chapter about kings and injustice and unpunished wickedness. The meal in front of you is still the thing he keeps coming back to.",
      "Then I beheld all the work of God, that a man cannot find out the work that is done under the sun... though a wise man think to know it, yet shall he not be able to find it. He ends the chapter admitting defeat, and not quietly. Even the wisest man alive can't fully trace what God is doing.",
    ]),
  ],
  closing: [
    ["So that is Day 191.", 700],
    ["A rich man who can't taste his own food. A house of mourning that teaches more than a house of feasting.", 750],
    ["Solomon admits flat out that being right doesn't buy you a longer life, and being wrong doesn't guarantee a short one.", 800],
    ["He also admits his own search for wisdom mostly came back bitter, and lets you see exactly what that cost him.", 800],
    ["Then in a chapter about kings, slow justice, and evil that goes unpunished, he circles back one more time to the same small answer.", 850],
    ["Eat your bread. Be merry in your work.", 750],
    ["Tomorrow, Ecclesiastes 9 through 11. The last stretch of a book that keeps testing whether anything under the sun is worth trusting.", 850],
    ["For now, sit with the line about wisdom changing a man's face.", 750],
    ["A man's wisdom maketh his face to shine.", 1200],
  ],
};
