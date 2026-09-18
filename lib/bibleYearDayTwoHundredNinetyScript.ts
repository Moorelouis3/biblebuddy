import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 290, written to the Day 1 standard.
 *
 * A demoniac freed, a dead girl and a bleeding woman both called daughter,
 * John the Baptist beheaded at a party, five thousand fed, and a fight over
 * what actually makes a person unclean. Seven blocks across Mark 5, 6, and 7.
 */

const markFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 5:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

const markSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 6:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

const markSeven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 7:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 7,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SCRIPT: BibleYearDayScript = {
  dayNumber: 290,
  title: "Deliverance, Healing, and True Cleanliness",
  opening: [
    ["Hey. Glad you're back.", 700],
    ["Day 290.", 700],
    ["Today Jesus crosses a sea, and on the other side is a man so violent nobody can even chain him anymore.", 800],
    ["Then a synagogue ruler's daughter dies, a bleeding woman touches a robe in a crowd, and a king throws a party that ends with a head on a plate.", 850],
    ["By the end of it, Jesus is arguing with religious leaders about what actually makes a person dirty.", 800],
    ["We are in Mark 5, 6, and 7.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    markFive(1, 20, [
      "Jesus crosses the sea into Gadarene country and a man comes out of the tombs to meet him, living among the dead, cutting himself with stones, so strong that chains cannot hold him. Nobody has been able to tame him.",
      "The man runs to Jesus and worships him, then the spirit in him shouts, what have I to do with thee, thou Son of the most high God? I adjure thee by God, that thou torment me not. Even the demon knows exactly who is standing in front of it.",
      "Jesus asks its name. My name is Legion, for we are many. A whole army of them begs to go into a herd of pigs instead of being sent away entirely, and Jesus lets them. Two thousand pigs run straight into the sea and drown.",
      "The locals come out and find the man sitting, clothed, and in his right mind, and it terrifies them worse than the wild man did. They beg Jesus to leave. He tells the man, go home to thy friends, and tell them how great things the Lord hath done for thee. The one person Jesus sends out on a preaching mission in this chapter is the one everybody else was afraid of.",
    ]),
    markFive(21, 43, [
      "Jairus, a ruler of the synagogue, a man with actual standing, falls at Jesus's feet in front of everyone. My little daughter lieth at the point of death. Come and lay thy hands on her. On the way, the crowd is so thick it is hard to move.",
      "A woman who has bled for twelve years, spent everything she had on doctors, and only gotten worse, comes up behind him and touches his garment, thinking, if I may touch but his clothes, I shall be whole. She is healed instantly. Jesus stops and asks who touched him, and his own disciples think the question is absurd in a crowd this size.",
      "She comes forward trembling and tells him the truth. He does not scold her for touching him unclean, which the law technically called her. He says, daughter, thy faith hath made thee whole; go in peace. While he is still speaking, word comes that Jairus's daughter is already dead. Why trouble the Master any further?",
      "Jesus ignores the message meant to send him home. Be not afraid, only believe. He takes only Peter, James, and John in, and to a house full of people weeping, he says the girl is not dead but sleeping, and they laugh at him. He takes her by the hand. Talitha cumi. Little girl, get up. And she does, at twelve years old, and he tells them, almost startlingly practical after a resurrection, to give her something to eat.",
    ]),
    markSix(1, 13, [
      "Jesus goes home to Nazareth and teaches in the synagogue, and the hometown crowd is not impressed. Is not this the carpenter, the son of Mary? They knew him before he was anybody, and they cannot get past it. And they were offended at him.",
      "A prophet is not without honour, but in his own country. Mark says plainly that he could do no mighty work there, save laying hands on a few sick people, and that he marvelled at their unbelief. Familiarity did what opposition elsewhere could not.",
      "So he sends the twelve out two by two with nothing. No bread, no money, no extra coat, just a staff and sandals. Whatever house receives you, stay there. Wherever you are not received, shake the dust off your feet and move on. He is teaching them to travel light and to let rejection be somebody else's problem, not theirs to fix.",
      "They go out preaching repentance, casting out devils, anointing the sick with oil and healing them. The men Nazareth would have recognized as nobody's sons are already doing what the town just refused to receive from Jesus himself.",
    ]),
    markSix(14, 29, [
      "Herod hears about Jesus and panics. Some say Elias, some say a prophet, but Herod says, it is John, whom I beheaded: he is risen from the dead. Mark then backs up and tells you exactly why that thought haunts him.",
      "Herod had married Herodias, his brother Philip's wife, and John had told him plainly, it is not lawful for thee to have thy brother's wife. Herodias wanted John dead for it, but Herod, oddly, feared John, knew he was righteous, and actually liked hearing him preach, even protected him.",
      "Then a birthday party, a dance from Herodias's daughter that pleases everyone, and a reckless oath made in front of guests, unto the half of my kingdom. Coached by her mother, the girl asks for John's head on a platter, right now.",
      "Herod is exceeding sorry, but will not lose face in front of his own guests. He sends an executioner, and John is beheaded in prison over an oath a king was too proud to break. A man who knew right from wrong, and killed the one who said it out loud anyway.",
    ]),
    markSix(30, 56, [
      "The apostles come back and report everything they did and taught. Jesus tells them, come ye yourselves apart into a desert place, and rest a while. They have not even had time to eat. But the crowds see them leaving and beat them there on foot.",
      "Jesus looks at them, moved with compassion, because they were as sheep not having a shepherd, and teaches them for hours. Late in the day the disciples want to send everyone away to buy food. Jesus says, give ye them to eat. Five loaves, two fish, and somewhere around five thousand men, not even counting women and children.",
      "He blesses it, breaks it, and it keeps going out through the disciples' hands until everyone is filled, with twelve baskets left over. Then that same night, he sends the disciples ahead by boat, goes up a mountain alone to pray, and later comes to them walking on the sea in a storm, planning, Mark says oddly, to pass them by.",
      "They think he is a ghost and cry out in fear. Be of good cheer: it is I; be not afraid. He climbs in, the wind stops, and they are amazed beyond measure, because, Mark says bluntly, they had not understood about the loaves; their heart was hardened. The same power that fed thousands was standing in the boat with them the whole time, and they still needed convincing.",
    ]),
    markSeven(1, 23, [
      "Pharisees and scribes from Jerusalem notice the disciples eating with unwashed hands and confront Jesus about breaking the tradition of the elders, a whole system of ritual washing that had grown up alongside the actual law of Moses.",
      "Jesus quotes Isaiah at them. This people honoureth me with their lips, but their heart is far from me. In vain do they worship me, teaching for doctrines the commandments of men. Then he gives a specific example, Corban, where a man could declare his money off-limits to his own aging parents by calling it a gift devoted to God, and the tradition let him get away with dishonoring his father and mother while looking pious about it.",
      "Then to the whole crowd, plainly: there is nothing from without a man that entering into him can defile him, but the things which come out of him, those defile the man. Food goes into the stomach, not the heart, and comes out the other end. It was never the real danger.",
      "Alone with his disciples he spells out the list. Out of the heart of men proceed evil thoughts, adulteries, fornications, murders, thefts, covetousness, wickedness, deceit, an evil eye, pride, foolishness. All these evil things come from within, and defile the man. The problem was never on his hands. It was always further in.",
    ]),
    markSeven(24, 37, [
      "Jesus goes into Gentile territory near Tyre and Sidon, trying not to be noticed, and cannot manage it. A Greek woman, a Syrophenician, falls at his feet and begs him to free her daughter from an unclean spirit.",
      "Jesus answers her strangely, almost harshly: let the children first be filled, for it is not meet to take the children's bread and cast it to the dogs. She does not flinch or walk away insulted. Yes, Lord, yet the dogs under the table eat of the children's crumbs. She takes his own hard image and turns it into an argument for herself.",
      "For this saying, go thy way, the devil is gone out of thy daughter. She goes home and finds her daughter healed, delivered by a word spoken to a mother who never even brought the girl along. Her answer, not her nationality or her standing, is what he responds to.",
      "Back near Galilee, people bring him a man who is deaf and can barely speak. Jesus takes him aside privately, puts his fingers in the man's ears, touches his tongue, sighs, and says, Ephphatha, be opened. Immediately he hears clearly and speaks plainly. The crowd, told to keep quiet, cannot stop talking about it. He hath done all things well.",
    ]),
  ],
  closing: [
    ["So that is Day 290.", 700],
    ["A man so violent nobody could hold him, sent home clothed and sane to tell his own story.", 750],
    ["A ruler's daughter and a bleeding woman, both called daughter by the same man in the same afternoon.", 800],
    ["A king who knew right from wrong and killed the man who said it, because an oath at a party mattered more to him than the truth.", 850],
    ["Five loaves fed thousands, and the same hands walked on water that same night, and the disciples still needed convincing.", 850],
    ["Then the fight over hand washing turns out to be about something much deeper than hands.", 800],
    ["It was never what went in. It was always what was already in there, waiting to come out.", 850],
    ["Tomorrow, Mark 8 through 10. Jesus asks who they say he is, and starts telling them plainly what is coming.", 850],
    ["For now, sit with the crumbs under the table.", 800],
    ["That was enough.", 1200],
  ],
};
