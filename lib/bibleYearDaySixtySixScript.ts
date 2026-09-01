import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 66, written to the Day 1 standard.
 *
 * Judges 16-19 is the hardest stretch in the book so far: Samson's death at
 * Delilah's hands and his own, Micah's private idols and rented priest, the
 * Danites stealing both to conquer a peaceful people, and the Levite's
 * concubine at Gibeah. Seven blocks, covering all four chapters in order,
 * with nothing softened.
 */

const judg = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Judges ${chapter}:${startVerse}-${endVerse}`,
  book: "judges",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 66,
  title: "Samson Falls and Israel Unravels",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 66. Judges 16 through 19.", 750],
    ["Samson dies in this reading. And it gets darker after that.", 800],
    ["You're going to watch a strongman get talked out of his own secret, a family build gods out of stolen silver, and a woman get handed out a door to save one man's own skin.", 850],
    ["This is not an easy day. It isn't supposed to be.", 800],
    ["Israel has no king yet. Nobody is steering. You will feel exactly what that costs.", 800],
    ["We are in Judges 16 through 19. Hold on.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    judg(16, 1, 22, [
      "Samson goes to Gaza and sleeps with a prostitute. The men of the city plan to kill him at dawn, and instead he rips the city gate off its frame at midnight and carries it up a hill.",
      "Then he falls for Delilah, and the Philistine lords offer her a fortune to find out what makes him strong. She asks him outright, four separate times, and four separate times he lies to her and watches her get caught in it.",
      "Green cords. New ropes. His hair woven into a loom. Each time she screams the Philistines are on you, Samson, and each time he snaps free like it's nothing.",
      "She wears him down by asking every single day until his soul is troubled to death. He finally tells her the truth. The secret was never the ropes. It was a vow he had been breaking one piece at a time his whole life, and never lost anything for it. Until now.",
    ]),
    judg(16, 23, 31, [
      "She shaves his head while he sleeps in her lap, and this time the strength is actually gone. Scripture says the reason plainly. He did not know that the Lord had departed from him.",
      "The Philistines gouge out his eyes, chain him in bronze, and put him to work grinding grain like an animal. The strongest man in Israel, blind, in a pit.",
      "Then his hair starts growing back, and nobody notices. They bring him out to entertain a temple full of people celebrating Dagon for handing them their enemy.",
      "Samson asks God for his strength one last time, not to be saved, but to be avenged for his eyes. He pushes the pillars apart, and kills more Philistines in his death than in his whole life put together.",
    ]),
    judg(17, 1, 13, [
      "A man named Micah confesses to his mother that he stole the silver she had cursed over. She blesses him for admitting it, then has some of it melted into idols for their own household shrine.",
      "Micah builds a whole private religion. A carved image, household gods, an ephod, and he makes one of his own sons the priest of it.",
      "The book stops to explain why. There was no king in Israel. Everyone did what was right in his own eyes. That line is not scenery. It is the reason for everything you are about to hear.",
      "A young Levite passing through needs work, and Micah hires him as a personal priest for room, board, and ten pieces of silver a year. Now I know the Lord will be good to me, Micah says, since I've got a Levite. As if God could be rented.",
    ]),
    judg(18, 1, 20, [
      "The tribe of Dan still has no land of its own, so they send five men to scout for somewhere to take. On the way they stop at Micah's house and recognize the Levite's voice.",
      "They ask him to check with God whether their trip will succeed. Go in peace, he tells them, your way is before the Lord. It costs him nothing to say and means nothing either.",
      "The scouts find Laish: a peaceful, undefended people, far from any ally, with nothing stopping anyone from taking what they have. The report back is simple. The land is good. Do not hesitate.",
      "Six hundred armed men set out. On the way they stop at Micah's house again, and this time the visit is not a blessing. It is a theft in progress.",
    ]),
    judg(18, 21, 31, [
      "The five scouts walk into Micah's shrine and take the idols and the ephod while six hundred armed men block the gate. When the priest objects, they offer him a promotion: be priest to a whole tribe instead of one house. His heart is glad. He goes with them.",
      "Micah chases them down with his neighbors, but when he sees six hundred armed men, all he can do is turn around and go home. He built gods that could not even protect themselves.",
      "The Danites reach Laish exactly like the scouts said. Quiet, unsuspecting, no rescue coming. They kill everyone, burn the city, then rebuild it and rename it Dan.",
      "They set up the stolen idol and keep the stolen priest, and it stays that way for generations. A whole tribe's worship starts with a theft nobody stopped.",
    ]),
    judg(19, 1, 15, [
      "Another Levite, another concubine. She leaves him and goes back to her father's house. He goes after her, not in anger, but to speak kindly and bring her home.",
      "Her father is thrilled to see him and will not let him leave. Day after day it is one more meal, one more night, stay a little longer. It reads like hospitality. It is actually delay.",
      "On the fifth day he finally leaves, too late in the day to reach home, and his servant suggests stopping in Jebus, a Canaanite city. The man refuses. I will not stay in a foreign city. We will go to Gibeah, one of our own towns, instead.",
      "They reach Gibeah and sit down in the town square, and no one takes them in. In their own nation, among their own people, nobody offers a bed. An old man finally does, and he is an outsider too, a fellow Ephraimite just living in that town.",
    ]),
    judg(19, 16, 30, [
      "That night, men of Gibeah surround the house and demand the male guest be handed over to be raped. The old man offers his own daughter and the concubine instead, the same words Lot used in Sodom, and it should stop you cold that this is happening inside Israel now.",
      "The Levite hands his concubine out to them himself. They abuse her all night and let her go at first light. She crawls back and collapses at the door, and his first words to her the next morning are get up, let's go, as if to someone only asleep.",
      "She does not answer. He puts her body on the donkey, takes her home, and cuts her into twelve pieces, sending one to every tribe of Israel.",
      "Everyone who sees it says the same thing. Nothing like this has happened since Egypt. Something has to be done. The book ends there, mid-sentence, on purpose. Tomorrow is the answer.",
    ]),
  ],
  closing: [
    ["So that is Day 66.", 700],
    ["Samson spent his whole life leaking his strength to whoever asked hard enough. Delilah was just the one who finally asked enough times.", 800],
    ["He died taking more Philistines with him than he ever killed alive. That is not a clean ending. It is the only one he had left.", 800],
    ["Then Micah built a religion out of stolen silver, and a whole tribe built a conquest out of stolen gods and a stolen priest.", 800],
    ["And then Gibeah. A door, a crowd, and a man who handed someone else out to save himself.", 800],
    ["Everyone who saw what was left of her said the same thing. Something has to be done.", 800],
    ["Judges keeps repeating one line: there was no king in Israel, everyone did what was right in his own eyes. Now you have seen exactly what that looks like.", 850],
    ["Tomorrow, Judges 20 and 21, and Ruth 1 and 2. Israel goes to war over what you just heard, and then, right behind it, a story about loyalty that actually holds.", 900],
    ["For now, sit with the door nobody opened for a stranger in his own country.", 800],
    ["And the one that opened onto something far worse.", 1200],
  ],
};
