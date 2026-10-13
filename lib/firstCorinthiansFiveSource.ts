export type FirstCorinthiansFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansFiveRawNotes(rawText: string): FirstCorinthiansFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 5:${startVerse}` : `1 Corinthians 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 First Corinthians 5 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_FIVE_RAW_NOTES = `# FirstCorinthians 5:1-2
# 😢 Puffed Up Instead Of Mourning
---
## Such Fornication As Is Not So Much As Named Among The Gentiles

"Fornication" means sexual sin outside marriage.

This case went further than even the Gentiles around them allowed.

Rome's culture already tolerated a great deal of sexual sin.

Corinth had crossed a line that even pagan Rome recognized.

The church had grown numb to something the world still called shameful.

🚫 Fornication means sexual sin outside marriage
🌍 Gentiles here means the pagan culture
📉 Corinth crossed a line pagans kept
📖 The church had grown numb to shame

## That One Should Have His Father's Wife

The father's wife was likely the man's stepmother, not his birth mother.

Old Testament law already named this exact relationship as forbidden.

Leviticus lists it directly among forbidden family relationships.

Paul assumes his readers already know this was always wrong.

👪 Father's wife likely means a stepmother
📜 Leviticus already forbids this union
⚖️ Old law already named this sin
📖 Paul assumes this was always wrong

## Ye Are Puffed Up, And Have Not Rather Mourned

"Puffed up" means filled with pride, like air blown into something hollow.

The church should have grieved over this sin happening in their midst.

Instead they treated it as something to boast about or ignore.

Pride and grief cannot occupy the same heart at the same time.

Corinth chose pride every time grief was the right response.

🎈 Puffed up means filled with pride
😢 Grief was the right response
🙅 Corinth chose pride instead
📖 Pride and grief cannot share a heart

## That He That Hath Done This Deed Might Be Taken Away From Among You

Paul expected the church itself to act, not wait for him.

"Taken away" points toward removing the man from the church family.

Local leaders already had the authority to act without an apostle present.

Corinth had the power to deal with this and never used it.

The silence was its own failure, not just the original sin.

🚪 Taken away means removed from fellowship
🧭 Local leaders already had that authority
😶 Corinth never used that authority
📖 Silence was its own failure

# FirstCorinthians 5:3-5
# ⚖️ Delivered Unto Satan For The Flesh
---
## As Absent In Body, But Present In Spirit

Paul was writing from far away, not standing in the room.

"Present in spirit" does not mean some kind of mystical projection.

It means Paul had already thought the matter through as if he stood there.

Distance did not stop him from forming a clear judgment.

An absent apostle could still render a real verdict.

✈️ Paul wrote from far away
🧠 Present in spirit means thought through
🙅 Not a mystical projection
📖 Distance did not stop his verdict

## Have Judged Already, As Though I Were Present

Paul had already reached his verdict before this letter even arrived.

He was not asking the church to vote on the question.

The decision rested on Christ's own authority, not popular opinion.

Corinth could carry it out, but could not overturn it.

✅ Paul already reached a verdict
🗳️ Not asking the church to vote
👑 Decided under Christ's authority
📖 The verdict did not depend on their vote

## To Deliver Such An One Unto Satan For The Destruction Of The Flesh

"Deliver unto Satan" means removing the man from the church's protection.

The church itself was meant to be a shelter from Satan's influence.

Putting him outside that shelter exposed him to real consequences.

"Destruction of the flesh" points to hardship, not a death sentence.

The goal was never to destroy the man completely.

🚪 Deliver unto Satan means removal from the church
🛡️ The church normally shelters from Satan
⚡ Destruction of flesh means hardship
📖 The goal was never total destruction

## That The Spirit May Be Saved In The Day Of The Lord Jesus

The hard step had a rescue in mind, not revenge.

Paul hoped the hardship would bring the man back to repentance.

"The day of the Lord Jesus" points to the final judgment still to come.

Discipline now was meant to save him before that day arrived.

Even the harshest verse in this passage aims at mercy.

🎯 The goal was rescue, not revenge
🔁 Hardship was meant to bring repentance
📅 The day of the Lord is final judgment
📖 Even this harsh step aimed at mercy

# FirstCorinthians 5:6-8
# 🍞 Purge Out The Old Leaven
---
## Your Glorying Is Not Good

"Glorying" means boasting or taking pride in something.

Corinth had been boasting about its spiritual gifts and wisdom.

Paul says that boasting cannot stand while this sin goes unaddressed.

A church cannot celebrate itself and ignore a known sin at once.

🏆 Glorying means boasting with pride
🗣️ Corinth boasted about its gifts
🙅 Boasting cannot stand beside this sin
📖 A church cannot ignore sin and celebrate itself

## Know Ye Not That A Little Leaven Leaveneth The Whole Lump

"Leaven" is the yeast that makes bread dough rise.

A small amount of it works through an entire batch of dough.

Paul uses that picture for how sin spreads through a community.

Think of a single drop of dye in a glass of water.

It does not stay in one corner.

It spreads to color the whole glass.

One sin left alone touches the whole church.

🍞 Leaven means the yeast in dough
📈 A little leaven spreads through it all
💧 Sin spreads like dye in water
📖 One sin never stays contained

## Purge Out Therefore The Old Leaven, That Ye May Be A New Lump

"Purge" means to remove completely, not just manage or hide.

The old leaven here stands for the sin still active in the church.

Paul wants the church to become new dough, not just cleaner old dough.

A fresh start required removing the sin, not working around it.

🧹 Purge means remove completely
🍞 Old leaven stands for the sin
🆕 Paul wants a fresh batch, not patched dough
📖 A fresh start removes the sin

## For Even Christ Our Passover Is Sacrificed For Us

Christ's death is what makes this purging possible at all.

The Passover lamb was sacrificed long ago so death would pass over Israel's homes.

Paul says Christ now fills that same role for the church.

The old leaven can be purged because the lamb has already been given.

🐑 The Passover lamb protected Israel from death
✝️ Christ now fills that same role
🔑 His sacrifice makes the new start possible
📖 The purge follows the sacrifice

## The Unleavened Bread Of Sincerity And Truth

"The feast" pictures the ongoing life of the church, not one meal.

"Unleavened bread" stands for a life free of hidden sin.

"Sincerity and truth" describes a church that is honest about what is really happening.

Corinth is asked to keep living that way, not just fix one case.

🎉 The feast means ongoing church life
🍞 Unleavened bread means a clean life
🗣️ Sincerity and truth means real honesty
📖 One fix was never the whole goal

# FirstCorinthians 5:9-13
# 🚪 Judge Those Within, Not Those Without
---
## I Wrote Unto You In An Epistle Not To Company With Fornicators

Paul refers to an earlier letter he had already sent to Corinth.

That letter does not survive in scripture today.

It already warned against close association with sexual sin.

Corinth apparently misread how far that warning was meant to reach.

✉️ An epistle means an earlier lost letter
📜 It already warned against this sin
❓ Corinth misread how far it reached
📖 This letter clears up the confusion

## Not Altogether With The Fornicators Of This World

Paul never meant for Christians to avoid every sinner outside the church.

Taken that far, a believer could never work, shop, or live in society.

The world outside the church was never the actual target of that warning.

Total separation from the world was never the real command.

🌍 Not a command to avoid the world
🏪 That would end ordinary daily life
🙅 The world was never the target
📖 Total separation was never the point

## With Such An One No Not To Eat

The warning only applies to someone claiming to be a fellow believer.

The list in this verse names several sins, not only sexual sin.

"No not to eat" likely means skipping shared meals together.

Shared meals were a close and visible form of fellowship.

The point was limiting closeness with a believer, not shunning the world.

🤝 This targets a professing believer
📋 The list names several sins
🍽️ No eating likely means shared meals
📖 It limits closeness, not shuns the world

## For What Have I To Do To Judge Them Also That Are Without? Do Not Ye Judge Them That Are Within?

Judging outsiders was never the church's assigned task.

Judging its own members always was the church's assigned task.

Paul asks these two questions back to back on purpose.

Corinth had this responsibility backward the entire time.

❓ Two pointed questions in a row
🌍 Outsiders were never the church's job
🏠 Insiders always were the church's job
📖 Corinth had this backward

## But Them That Are Without God Judgeth

God still holds every outsider accountable, even without the church's help.

The church is never asked to replace that final judgment.

Its job stays smaller and more immediate than God's.

That limit protects the church from a task it was never given.

⚖️ God still judges every outsider
🙅 The church does not replace that
🏠 Its job is smaller and nearer
📖 This limit protects the church

## Therefore Put Away From Among Yourselves That Wicked Person

This short command carries the weight of the whole chapter.

"Put away" means formally removing someone from the church's fellowship.

This was never about hatred toward the man himself.

It was about protecting the whole loaf from a leaven already spreading.

🚪 Put away means formal removal
❤️ Not an act of hatred
🍞 It protects the whole loaf
📖 One command closes the whole chapter
`.trim();

export const FIRST_CORINTHIANS_FIVE_PERSONAL_SECTIONS = parseFirstCorinthiansFiveRawNotes(FIRST_CORINTHIANS_FIVE_RAW_NOTES);
