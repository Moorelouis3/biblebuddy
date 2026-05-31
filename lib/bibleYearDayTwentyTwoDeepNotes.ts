import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_22_SECTIONS = [
  {
    reference: "Exodus 1:1-7",
    chapter: 1,
    startVerse: 1,
    endVerse: 7,
    heading: "The Family Becomes A People",
    summary: "Exodus begins by connecting back to Genesis and showing Jacob's family multiplying in Egypt.",
    teaching: [
      "Exodus opens by naming the sons of Israel who came down into Egypt. That matters because Exodus is not starting a brand-new story; it is continuing the promise from Genesis.",
      "Joseph dies, his brothers die, and that whole generation passes away, but the children of Israel multiply greatly. God's promise keeps living after the people who first carried it are gone.",
      "The language of fruitfulness echoes Genesis. Be fruitful and multiply was creation language, then covenant hope, and now Israel is becoming numerous inside Egypt.",
      "This growth is not random population increase. It is God keeping His word to Abraham, Isaac, and Jacob.",
      "The chapter starts with blessing before it shows oppression. That order matters because Pharaoh's cruelty will react against what God is doing.",
    ],
  },
  {
    reference: "Exodus 1:8-14",
    chapter: 1,
    startVerse: 8,
    endVerse: 14,
    heading: "Fear Turns Into Oppression",
    summary: "A new Pharaoh fears Israel's growth and turns suspicion into slavery.",
    teaching: [
      "A new king rises who does not know Joseph. This is not only a memory problem; it means Egypt no longer honors the history of how Joseph saved the nation.",
      "Pharaoh sees Israel's growth as a threat. The blessing of God looks dangerous to a ruler who wants control.",
      "His language is political and fearful: they are more and mightier than we. Fear begins to justify oppression.",
      "Egypt sets taskmasters over Israel and makes their lives bitter with hard bondage. The people who were preserved by Egypt now become enslaved by Egypt.",
      "Exodus is showing how evil often escalates: fear becomes suspicion, suspicion becomes policy, and policy becomes cruelty.",
    ],
  },
  {
    reference: "Exodus 1:15-22",
    chapter: 1,
    startVerse: 15,
    endVerse: 22,
    heading: "The Midwives Fear God",
    summary: "Pharaoh commands death, but the Hebrew midwives fear God and preserve life.",
    teaching: [
      "Pharaoh's oppression moves from forced labor to attempted genocide. He targets Hebrew baby boys because he wants to control Israel's future.",
      "The midwives, Shiphrah and Puah, are named while Pharaoh remains unnamed in this scene. That is a quiet biblical honor: the women who fear God are remembered.",
      "They refuse to obey Pharaoh's death command because they fear God. In the Bible, fear of God means God carries more weight than human pressure.",
      "Their courage preserves life in a world where power is ordering death. They are not kings, soldiers, or public officials, but their obedience matters deeply.",
      "Pharaoh then broadens the command to all his people: every Hebrew son is to be thrown into the river. Exodus 1 ends dark, but the next chapter will place Moses directly inside that death sentence.",
    ],
  },
  {
    reference: "Exodus 2:1-10",
    chapter: 2,
    startVerse: 1,
    endVerse: 10,
    heading: "Moses Is Drawn From The Water",
    summary: "Moses is born under Pharaoh's death order, hidden by faith, placed in the river, and rescued by Pharaoh's daughter.",
    teaching: [
      "Moses is born into a world where Pharaoh has commanded Hebrew baby boys to die in the Nile. His birth happens under threat from the first breath.",
      "His mother sees that he is a goodly child and hides him for three months. The story echoes Genesis creation language and shows life being protected under death's shadow.",
      "The basket is placed in the river, the very place Pharaoh meant for death. But God turns the river of death into the place where Moses is preserved.",
      "Pharaoh's daughter finds him, has compassion, and unknowingly pays Moses' own mother to nurse him. The irony is beautiful: Pharaoh's house helps preserve the deliverer Pharaoh tried to destroy.",
      "Moses' name is connected to being drawn out of the water. His own rescue becomes a preview of Israel's future rescue through water at the Red Sea.",
    ],
  },
  {
    reference: "Exodus 2:11-25",
    chapter: 2,
    startVerse: 11,
    endVerse: 25,
    heading: "Moses Runs, But God Hears",
    summary: "Moses sees Israel's suffering, flees Egypt after killing an Egyptian, and God hears Israel's cry.",
    teaching: [
      "When Moses grows up, he goes out to his brothers and sees their burdens. That phrase matters because Moses begins identifying with the oppressed Hebrews, not only Egyptian privilege.",
      "He kills an Egyptian who is beating a Hebrew, but his attempt at rescue is impulsive and not yet God's appointed deliverance.",
      "Moses flees to Midian, becomes a stranger in a foreign land, marries Zipporah, and begins a hidden wilderness season.",
      "Meanwhile, Israel groans under bondage. The people cry, and God hears, remembers His covenant, looks upon them, and knows.",
      "Those verbs are the turning point. Before Moses is called, before Pharaoh is confronted, before plagues fall, God has heard His people's cry.",
    ],
  },
  {
    reference: "Exodus 3:1-12",
    chapter: 3,
    startVerse: 1,
    endVerse: 12,
    heading: "God Calls Moses From The Burning Bush",
    summary: "God meets Moses in the wilderness, reveals holy ground, and calls him to bring Israel out of Egypt.",
    teaching: [
      "Moses is keeping sheep in the wilderness when God meets him. The future deliverer is not in a palace; he is in a hidden place doing ordinary work.",
      "The bush burns but is not consumed. That image catches Moses' attention and becomes a sign of God's holy presence.",
      "God tells Moses to remove his sandals because the ground is holy. The place becomes holy not because the dirt is special, but because God is there.",
      "God identifies Himself as the God of Abraham, Isaac, and Jacob. The deliverance of Exodus is rooted in the covenant promises of Genesis.",
      "God says He has seen, heard, and known Israel's suffering, and He has come down to deliver them. Moses is being called into something God has already decided to do.",
    ],
  },
  {
    reference: "Exodus 3:13-22",
    chapter: 3,
    startVerse: 13,
    endVerse: 22,
    heading: "I AM Sends Moses",
    summary: "God reveals His name to Moses and promises to bring Israel out with His mighty hand.",
    teaching: [
      "Moses asks what he should say when Israel asks God's name. This is not a small question because Moses is being sent to a suffering people and a powerful king.",
      "God says, I AM THAT I AM. The name reveals God's self-existence, faithfulness, and freedom. He is not dependent on Egypt, Pharaoh, Moses, or any created thing.",
      "God also tells Moses to say that the LORD, the God of Abraham, Isaac, and Jacob, has sent him. The mysterious name is tied to covenant history.",
      "God tells Moses that Pharaoh will not let the people go except by a mighty hand. The conflict will be real, but God is not surprised by resistance.",
      "God promises that Israel will not leave empty. The people who were enslaved and exploited will walk out with provision.",
    ],
  },
  {
    reference: "Exodus 4:1-17",
    chapter: 4,
    startVerse: 1,
    endVerse: 17,
    heading: "Moses Objects, And God Provides",
    summary: "Moses fears the people will not believe him, but God gives signs and provides Aaron as a helper.",
    teaching: [
      "Moses raises objection after objection. What if they do not believe me? What if they do not listen? I am not eloquent.",
      "God gives signs with the staff, the leprous hand, and water from the Nile. These signs show that the God sending Moses has authority over nature, disease, and Egypt's river.",
      "When Moses focuses on his speech weakness, God asks, Who made man's mouth? That question does not deny Moses' limitation; it puts the limitation under God's authority.",
      "God promises to be with Moses' mouth and teach him what to say. The calling rests on God's presence, not Moses' confidence.",
      "When Moses still asks God to send someone else, the Lord is angry but also provides Aaron. God is patient, but He does not let Moses' fear cancel the mission.",
    ],
  },
  {
    reference: "Exodus 4:18-31",
    chapter: 4,
    startVerse: 18,
    endVerse: 31,
    heading: "Moses Returns To Egypt",
    summary: "Moses returns with his family, Aaron meets him, and Israel believes that God has visited them.",
    teaching: [
      "Moses returns to Jethro, receives permission to go, and begins the journey back to Egypt. The hidden shepherd is now moving toward Pharaoh.",
      "God reminds Moses that Pharaoh will resist. The mission begins with honesty: deliverance will come, but not without confrontation.",
      "The difficult circumcision scene reminds readers that Moses' own household must be brought under the covenant sign. The deliverer cannot ignore covenant obedience.",
      "Aaron meets Moses at the mountain of God, and together they gather the elders of Israel. Moses is not alone in the mission.",
      "When the people hear that the LORD has visited them and seen their affliction, they believe and worship. Before Pharaoh ever lets them go, God's people bow because they know He has heard.",
    ],
  },
] as const;

