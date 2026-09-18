import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 268, written to the Day 1 standard.
 *
 * Micah 3-5: corrupt leaders and paid-off prophets under judgment, then the
 * mountain of the Lord raised above every hill, then a ruler out of
 * Bethlehem Ephratah. Seven blocks across three chapters (40 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Micah ${chapter}:${startVerse}-${endVerse}`,
  book: "micah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 268,
  title: "Corrupt Leaders and Bethlehem's Ruler",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 268. Micah just told you what he actually is.", 750],
    ["Not one of the prophets who tells people whatever keeps the money coming. The one who is full of power, judgment, and might to tell Jacob the truth.", 800],
    ["So today he does exactly that. To the leaders first, then to Zion, then to a promise about a ruler from Bethlehem.", 800],
    ["The city he condemns for blood and bribery is the very city God will not give up on.", 850],
    ["We are in Micah 3, 4, and 5.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(3, 1, 4, [
      "Micah says this straight at the heads of Jacob and the princes of Israel. Is it not for you to know judgment?",
      "Then he tells you what they actually do. They hate the good and love the evil. They pluck the skin off people, break their bones, and cook them like meat in a pot.",
      "That is not decoration. That is what he calls it when leaders eat the very people they are supposed to protect.",
      "So when it is their turn to cry to the Lord, he will not hear them. He will hide his face, the same way they hid theirs from everyone they used.",
    ]),
    g(3, 5, 8, [
      "Now Micah turns to the prophets who make his people wander. If you pay them, they cry peace. If you do not put food in their mouth, they prepare war against you.",
      "So God tells them their own gift will go dark. Night instead of vision, no answer from God at all, and every seer covering his own lips in shame.",
      "Against all of that, Micah says who he is instead. I am full of power by the spirit of the Lord, and of judgment, and of might.",
      "To declare unto Jacob his transgression, and to Israel his sin. Not to make anyone comfortable. To say the true thing out loud, even when it costs him.",
    ]),
    g(3, 9, 12, [
      "He goes back to the leaders one more time. They abhor judgment and twist everything that is fair, yet they build Zion with blood and Jerusalem with wrong.",
      "Judges take bribes, priests teach for a price, prophets tell fortunes for money. Then all of them lean on the Lord and say, is he not among us? No evil can come upon us.",
      "That sentence is the whole problem. Using God's name as a guarantee while doing exactly what makes him leave.",
      "So Micah tells them what is coming instead. Zion will be plowed like a field. Jerusalem will become heaps of rubble. The very mountain where the temple stands will look like an overgrown hill in the forest.",
    ]),
    g(4, 1, 5, [
      "Now the picture flips completely. In the last days, the mountain of the Lord's house will be raised above every hill, and the nations will stream toward it on their own.",
      "They will say it themselves. Come, let us go up, and he will teach us his ways. The law goes out from Zion. Nobody drags them there.",
      "He will judge between nations, and they will beat their swords into plowshares and their spears into pruning hooks. Nation will not lift up a sword against nation, and no one will train for war anymore.",
      "Every man will sit under his own vine and fig tree, with nothing to make him afraid. Micah does not pretend this is true yet. He just says every other nation can walk in its own god's name, but we will walk in the name of the Lord our God forever.",
    ]),
    g(4, 6, 13, [
      "In that day, God says, I will gather the one who is limping, and bring back the one who was driven away, the one I myself afflicted. The remnant is made of exactly the people who got hurt.",
      "The lame will become what is left, the outcasts a strong nation, and the Lord will reign over them from mount Zion from then on.",
      "But before any of that, there is real pain. Be in pain, and labor to give birth, daughter of Zion, like a woman in labor. You will go out of the city and live in the open field. You will go all the way to Babylon.",
      "And that is exactly where God says he will meet her. There the Lord will redeem you from the hand of your enemies. Rescue does not skip the exile. It happens inside it.",
    ]),
    g(5, 1, 5, [
      "Then Micah names the place. But you, Bethlehem Ephratah, though you are little among the thousands of Judah, out of you will come the one who is to be ruler in Israel, whose goings forth have been from of old, from everlasting.",
      "Small town, ancient origin, future king, in one breath.",
      "He will stand and feed his flock in the strength of the Lord, in the majesty of the name of the Lord his God, and they will remain, because now he will be great to the ends of the earth.",
      "And Micah adds one plain line. This man shall be the peace. Not bring peace as a policy. Be peace, in a land about to be walked over by the Assyrian.",
    ]),
    g(5, 6, 15, [
      "The remnant of Jacob will be in the middle of many peoples like dew from the Lord, like showers on the grass that do not wait for anyone's permission.",
      "But the same remnant will also be like a lion among the flocks, treading down and tearing to pieces with none able to deliver. Same people, gentle as dew and dangerous as a lion, depending on who they are standing next to.",
      "Then God turns to what has to go. I will cut off your horses, destroy your chariots, throw down your strongholds, the things Israel trusted instead of him.",
      "I will cut off your witchcrafts, your soothsayers, your graven images, your standing images, so you no longer worship the work of your own hands. He is not just judging the nations around them. He is cleaning house.",
    ]),
  ],
  closing: [
    ["So that is Day 268.", 700],
    ["Leaders who ate their own people. Prophets who sold peace to whoever paid them. And Micah, standing alone, full of the Spirit, saying the true thing anyway.", 800],
    ["Then, in the same book, a mountain raised above every hill, swords turned into plow blades, and a ruler coming out of a town too small to matter.", 800],
    ["Bethlehem Ephratah. Ancient. Overlooked. Exactly where God chose to start.", 800],
    ["The remnant God gathers is not the strong. It is the limping, the driven out, the ones he himself had to afflict first.", 850],
    ["And rescue does not wait for Zion to reach safety. It meets her in Babylon, in the middle of the exile she is dreading.", 850],
    ["Tomorrow, Micah 6 and 7, and the start of Nahum. What the Lord actually requires, and a warning collides with mercy.", 850],
    ["For now, hold on to what this man from Bethlehem is called.", 800],
    ["This man shall be the peace.", 750],
    ["Not bring it. Be it.", 1200],
  ],
};
