export type EzekielThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtyTwoRawNotes(rawText: string): EzekielThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 32:${startVerse}` : `Ezekiel 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Ezekiel 32 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_TWO_RAW_NOTES = `# Ezekiel 32:1-2
# 😮 A Lamentation For Pharaoh
---
## 📅 In The Twelfth Year, In The Twelfth Month, In The First Day Of The Month

This date pins the warning to one exact day, not a vague season.

The twelfth year is still counted from King Jehoiachin's exile, Ezekiel's usual calendar.

Jerusalem itself had already fallen to Babylon more than a year before this.

Egypt now receives its own exact verdict, long after Judah already received its own.

📅 Marks one exact day, not a season
🔢 Still counted from Jehoiachin's exile
🏙️ Jerusalem had already fallen by now
📖 Egypt's verdict comes after Judah's own

## 🦁 Thou Art Like A Young Lion Of The Nations

A young lion pictures a proud power that preys on weaker neighbors.

Egypt had a long history of raiding and dominating smaller kingdoms nearby.

This image names Egypt's violence on land before the next image turns to water.

Pharaoh is being charged with his own strength, not praised for it.

🦁 Young lion pictures proud aggression
🗺️ Egypt preyed on smaller neighbors
⚔️ This image names Egypt's violence
📖 Strength becomes a charge, not praise

## 🐊 Thou Art As A Whale In The Seas

Whale here likely translates a word for a great sea monster or crocodile.

Egypt's own symbol was closely tied to the Nile and its waters.

Thrashing in the rivers and fouling the water pictures Egypt stirring up chaos.

Two images now cover Egypt completely, one for land and one for water.

🐊 Whale likely means a sea monster
🌊 Tied to Egypt's own river
💦 Fouling water pictures stirred up chaos
📖 Land and water together name Egypt

# Ezekiel 32:3-6
# 🕸️ Caught In God's Net
---
## 🕸️ I Will Spread Out My Net Over Thee

A net is a hunter's tool for catching something too strong to fight directly.

A company of many people means Babylon's own army, made of many allied nations.

God names Himself as the one holding the net, not only Babylon's king.

The sea monster from verse two is about to be pulled from its own element.

🕸️ A net catches what force cannot
👥 Many people means Babylon's allied army
🙌 God holds the net, not Babylon
📖 The monster is pulled from its element

## 🏞️ I Will Cast Thee Forth Upon The Open Field

Once caught, the body is left exposed in the open instead of buried.

Fowls of the heaven and beasts of the earth are invited to feed on it.

In this culture, an exposed, unburied body was a mark of total disgrace.

Pharaoh's end is pictured as the opposite of a king's honored burial.

🏞️ The body is left exposed
🦅 Birds and beasts are invited to feed
💔 An exposed body meant total disgrace
📖 This is the opposite of honored burial

## ⛰️ Fill The Valleys With Thy Height

This pictures a corpse so enormous it fills the low places of the land.

No real body reaches this size, the image is deliberate exaggeration.

The point is scale, Egypt's fall is pictured as a landscape sized event.

A small, local death would not carry this much poetic weight.

⛰️ Pictures an impossibly enormous corpse
🎭 The size is deliberate exaggeration
🗺️ Scale makes this a landscape sized fall
📖 A small death needs no such image

## 🩸 I Will Water With Thy Blood The Land

The Nile's water had always meant life and harvest for Egypt.

Here that same water is replaced with blood, flowing all the way to the mountains.

The source of Egypt's life becomes the carrier of Egypt's death instead.

One picture of this chapter is turned completely upside down.

🌊 The Nile once meant life and harvest
🩸 That water is replaced with blood
🔁 Life's source becomes death's carrier
📖 One picture turned completely upside down

# Ezekiel 32:7-10
# 🌑 Darkness Over Egypt
---
## ☁️ I Will Cover The Sun With A Cloud

Darkened skies are a common picture in scripture for a nation's judgment.

The sun, moon, and stars all lose their light together in this verse.

This is not a weather report, it is cosmic language for collapse.

A nation's fall is pictured here as big enough to dim the sky itself.

☁️ Darkened skies picture coming judgment
🌞 Sun, moon, and stars go dark together
🌍 This language is cosmic, not literal
📖 Egypt's fall is pictured as sky sized

## 🌑 I Will Set Darkness Upon Thy Land

Verse seven already said the sky itself would grow dark.

Verse eight repeats the same idea, now naming the land as dark too.

Repetition in Hebrew poetry usually signals a point worth full attention.

Here the darkness spreads from the sky all the way down to the ground.

🔁 Verse eight repeats verse seven's point
📜 Repetition signals a point worth attention
🌑 Darkness spreads from sky to ground
📖 The repeated image is meant to be felt

## 😟 I Will Also Vex The Hearts Of Many People

Vex here means deep trouble, not a mild annoyance.

News of Egypt's fall reaches countries that never knew Egypt directly.

A single nation's collapse can still unsettle people who never met it.

The shock of this judgment ripples far past Egypt's own borders.

😟 Vex means deep trouble, not mild upset
🌍 News reaches nations that never knew Egypt
💥 One fall unsettles distant strangers
📖 The shock ripples past Egypt's borders

## 😨 Their Kings Shall Be Horribly Afraid

These kings are not mourning Egypt, they are afraid for themselves.

Brandish my sword pictures God displaying this judgment to everyone watching.

Every king trembles for his own life, not out of sympathy for Pharaoh.

One fallen throne makes every other throne feel less secure.

😨 Kings fear for themselves, not Egypt
⚔️ Brandish pictures judgment shown to all
👑 Each king trembles for his own life
📖 One fallen throne unsettles every other

# Ezekiel 32:11-13
# ⚔️ The Sword Of Babylon Falls
---
## 🗡️ The Sword Of The King Of Babylon Shall Come Upon Thee

God now names the actual weapon of judgment, Babylon's own army.

Nebuchadnezzar is not named here directly.

Every reader already knew which king this meant.

The same empire that already judged Jerusalem is now sent against Egypt.

God works through a real army and a real king, not only through disaster.

🗡️ Babylon's king is named as the weapon
👑 Every reader knew which king this meant
🏙️ The same empire already judged Jerusalem
📖 God works through a real, named army

## 👑 They Shall Spoil The Pomp Of Egypt

Pomp means Egypt's display of wealth, splendor, and status before the world.

The terrible of the nations repeats the exact phrase already used for Assyria's conquerors.

The same feared army that brought down Assyria is now Egypt's downfall too.

Egypt's grandeur becomes plunder for the very army it may have hoped to outlast.

👑 Pomp means Egypt's wealth and splendor
🔁 Terrible of the nations repeats chapter thirty one
🏛️ The same army that felled Assyria strikes again
📖 Egypt's grandeur becomes someone else's plunder

## 🚫 Neither Shall The Foot Of Man Trouble Them Any More

This describes total emptiness, no people and no herded animals left at all.

Even wild beasts that once lived beside the great waters are destroyed.

A thriving, busy land is pictured turning completely silent and still.

Desolation here means nothing left to disturb the water, not peace.

🚫 Pictures total emptiness, no people left
🐾 Even wild beasts beside the water are gone
🤫 A busy land turns completely silent
📖 This stillness is desolation, not peace

# Ezekiel 32:14-16
# 🌊 Still Waters After The Fall
---
## 💧 I Will Cause Their Rivers To Run Like Oil

Smooth, oil like water is not a picture of calm blessing here.

The water only runs smooth because no one is left to stir it.

Verse thirteen already explained why, every foot that troubled it is gone.

An eerie, empty stillness is being described, not a peaceful rest.

💧 Smooth water here is not a blessing
🤐 It is smooth because no one stirs it
🔁 Verse thirteen already explained the emptiness
📖 This stillness is eerie, not peaceful

## 📚 Then Shall They Know That I Am The LORD

This exact phrase appears again and again throughout the whole book of Ezekiel.

Judgment in this book always carries a purpose beyond punishment alone.

Egypt's desolation is meant to teach a lesson blessing never taught.

Recognition of God's sovereignty, not destruction alone, is the real point here.

🔁 This phrase repeats often through Ezekiel
🎯 Judgment here carries a purpose beyond punishment
📚 A lesson blessing never taught, desolation will
📖 Recognition of God is the real point

## 👩 The Daughters Of The Nations Shall Lament Her

Daughters of the nations likely describes women hired to perform formal mourning songs.

This was a real cultural practice in the ancient Near East.

Egypt's grief becomes a public performance for other nations to watch.

Even Egypt's enemies are drawn into mourning over the scale of this fall.

👩 Daughters of nations means professional mourners
📜 A real custom in the ancient world
🌍 Egypt's grief becomes a public performance
📖 Even outsiders are drawn into mourning

# Ezekiel 32:17-18
# ⚰️ Sent Down To The Pit
---
## 📅 In The Fifteenth Day Of The Month

This is a second, separate message, delivered about two weeks after the first.

Ezekiel's prophecies rarely come as a single speech, they often arrive in connected waves.

This second message pushes the same warning further, down into the grave itself.

The first oracle described Egypt's death, this one describes Egypt's burial.

📅 A second message, about two weeks later
🌊 Ezekiel's warnings often come in waves
⚰️ This one pushes the warning into the grave
📖 First comes death, then comes burial

## 😭 Wail For The Multitude Of Egypt

Ezekiel is commanded to personally perform grief, not just announce a fact.

Multitude keeps the focus on Egypt's whole population, not one king alone.

A prophet weeping over a nation's fall makes the warning harder to ignore.

This grief is meant to be felt before it is explained.

😭 Ezekiel is told to perform real grief
🇪🇬 Multitude keeps focus on the whole nation
🎭 A weeping prophet makes the warning land harder
📖 Grief here comes before explanation

## ⚰️ Cast Them Down Unto The Nether Parts Of The Earth

Nether parts of the earth points to Sheol, the shared realm of the dead.

Daughters of the famous nations names other great nations already resting there.

Egypt is not the first great power to end up in this place.

The chapter is about to introduce the company Egypt will soon join.

⚰️ Nether parts of the earth means Sheol
🏛️ Famous nations are already resting there
🔁 Egypt is not the first power sent down
📖 The chapter now introduces that company

# Ezekiel 32:19-21
# 🪦 Laid With The Uncircumcised
---
## ❓ Whom Dost Thou Pass In Beauty

This question is not a compliment, it is a setup for a hard fall.

Egypt's beauty and pride are about to be measured against the grave itself.

The question expects an answer that no longer matters once death arrives.

Pride in appearance means nothing to the dead Egypt is about to join.

❓ The question sets up a hard fall
👑 Egypt's pride is measured against the grave
🚫 Beauty cannot answer for Egypt here
📖 Pride means nothing once death arrives

## 🤝 She Is Delivered To The Sword

Egypt is pictured here with a feminine pronoun, a common style for nations.

Delivered means handed over, not merely defeated by chance in battle.

Draw her and all her multitudes pictures the whole nation dragged down together.

No part of Egypt escapes this judgment, not the king and not the people.

👩 Nations are often pictured as feminine
🤝 Delivered means handed over, not chance
🇪🇬 Her multitudes means the whole nation
📖 No part of Egypt is left out

## 🗣️ The Strong Among The Mighty Shall Speak To Him

The already dead are pictured speaking from within Sheol itself.

These are warriors who fell long before Egypt's own turn arrived.

Their words are not comfort, they mark Egypt's arrival among the shamed dead.

This same kind of taunting speech from the grave also appears in Isaiah's warning to Babylon.

🗣️ The dead are pictured speaking from Sheol
⚔️ These warriors fell long before Egypt
😏 Their words mark a shameful arrival
📖 Isaiah pictures a similar taunt elsewhere

# Ezekiel 32:22-25
# 👥 Asshur And Elam Already There
---
## 🏛️ Asshur Is There And All Her Company

Asshur means Assyria, already covered in full in the previous chapter.

Her company means the whole army that once marched under Assyria's banner.

Egypt is now walking into a grave Assyria has already occupied for years.

The warning already given about Assyria becomes proof the same fate reaches Egypt.

🏛️ Asshur means Assyria, covered already
⚔️ Her company means Assyria's whole army
⏳ Assyria has occupied this grave for years
📖 Assyria's fate becomes proof for Egypt

## 📜 Which Caused Terror In The Land Of The Living

This exact phrase repeats for nearly every nation named in the rest of the chapter.

It is a refrain, marking each one as once feared, now fallen.

Being feared in life did not spare any of these nations from this grave.

Fear earned in life cannot be spent after death.

🔁 This phrase repeats for each nation
📜 It marks each one as once feared
🚫 Fear in life did not prevent this grave
📖 Fear cannot be spent after death

## 🗺️ There Is Elam And All Her Multitude

Elam was a kingdom east of Babylon, in the region now called Iran.

Like Assyria, Elam had already fallen from power before this point in history.

Naming Elam beside Assyria widens the list of great powers already in this grave.

Egypt is joining a crowded company, not a lonely grave.

🗺️ Elam sat east of Babylon
📉 Elam had already fallen from power
📋 Naming Elam widens the list of fallen powers
📖 Egypt joins a crowded grave

## 😔 Yet Have They Borne Their Shame With Them That Go Down To The Pit

Being feared once did not erase the shame these nations carry now.

Borne their shame means they carried that disgrace down into the grave with them.

Power and fear during life do not buy honor after death.

The pit holds reputation as firmly as it holds the body.

😔 Fear in life did not erase shame
⬇️ Shame was carried down into the grave
🚫 Power in life bought no honor after
📖 The pit holds reputation like the body

# Ezekiel 32:26-28
# 🗡️ Meshech, Tubal, And Egypt's Turn
---
## 🗺️ There Is Meshech, Tubal, And All Her Multitude

Meshech and Tubal were peoples from the region near modern day Turkey.

The same two names appear again later in Ezekiel's prophecy against Gog.

Their presence here shows this grave was never only for Egypt's nearby neighbors.

Nations from every direction eventually end up in this same place.

🗺️ Meshech and Tubal came from Turkey
🔁 Same names appear in Gog's chapters
🧭 This grave reaches nations from every direction
📖 No region is exempt from this ending

## 🗡️ They Have Laid Their Swords Under Their Heads

Ancient warriors were sometimes buried with their own sword placed beneath their head.

That custom marked a fallen soldier as honored in death, not disgraced.

Even so, the next line says their guilt still rests upon their bones.

A warrior's honor could not cancel out a nation's recorded guilt.

🗡️ A sword under the head marked honor
🪦 This custom honored a fallen soldier
⚖️ Guilt still rested on their bones
📖 Honor in death could not cancel guilt

## 🇪🇬 Thou Shalt Be Broken In The Midst Of The Uncircumcised

The chapter turns from Meshech and Tubal back to speaking directly to Egypt.

Thou here is Pharaoh himself, addressed personally one more time.

Egypt is told plainly it will join the very company just described.

This is the moment the warning stops being about others and lands on Egypt.

🇪🇬 The address turns back to Egypt
👑 Thou here means Pharaoh himself
🤝 Egypt will join the company just named
📖 The warning now lands fully on Egypt

# Ezekiel 32:29-30
# 🏰 Edom And The Princes Of The North
---
## 👑 There Is Edom, Her Kings, And All Her Princes

Edom was a smaller neighboring kingdom descended from Esau, Jacob's brother.

Even Edom's kings and princes, not only common soldiers, are named here.

With their might are laid means even real strength did not change this outcome.

Size of a nation never decided who ended up in this grave.

👑 Edom descended from Esau, Jacob's brother
🏛️ Even Edom's kings and princes are named
💪 Real strength did not change this outcome
📖 A nation's size never decided this ending

## 🧭 The Princes Of The North, And All The Zidonians

Princes of the north likely points to rulers from the Syrian region near Israel.

The Zidonians were the people of Sidon, already judged earlier in Ezekiel chapter twenty eight.

Naming Sidon again here confirms that earlier warning truly came to pass.

By now the list has covered nearly every major power surrounding Egypt.

🧭 Princes of the north likely means Syrian rulers
🏙️ Zidonians were the people of Sidon
🔁 Chapter twenty eight already warned Sidon
📖 Nearly every neighboring power appears here

# Ezekiel 32:31-32
# 😌 Pharaoh Finds Company In The Pit
---
## 😌 Pharaoh Shall See Them, And Shall Be Comforted

This strange comfort already appeared once before, describing Assyria in chapter thirty one.

Seeing so many other great nations already fallen makes Pharaoh feel less alone.

That feeling is not healing, it is only company inside shared ruin.

Comfort found in a grave is still a grave.

😌 This same strange comfort covered Assyria
🤝 Shared ruin makes Pharaoh feel less alone
💔 This comfort heals nothing real
📖 Comfort in a grave is still a grave

## 🙌 For I Have Caused My Terror In The Land Of The Living

God names Himself directly as the true source behind every fear in this chapter.

Babylon's army was only the visible hand carrying out this judgment.

Every king's fear, every nation's fall, traces back to this one claim.

The chapter closes by making its real author unmistakably clear.

🙌 God names Himself as the true source
⚔️ Babylon was only the visible hand
🔗 Every fear traces back to this claim
📖 The chapter closes naming its real author`.trim();

export const EZEKIEL_THIRTY_TWO_PERSONAL_SECTIONS = parseEzekielThirtyTwoRawNotes(EZEKIEL_THIRTY_TWO_RAW_NOTES);
