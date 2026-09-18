import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 287, written to the Day 1 standard.
 *
 * Jesus tells the disciples plainly what is coming, then walks straight
 * into it: a prophecy of the end, two parables about staying ready, the
 * sheep and the goats, and then Bethany, the upper room, Gethsemane, the
 * arrest, and Peter's collapse in one long night. Seven blocks across
 * Matthew 24-26.
 */

const matthewTwentyFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 24:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 24,
  startVerse,
  endVerse,
  teaching,
});

const matthewTwentyFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 25:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 25,
  startVerse,
  endVerse,
  teaching,
});

const matthewTwentySix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 26:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 26,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 287,
  title: "Watchfulness, Supper, and Betrayal",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 287.", 700],
    ["Jesus tells the disciples plainly that the temple they are so proud of will not have one stone left on another.", 850],
    ["Then he tells them how to wait for whatever comes next without falling asleep on the job.", 850],
    ["And then, in the space of one night, he is anointed for burial, betrayed for money, and arrested while his closest friend swears he would rather die than deny him.", 900],
    ["We are in Matthew 24, 25, and 26.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewTwentyFour(1, 14, [
      "The disciples show off the temple buildings, and Jesus says there shall not be left here one stone upon another, that shall not be thrown down. He is looking at the most permanent-looking thing in their world and telling them it is not permanent at all.",
      "They ask when, and what the sign will be. His first answer is a warning, not a timeline. Take heed that no man deceive you, for many shall come in my name saying I am Christ, and shall deceive many.",
      "Wars and rumors of wars, nation against nation, famines, pestilences, earthquakes. Do not let any of that shake you, he says, for all these things must come to pass, but the end is not yet. These are the beginning of sorrows, not the finish line.",
      "Believers will be hated, betrayed by each other, and false prophets will multiply while love grows cold in most people. But he that shall endure unto the end, the same shall be saved. And this gospel of the kingdom shall be preached in all the world for a witness, and then shall the end come. Endurance and mission come before the ending, not after it.",
    ]),
    matthewTwentyFour(15, 31, [
      "When you see the abomination of desolation, the thing Daniel the prophet warned about, standing in the holy place, that is the signal to move immediately. Flee into the mountains. Do not go back into the house for anything. Do not even turn back for your coat.",
      "For then shall be great tribulation, such as was not since the beginning of the world to this time, no, nor ever shall be. It is so severe that God shortens those days for the sake of the ones he has chosen.",
      "False christs and false prophets will show real signs and wonders, enough to deceive almost anyone. If someone tells you Christ is out in the desert or hiding in a secret room, do not go looking. When he actually comes, it will be as unmistakable as lightning lighting up the whole sky from east to west.",
      "After that tribulation, the sun goes dark, the moon gives no light, the stars fall, and then the sign of the Son of man appears in heaven. Every tribe on earth mourns, and they see him coming in the clouds with power and great glory, sending his angels to gather his elect from one end of heaven to the other.",
    ]),
    matthewTwentyFour(32, 51, [
      "Learn a lesson from the fig tree. When its branch gets tender and puts out leaves, you know summer is close. In the same way, when you see all these things, know that it is near, even at the doors.",
      "But of that day and hour knoweth no man, no, not the angels of heaven, but my Father only. Jesus does not even claim to know the exact date himself here. Nobody after him gets to pretend they have figured out what he did not.",
      "As the days of Noah were, so shall the coming of the Son of man be. People were eating, drinking, marrying, completely unaware, right up until the flood took them all away. Two men in a field, two women grinding at a mill, one taken, one left. Ordinary life is exactly what it will look like right up to the moment.",
      "So watch, because you do not know what hour your Lord comes. A faithful servant keeps doing his job whether the master is watching or not. An evil servant decides his master is delaying and starts abusing the people under him. Watchfulness here is not panic. It is just staying faithful to the work in front of you.",
    ]),
    matthewTwentyFive(1, 30, [
      "Ten virgins take their lamps to meet the bridegroom. Five bring extra oil, five do not. The bridegroom is delayed, they all fall asleep, and at midnight the cry goes up: behold, the bridegroom cometh.",
      "The five without oil ask to borrow some. The wise ones say no, there will not be enough for both, go buy your own. While they are out buying it, the door shuts. Lord, Lord, open to us, they beg. I know you not, he answers. Some things cannot be borrowed at the last minute.",
      "Then a master leaves on a journey and gives five talents to one servant, two to another, one to a third, each according to his own ability. The five and two-talent servants trade with what they were given and double it. Well done, good and faithful servant, their master says to both.",
      "The one-talent servant, afraid, buries his in the ground and hands it back untouched. Thou wicked and slothful servant, the master says, and takes even that one talent away. He is not condemned for losing money. He is condemned for doing nothing at all with what he was trusted to hold.",
    ]),
    matthewTwentyFive(31, 46, [
      "When the Son of man comes in his glory with all the angels, he sits on his throne and all nations are gathered before him. He separates them the way a shepherd separates sheep from goats, sheep on the right, goats on the left.",
      "To the sheep the King says, come, ye blessed of my Father, inherit the kingdom. I was hungry and you fed me, thirsty and you gave me drink, a stranger and you took me in, naked and you clothed me, sick and in prison and you came to me.",
      "Both the sheep and the goats ask the same question. Lord, when did we ever see you like that? And the King answers, inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me. The goats did none of it, not necessarily out of cruelty, just neglect, and they are sent away.",
      "This judgment does not turn on a creed anyone recited. It turns on who actually got fed, clothed, welcomed, and visited. What you did to the person nobody else was watching, you did to him.",
    ]),
    matthewTwentySix(1, 35, [
      "Jesus tells the disciples plainly, after two days is the passover, and the Son of man is betrayed to be crucified, at the exact moment the chief priests are meeting at Caiaphas's palace to plot how to kill him quietly.",
      "In Bethany, a woman breaks open an alabaster box of expensive ointment and pours it on his head. The disciples call it waste. Jesus says she has done a good work on me. She did it for my burial, and wherever this gospel is preached, what she just did will be told as her memorial.",
      "At that same moment, Judas Iscariot goes to the chief priests and asks, what will ye give me, and I will deliver him unto you? They agree on thirty pieces of silver, and from then on he watches for his chance.",
      "At the supper, Jesus takes bread, breaks it, and says, take, eat, this is my body. He takes the cup and says, this is my blood of the new testament, shed for many for the remission of sins. Then he tells Peter plainly that before the rooster crows, Peter will deny him three times. Peter insists he would rather die.",
    ]),
    matthewTwentySix(36, 75, [
      "In Gethsemane, Jesus tells Peter, James, and John his soul is exceeding sorrowful, even unto death, and asks them to stay awake with him. He prays three times, O my Father, if it be possible, let this cup pass from me, nevertheless not as I will, but as thou wilt. Each time he comes back, they are asleep.",
      "Judas arrives with an armed crowd and a signal already agreed on: whomsoever I shall kiss, that same is he. He kisses Jesus. Someone draws a sword and cuts off a servant's ear, and Jesus stops it immediately. All they that take the sword shall perish with the sword. He could call twelve legions of angels. He does not.",
      "Before Caiaphas, false witnesses cannot even get their stories straight. Jesus stays silent until the high priest demands directly whether he is the Christ, the Son of God. Thou hast said, he answers, and describes himself coming in the clouds of heaven. That answer alone gets him condemned for blasphemy, spat on, and struck.",
      "Peter, who swore he would die before denying him, denies him three times in a courtyard before the rooster crows, the last time with a curse and an oath. And then he remembers the word Jesus said to him, and Peter went out and wept bitterly. The man who could not stay awake for an hour could not stay brave for one night either.",
    ]),
  ],
  closing: [
    ["So that is Day 287.", 700],
    ["Jesus told the disciples the temple would fall, and then told them exactly how to wait for whatever comes after: awake, faithful, feeding the hungry in front of them.", 850],
    ["Ten virgins ran out of time to borrow what they should have carried themselves.", 750],
    ["A servant buried what he was trusted with instead of using it, and lost even that.", 800],
    ["The sheep and the goats never argued theology. They just fed people, or they did not.", 800],
    ["Then, in one night, a woman poured out everything she had for his burial, and a friend sold him for the price of a slave.", 850],
    ["Jesus prayed until he was ready, and Peter slept until he was not.", 800],
    ["Tomorrow, Matthew 27 and 28, and Mark 1. The cross, the resurrection, and the gospel begins to move.", 850],
    ["For now, sit with Gethsemane.", 750],
    ["Not as I will, but as thou wilt.", 1200],
  ],
};
