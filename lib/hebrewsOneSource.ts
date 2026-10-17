export type HebrewsOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsOneRawNotes(rawText: string): HebrewsOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 1:${startVerse}` : `Hebrews 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Hebrews 1 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_ONE_RAW_NOTES = `# Hebrews 1:1-4
# 📜 God Has Spoken Through A Son Who Upholds Everything
---
## 🗣️ At Sundry Times And In Divers Manners

"Sundry" means on many separate occasions, not only one.

"Divers" means through many different methods, not one single way.

God spoke through dreams, visions, a burning bush, and written law.

Each prophet received that word in his own particular way.

Hebrews names all of that variety before naming something far greater.

🗣️ Sundry means on many occasions
🎭 Divers means through many methods
📜 Dreams visions and written law all counted
➡️ A greater way of speaking comes next

---
## 🕰️ Hath In These Last Days Spoken Unto Us By His Son

"These last days" does not mean the world was about to end.

It names the final era when God began speaking in person.

Earlier messages reached Israel through a prophet standing in God's place.

This message comes directly from God's own Son.

That is a change in rank, not only a change in method.

🕰️ These last days means the final era
🙅 Not a sign the world was ending
👤 Prophets once stood in God's place
📖 Now the Son speaks in person

---
## 👑 Whom He Hath Appointed Heir Of All Things

An heir normally receives what belonged to someone else after that person died.

The Son is different because he already owns everything together with the Father.

"Appointed heir" points forward to his resurrection.

That is when his ownership was publicly confirmed.

The whole universe belongs to him by right, not only by gift.

👑 Heir means one who receives an inheritance
🤝 The Son already owns it with the Father
⬆️ Appointment points to his resurrection
📖 The Son owns all things by right

---
## 🌌 By Whom Also He Made The Worlds

"The worlds" translates a Greek word for the ages, not simply planets and stars.

It points to all of time and all of creation together as one whole.

The Son is not only the heir of creation but also its maker.

John's Gospel makes the same claim in different words.

It calls him the Word through whom all things were made.

🌌 Worlds means all of creation and time
🛠️ The Son is maker, not only heir
📖 John's Gospel makes the same claim
➡️ Creation itself begins and ends in him

---
## ✨ The Brightness Of His Glory, And The Express Image Of His Person

"Brightness" pictures sunlight shining out from the sun itself, never separated from it.

"Express image" means an exact representation, like a seal pressed perfectly into wax.

"Person" here means his very being, not merely his personality.

The Son reveals God the way light reveals the sun and a seal reveals its pattern.

✨ Brightness pictures light shining from its source
🪞 Express image means an exact representation
🕯️ A seal leaves its exact mark
📖 The Son reveals God's very being

---
## 🛡️ Upholding All Things By The Word Of His Power

"Upholding" means actively sustaining, not simply having built something once.

The Son did not only create the universe and step back from it.

He continues holding everything together right now, by his own spoken power.

Think of a bridge that needs constant support, not one built and then abandoned.

🛡️ Upholding means sustaining right now
🏗️ Creation was not a one time act
💪 The Son holds all things together still
📖 His power keeps the universe standing

---
## 🩸 When He Had By Himself Purged Our Sins

"Purged" means cleansed completely, leaving nothing left to remove.

"By himself" means no priest, no sacrifice, and no helper stood beside him in the act.

Every earlier sacrifice in Israel's history needed to be repeated again and again.

This cleansing never needs to happen a second time.

🩸 Purged means cleansed completely
🙅 No priest or helper stood beside him
🔁 Earlier sacrifices needed constant repeating
📖 This cleansing never needs repeating

---
## 🪑 Sat Down On The Right Hand Of The Majesty On High

Old Testament priests never sat down while serving in the temple.

Their work of offering sacrifices was never finished, so they stood and kept working.

The Son sits because his work of dealing with sin is completely finished.

Sitting at the right hand also means receiving the highest place of honor.

🪑 Priests always stood because the work continued
✅ Sitting shows the work is finished
👑 Right hand means the highest honor
📖 He now reigns from the highest place

---
## ⚖️ So Much Better Than The Angels

This sentence states the whole argument of the chapter in one line.

"A more excellent name" most likely means the name "Son" itself.

No angel in scripture is ever called God's Son in that unique sense.

Rank in heaven is not decided by power alone but by relationship to God.

⚖️ This line states the chapter's whole argument
🏷️ The more excellent name is likely Son
🚫 No angel carries that exact title
📖 Relationship to God decides true rank

# Hebrews 1:5-9
# ⚔️ A Chain Of Scriptures Proving The Son Is Not An Angel
---
## ❓ Unto Which Of The Angels Said He At Any Time

This question expects one answer, that God never said this to any angel at all.

Hebrews now strings together several Old Testament quotations like links in a chain.

Each one was already written in scripture, not newly invented for this argument.

The writer builds the case using Israel's own scriptures, not outside opinion.

❓ This question expects the answer never
🔗 Quotations are strung together like a chain
📜 Each quote already existed in scripture
➡️ The case rests on Israel's own Bible

---
## 👶 Thou Art My Son, This Day Have I Begotten Thee

"Begotten" here does not mean the Son began to exist on that day.

This quotation comes from Psalm two, originally spoken over Israel's king at his coronation.

Hebrews applies that same royal announcement to the Son's resurrection.

"This day" marks the day his Sonship was publicly declared, not the day it began.

👶 Begotten does not mean a beginning
👑 Psalm two first described a king's coronation
🙌 Hebrews applies it to the resurrection
📖 This day means a public declaration

---
## 🌍 When He Bringeth In The Firstbegotten Into The World

"Firstbegotten" is a title of rank, not a statement about birth order.

It marks the Son as the supreme heir, placed above every other being.

The phrase points to Christ entering the world in the incarnation.

Paul uses the same kind of language for Christ elsewhere in his letters.

🌍 Firstbegotten is a title of rank
👑 It marks the Son as supreme heir
🎄 It points to the incarnation
📖 Rank, not birth order, is the point

---
## 🙇 Let All The Angels Of God Worship Him

This line answers the chapter's opening question before it is even fully asked.

If angels are commanded to worship the Son, the Son cannot be one of them.

Worship belongs to God alone throughout scripture.

Angels bowing to the Son settles exactly who he is.

🙇 Angels are commanded to worship him
🚫 He cannot be one of them
🙏 Worship belongs to God alone
📖 This settles who the Son is

---
## 💨 Who Maketh His Angels Spirits, And His Ministers A Flame Of Fire

Angels here are described by what they do, not by who they are in themselves.

"Spirits" and "flame of fire" picture wind and fire, forces that serve but never rule.

Angels are servants with a job, sent out and used as needed.

The next verse turns from servants to a Son who sits on a throne.

💨 Angels are described by their job
🌬️ Spirits and fire picture wind and flame
🛎️ Angels are servants sent out as needed
➡️ The next verse turns to a throne

---
## 👑 Thy Throne, O God, Is For Ever And Ever

This quotation calls the Son "God" directly, not merely godlike.

A throne that lasts "for ever and ever" is permanent, not passed to an heir later.

Angels serve for a season, but the Son reigns without end.

The writer lets the Old Testament itself say what no angel could ever say.

👑 The Son is called God directly
♾️ His throne lasts forever
⏳ Angels serve only for a season
📖 Scripture itself makes this claim

---
## ⚖️ A Sceptre Of Righteousness Is The Sceptre Of Thy Kingdom

A "sceptre" was a rod carried by a king as a sign of ruling authority.

This kingdom is not built on force alone but on what is right.

A ruler's character shapes the kind of kingdom he builds.

The Son's reign is defined by righteousness itself.

⚖️ A sceptre symbolizes ruling authority
🏛️ This kingdom rests on righteousness
👑 A ruler's character shapes his kingdom
📖 The Son's reign is defined by righteousness

---
## ❤️ Thou Hast Loved Righteousness, And Hated Iniquity

The Son's throne is not only inherited but also earned through his own character.

Loving righteousness and hating iniquity describes an active, moral choice, not a passive title.

This is the same person described earlier as upholding all things.

Power and goodness meet completely in him.

❤️ Loving righteousness is an active choice
🚫 Hating iniquity is just as active
🔗 Power and goodness meet in him
📖 Character, not only title, earns this throne

---
## 🫙 Hath Anointed Thee With The Oil Of Gladness Above Thy Fellows

Anointing with oil marked someone as set apart for kingship or priesthood.

"Oil of gladness" pictures a celebration, not a solemn or grim ceremony.

"Thy fellows" likely refers to other kings.

It may also point to angels, who share only partly in his glory.

No one anointed this way shares the Son's full rank.

🫙 Anointing marked kingship or priesthood
🎉 Oil of gladness pictures celebration
👥 Fellows means others who share only partly
📖 No one shares the Son's full rank

# Hebrews 1:10-14
# 🪨 The Son Outlasts Creation And Angels Serve Those He Saves
---
## 🌍 Thou, Lord, In The Beginning Hast Laid The Foundation Of The Earth

This quotation comes from Psalm one hundred and two, originally a prayer to God alone.

Hebrews applies that same prayer directly to the Son.

Laying the foundation pictures a builder setting the first stones of a lasting structure.

The Son is named as that builder.

🌍 This quotation first addressed God alone
✍️ Hebrews applies it to the Son
🏗️ Laying a foundation pictures a builder
📖 The Son is that builder

---
## 🧵 They Shall Perish, But Thou Remainest

"They" refers back to the earth and the heavens named in the verse before.

Creation, however vast, has a built in expiration that the Son does not share.

Everything made will eventually end.

The one who made it will not.

🧵 They refers to the earth and heavens
⏳ Creation has a built in expiration
🚫 The Son shares no such limit
📖 The maker outlasts everything he made

---
## 🧥 They All Shall Wax Old As Doth A Garment

"Wax old" means to grow old and wear out over time.

The picture compares the entire universe to a piece of clothing.

Clothing gets threadbare and eventually needs replacing.

Even the heavens and the earth are not exempt from that same aging process.

🧥 Wax old means to grow worn out
👗 Creation is pictured as clothing
🕰️ Clothing wears out with time
📖 Even the heavens are not exempt

---
## 🧵 As A Vesture Shalt Thou Fold Them Up

A "vesture" is simply an old word for a garment or robe.

Folding a garment is something a person does on purpose, not something that happens by accident.

This pictures God intentionally retiring the current creation, not creation falling apart on its own.

What looks like an ending is actually a deliberate act of the Son's own hand.

🧵 Vesture means a garment or robe
🙌 Folding is done on purpose
🌌 Creation is retired, not simply ruined
📖 An ending here is still his own choice

---
## 🌀 Thou Art The Same, And Thy Years Shall Not Fail

Everything around the Son changes, grows old, and gets folded away.

He alone stays exactly the same through all of it.

"Thy years shall not fail" means his existence has no closing date.

This verse is quoted centuries later as proof that Jesus Christ never changes.

🌀 Everything around him changes and ages
🧍 He alone stays exactly the same
♾️ His years have no closing date
📖 Jesus Christ never changes

---
## 🦶 Sit On My Right Hand, Until I Make Thine Enemies Thy Footstool

This quotation comes from Psalm one hundred and ten, a psalm about a coming king.

A "footstool" pictures total defeat, an enemy placed low enough to rest a foot on.

The Son is already seated, but his enemies are not yet fully subdued.

Scripture presents his reign as settled even while that final victory is still unfolding.

🦶 Footstool pictures complete defeat
👑 This quotation describes a coming king
⏳ His enemies are not yet fully subdued
📖 His reign is settled before the final victory

---
## 👻 Are They Not All Ministering Spirits

This question returns to the angels one final time before the chapter ends.

"Ministering" means serving, carrying out tasks rather than ruling over anyone.

Every angel, however powerful, fits that same job description.

Not one of them was ever called a son or given a throne.

👻 The chapter returns to angels one last time
🛎️ Ministering means serving, not ruling
💪 Every angel fits that same job
📖 Not one was ever given a throne

---
## 🤲 Sent Forth To Minister For Them Who Shall Be Heirs Of Salvation

"Them who shall be heirs of salvation" refers to everyone who belongs to Christ by faith.

It echoes the Son's own title, heir of all things, from verse two.

Believers now share, in a smaller way, in the same inheritance language used for the Son.

Angels were never the main characters in this story.

They exist to serve the people God is saving.

🤲 Heirs of salvation means believers in Christ
🔗 It echoes the Son's own title
👪 Believers share that inheritance language too
📖 Angels serve the people God is saving
`.trim();

export const HEBREWS_ONE_PERSONAL_SECTIONS = parseHebrewsOneRawNotes(HEBREWS_ONE_RAW_NOTES);
