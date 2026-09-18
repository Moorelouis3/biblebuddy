import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 295, written to the Day 1 standard.
 *
 * Luke 4-6 moves fast: temptation in the wilderness, a hometown that tries
 * to kill him for the first sermon he ever preaches there, a fishing boat
 * full of nets about to burst, and then a full stretch of ethics that undoes
 * almost every assumption about who wins in the kingdom of God. Seven
 * blocks across Luke 4, 5, and 6.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Luke ${chapter}:${startVerse}-${endVerse}`,
  book: "luke",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 295,
  title: "Jesus' Mission and Kingdom Ethics",
  opening: [
    ["Hey. Glad you're back.", 750],
    ["Day 295. Jesus just got baptized. Now the Spirit sends him straight into the desert to be tempted.", 800],
    ["He survives that, walks into his hometown synagogue, reads a promise about himself out loud, and the town tries to throw him off a cliff.", 850],
    ["Then he calls fishermen away from a record catch, touches a man nobody else would touch, and starts teaching things that turn winning upside down.", 850],
    ["Blessed are the poor. Woe to the rich. Love your enemies. Not exactly a campaign speech.", 850],
    ["We are in Luke 4, 5, and 6. Wilderness, water, and a whole new definition of blessed.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(4, 1, 13, [
      "Full of the Holy Ghost, straight from his baptism, Jesus is led into the wilderness and tempted by the devil for forty days, eating nothing, until he is genuinely hungry.",
      "Three offers, three refusals. Turn stone to bread and prove it. It is written, man shall not live by bread alone. Bow to me and rule the world without the cross. It is written, worship the Lord thy God, and him only shalt thou serve.",
      "Then the devil even quotes Scripture back at him. Throw yourself down, the angels will catch you. Jesus answers, it is said, thou shalt not tempt the Lord thy God. Every answer is Scripture, not a clever comeback of his own.",
      "The devil departs from him for a season. Not forever. This fight is not over, it is just the first round, and Jesus wins it starving, alone, with nothing but the word of God.",
    ]),
    g(4, 14, 44, [
      "In Nazareth, his hometown, he stands up in the synagogue and reads from Isaiah: the Spirit of the Lord is upon me, to preach good news to the poor, to heal the brokenhearted, to set the captives free. He sits down and says, this day is this scripture fulfilled in your ears.",
      "At first they are amazed. Then someone says, is not this Joseph's son? and the mood turns fast. Jesus tells them no prophet is welcome in his own country, and reminds them God once sent Elijah and Elisha to help outsiders, not Israelites. That is what finally enrages them.",
      "They drive him out of the city to the edge of a cliff to throw him down. He simply walks through the middle of the crowd and goes on his way. His own town could not touch him when it wanted to.",
      "In Capernaum he casts an unclean spirit out of a man with a word, heals Simon's mother-in-law of a fever, and by sunset the whole town is bringing him their sick. When they beg him to stay, he says, I must preach the kingdom of God to other cities also. He did not come to settle down in one place, even a place that wanted him.",
    ]),
    g(5, 1, 26, [
      "Simon has fished all night and caught nothing. Jesus tells him to launch out into the deep anyway, and the net fills so full it starts to break. Simon falls at his knees. Depart from me, for I am a sinful man, O Lord.",
      "Jesus does not depart. Fear not, from henceforth thou shalt catch men. Simon, James, and John pull their boats to shore, leave the biggest catch of their careers sitting there, and follow him.",
      "A man full of leprosy, someone nobody was supposed to touch, falls on his face. Lord, if thou wilt, thou canst make me clean. Jesus puts out his hand and touches him. I will. Be thou clean. Contact, not just a command from a safe distance.",
      "Friends dig through a roof to lower a paralyzed man in front of him. Jesus says, thy sins are forgiven thee, which scandalizes the religious leaders watching. So he heals the man's legs too, plainly, so that ye may know the Son of man hath power on earth to forgive sins.",
    ]),
    g(5, 27, 39, [
      "Jesus sees a tax collector named Levi at his booth and says two words. Follow me. Levi leaves everything, gets up, and follows him, no hesitation recorded.",
      "Then Levi throws a great feast in his own house, full of publicans and people the religious crowd would never eat with. When they complain, Jesus says, they that are whole need not a physician, but they that are sick. I came not to call the righteous, but sinners to repentance.",
      "Someone asks why John's disciples fast and pray so much while Jesus' disciples eat and drink. Can the children of the bridechamber fast while the bridegroom is still with them? He is telling them, without saying it plainly yet, that something has arrived that changes the old rhythms.",
      "Then two quick pictures. New cloth does not patch an old garment. New wine does not go in old wineskins, or it bursts them. Whatever he is building is not a repair job on the old system. It needs its own container.",
    ]),
    g(6, 1, 19, [
      "Jesus' disciples pick grain on the sabbath, and the Pharisees call it unlawful. He points to David eating consecrated bread when he was hungry and tells them plainly, the Son of man is Lord also of the sabbath.",
      "On another sabbath a man with a withered hand is watched closely to see if Jesus will heal him. Jesus asks straight out, is it lawful to do good on the sabbath, or to do evil? Then he heals the hand in front of everyone, and it fills the religious leaders with madness.",
      "He spends a whole night on a mountain in prayer before choosing his twelve apostles, Peter and the rest, including Judas Iscariot, named right there alongside everyone else, before he does anything.",
      "Coming down to level ground, a great crowd presses in to hear him and be healed. Virtue goes out of him and heals them all. Everything that follows is spoken to people who just watched him heal a crowd, not a comfortable audience listening for entertainment.",
    ]),
    g(6, 20, 26, [
      "Jesus looks straight at his disciples and says, blessed are ye poor, for yours is the kingdom of God. Blessed are ye that hunger now, for ye shall be filled. Blessed are ye that weep now, for ye shall laugh.",
      "Blessed are ye when men hate you and cast out your name as evil for my sake. Rejoice in that day and leap for joy, your reward is great in heaven.",
      "Then he flips it. Woe unto you that are rich, for ye have received your consolation already. Woe unto you that are full, for ye shall hunger. Woe unto you that laugh now, for ye shall mourn and weep.",
      "Woe unto you when all men speak well of you, for that is exactly how their fathers treated the false prophets. Comfort now and applause now are not the signs he is pointing people toward.",
    ]),
    g(6, 27, 49, [
      "Love your enemies, do good to them that hate you, bless them that curse you, pray for them that use you badly. Turn the other cheek. Give to everyone who asks. Do to others as you would want done to you, whether or not they ever return it.",
      "Judge not, and ye shall not be judged. Condemn not, and ye shall not be condemned. Forgive, and ye shall be forgiven. With the same measure you use on other people, it will be measured back to you.",
      "Can the blind lead the blind? Why do you look at the speck in your brother's eye and miss the beam in your own? Deal with your own blindness before you try to fix someone else's eyesight.",
      "A good tree does not bear bad fruit, and a bad tree does not bear good fruit. You know a tree by what actually grows on it. Then the close: build your life on hearing his words and doing them, and you are the house on rock that stands when the flood comes. Hear them and not do them, and the flood takes the whole house down.",
    ]),
  ],
  closing: [
    ["So that is Day 295.", 700],
    ["A wilderness where he refused every shortcut, and a hometown that tried to kill him for the first thing he ever preached there.", 800],
    ["Fishermen who left the best catch of their lives sitting on the shore because he said follow me.", 800],
    ["A leper he actually touched. A paralyzed man he forgave before he healed.", 800],
    ["And then a whole list of blessings that has nothing to do with money, comfort, or being liked.", 850],
    ["Blessed are the poor. Woe to the rich. Love the people who hate you. Build on rock, not sand.", 850],
    ["Tomorrow, Luke 7 through 9. A centurion's faith surprises even Jesus, and the crowds start multiplying loaves and questions at the same time.", 850],
    ["For now, sit with the house on the rock.", 750],
    ["Not the one who just hears it.", 750],
    ["The one who does it.", 1200],
  ],
};
