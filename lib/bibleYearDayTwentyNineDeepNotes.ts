import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_29_SECTIONS = [
  {
    reference: "Exodus 29:1-9",
    chapter: 29,
    startVerse: 1,
    endVerse: 9,
    heading: "Aaron And His Sons Are Consecrated",
    summary: "God gives instructions for washing, clothing, anointing, and setting apart the priests.",
    teaching: [
      "Exodus 29 continues the priesthood instructions by showing how Aaron and his sons are consecrated for ministry.",
      "Consecrated means set apart for God's holy service. They cannot simply walk into priestly work because they feel ready.",
      "The process begins with washing, clothing, and anointing.",
      "That order matters. The priests need cleansing, covering, and God's appointed setting apart before they serve.",
      "This teaches Israel that access to God's presence requires preparation God Himself provides.",
    ],
  },
  {
    reference: "Exodus 29:10-28",
    chapter: 29,
    startVerse: 10,
    endVerse: 28,
    heading: "Blood, Sacrifice, And Priesthood",
    summary: "Sacrifices are offered for the priests, and blood marks their consecration.",
    teaching: [
      "The priests themselves need sacrifice before they can serve for others.",
      "That is an important detail because Aaron and his sons are not sinless mediators. They need atonement too.",
      "The bull is offered as a sin offering, and rams are offered as part of consecration.",
      "Blood is placed on Aaron and his sons, marking the ear, thumb, and toe.",
      "This picture teaches that priestly life belongs wholly to God: hearing, doing, and walking are all consecrated.",
    ],
  },
  {
    reference: "Exodus 29:29-46",
    chapter: 29,
    startVerse: 29,
    endVerse: 46,
    heading: "God Meets Israel At The Tent",
    summary: "God gives instructions for ongoing offerings and promises to dwell among Israel as their God.",
    teaching: [
      "The consecration lasts seven days, showing that priestly service is not rushed.",
      "Then God gives instructions for daily offerings, morning and evening.",
      "That rhythm teaches Israel that worship is not only occasional emotion; it is steady daily life before the LORD.",
      "The chapter ends with a beautiful promise: God will meet with Israel, sanctify the tabernacle, dwell among them, and be their God.",
      "This is the heart behind all the details. The holy God is making a way to live with His people.",
    ],
  },
  {
    reference: "Exodus 30:1-10",
    chapter: 30,
    startVerse: 1,
    endVerse: 10,
    heading: "The Altar Of Incense",
    summary: "God gives instructions for the altar of incense that stands before the veil.",
    teaching: [
      "The altar of incense stands before the veil, close to the Most Holy Place.",
      "Incense is burned on it every morning and evening as part of the priestly rhythm.",
      "In Scripture, incense often becomes connected with prayer rising before God.",
      "The altar must not be used however Israel wants. No strange incense or unauthorized offering belongs there.",
      "This teaches that nearness to God is beautiful, but still ordered by God's holiness.",
    ],
  },
  {
    reference: "Exodus 30:11-21",
    chapter: 30,
    startVerse: 11,
    endVerse: 21,
    heading: "Ransom Money And The Bronze Laver",
    summary: "God gives instructions for census ransom money and priestly washing at the bronze basin.",
    teaching: [
      "When Israel is counted, each person gives ransom money to the LORD.",
      "The rich do not give more and the poor do not give less, because every life needs ransom equally.",
      "That is a powerful picture: before God, worth is not measured by wealth.",
      "The bronze laver is also given so priests can wash before entering the tent or approaching the altar.",
      "Again, Exodus is teaching that service near God requires cleansing, not casual self-confidence.",
    ],
  },
  {
    reference: "Exodus 30:22-38",
    chapter: 30,
    startVerse: 22,
    endVerse: 38,
    heading: "Holy Oil And Holy Incense",
    summary: "God gives the recipe for sacred anointing oil and incense, reserving them for holy use.",
    teaching: [
      "The anointing oil and incense are made from costly spices according to God's instruction.",
      "They are not ordinary perfume products. They are holy and set apart for tabernacle service.",
      "God forbids copying them for common use.",
      "That may sound strange at first, but it teaches Israel that holy things are not to be turned into personal decoration or entertainment.",
      "The scent of worship belongs to the LORD because His presence is not common.",
    ],
  },
  {
    reference: "Exodus 31:1-11",
    chapter: 31,
    startVerse: 1,
    endVerse: 11,
    heading: "Bezalel And Oholiab Are Filled With Skill",
    summary: "God appoints craftsmen and fills them with wisdom to build the tabernacle.",
    teaching: [
      "God names Bezalel and fills him with the Spirit of God in wisdom, understanding, knowledge, and craftsmanship.",
      "This is one of the Bible's beautiful reminders that Spirit-filled work is not limited to preaching or public leadership.",
      "Art, design, metalwork, fabric, carving, and skilled making can all serve God's worship.",
      "Oholiab and other skilled workers are also appointed, showing that the tabernacle is a shared work.",
      "God gives both the pattern and the people gifted to carry it out.",
    ],
  },
  {
    reference: "Exodus 31:12-18",
    chapter: 31,
    startVerse: 12,
    endVerse: 18,
    heading: "Sabbath Sign And Stone Tablets",
    summary: "God repeats the Sabbath command and gives Moses the tablets written by the finger of God.",
    teaching: [
      "Before the golden calf story, God repeats the Sabbath command.",
      "That placement matters. Even while building something as holy as the tabernacle, Israel must not ignore God's rhythm of rest.",
      "The Sabbath is called a sign between God and Israel.",
      "It reminds them that the LORD sanctifies them. Their identity comes from Him, not from endless labor.",
      "Then God gives Moses the two tablets of testimony, written by the finger of God.",
    ],
  },
  {
    reference: "Exodus 32:1-6",
    chapter: 32,
    startVerse: 1,
    endVerse: 6,
    heading: "The Golden Calf",
    summary: "Israel grows impatient while Moses is on the mountain and makes a golden calf for worship.",
    teaching: [
      "Exodus 32 is shocking because it happens while God is giving Moses instructions for true worship.",
      "The people see that Moses delays, and they demand visible gods to go before them.",
      "Aaron collects gold, forms a calf, and the people identify it with the god who brought them out of Egypt.",
      "That is the tragedy. They are not simply rejecting worship; they are corrupting worship by remaking God into an image they can control.",
      "The gold that could have served the tabernacle is now shaped into an idol.",
    ],
  },
  {
    reference: "Exodus 32:7-14",
    chapter: 32,
    startVerse: 7,
    endVerse: 14,
    heading: "Moses Intercedes For The People",
    summary: "God tells Moses about Israel's sin, and Moses pleads for mercy based on God's name and promises.",
    teaching: [
      "God tells Moses to go down because the people have corrupted themselves.",
      "The language is severe because covenant betrayal is severe.",
      "Moses intercedes by appealing to God's reputation among the nations and His promises to Abraham, Isaac, and Israel.",
      "That is important: Moses does not excuse the sin. He pleads for mercy based on God's covenant character.",
      "This scene shows Moses standing in the gap between a holy God and a guilty people.",
    ],
  },
  {
    reference: "Exodus 32:15-29",
    chapter: 32,
    startVerse: 15,
    endVerse: 29,
    heading: "The Tablets Are Broken",
    summary: "Moses descends, breaks the tablets, destroys the calf, confronts Aaron, and judgment falls in the camp.",
    teaching: [
      "Moses comes down carrying the tablets written by God, but he finds Israel worshiping the calf.",
      "He breaks the tablets at the foot of the mountain, which visually shows the covenant has been broken.",
      "Then he burns the calf, grinds it to powder, scatters it on the water, and makes Israel drink it.",
      "Aaron's excuse is painfully weak. He blames the people and speaks as if the calf simply came out of the fire.",
      "The Levites rally to Moses, and judgment falls, showing that idolatry is not a harmless mistake.",
    ],
  },
  {
    reference: "Exodus 32:30-35",
    chapter: 32,
    startVerse: 30,
    endVerse: 35,
    heading: "Moses Offers Himself",
    summary: "Moses returns to the LORD, confesses Israel's sin, and offers to be blotted out for the people.",
    teaching: [
      "The next day, Moses tells the people they have sinned a great sin.",
      "He returns to the LORD and asks whether he can make atonement for them.",
      "Moses confesses the sin honestly: they made themselves gods of gold.",
      "Then he offers himself, asking to be blotted out of God's book if God will not forgive them.",
      "God does not accept Moses as a substitute in that final way, but the scene points forward to the need for a greater mediator.",
    ],
  },
] as const;

