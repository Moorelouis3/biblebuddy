import { renderProverbsSectionDepth } from "./proverbsNoteEnhancements";

type Verse = {
  verse: number;
  text: string;
};

type Section = {
  range: string;
  heading: string;
  body: string[];
};

type ChapterTemplate = {
  title: string;
  intro: string[];
  flow: string[];
  sections: Section[];
  takeaway: string[];
};

function versesForRange(verses: Verse[], range: string) {
  const [startText, endText] = range.split("-");
  const start = Number(startText);
  const end = Number(endText ?? startText);
  return verses.filter((verse) => verse.verse >= start && verse.verse <= end);
}

function renderVerseBlock(verses: Verse[]) {
  return verses.map((verse) => `> **${verse.verse}** ${verse.text}`).join("\n>\n");
}

export function renderProverbsTwentyOneToThirtyOneNotes(chapter: number, verses: Verse[]) {
  const template = PROVERBS_TWENTY_ONE_TO_THIRTY_ONE_TEMPLATES[chapter];

  if (!template) {
    throw new Error(`Missing Proverbs notes template for chapter ${chapter}.`);
  }

  return `# ${template.title}

${template.intro.join("\n\n")}

## 📍 The Chapter Flow

${template.flow.map((line) => `- ${line}`).join("\n")}

${template.sections
  .map((section) => `## 📖 Proverbs ${chapter}:${section.range}

${renderVerseBlock(versesForRange(verses, section.range))}

## ${section.heading}

${section.body.join("\n\n")}

${renderProverbsSectionDepth({
  chapter,
  range: section.range,
  heading: section.heading,
  verses: versesForRange(verses, section.range).map((verse) => ({ number: verse.verse, text: verse.text })),
})}`)
  .join("\n\n")}

## 💡 The Bigger Takeaway

${template.takeaway.join("\n\n")}
`;
}

