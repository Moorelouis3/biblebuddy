export type PsalmsEightyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightyTwoRawNotes(rawText: string): PsalmsEightyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+82:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 82 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+82:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+82:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 82 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 82,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 82:${startVerse}` : `Psalms 82:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 82 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_TWO_RAW_NOTES = `# Psalms 82:1-2
# ⚖️ The Court Of Heaven Opens
---
## ⚖️ God Standeth In The Congregation Of The Mighty

"The mighty" means Israel's own judges and rulers.

They are not distant or supernatural beings.

"Congregation" here means a court already in session.

God is pictured walking directly into that courtroom.

He stands to speak.

The human judges stay seated.

The picture puts God above every human judge in the room.

⚖️ Mighty means Israel's judges and rulers

🏛️ Congregation means a court in session

🧍 God stands, the judges sit

📖 God outranks every judge in the room

## 👨‍⚖️ He Judgeth Among The Gods

The word "gods" here does not mean true divine beings.

Human judges carried that title in a specific way.

They held it because they used God's own authority to judge with justice.

Verse six of this same psalm explains that title directly.

It was a job description, not a claim about their nature.

👨‍⚖️ Gods here means human judges

🏷️ It named a job, not a nature

📜 Verse six explains this same title

📖 Their authority came from God

## ❗ How Long Will Ye Judge Unjustly

God is not asking for new information here.

This question works as a formal accusation.

"How long" often opens a complaint about injustice in the Psalms.

These judges have been favoring evil for some time already.

God is confronting a pattern, not a single slip.

❗ Not a real question, a formal charge

⏳ How long signals a long pattern

😈 The judges already favor evil

📖 God confronts a pattern, not one mistake

## 🎭 Accept The Persons Of The Wicked

"Accept the persons" means showing favoritism in a court case.

A judge doing this decides by who someone is.

The truth of the case gets ignored completely.

"Selah" marks a musical pause inserted right after this charge.

Many scholars believe it told the readers to stop and let the words sink in.

🎭 Accept the persons means favoritism

🙈 The judge ignores the truth

⏸️ Selah marks a pause here

📖 The pause lets the charge sink in

# Psalms 82:3-4
# 🤲 The Judges' Forgotten Duty
---
## 👶 Defend The Poor And Fatherless

"Fatherless" means a child who has lost a father.

That loss also meant losing a legal protector in this culture.

A fatherless child had no one to argue their case in court.

Judges carried a direct duty to speak up for children like this.

Real authority was meant to protect the powerless, not overlook them.

👶 Fatherless means a child with no protector

⚖️ Courts often overlooked people like this

🛡️ Judges had a duty to defend them

📖 Authority exists to protect the powerless

## 😣 Do Justice To The Afflicted And Needy

"Afflicted" describes someone currently suffering under mistreatment.

"Needy" describes someone lacking basic things like food or shelter.

This psalm names four separate vulnerable groups across two verses.

Naming each group by name makes it harder to overlook any of them.

😣 Afflicted means suffering under mistreatment

🍞 Needy means lacking basic necessities

🔢 Four vulnerable groups are named

📖 Naming each one prevents neglect

## 🛟 Deliver The Poor And Needy

"Deliver" means an active rescue, not just legal fairness.

The psalm already asked judges to defend and to judge with justice.

This verse goes one step further and asks for actual rescue.

Real justice sometimes requires stepping in physically, not only ruling correctly.

🛟 Deliver means an active rescue

⚖️ Fair judging alone was not enough

🚶 Rescue means stepping in physically

📖 True justice sometimes takes action

## ✋ Rid Them Out Of The Hand Of The Wicked

"The hand" pictures someone's grip or control over another person.

To be "rid out of" that hand means being pulled free from it.

This is rescue language, not simply legal advice.

Judges were expected to step in and act, not just offer an opinion.

✋ Hand pictures someone's grip or control

🆓 Rid out of means pulled free

🛟 This describes rescue, not advice

📖 Judges were expected to act

# Psalms 82:5-7
# 💀 Gods Who Will Die
---
## 🙈 They Know Not, Neither Will They Understand

This describes a refusal to see, not a simple lack of information.

These judges are not confused about right and wrong.

They have chosen not to see what is already true.

"They walk on in darkness" pictures them stumbling through their own decisions.

Darkness here means moral confusion, not a literal lack of light.

🙈 Refusal to see, not confusion

🌑 Darkness means moral confusion

🚶 They stumble through their own choices

📖 Blindness makes their injustice worse

## 🌍 All The Foundations Of The Earth Are Out Of Course

"Foundations of the earth" pictures the basic order holding the world together.

"Out of course" means knocked off the right track.

Injustice here is not treated as a small or local problem.

Corrupt judges are pictured shaking the stability of the whole world.

🌍 Foundations means the world's basic order

🎢 Out of course means knocked off track

⚠️ Injustice is treated as a huge problem

📖 Corrupt judges shake the whole world

## 👑 I Have Said, Ye Are Gods

God himself is the one who gave these judges that title.

It never meant they were truly divine.

It meant they carried God's own authority whenever they judged with justice.

Jesus later quotes this exact verse in the Gospel of John.

He uses it to defend his own claim to divine authority.

The title was always a high calling, never a boast to claim for themselves.

👑 God gave them this title himself

🏷️ It named authority, not true divinity

⚖️ The title was a calling, not a boast

📖 Jesus quotes this verse in John

## 👪 Children Of The Most High

"Children of the most High" places these judges inside God's own household.

"The most High" is a title for God as ruler over everyone.

Being called his children gave these judges real honor.

A high title always comes paired with a high standard.

👪 Children of the most High means his household

👑 Most High names God as ruler over all

🎖️ The title carried real honor

📖 High honor demanded a high standard

## 🔄 Ye Shall Die Like Men

This is the turn the whole psalm has been building toward.

These judges were called "gods," yet they remain fully mortal.

They will die exactly like any other human being.

No title, however high, changes that plain fact.

🔄 This is the psalm's turning point

🏷️ A high title does not change mortality

💀 They will die like anyone else

📖 No title outranks death

## 🎖️ Fall Like One Of The Princes

"Princes" here means powerful rulers and nobles.

Even the highest ranked leaders eventually die like everyone else.

Comparing these judges to fallen princes strips away their special status.

Rank and title offer no protection from this sentence.

🎖️ Princes means powerful rulers and nobles

⬇️ Even top leaders eventually fall

🎭 The comparison strips away their status

📖 Rank offers no protection here

# Psalms 82:8
# 🙏 The Psalm's Closing Prayer
---
## 🙏 Arise, O God, Judge The Earth

The psalm ends with a direct request for God to step in personally.

Human judges have already failed at this exact task.

"Arise" pictures God standing up to act, not staying seated in silence.

The request looks past every human court straight to God himself.

🙏 A direct request for God to act

⚖️ Human judges already failed at this

🧍 Arise pictures God standing to act

📖 The plea looks past human courts

## 🌍 For Thou Shalt Inherit All Nations

"Inherit" means to rightfully receive as an owner.

This is different from simply taking something by force.

"All nations" reaches far beyond Israel to include the whole earth.

The psalm closes looking forward to God's rule over everyone.

🎁 Inherit means rightfully receive as owner

🌍 All nations reaches beyond Israel alone

👑 It points to God's rule over all

📖 The psalm ends in hope, not despair`.trim();

export const PSALMS_EIGHTY_TWO_PERSONAL_SECTIONS = parsePsalmsEightyTwoRawNotes(PSALMS_EIGHTY_TWO_RAW_NOTES);
