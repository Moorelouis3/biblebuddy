import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 25, written to the Day 1 standard.
 *
 * Exodus 13-16: the last instructions before the road, the sea splitting
 * open, the song on the far shore, and then - almost immediately - Israel
 * running out of water and food. Seven blocks, one or two per chapter,
 * teaching kept to four lines so a four-chapter day still lands in range.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 25,
  title: "Into the Wilderness",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 25. Israel is free, and free lasts about three days.", 750],
    ["The sea is going to split wide open in this reading. That is the easy part.", 800],
    ["The hard part comes right after, when there is no water and no food and nowhere to blame but the wilderness itself.", 850],
    ["Watch how fast the singing turns into complaining.", 900],
    ["We are in Exodus 13 through 16.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(13, 1, 16, [
      "Before Israel takes a single step, God gives them something to do with their hands. Every firstborn, human and animal, belongs to Him now. Consecrated, set apart, on account of the night the firstborn of Egypt died and theirs did not.",
      "And they are told to keep teaching it. When your son asks you in time to come, what is this, you tell him. By strength of hand the Lord brought us out of the house of bondage.",
      "This nation does not even exist as a free people yet, and it is already being handed a way to remember. Not a monument. A conversation with your own kid.",
      "A sign on the hand, a memorial between the eyes. The point was never decoration. It was so the story could not be quietly forgotten in one generation.",
    ]),
    g(13, 17, 22, [
      "God does not lead them the short way, through Philistine country, straight up the coast. Too much war too soon. Lest the people repent when they see it, and turn back to Egypt.",
      "So He takes them the long way, around, through the wilderness toward the Red Sea. Freedom is not the same thing as ready.",
      "Moses carries the bones of Joseph the whole way. A promise kept from four hundred years back, made good on by a man who never knew Joseph personally.",
      "And by day a pillar of cloud goes ahead of them, by night a pillar of fire. It never leaves its place in front of the people. That detail is worth sitting with. Not sometimes. Never.",
    ]),
    g(14, 1, 14, [
      "God tells Moses to make camp somewhere that looks like a trap. Boxed in by the sea, so Pharaoh will think Israel is confused and go after them.",
      "It works exactly as planned, on both sides. Pharaoh changes his mind and sends six hundred chosen chariots. And Israel, seeing them coming, is sore afraid.",
      "Their first instinct is not trust. It is regret. Were there no graves in Egypt, that you brought us to die in the wilderness? Better to have served the Egyptians.",
      "And Moses says the line that matters more than anything he has said yet. Stand still, and see the salvation of the Lord. The Lord shall fight for you, and you shall hold your peace.",
    ]),
    g(14, 15, 31, [
      "Then God tells Moses to stop praying and start walking. Wherefore criest thou unto me? Speak to the children of Israel, that they go forward.",
      "Moses stretches his hand out, a strong east wind blows all night, and the sea becomes dry ground with a wall of water on either side. Israel walks through the middle of it.",
      "The Egyptians follow them in, and God lets them get all the way to the middle before He lets the water go. It comes back to its full strength. Not one of them is left.",
      "And the chapter ends with something quieter than the miracle itself. Israel saw the Egyptians dead on the seashore, and they believed the Lord, and His servant Moses.",
    ]),
    g(15, 1, 21, [
      "So Moses sings. The Lord is my strength and my song, and He is become my salvation. The horse and his rider He has thrown into the sea.",
      "It is not a polite hymn. It is a war song, and it is graphic on purpose. Thy right hand, O Lord, has dashed in pieces the enemy. The floods stood upright as a heap.",
      "Then Miriam, Aaron's sister, a prophetess in her own right, takes a timbrel, and the women go out after her dancing, and she answers them back with the same line Moses started with.",
      "Sing to the Lord, for He has triumphed gloriously. This is the first recorded worship service in the Bible, and it happens on the shore of a battlefield.",
    ]),
    g(15, 22, 27, [
      "Three days later, three days after the sea split for them, they find water at Marah and cannot drink it. It is bitter. That is the whole crisis.",
      "The people murmur against Moses. What shall we drink? Three days ago the sea obeyed him. Now a puddle is the enemy.",
      "God shows him a tree, he throws it into the water, and the water is made sweet. And right there He gives them a name for Himself. I am the Lord that healeth thee.",
      "Then they come to Elim, twelve wells and seventy palm trees. Twelve tribes, seventy elders, waiting there before anyone had asked for it.",
    ]),
    g(16, 1, 36, [
      "One month out from Egypt, and the wilderness of Sin brings the same complaint back, bigger. Would God we had died by the hand of the Lord in Egypt, when we sat by the flesh pots.",
      "God answers with bread from heaven, a certain rate every day, so that He may prove them, whether they will walk in His law or not. Gather only enough for today. That is the whole test.",
      "Some try to hoard it anyway, and it breeds worms and stinks by morning. On the sixth day it is double, and that portion keeps just fine, because the seventh is a Sabbath, a rest, built into the food itself before it is ever written into law.",
      "They call it manna, because they did not know what it was. And Moses has them keep a jar of it, laid up before the testimony, so no generation after them can say it never happened.",
    ]),
  ],
  closing: [
    ["So that is Day 25.", 700],
    ["A sea split open, a war song, a bitter well, and bread nobody had ever seen before.", 750],
    ["Notice the pattern this day keeps repeating. Deliverance, then almost immediately, a fresh place to run out of trust.", 800],
    ["The same people who watched the sea stand up like a wall are complaining about water three days later, and complaining about food a month after that.", 850],
    ["That is not a character flaw unique to them. That is what it looks like to be human right after God does something enormous for you.", 850],
    ["And every single time, God answers the complaint instead of walking away from it. Sweet water. Bread on schedule. He never once says, after everything I just did for you.", 850],
    ["Tomorrow, Exodus 17 through 20. Water from a rock, a war Israel almost loses without lifted hands, and the Ten Commandments spoken out loud at Sinai.", 850],
    ["For now, hold on to the test inside the bread.", 800],
    ["Gather only enough for today.", 750],
    ["Trust was the whole point, not the food.", 1200],
  ],
};
