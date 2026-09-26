export type JeremiahSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahSixteenRawNotes(rawText: string): JeremiahSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 16:${startVerse}` : `Jeremiah 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Jeremiah 16 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_SIXTEEN_RAW_NOTES = `# Jeremiah 16:1-4
# 🚫 A Sign Against Marriage
---
## 📵 Thou Shalt Not Take Thee A Wife

Prophets sometimes acted out God's message with their own lives.

This command becomes one of those living illustrations.

It is not a personal punishment.

Jeremiah's life becomes a walking picture of the coming disaster.

A wife and children right now would only add more grief.

God spares Jeremiah that specific pain on purpose.

📵 God commands a sign not a punishment

👨 Jeremiah's life becomes a living message

💔 More family would only mean more grief

📖 God spares Jeremiah from that pain

## 😭 They Shall Not Be Lamented Neither Shall They Be Buried

To lament means to cry out in loud public grief.

Burial mattered deeply in this culture.

It normally gave a family real closure.

God says this coming generation gets neither one.

No mourners will gather for them.

No grave will hold them either.

That removes even the ordinary comfort death usually offers.

😭 Lament means loud public grief

⚰️ Burial normally brought a family closure

🚫 This generation gets neither one

📖 Even death's comfort is removed

## 🐄 Dung Upon The Face Of The Earth

This phrase describes bodies left to rot out in the open.

No burial meant no dignity.

Only plain decay was left behind.

Manure looks the same wherever it falls.

Nobody marks the spot or remembers it.

This is the picture God uses for a nation that forgot Him.

🐄 Dung means waste left out in the open

⚰️ No burial means no dignity

🌾 Nobody marks or remembers the spot

📖 This pictures a nation that forgot God

## 🐦 Meat For The Fowls Of Heaven

"Fowls of heaven" is an old way of saying birds.

Unburied bodies become food for scavenging birds and wild animals.

This was one of the worst horrors in this culture.

Proper burial was expected for every single person.

Even the ground here refuses to receive the dead with honor.

🐦 Fowls of heaven means birds

🍖 Bodies become food for scavengers

😱 This was a culture's worst horror

📖 Even the ground denies them honor

# Jeremiah 16:5-9
# 🎉 No Mourning And No Feasting
---
## 🏠 Enter Not Into The House Of Mourning

A house of mourning was where family and neighbors gathered to grieve.

God tells Jeremiah to stay away from every one of these gatherings.

That command would look shocking and cold to onlookers.

Jeremiah's absence itself becomes part of the message.

His own life keeps acting out the coming judgment.

🏠 House of mourning means a grief gathering

🚷 Jeremiah must stay away from all of them

😮 This looks shocking to onlookers

📖 His absence itself preaches the message

## 💗 I Have Taken Away My Peace From This People

"Lovingkindness" describes God's loyal covenant love for His people.

"Mercies" describes His compassion toward those who do not deserve it.

God says He is withdrawing both from this generation.

This is not God changing who He is.

It is God allowing consequences to finally land.

💗 Lovingkindness means loyal covenant love

🤲 Mercies means compassion not deserved

📉 Both are withdrawn from this generation

📖 Consequences are finally allowed to land

## 🔪 Nor Cut Themselves Nor Make Themselves Bald

Mourners in this culture sometimes cut their skin to show grief.

Others shaved patches of their hair for the same reason.

God had already forbidden Israel from copying these pagan mourning customs.

Even that forbidden version of grief gets cancelled here.

No mourning ritual of any kind will be allowed for this generation.

🔪 Cutting the skin was a grief custom

✂️ Shaving the head showed the same grief

🚫 God already banned these pagan customs

📖 Even that ritual is now cancelled

## 🍷 The Cup Of Consolation To Drink

Friends normally brought a shared cup of wine to a grieving family.

Drinking it together was a small act of comfort after a death.

This custom too will disappear from this coming generation.

Even the smallest kindness tied to grief gets stripped away.

🍷 The cup of consolation was a comfort custom

🤝 Friends shared it with grieving families

🚫 This kindness also disappears

📖 Even small comforts are stripped away

## 💍 The Voice Of The Bridegroom And The Bride

Wedding celebrations normally filled towns with music and laughter.

Hearing "the voice of the bridegroom and the bride" was a stock phrase for ordinary daily joy.

God says even that ordinary joy will go silent.

A town with no weddings and no funerals has stopped functioning as a community.

💍 Bridegroom and bride represent wedding joy

🎶 Weddings normally filled towns with music

🔇 Even ordinary joy goes silent

📖 A silent town has stopped living

# Jeremiah 16:10-13
# ❓ Why Has This Happened
---
## ❓ What Is Our Iniquity, Or What Is Our Sin

"Iniquity" means guilt that comes from wrongdoing.

The people ask this question as if they are innocent.

God answers their confusion before they even leave for Babylon.

Their question reveals how far they have drifted from recognizing sin.

❓ Iniquity means guilt from wrongdoing

😕 The people act confused and innocent

🔮 God answers before they even ask

📖 They cannot even recognize their sin

## 🚪 Have Walked After Other Gods

"Forsaken" means to abandon someone completely.

God traces the sin back through the fathers first.

Walking after other gods means giving loyalty to false idols.

This was not one bad generation.

It was a long pattern repeating for years.

🚪 Forsaken means to abandon completely

👴 The pattern started with the fathers

🛐 Other gods means false idols instead of God

📖 One generation's sin repeated for years

## 📉 Ye Have Done Worse Than Your Fathers

God says the current generation is not innocent by comparison.

They took a bad pattern from their fathers and pushed it further.

Blaming a previous generation does not excuse repeating the same sin.

Each generation is still responsible for its own choices.

📉 This generation went further than their fathers

🚫 Blame does not excuse repeating sin

⚖️ Each generation owns its own choices

📖 A bad pattern can always get worse

## 💭 The Imagination Of His Evil Heart

"Imagination" here means the stubborn plans a heart invents on its own.

Each person simply followed whatever felt right to them personally.

Nobody was even listening for God's voice anymore.

A heart left to itself will not find its way back alone.

💭 Imagination means the heart's own stubborn plans

🙉 Nobody was listening for God anymore

🧭 Everyone followed their own direction

📖 A heart alone cannot find its way back

## 🙅 I Will Not Shew You Favour

"Shew favour" is an old way of saying show kindness or mercy.

In exile, the people will not find the comfort they are used to.

This follows years of warnings the people chose to ignore.

The exile itself becomes the lesson they refused to learn at home.

🙅 Shew favour means show kindness or mercy

🏜️ Exile brings no special comfort

📜 This follows years of ignored warnings

📖 Exile teaches what home would not

# Jeremiah 16:14-15
# 🌅 A New Exodus Coming
---
## 🐫 The LORD Liveth That Brought Up The Children Of Israel Out Of Egypt

This phrase was Israel's oldest and most familiar oath formula.

It pointed straight back to the exodus from Egypt.

That rescue was the defining story of their whole history.

Swearing by it was like swearing by their biggest miracle.

🐫 This oath formula recalled the exodus

🇪🇬 Egypt was Israel's defining rescue story

🗣️ People swore by their biggest miracle

📖 It was the oldest oath they knew

## 🧭 Brought Up The Children Of Israel From The Land Of The North

God promises a new oath formula is coming.

The exile itself will become a new exodus story.

Bringing Israel home from the north will outshine the old rescue in memory.

The very disaster in this chapter already carries its own future rescue.

🧭 A new oath formula is promised

🏔️ The north points toward Babylon's direction

🌅 This new rescue will outshine Egypt's

📖 Judgment already carries its own rescue

## 🎁 I Will Bring Them Again Into Their Land

God names the land as a gift.

Israel never actually earned it.

The promise reaches all the way back to Abraham.

Exile is real.

It is not the end of the story.

🎁 The land was always a gift

👴 The promise reaches back to Abraham

⏳ Exile is not the final word

📖 God's promises outlast His judgment

# Jeremiah 16:16-18
# 🎣 Fishers And Hunters
---
## 🎣 I Will Send For Many Fishers

Fishers use large nets to catch many people at once.

This describes invading armies sweeping through entire towns.

Scattering into a crowd will not help anyone hide.

Numbers alone cannot protect this generation now.

🎣 Fishers means large scale capture

🕸️ A net catches many at once

🏙️ This pictures armies sweeping through towns

📖 Numbers alone will not save them

## 🏹 After Will I Send For Many Hunters

Hunters track down individuals one at a time.

This describes soldiers searching every hill and cave.

Nets come first.

Hunters come after.

Either way, nobody stays hidden.

🏹 Hunters means individual pursuit

🏔️ Every hill and cave gets searched

🔁 Nets come first, then hunters after

📖 No hiding place stays hidden

## ⚖️ Recompense Their Iniquity And Their Sin Double

"Recompense" means to pay back in full.

"Double" does not mean an unfair extra punishment invented on the spot.

It reflects how completely they defiled the land with false worship.

The punishment matches the true size of the offense.

⚖️ Recompense means to pay back fully

✖️ Double reflects the size of the sin

🛐 False worship defiled the whole land

📖 The punishment matches the real offense

# Jeremiah 16:19-21
# 🙏 The Nations Will Learn His Name
---
## 🏰 O LORD My Strength And My Fortress

Jeremiah suddenly turns to praise in the middle of judgment.

A fortress and a refuge are places where a person runs for safety.

Jeremiah still trusts God personally here.

Praise and judgment share the very same breath in this verse.

🏰 Fortress means a place of safety

🛡️ Refuge means shelter in trouble

🙏 Jeremiah still trusts God personally

📖 Praise and judgment can share one breath

## 🗿 Our Fathers Have Inherited Lies And Vanity

This verse imagines Gentile nations finally speaking honestly about their own idols.

"Vanity" means something empty and worthless.

They admit their ancestors handed down worthless gods.

Those gods were never the truth.

This is a surprising confession from nations outside Israel.

🗿 Vanity means something empty and worthless

👴 Ancestors handed down false gods

🌍 Gentile nations admit this openly

📖 Even outsiders will see the truth

## 📛 They Shall Know That My Name Is The LORD

"The LORD" translates God's personal covenant name.

It is not just a title.

Judgment here is not the final goal.

Recognition is the real goal instead.

Even the hardest chapters aim at people finally knowing who God is.

📛 The LORD is God's personal name

🎯 Recognition is the real goal

⚠️ Judgment serves that bigger purpose

📖 Even hard chapters aim at knowing God
`.trim();

export const JEREMIAH_SIXTEEN_PERSONAL_SECTIONS = parseJeremiahSixteenRawNotes(JEREMIAH_SIXTEEN_RAW_NOTES);
