export type NehemiahSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahSixRawNotes(rawText: string): NehemiahSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 6:${startVerse}` : `Nehemiah 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Nehemiah 6 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_SIX_RAW_NOTES = `# Nehemiah 6:1-4
# 🎯 The Invitation To Ono
---
## 😈 Sanballat, And Tobiah, And Geshem The Arabian

These three men already caused trouble earlier in Nehemiah's story.

Sanballat was the governor of Samaria, the region just north of Judah.

Tobiah was an Ammonite official married into a prominent Jewish family.

Geshem was an Arabian chief who controlled trade routes to the south.

All three lost power once the wall protected Jerusalem.

That is exactly why they wanted to stop it before it was finished.

🏛️ Sanballat governed nearby Samaria
🤝 Tobiah was tied to Jewish nobles by marriage
🐫 Geshem controlled southern trade routes
📖 The finished wall threatened their power

---

## 🚪 I Had Not Set Up The Doors Upon The Gates

A breach means a broken gap in a wall.

By this point the wall had no breach left anywhere.

The stone work itself was completely finished.

Only the wooden doors for each gate still needed to be hung.

That small unfinished piece became the enemies' opening.

They struck at the very moment the work looked almost done.

🧱 A breach means a broken gap
✅ The wall itself had no breach left
🚪 Only the gate doors remained unfinished
📖 Enemies attacked right before the finish

---

## 🗺️ In The Plain Of Ono

Ono was a village in the plain west of Jerusalem, near the coast.

The trip there took the better part of a day.

Away from Jerusalem, Nehemiah would have no wall and no guards.

Sanballat and Geshem were not planning a friendly conversation.

A private meeting there gave them a clear chance to harm him.

🗺️ Ono sat outside Jerusalem near the coast
🚶 The trip would take Nehemiah away from safety
🚫 No walls or guards would protect him there
📖 The invitation was really a trap

---

## ⚠️ They Thought To Do Me Mischief

Mischief here does not mean a small prank.

It means real, planned harm, even an attempt on his life.

Nehemiah recognized the danger the moment the invitation arrived.

Discernment kept him out of a trap he could not see.

⚠️ Mischief means real, planned harm
👀 Nehemiah recognized the danger immediately
🚫 He never considered accepting
📖 Discernment kept him safe

---

## 🧱 Four Times After This Sort

Nehemiah answered every invitation the exact same way.

I am doing a great work means the wall project could not pause.

Stopping construction for even one meeting would cost real momentum.

Sanballat and Geshem tried the same trick four separate times.

Consistency became its own kind of strength against constant pressure.

🧱 Nehemiah called the wall a great work
⏸️ Stopping construction would cost real momentum
🔁 The same trap was tried four times
📖 Consistency became a kind of strength

# Nehemiah 6:5-9
# 📜 The Open Letter Of Accusation
---
## 📜 An Open Letter In His Hand

An open letter means the letter arrived unsealed.

Official letters in this culture were normally sealed for privacy.

Anyone could read this one on its way to Nehemiah.

Sanballat wanted the charge spread before it ever reached him.

The letter was a public attack dressed up as private mail.

📜 An open letter means unsealed
🔓 Normal letters were sealed for privacy
🗣️ Anyone could read this one
📖 It was public shaming disguised as a letter

---

## 🐫 Gashmu Saith It

Gashmu is simply another form of the name Geshem.

Naming him this way made the accusation sound like it came from someone else.

Sanballat was building a rumor to use against Nehemiah.

He wanted it to sound like more than one man's opinion.

A named witness, even a false one, can make a lie sound like fact.

🐫 Gashmu is another name for Geshem
🗣️ Naming him added false credibility
🎯 Sanballat wanted the rumor to spread
📖 A named source can make lies believable

---

## 👑 That Thou Mayest Be Their King

This was the real accusation hiding inside all the others.

Claiming to be king over Judah counted as open rebellion.

A rebellion charge against the Persian empire could bring a death sentence.

The charge had no truth to it at all.

It was designed to end Nehemiah's work by ending his life.

👑 The accusation claimed Nehemiah wanted to be king
⚔️ That charge counted as rebellion against Persia
☠️ A guilty verdict could mean death
📖 The charge was completely false

---

## 🗣️ Appointed Prophets To Preach Of Thee At Jerusalem

This accuses Nehemiah of paying prophets to announce him as king.

A prophet's public words carried real weight in this culture.

This same tactic of a hired prophet returns later in this chapter.

It was meant to make the lie believable to the Persian king.

🗣️ The charge claimed Nehemiah hired prophets
📢 Prophets shaped public opinion quickly
🔁 This tactic appears again later
📖 It was meant to make the lie believable

---

## 🎭 Thou Feignest Them Out Of Thine Own Heart

To feign means to make something up and present it as real.

Nehemiah does not dodge the accusation or answer carefully.

He states plainly that Sanballat invented every part of the charge.

A direct denial like this left no room for the lie to grow.

🎭 Feignest means made up
🚫 Nehemiah denied every part of it
🗣️ He answered plainly, not carefully
📖 A direct denial stopped the lie

---

## 🙏 O God, Strengthen My Hands

Nehemiah closes this section the way he closed chapter four.

He does it with a short prayer to God.

The enemies wanted fear to slow the workers down.

Instead of arguing further, Nehemiah turns straight to God.

The prayer becomes the real answer, not the letter he just denied.

🙏 Nehemiah prays instead of arguing further
😨 Fear was the enemies' real weapon
💪 He asks God for strength, not revenge
📖 Prayer answers what words could not

# Nehemiah 6:10-14
# 🔮 A Prophet For Hire
---
## 🏠 Who Was Shut Up

Shut up here likely means Shemaiah had confined himself to his house.

Many scholars believe he claimed this was for a religious reason.

Whatever the reason given, it made his invitation feel urgent.

Urgency was meant to rush Nehemiah's decision before he could think.

🏠 Shut up means confined to his house
🎭 The reason given may have been false
⏳ It made the situation feel urgent
📖 Urgency was meant to rush his decision

---

## 🕍 Let Us Meet Together In The House Of God, Within The Temple

This does not sound dangerous, meeting inside God's own house.

The inner areas of the temple were reserved for priests alone.

Nehemiah was a governor and a cupbearer, never a priest.

Entering that space would have broken the law he was defending.

Shemaiah was offering Nehemiah safety in exchange for sin.

🕍 The temple's inner space was for priests only
🚫 Nehemiah was not a priest
⚖️ Entering would have broken the law
📖 Safety was offered in exchange for sin

---

## 🛡️ Should Such A Man As I Flee

This does not come from pride or overconfidence.

Nehemiah was the leader the whole wall project depended on.

A leader who hides in fear teaches everyone else to hide too.

His refusal to flee protected his integrity more than his safety.

👑 Nehemiah was the project's leader
👀 Others were watching how he responded
🛡️ Hiding would have taught fear to everyone
📖 Integrity mattered more than safety

---

## 💰 Tobiah And Sanballat Had Hired Him

Hired means Shemaiah was paid to deliver a false message.

Nehemiah perceived the deception the moment he considered the request.

The plan was to frighten him into sinning against the law.

A ruined reputation would have finished Nehemiah as surely as a blade.

💰 Hired means paid to lie
🔍 Nehemiah discerned the deception quickly
🎯 The goal was to trap him in sin
📖 A ruined reputation could end his leadership

---

## ⚖️ Think Thou Upon Tobiah And Sanballat

This kind of prayer asks God to remember someone's wrongdoing.

Nehemiah does not take revenge into his own hands.

He hands the whole matter over to God instead.

Trusting God with justice freed Nehemiah to keep working on the wall.

⚖️ This prayer asks God to judge wrongdoing
🙏 Nehemiah leaves revenge to God
🧱 He returns his attention to the wall
📖 Trusting God freed him to keep working

---

## 👩 The Prophetess Noadiah

Noadiah was a woman claiming the same prophetic authority Shemaiah faked.

The Bible names her here without softening the charge.

She joined a wider group of false prophets working against Nehemiah.

Opposition to God's true work sometimes wears a religious disguise.

👩 Noadiah claimed to be a prophetess
🎭 Her authority was false, like Shemaiah's
👥 Other prophets joined this same opposition
📖 False religion can disguise real opposition

# Nehemiah 6:15-16
# 🧱 The Wall Finished In Fifty Two Days
---
## 📅 Finished In The Twenty And Fifth Day Of The Month Elul

Elul was the sixth month on the Hebrew calendar.

It falls close to our August and September.

The wall took only fifty and two days from start to finish.

For a project this size, that speed was remarkable.

Every threat in this chapter had failed to stop the work.

📅 Elul falls around August and September
🧱 The wall took fifty two days
⏱️ That speed was remarkable for its size
📖 Every threat against it had failed

---

## 🏗️ This Work Was Wrought Of Our God

Wrought simply means done or accomplished.

Even Jerusalem's enemies could see the wall was finished too fast for ordinary effort.

Their own confidence was shaken by what they had just watched.

The wall itself became proof that God had been behind the work.

🏗️ Wrought means done or accomplished
😳 Enemies were shaken by what they saw
👀 Even outsiders recognized God's hand
📖 The wall itself proved God's work

# Nehemiah 6:17-19
# ✉️ Letters To Tobiah Continue
---
## ✉️ The Nobles Of Judah Sent Many Letters Unto Tobiah

This does not describe ordinary friendly correspondence.

Some of Jerusalem's own leading families stayed loyal to Tobiah.

Letters moved back and forth between the city and its enemy the entire time.

Real danger does not always come from outside the walls.

✉️ Letters moved between nobles and Tobiah
🤝 Some nobles stayed loyal to him
🏙️ This threat came from inside Jerusalem
📖 Real danger does not always come from outside

---

## 💍 The Son In Law Of Shechaniah

Tobiah had married into a respected Jewish family through Shechaniah's daughter.

His son had also married into another prominent family, the house of Meshullam.

These ties gave Tobiah real influence inside Jerusalem's leadership.

An enemy who marries into a family gains a foothold no army could buy.

💍 Tobiah married into Shechaniah's family
👪 His son married into Meshullam's family too
🤝 These ties gave him real influence inside Jerusalem
📖 Marriage gave him a foothold inside Jerusalem

---

## 😨 Tobiah Sent Letters To Put Me In Fear

The nobles even reported Tobiah's good deeds to Nehemiah.

They were trying to soften how Nehemiah felt about him.

They also repeated Nehemiah's own words back to Tobiah.

Tobiah answered all of this by sending more threatening letters.

Finishing the wall did not end the pressure to silence him.

🗣️ Nobles reported Tobiah's good deeds to Nehemiah
🔁 Nehemiah's own words got back to Tobiah
✉️ Tobiah kept sending letters to frighten him
📖 Finishing the wall did not end the pressure
`.trim();

export const NEHEMIAH_SIX_PERSONAL_SECTIONS = parseNehemiahSixRawNotes(NEHEMIAH_SIX_RAW_NOTES);
