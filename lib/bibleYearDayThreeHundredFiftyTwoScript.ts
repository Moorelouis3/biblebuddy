import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 352, written to the Day 1 standard.
 *
 * James keeps swinging. Favoritism toward the rich, faith that never
 * produces anything, a tongue nobody can tame, and fights inside the
 * church traced back to wanting things you were never given. Six blocks
 * across James 2-4.
 */

const jamesTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `James 2:${startVerse}-${endVerse}`,
  book: "james",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const jamesThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `James 3:${startVerse}-${endVerse}`,
  book: "james",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const jamesFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `James 4:${startVerse}-${endVerse}`,
  book: "james",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 352,
  title: "Faith Works Through Humility",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 352.", 700],
    ["James is not easing up today.", 750],
    ["He is going to ask why you treat the well-dressed man better than the poor one. Then he is going to ask what your faith is actually worth if it never moves your hands.", 850],
    ["And by the end, he is going to name the real reason people fight. Not doctrine. Wanting something you were never given.", 850],
    ["James 2 through 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    jamesTwo(1, 13, [
      "James pictures it plainly. A man walks into your meeting with gold rings and fine clothes, and a poor man walks in wearing rags. And you rush the rich man to the good seat, and tell the poor man to stand, or sit down here by my feet.",
      "That is not just rude, James says. You have made yourselves judges with evil thoughts. And look who you are actually snubbing. Has not God chosen the poor of this world to be rich in faith and heirs of the kingdom? Meanwhile it is the rich who drag you into court and blaspheme the name you were called by.",
      "Love your neighbor as yourself. Keep that and you do well. But show favoritism and you have broken the law, because the same God who said do not commit adultery also said do not kill. Break one point, James says, and you are guilty of all of it. There is no keeping most of the law.",
      "So speak and act like people who will be judged by a law of liberty, not a law of loopholes. Because judgment without mercy waits for the one who showed none. Mercy triumphs over judgment. That line is the hinge of the whole section.",
    ]),
    jamesTwo(14, 26, [
      "What good is it, James asks, if someone says he has faith but has no works? Can that kind of faith save him? Picture a brother or sister with no clothes and no food, and you say, go in peace, stay warm, stay fed, and give them nothing. What good is that?",
      "Faith by itself, if it does not do anything, is dead. Someone will say, you have faith, I have works. Show me your faith without works, James answers, and I will show you my faith by what I do. Even the demons believe there is one God. And they tremble. Believing a true fact about God has never been the same thing as trusting him.",
      "Was not Abraham justified by what he did, when he offered Isaac on the altar? His faith and his actions worked together, and the actions completed the faith. That is what fulfilled the scripture that says Abraham believed God, and it was credited to him as righteousness.",
      "And James throws in a name you would not expect standing next to Abraham. Rahab the prostitute, justified by works too, when she hid the messengers and sent them out another way. As the body without the spirit is dead, James finishes, so faith without works is dead also.",
    ]),
    jamesThree(1, 12, [
      "Not many of you should become teachers, James warns, because teachers will be judged more strictly. All of us stumble in many ways. Anyone who never stumbles in what he says is a perfect man, able to control his whole body.",
      "Then the pictures start stacking up. A small bit in a horse's mouth turns the whole animal. A small rudder steers a huge ship against strong winds, wherever the pilot wants. The tongue is just as small, and it boasts great things. A tiny spark sets a whole forest on fire.",
      "The tongue is a fire, James says, a world of evil among the parts of the body. It corrupts the whole person, sets the course of a life on fire, and is itself set on fire by hell. Every kind of animal has been tamed by mankind. Nobody can tame the tongue. It is restless and evil, full of deadly poison.",
      "With it we bless the Lord and Father, and with it we curse people made in God's likeness. Praise and cursing come out of the same mouth. My brothers, James says, this should not happen. A spring does not pour out fresh water and bitter water from the same opening. A fig tree cannot bear olives. Neither can a person live two ways at once and call both of them faith.",
    ]),
    jamesThree(13, 18, [
      "Who among you is wise and understanding, James asks? Let him show it by a good life, by deeds done in the humility that comes from wisdom. But if you have bitter envy and selfish ambition in your heart, do not boast about it, and do not deny the truth by pretending it is wisdom.",
      "That kind of wisdom does not come down from above. It is earthly, unspiritual, demonic. Wherever you find envy and selfish ambition, James says, you find disorder and every kind of evil practice. Naming it that plainly is the whole point. He will not call it a personality or a leadership style.",
      "But the wisdom that comes from heaven is first of all pure, then peace-loving, considerate, willing to yield, full of mercy and good fruit, impartial and sincere. No hidden agenda in it anywhere.",
      "Peacemakers who sow in peace, James closes, raise a harvest of righteousness. Not people who win the argument. People who make peace.",
    ]),
    jamesFour(1, 10, [
      "What causes fights and quarrels among you, James asks? Do they not come from the desires that battle inside you? You want something and do not get it, so you kill. You covet and cannot have it, so you quarrel and fight. You do not have, because you do not ask God. You ask and do not receive, because you ask with wrong motives, to spend it on your own pleasures.",
      "You adulterous people, he says, do you not know that friendship with the world means enmity with God? Anyone who chooses to be a friend of the world becomes an enemy of God. That is not a small accusation. He is saying the fight in your church is coming from wanting the world's things more than you want God.",
      "But he gives more grace. That is why scripture says, God opposes the proud but gives grace to the humble. So submit to God. Resist the devil, and he will flee from you. Come near to God, and he will come near to you.",
      "Wash your hands, you sinners, and purify your hearts, you double-minded. Grieve, mourn, and wail. Turn your laughter to mourning and your joy to gloom. Humble yourselves before the Lord, and he will lift you up. Every command in this block points the same direction. Down, before you get lifted.",
    ]),
    jamesFour(11, 17, [
      "Do not slander one another, James says. Anyone who speaks against a brother or judges him speaks against the law and judges it. And if you judge the law, you are not keeping it, you are sitting over it. There is only one lawgiver and judge, the one able to save and to destroy. Who are you to judge your neighbor?",
      "Then he turns to the merchants planning their year out loud. Today or tomorrow we will go to this city, spend a year there, do business, and make money. You do not even know what tomorrow holds, James says. What is your life? You are a mist that appears for a little while and then vanishes.",
      "Instead you should say, if it is the Lord's will, we will live and do this or that. As it is, you boast in your arrogant schemes. All such boasting is evil.",
      "And then the line that closes the chapter, and lands harder than almost anything else in the letter. If anyone knows the good he ought to do and does not do it, James says, for him it is sin. Not just the wrong you commit. The right you skip.",
    ]),
  ],
  closing: [
    ["So that's Day 352.", 700],
    ["A rich man ushered to the good seat, a faith with no hands, a tongue nobody can tame, and a church fighting over things it was never given.", 850],
    ["Faith and works were never rivals in this letter. James just refuses to call something faith if it never leaves the couch.", 850],
    ["Mercy triumphs over judgment. Peacemakers raise a harvest of righteousness. Humble yourselves, and he will lift you up. Three different chapters, one thread running under all of them.", 850],
    ["And that last line should sit with you longer than the rest. Knowing the good and skipping it is still sin, even when you never did anything you would call wrong.", 850],
    ["Tomorrow, James 5, then 1 Peter 1 and 2. A warning to the wealthy, a call to patience, and a new letter to people scattered and suffering.", 850],
    ["For now, carry the down-before-up line.", 800],
    ["Humble yourself before the Lord.", 750],
    ["And he will lift you up.", 1200],
  ],
};
