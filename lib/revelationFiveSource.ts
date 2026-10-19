export type RevelationFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationFiveRawNotes(rawText: string): RevelationFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 5:${startVerse}` : `Revelation 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Revelation 5 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_FIVE_RAW_NOTES = `# Revelation 5:1-2
# 📜 A Book Sealed With Seven Seals
---
## 📜 A Book Written Within And On The Backside

This "book" is a scroll, a long sheet rolled up, not a book with pages.

Writing on both sides was unusual and meant one thing.

There was far too much written to fit on one side alone.

This scroll holds something enormous, something too large for the normal space.

📜 A book here means a scroll
✍️ Writing on both sides was rare
📏 It held too much for one side
📖 This scroll holds something enormous

## 🔒 Sealed With Seven Seals

A seal was a blob of wax pressed with a signet, locking a document shut.

Breaking a seal meant you had the authority to act on what was inside.

Seven seals on one scroll meant it was sealed completely, layer after layer.

No one could read even a portion of it without full authority to open the whole thing.

🔒 A seal locked a scroll shut
👑 Breaking it required real authority
🔢 Seven means sealed completely
📖 No partial access to this scroll exists

## 📣 Who Is Worthy To Open The Book

This question is not about physical strength to break a wax seal.

It is about moral and legal right, about who actually deserves to act on what is inside.

The scroll likely holds God's plan for history, judgment, and redemption moving forward.

Whoever opens it does not just read it, he sets its contents into motion.

📣 Worthy here means moral right
⚖️ Not about physical strength
📜 The scroll holds God's unfolding plan
📖 Opening it sets history into motion

# Revelation 5:3-4
# 😭 No Man Found Worthy
---
## 🌍 No Man In Heaven Nor In Earth Nor Under The Earth

John names every possible location a worthy being could come from.

Heaven covers angels and every exalted being there.

Earth covers every living human being.

Under the earth covers the dead, every person who already died.

Every single created being, searched everywhere that exists, comes up empty.

🌍 Every realm gets searched completely
👼 Heaven covers angels and the exalted
🧍 Earth covers every living person
📖 Under the earth covers the dead

## 🚫 Neither To Look Thereon

The search in this verse goes further than just opening the scroll.

Not one single being was even allowed to look at what was written inside it.

This is not a contest someone barely lost.

No one anywhere came remotely close to qualifying.

🚫 No one could even view the scroll
🔒 This goes beyond failing to open it
🏆 It was not a close contest
📖 No one came close to qualifying

## 😭 I Wept Much

John's weeping is not a small, polite sadness.

The Greek word behind it pictures loud, open sobbing, the kind that cannot be hidden.

If no one can open the scroll, God's plan for history seems stuck forever.

John is not crying over curiosity, he is crying over what feels like a dead end.

😭 Wept much means loud, open sobbing
🚫 Not quiet or polite sadness
⏸️ History seems permanently stuck
📖 John fears a real dead end

# Revelation 5:5-7
# 🦁 The Lion Who Is A Lamb
---
## 🦁 The Lion Of The Tribe Of Juda

This title points straight back to a blessing Jacob gave his son Judah in Genesis.

A lion pictures strength, courage, and the right to rule as king.

Jewish readers already expected the Messiah to come from Judah's tribe.

This is the first direct confirmation in the chapter of exactly who can open the scroll.

🦁 Lion pictures strength and the right to rule
📜 Juda recalls Jacob's blessing in Genesis
👑 Jewish readers expected Messiah from Judah
📖 This names who alone can open it

## 🌱 The Root Of David

"Root" pictures where something comes from, its very source.

David was Israel's greatest king, and God promised his throne would last forever.

Calling Jesus the Root, not just a branch, says He is David's source, not only his descendant.

He existed before David and gave David his throne in the first place.

🌱 Root means the source of something
👑 David received an everlasting throne promise
⬆️ Jesus is David's source, not just descendant
📖 He came before the king He descended from

## 🐑 A Lamb As It Had Been Slain

Right after hearing about a Lion, John turns and sees a Lamb instead.

This is the central surprise of the whole chapter.

The lamb still shows marks of having been killed, even though it is alive and standing.

Strength to open the scroll comes through a sacrifice, not through force or conquest.

🐑 A Lamb appears where a Lion was expected
😲 This is the chapter's central surprise
✝️ The lamb bears marks of death
📖 Victory comes through sacrifice, not force

## 💪 Seven Horns And Seven Eyes

A horn in scripture pictures strength and the power to fight.

An eye pictures sight, knowledge, and awareness of everything happening.

Seven again pictures completeness, not a literal count of seven horns.

This Lamb has complete power and complete knowledge at once.

💪 A horn pictures strength and power
👁️ An eye pictures knowledge and sight
🔢 Seven means complete, not literal
📖 The Lamb holds complete power and knowledge

## 🕊️ The Seven Spirits Of God Sent Forth Into All The Earth

This same phrase already appeared in chapter four describing the Holy Spirit's fullness.

Here that same Spirit is pictured as sent out, active everywhere on earth.

The Lamb is not separate from this sending, He is the one through whom it happens.

Nothing on earth stands outside the reach of this complete, active Spirit.

🕊️ This phrase names the Holy Spirit's fullness
🌍 Here that Spirit is sent out actively
🐑 The Lamb sends the Spirit forth
📖 Nothing on earth escapes His reach

## 🙌 He Came And Took The Book

The Lamb does not grab the scroll by force or snatch it away.

He comes forward and receives it, the way someone is handed what already belongs to them.

This single action answers the open question from the start of the chapter.

The one truly worthy has finally stepped forward to act.

🙌 He receives it, he does not grab it
🎁 It is handed to him as his own
❓ This answers the chapter's open question
📖 The worthy one has stepped forward

# Revelation 5:8-10
# 🎵 A New Song
---
## 🎻 Harps And Golden Vials Full Of Odours

Harps here picture worship, music offered straight to God.

A vial was a small bowl or container, not a modern vial shape.

"Odours" refers to incense, a sweet smelling smoke burned as an offering.

Both pictures together show worship reaching God through sound and through scent at once.

🎻 Harps picture worship through music
🏺 A vial was a small bowl
🌿 Odours means sweet smelling incense
📖 Worship here reaches God two ways

## 🙏 Which Are The Prayers Of Saints

The incense itself is explained directly, it pictures the prayers of God's people.

Smoke rising upward was a natural, visible picture of a prayer rising to heaven.

Every quiet prayer ever prayed by a believer is pictured here as reaching God's presence.

Nothing prayed in faith is ever lost along the way.

🙏 Incense pictures believers' prayers
⬆️ Rising smoke pictured prayers rising
🧍 Every believer's prayer is included
📖 No true prayer is ever lost

## 🎵 They Sung A New Song

This song is called new because nothing like it could be sung before this moment.

It specifically celebrates the Lamb being found worthy and taking the scroll.

Old songs praised God for creation and for past deliverance.

This new song praises something that has only now become true.

🎵 New means never sung before now
🐑 It celebrates the Lamb's worthiness
📜 Older songs praised past deeds
📖 This song praises something brand new

## 🩸 Thou Wast Slain And Hast Redeemed Us

"Redeemed" means bought back, often with the picture of paying a price to free a slave.

The price paid here is named directly, the Lamb's own blood.

This was not a general gesture, it purchased specific people out of real bondage to sin.

The song ties His death directly to their freedom, not to His death alone.

🩸 Redeemed means bought back with a price
💰 Slaves were freed by a price paid
✝️ Blood is named as the price here
📖 His death purchased their freedom

## 🌍 Every Kindred And Tongue And People And Nation

These four words stack together on purpose, covering every possible way to divide humanity.

Kindred points to family and bloodline.

Tongue points to language.

People and nation point to culture and political identity.

No group anywhere is left outside the reach of this redemption.

🌍 Four words cover all possible divisions
👪 Kindred means family and bloodline
🗣️ Tongue means language
📖 No group is left outside this redemption

## 👑 Made Us Kings And Priests

This phrase already appeared once in chapter one, describing believers themselves.

A king rules, a priest represents people before God and brings them near to Him.

Normally in Israel these were two separate, protected roles given to different people.

Every redeemed believer here holds both roles at once, something no ordinary person held before.

👑 Kings and priests were once separate roles
🏛️ A king rules, a priest represents people
🔗 Believers now hold both roles together
📖 This was never possible before redemption

# Revelation 5:11-14
# 📣 Every Creature Worships
---
## 🔢 Ten Thousand Times Ten Thousand

This number describes an uncountable, overwhelming multitude of angels.

Ancient writers often used large multiplied numbers like this to mean more than anyone could ever count.

The point is not a precise headcount but the scale of this crowd.

Heaven's worship of the Lamb involves a company too vast for any number to capture.

🔢 This pictures an uncountable crowd
✍️ Writers used big numbers for scale
🚫 Not meant as a precise count
📖 Heaven's worship is too vast to count

## 🎁 Power And Riches And Wisdom And Strength

This list names seven different things given to the Lamb in verse twelve, of which this is part.

Seven again pictures completeness, a full and total declaration of worth.

Each word names a different kind of greatness, not a repeated compliment.

Together they say nothing is missing from what the Lamb deserves.

🎁 Seven qualities are listed in full
🔢 Seven again pictures completeness
🏆 Each word names a different greatness
📖 Nothing is missing from His worth

## 🌊 Every Creature Which Is In Heaven And On The Earth

The circle of worshippers keeps expanding through this chapter.

It began with four living creatures and elders, then angels beyond counting, now every creature everywhere.

Heaven, earth, under the earth, and even the sea are all named specifically.

By the end of the chapter, nothing that exists anywhere is left silent.

🌊 Worship expands wider through the chapter
🔄 It grows from a few to everyone
🌍 Heaven, earth, and sea are all named
📖 Nothing that exists stays silent

## 🙇 The Four Beasts Said Amen

"Amen" is a Hebrew word meaning let it be so, a way of agreeing completely.

The four living creatures from chapter four speak this single word to close the scene.

After all the elaborate songs and declarations, their final word is simple agreement.

Sometimes the deepest worship is not more words, but full agreement with what has already been said.

🙇 Amen means let it be so
🗣️ The four creatures speak it together
🎵 It follows the elaborate songs before it
📖 Full agreement can be worship enough

## 🪑 The Elders Fell Down And Worshipped

This same posture already appeared earlier in this chapter and in chapter four.

Falling down pictures giving up every claim to honor in the presence of someone greater.

This chapter opened with a desperate search for someone worthy to open a scroll.

It closes with every creature everywhere bowed low before the one who was found.

🪑 Falling down gives up every claim
👑 It honors someone clearly greater
🔄 The chapter began searching for this one
📖 It closes with everyone bowed before him

## 🌊 Such As Are In The Sea

The ancient world often pictured the sea as the home of chaos and danger.

Even that realm, the one least expected to join in worship, is named here by itself.

No corner of creation, however feared or forgotten, is left out of this scene.

What once pictured chaos now adds its own voice to the one great chorus.

🌊 The sea was pictured as chaotic
😨 It was the least expected place
🔄 Even it joins this worship scene
📖 No corner of creation stays silent

## 📣 Blessing And Honour And Glory And Power

This exact list of four words already appeared once earlier in this chapter, given to the Lamb alone.

Here the same four words are repeated, this time by every creature everywhere at once.

The second time these words are spoken, the whole circle of worship has finished widening completely.

What started with one scroll and one worthy Lamb now fills everything that exists.

📣 This same list appeared once already
🔁 Now every creature repeats it
🔄 The circle of worship is now complete
📖 One scroll now fills all creation
`.trim();

export const REVELATION_FIVE_PERSONAL_SECTIONS = parseRevelationFiveRawNotes(REVELATION_FIVE_RAW_NOTES);
