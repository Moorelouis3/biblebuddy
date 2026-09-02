import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 86, written to the Day 1 standard.
 *
 * 1 Kings 16-19: four kings of Israel die violently before Elijah even
 * enters the story, Ahab and Jezebel make Baal the state religion, and
 * then a widow's flour never runs out, a boy comes back to life, and fire
 * falls from an open sky — right before the prophet who just won it all
 * asks God to let him die. Seven blocks across four chapters.
 */

const kings = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "1 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 86,
  title: "Elijah Confronts Idolatry",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 86. Four kings die violently in the first chapter alone, and then Elijah walks in with no introduction at all.", 750],
    ["By the end of these four chapters, fire falls from an open sky, four hundred fifty prophets lose a contest they never had a chance of winning, and the same prophet who just won it is hiding under a bush asking God to let him die.", 850],
    ["Ahab is the worst king Israel has had yet. Jezebel is the reason why.", 800],
    ["This is Elijah's introduction, and it does not slow down once.", 900],
    ["We are in 1 Kings 16 through 19.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings(16, 1, 20, [
      "A prophet named Jehu tells Baasha that his own family will be destroyed the exact same way Jeroboam's was — same words, same sentence. Baasha climbed to power by wiping out Jeroboam's line. He gets the identical verdict.",
      "His son Elah takes the throne and lasts two years before his own chariot captain, Zimri, kills him drunk in a steward's house and wipes out every last person connected to Baasha's family. Not one is left standing.",
      "Zimri reigns seven days. Seven. The army out fighting the Philistines hears about the coup and makes their general, Omri, king on the spot, in the middle of a war camp.",
      "Omri marches home and besieges the capital, and Zimri, seeing the city taken, walks into the palace and burns it down around himself rather than be caught. Four kings in one chapter, and every one of them dies violently.",
    ]),
    kings(16, 21, 34, [
      "Omri wins the civil war that follows, buys a hill for two talents of silver, and builds a city on it that will outlast every king who follows him — Samaria. Scripture's verdict on him, in one line, is that he did worse than everyone before him.",
      "Then his son Ahab takes the throne and somehow makes his father look mild. Verse thirty-one says it like it's almost unbelievable — as if walking in Jeroboam's sins was too small a thing, Ahab goes further, marries Jezebel, and starts worshipping Baal himself.",
      "He builds an actual temple to Baal inside Samaria, with an altar inside it. This isn't private compromise anymore. It's the state religion now.",
      "And right here, almost as a footnote, a man named Hiel rebuilds Jericho and loses two sons doing it — the foundation costs him his firstborn, the gates cost him his youngest. Exactly what Joshua said would happen to whoever rebuilt that city, centuries earlier. The word just comes true.",
    ]),
    kings(17, 1, 16, [
      "Elijah shows up out of nowhere, no introduction, no family line, nothing. He says one sentence to the king — there will be no rain except by my word — and vanishes from the story for three years.",
      "God sends him to hide by a brook, and ravens, scavenger birds, not exactly reliable providers, bring him bread and meat twice a day. In the middle of a famine he caused with his own prophecy, God feeds him through the least likely source in the land.",
      "When the brook dries up, God sends him into enemy territory. Zarephath is in Sidon, Jezebel's home country, and God sends His prophet to be fed by a poor widow there, of all people, of all places.",
      "She isn't saving up. She's making her last meal before she and her son starve. Elijah asks her to feed him first, on nothing but a promise — the flour and oil won't run out until the rain comes. She has no reason to trust a stranger's word except that it's the only thing in the room worth trusting.",
    ]),
    kings(17, 17, 24, [
      "Then, after the miracle that kept them fed, her son dies anyway. And her first reaction isn't gratitude for the flour that never ran out. It's blame — did you come here to remind God of my sin and kill my son?",
      "Elijah doesn't argue with her. He carries the boy upstairs and does something nobody in Scripture has done yet. He asks God, out loud, why this is happening, then stretches himself over the child three times, praying each time.",
      "God hears him, and the boy's breath comes back. Elijah carries him down and hands him to his mother with four words. See, thy son liveth.",
      "Her response tells you what the whole scene was for. Now I know that you are a man of God, and that the word of the Lord in your mouth is truth. The bread proved God provides. The resurrection proved Elijah's word could be trusted completely.",
    ]),
    kings(18, 1, 19, [
      "Three years into the drought Elijah caused, God finally sends him back to Ahab, and the famine is so bad the king himself is out searching the land personally for grass to keep his horses alive.",
      "In the middle of that, you find out something that's been happening quietly the whole time. Jezebel has been killing the Lord's prophets, and a man named Obadiah, who works inside Ahab's own palace, has been hiding a hundred of them in caves, fifty at a time, feeding them at his own risk.",
      "When Obadiah finds Elijah, he's terrified, not of Elijah, but of being killed for delivering a message Elijah might not show up to back. He's been faithful for years with nobody watching, and Elijah's sudden reappearance could get him killed for it.",
      "Ahab finally faces Elijah and calls him the troubler of Israel. Elijah doesn't back down an inch. I have not troubled Israel, but you have, you and your father's house, by chasing after Baal. Then he calls for the whole nation and every one of Jezebel's eight hundred fifty prophets to meet him on Mount Carmel.",
    ]),
    kings(18, 20, 46, [
      "Elijah asks the whole nation one question — how long will you keep limping between two opinions — and nobody answers him. Not a word. That silence is the real subject of this chapter.",
      "Four hundred fifty prophets cry out to Baal from morning until early afternoon, cutting themselves until they bleed, and get nothing back. No voice, no answer, no one paying attention. Elijah stands there mocking them the whole time — maybe your god's asleep, maybe he's on a trip.",
      "Then Elijah rebuilds the Lord's broken-down altar with twelve stones, one for each tribe, and drenches the whole thing in water three times over, until it's soaked and pooling in a trench around it. He makes the miracle harder to fake before he even prays.",
      "One sentence of prayer, and fire falls from the sky and burns up the bull, the wood, the stones, the dust, and licks up every drop of water in the trench. The people who'd said nothing all day fall on their faces and say it together — the Lord, he is God. Within hours, after years of drought, rain finally comes.",
    ]),
    kings(19, 1, 21, [
      "One threat from Jezebel, and the man who just called down fire from heaven runs for his life into the wilderness and asks God to let him die. I am not better than my fathers. After Carmel. After the greatest victory in his life.",
      "God doesn't argue with him or rebuke him. He sends an angel to feed him, twice, and lets him sleep. Sometimes the answer to a man who wants to die isn't a sermon. It's food and rest.",
      "At Horeb, God asks him the same question twice, what are you doing here, Elijah, and gets the same self-pitying answer both times. Wind, earthquake, and fire pass by, each one the kind of thing you'd expect God in, and He's in none of them. Then comes a still, small voice, and that's where God actually is.",
      "God gives him work to do, anoint two kings and his own replacement, and one piece of information Elijah desperately needed and didn't have. I have left seven thousand who have not bowed to Baal. He thought he was the only one left. He was wrong by seven thousand people.",
    ]),
  ],
  closing: [
    ["So that is Day 86.", 700],
    ["Four kings die in one chapter. A widow's flour never runs out. A boy comes back to life. Fire falls from the sky in front of the whole nation.", 800],
    ["And then the prophet who just won the biggest victory of his life runs into the wilderness and asks God to kill him.", 800],
    ["Carmel didn't fix what was actually wrong with Elijah. He still felt alone, still felt hunted, still needed to be found by God all over again.", 850],
    ["God's answer wasn't another display of fire. It was food, rest, and a still small voice after the noise stopped.", 850],
    ["And one thing Elijah never knew until God told him — seven thousand people in Israel had never bowed to Baal. He thought he was the last one standing.", 850],
    ["Tomorrow, 1 Kings 20 through 22 and 2 Kings 1. Ahab's story ends, and Elijah gives his last warnings.", 800],
    ["For now, sit with the voice on the mountain.", 750],
    ["Not in the wind. Not in the fire.", 750],
    ["In the silence after.", 1200],
  ],
};
