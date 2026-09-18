import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 284, written to the Day 1 standard.
 *
 * Jesus turns from what people do to what is actually inside them - tradition
 * that hides a dirty heart, a woman with no claim on Him who out-believes
 * everyone in the room, bread multiplied twice and still misunderstood, and
 * then Peter's confession followed almost immediately by his rebuke. On the
 * mountain a voice settles the question for good. Seven blocks across
 * Matthew 15-17.
 */

const matthewFifteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 15:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 15,
  startVerse,
  endVerse,
  teaching,
});

const matthewSixteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 16:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 16,
  startVerse,
  endVerse,
  teaching,
});

const matthewSeventeen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 17:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 17,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 284,
  title: "Clean Hearts, Confession, and Glory",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 284. Jesus turns the conversation from what people do to what is actually inside them.", 800],
    ["The Pharisees accuse His disciples of breaking tradition. Jesus tells them their tradition has been covering up a dirty heart the whole time.", 850],
    ["A woman with no claim on Him at all refuses to leave without a blessing, and gets one.", 800],
    ["He feeds four thousand people from almost nothing, and His own disciples still don't understand what just happened.", 850],
    ["Peter finally says out loud who Jesus is. Minutes later he argues against the one thing that saves him.", 900],
    ["We are in Matthew 15, 16, and 17.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewFifteen(1, 20, [
      "Scribes and Pharisees come all the way from Jerusalem over unwashed hands, and Jesus turns the question back on them. Why do you break God's command to keep your own tradition? He points to Corban, a loophole where calling something a gift to God let a man off the hook for caring for his own parents. Religious language, used to dodge the actual command.",
      "He quotes Isaiah at them. This people draweth nigh unto me with their mouth, and honoureth me with their lips, but their heart is far from me. In vain they worship me, teaching for doctrines the commandments of men. That is what tradition can become. A costume where the heart used to be.",
      "Then to the crowd, plainly: it is not what goes into the mouth that defiles a man, it is what comes out of it. Peter asks Him to explain the saying, and Jesus is almost surprised it needs explaining.",
      "Out of the heart proceed evil thoughts, murders, adulteries, thefts, false witness, blasphemies. Unwashed hands never killed anyone. What is inside a person does.",
    ]),
    matthewFifteen(21, 31, [
      "Jesus goes into the coasts of Tyre and Sidon, and a woman of Canaan comes out crying after Him for her daughter, grievously vexed with a devil. He answers her not a word. Not cruelty. A test she does not know she is in yet.",
      "The disciples want her sent away because she is loud and unwanted. Jesus tells her plainly He was sent only to the lost sheep of the house of Israel. By every rule of the moment, she has no claim on Him at all.",
      "She worships Him anyway. Lord, help me. He says it is not right to take the children's bread and cast it to dogs. She does not argue the insult. Truth, Lord, yet the dogs eat of the crumbs which fall from their masters' table. She will take whatever falls off the edge of what is His.",
      "O woman, great is thy faith. Be it unto thee even as thou wilt. The woman with no standing outbelieves everyone else in this book. Then crowds bring Him the lame, blind, dumb, and maimed, and they end up glorifying not Jesus by name, but the God of Israel.",
    ]),
    matthewFifteen(32, 39, [
      "Three days the crowd has stayed with Him, and now they have nothing to eat. Jesus says it Himself before anyone asks Him to. I have compassion on the multitude. He is not waiting to be begged.",
      "The disciples ask the same tired question they asked before the first feeding. Whence should we have so much bread in the wilderness? They already watched Him do this once, and still cannot picture it happening again.",
      "Seven loaves and a few little fishes. He gives thanks, breaks it, hands it to the disciples, they hand it to the crowd. Four thousand men, besides women and children, eat until they are filled.",
      "Seven baskets full left over. Whatever gets handed back to Him, He hands back bigger than it was brought.",
    ]),
    matthewSixteen(1, 12, [
      "Pharisees and Sadducees, two groups that usually cannot stand each other, team up to test Him and ask for a sign from heaven. You can read the sky, He tells them, red at evening, red and lowring in the morning. You cannot read the moment standing in front of you.",
      "No sign will be given but the sign of the prophet Jonas. He has already told them this once. Asking again is not looking for evidence. It is stalling.",
      "On the boat He warns them, take heed and beware of the leaven of the Pharisees and of the Sadducees. The disciples think He means the bread they forgot to bring. O ye of little faith, He says. I just fed thousands twice out of almost nothing, and you are worried about lunch.",
      "He means their doctrine. A little bit of the wrong teaching works through a whole life the way leaven works through dough. Quietly. Until it is everywhere.",
    ]),
    matthewSixteen(13, 28, [
      "Jesus asks who people say He is, and gets a list of dead prophets back. Then He asks the disciples directly. Peter answers for all of them. Thou art the Christ, the Son of the living God. Flesh and blood did not teach him that.",
      "Jesus tells him, upon this rock I will build my church, and the gates of hell shall not prevail against it. Then, almost in the same breath, He tells them He must go to Jerusalem, suffer many things, be killed, and be raised the third day.",
      "Peter, still riding the high of getting it right, rebukes Him for it. Be it far from thee, Lord; this shall not be unto thee. And Jesus turns on him just as fast. Get thee behind me, Satan. The same mouth that just confessed the truth is now arguing against the one thing that saves anyone.",
      "If any man will come after me, let him deny himself, and take up his cross, and follow me. What is a man profited, if he shall gain the whole world, and lose his own soul? He is not offering an easier version of Himself than the one He is about to become.",
    ]),
    matthewSeventeen(1, 13, [
      "Six days later Peter, James, and John go up a mountain with Him, and His face shines as the sun, His clothes white as the light. Moses and Elias appear, talking with Him. The law and the prophets, standing next to the one they were always pointing at.",
      "Peter, talking before he thinks, offers to build three tabernacles, one each. While he is still speaking, a bright cloud overshadows them, and a voice says, this is my beloved Son, in whom I am well pleased; hear ye him. Not Moses. Not Elias. Him.",
      "The disciples fall on their face, sore afraid. Jesus touches them. Arise, and be not afraid. They lift up their eyes and it is just Jesus, standing there like always.",
      "Coming down the mountain He tells them to say nothing until He is risen from the dead, and explains that Elias already came, in John the Baptist, and they did to him whatsoever they wanted. The Son of man is next.",
    ]),
    matthewSeventeen(14, 27, [
      "A man kneels in front of Jesus about his son, who is lunatick and falls oft into the fire and into the water. The disciples already tried to heal him and could not. Jesus rebukes the devil and the child is cured that very hour.",
      "The disciples ask why they could not do it. Because of your unbelief, He tells them. If ye have faith as a grain of mustard seed, nothing shall be impossible unto you. He is not asking for more faith. A grain would have done it.",
      "Back in Galilee He tells them again, plainly this time, that He will be betrayed, killed, and raised the third day. Matthew says they were exceeding sorry. No confusion left in them anymore. Just grief.",
      "Then tax collectors ask if Jesus pays the temple tribute, and He sends Peter fishing, telling him the first fish he catches will have a piece of money in its mouth, enough for them both. The Son of God, days from predicting His own execution, still stops to pay a tax He does not legally owe, lest he should offend them.",
    ]),
  ],
  closing: [
    ["So that is Day 284.", 700],
    ["Jesus told the Pharisees their tradition had been covering up a dirty heart, then let a woman with no claim on Him prove she understood grace better than they did.", 850],
    ["He fed four thousand people from seven loaves, and still had to explain to His own disciples that He was not talking about bread when He warned them about leaven.", 850],
    ["Peter said the truest thing anyone says in this whole book. Thou art the Christ. Minutes later he argued against the cross that saves him.", 850],
    ["On the mountain, a voice cut through everything Moses and Elias had ever said.", 800],
    ["Then Jesus came down and healed a boy nobody else could help, and still stopped to pay a tax He did not owe.", 850],
    ["Tomorrow, Matthew 18 through 20. Forgiveness, greatness turned upside down, and a road that starts heading toward Jerusalem for good.", 900],
    ["For now, sit with what the voice from the cloud said.", 750],
    ["Not Moses. Not Elias.", 800],
    ["Hear him.", 1200],
  ],
};
