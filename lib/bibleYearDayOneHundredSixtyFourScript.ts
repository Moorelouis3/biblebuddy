import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 164, written to the Day 1 standard.
 *
 * Psalms 106-108: Psalm 106 answers Psalm 105 from the other side - the same
 * history, told this time as one long national confession. Psalm 107 zooms
 * down to four ordinary human rescues. Psalm 108 closes on personal resolve.
 * Six blocks, matching how Day 163's heavier three-psalm reading got split.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 164,
  title: "Mercy Despite Failure",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 164. Psalms 106 through 108.", 700],
    ["Yesterday's history psalm told God's side. Faithful through Abraham's tents, Joseph's chains, the plagues.", 800],
    ["Today's history psalm tells the same story from the other side. The people's side. And it opens with a confession.", 800],
    ["Then the tone shifts completely. Four ordinary people in four kinds of trouble, all rescued the same way.", 850],
    ["And the day closes with one man's heart already made up before he sings a word.", 800],
    ["We are in Psalms 106, 107, and 108.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(106, 1, 12, [
      "Praise ye the LORD. O give thanks unto the LORD; for he is good: for his mercy endureth for ever. Same opening as yesterday. Then it turns fast.",
      "We have sinned with our fathers, we have committed iniquity, we have done wickedly. No excuse offered. Three plain verbs, and the psalm has barely started.",
      "Our fathers understood not thy wonders in Egypt, yet he saved them for his name's sake, at the Red sea. The mercy came before it was earned. It always does in this psalm.",
      "Then believed they his words; they sang his praise. One verse of belief. Watch how fast that lasts.",
    ]),
    g(106, 13, 33, [
      "They soon forgat his works. Verse thirteen, right after verse twelve's song. The whole psalm's point, stated as fast as the forgetting happened.",
      "They made a calf in Horeb, and worshipped the molten image. Thus they changed their glory into the similitude of an ox that eateth grass. Traded the God who made everything for an animal that eats grass.",
      "He said that he would destroy them, had not Moses his chosen stood before him in the breach, to turn away his wrath. One man, standing in the gap, is the only reason the story keeps going.",
      "Later, at the waters of strife, it went ill with Moses for their sakes: he spake unadvisedly with his lips. Their rebellion cost their leader too. Moses pays for words spoken in their anger, not his.",
    ]),
    g(106, 34, 48, [
      "They served their idols, which were a snare unto them. Yea, they sacrificed their sons and their daughters unto devils. The psalm does not soften this. It names the worst of it plainly.",
      "The land was polluted with blood. Therefore was the wrath of the LORD kindled against his people. Cause and effect, stated without flinching.",
      "Nevertheless he regarded their affliction, when he heard their cry. Not because they earned it. Because he heard them. That is the hinge the whole psalm turns on.",
      "He remembered for them his covenant, and repented according to the multitude of his mercies. Multitude. Enough mercy stacked up to outlast every repeat failure this psalm just listed.",
    ]),
    g(107, 1, 22, [
      "O give thanks unto the LORD, for he is good: for his mercy endureth for ever. Let the redeemed of the LORD say so. New psalm, same opening line, but now it zooms down to four ordinary people.",
      "They wandered in the wilderness, hungry and thirsty, their soul fainted in them. Then they cried unto the LORD in their trouble, and he delivered them, and led them forth by the right way. Lost, then found.",
      "Such as sit in darkness and in the shadow of death, bound in affliction and iron, because they rebelled against the words of God. This group's trouble is their own doing. He breaks the chains anyway when they cry.",
      "Fools because of their transgression are afflicted; their soul abhorreth all manner of meat, and they draw near unto the gates of death. He sent his word, and healed them. His word does the healing, the same way it did on the first page of the Bible.",
    ]),
    g(107, 23, 43, [
      "They that go down to the sea in ships see the works of the LORD in the deep. He commandeth, and raiseth the stormy wind, which lifteth up the waves.",
      "They reel to and fro, and stagger like a drunken man, and are at their wits' end. That phrase comes straight from this verse. It still means exactly what it meant here.",
      "Then they cry unto the LORD, and he bringeth them out of their distresses. He maketh the storm a calm, so that the waves thereof are still. Wanderers, prisoners, the sick, and now sailors. Same pattern, four times over.",
      "Whoso is wise, and will observe these things, even they shall understand the lovingkindness of the LORD. The psalm ends by asking you directly whether you noticed the pattern it just showed you four times.",
    ]),
    g(108, 1, 13, [
      "O God, my heart is fixed; I will sing and give praise, even with my glory. After a whole psalm of Israel's forgetting, David opens this one with a decision already made before he sings a note.",
      "God hath spoken in his holiness. I will divide Shechem, and mete out the valley of Succoth. Gilead is mine; Manasseh is mine. Moab is my washpot; over Edom will I cast out my shoe. God talks about the land the way a landlord walks his own property.",
      "Who will bring me into the strong city? Wilt not thou, O God, who hast cast us off? David is still a king with an army, and he still asks the question first.",
      "Through God we shall do valiantly: for he it is that shall tread down our enemies. Vain is the help of man, he says two verses earlier. A soldier-king saying human strength alone is worthless.",
    ]),
  ],
  closing: [
    ["So that is Day 164.", 700],
    ["Psalm 106 confesses centuries of forgetting. Psalm 107 shows four people rescued the same simple way. Psalm 108 ends on a heart already fixed.", 800],
    ["Three different psalms, and the hinge is the same line every time. He regarded their affliction, when he heard their cry.", 800],
    ["Not earned. Just heard.", 850],
    ["And that phrase from Psalm 107 is still around. At their wits' end. Written for sailors in a storm three thousand years ago, still true for whatever has you reeling this week.", 850],
    ["Tomorrow, Psalms 109 through 111. One psalm asking God to judge an enemy. One about a King who is also a priest forever. One alphabet psalm on the fear of the LORD.", 850],
    ["For now, hold on to David's line from Psalm 108.", 800],
    ["My heart is fixed.", 750],
    ["Decided before the song even starts.", 1200],
  ],
};
