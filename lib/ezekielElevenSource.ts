export type EzekielElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielElevenRawNotes(rawText: string): EzekielElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 11:${startVerse}` : `Ezekiel 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 11 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_ELEVEN_RAW_NOTES = `# Ezekiel 11:1-4
# 🚪 Wicked Counsel At The Gate
---
## 🚪 Behold At The Door Of The Gate Five And Twenty Men

A city gate in this culture was never just an entrance.

It worked as the courthouse and council room for the city's leaders.

That explains why so many men are gathered here, not just passing through.

Twenty five is simply the exact headcount the Spirit showed Ezekiel.

The real weight of the scene is who these men are.

🚪 Gates served as city courtrooms

👥 Leaders gathered here to decide

🔢 Twenty five is the exact count

📖 The scene centers on who they are

## 👤 Jaazaniah The Son Of Azur, And Pelatiah The Son Of Benaiah, Princes Of The People

These two men are named instead of staying anonymous.

Jaazaniah and Pelatiah are leaders.

Princes here means city officials, not sons of a king.

Naming them lets the reader track exactly what happens to one of them later in this chapter.

👤 Jaazaniah and Pelatiah are named directly

🏛️ Princes here means city officials

🔮 Naming them sets up a later moment

📖 Watch for Pelatiah again soon

## 💭 These Are The Men That Devise Mischief, And Give Wicked Counsel In This City

The word these points straight back to the leaders just named at the gate.

To devise mischief means planning harm on purpose.

It is not an accident or a careless mistake.

Wicked counsel means bad advice coming from leaders people actually trust.

The real danger comes from inside the city.

👉 These means the leaders just named

🧠 Devise mischief means planning harm on purpose

🗣️ Wicked counsel means bad advice from trusted leaders

📖 The danger comes from inside, not outside

## 🏠 Let Us Build Houses: This City Is The Caldron, And We Be The Flesh

Let us build houses means these leaders plan to settle in for good.

They believe judgment is still far away.

A caldron is a large pot used for boiling meat over a fire.

Calling the city a caldron and themselves the flesh sounds like an insult.

But they actually mean it as comfort.

They are claiming to be the valuable meat kept safe inside the pot.

That same picture turns completely against them very soon.

🏠 They believe judgment is far away

🍲 A caldron is a large boiling pot

🥩 They call themselves the protected meat

📖 That same picture turns against them soon

## 🔁 Prophesy Against Them, Prophesy, O Son Of Man

God repeats the word prophesy twice in the same breath.

Repeating a command like this in Ezekiel usually marks something urgent.

Son of man is God's regular way of addressing Ezekiel throughout this book.

It keeps Ezekiel's human weakness in view.

He still carries a message this heavy.

🔁 Prophesy is repeated for urgency

❗ Repetition in Ezekiel marks urgency

🧑 Son of man addresses Ezekiel's humanity

📖 A heavy message carried by a human voice

# Ezekiel 11:5-10
# ⚖️ The Lord's Indictment Against The City
---
## ⬇️ The Spirit Of The LORD Fell Upon Me

This is a different kind of spirit movement than verse one.

Lifted me up carried Ezekiel to a new place inside the vision.

Fell upon him here means the Spirit filled him with words to speak out loud.

Both phrases describe the same Spirit working in two different ways.

⬇️ Fell upon means empowered to speak

🧭 Lifted up meant carried somewhere

🔀 These are two different kinds of moving

📖 One Spirit works in both ways

## 🧠 I Know The Things That Come Into Your Mind

The leaders made their caldron boast quietly among themselves.

They never said it directly to Ezekiel.

God tells them plainly that nothing said in private stays hidden from him.

This removes any excuse that their words were only harmless private talk.

🧠 God hears even private words

🙈 Nothing stays hidden from him

🚫 Private talk is no excuse

📖 God answers what was never said aloud

## 🩸 Ye Have Filled The Streets Thereof With The Slain

This is the real reason the caldron picture fits the city.

The streets are full of people these very leaders have had killed.

Their boast in verse three called the city safe.

But the city is already soaked in blood.

The caldron image becomes an accusation, not a comfort.

🩸 Streets are filled with the slain

⚖️ These leaders caused the killing

🍲 The caldron image becomes an accusation

📖 Their own violence undoes their comfort

## 🔥 I Will Bring You Forth Out Of The Midst Of It

The leaders wanted to stay safely inside the city.

They pictured themselves as the flesh kept in the pot.

God promises the opposite of what they wanted.

Being brought out of the city here is not rescue.

It means removal, out into judgment.

🔥 They wanted to stay inside safely

🚫 God promises the opposite instead

➡️ Being removed here means judgment

📖 Their claimed safety becomes their loss

## ⚔️ Ye Have Feared The Sword

These leaders had clearly been afraid of an attacking sword, likely Babylon's army.

Avoiding that fear probably shaped many of their political decisions.

God tells them plainly that the very thing they feared is coming anyway.

No amount of clever counsel could prevent this outcome.

⚔️ They feared an attacking sword

🧩 Fear shaped their political choices

➡️ The sword comes anyway

📖 Clever counsel could not stop it

## 🗺️ I Will Judge You In The Border Of Israel

The border of Israel means the edge of the land, not the city itself.

Many scholars point to Riblah, a town on that northern border.

Historical records describe Judah's own leaders being judged there when Jerusalem actually fell.

This verse was not vague about where or how judgment would land.

🗺️ Border means the edge of the land

📍 Many scholars point to Riblah

📜 Judah's leaders were executed there

📖 This points to a real future event

# Ezekiel 11:11-13
# 💔 Pelatiah Falls, Ezekiel Cries Out
---
## 🚫 This City Shall Not Be Your Caldron, Neither Shall Ye Be The Flesh

This directly denies the claim the leaders made back in verse three.

They called the city their safe caldron and themselves the protected flesh.

God simply erases that claim, plainly and completely.

Their false sense of safety ends in one short sentence.

🚫 This denies their earlier claim

🍲 Caldron and flesh meant false safety

❌ God erases the claim completely

📖 False safety ends in one line

## 🌍 Have Done After The Manners Of The Heathen That Are Round About You

Heathen here refers to the pagan nations surrounding Israel.

Israel's entire calling was to live differently than those nations.

Copying their practices instead of following God's statutes is the real charge in this verse.

The sin named here is blending in.

🌍 Heathen means the surrounding pagan nations

🎯 Israel was called to live differently

🪞 Copying them was the real sin

📖 The sin was blending in, not standing out

## ⚰️ Pelatiah The Son Of Benaiah Died

Pelatiah is the same leader named back in verse one, standing at the gate.

His death happens inside the vision itself.

It happens right as Ezekiel is still speaking.

This sudden death proves how serious this prophecy really is.

A vision that can end a real man's life is not a symbol only.

⚰️ Pelatiah was named back in verse one

⚡ His death happens during the vision

🎯 It proves the prophecy's weight

📖 This vision was not only symbolic

## 😢 Ah Lord GOD! Wilt Thou Make A Full End Of The Remnant Of Israel?

Remnant means the small group of people left after a disaster.

Ezekiel already cried out with nearly this same question back in chapter nine.

Watching one man die in front of him makes total destruction suddenly feel real.

Ezekiel is not a cold messenger.

He still pleads for his own people.

He does this even as he delivers judgment.

👥 Remnant means those left after disaster

🔁 This echoes his cry in chapter nine

💔 Pelatiah's death makes the fear real

📖 He pleads even amid judgment

# Ezekiel 11:14-18
# 🏡 A Little Sanctuary Among The Nations
---
## 🗣️ Get You Far From The LORD: Unto Us Is This Land Given In Possession

This insult is not coming from a foreign enemy.

It comes from Israelites still living in Jerusalem.

They are mocking those who have already been taken captive.

They claim the exiles have lost both God and the land.

The people speaking this insult are about to lose everything too.

🗣️ This insult comes from fellow Israelites

🏙️ It mocks those already in exile

❌ They claim exiles lost God and land

📖 Those speaking will lose everything too

## 🏡 Will I Be To Them As A Little Sanctuary In The Countries Where They Shall Come

A sanctuary is a holy place set apart for meeting with God.

The exiles are losing the actual temple in Jerusalem.

God promises his presence will still be with them in a foreign land.

That presence does not need a building to be real.

🏡 Sanctuary means a set apart holy place

🏛️ The exiles are losing the temple building

🌍 God promises presence without a building

📖 God was never trapped in one place

## 🧺 I Will Gather You From The People, And Assemble You Out Of The Countries

Up to this point in the chapter, every promise has been judgment.

Here the message turns toward gathering the scattered people back together.

This is the first real hope offered since the vision began back in chapter eight.

🔀 The tone shifts from judgment to hope

🧺 God promises to gather the scattered

🔙 This is the first hope since chapter eight

📖 Judgment is not the final word

## 🗑️ They Shall Take Away All The Detestable Things Thereof And All The Abominations Thereof From Thence

Detestable things and abominations both point to idols.

They also include the objects used to worship those idols.

Restoration in this promise is not only about a location.

The returning people are expected to clear out false worship along with coming home.

Coming back to the land means coming back to God alone.

🗑️ These words mean idols and false worship

🏠 Restoration is more than a location

🧹 Returning means clearing out false worship

📖 Coming home means coming back to God

# Ezekiel 11:19-21
# ❤️ One Heart, A New Spirit
---
## ❤️ I Will Give Them One Heart, And I Will Put A New Spirit Within You

One heart means complete, undivided loyalty.

Up to now, Israel's heart has been split between worshiping God and following other gods.

God promises to fix that division at its root.

This same promise returns in fuller form later in this book.

❤️ One heart means undivided loyalty

⚖️ Israel's heart had been divided

🌱 God fixes the root, not symptoms

📖 This promise returns again later

## 🪨 I Will Take The Stony Heart Out Of Their Flesh, And Will Give Them An Heart Of Flesh

A stony heart cannot feel anything or respond to anything.

Think of trying to write on a rock compared to writing on skin.

The rock never changes no matter how hard you press into it.

Living flesh can be shaped, can feel, and can actually respond to God.

🪨 A stony heart feels nothing

✋ Living flesh can feel and respond

📝 Stone never changes under pressure

📖 God replaces unfeeling with responsive

## 🤝 They Shall Be My People, And I Will Be Their God

This exact sentence appears again and again across the whole Bible.

It is the simplest possible summary of the covenant between God and his people.

Think of it as the core vow underneath every promise God makes to Israel.

🤝 This is the covenant's core formula

🔁 It repeats throughout the whole Bible

💍 It works like a marriage vow

📖 Every other promise builds on this

## ⚖️ I Will Recompense Their Way Upon Their Own Heads

This verse is not about punishing people at random.

It targets only those who keep chasing after detestable things and abominations.

Upon their own heads is an old idiom meaning full personal responsibility.

The new heart promised above is never forced on anyone.

🎯 This targets those who keep sinning

⚖️ Upon their own heads means personal responsibility

🚫 Nobody is punished at random here

📖 The new heart is never forced

# Ezekiel 11:22-25
# 🌄 The Glory Departs Over The Mountain
---
## 🛫 Then Did The Cherubims Lift Up Their Wings, And The Wheels Beside Them

This is the exact same living throne described back in chapters one and ten.

The wheels move together with the cherubim, exactly as that earlier vision already explained.

Everything is now in motion for the final step of departure.

🛫 This is the same throne as before

🔗 Wheels and cherubim move as one

🚪 Everything is moving toward departure

📖 The final step is about to happen

## 🔼 The Glory Of The LORD Went Up From The Midst Of The City

This is the moment the departure finally finishes.

Chapter ten already showed the glory moving to the threshold and then over the cherubim.

Now it leaves the city completely.

This is one of the most devastating moments in the entire book.

🔼 This finishes the departure sequence

🚪 Chapter ten already showed earlier steps

🏙️ Now it leaves the city completely

📖 This is the book's most devastating moment

## 🌄 Stood Upon The Mountain Which Is On The East Side Of The City

Many scholars believe this mountain is the Mount of Olives.

That same hill later appears in the story of Jesus weeping over Jerusalem.

God's presence pauses there, just outside the city, before truly leaving the area.

🌄 Many scholars identify this as Olivet

🔁 That hill appears again much later

⏸️ God's presence pauses just outside

📖 This mountain carries lasting significance

## ✈️ Brought Me In A Vision By The Spirit Of God Into Chaldea, To Them Of The Captivity

This does not mean Ezekiel physically traveled anywhere during this vision.

Back in chapter eight, he was already sitting with the elders in Babylon the whole time.

The vision carried his mind to Jerusalem.

Now it simply returns him to where his body already was.

Chaldea and Babylon refer to the same region where the exiles were living.

🧠 Ezekiel's body never actually moved

🪑 He stayed seated with elders in Babylon

🔙 The vision now returns him there

📖 Chaldea and Babylon are the same region

## 📣 Then I Spake Unto Them Of The Captivity All The Things That The LORD Had Shewed Me

Ezekiel does not keep this overwhelming vision to himself.

His job was always to deliver the message, not just to receive it.

That includes the hardest parts, like Pelatiah's death and the temple's abandonment.

A prophet who hid the hard parts would have failed the people who needed the truth.

📣 Ezekiel reports the whole vision

🎯 His job was delivery, not just receiving

💔 That includes the hardest parts

📖 The whole truth was owed to them
`.trim();

export const EZEKIEL_ELEVEN_PERSONAL_SECTIONS = parseEzekielElevenRawNotes(EZEKIEL_ELEVEN_RAW_NOTES);
