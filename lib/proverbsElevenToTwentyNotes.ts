import {
  deepenProverbsIntro,
  deepenProverbsSection,
  deepenProverbsTakeaway,
} from "./proverbsDeepStudyRenderer";

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

export function renderProverbsNotes(chapter: number, verses: Verse[]) {
  const template = PROVERBS_ELEVEN_TO_TWENTY_TEMPLATES[chapter];

  if (!template) {
    throw new Error(`Missing Proverbs notes template for chapter ${chapter}.`);
  }

  const intro = deepenProverbsIntro(chapter, template.title, template.intro);
  const takeaway = deepenProverbsTakeaway(chapter, template.takeaway);

  return `# ${template.title}

${intro.join("\n\n")}

## 📍 The Chapter Flow

${template.flow.map((line) => `- ${line}`).join("\n")}

${template.sections
  .map((section) => {
    const sectionVerses = versesForRange(verses, section.range);

    return `## 📖 Proverbs ${chapter}:${section.range}

${renderVerseBlock(sectionVerses)}

## ${section.heading}

${deepenProverbsSection({
  chapter,
  title: template.title,
  range: section.range,
  heading: section.heading,
  body: section.body,
}).join("\n\n")}
`;
  })
  .join("\n\n")}

## 💡 The Big Lesson of Proverbs ${chapter}

${takeaway.join("\n\n")}
`;
}

