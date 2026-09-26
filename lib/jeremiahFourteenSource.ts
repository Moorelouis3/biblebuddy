export type JeremiahFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFourteenRawNotes(rawText: string): JeremiahFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 14:${startVerse}` : `Jeremiah 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 14 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FOURTEEN_RAW_NOTES = `# Jeremiah 14:1-3
# 🏜️ Concerning The Dearth
---
## 🏜️ Concerning The Dearth

"Dearth" means a severe shortage, especially of food or water.

This chapter opens with the whole land trapped inside that shortage.

The message comes to Jeremiah straight from the LORD.

A drought becomes the reason for an entire prophecy.

🏜️ Dearth means a severe shortage
💧 The land is trapped in it
📜 The message comes from the LORD
📖 A drought becomes a prophecy

## 🚪 The Gates Thereof Languish

"Languish" means to grow weak and fail.

City gates were the busiest place in an ancient town.

Trade, court cases, and daily news all passed through them.

Jeremiah says the gates themselves have grown weak.

That means the whole city has gone quiet.

🚪 Gates were a city's busiest place
📉 Languish means to grow weak
🤐 Trade and daily life stall there
📖 A quiet gate means a dying city

## 😢 They Are Black Unto The Ground

This phrase pictures mourners dressed in dark clothing of grief.

Many scholars believe it also describes people bowed low, sitting in the dust.

Sackcloth and ashes were normal signs of sorrow in this culture.

Judah is not just thirsty.

The whole nation is grieving.

😢 Black clothing pictured deep mourning
🙇 Many scholars see people bowed low
🖤 Sackcloth and ashes signaled sorrow
📖 The nation grieves, not just thirsts

## 🏺 They Returned With Their Vessels Empty

"Their little ones" here means servants, not children.

Nobles sent servants to fetch water from public pits.

A pit was a hole dug to catch and store rainwater.

The servants came home ashamed, carrying empty jars.

Covered heads were a public sign of shame.

👤 Little ones means servants here
🕳️ Pits stored rainwater for the town
🏺 Empty vessels meant total failure
📖 Covered heads showed public shame

# Jeremiah 14:4-6
# 🌾 The Ground Is Chapt
---
## 🌾 The Ground Is Chapt

"Chapt" is an old word for cracked open from dryness.

Months without rain left the soil split like old pavement.

Plowmen had no reason to work fields that could not be planted.

Their shame was public.

Everyone could see the land had failed them.

🌾 Chapt means cracked from dryness
🚜 Plowmen had no fields to work
😳 Their shame was public
📖 The land itself had failed them

## 🦌 The Hind Also Calved In The Field And Forsook It

A "hind" is a female deer.

"Calved" means she gave birth to her fawn.

Deer mothers almost never abandon a newborn fawn.

This one walked away because there was no grass left to eat.

The drought broke even the strongest bond in nature.

🦌 Hind means a female deer
🍼 Calved means she gave birth
💔 She abandoned her own fawn
📖 The drought broke nature's strongest bond

## 🐺 They Snuffed Up The Wind Like Dragons

"Dragons" in the King James text does not mean mythical creatures.

It translates an old word for jackals, wild animals of the desert.

"Snuffed up the wind" pictures animals gasping for any scent of water.

Their failing eyes show how close they were to starving.

🐺 Dragons here means jackals
🌬️ Snuffed up the wind means desperate gasping
👁️ Failing eyes showed near starvation
📖 Even wild animals could not survive this

# Jeremiah 14:7-9
# 🙏 Our Backslidings Are Many
---
## 🙏 Our Backslidings Are Many

"Backslidings" means turning away from God again and again after once following him.

The people admit their own sin is the evidence against them.

They still ask God to act, not because they deserve it.

The plea rests on God's name, not their record.

🔙 Backslidings means repeated turning away
⚖️ Their own sin testifies against them
🗣️ They still appeal to God's name
📖 The plea rests on character, not record

## 🌍 As A Stranger In The Land

"The hope of Israel" is a title for God himself.

The people ask why he seems distant, like a stranger passing through.

A "wayfaring man" was a traveler who stopped for one night and moved on.

They fear God's presence will not stay any longer than that.

🌍 Hope of Israel names God himself
🚶 Wayfaring man means a traveler for one night
😟 They fear God will not stay
📖 They want more than a passing visit

## 😧 Leave Us Not

The people call themselves "astonied," an old word for stunned and helpless.

They ask why God seems unable to save, even though he is called mighty.

In the same breath, they admit God is already present among them.

Being named as God's own people is the reason they beg him to stay.

😧 Astonied means stunned and helpless
💪 They still call God mighty
🤝 God is already in their midst
📖 His name for them is their appeal

# Jeremiah 14:10-12
# ⛔ Thus Have They Loved To Wander
---
## ⛔ Thus Have They Loved To Wander

God answers their prayer with a hard diagnosis instead of comfort.

"Loved to wander" means the people chose to stray on purpose, again and again.

They never held back their own feet from that path.

Because of that pattern, God says he will not simply overlook it now.

🚶 Loved to wander means chosen straying
🔁 The pattern repeated again and again
✋ They never held their feet back
📖 God will not overlook the pattern

## 🛑 Pray Not For This People For Their Good

This is not God forbidding all prayer forever.

It is God telling Jeremiah this specific plea will not change the outcome.

The nation's judgment is already decided at this point in the book.

Even Jeremiah, God's own prophet, cannot pray this one away.

🙏 This is not a ban on prayer
🛑 This specific plea will not work
⚖️ Judgment is already decided here
📖 Not even Jeremiah can undo it

## ⚔️ By The Sword And By The Famine And By The Pestilence

God says fasting and burnt offerings will not stop what is coming.

Even acts of worship cannot buy back this moment.

Sword means war.

Famine means starvation from the drought.

Pestilence means deadly, widespread disease.

Three disasters arrive together, leaving no safe direction to turn.

🙏 Fasting will not stop this
🔥 Not even offerings can buy it back
⚔️ Sword, famine, and disease strike together
📖 No safe direction is left

# Jeremiah 14:13-16
# 🗣️ Ye Shall Not See The Sword
---
## 🗣️ Ye Shall Not See The Sword

Jeremiah pushes back and repeats what other prophets have been promising the people.

Those prophets promised assured peace, with no sword and no famine at all.

Jeremiah brings their comforting message straight to God himself.

He is not agreeing with them.

He is reporting what he has heard.

🗣️ Prophets promised peace with no sword
🙅 Jeremiah is not agreeing with them
📨 He reports what he has heard
📖 God will answer that promise directly

## 🚫 The Prophets Prophesy Lies In My Name

God gives a direct answer, these prophets were never sent by him.

"Prophesy lies in my name" means they claimed God's authority without his permission.

A false vision is a message that looks real but was never given by God.

"Divination" here means guessing at the future through forbidden practices.

Their message came from their own hearts, not from heaven.

🚫 God never sent these prophets
👑 They claimed his authority falsely
🔮 Divination means forbidden future guessing
📖 Their message came from their own hearts

## ⚔️ Shall Those Prophets Be Consumed

The false prophets promised safety from sword and famine.

God says the very disasters they denied will destroy them personally.

Their own words become the sentence carried out against them.

A false comfort does not protect the one who spoke it.

🗣️ They promised safety from disaster
⚔️ That same disaster will destroy them
⚖️ Their words become their sentence
📖 False comfort protects no one

## ⚰️ None To Bury Them

Burial mattered deeply in this culture, even for the poorest family.

Leaving a body unburied was seen as a devastating disgrace.

This verse says whole families, wives, sons, and daughters, will die together.

No one will be left alive to bury anyone else.

⚰️ Burial mattered deeply in this culture
😨 Leaving bodies unburied was a disgrace
👨‍👩‍👧 Whole families die together here
📖 No one is left to bury the rest

# Jeremiah 14:17-18
# 😢 Let Mine Eyes Run Down With Tears
---
## 😢 Let Mine Eyes Run Down With Tears

God commands Jeremiah to mourn, not just to preach a warning.

Tears are supposed to fall night and day without stopping.

"The virgin daughter of my people" is a tender title for Jerusalem.

A great breach means a wall broken open, leaving the city defenseless.

😢 Jeremiah is told to mourn openly
⏰ Tears fall night and day here
🏙️ Virgin daughter is a title for Jerusalem
📖 The city stands broken and defenseless

## ⚔️ Behold The Slain With The Sword

Jeremiah imagines stepping outside the city into open country.

Even there, he only finds bodies killed by war.

The danger is not confined to one place.

Every direction leads to the same devastation.

🚶 Jeremiah pictures going into the field
⚔️ He finds only bodies of the slain
🌍 Danger is not limited to one place
📖 Every direction leads to devastation

## 🚶 A Land That They Know Not

Back inside the city, Jeremiah finds people sick and starving instead.

Even the prophet and the priest wander through the ruined streets.

Normally these leaders knew their city and their role in it well.

Now even they wander through something that feels completely foreign to them.

🏙️ The city holds only the starving
🧎 Even prophets and priests wander lost
❓ Their own land feels foreign now
📖 No leader is spared this confusion

# Jeremiah 14:19-22
# 🙌 Hast Thou Utterly Rejected Judah
---
## 🙌 Hast Thou Utterly Rejected Judah

The people finally turn their question directly toward God himself.

"Lothed" is an old word meaning to feel disgust toward something.

They ask if God now feels that same disgust toward Zion.

Their hope for peace and healing has produced nothing but trouble.

❓ They question God directly here
🤢 Lothed means to feel disgust
🏛️ They ask if Zion is rejected
📖 Hoped for peace, found only trouble

## 📿 The Iniquity Of Our Fathers

The people finally admit their own guilt, not just their ancestors' guilt.

"Iniquity" means sin viewed as a debt still owed.

Naming their fathers shows this sin ran back for generations.

Confession, at this point, comes before any request for rescue.

📿 The people confess their own guilt
⚖️ Iniquity means sin as an owed debt
👴 Generations shared in this same sin
📖 Confession comes before any rescue

## 👑 The Throne Of Thy Glory

"Abhor" means to hate or reject completely.

The people beg God not to reject them the way they rejected him.

"The throne of thy glory" pictures God's own rule as something magnificent.

They ask God to remember the covenant instead of breaking it.

🚫 Abhor means to hate completely
👑 God's throne pictures his magnificent rule
🤝 They ask God to remember the covenant
📖 The plea rests on God's own promise

## 🌦️ We Will Wait Upon Thee

"Vanities" here means the false, powerless idols of other nations.

Those idols could never actually cause rain or send a storm.

Only God controls the sky and the water that falls from it.

The chapter that began with drought ends with a choice to trust him.

🌦️ Vanities means powerless, false idols
⛈️ No idol can send real rain
☁️ Only God controls the sky
📖 Drought ends with a choice to trust
`.trim();

export const JEREMIAH_FOURTEEN_PERSONAL_SECTIONS = parseJeremiahFourteenRawNotes(JEREMIAH_FOURTEEN_RAW_NOTES);
