import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_23_SECTIONS = [
  {
    reference: "Exodus 5:1-9",
    chapter: 5,
    startVerse: 1,
    endVerse: 9,
    heading: "Pharaoh Rejects God's Word",
    summary: "Moses and Aaron speak God's command, but Pharaoh refuses and makes Israel's labor harder.",
    teaching: [
      "Exodus 5 is where Moses' obedience finally reaches Pharaoh. The message is simple: Thus saith the LORD God of Israel, Let my people go.",
      "Pharaoh's answer reveals the heart of the conflict: Who is the LORD, that I should obey His voice? This is not only political resistance; it is spiritual defiance.",
      "Pharaoh does not merely say no. He accuses Israel of laziness and removes the straw while demanding the same number of bricks.",
      "That detail matters because straw helped bind bricks together. Pharaoh is making impossible demands and then blaming the people for not meeting them.",
      "Obedience makes things harder at first. That does not mean God failed. It means Pharaoh's resistance is being exposed.",
    ],
  },
  {
    reference: "Exodus 5:10-23",
    chapter: 5,
    startVerse: 10,
    endVerse: 23,
    heading: "Israel Is Crushed And Moses Laments",
    summary: "The people suffer under the increased workload, blame Moses, and Moses brings his confusion honestly to God.",
    teaching: [
      "The taskmasters enforce Pharaoh's command, and the Hebrew officers are beaten when the impossible quota is not met.",
      "This is oppression with a cruel design: Pharaoh turns Israel's own leaders into the face of punishment, creating pressure inside the community.",
      "The officers confront Moses and Aaron because their suffering has increased since Moses spoke to Pharaoh.",
      "Moses then turns to God with painful honesty. He asks why God has brought trouble on the people and why God sent him.",
      "Exodus lets us hear that question. Faith is not pretending obedience never feels confusing. Moses brings the confusion to the right place: the LORD.",
    ],
  },
  {
    reference: "Exodus 6:1-13",
    chapter: 6,
    startVerse: 1,
    endVerse: 13,
    heading: "God Repeats The Promise",
    summary: "God answers Moses by declaring His name, covenant memory, and promise to redeem Israel.",
    teaching: [
      "God does not answer Moses by explaining every detail of the delay. He answers by revealing who He is and what He will do.",
      "The repeated statement, I am the LORD, anchors the whole speech. God's identity is the foundation for Israel's deliverance.",
      "God says He has heard Israel's groaning and remembered His covenant. This repeats the comfort from Exodus 2, but now it is spoken directly into Moses' discouragement.",
      "The seven I will statements are powerful: God will bring them out, rid them of bondage, redeem them, take them as His people, be their God, bring them into the land, and give it to them.",
      "Israel cannot listen because of anguish of spirit and cruel bondage. That is an important pastoral detail: deep suffering can make hope hard to hear, even when God's promise is true.",
    ],
  },
  {
    reference: "Exodus 6:14-30",
    chapter: 6,
    startVerse: 14,
    endVerse: 30,
    heading: "Moses And Aaron Are Located In The Story",
    summary: "A genealogy identifies Moses and Aaron inside Israel's family line before the confrontation continues.",
    teaching: [
      "The genealogy may feel like an interruption, but it has a purpose. Exodus pauses to show exactly who Moses and Aaron are.",
      "They are not random miracle workers. They belong inside the covenant people and come from the tribe of Levi.",
      "This matters because Pharaoh has treated Israel as a nameless labor force, but God knows names, fathers, sons, and generations.",
      "The genealogy also slows the story before the plague conflict intensifies. It grounds the dramatic signs in real covenant history.",
      "Moses still feels weak in speech at the end of the section. The mission will continue with a reluctant servant and a faithful God.",
    ],
  },
  {
    reference: "Exodus 7:1-13",
    chapter: 7,
    startVerse: 1,
    endVerse: 13,
    heading: "The Staff Becomes A Serpent",
    summary: "God sends Moses and Aaron before Pharaoh, and Aaron's staff swallows the magicians' staffs.",
    teaching: [
      "God tells Moses that Aaron will speak for him, and Pharaoh will resist so that God may multiply His signs and wonders in Egypt.",
      "The conflict is not out of control. Pharaoh's resistance will become the stage where Egypt learns that the LORD is God.",
      "Aaron throws down the staff, and it becomes a serpent. Pharaoh's magicians imitate the sign, which shows that Egypt has real religious power and spectacle.",
      "But Aaron's staff swallows their staffs. The point is not that Pharaoh's court can do nothing; the point is that Egypt's power is swallowed by God's power.",
      "Pharaoh's heart is hardened, just as the LORD said. The first public sign exposes the conflict, but Pharaoh refuses to listen.",
    ],
  },
  {
    reference: "Exodus 7:14-25",
    chapter: 7,
    startVerse: 14,
    endVerse: 25,
    heading: "The Nile Turns To Blood",
    summary: "The first plague strikes the Nile, exposing Egypt's false security and Pharaoh's hardened heart.",
    teaching: [
      "The Nile was life to Egypt. It watered the land, supported agriculture, carried transportation, and stood at the center of Egypt's survival.",
      "God strikes the river with blood, turning Egypt's source of life into a sign of judgment.",
      "This also answers Pharaoh's earlier violence. Pharaoh used the Nile as a weapon against Hebrew sons, and now the Nile itself is struck.",
      "The fish die, the river stinks, and the Egyptians cannot drink the water. The plague touches daily life immediately.",
      "The magicians imitate the sign, but imitation does not heal Egypt. Pharaoh turns away, and his heart remains hard.",
    ],
  },
  {
    reference: "Exodus 8:1-15",
    chapter: 8,
    startVerse: 1,
    endVerse: 15,
    heading: "The Frogs Cover Egypt",
    summary: "Frogs invade Egypt, Pharaoh asks for relief, but hardens his heart when the pressure lifts.",
    teaching: [
      "The second plague fills Egypt with frogs: houses, bedrooms, beds, ovens, and kneading troughs.",
      "This plague is almost absurd in its invasiveness. Egypt cannot keep the judgment outside; it enters private spaces and ordinary routines.",
      "Pharaoh's magicians can bring up frogs too, but again they cannot remove them. Egypt's power can imitate trouble, but it cannot deliver from trouble.",
      "Pharaoh asks Moses to pray, and Moses lets Pharaoh choose the time so he may know there is none like the LORD.",
      "When relief comes, Pharaoh hardens his heart. This begins a pattern: pressure produces temporary surrender, but comfort reveals the heart again.",
    ],
  },
  {
    reference: "Exodus 8:16-19",
    chapter: 8,
    startVerse: 16,
    endVerse: 19,
    heading: "The Dust Becomes Lice",
    summary: "The third plague turns dust into lice, and the magicians admit the finger of God is at work.",
    teaching: [
      "The third plague comes without negotiation. Aaron strikes the dust, and lice or gnats come upon people and animals.",
      "Dust becoming a plague is a creation-level sign. The God who made humanity from dust can command dust in judgment.",
      "This time the magicians cannot imitate it. Their inability marks a turning point in the contest.",
      "They tell Pharaoh, This is the finger of God. Even Egypt's religious experts recognize a power beyond their own.",
      "But Pharaoh still does not listen. Evidence alone does not soften a heart determined to resist.",
    ],
  },
  {
    reference: "Exodus 8:20-32",
    chapter: 8,
    startVerse: 20,
    endVerse: 32,
    heading: "God Makes A Difference In Goshen",
    summary: "The fourth plague brings swarms on Egypt, but God protects Goshen and exposes Pharaoh's compromise.",
    teaching: [
      "God sends Moses to Pharaoh early in the morning with the same command: Let my people go, that they may serve me.",
      "This plague introduces a clear distinction between Egypt and Goshen. God says He will sever Goshen so no swarms will be there.",
      "That distinction teaches Egypt that the LORD is not throwing random disaster. He rules with precision and protects His people.",
      "Pharaoh begins bargaining. He says Israel can sacrifice in the land, then later says they may go but not very far.",
      "Compromise becomes another form of resistance. Pharaoh wants relief from judgment without full obedience to God's word.",
    ],
  },
] as const;

