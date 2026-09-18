import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 283, written to the Day 1 standard.
 *
 * Opposition to Jesus turns lethal - a healed hand on the sabbath, an
 * accusation of Beelzebub, a plot to kill Him - and He answers with
 * parables that hide the kingdom from people who already decided not to
 * look. Then Herod murders John at a party, and Jesus, grieving, feeds
 * five thousand and walks out to His disciples on the water. Seven blocks
 * across Matthew 12-14.
 */

const matthewTwelve = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 12:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 12,
  startVerse,
  endVerse,
  teaching,
});

const matthewThirteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 13:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 13,
  startVerse,
  endVerse,
  teaching,
});

const matthewFourteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 14:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 14,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 283,
  title: "Opposition, Parables, and Provision",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 283. The opposition to Jesus stops being quiet.", 800],
    ["Religious leaders start plotting how to kill Him, right after He heals a man's hand on the sabbath.", 850],
    ["He answers them with stories instead of arguments. A sower, a seed, a hidden treasure. Stories that hide the truth from people who already decided not to look.", 900],
    ["Then a king kills a prophet at a birthday party, and Jesus still feeds five thousand people that same day.", 850],
    ["We are in Matthew 12, 13, and 14.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewTwelve(1, 21, [
      "Pharisees catch the disciples plucking grain on the sabbath and call it a crime. Jesus points them to David, a man they revere, who ate the shewbread when he was hungry and no one called it sin. In this place is one greater than the temple, He tells them. He is not attacking the sabbath. He is telling them who is standing in front of them.",
      "Then He heals a man's withered hand right there in the synagogue, on the sabbath, in front of the men looking for a reason to destroy Him. How much then is a man better than a sheep? Wherefore it is lawful to do well on the sabbath days. He asks the question, then does it anyway.",
      "Their answer to mercy is to go out and hold council against Him, how they might destroy Him.",
      "And His answer to their plotting is to withdraw quietly and keep healing people, fulfilling the old prophecy of a servant who will not break a bruised reed or quench a smoking flax. He does not fight back the way they expect.",
    ]),
    matthewTwelve(22, 37, [
      "A blind and mute man possessed with a devil is healed, and the crowd starts asking, is not this the son of David? The Pharisees watch the same miracle and answer it with Beelzebub instead.",
      "Jesus takes the accusation apart with one question. If I cast out devils by Beelzebub, by whom do your own sons cast them out? A kingdom divided against itself cannot stand, and neither can their logic.",
      "Then He says something final. Whosoever speaketh a word against the Holy Ghost, it shall not be forgiven him. Not because God runs out of mercy, but because a heart that calls the Spirit's work evil has shut the one door mercy comes through.",
      "Out of the abundance of the heart the mouth speaketh, He says, and warns that every idle word will be accounted for in the day of judgment. By thy words thou shalt be justified, and by thy words thou shalt be condemned. What comes out of your mouth was never really about your mouth.",
    ]),
    matthewTwelve(38, 50, [
      "The scribes and Pharisees ask for a sign, after watching Him give them dozens already. He answers with the sign of Jonas, three days and three nights in the heart of the earth, the way Jonah was three days in the fish. The men of Nineveh repented at a warning. This generation has the real thing in front of them and still asks for proof.",
      "A greater than Jonas is here, He says. A greater than Solomon is here. The Queen of the South traveled a long way just to hear Solomon's wisdom, and wisdom itself is now standing in their streets unrecognized.",
      "He warns them about an unclean spirit that leaves a man, finds no rest, and comes back with seven spirits worse than itself, because the house was found empty, not filled with anything better. Being cleaned out is not the same as being occupied by good.",
      "While He is still speaking, His mother and brothers stand outside wanting Him. He looks at the people sitting around Him and says, whosoever shall do the will of my Father which is in heaven, the same is my brother, and sister, and mother. Blood was never the qualifier He is after.",
    ]),
    matthewThirteen(1, 23, [
      "A sower goes out to sow, and the seed lands on four different kinds of ground. The path, the rocky soil, the thorns, and the good ground. Same seed, same sower. The only variable in the whole story is the dirt.",
      "His disciples ask why He teaches in parables at all. Unto you it is given to know the mysteries of the kingdom of heaven, He says, but to them it is not given. A parable is not a simpler version of the truth. It hides it from people who have already decided not to look.",
      "He explains the ground Himself. The wayside is a heart the devil snatches the word from before it settles. The stony ground receives it with joy and quits at the first pressure, because it never grew a root. The thorns let the word grow right alongside the cares of this world and the deceitfulness of riches, until one of them chokes the other out.",
      "Only the good ground hears it, understands it, and bears fruit, some a hundredfold, some sixty, some thirty. He never says all good ground produces the same amount. He just says it produces.",
    ]),
    matthewThirteen(24, 58, [
      "Wheat and tares grow up together on purpose. Let both grow together until the harvest, He says, because pulling up the weeds too early would tear out the wheat's roots with them. Some separating is not His to do yet.",
      "The kingdom is a mustard seed, the smallest of all seeds, that grows into a tree big enough for birds to nest in. It is leaven, hidden in dough, working through the whole batch without ever being seen doing it. Small and hidden is exactly how it starts.",
      "It is treasure hidden in a field, and one pearl of great price, worth selling everything else you own just to have. And it is a net full of every kind of fish, good and bad together, until the sorting finally comes at the end.",
      "Then He goes home to Nazareth, and the people who watched Him grow up are offended at Him. A prophet is not without honour, save in his own country, He says, and He does not do many mighty works there, not because He cannot, but because of their unbelief. Familiarity can make you the last person to recognize what is standing in front of you.",
    ]),
    matthewFourteen(1, 21, [
      "Herod hears about Jesus and is haunted, because he thinks this is John the Baptist risen from the dead. John had told him plainly, it is not lawful for thee to have her, about his brother's wife, and it cost John his head on a platter at a birthday party, because Herod cared more about an oath made in front of his guests than about a man's life.",
      "John's disciples take the body, bury it, and go and tell Jesus. That is the news Jesus is carrying when He tries to withdraw by Himself into a desert place.",
      "The crowds follow Him on foot anyway, and instead of sending them away, He is moved with compassion toward them. When evening comes and the disciples want to send everyone off to buy food, He says, they need not depart; give ye them to eat.",
      "Five loaves and two fishes, blessed, broken, and handed out, and five thousand men, besides women and children, eat until they are full, with twelve baskets of fragments left over. He is grieving, and He still feeds a crowd out of almost nothing.",
    ]),
    matthewFourteen(22, 36, [
      "Jesus sends the disciples ahead by boat and goes up the mountain alone to pray, finally getting the solitude He was originally looking for. In the fourth watch of the night, He comes to them walking on the sea, and they cry out in fear, thinking it is a spirit.",
      "Be of good cheer; it is I; be not afraid, He says. Peter answers with the boldest request in the Gospels. Lord, if it be thou, bid me come unto thee on the water. And Jesus just says, Come.",
      "Peter actually walks on the water, until he looks at the wind instead of at Jesus, and starts to sink. Lord, save me. Jesus catches him immediately and asks, O thou of little faith, wherefore didst thou doubt? He does not let him drown to make a point.",
      "When they climb into the boat, the wind stops, and the men worship Him. Of a truth thou art the Son of God. Then at Gennesaret, people just bring their sick and beg to touch the hem of His garment, and as many as touched it were made perfectly whole.",
    ]),
  ],
  closing: [
    ["So that is Day 283.", 700],
    ["Jesus healed a man's hand in front of the exact people looking for a reason to kill Him, and did not flinch.", 800],
    ["He told them who He was. One greater than the temple, than Jonah, than Solomon. And they still asked for another sign.", 850],
    ["Then He turned to parables, because some people had already decided not to see. Same seed. Different soil.", 850],
    ["Herod killed a prophet to save face at a party. Jesus, grieving, fed five thousand people with almost nothing that same day.", 850],
    ["And when Peter stepped out of the boat and started to sink, Jesus did not let him drown to make a point. He just caught him.", 850],
    ["Tomorrow, Matthew 15 through 17. Clean hearts, a Canaanite woman's faith, and a mountain where Jesus is finally seen for who He is.", 900],
    ["For now, sit with what He said to Peter.", 750],
    ["O thou of little faith, wherefore didst thou doubt?", 900],
    ["He was already close enough to catch him.", 1200],
  ],
};
