import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 156, written to the Day 1 standard.
 *
 * Psalms 82-84: God puts human judges on trial for how they treat the poor,
 * a coalition of real named nations plots to erase Israel, and one man says
 * he would rather stand at the door of God's house than live anywhere else.
 * Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 156,
  title: "Justice and Longing for God's House",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 156. Psalms 82 through 84.", 700],
    ["God puts human judges on trial for how they treat the poor.", 750],
    ["A whole coalition of real nations plots to erase Israel's name completely.", 800],
    ["And one man says he would rather stand at the door of God's house than live comfortably anywhere else.", 850],
    ["Justice, danger, and longing, back to back.", 750],
    ["We are in Psalms 82, 83, and 84.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(82, 1, 8, [
      "God standeth in the congregation of the mighty; he judgeth among the gods. How long will ye judge unjustly, and accept the persons of the wicked? The scene is a courtroom, and the ones on trial are the earth's own judges and rulers.",
      "Defend the poor and fatherless: do justice to the afflicted and needy. Deliver the poor and needy: rid them out of the hand of the wicked. The charge against them is not vague. It is exactly this. What did you do for the ones with no power to demand it themselves?",
      "I have said, Ye are gods; and all of you are children of the most High. But ye shall die like men, and fall like one of the princes. They were handed real authority and a title to match. The very next line cuts it back down to size. Authority does not make anyone exempt from dying.",
      "Arise, O God, judge the earth: for thou shalt inherit all nations. Human courts failed, so the psalm ends by asking the one Judge who will not.",
    ]),
    g(83, 1, 8, [
      "Keep not thou silence, O God: hold not thy peace, and be not still, O God. For, lo, thine enemies make a tumult: and they that hate thee have lifted up the head. The urgency is immediate. Something is already happening, loudly, while God appears quiet.",
      "They have said, Come, and let us cut them off from being a nation; that the name of Israel may be no more in remembrance. This is not a border dispute. The stated goal is erasure, the end of the name itself.",
      "The tabernacles of Edom, and the Ishmaelites; of Moab, and the Hagarenes; Gebal, and Ammon, and Amalek; the Philistines with the inhabitants of Tyre; Assur also is joined with them. The psalm names the coalition one nation at a time, a real roster, not a rumor.",
      "They have holpen the children of Lot. Even old family ties get pulled into it. This threat is named specifically because it is real, not because the psalm needs an enemy to be afraid of.",
    ]),
    g(83, 9, 18, [
      "Do unto them as unto the Midianites; as to Sisera, as to Jabin, at the brook of Kison: which perished at Endor. The prayer reaches for precedent, naming past defeats Israel still remembered by name generations later.",
      "O my God, make them like a wheel; as the stubble before the wind. As the fire burneth a wood, and as the flame setteth the mountains on fire. The images turn violent and specific, and the psalm does not soften a single one of them.",
      "Fill their faces with shame; that they may seek thy name, O LORD. But watch where the request actually lands. Even their defeat is aimed at them turning toward God, not simply at their ruin for its own sake.",
      "That men may know that thou, whose name alone is JEHOVAH, art the most high over all the earth. Every hard line before this one was in service of that single sentence.",
    ]),
    g(84, 1, 4, [
      "How amiable are thy tabernacles, O LORD of hosts! My soul longeth, yea, even fainteth for the courts of the LORD: my heart and my flesh crieth out for the living God. The tone changes completely here. From a coalition of enemies to someone who simply misses being near God.",
      "Yea, the sparrow hath found an house, and the swallow a nest for herself, where she may lay her young, even thine altars, O LORD of hosts, my King, and my God. He notices a bird that has built its nest right at the altar itself.",
      "That small detail carries the whole ache of the psalm. A sparrow has permanent access to the exact place he can only long for from a distance.",
      "Blessed are they that dwell in thy house: they will be still praising thee. And still he does not turn bitter about it. He blesses the ones who already have what he wants.",
    ]),
    g(84, 5, 8, [
      "Blessed is the man whose strength is in thee; in whose heart are the ways of them. This blessing is for someone already walking toward that house, a pilgrim partway there rather than someone who has arrived.",
      "Who passing through the valley of Baca make it a well; the rain also filleth the pools. Baca means weeping. A place named for grief becomes a spring, simply because of who is walking through it.",
      "They go from strength to strength, every one of them in Zion appeareth before God. The road itself builds them rather than wearing them down, the way a hard journey normally would.",
      "O LORD God of hosts, hear my prayer: give ear, O God of Jacob. The longing turns back into a direct request, quieter than psalm 83's urgency but made of the same ache.",
    ]),
    g(84, 9, 12, [
      "Behold, O God our shield, and look upon the face of thine anointed. His own longing gets tied to the nation's king, asking God to look after the leader the same way he longs to be looked after.",
      "For a day in thy courts is better than a thousand. I had rather be a doorkeeper in the house of my God, than to dwell in the tents of wickedness. This is the line the whole psalm is remembered for, and it is not asking for comfort. It is asking for proximity.",
      "He does not ask to be the guest of honor. He asks for the lowest job in the building, just so he can stay close to it.",
      "For the LORD God is a sun and shield: the LORD will give grace and glory: no good thing will he withhold from them that walk uprightly. O LORD of hosts, blessed is the man that trusteth in thee. It ends exactly where it began. Blessed is the one who trusts him.",
    ]),
  ],
  closing: [
    ["So that is Day 156.", 700],
    ["A courtroom, a coalition, and a doorway.", 700],
    ["Psalm 82 puts the powerful on trial for exactly one thing. Not doctrine. How they treated the poor and the fatherless.", 800],
    ["Psalm 83 names real enemies by name, and still aims its hardest request at them turning toward God, not just losing.", 850],
    ["And Psalm 84 says the ache of missing God's presence can turn a valley of weeping into a well, just by walking through it toward Him.", 850],
    ["Three psalms, three very different needs, and the same thread underneath all of them. Being near God is worth more than being safe, right, or comfortable.", 850],
    ["Tomorrow, Psalms 85 through 87. Revival prayed for, and a hope for Zion big enough to include the whole world.", 850],
    ["For now, hold on to the line that says the most with the fewest words.", 750],
    ["I had rather be a doorkeeper in the house of my God.", 800],
    ["Than to dwell in the tents of wickedness.", 1200],
  ],
};
