import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 199, written to the Day 1 standard.
 *
 * Isaiah 10-12 closes out the Book of Immanuel: Assyria, God's own weapon,
 * gets judged for its own pride; a Branch from Jesse's stump brings the
 * peace Ahaz never trusted God for; and the section ends in a short song of
 * praise. Five blocks, since the reading is lighter than yesterday's.
 */

const isa = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 199,
  title: "Judgment, Remnant, and Salvation",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 199.", 650],
    ["Yesterday, Assyria was God's weapon against Judah.", 750],
    ["Today, that same weapon gets judged for thinking it swung itself.", 800],
    ["Then, out of a stump that looks completely dead, something new grows.", 850],
    ["And the whole section ends the only way it can. With a song.", 800],
    ["We are in Isaiah 10, 11, and 12.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    isa(10, 1, 19, [
      "The chapter opens with one more woe — unto them that decree unrighteous decrees... to turn aside the needy from judgment, and to take away the right from the poor. Judah's own corrupt rulers, robbing widows and orphans through the courts instead of the streets.",
      "Then God turns to the weapon he's been swinging against them. O Assyrian, the rod of mine anger, and the staff in their hand is mine indignation. Assyria was never independent. It was always a tool, sent to punish an hypocritical nation.",
      "But Assyria doesn't see it that way. Howbeit he meaneth not so, neither doth his heart think so; but it is in his heart to destroy and cut off nations not a few. The king boasts, by the strength of my hand I have done it, and by my wisdom. He thinks the conquest is his own genius.",
      "God answers with one image: shall the axe boast itself against him that heweth therewith? An axe doesn't get credit for the tree it cuts down. The hand holding it does. Because Assyria forgot whose hand it was, its own strength is about to be turned into leanness and a burning fire.",
    ]),
    isa(10, 20, 34, [
      "In the middle of Assyria's coming punishment, a promise breaks through. The remnant of Israel... shall no more again stay upon him that smote them; but shall stay upon the LORD. Judgment on the oppressor becomes the moment Israel finally leans on the right source of safety.",
      "God tells his people directly, be not afraid of the Assyrian: he shall smite thee with a rod... for yet a very little while, and the indignation shall cease. The suffering has an expiration date, even if it doesn't feel like it yet.",
      "Then Isaiah tracks Assyria's army town by town, closing in on Jerusalem — he is come to Aiath, he is passed to Migron... Ramah is afraid; Gibeah of Saul is fled. Naming real places on the map makes the threat impossible to treat as abstract.",
      "But the chapter ends with the invader, not the victim, getting cut down. The Lord... shall lop the bough with terror: and the high ones of stature shall be hewn down. Lebanon's famous forest, a symbol of unmatched strength, falls by a mightier one than itself.",
    ]),
    isa(11, 1, 9, [
      "Out of that same felled forest comes something unexpected. There shall come forth a rod out of the stem of Jesse, and a Branch shall grow out of his roots. Not from a flourishing tree — from a stump. Jesse's royal line looks finished, and life comes out of it anyway.",
      "This Branch is described entirely by what rests on him — the spirit of the LORD... of wisdom and understanding, of counsel and might, of knowledge and of the fear of the LORD. Every quality Ahaz lacked two chapters ago, this king has in full.",
      "His justice doesn't depend on appearances — he shall not judge after the sight of his eyes, neither reprove after the hearing of his ears: but with righteousness shall he judge the poor. The very group Isaiah just condemned corrupt judges for robbing gets real justice under this King.",
      "Then the peace spreads past people, into creation itself — the wolf also shall dwell with the lamb... and a little child shall lead them... they shall not hurt nor destroy in all my holy mountain. The predator-and-prey order that's defined the whole world simply stops.",
    ]),
    isa(11, 10, 16, [
      "The root of Jesse becomes something Gentiles seek too, not just Israel — to it shall the Gentiles seek: and his rest shall be glorious. This king's reach goes past one nation's borders from the very start.",
      "God promises to recover the remnant of his people a second time, scattered as far as Assyria, Egypt, Cush, and Elam — nations in every direction. No distance is too far for this gathering.",
      "And the old wound gets specifically named and healed — the envy also of Ephraim shall depart... Ephraim shall not envy Judah, and Judah shall not vex Ephraim. The two kingdoms whose rivalry helped start this whole crisis back in chapter 7 are pictured finally at peace with each other.",
      "The regathering is compared to the exodus itself — an highway for the remnant of his people... like as it was to Israel in the day that he came up out of the land of Egypt. The same God who parted a sea once will do whatever it takes to bring his scattered people home again.",
    ]),
    isa(12, 1, 6, [
      "The whole section, chapters 7 through 12, ends in a song instead of a sermon. In that day thou shalt say, O LORD, I will praise thee: though thou wast angry with me, thine anger is turned away, and thou comfortedst me. The anger was real. So is its ending.",
      "The singer's confidence rests on one line worth slowing down on — behold, God is my salvation; I will trust, and not be afraid: for the LORD JEHOVAH is my strength and my song. The fear that gripped Ahaz in chapter 7 is completely gone here. Same threats in the background, opposite response.",
      "Salvation is pictured as something ordinary and daily — with joy shall ye draw water out of the wells of salvation. Not a dramatic rescue scene, just a well you return to again and again because it never runs dry.",
      "And the song insists this joy isn't private — declare his doings among the people, make mention that his name is exalted... great is the Holy One of Israel in the midst of thee. A remnant that has been gathered from every scattered corner of the earth finally has one voice, and uses it to shout, not whisper.",
    ]),
  ],
  closing: [
    ["So that is Day 199.", 700],
    ["An axe that forgot it was only an axe, and got put back in its place.", 750],
    ["A remnant told to stop leaning on the very empire that struck them, and lean on God instead.", 800],
    ["Then a stump that looked completely dead, growing a Branch with everything Ahaz never had — wisdom, justice, and the fear of the Lord.", 850],
    ["Wolves and lambs. Ephraim and Judah. Old enemies, made peaceable, all under the same King.", 800],
    ["That's how six hard chapters, full of trembling kings and stretched-out judgment, end. Not in dread. In a song.", 850],
    ["Though thou wast angry with me, thine anger is turned away, and thou comfortedst me.", 850],
    ["Tomorrow, Isaiah 13 through 15. The oracles turn outward, to the nations surrounding God's people.", 850],
    ["For now, carry the singer's line.", 750],
    ["I will trust, and not be afraid.", 1200],
  ],
};
