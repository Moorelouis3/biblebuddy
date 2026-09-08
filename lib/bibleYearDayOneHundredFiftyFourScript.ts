import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 154, written to the Day 1 standard.
 *
 * Psalms 76-78: God's power over armies, a sleepless man interrogating his
 * own doubt, and Israel's whole history told as one long cycle of rescue,
 * rebellion, and rescue again. Seven blocks, the heaviest reading yet, so
 * the two long chapters (77 and especially 78) get split further than a
 * typical day to keep every block covering four teaching lines.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 154,
  title: "God's Power and Israel's Memory",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 154. Psalms 76 through 78.", 700],
    ["A God whose rebuke alone puts chariots and horses into a dead sleep.", 750],
    ["A sleepless man interrogating his own doubt in the middle of the night.", 800],
    ["And Israel's whole history, told as one long cycle of rescue, rebellion, and rescue again.", 850],
    ["Power, honesty, and a memory long enough to hold both.", 700],
    ["We are in Psalms 76, 77, and 78.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(76, 1, 12, [
      "In Judah is God known: his name is great in Israel. In Salem also is his tabernacle, and his dwelling place in Zion. There brake he the arrows of the bow, the shield, and the sword, and the battle. The psalm opens by naming an actual battle God ended, weapons broken in the middle of the fight.",
      "The stouthearted are spoiled, they have slept their sleep: and none of the men of might have found their hands. At thy rebuke, O God of Jacob, both the chariot and horse are cast into a dead sleep. Trained soldiers and warhorses go still at a single rebuke. No battle is even described, just the aftermath of one that never really got started.",
      "Thou, even thou, art to be feared: and who may stand in thy sight when once thou art angry?... When God arose to judgment, to save all the meek of the earth. The fear is not random. It exists so the powerless can be saved. Judgment and rescue are the same act here.",
      "Surely the wrath of man shall praise thee: the remainder of wrath shalt thou restrain... Vow, and pay unto the LORD your God... He shall cut off the spirit of princes: he is terrible to the kings of the earth. Even human anger ends up serving God's purposes, and whatever is left over, God simply shuts down himself.",
    ]),
    g(77, 1, 9, [
      "I cried unto God with my voice, even unto God with my voice; and he gave ear unto me. In the day of my trouble I sought the Lord: my sore ran in the night, and ceased not: my soul refused to be comforted. This opens as a night that will not end, and a comfort that will not come no matter how hard he looks for it.",
      "Thou holdest mine eyes waking: I am so troubled that I cannot speak. I have considered the days of old, the years of ancient times. Insomnia turns into memory. He cannot sleep, so he starts reaching backward instead of forward.",
      "Will the Lord cast off for ever? and will he be favourable no more? Is his mercy clean gone for ever? doth his promise fail for evermore? Hath God forgotten to be gracious? Four questions in a row, each one worse than the last. This is doubt spoken honestly, not smoothed over for anyone listening.",
      "And I said, This is my infirmity: but I will remember the years of the right hand of the most High. He does not answer his own questions. He just names the spiral as weakness and chooses to remember instead of keep spiraling.",
    ]),
    g(77, 10, 20, [
      "I will remember the works of the LORD: surely I will remember thy wonders of old. I will meditate also of all thy work, and talk of thy doings. The decision from verse 10 becomes a plan. Remember, meditate, talk. Three deliberate actions set against the fear.",
      "Thy way, O God, is in the sanctuary: who is so great a God as our God? Thou art the God that doest wonders: thou hast declared thy strength among the people. He starts specifically, not generally. This God, the one worshipped in this sanctuary, not gods in the abstract.",
      "The waters saw thee, O God, the waters saw thee; they were afraid... The clouds poured out water... the earth trembled and shook. Thy way is in the sea, and thy path in the great waters, and thy footsteps are not known. The Red Sea crossing gets described almost like a storm terrified of God, not a calm miracle. Even nature is afraid of him here.",
      "Thou leddest thy people like a flock by the hand of Moses and Aaron. The psalm ends mid-thought, on human hands carrying out God's leading. No resolution is announced. The memory itself is the answer to the questions from before.",
    ]),
    g(78, 1, 16, [
      "Give ear, O my people, to my law... I will utter dark sayings of old... shewing to the generation to come the praises of the LORD, and his strength, and his wonderful works that he hath done. This whole psalm announces itself as a history lesson meant to be passed down, not just recited once.",
      "That they might set their hope in God, and not forget the works of God... And might not be as their fathers, a stubborn and rebellious generation. The purpose is stated up front. Remembering correctly is supposed to stop the next generation repeating the same mistakes.",
      "He divided the sea, and caused them to pass through... He clave the rocks in the wilderness, and gave them drink as out of the great depths. He brought streams also out of the rock. The history starts with rescue and provision, the exodus and water from a rock, both gifts before any failure is even mentioned.",
      "And they sinned yet more against him by provoking the most High in the wilderness. And they tempted God in their heart by asking meat for their lust... Can God furnish a table in the wilderness? The turn is immediate. Right after being given water from a rock, they doubt God can provide food too.",
    ]),
    g(78, 17, 39, [
      "Behold, he smote the rock, that the waters gushed out... can he give bread also? can he provide flesh for his people? Therefore the LORD heard this, and was wroth. Their doubt is phrased as a real question about God's ability, not just their hunger, and that is what draws the anger.",
      "He had rained down manna upon them to eat... Man did eat angels' food... He rained flesh also upon them as dust, and feathered fowls like as the sand of the sea. God answers the doubt by giving them exactly what they asked for, in overwhelming amounts.",
      "So they did eat, and were well filled... But while their meat was yet in their mouths, the wrath of God came upon them, and slew the fattest of them. The provision and the judgment happen almost in the same breath. Getting what they demanded did not mean they were right to demand it.",
      "But he, being full of compassion, forgave their iniquity, and destroyed them not... For he remembered that they were but flesh; a wind that passeth away, and cometh not again. The chapter's hardest turn. God's patience is explained by his own memory of how fragile they actually are.",
    ]),
    g(78, 40, 55, [
      "How oft did they provoke him in the wilderness, and grieve him in the desert!... They remembered not his hand, nor the day when he delivered them from the enemy. The psalm steps back and grieves the whole pattern, not just one incident.",
      "And had turned their rivers into blood... He sent divers sorts of flies among them... their vines with hail, and their sycomore trees with frost... their cattle also to the hail. The plagues on Egypt get listed almost like a receipt, one line per disaster, no elaboration needed.",
      "And smote all the firstborn in Egypt... But made his own people to go forth like sheep, and guided them in the wilderness like a flock... but the sea overwhelmed their enemies. Judgment on Egypt and rescue for Israel are described as one single motion, not two separate stories.",
      "And he brought them to the border of his sanctuary, even to this mountain, which his right hand had purchased. He cast out the heathen also before them, and divided them an inheritance by line. The whole exodus arc lands exactly where it was always heading, into the land, with room made for them by force.",
    ]),
    g(78, 56, 72, [
      "Yet they tempted and provoked the most high God, and kept not his testimonies: But turned back, and dealt unfaithfully like their fathers: they were turned aside like a deceitful bow. Even inside the land they were given, the same old pattern starts over again.",
      "For they provoked him to anger with their high places, and moved him to jealousy with their graven images... So that he forsook the tabernacle of Shiloh, the tent which he placed among men. God's own dwelling place gets abandoned because of what Israel worshipped instead of him.",
      "And delivered his strength into captivity, and his glory into the enemy's hand... The fire consumed their young men; and their maidens were not given to marriage. This is written plainly as loss, not wrapped in comfort. Young men dead, young women with no weddings left to look forward to.",
      "But chose the tribe of Judah, the mount Zion which he loved... He chose David also his servant, and took him from the sheepfolds... So he fed them according to the integrity of his heart. Out of Shiloh's ruin, God builds something new around Judah and a shepherd boy, ending the whole history on a king still to come.",
    ]),
  ],
  closing: [
    ["So that is Day 154.", 700],
    ["A battle God ended before it started, a man who cried out all night, and a history lesson meant to be repeated on purpose.", 800],
    ["Psalm 76 says fear of God and rescue for the powerless are not two different things. They happen in the same moment.", 800],
    ["Psalm 77 says asking God four hard questions in a row is not the opposite of faith. Choosing to remember anyway is.", 850],
    ["And Psalm 78 says forgetting what God has done is not a small mistake. It is the one thing that keeps repeating the worst chapters of the story.", 850],
    ["Shiloh fell because Israel forgot. But out of that same ruin, God raised up a shepherd boy from the sheepfolds.", 800],
    ["Tomorrow, Psalms 79 through 81. Judgment, restoration, and a God who is still listening even when His people are not.", 850],
    ["For now, hold on to the line that decided everything.", 750],
    ["I will remember the years of the right hand of the most High.", 800],
    ["Remembering right was always the way back.", 1200],
  ],
};
