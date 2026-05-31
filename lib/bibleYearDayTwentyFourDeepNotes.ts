import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_24_SECTIONS = [
  {
    reference: "Exodus 9:1-7",
    chapter: 9,
    startVerse: 1,
    endVerse: 7,
    heading: "God Makes A Distinction",
    summary: "The livestock plague strikes Egypt, but Israel's livestock are protected.",
    teaching: [
      "The fifth plague moves from the river and the land into Egypt's economy. Livestock meant food, travel, farming, wealth, sacrifice, and military strength.",
      "God says the plague will strike Egyptian livestock, but not the livestock of Israel. That distinction matters because the plagues are not random chaos.",
      "Pharaoh even sends people to check, and he finds that not one of Israel's animals has died. He receives evidence, not rumors.",
      "But his heart still remains hard. Exodus keeps showing us that information alone does not soften a person who wants control more than truth.",
      "This plague teaches Egypt that the LORD rules over daily survival, not just religious spaces.",
    ],
  },
  {
    reference: "Exodus 9:8-12",
    chapter: 9,
    startVerse: 8,
    endVerse: 12,
    heading: "The Magicians Cannot Stand",
    summary: "Soot becomes boils, and Egypt's spiritual experts are powerless before Moses.",
    teaching: [
      "Moses and Aaron take ashes or soot from the furnace and scatter it toward heaven. That image is powerful because Israel has been suffering around brick kilns and forced labor.",
      "What was connected to Egypt's oppression now becomes a sign of judgment against Egypt itself.",
      "The boils break out on people and animals, and the magicians cannot even stand before Moses. Earlier they tried to imitate signs; now they cannot remain in the room.",
      "The point is not only pain. Egypt's religious system is being publicly humiliated before the God of Israel.",
      "The LORD hardens Pharaoh's heart, and the conflict moves closer to the final act of judgment.",
    ],
  },
  {
    reference: "Exodus 9:13-35",
    chapter: 9,
    startVerse: 13,
    endVerse: 35,
    heading: "Hail, Warning, And False Repentance",
    summary: "God warns Egypt before the hail, some fear His word, and Pharaoh confesses without surrendering.",
    teaching: [
      "Before the hail falls, God gives one of the clearest explanations in the plague story. He tells Pharaoh that His power will be shown so His name may be declared in all the earth.",
      "God also gives a warning. Any Egyptian who fears the word of the LORD can bring servants and livestock indoors before the storm.",
      "That means mercy is present even inside judgment. Some Egyptians begin taking God's word seriously, while others ignore it.",
      "The hail is devastating because it destroys crops, animals, and people left in the field. Yet Goshen is spared again.",
      "Pharaoh says, I have sinned, but when the hail stops, he hardens his heart again. This is sorrow over consequences, not true surrender to God.",
    ],
  },
  {
    reference: "Exodus 10:1-20",
    chapter: 10,
    startVerse: 1,
    endVerse: 20,
    heading: "Locusts Devour What Remains",
    summary: "Locusts cover Egypt, Pharaoh's servants panic, and Pharaoh again seeks relief without obedience.",
    teaching: [
      "God tells Moses that these signs are not only for Pharaoh. Israel is meant to tell their children and grandchildren what the LORD did in Egypt.",
      "That detail turns the plagues into memory. Future generations are supposed to know that God personally confronted Egypt and delivered His people.",
      "The locusts devour what the hail left behind. Egypt's food supply is being stripped layer by layer.",
      "Even Pharaoh's servants begin asking how long this man will be a trap to Egypt. They can see that Pharaoh's pride is destroying the nation.",
      "Pharaoh confesses again, but only asks for death to be removed from him. When the locusts are gone, the hardness returns.",
    ],
  },
  {
    reference: "Exodus 10:21-29",
    chapter: 10,
    startVerse: 21,
    endVerse: 29,
    heading: "Darkness That Can Be Felt",
    summary: "Thick darkness covers Egypt for three days, but Israel has light in their dwellings.",
    teaching: [
      "The ninth plague is darkness so thick it can be felt. This is not ordinary night; it is a sign of judgment over a land that worshiped the sun and trusted visible power.",
      "For three days Egypt sits immobilized. People do not rise from their places, while Israel has light in their homes.",
      "That contrast is more than physical. Egypt's gods cannot give light, but the LORD can preserve light for His people.",
      "Pharaoh offers another compromise: the people may go, but the flocks and herds must stay behind.",
      "Moses refuses because worship cannot be negotiated on Pharaoh's terms. Israel belongs fully to the LORD, including the sacrifices they will bring.",
    ],
  },
  {
    reference: "Exodus 11:1-10",
    chapter: 11,
    startVerse: 1,
    endVerse: 10,
    heading: "The Final Plague Is Announced",
    summary: "God announces the death of the firstborn and says Egypt will finally drive Israel out.",
    teaching: [
      "Exodus 11 announces the final plague before it happens. The death of the firstborn will reach from Pharaoh's throne to the lowest servant.",
      "This judgment answers Pharaoh's earlier violence. Pharaoh tried to destroy Israel's sons, and now Egypt faces judgment in its own households.",
      "The text also says the LORD will make a difference between Egypt and Israel. Deliverance will not happen because Israel is stronger, but because God marks out His people.",
      "Israel is told to ask the Egyptians for silver and gold, and the Egyptians give it. The slaves will not leave empty-handed.",
      "The stage is set for the night when Pharaoh's resistance finally breaks, but God pauses first to teach Israel how to remember deliverance.",
    ],
  },
  {
    reference: "Exodus 12:1-20",
    chapter: 12,
    startVerse: 1,
    endVerse: 20,
    heading: "Passover Begins A New Calendar",
    summary: "God gives Israel the Passover instructions and makes redemption the start of their year.",
    teaching: [
      "Before Israel leaves Egypt, God gives them a calendar. Their new year will begin with the memory of redemption.",
      "That is an aha detail: God is not only freeing bodies from slavery. He is reshaping time, identity, family rhythms, meals, and worship.",
      "Each household is to take an unblemished lamb, kill it at twilight, put its blood on the doorposts, and eat the meal in haste.",
      "The lamb is not decoration. Its blood marks the house, and its body becomes the meal for a people ready to leave bondage.",
      "The unleavened bread and bitter herbs teach memory through taste: haste, suffering, and deliverance are carried into Israel's worship.",
    ],
  },
  {
    reference: "Exodus 12:21-32",
    chapter: 12,
    startVerse: 21,
    endVerse: 32,
    heading: "Blood On The Doorposts",
    summary: "Israel obeys the Passover command, the firstborn die in Egypt, and Pharaoh sends Israel out.",
    teaching: [
      "Moses tells the elders to put the blood on the lintel and doorposts, then stay inside until morning. The doorway becomes the visible line between judgment and shelter.",
      "When the LORD sees the blood, He passes over the house. The safety of the household rests on God's provided sign, not on how impressive the family is.",
      "At midnight, judgment falls through Egypt. There is a great cry because every Egyptian household is touched by death.",
      "Pharaoh finally calls Moses and Aaron and tells Israel to go serve the LORD. The command he resisted is now spoken from his own mouth.",
      "Passover becomes one of the clearest pictures in the Old Testament of rescue through substitute blood, and later Scripture will connect that pattern to Jesus.",
    ],
  },
  {
    reference: "Exodus 12:33-42",
    chapter: 12,
    startVerse: 33,
    endVerse: 42,
    heading: "Israel Leaves Egypt",
    summary: "Israel departs in haste with plunder, unleavened dough, and a mixed multitude.",
    teaching: [
      "The Egyptians urge Israel to leave quickly because the whole land is grieving and afraid.",
      "Israel leaves with unleavened dough, silver, gold, clothing, children, animals, and a mixed multitude. The Exodus is not a quiet escape; it is a public departure.",
      "The mixed multitude is important because some non-Israelites leave with them. God's deliverance is already drawing outsiders near to His people.",
      "The text mentions 430 years, connecting this night to a long story of waiting. God has not forgotten one generation of suffering.",
      "This becomes a night of watching for the LORD. Israel is commanded to remember the night God watched over them and brought them out.",
    ],
  },
  {
    reference: "Exodus 12:43-51",
    chapter: 12,
    startVerse: 43,
    endVerse: 51,
    heading: "A Covenant Meal For A Redeemed People",
    summary: "God gives Passover rules that show the meal belongs to the covenant community.",
    teaching: [
      "After the dramatic exit, Exodus gives careful instructions about who may eat the Passover. That may feel like a slow ending, but it matters.",
      "Passover is not just a meal about escape. It is a covenant meal for people who belong to the LORD.",
      "Circumcision marks belonging to the covenant community, and the same rule applies to the native-born and the foreigner who joins Israel.",
      "That means grace has boundaries, but it is not ethnic pride. Outsiders may come in, but they come in through covenant belonging.",
      "The chapter ends by saying the LORD brought Israel out by their armies. The slaves are now being described like ordered hosts under God's command.",
    ],
  },
] as const;

