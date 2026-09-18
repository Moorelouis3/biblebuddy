import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 281, written to the Day 1 standard.
 *
 * The middle and close of the Sermon on the Mount: prayer, fasting, money,
 * worry, judgment, the narrow gate, and the wise and foolish builders. Then
 * Jesus comes down off the mountain and backs every word up with a leper
 * cleansed, a centurion's faith, a storm stilled, and demons cast out.
 * Seven blocks across Matthew 6-8.
 */

const matthewSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 6:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

const matthewSeven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 7:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 7,
  startVerse,
  endVerse,
  teaching,
});

const matthewEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 8:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 8,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 281,
  title: "Kingdom Prayer and Kingdom Power",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 281. Jesus is still on that mountain, and He is not slowing down.", 800],
    ["He teaches you how to pray, how to hold money, and how to stop being anxious about tomorrow.", 850],
    ["Then He warns you that saying the right words is not the same as actually building on what He said.", 850],
    ["And once He comes down off that mountain, He proves every claim He just made. A leper touched. A storm silenced with a sentence.", 900],
    ["We are in Matthew 6, 7, and 8.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewSix(1, 15, [
      "Take heed that ye do not your alms before men, to be seen of them, Jesus says. When you give, do not sound a trumpet like the hypocrites do in the synagogues to get glory from men. Let not thy left hand know what thy right hand doeth.",
      "Same with prayer. Do not stand on street corners to be seen praying. Enter into thy closet, shut the door, and pray to thy Father which is in secret. He is not against public prayer. He is against prayer performed for an audience.",
      "Then He gives them the words. Our Father which art in heaven, hallowed be thy name. Thy kingdom come, thy will be done in earth, as it is in heaven. Give us this day our daily bread, and forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil.",
      "He stops right on the forgiveness line and explains it. If ye forgive men their trespasses, your heavenly Father will also forgive you. But if ye forgive not men their trespasses, neither will your Father forgive your trespasses. He does not let that line pass without comment.",
    ]),
    matthewSix(16, 34, [
      "Fasting gets the same instruction as giving and prayer. Do not look sad and disfigure your face like the hypocrites, to show men that you fast. Anoint your head, wash your face, so your fasting is seen only by your Father in secret.",
      "Lay not up for yourselves treasures upon earth, where moth and rust corrupt and thieves break through and steal. Lay up treasures in heaven instead. For where your treasure is, there will your heart be also. What you actually value is not a mystery. Follow the money and you will find it.",
      "No man can serve two masters, He says. Ye cannot serve God and mammon. Not because money is evil, but because it demands the same total loyalty God does, and only one of them can actually have it.",
      "Then He turns to worry directly. Take no thought for your life, what ye shall eat or drink. Behold the fowls of the air, they sow not, neither reap, yet your heavenly Father feeds them. Consider the lilies of the field, how they grow, and Solomon in all his glory was not arrayed like one of these. Seek ye first the kingdom of God and his righteousness, and all these things shall be added unto you.",
    ]),
    matthewSeven(1, 12, [
      "Judge not, that ye be not judged. For with what judgment ye judge, ye shall be judged, and with what measure ye mete, it shall be measured to you again. Why beholdest thou the mote in thy brother's eye, but considerest not the beam in thine own eye?",
      "First cast out the beam out of thine own eye, He says, and then shalt thou see clearly to cast the mote out of thy brother's eye. He is not banning honesty about sin. He is banning it from anyone who has not dealt with their own first.",
      "Ask, and it shall be given you. Seek, and ye shall find. Knock, and it shall be opened unto you. What man of you, whom if his son ask bread, will give him a stone? If ye then, being evil, know how to give good gifts to your children, how much more shall your Father which is in heaven give good things to them that ask him.",
      "Therefore all things whatsoever ye would that men should do to you, do ye even so to them: for this is the law and the prophets. Everything Moses and the prophets said, boiled down into one line you can actually carry with you.",
    ]),
    matthewSeven(13, 29, [
      "Enter ye in at the strait gate. Wide is the gate and broad is the way that leadeth to destruction, and many go in there. Narrow is the gate and narrow the way that leadeth unto life, and few there be that find it. Easy is not the same as right.",
      "Beware of false prophets, which come to you in sheep's clothing, but inwardly are ravening wolves. Ye shall know them by their fruits. Do men gather grapes off thorns, or figs off thistles? A good tree cannot bring forth evil fruit, and the fruit is what gives it away.",
      "Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven, but he that doeth the will of my Father. Many will say to me in that day, Lord, Lord, have we not prophesied in thy name, and in thy name cast out devils? And then Jesus says the most frightening line in the sermon. I never knew you: depart from me, ye that work iniquity.",
      "Whosoever heareth these sayings of mine, and doeth them, is like a wise man who built his house upon a rock. The rain descended, the floods came, the winds blew, and it fell not, for it was founded upon a rock. Everyone who hears and does not do them is like a foolish man who built on sand, and great was the fall of it. Hearing is not the same as building.",
    ]),
    matthewEight(1, 17, [
      "Jesus comes down from the mountain, and a leper worships him. Lord, if thou wilt, thou canst make me clean. Jesus puts out his hand and touches him. I will; be thou clean. And immediately his leprosy is cleansed. A touch that should have made Jesus unclean instead makes the leper whole.",
      "Then a centurion comes, asking for his servant, sick of the palsy, grievously tormented. Jesus offers to come and heal him, and the centurion answers, Lord, I am not worthy that thou shouldest come under my roof, but speak the word only, and my servant shall be healed.",
      "Jesus marvels at that, and tells the people following him, I have not found so great faith, no, not in Israel. A Roman officer, not a son of Abraham, has the clearest faith anyone in the story has shown yet.",
      "At Peter's house, Jesus touches his mother-in-law's hand and the fever leaves her, and she rises and ministers to him. That evening they bring many possessed with devils, and he casts out the spirits and heals all that were sick, fulfilling what Esaias spoke. Himself took our infirmities, and bare our sicknesses.",
    ]),
    matthewEight(18, 27, [
      "Seeing great multitudes, Jesus gives orders to depart to the other side. A scribe says he will follow him wherever he goes. Jesus tells him plainly, the foxes have holes, and the birds of the air have nests, but the Son of man hath not where to lay his head. Following him has never been a promise of comfort.",
      "Another disciple asks to bury his father first. Jesus says, follow me, and let the dead bury their dead. A hard line, meant to show that nothing, not even the most natural loyalty, comes before this.",
      "Then he gets into a ship, and a great tempest rises, so that the waves cover the ship, and Jesus is asleep. His disciples wake him. Lord, save us, we perish.",
      "Why are ye fearful, O ye of little faith, he says, then rebukes the winds and the sea, and there is a great calm. The men marvel, saying, what manner of man is this, that even the winds and the sea obey him.",
    ]),
    matthewEight(28, 34, [
      "On the other side, in the country of the Gergesenes, two men possessed with devils meet him, coming out of the tombs, so fierce that no man could pass that way.",
      "They cry out, what have we to do with thee, Jesus, thou Son of God? Art thou come hither to torment us before the time? Even the demons know exactly who he is.",
      "A herd of swine is feeding nearby, and the devils beg to be sent into them. Jesus says, go. They go into the herd, and the whole herd runs violently down a steep place into the sea and perishes in the waters.",
      "The keepers flee into the city and tell everything, and the whole city comes out to meet Jesus. And when they see him, they beg him to depart out of their coasts. They just watched real power meet real evil, and it frightens them more than it draws them.",
    ]),
  ],
  closing: [
    ["So that is Day 281.", 700],
    ["Jesus taught you to give, pray, and fast without needing anyone watching.", 750],
    ["He gave you the words to pray, and then made sure you noticed the line about forgiveness.", 800],
    ["He told you not to worry, because the same Father who feeds the birds sees you too.", 800],
    ["He warned that calling him Lord is not the same as actually doing what he said. Only one house survives the storm.", 850],
    ["Then he came down the mountain and did exactly what he claimed. Touched a leper. Healed a Roman's servant from a distance. Silenced a storm with one sentence.", 850],
    ["And when he freed two men from demons, the town did not celebrate. They asked him to leave.", 850],
    ["Tomorrow, Matthew 9 through 11. More healing, a call to a tax collector, and the cost of really following him.", 850],
    ["For now, sit with what he said about the two builders.", 750],
    ["The rain fell, the floods came, the winds blew. Only the house on the rock stood.", 1200],
  ],
};
