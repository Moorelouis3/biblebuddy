import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 224, written to the Day 1 standard.
 *
 * Jeremiah 19-21: a clay jar smashed beyond repair in the valley where
 * children were once sacrificed, a priest who beats Jeremiah for saying so
 * and gets renamed Terror on every side, Jeremiah's own raw collapse into
 * cursing his birth, and Zedekiah's request for a miracle answered with a
 * call to surrender. Six blocks across three chapters (47 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 224,
  title: "Broken Jar and Jerusalem Warned",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 224. God tells Jeremiah to buy a clay jar, walk it out to a valley outside the city, and smash it in front of witnesses.", 750],
    ["Then a priest beats him for saying it and locks him in the stocks overnight.", 750],
    ["By the end of the chapter Jeremiah is cursing the day he was born.", 800],
    ["And Judah's own king sends messengers asking for a miracle, only to be told the real one is surrender.", 850],
    ["We are in Jeremiah 19, 20, and 21.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 9, [
      "God sends Jeremiah to buy a potter's earthen jar, gather some elders and priests, and walk out to the valley of Hinnom, just outside the gate, to say the words out loud right there.",
      "That valley already had a name for a reason. Children had been burned there as offerings to Baal, something God says plainly he never commanded, never spoke, never even had in mind. So it gets a new name. Not Tophet anymore. The valley of slaughter.",
      "God lays out exactly why. They forsook him, filled this place with the blood of the innocent, built altars to a god that never asked for any of it.",
      "What follows sounds brutal because the crime committed in that valley was brutal. Siege so bad that people end up eating their own children. A city left so desolate that people passing by just stop and hiss.",
    ]),
    g(19, 10, 15, [
      "Before Jeremiah says another word, he does something physical. He breaks the jar, right there in front of the men who walked out with him.",
      "Then he tells them what it means. God is going to break this city and this people the same way. Shattered so completely a potter's vessel like that one can never be pieced back together.",
      "Tophet will fill with the dead until there is no more room left to bury anyone. And the houses of Jerusalem, even the king's own house, get named right alongside that valley, because incense went up to false gods on their own rooftops.",
      "Jeremiah does not stay out in the valley with that news. He walks straight into the temple courtyard, the most respectable address in the city, and says the same thing again to everyone standing there.",
    ]),
    g(20, 1, 6, [
      "Pashur is a priest and the chief officer of the temple. He hears Jeremiah's sermon and answers it by striking him, then locking him in the stocks at the main gate, where everyone can see.",
      "When Jeremiah gets let out the next morning, he does not back down. He renames the man on the spot. Not Pashur anymore. Magor-missabib. Terror on every side.",
      "Then he tells him exactly what that name will mean for his life. Everyone he loves dies by the sword in front of him, and Babylon carries what is left of him away to die far from home.",
      "Pashur used force to shut Jeremiah up for one day. Jeremiah answered him with a sentence that outlived them both.",
    ]),
    g(20, 7, 13, [
      "Then Jeremiah stops sounding like a prophet and starts sounding like a man falling apart, and Scripture just lets it stand. Lord, you deceived me, and I let you. You are stronger than I am, and you have won. Everyone mocks me, all day long.",
      "He tries to quit. Says he will not mention God's name again, will not speak one more word in it. But he cannot hold it. The word sits in his bones like a fire shut up inside him, and holding it in wears him out worse than saying it ever did.",
      "People who used to know him are waiting for him to trip, hoping to catch him and finally get even. That is some of what honesty about faith actually costs. Not applause. Just people watching, hoping you fail.",
      "And still, somewhere inside all of that, he says it anyway. The Lord is with me like a warrior who strikes fear. Sing to the Lord. He rescues the life of the needy from the hand of evildoers. Complaint and praise, in the very same breath.",
    ]),
    g(20, 14, 18, [
      "Then the chapter goes somewhere even lower. Jeremiah curses the day he was born. Not as a figure of speech. Let the day my mother had me not be blessed.",
      "He curses the man who ran to his father with the news that a son was born, and wishes on that stranger the fate of the cities God destroyed without mercy.",
      "He says he wishes he had died in the womb, so his mother's body could have simply been his grave, and he would never have had to see any of this.",
      "This is in the Bible. Not trimmed out, not softened. A man doing exactly what God asked of him, wishing out loud that he had never been born. Scripture does not rush to fix that. It just lets him say it.",
    ]),
    g(21, 1, 14, [
      "Chapter 21 jumps years ahead. King Zedekiah sends two men to Jeremiah with a request dressed up as hope. Babylon's army is already at the gates. Ask the Lord if he will do one of his wonders and make them leave.",
      "God's answer is the opposite of what they came for. I myself will fight against you, with my own hand raised, in anger and fury and great wrath. The God they wanted to save them from Babylon says he is siding with Babylon.",
      "Then he lays out two ways to survive what is coming. Stay in the city, and die by sword, famine, or plague. Walk out and surrender to the Chaldeans, and you live. Surrender, from Jerusalem's own prophet, is called the way of life.",
      "And one last word, aimed straight at the house of David. Do justice in the morning, rescue the person being robbed, or my fury goes out like a fire no one can put out. The warning does not skip the palace. It starts there.",
    ]),
  ],
  closing: [
    ["So that is Day 224.", 700],
    ["A jar broken in a valley that used to hear children die, a prophet locked in the stocks and renamed Terror on every side, and a king asking for a miracle he did not actually want the answer to.", 800],
    ["Jeremiah is not a distant, composed voice in these chapters. He curses his own birthday in the same book where he says the Lord is with me like a warrior.", 800],
    ["Scripture keeps both of those lines. It does not edit him down to just the brave parts.", 800],
    ["And when Zedekiah finally asks a straight question, he gets a straight answer he never expected. Surrender to Babylon, not resistance, is called the way of life.", 850],
    ["God even turns to his own royal family with the same warning. Justice in the morning, or the fire starts at the palace, not out on the edges of the city.", 850],
    ["Tomorrow, Jeremiah 22, 23, and 24. Kings judged one by one, and a basket of figs that decides who actually has a future.", 850],
    ["For now, hold on to the jar.", 800],
    ["It could not be mended.", 750],
    ["But it never once left the potter's hand.", 1200],
  ],
};
