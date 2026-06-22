import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_27_SECTIONS = [
  {
    reference: "Exodus 21:1-11",
    chapter: 21,
    startVerse: 1,
    endVerse: 11,
    heading: "Laws For Servants In A Redeemed People",
    summary: "God gives laws that limit servitude and protect vulnerable people inside Israel's community.",
    teaching: [
      "Exodus 21 begins right after the Ten Commandments, and the first laws deal with Hebrew servants.",
      "That can feel surprising to modern readers, but it matters because Israel has just come out of slavery. God immediately begins regulating power so His people do not become like Egypt.",
      "These laws are not an endorsement of everything broken in the ancient world. They place limits, protections, release, and responsibility inside a world where debt-servitude existed.",
      "A Hebrew servant is not to be treated as disposable property. There are time limits, family concerns, and legal protections.",
      "The section also gives special protection for a vulnerable woman in a household, showing that covenant law pays attention to people who could easily be mistreated.",
    ],
  },
  {
    reference: "Exodus 21:12-36",
    chapter: 21,
    startVerse: 12,
    endVerse: 36,
    heading: "Justice For Life And Injury",
    summary: "God gives laws about violence, responsibility, negligence, and restitution.",
    teaching: [
      "This section moves into cases involving murder, injury, violence, animals, and negligence.",
      "The laws may feel detailed, but they teach a major principle: human life matters, and harm must be answered with justice.",
      "Israel is not allowed to shrug at violence or pretend accidents never have consequences.",
      "The law distinguishes between intentional murder, accidental death, personal injury, and negligent responsibility.",
      "That distinction matters because biblical justice is not chaos or revenge. It seeks truth, proportionality, accountability, and protection of life.",
    ],
  },
  {
    reference: "Exodus 22:1-15",
    chapter: 22,
    startVerse: 1,
    endVerse: 15,
    heading: "Restitution For What Was Taken",
    summary: "God gives laws about theft, property damage, borrowing, and making wrongs right.",
    teaching: [
      "Exodus 22 begins with theft and restitution. If someone steals, the answer is not only punishment; it is repair.",
      "Restitution means the wrongdoer must make the loss right as much as possible.",
      "That is an important Bible idea because sin damages real people in real ways.",
      "The section also addresses fires, fields, borrowed animals, and items entrusted to another person's care.",
      "God is teaching Israel that holiness reaches ordinary life: your neighbor's animal, field, tools, and trust all matter.",
    ],
  },
  {
    reference: "Exodus 22:16-31",
    chapter: 22,
    startVerse: 16,
    endVerse: 31,
    heading: "Holiness Protects The Vulnerable",
    summary: "God commands Israel to reject spiritual corruption and protect strangers, widows, orphans, and the poor.",
    teaching: [
      "This section brings together sexual responsibility, spiritual loyalty, and care for vulnerable people.",
      "Israel must reject sorcery, idolatry, and practices that would pull them back toward the nations' corruption.",
      "Then God speaks directly about strangers, widows, orphans, and the poor.",
      "That matters because Israel knows what oppression feels like. They were strangers in Egypt, so they must not mistreat strangers in their own land.",
      "God says He hears the cry of the vulnerable. The God who heard Israel's cry in Exodus 2 now commands Israel to hear others with compassion and justice.",
    ],
  },
  {
    reference: "Exodus 23:1-9",
    chapter: 23,
    startVerse: 1,
    endVerse: 9,
    heading: "Truth In The Courts",
    summary: "God commands truthful witness, impartial justice, and compassion even toward enemies.",
    teaching: [
      "Exodus 23 begins with truth. Israel must not spread false reports, join a wicked crowd, or twist justice.",
      "The law warns against favoring the poor unfairly and against favoring the powerful through bribery.",
      "That balance is important. Biblical justice is not about helping one side because we like them; it is about truth before God.",
      "The section also commands Israel to help an enemy's animal when it is lost or overburdened.",
      "That detail is small but powerful. God's law trains people not to let hostility erase basic mercy.",
    ],
  },
  {
    reference: "Exodus 23:10-19",
    chapter: 23,
    startVerse: 10,
    endVerse: 19,
    heading: "Sabbath, Feasts, And Holy Time",
    summary: "God gives rhythms of rest, land care, worship, and yearly feasts.",
    teaching: [
      "God's law does not only govern courtrooms. It also shapes time.",
      "The land is to rest in the seventh year, and people and animals are to rest on the seventh day.",
      "That means Sabbath is not only personal self-care. It is justice for workers, animals, the poor, and even the land.",
      "The feasts teach Israel to remember God's works through the calendar: unleavened bread, harvest, and ingathering.",
      "Israel's year is meant to preach. Their time, food, harvest, and worship all remind them that the LORD is their provider and redeemer.",
    ],
  },
  {
    reference: "Exodus 23:20-33",
    chapter: 23,
    startVerse: 20,
    endVerse: 33,
    heading: "The Angel And The Promised Land",
    summary: "God promises to send His angel before Israel and warns them not to covenant with the land's idols.",
    teaching: [
      "After giving laws, God looks ahead to the journey toward the promised land.",
      "He promises to send His angel before Israel to guard them and bring them to the place He has prepared.",
      "The people must listen carefully because God's name is in him. This is a mysterious and weighty statement about God's own presence going with them.",
      "God promises to oppose Israel's enemies, but He also warns them not to worship the gods of the land.",
      "The land will not be taken all at once. God says He will drive the nations out little by little, showing that promise often unfolds through process, not instant possession.",
    ],
  },
  {
    reference: "Exodus 24:1-8",
    chapter: 24,
    startVerse: 1,
    endVerse: 8,
    heading: "The Covenant Is Sealed With Blood",
    summary: "Moses reads the covenant, Israel agrees, and blood is sprinkled to confirm the covenant.",
    teaching: [
      "Exodus 24 brings the covenant ceremony. Moses writes the words of the LORD, builds an altar, and sets up twelve pillars for the twelve tribes.",
      "The people say they will do all that the LORD has spoken.",
      "Then Moses takes blood from the sacrifices and sprinkles it on the altar and on the people.",
      "Blood may feel strange to modern readers, but in the Bible blood represents life and covenant seriousness.",
      "This moment teaches that Israel's relationship with God is not casual agreement. It is covenant, sealed before God with sacrifice, words, obedience, and blood.",
    ],
  },
  {
    reference: "Exodus 24:9-18",
    chapter: 24,
    startVerse: 9,
    endVerse: 18,
    heading: "They Saw God And Ate",
    summary: "Israel's leaders see a vision of God, eat before Him, and Moses enters the cloud on the mountain.",
    teaching: [
      "After the covenant is sealed, Moses, Aaron, Nadab, Abihu, and seventy elders go up the mountain.",
      "The text says they saw the God of Israel, and under His feet was something like sapphire pavement.",
      "This is one of the most stunning scenes in Exodus. The leaders do not die; they behold God in a limited, protected way and eat and drink before Him.",
      "The meal shows fellowship. The rescued people are not merely given rules from a distance; their leaders share covenant communion before God.",
      "Then Moses goes higher into the cloud for forty days and nights, preparing the way for the tabernacle instructions that come next.",
    ],
  },
] as const;

