export type DeuteronomyTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentySevenRawNotes(rawText: string): DeuteronomyTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Deuteronomy 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+27:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Deuteronomy\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 27:${startVerse}` : `Deuteronomy 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Deuteronomy 27 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_SEVEN_RAW_NOTES = `# Deuteronomy 27:1-4
# 🪨 A Monument For The Words Of The Law
---
## 🗣️ Moses With The Elders Of Israel

This command carries more than one voice behind it.

Moses speaks together with the elders, the recognized leaders of each tribe.

The people were about to enter Canaan without Moses, who would soon die.

Shared leadership here prepares Israel for a future without him.

🗣️ Moses speaks together with the elders

👴 Elders were tribal leaders

⏳ Moses would not enter Canaan

📖 Shared leadership prepares for his absence

---

## 🪨 Set Thee Up Great Stones

Large stones set up on purpose were a common ancient practice.

They marked an event so important it needed a permanent physical reminder.

Writing was not something ordinary families kept at home in books.

Stone was the lasting record everyone could return to and read.

🪨 Large stones marked important events

📜 Stone served as a lasting record

🚧 Set up right after crossing over

📖 A permanent reminder of the moment

---

## 🎨 Plaister Them With Plaister

"Plaister" is the old spelling of plaster, a smooth coating spread over stone.

Egyptian monuments used this same method before painting words on the surface.

The plaster gave rough stone a flat, readable finish.

Without it, the law's words would not have stayed legible for long.

🎨 Plaister means a smooth coating

🇪🇬 Egypt used the same method

📝 Gave the stone a readable finish

📖 Kept the words legible

---

## 📜 Write Upon Them All The Words Of This Law

This was not a summary or a short list of highlights.

Every single word of the law had to appear on that monument.

Anyone standing at the border could read what the nation had agreed to.

The law was never meant to stay hidden with priests or leaders alone.

📜 Every word of the law was written

👥 Anyone at the border could read it

🚫 Not kept hidden with leaders

📖 The law belonged to the whole nation

---

## 🍯 A Land That Floweth With Milk And Honey

This phrase already appeared as a promise, and now it stands written in stone.

Milk pictures healthy flocks, and honey pictures wild, natural abundance.

Repeating the phrase here ties the writing of the law to the promise itself.

The words on the stones described the very land the people were entering.

🐄 Milk pictures healthy flocks

🍯 Honey pictures wild abundance

🔗 Ties the law to the promise

📖 The words describe the land itself

---

## ⛰️ In Mount Ebal

Mount Ebal sat across a valley from Mount Gerizim, near the city of Shechem.

Later in this same chapter, Ebal becomes the mountain used for the curses.

Yet here, at the start of the chapter, an altar goes up on it first.

Judgment was never the last word standing on that mountain.

⛰️ Ebal faced Gerizim across a valley

📍 Near the city of Shechem

⚖️ Ebal later stands for the curses

📖 An altar of worship stood there first

# Deuteronomy 27:5-8
# 🔥 An Altar Of Whole Stones
---
## 🔨 Thou Shalt Not Lift Up Any Iron Tool

Iron tools were used to cut and shape stone for buildings.

This altar had to stay in its natural, unworked condition.

Exodus 20 gives this same command when the law was first given at Sinai.

A tool used for war or labor could not shape a place of worship.

🔨 Iron tools shaped ordinary stone

🚫 This altar stayed unworked

📜 Exodus 20 gave the same rule

📖 War tools could not shape worship

---

## 🪨 Whole Stones

"Whole" here means uncut and unshaped, just as the stones were found.

Human effort could easily turn worship into a display of skill or wealth.

Keeping the stones natural kept the focus on God, not the builder.

The altar's roughness was the point, not a flaw to fix.

🪨 Whole means uncut and unshaped

🎨 Skill could turn worship into display

🙏 Kept the focus on God

📖 Roughness was the point

---

## 🔥 Burnt Offerings

A burnt offering was completely consumed by fire on the altar.

Nothing from this offering was kept back or eaten afterward.

Giving the whole animal pictured giving something entirely, without holding part back.

It was the most total form of sacrifice in the law.

🔥 Completely consumed by fire

🚫 Nothing kept back or eaten

🐑 Pictured total giving

📖 The most complete sacrifice

---

## 🍖 Peace Offerings, And Shalt Eat There, And Rejoice

A peace offering worked differently than a burnt offering.

Part of the animal was given to God, and the rest became a shared meal.

Worshipers, family, and even the priests ate together in celebration.

This offering turned worship into an actual feast, not only a ritual.

🍖 Part burned, part shared as food

👨‍👩‍👧‍👦 Worshipers and priests ate together

🎉 Turned worship into a feast

📖 Not only a ritual, also a meal

---

## ✍️ Very Plainly

"Plainly" means clear and easy to read, without room for confusion.

This same detail was already given earlier in the chapter.

A law only protects people if they can actually read and understand it.

Clarity was treated as part of the command itself.

✍️ Plainly means clear and easy to read

🔁 Repeats the earlier command on purpose

👁️ A law must be understandable

📖 Clarity was part of the command

# Deuteronomy 27:9-10
# 📢 This Day Thou Art Become The People
---
## 👳 Moses And The Priests The Levites

Two different kinds of leaders speak together in this verse.

Moses led the nation, and the Levites served as Israel's priests.

The Levites did not receive their own tribal land like the other tribes.

Their whole calling centered on serving God and teaching His law.

👴 Moses led the nation

👳 Levites served as priests

🚫 Levites received no tribal land

📖 Their calling centered on serving God

---

## 🌅 This Day Thou Art Become The People Of The LORD

Israel had already been God's covenant people since the exodus from Egypt.

Yet this moment, standing at the edge of the promised land, felt like a fresh start.

The wilderness generation had died, and a new generation stood ready to enter.

Becoming the people of the LORD was both an old promise and a new beginning.

🕊️ Already God's people since Egypt

🚶 A new generation stood ready

🌅 This felt like a fresh start

📖 An old promise, renewed again

---

## 👂 Obey The Voice Of The LORD Thy God

"Obey the voice" is a phrase repeated again and again through Deuteronomy.

It pictures the relationship less like following rules and more like listening to someone speak.

God's commandments and statutes were treated as His actual spoken words.

Obedience began with listening before it ever became about doing.

👂 A phrase repeated through Deuteronomy

🗣️ Pictures God's law as His voice

🎧 Obedience starts with listening

📖 Listening comes before doing

# Deuteronomy 27:11-13
# ⛰️ Two Mountains, Blessing And Cursing
---
## 📢 Moses Charged The People The Same Day

"Charged" means gave a solemn, weighty command, not a casual suggestion.

This instruction came on the very same day as the stones and the altar.

Everything in this chapter happened together, as one connected ceremony.

The people were receiving both a monument and a script for worship at once.

📢 Charged means a solemn command

📅 Given the same day as the altar

🔗 One connected ceremony, not separate events

📖 A monument and a script together

---

## ⛰️ These Shall Stand Upon Mount Gerizim To Bless

Mount Gerizim and Mount Ebal sat across a valley from each other near Shechem.

The valley between them worked like a natural amphitheater for sound to carry.

Six tribes stood on Gerizim to pronounce the blessings.

Simeon, Levi, Judah, Issachar, Joseph, and Benjamin made up that group.

⛰️ Gerizim faced Ebal across a valley

🔊 The valley carried sound like an amphitheater

👥 Six tribes stood there to bless

📖 Blessing was announced first

---

## ⚖️ These Shall Stand Upon Mount Ebal To Curse

The other six tribes stood on Ebal to pronounce the curses.

Naming the tribes here was not random or based on chance.

Family history from Genesis quietly explains why each tribe stood where it did.

Blessing and cursing were assigned along old family lines.

⛰️ Six tribes stood on Ebal

📜 Naming them was not random

👴 Genesis explains the assignment

📖 Assigned along old family lines

---

## 📜 Reuben, Gad, And Asher, And Zebulun, Dan, And Naphtali

Reuben was Jacob's firstborn son, yet he lost his place of honor.

Genesis 35 records Reuben's sin against his father, which cost him that standing.

Gad, Asher, Dan, and Naphtali all descended from Jacob's two concubines rather than his wives.

Zebulun was Leah's youngest son, born after her more favored sons were grown.

👴 Reuben lost his honor as firstborn

📜 Genesis 35 records why

🌿 Four tribes came from the concubines

📖 Family rank shaped the mountain

# Deuteronomy 27:14-19
# 🗣️ The Levites Speak, And All Israel Answers
---
## 📢 With A Loud Voice

The Levites did not whisper these curses privately to a few leaders.

Every person standing in that valley was meant to hear them clearly.

A curse spoken in secret could be denied or forgotten later.

Speaking it loudly made the whole nation a witness to the same words.

📢 Not whispered to a few leaders

👥 Everyone in the valley could hear

🚫 Could not be denied later

📖 The nation witnessed the same words

---

## 🪵 Graven Or Molten Image

A graven image is carved by hand out of wood or stone.

A molten image is melted metal poured into a mold instead.

The law names both methods so no craftsman could claim a loophole.

Either way, the result was a false god made by human hands.

🪵 Graven means carved by hand

🔥 Molten means metal poured into a mold

🚫 No loophole for either method

📖 Both were false gods made by hands

---

## 🙈 In A Secret Place

This idol was not standing in the open for everyone to see.

Someone had hidden it, hoping no one else would ever find out.

The curse still applied, even though no human witness had caught the sin.

God's law reached into hidden rooms, not only public squares.

🙈 The idol was hidden, not public

🤫 The owner hoped no one would know

⚖️ The curse still applied

📖 God's law reached hidden places

---

## ⚖️ Setteth Light By His Father Or His Mother

This is an old phrase meaning to treat someone as if they hardly matter.

It is the opposite of the honor commanded back in Exodus 20.

No one had to strike a parent for this curse to apply.

Contempt alone, without ever raising a hand, was already a serious offense.

⚖️ Setteth light means treating as unimportant

🔄 The opposite of honoring parents

🚫 No violence needed to break this law

📖 Contempt alone was already an offense

---

## 🪨 Removeth His Neighbour's Landmark

A landmark was a stone marker showing exactly where one family's land ended.

Moving it quietly in the night could steal land without any open violence.

Land was each family's long term security and inheritance in Israel.

This curse protected people from theft that looked like a simple mistake.

🪨 Landmark meant a boundary stone

🌙 Moving it at night hid the theft

🌾 Land meant a family's security

📖 Protected against quiet, hidden theft

---

## 👀 Maketh The Blind To Wander Out Of The Way

This describes deliberately misleading someone who cannot see the danger themselves.

A blind traveler trusted others completely for direction.

Exploiting that trust for cruelty or amusement was named a curse on purpose.

God's law protected the exact people who had no way to protect themselves.

👀 Deliberately misleading a blind traveler

🤝 Blind travelers had to trust others

😈 Exploiting that trust was cruel

📖 God protected the defenseless

---

## 👥 Perverteth The Judgment Of The Stranger, Fatherless, And Widow

These three groups had nothing in common except this.

None of them had a powerful family to defend them.

A stranger had no local relatives to speak up for him.

An orphan had no father to defend him.

A widow had no husband to defend her.

"Perverteth" means twisting a judgment away from what is fair.

👥 Three groups without family protection

🏛️ A stranger, an orphan, a widow

⚖️ Perverteth means twisting what is fair

📖 The law repeatedly protects them

---

## 🙋 And All The People Shall Answer And Say, Amen

"Amen" means "so be it," a word of solemn agreement.

Every person in the crowd spoke this word out loud.

They said it after each curse was read.

This turned listening into real participation.

By saying amen, the whole nation placed itself under these words.

🗣️ Amen means so be it

👥 The whole crowd answered aloud

🙋 Turned listening into participation

📖 The nation placed itself under the law

# Deuteronomy 27:20-23
# 🚫 Curses Against Hidden Sins Within The Family
---
## 👩 Lieth With His Father's Wife

This law addresses a stepmother.

It does not refer to a man's own birth mother.

A father could have more than one wife in this culture.

Sleeping with a father's other wife was a direct betrayal of him.

Genesis 35 records Reuben committing exactly this sin against Jacob.

👩 This means a stepmother

👨 Fathers could have more than one wife

💔 A direct betrayal of the father

📖 Reuben committed this exact sin

---

## 👘 Uncovereth His Father's Skirt

"Skirt" here means the edge or hem of a garment, not women's clothing.

The phrase is an old way of speaking about sexual relations without being crude.

Uncovering a father's skirt meant taking what belonged only to him.

The euphemism let the law state a hard truth without vulgar language.

👘 Skirt means a garment's edge

🗣️ An old way to speak about this

🚫 Taking what belonged only to the father

📖 Plain truth without vulgar words

---

## 🐐 Lieth With Any Manner Of Beast

This curse forbids sexual contact between a person and an animal.

Surrounding nations sometimes tied practices like this to their pagan worship.

Israel's law drew a hard line between human beings and animals.

Refusing this practice was part of what set Israel apart from its neighbors.

🐐 Forbids sexual contact with animals

🛐 Some neighbors linked this to pagan worship

🚧 A hard line between people and animals

📖 Set Israel apart from its neighbors

---

## 👧 His Sister, The Daughter Of His Father, Or The Daughter Of His Mother

This phrasing covers a full sister and a half sister both.

A daughter of the same father counts, even with a different mother.

A daughter of the same mother counts too, even with a different father.

The law closed off every close family relationship this way.

👧 Covers full sisters and half sisters

👨 Same father, different mother still counts

👩 Same mother, different father still counts

📖 Closed off every close relationship

---

## 👵 His Mother In Law

This law protects a man's wife's mother from this exact sin.

It closes a relationship that marriage created, not blood alone.

Family loyalty in this law extended past bloodline into marriage itself.

The list of forbidden relationships kept growing to close every gap.

👵 Protects a wife's mother

💍 Created by marriage, not blood

🔒 Loyalty extended past bloodline

📖 Closed every possible gap

# Deuteronomy 27:24-26
# ⚖️ Closing The List, Sealing The Curses
---
## 🗡️ Smiteth His Neighbour Secretly

This curse targets murder committed away from any witness.

Israel's justice system depended on evidence and testimony to convict someone.

A secret killing could easily go completely unpunished by human courts.

This curse declared that God still saw what no court could prove.

🗡️ Targets murder with no witness

⚖️ Courts needed evidence to convict

🙈 Secret killing could escape human justice

📖 God still saw what courts could not

---

## 💰 Taketh Reward To Slay An Innocent Person

"Reward" here means a bribe paid to commit murder for hire.

This describes a hired killer, not a crime of sudden anger.

Calling the victim "innocent" makes clear this was cold and calculated.

Justice for sale was treated as one of the worst crimes in the list.

💰 Reward means a bribe for murder

🎯 A hired killing, not sudden anger

⚠️ The victim was called innocent

📖 Justice for sale was a serious crime

---

## 📜 Confirmeth Not All The Words Of This Law To Do Them

This final curse does not name one specific sin like the others.

It covers every command in the entire law at once.

"Confirmeth" means agreeing to something and following through on that agreement.

The tribes on Gerizim were told to bless.

Yet this chapter records no blessing words at all.

Deuteronomy 28 finally supplies that missing list.

That chapter places the blessings beside these curses.

📜 Covers the whole law at once

🤝 Confirmeth means agreeing and following through

🔜 Deuteronomy 28 still owes the blessings

📖 That chapter completes what this one begins
`.trim();

export const DEUTERONOMY_TWENTY_SEVEN_PERSONAL_SECTIONS = parseDeuteronomyTwentySevenRawNotes(
  DEUTERONOMY_TWENTY_SEVEN_RAW_NOTES,
);
