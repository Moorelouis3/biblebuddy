export type NumbersThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThirtySixRawNotes(rawText: string): NumbersThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 36:${startVerse}` : `Numbers 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Numbers 36 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THIRTY_SIX_RAW_NOTES = `# Numbers 36:1-4
# 🏛️ Manasseh's Elders Raise A Concern
---
## 👴 The Chief Fathers Of The Families

"Chief fathers" means the leading men who spoke for their whole clan.

They were not random visitors bringing a private complaint.

They represented the entire family line of Manasseh's son Machir.

Land law affected the whole clan, so their leaders raised it formally.

This was official business, brought through the proper channels.

👴 Chief fathers means clan leaders

🗣️ They spoke for the whole family

📜 Land law needed formal representation

➡️ This was official business, not a complaint

---

## 🧔 Gilead, The Son Of Machir, The Son Of Manasseh

Gilead here is a man, not just the region already named in Numbers.

He was the son of Machir and the grandson of Manasseh, one of Joseph's two sons.

This family line reaches back through Joseph all the way to Jacob.

Israel is camped right now in a region also called Gilead.

That region was named after this very same family.

🧔 Gilead is a person, not just a place

🌳 He was Machir's son and Manasseh's grandson

📍 The region Gilead was named after his family

📖 One family name links Genesis to Numbers

---

## 👧 The Inheritance Of Zelophehad Our Brother

Zelophehad already appears earlier in Numbers, back in chapter twenty seven.

He died in the wilderness leaving five daughters and no sons.

Moses ruled then that daughters could inherit land when there was no son.

That ruling from chapter twenty seven is the reason this whole chapter exists.

One family's hard question now shapes a law for all of Israel.

👧 Zelophehad had five daughters, no sons

📜 Chapter twenty seven let daughters inherit

⚖️ That ruling created a new question

📖 One case became a law for everyone

---

## 🎲 By Lot

Land in Canaan was not divided by choice or by bargaining.

Each tribe's territory was decided using lots instead.

Think of it like drawing a marked stone from a bag.

The method removed favoritism from a decision meant to last for generations.

God was seen as the one truly choosing each family's ground.

🎲 Lots decided each tribe's land

⚖️ The method removed human favoritism

🙏 God was seen as the true chooser

📖 A random method meant to feel fair

---

## 💍 If They Be Married To Any Of The Other Tribes

In this culture, land legally followed a married woman into her husband's tribe.

If Zelophehad's daughters married outside Manasseh, their land would move with them.

That land would then belong permanently to their husbands' tribes, not their own.

Manasseh's total territory would shrink every time a daughter married outward.

The elders were not against the marriages themselves.

They were protecting Manasseh's ground.

💍 Land followed a wife into marriage

📉 Manasseh's territory could shrink permanently

🗺️ Land would transfer to another tribe

➡️ The elders were protecting tribal ground

---

## 📅 The Jubile

The "jubile" was a special year that came every fifty years.

In a normal jubile, any land sold or lost was returned to its original family.

This case was different because it involved inheritance, not a sale.

Even the jubile reset could not undo a marriage into another tribe.

The elders realized this gap had no built in fix, so they needed a new ruling.

📅 Jubile means a fifty year reset

🔁 It normally returned land to families

🚫 It could not undo this kind of loss

📖 A real gap needed a real ruling

# Numbers 36:5-9
# ⚖️ The LORD's Ruling
---
## 👍 The Tribe Of The Sons Of Joseph Hath Said Well

Moses does not dismiss the concern or call it unnecessary.

He tells the whole community that Joseph's tribe raised a fair point.

God takes practical questions about land and fairness seriously.

This sets up the ruling that follows as a real answer, not silence.

A legal problem gets a legal solution here, not a brush off.

👍 Moses calls the concern fair

⚖️ God takes practical fairness seriously

📜 A real answer follows this verse

➡️ A problem gets a real solution

---

## 💛 Let Them Marry To Whom They Think Best

God gives the daughters real freedom in choosing a husband.

This is not an arranged marriage forced on them by the tribe.

Their own preference genuinely matters within this ruling.

That freedom comes with one condition, explained in the very next phrase.

Freedom and family responsibility hold together here, not against each other.

💛 The daughters choose their own husband

🚫 This is not a forced marriage

✅ Their preference genuinely matters

➡️ One condition still applies

---

## 🎯 Only To The Family Of The Tribe Of Their Father

The one condition here is narrower than simply marrying inside Israel.

They must marry someone from their own father's tribe of Manasseh.

That keeps the marriage close to home.

Real choice still remains among many men.

The restriction targets tribal land, not personal happiness.

A boundary this specific solves the exact problem the elders raised.

🎯 The rule is narrow and specific

👪 They must marry within Manasseh

💛 Real choice still remains inside that group

📖 A specific rule solves a specific problem

---

## 🚧 The Inheritance Shall Not Remove From Tribe To Tribe

This law is bigger than one family's situation.

No inheritance in Israel may permanently cross from one tribe into another.

Each tribe's promised land stays fixed, generation after generation.

The rule protects every tribe, not only the daughters of Zelophehad.

What started as one family's question becomes a permanent law for the whole nation.

🚧 No land crosses tribe to tribe

🗺️ Each tribe's land stays fixed

🛡️ The rule protects every tribe

📖 One question became a national law

---

## 🔮 Every Daughter That Possesseth An Inheritance

Verse eight widens the rule beyond Zelophehad's daughters specifically.

Any future daughter who inherits land faces this same requirement.

She must marry inside her own father's tribe to keep the land there.

This turns a single case into a standing law for Israel.

A rare case became the pattern for every case like it afterward.

🔮 Any future heiress faces this rule

📏 The rule looks beyond this one case

📜 It becomes a standing law

➡️ A rare case sets the pattern

---

## 🗺️ Keep Himself To His Own Inheritance

Land in Canaan was never just real estate to Israel.

Each tribe's ground was a physical piece of God's promise to Abraham.

Losing that ground to another tribe would blur a promise meant to stay clear.

Keeping land fixed kept the promise visible on a map, not just in words.

The whole point was a promise you could literally walk on, tribe by tribe.

🗺️ Land marked God's promise on a map

🤝 The promise traced back to Abraham

🚫 Mixing tribes would blur that promise

📖 A promise you could walk on

# Numbers 36:10-13
# 🏁 Numbers Comes To A Close
---
## ✅ So Did The Daughters Of Zelophehad

The daughters do exactly what God commanded through Moses.

There is no protest, no delay, no argument in the text.

Their obedience closes a story that began with a bold request in chapter twenty seven.

Willing daughters and a willing tribe end this case without conflict.

A hard legal question ends quietly, with simple obedience.

✅ The daughters obey without protest

📜 Their story began in chapter twenty seven

🕊️ The case ends without conflict

📖 Obedience closes a hard question

---

## 📛 Mahlah, Tirzah, And Hoglah, And Milcah, And Noah

These are the same five names first listed in chapter twenty seven.

Naming them again here treats them as real individuals.

They are five specific women, not a nameless group.

Together they were the reason land law changed for every woman in Israel.

Scripture remembers each of their names, not just their father's.

📛 Five names repeated from chapter twenty seven

🗣️ Naming them treats them as individuals

⚖️ They changed inheritance law for everyone

📖 Five women written into permanent law

---

## 👪 Married Unto Their Father's Brothers' Sons

"Their father's brothers' sons" means their own first cousins.

Marrying a cousin was common and accepted in the ancient Near East.

It was not treated as strange the way it might be today.

Marrying inside the extended family also made the land ruling easy to keep.

A close family marriage solved a legal problem without any bitterness attached.

👪 Their father's brothers' sons means cousins

🌍 Cousin marriage was common back then

🚫 It was not seen as strange

📖 Family marriage kept the ruling simple

---

## 🗺️ Their Inheritance Remained In The Tribe

The exact outcome the elders feared in verse three never happens.

Manasseh's territory stays whole because the marriages stayed inside the tribe.

The law worked exactly the way God designed it to work.

A problem raised at the start of the chapter is fully solved by its end.

The land stayed right where the promise first placed it.

🗺️ Manasseh's land stays whole

✅ The feared outcome never happens

⚙️ The law works as designed

📖 The land stays where the promise placed it

---

## 📜 The Commandments And The Judgments

This phrase is a formal summary line, common at the end of a law section.

"Commandments" covers direct instructions and "judgments" covers legal rulings like this one.

Together they describe everything God gave Israel through Moses in the book of Numbers.

A case about one family's land becomes part of that whole permanent record.

Even a narrow family dispute earned a lasting place in Israel's law.

📜 Commandments and judgments summarize the law

📋 One word covers rules, one covers rulings

📚 Together they close the book of Numbers

📖 A family dispute earned a lasting place

---

## 🚪 In The Plains Of Moab By Jordan Near Jericho

This exact location closes out the entire book of Numbers.

Israel is camped just across the Jordan River from the city of Jericho.

Forty years of wandering have ended at the edge of the Promised Land.

The next book, Deuteronomy, opens from this same spot before Israel finally crosses over.

Numbers ends at the doorway, one river away from everything God promised.

🚪 Israel stands at the edge of the land

⏳ Forty years of wandering are over

🗺️ Moab sits just across from Jericho

📖 Numbers ends one river from the promise
`.trim();

export const NUMBERS_THIRTY_SIX_PERSONAL_SECTIONS = parseNumbersThirtySixRawNotes(NUMBERS_THIRTY_SIX_RAW_NOTES);
