export type HoseaElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaElevenRawNotes(rawText: string): HoseaElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 11:${startVerse}` : `Hosea 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Hosea 11 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_ELEVEN_RAW_NOTES = `# Hosea 11:1-4
# 🍼 When Israel Was A Child
---
## 👶 When Israel Was A Child, Then I Loved Him

This verse looks back to Israel's earliest days as a young nation.

A child here means someone small and unable to care for himself yet.

God says He loved Israel at that stage, long before any obedience was possible.

The love came first, not as a reward for anything already done.

Love that begins before anything is earned cannot later be canceled by failure.

👶 Child means young and still powerless
⏳ The love came before any obedience
🎁 Nothing had been earned yet
📖 Love that starts first cannot be undone

## 🇪🇬 And Called My Son Out Of Egypt

Son here does not mean a literal child born to God.

It means a people God claimed and treated the way a father treats a son.

Calling them out of Egypt points straight to the Exodus, when God rescued them from slavery.

Matthew later quotes this exact line and applies it again to Jesus coming out of Egypt as a child.

One rescue became a pattern pointing all the way to Christ.

🇪🇬 Son here means a claimed people
🏃 This points to the Exodus rescue
📜 Matthew later quotes this same line
📖 One rescue became a pattern for Christ

## 📢 As They Called Them, So They Went From Them

They here first refers to God and the prophets.

They called Israel back again and again.

The second they refers to Israel, moving further away each time.

The same call that should have drawn them closer only measured their distance leaving.

The more God reached out, the more the nation walked the other direction.

🗣️ The first they means God and the prophets
🚶 The second they means Israel moving away
📏 Calling only measured growing distance
📖 Reaching out met walking away

## 🔥 They Sacrificed Unto Baalim, And Burned Incense To Graven Images

Baalim is the plural of Baal, the name used for many local fertility gods across Canaan.

Burning incense was a normal part of worship, meant only for the LORD.

Graven images means statues carved by hand out of wood or stone.

Israel aimed the exact same worship that belonged to God at carved objects instead.

🐂 Baalim means many local Baal gods
🕯️ Incense was meant for God alone
🗿 Graven images means hand carved statues
📖 God's own worship got redirected to idols

## 🚼 I Taught Ephraim Also To Go, Taking Them By Their Arms

Ephraim was the leading tribe of the northern kingdom, and Hosea often uses the name for all of Israel.

To go here means to walk, the way a toddler learns one step at a time.

Taking them by their arms pictures a parent holding a child up so it does not fall.

God is remembered here as patient and hands on, not distant.

👣 Ephraim stands for the whole northern kingdom
🚼 To go means learning to walk
🤲 Taking by the arms means steady support
📖 God was patient and hands on

## 🩹 But They Knew Not That I Healed Them

Healed here covers more than physical sickness, it includes every kind of rescue and restoring care.

Israel received that care again and again without ever tracing it back to its real source.

Knew not does not mean they lacked information, it means they refused to connect the dots.

A gift stops feeling like grace the moment its giver gets forgotten.

🩹 Healed covers rescue, not just sickness
🙈 They never traced the care to God
🧩 Knew not means refusing to connect it
📖 Forgetting the giver drains the gift

## 🪢 I Drew Them With Cords Of A Man, With Bands Of Love

Cords and bands here picture the ropes used to lead a work animal.

Cords of a man means God led them the way a person leads gently, not like cattle.

Bands of love describes the same leading, done through real affection instead of force.

God guided Israel the way you guide someone you love, not the way you drag a burden.

🪢 Cords and bands picture leading ropes
🤝 A man leads gently, not like cattle
❤️ Bands of love means affection, not force
📖 God guided them like someone loved

## 🐂 I Was To Them As They That Take Off The Yoke On Their Jaws

A yoke was a wooden bar laid across an animal's neck to force it to pull a load.

Taking the yoke off meant giving the animal rest after its work was finished.

God pictures Himself here as the one who lifted a heavy burden, not the one who added it.

Relief, not more weight, was the care being described.

🐂 A yoke forced an animal to labor
😌 Removing it gave rest after work
🙌 God lifted burdens instead of adding them
📖 This care gave relief, not more weight

## 🍞 And I Laid Meat Unto Them

Meat in this older English simply means food in general, not just animal flesh.

God pictures Himself personally setting food down in front of them.

This follows naturally after the gentle leading and the rest already described.

Leading, relief, and feeding together paint one picture of patient care, not distant rule.

🍞 Meat means food in general here
🍽️ God set the food down Himself
🔗 This follows the leading and the rest
📖 Together these describe patient care

# Hosea 11:5-7
# ⚔️ The Sword Because Of Their Own Counsels
---
## 🇪🇬 He Shall Not Return Into The Land Of Egypt

Earlier in Hosea, Israel is warned that defeat could send them back toward Egypt.

This verse flips that expectation instead of repeating it.

Egypt is not where this judgment lands, which makes the next line land harder.

The point was never the location, it was losing freedom again either way.

🇪🇬 Egypt was the expected direction of defeat
🔄 This verse flips that expectation
📍 The judgment lands somewhere else instead
📖 Losing freedom was the real issue

## 👑 But The Assyrian Shall Be His King, Because They Refused To Return

Refused to return means Israel would not turn back to the LORD, not that they avoided a trip.

Because they would not come back to God, they ended up under a foreign king instead.

Assyria becomes the replacement ruler for a nation that rejected its true King.

Refusing one kind of return led straight into a very different kind of control.

🔙 Refused to return means refused to repent
👑 Assyria became their replacement ruler
🚫 They rejected their true King first
📖 One refusal led to a new master

## ⚔️ And The Sword Shall Abide On His Cities

Sword here stands for ongoing war and violence, not one single weapon.

Abide means stay and remain, not pass through quickly.

This describes lasting conflict settling over Israel's cities, not a single raid.

A danger that abides is harder to survive than a danger that passes.

⚔️ Sword stands for ongoing violence
🏙️ His cities means Israel's own towns
⏳ Abide means staying, not passing through
📖 Lasting danger outlasts a single raid

## 🌿 Shall Consume His Branches, And Devour Them, Because Of Their Own Counsels

Branches here likely does not mean tree limbs at all.

Many scholars believe it points to the bars that locked a city's gates shut.

If so, this pictures Israel's own defenses being burned away, not just its fields.

Their own counsels names the cause plainly, a result of Israel's own choices, not bad luck.

🌿 Branches likely means gate bars, not limbs
🔥 Their own defenses were burned away
🧠 Their own counsels caused this outcome
📖 This was self inflicted, not bad luck

## 🪵 And My People Are Bent To Backsliding From Me

Bent here describes a fixed lean, the way a branch holds a shape it grew into.

Backsliding means repeatedly drifting away after already knowing the right path.

This is not described as one slip, it is a settled direction.

A habit this fixed does not correct itself without outside help.

🪵 Bent means a fixed, settled lean
🔁 Backsliding means drifting after knowing better
🧭 This was direction, not one slip
📖 A fixed habit needed outside help

## 📢 Though They Called Them To The Most High, None At All Would Exalt Him

The most High is a title for God, naming Him above every other claimed power.

Prophets kept calling Israel back up toward worshipping Him rightly.

None at all would exalt him means the call was met with total refusal.

Being called toward God is not the same as actually turning toward Him.

👆 The most High names God as supreme
🗣️ Prophets kept calling Israel back
🚫 None at all means total refusal
📖 Being called is not the same as turning

# Hosea 11:8-9
# 💔 How Shall I Give Thee Up
---
## 😢 How Shall I Give Thee Up, Ephraim? How Shall I Deliver Thee, Israel?

These are not questions looking for new information.

They are spoken out loud the way a parent agonizes before a hard decision.

Deliver here means hand over to judgment, the opposite of the usual rescue sense of the word.

God is shown wrestling against judgment even as He announces it.

😢 These are agonized, not curious questions
🤲 A parent wrestling before a hard choice
🔄 Deliver here means hand over, not rescue
📖 God is shown wrestling against judgment

## 🏙️ How Shall I Make Thee As Admah? How Shall I Set Thee As Zeboim?

Admah and Zeboim were two cities named back in Genesis.

Both were destroyed along with Sodom and Gomorrah.

Naming them raises the possibility of that same total, final destruction for Israel.

This is the harshest comparison available in Israel's own history and memory.

Even that comparison is raised here only to be set against God's reluctance.

🏙️ Admah and Zeboim were destroyed with Sodom
💥 Naming them raises total destruction as an option
📜 This was the harshest comparison available
📖 Even this option met God's reluctance

## 🔥 Mine Heart Is Turned Within Me, My Repentings Are Kindled Together

Turned here means stirred and overturned, not simply moved a little.

Repentings in this verse means relenting compassion, not confessing sin.

Kindled pictures that compassion catching like a fire, not a quiet feeling.

God's own emotion is described here with the same intensity used for His anger elsewhere.

🔥 Turned means deeply stirred, not slightly
🤍 Repentings here means relenting compassion
🕯️ Kindled pictures compassion catching like fire
📖 This mercy burns as hot as His anger

## 🛑 I Will Not Execute The Fierceness Of Mine Anger, I Will Not Return To Destroy Ephraim

Execute here means carry out in full, not simply feel.

Fierceness names the full strength of the anger being held back.

This answers the agonized questions from the verse before with a clear decision.

The destruction raised by naming Admah and Zeboim is turned aside here.

🛑 Execute means carrying anger out fully
🔥 Fierceness names anger at full strength
❓ This answers the earlier agonized questions
📖 The threatened destruction is turned aside

## ✝️ For I Am God, And Not Man

This line gives the actual reason behind the mercy just described.

A man pushed this far might easily give in to anger and walk away for good.

God names His own nature as the real reason He will not do that.

Mercy here is not a mood, it is rooted in who God is.

✝️ This names the reason for mercy
😠 A man might give in to anger
🙌 God's own nature holds Him back
📖 Mercy is rooted in who God is

## 🏙️ The Holy One In The Midst Of Thee, And I Will Not Enter Into The City

Holy One in the midst names God as present among them despite everything already described.

Entering the city here pictures a final, destroying visit, the same kind brought on Admah and Zeboim.

God chooses not to bring that same visit here.

Presence without that final judgment is itself an act of mercy.

🏙️ Holy One in the midst means God's presence
🚪 Entering the city means a final judgment
🛑 God chose not to bring it here
📖 Presence without that end was mercy

# Hosea 11:10-12
# 🕊️ They Shall Walk After The LORD
---
## 🦁 They Shall Walk After The LORD, He Shall Roar Like A Lion

Earlier in this book, a lion's roar pictured God attacking in judgment.

Here the same image gets used differently, as a call that draws people back instead.

Walking after the LORD describes a changed direction, following instead of fleeing.

The same lion that once meant danger now calls His people home.

🦁 Lion roar once pictured attack
📣 Here it pictures a summoning call
🚶 Walking after means following, not fleeing
📖 The same image now calls them home

## 🌅 Then The Children Shall Tremble From The West

Tremble here does not mean fear of harm.

It describes the same hurried, awestruck response you would have rushing toward urgent good news.

From the west names one direction scattered Israelites would be coming home from.

A call powerful enough to move a scattered people announces its own authority.

🌅 Tremble means awe, not fear of harm
🏃 This pictures a hurried, urgent response
🗺️ West names a direction people return from
📖 The call proved its own authority

## 🕊️ They Shall Tremble As A Bird Out Of Egypt, And As A Dove Out Of The Land Of Assyria

Egypt and Assyria are the same two powers already named earlier in this chapter.

A bird and a dove picture a quick, light return, not a slow, forced march.

This reverses the heavy judgment language used earlier against both of those same nations.

The very places that had threatened Israel become the places they fly home from.

🦅 Egypt and Assyria already named earlier
🕊️ Bird and dove picture a light return
🔄 This reverses the earlier heavy judgment
📖 Threatening places become the way home

## 🏠 And I Will Place Them In Their Houses, Saith The LORD

Place them in their houses pictures settled homes, not tents or borrowed shelter.

This directly answers the exile and scattering described throughout the rest of the chapter.

Saith the LORD marks this as a certain promise, not just a hope.

The chapter that opened with a child being called out of Egypt closes with a people brought home.

🏠 Houses means settled homes, not exile
🔁 This answers the chapter's scattering
✅ Saith the LORD marks it as certain
📖 The chapter ends with a people brought home

## 🌀 Ephraim Compasseth Me About With Lies, And The House Of Israel With Deceit

Compasseth means surrounds completely, the way a wall surrounds a city.

Lies and deceit here point back to problems already named earlier in the chapter.

Those problems were false worship and false political alliances.

The hopeful promise just given did not erase that ongoing problem.

Both truths stand together in this chapter, real mercy and real unfinished rebellion.

🌀 Compasseth means surrounded completely
🤥 Lies and deceit recall earlier false worship
⚖️ The promise did not erase the problem
📖 Mercy and rebellion stand side by side

## ✅ But Judah Yet Ruleth With God, And Is Faithful With The Saints

Judah names the separate southern kingdom, apart from Ephraim and Israel in the north.

The KJV reads this line as straightforward praise for Judah's faithfulness.

Many scholars believe the Hebrew here is genuinely hard to translate.

Some read it instead as a continued accusation against Judah.

Either way, the chapter closes by drawing a line between the two kingdoms.

✅ Judah names the separate southern kingdom
📜 KJV reads this line as praise
❓ Many scholars read the Hebrew differently
➡️ The chapter closes contrasting the two kingdoms
`.trim();

export const HOSEA_ELEVEN_PERSONAL_SECTIONS = parseHoseaElevenRawNotes(HOSEA_ELEVEN_RAW_NOTES);
