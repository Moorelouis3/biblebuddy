import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_36_SECTIONS = [
  {
    reference: "Leviticus 17:1-7",
    chapter: 17,
    startVerse: 1,
    endVerse: 7,
    heading: "Sacrifice, Blood, And The Tabernacle",
    summary: "God commands Israel to bring sacrificial animals to the tabernacle and stop offering sacrifices in hidden or false worship.",
    teaching: [
      "Leviticus 17 comes right after the Day of Atonement.",
      "That matters because Leviticus 16 showed blood brought before God for atonement.",
      "Now God teaches Israel how blood and sacrifice must be treated in daily life.",
      "Animals connected to sacrifice must be brought to the door of the tabernacle, not killed as private worship in the open field.",
      "The deeper danger is idolatry: Israel must no longer offer sacrifices to devils.",
    ],
  },
  {
    reference: "Leviticus 17:8-16",
    chapter: 17,
    startVerse: 8,
    endVerse: 16,
    heading: "The Life Of The Flesh Is In The Blood",
    summary: "God forbids eating blood because life belongs to Him, and He has given blood upon the altar for atonement.",
    teaching: [
      "This section gives one of the clearest explanations of blood in Leviticus.",
      "The life of the flesh is in the blood.",
      "That means blood is not treated as common food because blood represents life before God.",
      "God says He has given blood upon the altar to make atonement for the soul.",
      "Even hunting and ordinary eating must honor this truth by pouring out the blood and covering it with dust.",
    ],
  },
  {
    reference: "Leviticus 18:1-5",
    chapter: 18,
    startVerse: 1,
    endVerse: 5,
    heading: "Do Not Live Like Egypt Or Canaan",
    summary: "God tells Israel not to copy the practices of Egypt behind them or Canaan ahead of them.",
    teaching: [
      "Leviticus 18 moves from blood and sacrifice into sexual holiness.",
      "God begins by saying, I am the LORD your God.",
      "That means the commands come from covenant authority, not cultural preference.",
      "Israel must not live like Egypt, where they came from.",
      "They must not live like Canaan, where they are going.",
    ],
  },
  {
    reference: "Leviticus 18:6-23",
    chapter: 18,
    startVerse: 6,
    endVerse: 23,
    heading: "Holy Boundaries For Family And Desire",
    summary: "God gives boundaries around family, marriage, sexuality, children, and practices that defile.",
    teaching: [
      "This section repeats the phrase uncover nakedness.",
      "That phrase refers to forbidden sexual relationships.",
      "God names close family relationships because nearness can be abused when desire is not ruled by holiness.",
      "The commands protect family order, marriage, children, bodies, and the community.",
      "Molech worship appears here because false worship and moral corruption belong together.",
    ],
  },
  {
    reference: "Leviticus 18:24-30",
    chapter: 18,
    startVerse: 24,
    endVerse: 30,
    heading: "The Land Must Not Be Defiled",
    summary: "God warns Israel that the nations were defiled by these sins and the land vomited out its inhabitants.",
    teaching: [
      "Leviticus 18 ends by showing that sin does not remain private and invisible.",
      "The nations were defiled by these practices.",
      "The land itself is described as defiled.",
      "The phrase that the land vomits out its inhabitants is intentionally strong.",
      "Israel must not assume privilege will protect them if they copy the same corruption.",
    ],
  },
  {
    reference: "Leviticus 19:1-10",
    chapter: 19,
    startVerse: 1,
    endVerse: 10,
    heading: "Be Holy In Worship, Family, And Harvest",
    summary: "God calls the whole congregation to holiness and shows that holiness reaches worship, family, Sabbath, idols, and harvest mercy.",
    teaching: [
      "Leviticus 19 is one of the clearest chapters in the book for practical holiness.",
      "The command is simple and deep: Ye shall be holy, for I the LORD your God am holy.",
      "Holiness begins with God's character.",
      "Then it reaches family honor, Sabbath, idols, peace offerings, and harvesting fields.",
      "Israel must leave corners and gleanings for the poor and the stranger.",
    ],
  },
  {
    reference: "Leviticus 19:11-18",
    chapter: 19,
    startVerse: 11,
    endVerse: 18,
    heading: "Justice, Speech, And Love Thy Neighbour",
    summary: "God shows holiness through honesty, fair wages, protection for the vulnerable, righteous judgment, truthful speech, and neighbor love.",
    teaching: [
      "This section is extremely practical.",
      "Do not steal.",
      "Do not lie.",
      "Do not hold back a worker's wages.",
      "Do not curse the deaf or place a stumblingblock before the blind.",
      "Do not twist judgment, spread slander, hate your brother, take revenge, or bear a grudge.",
      "Then comes the famous command: thou shalt love thy neighbour as thyself.",
    ],
  },
  {
    reference: "Leviticus 19:19-37",
    chapter: 19,
    startVerse: 19,
    endVerse: 37,
    heading: "Holy Order In Ordinary Life",
    summary: "God teaches Israel that holiness reaches farming, clothing, hard moral cases, fruit trees, occult practices, bodies, strangers, elders, and business.",
    teaching: [
      "The second half of Leviticus 19 can feel like many commands placed side by side.",
      "But the main theme is clear: ordinary life belongs under God's holiness.",
      "Fields, garments, fruit trees, grief, bodies, sanctuary reverence, strangers, older people, and business measures all matter.",
      "Israel must love the stranger because they were strangers in Egypt.",
      "Their trade must be honest because the LORD brought them out of Egypt.",
    ],
  },
  {
    reference: "Leviticus 20:1-8",
    chapter: 20,
    startVerse: 1,
    endVerse: 8,
    heading: "Molech, Occult Practices, And Holiness",
    summary: "God condemns Molech worship, warns against occult practices, and calls Israel to sanctify themselves because He sanctifies them.",
    teaching: [
      "Leviticus 20 is heavier than Leviticus 19 because it focuses on consequences.",
      "The chapter begins with Molech worship, a horrifying false worship practice involving children.",
      "God says this defiles His sanctuary and profanes His holy name.",
      "The community must not hide its eyes from evil.",
      "Israel must reject familiar spirits and wizards and be holy because the LORD sanctifies them.",
    ],
  },
  {
    reference: "Leviticus 20:9-21",
    chapter: 20,
    startVerse: 9,
    endVerse: 21,
    heading: "Serious Sin And Serious Consequences",
    summary: "God names serious family and sexual sins and shows that covenant holiness cannot treat destructive sin as weightless.",
    teaching: [
      "This section repeats many boundaries from Leviticus 18, but now with covenant consequences.",
      "Family dishonor, adultery, sexual violation, and disorder are not treated as harmless private choices.",
      "The repeated language is heavy: blood shall be upon him, bear iniquity, bear sin, cut off, childless.",
      "The point is not shock value.",
      "The point is that holiness is real and sin has weight before God.",
    ],
  },
  {
    reference: "Leviticus 20:22-27",
    chapter: 20,
    startVerse: 22,
    endVerse: 27,
    heading: "Separated To Belong To The LORD",
    summary: "God calls Israel to keep His statutes, live differently from the nations, and be holy because He separated them to be His.",
    teaching: [
      "The final section brings the reading together.",
      "Israel must keep God's statutes and judgments so the land does not vomit them out.",
      "They must not walk in the manners of the nations.",
      "God gives them a land flowing with milk and honey, but they must live in it as His holy people.",
      "Verse 26 gives the heart of the chapter: God has separated them from other people, that they should be His.",
    ],
  },
] as const;