export const EXODUS_DAY_TWENTY_SEVEN_COVENANT_LAW_AND_BLOOD_LESSON: BibleYearDailyLesson = {
  dayNumber: 27,
  title: "The Covenant Law",
  reference: "Exodus 21-24",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 27 continues at Sinai after the Ten Commandments.",
    "God now shows Israel what covenant life looks like in ordinary situations: servants, injuries, theft, courts, rest, worship, strangers, enemies, land, and justice.",
    "Then Exodus 24 seals the covenant with blood and ends with a breathtaking scene where Israel's leaders see God and eat before Him.",
  ],
  sections: DAY_27_SECTIONS.map((section) => ({
    heading: section.heading,
    verseBlock: {
      reference: section.reference,
      chapter: section.chapter,
      startVerse: section.startVerse,
      endVerse: section.endVerse,
    },
    teaching: [...section.teaching],
  })),
  closing: [
    "Day 27 teaches that God's covenant is not only about mountain thunder.",
    "It reaches daily life, justice, money, bodies, speech, workers, foreigners, land, worship, and leadership.",
    "The redeemed people are learning that belonging to the LORD changes everything, and the covenant is sealed with blood because life with God is holy, serious, and gracious.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_NOTES = `## Bible Reader Chapters Covered

- Exodus 21
- Exodus 22
- Exodus 23
- Exodus 24

## Chapter Introduction

Exodus 21-24 continues the scene at Mount Sinai.

In the previous reading, God spoke the Ten Commandments. Now the commandments begin moving into real life. God gives laws about servants, violence, theft, property, courts, worship, rest, the poor, foreigners, enemies, and the promised land.

At first, some of these laws can feel far away from modern life because they speak into an ancient world. But the deeper point is very practical: God is teaching a redeemed people how not to become another Egypt.

Then Exodus 24 seals the covenant. Moses writes the words, reads them to the people, sprinkles blood on the altar and the people, and the leaders of Israel eat in God's presence.

This day shows that covenant is more than rules. It is relationship, worship, justice, obedience, sacrifice, and life before a holy God.

## Study Notes

Exodus 21 begins with laws for Hebrew servants. These laws speak into a world where debt-servitude existed, but they place limits and protections around it. Israel had been oppressed in Egypt, so they are not allowed to treat vulnerable people as disposable.

The chapter then moves into laws about violence and injury. God distinguishes between murder, accidental death, personal injury, negligence, and responsibility. This teaches that justice must be careful, not reckless.

Exodus 22 focuses on restitution. If someone steals or damages what belongs to another person, the goal is not only punishment. The wrong must be made right as much as possible.

The chapter also protects strangers, widows, orphans, and the poor. God reminds Israel that they know what it feels like to be strangers in Egypt. The God who heard their cry now commands them not to ignore the cry of others.

Exodus 23 gives commands about truth in court, not following the crowd into evil, not accepting bribes, and not twisting justice. It even commands kindness toward an enemy's lost or burdened animal.

Then God gives rhythms of Sabbath and feasts. The land rests, workers rest, animals rest, and Israel gathers for worship at appointed times. Their calendar is shaped by trust, memory, and gratitude.

At the end of Exodus 23, God promises to send His angel before Israel into the promised land. He warns them not to worship the gods of the land or make covenant with them.

Exodus 24 brings the covenant ceremony. Moses writes the words of the LORD, reads them to the people, and the people agree. Blood is sprinkled on the altar and on the people. Then Israel's leaders see a vision of God and eat before Him.

## Deep Study Notes

One of the most important things to understand about Exodus 21-24 is that these laws come after redemption.

God has already rescued Israel from Egypt. He has already brought them through the sea. He has already given them bread, water, victory, and His presence at Sinai.

So these laws are not a way to earn rescue.

They are the shape of life for people who have already been rescued.

That helps us read the laws with the right lens. God is forming a community that looks different from Egypt. Egypt used power to crush the weak. God's law limits power and protects the vulnerable.

That is why the laws talk about servants, injuries, widows, orphans, foreigners, debt, property, and justice. These are not random subjects. They are the everyday places where human selfishness often shows up.

If a society claims to worship God but does not care about truth, workers, the poor, strangers, and justice, something is deeply wrong.

The servant laws are especially important to read carefully.

The Bible is speaking into an ancient economic world where people could become servants because of debt or poverty. That does not make every ancient practice ideal. But inside that world, God gives limits, release, and protections.

That is very different from Egypt's slavery. Pharaoh wanted permanent control. God's law moves toward protection and release.

The justice laws also teach proportionality.

The phrase eye for eye, tooth for tooth is often misunderstood as personal revenge. In its legal setting, it prevents unlimited revenge. The punishment must fit the harm. Justice cannot become a spiral of vengeance.

The restitution laws teach another powerful idea: when you wrong someone, repentance should move toward repair.

If something is stolen, damaged, or lost through negligence, the person responsible must make it right. That means God's law takes real-world harm seriously.

Exodus 22 also gives us one of the clearest windows into God's heart for the vulnerable.

Do not mistreat a stranger.

Do not afflict the widow or fatherless child.

Do not crush the poor with heartless lending.

Why?

Because God hears cries.

That connects directly back to Exodus 2, where Israel cried under bondage and God heard their groaning. The people who were heard by God must become people who hear others.

Exodus 23 then moves into truth and justice. God warns Israel not to follow the crowd into evil. That is painfully practical. A crowd can make wrong feel normal. God tells His people not to let pressure replace truth.

The law also says not to favor a poor person unfairly and not to take a bribe from the powerful. This is balanced justice. Biblical justice is not favoritism in any direction. It is truth before God.

Then Sabbath and feasts remind Israel that even time belongs to the LORD.

The Sabbath year lets the land rest and provides for the poor and animals. The weekly Sabbath gives rest to workers and beasts. This is beautiful because Israel has just left Pharaoh's economy of endless production.

Pharaoh said, Make more bricks.

God says, Rest.

The feasts turn Israel's year into a story. Unleavened Bread remembers deliverance. Harvest and ingathering teach gratitude for provision. Worship is built into the calendar so the people do not forget the God who rescued them.

Exodus 23 also warns Israel about the promised land. God will send His angel before them, but they must not make peace with the land's idols.

That teaches us something important: entering God's promise still requires spiritual vigilance.

The promised land is a gift, but it is not spiritually neutral. Israel must not be delivered from Egypt only to be discipled by Canaan's gods.

Then Exodus 24 seals the covenant with blood.

Moses builds an altar and twelve pillars, representing the twelve tribes. Sacrifices are offered. Blood is thrown on the altar and sprinkled on the people.

The altar side represents God. The people side represents Israel. The blood binds the covenant relationship together in life-and-death seriousness.

This is why Moses says, Behold the blood of the covenant.

That phrase becomes massive later in the Bible. At the Last Supper, Jesus speaks of the new covenant in His blood. Exodus 24 helps us understand that covenant with God is not casual. It is sealed by sacrifice.

The final scene is stunning.

Israel's leaders see the God of Israel, and they eat and drink.

The God who thundered from Sinai also invites covenant fellowship. Fear and nearness belong together. Holiness and mercy belong together. Law and table belong together.

Moses then enters the cloud for forty days and nights, and the story prepares to move toward the tabernacle.

That matters because the question after Sinai is not only, How should Israel live?

It is also, How can a holy God dwell among His people?

## Application & Reflection

Exodus 21-24 reminds us that faith is not only private belief.

God cares about how people treat workers, family, neighbors, enemies, strangers, the poor, and the vulnerable. He cares about truth in court, honesty with property, sexual responsibility, fair restitution, and whether power is used to protect or crush.

That is deeply practical.

- If God rescued us, our relationships should change.
- If God heard our cry, we should not ignore the cries of others.
- If God values truth, we should not follow crowds into falsehood.
- If God gives rest, we should not live like Pharaoh is still our master.
- If God seals covenant with blood, we should not treat relationship with Him casually.

The big idea is this: covenant life reaches ordinary life.

God does not only want Israel at the mountain. He wants Israel's courts, homes, fields, schedules, money, speech, worship, and leadership.

The same is true for us.

Belonging to God is not one religious compartment. It reshapes everything.`;

export const BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_27_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- God is applying covenant life to ordinary situations.
- These laws train Israel not to become another Egypt.
- The covenant is sealed with sacrifice, blood, spoken words, and a meal before God.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### These Are The Judgments
This phrase introduces case laws that apply the Ten Commandments to daily life. God is showing Israel how holiness works in real situations.

### Eye For Eye, Tooth For Tooth
This phrase is about proportional justice, not personal revenge. It limits punishment so justice does not become uncontrolled vengeance.

### Ye Were Strangers In The Land Of Egypt
God roots compassion in memory. Israel must treat strangers with mercy because they know what oppression feels like.

### The Blood Of The Covenant
Blood represents life and covenant seriousness. Israel's relationship with God is sealed with sacrifice, not casual agreement.

### They Saw God, And Did Eat And Drink
This shows covenant fellowship. The holy God who gives law also brings His people near in a protected act of communion.

## What This Means

Exodus 21-24 teaches that redeemed people need formed lives.

- God's law protects life, truth, property, workers, and the vulnerable.
- Justice must be careful, truthful, and proportional.
- Rest and worship are built into the rhythm of covenant life.
- God's promise requires loyalty, not compromise with idols.
- Covenant with God is sealed by blood and leads to fellowship in His presence.

This reading reminds us that belonging to God changes everyday life. Covenant is not only thunder at Sinai; it is justice in the street, truth in the court, mercy for the vulnerable, rest in the week, worship in the calendar, and fellowship before God.`,
}));
