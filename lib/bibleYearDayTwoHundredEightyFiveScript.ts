import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 285, written to the Day 1 standard.
 *
 * Every fight about greatness in this reading gets answered with someone
 * the disciples were not expecting - a child, a lost sheep, a rich man who
 * cannot let go, workers who barely worked at all, two blind beggars who
 * ask for exactly the right thing. Seven blocks across Matthew 18-20.
 */

const matthewEighteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 18:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 18,
  startVerse,
  endVerse,
  teaching,
});

const matthewNineteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 19:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 19,
  startVerse,
  endVerse,
  teaching,
});

const matthewTwenty = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 20:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 20,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 285,
  title: "Humility, Forgiveness, and Servant Greatness",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 285. The disciples keep fighting about who is the greatest, and Jesus keeps answering with people they were not expecting.", 850],
    ["A child. A lost sheep. A servant who could not forgive a debt smaller than the one he was just forgiven.", 850],
    ["A rich man walks away sad because he cannot let go of what he has. Workers who worked one hour get paid the same as the ones who worked all day.", 900],
    ["And two blind men outside Jericho ask for exactly the right thing, right after two of His own disciples ask for exactly the wrong thing.", 900],
    ["We are in Matthew 18, 19, and 20.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewEighteen(1, 14, [
      "The disciples ask who is greatest in the kingdom of heaven, and Jesus answers with a child, not an argument. He sets a little one in the middle of them and says, except ye be converted, and become as little children, ye shall not enter into the kingdom of heaven. Whoever humbles himself like this child is the greatest.",
      "Then the warning gets serious fast. Whoso shall offend one of these little ones, it were better for him that a millstone were hanged about his neck, and he were drowned in the depth of the sea. Cut off the hand, pluck out the eye, if that is what it takes to stop causing that kind of harm. He is not describing surgery. He is describing how seriously He takes what happens to the small and the trusting.",
      "A hundred sheep, one wanders off, and the shepherd leaves the ninety and nine to go find it. When he finds it, he rejoices more over that one than over the ninety nine that never strayed.",
      "It is not the will of your Father which is in heaven, that one of these little ones should perish. Greatness in this kingdom does not look like the greatness anyone was campaigning for.",
    ]),
    matthewEighteen(15, 20, [
      "If thy brother shall trespass against thee, go and tell him his fault, between thee and him alone. Not to the group first. Not behind his back. If he hears you, thou hast gained thy brother, not won an argument.",
      "If he will not listen, bring one or two more, so nothing rests on your word alone. If he still will not hear them, tell it unto the church, and if he neglects the church too, let him be unto thee as an heathen man and a publican. Every step is built to stay as private and as gentle as it can, for as long as it can.",
      "Whatsoever ye shall bind on earth shall be bound in heaven, and whatsoever ye shall loose on earth shall be loosed in heaven. The church carries real weight when it handles this the way He just laid out, not casually.",
      "For where two or three are gathered together in my name, there am I in the midst of them. That promise sits right here, in the middle of a passage about confronting sin, not somewhere more comfortable.",
    ]),
    matthewEighteen(21, 35, [
      "Peter asks how many times he has to forgive his brother, and offers seven, which already sounds generous. Jesus answers, until seventy times seven. He is not handing Peter a bigger number to count to. He is telling him to stop counting.",
      "Then the parable. A servant owes his king ten thousand talents, a debt he could never repay in several lifetimes. He begs for patience, and the king does more than grant it. He is moved with compassion, and forgives the whole debt outright.",
      "That same servant walks out, finds a man who owes him a hundred pence, a debt you could clear in months, and takes him by the throat demanding payment. His fellow servants see it and are very sorry, and go tell the king.",
      "O thou wicked servant, I forgave thee all that debt, because thou desiredst me. Shouldest not thou also have had compassion on thy fellowservant, even as I had pity on thee? So likewise shall my heavenly Father do also unto you, if ye from your hearts forgive not every one his brother their trespasses. The math only breaks down when you forget how large your own debt was.",
    ]),
    matthewNineteen(1, 15, [
      "Pharisees try to trap Him on divorce, tempting him: is it lawful for a man to put away his wife for every cause? Jesus goes back past Moses to the beginning. He which made them at the beginning made them male and female, and the two shall be one flesh. What therefore God hath joined together, let not man put asunder.",
      "They push back. Why did Moses command a writing of divorcement then? Moses, because of the hardness of your hearts, suffered you to put away your wives, He says, but from the beginning it was not so. A permission is not the same thing as the design.",
      "The disciples hear all this and decide it might be safer not to marry at all. Jesus does not pretend that is an easy road. All men cannot receive this saying, save they to whom it is given.",
      "Then people bring little children for Him to bless, and the disciples try to send them off. Jesus stops them. Suffer little children, and forbid them not, to come unto me: for of such is the kingdom of heaven. He lays His hands on them and keeps going.",
    ]),
    matthewNineteen(16, 30, [
      "A man asks what good thing he must do to have eternal life. Jesus points him to the commandments, and the man says he has kept all of them since he was young. What lack I yet?",
      "If thou wilt be perfect, go and sell that thou hast, and give to the poor, and come and follow me. The man goes away sorrowful. He had great possessions, and it turns out that is the one thing he was not willing to hand over.",
      "It is easier for a camel to go through the eye of a needle, than for a rich man to enter into the kingdom of God, Jesus says, and the disciples are stunned. Who then can be saved? With men this is impossible; but with God all things are possible. He is not saying money is evil. He is saying nobody, rich or poor, walks in on what they can manage themselves.",
      "Peter, still keeping score, asks what he and the others get for leaving everything. Jesus promises thrones, and a hundredfold return, and everlasting life. Then one line that undoes every ranking anyone in this chapter has been trying to make. Many that are first shall be last, and the last shall be first.",
    ]),
    matthewTwenty(1, 16, [
      "A landowner hires workers at dawn for a day's wage, then goes back out at the third hour, the sixth, the ninth, and the eleventh, hiring more each time and promising whatsoever is right. At the end of the day he pays the last ones hired first, a full day's wage.",
      "The workers who started at dawn assume they are about to get more. They get exactly what they agreed to, and they are furious that the latecomers got the same amount.",
      "Friend, I do thee no wrong: didst not thou agree with me for a penny? Is it not lawful for me to do what I will with mine own? Is thine eye evil, because I am good? Nobody who worked all day was cheated. Somebody who barely worked at all was simply loved more generously than they expected.",
      "So the last shall be first, and the first last. The kingdom does not run on seniority. Grace given to somebody else was never grace taken away from you.",
    ]),
    matthewTwenty(17, 34, [
      "Going up to Jerusalem, Jesus tells the twelve plainly, for the third time now, exactly what is about to happen to Him. Betrayed, condemned, mocked, scourged, crucified, and raised again the third day. He says it in detail, not in code.",
      "Right after that, James and John's mother asks Him to seat her two sons at His right hand and His left in the kingdom. He just described a cross, and the request on the table is about seating arrangements. Ye know not what ye ask, He tells them.",
      "Whosoever will be great among you, let him be your minister; and whosoever will be chief among you, let him be your servant. Even as the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many. He answers a fight about rank by redefining what rank even means.",
      "Then, leaving Jericho, two blind men cry out for Him, and the crowd tells them to be quiet. They cry the more. Jesus stops, asks what they want, and gives them their sight. Two men who could not see with their eyes end up asking for exactly the right thing, right after two disciples who could see perfectly could not see it at all.",
    ]),
  ],
  closing: [
    ["So that is Day 285.", 700],
    ["Jesus set a child in the middle of an argument about greatness and told them that was the answer.", 800],
    ["A servant forgiven an impossible debt turned around and choked a man over pocket change. Forgive from the heart, or the same math gets applied to you.", 850],
    ["A rich man could keep every commandment and still not let go of what he owned. Workers who worked one hour got paid like they worked all day, and the ones who worked all day were furious that grace did not run out.", 900],
    ["On the road to Jerusalem, Jesus told the twelve exactly what was about to happen to Him, and got asked about seating arrangements in return.", 850],
    ["Then two blind men outside Jericho asked for the one thing that mattered, and saw.", 800],
    ["Tomorrow, Matthew 21 through 23. Jesus enters Jerusalem as a king and confronts the hypocrisy waiting for Him there.", 900],
    ["For now, sit with what He told them about greatness.", 750],
    ["Whosoever will be chief among you, let him be your servant.", 850],
    ["That is what it actually looks like.", 1200],
  ],
};
