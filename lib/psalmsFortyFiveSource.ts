export type PsalmsFortyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortyFiveRawNotes(rawText: string): PsalmsFortyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+45:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 45 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+45:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+45:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 45 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 45,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 45:${startVerse}` : `Psalms 45:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 45 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_FIVE_RAW_NOTES = `# Psalms 45:1-2
# 📜 My Heart Is Inditing A Good Matter
---
## 📝 My Heart Is Inditing A Good Matter

"Inditing" means composing, much like an author carefully drafting a poem.

The psalmist describes his heart bubbling over with something urgent to say.

"A good matter" means a worthy subject, not idle chatter.

What follows is a carefully composed song, not a random outburst.

This verse is the psalmist explaining his own craft before he even begins.

📝 Inditing means carefully composing words

🎯 A good matter means worthy subject

✍️ The psalm was planned, not spontaneous

📖 This verse explains the psalmist's craft

## 🖋️ My Tongue Is The Pen Of A Ready Writer

The psalmist compares his own tongue to a scribe's pen.

A "ready writer" was a skilled scribe who wrote quickly and clearly.

He is claiming his words flow because they come from something greater than himself.

The image suggests inspiration, not just talent.

God is using his mouth the way a scribe uses a pen.

🖋️ Tongue compared to a scribe's pen

✍️ Ready writer means a skilled scribe

💨 His words flow from inspiration

📖 God uses his voice like a pen

## 👑 Thou Art Fairer Than The Children Of Men

This describes the king's appearance, but it means far more than looks.

"Fairer" points to an excellence that sets him apart from every other man.

Many scholars believe this psalm also points forward to a greater king than Solomon.

Hebrews chapter one later quotes this exact psalm about the Son of God.

The praise here reaches beyond any one human ruler.

👑 Fairer means unmatched excellence, not vanity

📖 Many scholars see this pointing to Christ

✝️ Hebrews quotes this psalm about God's Son

➡️ The praise reaches beyond one human king

## 💧 Grace Is Poured Into Thy Lips

"Grace" here means favor and pleasing speech, not just kindness.

The picture is of something liquid being poured out generously.

His words themselves carry that same appeal and favor.

"Therefore God hath blessed thee for ever" ties his gifted speech to God's own blessing.

Beautiful words were seen as a gift from God, not a talent earned alone.

💧 Grace poured pictures generous favor

🗣️ His speech itself carries that favor

🙏 God blessed him because of this gift

📖 Even good speech comes from God

# Psalms 45:3-5
# ⚔️ Gird Thy Sword Upon Thy Thigh
---
## 🗡️ Gird Thy Sword Upon Thy Thigh, O Most Mighty

"Gird" means to strap something on tightly, ready for action.

A sword worn on the thigh was the normal way ancient soldiers carried their weapon.

"O most mighty" addresses the king directly as a warrior of great strength.

The gentle poet of verse one suddenly pictures the king armed for battle.

Beauty and strength both belong to the same king in this psalm.

🗡️ Gird means strapping on for battle

🦵 Swords were worn on the thigh

💪 Most mighty names his great strength

📖 Beauty and strength meet in one king

## 🐎 And In Thy Majesty Ride Prosperously

"Majesty" describes royal splendor, the visible glory that surrounds a king.

"Ride prosperously" means riding out to certain success, not just riding well.

Ancient kings often rode into battle or in procession on a horse or chariot.

This king moves forward with both dignity and guaranteed success.

👑 Majesty means visible royal splendor

🐎 Ride prosperously means riding to success

🏇 Kings rode this way in procession

📖 Dignity and victory move together here

## ✅ Because Of Truth And Meekness And Righteousness

These three words describe what actually drives this king forward.

"Truth" means faithfulness to what is right and real.

"Meekness" does not mean weakness, it means controlled strength used rightly.

"Righteousness" means living in a way that matches God's own standard.

This king conquers for reasons that have nothing to do with greed or pride.

✅ Truth means faithfulness to what is real

🕊️ Meekness means controlled strength, not weakness

⚖️ Righteousness means matching God's standard

📖 This king fights for the right reasons

## ✋ Thy Right Hand Shall Teach Thee Terrible Things

The right hand pictures the hand of action and combat skill.

"Terrible" here is an old word for things that inspire fear or awe.

"Teach" pictures skill that grows through action, almost like training on the job.

His own hand will show him mighty and fearsome acts in battle.

The next verse follows this same warrior picture straight into the fight itself.

✋ Right hand pictures the hand of action

😨 Terrible means fear inspiring, not evil

🎯 Teach pictures skill sharpened through action

📖 Fearsome deeds are about to follow

## 🏹 Thine Arrows Are Sharp In The Heart Of The King's Enemies

This continues the same battle scene from the previous verse.

Arrows were a long range weapon used to strike an enemy before close combat began.

"Sharp" here pictures arrows so effective they strike deep and true.

"Whereby the people fall under thee" describes total victory, enemies falling before the king.

The reader is meant to picture overwhelming, decisive success in battle.

🏹 Arrows pictured a long range weapon

🎯 Sharp means striking deep and true

⚔️ The people fall pictures total victory

📖 This scene ends in decisive success

# Psalms 45:6-7
# 👑 Thy Throne, O God, Is For Ever
---
## 👑 Thy Throne, O God, Is For Ever And Ever

This verse addresses the king directly as "God," which is a stunning claim.

Many scholars believe this points beyond Solomon to the promised eternal king, the Messiah.

Hebrews chapter one quotes this exact verse and applies it directly to Jesus Christ.

No human throne actually lasts for ever and ever on its own.

This verse only makes complete sense if it describes someone more than a man.

👑 The king is addressed here as God

✝️ Hebrews applies this verse to Jesus

⏳ For ever describes an eternal throne

📖 No human throne alone lasts forever

## 🪄 The Sceptre Of Thy Kingdom Is A Right Sceptre

A "sceptre" was a rod carried by a king as a symbol of his authority to rule.

"Right" here means just and fair, not merely correct.

This king does not rule by force alone.

His authority is matched by the fairness of how he uses it.

🪄 Sceptre symbolized a king's authority to rule

⚖️ Right sceptre means fair, just rule

👑 Authority and fairness belong together here

📖 Power alone was never the point

## ❤️ Thou Lovest Righteousness, And Hatest Wickedness

This king's character is defined by two opposite loves.

He loves what is right and hates what is wrong, without mixing the two.

Scripture often measures a king by exactly this kind of moral clarity.

A ruler who blurs this line eventually fails the people he leads.

❤️ He loves righteousness without compromise

💔 He hates wickedness without excusing it

⚖️ Moral clarity defines this king

📖 Scripture measures rulers by this test

## 🫗 Therefore God, Thy God, Hath Anointed Thee With The Oil Of Gladness Above Thy Fellows

"Anointed" means specially set apart and empowered for a role, often marked with oil.

Ancient kings and priests were anointed with oil as a sign of God's choice.

"Oil of gladness" pictures overflowing joy, not just a formal ceremony.

"Above thy fellows" means this king received more honor than any other ruler like him.

His righteous character in the line before is exactly why he receives this honor.

🫗 Anointed means set apart and empowered

😄 Oil of gladness pictures overflowing joy

🏆 Above thy fellows means unmatched honor

📖 Honor here follows righteous character

# Psalms 45:8-9
# 🌿 All Thy Garments Smell Of Myrrh
---
## 🌿 All Thy Garments Smell Of Myrrh, And Aloes, And Cassia

Myrrh, aloes, and cassia were rare and costly spices used to perfume clothing.

Wearing scented garments was a mark of wealth and celebration in the ancient world.

This detail signals a joyful, festive occasion, most likely the king's wedding.

Every sense in this psalm is engaged, not just sight and hearing.

🌿 Myrrh, aloes, cassia were costly spices

💰 Scented garments signaled wealth and joy

💒 This detail points to a wedding scene

📖 The psalm engages every sense

## 🐘 Out Of The Ivory Palaces, Whereby They Have Made Thee Glad

Ivory was an extremely costly imported material in the ancient world.

Palaces decorated with ivory inlay signaled enormous royal wealth.

"Whereby they have made thee glad" points to music and celebration filling those palace rooms.

This is not a humble home, it is a joyful, glittering, royal dwelling.

🐘 Ivory was extremely costly to import

🏰 Ivory palaces signaled enormous wealth

🎶 Music filled these rooms with joy

📖 This king's home matched his glory

## 👸 Kings' Daughters Were Among Thy Honourable Women

This pictures a royal court filled with women of high status and honor.

"Kings' daughters" means princesses from other nations, showing this king's wide influence.

Their presence at his court was itself a mark of respect from other kingdoms.

The wedding scene widens here to show the king's larger royal standing.

👸 Kings' daughters means visiting princesses

🏛️ Their presence honored this king's court

🌍 It showed influence beyond his own land

📖 The scene widens to his standing

## 👑 The Queen In Gold Of Ophir

"Ophir" was a distant region famous across the ancient world for producing fine gold.

Gold of Ophir was considered the very best gold a person could own.

The queen stands at the king's right hand, the place of highest honor.

Every detail in this verse points to unmatched wealth and status.

👑 Ophir was famous for the finest gold

💍 The queen wore the very best gold

➡️ Right hand marked the place of honor

📖 Every detail signals unmatched status

# Psalms 45:10-13
# 👂 Hearken, O Daughter, And Consider
---
## 👂 Hearken, O Daughter, And Consider, And Incline Thine Ear

The psalm suddenly turns to speak directly to the bride herself.

"Hearken" means listen closely, not just hear in passing.

"Incline thine ear" repeats the same idea using a different picture.

Hebrew poetry often says one thing twice using two different images.

She is being asked to take this counsel seriously before the marriage begins.

👂 Hearken means listen closely, not casually

🔁 Incline thine ear repeats the idea

💍 This counsel comes before the marriage

📖 Hebrew poetry often doubles one point

## 🏠 Forget Also Thine Own People, And Thy Father's House

Ancient marriage often meant a woman left her homeland to join her husband's household.

"Forget" here does not mean erase her memory completely.

It means shifting her deepest loyalty to her new home and husband.

This request would have carried real emotional weight for the bride.

🏠 Marriage often meant leaving her homeland

🔄 Forget means shifting loyalty, not erasing memory

💔 This request carried real emotional weight

📖 A new home meant a new loyalty

## 💕 So Shall The King Greatly Desire Thy Beauty

Her willingness to leave her old life is directly tied to the king's delight in her.

"Greatly desire" points to deep, genuine delight, not mere duty.

"For he is thy Lord" reminds her that this relationship also involves authority, not just romance.

"Worship thou him" means she is called to honor him as her husband and sovereign.

Love and reverence are pictured together here, not as opposites.

💕 Greatly desire means genuine delight

👑 He is thy Lord names his authority

🙏 Worship thou him calls for honor

📖 Love and reverence belong together here

## 🏛️ The Daughter Of Tyre Shall Be There With A Gift

Tyre was a wealthy trading city known across the ancient world for its riches.

"The daughter of Tyre" likely represents that city bringing tribute to the wedding.

"Even the rich among the people shall intreat thy favour" pictures wealthy nations seeking her goodwill.

Even foreign nations of great means are pictured honoring this royal marriage.

🏛️ Tyre was a wealthy trading city

🎁 The gift signaled respect and tribute

🌍 Even wealthy nations seek her favor

📖 This king's fame reaches beyond his land

## ✨ The King's Daughter Is All Glorious Within

This line shifts focus from outward wealth to inward character.

"Glorious within" means her worth is not only about appearance or riches.

The wedding scene has celebrated jewelry, gold, and gifts up to this point.

Here the psalm insists that true glory starts on the inside.

✨ Glorious within points to inward worth

💎 Not only outward wealth and beauty

🔄 The focus shifts from riches to character

📖 True glory starts on the inside

## 🥇 Her Clothing Is Of Wrought Gold

"Wrought gold" means gold that has been carefully worked and shaped by a skilled craftsman.

This was not simple jewelry, it was elaborate, custom made clothing.

Her outward appearance now matches the inward glory described just before this.

Great skill and great cost both went into preparing her for this moment.

🥇 Wrought gold means carefully crafted gold

🧵 This was elaborate, custom clothing

✨ Her appearance now matches her inner glory

📖 Both skill and cost prepared her

# Psalms 45:14-17
# 🎉 She Shall Be Brought Unto The King
---
## 🪡 She Shall Be Brought Unto The King In Raiment Of Needlework

"Raiment of needlework" describes clothing decorated with detailed, hand sewn embroidery.

This kind of work took many hours of skilled labor to complete.

"Brought unto the king" describes the bride's formal procession into his presence.

Every detail of this moment was prepared with care, nothing was rushed.

🪡 Needlework meant detailed hand sewn embroidery

⏳ This clothing took many hours to make

🚶 Brought unto the king describes her procession

📖 Nothing about this moment was rushed

## 😄 With Gladness And Rejoicing Shall They Be Brought

"They" refers to the bride and the virgins who accompany her into the palace.

Gladness and rejoicing describe genuine joy, not formal politeness.

"They shall enter into the king's palace" pictures the wedding procession reaching its destination.

The whole wedding scene has been building toward this joyful entrance.

👭 They refers to the bride and companions

😄 Gladness and rejoicing mean genuine joy

📢 This was a public celebration

📖 The scene builds to this entrance

## 👨‍👦 Instead Of Thy Fathers Shall Be Thy Children

The psalm shifts here from the wedding day to the years that follow.

"Instead of thy fathers" means the king's sons will take his ancestors' place.

"Whom thou mayest make princes in all the earth" pictures his sons ruling widely.

The king's legacy is pictured continuing for generations after him.

👨‍👦 Fathers replaced by sons in this picture

🌍 His sons will rule widely as princes

🔄 The focus shifts to future generations

📖 A king's legacy outlives his own life

## 📝 I Will Make Thy Name To Be Remembered In All Generations

This is the psalmist's own promise, not a wish or a guess.

"Remembered in all generations" means this king's fame will never fade with time.

"Therefore shall the people praise thee for ever and ever" closes the psalm on eternal praise.

If this king truly points to Christ, that promise still holds true today.

📝 This is a promise, not a guess

⏳ Remembered in all generations means lasting fame

🙌 The psalm closes on eternal praise

📖 That promise still holds true today
`.trim();

export const PSALMS_FORTY_FIVE_PERSONAL_SECTIONS = parsePsalmsFortyFiveRawNotes(PSALMS_FORTY_FIVE_RAW_NOTES);
