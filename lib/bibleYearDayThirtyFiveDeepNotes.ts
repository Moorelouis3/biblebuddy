import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_35_SECTIONS = [
  {
    reference: "Leviticus 13:1-46",
    chapter: 13,
    startVerse: 1,
    endVerse: 46,
    heading: "Skin Disease And Priestly Examination",
    summary: "God gives priests instructions for examining serious skin conditions and declaring clean or unclean.",
    teaching: [
      "Leviticus 13 begins a long section about visible conditions on the body.",
      "The priest examines the person, waits when the case is unclear, and declares the person clean or unclean based on careful signs.",
      "This is not the priest acting like a modern doctor; he is guarding access to the camp and sanctuary.",
      "Unclean does not automatically mean morally guilty.",
      "The issue is whether a visible condition belongs inside the holy camp while God's presence dwells among Israel.",
    ],
  },
  {
    reference: "Leviticus 13:47-59",
    chapter: 13,
    startVerse: 47,
    endVerse: 59,
    heading: "Contamination In Garments",
    summary: "God gives instructions for examining garments affected by spreading contamination.",
    teaching: [
      "The chapter moves from human skin to clothing, leather, and fabric.",
      "If a spreading mark appears in a garment, the priest examines it and may isolate it for seven days.",
      "If the contamination spreads, the garment is burned.",
      "If it fades after washing, the damaged part may be torn out or the garment may be washed again.",
      "The point is that uncleanness can affect the things people live with, not only the body itself.",
    ],
  },
  {
    reference: "Leviticus 14:1-32",
    chapter: 14,
    startVerse: 1,
    endVerse: 32,
    heading: "Cleansing The Restored Person",
    summary: "God gives a cleansing process for someone healed from a serious skin disease.",
    teaching: [
      "Leviticus 14 is good news after the difficult examinations of Leviticus 13.",
      "If a diseased person is healed, the priest goes outside the camp to examine him.",
      "The cleansing process includes two birds, running water, cedar wood, scarlet yarn, and hyssop.",
      "Then the person washes, shaves, waits, and later brings offerings at the tabernacle.",
      "God makes a way for the unclean person to be restored to community and worship.",
    ],
  },
  {
    reference: "Leviticus 14:33-57",
    chapter: 14,
    startVerse: 33,
    endVerse: 57,
    heading: "Cleansing A Contaminated House",
    summary: "God gives instructions for inspecting, cleansing, or tearing down a contaminated house in the land.",
    teaching: [
      "Leviticus 14 also applies cleansing laws to houses, anticipating life in the promised land.",
      "If a house has a spreading contamination, the priest inspects it, closes it, and may order stones removed.",
      "If the problem returns, the house must be torn down.",
      "If the house is clean, a ritual like the restored-person cleansing is performed.",
      "This teaches that holiness is not limited to the tabernacle; Israel's homes also matter before God.",
    ],
  },
  {
    reference: "Leviticus 15:1-33",
    chapter: 15,
    startVerse: 1,
    endVerse: 33,
    heading: "Bodily Discharges And Cleansing",
    summary: "God gives laws about bodily discharges, impurity, washing, waiting, and restoration.",
    teaching: [
      "Leviticus 15 deals with bodily discharges for both men and women.",
      "These laws can feel uncomfortable, but they teach that even private body matters are lived before a holy God.",
      "Some discharges are abnormal and require offerings after cleansing.",
      "Some are normal parts of married life or the monthly cycle and require washing and waiting.",
      "Again, impurity is not always moral sin; it often marks contact with bodily fluids, mortality, and boundaries around holy space.",
    ],
  },
  {
    reference: "Leviticus 16:1-10",
    chapter: 16,
    startVerse: 1,
    endVerse: 10,
    heading: "The Day Of Atonement Begins",
    summary: "After Nadab and Abihu's death, God gives instructions for Aaron entering the Most Holy Place.",
    teaching: [
      "Leviticus 16 begins by remembering the death of Nadab and Abihu.",
      "That reminder matters because this chapter explains how the high priest may safely enter the Most Holy Place.",
      "Aaron cannot enter whenever he wants; he must come only God's way.",
      "He brings a bull for himself and two goats for the people.",
      "One goat will be offered to the LORD, and the other will become the scapegoat sent away into the wilderness.",
    ],
  },
  {
    reference: "Leviticus 16:11-28",
    chapter: 16,
    startVerse: 11,
    endVerse: 28,
    heading: "Blood, Mercy Seat, And Scapegoat",
    summary: "The high priest makes atonement for himself, the sanctuary, the altar, and the people.",
    teaching: [
      "Aaron first offers the bull for his own sin, because even the high priest needs atonement.",
      "He brings incense behind the veil so the cloud covers the mercy seat.",
      "Blood is sprinkled on and before the mercy seat to make atonement for Israel's uncleanness and sins.",
      "Then the live goat carries the people's iniquities away into the wilderness.",
      "The Day of Atonement cleanses the sanctuary and symbolically removes Israel's sin from the camp.",
    ],
  },
  {
    reference: "Leviticus 16:29-34",
    chapter: 16,
    startVerse: 29,
    endVerse: 34,
    heading: "A Sabbath Of Solemn Rest",
    summary: "God establishes the Day of Atonement as a yearly day of humility, rest, and cleansing.",
    teaching: [
      "The Day of Atonement becomes a yearly statute for Israel.",
      "The people are commanded to afflict themselves, meaning they humble themselves before God.",
      "They do no work, because this day is about receiving cleansing from the LORD, not producing it by their own effort.",
      "Atonement is made for the priests, the sanctuary, the altar, and all the people.",
      "Once a year, Israel is reminded that life near God's presence requires deep cleansing only God can provide.",
    ],
  },
] as const;

