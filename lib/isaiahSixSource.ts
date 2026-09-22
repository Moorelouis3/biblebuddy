export type IsaiahSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixRawNotes(rawText: string): IsaiahSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 6:${startVerse}` : `Isaiah 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 6 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIX_RAW_NOTES = `# Isaiah 6:1-4
# 👑 The King Enthroned
---
## 📅 In The Year That King Uzziah Died

"In the year that king Uzziah died" marks the exact moment of this vision.

Uzziah had reigned over Judah for more than fifty years.

That was one of the longest reigns in Judah's history.

His death left the nation uncertain about what would come next.

Isaiah's vision arrives right at that uncertain turning point.

📅 Isaiah dates the vision to Uzziah's death
👑 Uzziah reigned over fifty years
❓ His death left Judah uncertain
📖 The vision opens at that turning point
---
## 👁️ I Saw Also The LORD Sitting Upon A Throne

Isaiah is given a vision of God himself.

No earlier prophet had described seeing the LORD so directly.

Sitting upon a throne pictures God actively ruling, not merely present.

Judah's earthly king had just died, but the true King remained.

👁️ Isaiah sees the LORD directly
📜 No earlier prophet described this so openly
👑 A throne pictures active rule
📖 The true King remained after Uzziah
---
## ⬆️ High And Lifted Up

This phrase describes a throne set far above anything on earth.

It repeats nearly the same idea twice for emphasis.

Hebrew poetry often repeats an idea this way to strengthen it.

The same wording returns later in this book to describe God himself.

The repetition shows just how far above creation this throne truly sits.

⬆️ High and lifted up means exalted
🔁 The phrase repeats itself for emphasis
📚 Hebrew poetry repeats ideas to strengthen them
📖 The throne sits far above creation
---
## 👘 His Train Filled The Temple

Train here means the hem or the flowing edge of a royal robe.

A king's train filling a room pictured overwhelming presence.

The temple itself was too small to hold even the edge of God's robe.

Every part of that space belonged to him alone.

👘 Train means the hem of a robe
🏛️ A filled train pictures overwhelming presence
📏 Even the robe's edge filled the temple
📖 The whole space belonged to him
---
## 🔥 The Seraphims

Seraphim comes from a Hebrew word meaning to burn.

These are heavenly beings pictured as blazing, fiery, and holy.

This is the only chapter in the whole Bible naming them directly.

Their appearance signals a scene of overwhelming holiness around God's throne.

🔥 Seraphim means burning ones
👼 They are blazing, holy heavenly beings
📚 Isaiah 6 is their only appearance by name
📖 Their presence signals overwhelming holiness
---
## 🪽 Each One Had Six Wings

Six wings were not there for decoration.

Each pair had a separate purpose.

Two covered the face out of reverence.

Two covered the feet out of humility.

Two carried the seraph in flight.

Even a being this glorious could not look straight at God.

🪽 Six wings had three separate uses
🙈 Two covered the face in reverence
👣 Two covered the feet in humility
📖 Even seraphim could not look at God
---
## 🗣️ Holy, Holy, Holy, Is The LORD Of Hosts

This is the only attribute in the entire Bible said three times in a row about God.

Hebrew repeats a word to show emphasis instead of using extra adjectives.

Saying it three times pictures absolute, complete, total holiness.

No other quality of God gets repeated this way anywhere in scripture.

🗣️ Threefold repetition shows extreme emphasis
🔁 Hebrew repeats words instead of adding adjectives
✨ Holy here means completely set apart
📖 No other trait of God repeats like this
---
## 🌍 The Whole Earth Is Full Of His Glory

Glory here means the visible weight of God's presence and greatness.

The seraphim are not only praising God's holiness in heaven.

They are also declaring that his glory reaches every corner of the earth.

Nothing in all creation sits outside the reach of that glory.

🌍 Glory means the visible weight of God
🙌 The seraphim praise more than holiness
🌐 His glory reaches the whole earth
📖 Nothing in creation sits outside it
---
## 🚪 The Posts Of The Door Moved

The posts were the heavy stone or wood frame holding up the doorway.

A voice powerful enough to shake solid doorposts pictures overwhelming force.

This kind of trembling appears elsewhere in scripture whenever God draws near.

The whole building responds to the seraphim's cry as if it were alive.

🚪 Posts were the doorway's heavy frame
📢 The voice was powerful enough to shake them
⚡ Trembling often marks God drawing near
📖 The building reacts as if alive
---
## 💨 The House Was Filled With Smoke

Smoke and cloud often marked God's presence throughout the Old Testament.

The same imagery appears when God filled the tabernacle and later the temple with a cloud.

Isaiah is seeing the same holy presence that once filled Israel's place of worship.

The vision connects directly back to that older, familiar picture of God dwelling among his people.

💨 Smoke often marked God's presence
🏛️ The same cloud filled the tabernacle before
🔗 This vision echoes that earlier picture
📖 God still dwells among his people
---
# Isaiah 6:5-7
# 😢 Woe Is Me
---
## 😢 Woe Is Me! For I Am Undone

Woe was a formal word used to announce coming ruin or judgment.

Isaiah turns that same word on himself the instant he sees God's holiness.

Undone means completely ruined or unraveled, like something falling apart.

Standing this close to pure holiness exposes every flaw Isaiah has.

😢 Woe announces ruin, even here on himself
💔 Isaiah turns the word on himself
🧵 Undone means completely unraveled
📖 Holiness exposes every flaw nearby
---
## 👄 I Am A Man Of Unclean Lips

Unclean lips does not describe rude or dirty language.

It points to a deeper sinfulness that shows up in everything Isaiah says.

Lips represented the whole inner life in Hebrew thought, not just speech.

Isaiah confesses that his very words are shaped by that inner sin.

👄 Unclean lips means more than bad language
🫀 Lips represented the whole inner life
😔 Isaiah confesses a deep inward sin
📖 His words reveal what is inside him
---
## 👥 I Dwell In The Midst Of A People Of Unclean Lips

Isaiah does not only confess his own sin.

He includes his entire nation in the same confession.

Judah as a whole shared this same corruption of speech and heart.

No one in the room, including the prophet, stands clean before this vision.

👥 Isaiah confesses his nation's sin too
🏘️ Judah shared the same corruption
🙋 Even the prophet is not exempt
📖 No one stands clean before this vision
---
## 👑 Mine Eyes Have Seen The King, The LORD Of Hosts

Many in the ancient world believed no one could see God and survive.

Isaiah expects this vision to cost him his life.

Seeing the King directly was thought to be far too much for any mortal to bear.

His cry of woe comes from genuine fear, not simply politeness.

👑 Seeing God was thought to be fatal
😨 Isaiah expected this vision to cost his life
🚫 No mortal was thought able to bear it
📖 His fear is real, not just politeness
---
## 🔥 A Live Coal In His Hand, Which He Had Taken With The Tongs From Off The Altar

The altar was the place where sacrifices for sin were offered.

A coal from that altar carried the meaning of the sacrifice with it.

Tongs were used because the coal was too hot to touch directly.

The cleansing about to happen is tied directly to the altar of sacrifice.

🔥 The altar was where sin was atoned for
🪙 The coal carried that meaning with it
🥢 Tongs were needed because it was so hot
📖 Cleansing here is tied to sacrifice
---
## ✨ This Hath Touched Thy Lips, And Thine Iniquity Is Taken Away, And Thy Sin Purged

The coal touches the exact place Isaiah confessed, his lips.

Iniquity taken away means the guilt itself is fully removed, not simply excused.

Purged means burned away completely, matching the image of the hot coal.

Isaiah is cleansed in the very place he admitted his sin.

✨ The coal touches the place he confessed
🧹 Iniquity taken away means guilt fully removed
🔥 Purged means burned away completely
📖 Cleansing lands exactly where confession happened
---
# Isaiah 6:8-10
# 📢 Here Am I, Send Me
---
## 🗣️ Whom Shall I Send, And Who Will Go For Us

The word "us" suggests more than one voice speaking here.

Some see this as God speaking to the heavenly beings surrounding his throne.

Others connect it to the same plural language used back in Genesis at creation.

Either way, this is a decision made within God's own council, not a human meeting.

🗣️ Us suggests more than a single voice
👼 Some connect this to the heavenly beings present
📜 Others connect it to Genesis creation language
📖 The decision is God's own, not human
---
## ✋ Here Am I Send Me

Isaiah had just confessed he was ruined and unclean minutes earlier.

Now that same voice volunteers for the hardest assignment in the book.

Cleansing came before the calling, not after proving himself worthy.

His answer is immediate, with no bargaining and no conditions attached.

✋ Isaiah volunteers right after his cleansing
🔄 Cleansing came before the calling
⚡ His answer is immediate
📖 No bargaining, no conditions attached
---
## 👂 But Understand Not

This is not a normal call to preach good news.

God tells Isaiah in advance that most listeners will not respond well.

Hearing the words will not automatically lead to understanding them.

Isaiah is being sent into a mission that looks like failure from the outside.

👂 This is not an ordinary preaching call
⚠️ God warns the message will be resisted
🚫 Hearing will not guarantee understanding
📖 The mission looks like failure outwardly
---
## 👀 But Perceive Not

This line repeats the same pattern as the one before it, seeing without understanding.

Hebrew poetry often says one idea twice using two different senses, hearing and seeing.

Perceive means to grasp the meaning, not simply to notice something happened.

The people will witness real events and still miss what those events mean.

👀 This repeats the hearing line's pattern
🔁 Hebrew poetry restates ideas through paired senses
🧠 Perceive means grasping meaning, not just noticing
📖 They will witness events and miss the meaning
---
## 🫀 Make The Heart Of This People Fat

A fat heart in this culture pictured dullness, not a medical condition.

Fat here means thick, sluggish, and slow to respond to anything.

Isaiah's preaching would confirm a hardness the people had already chosen.

God is not creating stubbornness from nothing, he is naming what is already there.

🫀 Fat heart pictures dullness, not a health issue
🐌 It means thick, sluggish, unresponsive
📢 Preaching confirms a hardness already chosen
📖 God names what is already there
---
## 👂 Make Their Ears Heavy, And Shut Their Eyes

Heavy ears and shut eyes describe senses that stop functioning as they should.

This is not God physically forcing anyone to disobey.

It describes the natural result of a people who had refused to listen for years.

The senses shutting down mirror a heart that had already shut God out.

👂 Heavy ears mean senses no longer functioning
🚫 God is not forcing anyone to disobey
📅 This is the result of years of refusal
📖 Shut senses mirror a shut heart
---
## 💔 And Convert, And Be Healed

Convert here means turning back to God in genuine repentance.

This judgment does not come out of nowhere.

It responds to a people who kept refusing to turn for years.

Healed pictures full restoration, the very thing being placed out of reach.

The door was not slammed shut without cause.

It was already being refused long before this moment.

💔 Convert means turning back to God
⏳ This judgment follows years of refusal
🩹 Healed means full restoration
📖 The door was refused before it closed
---
# Isaiah 6:11-13
# 🌱 A Holy Seed Remains
---
## ❓ Lord, How Long?

Isaiah does not question the judgment itself.

He asks only how long it will have to last.

This same question appears throughout scripture whenever God's people face deep suffering.

It is a question of faith, not doubt, still spoken directly to God.

❓ Isaiah does not question the judgment
⏳ He asks only how long it lasts
📜 This question appears often in scripture
📖 It is faith, not doubt
---
## 🏚️ Until The Cities Be Wasted Without Inhabitant

Wasted here means left in ruins, emptied out completely.

Cities without a single inhabitant pictures total, not partial, destruction.

This describes the coming Assyrian and Babylonian invasions still years away.

God answers Isaiah's question honestly, without softening how far this judgment will reach.

🏚️ Wasted means left completely in ruins
🚪 Empty cities picture total destruction
⚔️ This points to invasions still years away
📖 God answers honestly, without softening it
---
## 🌍 The LORD Have Removed Men Far Away

This describes the coming exile, entire populations taken from their homeland.

Removing men far away breaks apart families, towns, and daily life all at once.

Other ancient empires used exile on purpose to prevent future rebellion.

Judah's coming exile follows that same harsh, well known pattern.

🌍 This describes the coming exile
💔 Exile breaks apart families and towns
⚔️ Empires used exile to prevent rebellion
📖 Judah's exile follows that same pattern
---
## 🏜️ A Great Forsaking In The Midst Of The Land

Forsaking here means the land itself is abandoned and left empty.

Farms, homes, and streets that once held daily life stand deserted.

This is not a single city's downfall, it describes the whole land together.

The picture is bleak on purpose, so no one mistakes how serious this judgment is.

🏜️ Forsaking means the land left abandoned
🏘️ Homes and streets stand deserted
🗺️ The whole land is affected, not one city
📖 The bleakness is intentional
---
## 🌳 Yet In It Shall Be A Tenth

After all that devastation, the chapter does not end in total loss.

A tenth, a small surviving remnant, is promised to remain.

This remnant becomes one of the most important ideas in the rest of Isaiah.

Judgment this severe still leaves room for God to preserve a future.

🌳 A tenth remnant is promised
🌱 The chapter does not end in total loss
📚 Remnant becomes a major theme in Isaiah
📖 Judgment still leaves room for a future
---
## 🌰 As A Teil Tree, And As An Oak

A teil tree is an old English name for the terebinth tree.

Both the teil tree and the oak were known for their thick, strong trunks.

When these trees are cut down, a stump often remains alive underground.

That stump is the picture Isaiah reaches for to describe what survives judgment.

🌰 Teil tree is an old name for terebinth
🌳 Both trees were known for strong trunks
🪵 A cut stump can remain alive underground
📖 That stump pictures what survives judgment
---
## 🌱 The Holy Seed Shall Be The Substance Thereof

Substance here refers to the living stump left after the tree is cut down.

The holy seed names that surviving remnant directly for the first time in this chapter.

Everything wasted, forsaken, and cut away still leaves one thing standing.

God's judgment reaches Israel, but it does not manage to reach the promise itself.

🌱 Substance means the living stump that remains
✨ Holy seed names the surviving remnant
🪓 Even total loss leaves one thing standing
📖 Judgment cannot reach the promise itself
`.trim();

export const ISAIAH_SIX_PERSONAL_SECTIONS = parseIsaiahSixRawNotes(ISAIAH_SIX_RAW_NOTES);
