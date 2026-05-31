import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_32_SECTIONS = [
  {
    reference: "Leviticus 1:1-17",
    chapter: 1,
    startVerse: 1,
    endVerse: 17,
    heading: "The Burnt Offering",
    summary: "God gives instructions for the burnt offering, a whole offering that rises to Him from the altar.",
    teaching: [
      "Leviticus begins with God speaking to Moses from the tent of meeting.",
      "That is important because Exodus ended with God's glory filling the tabernacle. Now God speaks from the dwelling place He has filled.",
      "The burnt offering is brought from the herd, flock, or birds, depending on what the worshiper can bring.",
      "The animal is offered on the altar, and the whole offering goes up to God as a pleasing aroma.",
      "This offering teaches surrender, atonement, and the seriousness of approaching a holy God.",
    ],
  },
  {
    reference: "Leviticus 2:1-16",
    chapter: 2,
    startVerse: 1,
    endVerse: 16,
    heading: "The Grain Offering",
    summary: "God gives instructions for grain offerings made with fine flour, oil, frankincense, and salt.",
    teaching: [
      "The grain offering is different from the animal sacrifices because it comes from the fruit of the ground.",
      "Fine flour, oil, and frankincense are brought to the LORD, and a memorial portion is burned on the altar.",
      "This offering teaches gratitude, dedication, and the offering of daily provision back to God.",
      "No leaven or honey is burned on the altar, but salt is required.",
      "Salt points to covenant faithfulness, preservation, and the seriousness of offering worship that belongs to the LORD.",
    ],
  },
  {
    reference: "Leviticus 3:1-17",
    chapter: 3,
    startVerse: 1,
    endVerse: 17,
    heading: "The Peace Offering",
    summary: "God gives instructions for peace offerings that express fellowship, gratitude, and wholeness before Him.",
    teaching: [
      "The peace offering is connected with fellowship and well-being before the LORD.",
      "The worshiper brings an animal from the herd or flock, lays a hand on its head, and the fat is burned to the LORD.",
      "This offering is not only about sin being covered; it is also about communion with God.",
      "The fat belongs to the LORD, which teaches Israel that the best portions are not treated casually.",
      "The peace offering helps Israel understand that life with God includes restored fellowship, not only forgiven guilt.",
    ],
  },
  {
    reference: "Leviticus 4:1-12",
    chapter: 4,
    startVerse: 1,
    endVerse: 12,
    heading: "When The Anointed Priest Sins",
    summary: "God gives instructions for a sin offering when the anointed priest sins and brings guilt on the people.",
    teaching: [
      "Leviticus 4 begins the sin offering instructions, especially for unintentional sin.",
      "The first case is the anointed priest, because priestly sin affects more than the priest himself.",
      "If the priest sins, he brings a bull, lays his hand on its head, and the sacrifice is offered before the LORD.",
      "Some blood is taken into the tent of meeting and applied before the veil and on the altar of incense.",
      "This teaches that sin pollutes worship and must be dealt with by atonement.",
    ],
  },
  {
    reference: "Leviticus 4:13-21",
    chapter: 4,
    startVerse: 13,
    endVerse: 21,
    heading: "When The Whole Congregation Sins",
    summary: "God gives instructions for atonement when the whole community sins unintentionally.",
    teaching: [
      "The next case is the whole congregation of Israel sinning unintentionally.",
      "This shows that a community can become guilty together, even when the sin was not high-handed rebellion.",
      "The elders lay their hands on the bull, identifying the sacrifice with the people.",
      "Blood is brought into the tent and applied in holy space, just as in the priestly case.",
      "The congregation needs atonement because the people who live near God's presence must not pretend sin is harmless.",
    ],
  },
  {
    reference: "Leviticus 4:22-26",
    chapter: 4,
    startVerse: 22,
    endVerse: 26,
    heading: "When A Leader Sins",
    summary: "God gives instructions for a ruler who sins unintentionally and needs forgiveness.",
    teaching: [
      "The law then addresses a ruler or leader who sins.",
      "Leadership does not place someone above atonement.",
      "The leader brings a male goat, lays his hand on its head, and the priest makes atonement.",
      "This is important because leaders' choices affect others, but leaders are still accountable before God.",
      "The passage ends with forgiveness, showing that confession and atonement open the way back after sin.",
    ],
  },
  {
    reference: "Leviticus 4:27-35",
    chapter: 4,
    startVerse: 27,
    endVerse: 35,
    heading: "When Any Person Sins",
    summary: "God gives instructions for ordinary people who sin unintentionally and need atonement.",
    teaching: [
      "The final case in Leviticus 4 is the ordinary person who sins unintentionally.",
      "This matters because atonement is not only for priests, leaders, or the whole congregation.",
      "Every person needs a way to deal with guilt before God.",
      "The worshiper lays a hand on the animal, the sacrifice is made, and the priest makes atonement.",
      "The repeated promise is beautiful: it shall be forgiven him.",
    ],
  },
] as const;

