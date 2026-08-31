import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 58, written to the Day 1 standard.
 *
 * Joshua 8-11 covers Ai's fall on the second try, the law read aloud at
 * Mount Ebal, the Gibeonites' trick and Israel's costly oath, the five-king
 * battle at Gibeon with the sun standing still, the southern campaign, the
 * northern coalition at the waters of Merom, and the summary that the land
 * finally rests from war. Seven blocks across the four chapters - one more
 * than Day 57 - because the southern and northern campaigns each carry a
 * city list that needs its own room without padding the teaching.
 */

const josh = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joshua ${chapter}:${startVerse}-${endVerse}`,
  book: "joshua",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 58,
  title: "Conquest and Covenant Obedience",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 58. Israel just lost at Ai because of Achan.", 750],
    ["Today they go back and take it the right way.", 800],
    ["Then a nation tricks its way into a peace treaty.", 800],
    ["And a battle runs so long that Joshua asks the sun itself to stop moving.", 900],
    ["We are in Joshua 8 through 11. A second try, a disguise, a sky that stands still, and a war that finally ends.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    josh(8, 1, 29, [
      "God tells Joshua exactly how to take Ai this time. Not more soldiers. A plan. Part of the army draws the king out, and the rest lies hidden behind the city and burns it while he's chasing a fake retreat.",
      "It works exactly as told, and this time nobody holds anything back for themselves. The whole city and everything in it is destroyed, the way Jericho should have taught them.",
      "The king of Ai is hanged on a tree until evening, then his body is taken down and a great heap of stones is raised over him at the city gate.",
      "One chapter after Achan's sin cost thirty-six lives, obedience gets the same city that disobedience just lost. Same enemy, same land, completely different outcome.",
    ]),
    josh(8, 30, 35, [
      "Before Joshua takes another step of conquest, he stops and builds an altar on Mount Ebal, exactly the way Moses commanded back in Deuteronomy.",
      "He writes a copy of the law of Moses on the stones there, in plain sight of the people.",
      "Then he reads all the words of the law, the blessing and the cursing, to the entire nation, including the women, the children, and the strangers living among them. Nobody is left out of hearing it.",
      "This is a conquering army stopping in the middle of a war to make sure everyone knows what they're actually fighting for.",
    ]),
    josh(9, 1, 27, [
      "A group from Gibeon hears what happened to Jericho and Ai, and instead of fighting or fleeing, they get creative. Old sacks, worn-out wineskins, moldy bread, patched sandals. They dress themselves as travelers from a country far away.",
      "Israel makes a covenant of peace with them and swears it in the name of the LORD, without ever asking God first. The text says it plainly. They took of their victuals, and asked not counsel at the mouth of the LORD.",
      "Three days later the truth comes out. They're neighbors, not strangers, and they were never supposed to be spared. But the oath was already sworn, in God's name, and Israel keeps it anyway even though the whole congregation grumbles about it.",
      "So the Gibeonites live, but as woodcutters and water carriers for the house of God. Deception got them survival, not equality. And Israel learns that a promise made carelessly still has to be kept.",
    ]),
    josh(10, 1, 15, [
      "Five Amorite kings hear that Gibeon made peace with Israel, and instead of attacking Israel directly, they gang up on Gibeon for switching sides. Gibeon sends an urgent message to Joshua, calling itself his servant now.",
      "Joshua marches his army all night to reach them, and the LORD tells him plainly, I have delivered them into thine hand. There shall not a man of them stand before thee.",
      "God fights alongside them in ways no army could plan. Hailstones kill more of the enemy than Israel's swords do.",
      "And then Joshua asks for something no one had ever asked for before. Sun, stand thou still upon Gibeon, and thou, moon, in the valley of Ajalon. And the sun stood still, and the moon stayed, until the nation avenged itself of its enemies. The text says there was no day like it before or since.",
    ]),
    josh(10, 16, 43, [
      "The five kings run and hide together in a cave at Makkedah. Joshua has it sealed with stones and keeps fighting, then later brings the kings out, has his commanders put their feet on their necks, and kills them.",
      "Every one of the southern cities falls in sequence. Makkedah, Libnah, Lachish, Eglon, Hebron, Debir. The pattern repeats each time. Joshua takes it, strikes it, and leaves none remaining, just as the LORD God of Israel commanded.",
      "This is the same completeness Achan's sin tried to shortcut back at Jericho. Full obedience this time, city after city.",
      "And the summary line makes the point. Joshua took the whole land, because the LORD God of Israel fought for Israel.",
    ]),
    josh(11, 1, 15, [
      "A northern coalition forms under Jabin, king of Hazor, and this enemy brings something new. Horses and chariots, many as the sand that is upon the sea shore. This is the army Israel should fear most.",
      "God tells Joshua not to be afraid of them either, and even tells him what to do with the horses. Hamstring them, and burn their chariots with fire. Israel is not meant to build its strength on this enemy's weapons.",
      "Joshua attacks suddenly, by the waters of Merom, and the coalition breaks.",
      "Hazor alone, out of all these northern cities, gets burned to the ground, because Hazor was the head of all those kingdoms. Cut off the head, and leave the rest standing empty of their army.",
    ]),
    josh(11, 16, 23, [
      "The chapter closes with a summary of everything. Joshua took the whole land, according to all that the LORD said unto Moses, and gave it for an inheritance unto Israel.",
      "One detail sits there for later. The giants, the Anakim, are cut off from most of the hill country, but some remain in Gaza, Gath, and Ashdod. Philistine cities. That thread does not end here.",
      "And then the line this whole day has been building toward. And the land rested from war.",
      "Not because every enemy is gone forever, but because the fight God assigned Joshua is finished.",
    ]),
  ],
  closing: [
    ["So that is Day 58.", 700],
    ["A second try at Ai, an altar in the middle of a war, a trick that worked, a sun that stood still, and a land that finally rests.", 750],
    ["Notice what changes between Ai's two battles. Same enemy, same city. The difference was never Israel's strength. It was whether they obeyed.", 800],
    ["The Gibeonites remind you that a promise made in God's name still binds you, even when you were fooled into making it.", 850],
    ["And the day the sun stood still was not about Joshua controlling the sky. It was God finishing a fight He had already promised to win.", 850],
    ["A few giants stayed alive in Gaza, Gath, and Ashdod. Remember those names. One of them raises a son a long way from now.", 850],
    ["Tomorrow, Joshua 12 through 15, where the conquered land gets divided out, tribe by tribe.", 850],
    ["For now, hold on to one line.", 750],
    ["The land rested from war.", 750],
    ["It only rests once the obedience is complete.", 1200],
  ],
};
