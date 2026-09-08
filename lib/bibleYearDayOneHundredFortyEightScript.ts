import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 148, written to the Day 1 standard.
 *
 * Psalms 58-60: corrupt judges called out by name, a man circled every
 * evening by the same threat, and a nation admitting God has been against
 * them before asking Him to turn back. Six blocks across the three psalms.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 148,
  title: "Justice and Restoration",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 148. Psalms 58 through 60.", 700],
    ["A prayer against corrupt judges who never meant to be fair.", 750],
    ["A prayer from a man circled every night by the same threat.", 800],
    ["And a prayer from a whole nation admitting God has been against them.", 850],
    ["Justice for the wicked. Restoration for everyone else. That is the shape of today.", 800],
    ["We are in Psalms 58, 59, and 60.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(58, 1, 5, [
      "Do ye indeed speak righteousness, O congregation? do ye judge uprightly, O ye sons of men? Straight to the people who are supposed to be handing out justice. The question already has its answer.",
      "The wicked are estranged from the womb: they go astray as soon as they be born, speaking lies. Not a slow slide into corruption. He says this is who they have been from the start.",
      "Their poison is like the poison of a serpent: they are like the deaf adder that stoppeth her ear. A snake does not listen to reason. Neither do they, and the psalm stops pretending otherwise.",
      "Which will not hearken to the voice of charmers, charming never so wisely. However skilled the appeal, it does not reach them. Some people cannot be talked out of what they are.",
    ]),
    g(58, 6, 11, [
      "Break their teeth, O God, in their mouth: break out the great teeth of the young lions, O Lord. He is not asking for a subtle correction. He wants the danger disarmed completely.",
      "As a snail which melteth, let every one of them pass away: like the untimely birth of a woman, that they may not see the sun. Harsh images, on purpose. He wants their power to end before it does more damage.",
      "The righteous shall rejoice when he seeth the vengeance: he shall wash his feet in the blood of the wicked. Uncomfortable to hear. The psalm does not soften it, so we should not pretend it says something gentler.",
      "Verily there is a reward for the righteous: verily he is a God that judgeth in the earth. That is the actual point of the whole psalm. Not cruelty for its own sake. Proof that justice is real and someone is watching.",
    ]),
    g(59, 1, 8, [
      "Deliver me from mine enemies, O my God: defend me from them that rise up against me. Straightforward. He names exactly what he needs before he explains anything else.",
      "They lie in wait for my soul: the mighty are gathered against me; not for my transgression, nor for my sin, O Lord. He is careful here. He is not being punished for something he did. This attack has no cause he can point to in himself.",
      "They return at evening: they make a noise like a dog, and go round about the city. Not a single ambush. A routine. Every evening, the same threat circling again.",
      "But thou, O Lord, shalt laugh at them; thou shalt have all the heathen in derision. Whatever menace they think they carry, it does not reach God. From where He sits, the threat is small.",
    ]),
    g(59, 9, 17, [
      "Because of his strength will I wait upon thee: for God is my defence. He is not waiting because nothing is happening. He is waiting because he has decided where his safety actually comes from.",
      "Slay them not, lest my people forget: scatter them by thy power. An odd request. He does not want a quick ending. He wants the outcome remembered, so scatter them slowly enough that people notice.",
      "Let them wander up and down for meat, and grudge if they be not satisfied. The men who circled the city like dogs all evening end up hungry and restless themselves. The image comes back, flipped.",
      "I will sing of thy power; yea, I will sing aloud of thy mercy in the morning: for thou hast been my defence and refuge in the day of my trouble. The evening was full of dogs at the wall. Morning is full of singing. Nothing about the enemy had to change first.",
    ]),
    g(60, 1, 5, [
      "O God, thou hast cast us off, thou hast scattered us, thou hast been displeased; O turn thyself to us again. This one does not open with an enemy. It opens with God's own people admitting God has been against them.",
      "Thou hast made the earth to tremble; thou hast broken it: heal the breaches thereof; for it shaketh. He does not ask God to explain the damage. He asks God to fix it, because only the one who broke it can heal it.",
      "Thou hast shewed thy people hard things: thou hast made us to drink the wine of astonishment. Not metaphorical politeness. He says plainly that God let this happen, and it left them staggering.",
      "Thou hast given a banner to them that fear thee, that it may be displayed because of the truth. In the middle of the wreckage, one thing still stands for people to rally around. The truth did not fall with everything else.",
    ]),
    g(60, 6, 12, [
      "God hath spoken in his holiness; I will rejoice, I will divide Shechem, and mete out the valley of Succoth. After the complaint, God answers, and the whole tone of the psalm changes with it.",
      "Moab is my washpot; over Edom will I cast out my shoe. Blunt, almost dismissive language for nations that once looked threatening. Whatever scared them before does not scare God at all.",
      "Give us help from trouble: for vain is the help of man. He has just listed what God can do to entire nations, and still says plainly that people cannot save him. Strength like that does not come from allies.",
      "Through God we shall do valiantly: for he it is that shall tread down our enemies. The psalm started with God against them. It ends with God fighting for them. Nothing changed but where they turned.",
    ]),
  ],
  closing: [
    ["So that is Day 148.", 700],
    ["Corrupt judges confronted, enemies circling at night, and a nation asking God to turn back toward them.", 750],
    ["Psalm 58 says justice is not decoration. Somebody really is judging the earth.", 800],
    ["Psalm 59 says you can wait for rescue and still sing before it fully arrives.", 800],
    ["And Psalm 60 says even a defeat God allowed is a defeat God can heal.", 850],
    ["Tomorrow, Psalms 61 through 63. A heart that is overwhelmed, and a soul that still thirsts for God.", 850],
    ["For now, hold on to the banner.", 800],
    ["Still standing in the wreckage.", 750],
    ["Because the truth did not fall.", 1200],
  ],
};
