export type PsalmsFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFourRawNotes(rawText: string): PsalmsFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 4:${startVerse}` : `Psalms 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 4 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FOUR_RAW_NOTES = `# Psalms 4:1-2
# 😣 A Prayer In Distress
---
## 🙏 O God Of My Righteousness

"My righteousness" means the right standing that comes from God.

It does not mean David earned that standing by his own effort.

God is the one who grants it and defends it.

The same God had just defended David's cause in Psalm three.

⚖️ My righteousness means right standing from God

🙅 Not something David earned alone

🛡️ God grants it and defends it

📖 Same God who defended him before

---

## 🌬️ Thou Hast Enlarged Me When I Was In Distress

"Distress" pictures a tight, narrow space with no room to move.

"Enlarged" pictures that same space opening wide again.

Hebrew often uses narrow to describe trouble and wide to describe relief.

David is not just saying God helped him.

He is saying God gave him room to breathe again.

🔒 Distress pictures a tight space

🌬️ Enlarged means room opening again

🗣️ Narrow means trouble, wide means relief

📖 God gave David room to breathe

---

## 😔 O Ye Sons Of Men, How Long Will Ye Turn My Glory Into Shame

"Sons of men" is simply an old way of saying people in general.

Here it points to specific people working against David's reputation as king.

"My glory" means the honor and authority that come with being king.

Many scholars believe this psalm was prayed alongside Psalm three.

Both come from the same revolt led by David's own son Absalom.

Turning glory into shame means trying to strip that honor away.

It means replacing honor with public disgrace instead.

🗣️ Sons of men means people in general

👑 My glory means David's honor as king

🔁 Likely paired with Psalm three

➡️ Enemies wanted honor replaced with shame

---

## 🌀 How Long Will Ye Love Vanity, And Seek After Leasing

"Vanity" means something empty and worthless, with no real substance behind it.

"Leasing" is an old English word for lies or deception.

David's enemies are not just attacking him with weapons.

They are attacking him with empty claims and outright lies.

"How long" repeats twice in this verse, showing real, mounting frustration.

🌀 Vanity means something empty and worthless

🤥 Leasing is an old word for lies

🗣️ Enemies attack with empty claims

📖 How long shows real frustration

# Psalms 4:3-4
# 🤫 Stand In Awe And Be Still
---
## 💛 The LORD Hath Set Apart Him That Is Godly For Himself

"Godly" here does not just mean a nice, well behaved person.

The Hebrew word behind it points to someone bound to God in loyal, covenant love.

"Set apart" means God has personally marked this person out as his own.

David is not describing a general moral trait.

He is describing a relationship God himself started and keeps.

💛 Godly means bound to God in covenant love

🖊️ Set apart means God marked him personally

🤝 This is a relationship, not just morals

📖 God starts and keeps this bond

---

## ✅ The LORD Will Hear When I Call Unto Him

David states this as settled fact, not a hope.

He already proved it by surviving the danger described in Psalm three.

Calling here does not mean a quiet, polite request.

It means crying out with real, urgent need.

Confidence like this is built on a track record, not a guess.

✅ Stated as fact, not a hope

🛡️ Already proved true in Psalm three

📣 Calling means crying out urgently

📖 Confidence is built on a track record

---

## 😲 Stand In Awe, And Sin Not

"Stand in awe" is an old phrase for being deeply shaken or moved.

It does not mean simple politeness or quiet respect.

Ancient Greek translators rendered this same line as "be angry, and sin not."

The apostle Paul later quotes that exact wording in Ephesians four.

The verse allows strong feeling.

It draws a hard line at sin.

😲 Stand in awe means deeply shaken

🔥 Ancient translators read it as anger

📜 Paul quotes this line in Ephesians four

➡️ Strong feeling is allowed, sin is not

---

## 🛏️ Commune With Your Own Heart Upon Your Bed, And Be Still

"Commune with your own heart" means talk honestly with yourself.

"Upon your bed" points to a private, quiet moment alone.

"Be still" means stop reacting and let the noise settle.

David is describing a real process for handling anger.

Examine it privately first, then let it go quiet before God.

💬 Commune means talk honestly with yourself

🛏️ Upon your bed means alone and quiet

🤫 Be still means let the noise settle

📖 A real process for handling anger

# Psalms 4:5-6
# 🙏 Trust Over Fear
---
## 🔥 Offer The Sacrifices Of Righteousness

"Sacrifices of righteousness" does not just mean the correct ritual actions.

It means offerings brought with an honest, right hearted attitude.

A person could follow every ritual step and still miss the point.

The heart behind the offering mattered as much as the offering itself.

🔥 Sacrifices of righteousness means right hearted offerings

📋 Ritual steps alone were not enough

❤️ The heart behind it mattered

📖 Attitude and action had to match

---

## 🤝 Put Your Trust In The LORD

This command follows right after the instruction to offer right sacrifices.

Ritual and trust are meant to work together, not stand apart.

Trust here means leaning fully on God, not on outward performance.

The whole verse links right worship to real, inward confidence.

🤝 Trust means leaning fully on God

🔗 Ritual and trust work together

🚫 Performance alone is not enough

📖 Worship and trust go together

---

## ❓ Who Will Shew Us Any Good

This question belongs to the "many" mentioned earlier in the psalm.

It is a voice of doubt, wondering if anything good is coming.

"Shew" is an old spelling of the word show.

The question sounds hopeless, expecting no real answer.

❓ Who asks it is doubtful people

😟 A voice wondering if good is coming

📖 Shew is an old spelling of show

➡️ The question expects no real answer

---

## ✨ LORD, Lift Thou Up The Light Of Thy Countenance Upon Us

This line echoes the priestly blessing from the book of Numbers.

That blessing asks God to make his face shine on his people.

Light on someone's face pictures favor, welcome, and closeness.

David answers doubt not with proof, but with a prayer for God's presence.

🙏 Echoes the priestly blessing in Numbers

✨ Light on God's face means favor

🤗 It pictures welcome and closeness

📖 David answers doubt with a prayer

# Psalms 4:7-8
# 😌 Peace To Sleep
---
## ❤️ Thou Hast Put Gladness In My Heart

This gladness comes from God, not from David's outward circumstances.

David is still facing the same danger described earlier in the psalm.

His joy is not because the danger is gone.

It is because he trusts the one who can end it.

❤️ Gladness comes from God, not circumstances

⚔️ The danger has not actually ended

🙏 His trust makes the joy possible

📖 Joy is not the same as safety

---

## 🌾 More Than In The Time That Their Corn And Their Wine Increased

Corn and wine were the two biggest signs of a good harvest.

A full harvest meant real wealth and security in this culture.

David says his inward joy outweighs even that kind of abundance.

Physical plenty was good on its own.

It was never his true source of gladness.

🌾 Corn and wine mean a good harvest

💰 A full harvest meant real wealth

❤️ David's joy outweighs that abundance

📖 Plenty was never his true source

---

## 😴 I Will Both Lay Me Down In Peace, And Sleep

Psalm three already showed David sleeping safely in the middle of danger.

This verse repeats that same picture from a different night.

Real peace here is not the absence of threat.

It is trust strong enough to rest anyway.

😴 Echoes David's sleep in Psalm three

🌙 Same picture, a different night

🛡️ Peace is not the absence of threat

📖 Trust makes real rest possible

---

## 🔑 For Thou, LORD, Only Makest Me Dwell In Safety

"Only" is the key word in this closing line.

Not walls, not soldiers, not David's own strength.

Just the LORD, alone, is named as the source of his safety.

The psalm that opened with a desperate cry for help ends in complete confidence.

🔑 Only is the key word here

🚫 Not walls, soldiers, or David's own strength

🛡️ The LORD alone provides safety

📖 A desperate cry ends in confidence
`.trim();

export const PSALMS_FOUR_PERSONAL_SECTIONS = parsePsalmsFourRawNotes(PSALMS_FOUR_RAW_NOTES);
