export type LeviticusTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwelveRawNotes(rawText: string): LeviticusTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 12:${startVerse}` : `Leviticus 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 12 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWELVE_RAW_NOTES = `# Leviticus 12:1-2
# 🤱 A New Mother's First Week
---
## 🗣️ Speak Unto The Children Of Israel

God speaks only to Moses first.

Moses then relays every word to the whole nation.

That handoff repeats through nearly every law in Leviticus.

This law is not private instruction just for mothers.

The whole community learns it together, men included.

🗣️ Moses alone hears God first

📢 Israel hears it secondhand from Moses

🔁 The pattern repeats across Leviticus

📖 A woman's law reaches the whole camp

---

## 🌱 If A Woman Have Conceived Seed, And Born A Man Child

Conceived seed means she became pregnant and carried a child.

Man child simply means a baby boy was born.

This law covers something completely normal, not any wrongdoing.

Being ceremonially unclean here never meant sin or guilt.

It only meant a temporary pause from the sanctuary.

🌱 An old phrase for becoming pregnant

👶 Man child means a newborn son

⚖️ Childbirth itself was never wrongdoing

📖 Uncleanness only paused sanctuary access

---

## 🗓️ She Shall Be Unclean Seven Days

Unclean here does not mean dirty or sick.

It means she was set apart from the sanctuary for a while.

Seven days matched the same length as her monthly cycle.

That week worked like a built in recovery window.

No tabernacle duties were expected of her during that time.

🗓️ Unclean means set apart, not dirty

🛌 A full week built in to recover

🩸 Length matches her monthly cycle

📖 No tabernacle work expected that week

---

## 🩸 According To The Days Of The Separation For Her Infirmity

Infirmity here is an old word for her monthly bleeding.

The separation refers to the same monthly law from chapter fifteen.

Chapter fifteen explains that law in full detail later.

This verse simply points ahead to it instead of repeating it.

That saved the text from repeating the same rule twice.

🩸 Infirmity is an old word for bleeding

📖 Points ahead to chapter fifteen's law

🔗 Chapter fifteen covers the full detail

➡️ One cross reference saves repeating the rule

# Leviticus 12:3
# 🔪 The Eighth Day Sign
---
## 🔪 The Flesh Of His Foreskin Shall Be Circumcised

Circumcised means the foreskin was surgically removed from the child.

This was not a new rule invented here in Leviticus.

It repeats the covenant sign God gave Abraham long before.

Genesis seventeen already commanded this same sign.

Circumcision marked a boy as part of Abraham's covenant family.

🔪 Surgical removal of the foreskin

📜 Not a new rule in Leviticus

✝️ Repeats the sign God gave Abraham

📖 It marked a boy into that covenant

---

## 📅 In The Eighth Day

The eighth day was not a random choice.

It falls right after the mother's first seven days end.

The Bible does not explain every reason behind that exact timing.

Still, the eighth day stayed fixed everywhere circumcision appears later.

A single unchanging number tied every generation back to Abraham.

📅 Not a random number chosen here

🗓️ Lands right after her first week

🔒 Stayed fixed everywhere circumcision appears

📖 Scripture never spells out the exact reason

# Leviticus 12:4
# 🩸 Thirty Three More Days
---
## 🩸 Three And Thirty Days

Three and thirty is an old way of saying thirty three.

This begins a second, longer stage after the first sharp week.

It was milder than the first seven days of uncleanness.

She still could not touch anything holy during this stage.

🩸 An old way of saying thirty three

🗓️ A second, longer stage follows

📉 Milder than the first week

📖 Holy things stayed off limits still

---

## 🚫 She Shall Touch No Hallowed Thing, Nor Come Into The Sanctuary

Hallowed means holy, something set apart for God.

This restriction covered two specific things only.

She could not touch holy objects or enter the sanctuary.

Ordinary daily life continued completely unaffected.

🚫 Hallowed means holy, set apart

🏛️ Only holy objects and the sanctuary

🏠 Daily life went on as normal

📖 A narrow rule, not full isolation

---

## ⏳ Until The Days Of Her Purifying Be Fulfilled

Fulfilled here means the whole waiting period finally ended.

Seven days plus thirty three more equal forty days total.

Forty shows up again and again across the whole Bible.

Forty years in the wilderness used that same number.

Jesus fasting forty days in Matthew four used it too.

Her forty days echoed a pattern far bigger than one family.

⏳ Fulfilled means the whole wait ended

🔢 Seven plus thirty three makes forty

📖 Forty repeats often across scripture

➡️ Her wait echoed a much larger pattern

# Leviticus 12:5
# 👧 If The Child Is A Daughter
---
## 👧 But If She Bear A Maid Child

Maid child is an old way of saying a baby girl.

This verse now covers the second case in the same law.

Only the numbers change from here, not the meaning.

The son's case and the daughter's case share the same purpose.

👧 An old phrase for a baby girl

🔁 The chapter's second case begins here

🔢 Only the numbers shift from here

📖 Both cases share the same purpose

---

## 🩸 Unclean Two Weeks, As In Her Separation

The first, stricter stage now doubles from one week to two.

A son required seven days, a daughter required fourteen.

The text never explains why the child's sex changes the length.

The honest answer is that the reason goes unstated.

🩸 The first stage doubles to two weeks

🔢 Seven for a son, fourteen for a daughter

🤔 No stated reason for the difference

📖 Better honest than invented certainty

---

## 🔢 Threescore And Six Days

Threescore and six is an old term for sixty six.

Add that to the first fourteen days already spent.

A daughter's mother spent eighty days total under restriction.

That is exactly double the forty days set for a son.

🔢 An old term meaning sixty six

➕ Fourteen plus sixty six makes eighty

⚖️ Exactly double a son's forty days

📖 The law scaled fully by sex

# Leviticus 12:6-7
# 🐑 The Offering That Closes It Out
---
## 🐑 A Lamb Of The First Year For A Burnt Offering

A lamb of the first year means a lamb under twelve months old.

That age was the standard for every burnt offering in this system.

One visit to the tabernacle closed the whole waiting period.

The lamb itself was completely consumed on the altar.

🐑 A lamb under twelve months old

🔥 The standard age across burnt offerings

🚪 One visit closed the whole wait

📖 The lamb was fully consumed there

---

## 🕊️ A Young Pigeon, Or A Turtledove, For A Sin Offering

A second, smaller bird was offered specifically as a sin offering.

Sin offering here does not mean she had done something wrong.

Chapters four and five already used this same pattern.

Childbirth itself was never treated as sin in this law.

🕊️ A second bird for a sin offering

⚖️ Not a sign of personal guilt

🔄 Same pattern as chapters four and five

📖 Childbirth itself was never called sin

---

## 🚪 Unto The Door Of The Tabernacle Of The Congregation, Unto The Priest

The offering had to go to one specific place, the entrance.

It also had to go to one specific person, the priest.

The mother herself never performed the actual sacrifice.

The priest carried out the ritual on her behalf.

🚪 One place only, the entrance

👤 One person only, the priest

🙅 The mother never did the sacrifice

📖 The priest acted in her place

---

## ✨ Make An Atonement For Her

Atonement translates a Hebrew word meaning to cover or make right.

That same word appears behind every offering type in Leviticus.

Issue of her blood simply refers to the bleeding from childbirth.

This one ritual formally closed out that whole waiting period.

✨ A Hebrew word meaning cover or restore

📜 The same word behind every offering

🩸 Refers plainly to childbirth bleeding

📖 One ritual closed the whole period

---

## ⚖️ The Law For Her That Hath Born A Male Or A Female

This line ties both cases in the chapter back together.

The same offering applied to a son or a daughter.

Only the waiting period length ever differed between the two.

The final ritual itself never scaled by the child's sex.

⚖️ Ties both cases back together

🔢 One offering for son or daughter

👶 Only the waiting period ever differed

📖 The final ritual never scaled by sex

# Leviticus 12:8
# 🕊️ When A Lamb Is Too Costly
---
## 💰 If She Be Not Able To Bring A Lamb

This verse builds in help for poorer families.

Chapter five already used this same sliding scale.

Cost never decided whether a family could receive atonement.

God's provision reached every family, rich or poor.

💰 Built in help for poorer families

🔄 Same sliding scale as chapter five

✅ Cost never blocked anyone's atonement

📖 God's provision reached rich and poor

---

## 🕊️ Two Turtles, Or Two Young Pigeons

Two small birds could fully replace the lamb and bird combination.

One bird still covered the burnt offering.

The second bird still covered the sin offering.

Only the animal changed, never the purpose behind it.

🕊️ Two birds replaced the whole combination

🔥 One bird for the burnt offering

⚖️ One bird for the sin offering

📖 Only the animal changed, not the purpose

---

## 🙏 The Priest Shall Make An Atonement For Her, And She Shall Be Clean

This same ritual finished the purification either way.

Centuries later, Mary and Joseph brought this exact bird offering.

Luke two says they brought two turtledoves or two young pigeons.

That detail quietly shows the family was not wealthy.

This one law in Leviticus explains that small Gospel detail.

🙏 Either offering finished the purification

👶 Mary and Joseph used this exact option

📜 Luke two names the same two birds

📖 One Leviticus law explains that Gospel detail`.trim();

export const LEVITICUS_TWELVE_PERSONAL_SECTIONS = parseLeviticusTwelveRawNotes(LEVITICUS_TWELVE_RAW_NOTES);
