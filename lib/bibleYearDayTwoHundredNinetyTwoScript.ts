import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 292, written to the Day 1 standard.
 *
 * Jesus enters Jerusalem, curses a fig tree, cleans out the temple, and
 * survives three trap questions in a row. Then, alone on the Mount of
 * Olives, he tells four of them plainly what is coming for the temple, for
 * them, and for the world, and ends on one word: watch. Seven blocks across
 * Mark 11, 12, and 13.
 */

const markEleven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 11:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 11,
  startVerse,
  endVerse,
  teaching,
});

const markTwelve = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 12:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 12,
  startVerse,
  endVerse,
  teaching,
});

const markThirteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 13:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 13,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 292,
  title: "Temple Judgment and Watchfulness",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 292.", 700],
    ["Jesus rides into Jerusalem to a crowd shouting his praise, and by the end of today he has cursed a tree, flipped over tables, and made every religious leader in the city afraid to ask him another question.", 850],
    ["Then, alone on a hillside with four friends, he stops talking about them and starts talking about the end of everything.", 850],
    ["A temple that will not have one stone left standing. Wars, betrayal, a sky going dark.", 800],
    ["And then one word, repeated until it sticks. Watch.", 850],
    ["We are in Mark 11, 12, and 13.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    markEleven(1, 11, [
      "Jesus sends two disciples ahead for a colt that has never been ridden, tells them exactly what to say if anyone asks, and it happens exactly that way. He is not improvising this entry. He is choosing it.",
      "People spread garments and branches on the road and shout, Hosanna, Blessed is he that cometh in the name of the Lord, Blessed be the kingdom of our father David. They are naming him king out loud, in public, in the one city that can kill him for it.",
      "He rides in on a borrowed donkey, not a warhorse. Whatever kind of king this crowd thinks they are getting, it is not the kind that arrives armed.",
      "Then, oddly, nothing happens. He goes into the temple, looks round about upon all things, and, because it is already evening, just leaves for Bethany with the twelve. The whole triumphal entry ends in a quiet look around and a walk out of town.",
    ]),
    markEleven(12, 33, [
      "The next morning, hungry, he sees a fig tree with leaves and nothing else, since it was not the season for figs. He curses it anyway. No man eat fruit of thee hereafter for ever. It is a strange, almost unfair miracle, unless it is a picture, not a snack.",
      "Because he walks straight from that tree into the temple, and does the same thing to it. He overturns the tables of the moneychangers, drives out the buyers and sellers, and quotes Isaiah. My house shall be called of all nations the house of prayer. But ye have made it a den of thieves. Leaves without fruit, all over again.",
      "The next day the disciples see the fig tree dried up from the roots. Jesus tells them to have faith in God, that a mountain can be told to be cast into the sea and it will happen if you do not doubt. Then he adds something you would not expect after a curse. When ye stand praying, forgive, if ye have ought against any, that your Father also which is in heaven may forgive you your trespasses.",
      "Back in the temple, the chief priests and scribes demand, by what authority doest thou these things? Jesus asks one question back, about John's baptism, whether it was from heaven or of men, and it traps them completely. They are too afraid of the crowd to answer either way. We cannot tell, they say. Neither do I tell you, he says. Cornered men asking a cornered question, and losing.",
    ]),
    markTwelve(1, 12, [
      "Jesus tells a parable straight at them. A man plants a vineyard and leases it out, and when he sends servants for his share of the fruit, the tenants beat one, kill another, wound a third.",
      "Finally he sends his own son, thinking, they will reverence my son. Instead they say, this is the heir, come, let us kill him, and the inheritance shall be ours. They throw the body out of the vineyard.",
      "What will the owner do? Come and destroy the husbandmen, and give the vineyard to others. Then Jesus quotes the Psalm. The stone which the builders rejected is become the head of the corner.",
      "Mark tells you plainly that the chief priests and scribes knew he had spoken this parable against them. They wanted to arrest him on the spot and could not, because they feared the people. He just told his own murder to the men who are about to commit it.",
    ]),
    markTwelve(13, 27, [
      "Pharisees and Herodians, who agree on almost nothing, team up to trap him. Master, we know thou art true. Is it lawful to give tribute to Caesar, or not? A yes makes him a Roman collaborator. A no makes him a rebel.",
      "Jesus asks for a coin. Whose is this image and superscription? Caesar's, they say. Render to Caesar the things that are Caesar's, and to God the things that are God's. He does not dodge the question. He splits it in half and hands each half back to the person who owns it.",
      "Sadducees, who do not believe in resurrection at all, try next. Seven brothers, one widow, married to each in turn as each one dies. In the resurrection, whose wife shall she be? Jesus does not pick a brother. Ye therefore do greatly err, not knowing the scriptures, nor the power of God.",
      "In the resurrection they neither marry nor are given in marriage, but are as the angels. And God told Moses at the bush, I am the God of Abraham, and the God of Isaac, and the God of Jacob. He is not the God of the dead, but of the living. Three traps, three answers, and nobody has laid a hand on him yet.",
    ]),
    markTwelve(28, 44, [
      "A scribe asks, honestly this time, which commandment is first of all. Jesus answers with one sentence he did not make up. Hear, O Israel, the Lord our God is one Lord, and thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind, and with all thy strength. The second is like it. Thou shalt love thy neighbour as thyself.",
      "The scribe agrees, and adds that this is more than all burnt offerings and sacrifices. Jesus tells him, thou art not far from the kingdom of God. After that, no man durst ask him any question. The traps end not with a winner and losers but with one honest man closer to the truth than he started.",
      "Then Jesus warns the crowd about scribes who love long robes and the best seats and greetings in the marketplace, and who devour widows' houses while making long prayers to look good doing it. These shall receive greater damnation.",
      "He sits across from the temple treasury and watches. Rich people cast in much. Then a poor widow puts in two mites, worth almost nothing. This poor widow hath cast more in than all they which have cast into the treasury. They gave of their abundance. She, of her want, cast in all that she had, even all her living. He just described exactly the kind of person the scribes he warned about were eating alive.",
    ]),
    markThirteen(1, 13, [
      "Leaving the temple, a disciple marvels at the stones and buildings. Jesus answers, seest thou these great buildings? There shall not be left one stone upon another, that shall not be thrown down. The most permanent-looking structure in their world, gone.",
      "Alone on the Mount of Olives with Peter, James, John, and Andrew, he is asked when, and what sign. He starts with a warning before he gives them anything else. Take heed lest any man deceive you, for many shall come in my name saying, I am Christ, and shall deceive many.",
      "Wars and rumours of wars, nation against nation, earthquakes, famines. Be not troubled, such things must needs be, but the end is not yet. These are only the beginning of sorrows, not the sign itself.",
      "You will be handed over to councils, beaten, brought before rulers for my sake, for a testimony against them. When that happens, take no thought beforehand what ye shall speak, for it is not ye that speak, but the Holy Ghost. Brother will betray brother to death, a father his own child. He is not promising them safety. He is promising them what to do without it.",
    ]),
    markThirteen(14, 37, [
      "When you see the abomination of desolation standing where it ought not, let the reader understand, then flee to the mountains. Do not go back for a coat. Woe to those with child or nursing in those days, for the affliction will be worse than any since the beginning of creation. Except the Lord shorten those days, no flesh should be saved, but for the elect's sake he will shorten them.",
      "If anyone says, lo, here is Christ, or there, believe it not. False Christs and false prophets will rise and show signs and wonders, enough to deceive the very elect if it were possible. I have told you all things beforehand. He is not trying to alarm them. He is trying to inoculate them.",
      "After that tribulation, the sun will darken, the moon will not give her light, the stars will fall, and then they will see the Son of man coming in the clouds with power and great glory, and he will send his angels to gather the elect from the four winds. Learn from the fig tree. When its branch is tender and puts out leaves, summer is near. So when you see these things, know that it is near, even at the doors.",
      "But of that day and that hour knoweth no man, no, not the angels in heaven, neither the Son, but the Father only. So watch and pray, for you do not know when the time is. Like a man on a journey who leaves servants in charge and tells the doorkeeper to watch. Watch, then, for you do not know when the master of the house is coming, at evening, at midnight, at cockcrow, or in the morning, lest coming suddenly he find you sleeping. And what I say unto you, he says, I say unto all. Watch.",
    ]),
  ],
  closing: [
    ["So that is Day 292.", 700],
    ["A king rode in on a donkey, cursed a tree for looking alive with nothing to show for it, and then did the same thing to the temple with a whip made of cords.", 800],
    ["Three groups of powerful men tried to trap him in the same afternoon, and all three walked away with less than they came with.", 800],
    ["Then he sat down across from the offering box and pointed out the one person nobody else in that temple would have noticed.", 800],
    ["A widow who gave everything she had, in the same building the scribes were quietly robbing widows in.", 850],
    ["And then, away from the crowd, he told his closest friends the truth. The building they were so proud of would not survive. Neither would this world stay unshaken.", 850],
    ["He did not tell them the date. He told them to stay awake.", 800],
    ["Tomorrow, Mark 14 through 16. The last supper, the arrest, the cross, and the empty tomb.", 850],
    ["For now, sit with the last word of today's reading.", 800],
    ["Watch.", 1200],
  ],
};
