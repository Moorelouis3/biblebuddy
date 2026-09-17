import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 258, written to the Day 1 standard.
 *
 * Hosea 4-6: the marriage of chapters 1-3 becomes a courtroom. God brings a
 * formal controversy against the whole land, starting with the priests, then
 * naming Ephraim and Judah both, before turning - twice - toward a call to
 * come back. Six blocks: two for chapter 4, two for chapter 5, two for
 * chapter 6, so the third-day line and the mercy line each get their own
 * block instead of being buried in a longer one.
 */

const hos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hosea ${chapter}:${startVerse}-${endVerse}`,
  book: "hosea",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 258,
  title: "Covenant Betrayal and Mercy",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 258. Yesterday ended with Hosea buying his own wife back for fifteen pieces of silver.", 750],
    ["Today the tone changes. Chapters 1 through 3 were a marriage. Chapters 4 through 6 are a courtroom.", 800],
    ["God brings a controversy against the whole land, and He names names. Priests. Prophets. Princes.", 800],
    ["And buried in the middle of the charge sheet is one line so important that Jesus will quote it twice, to the most religious men in the room.", 850],
    ["We are in Hosea 4 through 6.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hos(4, 1, 11, [
      "Hear the word of the LORD, ye children of Israel: for the LORD hath a controversy with the inhabitants of the land, because there is no truth, nor mercy, nor knowledge of God in the land. Controversy is a courtroom word. God is not venting. He is filing a case.",
      "By swearing, and lying, and killing, and stealing, and committing adultery, they break out, and blood toucheth blood. Five charges, back to back, with no space between them. That is what is left when a nation runs out of the knowledge of God.",
      "My people are destroyed for lack of knowledge: because thou hast rejected knowledge, I will also reject thee, that thou shalt be no priest to me. God is not addressing the crowd here. He is addressing the men whose only job was to keep His people from arriving at this exact verse.",
      "And there shall be, like people, like priest: and I will punish them for their ways. The corruption did not start at the bottom and climb up. It started at the top and rotted down. Whoredom and wine and new wine take away the heart, and an empty heart worships whatever is standing closest to it.",
    ]),
    hos(4, 12, 19, [
      "My people ask counsel at their stocks, and their staff declareth unto them: for the spirit of whoredoms hath caused them to err. Picture it plainly. Grown men asking a carved piece of wood which way to walk, because they had already rejected the one voice worth asking.",
      "They sacrifice upon the tops of the mountains, and burn incense upon the hills, under oaks and poplars and elms, because the shadow thereof is good. No mention of holiness anywhere in that reason. Just comfort. They picked the spot because it felt nice to sit under.",
      "I will not punish your daughters when they commit whoredom, nor your spouses when they commit adultery: for themselves are separated with whores. God points out the obvious. The fathers were the example. The daughters just learned the family trade.",
      "Ephraim is joined to idols: let him alone. Four words, and they are heavier than any threat in the chapter. Sometimes judgment is not a strike from God. It is God stepping back and letting a choice finally run its full course.",
    ]),
    hos(5, 1, 7, [
      "Hear ye this, O priests; and hearken, ye house of Israel; and give ye ear, O house of the king; for judgment is toward you. Three groups named in one breath: the worship leaders, the ordinary people, the throne. Nobody in the land gets to sit this verse out.",
      "I know Ephraim, and Israel is not hid from me: for now, O Ephraim, thou committest whoredom, and Israel is defiled. Whatever they thought they were getting away with quietly, God says plainly that He already knew.",
      "And the pride of Israel doth testify to his face: therefore shall Israel and Ephraim fall in their iniquity; Judah also shall fall with them. Their own arrogance becomes the witness against them, and it drags Judah down too, even though Judah is not the chapter's main target yet.",
      "They shall go with their flocks and with their herds to seek the LORD; but they shall not find him; he hath withdrawn himself from them. This is the coldest verse in the block. They bring the right offerings and still come up empty, because the search itself had become transactional. God had not moved. They had moved too far to find Him that way.",
    ]),
    hos(5, 8, 15, [
      "Blow ye the cornet in Gibeah, and the trumpet in Ramah: cry aloud at Beth-aven, after thee, O Benjamin. This is an alarm being sounded in real time, not a prophecy about some far-off century. Invasion is already on its way.",
      "Therefore will I be unto Ephraim as a moth, and to the house of Judah as rottenness. Then, a few verses later, I will be unto Ephraim as a lion. God gives them a slow decay first, quiet enough to miss, and only turns sudden and violent once they refuse to notice.",
      "When Ephraim saw his sickness, and Judah saw his wound, then went Ephraim to the Assyrian, and sent to king Jareb: yet could he not heal you, nor cure you of your wound. They felt the damage and ran straight past the one physician who could fix it, to a foreign king who never could.",
      "I will go and return to my place, till they acknowledge their offence, and seek my face: in their affliction they will seek me early. God's withdrawal has an endpoint built into it. He is not leaving to be rid of them. He is waiting for them to actually want Him back.",
    ]),
    hos(6, 1, 3, [
      "Come, and let us return unto the LORD: for he hath torn, and he will heal us; he hath smitten, and he will bind us up. This is the turn the last two chapters have been building toward. The same hand that tore them is the only hand that can heal them.",
      "After two days will he revive us: in the third day he will raise us up, and we shall live in his sight. A whole nation, praying for a resurrection on the third day, long before that happened to one man instead of a people.",
      "Then shall we know, if we follow on to know the LORD. Not a single moment of coming back, but a following, a continuing. One good prayer is not the same thing as a changed direction.",
      "His going forth is prepared as the morning; and he shall come unto us as the rain, as the latter and former rain unto the earth. God's reliability gets compared to sunrise and rainfall, the two most dependable things these farmers knew. Hold that image. The next block is about to test it.",
    ]),
    hos(6, 4, 11, [
      "O Ephraim, what shall I do unto thee? For your goodness is as a morning cloud, and as the early dew it goeth away. This is God's answer to that beautiful prayer in verse one. He is not rejecting the words. He is naming exactly how fast this kind of devotion tends to evaporate.",
      "For I desired mercy, and not sacrifice; and the knowledge of God more than burnt offerings. Six words that Jesus will quote twice in the Gospels, both times to religious men who had kept every ritual and still missed the person standing right in front of them.",
      "As troops of robbers wait for a man, so the company of priests murder in the way by consent: for they commit lewdness. The men who were supposed to guard the road became the danger on it. The title of priest did not stop them. It gave them cover.",
      "Also, O Judah, he hath set an harvest for thee, when I returned the captivity of my people. Even here, in the middle of an indictment this heavy, there is a harvest already appointed. Judgment never gets the last word in this book. Mercy always does.",
    ]),
  ],
  closing: [
    ["So that is Day 258.", 700],
    ["A lawsuit against a whole nation, and it starts with the priests, not the crowd.", 750],
    ["My people ask counsel at their stocks. Grown men asking advice from a piece of wood, because they had already rejected the only voice worth asking.", 800],
    ["And after chapter after chapter of charges, God still says come, and let us return unto the LORD: for he hath torn, and he will heal us.", 800],
    ["After two days will he revive us: in the third day he will raise us up. A nation praying for a resurrection, long before it happened to one man.", 850],
    ["Then their good intentions faded like a morning cloud, and God said the thing He actually wanted all along. I desired mercy, and not sacrifice.", 850],
    ["Tomorrow, Hosea 7 through 9. Israel's heart keeps wandering, and the images get stranger.", 850],
    ["For now, sit with the mercy line.", 800],
    ["Not sacrifice. Mercy.", 750],
    ["That is still what He wants from you before anything else.", 1200],
  ],
};
