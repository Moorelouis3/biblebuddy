import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 289, written to the Day 1 standard.
 *
 * Jesus is back to work after the resurrection narrative closed Matthew,
 * and it makes people furious: he forgives sins out loud, eats with the
 * wrong crowd, and heals on the sabbath. Then a parable about seed and a
 * storm on the sea. Six blocks across Mark 2, 3, and 4.
 */

const markTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 2:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const markThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 3:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const markFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 4:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 289,
  title: "Authority, Conflict, and Parables",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 289.", 700],
    ["Yesterday the tomb was empty. Today Jesus is back to work, and it makes people furious.", 850],
    ["He forgives sins out loud, eats with the wrong crowd, and heals on the one day religious leaders say he is not allowed to.", 850],
    ["Then he tells a room full of people a story about seed, and lets a boat full of terrified friends find out exactly who he is.", 850],
    ["We are in Mark 2, 3, and 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    markTwo(1, 17, [
      "Jesus is back in Capernaum, and the house is so packed that four men carrying a paralyzed friend cannot even get through the door. So they climb onto the roof, dig through it, and lower the man down on his mat, right in front of Jesus.",
      "Jesus sees their faith, not the paralyzed man's, and says, Son, thy sins be forgiven thee. The scribes think it in their hearts: who can forgive sins but God only? Jesus answers a question nobody said out loud. Which is easier to say, thy sins be forgiven, or rise, take up thy bed, and walk? Then he does the harder one to prove he can do the first.",
      "The man gets up immediately, picks up his own mat, and walks out in front of everyone. The crowd says, we never saw it on this fashion. Four friends tore a hole in a roof because they believed getting him to Jesus mattered more than doing it politely.",
      "Walking by the tax booth, Jesus tells Levi, follow me, and Levi gets up and follows, no questions asked. Then Jesus eats dinner at Levi's house with a room full of tax collectors and sinners. Scribes ask the disciples why. Jesus answers for himself. They that are whole have no need of the physician, but they that are sick. I came not to call the righteous, but sinners to repentance.",
    ]),
    markTwo(18, 28, [
      "People ask why John's disciples and the Pharisees fast, but Jesus's disciples do not. He answers with a wedding, not a rulebook. Can the children of the bridechamber fast while the bridegroom is with them? He is telling them plainly that he will not always be there, and that changes everything about the timing.",
      "New cloth on an old garment tears it worse. New wine in old wineskins bursts them. Jesus is not offering an upgrade to what already exists. He is saying something genuinely new has arrived, and it needs its own container.",
      "His disciples pick grain in a field on the sabbath, and the Pharisees call it unlawful. Jesus points to David eating the consecrated showbread when he and his men were hungry, bread only priests were allowed to touch.",
      "The sabbath was made for man, and not man for the sabbath, he says. Therefore the Son of man is Lord also of the sabbath. He is not loosening the rule. He is telling them who made it, and why.",
    ]),
    markThree(1, 19, [
      "In the synagogue again, a man is there with a withered hand, and the Pharisees watch to see if Jesus will heal on the sabbath so they can accuse him. Jesus asks the room: is it lawful to do good on the sabbath, or to do evil, to save life, or to kill? Nobody answers.",
      "He looks around at them with anger, grieved at the hardness of their hearts, and tells the man, stretch forth thine hand. It is restored on the spot. The Pharisees leave and immediately start plotting with people they normally despise, just to get rid of him.",
      "Crowds come from everywhere, Galilee, Judaea, Jerusalem, even Tyre and Sidon, and unclean spirits fall down in front of him shouting, thou art the Son of God. He tells them to keep quiet. He does not want that kind of testimony.",
      "He goes up a mountain and calls twelve to be with him and to be sent out to preach and heal. Simon, renamed Peter. James and John, nicknamed sons of thunder. And at the very end of the list, Judas Iscariot, who also betrayed him. Mark names his betrayer at the moment of his calling, not the moment of his crime.",
    ]),
    markThree(20, 35, [
      "The crowd gets so thick that Jesus and the disciples cannot even eat. His own family hears about it and goes out to restrain him, saying, he is beside himself. His own household thinks he has lost his mind.",
      "Scribes from Jerusalem go further. He hath Beelzebub, and by the prince of the devils casteth he out devils. Jesus answers with plain logic. How can Satan cast out Satan? A kingdom divided against itself cannot stand. If he were doing this by the devil's power, the devil would be sabotaging himself.",
      "Then he says something that stops people cold. All sins shall be forgiven the sons of men, but he that shall blaspheme against the Holy Ghost hath never forgiveness. Mark tells you exactly why he said it. Because they had said he had an unclean spirit. Calling the Spirit's clear work the devil's work is refusing the only door out.",
      "His mother and brothers arrive and send word in. He looks at the people sitting around him and says, behold my mother and my brethren. Whosoever shall do the will of God, the same is my brother, and my sister, and mother. He is not rejecting his family. He is telling everyone in that room they can belong to his.",
    ]),
    markFour(1, 34, [
      "He teaches a huge crowd from a boat, and tells them about a farmer scattering seed. Some falls on the path and birds eat it. Some on rocky ground, springs up fast, has no root, and scorches in the sun. Some among thorns, and the thorns choke it out. And some on good ground, and it produces thirty, sixty, even a hundred times what was sown.",
      "Later, alone with the twelve, he explains it plainly. The seed is the word. The path is someone who hears it and Satan snatches it away before it can do anything. The rocky ground is someone who receives it gladly but has no root, and folds the moment trouble comes for believing it.",
      "The thorny ground is someone choked by the cares of this life, the pull of money, and the wanting of other things, until the word gets crowded out and produces nothing. The good ground is the one who actually hears it, receives it, and it bears fruit. Same seed, same sower. The difference is entirely in the ground.",
      "Then he adds two short ones. A man scatters seed and sleeps; it grows while he does nothing to make it grow, and one day it is ready and he reaps it. And a mustard seed, the smallest seed there is, grows into a plant big enough for birds to nest in its branches. Small, hidden, quiet growth is still growth, on God's timetable, not the farmer's.",
    ]),
    markFour(35, 41, [
      "That evening he tells the disciples, let us pass over to the other side, and they take him in the boat exactly as he is, tired, and he falls asleep on a cushion in the stern. A furious storm comes up, waves breaking over the sides, the boat filling with water, and he is still asleep.",
      "They wake him, half accusing him. Master, carest thou not that we perish? He gets up, speaks two words to the sea, peace, be still, and the wind stops and the water goes flat. Not gradually. Immediately.",
      "Then he turns the question back on them. Why are ye so fearful? how is it that ye have no faith? These are professional fishermen, and they know exactly how dangerous that storm was. Their fear was not irrational. It was just aimed at the wrong thing.",
      "They end the day more afraid of him than they were of the storm. What manner of man is this, that even the wind and the sea obey him? A God who can be talked to in a boat and a God who can command the weather turn out to be the same person, asleep on a cushion a minute earlier.",
    ]),
  ],
  closing: [
    ["So that is Day 289.", 700],
    ["A hole torn in a roof. A tax collector who left his booth without a word of argument. A man with a withered hand healed just to prove a point that needed proving.", 800],
    ["Every fight in these chapters is really the same fight. Who gets to define what mercy, sabbath, and family actually mean.", 800],
    ["Jesus keeps giving the same answer. Not the rule as they had shrunk it. The person the rule was for.", 800],
    ["Then he sits in a boat and tells a story about seed that lands or does not land, depending entirely on the ground it falls on.", 850],
    ["And that night, in the middle of a storm big enough to frighten men who fished for a living, he says two words and the sea goes flat.", 850],
    ["Tomorrow, Mark 5 through 7. A legion of demons, a dead girl, and a debate about what actually makes a person clean.", 850],
    ["For now, sit with the ground, not the seed.", 800],
    ["The seed never changed.", 750],
    ["The ground did.", 1200],
  ],
};
