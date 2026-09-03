import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 93, written to the Day 1 standard.
 *
 * 2 Kings 22-25 closes the book: a lost scroll turns up during temple
 * repairs, Josiah tears his clothes and leads the greatest reform this book
 * has shown, and none of it is enough to undo what Manasseh set in motion.
 * Judah falls in stages - Josiah dead at Megiddo, Jehoiachin deported,
 * Zedekiah blinded, the temple burned - before one small grace note closes
 * the book in a Babylonian prison. Seven blocks across four chapters.
 */

const kings2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "2 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 93,
  title: "Josiah's Reform and Judah's Fall",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 93. A scroll goes missing inside God's own house, and nobody notices for years.", 750],
    ["Then a young king who grew up under the worst two reigns in Judah's history finds it, reads it, and tears his own clothes.", 800],
    ["What follows is the greatest reform this book has ever shown you. And it still is not enough to stop what is coming.", 850],
    ["By the end of today, the temple is ash and the king is blind.", 800],
    ["We are in 2 Kings 22 through 25. Josiah's reform, and Judah's fall.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings2(22, 1, 20, [
      "Josiah becomes king at eight, after a grandfather who spent fifty-five years wrecking the nation and a father who managed two more years of the same. Eighteen years into his own reign, he sends a scribe to check on ordinary temple repairs.",
      "In the middle of that repair job, the high priest makes a discovery that says everything about the reigns before this one. He finds the book of the law. Not writes one. Finds it. It had been lost inside God's own house.",
      "Shaphan reads it to the king, and Josiah tears his clothes. He is not performing grief. He is hearing, maybe for the first time in his life, what God actually asked of this nation, and realizing how far it has drifted from a book nobody even knew was missing.",
      "Huldah's answer is honest in both directions. Judgment is already certain - fifty-five years cannot be undone by one king's tears. But because Josiah's own heart broke the moment he heard the truth, he personally will not live to see it land.",
    ]),
    kings2(23, 1, 14, [
      "Josiah does not just read the book in private. He gathers the elders, the priests, the prophets, the whole city, small and great, reads it aloud, and stands by the pillar to make a public covenant. All the people stood to it. A nation re-signs a contract it forgot it had made.",
      "Then he goes to work, room by room. Vessels made for Baal, burned. The Asherah pole hauled to the Kidron valley and ground to powder, then scattered on the graves of ordinary people, so it can never be gathered up and used again.",
      "He tears down what Solomon built for foreign gods a thousand years earlier, what Ahaz added on the roof, what Manasseh piled into the temple courts themselves. Three kings' worth of compromise, dismantled in what reads like one furious pass through the city.",
      "And he defiles Topheth in the valley of Hinnom on purpose, so that no one could ever again make a son or daughter pass through the fire to Molech there. Some things Josiah does not just remove. He makes unusable, for good, by design.",
    ]),
    kings2(23, 15, 25, [
      "At Bethel he finds the altar Jeroboam built two hundred years before he was born - the one a nameless man of God once said, by name, a king called Josiah would defile by burning human bones on it. Josiah does exactly that, fulfilling a prophecy that predates him by three centuries.",
      "Then he looks up, sees a tomb, and asks whose it is. It belongs to that same prophet, buried beside the old prophet from Samaria who lied to him. Josiah's answer is simple. Let him alone. Let no man move his bones. The man who named him generations early gets left in peace.",
      "He carries the same purge north into what used to be Israel, striking down the priests of the high places on their own altars, treating a kingdom split for two hundred years as one job, not two.",
      "Then he commands the greatest Passover Judah has kept since the days of the judges - before there were kings at all. This is what turning back to a lost book, all the way, actually costs, and actually looks like.",
    ]),
    kings2(23, 26, 37, [
      "Right after the highest praise any king in this book receives, the text turns hard. The Lord turned not from the fierceness of his great wrath. Josiah's whole heart could reform a nation. It could not undo Manasseh's fifty-five years. Judgment is delayed, not cancelled.",
      "Pharaoh-necho marches north, and Josiah, for reasons the text never explains, goes out to stop him and dies at Megiddo. Huldah promised he would not see the evil coming on Jerusalem. He does not. He is gathered to his fathers first, exactly as promised, just sooner than anyone expected.",
      "The people crown his son Jehoahaz, and Egypt removes him after three months, like swapping out a part. Pharaoh installs another son, renames him Jehoiakim, and taxes Judah to cover Egypt's bill. This is no longer a nation making its own decisions.",
      "Two verses, two sentences: he did that which was evil in the sight of the Lord. Both sons, back to back, the same verdict. The reformer is barely in the ground before the reform is undone.",
    ]),
    kings2(24, 1, 20, [
      "Jehoiakim serves Babylon three years, then rebels - the same instinct that keeps costing Judah everything. This time the text says plainly why judgment is finally landing. Surely at the commandment of the Lord came this... for the sins of Manasseh, and for the innocent blood he shed. A grandfather's sin is still being paid for.",
      "Jehoiachin reigns at eighteen for exactly three months before Nebuchadnezzar's army arrives in person. He surrenders rather than fight it out, and surrendering does not save him from what comes next.",
      "Every treasure in the temple and the palace is carried off, every gold vessel Solomon made is cut to pieces, and ten thousand people go with it - the princes, the fighting men, every craftsman and smith. Only the poorest of the land are left, because there is nothing left in them worth taking.",
      "Babylon installs Jehoiachin's uncle and renames him Zedekiah, the same move Egypt already used on Jehoiakim. Two empires, two puppet kings, the identical trick both times. And Zedekiah, like everyone before him, does that which was evil, and eventually rebels anyway.",
    ]),
    kings2(25, 1, 21, [
      "The siege starts in Zedekiah's ninth year and does not end until his eleventh. By the time the wall finally breaks, there is no bread left in the city at all. Two years of starving before a single soldier gets through.",
      "Zedekiah runs and is caught in the plains of Jericho, his army scattered around him. What happens next is the cruelest sentence in the whole book. They kill his sons in front of him, then put out his eyes. The last thing Zedekiah ever sees, on purpose, is his own sons dying.",
      "A month later they burn everything - the temple, the palace, every great house in Jerusalem - and tear down the walls themselves, so nothing is left standing to defend even if anyone wanted to try.",
      "Every piece of bronze, gold, and silver still in the temple is stripped and hauled to Babylon, right down to the two great pillars Solomon built at its entrance. What took Solomon years to build is undone in what reads like an afternoon.",
    ]),
    kings2(25, 22, 30, [
      "Even after the destruction, there is one more chance at something small and stable. Gedaliah is left as governor over whoever remains, and he tells the survivors plainly. Dwell in the land, serve the king of Babylon, and it will be well with you. It could have been a quiet ending.",
      "It lasts one season. Ishmael, of the royal line, murders Gedaliah and everyone with him, and whatever was left of Judah in Judah scatters to Egypt out of fear. The land empties out for the third time in one book.",
      "Then, thirty-seven years later, in a Babylonian prison, someone finally shows up for Jehoiachin - the king taken captive as a teenager back in chapter twenty-four. A new king of Babylon lifts up his head, gives him new clothes instead of prison garments, and a permanent seat above the other captive kings.",
      "Two Kings does not end with a battle or a sermon. It ends with one broken king eating at a table every day for the rest of his life, inside the empire that destroyed everything he was born to inherit. Even here, the story does not end in total silence.",
    ]),
  ],
  closing: [
    ["So that is Day 93.", 700],
    ["A lost book, found by accident, and one king who tore his clothes instead of shrugging.", 750],
    ["Josiah did more to turn this nation back to God than any king before or after him. Scripture says so in plain words.", 800],
    ["And it still was not enough. Manasseh's fifty-five years had already set something in motion that Josiah's whole heart could not reverse.", 850],
    ["He died on a battlefield before he ever had to watch it happen. His sons and grandsons did not get that mercy.", 850],
    ["Zedekiah watched his own sons killed, and that was the last thing his eyes ever saw. The temple burned a month later.", 850],
    ["Tomorrow, 1 Chronicles 1 through 4. The story starts over, from Adam, in a genealogy written for people who have just lost everything and need to remember who they still are.", 900],
    ["For now, hold on to one detail from a broken king's ending.", 800],
    ["Thirty-seven years in a Babylonian prison.", 750],
    ["And then, finally, a seat at the table.", 1200],
  ],
};
