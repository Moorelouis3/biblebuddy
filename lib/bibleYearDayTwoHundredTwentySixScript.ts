import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 226, written to the Day 1 standard.
 *
 * Jeremiah 25-27: twenty-three years of warnings finally get a number
 * attached (seventy years under Babylon, then Babylon answers too), the
 * temple sermon that nearly gets Jeremiah killed while Urijah is executed
 * for saying the same thing, and the wooden yoke Jeremiah wears and sends
 * to five kings telling them to bend or break. Six blocks across three
 * chapters (84 verses), no gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 226,
  title: "Seventy Years and the Yoke",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 226. Twenty-three years of preaching, and Jeremiah finally puts a number on the wait.", 750],
    ["Seventy years. That is how long Babylon holds Judah before God turns and judges Babylon too.", 800],
    ["Then he stands in the temple courtyard and says God will do to this house what he did to Shiloh, and the priests want him dead for it.", 800],
    ["By the end he is walking around Jerusalem with an actual wooden yoke strapped to his neck, telling kings to bend or break.", 850],
    ["We are in Jeremiah 25, 26, and 27.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(25, 1, 14, [
      "Jeremiah opens with a number that should stop you. Twenty-three years, from the thirteenth year of Josiah until now, and he has been saying the same thing the whole time. Turn back. And nobody has.",
      "God's patience is not the same as God not noticing. He has sent every one of his servants the prophets, rising early, sending them, and Judah has not so much as inclined an ear.",
      "So the sentence comes with a number attached. Nebuchadnezzar becomes God's servant, whether Babylon knows it or not, and this land serves him for seventy years.",
      "But the number cuts both ways. When the seventy years are finished, God says he will punish the king of Babylon too. Babylon is the weapon this time. It does not get to be the point.",
    ]),
    g(25, 15, 38, [
      "Then the vision turns strange. God hands Jeremiah an actual cup, full of his fury, and tells him to make every nation drink it, starting with Jerusalem itself.",
      "The list is long on purpose. Egypt, Edom, Moab, Tyre, every king of the desert, one after another, because this cup is not personal to Judah. It goes to whoever is drunk on their own power.",
      "Judah drinks first, not last. God does not spare his own people the cup so he can punish everyone else with it. Judgment starts at the house that carries his name.",
      "The chapter ends with the Lord pictured as a lion leaving his den, roaring over the whole earth, and the slain lying unburied like dung on the ground. No lament rites survive a judgment this wide.",
    ]),
    g(26, 1, 11, [
      "God sends Jeremiah to stand in the temple courtyard itself and say one line that will get him nearly killed. If you will not listen, I will make this house like Shiloh.",
      "Shiloh meant something specific to everyone listening. It was where the ark used to sit before it was lost. God is saying the address does not protect the building. Obedience does.",
      "The moment he finishes speaking, the priests and prophets and the whole crowd grab him. Not for lying. For telling the truth. You shall surely die, they say, for saying God's own house could fall.",
      "Diminish not a word, God told him before he went in. Jeremiah could have softened the message to save his own neck. He said it exactly as given, and it nearly cost him his life.",
    ]),
    g(26, 12, 24, [
      "Jeremiah does not take it back. He tells the princes and the people plainly, the Lord sent me. Kill me if you want, but you will be putting innocent blood on this city, not silencing a lie.",
      "Some elders stand up and remember something. A hundred years earlier, Micah said almost the same thing about Jerusalem, and King Hezekiah did not kill him. He feared the Lord instead, and the Lord relented. The city survived because someone once listened.",
      "That memory saves Jeremiah's life. But right next to it sits Urijah, a prophet who said the same thing Jeremiah did, fled to Egypt in terror, and got dragged back and executed anyway by this same king, Jehoiakim.",
      "Two prophets, one message, two completely different endings. The text does not explain why. It just lets you sit with how thin the line was between Jeremiah living and dying that day.",
    ]),
    g(27, 1, 11, [
      "God tells Jeremiah to make an actual set of bonds and yoke bars and wear them on his own neck, then send matching ones to the kings of Edom, Moab, Ammon, Tyre, and Zidon. A political message delivered as street theater.",
      "The content is not what any of these kings want to hear. God says he has given all these lands to Nebuchadnezzar himself, and the nation that will not bend its neck to Babylon will be finished off by sword, famine, and plague instead.",
      "Every prophet, diviner, and dreamer telling these kings not to serve Babylon is lying, God says plainly, whether they believe it themselves or not. A comfortable message is not automatically a true one.",
      "The nations who do bend the neck get told something almost gentle in the middle of all this. Stay in your own land. Till it. Live there. Sometimes survival looks like submission, not victory.",
    ]),
    g(27, 12, 22, [
      "Jeremiah gives Zedekiah the exact same word face to face. Bring your neck under the yoke of Babylon and live. Why die by sword and famine over pride that changes nothing?",
      "The priests are being told a specific lie too. Prophets keep promising the temple vessels already taken to Babylon are coming back any day now. Jeremiah says flatly, they are lying. Do not listen.",
      "Worse than that, he says the vessels still sitting in the temple right now are also going to Babylon. The lie was not just about the timeline. It was about pretending the worst is already over when it has not even started.",
      "But the chapter does not end without a promise underneath the warning. There shall they be, God says of the vessels, until the day that I visit them. Exile is not God losing track of what belongs to him.",
    ]),
  ],
  closing: [
    ["So that is Day 226.", 700],
    ["Twenty-three years of the same warning, a number finally attached to the wait, and a prophet who nearly died for refusing to soften one sentence.", 800],
    ["Seventy years in Babylon, then Babylon answers for what it did with the years.", 800],
    ["Micah's word saved a king's fear a hundred years earlier. That same fear saved Jeremiah's life. Urijah, saying the identical thing, got no such mercy.", 850],
    ["Then the yoke. Wood on one prophet's neck, carried out to five kings who did not ask for the message.", 800],
    ["Submission was never the humiliation here. Refusing to see what God had already decided was.", 850],
    ["Tomorrow, Jeremiah 28 through 30. A prophet snaps that wooden yoke in public, and pays for it.", 850],
    ["For now, hold on to the vessels.", 750],
    ["Carried off, not forgotten.", 750],
    ["Until the day he visits them.", 1200],
  ],
};
