export type EzekielThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtyFiveRawNotes(rawText: string): EzekielThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 35:${startVerse}` : `Ezekiel 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Ezekiel 35 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_FIVE_RAW_NOTES = `# Ezekiel 35:1-4
# 🗻 Judgment Is Announced On Mount Seir
---
## 🗻 Set Thy Face Against Mount Seir

Mount Seir was the mountain range that was home to Edom.

Edom descended from Esau, the brother of Jacob.

Setting his face toward a place was a prophetic gesture of focused judgment.

God had already used this same command against other nations earlier in Ezekiel.

This time the target is Israel's own relative, not a foreign empire.

🗻 Mount Seir was Edom's home mountains
👪 Edom came from Esau, Jacob's brother
👁️ Setting his face means focused judgment
📖 This time the target is family

## ✋ I Will Stretch Out Mine Hand Against Thee

Stretching out a hand pictures someone about to strike.

This exact phrase appears often earlier in Ezekiel against other nations.

It means God Himself acts directly, not through an army first.

Edom will face God directly, not just a political defeat.

✋ Stretching out a hand pictures a strike
🔁 This phrase appears often earlier in Ezekiel
⚡ It means God acts directly Himself
📖 Edom faces God, not just an army

## 🏚️ I Will Make Thee Most Desolate

Desolate means empty, ruined, and no longer lived in.

This word repeats five times across this short chapter.

Repetition like this is the strongest judgment language in Ezekiel.

Edom is about to lose everything it tried to take.

🏚️ Desolate means empty and ruined
🔁 This word repeats five times here
⚖️ Repetition shows the weight of judgment
📖 Edom loses everything it tried to take

## 🔁 Thou Shalt Know That I Am The LORD

This refrain repeats constantly through the whole book of Ezekiel.

It does not just mean learning a fact about God.

It means experiencing His power firsthand through what happens next.

Edom will know God the same way Israel once needed to know Him.

Judgment and knowing God are tied together through this whole chapter.

🔁 This refrain repeats throughout Ezekiel
🧠 It means more than knowing a fact
⚡ It means experiencing God's power directly
📖 Judgment and knowing God are tied together

# Ezekiel 35:5-9
# ⚔️ Blood Shall Pursue Thee
---
## ⏳ Thou Hast Had A Perpetual Hatred

Perpetual hatred means a hostility that never let up over time.

This conflict traces back to Esau and Jacob.

Those two brothers became the fathers of Edom and Israel.

That old rivalry turned violent again when Jerusalem fell to Babylon.

Edom took advantage of a relative's worst moment instead of helping.

⏳ Perpetual hatred means hostility without end
👪 It traces back to Esau and Jacob
💥 It turned violent when Jerusalem fell
📖 Edom exploited a relative's worst moment

## 💥 In The Time Of Their Calamity

Calamity here points to one specific disaster.

Babylon destroyed Jerusalem and emptied the land of Judah.

That was the exact moment Edom chose to shed blood instead of help.

Timing itself is the whole accusation in this verse.

💥 Calamity means Jerusalem's fall to Babylon
🏙️ Babylon emptied the land of Judah
🗡️ Edom struck during that exact moment
📖 Timing itself is the accusation here

## 📜 Sith Thou Hast Not Hated Blood

Sith is an old word that simply means since.

Edom never hated causing bloodshed.

It caused plenty of bloodshed on its own.

Now that same bloodshed will chase Edom instead of Israel.

This is justice matching the crime exactly, not random punishment.

📜 Sith is an old word for since
🗡️ Edom never hated causing bloodshed
🔄 That bloodshed now chases Edom instead
📖 The punishment matches the crime exactly

## 🚶 Him That Passeth Out And Him That Returneth

This phrase covers anyone leaving and anyone coming back.

It is a merism, a figure of speech.

Merisms name two opposite ends to mean everything in between.

No traveler of any kind will be left moving through Edom.

The desolation promised here is total, not partial.

🚶 Passeth out means anyone leaving
🔁 Returneth means anyone coming back
🧩 Together they mean absolutely everyone
📖 The desolation promised is total

## ⚔️ I Will Fill His Mountains With His Slain Men

Slain men filling the mountains pictures a whole battlefield.

Hills, valleys, and rivers are named across the whole landscape.

This is not one battle site.

It covers everything instead.

This matches what Edom's own sword had done to others before.

God returns Edom's own violence back onto Edom itself.

⚔️ Slain men pictures a whole battlefield
🏞️ Hills, valleys, and rivers are named
🔁 This matches what Edom did before
📖 God returns Edom's own violence to it

## ⏳ I Will Make Thee Perpetual Desolations

Perpetual desolations means this ruin will not be temporary.

Edom's cities will never be rebuilt.

They will not return to what they once were.

This directly answers Edom's own perpetual hatred from verse five.

The punishment lasts exactly as long as the sin that caused it.

⏳ Perpetual desolations means ruin without end
🏙️ Cities will never be rebuilt
🔁 This answers Edom's hatred from verse five
📖 The punishment matches the sin's length

# Ezekiel 35:10-12
# 🏴 Two Nations Claimed As Mine
---
## 👑 These Two Nations And These Two Countries Shall Be Mine

The two nations means Israel and Judah.

These were the two kingdoms split from David's line.

Edom saw them weakened by the exile and wanted their land.

This was not a small land grab.

It meant treating God's promised land as nothing but spoils.

👑 Two nations means Israel and Judah
🏴 Edom wanted their land after exile
🗺️ This treated the land as spoils
📖 Edom ignored who truly owned it

## 🏠 Whereas The LORD Was There

This does not mean God physically lived on that land like a person.

It means the land stayed His by promise.

That promise held even when the land sat empty.

Edom treated an empty field as open ground to take.

God had never actually left it.

🏠 God's presence does not mean a dwelling
📜 The land stayed His by promise
🏳️ Edom treated it as open ground
📖 God had never actually left it

## ⚡ I Will Make Myself Known Among Them

Edom will meet God through what happens to it, not through a sermon.

Judgment here is not just punishment.

It also reveals exactly who God is.

Edom boasted and raged against Israel out of pure envy.

That envy is what finally gets exposed and judged.

⚡ Edom meets God through judgment itself
🪞 Judgment here also reveals who God is
😡 Envy drove Edom's rage against Israel
📖 That envy is what gets judged

## 🗣️ I Have Heard All Thy Blasphemies

Blasphemies here means arrogant, disrespectful words spoken against God and His people.

Edom said the mountains of Israel were desolate and given to them to eat.

Calling Israel's ruin a meal for Edom was not a casual insult.

God states plainly that He heard every one of those words.

🗣️ Blasphemies means arrogant words against God
🍽️ Edom called Israel's ruin their meal
😡 That was not a casual insult
📖 God heard every one of those words

# Ezekiel 35:13-15
# 😤 Rejoicing Turned Back On Edom
---
## 😤 With Your Mouth Ye Have Boasted Against Me

Boasting here was not aimed only at Israel.

Edom's words were ultimately boasting against God Himself.

Taking credit for another nation's downfall ignores who actually allowed it.

God says plainly that He heard every word of it.

😤 Boasting was ultimately aimed at God
👑 Edom ignored who allowed Israel's downfall
🗣️ Taking credit for it was arrogance
📖 God heard every word spoken

## 🌍 When The Whole Earth Rejoiceth

This does not mean the entire world celebrating some global event.

Many scholars connect it to the future joy over Israel's own restoration.

That joy will spread.

Edom will sit desolate instead.

The contrast itself is the whole point of this verse.

🌍 Not the whole world's history
🕊️ Likely tied to Israel's restoration
😊 That joy will spread widely
📖 Edom stays desolate in contrast

## 😊 As Thou Didst Rejoice At The Inheritance Of The House Of Israel

Edom celebrated when Israel's land was destroyed and left empty.

God now promises to measure Edom's judgment by that exact same joy.

Idumea is the Greek and Roman name later used for the land of Edom.

The chapter ends exactly where it began, with Edom left desolate.

😊 Edom celebrated Israel's destruction and loss
⚖️ God measures Edom by that same joy
🗺️ Idumea is Edom's later Greek name
📖 The chapter ends where it started, desolate
`.trim();

export const EZEKIEL_THIRTY_FIVE_PERSONAL_SECTIONS = parseEzekielThirtyFiveRawNotes(EZEKIEL_THIRTY_FIVE_RAW_NOTES);