export const EXODUS_DAY_TWENTY_NINE_CONSECRATION_AND_GOLDEN_CALF_LESSON: BibleYearDailyLesson = {
  dayNumber: 29,
  title: "Consecration and the Golden Calf",
  reference: "Exodus 29-32",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 29 begins with priestly consecration and daily worship, but it ends with one of Israel's darkest covenant failures.",
    "While God is giving Moses instructions for holy worship, the people below the mountain grow impatient and make the golden calf.",
    "Exodus 29-32 shows the beauty of God's desire to dwell with Israel and the danger of trying to remake God into something visible, manageable, and convenient.",
  ],
  sections: DAY_29_SECTIONS.map((section) => ({
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
    "Day 29 is both beautiful and painful.",
    "God provides priesthood, sacrifice, cleansing, incense, craftsmanship, Sabbath, and tablets written by His own finger.",
    "But Israel turns gold into an idol, breaks covenant, and needs a mediator. The story leaves us longing for a better priest, a better mediator, and a deeper atonement.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_NOTES = `## Bible Reader Chapters Covered

- Exodus 29
- Exodus 30
- Exodus 31
- Exodus 32

## Chapter Introduction

Exodus 29-32 is one of the strongest contrasts in the book.

At the top of the mountain, God is giving Moses instructions for priests, sacrifice, cleansing, incense, holy oil, skilled craftsmanship, Sabbath, and the tablets of the covenant.

At the bottom of the mountain, Israel is about to make a golden calf.

That contrast matters.

God is making a way to dwell with His people, but the people are already trying to worship on their own terms. God is giving a pattern for holy presence, while Israel is creating an image they can see, touch, and control.

This reading shows both the beauty of true worship and the danger of false worship.

## Study Notes

Exodus 29 explains how Aaron and his sons are consecrated as priests. They are washed, clothed, anointed, and marked through sacrifice. The priests themselves need atonement before they can serve for the people.

Blood is placed on the ear, thumb, and toe, showing that the whole priestly life belongs to God: what they hear, what they do, and how they walk.

The chapter ends with daily offerings and God's promise to dwell among Israel. The point of the tabernacle system is not empty ritual. God says He will meet with them and be their God.

Exodus 30 gives instructions for the altar of incense, ransom money, the bronze laver, holy anointing oil, and holy incense. These details teach that prayer, cleansing, ransom, and holiness all matter in approaching God.

Exodus 31 names Bezalel and Oholiab as craftsmen filled with skill by God. This is a beautiful reminder that artistic and practical skill can be Spirit-given service. Then God repeats the Sabbath command and gives Moses the stone tablets written by the finger of God.

Exodus 32 brings the golden calf. The people grow impatient because Moses is delayed. They ask Aaron to make gods to go before them. Aaron collects gold and forms a calf.

The tragedy is not only that Israel worships an idol. They attach God's rescue to the idol, saying this is the god who brought them out of Egypt.

God tells Moses what has happened, and Moses intercedes. He appeals to God's name and God's promises to Abraham, Isaac, and Israel.

Moses then descends, breaks the tablets, destroys the calf, confronts Aaron, and judgment falls. Finally, Moses returns to God and offers himself for the people, showing the need for a mediator greater than Moses.

## Deep Study Notes

Exodus 29-32 teaches that worship is never neutral.

Either worship is shaped by God's word, or it is shaped by human fear, impatience, and desire for control.

In Exodus 29, God gives priestly consecration. The priests must be washed, clothed, anointed, and covered by sacrifice. That teaches a major truth: no one walks into holy ministry on natural ability alone.

Aaron's priesthood is not based on Aaron being morally impressive.

That becomes painfully clear in Exodus 32.

Aaron is the man being dressed for priestly service in the instructions, but he is also the man who gives in to the crowd and helps form the calf. The Bible is not hiding the weakness of its priests.

That is why sacrifice matters.

The priest needs atonement too.

Blood on the ear, thumb, and toe is a powerful image. The ear is consecrated to hear God's word. The hand is consecrated for holy work. The foot is consecrated for a holy walk.

God is claiming the whole person.

The daily offerings also matter. Morning and evening sacrifice create a rhythm of worship around the presence of God. Israel's life is meant to be framed by continual dependence.

Exodus 30 then adds the altar of incense. Incense rises near the veil, close to the Most Holy Place. Later Scripture connects incense with the prayers of God's people. The picture is beautiful: prayer rises before God in the holy place.

But the incense must be holy. It cannot be copied for personal use or replaced with strange incense.

That teaches that nearness to God is not casual personalization. Israel does not get to remix worship however they want.

The ransom money in Exodus 30 is also important.

The rich do not give more, and the poor do not give less. Each gives the same ransom. Before God, every life needs covering, and human worth is not measured by income.

Then the bronze laver teaches cleansing. Priests must wash before serving. They may be clothed in holy garments, but they still need cleansing before entering holy work.

Exodus 31 names Bezalel and Oholiab.

This is an aha moment because the Spirit of God fills Bezalel for craftsmanship. He is filled with wisdom, understanding, knowledge, and skill to make beautiful things for worship.

That means Spirit-filled work includes more than speaking from a platform. God gifts artists, builders, designers, makers, and skilled workers for His glory.

Then comes the Sabbath reminder.

Even tabernacle work must stop for Sabbath.

That is huge.

God's work done in God's way will not violate God's rhythm. The tabernacle is holy, but so is the Sabbath. Ministry cannot become an excuse to live like Pharaoh is still in charge.

Then God gives Moses the tablets written by the finger of God.

And immediately the story drops us into covenant betrayal.

The golden calf begins with delay. Moses is taking longer than the people expected, and delay exposes their hearts.

They want something visible to go before them. That sounds understandable at a human level, but spiritually it is deadly. God has already gone before them in cloud and fire, but they want a god they can manage.

The calf probably connects with familiar ancient symbols of strength, fertility, and divine power. Israel is doing what humans often do: borrowing religious images from the world around them and attaching God's name to them.

That is why the calf is so dangerous.

It is not only replacing God. It is misrepresenting God.

They say the calf brought them out of Egypt. They call a feast to the LORD around an idol. They mix true language with false worship.

This is the kind of idolatry that can feel religious while being deeply rebellious.

Moses' intercession is powerful. He appeals to God's reputation, God's promises, and God's covenant with the fathers. He does not say the people are innocent. He asks for mercy because of who God is.

When Moses breaks the tablets, it is not a random outburst. The broken tablets symbolize the broken covenant.

The calf is destroyed, ground to powder, scattered on water, and given to Israel to drink. The idol they wanted must be tasted as judgment. False worship always becomes bitter.

Aaron's excuse is almost embarrassing. He says the people gave him gold, he threw it into the fire, and out came this calf. It is the language of blame-shifting and spiritual irresponsibility.

At the end, Moses offers himself. He asks God to forgive the people, and if not, to blot him out of the book.

God does not accept Moses as the final substitute, but Moses' heart points forward.

Israel needs a mediator who can do more than plead.

They need one who can actually bear sin.

The golden calf story leaves the reader longing for Jesus, the better mediator, the true high priest, and the one who gives Himself for His people.

## Application & Reflection

Exodus 29-32 is painfully relevant.

Most people do not build golden calves today, but we still want visible, manageable versions of God. We still get impatient. We still want worship that feels easier than waiting. We still try to attach God's name to things He never commanded.

This reading asks hard questions:

- Do I let God define worship, or do I reshape Him around my comfort?
- What do I do when God seems delayed?
- Am I using gifts for God's dwelling or turning them into idols?
- Do I treat Sabbath as holy, even when the work feels important?
- Do I recognize my need for cleansing and mediation?

The good news is that even here, God does not abandon the story.

Judgment is real. Sin is serious. The covenant is broken.

But Moses intercedes, and the larger story keeps moving toward a better mediator.

The big idea is this: God is holy, idolatry is deadly, and sinful people need a mediator who can truly make atonement.`;

export const BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_29_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- God is preparing priests and worship so He can dwell with Israel.
- Holy service requires cleansing, sacrifice, consecration, and obedience.
- The golden calf shows how quickly fear and impatience can corrupt worship.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### Consecrate Them
Consecration means being set apart for God's holy service. Aaron and his sons cannot enter priestly work casually; they must be washed, clothed, anointed, and covered by sacrifice.

### There I Will Meet With The Children Of Israel
This is the heart of the tabernacle system. God is not giving empty rituals; He is making a way to meet with His people.

### Written With The Finger Of God
The tablets are not merely human law. They carry divine authority and covenant weight.

### Make Us Gods
This phrase reveals Israel's impatience and desire for visible control. They want something they can see and manage instead of waiting for the unseen God who rescued them.

### Blot Me, I Pray Thee, Out Of Thy Book
Moses offers himself for the people. God does not accept Moses as the final substitute, but this points forward to the need for a greater mediator.

## What This Means

Exodus 29-32 teaches the beauty of true worship and the danger of false worship.

- Priests need cleansing and sacrifice before serving others.
- Daily worship trains God's people in steady dependence.
- Skill and craftsmanship can be Spirit-filled service.
- Sabbath remains holy, even when the work is holy.
- Idolatry often begins with impatience and a desire for control.
- God's people need a mediator who can truly deal with sin.

This reading reminds us that worship must be shaped by God's word. The same gold can become sanctuary material or an idol, depending on whether it is surrendered to God or shaped by human fear.`,
}));
