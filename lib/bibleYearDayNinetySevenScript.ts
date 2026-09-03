import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 97, written to the Day 1 standard.
 *
 * 1 Chronicles 13-16 is the ark's homecoming told twice: the careless first
 * attempt that kills Uzza, and the corrected second attempt that ends in the
 * loudest, longest worship scene in the book so far - David's psalm of
 * thanksgiving. Seven blocks across four chapters, matching Days 94-96.
 */

const chron1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "1 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 97,
  title: "The Ark Comes to Jerusalem",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 97. Yesterday, all Israel gathered around David with joy.", 700],
    ["Today he goes after the one thing that celebration was still missing.", 750],
    ["The ark of God. Nobody has gone near it in years.", 800],
    ["David brings it home the easy way first, and a man dies before it even arrives.", 900],
    ["Then he does it again, the hard way, and it becomes the loudest day of worship in the whole book.", 850],
    ["We are in 1 Chronicles 13 through 16. A death, a correction, and a psalm that will not stop giving thanks.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron1(13, 1, 14, [
      "David asks the whole nation, not just the priests, and everyone says yes. This is not one man's idea. It's a country that has missed God's presence and wants it back.",
      "So they put the ark on a new cart, exactly the way the Philistines shipped it back in 1 Samuel 6. It looks reasonable. Nobody in this chapter remembers that the ark was supposed to travel on the shoulders of Levites, under poles, never touched.",
      "The oxen stumble, Uzza reaches out to steady it, and he dies right there, in the middle of the celebration. The text does not soften it: the anger of the Lord was kindled against Uzza, and there he died before God.",
      "David gets angry, then afraid, and parks the ark at a stranger's house instead of finishing the trip. And God blesses that house anyway. Getting close to God was never meant to be casual.",
    ]),
    chron1(14, 1, 17, [
      "Hiram sends cedar and craftsmen, and David realizes something: the Lord had confirmed him king. Success is starting to look less like his own doing.",
      "Then the Philistines hear David is anointed and come looking for him. This time he does something he skipped in chapter 13. He enquires of God before he moves. Shall I go up, and wilt thou deliver them into mine hand?",
      "God says go, and David wins, and names the place for what happened. God hath broken in upon mine enemies by mine hand, like the breaking forth of waters.",
      "The Philistines come back, and God gives a completely different plan the second time - wait for a sound in the treetops. Same enemy, same king, new instructions. Obedience is not a formula you learn once and reuse.",
    ]),
    chron1(15, 1, 15, [
      "David tries again, and this time he says the sentence he should have said in chapter 13. None ought to carry the ark of God but the Levites, for them hath the Lord chosen.",
      "Then he says out loud exactly what went wrong the first time. Because ye did it not at the first, the Lord our God made a breach upon us, for that we sought him not after the due order. He names his own mistake without excusing it.",
      "So he calls specific families by name - Kohath, Merari, Gershom, Elizaphan, Hebron, Uzziel - and tells them to sanctify themselves before they touch anything.",
      "This time the ark goes up exactly the way it was written down generations earlier, on human shoulders, with the staves, as Moses commanded. Doing it right is not more spiritual than doing it wrong. It's just doing what was actually asked.",
    ]),
    chron1(15, 16, 29, [
      "David also puts musicians in charge - singers appointed with instruments of music, sounding by lifting up the voice with joy. This is not background music. It is the point.",
      "Chenaniah is named chief of the Levites for song, because he was skilful. Even inside a procession this holy, somebody's actual competence still mattered.",
      "So the ark goes up with shouting, trumpets, cymbals, harps - loud, physical, unhidden worship, David dancing in the middle of it in a linen ephod.",
      "And Michal, watching from a window, despises him in her heart. Two people can watch the same moment of worship. One gets swept into it. The other stands back and judges it. That is a choice, not an accident.",
    ]),
    chron1(16, 1, 7, [
      "The ark finally rests in the tent David prepared for it, and the first thing he does is feed everyone. Every man and every woman in Israel gets bread, meat, and wine. Worship turns into a shared meal for the whole nation.",
      "Then he permanently stations Levites in front of the ark - to record, and to thank, and to praise. Not a onetime party. A standing job.",
      "Asaph is named chief here, the same Asaph who will later write psalms of his own. His first job was leading thanks for someone else's.",
      "The presence of God arrives, and the very next thing that happens is everybody eats together. That is what David thinks a homecoming for God should look like.",
    ]),
    chron1(16, 8, 36, [
      "Then comes the psalm, and it opens with a command, not a suggestion. Give thanks, call upon his name, make known his deeds among the people. Worship that stays private is not finished yet.",
      "It keeps moving outward on purpose - remember what God has done, then declare his glory among the heathen, until even the trees of the wood sing out at the presence of the Lord. Israel's private thanksgiving turns into something the whole earth is invited into.",
      "And after all that praise, the psalm does not end on triumph. It ends with a request. Save us, and gather us together, and deliver us from the heathen. Even in the loudest thanksgiving of the book, David still asks for help.",
      "That is the whole shape of this day in one psalm. Remember what God did. Tell everyone. And still ask him for what you need.",
    ]),
    chron1(16, 37, 43, [
      "Then the story does something almost anticlimactic. Zadok and the priests keep offering sacrifices the old way, at the old tabernacle in Gibeon, because the ark moved but the rest of the system did not stop.",
      "Obed-edom, whose house held the ark for three unremarkable months, gets named again here as a permanent porter. God noticed the man nobody was watching.",
      "Heman and Jeduthun are set apart with trumpets and cymbals, and the reason given is the same line again - because his mercy endureth for ever.",
      "And then the whole day just ends. All the people departed every man to his house, and David returned to bless his house. No fireworks. Just everyone going home, changed.",
    ]),
  ],
  closing: [
    ["So that is Day 97.", 700],
    ["A man died reaching for the ark the wrong way. A nation brought it home the right way, three months later, with instructions David finally said out loud.", 800],
    ["None ought to carry the ark of God but the Levites.", 750],
    ["Then came the loudest worship in the book so far - shouting, trumpets, a king dancing in linen - and one woman watching from a window, unmoved.", 850],
    ["And underneath all of it, a meal. Bread, meat, and wine, for every single person in Israel.", 800],
    ["The psalm that follows does not stop at thank you. It ends asking God to save and gather his people, even on the best day David ever had.", 850],
    ["Tomorrow, 1 Chronicles 17 through 20. God turns down David's biggest offer, and makes him a much bigger promise instead.", 850],
    ["For now, hold on to David's own words about what went wrong the first time.", 800],
    ["We sought him not after the due order.", 800],
    ["So he found the order, and brought God home.", 1200],
  ],
};
