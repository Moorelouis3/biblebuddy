import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 142, written to the Day 1 standard.
 *
 * Psalms 40-42: a rescue that turns into obedience, the psalm that closes
 * Book I of the Psalter with a friend's betrayal Jesus later quotes about
 * Judas, and a soul thirsting for God the way a dying deer thirsts for
 * water. Psalm 40 splits at its own turn from praise into urgent need;
 * Psalm 41 splits at the betrayal and the doxology that ends Book I;
 * Psalm 42 splits at its repeated refrain, "why art thou cast down."
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 142,
  title: "Rescue, Obedience, and Thirst for God",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 142.", 750],
    ["Yesterday ended on a question about how short a life is.", 750],
    ["Today starts with an answer. David waited, and the LORD pulled him out of the pit.", 800],
    ["Psalm forty is rescue, and the obedience it leads to.", 800],
    ["Psalm forty-one closes the first book of Psalms with a friend's betrayal that Jesus himself later quotes.", 850],
    ["And Psalm forty-two is a soul thirsting for God like a deer dying of thirst.", 850],
    ["We are in Psalms 40 through 42.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(40, 1, 11, [
      "I waited patiently for the LORD; and he inclined unto me, and heard my cry. He brought me up also out of an horrible pit, out of the miry clay, and set my feet upon a rock. Patient waiting is not passive here. It ends with solid ground under his feet.",
      "And he hath put a new song in my mouth, even praise unto our God: many shall see it, and fear, and shall trust in the LORD. The rescue is not just for him. Other people watching it happen is part of the point.",
      "Sacrifice and offering thou didst not desire; mine ears hast thou opened... I delight to do thy will, O my God: yea, thy law is within my heart. Opened ears before an obedient heart. Hearing comes first, and it changes what the sacrifice even means.",
      "I have preached righteousness in the great congregation... I have not concealed thy lovingkindness and thy truth from the great congregation. He does not keep what God did for him private. A rescue that stays quiet is only half finished.",
    ]),
    g(40, 12, 17, [
      "For innumerable evils have compassed me about: mine iniquities have taken hold upon me... they are more than the hairs of mine head: therefore my heart faileth me. The same man who just sang a new song now names a heart that is failing. Both are true in the same psalm.",
      "Be pleased, O LORD, to deliver me: O LORD, make haste to help me. No lead-up this time. The praise from a few verses ago does not buy him patience now. He asks straight out, and fast.",
      "Let all those that seek thee rejoice and be glad in thee: let such as love thy salvation say continually, The LORD be magnified. Even mid-crisis, he asks for other people's joy before circling back to his own need.",
      "But I am poor and needy; yet the Lord thinketh upon me: thou art my help and my deliverer; make no tarrying, O my God. Poor and needy, and thought of. He holds both without contradiction.",
    ]),
    g(41, 1, 6, [
      "Blessed is he that considereth the poor: the LORD will deliver him in time of trouble. The LORD will strengthen him upon the bed of languishing. The psalm opens with a promise about someone else's kindness before it ever reaches David's own sickbed.",
      "I said, LORD, be merciful unto me: heal my soul; for I have sinned against thee. Same move as Psalm thirty-eight. Guilt named first, plainly, with no one else to blame.",
      "Mine enemies speak evil of me, When shall he die, and his name perish?... he telleth it abroad. They visit him while he is sick and carry the gossip out the door with them.",
      "All that hate me whisper together against me: against me do they devise my hurt. Whispering, not shouting. The cruelty here is quiet, and that makes it worse, not better.",
    ]),
    g(41, 7, 13, [
      "An evil disease, say they, cleaveth fast unto him: and now that he lieth he shall rise up no more. Yea, mine own familiar friend, in whom I trusted, which did eat of my bread, hath lifted up his heel against me. Not a stranger. Someone who shared meals at his table. Centuries later, Jesus quotes this exact verse about Judas.",
      "By this I know that thou favourest me, because mine enemy doth not triumph over me. He does not measure God's favor by the absence of enemies. He measures it by the outcome of the fight.",
      "And as for me, thou upholdest me in mine integrity, and settest me before thy face for ever. After naming betrayal by name, he still calls himself upheld in integrity. Being wronged did not make him bitter or dishonest in return.",
      "Blessed be the LORD God of Israel from everlasting, and to everlasting. Amen, and Amen. That closes the first of the Psalter's five books, and it ends on praise, not on the friend who betrayed him.",
    ]),
    g(42, 1, 6, [
      "As the hart panteth after the water brooks, so panteth my soul after thee, O God. My soul thirsteth for God, for the living God. A deer panting for water is not being poetic. It is dying of thirst. That is the comparison he chooses.",
      "My tears have been my meat day and night, while they continually say unto me, Where is thy God? He is being fed by weeping instead of food, while people around him needle him with the one question that hurts most.",
      "For I had gone with the multitude... to the house of God, with the voice of joy and praise. He is not grieving a faith he never had. He is grieving the exact worship he used to walk in and cannot reach right now.",
      "Why art thou cast down, O my soul? and why art thou disquieted in me? hope thou in God: for I shall yet praise him. He talks to his own soul like it is a separate person, and argues it toward hope instead of just describing the despair.",
    ]),
    g(42, 7, 11, [
      "Deep calleth unto deep at the noise of thy waterspouts: all thy waves and thy billows are gone over me. Not one wave. Wave after wave, deep answering deep, like the flood itself is calling in reinforcements.",
      "Yet the LORD will command his lovingkindness in the daytime, and in the night his song shall be with me. Right inside the drowning image, he places a yet. The waves are real, and so is the song still playing under them.",
      "I will say unto God my rock, Why hast thou forgotten me?... As with a sword in my bones, mine enemies reproach me. He still calls God my rock in the very sentence where he accuses God of forgetting him. Both at once, without letting go of either.",
      "Why art thou cast down, O my soul?... hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God. The exact refrain from a few verses back, repeated word for word. He has to tell himself the same thing twice in one psalm, and that repetition is not weakness.",
    ]),
  ],
  closing: [
    ["So that is Day 142.", 700],
    ["Rescue that turns into a new song, a friend's betrayal that did not turn David bitter, and a soul that argues itself back toward hope.", 850],
    ["Notice the refrain in Psalm forty-two.", 700],
    ["Why art thou cast down, O my soul? Hope thou in God.", 800],
    ["He says it in verse five, then says the exact same thing again in verse eleven.", 850],
    ["Some days, once is not enough. You have to tell your own soul twice.", 850],
    ["Tomorrow, Psalms 43 through 45. Hope, victory, and the King.", 800],
    ["For now, if your soul feels cast down today,", 750],
    ["hope thou in God.", 800],
    ["You will praise him again.", 1200],
  ],
};
