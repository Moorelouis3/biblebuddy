import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 141, written to the Day 1 standard.
 *
 * Psalms 37-39: a long acrostic-style wisdom psalm telling you not to envy
 * people who cheat and win, then David's own body breaking down under the
 * weight of his guilt, then thirteen verses asking God to measure out
 * exactly how short a life actually is. Psalm 37 splits into its three
 * movements (the command not to fret, the wicked plotting and falling, the
 * old man's testimony); Psalm 38 splits at its turn from the wounds
 * themselves to the silence and plea; Psalm 39 stays whole.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 141,
  title: "Waiting, Wisdom, and Frailty",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 141.", 750],
    ["Yesterday ended with mercy measured against the sky and the sea.", 750],
    ["Today David waits, worries, and asks God flat out how long he actually has left.", 800],
    ["Psalm thirty-seven is the long answer to envy. Don't fret over people who cheat and still win.", 800],
    ["Psalm thirty-eight is guilt sitting in the body, not just the mind.", 800],
    ["And Psalm thirty-nine is thirteen verses on how short a life actually is.", 850],
    ["We are in Psalms 37 through 39.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(37, 1, 11, [
      "Fret not thyself because of evildoers... For they shall soon be cut down like the grass, and wither as the green herb. The psalm opens by naming the actual temptation. Not doubt that God exists. Envy of people doing fine while breaking every rule.",
      "Trust in the LORD, and do good... Delight thyself also in the LORD; and he shall give thee the desires of thine heart. Delight comes before desire here, not after. This is not a trick for getting what you want by pretending to love God first.",
      "Commit thy way unto the LORD; trust also in him; and he shall bring it to pass... Rest in the LORD, and wait patiently for him. Commit, trust, rest, wait. Four verbs in a row, and not one of them is fix it yourself.",
      "For yet a little while, and the wicked shall not be... But the meek shall inherit the earth, and shall delight themselves in the abundance of peace. Meek does not mean weak here. It means someone who stopped grabbing and let God hold the timeline instead.",
    ]),
    g(37, 12, 24, [
      "The wicked plotteth against the just, and gnasheth upon him with his teeth. The Lord shall laugh at him: for he seeth that his day is coming. Two reactions to the same threat. One side gnashes its teeth in fury. The other side laughs, because he can already see how it ends.",
      "The wicked have drawn out the sword, and have bent their bow, to cast down the poor and needy... Their sword shall enter into their own heart, and their bows shall be broken. The weapon aimed at the vulnerable ends up in the hand that drew it.",
      "A little that a righteous man hath is better than the riches of many wicked: for the arms of the wicked shall be broken: but the LORD upholdeth the righteous. Not a promise the righteous will have more. A flat statement that less, held honestly, outweighs more, held wickedly.",
      "The steps of a good man are ordered by the LORD... Though he fall, he shall not be utterly cast down: for the LORD upholdeth him with his hand. Ordered steps still include falling. The promise was never a life with no stumbling. It was a hand that catches him when he does.",
    ]),
    g(37, 25, 40, [
      "I have been young, and now am old; yet have I not seen the righteous forsaken, nor his seed begging bread. This is not theory. It is an old man's testimony, looking back over a whole life for the exception and not finding one.",
      "I have seen the wicked in great power, and spreading himself like a green bay tree. Yet he passed away, and, lo, he was not: yea, I sought him, but he could not be found. A tree in full leaf, then gone so completely that someone goes looking for the spot and cannot find it.",
      "Mark the perfect man, and behold the upright: for the end of that man is peace. Not a life with no trouble in it. An ending, specifically, that lands in peace instead of ruin.",
      "But the salvation of the righteous is of the LORD: he is their strength in the time of trouble. And the LORD shall help them and deliver them... because they trust in him. Forty verses of watching wicked and righteous side by side, and it ends on one word. Trust.",
    ]),
    g(38, 1, 11, [
      "O LORD, rebuke me not in thy wrath: neither chasten me in thy hot displeasure. For thine arrows stick fast in me, and thy hand presseth me sore. David names his own guilt before he names anything else. No excuse offered first.",
      "My wounds stink and are corrupt because of my foolishness. I am troubled; I am bowed down greatly; I go mourning all the day long. He does not soften the word. Foolishness. Not misfortune. Not anyone else's fault.",
      "For my loins are filled with a loathsome disease: and there is no soundness in my flesh. I am feeble and sore broken: I have roared by reason of the disquietness of my heart. Guilt is not staying in his head. It is in his body, his sleep, the sound coming out of him.",
      "My lovers and my friends stand aloof from my sore; and my kinsmen stand afar off. The people closest to him step back at the exact moment shame has already isolated him. Both things happening at once, and he says so plainly instead of hiding it.",
    ]),
    g(38, 12, 22, [
      "They also that seek after my life lay snares for me... But I, as a deaf man, heard not; and I was as a dumb man that openeth not his mouth. Surrounded by people plotting against him, and his answer is silence. Not because he has nothing to say. Because he has decided not to defend himself.",
      "For in thee, O LORD, do I hope: thou wilt hear, O Lord my God. The silence toward his accusers is not despair. It is redirected. He stops answering people and starts waiting on God instead.",
      "For I will declare mine iniquity; I will be sorry for my sin. But mine enemies are lively, and they are strong: and they that hate me wrongfully are multiplied. He owns his own sin in the same breath he names their wrongdoing. Their cruelty does not cancel out his guilt.",
      "Forsake me not, O LORD: O my God, be not far from me. Make haste to help me, O Lord my salvation. The psalm that opened with rebuke me not ends with help me. Between those two lines is the whole shape of repentance. Not earning it. Just staying close enough to ask.",
    ]),
    g(39, 1, 13, [
      "I said, I will take heed to my ways, that I sin not with my tongue: I will keep my mouth with a bridle... I was dumb with silence, I held my peace, even from good; and my sorrow was stirred. He holds his tongue so tightly that even good words get trapped behind it, and the silence itself becomes its own kind of pain.",
      "LORD, make me to know mine end, and the measure of my days, what it is; that I may know how frail I am. Behold, thou hast made my days as an handbreadth. A handbreadth is the width of four fingers. That is the measurement he asks God to hold his whole life against.",
      "Surely every man walketh in a vain shew... he heapeth up riches, and knoweth not who shall gather them. And now, Lord, what wait I for? my hope is in thee. He looks straight at how short and uncertain life is, and instead of despair, lands on one plain answer for what he is actually waiting for.",
      "Hear my prayer, O LORD... for I am a stranger with thee, and a sojourner, as all my fathers were. O spare me, that I may recover strength, before I go hence, and be no more. The day's last psalm ends on a plea for a little more time, from a man who just spent thirteen verses proving how little time anyone gets.",
    ]),
  ],
  closing: [
    ["So that is Day 141.", 700],
    ["Don't fret over the wicked, don't hide the weight guilt puts on the body, and remember your days are a handbreadth.", 850],
    ["Notice that word in Psalm thirty-nine.", 700],
    ["A handbreadth. The width of four fingers.", 800],
    ["That is the measurement David asks God to hold his whole life against.", 850],
    ["And Psalm thirty-seven never promises the righteous will have more. It promises they will not be forsaken.", 850],
    ["Tomorrow, Psalms 40 through 42. Rescue, obedience, and a soul thirsting for God.", 800],
    ["For now, sit with David's question.", 750],
    ["LORD, make me to know mine end.", 800],
    ["So you can know how to spend what's left.", 1200],
  ],
};
