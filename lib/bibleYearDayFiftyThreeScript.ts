import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 53, written to the Day 1 standard.
 *
 * Deuteronomy 22-25: lost property, cross-dressing, the roof battlement,
 * the virginity-tokens dispute, who is kept out of the assembly and the
 * Moabite exception that will matter later, the escaped servant and the
 * usury rule, divorce and the newly married man's year off, gleaning laws
 * tied to Egypt, and the closing set of everyday laws — forty stripes,
 * the unmuzzled ox, levirate marriage, honest weights, Amalek. Seven
 * blocks across one four-chapter reading, matching the shape Days 50-52
 * used.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 53,
  title: "Everyday Faithfulness",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 53. No more cities of refuge or kings today. Just the small stuff.", 750],
    ["A stray ox, a roof without a rail, a bird sitting on her eggs, a bag of weights that lies.", 800],
    ["This is the law code at ground level. Not the big cases. The ordinary Tuesday.", 800],
    ["There is also a hard stretch in here, about who gets kept out and who gets let back in, that lands differently once you know who is coming later in this story.", 850],
    ["We are in Deuteronomy 22 through 25.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(22, 1, 12, [
      "You cannot see your brother's ox wandering loose and just look away. Bring it back, or if you do not know whose it is, keep it at your place until he comes looking. Same for a lost coat, a fallen donkey, anything he dropped. You do not get to pretend you did not see it.",
      "A woman is not to wear what belongs to a man, nor a man what belongs to a woman. And build a rail around your new roof, because people sat and walked up there, and Moses will not let an owner shrug off a death that a little planning could have stopped.",
      "Do not plant two kinds of seed in one field. Do not plow with an ox and a donkey yoked together. Do not weave wool and linen into the same garment. Three small pictures of the same idea. Keep what belongs apart, actually apart.",
      "And if you find a bird sitting on her nest, take the eggs if you must, but let the mother go free. Even a peasant's dinner has a limit on what it costs the animal. This is a law book that keeps stopping to notice the smallest creature in the room.",
    ]),
    deut(22, 13, 30, [
      "A husband can accuse his new wife of not being a virgin, and if her parents produce the proof and he is lying, he is beaten, fined, and stuck married to her for life, no divorce ever allowed. The accusation itself carried a cost if it was false.",
      "If it was true, the town stones her at her father's door. Adultery gets the same sentence for both parties, no double standard written into it.",
      "Then Moses draws a line by location. A betrothed woman attacked in the city, where a scream could be heard, both die, because her silence is read as consent. The same woman attacked in an open field, only the man dies, because there was nobody to hear her cry out. Moses is trying to separate rape from adultery in a system that had not separated them before.",
      "An unbetrothed virgin who is violated, the man pays her father and must marry her for life, no way out. Hard laws from a hard world, protecting a woman's future in the only currency that world understood. Not a modern ideal. A real floor placed under women who had none before.",
    ]),
    deut(23, 1, 14, [
      "A list of who cannot enter the assembly. A man who is mutilated. A child born of a forbidden union, down to the tenth generation. An Ammonite or a Moabite, for the same span, because they would not feed Israel bread and water in the wilderness and hired Balaam to curse them instead.",
      "But an Edomite is not to be hated, because he is your brother. Neither is an Egyptian, because you were a stranger in his land. Even the exclusions have a reason attached, and the reasons are not the same reason.",
      "Hold that Moabite line loosely for now. A Moabite woman named Ruth is coming later in this story, and what Israel does with her will say more about this law than the law itself does.",
      "Then the camp itself gets a purity rule, down to where a man relieves himself, because the Lord walks in the middle of that camp. Holiness here is not decoration. It is a claim about who is actually present.",
    ]),
    deut(23, 15, 25, [
      "A servant who escapes to you is not sent back to his master. He lives among you, wherever he chooses, and you do not oppress him. Israel's law refuses to be a slave-catching machine for anyone who runs.",
      "No cult prostitution, and money earned that way cannot come into God's house as an offering, not even to pay off a vow. Some money is not allowed to buy its way clean.",
      "You may charge a foreigner interest, but never your own brother. And once a vow leaves your mouth, pay it. Moses adds an odd relief valve right after that. You may walk into your neighbor's field and eat your fill by hand. You just cannot bring a sickle or a basket. Hunger is allowed. Harvesting someone else's crop is not.",
      "Small mercy, small limit, held together in the same law. That is most of this chapter in one line.",
    ]),
    deut(24, 1, 13, [
      "A man who divorces his wife and she remarries cannot take her back if that second marriage ends. Whatever this law is doing, it is not encouraging easy divorce. It is closing a door once it opens.",
      "A newly married man gets a full year at home, free from war and business, to make his wife glad. In a book full of battle laws, this one clears the calendar for a marriage to actually start.",
      "Do not take a millstone in pledge for a debt, because that takes a man's food with it. Kidnapping a fellow Israelite to sell him is a capital crime. And Moses stops mid-list to say remember Miriam, a plain nod back to the leprosy that hit her for turning on Moses.",
      "If you take a poor man's cloak as security, give it back before sundown, because it is the only blanket he has. It shall be righteousness unto thee before the Lord thy God. Kindness to a debtor is called righteousness here, not softness.",
    ]),
    deut(24, 14, 22, [
      "Pay a hired man his wages the same day, because he is setting his heart on that money, and Moses says withholding it becomes sin unto you, not just unfairness to him.",
      "Fathers are not put to death for their children's sin, nor children for their fathers'. Guilt in this law stops at the person who actually did it.",
      "Do not twist justice against a foreigner, an orphan, or a widow, and do not take a widow's coat as a pledge either. Then the gleaning laws. A forgotten sheaf stays in the field. The olive tree is not beaten twice. The vineyard is not picked over a second time. All of it left on purpose for the stranger, the fatherless, and the widow.",
      "And the reason gets repeated one more time. Remember you were a slave in Egypt. That is why I command you this. Not a rule handed down from a safe distance. A rule from people who know exactly what it is to have nothing.",
    ]),
    deut(25, 1, 19, [
      "A guilty man can be beaten, but never more than forty stripes, so your brother is not made vile in your eyes. Even punishment has a ceiling here. Then, oddly placed right after it, do not muzzle the ox while it treads out the grain. Let the worker eat while it works, whether the worker has two legs or four.",
      "If a man dies with no son, his brother is expected to marry the widow and raise up a family in the dead man's name. If he refuses, she pulls his sandal off in front of the elders and spits in his face, and his household carries the name the sandal-pulled from then on. Public shame for refusing a duty owed to the dead.",
      "One violent law sits here too. If a woman defending her husband in a fight grabs the other man where it does her most harm, her hand is cut off, no pity. The one law in this whole stretch with a real physical penalty attached, right in the middle of a chapter about fairness.",
      "Keep one weight, one measure, honest both ways, because a lying scale is called an abomination here just like a lying idol was. And remember what Amalek did, ambushing the weak and the tired from behind when Israel had no strength left to fight back. Blot out the memory of that, Moses says. Not because vengeance is holy, but because that kind of cruelty is never supposed to be forgotten as ordinary.",
    ]),
  ],
  closing: [
    ["So that is Day 53.", 700],
    ["A stray ox brought home, a roof with a rail, a bird let go free, a scale that tells the truth.", 800],
    ["Small laws, but they all point the same direction. Faithfulness that only shows up in the big moments is not the faithfulness this book is asking for.", 800],
    ["And underneath the harder passages, the same reason keeps surfacing. Remember you were a slave in Egypt. Memory turned into how you treat the poor, the stranger, the widow, even a hired man's wages before sundown.", 850],
    ["Hold on to that Moabite exclusion from chapter 23. A woman named Ruth is coming, and this story is not finished deciding what to do with her.", 850],
    ["Tomorrow, Deuteronomy 26 through 29. Blessing, curse, and a covenant renewed on two mountains.", 850],
    ["For now, sit with the ox.", 750],
    ["Do not muzzle it while it works.", 750],
    ["Let the worker eat.", 1200],
  ],
};
