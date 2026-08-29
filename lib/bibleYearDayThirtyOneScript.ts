import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 31, written to the Day 1 standard.
 *
 * Exodus 37-40 is four chapters of construction and inventory, then the
 * tabernacle goes up and the glory moves in. Seven blocks, consolidating the
 * build lists so the teaching carries the weight instead of the parts list.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 31,
  title: "The Tabernacle Is Finished",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 31. Exodus ends today.", 750],
    ["No more instructions. This is the day the tent actually gets built.", 800],
    ["The same gold that got melted into a calf a few chapters back is now getting hammered into an ark, a lampstand, a priest's breastplate.", 850],
    ["Same metal. Completely different use.", 950],
    ["We are in Exodus 37 through 40. The furniture, the garments, the raising of the tent, and what shows up inside it once it stands.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(37, 1, 9, [
      "Bezaleel builds the ark first. Wood, then gold inside and out, then two cherubim hammered out of one solid piece of gold, facing each other with their wings spread over the top.",
      "This is the box that will sit at the center of everything Israel does for the next several hundred years.",
      "And notice who is making it. Not Moses. Not a priest. A craftsman, filled by God for this exact skill, back in chapter 31.",
      "Building well is not a lesser calling here. It is how the plan in the last four chapters becomes a real object you could touch.",
    ]),
    g(37, 10, 29, [
      "Then the table for the bread, the lampstand hammered out of a single piece of gold, the incense altar, and the anointing oil, all built to the exact measurements God gave back in chapter 25.",
      "None of this is improvised. Every dimension, every ring, every cubit was specified before, and now it just gets made.",
      "That is the whole posture of these four chapters. Not creativity. Obedience to a pattern already shown.",
      "After the golden calf, that is not a small thing. Last time Israel got creative with gold, it went badly.",
    ]),
    g(38, 1, 20, [
      "Outside the tent comes the bronze altar for burnt offerings, and then the laver, the bronze basin for washing, made from the bronze mirrors of the women who served at the tabernacle entrance.",
      "Their mirrors became the thing the priests looked into their own reflection through water before they could approach God.",
      "Then the court itself gets fenced in. A hundred cubits of fine linen curtains, silver hooks, bronze sockets, marking off holy ground from ordinary ground.",
      "Everything closer to the ark gets more valuable. Bronze outside, silver in the middle, gold at the center. The materials themselves preach where God is.",
    ]),
    g(38, 21, 31, [
      "Then Exodus stops and gives you the inventory. Twenty-nine talents of gold. A hundred talents of silver. Seventy talents of bronze. Counted, weighed, recorded by name under Ithamar, Aaron's son.",
      "The silver came from the census tax back in chapter 30, a half shekel from every man as the price of his own soul, so that no one could be numbered without also being covered.",
      "This is not a boring paragraph. It is Israel proving nothing got skimmed off a project built by a nation that had just melted their jewelry into an idol.",
      "Bezaleel of Judah leads it, Aholiab of Dan works beside him. Trust rebuilds slowly, and it rebuilds through people willing to be checked.",
    ]),
    g(39, 1, 31, [
      "Now the garments. The ephod, the breastplate set with twelve stones, one for each tribe, worn over Aaron's heart every time he goes in.",
      "A robe of blue, gold bells and pomegranates around the hem, so the sound of him moving announces that he is alive in there and hasn't been struck down.",
      "And on his forehead, a plate of pure gold engraved with four words. Holiness to the Lord.",
      "Aaron carries the whole nation on his chest and the whole nation's need for holiness on his head, every single day he serves.",
    ]),
    g(39, 32, 43, [
      "The work is finished, and Israel brings every piece to Moses. The tent, the ark, the table, the lampstand, the altars, the garments, all of it.",
      "Watch the phrase that repeats through this whole section. As the Lord commanded Moses. It shows up again and again, almost like a receipt being checked off.",
      "Moses inspects it all, and it matches exactly what he was shown on the mountain. Nothing added, nothing missing.",
      "And Moses blessed them. After the golden calf, after the plea, after the second set of tablets, this is the moment the breach finally closes. Obedience, and then blessing.",
    ]),
    g(40, 1, 38, [
      "God tells Moses the day to raise it. The first day of the first month, one full year almost to the day since they left Egypt.",
      "Moses sets up the ark, the table, the lampstand, the altars, the court, exactly in the order God gave him, and anoints every piece with oil.",
      "Then Aaron and his sons are washed and dressed, and the tabernacle stands finished for the first time in Israel's history.",
      "And then the cloud covers the tent, and the glory of the Lord fills it so completely that Moses himself cannot go in. The man who used to talk with God face to face gets stopped at the door by God's own presence.",
    ]),
  ],
  closing: [
    ["So that is Day 31. And that is Exodus, finished.", 700],
    ["A book that started with slaves under Pharaoh ends with God's own glory too heavy for Moses to walk through the door.", 800],
    ["Every measurement, every ounce of gold, every curtain, all of it existed for one purpose. So God could live among people who had just betrayed Him with an idol.", 850],
    ["That is what the whole book has been building toward. Not a rescue that ends at freedom. A rescue that ends at nearness.", 850],
    ["The cloud by day and the fire by night did not stop at chapter 40. They led Israel for the next forty years, and you will meet them again.", 800],
    ["Bezaleel built with skill. Aaron carried the tribes over his heart. Moses obeyed the pattern exactly. None of that earned the glory. It just made room for it.", 850],
    ["Tomorrow, Leviticus begins. The tent is finally standing, and it needs to know how to actually be used.", 850],
    ["For now, sit with the last image of Exodus.", 800],
    ["The tabernacle finished, and the glory filling it so completely that even Moses had to stand outside.", 800],
    ["God had found a way to stay.", 1200],
  ],
};
