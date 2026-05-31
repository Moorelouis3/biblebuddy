import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_31_SECTIONS = [
  {
    reference: "Exodus 37:1-9",
    chapter: 37,
    startVerse: 1,
    endVerse: 9,
    heading: "The Ark And Mercy Seat Are Made",
    summary: "Bezalel makes the ark, cherubim, and mercy seat according to God's pattern.",
    teaching: [
      "Exodus 37 begins with Bezalel making the ark of the covenant.",
      "That matters because the ark is the central object in the Most Holy Place, the place connected with God's throne-like presence among Israel.",
      "The ark holds the testimony, and the mercy seat rests above it with cherubim overshadowing it.",
      "This means the center of Israel's worship is not Israel's achievement, but God's covenant word and mercy.",
      "After the golden calf, it is powerful to see Israel building the meeting place of mercy instead of shaping another idol.",
    ],
  },
  {
    reference: "Exodus 37:10-29",
    chapter: 37,
    startVerse: 10,
    endVerse: 29,
    heading: "Bread, Light, And Incense",
    summary: "The table, lampstand, altar of incense, anointing oil, and incense are made for tabernacle worship.",
    teaching: [
      "The craftsmen make the table for the bread of the Presence, the golden lampstand, and the altar of incense.",
      "These pieces belong inside the holy place, where Israel's worship is marked by bread, light, and prayer-like incense.",
      "The table reminds Israel that life before God includes provision and covenant fellowship.",
      "The lampstand brings light into the holy place, with branch and blossom imagery that echoes life and beauty.",
      "The incense altar stands near the veil, reminding Israel that nearness to God is fragrant, ordered, and holy.",
    ],
  },
  {
    reference: "Exodus 38:1-8",
    chapter: 38,
    startVerse: 1,
    endVerse: 8,
    heading: "The Altar And Laver Are Made",
    summary: "The bronze altar and bronze laver are made for sacrifice and priestly washing.",
    teaching: [
      "Exodus 38 moves to the bronze altar and bronze laver in the courtyard.",
      "The bronze altar is where sacrifice will be offered before anyone moves toward the holy place.",
      "That placement teaches that approach to God requires atonement.",
      "The laver is made for washing, reminding the priests that holy service requires cleansing.",
      "The bronze comes from the mirrors of the women who served at the entrance, turning objects of reflection into a tool for purification.",
    ],
  },
  {
    reference: "Exodus 38:9-20",
    chapter: 38,
    startVerse: 9,
    endVerse: 20,
    heading: "The Courtyard Is Built",
    summary: "The courtyard curtains, posts, sockets, entrance, and bronze equipment are made.",
    teaching: [
      "The courtyard creates a defined sacred space around the tabernacle.",
      "Its curtains, posts, sockets, and entrance show that Israel cannot approach God's dwelling randomly.",
      "There is a way in, but the way is ordered by God's instruction.",
      "This is grace and holiness together: God provides access, but not casual access.",
      "Even the outer boundaries of the tabernacle preach that God's presence is near, holy, and approached through the way He gives.",
    ],
  },
  {
    reference: "Exodus 38:21-31",
    chapter: 38,
    startVerse: 21,
    endVerse: 31,
    heading: "The Materials Are Counted",
    summary: "The gold, silver, and bronze used for the tabernacle are recorded.",
    teaching: [
      "Exodus pauses to record the materials used for the tabernacle.",
      "That may feel like bookkeeping, but it matters because the people's gifts are handled with accountability.",
      "Gold, silver, and bronze are counted, and the work is overseen under Moses' command through the Levites.",
      "This shows that worshipful generosity should not be sloppy or hidden.",
      "The tabernacle is built with willing gifts, but those gifts are still stewarded carefully before the LORD.",
    ],
  },
  {
    reference: "Exodus 39:1-31",
    chapter: 39,
    startVerse: 1,
    endVerse: 31,
    heading: "The Priestly Garments Are Made",
    summary: "The ephod, breastpiece, robe, tunics, turban, and holy crown are made for Aaron and his sons.",
    teaching: [
      "Exodus 39 describes the priestly garments being made just as God commanded Moses.",
      "The ephod, stones, breastpiece, robe, bells, pomegranates, tunics, and turban all communicate priestly holiness.",
      "The names of Israel's tribes are carried on the priest's shoulders and over his heart.",
      "That means the priest enters holy service as a representative, carrying the people before God.",
      "The gold plate says Holy to the LORD, marking the priesthood as belonging to God, not personal status.",
    ],
  },
  {
    reference: "Exodus 39:32-43",
    chapter: 39,
    startVerse: 32,
    endVerse: 43,
    heading: "Moses Inspects The Finished Work",
    summary: "The tabernacle pieces are brought to Moses, and he sees that the people did exactly as the LORD commanded.",
    teaching: [
      "The people bring the completed tabernacle parts to Moses.",
      "The repeated phrase is important: as the LORD commanded Moses.",
      "This is the opposite of the golden calf, where Israel invented worship on its own terms.",
      "Now the people are obeying the pattern God gave.",
      "Moses sees the work, blesses the people, and the finished tabernacle becomes a testimony that renewed obedience is possible after failure.",
    ],
  },
  {
    reference: "Exodus 40:1-16",
    chapter: 40,
    startVerse: 1,
    endVerse: 16,
    heading: "The Tabernacle Is Set Up",
    summary: "God commands Moses to set up the tabernacle, arrange the furniture, anoint the sanctuary, and consecrate the priests.",
    teaching: [
      "Exodus 40 gives the instructions for setting up the tabernacle on the first day of the first month.",
      "That timing matters because it sounds like a new beginning for Israel.",
      "The furniture is arranged, the sanctuary is anointed, and Aaron and his sons are washed, clothed, and consecrated.",
      "Everything that was designed, made, and inspected is now being put into place.",
      "The tabernacle is not merely a project completed; it is a dwelling prepared for the presence of God.",
    ],
  },
  {
    reference: "Exodus 40:17-33",
    chapter: 40,
    startVerse: 17,
    endVerse: 33,
    heading: "Moses Finishes The Work",
    summary: "Moses sets up the tabernacle and arranges every part as the LORD commanded.",
    teaching: [
      "Moses sets up the tabernacle in careful obedience.",
      "The ark, veil, table, lampstand, incense altar, bronze altar, laver, courtyard, and screen are all placed as God commanded.",
      "Again and again, the text repeats that Moses did what the LORD commanded.",
      "That repetition is not boring filler. It is the point.",
      "After the chaos of idolatry, the story slows down to show obedience in detail.",
    ],
  },
  {
    reference: "Exodus 40:34-38",
    chapter: 40,
    startVerse: 34,
    endVerse: 38,
    heading: "The Glory Fills The Tabernacle",
    summary: "The cloud covers the tent of meeting, the glory of the LORD fills the tabernacle, and God guides Israel's journey.",
    teaching: [
      "Exodus ends with the cloud covering the tent and the glory of the LORD filling the tabernacle.",
      "This is the answer to the question that has been building since the golden calf: will God dwell with His people?",
      "The answer is yes, but only through mercy, covenant renewal, sacrifice, priesthood, and obedience to God's pattern.",
      "Moses cannot enter because the glory is so overwhelming.",
      "The book ends with God's presence at the center of the camp, guiding Israel by cloud and fire through all their journeys.",
    ],
  },
] as const;

