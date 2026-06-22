import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_28_SECTIONS = [
  {
    reference: "Exodus 25:1-9",
    chapter: 25,
    startVerse: 1,
    endVerse: 9,
    heading: "A Willing Offering For God's Dwelling",
    summary: "God invites Israel to bring willing offerings so a sanctuary can be made among them.",
    teaching: [
      "Exodus 25 begins the tabernacle instructions, and the first thing God asks for is a willing offering.",
      "That matters because the God who brought Israel out of slavery does not build His dwelling through Pharaoh-style forced labor.",
      "The materials include gold, silver, bronze, fine linen, skins, wood, oil, spices, and precious stones.",
      "Many of these materials likely came from what Israel received from Egypt during the Exodus, which means the wealth of Egypt is now being redirected into worship.",
      "God gives the purpose clearly: Let them make me a sanctuary; that I may dwell among them.",
    ],
  },
  {
    reference: "Exodus 25:10-22",
    chapter: 25,
    startVerse: 10,
    endVerse: 22,
    heading: "The Ark And The Mercy Seat",
    summary: "God gives instructions for the ark, the mercy seat, and the place where He will meet with Moses.",
    teaching: [
      "The first piece of furniture described is the ark of the covenant, a gold-covered chest placed in the Most Holy Place.",
      "Inside it, Israel will keep the testimony, the covenant words God gives them.",
      "On top of the ark is the mercy seat, with cherubim overshadowing it.",
      "This is the meeting place where God says He will speak with Moses.",
      "That is a huge detail: at the center of Israel's worship is not performance, but God's holy presence meeting His people in mercy.",
    ],
  },
  {
    reference: "Exodus 25:23-40",
    chapter: 25,
    startVerse: 23,
    endVerse: 40,
    heading: "The Table And The Lampstand",
    summary: "God gives instructions for the table of bread and the golden lampstand inside the tabernacle.",
    teaching: [
      "The table holds the bread of the Presence, sometimes called showbread.",
      "Bread in the holy place teaches that fellowship with God includes provision and covenant relationship.",
      "The lampstand is made of pure gold and shaped with almond blossoms, branches, and lamps.",
      "Inside a covered tent, light has to be provided. The lampstand gives light in the holy place before the LORD.",
      "These details show that God's dwelling is not empty space. It is a place of presence, provision, beauty, light, and ordered worship.",
    ],
  },
  {
    reference: "Exodus 26:1-14",
    chapter: 26,
    startVerse: 1,
    endVerse: 14,
    heading: "Curtains For A Holy Tent",
    summary: "God gives instructions for the layered curtains and coverings of the tabernacle.",
    teaching: [
      "Exodus 26 begins with curtains made of fine linen, blue, purple, scarlet, and cherubim worked into the fabric.",
      "The colors and craftsmanship communicate beauty and holiness. This is not a casual tent thrown together in the wilderness.",
      "There are layers of covering, including goats' hair, rams' skins, and outer protective coverings.",
      "That means the tabernacle is both beautiful and practical. It is glorious inside and protected outside.",
      "The layered tent teaches that God's presence is graciously near, but still set apart.",
    ],
  },
  {
    reference: "Exodus 26:15-37",
    chapter: 26,
    startVerse: 15,
    endVerse: 37,
    heading: "Frames, Veil, And Holy Space",
    summary: "God gives instructions for the structure of the tabernacle and the veil separating the holy place from the Most Holy Place.",
    teaching: [
      "The tabernacle has frames, sockets, bars, curtains, and carefully arranged spaces.",
      "The veil separates the holy place from the Most Holy Place, where the ark and mercy seat will be placed.",
      "That veil matters because it teaches both nearness and separation.",
      "God is dwelling among His people, but His holiness is not treated casually.",
      "Later in Scripture, the tearing of the temple veil at Jesus' death will carry enormous meaning because this barrier language begins here.",
    ],
  },
  {
    reference: "Exodus 27:1-8",
    chapter: 27,
    startVerse: 1,
    endVerse: 8,
    heading: "The Bronze Altar",
    summary: "God gives instructions for the altar where sacrifices will be offered in the courtyard.",
    teaching: [
      "The bronze altar stands in the courtyard, before anyone reaches the holy place.",
      "That location matters. Sacrifice comes before approach.",
      "The altar is where offerings will be made, blood will be shed, and sin will be addressed through the system God provides.",
      "Bronze is used here rather than gold, fitting the outer court where sacrifice happens.",
      "The altar teaches that God's presence is not entered by casual confidence. Approach requires atonement.",
    ],
  },
  {
    reference: "Exodus 27:9-21",
    chapter: 27,
    startVerse: 9,
    endVerse: 21,
    heading: "The Courtyard And The Lamp Oil",
    summary: "God gives instructions for the tabernacle courtyard and the oil that keeps the lamp burning.",
    teaching: [
      "The courtyard creates a defined holy space around the tabernacle.",
      "Its curtains and entrance mark a boundary: Israel can approach, but approach happens through the way God provides.",
      "The chapter ends with oil for the lamp, so the light can burn continually before the LORD.",
      "Aaron and his sons are responsible to tend it from evening to morning.",
      "This prepares us for the next chapter, where the priesthood is described in detail.",
    ],
  },
  {
    reference: "Exodus 28:1-14",
    chapter: 28,
    startVerse: 1,
    endVerse: 14,
    heading: "Priests Set Apart For Ministry",
    summary: "Aaron and his sons are chosen for priestly service, and holy garments are made for glory and beauty.",
    teaching: [
      "Exodus 28 turns from the place of worship to the people who will serve there.",
      "Aaron and his sons are set apart as priests, meaning they will represent the people before God and serve in the tabernacle.",
      "The garments are made for glory and beauty, which tells us priestly ministry is not ordinary clothing for ordinary work.",
      "The ephod includes stones with the names of Israel's tribes.",
      "This means the priest does not come before God as a private individual; he carries the people on his shoulders.",
    ],
  },
  {
    reference: "Exodus 28:15-30",
    chapter: 28,
    startVerse: 15,
    endVerse: 30,
    heading: "The Breastpiece Over The Heart",
    summary: "The high priest carries the names of Israel's tribes over his heart before the LORD.",
    teaching: [
      "The breastpiece contains twelve stones, each connected to one of Israel's tribes.",
      "These stones are precious and varied, showing that the tribes are represented individually and beautifully before God.",
      "The high priest carries their names over his heart when he enters the holy place.",
      "That image is deeply pastoral. The people are not forgotten in worship; they are carried near God's presence.",
      "The Urim and Thummim are also placed in the breastpiece, connected with priestly guidance and judgment before the LORD.",
    ],
  },
  {
    reference: "Exodus 28:31-43",
    chapter: 28,
    startVerse: 31,
    endVerse: 43,
    heading: "Holy To The LORD",
    summary: "The remaining priestly garments show reverence, holiness, and the seriousness of approaching God.",
    teaching: [
      "The robe, bells, pomegranates, tunic, turban, sash, and linen garments all communicate that priestly service is holy work.",
      "The gold plate on Aaron's forehead says, Holy to the LORD.",
      "That phrase is one of the clearest summaries of priestly ministry. The priest is marked as set apart to God.",
      "The garments also cover nakedness, reminding us that sinful people cannot approach God's presence casually or exposed.",
      "Exodus 28 ends with the seriousness of ministry: the priests must serve according to God's instruction so they do not bear guilt and die.",
    ],
  },
] as const;

