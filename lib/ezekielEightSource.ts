export type EzekielEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielEightRawNotes(rawText: string): EzekielEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 8:${startVerse}` : `Ezekiel 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezekiel 8 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_EIGHT_RAW_NOTES = `# Ezekiel 8:1-4
# 🔥 Carried To Jerusalem In A Vision
---
## 🗓️ In The Sixth Year, In The Sixth Month, In The Fifth Day Of The Month

This date is counted from when King Jehoiachin was taken captive to Babylon.

Ezekiel used that count because he was living far from home in exile.

By this count, about a year had passed since the vision in chapter one.

Even in exile, God kept speaking to his people on a clear timeline.

🗓️ Counted from Jehoiachin's exile
📍 Ezekiel lived far from home
⏳ About a year since chapter one
📖 God kept speaking on a clear timeline

## 👴 The Elders Of Judah Sat Before Me

These elders were respected leaders among the Israelites already exiled in Babylon.

Sitting before a prophet was a normal way to seek a word from God.

They likely hoped for news of comfort or a message of hope.

Instead, Ezekiel was pulled into a vision that exposed sin happening far away.

🙏 Sitting before him sought a word
💭 They likely hoped for comfort
👁️ He was pulled into a vision instead
📖 It exposed sin happening far away

## ✋ That The Hand Of The Lord GOD Fell There Upon Me

This phrase is Ezekiel's standard way to describe a vision beginning.

It does not mean a physical hand touched him in the room.

The phrase signals that God's power is about to take over his senses.

Nearly every major vision in this book opens with this exact announcement.

✋ A set phrase for visions starting
🚫 Not a literal physical touch
⚡ God's power takes over his senses
📖 This phrase opens major visions

## 🔥 A Likeness As The Appearance Of Fire

This is the same glowing figure Ezekiel already saw beside the river Chebar.

Fire below the waist and brightness above describes someone hard to look at directly.

"Amber" was a glowing, golden colored material known throughout the ancient world.

The vision will not let Ezekiel forget exactly who sent him here.

🔥 Same figure seen by the river
✨ Brightness makes it hard to view
🟡 Amber means a glowing golden material
📖 The vision reminds him who sent him

## 🕊️ The Spirit Lifted Me Up Between The Earth And The Heaven

This does not mean Ezekiel physically left his house in Babylon.

He stayed seated with the elders the whole time.

Only his mind and his sight traveled to Jerusalem in this vision.

This was a visionary journey, not a literal flight through the sky.

🪑 His body never left the room
🧠 Only his mind and sight traveled
👁️ This was a vision, not a flight
📖 God showed him Jerusalem from Babylon

## ✨ The Glory Of The God Of Israel Was There

Glory here means God's visible presence and the weight of his holiness.

This same glory had already appeared to Ezekiel once before, by the river.

Seeing it again ties this vision directly back to that earlier moment.

God's presence shows up before Ezekiel is shown any of the coming sin.

✨ Glory means God's visible presence
🔗 This ties back to the earlier vision
👀 Presence comes before the sin is shown
📖 He is present before judgment begins

# Ezekiel 8:5-6
# 🗿 The Image Of Jealousy
---
## 🗺️ Northward At The Gate Of The Altar

The altar sat in the inner court, the most sacred ground in the temple.

Placing an idol at its gate put sin right at the doorway to God.

This was not hidden somewhere distant or easy to miss.

The idol stood exactly where true worship was supposed to happen.

🗺️ The altar was the most sacred ground
🚪 The idol sat right at its gate
👀 This sin was not hidden away
📖 False worship replaced true worship's own spot

## 🗿 This Image Of Jealousy

The text never names exactly which idol stood in this spot.

Many scholars believe it may have been an image of Asherah, a Canaanite goddess.

It is called an image of jealousy because it provoked God's jealousy on purpose.

God's jealousy here means his right to be worshipped alone, not insecurity.

🗿 The exact idol is never named
👩 Many scholars suggest Asherah
🔥 It provoked God's jealousy by design
📖 God's jealousy means his right alone

## 🚪 That I Should Go Far Off From My Sanctuary

God says Israel's sin is what pushes him away from his own temple.

He is not abandoning his house for no reason at all.

Their choice to worship idols here is driving him out of his own home.

God's absence in Ezekiel is always a response to sin, never a surprise.

🚪 Sin pushes God from his own house
🙅 This is not abandonment without a cause
💔 Their idols are driving him away
📖 God's absence always has a reason

## 🔁 Turn Thee Yet Again, And Thou Shalt See Greater Abominations

This exact command repeats three times across this chapter.

Each time, Ezekiel is shown something worse than what came before.

The vision is built like a tour descending deeper into Israel's hidden sin.

This structure makes sure Ezekiel cannot look away or excuse what comes next.

🔁 This command repeats three times
📉 Each stop reveals something worse
🚶 The vision tours deeper into sin
📖 Ezekiel cannot look away from it

# Ezekiel 8:7-12
# 🐍 The Secret Chamber Of Idols
---
## 🕳️ Behold A Hole In The Wall

This was not a natural crack or an accident in the wall.

A hidden gap like this suggested something was concealed behind it on purpose.

Secret sin in this vision literally has to be dug out to be seen.

Whatever Israel's leaders hid, God makes sure Ezekiel finds it.

🕳️ This gap was not an accident
🙈 It suggested something hidden on purpose
⛏️ Hidden sin had to be dug out
📖 God makes sure it gets found

## ⛏️ Dig Now In The Wall

God does not simply show Ezekiel the hidden door.

He makes Ezekiel do the digging himself, with his own hands.

Taking part in uncovering the sin makes the vision harder to forget.

Ezekiel becomes a witness who helped expose it, not just a bystander.

⛏️ Ezekiel digs with his own hands
👁️ He is not just shown the sin
🧑‍⚖️ He becomes a witness, not a bystander
📖 Taking part makes it unforgettable

## 🐍 Every Form Of Creeping Things, And Abominable Beasts

These creatures were animals Israel's law called unclean to eat or worship.

This kind of animal worship was common in Egyptian religion at the time.

Carving these creatures on a temple wall mixed Egypt's gods into God's own house.

Israel had copied the very practices God rescued them from at the exodus.

🐍 These animals were unclean by law
🏺 This style of worship came from Egypt
🏛️ Egypt's gods were carved into God's house
📖 They copied what God rescued them from

## 🖼️ Pourtrayed Upon The Wall Round About

"Pourtrayed" is an old word meaning carved or painted onto a surface.

These were not small statues that could be tucked away out of sight.

They were permanent wall art, built right into the temple's own structure.

Whoever built this wanted the idols to stay for good, not for a season.

🖼️ Pourtrayed means carved or painted
🧱 This art was built into the wall
🏗️ It was made to be permanent
📖 The idols were meant to stay

## 👴 Seventy Men Of The Ancients

Seventy elders once stood with Moses as Israel's trusted leaders.

That number pictured the whole nation represented faithfully before God.

Here that same number of leaders stands before idols instead.

The very structure built to represent faithful Israel is now leading its betrayal.

👴 Seventy elders once stood with Moses
🤝 That number pictured the whole nation
🔄 The same number now leads betrayal
📖 Faithful leadership structure turned corrupt

## 📜 Jaazaniah The Son Of Shaphan

Shaphan was a faithful scribe who helped King Josiah restore true worship.

His son Jaazaniah is found here leading the exact opposite kind of worship.

Not every child follows a godly parent's example.

A good name in the family line is never a guarantee by itself.

📜 Shaphan helped restore true worship
👨‍👦 His son now leads idol worship
🔀 A godly parent is no guarantee
📖 Family history does not decide faith

## 🔥 Every Man His Censer In His Hand

A censer with rising incense normally pictured something good, prayer rising to God.

Here that same picture is aimed at idols instead.

The ritual looks like true worship to anyone watching from a distance.

The object was holy, but the direction it was pointed had corrupted everything.

🔥 Incense normally pictured prayer rising
🗿 Here it was offered to idols
👀 It looked like true worship nearby
📖 Direction matters more than ritual

## 🙈 The LORD Seeth Us Not

These leaders believed their secret room made them invisible to God.

They also told themselves God had left the earth entirely.

Both beliefs turn out to be completely wrong.

God was watching that exact room closely enough to show it to a prophet in exile.

🙈 They believed God could not see them
🚪 They thought God had left the earth
❌ Both beliefs were completely wrong
📖 God was watching the whole time

# Ezekiel 8:13-15
# 😢 Weeping For Tammuz
---
## 😢 Women Weeping For Tammuz

"Tammuz" was a Babylonian god connected to crops dying and reviving each year.

Worshippers mourned his yearly death as part of a seasonal fertility ritual.

Israelite women had adopted this foreign mourning practice as their own.

A ritual meant for a foreign god was being performed inside God's own courtyard.

🌾 Tammuz was linked to dying crops
📅 His death was mourned every year
👩 Israelite women adopted this ritual
📖 A foreign ritual filled God's courtyard

## 🚪 The Door Of The Gate Of The LORD's House

This mourning ritual was not practiced quietly inside a private home.

It happened right at the entrance to God's own house.

Anyone coming to worship would have walked straight past it.

Sin this visible had stopped being treated as shameful at all.

🚪 This happened at the temple's entrance
👀 Worshippers walked straight past it
😶 It was no longer treated as shameful
📖 Public sin had become normal here

## 📈 Thou Shalt See Greater Abominations Than These

This is the third and final time this exact warning is given.

Each stop in the vision has topped the one before it.

The worst scene in the whole chapter is still ahead.

God is building toward the deepest betrayal on purpose, not by accident.

📈 This is the third such warning
⬆️ Each scene outweighs the last
⏭️ The worst scene is still ahead
📖 This escalation is deliberate

# Ezekiel 8:16-18
# ☀️ Worshipping The Sun With Backs Turned
---
## 🛐 Between The Porch And The Altar

This narrow strip of ground sat between the temple building and its altar.

Only priests were normally allowed to stand in this exact space.

Placing sun worship here put idolatry in the most sacred ground in Israel.

Nothing in the whole temple complex stood closer to God's presence than this spot.

🛐 Only priests normally stood here
📍 This was the temple's holiest strip
🌞 Sun worship happened in that spot
📖 Nothing stood closer to God's presence

## 🔢 About Five And Twenty Men

Many scholars connect this number to the high priest plus Israel's priestly leaders.

Other scholars see a symbolic number representing the nation's full leadership.

Either way, this was not a handful of random troublemakers.

The very people responsible for guarding true worship were leading its collapse.

🔢 Many link this to priestly leaders
👥 Others see a symbolic full leadership
🚫 This was not random troublemakers
📖 Worship's guardians led its collapse

## 🙃 Their Backs Toward The Temple Of The LORD

Turning your back on something was an ancient sign of total rejection.

These men stood inside God's own house.

They fully rejected him right there.

Facing east to worship the sun meant literally facing away from God's presence.

No posture in the Bible pictures betrayal more plainly than this one.

🙃 A turned back signaled total rejection
🏠 This happened inside God's own house
🌅 Facing the sun meant facing from God
📖 No image pictures betrayal this plainly

## 🌿 They Put The Branch To Their Nose

No one knows for certain exactly what this gesture involved.

Many scholars connect it to a known pagan sun worship ritual.

Others read it as a rude or dismissive gesture aimed at God.

Either reading points to the same thing, worship aimed anywhere but at God.

🌿 The exact gesture is not fully clear
☀️ Many link it to a sun ritual
🙄 Others read it as a rude gesture
📖 Either way, it was not aimed at God

## 👁️ Mine Eye Shall Not Spare, Neither Will I Have Pity

This exact sentence already closed out the warning in the previous chapter.

Repeating it here ties the temple's idolatry to that same coming judgment.

This is legal language describing a verdict, not an emotional outburst.

God is confirming that the sentence already announced will actually be carried out.

👁️ This phrase already closed chapter seven
🔗 It ties idolatry to that judgment
⚖️ This is legal language, not rage
📖 The announced sentence will be carried out

## 📢 Though They Cry In Mine Ears With A Loud Voice, Yet Will I Not Hear Them

Crying out to God is not being rejected here as prayer itself.

It is being rejected as a way to avoid a judgment already decided.

Loud or sincere pleading cannot undo what unrepented sin already set in motion.

Real change, not loud appeals, was always what God was asking for.

📢 Crying out is not rejected as prayer
⏳ It cannot undo a decided judgment
🙅 Pleading cannot replace real change
📖 God was always asking for change
`.trim();

export const EZEKIEL_EIGHT_PERSONAL_SECTIONS = parseEzekielEightRawNotes(EZEKIEL_EIGHT_RAW_NOTES);
