import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 291, written to the Day 1 standard.
 *
 * Three times in these chapters Jesus tells his disciples plainly that he is
 * going to die, and three times they miss it, arguing about bread, greatness,
 * and thrones instead. It ends with a blind man who sees exactly who Jesus is
 * and follows him "in the way." Seven blocks across Mark 8, 9, and 10.
 */

const markEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 8:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 8,
  startVerse,
  endVerse,
  teaching,
});

const markNine = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 9:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 9,
  startVerse,
  endVerse,
  teaching,
});

const markTen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 10:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 10,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 291,
  title: "The Way of the Cross",
  opening: [
    ["Hey. Good to see you.", 700],
    ["Day 291.", 700],
    ["Three separate times in today's reading, Jesus tells his friends plainly that he is going to be killed.", 800],
    ["And three separate times, they miss it completely, arguing about bread, about who is the greatest, about who gets the best seat.", 850],
    ["It ends with a blind beggar on the side of the road who understands more than any of them.", 800],
    ["We are in Mark 8, 9, and 10.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    markEight(1, 21, [
      "A crowd of four thousand has been with Jesus three days with nothing to eat, and he will not send them away hungry. Seven loaves and a few small fish become enough, with seven baskets left over. This is the second time Mark has shown you exactly this miracle.",
      "Pharisees show up right after and ask for a sign from heaven, as if the feeding of four thousand people were not one. Jesus sighs deeply in his spirit. There shall no sign be given unto this generation. Some kinds of proof are never going to be enough for people who have already decided not to believe.",
      "Back in the boat, the disciples realize they forgot to bring bread, and Jesus warns them, beware of the leaven of the Pharisees, and of the leaven of Herod. They think he is talking about their lunch. It is because we have no bread.",
      "Jesus gets almost exasperated. Perceive ye not yet? Do ye not remember? He makes them recount both feedings out loud, twelve baskets, then seven, then asks, how is it that ye do not understand? They have watched him multiply bread twice and are still worried about groceries.",
    ]),
    markEight(22, 38, [
      "At Bethsaida a blind man is brought to Jesus, and the healing happens in two stages, almost unique in the Gospels. First he sees men as trees, walking. Then Jesus touches his eyes again, and he sees every man clearly. Sight, for once, arrives gradually instead of all at once.",
      "On the road to Caesarea Philippi, Jesus asks the question the whole book has been building toward. Whom do men say that I am? Then, sharper: but whom say ye that I am? Peter answers for all of them. Thou art the Christ.",
      "Immediately Jesus tells them plainly what that actually means. The Son of man must suffer many things, be rejected, be killed, and after three days rise again. Peter, who just got the answer right, pulls him aside to rebuke him for it. Jesus turns and rebukes Peter in front of everyone. Get thee behind me, Satan. Right belief and wrong expectations can live in the same sentence.",
      "Then to the whole crowd, not just the twelve: whosoever will come after me, let him deny himself, and take up his cross, and follow me. What shall it profit a man, if he shall gain the whole world, and lose his own soul? Following him was never going to look like winning by any ordinary measure.",
    ]),
    markNine(1, 13, [
      "Six days later, Peter, James, and John go up a mountain with Jesus, and he is transfigured in front of them, his clothes whiter than anything on earth could bleach them. Elias and Moses appear, talking with him, the law and the prophets standing beside the one they had pointed toward all along.",
      "Peter, terrified and not knowing what to say, offers to build three tabernacles, treating the moment like something to preserve rather than witness. A cloud overshadows them and a voice speaks: this is my beloved Son: hear him. Then suddenly it is over, and they see no man any more, save Jesus only.",
      "Coming down, Jesus tells them to say nothing until the Son of man is risen from the dead, and they keep the saying to themselves, questioning what rising from the dead could even mean. They just watched him glow like the sun and still cannot picture what resurrection looks like.",
      "They ask about Elias coming first, and Jesus tells them Elias has already come, meaning John the Baptist, and they did to him whatever they wanted, exactly as it was written. The suffering was never a surprise buried in the fine print. It was written the whole time.",
    ]),
    markNine(14, 32, [
      "They come down to a crowd and an argument already underway. A father has brought his son, tormented since childhood by a spirit that throws him into fire and water to destroy him, and the disciples could not cast it out. O faithless generation, how long shall I suffer you? Bring him unto me.",
      "The father, watching his son convulse on the ground, gives the most honest prayer in the Gospels. Lord, I believe; help thou mine unbelief. He does not pretend to have certainty he does not have. He just brings what he actually has and asks for the rest.",
      "Jesus commands the spirit out, and the boy goes so still that people think he is dead, until Jesus takes him by the hand and lifts him up. Privately the disciples ask why they could not do it. This kind can come forth by nothing, but by prayer and fasting. Some battles are not won by technique.",
      "Passing through Galilee, Jesus tells them again, plainly, that he will be delivered into the hands of men, killed, and rise the third day. They do not understand, and Mark adds a detail that says everything: they were afraid to ask him. Not confused enough to ask. Afraid of the answer.",
    ]),
    markNine(33, 50, [
      "In Capernaum, Jesus asks what they had been arguing about on the road. Silence, because they had been debating who among them was the greatest. He has just told them a second time that he is going to die, and they are ranking themselves.",
      "He sits down, calls the twelve, and says, if any man desire to be first, the same shall be last of all, and servant of all. Then he takes a child in his arms. Whosoever shall receive one of such children in my name, receiveth me. In that world, a child had no status to offer back. That was the whole point of picking one up.",
      "John reports that they stopped a man casting out devils in Jesus's name because he was not part of their group. Forbid him not, Jesus says, for he that is not against us is on our part. Then a hard warning: whoever causes one of these little ones to stumble would be better off drowned with a millstone around his neck.",
      "If thy hand offend thee, cut it off, he says, and repeats it for the foot and the eye, using the body's most useful parts to make the same point three times. Whatever costs you your soul is not worth keeping, however useful it looks. Have salt in yourselves, and have peace one with another.",
    ]),
    markTen(1, 31, [
      "Pharisees test him with a question about divorce, and Jesus goes past Moses's concession to what God intended at creation. From the beginning, male and female, one flesh. What God hath joined together, let not man put asunder. He answers a legal question by pointing back past the law to the original design.",
      "People bring children for him to touch, and the disciples turn them away. Jesus is much displeased. Suffer the little children to come unto me. Whosoever shall not receive the kingdom of God as a little child, he shall not enter therein. Twice now in two chapters, a child has been the picture of what he actually wants.",
      "A rich man runs up and kneels, asking what he must do to inherit eternal life. He has kept the commandments since his youth. Jesus, beholding him, loved him, and gives him the one thing he actually cannot do. Sell what thou hast, give to the poor, and follow me. He goes away grieved, because he had great possessions.",
      "How hardly shall they that have riches enter into the kingdom of God! Easier for a camel to pass through a needle's eye. The disciples, astonished, ask who then can be saved. With men it is impossible, but not with God. Peter points out that they have left everything, and Jesus promises it is never wasted, though it comes with persecutions attached, not around them.",
    ]),
    markTen(32, 52, [
      "Going up to Jerusalem, Jesus walks ahead of them, and the disciples following behind are amazed and afraid, sensing something without being told what. He tells them a third time, in the most detail yet. Delivered to the chief priests, condemned, handed to the Gentiles, mocked, spit on, scourged, killed, and risen on the third day.",
      "Right after that, James and John ask for the best seats in his glory, one on his right hand and one on his left. Ye know not what ye ask. Can ye drink of the cup that I drink of? He has just described his own execution in detail, and the very next request is for status.",
      "The other ten are angry, not because the request was wrong to want but because they wanted it too. Jesus calls them together. Whosoever will be great among you shall be your minister. The Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many. That line is the whole chapter, spoken by the one about to prove it.",
      "At Jericho, blind Bartimaeus hears Jesus is passing and shouts, Jesus, thou Son of David, have mercy on me, louder every time the crowd tells him to be quiet. Jesus stops. What wilt thou that I should do unto thee? Lord, that I might receive my sight. Thy faith hath made thee whole. He receives his sight, and immediately follows Jesus in the way. After three predictions nobody wanted to hear, a blind man is the one who actually gets on the road behind him.",
    ]),
  ],
  closing: [
    ["So that is Day 291.", 700],
    ["Three times Jesus said it plainly. I am going to suffer. I am going to be killed. I am going to rise.", 800],
    ["Three times the men closest to him missed it, arguing about bread, about rank, about which side of the throne.", 800],
    ["He never hid the cost from them. They just kept reaching for something easier to hear.", 800],
    ["And the one person in these chapters who actually understands what following him looks like is a blind beggar nobody wanted to let speak.", 850],
    ["He asked for mercy, got his sight, and used it to walk toward Jerusalem, not away from it.", 850],
    ["Tomorrow, Mark 11 through 13. Jesus enters Jerusalem, and the temple becomes the center of the fight.", 850],
    ["For now, sit with Bartimaeus.", 800],
    ["He saw exactly where the road led.", 800],
    ["And he followed anyway.", 1200],
  ],
};
