import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 23, written to the Day 1 standard.
 *
 * Exodus 5-8: Moses and Aaron's first request to Pharaoh, the harsher labor
 * that follows, God's renewed promise and the name JEHOVAH, the staff-to-
 * serpent contest, and the first three plagues - blood, frogs and lice, and
 * flies. Seven blocks, one or two per chapter, no cross-chapter spans.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 23,
  title: "Pharaoh Resists God's Word",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 23. Yesterday ended with Israel bowing their heads and believing.", 750],
    ["Today that faith runs straight into a wall named Pharaoh.", 800],
    ["Moses asks for three days in the wilderness. Pharaoh answers by making the work harder.", 800],
    ["Then three plagues fall, one after another, and Pharaoh still will not bend.", 850],
    ["We are in Exodus 5 through 8.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(5, 1, 23, [
      "Moses and Aaron finally stand in front of Pharaoh and ask for three days in the wilderness to hold a feast to the LORD. Who is the LORD, Pharaoh answers, that I should obey his voice? I know not the LORD.",
      "So he does not just refuse. He escalates. No more straw for the bricks, but the same daily quota. Go find your own straw.",
      "The Israelite foremen are beaten for missing a number that was never possible, get nothing from Pharaoh, then find Moses and Aaron waiting outside and let them have it. The LORD look upon you and judge, because you have made us stink in Pharaoh's eyes.",
      "Moses turns around and says almost the same thing to God. Lord, why have you brought trouble on this people? Why did you ever send me?",
    ]),
    g(6, 1, 13, [
      "God's answer to Moses is not comfort first. It is a promise. Now you will see what I will do to Pharaoh. I am the LORD. I appeared to Abraham, Isaac, and Jacob, but by my name JEHOVAH was I not known to them.",
      "Four I wills follow. I will bring you out. I will rid you of their bondage. I will redeem you. I will take you to me for a people.",
      "Moses tells the people, but they cannot even hear it. Their spirit is broken from the work.",
      "God tells Moses to go back to Pharaoh, and Moses argues. If my own people will not listen to me, why would Pharaoh, and I am slow of speech besides.",
    ]),
    g(6, 14, 30, [
      "Right here Genesis stops the action to list a family tree. Reuben's sons, Simeon's sons, then Levi's line all the way down to Moses and Aaron, named.",
      "It reads like a detour, but it is the point. This is not a legend about a nameless hero. It is a real family, with real fathers and real grandsons, standing in a real palace.",
      "The story picks back up exactly where it left off. God tells Moses again to speak to Pharaoh and let Israel go.",
      "And Moses says the same thing again. I am of uncircumcised lips. How will Pharaoh listen to me? The man does not feel any more ready the second time God asks.",
    ]),
    g(7, 1, 13, [
      "God tells Moses, See, I have made you a god to Pharaoh, and Aaron your brother will be your prophet. Moses is eighty now, Aaron eighty-three. Whatever happens next, it is not their own authority.",
      "Aaron throws down his staff and it becomes a serpent. Pharaoh's magicians do the same trick with their secret arts.",
      "But Aaron's staff swallows theirs. The counterfeit collapses in front of the real thing.",
      "Pharaoh's heart is hardened, and he will not listen, just as the LORD had said. God told Moses this exact ending back at the burning bush.",
    ]),
    g(7, 14, 25, [
      "The first plague. Aaron stretches his staff over the water, and the Nile, and every stream and pond in Egypt, turns to blood.",
      "The fish die. The river stinks. The Egyptians cannot drink it and have to dig along the bank for water.",
      "The magicians copy it with their enchantments, which is exactly enough rope for Pharaoh to hang his refusal on. See, my men can do that too.",
      "Seven days pass. Nothing changes. A whole nation's water supply ruined for a week, and Pharaoh still will not let them go.",
    ]),
    g(8, 1, 19, [
      "Frogs next. They come up out of the river and cover the land, into the houses, the beds, the ovens, the kneading bowls. There is nowhere in Egypt without a frog in it.",
      "The magicians can copy the plague. They cannot undo it. Pharaoh has to ask Moses to pray them away, and even names the day himself. Tomorrow.",
      "They die in heaps, and the land stinks worse than the blood did. The moment Pharaoh gets his relief, he hardens his heart again.",
      "Then lice, out of the dust itself, and this time the magicians cannot even fake it. This is the finger of God, they tell Pharaoh. He does not listen to them either.",
    ]),
    g(8, 20, 32, [
      "Flies swarm next, but this time God draws a line. I will put a division between my people and your people. Goshen, where Israel lives, stays clean.",
      "Pharaoh offers his first compromise. Sacrifice here, in the land. Moses refuses. What Israel sacrifices would be an abomination to Egyptian eyes, and they would stone us for it.",
      "So Pharaoh agrees to three days in the wilderness, and asks Moses to pray for him, and adds one line that gives away his whole heart. Only do not go very far.",
      "The flies lift. The instant they do, Pharaoh hardens his heart one more time and breaks his word again.",
    ]),
  ],
  closing: [
    ["So that is Day 23.", 700],
    ["A harder workload, three plagues, and a king who bends only exactly as far as the pressure and then snaps back.", 750],
    ["Every single time Pharaoh gets relief, the text says the same thing. He hardened his heart.", 800],
    ["Watch that pattern. It is not that God has not shown him enough. It is that Pharaoh keeps choosing the same answer no matter what he sees.", 850],
    ["And notice who never wavers on the other side. God told Moses exactly how this would go, back at the bush, and it is happening exactly that way.", 850],
    ["Tomorrow, Exodus 9 through 12. Five more plagues, then blood on a doorpost, then Egypt finally lets them go.", 850],
    ["For now, hold on to Pharaoh's own words.", 800],
    ["I know not the LORD.", 750],
    ["By the end of this book, everyone will.", 1200],
  ],
};
