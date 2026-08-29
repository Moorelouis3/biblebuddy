import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 30, written to the Day 1 standard.
 *
 * Exodus 33-36: God threatens to withdraw His presence, Moses intercedes at
 * the tent of meeting and asks to see God's glory, the covenant is renewed
 * and the ten commandments rewritten, and the tabernacle finally gets built
 * from the willing offering. Seven blocks; the last two consolidate the
 * offering and construction chapters, which are largely repeating the plan
 * from Exodus 25-31 now carried out. Every block stays inside one chapter,
 * since the block shape is single-chapter only.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 30,
  title: "God's Presence Is Enough",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 30. Three thousand people are dead in the camp, and Moses still has to lead the survivors somewhere.", 750],
    ["God says He will send an angel ahead of them, but not go with them Himself. Too dangerous, He says. You are a stiffnecked people.", 800],
    ["That is the worst news Israel has heard yet. Worse than slavery. Worse than the wilderness.", 850],
    ["So Moses does something nobody else in this book has done. He asks to see God's face.", 900],
    ["We are in Exodus 33 through 36.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(33, 1, 11, [
      "God tells Moses to lead the people on to the land He promised, but adds something devastating. I will not go up in the midst of thee, for thou art a stiffnecked people, lest I consume thee in the way. An angel will go instead of Him.",
      "The people hear it and mourn, and strip off their ornaments, the same kind of jewelry some of them melted into a calf two chapters ago. This time the stripping is grief, not gold.",
      "Moses pitches a tent outside the camp and calls it the tabernacle of the congregation. Whoever wants to seek the Lord now has to walk out to it, and the cloud comes down at the door when he goes in.",
      "And Scripture says something almost too plain to believe. The Lord spoke unto Moses face to face, as a man speaketh unto his friend. Joshua stays behind in the tent even after Moses leaves.",
    ]),
    g(33, 12, 23, [
      "Moses presses God for more than directions. Shew me now thy way, that I may know thee. He wants relationship, not just an itinerary.",
      "God answers with the line that gives this day its center. My presence shall go with thee, and I will give thee rest.",
      "And Moses will not settle for less. If thy presence go not with me, carry us not up hence. He would rather stay in the wilderness with God than reach the land without Him.",
      "Then Moses asks to see God's glory, and God hides him in a cleft of the rock and lets him see only His back as He passes. No man can see my face and live. Moses gets as close as anyone ever will.",
    ]),
    g(34, 1, 9, [
      "God tells Moses to cut two new tablets and climb back up, alone this time, no crowd watching from below.",
      "And there God does something He has never done before in this book. He proclaims His own name out loud. The Lord, merciful and gracious, longsuffering, and abundant in goodness and truth.",
      "That sentence becomes the most quoted description of God in the rest of the Old Testament. It comes right after the worst sin Israel has committed so far.",
      "Moses bows his head to the ground immediately and asks for exactly what that name promises. Pardon our iniquity and our sin, and take us for thine inheritance.",
    ]),
    g(34, 10, 35, [
      "God renews the covenant and repeats the warnings that got ignored last time. No treaties with the nations, no other gods, no molten idols. He calls Himself Jealous, by name.",
      "The feasts get restated too. Unleavened bread, weeks, ingathering. Rhythms built into the calendar so the story keeps getting told whether anyone feels like remembering it or not.",
      "Moses is up there forty days and nights again, without bread or water, writing the ten commandments down a second time.",
      "When he comes down, his face is shining, so bright the people are afraid to come near him. He does not even know it himself. He wears a veil afterward, not to hide the glory, but to keep it from fading in front of them unused.",
    ]),
    g(35, 1, 35, [
      "Moses gathers everyone and repeats the Sabbath command before a single hammer swings, then asks for the exact offering God asked for back in chapter 25. Gold, silver, bronze, dyed skins, spun thread, precious stones.",
      "And the people do not hold back. Everyone whose heart made them willing brings something, men and women both, some spinning goats' hair with their own hands on the spot.",
      "It is the same list God gave Moses on the mountain, read back almost word for word. What God asked for in private, the whole camp now brings out loud.",
      "Moses tells them who will build it. Bezaleel and Aholiab, named by God Himself, filled with the Spirit for wisdom and understanding and every kind of craftsmanship.",
    ]),
    g(36, 1, 7, [
      "Bezaleel and Aholiab and every wise-hearted man finally get to work, using exactly what the people brought.",
      "And the offering keeps coming, every single morning, until the craftsmen themselves go to Moses and say something that never happens twice in this book. Stop. We have more than enough.",
      "Moses has to send out an order restraining the people from giving any more. Their generosity outran the need.",
      "The same nation that begged for a god they could see two chapters ago is now the reason a building project has too much gold.",
    ]),
    g(36, 8, 38, [
      "The curtains get woven exactly to spec. Blue, purple, scarlet, fine linen, cherubim worked into the fabric, fifty loops and fifty gold clasps holding it into one tent.",
      "Then the frame. Boards of acacia wood standing upright, overlaid in gold, dropped into silver sockets, forty-eight boards for three walls.",
      "Then the veil goes up, the same design as the outer curtains, marking off the Most Holy Place inside a tent that did not exist a chapter ago.",
      "None of this is filler. Every measurement here is the same plan from Exodus 25, now standing up in the middle of the camp that just built a golden calf.",
    ]),
  ],
  closing: [
    ["So that is Day 30.", 700],
    ["Grief over ornaments, a tent outside the camp, a face hidden in a rock, a name proclaimed out loud, tablets rewritten, and a tabernacle finally rising out of gold and wood and willing hands.", 750],
    ["This whole day answers the fear that opened it. What if God does not come with us.", 800],
    ["He does. Not because Israel earned it back. Three chapters after the golden calf, that is impossible.", 800],
    ["He comes back because of what He said about Himself on the mountain. Merciful and gracious, longsuffering, abundant in goodness and truth.", 850],
    ["And the tent built at the end of this day is proof. God's presence, pitched in the middle of a stiffnecked people, exactly where He said He would not go.", 850],
    ["Tomorrow, Exodus 37 through 40. The tabernacle is finished, and the glory of the Lord fills it.", 850],
    ["For now, hold on to what Moses would not give up.", 800],
    ["If thy presence go not with me,", 750],
    ["carry us not up hence.", 1200],
  ],
};
