export type EzekielThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtyRawNotes(rawText: string): EzekielThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 30:${startVerse}` : `Ezekiel 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Ezekiel 30 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_RAW_NOTES = `# Ezekiel 30:1-3
# 😭 A Cloudy Day Is Coming For Egypt
---
## 😭 Howl Ye, Woe Worth The Day

Howl means a loud, public cry of grief.

Woe worth the day is an old warning that disaster is coming.

God told Ezekiel to mourn before Egypt had any reason to grieve yet.

A true prophet sometimes feels tomorrow's tragedy before it arrives.

😭 Howl means a loud cry of grief
⚠️ Woe worth the day warns of coming disaster
🗣️ Ezekiel mourned before the tragedy arrived
📖 Prophets sometimes grieve ahead of the judgment

## ⛈️ The Day Of The LORD Is Near, A Cloudy Day

The day of the LORD is a set phrase for a coming time of judgment.

It does not always point to the end of the world.

Here it means the specific day Babylon arrives to destroy Egypt.

A cloudy day pictures a storm blotting out the sun, dark and threatening.

Other prophets used this same day of the LORD language for judgment on other nations.

⛈️ Day of the LORD means coming judgment
🌍 This one points to Babylon's coming attack
☁️ A cloudy day pictures a dark coming storm
📖 Other prophets used this language for other nations

## 🌍 It Shall Be The Time Of The Heathen

Heathen here simply means nations outside Israel, not a slur.

Egypt is about to take its turn under this kind of judgment.

God had already judged Israel's own sin through the fall of Jerusalem.

Now the surrounding nations face their appointed day as well.

🌍 Heathen means nations outside Israel
⏳ Egypt's appointed judgment day has come
⚖️ Israel was already judged for its own sin
📖 No nation escapes its appointed day

# Ezekiel 30:4-6
# ⚔️ Egypt's Allies Fall With Her
---
## ⚔️ The Sword Shall Come Upon Egypt

Sword is Ezekiel's regular picture for judgment carried out through war.

This same picture already fell on Tyre two chapters earlier.

Egypt is about to face the same kind of violent end.

The weapon is literal armies, not a supernatural strike from the sky.

⚔️ Sword pictures judgment through real war
🔁 The same image already fell on Tyre
🌍 Egypt faces that same violent end
📖 The judgment comes through literal armies

## 🌍 Ethiopia, And Libya, And Lydia, And All The Mingled People, And Chub

Ethiopia here means Cush, the kingdom south of Egypt along the Nile.

Libya was the region of tribes west of Egypt along the coast.

Lydia likely points to foreign soldiers hired from Asia Minor as mercenaries.

Chub is a place scholars still cannot identify with confidence.

Mingled people likely means mixed mercenary troops serving in Egypt's own army.

Egypt's whole mercenary alliance falls together with the nation it was paid to defend.

🌍 Ethiopia means Cush, south of Egypt
🏝️ Libya and Lydia were foreign allies and mercenaries
❓ Chub remains an unidentified place today
📖 Egypt's hired allies fall with her

## ⚔️ They Also That Uphold Egypt Shall Fall

Uphold means the allies propping Egypt up from the outside.

Those same allies are named just one verse earlier.

A nation that leans on foreign support can lose that support all at once.

Egypt's whole system of alliances collapses in a single judgment.

🤝 Uphold means the allies propping Egypt up
📉 Those allies fall right alongside her
⚠️ Foreign support can vanish all at once
📖 Egypt's whole alliance system collapses

## 🗼 From The Tower Of Syene Shall They Fall In It By The Sword

Syene was a city at Egypt's far southern border, known today as Aswan.

Naming a city this far south means the judgment reaches Egypt's whole length.

Ezekiel already named this same city one chapter earlier, in Egypt's first judgment oracle.

Nothing about Egypt's geography offers a safe corner to hide in.

🗼 Syene marked Egypt's southern border, modern Aswan
📏 Naming it shows judgment reaches the whole land
🗺️ Egypt has no safe corner left
📖 The whole nation falls, border to border

# Ezekiel 30:7-9
# 🔥 Fire In Egypt, Fear As Far As Ethiopia
---
## 🏜️ Desolate In The Midst Of The Countries That Are Desolate

Egypt's ruin joins a long list of nations Ezekiel had already judged.

Ammon, Moab, Edom, Philistia, and Tyre had each already heard this same sentence.

Being surrounded by other ruined nations means Egypt is not being singled out unfairly.

Judgment on one proud nation after another shows a consistent pattern, not random anger.

🏜️ Egypt joins a long list of judged nations
📜 Ammon, Moab, Edom, and Tyre came first
⚖️ Egypt is not singled out unfairly
📖 This pattern shows consistent justice, not random anger

## 🔥 I Have Set A Fire In Egypt

Fire here means total, sweeping destruction, not one single flame.

It describes the devastation a losing war brings to an entire country.

Egypt's helpers mentioned in the same verse are the allies named earlier in the chapter.

Losing those allies leaves Egypt with nothing left to lean on.

🔥 Fire means total, sweeping destruction
💥 It pictures the devastation of a losing war
🤝 Helpers refers to the allies named earlier
📖 Egypt is left with nothing to lean on

## 🚢 Messengers Go Forth From Me In Ships

Ships were the fastest way to carry urgent news along the Nile and coast.

These messengers are not literal angels, they are the news of Egypt's fall itself.

God describes the speed of the coming disaster as if He sent the warning Himself.

Bad news about a fallen ally traveled fast in the ancient world too.

🚢 Ships carried news fastest in the ancient world
📨 Messengers picture the speed of this news spreading
⚡ God calls the disaster His own warning
📖 Fast news of defeat always reaches distant allies

## 😰 To Make The Careless Ethiopians Afraid

Careless here does not mean reckless, it means feeling safe and secure.

Ethiopia sat far enough south of Egypt to feel untouched by its wars.

Egypt's fall was close enough to reach even a nation that felt distant and safe.

No ally of a falling power stays comfortable for long.

😰 Careless means feeling safe, not reckless
🗺️ Ethiopia felt distant and untouched by Egypt's wars
⚠️ Egypt's fall reached even that safe distance
📖 No ally stays comfortable once the fall begins

# Ezekiel 30:10-12
# 👑 Nebuchadrezzar, The Hand God Chooses
---
## 👑 By The Hand Of Nebuchadrezzar King Of Babylon

Nebuchadrezzar is simply a spelling variant of the more familiar Nebuchadnezzar.

Hand here means the human instrument God chooses to carry out His judgment.

Babylon's king never knew he was serving God's larger purpose.

God regularly uses rulers who have no idea they are fulfilling His plan.

👑 Nebuchadrezzar is a spelling of Nebuchadnezzar
✋ Hand means the instrument carrying out judgment
🙈 Babylon's king never knew he served God's plan
📖 God can use rulers without their knowledge

## ⚔️ He And His People With Him, The Terrible Of The Nations

Terrible here means feared and dreaded, not evil in a vague sense.

Babylon's army had a reputation that struck fear before it even arrived.

This same description was already used for Babylon's army against Tyre.

A nation's reputation can do damage before a single battle starts.

⚔️ Terrible means feared and dreaded
😨 Babylon's reputation struck fear in advance
🔁 The same description already described Babylon against Tyre
📖 Fear itself can be a weapon

## 🏜️ I Will Make The Rivers Dry

The rivers mean the branches and canals of the Nile that Egypt depended on.

A dried river pictures Egypt losing the one resource it could never live without.

War disrupted irrigation and travel long before any modern drought ever could.

Egypt's whole survival in the desert rested on water it did not control.

🏜️ Rivers means the Nile's branches and canals
💧 Egypt depended on that water to survive
⚔️ War disrupted it as badly as drought
📖 Egypt never controlled the resource it lived on

## 💰 Sell The Land Into The Hand Of The Wicked

Selling here means handing the land over completely, as if it were property.

The wicked refers to Babylon, acting as God's chosen instrument of judgment.

Egypt's own land becomes something God hands to someone else entirely.

Even a wicked nation can be the tool God uses for justice.

💰 Selling means handing the land over completely
🏴 Wicked refers to Babylon in this verse
🌍 Egypt's land is handed to someone else
📖 God can use a wicked nation for justice

# Ezekiel 30:13-16
# 🏛️ Every God And City Of Egypt Judged
---
## 🗿 I Will Cause Their Images To Cease Out Of Noph

Noph is the ancient city of Memphis, once Egypt's political and religious capital.

Images here means the many idols Egyptians trusted to protect their land and king.

Destroying those idols proves they never had the power Egypt credited to them.

A false god that cannot save its own city was never a god at all.

🗿 Noph means Memphis, Egypt's old capital
🙏 Images means the idols Egypt trusted
💔 Destroying them proves they had no real power
📖 A god unable to save is no god

## 👑 There Shall Be No More A Prince Of The Land Of Egypt

Prince here means a native Egyptian ruler from Egypt's own royal line.

This judgment removes Egypt's independence, not just one particular king.

History later confirms this, as Egypt fell under Persian, Greek, and Roman rule.

A nation can survive and still permanently lose its own self rule.

👑 Prince means a native Egyptian ruler
🏳️ This removes Egypt's independence, not one king
📜 History later confirms foreign rule over Egypt
📖 A nation can survive yet lose self rule

## 🗺️ I Will Make Pathros Desolate, And Will Set Fire In Zoan

Pathros means Upper Egypt, the southern region along the Nile.

Zoan was a major royal city in the north, also called Tanis.

Naming a southern region and a northern city together covers the whole country.

Egypt has no region left untouched, from one end to the other.

🗺️ Pathros means Upper Egypt in the south
🏙️ Zoan was a royal city in the north
📏 Naming both covers the entire country
📖 No region of Egypt is left untouched

## 🌊 I Will Pour My Fury Upon Sin, The Strength Of Egypt

Sin here is the ancient fortress city of Pelusium, not the English word for wrongdoing.

Pelusium guarded the main road Egypt's enemies used to invade from the east.

Calling it the strength of Egypt points to its military importance, not its size.

God's judgment strikes the exact gate Egypt relied on to keep enemies out.

🌊 Sin names Pelusium, not the word for wrongdoing
🚪 Pelusium guarded Egypt's main eastern invasion route
🛡️ Strength of Egypt points to its military value
📖 Judgment strikes the gate meant to protect her

## 💔 No Shall Be Rent Asunder

No is the city of Thebes, also called No Amon after its god Amon.

Rent asunder means torn completely apart, split open rather than simply damaged.

Thebes had stood as Egypt's great religious center for a very long time.

Even Egypt's oldest and proudest city does not survive this judgment intact.

💔 No means Thebes, home of the god Amon
✂️ Rent asunder means torn completely apart
🏛️ Thebes had stood as Egypt's great religious center
📖 Egypt's oldest city does not survive intact

# Ezekiel 30:17-19
# ⛓️ Young Men Fall, Cities Go Captive
---
## ⚔️ The Young Men Of Aven And Of Pibeseth Shall Fall By The Sword

Aven is another name for On, also called Heliopolis, a city devoted to sun worship.

Pibeseth was Bubastis, a city built around worship of a cat goddess named Bastet.

Young men here means the soldiers of fighting age defending these two cities.

Both cities built their identity around a god that could not protect them.

☀️ Aven means On, a city of sun worship
🐱 Pibeseth means Bubastis, home of a cat goddess
⚔️ Young men means soldiers of fighting age
📖 Neither city's god could protect it

## ⛓️ These Cities Shall Go Into Captivity

This does not just mean the cities were conquered and left standing.

Captivity means their entire populations were marched away from their homes.

A conquered city can rebuild, but an emptied city loses its people completely.

Egypt's judgment goes beyond military defeat into total displacement.

⛓️ Captivity means the people were marched away
🏙️ A conquered city can still rebuild itself
💔 An emptied city loses its people completely
📖 This judgment goes beyond defeat into displacement

## 🌑 At Tehaphnehes Also The Day Shall Be Darkened

Tehaphnehes was a fortified border city in Egypt's northeast, also spelled Tahpanhes.

A darkened day pictures the sudden collapse of what once felt secure and bright.

This echoes the cloudy day already announced at the very start of the chapter.

Even Egypt's guarded frontier cannot keep this darkness out.

🌑 Tehaphnehes was a fortified border city
☀️ Darkened pictures a sudden collapse of security
🔁 This echoes the cloudy day from verse three
📖 No frontier can keep this judgment out

## ⛓️ I Shall Break There The Yokes Of Egypt

A yoke is the wooden frame used to control and direct an animal's labor.

Egypt had used that same kind of control to dominate weaker nations around it.

Breaking Egypt's yoke means Egypt loses its own power to control others.

The oppressor finally loses the very power it once used on someone else.

⛓️ Yoke means the frame used to control labor
🌍 Egypt once used that control over weaker nations
💔 Breaking it means Egypt loses power over others
📖 The oppressor loses the power it once held

# Ezekiel 30:20-22
# 💪 The Arm Of Pharaoh Is Broken
---
## 📅 In The Eleventh Year, In The First Month, In The Seventh Day Of The Month

This date falls about a year after the earlier oracle at the start of this chapter.

The eleventh year is counted from the exile of King Jehoiachin, Ezekiel's usual calendar.

This same eleventh year also marks when Jerusalem itself finally fell to Babylon.

Egypt's and Jerusalem's judgments land in the very same stretch of history.

📅 This date falls a year after verse one
🔢 The eleventh year counts from Jehoiachin's exile
🏙️ Jerusalem itself fell in this same year
📖 Egypt's fall and Jerusalem's fall share one timeline

## 💪 I Have Broken The Arm Of Pharaoh King Of Egypt

Arm here is a picture of strength, the power to fight and to act.

This is written as already done, a real defeat that has already happened.

Many scholars connect this to Pharaoh Hophra's failed attempt to rescue besieged Jerusalem.

Egypt had promised strength it no longer had the power to deliver.

💪 Arm pictures strength and the power to act
✅ This defeat is described as already happened
📜 Scholars link this to Pharaoh Hophra's failed rescue
📖 Egypt promised strength it could no longer deliver

## 🩹 It Shall Not Be Bound Up To Be Healed

Binding up a broken arm with a splint was the normal ancient treatment.

This arm gets no splint, no roller, and no chance to heal at all.

The picture is permanent military weakness, not a temporary setback Egypt can recover from.

Some defeats are written into a nation's future with no road back.

🩹 Binding up meant the normal ancient treatment
🚫 This arm gets no splint and no healing
⚠️ The picture is permanent weakness, not setback
📖 Some defeats leave no road back

## 💥 Will Break His Arms, The Strong, And That Which Was Broken

This verse targets both of Pharaoh's arms, the whole one and the already broken one.

Nothing partial is left standing once God finishes this judgment.

Egypt cannot shift its remaining strength to cover for what it has already lost.

Total judgment leaves no healthy limb to lean on.

💥 Both arms are targeted, whole and broken
🚫 Nothing partial survives this judgment
⚖️ Egypt cannot shift strength to cover its losses
📖 Total judgment leaves nothing to lean on

# Ezekiel 30:23-26
# 🗡️ Egypt Scattered, Babylon's Sword Lifted
---
## 🌍 I Will Scatter The Egyptians Among The Nations

Scattering breaks up a people and spreads them among nations far from home.

It strips away a nation's shared identity by separating the people who carried it.

Egypt had used this same kind of threat against Israel for generations.

Now Egypt faces the very fate it once held over someone else.

🌍 Scattering spreads a people among foreign nations
💔 It strips away a shared national identity
🔁 Egypt once threatened Israel with this same fate
📖 Egypt now faces what it once threatened

## 💪 I Will Strengthen The Arms Of The King Of Babylon

This directly answers the earlier picture of Pharaoh's arm being broken.

God actively empowers Babylon's king, not just permitting his conquest to happen.

One ruler's strength grows in the exact measure another ruler's strength fails.

God's hand moves both sides of this conflict at once.

💪 This answers Pharaoh's broken arm directly
👑 God actively empowers Babylon's king
⚖️ One ruler rises as the other falls
📖 God moves both sides of this conflict

## 😖 He Shall Groan Before Him With The Groanings Of A Deadly Wounded Man

This pictures Pharaoh collapsing the way a mortally wounded soldier collapses on a battlefield.

The groaning is the sound of someone who knows death is close.

It is a graphic, physical image, not a vague or distant description of defeat.

Egypt's proud king ends this chapter sounding like any other dying man.

😖 This pictures a mortally wounded soldier collapsing
🔊 Groaning is the sound of someone near death
💔 The image is physical, not a vague defeat
📖 Egypt's proud king ends like any dying man

## 👀 They Shall Know That I Am The LORD

This exact phrase has now repeated across two full chapters of judgment on Egypt.

It is less a threat and more a promise that God's actions make Him known.

Pharaoh's pride opened chapter twenty nine claiming the Nile for himself alone.

This chapter closes with Egypt forced to recognize the LORD instead.

👀 This phrase repeats across two full chapters
🤝 It promises that God's actions reveal Him
💔 Pharaoh's pride opened this with a false claim
📖 Egypt closes by recognizing the LORD instead`.trim();

export const EZEKIEL_THIRTY_PERSONAL_SECTIONS = parseEzekielThirtyRawNotes(EZEKIEL_THIRTY_RAW_NOTES);
