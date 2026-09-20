export type PsalmsOneHundredTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentySixRawNotes(rawText: string): PsalmsOneHundredTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+126:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 126 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+126:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+126:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 126 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 126,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 126:${startVerse}` : `Psalms 126:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 126 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_SIX_RAW_NOTES = `# Psalms 126:1-3
# 🎉 A Dream Come True
---
## 🏛️ When The LORD Turned Again The Captivity Of Zion

"Captivity" refers to the years Judah spent exiled in Babylon.

"Zion" stands for Jerusalem and the people of God as a whole.

Turning again the captivity means bringing the exiles back home.

This song was written to celebrate that homecoming.

The return did not happen because Israel had earned it.

It happened because the LORD chose to act.

🏛️ Captivity means the Babylonian exile
🕍 Zion represents Jerusalem and God's people
🏠 Turning again the captivity means coming home
📖 The LORD brought them back Himself

## 💭 We Were Like Them That Dream

The return happened so suddenly it barely felt real.

Dreaming here does not mean something imaginary or false.

It pictures the dazed joy of waking up to news too good to believe.

Years of exile had made freedom feel almost impossible.

Then one day it simply arrived.

😮 The return felt almost too sudden
💭 Dreaming pictures dazed unbelievable joy
⛓️ Freedom had felt impossible for years
📖 God's rescue arrived without warning

## 😂 Then Was Our Mouth Filled With Laughter

Joy this big could not stay quiet inside a person.

It broke out into open laughter and singing.

The mouth and the tongue both had to join in.

This was not a private feeling.

It was joy loud enough for other people to hear.

😂 Joy became too big to contain
👄 Mouth and tongue both took part
🔊 The celebration was loud, not quiet
📖 Real joy overflows into others hearing it

## 🌍 Then Said They Among The Heathen, The LORD Hath Done Great Things For Them

"Heathen" refers to the surrounding nations who did not worship the LORD.

Even those outside nations noticed what had happened to Israel.

They said it themselves, without being asked.

An outsider recognizing God's hand carries extra weight.

It means the miracle was not just Israel's own private opinion of itself.

🌍 Heathen means the surrounding nations
👀 Outsiders noticed Israel's restoration
🗣️ They said it without being asked
📖 Even outsiders saw God's hand at work

## ✅ The LORD Hath Done Great Things For Us

This line repeats the exact words the nations had just said.

Israel is not just quoting what others think.

They are agreeing that it is true.

The compliment did not need editing.

It was already the right description of what God had done.

🔁 Israel repeats the nations' own words
✅ They agree it is completely true
🗣️ No editing needed for the compliment
📖 The nations' praise matched reality

## 😊 Whereof We Are Glad

"Whereof" is an old word that simply means about which.

Israel is glad about the very thing the nations already praised.

The gladness closes the loop the psalm opened.

It began with disbelief and ends with settled joy.

That shift from dream to certainty is the point of this opening section.

📜 Whereof means about which
😊 Israel agrees with the nations' praise
🔄 The psalm moves from disbelief to certainty
📖 Settled joy replaces stunned disbelief

# Psalms 126:4-6
# 🌾 Sowing In Tears, Reaping In Joy
---
## 🙏 Turn Again Our Captivity, O LORD

The exiles had already come home, yet this verse still asks for restoration.

The return likely happened in stages, not all at once.

This prayer asks God to finish what He had started.

It shows that partial rescue can still leave real needs remaining.

🙏 A prayer for further restoration
🚶 The return likely came in stages
🏗️ Asking God to finish the work
📖 Partial rescue still leaves real needs

## 🏜️ As The Streams In The South

"The south" refers to the Negev, a dry region south of Judah.

Its stream beds sat empty and cracked for most of the year.

Then seasonal rains would suddenly fill them with rushing water.

Think of a dry riverbed turning into a flowing river overnight.

The psalm prays for a restoration that arrives just as suddenly.

That reversal is the whole picture behind this line.

🏜️ The south means the dry Negev
💧 Streambeds sat empty most months
🌧️ Rain could fill them suddenly
📖 The prayer asks for that same reversal

## 😢 They That Sow In Tears

Sowing tears sounds strange since planting is normally hopeful work.

In this setting, sowing came during hardship, maybe famine or scarcity.

Tears here picture the fear of giving up food that might not return.

A farmer sowing in tears is still choosing to trust the process.

😢 Sowing tears pictures planting during hardship
🌾 Seed given up now might not return
🤲 Sowing anyway is still an act of trust
📖 Hard beginnings do not decide the ending

## 🌾 Shall Reap In Joy

This is the other half of the same proverb.

Whatever hardship marked the planting, the harvest reverses it completely.

Tears do not get the final word here.

Joy does.

The pattern applies to more than just farming.

🌾 Joy answers the tears of planting
🔄 Hardship does not have the final say
😊 The harvest reverses the difficulty
📖 The pattern reaches beyond farming alone

## 🌱 He That Goeth Forth And Weepeth, Bearing Precious Seed

"Precious seed" means the grain kept back for planting next season.

It was not food set aside to eat right away.

Giving it up to scatter in the ground was a real risk.

There was no guarantee it would grow before it was buried.

That risk explains the weeping.

The farmer trusted an outcome he could not yet see.

🌾 Precious seed means grain saved for planting
⚠️ Sowing it away was a real risk
😢 The risk explains the tears
📖 The farmer trusted an unseen future harvest

## 🎉 Shall Doubtless Come Again With Rejoicing, Bringing His Sheaves With Him

"Doubtless" means without any doubt at all, a guaranteed outcome.

"Sheaves" are bundles of cut grain gathered after a harvest.

The same person who left anxious and empty handed returns joyful and loaded down.

The risk from the previous verse was never wasted.

This whole psalm began with a memory of God's past rescue.

It ends with confidence in what God will still do.

✅ Doubtless means a guaranteed outcome
🌾 Sheaves are bundles of harvested grain
😊 The weeping sower returns rejoicing
📖 Past rescue becomes confidence for the future
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_SIX_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentySixRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_SIX_RAW_NOTES
);
