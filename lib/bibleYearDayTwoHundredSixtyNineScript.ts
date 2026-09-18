import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 269, written to the Day 1 standard.
 *
 * Micah closes with the lawsuit that gives the "do justly, love mercy,
 * walk humbly" line, a chapter admitting no good man is left, and a
 * question about a God who forgives. Then Nahum opens on the very city
 * Jonah once saved. Seven blocks: five across Micah 6-7, two opening
 * Nahum 1.
 */

const micah = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Micah ${chapter}:${startVerse}-${endVerse}`,
  book: "micah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const nahum = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Nahum 1:${startVerse}-${endVerse}`,
  book: "nahum",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 269,
  title: "What the Lord Requires",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 269. Micah finally says the sentence everyone quotes and almost nobody finishes reading around.", 750],
    ["Do justly, love mercy, walk humbly. It comes right after God puts his own people on trial.", 800],
    ["Then Micah's own book ends groaning that there is not one good man left, and turns around and asks who is a God like this one who forgives.", 850],
    ["After that, a new book opens. Nahum, aimed straight at the city Jonah once saved.", 800],
    ["We are in Micah 6 and 7, and Nahum 1.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    micah(6, 1, 8, [
      "God brings a lawsuit against his own people, and he calls the mountains as the jury. Arise, plead your case before the mountains, let the hills hear your voice.",
      "Then he asks the most exposed question in the whole book. O my people, what have I done to you? Where have I made you tired? Testify against me.",
      "He does not wait for an answer. He gives it himself. I brought you up out of the land of Egypt, redeemed you out of the house of slaves, and sent Moses, Aaron, and Miriam ahead of you.",
      "So when the people ask what would finally be enough, thousands of rams, rivers of oil, even their own firstborn, Micah gives the answer that ends the guessing. He has shown you, man, what is good. Do justly, love mercy, and walk humbly with your God.",
    ]),
    micah(6, 9, 16, [
      "The Lord's voice cries to the city, and the wise still fear his name. But look what he finds when he checks the books. Treasures gotten by wickedness, a measure that cheats, scales that lie, a bag of dishonest weights.",
      "The rich are full of violence, the people speak lies, and their tongue is deceit in their own mouth. This is not a foreign enemy doing this. It is the marketplace at home.",
      "So he says he will make them sick from striking them. They will eat and not be satisfied, sow and not reap, tread the olive and never touch the oil, tread the grape and never drink the wine.",
      "And he tells them exactly why. You have kept the statutes of Omri and all the ways of the house of Ahab, and walked in their advice. Following the wrong kings costs you the meal off your own table.",
    ]),
    micah(7, 1, 6, [
      "Micah opens with a groan. Woe is me, for I am like a field stripped after the harvest, when the good fruit is already gone and no cluster is left to eat.",
      "The good man has perished from the earth, there is none upright among men. They all lie in wait to shed blood, hunting even their own brother with a net.",
      "Both hands work hard at evil. The official asks for a bribe, the judge asks for a reward, the powerful man just says what he wants and they weave it together to make it happen.",
      "So the warning turns personal. Trust no friend, put no confidence in a companion, guard the doors of your mouth even from the one lying in your own arms. Son against father, daughter against mother, a man's own household turned into his enemies.",
    ]),
    micah(7, 7, 13, [
      "Right after describing a world with no one left to trust, Micah says where he is putting his trust instead. Therefore I will look to the Lord, I will wait for the God of my salvation, my God will hear me.",
      "He speaks straight to the enemy watching him fall. Do not rejoice over me. When I fall, I will rise. When I sit in darkness, the Lord will be a light to me.",
      "He does not claim innocence. I will bear the indignation of the Lord, because I have sinned against him, until he pleads my cause and brings me out to the light, and I see his righteousness.",
      "Then the enemy who mocked him, saying where is the Lord your God, will be covered in shame and trodden down like mud in the streets, while the walls get rebuilt and people stream in from every direction.",
    ]),
    micah(7, 14, 20, [
      "Micah prays for God to shepherd his people with his staff, the flock living alone in the woods, and let them feed in Bashan and Gilead like the old days.",
      "God answers by promising what he did once before. As in the days you came out of Egypt, I will show him marvelous things. The nations will see it and be ashamed of all their might, hands over their mouths, ears gone deaf.",
      "Then Micah asks the question the whole book has been building toward. Who is a God like you, pardoning sin and passing over the transgression of the remnant of his people? He does not hold his anger forever, because he delights in mercy.",
      "He will turn again, he will have compassion on us, he will subdue our sins underfoot, and cast all our sins into the depths of the sea. You will keep faith with Jacob and mercy with Abraham, just as you swore to our fathers long ago.",
    ]),
    nahum(1, 8, [
      "A new book opens, and it names its target right away. The burden of Nineveh. The same city that repented under Jonah gets a whole prophecy of its own, a generation or so later.",
      "Nahum does not soften the introduction. God is jealous, and the Lord avenges, the Lord avenges and is furious, he takes vengeance on his adversaries and keeps wrath for his enemies.",
      "But that is not the whole sentence. The Lord is slow to anger and great in power, and will not at all acquit the wicked. His way is in the whirlwind and the storm, and the clouds are the dust under his feet.",
      "He rebukes the sea and dries it up, he dries up every river, mountains quake at him and hills melt, the earth burns at his presence. And still, in the middle of all of that, the Lord is good, a strong hold in the day of trouble, and he knows those who trust in him.",
    ]),
    nahum(9, 15, [
      "Nahum turns straight to Nineveh's own scheming. What do you imagine against the Lord? He will make a full end. Trouble will not rise up a second time.",
      "The empire that once repented at Jonah's warning now has a wicked counselor coming out of it, one who plots against the Lord himself. This time God says he will finish it once and for all.",
      "To his own people he says something completely different. Though I have afflicted you, I will afflict you no more. I will break his yoke off you and burst your bonds apart.",
      "Then the line that flips the whole chapter toward hope. Behold, on the mountains, the feet of him who brings good tidings, who publishes peace. Keep your feasts, Judah, pay your vows, because the wicked will no more pass through you. He is completely cut off.",
    ]),
  ],
  closing: [
    ["So that is Day 269.", 700],
    ["God put his own people on trial, then answered his own question for them. I brought you out of Egypt. What have I done to tire you out?", 800],
    ["He told them exactly what he wanted, after they offered him everything except this. To do justice, love mercy, and walk humbly with him.", 800],
    ["Then Micah's own chapter 7 admits there is no good man left standing, not even one to trust inside his own house.", 800],
    ["Right there, with nobody left to trust, he says where his own trust is going instead. I will look to the Lord.", 850],
    ["The same book that says no one is left still ends asking who else pardons sin and throws it into the depths of the sea.", 850],
    ["Then Nahum opens on the very city Jonah once saved, and shows the other side of that same mercy. Slow to anger does not mean anger never comes.", 850],
    ["Tomorrow, Nahum 2 and 3, and the start of Habakkuk.", 800],
    ["For now, hold on to the line Micah already gave you.", 750],
    ["Do justly. Love mercy. Walk humbly.", 1200],
  ],
};
