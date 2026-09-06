import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 128, written to the Day 1 standard.
 *
 * God finishes His questions with a parade of wild animals, Job finally
 * answers, and the book ends with restoration nobody saw coming. Seven
 * blocks across four chapters, matching Day 127.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 128,
  title: "God Restores Job",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 128. Last day in Job.", 700],
    ["God keeps questioning him, animal after animal, right up to two of the strangest creatures in the whole Bible.", 800],
    ["And then Job finally says something. Not a defense this time.", 850],
    ["We are in Job 39 through 42. God's final round of questions, and the ending nobody in this story expected.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 39, 1, 18, [
      "God keeps going. Knowest thou the time when the wild goats of the rock bring forth? He is asking about a birth in a cliffside cave that Job has never once witnessed.",
      "He points at the wild ass. Who hath sent him out free, whose house I have made the wilderness? That animal answers to nobody, and God is the one who built him that way.",
      "Then the ostrich, described with almost comic honesty. She leaveth her eggs in the earth and forgetteth that the foot may crush them. God hath deprived her of wisdom, He says plainly. And yet what time she lifteth up herself on high, she scorneth the horse and his rider. A foolish bird that can still outrun anything chasing it.",
      "None of this is decoration. Every animal is a small, specific thing Job did not design, does not control, and cannot fully explain. That is the whole argument, one creature at a time.",
    ]),
    g("job", 39, 19, 30, [
      "Hast thou given the horse strength, God asks, hast thou clothed his neck with thunder? Then a description of a warhorse that still reads like poetry. He paweth in the valley, and rejoiceth in his strength, he mocketh at fear, and is not affrighted. He saith among the trumpets, Ha, ha.",
      "God did not just make the horse strong. He made it love the strength.",
      "Then the hawk and the eagle. Doth the hawk fly by thy wisdom? Doth the eagle mount up at thy command? She abideth on the crag of the rock, and her young ones suck up blood, and where the slain are, there is she. Even the eagle's harder nature belongs to God, not to Job's approval.",
      "That is the end of God's first speech. Every question has been rhetorical. Every answer has been no.",
    ]),
    g("job", 40, 1, 14, [
      "Shall he that contendeth with the Almighty instruct him? God asks. He that reproveth God, let him answer it. After chapters of silence, He finally gives Job the floor.",
      "And Job says almost nothing. Behold, I am vile, what shall I answer thee? I will lay mine hand upon my mouth. Once have I spoken, but I will not answer, yea twice, but I will proceed no further. The man who demanded a hearing for thirty-one straight chapters has nothing left to say.",
      "God is not finished, though. He goes again. Gird up thy loins now like a man, I will demand of thee. Deck thyself now with majesty and excellency, cast abroad the rage of thy wrath, and tread down the wicked in their place. He is daring Job to try running the universe for one afternoon.",
      "Then will I also confess unto thee, God says, that thine own right hand can save thee. If Job can do that, he does not need God. He cannot. Nobody has ever been able to.",
    ]),
    g("job", 40, 15, 24, [
      "Behold now behemoth, God says, which I made with thee. Whatever this creature is, God did not hide it from Job. He built it in plain sight and Job still cannot explain it.",
      "His strength is in his loins, his bones are as strong pieces of brass, his bones are like bars of iron. He is the chief of the ways of God. Not the strongest thing Job has heard of. The strongest thing God has made.",
      "He lieth under the shady trees, in the covert of the reed and fens, and behold, he drinketh up a river, and hasteth not. He is not afraid of anything, because there is nothing around him worth fearing.",
      "He taketh it with his eyes, his nose pierceth through snares. Nobody catches this animal. That is the point of describing it at all.",
    ]),
    g("job", 41, 1, 11, [
      "Canst thou draw out leviathan with an hook? God asks. Or his tongue with a cord which thou lettest down? Canst thou put an hook into his nose, or bore his jaw through with a thorn?",
      "The obvious answer, every time, is no. God is not asking because He wants information. He is asking because Job needs to feel the size of the gap.",
      "Lay thine hand upon him, God warns, remember the battle, do no more. One touch and you will not try that twice.",
      "Whatsoever is under the whole heaven is mine, God says a little later. He owns leviathan the way He owns the raven and the wild goat. Nothing Job has seen in this whole book was ever outside God's hand, including the suffering.",
    ]),
    g("job", 41, 12, 34, [
      "God keeps describing leviathan close up. His scales are his pride, shut up together as with a close seal. Out of his mouth go burning lamps, and sparks of fire leap out. Whatever this animal actually was, it terrified everyone who saw it.",
      "He esteemeth iron as straw, and brass as rotten wood. The sword of him that layeth at him cannot hold. Every weapon a man owns is useless against it.",
      "Upon earth there is not his like, God finishes, who is made without fear. He beholdeth all high things, he is a king over all the children of pride. Even the proudest thing on earth answers to its Maker.",
      "That is the last verse of God's speech. He never once explains the accusations, the losses, or the boils. He simply shows Job how much bigger the world is than Job's questions about it.",
    ]),
    g("job", 42, 1, 17, [
      "Then Job answered the LORD, and said, I know that thou canst do every thing, and that no thought can be withholden from thee. I have heard of thee by the hearing of the ear, but now mine eye seeth thee. Wherefore I abhor myself, and repent in dust and ashes. Not because God gave him an explanation. Because God showed up.",
      "Then the LORD turns to the friends. My wrath is kindled against thee, and against thy two friends, for ye have not spoken of me the thing that is right, as my servant Job hath. Everything Eliphaz, Bildad, and Zophar said about suffering being punishment, God calls wrong, in Job's presence, out loud.",
      "He tells them to bring seven bullocks and seven rams, and my servant Job shall pray for you, for him will I accept. The man they spent thirty chapters accusing is the one who has to pray them out of trouble.",
      "The LORD turned the captivity of Job, when he prayed for his friends. Not before. When he prayed for them. Then came all his family, and every man gave him a piece of money and an earring of gold, and the LORD gave Job twice as much as he had before. He named his three daughters, gave them an inheritance alongside their brothers, and lived a hundred and forty more years. So Job died, being old and full of days.",
    ]),
  ],
  closing: [
    ["So that is Day 128. The end of Job.", 700],
    ["God never told him why. Not once, in four chapters of speeches.", 750],
    ["What He gave instead was Himself. Wild goats, warhorses, leviathan, and His own voice out of the storm.", 800],
    ["And that turned out to be enough. I have heard of thee by the hearing of the ear, Job said, but now mine eye seeth thee.", 850],
    ["Then God did something Job's friends never expected. He was angrier at their bad theology than at Job's raw honesty.", 850],
    ["And healing for Job started the moment he prayed for the men who had wounded him the most.", 850],
    ["Tomorrow we leave Job behind and open the Psalms. Songs written by people who prayed through exactly this kind of pain.", 850],
    ["For now, sit with what Job actually got back.", 800],
    ["Not an explanation.", 750],
    ["A God who showed up.", 1200],
  ],
};
