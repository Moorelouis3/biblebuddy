import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 300, written to the Day 1 standard.
 *
 * Luke 19-21 is Jesus' last week moving through Jerusalem: Zacchaeus, the
 * parable of the pounds, the triumphal entry, the cleansing of the temple,
 * the traps set by the religious leaders, the widow's two mites, and the
 * Olivet discourse. Seven blocks across the three chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Luke ${chapter}:${startVerse}-${endVerse}`,
  book: "luke",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SCRIPT: BibleYearDayScript = {
  dayNumber: 300,
  title: "Jerusalem, Temple, and Coming Judgment",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 300. Jesus is one week from the cross, and everything starts moving faster.", 800],
    ["A rich, hated tax collector climbs a tree just to see him, and gets called down by name.", 800],
    ["A king rides into his own capital on a borrowed colt, and the religious leaders spend the rest of the day trying to trap him with questions.", 850],
    ["Then he sits across from the temple treasury and points out a poor widow instead of the rich men throwing in their money.", 850],
    ["And before the week is out, he tells his friends the temple itself will not have one stone left standing on another.", 900],
    ["We are in Luke 19, 20, and 21. Jerusalem, the temple, and what is coming.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 10, [
      "Zacchaeus is rich, and hated for it. Chief among the publicans, a tax collector over tax collectors, in a city that despises what that job means. He is also short, so short he cannot see over the crowd, so he runs ahead and climbs a sycomore tree just to get one look at Jesus passing by.",
      "Jesus stops under that exact tree and looks up. Zacchaeus, make haste, and come down, for today I must abide at thy house. Not an offer. Jesus invites himself into the house of the one man in town nobody else would eat with.",
      "The crowd mutters that he has gone to be guest with a sinner. Zacchaeus does not defend himself. He stands up and says it plainly. Half of my goods I give to the poor, and if I have taken any thing from any man by false accusation, I restore him fourfold. Four times what the law required.",
      "Jesus says it out loud for everyone standing there. This day is salvation come to this house, forsomuch as he also is a son of Abraham. For the Son of man is come to seek and to save that which was lost. One man, up a tree, and Jesus goes looking for exactly him.",
    ]),
    g(19, 11, 27, [
      "Jesus tells this story because the crowd is expecting the kingdom to show up immediately, right there in Jerusalem. So he tells them about a nobleman who leaves for a far country to receive a kingdom, and will not be back for a while. He hands ten servants a pound each and says simply, occupy till I come.",
      "Back home, the citizens send a message after him. We will not have this man to reign over us. That line is not background noise. It is the whole city's answer to him, days before the same city shouts for him to be crucified.",
      "When he returns, two servants had put the money to work and gained more, and he puts them in charge of cities. One buried his in fear, saying, I feared thee, because thou art an austere man. Even the little he had gets taken and given to the one who used what he was given.",
      "Then the ending turns hard. Those mine enemies, which would not that I should reign over them, bring hither, and slay them before me. Jesus is telling the crowd exactly what is coming for Jerusalem, and what it will cost the people cheering for him now to reject him later.",
    ]),
    g(19, 28, 48, [
      "He sends two disciples ahead for a colt that has never been ridden, with one line to say if anyone asks: the Lord hath need of him. Then he rides into his own capital on a borrowed animal while people throw their coats in the road and shout, blessed be the King that cometh in the name of the Lord.",
      "Pharisees in the crowd tell him to quiet his disciples down. Jesus says if they went silent, the stones themselves would cry out. This moment is happening whether the religious leaders approve of it or not.",
      "Then, coming over the hill and seeing the city laid out in front of him, he weeps. If thou hadst known, even thou, the things which belong unto thy peace. He tells them exactly what is coming, armies surrounding the walls, not one stone left on another, because they did not know the time of their visitation.",
      "He walks straight into the temple and starts throwing out the sellers. My house is the house of prayer, but ye have made it a den of thieves. He keeps teaching there every day after that, and the chief priests want him dead but cannot touch him, because the people will not stop listening.",
    ]),
    g(20, 1, 19, [
      "The religious leaders corner him in the temple. By what authority doest thou these things? Jesus answers a question with a question: was John's baptism from heaven, or of men? They cannot answer either way without losing something, so they say, we cannot tell. So he tells them nothing either.",
      "Then he tells a story straight at them. A man plants a vineyard and leases it out, and when he sends servants for his share of the fruit, the tenants beat one, humiliate another, and wound a third. So he sends his own son, thinking they will respect him. They see the heir and think, this is the heir, come, let us kill him, that the inheritance may be ours.",
      "Jesus does not soften the ending. He shall come and destroy these husbandmen, and give the vineyard to others. The stone which the builders rejected, the same is become the head of the corner. He is telling the men plotting to kill him exactly what they are about to do, to their faces, using their own vineyard.",
      "They understand every word of it. The chief priests and scribes want to grab him right there, and the only thing stopping them is the crowd standing around listening.",
    ]),
    g(20, 20, 47, [
      "Spies show up pretending to be sincere, trying to trap him with a political question. Is it lawful to give tribute to Caesar, or no? Either answer gets him in trouble. He asks for a coin, points at the image on it, and says, render therefore unto Caesar the things which be Caesar's, and unto God the things which be God's. They came to trap him and leave with nothing to use.",
      "Next come the Sadducees, who do not even believe in resurrection, with a made-up case about a woman who outlives seven brothers she was married to in turn. Whose wife of them is she in the resurrection? Jesus tells them they have it wrong. God calls himself the God of Abraham, and the God of Isaac, and the God of Jacob, long after all three were dead. He is not a God of the dead, but of the living.",
      "Then he turns a question back on them. How say they that Christ is David's son, when David himself calls him Lord? Nobody has an answer, and after that day, nobody dares ask him anything else.",
      "Last, in front of everyone, he turns on the scribes. They love long robes, the best seats, and being greeted in the market, and they devour widows' houses while making long prayers to look holy. The same shall receive greater damnation. The men most respected in the room get the hardest words of the day.",
    ]),
    g(21, 1, 19, [
      "He watches rich men dropping large gifts into the temple treasury, and then a poor widow drops in two small coins, worth almost nothing. He tells his disciples she has cast in more than they all. They gave out of their abundance. She, of her penury, cast in all the living that she had.",
      "Someone mentions how beautiful the temple stones are, and Jesus says the days are coming when there shall not be left one stone upon another. When they ask when, and what the sign will be, he does not give them a date. He tells them what to expect instead: false christs, wars, earthquakes, famines.",
      "Before any of that, he warns them, they will lay hands on you and persecute you, delivered up to synagogues and prisons, brought before kings for my name's sake. He tells them not to rehearse a defense ahead of time. I will give you a mouth and wisdom, which all your adversaries shall not be able to gainsay nor resist.",
      "Even family will turn on them, parents, and brethren, and kinsfolks, and friends, and some of them will be put to death. Then the promise underneath all of it. There shall not an hair of your head perish. In your patience possess ye your souls. Whatever happens to the body, nothing that matters is actually lost.",
    ]),
    g(21, 20, 38, [
      "He tells them plainly what is coming for the city. When you see Jerusalem compassed with armies, that is your signal to flee to the mountains, not to stay and watch. Those days will be so hard he says woe to the women who are with child or nursing when it happens. Jerusalem will be trodden down of the Gentiles until their own time runs out too.",
      "Then his language widens out past the city walls. Signs in the sun, and the moon, and the stars. The sea and the waves roaring. Men's hearts failing them for fear. And in the middle of all that shaking, they shall see the Son of man coming in a cloud with power and great glory. When it starts, he says, look up, and lift up your heads, for your redemption draweth nigh.",
      "He gives them one plain picture to hold onto. When a fig tree shoots forth, you know summer is near without anyone telling you. Watch the signs the same way. Heaven and earth shall pass away, but my words shall not pass away.",
      "His last warning is not about armies or stars. It is about hearts overcharged with surfeiting and drunkenness and the cares of this life, until that day comes on you unawares. Watch ye therefore, and pray always. Then, every day that week, he keeps teaching in the temple and sleeping out on the mount of Olives, and the people keep coming early just to hear him.",
    ]),
  ],
  closing: [
    ["So that is Day 300.", 700],
    ["A tax collector up a tree, and a king riding in on a borrowed colt.", 750],
    ["Vineyard tenants who kill the owner's own son rather than give up what was never theirs.", 800],
    ["A poor widow who gave everything, right next to rich men giving nothing that would actually cost them.", 800],
    ["And a warning that the temple itself, the most solid thing in that city, was about to come down stone by stone.", 850],
    ["Jesus spends this whole week teaching in the temple by day and sleeping out on the mount of Olives by night, and the people keep showing up early just to hear him.", 900],
    ["Tomorrow, Luke 22 through 24. The cross, the empty tomb, and eyes that finally open.", 850],
    ["For now, sit with what he said about the widow.", 750],
    ["She of her penury cast in all the living that she had.", 1200],
  ],
};
