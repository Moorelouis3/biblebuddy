export type PsalmsOneHundredFortyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortyTwoRawNotes(rawText: string): PsalmsOneHundredFortyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+142:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 142 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+142:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+142:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 142 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 142,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 142:${startVerse}` : `Psalms 142:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 142 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_TWO_RAW_NOTES = `# Psalms 142:1-2
# 📣 Crying Out, Holding Nothing Back
---
## 🗣️ I Cried Unto The LORD With My Voice

"Cried" means a loud, desperate call, not a quiet thought kept inside.

David says "with my voice" twice in this single verse.

That repetition is not an accident of the language.

It marks this prayer as spoken out loud, not held silently.

God does not need volume to hear a person.

Saying it out loud still matters to the one praying.

🗣️ Cried means a loud desperate call
🔁 "With my voice" appears twice on purpose
📢 The prayer was spoken out loud
📖 Praying aloud matters to the one praying

## 🙏 Did I Make My Supplication

"Supplication" means an urgent, humble request, more desperate than a normal prayer.

David is not making a polite, routine appeal.

He is pleading his case the way someone begs a judge for mercy.

This word shows how serious his need had become.

🙏 Supplication means an urgent humble plea
⚖️ Like someone begging a judge for mercy
😟 Shows how serious David's need was
📖 Desperate prayer is still real prayer

## 📋 I Poured Out My Complaint Before Him

"Complaint" here does not mean petty griping.

It means laying out a full, honest case, the way someone presents evidence.

David held nothing back from God.

He did not edit his feelings before bringing them to prayer.

📋 Complaint means a full honest case
⚖️ Like presenting evidence, not petty griping
💬 David held nothing back from God
📖 Honest prayer does not need editing

## 📝 I Shewed Before Him My Trouble

"Shewed" is the old spelling of showed.

David lays his trouble fully open before God, hiding no part of it.

This was not a quick summary of his problem.

He walked God through the whole weight of it.

📝 Shewed is the old spelling of showed
🔓 David hid nothing about his trouble
🗺️ He walked God through the whole weight
➡️ Honest prayer holds nothing back

# Psalms 142:3-4
# 😰 Overwhelmed, Alone, And Hunted
---
## 😵 My Spirit Was Overwhelmed Within Me

"Overwhelmed" means fainting, like a person about to collapse.

David is not describing a bad mood here.

He means a total collapse of strength and hope.

Even in that collapse, God already knew his path.

Nothing about where David walked was hidden from God.

😵 Overwhelmed means near collapse
🧭 Not a bad mood, real collapse
👁️ God already knew David's path
➡️ Nothing on that path was hidden

## 🤫 Privily Laid A Snare For Me

"Privily" means secretly, done where no one could see it happen.

A "snare" was a hunting trap built to catch prey off guard.

David's enemies were not attacking him openly.

They were working behind his back, waiting for him to walk into the trap.

Hidden danger is often harder to face than an open fight.

🤫 Privily means done secretly
🪤 Snare means a hidden hunting trap
🗡️ His enemies attacked from hiding, not openly
📖 Hidden danger is hard to face

## 🤝 I Looked On My Right Hand, And Beheld

In that culture, standing at someone's right hand meant defending them.

A close friend, family member, or ally would take that position.

David looks there on purpose, searching for exactly that kind of support.

"Beheld" simply means he looked closely, not just glanced.

🤝 Right hand was the defender's position
👨‍👩‍👧 A close ally would normally stand there
🔍 David searched there on purpose
📖 Beheld means he looked closely

## 🙈 There Was No Man That Would Know Me

David looked for that ally and found no one there.

"Know me" here means no one stepped up to claim him or defend him.

This is not about being unrecognized in a crowd.

It is about being left completely alone when it mattered most.

🙈 No ally stepped forward for David
🚫 Know me means claim or defend, not recognize
😔 Not about being unrecognized in a crowd
➡️ He was alone when it mattered most

## 🏚️ Refuge Failed Me, No Man Cared For My Soul

"Refuge" means a safe place to run when danger comes.

David says every safe place and every safe person came up empty.

No one showed care for the state of his soul.

This is the bottom of the verse, complete abandonment.

The next verse turns straight back to God.

🏚️ Refuge means a safe place to run
🚫 Every safe place came up empty
💔 No one cared for his soul
➡️ The psalm turns back to God next

# Psalms 142:5-7
# 🕊️ Refuge Now, Freedom To Come
---
## 🏛️ Thou Art My Refuge And My Portion

David just said every earthly refuge failed him.

Now he says God is the refuge that never fails.

"Portion" was the share of land each family received in Israel.

David calls God his portion instead of a plot of ground.

That echoes how the Levites received God himself instead of land.

🏛️ God is the refuge that never fails
🗺️ Portion means a family's share of land
🙏 David calls God his portion instead
📖 The Levites received God instead of land

## 🌱 In The Land Of The Living

This phrase means while I am still alive, not after death.

It was a common way in the Old Testament to describe this present life.

David is not asking for a reward waiting somewhere far off.

He wants to see God's help now, in the life he is living today.

🌱 Land of the living means life right now
📜 A common Old Testament phrase for this life
⏳ David is not asking for a future reward
📖 He wants help in this life, today

## 👂 Attend Unto My Cry, For I Am Brought Very Low

"Attend" here means to give full, careful attention.

It is a stronger word than the modern "attend a meeting."

David wants God's focused attention, not a passing glance.

"Brought very low" pictures someone pressed down and nearly finished.

He is not exaggerating for effect.

He is telling God exactly how close to breaking he is.

👂 Attend means give full attention
🎯 Stronger than the modern word attend
📉 Brought very low means near collapse
📖 He tells God the honest truth

## 🎯 Deliver Me From My Persecutors, For They Are Stronger Than I

"Persecutors" means people actively hunting him down, not just rivals.

David admits something most people would hide.

His enemies are genuinely stronger than he is.

He is not pretending to have the upper hand.

Honest prayer names the real danger instead of downplaying it.

🎯 Persecutors means people actively hunting him
😳 David admits his enemies are stronger
🚫 He is not pretending to have control
📖 Honest prayer names the real danger

## 🕳️ Bring My Soul Out Of Prison

This "prison" is not a literal jail cell.

Many scholars connect this psalm to the cave where David once hid from Saul.

David uses prison to picture how trapped and cut off he felt.

He asks God to bring him out of that trapped feeling.

🕳️ Prison here is not a literal jail
🗻 Many link this psalm to David's cave
😣 It pictures feeling trapped and cut off
➡️ David asks to be brought out of it

## 🙌 That I May Praise Thy Name

David does not ask to be rescued just for relief.

He ties his rescue directly to worship.

Getting out of danger was never the final goal.

Being free to praise God again was the real point.

🙌 Rescue was not the final goal
🎵 David ties his rescue to worship
🎯 Being free to praise was the real point
📖 Deliverance and worship are connected here

## 🔄 The Righteous Shall Compass Me About

"Compass" here means surround, not a tool for direction.

Earlier in this same psalm, David said no one would know him.

Now he pictures a whole community of godly people gathered close around him.

Isolation does not get the last word in this psalm.

🔄 Compass means surround, not a direction tool
😔 Earlier David said no one knew him
🫂 Now he pictures a community around him
📖 Isolation does not get the last word

## 🎁 Thou Shalt Deal Bountifully With Me

"Bountifully" means generously, more than what was asked for.

The psalm began with a desperate, urgent cry.

It ends with confidence that God will respond with generosity.

That is the shape of this entire prayer.

Fear does not disappear, but it stops having the final say.

🎁 Bountifully means generously, more than asked
📉 The psalm began in desperate urgency
📈 It ends in confident hope
📖 Fear does not get the final say
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_TWO_PERSONAL_SECTIONS = parsePsalmsOneHundredFortyTwoRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_TWO_RAW_NOTES,
);
