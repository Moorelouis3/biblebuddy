import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 64, written to the Day 1 standard.
 *
 * Judges 8-11 turns the book darker fast: Gideon's late-life failure and the
 * idol he builds with the same breath he refuses a crown, Abimelech's coup
 * and the curse that catches up with him, two forgettable-on-purpose minor
 * judges, and Jephthah's rise and the vow that destroys his own household.
 * Seven blocks, splitting Gideon's fall and Abimelech's whole arc in half
 * each since both chapters carry a full turn.
 */

const judg = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Judges ${chapter}:${startVerse}-${endVerse}`,
  book: "judges",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 64,
  title: "Gideon's Failure and Jephthah's Vow",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 64. Judges 8 through 11.", 750],
    ["Yesterday Gideon won with three hundred men and a jar full of nothing. Today you watch what winning does to him.", 800],
    ["By the end of this reading, his own son will crown himself king, and a father who never should have made a vow will keep it anyway.", 800],
    ["It's the ugliest stretch in Judges so far. No easy heroes here.", 800],
    ["We are in Judges 8 through 11. Revenge, a fable, a coup, and a vow nobody should ever have made.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    judg(8, 1, 21, [
      "Fresh off routing Midian, Gideon's first fight is with his own countrymen. Ephraim is furious they weren't called up for the battle, and Gideon talks them down instead of fighting two wars at once.",
      "Chasing the fleeing kings, his three hundred men are faint but still pursuing. He asks Succoth and Penuel for bread for exhausted soldiers, and both towns refuse, betting Gideon won't actually win.",
      "He does win. He captures Zebah and Zalmunna, and on the way back he keeps his word. He tears Succoth's elders with thorns and briers, and tears down Penuel's tower, killing the men inside.",
      "Then he learns these two kings killed his own brothers at Tabor. He offers his son Jether the kill, but the boy is too young and afraid to draw the sword. So Gideon does it himself. This is no longer a rescue. It's revenge.",
    ]),
    judg(8, 22, 35, [
      "Israel offers Gideon a dynasty. Rule over us, you and your son and your grandson. He says the right thing. I will not rule over you. The LORD shall rule over you.",
      "Then, in the same breath, he asks for gold earrings from the plunder and melts them into an ephod. He sets it up in his hometown, and all Israel goes whoring after it. The man who refused a crown built himself an idol instead.",
      "The land rests forty years. Gideon dies old, with seventy sons from many wives, plus one more from a concubine in Shechem. He names that son Abimelech. My father is king.",
      "The moment Gideon is dead, Israel goes back to Baal, and worse, they forget every kindness Jerubbaal showed them. The judge is barely buried before the pattern restarts.",
    ]),
    judg(9, 1, 21, [
      "Abimelech goes to his mother's family in Shechem and makes his pitch. Would you rather seventy of Gideon's sons rule you, or one? They pay him seventy pieces of silver from Baal's own temple to make it happen.",
      "He uses it to hire reckless men and murders his seventy half-brothers on one stone. One brother, Jotham, escapes by hiding. Then Shechem crowns Abimelech king anyway, beside the very pillar where covenants were sworn.",
      "Jotham climbs a mountain and shouts down a fable. The trees go looking for a king. The olive, the fig, and the vine all say no, they have real fruit to make. Only the bramble, good for nothing but tearing flesh and starting fires, says yes.",
      "The bramble's offer doubles as a threat. Shelter in my shadow, or fire will come out of me and burn the cedars. Jotham spells it out plainly. You crowned the worthless one. If this wasn't done in good faith, let fire consume you both. Then he runs for his life.",
    ]),
    judg(9, 22, 57, [
      "Three years in, God himself sends an evil spirit between Abimelech and Shechem, and the men who made him king start plotting against him. Jotham's curse is already working before anyone remembers he spoke it.",
      "Gaal shows up talking big, and Shechem's confidence swings to him. Abimelech ambushes the city, defeats Gaal, then burns down the tower where a thousand people had taken shelter. The city that crowned him, he now destroys.",
      "He moves on to Thebez, and it should have ended the same way. But a woman on the tower drops a millstone on his head and cracks his skull. His last order is to his armor-bearer, so no one can say a woman killed him.",
      "It doesn't work. The Bible records it anyway. So God rendered Abimelech's evil back on him, and Shechem's evil back on Shechem, and the curse of Jotham the son of Jerubbaal landed on them both, exactly as spoken.",
    ]),
    judg(10, 1, 18, [
      "After Abimelech, two judges get almost no story at all. Tola judges twenty-three years and dies. Jair judges twenty-two, with thirty sons riding thirty donkeys over thirty towns. Not every judge is a battle. Some are just faithful, forgettable years of peace.",
      "Then Israel does evil again, chasing after seven different nations' gods at once, and God sells them to the Philistines and the Ammonites. Eighteen years of it this time.",
      "When they finally cry out, God's answer is sharper than usual. Did I not deliver you before? Go cry to the gods you chose instead. Let them save you. It sounds like He is done with them for good.",
      "But Israel actually puts away the strange gods this time, not just words, and Scripture says His soul was grieved for their misery. Even His refusal cracks. Then Gilead goes looking for someone, anyone, willing to lead the fight.",
    ]),
    judg(11, 1, 28, [
      "Jephthah is a mighty warrior and the son of a prostitute, and his own brothers threw him out of the family so he wouldn't inherit anything. He ends up leading a gang of nobodies in the land of Tob.",
      "The same elders who drove him out now come begging him to be their captain. Jephthah doesn't pretend it doesn't sting. Didn't you hate me and throw me out? Why come to me now that you're in trouble?",
      "They need him badly enough to make him head over all of Gilead if he wins, and he holds them to it before the LORD at Mizpeh. The outcast becomes the one thing they have left.",
      "Before fighting, Jephthah sends the king of Ammon a long, detailed history lesson about how Israel never actually took Ammon's land. It is a real argument, not a bluff, and Ammon ignores every word of it.",
    ]),
    judg(11, 29, 40, [
      "The Spirit of the LORD comes on Jephthah, and right as he marches out, he makes a vow. Whatever comes out of my house to meet me when I return, I will offer it up. It's a bargain God never asked him to make.",
      "He wins completely, twenty cities taken. And the first thing out of his door, with timbrels and dancing, is his only child, his daughter, celebrating her father's victory.",
      "He tears his clothes. She doesn't run from the vow either. She asks only for two months in the mountains with her friends to grieve the life she won't get to have. Then she comes back, and he does to her according to his vow.",
      "The chapter ends with a custom, not a celebration. The daughters of Israel go out every year to mourn her, four days a year. A vow spoken carelessly outlives the man who spoke it.",
    ]),
  ],
  closing: [
    ["So that is Day 64.", 700],
    ["Gideon refused a crown out loud, then built himself an idol with the same breath.", 750],
    ["His son Abimelech took by murder what his father wouldn't take by force, and it cost him seventy brothers and, eventually, his own skull.", 800],
    ["Jotham's fable turned out to be prophecy. The bramble burned the cedars after all.", 800],
    ["Then came Jephthah, thrown out by his own family, dragged back only because Gilead needed him, and desperate enough to bargain with God for a win he didn't need to buy.", 850],
    ["His daughter paid for a vow he never had to make. She only asked for time to grieve, and even that, she gave back.", 850],
    ["Tomorrow, Judges 12 through 15. Jephthah's story closes, and Samson's begins.", 850],
    ["For now, sit with what Gideon almost got right.", 750],
    ["The LORD shall rule over you, he said.", 750],
    ["Then he built a golden reason not to believe it.", 1200],
  ],
};