export const EXODUS_DAY_TWENTY_EIGHT_TABERNACLE_AND_PRIESTHOOD_LESSON: BibleYearDailyLesson = {
  dayNumber: 28,
  title: "The Tabernacle",
  reference: "Exodus 25-28",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 28 begins the tabernacle instructions.",
    "After covenant law and covenant blood, God now shows Moses the pattern for a sanctuary, furniture, holy space, an altar, a courtyard, and priestly garments.",
    "Exodus 25-28 answers one of the biggest questions in the Bible: how can the holy God dwell among His redeemed people?",
  ],
  sections: DAY_28_SECTIONS.map((section) => ({
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
    "Day 28 may look like measurements, materials, and clothing at first glance.",
    "But underneath every detail is a beautiful truth: God wants to dwell among His people, and He provides the way for them to approach Him.",
    "The tabernacle points to presence, holiness, sacrifice, light, bread, mercy, priesthood, and the larger story that will eventually lead us to Jesus.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_NOTES = `## Bible Reader Chapters Covered

- Exodus 25
- Exodus 26
- Exodus 27
- Exodus 28

## Chapter Introduction

Exodus 25-28 begins a new section of the story.

Israel has been rescued from Egypt, brought through the sea, fed in the wilderness, brought to Sinai, given the Ten Commandments, and brought into covenant with God through blood.

Now God gives Moses instructions for the tabernacle.

At first, these chapters can feel like a long list of materials, measurements, curtains, furniture, and clothing. But the deeper question is beautiful: how can the holy God dwell among His people?

The answer is not casual access. God gives a pattern. There is a sanctuary, an ark, a mercy seat, bread, light, curtains, a veil, an altar, a courtyard, oil, priests, and holy garments.

God is teaching Israel that His presence is near, but holy.

## Study Notes

Exodus 25 begins with a willing offering. God tells Moses to receive gifts from people whose hearts move them to give. This is very different from Pharaoh's forced labor. The tabernacle is built through worshipful giving, not oppression.

God then explains the purpose: Let them make me a sanctuary; that I may dwell among them.

The ark of the covenant is described first. It is a gold-covered chest that will hold the testimony, the covenant words God gives Israel. On top is the mercy seat with cherubim, the place where God says He will meet with Moses.

Then God gives instructions for the table of bread and the golden lampstand. The bread points to covenant fellowship and provision. The lampstand provides light in the holy place and is shaped with beautiful branch and blossom imagery.

Exodus 26 describes the tent itself. There are curtains, coverings, frames, sockets, bars, and a veil. The veil separates the holy place from the Most Holy Place, showing that God's presence is near but still set apart.

Exodus 27 describes the bronze altar and the courtyard. The altar stands before the holy place because sacrifice comes before approach. The courtyard creates a defined space where Israel can come near in the way God provides.

Exodus 28 focuses on the priesthood. Aaron and his sons are set apart to serve. Their garments are made for glory and beauty. The high priest carries the names of Israel's tribes on his shoulders and over his heart.

That is one of the most moving pictures in this reading. The priest does not enter God's presence for himself alone. He carries the people before the LORD.

## Deep Study Notes

The tabernacle is one of the most important pictures in the Old Testament.

It is not just ancient religious architecture.

It is a portable Eden-like sanctuary where the holy God dwells among His covenant people.

Think back to Genesis. In Eden, God was present with humanity. Sin broke that fellowship, and humanity was driven out. Cherubim guarded the way back to the tree of life.

Now in Exodus, cherubim appear again, embroidered into the tabernacle curtains and placed over the mercy seat. That is not accidental. The tabernacle is teaching Israel that access to God's presence is possible, but only through the way God provides.

The tabernacle is also built from the inside out in the instructions.

God begins with the ark, the mercy seat, and the Most Holy Place, then moves outward. That is different from how humans usually think. We start outside and ask how we can get in. God starts with His own presence and shows how He will make a way out toward His people.

The ark is central because it holds the testimony, the covenant words. God's throne-like mercy seat sits above the covenant. This teaches that God's rule and God's mercy belong together.

The mercy seat is especially important.

The Hebrew idea is connected to covering or atonement. It is the place where blood will later be applied on the Day of Atonement. That means the center of Israel's worship is not human achievement. It is God's mercy covering sin so He can dwell with His people.

The table of bread teaches provision and fellowship.

Bread is ordinary and necessary, but inside the holy place it becomes a sign that Israel lives before God's face. The tribes are represented before Him continually through the bread.

The lampstand teaches light and life.

Its branches, blossoms, and almond imagery feel almost tree-like. Many readers see garden echoes here. In the holy place, light shines in God's tent, reminding Israel that life with God is not darkness.

The curtains and veil teach holiness.

God is near enough to dwell in the camp, but not common enough to be treated casually. The veil says, God is here, but access is guarded.

That is why the tearing of the temple veil when Jesus dies is so powerful later in the Bible. The barrier that marked restricted access is opened through the death of Christ.

The bronze altar teaches sacrifice before approach.

You do not walk straight into holy space as if sin is no problem. The altar stands in the courtyard because atonement is necessary. Blood, sacrifice, and cleansing are part of how Israel learns the seriousness of God's holiness and the kindness of His provision.

The courtyard teaches ordered access.

God is not far away in heaven only. He gives Israel a place to come near. But they come near through the entrance, the altar, the priests, and the way He commands.

Then Exodus 28 introduces the priests.

The priesthood exists because the people need representation. Aaron and his sons serve on behalf of Israel. They carry names, offer sacrifices, tend the holy place, and bear responsibility before God.

The high priest's garments are full of meaning.

The shoulder stones carry the names of the tribes. Shoulders often picture strength and burden-bearing. The priest carries Israel before God.

The breastpiece carries the names over his heart. That is tender. The people are not just official names on a list. They are carried near the heart of the priest as he enters God's presence.

The gold plate on the forehead says, Holy to the LORD.

That phrase summarizes the priestly calling. The priest is marked as belonging to God, set apart for holy service, and responsible to represent the people rightly.

All of this points forward.

The tabernacle points to God's desire to dwell with His people. The sacrifices point to the need for atonement. The veil points to restricted access. The priest points to representation. The mercy seat points to covering. The bread and light point to life in God's presence.

Later, the New Testament will say that Jesus tabernacled among us, that He is our great high priest, that His blood opens the way, and that God will finally dwell with His people forever.

So Exodus 25-28 is not boring detail.

It is the architecture of redemption.

## Application & Reflection

Exodus 25-28 teaches us that God cares about how He is approached.

That may sound simple, but it cuts against the way many people think. We often assume sincerity is enough. But the tabernacle shows that God's presence is a gift, and He teaches His people how to come near.

This reading also teaches that God wants to dwell with His people.

He does not rescue Israel and then stay distant. He places His presence in the middle of the camp. The holy God makes a way to live among a sinful people through sacrifice, priesthood, mercy, and obedience.

For modern readers, this matters deeply:

- God is near, but He is holy.
- Worship should be willing, not forced.
- God's mercy is central, not human performance.
- We need representation before God.
- Access to God is a gift He provides.
- The details of worship matter because God matters.

The big idea is this: the God who brought Israel out now wants to dwell among them.

And the whole Bible keeps moving toward the day when God's dwelling will be with His people forever.`;

export const BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_28_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- God is giving Israel the pattern for His dwelling place.
- The tabernacle teaches both nearness and holiness.
- Priests are set apart to represent the people before the LORD.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### That I May Dwell Among Them
This is the heartbeat of the tabernacle section. God is not only giving Israel laws; He is making a way for His presence to live in the middle of the camp.

### After The Pattern
The tabernacle is not designed by human creativity alone. Moses must build according to God's pattern because worship is shaped by God's revelation.

### The Mercy Seat
The mercy seat is the meeting place above the ark. It points to covering, atonement, and God's mercy at the center of Israel's worship.

### The Veil
The veil separates the holy place from the Most Holy Place. It teaches that God is near, but His holiness cannot be approached casually.

### Holy To The LORD
This phrase on the priestly gold plate marks Aaron as set apart to God. Priesthood is about representing the people before a holy God.

## What This Means

Exodus 25-28 teaches that God's presence is both gracious and holy.

- God invites willing worship, not Pharaoh-style forced labor.
- The tabernacle places God's presence at the center of the camp.
- Sacrifice comes before approach.
- The veil teaches restricted access, while the mercy seat teaches God's provided mercy.
- The priest carries the people before God on his shoulders and over his heart.

This reading helps us see that the Bible's story is moving toward restored presence. The God who walked with humanity in Eden now provides a sanctuary in Israel, and the whole story will keep moving toward God dwelling with His people forever.`,
}));