export const EXODUS_DAY_THIRTY_ONE_TABERNACLE_FINISHED_LESSON: BibleYearDailyLesson = {
  dayNumber: 31,
  title: "The Tabernacle Is Finished",
  reference: "Exodus 37-40",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 31 brings the book of Exodus to its beautiful conclusion.",
    "The craftsmen make the ark, mercy seat, table, lampstand, incense altar, bronze altar, laver, courtyard, priestly garments, and every piece of the tabernacle according to God's command.",
    "Then Moses sets it all up, and the glory of the LORD fills the tabernacle.",
  ],
  sections: DAY_31_SECTIONS.map((section) => ({
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
    "Day 31 shows the goal of Exodus: God did not merely rescue Israel from Egypt; He came to dwell among them.",
    "The book that began with groaning under Pharaoh ends with God's glory in the middle of the camp.",
    "Exodus closes with cloud and fire, reminding us that the redeemed people still have a journey ahead, but they do not travel alone.",
  ],
};

export const BIBLE_YEAR_DAY_THIRTY_ONE_DEEP_NOTES = `## Bible Reader Chapters Covered

- Exodus 37
- Exodus 38
- Exodus 39
- Exodus 40

## Chapter Introduction

Exodus 37-40 finishes the book of Exodus.

The instructions God gave earlier are now carried out. The ark is made. The mercy seat is made. The table, lampstand, incense altar, bronze altar, laver, courtyard, and priestly garments are completed.

Then all the pieces are brought to Moses. He inspects the work and sees that everything has been done as the LORD commanded.

Finally, the tabernacle is set up.

And then the moment comes: the cloud covers the tent of meeting, and the glory of the LORD fills the tabernacle.

Exodus began with Israel groaning under Pharaoh's slavery. It ends with the LORD's glory dwelling in the middle of Israel's camp.

That is the movement of the whole book: bondage to worship, slavery to presence, Pharaoh's rule to God's glory.

## Study Notes

Exodus 37 describes Bezalel making the ark, mercy seat, table, lampstand, incense altar, anointing oil, and incense. These are the pieces connected with God's presence, covenant, provision, light, and prayer-like worship.

The ark and mercy seat stand at the heart of the tabernacle. God's covenant word is inside the ark, and the mercy seat is above it. That picture is powerful: God's rule, God's word, and God's mercy belong together.

Exodus 38 describes the bronze altar, laver, courtyard, and the record of materials. The altar teaches sacrifice before approach. The laver teaches cleansing before priestly service. The courtyard teaches ordered access to holy space.

The material count shows accountability. Israel's willing gifts are not handled carelessly. Worshipful generosity still needs faithful stewardship.

Exodus 39 describes the priestly garments. Aaron's garments carry the names of Israel's tribes on the shoulders and over the heart. The priest represents the people before God.

The repeated phrase in Exodus 39 is important: as the LORD commanded Moses. The people are no longer inventing worship like they did with the golden calf. They are obeying God's pattern.

Exodus 40 sets up the tabernacle. Moses places every piece where God commanded. The ark goes behind the veil. The table, lampstand, incense altar, bronze altar, laver, and courtyard are arranged.

Then the glory of the LORD fills the tabernacle.

Moses cannot enter because the glory is so overwhelming. The cloud and fire guide Israel through all their journeys.

## Deep Study Notes

Exodus 37-40 may feel repetitive because many of these details were already described in earlier chapters.

But the repetition is the point.

Earlier, God gave the pattern.

Now Israel obeys the pattern.

That matters especially after the golden calf. In Exodus 32, the people made worship according to their own desire, fear, impatience, and imagination. In Exodus 37-40, the people build according to the word of the LORD.

This is the difference between idolatry and obedience.

Idolatry says, Let us make.

Obedience says, As the LORD commanded.

That phrase appears again and again in these chapters. It may sound repetitive, but it is preaching the healing of Israel's worship. The people who once gave gold for a calf have now given gold for the ark, mercy seat, lampstand, and holy service.

The ark and mercy seat come first in the construction list.

This keeps the focus where it belongs: the center of the tabernacle is God's presence, God's covenant word, and God's mercy.

The mercy seat is especially important because it is the place where atonement language gathers. Israel's relationship with God cannot be maintained by pretending sin is small. Mercy sits at the center because sin needs covering.

The table of bread shows fellowship and provision.

The lampstand shows light and life in the holy place.

The altar of incense shows nearness, prayer, and holy fragrance before the veil.

The bronze altar shows sacrifice before approach.

The laver shows cleansing before service.

The courtyard shows that access is provided, but ordered.

The priestly garments show representation.

Aaron carries Israel's names on his shoulders and over his heart. That is not just decoration. The priest bears the people before God in strength and affection.

The gold plate says Holy to the LORD. The priest cannot treat ministry as personal importance. His identity is marked by belonging to God.

Then Moses inspects the work.

This is a beautiful moment. The people have completed what God commanded, and Moses blesses them.

Think about how far the people have come.

They were slaves under Pharaoh.

They were terrified at the sea.

They complained in the wilderness.

They made the golden calf.

And now, by God's mercy, they have built the tabernacle according to His word.

That does not make them perfect.

But it shows that failure does not have to be the final word when God shows mercy and restores obedience.

Exodus 40 brings everything together.

The tabernacle is set up on the first day of the first month, giving the moment a new-beginning feeling. The pieces are arranged. The priests are consecrated. The courtyard is finished.

Then the glory fills the tabernacle.

This is the climax of Exodus.

God's glory comes down to dwell among the people He rescued.

The book began with Pharaoh trying to control Israel's bodies, labor, sons, and future. It ends with the LORD filling the tabernacle and guiding Israel by cloud and fire.

That is a complete reversal.

Pharaoh said, Work for me.

God says, I will dwell among you.

Pharaoh filled Israel's life with burdens.

God fills the tabernacle with glory.

Pharaoh would not let Israel go worship.

Now Israel has a sanctuary in the middle of the camp.

The final verses also remind us that the journey is not over. The cloud lifts when Israel is to move. The cloud stays when they are to stay. Fire appears by night.

That means Exodus ends with presence and guidance.

The people are not home yet.

But God is with them.

## Application & Reflection

Exodus 37-40 teaches that God's rescue is aimed at presence.

God did not bring Israel out of Egypt simply so they could be free from Pharaoh. He brought them out so He could dwell among them, guide them, shape them, and be known as their God.

This matters for us because we often want rescue without surrender, blessing without obedience, and direction without presence.

But Exodus ends by showing a better goal.

The glory of God in the middle of the people.

For modern readers, this passage gives several clear takeaways:

- Obedience matters, especially after failure.
- Worship should be shaped by God's word, not personal invention.
- Mercy belongs at the center of life with God.
- God's people need sacrifice, cleansing, and representation.
- Generosity should be handled with accountability.
- God's presence is better than mere escape from trouble.
- The journey is not over, but God's guidance is enough for the next step.

The big idea is simple and beautiful: the God who rescues also dwells.

Exodus ends with Israel still in the wilderness, but not abandoned in the wilderness.

The cloud is there.

The fire is there.

The glory is there.

And that changes everything.`;

export const BIBLE_YEAR_DAY_THIRTY_ONE_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_31_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Israel is now building according to God's pattern instead of inventing worship.
- The tabernacle pieces teach mercy, sacrifice, cleansing, light, bread, prayer, priesthood, and holy access.
- Exodus ends with God's glory filling the tabernacle and guiding the journey.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### As The LORD Commanded Moses
This repeated phrase is the heartbeat of the final chapters. After the golden calf, Israel's worship is being healed through careful obedience to God's word.

### The Mercy Seat
The mercy seat sits above the ark and becomes the meeting place connected with atonement. Mercy stands at the center of Israel's worship because sin needs covering.

### Holy Crown
The priestly gold plate marks Aaron as Holy to the LORD. Priestly ministry belongs to God and represents the people before Him.

### Moses Did Look Upon All The Work
Moses inspects the finished work and blesses the people. Their willing gifts and skilled labor have become obedient worship.

### The Glory Of The LORD Filled The Tabernacle
This is the climax of Exodus. God comes to dwell among the people He rescued from Egypt.

## What This Means

Exodus 37-40 shows the goal of redemption: God's presence with His people.

- The people move from idolatrous making to obedient making.
- Every tabernacle piece teaches something about approaching a holy God.
- The priesthood shows that the people need representation before God.
- The finished work proves that mercy can produce renewed obedience.
- The glory filling the tabernacle shows that God truly dwells with His redeemed people.

Exodus ends with Israel still on a journey, but not alone. The same God who heard their groaning, judged Egypt, opened the sea, gave covenant, showed mercy, and restored worship now fills the tabernacle and guides them by cloud and fire.`,
}));
