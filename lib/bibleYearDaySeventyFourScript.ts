import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 74, written to the Day 1 standard.
 *
 * 1 Samuel 23-26 gives David two separate chances to kill Saul and he takes
 * neither: the cave at En-gedi and the sleeping camp at Hachilah frame
 * Jonathan's last appearance in the story and the Nabal/Abigail episode in
 * between. Seven blocks across four chapters, matching Days 72 and 73.
 */

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 74,
  title: "David Spares Saul",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 74. Saul is still hunting, and today David gets close enough to kill him not once but twice.", 800],
    ["Both times he walks away instead.", 800],
    ["In between, Jonathan finds him one last time in the woods, and a fool named Nabal nearly gets his whole household wiped out over a plate of bread.", 850],
    ["It's a day about what a man does with power he could use and doesn't.", 800],
    ["We are in 1 Samuel 23 through 26.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam(23, 1, 14, [
      "David asks the Lord before he does anything. Should I fight the Philistines at Keilah? Even his own men are scared to go. He asks again, and the answer is still yes. Keilah gets saved by a fugitive with an ephod and six hundred men.",
      "Saul hears David is inside a walled town and thinks God handed him a cage. He calls up the whole army to go trap him there.",
      "So David asks the Lord two more hard questions. Will Saul actually come down? Will the men I just saved hand me over to him? Both times, the answer is yes. Not the answer David wanted, but the one that saves his life. He leaves before the trap closes.",
      "God delivered Keilah through David, and then told David the truth about the very people he'd just delivered. Being used by God and being safe with people are not always the same thing.",
    ]),
    sam(23, 15, 29, [
      "Jonathan finds David hiding in the wood and does something Saul never manages. He strengthens David's hand in God. Fear not, he says. You will be king. I'll be next to you. And Saul knows it too.",
      "This is the last time these two ever see each other in this story. They make one more covenant, and Jonathan just goes home. No dramatic goodbye. Just a friend leaving because there's nowhere safe for both of them to stay.",
      "The Ziphites, David's own tribesmen, sell his location to Saul for nothing but Saul's favor. Saul closes in from both sides of a mountain, close enough that men are already dividing up the ground between them.",
      "And the thing that saves David isn't a plan. It's a messenger from somewhere else entirely. The Philistines have invaded, and Saul has to turn around. They name the place Sela-hammahlekoth, the rock of escape. David didn't outrun Saul. He just ran out of time.",
    ]),
    sam(24, 1, 15, [
      "Saul walks into the very cave where David and his men are hiding, alone, to cover his feet. David's men call it what the Lord promised. His enemy delivered into his hand.",
      "David creeps up and cuts off a corner of Saul's robe. That's all. And even that small a cut, his heart smites him for it. He won't stretch out his hand against the Lord's anointed, not even with the man's back turned and asleep on his feet.",
      "He stops his own men from doing what he wouldn't do himself. Then he waits until Saul is safely outside and calls after him. My lord the king. And bows to the ground to a man who's spent chapters trying to kill him.",
      "He holds up the piece of robe as proof. This day your own eyes saw it. I could have killed you. I only cut your robe. Then he says the line that names what he actually thinks of himself. After whom does the king of Israel come out? After a dead dog. After a flea.",
    ]),
    sam(24, 16, 22, [
      "Saul hears his voice and asks the question that undoes him. Is this your voice, my son David? And he weeps out loud.",
      "He says it plainly. You are more righteous than I am. You repaid me good, and I repaid you evil. He knows exactly what he's done and still won't stop doing it later.",
      "Then Saul says the thing he's been fighting this whole book. I know well that you will surely be king. He's not guessing anymore. He's known for a while.",
      "All he asks is that David not wipe out his family once the throne is his. David swears it. It's the closest thing to peace these two men ever get, and it doesn't last.",
    ]),
    sam(25, 1, 22, [
      "Samuel dies, and Israel mourns him in a single verse before the story moves straight on to a man named Nabal, rich, and by his own household's account, a fool.",
      "David's men had protected Nabal's shepherds for months out in the wilderness, never taking so much as a stray lamb. So David sends a polite request for food, at exactly the moment it wouldn't cost Nabal anything to say yes.",
      "Nabal answers with contempt. Who is David? There are plenty of servants breaking away from their masters these days. He erases months of protection with one sentence.",
      "David's answer isn't measured. Every man of you, gird on your sword. Four hundred men start walking toward one household over an insult. The man who wouldn't touch Saul asleep in a cave is about to wipe out a house for a bad answer at dinner.",
    ]),
    sam(25, 23, 44, [
      "Abigail moves before her husband even knows there's a problem. Bread, wine, meat, grain, raisins, figs, loaded on donkeys, and she rides out to meet the army coming for her house.",
      "She falls at David's feet and takes the blame that isn't hers. Let this iniquity be on me. Then she says what nobody else has told him yet. The Lord is keeping you from shedding blood and avenging yourself with your own hand. Don't let this be the thing you remember when you're king.",
      "David hears it. Blessed be the Lord who sent you to meet me today, and blessed be your advice, which kept me from doing this myself. She talked a king out of a massacre with a donkey load of food and one clear sentence about who avenges what.",
      "Nabal finds out the next morning, sober, and his heart dies inside him like a stone. Ten days later the Lord finishes what David didn't have to. And David marries the woman who stopped him from becoming the kind of man Nabal already was.",
    ]),
    sam(26, 1, 25, [
      "The Ziphites betray David to Saul again. Same hill, same three thousand men. And David does something almost unbelievable. He walks into the middle of Saul's sleeping camp at night to see for himself.",
      "Abishai wants to end it right there. One thrust of the spear, he says, I won't need a second one. David says no again, the same reason as the cave. Who can stretch out his hand against the Lord's anointed and be guiltless?",
      "So instead of a life, David takes the spear and the water jug by Saul's head, and they walk out through an entire army that the Lord has put into a deep sleep. Then he shouts across the valley at Abner, the man whose whole job was to guard the king, and holds up the proof that he failed.",
      "Saul says it again, almost word for word from the cave. I have sinned. I have played the fool. Blessed be thou, my son David. And then, like always, he goes back to his own place, and David goes back to his.",
    ]),
  ],
  closing: [
    ["So that is Day 74.", 700],
    ["Twice David has Saul's life in his hand, in a cave and in a camp, and twice he puts it down.", 800],
    ["Jonathan finds him once more in the wood, tells him the truth Saul already half knows, and then this book never puts them in the same place again.", 850],
    ["And in the middle of it, Abigail does with words and bread what David's own men couldn't talk him out of with reason. She keeps a future king from becoming a murderer over an insult.", 850],
    ["Saul weeps twice today, admits the truth twice, and changes nothing either time.", 800],
    ["The Lord's anointed line keeps David's hands clean even when his patience is almost gone.", 800],
    ["Tomorrow, 1 Samuel 27 through 30. David does the thing that should worry you the most so far. He goes to live with the Philistines.", 900],
    ["For now, sit with Abigail's line to David.", 800],
    ["Let not this be a grief unto thee, that thou hast shed blood without a cause.", 900],
    ["Blessed be thy advice, and blessed be thou.", 1200],
  ],
};
