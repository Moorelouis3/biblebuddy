import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 180, written to the Day 1 standard.
 *
 * Proverbs 4-6: the father keeps teaching, now naming the heart directly,
 * then the strange woman, then a run of practical warnings ending back on
 * the same danger. Six blocks covering all three chapters in order.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 180,
  title: "Guard Your Heart",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 180.", 650],
    ["Yesterday the father laid the foundation. The fear of the Lord, two paths.", 800],
    ["Today he gets specific. He tells you exactly what to guard, and exactly what is trying to get in.", 800],
    ["A dangerous woman with smooth words. A lazy man who will not get up. A short list of things God flatly hates.", 800],
    ["We are in Proverbs 4 through 6.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(4, 1, 19, [
      "Hear, ye children, the instruction of a father... for I was my father's son, tender and only beloved in the sight of my mother. This teaching did not start with Solomon. It was handed to him first, and now he is handing it forward.",
      "Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding. Whatever else you spend your life gathering, this is supposed to sit above all of it.",
      "Take fast hold of instruction; let her not go: keep her; for she is thy life. Not advice you can take or leave. Something to hold the way you hold your own life.",
      "The path of the just is as the shining light, that shineth more and more unto the perfect day. But the way of the wicked is as darkness: they know not at what they stumble. One path gets brighter as you walk it. The other keeps you tripping over things you never see coming.",
    ]),
    g(4, 20, 27, [
      "My son, attend to my words... let them not depart from thine eyes; keep them in the midst of thine heart. Before anything about behavior, it starts with what you are looking at and what you are holding onto inside.",
      "Keep thy heart with all diligence; for out of it are the issues of life. This is the line the whole day is named for. Whatever is really in there is going to come out, one way or another.",
      "Put away from thee a froward mouth, and perverse lips put far from thee. The guard is not only on what gets in. It is on what gets let out too.",
      "Ponder the path of thy feet, and let all thy ways be established. Turn not to the right hand nor to the left: remove thy foot from evil. Heart, mouth, eyes, feet. Wisdom wants the whole body pointed the same direction.",
    ]),
    g(5, 1, 14, [
      "The lips of a strange woman drop as an honeycomb, and her mouth is smoother than oil: but her end is bitter as wormwood, sharp as a twoedged sword. The danger is not that she is obviously bad. It is that she tastes sweet going down.",
      "Her feet go down to death; her steps take hold on hell. This is not framed as a bad decision. It is framed as a road, and it goes somewhere specific.",
      "Remove thy way far from her, and come not nigh the door of her house. The instruction is not willpower in the moment. It is distance, decided long before the moment comes.",
      "How have I hated instruction, and my heart despised reproof... I was almost in all evil in the midst of the congregation and assembly. The regret lands in public, in front of the very people who watched him ignore every warning.",
    ]),
    g(5, 15, 23, [
      "Drink waters out of thine own cistern, and running waters out of thine own well. Against everything just described, this is the alternative. What you actually need is already at home.",
      "Rejoice with the wife of thy youth. Let her be as the loving hind and pleasant roe... be thou ravished always with her love. Wisdom is not against desire here. It is aiming it at the right place.",
      "Why wilt thou, my son, be ravished with a strange woman, and embrace the bosom of a stranger? A direct question, and it expects you to already know the answer makes no sense.",
      "The ways of man are before the eyes of the Lord, and he pondereth all his goings. His own iniquities shall take the wicked himself, and he shall be holden with the cords of his sins. Nothing here happens unseen. And the sin itself becomes the rope that eventually holds the man who chose it.",
    ]),
    g(6, 1, 19, [
      "If thou be surety for thy friend... thou art snared with the words of thy mouth. Go, humble thyself, and make sure thy friend. Give not sleep to thine eyes. A financial promise made in a moment of friendship can trap a man, and the counsel is urgent. Get out of it now, don't wait.",
      "Go to the ant, thou sluggard; consider her ways, and be wise: which having no guide, overseer, or ruler, provideth her meat in the summer. A creature with no boss still works ahead. Then, straight after: how long wilt thou sleep, O sluggard?",
      "Yet a little sleep, a little slumber, a little folding of the hands to sleep: so shall thy poverty come as one that travelleth, and thy want as an armed man. Small, repeated laziness is pictured as poverty walking toward you, and then arriving armed.",
      "These six things doth the Lord hate: yea, seven are an abomination unto him: a proud look, a lying tongue, and hands that shed innocent blood... a false witness that speaketh lies, and he that soweth discord among brethren. A short, specific list, and it ends on turning brothers against each other, not just on obvious violence.",
    ]),
    g(6, 20, 35, [
      "Bind them continually upon thine heart; tie them about thy neck. When thou goest, it shall lead thee; when thou sleepest, it shall keep thee. The same guard-your-heart instruction from chapter four, now pictured as something worn constantly, awake or asleep.",
      "For the commandment is a lamp; and the law is light... to keep thee from the evil woman, from the flattery of the tongue of a strange woman. The purpose is stated plainly. This is protection, not restriction.",
      "Can a man take fire in his bosom, and his clothes not be burned?... so he that goeth in to his neighbour's wife; whosoever toucheth her shall not be innocent. The question only has one honest answer, and the proverb makes you say it to yourself.",
      "Whoso committeth adultery with a woman lacketh understanding: he that doeth it destroyeth his own soul... jealousy is the rage of a man: he will not regard any ransom. It closes without softening anything. This is called a self-destroying act, and no payment undoes the anger it creates.",
    ]),
  ],
  closing: [
    ["So that is Day 180.", 700],
    ["The father keeps teaching, but now he names the target directly. Keep thy heart with all diligence, for out of it are the issues of life.", 800],
    ["Everything else in these three chapters is that same warning, said a different way.", 800],
    ["A woman whose words are sweeter than the road she leads you down.", 750],
    ["A promise made too quickly that becomes a trap.", 700],
    ["A little sleep that turns into poverty walking toward you.", 750],
    ["And underneath all of it, the same offer as chapter four. Bind wisdom to yourself so tightly it leads you when you're awake and keeps you when you sleep.", 850],
    ["Tomorrow, Proverbs 7 through 9. Wisdom and folly both go looking for the same young man.", 850],
    ["For now, hold on to the line this day is named for.", 800],
    ["Keep thy heart with all diligence.", 1200],
  ],
};