export const EXODUS_DAY_TWENTY_TWO_GOD_HEARS_ISRAELS_CRY_LESSON: BibleYearDailyLesson = {
  dayNumber: 22,
  title: "God Hears Israel's Cry",
  reference: "Exodus 1-4",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 22 opens the book of Exodus and shows the family of Genesis becoming an oppressed people in Egypt.",
    "Pharaoh fears Israel's growth, slavery becomes cruel, and the command goes out to kill Hebrew sons.",
    "But God preserves Moses, hears Israel's cry, reveals His name, and calls Moses to join the deliverance God has already begun.",
  ],
  sections: DAY_22_SECTIONS.map((section) => ({
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
    "Day 22 teaches that oppression cannot cancel God's promise.",
    "Before Israel sees deliverance, God has already heard, remembered, seen, and known.",
    "Exodus 1-4 reminds us that God's rescue often begins quietly: through courageous women, a hidden child, a wilderness season, a burning bush, and the God who says, I AM.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_TWO_DEEP_NOTES = `Exodus 1-4 begins where Genesis ended: with Israel in Egypt.

The family has multiplied, but a new Pharaoh turns their growth into a national threat and forces them into bitter slavery.

Even as Pharaoh commands death, God preserves Moses through courageous women and begins preparing the deliverer in hidden places.

Then God hears Israel's cry, remembers His covenant, reveals His name as I AM, and sends Moses back to Egypt.

Big idea: God's people may feel unseen under oppression, but Exodus begins by showing that God hears, remembers, sees, knows, and comes down to deliver.`;

export const BIBLE_YEAR_DAY_TWENTY_TWO_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_22_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Exodus continues Genesis by showing Abraham's family becoming a nation in Egypt.
- Pharaoh's oppression is real, but it is reacting against God's blessing.
- God's deliverance begins before the people can see it clearly.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### There Arose Up A New King
This phrase marks a dangerous change in Egypt. The memory of Joseph's service is gone, and the new Pharaoh treats Israel's growth as a threat instead of a blessing.

### Made Their Lives Bitter
Exodus wants readers to feel the cruelty of slavery. The oppression is not abstract; it enters bodies, labor, family life, and daily survival.

### The Midwives Feared God
Shiphrah and Puah show that fearing God means His authority carries more weight than Pharaoh's command. Their courage preserves life when power commands death.

### God Heard Their Groaning
This is the turning point before Moses' call. Israel may feel forgotten, but God hears, remembers, sees, and knows.

### I AM THAT I AM
God reveals Himself as the One who simply is. He is not dependent on Pharaoh's permission, Moses' confidence, or Egypt's power.

## What This Means

Exodus 1-4 helps readers understand oppression, calling, covenant, and deliverance.

- God's blessing can look threatening to people who want control.
- Courage in hidden places matters deeply to God's rescue story.
- God may prepare a deliverer through years that look like delay.
- God's name gives confidence when the mission feels too large.
- Deliverance begins with God's compassion before it becomes visible action.

This section reminds us that God is not absent when His people are groaning. He hears before they see, remembers before they understand, and acts before Pharaoh changes.

## Big Idea

${section.summary}`,
}));
