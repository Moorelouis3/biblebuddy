import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 297, written to the Day 1 standard.
 *
 * Luke 10-12 is a heavy three-chapter reading, so each block leans on Day
 * 295's technique of covering several linked scenes inside four lines
 * rather than adding an eighth block. Seven blocks across Luke 10, 11, and
 * 12: the seventy sent out, the Good Samaritan and Mary and Martha, the
 * Lord's Prayer, the Beelzebub controversy, the woes on the Pharisees, the
 * rich fool and the ravens and lilies, and staying ready for the master's
 * return.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Luke ${chapter}:${startVerse}-${endVerse}`,
  book: "luke",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 297,
  title: "Neighbor Love, Prayer, and Watchfulness",
  opening: [
    ["Hey. Good to have you back.", 750],
    ["Day 297. The seventy come back thrilled about power. Jesus redirects them to something better.", 800],
    ["A lawyer tries to trap him and gets the Good Samaritan instead. Martha gets busy. Mary just sits and listens.", 850],
    ["Then Jesus teaches you how to pray, in his own words, and warns you that the things you are anxious about are exactly the things you do not need to be.", 850],
    ["Ravens do not store grain. Lilies do not spin thread. And you are worth more than both.", 800],
    ["We are in Luke 10, 11, and 12. Prayer, mercy, and staying ready.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(10, 1, 24, [
      "Jesus sends seventy more disciples ahead of him in pairs, into every town he is about to visit himself. Travel light, no purse, no bag, no sandals. Say peace to every house you enter. Heal the sick, and tell them the kingdom of God has come near, whether or not they welcome you.",
      "He pronounces judgment on the towns that watched his miracles and still would not turn. Chorazin, Bethsaida, Capernaum, exalted to heaven and about to be brought down. Tyre and Sidon, even Sodom, would have repented with far less proof than these towns already got.",
      "The seventy come back thrilled. Lord, even the demons obey us in your name. Jesus tells them not to get excited about that. I saw Satan fall like lightning, yes, but rejoice that your names are written in heaven. That is the real news.",
      "Right there, he prays out loud, thanking the Father for hiding this from the wise and revealing it to little children. Then he turns to the disciples privately. Blessed are the eyes that see what you are seeing. Prophets and kings wanted this and never got it.",
    ]),
    g(10, 25, 42, [
      "A lawyer stands up to test him. Master, what must I do to inherit eternal life? Jesus turns it back on him. What does the law say? Love God with everything, love your neighbor as yourself. Right answer, Jesus says. Do this, and live.",
      "Wanting to justify himself, the lawyer asks, and who is my neighbor? So Jesus tells a story. A man is beaten and left half dead on the road. A priest passes by on the other side. A Levite does the same. Then a Samaritan, the kind of person a Jewish lawyer would despise, stops, bandages him, and pays for his care.",
      "Which of these three was a neighbor to him? The one who showed mercy, the lawyer says, unable to even say the word Samaritan out loud. Jesus tells him, go and do likewise. Neighbor was never about geography. It is about who actually stops.",
      "Then Martha welcomes Jesus into her home and gets buried in the work of hosting, while her sister Mary just sits at his feet, listening. Martha complains. Jesus answers, Martha, Martha, you are worried and troubled about many things. Mary has chosen the one thing that matters, and it will not be taken from her.",
    ]),
    g(11, 1, 13, [
      "A disciple asks him, Lord, teach us to pray, the way John taught his own followers. Jesus gives them the words. Our Father which art in heaven, hallowed be thy name. Thy kingdom come. Give us day by day our daily bread. Forgive us our sins, as we forgive those who owe us. Lead us not into temptation.",
      "Then he tells a story about persistence. A man pounds on a friend's door at midnight, needing bread for a guest who just arrived. The friend does not want to get up, but gets up anyway, not out of friendship but because the man will not stop knocking. Ask, and it shall be given. Seek, and ye shall find. Knock, and it shall be opened.",
      "He asks the room a plain question. What father, if his son asks for bread, hands him a stone instead? If he asks for a fish, hands him a serpent? If he asks for an egg, hands him a scorpion?",
      "If you, as flawed as you are, know how to give your children good gifts, how much more will your Father in heaven give the Holy Spirit to everyone who asks him? Prayer here is not a formula to get right. It is trusting who is actually on the other end.",
    ]),
    g(11, 14, 36, [
      "Jesus casts a mute spirit out of a man, and the man speaks. Some in the crowd say he does it by Beelzebub, the prince of devils. Others demand a sign from heaven, as if the miracle they just watched was not one.",
      "Jesus answers plainly. Every kingdom divided against itself is brought to desolation. If I cast out devils by Satan, why would Satan fight himself? But if I cast them out by the finger of God, then the kingdom of God has already come upon you. He that is not with me is against me.",
      "He calls this generation evil for demanding a sign, and says the only sign they will get is the sign of Jonah. The men of Nineveh repented at Jonah's preaching, and someone greater than Jonah stands in front of them now. The queen of the south crossed the world to hear Solomon's wisdom, and someone greater than Solomon is here.",
      "No man lights a candle and hides it under a bushel. He sets it where it gives light. The light of the body is the eye. If your eye is single, your whole body is full of light. Take heed that the light in you is not actually darkness.",
    ]),
    g(11, 37, 54, [
      "A Pharisee invites Jesus to eat, and is shocked he does not wash first by their ritual. Jesus does not soften it. You clean the outside of the cup and the platter, and inside you are full of greed and wickedness. Did not the one who made the outside make the inside too?",
      "Woe unto you Pharisees, he says. You tithe mint and rue and every garden herb, and pass right over justice and the love of God. You love the chief seats in the synagogues and being greeted with honor in the marketplace. You are like unmarked graves, and people walk over you without ever knowing what they are stepping on.",
      "A lawyer objects that this insults them too. Jesus does not back off. Woe unto you lawyers. You load people down with burdens grievous to bear, and will not touch those burdens with one of your own fingers. You build monuments to the prophets your own fathers killed, which only proves you approve of what they did.",
      "Woe unto you, he says, you have taken away the key of knowledge. You did not go in yourselves, and you hindered everyone who was trying to. After this, the scribes and Pharisees come after him hard, laying wait to catch something out of his mouth.",
    ]),
    g(12, 1, 34, [
      "With a crowd so large people are trampling each other, Jesus turns to his disciples first. Beware the leaven of the Pharisees, which is hypocrisy. Nothing hidden stays hidden. Do not fear those who can only kill the body. Fear the one with power over what comes after. Not one sparrow is forgotten before God, and every hair on your head is numbered.",
      "Someone in the crowd wants Jesus to settle an inheritance dispute. He refuses, and warns everyone instead. Take heed and beware of covetousness, for a man's life does not consist in the things he owns. Then the story: a rich man's land produces so much he tears down his barns to build bigger ones, tells his own soul to take its ease, eat, drink, be merry. That night God says, thou fool, this night thy soul shall be required of thee. Whose shall those things be now?",
      "So he tells the disciples plainly. Take no thought for your life, what you shall eat, what you shall put on. Consider the ravens. They neither sow nor reap, and God feeds them. You are worth far more than birds. Consider the lilies, they toil not, they spin not, and Solomon in all his glory was never arrayed like one of these.",
      "If God so clothes the grass, here today and gone tomorrow, how much more will he clothe you, O ye of little faith? Seek the kingdom of God, and the rest is added to you. Fear not, little flock, it is your Father's good pleasure to give you the kingdom. Sell what you have, give alms, lay up treasure in heaven where no thief comes near and no moth destroys. Where your treasure is, there your heart will be also.",
    ]),
    g(12, 35, 59, [
      "Let your loins be girded and your lights burning, he says, like servants waiting for their lord to come home from a wedding, ready to open the door the moment he knocks. Blessed are the servants he finds watching, whenever he comes, second watch or third. If the homeowner had known what hour the thief was coming, he would have stayed awake. Be ready, for the Son of man comes at an hour you do not expect.",
      "Peter asks if that parable is just for the disciples or for everyone. Jesus answers with a steward left in charge while the master is away. Blessed is that servant, found doing his job when his lord returns. But the servant who says my lord delays his coming, and starts beating the other servants and getting drunk, is caught off guard and cut apart. The one who knew his lord's will and did not prepare answers for more than the one who truly did not know.",
      "I am come to send fire on the earth, he says, and I wish it were already kindled. I have a baptism to be baptized with, and how I am straitened till it be accomplished. Do not think I came to give peace on earth. I came to bring division, even inside one house, father against son, mother against daughter.",
      "Then he turns to the people. You can read a cloud in the west and call the rain, a south wind and call the heat, and you are right every time. Why can you not discern this present time? Settle with your adversary on the way to the magistrate, before he drags you before the judge, for you will not come out till you have paid the very last mite.",
    ]),
  ],
  closing: [
    ["So that is Day 297.", 700],
    ["A Samaritan who actually stopped, when the religious men just walked past.", 750],
    ["Mary, sitting still, choosing the one thing that mattered.", 750],
    ["A prayer short enough to remember and big enough to live inside.", 800],
    ["A rich man who built bigger barns the same night God asked for his soul back.", 800],
    ["Ravens with no storehouse, lilies with no loom, and a Father who feeds and clothes them both.", 800],
    ["Tomorrow, Luke 13 through 15. A fig tree gets one more year, and a father runs down the road to meet a son he thought was gone.", 850],
    ["For now, sit with the lawyer's question.", 750],
    ["Who is my neighbor?", 750],
    ["Jesus already told him. Go, and do likewise.", 1200],
  ],
};
