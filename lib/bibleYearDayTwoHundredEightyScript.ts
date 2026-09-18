import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 280, written to the Day 1 standard.
 *
 * John the Baptist prepares the way and baptizes Jesus, Jesus is tempted
 * in the wilderness and begins His ministry calling fishermen, then Matthew
 * gives the opening third of the Sermon on the Mount: the Beatitudes, salt
 * and light, and Jesus resetting the law from the inside out. Seven blocks
 * across Matthew 3-5.
 */

const matthewThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 3:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const matthewFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 4:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const matthewFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 5:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 280,
  title: "Baptism, Temptation, and Kingdom Teaching",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 280. A wilderness preacher shows up eating locusts and wild honey, and tells everyone to repent.", 800],
    ["Then Jesus walks into the water to be baptized by him, and a voice speaks from heaven.", 800],
    ["From there He goes straight into the wilderness, forty days with nothing to eat, and the devil is waiting.", 850],
    ["He comes out of that, calls some fishermen, and climbs a mountain to teach.", 800],
    ["And what He says up there will still be unsettling people two thousand years from now.", 850],
    ["We are in Matthew 3 through 5.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewThree(1, 12, [
      "John the Baptist shows up in the wilderness of Judaea saying repent, for the kingdom of heaven is at hand. Camel's hair clothes, a leather belt, locusts and wild honey. Nothing about him looks comfortable.",
      "Crowds come from Jerusalem and all Judaea to be baptized in the Jordan, confessing their sins. But when Pharisees and Sadducees show up, John does not soften it. O generation of vipers, who warned you to flee from the wrath to come.",
      "Bring forth fruits meet for repentance, he tells them. Do not think saying we have Abraham to our father saves you. God is able of these stones to raise up children unto Abraham. Ancestry is not going to cover for them.",
      "I baptize you with water, John says, but one mightier than I comes after me, whose shoes I am not worthy to carry. He will baptize with the Holy Ghost and with fire, and his fan is in his hand to purge the floor. John knows exactly what his own job is, and what it is not.",
    ]),
    matthewThree(13, 17, [
      "Jesus comes from Galilee to the Jordan to be baptized of John. And John tries to stop him. I have need to be baptized of thee, and comest thou to me?",
      "Jesus answers, suffer it to be so now, for thus it becometh us to fulfil all righteousness. He is not being cleansed of sin. He is standing where sinners stand, on purpose, from the very start.",
      "So John allows it. And when Jesus comes up out of the water, the heavens open, and he sees the Spirit of God descending like a dove and lighting on him.",
      "And a voice from heaven says, this is my beloved Son, in whom I am well pleased. Before Jesus has preached one sermon or healed one person, the Father already says he is pleased. Nothing has been earned yet. It is simply declared.",
    ]),
    matthewFour(1, 11, [
      "Then the Spirit leads Jesus into the wilderness to be tempted of the devil. Forty days and nights with no food, and afterward, Matthew says plainly, he was hungry.",
      "The tempter comes right at the hunger first. If thou be the Son of God, command that these stones be made bread. Jesus answers from Scripture. Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.",
      "The devil tries twice more. A pinnacle of the temple, daring him to jump and force God's hand. Then a high mountain, offering him all the kingdoms of the world for one act of worship. Both times, Jesus answers with it is written, and nothing else.",
      "Get thee hence, Satan, he finally says, for it is written, thou shalt worship the Lord thy God, and him only shalt thou serve. The devil leaves, and angels come and minister to him. He wins the fight the same way anyone can. He knows what God actually said.",
    ]),
    matthewFour(12, 25, [
      "When Jesus hears John has been put in prison, he leaves Nazareth and settles in Capernaum, by the sea, in the territory of Zabulon and Nephthalim. Matthew ties it to Isaiah. The people who sat in darkness saw a great light.",
      "From that time Jesus began to preach the same words John did. Repent, for the kingdom of heaven is at hand. He is not starting a new message. He is carrying the one John started forward.",
      "Walking by the sea of Galilee, he sees Simon called Peter and his brother Andrew casting a net, and says, follow me, and I will make you fishers of men. They leave their nets immediately. Then James and John, and they leave their boat and their own father without hesitation.",
      "His fame spreads through all Syria. People bring him the sick, those with divers diseases and torments, the possessed, the lunatic, the palsied, and he heals them. Great multitudes start following him from Galilee, Decapolis, Jerusalem, Judaea, and beyond the Jordan.",
    ]),
    matthewFive(1, 16, [
      "Seeing the multitudes, Jesus goes up onto a mountain, sits down, and his disciples come to him. He opens his mouth and teaches them, starting with a list that turns everything upside down.",
      "Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are they that mourn, for they shall be comforted. Blessed are the meek, for they shall inherit the earth. Blessed are they which hunger and thirst after righteousness, for they shall be filled.",
      "Blessed are the merciful, the pure in heart, the peacemakers. Blessed are they which are persecuted for righteousness' sake. None of these are the people the world usually calls blessed. Jesus names them blessed anyway.",
      "Then he turns straight to the people sitting there. Ye are the salt of the earth. Ye are the light of the world. A city set on a hill cannot be hid. Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven. Not hide it. Not dim it for comfort. Let it shine.",
    ]),
    matthewFive(17, 32, [
      "Think not that I am come to destroy the law, or the prophets, Jesus says. I am not come to destroy, but to fulfil. Till heaven and earth pass, not one jot or tittle will pass from the law till all is fulfilled.",
      "Then he says something that should stop a religious crowd cold. Except your righteousness shall exceed the righteousness of the scribes and Pharisees, ye shall in no case enter into the kingdom of heaven. The most careful rule-keepers in the room, and he says that is not enough.",
      "Ye have heard it said, thou shalt not kill. But I say unto you, whosoever is angry with his brother without a cause is in danger of judgment. He is not lowering the bar on the law. He is showing you the bar was always this high, reaching all the way into the heart.",
      "Same move with adultery. Ye have heard, thou shalt not commit adultery. But I say unto you, whosoever looketh on a woman to lust after her hath committed adultery with her already in his heart. And on divorce, he closes the loophole that let a man discard a wife with a piece of paper and no real cause.",
    ]),
    matthewFive(33, 48, [
      "Ye have heard, thou shalt not forswear thyself, but perform unto the Lord thine oaths. But I say unto you, swear not at all. Let your communication be yea, yea, nay, nay. Whatsoever is more than these cometh of evil. Your word alone should be enough.",
      "Ye have heard, an eye for an eye, and a tooth for a tooth. But I say unto you, resist not evil. Whosoever shall smite thee on the right cheek, turn to him the other also. If any man compel thee to go a mile, go with him twain. The old law limited revenge. Jesus removes it.",
      "Ye have heard, thou shalt love thy neighbour, and hate thine enemy. But I say unto you, love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you and persecute you.",
      "Why. That ye may be the children of your Father which is in heaven, for he maketh his sun to rise on the evil and the good, and sendeth rain on the just and the unjust. Be ye therefore perfect, even as your Father which is in heaven is perfect. Not a suggestion. The standard is God's own character.",
    ]),
  ],
  closing: [
    ["So that is Day 280.", 700],
    ["A preacher in camel's hair told a nation to repent, and then baptized the one he had been pointing to the whole time.", 800],
    ["A voice from heaven said this is my beloved Son before Jesus had done a single miracle.", 800],
    ["Forty days of hunger in the wilderness, and every temptation answered the same way. It is written.", 850],
    ["Then fishermen dropped their nets the moment he said follow me.", 750],
    ["And on a mountain, he told the poor in spirit, the mourning, and the persecuted that they were the blessed ones. Not the powerful.", 850],
    ["He did not lower the law. He opened it up and showed you it was always about the heart, not just the hands.", 850],
    ["Tomorrow, Matthew 6 through 8. How to pray, what to trust, and the difference between hearing his words and actually building on them.", 850],
    ["For now, sit with what he said on that mountain.", 750],
    ["Blessed are the merciful, for they shall obtain mercy.", 1200],
  ],
};
