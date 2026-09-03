export type PsalmsTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwoRawNotes(rawText: string): PsalmsTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 2:${startVerse}` : `Psalms 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 2 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWO_RAW_NOTES = `# Psalms 2:1-3
# 😤 The Nations Rage
---
## 😤 Why Do The Heathen Rage

"Heathen" means the nations outside God's covenant people Israel.

"Rage" pictures a loud, restless uproar, not quiet anger.

The psalm opens with a question, not a statement.

That question already expects the answer, no real reason at all.

Whole nations are pictured working themselves into a needless commotion.

😤 Heathen means nations outside Israel

📢 Rage means a loud uproar

❓ The question expects no real reason

📖 Their commotion cannot change who rules

## 🧠 The People Imagine A Vain Thing

"Imagine" here means plot or scheme, not simply daydream.

"Vain" means empty and doomed to fail from the start.

The people are not just thinking about rebellion.

They are actively planning it, certain it will work.

The psalm already tells the reader how that plan ends.

🧠 Imagine means to plot or scheme

🚫 Vain means empty and doomed

💭 This is planning, not idle thinking

📖 The psalm already reveals how it ends

## 👑 The Kings Of The Earth Set Themselves

"Set themselves" means the kings take a stand, ready for battle.

This was likely written for a new king's coronation in Jerusalem.

Smaller kingdoms often tested a new king by rebelling early.

A change in leadership looked like the perfect chance to break free.

These earthly kings assume the throne in Zion is weak.

👑 Set themselves means taking a battle stance

🏰 Likely written for a king's coronation

⚔️ New kings often faced early rebellion

📖 They mistake Zion's king for weak

## 🤝 The Rulers Take Counsel Together

"Counsel" here means a shared plan, not simple advice.

These rulers are not acting alone.

They are forming an alliance against one throne.

Political enemies elsewhere often became allies against a common threat.

Their united front makes the coming scene even more dramatic.

🤝 Counsel means a shared plan

👥 The rulers are not acting alone

⚔️ Rivals unite against a common throne

📖 Their alliance still cannot win

## 🛢️ Against The LORD, And Against His Anointed

"Anointed" means set apart for a role by having oil poured on the head.

Kings, priests, and prophets were anointed in the Old Testament.

This rebellion is aimed at two targets at once.

It attacks God directly, and it attacks the king God chose.

That word "anointed" is the Hebrew word behind the title Messiah.

🛢️ Anointed means set apart with oil

👑 Kings, priests, and prophets were anointed

🎯 This attacks both God and his king

📖 Anointed is the Hebrew word behind Messiah

## 🪢 Break Their Bands Asunder

"Bands" here means restraints, like ropes or a yoke.

The nations picture God's rule as something tying them down.

Breaking free from bands was a common image for shaking off a ruler.

Think of an animal straining against a rope tied to a post.

The nations believe cutting that rope will set them free.

🪢 Bands means ropes or a yoke

⚖️ God's rule feels like restraint to them

🐴 Like an animal pulling against a post

📖 They believe freedom means cutting loose

## 🔁 Cast Away Their Cords From Us

"Cords" repeats the same idea as "bands" in the line before.

Hebrew poetry often says one idea twice using two different pictures.

This is called parallelism, and it shows up constantly in the Psalms.

The nations are not adding a new complaint.

They are pressing the same complaint twice for emphasis.

🔁 Cords repeats the idea of bands

📜 Hebrew poetry often restates one idea twice

✨ This pattern is called parallelism

📖 Repetition here adds emphasis, not new content

# Psalms 2:4-6
# 😆 The LORD Laughs
---
## 🪑 He That Sitteth In The Heavens Shall Laugh

God's throne never moves, no matter how loud the nations get.

"Sitteth" pictures someone calmly seated, not scrambling to respond.

This laughter is not amusement over a joke.

It is the confidence of someone who was never actually threatened.

The nations rage in verse one, but God stays seated in verse four.

🪑 Sitteth means calmly seated, unmoved

😄 This laughter shows confidence, not humor

🌍 The nations rage, but God stays seated

📖 God was never actually threatened

## 😏 The LORD Shall Have Them In Derision

"Derision" means open mockery or scorn.

This line repeats the idea of the laughter, just with a stronger word.

The parallel lines build from a smile to open contempt.

God is not worried about this rebellion succeeding.

He treats it as something almost too small to take seriously.

😏 Derision means open mockery

📈 This line intensifies the laughter before it

🌍 God is not worried about this plot

📖 He treats it as too small to matter

## 🔥 Speak Unto Them In His Wrath

The tone shifts here from laughter to a real warning.

"Wrath" means God's settled anger against wrongdoing, not a sudden outburst.

God has been calm through the nations' plotting.

That calm was never the same as approval.

Now he finally answers them directly.

🔥 Wrath means settled anger, not an outburst

🤐 God stayed calm through their plotting

✅ Calm was never the same as approval

📖 God now answers them directly

## 😱 Vex Them In His Sore Displeasure

"Vex" means to terrify or throw into confusion.

"Sore" is an old word for severe, not physical soreness.

God's anger does not stay distant or theoretical.

It actively unsettles the very people plotting against him.

Their confidence from verse two collapses under real pressure.

😱 Vex means to terrify or confuse

💥 Sore means severe, not physically sore

🎯 God's anger actively unsettles the plotters

📖 Their confidence collapses under real pressure

## 🏔️ Set My King Upon My Holy Hill Of Zion

"Zion" is the hill in Jerusalem where the king's palace stood.

It later became the site of the temple as well.

"Yet" signals a sharp contrast with everything the nations just tried.

While the nations were plotting, God had already placed his king.

Their rebellion arrives too late to change anything.

🏔️ Zion is the royal hill in Jerusalem

⛪ It later held the temple too

🔄 Yet marks a sharp contrast here

📖 God's king was already set in place

# Psalms 2:7-9
# 📜 The Decree
---
## 🗣️ I Will Declare The Decree

The speaker changes here from the narrator to the king himself.

"Decree" means an official, binding announcement.

This decree comes from God, not from the king's own authority.

Ancient kings often cited a divine decree to prove they had the right to rule.

The king is about to quote God's own words.

🗣️ The speaker shifts to the king

📜 Decree means an official announcement

👑 Kings cited decrees to prove their right

📖 The king now quotes God directly

## 👨‍👦 Thou Art My Son

This does not mean God physically fathered a child that day.

Ancient Near East kings were often declared "son" of their god at coronation.

The title marked the king as God's chosen representative on earth.

God had already promised this exact relationship to David's line.

That promise was made through the prophet Nathan back in 2 Samuel.

👨‍👦 Son here is a title, not literal birth

🏛️ Ancient kings were named son at coronation

🤝 It marks God's chosen representative

📖 The promise traces back to David's line

## 👶 This Day Have I Begotten Thee

"Begotten" here does not describe a birth.

It describes a coronation, the day the king officially took the throne.

"This day" points to that one specific ceremony.

The language pictures the king's rule as beginning fresh, backed fully by God.

Later, the New Testament applies this exact verse to Jesus at his resurrection.

👶 Begotten here means crowned, not born

🎉 This day points to the coronation

🌱 The king's rule begins fresh, backed by God

📖 The New Testament later applies this to Jesus

## 🎁 The Heathen For Thine Inheritance

"Inheritance" here means something given as a lasting possession.

God offers the king the nations themselves, not just land or gold.

This kind of promise was almost unheard of for one king.

It points far beyond any single earthly ruler's actual reach.

The scope of this promise is really global from the very start.

🎁 Inheritance means a lasting possession

🌍 The nations themselves are the gift

🤯 No single king ever ruled that far

📖 The promise points beyond an ordinary king

## 🗺️ The Uttermost Parts Of The Earth

This line restates the same promise using different words.

"Uttermost parts" means the farthest edges of the known world.

Hebrew poetry often pairs two lines that say one thing twice.

Nations and uttermost parts together mean the whole earth, no exceptions.

Nothing is left outside this king's rightful reach.

🗺️ Uttermost parts means the farthest edges

🔁 This restates the promise a second way

🌐 Together the lines mean the whole earth

📖 Nothing sits outside this king's reach

## 🪄 Break Them With A Rod Of Iron

A shepherd's rod was normally used to guide and protect the flock.

"Rod of iron" turns that same tool into a weapon of judgment.

This king rules with complete and unmatched authority.

Rebellion against him cannot simply be outlasted or ignored.

This exact phrase gets quoted again later in the book of Revelation.

🪄 A rod normally guided the flock

⚔️ Iron turns that rod into a weapon

👑 This king rules with total authority

📖 Revelation later quotes this same phrase

## 🏺 Dash Them In Pieces Like A Potter's Vessel

A potter's vessel is a clay jar, hardened by fire but still fragile.

It looks solid until the moment it is actually struck.

Think of dropping a clay pot onto a stone floor.

One blow is enough to shatter it completely.

Resistance to this king will end just as suddenly.

🏺 A potter's vessel is fragile clay

💥 It looks solid until it is struck

🪨 Think of a pot dropped on stone

📖 Resistance shatters just as suddenly

# Psalms 2:10-12
# 💋 Kiss The Son
---
## 🔄 Be Wise Now Therefore, O Ye Kings

The tone shifts one final time, from warning to direct advice.

"Wise" here means choosing the path that actually works, not just clever thinking.

The same kings from verse two are addressed again directly.

This time they are offered a way out instead of only judgment.

🔄 The tone shifts to direct advice

🧠 Wise means choosing what actually works

👑 The same rebellious kings are addressed

📖 A way out is offered here

## 📚 Be Instructed, Ye Judges Of The Earth

"Instructed" means taught or corrected, not simply informed.

"Judges" here refers to rulers who hold real legal authority.

Even the most powerful people on earth are still being taught something.

No throne is too high to need this correction.

📚 Instructed means taught or corrected

⚖️ Judges means rulers with legal authority

👑 Even powerful rulers need this correction

📖 No throne outranks this warning

## 🙇 Serve The LORD With Fear

"Fear" here does not mean cowering in terror.

It means deep reverence for someone far greater than yourself.

This is the same posture Israel was always called to hold toward God.

Even rebellious kings are invited to take up that same posture now.

🙇 Fear means deep reverence, not terror

🤝 This is Israel's normal posture toward God

👑 Even rebel kings are invited to it

📖 Reverence is offered, not forced

## 😊 Rejoice With Trembling

Rejoicing and trembling sound like they should cancel each other out.

Here they sit side by side on purpose.

Real joy before God still carries a sense of his greatness.

A person can be genuinely glad and genuinely humbled at the same time.

😊 Joy and trembling sit side by side

🤝 Both feelings are meant together

🙏 Greatness and gladness are not opposites

📖 A person can feel both at once

## 💋 Kiss The Son

A kiss was a common ancient gesture of loyalty toward a king.

Subjects would kiss the hand, feet, or ground before their ruler.

"Kiss the Son" is a call to submit to this king personally.

It is not a suggestion.

It is the one real way to avoid the coming judgment.

💋 A kiss showed loyalty to a king

🦶 Subjects kissed a ruler's hand or feet

🙇 This call means personal submission

📖 Submission is the way to avoid judgment

## ⚰️ Perish From The Way

"Perish" means to be destroyed completely, not simply fade away.

"The way" pictures a person's whole path or course of life.

Refusing this king does not leave someone standing still.

It leads somewhere, and that somewhere is real ruin.

⚰️ Perish means complete destruction

🛤️ The way means a person's whole path

🚫 Refusal is not a neutral choice

📖 Rejecting this king leads to ruin

## 🔥 His Wrath Is Kindled But A Little

"Kindled" is an old word for lit, like starting a fire.

"But a little" does not mean this anger is small or harmless.

Even the smallest spark of God's anger is still genuinely dangerous.

The warning is not about the size of the anger.

It is about how little it actually takes to be caught in it.

🔥 Kindled means lit, like a fire starting

⚠️ But a little does not mean harmless

💧 Even a small spark is still dangerous

📖 Little wrath is still real wrath

## 🤝 Blessed Are All They That Put Their Trust In Him

The psalm ends the same way the very first psalm began, with the word blessed.

Trusting this king is the opposite path from the raging nations in verse one.

One path leads to shattering like a fragile clay jar.

The other path leads to real, lasting favor with God.

The whole psalm comes down to this one choice.

🤝 Blessed echoes the opening of Psalm one

😤 Trust is the opposite of raging

🏺 One path shatters like fragile clay

📖 The whole psalm comes down to this choice
`.trim();

export const PSALMS_TWO_PERSONAL_SECTIONS = parsePsalmsTwoRawNotes(PSALMS_TWO_RAW_NOTES);