export const LEVITICUS_DAY_THIRTY_FIVE_CLEANSING_AND_DAY_OF_ATONEMENT_LESSON: BibleYearDailyLesson = {
  dayNumber: 35,
  title: "The Day of Atonement",
  reference: "Leviticus 13-16",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 35 continues the holiness laws of Leviticus.",
    "Yesterday, we saw that priests must distinguish holy from common and clean from unclean.",
    "Today, Leviticus shows how uncleanness is examined, how restoration happens, and how the Day of Atonement cleanses the sanctuary and removes Israel's sin.",
  ],
  sections: DAY_35_SECTIONS.map((section) => ({
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
    "Day 35 teaches that God does not ignore uncleanness, sin, or the damage of life in a fallen world.",
    "But He also does not leave His people outside forever.",
    "He provides examination, cleansing, restoration, atonement, and a picture of sin being carried away.",
  ],
};

export const BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_NOTES = `## Bible Reader Chapters Covered

- Leviticus 13
- Leviticus 14
- Leviticus 15
- Leviticus 16

## Chapter Introduction

Leviticus 13-16 is one of the most important sections in the book, but it can also be one of the hardest for modern readers.

The chapters begin with skin disease, contaminated garments, contaminated houses, and bodily discharges.

At first, that may feel strange or uncomfortable.

But remember what Leviticus has been teaching: God is holy, His presence is in the camp, and Israel must learn the difference between clean and unclean.

These chapters are not mainly about embarrassment or shame. They are about life near God's holy presence in a world touched by death, decay, disease, blood, and disorder.

Then Leviticus 16 brings everything to a high point: the Day of Atonement.

Once a year, the high priest enters the Most Holy Place with blood. Atonement is made for the priests, the sanctuary, the altar, and the people.

One goat dies.

One goat carries the sins of the people away into the wilderness.

The message is powerful: God provides cleansing deep enough for His people to keep living near Him.

## Study Notes

Leviticus 13 gives priests instructions for examining serious skin conditions.

The priest looks carefully. Sometimes the person is declared unclean. Sometimes the person is isolated for seven days and examined again. Sometimes the condition is declared clean.

This slow process matters.

The priest is not guessing. He is not rushing. He is guarding the camp while also making careful distinctions.

Being declared unclean does not automatically mean the person committed a moral sin.

That is very important.

In Leviticus, uncleanness often means someone or something is not fit to enter holy space until cleansing happens.

Leviticus 13 also deals with garments. Fabric, leather, and clothing can show signs of spreading contamination. The priest examines them, isolates them, washes them, tears out damaged parts, or burns them if the problem keeps spreading.

This teaches that uncleanness affects everyday life, not only religious ceremonies.

Leviticus 14 gives the restoration process.

If a person with a serious skin disease is healed, the priest goes outside the camp to examine him. That detail is beautiful because the priest meets the person where he is.

The cleansing ritual includes two birds, cedar wood, scarlet yarn, hyssop, and running water.

One bird is killed. The other is released alive into the open field.

The picture is restoration. The person who was outside the camp can come back.

After washing, shaving, waiting, and offering sacrifices, the restored person is fully returned to worship life.

Leviticus 14 also gives instructions for contaminated houses. This looks ahead to when Israel lives in the promised land.

A house can be inspected, closed, scraped, repaired, cleansed, or torn down.

That reminds Israel that holiness belongs in homes too.

Leviticus 15 deals with bodily discharges. Some are abnormal. Some are ordinary. Some involve men. Some involve women.

These laws can feel very personal, but they continue the same theme: Israel lives near holy space, so bodily impurity must be recognized and cleansed.

Again, impurity is not always personal guilt.

Leviticus 16 is the center of this reading.

The chapter begins by remembering the death of Nadab and Abihu. That warning sets the tone: Aaron cannot enter the Most Holy Place whenever he wants.

He must come only God's way.

Aaron brings a bull for himself and two goats for the people.

The blood is brought behind the veil and sprinkled on and before the mercy seat.

This makes atonement for the sanctuary because Israel's uncleanness and sins affect the holy place.

Then Aaron lays both hands on the live goat and confesses over it all the iniquities of Israel.

The goat is sent away into the wilderness.

That goat is often called the scapegoat.

It shows sin being carried away from the people and removed from the camp.

Leviticus 16 ends by establishing the Day of Atonement as a yearly day of solemn rest and humility.

Israel does not work to cleanse itself that day.

Israel receives cleansing from the LORD.

## Deep Study Notes

Leviticus 13-15 may seem like a strange road to Leviticus 16, but the order makes sense.

Before the Day of Atonement, Leviticus shows us how much uncleanness exists in the life of the camp.

Bodies can become unclean.

Clothing can become unclean.

Homes can become unclean.

Normal life can create uncleanness.

Abnormal disease can create uncleanness.

Contact with death, decay, blood, and bodily fluids can affect whether someone is fit to approach holy space.

That may feel foreign to modern readers, but the main idea is not hard to understand.

God is teaching Israel that holiness is not pretend.

If the holy God dwells among the people, then the people must learn how to recognize what does not belong near His presence.

The skin disease laws are especially important because they create a category of life outside the camp.

The unclean person with a serious condition lives outside, with torn clothes, uncovered head, and the cry, Unclean, unclean.

That sounds severe, and it is.

But the purpose is not cruelty.

The camp is arranged around God's presence. Anything that visibly represents corruption, decay, or spreading disorder must be kept away from the holy center until cleansing can happen.

This helps us understand why Jesus' treatment of lepers in the Gospels is so powerful.

When Jesus touches the unclean, He is not polluted by uncleanness.

Instead, His cleanness overcomes it.

Leviticus teaches us how serious uncleanness is. The Gospels show us how powerful Jesus is.

Leviticus 14 is one of the most hope-filled chapters in this section because it gives a way back.

The priest goes outside the camp.

Do not rush past that.

The person who has been isolated is not expected to break into the camp and fix himself. The priest goes out to examine him.

That is a beautiful picture of restoration beginning outside the place of full belonging.

The two birds are also memorable.

One bird dies over fresh water.

The living bird is dipped with cedar wood, scarlet yarn, and hyssop, then released into the open field.

The imagery feels like death and release.

The person who had been marked by uncleanness is now moving toward freedom, cleansing, and return.

Hyssop shows up elsewhere in Scripture too. It is used in the Passover story, when blood is applied to the doorposts in Egypt. David mentions hyssop in Psalm 51 when he prays, Purge me with hyssop, and I shall be clean.

That connection helps us see that cleansing is a major Bible theme.

God's people do not only need forgiveness as a legal idea.

They need cleansing.

They need to be washed.

They need restored access.

Leviticus 14 also talks about houses, which shows that holiness is moving toward the promised land.

The law says, When you come into the land of Canaan.

That means these instructions look forward.

Israel is still in the wilderness, but God is already teaching them how to live in houses in the land He promised.

That is a helpful reminder: Leviticus is not only about tabernacle rituals in the desert. It is forming a whole way of life for God's covenant people.

Leviticus 15 brings the subject even closer to home.

Bodily discharges are private, ordinary, and sometimes uncomfortable to discuss.

But Leviticus includes them because God is not only Lord over public worship. He is Lord over bodies, sexuality, sickness, cycles, marriage, and hidden life.

This does not mean every bodily process is sinful.

It means the body matters in a holy community.

Modern people often separate spiritual life from physical life. Leviticus refuses that split.

God made the body.

God knows the body.

And life with God includes how embodied people live near holy presence.

Then Leviticus 16 gathers the whole problem into one yearly day.

The chapter begins after the death of Nadab and Abihu because no one should imagine the Most Holy Place can be entered casually.

Aaron may enter, but not whenever he wants.

He enters with blood, incense, washing, linen garments, and sacrifices.

The high priest must first offer for his own sin.

Again, Leviticus is honest about the priesthood. The mediator is also needy.

That prepares us for the New Testament's teaching that Jesus is the better High Priest, holy and without sin.

The mercy seat is central here.

The mercy seat is the cover of the ark of the covenant in the Most Holy Place. It is the place associated with God's throne-like presence among Israel.

Blood is sprinkled there because atonement is needed at the deepest point of Israel's worship.

This is not only about individuals feeling forgiven.

The sanctuary itself is cleansed from the uncleanness and sins of Israel.

That is a huge idea.

Sin and uncleanness affect the place where God dwells among the people, so God provides a yearly cleansing for the holy place, the tent, the altar, the priests, and the people.

Then comes the live goat.

Aaron lays both hands on its head and confesses all the iniquities, transgressions, and sins of Israel.

That threefold language is heavy.

It is like the text is saying, all of it.

Not only small mistakes.

Not only ritual impurity.

Not only accidental failures.

All the sins of the people are confessed over the goat.

Then the goat carries them away into the wilderness.

That image is simple enough for a child to understand and deep enough to shape the whole Bible story.

Sin must be atoned for.

Sin must also be removed.

The Day of Atonement shows both.

One goat dies.

One goat carries sin away.

Later Scripture will use this kind of language to describe God's forgiveness. Psalm 103 says that as far as the east is from the west, so far has He removed our transgressions from us.

The New Testament will point to Jesus as the one who fulfills the deeper reality behind these shadows.

He is not merely one more sacrifice.

He is the true atonement.

He enters, not an earthly copy, but the greater heavenly reality.

He does not need to offer for His own sins.

And He carries sin away fully.

Leviticus 16 ends with rest and humility.

The people afflict themselves, meaning they humble themselves before God. They do no work.

That is important.

On the Day of Atonement, Israel does not cleanse itself by effort.

Israel receives cleansing through the way God provides.

That is grace inside Leviticus.

The holy God who names uncleanness also provides cleansing.

The holy God who exposes sin also provides atonement.

The holy God who cannot be approached casually also makes a way for His people to remain near.

## Application & Reflection

Leviticus 13-16 teaches us that God takes uncleanness, sin, and restoration seriously.

That matters because we often want a shallow version of forgiveness.

We want God to say, It is fine.

But Leviticus does not say sin is fine.

It says sin is serious, uncleanness spreads, access to God matters, and cleansing must be provided.

That makes mercy deeper, not smaller.

God is not pretending the problem is light. He is providing an answer strong enough for the problem.

These chapters also speak to people who feel outside.

The restored person in Leviticus 14 begins outside the camp, but God provides a way back.

That is not a small detail.

God cares about restoration, not only separation.

For reflection:

- Do I treat sin and uncleanness as lightly as possible, or do I let God define the problem?
- Where do I need cleansing, not just a quick excuse?
- Do I believe God can restore people who have been outside?
- What does the scapegoat teach me about God carrying sin away?
- Am I trying to cleanse myself by effort instead of receiving the atonement God provides?

The big idea is this: God does not expose uncleanness to humiliate His people. He exposes it so cleansing, restoration, and atonement can happen His way.`;

export const BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_35_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Leviticus is showing how uncleanness is recognized, contained, cleansed, and restored.
- The Day of Atonement shows that Israel needs cleansing at the deepest level of worship.
- God provides a way for sin to be atoned for and carried away.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### The Priest Shall Look
The priest examines carefully before declaring clean or unclean. This shows that holiness requires discernment, patience, and truthful judgment.

### Outside The Camp
Outside the camp means outside the place of full covenant community and sanctuary access. It is painful, but it also protects life near God's holy presence.

### He Shall Be Clean
This phrase is hope. Leviticus does not only declare uncleanness; it also provides a way for restoration.

### The Mercy Seat
The mercy seat is the cover of the ark in the Most Holy Place. Blood is brought there because atonement is needed at the deepest point of Israel's worship.

### The Scapegoat
The live goat carries Israel's confessed sins into the wilderness. The picture is simple and powerful: God provides a way for sin to be removed from His people.

## What This Means

Leviticus 13-16 teaches that God provides cleansing for a people living near His holy presence.

- Uncleanness must be recognized honestly.
- Restoration is possible after uncleanness.
- Bodies, homes, garments, and worship all matter before God.
- The high priest needs atonement before serving the people.
- The Day of Atonement shows sin being cleansed and carried away.

This reading helps us understand why the Bible speaks so strongly about cleansing, atonement, priesthood, mercy, and removal of sin. God does not minimize the problem; He provides the way back.`,
}));
