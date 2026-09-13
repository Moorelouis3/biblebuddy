import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 190, written to the Day 1 standard.
 *
 * Ecclesiastes 3-5: the season poem, then a hard look at oppression and
 * loneliness, then a warning about what a careless mouth owes God in
 * worship. Solomon keeps testing the same question from new angles and
 * keeps landing on the same small answer. Seven blocks across three
 * chapters.
 */

const eccl = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ecclesiastes ${chapter}:${startVerse}-${endVerse}`,
  book: "ecclesiastes",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SCRIPT: BibleYearDayScript = {
  dayNumber: 190,
  title: "A Time for Everything",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 190.", 650],
    ["Ecclesiastes 3 through 5.", 700],
    ["A poem about seasons, a hard look at oppression and loneliness, then a warning about what your mouth owes God.", 800],
    ["Same Preacher as yesterday, still running the same experiment, still calling most of it vanity.", 800],
    ["But today he starts pointing at things that actually hold weight. Two people instead of one. Fewer words in worship. The meal in front of you.", 850],
    ["We are in Ecclesiastes 3, 4, and 5.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    eccl(3, 1, 8, [
      "To every thing there is a season, and a time to every purpose under the heaven. This is the most quoted verse in the whole book, and it isn't offered as comfort. It's offered as structure. Whatever you're living through right now already has its opposite written into this list.",
      "A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted. Even the good things carry an expiration date in the same breath that names them.",
      "A time to kill, and a time to heal; a time to break down, and a time to build up... a time to keep silence, and a time to speak. Fourteen pairs, and none of them get labeled good or bad. War gets a season. So does peace. So does staying quiet.",
      "A time to love, and a time to hate; a time of war, and a time of peace. The poem ends there, on purpose. Solomon never tells you which season you're in. He just tells you there's always one.",
    ]),
    eccl(3, 9, 15, [
      "What profit hath he that worketh in that wherein he laboureth? He opens this section with the same question that's been driving the whole book, and no answer comes right away.",
      "He hath made every thing beautiful in his time: also he hath set the world in their heart, so that no man can find out the work that God maketh from the beginning to the end. You were built to sense there's more going on than you can see, and built without the ability to actually see all of it.",
      "I know that there is no good in them, but for a man to rejoice, and to do good in his life. And also that every man should eat and drink, and enjoy the good of all his labour, it is the gift of God. Not the grand answer he went looking for. The one he keeps landing on anyway: eat your food, do your work, and know that even being able to enjoy it is a gift, not something you earned.",
      "I know that, whatsoever God doeth, it shall be for ever... and God doeth it, that men should fear before him. Your plans get scrapped and rewritten all the time. His don't need editing.",
    ]),
    eccl(3, 16, 22, [
      "Moreover I saw under the sun the place of judgment, that wickedness was there; and the place of righteousness, that iniquity was there. He goes looking for justice in the actual courtroom and finds the same corruption he'd find anywhere else.",
      "I said in mine heart, God shall judge the righteous and the wicked: for there is a time there for every purpose. The unfairness doesn't get explained away. It gets pushed forward to a time he trusts is coming, even without seeing it yet.",
      "I said in mine heart concerning the estate of the sons of men, that God might manifest them, and that they might see that they themselves are beasts... they have all one breath; so that a man hath no preeminence above a beast. This is one of the hardest lines he writes. Stripped of legacy and applause, a human death and an animal death end the exact same way.",
      "Who knoweth the spirit of man that goeth upward, and the spirit of the beast that goeth downward to the earth? Wherefore I perceive that there is nothing better, than that a man should rejoice in his own works; for that is his portion. He asks the question and admits he can't answer it from where he's standing. So he goes back to the one thing he's already found solid enough to hold. The work right in front of him.",
    ]),
    eccl(4, 1, 8, [
      "So I returned, and considered all the oppressions that are done under the sun: and behold the tears of such as were oppressed, and they had no comforter... on the side of their oppressors there was power. He looks straight at suffering he can't fix and doesn't pretend it resolves neatly.",
      "Wherefore I praised the dead which are already dead more than the living which are yet alive. Yea, better is he than both they, which hath not yet been. That's not despair for its own sake. That's what watching real cruelty up close, with no comforter in sight, actually does to a man.",
      "Again, I considered all travail, and every right work, that for this a man is envied of his neighbour. This is also vanity and vexation of spirit. Vexation of spirit means something closer to chasing wind than sadness. Effort that never lands anywhere solid. Even your best work, he says, mostly just makes someone else jealous.",
      "There is one alone, and there is not a second; yea, he hath neither child nor brother: yet is there no end of all his labour... for whom do I labour, and bereave my soul of good? A man works himself empty with no one to hand any of it to, and never once stops to ask why.",
    ]),
    eccl(4, 9, 16, [
      "Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow: but woe to him that is alone when he falleth; for he hath not another to help him up. Right after describing a man with no one, he answers it directly. Not with a philosophy. With a person standing nearby.",
      "Again, if two lie together, then they have heat: but how can one be warm alone? And if one prevail against him, two shall withstand him; and a threefold cord is not quickly broken. Warmth, defense, strength. None of it was designed to run on one person.",
      "Better is a poor and a wise child than an old and foolish king, who will no more be admonished. A king who can't take correction anymore has already lost more than his throne, even while he's still sitting on it.",
      "For out of prison he cometh to reign; whereas also he that is born in his kingdom becometh poor. This also is vanity and vexation of spirit. Even that story doesn't get a happy ending here. The crowd that loved the poor wise kid who rose to power will stop remembering him too.",
    ]),
    eccl(5, 1, 9, [
      "Keep thy foot when thou goest to the house of God, and be more ready to hear, than to give the sacrifice of fools: for they consider not that they do evil. Before he says anything else about worship, he says slow down. Listening comes before offering something.",
      "Be not rash with thy mouth, and let not thine heart be hasty to utter any thing before God: for God is in heaven, and thou upon earth: therefore let thy words be few. This isn't about being quiet in general. It's about knowing exactly who you're talking to before you start talking.",
      "When thou vowest a vow unto God, defer not to pay it... Better is it that thou shouldest not vow, than that thou shouldest vow and not pay. A promise to God isn't measured by how sincere it felt when you made it. It's measured by whether you kept it.",
      "If thou seest the oppression of the poor, and violent perverting of judgment and justice in a province, marvel not at the matter: for he that is higher than the highest regardeth. Injustice at the local level isn't the top of the chain. Somebody above the corrupt officials is still watching, even when no one beneath them can see it happen.",
    ]),
    eccl(5, 10, 20, [
      "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. The love of money doesn't get cured by getting more of it. It just resets the number that would finally feel like enough.",
      "The sleep of a labouring man is sweet, whether he eat little or much: but the abundance of the rich will not suffer him to sleep. The man with less sleeps better. That's not a proverb about virtue. He says he watched it happen.",
      "As he came forth of his mother's womb, naked shall he return to go as he came, and shall take nothing of his labour, which he may carry away in his hand... all his days also he eateth in darkness, and he hath much sorrow and wrath with his sickness. Wealth that can't leave with you, and can't even guarantee you sleep at night. He calls that a sore evil, not a comfortable one.",
      "Behold that which I have seen: it is good and comely for one to eat and to drink, and to enjoy the good of all his labour... this is the gift of God. Same conclusion as chapter three, said again in different words. The food in front of you, and the ability to actually enjoy it. That's the gift. Not the pile behind it.",
    ]),
  ],
  closing: [
    ["So that is Day 190.", 700],
    ["Fifty-eight verses. A poem about seasons, a hard look at oppression and loneliness, then a warning about what your mouth owes God.", 750],
    ["Solomon keeps landing on the same small answer no matter which direction he tests it from. Eat your bread. Do your work. Let being able to enjoy it be enough.", 800],
    ["He watches injustice sit in the very courtroom that's supposed to fix it, and doesn't get to see it resolved. He just decides God is watching it too.", 800],
    ["Right after describing a man with no one to work for, he tells you plainly why a threefold cord doesn't snap. You were never meant to carry all of this alone.", 850],
    ["And before he lets you say another word in worship, he tells you to slow down and listen first.", 800],
    ["Tomorrow, Ecclesiastes 6 through 8. A rich man who can't taste his own food, and a search for wisdom that comes back bitter.", 850],
    ["For now, sit with the line about your mouth in God's house.", 750],
    ["Let thy words be few.", 1200],
  ],
};
