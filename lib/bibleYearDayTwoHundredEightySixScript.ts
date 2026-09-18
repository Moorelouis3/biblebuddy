import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 286, written to the Day 1 standard.
 *
 * A king rides in on a donkey and the crowd finally says the right thing.
 * By the end of Matthew 23 he has run out every trap the religious leaders
 * can set and turned to grieve over the city that will not receive him.
 * Seven blocks across Matthew 21-23.
 */

const matthewTwentyOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 21:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 21,
  startVerse,
  endVerse,
  teaching,
});

const matthewTwentyTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 22:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 22,
  startVerse,
  endVerse,
  teaching,
});

const matthewTwentyThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 23:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 23,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 286,
  title: "The King Enters and Confronts Hypocrisy",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 286.", 700],
    ["A king rides into Jerusalem on a borrowed donkey, and for once the crowd says exactly the right thing. Hosanna to the Son of David.", 850],
    ["Within days some of those same voices will be shouting for His death.", 900],
    ["In between, He clears the temple, survives every trap the religious leaders set for Him, and then turns and tells them precisely what their religion has become.", 900],
    ["We are in Matthew 21, 22, and 23.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewTwentyOne(1, 17, [
      "Jesus sends two disciples for a donkey and her colt, fulfilling a prophecy He never has to explain: tell the daughter of Sion, thy King cometh unto thee, meek, and sitting upon an ass. This is not how conquerors arrive. It is how this one does.",
      "The crowd spreads garments in the road, cuts branches, and cries Hosanna to the Son of David. Jerusalem asks who this is, and the answer that comes back is small: this is Jesus the prophet of Nazareth of Galilee. They can see the parade. Most of them cannot see the King.",
      "Then He goes straight into the temple, overturns the moneychangers' tables, and quotes Isaiah back at the people running the place: my house shall be called the house of prayer, but ye have made it a den of thieves. He did not clear the room to make a scene. He cleared it to make room.",
      "Right after that, the blind and the lame come to Him in the space He just emptied, and He heals them. Children keep shouting Hosanna, and it offends the chief priests enough to complain. Jesus answers with a psalm: out of the mouth of babes and sucklings thou hast perfected praise. The children got it. The experts were offended by it.",
    ]),
    matthewTwentyOne(18, 32, [
      "Walking back into the city hungry, Jesus finds a fig tree covered in leaves and nothing else. He curses it, and it withers on the spot. A tree that looks alive and produces nothing is not a small detail here. It is a picture of exactly what He just walked out of.",
      "The chief priests demand to know by what authority He is doing any of this. He answers with one question about John's baptism, and they will not answer it, because either answer costs them something. They are not actually asking about authority. They are protecting their position.",
      "Then the parable of two sons. One says he will not work the vineyard, then goes anyway. The other says he will, and never shows up. Jesus asks which one did his father's will, and the answer convicts the men asking the question. The publicans and the harlots go into the kingdom of God before you.",
      "Doing beats saying, every time, in this story. The people everyone had written off believed John and changed course. The people who looked obedient never actually moved.",
    ]),
    matthewTwentyOne(33, 46, [
      "A landowner plants a vineyard, builds it out completely, and rents it to farmers while he travels. When it is time for fruit, he sends servants to collect it, and the farmers beat one, kill another, stone another.",
      "He sends more servants. Same result. Finally he sends his own son, thinking surely they will respect him. Instead they say, this is the heir, let us kill him and take his inheritance, and they do.",
      "Jesus asks the religious leaders what the owner should do to those farmers. They answer their own trap: he will destroy those wretches and give the vineyard to others who will actually produce. They convict themselves before they realize the story is about them.",
      "The stone which the builders rejected, the same is become the head of the corner. What they threw out becomes the foundation. The chief priests and Pharisees finally understand He is talking about them, and they want Him arrested on the spot. They only hold back because they are afraid of the crowd, not because they are convinced.",
    ]),
    matthewTwentyTwo(1, 14, [
      "A king throws a wedding for his son and sends servants to call the invited guests. They will not come. He tries again, tells them dinner is ready, and they make light of it, one to his farm, one to his business, and some seize the servants and kill them.",
      "The king destroys those murderers and burns their city, then sends his servants into the highways to bring in anyone they can find, bad and good alike, until the wedding hall is full. The invitation goes wide open to people who never expected it.",
      "But one man shows up without a wedding garment. Asked how he got in dressed like that, he has nothing to say. He is bound and cast out into outer darkness. Being let in is not the same as coming in on your own terms.",
      "Many are called, but few are chosen. The invitation goes out to everyone. Showing up still means showing up the way the King asks, not however you decide is close enough.",
    ]),
    matthewTwentyTwo(15, 46, [
      "The Pharisees flatter Him first, then spring the trap: is it lawful to give tribute to Caesar? Either answer looks fatal. Jesus asks whose image is on the coin, and tells them, render therefore unto Caesar the things which are Caesar's, and unto God the things that are God's. The coin carries Caesar's image. You carry God's. That settles where your real debt is owed.",
      "The Sadducees, who do not even believe in resurrection, bring a riddle about a woman married to seven brothers, trying to make the whole idea sound absurd. Jesus tells them plainly, ye do err, not knowing the scriptures, nor the power of God. Marriage does not carry into that life the way they assume, and the God of Abraham, Isaac, and Jacob is the God of the living, not the dead.",
      "A lawyer asks which commandment is greatest. Jesus answers with two: love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind, and love thy neighbour as thyself. On these two hang all the law and the prophets. Every other rule is downstream of these.",
      "Then Jesus turns the questioning around. Whose son is the Christ? They say David's. He points them to David calling this same person Lord in the Psalms, and asks how a son outranks his own father. No one can answer him a word, and from that day no one dares ask Him anything else.",
    ]),
    matthewTwentyThree(1, 12, [
      "Jesus turns to the crowd and His disciples and says the scribes and Pharisees sit in Moses' seat, so do what they say. Just do not do what they do, because they say and do not. They bind heavy burdens onto other people's shoulders and will not move them with a single finger of their own.",
      "Everything they do is staged for an audience. Broad phylacteries, longer tassels, the best seat at the table, the best chair in the synagogue, being greeted in public as Rabbi. None of it is about God. All of it is about being seen.",
      "But he that is greatest among you shall be your servant, Jesus says, and whosoever shall exalt himself shall be abased, and he that shall humble himself shall be exalted. That single sentence unravels everything the religious leaders had spent their careers building.",
      "Call no man your father on earth, for one is your Father, in heaven. Call no man master, for one is your Master, the Christ. He is not banning respect. He is warning against letting any human title stand where only God belongs.",
    ]),
    matthewTwentyThree(13, 39, [
      "Then come the woes, one after another. Woe unto you, scribes and Pharisees, hypocrites, because you shut the kingdom of heaven against people, you devour widows' houses while making long prayers for show, and you cross land and sea to win one convert and then make him twice the child of hell you are.",
      "Ye blind guides, which strain at a gnat, and swallow a camel. They obsess over tithing mint and dill and cumin while dropping judgment, mercy, and faith, the actual weight of the law. They clean the outside of the cup while the inside stays full of extortion and excess.",
      "Ye are like unto whited sepulchres, which indeed appear beautiful outward, but are within full of dead men's bones, and of all uncleanness. Every image He reaches for describes something polished on the surface and rotting underneath.",
      "Then the anger breaks into grief. O Jerusalem, Jerusalem, thou that killest the prophets, and stonest them which are sent unto thee, how often would I have gathered thy children together, even as a hen gathereth her chickens under her wings, and ye would not! Behold, your house is left unto you desolate. He does not end this chapter furious. He ends it heartbroken.",
    ]),
  ],
  closing: [
    ["So that is Day 286.", 700],
    ["A king rode in on a donkey, and the temple got cleared before it got explained.", 800],
    ["Every trap the religious leaders built, Caesar's coin, the resurrection riddle, the greatest commandment, turned into a mirror they did not expect.", 850],
    ["And then Jesus stopped debating them and just told them the truth. Everything about their religion was built to be seen, not to be real.", 850],
    ["He called it what it was. Whited sepulchres. Clean outside, dead inside.", 800],
    ["But the chapter does not end in anger. It ends with Him wanting to gather Jerusalem like a hen gathers her chicks, and Jerusalem refusing.", 850],
    ["Tomorrow, Matthew 24 through 26. He tells the disciples what is coming, then walks straight into it.", 850],
    ["For now, sit with how that woe chapter ends.", 750],
    ["How often would I have gathered thy children together.", 800],
    ["And ye would not.", 1200],
  ],
};
