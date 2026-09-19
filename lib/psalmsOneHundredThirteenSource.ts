export type PsalmsOneHundredThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirteenRawNotes(rawText: string): PsalmsOneHundredThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+113:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 113 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+113:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+113:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 113 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 113,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 113:${startVerse}` : `Psalms 113:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 113 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTEEN_RAW_NOTES = `# Psalms 113:1-3
# 🙌 Praise Ye The LORD
---
## 🙌 Praise Ye The LORD

"Praise ye the LORD" is the English translation of the Hebrew word Hallelujah.

This exact call to praise opens six psalms in a row.

Psalm 113 through Psalm 118 are grouped together as the Egyptian Hallel.

Jewish families still sing these six psalms every year at Passover.

Jesus himself likely sang these same words the night before he died.

🙌 Praise ye the LORD means Hallelujah

📜 Opens six psalms called the Hallel

🍷 Sung by Jewish families at Passover

📖 Jesus likely sang these same words

## 🙋 O Ye Servants Of The LORD

"Servants of the LORD" does not mean only the priests and Levites.

It includes every single person who worships and obeys God.

In ancient Israel only certain tribes could serve inside the temple itself.

This psalm opens the temple's calling to everyone who trusts God.

Praise here has no VIP section reserved for religious professionals.

🙋 Servants means all who follow God

🚫 Not limited to priests or Levites

🏛️ Only certain tribes served in the temple

📖 Every believer is invited to praise

## 📛 Praise The Name Of The LORD

"The name of the LORD" means far more than a title or a label.

In the Bible a name carries someone's whole character and reputation.

To praise God's name is to praise everything he actually is.

This phrase already appears twice within this single verse alone.

The repetition itself is a form of emphasis in Hebrew poetry.

📛 Name means someone's whole character

🙏 Praising the name means praising God himself

🔁 The phrase repeats twice in one verse

📖 Repetition is how Hebrew poetry emphasizes

## 🙏 Blessed Be The Name Of The LORD

"Blessed be" means calling something worthy of honor and thanks.

Verse one commanded people to speak praise out loud.

This verse now declares that praise a permanent, settled fact.

God's name does not need people's praise to already be worthy.

🙌 Blessed be means worthy of honor

🗣️ Verse one commanded people to praise

✅ This verse declares praise a settled fact

📖 God is worthy even before anyone praises him

## ⏳ From This Time Forth And For Evermore

This phrase covers all future time, with no end point at all.

The psalm has already praised God in the present moment.

Now it stretches that same praise across every moment still to come.

The call to praise in this psalm never actually expires.

⏳ Covers all future time with no end

⏰ Adds to praise already given

➡️ Stretches praise across every future moment

📖 This call to praise never expires

## 🌅 From The Rising Of The Sun Unto The Going Down Of The Same

This phrase pictures the sun rising in the east and setting in the west.

Naming both directions together was a common way to mean everywhere.

The same kind of pairing appears when the Bible says heaven and earth.

Here it means praise belongs in every place the sun ever shines.

These first three verses all land on that exact same idea, praise.

🌅 Rising sun pictures the east

🌇 Going down pictures the west

🌍 Naming both directions means everywhere

📖 These first three verses all end on praise

# Psalms 113:4-6
# 👑 Who Is Like Unto The LORD Our God
---
## 🌍 The LORD Is High Above All Nations

"Nations" here means every people group on earth, not only Israel.

Many ancient peoples believed each nation had its own separate god.

This verse rejects that idea directly and completely.

The LORD rules over every nation, whether they worship him or not.

🌍 Nations means every people on earth

🚫 Not just the god of Israel

⚡ Rejects the idea of separate gods

📖 The LORD rules every nation on earth

## ☁️ His Glory Above The Heavens

"The heavens" meant the sky itself to an ancient reader.

The sky was the highest, most untouchable thing a person could see.

This verse says God's glory reaches even higher than that.

Nothing visible in creation can measure how great God actually is.

☁️ Heavens meant the visible sky

🏔️ The sky was the highest known point

✨ God's glory reaches higher still

📖 Creation cannot measure God's greatness

## ❓ Who Is Like Unto The LORD Our God

This question expects one answer, that no one compares to God.

Rhetorical questions like this appear often throughout the Psalms.

The question is not really a question.

It works instead as a flat statement.

Naming the comparison out loud makes the point land harder.

❓ This question expects one answer, no one

📜 Rhetorical questions appear often in Psalms

🎭 A statement disguised as a question

📖 No one anywhere compares to God

## 👑 Who Dwelleth On High

"Dwelleth" is an old word that simply means lives or resides.

"On high" points to God's throne, far above the created world.

This picture already appeared one line earlier as glory above the heavens.

God's position above everything is the reason the next line is so surprising.

🏠 Dwelleth means lives or resides

👑 On high pictures God's throne

🔁 Repeats the idea of glory above

➡️ Sets up a surprising next verse

## ⬇️ Who Humbleth Himself To Behold

"Humbleth" means to lower or stoop down from a higher position.

God is so high that even looking down counts as an act of humility.

"Behold" simply means to look at or pay attention to something.

A human king would never think of looking down as humbling.

For God, noticing anything below him is already an act of grace.

⬇️ Humbleth means stooping down

👀 Behold means to look closely

👑 Even looking down humbles God

📖 Noticing us is already an act of grace

## 🌌 The Things That Are In Heaven And In The Earth

Naming heaven and earth together means absolutely everything that exists.

Nothing is too small or too far away for God to notice.

This includes the very next thing this psalm describes, the poor and the needy.

The God who stoops to look at heaven also stoops to look at the poor.

🌌 Heaven and earth means everything

🔍 Nothing is too small to notice

👇 Sets up the poor and needy next

📖 The high God stoops for the low

# Psalms 113:7-9
# ⬆️ He Raiseth Up The Poor Out Of The Dust
---
## 🌑 He Raiseth Up The Poor Out Of The Dust

"Dust" pictures someone brought as low as a person can go.

Genesis says human bodies return to dust after death.

This image pictures poverty so deep it looks like being buried alive.

God is described reaching down into that lowest possible place.

🌑 Dust pictures the lowest place

⚰️ Connects to returning to dust in death

😔 Pictures poverty as deep as burial

📖 God reaches into the lowest place

## 🗑️ Lifteth The Needy Out Of The Dunghill

A "dunghill" was a pile of ash and waste outside a town.

Beggars with nowhere else to go often sat there for shelter.

This exact same picture appears in Hannah's prayer in First Samuel.

The lowest, most overlooked place in a town is exactly where God looks.

🗑️ Dunghill means a pile of ash and waste

🙇 Where beggars sat with nowhere else to go

📜 Matches Hannah's prayer in First Samuel

📖 God looks at the most overlooked place

## 🔄 That He May Set Him With Princes

This verse pictures the biggest possible reversal in social standing.

The same person moves from a trash heap to a palace.

Nothing in between is described, only the two extremes.

God specializes in reversals this complete.

🔄 Pictures a complete reversal

🗑️ From the trash heap

👑 To sitting among princes

📖 God specializes in total reversals

## 🎩 The Princes Of His People

"His people" refers to Israel, the nation God chose for himself.

"Princes" here means the tribal leaders and nobles who ruled and advised.

This was the highest circle of human power in that society.

The poorest person in Israel could end up seated among its leaders.

🇮🇱 His people means the nation Israel

🎩 Princes means tribal leaders and nobles

🏛️ The highest circle of human power

📖 The poorest could sit among leaders

## 🏡 He Maketh The Barren Woman To Keep House

"Barren" means unable to have children.

In ancient Israel this was treated as a source of deep shame.

A woman's worth was often wrongly measured by having children.

"Keep house" means running a household of her own with a family inside it.

Sarah, Rachel, and Hannah all lived this exact reversal themselves.

🚫 Barren means unable to have children

😔 Treated as a source of deep shame

🏡 Keep house means running her own household

📖 Sarah, Rachel, and Hannah lived this reversal

## 😊 A Joyful Mother Of Children

The same reversal from shame now ends in visible, shared joy.

A woman once overlooked now has a home full of laughter.

The psalm closes by repeating the exact words that opened it.

The whole song ends exactly where it began, calling everyone to praise.

😊 Shame turns into visible, shared joy

🏡 A home now full of laughter

🔁 Closes by repeating its opening words

📖 The song ends exactly where it began
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTEEN_PERSONAL_SECTIONS = parsePsalmsOneHundredThirteenRawNotes(
  PSALMS_ONE_HUNDRED_THIRTEEN_RAW_NOTES
);
