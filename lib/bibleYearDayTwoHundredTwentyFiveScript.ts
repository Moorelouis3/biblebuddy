import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 225, written to the Day 1 standard.
 *
 * Jeremiah 22-24: three kings of Judah judged one after another (Shallum,
 * Jehoiakim, Coniah), the false prophets who kept promising peace, the
 * promise of a righteous Branch called THE LORD OUR RIGHTEOUSNESS, and
 * two baskets of figs that decide who actually has a future. Six blocks
 * across three chapters (80 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 225,
  title: "Kings, Exile, and Good Figs",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 225. Three kings of Judah, named one after another, and none of them keep the throne.", 750],
    ["Shallum marched off in chains. Jehoiakim buried like a donkey. Coniah, told God would pull him off even if he were the signet ring on his own hand.", 800],
    ["Then God turns on the prophets who kept telling everyone it would be fine.", 800],
    ["And two baskets of figs, set in front of the temple, decide who actually has a future. It is not the ones who feel safe.", 850],
    ["We are in Jeremiah 22, 23, and 24.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(22, 1, 9, [
      "God sends Jeremiah straight to the palace this time, with a message for the king himself. Do justice, protect the stranger, the fatherless, and the widow, and stop shedding innocent blood in this place.",
      "The offer is real, not just a threat. Keep this, and kings will keep riding in and out of these gates on their own horses and chariots, dynasty intact.",
      "Break it, and God says he will personally turn the king's own house, the finest cedar building in the land, into a wilderness where nobody lives.",
      "Later, when the ruins sit there, travelers will ask why God did this to such a great city. The answer given is not politics or invasion. They forsook the covenant of the Lord their God and served other gods.",
    ]),
    g(22, 10, 19, [
      "Verse 10 gives a strange instruction. Do not weep for the king who just died. Weep instead for the one being marched off in chains, because Shallum, who took his father's throne, will never see this land again.",
      "Then Jeremiah turns on Jehoiakim directly. Woe to the one who builds his house on injustice, who uses his neighbor's labor and never pays the wage. Wide windows, cedar paneling, walls painted red. A palace built on unpaid work.",
      "He puts the comparison right in front of him. Did not your father Josiah eat and drink and still do what was just? He judged the cause of the poor, and it went well for him. Was that not what it meant to know me? But your eyes and your heart are set only on profit and on shedding innocent blood.",
      "So the sentence fits the man. No one will mourn him, no ah my brother, no royal funeral. He will be buried the way you bury a donkey, dragged out and dumped past the gates of his own city.",
    ]),
    g(22, 20, 30, [
      "The chapter turns into a lament. Go up to Lebanon and cry. Lift your voice in Bashan. Every ally Judah leaned on is already broken.",
      "Then comes the king judgment lands hardest on. As I live, says the Lord, even if Coniah were the signet ring on my own right hand, I would still pull him off. A king who thought his position made him untouchable.",
      "He gets handed straight to Nebuchadnezzar and shipped off to a country he has never seen, and God says plainly, the land they long to come back to, they will never come back to.",
      "Then the verdict that closes the chapter. O earth, earth, earth, hear the word of the Lord. Write this man childless. Not that he has no children, but that not one of his own line will ever sit on David's throne again.",
    ]),
    g(23, 1, 8, [
      "After three failed kings, chapter 23 opens with a verdict on all of them at once. Woe to the shepherds who destroy and scatter my flock. God is not just angry at one family line. He is done with bad shepherding altogether.",
      "He promises to do what these kings would not. Gather the scattered flock himself, bring them home, and set real shepherds over them so the sheep stop losing members.",
      "Then the promise gets specific. The days are coming when I will raise up for David a righteous Branch, a King who reigns and deals wisely, who does what is just and right in the land.",
      "And his name lands hardest of all. THE LORD OUR RIGHTEOUSNESS. Not a king who merely enforces justice, but one whose very name says where the justice actually comes from.",
    ]),
    g(23, 9, 32, [
      "Jeremiah's own reaction to what he has to say next is physical. My heart is broken within me. All my bones shake. I am like a drunk man, because of the Lord and his holy words.",
      "The reason is that prophet and priest, the two offices meant to keep Israel honest, have both gone profane, and God says he found their wickedness even inside his own house.",
      "The lie they keep repeating is the comfortable one. They tell everyone still doing whatever they want, you shall have peace, no evil will come on you. Nobody sent them to say it.",
      "God answers with two images that do not comfort. Is not my word like a fire? And like a hammer that breaks a rock to pieces? A prophet's job was never to make people feel better about staying the same.",
    ]),
    g(23, 33, 40, [
      "People had turned the phrase the burden of the Lord into a mocking catchphrase, so God tells Jeremiah to retire the word entirely. Ask what the Lord has answered instead, because burden has become a joke used against the very message it names.",
      "Then comes one of the strangest pictures in the book. Two baskets of figs, set in front of the temple, right after Jeconiah and the first wave of exiles were carried off to Babylon.",
      "One basket is very good figs. The other is so rotten it cannot be eaten. And God says the good figs are the ones already gone, already in exile. I will watch over them for good, and bring them back, and give them a heart to know me.",
      "The bad figs are the ones who stayed. Zedekiah, his princes, and everyone still standing in Jerusalem feeling safe. Being left in the land was not the mercy. Being carried off was.",
    ]),
  ],
  closing: [
    ["So that is Day 225.", 700],
    ["Three kings, judged one after another, and a whole chapter aimed at the prophets who kept telling them, and everyone else, that it would be fine.", 800],
    ["The kings wanted comfort. Jeremiah gave them the truth instead. Do justice, or lose the house. They chose the palace with cedar walls.", 800],
    ["And underneath the prophets' lie sat one line that never let go of hope. The days are coming when I will raise up a righteous Branch. THE LORD OUR RIGHTEOUSNESS.", 850],
    ["Then the figs. The ones who looked ruined, already carried off to Babylon, get called good. The ones who felt safe, still standing in Jerusalem, get called rotten.", 850],
    ["Being carried away was not the punishment. Staying was.", 800],
    ["Tomorrow, Jeremiah 25, 26, and 27. Seventy years get a number, and Jeremiah wears a wooden yoke through the streets to prove a point.", 850],
    ["For now, hold on to the good figs.", 800],
    ["Ripe, first of the season.", 750],
    ["Already on their way home.", 1200],
  ],
};