export const PROVERBS_ELEVEN_TO_TWENTY_TEMPLATES: Record<number, ChapterTemplate> = {
  11: {
    title: "⚖️ Integrity When Nobody Is Looking",
    intro: [
      "Proverbs 11 keeps pressing on the difference between a life that looks successful and a life that is actually upright before God.",
      "This chapter talks about honest scales, pride, speech, generosity, beauty without discretion, trust in riches, and the way a household can either be strengthened or troubled from the inside.",
      "The thread running through the chapter is integrity.",
      "Integrity is what holds a life together when no one is forcing you to do right.",
      "Solomon shows that righteousness is not just a private belief. It affects business, neighbors, cities, money, reputation, and the people living under your roof.",
    ],
    flow: [
      "⚖️ Verses 1-8: Honest character outlasts pride, riches, and wicked schemes",
      "🗣️ Verses 9-15: Speech can destroy a neighbor or strengthen a city",
      "🤲 Verses 16-21: Mercy, righteousness, and uprightness shape the soul",
      "💰 Verses 22-26: Beauty, generosity, and withholding reveal the heart",
      "🌳 Verses 27-31: What you seek becomes the harvest you receive",
    ],
    sections: [
      {
        range: "1-8",
        heading: "⚖️ A Just Weight",
        body: [
          "The chapter opens with a marketplace image: a false balance and a just weight.",
          "That means wisdom is not only about prayer, words, or public reputation. It reaches into business, fairness, and the way people handle advantage.",
          "A false balance is an abomination because it uses hidden dishonesty to take more than is right.",
          "God cares about what happens when the buyer cannot see the scale.",
          "Then Solomon moves to pride and humility. Pride brings shame because pride makes a person heavier in their own eyes than they really are. Humility makes room for wisdom because it can still listen.",
          "Riches cannot rescue a person in the day of wrath. Integrity and righteousness matter more than what can be counted.",
          "This section teaches that uprightness guides a person from the inside, while wickedness eventually trips over itself.",
        ],
      },
      {
        range: "9-15",
        heading: "🗣️ Words That Shape A City",
        body: [
          "Solomon now focuses on speech.",
          "A hypocrite destroys his neighbor with his mouth, but knowledge delivers the just.",
          "Words are never treated as lightweight in Proverbs. They can tear down a neighbor, expose secrets, overthrow a city, or strengthen public life.",
          "The city rejoices when righteousness flourishes because righteous people do not only bless themselves. Their lives create stability around them.",
          "A talebearer reveals secrets, but a faithful spirit knows how to conceal a matter.",
          "This is not about covering sin that needs justice. It is about being trustworthy with what should not be spread.",
          "Solomon also returns to counsel and surety. A wise community needs many counselors, and a wise person avoids reckless financial entanglements that can crush them later.",
        ],
      },
      {
        range: "16-21",
        heading: "🤲 The Soul Is Shaped By Mercy",
        body: [
          "Verse 17 is one of the quiet treasures of the chapter: the merciful man does good to his own soul.",
          "Mercy is not only good for the person receiving it. Mercy forms the person giving it.",
          "Cruelty works the other direction. It troubles a person's own flesh.",
          "Solomon shows that wickedness is not only something you do outwardly. It changes what is happening inside you.",
          "Righteousness tends to life. Evil pursued long enough becomes death.",
          "The froward heart is crooked, twisted away from what is straight. But the upright way delights the Lord.",
          "This section teaches that character is never neutral. Every pattern is shaping the soul toward life or toward ruin.",
        ],
      },
      {
        range: "22-26",
        heading: "💰 Beauty, Generosity, And The Open Hand",
        body: [
          "Solomon gives a vivid image: a jewel of gold in a swine's snout.",
          "The point is not that beauty is bad. The point is that beauty without discretion is out of place.",
          "Outer appearance cannot replace inner wisdom.",
          "Then the chapter turns to desire, scattering, withholding, and water.",
          "There is a kind of generosity that increases because it participates in the wisdom of open-handed righteousness.",
          "There is also a kind of withholding that feels protective but actually tends toward poverty.",
          "The person who waters others is watered also. The person who withholds corn in a time of need becomes a curse to the people.",
          "Wisdom knows the difference between stewardship and selfishness.",
        ],
      },
      {
        range: "27-31",
        heading: "🌳 The Harvest Of What You Seek",
        body: [
          "The final verses focus on seeking and trusting.",
          "The one who diligently seeks good procures favor, but the one who seeks mischief finds it coming back on him.",
          "That is one of the patterns of Proverbs: what you chase eventually finds you.",
          "Trusting riches leads to a fall because money is too small to carry the weight of a soul.",
          "The righteous flourish like a branch because their life is rooted somewhere deeper than their bank account.",
          "The one who troubles his own house inherits the wind. That image shows emptiness. You can win outside and still lose inside your own home.",
          "The fruit of the righteous is a tree of life, and wisdom reaches beyond the self. It becomes life-giving to others.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 11 teaches that integrity is bigger than appearing moral.",
      "It shows up in money, speech, mercy, generosity, reputation, and home life.",
      "The chapter asks whether your life is held together by uprightness or by whatever you can get away with.",
    ],
  },
  12: {
    title: "🧱 The Steady Life Of The Righteous",
    intro: [
      "Proverbs 12 is about the kind of life that can stand.",
      "It compares people who love instruction with people who hate correction, homes built on righteousness with lives weakened by wickedness, and speech that heals with speech that cuts.",
      "This chapter is very practical.",
      "It talks about work, animals, lies, anxiety, diligence, counsel, and the difference between sounding right and actually being wise.",
      "The main picture is stability. Righteousness gives roots. Foolishness keeps pulling the house up from underneath itself.",
    ],
    flow: [
      "📚 Verses 1-8: Correction, righteousness, and words reveal the heart",
      "🐂 Verses 9-14: Work, mercy, speech, and fruit",
      "👂 Verses 15-22: The wise listen, speak truth, and reject lies",
      "🌱 Verses 23-28: Diligence, anxiety, companionship, and the path of life",
    ],
    sections: [
      {
        range: "1-8",
        heading: "📚 Loving Correction",
        body: [
          "The first verse is blunt: whoever loves instruction loves knowledge, but the one who hates reproof is brutish.",
          "Proverbs does not flatter people who refuse correction.",
          "A wise person can be corrected because they want truth more than ego.",
          "The chapter then contrasts favor from the Lord with condemnation, establishment with instability, and a virtuous woman with rottenness in the bones.",
          "This is about what strengthens a life from within.",
          "Wickedness may look forceful, but it does not establish a person.",
          "The root of the righteous cannot be moved because righteousness gives a deeper foundation than image, noise, or manipulation.",
        ],
      },
      {
        range: "9-14",
        heading: "🐂 Work, Mercy, And Fruit",
        body: [
          "This section moves into ordinary life.",
          "Better to be humble and have what is needed than to pretend greatness while lacking bread.",
          "The righteous person even regards the life of his beast. That means wisdom produces mercy down to the level of how power treats the vulnerable.",
          "The person who tills his land is satisfied with bread, while the one who follows vain people lacks understanding.",
          "Proverbs values grounded faithfulness over fantasy.",
          "Then Solomon returns to speech. A person can be trapped by the transgression of his lips, but the righteous come through trouble.",
          "The fruit of the mouth and the work of the hands both matter. Words and labor both harvest something.",
        ],
      },
      {
        range: "15-22",
        heading: "👂 The Wise Can Listen",
        body: [
          "Verse 15 gives a major Proverbs theme: the way of a fool is right in his own eyes, but the wise listens to counsel.",
          "Foolishness is not only making bad choices. It is being unable to question yourself.",
          "The chapter contrasts rash anger with prudence, truth with deceit, and cutting speech with healing speech.",
          "There is that speaketh like the piercings of a sword, but the tongue of the wise is health.",
          "That line shows the power of words.",
          "Some words wound because they are reckless, cruel, or careless.",
          "Wise words heal because they are truthful, timely, and guided by love.",
          "Lying lips are an abomination to the Lord, but those who deal truly are His delight.",
        ],
      },
      {
        range: "23-28",
        heading: "🌱 The Path That Leads To Life",
        body: [
          "The prudent person does not need to display everything they know.",
          "Fools announce folly because they cannot keep it in.",
          "Diligence is contrasted with slothfulness, and anxiety is answered by a good word.",
          "That is a deeply human moment. Heaviness in the heart makes it stoop, but a good word makes it glad.",
          "Wisdom is not only about commands. It understands emotional weight.",
          "The righteous is more excellent than his neighbor, but the way of the wicked seduces them.",
          "The chapter ends with the path of righteousness leading to life.",
          "Solomon wants the son to see that every ordinary choice is part of a road.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 12 teaches that stable lives are built through correction, truthful speech, faithful work, mercy, and righteousness.",
      "The fool is loud and self-certain, but the wise person can listen, work, speak healing, and walk a path that leads to life.",
    ],
  },
  13: {
    title: "🌱 Discipline, Desire, And The Long Road",
    intro: [
      "Proverbs 13 keeps looking at long-term outcomes.",
      "It talks about discipline, speech, wealth, hope deferred, the word of God, companions, inheritance, and the difference between quick desire and wise restraint.",
      "This chapter is about the future hidden inside present choices.",
      "A person may not see the harvest immediately, but Proverbs keeps reminding us that paths have destinations.",
    ],
    flow: [
      "👂 Verses 1-6: Instruction, speech, diligence, and righteousness guard life",
      "💰 Verses 7-12: Wealth, pride, hope, and desire",
      "📖 Verses 13-18: The word, wisdom's law, and correction",
      "🚶 Verses 19-25: Companions, inheritance, discipline, and provision",
    ],
    sections: [
      {
        range: "1-6",
        heading: "👂 The Disciplined Ear",
        body: [
          "The chapter opens with a son who hears instruction and a scorner who refuses rebuke.",
          "Again, the response to correction reveals the person.",
          "The mouth appears immediately because speech either feeds a life or opens it to violence.",
          "Guarding the mouth preserves life. Opening the lips carelessly can become destruction.",
          "Solomon also contrasts the sluggard's desire with the diligent soul being made fat.",
          "Desire alone does not build a life.",
          "The sluggard wants but does not act wisely. The diligent person desires and works in season.",
          "Righteousness keeps the upright, while wickedness overthrows the sinner. Character is a guardrail.",
        ],
      },
      {
        range: "7-12",
        heading: "💰 What Looks Rich And What Is Rich",
        body: [
          "Verse 7 exposes appearances.",
          "Some make themselves rich and have nothing. Others make themselves poor and have great riches.",
          "Proverbs knows that image and reality are not always the same.",
          "The chapter then contrasts ransom, light, pride, counsel, and wealth gotten by vanity.",
          "Only by pride comes contention. Pride does not merely live inside a person; it leaks into conflict.",
          "Wealth gained by vanity diminishes, but gathering by labor increases.",
          "Hope deferred makes the heart sick, but desire coming is a tree of life.",
          "This verse understands the ache of waiting. Wisdom does not deny that delayed hope hurts, but it still teaches faithful patience.",
        ],
      },
      {
        range: "13-18",
        heading: "📖 The Word And The Way",
        body: [
          "Despising the word brings destruction, while fearing the commandment brings reward.",
          "This is not about superstition. It is about whether a person treats God's instruction as weighty.",
          "The law of the wise is a fountain of life because it helps a person depart from the snares of death.",
          "Good understanding gives favor, but the way of transgressors is hard.",
          "That is one of the great corrections Proverbs gives: sin may look easier at first, but its road is hard.",
          "A faithful messenger brings health, while a wicked messenger falls into mischief.",
          "Poverty and shame come to the one who refuses instruction, but honor comes to the one who regards reproof.",
        ],
      },
      {
        range: "19-25",
        heading: "🚶 Who You Walk With Matters",
        body: [
          "Desire accomplished is sweet, but fools still refuse to depart from evil.",
          "Then comes a famous proverb: walk with wise men and be wise, but a companion of fools shall be destroyed.",
          "Your companions are not neutral.",
          "They train your loves, normalize your choices, and shape your future.",
          "The chapter also talks about inheritance, discipline, and food.",
          "A good man leaves an inheritance, but the wealth of the sinner is laid up for the just.",
          "The one who spares the rod hates his son, but the one who loves him disciplines him early.",
          "This is not about cruelty. It is about loving correction before folly becomes settled.",
          "The righteous eats to satisfying, but the belly of the wicked wants. Appetite without wisdom is never full.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 13 teaches that discipline is love for the future.",
      "The chapter keeps asking whether today's speech, companions, work, correction, and desires are preparing life or storing up trouble.",
    ],
  },
  14: {
    title: "🏠 Wisdom Builds The House",
    intro: [
      "Proverbs 14 is full of contrasts.",
      "Wise and foolish women, proud and faithful mouths, mockers and prudent people, fear and confidence, mercy and oppression, outward appearances and hidden grief.",
      "The chapter teaches that life is not always what it looks like on the surface.",
      "There is a way that seems right to a man, but the end is death. That line sits near the center of the chapter and helps interpret the whole thing.",
      "Wisdom learns to look past first impressions and ask where a path is actually going.",
    ],
    flow: [
      "🏠 Verses 1-9: Wisdom builds while folly tears down",
      "❤️ Verses 10-15: The heart knows hidden sorrow, and the simple believe too easily",
      "⚖️ Verses 16-24: Fear, anger, mercy, and prudence reveal character",
      "🛡️ Verses 25-35: Truth, fear of the Lord, mercy, and righteousness strengthen people",
    ],
    sections: [
      {
        range: "1-9",
        heading: "🏠 Building Or Tearing Down",
        body: [
          "The first verse gives a household picture: a wise woman builds her house, but a foolish woman tears it down with her own hands.",
          "This is not only about construction. It is about influence.",
          "Wisdom can build an atmosphere, a family, a pattern, and a future. Folly can dismantle those same things from the inside.",
          "The chapter quickly moves through walking uprightly, the mouth of fools, the value of the ox for harvest, faithful witnesses, and mockers.",
          "The ox may make the crib less clean, but by its strength there is much increase. That proverb teaches that productive life is not always tidy.",
          "The mocker seeks wisdom and does not find it because their posture blocks learning.",
          "Foolishness is not only lack of information. It can be a heart that refuses to receive truth.",
        ],
      },
      {
        range: "10-15",
        heading: "❤️ What The Heart Knows",
        body: [
          "Verse 10 is deeply honest: the heart knows its own bitterness, and a stranger does not intermeddle with its joy.",
          "People carry inner worlds others cannot fully see.",
          "Proverbs understands hidden sorrow and private joy.",
          "Then the chapter contrasts houses, hearts, and paths.",
          "There is a way that seems right to a man, but the end is death.",
          "That means sincerity alone is not enough. A path can feel right and still lead wrong.",
          "The simple believes every word, but the prudent looks well to his going.",
          "Wisdom slows down enough to examine where a road is headed.",
        ],
      },
      {
        range: "16-24",
        heading: "⚖️ Fear, Anger, And Mercy",
        body: [
          "A wise person fears and departs from evil.",
          "The fool rages and is confident.",
          "That contrast matters because confidence can be foolish when it refuses reverence.",
          "Solomon warns against quick anger, wicked devices, and treating poor neighbors with contempt.",
          "Verse 21 says the one who has mercy on the poor is happy.",
          "This shows again that wisdom is not only cleverness. It is moral.",
          "Devising evil leads to wandering, while mercy and truth belong to those who devise good.",
          "Labor brings profit, but talk alone tends to poverty. Wisdom acts; folly only talks.",
        ],
      },
      {
        range: "25-35",
        heading: "🛡️ What Strengthens A People",
        body: [
          "The final section moves from individuals to households, nations, rulers, and the poor.",
          "A true witness delivers souls. Lies betray people.",
          "The fear of the Lord is strong confidence and a fountain of life.",
          "That means reverence does not make a person fragile. It gives stability because the heart is anchored in God.",
          "A sound heart is life to the flesh, but envy rots the bones.",
          "Oppressing the poor reproaches the Maker because the poor bear God's image.",
          "Righteousness exalts a nation, but sin is a reproach to any people.",
          "This chapter shows that wisdom has public consequences. Nations, rulers, servants, and communities are all affected by righteousness or sin.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 14 teaches that wisdom sees beyond appearances.",
      "It asks whether a house is being built or torn down, whether a path only seems right, whether the heart is ruled by envy or reverence, and whether a people are being exalted by righteousness or weakened by sin.",
    ],
  },
  15: {
    title: "🗣️ The Gentle Answer And The Listening Heart",
    intro: [
      "Proverbs 15 is one of the strongest chapters in Proverbs on speech.",
      "A soft answer, grievous words, healing tongues, truthful lips, prayer, correction, counsel, and the fear of the Lord all appear here.",
      "The chapter teaches that words are spiritual tools.",
      "They can turn away wrath or stir anger. They can be a tree of life or a breach in the spirit.",
      "But Proverbs 15 is not only about talking better. It is about having a heart humble enough to receive correction and fear the Lord.",
    ],
    flow: [
      "🗣️ Verses 1-7: Words can calm, heal, or wound",
      "🙏 Verses 8-14: The Lord sees worship, prayer, correction, and the heart",
      "🍽️ Verses 15-24: Better is little with fear of the Lord than abundance with trouble",
      "🏠 Verses 25-33: God defends humility, hears the righteous, and teaches through correction",
    ],
    sections: [
      {
        range: "1-7",
        heading: "🗣️ Words That Turn The Temperature",
        body: [
          "The chapter opens with a famous contrast: a soft answer turns away wrath, but grievous words stir up anger.",
          "Solomon is not saying tone fixes every conflict.",
          "He is saying words affect the temperature of a moment.",
          "Some words pour water on fire. Other words pour fuel.",
          "The tongue of the wise uses knowledge rightly, but the mouth of fools pours out foolishness.",
          "A wholesome tongue is a tree of life, while perverseness breaks the spirit.",
          "That means speech can nourish or crush.",
          "The wise person does not only ask, Is this true? They also ask, Is this wise, timely, and healing?",
        ],
      },
      {
        range: "8-14",
        heading: "🙏 The Lord Sees The Heart",
        body: [
          "Solomon contrasts sacrifice and prayer.",
          "The sacrifice of the wicked is an abomination, but the prayer of the upright is God's delight.",
          "Religious activity cannot cover a crooked heart.",
          "The Lord cares about the way and the heart, not just the visible ritual.",
          "Correction appears again. The scorner does not love the one who reproves him and will not go to the wise.",
          "The heart affects the face, the spirit, and the hunger for knowledge.",
          "A person of understanding seeks knowledge, but fools feed on foolishness.",
          "Everyone is eating something mentally and spiritually. Wisdom asks what your soul is feeding on.",
        ],
      },
      {
        range: "15-24",
        heading: "🍽️ Better With The Fear Of The Lord",
        body: [
          "This section compares outward circumstances with inward condition.",
          "A little with the fear of the Lord is better than great treasure with trouble.",
          "A dinner of herbs with love is better than a stalled ox with hatred.",
          "Proverbs is not romanticizing poverty. It is teaching that abundance cannot replace peace, love, and reverence.",
          "Wrath, laziness, foolishness, counsel, and wise speech all appear here.",
          "Without counsel, purposes are disappointed, but in the multitude of counselors they are established.",
          "A word spoken in due season is good because timing matters.",
          "The path of life is above to the wise, turning them from death beneath.",
        ],
      },
      {
        range: "25-33",
        heading: "🏠 Humility Before Honor",
        body: [
          "The Lord destroys the house of the proud but establishes the border of the widow.",
          "That is a powerful contrast. God opposes pride and protects the vulnerable.",
          "The thoughts of the wicked are an abomination, but pure words are pleasant.",
          "The greedy troubles his own house, while the righteous studies to answer.",
          "That phrase matters. The righteous person does not just react. They consider how to speak.",
          "The Lord hears the prayer of the righteous, and correction becomes a path toward life.",
          "The chapter ends with humility before honor.",
          "Before a person can carry honor well, they must be taught by the fear of the Lord.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 15 teaches that speech flows from the heart and shapes the world around us.",
      "Gentle answers, wise counsel, correction, prayer, humility, and the fear of the Lord all belong together.",
      "The chapter asks whether your words are healing trees or spirit-breaking weapons.",
    ],
  },
  16: {
    title: "👑 Plans, Pride, And The Lord's Rule",
    intro: [
      "Proverbs 16 brings human planning under the sovereignty of God.",
      "People make plans, weigh choices, build paths, speak words, and seek success, but the Lord weighs the spirits, directs steps, and rules over outcomes.",
      "The chapter also focuses heavily on kingship, pride, righteous speech, and the difference between a way that seems right and a path that ends in death.",
      "Solomon is teaching his son that wisdom plans carefully while staying humble before the Lord.",
    ],
    flow: [
      "🙏 Verses 1-9: Human plans belong under the Lord",
      "👑 Verses 10-15: Righteous kingship and just judgment",
      "💎 Verses 16-24: Wisdom, humility, and pleasant words are better than gold",
      "🛣️ Verses 25-33: Dangerous paths, destructive speech, self-control, and God's final rule",
    ],
    sections: [
      {
        range: "1-9",
        heading: "🙏 Plans Under The Lord",
        body: [
          "The chapter begins by putting human planning in its place.",
          "People prepare the heart, but the answer of the tongue is from the Lord.",
          "A person's ways may seem clean in their own eyes, but the Lord weighs the spirits.",
          "That means God sees motives beneath appearances.",
          "Commit thy works unto the Lord, and thy thoughts shall be established.",
          "This is not a magic formula. It is a posture of surrender.",
          "Verse 9 says a man's heart devises his way, but the Lord directs his steps.",
          "Wisdom plans, but it does not pretend to be sovereign.",
        ],
      },
      {
        range: "10-15",
        heading: "👑 The Weight Of Righteous Rule",
        body: [
          "These verses speak about kings.",
          "A king's mouth, throne, scales, wrath, and favor all matter because leadership affects many lives.",
          "A just weight and balance are the Lord's, meaning justice is not invented by rulers. It belongs to God's order.",
          "Kings are to hate wickedness because a throne is established by righteousness.",
          "This is important for Solomon's son, who may inherit authority.",
          "Power is not a toy.",
          "The higher the influence, the more serious the need for wisdom, justice, and truthful speech.",
        ],
      },
      {
        range: "16-24",
        heading: "💎 Better Than Gold",
        body: [
          "Wisdom and understanding are better than gold and silver.",
          "This theme returns because wealth keeps tempting people to mismeasure value.",
          "The highway of the upright is to depart from evil, and the one who keeps his way preserves his soul.",
          "Then comes a famous warning: pride goes before destruction, and a haughty spirit before a fall.",
          "Humility with the lowly is better than dividing spoil with the proud.",
          "Pleasant words are like a honeycomb, sweet to the soul and health to the bones.",
          "Again, Proverbs ties speech to life. Wise words can strengthen the inner person.",
        ],
      },
      {
        range: "25-33",
        heading: "🛣️ The End Of The Road",
        body: [
          "Verse 25 repeats a major warning: there is a way that seems right to a man, but the end is death.",
          "A path can feel right and still be deadly.",
          "The section then warns about ungodly people digging up evil, whisperers separating friends, violent people enticing neighbors, and the danger of subtle signals toward mischief.",
          "Solomon also honors gray hair when it is found in righteousness and praises self-control over military conquest.",
          "He that rules his spirit is better than he that takes a city.",
          "The chapter ends with the lot cast into the lap, but the whole disposing thereof is of the Lord.",
          "Even what looks uncertain to people is not outside God's rule.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 16 teaches that wisdom plans under God's authority.",
      "It warns against pride, crooked speech, unjust leadership, and paths that only seem right.",
      "The wise person works, speaks, leads, and chooses while remembering that the Lord weighs the heart and directs the steps.",
    ],
  },
  17: {
    title: "🔥 The Fire That Tests The Heart",
    intro: [
      "Proverbs 17 is full of family, conflict, speech, friendship, justice, and the testing of the heart.",
      "The chapter shows that wisdom is needed not only in public decisions but also around the table, in arguments, in friendships, and in the way a person responds to offense.",
      "A recurring theme is that God and life expose what is inside.",
      "The fining pot tests silver and the furnace tests gold, but the Lord tries the hearts.",
    ],
    flow: [
      "🏠 Verses 1-6: Peace, testing, family, and legacy",
      "⚖️ Verses 7-15: Speech, gifts, offense, rebellion, and justice",
      "🤝 Verses 16-22: Folly, friendship, surety, and a merry heart",
      "🤐 Verses 23-28: Bribes, wisdom, grief, and restrained speech",
    ],
    sections: [
      {
        range: "1-6",
        heading: "🏠 Better A Quiet House",
        body: [
          "The chapter begins with a quiet house and a stalled house full of strife.",
          "Better is a dry morsel with quietness than a feast with conflict.",
          "Proverbs refuses to measure a home only by abundance.",
          "Peace matters.",
          "Then Solomon speaks of servants, heirs, testing, evil listeners, and mocking the poor.",
          "The Lord tries hearts the way fire tests metal.",
          "That means the hidden center of a person is under God's examination.",
          "Children's children are a crown, and fathers are the glory of children. Wisdom thinks generationally.",
        ],
      },
      {
        range: "7-15",
        heading: "⚖️ Justice And Offense",
        body: [
          "Excellent speech does not fit a fool, and lying lips do not fit a prince.",
          "Words should match character and calling.",
          "The chapter talks about gifts, reproof, rebellion, and the danger of meeting a fool in his folly.",
          "Verse 9 is especially important: the one who covers a transgression seeks love, but the one who repeats a matter separates friends.",
          "Again, this is not about covering abuse or injustice. It is about refusing to weaponize every offense.",
          "A wise person knows when love should cover and when justice must confront.",
          "Verse 15 says justifying the wicked and condemning the just are both abomination to the Lord.",
          "God cares deeply about moral clarity.",
        ],
      },
      {
        range: "16-22",
        heading: "🤝 Friendship, Folly, And The Heart",
        body: [
          "Solomon asks why a fool has a price in his hand to get wisdom when he has no heart for it.",
          "Access to wisdom is not the same as appetite for wisdom.",
          "A friend loves at all times, and a brother is born for adversity.",
          "That line gives a beautiful picture of covenant loyalty.",
          "Then the chapter warns against empty surety, loving transgression, crooked hearts, and the grief caused by foolish children.",
          "A merry heart does good like medicine, but a broken spirit dries the bones.",
          "Proverbs understands that the inner life affects the whole person.",
        ],
      },
      {
        range: "23-28",
        heading: "🤐 The Wisdom Of Restraint",
        body: [
          "The final section warns against bribes, misplaced eyes, grief to parents, punishing the just, and reckless speech.",
          "Wisdom is before the person with understanding, but the fool's eyes wander to the ends of the earth.",
          "That means the wise person sees what is near and necessary, while the fool chases everything else.",
          "The chapter ends with restraint.",
          "Even a fool, when he holds his peace, is counted wise.",
          "There is deep practical wisdom here: not every thought should become a sentence.",
          "Sometimes the wisest word is the one never spoken.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 17 teaches wisdom for homes, friendships, conflicts, justice, and speech.",
      "It asks whether your heart can be tested, whether your words can be trusted, and whether you know when love should cover, justice should confront, and silence should rule.",
    ],
  },
  18: {
    title: "🏰 Words, Wisdom, And The Strong Tower",
    intro: [
      "Proverbs 18 centers heavily on words, isolation, conflict, and security.",
      "The chapter talks about fools who delight in their own hearts, deep waters, talebearers, careless answers, wounded spirits, gifts, quarrels, and the power of the tongue.",
      "Near the middle is a beautiful line: the name of the Lord is a strong tower.",
      "That image shows true safety in contrast with false shelters like pride, wealth, or self-protection.",
    ],
    flow: [
      "🧍 Verses 1-8: Isolation, foolish speech, and talebearing",
      "🏰 Verses 9-16: Sloth, the Lord's name, humility, and gifts",
      "⚖️ Verses 17-24: Hearing both sides, the tongue's power, marriage, and friendship",
    ],
    sections: [
      {
        range: "1-8",
        heading: "🧍 The Fool And His Own Voice",
        body: [
          "The chapter begins with a person who separates himself and seeks his own desire.",
          "This is not healthy solitude. It is self-willed isolation that rages against wisdom.",
          "A fool has no delight in understanding, only in revealing his own heart.",
          "That is painfully clear. The fool does not listen to learn; he talks to display himself.",
          "The words of a person's mouth are compared to waters, and the wellspring of wisdom to a flowing brook.",
          "Then Solomon warns against honoring the wicked, answering foolishly, and talebearing.",
          "The words of a talebearer go down into the innermost parts. Gossip is not harmless. It lodges deep.",
        ],
      },
      {
        range: "9-16",
        heading: "🏰 The Strong Tower",
        body: [
          "Slothfulness is compared to wastefulness because both destroy what should be stewarded.",
          "Then comes the great contrast: the name of the Lord is a strong tower, and the righteous run into it and are safe.",
          "The rich man's wealth is his strong city in his imagination.",
          "That contrast is important. The Lord is actual refuge. Wealth can become an imagined wall.",
          "Before destruction the heart is haughty, and before honor is humility.",
          "Pride builds a false tower. Humility runs to the true one.",
          "The section also warns against answering before hearing and honors the person who seeks knowledge.",
          "Wisdom slows down enough to listen before speaking.",
        ],
      },
      {
        range: "17-24",
        heading: "⚖️ The Power Of The Tongue",
        body: [
          "Verse 17 teaches that the first speaker can seem right until another comes and examines him.",
          "That is wisdom for judgment. Hear both sides.",
          "The chapter then talks about offenses, contentions, the belly being filled by speech, and death and life in the power of the tongue.",
          "That line is one of the strongest statements about speech in Proverbs.",
          "Words can kill hope, damage trust, and stir destruction. Words can also bring life, courage, truth, and healing.",
          "The chapter ends with wife and friendship.",
          "A wife is a good thing and favor from the Lord. A true friend can stick closer than a brother.",
          "Wisdom understands that relationships are gifts and must be handled with truth and care.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 18 teaches that words reveal whether a person is wise, foolish, proud, humble, destructive, or life-giving.",
      "It also teaches that the safest refuge is not wealth, pride, or isolation. The name of the Lord is the strong tower.",
    ],
  },
  19: {
    title: "🧭 Wisdom For Want, Wealth, And The Home",
    intro: [
      "Proverbs 19 looks at poverty, integrity, foolishness, anger, generosity, discipline, counsel, and the fear of the Lord.",
      "The chapter is realistic about life. It knows that poverty brings hardship, wealth attracts friends, fools blame God for their own ruin, and families can carry deep grief.",
      "But the chapter keeps pointing back to character.",
      "Better to be poor with integrity than to have crooked lips. Better to receive counsel than to keep charging ahead in folly.",
    ],
    flow: [
      "⚖️ Verses 1-7: Poverty, integrity, foolishness, and false friendships",
      "🧠 Verses 8-15: Understanding, discretion, anger, favor, and household grief",
      "📖 Verses 16-23: Commandment, mercy, discipline, counsel, and fear of the Lord",
      "😴 Verses 24-29: Laziness, correction, parental dishonor, and judgment",
    ],
    sections: [
      {
        range: "1-7",
        heading: "⚖️ Better Poor With Integrity",
        body: [
          "The chapter opens with a value judgment: better is the poor who walks in integrity than a person with perverse lips who is a fool.",
          "Proverbs refuses to treat money as the highest measure of a person.",
          "Desire without knowledge is not good, and haste causes people to sin.",
          "A foolish person can ruin his way and then rage against the Lord.",
          "That is a common pattern: people reject wisdom, suffer the results, and then blame God.",
          "The chapter is also honest that wealth attracts friends and poverty can isolate.",
          "Solomon is not approving that reality; he is exposing it.",
        ],
      },
      {
        range: "8-15",
        heading: "🧠 Discretion And The House",
        body: [
          "The person who gets wisdom loves his own soul.",
          "Understanding is not merely intellectual. It preserves life.",
          "A false witness will not be unpunished, and delight is not fitting for a fool.",
          "Discretion delays anger, and it is glory to pass over a transgression.",
          "That means maturity is not easily provoked.",
          "The section also speaks of the king's wrath and favor, foolish sons, contentious wives, inheritance, prudence, and slothfulness.",
          "A prudent wife is from the Lord, showing that wisdom in the home is a divine gift.",
          "Slothfulness casts into deep sleep, and idleness leads to hunger. Neglect has consequences.",
        ],
      },
      {
        range: "16-23",
        heading: "📖 Counsel And The Fear Of The Lord",
        body: [
          "Keeping the commandment keeps the soul, while despising God's ways brings death.",
          "Verse 17 says the one who has pity on the poor lends to the Lord.",
          "That is a powerful view of mercy. God identifies with the vulnerable in such a way that generosity toward them is treated as service to Him.",
          "Discipline appears again: chasten your son while there is hope.",
          "The chapter warns against uncontrolled wrath and urges people to hear counsel and receive instruction.",
          "Many devices are in a man's heart, but the counsel of the Lord shall stand.",
          "The fear of the Lord tends to life. It gives a person a settled place to dwell.",
        ],
      },
      {
        range: "24-29",
        heading: "😴 Correction Before Judgment",
        body: [
          "The slothful person hides his hand and will not even bring it back to his mouth.",
          "The image is almost absurd because laziness has become self-defeating.",
          "Solomon then talks about smiting a scorner, reproving one with understanding, and the shame of mistreating parents.",
          "A person who wastes his father and chases away his mother brings shame and reproach.",
          "The chapter ends with warning: stop hearing instruction if you want to err from knowledge.",
          "That line is sharp. If you stop listening to wisdom, wandering is not surprising.",
          "Judgments are prepared for scorners and stripes for the back of fools.",
          "Correction ignored long enough turns into consequences.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 19 teaches that integrity is better than crooked gain, counsel is better than haste, mercy reaches the Lord's heart, and the fear of the Lord tends to life.",
      "The chapter is honest about hardship but refuses to let hardship become an excuse for folly.",
    ],
  },
  20: {
    title: "🕯️ The Lord Searches The Inner Life",
    intro: [
      "Proverbs 20 is wide-ranging but deeply connected.",
      "It talks about wine, kings, strife, laziness, counsel, integrity, honesty, speech, inheritance, vengeance, and the spirit of man as the candle of the Lord.",
      "The chapter repeatedly asks what is really inside a person.",
      "A buyer can pretend. A person can proclaim their own goodness. A child is known by doings. The Lord searches the inward parts.",
      "Wisdom is learning to live honestly before the God who sees beneath the surface.",
    ],
    flow: [
      "🍷 Verses 1-7: Sobriety, strife, diligence, counsel, and integrity",
      "👑 Verses 8-16: Judgment, sin, honest measures, hearing, and pledges",
      "🪨 Verses 17-23: Deceit, counsel, gossip, family dishonor, and vengeance",
      "🕯️ Verses 24-30: The Lord directs steps and searches the inward parts",
    ],
    sections: [
      {
        range: "1-7",
        heading: "🍷 Wisdom That Does Not Lose Control",
        body: [
          "The chapter begins with wine and strong drink.",
          "Wine is a mocker and strong drink is raging. Whoever is deceived by it is not wise.",
          "The issue is being mastered by what should not rule you.",
          "Solomon then speaks of kings, strife, laziness, counsel, self-praise, and integrity.",
          "It is an honor to cease from strife, but fools keep meddling.",
          "The sluggard refuses to plow because of the cold and later has nothing in harvest.",
          "Counsel in the heart of a man is deep water, but understanding draws it out.",
          "The just man walks in integrity, and his children are blessed after him. Integrity leaves a wake.",
        ],
      },
      {
        range: "8-16",
        heading: "👑 Honest Measures And Honest Hearts",
        body: [
          "A king on the throne of judgment scatters evil with his eyes.",
          "Then Solomon asks, Who can say, I have made my heart clean?",
          "That question humbles everyone.",
          "No person is pure by self-declaration.",
          "Divers weights and measures are both abomination to the Lord, returning to God's concern for honest dealing.",
          "Even a child is known by his doings. Character becomes visible early through action.",
          "The hearing ear and seeing eye are made by the Lord, which means perception itself is a gift.",
          "The section also warns against loving sleep, dishonest bargaining, and reckless pledges.",
          "Wisdom handles money and promises carefully.",
        ],
      },
      {
        range: "17-23",
        heading: "🪨 The Gravel After Deceit",
        body: [
          "Bread of deceit is sweet at first, but afterward the mouth is filled with gravel.",
          "That is one of Proverbs' clearest pictures of sin's aftertaste.",
          "The beginning feels pleasant. The ending becomes painful and gritty.",
          "Purposes are established by counsel, and war requires good advice.",
          "Solomon warns against talebearers and flatterers because speech can expose what should be guarded and seduce people into foolishness.",
          "Cursing father or mother brings deep darkness.",
          "An inheritance gotten hastily at the beginning will not be blessed at the end.",
          "The section ends by rejecting revenge and dishonest measures. Wait on the Lord, and He shall save thee.",
        ],
      },
      {
        range: "24-30",
        heading: "🕯️ The Candle Of The Lord",
        body: [
          "A man's goings are of the Lord, so how can a man fully understand his own way?",
          "That is humility.",
          "We make choices, but we do not see the whole map.",
          "The chapter warns against rash vows and honors wise judgment.",
          "Then comes a profound image: the spirit of man is the candle of the Lord, searching all the inward parts.",
          "God's searching reaches beneath public behavior into motives, desires, and hidden places.",
          "Mercy and truth preserve the king, and his throne is upheld by mercy.",
          "The glory of young men is strength, and the beauty of old men is the gray head.",
          "The final verse shows that correction can cleanse away evil. Discipline is painful, but it can reach places comfort does not.",
        ],
      },
    ],
    takeaway: [
      "Proverbs 20 teaches wisdom for self-control, honest dealing, counsel, speech, family honor, patience, and inner examination.",
      "The chapter reminds us that God sees more than appearances. He searches the inward parts and calls people to live truthfully before Him.",
    ],
  },
};

