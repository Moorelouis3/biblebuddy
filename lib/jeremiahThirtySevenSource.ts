export type JeremiahThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtySevenRawNotes(rawText: string): JeremiahThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+37:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 37 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+37:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+37:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 37 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 37,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 37:${startVerse}` : `Jeremiah 37:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 37 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_SEVEN_RAW_NOTES = `# Jeremiah 37:1-4
# 👑 A New King, The Same Refusal
---
## 👑 Instead Of Coniah The Son Of Jehoiakim

Coniah is another name for king Jehoiachin, the ruler right before Zedekiah.

Jehoiachin reigned only three months before Babylon dragged him away captive.

Zedekiah was not his son taking over the family line.

He was Jehoiachin's own uncle, a younger son of Josiah himself.

Babylon kept choosing the next king, not Judah.

👑 Coniah is another name for Jehoiachin

⏳ Jehoiachin ruled only three months

👪 Zedekiah was his uncle, not his son

📖 Babylon kept choosing Judah's king

---

## 📜 Whom Nebuchadrezzar King Of Babylon Made King

Nebuchadrezzar is simply another spelling of Nebuchadnezzar in this book.

Both spellings point to the exact same king of Babylon.

Babylon did not just defeat Judah on the battlefield.

Babylon now decided who even sat on Judah's own throne.

📜 Nebuchadrezzar and Nebuchadnezzar are the same king

⚔️ Babylon had already defeated Judah

👑 Babylon now chose Judah's king

📖 Zedekiah's crown came from Babylon

---

## 🧍 Neither He Nor His Servants Nor The People

This verse names three separate groups, not the king alone.

The king failed to listen, and so did his own officials.

Even ordinary people living in the land refused to listen.

Judah's rejection of God's word ran through every level of the nation.

🧍 The king did not listen

🏛️ His officials did not listen either

🧱 Ordinary people also refused to listen

📖 Rejection ran through the whole nation

---

## ✉️ Sent Jehucal And Zephaniah To The Prophet Jeremiah

These two men carried a personal request straight from the king.

Zephaniah the priest reappears later in this book on similar errands.

Jehucal later becomes one of the officials who throws Jeremiah into a pit.

The same man who sought Jeremiah's prayers helps destroy him soon after.

✉️ Jehucal and Zephaniah carried the king's request

🙏 Zephaniah reappears later on similar errands

⚠️ Jehucal later helps throw Jeremiah into a pit

📖 Seeking a prophet does not guarantee loyalty

---

## 🙏 Pray Now Unto The LORD Our God For Us

Zedekiah wanted Jeremiah's prayers without accepting Jeremiah's message.

He respected that Jeremiah had real access to God.

He still refused to change anything Jeremiah had told him to change.

A king can admire a prophet and still reject his warning.

🙏 Zedekiah wanted Jeremiah to pray for him

🚫 He still rejected Jeremiah's actual message

⚖️ Wanting help differs from wanting obedience

📖 Admiring a prophet is not obeying him

---

## 🚶 Jeremiah Came In And Went Out Among The People

At this point in the story Jeremiah still moved freely through Jerusalem.

No one had arrested him yet, despite years of unpopular preaching.

This freedom will not last through the rest of this chapter.

The next few verses show exactly how fast that changes.

🚶 Jeremiah still moved freely in Jerusalem

🔓 No one had arrested him yet

⏳ This freedom was about to end

📖 The chapter shows how fast it changed

---

# Jeremiah 37:5-10
# ⚔️ A Warning Not To Be Deceived
---
## 🛡️ Then Pharaoh's Army Was Come Forth Out Of Egypt

Egypt and Judah were loosely allied against Babylon at this point.

Pharaoh sent his own army north to challenge the siege.

For a brief moment it looked like outside help had actually arrived.

That hope will not survive the rest of this chapter.

🛡️ Egypt sent an army to help Judah

🤝 Egypt and Judah were loosely allied

🌅 It looked like rescue had arrived

📖 That hope would not last

---

## 🏷️ The Chaldeans That Besieged Jerusalem Departed From Jerusalem

Chaldeans is another name for the Babylonians in this book.

Babylon's army pulled back from the city walls to meet this new threat.

Jerusalem suddenly had breathing room for the first time in a long siege.

The relief was real, but no one yet knew how long it would last.

🏷️ Chaldeans simply means Babylonians

🔙 Babylon's army pulled back from the walls

🌬️ Jerusalem had a sudden break in the siege

📖 No one knew how long it would last

---

## 🏃 Shall Return To Egypt Into Their Own Land

God tells Zedekiah exactly how temporary this relief will be.

Egypt's army would retreat home instead of actually defeating Babylon.

The very help Judah was counting on would simply disappear.

Judah's rescue was never going to come from Egypt.

🏃 Egypt's army would retreat home

❌ Egypt would not defeat Babylon

🕊️ The hoped for rescue would vanish

📖 Judah's rescue was never coming from Egypt

---

## 🔥 Take It And Burn It With Fire

God states the ending plainly, with no soft language at all.

Babylon would return, capture the city, and destroy it completely.

This happened almost exactly as described less than two years later.

The relief in verse five was never meant to be the ending.

🔥 Babylon would return and burn the city

⏳ This came true less than two years later

🚫 The relief in verse five was not final

📖 God stated the ending plainly

---

## 👀 Deceive Not Yourselves For They Shall Not Depart

God warns Judah not to trust how the moment looks.

The Chaldeans leaving today does not mean they are gone for good.

Believing what you want instead of what is true is a trap.

God corrects that false hope before it can take root.

👀 Do not trust how the moment looks

🔙 Leaving today does not mean gone for good

🧠 Wanting something does not make it true

📖 God corrects the false hope early

---

## 🤕 Yet Should They Rise Up Every Man In His Tent

God paints an extreme picture to make one point unmistakable.

Even if only wounded soldiers were left, they would still finish the job.

Judah's fate was not resting on how strong Babylon's army looked that day.

It was resting on God's own decision to bring judgment.

🤕 Even wounded soldiers would finish the job

💪 The outcome did not depend on army strength

⚖️ It depended on God's own decision

📖 Judgment was certain no matter who was left

---

# Jeremiah 37:11-15
# 🚨 Accused Of Desertion
---
## 🔁 When The Army Of The Chaldeans Was Broken Up

This is the same retreat explained a few verses earlier.

Jeremiah picked this exact window to try to leave the city.

The gap in the siege was his only safe chance to travel the roads.

He had no way of knowing the relief would not last.

🔁 This is the same retreat as before

🚶 Jeremiah used the gap to try to leave

🛣️ It was his only safe window to travel

📖 He could not know it would not last

---

## 🗺️ To Go Into The Land Of Benjamin

The land of Benjamin sat just north of Jerusalem, inside Judah's own territory.

Jeremiah's hometown of Anathoth was located in that same territory.

He was not trying to reach enemy lines at all.

He was heading toward home, not toward Babylon.

🗺️ Benjamin sat just north of Jerusalem

🏠 Anathoth, his hometown, was there

🚫 He was not heading toward the enemy

📖 He was heading toward home

---

## 🏡 To Separate Himself Thence In The Midst Of The People

This old phrase is unclear even to scholars today.

Many think it describes Jeremiah handling a family property matter.

It may connect to land he later buys back in chapter thirty two.

Whatever the errand was, it was ordinary, not treasonous.

❓ This phrase stays unclear even today

🏡 It may involve family property

📜 It may tie to chapter thirty two

📖 It was ordinary business, not treason

---

## 🏰 A Captain Of The Ward Whose Name Was Irijah

A ward here means a guard post, not a hospital room.

Irijah held a position guarding one of Jerusalem's gates.

His job was to watch for exactly this kind of movement.

An ordinary guard is about to make an extraordinary accusation.

🏰 Ward means a guard post here

🪖 Irijah guarded one of the gates

👀 His job was watching for suspicious movement

📖 An ordinary guard made an extraordinary accusation

---

## ⚔️ Thou Fallest Away To The Chaldeans

Irijah accuses Jeremiah of deserting to the enemy army.

Desertion during a siege was treated as treason, not a small offense.

Jeremiah had spent years telling the nation that Babylon would win.

That same unpopular message now made him look like a traitor.

⚔️ Irijah accuses Jeremiah of desertion

⚖️ Desertion in a siege counted as treason

🗣️ His years of warnings were twisted against him

📖 Truth telling now looked like betrayal

---

## 🙅 Then Said Jeremiah It Is False

Jeremiah denies the charge plainly and immediately.

Irijah refuses to listen and arrests him anyway.

The princes here were Judah's ruling officials, the same group from chapter thirty six.

A true denial did not matter once suspicion had already taken hold.

🙅 Jeremiah denied the charge at once

🚫 Irijah refused to listen anyway

🏛️ The princes were Judah's ruling officials

📖 Suspicion outweighed a true denial

---

## 😡 The Princes Were Wroth With Jeremiah

Wroth means furiously angry, more than simple irritation.

The officials beat Jeremiah before locking him away.

Jonathan's house was never built to be a prison at all.

Turning a scribe's home into a jail shows how harsh this punishment was.

😡 Wroth means furiously angry

👊 They beat Jeremiah before imprisoning him

🏠 Jonathan's house was not built as a prison

📖 The punishment was improvised and harsh

---

# Jeremiah 37:16-18
# 🕳️ A Secret Question In The Dungeon
---
## 🕳️ Entered Into The Dungeon And Into The Cabins

A dungeon here meant an underground pit, often used for storage.

Cabins in this context means small vaulted cells, not cozy rooms.

Jeremiah remained down there for many days with no word of release.

This was likely the lowest, harshest point of his entire ministry.

🕳️ A dungeon meant an underground pit

🧱 Cabins meant small vaulted cells

📆 He remained there for many days

📖 This was likely his hardest stretch yet

---

## 🤫 The King Asked Him Secretly In His House

Zedekiah pulled Jeremiah out of the dungeon without anyone else knowing.

He wanted the conversation kept completely private.

A king afraid of his own officials still trusted Jeremiah's word from God.

Fear of man and respect for God lived side by side in Zedekiah.

🤫 Zedekiah met Jeremiah in secret

😨 He feared his own officials knowing

🙏 He still trusted Jeremiah's word from God

📖 Fear of man and respect for God coexisted

---

## 🔁 Thou Shalt Be Delivered Into The Hand Of The King Of Babylon

Zedekiah hoped for a different answer than the one he had heard before.

Jeremiah's message from a dungeon was exactly the same as it had always been.

Suffering never changed what Jeremiah was willing to say.

God's word does not soften just because the messenger is suffering.

❓ Zedekiah hoped for a new answer

🔁 Jeremiah's message never changed

💪 Suffering did not silence him

📖 God's word does not soften for comfort

---

## ❓ What Have I Offended Against Thee

Jeremiah asks the king directly what law he actually broke.

No real crime is ever named against him in this entire book.

He speaks boldly even though the king holds total power over his life.

An innocent man can still ask hard questions from inside a cell.

❓ Jeremiah asks what crime he committed

🚫 No real crime is ever named

🦁 He speaks boldly from inside a cell

📖 Innocence can still ask hard questions

---

# Jeremiah 37:19-21
# 🍞 A Plea And A Small Mercy
---
## 🗣️ Where Are Now Your Prophets Which Prophesied Unto You

Jeremiah points to the false prophets who promised Babylon would never come.

Those popular prophets are nowhere to be found now that the siege is real.

Jeremiah, the one prophet everyone wanted silenced, is the only one still standing.

Being popular and being right are not the same thing.

🗣️ False prophets had promised safety

👻 None of them are around now

🧍 Jeremiah alone is still standing

📖 Popular and right are not the same

---

## 🙏 Let My Supplication Be Accepted Before Thee

A supplication is a humble, personal request, not a demand.

Jeremiah speaks to the king respectfully even after being beaten and jailed.

He is not asking to be released, only to be moved somewhere survivable.

Even a faithful prophet still has ordinary human needs and fears.

🙏 A supplication is a humble request

🗣️ Jeremiah stayed respectful despite his treatment

🏠 He only asked to be moved, not freed

📖 Prophets have real human needs too

---

## 💀 Lest I Die There

Jeremiah names his actual fear, not a vague complaint.

He believed that specific dungeon would kill him if he went back.

Asking for a different prison was not weakness, it was survival.

Even a prophet trusting God still took practical steps to stay alive.

💀 Jeremiah feared dying in that dungeon

🏚️ That specific place was the real danger

🧠 Asking for a change was not weakness

📖 Trusting God did not rule out practical steps

---

## 🏛️ Commit Jeremiah Into The Court Of The Prison

The court of the prison was an open area, not an underground pit.

Zedekiah granted a small mercy without fully freeing him.

This small change in location mattered enormously to Jeremiah's survival.

A king too weak to release him could still ease his suffering.

🏛️ The court of the prison was open air

🤝 Zedekiah granted a small mercy

📍 Location mattered enormously to his survival

📖 Weak kings can still choose small mercies

---

## 🍞 Until All The Bread In The City Were Spent

The bakers' street supplied Jeremiah's one piece of bread each day.

That same sentence quietly reveals the city was running out of food.

Even this small kindness depended on a shrinking, besieged food supply.

The siege outside was always the real story behind this prison.

🍞 Jeremiah received one piece of bread daily

🏚️ The city's food supply was shrinking

⏳ Even this kindness had a limit

📖 The siege shaped every detail here
`.trim();

export const JEREMIAH_THIRTY_SEVEN_PERSONAL_SECTIONS = parseJeremiahThirtySevenRawNotes(JEREMIAH_THIRTY_SEVEN_RAW_NOTES);