export const LEVITICUS_DAY_THIRTY_SIX_HOLY_LIVING_BEFORE_A_HOLY_GOD_LESSON: BibleYearDailyLesson = {
  dayNumber: 36,
  title: "Holy Living Before a Holy God",
  reference: "Leviticus 17-20",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 36 continues the holiness section of Leviticus.",
    "Yesterday, the Day of Atonement showed that sin must be atoned for and carried away.",
    "Today, God teaches Israel that holiness reaches sacrifice, blood, worship, sexuality, family, justice, speech, strangers, business, and belonging.",
  ],
  sections: DAY_36_SECTIONS.map((section) => ({
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
    "Day 36 teaches that holiness is not a narrow religious word.",
    "Holiness shapes blood, worship, desire, family, justice, speech, compassion, business, and community responsibility.",
    "Most of all, holiness is about belonging: God separates His people so that they should be His.",
  ],
};

export const BIBLE_YEAR_DAY_THIRTY_SIX_DEEP_NOTES = `## Bible Reader Chapters Covered

- Leviticus 17
- Leviticus 18
- Leviticus 19
- Leviticus 20

## Chapter Introduction

Leviticus 17-20 moves from atonement into holy living.

Leviticus 16 showed blood brought into the Most Holy Place on the Day of Atonement.

Now Leviticus 17 teaches Israel that blood must never become common.

Life belongs to God.

Blood belongs to God.

Worship belongs to God.

Then Leviticus 18 teaches that holiness reaches desire, sexuality, family boundaries, children, and the hidden parts of life.

Israel must not live like Egypt behind them or Canaan ahead of them.

Leviticus 19 shows what holiness looks like in daily life.

It includes parents, Sabbath, idols, harvest mercy, honesty, wages, justice, speech, love for neighbor, love for stranger, respect for the aged, and honest business.

Leviticus 20 then shows the seriousness of sin and the purpose of being set apart.

The chapter is heavy, but its heart is belonging.

God says Israel is separated from the nations so that they should be His.

## Study Notes

Leviticus 17 begins with sacrifice and blood.

God commands Israel to bring sacrificial animals to the door of the tabernacle.

That matters because hidden sacrifice could become false worship.

Verse 7 says Israel must no longer offer sacrifices to devils.

The issue is not only location.

The issue is loyalty.

Blood is also guarded.

The life of the flesh is in the blood.

God has given blood upon the altar to make atonement for the soul.

That means blood is not common food.

It represents life before God, and God gives it for atonement.

Leviticus 18 moves into sexual holiness.

God begins by saying, I am the LORD your God.

Then He warns Israel not to copy Egypt or Canaan.

This is important for beginners.

Israel's holiness is not based on what surrounding cultures normalize.

God's word must shape the body, desire, family, marriage, children, and private life.

The repeated phrase uncover nakedness refers to forbidden sexual relationships.

God names family relationships carefully because closeness can be abused.

Family nearness must be protected, not exploited.

The chapter also warns against Molech worship, adultery, same-sex relations, bestiality, and practices that defile people and the land.

Leviticus 19 gives one of the most practical pictures of holiness in the Old Testament.

Ye shall be holy, for I the LORD your God am holy.

Then the chapter shows holiness in ordinary life.

Honor parents.

Keep Sabbath.

Reject idols.

Offer peace offerings rightly.

Leave gleanings for the poor and stranger.

Do not steal.

Do not lie.

Pay workers fairly.

Protect the deaf and blind.

Judge righteously.

Do not slander.

Do not hate your brother in your heart.

Love your neighbor as yourself.

Love the stranger as yourself.

Use honest weights and measures.

Leviticus 19 shows that holiness and love belong together.

Leviticus 20 is serious because it names consequences.

Molech worship is condemned because it destroys children, defiles God's sanctuary, and profanes His holy name.

Occult practices are rejected because God's people must not seek forbidden spiritual power.

Sexual sins and family dishonor are named with heavy language because covenant life cannot treat destructive sin as weightless.

Then the chapter ends with one of the clearest purpose statements for holiness.

God separated Israel from other people so that they should be His.

Holiness is not only about what God's people avoid.

It is about whom they belong to.

## Application & Reflection

Leviticus 17-20 teaches that life with God touches everything.

It touches worship.

It touches blood.

It touches the body.

It touches desire.

It touches family.

It touches justice.

It touches speech.

It touches money.

It touches strangers.

It touches the hidden places people often try to keep away from God.

The big idea is simple:

God's people are holy because God is holy, and they are set apart because they belong to Him.`;

export const BIBLE_YEAR_DAY_THIRTY_SIX_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_36_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.join("\n\n")}

## Key Phrases

### The Life Of The Flesh Is In The Blood
Blood represents life before God. Leviticus 17 teaches that blood must not be treated like common food because God gives blood upon the altar for atonement.

### I Am The LORD Your God
This phrase anchors holiness in God's identity. Israel obeys because they belong to the LORD, not because surrounding cultures agree.

### Ye Shall Be Holy
Holiness means being set apart for God. Leviticus 19 shows that holiness reaches worship, family, speech, justice, harvest, strangers, and business.

### Love Thy Neighbour As Thyself
Love is not separate from holiness. It is one of the clearest ways God's people reflect the holy character of the LORD.

### That Ye Should Be Mine
This phrase gives the heart of Leviticus 20. God separates His people from the nations so they belong to Him.

## What This Means

Leviticus 17-20 teaches that holiness is the whole shape of life before God.

- Blood and life belong to God.
- Worship must follow God's command.
- Desire and family must be guarded by holiness.
- Justice, speech, money, and mercy matter before the LORD.
- God's people are set apart because they belong to Him.

This reading helps beginners see that Leviticus is not random rules. It is God forming a people who live differently because His holy presence is among them.`,
}));