export const LEVITICUS_DAY_THIRTY_TWO_OFFERINGS_AND_ATONEMENT_LESSON: BibleYearDailyLesson = {
  dayNumber: 32,
  title: "Offerings and Atonement",
  reference: "Leviticus 1-4",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 32 begins the book of Leviticus.",
    "Exodus ended with the glory of the LORD filling the tabernacle. Leviticus begins with the LORD speaking from that tent, teaching Israel how sinful people can approach a holy God.",
    "Leviticus 1-4 introduces burnt offerings, grain offerings, peace offerings, and sin offerings, showing that worship near God's presence requires surrender, gratitude, fellowship, cleansing, and atonement.",
  ],
  sections: DAY_32_SECTIONS.map((section) => ({
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
    "Day 32 teaches that Leviticus is not random ritual.",
    "It is the mercy-filled instruction book for life near the holy God who has come to dwell among Israel.",
    "The offerings show that access to God is a gift, sin is serious, worship is costly, and atonement is provided by the LORD.",
  ],
};

export const BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_NOTES = `## Bible Reader Chapters Covered

- Leviticus 1
- Leviticus 2
- Leviticus 3
- Leviticus 4

## Chapter Introduction

Leviticus begins right where Exodus ended.

Exodus closed with the glory of the LORD filling the tabernacle. God had come to dwell among His people. But that raises a huge question: how can sinful people live near a holy God?

Leviticus begins to answer that question.

The LORD calls to Moses from the tent of meeting and gives instructions for offerings. These chapters describe the burnt offering, grain offering, peace offering, and sin offering.

To modern readers, the details can feel strange at first: animals, blood, fat, flour, oil, incense, salt, altars, priests, and fire.

But the meaning is deeply practical. God is teaching Israel that worship is not casual, sin is not small, gratitude matters, fellowship with God is possible, and atonement is provided.

## Study Notes

Leviticus 1 begins with the burnt offering. The worshiper brings an animal from the herd, flock, or birds. This means access to worship is not limited to only the wealthy. Different people can bring different offerings based on what they have.

The worshiper lays a hand on the animal's head. This shows identification. The animal is offered on behalf of the worshiper, and the whole offering rises to God from the altar.

Leviticus 2 describes the grain offering. This offering comes from the fruit of the ground: fine flour, oil, frankincense, baked items, and firstfruits. It is a way of giving daily provision back to God in gratitude and dedication.

The grain offering includes salt, called the salt of the covenant. Salt points to permanence, faithfulness, and preservation. Israel's worship is tied to covenant loyalty.

Leviticus 3 describes the peace offering. This offering is connected to fellowship, wholeness, and communion with God. The best portions belong to the LORD, and the offering teaches that restored relationship is part of life with Him.

Leviticus 4 introduces the sin offering. These instructions focus on unintentional sin, showing that sin still matters even when someone did not set out to rebel.

The chapter walks through different levels of responsibility: the anointed priest, the whole congregation, a leader, and an ordinary person.

That order teaches something important. Everyone needs atonement. Priests need it. Communities need it. Leaders need it. Ordinary people need it.

And again and again, the chapter says atonement is made and forgiveness is given.

## Deep Study Notes

Leviticus is often one of the hardest books for modern readers, but it is also one of the most important.

If Exodus answers, How did God rescue His people?

Leviticus asks, How can rescued people live near a holy God?

That is the key.

Leviticus is not a random rulebook dropped into the Bible. It is the next step after the tabernacle is filled with God's glory.

God is in the camp now.

That is wonderful, but it is also dangerous if the people approach Him casually. The offerings teach Israel that nearness to God is possible, but only through the way God provides.

The burnt offering is whole surrender.

The entire animal is burned on the altar, rising to God as a pleasing aroma. The worshiper lays a hand on the animal, identifying with it, and the priest handles the blood.

This teaches that worship involves life, cost, substitution, and atonement.

The phrase pleasing aroma does not mean God enjoys death in a crude way. It means the offering is accepted according to His covenant instruction.

The grain offering is gratitude and dedication.

It is not bloody like the animal offerings, but it still matters. Flour, oil, frankincense, and firstfruits represent daily provision and human labor offered back to God.

There is no leaven or honey burned on the altar, but there must be salt.

Leaven often spreads and changes what it touches. Honey can ferment. Salt preserves and seasons. In this context, salt becomes a sign of covenant faithfulness.

The peace offering is fellowship.

The Hebrew idea behind peace is bigger than simply not fighting. It points toward wholeness, well-being, restored relationship, and life as it should be under God's blessing.

That means sacrifice is not only about guilt being removed. It also opens the way for fellowship with God.

The sin offering in Leviticus 4 is especially important because it shows how seriously God takes sin even when it is unintentional.

Modern people often think, I did not mean to, so it should not matter.

Leviticus teaches something deeper.

Intent matters, but impact matters too.

Unintentional sin can still bring guilt and pollution that must be cleansed. That does not mean accidental sin is the same as open rebellion. But it does mean God's holiness is real, and His people need atonement even for sins they later come to recognize.

The order in Leviticus 4 is also teaching.

The priest's sin affects the people.

The congregation can sin together.

A leader can sin.

An ordinary person can sin.

No level of spiritual role, community identity, public authority, or personal privacy removes the need for atonement.

The blood is handled differently depending on the case, which shows that sin has different levels of impact. When the priest or congregation sins, the blood is brought into the tent and applied in holy space. When a leader or ordinary person sins, the blood is applied at the altar of burnt offering.

That teaches that sin is not only personal guilt. It affects worship, community, leadership, and nearness to God.

But Leviticus 4 is not hopeless.

The repeated line is beautiful: and it shall be forgiven him.

This is mercy through sacrifice.

Leviticus is preparing the Bible's language for atonement, substitution, priesthood, sacrifice, holiness, cleansing, and forgiveness.

Later, the New Testament will use this world of meaning to help us understand Jesus. He is not a random religious teacher. He is the better sacrifice, the true priest, the one who brings full atonement and opens the way to God.

So Leviticus 1-4 is teaching us how to read the whole Bible.

Sin is serious.

God is holy.

Worship is costly.

Atonement is necessary.

And mercy is provided.

## Application & Reflection

Leviticus 1-4 reminds us that closeness to God is a gift we should not treat casually.

Israel does not get to invent its own way into God's presence. God provides the way, and that way teaches surrender, gratitude, fellowship, cleansing, and atonement.

For modern readers, these chapters ask honest questions:

- Am I approaching God casually?
- Do I understand that sin matters even when I did not intend harm?
- Do I give God gratitude from my daily provision?
- Do I want forgiveness only, or also fellowship with God?
- Do I see my need for atonement?

The offerings can feel ancient, but the heart issues are very current.

We still need surrender.

We still need gratitude.

We still need peace with God.

We still need sin dealt with.

And we still need mercy that God Himself provides.

The big idea is this: the holy God who dwells among His people also provides the way for His people to come near.`;

export const BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_32_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Leviticus begins with God speaking from the tabernacle He has filled with glory.
- The offerings teach Israel how sinful people can approach a holy God.
- Atonement, surrender, gratitude, fellowship, cleansing, and forgiveness are central to life near God's presence.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### The LORD Called Unto Moses
Leviticus begins with God speaking from the tent of meeting. Exodus ended with glory filling the tabernacle; now God speaks from that holy dwelling.

### He Shall Put His Hand Upon The Head
The hand on the animal's head shows identification. The offering is connected to the worshiper and is brought before God on the worshiper's behalf.

### A Sweet Savour Unto The LORD
This means the offering is accepted according to God's instruction. It is worship received by God, not a smell preference in a shallow sense.

### The Salt Of The Covenant
Salt points to covenant faithfulness, preservation, and permanence. Israel's offerings are tied to relationship with the LORD.

### It Shall Be Forgiven Him
This repeated promise in the sin offering instructions shows the mercy inside the sacrificial system. God provides a way for guilt to be dealt with.

## What This Means

Leviticus 1-4 teaches that worship near God's presence requires the way God provides.

- The burnt offering teaches surrender and atonement.
- The grain offering teaches gratitude and dedication.
- The peace offering teaches fellowship and wholeness with God.
- The sin offering teaches that sin must be cleansed and forgiven.
- Priests, leaders, communities, and ordinary people all need atonement.

This reading helps us understand why sacrifice, priesthood, blood, cleansing, and forgiveness become such major themes in the Bible. God is holy, sin is serious, and mercy is provided.`,
}));
