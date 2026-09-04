export type PsalmsSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixRawNotes(rawText: string): PsalmsSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 6:${startVerse}` : `Psalms 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 6 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIX_RAW_NOTES = `# Psalms 6:1-3
# 🔥 A Prayer Against God's Anger
---
## 😡 Rebuke Me Not In Thine Anger

"Rebuke" means a sharp, verbal correction, not a beating.

David is not asking God to stay silent about his sin.

He is asking God not to correct him in the heat of anger.

The same Hebrew word appears when a king corrects a rebellious servant.

David wants correction that comes from love, not fury.

😡 Rebuke means sharp verbal correction
🙅 Not a request to ignore sin
❤️ David wants correction from love
➡️ Not correction born from fury

---

## 🔥 Neither Chasten Me In Thy Hot Displeasure

"Chasten" means discipline given to correct someone, like a parent training a child.

It carries the idea of shaping character, not simple punishment.

"Hot displeasure" pictures anger that has already boiled over.

David is not denying that he deserves discipline.

He is asking God to discipline him gently instead of in a burst of anger.

📏 Chasten means shaping discipline not punishment
👪 Like a parent training a child
🔥 Hot displeasure pictures anger boiled over
➡️ David wants gentle correction not fury

---

## 🌿 Have Mercy Upon Me, For I Am Weak

David shifts from correction to mercy in the very next breath.

"Weak" translates a Hebrew word that pictures a plant wilting in the sun.

It describes someone drained of strength, not simply tired.

David is not hiding his condition from God.

He names it plainly so God will act.

🙏 David shifts from correction to mercy
🌿 Weak pictures a wilting plant
😮‍💨 It describes strength drained away
➡️ David names his need plainly

---

## 🦴 O LORD, Heal Me For My Bones Are Vexed

"Bones" in Hebrew poetry often stands for someone's whole inner frame, not just skeleton.

"Vexed" means shaken and troubled, not simply sore.

David is describing distress that reaches all the way into his body.

This is not only an emotional complaint.

He is asking for real, physical healing too.

🦴 Bones often means the whole inner frame
😖 Vexed means shaken and troubled
💔 Distress reaches into David's body
➡️ He asks for real physical healing

---

## 😣 My Soul Is Also Sore Vexed

"Sore" here means severely, not simply painful in a small way.

"Soul" points to David's whole inner self, deeper than just his body.

Verse two already named his bones as vexed.

Now the same trouble has reached his very soul.

The distress is total, not confined to one part of him.

😣 Sore here means severely
💫 Soul means David's whole inner self
📈 The trouble has spread from bones to soul
📖 David's distress is total not partial

---

## ❓ But Thou, O LORD, How Long?

This question breaks off in the middle of a sentence on purpose.

David never finishes explaining what he expects God to do.

"How long" was a common opening for ancient prayers of lament.

It does not demand an exact answer from God.

It expresses raw impatience while still trusting God is listening.

✂️ The sentence breaks off on purpose
📜 How long was a common lament opening
❓ It does not demand an exact answer
➡️ It expresses trust along with impatience

# Psalms 6:4-5
# 🙏 David Asks God To Return
---
## 🔄 Return, O LORD, Deliver My Soul

"Return" pictures God turning back toward someone, not walking toward a place.

The same word can describe repentance when a person is the one turning.

Here David asks God to be the one who turns back.

It answers the how long from the verse before.

David wants an end to the distance he feels from God.

🔄 Return pictures God turning back
🙇 The same word can describe repentance
🙏 Here God is the one asked to turn
📖 It answers the how long before it

---

## ❤️ Oh Save Me For Thy Mercies' Sake

David does not ask to be saved because he has earned it.

He asks for the sake of God's own mercy.

"Mercies" is plural, pointing to God's many acts of kindness over time.

The request rests entirely on God's character, not David's record.

This is the same appeal made throughout the Psalms.

🙅 Not because David has earned it
❤️ For the sake of God's mercy
🔁 Mercies is plural, many acts of kindness
➡️ The appeal rests on God's character

---

## 🌑 For In Death There Is No Remembrance Of Thee

Ancient Israel did not yet have a full picture of resurrection and heaven.

The grave, called Sheol, was pictured as a quiet, shadowy place.

Praise and worship happened among the living, spoken out loud.

David is not stating a full doctrine of the afterlife here.

He is arguing for something narrower.

His life right now can still bring God praise.

🌑 Israel had no full resurrection picture yet
🕳️ Sheol was pictured as a quiet place
🗣️ Praise happened aloud among the living
📖 David argues his life now can praise God

---

## ⚰️ In The Grave Who Shall Give Thee Thanks

This question repeats the idea of the line before it in different words.

Hebrew poetry often says one thing twice, using two different pictures.

"The grave" and "death" both point to the same reality here.

David is not asking a question he expects answered.

He is using the question to make his plea feel urgent.

🔁 This repeats the idea before it
📜 Hebrew poetry often says one thing twice
⚰️ Grave and death point to the same place
➡️ The question makes David's plea urgent

# Psalms 6:6-7
# 😢 Weary With Groaning
---
## 😩 I Am Weary With My Groaning

"Groaning" means an audible sigh or moan, not silent worry.

David's prayer has become physically exhausting to pray.

This is not a quiet, composed request.

It is prayer that costs something to say out loud.

Real grief in the Bible is rarely silent.

😩 Groaning means an audible sigh
😮‍💨 David's prayer has become exhausting
🗣️ This is not a quiet request
➡️ Real biblical grief is rarely silent

---

## 🛏️ All The Night Make I My Bed To Swim

David pictures his own bed flooded with his tears.

This is poetic exaggeration, not a literal event.

Ancient Near Eastern laments often used flood imagery for grief.

Think of a room that feels soaked through after a long, hard cry.

The picture makes his exhaustion impossible to miss.

🛏️ David pictures his bed flooded with tears
🎭 This is poetic exaggeration not literal
🌊 Ancient laments often used flood imagery
➡️ The picture shows exhaustion impossible to miss

---

## 🛌 I Water My Couch With My Tears

"Couch" here simply means the bed or mat David slept on.

It does not describe a modern sofa or piece of furniture.

This line repeats the picture from the line just before it.

Hebrew poetry often doubles an image for emphasis, not repetition by accident.

The doubled image shows just how often David wept.

🛌 Couch means the bed he slept on
🚫 Not a modern sofa
🔁 The image repeats on purpose
➡️ It shows how often David wept

---

## 👁️ Mine Eye Is Consumed Because Of Grief

"Consumed" here means worn out and failing, not destroyed all at once.

Constant weeping in the ancient world was believed to weaken eyesight.

David is describing a real physical cost of his grief.

This is not only a figure of speech.

His body is genuinely suffering from the weight of sorrow.

👁️ Consumed means worn out and failing
💧 Weeping was believed to weaken eyesight
🩺 This describes a real physical cost
➡️ His body suffers from real sorrow

---

## 📉 It Waxeth Old Because Of All Mine Enemies

"Waxeth old" means grows weak, the opposite of waxing strong.

David's eyesight is failing faster than his age alone would explain.

His enemies are named here as a second cause of his suffering.

Grief and conflict are pressing on him at the same time.

David's pain has more than one source.

📉 Waxeth old means grows weak
⏳ Failing faster than age explains
⚔️ Enemies add a second cause
➡️ David's pain has more than one source

# Psalms 6:8-10
# 📣 From Weeping To Confidence
---
## 🔄 Depart From Me, All Ye Workers Of Iniquity

The tone of the psalm changes suddenly at this line.

David has spent seven verses describing weeping and weakness.

Now he speaks with sudden confidence and authority.

"Workers of iniquity" means people who practice sin as a pattern.

Something has shifted inside David between one line and the next.

🔄 The psalm's tone changes suddenly
😢 Seven verses described weeping and weakness
💪 David now speaks with confidence
➡️ Something shifted between one line and the next

---

## 👂 For The LORD Hath Heard The Voice Of My Weeping

This line names the reason David's confidence just changed.

God has already heard him, even before anything visibly improves.

"Hath heard" is written as a completed action, not a hope.

David's assurance rests on what God has already done.

It does not rest on his circumstances changing yet.

🎯 This names why David's confidence changed
👂 God already heard him
✅ Hath heard describes a finished action
📖 Assurance rests on God not circumstances

---

## 🙏 The LORD Hath Heard My Supplication

"Supplication" means a specific, urgent request, not a general prayer.

This is the second time in two lines David says God has heard him.

Repetition in Hebrew poetry is a way of building certainty, not padding.

David is not simply hopeful now.

He is certain.

🙏 Supplication means a specific urgent request
🔁 This is the second time he says it
📈 Repetition builds certainty in Hebrew poetry
➡️ David has moved from hope to certainty

---

## 🎁 The LORD Will Receive My Prayer

"Receive" pictures God accepting something offered to him, like a gift.

The verb shifts here from past tense to future tense.

David is now confident about what is still ahead.

His prayer will not be turned away.

It will be welcomed.

🎁 Receive pictures God accepting a gift
⏩ The verb shifts to future tense
🙌 David is confident about what is ahead
➡️ His prayer will be welcomed not refused

---

## ⚖️ Let All Mine Enemies Be Ashamed And Sore Vexed

"Vexed" is the same word David used about himself back in verse three.

The trouble he once carried is now turned toward his enemies instead.

This is not random cruelty toward other people.

It is a request that wrong be set right.

David wants justice, not simple revenge.

🔁 Vexed is the same word from verse three
↩️ The trouble now turns toward his enemies
⚖️ This is not random cruelty
➡️ David wants justice not simple revenge

---

## 🎯 Let Them Return And Be Ashamed Suddenly

"Return" is the same word David used asking God to return in verse four.

There, David asked God to turn back toward him.

Here, he asks his enemies to be turned back instead.

"Suddenly" contrasts with the whole night of weeping described earlier.

The psalm that opened in slow grief closes with a sudden reversal.

🔄 Return is the same word from verse four
↩️ Then David asked God to return
🎯 Now his enemies are asked to return
📖 Slow grief closes in sudden reversal
`.trim();

export const PSALMS_SIX_PERSONAL_SECTIONS = parsePsalmsSixRawNotes(PSALMS_SIX_RAW_NOTES);
