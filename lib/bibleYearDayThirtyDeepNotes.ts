import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_30_SECTIONS = [
  {
    reference: "Exodus 33:1-6",
    chapter: 33,
    startVerse: 1,
    endVerse: 6,
    heading: "A Land Without Presence Would Be Empty",
    summary: "After the golden calf, God tells Israel to go toward the land, but warns that His presence will not go in the same way.",
    teaching: [
      "Exodus 33 begins in the aftermath of the golden calf.",
      "God tells Moses the journey to the promised land will continue, but He also says He will not go up in the midst of the people because they are stiff-necked.",
      "That is devastating because the land without God's presence would not be the real blessing Israel needs.",
      "The people mourn and remove their ornaments, showing that the crisis is finally beginning to weigh on them.",
      "This section teaches that God's gifts are never meant to replace God Himself.",
    ],
  },
  {
    reference: "Exodus 33:7-11",
    chapter: 33,
    startVerse: 7,
    endVerse: 11,
    heading: "Moses Meets With God",
    summary: "Moses meets with the LORD at the tent of meeting, and the LORD speaks with him face to face.",
    teaching: [
      "Moses takes the tent and pitches it outside the camp, calling it the tent of meeting.",
      "That location matters because Israel's sin has disrupted the closeness of God's presence in the camp.",
      "When Moses enters the tent, the pillar of cloud descends, and the people worship from their tent doors.",
      "The text says the LORD speaks to Moses face to face, as a man speaks to his friend.",
      "This does not mean Moses sees all of God's essence; it means Moses has unusually direct covenant access with God.",
    ],
  },
  {
    reference: "Exodus 33:12-23",
    chapter: 33,
    startVerse: 12,
    endVerse: 23,
    heading: "Show Me Thy Glory",
    summary: "Moses pleads for God's presence to go with Israel and asks to see God's glory.",
    teaching: [
      "Moses refuses to treat the promised land as enough without God's presence.",
      "He says that what makes Israel distinct is not land, power, or success, but the LORD going with them.",
      "God promises, My presence shall go with thee, and I will give thee rest.",
      "Then Moses asks, Show me thy glory.",
      "God responds by promising to make His goodness pass before Moses and proclaim His name, while protecting Moses from seeing the fullness of His face.",
    ],
  },
  {
    reference: "Exodus 34:1-9",
    chapter: 34,
    startVerse: 1,
    endVerse: 9,
    heading: "The LORD Proclaims His Name",
    summary: "God gives new tablets and reveals His character as merciful, gracious, patient, faithful, and just.",
    teaching: [
      "Exodus 34 begins with new tablets, replacing the tablets Moses broke after the golden calf.",
      "This does not erase Israel's sin, but it shows that God is renewing covenant mercy.",
      "The LORD descends in the cloud and proclaims His name.",
      "This is one of the most important self-revelations of God in the Bible: merciful, gracious, longsuffering, abundant in goodness and truth, forgiving, yet just.",
      "Moses immediately bows and pleads for the LORD to go among the people.",
    ],
  },
  {
    reference: "Exodus 34:10-28",
    chapter: 34,
    startVerse: 10,
    endVerse: 28,
    heading: "The Covenant Is Renewed",
    summary: "God renews covenant commands and warns Israel against idolatry and compromise in the land.",
    teaching: [
      "God renews the covenant and warns Israel not to make covenants with the inhabitants of the land.",
      "That warning matters after the golden calf because Israel has already shown how quickly worship can be corrupted.",
      "They must tear down altars, avoid idols, and refuse spiritual compromise.",
      "God repeats commands about feasts, firstborn, Sabbath, and worship, anchoring Israel again in covenant rhythms.",
      "Moses remains with the LORD forty days and nights, and the covenant words are written again.",
    ],
  },
  {
    reference: "Exodus 34:29-35",
    chapter: 34,
    startVerse: 29,
    endVerse: 35,
    heading: "Moses' Face Shines",
    summary: "Moses comes down from the mountain with a shining face after speaking with the LORD.",
    teaching: [
      "When Moses comes down with the tablets, his face shines because he has been speaking with the LORD.",
      "The people are afraid to come near him, which shows the visible weight of God's glory reflected on Moses.",
      "Moses speaks God's commands to them, then covers his face with a veil.",
      "The shining face shows that time with God leaves a mark.",
      "It also prepares later biblical reflection about glory, covenant, veiling, and the greater glory revealed in Christ.",
    ],
  },
  {
    reference: "Exodus 35:1-19",
    chapter: 35,
    startVerse: 1,
    endVerse: 19,
    heading: "Sabbath And The Tabernacle Offering",
    summary: "Moses gathers Israel, repeats the Sabbath command, and calls for offerings and skilled work for the tabernacle.",
    teaching: [
      "Exodus 35 begins the actual response to the tabernacle instructions.",
      "Before the work begins, Moses repeats the Sabbath command.",
      "That order matters because even holy work must be done God's way.",
      "Then Moses calls for offerings from willing hearts: gold, silver, bronze, fabric, skins, wood, oil, spices, stones, and skilled labor.",
      "Israel is being invited to give for God's dwelling after having misused gold for the calf.",
    ],
  },
  {
    reference: "Exodus 35:20-29",
    chapter: 35,
    startVerse: 20,
    endVerse: 29,
    heading: "Willing Hearts Bring Gifts",
    summary: "The people bring freewill offerings for the tabernacle with stirred hearts and willing spirits.",
    teaching: [
      "The people leave Moses and begin bringing offerings for the work of the tabernacle.",
      "The repeated language is beautiful: willing heart, stirred spirit, free offering.",
      "Men and women bring jewelry, yarn, linen, skins, silver, bronze, wood, stones, spices, and oil.",
      "This is a powerful reversal from Exodus 32. Gold was used for an idol, but now gifts are brought for God's sanctuary.",
      "The same hands that can build false worship can also be turned toward obedience and beauty.",
    ],
  },
  {
    reference: "Exodus 35:30-36:7",
    chapter: 35,
    startVerse: 30,
    endVerse: 35,
    heading: "More Than Enough",
    summary: "Bezalel, Oholiab, and the craftsmen begin the work, and the people's generosity becomes more than enough.",
    teaching: [
      "Moses names Bezalel and Oholiab as the skilled leaders God has filled for the tabernacle work.",
      "They are gifted with wisdom, understanding, knowledge, craftsmanship, and the ability to teach others.",
      "The people keep bringing offerings morning after morning.",
      "Eventually the craftsmen tell Moses that the people are bringing more than enough.",
      "That phrase is beautiful because the community that just broke covenant is now overflowing in willing obedience.",
    ],
  },
  {
    reference: "Exodus 36:8-38",
    chapter: 36,
    startVerse: 8,
    endVerse: 38,
    heading: "The Tabernacle Begins To Take Shape",
    summary: "The skilled workers begin making the curtains, coverings, frames, veil, and entrance for the tabernacle.",
    teaching: [
      "Exodus 36 describes the tabernacle being made according to the pattern God gave Moses.",
      "The curtains, cherubim, coverings, boards, bars, veil, and entrance are carefully crafted.",
      "This may feel repetitive because earlier chapters gave the instructions, but repetition has a purpose.",
      "The text is showing obedience: what God commanded is now being done.",
      "After the golden calf, this matters deeply. Israel is no longer inventing worship; they are building according to God's word.",
    ],
  },
] as const;

