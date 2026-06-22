import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_26_SECTIONS = [
  {
    reference: "Exodus 17:1-7",
    chapter: 17,
    startVerse: 1,
    endVerse: 7,
    heading: "Water From The Rock",
    summary: "Israel has no water at Rephidim, complains against Moses, and God provides water from the rock.",
    teaching: [
      "Exodus 17 begins with a real need. Israel is in the wilderness, and there is no water for the people to drink.",
      "The problem is serious, but the people's response shows how quickly fear can turn rescue into accusation. They ask Moses why he brought them out of Egypt to kill them.",
      "God tells Moses to take the staff, stand before the rock at Horeb, strike the rock, and water will come out.",
      "That staff matters because it is the same staff connected to the Nile, the plagues, and deliverance. The symbol of judgment in Egypt now becomes connected to provision in the wilderness.",
      "Moses names the place Massah and Meribah because Israel tested the LORD by asking whether He was really among them.",
    ],
  },
  {
    reference: "Exodus 17:8-16",
    chapter: 17,
    startVerse: 8,
    endVerse: 16,
    heading: "The LORD Is My Banner",
    summary: "Amalek attacks Israel, Joshua fights, and Moses' raised hands point to dependence on God.",
    teaching: [
      "Right after the water crisis, Israel faces military attack from Amalek. The wilderness is not only a place of hunger and thirst; it is also a place of danger.",
      "Joshua appears here as a military leader for the first time, while Moses stands on the hill with the staff of God in his hand.",
      "When Moses' hands are raised, Israel prevails. When his hands grow heavy and fall, Amalek prevails.",
      "Aaron and Hur support Moses' hands, which gives us a very human picture of leadership: even called people get tired, and faithful support matters.",
      "After the victory, Moses builds an altar and names it The LORD is my banner, meaning Israel's victory belongs under God's name, not human pride.",
    ],
  },
  {
    reference: "Exodus 18:1-12",
    chapter: 18,
    startVerse: 1,
    endVerse: 12,
    heading: "Jethro Hears What God Has Done",
    summary: "Jethro visits Moses, hears the story of deliverance, blesses the LORD, and worships with Israel's leaders.",
    teaching: [
      "Exodus 18 slows the pace after battle and gives us a family reunion. Jethro, Moses' father-in-law, brings Zipporah and Moses' sons to him.",
      "Moses tells Jethro all that the LORD has done to Pharaoh and Egypt, and all the hardship along the way.",
      "That balance matters. Moses does not only tell the miracle parts; he also tells the trouble God brought them through.",
      "Jethro rejoices, blesses the LORD, and says he now knows the LORD is greater than all gods.",
      "This is one of the early moments where God's deliverance of Israel becomes testimony to someone outside Israel.",
    ],
  },
  {
    reference: "Exodus 18:13-27",
    chapter: 18,
    startVerse: 13,
    endVerse: 27,
    heading: "Shared Wisdom And Shared Burden",
    summary: "Jethro sees Moses overwhelmed by judging every case and advises him to appoint trustworthy leaders.",
    teaching: [
      "The next day, Jethro watches Moses sit from morning until evening while the people stand around waiting for judgment.",
      "Moses is doing important work, but he is doing too much of it alone.",
      "Jethro tells him, The thing that thou doest is not good. That is a strong but caring word from someone who can see the strain clearly.",
      "He advises Moses to teach the people God's laws and appoint capable, God-fearing, truthful leaders who hate dishonest gain.",
      "This shows that wisdom is not less spiritual because it is practical. Good leadership requires structure, delegation, and shared responsibility.",
    ],
  },
  {
    reference: "Exodus 19:1-8",
    chapter: 19,
    startVerse: 1,
    endVerse: 8,
    heading: "Carried On Eagles' Wings",
    summary: "Israel arrives at Sinai, and God invites them into covenant identity as His treasured possession.",
    teaching: [
      "Exodus 19 brings Israel to Mount Sinai, the mountain God had already mentioned when He called Moses at the burning bush.",
      "God reminds Israel what He has done: He judged Egypt, carried them on eagles' wings, and brought them to Himself.",
      "That order is important. Grace comes before law. God rescues Israel first, then teaches them how to live as His people.",
      "God calls Israel His peculiar treasure, a kingdom of priests, and a holy nation.",
      "Israel's calling is not only to be rescued from Egypt, but to live as a people who display God's holiness to the nations.",
    ],
  },
  {
    reference: "Exodus 19:9-25",
    chapter: 19,
    startVerse: 9,
    endVerse: 25,
    heading: "The Mountain Is Set Apart",
    summary: "God prepares Israel to meet Him at Sinai with washing, boundaries, thunder, smoke, and holy fear.",
    teaching: [
      "The people must wash their clothes, prepare themselves, and keep boundaries around the mountain.",
      "This teaches that meeting God is not casual. The God who rescued Israel is also holy.",
      "On the third day, thunder, lightning, a thick cloud, trumpet sound, smoke, fire, and shaking fill the scene.",
      "The mountain becomes a visible lesson in God's holiness. Israel is not meeting an idea; they are encountering the living God.",
      "The boundaries are not because God is cruel. They teach that sinful people cannot rush into holy presence on their own terms.",
    ],
  },
  {
    reference: "Exodus 20:1-3",
    chapter: 20,
    startVerse: 1,
    endVerse: 3,
    heading: "No Other Gods Before Me",
    summary: "God begins the Ten Commandments by grounding obedience in His saving act and exclusive claim.",
    teaching: [
      "Exodus 20 begins with God speaking. The commandments are not Moses' personal ideas; they come from the LORD Himself.",
      "Before God gives commands, He reminds Israel who He is: the LORD who brought them out of Egypt, out of the house of bondage.",
      "That is the foundation of the Ten Commandments. Obedience is a response to redemption, not a ladder Israel climbs to earn rescue.",
      "The first commandment says Israel shall have no other gods before Him.",
      "After Egypt, this matters deeply. Israel has just been delivered from a land filled with rival gods, and now they must learn exclusive loyalty to the LORD.",
    ],
  },
  {
    reference: "Exodus 20:4-11",
    chapter: 20,
    startVerse: 4,
    endVerse: 11,
    heading: "Images, Name, And Sabbath",
    summary: "God commands Israel not to make idols, misuse His name, or forget the Sabbath day.",
    teaching: [
      "The second commandment forbids making images for worship. God cannot be reduced to something human hands shape.",
      "In the ancient world, idols were often treated like visible access points to divine power. Israel must not worship the LORD as if He can be controlled by an image.",
      "The command not to take God's name in vain is about carrying His name lightly, falsely, or emptily.",
      "Israel bears the LORD's name as His covenant people, so His name must be honored in speech, worship, and daily life.",
      "The Sabbath command roots Israel's rhythm in creation. Rest becomes a weekly confession that life does not depend on endless labor.",
    ],
  },
  {
    reference: "Exodus 20:12-17",
    chapter: 20,
    startVerse: 12,
    endVerse: 17,
    heading: "Life With Our Neighbor",
    summary: "God gives commands about parents, life, marriage, property, truth, and desire.",
    teaching: [
      "The Ten Commandments move from Israel's relationship with God into relationships with people.",
      "Honoring father and mother protects family order and generational faithfulness.",
      "The commands against murder, adultery, stealing, and false witness protect life, marriage, property, and truth.",
      "The final commandment reaches deeper than outward behavior. Coveting is desire that grasps after what belongs to someone else.",
      "That means God's law is not only about visible actions. It also exposes the heart underneath the action.",
    ],
  },
  {
    reference: "Exodus 20:18-26",
    chapter: 20,
    startVerse: 18,
    endVerse: 26,
    heading: "Holy Fear And Simple Worship",
    summary: "Israel trembles at God's voice, and God gives instructions for humble altar worship.",
    teaching: [
      "When the people see the thunder, lightning, trumpet, and smoking mountain, they tremble and stand far off.",
      "They ask Moses to speak to them because the direct encounter with God's voice overwhelms them.",
      "Moses tells them not to fear in one sense, but also says God has come so His fear may be before them.",
      "That sounds strange until we understand the difference: God does not want panic that runs from Him, but reverent fear that keeps people from sin.",
      "The chapter ends with simple altar instructions. Israel's worship must not imitate pagan display; it must be humble, obedient, and shaped by God's word.",
    ],
  },
] as const;

