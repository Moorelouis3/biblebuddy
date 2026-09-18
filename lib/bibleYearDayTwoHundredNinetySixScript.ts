import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 296, written to the Day 1 standard.
 *
 * Luke 7-9 is Jesus proving what he just preached: a centurion out-believes
 * Israel, a widow gets her son back unasked, a sinful woman is forgiven in
 * front of the men who despise her, a legion of demons ends up in a herd of
 * pigs, a dead girl gets up, five thousand get fed, and Peter finally names
 * him. Seven blocks across Luke 7, 8, and 9.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Luke ${chapter}:${startVerse}-${endVerse}`,
  book: "luke",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 296,
  title: "Mercy, Miracles, and Discipleship",
  opening: [
    ["Hey. Good to have you back.", 750],
    ["Day 296. Yesterday ended with a sermon that turned the world upside down. Today Jesus starts proving it.", 800],
    ["A Roman soldier out-believes all of Israel. A widow gets her only son back at his own funeral. A sinful woman washes his feet with her own tears.", 850],
    ["Then a storm, a man possessed by an army of demons, a dying girl, and five thousand people fed from one boy's lunch.", 850],
    ["By the end of it, Peter finally says the words. You are the Christ of God. And Jesus tells him exactly what that is going to cost.", 850],
    ["We are in Luke 7, 8, and 9. Mercy piling up so fast it is hard to keep count.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(7, 1, 17, [
      "A Roman centurion has a servant he loves, dying. He does not come himself. He sends Jewish elders, then friends, with a message: do not trouble yourself, just say the word and my servant will be healed. He knows how authority works. Say it, and it happens.",
      "Jesus stops in his tracks and marvels. He turns to the crowd following him and says he has not found faith like this, not even in Israel. The most surprising person in the story is the one with the least religious pedigree.",
      "Right after, at the gate of a town called Nain, Jesus meets a funeral. A widow, burying her only son. She does not ask him for anything. He just sees her, has compassion, and says, weep not.",
      "He touches the coffin, and the men carrying it stop cold. Young man, I say unto thee, arise. The dead son sits up and starts talking. Jesus did not wait to be asked. He looked at grief and ended it.",
    ]),
    g(7, 18, 35, [
      "John the Baptist is sitting in prison, and doubt creeps in even for him. He sends two disciples to ask Jesus straight out: are you the one, or do we wait for someone else? Even the man who pointed at Jesus as the Lamb of God can have a dark night.",
      "Jesus does not rebuke him for asking. He just does the works in front of John's messengers, then says, go tell John what you have seen. Blind eyes open. Lame men walk. Lepers are clean. The dead get up. That is the answer. Not a speech, a demonstration.",
      "Then he defends John to the crowd. Not a reed blown around by the wind. Not a man in soft clothes living in a palace. A prophet, and more than a prophet. Among all born of women, no one greater has stood, and yet the least in the kingdom of God is greater than he.",
      "Then he calls out the whole generation. John fasted, and they said he had a devil. Jesus eats and drinks, and they call him a glutton and a drunk. Nothing satisfies people who have already decided not to listen, like children in the marketplace who will not dance to the flute or weep at the dirge, whatever tune gets played.",
    ]),
    g(7, 36, 50, [
      "Simon the Pharisee invites Jesus to dinner, and a woman known in that town as a sinner walks in uninvited. She stands behind him weeping, washes his feet with her tears, dries them with her own hair, kisses them, and pours out expensive ointment.",
      "Simon says it to himself, not out loud: if this man were really a prophet he would know what kind of woman is touching him. Jesus hears the thought anyway and tells a short story. Two men owe money, one a lot, one a little. Both get forgiven for free. Which one loves the creditor more?",
      "The one forgiven more, Simon says. Exactly right. Then Jesus finally turns and looks at her. You gave me no water for my feet. She washed them with tears. You gave me no kiss. She has not stopped kissing my feet since she walked in. You gave me no oil for my head. She anointed my feet with ointment.",
      "Her sins, which are many, are forgiven, for she loved much. Then, straight to her: thy sins are forgiven. Thy faith hath saved thee. Go in peace. Simon offered a meal. She offered everything she had left.",
    ]),
    g(8, 1, 25, [
      "Women travel with Jesus now, and Luke names them: Mary Magdalene, freed from seven devils, Joanna, wife of Herod's own steward, Susanna, and others, funding this entire ministry out of their own money. That is not a footnote. That is who kept it running.",
      "He tells the parable of the sower, seed on the path, on rock, among thorns, on good ground, then explains it plainly. The seed is the word of God. What kills it is the devil snatching it away, no root under pressure, or the cares and riches and pleasures of life slowly choking it out.",
      "When his mother and brothers cannot reach him through the crowd, he says something that redraws the whole family line. My mother and my brothers are the ones who hear the word of God and do it. Blood does not define this family. Obedience does.",
      "Out on the lake, a storm hits while he is asleep. The disciples wake him in a panic, master, master, we perish. He rebukes the wind and the waves and it goes still, then asks them, where is your faith? They end up more shaken by who just did that than by the storm itself.",
    ]),
    g(8, 26, 56, [
      "They land in Gadarene country and a naked man living among the tombs runs at Jesus, screaming, begging not to be tormented. His name is Legion, because many devils live in him. They beg to enter a herd of pigs instead of the pit, and he lets them. Every pig runs into the lake and drowns.",
      "The man who used to break his own chains is now clothed, sane, and sitting at Jesus' feet. The town's response is not gratitude. They are afraid, and they ask Jesus to leave. He tells the man to stay and tell his own house what God has done for him, instead of following him around.",
      "Back on the other shore, Jairus, a synagogue ruler, begs him to come save his dying daughter. On the way, a woman who has bled for twelve years, who has spent everything on doctors, touches the edge of his robe and is instantly healed. Jesus stops and asks who touched him.",
      "She comes forward trembling and tells the truth in front of everyone. He calls her daughter, tells her to go in peace. Then word comes that Jairus's girl has already died, do not trouble the teacher. Jesus says only, fear not, believe only, and she shall be made whole. He takes her hand. She gets up.",
    ]),
    g(9, 1, 36, [
      "Jesus sends the twelve out with power over demons and disease and tells them to travel light, no staff, no bag, no bread, no money, not even a spare coat. If a town will not receive them, shake its dust off your feet and move on. Herod hears the reports and gets nervous, wondering if this is John the Baptist back from the dead, the same John he beheaded.",
      "Five thousand men, plus women and children, follow Jesus into a deserted place, and by evening there is nothing to feed them but five loaves and two fish. He has them sit in groups of fifty, blesses the food, and it does not run out until everyone is full and twelve baskets are left over.",
      "Alone with the disciples, he asks who people say he is, John the Baptist, Elijah, an old prophet come back. Then the real question. Who do you say I am? Peter answers, the Christ of God. Jesus immediately tells them what that actually means, suffering, rejection, death, rising on the third day, and that anyone who follows him takes up a cross daily too.",
      "Eight days later, on a mountain, his face changes and his clothes go bright white while he prays. Moses and Elijah appear, talking with him about his coming death in Jerusalem. Peter, half asleep, offers to build three shelters. A cloud covers them, and a voice says, this is my beloved Son, hear him. Then it is just Jesus again, same as always.",
    ]),
    g(9, 37, 62, [
      "Coming down the mountain, a man begs Jesus to look at his only son, thrown into convulsions by a spirit the disciples could not cast out. Jesus calls the generation faithless and perverse, then heals the boy on the spot and hands him back to his father. Quietly, he tells them again, I am going to be betrayed. They do not understand, and they are afraid to ask.",
      "While that sinks in, the disciples are arguing about which of them is the greatest. Jesus takes a small child, sets him beside himself, and says whoever receives a child like this in my name receives me. The measure of greatness here runs exactly backwards from everywhere else.",
      "John reports proudly that they stopped a man casting out devils in Jesus' name, because he was not part of their group. Jesus corrects him. Forbid him not. Whoever is not against you is for you. Then, heading toward Jerusalem, a Samaritan village refuses to welcome him, and James and John want to call fire down from heaven. He just turns and rebukes them.",
      "Three people offer to follow him. He tells the first, foxes have holes, birds have nests, the Son of man has nowhere to lay his head. He tells the second, who wants to bury his father first, let the dead bury their dead, go preach the kingdom. He tells the third, who wants to say goodbye at home, no one who looks back after putting a hand to the plow is fit for the kingdom of God.",
    ]),
  ],
  closing: [
    ["So that is Day 296.", 700],
    ["A centurion who never even met Jesus face to face, and had more faith than anyone in Israel.", 800],
    ["A widow who did not ask for anything, and got her son back anyway.", 750],
    ["A woman with a reputation nobody would defend, forgiven and sent away in peace.", 800],
    ["Legion, screaming and chained, sitting calm and clothed at Jesus' feet by the end of the chapter.", 800],
    ["Five thousand fed, a dying girl raised, and Peter finally naming who Jesus really is.", 800],
    ["Tomorrow, Luke 10 through 12. A lawyer asks who his neighbor is, and Jesus answers with a story about a Samaritan.", 850],
    ["For now, sit with what Jesus told that grieving widow.", 750],
    ["Weep not.", 750],
    ["He said it before he did anything about it.", 1200],
  ],
};
