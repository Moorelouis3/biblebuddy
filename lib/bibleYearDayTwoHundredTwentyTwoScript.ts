import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 222, written to the Day 1 standard.
 *
 * Jeremiah 13-15: a buried linen girdle comes back ruined as a picture of
 * Judah's pride, a drought starves the land down to the wild donkeys, and
 * Jeremiah moves from confessing the nation's sin to complaining about his
 * own unhealed wound. Six blocks across three chapters (70 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 222,
  title: "Pride, Drought, and Intercession",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 222. God tells Jeremiah to bury a brand new linen belt in the dirt, on purpose, and go dig it up later.", 750],
    ["It comes out ruined. That is the whole point.", 800],
    ["Then the rain stops completely, and Jeremiah begs God to send it back.", 800],
    ["And when God says no, Jeremiah asks him something harder. Why will my own wound not heal?", 850],
    ["We are in Jeremiah 13, 14, and 15.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(13, 1, 11, [
      "God tells Jeremiah to buy a linen girdle, wear it, and never let it touch water. Then, later, to carry it all the way to the Euphrates and hide it in a hole in the rock.",
      "Many days after that, God sends him back to dig it up. And it is ruined. Rotted, filthy, good for nothing.",
      "Here is what it means. Just as that girdle clings to a man's waist, God made the whole house of Israel and Judah cling to him, to be his people, his name, his praise, his glory. And they would not listen.",
      "A garment worn close to the skin, left in the ground until it rots. That is what happens to something this close when it is buried instead of worn.",
    ]),
    g(13, 12, 27, [
      "God gives Jeremiah a second picture. Every bottle shall be filled with wine. Everyone already knows that saying. It sounds almost cheerful.",
      "Then he tells them what it actually means. I will fill everyone in this land with drunkenness, and dash them against each other, fathers and sons together. The proverb they know becomes the judgment they get.",
      "He pleads with them once more before it lands. Give glory to the Lord your God before he brings darkness. If you will not hear it, my soul will weep in secret for your pride.",
      "Then the line that names the real problem. Can the Ethiopian change his skin, or the leopard his spots? Then you also may do good, who are used to doing evil. So he says he will scatter them like stubble in the wind, because they forgot him and trusted a lie.",
    ]),
    g(14, 1, 9, [
      "The rain stops, and Jeremiah does not summarize it, he shows you the ground. The gates of Judah languish. Nobles send servants for water and they come back with empty jars, ashamed, covering their heads.",
      "Even the animals go first. The doe calves in the field and abandons her fawn because there is no grass. Wild donkeys stand on the hills panting for air like dragons, because their eyes are failing.",
      "And Jeremiah prays straight into it instead of just describing it. Though our sins testify against us, act anyway, Lord, for your own name's sake.",
      "Then he asks the question underneath every drought. Why are you like a stranger here, like a soldier who cannot save? You are among us. We are called by your name. Do not leave us.",
    ]),
    g(14, 10, 22, [
      "God's answer is not comfort. This people love to wander, they have not held their feet back, so I will not accept them now. I will remember their sin and deal with it.",
      "He tells Jeremiah plainly, do not even pray for their good anymore. When they fast, I will not hear it. I will finish this with sword, famine, and plague.",
      "Meanwhile other prophets are telling everyone the opposite. You will not see sword or famine, you will have lasting peace. God says he never sent them, and that lie will get people killed in the very streets they were promised peace in.",
      "Jeremiah cannot hold it together after that. Let my eyes run down with tears night and day. In the field, the slain. In the city, the starving. Then he prays the nation's own confession for them. We have sinned against you. Do not abhor us. Only you can send rain, so we will wait on you.",
    ]),
    g(15, 1, 9, [
      "God's next line is about as final as Scripture gets. Even if Moses and Samuel stood in front of me pleading, my mind would not turn toward this people. Send them out of my sight.",
      "He lists exactly where they will go. Whoever is for death, to death. For the sword, the sword. For famine, famine. For captivity, captivity. Four ways out, and none of them is home.",
      "He names why, specifically. Because of Manasseh, king of Judah, and what he did in Jerusalem. One king's choices are still being paid for by the generation reading this.",
      "Then the line that should stop you. I am weary with relenting. God is not shown here as eager to punish. He is shown as worn out from changing his mind and being disappointed again.",
    ]),
    g(15, 10, 21, [
      "Jeremiah breaks. Woe is me, my mother, that you bore me a man of conflict to the whole earth. I have not wronged anyone over money, and everyone curses me anyway.",
      "Then he says something that only makes sense coming from someone who has actually eaten the words. Your words were found, and I ate them, and your word was the joy and rejoicing of my heart. I sat alone, because your hand was on me.",
      "And right after that comes the complaint. Why is my pain never-ending, my wound incurable, refusing to heal? Will you really be to me like someone who lies, like a stream that runs dry the moment I need it? He says both things back to back, without smoothing either one out.",
      "God's answer is not a rebuke, it is an offer. If you return, I will bring you back to stand before me. I will make you a wall of bronze against this whole nation, because I am with you to save you and rescue you.",
    ]),
  ],
  closing: [
    ["So that is Day 222.", 700],
    ["A belt buried until it rots. Bottles filled just to be smashed together. A drought that starves the animals before it starves the people.", 800],
    ["And in the middle of all of it, Jeremiah does not perform. He complains, he begs, he asks God why his own wound will not heal.", 800],
    ["God's answer to that complaint is never punishment. It is an offer to come back and stand in front of him again.", 800],
    ["Even weary with relenting, even after saying his own mind would not turn, God still tells Jeremiah, if you return, I will bring you back.", 850],
    ["That is the shape of this whole book. Judgment that is real, and a door back in that never actually closes.", 850],
    ["Tomorrow, Jeremiah 16, 17, and 18. A sign acted out with Jeremiah's own life, a warning about trusting people instead of God, and a potter starting the clay over.", 850],
    ["For now, hold on to the line Jeremiah said about God's word.", 800],
    ["I found it, and I ate it.", 750],
    ["It was the joy of his heart, even on his worst day.", 1200],
  ],
};
