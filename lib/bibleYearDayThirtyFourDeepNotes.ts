import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_34_SECTIONS = [
  {
    reference: "Leviticus 9:1-24",
    chapter: 9,
    startVerse: 1,
    endVerse: 24,
    heading: "Priests Begin And Glory Appears",
    summary: "Aaron offers the first priestly sacrifices, and the glory of the LORD appears to the people.",
    teaching: [
      "After seven days of ordination, Aaron and his sons begin their public priestly ministry.",
      "Aaron offers sacrifices for himself first, then for the people.",
      "That matters because the priest who serves others also needs atonement.",
      "When the offerings are completed, Moses and Aaron bless the people, and the glory of the LORD appears.",
      "Fire comes out from before the LORD and consumes the offering, and the people shout and fall on their faces.",
    ],
  },
  {
    reference: "Leviticus 10:1-7",
    chapter: 10,
    startVerse: 1,
    endVerse: 7,
    heading: "Nadab And Abihu Offer Strange Fire",
    summary: "Aaron's sons Nadab and Abihu offer unauthorized fire before the LORD and die before Him.",
    teaching: [
      "Leviticus 10 is shocking because it comes right after the glory-filled worship of Leviticus 9.",
      "Nadab and Abihu, two of Aaron's sons, offer strange fire that God had not commanded.",
      "Fire comes out from before the LORD, but this time it brings judgment instead of acceptance.",
      "Moses explains that God will be treated as holy by those who come near Him.",
      "Aaron remains silent, and the priests are warned not to leave their place of service.",
    ],
  },
  {
    reference: "Leviticus 10:8-20",
    chapter: 10,
    startVerse: 8,
    endVerse: 20,
    heading: "Priests Must Teach The Difference",
    summary: "God commands the priests to distinguish holy from common and clean from unclean.",
    teaching: [
      "After Nadab and Abihu die, the LORD speaks directly to Aaron.",
      "The priests must not drink wine or strong drink when entering the tent of meeting.",
      "Their calling is to distinguish between holy and common, clean and unclean.",
      "They must also teach Israel all the statutes the LORD has spoken through Moses.",
      "The chapter ends with Moses and Aaron discussing how to handle the sin offering after such a painful day.",
    ],
  },
  {
    reference: "Leviticus 11:1-23",
    chapter: 11,
    startVerse: 1,
    endVerse: 23,
    heading: "Clean And Unclean Animals",
    summary: "God gives Israel food laws that teach distinction, order, and holiness in daily life.",
    teaching: [
      "Leviticus 11 begins the clean and unclean laws, starting with animals Israel may and may not eat.",
      "Land animals must both chew the cud and have split hooves to be clean.",
      "Water creatures must have fins and scales.",
      "Birds of prey and certain winged creatures are forbidden, while some locust-like insects are allowed.",
      "These laws train Israel to live as a distinct people, noticing holiness even at the dinner table.",
    ],
  },
  {
    reference: "Leviticus 11:24-47",
    chapter: 11,
    startVerse: 24,
    endVerse: 47,
    heading: "Be Holy, For I Am Holy",
    summary: "God explains how contact with carcasses makes someone unclean and calls Israel to holiness.",
    teaching: [
      "The second half of Leviticus 11 explains how uncleanness spreads through contact with dead animals.",
      "People, clothing, vessels, ovens, and food can become unclean through contact.",
      "Uncleanness is not always the same as personal sin, but it still affects access to holy space.",
      "The chapter ends with the reason behind the laws: Israel must be holy because the LORD is holy.",
      "God is teaching His people to make distinctions because they belong to Him.",
    ],
  },
  {
    reference: "Leviticus 12:1-8",
    chapter: 12,
    startVerse: 1,
    endVerse: 8,
    heading: "Purification After Childbirth",
    summary: "God gives purification instructions for a mother after childbirth and provides offerings for rich and poor alike.",
    teaching: [
      "Leviticus 12 gives instructions after childbirth.",
      "This does not mean childbirth is sinful or that babies are bad.",
      "The chapter deals with ritual impurity connected to blood, birth, and reentry into sanctuary worship.",
      "After the purification period, the mother brings offerings, and the priest makes atonement.",
      "If she cannot afford a lamb, she may bring two birds, showing again that God makes room for the poor.",
    ],
  },
] as const;

