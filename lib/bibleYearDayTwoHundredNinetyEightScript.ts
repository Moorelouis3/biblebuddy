import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 298, written to the Day 1 standard.
 *
 * Luke 13-15 is a three-chapter reading built around things almost given up
 * on: a barren fig tree, a bent woman, a shut door, a full house of
 * uninvited guests, a lost sheep, a lost coin, and a lost son. Seven blocks
 * across the three chapters, ending on the prodigal son as its own block
 * since the parable earns the room.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Luke ${chapter}:${startVerse}-${endVerse}`,
  book: "luke",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 298,
  title: "Repentance, Lost Things, and Grace",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 298. Three chapters, and each one turns on someone who almost gets written off.", 800],
    ["A fig tree with no fruit for three years. A wedding guest who picks the best seat and gets moved down in front of everyone.", 850],
    ["A son who takes his inheritance early, wastes all of it, and ends up jealous of what the pigs get to eat.", 850],
    ["And in every one of these, somebody argues for more time, more room, more mercy than the moment seems to deserve.", 850],
    ["We end in the same place three times. A shepherd who will not stop looking. A woman who will not stop sweeping. A father who runs.", 850],
    ["We are in Luke 13, 14, and 15.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(13, 1, 9, [
      "Some people tell Jesus that Pilate killed a group of Galileans while they were offering sacrifices, mixing their blood with the blood of the animals. Jesus does not take the political bait. He asks if they think those Galileans were worse sinners than every other Galilean because of what happened to them. No, he says. But except ye repent, ye shall all likewise perish.",
      "He brings up a tower in Siloam that fell and killed eighteen people. Same question, same answer. Not because they owed more than anyone else standing there. Everyone owes the same debt.",
      "Then a story. A man has a fig tree planted in his vineyard. Three years running he has come looking for fruit and found none. Cut it down, he tells the gardener. Why let it use up the ground.",
      "The gardener asks for one more year. Let me dig around it, let me feed it. If it bears fruit after that, good. If not, then cut it down. That is where the chapter starts: your time is not endless, but it is not over yet either.",
    ]),
    g(13, 10, 21, [
      "Jesus is teaching in a synagogue on the sabbath when he sees a woman bent double, unable to straighten up at all, eighteen years like this. He calls her over, tells her she is loosed from her infirmity, and lays his hands on her. Immediately she stands up straight, glorifying God.",
      "The ruler of the synagogue is furious, not at the healing, at the timing. There are six days to work, he says, come get healed on one of those. Jesus calls him and everyone like him a hypocrite. You will untie your ox or your donkey and lead it to water on the sabbath without thinking twice.",
      "Ought not this woman, a daughter of Abraham, bound by this eighteen years, be loosed from it on the sabbath day? His enemies are put to shame. The crowd rejoices at everything he is doing.",
      "Then two small parables back to back. The kingdom of God is like a mustard seed a man planted, that grew into a tree big enough for birds to nest in its branches. Like leaven a woman hid in three measures of meal until the whole batch was leavened. Small, hidden, and it does not stay small.",
    ]),
    g(13, 22, 35, [
      "Someone asks him, Lord, are there few that be saved? Jesus does not give a number. Strive to enter in at the strait gate, he says, for many will seek to enter in, and shall not be able.",
      "Once the master of the house has risen up and shut the door, people will stand outside knocking, saying Lord, Lord, open unto us. He will answer, I know you not whence ye are. They will say, we did eat and drink in thy presence, and thou hast taught in our streets. He will say it again. Depart from me, all ye workers of iniquity.",
      "Then he widens it. People will come from the east and west, and from the north and south, and sit down in the kingdom of God, while some who assumed they belonged there are thrust out. There are last which shall be first, and there are first which shall be last.",
      "Some Pharisees warn him that Herod wants to kill him. Go ye and tell that fox, Jesus says, I cast out devils and do cures today and tomorrow, and the third day I shall be perfected. Then he grieves over the city itself. O Jerusalem, Jerusalem. How often would I have gathered thy children together, as a hen doth gather her brood under her wings, and ye would not.",
    ]),
    g(14, 1, 24, [
      "Jesus goes to eat at a Pharisee's house on the sabbath, and a man in front of him has dropsy. He asks the lawyers and Pharisees directly, is it lawful to heal on the sabbath day? They say nothing. So he heals the man and lets him go, then asks which of them would not pull an ox or a son out of a pit on the sabbath without a second thought.",
      "He notices the guests picking out the best seats and tells them to do the opposite. Sit down in the lowest room, so the host comes and moves you up, instead of getting bumped down in front of everyone. Whosoever exalteth himself shall be abased, and he that humbleth himself shall be exalted.",
      "Then he turns to the host. When you make a dinner, do not just invite friends and rich neighbors who can invite you back. Call the poor, the maimed, the lame, the blind. They cannot repay you, and that is the point. You will be repaid at the resurrection of the just.",
      "So he tells a story. A man makes a great supper and invites many. One by one they all make excuses, a field to inspect, oxen to try out, a new wife. The furious host sends his servant into the streets for the poor and the crippled, then out to the highways and hedges. Compel them to come in, he says, that my house may be filled. For none of those men which were bidden shall taste of my supper.",
    ]),
    g(14, 25, 35, [
      "Huge crowds are following him, and Jesus turns around and says something no popular teacher wants to say. If any man come to me, and hate not his father, and mother, and wife, and children, and brethren, and sisters, yea, and his own life also, he cannot be my disciple.",
      "Whosoever doth not bear his cross, and come after me, cannot be my disciple. Then two short pictures. Do not start building a tower without first sitting down to count whether you can even finish it, or everyone will mock the abandoned foundation. Do not go to war against a king with twice your men without first asking whether you can win.",
      "So likewise, whosoever he be of you that forsaketh not all that he hath, he cannot be my disciple. This is not Jesus talking people out of following him. It is him telling them exactly what it costs before they say yes.",
      "Salt is good, he says, but if the salt itself have lost its savour, what is it good for? It is fit neither for the land nor for the dunghill. Men just throw it out. He that hath ears to hear, let him hear.",
    ]),
    g(15, 1, 10, [
      "Publicans and sinners keep drawing near to hear him, and the Pharisees and scribes murmur. This man receiveth sinners, and eateth with them. So he answers with three stories in a row, starting here.",
      "What man of you, having a hundred sheep, if he lose one of them, doth not leave the ninety and nine in the wilderness, and go after that which is lost, until he find it? When he finds it, he lays it on his shoulders, rejoicing, and calls his friends and neighbors together. Rejoice with me, for I have found my sheep which was lost.",
      "I say unto you, that likewise joy shall be in heaven over one sinner that repenteth, more than over ninety and nine just persons, which need no repentance.",
      "Same shape again. A woman with ten pieces of silver loses one. She lights a candle, sweeps the whole house, and seeks diligently until she finds it, then calls her friends and neighbors together to rejoice with her. Likewise, joy in the presence of the angels of God over one sinner that repenteth.",
    ]),
    g(15, 11, 32, [
      "A man has two sons. The younger asks for his share of the inheritance now, while his father is still alive, and gets it. Not many days after, he gathers it all together and wastes it in a far country with riotous living. A famine hits, and he ends up feeding pigs, hungry enough to eat what the pigs are eating, with no one giving him anything.",
      "He comes to himself. How many hired servants of my father's have bread enough and to spare, and I perish with hunger. He rehearses a speech: Father, I have sinned against heaven, and before thee, and am no more worthy to be called thy son, make me as one of thy hired servants. And he sets out for home.",
      "While he is yet a great way off, his father sees him, and has compassion, and runs, and falls on his neck, and kisses him. The son barely gets the first line of his speech out before the father is calling for the best robe, a ring, shoes, the fatted calf. For this my son was dead, and is alive again. He was lost, and is found.",
      "The older brother will not go in. He has served his father for years and never even got a young goat to celebrate with his friends, and now this brother, who devoured his living with harlots, gets a feast. The father does not argue with him. Son, thou art ever with me, and all that I have is thine. It was meet that we should make merry, and be glad, for this thy brother was dead, and is alive again, and was lost, and is found.",
    ]),
  ],
  closing: [
    ["So that is Day 298.", 700],
    ["A fig tree given one more year to prove itself.", 750],
    ["A woman bent over eighteen years, finally standing straight, on the day the rules said she should not.", 800],
    ["A guest room where the humble get moved up and the proud get moved down.", 800],
    ["A house filled with the poor and the crippled because the invited guests could not be bothered to come.", 800],
    ["A shepherd who leaves ninety-nine sheep to chase one, and a woman who sweeps her whole house for a single coin.", 850],
    ["And a father who sees his son a long way off, and runs.", 800],
    ["Tomorrow, Luke 16 through 18. A dishonest manager gets praised, a rich man ends up begging, and a Pharisee prays the wrong prayer in public.", 850],
    ["For now, sit with the father's words to the older brother.", 750],
    ["Thou art ever with me. And all that I have is thine.", 1200],
  ],
};
