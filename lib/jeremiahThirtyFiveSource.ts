export type JeremiahThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtyFiveRawNotes(rawText: string): JeremiahThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 35:${startVerse}` : `Jeremiah 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Jeremiah 35 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_FIVE_RAW_NOTES = `# Jeremiah 35:1-4
# 🏠 Jeremiah Is Sent To The Rechabites
---
## 🏠 In The Days Of Jehoiakim The Son Of Josiah King Of Judah

Jehoiakim was not like his father Josiah.

Josiah led the last reform in Judah.

He tore down idols and renewed the covenant with God.

Jehoiakim undid that reform and ignored Jeremiah completely.

He once burned one of Jeremiah's scrolls instead of listening to it.

This chapter happens under a king who refuses correction.

👑 Jehoiakim replaced his father Josiah
🔥 He burned Jeremiah's words instead of hearing them
🙉 He is a king who refuses correction
📖 This refusal frames the whole chapter

## 👪 Go Unto The House Of The Rechabites

The Rechabites were a family clan, not a tribe of Israel.

They descended from Jonadab, the son of Rechab.

Jonadab helped destroy Baal worship generations earlier.

That story is told back in Second Kings chapter ten.

God now sends Jeremiah to test their loyalty, not punish them.

👪 Rechabites were a family clan
📜 They descended from Jonadab son of Rechab
⚔️ Jonadab helped destroy Baal worship earlier
📖 God sends Jeremiah to test them

## 🍷 Give Them Wine To Drink

This is not a friendly invitation to share a drink.

It is a planned test with a group already known for refusing wine.

God already knows how the Rechabites will answer.

The point is to use their obedience as a mirror for Judah.

🍷 Wine here is a deliberate test
🎯 God already knows their answer
🪞 Their obedience becomes a mirror
📖 Judah will be measured against it

## 🙋 Jaazaniah The Son Of Jeremiah, The Son Of Habaziniah

This Jeremiah is not the prophet writing the book.

Jaazaniah represents the whole Rechabite clan in this meeting.

Naming his full family line marks this as a serious legal moment.

This is not a casual family visit.

His answer on behalf of the Rechabites carries the weight of the whole family.

🙋 Jaazaniah speaks for the whole clan
👪 His family line is named in full
⚖️ This is a formal legal moment
➡️ One man's choice speaks for everyone

## 🗣️ A Man Of God

"Man of God" is a title usually given to a prophet.

Moses, Elijah, and Elisha were all called this in scripture.

Igdaliah held rooms inside the temple itself for his sons to use.

That access shows he was respected as a genuine voice from God.

🗣️ Man of God usually means a prophet
🧎 Moses and Elijah carried this title
🏛️ Igdaliah had rooms inside the temple
📖 His title marks real spiritual authority

## 🚪 The Keeper Of The Door

"Keeper of the door" names a specific job inside the temple.

Doorkeepers guarded the entrances and controlled who could come in.

It was a trusted role, not a minor errand.

The temple complex held prophets, officials, and guards all under one roof.

🚪 Keeper of the door means a guard
🛡️ Doorkeepers controlled temple access
🙏 It was a trusted, honored role
📖 The temple housed many kinds of service

# Jeremiah 35:5-11
# 🍾 A Vow Kept For Generations
---
## 🍾 Pots Full Of Wine, And Cups

This was not one token cup offered out of politeness.

Full pots meant plenty of wine was available to drink freely.

The temptation was real, not staged.

Whatever the Rechabites say next, it will not be because wine was scarce.

🍾 Pots full means a real supply
🍷 The temptation was genuine, not staged
🚫 Scarcity was never the reason to refuse
📖 Their answer will show real conviction

## 📜 Jonadab The Son Of Rechab Our Father Commanded Us

Jonadab lived more than two hundred years before this moment.

Calling him "father" here means clan ancestor, not a literal parent.

His command still controlled how this family lived every single day.

A promise made generations earlier still bound the family tightly today.

📜 Jonadab lived two centuries earlier
👪 Father here means ancestor, not parent
🔗 His old command still held real power
➡️ One promise outlasted many generations

## 🏕️ Neither Shall Ye Build House, Nor Sow Seed, Nor Plant Vineyard

Jonadab's vow banned three normal parts of settled life.

No permanent houses, no farming, and no vineyards of their own.

This kept the family nomadic on purpose, like herding ancestors long before them.

A vineyard producing their own wine would have made the wine ban pointless.

🏕️ No houses, farming, or vineyards allowed
🐑 The vow kept them nomadic on purpose
🍇 A vineyard would defeat the wine rule
📖 Every part of the vow worked together

## 📜 That Ye May Live Many Days In The Land Where Ye Be Strangers

This echoes the same promise attached to honoring father and mother.

That promise usually points to Israel's own covenant with God.

Here the Rechabites receive it for obeying a human ancestor instead.

"Strangers" means they never owned tribal land of their own in Israel.

📜 This echoes the fifth commandment's promise
🔄 Here it rewards obeying a human father
🗺️ Strangers means they held no tribal land
📖 Faithfulness, not ancestry, is being honored

## 🔁 But We Have Dwelt In Tents, And Have Obeyed

Verses eight through ten repeat the same claim three different ways.

No wine, no houses, no vineyards, no fields, for the whole family.

Wives, sons, and daughters all kept the same rule without exception.

Repetition here is not padding, it is proof of total obedience.

🔁 The claim repeats three times on purpose
👨‍👩‍👧 Wives, sons, and daughters all obeyed
🚫 No exceptions existed anywhere in the family
📖 Repetition here proves total obedience

## 👑 Nebuchadrezzar King Of Babylon Came Up Into The Land

"Nebuchadrezzar" is simply another spelling of Nebuchadnezzar.

He was the Babylonian king whose armies already threatened Judah.

Second Kings describes raiding bands sent against Jehoiakim around this same time.

Open country near the Rechabites' tents had become dangerous to live in.

👑 Nebuchadrezzar is another spelling of Nebuchadnezzar
⚔️ His armies already threatened Judah
🏹 Raiding bands made the countryside unsafe
📖 Even a careful vow meets real danger

## 🏙️ So We Dwell At Jerusalem

This looks at first like the family finally broke its own vow.

They are only sheltering inside the city walls for safety.

No one builds a permanent house or settles the land here.

A wartime refuge is not the same as giving up the vow.

🏙️ They shelter in Jerusalem for safety
🚫 No permanent house gets built here
⚠️ War forced a temporary exception
📖 Refuge is not the same as surrender

# Jeremiah 35:12-17
# ⚖️ The LORD Puts Judah On Trial
---
## 📚 Will Ye Not Receive Instruction To Hearken To My Words

To receive instruction means to accept correction and actually change.

God is not just asking Judah to listen politely.

He wants their behavior to be different afterward.

The Rechabites just proved that kind of change is possible.

📚 Receive instruction means accept correction
👂 God wants real change, not polite listening
🧭 The Rechabites already proved it is possible
📖 Hearing is not the same as obeying

## 👪 Obey Their Father's Commandment

Jonadab's sons still keep a promise made generations before they were born.

Not one descendant has broken it, even under pressure.

Their loyalty to a human father stands in sharp contrast to Judah's failure.

This is the exact comparison God wants Judah to feel.

👪 Jonadab's sons never broke the promise
⏳ Generations later, the vow still holds
⚖️ Their loyalty contrasts sharply with Judah
📖 God wants Judah to feel this gap

## 🌅 Rising Early And Speaking

This phrase pictures someone who gets up early on purpose to start urgent work.

It describes God's own effort to reach Judah again and again.

Jeremiah uses this same phrase for the prophets sent before him too.

Judah still refused to listen, no matter how early the warning came.

🌅 Rising early pictures deliberate, urgent effort
🗣️ God kept sending this same warning
🔁 The phrase repeats elsewhere in Jeremiah
📖 Even urgency could not win Judah's ear

## 🔄 Return Ye Now Every Man From His Evil Way

This is the same call to repentance God repeats throughout the book of Jeremiah.

It names a specific, personal change, not a vague improvement.

God paired that call with a real promise, staying safely in the land.

Judah ignored this offer the same way it ignored every warning before it.

🔄 This is Jeremiah's repeated call to repent
🙋 Change was asked of every single man
🏡 Staying in the land was the promised reward
📖 Judah ignored this offer again

## ⚖️ Have Performed The Commandment Of Their Father

God states the comparison as plainly as possible here.

A small family clan kept a human command for generations without fail.

God's own covenant people would not keep what their true Father commanded.

The contrast is not subtle, and it is not meant to be.

⚖️ God states the comparison directly
👪 A small clan outlasted its promise
💔 Israel broke what its own Father gave
📖 The contrast is meant to sting

## ⚠️ All The Evil That I Have Pronounced Against Them

This judgment was not a sudden surprise.

Jeremiah already named Babylon as the coming danger many chapters earlier.

God says he called to Judah and Judah never answered.

That describes a broken relationship, not just a broken rule.

⚠️ This judgment was already announced before
🗡️ Babylon was named as the danger earlier
💔 God called, and Judah never answered
📖 Broken relationship, not just broken rule

# Jeremiah 35:18-19
# 🏆 A Promise That Outlasts The Nation
---
## 🗣️ Because Ye Have Obeyed The Commandment Of Jonadab Your Father

Jeremiah turns directly to the Rechabites with a formal blessing.

Their reward is named for the exact reason stated here, obedience.

They never asked for a reward.

They simply kept their word.

God notices quiet faithfulness even when no one else is watching.

🗣️ Jeremiah gives them a formal blessing
🎯 Obedience is the stated reason for it
🤫 They never asked for any reward
📖 God notices quiet, unseen faithfulness

## 🔁 Shall Not Want A Man To Stand Before Me For Ever

This exact promise appears only two chapters earlier, in Jeremiah thirty three.

There it was given to David's throne and to the Levites who serve as priests.

Now a family that is not even part of Israel receives the same promise.

"Stand before me" pictures someone serving continually in God's presence.

Faithfulness, not bloodline, earns this lasting place.

🔁 This same promise appeared two chapters earlier
👑 There it covered David's throne and Levites
🌍 Now an outside family receives it too
📖 Faithfulness, not bloodline, earns this place
`.trim();

export const JEREMIAH_THIRTY_FIVE_PERSONAL_SECTIONS = parseJeremiahThirtyFiveRawNotes(JEREMIAH_THIRTY_FIVE_RAW_NOTES);