export const PROVERBS_TWENTY_ONE_TO_THIRTY_ONE_TEMPLATES: Record<number, ChapterTemplate> = {
  21: {
    title: "👑 The Lord Weighs The Heart",
    intro: [
      "Proverbs 21 opens with the king's heart in the hand of the Lord.",
      "That is a huge way to begin because kings look powerful. They command armies, make decisions, and shape nations. But Solomon reminds his son that even the heart of a king is not outside God's rule.",
      "The chapter keeps pressing this theme: people may justify themselves, make plans, speak loudly, chase pleasure, or trust strength, but the Lord weighs the heart.",
      "Wisdom in Proverbs 21 is not just about doing religious-looking things. It is about living honestly before God in justice, mercy, humility, diligence, and self-control.",
    ],
    flow: [
      "👑 Verses 1-8: God weighs hearts, justice, pride, and crooked ways",
      "🏠 Verses 9-19: Conflict at home, mercy, judgment, and desire",
      "💰 Verses 20-26: Treasure, wisdom, speech, pride, laziness, and greed",
      "🙏 Verses 27-31: False sacrifice, false witness, bold wickedness, and the Lord's victory",
    ],
    sections: [
      {
        range: "1-8",
        heading: "👑 God Sees Beneath The Crown",
        body: [
          "The chapter begins by saying the king's heart is in the hand of the Lord.",
          "This is not saying rulers are innocent or that every royal choice is good. It is saying no human power is ultimate.",
          "Then Solomon moves from kings to every person: every way of a man is right in his own eyes, but the Lord pondereth the hearts.",
          "That means people are very good at defending themselves. We can explain our motives, justify our choices, and make our own path sound clean.",
          "But God weighs deeper than self-defense.",
          "To do justice and judgment is more acceptable to the Lord than sacrifice. Religious activity cannot replace obedience.",
          "A high look, a proud heart, and the plowing of the wicked are sin because pride can corrupt even ordinary work.",
          "The section ends by contrasting crooked violent ways with the pure work of the upright. God is not fooled by appearance. He sees the path underneath.",
        ],
      },
      {
        range: "9-19",
        heading: "🏠 Wisdom Inside The House",
        body: [
          "Solomon gives repeated pictures of household conflict.",
          "Better to dwell in a corner of a housetop than in a wide house with a contentious woman. Better to dwell in the wilderness than with a contentious and angry woman.",
          "The point is not to mock women. Proverbs also condemns foolish men constantly. The point is that constant strife can make even a large house feel unlivable.",
          "Wisdom is not only public. It matters at home.",
          "The soul of the wicked desires evil and shows no favor to his neighbor, while the simple can learn when judgment falls on the scorner.",
          "Verse 13 warns that whoever stops his ears at the cry of the poor will cry himself and not be heard.",
          "That is a serious mercy lesson. How we respond to need reveals whether wisdom has reached the heart.",
          "Pleasure, gifts, judgment, and desire all appear here because the inner life keeps shaping outer choices.",
        ],
      },
      {
        range: "20-26",
        heading: "💰 Treasure, Speech, And Appetite",
        body: [
          "The wise person's dwelling contains desirable treasure and oil, but the foolish person spends it up.",
          "That is not just about having money. It is about stewardship.",
          "Verse 21 says the one who follows righteousness and mercy finds life, righteousness, and honor. Wisdom is not merely avoiding bad things. It actively pursues what is right and merciful.",
          "Solomon then shows wisdom defeating strength: a wise man scales the city of the mighty and casts down the strength of its confidence.",
          "Guarding the mouth and tongue guards the soul from trouble.",
          "The proud and haughty person is called a scorner because arrogance shapes behavior.",
          "The slothful person desires but refuses labor, while the righteous gives and does not spare.",
          "This section shows that appetite without discipline becomes destruction, but righteousness opens the hand.",
        ],
      },
      {
        range: "27-31",
        heading: "🙏 No Wisdom Against The Lord",
        body: [
          "The sacrifice of the wicked is an abomination, especially when brought with a wicked mind.",
          "Again, Proverbs refuses to let religion cover rebellion.",
          "False witnesses perish, but the person who hears speaks constantly. The wicked hardens his face, but the upright directs his way.",
          "Then comes one of the strongest statements in the chapter: there is no wisdom, understanding, or counsel against the Lord.",
          "Human strategy cannot outsmart God.",
          "The horse is prepared for battle, but safety is of the Lord.",
          "Preparation matters, but preparation is not ultimate. Wisdom plans carefully and still knows deliverance belongs to God.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 21 teaches that God weighs the heart beneath every plan, word, sacrifice, and public image.",
      "Wisdom does justice, shows mercy, guards speech, rejects pride, and remembers that victory belongs to the Lord.",
    ],
  },
  22: {
    title: "🏷️ A Good Name And A Trained Path",
    intro: [
      "Proverbs 22 begins with the value of a good name.",
      "That matters because the chapter is full of formation. It talks about reputation, humility, prudence, debt, oppression, parenting, generosity, boundaries, and listening to the words of the wise.",
      "This chapter feels like a bridge. It contains short Proverbs, then shifts into a more direct section of instruction.",
      "The big idea is that wisdom trains a life before consequences harden.",
    ],
    flow: [
      "🏷️ Verses 1-9: Name, humility, prudence, thorns, training, debt, and generosity",
      "🗣️ Verses 10-16: Scorners, pure hearts, lazy excuses, strange women, and correction",
      "👂 Verses 17-21: Incline your ear to the words of the wise",
      "⚖️ Verses 22-29: Do not rob the poor, join anger, move boundaries, or pledge foolishly",
    ],
    sections: [
      {
        range: "1-9",
        heading: "🏷️ The Value Of A Good Name",
        body: [
          "A good name is better than great riches.",
          "That does not mean money is worthless. It means character and reputation are more valuable than possessions.",
          "Favor is better than silver and gold because trust cannot be bought the same way goods can be bought.",
          "The rich and poor meet together because the Lord is maker of them all. Human status does not erase shared dependence on God.",
          "The prudent sees evil and hides himself, but the simple pass on and are punished. Wisdom recognizes danger early.",
          "Humility and the fear of the Lord bring riches, honor, and life.",
          "Then comes the famous instruction to train up a child in the way he should go. This is a proverb, not a mechanical guarantee. It teaches the wise pattern of early formation.",
          "Debt, thorns, and generosity all show how choices create pathways. A bountiful eye is blessed because it sees enough to share.",
        ],
      },
      {
        range: "10-16",
        heading: "🗣️ What Must Be Driven Out",
        body: [
          "Cast out the scorner, and contention goes out.",
          "That is a strong community lesson. Some conflict continues because the person feeding it remains in place.",
          "The Lord preserves knowledge, but He overthrows the words of the transgressor.",
          "The slothful person says there is a lion outside. Laziness often creates dramatic excuses to avoid ordinary faithfulness.",
          "The mouth of strange women is described as a deep pit, connecting back to earlier warnings about seduction and ruin.",
          "Foolishness is bound in the heart of a child, and correction drives it far from him.",
          "The chapter is showing that wisdom is not passive. Some things must be corrected, removed, resisted, and trained.",
        ],
      },
      {
        range: "17-21",
        heading: "👂 Incline Your Ear",
        body: [
          "The tone changes here. Solomon calls the listener to bow the ear and hear the words of the wise.",
          "Wisdom must be applied to the heart, not merely heard with the ear.",
          "The goal is not information only. It is trust in the Lord.",
          "These words are meant to be kept within, fitted on the lips, and used to answer truth to those who ask.",
          "That is a picture of deep learning. Wisdom is received, stored, lived, and then spoken.",
          "Bible Buddy's chapter notes are trying to help with that exact movement: not just reading, but understanding and carrying truth forward.",
        ],
      },
      {
        range: "22-29",
        heading: "⚖️ Boundaries, Anger, And Skill",
        body: [
          "Do not rob the poor because they are poor. That line shows God's concern for people who are easy to exploit.",
          "The Lord pleads their cause, meaning mistreatment of the vulnerable is not ignored by heaven.",
          "Solomon warns against friendship with an angry person because anger is contagious. You can learn their ways and get trapped.",
          "He warns again against surety and reckless pledges because foolish promises can cost more than expected.",
          "Do not remove the ancient landmark. Boundaries matter because inheritance, justice, and neighborly trust matter.",
          "The chapter ends with skillful work. A person diligent in business stands before kings.",
          "Wisdom is spiritual and practical. It shapes mercy toward the poor, emotional relationships, financial caution, respect for boundaries, and excellence in work.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 22 teaches that a life must be trained.",
      "A good name, humble fear of the Lord, wise parenting, careful friendships, justice for the poor, and diligent work all belong in the path of wisdom.",
    ],
  },
  23: {
    title: "🍽️ Appetite Under Wisdom",
    intro: [
      "Proverbs 23 is about appetite.",
      "Food, wealth, envy, discipline, alcohol, desire, and the heart all show up in this chapter.",
      "The chapter is not only asking what you want. It is asking what your wants are doing to you.",
      "Solomon teaches his son to slow down before powerful tables, rich appearances, sinful pleasures, and intoxicating desires.",
    ],
    flow: [
      "🍽️ Verses 1-8: Be careful at powerful and deceptive tables",
      "👂 Verses 9-16: Instruction, boundaries, correction, and a father's joy",
      "❤️ Verses 17-25: Do not envy sinners; guide your heart in the way",
      "⚠️ Verses 26-35: Sexual sin and drunkenness destroy judgment",
    ],
    sections: [
      {
        range: "1-8",
        heading: "🍽️ The Table Can Test You",
        body: [
          "The chapter begins at the table of a ruler.",
          "Solomon tells the son to consider carefully what is before him. Appetite can make a person forget where he is and who is watching.",
          "Put a knife to thy throat if you are given to appetite. That is intense language because uncontrolled desire is dangerous.",
          "The chapter then warns not to labor to be rich or trust riches that make wings and fly away.",
          "Wealth can appear solid and then disappear.",
          "The evil eye gives food with hidden motives. The person says eat and drink, but his heart is not with you.",
          "Wisdom learns that not every invitation is love, and not every table is safe.",
        ],
      },
      {
        range: "9-16",
        heading: "👂 Correction That Saves",
        body: [
          "Do not speak in the ears of a fool because he will despise wise words.",
          "Solomon then warns against moving old landmarks and entering the fields of the fatherless. God is called their Redeemer, mighty to plead their cause.",
          "Again, the vulnerable are not invisible to God.",
          "Apply your heart to instruction and your ears to knowledge.",
          "Correction appears in parenting language. The point is not cruelty but rescue.",
          "Solomon says correction can deliver a soul from hell.",
          "A wise child's heart and lips make the father rejoice. Wisdom is not merely personal success; it brings joy to those who prayed and labored over your formation.",
        ],
      },
      {
        range: "17-25",
        heading: "❤️ Guide Your Heart",
        body: [
          "Let not your heart envy sinners, but stay in the fear of the Lord all day long.",
          "That line understands temptation. Sometimes sinners look like they are winning.",
          "But Solomon tells the son to look at the end. There is a future and hope for the one who fears the Lord.",
          "He warns against winebibbers, riotous eaters of flesh, drowsiness, and poverty.",
          "Then he returns to parents: hear your father, do not despise your mother when she is old, buy truth and do not sell it.",
          "Truth, wisdom, instruction, and understanding are treasures you should not trade away.",
          "The father and mother of the righteous rejoice because wisdom in a child becomes family gladness.",
        ],
      },
      {
        range: "26-35",
        heading: "⚠️ When Desire And Drink Take Over",
        body: [
          "My son, give me thine heart.",
          "That is one of the most direct appeals in Proverbs. The issue is the heart's direction.",
          "The strange woman is a deep ditch and narrow pit, waiting and increasing transgressors.",
          "Then the chapter gives a vivid description of drunkenness: woe, sorrow, contentions, babbling, wounds, redness of eyes.",
          "Wine may look beautiful in the cup, but at the last it bites like a serpent.",
          "The eyes see strange things, the heart utters perverse things, and the person becomes numb to harm.",
          "The final line is tragic: I will seek it yet again.",
          "Addiction and unchecked appetite can make a person return to what is hurting them.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 23 teaches that appetite needs wisdom.",
      "Food, wealth, envy, sex, alcohol, and desire can all pull the heart. Solomon's answer is not numbness but surrender: give wisdom your heart and keep your eyes on the right way.",
    ],
  },
  24: {
    title: "🏗️ Building A House With Wisdom",
    intro: [
      "Proverbs 24 talks about building.",
      "Not just building a physical house, but building a life, a home, a future, and moral strength.",
      "The chapter warns against envying evil people, celebrates wisdom as the way a house is established, calls for rescue of those being drawn toward death, and warns against laziness through the picture of a neglected field.",
      "Wisdom here is active. It builds, rescues, works, judges rightly, and refuses to rejoice when enemies fall.",
    ],
    flow: [
      "🏠 Verses 1-10: Do not envy evil; wisdom builds the house",
      "🛟 Verses 11-16: Rescue, heart-searching, honey, hope, and resilience",
      "⚖️ Verses 17-22: Do not rejoice in enemies falling or fret over evil",
      "👨‍⚖️ Verses 23-34: Right judgment, honest speech, order, and the field of the sluggard",
    ],
    sections: [
      {
        range: "1-10",
        heading: "🏠 Wisdom Builds What Evil Cannot",
        body: [
          "The chapter begins by warning not to envy evil men or desire to be with them.",
          "That matters because evil can look strong, fast, and successful from the outside.",
          "But their heart studies destruction and their lips talk mischief.",
          "Then Solomon gives the building picture: through wisdom a house is built, by understanding it is established, and by knowledge the chambers are filled with precious riches.",
          "This is not only about decoration. It is about a life becoming full because it is built on wisdom.",
          "Wisdom is better than raw strength. Wise counsel is necessary for war. Victory is not only power; it requires direction.",
          "If you faint in adversity, your strength is small. Pressure reveals what has been built inside.",
        ],
      },
      {
        range: "11-16",
        heading: "🛟 Rescue And Resilience",
        body: [
          "Solomon calls the son to deliver those drawn toward death.",
          "This is a moral responsibility. Wisdom does not look at danger and say, I did not know, when help was possible.",
          "God ponders the heart and keeps the soul. He knows what we knew, what we ignored, and what we refused to do.",
          "Then comes honey. Wisdom is like honey to the soul, sweet and future-giving.",
          "The just man falls seven times and rises again, but the wicked fall into mischief.",
          "This is not permission to be careless. It is encouragement that righteousness has resilience.",
          "The wise person may fall, suffer, or be knocked down, but wisdom teaches them to rise again.",
        ],
      },
      {
        range: "17-22",
        heading: "⚖️ Do Not Let Evil Shape Your Heart",
        body: [
          "Do not rejoice when your enemy falls.",
          "That is a searching command because the heart can secretly enjoy another person's collapse.",
          "Solomon warns that the Lord sees that response.",
          "Wisdom is not only doing right outwardly; it is refusing to let revenge and gloating grow inside.",
          "Do not fret because of evil men or envy the wicked. Their future is not secure.",
          "Fear the Lord and the king, and do not meddle with those given to change.",
          "The section teaches that unstable rebellion and evil success are not worth imitating.",
        ],
      },
      {
        range: "23-34",
        heading: "👨‍⚖️ The Field Of The Sluggard",
        body: [
          "The final section gives more sayings of the wise.",
          "Partiality in judgment is not good. Calling the wicked righteous brings public curse, while rebuking rightly brings delight and blessing.",
          "Honest answers are compared to a kiss on the lips because truth spoken rightly is a gift.",
          "Solomon also gives order: prepare work outside, make it fit for yourself in the field, then build your house.",
          "Do not be a false witness. Do not say you will repay evil as someone has done to you.",
          "Then comes the field of the sluggard, overgrown with thorns, nettles, and a broken wall.",
          "Solomon sees it, considers it, and receives instruction.",
          "A little sleep, a little slumber, a little folding of the hands, and poverty comes like a traveler and an armed man.",
          "Neglect teaches if you are willing to look at it honestly.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 24 teaches that wisdom builds while evil destroys and laziness lets life decay.",
      "It calls us to build with understanding, rescue when we can, refuse revenge, speak truth, and learn from the overgrown places before poverty arrives.",
    ],
  },
  25: {
    title: "👑 Wisdom In The King's Court",
    intro: [
      "Proverbs 25 begins a new collection of Solomon's proverbs copied by the men of Hezekiah.",
      "The chapter has a royal feel. It talks about kings, courts, timing, restraint, enemies, false confidence, and self-control.",
      "Much of the chapter is about fittingness: a word fitly spoken, honor handled properly, a messenger who refreshes, and a spirit ruled well.",
      "Wisdom here is not only knowing what is true. It is knowing what fits the moment.",
    ],
    flow: [
      "👑 Verses 1-7: Kings, hidden matters, purity, and humility before honor",
      "⚖️ Verses 8-14: Disputes, secrets, timely words, and false gifts",
      "🤲 Verses 15-22: Patience, moderation, unreliable trust, and enemy-love",
      "🌧️ Verses 23-28: Speech, conflict, polluted springs, and self-control",
    ],
    sections: [
      {
        range: "1-7",
        heading: "👑 Humility Before Honor",
        body: [
          "The chapter opens by naming Hezekiah's men copying Solomon's proverbs.",
          "That reminds us wisdom was preserved and passed down.",
          "It is the glory of God to conceal a thing and the honor of kings to search it out. God is infinite; rulers must investigate carefully.",
          "The king's heart is unsearchable in its depth, but wickedness must be removed for the throne to be established in righteousness.",
          "Then Solomon warns against self-exaltation.",
          "Do not put yourself forward in the king's presence. Better to be invited up than put down publicly.",
          "Wisdom knows that honor grabbed too quickly can become shame.",
        ],
      },
      {
        range: "8-14",
        heading: "⚖️ Words In The Right Moment",
        body: [
          "Do not rush into conflict.",
          "A person may feel confident at the beginning of a dispute and then be ashamed when the matter is examined.",
          "Debate your cause with your neighbor, but do not reveal secrets.",
          "This is wisdom for conflict: handle the issue without betraying trust.",
          "A word fitly spoken is like apples of gold in pictures of silver. The beauty is not only the word; it is the fit.",
          "A wise reprover is like an ornament to an obedient ear.",
          "Faithful messengers refresh like cold snow in harvest.",
          "But boasting of a false gift is like clouds and wind without rain. It promises relief and delivers nothing.",
        ],
      },
      {
        range: "15-22",
        heading: "🤲 Patience, Limits, And Enemy-Love",
        body: [
          "By long forbearing a prince is persuaded, and a soft tongue breaks the bone.",
          "Gentleness can be stronger than force.",
          "The honey warning teaches moderation. Even good things can become sickening when taken without restraint.",
          "Do not overstay in your neighbor's house. Wisdom understands limits in relationships.",
          "False witness is compared to violent weapons because lies can wound deeply.",
          "Confidence in an unfaithful person in trouble is like a broken tooth or foot out of joint.",
          "Then Solomon gives the command to feed your enemy and give him drink.",
          "Wisdom refuses revenge and entrusts justice to the Lord.",
        ],
      },
      {
        range: "23-28",
        heading: "🌧️ A City Without Walls",
        body: [
          "The north wind drives away rain, and an angry countenance can drive away a backbiting tongue.",
          "Again, speech and response matter.",
          "A contentious home is described as worse than a corner of the housetop, repeating a theme from earlier chapters.",
          "Good news from a far country is like cold waters to a thirsty soul.",
          "A righteous person falling before the wicked is like a troubled fountain and corrupt spring, because moral collapse pollutes what should refresh.",
          "Eating too much honey and seeking one's own glory are both warnings about excess.",
          "The chapter ends with self-control: a person without rule over his own spirit is like a city broken down without walls.",
          "Without self-control, everything can get in.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 25 teaches court wisdom, relational wisdom, and self-control.",
      "It shows that timing, restraint, secrecy, humility, faithful messages, and ruled emotions can protect a life from unnecessary shame.",
    ],
  },
  26: {
    title: "🪞 Fools, Sluggards, And Burning Words",
    intro: [
      "Proverbs 26 gives extended portraits of the fool, the sluggard, and the person whose words burn relationships.",
      "This chapter can feel sharp because folly is being exposed from many angles.",
      "The goal is not mockery for entertainment. It is discernment.",
      "Solomon wants the reader to recognize foolish patterns before imitating them or being trapped by them.",
    ],
    flow: [
      "🧢 Verses 1-12: The fool mishandles honor, messages, proverbs, and self-confidence",
      "😴 Verses 13-16: The sluggard is trapped by excuses and self-deception",
      "🔥 Verses 17-22: Meddling, pretending, and talebearing spread fire",
      "💋 Verses 23-28: Burning lips, hidden hatred, and lying tongues",
    ],
    sections: [
      {
        range: "1-12",
        heading: "🧢 When Honor Does Not Fit",
        body: [
          "Honor does not fit a fool any more than snow fits summer or rain fits harvest.",
          "The chapter keeps showing things out of place: a curse without cause, a whip for a horse, a bridle for a donkey, and a rod for the fool's back.",
          "Verses 4 and 5 seem opposite at first: do not answer a fool according to his folly, and answer a fool according to his folly.",
          "Together they teach discernment. Sometimes answering pulls you down to the fool's level. Sometimes silence lets folly appear wise.",
          "Wisdom knows which moment it is in.",
          "A proverb in the mouth of fools is useless or dangerous because truth must be handled rightly.",
          "The section ends by saying there is more hope for a fool than for someone wise in their own conceit.",
          "Self-confident pride is one of the hardest forms of folly to reach.",
        ],
      },
      {
        range: "13-16",
        heading: "😴 The Sluggard's Excuses",
        body: [
          "The sluggard says there is a lion in the way.",
          "That may sound dramatic, but that is the point. Laziness often invents danger to avoid duty.",
          "Like a door turning on hinges, the sluggard turns on his bed. There is movement but no progress.",
          "The image of hiding the hand in the dish and not bringing it back to the mouth shows laziness becoming absurd.",
          "Then comes the deeper problem: the sluggard is wiser in his own conceit than seven people who can give a reason.",
          "Laziness is not only lack of energy. It can become a proud refusal to be corrected.",
        ],
      },
      {
        range: "17-22",
        heading: "🔥 Words That Spread Fire",
        body: [
          "Meddling in a quarrel that is not yours is like grabbing a dog by the ears.",
          "It is dangerous and foolish.",
          "The chapter then condemns someone who deceives his neighbor and says, Am I not in sport?",
          "Cruelty is not excused because someone calls it a joke.",
          "Where no wood is, the fire goes out; where there is no talebearer, strife ceases.",
          "That is one of the clearest pictures of gossip in Proverbs.",
          "Some people keep conflict alive by constantly adding fuel.",
          "The words of a talebearer go deep, which means gossip does not merely pass through. It lodges in people.",
        ],
      },
      {
        range: "23-28",
        heading: "💋 Hidden Hatred",
        body: [
          "Burning lips and a wicked heart are compared to a potsherd covered with silver dross.",
          "That means something cheap and broken is being covered to look valuable.",
          "A person can disguise hatred with lips.",
          "Solomon warns not to believe the person whose speech is charming but whose heart holds abominations.",
          "Hatred may be covered by deceit, but wickedness will be exposed before the congregation.",
          "Whoever digs a pit will fall into it, and the stone rolled against others returns.",
          "A lying tongue hates those afflicted by it, and flattering mouths work ruin.",
          "This chapter teaches that words can be costumes, weapons, and traps.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 26 teaches discernment about foolishness, laziness, gossip, and deception.",
      "It helps you recognize patterns that look harmless at first but create shame, conflict, and ruin.",
    ],
  },
  27: {
    title: "🤝 Faithful Friends And A Watchful Life",
    intro: [
      "Proverbs 27 is full of relational wisdom.",
      "It talks about tomorrow, praise, jealousy, wounds from friends, counsel, neighbors, stewardship, and the need to know the state of your flocks.",
      "The chapter feels very grounded. It is about living with awareness.",
      "Do not boast about tomorrow. Do not praise yourself. Do not ignore correction. Do not neglect what has been entrusted to you.",
    ],
    flow: [
      "⏳ Verses 1-6: Tomorrow, praise, anger, jealousy, and faithful wounds",
      "🍯 Verses 7-14: Appetite, place, counsel, prudence, and noisy blessing",
      "🏠 Verses 15-22: Conflict, sharpening, service, hearts, and stubborn folly",
      "🐑 Verses 23-27: Know the state of your flocks",
    ],
    sections: [
      {
        range: "1-6",
        heading: "⏳ Humility About Tomorrow",
        body: [
          "Do not boast about tomorrow because you do not know what a day may bring.",
          "That is not meant to make people fearful. It is meant to make them humble.",
          "Let another praise you and not your own mouth.",
          "Self-praise reveals insecurity and pride.",
          "Wrath and anger are heavy, but jealousy is even harder to stand before.",
          "Open rebuke is better than secret love because love that never tells the truth may not help when help is needed.",
          "Faithful are the wounds of a friend. A true friend may hurt you with truth to heal you, while an enemy may cover you with kisses to ruin you.",
        ],
      },
      {
        range: "7-14",
        heading: "🍯 Counsel And Nearness",
        body: [
          "The full soul loathes honeycomb, but to the hungry every bitter thing is sweet.",
          "Appetite changes perception.",
          "A person wandering from their place is like a bird wandering from her nest. There is wisdom in knowing where you belong.",
          "Ointment and perfume rejoice the heart, and hearty counsel from a friend brings sweetness.",
          "Do not forsake your own friend or your father's friend. Near, faithful relationships can be better help than distant family in a crisis.",
          "A prudent person foresees evil and hides, but the simple pass on and are punished.",
          "Even blessing loudly too early can be counted as a curse. Wisdom cares about timing and manner.",
        ],
      },
      {
        range: "15-22",
        heading: "🏠 Sharpened By Others",
        body: [
          "A contentious woman is compared to continual dripping on a rainy day. Again, the point is the misery of constant conflict in a home.",
          "Iron sharpens iron, so a man sharpens the countenance of his friend.",
          "This is one of the chapter's most famous lines. People shape people.",
          "The servant who keeps the fig tree eats its fruit. Faithful service has a harvest.",
          "As water reflects face, so the heart of man reflects man. The inner life eventually shows.",
          "Hell and destruction are never full, and neither are the eyes of man. Human desire keeps reaching.",
          "The fining pot and furnace test metals, and a man is tested by praise. Praise reveals whether humility is real.",
          "Even if a fool is crushed in a mortar, folly may not depart. Some hearts resist even severe correction.",
        ],
      },
      {
        range: "23-27",
        heading: "🐑 Know What Is Entrusted To You",
        body: [
          "The chapter ends with stewardship.",
          "Be diligent to know the state of your flocks and look well to your herds.",
          "Riches are not forever. Crowns do not endure to every generation.",
          "That means responsibility must be watched, not assumed.",
          "The grass, herbs, lambs, goats, milk, food, and household provision show ordinary faithfulness.",
          "Wisdom is not only dramatic decisions. It is paying attention to what God has placed under your care.",
          "Neglect assumes things will stay fine. Wisdom checks the flock.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 27 teaches humble awareness.",
      "Do not presume on tomorrow, do not praise yourself, receive faithful wounds, value counsel, let friends sharpen you, and pay attention to what has been entrusted to your care.",
    ],
  },
  28: {
    title: "🦁 Boldness, Justice, And Hidden Sin",
    intro: [
      "Proverbs 28 is a chapter about righteousness in public and private.",
      "It talks about boldness, law, poverty, rulers, confession, oppression, greed, prayer, and hidden sin.",
      "The chapter is not soft on corruption. Wicked rulers, unjust gain, and people who turn away from God's law are exposed clearly.",
      "But it also offers mercy: whoever confesses and forsakes sin will have mercy.",
    ],
    flow: [
      "🦁 Verses 1-8: Righteous boldness, law, rulers, and unjust gain",
      "🙏 Verses 9-14: Prayer, deception, confession, and holy fear",
      "👑 Verses 15-20: Oppressive rulers, integrity, and faithful work",
      "💰 Verses 21-28: Partiality, greed, rebuke, trust, giving, and hiding",
    ],
    sections: [
      {
        range: "1-8",
        heading: "🦁 Righteous Boldness",
        body: [
          "The wicked flee when no one pursues, but the righteous are bold as a lion.",
          "This is not arrogance. It is the confidence of a conscience not constantly running from hidden guilt.",
          "The chapter connects national instability with transgression and wise leadership with endurance.",
          "Those who forsake the law praise the wicked, but those who keep the law contend with them.",
          "Neutrality toward evil is not wisdom.",
          "Evil people do not understand judgment, but those who seek the Lord understand all things needed for righteous living.",
          "Better to be poor and upright than crooked and rich.",
          "Unjust gain is temporary because God can redirect it toward those who pity the poor.",
        ],
      },
      {
        range: "9-14",
        heading: "🙏 Confession And Mercy",
        body: [
          "The one who turns away his ear from hearing the law has prayer that is abomination.",
          "That is serious. Prayer is not a substitute for a heart that refuses God's instruction.",
          "The chapter warns against leading the righteous astray and exposes the self-deception of the rich who think themselves wise.",
          "When righteous people rejoice, there is glory. When wicked people rise, people hide.",
          "Then comes one of the most important verses in Proverbs: whoever covers his sins shall not prosper, but whoever confesses and forsakes them shall have mercy.",
          "Covering sin is not the same as being forgiven. Hiding keeps the wound infected.",
          "Confession and forsaking open the door to mercy.",
          "Happy is the person who fears always, but the one who hardens his heart falls into mischief.",
        ],
      },
      {
        range: "15-20",
        heading: "👑 When Power Becomes Predatory",
        body: [
          "A wicked ruler over poor people is compared to a roaring lion and ranging bear.",
          "Power without understanding becomes predatory.",
          "A prince who lacks understanding becomes an oppressor, but hating covetousness prolongs days.",
          "The person fleeing bloodguilt should not be stopped because justice matters.",
          "Integrity preserves. Perverseness eventually causes a fall.",
          "The one who tills land has plenty of bread, but following vain people brings poverty.",
          "A faithful person abounds with blessings, while haste to be rich brings guilt and trouble.",
        ],
      },
      {
        range: "21-28",
        heading: "💰 Greed, Trust, And Giving",
        body: [
          "Respecting persons is not good, even for a piece of bread.",
          "Partiality corrupts justice in both big and small ways.",
          "The person with an evil eye hastes after riches and does not see poverty coming.",
          "Rebuke may be hard, but later it can bring more favor than flattery.",
          "Stealing from parents and calling it no transgression is the companion of destruction.",
          "Pride stirs strife, but trusting in the Lord brings blessing.",
          "The one who trusts his own heart is a fool, but the one who walks wisely is delivered.",
          "Giving to the poor leads away from lack, but hiding the eyes brings many curses.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 28 teaches that righteousness creates boldness, confession opens mercy, oppression corrupts power, greed blinds, and trusting your own heart is dangerous.",
      "The wise person hears God's law, walks in integrity, and refuses to hide from truth.",
    ],
  },
  29: {
    title: "⚖️ Leadership, Correction, And The Fear Of Man",
    intro: [
      "Proverbs 29 continues the themes of correction, justice, rulers, anger, parenting, speech, and fear.",
      "The chapter is very concerned with leadership and public life, but it also comes home to children, servants, fools, and personal anger.",
      "One of its central lines is that the fear of man brings a snare, but whoever puts trust in the Lord shall be safe.",
      "Wisdom is learning whose approval has the power to direct you.",
    ],
    flow: [
      "🛠️ Verses 1-7: Correction, righteous rule, companions, and justice for the poor",
      "🔥 Verses 8-14: Scorners, fools, bloodthirsty people, rulers, and truth",
      "👨‍👦 Verses 15-21: Parenting, servants, vision, and instruction",
      "🪤 Verses 22-27: Anger, pride, fear of man, trust in the Lord, and justice",
    ],
    sections: [
      {
        range: "1-7",
        heading: "🛠️ Correction Ignored Too Long",
        body: [
          "The chapter opens with a frightening warning: the person often reproved who hardens his neck will suddenly be destroyed without remedy.",
          "Correction is mercy before collapse.",
          "When righteous people are in authority, the people rejoice. When the wicked rule, people mourn.",
          "Wisdom affects public life.",
          "The chapter warns against keeping company with harlots and wasting substance, while justice establishes the land.",
          "Flattery spreads a net for the feet.",
          "The righteous considers the cause of the poor, but the wicked does not regard it.",
          "Justice for the poor is not optional in biblical wisdom. It reveals whether righteousness is real.",
        ],
      },
      {
        range: "8-14",
        heading: "🔥 Fools Set Cities On Fire",
        body: [
          "Scornful people bring a city into a snare, but wise people turn away wrath.",
          "This shows how destructive mockery can become publicly.",
          "If a wise person contends with a foolish person, whether the fool rages or laughs, there is no rest.",
          "Fools pour out all their mind, but wise people keep it in until afterward.",
          "That does not mean wise people hide truth. It means they are not ruled by every impulse.",
          "If a ruler listens to lies, his servants become wicked. Leadership multiplies what it tolerates.",
          "The poor and deceitful meet together, and the Lord lightens both their eyes.",
          "A king who judges the poor faithfully has a throne established.",
        ],
      },
      {
        range: "15-21",
        heading: "👨‍👦 Correction And Vision",
        body: [
          "The rod and reproof give wisdom, but a child left to himself brings shame.",
          "Again, the point is loving formation, not harshness.",
          "Where the wicked multiply, transgression increases, but the righteous will see their fall.",
          "Correct thy son, and he shall give rest and delight to thy soul.",
          "Where there is no vision, the people perish. In context, this points to prophetic instruction, revealed guidance, and God's law.",
          "Blessed is the one who keeps the law.",
          "The section also talks about servants who cannot be corrected by words only and the danger of bringing someone up without discipline.",
          "Wisdom understands that people need guidance, correction, and boundaries.",
        ],
      },
      {
        range: "22-27",
        heading: "🪤 The Fear Of Man",
        body: [
          "An angry person stirs strife and abounds in transgression.",
          "Pride brings a person low, but honor upholds the humble in spirit.",
          "Partnership with thieves shows self-hatred because it places the soul in danger.",
          "Then comes the famous warning: the fear of man brings a snare, but whoever puts trust in the Lord shall be safe.",
          "Fear of man is not just being nervous around people. It is letting human approval, rejection, pressure, or threat control obedience.",
          "Many seek the ruler's favor, but judgment comes from the Lord.",
          "The chapter ends with mutual moral opposition: the unjust are an abomination to the just, and the upright are an abomination to the wicked.",
          "Wisdom accepts that righteousness will not be loved by everyone.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 29 teaches that correction, justice, righteous leadership, disciplined speech, wise parenting, and trust in the Lord preserve a life and a people.",
      "The fear of man is a trap, but the fear of the Lord makes a person steady.",
    ],
  },
  30: {
    title: "🙏 Agur's Humble Wisdom",
    intro: [
      "Proverbs 30 introduces a different voice: Agur.",
      "After many sayings connected to Solomon, this chapter slows down with humility, wonder, confession, prayer, and observations from creation.",
      "Agur does not begin by showing off wisdom. He begins by admitting limits.",
      "That is part of what makes the chapter powerful. True wisdom is not pretending to know everything. True wisdom knows how small we are before God.",
    ],
    flow: [
      "🙏 Verses 1-6: Agur confesses his limits and honors God's pure word",
      "⚖️ Verses 7-14: A prayer for truth, contentment, and moral clarity",
      "👀 Verses 15-23: Things never satisfied and things that shake the earth",
      "🐜 Verses 24-33: Small creatures, stately things, and the danger of stirring strife",
    ],
    sections: [
      {
        range: "1-6",
        heading: "🙏 I Do Not Know Everything",
        body: [
          "Agur begins with a confession of limitation.",
          "He says he is more brutish than any man and does not have the understanding of a man.",
          "This is not self-hatred. It is humility before the greatness of God.",
          "He asks who has ascended into heaven, gathered the wind, bound the waters, established the ends of the earth.",
          "The implied answer is God.",
          "Then he says every word of God is pure, and God is a shield to those who trust Him.",
          "Do not add to His words.",
          "Humility before God produces reverence for God's word.",
        ],
      },
      {
        range: "7-14",
        heading: "⚖️ Neither Poverty Nor Riches",
        body: [
          "Agur asks two things: remove vanity and lies, and give him neither poverty nor riches.",
          "That prayer is deeply wise.",
          "He knows riches could tempt him to say, Who is the Lord? He knows poverty could tempt him to steal and dishonor God's name.",
          "He is asking for a life that helps him remain faithful.",
          "This is different from praying only for more. It is praying for the condition that best protects the heart.",
          "The section then warns against accusing servants, cursing parents, being pure in your own eyes while unwashed, prideful eyes, and devouring the poor.",
          "Agur sees moral ugliness clearly because humility before God sharpens moral sight.",
        ],
      },
      {
        range: "15-23",
        heading: "👀 Things That Are Never Full",
        body: [
          "Agur begins using numbered sayings.",
          "The grave, barren womb, thirsty earth, and fire are never satisfied.",
          "This is wisdom through observation. Creation and human life teach if we pay attention.",
          "He warns about mocking parents with a severe image of judgment.",
          "Then he lists things too wonderful: an eagle in the air, a serpent on a rock, a ship in the sea, and the way of a man with a maid.",
          "Some things leave little trace but carry mystery.",
          "He also exposes the adulterous woman who eats, wipes her mouth, and says she has done no wickedness.",
          "Sin can become so casual that guilt is wiped away like crumbs.",
          "Then he names things that unsettle the earth, showing that certain reversals and abuses of position create disorder.",
        ],
      },
      {
        range: "24-33",
        heading: "🐜 Small Things With Great Wisdom",
        body: [
          "Agur looks at small creatures: ants, conies, locusts, and spiders or lizards depending on translation traditions.",
          "They are little, but exceedingly wise.",
          "Ants prepare food. Conies make homes in rocks. Locusts move in order without a king. The spider takes hold and reaches palaces.",
          "Wisdom is not always loud or large.",
          "Then Agur observes stately movement: lion, greyhound, he goat, and king.",
          "The chapter ends by warning against lifting yourself up and stirring anger.",
          "Just as churning milk brings butter and wringing the nose brings blood, forcing wrath brings strife.",
          "Wisdom learns from the world God made and from the consequences of human behavior.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 30 teaches humble wisdom.",
      "Agur confesses limits, honors God's word, prays for truth and contentment, observes creation, and warns against pride.",
      "The chapter asks whether your wisdom begins with humility or with showing off what you think you know.",
    ],
  },
  31: {
    title: "👑 Lemuel, Justice, And Wisdom Embodied",
    intro: [
      "Proverbs 31 closes the book with wisdom from a mother to King Lemuel.",
      "That matters. After so much father-to-son instruction, the final chapter honors a mother's voice.",
      "The chapter begins with warnings for a king and a call to defend the vulnerable. Then it ends with the famous portrait of the virtuous woman.",
      "This ending is not random. Proverbs has been teaching wisdom for speech, money, work, justice, home, desire, discipline, and fear of the Lord.",
      "Now the book closes by showing wisdom embodied in a life.",
    ],
    flow: [
      "👑 Verses 1-9: A mother's warning to a king about strength, wine, and justice",
      "💎 Verses 10-18: The virtuous woman is valuable, trustworthy, diligent, and wise in provision",
      "🤲 Verses 19-27: Her wisdom reaches work, mercy, household strength, speech, and oversight",
      "🌿 Verses 28-31: Her children, husband, and works praise her because she fears the Lord",
    ],
    sections: [
      {
        range: "1-9",
        heading: "👑 A Mother Teaches The King",
        body: [
          "The chapter opens with the words of King Lemuel, taught by his mother.",
          "Her first concern is that he not give his strength to women or ways that destroy kings.",
          "This is not an attack on women. It is a warning against wasting royal strength in uncontrolled desire and destructive relationships.",
          "She also warns against wine and strong drink for kings because impaired judgment can make rulers forget the law and pervert the judgment of the afflicted.",
          "Leadership requires clarity.",
          "Then she gives a direct command: open thy mouth for the dumb, for those appointed to destruction, and judge righteously.",
          "Biblical wisdom does not allow power to serve only itself.",
          "A king must defend the poor and needy.",
        ],
      },
      {
        range: "10-18",
        heading: "💎 A Woman More Valuable Than Rubies",
        body: [
          "The virtuous woman is introduced as rare and valuable, with a price far above rubies.",
          "This is not meant to crush women with impossible pressure. It is a wisdom portrait.",
          "The husband safely trusts in her because her character is reliable.",
          "She does good and not evil. She works willingly. She brings food from afar, rises while it is night, gives meat to her household, considers a field, buys it, and plants a vineyard.",
          "This is active wisdom.",
          "She is not passive, decorative, or shallow.",
          "She is thoughtful, strong, productive, and discerning.",
          "Her candle does not go out by night because she is watchful over what has been entrusted to her.",
        ],
      },
      {
        range: "19-27",
        heading: "🤲 Strength, Mercy, And Wise Speech",
        body: [
          "Her hands work with the spindle and distaff, but they also stretch out to the poor and needy.",
          "Wisdom in Proverbs always connects diligence with mercy.",
          "She prepares her household, is clothed with strength and honor, makes and sells garments, and opens her mouth with wisdom.",
          "The law of kindness is in her tongue.",
          "That line is beautiful because her wisdom is not only in productivity. It is in speech shaped by kindness.",
          "She looks well to the ways of her household and does not eat the bread of idleness.",
          "This portrait gathers many Proverbs themes: work, generosity, speech, planning, strength, dignity, and household faithfulness.",
        ],
      },
      {
        range: "28-31",
        heading: "🌿 The Fear Of The Lord At The Center",
        body: [
          "Her children rise up and call her blessed. Her husband praises her.",
          "Many daughters have done virtuously, but she excels them all.",
          "Then the chapter gives the foundation: favor is deceitful, beauty is vain, but a woman who fears the Lord shall be praised.",
          "This is the heart of the portrait.",
          "The Proverbs 31 woman is not praised because she performs perfectly or because she is impressive by worldly standards.",
          "She is praised because wisdom has become visible in her life, and that wisdom is rooted in the fear of the Lord.",
          "The book ends by saying to give her the fruit of her hands and let her own works praise her in the gates.",
          "Wisdom eventually becomes visible enough to speak for itself.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 31 closes the book by showing wisdom in leadership and in embodied daily faithfulness.",
      "A king must use power for justice, and the virtuous woman shows wisdom lived through work, mercy, speech, strength, dignity, and fear of the Lord.",
      "The final lesson of Proverbs is not merely to admire wisdom. It is to become the kind of person whose life displays it.",
    ],
  },
};
