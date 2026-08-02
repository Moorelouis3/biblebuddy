export type ExodusThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyThreeRawNotes(rawText: string): ExodusThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 33:${startVerse}` : `Exodus 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Exodus 33 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_THREE_RAW_NOTES = `# Exodus 33:1-3
# 🚶 God Tells Israel To Leave Without Him
---
## 🚶 Depart, And Go Up Hence

God tells Moses to leave Sinai and keep moving toward Canaan.

This command comes right after the golden calf disaster in chapter thirty two.

The journey is not canceled because of Israel's sin.

God still calls this the land He swore to Abraham, Isaac, and Jacob.

That promise reaches back three generations before Moses was even born.

God keeps an old promise even while His people are still in trouble.

🚶 Depart means leave Sinai now

📜 This follows right after the golden calf

🤝 The promise reaches back three generations

📖 God keeps His word despite their sin

## 👼 I Will Send An Angel Before Thee

God still promises to send an angel ahead of the people.

The angel will drive out the nations already living in Canaan.

Six different nations get named by name in this one verse.

Naming each one shows exactly how much land God still intends to give.

The promise stays detailed even in a moment of judgment.

👼 An angel still goes ahead of them

🗺️ The angel clears the way to Canaan

🔢 Six nations get named specifically

📖 The promise stays detailed despite judgment

## 🍯 A Land Flowing With Milk And Honey

This description of Canaan repeats words God used all the way back at the burning bush.

Exodus chapter three first used this exact phrase for the promised land.

Milk pictures healthy flocks and herds grazing on good pasture.

Honey pictures rich, wild abundance growing without much effort.

The destination has not changed even though the journey just got harder.

🍯 Milk and honey means rich abundance

🔥 The phrase first appeared at the burning bush

🐑 Milk pictures healthy flocks and herds

➡️ The destination stays the same despite the crisis

## 🐂 For Thou Art A Stiffnecked People

"Stiffnecked" pictures an ox that refuses to bend its neck for the yoke.

God used this exact word for Israel back in chapter thirty two.

Here God adds a hard line, He will not travel in the midst of them.

Nearness to a holy God is described as genuinely dangerous for a people this rebellious.

The distance is framed as protection, not just punishment.

🐂 Stiffnecked means an ox refusing its yoke

🔁 The same word appeared in chapter thirty two

⚠️ Closeness to God is treated as dangerous here

📖 Distance protects them more than it punishes them

# Exodus 33:4-6
# 😢 The People Mourn And Obey
---
## 😭 They Mourned, And No Man Did Put On Him His Ornaments

For the first time in this whole crisis, the people show real grief.

"Mourned" means an outward, physical show of grief, not just an inner feeling.

No man wears his ornaments here, meaning the jewelry normally worn with pride.

This grief comes after two chapters of denial and excuses.

A real change is finally starting to show on the outside.

😭 Mourned means an outward show of grief

💍 Ornaments means jewelry worn with pride

📈 This follows chapters of denial and excuses

📖 Their sorrow finally starts to show

## 🔁 I Will Come Up Into The Midst Of Thee In A Moment, And Consume Thee

God repeats the same stiffnecked warning from verse three here.

This is now the second time this exact danger gets stated plainly.

"In a moment" means suddenly, without any extra warning beyond this.

The warning is not new information, it is a reminder of real danger.

Repetition here is meant to be taken seriously, not skipped over.

🔁 This warning repeats the one from verse three

⏱️ In a moment means suddenly

⚠️ The danger is stated a second time

📖 Repetition signals how serious this really is

## 💍 Therefore Now Put Off Thy Ornaments From Thee

Removing ornaments becomes a formal command here, not just something that happened.

Taking off jewelry acted as a visible sign of humility and mourning.

Later in Scripture, sackcloth and ashes serve this same kind of purpose.

God says this so He may decide what to do with them.

Even God's own response to their sin is not yet fully decided.

💍 Taking off ornaments showed humility

🪨 Sackcloth later serves this same purpose

❓ God has not yet decided their fate

➡️ Israel must wait to learn the outcome

## 🪨 Stripped Themselves Of Their Ornaments By The Mount Horeb

Obedience follows right away, without delay or argument.

"Horeb" is simply another name for Mount Sinai.

The same mountain carries both names elsewhere in this book.

This is not a different location, just a second name for the one they know.

Quick obedience here contrasts sharply with the disobedience of chapter thirty two.

🪨 Horeb is another name for Sinai

✅ The people obey without delay

🔁 One mountain carries two different names

📖 Obedience here contrasts chapter thirty two's failure

# Exodus 33:7-11
# ⛺ The Tent Of Meeting Moves Outside The Camp
---
## 🏕️ Moses Took The Tabernacle, And Pitched It Without The Camp

This is not yet the tabernacle described back in chapters twenty five through thirty one.

That full structure will not be finished until Exodus chapter forty.

This is a temporary tent Moses sets up himself.

He calls it the Tabernacle of the congregation, a meeting place.

Its location outside the camp pictures the broken closeness from chapter thirty two.

🏕️ This tent is not the final tabernacle

🔨 The real tabernacle is not built yet

📍 Pitched outside the camp shows real distance

📖 Location here pictures a broken closeness

## 🚶 Every One Which Sought The LORD Went Out Unto The Tabernacle

Anyone who wanted to seek God now had to leave the camp to do it.

God's presence is no longer available inside the camp itself.

This detail shows how seriously the golden calf changed things.

Seeking God now took a deliberate, visible walk away from everyone else.

🚶 Seeking God now meant leaving camp

📍 God's presence sat outside, not within

⚠️ This shows how much the sin cost them

➡️ Every visit to God was now visible

## 👥 All The People Rose Up, And Stood Every Man At His Tent Door

The whole camp watches whenever Moses walks toward the tent.

Standing at their own tent doors, they follow him with their eyes.

Nobody else in this story gets treated with this kind of shared attention.

Moses' walk to the tent becomes a public event every single time.

👥 The whole camp watches Moses walk

🚪 Everyone stands at their own tent door

👀 They follow him the entire way

➡️ Moses' walk becomes a public event

## ☁️ The Cloudy Pillar Descended, And Stood At The Door Of The Tabernacle

This cloud pillar first appeared back in chapter thirteen to guide Israel's travels.

Now it marks this specific meeting tent whenever Moses goes inside.

The cloud gives the whole camp visible proof that God really meets with Moses.

Nobody has to take this meeting on faith alone.

☁️ The cloud pillar first appeared in chapter thirteen

📍 It now marks the meeting tent specifically

👁️ It gives the camp visible proof

📖 God's meetings with Moses were not hidden

## 🙇 All The People Rose Up And Worshipped, Every Man In His Tent Door

The people respond to the cloud with worship, not just curiosity.

Each man still worships from his own tent door.

Nobody approaches the tent directly themselves in this scene.

Worship and distance happen together here.

🙇 The people worship at a distance

🚪 Each man stays at his own door

📏 Nobody approaches the tent directly

➡️ Distance and worship exist together here

## 🗣️ The LORD Spake Unto Moses Face To Face, As A Man Speaketh Unto His Friend

This face to face closeness is unique to Moses among every prophet in the Bible.

Deuteronomy chapter thirty four later confirms that no prophet like Moses ever rose again.

That verse calls him the one the LORD knew face to face.

This friendship level access sets Moses apart from every other leader in Scripture.

🗣️ Face to face describes real closeness

📖 Deuteronomy thirty four confirms this uniqueness

🤝 Moses is compared to a close friend

➡️ No other prophet matched this closeness

## 🧍 His Servant Joshua, The Son Of Nun, Departed Not Out Of The Tabernacle

Joshua stays behind in the tent even after Moses leaves.

He is introduced here as Moses' personal servant, not just a soldier.

This small detail quietly sets Joshua up as Moses' future successor.

His devotion shows up here long before he ever leads on his own.

🧍 Joshua stays behind in the tent

🎖️ He is named as Moses' personal servant

🔮 This quietly points to his future leadership

📖 Devotion here comes before any real authority

# Exodus 33:12-17
# 🙏 Moses Pleads For God's Presence
---
## ❓ Thou Hast Not Let Me Know Whom Thou Wilt Send With Me

Moses presses God on a question left unanswered since the start of this chapter.

God promised an angel guide back in verse two, but never named who leads it.

Moses wants a clear answer, not a vague promise.

He reminds God of God's own past words, "I know thee by name."

❓ Moses presses for a clear answer

👼 The angel guide was never named

🙋 Moses uses God's own past words

➡️ Moses is building toward a bigger request

## 🧭 Shew Me Now Thy Way, That I May Know Thee

Moses asks to actually know God's own character, not just directions to a destination.

"Shew" is an old spelling of show.

Knowing God's way means understanding how God thinks and acts, not just where to walk.

Moses ties his own request directly to the future of the whole nation.

🧭 Shew means show, an old spelling

🙏 Moses wants to know God's character

🗺️ This is bigger than directions to Canaan

📖 Moses connects his request to the whole nation

## 🌟 My Presence Shall Go With Thee, And I Will Give Thee Rest

This directly reverses the warning God gave back in verse three.

There God said He would not go up in the midst of them.

Here God promises the opposite, His own presence will go with them.

Moses' plea genuinely changes the outcome, the same pattern already seen in chapter thirty two.

🔄 This reverses the warning from verse three

🌟 God now promises His own presence

🙏 Moses' plea genuinely changes the outcome

📖 The same pattern appeared in chapter thirty two

## 🛑 If Thy Presence Go Not With Me, Carry Us Not Up Hence

Moses is still not satisfied with a general promise.

He wants this exact point stated so clearly it cannot be missed.

Without God's presence, Moses would rather stay right where they are.

Reaching Canaan means nothing to him without God going too.

🛑 Moses refuses to move without God

🙅 A vague promise is not enough for him

🗺️ Canaan means nothing without God's presence

➡️ Moses pushes for one more guarantee

## 🌍 So Shall We Be Separated From All The People Upon The Face Of The Earth

Moses names the real thing that makes Israel different from every other nation.

It was never the land itself or their own effort.

God's presence traveling with them is the one thing no other nation has.

Without it, arriving in Canaan would make them just another people in another territory.

🌍 God's presence is what sets Israel apart

🗺️ The land alone was never the real difference

🚶 No other nation has this presence

📖 Presence, not land, marks them as distinct

## ✅ I Will Do This Thing Also That Thou Hast Spoken

God agrees to everything Moses just asked for.

The reason given is Moses' own relationship with God, "thou hast found grace in my sight."

God also repeats "I know thee by name," the same phrase Moses used back in verse twelve.

The request is granted because of Moses personally, not because Israel earned it.

✅ God grants the whole request

🙏 The reason is Moses' own relationship with God

🔁 I know thee by name repeats verse twelve

➡️ Moses reaches for an even bigger request next

# Exodus 33:18-23
# ✨ Moses Asks To See God's Glory
---
## 🙏 I Beseech Thee, Shew Me Thy Glory

"Beseech" means to plead earnestly, not just to ask politely.

Moses used this same intensity of pleading back in chapter thirty two.

Having just secured God's presence and favor, Moses now asks for even more.

He wants direct sight of God's own glory, not just His nearness.

🙏 Beseech means to plead earnestly

🔁 Moses pleaded this way in chapter thirty two

⬆️ Moses asks for glory, not just presence

➡️ God's answer will redirect this request

## ✨ I Will Make All My Goodness Pass Before Thee

God does not offer Moses a raw visual spectacle.

Instead He promises to reveal His own goodness passing by.

Goodness here means God's own kind and generous character, not a light show.

This promise gets fulfilled directly in the very next chapter.

✨ Goodness means God's kind character

🚫 Not a raw visual spectacle

📖 This promise is fulfilled in chapter thirty four

➡️ God also promises to proclaim His name

## 📛 I Will Proclaim The Name Of The LORD Before Thee

A name in this culture carried someone's full reputation and character.

God promises to speak His own name aloud to Moses personally.

This spoken proclamation happens directly in the next chapter's opening verses.

Hearing God's name here means hearing who God truly is.

📛 A name carried someone's full character

🗣️ God will speak His own name aloud

📖 This happens in the next chapter's opening

➡️ Mercy gets defined in the very next line

## 🎁 I Will Be Gracious To Whom I Will Be Gracious

Mercy is described here as God's own sovereign choice.

It is not something owed to anyone or earned by good behavior.

The apostle Paul later quotes this exact line word for word.

Romans chapter nine uses it to explain how God's mercy actually works.

🎁 Mercy is God's own free choice

🚫 Nobody earns it through good behavior

✝️ Paul quotes this line directly later

📖 Romans nine explains God's mercy this way

## 🚫 Thou Canst Not See My Face, For There Shall No Man See Me And Live

A firm limit gets set here, no exceptions offered.

No human being can survive seeing God's face fully and directly.

This limit shapes how the rest of Scripture treats seeing God.

Later writers describe seeing God as something that always requires protection.

🚫 No human survives seeing God's face directly

⚠️ This is a firm limit, no exceptions

📖 Later Scripture treats seeing God this same way

➡️ God still gives Moses something real

## 🪨 Thou Shalt Stand Upon A Rock

God does not simply refuse Moses and end the conversation there.

He points to an exact physical spot for what happens next.

Standing on a specific rock, Moses will get something real, just limited.

God meets Moses' bold request with real care, not silence.

🪨 God names an exact physical spot

🙏 Moses still gets something real

🤲 The limit comes with real care

➡️ The rock offers Moses shelter too

## 🕳️ I Will Put Thee In A Clift Of The Rock

"Clift" is an old spelling of cleft, a crack or crevice in stone.

God personally shelters Moses inside this crack while His glory passes by.

God even covers Moses with His own hand during the moment.

This is real, hands on protection, not distant permission.

🕳️ Clift is an old spelling of cleft

🤲 God personally shelters Moses there

✋ God covers him with His own hand

📖 This is hands on protection, not distance

## 👁️ I Will Take Away Mine Hand, And Thou Shalt See My Back Parts

Moses receives real access, but still limited access.

He sees God's back, never God's face directly.

This remains one of the most unique encounters in the entire Bible.

Even this much closeness still carries a boundary God never removes.

👁️ Moses sees God's back, not His face

🌟 This is one of Scripture's most unique moments

🔒 A real boundary still remains in place

📖 Even great closeness has its limits
`.trim();

export const EXODUS_THIRTY_THREE_PERSONAL_SECTIONS = parseExodusThirtyThreeRawNotes(EXODUS_THIRTY_THREE_RAW_NOTES);
