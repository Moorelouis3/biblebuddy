import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 68, written to the Day 1 standard.
 *
 * Ruth 3-4 closes Ruth with the threshing floor and the gate, ending in
 * David's genealogy; 1 Samuel 1-2 opens the next book with Hannah's vow and
 * Samuel's birth, set against the corruption of Eli's sons. Seven blocks
 * across two books, splitting each chapter at its natural turn.
 */

const ruth = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ruth ${chapter}:${startVerse}-${endVerse}`,
  book: "ruth",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 68,
  title: "Redemption and Samuel's Birth",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 68. Ruth finishes today. 1 Samuel begins today.", 750],
    ["A midnight proposal on a threshing floor. A shoe pulled off at the city gate. And then a very different kind of desperate prayer, from a woman named Hannah.", 850],
    ["Both stories end the same way. A birth nobody could have arranged on their own.", 800],
    ["One leads straight to King David. The other leads straight to the prophet who will anoint him.", 800],
    ["We are in Ruth 3 and 4, and 1 Samuel 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ruth(3, 1, 9, [
      "Naomi finally makes a move. She tells Ruth exactly what to do. Wash, dress, go down to the threshing floor tonight, and wait until Boaz has eaten and is settled for the night.",
      "Ruth does exactly what she is told. She waits until Boaz lies down at the end of the grain pile, then comes quietly, uncovers his feet, and lies down there herself.",
      "At midnight he wakes startled and finds a woman at his feet. Who art thou, he asks. I am Ruth thine handmaid, she says. Spread therefore thy skirt over thine handmaid, for thou art a near kinsman.",
      "That is not a vague request. It is the exact language of a marriage proposal, asking him to take on the kinsman-redeemer role for her and for Naomi's family line. A widow with nothing, asking a man of standing to cover her.",
    ]),
    ruth(3, 10, 18, [
      "Boaz blesses her before he does anything else. This kindness is better than the first, he says, because she did not run after younger men, rich or poor. He already knows the whole town calls her a virtuous woman.",
      "Then he tells her the one complication. There is a kinsman nearer than I. If he will do the part of a kinsman, good. If not, as the Lord liveth, I will redeem thee. He will not cut corners even for something he clearly wants.",
      "She stays at his feet until just before dawn, and he sends her home before anyone can recognize her leaving. Then he loads her with six measures of barley. Go not empty to thy mother-in-law, he says.",
      "Naomi hears all of it and says one thing. Sit still, my daughter, until thou know how the matter will fall, for the man will not rest until he has finished the thing this day. She knows Boaz. He will not let this wait.",
    ]),
    ruth(4, 1, 12, [
      "Boaz goes straight to the city gate, the place where legal business got settled, and sits down. The nearer kinsman happens to pass by, and Boaz calls him over along with ten elders as witnesses.",
      "He lays it out. Naomi is selling Elimelech's land. The man wants it. Then Boaz adds the part that changes everything. Buy the field, and you also take Ruth the Moabitess, to raise up the name of the dead on his inheritance.",
      "The man refuses on the spot. I cannot redeem it for myself, lest I mar mine own inheritance. Redeem it thyself. He will take free land. He will not take a wife with no guarantee of an heir who could split his own estate.",
      "So they seal it the old way. He pulls off his sandal and hands it to Boaz in front of everyone. Before the whole town, Boaz declares that he has bought it all, land and widow together, and the elders answer with a blessing over the woman coming into his house.",
    ]),
    ruth(4, 13, 22, [
      "Boaz marries Ruth. The Lord gives her conception, and she bears a son. The barren years in Moab, the two dead husbands, the walk back to Bethlehem with nothing. All of it ends in a birth.",
      "The women of the town go to Naomi, not Ruth, with the news. Blessed be the Lord, which hath not left thee this day without a kinsman. Then they say something remarkable about a Moabite daughter-in-law. She is better to thee than seven sons.",
      "Naomi takes the baby and holds him against her own body. The neighbor women name him themselves. There is a son born to Naomi. And they call his name Obed.",
      "Then the book ends with a genealogy nobody asked for, and it lands like a punch line. Obed becomes the father of Jesse. Jesse becomes the father of David. A famine, a foreign widow, and a field of barley, and it runs straight into the family line of Israel's greatest king.",
    ]),
    sam(1, 1, 18, [
      "Elkanah has two wives. Peninnah has children. Hannah has none, and every year at Shiloh, Peninnah makes sure she knows it. Scripture says it plainly. Her adversary provoked her sore, to make her fret.",
      "Elkanah loves her and does not understand her grief. Am not I better to thee than ten sons? Kindness is not always the same thing as being heard.",
      "Hannah goes to the temple and prays in bitterness of soul, weeping so hard she cannot even finish sentences out loud. She vows that if God gives her a son, she will give him right back, his whole life, and no razor will ever touch his head.",
      "Eli watches her lips move with no sound and assumes she is drunk. She is not defending herself out of pride. I have poured out my soul before the Lord, she says. Eli tells her to go in peace, and for the first time in the story, her face is not sad anymore.",
    ]),
    sam(1, 19, 28, [
      "The Lord remembers Hannah. She conceives and names the boy Samuel, because, she says, I have asked him of the Lord. The name itself is the whole prayer, spoken back as a fact.",
      "When the other men go up for the yearly sacrifice, Hannah stays home. Not until the child is weaned, she says. Then I will bring him, that he may appear before the Lord and abide there forever. Elkanah does not argue with her.",
      "She nurses him for years before she is finished. Then she carries him herself to Eli at Shiloh and hands him over for good.",
      "As long as he liveth, he shall be lent to the Lord, she tells the priest. She got exactly what she asked for, and the first thing she does with it is give it away.",
    ]),
    sam(2, 1, 36, [
      "Hannah's prayer is not thank you for my son. It is a song about how God runs the world. He brings low and lifts up. He raises the poor from the dust. The barren has many children, and the full go hungry. Her one story becomes a pattern for how God works everywhere.",
      "Then the scene turns hard. Eli's own sons, Hophni and Phinehas, are priests who serve at that same tabernacle and treat the sacrifices like their private property, taking meat by force before the fat is even offered to God. Men abhorred the offering of the Lord, Scripture says, because of them.",
      "Eli hears about it and rebukes them, but weakly. Why do ye such things? If a man sin against the Lord, who shall pray for him? He asks the right question and does nothing to stop it.",
      "A prophet arrives and pronounces the sentence directly. Both your sons will die on the same day, and God will raise up a faithful priest to replace this whole line. Samuel, still a boy sleeping near the ark, is already standing in the gap Eli's own sons refused to fill.",
    ]),
  ],
  closing: [
    ["So that is Day 68.", 700],
    ["Ruth ends exactly where it needed to. A field, a shoe, a redeemed inheritance, and a baby named Obed who grows up to be David's grandfather.", 850],
    ["Naomi went out empty. She came home holding her grandson.", 800],
    ["Then Hannah walks in with her own kind of emptiness, and prays so hard a priest thinks she's drunk. God remembers her too.", 800],
    ["She gives Samuel back the moment she is done nursing him. Not because she stopped wanting him. Because she meant the vow.", 850],
    ["And right behind her joy sits Eli's house, falling apart from the inside, run by sons who treated God's altar like their own kitchen.", 850],
    ["Tomorrow, 1 Samuel 3 through 6. Samuel hears God's voice for the first time, and the ark itself gets carried into a battle Israel should never have fought.", 900],
    ["For now, sit with two women who had nothing, and gave everything back anyway.", 850],
    ["Ruth said, your people will be my people.", 750],
    ["Hannah said, I have lent him to the Lord.", 1200],
  ],
};