export const EXODUS_DAY_TWENTY_SIX_WATER_BATTLE_AND_COMMANDMENTS_LESSON: BibleYearDailyLesson = {
  dayNumber: 26,
  title: "The Ten Commandments",
  reference: "Exodus 17-20",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 26 follows Israel deeper into the wilderness and then to Mount Sinai.",
    "The people need water, face their first battle, receive wise leadership structure through Jethro, and finally stand before the mountain where God speaks the Ten Commandments.",
    "Exodus 17-20 shows that the God who rescues His people also provides for them, defends them, organizes them, and teaches them how to live as His covenant people.",
  ],
  sections: DAY_26_SECTIONS.map((section) => ({
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
    "Day 26 moves Israel from survival lessons into covenant formation.",
    "The LORD gives water from the rock, victory under His banner, wisdom through Jethro, and His own voice from Sinai.",
    "The commandments are not random rules; they are the shape of life for a redeemed people learning to belong to the God who brought them out of bondage.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_NOTES = `## Bible Reader Chapters Covered

- Exodus 17
- Exodus 18
- Exodus 19
- Exodus 20

## Chapter Introduction

Exodus 17-20 continues the journey after deliverance from Egypt.

Israel has already seen the sea open, bitter water made sweet, manna from heaven, and quail in the camp. But the wilderness keeps revealing what is inside the people.

In today's reading, Israel needs water again. Then Amalek attacks. Then Jethro visits Moses and helps him see that leadership cannot be carried by one exhausted person. Finally, Israel arrives at Mount Sinai, where God speaks the Ten Commandments.

This is a major turning point.

God did not deliver Israel so they could wander aimlessly. He brought them out so they could belong to Him, worship Him, and become a holy nation before the world.

## Study Notes

Exodus 17 begins with thirst. The people camp at Rephidim, but there is no water. Instead of remembering God's recent provision, they quarrel with Moses and ask if the LORD is really among them.

God tells Moses to strike the rock, and water comes out. The same God who judged Egypt now provides for His people in the wilderness. The place is named Massah and Meribah because Israel tested and quarreled.

Then Amalek attacks Israel. Joshua leads the battle, while Moses stands on the hill with the staff of God. When Moses' hands are raised, Israel prevails. When his hands fall, Amalek prevails. Aaron and Hur hold up his hands until the victory is won.

Exodus 18 brings Jethro, Moses' father-in-law, into the story. Jethro hears what God has done, rejoices, blesses the LORD, and worships with Israel's leaders.

Then Jethro watches Moses judge the people from morning to evening. He sees the problem clearly: Moses is trying to carry too much alone. He advises Moses to appoint trustworthy leaders to handle smaller cases, while Moses handles the harder matters.

Exodus 19 brings Israel to Mount Sinai. God reminds them that He carried them on eagles' wings and brought them to Himself. Then He calls them His treasured possession, a kingdom of priests, and a holy nation.

Before God speaks, the people must prepare. They wash, wait, and keep boundaries around the mountain. Thunder, lightning, trumpet sound, smoke, fire, and shaking fill the scene.

Exodus 20 gives the Ten Commandments. God begins by reminding Israel that He brought them out of Egypt. That means obedience comes after redemption. The commandments show Israel how redeemed people are called to live with God and with one another.

## Deep Study Notes

One of the biggest themes in Exodus 17-20 is that rescue must become formation.

God has brought Israel out of Egypt, but Egypt is not fully out of Israel's thinking yet. The people are free, but they still panic, accuse, quarrel, and struggle to trust.

That is why the wilderness matters.

The wilderness is not wasted space between Egypt and the promised land. It is the training ground where Israel learns dependence.

At Rephidim, Israel asks, Is the LORD among us, or not? That question is painful because the answer should be obvious. The cloud, the sea, the manna, the quail, and the earlier water miracle all say yes.

But fear has a short memory.

When Moses strikes the rock and water comes out, God answers their need with mercy. He provides even though their hearts are not pretty in the moment.

Then Amalek attacks.

This is Israel's first battle after leaving Egypt. They are not an experienced army. They are former slaves learning to trust God in open wilderness. Joshua fights below, Moses intercedes above, and Aaron and Hur support Moses when he grows tired.

That scene teaches something beautiful: God's victory does not erase human participation.

Joshua really fights. Moses really lifts the staff. Aaron and Hur really help. But the altar name makes the meaning clear: The LORD is my banner.

The victory belongs under God's name.

Exodus 18 teaches a different kind of wisdom. Moses is not fighting Amalek now; he is fighting exhaustion. He is judging every case himself, and Jethro tells him this is not good.

That is important because sometimes faithful people assume burnout is proof of devotion. Jethro shows Moses that wise structure can be an act of obedience.

Then Exodus 19 changes the whole atmosphere.

Israel arrives at Sinai, the mountain where God had promised Moses, You shall serve God upon this mountain. The burning bush promise is now being fulfilled.

God says He carried Israel on eagles' wings and brought them to Himself. That language is tender and powerful. God is not merely moving Israel from one location to another. He is bringing them into covenant relationship.

Then comes Israel's identity:

- treasured possession
- kingdom of priests
- holy nation

Treasured possession means Israel belongs to God in a special covenant way.

Kingdom of priests means they are meant to represent God before the nations and, in some sense, represent the nations before God.

Holy nation means they are set apart. Holiness is not weirdness. Holiness is belonging to God in a way that reshapes worship, ethics, family, work, sexuality, speech, rest, and justice.

Then God gives the Ten Commandments.

The order matters so much.

God does not begin with, Obey Me so I might rescue you.

He begins with, I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage.

That means the law is given to an already rescued people. The commandments are not a ladder out of Egypt. They are the shape of life after Egypt.

The first commandments focus on worship: no other gods, no carved images, do not misuse God's name, remember the Sabbath.

This confronts the religious world Israel came from. Egypt was full of visible gods, sacred images, rituals, and power claims. Israel must learn that the LORD is not one god among many. He is the one true God who rescued them.

The Sabbath command is especially beautiful because Israel had been enslaved under endless labor. Pharaoh gave them no rest. The LORD commands rest.

That alone tells us something about God's character.

Pharaoh says, Work without mercy.

God says, Rest because you belong to Me.

The second half of the commandments focuses on neighbor love: honor parents, do not murder, do not commit adultery, do not steal, do not bear false witness, do not covet.

These commands protect the basic structures of human life: family, life, marriage, property, truth, and desire.

And the command not to covet reaches inward. God is not only shaping public behavior; He is addressing the heart that wants what belongs to someone else.

Exodus 20 ends with holy fear. The people tremble before God's voice. Moses explains that God has come so His fear may be before them, that they may not sin.

That is not panic. It is reverence.

The God who came down at Sinai is the same God who brought them out of Egypt, gave water from the rock, and fought under the banner of His name.

Grace and holiness belong together.

## Application & Reflection

Exodus 17-20 teaches that being rescued is not the end of the journey. It is the beginning of learning how to live with God.

Israel has to learn trust when thirsty, dependence when attacked, humility when tired, reverence when God speaks, and obedience as a redeemed people.

That is still deeply practical.

- When you are in need, fear can make you forget what God has already done.
- When you are in battle, you need both action and dependence.
- When you are tired, wisdom may look like sharing the burden.
- When God speaks, obedience is not oppression; it is the path of life for people He has rescued.

The Ten Commandments remind us that God cares about worship and ordinary life.

He cares what we love, what we worship, how we speak His name, whether we rest, how we treat parents, how we value life, how we honor marriage, how we handle possessions, how we speak truth, and what we allow our hearts to desire.

The big idea is this: God did not free Israel so they could belong to themselves.

He freed them so they could belong to Him.

And belonging to Him changes everything.`;

export const BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_26_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- God provides for Israel's real needs in the wilderness.
- God teaches Israel that deliverance must become covenant life.
- Sinai shows that the God who rescues is also holy and speaks with authority.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### Is The LORD Among Us, Or Not?
This question reveals Israel's fear and short memory. They have seen God's presence repeatedly, but thirst makes them wonder if He is still with them.

### The Staff Of God
The staff connects judgment, deliverance, provision, and battle. The same God who struck Egypt now provides water and gives victory.

### The LORD Is My Banner
A banner marked identity and rallying point in battle. Moses names the altar this way so Israel remembers that victory belongs under the LORD's name.

### A Peculiar Treasure Unto Me
This means Israel belongs to God in a special covenant way. They are not rescued to become independent; they are rescued to become His people.

### I Am The LORD Thy God
The Ten Commandments begin with relationship and redemption. God commands Israel as the One who already brought them out of bondage.

## What This Means

Exodus 17-20 shows God forming rescued people into covenant people.

- God provides for real needs, even when His people are afraid and frustrated.
- Leadership requires dependence, support, and wise structure.
- God's people are called to remember rescue and live differently because of it.
- The law is given after deliverance, not before it.
- Reverent fear helps God's people take His holiness seriously.

The wilderness and Sinai belong together. God feeds, defends, organizes, and commands His people because freedom without formation would leave Israel free from Egypt but still unshaped by the LORD.`,
}));
