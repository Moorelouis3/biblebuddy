export type PsalmsTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwelveRawNotes(rawText: string): PsalmsTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 12:${startVerse}` : `Psalms 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 12 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWELVE_RAW_NOTES = `# Psalms 12:1-2
# 🆘 A Cry Against A Faithless Generation
---
## 🆘 Help LORD For The Godly Man Ceaseth

David opens this psalm with an urgent cry, not a calm observation.

Godly means someone who is loyal to God and lives by His ways.

Ceaseth means these people are vanishing, not simply becoming rare.

David feels surrounded by a culture that no longer values faithfulness.

This is a prayer born out of real alarm.

🆘 David cries out for urgent help
🙏 Godly means loyal to God
📉 Ceaseth means faithful people are vanishing
📖 David feels surrounded by faithlessness

---

## 🌍 The Faithful Fail From Among The Children Of Men

This line restates the same worry in different words.

Children of men is a common Bible phrase for humanity as a whole.

David is not just worried about Israel here.

He sees faithlessness spreading everywhere he looks.

Hebrew poetry often repeats one idea twice for weight.

This verse does exactly that.

🌍 Children of men means all humanity
😟 David worries beyond Israel alone
🔁 Hebrew poetry often repeats ideas twice
📖 This verse repeats the same worry

---

## 🎭 They Speak Vanity Every One With His Neighbour

Vanity here does not mean pride or arrogance like it does in modern English.

It means emptiness, something with no truth or substance behind it.

Neighbour means whoever a person interacts with daily, not just a friend.

David describes a whole community using words that carry no real weight.

Conversation itself has become unreliable.

🎭 Vanity means empty or worthless speech
🗣️ Not modern pride or arrogance
🏘️ Neighbour means anyone nearby
📖 Daily conversation has become unreliable

---

## 💋 With Flattering Lips And With A Double Heart Do They Speak

Flattering lips means saying kind things a person does not actually mean.

A double heart means hiding true intentions behind a friendly appearance.

The words sound warm, but they hide something else entirely.

This is the opposite of speaking honestly from a single, sincere heart.

David names this danger before naming any solution.

💋 Flattering lips means insincere kind words
🎭 Double heart means hidden true intentions
🙂 Warm words can hide real motives
📖 Honesty means one heart one message

# Psalms 12:3-4
# 🗡️ Judgment On Proud And Flattering Speech
---
## ✂️ The LORD Shall Cut Off All Flattering Lips

David moves from describing the problem to trusting God with it.

Cut off means completely silenced, not just corrected.

This is not David planning revenge on his own.

He is naming what he trusts God will do.

The flattering lips from the verse before now face judgment.

✂️ Cut off means completely silenced
🙏 David trusts God, not revenge
⚖️ Judgment answers the flattery just named
📖 God deals with lying speech Himself

---

## 👅 The Tongue That Speaketh Proud Things

Tongue here stands in for a person's whole pattern of speech.

Proud things means arrogant claims that puff a person up.

This connects directly to the boast that comes in the next verse.

Proud speech and flattering speech often travel together.

Both are ways of using words to serve the self.

👅 Tongue means a person's speech pattern
😤 Proud things means arrogant boasting
🔗 This connects to the next verse
📖 Proud and flattering speech serve the self

---

## 💬 With Our Tongue Will We Prevail

This line quotes what the flattering, proud people are actually saying.

Prevail means to win or overpower through clever words alone.

They believe their speech gives them power over everyone else.

Their confidence rests entirely in themselves.

Nothing here mentions God at all.

💬 This quotes the proud speakers directly
🏆 Prevail means winning through clever words
😎 Their confidence rests in themselves
📖 God is left out completely

---

## ❓ Who Is Lord Over Us

This question reveals the real problem behind the flattery and pride.

These speakers do not believe anyone has authority over their words.

Lord here means a ruler whose word must be obeyed.

They are rejecting the idea of any master over their speech.

That rejection includes God, even if His name is never said.

❓ This question reveals the real problem
👑 Lord means a ruler who commands
🚫 They reject any authority over them
📖 That rejection quietly includes God

# Psalms 12:5
# 🛡️ God Answers The Cry For Help
---
## 😔 For The Oppression Of The Poor For The Sighing Of The Needy

Oppression means being crushed or held down by someone with more power.

The poor here means people without money or protection to defend themselves.

Sighing pictures a quiet, exhausted groan rather than a loud complaint.

The needy are people who lack what they require just to survive.

God says He has heard both the visible harm and the silent grief.

😔 Oppression means being crushed by power
💰 Poor means lacking money or protection
😩 Sighing means a quiet exhausted groan
📖 God hears both harm and grief

---

## 🔀 Now Will I Arise Saith The LORD

The voice suddenly shifts from David speaking to God speaking directly.

Arise here means God stepping in to act, not standing up physically.

Saith the LORD signals a direct quotation from God Himself.

This is the turning point of the whole psalm.

The complaint from the opening verses now gets a direct answer.

🔀 The voice shifts to God speaking
🦸 Arise means God stepping in to act
📢 Saith the LORD marks a direct quote
📖 This is the psalm's turning point

---

## 😤 I Will Set Him In Safety From Him That Puffeth At Him

Puffeth is an old word for sneering or blowing contempt at someone.

Picture someone scoffing at another person as if they are worthless.

Safety here means God placing the needy person out of reach of that scorn.

This safety does not always mean an easy or comfortable life.

It means God's protection stands between the needy and their mockers.

😤 Puffeth means sneering with contempt
🙄 Pictures someone scoffing at another person
🛡️ Safety means God's protection
📖 God stands between the needy and mockers

# Psalms 12:6-8
# 💎 The Words Of The LORD Are Pure Words
---
## 💎 The Words Of The LORD Are Pure Words

This verse answers the empty, flattering words from earlier in the psalm.

Human words in this psalm have been shown to be unreliable.

Pure here means completely free of anything false or corrupt.

God's words carry the opposite quality of the flattery already described.

What people say fails, but what God says never does.

💎 Pure means free of anything false
🗣️ This contrasts human flattery already described
⚖️ God's words differ from human words
📖 Human speech fails but God's does not

---

## 🔥 As Silver Tried In A Furnace Of Earth Purified Seven Times

Tried here means tested by fire to remove anything impure.

Refining silver meant heating it until the impurities rose to the top.

A worker would then skim those impurities away completely.

A furnace of earth was a simple clay furnace used for this process.

Seven in the Bible often pictures something complete rather than an exact count.

The image says God's words have been proven completely trustworthy.

🔥 Tried means tested and purified by fire
🥈 Refining silver removed all its impurities
🏺 Furnace of earth means a simple clay furnace
📖 God's words are proven completely trustworthy

---

## 🛡️ Thou Shalt Keep Them O LORD Thou Shalt Preserve Them From This Generation For Ever

This is David's direct response to the promise God just gave.

Keep and preserve both mean guarding something so it is not lost.

Them refers back to the pure, trustworthy words just described.

This generation points to the flattering, proud people from earlier in the psalm.

David trusts God's words to outlast the very people twisting their own.

🛡️ Keep and preserve both mean guarding
📜 Them refers to God's pure words
👥 This generation means the flatterers described earlier
📖 God's words outlast their enemies

---

## 👣 The Wicked Walk On Every Side When The Vilest Men Are Exalted

This final line returns to the real, unresolved danger David still faces.

Walk on every side pictures the wicked surrounding him from every direction.

Vilest men are exalted describes corrupt people gaining power and public praise.

The psalm does not pretend the danger has already ended.

It ends by trusting God's pure words inside a world still full of flattery.

👣 Walk on every side means surrounded completely
👑 Vilest men exalted means corrupt people praised
⏳ The danger has not actually ended
📖 Trust rests in God amid ongoing flattery
`.trim();

export const PSALMS_TWELVE_PERSONAL_SECTIONS = parsePsalmsTwelveRawNotes(PSALMS_TWELVE_RAW_NOTES);
