export type PsalmsSeventySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventySixRawNotes(rawText: string): PsalmsSeventySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+76:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 76 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+76:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+76:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 76 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 76,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 76:${startVerse}` : `Psalms 76:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 76 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_SIX_RAW_NOTES = `# Psalms 76:1-3
# 🏛️ God Known In His Own Land
---
## 🏷️ In Judah Is God Known: His Name Is Great In Israel

This does not mean Israel and Judah were two separate nations here.

Judah and Israel are two names for the same covenant people.

Known means more than simply being aware someone exists.

It means God's presence and power were felt firsthand.

His name being great means his reputation had grown large among the nations.

The psalm opens by stating that as an already settled fact.

🏷️ Judah and Israel are one people
👀 Known means experienced not just aware
📢 A great name means a wide reputation
📖 The psalm opens on a settled fact

## 🏙️ In Salem Also Is His Tabernacle, And His Dwelling Place In Zion

Salem is an older, shorter name for the city later called Jerusalem.

The name appears far earlier in Genesis, tied to King Melchizedek.

Zion refers to the specific hill inside Jerusalem where the temple stood.

Naming both together ties this one place to a very long history.

God's dwelling was not a distant idea to this nation.

It was a real address they could point toward.

🏙️ Salem is an older name for Jerusalem
📜 It appears in Genesis with Melchizedek
⛰️ Zion is the temple hill in the city
📖 God's dwelling had a real address

## 🏹 There Brake He The Arrows Of The Bow, The Shield, And The Sword

Brake is an old form of the word broke.

This pictures God personally snapping the weapons of an entire army.

Bow, shield, and sword were the three basic tools of ancient warfare.

Naming all three together makes the defeat sound total, not partial.

🏹 Brake is an old word for broke
⚔️ God breaks the enemy's weapons himself
🛡️ Bow, shield, and sword cover all warfare
📖 The defeat is described as total

## ⚔️ And The Battle Selah

Battle here does not just mean the weapons already listed.

It means the fight itself, the whole event of war.

God is described as ending the conflict, not merely disarming it.

Selah is a pause marker that appears often through the Psalms.

No one today knows for certain what it meant to the original singers.

It likely told the singers or musicians to stop and let the moment sink in.

⚔️ Battle means the whole conflict not just weapons
🛑 God is pictured ending the fight itself
⏸️ Selah likely paused the singers to reflect
📖 The moment was meant to sink in

# Psalms 76:4-6
# ⛰️ Mightier Than The Mountains
---
## 🏔️ Thou Art More Glorious And Excellent Than The Mountains Of Prey

Mountains of prey means mountains where dangerous predators make their home.

Ancient readers pictured wild beasts prowling those high, rocky places.

Many scholars believe it also pictures rugged strongholds where raiders once hid.

Either picture points to something people already found fearsome and powerful.

God is described as greater and more glorious than even that.

🏔️ Mountains of prey pictures beasts or raiders
😨 It was already something people feared
✨ God is called more glorious than that
📖 His greatness outranks the most fearsome sight

## 💪 The Stouthearted Are Spoiled, They Have Slept Their Sleep

Stouthearted describes people who are proud of their own strength.

Spoiled here means stripped of everything, defeated and plundered.

Sleep here is a gentle word for death.

The psalm uses a soft picture to describe something violent and final.

Even the boldest warriors could not survive this defeat.

💪 Stouthearted means proud of their own strength
🏚️ Spoiled means completely stripped and defeated
😴 Sleep here is a gentle word for death
📖 Even the boldest warriors could not survive

## 🙌 None Of The Men Of Might Have Found Their Hands

This does not mean the soldiers literally lost their hands.

Found their hands is an old idiom for being able to act.

Men of might were the army's strongest, most capable fighters.

Even they could not lift a weapon to defend themselves.

Their strength meant nothing once God stepped in.

🙌 Found their hands means able to act
💥 Men of might were the strongest fighters
🚫 They could not fight back at all
📖 Their strength meant nothing before God

## 🐎 At Thy Rebuke, O God Of Jacob, Both The Chariot And Horse Are Cast Into A Dead Sleep

Rebuke here means a single spoken word of correction.

Chariot and horse were the most advanced military technology of that world.

Cast into a dead sleep means they were stopped instantly, as if paralyzed.

God needed no army and no battle of his own.

One word was enough to disable the strongest force on earth.

🗣️ Rebuke means a single spoken correction
🐎 Chariot and horse were top military technology
😴 Dead sleep means stopped completely, at once
📖 One word disabled the strongest army

# Psalms 76:7-9
# ⚡ Judgment From Heaven
---
## 🔁 Thou, Even Thou, Art To Be Feared

The word thou is repeated on purpose here.

Hebrew poetry often repeats a word for emphasis instead of adding new ones.

To be feared here means to be given reverent, serious respect.

It is not the same as being afraid of a bully.

The repetition makes sure no reader misses who this fear belongs to.

🔁 Thou repeats on purpose for emphasis
📜 Hebrew poems repeat words instead of rhyming
🙇 Feared here means deep, reverent respect
📖 The emphasis leaves no doubt who it means

## ❓ Who May Stand In Thy Sight When Once Thou Art Angry?

This question expects one clear, unspoken answer.

No one can stand before God's anger and remain standing.

The question is not really asking for information.

It is meant to humble the reader before moving on.

❓ The question expects one answer
🚫 No one can stand before that anger
🙇 It is meant to humble the reader
📖 The question does the teaching itself

## 📢 Thou Didst Cause Judgment To Be Heard From Heaven

Judgment heard from heaven means God's verdict was announced publicly.

It was not a quiet, private thought.

Heard here means the whole world could sense it happening.

This was not a secret between God and one person.

⚖️ Judgment from heaven means a public verdict
📢 It was announced, not kept private
🌍 The whole world could sense it
📖 This was not a private moment

## 😨 The Earth Feared, And Was Still

Earth feared pictures the whole world reacting with dread.

Was still describes stunned silence, not calm peace.

Even the ground itself seems to hold its breath.

This is fear at its most complete, not comfort.

😨 Earth feared shows dread not peace
🤫 Still here means stunned not calm
🌎 Even the ground seems to hold still
📖 This is total, not comfortable, fear

## 🧍 When God Arose To Judgment, To Save All The Meek Of The Earth Selah

Arose pictures God standing up to actively step into the situation.

Judgment here is not only punishment.

It is also the act of setting things right.

Meek describes people who are humble and often taken advantage of.

Saving the meek was the whole point of God stepping in.

Selah marks another pause, right where the psalm's turning point lands.

🧍 Arose means God stepped in to act
⚖️ Judgment here also means setting things right
🤲 Meek means humble people who are mistreated
📖 Saving them was the point of it all

# Psalms 76:10-12
# 👑 Every King Brought Low
---
## 😡 Surely The Wrath Of Man Shall Praise Thee

This does not mean human anger is somehow good.

It means rebellion ends up serving God's larger purpose anyway.

An enemy's attack becomes the very stage where God's power is shown.

Man's worst intentions cannot escape God's larger plan.

What was meant for harm ends up pointing back to him.

😡 Human wrath is not being called good
🎭 It becomes the stage for God's power
🚫 Rebellion cannot escape God's larger plan
📖 What was meant for harm points to him

## 🛑 The Remainder Of Wrath Shalt Thou Restrain

Restrain means to hold something back before it goes too far.

Not every bit of human anger ends up serving a purpose.

Whatever is left over, God simply stops.

There is a limit to how far evil is ever allowed to go.

🛑 Restrain means held back on purpose
♾️ Not all wrath serves a purpose
🚧 God stops whatever is left over
📖 Evil only goes as far as God allows

## 🤝 Vow, And Pay Unto The LORD Your God

A vow in the ancient world was a serious promise made to God.

People often vowed an offering during a time of crisis.

Pay here means actually following through once the crisis had passed.

Many people made vows in fear but forgot them once safe.

This command calls for the opposite, a promise that gets kept.

🤝 A vow was a serious promise to God
🙏 People vowed offerings during hard times
💰 Pay means actually following through
📖 The command calls for a kept promise

## 🌍 Let All That Be Round About Him Bring Presents Unto Him That Ought To Be Feared

All that be round about him refers to the nations surrounding Israel.

Presents here means tribute, gifts brought to honor someone powerful.

Bringing tribute to a foreign god was not normal for these nations.

The victory just described was public enough to demand their attention.

Even outsiders are told this God deserves to be feared.

🌍 Round about him means the surrounding nations
🎁 Presents means tribute paid to someone powerful
👀 The victory was public enough to notice
📖 Even outsiders are told to fear him

## ✂️ He Shall Cut Off The Spirit Of Princes

Princes here means rulers and powerful leaders, not royal children.

Spirit in this line means their courage and will to resist.

Cutting it off means breaking that confidence completely.

A ruler who loses that spirit has already lost the fight.

👑 Princes means rulers not royal children
💨 Spirit means courage and will to resist
✂️ Cut off means broken completely
📖 A ruler without it has already lost

## 😨 He Is Terrible To The Kings Of The Earth

Terrible here does not mean bad.

It means causing awe and deep dread, the old sense of the word.

The psalm began by saying God is known in one small nation.

It ends by saying every king on earth answers to him.

What started local reaches all the way to the whole earth.

😨 Terrible means causing awe and dread
🌍 Kings of the earth means every ruler
📈 The psalm grows from local to global
📖 Every king on earth answers to him`.trim();

export const PSALMS_SEVENTY_SIX_PERSONAL_SECTIONS = parsePsalmsSeventySixRawNotes(PSALMS_SEVENTY_SIX_RAW_NOTES);
