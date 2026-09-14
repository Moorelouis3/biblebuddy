import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 204, written to the Day 1 standard.
 *
 * Isaiah 25-27 turns hard after chapter 24's total collapse: a feast for every
 * nation, death swallowed up, a city kept in perfect peace, and Israel
 * gathered home from as far as Assyria and Egypt. Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 204,
  title: "Feast, Resurrection, and Restoration",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 204.", 700],
    ["Yesterday ended in judgment stacked on judgment, the whole earth emptied out.", 800],
    ["Today it turns all the way around. A feast on a mountain. Death itself swallowed up.", 800],
    ["Some of the clearest resurrection language in the entire Old Testament shows up right here.", 850],
    ["We are in Isaiah 25, 26, and 27.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(25, 1, 5, [
      "Isaiah opens praising God for something that already happened. A strong city turned to a heap, a palace of strangers gone for good. He is celebrating a defeat he watched.",
      "Verse four names why. God has been a strength to the poor, a strength to the needy in distress, a refuge from the storm, a shadow from the heat. Not distant. Present in the exact moment of trouble.",
      "Even the terrible ones get named directly. Their noise, their blast against the wall, gets brought down the way heat fades under a passing cloud.",
      "This whole chapter reads like Isaiah caught his breath after chapter 24's collapse and found something worth singing about on the other side of it.",
    ]),
    g(25, 6, 12, [
      "On this mountain, the Lord makes a feast for all people. Fat things, wine well refined. Not Israel alone. All people, said twice, on purpose.",
      "Then the line the New Testament keeps quoting. He will swallow up death in victory, and the Lord God will wipe away tears from off all faces.",
      "Verse nine: lo, this is our God, we have waited for him, and he will save us. Not a title handed to God after the fact. Recognition, finally, of who was there the whole time.",
      "Moab gets one ugly, specific image tucked right after that: trodden down like straw for a dunghill. God's feast for all people does not erase what proud, hostile nations built their pride on.",
    ]),
    g(26, 1, 11, [
      "Judah gets handed an actual song to sing. We have a strong city, salvation will God appoint for walls and bulwarks. Strong not because of the walls. Strong because of the salvation.",
      "Verse three is one of the most quoted lines in Isaiah. Thou wilt keep him in perfect peace, whose mind is stayed on thee, because he trusteth in thee. Peace tied to where the mind stays, not to what is happening around it.",
      "Verse ten is blunt. Let favor be shown to the wicked, and he still will not learn righteousness. Some people only ever learn from judgment. Kindness alone does not reach them.",
      "Isaiah admits his own posture too. With my soul have I desired thee in the night, and with my spirit will I seek thee early. Wanting God is not automatic, even for him. He reaches for it, morning and night.",
    ]),
    g(26, 12, 21, [
      "Isaiah lists other lords that once ruled over them and writes them off completely. They are dead, they shall not live, they are deceased, they shall not rise. Their line ends. Nothing left of them.",
      "Then a few verses later, the exact opposite promise for God's own people. Thy dead men shall live, together with my dead body shall they arise. Awake and sing, ye that dwell in dust.",
      "Verse eighteen is painfully honest in between those two promises. We have been with child, we have been in pain, we have as it were brought forth wind. All that labor, and nothing yet to show for it. Isaiah will not pretend the waiting has already paid off.",
      "Then the tenderest line in the chapter. Come, my people, enter into thy chambers, hide thyself as it were for a little moment, until the indignation be overpast. God tells them to take shelter from what is coming, not to stand out in it exposed.",
    ]),
    g(27, 1, 6, [
      "The chapter opens with leviathan, the piercing serpent, the dragon in the sea, and the Lord's sword finally used against it. Whatever that old chaos represents, its ending is already decided.",
      "Then the tone flips completely. Sing to her, a vineyard of red wine. I the Lord do keep it, I will water it every moment, lest any hurt it I will keep it night and day. The care is constant, not occasional.",
      "Verse four: fury is not in me. Anyone picking a fight with briers and thorns just gets burned. God is not out looking for a reason to be angry.",
      "Verse six says it plainly. Jacob will take root, Israel will blossom and bud and fill the face of the world with fruit. Not survival. Growth on a scale nobody watching chapter 24's ruin would have expected.",
    ]),
    g(27, 7, 13, [
      "God asks a pointed question. Has he struck Israel the way he struck the ones who struck them? The discipline coming their way is real, but it is not the same weight as judgment on their enemies. It is measured.",
      "Verse nine names the actual purpose. This is how the iniquity of Jacob is purged, when the altar stones are beaten down like chalkstone and the idols do not stand back up. Punishment was never the end goal. Removing the sin was.",
      "Then the chapter widens into gathering. The Lord threshes them out one by one, like grain, from the river to the stream of Egypt. Nobody in that scattering gets missed or forgotten.",
      "The great trumpet sounds, and the ones ready to perish in Assyria, the outcasts in Egypt, come home and worship the Lord on the holy mountain at Jerusalem. Everyone Isaiah has described being scattered gets described coming back.",
    ]),
  ],
  closing: [
    ["So that is Day 204.", 700],
    ["A feast for every nation. Death swallowed up. A city kept in perfect peace because its mind stays on God. A vineyard watered every single moment.", 800],
    ["Chapter 24 tore the whole world down. These three chapters are what God builds in its place.", 800],
    ["Notice what keeps repeating. We have waited for him. Thy dead men shall live. I keep it night and day. None of it is passive on God's side.", 850],
    ["And notice who He goes looking for in the middle of it. The poor. The needy. The ones scattered as far as Assyria and Egypt. Not the impressive. The lost.", 850],
    ["Tomorrow, Isaiah 28 through 30. False security, and what real rest actually costs.", 850],
    ["For now, sit with the line Judah sang over their own city.", 800],
    ["Thou wilt keep him in perfect peace,", 700],
    ["Whose mind is stayed on thee.", 1200],
  ],
};
