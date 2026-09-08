import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 145, written to the Day 1 standard.
 *
 * Psalms 49-51: wealth that cannot buy anyone out of the grave, God saying
 * plainly that He never needed the sacrifices, and David's confession after
 * pretending for as long as he could. Six blocks across three short psalms.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 145,
  title: "Wealth, Judgment, and Repentance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 145. Psalms 49 through 51.", 700],
    ["Money that cannot buy anyone out of a grave.", 750],
    ["A God who says plainly that He never needed your sacrifices.", 800],
    ["And a king who finally stops making excuses.", 850],
    ["Three different psalms, one thread underneath all of them. Nothing you can offer God fixes what only God can fix.", 800],
    ["We are in Psalms 49, 50, and 51.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(49, 1, 11, [
      "Hear this, all ye people. The psalm opens by addressing the whole world, not just Israel. Low and high, rich and poor, together, one crowd listening to the same riddle.",
      "The writer says he is opening a dark saying on the harp. This is not a simple lesson. It is meant to be turned over slowly.",
      "Here is the riddle. None of them can by any means redeem his brother, nor give to God a ransom for him. Money can buy almost anything. It cannot buy someone out of death.",
      "They call their lands after their own names, like that keeps the land theirs. It never does. Death does not check whose name is on the deed.",
    ]),
    g(49, 12, 20, [
      "Man that is in honour, and understandeth not, is like the beasts that perish. The psalm says this once to open this half and once to close it. It wants you to hear it twice.",
      "Like sheep they are laid in the grave, death shall feed on them. A blunt image. But then a turn. The upright shall have dominion over them in the morning. Morning belongs to someone else.",
      "But God will redeem my soul from the power of the grave, for he shall receive me. The writer just said no one can buy a brother's soul out of death. Then he says God can do exactly that for him.",
      "Be not thou afraid when one is made rich. When he dies he shall carry nothing away. His glory does not follow him downstairs. Whatever you are watching someone else get, it stays behind when they go.",
    ]),
    g(50, 1, 15, [
      "God speaks, and He is not whispering. He calls the heavens and the earth as witnesses, the way a judge calls a courtroom to order.",
      "He tells His own people plainly. I will not reprove thee for thy sacrifices. He does not need their bull. He already owns every animal on a thousand hills.",
      "If I were hungry, I would not tell thee: for the world is mine, and the fulness thereof. One line, and it punctures the idea that worship feeds God something He lacks.",
      "Offer unto God thanksgiving, and call upon me in the day of trouble: I will deliver thee. That is the actual ask. Honesty and gratitude, not a transaction.",
    ]),
    g(50, 16, 23, [
      "Then the tone turns hard, aimed at people who quote God's law while living against it. What hast thou to do to declare my statutes, seeing thou hatest instruction?",
      "Thou sittest and speakest against thy brother, thou slanderest thine own mother's son. This is not damage from outside the family. It is someone inside it, still using God's name.",
      "I kept silence, thou thoughtest that I was altogether such an one as thyself. God's patience got mistaken for agreement. That mistake has a shelf life.",
      "Consider this, ye that forget God, lest I tear you in pieces. But the door stays open one more line. Whoso offereth praise glorifieth me. Even now, the way out is thanksgiving, not perfection.",
    ]),
    g(51, 1, 9, [
      "Have mercy upon me, O God, according to thy lovingkindness. No excuse, no context, straight to the ask. This is a psalm from someone who did something he cannot undo.",
      "Against thee, thee only, have I sinned. Other people were hurt by what he did. He still says the debt lands first with God. That is not minimizing the damage. It is naming who it is actually owed to.",
      "Behold, I was shapen in iniquity. He is not blaming anyone else to excuse the choice. He is saying the rot goes deeper than one bad decision, and he finally sees it.",
      "Purge me with hyssop, and I shall be clean: wash me, and I shall be whiter than snow. Two pictures stacked, one from the altar, one from nature. He wants clean, not just forgiven.",
    ]),
    g(51, 10, 19, [
      "Create in me a clean heart, O God; and renew a right spirit within me. Not patch the old one. Start over. He knows a repair job will not hold this time.",
      "Cast me not away from thy presence, and take not thy holy spirit from me. That is real fear talking. He has watched what happens to a king God's spirit leaves, and he does not want to be that story too.",
      "Restore unto me the joy of thy salvation. Not the salvation itself. The joy of it. He has not lost his standing with God. He has lost the feeling of it, and he wants that back.",
      "For thou desirest not sacrifice, else would I give it. The sacrifices of God are a broken spirit. He spent his whole life on ceremony he now says was never the point.",
    ]),
  ],
  closing: [
    ["So that is Day 145.", 700],
    ["A rich man who cannot buy his way past death. A God who owns every animal on every hill and still just wants your thanks. And a king who stopped making excuses.", 800],
    ["Psalm 49 says wealth ends at the grave, no matter how much of it there is.", 800],
    ["Psalm 50 says God was never hungry for your sacrifices. He wanted your honesty.", 800],
    ["And Psalm 51 shows what that honesty actually sounds like, out loud, from someone with nothing left to protect.", 850],
    ["Tomorrow, Psalms 52 through 54. A boastful man, a fool who says there is no God, and a prayer for rescue in the middle of real danger.", 850],
    ["For now, hold on to David's ask.", 800],
    ["Create in me a clean heart.", 750],
    ["And renew a right spirit within me.", 1200],
  ],
};
