import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 28, written to the Day 1 standard.
 *
 * Exodus 25-28: the tabernacle instructions - a willing offering, the ark
 * and mercy seat, bread and light, the curtains and veil, the bronze altar
 * and courtyard, and priestly garments ending in "Holy to the Lord." Seven
 * blocks, teaching kept to four lines so a four-chapter day still lands
 * in range.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 28,
  title: "The Tabernacle",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 28. Yesterday God sealed the covenant in blood. Today He tells Moses how to build Him a house.", 750],
    ["Not a temple made to impress anyone walking by. A tent, in the middle of the camp, with God living inside it.", 800],
    ["Gold, curtains, a table, a lamp, an altar, and clothes for the men who will serve there.", 800],
    ["Every measurement in these chapters is answering one question. How does a holy God live next door to people who are not.", 850],
    ["We are in Exodus 25 through 28.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(25, 1, 9, [
      "God tells Moses to take an offering, but only from everyone whose heart makes him willing. Not a tax. A willing gift.",
      "The list is stunning. Gold, silver, bronze, blue and purple and scarlet, fine linen, goats' hair, skins, wood, oil, spices, precious stones. Egypt's wealth, given back to the God who brought them out of Egypt.",
      "Then the reason for all of it, in one line. Let them make me a sanctuary, that I may dwell among them. Not a monument. A dwelling.",
      "Not long ago these people were slaves making bricks for a king who never once dwelled among them. Now they are building a tent for a God who wants to.",
    ]),
    g(25, 10, 22, [
      "Inside the tent, the first thing God describes is a gold-covered wooden chest, the ark, built to hold the tablets, the covenant words He just gave them.",
      "On top of it sits the mercy seat, with two cherubim of hammered gold facing each other, their wings stretched out over it.",
      "And there, God says, I will meet with thee, and I will commune with thee from above the mercy seat. That may be the single most important sentence in these four chapters.",
      "Not a throne room built for display. A meeting place, built for mercy.",
    ]),
    g(25, 23, 40, [
      "Next comes a table for bread, kept continually before the Lord, and a lampstand hammered out of a single piece of pure gold, shaped like almond blossoms and branches.",
      "Inside a tent with no windows, that lamp is the only light there is. Somebody has to keep it burning.",
      "Bread and light, sitting inside the dark, inside a tent, inside a desert. God is not just describing furniture. He is describing what it looks like to live in His presence.",
      "Provision and light, placed right next to the spot where He has promised to meet them.",
    ]),
    g(26, 1, 37, [
      "The tent itself gets built in layers. Fine linen curtains worked with blue and purple and scarlet and cherubim, then goats' hair over that, then rams' skins dyed red, then a tough outer covering on top of it all.",
      "Glory on the inside. Protection on the outside. Nobody walking past this tent in the wilderness would guess what was hanging inside it.",
      "And in the middle of the tent hangs a veil, embroidered with cherubim, separating the holy place from the Most Holy Place, where the ark will sit.",
      "God is near enough to live in the middle of the camp, and still too holy to be walked in on uninvited. Both of those things are true at the same time.",
    ]),
    g(27, 1, 21, [
      "Outside the tent, in the courtyard, stands a bronze altar, built before anyone ever reaches the holy place inside.",
      "That order matters. Nobody walks past a sacrifice to get to God. Sacrifice comes first.",
      "The courtyard itself is fenced off with linen hangings, marking a boundary around the whole place. You can come near, but only through the gate God set.",
      "The chapter ends with oil for a lamp that has to keep burning every single night, tended by Aaron's sons, from evening until morning. God's presence does not run on autopilot.",
    ]),
    g(28, 1, 30, [
      "God turns from the tent itself to the men who will serve inside it. Aaron and his sons are set apart as priests, and their clothes are made, in God's own words, for glory and for beauty.",
      "On the ephod are two stones, engraved with the names of Israel's twelve tribes, six on each shoulder. The priest walks in carrying the whole nation on his back.",
      "Then comes the breastpiece, set with twelve more stones, one for each tribe, worn over his heart when he goes in before the Lord.",
      "Aaron does not carry his own name into the holy place. He carries theirs. Shoulders for the weight of them, heart for the love of them.",
    ]),
    g(28, 31, 43, [
      "The rest of the garments follow. A robe with bells and pomegranates sewn around the hem, so the sound of him moving is heard before he is seen. A turban, a sash, linen underneath, so nothing is exposed.",
      "On the front of the turban sits a plate of pure gold, engraved with two words. Holy to the Lord.",
      "Everything Aaron wears says the same thing from a different angle. This man does not enter on his own terms. He enters covered, marked, and set apart.",
      "Exodus 28 ends with a warning, not a blessing. The priests must serve exactly as commanded, so that they do not bear iniquity and die. Nearness to God was never meant to be casual.",
    ]),
  ],
  closing: [
    ["So that is Day 28.", 700],
    ["A willing offering, an ark with a mercy seat, bread and light in the dark, a veil, an altar outside the tent, and a priest wearing the whole nation on his shoulders and over his heart.", 750],
    ["None of it is decoration. Every piece answers the same question. How does God dwell among people who cannot walk in on Him uninvited.", 800],
    ["The answer this whole book keeps giving is the same one. Not by lowering His holiness. By providing a way.", 800],
    ["A mercy seat instead of a bare throne. A veil instead of no boundary at all. A priest who carries the people in instead of leaving them outside.", 850],
    ["Centuries later, John will write that the Word became flesh and dwelt among us. Same word the tabernacle uses for pitching a tent.", 850],
    ["Tomorrow, Exodus 29 through 32. The priests get ordained, and while Moses is still on the mountain, the people build a god out of earrings.", 850],
    ["For now, hold on to the reason God gave for all of this building.", 800],
    ["Let them make me a sanctuary.", 750],
    ["That I may dwell among them.", 1200],
  ],
};
