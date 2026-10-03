export type EzekielThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtyThreeRawNotes(rawText: string): EzekielThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 33:${startVerse}` : `Ezekiel 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Ezekiel 33 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_THREE_RAW_NOTES = `# Ezekiel 33:1-3
# 📯 The Watchman And The Trumpet
---
## ⚔️ When I Bring The Sword Upon A Land

Sword here does not just mean a single blade.

It stands for an entire invading army on its way to attack.

Ezekiel used this same picture for Babylon many times before.

God is the one sending judgment, even though a human king carries it out.

⚔️ Sword means an invading army
🏹 Babylon fills this role elsewhere
👑 God sends the judgment
📖 A human king carries it out

## 👁️ Set Him For Their Watchman

A watchman stood on a city wall watching for danger on the horizon.

Ancient cities depended on one trained set of eyes to protect everyone inside.

The watchman carried no weapon of his own, only his warning.

His whole job was to see trouble before it reached the gate.

👁️ A watchman scanned the horizon
🏙️ Cities depended on this one role
🚫 He carried no weapon himself
📖 His job was warning, not fighting

## 📯 He Blow The Trumpet, And Warn The People

The trumpet here was likely a ram's horn, called a shofar.

Its loud blast could reach every house inside a walled city at once.

One blast meant one message, danger is coming right now.

The warning only worked if people actually heard it and reacted.

📯 The trumpet was likely a shofar
🔊 Its blast reached the whole city
🚨 One blast meant immediate danger
📖 A warning only works if heard

# Ezekiel 33:4-6
# 🩸 Blood Upon His Own Head
---
## 🩸 His Blood Shall Be Upon His Own Head

Blood upon his own head is a Hebrew way of placing blame.

It means the responsibility for a death falls on the person who caused it.

Here the warned person ignored the trumpet on purpose.

His own choice, not the watchman, brought the sword down on him.

🩸 Blood upon him means he is to blame
👂 He heard the warning and ignored it
🧍 His own choice caused the outcome
📖 The watchman carries no guilt here

## 🛟 He That Taketh Warning Shall Deliver His Soul

Deliver his soul means to save his own life.

Hearing a warning is not enough by itself.

The one who actually responds to it is the one who survives.

This chapter keeps tying survival to a real, active response.

🛟 Deliver his soul means saved alive
👂 Hearing alone does not save anyone
🏃 Responding is what saves a life
📖 Survival depends on real action here

## ⚖️ His Blood Will I Require At The Watchman's Hand

This does not mean the watchman caused anyone's death directly.

It means God holds the watchman accountable for silence, not for the sword.

A failed warning lets a death happen that a warning could have stopped.

The watchman's job carries real weight because lives depend on his voice.

🤐 Silence, not the sword, is the charge
⚖️ God holds the watchman accountable
💀 A missed warning lets death happen
📖 A watchman's voice carries real weight

# Ezekiel 33:7-9
# 👁️ Ezekiel Set As Israel's Watchman
---
## 📢 I Have Set Thee A Watchman Unto The House Of Israel

God gave Ezekiel this exact same assignment once before, back in chapter three.

Repeating it here marks this chapter as picking that calling back up.

Israel is the group in view here, the whole exiled community Ezekiel speaks to.

Ezekiel's personal calling is being renewed right as news of Jerusalem's fall nears.

🔁 Chapter three gave this same calling
📢 This renews that calling again
🇮🇱 Israel means the whole exiled people
📖 Timing lines up with Jerusalem's fall

## 👤 His Blood Will I Require At Thine Hand

Thine now means Ezekiel personally, not watchmen in general.

If Ezekiel sees danger and says nothing, he answers for that silence.

The warning is not optional small talk, it is his whole assignment.

A real prophet cannot stay comfortable and quiet at the same time.

👤 Thine now means Ezekiel himself
🤐 Silence would make him accountable
📜 Warning is his actual assignment
📖 A prophet cannot stay quiet and safe

## 🛟 Thou Hast Delivered Thy Soul

Delivering his own soul means Ezekiel is cleared of guilt either way.

If he warns and the wicked ignores him, that is now their choice.

Ezekiel's job was never to force anyone to listen.

His only job was to speak the warning clearly and honestly.

🛟 Delivered means Ezekiel is cleared
👂 Ignoring the warning is their choice
🚫 He cannot force anyone to listen
📖 His only job is to speak plainly

# Ezekiel 33:10-11
# 💀 How Should We Then Live
---
## 😔 How Should We Then Live

This is not a sincere question looking for an answer.

It comes from despair, not curiosity.

Pine away means slowly wasting away under the weight of guilt.

The exiles believe punishment is certain no matter what they do now.

😔 This is despair, not real curiosity
⚰️ Pine away means wasting away in guilt
🤷 They assume punishment is already certain
📖 God is about to answer directly

## ❤️ I Have No Pleasure In The Death Of The Wicked

God states His own heart plainly here, with no hidden condition.

He does not enjoy judgment, even when judgment is fully deserved.

What God wants instead is for the wicked person to turn and live.

This answers the exiles' despair before they even finish asking their question.

❤️ God states His heart plainly
🚫 Judgment brings Him no pleasure
🔄 He wants the wicked to turn
📖 This answers their despair directly

## 🔄 Turn Ye, Turn Ye From Your Evil Ways

Turn here means to change direction, not just to feel sorry.

Saying it twice in a row is a Hebrew way of showing urgency.

God is not casually mentioning an option.

He is pleading with His people before it is too late.

🔄 Turn means changing direction, not feeling sorry
🔁 Saying it twice shows urgency
🙏 This is pleading, not a suggestion
📖 God pleads before it is too late

# Ezekiel 33:12-13
# ⚖️ Righteousness Does Not Bank
---
## 📜 The Righteousness Of The Righteous Shall Not Deliver Him

This does not mean good deeds never matter.

It means good deeds done in the past cannot cover a present, unrepented sin.

God is describing a person's standing right now, not their whole life record.

A good history does not freeze a person's current choices in place.

📜 Past good deeds do not cover
⏳ This is about standing right now
🧾 Not a lifetime record being judged
📖 Current choices are not frozen by the past

## 🪞 If He Trust To His Own Righteousness

Trusting his own righteousness means leaning on his own record instead of staying faithful.

That confidence can quietly turn into an excuse to stop watching his own heart.

The danger named here is pride, not weakness.

A person can fall while still believing they are safe.

🪞 Trusting his own record is the danger
💤 Confidence can replace real faithfulness
💔 Pride, not weakness, is named here
📖 A person can fall while feeling safe

## 🔁 All His Righteousnesses Shall Not Be Remembered

This phrase mirrors verse sixteen's promise for the wicked who turn.

There, forgotten sin means true forgiveness.

Here, forgotten righteousness means a real and current fall.

The same forgetting cuts both ways, depending on which direction a person turns.

🔁 This mirrors verse sixteen's promise
✅ Forgotten sin there means forgiveness
⚠️ Forgotten righteousness here means a real fall
📖 The same principle cuts both ways

# Ezekiel 33:14-16
# 🔄 If The Wicked Turn
---
## 🔄 If He Turn From His Sin, And Do That Which Is Lawful And Right

Turning here is not only an inward feeling of regret.

Lawful and right names real, visible action that follows the feeling.

God is describing a change anyone around this person could actually see.

Repentance in this chapter always shows up as a changed life, not just a changed mood.

🔄 Turning is not only a feeling
👁️ Lawful and right means visible action
🧍 Others could actually see this change
📖 Repentance shows up as a changed life

## 🧥 If The Wicked Restore The Pledge

A pledge was something taken as security for a loan, like a cloak or a tool.

The law of Moses required giving a poor borrower's pledge back by nightfall.

Restoring it means undoing a specific wrong, not just feeling bad about it.

This is one concrete example of what lawful and right actually looks like.

🧥 A pledge secured a loan, like a cloak
📜 The law required returning it by nightfall
🔧 Restoring it undoes a specific wrong
📖 This shows what real repentance looks like

## 📁 None Of His Sins That He Hath Committed Shall Be Mentioned Unto Him

This is the same forgetting promised back in chapter eighteen.

God is not keeping a hidden tally that he brings up later.

Once someone truly turns, that record is treated as closed.

Full forgiveness, not a lingering suspicion, is what is being promised here.

🔁 Chapter eighteen already made this promise
🚫 God keeps no hidden tally here
📁 A truly closed record, not reopened later
📖 This promises full forgiveness, not suspicion

# Ezekiel 33:17-20
# ⚖️ The Way Of The Lord Is Not Equal
---
## ⚖️ The Way Of The Lord Is Not Equal

Equal here means fair or just, not identical treatment for everyone.

The exiles are accusing God of running an unfair system.

Their complaint comes right after hearing both sides of this chapter's teaching.

Being told judgment depends on present choices felt unfair to people hoping for a shortcut.

⚖️ Equal here means fair, not identical
😠 The exiles accuse God of unfairness
👂 This follows the teaching they just heard
📖 A shortcut, not fairness, is what they wanted

## 🔄 But As For Them, Their Way Is Not Equal

God turns their own accusation back onto them.

Their complaint is not really about fairness at all.

It is frustration that their own inconsistent choices still carry real consequences.

The chapter never actually shows God changing His standard, only people wanting Him to.

🔄 God turns the accusation back
😤 Their real issue is not fairness
🎭 Their own choices are the inconsistent part
📖 God's standard never actually changes here

## 👤 I Will Judge You Every One After His Ways

Every one keeps the focus on individual people, not the nation as a whole.

This closes the argument that opened back in verse ten.

No person can hide behind a parent's record or a whole generation's guilt.

Each person stands or falls on their own actual choices.

👤 Every one means individual people
🔁 This closes verse ten's opening question
🚫 No hiding behind someone else's record
📖 Each person stands on their own choices

# Ezekiel 33:21-22
# 📰 The City Is Smitten
---
## 📅 In The Twelfth Year Of Our Captivity

This date is still counted from King Jehoiachin's exile, Ezekiel's usual calendar marker.

Jerusalem had already fallen to Babylon more than a year before this report arrives.

Word traveled slowly from a destroyed city to exiles living far away.

The delay explains why this news feels sudden, even though the fall happened earlier.

📅 Dated from Jehoiachin's exile, as usual
🏙️ Jerusalem fell more than a year earlier
🐢 News traveled slowly across that distance
📖 Delay explains why this feels sudden

## ⚔️ The City Is Smitten

These three words confirm everything Ezekiel had been warning about for years.

Smitten means struck down, here meaning Jerusalem's walls and temple were destroyed.

This single sentence carries the weight of chapters and chapters of earlier warning.

The waiting, for both Ezekiel and his audience, is finally over.

⚔️ Smitten means struck down and destroyed
🏙️ This confirms years of earlier warning
⏳ The long waiting is finally over
📖 One sentence carries that much weight

## 🔓 My Mouth Was Opened, And I Was No More Dumb

Back in chapter three, God made Ezekiel unable to speak freely during the siege.

That silence was itself a sign, matching a city that would not listen anyway.

Now that Jerusalem has actually fallen, that restriction lifts for good.

Ezekiel can speak freely again right as his warnings are being proven true.

🔁 Chapter three first caused this silence
🤐 Silence matched a city that would not listen
🔓 The restriction lifts once Jerusalem falls
📖 His warnings are proven true right here

# Ezekiel 33:23-26
# 🏜️ Abraham Was One, We Are Many
---
## 📜 Abraham Was One, And He Inherited The Land

This is not the exiles honoring Abraham.

It is them twisting his story to fit their own claim.

Abraham was one man, yet God gave him the whole land by promise.

The survivors now argue that their large numbers earn that same right.

📜 Abraham was one man, not many
🤝 His inheritance came from promise, not numbers
👥 The survivors are using his story wrongly
📖 Faithfulness, not headcount, defined that promise

## 🩸 Ye Eat With The Blood

Eating meat with the blood still in it broke a direct command from Moses.

This law appears all the way back in Leviticus seventeen.

The point was never really about diet alone.

Avoiding blood was meant to show respect for life itself as something sacred to God.

🩸 Eating blood broke a command from Moses
📜 This law goes back to Leviticus
🚫 The issue was never only about diet
📖 Life itself was meant to be respected

## ⚔️ Ye Stand Upon Your Sword

Standing upon the sword pictures a life built on violence instead of covenant.

These survivors are holding onto land the same way raiders would, by force.

That is the exact opposite of how Abraham ever received this land.

Claiming Abraham's promise while living by the sword does not match the promise at all.

⚔️ Standing on the sword means living by force
🏹 They hold land the way raiders would
🔄 This is the opposite of Abraham's path
📖 Their claim does not match their lives

## 🔁 Shall Ye Possess The Land

God repeats this exact question twice in only two verses.

The repetition is not for emphasis.

It functions here as sarcasm aimed straight at their claim.

A people living like this cannot inherit a promise built on faithfulness.

🔁 The question repeats twice in two verses
😏 This repetition works as sarcasm
🚫 The expected answer is an obvious no
📖 This kind of life cannot inherit that promise

# Ezekiel 33:27-29
# ⚔️ Judgment On The Wastes
---
## 🗺️ They That Are In The Wastes Shall Fall By The Sword

Three different places are named here, with a judgment matched to each one.

Those hiding in the open wastes fall by the sword.

Those caught in open fields are given to wild animals.

Those hiding in forts and caves die by disease instead.

🗺️ Three hiding places get a matching judgment
⚔️ Open wastes mean the sword
🐾 Open fields mean wild animals
📖 Forts and caves mean disease instead

## 👑 The Pomp Of Her Strength Shall Cease

Pomp means visible pride, the strength a nation liked to show off.

Her refers to the land of Israel, pictured here as a person.

Everything Israel once displayed with confidence is about to stop completely.

The mountains, once full of life, will be left silent and empty instead.

👑 Pomp means visible, displayed pride
🗺️ Her refers to the land of Israel
🚫 That displayed strength stops completely
📖 Full mountains are left silent instead

## 🔁 Then Shall They Know That I Am The LORD

This exact phrase has repeated often throughout the whole book of Ezekiel.

Judgment, in this book, is never only about punishment.

It is meant to teach a lesson comfort alone never managed to teach.

Desolation finally gets through to people where warnings never did.

🔁 This phrase repeats often in Ezekiel
🎯 Judgment here carries a teaching purpose
📚 A lesson comfort never managed to teach
📖 Desolation gets through where warnings failed

# Ezekiel 33:30-33
# 🎵 A Very Lovely Song
---
## 👥 They Come Unto Thee As The People Cometh

This looks like a crowd eager to hear from God, but it is not that.

They gather by the walls and doorways the same way people gather for any popular event.

Showing up to listen is not the same thing as actually obeying.

Attendance here hides a heart that has not changed at all.

👥 This looks like eager listening
🎭 But it works like a popular event
👂 Attendance is not the same as obeying
📖 Their hearts have not actually changed

## 🗣️ With Their Mouth They Shew Much Love

Shew is an old spelling of show, meaning to display or demonstrate.

Their words sound warm and affectionate toward God and His message.

Covetousness means a constant craving for more, money, land, or status.

Their mouths and their hearts are chasing two completely different things.

🗣️ Shew is an old spelling of show
❤️ Their words sound warm and affectionate
💰 Covetousness means craving more and more
📖 Mouth and heart are chasing different things

## 🎵 As A Very Lovely Song Of One That Hath A Pleasant Voice

Think of a singer people love listening to without ever changing how they live.

That is exactly how this audience treats Ezekiel's preaching.

They enjoy the sound, the rhythm, and the performance of his words.

Entertainment, not transformation, is what they are actually showing up for.

🎵 Picture a singer people love to hear
👂 They enjoy the sound of his words
🎭 Performance, not change, is what they want
📖 Entertainment without transformation helps no one

## ✅ Then Shall They Know That A Prophet Hath Been Among Them

This verdict will not depend on whether anyone actually listened.

Once these judgments come true exactly as spoken, the proof stands on its own.

People who treated Ezekiel's words as background noise will finally have to reckon with them.

A real prophet is proven true by what happens next, not by applause in the moment.

✅ The proof will not depend on listening
🔮 Fulfilled words become undeniable proof
👂 Background noise turns into reckoning
📖 A prophet is proven by what happens next`.trim();

export const EZEKIEL_THIRTY_THREE_PERSONAL_SECTIONS = parseEzekielThirtyThreeRawNotes(EZEKIEL_THIRTY_THREE_RAW_NOTES);
