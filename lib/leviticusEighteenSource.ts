export type LeviticusEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusEighteenRawNotes(rawText: string): LeviticusEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 18:${startVerse}` : `Leviticus 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 18 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_EIGHTEEN_RAW_NOTES = `# Leviticus 18:1-5
# 📜 One Law For Every Household
---
## 🗣️ Speak Unto The Children Of Israel

This law is not given to the priests first.

It goes straight to the whole nation.

Verses three through five will apply to every family, not just tabernacle worship.

Ordinary households needed to hear this directly, since it governs their homes.

🇮🇱 The whole nation hears this directly

📜 Not filtered through priests first

🏠 Every household is covered

📖 Home life falls under God's law too
---
## 🆔 I Am The LORD Your God

This exact phrase opens the chapter.

It repeats six more times before the chapter ends.

Each repetition works like a signature stamped on that section.

The signature reminds Israel exactly who is giving this command.

It also reminds them the command carries real weight.

🔁 Repeated seven times in this chapter

✍️ Works like a signature on each part

⚖️ Names the source of the command

📖 Grounds every rule in God's own authority
---
## 🇪🇬 The Doings Of The Land Of Egypt

Israel had just spent over four hundred years living inside Egypt.

Egyptian family and sexual customs were the only normal most of them had ever known.

God names Egypt on purpose here.

Its everyday practices are exactly what Israel now has to unlearn.

🇪🇬 Egypt was the culture Israel just left

📅 Over four hundred years spent there

🔄 Egyptian customs felt normal to them

📖 God names the exact habit to unlearn
---
## 🏜️ Whither I Bring You

"Whither" is an old word meaning the place someone is heading.

Canaan is not the culture behind Israel.

It is the culture in front of them.

This warning covers both directions of the journey.

Neither culture is the model to copy.

🗺️ Whither means the place ahead

🏜️ Canaan is Israel's destination

➡️ The warning covers both directions

📖 Neither culture is the pattern to follow
---
## 🚫 Neither Shall Ye Walk In Their Ordinances

"Ordinances" means settled customs and religious practice, not one bad choice.

The command is not only about specific acts.

It rejects an entire way of structuring family and worship life.

Verse four hands Israel a different structure to live inside instead.

📜 Ordinances means settled customs and practice

🏛️ Covers worship life, not just behavior

🚫 Rejects a whole cultural pattern

📖 God hands Israel a new structure instead
---
## ❤️ He Shall Live In Them

This does not mean the law itself could make someone right with God.

Paul quotes this exact line later in Romans and Galatians.

He uses it to argue the law can describe a good life.

It cannot produce that life on its own.

Read here in its own setting, the point is simpler.

Following God's ways leads to real life.

📖 Paul quotes this line in Romans and Galatians

❤️ Live means a full, protected life

⚖️ Breaking these ways leads to judgment

➡️ This sets up the whole chapter's stakes

# Leviticus 18:6-11
# 🚫 Off Limits In The Immediate Family
---
## 🚷 Near Of Kin To Him

"Approach" here is the same word used elsewhere for a man drawing near a woman for marriage or sex.

It is a clear, direct verb, not vague language.

"Near of kin" means close relatives by blood or by marriage.

This one verse sets up the whole list that follows.

Everything after it names a specific example of this same general rule.

🚷 Approach means a plain sexual advance

👪 Near of kin covers blood and marriage

📜 One general rule opens the whole list

📖 Every verse after names one example
---
## 🫣 To Uncover Their Nakedness

"Uncover nakedness" is this chapter's standing way of naming sexual intercourse.

It appears about two dozen times across these thirty verses.

Genesis nine uses the same root phrase for Noah's sons literally seeing his body.

That earlier use shows the phrase can mean something plainly physical too.

Here, in this chapter, it always carries the fuller sexual meaning.

🫣 The chapter's repeated phrase for sex

🔁 Used about two dozen times here

🔤 Context decides which meaning applies

📖 Genesis nine uses the same root phrase
---
## 👨 The Nakedness Of Thy Father

This does not mean a son could ever assault his own father.

It means violating the marriage bed that belongs to him.

Genesis describes husband and wife as one flesh together.

That is why sleeping with a stepmother later in this list gets the exact same label.

👨‍👩‍👧 Father's nakedness means his marriage bed

📖 Rests on the one flesh language in Genesis

🔗 Explains the identical label used for a stepmother

➡️ A marriage bed belongs to the husband alone
---
## 🛏️ The Nakedness Of Thy Father's Wife

This law covers a stepmother, any wife of the father, not only a birth mother.

Israelite men were sometimes married to more than one wife at a time.

That made this a real family situation, not a rare hypothetical.

Reuben breaks this exact law with his father's concubine Bilhah in Genesis thirty five.

Jacob still names that sin on his deathbed years later in Genesis forty nine.

🛏️ Covers a stepmother, any wife of the father

👪 A real case in households with multiple wives

⚠️ Jacob names that sin again at his death

📖 Reuben breaks this law with Bilhah in Genesis
---
## 🏠 Whether She Be Born At Home, Or Born Abroad

This phrase closes a loophole in the law.

A sister through the same mother counts, no matter where she was raised.

A half sister through a different one of the father's wives counts too.

Abraham married his own half sister Sarah before this law ever existed.

That is part of why later scripture never condemns him for it.

🏠 Born abroad closes the half sister loophole

👪 Reflects households built on multiple wives

⏳ That marriage predates this law

📖 Abraham married his half sister Sarah earlier
---
## 👶 For Theirs Is Thine Own Nakedness

This covers granddaughters through a son or through a daughter equally.

The phrase "thine own nakedness" explains the reasoning behind the rule.

A granddaughter carries the grandparent's own bloodline forward.

She is not treated as a separate case needing new logic.

👶 Covers granddaughters on either side

🧬 Thine own nakedness points to shared blood

📜 Explains the reason instead of just the rule

➡️ One bloodline, one boundary
---
## 👧 Thy Father's Wife's Daughter

This names a half sister through the father's other wife.

Verse nine already covers this case in principle.

Verse eleven restates it for one specific family shape, a stepmother's daughter.

Naming it twice keeps anyone from arguing it as a technicality.

👧 A half sister through the father's other wife

🔁 Restates verse nine for one exact case

🚫 Closes a possible technicality

📖 Repetition leaves no room for argument

# Leviticus 18:12-14
# 👵 Aunts By Blood And By Marriage
---
## 👵 Thy Father's Near Kinswoman

This law covers a paternal aunt, the father's own sister.

"Near kinswoman" is the same phrase that opened the whole list back in verse six.

That repeated phrase ties this specific case back to the general rule.

The boundary applies to blood relatives on the father's side.

👵 A paternal aunt, the father's sister

🔗 Near kinswoman echoes the opening rule

📜 Blood relation on the father's side

📖 One phrase links every case in this list
---
## 👵 Thy Mother's Near Kinswoman

The same rule now applies to a maternal aunt, the mother's own sister.

The wording matches verse twelve almost exactly.

That matching wording is deliberate.

The law does not favor one parent's bloodline over the other.

👵 A maternal aunt, the mother's sister

⚖️ Wording mirrors verse twelve exactly

📜 Blood relation on the mother's side

📖 Neither parent's bloodline gets special treatment
---
## 👨 She Is Thine Aunt

This covers an aunt by marriage, an uncle's wife rather than a blood relative.

Blood and marriage are now grouped under the very same rule.

Moses' own parents had this exact kind of marriage.

Amram married his father's sister Jochebed in Exodus six.

Scripture never condemns that marriage, since it happened before this law was given.

💍 Covers an aunt by marriage, not blood

🧬 Blood and marriage share one boundary here

⏳ Their marriage predates this law

📖 Moses' parents Amram and Jochebed married this way

# Leviticus 18:15-18
# 💍 Boundaries Marriage Creates
---
## 👰 She Is Thy Son's Wife

This law is not about shared blood at all.

A daughter in law becomes off limits the moment she marries into the family.

No blood connection is required for this boundary to apply.

Marriage itself is enough to create the boundary.

👰 No blood relation required here

💍 Marriage alone creates the boundary

📜 Shows the list is not only about bloodline

➡️ A wedding can create a new limit
---
## 👨‍👩‍👦 It Is Thy Brother's Nakedness

A brother's wife is completely off limits.

That protection lasts only through his lifetime.

This verse uses the same wording already used for a father's wife earlier in the chapter.

A later law in Deuteronomy twenty five requires marrying a dead, childless brother's widow.

That law only applies after the brother has died.

This verse addresses a living brother's wife instead.

🚫 Off limits only through his lifetime

📖 Uses the same wording as a father's wife

⚖️ Deuteronomy twenty five covers a different case

➡️ Two laws for two different situations
---
## 😔 It Is Wickedness

This law bans marrying or having relations with both a woman and her daughter.

It also covers a granddaughter through either one.

This is the only relation in the whole chapter labeled "wickedness" directly.

Every other case here is called an "abomination" instead.

😔 Bans a woman and her daughter together

👩‍👧 Also covers a granddaughter through either

🔤 The only case called wickedness here

📖 Every other case is called abomination instead
---
## 💔 To Vex Her

"Vex" here comes from a Hebrew word for a rival wife.

This law bans marrying two sisters at the same time.

Doing so would deliberately turn two sisters into rivals inside one household.

The law names the exact harm instead of leaving it vague.

💔 Vex ties to the word for rival wife

👭 Bans marrying two sisters at once

🏠 Names the harm of turning sisters into rivals

➡️ One household should not force two rivals
---
## ⏳ Beside The Other In Her Life Time

Jacob married both Leah and Rachel at the same time.

Genesis openly shows the painful rivalry that choice created between them.

This law comes after that marriage already happened.

Like Abraham's marriage to his half sister, it is not retroactively condemned.

The law was not yet written when Jacob made that choice.

📖 Jacob married sisters Leah and Rachel

😢 Genesis records the rivalry it caused

⏳ This law came after that marriage

➡️ Earlier choices are not retroactively judged

# Leviticus 18:19-23
# ⚠️ Five More Serious Boundaries
---
## 🩸 Put Apart For Her Uncleanness

This law connects directly back to the monthly uncleanness rule already given in Leviticus fifteen.

That earlier law addressed ritual purity.

This verse addresses the same situation as a moral boundary instead.

The same act gets treated from two different angles in two different chapters.

🔗 Connects back to Leviticus fifteen's rule

⚖️ Adds a moral angle to a ritual law

📜 Two chapters address the same situation

📖 Purity law and moral law overlap here
---
## 💔 To Defile Thyself With Her

This is a direct ban on adultery with a neighbor's wife.

"Defile" is the same word used throughout this chapter for the land itself becoming polluted.

Sexual sin against a marriage is not treated as a private matter here.

It carries the same weight as the corruption of the whole land.

💔 A direct ban on adultery

🔤 Defile is the same word for the land

⚖️ Not treated as merely a private matter

📖 One word ties personal sin to national harm
---
## 🔥 Pass Through The Fire To Molech

Molech was a god worshipped by nations near Israel, especially the Ammonites.

This phrase describes child sacrifice, offering a son or daughter to be burned as worship.

This one verse bans one of the most horrifying practices named anywhere in the Old Testament.

Later Israelite kings Ahaz and Manasseh are condemned for doing this exact thing.

🔥 Molech worship involved child sacrifice by fire

🌍 Practiced especially by the Ammonites

👑 Kings Ahaz and Manasseh did this later

📖 One verse bans a horrifying practice outright
---
## 🙏 Neither Shalt Thou Profane The Name Of Thy God

Sacrificing a child to another god does not only harm that child.

It is described here as an insult to God's own name.

The act links Israel publicly to a rival god's worship.

Personal sin and public dishonor to God are tied together in this one line.

🙏 Ties this sin to dishonoring God's name

🌍 Links Israel publicly to a rival god

⚖️ Personal sin and public dishonor connect here

➡️ Some sins damage more than the victim
---
## 🔤 It Is Abomination

"Abomination" translates a Hebrew word Leviticus reserves for what it treats as seriously offensive to God.

The same word describes dishonest business scales elsewhere in the Old Testament.

It also describes idol worship in other passages.

This verse names a practice tied to the Egyptian and Canaanite cultures named back in verse three.

🔤 Abomination is a strong recurring Old Testament word

⚖️ Also used for dishonest scales and idols

🔗 Connects back to the Egypt and Canaan warning

📖 The same word marks the most serious sins
---
## 🐐 It Is Confusion

"Confusion" translates a Hebrew word meaning a mixing up of the created order.

Leviticus uses that same instinct elsewhere against mixing seeds, fabrics, and animal breeding.

Bestiality is placed inside that same category here.

The text frames it as unnatural, not simply forbidden.

🔤 Confusion means a mixing up of creation's order

🌾 Related to other Levitical bans on mixing

📜 Framed as unnatural, not just forbidden

📖 Creation has an order this law protects

# Leviticus 18:24-30
# 🌍 Why Even The Land Reacts
---
## 🌍 Which I Cast Out Before You

"The nations" here means the Canaanite peoples already living in the land Israel is about to enter.

Their practice of everything just listed is named as the reason judgment is coming on them.

This sets up the reason behind Israel's coming conquest of Canaan.

It is framed as a consequence, not conquest for its own sake.

🌍 The nations means the Canaanites in the land

⚖️ Their practices caused this coming judgment

📜 Frames the conquest as consequence

📖 This judgment is not conquest alone
---
## 🤮 The Land Itself Vomiteth Out Her Inhabitants

The land itself is described here as capable of becoming morally polluted.

This is not only about the individual people who sin.

Genesis four describes the ground itself reacting to Abel's blood in the same way.

This image appears three times across this chapter.

Repetition makes the warning hard to miss.

🏜️ The land is described as morally polluted

📖 Genesis four shows the ground reacting to blood

🔁 This image repeats three times in the chapter

➡️ A warning built to be remembered
---
## ⚖️ Neither Any Of Your Own Nation, Nor Any Stranger

This rule explicitly includes any foreign resident living among Israel.

It is not only for native born Israelites.

Chapter seventeen already applied this same rule to the blood laws.

The land's standard does not shift based on someone's nationality.

⚖️ Explicitly includes foreign residents too

🔗 Echoes the same rule from chapter seventeen

🌍 The standard does not shift by nationality

📖 One rule applies to everyone here
---
## 📜 For All These Abominations Have The Men Of The Land Done

This makes clear that everything just listed was not a hypothetical warning.

It describes real practices of the Canaanite peoples currently living in the land.

Israel is about to replace this exact population.

The whole list works as a direct contrast.

📜 Names these as real, current practices

🏜️ Describes who is living there right now

🔄 Israel is about to replace this population

➡️ Do not become what you replace
---
## ⚠️ That The Land Spue Not You Out Also

This is the chapter's sharpest turn.

The exact fate about to fall on the Canaanites is now warned as a real possibility for Israel too.

That warning depends on whether Israel copies these same practices.

Two Kings seventeen and Two Kings twenty five describe this warning actually happening later.

Israel is not automatically exempt just for being God's own people.

⚠️ The same warning now applies to Israel

📖 Two Kings describes this warning coming true

🔄 It depends on whether Israel copies these practices

➡️ Belonging to God is not automatic exemption
---
## ☠️ Cut Off From Among Their People

This "cut off" penalty already appeared in chapter seventeen for the blood laws.

Here it closes this entire list as well.

It means formal exclusion from the covenant community.

Many scholars believe it may also point to an early death understood as coming from God.

☠️ The same cut off penalty from chapter seventeen

⚖️ Means formal exclusion from the community

🏛️ Applies here to this whole list of sins

📖 Closes the list with real, lasting weight
---
## 🔁 That Ye Commit Not Any One Of These Abominable Customs

The chapter closes exactly the way it opened.

"I am the LORD your God" appears again in this very last verse.

That repeated line forms a bookend around the whole chapter.

Family boundaries, moral boundaries, and the land's own reaction all sit inside that same frame.

Every rule in between rests on the same authority named at the start.

🔁 Closes with the same line that opened it

📚 Forms a deliberate bookend around the chapter

⚖️ Every rule rests on the same authority

📖 The whole chapter answers to God's own name
`.trim();

export const LEVITICUS_EIGHTEEN_PERSONAL_SECTIONS = parseLeviticusEighteenRawNotes(LEVITICUS_EIGHTEEN_RAW_NOTES);