export const EXODUS_DAY_TWENTY_FOUR_PASSOVER_AND_DELIVERANCE_LESSON: BibleYearDailyLesson = {
  dayNumber: 24,
  title: "Passover and Deliverance",
  reference: "Exodus 9-12",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 24 brings the plague story to its turning point.",
    "Pharaoh keeps resisting, but the LORD keeps making a distinction between Egypt and Israel until the final night arrives.",
    "Exodus 9-12 gives us hail, locusts, darkness, the death of the firstborn, the first Passover, and Israel's departure from Egypt.",
  ],
  sections: DAY_24_SECTIONS.map((section) => ({
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
    "Day 24 shows that God's deliverance is not vague inspiration. It comes through judgment, mercy, blood, obedience, memory, and a people walking out of bondage.",
    "Pharaoh cannot keep what belongs to the LORD.",
    "The slaves leave Egypt marked by Passover, carrying the memory that God Himself brought them out.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_NOTES = `## Bible Reader Chapters Covered

- Exodus 9
- Exodus 10
- Exodus 11
- Exodus 12

## Chapter Introduction

Exodus 9-12 brings the confrontation with Pharaoh to its breaking point.

The earlier plagues already showed that Egypt's power was limited. Now the plagues become heavier: livestock die, boils break out, hail destroys crops, locusts devour what remains, darkness covers the land, and the final plague is announced.

But the center of this reading is not only judgment. The center is Passover.

Before Israel leaves Egypt, God teaches them how to remember deliverance. He gives them a lamb, a meal, blood on the doorposts, unleavened bread, bitter herbs, and a new calendar.

That means God is not simply getting Israel out of slavery. He is forming them into a people who will remember who rescued them.

## Study Notes

Exodus 9 begins with God striking Egypt's livestock while protecting Israel's livestock. This shows that the plagues are not random disasters. God is making a clear distinction between Egypt and His covenant people.

Then boils break out on people and animals. Even the magicians cannot stand before Moses. The religious experts who once tried to imitate God's signs are now covered in the same judgment as everyone else.

The plague of hail includes a warning. Egyptians who fear the word of the LORD can bring their servants and animals inside. That detail matters because it shows mercy inside judgment. Some Egyptians begin responding to God's word, even while Pharaoh keeps hardening his heart.

In Exodus 10, locusts eat what the hail left behind. Pharaoh's own servants begin to see that his pride is destroying Egypt. Then darkness covers Egypt for three days, but Israel has light in their dwellings.

Exodus 11 announces the final plague: the death of the firstborn. This is the plague that will finally break Pharaoh's grip and force Egypt to send Israel out.

Exodus 12 slows down and gives the Passover instructions. Each household takes an unblemished lamb. The blood is placed on the doorposts. The meal is eaten in haste. Israel is dressed and ready to leave.

When judgment comes, the blood marks the houses that are spared. Egypt cries out in grief, Pharaoh finally sends Israel away, and the people leave with silver, gold, livestock, unleavened dough, and a mixed multitude.

## Deep Study Notes

The final plagues show that the LORD rules every layer of Egypt's life.

He rules over livestock, bodies, weather, crops, insects, darkness, life, death, time, worship, memory, and national identity. Pharaoh may sit on a throne, but Exodus is teaching us that Pharaoh is not ultimate.

One of the most important repeated ideas in these chapters is distinction.

God makes a distinction between Egypt and Israel. This does not mean Israel is naturally better than Egypt. It means Israel belongs to the LORD by covenant mercy. Their safety rests on God's promise and God's provided protection.

That becomes clearest at Passover.

The Passover lamb is selected, killed, and eaten. Its blood is placed on the doorway. The family inside the house is sheltered because the blood marks the house.

That is a major Bible pattern.

- Judgment is real.
- Rescue is provided by God.
- Blood marks the place of safety.
- God's people respond by faith and obedience.
- Deliverance becomes something they remember and teach their children.

The lamb had to be without blemish. That detail teaches that the sacrifice was not casual leftovers. The lamb represented something whole, clean, and set apart for God.

The doorposts matter too.

The doorway is the boundary of the home. Blood on the doorway means the whole household is marked by God's provided sign. They do not stand outside explaining why they deserve to be spared. They stay inside under the blood.

The unleavened bread also teaches. Leaven takes time to rise, but Israel leaves in haste. The bread becomes a reminder that when God delivered them, they did not have time to settle comfortably in Egypt.

The bitter herbs teach memory through taste. Israel is not supposed to forget the bitterness of slavery. Worship is not only about celebration; it also tells the truth about what God rescued them from.

There is also a beautiful connection to the larger story of Scripture.

Later, the New Testament will describe Jesus as our Passover lamb. That does not erase the Exodus story. It shows that the Exodus story was already teaching a pattern of redemption: God's people are delivered from bondage through blood God provides.

Exodus 12 also begins Israel's calendar with redemption. Their year is now organized around the memory of being rescued.

That is huge.

God is teaching Israel that their identity begins with grace. They are not primarily former slaves. They are a redeemed people. Their first month, their family meal, their worship rhythm, and their national memory all begin with the LORD bringing them out.

## Application & Reflection

Exodus 9-12 reminds us that God does not only confront evil generally. He confronts what enslaves, deceives, hardens, and destroys.

Pharaoh keeps asking for relief without surrender. That is a warning for us. It is possible to want pain to stop without wanting our hearts to change.

Passover teaches a different posture.

Israel survives by trusting God's provided way of rescue. They place the blood where God said to place it. They eat the meal God gave them. They prepare to leave because God said freedom was coming.

For modern readers, this passage asks honest questions:

- Do I only want relief, or do I want surrender?
- Do I trust God's way of rescue, even when it humbles me?
- Do I remember what God has brought me out of?
- Am I teaching the next generation what the Lord has done?

The biggest lesson is simple but deep: deliverance is not something Israel achieved. Deliverance is something God provided.

And when God brings His people out, He does not want them to forget it.`;

export const BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_24_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- God is answering Pharaoh's question by showing His authority over Egypt.
- The plagues expose false security and reveal that the LORD makes a distinction.
- Passover teaches Israel to remember deliverance through a meal, a lamb, blood, and obedience.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### That Ye May Know That I Am The LORD
The plagues are revelation, not random destruction. God is making Himself known to Pharaoh, Egypt, Israel, and future generations.

### I Will Sever In That Day
God's distinction between Egypt and Israel shows covenant protection. Judgment is precise, and God knows how to guard His people.

### That My Name May Be Declared Throughout All The Earth
The Exodus is never meant to stay a private national memory. God intends His rescue to become testimony for the world.

### The Blood Shall Be To You For A Token
The blood on the doorposts is the visible sign of shelter. Israel is safe because God provides a sign and honors His own word.

### The LORD's Passover
Passover belongs to the LORD because He is the rescuer. Israel will remember this night every year because redemption becomes the foundation of their identity.

## What This Means

Exodus 9-12 teaches that God's rescue comes through both judgment and mercy.

- God confronts hardened power without losing patience or control.
- Mercy can appear even in judgment, as people are warned before the hail.
- Pharaoh shows the danger of wanting relief without surrender.
- Passover teaches that God's people are saved by trusting the rescue He provides.
- Redemption should become memory, worship, and testimony for the next generation.

The Exodus is not only a story about leaving Egypt. It is the beginning of a redeemed people learning to live by the memory of God's saving power.`,
}));
