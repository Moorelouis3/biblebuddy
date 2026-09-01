import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 67, written to the Day 1 standard.
 *
 * Judges 20-21 closes the book with civil war against Benjamin and two
 * loopholes stitched together to keep the tribe from disappearing entirely;
 * Ruth 1-2 opens immediately after with a Moabite widow's loyalty and her
 * first encounter with Boaz. Seven blocks across two books, consolidating
 * the three battles of Judges 20 the way Day 66 consolidated Samson's death.
 */

const judg = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Judges ${chapter}:${startVerse}-${endVerse}`,
  book: "judges",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const ruth = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ruth ${chapter}:${startVerse}-${endVerse}`,
  book: "ruth",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 67,
  title: "Civil War and Ruth's Loyal Love",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 67. Judges ends today. Ruth begins today.", 750],
    ["Israel just heard what happened at Gibeah. Now the whole nation goes to war over it.", 800],
    ["By the end of two chapters, one tribe is almost erased from the earth.", 800],
    ["Then the book closes, and something completely different opens. A famine, a foreign daughter-in-law, and a line that will not let go.", 850],
    ["We are in Judges 20 and 21, and Ruth 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    judg(20, 1, 17, [
      "Four hundred thousand men gather at Mizpah as one man. That phrase is used on purpose. After a whole book of judges and tribes acting alone, Israel finally moves together. Over this.",
      "The Levite tells them exactly what happened. Nothing softened. The men of Gibeah meant to kill me. They forced my concubine instead, and she is dead.",
      "Israel sends word to Benjamin. Hand over the wicked men of Gibeah. One tribe, asked to do the smallest, most obvious thing. Turn over the guilty.",
      "Benjamin refuses. Twenty-six thousand swordsmen muster to defend the men who did it. A whole tribe chooses loyalty to its own over what is right.",
    ]),
    judg(20, 18, 48, [
      "Israel asks God who should go up first, and God says Judah. The same question and the same answer that opened this entire book. Then Israel loses. Twenty-two thousand men, in one day, fighting their own brothers.",
      "They weep, they ask again, God says go up again, and they lose eighteen thousand more. Twice they are told yes and twice they are cut down. Obedience here does not mean an easy win.",
      "The third time they fast and offer sacrifices, and finally hear it plainly. Tomorrow I will deliver them into your hand. This time there is an ambush. Israel fakes a retreat, draws Benjamin out of the city, and smoke goes up behind them.",
      "By nightfall twenty-five thousand Benjamite swordsmen are dead. Six hundred men escape to a rock called Rimmon and hide there for four months. That is all that is left of an entire tribe.",
    ]),
    judg(21, 1, 15, [
      "Only after the killing stops does Israel remember the oath they made before it started. None of us will give a daughter to Benjamin. Now they weep at Bethel over a tribe they nearly erased with their own hands.",
      "They find one loophole for the oath. The men of Jabesh-Gilead never came to the assembly, so they were never bound by it. Twelve thousand men go and kill the whole city, sparing only four hundred young women.",
      "Those four hundred are handed to the six hundred survivors at the rock. Still two hundred men short of a wife.",
      "So a war meant to punish one atrocity ends with Israel committing another one to patch the damage. Nobody stops to ask if this is right. They only ask if it is technically allowed.",
    ]),
    judg(21, 16, 25, [
      "The elders find one more workaround. At the yearly feast in Shiloh, the daughters of the town come out to dance. Tell the Benjamites to hide in the vineyards and each grab a wife for himself.",
      "That way, the elders reason, no father actually gave his daughter. She was caught, not given. The oath stays technically unbroken while the thing the oath was meant to prevent happens anyway.",
      "Benjamin does it. Six hundred men rebuild their cities, their families, their inheritance, on daughters taken by ambush from a festival crowd.",
      "And Judges ends on the line it has been building toward the whole book. In those days there was no king in Israel. Every man did what was right in his own eyes. That is not a summary. It is a verdict.",
    ]),
    ruth(1, 1, 14, [
      "Same era, same broken world, in the days when the judges ruled, and a family from Bethlehem leaves during a famine and settles in Moab. Elimelech, Naomi, and their two sons.",
      "Elimelech dies. The sons marry Moabite women, Orpah and Ruth. Then, about ten years later, both sons die too. Naomi is left with no husband, no sons, in a foreign country.",
      "She hears the famine has ended back home and starts back toward Bethlehem. On the road she tells both daughters-in-law to turn back. Go home. Find new husbands. Let me go the rest of the way alone.",
      "She is not being cold. She has nothing left to offer them. It grieveth me much for your sakes, that the hand of the Lord is gone out against me. She believes she is cursed, and she does not want to drag them into it.",
    ]),
    ruth(1, 15, 22, [
      "Orpah kisses Naomi goodbye and goes home. Nobody condemns her for it. It is the reasonable choice.",
      "Ruth does the opposite. Whither thou goest, I will go. Thy people shall be my people, and thy God my God. Where thou diest, I will die. She is choosing a foreign God, a foreign land, and a future with nothing guaranteed in it.",
      "Naomi stops arguing once she sees Ruth means it. They walk into Bethlehem together, and the whole town stirs. Is this Naomi?",
      "Call me Mara, she says. Bitter. Because the Almighty has dealt very bitterly with me. I went out full, and the Lord has brought me home empty. She does not know yet that she is not actually empty. Ruth is standing right next to her.",
    ]),
    ruth(2, 1, 23, [
      "Ruth goes out to glean leftover grain in the fields, which the law allowed the poor to do, and she happens to end up in a field belonging to Boaz. A relative of Naomi's dead husband.",
      "Boaz notices her before she notices him. Whose young woman is this. Told she is the Moabite who came back with Naomi, and that she has worked since morning without stopping.",
      "He tells her to stay in his field, drink from his workers' water, and quietly orders the young men to drop extra grain on purpose and let her take it. Ruth asks why a foreigner gets this kind of favor.",
      "Boaz answers plainly. He has heard everything she did for Naomi. Left her own father and mother and homeland for a people she never knew. The Lord repay thy work, he says, under whose wings thou art come to trust. Then Naomi hears the man's name and says the word that changes everything. He is one of our kinsmen. One of our redeemers.",
    ]),
  ],
  closing: [
    ["So that is Day 67.", 700],
    ["Judges ends with a civil war that nearly wipes out an entire tribe, and two loopholes stitched together just to keep it from happening completely.", 800],
    ["No king in Israel. Everyone doing what was right in his own eyes. You just watched exactly what that costs.", 800],
    ["Then, in the very next chapter, a Moabite widow chooses loyalty over safety, and walks into Bethlehem with nothing but her mother-in-law and a foreign God she just adopted as her own.", 850],
    ["Boaz notices her before she asks for anything. Grace finds her in a grain field.", 800],
    ["Naomi called herself empty. She was not. Ruth was standing right next to her the whole time.", 850],
    ["Tomorrow, Ruth 3 and 4, and 1 Samuel 1 and 2. A kinsman-redeemer, a wedding, and a boy named Samuel.", 900],
    ["For now, sit with the difference between two chapters.", 800],
    ["No king in Israel, everyone for himself.", 750],
    ["And one woman who said, your people will be my people.", 1200],
  ],
};