export const LEVITICUS_DAY_THIRTY_FOUR_WORSHIP_HOLINESS_AND_CLEAN_LIVING_LESSON: BibleYearDailyLesson = {
  dayNumber: 34,
  title: "Worship, Holiness, and Clean Living",
  reference: "Leviticus 9-12",
  estimatedListenTime: "30-35 min",
  opening: [
    "Day 34 continues the priestly story in Leviticus.",
    "Yesterday, Aaron and his sons were washed, clothed, anointed, and marked with blood for service.",
    "Today, the priesthood begins publicly, God's glory appears, unauthorized worship is judged, and Israel begins learning how holiness touches ordinary daily life.",
  ],
  sections: DAY_34_SECTIONS.map((section) => ({
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
    "Day 34 teaches that God's nearness is both beautiful and serious.",
    "The same holy presence that accepts the offering in Leviticus 9 judges unauthorized fire in Leviticus 10.",
    "Then Leviticus 11-12 shows that holiness is not trapped inside the tabernacle; it begins shaping food, bodies, homes, family life, and daily decisions.",
  ],
};

export const BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_NOTES = `## Bible Reader Chapters Covered

- Leviticus 9
- Leviticus 10
- Leviticus 11
- Leviticus 12

## Chapter Introduction

Leviticus 9-12 moves from priestly ordination into priestly ministry.

In Leviticus 8, Aaron and his sons were washed, clothed, anointed, and marked with blood. They remained at the entrance of the tent for seven days. Now, in Leviticus 9, the eighth day arrives.

That means the priests are ready to begin serving publicly.

Aaron offers sacrifices for himself and for the people. Moses and Aaron bless Israel. Then the glory of the LORD appears, and fire comes out from before the LORD to consume the offering.

It is a beautiful moment.

But Leviticus 10 immediately shows the danger of treating God's holiness casually. Nadab and Abihu offer unauthorized fire before the LORD, and they die before Him.

Then Leviticus 11-12 begins teaching Israel how to distinguish clean from unclean in daily life.

The flow matters.

God's glory is near.

Priests must serve carefully.

Israel must learn the difference between holy and common, clean and unclean.

Holiness is not only about what happens at the altar. It touches meals, homes, bodies, childbirth, worship, and the whole life of the people.

## Study Notes

Leviticus 9 begins on the eighth day after the priests' ordination.

Aaron now begins his public priestly ministry. But before he offers sacrifices for the people, he offers sacrifices for himself.

That detail matters.

Aaron is the high priest, but he is still a sinner who needs atonement. He cannot serve the people as if he has no need of mercy himself.

After Aaron offers for himself, he offers for the people: a sin offering, burnt offering, grain offering, and peace offering.

Then Moses and Aaron enter the tent of meeting. When they come out, they bless the people, and the glory of the LORD appears.

Fire comes from before the LORD and consumes the offering on the altar.

The people shout and fall on their faces.

This is worship filled with reverence, joy, and holy fear. God has accepted the offering, and His glory is visible among His people.

Then Leviticus 10 turns sharply.

Nadab and Abihu, two of Aaron's sons, offer strange fire before the LORD. The text says this was fire God had not commanded.

That is the key.

The problem is not that they made a small technical mistake. They approached holy service in a way God did not authorize.

Fire comes from before the LORD again. But this time, instead of consuming the offering, it consumes Nadab and Abihu.

Moses says, This is what the LORD spoke: I will be sanctified in those who come near me.

That means those who serve closest to God's presence must treat Him as holy.

Aaron remains silent.

That silence is heavy. He has lost two sons, and yet the passage is teaching that priestly service cannot be governed by emotion, impulse, or human invention.

Leviticus 10 then explains part of the priestly calling.

Priests must distinguish between holy and common, clean and unclean. They must also teach Israel God's statutes.

This is one of the clearest job descriptions for priests in Leviticus.

They are not only sacrifice handlers. They are teachers of holy distinction.

Leviticus 11 begins the clean and unclean animal laws.

These laws can feel strange to modern readers, but they are not random. They train Israel to think in categories of distinction.

Clean animals can be eaten. Unclean animals cannot.

Land animals must both chew the cud and have split hooves. Water creatures must have fins and scales. Certain birds and winged creatures are forbidden.

God is forming Israel as a set-apart people.

At every meal, they are reminded that they belong to the LORD.

The second half of Leviticus 11 explains uncleanness through contact with dead animals. Clothing, vessels, ovens, food, and people can become unclean.

Unclean does not always mean sinful.

That is important.

Sometimes uncleanness comes through ordinary life in a fallen world: death, blood, bodily processes, and contact with things that do not belong in holy space.

Uncleanness affects access to the sanctuary, but it is not always moral rebellion.

The chapter ends with God's call: You shall be holy, for I am holy.

Leviticus 12 then gives instructions for purification after childbirth.

This chapter can be confusing if we read it too quickly. It does not teach that childbirth is evil or that motherhood is sinful.

Genesis already told us that children are part of God's blessing and creation purpose.

Leviticus 12 is dealing with ritual impurity connected to blood, birth, and reentry into sanctuary worship.

After the purification period, the mother brings offerings. If she cannot afford a lamb, she may bring two birds.

That provision matters because it is the same offering Mary brings after Jesus is born in Luke 2.

It quietly shows that Jesus was born into a poor family that obeyed the law of the LORD.

## Deep Study Notes

Leviticus 9 is one of the great moments of worship in the Old Testament.

Everything has been building toward this.

God rescued Israel from Egypt.

God brought them to Sinai.

God gave the covenant.

God gave the tabernacle pattern.

Israel built the tabernacle.

God's glory filled it.

Then God gave the offerings.

Then Aaron and his sons were consecrated.

Now the priesthood begins serving.

Leviticus says this happens on the eighth day.

That detail is easy to miss, but it matters. Seven days completed the ordination. The eighth day begins a new stage.

In Scripture, the eighth day often carries the sense of a new beginning after completion. Circumcision happens on the eighth day. Later, the first day after the Sabbath becomes the day of resurrection.

Here, the eighth day marks the beginning of public priestly service.

Aaron's first action is humbling.

He offers for himself.

That means the high priest cannot stand above the people as if he has no need. He needs sacrifice before he can minister sacrifice for others.

This becomes important later in the Bible.

The book of Hebrews will contrast Israel's priests with Jesus. The old priests had to offer sacrifices for their own sins. Jesus does not.

So Leviticus is not only teaching Israel what priests do. It is also preparing us to see why a better priest is needed.

When Aaron completes the offerings, Moses and Aaron bless the people.

Then the glory of the LORD appears.

Fire comes out from before the LORD and consumes the offering.

This is divine acceptance.

The offering is received by God Himself.

The people's response is perfect: they shout and fall on their faces.

That combination matters.

They shout because God's glory has appeared and the offering has been accepted.

They fall because God's glory is not casual.

Real worship can hold joy and reverence at the same time.

Then Leviticus 10 begins, and the mood changes instantly.

Nadab and Abihu offer strange fire.

The Hebrew idea is foreign or unauthorized fire. The text explains the problem: God had not commanded it.

That phrase is the heart of the passage.

In Exodus, the tabernacle was built again and again according to all that the LORD commanded Moses. Obedience mattered in every detail because this was God's dwelling.

Nadab and Abihu reverse that pattern.

They bring worship God did not command.

The lesson is not that God hates creativity in every setting. The lesson is that holy approach cannot be invented by human impulse.

When God gives the way to come near, people must not treat His instructions as suggestions.

Fire comes out from before the LORD again.

In Leviticus 9, fire consumes the offering.

In Leviticus 10, fire consumes the priests.

That parallel is intentional and sobering.

God's presence is not safe to mishandle.

Moses says God will be sanctified among those who come near Him.

To sanctify means to treat as holy, set apart, and weighty. The priests' calling is not to make worship impressive. Their calling is to show that God is holy.

Aaron's silence is one of the most painful moments in Leviticus.

The text does not give us a speech from him. It simply says Aaron held his peace.

That silence does not mean he felt nothing.

It means this moment is too weighty for explanation.

The death of his sons is real grief. The holiness of God is also real.

Leviticus refuses to flatten either one.

After this, God gives Aaron a command about wine and strong drink when entering the tent of meeting.

Many readers connect this to Nadab and Abihu's failure, though the text does not explicitly say they were drunk. Either way, the command teaches that priests must serve with sobriety, clarity, and discernment.

Then comes one of the most important lines in Leviticus.

The priests must distinguish between holy and common, and between unclean and clean.

That is a major key for reading the next chapters.

Holy means set apart to God.

Common means ordinary.

Clean means fit for contact with worship and holy space.

Unclean means not fit for that contact until purification happens.

These categories are not exactly the same as good and bad.

That is where many modern readers get confused.

An unclean person is not always a bad person. A woman after childbirth is not sinful for giving birth. A person who touches a dead body may be doing something loving and necessary.

But uncleanness still matters because Israel is living near God's holy dwelling.

The clean and unclean laws teach Israel to notice the difference between life and death, wholeness and disorder, holy space and ordinary life.

Leviticus 11 trains Israel through food.

That may sound strange, but food is one of the most repeated parts of daily life.

Every meal becomes a reminder: we belong to the LORD.

Israel cannot simply eat like the nations around them. Their table becomes part of their identity.

The clean animal categories are also connected to order.

Land animals that are clean must fit both marks: split hoof and chewing the cud. Sea creatures must have fins and scales. Creatures that blur categories or live in ways associated with death, predation, or disorder are often treated as unclean.

Scholars discuss the exact reasons behind each animal category, and not every detail is explained in the text.

But the stated purpose is clear.

God is teaching Israel distinction.

The chapter ends, not with a health lecture, but with theology: be holy, for I am holy.

That means the food laws are about identity before they are about diet.

Israel is being trained to live as a people set apart by the character of the God who rescued them.

Leviticus 12 brings holiness into childbirth.

This can feel uncomfortable to modern readers because childbirth is beautiful and good. The Bible agrees. Children are a blessing. God commanded humanity to be fruitful and multiply.

So why purification after childbirth?

The issue is not that birth is sinful.

The issue is ritual impurity connected to blood and bodily discharge in a world where life and death are deeply intertwined.

Childbirth is one of the places where life comes through blood, pain, and vulnerability.

Leviticus is teaching Israel that even the most ordinary and beautiful parts of life are lived before a holy God.

After the purification period, the mother brings a burnt offering and a sin offering, or purification offering.

The word sin offering can confuse us here because we assume it always means a personal moral failure happened. But in Leviticus, this offering can also deal with impurity and restore access to worship.

That is why careful reading matters.

Leviticus is not saying motherhood is wrong.

It is saying sanctuary access requires purification in a world touched by mortality, blood, and uncleanness.

The poor provision is also deeply important.

If she cannot afford a lamb, she brings two birds.

Centuries later, Mary brings that offering after the birth of Jesus.

That small detail in Luke tells us something huge.

Jesus entered fully into the life of Israel.

His family obeyed the law.

And He was born into humble poverty, not royal comfort.

So even Leviticus 12 prepares us to understand the world Jesus entered.

Day 34 gives us a full picture.

God accepts worship.

God judges unauthorized approach.

Priests must teach distinction.

Israel's daily life must reflect holiness.

And even birth, food, bodies, and family life belong before the LORD.

## Application & Reflection

Leviticus 9-12 reminds us that God's nearness is beautiful, but it is never casual.

That is one of the hardest balances for modern people.

We often want nearness without reverence.

We want access without holiness.

We want worship to feel meaningful to us, but Leviticus asks a deeper question: is it honoring to God?

Nadab and Abihu warn us that worship is not something we invent from our own impulses.

The clean and unclean laws remind us that belonging to God should shape ordinary life, not only religious moments.

For reflection:

- Do I hold joy and reverence together in worship?
- Am I treating God's presence casually?
- Do I let God define worship, or do I assume sincerity is enough?
- Where do I need clearer discernment between holy and common?
- Does my daily life remind me that I belong to the LORD?

The big idea is this: holiness is not a small corner of Israel's life. Because God lives among His people, holiness begins to touch everything.`;

export const BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_34_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Leviticus is showing what happens when priests begin serving near God's holy presence.
- The same presence that accepts obedient worship also judges unauthorized worship.
- Clean and unclean laws teach Israel that holiness shapes ordinary life, not only altar moments.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### The Eighth Day
The eighth day comes after the seven-day ordination period. It marks a new beginning as Aaron and his sons begin public priestly ministry.

### The Glory Of The LORD Appeared
God's visible glory confirms that He is present among His people. The offerings are not empty ritual; God receives worship according to His command.

### Strange Fire
Strange fire means unauthorized fire, something God had not commanded. The issue is holy approach being shaped by human impulse instead of God's word.

### Holy And Unholy, Clean And Unclean
This is a priestly job description. Priests must help Israel understand what belongs near God's holy presence and what must be purified first.

### Be Holy, For I Am Holy
The clean laws are rooted in God's character. Israel is called to live differently because the LORD who rescued them is holy.

## What This Means

Leviticus 9-12 teaches that God's presence requires reverent worship and trained discernment.

- Aaron's first sacrifices show that even priests need atonement.
- God's fire shows that He accepts worship given His way.
- Nadab and Abihu show that unauthorized worship is dangerous near holy presence.
- Clean and unclean laws train Israel to make distinctions in daily life.
- Childbirth purification shows that even ordinary family life is lived before God.

This reading helps us understand that holiness is not only about avoiding obvious sin. It is about belonging to God so fully that worship, meals, bodies, homes, and daily rhythms are brought under His lordship.`,
}));