export const EXODUS_DAY_TWENTY_THREE_PHARAOH_RESISTS_GODS_WORD_LESSON: BibleYearDailyLesson = {
  dayNumber: 23,
  title: "Pharaoh Resists God's Word",
  reference: "Exodus 5-8",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 23 follows Moses and Aaron as they stand before Pharaoh and speak God's command.",
    "Pharaoh refuses, increases Israel's suffering, and begins learning through the early plagues that the LORD is not a local idea he can ignore.",
    "Exodus 5-8 teaches that resistance to God's word can make obedience painful at first, but God's power is already answering Pharaoh's question: Who is the LORD?",
  ],
  sections: DAY_23_SECTIONS.map((section) => ({
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
    "Day 23 does not show Pharaoh surrendering yet.",
    "It shows God exposing Pharaoh's defiance, strengthening Moses with His promise, and beginning to dismantle Egypt's false security.",
    "Exodus 5-8 reminds us that God's deliverance may begin with conflict, but resistance does not mean God has lost control.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_THREE_DEEP_NOTES = `Exodus 5-8 shows what happens when God's word confronts Pharaoh's control.

Moses obeys, but Pharaoh refuses and makes Israel's labor harder. The people suffer, Moses laments, and God answers by repeating His covenant promise.

Then the signs and early plagues begin: the staff swallows Egypt's staffs, the Nile turns to blood, frogs fill the land, dust becomes lice, and swarms strike Egypt while Goshen is protected.

Pharaoh sometimes bargains and asks for relief, but his heart keeps hardening when the pressure lifts.

Big idea: Pharaoh's resistance is real, but it cannot stop God from revealing His name, keeping His covenant, and moving His people toward deliverance.`;

export const BIBLE_YEAR_DAY_TWENTY_THREE_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_23_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Pharaoh's resistance makes obedience harder before deliverance becomes visible.
- God answers discouragement by revealing His name and repeating His promise.
- The plagues are not random disasters; they reveal that the LORD rules over Egypt's false securities.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### Who Is The LORD?
Pharaoh's question frames the plague story. The conflict will answer who the LORD is by showing His authority over Egypt, Pharaoh, the Nile, the land, and the gods Egypt trusts.

### Let My People Go
This is not only a freedom slogan. God is claiming Israel as His people and calling them out of bondage so they may serve and worship Him.

### I Am The LORD
God repeats His name to Moses when Moses is discouraged. The foundation of deliverance is not Moses' confidence, Pharaoh's cooperation, or Israel's strength; it is God's covenant identity.

### The Finger Of God
The magicians admit a limit to their power. Egypt can imitate some signs, but it cannot match the Creator's authority.

### I Will Put A Division
God protects Goshen during the swarms. This shows precision, ownership, and care: judgment is not random, and God knows how to distinguish His people.

## What This Means

Exodus 5-8 helps readers understand spiritual resistance, discouragement, and God's power over false security.

- Obedience can lead into conflict before breakthrough comes.
- Hard circumstances do not mean God's promise has failed.
- Pharaoh's compromises show that partial obedience is still resistance.
- God's signs expose the limits of human and spiritual counterfeits.
- Relief without surrender does not equal repentance.

This section reminds us that God is not intimidated by hardened power. He can let resistance expose itself while He steadily reveals who He is.

## Big Idea

${section.summary}`,
}));