export const EXODUS_DAY_THIRTY_GODS_PRESENCE_AND_RENEWED_OBEDIENCE_LESSON: BibleYearDailyLesson = {
  dayNumber: 30,
  title: "God's Presence and Renewed Obedience",
  reference: "Exodus 33-36",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 30 follows the painful aftermath of the golden calf.",
    "The question is no longer only whether Israel will reach the land. The deeper question is whether God's presence will go with them.",
    "Exodus 33-36 shows Moses interceding, God revealing His merciful name, the covenant being renewed, and the people giving willingly as the tabernacle finally begins to take shape.",
  ],
  sections: DAY_30_SECTIONS.map((section) => ({
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
    "Day 30 shows that the promised land is not enough without the presence of God.",
    "Moses pleads for presence, God reveals mercy, and Israel begins obeying the tabernacle instructions with willing hearts.",
    "After the golden calf, the story does not move forward because Israel is impressive. It moves forward because the LORD is merciful, gracious, patient, faithful, and willing to dwell with His people.",
  ],
};

export const BIBLE_YEAR_DAY_THIRTY_DEEP_NOTES = `## Bible Reader Chapters Covered

- Exodus 33
- Exodus 34
- Exodus 35
- Exodus 36

## Chapter Introduction

Exodus 33-36 picks up after the golden calf.

Israel has broken covenant almost immediately after receiving it. Moses has interceded, judgment has fallen, and the question now becomes painfully clear: will the LORD still go with His people?

That is what makes this section so powerful.

God tells Israel to continue toward the land, but Moses understands that land without God's presence is not enough. He pleads for God to go with them. He asks to know God's ways. He asks to see God's glory.

Then God reveals His name: merciful, gracious, longsuffering, abundant in goodness and truth, forgiving iniquity, transgression, and sin, yet not clearing the guilty.

After that, the covenant is renewed, Moses' face shines, and the people begin bringing willing offerings for the tabernacle.

The people who gave gold for an idol now bring gifts for God's dwelling.

## Study Notes

Exodus 33 begins with tension. God says Israel can go toward the promised land, but He warns that His presence will not go with them in the same way because they are stiff-necked.

The people mourn. They remove their ornaments. The seriousness of the golden calf is finally landing.

Moses meets with God at the tent of meeting outside the camp. The pillar of cloud descends, and God speaks with Moses in a direct and personal way.

Then Moses intercedes. He does not ask only for success, land, or safety. He asks for God's presence. He says that God's presence is what makes Israel distinct from every other people on earth.

Moses asks to see God's glory, and God says He will make His goodness pass before him and proclaim His name.

Exodus 34 gives the answer. God gives new tablets and proclaims His character. He is merciful and gracious, slow to anger, abundant in goodness and truth, forgiving sin, and also just.

That balance matters. God is not soft on sin, but He is rich in mercy.

The covenant is renewed, and Moses comes down from the mountain with a shining face because he has been speaking with the LORD.

Exodus 35 turns toward the tabernacle work. Moses repeats the Sabbath command first, showing that even holy work must follow God's rhythm.

Then the people bring willing offerings. The language repeats stirred heart, willing spirit, and free offering. This is not forced labor like Egypt. This is redeemed generosity.

Exodus 36 shows Bezalel, Oholiab, and the craftsmen beginning the work. The people bring so much that Moses has to tell them to stop. The tabernacle begins to take shape according to the pattern God gave.

## Deep Study Notes

The heart of Exodus 33-36 is the presence of God.

After the golden calf, God could give Israel the land and still withhold the closeness of His presence. Moses understands immediately that this would be a disaster.

Why?

Because the promised land is not the ultimate gift.

God is.

That is one of the most important lessons in Exodus. The land, the blessings, the protection, the victory, the provision, and the tabernacle all matter. But they are not meant to replace the LORD Himself.

Moses says, If thy presence go not with me, carry us not up hence.

That is a stunning prayer.

He would rather stay in the wilderness with God's presence than move into promise without Him.

Moses also says that God's presence is what makes Israel distinct. Not their size. Not their military strength. Not their moral record. Not their wisdom. The presence of the LORD is what sets them apart.

Then Moses asks, Show me thy glory.

God's answer is fascinating. He does not give Moses a full visual explanation of divine glory. He says He will make His goodness pass before Moses and proclaim His name.

That means God's glory is deeply connected to His character.

In Exodus 34, God proclaims His name. This is one of the Bible's foundational descriptions of who God is.

The LORD is merciful.

He is gracious.

He is slow to anger.

He abounds in goodness and truth.

He keeps mercy.

He forgives iniquity, transgression, and sin.

And He does not clear the guilty.

That final part matters. God's mercy is not moral laziness. He does not forgive because sin is small. He forgives because He is merciful, and the larger sacrificial story will keep showing that sin requires atonement.

This revelation becomes a major echo through the rest of the Old Testament. Later biblical writers keep returning to this language when they describe God's compassion and covenant faithfulness.

Then the covenant is renewed.

God warns Israel again about idolatry and compromise. That is not random repetition. They just made a golden calf. They need to hear again that worship must not be mixed with idols.

Moses comes down with a shining face.

That detail teaches that time with God leaves a mark. Moses has been near God's glory, and the people can see the effect even though Moses himself does not realize his face is shining.

Then Exodus 35 gives us one of the most beautiful reversals in the book.

In Exodus 32, the people brought gold to Aaron and it became an idol.

In Exodus 35, the people bring gold, silver, bronze, yarn, linen, skins, wood, oil, spices, and stones for the tabernacle.

Same people.

Same kinds of materials.

Very different result.

That is important for regular people to understand. The issue is not only what you have. The issue is what your heart does with what you have.

Gold can become a calf.

Gold can become sanctuary furniture.

Skill can serve pride.

Skill can serve worship.

Energy can build rebellion.

Energy can build obedience.

The repeated language of willing hearts is also important. Pharaoh forced labor out of Israel. God invites offerings from willing hearts. The tabernacle is not built like Egypt's empire.

Exodus 36 then says the people bring more than enough.

That phrase is almost shocking after the golden calf. The people who failed so badly are now overflowing in generosity for God's dwelling.

This does not erase their sin. But it shows that covenant mercy can produce renewed obedience.

The construction details also matter. Exodus repeats many details from the earlier instructions because obedience matters. God gave the pattern, and now the craftsmen are doing what God commanded.

After the chaos of idolatry, obedience looks like careful faithfulness.

The tabernacle begins to take shape, and the story moves toward the moment when God's glory will fill it.

## Application & Reflection

Exodus 33-36 asks one of the most searching questions in the Bible:

Would you be satisfied with God's gifts if you did not have God's presence?

Moses would not.

He understood that success without God is empty. Land without God is not enough. Progress without presence is not enough.

This reading also reminds us that God's mercy is not shallow. God names sin honestly, but He also reveals Himself as merciful, gracious, patient, faithful, and forgiving.

That matters for people who feel like failure has ended the story.

The golden calf was serious. But it was not the end of God's covenant work.

For modern readers, this passage gives several clear takeaways:

- Do not settle for blessings without God's presence.
- Let failure lead to repentance, not hiding.
- Ask to know God's ways, not only His gifts.
- Remember that God's glory is tied to His goodness and character.
- Let your resources build worship, not idols.
- Let mercy produce renewed obedience.

The big idea is this: after great failure, the hope of God's people is not their record. It is God's merciful presence.

And when God's mercy restores people, willing obedience begins to rise again.`;

export const BIBLE_YEAR_DAY_THIRTY_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_30_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Moses understands that blessing without God's presence is not enough.
- God reveals His name as merciful, gracious, patient, faithful, forgiving, and just.
- Israel moves from the golden calf toward renewed obedience and willing tabernacle giving.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### My Presence Shall Go With Thee
This is the promise Moses is pleading for. The promised land is not enough if God Himself does not go with His people.

### Show Me Thy Glory
Moses asks for a deeper revelation of God. God's answer connects glory with goodness, mercy, and the proclamation of His name.

### Merciful And Gracious
This is one of the Bible's clearest descriptions of God's character. God is not denying Israel's sin; He is revealing that mercy is truly in His nature.

### Willing Heart
The tabernacle offering comes from hearts stirred to give. God is not building His dwelling through Pharaoh-style forced labor.

### More Than Enough
After the golden calf, Israel's generosity overflows for the tabernacle. Mercy does not make obedience unnecessary; it makes renewed obedience possible.

## What This Means

Exodus 33-36 shows mercy rebuilding what idolatry damaged.

- God's gifts are not enough without God's presence.
- True intercession seeks God Himself, not only better circumstances.
- God's glory is revealed through His goodness and covenant character.
- Idolatry must be answered with renewed worship shaped by God's word.
- The same resources once used wrongly can be surrendered for holy purpose.

This reading reminds us that failure does not have to be the end of the story. When God shows mercy, His people are invited back into presence, worship, and willing obedience.`,
}));
