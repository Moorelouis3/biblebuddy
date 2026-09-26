export type JeremiahNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahNineteenRawNotes(rawText: string): JeremiahNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 19:${startVerse}` : `Jeremiah 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 19 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_NINETEEN_RAW_NOTES = `# Jeremiah 19:1-3
# 🏺 Get The Potter's Bottle
---
## 🏺 Go And Get A Potter's Earthen Bottle

Earthen bottle means a jar already baked hard in a kiln.

Chapter eighteen showed Jeremiah watching soft wet clay on a wheel.

That clay could still be pressed into something new.

This jar cannot be reshaped once it is broken.

The change in material sets up a harsher warning than before.

🏺 Earthen bottle means clay already baked hard

🔄 Chapter eighteen used soft reshapable clay instead

💥 This jar can only break, not bend

📖 The warning has grown harsher than before

## 👴 Take Of The Ancients Of The People, And Of The Ancients Of The Priests

Ancients here means elders, the recognized leaders of a group.

Jeremiah brings both civic and religious leaders as witnesses.

Their presence made this message official, not a private complaint.

Everyone with authority in Jerusalem would hear this warning firsthand.

👴 Ancients means elders, recognized community leaders

🤝 Jeremiah brings civic and religious leaders together

📣 Their presence made the warning official

📖 Every authority in Jerusalem heard it firsthand

## 🏞️ The Valley Of The Son Of Hinnom

This valley sat just outside Jerusalem's walls to the south.

It later became infamous as the site of child sacrifice.

Centuries later, its name became the New Testament word for hell, Gehenna.

Jeremiah delivers this warning at the very place it describes.

🏞️ Hinnom was a valley outside Jerusalem

🔥 It became the site of child sacrifice

👹 Its name later became Gehenna, meaning hell

📖 The warning is spoken where the sin happened

## 🚪 The Entry Of The East Gate

The east gate opened toward the valley Jeremiah is heading to.

Some translations call this same gate the Potsherd Gate.

Broken pottery from the city's potters was likely dumped near it.

That detail fits perfectly with the broken bottle still to come.

🚪 The east gate faced the valley below

🏺 Some translations call it the Potsherd Gate

🗑️ Broken pottery was likely dumped nearby

📖 That detail matches the broken bottle ahead

## 👑 O Kings Of Judah, And Inhabitants Of Jerusalem

This message widens far past the leaders gathered at the valley.

Kings of Judah likely refers to the ruling king and his household.

Inhabitants of Jerusalem includes every resident of the city.

No one in the city is exempt from hearing this warning.

👑 Kings of Judah means the ruling household

🏙️ Inhabitants of Jerusalem means every resident

📢 The warning reaches far beyond the valley

📖 No one in the city is exempt

## 👂 His Ears Shall Tingle

This is a KJV idiom for news so shocking it leaves a physical sting.

The same phrase appears elsewhere in Samuel and Kings for disaster announcements.

It signals that what follows is not ordinary bad news.

This coming judgment will be almost too horrible to hear.

👂 Ears shall tingle pictures a physical sting

📚 The same phrase marks disaster news elsewhere

⚠️ It signals something worse than usual

📖 This judgment will be unbearable to hear

# Jeremiah 19:4-6
# 💀 Filled With The Blood Of Innocents
---
## 💔 Forsaken Me, And Have Estranged This Place

Estranged means treated as if it belonged to someone else.

Judah is God's own land, given and set apart for His worship.

By worshiping other gods there, the people treated it like foreign ground.

The betrayal was not just spiritual, it changed how the land itself was used.

💔 Forsaken means abandoned completely

🌍 Estranged means treated as foreign ground

🏡 Judah was set apart for God's worship

📖 The betrayal changed how the land was used

## 🕯️ Burned Incense In It Unto Other Gods

Burning incense was a normal act of worship in the ancient world.

The rising smoke pictured prayers or devotion going up to a god.

Doing this for other gods was a direct act of allegiance to them.

It broke the first and greatest command given to Israel.

🕯️ Burning incense pictured devotion rising upward

🙏 It was a normal act of worship

⚔️ Doing it for idols meant allegiance to them

📖 It broke God's first and greatest command

## 🩸 Filled This Place With The Blood Of Innocents

This names real, literal deaths, not a figure of speech.

Innocents likely refers to the children about to be described in verse five.

The land itself is described as stained by their deaths.

This charge sets up the specific horror named next.

🩸 Blood of innocents names real deaths

👶 Innocents points ahead to verse five

🗺️ The land itself is described as stained

📖 This charge sets up the horror named next

## ⛰️ The High Places Of Baal

High places were elevated outdoor shrines used for pagan worship.

Hilltops felt closer to the gods in the thinking of that era.

Baal was the chief storm and fertility god of Canaan.

Israel had been repeatedly warned to tear these shrines down.

⛰️ High places were elevated outdoor shrines

🌩️ Baal was Canaan's chief storm god

🙅 Israel was warned to destroy these shrines

📖 They never fully obeyed that warning

## 🔥 To Burn Their Sons With Fire For Burnt Offerings Unto Baal

This describes child sacrifice, the single worst sin named in this chapter.

Parents burned their own children alive as offerings to Baal.

This practice likely also connects to the god Molech in other passages.

The horror of this act explains the severity of the judgment coming.

🔥 This describes literal child sacrifice

👶 Parents burned their own children as offerings

😱 It likely connects to the god Molech

📖 This horror explains the judgment coming

## 🚫 Which I Commanded Not, Nor Spake It, Neither Came It Into My Mind

God directly denies ever wanting or approving child sacrifice.

Pagan religions often assumed their gods demanded this kind of offering.

The true God says this idea never entered His mind at all.

This line corrects a wrong assumption about what God actually wants.

🚫 God denies commanding this act

❓ Pagan gods were assumed to demand it

🧠 God says it never entered His mind

📖 This corrects a wrong assumption about God

## 🥁 But The Valley Of Slaughter

Tophet was the specific site of child sacrifice within this valley.

Some historians believe the name relates to a word for drum.

Drums may have been beaten to drown out the children's cries.

God now renames the site with a much darker future in mind.

🥁 Tophet may relate to a word for drum

😢 Drums may have drowned out children's cries

🏚️ God renames the site for what comes next

📖 Sacrifice gives way to slaughter

# Jeremiah 19:7-9
# ⚔️ Make Void The Counsel Of Judah
---
## 🧠 I Will Make Void The Counsel Of Judah And Jerusalem

Counsel here means the political and military plans of the nation.

Void means emptied out, left with no effect at all.

Every strategy Judah's leaders were relying on will fail to save them.

Their own planning cannot rescue them from this coming judgment.

🧠 Counsel means the nation's plans and strategy

🕳️ Void means emptied of all effect

📉 Every strategy will fail to save them

📖 Human planning cannot stop this judgment

## ⚔️ Cause Them To Fall By The Sword Before Their Enemies

This is a direct prophecy of military defeat.

Judah will lose a coming battle to an invading army.

The people who trusted false gods for protection will find no protection at all.

This defeat fulfills the warning God gave back in chapter eighteen.

⚔️ This predicts a coming military defeat

🏳️ Judah will lose to an invading army

🛡️ False gods will offer no protection

📖 This fulfills the warning from chapter eighteen

## ⚰️ Their Carcases Will I Give To Be Meat For The Fowls Of The Heaven

Proper burial mattered enormously in the ancient world.

Leaving a body unburied for animals to eat was seen as a curse.

This punishment strips away even the dignity of a decent burial.

It shows how complete this coming judgment will be.

⚰️ Burial mattered greatly in the ancient world

🦅 Leaving bodies unburied was seen as a curse

😔 This strips away the dignity of burial

📖 It shows how complete the judgment will be

## 🏚️ Desolate, And An Hissing

Desolate means left empty and ruined.

Hissing pictures the shocked reaction of anyone passing by.

Travelers would gasp and hiss at the sight of the ruined city.

A once proud capital becomes a warning to everyone who sees it.

🏚️ Desolate means left empty and ruined

😮 Hissing pictures a shocked reaction

🚶 Travelers would gasp at the ruined city

📖 It becomes a warning to everyone

## 😨 Eat The Flesh Of Their Sons And The Flesh Of Their Daughters

This describes cannibalism during the coming siege of Jerusalem.

Sieges could last so long that food supplies ran out completely.

The people once burned their sons to Baal by choice.

Now the siege will force an even worse horror on them.

😨 This describes cannibalism during a siege

⏳ Long sieges could exhaust all food supplies

🔥 They once burned sons to Baal by choice

📖 Now the siege forces an even worse horror

## 🔒 In The Siege And Straitness

Straitness means extreme distress caused by being trapped with no way out.

A siege surrounds a city and cuts off its supplies from the outside.

Straitness names the desperate condition that a long siege eventually creates.

Both words together describe a slow, crushing disaster, not a quick one.

🔒 Straitness means extreme distress from being trapped

🏰 A siege cuts off a city's supplies

😖 It describes a desperate, worsening condition

📖 The disaster is slow, not sudden

# Jeremiah 19:10-13
# 🏺 Break The Bottle
---
## 🏺 Break The Bottle In The Sight Of The Men That Go With Thee

Jeremiah must act out this judgment, not just speak it.

Breaking the jar in public makes the warning impossible to ignore.

The elders and priests from verse one are watching this happen.

A dramatic, physical sign often carried more weight than words alone.

🏺 Jeremiah acts out the judgment publicly

👀 The elders and priests witness it happen

💥 The broken jar makes the warning unmistakable

📖 A visible sign carried real weight

## 🔄 As One Breaketh A Potter's Vessel, That Cannot Be Made Whole Again

This line directly reverses the picture from chapter eighteen.

There, wet clay could always be reshaped into something new.

Here, a fired jar shatters and cannot be put back together.

Judah has crossed into judgment that will no longer bend to mercy.

🔄 This reverses the picture from chapter eighteen

🏺 Wet clay could always be reshaped

💔 A fired jar shatters and stays broken

📖 Judah has crossed past the point of bending

## ⚰️ They Shall Bury Them In Tophet, Till There Be No Place To Bury

Tophet, the site of child sacrifice, becomes a mass burial ground.

So many will die that the valley itself runs out of room.

A place once used for killing children becomes filled with adult graves instead.

This detail shows the sheer scale of the coming disaster.

⚰️ Tophet becomes a mass burial ground

📏 The valley runs completely out of room

🔁 A place for killing children fills with graves

📖 This shows the scale of the disaster

## 🏙️ Make This City As Tophet

The judgment is no longer limited to one valley outside the walls.

Jerusalem itself will share the same defiled reputation as Tophet.

What was true of the place of child sacrifice becomes true of the whole city.

No part of Jerusalem will escape the coming disgrace.

🏙️ The judgment spreads beyond one valley

🔗 Jerusalem will share Tophet's defiled reputation

🌆 The whole city becomes as defiled as Tophet

📖 No part of the city escapes this disgrace

## 🏠 Because Of All The Houses Upon Whose Roofs They Have Burned Incense Unto All The Host Of Heaven

Flat rooftops in Jerusalem were common everyday living space.

Host of heaven refers to the sun, moon, and stars worshiped as gods.

Families carried this false worship right onto the roof of their own homes.

Idolatry had moved from public shrines into private, everyday life.

🏠 Flat rooftops were common living space

⭐ Host of heaven means sun, moon, and stars

🙏 Families worshiped these gods on their roofs

📖 Idolatry had spread into everyday private life

## 🍷 Poured Out Drink Offerings Unto Other Gods

A drink offering meant pouring out wine or liquid as an act of worship.

This ritual was normally meant only for the LORD.

Pouring it out to other gods was a direct act of betrayal.

Ordinary household routines had quietly become acts of idolatry.

🍷 Drink offerings meant pouring out wine in worship

✝️ This ritual belonged only to the LORD

💔 Doing it for idols was direct betrayal

📖 Ordinary routines had become quiet idolatry

# Jeremiah 19:14-15
# 📢 Jeremiah Proclaims It In The Temple Court
---
## 🚶 Then Came Jeremiah From Tophet

Jeremiah does exactly what God commanded, without hesitation.

He walks from the valley of judgment straight back into the city.

This obedience proves he is a true prophet, not a false one.

His actions matched his words at every step.

🚶 Jeremiah obeys exactly what God commanded

🏙️ He walks straight from Tophet into the city

✅ His obedience proves he is a true prophet

📖 His actions matched his words completely

## 🏛️ He Stood In The Court Of The LORD's House

The temple court was the most public religious space in Jerusalem.

Crowds gathered there daily for prayer and sacrifice.

Jeremiah moves from a private valley to the most public stage available.

Everyone in Jerusalem could now hear the same warning firsthand.

🏛️ The temple court was Jerusalem's most public space

👥 Crowds gathered there daily for worship

📣 Jeremiah moves to the widest stage available

📖 Everyone could now hear the warning firsthand

## 🐂 Because They Have Hardened Their Necks, That They Might Not Hear My Words

Hardened their necks pictures an ox that refuses to bend under its yoke.

The image describes stubborn, deliberate resistance, not simple confusion.

This same phrase is used elsewhere in the Old Testament for Israel's rebellion.

Their refusal to listen, not ignorance, brings this judgment on them.

🐂 Hardened necks pictures an ox refusing its yoke

😤 It describes deliberate resistance, not confusion

📜 The same phrase describes Israel's rebellion elsewhere

📖 Their refusal to listen brings this judgment
`.trim();

export const JEREMIAH_NINETEEN_PERSONAL_SECTIONS = parseJeremiahNineteenRawNotes(JEREMIAH_NINETEEN_RAW_NOTES);
