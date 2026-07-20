import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";
import { GENESIS_NINETEEN_PERSONAL_SECTIONS } from "./genesisNineteenSource";
import { GENESIS_TWENTY_PERSONAL_SECTIONS } from "./genesisTwentySource";

export const BIBLE_YEAR_DAY_EIGHT_DEEP_NOTES = `Genesis 18-20 brings promise, prayer, mercy, judgment, rescue, warning, and God's protection of the covenant promise together in one heavy but important day.

⛺ Abraham welcomes visitors by his tent, and the promise of Isaac is spoken again.

✨ Sarah hears the promise and laughs because the situation looks impossible. God answers with the question that holds the whole scene together: Is anything too hard for the LORD?

⚖️ Then the story turns toward Sodom and Gomorrah.

🙏 Abraham stands before the LORD and pleads for mercy, while Genesis 19 shows the city's violence, Lot's compromised position, and God's mercy pulling Lot out before judgment falls.

🔥 Genesis 18-20 is not light, but it is honest. God keeps His promise, hears intercession, judges evil, rescues with mercy, and protects Sarah before Isaac's birth.

> 🔥 **Big idea:** Genesis 18-20 teaches that God's promise is stronger than impossibility, His justice is never careless, and His mercy can still rescue people from places they should not remain.`;

export const BIBLE_YEAR_DAY_EIGHT_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = [
  {
    reference: "Genesis 18:1-8",
    title: "Abraham Welcomes the Visitors",
    icon: "⛺",
    summary: "Abraham receives mysterious visitors, and an ordinary tent becomes the setting for a holy encounter.",
    markdown: `## Genesis 18:1-8

> 📖 Read Genesis 18:1-8.

## ⛺ What Is Happening Here?

Abraham is sitting at the entrance of his tent when the LORD appears to him.

He sees three visitors and responds with urgency, humility, and hospitality. He runs to meet them, bows, offers water, prepares food, and creates space for them to rest.

This is more than good manners. Genesis shows Abraham giving attention to a holy moment before he fully understands everything that is happening.

## 🙏 What This Means

The promise does not arrive in a palace or temple.

It comes near Abraham's tent, in the middle of an ordinary day.

## 🔥 Big Idea

Faith pays attention when God comes near, even in normal places and ordinary moments.`,
  },
  {
    reference: "Genesis 18:9-15",
    title: "Sarah Hears the Promise",
    icon: "✨",
    summary: "Sarah hears that she will have a son, laughs at the impossibility, and receives God's central question.",
    markdown: `## Genesis 18:9-15

> 📖 Read Genesis 18:9-15.

## ✨ What Is Happening Here?

The visitors ask about Sarah, and the promise becomes personal again.

Sarah hears that she will have a son. After years of waiting and disappointment, she laughs within herself. The promise sounds impossible from the human side.

But God responds with a question: Is anything too hard for the LORD?

## 🙏 What This Means

Sarah's laugh is not hidden from God, but God's response is not meant to crush her.

It calls her to lift her eyes from human limitation to divine power.

## 🔥 Big Idea

God's promise is not limited by age, delay, weakness, or what seems impossible to us.`,
  },
  {
    reference: "Genesis 18:16-21",
    title: "The Lord Looks Toward Sodom",
    icon: "⚖️",
    summary: "The story turns toward Sodom, and God reveals that judgment comes with full knowledge.",
    markdown: `## Genesis 18:16-21

> 📖 Read Genesis 18:16-21.

## ⚖️ What Is Happening Here?

After the promise is repeated, the visitors look toward Sodom.

God brings Abraham near to the conversation. Sodom and Gomorrah are not judged because of rumor, impatience, or random anger. Their cry is great, and their sin is very grievous.

The language shows that God knows what is happening and judges with truth.

## 🙏 What This Means

God's justice is not careless.

He sees what people do. He hears the cry of victims. He does not ignore evil forever.

## 🔥 Big Idea

Judgment in Genesis is serious, but it is never blind or reckless.`,
  },
  {
    reference: "Genesis 18:22-33",
    title: "Abraham Intercedes",
    icon: "🙏",
    summary: "Abraham draws near and pleads for mercy while trusting that the Judge of all the earth will do right.",
    markdown: `## Genesis 18:22-33

> 📖 Read Genesis 18:22-33.

## 🙏 What Is Happening Here?

Abraham stands before the LORD and pleads for Sodom.

He asks a bold question: Will the Judge of all the earth do right?

Abraham moves from fifty righteous people down to ten. He is reverent, but he is not distant. He comes near and asks for mercy.

## 🧠 What This Means

Prayer is not pretending evil is small.

Abraham knows Sodom is wicked, but he also knows God is just and merciful.

## 🔥 Big Idea

Close relationship with God should make us humble, bold, merciful, and serious about justice.`,
  },
  ...GENESIS_NINETEEN_PERSONAL_SECTIONS.map((section) => ({
    reference: section.reference,
    title: section.title,
    icon: section.icon,
    summary: section.phrases[0]?.[1].split("\n\n")[0] || "",
    markdown: [
      `## ${section.reference}`,
      `### ${section.title}`,
      ...section.phrases.map(([title, body]) => `### ${title}\n\n${body}`),
    ].join("\n\n"),
  })),
  ...GENESIS_TWENTY_PERSONAL_SECTIONS.map((section) => ({
    reference: section.reference,
    title: section.title,
    icon: section.icon,
    summary: section.phrases[0]?.[1].split("\n\n")[0] || "",
    markdown: [
      `## ${section.reference}`,
      `### ${section.title}`,
      ...section.phrases.map(([title, body]) => `### ${title}\n\n${body}`),
    ].join("\n\n"),
  })),
];
